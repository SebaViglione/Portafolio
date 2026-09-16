import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Depósitos CPS: diagrama interactivo del sistema | Sebastián Viglione',
  description:
    'Cómo funciona el sistema de stock de Grupo CPS, en un diagrama que se puede mover: el circuito del material, el kardex inmutable y el costeo, las herramientas por serie y cómo está construido.',
  alternates: {
    canonical: '/stock/diagrama',
    languages: { es: '/stock/diagrama', en: '/en/stock/diagrama' },
  },
  openGraph: {
    title: 'Depósitos CPS: diagrama interactivo del sistema',
    description: 'Cinco vistas del sistema de depósitos en un diagrama interactivo, con recorrido explicado paso a paso.',
    url: 'https://sebaviglione.com/stock/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/stock-es.png', width: 1200, height: 630, alt: 'Depósitos CPS · diagrama del sistema' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Depósitos CPS: diagrama interactivo del sistema',
    description: 'Cinco vistas del sistema de depósitos en un diagrama interactivo, con recorrido explicado paso a paso.',
    images: ['/assets/og/stock-es.png'],
  },
};

export default function StockDiagrama() {
  return <SystemDiagramPage locale="es" project="stock" />;
}
