# Notes pour la soutenance · Trinôme 11

**Format** : 15 min de présentation + 10 min de questions. Chacun parle environ 5 min.
**Support** : `Trinome11_BERTIN_GUIHARD_CHEBREK_soutenance.pdf` (page de titre + 13 transparents numérotés + annexe de code R non comptée). À déposer sur Moodle **au plus tard à minuit la veille**.

## Répartition proposée

| Orateur | Transparents | Contenu | Durée |
|---|---|---|---|
| Joseph BERTIN | titre → 5 | introduction, descriptif (3 pages), test 1 | ≈ 5 min |
| Thibault GUIHARD | 6 → 9 | tests 2, 3, 4, 5 | ≈ 5 min |
| Adam CHEBREK | 10 → 13 | tests 6, 7, tableau, conclusion | ≈ 5 min |

Cette répartition est indicative : vous pouvez l'échanger, tant que chacun parle environ 5 minutes. Entraînez-vous avec un chronomètre : il faut environ 1 min par test.

**Abréviations à connaître** : TR = temps de réaction (ms) · APM = actions par minute · FC = fréquence cardiaque (bpm) · VFC = variabilité de la fréquence cardiaque (HRV, score de 0 à 100) · MOBA = arène de bataille en ligne (LoL, Dota) · FPS = jeu de tir à la première personne · Battle Royale (Fortnite, PUBG) · Combat = jeux de combat (*Fighting*).

---

## Ce qu'il faut dire, transparent par transparent

**Titre (≈ 10 s).** « Bonjour, nous sommes le trinôme 11. Notre projet s'intitule *Dormir, jouer… gagner ?*. »

**1 · Contexte (≈ 1 min).** En esport, la performance se joue à quelques millisecondes près. La base Kaggle « E-Sports Biometrics & Performance » contient 250 000 joueurs (232 793 sans donnée manquante). Les données sont partiellement simulées. Nous avons tiré 150 joueurs au hasard parmi les individus complets. Nous avons 12 variables, réparties en 4 familles de facteurs et 3 indicateurs de performance. Problématique : quels facteurs sont liés à la performance ?

**2 · Descriptif : performance (≈ 50 s).** Le TR est quasi symétrique, centré autour de 265 ms, avec une seule valeur extrême (344 ms). L'APM est très dispersé (de 75 à 400) et semble bimodal, ce qui fait penser à un effet du genre de jeu (test 4). Les issues sont équilibrées : 52 % de défaites et 48 % de victoires.

**3 · Descriptif : hygiène de vie (≈ 50 s).** En moyenne, les joueurs dorment 6,5 h et 38 % dorment moins de 6 h. Le temps de jeu est très asymétrique : 27 joueurs sont au plancher de 0,5 h et quelques-uns jouent 11 à 12 h. C'est pour cela que nous l'avons **découpé en 3 classes** (≤ 1 h, 1–3 h, > 3 h), chacune avec au moins 30 joueurs. La consommation de boissons énergisantes est une variable discrète de 0 à 4, et 47 % des joueurs n'en boivent pas.

**4 · Descriptif : profil, écran, physiologie (≈ 50 s).** MOBA et FPS représentent 81 % des joueurs. Battle Royale (15) et Combat (14) ont **moins de 30 joueurs**, ce qui impose des tests non paramétriques. Un tiers des joueurs utilise un filtre lumière bleue. La FC moyenne est de 84 bpm. Pour la suite : l'âge va de 16 à 33 ans et la VFC est plafonnée à 100 (16 joueurs).

**5 · Test 1, Pearson (≈ 1 min 10).** Deux variables quantitatives continues et n = 150 ≥ 30 : le test asymptotique ne demande aucune hypothèse de normalité. r = −0,30 et p = 2,4·10⁻⁴ < 5 %, donc on rejette H₀. La liaison linéaire est négative et modérée : chaque heure de sommeil en plus correspond à environ 3,7 ms de TR en moins.

