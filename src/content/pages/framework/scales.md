---
title: "Five spatial scales"
slug: "framework/scales"
description: "TL1 (country) → TL2 (US state) → TL3 (US county) → tract → block group. The same balance-sheet identity at every level — what changes is the meaning of cross-border."
tagline: "The same balance sheet, from the World down to the Census block group."
sectionContext: "Five spatial levels, one architecture — and where the cross-border story changes."
---

# Five spatial scales

The [balance-sheet identity](/framework/balance-sheet/) holds at every territorial level — country, state, county, and below. The architecture does not change as you descend; what changes is the **meaning of cross-border**, and that is where the most interesting empirical content lives.

## The five scales

| Scale | What | Coverage |
|---|---|---|
| **TL1** | Country | 200+ countries, 1950–2025 |
| **TL2** | US state | 51 states + DC |
| **TL3** | US county | ~3,258 counties |
| **Tract** | Census tract | Roadmap — drives commuter-flow analysis |
| **Block group** | Census block group | Roadmap — the smallest unit at which the identity still closes |

TL1 is complete and verified; the US subnational exercise extends the *same* balance sheet down to TL2 and TL3, proving the architecture works at every level. Tract and block group are on the roadmap.

## The two-version architecture for the United States

The US appears twice, distinguished by identifier system — and the gap between the two records *is* a measurement:

- **`iso3 = USA` (TL1)** — internationally comparable, top-down. The reference.
- **`fips = 00000` (bottom-up)** — the US rebuilt from its counties up, enriched with jurisdiction-specific liabilities (intergenerational accounts, local institutional knowledge) that only exist where national statistical systems report them.

The bottom-up Commonwealth runs **+5.9%** above the TL1 reference (a net-debtor ownership position the international view misses), while bottom-up Natural Capital lands **−24.8%** below it (county allocation undershoots the national figure). The difference between the two is the empirical content of local institutional knowledge — see [US states](/evidence/us-states/).

## What cross-border means at each scale

| Scale | Cross-border story | Magnitude |
|---|---|---|
| **Country** | International — foreign assets vs foreign liabilities (IMF data). | USA net position ≈ −$15 trillion |
| **State** | International *plus* interstate — where people live vs where they work across state lines. | 13–399× larger than the international flow for commuter-belt states |
| **County** | Commuter flows dominate — income earned in one county, spent in another. | The defining relationship at this scale |

At the country level cross-border is a footnote to a mostly-closed economy; by the county level it is the headline. The identity absorbs all of it without changing shape.

## What stays invariant across scales

The same engine powers 200 countries and the US deep dive because a fixed core is shared at every level:

- the balance-sheet identity;
- the **What** classification codes;
- the HR regression coefficients (invariant across TL1/TL2/TL3);
- the valuation parameters (discount rate, severance rate, …);
- the frame architecture and tab homology.

## What is country-specific

Loaded from configuration, not hardcoded:

- source agencies (BEA vs IMF, BLS vs ILO, …);
- entity gazetteers (FIPS vs ISO 3166);
- allocation methods;
- temporal coverage.

This universal-vs-specific separation is what lets one architecture serve every territorial level and every country without forking the model.
