// Génère slides/presentation_trinome11.pptx : support complet (titre + 13 transparents + annexe)
// Style sobre : fond blanc, gris anthracite, un seul accent bleu ardoise.
// Usage : node slides/build_slides.js   (nécessite pptxgenjs)
// Les « … » et cadres gris sont à remplacer par nos propres résultats R.
const path = require("path");
const pptxgen = require("pptxgenjs");

const OUT = path.join(__dirname, "presentation_trinome11.pptx");

const THEME = {
  name: "Sobre",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "222222", lt1: "FFFFFF", dk2: "2F3E52", lt2: "F3F4F6",
    accent1: "2F4A6D", accent2: "6B7280", accent3: "9CA3AF",
    accent4: "D1D5DB", accent5: "4B5563", accent6: "1F2937",
    hlink: "2F4A6D", folHlink: "4B5563",
  },
};

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
  pres.title = "Trinôme 11 – Performance des joueurs d'esport";
  pres.author = "BERTIN, GUIHARD, CHEBREK";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;
  const INK = C.text1, MUTED = C.accent2, ACC = C.accent1, SOFT = C.background2, LINE = "D1D5DB";

  // ---------- Layouts ----------
  pres.defineSlideMaster({ title: "TITRE", background: { color: C.background1 }, objects: [] });
  pres.defineSlideMaster({
    title: "CONTENU",
    background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.8,
          fontFace: THEME.headFontFace, fontSize: 34, bold: true, color: INK, valign: "middle", margin: 0 }, text: "" } },
      { line: { x: 0.6, y: 6.85, w: 12.1, h: 0, line: { color: LINE, width: 0.75 } } },
      { text: { text: "Trinôme 11 · Théorie des tests",
          options: { x: 0.6, y: 6.95, w: 8, h: 0.35, fontSize: 12, color: MUTED, margin: 0 } } },
    ],
  });

  let num = 0;
  function newSlide(section, title) {
    const s = pres.addSlide({ masterName: "CONTENU", sectionTitle: section });
    s.addText(title, { placeholder: "title" });
    num += 1;
    s.addText(String(num), { x: 12.2, y: 6.95, w: 0.5, h: 0.35, isTextBox: true, margin: 0,
      fontSize: 14, bold: true, color: INK, align: "right", objectName: "numero" });
    return s;
  }
  // cadre gris clair à remplacer par une sortie R
  function slot(s, x, y, w, h, label, name) {
    s.addText(label, { x, y, w, h, isTextBox: true, objectName: name,
      fill: { color: SOFT }, line: { color: LINE, width: 1, dashType: "dash" },
      fontSize: 14, italic: true, color: MUTED, align: "center", valign: "middle" });
  }
  // bloc « étiquette + contenu »
  function field(s, x, y, w, h, label, value, name, size = 22) {
    s.addText(label.toUpperCase(), { x, y, w, h: 0.3, isTextBox: true, margin: 0,
      fontSize: 12, bold: true, charSpacing: 1, color: ACC, objectName: name + "_etiquette" });
    s.addText(value, { x, y: y + 0.3, w, h: h - 0.3, isTextBox: true, margin: 0,
      fontSize: size, color: INK, valign: "top", objectName: name });
  }

  // =====================================================================
  // PAGE DE TITRE (non numérotée)
  // =====================================================================
  pres.addSection({ title: "Titre" });
  let s = pres.addSlide({ masterName: "TITRE", sectionTitle: "Titre" });
  s.addText("Théorie des tests · Projet · Groupe 11", { x: 0.9, y: 1.1, w: 11, h: 0.45, isTextBox: true, margin: 0,
    fontSize: 18, color: MUTED });
  s.addText("Sommeil, caféine, écran : qu'est-ce qui fait la performance d'un joueur d'esport ?", {
    x: 0.9, y: 1.75, w: 11.2, h: 1.9, isTextBox: true, margin: 0, fontSize: 40, bold: true, color: INK, valign: "top" });
  s.addText("Étude de liaisons statistiques sur un échantillon de 150 joueurs", {
    x: 0.9, y: 3.75, w: 11, h: 0.5, isTextBox: true, margin: 0, fontSize: 24, color: ACC });
  s.addShape(pres.shapes.LINE, { x: 0.9, y: 4.75, w: 2.0, h: 0, line: { color: INK, width: 1.5 } });
  s.addText([
    { text: "Joseph BERTIN  ·  Thibault GUIHARD  ·  Adam CHEBREK", options: { fontSize: 24, bold: true, color: INK, breakLine: true } },
    { text: "TSE · Master of Science A1, Économie, Mathématiques et Data Science (magistère) · 2026-2027",
      options: { fontSize: 16, color: MUTED } },
  ], { x: 0.9, y: 5.0, w: 11.6, h: 1.1, isTextBox: true, margin: 0, paraSpaceAfter: 6 });
  s.addNotes("Page de titre (non numérotée). Présentation rapide du groupe et du sujet.");

  // =====================================================================
  // 1. INTRODUCTION
  // =====================================================================
  pres.addSection({ title: "Introduction" });
  s = newSlide("Introduction", "Introduction");
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.35, w: 12.1, h: 0.9, fill: { color: SOFT }, line: { color: SOFT }, objectName: "problematique_fond" });
  s.addText([
    { text: "Problématique : ", options: { bold: true, color: ACC } },
    { text: "quels facteurs sont liés à la performance des joueurs d'esport ?", options: { color: INK } },
  ], { x: 0.85, y: 1.35, w: 11.6, h: 0.9, isTextBox: true, margin: 0, fontSize: 24,
    valign: "middle", objectName: "problematique" });

  const rows = [
    ["Contexte", "esport : des matchs qui se jouent à quelques ms"],
    ["Source", "Kaggle · données partiellement simulées"],
    ["Population", "joueurs d'esport"],
    ["Performance", "temps de réaction, APM, issue du match"],
    ["Facteurs", "profil, hygiène de vie, écran, physiologie"],
  ];
  rows.forEach(([h, t], i) => {
    s.addText([
      { text: h, options: { bold: true, color: ACC, breakLine: true, fontSize: 14 } },
      { text: t, options: { color: INK, fontSize: 22 } },
    ], { x: 0.6, y: 2.5 + i * 0.85, w: 7.3, h: 0.8, isTextBox: true, margin: 0, valign: "top", objectName: "intro_" + (i + 1) });
  });
  const funnel = [
    ["250 000", "joueurs dans la base Kaggle"],
    ["232 793", "joueurs à données complètes"],
    ["150", "tirés au hasard : notre échantillon"],
  ];
  funnel.forEach(([big, lab], i) => {
    const y = 2.5 + i * 1.4, last = i === 2;
    s.addShape(pres.shapes.RECTANGLE, { x: 8.5, y, w: 4.2, h: 1.15, fill: { color: last ? ACC : SOFT }, line: { color: last ? ACC : SOFT }, objectName: "entonnoir_fond_" + (i + 1) });
    s.addText([
      { text: big, options: { fontSize: 32, bold: true, breakLine: true } },
      { text: lab, options: { fontSize: 16 } },
    ], { x: 8.75, y, w: 3.7, h: 1.15, isTextBox: true, margin: 0, valign: "middle",
      color: last ? C.background1 : INK, objectName: "entonnoir_" + (i + 1) });
    if (!last) s.addText("↓", { x: 10.3, y: y + 1.13, w: 0.6, h: 0.27, isTextBox: true, margin: 0, fontSize: 14, color: MUTED, align: "center" });
  });
  s.addNotes(
    "≈ 1 minute.\n" +
    "- Contexte : en esport, quelques millisecondes de réaction peuvent décider d'un match. On se demande si la performance est liée au mode de vie, aux réglages d'écran ou à l'état physiologique.\n" +
    "- Source : Kaggle, « E-Sports Biometrics & Performance » (Sarvesh Chhetri). Données partiellement simulées : à garder en tête pour la portée des conclusions.\n" +
    "- Performance : temps de réaction (ms), actions par minute (APM), issue du match.\n" +
    "- Facteurs : profil (âge, genre de jeu), hygiène de vie (temps de jeu, sommeil, boissons énergisantes), écran (luminosité, filtre lumière bleue), physiologie (fréquence cardiaque, VFC).\n" +
    "- 12 variables : 9 quantitatives (dont 5 continues), 3 qualitatives.\n" +
    "- Échantillon : 150 joueurs tirés au hasard parmi les 232 793 joueurs à données complètes."
  );

  // =====================================================================
  // 2-4. ÉTUDE UNIVARIÉE
  // =====================================================================
  pres.addSection({ title: "Étude univariée" });

  // 2. performance quantitative
  s = newSlide("Étude univariée", "Univariée : la performance");
  [["Temps de réaction (ms)", 0.6], ["Actions par minute (APM)", 6.85]].forEach(([name, x], k) => {
    const w = 5.85;
    s.addText(name, { x, y: 1.35, w, h: 0.5, isTextBox: true, margin: 0, fontSize: 24, bold: true, color: INK });
    slot(s, x, 1.95, w, 3.3, "Histogramme + boîte à moustaches (sortie R)", "graphique_perf" + (k + 1));
    ["Moyenne", "Médiane", "Écart-type"].forEach((lab, j) => {
      const tw = (w - 0.4) / 3, tx = x + j * (tw + 0.2);
      s.addText([
        { text: "…", options: { fontSize: 28, bold: true, color: INK, breakLine: true } },
        { text: lab, options: { fontSize: 14, color: MUTED } },
      ], { x: tx, y: 5.45, w: tw, h: 1.0, isTextBox: true, margin: 0, align: "center", valign: "middle",
        line: { color: LINE, width: 0.75 }, objectName: `stat_perf${k + 1}_${j + 1}` });
    });
  });
  s.addNotes("≈ 1 minute. Pour chaque variable : forme de la distribution (symétrie, étalement), valeurs atypiques, ordre de grandeur (moyenne, médiane, écart-type).");

  // 3. qualitatives
  s = newSlide("Étude univariée", "Univariée : les variables qualitatives");
  [["Genre de jeu", "4 modalités"], ["Filtre lumière bleue", "oui / non"], ["Issue du match", "victoire / défaite"]].forEach(([name, mods], k) => {
    const w = 3.9, x = 0.6 + k * (w + 0.2);
    s.addText([
      { text: name, options: { fontSize: 24, bold: true, color: INK, breakLine: true } },
      { text: mods, options: { fontSize: 14, color: MUTED } },
    ], { x, y: 1.3, w, h: 0.85, isTextBox: true, margin: 0, valign: "top" });
    slot(s, x, 2.3, w, 3.4, "Diagramme en barres\n(effectifs et %, sortie R)", "graphique_quali" + (k + 1));
    field(s, x, 5.85, w, 0.85, "Répartition", "…", "repartition_" + (k + 1), 20);
  });
  s.addNotes("≈ 1 minute. Répartition de chaque variable (effectifs, %). Les effectifs par groupe serviront à justifier le choix asymptotique / non paramétrique.");

  // 4. facteurs quantitatifs
  s = newSlide("Étude univariée", "Univariée : les facteurs quantitatifs");
  const cols = ["Variable", "Min", "Q1", "Méd.", "Moy.", "Q3", "Max", "ET"];
  const vars = ["Âge (ans)", "Temps de jeu (h)", "Sommeil (h)", "Boissons énergisantes", "Luminosité écran", "Fréq. cardiaque (bpm)", "VFC (score)"];
  const hdr = cols.map((t, j) => ({ text: t, options: { bold: true, color: INK, align: j ? "center" : "left",
    border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 1.5, color: "222222" }, { type: "none" }] } }));
  const body = vars.map(v => [
    { text: v, options: { color: INK, align: "left" } },
    ...cols.slice(1).map(() => ({ text: "…", options: { color: INK, align: "center" } })),
  ]);
  s.addTable([hdr, ...body], {
    x: 0.6, y: 1.35, w: 12.1, colW: [4.1, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.1],
    rowH: 0.56, fontSize: 22, fontFace: THEME.bodyFontFace, valign: "middle",
    border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 0.5, color: LINE }, { type: "none" }],
    margin: [0, 0.1, 0, 0.1], objectName: "tableau_resume",
  });
  field(s, 0.6, 5.95, 12.1, 0.8, "À retenir", "…", "a_retenir");
  s.addNotes("≈ 30 s. Ne commenter que les variables utilisées dans l'étude bivariée ; supprimer les lignes inutiles.");

  // =====================================================================
  // 5-11. LES 7 TESTS DE LIAISON OBLIGATOIRES
  // =====================================================================
  pres.addSection({ title: "Étude bivariée" });
  const tests = [
    { t: "Test 1 · Comparaison de deux moyennes", m: "Student / Welch asymptotique", g: "Boîtes à moustaches par groupe",
      c: "n₁ ≥ 30 et n₂ ≥ 30, échantillons indépendants" },
    { t: "Test 2 · Comparaison de deux populations", m: "Wilcoxon-Mann-Whitney", g: "Boîtes à moustaches par groupe",
      c: "≥ 1 groupe < 30 (sous-échantillon), échantillons indépendants", np: true },
    { t: "Test 3 · Comparaison de plus de deux moyennes", m: "ANOVA (ou Welch) asymptotique", g: "Boîtes à moustaches par groupe",
      c: "chaque groupe ≥ 30, échantillons indépendants", mc: true },
    { t: "Test 4 · Comparaison de plus de deux populations", m: "Kruskal-Wallis", g: "Boîtes à moustaches par groupe",
      c: "≥ 1 groupe < 30 (sous-échantillon), échantillons indépendants", mc: true, np: true },
    { t: "Test 5 · Corrélation linéaire", m: "Pearson asymptotique", g: "Nuage de points (+ droite)",
      c: "n ≥ 30, liaison linéaire" },
    { t: "Test 6 · Corrélation des rangs", m: "Spearman", g: "Nuage de points des rangs",
      c: "liaison monotone" },
    { t: "Test 7 · Indépendance", m: "χ² d'indépendance", g: "Diagramme en barres empilées (profils)",
      c: "effectifs théoriques ≥ 5" },
  ];
  tests.forEach((T, i) => {
    s = newSlide("Étude bivariée", T.t);
    s.addText([
      { text: "Variables : ", options: { color: MUTED } },
      { text: "… / …", options: { bold: true, color: INK } },
      { text: "     Test : ", options: { color: MUTED } },
      { text: T.m, options: { bold: true, color: ACC } },
    ], { x: 0.6, y: 1.2, w: 12.1, h: 0.45, isTextBox: true, margin: 0, fontSize: 20, objectName: "sous_titre" });

    const gh = T.mc ? 3.05 : 4.95;
    slot(s, 0.6, 1.8, 6.1, gh, T.g + " (sortie R)", "graphique");
    if (T.mc) {
      slot(s, 0.6, 1.8 + gh + 0.2, 6.1, 1.7, "Comparaisons multiples\n(paires, p-valeurs ajustées)", "comparaisons_multiples");
    }

    const x = 7.0, w = 5.7;
    field(s, x, 1.8, w, 0.85, "Résumés numériques", "…", "resumes", 20);
    field(s, x, 2.75, w, 1.15, "Hypothèses", "H₀ : …\nH₁ : …", "hypotheses", 20);
    field(s, x, 4.0, w, 0.95, "Conditions de validité", T.c, "conditions", 18);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 5.05, w: 1.9, h: 1.65, fill: { color: SOFT }, line: { color: SOFT }, objectName: "p_valeur_fond" });
    s.addText([
      { text: "P-VALEUR", options: { fontSize: 12, bold: true, charSpacing: 1, color: ACC, breakLine: true } },
      { text: "…", options: { fontSize: 28, bold: true, color: INK } },
    ], { x: x + 0.15, y: 5.05, w: 1.6, h: 1.65, isTextBox: true, margin: 0, valign: "middle", objectName: "p_valeur" });
    field(s, x + 2.1, 5.05, w - 2.1, 1.65, "Conclusion", "…", "conclusion", 20);

    s.addNotes(
      `Test ${i + 1} — ${T.m}. ≈ 1 minute.\n` +
      "À présenter (consignes) : graphique, résumés numériques, hypothèses testées, choix du test et conditions de validité, p-valeur, conclusion précise (dans le contexte, sans rappeler statistique de test ni loi ni règle de décision).\n" +
      (T.np ? "Test non paramétrique : utilisé lorsqu'au moins un groupe a un effectif < 30 → préciser le sous-échantillon utilisé (niveau d'une autre variable qualitative, seuil sur une variable quantitative, ou tirage aléatoire).\n" : "") +
      (T.mc ? "Si le test global est significatif : présenter les comparaisons multiples (méthode d'ajustement, paires significatives).\n" : "") +
      "Remplir les « … » et remplacer les cadres gris par nos sorties R."
    );
  });

  // =====================================================================
  // 12. AUTRES LIAISONS
  // =====================================================================
  pres.addSection({ title: "Synthèse" });
  s = newSlide("Synthèse", "Autres liaisons testées");
  const h2 = ["Variable 1", "Variable 2", "Test", "p-valeur", "Conclusion"].map((t) => ({ text: t, options: { bold: true, color: INK,
    border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 1.5, color: "222222" }, { type: "none" }] } }));
  const b2 = Array.from({ length: 6 }, () => ["…", "…", "…", "…", "…"].map((t) => ({ text: t, options: { color: INK } })));
  s.addTable([h2, ...b2], {
    x: 0.6, y: 1.4, w: 12.1, colW: [2.6, 2.6, 2.4, 1.5, 3.0], rowH: 0.62, fontSize: 22, fontFace: THEME.bodyFontFace,
    valign: "middle", border: [{ type: "none" }, { type: "none" }, { type: "solid", pt: 0.5, color: LINE }, { type: "none" }],
    margin: [0, 0.1, 0, 0.1], objectName: "tableau_autres_liaisons",
  });
  s.addNotes("≈ 1 minute. Liaisons complémentaires utiles pour répondre à la problématique : variable 1 – variable 2, test utilisé, p-valeur, conclusion.");

  // =====================================================================
  // 13. CONCLUSION
  // =====================================================================
  s = newSlide("Synthèse", "Conclusion");
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.35, w: 12.1, h: 0.9, fill: { color: SOFT }, line: { color: SOFT }, objectName: "reponse_fond" });
  s.addText([
    { text: "Réponse à la problématique : ", options: { bold: true, color: ACC } },
    { text: "…", options: { color: INK } },
  ], { x: 0.85, y: 1.35, w: 11.6, h: 0.9, isTextBox: true, margin: 0, fontSize: 24,
    valign: "middle", objectName: "reponse" });
  const bullets = (arr) => arr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1 } }));
  s.addText("Principaux résultats", { x: 0.6, y: 2.55, w: 5.9, h: 0.5, isTextBox: true, margin: 0, fontSize: 24, bold: true, color: INK });
  s.addText(bullets(["…", "…", "…"]), { x: 0.6, y: 3.1, w: 5.9, h: 3.5, isTextBox: true, margin: 0, fontSize: 22, color: INK,
    valign: "top", paraSpaceAfter: 10, objectName: "resultats" });
  s.addShape(pres.shapes.LINE, { x: 6.67, y: 2.6, w: 0, h: 3.9, line: { color: LINE, width: 0.75 } });
  s.addText("Limites", { x: 6.85, y: 2.55, w: 5.85, h: 0.5, isTextBox: true, margin: 0, fontSize: 24, bold: true, color: INK });
  s.addText(bullets(["…", "…", "…"]), { x: 6.85, y: 3.1, w: 5.85, h: 3.5, isTextBox: true, margin: 0, fontSize: 22, color: INK,
    valign: "top", paraSpaceAfter: 10, objectName: "limites" });
  s.addNotes("≈ 1 minute. Synthétiser les principaux résultats, répondre à la problématique, indiquer les limites (données partiellement simulées, taille d'échantillon, liaison ≠ causalité, sous-échantillons des tests non paramétriques…).");

  // =====================================================================
  // ANNEXE (non numérotée) : code R
  // =====================================================================
  pres.addSection({ title: "Annexe" });
  s = pres.addSlide({ masterName: "CONTENU", sectionTitle: "Annexe" });
  s.addText("Annexe : code R", { placeholder: "title" });
  s.addText("# coller ici le code R utilisé", { x: 0.6, y: 1.35, w: 12.1, h: 5.3, isTextBox: true,
    fontFace: "Courier New", fontSize: 12, color: INK, valign: "top", fill: { color: SOFT },
    margin: 10, objectName: "code_R" });
  s.addNotes("Annexe non comptée dans les 13 transparents. Dupliquer la diapositive si le code est long.");

  await pres.writeFile({ fileName: OUT });
  const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
  await applyTheme(OUT, THEME);
  console.log("OK", OUT, "—", num, "transparents numérotés");
})();
