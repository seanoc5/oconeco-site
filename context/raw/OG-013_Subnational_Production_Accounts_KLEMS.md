# OG-008: Subnational Production Accounts — Labor Theory of Value via KLEMS

**Operational Guideline | US_MLA Project**
**Established: Session 8, 2026-05-11**
**Status: WORKING**

---

## 1. Purpose and Scope

This document establishes the methodology for constructing county-level (TL3) and state-level (TL2) production accounts using the Bureau of Labor Statistics KLEMS (Capital, Labor, Energy, Materials, Services) framework. The methodology produces Gross Territorial Product (GTP) as a testable alternative to BEA's county GDP, anchored on a labor theory of value where labor hours are the sole locally-observed primitive.

The production accounts feed directly into the balance-sheet identity: county VA (= K + L) is the quantity capitalized as Comprehensive Wealth (CW). Owner-Occupied Dwellings (OOD) enter as a separate zero-labor capital component, ensuring the K/L composition of CW reflects the full productive capacity of each territory.

### What Hierarchy Position

The KLEMS production accounts occupy What code **2.1.1.2** in the FAND What Hierarchy — the flow-side complement to the stock-side balance sheet (1.x). The five KLEMS factors decompose Gross Output:

```
GO = K + L + E + M + S
VA = K + L
IC = E + M + S
```

---

## 2. The Primitive: Labor Hours

### 2.1 Why Labor Is the Anchor

At the county level, the only factor of production observed with establishment-level geographic precision is labor. The Quarterly Census of Employment and Wages (QCEW) reports employment counts and total wages for every establishment covered by unemployment insurance, geolocated to the county where work is performed. No comparable county-level observation exists for capital stock, energy purchases, materials consumption, or purchased services.

The KLEMS methodology therefore treats county labor hours as the primitive from which all other factors are imputed:

```
L_hours_county_i = QCEW_employment_county_i × (KLEMS_national_L_hours_i / QCEW_national_employment_i)
```

Where `i` indexes NAICS supersector. This converts QCEW employment counts to hours using the national average hours-per-worker for each industry.

### 2.2 Imputation of Non-Labor Factors

Once county L_hours are established, all other KLEMS factors are imputed from national cost-per-hour ratios:

```
K_county_i = K_per_Lhour_national_i × L_hours_county_i
L_county_i = L_per_Lhour_national_i × L_hours_county_i
E_county_i = E_per_Lhour_national_i × L_hours_county_i
M_county_i = M_per_Lhour_national_i × L_hours_county_i
S_county_i = S_per_Lhour_national_i × L_hours_county_i
```

This assumes national factor proportions within each industry. Divergences from BEA county GDP are therefore analytically meaningful — they signal where local production functions differ from national averages, reflecting differences in capital intensity, intermediate-input sourcing, or social infrastructure.

---

## 3. The BLS-Only Rule (Private Sector)

### 3.1 Why BEA Is Excluded

BEA and BLS treat proprietors' income (PI) differently in their production accounts:

- **BLS KLEMS**: Assigns all proprietors' income to Labor compensation. The logic: proprietors supply their own labor; PI is the return to that labor.
- **BEA GDP-by-industry**: Splits proprietors' income between Labor (compensation of employees) and Capital (gross operating surplus). The split is estimated, not observed.

For FAND's labor theory of value, the BLS treatment is structurally correct. If we anchor on L_hours and impute K from the K/L ratio, the ratio must reflect the same accounting for PI. Using BEA's K/L ratios (where part of PI inflates K) would systematically overstate capital intensity and understate the labor share.

### 3.2 Consequence

All private-sector KLEMS factors (NAICS 11 through 81) are derived exclusively from BLS Major Industry Total Factor Productivity (KLEMS) national data, never from BEA Supply-Use Tables, BEA GDP-by-industry, or BEA SAGDP/CAGDP.

The national ratio library is stored in `US_MLA/C. Technical/klems_national_ratios.csv` (3,078 rows, 81 industries × 38 years, 1987–2024).

