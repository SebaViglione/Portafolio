# Case Study — Cotizador de Aberturas (Grupo CPS)

> **Para el Claude del portafolio:** este documento es la fuente de verdad del case study.
>
> - **Actualizado:** 2026-10-13, contra `~/dev/cotizador_app` (`BITACORA.md`, `docs/planes/`, `docs/winmaker/`).
> - **Uso:** armar una página de proyecto con narrativa, no un dump técnico. Donde dice `[SCREENSHOT: …]` va una captura o un mockup.
> - **Tono:** técnico pero accesible. La idea es mostrar criterio de ingeniería.
> - **Regla de Seba:** no publicar cifras nuevas de ingeniería (cantidad de tests, recetas, tipologías, lotes) ni de negocio (cotizaciones, pedidos, clientes). Las únicas cifras del case study son las dos de la historia central: **2.641 recetas `.PRO`** y **2,44× → ~1%**.

---

## 0. Metadata (para tarjetas / SEO / filtros)

| Campo | Valor |
|---|---|
| **Título** | Cotizador de aberturas de aluminio y vidrio |
| **Subtítulo** | De un cálculo paramétrico ingenuo a precios trazables, validados contra el software de fábrica |
| **Cliente / Dominio** | Grupo CPS — industria de aberturas (aluminio + vidrio) |
| **Rol** | Desarrollador full-stack único (producto, motor de cálculo, backend, base de datos, seguridad, app móvil) |
| **Tipo** | Aplicación web B2B + app móvil / herramienta comercial |
| **Estado** | Web en producción (cotizador.grupocps.com.uy), en evolución continua · app móvil en desarrollo |
| **Stack** | Next.js 16, React 19, TypeScript, TailwindCSS 4, Three.js (React Three Fiber), Supabase self-hosted (PostgreSQL + Auth), React PDF, Expo / React Native, Jest |
| **Tags** | `Full-Stack` · `Next.js` · `TypeScript` · `PostgreSQL` · `Pricing Engine` · `Reverse Engineering` · `B2B` · `Offline-first` |
| **Año** | 2026 |

---

## 1. Hero (copy listo para usar)

**Título:**
Cotizador de aberturas que da precios *creíbles*, no aproximaciones mágicas

**Bajada:**
Es una web, y ahora también una app, donde un cliente arma su pedido de ventanas de aluminio y vidrio y recibe un precio. El desafío real no fue la pantalla: fue el **motor de cálculo**.

Lo llevé de una fórmula paramétrica ingenua a una geometría trazable. La calibré con *reverse engineering* sobre **2.641 recetas reales del software de fabricación** de la empresa y la validé con pedidos de prueba que la propia fábrica valoró en ese software.

**Métrica destacada (badge grande):**
> **2,44× → ~1%**
> Diferencia en metros de perfil contra el sistema de fábrica (WinMaker). Se resolvió de forma estructural, sin coeficientes mágicos.

`[SCREENSHOT: configurador paso a paso con la vista 3D y el precio en vivo]`

---

## 2. El problema

Grupo CPS fabrica aberturas de aluminio y vidrio. Cotizar cada pedido a mano es lento y depende de personal técnico. La empresa quería una **web sencilla**: que el cliente arme su pedido, lo envíe y le hagan seguimiento.

La trampa estaba escondida en la palabra "sencilla":

- **El precio no sale de área × precio por m².** Una abertura consume varios **perfiles de aluminio** distintos (marco, hoja, contravidrio, travesaños), cada uno con su propio corte. El vidrio se mide sobre la **luz real**, no sobre la medida exterior. Además suman accesorios, mano de obra, margen e IVA.
- **El conocimiento ya existía, pero encerrado.** La empresa tenía un sistema de fabricación legacy (**WinMaker**) con **2.641 recetas `.PRO`** que calculan todo esto con precisión de ingeniería. El problema es que están en un formato propietario e ilegible.
- **El primer motor no cerraba.** Era una versión paramétrica "ingenua" (perímetro × costo/ml + área × costo/m²) y subestimaba el aluminio **2,44 veces**.

