// render.js — Rendu SVG et export

const PALETTES = {
  mono:     ['#3a3630', '#5a5550', '#8a8278'],
  gold:     ['#bf4020', '#c87030', '#d4a060'],
  spectrum: ['#bf4020', '#306080', '#5a7040', '#7050a0', '#c87030'],
};

/**
 * Remplit le SVG #svg-output avec des mots Wikipedia tracés le long des chemins.
 * @param {string[]} paths  - Tableau de commandes SVG path
 * @param {{title:string, text:string, pageId:number}} wikiData
 * @param {'mono'|'gold'|'spectrum'} colorMode
 */
export function render(paths, wikiData, colorMode = 'mono') {
  const svg = document.getElementById('svg-output');
  const words = wikiData.text.split(/\s+/).filter(Boolean);
  if (!words.length) return;

  svg.innerHTML = '';

  // Fond
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '500');
  bg.setAttribute('height', '500');
  bg.setAttribute('fill', '#ebe4d6');
  svg.appendChild(bg);

  const palette = PALETTES[colorMode] || PALETTES.mono;
  let wordIndex = 0;

  paths.forEach((pathD, pi) => {
    // Mesure de la longueur du chemin
    const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tmp.setAttribute('d', pathD);
    svg.appendChild(tmp);
    const totalLen = tmp.getTotalLength();
    svg.removeChild(tmp);

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const pid = 'p' + pi;

    // Chemin invisible (pour textPath)
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('id', pid);
    pathEl.setAttribute('d', pathD);
    pathEl.setAttribute('fill', 'none');
    pathEl.setAttribute('stroke', 'none');
    g.appendChild(pathEl);

    // Placement des mots le long du chemin
    let dist = 0;
    let seg = 0;
    while (dist < totalLen) {
      const word = words[wordIndex % words.length];
      wordIndex++;
      const fontSize = 4.5 + Math.random() * 2;
      const color = palette[seg % palette.length];

      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('font-family', 'DM Mono, monospace');
      t.setAttribute('font-size', fontSize);
      t.setAttribute('fill', color);
      t.setAttribute('letter-spacing', '0.08em');

      const tp = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      tp.setAttribute('href', '#' + pid);
      tp.setAttribute('startOffset', ((dist / totalLen) * 100).toFixed(2) + '%');
      tp.textContent = word + ' ';

      t.appendChild(tp);
      g.appendChild(t);

      dist += word.length * fontSize * 0.6 + fontSize * 1.2;
      seg++;
    }

    svg.appendChild(g);
  });
}

/**
 * Télécharge le SVG courant en fichier .svg
 */
export function exportSVG() {
  const svg = document.getElementById('svg-output');
  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'typographie-vivante.svg';
  a.click();
  URL.revokeObjectURL(a.href);
}
