# Estructura y animaciones — sebaviglione.com

Stack recomendado: **Next.js 14 + Tailwind CSS + Framer Motion + GSAP**

```
npm install framer-motion gsap @gsap/react lenis
```

- **Framer Motion** — animaciones de componentes React, scroll-triggered, layout animations
- **GSAP** — animaciones de texto carácter a carácter, timelines complejos, ScrollTrigger
- **Lenis** — scroll suave tipo buttered (reemplaza el scroll nativo del browser)

---

## [NAVBAR]

Barra fija en la parte superior, transparente al inicio y con fondo blur al hacer scroll.

**Contenido:**
- Logo / nombre `seba viglione` a la izquierda en Space Grotesk
- Links de navegación a la derecha: `trabajos`, `servicios`, `contacto`
- Botón CTA pequeño: `hablemos` con borde lima

**Animaciones:**
- Al cargar: fade in + slide down con Framer Motion (`initial: y: -20, opacity: 0`)
- Al scrollear hacia abajo: `backdrop-blur`, fondo `#0F1115` con `opacity: 0.9`, transición suave
- El botón `hablemos` tiene hover con glow sutil lima (`box-shadow: 0 0 12px #B8FF2C40`)
- En mobile: hamburger menu con animación de las líneas convirtiéndose en X (GSAP timeline)
- Los links del nav tienen un underline animado que crece desde el centro al hover

---

## [HERO]

La primera impresión. Pantalla completa. Todo el peso visual acá.

**Contenido:**
```
[tag pequeño arriba]  ● disponible para proyectos

[título principal — H1]
Hago software
que funciona
para tu negocio.

[bajada]
Desarrollo aplicaciones web, sistemas de gestión y herramientas
con IA para empresas que necesitan soluciones reales, no genéricas.

[CTAs]
[→ Hablemos por WhatsApp]   [Ver trabajos ↓]

[scroll indicator animado abajo]
```

**Animaciones:**
- El tag "disponible" aparece primero con fade + slide desde arriba (delay 0.2s)
- El punto verde del tag pulsa en loop suave (CSS animation `pulse`)
- El título entra letra por letra con GSAP `SplitText` — cada carácter cae desde arriba con stagger de 0.03s
- La bajada aparece con fade in una vez que termina el título (delay ~1s)
- Los botones entran con slide up + fade (delay 1.3s)
- Fondo: partículas sutiles o grid de puntos animado con canvas (sin exagerar, solo textura)
  - Opción A: grid de puntos `#2B3038` que se deforman levemente al mover el mouse (GSAP + mousemove)
  - Opción B: líneas de código que caen verticalmente muy tenues (CSS animation, opacity ~0.04)
- El scroll indicator es una línea vertical con un punto que baja y rebota en loop
- Parallax sutil en el texto al mover el mouse (GSAP + mousemove, intensidad baja)

**Efecto especial en el título:**
La palabra `funciona` tiene highlight en lima — un subrayado que se "pinta" de izquierda a derecha al entrar (GSAP `scaleX` de 0 a 1 en un `::after` pseudo-elemento).

---

## [SECTION 1 — Servicios]

Cuatro cards de servicios. Fondo `#171A20` para contrastar con el hero.

**Contenido:**
```
[label pequeño]  qué puedo hacer por tu empresa

[título H2]
Soluciones a medida,
sin vueltas.

[Grid 2x2 de cards]

┌─────────────────────┐  ┌─────────────────────┐
│ ◈  Desarrollo web   │  │ ◈  Software de       │
│                     │  │    gestión           │
│ Sitios y apps que   │  │                     │
│ representan bien    │  │ Sistemas para        │
│ tu empresa...       │  │ manejar tu           │
│                     │  │ operación...         │
│ [→ Más info]        │  │ [→ Más info]         │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│ ◈  Automatización   │  │ ◈  IA aplicada       │
│                     │  │                     │
│ Procesos repetitivos│  │ Herramientas que     │
│ que hoy hacés a     │  │ usan IA para tu      │
│ mano...             │  │ negocio específico..│
│ [→ Más info]        │  │ [→ Más info]         │
└─────────────────────┘  └─────────────────────┘
```

