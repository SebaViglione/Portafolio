import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**'],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    // Componentes copiados de React Bits, Magic UI y Aceternity (shadcn registry).
    // Se adaptaron al sitio, pero conservan su manejo de refs y estado: no se
    // reescriben para las reglas nuevas del React Compiler.
    files: ['components/ui/**'],
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
