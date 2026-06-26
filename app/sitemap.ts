import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://sebaviglione.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/en', priority: 0.9 },
    { path: '/cotizador', priority: 0.8 },
    { path: '/en/cotizador', priority: 0.8 },
    { path: '/arce', priority: 0.8 },
    { path: '/en/arce', priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
