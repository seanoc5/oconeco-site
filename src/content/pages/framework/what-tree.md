---
title: "The What hierarchy — 415-node classification tree"
slug: "framework/what-tree"
description: "Every value FAND produces is keyed to one of 415 What codes — the thematic axis of navigation."
sectionContext: "The 415-node thematic hierarchy that organizes everything FAND measures."
---

> **Strawman.** Phase 1 renders the top three levels as a static collapsible list (from slide 7 of the vision deck); Phase 2 turns the full 415-node tree into an interactive D3 explorer. Source data shape: issue [#3](https://github.com/seanoc5/oconeco-site/issues/3).

# The "What" hierarchy

Every number FAND produces is keyed to a "What code" — a position in a 415-node classification tree. This is the **thematic navigation axis**: a user looking at a country's balance sheet clicks Natural Capital and sees it break into fossil fuels, minerals, fisheries, farmland, forests. Click Fossil Fuels and see oil, gas, coal.

## The top three levels (Phase 1 view)

```
1   Balance Sheet
├── 1.1   Assets
│   ├── 1.1.1   Claim-Rights — collateralizable
│   │   ├── 1.1.1.1   Financial Assets (net)
│   │   ├── 1.1.1.2   PA — Produced Assets
│   │   ├── 1.1.1.3   NC — Natural Capital
│   │   │   ├── Fossil Fuels (oil, gas, coal)
│   │   │   ├── Minerals (31 commodities)
│   │   │   ├── Fisheries
│   │   │   ├── Agricultural Land (cropland, pastureland)
│   │   │   ├── Forest Timber
│   │   │   └── Forest Cover
│   │   └── 1.1.1.4   Cross-Border Claim-Rights (Gross Foreign Assets)
│   │       ├── Via Domestic Financial System (CBS + ODCS)
│   │       ├── Nonbank-Banks
│   │       ├── Foreign Direct Investment
│   │       └── All-Other
│   └── 1.1.2   Substantive Rights — non-collateralizable
│       ├── 1.1.2.1   HR — Human Resources (education + health)
│       └── 1.1.2.2   SR — Other Substantive Rights
│           ├── 'Free' services of nature (mangroves, hydropower, carbon, water, solar, wind)
│           └── 'Free' trust infrastructure (institutions, rule of law, social cohesion)
└── 1.2   Liabilities  (to whom?)
    ├── 1.2.1   Intragenerational (income inequality)
    ├── 1.2.2   Intergenerational
    │   ├── DM — Deferred Maintenance of Trust Infrastructure
    │   ├── Asset Restoration Obligations
    │   └── Other Natural Sinks
    ├── 1.2.3   Cross-Border Duties (Gross Foreign Liabilities)
    │   ├── Via Domestic Financial System
    │   ├── Sovereign Debt (Non-Traditional Holders)
    │   ├── Nonbank-Banks
    │   ├── Inward FDI
    │   └── All-Other Duties
    └── 1.2.4   Net Worth — liability to the owners of the place
```

The full 415-node version lives in `what_code_manifest.json` (per State of FAND briefing §4.3).

## Two architectural rules worth knowing

- **NC ≠ "all nature-related wealth."** Mangroves and hydropower are *Substantive Rights* (no legally enforceable Duty exists for them), not Natural Capital. They classify under SR, not NC.
- **SR is inside CW, not above it.** SR decomposes the SI residual within Commonwealth. ES children (mangroves, hydropower) file claims on SR's collective value.

These distinctions are codified in the `nc_aggregation` flag inside `what_code_manifest.json`.

*(Placeholder. Replace with the structured-tree JSON when issue [#3](https://github.com/seanoc5/oconeco-site/issues/3) resolves.)*
