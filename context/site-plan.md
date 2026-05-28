# OconEco Site Plan — Restructuring from Webnode Legacy to FAND-Era Site

**Status:** Draft 1 — synthesized 2026-05-28 from material in `context/raw/`.
**Awaiting:** Sean's review + John's sign-off on IA before any content rewrites begin.

---

## 1. What the site must do (synthesized from the briefs)

From **`Website_Brief_for_Sean(1).md`** and **`Developer_Brief_Website_v2.html`** and **`OconEco_Website_Vision_v5.pptx`**:

The site exists to make **FAND results visible** to:
1. **Institutional peers** (World Bank alumni, IARIW, academic reviewers, development agencies) — these are the first priority audience. Phase 1 success = Haishan Fu's team, Andrew Steer, Serageldin actually open the gated workbooks and read Appendix E.
2. **The broader research / policy public**, eventually — people who want to understand how places build or lose wealth at country / state / county scale.
3. **Future paying-consulting / API customers** — Phase 3, not Phase 1.

The single-sentence hook (slide 2 of vision deck):

> **"GDP tells you what a country *earns*. We measure what it *owns*."**

The empirical assets that anchor the site exist *today*:
- Complete national balance sheet `CW = PA + NC + HR + SI`, 200+ countries, 1950–2025 — verified to $0.000000
- US subnational extension: 51 states + 3,258 counties
- Two narrated videos (Global Leaves crosstab 10 min; FAND TL1 Overview 5 min)
- 12-stage reproducible Python pipeline with SHA-256 audit trail
- 10 Operational Guidelines, 30-entry Glossary of Novel Constructs, full replication package

The site is **not a brochure**. It is the *public face of a working research platform*, with a gated section for institutional reviewers.

---

## 2. The four navigation axes (the architectural commitment)

Every page on the site has to honor these. They come from §4 of the developer brief and slide 6 of the vision deck:

| Axis | Type | What it is | Where it lives in UI |
|---|---|---|---|
| **Where** | PRIMARY | Spatial drill-down: World → Country → US State → US County | The main left-hand or top navigation. Maps/lists, click to zoom. |
| **What** | PRIMARY | Thematic drill-down: Balance Sheet → Claim-Rights / Substantive Rights → branches → individual commodities (415-node tree) | Collapsible tree on Framework page; reused as drill-down on every balance-sheet view. |
| **Source** | SUPPORTING | Every published number links to its source agency, table, year, URL | Inline footnote pattern on every data value, not a bibliography page. |
| **Methodology** | SUPPORTING | OGs (accordion) + NUSAP (data-quality metadata) on every value | Methodology page houses the registry; NUSAP appears as progressive disclosure (hover → spread/assessment → full pedigree). |

The four-axis commitment is the **biggest single departure** from the legacy site. The legacy site is organized around *consulting concepts* (toolkit, service levels, perspectives, dimensions). The new site is organized around *empirical content* navigated four ways. That difference is why ~75% of legacy pages retire.

---

## 3. Information architecture (six top-level sections)

> **"Information architecture" (IA)** = the structural decisions about what top-level sections exist, what nests under what, and what URLs look like. It is the highest-reversibility-cost layer of the site — once content, redirects, and inbound links are wired to a given IA, changing it is expensive. Hence the emphasis on agreeing on §3 *before* writing content.

From §8 of the developer brief and slide 10 of the vision deck:

```
oconeco.com
├── /                          Landing — the 30-second hook
├── /evidence/                 Results & data views (the lead section)
│   ├── /evidence/global/      Global Leaves crosstab + video
│   ├── /evidence/comparison/  FAND vs CWoN (Appendix E)
│   ├── /evidence/countries/   Country samplers (India, China, USA)
│   ├── /evidence/us-states/   US state map → state balance sheets
│   └── /evidence/us-counties/ County drill-down (commuter dynamics)
├── /framework/                Conceptual architecture
│   ├── /framework/balance-sheet/  CW = PA + NC + HR + SI with worked example
│   ├── /framework/scales/         Five spatial scales (TL1 → Block Group)
│   ├── /framework/what-tree/      Interactive 415-node hierarchy
│   └── /framework/glossary/       30-term Glossary of Novel Constructs
├── /methodology/              Rigor signals
│   ├── /methodology/og/       OG-001 through OG-010 accordion
│   ├── /methodology/nusap/    Data-quality framework explainer
│   ├── /methodology/sources/  Source agency directory
│   └── /methodology/replication/  Link to GitHub replication package
├── /about/                    John's lineage + AI-augmented research note + contact
└── /deep-dive/                PASSWORD-PROTECTED
    ├── working papers
    ├── workbook downloads (PA / CW / HR / NC / cross-border, per country)
    ├── full OG documents
    └── replication package documentation
```

