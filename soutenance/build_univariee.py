"""Livrables « introduction + étude univariée ».

1. Trinome11_intro_univariee.pdf : page de titre, introduction et les 3
   transparents descriptifs (extraits de slides.html, mêmes styles).
2. Trinome11_etude_univariee.pdf : rapport A4 complet (tableaux, graphiques
   des 12 variables, points d'attention, classement des variables).

Usage : Rscript analyse_projet.R && Rscript etude_univariee.R
        python3 soutenance/build_univariee.py
"""
import csv
import pathlib
import re
import subprocess

import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOUT = ROOT / "soutenance"
PRINT = str(SOUT / "print.js")


def fr(x, d=1):
    """Nombre au format français (virgule décimale)."""
    return f"{float(x):.{d}f}".replace(".", ",").replace("-", "−")


def deck():
    src = (SOUT / "slides.html").read_text(encoding="utf-8")
    head, body = src.split("<body>", 1)
    sections = re.findall(r"<section class=\"slide.*?</section>", body, re.S)
    keep = sections[:5]                       # titre, intro, 3 pages descriptives
    keep = [s.replace(" / 13</div>", " / 4</div>") for s in keep]
    out = SOUT / "intro_univariee.html"
    out.write_text(head + "<body>\n" + "\n".join(keep) + "\n</body></html>",
                   encoding="utf-8")
    pdf = ROOT / "Trinome11_intro_univariee.pdf"
    subprocess.run(["node", PRINT, str(out), str(pdf)], check=True)
    print("PDF :", pdf)


def rapport():
    q = list(csv.DictReader(open(ROOT / "resultats" / "univarie_quanti.csv",
                                 encoding="utf-8")))
    rows = "".join(
        f"<tr><td>{r['libelle']}</td><td>{fr(r['moyenne'])}</td>"
        f"<td>{fr(r['ecart_type'])}</td><td>{fr(r['min'])}</td>"
        f"<td>{fr(r['q1'])}</td><td>{fr(r['mediane'])}</td>"
        f"<td>{fr(r['q3'])}</td><td>{fr(r['max'])}</td>"
        f"<td>{fr(r['asymetrie'], 2)}</td><td>{int(float(r['atypiques']))}</td></tr>"
        for r in q)
    tab_q = ("<table class='num'><thead><tr><th>Variable (n = 150)</th><th>Moy.</th>"
             "<th>σ</th><th>Min</th><th>Q1</th><th>Méd.</th><th>Q3</th><th>Max</th>"
             "<th>Asym.</th><th>Atyp.</th></tr></thead><tbody>" + rows +
             "</tbody></table>")
    noms = {"Game_Genre": "Genre de jeu", "Blue_Light_Filter": "Filtre lumière bleue",
            "Match_Outcome": "Issue du match", "Energy_Drinks": "Boissons énergisantes"}
    mods = {"Battle Royale": "Battle Royale", "Fighting": "Combat (Fighting)",
            "No": "Sans filtre", "Yes": "Avec filtre", "Loss": "Défaite",
            "Win": "Victoire"}
    ql = list(csv.DictReader(open(ROOT / "resultats" / "univarie_quali.csv",
                                  encoding="utf-8")))
    rows, last = "", None
    for r in ql:
        v = noms[r["variable"]] if r["variable"] != last else ""
        last = r["variable"]
        rows += (f"<tr{' class=first' if v else ''}><td>{v}</td>"
                 f"<td>{mods.get(r['modalite'], r['modalite'])}</td>"
                 f"<td>{r['effectif']}</td><td>{fr(r['pourcentage'])} %</td></tr>")
    tab_ql = ("<table class='num ql'><thead><tr><th>Variable</th><th>Modalité</th>"
              "<th>Effectif</th><th>%</th></tr></thead><tbody>" + rows +
              "</tbody></table>")
    fig = lambda names: "<div class='grid'>" + "".join(
        f"<img src='../figures/u_{n}.svg'>" for n in names) + "</div>"
    figs_q = fig(["Reaction_Time_ms", "APM", "Sleep_Hours", "PlayTime_Hours",
                  "Energy_Drinks", "Heart_Rate_BPM", "HRV_Score", "Age",
                  "Screen_Brightness"])
    figs_ql = fig(["Game_Genre", "Blue_Light_Filter", "Match_Outcome"])
    md = (SOUT / "etude_univariee.md").read_text(encoding="utf-8")
    md = (md.replace("{{TABLE_QUANTI}}", tab_q).replace("{{FIGS_QUANTI}}", figs_q)
            .replace("{{TABLE_QUALI}}", tab_ql).replace("{{FIGS_QUALI}}", figs_ql))
    body = markdown.markdown(md, extensions=["tables", "md_in_html"])
    css = """
body { font-family: 'Inter', sans-serif; color: #0f172a; font-size: 10pt; line-height: 1.5;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1 { font-size: 20pt; letter-spacing: -0.02em; margin: 0 0 4pt; }
h2 { font-size: 13pt; color: #1c5cab; margin: 16pt 0 6pt; padding-top: 6pt;
  border-top: 1px solid #e2e8f0; break-after: avoid; }
h3 { font-size: 10.5pt; margin: 10pt 0 4pt; break-after: avoid; }
p { margin: 0 0 6pt; } ul, ol { margin: 0 0 6pt 16pt; padding: 0; } li { margin: 0 0 3pt; }
table { border-collapse: collapse; width: 100%; margin: 4pt 0 8pt; font-size: 9pt;
  break-inside: avoid; }
th, td { text-align: left; padding: 3pt 6pt; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
th { color: #64748b; border-bottom: 1.5px solid #0f172a; }
table.num td:not(:first-child), table.num th:not(:first-child) { text-align: right;
  font-variant-numeric: tabular-nums; }
table.ql td:nth-child(2), table.ql th:nth-child(2) { text-align: left; }
table.ql tr.first td { border-top: 1.5px solid #94a3b8; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4pt 10pt; margin: 6pt 0 8pt;
  break-inside: avoid; }
.grid img { width: 100%; height: auto; display: block; }
.lead { color: #475569; }
.tier { display: inline-block; font-size: 8pt; font-weight: 700; padding: 1pt 6pt;
  border-radius: 8pt; background: #edf4fd; color: #1c5cab; }
.pb { break-before: page; }
"""
    html_path = SOUT / "etude_univariee.html"
    html_path.write_text(
        "<!doctype html><html lang='fr'><head><meta charset='utf-8'>"
        f"<title>Étude univariée · Trinôme 11</title><style>{css}</style></head>"
        f"<body>{body}</body></html>", encoding="utf-8")
    pdf = ROOT / "Trinome11_etude_univariee.pdf"
    subprocess.run(["node", PRINT, str(html_path), str(pdf), "a4"], check=True)
    print("PDF :", pdf)


if __name__ == "__main__":
    deck()
    rapport()
