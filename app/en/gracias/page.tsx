import type { Metadata } from 'next';
import { ThanksPage } from '@/components/ThanksPage';

export const metadata: Metadata = {
  title: 'Message sent | Sebastián Viglione',
  description: 'Thanks for reaching out to Sebastián Viglione.',
  robots: { index: false },
};

export default function GraciasEn() {
  return <ThanksPage locale="en" />;
}
