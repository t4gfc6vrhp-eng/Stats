# Stats · Projet Théorie des tests (Trinôme 11)

Projet de Théorie des tests, TSE MSc A1 EMDS, 2026-2027.
Auteurs : BERTIN Joseph, GUIHARD Thibault, CHEBREK Adam.
Problématique : **quels facteurs sont liés à la performance des joueurs d’esport ?**
(données Kaggle « E-Sports Biometrics & Performance », 150 joueurs tirés au hasard).

| Fichier | Contenu |
|---|---|
| `Trinome11_BERTIN_GUIHARD_CHEBREK_soutenance.pdf` | support à déposer sur Moodle : titre, 13 transparents numérotés, annexe de code R |
| `Trinome11_notes_oral.pdf` | répartition des orateurs, texte par transparent, questions probables |
| `Trinome11_intro_univariee.pdf` | introduction + étude univariée seules (titre + 4 transparents) |
| `Trinome11_etude_univariee.pdf` | rapport A4 : tableaux et graphiques des 12 variables, classement des variables clés |
| `etude_univariee.R` | code de l’étude univariée complète (tableaux dans `resultats/`, figures `u_*.svg`) |
| `analyse_projet.R` | tout le code R : descriptif, 7 tests obligatoires, 10 autres tests, graphiques |
| `echantillon_150_complet.csv` | l’échantillon analysé (150 individus, 13 colonnes) |
| `figures/` | graphiques SVG produits par le script R |
| `soutenance/` | source des transparents (`slides.html`), notes (`notes_oral.md`), script de construction |

## Régénérer

```sh
Rscript analyse_projet.R          # résultats dans la console + figures/*.svg
Rscript etude_univariee.R         # tableaux resultats/*.csv + figures/u_*.svg
python3 soutenance/build.py       # PDF du support + PDF des notes
python3 soutenance/build_univariee.py   # PDF intro + univariée, rapport A4
```

`build.py` a besoin de Node + Playwright (Chromium), de Python avec `pygments` et `markdown`, et des polices Inter et JetBrains Mono.
