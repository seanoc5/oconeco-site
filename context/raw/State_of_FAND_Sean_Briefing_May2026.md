# State of FAND — Consolidated Handoff Briefing for Sean

**May 2026 | From: John O'Connor + Claude**

*This document supersedes all prior Sean-facing briefings (S147–S291). See §7 for the full supersession list.*

---

## 1. Executive Summary

**FAND (First Agentic Navigator for Development)** is a global wealth accounting system that computes a complete national balance sheet for 200+ countries from 1950–2025. The Master Cascade (Steps 1–5) is complete. The balance-sheet identity CW = PA + NC + HR + SI is verified to $0.000000. TL1 values are trustworthy and ready for API integration.

**The US subnational exercise (US_MLA)** extends the same balance sheet to TL2 (51 states) and TL3 (~3,258 counties), proving that the architecture works at every territorial level. This creates a **two-version architecture**: ISO3=USA (internationally comparable, top-down) and FIPS=00000 (bottom-up enriched, with jurisdiction-specific liabilities).

**What this means for you:** The data pipeline is mature. 128 builder scripts, 30+ World Tables, 20+ cache tables in SQLite. Your role shifts from "wait for Claude to finish building" to "operate the pipeline and serve the data." This document tells you everything you need.

---

## 2. Balance Sheet Architecture

### 2.1 The Identity

```
CW  = PA + NC + RW                    (Step 1: claim-rights + residual)
RW  = HR + SI                         (Step 2: HR from MYS/LE regression)
SI  = SR − DM                         (Step 3: 20% floor decomposition)
NW  = CW + CBA − CBL                  (Net Worth: adds cross-border)
```

Every component is computed independently by OconEco. CWoN appears only as cross-validation, never as production input.

### 2.2 Component Definitions

| Component | What Code | Method | Hohfeldian |
|-----------|-----------|--------|------------|
| CW (Comprehensive Wealth) | — | PMT annuity on GNI Atlas | — (aggregate) |
| PA (Produced Assets) | 1.1.1.1 | OECD Source A + PIM (211 countries) | 1st-order Right |
| NC (Natural Capital) | 1.1.1.3 | Σ branch valuations (6 branches) | 1st-order Right |
| HR (Human Resources) | 1.1.2.1 | OLS: ln(RW_pc) = α + β₁×MYS + β₂×min(LE,65) + β₃×t | 1st-order Privilege |
| SR (Substantive Rights) | 1.1.2.2 | SR = max(SI, 0.20×CW). Inside CW. | 2nd-order Power |
| DM (Deferred Maintenance) | 1.2.1.1 | DM = max(0, 0.20×CW − SI) | 1st-order Duty |
| CBA (Gross Foreign Assets) | 1.1.1.4 | IMF IIP + LM-EWN + WID (TL1 only) | 1st-order Right |
| CBL (Gross Foreign Liab.) | 1.2.3 | Same source ladder (TL1 only) | 1st-order Duty |

### 2.3 HR Production Coefficients (S278/BT-045)

**Functional form (Spec D-cap):** `ln(RW_pc_Real2020) = α + β₁×MYS + β₂×min(LE,65) + β₃×t`, where `t = (year−1950)/73`

| Parameter | Value | SE | t-stat |
|-----------|-------|-----|--------|
| α (intercept) | 4.748 | 0.603 | 7.88 |
| β_MYS | 0.293 | 0.025 | 11.69 |
| β_LE (capped at 65) | 0.072 | 0.011 | 6.34 |
| β_t (time trend) | −0.674 | 0.174 | −3.87 |

R² = 0.497, N = 10,031, 200 countries, 1950–2025. Clustered SE (HC1) by country.

**Source of truth:** `hr_regression_coefficients.json`. These coefficients are INVARIANT across all spatial scales (TL1, TL2, TL3). MYS source: 5-tier collage (UIS anchor > HDR > Barro-Lee > EdAtt > WiC forward).

*Note: Earlier briefings (S257, S276/BT-044) cite different coefficients. Those are superseded. The JSON file is always authoritative.*

### 2.4 Key Architectural Rules

**NC ≠ "all nature-related wealth."** NC (1.1.1.3) covers only Hohfeldian first-order claim-rights. Mangroves and hydropower are Privileges (no legally enforceable Duty), classified under SR (1.1.2.2). The `nc_aggregation` flag in `what_code_manifest.json` enforces this.

