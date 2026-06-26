import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'Sebastián Viglione | Custom software for companies',
  description:
    'Custom software for companies that want to organize their operations and automate manual processes.',
  alternates: {
    canonical: '/en',
    languages: { es: '/', en: '/en' },
  },
  openGraph: {
    title: 'Sebastián Viglione | Custom software for companies',
    description:
      'Custom software for companies that want to organize their operations and automate manual processes.',
    url: 'https://sebaviglione.com/en',
    siteName: 'sebaviglione.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Sebastián Viglione — Software developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastián Viglione | Custom software for companies',
    description: 'Custom software to organize operations and automate manual processes.',
    images: ['/assets/og/home.png'],
  },
};

export default function HomeEn() {
  return <LandingPage locale="en" />;
}
