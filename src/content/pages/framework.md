---
title: "Framework"
slug: "framework"
description: "Conceptual architecture — the balance-sheet identity, stocks vs flows, the Hohfeldian accounting boundary, the 415-node What hierarchy, the 34-term glossary."
sectionContext: "The accounting identity OconEco uses, the scales it operates at, and the vocabulary it introduces."
---

# Framework

Companies answer to their owners with a balance sheet — what they own, what they owe, what's left over. FAND does the same for a country. The twist is *who the owners are*: not shareholders, but the governed.

The rest of this section is reference material: the ideas that shape the accounts, and the four sub-pages that carry the detail.

## Three layers, one number

FAND is structured the way a corporate 10-K is — three nested layers behind a single bottom line, **Net Worth**:

1. **The balance sheet** — one page: what the place owns, what it owes, and the trust infrastructure in between. The identity and a worked example are on [the balance-sheet page](/framework/balance-sheet/).
2. **The items** — each line opens into its components: produced assets, natural capital, human resources, substantive rights.
3. **The transactions** — the flows that changed the items between periods — the income-statement side.

Theodore Porter, the historian of measurement whose work shaped the original 1995 wealth accounts, called this kind of surface a *thin description*: it earns trust only if commensurate detail is there to back it when asked. The design goal is minimizing how many *whys* it takes to reach *oh* — a reader should be able to keep asking *why is that number what it is?* and keep getting an answer, until the *why* resolves to an *oh — I see*. Nothing bottoms out in "trust us."

## Stocks, flows, and avatars

The framework's highest-order sorting decision is the split between items and transactions, and it has a simple test — the **photograph test**:

- A **stock** is something you could photograph at an instant: a building, a forest, a bank balance, a population count. Stocks live in the **Portfolio** branch — the balance sheet.
- A **flow** is an activity that only makes sense over a span of time: production, spending, income, service delivery — a video, not a photograph. Flows live in the **Wheel of Wealth** branch — the income-statement side (see [Knight's Wheel of Wealth](/framework/glossary/#knights-wheel-of-wealth)).
- An **avatar** is a modeled stock — a balance-sheet item that cannot literally be photographed but still has to be carried; Human Resources is the clearest case. Avatars are flagged as modeled, so a reader always knows which numbers are observed and which are inferred.

This split sits above the [What hierarchy](/framework/what-tree/), the 415-node classification tree that organizes everything below it.

## A communication system, not a report

A corporate report is a one-way document: management reports *to* the owners. FAND is built as a **communication system between them** — with the roles the American founders assigned: management is government; the owners are the governed, everyone who lives in a place or holds a claim on it.

That reframing is why the accounts are built bottom-up. A company's owners are handed a finished statement; a nation's owners are supposed to be the *source* of the values on it. The aggregate balance sheet is therefore designed as a rollup of what the owners value — **ST = Σ(CT)**, the sum of its parts, extended down through every [spatial scale](/framework/scales/).

## Recognize first, value later

The framework performs two operations on anything people care about, and keeps them strictly separate:

- **Recognize** — acknowledge that something exists and matters enough that someone, somewhere has spent effort measuring or arguing about it. Recognition is deliberately generous.
- **Value** — assign it a worth. Valuation is contested by nature, and those disagreements are themselves information.

Conventional statistics collapse the two steps, quietly letting the *measurement* decide the *values* — the trap the philosopher C. Thi Nguyen calls **value capture**, with [commensuration](/framework/glossary/#commensuration) (Espeland) as its mechanism. FAND refuses the collapse: [recognition is comprehensive; valuation is deferred](/framework/glossary/#asset-recognition-before-valuation) to the people whose values they are. A thing recognized but not yet priced is not worth zero — it is *recognized and awaiting judgment*, a different statement entirely. Reversing the 1890 [Hollerith Pivot](/framework/glossary/#hollerith-pivot) — making that kind of judgment computationally cheap again — is the reason the instrument is built with agentic AI.

> By recognizing only market claim-rights, orthodox national accounting "does not merely omit the other entitlements — it effectively values them at zero. A person's liberty to spend time with family, their power to participate in governance, their immunity from arbitrary interference: these are real positions … and they consume the same finite resource — time — as any employment contract. Valuing them at zero is not caution; it is an assertion that systematically distorts every allocation decision built on the accounts." — OG-001

## The accounting boundary — Hohfeld's missing columns

In 1913 Wesley Hohfeld showed that every legal relationship is one of **eight positions in four correlative pairs** — Right/Duty, Liberty/No-right, Power/Liability, Immunity/Disability. The System of National Accounts recognizes only the first pair: claim-rights and their duties. Everything else a society holds — the *liberty* to use one's own time, the *power* to participate in governance, the *immunity* from arbitrary interference — falls outside the accounting boundary and is therefore, silently, valued at nothing. FAND's analytical frontier is exactly the material SNA leaves out.

| FAND construct | Hohfeldian position | Visible to SNA? |
|---|---|---|
| PA — Produced Assets | First-order Right (duty-bearer: counterparty) | Yes — SNA core |
| NC — Natural Capital | First-order Right (duty-bearer: extractor) | Partially |
| CBA / CBL — Cross-border | First-order Right / Duty, cross-border | Yes |
| HR — Human Resources | First-order Liberty / No-right | No |
| SR — Substantive Rights | Second-order Power / Immunity + Liberty | No |
| RW — Residual Wealth | None — a residual defined by subtraction | N/A |

SNA's choice to operationalize only Right/Duty reflected administrative feasibility in the 1950s, not conceptual completeness — the punch card couldn't read the other columns, so they were dropped. Hohfeld's framework predates that choice by four decades. On FAND's ledger, the lines SNA cannot see are the larger share of a place's wealth — see [the worked example](/framework/balance-sheet/), and the [Hohfeldian Framework glossary entry](/framework/glossary/#hohfeldian-framework) for the full taxonomy.

## From residual to recognized

In the current build, the trust-infrastructure term is a *residual* — a stopgap, not the destination. The destination is **de-residualization**: recognizing and scoring the components of trust infrastructure directly. FAND does *not* compute what each component is worth. It fixes the credible dollar envelope (the structural floor on trust infrastructure) and seeds a defensible, open list of components; a geolocated consensus process among the governed then allocates the total among them. FAND computes the *thin* dollar envelope; the owners supply the *thick* allocation within it.

Not every account carries the same evidential weight. Some estimates are the core convention — load-bearing, published with an uncertainty band. Others are satellite accounts (water, carbon) kept deliberately to one side. [How the core and its satellites are separated →](/evidence/core-and-satellites/)

## The four sub-pages

- **[The balance sheet equation](/framework/balance-sheet/)** — `CW = PA + NC + RW; RW = HR + SI`, with a worked example using one country's actual numbers.
- **[Five spatial scales](/framework/scales/)** — TL1 (country) → TL2 (US state) → TL3 (US county) → Tract → Block Group. Same architecture at every level.
- **[The "What" hierarchy](/framework/what-tree/)** — the 415-node classification tree that powers the thematic drill-down on every balance-sheet page.
- **[Glossary of Novel Constructs](/framework/glossary/)** — 34 terms (Abductive Triage, Commonwealth-as-wēle, Synaptic Cleft, Hohfeldian classification, Hollerith Pivot, …) that define FAND's vocabulary precisely.

## The four navigation axes

Every page on the site honors these four ways of navigating the data — two primary (drill-downs) and two supporting (referrals + quality):

| Axis | Type | What it does |
|---|---|---|
| **Where** | PRIMARY | Spatial: World → Country → State → County |
| **What** | PRIMARY | Thematic: Balance Sheet → Claim-rights / Substantive Rights → branches → commodities |
| **Source** | SUPPORTING | Every number links to its source agency, table, year, URL |
| **Methodology** | SUPPORTING | OGs (accordion) + NUSAP data-quality metadata (progressive disclosure) |

This four-axis commitment is the biggest single departure from the conventional "data portal" UX — and from the legacy OconEco site.

[See the results →](/evidence/) — the ledger populated at every scale, and the readings GDP cannot make.