**One unifying template:** the *balance-sheet page*. It renders the same `CW = PA + NC + HR + SI` structure at every spatial scale; narrative text and cross-border framing swap depending on whether you're at World, Country, State, or County. The developer brief makes this an explicit UX commitment (§3, "UX implication: you're building one balance-sheet page template that renders at any scale").

---

## 4. Legacy content audit — KEEP / REPURPOSE / RETIRE

Of the 60 pages migrated from Webnode, **~10 keep, ~6 repurpose, ~44 retire**. That matches Sean's "60–80% outdated" estimate.

### KEEP (with content refresh) — 4 pages

| Slug | Current title | Why it stays |
|---|---|---|
| `home` / `index` | Oconeco | Becomes the new Landing. **All content replaced** with the dev-brief Section 8 spec (hook video, 3 pathway cards, one headline stat). The slug stays. |
| `about-us` | About us | Becomes `/about/`. Content replaced with John's career timeline (IMF 1964 → SNA 1968 → Bolivia → DataBank → MEP 1995 → OconEco) + AI-augmented research note. |
| `contact` | Contact | Lightly refresh; add Turnstile if comments come online. |
| `site-map` | Site map | Keep but **auto-generate** from Astro routes — don't hand-maintain. |

### REPURPOSE (slug kept, content rewritten) — 6 pages

| Slug | Current title | New role |
|---|---|---|
| `working-papers` | Publications | Move into `/deep-dive/` as the gated working-papers list. |
| `reference-materials` | Reference materials | Move into `/methodology/sources/` as the source-agency directory. |
| `sroi` | FRoI | If FRoI survives as a published OconEco construct, it belongs in `/framework/glossary/` as an entry, not as a top-level page. Otherwise retire. **Decide with John.** |
| `human-resources-hr` | Human Resources (HR) | The *name* matches the new `HR` (1.1.2.1) in `CW = PA + NC + HR + SI` but **the current content is from the old framing**. Rewrite from scratch as `/framework/balance-sheet/hr/` or merge into the glossary. |
| `social-infrastructure-si` | Social Infrastructure (SI) | Same: name matches new `SI`/`SR`, content does not. Rewrite. |
| `operational-guidelines` | Operational Guidelines | Replace entirely with the new OG-001..OG-010 set. Slug → `/methodology/og/`. |

### RETIRE — 44+ pages

All of these reflect the *old consulting/toolkit framing* (M-LA, ISPP, 2xP3/SWOT/Disruptive logic, dimensions, scales-as-perspectives, stakeholder engagement methodology) that does not appear anywhere in the new vision documents. They are not "wrong" — they are a different OconEco era. If any concept is genuinely load-bearing for the new site, it gets resurrected as a *glossary entry* under `/framework/glossary/`, not as a top-level page.

<details>
<summary>Full retirement list (click to expand)</summary>

