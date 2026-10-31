"""Assemble le support de soutenance (slides.html + annexe de code R) en PDF.

Usage : python3 soutenance/build.py            (depuis la racine du projet)
Prérequis : Rscript analyse_projet.R a généré figures/*.svg ;
            Node + Playwright (Chromium) ; Python + pygments + markdown.
"""
import html
import pathlib
import subprocess
import sys

import markdown
from pygments.lexers import SLexer
from pygments.token import Comment, Keyword, Name, Number, Operator, String

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "soutenance" / "slides.html"
OUT_HTML = ROOT / "soutenance" / "slides_full.html"
OUT_PDF = ROOT / "Trinome11_BERTIN_GUIHARD_CHEBREK_soutenance.pdf"
R_SCRIPT = ROOT / "analyse_projet.R"
NOTES_MD = ROOT / "soutenance" / "notes_oral.md"
NOTES_HTML = ROOT / "soutenance" / "notes_oral.html"
NOTES_PDF = ROOT / "Trinome11_notes_oral.pdf"

NOTES_CSS = """
body { font-family: 'Inter', sans-serif; color: #0f172a; font-size: 10.5pt;
  line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1 { font-size: 20pt; letter-spacing: -0.02em; margin: 0 0 6pt; }
h2 { font-size: 13pt; color: #1c5cab; margin: 16pt 0 6pt; padding-top: 6pt;
  border-top: 1px solid #e2e8f0; break-after: avoid; }
p { margin: 0 0 7pt; } ul { margin: 0 0 7pt 16pt; padding: 0; }
p strong:first-child { color: #1c5cab; }
table { border-collapse: collapse; width: 100%; margin: 4pt 0 8pt; }
th, td { text-align: left; padding: 4pt 8pt; border-bottom: 1px solid #e2e8f0; }
th { color: #64748b; border-bottom: 1.5px solid #0f172a; }
hr { border: 0; height: 0; margin: 4pt 0; }
code { font-family: 'JetBrains Mono', monospace; font-size: 9pt; background: #f1f5f9;
  padding: 0 3pt; border-radius: 3pt; }
p { break-inside: avoid; }
"""

CHECK = ('<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" '
         'fill="currentColor" opacity=".14"/><path d="M7 12.4l3.2 3.2L17.2 8.6" '
         'fill="none" stroke="currentColor" stroke-width="2.6" '
         'stroke-linecap="round" stroke-linejoin="round"/></svg>')

LINES_PER_COL = 33


def css_class(tok):
    if tok in Comment:
        return "tok-c"
    if tok in String:
        return "tok-s"
    if tok in Keyword:
        return "tok-k"
    if tok in Number:
        return "tok-n"
    if tok in Name.Function or tok in Name.Builtin:
        return "tok-f"
    if tok in Operator:
        return "tok-o"
    return None


def highlight_lines(code):
    """Renvoie une liste de lignes HTML colorées (une par ligne de code)."""
    lines, cur = [], []
    for tok, val in SLexer().get_tokens(code):
        parts = val.split("\n")
        for i, part in enumerate(parts):
            if i > 0:
                lines.append("".join(cur))
                cur = []
            if part:
                cls = css_class(tok)
                esc = html.escape(part)
                cur.append(f'<span class="{cls}">{esc}</span>' if cls else esc)
    if cur:
        lines.append("".join(cur))
    return lines


def split_columns(raw, n):
    """Découpe en colonnes de n lignes max, en coupant de préférence sur une
    ligne vide (pour ne pas séparer un bloc de code)."""
    cols, start = [], 0
    while start < len(raw):
        end = min(start + n, len(raw))
        if end < len(raw):
            for back in range(end, end - 10, -1):
                if raw[back - 1].strip() == "":
                    end = back
                    break
        cols.append((start, end))
        start = end
        while start < len(raw) and raw[start].strip() == "":
            start += 1
    return cols


def annexe_html():
    code = R_SCRIPT.read_text(encoding="utf-8").rstrip("\n")
    raw = code.split("\n")
    hl = highlight_lines(code)
    assert len(hl) == len(raw), (len(hl), len(raw))
    cols = split_columns(raw, LINES_PER_COL)
    pages = [cols[i:i + 2] for i in range(0, len(cols), 2)]
    out = []
    for k, page in enumerate(pages, 1):
        pres = "".join("<pre>" + "\n".join(hl[a:b]) + "</pre>" for a, b in page)
        out.append(
            '<section class="slide annexe"><div class="head">'
            f'<h1>Annexe · code R utilisé (analyse_projet.R)</h1>'
            f'<div class="chip">A{k}</div></div>'
            f'<div class="code">{pres}</div>'
            f'<div class="pageno">A{k} / A{len(pages)}</div></section>')
    return "\n".join(out)


def main():
    page = SRC.read_text(encoding="utf-8")
    page = page.replace("CHECK", CHECK).replace("<!--ANNEXE-->", annexe_html())
    OUT_HTML.write_text(page, encoding="utf-8")
    shots = sys.argv[1] if len(sys.argv) > 1 else ""
    subprocess.run(["node", str(ROOT / "soutenance" / "print.js"),
                    str(OUT_HTML), str(OUT_PDF), shots], check=True)
    print("PDF :", OUT_PDF)
    body = markdown.markdown(NOTES_MD.read_text(encoding="utf-8"),
                             extensions=["tables"])
    NOTES_HTML.write_text(
        '<!doctype html><html lang="fr"><head><meta charset="utf-8">'
        f'<title>Notes d’oral · Trinôme 11</title><style>{NOTES_CSS}</style>'
        f'</head><body>{body}</body></html>', encoding="utf-8")
    subprocess.run(["node", str(ROOT / "soutenance" / "print.js"),
                    str(NOTES_HTML), str(NOTES_PDF), "a4"], check=True)
    print("PDF :", NOTES_PDF)


if __name__ == "__main__":
    main()
