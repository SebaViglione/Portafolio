// Registra el resolver que completa la extensión .ts en imports relativos
// (Node ESM no la infiere). Solo para scripts de chequeo con --experimental-strip-types.
import { register } from 'node:module';

register(new URL('./_ts-resolve-hooks.mjs', import.meta.url));
