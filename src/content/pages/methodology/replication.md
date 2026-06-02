---
title: "Replication package"
slug: "methodology/replication"
description: "The 12-stage Python pipeline that reproduces every published FAND number, with SHA-256 audit trail."
sectionContext: "The full Python pipeline that reproduces every number, on GitHub."
---

> **Strawman.** Per State of FAND briefing §4.3. Phase 1 links to the public GitHub release (or gated download for institutional reviewers). Phase 2 surfaces a live build status.

# Replication package

Every number FAND publishes can be reproduced from public source data using the bundled Python pipeline. The package contains 128 builder scripts, organized as a 12-stage DAG, with SHA-256 checksums on every intermediate artifact.

## How to run it

```bash
pip install -r requirements.txt        # 6 Python packages
python scripts/run_all.py --national   # 12-stage DAG, all TL1 builders
python scripts/run_all.py --list       # show stages without running
```

Every script is idempotent, with externalized parameters and a PASS/FAIL validation summary printed at the end.

## What's inside

| Component | What it is |
|---|---|
| **`scripts/`** | 128 Python builder scripts; `run_all.py` is the DAG entry point |
| **`scripts/world_tables/`** | 30+ World Tables (TL1) — Fossil Fuels, Minerals, Forest Timber, Forest Cover, Fisheries, AgLand, PA, HR, SI, SR, DM, CW, RW, Population |
| **`scripts/cross_border/`** | Cross-border World Tables (CBA + CBL, per-side) |
| **`scripts/us_mla/`** | US state and county builders |
| **`what_code_manifest.json`** | v10 — What code → fand-api entity mapping |
| **`hr_regression_coefficients.json`** | Production HR coefficients (S278/BT-045 — always authoritative) |
| **`wld_source_registry.json`** | WLD row provenance for all World Tables |
| **`parameters.json`** | Valuation parameters (discount rate r=4%, severance 10%, …) |
| **SQLite caches** | `oconeco_tl1_global.db` (TL1) and `oconeco_sub_usa.db` (US subnational) — WAL journaling |

## What lives where

The replication package is what gets handed to institutional reviewers. The public-facing summary lives here; the full download lives in [/deep-dive/](/deep-dive/).

For repository-level context on how the pipeline maps to fand-api integration, see the State of FAND briefing §4 in [`context/raw/`](https://github.com/seanoc5/oconeco-site/tree/main/context/raw).

*(Placeholder. Replace with the live release URL + checksum manifest once the GitHub release is cut.)*
