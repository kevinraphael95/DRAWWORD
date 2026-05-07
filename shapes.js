// shapes.js — Formes SVG pour Typographie Vivante

export const SHAPES = {

  bird: [
    "M 250 280 C 210 260 180 240 160 210 C 145 185 150 160 165 145 C 180 130 200 130 220 140 C 235 148 245 162 250 175",
    "M 250 175 C 255 162 265 148 280 140 C 300 130 320 130 335 145 C 350 160 355 185 340 210 C 320 240 290 260 250 280",
    "M 190 200 C 170 195 150 185 130 170 C 110 155 95 140 85 125 C 100 130 120 138 140 148 C 160 158 180 172 200 185",
    "M 310 200 C 330 195 350 185 370 170 C 390 155 405 140 415 125 C 400 130 380 138 360 148 C 340 158 320 172 300 185",
    "M 240 280 C 235 300 225 320 210 340 C 200 355 190 368 182 378",
    "M 260 280 C 265 300 275 320 290 340 C 300 355 310 368 318 378",
    "M 250 175 C 245 165 240 155 242 145 C 244 135 250 130 258 130 C 266 130 272 136 273 144 C 274 152 269 163 265 172",
  ],

  circle: (() => {
    const paths = [];
    for (let r = 18; r <= 210; r += 22)
      paths.push(`M ${250 + r} 250 A ${r} ${r} 0 1 1 ${250 + r - 0.01} 250`);
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
    paths.push(starOutline(200, 80), starOutline(145, 58), starOutline(90, 36));
    for (let i = 0; i < 5; i++) {
      const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
      paths.push(`M 250 250 L ${(250 + 200 * Math.cos(a)).toFixed(1)} ${(250 + 200 * Math.sin(a)).toFixed(1)}`);
    }
    return paths;
  })(),

  heart: [
    "M 250 360 C 200 320 100 280 100 200 C 100 150 140 115 185 115 C 210 115 232 128 250 148 C 268 128 290 115 315 115 C 360 115 400 150 400 200 C 400 280 300 320 250 360 Z",
    "M 250 320 C 215 290 148 262 148 207 C 148 170 172 148 200 148 C 222 148 239 160 250 174 C 261 160 278 148 300 148 C 328 148 352 170 352 207 C 352 262 285 290 250 320 Z",
    "M 250 148 L 250 320",
  ],

  wave: (() => {
    const paths = [];
    for (let i = 0; i < 9; i++) {
      const y = 90 + i * 38;
      const amp = 40 - i * 2;
      paths.push(`M 40 ${y} C 120 ${y - amp} 180 ${y + amp} 250 ${y} C 320 ${y - amp} 380 ${y + amp} 460 ${y}`);
    }
    return paths;
  })(),

  fish: [
    "M 150 250 C 160 220 195 195 250 190 C 305 185 355 205 380 250 C 355 295 305 315 250 310 C 195 305 160 280 150 250 Z",
    "M 380 250 C 400 225 430 210 450 195 C 430 235 430 265 450 305 C 430 290 400 275 380 250",
    "M 200 240 C 200 233 207 228 215 228 C 223 228 230 233 230 240 C 230 247 223 252 215 252 C 207 252 200 247 200 240",
    "M 155 245 C 152 250 152 256 155 260",
  ],

  spiral: (() => {
    const paths = [];
    const cx = 250, cy = 250, turns = 4, maxR = 200;
    for (let seg = 0; seg < 8; seg++) {
      const t0 = (seg / 8) * turns * 2 * Math.PI;
      const t1 = ((seg + 1) / 8) * turns * 2 * Math.PI;
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
    "M 250 420 L 250 320",
    "M 250 370 C 225 350 195 340 170 330",
    "M 250 370 C 275 350 305 340 330 330",
    "M 250 330 C 222 312 195 300 168 292",
    "M 250 330 C 278 312 305 300 332 292",
    "M 250 290 C 228 272 205 260 182 252",
    "M 250 290 C 272 272 295 260 318 252",
    "M 250 252 C 235 234 218 222 200 215",
    "M 250 252 C 265 234 282 222 300 215",
    "M 250 140 C 200 155 170 185 168 220 C 166 248 182 265 205 272 C 220 278 240 280 250 278 C 260 280 280 278 295 272 C 318 265 334 248 332 220 C 330 185 300 155 250 140",
    "M 250 165 C 218 178 198 200 196 228",
    "M 250 165 C 282 178 302 200 304 228",
  ],

};

// ── FORME ALÉATOIRE ──
export function generateRandom() {
  const strategies = [genBlob, genFlower, genMandala, genConstellation, genPolygon];
  return strategies[Math.floor(Math.random() * strategies.length)]();
}

function genBlob() {
  const paths = [], cx = 250, cy = 250;
  for (let l = 0; l < 3 + Math.floor(Math.random() * 3); l++) {
    const baseR = 50 + l * 48;
    paths.push(catmullRomPath(randBlobPoints(cx, cy, baseR, 8 + l * 2), true));
  }
  const spokes = 4 + Math.floor(Math.random() * 5);
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * 2 * Math.PI;
    const r = 30 + Math.random() * 160;
    paths.push(`M ${cx} ${cy} Q ${(cx + r * 0.5 * Math.cos(a + 0.3)).toFixed(1)} ${(cy + r * 0.5 * Math.sin(a + 0.3)).toFixed(1)} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return paths;
}

function genFlower() {
  const paths = [], cx = 250, cy = 250;
  const petals = 5 + Math.floor(Math.random() * 6);
  const pr = 65 + Math.random() * 75;
  const pw = 30 + Math.random() * 25;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * 2 * Math.PI;
    const px = cx + pr * Math.cos(a), py = cy + pr * Math.sin(a);
    const c1x = cx + pw * Math.cos(a - Math.PI / 3), c1y = cy + pw * Math.sin(a - Math.PI / 3);
    const c2x = cx + pw * Math.cos(a + Math.PI / 3), c2y = cy + pw * Math.sin(a + Math.PI / 3);
    paths.push(`M ${cx} ${cy} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} C ${px.toFixed(1)} ${py.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${cx} ${cy}`);
  }
  for (let r = 12; r <= 40; r += 14)
    paths.push(`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r - 0.01} ${cy}`);
  return paths;
}

function genMandala() {
  const paths = [], cx = 250, cy = 250;
  const sym = 6 + Math.floor(Math.random() * 3) * 2;
  const rings = 3 + Math.floor(Math.random() * 3);
  for (let ring = 1; ring <= rings; ring++) {
    const r = ring * 55;
    paths.push(`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r - 0.01} ${cy}`);
    for (let s = 0; s < sym; s++) {
      const a = (s / sym) * 2 * Math.PI;
      paths.push(`M ${cx} ${cy} L ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
  }
  return paths;
}