**Animaciones:**
- El título entra con GSAP ScrollTrigger: fade + slide up al entrar al viewport
- Las cards entran en stagger: la primera, luego 0.15s después la segunda, etc.
- Cada card tiene hover state complejo:
  - Fondo sube levemente de oscuridad (`#20242C` → `#252930`)
  - El borde izquierdo se ilumina en lima (border-left de transparente a `#B8FF2C`)
  - El ícono rota 5° y escala 1.1x (Framer Motion `whileHover`)
  - El texto `→ Más info` se mueve 4px a la derecha con transición suave
  - Toda la card sube 4px (`translateY: -4px`) con sombra lima muy sutil debajo
- El ícono `◈` de cada card es SVG personalizado que se dibuja (stroke-dashoffset) al entrar al viewport

---

## [SECTION 2 — Trabajos]

Los tres proyectos reales. Fondo `#0F1115` (vuelve al principal).

**Contenido:**
```
[label]  trabajos recientes

[título H2]
Cosas que hice
que ya están funcionando.

[Cards de proyectos — layout horizontal scrolleable en mobile, 3 columnas en desktop]

┌──────────────────────────────┐
│  [screenshot / imagen]       │
│  ──────────────────────────  │
│  Force Crossfit              │
│  Sitio web para gimnasio     │
│  de crossfit en Montevideo.  │
│                              │
│  [→ Ver sitio ↗]             │
└──────────────────────────────┘
```
(repetir para Open Gym y Grupo CPS)

**Animaciones:**
- Las cards entran con un efecto "reveal": un overlay de color lima que corre de izquierda a derecha y descubre la card debajo (GSAP + ScrollTrigger)
- La imagen dentro de la card tiene zoom-in muy sutil al hover (`scale: 1.04`, `overflow: hidden` en el contenedor)
- En desktop: al hacer hover en una card, las otras dos bajan levemente la opacidad (`opacity: 0.5`) — foco en la activa
- El link `Ver sitio ↗` tiene el ícono de flecha que se mueve diagonal al hover
- En mobile: scroll horizontal con snap points, las cards se ven de a una

**Efecto imagen:**
Usar `next/image` con un skeleton loader animado (shimmer effect) mientras carga.  
Si no hay screenshot disponible, placeholder con el logo del cliente sobre fondo `#20242C` con pattern de puntos.

---

## [SECTION 3 — Por qué trabajar conmigo]

Sección de diferenciación. Fondo `#171A20`. Tono más personal, no corporativo.

**Contenido:**
```
[título H2]
Sin agencias en el medio.
Hablás directo conmigo.

[3 items horizontales]

01                    02                    03
Trato directo         Sin burocracia        A tu medida
─────────────         ──────────────        ───────────
Sabés con quién       Si algo no            El presupuesto
estás hablando        funciona, se          y el alcance
desde el primer       corrige rápido.       se adaptan a
mensaje.              Sin tickets.          lo que tenés.
```

**Animaciones:**
- El número `01`, `02`, `03` se cuenta animado del 0 al número final cuando entra al viewport (GSAP CountUp)
- La línea horizontal debajo de cada título se dibuja de izquierda a derecha con `scaleX` (GSAP ScrollTrigger)
- Los tres bloques entran en stagger horizontal
- Fondo de la sección con un elemento decorativo sutil: texto enorme `SEBA` en `#1A1E26` (casi invisible) detrás del contenido, con parallax al scroll

---

## [SECTION 4 — Contacto]

La sección final. Todo apunta acá. Fondo `#0F1115`.

