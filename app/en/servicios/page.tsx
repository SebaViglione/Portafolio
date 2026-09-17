import type { Metadata } from 'next';
import { ServicesPage } from '@/components/ServicesPage';

export const metadata: Metadata = {
  title: 'Custom software for companies | Sebastián Viglione',
  description:
    'Websites, management software, automation and applied AI for companies that want to organize their operations. Direct contact, no agencies in between.',
  alternates: {
    canonical: '/en/servicios',
    languages: { es: '/servicios', en: '/en/servicios' },
  },
  openGraph: {
    title: 'Custom software for companies | Sebastián Viglione',
    description:
      'Websites, management software, automation and applied AI for companies that want to organize their operations.',
    url: 'https://sebaviglione.com/en/servicios',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/og/servicios-en.png', width: 1200, height: 630, alt: 'Custom software for companies · Sebastián Viglione' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom software for companies | Sebastián Viglione',
    description: 'Websites, management software, automation and applied AI for companies.',
    images: ['/assets/og/servicios-en.png'],
  },
};

export default function ServiciosEn() {
  return <ServicesPage locale="en" />;
}
