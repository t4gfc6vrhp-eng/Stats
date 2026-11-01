# Introduction et étude univariée · Trinôme 11

<p class="lead">Joseph BERTIN · Thibault GUIHARD · Adam CHEBREK — Projet de Théorie des tests, TSE MSc A1 EMDS, 2026-2027. Les chiffres viennent du script <code>etude_univariee.R</code>.</p>

## 1. Introduction (transparent 1)

- **Contexte** : en esport, la victoire se joue souvent à quelques millisecondes. On cherche ce qui distingue un joueur performant.
- **Source des données** : Kaggle, « E-Sports Biometrics & Performance », publié par Sarvesh Chhetri. Ce sont des données **partiellement simulées**.
- **Problématique** : *quels facteurs sont liés à la performance des joueurs d'esport ?* On mesure la performance par le temps de réaction, l'APM (actions par minute) et l'issue du match. Les facteurs étudiés sont le profil (âge, genre de jeu), l'hygiène de vie (sommeil, temps de jeu, boissons énergisantes), les réglages d'écran (luminosité, filtre lumière bleue) et l'état physiologique (fréquence cardiaque, VFC).
- **Population étudiée** : les joueurs d'esport. La base en contient 250 000, dont 232 793 sans valeur manquante.
- **Échantillon** : 150 joueurs tirés au hasard parmi les individus complets, donc aucune donnée manquante. On dispose de 12 variables : 9 quantitatives (dont 5 continues) et 3 qualitatives.

## 2. Variables quantitatives

{{TABLE_QUANTI}}

*σ : écart-type. Asym. : coefficient d'asymétrie (0 = symétrique, > 0 = étalé à droite). Atyp. : nombre de valeurs hors de [Q1 − 1,5 × EIQ ; Q3 + 1,5 × EIQ].*

{{FIGS_QUANTI}}

*Chaque graphique montre un histogramme et, en dessous, la boîte à moustaches : le losange orange est la moyenne et les points orange sont les valeurs atypiques.*

### Lecture variable par variable

- **Temps de réaction** : la distribution est presque symétrique autour de 265 ms (moyenne 265,3, médiane 264,9, σ = 19,5). Il y a une seule valeur atypique (344 ms), sans excès. C'est la variable idéale pour les tests de moyennes et de corrélation.
- **APM** : la dispersion est très forte (σ = 78 pour une moyenne de 207, soit un coefficient de variation de 38 %, de 75 à 400). La distribution a deux bosses (vers 125 et vers 240). On peut soupçonner un mélange de populations, et le genre de jeu en est l'explication probable.
- **Sommeil** : la distribution est symétrique (asymétrie −0,03) et ne compte aucune valeur atypique. La moyenne est de 6,5 h (σ = 1,6) et **38 % des joueurs dorment moins de 6 h**.
- **Temps de jeu** : la distribution est **très asymétrique** (asymétrie 2,0, médiane 2,1 h < moyenne 2,6 h), avec 7 valeurs atypiques entre 10,9 et 12 h. Il y a un plancher artificiel à 0,5 h (27 joueurs, 18 %) et un plafond à 12 h. On la découpe en 3 classes pour les tests : ≤ 1 h (42 joueurs), 1 à 3 h (61), > 3 h (47).
- **Boissons énergisantes** : la variable est discrète (0 à 4) et se traite comme une variable ordinale. 47 % des joueurs n'en boivent pas et un seul en boit 4.
- **Fréquence cardiaque** : la distribution est symétrique (moyenne 84 bpm, σ = 10, de 60 à 110), avec 5 joueurs au plancher de 60 bpm.
- **VFC** : la distribution est étalée à gauche (asymétrie −0,67). Il y a un **plafond à 100** (16 joueurs, 11 %), ce qui écrase le haut de la distribution.
- **Âge** : les joueurs ont de 16 à 33 ans (médiane 23 ans). La distribution est légèrement étalée à droite, avec 2 valeurs atypiques (33 ans).
- **Luminosité de l'écran** : la répartition est presque uniforme entre 10 et 100 % (σ = 28,8, proche de l'écart-type d'une loi uniforme, ≈ 26). Aucun profil particulier ne se dégage.