`a-2xp3-logic`, `b-swot-logic`, `c-disruptive-logic`, `ot` (Toolkit), `our-services` (Service levels), `about-you` (Adding value), `multi-local-analytics-mla`, `ispp`, `appetizers` (Sampler), `analyzing-a-website-for-gri-applicability`, `blending-word-number-oriented-docs`, `broken-cross-rates`, `changing-minds`, `collecting-relevant-information`, `concept-hierarchy`, `corpus-minder`, `dashboards`, `decision-cycle`, `defining-stakeholders`, `defining-stakeholders2`, `evidence-triage`, `evidentiary-processes`, `exchanging-value-signals`, `feedback`, `finding-matches`, `gaia-metrics-legacy-system`, `getting-agreement-on-priorities`, `human-dimensions`, `in-progress`, `location-dimensions`, `macro`, `meso`, `micro`, `mind-benders-from-others`, `monitoring-environmental-progress`, `more-on-froi`, `physical-financial-dimensions`, `procedures` (Perspectives), `processes` (Procedures), `productivity-of-capita-2-fl-counties`, `recognizing-stakeholder-interests`, `scales`, `setting-monitoring-performance-goals`, `stakeholder-engagement-find` (FIND), `tasks`, `upgrade-abductive-reasoning`, `user-recovery`, `user-registration` (gated section will reissue if needed), `value-signals`, `works-in-progress-samplers`

</details>

**Treatment:** delete the .md files from `src/content/pages/`. For each retired URL, add a 301 redirect entry in the eventual Cloudflare Pages `_redirects` file pointing to the closest new equivalent (most will redirect to `/framework/` or `/`).

---

## 5. New pages required (by section)

These do not exist in the legacy site. Each will be authored from a **content packet** that John + Claude (the FAND-side Claude) prepare; the agent on this side (us) lays them out into Astro pages and components.

### Landing — 1 page
- `/` — hero hook video (FAND TL1 Overview 5 min), three pathway cards (Evidence / Framework / Methodology), one headline stat, "latest results" signal

### Evidence — 5 sub-pages + 1 index
- `/evidence/` — section index
- `/evidence/global/` — Global Leaves 10-min video + the 5×5 crosstab (static PNG Phase 1, interactive D3 Phase 2)
- `/evidence/comparison/` — Appendix E FAND-vs-CWoN comparative analysis (video + key charts)
- `/evidence/countries/` — India, China, USA balance-sheet snapshots (likely one shared template, three data files)
- `/evidence/us-states/` — state-level CW choropleth → state detail pages
- `/evidence/us-counties/` — county-level GTP drill (3,258 counties; commuter-flow story)

### Framework — 4 sub-pages + 1 index
- `/framework/` — section index
- `/framework/balance-sheet/` — 500-word Thin Description + worked example with one country's actual numbers
- `/framework/scales/` — Five-scale diagram (TL1 → Block Group)
- `/framework/what-tree/` — Interactive 415-node collapsible tree (Phase 1: PNG of slide 7 + flat list; Phase 2: real D3 tree)
- `/framework/glossary/` — 30 entries, accordion or searchable list, structured JSON behind

### Methodology — 4 sub-pages + 1 index
- `/methodology/` — section index
- `/methodology/og/` — OG-001..OG-010 accordion, one-line summaries default-collapsed
- `/methodology/nusap/` — NUSAP legend + how it appears progressively on data values
- `/methodology/sources/` — agency directory with chips (WDI, IMF, FAO, USGS, EIA, OECD, UN WPP, BIS, BEA, BLS, Census, NOAA, USDA NASS, IHME/CHR)
- `/methodology/replication/` — link to GitHub replication package + MANIFEST/checksums summary

### About — 1 page
- `/about/` — John's career timeline + AI-augmented research note + portrait + contact form

### Gated Deep Dive — password-protected
- `/deep-dive/` — index with file listing UI
- Working papers (the existing `working-papers.md` material moves here)
- Workbook downloads (PA / CW / HR / NC / cross-border, per country)
- Full OG documents (the deep version of `/methodology/og/`)
- Replication package downloads + documentation

---

## 6. Cross-cutting requirements (not in any single page)

These come from the **Duval Software audit (`report.pdf`)** of the current Webnode site, which grades it **58 / F**. The audit's findings dictate baseline work the new site must do regardless of content:

