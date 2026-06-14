---
title: "The What hierarchy — 415-node classification tree"
slug: "framework/what-tree"
description: "Every value FAND produces is keyed to a What code — a position in a 415-node classification tree (290 leaves, max depth 11). This is the thematic axis of navigation."
tagline: "One classification tree behind every number — the thematic axis."
sectionContext: "The 415-node thematic hierarchy that organizes everything FAND measures."
---

# The "What" hierarchy

Where the [spatial scales](/framework/scales/) answer *where* a number sits, the **What hierarchy** answers *what it is*. Every value FAND produces is keyed to a "What code" — a position in a classification tree of **415 nodes** (290 leaves, 125 branches, max depth 11), organizing roughly 3,000 development indicators drawn from about ten source databases.

It is the **thematic navigation axis**: a reader looking at a country's balance sheet clicks Natural Capital and sees it break into fossil fuels, minerals, fisheries, farmland, forests; clicks Fossil Fuels and sees oil, gas, coal. The same tree classifies every component, at every spatial scale.

## The top levels

```
1   Total Assets
├── 1.1   Assets
│   ├── 1.1.1   Claim-Rights — collateralizable
│   │   ├── 1.1.1.2   PA — Produced Assets
│   │   ├── 1.1.1.3   NC — Natural Capital
│   │   │   ├── Fossil Fuels (oil, gas, coal)
│   │   │   ├── Minerals (individual commodities — gold, copper, iron ore, …)
│   │   │   ├── Fisheries
│   │   │   ├── Agricultural Land (cropland, pastureland)
│   │   │   ├── Forest Timber
│   │   │   └── Forest Cover
│   │   └── 1.1.1.4   Cross-Border Claim-Rights (gross foreign assets)
│   └── 1.1.2   Substantive Rights — non-collateralizable
│       ├── 1.1.2.1   HR — Human Resources (education + health)
│       └── 1.1.2.2   SR — Other Substantive Rights
│           ├── 'free' services of nature (mangroves, hydropower, carbon, water, solar, wind)
│           └── 'free' trust infrastructure (institutions, rule of law, social cohesion)
└── 1.2   Liabilities  (to whom?)
    ├── 1.2.2   Deferred Maintenance of trust infrastructure (DM)
    ├── 1.2.3   Cross-Border Duties (gross foreign liabilities)
    └── 1.2.4   Net Worth — the liability to the owners of the place
```

This is the top of the tree; the full 415-node version runs down to individual commodities and ecosystem-service flows (max depth 11). The machine-readable contract that maps each code to its data source is `what_code_manifest.json`.

## Two classification rules worth knowing

- **Natural Capital is not "all nature-related wealth."** Mangroves, hydropower, carbon, and the other "free services of nature" are **Substantive Rights** (no legally enforceable duty backs them), so they classify under SR (`1.1.2.2`), *not* under NC (`1.1.1.3`). NC is the depletable, severable, collateralizable subsoil-and-land stock.
- **Substantive Rights sit inside Commonwealth, not above it.** SR decomposes the SI residual *within* CW; the ecosystem-service leaves file claims on SR's collective value rather than adding a separate top-line.

These distinctions are codified in the `nc_aggregation` flag inside the manifest, so the same tree can answer both "what is Natural Capital?" and "what is the full balance sheet?" without double-counting.

## How it powers the site

Every balance-sheet figure on this site is tagged with its What code, which is what makes the thematic drill-down work: expand a parent to see its children, each carrying its own value, source, and [NUSAP](/methodology/nusap/) data-quality pedigree. The interactive 415-node explorer is in progress; this page shows the top levels in the meantime.
