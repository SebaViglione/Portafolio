import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/gracias', '/en/gracias'],
    },
    sitemap: 'https://sebaviglione.com/sitemap.xml',
    host: 'https://sebaviglione.com',
  };
}
