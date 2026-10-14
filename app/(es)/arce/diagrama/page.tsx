import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Arce: diagrama interactivo del sistema | Sebastián Viglione',
  description:
    'Cómo funciona Arce, en un diagrama que se puede mover: del portal de compras estatales al tablero, la ingesta del histórico, las estadísticas y el analista de IA.',
  alternates: {
    canonical: '/arce/diagrama',
    languages: { es: '/arce/diagrama', en: '/en/arce/diagrama' },
  },
  openGraph: {
    title: 'Arce: diagrama interactivo del sistema',
    description: 'Cuatro vistas de Arce en un diagrama interactivo: ingesta, PostgreSQL, estadísticas, analista de IA y tablero.',
    url: 'https://sebaviglione.com/arce/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/arce.png', width: 1200, height: 630, alt: 'Arce · diagrama del sistema' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arce: diagrama interactivo del sistema',
    description: 'Cuatro vistas de Arce en un diagrama interactivo: ingesta, PostgreSQL, estadísticas, analista de IA y tablero.',
    images: ['/assets/og/arce.png'],
  },
};

export default function ArceDiagrama() {
  return <SystemDiagramPage locale="es" project="arce" />;
}
