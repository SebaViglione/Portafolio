import type { Locale } from '../content';

// Diagramas interactivos de los case studies (/<proyecto>/diagrama).
// La DISPOSICIÓN (nodos, posiciones, flechas, grupos y pasos del recorrido) se
// define una sola vez por proyecto; los TEXTOS van por idioma. `getSystemDiagram`
// (index.ts) junta las dos partes, así ES y EN no pueden desincronizarse.

export type DiagramProject = 'cotizador' | 'stock' | 'arce';

export type DiagramNodeType =
  | 'persona'
  | 'web'
  | 'servidor'
  | 'datos'
  | 'panel'
  | 'fabrica'
  | 'paso'
  | 'calc'
  | 'total'
  | 'entrada'
  | 'gate'
  | 'config'
  | 'estado'
  | 'ok'
  | 'bad';

export type DiagramNode = {
  id: string;
  type: DiagramNodeType;
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
  desc?: string;
  bullets?: string[];
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  bidir?: boolean;
};

export type DiagramGroup = { id: string; label: string; nodes: string[] };

/** `edges` usa la clave "from>to". */
export type DiagramTourStep = { nodes: string[]; edges: string[]; text: string };

export type DiagramView = {
  id: string;
  name: string;
  intro: string;
  script?: string[];
  nodes: DiagramNode[];
  groups: DiagramGroup[];
  edges: DiagramEdge[];
  tour: DiagramTourStep[];
};

/** Textos comunes a todos los diagramas (botones, pistas, panel). */
export type SystemDiagramUi = {
  hint: string;
  tabsAria: string;
  tourStart: string;
  tourExit: string;
  fit: string;
  fitTitle: string;
  reset: string;
  resetTitle: string;
  exportSvg: string;
  exportTitle: string;
  zoomIn: string;
  zoomOut: string;
  cursorDrag: string;
  viewOf: string;
  stepOf: string;
  prev: string;
  next: string;
  finish: string;
  exit: string;
  tourHint: string;
  clickHint: string;
  connections: string;
  backToView: string;
  scriptTitle: string;
  svgAria: string;
  back: string;
  backFull: string;
  switchLabel: string;
  switchAria: string;
  backCase: string;
  ctaTalk: string;
};

/** Cabecera de la página, propia de cada proyecto. */
export type DiagramHeader = { kicker: string; title: string; intro: string; footNote: string };

export type SystemDiagramDictionary = {
  project: DiagramProject;
  slug: string;
  ui: SystemDiagramUi;
  header: DiagramHeader;
  typeNames: Record<DiagramNodeType, string>;
  views: DiagramView[];
};

/* ── Disposición compartida y textos por idioma (lo que escribe cada proyecto) ── */

export type NodeLayout = { id: string; type: DiagramNodeType; x: number; y: number; w: number };
export type EdgeLayout = { from: string; to: string; dashed?: boolean; bidir?: boolean };
export type GroupLayout = { id: string; nodes: string[] };
export type TourLayout = { nodes: string[]; edges: string[] };
export type ViewLayout = { id: string; nodes: NodeLayout[]; edges: EdgeLayout[]; groups: GroupLayout[]; tour: TourLayout[] };

export type NodeText = { label: string; sub?: string; desc?: string; bullets?: string[] };
export type ViewText = {
  name: string;
  intro: string;
  script?: string[];
  nodes: Record<string, NodeText>;
  edges: Record<string, string>;
  groups: Record<string, string>;
  tour: string[];
};
export type ProjectText = {
  header: DiagramHeader;
  typeNames: Record<DiagramNodeType, string>;
  views: Record<string, ViewText>;
};

export type DiagramProjectData = {
  id: DiagramProject;
  slug: string;
  layout: ViewLayout[];
  texts: Record<Locale, ProjectText>;
};

export const n = (id: string, type: DiagramNodeType, x: number, y: number, w: number): NodeLayout => ({ id, type, x, y, w });
export const e = (from: string, to: string, opts?: { dashed?: boolean; bidir?: boolean }): EdgeLayout => ({ from, to, ...opts });
