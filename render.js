// render.js — Rendu SVG, mode mot, et export

const PALETTES = {
  mono:     ['#2a2620', '#4a4540', '#7a7570'],
  gold:     ['#bf4020', '#c87030', '#a03010'],
  spectrum: ['#bf4020', '#306080', '#5a7040', '#7050a0', '#c87030'],
};

// ── POLICE PIXEL 5×7 (paths dans un espace 0-50 × 0-70) ──────────────────────
// Chaque lettre = tableau de segments [x1,y1,x2,y2,...] ou courbes SVG
const FONT = {
  A: ['M 25 4 L 4 66 M 25 4 L 46 66 M 10 42 L 40 42'],
  B: ['M 8 4 L 8 66 M 8 4 C 38 4 42 16 42 22 C 42 30 34 34 8 34 M 8 34 C 40 34 44 46 44 52 C 44 62 36 66 8 66'],
  C: ['M 44 16 C 36 4 8 4 8 35 C 8 66 36 66 44 54'],
  D: ['M 8 4 L 8 66 M 8 4 C 48 4 50 18 50 35 C 50 52 48 66 8 66'],
  E: ['M 42 4 L 8 4 L 8 66 L 42 66 M 8 35 L 36 35'],
  F: ['M 42 4 L 8 4 L 8 66 M 8 35 L 36 35'],
  G: ['M 44 16 C 36 4 8 4 8 35 C 8 66 36 66 44 54 L 44 36 L 28 36'],
  H: ['M 8 4 L 8 66 M 42 4 L 42 66 M 8 35 L 42 35'],
  I: ['M 25 4 L 25 66 M 12 4 L 38 4 M 12 66 L 38 66'],
  J: ['M 38 4 L 38 54 C 38 66 26 70 12 60'],
  K: ['M 8 4 L 8 66 M 8 35 L 44 4 M 8 35 L 44 66'],
  L: ['M 8 4 L 8 66 L 44 66'],
  M: ['M 8 66 L 8 4 L 25 38 L 42 4 L 42 66'],
  N: ['M 8 66 L 8 4 L 42 66 L 42 4'],
  O: ['M 25 4 C 4 4 4 66 25 66 C 46 66 46 4 25 4'],
  P: ['M 8 4 L 8 66 M 8 4 C 42 4 44 16 44 22 C 44 34 36 38 8 38'],
  Q: ['M 25 4 C 4 4 4 66 25 66 C 46 66 46 4 25 4 M 32 54 L 48 70'],
  R: ['M 8 4 L 8 66 M 8 4 C 42 4 44 16 44 22 C 44 34 36 38 8 38 M 22 38 L 46 66'],
  S: ['M 44 14 C 36 4 8 4 8 22 C 8 36 44 34 44 50 C 44 66 16 68 8 56'],
  T: ['M 25 4 L 25 66 M 4 4 L 46 4'],
  U: ['M 8 4 L 8 52 C 8 68 42 68 42 52 L 42 4'],
  V: ['M 4 4 L 25 66 L 46 4'],
  W: ['M 4 4 L 14 66 L 25 36 L 36 66 L 46 4'],
  X: ['M 8 4 L 42 66 M 42 4 L 8 66'],
  Y: ['M 4 4 L 25 38 L 46 4 M 25 38 L 25 66'],
  Z: ['M 8 4 L 42 4 L 8 66 L 42 66'],
  ' ': [],
};

/**
 * Convertit un mot en tableau de paths SVG (lettres positionnées sur le canvas 500×500)
 */
export function buildWordPaths(word) {
  const letters = word.toUpperCase().split('').filter(c => FONT[c] !== undefined);
  if (!letters.length) return [];

  const maxChars = Math.min(letters.length, 11);
  // Espace de dessin : 460×300, centré sur le canvas 500×500
  const drawW = 460, drawH = 300;
  const letterW = 50, letterH = 70, gap = 6;
  const totalRaw = maxChars * letterW + (maxChars - 1) * gap;
  const scale = Math.min(drawW / totalRaw, drawH / letterH);

  const scaledLetterW = letterW * scale;
  const scaledLetterH = letterH * scale;
  const scaledGap = gap * scale;
  const totalW = maxChars * scaledLetterW + (maxChars - 1) * scaledGap;

  const startX = (500 - totalW) / 2;
  const startY = (500 - scaledLetterH) / 2;

  const paths = [];
  for (let ci = 0; ci < maxChars; ci++) {
    const ch = letters[ci];
    const strokes = FONT[ch] || [];
    const ox = startX + ci * (scaledLetterW + scaledGap);
    const oy = startY;
    for (const stroke of strokes) {
      paths.push(transformStroke(stroke, ox, oy, scale));
    }
  }
  return paths.filter(Boolean);
}

