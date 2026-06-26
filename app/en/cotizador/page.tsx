import type { Metadata } from 'next';
import { CotizadorPage } from '@/components/CotizadorPage';

export const metadata: Metadata = {
  title: 'Aluminum Joinery Quoter — Full-stack pricing engine | Sebastián Viglione',
  description:
    'Case study: a B2B web app to quote aluminum-and-glass joinery. Pricing engine calibrated by reverse engineering 2,641 real factory recipes. Next.js, TypeScript, Supabase.',
  alternates: {
    canonical: '/en/cotizador',
    languages: { es: '/cotizador', en: '/en/cotizador' },
  },
  openGraph: {
    title: 'Aluminum Joinery Quoter — Full-stack pricing engine',
    description:
      'A B2B web app to quote joinery with a pricing engine calibrated by reverse engineering. Error reduction 2.44× → ~1%.',
    url: 'https://sebaviglione.com/en/cotizador',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/cotizador-en.png', width: 1200, height: 630, alt: 'Aluminum Joinery Quoter — case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aluminum Joinery Quoter — Full-stack pricing engine',
    description: 'Technical case study: Next.js, TypeScript, Supabase and a pricing engine validated against the factory system.',
    images: ['/assets/og/cotizador-en.png'],
  },
};

export default function CotizadorEn() {
  return <CotizadorPage locale="en" />;
}
