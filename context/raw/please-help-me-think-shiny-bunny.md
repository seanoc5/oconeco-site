# Re-publishing oconeco.com — Platform & Architecture Plan

## Context

The current site lives on Webnode (`oconeco.webnode.page`). Sean wants to move off Webnode for three reasons:

1. **LLM-agent editability.** Webnode's editor is hostile to programmatic edits. Sean wants Claude Code / Gemini / Codex to read and modify the site under his oversight.
2. **Future community features.** The site is no longer pure brochure-ware — it needs to accept user-generated content (comments first, possibly more). That means a real backend or a comments-as-a-service layer.
3. **Convergence with `fand-app`.** Sean already runs a Spring Boot 4 / Spring AI / Thymeleaf / HTMX app on a LAN box (`kdeyoga`) fronted by Cloudflare Tunnel. As `fand-app` graduates toward paying customers, he wants the marketing site and the product to live in a coherent operational story — ideally on Cloudflare, where he already has a free-tier footprint.

Confirmed facts from this conversation:
- Owns the custom domain already (the Webnode subdomain is just where it points today).
- No email on Webnode — clean DNS migration, no MX records to wrangle.
- Site is **~30+ pages**, organized: Toolkit (M-LA, ISPP, FRoI), Service levels, Adding Value, Reference, About, Contact. This is medium-sized consulting content, not a 5-page brochure.
- Community/comments are now a stated requirement (was the trigger for the "CMS: yes" pivot mid-conversation).
- Preference: lean into Cloudflare; single provider eventually for both static + JVM.

Goals (in priority order):
1. Agents can edit content with low ceremony.
2. Cheap-to-free at today's traffic; doesn't paint Sean into a corner when `fand-app` productionalizes.
3. Supports comments / community soon, without re-platforming again.
4. Keeps the consulting brand looking sharp (fast, no third-party chrome).

## Recommendation: Hybrid — Astro on Cloudflare Pages + fand-app as the dynamic backend

