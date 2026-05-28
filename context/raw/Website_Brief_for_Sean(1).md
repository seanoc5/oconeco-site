# OconEco Website Overhaul — Brief for Sean

**From:** John (with Claude)  
**To:** Sean (with Claude)  
**Date:** 10 May 2026  
**Purpose:** Initial scoping for one iteration between us before you brief the developer.

---

## The Situation

The current site (oconeco.webnode.page) landing page still captures who we are. Everything else is from a decade ago and doesn't reflect what we've built. Over the past year, the FAND project has produced:

- A complete national balance sheet for 200+ countries (CW = PA + NC + HR + SI), 1950–2025
- Two narrated video presentations proving the concept empirically
- A 12-stage reproducible Python pipeline with SHA-256 audit trail
- US subnational wealth estimates at state and county level (3,258 counties)
- 10 Operational Guidelines codifying methodology
- A 30-term glossary of novel constructs (Hohfeldian framework, Commonwealth-as-wēle, etc.)
- Active institutional outreach (Haishan Fu, Jean Pesme, IARIW submission)

The website needs to make this visible — not as a static brochure, but as a working research platform with gated access for institutional peers.

---

## What the Site Should Communicate

Three things, in this order of priority:

1. **Empirical results exist.** This is not a proposal or a think-piece. We have numbers, we have videos showing what the numbers reveal, we have code that reproduces them. The "Global Leaves" crosstab (7,101 administrative units, 237 countries, the 38x measurement asymmetry finding) is the flagship proof-of-concept. The FAND-vs-CWoN comparative analysis (Appendix E) shows why our approach differs and why it matters.