/**
 * Parse et retransforme les coordonnées d'un path SVG
 * Gère correctement M, L, C, Q et leurs variantes
 */
function transformStroke(d, ox, oy, s) {
  const tx = n => (parseFloat(n) * s + ox).toFixed(1);
  const ty = n => (parseFloat(n) * s + oy).toFixed(1);

  return d.replace(/([MLCQ])\s*([\d\s.\-]+)/gi, (_, cmd, args) => {
    const nums = args.trim().split(/\s+/);
    const out = [];
    for (let i = 0; i < nums.length; i += 2) {
      out.push(tx(nums[i]) + ' ' + ty(nums[i + 1]));
    }
    return cmd + ' ' + out.join(' ');
  });
}

// ── RENDU PRINCIPAL ───────────────────────────────────────────────────────────

/**
 * Remplit le SVG #svg-output avec des mots Wikipedia le long des chemins.
 * @param {string[]} paths
 * @param {{title:string, text:string, pageId:number}} wikiData
 * @param {'mono'|'gold'|'spectrum'} colorMode
 */
export function render(paths, wikiData, colorMode = 'mono') {
  const svg = document.getElementById('svg-output');
  const rawWords = wikiData.text.split(/\s+/).filter(Boolean);
  if (!rawWords.length || !paths.length) return;

  svg.innerHTML = '';

  // Fond
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '500');
  bg.setAttribute('height', '500');
  bg.setAttribute('fill', '#ebe4d6');
  svg.appendChild(bg);

  const palette = PALETTES[colorMode] || PALETTES.mono;
  const fontSize = 7;

  // Mesure des longueurs
  const tmpSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  tmpSvg.setAttribute('viewBox', '0 0 500 500');
  tmpSvg.style.cssText = 'position:absolute;visibility:hidden;width:0;height:0';
  document.body.appendChild(tmpSvg);

  const pathLengths = paths.map(d => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('d', d);
    tmpSvg.appendChild(el);
    const len = el.getTotalLength();
    tmpSvg.removeChild(el);
    return Math.max(len, 0);
  });
  document.body.removeChild(tmpSvg);

  const totalLength = pathLengths.reduce((a, b) => a + b, 0);
  // Estimation : ~4px par caractère en moyenne à fontSize 5.5
  const approxWordPx = (rawWords.reduce((a, w) => a + w.length, 0) / rawWords.length) * (fontSize * 0.52) + fontSize;
  const repeats = Math.ceil(totalLength / (rawWords.length * approxWordPx)) + 2;

  const words = [];
  for (let i = 0; i < repeats; i++) words.push(...rawWords);

  // Defs
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  paths.forEach((d, pi) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('id', 'tv' + pi);
    el.setAttribute('d', d);
    defs.appendChild(el);
  });
  svg.appendChild(defs);

  // Élément texte temporaire pour mesurer les vrais px de chaque mot
  const ruler = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  ruler.setAttribute('font-family', 'DM Mono, monospace');
  ruler.setAttribute('font-size', fontSize);
  ruler.setAttribute('letter-spacing', '0.05em');
  ruler.style.visibility = 'hidden';
  svg.appendChild(ruler);

  // Cache de largeurs pour éviter de re-mesurer les mêmes mots
  const widthCache = {};
  function measureWord(word) {
    if (widthCache[word] !== undefined) return widthCache[word];
    ruler.textContent = word + '  '; // deux espaces = séparation visible
    const w = ruler.getComputedTextLength();
    widthCache[word] = w;
    return w;
  }

  let wordIdx = 0;
  let colorIdx = 0;

  paths.forEach((_, pi) => {
    const pathLen = pathLengths[pi];
    if (pathLen < 5) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let dist = 0;

    while (dist < pathLen) {
      const word = words[wordIdx % words.length];
      const wordPx = measureWord(word);

      // Ne pas placer si le mot déborde (évite les coupures en fin de chemin)
      if (dist + wordPx > pathLen) break;

      wordIdx++;
      const color = palette[colorIdx % palette.length];
      colorIdx++;

      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('font-family', 'DM Mono, monospace');
      t.setAttribute('font-size', fontSize);
      t.setAttribute('fill', color);
      t.setAttribute('letter-spacing', '0.05em');

      const tp = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      tp.setAttribute('href', '#tv' + pi);
      // startOffset en % = position exacte sans dérive
      tp.setAttribute('startOffset', ((dist / pathLen) * 100).toFixed(3) + '%');
      tp.textContent = word + '  ';

      t.appendChild(tp);
      g.appendChild(t);

      dist += wordPx;
    }

    svg.appendChild(g);
  });

  svg.removeChild(ruler);
}

/**
 * Télécharge le SVG courant en .svg
 */
export function exportSVG() {
  const svg = document.getElementById('svg-output');
  const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'typographie-vivante.svg';
  a.click();
  URL.revokeObjectURL(a.href);
}
