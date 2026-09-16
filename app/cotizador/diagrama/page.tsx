import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Cotizador de Aberturas: diagrama interactivo del sistema | Sebastián Viglione',
  description:
    'Cómo funciona el cotizador de aberturas, en un diagrama que se puede mover: el circuito completo, el recorrido del cliente, el motor de precio, el panel del técnico y la salida a fábrica.',
  alternates: {
    canonical: '/cotizador/diagrama',
    languages: { es: '/cotizador/diagrama', en: '/en/cotizador/diagrama' },
  },
  openGraph: {
    title: 'Cotizador de Aberturas: diagrama interactivo del sistema',
    description:
      'Cinco vistas del cotizador en un diagrama interactivo: cliente, motor de precio, panel del técnico y salida a fábrica.',
    url: 'https://sebaviglione.com/cotizador/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/cotizador-es.png', width: 1200, height: 630, alt: 'Cotizador de Aberturas · diagrama del sistema' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cotizador de Aberturas: diagrama interactivo del sistema',
    description: 'Cinco vistas del cotizador en un diagrama interactivo, con recorrido explicado paso a paso.',
    images: ['/assets/og/cotizador-es.png'],
  },
};

export default function CotizadorDiagrama() {
  return <SystemDiagramPage locale="es" project="cotizador" />;
}
