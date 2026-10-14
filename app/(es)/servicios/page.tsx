import type { Metadata } from 'next';
import { ServicesPage } from '@/components/ServicesPage';

export const metadata: Metadata = {
  title: 'Software a medida para empresas | Sebastián Viglione',
  description:
    'Sitios web, sistemas de gestión, automatización e IA aplicada para empresas que quieren ordenar su operación. Trato directo, sin agencias en el medio.',
  alternates: {
    canonical: '/servicios',
    languages: { es: '/servicios', en: '/en/servicios' },
  },
  openGraph: {
    title: 'Software a medida para empresas | Sebastián Viglione',
    description:
      'Sitios web, sistemas de gestión, automatización e IA aplicada para empresas que quieren ordenar su operación.',
    url: 'https://sebaviglione.com/servicios',
    siteName: 'sebaviglione.com',
    locale: 'es_UY',
    type: 'website',
    images: [{ url: '/assets/og/servicios-es.png', width: 1200, height: 630, alt: 'Software a medida para empresas · Sebastián Viglione' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software a medida para empresas | Sebastián Viglione',
    description: 'Sitios web, sistemas de gestión, automatización e IA aplicada para empresas.',
    images: ['/assets/og/servicios-es.png'],
  },
};

export default function Servicios() {
  return <ServicesPage locale="es" />;
}