---

## 4. Government (NAICS 92): The BEA-BLS Exception

### 4.1 Why Government Is Different

Government has no proprietors' income. Federal, state, and local government employees are all wage-and-salary workers — there are no government proprietors. Therefore the BLS/BEA PI divergence does not apply, and BEA's production account for government is uncontaminated.

Government capital is substantial (defense equipment, infrastructure, public buildings) and is better captured by BEA's explicit capital cost estimates than by the BLS KLEMS industry ratios, which do not include a government sector.

### 4.2 Government Imputation Method

Government uses **cost-to-cost ratios** from the BEA-BLS Integrated Industry-Level Production Account, applied to QCEW government wages as the L anchor:

```
K_govt_county = (K/L)_govt_national × L_cost_county
E_govt_county = (E/L)_govt_national × L_cost_county
M_govt_county = (M/L)_govt_national × L_cost_county
S_govt_county = (S/L)_govt_national × L_cost_county
```

The ratios are computed from combined Federal + State & Local government (GOV) in the BEA-BLS Production Account. The combined ratio is used because the QCEW county panel (agglvl_code=74) sums across ownership types (Federal, State, Local, Private), making it impossible to separate Federal from State & Local government employment at the county × supersector level.

Key ratios (2020): K/L = 0.80, E/L = 0.06, M/L = 0.19, S/L = 0.48. Government GO = $5.40T, VA = $3.84T.

The government ratio library is stored in `US_MLA/C. Technical/klems_government_ratios.csv` (84 rows, 28 years × 3 types: GF, GSL, GOV).

---

## 5. Owner-Occupied Dwellings (OOD)

### 5.1 The Structural Problem

Owner-occupied housing produces capital services (shelter) with zero labor input. There is no employer, no employee, no establishment in QCEW. Yet BEA counts imputed rent from OOD as GDP — it is the largest single "missing industry" when comparing KLEMS-based GTP to BEA GDP.

### 5.2 Two Measures, Two Uses

| Measure | Source | 2022 US Total | Balance-Sheet Role |
|---------|--------|---------------|-------------------|
| Housing stock value | Census ACS B25082 | $32.55T | PA (Produced Assets) — direct observation of the asset |
| Imputed rent flow | BEA SAINC30 line 96 | $0.67T | K in KLEMS — annual capital services from that asset |

The implied yield (imputed rent / housing stock) is 2.05% nationally, ranging from 1.25% (Hawaii) to 2.98% (Mississippi). The yield is below the FAND discount rate (r = 4%) because Census self-reported home values overstate income-producing capacity relative to rental equivalents.

### 5.3 County Allocation

BEA publishes imputed rent at the state level only (SAINC30 line 96). County allocation uses Census ACS B25082 (aggregate value of owner-occupied housing) as the weight:

```
K_OOD_county = ImpRent_state × (B25082_county / Σ B25082_counties_in_state)
```

B25082 is available for 3,144 US counties (ACS 5-year estimates, 2018–2022 vintage). Only 2 counties have missing values.

### 5.4 OOD in the KLEMS Panel

OOD enters the county KLEMS panel as industry_code `OOD` with source `OOD_IMPUTED_RENT`:

```
K_OOD = imputed rent (allocated)
L_OOD = 0
VA_OOD = K_OOD (since VA = K + L and L = 0)
GO_OOD = VA_OOD (no intermediate consumption)
```

OOD adds 3.1% (2010) to 4.0% (2024) of total county VA. The contribution is pure K, shifting the aggregate K/L ratio from 0.77 to 0.82.

### 5.5 Relationship to CW Capitalization

When VA = K + L is capitalized as CW, the OOD contribution is the capitalized imputed rent stream. The housing stock (B25082) enters PA independently as a directly observed asset. The identity CW = PA + NC + RW holds with OOD in both CW (via capitalized VA) and PA (via B25082 stock). This is not double-counting — CW is a capitalized income flow, PA is a directly observed stock; they are independent estimates that decompose wealth from different angles.

---