**Static frontend:** [Astro](https://astro.build) site, content authored as Markdown/MDX files in a git repo, deployed to **Cloudflare Pages**. Astro is markdown-first, component-island architecture, zero JS by default, and is the friendliest SSG for LLM agents in 2026 (vs. Hugo's Go templates or Next's runtime model).

**Dynamic features (comments, member content later):** served by `fand-app`. Add a small `CommentController` + `Comment` JPA entity behind `/api/comments`. Frontend embeds comments via a small Astro island that calls fand-app via Cloudflare Tunnel. When fand-app moves off `kdeyoga`, the API endpoint moves with it — the static frontend doesn't change.

**Why this fits better than the alternatives I considered:**

| Option | Why it loses to the hybrid |
|---|---|
| Headless CMS (Sanity / Payload / Strapi) + Pages | Adds a third system + monthly cost once free tier ends. You already write JPA entities for a living — building `Comment` in fand-app is faster than learning a CMS API. |
| Ghost (self-hosted or Pro) | Off the Cloudflare path; doesn't reuse fand-app skills; monthly cost. Good product, wrong fit. |
| Roll the brochure-ware into fand-app entirely (Thymeleaf-served) | Couples marketing-site uptime to app uptime; harder to put behind aggressive edge caching for SEO; the marketing audience and the app audience deserve different deployment cadences. |
| Decap CMS on top of git later | Not chosen *now*, but a **future option** if a non-engineer ever needs to edit content without touching git. Sits on top of the same markdown repo, no architectural change. |

**Why Cloudflare Pages specifically (over Vercel/Netlify):**
- Sean already trusts and uses Cloudflare. Cloudflare Tunnel for fand-app stays in the same dashboard.
- Free tier is genuinely generous: unlimited bandwidth, 500 builds/month, custom domains, edge caching included.
- Same provider handles DNS, CDN, WAF, and (eventually) Workers/D1/R2 if any dynamic piece needs to be edge-native.
- The "Cadillac" perception is about network/edge quality, not price. Pages is free at this scale; paid tiers are price-competitive with AWS.

## Stack choices

- **SSG:** Astro (markdown + component islands). Reasonable alternative if Sean wants the most boring possible thing: Eleventy. Hugo is faster to build but Go templates are less natural for LLM edits.
- **Repo:** GitHub. `gh` CLI is what every agent (Claude Code, Codex, Gemini CLI) knows best. PR-based review workflow.
- **Deploy:** Cloudflare Pages → connect to GitHub repo → auto-deploy on push.
- **Domain:** transfer to Cloudflare Registrar (at-cost, ~$10/yr for .com) OR leave with current registrar and point nameservers to Cloudflare. Either works.
- **Comments backend:** new `CommentController` + `Comment` entity in fand-app. CORS allow-list for `oconeco.com`. Moderation: simple admin Thymeleaf page in fand-app.
- **Comments frontend:** small Astro component (vanilla JS or a tiny Preact/Svelte island) that fetches from fand-app. No third-party widget chrome.

## Migration steps (rough order, not a commitment to do them now)

1. Inventory: scrape the 30+ Webnode pages into a flat directory of HTML, then have an agent convert to Markdown with frontmatter. Sean reviews diffs. Half a day with Claude Code.
2. Build Astro skeleton with the site's nav structure (Toolkit / Service levels / Adding Value / Reference / About / Contact).
3. Push to GitHub. Wire Cloudflare Pages to the repo. Get a `*.pages.dev` preview URL.
4. Add comments endpoint to fand-app. Wire Astro comments island against it via the Cloudflare Tunnel hostname.
5. DNS cutover: point apex + `www` at Cloudflare Pages. Webnode subdomain decommissioned.
6. **Later, on demand:** Decap CMS layered on the same repo if non-engineer editing ever matters.

## Open questions Sean should think about (not blockers — flag for later)

- **Comment identity.** Anonymous-with-name-and-email? Cloudflare Turnstile for spam? Or require a magic-link verified email (fand-app can do this cheaply)? Recommend: start with name+email+Turnstile, evolve to verified accounts when `fand-app` has a real user model.
- **Newsletter.** If community matters, an email capture is the cheapest engagement mechanism. Buttondown / Listmonk / fand-app endpoint — same hybrid pattern.
- **Analytics.** Cloudflare Web Analytics is free and cookieless; use it instead of GA4 unless there's a specific reason.

## Verification (how to know the migration worked)

- `https://oconeco.com` resolves to Cloudflare Pages and renders the new Astro site over HTTPS.
- `curl -I https://oconeco.com` shows `server: cloudflare` and `cf-ray: ...`.
- All 30+ old URLs either resolve to the new equivalents or 301-redirect. Spot-check with `curl -I` on the top 5 old paths after picking a redirect map.
- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95 (Astro defaults make this easy).
- Comments island on a representative page submits to fand-app and round-trips a moderated comment.
- Webnode subscription can be cancelled without breaking anything (verify the old subdomain is no longer linked from anywhere we control).

## What I'd push back on / suggest changes to

- **(a) is feasible and a good instinct** — git-based markdown is precisely the workflow where agents shine. The "token burn" worry is largely unfounded for a 30-page consulting site updated monthly: each edit is a few hundred tokens.
- **(b)'s "CMS yes" pivot** is correct, but the CMS doesn't need to be a separate product. The hybrid above gives you CMS-like dynamic features by extending the app you already own.
- **(c)'s "same host eventually"** — agree on the spirit, but worth being precise: Cloudflare doesn't run the JVM directly. The "single provider" story is *Cloudflare in front of everything* (DNS, edge, Pages, Tunnel) with the JVM running wherever is cheapest when revenue arrives (Hetzner, Fly.io, Cloud Run). That's still a coherent single-pane-of-glass story operationally.
