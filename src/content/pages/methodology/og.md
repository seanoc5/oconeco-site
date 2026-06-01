---
title: "Operational Guidelines (OG-001..OG-010)"
slug: "methodology/og"
description: "10 guidelines codifying how FAND handles specific methodological domains. One-line summaries visible by default; full text on expand."
---

> **Strawman.** Phase 1 ships the one-line summaries with expandable bodies. The full OG documents (`.docx` + `.md`) live in the gated [/deep-dive/](/deep-dive/) section. Final text will replace these placeholders once the OG content packet is delivered.

# Operational Guidelines

The 10 OGs codify FAND's methodological decisions in a single place. Each is a self-contained guideline that an institutional reviewer can reference without having to read the entire framework. Together, they signal that this is peer-grade work — opinions about edge cases are written down, not vibed.

## The 10 guidelines (placeholder one-liners)

- **OG-001 — Source ladder discipline.** Tier 1 (authoritative agency) → Tier 2 (compiled aggregate) → Tier 3 (researcher estimate) → Tier 4 (model fallback). Every published number records its tier.
- **OG-002 — Ratio-splice protocol (S287).** All multi-source splices use ratio-splicing, never butt-splicing. Codified in `parameters.json`.
- **OG-003 — Produced-asset pedigree.** OECD Source A as anchor; PIM for countries without direct OECD data; 4-tier source ladder; 211 countries covered (per State of FAND §4.1).
- **OG-004 — PPP conversions.** When to use PPP, when to use Atlas USD, when to use market exchange rates. Currently the default is Atlas USD for cross-country comparability.
- **OG-005 — Cross-border per-side discipline.** CBA and CBL are independent stocks. Never net. NIIP node excised (S220).
- **OG-006 — HR production function (S278/BT-045).** `ln(RW_pc) = α + β₁·MYS + β₂·min(LE,65) + β₃·t`. Coefficients live in `hr_regression_coefficients.json` — that file is always authoritative; older briefings citing different coefficients are superseded.
- **OG-007 — Natural Capital aggregation.** NC covers only Hohfeldian first-order claim-rights. Mangroves and hydropower classify under SR, not NC. The `nc_aggregation` flag in `what_code_manifest.json` enforces this.
- **OG-008 — Intergenerational liability scope.** 1.2.2 is structurally empty at TL1 (no national statistical system reports it). Populated only at FIPS=00000 (US bottom-up).
- **OG-009 — Coverage dashboard discipline (S170).** Automated regeneration at every session end; not optional.
- **OG-010 — Two-version architecture for the US (S314).** ISO3=USA (top-down, internationally comparable) and FIPS=00000 (bottom-up, jurisdiction-enriched) coexist. API distinguishes by identifier system.

## Where the full text lives

The complete OG documents (one `.docx` and `.md` per guideline) live in [/deep-dive/](/deep-dive/) for institutional reviewers. The one-paragraph expansions for each OG land in this accordion when the content packet arrives.

*(Placeholder. Replace with the OG content packet per the dev brief §10. The above one-liners are paraphrased from the State of FAND briefing — they will be sharpened by John for the final.)*