## 6. Data Source Architecture

### 6.1 The Four Source Types

| Source Type | Industries | Row Count | Method | Anchor |
|-------------|-----------|-----------|--------|--------|
| BLS_KLEMS_IMPUTED | 18 private NAICS (11–81) | 1,434,566 | National cost-per-hour × county L_hours | L_hours |
| BEA_BLS_GOVT_IMPUTED | NAICS 92 (Government) | 78,495 | National cost-to-cost ratio × county L_cost | L_cost |
| OOD_IMPUTED_RENT | OOD (pseudo-industry) | 75,456 | State imputed rent × county B25082 share | Housing stock |
| L_ONLY_NO_KLEMS | NAICS 99 (Unclassified) | 36,664 | Wages only; no factor decomposition | — |

### 6.2 Primary Sources

| Source | Product | Coverage | Role in Pipeline |
|--------|---------|----------|-----------------|
| BLS | QCEW Annual (singlefile or by-area CSV) | Counties × 21 NAICS supersectors, 2001–2024 | L primitive: employment counts and total wages |
| BLS | Major Industry TFP/KLEMS | 81 industries, 1987–2024 | National K/L/E/M/S ratios for private sector |
| BEA | BEA-BLS Integrated Production Account | Government + 63 industries, 1997–2024 | Government K/L/E/M/S ratios |
| BEA | SAINC30 (Property income by type) | 51 states, 1958–2024 | State-level OOD imputed rent (line 96) |
| Census | ACS B25082 (Aggregate OO housing value) | 3,144 counties, 5-year estimates | OOD county allocation weight |
| BLS | Government Capital Details by Asset | 2000–2023 | Cross-validation of government K |

### 6.3 QCEW-to-KLEMS Industry Concordance

The QCEW supersector codes map to BLS KLEMS NAICS as follows:

| QCEW Code | KLEMS Code | Industry |
|-----------|------------|----------|
| 11 | 11 | Agriculture |
| 21 | 21 | Mining |
| 22 | 22 | Utilities |
| 23 | 23 | Construction |
| 31-33 | MN | Manufacturing |
| 42 | 42 | Wholesale Trade |
| 44-45 | 44,45 | Retail Trade |
| 48-49 | 48-49 | Transportation & Warehousing |
| 51 | 51 | Information |
| 52 | 52 | Finance & Insurance |
| 53 | 53 | Real Estate |
| 54 | 54 | Professional Services |
| 55 | 55 | Management |
| 56 | 56 | Administrative Services |
| 61 | 61 | Educational Services |
| 62 | 62 | Health Care |
| 71 | 71 | Arts & Entertainment |
| 72 | 72 | Accommodation & Food |
| 81 | 81 | Other Services |
| 92 | — | Government (BEA-BLS method) |
| 99 | — | Unclassified (L only) |

---

## 7. Cross-Validation

### 7.1 Coverage Ratios

| Metric | FAND / BLS National | Explanation |
|--------|-------------------|-------------|
| Private GO | 93–95% | County disclosure thresholds suppress small-establishment data |
| Private L_cost | 81–86% | QCEW wages exclude employer supplements (pensions, health insurance) |
| OOD yield | 2.05% | Census self-reported values exceed income-producing capacity |

Both coverage gaps are stable across years and structurally explainable — they are features of the data architecture, not errors.

### 7.2 Divergence from BEA GDP as Signal

Where FAND GTP diverges from BEA county GDP, the divergence has analytical meaning:

- **GTP > BEA GDP**: County has higher labor intensity than national average for its industry mix, or BEA's HQ-bias understates local production.
- **GTP < BEA GDP**: County has lower labor intensity (more capital-intensive local operations), or BEA's property-income allocation inflates the county.
- **OOD share variation**: Counties with high homeownership rates and expensive housing (suburban counties) gain more VA from OOD than urban renter-heavy cores.

These divergences are testable hypotheses about local social infrastructure and production functions — precisely the analytical signal FAND is designed to produce.

---

## 8. Panel Inventory

