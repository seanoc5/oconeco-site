/**
 * Pages Function: contact-form submission handler for /about/ #contact.
 *
 * Closes issue #34. The form on /about/ (about.md) POSTs name/email/
 * organization/message here. We validate, run Cloudflare Turnstile
 * server-side verification, send the email via Resend, then 303-redirect
 * back to /about/ with a state query param so the page can show a
 * thank-you or error block.
 *
 * Graceful degradation in local dev:
 *   - TURNSTILE_SECRET absent → skip Turnstile verification (the
 *     widget also won't render without PUBLIC_TURNSTILE_SITE_KEY).
 *   - RESEND_API_KEY absent → log the submission to the Function log
 *     and treat it as sent. Useful for `wrangler pages dev`.
 *
 * Env vars (all set as Secrets in the Cloudflare Pages dashboard):
 *   - TURNSTILE_SECRET      Cloudflare Turnstile secret key.
 *   - RESEND_API_KEY        Resend HTTP API key.
 *   - CONTACT_FORM_TO       Destination inbox (e.g. sean@oconeco.com).
 *   - CONTACT_FORM_FROM     Verified sender on Resend
 *                           (e.g. contact@oconeco.com).
 *
 * See docs/contact-form.md for the operator runbook.
 */

interface Env {
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  CONTACT_FORM_TO?: string;
  CONTACT_FORM_FROM?: string;
}

const REDIRECT_BASE = "/about/";
const MAX_FIELD_LEN = 200;
const MAX_MESSAGE_LEN = 5000;
const MIN_MESSAGE_LEN = 20;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirectBack("error", "bad-request");
  }

  // Honeypot — if a bot filled the hidden `website` field, silently
  // 303 to the success state so the bot stops retrying.
  const honey = String(form.get("website") ?? "");
  if (honey.trim().length > 0) {
    logEvent("contact-honeypot-hit", { ip: clientIp(request) });
    return redirectBack("sent");
  }

  const name = sanitize(form.get("name"), MAX_FIELD_LEN);
  const email = sanitize(form.get("email"), MAX_FIELD_LEN);
  const organization = sanitize(form.get("organization"), MAX_FIELD_LEN);
  const message = sanitize(form.get("message"), MAX_MESSAGE_LEN);
  const turnstileToken = String(form.get("cf-turnstile-response") ?? "");

  if (!name || !email || !isPlausibleEmail(email)) {
    return redirectBack("error", "invalid-contact");
  }
  if (message.length < MIN_MESSAGE_LEN) {
    return redirectBack("error", "message-too-short");
  }

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET,
      turnstileToken,
      clientIp(request),
    );
    if (!ok) {
      logEvent("contact-turnstile-fail", { ip: clientIp(request) });
      return redirectBack("error", "turnstile-failed");
    }
  }

  const subject = `OconEco contact form — ${name}`;
  const body = renderEmailBody({ name, email, organization, message });

  if (!env.RESEND_API_KEY || !env.CONTACT_FORM_TO || !env.CONTACT_FORM_FROM) {
    logEvent("contact-submission-unsent", {
      reason: "mail provider not configured",
      preview: { name, email, organization, messageLen: message.length },
    });
    return redirectBack("sent");
  }

  const sent = await sendViaResend({
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_FORM_TO,
    from: env.CONTACT_FORM_FROM,
    replyTo: email,
    subject,
    text: body,
  });

  if (!sent) {
    return redirectBack("error", "send-failed");
  }

  logEvent("contact-submission-sent", { from: email });
  return redirectBack("sent");
};

// Anything other than POST: kick back to /about/.
export const onRequest: PagesFunction<Env> = async () => {
  return Response.redirect("https://oconeco.com" + REDIRECT_BASE + "#contact", 303);
};

function sanitize(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function isPlausibleEmail(value: string): boolean {
  // Deliberately loose — RFC 5322 is not worth implementing client-side or
  // server-side. We do a structural check; Resend will reject anything
  // genuinely malformed at send time.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "";
}

async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string,
): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    if (!resp.ok) return false;
    const data = (await resp.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendViaResend(args: {
  apiKey: string;
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: [args.to],
        reply_to: args.replyTo,
        subject: args.subject,
        text: args.text,
      }),
    });
    if (!resp.ok) {
      const detail = await resp.text();
      logEvent("contact-resend-error", { status: resp.status, detail });
      return false;
    }
    return true;
  } catch (e) {
    logEvent("contact-resend-exception", { error: String(e) });
    return false;
  }
}

function renderEmailBody(args: {
  name: string;
  email: string;
  organization: string;
  message: string;
}): string {
  const lines = [
    "New contact submission from oconeco.com /about/",
    "",
    `From: ${args.name} <${args.email}>`,
  ];
  if (args.organization) lines.push(`Organization: ${args.organization}`);
  lines.push("", "Message:", args.message);
  return lines.join("\n");
}

function redirectBack(state: "sent" | "error", reason?: string): Response {
  const params = new URLSearchParams({ contact: state });
  if (reason) params.set("reason", reason);
  const location = `${REDIRECT_BASE}?${params.toString()}#contact`;
  return new Response(null, {
    status: 303,
    headers: { Location: location, "Cache-Control": "no-store" },
  });
}

function logEvent(event: string, fields: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({ event, ts: new Date().toISOString(), ...fields }));
}
