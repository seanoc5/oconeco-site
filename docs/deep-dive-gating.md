# Deep Dive gating (Phase 1.5: per-reviewer passwords)

`/deep-dive/*` is gated by a Cloudflare Pages Function at
`functions/deep-dive/[[path]].ts`. The function runs on every request to that
URL prefix, checks for a `wsr_session` cookie, and otherwise renders a small
login page that accepts a per-reviewer password.

Phase 1 (issue #27) used a single shared password. Phase 1.5 (issue #45)
swaps that for a JSON map keyed by reviewer ID, so the success metric
"institutional reviewers actually open the gated workbooks" can be answered
per-reviewer via Function logs. Phase 2 (individual accounts validated by
fand-app's `MemberController`) is sketched at the bottom of this doc; the URL
surface and cookie name are unchanged across the swap so reviewer links
won't break.

## How it works

1. **GET without valid cookie** → returns a `401` with the inline login page.
2. **POST `password=…`** to any `/deep-dive/*` URL:
   - The function iterates the reviewer map and constant-time-compares the
     submitted password against each entry's value. On a match, the response
     is a `303` to the originally requested path with a
     `Set-Cookie: wsr_session=<reviewerId>.<hash>` header (`HttpOnly`,
     `Secure`, `SameSite=Lax`, `Path=/deep-dive/`, `Max-Age` = 7 days).
     `<hash>` is `sha256("wsr-session-v2:" + reviewerId + ":" + password)` —
     not a literal sentinel — so the cookie value is unknowable to anyone
     who hasn't logged in, even if they can read this function's source.
   - The login POST and the subsequent hits both emit a structured log line:
     `{"event":"deep-dive-login"|"deep-dive-hit","reviewer":"…","path":"…","ts":"…"}`.
     `wrangler pages deployment tail` and Logpush pick these up.
   - If no entry matches, the login page is re-rendered with an error.
3. **Request with a matching `wsr_session` cookie** → the function reads
   `reviewerId` from the cookie prefix, recomputes the expected hash from
   that reviewer's password in the map, constant-time-compares, logs the
   hit, and calls `next()` to serve the static asset.

Both the password compare (login POST) and the cookie compare (subsequent
requests) are constant-time. Because each session hash is salted with the
reviewer ID and the current password, **rotating one reviewer's password
invalidates only that reviewer's sessions** — others keep working.

## Configuring reviewers

1. Cloudflare dashboard → **Pages → oconeco-site → Settings → Variables and
   Secrets**.
2. Add a Production variable:
   - **Variable name:** `DEEP_DIVE_REVIEWERS`
   - **Type:** Secret
   - **Value:** a JSON object mapping reviewer ID → password, e.g.:
     ```json
     {"haishan":"<pw>","sean":"<pw>","john":"<pw>","radesh":"<pw>","rohith":"<pw>"}
     ```
3. **Re-deploy** the project (Variables and Secrets changes don't apply to the
   currently-deployed build until you trigger a new deploy).

For Preview deploys, also add the variable under the Preview environment so
the gate works against PR previews while you're iterating.

If `DEEP_DIVE_REVIEWERS` is unset, unparseable, or contains zero valid
entries the function returns `503` rather than silently letting an
empty-string compare succeed.

### Reviewer ID slugs

- First-name lowercase to match the established pattern (`sean`, `john`,
  `haishan`, `radesh`, `rohith`, …).
- Allowed characters: `[a-z0-9_-]`, 1–64 chars (case-insensitive). Entries
  with disallowed IDs are silently dropped from the map at load time.
- The ID is what shows up in logs and (in plaintext) in the cookie prefix.
  Treat it as low-sensitivity — it's the same identifier you'd log
  server-side anyway.

### Choosing passwords

- 4–6 random words from a wordlist (diceware-style) reads well in an email
  and is easy to type on mobile.
- Avoid anything that doubles as a project or person name — reviewers will
  paste these into email and chat.
- Keep the JSON map in a password manager, not in git.
- Each reviewer gets a distinct value; do not reuse passwords across IDs.

## Rotating a reviewer's password

1. Edit the value for that reviewer's key in `DEEP_DIVE_REVIEWERS`.
2. Trigger a re-deploy (or push any commit).
3. Email the new password to that reviewer.

Only the rotated reviewer's outstanding sessions are invalidated. The map's
other entries are untouched, so other reviewers don't see disruption. If
you want to revoke a reviewer entirely, remove their key from the map and
re-deploy.

## Sharing with reviewers

The institutional-outreach email already names a working URL; append the
password as a separate line so it doesn't render as a link:

```
Deep Dive: https://oconeco.com/deep-dive/
Password:  <the diceware string>
```

Reviewer-facing links never need to encode the reviewer ID — attribution
falls out of the password match. Tell reviewers the session lasts a week
per browser; if they come back later they'll be prompted again.

## Edge rate-limit (recommended)

Per-reviewer passwords narrow the search space compared to a single shared
password, so brute-force matters more. Add a CF edge rate-limit rule on
`POST /deep-dive/*` (e.g., 10/min/IP) under **Security → WAF → Rate limiting
rules** in the Cloudflare dashboard. This blunts credential-stuffing without
touching the Function.

## Verifying

```bash
# Unauthenticated request → 401 + login HTML
curl -sI https://oconeco.com/deep-dive/

# Wrong password → 401 + login HTML with error
curl -s -X POST -d 'password=wrong' https://oconeco.com/deep-dive/ | head

# Correct password → 303 + Set-Cookie carrying reviewerId
curl -s -i -c /tmp/wsr.cookies -X POST \
  -d 'password=<haishan-pw>' https://oconeco.com/deep-dive/ | head

# Carrying the captured cookie → 200; logs show reviewer=haishan
curl -sI -b /tmp/wsr.cookies https://oconeco.com/deep-dive/
wrangler pages deployment tail | jq 'select(.event=="deep-dive-hit")'
```

The cookie value is `<reviewerId>.<sha256-hash>`, so you can't synthesise it
by hand without knowing the password — use a cookie jar (`-c` / `-b`) or
copy the value out of devtools after a real login.

### Reading the logs

`deep-dive-hit` fires on every gated request — including assets that live
under `/deep-dive/*` and that a single page view might pull (CSS, images,
attachments). For the binary "did this reviewer show up?" question, that's
fine; raw counts will over-report engagement depth.

When you want a meaningful per-reviewer count, filter to the login event
or dedup by (reviewer, minute):

```bash
# distinct logins per reviewer
wrangler pages deployment tail \
  | jq 'select(.event=="deep-dive-login") | .reviewer' | sort | uniq -c

# distinct (reviewer, minute) tuples across all hits
wrangler pages deployment tail \
  | jq -r 'select(.event=="deep-dive-hit") | "\(.reviewer)\t\(.ts[:16])"' \
  | sort -u | cut -f1 | sort | uniq -c
```

For local iteration, `npx wrangler pages dev ./dist` after `npm run build`
serves the static output with the Functions runtime so you can hit
`http://127.0.0.1:8788/deep-dive/` and exercise the gate end-to-end. Set
`DEEP_DIVE_REVIEWERS` via `--binding 'DEEP_DIVE_REVIEWERS={"haishan":"…"}'`
on the wrangler command line, or a local `.dev.vars` file.

## Scaling

JSON-env-var pattern is fine to ~50–100 reviewers (CF Pages env-var size
limit is a few KB; Function bundle limit is 1MB compressed — neither binds
at this scale). Past ~100 reviewers, migrate to Cloudflare **KV** for
per-reviewer rotations without redeploys. Past ~500, move to a database
(D1 or Postgres via fand-app) + admin UI — by which time Phase 2 should
already be online.

## Public-pages analytics (Phase 1.5 sub-task A)

Per-reviewer attribution covers `/deep-dive/*`. Everything outside that
prefix is covered by **Cloudflare Web Analytics** (Automatic setup —
beacon injected at the edge, no code or template changes, no cookies, no
PII). Enable in the Cloudflare dashboard → **Analytics & Logs → Web
Analytics → Add a site → Automatic setup → `oconeco-site`**.

## Phase 2 upgrade path

When fand-app's `MemberController` is online behind Cloudflare Tunnel:

- Swap the JSON-map lookup in `handleLoginPost` for a token-validation call
  against fand-app (`fetch("https://fand.../auth/validate", …)`).
- The cookie name (`wsr_session`) and the
  `wsr_session=<reviewerId>.<token>` shape are preserved; the `<token>`
  portion becomes a per-reviewer signed token issued by fand-app instead of
  the password-derived hash, and reviewer IDs migrate 1:1 from the JSON map
  to fand-app's member records.
- The URL surface stays identical; only the auth layer changes.

Magic-link / email-based auth, multi-tier gating, and a persisted
attribution dashboard are out of scope for Phase 1.5 and tracked separately.
