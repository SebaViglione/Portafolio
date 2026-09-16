import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://sebaviglione.com';

// lastModified por ruta: actualizar la fecha de una ruta cuando cambia su contenido.
const routes: { path: string; priority: number; lastModified: string }[] = [
  { path: '', priority: 1, lastModified: '2026-08-11' },
  { path: '/en', priority: 0.9, lastModified: '2026-08-11' },
  { path: '/cotizador', priority: 0.8, lastModified: '2026-09-16' },
  { path: '/en/cotizador', priority: 0.8, lastModified: '2026-09-16' },
  { path: '/cotizador/diagrama', priority: 0.6, lastModified: '2026-09-16' },
  { path: '/en/cotizador/diagrama', priority: 0.6, lastModified: '2026-09-16' },
  { path: '/stock', priority: 0.8, lastModified: '2026-08-11' },
  { path: '/en/stock', priority: 0.8, lastModified: '2026-08-11' },
  { path: '/arce', priority: 0.8, lastModified: '2026-08-11' },
  { path: '/en/arce', priority: 0.8, lastModified: '2026-08-11' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, lastModified }) => ({
    url: `${base}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency: 'monthly',
    priority,
  }));
}
