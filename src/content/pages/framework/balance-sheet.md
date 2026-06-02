---
title: "The balance sheet equation"
slug: "framework/balance-sheet"
description: "CW = PA + NC + HR + SI — the identity that anchors the entire FAND project."
sectionContext: "CW = PA + NC + HR + SI, with a worked example."
---

> **Strawman.** Real version embeds the Thin Description of FAND (500 words, already written) plus a worked example with one country's actual numbers.

# The balance sheet equation

A company's balance sheet has assets on one side, liabilities on the other, net worth at the bottom. FAND does the same thing for *places* — countries, states, counties. The identity is closed; it must balance to the cent.

```
CW  = PA + NC + RW             (claim-rights + residual wealth)
RW  = HR + SI                  (HR from MYS/LE regression; SI is residual)
SI  = SR − DM                  (substantive rights minus deferred maintenance)
NW  = CW + CBA − CBL           (net worth adds gross cross-border)
```

## The components

### Claim-Rights — things you can buy, sell, borrow against

- **PA — Produced Assets.** Factories, roads, equipment, buildings. Conventional accounting captures this well.
- **NC — Natural Capital.** Oil, minerals, fisheries, farmland, forests. Six branches, fully built out (`context/raw/State_of_FAND_Sean_Briefing_May2026.md` §4.1).
- **CBA — Cross-Border Assets.** Claims on Commonwealth held elsewhere. Per-side gross stock, not netted against CBL.

### Substantive Rights — valuable but not collateralizable

- **HR — Human Resources.** The value of an educated, healthy population. Derived from an OLS production function: `ln(RW_pc) = α + β₁·MYS + β₂·min(LE,65) + β₃·t`. Source of truth: `hr_regression_coefficients.json`.
- **SR — Other Substantive Rights.** Ecosystem services (mangroves, hydropower, …), institutional trust, rule of law. Decomposes the SI residual.

### Liabilities

- **CBL — Cross-Border Duties.** Recognized rights of others to a place's wealth. Gross, not net.
- **DM — Deferred Maintenance.** The trust-infrastructure deficit. The gap closed by investing more in how people collaborate and compete.

## Why the substantive-rights split matters

Most of the world's wealth is in HR + SR — education, health, institutional trust. These cannot be sold on a market or borrowed against at a bank, but they are what actually makes a place prosperous.

**Conventional accounting does not measure them. FAND does.** That is the central differentiator and the reason this project exists.

*(Placeholder. Replace with the Thin Description content packet plus worked example.)*
