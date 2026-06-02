---
title: "NUSAP — data quality you can see"
slug: "methodology/nusap"
description: "The five-letter framework (Numeral, Unit, Spread, Assessment, Pedigree) FAND attaches to every published value."
sectionContext: "The five-tag data-quality framework FAND attaches to every value."
---

# NUSAP — data quality you can see

Most data portals show you a number. FAND shows you **how much to trust it**.

NUSAP is an established framework for communicating data quality in policy-relevant science, developed by Silvio Funtowicz and Jerome Ravetz in 1990 (*Uncertainty and Quality in Science for Policy*). It addresses a long-standing gap in technical reporting: numerical results carry no native vocabulary for their own reliability, so consumers either treat all numbers as equal or fall back on ad-hoc footnotes. NUSAP closes the gap with five named tags carried alongside every value.

## The five tags

| Letter | Stands for | What the user sees | When |
|---|---|---|---|
| **N** | Numeral | The value itself ($4,200 per capita) | Always visible |
| **U** | Unit | Current Atlas USD, tonnes, km², etc. | Always visible |
| **S** | Spread | Uncertainty range or confidence band (±$300) | On hover |
| **A** | Assessment | Qualitative reliability rating (HIGH / MEDIUM / LOW) | On click |
| **P** | Pedigree | Full provenance — source, tier, statistical adjustments | On "source detail" click |

### N — Numeral

The point-value itself: the number FAND publishes. For a stock measure this is a level (e.g., 4.7 trillion USD of produced assets); for a flow it is a rate over a stated period. The numeral alone tells you nothing about how trustworthy it is — that is the job of the other four tags.

### U — Unit

The unit of account: currency, mass, area, count, ratio. FAND uses current Atlas USD as the default monetary unit for cross-country comparability, with PPP and constant-USD conversions available where appropriate (governed by Operational Guideline OG-004). Physical units follow agency conventions (tonnes for minerals, km² for land, persons for population).

### S — Spread

A quantitative measure of uncertainty around the numeral — confidence interval, standard error, or range. Where the source agency publishes uncertainty, FAND carries it through unmodified. Where FAND derives a value through statistical adjustment (e.g., ratio-splicing or the HR production function), the spread reflects both source uncertainty and the adjustment.

### A — Assessment

A qualitative reliability rating — HIGH, MEDIUM, or LOW — that summarizes whether the value should be used for cross-country comparison, country-level policy, or only as an order-of-magnitude reference. Assessment combines source tier, statistical-adjustment burden, and coverage. A Tier 1 unadjusted value will rate HIGH; a Tier 3 modelled fallback will rate LOW.

### P — Pedigree

The full provenance chain: source agency, table, year, source tier (Tier 1 authoritative → Tier 4 model fallback), any statistical adjustments applied, and the URL of the original data. Pedigree is the reviewer-grade audit trail that lets an institutional peer reproduce the value from the public source. It is the most detailed of the five tags and is surfaced last in the progressive disclosure.

## A worked example

The five tags on a single value, in the order they surface:

```
Default view:     $4,200 / pc                                ← N + U
On hover:         $4,200 ± $300 / pc                         ← + S
On click:         Assessment: HIGH                           ← + A
Source detail:    USGS MCS 2026 Table 1 → Tier 1             ← + P
                  (ratio-spliced to 2025 base year per OG-002)
                  https://www.usgs.gov/centers/...
```

Casual readers see only N and U. Institutional reviewers can reach the full pedigree in one or two clicks.

## Why it matters

For institutional outreach (IARIW reviewers, statistical-office peers, multilateral-bank analysts), NUSAP is a signal of *rigor* — opinions about uncertainty are written down, not vibed. For policy users downstream, it is a signal of *honesty* about what the data community knows less well. Both audiences benefit; neither has to pay for the other's needs.

## Further reading

- Funtowicz, S. O., & Ravetz, J. R. (1990). *Uncertainty and Quality in Science for Policy.* Kluwer Academic Publishers.
- van der Sluijs, J. P., et al. (2005). "Combining quantitative and qualitative measures of uncertainty in model-based environmental assessment: the NUSAP system." *Risk Analysis* 25(2): 481–492.
