# FAND staged-facade disposition (issue #66)

Decisions recorded 2026-07-23 (Sean). Closes the #66 agenda; unblocks #70–#74.

## Settled decisions

- **Voice verdict (#67): Arm C — hybrid.** John's voice on landing/persuasion surfaces and the essays; descriptive-neutral on reference/scannable surfaces (framework subpages, evidence listings, nav labels, tables).
- **Essays home (#70): under `/evidence/`.** Matches the facade's own link structure — `evidence.html` links to both essays; `framework.html` links to core-and-satellites. No new top-level section.
- **URL takeover: yes — same URLs.** Static tools hold `/tools/*` as interim stand-ins; fand-app replaces them in place later (oconeco-site#51 invariant, fand-app#691). No redirects planned.
- **FYI for John (Sean to relay):** deep-linking is fand-app-native (fand-app#691) — his generator does NOT need URL-param handling.

## Per-file disposition

| File | Disposition | Target / notes |
|---|---|---|
| `index.html` | **merge** | Landing (#71). Persuasion surface → John's voice. |
| `about.html` | **merge** | `/about/` (#74). John's voice for narrative/career sections; neutral for logistics. |
| `framework.html` | **merge** | `/framework/` (#72). Reference surface → neutral; short voiced intro allowed. PRs #61–64 merged first — reconcile against current subpages. |
| `evidence.html` | **merge** | `/evidence/` (#73). Neutral listings; voiced framing paragraphs allowed. |
| `essay-takeoff.html` | **merge** | Port under `/evidence/` (#70). Essays keep John's voice. |
| `essay-capacity.html` | **merge** | Port under `/evidence/` (#70). Essays keep John's voice. |
| `core-and-satellites.html` | **merge** | Port under `/evidence/` (#70); linked from `/framework/` where the facade links it. |
| `tools.html` | **adopt-as-is** | ✅ Done — re-authored as `src/content/pages/tools.md` (PR #77). Facade's "1950–2025" blurb was a typo; data starts 1955. |
| `tools/entity-us.html` | **adopt-as-is** | ✅ Done — `public/tools/` (PR #77). |
| `tools/entity-us-fl.html` | **adopt-as-is** | ✅ Done (PR #77). |
| `tools/entity-us-fl-duval.html` | **adopt-as-is** | ✅ Done (PR #77). |
| `tools/fand-explorer.html` | **adopt-as-is** | ✅ Done (PR #77). |
| `tools/where-explorer.html` | **adopt-as-is** | ✅ Done (PR #77). |
| `tools/ocf-demo.html` | **adopt-as-is** | ✅ Done (PR #77). |

Nothing is **parked** — every file is either shipped or assigned to an open issue.

## Nav mapping (no gaps)

Facade → site: Home→Home · Framework→What We Measure (`/framework/`) · Evidence→The Data (`/evidence/`) · Tools→Tools · About→About. Site's Methods (`/methodology/`) is an addition with no facade counterpart. Neutral nav labels stand under the hybrid verdict.