**6 · Test 2, ANOVA de Welch (≈ 1 min 10).** 3 groupes indépendants, tous ≥ 30, et des variances non supposées égales (écarts-types de 16, 15 et 22 ms) : on utilise l'ANOVA de Welch asymptotique. p = 2,7·10⁻⁶, donc on rejette H₀. Les comparaisons multiples (tests de Welch 2 à 2, correction de Bonferroni) montrent que seule la classe > 3 h diffère des deux autres (p = 2·10⁻⁶ et 2·10⁻⁴). En revanche, ≤ 1 h et 1–3 h ne diffèrent pas (p = 0,19). Au-delà de 3 h de jeu, le TR est plus lent de 16 à 22 ms en moyenne.

**7 · Test 3, Spearman (≈ 1 min).** Le nombre de boissons est une variable ordinale discrète avec beaucoup d'ex-æquo, donc on travaille sur les rangs (corrélation de Spearman, approximation asymptotique). ρₛ = 0,48 et p = 4·10⁻¹⁰ : la liaison croissante est significative. La FC médiane passe de 80 bpm sans boisson à 93 bpm à partir de 3 boissons. Sur le graphique, 3 et 4 boissons sont regroupés (une seule personne en boit 4), mais le test porte sur les valeurs brutes.

**8 · Test 4, Kruskal-Wallis (≈ 1 min 10).** 4 groupes indépendants, dont deux de moins de 30 joueurs : on utilise le test non paramétrique de Kruskal-Wallis. p ≈ 4·10⁻²³, donc on rejette H₀. Les comparaisons multiples (Wilcoxon 2 à 2, Bonferroni) montrent que **les 6 paires diffèrent** (p ajustées ≤ 0,02). Classement des médianes : Combat (300) > MOBA (252) > FPS (146) > Battle Royale (112). Conséquence : on ne peut comparer l'APM de deux joueurs que s'ils jouent au même genre.

**9 · Test 5, Wilcoxon-Mann-Whitney (≈ 1 min).** Nous nous restreignons aux joueurs de FPS, le genre où les réflexes comptent le plus. Cela neutralise aussi l'effet du genre. Seuls 13 d'entre eux utilisent le filtre (moins de 30), d'où un test non paramétrique. Comme il y a des ex-æquo, R utilise l'approximation normale avec correction de continuité. p = 0,84 : on ne rejette pas H₀ et aucune différence n'est détectée (médianes de 265 et 261 ms).

**10 · Test 6, Student-Welch (≈ 1 min).** Deux groupes de 78 et 72 joueurs, tous deux ≥ 30, donc test asymptotique, sans supposer les variances égales. L'écart entre les moyennes n'est que de 2,5 ms. p = 0,44 : on ne rejette pas H₀. **Résultat clé** : réagir vite ne suffit pas pour gagner.

**11 · Test 7, χ² d'indépendance (≈ 1 min).** Tous les effectifs théoriques sont ≥ 5 (minimum 6,7), donc le test est valide. Le taux de victoire va de 43 % (FPS) à 57 % (Combat). p = 0,73 : on ne rejette pas l'indépendance. Le taux de victoire reste proche de 50 % quel que soit le genre, ce qui est logique puisque chaque match a un gagnant et un perdant.

**12 · Autres liaisons (≈ 1 min).** Lire les lignes en deux blocs.
- **Liaisons significatives** : l'âge est lié à un TR plus lent, une VFC élevée à un TR plus rapide, et le sommeil à une meilleure VFC. Les longues sessions sont liées à une VFC plus faible, et une FC élevée à plus d'APM.
- **Aucune liaison** : boissons et TR, luminosité de l'écran et TR, genre et TR, APM et issue, filtre et issue.

**13 · Conclusion (≈ 1 min 15).** Lire les 4 lignes, puis les limites, puis la phrase-réponse : *les réflexes se jouent aussi hors de l'écran (sommeil, durée de jeu), mais la victoire dépend d'autres facteurs (adversaire, équipe, niveau…)*.

---

## Questions probables et éléments de réponse

**Pourquoi des tests « asymptotiques » et pas de test de normalité ?**
C'est la consigne. Avec n ≥ 30 par groupe, le théorème central limite assure que la statistique de test (Student-Welch, ANOVA de Welch, Pearson) suit approximativement sa loi sous H₀, sans hypothèse de normalité des variables.