**El problema de negocio:** dar precios que un vendedor pueda defender, sin construir un software de fabricación completo y sin exponer costos ni márgenes al cliente.

---

## 3. La decisión clave (el "insight")

Había dos extremos y ninguno servía:

- **Fórmula trivial:** rápida, pero falsa.
- **Portar el motor de fábrica entero:** preciso, pero inviable.

Encontré un punto medio:

> **Extraer solo la geometría que mueve el costo**, no ejecutar las recetas completas.

La causa del 2,44× no era un coeficiente que faltaba: era **estructural**. El motor ingenuo contaba **un solo perímetro**, el del marco. Una abertura real consume **varios**: marco, contravidrio por cada paño, travesaños y parantes, cada uno con su propio descuento por lado.

Hice *reverse engineering* sobre los `.PRO` con dos herramientas propias: un **parser estático** y un **evaluador AST seguro**. Con eso leí, por tipología, las constantes geométricas reales. Esas constantes alimentan un motor *data-driven*: una receta por tipología, con cada constante citada a su `.PRO` de origen.

**El caso medido** fue un paño fijo de 1200×1000 mm con un travesaño (PRBA01 en WinMaker):

| Fuente | Perfil |
|---|---|
| Motor ingenuo (perímetro + desperdicio) | **4,75 m** |
| WinMaker (despiece real de fábrica) | **11,61 m** |
| Motor nuevo (marco + contravidrio por paño + travesaño) | **11,72 m** |

Así se pasa de un error de **2,44×** a **~1%**, sin números inventados.

**Segunda etapa: costo real.** Con la geometría resuelta, el costeo también dejó de ser plano.

- **Perfil:** se costea por rol, como peso × precio por kilo del color elegido, más el desperdicio de ese perfil.
- **Accesorios:** salen del catálogo del proveedor.
- **Mano de obra:** va por receta. Las horas se calibraron con el archivo histórico de cotizaciones de la empresa.

---

## 4. La solución

Una aplicación full-stack con un motor de cálculo puro en su núcleo:

1. **Configurador paso a paso.** El cliente elige tipología, medidas, línea, vidrio, color y accesorios en cuatro pantallas. Ve el precio en vivo, una **vista 3D** rotable (Three.js) y el dibujo técnico 2D. Puede comparar líneas y vidrios, duplicar una abertura y armar varias por pedido.
2. **Cotizar sin fricción.** Se puede cotizar sin cuenta (los datos de contacto van primero), y quien tiene cuenta guarda borradores y pedidos.
3. **Envío del pedido.** Se congela en un *snapshot*: precios y nombres del momento, y nada se recalcula en silencio.
4. **Seguimiento.** El cliente tiene "Mis pedidos" con estados alineados al tablero comercial de la empresa, y un resumen compartible por link no enumerable (token UUID).
5. **PDF.**
   - Cotización para el cliente.
   - Versión con marca propia para revendedores, que la entregan a su propio cliente.
6. **Panel interno para técnicos.**
   - Carga de las recetas por tipología: perfiles con sus cortes, accesorios, vidrios y límites fabricables.
   - Catálogos: perfiles con precio por color, accesorios, cámaras de DVH y mano de obra.
   - Parámetros: margen, IVA, desperdicios y colores con su código WinMaker.
   - Tipo de cambio del dólar tomado del Banco Central, con historial.
   - Usuarios con roles y descuentos.
   - Un tablero de "estado de carga" por receta, que muestra qué le falta (perfiles, precios, límites) para cotizar con costo real.
   - Pedidos con desglose de costo y generación del archivo para la fábrica.
7. **Del pedido web a WinMaker.** Cada pedido genera un archivo **`.pto`** que la fábrica abre en WinMaker, y WinMaker lo dibuja y lo despieza con su propia receta. El sistema legacy pasó de ser la *fuente* que había que descifrar a ser el *destino* del pedido.
8. **App móvil (en desarrollo).** Es una app Expo / React Native que **reusa el mismo motor puro** de la web. Cotiza **sin conexión** con un paquete de precios de venta descargado y tiene una cola de envío que reintenta cuando vuelve la señal. Ya está probada en Android.

