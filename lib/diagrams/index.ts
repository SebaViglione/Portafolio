import type { Locale } from '../content';
import type { DiagramProject, DiagramProjectData, DiagramView, SystemDiagramDictionary } from './types';
import { diagramUi } from './ui';
import { cotizador } from './cotizador';
import { stock } from './stock';
import { arce } from './arce';

const projects: Record<DiagramProject, DiagramProjectData> = { cotizador, stock, arce };

export const diagramProjects = Object.keys(projects) as DiagramProject[];

export function diagramSlug(project: DiagramProject): string {
  return projects[project].slug;
}

/** Junta la disposición compartida con los textos del idioma pedido. */
export function getSystemDiagram(project: DiagramProject, locale: Locale): SystemDiagramDictionary {
  const data = projects[project];
  const t = data.texts[locale];
  const views: DiagramView[] = data.layout.map((view) => {
    const vt = t.views[view.id];
    return {
      id: view.id,
      name: vt.name,
      intro: vt.intro,
      script: vt.script,
      nodes: view.nodes.map((node) => ({ ...node, ...(vt.nodes[node.id] ?? { label: node.id }) })),
      groups: view.groups.map((group) => ({ ...group, label: vt.groups[group.id] ?? group.id })),
      edges: view.edges.map((edge) => ({ ...edge, label: vt.edges[`${edge.from}>${edge.to}`] })),
      tour: view.tour.map((step, index) => ({ ...step, text: vt.tour[index] ?? '' })),
    };
  });
  return { project, slug: data.slug, ui: diagramUi[locale], header: t.header, typeNames: t.typeNames, views };
}

export type { DiagramNode, DiagramNodeType, DiagramProject, DiagramView, SystemDiagramDictionary } from './types';
