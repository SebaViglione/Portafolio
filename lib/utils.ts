import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Une clases condicionales y resuelve conflictos de Tailwind (lo usan los componentes de components/ui).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
