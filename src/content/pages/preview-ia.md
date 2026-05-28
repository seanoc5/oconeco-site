---
title: "Preview — proposed new site structure"
slug: "preview-ia"
description: "Strawman scaffold of the six-section information architecture proposed for OconEco.com — for John's review."
---

> **This is a strawman preview, not the live site.** Every page below is a placeholder drafted from the briefs in `context/raw/` so John can react to the *shape* of the new site before any retirement of legacy pages happens. Real content arrives via the content-packet workflow described in `Website_Brief_for_Sean(1).md`.

The full plan and the keep/retire audit live in [`context/site-plan.md`](https://github.com/seanoc5/oconeco-site/blob/main/context/site-plan.md) on the repo. The six open questions are issues [#2](https://github.com/seanoc5/oconeco-site/issues/2) through [#7](https://github.com/seanoc5/oconeco-site/issues/7).

## Walk the proposed IA

### [Landing](/preview-ia/landing/)
The new 30-second hook — "GDP tells you what a country *earns*. We measure what it *owns*."

### [/evidence/](/evidence/) — empirical results (the lead section)
- [Global Leaves crosstab](/evidence/global/)
- [FAND vs CWoN comparison](/evidence/comparison/)
- [Country samplers](/evidence/countries/) — India, China, USA
- [US states](/evidence/us-states/)
- [US counties](/evidence/us-counties/)

### [/framework/](/framework/) — conceptual architecture
- [The balance sheet equation](/framework/balance-sheet/)
- [Five spatial scales](/framework/scales/)
- [The "What" hierarchy (415 nodes)](/framework/what-tree/)
- [Glossary of Novel Constructs (30 terms)](/framework/glossary/)

### [/methodology/](/methodology/) — rigor signals
- [Operational Guidelines (OG-001..OG-010)](/methodology/og/)
- [NUSAP — data quality](/methodology/nusap/)
- [Source agency directory](/methodology/sources/)
- [Replication package](/methodology/replication/)

### [/about/](/about/) — lineage
John's career timeline (IMF → World Bank DataBank → MEP 1995 → OconEco) + AI-augmented research note.

### [/deep-dive/](/deep-dive/) — password-protected
For named institutional reviewers: working papers, downloadable workbooks, replication-package documentation, full OG documents.

---

## What's stable vs what's draft

| Layer | Status |
|---|---|
| The **six top-level sections** | Strawman for John's approval. Highest reversibility cost. |
| The **sub-page split** under each section | Strawman — easier to merge/split than the top-level decision. |
| The **URLs** (`/evidence/global/` etc.) | Strawman — bikeshed in the meeting if any reads wrong. |
| The **prose on each page** | Placeholder drawn from the briefs. Will be replaced wholesale by content packets per the dev brief §10. |
| The **diagrams + videos** | Not yet embedded. Need source files from John's OneDrive. |

The cross-cutting baseline (schema.org JSON-LD, OG meta, sitemap, RSS, Cloudflare Web Analytics, DNS hygiene) is being built in parallel as issues [#8](https://github.com/seanoc5/oconeco-site/issues/8) through [#11](https://github.com/seanoc5/oconeco-site/issues/11) — those land regardless of how the IA review goes.
