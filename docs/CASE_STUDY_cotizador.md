# Case Study — Cotizador de Aberturas (Grupo CPS / Dialum)

> **Para el Claude del portafolio:** este documento es la fuente de verdad del case study. Está pensado para que armes una página de proyecto con narrativa (no un dump técnico). Usá las secciones tal cual o reordénalas según el diseño del portafolio. Donde digo `[SCREENSHOT: …]` va una captura/mockup. El copy de hero y los bullets ya están redactados para usarse casi literal. Tono: técnico pero accesible, orientado a demostrar criterio de ingeniería, no solo "hice una web".

---

## 0. Metadata (para tarjetas / SEO / filtros)

| Campo | Valor |
|---|---|
| **Título** | Cotizador de aberturas de aluminio y vidrio |
| **Subtítulo** | De un cálculo paramétrico ingenuo a precios trazables, validados contra el software de fábrica |
| **Cliente / Dominio** | Grupo CPS / Dialum — industria de aberturas (aluminio + vidrio) |
| **Rol** | Desarrollador full-stack (diseño de producto, motor de cálculo, backend, base de datos, seguridad) |
| **Tipo** | Aplicación web B2B / herramienta comercial |
| **Estado** | En producción — en evolución continua |
| **Stack** | Next.js 16, React 19, TypeScript, TailwindCSS 4, Three.js, Supabase (PostgreSQL + Auth + RLS), Jest |
| **Tags** | `Full-Stack` · `Next.js` · `TypeScript` · `Supabase` · `Pricing Engine` · `Reverse Engineering` · `B2B` |
| **Año** | 2026 |

---

## 1. Hero (copy listo para usar)

**Título:**
Cotizador de aberturas que da precios *creíbles*, no aproximaciones mágicas

**Bajada:**
Una web donde un cliente arma su pedido de ventanas de aluminio y vidrio y recibe un precio estimado. El desafío real no fue la pantalla: fue el **motor de cálculo**. Lo llevé de una fórmula paramétrica ingenua a una geometría trazable, calibrada haciendo *reverse engineering* sobre **2.641 recetas reales del software de fabricación** de la empresa.

**Métrica destacada (badge grande):**
> **2,44× → ~1%**
> Reducción del error de cálculo de material contra el sistema de fábrica (WinMaker), resuelto de forma estructural, sin coeficientes mágicos.

`[SCREENSHOT: configurador técnico de una ventana con preview SVG]`

---

## 2. El problema

Grupo CPS / Dialum fabrica aberturas de aluminio y vidrio. Cotizar manualmente cada pedido es lento y depende de personal técnico. Querían una **web sencilla** donde el cliente se registre, arme un carrito con sus ventanas, envíe el pedido y le hagan seguimiento.

La trampa estaba escondida en la palabra "sencilla":

- Un precio de abertura **no** sale de multiplicar área por un precio por metro cuadrado. Depende de cuántos **perfiles de aluminio** reales consume cada tipología (marco, hoja, contravidrio, travesaños), del **vidrio sobre la luz real** (la medida interna, no la externa), de herrajes, accesorios, mano de obra, margen e IVA.
- La empresa ya tenía un sistema de fabricación legacy (**WinMaker**) con **2.641 recetas `.PRO`** que calculan esto con precisión de ingeniería — pero es un formato propietario, ilegible, imposible de exponer en una web.
- Un primer motor paramétrico "ingenuo" (perímetro × costo/ml + área × costo/m²) daba precios **que no cerraban**: subestimaba el aluminio en un **2,44×**.

**El problema de negocio:** dar precios que un vendedor pueda defender, sin construir un software de fabricación completo ni exponer datos internos (costos, márgenes) al cliente.

---

## 3. La decisión clave (el "insight")

En vez de elegir entre los dos extremos —fórmula trivial (rápida pero falsa) vs. portar el motor de fábrica entero (preciso pero inviable)— encontré el punto medio:

> **Extraer solo la geometría que mueve el costo**, no ejecutar las recetas completas.

La causa del error 2,44× no era un coeficiente que faltaba: era **estructural**. El motor ingenuo contaba **un solo perímetro** (el marco). Cada abertura real consume **varios**: marco + hoja(s) + contravidrio + travesaños/parantes, cada uno con su propio descuento por lado. Y el vidrio se calcula sobre la **luz real** (medida exterior menos los descuentos de alojamiento), no sobre el área bruta.