2. **The conceptual architecture is deep and coherent.** The balance sheet identity, the Hohfeldian classification of rights, the five-scale nested Where hierarchy, the "IS-Branch Principle" (institutional infrastructure that conventional methodologies assume but don't measure). These aren't just ideas — they're implemented in code and validated against data.

3. **This has lineage.** John pioneered the Changing Wealth of Nations at the World Bank 30 years ago. FAND is the continuation — what MEP 1995 would look like if you could rebuild it with modern data, modern compute, and the lessons of three decades watching what worked and what didn't.

---

## Proposed Site Structure

### Public Sections

**Landing Page** — Retain the voice of the current page. Add a 30-second hook video (FAND TL1 Overview.mp4 already exists), three pathway cards to the sections below, and a "latest results" signal.

**"The Evidence"** — Lead with this, not theory.
- Global Leaves video (mp4, 10 min) + a static or interactive version of the 5x5 crosstab
- FAND vs. CWoN comparison (Appendix E video + key charts)
- Country samplers: India, China, USA
- US subnational teaser: state-level CW, county-level GTP

**"The Framework"** — For those who want to understand the architecture.
- Thin Description of FAND (500 words — already written)
- The five scales (TL1 → Block Group)
- Interactive glossary (Glossary of Novel Constructs, 30 entries)
- The balance sheet identity with a worked example

**"The Standards"** — Signals rigor to institutional peers.
- One-line summary of each Operational Guideline (OG-001 through OG-010)
- Expandable for those who want depth
- Link to Replication Package (GitHub or gated)

**"About"** — John's career timeline (IMF 1964 → SNA 1968 → Bolivia → DataBank → MEP 1995 → OconEco). The AI-augmented workflow note. Contact.

### Gated Section (Password or Simple Login)

For institutional outreach (Haishan, Steer, Serageldin, IARIW reviewers):
- Full working papers and Appendix E
- Downloadable workbooks (PA, CW, HR, NC branches)
- Replication Package with documentation
- Full OG documents

---

## Key Assets Already Built

| Asset | Format | Ready? |
|-------|--------|--------|
| Global Leaves CrossTab v4 | .pptx + .mp4 (1080p, 10 min) | Yes |
| Appendix E Comparative Analysis v6JOC | .pptx (John's edit) + narration scripts (HeyGen_AppxE_v2/) | Yes (needs video render from JOC version) |
| FAND TL1 Overview v3 | .pptx + .mp4 | Yes |
| Thin Description of FAND | .docx | Yes |
| Glossary of Novel Constructs | .md (30 entries) | Yes |
| FAND Long Haul (five-scale architecture) | .md | Yes |
| First Principles of FAND Accounting | .docx | Yes |
| Operational Guidelines (10) | .docx + .md | Yes |
| Replication Package | Python + MANIFEST.md + checksums | Yes |
| Country CrossTabs (India/China/USA) | .pptx | Yes |
| US state/county workbooks | .xlsx + .csv panels | Yes |

---

## What We Don't Need

- The "My Life in Numbers" memoir — separate channel, different audience, defer
- A blog (for now) — we're not ready to maintain one; the presentations and papers ARE the content
- Consulting services framing — premature; the site should establish credibility first
- Any raw data files (QCEW CSVs, BEA ZIPs) — pipeline inputs don't belong on a public site

---

## Technical Notes for the Developer

1. **Video hosting** — Two .mp4 files (Global Leaves ~10 min, FAND Overview ~5 min) need clean embedding. Vimeo or YouTube unlisted with embed is fine.

2. **Gated access** — Must support password-protected pages. Track access if possible (did Haishan's team look at the workbooks?). WordPress + membership plugin is the obvious path; a simpler static-site + auth layer (Netlify Identity, Supabase Auth) works too.

3. **Interactive stretch goals** — If budget allows: the 5x5 Global Leaves crosstab as a clickable D3 visualization, the What-hierarchy as a collapsible tree, and the Where-gazetteer as a map. These are Phase 2, not blockers for launch.

4. **Domain** — Register oconeco.com if available. If not, alternatives TBD.

5. **Content management** — John needs to be able to update text and upload new documents without developer involvement. Whatever the platform, this is non-negotiable.

---

## How We Prepare the Materials (Division of Labor)

The developer should never have to interpret, distill, or navigate our working folders. That's not his job — and frankly the material in its current form would be incomprehensible to anyone who hasn't lived inside the project.

**What we (John + Claude) deliver to Sean, who delivers to the developer:**

For each section of the site, we produce a *website-ready content packet* — final text, final images, final video files, all named and sequenced so the developer's job is purely layout and implementation. Specifically:

1. **Landing page packet** — Final prose (HTML-ready markdown), hero image, embedded video file (or YouTube/Vimeo link), card text for the three pathway links. Delivered as a single folder.

2. **Evidence section packet** — For each sub-page (Global Leaves, Appendix E, Country Samplers, US Subnational): final explanatory text (2-3 paragraphs per page), the video embed link, and 3-5 static chart images exported from the .pptx files as high-res PNGs with captions. If we do an interactive crosstab, we deliver the working D3/Observable notebook — but that's Phase 2.

3. **Framework section packet** — The Thin Description (already written, needs minor web-formatting edit), the glossary entries as structured data (term / definition / cross-references — easily rendered as an accordion or searchable list), and the five-scale diagram as an SVG or high-res image with alt text.

4. **Standards section packet** — One-line summary + one-paragraph expansion for each OG, delivered as a structured markdown file the developer drops into an accordion component.

5. **About page packet** — Career timeline entries (year, role, institution, one sentence), portrait photo, and 2-3 paragraphs of prose.

6. **Gated section** — File list with download links. We organize the PDFs/workbooks into a clean folder structure with a README; the developer just wires up the download UI and auth layer.

**Timeline estimate for content preparation:**

- Landing page + About: 1 session (we could do this today)
- Evidence section (all sub-pages): 2-3 sessions — the main work is exporting charts from .pptx as images and writing the contextual prose for each
- Framework section: 1-2 sessions — mostly reformatting existing documents
- Standards section: 1 session — mechanical extraction from OG documents
- Gated section file organization: 1 session

Total: roughly **6-8 working sessions between John and Claude** to produce everything the developer needs. Call it 2-3 weeks if we do one session per day on this track, interspersed with other FAND work. Could compress to 1 week if this is the sole focus.

**What Sean's role is:** Review each packet for tone, check that the developer can work from it without questions, and handle the developer relationship (timeline, budget, feedback loops). Sean does NOT need to understand the methodology or make editorial judgments about which chart goes where — we handle that.

**What the developer's role is:** Take our content packets and build pages. Choose fonts, spacing, responsive breakpoints, implement the auth layer, optimize images, deploy. He should never need to open a .pptx file, read a session log, or decide what content means.

---

## Implications for LightSpot / CorpusMinder Integration

This website exercise isn't just about a public-facing site. It's also a forcing function for deciding what gets ingested into Sean's LLM platform and in what form.

**The website content packets become LLM training/reference material.**

Every piece we prepare for the website — the Thin Description, the glossary entries, the OG summaries, the chart captions, the evidence narratives — is simultaneously a candidate for structured ingestion into LightSpot/CorpusMinder. The act of distilling our working materials into web-ready prose produces exactly the kind of authoritative, self-contained, well-scoped text chunks that an LLM needs as grounding material.

**What the website exercise surfaces for Sean's architecture:**

1. **The "What" hierarchy as a retrieval scaffold.** The 415-node classification tree isn't just a website navigation element — it's potentially the taxonomy LightSpot uses to route queries. When someone asks "what's Nigeria's natural capital position?", the system needs to know that Natural Capital = code 1.1.1.3 = sum of fossil fuels + minerals + fisheries + agland + forests. The website's interactive tree and the LLM's retrieval index could share the same structured data source.

2. **The Operational Guidelines as system prompts.** Each OG codifies how FAND handles a specific methodological domain. These are natural candidates for retrieval-augmented generation — when a user asks about PPP conversions, the system pulls OG-004; when they ask about produced assets pedigree, it pulls OG-003. The one-paragraph summaries we write for the website become the "quick context" layer; the full OG documents become the deep retrieval layer.

3. **The Glossary as entity definitions.** The 30-term Glossary of Novel Constructs defines FAND's conceptual vocabulary in a way that no general-purpose LLM would know. These entries — Abductive Triage, Commonwealth-as-wēle, Synaptic Cleft, Hohfeldian classification, IS-Branch Principle — are exactly what Sean's system needs to understand and use OconEco's language correctly rather than defaulting to mainstream economics terminology.

4. **Country page notes as the LLM's "exceptions to expectations" layer.** This is where LightSpot's generative capability becomes most valuable. The website will eventually host country deep dives. Sean's LLM can generate the "why is this country unusual?" commentary for each — but only if it has been grounded in the balance sheet identity, the methodology, and the data. The website content packets give it that grounding.

5. **The Replication Package as executable knowledge.** The 12-stage Python pipeline (run_all.py) is not just code — it's a machine-readable specification of how every number in FAND is produced. Sean's system could potentially trace any published number back through the pipeline to its source data. The website's Replication Package download is the human-readable version; the LLM gets the same material as structured context.

**Practical sequencing:** As we prepare each website content packet, we flag which components are also LLM-ingest candidates and in what format (structured JSON for hierarchies, markdown for prose, Python docstrings for pipeline logic). This means the website build and the LLM knowledge-base build happen in parallel from the same preparation work — not as two separate efforts.

---

## Open Questions (For Our Next Iteration)

1. Do you have a sense of the developer's stack preferences? That determines whether we aim for WordPress, a JAMstack site (Next.js/Astro on Vercel), or something else.

2. Budget envelope — does it include custom interactive visualizations (D3/Observable), or are we working with embedded videos and static images for Phase 1?

3. Timeline — is there a hard date? The Haishan outreach and IARIW submission create natural pressure points.

4. The tone question: I lean toward "think-tank with academic depth on drill-down" rather than pure academic journal. Your view?

5. Should the gated section be a single shared password (simpler) or individual accounts (more trackable)?

---

## Where to Find Everything

All source material lives in two OneDrive folders:

```
OconEco/claude/BC_Hybrid/Presentations/  — Videos, decks, scripts
OconEco/claude/BC_Hybrid/MEP_Redux/      — Core conceptual docs
OconEco/claude/B_Advocacy/               — External-facing papers
OconEco/claude/C_Technical/Guidelines/   — OG documents
OconEco/claude/C_Technical/Operational_Guidelines/  — OG-008, OG-009
OconEco/claude/Replication_Package/      — Full reproducible pipeline
```

The companion file `OconEco_Website_Scoping_for_Sean.md` (in this same folder) has the full inventory with file-by-file detail if the developer needs to locate specific assets.

---

*Next step: Sean reviews, pushes back, we iterate once, then this becomes the developer brief.*
