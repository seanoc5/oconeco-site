---
title: "Country samplers"
slug: "evidence/countries"
description: "India, China, USA — balance-sheet snapshots. Three at launch; the build pipeline supports any country."
sectionContext: "India, China, and the USA, treated as worked examples of the FAND template."
---

> **Strawman.** The launch trio (India / China / USA) is John's selection per the strategic brief. The `build_country_page.py` pipeline can produce any ISO3 country on demand — see issue [#4](https://github.com/seanoc5/oconeco-site/issues/4) for the data-shape decision.

# Country samplers

Three deep dives at launch, with the architecture in place to add more on demand.

## The launch trio

- **[India](/evidence/countries/ind/)** — balance-sheet snapshot, 1950–2025
- **[China](/evidence/countries/chn/)** — balance-sheet snapshot, 1950–2025
- **[USA](/evidence/countries/usa/)** — balance-sheet snapshot (TL1 / international view). For the bottom-up FIPS=00000 view enriched with US-specific intergenerational liabilities, see [US states](/evidence/us-states/).

## What each country page shows

The balance sheet at decadal resolution (1955, 1965, … 2025), structured as:

- **Per-capita view** — `CW_pc`, `PA_pc`, `NC_pc`, `HR_pc`, `SR_pc`, `CBA_pc`, `CBL_pc`, `NW_pc`
- **Aggregate view** — same components in million current USD
- **Natural Capital detail** — fossil fuels, minerals (31 commodities), forests (timber + cover), agricultural land, fisheries
- **Memo items** — CW derivation inputs (GNI, working-age share, PMT, annuity factor) and HR derivation inputs (MYS, life expectancy)

See `context/raw/twoexcelworkbookstohelpyouandkelebunderstandfreefa.zip` for the existing USA and BRA worked examples from the pipeline.

*(Placeholder. Replace with the content packet per country.)*