Hice *reverse engineering* sobre los `.PRO`: construí un **parser estático** y un **evaluador AST seguro** para leer, por tipología, las constantes geométricas reales (ej. paño fijo descuenta 74 mm; batiente 126; corrediza 82/148 por hoja). Esas constantes alimentan el costeo paramétrico que ya existía — **solo cambian las cantidades, no la arquitectura de precios**.

Resultado: para un paño fijo de 1000×1000, el perfil real pasó de 4,32 m (estimación ingenua) a **~7,7 m** (marco 4,0 m + contravidrio 3,69 m), explicando el 2,44× sin números inventados.

---

## 4. La solución

Una aplicación web full-stack con un motor de cálculo en su núcleo:

1. **Registro / Login** — cuenta propia por cliente (Supabase Auth).
2. **Configurador técnico** — el cliente arma una abertura: tipología, medidas, línea de aluminio, vidrio, color, accesorios. Vista 3D de la ventana (Three.js), rotable desde cualquier ángulo.
3. **Carrito** — varias ventanas por pedido, como una cotización "Borrador" multi-ítem.
4. **Envío del pedido** — se congela en un *snapshot* (precios y nombres del momento; nada se recalcula en silencio).
5. **Seguimiento** — el cliente ve sus pedidos y el estado en "Mis pedidos"; resumen público compartible por link no enumerable (token UUID).
6. **Panel interno para técnicos** — carga y mantenimiento de la información técnica que alimenta el motor: recetas parametrizables (perfiles con cortes, accesorios, vidrios, límites fabricables), catálogos (perfiles, tiras, herrajes, cámaras DVH, mano de obra por estación), parámetros globales (margen, IVA, desperdicios, colores con código WinMaker, tasa USD/UYU) y usuarios con roles/descuentos. Incluye un "estado de carga" con semáforo por receta (rojo/amarillo/verde según qué falta para costo real) y fallback: lo que no tiene receta cotiza por estimación con el modelo genérico, marcado como tal.

El cliente **nunca** ve costos internos, margen ni precio por m². Todo el cálculo es server-side; los endpoints públicos devuelven DTOs sin datos sensibles.

`[SCREENSHOT: vista "Mis pedidos" con estados]`
`[SCREENSHOT: resumen comercial de una cotización]`

---

## 5. Arquitectura

Diseño en capas con una frontera estricta entre lo público y lo privado:

```
Navegador  (configurador · carrito · mis-pedidos)
   ↓
app/api/*            Frontera HTTP: auth, autorización, DTOs (sin datos sensibles)
   ↓
src/server/*         Lógica privada: consultas, persistencia, service-role
   ↓
src/lib/cotizador/*  Motor de cálculo PURO (sin I/O, 100% testeable)
   ↓
src/technical/*      Tipos, normalización, compatibilidades, validaciones
   ↓
supabase/schema.sql  PostgreSQL canónico con Row-Level Security
```

**Decisiones de arquitectura que vale la pena destacar:**

- **Motor de cálculo puro y sin I/O** — todo el pricing vive en funciones puras, testeables sin base de datos. La geometría es *data-driven*: una receta por tipología, con constantes citadas a su `.PRO` de origen.
- **Geometría desacoplada del costeo** — la migración PRO→motor cambió *las cantidades*, conservando intacto el costeo paramétrico (costo/ml, costo/m², herrajes, margen, IVA). Cero acoplamiento.
- **Snapshots inmutables** — cada cotización guarda los nombres y costos del momento. Auditable; nunca cambia un precio enviado "por detrás".
- **Reuso entre flujos** — envío directo (1 ventana) y carrito (multi-ítem) comparten el mismo pipeline de armado y cálculo de ítem.

`[DIAGRAMA: el diagrama de capas de arriba, renderizado lindo]`

---

## 6. Seguridad (pensada desde el diseño)

Tratándose de una herramienta comercial con datos de clientes y costos internos, la seguridad fue requisito, no agregado:

- **RLS habilitado sin policies públicas** — todo acceso pasa por rutas server-side autenticadas. La `service_role` vive **solo** en el servidor.
- **Token UUID para resúmenes públicos** — cerré un IDOR / enumeración: los links compartibles no son secuenciales.
- **Cero PII filtrada** — el payload técnico se guarda sin datos de contacto duplicados.
- **Cotas defensivas de entrada** — medidas ≤ 6000 mm, cantidades enteras acotadas, textos limitados al tamaño de columna. Nada de inputs sin clamp.
- **Separación de moneda y costos** — convención explícita de moneda base + factor de conversión con *fail-safe* (degrada a factor 1, no rompe).

Estas correcciones salieron de una auditoría propia del código (catalogadas C1–C8), no de un incidente.

---

## 7. Calidad e ingeniería

| Métrica | Valor |
|---|---|
| Recetas de fábrica analizadas (reverse engineering) | **2.641 `.PRO`** |
| Tests automatizados (Jest) | **68+** (unitarios + integración + "modo sombra") |
| Reducción de error de material vs. WinMaker | **2,44× → ~1%** (tipología validada) |
| Cobertura del motor | geometría confirmada para todas las tipologías web |
| Type-safety | TypeScript estricto, `typecheck` en verde |

**El "modo sombra":** construí un comparador que corre el motor propio contra el despiece real de WinMaker, ítem por ítem, para cuantificar el desvío por tipología **antes** de dar un precio por bueno. Es la diferencia entre "creo que está bien" y "lo medí".

---

## 8. Stack técnico

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4. Configurador con vista 3D de la ventana en Three.js.
- **Backend:** Route Handlers de Next.js, lógica server-side aislada, motor de cálculo puro.
- **Base de datos:** Supabase (PostgreSQL) con RLS, Auth, numerador atómico para folios (`FOR UPDATE`).
- **Calidad:** Jest + ts-jest, suite en modo *runInBand*, fixtures derivadas del corpus real de fábrica.
- **Herramientas de análisis:** parser estático + evaluador AST propio para el formato `.PRO` legacy.

---

## 9. Mi rol y aporte

Trabajé como **desarrollador full-stack único**, cubriendo:

- Diseño de producto y modelado del dominio (aberturas, tipologías, catálogos, estados de pedido).
- Diseño e implementación del **motor de cálculo** y la migración de geometría desde el legacy.
- Backend, API, modelo de datos PostgreSQL y políticas de seguridad / RLS.
- Reverse engineering del formato propietario WinMaker (parser + evaluador).
- Suite de tests y validación cuantitativa contra el sistema de fábrica.

---

## 10. Aprendizajes / por qué este proyecto me representa

- **El problema difícil rara vez es el visible.** La UI era lo de menos; el valor estaba en modelar bien el dominio y validar los números.
- **Reverse engineering con criterio:** no porté 2.641 recetas a la fuerza; extraje *lo que mueve el costo* y dejé el resto como track de investigación paralelo, sin contaminar el producto.
- **Medir antes de afirmar.** El "modo sombra" convirtió una intuición ("el precio no cierra") en una métrica accionable (2,44×) y después en una validación (~1%).
- **Seguridad y trazabilidad desde el día uno**, no como parche.

---

## 11. Notas de implementación para el portafolio

> Para vos, Claude del portafolio — sugerencias, no obligaciones:

- **Lo que más vende acá es la historia del 2,44×.** Ponela arriba, con el badge grande. Es concreta, medible y demuestra criterio de ingeniería, no solo ejecución.
- **Estructura sugerida de la página:** Hero (con métrica) → Problema → Insight/Decisión clave → Solución → Arquitectura (con diagrama) → Métricas/Calidad → Stack → Rol → Aprendizajes.
- **Visuales prioritarios:** (1) configurador con preview SVG de la ventana, (2) diagrama de capas, (3) el "antes/después" del cálculo (4,32 m → 7,7 m), (4) tabla de métricas.
- **Tono:** primera persona, técnico pero sin jerga gratuita. Mostrar *decisiones*, no solo *features*.
- **Si el portafolio tiene secciones colapsables**, el reverse engineering de WinMaker es ideal como "deep dive" opcional para quien quiera el detalle.
- **Confidencialidad:** es un proyecto real de cliente. No publicar capturas con datos reales de clientes ni precios internos; usar datos de ejemplo o blur. El nombre "Grupo CPS / Dialum" puede mencionarse o anonimizarse como "una empresa de aberturas" según prefiera Seba.
- **Call to action:** el código es privado; ofrecer "hablemos del proyecto" en vez de link a repo.