- **Schema.org JSON-LD on every page** — `Organization` (site-wide), `Person` (about), `Article` / `TechArticle` (evidence/framework pages), `FAQPage` (where FAQs exist), `BreadcrumbList` (navigation). Currently absent → contributes to 44/F on AI SEO Readiness.
- **FAQs on the landing and each section index** — 3–6 questions each. AI answer engines reward FAQ schema; current site has none.
- **Testimonials / quotes near CTAs** — institutional endorsements once they exist (Haishan, Steer, Serageldin would all qualify). Current Trust & Proof score is 68/D+ specifically because no review signals were detected.
- **Open Graph + Twitter card meta on every page** — currently absent.
- **DNS hygiene** — SPF/DKIM/DMARC on the domain even if email isn't hosted there. Audit flagged "SPF was not detected" → Technical/Domain Health 62/D-.
- **Sitemap.xml + robots.txt + RSS feed** — Astro provides these via integrations; wire them up at scaffold time.
- **Cloudflare Web Analytics** — free, cookieless, replaces the absent GA setup. Per `please-help-me-think-shiny-bunny.md` §"Open questions".

---

## 7. Phase plan (sequencing)

Borrowed from the vision deck slide 11 and the dev brief §10.

**Phase 1 — Static + Video + Gated downloads** (target: mid-July 2026 for institutional outreach window)
- All six top-level sections rendered with content packets
- Static images for crosstab + What tree (no D3 yet)
- Shared-password gating on `/deep-dive/`
- Schema, FAQs, OG cards, DNS hygiene all in
- Cloudflare Pages deployed; oconeco.com live; webnode subdomain decommissioned

**Phase 2 — Interactives** (Q3 2026)
- D3 5×5 Global Leaves crosstab
- Interactive collapsible What hierarchy
- US county choropleth map
- Individual reviewer accounts on `/deep-dive/` (replace shared password)
- Comments via fand-app `CommentController` (see shiny-bunny doc)

**Phase 3 — Public launch + ongoing platform** (~Sep 2026 onward)
- Marketing push beyond institutional list
- Newsletter signup
- Possible LightSpot/CorpusMinder integration where the site's structured data (What tree, glossary, OG summaries) becomes the LLM grounding layer described in §"Implications" of the Sean brief

---

## 8. Open questions for the next iteration with John

These are blockers on Phase 1 content production, not blockers on the IA decision:

1. **Glossary entries** — are the 30 terms ready as a structured file (term / definition / cross-refs), or still .docx? The dev brief promises them as structured JSON; we need to confirm format.
2. **What hierarchy data** — does a flat JSON of the 415 nodes exist? If yes, Phase 1 can render it as a static collapsible list trivially. If no, we render slide 7's image as PNG and defer to Phase 2.
3. **Country sampler data shape** — are India / China / USA samplers individual `.pptx` files, or do they share a JSON schema we can drive a template from? The Sean brief says `.pptx`; that means Phase 1 = static PNG charts + prose, Phase 2 = data-driven.
4. **FRoI** — does it survive as a named OconEco construct in the FAND era, or is it superseded? Determines whether the legacy `sroi.md` page rewrites to a glossary entry or simply 301s to `/framework/`.
5. **Gating mechanism** — shared password (Phase 1, simple — basic-auth at Cloudflare Pages edge or via fand-app proxy) vs individual accounts (Phase 2, fand-app `MemberController`)?
6. **Tone** — John's open question to Sean: "think-tank with academic depth on drill-down" vs pure academic journal. Need a decision before writing landing copy.

---

## 9. What to do next

Order of operations to unblock everything else:

1. **Sean reviews this plan** with John; agree on the six-section IA and the keep/retire list (the IA is the biggest reversibility cost).
2. **Scaffold the new Astro routes** that match §3 above — empty pages, but the navigation skeleton in place. This makes the IA tangible without committing to any content yet.
3. **Decide the gating mechanism** for Phase 1 (basic-auth via Cloudflare Workers is the cheapest path; fand-app proxy is the most flexible).
4. **Retire the legacy pages in a single PR** with a `_redirects` map preserving the closest landing point for each old URL.
5. **First content packet from John + FAND-side Claude**: the landing page. Per the dev brief, that's the smallest, cleanest one — a good calibration round.
6. **In parallel:** wire schema.org / OG / sitemap / robots / Cloudflare Analytics into the Astro scaffold so every page that lands inherits them automatically. This addresses the Duval audit baseline without per-page work.