**Contenido:**
```
[título H1-size]
¿Tenés un proyecto
en mente?

[bajada]
Contame qué necesitás. Sin compromisos, sin tecnicismos.
Si puedo ayudarte, te lo digo. Si no, también.

[Formulario]
┌─────────────────────────────────────────────────┐
│  Tu nombre                                      │
│ ────────────────────────────────────────────── │
│  Tu empresa (opcional)                          │
│ ────────────────────────────────────────────── │
│  ¿En qué puedo ayudarte?                        │
│                                                 │
│                                                 │
│ ────────────────────────────────────────────── │
│                   [Mandar mensaje →]            │
└─────────────────────────────────────────────────┘

[O si preferís algo más directo:]
[  WhatsApp ↗  ]     [  Mail ↗  ]

[Links de redes]
Instagram · TikTok · LinkedIn
```

**Animaciones:**
- El título tiene el mismo efecto de entrada letra por letra que el hero, pero más rápido (stagger 0.02s)
- Los inputs del formulario tienen un focus state con borde lima animado que crece desde el centro
- Al hacer focus en un input, el label flota hacia arriba (floating label pattern)
- El botón submit tiene un estado de loading: el texto cambia a puntos que pulsan, luego check verde
- Al enviar exitosamente: confetti sutil en lima y blanco cae desde arriba (canvas, ~1.5s, no exagerado)
- Los botones de WhatsApp y Mail tienen hover con scale y glow
- Los links de redes tienen un hover que rota el ícono 10° y cambia color a lima

---

## [FOOTER]

M�nimo. Una línea.

```
sebaviglione.com · 2025   ─────────────────   hecho por mí, obviamente.
```

**Animaciones:**
- Fade in simple al llegar al final de la página
- El texto `hecho por mí, obviamente.` aparece como si se estuviera escribiendo solo (typewriter con cursor parpadeante)

---

## Efectos globales y de scroll

### Lenis (smooth scroll)
```js
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
```
Toda la página tiene scroll buttered. Hace que todo se sienta más premium sin tocar una sola animación.

### Cursor personalizado (desktop)
- Círculo pequeño (`12px`) en lima que sigue al cursor con lag (GSAP `quickTo`)
- Al hacer hover en links o botones: el círculo crece a `40px` y cambia a outline
- Al hacer hover en las cards de proyectos: el círculo muestra el texto `VER` en el centro
- En mobile: se desactiva, cursor normal

### Page load sequence (orden de aparición)
```
0.0s  — fondo oscuro aparece instantáneo
0.1s  — navbar hace fade in
0.3s  — tag "disponible" entra
0.5s  — título empieza a aparecer letra por letra (~0.8s de duración)
1.3s  — bajada hace fade in
1.5s  — botones entran
1.7s  — scroll indicator aparece
```
Sin loader/splash screen. La carga tiene que ser instantánea.

### ScrollTrigger general
Todas las secciones usan `trigger: "top 80%"` — las animaciones disparan antes de que el elemento esté completamente visible, para que la entrada se sienta natural y no forzada.

### Transición entre secciones
El cambio de `#0F1115` a `#171A20` entre secciones se hace con un overlap sutil — las secciones no tienen un corte duro, sino que una "empuja" a la otra.

---

## Dependencias finales

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "framer-motion": "^11.x",
    "gsap": "^3.12.x",
    "@gsap/react": "^2.x",
    "lenis": "^1.x",
    "tailwindcss": "^3.x"
  }
}
```

**Plugins GSAP necesarios:**
- `ScrollTrigger` — animaciones al hacer scroll
- `SplitText` — animaciones letra por letra en títulos *(requiere GSAP Club o versión gratuita con limitaciones)*
- `TextPlugin` — efecto typewriter en el footer

> **Nota sobre SplitText:** si no se tiene licencia GSAP Club, se puede reemplazar con la librería `split-type` (MIT license) que hace lo mismo: `npm install split-type`