**Reglas de honestidad del precio:**

- Una combinación de línea y tipología sin receta completa **no se ofrece**: el cliente solo ve lo que se puede cotizar con costo real.
- Una abertura que necesita revisión técnica se guarda **sin precio**.
- No hay estimaciones genéricas disfrazadas de precio.

El cliente **nunca** ve costos internos ni margen. Todo el cálculo con costos es server-side, y las rutas públicas devuelven DTOs sin datos sensibles.

`[SCREENSHOT: vista "Mis pedidos" con estados]`
`[SCREENSHOT: PDF de cotización con datos de ejemplo]`

---

## 5. Arquitectura

Diseño en capas, con una frontera estricta entre lo público y lo privado y con un núcleo compartido entre la web y la app:

```
Web (Next.js)  ·  App móvil (Expo)
   ↓
app/api/*                Frontera HTTP: auth, autorización, DTOs sin datos sensibles
   ↓
src/server/*             Lógica privada: pedidos, PDF, .pto, tipo de cambio, mail
   ↓
src/lib/cotizador/*      Motor de cálculo PURO (sin I/O) + variante offline para la app
   ↓
src/technical/*          Tipologías, normalización, compatibilidades, validaciones
src/shared/*             Contratos y helpers compartidos por web y móvil
   ↓
PostgreSQL               Esquema canónico (Supabase self-hosted)
```

**Decisiones de arquitectura que vale la pena destacar:**

- **Motor de cálculo puro y sin I/O.** Todo el pricing vive en funciones puras que se testean sin base de datos. Por eso la app móvil pudo reusarlo tal cual para cotizar offline.
- **Geometría desacoplada del costeo.** La migración de geometría desde los `.PRO` cambió *las cantidades* sin tocar el costeo. Más tarde el costeo real (precio por kilo y color, mano de obra por receta) entró sin tocar la geometría.
- **Snapshots inmutables.** Cada cotización guarda los nombres y costos del momento. Queda auditable y un precio enviado nunca cambia "por detrás".
- **Un solo precio, dos clientes.** La app recibe solo un paquete de **precios de venta** (nunca costos) y una verificación de paridad asegura que el cálculo offline coincide con el de la web.

`[DIAGRAMA: el diagrama de capas de arriba, renderizado lindo]`

---

## 6. Seguridad (pensada desde el diseño)

Es una herramienta comercial con datos de clientes y costos internos, así que la seguridad fue un requisito, no un agregado:

- **RLS habilitado sin policies públicas.** Todo acceso pasa por rutas server-side autenticadas, y la `service_role` vive **solo** en el servidor.
- **Guarda de auth verificada en CI.** Un test hace fallar el build si una ruta de API no tiene control de acceso.
- **Auditoría propia.** Cerró una fuga de costo y margen en una ruta pública, endureció los headers (HSTS, CSP, Permissions-Policy) y agregó rate limit a la generación de PDF.
- **Token UUID para resúmenes públicos.** Los links compartibles no son secuenciales, así que no se pueden enumerar.
- **Cotas defensivas de entrada.** Las medidas, cantidades y textos están acotados, y un color desconocido bloquea la cotización en vez de cotizar mal.
- **App sin costos.** El paquete offline de la app solo trae precios de venta.

---

## 7. Validación y calidad

- **Modo sombra.** Es un comparador que corre el motor propio contra el despiece real de WinMaker, ítem por ítem, para cuantificar el desvío **antes** de dar un precio por bueno. Así se midió el 2,44× y después el ~1%.
- **Validación con la fábrica.** Se enviaron pedidos de prueba que la fábrica valoró en WinMaker y devolvió.
  - Regla fija: **el costo interno de la web nunca queda por debajo del costo de taller de WinMaker**.
  - Cada diferencia se cierra con una causa, no se explica con un coeficiente.
