# oconeco-site

Marketing / consulting site for [OconEco](https://oconeco.com). Static frontend
built with [Astro](https://astro.build); dynamic features (comments, future
member content) served by [`fand-app`](../fand-app/) over a Cloudflare Tunnel.

Deployed to **Cloudflare Pages** via the connected GitHub repo (auto-deploy on
push to `main`).

## Project layout

```
src/
├─ content/pages/         Markdown content (one file per page; frontmatter: title, slug, sourceUrl)
├─ layouts/SiteLayout.astro
├─ pages/
│  ├─ index.astro         Renders content/pages/index.md
│  └─ [...slug].astro     Renders every other content/pages/*.md by slug
└─ content.config.ts      Schema for the `pages` collection

public/styles/site.css    Site-wide stylesheet
scripts/convert-webnode.py  One-shot migration script (HTML → Markdown)
```

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Static build → `dist/` (what Cloudflare Pages serves) |
| `npm run preview` | Serve the production build locally |

## Editing content

This site is designed to be edited by humans **or** LLM agents (Claude Code,
Codex, Gemini CLI). Both follow the same workflow:

1. Edit a Markdown file under `src/content/pages/`.
2. `npm run build` locally to verify the page still compiles.
3. Open a PR. Cloudflare Pages will build a preview URL on every PR.
4. Merge to `main` → production deploys automatically.

Frontmatter required on every page:

```yaml
---
title: "Human-readable page title"
slug: "kebab-case-slug"        # must equal the filename
sourceUrl: "https://..."        # optional; points at the original Webnode URL
description: "..."              # optional; meta description for SEO
---
```

## Migration history

The 61 pages under `src/content/pages/` were converted in May 2026 from the
previous Webnode site (`oconeco.webnode.page`) using
`scripts/convert-webnode.py`. The script slices `<section class="s-basic ...">`
content out of each mirrored HTML file and runs it through `pandoc` to GFM.

Internal links in the markdown still use the old Webnode-style
`../path/index.html` form. Rewriting these to clean `/slug/` form is a separate
pass; broken links won't break the build.