function genConstellation() {
  const paths = [];
  const n = 8 + Math.floor(Math.random() * 10);
  const pts = Array.from({ length: n }, () => [60 + Math.random() * 380, 60 + Math.random() * 380]);
  for (let i = 0; i < n; i++) {
    const sorted = pts.map((p, j) => [j, Math.hypot(pts[i][0] - p[0], pts[i][1] - p[1])]).filter(d => d[0] !== i).sort((a, b) => a[1] - b[1]);
    for (let k = 0; k < Math.min(2 + Math.floor(Math.random() * 2), sorted.length); k++) {
      const j = sorted[k][0];
      if (j > i) paths.push(`M ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} L ${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)}`);
    }
  }
  pts.forEach(p => {
    const r = 3 + Math.random() * 7;
    paths.push(`M ${(p[0] + r).toFixed(1)} ${p[1].toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 1 1 ${(p[0] + r - 0.01).toFixed(1)} ${p[1].toFixed(1)}`);
  });
  return paths;
}

function genPolygon() {
  const paths = [], cx = 250, cy = 250;
  const sides = 3 + Math.floor(Math.random() * 7);
  const layers = 3 + Math.floor(Math.random() * 4);
  const twist = Math.random() * 0.3;
  for (let l = 0; l < layers; l++) {
    const r = 30 + l * 44;
    const off = l * twist;
    const pts = [];
    for (let i = 0; i <= sides; i++) {
      const a = (i / sides) * 2 * Math.PI - Math.PI / 2 + off;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    paths.push('M ' + pts.join(' L '));
    if (l === layers - 1) {
      for (let i = 0; i < sides; i++) {
        const a1 = (i / sides) * 2 * Math.PI - Math.PI / 2 + off;
        const a2 = ((i + Math.floor(sides / 2)) / sides) * 2 * Math.PI - Math.PI / 2 + off;
        paths.push(`M ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} L ${(cx + r * Math.cos(a2)).toFixed(1)} ${(cy + r * Math.sin(a2)).toFixed(1)}`);
      }
    }
  }
  return paths;
}

// ── UTILS ──
function randBlobPoints(cx, cy, baseR, n) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * 2 * Math.PI;
    const r = baseR * (0.75 + Math.random() * 0.5);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

function catmullRomPath(pts, closed = true) {
  const n = pts.length;
  const get = i => pts[(i + n) % n];
  let d = '';
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [get(i - 1), get(i), get(i + 1), get(i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6, cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6, cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    if (i === 0) d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} `;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  return (closed ? d + 'Z' : d).trim();
}
