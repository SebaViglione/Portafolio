'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Download, Minus, Play, Plus, RotateCcw, Scan, Square } from 'lucide-react';
import type { DiagramNode, DiagramNodeType, DiagramView, SystemDiagramDictionary } from '@/lib/diagrams/types';

/* ─────────────────────────── Tipos y constantes ─────────────────────────── */

type Pos = { x: number; y: number };
type Cam = { x: number; y: number; s: number };
type Rect = { x: number; y: number; w: number; h: number };
type Measured = DiagramNode & { titleLines: string[]; subLines: string[]; h: number };
type Tone = 'core' | 'mid' | 'light' | 'persona' | 'ok' | 'bad';
type DragState =
  | { kind: 'node'; id: string; start: Pos; origin: Record<string, Pos>; moved: boolean }
  | { kind: 'group'; ids: string[]; start: Pos; origin: Record<string, Pos>; moved: boolean }
  | { kind: 'pan'; startClient: Pos; cam0: Cam; moved: boolean }
  | { kind: 'pinch'; dist0: number; s0: number; moved: boolean };

// Diferenciación por tipo sin arcoíris: lima para el núcleo, gris para datos y
// configuración, claro para la web y los pasos, punteado para las personas.
const TONE: Record<DiagramNodeType, Tone> = {
  servidor: 'core',
  calc: 'core',
  total: 'core',
  gate: 'core',
  panel: 'core',
  datos: 'mid',
  config: 'mid',
  estado: 'mid',
  entrada: 'mid',
  web: 'light',
  paso: 'light',
  fabrica: 'light',
  persona: 'persona',
  ok: 'ok',
  bad: 'bad',
};

const TITLE_SIZE = 13.5;
const SUB_SIZE = 11.5;
const TEXT_X = 16;
const PAD_RIGHT = 14;
const LINE_TITLE = 17;
const LINE_SUB = 15;
const GROUP_PAD = 22;
const GROUP_TOP = 40;
const EMPTY_POS: Record<string, Pos> = {};

/* ───────────────────────── Medición determinista ────────────────────────── */

// Ancho aproximado por carácter (Inter). Es determinista a propósito: el HTML
// estático y el cliente miden igual, sin depender de que la fuente haya cargado.
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

function textWidth(text: string, size: number, bold = false): number {
  let width = 0;
  for (const ch of text) width += charFactor(ch);
  return width * size * (bold ? 1.05 : 1);
}

function wrapText(text: string, size: number, maxWidth: number, bold = false): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || textWidth(candidate, size, bold) <= maxWidth) current = candidate;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function measureNode(node: DiagramNode): Measured {
  const inner = node.w - TEXT_X - PAD_RIGHT;
  const titleLines = wrapText(node.label, TITLE_SIZE, inner, true);
  const subLines = node.sub ? wrapText(node.sub, SUB_SIZE, inner) : [];
  const h = 12 + 13 + titleLines.length * LINE_TITLE + (subLines.length ? 6 + subLines.length * LINE_SUB : 0) + 14;
  return { ...node, titleLines, subLines, h };
}

/* ───────────────────────────── Geometría ───────────────────────────────── */

const round = (value: number) => Math.round(value * 10) / 10;