**SR is inside CW, not above it.** SR decomposes the SI residual within CW (S263, SPMF-263-1). ES children (mangroves, hydropower) and Trust Infrastructure file claims on SR's collective value.

**No NIIP node.** The previous 1.2.3.NIIP child was excised S220. Cross-border is two per-side independent stocks (1.1.1.4 CBA, 1.2.3 CBL), never netted.

**1.2.2 (Intergenerational) is structurally empty at TL1.** It requires jurisdiction-specific local knowledge (SSA actuarial, Fed Z.1) that only exists where national statistical systems report it. Populated only in the US bottom-up exercise (FIPS=00000).

---

## 3. Two-Version Architecture (S314)

For the United States, two versions of the national balance sheet coexist:

| | ISO3=USA (TL1) | FIPS=00000 (Bottom-Up) |
|---|---|---|
| Sources | Internationally harmonized (IMF, WB, OECD, FAO) | US agencies (BEA, BLS, Census, EIA, USGS, SSA) |
| CW income base | Atlas GNI | GTP (HQ-bias corrected) |
| 1.2.2 Intergenerational | Structurally empty | Populated (Unfunded SS, Financial Overhang) |
| Comparability | Cross-country (200+ countries) | Intra-US only (3,258 counties → 51 states) |
| NW formula | NW = CW + CBA − CBL | NW = CW + CBA − CBL − Intergenerational |
| CW gap vs TL1 | — (reference) | +5.9% (net-debtor ownership position) |
| NC gap vs TL1 | — (reference) | −24.8% (county allocation < national) |

**API implication:** Two records for "United States" distinguished by identifier system. `GET /balance-sheet?iso3=USA` returns TL1; `GET /balance-sheet?fips=00000` returns bottom-up aggregate. The gap between them measures the empirical content of local institutional knowledge.

**Core identity rows are structurally identical** between both versions: CW, PA, NC, RW, HR, SI, SR, DM, CBA, CBL all present with identical formulas. The differences are (a) the income base for CW, and (b) whether 1.2.2 children are populated.

### 3.1 Universal vs. Country-Specific

The subnational architecture separates what is **invariant** (balance-sheet identity, What codes, HR coefficients, valuation parameters, frame architecture, tab homology) from what is **country-specific** (source agencies, entity gazetteers, allocation methods, temporal coverage). The invariants should be hardcoded in fand-api; the country-specific elements loaded from configuration. See `Subnational_Architecture_Universal_vs_CountrySpecific.md` for the full separation and proposed JSON frame config.

---

## 4. What's Ready for API Integration

### 4.1 World Tables (TL1)

| What Code | Branch | Maturity | World Table | Cache Table |
|-----------|--------|----------|-------------|-------------|
| 1.1.1.3.1.1.1 | Fossil Fuels | VALIDATED | WT_Fossil_Fuels_FAND.xlsx | nc_fossil_fuels |
| 1.1.1.3.1.1.2 | Minerals | VALIDATED | WT_Minerals_FAND.xlsx | nc_minerals |
| 1.1.1.3.2.2.2 | Forest Timber | VALIDATED | WT_Forest_Timber_FAND.xlsx | nc_forests |
| 1.1.1.3.2.2.3 | Forest Cover | VALIDATED | WT_Forest_Cover_FAND.xlsx | nc_forests |
| 1.1.1.3.1.2 | Fisheries | SCRIPTED | WT_Fisheries_FAND.xlsx | nc_fisheries |
| 1.1.1.3.2.1.2 | AgLand | SCRIPTED | WT_AgLand_FAND.xlsx | nc_agland |
| 1.1.2.2.1 | Mangroves (ES) | SCRIPTED | NC_Mangroves_FAND.xlsx | nc_mangroves |
| 1.1.2.2.4.4 | Hydropower (ES) | SCRIPTED | NC_Hydropower_FAND.xlsx | nc_hydropower |
| — | PA | SCRIPTED | WT_PA_FAND.xlsx | pa_world_table |
| — | HR | SCRIPTED | WT_HR_FAND.xlsx | hr_world_table |
| — | SI | SCRIPTED | WT_SI_FAND.xlsx | si_world_table |
| 1.1.2 | SR | SCRIPTED | WT_SR_Institutional_FAND.xlsx | sr_institutional_wt |
| 1.2.1.1 | DM | SCRIPTED | WT_DeferredMaint_FAND.xlsx | dm_world_table |
| — | Population | SCRIPTED | WT_Population_Total_FAND.xlsx | population_total |
| — | CW | SCRIPTED | WT_CW_FAND.xlsx | cw_world_table |
| — | RW | SCRIPTED | WT_RW_FAND.xlsx | — |

