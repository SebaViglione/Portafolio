import type { Metadata } from 'next';
import { ThanksPage } from '@/components/ThanksPage';

export const metadata: Metadata = {
  title: 'Mensaje enviado | Sebastián Viglione',
  description: 'Gracias por contactar a Sebastián Viglione.',
};

export default function Gracias() {
  return <ThanksPage />;
}
