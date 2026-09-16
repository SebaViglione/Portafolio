import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Arce: diagrama interactivo del sistema | Sebastián Viglione',
  description:
    'Cómo funciona Arce, en un diagrama que se puede mover: del portal de compras estatales al dashboard, el workflow de n8n, el análisis con IA local y el feedback del equipo.',
  alternates: {
    canonical: '/arce/diagrama',
    languages: { es: '/arce/diagrama', en: '/en/arce/diagrama' },
  },
  openGraph: {
    title: 'Arce: diagrama interactivo del sistema',
    description: 'Cuatro vistas de Arce en un diagrama interactivo: n8n, scraper, PostgreSQL, IA local y dashboard.',
    url: 'https://sebaviglione.com/arce/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · diagrama del sistema' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: diagrama interactivo del sistema',
    description: 'Cuatro vistas de Arce en un diagrama interactivo: n8n, scraper, PostgreSQL, IA local y dashboard.',
    images: ['/assets/og/arce.png'],
  },
};

export default function ArceDiagrama() {
  return <SystemDiagramPage locale="es" project="arce" />;
}
