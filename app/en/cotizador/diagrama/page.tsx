import type { Metadata } from 'next';
import { SystemDiagramPage } from '@/components/SystemDiagramPage';

export const metadata: Metadata = {
  title: 'Aluminum Joinery Quoter: interactive system diagram | Sebastián Viglione',
  description:
    'How the aluminum joinery quoter works, in a diagram you can move around: the full circuit, the client journey, the pricing engine, the technician panel and the hand-off to the factory.',
  alternates: {
    canonical: '/en/cotizador/diagrama',
    languages: { es: '/cotizador/diagrama', en: '/en/cotizador/diagrama' },
  },
  openGraph: {
    title: 'Aluminum Joinery Quoter: interactive system diagram',
    description: 'Five views of the quoter in an interactive diagram: client, pricing engine, technician panel and factory hand-off.',
    url: 'https://sebaviglione.com/en/cotizador/diagrama',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'article',
    images: [{ url: '/assets/og/cotizador-en.png', width: 1200, height: 630, alt: 'Aluminum Joinery Quoter · system diagram' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aluminum Joinery Quoter: interactive system diagram',
    description: 'Five views of the quoter in an interactive diagram, with a step-by-step walkthrough.',
    images: ['/assets/og/cotizador-en.png'],
  },
};

export default function CotizadorDiagramaEn() {
  return <SystemDiagramPage locale="en" />;
}
