# Contact Form Runbook — /about/ #contact

Operator runbook for the contact form on `/about/` ("Working with OconEco"
section) and its server-side handler at `/api/contact`.

Closes issue #34 (per #26 / PR #29). The form lives alongside the
existing `mailto:sean@oconeco.com` link — the form is the primary
affordance; the mailto stays as a secondary fallback for people who
prefer their own mail client.

## Architecture

```
Browser
  /about/#contact  ──── POST application/x-www-form-urlencoded ────►  /api/contact
                                                                          │
                                                                          ├── verify Turnstile token (siteverify)
                                                                          ├── send via Resend HTTP API
                                                                          └── 303 redirect → /about/?contact=sent#contact
```

- **Frontend:** the form is inline HTML inside
  `src/content/pages/about.md` (Astro markdown passes raw HTML through).
  A small `<script>` block renders the Turnstile widget (if the site
  key meta tag is present) and shows the thank-you / error banner
  based on the `contact` query param after a 303 redirect.
- **Backend:** `functions/api/contact.ts` — Cloudflare Pages Function.
  Same deployment pipeline as the `/deep-dive/` gate; nothing extra
  to wire up at deploy time beyond the env vars below.

## Env vars

All are set on the Cloudflare Pages project (Settings → Environment
variables) for both **Production** and **Preview** environments,
unless you want the preview deploys to skip sending.

| Var | Where | Required? | Purpose |
|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Plain text (Production + Preview) | Production: yes | Client-side Turnstile widget renders this site key. Build-time only — the `PUBLIC_` prefix is what makes Astro expose it to the browser. If absent at build time, the widget simply doesn't render and submissions go through without Turnstile (server-side verification also skips). |
| `TURNSTILE_SECRET` | **Secret** | Production: yes | Server-side siteverify call. Pair this with the site key above. If absent, server skips verification (useful for `wrangler pages dev`). |
| `RESEND_API_KEY` | **Secret** | Production: yes | Resend HTTP API key for outbound send. If absent, submission is logged and treated as sent — the form will say "thanks" but no email goes out. |
| `CONTACT_FORM_TO` | Plain text or Secret | Production: yes | Destination inbox, e.g. `sean@oconeco.com`. Never exposed in client HTML. |
| `CONTACT_FORM_FROM` | Plain text | Production: yes | Verified sender on Resend, e.g. `contact@oconeco.com`. Must match a verified domain in the Resend dashboard (see below). |

## One-time setup

### 1. Cloudflare Turnstile

1. Cloudflare dashboard → Turnstile → Add site.
2. Domain: `oconeco.com`. Widget type: **Managed** (recommended).
3. Copy **Site Key** → set `PUBLIC_TURNSTILE_SITE_KEY` in the Pages
   project env vars (Production + Preview, both).
4. Copy **Secret Key** → set `TURNSTILE_SECRET` as a **Secret** in
   the same Pages env-vars panel.
5. Trigger a new Pages build so the site key is baked into the HTML
   (commits to `main` auto-build; or use Deployments → Retry).

### 2. Resend

1. [Sign up at resend.com](https://resend.com/) if you haven't.
2. Add `oconeco.com` as a domain. Resend will give you DNS records
   (DKIM CNAME, SPF TXT, optionally MX). Add them at the Cloudflare
   DNS dashboard. Wait for Resend to mark the domain "Verified".
3. Create an API key (Resend → API Keys → Create). Scope it to
   `Send access` for `oconeco.com` only.
4. Copy the key → set `RESEND_API_KEY` as a **Secret** in the Pages
   env-vars panel.
5. Set `CONTACT_FORM_FROM` to a sender on the verified domain, e.g.
   `contact@oconeco.com`. (Resend rejects sends from unverified
   senders.) The address does not need a real mailbox — the form's
   `Reply-To` is set to the submitter's email, so replying lands in
   the right place.

### 3. Destination inbox

Set `CONTACT_FORM_TO` to whatever inbox should receive submissions
(e.g. `sean@oconeco.com`). Since this lands at the Workspace inbox
via Resend, no MX changes are needed beyond what's already in place.

## Local dev

```
npm install
npx wrangler pages dev -- npm run build
```

With **no env vars set**, the form will:
- Not render a Turnstile widget (no site key meta → script doesn't load).
- Submit successfully (server-side Turnstile check is skipped when
  `TURNSTILE_SECRET` is absent).
- Log the submission to the Wrangler console (no Resend send when
  `RESEND_API_KEY` is absent) and show the thank-you state.

To exercise Turnstile locally, set both:

```
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA  # Cloudflare's "always-passes" test key
TURNSTILE_SECRET=1x0000000000000000000000000000000AA
```

(These test keys come from [Cloudflare's Turnstile dummy keys
docs](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
— there's an "always-fails" pair too for negative-path testing.)

## Acceptance criteria (from #34)

- [x] Form on `/about/` in the Working with OconEco section.
- [x] `mailto:sean@oconeco.com` link kept alongside as a secondary
      affordance.
- [x] Turnstile widget on the client; server-side siteverify in the
      Pages Function.
- [x] Email destination is env-driven (`CONTACT_FORM_TO`), never
      exposed in the client HTML or in the form POST body.
- [x] Successful submit shows a thank-you state.
- [ ] **Operator follow-up:** smoke-test with the live Turnstile
      site/secret keys before announcing the form (the
      "always-passes" dummy keys are only for dev).

## Failure modes worth knowing

| Symptom | Likely cause |
|---|---|
| Submit redirects to `?contact=error&reason=turnstile-failed` | `TURNSTILE_SECRET` is wrong or unset on Production while the site key is set (mismatched pair). |
| Submit "succeeds" but no email arrives | `RESEND_API_KEY` absent → Function is in log-only mode. Check the Pages Function logs (`wrangler pages deployment tail`) for `contact-submission-unsent` events. |
| Submit shows `?contact=error&reason=send-failed` | Resend API call failed — likely sender-domain not verified, or quota exhausted. Function log will have `contact-resend-error` with the HTTP status. |
| Turnstile widget never appears | `PUBLIC_TURNSTILE_SITE_KEY` was unset at **build time**. `PUBLIC_` env vars are baked into the static build, not read at runtime — you must trigger a rebuild after setting it. |
