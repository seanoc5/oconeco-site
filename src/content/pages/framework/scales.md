---
title: "Five spatial scales"
slug: "framework/scales"
description: "TL1 (country) → TL2 (US state) → TL3 (US county) → Tract → Block Group. Same architecture, different cross-border story."
sectionContext: "From the World down to the Census Block Group, in five spatial levels."
---

> **Strawman.** Real version uses the five-scale diagram from `FAND_Long_Haul.md` rendered as an SVG with alt text.

# Five spatial scales

The same balance-sheet identity applies at every level. What changes is the *meaning of cross-border* — and that's where the most interesting empirical content lives.

## The five scales

| Scale | What | Where it lives |
|---|---|---|
| **TL1** | Country | 200+ countries, 1950–2025 |
| **TL2** | US state | 51 states |
| **TL3** | US county | 3,258 counties |
| **Tract** | Census tract | Future — drives commuter-flow analysis |
| **Block Group** | Census block group | Future — smallest unit at which the identity still holds |

The two-version architecture for the US (TL1 internationally comparable vs FIPS=00000 bottom-up enriched) is detailed at [/evidence/us-states/](/evidence/us-states/).

## What cross-border means at each scale

| Scale | Cross-border story | Magnitude |
|---|---|---|
| **Country** | International. Foreign assets vs foreign debt. IMF data. | USA net position: −$15 trillion |
| **State** | International + interstate. Where people *live* vs where they *work* across state lines. | 13–399× larger than international for commuter-belt states |
| **County** | Commuter flows dominate. Income earned in one county, spent in another. | The defining relationship at this scale |

## What stays invariant

Per `Subnational_Architecture_Universal_vs_CountrySpecific.md` (referenced in the State of FAND briefing §3.1):

- The balance-sheet identity
- The What codes
- HR regression coefficients
- Valuation parameters (r=4%, severance=10%, …)
- Frame architecture
- Tab homology

## What is country-specific

- Source agencies (BEA vs IMF, BLS vs ILO, …)
- Entity gazetteers (FIPS vs ISO3)
- Allocation methods
- Temporal coverage

The universal/specific separation is what lets the same engine power 200 countries plus the US deep dive.

*(Placeholder. Replace with the SVG diagram and full prose from FAND_Long_Haul.md.)*