### 4.2 Cross-Border World Tables (TL1)

| What Code | Branch | Source | Rows | Countries |
|-----------|--------|--------|------|-----------|
| 1.1.1.4 | CBA (parent) | IMF IIP + LM-EWN + WID | 18,786 | 198 |
| 1.2.3 | CBL (parent) | Same ladder | 18,786 | 198 |
| 1.1.1.4.1 / 1.2.3.1 | Via-DFS | DC (depository only) | 19,363 | 173 |
| 1.1.1.4.3 / 1.2.3.3 | Nonbank-Banks | BIS LBS | 18,128 | 219 |
| 1.1.1.4.4 / 1.2.3.4 | Global FDI | IMF IIP DI | 8,202 | 177 |
| 1.1.1.4.4.1 / 1.2.3.4.1 | US-Bilateral FDI | BEA historical-cost | — | 238 |
| 1.1.1.4.4.2 / 1.2.3.4.2 | Non-US FDI | IIP minus k(t)-adj BEA | 8,138 | 177 |

### 4.3 Pipeline Infrastructure

**Running the pipeline:**

```bash
python scripts/run_all.py --national    # 12-stage DAG, all TL1 builders
python scripts/run_all.py --list        # show stages without running
pip install -r requirements.txt         # 6 Python packages
```

**128 builder scripts** in `scripts/`. Every script is idempotent, externalized parameters, and prints PASS/FAIL validation summary.

**SQLite databases:** `oconeco_tl1_global.db` (TL1) and `oconeco_sub_usa.db` (US subnational). WAL journaling — run scripts locally, do not rely on OneDrive-synced DB copies.

**Machine-readable contracts:**

- `what_code_manifest.json` — v10: What code → fand-api entity mapping
- `hr_regression_coefficients.json` — HR production coefficients
- `wld_source_registry.json` — WLD row provenance for all World Tables
- `parameters.json` — valuation parameters (r=4%, severance=10%, etc.)

---

## 5. What's Changed Since Earlier Briefings

If you last read briefings from S147–S244, here are the major changes:

| Change | When | Impact on fand-api |
|--------|------|-------------------|
| HR coefficients updated (BT-045 UIS-first MYS) | S278–279 | `hr_regression_coefficients.json` updated. Supersedes S257 and S276/BT-044. |
| SR moved inside CW (SI decomposition) | S263 | SR = max(SI, 0.20×CW). New WTs: WT_SR_Institutional, WT_DeferredMaint. |
| NIIP node excised; per-side cross-border | S220 | No NIIP. Two independent stocks: 1.1.1.4 (CBA) and 1.2.3 (CBL). |
| OFI excised from Via-DFS (BT-042) | S264–265 | Via-DFS now depository-only (S121+S122). Children renumbered. |
| Two-version US architecture | S314 | ISO3=USA vs FIPS=00000. API must serve both. |
| PA extended via PIM (211 countries) | S255–287 | Ratio-splice protocol mandatory. 4-tier source ladder. |
| Ratio-splice protocol codified | S287 | All multi-source splices use ratio-splice, never butt-splice. |
| Coverage Dashboard automated | S170 | Regenerated automatically at every session end. |

---

## 6. Open Action Items

### 6.1 From Task 6 Briefing (S291) — still open

1. **Password-protected website Phase 1:** Landing page + Exec Summary + chart grids + methodology page. Target: mid-June 2026.
2. **CorpusMinder grounding:** Ingest Glossary of Novel Constructs (30 entries), OGs (OG-001–010), and Thin Description as structured retrieval material.
3. **API schema for two-version architecture:** Implement iso3 vs fips identifier distinction. Serve both records for the US.
4. **Country-parameterized TL2/TL3 API:** Gazetteer loader, frame-aware response reconstruction, source registry per country.

