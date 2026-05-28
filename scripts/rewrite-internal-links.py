#!/usr/bin/env python3
"""Rewrite Webnode-style internal links (../slug/index.html) to clean /slug/ form.

Run from the repo root:  python3 scripts/rewrite-internal-links.py

Idempotent: running it twice leaves the files unchanged on the second run.
"""
import re
import sys
from pathlib import Path

PAGES_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "pages"

# Matches: ](OPTIONAL_DOT_DOT_SLASH SLUG / index.html OPTIONAL_ANCHOR)
INTERNAL_LINK = re.compile(
    r"\]\((?:\.\./)?([a-z0-9][a-z0-9-]*)/index\.html(#[^)]*)?\)"
)
# Matches the self-reference: ](index.html#) or ](index.html#frag)
SELF_LINK = re.compile(r"\]\(index\.html(#[^)]*)?\)")

# `home` was a duplicate of `index`; collapse to root.
SLUG_OVERRIDES = {"home": ""}

def rewrite_internal(match: re.Match) -> str:
    slug = match.group(1)
    anchor = match.group(2) or ""
    target = SLUG_OVERRIDES.get(slug, slug)
    path = "/" if target == "" else f"/{target}/"
    return f"]({path}{anchor})"

def rewrite_self(match: re.Match) -> str:
    anchor = match.group(1) or ""
    return f"]({anchor or '#'})"

def main() -> int:
    files = sorted(PAGES_DIR.glob("*.md"))
    if not files:
        print(f"no markdown found under {PAGES_DIR}", file=sys.stderr)
        return 1
    total_internal = 0
    total_self = 0
    changed = 0
    for path in files:
        original = path.read_text(encoding="utf-8")
        updated, n1 = INTERNAL_LINK.subn(rewrite_internal, original)
        updated, n2 = SELF_LINK.subn(rewrite_self, updated)
        total_internal += n1
        total_self += n2
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"  {path.name}: rewrote {n1} internal + {n2} self-link")
    print(f"\n{changed} files changed; {total_internal} internal links rewritten, {total_self} self-links normalized")
    return 0

if __name__ == "__main__":
    sys.exit(main())
