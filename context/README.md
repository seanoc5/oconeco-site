# context/

Internal source material that **guides** the site's design and content but is **not published**.

Nothing in this directory is built by Astro (it lives outside `src/`). Treat it as the brief you'd hand a designer or developer joining the project.

## Subfolders

| Folder | What goes here | How an agent should treat it |
|---|---|---|
| `vision/` | John's emails, strategic direction, "what the new site should feel like", stakeholder priorities | **Authoritative intent.** Weight heavily when making design/content tradeoffs. Quote sparingly; paraphrase the principle. |
| `inspiration/` | Reference sites, screenshots, demo material, "I like how X does Y" notes | **Aesthetic + UX hints.** Use to ground visual and interaction choices. Not prescriptive — extract the *quality* being pointed at, not the literal artifact. |
| `theory/` | Domain frameworks, intellectual scaffolding (SROI, ISPP, multi-local analytics, OConeco's conceptual vocabulary) | **Domain language.** Use these terms consistently across the site. When in doubt about how to describe something, check here first. |
| `raw/` | Unprocessed dumps — email exports, meeting transcripts, draft notes | **Read for context, don't quote verbatim.** This material is private and unedited. Synthesize, then promote distilled insights up into `vision/` or `theory/` as appropriate. |

## For agents working on this site

1. **Read `CONTEXT.md` at the repo root first** — it captures distilled principles.
2. **Skim `vision/` next** — that's the "what are we trying to achieve" layer.
3. **Consult `theory/` when naming things** — domain terms should be consistent.
4. **Pull from `inspiration/` when making design moves** — but don't copy; extract the principle.
5. **Only dig into `raw/` when the higher layers don't answer your question.** It's the slowest signal.

## For Sean (and John)

Drop new material into the appropriate subfolder. No naming convention required — descriptive filenames are enough. If something in `raw/` turns out to be load-bearing, distill it into `vision/` or `theory/` so future agents don't have to re-derive it.
