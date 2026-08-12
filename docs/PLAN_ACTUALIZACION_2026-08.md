# Plan de actualización — sebaviglione.com (agosto 2026)

> Generado a partir de: los 5 CVs actualizados (`~/dev/SebaViglione/CVs/`), auditoría del repo (`lib/content.ts`, componentes, rutas) y extracción del contenido vivo del sitio (ES + EN).
>
> ⚠️ **Nota de versionado:** el `.gitignore` de este repo ignora `*.md` de forma global, así que este plan NO se versiona. Si querés trackearlo, agregá una excepción (`!PLAN_*.md`) o movelo a otro lado.

---

## Cómo funciona el contenido (para todo lo que sigue)

- **Todo el copy vive en `lib/content.ts`** (855 líneas): dos objetos paralelos `es` (33-436) y `en` (438-841). `const en: typeof es` fuerza paridad de claves, pero **las entradas de arrays no se chequean** — una card agregada solo en ES compila sin error. Todo cambio se hace dos veces en ese archivo.
- Cards de proyectos-herramienta: `es.work.tools` (133-156) + `en.work.tools` (538-561). Sitios web: `sites` (157-202 / 562-607).
- Un case study = sub-objeto en el dict (ej. `cotizador`: es 329-427, en 734-832) + componente template (`components/CotizadorPage.tsx`) + par de rutas `app/<slug>/page.tsx` y `app/en/<slug>/page.tsx` con su Metadata/hreflang + entrada en `app/sitemap.ts` (lista manual, 9-16) + OG images en `public/assets/og/`.
- Links externos de un proyecto (repo público) van en `lib/site.ts` (patrón `arceMedia`).

---

## 1. Cotizador de Aberturas — enriquecer el case study

El case study actual ya es fuerte (2.641 recetas, 2,44× → ~1%, 68+ tests Jest, RLS, configurador 3D, PDF, snapshot congelado). Lo que falta, ordenado por impacto:

### 1a. El panel interno para técnicos (el hueco más grande)
Los CVs fullstack y backend lo destacan y **la página no lo menciona**: el flujo de 6 pasos actual (`es:371-377`) es 100% cara-cliente.

Agregar (como pasos de solución nuevos o una sección "El otro lado: administración"):
- Panel interno donde los técnicos cargan **recetas de fabricación y componentes reales** (perfiles, marcos, contravidrios, vidrios y costos).
- **Recetas parametrizables con reglas de resolución y fallback** (CV backend).
- **Validación de límites fabricables** y **APIs con control de acceso por rol** (CV backend).

Esto refuerza el mensaje "full-stack de punta a punta": hoy la página cuenta el producto del cliente, no el sistema de gestión detrás.

### 1b. Material técnico de `CASE_STUDY.md` que aún no está en la página
(El doc existe solo local — está gitignoreado. Elegir qué subir a `quality[]`/`security[]`/`architecture[]`/`learnings[]`, dict es:382-418):
- Parser estático + **evaluador AST seguro** del formato cerrado `.PRO` de fábrica.
- Constantes geométricas por tipología (74/126/82/148 mm).
- **Snapshots inmutables auditables** de cada pedido + numerador de folio atómico (`FOR UPDATE`).
- Auditoría de seguridad C1-C8 (origen de los fixes que la página ya lista) y conversión de moneda con fail-safe.
- Pipeline compartido entre envío directo y carrito.

### 1c. Ajustes menores
- Tags de la card (`es:134-144` / `en:539-549`): agregar `Three.js` (el 3D es diferencial y ya está en los chips del case study vía "React"... no está: chips son Next.js 16, React, TS, Tailwind 4, Supabase, PostgreSQL, RLS, Jest — **agregar Three.js ahí también** si el configurador 3D lo usa).
- Métrica del hero mezcla unidades ("2,44×" → "~1%"): precisa pero confusa de un vistazo. Opción: "error de material: de 2,4 veces a ~1%".
- `CASE_STUDY.md` dice "React 18" y estado "en desarrollo activo" — desactualizado vs. la página (React 19, año 2026). Actualizar el doc para que no contamine futuras ediciones.

---

## 2. Manejador de Stock entre Depósitos — crear el espacio

### Fase A — Card en la grilla (rápido, ~30 min)
Nueva entrada en `es.work.tools` + `en.work.tools` siguiendo el shape `Project` (content.ts:20-31):
- `kind`: "Herramienta interna · Grupo CPS" / "Internal tool · Grupo CPS"
- `domain`: "Case study" cuando exista la página; mientras tanto puede linkear `#contacto` como los servicios.
- Falta: imagen para la card (`public/assets/projects/stock/`, screenshot anonimizado o mockup).

### Fase B — Case study completo (siguiendo el patrón Cotizador, que ya maneja repo privado con `privateNote`)
Archivos a crear:
1. Sub-objeto `stock` en ambos idiomas en `lib/content.ts` (misma estructura que `cotizador`: problem/insight/solution/architecture/quality/gallery/learnings/CTA).
2. `components/StockPage.tsx` — clonar `CotizadorPage.tsx` (373 líneas, data-driven; el fork es casi solo cambiar `dict.cotizador` → `dict.stock`). Alternativa mejor: parametrizar el template para no duplicar 370 líneas.
3. `app/stock/page.tsx` + `app/en/stock/page.tsx` con Metadata + canonical + hreflang (copiar de `app/cotizador/page.tsx:4-28`).
4. Agregar `/stock` y `/en/stock` a `app/sitemap.ts:9-16` (lista manual — se olvida fácil).
5. OG images: `public/assets/og/stock-es.png` + `stock-en.png`.

