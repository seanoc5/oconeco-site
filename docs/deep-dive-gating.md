# Deep Dive gating (Phase 1: shared password)

`/deep-dive/*` is gated by a Cloudflare Pages Function at
`functions/deep-dive/[[path]].ts`. The function runs on every request to that
URL prefix, checks for a `wsr_session` cookie, and otherwise renders a small
login page that accepts a shared password.

This is Phase 1 — one credential for all institutional reviewers, no
per-reviewer tracking. Phase 2 (individual accounts, magic links) is sketched
at the bottom of this doc.

## How it works

1. **GET without valid cookie** → returns a `401` with the inline login page.
2. **POST `password=…`** to any `/deep-dive/*` URL:
   - If the password matches `DEEP_DIVE_PASSWORD`, the response is a `303` to
     the originally requested path with a `Set-Cookie: wsr_session=<token>`
     header (`HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/deep-dive/`,
     `Max-Age` = 7 days). `<token>` is a SHA-256 of the current password — not
     a literal sentinel — so the cookie value is unknowable to anyone who
     hasn't logged in, even if they can read this function's source.
   - If the password is wrong, the login page is re-rendered with an error.
3. **Request with a matching `wsr_session` cookie** → the function calls
   `next()` and the static asset is served from the Pages build.

Both the password compare and the cookie compare are constant-time. Because
the session token is derived from the current password, **rotating the
password instantly invalidates every outstanding session** as well (see
"Rotating the password" below).

## Setting the password

1. Cloudflare dashboard → **Pages → oconeco-site → Settings → Variables and
   Secrets**.
2. Add a Production variable:
   - **Variable name:** `DEEP_DIVE_PASSWORD`
   - **Type:** Secret
   - **Value:** the shared password (see "Choosing a password" below).
3. **Re-deploy** the project (Variables and Secrets changes don't apply to the
   currently-deployed build until you trigger a new deploy).

For Preview deploys, also add the variable under the Preview environment so
the gate works against PR previews while you're iterating.

If `DEEP_DIVE_PASSWORD` is unset the function returns `503` rather than
silently letting an empty-string compare succeed.

### Choosing a password

- 4–6 random words from a wordlist (diceware-style) reads well in an email
  and is easy to type on mobile.
- Avoid anything that doubles as a project name — reviewers will paste these
  into email and chat.
- Keep it in a password manager, not the repo.

## Rotating the password

1. Update `DEEP_DIVE_PASSWORD` in the Pages dashboard.
2. Trigger a re-deploy (or push any commit).
3. Email the new password to active reviewers.

Because the session cookie is derived from the current password, rotating
immediately invalidates every outstanding session — old cookies stop matching
on the next request, and reviewers will see the login page again. If you just
want sessions to age out without a rotation, the default `Max-Age` is 7 days
(adjust `SESSION_MAX_AGE_SECONDS` in the function and re-deploy to change it).

## Sharing with reviewers

The institutional-outreach email already names a working URL; append the
password as a separate line so it doesn't render as a link:

```
Deep Dive: https://oconeco.com/deep-dive/
Password:  <the diceware string>
```

Tell reviewers the session lasts a week per browser; if they come back later
they'll be prompted again.

## Verifying

```bash
# Unauthenticated request → 401 + login HTML
curl -sI https://oconeco.com/deep-dive/

# Wrong password → 401 + login HTML with error
curl -s -X POST -d 'password=wrong' https://oconeco.com/deep-dive/ | head

# Correct password → 303 + Set-Cookie (capture the cookie to a jar)
curl -s -i -c /tmp/wsr.cookies -X POST \
  -d 'password=<actual>' https://oconeco.com/deep-dive/ | head

# Carrying the captured cookie → 200
curl -sI -b /tmp/wsr.cookies https://oconeco.com/deep-dive/
```

The cookie value is a SHA-256 of the password, so you can't synthesise it by
hand without knowing the password — use a cookie jar (`-c` / `-b`) or copy
the value out of devtools after a real login.

For local iteration, `npx wrangler pages dev ./dist` after `npm run build`
serves the static output with the Functions runtime so you can hit
`http://127.0.0.1:8788/deep-dive/` and exercise the gate end-to-end. Set
`DEEP_DIVE_PASSWORD` via `--binding DEEP_DIVE_PASSWORD=…` on the wrangler
command line, or a local `.dev.vars` file.

## Phase 2 upgrade path

When fand-app's `MemberController` is online behind Cloudflare Tunnel:

- Swap the password compare in `handleLoginPost` for a token-validation call
  against fand-app (`fetch("https://fand.../auth/validate", …)`).
- Issue per-reviewer session cookies (keep the `wsr_session` name so existing
  links don't break; the cookie value becomes a per-reviewer signed token
  issued by fand-app instead of the password-derived hash).
- The URL surface stays identical; only the auth layer changes.

Per-reviewer tracking, magic-link / email-based auth, and multi-tier gating
are out of scope for Phase 1 and tracked separately.
