import type { Metadata } from 'next';
import { CotizadorPage } from '@/components/CotizadorPage';

export const metadata: Metadata = {
  title: 'Cotizador de Aberturas — Motor de cálculo full-stack | Sebastián Viglione',
  description:
    'Case study: web B2B para cotizar aberturas de aluminio y vidrio. Motor de cálculo calibrado con reverse engineering sobre 2.641 recetas reales de fábrica. Next.js, TypeScript, Supabase.',
  alternates: {
    canonical: '/cotizador',
    languages: { es: '/cotizador', en: '/en/cotizador' },
  },
  openGraph: {
    title: 'Cotizador de Aberturas — Motor de cálculo full-stack',
    description:
      'Web B2B para cotizar aberturas con un motor de cálculo calibrado por reverse engineering. Reducción de error 2,44× → ~1%.',
    url: 'https://sebaviglione.com/cotizador',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'article',
    images: [{ url: '/assets/og/cotizador-es.png', width: 1200, height: 630, alt: 'Cotizador de Aberturas — case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cotizador de Aberturas — Motor de cálculo full-stack',
    description: 'Case study técnico: Next.js, TypeScript, Supabase y un motor de pricing calibrado contra el sistema de fábrica.',
    images: ['/assets/og/cotizador-es.png'],
  },
};

export default function Cotizador() {
  return <CotizadorPage locale="es" />;
}