function bezierPoint(p0: Pos, p1: Pos, p2: Pos, p3: Pos, t: number): Pos {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

// Anclas por lado según la dirección entre centros; ida y vuelta separadas 13 px.
function edgeGeometry(a: Rect, b: Rect, separate: boolean): { d: string; mid: Pos } {
  const ca = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const cb = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;
  // Cajas una encima de la otra (sin solaparse en vertical) y con el centro de
  // una dentro del ancho de la otra: la flecha cae recta por ese x. Así una
  // caja ancha suelta una flecha vertical a cada bloque que alimenta.
  const stacked = a.y + a.h <= b.y || b.y + b.h <= a.y;
  const aCovers = cb.x >= a.x && cb.x <= a.x + a.w;
  const bCovers = ca.x >= b.x && ca.x <= b.x + b.w;
  const sharedX = stacked && (aCovers || bCovers) ? (aCovers ? cb.x : ca.x) : null;
  let horizontal = Math.abs(dx) > Math.abs(dy);
  let p1: Pos;
  let p2: Pos;
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
  let c1: Pos;
  let c2: Pos;
  if (horizontal) {
    const s = p2.x >= p1.x ? 1 : -1;
    c1 = { x: p1.x + s * k, y: p1.y };
    c2 = { x: p2.x - s * k, y: p2.y };
  } else {
    const s = p2.y >= p1.y ? 1 : -1;
    c1 = { x: p1.x, y: p1.y + s * k };
    c2 = { x: p2.x, y: p2.y - s * k };
  }
  const mid = bezierPoint(p1, c1, c2, p2, 0.5);
  return {
    d: `M${round(p1.x)} ${round(p1.y)}C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${round(p2.x)} ${round(p2.y)}`,
    mid,
  };
}

function groupRect(ids: string[], rects: Map<string, Rect>): Rect | null {
  const members = ids.map((id) => rects.get(id)).filter((r): r is Rect => Boolean(r));
  if (!members.length) return null;
  const x = Math.min(...members.map((r) => r.x)) - GROUP_PAD;
  const y = Math.min(...members.map((r) => r.y)) - GROUP_TOP;
  const right = Math.max(...members.map((r) => r.x + r.w)) + GROUP_PAD;
  const bottom = Math.max(...members.map((r) => r.y + r.h)) + GROUP_PAD;
  return { x, y, w: right - x, h: bottom - y };
}

function bbox(rects: Iterable<Rect>): Rect {
  let x = Infinity;
  let y = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const r of rects) {
    x = Math.min(x, r.x - 30);
    y = Math.min(y, r.y - 50);
    right = Math.max(right, r.x + r.w + 30);
    bottom = Math.max(bottom, r.y + r.h + 30);
  }
  if (!Number.isFinite(x)) return { x: 0, y: 0, w: 1, h: 1 };
  return { x, y, w: right - x, h: bottom - y };
}

