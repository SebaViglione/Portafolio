// Chequeo de los diagramas interactivos (lib/diagrams): paridad ES/EN y geometría.
//   npm run diagramas:check
// Reproduce la medición de cajas y el trazado de flechas de components/SystemDiagram.tsx
// y falla si en alguna vista una flecha cruza otra, atraviesa una caja ajena o una
// etiqueta cae sobre una caja. Corre con Node 22+ (`--experimental-strip-types`).
import { diagramProjects, getSystemDiagram } from '../lib/diagrams/index.ts';

type P = { x: number; y: number };
type R = { id: string; x: number; y: number; w: number; h: number };

function charFactor(ch: string): number {
  if (ch === ' ') return 0.27;
  if ("ijl|!.,:;'’".includes(ch)) return 0.28;
  if ('ftrI()[]-'.includes(ch)) return 0.36;
  if ('mw'.includes(ch)) return 0.84;
  if ('MW'.includes(ch)) return 0.93;
  if (ch >= '0' && ch <= '9') return 0.58;
  if (ch === '·') return 0.32;
  if ('«»“”'.includes(ch)) return 0.5;
  if ('→×'.includes(ch)) return 0.8;
  if (ch === '•') return 0.55;
  if (ch !== ch.toLowerCase() && ch === ch.toUpperCase()) return 0.68;
  return 0.55;
}
const textWidth = (t: string, size: number, bold = false) => [...t].reduce((a, c) => a + charFactor(c), 0) * size * (bold ? 1.05 : 1);
function wrap(t: string, size: number, max: number, bold = false): string[] {
  const out: string[] = [];
  let cur = '';
  for (const w of t.split(/\s+/).filter(Boolean)) {
    const c = cur ? `${cur} ${w}` : w;
    if (!cur || textWidth(c, size, bold) <= max) cur = c;
    else {
      out.push(cur);
      cur = w;
    }
  }
  if (cur) out.push(cur);
  return out;
}
function bez(p0: P, p1: P, p2: P, p3: P, t: number): P {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}
function geometry(a: R, b: R, separate: boolean) {
  const ca = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const cb = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;
  const stacked = a.y + a.h <= b.y || b.y + b.h <= a.y;
  const aCovers = cb.x >= a.x && cb.x <= a.x + a.w;
  const bCovers = ca.x >= b.x && ca.x <= b.x + b.w;
  const sharedX = stacked && (aCovers || bCovers) ? (aCovers ? cb.x : ca.x) : null;
  let horizontal = Math.abs(dx) > Math.abs(dy);
  let p1: P;
  let p2: P;
  if (sharedX !== null) {
    horizontal = false;
    if (dy > 0) {
      p1 = { x: sharedX, y: a.y + a.h };
      p2 = { x: sharedX, y: b.y };
    } else {
      p1 = { x: sharedX, y: a.y };
      p2 = { x: sharedX, y: b.y + b.h };
    }
  } else if (horizontal) {
    if (dx > 0) {
      p1 = { x: a.x + a.w, y: ca.y };
      p2 = { x: b.x, y: cb.y };
    } else {
      p1 = { x: a.x, y: ca.y };
      p2 = { x: b.x + b.w, y: cb.y };
    }
  } else if (dy > 0) {
    p1 = { x: ca.x, y: a.y + a.h };
    p2 = { x: cb.x, y: b.y };
  } else {
    p1 = { x: ca.x, y: a.y };
    p2 = { x: cb.x, y: b.y + b.h };
  }
  if (separate) {
    const len = Math.hypot(dx, dy) || 1;
    const ox = (-dy / len) * 13;
    const oy = (dx / len) * 13;
    p1 = { x: p1.x + ox, y: p1.y + oy };
    p2 = { x: p2.x + ox, y: p2.y + oy };
  }
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const k = Math.max(36, Math.min(160, dist / 2.2));
  let c1: P;
  let c2: P;
  if (horizontal) {
    const s = p2.x >= p1.x ? 1 : -1;
    c1 = { x: p1.x + s * k, y: p1.y };
    c2 = { x: p2.x - s * k, y: p2.y };
  } else {
    const s = p2.y >= p1.y ? 1 : -1;
    c1 = { x: p1.x, y: p1.y + s * k };
    c2 = { x: p2.x, y: p2.y - s * k };
  }
  const pts: P[] = [];
  for (let i = 0; i <= 40; i++) pts.push(bez(p1, c1, c2, p2, i / 40));
  return { pts, mid: bez(p1, c1, c2, p2, 0.5) };
}
function segmentsCross(a: P, b: P, c: P, d: P): boolean {
  const o = (p: P, q: P, r: P) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
  return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}

