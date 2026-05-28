#!/usr/bin/env python3
"""Extract content from mirrored Webnode pages and convert to Markdown with frontmatter."""
import subprocess
import sys
from pathlib import Path
from bs4 import BeautifulSoup

MIRROR = Path("/tmp/oconeco-mirror/oconeco.webnode.page")
OUT = Path("/opt/work/oconeco/oconeco-site/src/content/pages")
OUT.mkdir(parents=True, exist_ok=True)

# Webnode wraps real content in <section class="s s-basic ..."> inside <main>.
# Skip <section class="s s-hn ..."> (nav), s-hm-claims (hero), s-f-basic (footer).
CONTENT_CLASS_PREFIX = "s-basic"

def slug_from_path(html_path: Path) -> str:
    rel = html_path.relative_to(MIRROR).parent
    return "index" if str(rel) == "." else str(rel).replace("/", "-")

def extract_content_html(html_text: str) -> tuple[str, str]:
    """Return (title, html_of_content_sections)."""
    soup = BeautifulSoup(html_text, "html.parser")
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else ""
    main = soup.find("main")
    if not main:
        return title, ""
    pieces: list[str] = []
    for section in main.find_all("section"):
        classes = section.get("class", [])
        if any(c == CONTENT_CLASS_PREFIX or c.startswith(CONTENT_CLASS_PREFIX + "-") for c in classes) or "s-basic" in classes:
            pieces.append(str(section))
    return title, "\n".join(pieces)

def html_to_md(html: str) -> str:
    result = subprocess.run(
        ["pandoc", "--from=html", "--to=gfm-raw_html-smart", "--wrap=preserve"],
        input=html, capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()

def main():
    pages = sorted(MIRROR.rglob("index.html"))
    print(f"Processing {len(pages)} HTML files", file=sys.stderr)
    summary = []
    for html_path in pages:
        slug = slug_from_path(html_path)
        try:
            title, content_html = extract_content_html(html_path.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"  SKIP {slug}: read/parse failed: {e}", file=sys.stderr)
            continue
        if not content_html.strip():
            print(f"  SKIP {slug}: no s-basic content sections found", file=sys.stderr)
            summary.append((slug, title, 0, "no-content"))
            continue
        md = html_to_md(content_html)
        clean_title = title.removesuffix(" :: Oconeco").strip() or "Oconeco"
        title_for_fm = clean_title.replace('"', '\\"')
        source_path = "/" if slug == "index" else f"/{slug}/"
        frontmatter = (
            "---\n"
            f'title: "{title_for_fm}"\n'
            f'rawTitle: "{title.replace(chr(34), chr(92)+chr(34))}"\n'
            f'slug: "{slug}"\n'
            f'sourceUrl: "https://oconeco.webnode.page{source_path}"\n'
            "---\n\n"
        )
        out_path = OUT / f"{slug}.md"
        out_path.write_text(frontmatter + md + "\n", encoding="utf-8")
        summary.append((slug, title, len(md), "ok"))
    print(f"\nWrote {sum(1 for s in summary if s[3] == 'ok')} markdown files to {OUT}", file=sys.stderr)
    print(f"Skipped (no content): {sum(1 for s in summary if s[3] == 'no-content')}", file=sys.stderr)
    for slug, title, size, status in summary:
        print(f"  {status:12} {size:>6}  {slug:50}  {title}")

if __name__ == "__main__":
    main()
