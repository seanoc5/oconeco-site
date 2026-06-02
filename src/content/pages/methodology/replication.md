---
title: "Replication package"
slug: "methodology/replication"
description: "The 12-stage Python pipeline that reproduces every published FAND number, with SHA-256 audit trail and public GitHub release."
sectionContext: "The full Python pipeline that reproduces every number, on GitHub."
---

# Replication package

Every number FAND publishes can be reproduced from public source data using the bundled Python pipeline. The package contains 128 builder scripts, organized as a 12-stage DAG, with SHA-256 checksums on every intermediate artifact and a `MANIFEST` file pinning the exact source-data snapshot used for each release.

## Source code

The replication package is published on GitHub:

**Repository:** [`github.com/oconeco/fand-replication`](https://github.com/oconeco/fand-replication) *(URL provisional — to be confirmed before Phase 1 launch)*

Tagged releases correspond to FAND publication snapshots. The latest tagged release is the canonical reference for any number cited on this site; the `main` branch tracks ongoing pipeline work.

## What the package contains

- A **12-stage Python pipeline** that runs end-to-end from agency downloads through validated FAND output
- **128 builder scripts** — 30+ World Tables (TL1), per-side cross-border builders (CBA / CBL), and US state/county builders
- **`run_all.py`** — the DAG entry point that resolves stage dependencies and produces a PASS/FAIL summary
- **SHA-256 audit trail** — every intermediate artifact carries a checksum so a reviewer can confirm bit-exact reproduction
- **`MANIFEST`** — pins the agency-data snapshot (source, table, retrieval date, URL) used for the release
- **`parameters.json`** — externalized valuation parameters (discount rate, severance rate, splice protocol, etc.)
- **SQLite caches** — `oconeco_tl1_global.db` (TL1) and `oconeco_sub_usa.db` (US subnational) for fast re-runs

## How to run it

```bash
git clone https://github.com/oconeco/fand-replication.git
cd fand-replication
pip install -r requirements.txt
python run_all.py
```

Useful flags:

```bash
python run_all.py --national   # TL1 builders only (skip US subnational)
python run_all.py --list       # show stages without running
python run_all.py --stage 7    # run a single stage
```

Every script is idempotent. A full run on a modern laptop completes in tens of minutes; subsequent runs against the cached intermediate artifacts complete in seconds. The final stage prints a PASS/FAIL validation summary that an institutional reviewer can spot-check against the published numbers.

## License

The replication package is released under the **MIT License**. The license applies to the pipeline code; the upstream source data remains governed by each agency's own terms of use.

## Where it sits in the architecture

The replication package is what gets handed to institutional reviewers. The public-facing summary lives here; the full source-code repository is the link above. For repository-level context on how the pipeline maps to the FAND data API, see the State of FAND briefing in [`context/raw/`](https://github.com/seanoc5/oconeco-site/tree/main/context/raw).