let errores = 0;
for (const project of diagramProjects) {
  for (const locale of ['es', 'en'] as const) {
    const d = getSystemDiagram(project, locale);
    for (const v of d.views) {
      const ids = new Set(v.nodes.map((n) => n.id));
      if (ids.size !== v.nodes.length) { console.log(`${project}/${locale}/${v.id}: ids duplicados`); errores++; }
      for (const node of v.nodes) if (node.label === node.id) { console.log(`${project}/${locale}/${v.id}: nodo sin texto: ${node.id}`); errores++; }
      for (const g of v.groups) {
        if (g.label === g.id) { console.log(`${project}/${locale}/${v.id}: grupo sin texto: ${g.id}`); errores++; }
        for (const id of g.nodes) if (!ids.has(id)) { console.log(`${project}/${locale}/${v.id}: grupo ${g.id} con nodo inexistente: ${id}`); errores++; }
      }
      const keys = new Set(v.edges.map((f) => `${f.from}>${f.to}`));
      for (const f of v.edges) for (const k of [f.from, f.to]) if (!ids.has(k)) { console.log(`${project}/${locale}/${v.id}: flecha a nodo inexistente: ${k}`); errores++; }
      v.tour.forEach((p, i) => {
        if (!p.text) { console.log(`${project}/${locale}/${v.id}: paso ${i + 1} sin texto`); errores++; }
        for (const id of p.nodes) if (!ids.has(id)) { console.log(`${project}/${locale}/${v.id}: paso ${i + 1} con nodo inexistente: ${id}`); errores++; }
        for (const k of p.edges) if (!keys.has(k)) { console.log(`${project}/${locale}/${v.id}: paso ${i + 1} con flecha inexistente: ${k}`); errores++; }
      });
    }
  }

  // Geometría (con los textos en español, que suelen ser los más largos).
  const d = getSystemDiagram(project, 'es');
  for (const v of d.views) {
    const rects: R[] = v.nodes.map((n) => {
      const inner = n.w - 30;
      const tl = wrap(n.label, 13.5, inner, true).length;
      const sl = n.sub ? wrap(n.sub, 11.5, inner).length : 0;
      return { id: n.id, x: n.x, y: n.y, w: n.w, h: 12 + 13 + tl * 17 + (sl ? 6 + sl * 15 : 0) + 14 };
    });
    const byId = new Map(rects.map((r) => [r.id, r]));
    const reverse = new Set(v.edges.map((f) => `${f.to}>${f.from}`));
    const edges = v.edges.map((f) => {
      const a = byId.get(f.from)!;
      const b = byId.get(f.to)!;
      return { key: `${f.from}>${f.to}`, from: f.from, to: f.to, label: f.label, ...geometry(a, b, !f.bidir && reverse.has(`${f.from}>${f.to}`)) };
    });
    const problemas: string[] = [];
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) problemas.push(`cajas solapadas: ${a.id} y ${b.id}`);
    }
    for (let i = 0; i < edges.length; i++) {
      const E = edges[i];
      for (const r of rects) {
        if (r.id === E.from || r.id === E.to) continue;
        if (E.pts.slice(2, -2).some((p) => p.x > r.x - 2 && p.x < r.x + r.w + 2 && p.y > r.y - 2 && p.y < r.y + r.h + 2)) problemas.push(`flecha ${E.key} atraviesa ${r.id}`);
      }
      if (E.label) {
        const w = textWidth(E.label, 11) + 16;
        for (const r of rects) if (E.mid.x + w / 2 > r.x && E.mid.x - w / 2 < r.x + r.w && E.mid.y + 10 > r.y && E.mid.y - 10 < r.y + r.h) problemas.push(`etiqueta de ${E.key} sobre ${r.id}`);
      }
      for (let j = i + 1; j < edges.length; j++) {
        const F = edges[j];
        if (new Set([E.from, E.to, F.from, F.to]).size < 4) continue; // comparten caja: abanico
        let hit = false;
        for (let a = 0; a < E.pts.length - 1 && !hit; a++) for (let b = 0; b < F.pts.length - 1; b++) if (segmentsCross(E.pts[a], E.pts[a + 1], F.pts[b], F.pts[b + 1])) { hit = true; break; }
        if (hit) problemas.push(`cruce: ${E.key} × ${F.key}`);
      }
    }
    const W = Math.max(...rects.map((r) => r.x + r.w)) - Math.min(...rects.map((r) => r.x));
    const H = Math.max(...rects.map((r) => r.y + r.h)) - Math.min(...rects.map((r) => r.y));
    console.log(`${project.padEnd(9)} ${v.id.padEnd(13)} ${String(v.nodes.length).padStart(2)} cajas ${String(v.edges.length).padStart(2)} flechas  ${W}x${H}  ${problemas.length ? `PROBLEMAS: ${problemas.length}` : 'ok'}`);
    for (const p of problemas) console.log(`    - ${p}`);
    errores += problemas.length;
  }
}
console.log(errores ? `\n${errores} problema(s).` : '\nTodo en orden: paridad ES/EN y geometría limpias.');
process.exit(errores ? 1 : 0);
