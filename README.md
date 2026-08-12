# sebaviglione.com

Código fuente de mi sitio personal [sebaviglione.com](https://sebaviglione.com): marca personal orientada a clientes, con desarrollo web, software de gestión, automatización e IA aplicada para empresas. Bilingüe ES/EN, export estático desplegado en Netlify.

## Stack

- Next.js (App Router, `output: "export"`) · React 19 · TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger · Framer Motion · Lenis
- Netlify (hosting + formulario de contacto)

## Estructura

```bash
.
├── app/                  # Rutas: ES en la raíz, EN bajo /en (+ sitemap y robots)
│   ├── cotizador/        # Case study (par ES/EN por slug)
│   ├── stock/            # Case study Depósitos CPS
│   └── arce/             # Case study Arce Licitaciones
├── components/           # LandingPage, CaseStudyPage (template data-driven), ArcePage…
├── lib/content.ts        # TODO el copy del sitio: objetos paralelos `es` y `en`
├── lib/site.ts           # Links de contacto y por proyecto (CVs, repos)
├── public/assets/        # Imágenes de proyectos, OG images, CVs, iconos
└── docs/                 # Fuentes de verdad de los case studies y planes
```

## Cómo editar contenido

- Todo el texto vive en `lib/content.ts`, en dos bloques paralelos `es` y `en`: **cada cambio se hace en los dos**. `const en: typeof es` fuerza paridad de claves, pero las entradas de los arrays no se chequean por tipo: revisar a mano.
- Un case study nuevo suma: sub-objeto en ambos idiomas (shape `CaseStudy`) + slug en `CaseStudySlug` + par de rutas `app/<slug>/page.tsx` y `app/en/<slug>/page.tsx` con Metadata/canonical/hreflang + entrada en `app/sitemap.ts` + OG images (`public/assets/og/<slug>-es.png` y `-en.png`, 1200×630).
- Los links externos de un proyecto (repo público, video) van en `lib/site.ts`.

## Desarrollo

```bash
npm install
npm run dev     # desarrollo local
npm run build   # export estático a out/ (lo que publica Netlify)
```
