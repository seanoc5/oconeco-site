---
title: "The balance sheet equation"
slug: "framework/balance-sheet"
description: "CW = PA + NC + RW; RW = HR + SI — the closed identity that anchors the entire FAND project."
tagline: "A place's wealth, as a balance sheet that must close to the cent."
sectionContext: "CW = PA + NC + RW; RW = HR + SI, with a worked example using one country's numbers."
---

# The balance sheet equation

A company's balance sheet has assets on one side, liabilities on the other, and net worth as the bottom line. FAND does the same thing for **places** — countries, states, counties. Like a corporate 10-K, it opens with a thin balance sheet, then details each item, then details the transactions that move the items between periods.

It differs from a 10-K in two ways that define the whole project:

1. **It recognizes more than a 10-K does.** A company books only what it can buy, sell, or borrow against. FAND also books what a population genuinely values but cannot collateralize — an educated, healthy citizenry; institutional trust; the rule of law. (In the *Thin Description of FAND*, these are the blue-shaded areas of Figure 1.)
2. **It is a communication system, not a report.** A 10-K runs one way, from management to owners. Here, **management is government and the governed are the owners**, and FAND is the channel between them — owners conveying what they value, management accounting for it. FAND is, in its author's framing, the World Bank's 1995 *Monitoring Environmental Progress* grown up: **MEP 2.0**, thirty-one years on.

## The identity

The identity is **closed** — it must balance to the cent:

<div class="identity">
<div class="identity-row"><code>CW = PA + NC + RW</code><span class="gloss">Commonwealth = claim-rights (PA + NC) + Residual Wealth</span></div>
<div class="identity-row"><code>RW = HR + SI</code><span class="gloss">Residual Wealth = Human Resources + Substantive Infrastructure</span></div>
<div class="identity-row"><code>SI = SR − DM</code><span class="gloss">Substantive Infrastructure = substantive rights − deferred maintenance</span></div>
<div class="identity-row"><code>NW = CW + CBA − CBL</code><span class="gloss">Net Worth adds gross cross-border claims, nets the duties</span></div>
</div>

> **RW is the parent of HR and SI — not a sibling.** Commonwealth splits first into claim-rights and **Residual Wealth (RW)**; RW then splits into Human Resources and Substantive Infrastructure. Older CWoN-era material calls RW "IC" (Intangible Capital); FAND uses **RW**, the column `rw_pc_usd`.

## The components

### Claim-rights — things you can buy, sell, or borrow against

- **PA — Produced Assets.** Factories, roads, equipment, buildings. Conventional national accounting captures this well.
- **NC — Natural Capital.** Oil, minerals, fisheries, farmland, forests, and more — six branches, fully built out.
- **CBA — Cross-Border Assets.** Claims on Commonwealth held elsewhere. Carried as a per-side gross stock, not netted against CBL.

### Substantive rights — valuable, but not collateralizable

- **HR — Human Resources.** The value of an educated, healthy population, derived from a production function over mean years of schooling and life expectancy: `ln(RW_pc) = α + β₁·MYS + β₂·min(LE, 65) + β₃·t`.
- **SR — Other Substantive Rights.** Ecosystem services (mangroves, hydropower, …), institutional trust, rule of law — the substance behind the SI term.

### Liabilities

- **CBL — Cross-Border Duties.** Recognized rights of others to a place's wealth. Gross, not netted.
- **DM — Deferred Maintenance.** The trust-infrastructure deficit — the gap a place closes by investing in *how* its people collaborate and compete.

## A worked example — the United States

The point is not the precise dollars — it is that **the identity closes**:

<table class="ledger">
<caption>Illustrative per-capita figures, current FAND dataset (2023). Exact published values live on each country's balance-sheet page.</caption>
<thead><tr><th scope="col">Term</th><th scope="col" class="num">Per capita</th><th scope="col">Identity</th></tr></thead>
<tbody>
<tr><td><span class="term-abbr">PA</span> Produced Assets</td><td class="num">~$212,000</td><td></td></tr>
<tr><td><span class="term-abbr">NC</span> Natural Capital</td><td class="num">~$96,000</td><td></td></tr>
<tr><td><span class="term-abbr">RW</span> Residual Wealth</td><td class="num">~$322,000</td><td>= HR + SI</td></tr>
<tr class="sub"><td class="term">↳ <span class="term-abbr">HR</span> Human Resources</td><td class="num">~$226,000</td><td></td></tr>
<tr class="sub"><td class="term">↳ <span class="term-abbr">SI</span> Substantive Infrastructure</td><td class="num">~$96,000</td><td></td></tr>
<tr class="total"><td><span class="term-abbr">CW</span> Commonwealth</td><td class="num">~$630,000</td><td>= PA + NC + RW</td></tr>
</tbody>
</table>

Read it as: of every ~$630k of Commonwealth per American, roughly half is conventional produced assets and natural capital combined, and **the larger half is Residual Wealth** — most of *that* being Human Resources, the educated, healthy population. None of the RW half appears on a conventional national balance sheet.

## Why the substantive-rights split matters

Most of a place's real wealth sits in **HR + SR** — education, health, institutional trust. It cannot be sold on a market or pledged to a bank, but it is what actually makes a place prosperous.

**Conventional accounting does not measure it. FAND does.** That is the central differentiator, and the reason this project exists.