## 3. Variables qualitatives

{{TABLE_QUALI}}

{{FIGS_QUALI}}

- **Genre de jeu** : 4 modalités nominales. MOBA et FPS regroupent 81 % des joueurs. **Battle Royale (15) et Combat (14) ont moins de 30 joueurs**, ce qui impose des tests non paramétriques (Kruskal-Wallis, Wilcoxon-Mann-Whitney) dès qu'on compare les genres.
- **Filtre lumière bleue** : 2 modalités déséquilibrées (32 % des joueurs l'utilisent).
- **Issue du match** : 2 modalités presque équilibrées (52 % de défaites, 48 % de victoires), ce qui est idéal pour les comparaisons de groupes et le χ².

## 4. Points d'attention pour la suite

1. **Données partiellement simulées** : on observe des bornes artificielles (temps de jeu ≥ 0,5 h et ≤ 12 h, VFC ≤ 100, FC ≥ 60). C'est à signaler dans les limites.
2. **Temps de jeu** : il est trop asymétrique pour être utilisé tel quel. On le discrétise (classes ≥ 30 joueurs) ou on l'étudie avec des tests de rangs (Spearman).
3. **Petits effectifs** : Battle Royale, Combat et les joueurs à 3 ou 4 boissons forment de petits groupes. Il faut des tests non paramétriques ou des regroupements.
4. **APM** : sa bimodalité laisse penser qu'il faut toujours le comparer à genre égal.

## 5. Les variables les plus importantes selon nous

| Rang | Variable | Rôle | Pourquoi elle compte |
|---|---|---|---|
| 1 | **Temps de réaction** | performance | Indicateur central, continu, symétrique et presque sans valeur atypique : la meilleure variable à expliquer. |
| 2 | **Temps de jeu** | hygiène de vie | Facteur le plus lié au temps de réaction (r = 0,51). Sa discrétisation donne la variable à 3 classes pour l'ANOVA. |
| 3 | **Sommeil** | hygiène de vie | Continu, parfaitement symétrique, sans valeur atypique : parfait pour Pearson. Il est lié au temps de réaction (r = −0,30) et à la VFC. |
| 4 | **Genre de jeu** | profil | Seule variable qualitative à plus de 2 modalités, avec des groupes < 30 (Kruskal-Wallis). Elle explique presque toute la dispersion de l'APM. |
| 5 | **Issue du match** | performance | Variable binaire équilibrée : c'est la performance « finale », utile pour le test de Welch et le χ². |
| 6 | APM | performance | Deuxième indicateur de performance, mais il dépend surtout du genre. |
| 7 | Boissons énergisantes | hygiène de vie | Variable ordinale (Spearman), nettement liée à la fréquence cardiaque. |
| 8 | Fréquence cardiaque | physiologie | Symétrique ; liée aux boissons et à l'APM. |
| 9 | Âge | profil | Lié au temps de réaction (r = 0,40) : facteur de confusion possible, à citer dans le tableau. |
| 10 | VFC | physiologie | Utile, mais l'effet plafond à 100 fragilise son analyse. |
| 11 | Filtre lumière bleue | écran | Binaire déséquilibrée, aucune liaison détectée. |
| 12 | Luminosité | écran | Presque uniforme et liée à rien : la moins utile. |

**Pour la présentation (2 à 3 transparents de 1 min)**, nous recommandons de montrer les variables qui servent aux 7 tests obligatoires :

- **transparent 2, la performance** : temps de réaction, APM, issue du match ;
- **transparent 3, l'hygiène de vie** : sommeil, temps de jeu, boissons ;
- **transparent 4, le profil et la physiologie** : genre de jeu, filtre lumière bleue, fréquence cardiaque.

Âge, VFC et luminosité peuvent se résumer en une ligne, puisqu'elles n'apparaissent que dans le tableau des autres tests.
