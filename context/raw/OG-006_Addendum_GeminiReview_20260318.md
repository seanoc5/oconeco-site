# OG-006 Addendum: Gemini Review Response and US-Benchmark Revision

*Date: 2026-03-18 | Session 10*
*Status: Accepted revisions to OG-006 v1.0*

---

## 1. US-as-Benchmark for L_Distribution (NEW — from John O'Connor)

### The Insight
The Titration Workflow (OG-005 §5) already uses US=100 as the publication-form index for CW. The same logic applies to the liability side: the US Atkinson value should serve as the **reference point** for L_Distribution, not zero.

### Architectural Consequence
- **Countries with Atkinson > US**: carry L_Distribution = (I_country − I_US) × CW. This is a **liability** — distributional inefficiency beyond the US benchmark.
- **Countries with Atkinson < US**: receive an **SI credit** = (I_US − I_country) × CW. This is separately reported — it shows that part of their institutional capital is distributional efficiency the US lacks.
- **US itself**: L_Distribution = 0 by construction (it IS the benchmark). This is consistent with US=100 on the asset side.

### Why This Is Better Than a Theoretical Floor
The "structural minimum inequality" (I_min = 0.25 or whatever) is arbitrary. The US-as-benchmark is:
1. **Empirical**, not normative — it's the actual inequality of the anchor country.
2. **Consistent** — the same country that anchors CW/NW also anchors L_Distribution.
3. **Policy-relevant** — Nordic SI credits are real: their institutions achieve distributional outcomes the US does not.
4. **Time-variant** — US inequality changes over time, and the benchmark moves with it.

### Additional Risk Premium
Countries with Atkinson significantly above the US (say, I_country / I_US > 1.5) could carry an additional distributional risk premium, separately reported. This parallels the SI/CW < 20% risk flag on the asset side.

### Decision Register Update
**Decision 3 (Functional Form)** should be revised:
- **Chosen (revised)**: L_Distribution = (Atkinson_country − Atkinson_US) × CW. Countries below US get SI credit. US = 0 by construction.
- **Alternative A demoted**: Simple proportional (L = I × CW) now rejected — penalizes any inequality, including structural incentives.
- **Alternative B absorbed**: The threshold is no longer arbitrary — it's the US value.
- **Ambivalence**: LOW for the US-benchmark concept (it follows directly from OG-005). MODERATE for the SI-credit symmetry (new, untested).

---

## 2. Decision 2 Ambivalence Upgrade: L_Gender vs L_GNI_Gap

### Gemini's Assessment
Upgrade from MODERATE to **HIGH**. The GNI gender gap already incorporates non-participating women (zero earnings), so adding a separate LFPR-based liability risks clear double-counting.

### Accepted Resolution Path
Compute correlation between L_Gender (LFPR-based) and L_GNI_Gap across the 150-country panel:
- If **r > 0.85**: drop L_Gender, let L_GNI_Gap carry the full signal.
- If **r < 0.70**: both stay — they're measuring different things (potential vs. realized).
- If **0.70 < r < 0.85**: keep both but apply a discount factor (e.g., 0.5 × L_Gender) to prevent over-counting.

This test can be performed in the v2 production run.

---

## 3. Atkinson / Gender Gap Overlap (Point 3)

### The Issue
The Atkinson index over the full population already captures the male-female income gap as a component of overall inequality. L_INTRA_Gender and L_INTRA_Distribution therefore overlap.

### Accepted Mitigation
Estimate the between-gender share of total inequality using Theil-L decomposition (which decomposes additively into between-group and within-group components). Atkinson doesn't decompose as cleanly, but Theil-L is a close proxy at ε=1.
- If between-gender share is **10–20%** of total: overlap is tolerable, document and proceed.
- If **40%+**: adjust L_INTRA_Gender downward by the between-gender share to prevent compounding.

This decomposition requires WIID microdata or pre-computed Theil decompositions — add to the Gemini next-stage search.

---

## 4. Missing Considerations (Point 4) — Incorporated

### 4a. Structural Minimum (I_min)
**Resolved** by the US-benchmark approach (§1 above). No separate I_min parameter needed.

### 4b. Wealth vs. Income Mismatch
**Documented as methodological limitation.** Income-based Atkinson applied to Commonwealth (a stock concept) may understate the true distributional liability because wealth inequality is almost always higher than income inequality. This is a known category mismatch that will persist until wealth-by-decile data becomes available for >100 countries.

For the PoC, we accept this understatement as conservative: our L_Distribution is a lower bound on the true distributional claim on Commonwealth. Document in the Methodology tab of the production workbook.

### 4c. ε Parameter Sensitivity
**Added to Decision 3 table.** As ε increases:
- ε = 0: indifference to inequality (L → 0 for all countries)
- ε = 1 (chosen): moderate inequality aversion, "total social welfare" focus
- ε = 2: strong inequality aversion, weights bottom of distribution heavily, closer to "poverty alleviation" focus
- ε → ∞: Rawlsian (only the worst-off matters)

For the PoC, ε=1 is standard and defensible. A sensitivity analysis showing L_Distribution at ε=0.5, 1.0, and 2.0 should be included as a diagnostic tab in the v2 production workbook.

---

## 5. Items for Gemini Next-Stage Follow-Up

Add to Track 2 of the next-stage prompt:

1. **Theil decomposition data**: Does the WIID Companion provide pre-computed between-group (male/female) Theil-L decompositions? If not, which source does?
2. **US Atkinson time series**: What is the Atkinson ε=1 value for the US, 1990–2023, from WIID? We need this as the benchmark anchor.
3. **ε sensitivity in the literature**: Any published sensitivity analyses showing how country rankings change across ε=0.5, 1.0, 2.0?

---

*Cross-references: OG-006 v1.0, Titration_Workflow_20260317.md (OG-005 §5), Roadmap §>5c*
*Filed: C_Technical/Guidelines/OG-006_Addendum_GeminiReview_20260318.md*