function computeRects(measured: Measured[], positions: Record<string, Pos>): Map<string, Rect> {
  const rects = new Map<string, Rect>();
  for (const m of measured) {
    const p = positions[m.id];
    rects.set(m.id, { x: p ? p.x : m.x, y: p ? p.y : m.y, w: m.w, h: m.h });
  }
  return rects;
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

/* ───────────────────────────── Componente ──────────────────────────────── */

export function SystemDiagram({ diagram }: { diagram: SystemDiagramDictionary }) {
  const { ui, typeNames, views, project } = diagram;

  const [viewId, setViewId] = useState(views[0].id);
  const view: DiagramView = views.find((v) => v.id === viewId) ?? views[0];
  const measured = useMemo(() => view.nodes.map(measureNode), [view]);
  const [posState, setPosState] = useState<{ view: string; map: Record<string, Pos> }>({ view: views[0].id, map: {} });
  const positions = useMemo(() => (posState.view === view.id ? posState.map : EMPTY_POS), [posState, view.id]);
  const rects = useMemo(() => computeRects(measured, positions), [measured, positions]);
  const reverse = useMemo(() => new Set(view.edges.map((edge) => `${edge.to}>${edge.from}`)), [view]);

  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tourIdx, setTourIdx] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const camRef = useRef<Cam>({ x: 0, y: 0, s: 1 });
  const dragRef = useRef<DragState | null>(null);
  const livePos = useRef<Record<string, Pos>>({});
  const pointers = useRef(new Map<number, Pos>());
  const frameRef = useRef(0);
  const latest = useRef({ measured, view, reverse, positions });
  useLayoutEffect(() => {
    latest.current = { measured, view, reverse, positions };
  });

  /* ── Cámara ── */
  const applyCam = useCallback(() => {
    const cam = camRef.current;
    worldRef.current?.setAttribute('transform', `translate(${cam.x} ${cam.y}) scale(${cam.s})`);
  }, []);

  // El atributo `transform` se renderiza estático (identidad) y la cámara real se
  // aplica por ref después de cada commit: así el HTML del export estático y el
  // cliente coinciden, y el arrastre no re-renderiza.
  useLayoutEffect(() => {
    applyCam();
  });

  const fit = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { measured: m, positions: p } = latest.current;
    const box = bbox(computeRects(m, p).values());
    const r = svg.getBoundingClientRect();
    const s = Math.max(0.25, Math.min(1.5, Math.min((r.width - 40) / box.w, (r.height - 40) / box.h)));
    camRef.current = { s, x: (r.width - box.w * s) / 2 - box.x * s, y: (r.height - box.h * s) / 2 - box.y * s };
    applyCam();
  }, [applyCam]);

  const zoomAt = useCallback(
    (factor: number, cx?: number, cy?: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const px = cx ?? r.width / 2;
      const py = cy ?? r.height / 2;
      const cam = camRef.current;
      const s2 = Math.max(0.2, Math.min(3, cam.s * factor));
      const wx = (px - cam.x) / cam.s;
      const wy = (py - cam.y) / cam.s;
      camRef.current = { s: s2, x: px - wx * s2, y: py - wy * s2 };
      applyCam();
    },
    [applyCam],
  );

  const centerOn = useCallback(
    (ids: string[]) => {
      const svg = svgRef.current;
      if (!svg) return;
      const { measured: m, positions: p } = latest.current;
      const all = computeRects(m, p);
      const targets = ids.map((id) => all.get(id)).filter((r): r is Rect => Boolean(r));
      if (!targets.length) return;
      const x = Math.min(...targets.map((r) => r.x));
      const y = Math.min(...targets.map((r) => r.y));
      const right = Math.max(...targets.map((r) => r.x + r.w));
      const bottom = Math.max(...targets.map((r) => r.y + r.h));
      const r = svg.getBoundingClientRect();
      const cam = camRef.current;
      const target = { x: r.width / 2 - ((x + right) / 2) * cam.s, y: r.height / 2 - ((y + bottom) / 2) * cam.s };
      gsap.killTweensOf(cam);
      if (reduceMotion()) {
        cam.x = target.x;
        cam.y = target.y;
        applyCam();
        return;
      }
      gsap.to(cam, { x: target.x, y: target.y, duration: 0.55, ease: 'power3.out', onUpdate: applyCam });
    },
    [applyCam],
  );

  /* ── Cambio de vista: cada vista abre con su disposición original y encuadrada ── */
  const changeView = useCallback(
    (id: string) => {
      setViewId(id);
      setPosState({ view: id, map: {} });
      setSel(null);
      setHover(null);
      setTourIdx(null);
      // Se encuadra cuando el nuevo layout ya está en el DOM.
      window.requestAnimationFrame(fit);
    },
    [fit],
  );

  // Al montar: encuadrar la vista inicial (fuera del render síncrono).
  useEffect(() => {
    const frame = window.requestAnimationFrame(fit);
    return () => window.cancelAnimationFrame(frame);
  }, [fit]);

  /* ── Al cambiar el tamaño del lienzo (ventana, orientación) se vuelve a encuadrar ── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof ResizeObserver === 'undefined') return;
    let last = { w: svg.clientWidth, h: svg.clientHeight };
    let frame = 0;
    const observer = new ResizeObserver(() => {
      const next = { w: svg.clientWidth, h: svg.clientHeight };
      if (Math.abs(next.w - last.w) < 2 && Math.abs(next.h - last.h) < 2) return;
      last = next;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(fit);
    });
    observer.observe(svg);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [fit]);

  /* ── Zoom con Ctrl/⌘ + rueda (la rueda sola deja pasar el scroll de la página) ── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const r = svg.getBoundingClientRect();
      zoomAt(event.deltaY < 0 ? 1.1 : 1 / 1.1, event.clientX - r.left, event.clientY - r.top);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  /* ── Pintado directo durante el arrastre (sin re-render por movimiento) ── */
  const paint = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    const { measured: m, view: v, reverse: rev } = latest.current;
    const all = computeRects(m, livePos.current);
    for (const [id, r] of all) {
      world.querySelector<SVGGElement>(`[data-node="${id}"]`)?.setAttribute('transform', `translate(${round(r.x)},${round(r.y)})`);
    }
    for (const edge of v.edges) {
      const a = all.get(edge.from);
      const b = all.get(edge.to);
      const g = world.querySelector<SVGGElement>(`[data-edge="${edge.from}>${edge.to}"]`);
      if (!a || !b || !g) continue;
      const { d, mid } = edgeGeometry(a, b, !edge.bidir && rev.has(`${edge.from}>${edge.to}`));
      g.querySelector('path')?.setAttribute('d', d);
      g.querySelector<SVGGElement>('[data-label]')?.setAttribute('transform', `translate(${round(mid.x)},${round(mid.y)})`);
    }
    for (const group of v.groups) {
      const r = groupRect(group.nodes, all);
      const g = world.querySelector<SVGGElement>(`[data-group="${group.id}"]`);
      if (!r || !g) continue;
      const box = g.querySelector<SVGRectElement>('[data-gbox]');
      const handle = g.querySelector<SVGRectElement>('[data-ghandle]');
      const label = g.querySelector<SVGTextElement>('[data-glabel]');
      box?.setAttribute('x', String(round(r.x)));
      box?.setAttribute('y', String(round(r.y)));
      box?.setAttribute('width', String(round(r.w)));
      box?.setAttribute('height', String(round(r.h)));
      handle?.setAttribute('x', String(round(r.x + 8)));
      handle?.setAttribute('y', String(round(r.y + 6)));
      label?.setAttribute('x', String(round(r.x + 18)));
      label?.setAttribute('y', String(round(r.y + 22)));
    }
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      paint();
    });
  }, [paint]);

  /* ── Punteros: arrastre de nodos y grupos, pan y pinch ── */
  const toWorld = useCallback((clientX: number, clientY: number): Pos => {
    const r = svgRef.current?.getBoundingClientRect();
    const cam = camRef.current;
    return { x: (clientX - (r?.left ?? 0) - cam.x) / cam.s, y: (clientY - (r?.top ?? 0) - cam.y) / cam.s };
  }, []);

  const select = useCallback((id: string | null) => {
    setSel(id);
    if (id) setTourIdx(null);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const svg = svgRef.current;
    if (!svg) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    svg.setPointerCapture(event.pointerId);

    if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      dragRef.current = { kind: 'pinch', dist0: Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1, s0: camRef.current.s, moved: true };
      return;
    }

    const target = event.target as Element;
    const nodeEl = target.closest<SVGGElement>('[data-node]');
    const groupEl = target.closest<SVGGElement>('[data-ghandle],[data-glabel]')?.closest<SVGGElement>('[data-group]');
    const start = toWorld(event.clientX, event.clientY);
    livePos.current = { ...latest.current.positions };
    const snapshot = (ids: string[]) => {
      const origin: Record<string, Pos> = {};
      const all = computeRects(latest.current.measured, livePos.current);
      for (const id of ids) {
        const r = all.get(id);
        if (r) origin[id] = { x: r.x, y: r.y };
      }
      return origin;
    };

    if (nodeEl?.dataset.node) {
      const id = nodeEl.dataset.node;
      dragRef.current = { kind: 'node', id, start, origin: snapshot([id]), moved: false };
    } else if (groupEl?.dataset.group) {
      const group = latest.current.view.groups.find((g) => g.id === groupEl.dataset.group);
      const ids = group?.nodes ?? [];
      dragRef.current = { kind: 'group', ids, start, origin: snapshot(ids), moved: false };
    } else {
      dragRef.current = { kind: 'pan', startClient: { x: event.clientX, y: event.clientY }, cam0: { ...camRef.current }, moved: false };
      svg.classList.add('is-panning');
    }
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (drag.kind === 'pinch') {
      if (pointers.current.size < 2) return;
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
      const r = svgRef.current?.getBoundingClientRect();
      const mx = (p1.x + p2.x) / 2 - (r?.left ?? 0);
      const my = (p1.y + p2.y) / 2 - (r?.top ?? 0);
      const wanted = Math.max(0.2, Math.min(3, drag.s0 * (dist / drag.dist0)));
      zoomAt(wanted / camRef.current.s, mx, my);
      return;
    }
    if (drag.kind === 'pan') {
      const dx = event.clientX - drag.startClient.x;
      const dy = event.clientY - drag.startClient.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      camRef.current = { ...camRef.current, x: drag.cam0.x + dx, y: drag.cam0.y + dy };
      applyCam();
      return;
    }
    const here = toWorld(event.clientX, event.clientY);
    const dx = here.x - drag.start.x;
    const dy = here.y - drag.start.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
    if (!drag.moved) return;
    const ids = drag.kind === 'node' ? [drag.id] : drag.ids;
    for (const id of ids) {
      const o = drag.origin[id];
      if (o) livePos.current[id] = { x: o.x + dx, y: o.y + dy };
    }
    schedulePaint();
  };

  const onPointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    pointers.current.delete(event.pointerId);
    const svg = svgRef.current;
    try {
      svg?.releasePointerCapture(event.pointerId);
    } catch {
      /* ya liberado */
    }
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.kind === 'pinch') {
      if (pointers.current.size === 0) dragRef.current = null;
      return;
    }
    dragRef.current = null;
    svg?.classList.remove('is-panning');
    if (drag.kind === 'pan') {
      if (!drag.moved) select(null);
      return;
    }
    if (drag.moved) {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      paint();
      setPosState({ view: latest.current.view.id, map: { ...livePos.current } });
    } else if (drag.kind === 'node') {
      select(sel === drag.id ? null : drag.id);
    }
  };

  const onPointerOver = (event: ReactPointerEvent<SVGSVGElement>) => {
    // Durante un arrastre el puntero está capturado por el svg: un cambio de hover
    // re-renderizaría con las posiciones viejas y la caja saltaría atrás un frame.
    if (dragRef.current) return;
    const id = (event.target as Element).closest<SVGGElement>('[data-node]')?.dataset.node ?? null;
    setHover(id);
  };

  /* ── Recorrido ── */
  const goTour = useCallback(
    (index: number | null) => {
      const steps = latest.current.view.tour;
      if (index === null || index < 0 || index >= steps.length) {
        setTourIdx(null);
        return;
      }
      setTourIdx(index);
      setSel(null);
      centerOn(steps[index].nodes);
    },
    [centerOn],
  );

  const reset = useCallback(() => {
    setPosState({ view: view.id, map: {} });
    setSel(null);
    setTourIdx(null);
    window.setTimeout(fit, 0);
  }, [view.id, fit]);

  /* ── Teclado ── */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (event.key === 'Escape') {
        if (tourIdx !== null) goTour(null);
        else setSel(null);
      } else if (event.key === 'f' || event.key === 'F') {
        fit();
      } else if (tourIdx !== null && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault();
        goTour(tourIdx + (event.key === 'ArrowRight' ? 1 : -1));
      } else if (sel && event.key.startsWith('Arrow')) {
        event.preventDefault();
        const step = event.shiftKey ? 20 : 4;
        const current = rects.get(sel);
        if (!current) return;
        const next = {
          x: current.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
          y: current.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0),
        };
        setPosState({ view: view.id, map: { ...positions, [sel]: next } });
      } else if (/^[1-9]$/.test(event.key)) {
        const target = views[Number(event.key) - 1];
        if (target) changeView(target.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tourIdx, sel, rects, positions, view.id, views, goTour, fit, changeView]);

  /* ── Exportar SVG ── */
  const exportSvg = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = bbox(rects.values());
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.removeAttribute('class');
    clone.removeAttribute('style');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('viewBox', `${round(box.x)} ${round(box.y)} ${round(box.w)} ${round(box.h)}`);
    clone.setAttribute('width', String(round(box.w)));
    clone.setAttribute('height', String(round(box.h)));
    clone.querySelector('[data-world]')?.removeAttribute('transform');
    clone.querySelectorAll('.is-hi, .is-sel, .is-flow').forEach((el) => el.classList.remove('is-hi', 'is-sel', 'is-flow'));
    let css = 'svg{background:#0F1115;font-family:Inter,"Segoe UI",Helvetica,Arial,sans-serif}';
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        const text = rule.cssText;
        if (text.startsWith('.dg-') || text.startsWith('#dg-') || text.startsWith('.dg-svg')) css += text;
      }
    }
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = css;
    clone.insertBefore(style, clone.firstChild);
    const xml = new XMLSerializer().serializeToString(clone);
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project}-${view.id}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [rects, view.id, project]);

  /* ── Foco (selección, hover, recorrido) ── */
  const focus = useMemo(() => {
    const nodes = new Set<string>();
    const edges = new Set<string>();
    let mode: 'none' | 'focus' | 'peek' = 'none';
    const around = (id: string) => {
      nodes.add(id);
      for (const edge of view.edges) {
        if (edge.from === id || edge.to === id) {
          edges.add(`${edge.from}>${edge.to}`);
          nodes.add(edge.from);
          nodes.add(edge.to);
        }
      }
    };
    if (tourIdx !== null && view.tour[tourIdx]) {
      view.tour[tourIdx].nodes.forEach((id) => nodes.add(id));
      view.tour[tourIdx].edges.forEach((key) => edges.add(key));
      mode = 'focus';
    } else if (sel) {
      around(sel);
      mode = 'focus';
    } else if (hover) {
      around(hover);
      mode = 'peek';
    }
    return { mode, nodes, edges };
  }, [view, tourIdx, sel, hover]);

  const selected = sel ? measured.find((m) => m.id === sel) ?? null : null;
  const step = tourIdx !== null ? view.tour[tourIdx] : null;
  const viewIndex = views.findIndex((v) => v.id === view.id);

  const onNodeKey = (event: ReactKeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(sel === id ? null : id);
    }
  };

  return (
    <div className="dg-shell" data-lenis-prevent>
      <div className="dg-bar">
        <div className="dg-tabs" role="tablist" aria-label={ui.tabsAria}>
          {views.map((v, index) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={v.id === view.id}
              className={`dg-tab${v.id === view.id ? ' is-active' : ''}`}
              onClick={() => changeView(v.id)}
            >
              <span className="dg-tab-num">{index + 1}</span>
              {v.name}
            </button>
          ))}
        </div>
        <div className="dg-tools">
          <button type="button" className="dg-btn is-primary" onClick={() => goTour(tourIdx === null ? 0 : null)}>
            {tourIdx === null ? <Play size={14} /> : <Square size={13} />}
            {tourIdx === null ? ui.tourStart : ui.tourExit}
          </button>
          <button type="button" className="dg-btn" onClick={fit} title={ui.fitTitle}>
            <Scan size={15} />
            {ui.fit}
          </button>
          <button type="button" className="dg-btn" onClick={reset} title={ui.resetTitle}>
            <RotateCcw size={15} />
            {ui.reset}
          </button>
          <button type="button" className="dg-btn" onClick={exportSvg} title={ui.exportTitle}>
            <Download size={15} />
            {ui.exportSvg}
          </button>
        </div>
      </div>

      <div className="dg-stage">
        <svg
          ref={svgRef}
          className={`dg-svg${focus.mode === 'focus' ? ' is-focus' : focus.mode === 'peek' ? ' is-peek' : ''}`}
          role="img"
          aria-label={ui.svgAria}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerOver={onPointerOver}
          onPointerLeave={() => {
            if (!dragRef.current) setHover(null);
          }}
        >
          <defs>
            <marker id="dg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" />
            </marker>
            <marker id="dg-arr-hi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" />
            </marker>
            <pattern id="dg-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle className="dg-grid-dot" cx="1.5" cy="1.5" r="1.5" />
            </pattern>
            <filter id="dg-shadow" x="-10%" y="-10%" width="120%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.35" />
            </filter>
          </defs>
          <g ref={worldRef} data-world transform="translate(0 0) scale(1)">
            <rect x="-20000" y="-20000" width="40000" height="40000" fill="url(#dg-grid)" />

            <g className="dg-groups">
              {view.groups.map((group) => {
                const r = groupRect(group.nodes, rects);
                if (!r) return null;
                return (
                  <g key={group.id} className="dg-group" data-group={group.id}>
                    <rect className="dg-gbox" data-gbox x={round(r.x)} y={round(r.y)} width={round(r.w)} height={round(r.h)} rx="12" />
                    <rect
                      className="dg-ghandle"
                      data-ghandle
                      data-cursor={ui.cursorDrag}
                      x={round(r.x + 8)}
                      y={round(r.y + 6)}
                      width={textWidth(group.label, 10.5) * 1.2 + 24}
                      height="24"
                      rx="6"
                    />
                    <text className="dg-glabel" data-glabel data-cursor={ui.cursorDrag} x={round(r.x + 18)} y={round(r.y + 22)}>
                      {group.label}
                    </text>
                  </g>
                );
              })}
            </g>

            <g className="dg-edges">
              {view.edges.map((edge) => {
                const a = rects.get(edge.from);
                const b = rects.get(edge.to);
                if (!a || !b) return null;
                const key = `${edge.from}>${edge.to}`;
                const { d, mid } = edgeGeometry(a, b, !edge.bidir && reverse.has(key));
                const hi = focus.edges.has(key);
                const labelWidth = edge.label ? textWidth(edge.label, 11) + 16 : 0;
                return (
                  <g
                    key={key}
                    data-edge={key}
                    className={`dg-edge${edge.dashed ? ' is-dashed' : ''}${edge.bidir ? ' is-bidir' : ''}${hi ? ' is-hi' : ''}${
                      hi && focus.mode === 'focus' ? ' is-flow' : ''
                    }`}
                  >
                    <path d={d} />
                    {edge.label ? (
                      <g data-label transform={`translate(${round(mid.x)},${round(mid.y)})`}>
                        <rect className="dg-lblbg" x={-labelWidth / 2} y="-10" width={labelWidth} height="20" rx="4" />
                        <text className="dg-lbl" textAnchor="middle" y="4">
                          {edge.label}
                        </text>
                      </g>
                    ) : null}
                  </g>
                );
              })}
            </g>

            <g className="dg-nodes">
              {measured.map((node) => {
                const r = rects.get(node.id);
                if (!r) return null;
                const hi = focus.nodes.has(node.id);
                const subTop = 12 + 13 + 14 + node.titleLines.length * LINE_TITLE + 4;
                return (
                  <g
                    key={node.id}
                    data-node={node.id}
                    data-cursor={ui.cursorDrag}
                    className={`dg-node dg-t-${TONE[node.type]}${hi ? ' is-hi' : ''}${sel === node.id ? ' is-sel' : ''}`}
                    transform={`translate(${round(r.x)},${round(r.y)})`}
                    tabIndex={0}
                    role="button"
                    aria-label={node.label}
                    onKeyDown={(event) => onNodeKey(event, node.id)}
                  >
                    <rect className="dg-box" width={node.w} height={node.h} rx="8" />
                    <rect className="dg-stripe" x="0" y="10" width="4" height={node.h - 20} rx="2" />
                    <text className="dg-badge" x={TEXT_X} y="18">
                      {typeNames[node.type].toUpperCase()}
                    </text>
                    {node.type === 'persona' ? (
                      <>
                        <circle className="dg-glyph" cx={node.w - 18} cy="13" r="4" />
                        <path className="dg-glyph" d={`M${node.w - 26} 26a8 8 0 0 1 16 0z`} />
                      </>
                    ) : null}
                    {node.titleLines.map((line, index) => (
                      <text key={`t${index}`} className="dg-ntitle" x={TEXT_X} y={39 + index * LINE_TITLE}>
                        {line}
                      </text>
                    ))}
                    {node.subLines.map((line, index) => (
                      <text key={`s${index}`} className="dg-nsub" x={TEXT_X} y={subTop + index * LINE_SUB}>
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        <div className="dg-zoom">
          <button type="button" className="dg-btn is-icon" onClick={() => zoomAt(1.2)} aria-label={ui.zoomIn} title={ui.zoomIn}>
            <Plus size={16} />
          </button>
          <button type="button" className="dg-btn is-icon" onClick={() => zoomAt(1 / 1.2)} aria-label={ui.zoomOut} title={ui.zoomOut}>
            <Minus size={16} />
          </button>
        </div>
        <p className="dg-hint">{ui.hint}</p>
      </div>

      <aside className="dg-side" aria-live="polite">
        {step ? (
          <>
            <p className="dg-eyebrow">{view.name}</p>
            <div className="dg-tourbox">
              <span className="dg-step">{fill(ui.stepOf, { i: (tourIdx ?? 0) + 1, n: view.tour.length })}</span>
              <p className="dg-tourtext">{step.text}</p>
              <div className="dg-nav">
                <button type="button" className="dg-btn" onClick={() => goTour((tourIdx ?? 0) - 1)} disabled={tourIdx === 0}>
                  <ArrowLeft size={14} />
                  {ui.prev}
                </button>
                <button type="button" className="dg-btn is-primary" onClick={() => goTour((tourIdx ?? 0) + 1)}>
                  {tourIdx === view.tour.length - 1 ? ui.finish : ui.next}
                  <ArrowRight size={14} />
                </button>
                <button type="button" className="dg-btn" onClick={() => goTour(null)}>
                  {ui.exit}
                </button>
              </div>
            </div>
            <p className="dg-muted">{ui.tourHint}</p>
          </>
        ) : selected ? (
          <>
            <button type="button" className="dg-close" onClick={() => select(null)}>
              <ArrowLeft size={13} />
              {ui.backToView}
            </button>
            <div>
              <p className={`dg-eyebrow dg-t-${TONE[selected.type]}`}>{typeNames[selected.type]}</p>
              <h2 className="dg-title">{selected.label}</h2>
            </div>
            {selected.sub ? <p className="dg-muted">{selected.sub}</p> : null}
            {selected.desc ? <p className="dg-text">{selected.desc}</p> : null}
            {selected.bullets?.length ? (
              <ul className="dg-list">
                {selected.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {(() => {
              const related = view.edges.filter((edge) => edge.from === selected.id || edge.to === selected.id);
              if (!related.length) return null;
              return (
                <>
                  <h3 className="dg-h3">{ui.connections}</h3>
                  <ul className="dg-list">
                    {related.map((edge) => {
                      const otherId = edge.from === selected.id ? edge.to : edge.from;
                      const other = measured.find((m) => m.id === otherId);
                      return (
                        <li key={`${edge.from}>${edge.to}`}>
                          <span className="dg-dir">{edge.from === selected.id ? '→' : '←'}</span> <b>{other?.label ?? otherId}</b>
                          {edge.label ? <span className="dg-muted"> · {edge.label}</span> : null}
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            })()}
          </>
        ) : (
          <>
            <div>
              <p className="dg-eyebrow">{fill(ui.viewOf, { i: viewIndex + 1, n: views.length })}</p>
              <h2 className="dg-title">{view.name}</h2>
            </div>
            <p className="dg-text">{view.intro}</p>
            <div>
              <button type="button" className="dg-btn is-primary" onClick={() => goTour(0)}>
                <Play size={14} />
                {ui.tourStart}
              </button>
            </div>
            {view.script?.length ? (
              <>
                <h3 className="dg-h3">{ui.scriptTitle}</h3>
                <ol className="dg-script">
                  {view.script.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </>
            ) : null}
            <p className="dg-muted">{ui.clickHint}</p>
          </>
        )}
      </aside>
    </div>
  );
}
