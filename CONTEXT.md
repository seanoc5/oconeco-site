# CONTEXT.md

Front door for agents and collaborators working on the OConeco site.

## What this project is

A rebuild of the OConeco public site, migrated from Webnode to **Astro**. The codebase under `src/content/pages/` holds the published content (Markdown); the rest of `src/` will hold layout, components, and styling as those evolve.

## What lives where

| Path | Purpose |
|---|---|
| `src/` | The site itself — Astro builds this. |
| `src/content/pages/` | Published Markdown pages (migrated from Webnode). |
| `context/` | **Internal source material that guides the site but isn't published.** See `context/README.md`. |
| `scripts/` | One-off migration / maintenance scripts (e.g. `rewrite-internal-links.py`). |
| `.swarm/` | Multi-agent coordination state (worktrees, briefs). Not part of the site. |

## How to orient yourself as an agent

1. **Read `context/README.md`** — it explains the guidance hierarchy.
2. **Skim `context/vision/`** for stakeholder intent.
3. **Note `context/theory/`** for the domain vocabulary (SROI, ISPP, MLA, etc.) you should use consistently across the site.
4. **Then look at `src/content/pages/`** to see the current state of published content.

## Principles (extracted from `context/`)

> **This section is intentionally empty until material lands in `context/`.** As `vision/` and `theory/` fill in, distill the recurring principles here so future agents don't have to re-read the source material.

Examples of what would eventually live here:
- Voice and tone choices ("formal but warm," etc.)
- Information architecture principles ("the homepage should lead with X, not Y")
- Non-negotiables ("never use jargon X without defining it first")
- Brand/visual constants
