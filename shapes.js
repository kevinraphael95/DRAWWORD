// shapes.js — Formes SVG pour Typographie Vivante

// ── PRÉDÉFINIES ──────────────────────────────────────────────────────────────

export const SHAPES = {
  bird: [
    "M 250 280 C 210 260 180 240 160 210 C 145 185 150 160 165 145 C 180 130 200 130 220 140 C 235 148 245 162 250 175",
    "M 250 175 C 255 162 265 148 280 140 C 300 130 320 130 335 145 C 350 160 355 185 340 210 C 320 240 290 260 250 280",
    "M 190 200 C 170 195 150 185 130 170 C 110 155 95 140 85 125 C 100 130 120 138 140 148 C 160 158 180 172 200 185",
    "M 310 200 C 330 195 350 185 370 170 C 390 155 405 140 415 125 C 400 130 380 138 360 148 C 340 158 320 172 300 185",
    "M 240 280 C 235 300 225 320 210 340 C 200 355 190 368 182 378",
    "M 260 280 C 265 300 275 320 290 340 C 300 355 310 368 318 378",
    "M 250 282 C 250 305 250 328 250 358",
    "M 250 175 C 245 165 240 155 242 145 C 244 135 250 130 258 130 C 266 130 272 136 273 144 C 274 152 269 163 265 172",
    "M 258 132 C 268 128 278 124 285 120 C 278 126 272 132 265 136",
  ],

  circle: (() => {
    const paths = [];
    const cx = 250, cy = 250;
    for (let r = 18; r <= 205; r += 21) {
      paths.push(`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r - 0.01} ${cy}`);
    }
    return paths;
  })(),

  star: (() => {
    const paths = [];
    const cx = 250, cy = 250;
    function starOutline(R, r) {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI / 5) - Math.PI / 2;
        const rad = i % 2 === 0 ? R : r;
        pts.push([cx + rad * Math.cos(angle), cy + rad * Math.sin(angle)]);
      }
      return 'M ' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ') + ' Z';
    }
    paths.push(starOutline(200, 80));
    paths.push(starOutline(145, 58));
    paths.push(starOutline(90, 36));
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
      paths.push(`M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${(cx + 200 * Math.cos(angle)).toFixed(1)} ${(cy + 200 * Math.sin(angle)).toFixed(1)}`);
    }
    return paths;
  })(),

  heart: [
    "M 250 360 C 200 320 100 280 100 200 C 100 150 140 115 185 115 C 210 115 232 128 250 148 C 268 128 290 115 315 115 C 360 115 400 150 400 200 C 400 280 300 320 250 360 Z",
    "M 250 320 C 215 290 148 262 148 207 C 148 170 172 148 200 148 C 222 148 239 160 250 174 C 261 160 278 148 300 148 C 328 148 352 170 352 207 C 352 262 285 290 250 320 Z",
    "M 250 148 C 250 195 250 255 250 320",
  ],

  wave: (() => {
    const paths = [];
    for (let i = 0; i < 9; i++) {
      const y = 90 + i * 38;
      const amp = 38 - i * 1.5;
      paths.push(`M 40 ${y} C 120 ${y - amp} 180 ${y + amp} 250 ${y} C 320 ${y - amp} 380 ${y + amp} 460 ${y}`);
    }
    return paths;
  })(),

  fish: [
    "M 150 250 C 160 220 195 195 250 190 C 305 185 355 205 380 250 C 355 295 305 315 250 310 C 195 305 160 280 150 250 Z",
    "M 380 250 C 400 225 430 210 450 195 C 430 235 430 265 450 305 C 430 290 400 275 380 250",
    "M 230 192 C 235 165 250 148 265 140 C 270 158 272 175 270 192",
    "M 200 240 C 200 233 207 228 215 228 C 223 228 230 233 230 240 C 230 247 223 252 215 252 C 207 252 200 247 200 240",
    "M 220 210 C 235 205 255 205 270 210",
    "M 215 228 C 235 221 265 221 285 228",
    "M 220 248 C 240 241 268 241 288 248",
    "M 155 245 C 152 250 152 256 155 260",
  ],

  spiral: (() => {
    const paths = [];
    // Archimedes spiral split into segments
    const cx = 250, cy = 250;
    const turns = 4;
    const maxR = 200;
    const steps = 8;
    for (let seg = 0; seg < steps; seg++) {
      const t0 = (seg / steps) * turns * 2 * Math.PI;
      const t1 = ((seg + 1) / steps) * turns * 2 * Math.PI;
      const r0 = (t0 / (turns * 2 * Math.PI)) * maxR + 8;
      const r1 = (t1 / (turns * 2 * Math.PI)) * maxR + 8;
      const pts = [];
      for (let k = 0; k <= 20; k++) {
        const t = t0 + (k / 20) * (t1 - t0);
        const r = r0 + (k / 20) * (r1 - r0);
        pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`);
      }
      paths.push('M ' + pts.join(' L '));
    }
    return paths;
  })(),

  tree: [
    // Trunk
    "M 250 420 L 250 320",
    "M 240 420 C 230 400 225 375 230 340",
    "M 260 420 C 270 400 275 375 270 340",
    // Bottom branches
    "M 250 370 C 230 355 210 345 190 340",
    "M 250 370 C 270 355 290 345 310 340",
    "M 250 355 C 225 340 200 328 175 320",
    "M 250 355 C 275 340 300 328 325 320",
    // Mid branches
    "M 250 310 C 228 295 205 285 182 278",
    "M 250 310 C 272 295 295 285 318 278",
    "M 250 295 C 235 280 218 268 200 260",
    "M 250 295 C 265 280 282 268 300 260",
    // Top branches
    "M 250 260 C 238 245 224 234 208 228",
    "M 250 260 C 262 245 276 234 292 228",
    // Crown outline
    "M 250 140 C 200 155 170 185 168 220 C 166 245 178 262 195 272",
    "M 250 140 C 300 155 330 185 332 220 C 334 245 322 262 305 272",
    "M 195 272 C 215 278 235 280 250 278 C 265 280 285 278 305 272",
    // Inner crown
    "M 250 165 C 215 178 195 200 193 228",
    "M 250 165 C 285 178 305 200 307 228",
  ],
};

// ── FORME ALÉATOIRE ───────────────────────────────────────────────────────────

/**
 * Génère un ensemble de tracés SVG aléatoires cohérents.
 * Plusieurs stratégies : blob organique, constellation, mandala, etc.
 */
export function generateRandomShape() {
  const strategies = [
    genBlob,
    genConstellation,
    genFlower,
    genMandala,
    genAbstractLines,
    genPolygon,
  ];
  const fn = strategies[Math.floor(Math.random() * strategies.length)];
  return fn();
}

// — Blob organique —
function genBlob() {
  const paths = [];
  const cx = 250, cy = 250;
  const layers = 3 + Math.floor(Math.random() * 3);
  for (let l = 0; l < layers; l++) {
    const baseR = 50 + l * 45;
    const pts = randBlobPoints(cx, cy, baseR, 8 + l * 2);
    paths.push(catmullRomPath(pts, true));
  }
  // Quelques rayons depuis le centre
  const spokes = 4 + Math.floor(Math.random() * 5);
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * 2 * Math.PI;
    const r = 30 + Math.random() * 160;
    paths.push(`M ${cx} ${cy} Q ${(cx + r * 0.5 * Math.cos(angle + 0.3)).toFixed(1)} ${(cy + r * 0.5 * Math.sin(angle + 0.3)).toFixed(1)} ${(cx + r * Math.cos(angle)).toFixed(1)} ${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return paths;
}

// — Constellation —
function genConstellation() {
  const paths = [];
  const cx = 250, cy = 250;
  const n = 8 + Math.floor(Math.random() * 10);
  const points = Array.from({length: n}, () => [
    60 + Math.random() * 380,
    60 + Math.random() * 380,
  ]);
  // Edges : each point connects to 2-3 nearest
  for (let i = 0; i < n; i++) {
    const dists = points.map((p, j) => [j, dist(points[i], p)]).filter(d => d[0] !== i).sort((a,b) => a[1]-b[1]);
    const connections = 2 + Math.floor(Math.random() * 2);
    for (let k = 0; k < Math.min(connections, dists.length); k++) {
      const j = dists[k][0];
      if (j > i) paths.push(`M ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)} L ${points[j][0].toFixed(1)} ${points[j][1].toFixed(1)}`);
    }
  }
  // Circles at nodes
  points.forEach(p => {
    const r = 3 + Math.random() * 8;
    paths.push(`M ${(p[0]+r).toFixed(1)} ${p[1].toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 1 1 ${(p[0]+r-0.01).toFixed(1)} ${p[1].toFixed(1)}`);
  });
  return paths;
}

// — Fleur —
function genFlower() {
  const paths = [];
  const cx = 250, cy = 250;
  const petals = 5 + Math.floor(Math.random() * 6);
  const pr = 60 + Math.random() * 80;  // petal reach
  const pw = 30 + Math.random() * 30;  // petal width
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * 2 * Math.PI;
    const ax = Math.cos(angle), ay = Math.sin(angle);
    const px = cx + pr * ax, py = cy + pr * ay;
    const c1x = cx + pw * Math.cos(angle - Math.PI/3), c1y = cy + pw * Math.sin(angle - Math.PI/3);
    const c2x = cx + pw * Math.cos(angle + Math.PI/3), c2y = cy + pw * Math.sin(angle + Math.PI/3);
    paths.push(`M ${cx.toFixed(1)} ${cy.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} C ${px.toFixed(1)} ${py.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)}`);
  }
  // Centre circles
  for (let r = 10; r <= 35; r += 12) {
    paths.push(`M ${cx+r} ${cy} A ${r} ${r} 0 1 1 ${cx+r-0.01} ${cy}`);
  }
  return paths;
}

// — Mandala —
function genMandala() {
  const paths = [];
  const cx = 250, cy = 250;
  const symmetry = 6 + Math.floor(Math.random() * 3) * 2;
  const rings = 3 + Math.floor(Math.random() * 3);
  for (let ring = 1; ring <= rings; ring++) {
    const r = ring * 55;
    paths.push(`M ${cx+r} ${cy} A ${r} ${r} 0 1 1 ${cx+r-0.01} ${cy}`);
    for (let s = 0; s < symmetry; s++) {
      const angle = (s / symmetry) * 2 * Math.PI;
      const r2 = r * 0.85;
      paths.push(`M ${cx} ${cy} L ${(cx+r*Math.cos(angle)).toFixed(1)} ${(cy+r*Math.sin(angle)).toFixed(1)}`);
      if (ring > 1) {
        const r1 = (ring - 1) * 55;
        paths.push(`M ${(cx+r1*Math.cos(angle)).toFixed(1)} ${(cy+r1*Math.sin(angle)).toFixed(1)} C ${(cx+r2*Math.cos(angle+0.3)).toFixed(1)} ${(cy+r2*Math.sin(angle+0.3)).toFixed(1)} ${(cx+r*Math.cos(angle)).toFixed(1)} ${(cy+r*Math.sin(angle)).toFixed(1)} ${(cx+r*Math.cos(angle)).toFixed(1)} ${(cy+r*Math.sin(angle)).toFixed(1)}`);
      }
    }
  }
  return paths;
}

// — Lignes abstraites —
function genAbstractLines() {
  const paths = [];
  const lineCount = 6 + Math.floor(Math.random() * 8);
  const seed = Math.random();
  for (let i = 0; i < lineCount; i++) {
    const t = i / lineCount;
    if (seed < 0.5) {
      // Parallel wavy lines
      const y = 60 + t * 380;
      const amp = 20 + Math.random() * 60;
      const freq = 1 + Math.floor(Math.random() * 3);
      const pts = [];
      for (let x = 40; x <= 460; x += 20) {
        const yt = y + amp * Math.sin((x / 500) * freq * 2 * Math.PI + t * Math.PI);
        pts.push(`${x.toFixed(1)} ${yt.toFixed(1)}`);
      }
      paths.push('M ' + pts.join(' L '));
    } else {
      // Random curved lines
      const x1 = 40 + Math.random() * 420, y1 = 40 + Math.random() * 420;
      const x2 = 40 + Math.random() * 420, y2 = 40 + Math.random() * 420;
      const cx1 = 40 + Math.random() * 420, cy1 = 40 + Math.random() * 420;
      const cx2 = 40 + Math.random() * 420, cy2 = 40 + Math.random() * 420;
      paths.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(1)} ${cx2.toFixed(1)} ${cy2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
  }
  return paths;
}

// — Polygone étoilé —
function genPolygon() {
  const paths = [];
  const cx = 250, cy = 250;
  const sides = 3 + Math.floor(Math.random() * 7);
  const layers = 3 + Math.floor(Math.random() * 4);
  const twist = Math.random() * 0.3;
  for (let l = 0; l < layers; l++) {
    const r = 30 + l * 42;
    const offset = l * twist;
    const pts = [];
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * 2 * Math.PI - Math.PI / 2 + offset;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)} ${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    paths.push('M ' + pts.join(' L '));
    // Diagonals
    if (l === layers - 1) {
      for (let i = 0; i < sides; i++) {
        const a1 = (i / sides) * 2 * Math.PI - Math.PI/2 + offset;
        const a2 = ((i + Math.floor(sides/2)) / sides) * 2 * Math.PI - Math.PI/2 + offset;
        paths.push(`M ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} L ${(cx + r * Math.cos(a2)).toFixed(1)} ${(cy + r * Math.sin(a2)).toFixed(1)}`);
      }
    }
  }
  return paths;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function dist([x1,y1], [x2,y2]) {
  return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

function randBlobPoints(cx, cy, baseR, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 2 * Math.PI;
    const r = baseR * (0.75 + Math.random() * 0.5);
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return pts;
}

function catmullRomPath(pts, closed = true) {
  const n = pts.length;
  let d = '';
  const getP = i => pts[(i + n) % n];
  for (let i = 0; i < n; i++) {
    const p0 = getP(i - 1), p1 = getP(i), p2 = getP(i + 1), p3 = getP(i + 2);
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    if (i === 0) d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} `;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  if (closed) d += 'Z';
  return d.trim();
}
