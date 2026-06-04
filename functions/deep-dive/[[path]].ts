/**
 * Pages Function: per-reviewer password gate for /deep-dive/*
 *
 * Phase 1.5 gating per issue #45 (follow-up to #27 / PR #35). Reads a JSON
 * map of reviewerId → password from DEEP_DIVE_REVIEWERS (set as a Secret in
 * the Cloudflare dashboard). On successful POST, sets a 7-day wsr_session
 * cookie that carries the reviewer ID; subsequent hits log
 * { event:"deep-dive-hit", reviewer, path, ts } so CF tail / Logpush can
 * attribute access without standing up fand-app's MemberController.
 *
 * Phase 2 (see docs/deep-dive-gating.md) will swap the JSON-map lookup for a
 * token-validation call against fand-app's MemberController; the URL surface
 * and cookie name stay the same so reviewer links don't break.
 */

interface Env {
  DEEP_DIVE_REVIEWERS: string;
}

const SESSION_COOKIE = "wsr_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_SALT = "wsr-session-v2:";

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;

  const reviewers = parseReviewers(env.DEEP_DIVE_REVIEWERS);
  if (!reviewers) {
    return new Response("Deep Dive gate is not configured.", { status: 503 });
  }

  const url = new URL(request.url);
  const reviewer = await identifyReviewer(request, reviewers);

  if (reviewer) {
    logHit(reviewer, url.pathname);
    return next();
  }

  if (request.method === "POST") {
    return handleLoginPost(request, reviewers);
  }

  return renderLoginPage(url.pathname, null, 401);
};

type ReviewerMap = Map<string, string>;

function parseReviewers(raw: string | undefined): ReviewerMap | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const map = new Map<string, string>();
  for (const [id, pw] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof pw !== "string" || pw.length === 0) continue;
    if (!/^[a-z0-9_-]{1,64}$/i.test(id)) continue;
    map.set(id, pw);
  }
  return map.size > 0 ? map : null;
}

/**
 * Cookie shape: `<reviewerId>.<sha256(SESSION_SALT + reviewerId + ":" + password)>`.
 * Reading this source file (which is public) is not enough to bypass the gate;
 * you also need to know the reviewer's password to compute the expected hash.
 * Rotating a single reviewer's password invalidates only that reviewer's
 * outstanding sessions — other reviewers are not disrupted.
 */
async function deriveSessionHash(reviewerId: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(SESSION_SALT + reviewerId + ":" + password);
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

async function identifyReviewer(
  request: Request,
  reviewers: ReviewerMap,
): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name !== SESSION_COOKIE) continue;
    const value = rest.join("=");
    const dot = value.indexOf(".");
    if (dot <= 0 || dot === value.length - 1) return null;
    const reviewerId = value.slice(0, dot);
    const presentedHash = value.slice(dot + 1);
    const password = reviewers.get(reviewerId);
    if (!password) return null;
    const expectedHash = await deriveSessionHash(reviewerId, password);
    return constantTimeEquals(presentedHash, expectedHash) ? reviewerId : null;
  }
  return null;
}

async function handleLoginPost(
  request: Request,
  reviewers: ReviewerMap,
): Promise<Response> {
  const url = new URL(request.url);
  let submitted = "";
  try {
    const form = await request.formData();
    submitted = String(form.get("password") ?? "");
  } catch {
    return renderLoginPage(url.pathname, "Could not read form submission.", 400);
  }

  let matched: string | null = null;
  for (const [reviewerId, password] of reviewers) {
    if (constantTimeEquals(submitted, password)) {
      matched = reviewerId;
      // No break — keep comparing to make timing uniform across map size.
    }
  }

  if (!matched) {
    return renderLoginPage(url.pathname, "Incorrect password.", 401);
  }

  const hash = await deriveSessionHash(matched, reviewers.get(matched)!);
  const cookie = [
    `${SESSION_COOKIE}=${matched}.${hash}`,
    "Path=/deep-dive/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");

  logHit(matched, url.pathname, "deep-dive-login");

  return new Response(null, {
    status: 303,
    headers: {
      Location: url.pathname + url.search,
      "Set-Cookie": cookie,
    },
  });
}

function logHit(reviewer: string, path: string, event = "deep-dive-hit"): void {
  console.log(JSON.stringify({ event, reviewer, path, ts: new Date().toISOString() }));
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
