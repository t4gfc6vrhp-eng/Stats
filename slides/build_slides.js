// Génère slides/presentation_trinome11.pptx (page de titre + transparents 1 à 4)
// Usage : node slides/build_slides.js   (nécessite pptxgenjs, react, react-dom, react-icons, sharp)
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa6");

const OUT = path.join(__dirname, "presentation_trinome11.pptx");

const THEME = {
  name: "Esport Neon",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "14142B", lt1: "FFFFFF", dk2: "1B1F3B", lt2: "EEF0FA",
    accent1: "6C4DF6", accent2: "00A99D", accent3: "FF4F79",
    accent4: "FFB020", accent5: "6B7194", accent6: "2E3360",
    hlink: "6C4DF6", folHlink: "2E3360",
  },
};
const H = THEME.colors;

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = "Trinôme 11 – Performance des joueurs d'esport";
  pres.author = "BERTIN, GUIHARD, CHEBREK";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  // ---------- Layouts ----------
  pres.defineSlideMaster({
    title: "TITRE",
    background: { color: C.text2 },
    objects: [],
  });
  pres.defineSlideMaster({
    title: "CONTENU",
    background: { color: C.background1 },
    margin: [0.4, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.85,
          fontFace: THEME.headFontFace, fontSize: 36, bold: true, color: C.text2, valign: "middle", margin: 0 },
          text: "" } },
      { text: { text: "Trinôme 11 · Théorie des tests · 2026-2027",
          options: { x: 0.6, y: 6.95, w: 8, h: 0.35, fontSize: 14, color: C.accent5, margin: 0 } } },
    ],
  });

  const I = {
    pad: await icon(fa.FaGamepad, H.accent1),
    padW: await icon(fa.FaGamepad, "FFFFFF"),
    globe: await icon(fa.FaEarthEurope, "FFFFFF"),
    db: await icon(fa.FaDatabase, "FFFFFF"),
    users: await icon(fa.FaUsers, "FFFFFF"),
    vars: await icon(fa.FaTableList, "FFFFFF"),
    clock: await icon(fa.FaStopwatch, "FFFFFF"),
    mouse: await icon(fa.FaComputerMouse, "FFFFFF"),
    layers: await icon(fa.FaLayerGroup, "FFFFFF"),
    eye: await icon(fa.FaEye, "FFFFFF"),
    trophy: await icon(fa.FaTrophy, "FFFFFF"),
    target: await icon(fa.FaBullseye, "FFFFFF"),
  };

  // pastille ronde + icône (motif visuel répété)
  function badge(slide, img, x, y, d, fill, name) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: name + "_rond" });
    const p = d * 0.25;
    slide.addImage({ data: img, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + "_icone" });
  }
  // cadre pointillé à remplacer par une sortie R
  function slot(slide, x, y, w, h, label, name) {
    slide.addText(label, {
      x, y, w, h, isTextBox: true, objectName: name,
      shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.12,
      fill: { color: C.background2 }, line: { color: C.accent5, width: 1.25, dashType: "dash" },
      fontSize: 16, italic: true, color: C.accent5, align: "center", valign: "middle",
    });
  }
  // numéro de transparent (la page de titre n'est pas comptée)
  let num = 0;
  function numero(slide) {
    num += 1;
    slide.addText(String(num), { x: 12.2, y: 6.95, w: 0.5, h: 0.35, isTextBox: true, margin: 0,
      fontSize: 16, bold: true, color: C.accent1, align: "right", objectName: "numero" });
  }
  function card(slide, x, y, w, h, name) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: 0.15, fill: { color: C.background1 }, line: { color: "DDE0F0", width: 1 },
      shadow: { type: "outer", color: "1B1F3B", blur: 8, offset: 2, angle: 90, opacity: 0.12 }, objectName: name,
    });
  }

  // =====================================================================
  // PAGE DE TITRE (non numérotée)
  // =====================================================================
  pres.addSection({ title: "Titre" });
  let s = pres.addSlide({ masterName: "TITRE", sectionTitle: "Titre" });
  s.addImage({ data: I.pad, x: 10.0, y: 1.5, w: 3.0, h: 3.0, transparency: 82, objectName: "manette_fond" });
  s.addText("THÉORIE DES TESTS  ·  PROJET  ·  TRINÔME 11", {
    x: 0.8, y: 1.0, w: 10, h: 0.5, isTextBox: true, margin: 0, fontSize: 18, bold: true, charSpacing: 3, color: C.accent2,
  });
  s.addText("Sommeil, caféine, écran :", {
    x: 0.8, y: 1.75, w: 11, h: 0.9, isTextBox: true, margin: 0, fontFace: THEME.headFontFace, fontSize: 44, bold: true, color: C.background1,
  });
  s.addText("qu'est-ce qui fait la performance d'un joueur d'esport ?", {
    x: 0.8, y: 2.6, w: 9.0, h: 1.5, isTextBox: true, margin: 0, fontFace: THEME.headFontFace, fontSize: 40, bold: true, color: "A99BFF", valign: "top",
  });
  s.addText("Étude de liaisons statistiques sur un échantillon de 150 joueurs", {
    x: 0.8, y: 4.25, w: 11, h: 0.5, isTextBox: true, margin: 0, fontSize: 24, italic: true, color: "C9CCE3",
  });
  s.addText([
    { text: "Joseph BERTIN   ·   Thibault GUIHARD   ·   Adam CHEBREK", options: { bold: true, color: C.background1, breakLine: true } },
    { text: "Groupe 11  —  TSE, Master of Science A1 parcours Économie, Mathématiques et Data Science (magistère)  —  2026-2027",
      options: { fontSize: 16, color: "9EA3C4" } },
  ], { x: 0.8, y: 5.55, w: 11.8, h: 1.1, isTextBox: true, margin: 0, fontSize: 24, paraSpaceAfter: 6 });
  s.addNotes("Page de titre (non numérotée). Se présenter rapidement : groupe 11, noms, sujet : la performance des joueurs d'esport.");

  // =====================================================================
  // 1. INTRODUCTION
  // =====================================================================
  pres.addSection({ title: "Introduction" });
  s = pres.addSlide({ masterName: "CONTENU", sectionTitle: "Introduction" });
  numero(s);
  s.addText("Introduction : contexte et données", { placeholder: "title" });

  // bandeau problématique
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.4, w: 12.1, h: 1.0, rectRadius: 0.15,
    fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: "problematique_fond" });
  badge(s, I.target, 0.8, 1.5, 0.8, C.text2, "problematique");
  s.addText([
    { text: "Problématique : ", options: { bold: true } },
    { text: "quels facteurs sont liés à la performance des joueurs d'esport ?" },
  ], { x: 1.8, y: 1.4, w: 10.8, h: 1.0, isTextBox: true, margin: 0, fontSize: 26, color: C.background1, valign: "middle" });

  // colonne gauche : 4 lignes icône + texte
  const rows = [
    [I.globe, "Contexte", "en esport, tout se joue à la ms"],
    [I.db, "Source", "Kaggle, E-Sports Biometrics & Performance (partiellement simulées)"],
    [I.users, "Population", "joueurs d'esport"],
    [I.vars, "Variables", "9 quantitatives, 3 qualitatives"],
  ];
  rows.forEach(([img, head, txt], i) => {
    const y = 2.75 + i * 1.02;
    badge(s, img, 0.6, y + 0.08, 0.7, i % 2 ? C.accent2 : C.text2, "ligne" + (i + 1));
    s.addText([
      { text: head + " : ", options: { bold: true, color: C.text2 } },
      { text: txt, options: { color: C.text1 } },
    ], { x: 1.5, y, w: 6.4, h: 0.88, isTextBox: true, margin: 0, fontSize: 24, valign: "middle" });
  });

  // colonne droite : entonnoir base → échantillon
  const funnel = [
    ["250 000", "joueurs dans la base", 4.3, C.background2, C.text2],
    ["232 793", "joueurs sans donnée manquante", 4.3, C.background2, C.text2],
    ["150", "joueurs tirés au hasard : notre échantillon", 4.3, C.text2, C.background1],
  ];
  funnel.forEach(([big, lab, w, fill, col], i) => {
    const y = 2.75 + i * 1.36;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.4, y, w, h: 1.12, rectRadius: 0.12,
      fill: { color: fill }, line: { color: fill }, objectName: "entonnoir" + (i + 1) });
    s.addText([
      { text: big, options: { fontSize: 32, bold: true, breakLine: true } },
      { text: lab, options: { fontSize: 16 } },
    ], { x: 8.6, y, w: w - 0.4, h: 1.12, isTextBox: true, margin: 0, color: col, valign: "middle" });
    if (i < 2) s.addText("▼", { x: 10.2, y: y + 1.1, w: 0.7, h: 0.28, isTextBox: true, margin: 0, fontSize: 14, color: C.accent1, align: "center" });
  });
  s.addNotes(
    "≈ 1 minute.\n" +
    "- Contexte : en esport, quelques millisecondes de réaction peuvent décider d'un match ; on se demande si la performance dépend du mode de vie, des réglages d'écran ou de l'état physiologique.\n" +
    "- Source : jeu de données Kaggle « E-Sports Biometrics & Performance » (Sarvesh Chhetri), données partiellement simulées → à garder en tête pour la portée des conclusions.\n" +
    "- Performance mesurée par : temps de réaction, actions par minute (APM), issue du match.\n" +
    "- Facteurs : profil (âge, genre de jeu), hygiène de vie (temps de jeu, sommeil, boissons énergisantes), écran (luminosité, filtre lumière bleue), physiologie (fréquence cardiaque, VFC).\n" +
    "- Population : joueurs d'esport ; base de 250 000 joueurs, échantillon aléatoire de 150 joueurs."
  );

  // =====================================================================
  // 2. UNIVARIÉE — la performance (quantitatives)
  // =====================================================================
  pres.addSection({ title: "Étude univariée" });
  s = pres.addSlide({ masterName: "CONTENU", sectionTitle: "Étude univariée" });
  numero(s);
  s.addText("Étude univariée : la performance", { placeholder: "title" });
  const perf = [
    [I.clock, "Temps de réaction (ms)", C.accent1, 0.6],
    [I.mouse, "Actions par minute (APM)", C.accent2, 6.85],
  ];
  perf.forEach(([img, name, col, x], k) => {
    const w = 5.85;
    card(s, x, 1.4, w, 5.3, "carte_perf" + (k + 1));
    badge(s, img, x + 0.25, 1.6, 0.65, col, "perf" + (k + 1));
    s.addText(name, { x: x + 1.05, y: 1.6, w: w - 1.2, h: 0.65, isTextBox: true, margin: 0, fontSize: 24, bold: true, color: C.text2, valign: "middle" });
    slot(s, x + 0.25, 2.45, w - 0.5, 2.85, "Insérer : histogramme + boîte à moustaches (sortie R)", "graphique_perf" + (k + 1));
    ["Moyenne", "Médiane", "Écart-type"].forEach((lab, j) => {
      const tw = (w - 0.5 - 0.3) / 3, tx = x + 0.25 + j * (tw + 0.15);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 5.5, w: tw, h: 1.0, rectRadius: 0.1,
        fill: { color: C.background2 }, line: { color: C.background2 }, objectName: `stat_perf${k + 1}_${j + 1}` });
      s.addText([
        { text: "…", options: { fontSize: 28, bold: true, color: col, breakLine: true } },
        { text: lab, options: { fontSize: 14, color: C.accent5 } },
      ], { x: tx, y: 5.5, w: tw, h: 1.0, isTextBox: true, margin: 0, align: "center", valign: "middle" });
    });
  });
  s.addNotes(
    "≈ 1 minute. Variables de performance quantitatives (réponses de la problématique).\n" +
    "Pour chaque variable : forme de la distribution (symétrie, étalement), valeurs atypiques éventuelles, ordre de grandeur (moyenne / médiane / écart-type).\n" +
    "Remplacer les « … » et les cadres pointillés par vos sorties R."
  );

  // =====================================================================
  // 3. UNIVARIÉE — les variables qualitatives
  // =====================================================================
  s = pres.addSlide({ masterName: "CONTENU", sectionTitle: "Étude univariée" });
  numero(s);
  s.addText("Étude univariée : les variables qualitatives", { placeholder: "title" });
  const quali = [
    [I.layers, "Genre de jeu", "4 modalités", C.accent1],
    [I.eye, "Lumière bleue", "filtre : oui / non", C.accent2],
    [I.trophy, "Issue du match", "victoire / défaite", C.accent3],
  ];
  quali.forEach(([img, name, mods, col], k) => {
    const w = 3.9, x = 0.6 + k * (w + 0.2);
    card(s, x, 1.4, w, 5.3, "carte_quali" + (k + 1));
    badge(s, img, x + 0.25, 1.6, 0.65, col, "quali" + (k + 1));
    s.addText([
      { text: name, options: { fontSize: 24, bold: true, color: C.text2, breakLine: true } },
      { text: mods, options: { fontSize: 16, color: C.accent5 } },
    ], { x: x + 1.05, y: 1.55, w: w - 1.2, h: 0.8, isTextBox: true, margin: 0, valign: "middle" });
    slot(s, x + 0.25, 2.55, w - 0.5, 3.0, "Insérer : diagramme en barres\n(effectifs et %, sortie R)", "graphique_quali" + (k + 1));
    s.addText([
      { text: "Modalité majoritaire : ", options: { color: C.accent5 } },
      { text: "…", options: { bold: true, color: col } },
    ], { x: x + 0.25, y: 5.75, w: w - 0.5, h: 0.75, isTextBox: true, margin: 0, fontSize: 20, valign: "middle" });
  });
  s.addNotes(
    "≈ 1 minute. Les trois variables qualitatives (toutes utilisées dans l'étude bivariée).\n" +
    "Pour chacune : répartition (effectifs, %), modalité majoritaire, et effectifs par groupe — utile pour justifier ensuite le choix entre tests asymptotiques (groupes ≥ 30) et non paramétriques."
  );

  // =====================================================================
  // 4. UNIVARIÉE — les facteurs quantitatifs (tableau de résumé)
  // =====================================================================
  s = pres.addSlide({ masterName: "CONTENU", sectionTitle: "Étude univariée" });
  numero(s);
  s.addText("Étude univariée : les facteurs quantitatifs", { placeholder: "title" });
  const cols = ["Variable", "Min", "Q1", "Méd.", "Moy.", "Q3", "Max", "ET"];
  const vars = ["Âge (ans)", "Temps de jeu (h)", "Sommeil (h)", "Boissons énergisantes", "Luminosité écran", "Fréq. cardiaque (bpm)", "VFC (score)"];
  const hdr = cols.map((t, j) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 }, align: j ? "center" : "left" } }));
  const body = vars.map((v, i) => [
    { text: v, options: { bold: true, color: C.text2, align: "left", fill: { color: i % 2 ? C.background1 : C.background2 } } },
    ...cols.slice(1).map(() => ({ text: "…", options: { color: C.text1, align: "center", fill: { color: i % 2 ? C.background1 : C.background2 } } })),
  ]);
  s.addTable([hdr, ...body], {
    x: 0.6, y: 1.45, w: 12.1, colW: [4.1, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.1],
    rowH: 0.57, fontSize: 22, fontFace: THEME.bodyFontFace, valign: "middle",
    border: { type: "solid", pt: 0.75, color: "DDE0F0" }, margin: [0, 0.12, 0, 0.12], objectName: "tableau_resume",
  });
  s.addText([
    { text: "À retenir : ", options: { bold: true, color: C.accent1 } },
    { text: "…", options: { color: C.text1 } },
  ], { x: 0.6, y: 6.3, w: 12.1, h: 0.55, isTextBox: true, margin: 0, fontSize: 24, valign: "middle" });
  s.addNotes(
    "≈ 30 s à 1 minute. Tableau de résumé (sortie summary + écart-type) des facteurs explicatifs quantitatifs.\n" +
    "Ne commenter que les variables utilisées dans l'étude bivariée ; signaler les valeurs manquantes éventuelles et les particularités (bornes, valeurs atypiques). Supprimer les lignes inutiles."
  );

  await pres.writeFile({ fileName: OUT });
  const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
  await applyTheme(OUT, THEME);
  console.log("OK", OUT);
})();
