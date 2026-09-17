# sebaviglione.com

Código fuente de mi sitio personal [sebaviglione.com](https://sebaviglione.com): perfil de desarrollador backend con case studies de los sistemas que construí (Cotizador, Depósitos CPS, Arce). El contenido comercial para empresas vive en `/servicios`, sin enlace desde la navegación. Bilingüe ES/EN, export estático desplegado en Netlify.

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
│   ├── arce/             # Case study Arce Licitaciones
│   └── servicios/        # Página comercial (servicios, sitios institucionales)
├── components/           # LandingPage, CaseStudyPage (template de los 3 case studies), ServicesPage…
├── lib/content.ts        # TODO el copy del sitio: objetos paralelos `es` y `en`
├── lib/site.ts           # Links de contacto y por proyecto (repos, video)
├── public/assets/        # Imágenes de proyectos, OG images, iconos
└── docs/                 # Fuentes de verdad de los case studies y planes
```

## Cómo editar contenido

- Todo el texto vive en `lib/content.ts`, en dos bloques paralelos `es` y `en`: **cada cambio se hace en los dos**. `const en: typeof es` fuerza paridad de claves, pero las entradas de los arrays no se chequean por tipo: revisar a mano.
- Un case study nuevo suma: sub-objeto en ambos idiomas (shape `CaseStudy`, con los cinco puntos numerados: problema, restricciones, decisiones, descartes, resultado) + slug en `CaseStudySlug` + par de rutas `app/<slug>/page.tsx` y `app/en/<slug>/page.tsx` con Metadata/canonical/hreflang + entrada en `app/sitemap.ts` + OG images (`public/assets/og/<slug>-es.png` y `-en.png`, 1200×630).
- Los links externos de un proyecto (repo público, video) van en `lib/site.ts`.

## Desarrollo

```bash
npm install
npm run dev     # desarrollo local
npm run build   # export estático a out/ (lo que publica Netlify)
```