### 6.2 From Housekeeping Briefing (S244) — awaiting your reply

1. **_Superseded/ folder (530 MB):** Move outside project tree, gitignore, or leave?
2. **node_modules / Sean_Task_WorldTable_Run.js:** Still in use, or superseded by Kotlin pipeline?
3. **safeBackup script copies in scripts/:** Safe to delete?

### 6.3 New — from this handoff review

1. **Confirm coefficient alignment:** All documentation now cites S278/BT-045 production coefficients (α=4.748, β_MYS=0.293). Verify your API reads from `hr_regression_coefficients.json`.
2. **Rev2 What code collision:** `build_fips00000_reconciliation.py` assigns 1.1.1.1.{1,2,3,5} to items that are not PA children (FDIC Deposits, Cap SS Benefits). Need different What codes.
3. **Website content packets:** Per the Website Brief, John + Claude prepare web-ready content; you review for developer-readiness. 6–8 sessions estimated.

---

## 7. Superseded Documents

The following earlier briefings are superseded by this document. They remain as intellectual history but should not be treated as current guidance:

| Document | Date | Status | Superseded By |
|----------|------|--------|---------------|
| Technical_Briefing_Sean_20260313.docx | Mar 13 | STALE | This document §2–4 |
| Technical_Briefing_Sean_20260322.docx | Mar 22 | STALE | This document §2–4 |
| Sean_Briefing_v3_PA.docx | ~Mar | STALE (pre-PIM) | This document §4.1 |
| Sean_Handoff_NC_Session.md | ~Mar | SUPERSEDED | This document §4.1 |
| HR_SI_Switch_Architecture.md | Apr 19 | STALE | This document §2.3 |
| OECD_API_Briefing_for_Sean.md | Mar 5 | BACK BURNER | Retained for ref |
| Sean_Handoff_Assessment_S152.md | Apr 11 | HISTORICAL | This document §6 |

**Documents that remain current alongside this briefing:**

- **`HANDOFF_LOG.md`** — Cumulative session-by-session feed (S155–present). Your canonical notification channel.
- **`BRIEFING_TopDown_vs_BottomUp.md`** — (US_MLA, S319) Detailed two-version architecture with reconciliation numbers.
- **`Subnational_Architecture_Universal_vs_CountrySpecific.md`** — Universal/country-specific separation for fand-api.
- **`Sean_Briefing_Task6_S291.docx`** — Website/dissemination strategy. 6 action items still open.
- **`QUICKSTART.md`** — How to run the pipeline. Needs minor refresh for S257+ changes.
- **`Website_Brief_for_Sean.md`** — Website scoping and content packet plan.

---

## 8. File Map

Key locations in the project tree (under `OconEco/`):

| Path | Contents |
|------|----------|
| `claude/scripts/` | 128 Python builder scripts (`run_all.py` is the DAG entry point) |
| `claude/C_Technical/.../World_Tables/` | All TL1 World Table xlsx files |
| `claude/C_Technical/.../Cross_Border/` | Cross-border World Tables |
| `claude/C_Technical/.../NC/` | NC branch World Tables |
| `claude/C_Technical/Briefings_for_Sean/` | All briefings + HANDOFF_LOG.md |
| `claude/what_code_manifest.json` | What code → API entity contract (v10) |
| `claude/hr_regression_coefficients.json` | Production HR coefficients (S278/BT-045) |
| `claude/oconeco_tl1_global.db` | TL1 SQLite cache (WAL — run locally) |
| `claude/Replication_Package/` | Scaffold for reproducibility |
| `US_MLA/C. Technical/scripts/` | US subnational builder scripts |
| `US_MLA/C. Technical/Panels/` | County/state CSV panels |
| `US_MLA/TL2/State_Tables/` | State-level indicator tables |
| `US_MLA/TL3/County_Tables/` | County-level indicator tables |
| `US_MLA/C. Technical/Briefings_for_Sean/` | US_MLA-specific briefings |

---

*Prepared: Session 315+ handoff review (2026-05-22). This document consolidates all prior Sean-facing briefings into a single reference. The HANDOFF_LOG.md remains the running notification channel for session-by-session changes.*
