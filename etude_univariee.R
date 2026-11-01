##############################################################################
# Projet Théorie des tests — Trinôme 11 (BERTIN · GUIHARD · CHEBREK)
# Étude descriptive univariée complète des 12 variables de l'échantillon
# Sorties : resultats/*.csv (tableaux) et figures/u_*.svg (graphiques)
##############################################################################

## 1. Données ----------------------------------------------------------------
d <- read.csv2("echantillon_150_complet.csv", stringsAsFactors = TRUE)
d$Game_Genre <- factor(d$Game_Genre,
                       levels = c("MOBA", "FPS", "Battle Royale", "Fighting"))
d$Match_Outcome <- factor(d$Match_Outcome, levels = c("Loss", "Win"))
dir.create("resultats", showWarnings = FALSE)
dir.create("figures", showWarnings = FALSE)

quanti <- c(Reaction_Time_ms  = "Temps de réaction (ms)",
            APM               = "APM (actions par minute)",
            Sleep_Hours       = "Sommeil (heures)",
            PlayTime_Hours    = "Temps de jeu (heures)",
            Energy_Drinks     = "Boissons énergisantes (nombre)",
            Heart_Rate_BPM    = "Fréquence cardiaque (bpm)",
            HRV_Score         = "VFC (score sur 100)",
            Age               = "Âge (années)",
            Screen_Brightness = "Luminosité de l'écran (%)")
quali <- c(Game_Genre        = "Genre de jeu",
           Blue_Light_Filter = "Filtre lumière bleue",
           Match_Outcome     = "Issue du match")

## 2. Variables quantitatives : résumé numérique -----------------------------
asymetrie <- function(x) mean((x - mean(x))^3) / sd(x)^3
atypiques <- function(x) {                 # règle des 1,5 x écart interquartile
  q <- quantile(x, c(0.25, 0.75)); e <- diff(q)
  sum(x < q[1] - 1.5 * e | x > q[2] + 1.5 * e)
}
resume <- function(x) c(n = length(x), moyenne = mean(x), ecart_type = sd(x),
                        min = min(x), q1 = unname(quantile(x, 0.25)),
                        mediane = median(x), q3 = unname(quantile(x, 0.75)),
                        max = max(x), asymetrie = asymetrie(x),
                        atypiques = atypiques(x),
                        au_min = sum(x == min(x)), au_max = sum(x == max(x)))
tab_quanti <- data.frame(variable = names(quanti), libelle = quanti,
                         t(sapply(d[names(quanti)], resume)), row.names = NULL)
print(tab_quanti, digits = 3)
write.csv(tab_quanti, "resultats/univarie_quanti.csv", row.names = FALSE)

## 3. Variables qualitatives (et boissons, discrète) : effectifs -------------
freq <- function(v) {
  n <- table(d[[v]])
  data.frame(variable = v, modalite = names(n), effectif = as.vector(n),
             pourcentage = round(100 * as.vector(n) / sum(n), 1))
}
tab_quali <- do.call(rbind, lapply(c(names(quali), "Energy_Drinks"), freq))
print(tab_quali)
write.csv(tab_quali, "resultats/univarie_quali.csv", row.names = FALSE)

# Repères utiles pour l'interprétation
mean(d$Sleep_Hours < 6)                    # part des joueurs dormant < 6 h
mean(d$PlayTime_Hours > 3)                 # part des sessions de plus de 3 h
table(cut(d$PlayTime_Hours, c(0, 1, 3, Inf)))   # classes pour l'ANOVA

## 4. Graphiques : histogramme + boîte à moustaches, diagrammes en barres ---
library(ggplot2)
options(OutDec = ",")
bleu <- "#2a78d6"; bleu_clair <- "#cde2fb"; orange <- "#eb6834"
encre <- "#0f172a"; gris <- "#475569"; grille <- "#e5e7eb"
theme_set(theme_minimal(base_size = 9, base_family = "Inter") +
  theme(panel.grid.minor = element_blank(),
        panel.grid.major.x = element_blank(),
        panel.grid.major.y = element_line(colour = grille, linewidth = 0.3),
        axis.text = element_text(colour = gris, size = 8),
        axis.title = element_text(colour = gris, size = 8),
        plot.margin = margin(4, 6, 2, 2)))
L <- 232; H <- 170                         # en pixels (96 px = 1 pouce)
sauve <- function(p, nom) ggsave(file.path("figures", paste0(nom, ".svg")),
                                 p, width = L / 96, height = H / 96)
pas <- c(Reaction_Time_ms = 10, APM = 25, Sleep_Hours = 0.5,
         PlayTime_Hours = 0.5, Heart_Rate_BPM = 5, HRV_Score = 2.5,
         Age = 1, Screen_Brightness = 5)

# Histogramme avec, en dessous, la boîte à moustaches (losange = moyenne)
for (v in names(pas)) {
  h <- max(hist(d[[v]], breaks = seq(floor(min(d[[v]]) / pas[v]) * pas[v],
                                     max(d[[v]]) + pas[v], pas[v]),
                plot = FALSE, right = FALSE)$counts)
  p <- ggplot(d, aes(.data[[v]])) +
    geom_histogram(binwidth = pas[v], boundary = 0, closed = "left",
                   fill = bleu, colour = "white", linewidth = 0.3) +
    geom_boxplot(aes(y = -0.16 * h), width = 0.13 * h, orientation = "y",
                 fill = bleu_clair, colour = bleu, linewidth = 0.4,
                 outlier.size = 0.9, outlier.colour = orange) +
    annotate("point", x = mean(d[[v]]), y = -0.16 * h, shape = 23, size = 1.8,
             fill = orange, colour = "white", stroke = 0.4) +
    scale_y_continuous(breaks = function(l) pretty(c(0, l[2]))) +
    labs(x = quanti[v], y = "Effectif")
  sauve(p, paste0("u_", v))
}

# Diagrammes en barres (effectif au-dessus, pourcentage dans l'étiquette)
barres <- function(v, noms, lab) {
  n <- table(d[[v]])
  df <- data.frame(m = factor(names(n), levels = names(n)), n = as.vector(n))
  ggplot(df, aes(m, n)) + geom_col(fill = bleu, width = 0.6) +
    geom_text(aes(label = paste0(n, "\n", round(100 * n / sum(n)), " %")),
              vjust = -0.25, lineheight = 0.9, size = 8 / .pt, family = "Inter", colour = encre) +
    scale_x_discrete(labels = noms) +
    scale_y_continuous(expand = expansion(mult = c(0, 0.32))) +
    labs(x = lab, y = "Effectif")
}
sauve(barres("Energy_Drinks", 0:4, quanti["Energy_Drinks"]), "u_Energy_Drinks")
sauve(barres("Game_Genre", c("MOBA", "FPS", "B. Royale", "Combat"),
             quali["Game_Genre"]), "u_Game_Genre")
sauve(barres("Blue_Light_Filter", c("Sans filtre", "Avec filtre"),
             quali["Blue_Light_Filter"]), "u_Blue_Light_Filter")
sauve(barres("Match_Outcome", c("Défaite", "Victoire"),
             quali["Match_Outcome"]), "u_Match_Outcome")
