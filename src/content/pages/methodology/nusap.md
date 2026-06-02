---
title: "NUSAP — data quality you can see"
slug: "methodology/nusap"
description: "The five-letter framework (Numeral, Unit, Spread, Assessment, Pedigree) displayed progressively on every value."
sectionContext: "The five-tag data-quality framework FAND attaches to every value."
---

> **Strawman.** Per developer brief §7 and vision deck slide 9. The progressive-disclosure UX pattern is what makes NUSAP work — and what differentiates the site from data portals that publish numbers without uncertainty.

# NUSAP — data quality you can see

Most data portals show you a number. FAND shows you **how much to trust it**.

NUSAP is an established framework for communicating data quality, developed by Silvio Funtowicz and Jerome Ravetz in 1990. Each value FAND publishes carries five layers of metadata — disclosed progressively, so casual readers see the number while institutional readers can drill into the full pedigree.

## The five letters

| Letter | Stands for | What the user sees | When |
|---|---|---|---|
| **N** | Numeral | The value itself ($4,200 per capita) | Always visible |
| **U** | Unit | Current Atlas USD, tonnes, km², etc. | Always visible |
| **S** | Spread | Uncertainty range or confidence band (±$300) | On hover |
| **A** | Assessment | Qualitative reliability rating (HIGH / MEDIUM / LOW) | On click |
| **P** | Pedigree | Full provenance — source, tier, statistical adjustments | On "source detail" click |

## The progressive-disclosure pattern

```
Default view:    $4,200 / pc  ← numeral + unit
On hover:        $4,200 ± $300 / pc  ← spread surfaces
On click:        ASSESSMENT: HIGH  ← reliability rating
Source detail:   USGS MCS 2026 Table 1 → Tier 1 → ratio-spliced  ← full pedigree
```

This means casual readers never see uncertainty noise unless they ask for it. Institutional reviewers can always get to the bottom of any number with one or two clicks.

## Why it matters

For institutional outreach (Haishan Fu, Andrew Steer, Serageldin, IARIW reviewers), NUSAP is a signal of *rigor*. For policy users downstream, it is a signal of *honesty* about what we know less well. Both audiences benefit; neither audience has to pay for the other's needs.

*(Placeholder. Replace with the NUSAP content packet and the JSON schema for value metadata.)*