**Pourquoi Welch plutôt que Student « classique » ?**
Welch ne suppose pas l'égalité des variances. Si les variances sont égales, il perd très peu ; si elles diffèrent, il reste valide. Au test 2, les écarts-types vont de 15 à 22 ms.

**Pourquoi ces seuils de 1 h et 3 h pour le temps de jeu ?**
Ils donnent des classes interprétables (session courte, moyenne, longue) avec au moins 30 joueurs chacune (42, 61 et 47), ce qu'exige l'ANOVA asymptotique. Le résultat ne dépend pas de ce découpage : sur les données brutes, Pearson donne r = 0,51 (p = 3·10⁻¹¹) et Spearman ρₛ = 0,41 (p = 2·10⁻⁷).

**Que signifie « H₀ non rejetée » ?**
Cela ne prouve pas que H₀ est vraie : les données ne permettent simplement pas de conclure à une différence. Ordre de grandeur pour le test 6 : avec environ 75 joueurs par groupe et σ ≈ 19,5 ms, le test détecte un écart d'environ 9 ms avec une puissance de 80 %. L'écart observé (2,5 ms) est bien en dessous.

**17 tests au seuil de 5 % : ne risque-t-on pas des faux positifs ?**
Si, environ 1 test sur 20 conclurait à tort si toutes les H₀ étaient vraies. Mais toutes nos p-valeurs significatives sont inférieures à 0,001 (la plus grande vaut 8·10⁻⁴). Elles restent donc significatives même avec une correction de Bonferroni globale (5 % / 17 ≈ 0,003).

**Pourquoi Bonferroni pour les comparaisons multiples ?**
Il contrôle le risque global de première espèce en divisant α par le nombre de comparaisons (3 au test 2, 6 au test 4). Il est conservateur ; la méthode de Holm serait un peu plus puissante, mais les conclusions seraient identiques ici.

**Que teste exactement Kruskal-Wallis ou Mann-Whitney ?**
H₀ : les distributions sont identiques dans tous les groupes. L'alternative est qu'au moins une distribution est décalée (dominance stochastique). On parle de médianes seulement si les lois ont la même forme.

**Pourquoi Spearman et pas Pearson pour boissons et FC ?**
La variable boissons ne prend que 5 valeurs (0 à 4), avec énormément d'ex-æquo et une forte asymétrie. On cherche une liaison monotone, pas forcément linéaire : le coefficient de rangs est adapté.

**Corrélation ou causalité ? Et les facteurs de confusion ?**
Ce ne sont que des liaisons. Par exemple, l'âge pourrait jouer à la fois sur le sommeil et sur le TR. Pour aller plus loin (hors programme) : dans une régression multiple du TR sur sommeil, temps de jeu, âge et VFC, le sommeil, le temps de jeu et l'âge restent significatifs (p < 0,001). La VFC ne l'est plus (p = 0,40) : son effet passe probablement par le sommeil et le temps de jeu.

**Pourquoi l'issue du match n'est-elle liée à rien ?**
Une victoire dépend surtout de l'adversaire, de l'équipe et du niveau, des variables absentes de la base. Les données étant partiellement simulées, l'issue a peut-être aussi été générée indépendamment des autres variables. C'est un point d'esprit critique à mentionner.

**Quels indices montrent que les données sont simulées ?**
Le temps de jeu ne descend jamais sous 0,5 h (27 joueurs exactement à 0,5 h) et plafonne à 12 h. La VFC plafonne à 100 (16 joueurs). Les relations sont « propres », alors que l'issue du match semble aléatoire.

**L'échantillon est-il représentatif ?**
Il a été tiré au hasard, mais seulement parmi les individus complets (93 % de la base). Si les données manquantes ne sont pas aléatoires, cela peut introduire un biais. Avec 150 joueurs, les petits genres restent peu représentés (14 et 15 joueurs).

**Pourquoi le χ² filtre × issue (tableau) est-il corrigé ?**
Pour un tableau 2×2, R applique par défaut la correction de continuité de Yates (`chisq.test`). Les effectifs théoriques sont tous ≥ 23.

**Comment lire une p-valeur ?**
C'est la probabilité, si H₀ est vraie, d'observer une statistique au moins aussi extrême que celle obtenue. Si p < 5 %, on rejette H₀ au seuil de 5 %.