- **Calibración con datos reales.** Las horas de mano de obra, los herrajes por defecto y los perfiles por defecto salieron del archivo histórico de cotizaciones de la empresa, no de supuestos.
- **Tests automatizados** del motor, las rutas y la paridad web/offline, que corren en CI junto con typecheck y lint. La app móvil tiene su propio job.
- **TypeScript estricto** en toda la base.

> Regla: no publicar la cantidad de tests ni los resultados por lote.

---

## 8. Stack técnico

- **Frontend web:** Next.js 16 (App Router), React 19, TypeScript y TailwindCSS 4. La vista 3D está hecha con React Three Fiber y el dibujo técnico 2D con SVG.
- **App móvil:** Expo / React Native, que comparte el motor puro con la web. Cotiza offline y tiene cola de envío.
- **Backend:** Route Handlers de Next.js con la lógica server-side aislada. Los PDF se generan con React PDF y el tipo de cambio sale del Banco Central.
- **Base de datos:** PostgreSQL (Supabase self-hosted en un VPS) con Auth, RLS y un numerador atómico para folios (`FOR UPDATE`).
- **Calidad:** Jest y CI con typecheck, lint, tests y verificación de paridad offline. Las fixtures salen del corpus real de fábrica.
- **Herramientas de análisis:** parser estático y evaluador AST propios para el formato `.PRO`, más el generador de `.pto` para devolver el pedido a WinMaker.

---

## 9. Mi rol y aporte

Trabajé como **desarrollador full-stack único**. Cubrí:

- Diseño de producto y modelado del dominio: aberturas, tipologías, catálogos y estados de pedido.
- Diseño e implementación del **motor de cálculo** y la migración de geometría desde el legacy.
- Backend, API, modelo de datos PostgreSQL, seguridad e infraestructura self-hosted.
- Reverse engineering del formato propietario WinMaker, ida (`.PRO`) y vuelta (`.pto`).
- Validación cuantitativa contra la fábrica.
- La app móvil offline sobre el mismo motor.

---

## 10. Aprendizajes / por qué este proyecto me representa

- **El problema difícil rara vez es el visible.** La UI era lo de menos: el valor estaba en modelar bien el dominio y validar los números.
- **Reverse engineering con criterio.** No porté 2.641 recetas a la fuerza: extraje *lo que mueve el costo* y dejé el resto fuera del producto.
- **Medir antes de afirmar.** El modo sombra convirtió una intuición ("el precio no cierra") en una métrica accionable (2,44×). La validación con la fábrica la convirtió en confianza.
- **Un núcleo puro paga dividendos.** Gracias a que el motor no tenía I/O, la app móvil offline salió reusándolo, sin reescribir el cálculo.
- **Seguridad y trazabilidad desde el día uno**, no como parche.

---

## 11. Notas de implementación para el portafolio

> Para vos, Claude del portafolio: son sugerencias, no obligaciones.

- **Lo que más vende es la historia del 2,44×.** Ponela arriba, con el badge grande. El ejemplo antes/después es el paño fijo 1200×1000: 4,75 m → 11,72 m, contra 11,61 m de WinMaker.
- **Estructura sugerida:** Hero (con métrica) → Problema → Insight → Solución → Arquitectura (con diagrama) → Validación → Stack → Rol → Aprendizajes.
- **Visuales prioritarios:**
  1. el configurador con la vista 3D;
  2. el diagrama de capas;
  3. el antes/después del cálculo;
  4. el ida y vuelta con WinMaker (`.PRO` → motor → `.pto`).
- **Tono:** primera persona, técnico pero sin jerga gratuita. Mostrar *decisiones*, no solo *features*.
- **Confidencialidad:**
  - Es un proyecto real de cliente: no publicar capturas con datos reales de clientes ni precios internos, ni datos de producción (volumen de cotizaciones o pedidos).
  - No nombrar proveedores ni líneas de aluminio.
- **Fuera del case study:** trabajo en curso que todavía no está terminado (aberturas compuestas, stock, orden de corte).
- **Call to action:** el código es privado; ofrecer "hablemos del proyecto" en vez de un link al repo.
