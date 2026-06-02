/**
 * Pages Function: shared-password gate for /deep-dive/*
 *
 * Phase 1 gating per issue #27. Reads DEEP_DIVE_PASSWORD from the Pages env
 * (set as a Secret in the Cloudflare dashboard). On successful POST, sets a
 * 7-day wsr_session cookie and redirects to the originally requested path.
 *
 * Phase 2 (see docs/deep-dive-gating.md) will swap the password check for a
 * token-validation call against fand-app's MemberController; the URL surface
 * and cookie name stay the same so reviewer links don't break.
 */

interface Env {
  DEEP_DIVE_PASSWORD: string;
}

const SESSION_COOKIE = "wsr_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;

  if (!env.DEEP_DIVE_PASSWORD) {
    return new Response("Deep Dive gate is not configured.", { status: 503 });
  }

  const expectedSession = await deriveSessionToken(env.DEEP_DIVE_PASSWORD);

  if (hasValidSession(request, expectedSession)) {
    return next();
  }

  if (request.method === "POST") {
    return handleLoginPost(request, env, expectedSession);
  }

  return renderLoginPage(new URL(request.url).pathname, null, 401);
};

/**
 * The session cookie value is a SHA-256 of the current password rather than a
 * literal sentinel. Reading this source file (which is public) is not enough
 * to bypass the gate; you also need to know the password to compute the
 * expected cookie. Rotating the password also immediately invalidates every
 * outstanding session, since the derived token changes.
 */
async function deriveSessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode("wsr-session-v1:" + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(digest));
}

function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

function hasValidSession(request: Request, expected: string): boolean {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE && constantTimeEquals(rest.join("="), expected)) {
      return true;
    }
  }
  return false;
}

async function handleLoginPost(
  request: Request,
  env: Env,
  expectedSession: string,
): Promise<Response> {
  const url = new URL(request.url);
  let submitted = "";
  try {
    const form = await request.formData();
    submitted = String(form.get("password") ?? "");
  } catch {
    return renderLoginPage(url.pathname, "Could not read form submission.", 400);
  }

  if (!constantTimeEquals(submitted, env.DEEP_DIVE_PASSWORD)) {
    return renderLoginPage(url.pathname, "Incorrect password.", 401);
  }

  const cookie = [
    `${SESSION_COOKIE}=${expectedSession}`,
    "Path=/deep-dive/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");

  return new Response(null, {
    status: 303,
    headers: {
      Location: url.pathname + url.search,
      "Set-Cookie": cookie,
    },
  });
}

function constantTimeEquals(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

function renderLoginPage(
  actionPath: string,
  errorMessage: string | null,
  status: number,
): Response {
  const safeAction = escapeHtml(actionPath);
  const errorBlock = errorMessage
    ? `<p class="error" role="alert">${escapeHtml(errorMessage)}</p>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Deep Dive — sign in</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      max-width: 28rem;
      margin: 4rem auto;
      padding: 0 1.25rem;
      line-height: 1.5;
    }
    h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
    .lede { color: #555; margin-top: 0; }
    form { margin-top: 1.5rem; display: grid; gap: 0.75rem; }
    label { font-weight: 600; }
    input[type="password"] {
      font-size: 1rem;
      padding: 0.5rem 0.625rem;
      border: 1px solid #888;
      border-radius: 4px;
    }
    button {
      font-size: 1rem;
      padding: 0.55rem 0.9rem;
      border: 0;
      border-radius: 4px;
      background: #1f4f82;
      color: #fff;
      cursor: pointer;
      justify-self: start;
    }
    button:hover { background: #143456; }
    .error {
      color: #a40000;
      background: #fde7e7;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .footnote {
      margin-top: 2rem;
      font-size: 0.875rem;
      color: #666;
    }
    @media (prefers-color-scheme: dark) {
      .lede, .footnote { color: #aaa; }
      input[type="password"] { background: #1b1b1b; color: #eee; border-color: #555; }
      .error { background: #3a1818; color: #ffb4b4; }
    }
  </style>
</head>
<body>
  <h1>Deep Dive</h1>
  <p class="lede">Password-protected materials for named institutional reviewers.</p>
  ${errorBlock}
  <form method="post" action="${safeAction}" autocomplete="off">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required autofocus>
    <button type="submit">Sign in</button>
  </form>
  <p class="footnote">If you have not received a password, the public-facing material is the appropriate entry point — see the site's Evidence, Framework, and Methodology sections.</p>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
