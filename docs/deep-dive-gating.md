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
     the originally requested path with a `Set-Cookie: wsr_session=valid`
     header (`HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/deep-dive/`,
     `Max-Age` = 7 days).
   - If the password is wrong, the login page is re-rendered with an error.
3. **Any request with `wsr_session=valid`** → the function calls `next()` and
   the static asset is served from the Pages build.

The password compare is constant-time so a misconfigured password can't leak
via timing.

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

Old sessions naturally expire **7 days** after their last successful login.
There is no server-side session revocation — if you need to cut access
immediately (e.g. a reviewer's laptop is lost), rotate the password and also
treat any live sessions as compromised; you can shorten `SESSION_MAX_AGE_SECONDS`
in the function and re-deploy if you want a tighter window.

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

# Correct password → 303 + Set-Cookie
curl -s -i -X POST -d 'password=<actual>' https://oconeco.com/deep-dive/ | head

# Carrying the cookie → 200 (or whatever the static page returns)
curl -sI -H 'Cookie: wsr_session=valid' https://oconeco.com/deep-dive/
```

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
  links don't break; the value becomes a server-validated token instead of
  the literal `"valid"`).
- The URL surface stays identical; only the auth layer changes.

Per-reviewer tracking, magic-link / email-based auth, and multi-tier gating
are out of scope for Phase 1 and tracked separately.
