import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { es: '/', en: '/en' },
  },
};

export default function Home() {
  return <LandingPage locale="es" />;
}