### ❓ Información que falta (a completar por Seba antes de la Fase B)
El proyecto no aparece en ningún CV ni repo, así que **todo el contenido está por definir**:
- ¿Qué problema concreto resolvía? (¿stock disperso entre depósitos, conteos manuales, faltantes sorpresa?)
- Stack real (¿mismo ecosistema Next.js/Supabase del cotizador, u otra cosa?)
- Features reales: ¿transferencias entre depósitos, trazabilidad de movimientos, alertas de mínimos, roles?
- Métricas para el hero: nº de depósitos, artículos gestionados, horas ahorradas, etc.
- Año, y si hay screenshots/video mostrables (anonimizando datos de la empresa).

---

## 3. Skills y perfil — sincronizar con los CVs

- **`stackGroups`** (es:86-93 / en:491-498): agregar **Supabase** (en Backend/APIs, como en el CV fullstack), **Three.js** (Desarrollo web) y **Jest/Testing**. Hoy el propio case study estrella usa Supabase+RLS+Jest y la sección de skills no los lista.
- **Sincronizar `knowsAbout`** del JSON-LD en `app/layout.tsx:62-73` con la misma lista (hoy también omite Supabase/Jest).
- **Inconsistencia de título** en la home ES: hero dice "Developer en Grupo CPS" (es:61) y About dice "Developer & Systems Technician" — unificar (los CVs usan "Developer & Systems Technician").
- **Paridad ES/EN del About**: el EN nombra Universidad de Montevideo, el CAE y el framing "end-to-end/full-stack"; el ES quedó más liviano. Emparejar hacia arriba.
- **CV descargable**: `public/assets/cv/CV_Sebastian_Viglione.pdf` (linkeado desde `lib/site.ts:5`) — reemplazar por la versión nueva (`~/dev/SebaViglione/CVs/all resumes/...`; decidir variante: ¿default ES, o par ES/EN?). Ojo: hay una copia vieja duplicada trackeada en `assets/` (raíz) que conviene borrar.

---

## 4. Arce — mini refresh (opcional, bajo esfuerzo)

- La página no atribuye cliente (el Cotizador sí dice Grupo CPS); los CVs lo presentan como "desarrollado en Grupo CPS". Agregar la atribución da coherencia.
- El README del perfil de GitHub ahora tiene copy más rico y verificado contra el repo (RSS cada 15 min vía n8n, Puppeteer para el detalle, extracción multi-formato PDF/DOC/DOCX/XLS/ZIP con chunking, detección de visitas técnicas): se puede espejar algo de eso en `solution[]`/`architecture[]` (dict es:259-327).
- Divergencia ES/EN en la card de Open Gym ("presentación de gimnasio" vs "gym discovery platform") — unificar mensaje.

---

## 5. Housekeeping del repo (hallazgos de la auditoría)

Prioridad media:
- **`README.md` del repo está mal**: apunta a `lib/site.ts` como archivo de contenido (el real es `lib/content.ts`), lista TODOs inexistentes (WhatsApp/Instagram/TikTok en site.ts) y cita `reforma.md` como brief activo.
- **Docs muertos**: `RECORDATORIO.md` (4 ítems, todos shipped) y `correcciones.md` (5 ítems, todos shipped) — archivar o borrar. `estructura.md`/`reforma.md` son históricos (recomiendan Next 14; el repo está en Next 16.2/React 19/Tailwind 4).
- **Decisión de `.gitignore`**: el `*.md` global deja sin versionar `CASE_STUDY.md` (fuente de verdad del case study) y este plan. Sugerencia: `!CASE_STUDY.md` + `!PLAN_*.md`.
- **Assets legacy en `assets/` (raíz)**: originales png, webm de arce, Favicon.ico y un CV viejo, todo trackeado y sin uso por la app (lo servido sale de `public/assets/`). Limpiar.
- **`tsconfig.tsbuildinfo` commiteado** (artefacto de build) — agregar al gitignore.
- **`data/` vacío** en la raíz, sin referencias — borrar.
- `package.json` sigue en `2.0.0` con commit "portfolio 2.1" — bump trivial.
- `sitemap.ts` usa `lastModified: new Date()` → cada deploy marca todas las páginas como modificadas. Menor, pero si se quiere SEO fino, fechar por ruta.

Prioridad baja / ideas:
- 4 de las 6 cards (Force Crossfit, Open Gym, Grupo CPS, Edificio Galicia) no tienen case study — quedan flacas al lado de las dos profundas. Opción barata: mini case studies de 1 pantalla, o al menos galería + "qué resolvió".
- `reforma.md` planeaba Instagram/TikTok como fuentes de tráfico y nunca se agregaron los links — decidir si va o se descarta.

---

## Orden de ejecución sugerido

| # | Bloque | Esfuerzo | Depende de |
|---|--------|----------|------------|
| 1 | Quick wins: skills + knowsAbout + título unificado + CV pdf nuevo + tags cotizador | 1 sesión corta | nada |
| 2 | Cotizador: panel técnico + material de CASE_STUDY.md (solo edita `lib/content.ts`) | 1 sesión | nada |
| 3 | Stock Fase A (card) | 30 min | 1 imagen |
| 4 | Stock Fase B (case study) | 1-2 sesiones | checklist de la sección 2 respondido |
| 5 | Housekeeping (README, docs muertos, gitignore, assets) | 1 sesión corta | nada |
| 6 | Opcionales: Arce refresh, paridad ES/EN, mini case studies de sitios | a demanda | nada |

Todo lo que toca contenido se hace **siempre en los dos bloques (`es` y `en`) de `lib/content.ts`**, y toda página nueva suma: par de rutas + sitemap + OG images.