| Panel | Path | Rows | Coverage |
|-------|------|------|----------|
| County KLEMS | `TL3/County_Tables/KLEMS/county_klems_panel.csv` | 1,625,181 | 3,293 counties × 22 industries × 24 years |
| State KLEMS | `TL2/State_Tables/KLEMS/state_klems_panel.csv` | 27,607 | 53 states × 22 industries × 24 years |
| National Aggregated | `C. Technical/klems_national_aggregated.csv` | 528 | 22 industries × 24 years |
| National Ratios (BLS) | `C. Technical/klems_national_ratios.csv` | 3,078 | 81 industries × 38 years |
| Government Ratios | `C. Technical/klems_government_ratios.csv` | 84 | 3 types × 28 years |
| OOD County Weights | `A. Background/DAta Extracts/B25082_county_2022_acs5.csv` | 3,222 | All US + PR counties |
| State Imputed Rent | `TL2/State_Tables/Balance_Sheet/state_rental_income_panel.csv` | 12,060 | 51 states, 1958–2024 |
| Stock-Flow Cross-Val | `C. Technical/state_ood_stock_flow_crossval.csv` | 51 | State yield comparison |

### Panel Schema (County KLEMS)

| Column | Type | Description |
|--------|------|-------------|
| area_fips | str | 5-digit county FIPS |
| industry_code | str | QCEW supersector or 'OOD' |
| year | int | 2001–2024 |
| annual_avg_emplvl | int | Average annual employment (0 for OOD) |
| L_hours_mn | float | Labor hours in millions |
| L_cost_musd | float | Labor compensation in millions USD |
| K_cost_musd | float | Capital services cost in millions USD |
| E_cost_musd | float | Energy cost in millions USD |
| M_cost_musd | float | Materials cost in millions USD |
| S_cost_musd | float | Purchased services cost in millions USD |
| VA_musd | float | Value Added = K + L |
| IC_musd | float | Intermediate Consumption = E + M + S |
| GO_musd | float | Gross Output = VA + IC |
| klems_source | str | Provenance: BLS_KLEMS_IMPUTED, BEA_BLS_GOVT_IMPUTED, OOD_IMPUTED_RENT, L_ONLY_NO_KLEMS |

---

## 9. Builder Script

`US_MLA/scripts/build_klems_fand.py`

The builder reads the QCEW county supersector panel, national KLEMS ratios, and government ratios; imputes all factors; adds OOD rows from state imputed rent allocated by B25082 weights; and writes county, state, and national CSV panels.

### Balance-Sheet Target Declaration (per SPMF-116-1)

```
What code:  2.1.1.2    (KLEMS Production Accounts)
BS entry:   VA_musd    (= K_cost_musd + L_cost_musd; capitalized as CW)
Method:     Labor-anchored imputation from national KLEMS ratios
Roll-up:    2.1.1.2 → 2.1.1 (Production Accounts) → 2.1 (Flows)
```

---

## 10. Standing Decisions

| Decision | Rationale |
|----------|-----------|
| BLS-only for private sector | PI to L (BLS) vs PI split K/L (BEA); labor theory requires consistent treatment |
| BEA-BLS for government | No PI contamination; BEA captures defense/infrastructure capital better |
| Combined GOV ratio (not GF/GSL split) | QCEW panel sums ownership types; cannot separate Fed from S&L at county level |
| B25082 as OOD weight | Direct observation of OO housing stock at county level; 99.9% coverage |
| SAINC30 L96 as OOD flow | BEA's official imputed rent estimate; consistent with GDP accounting |
| OOD as separate industry | Zero labor; sits outside the labor theory; transparent in the panel |
| NAICS 99 as L-only | Unclassified establishments; no national KLEMS match; wages captured but not decomposed |

---

*Cross-references: CLAUDE.md (US_MLA project instructions), balance-sheet-identity.md (CW = PA + NC + RW), pipeline-first-build.md (SPMF-116-1 target declaration), BUILD_TICKET_PA_LABOR.md (OOD as separate PA component).*
