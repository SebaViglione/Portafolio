# Brief: Rediseño de sebaviglione.com
**Para:** Agente de código  
**Objetivo:** Transformar el portafolio de empleado buscando trabajo en un sitio de marca personal orientado a conseguir clientes (pymes y empresas) para desarrollo de software a medida.

---

## 1. Contexto y objetivo

El sitio deja de ser un portafolio técnico para recruiters. Pasa a ser la base de operaciones de la marca personal de Sebastián Viglione: desarrollador de software que construye soluciones digitales para empresas que las necesitan pero no saben por dónde empezar.

El visitante objetivo es un dueño de pyme, gerente o responsable de una empresa que llegó al sitio desde redes sociales (Instagram, TikTok) o por recomendación. No es técnico. No le importan los stacks. Le importa si Seba puede resolver su problema.

**Acción principal que debe tomar el visitante:** contactar directamente (WhatsApp o mail). Todo el sitio tiene que apuntar a eso.

---

## 2. Tono y voz

- Cercano, directo y sin humo. Nada de "potencio tu negocio al siguiente nivel" ni "soluciones innovadoras".
- Hablar como una persona real, no como una agencia.
- Mostrar criterio y experiencia sin sonar arrogante.
- Los textos de ejemplo en este brief son orientativos; el agente puede mejorarlos manteniendo el tono.

**Evitar absolutamente:**
- Frases motivacionales o de guru
- Anglicismos innecesarios
- Listas de tecnologías como protagonistas
- Autodenominarse "experto" o "especialista" sin contexto

---

## 3. Estructura del sitio (una sola página)

### 3.1 Hero
Presentación breve y directa. Quién es, qué hace, para quién.

Ejemplo de copy orientativo:
> **"Hago software que funciona para tu negocio."**  
> Desarrollo aplicaciones web, sistemas de gestión y herramientas con IA para empresas que necesitan soluciones reales, no genéricas.  
> [Botón primario: Hablemos por WhatsApp] [Botón secundario: Ver trabajos]

El hero tiene que tener peso visual. Nombre grande, bajada clara, CTA visible.

---

### 3.2 Qué hago (Servicios)

No listar tecnologías. Describir qué problemas resuelve. Tres o cuatro bloques tipo card:

**Desarrollo web**  
Sitios y aplicaciones web que representan bien tu empresa y funcionan en cualquier dispositivo. Desde una landing hasta un sistema complejo.

**Software de gestión**  
Sistemas hechos a medida para manejar producción, stock, turnos, clientes o lo que tu operación necesite. Sin pagar por funciones que nunca vas a usar.

**Automatización e IA aplicada**  
Procesos que hoy hacés a mano y podrían automatizarse. Desde respuestas automáticas hasta análisis de datos internos.

*(El agente puede reformular estos textos manteniendo el criterio: problema → solución, sin mencionar tecnologías específicas)*

---

### 3.3 Trabajos

Sección de casos reales. Mostrar las tres webs existentes como cards con screenshot o imagen representativa, nombre del proyecto, descripción breve de qué se hizo y link al sitio.

**Proyectos a incluir:**

1. **Force Crossfit** — `forcebox4c.com.uy`  
   Sitio web para gimnasio de crossfit. [Incluir screenshot o imagen del sitio]

2. **Open Gym** — `opengym.uy`  
   Sitio web para gimnasio. [Incluir screenshot o imagen del sitio]

3. **Grupo CPS** — `grupocps.com.uy`  
   Sitio web para empresa constructora. [Incluir screenshot o imagen del sitio]

> **Nota:** No mencionar que Seba trabaja en Grupo CPS. Presentarlo simplemente como un trabajo realizado.

Si no se pueden generar screenshots automáticamente, dejar los cards con placeholder visual y espacio para que Seba pegue las imágenes manualmente.

---

### 3.4 Por qué trabajar conmigo

Sección corta, sin soberbia. Tres puntos que diferencian trabajar con una persona vs una agencia grande:

- Trato directo: hablás con quien hace el trabajo
- Sin burocracia: si algo no funciona, se corrige rápido
- Soluciones que se adaptan al presupuesto y al problema real

*(Reformular con el tono del sitio, evitar sonar defensivo o comparativo)*

---

### 3.5 Contacto

Sección final con CTA claro. Formulario simple (nombre, empresa, mensaje) + botón de WhatsApp bien visible + mail.

Copy orientativo:
> **"¿Tenés un proyecto en mente?"**  
> Contame qué necesitás. Sin compromisos, sin tecnicismos. Si puedo ayudarte, te lo digo; si no, también.

Incluir íconos de redes sociales (Instagram, TikTok, LinkedIn) como links secundarios, para que quien llegó desde redes pueda seguirlo desde ahí también.

---

## 4. Diseño

### 4.1 Paleta de colores

```
/* Modo oscuro (principal) */
--color-bg-primary:     #0F1115;   /* Deep Graphite — fondo general */
--color-bg-secondary:   #171A20;   /* Charcoal — secciones alternas */
--color-bg-card:        #20242C;   /* Soft Graphite — cards y módulos */
--color-text-primary:   #F5F7FA;   /* Off White */
--color-text-secondary: #A8B0BD;   /* Cool Gray */
--color-text-muted:     #6F7785;   /* Muted Gray */
--color-accent:         #B8FF2C;   /* Tech Lime — acento principal */
--color-accent-hover:   #8FD80F;   /* Lime Deep — hover */
--color-accent-soft:    #D9FF8A;   /* Lime Glow — highlights */
--color-border:         #2B3038;   /* Border Graphite */

/* Modo claro (alternativo, para secciones puntuales si aplica) */
--color-bg-light:       #F7F7F2;
--color-bg-light-gray:  #E7E8E3;
--color-text-ink:       #15171A;
--color-text-slate:     #4C5563;
--color-accent-light:   #A7F000;
--color-border-light:   #D7D9D2;
```

**Proporción de uso:**
- 70% fondos oscuros/neutros
- 20% grises, blancos, superficies
- 10% lima como acento

**El lima va en:** botones primarios, underlines de énfasis, tags, hover states, indicador de disponibilidad, bordes de cards destacadas. **No en bloques grandes ni en párrafos de texto.**

---

### 4.2 Tipografía

```css
/* Títulos */
font-family: 'Space Grotesk', sans-serif;
/* Texto general */
font-family: 'Inter', sans-serif;
```

Importar desde Google Fonts:
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap
```

**Jerarquía:**
- H1: 64px desktop / 40px mobile — weight 700
- H2: 40px desktop / 30px mobile — weight 600
- H3: 24px — weight 600
- Body: 17px — weight 400, line-height 1.7
- Tags/metadata: 13px — weight 500, letter-spacing 0.04em

---

### 4.3 Estilo general

- Modo oscuro como principal. No hace falta toggle claro/oscuro salvo que se quiera implementar.
- Cards con borde sutil (`#2B3038`) y fondo `#20242C`.
- Espaciado generoso. No apretar el contenido.
- Animaciones de entrada simples (fade + slide up al hacer scroll). Nada exagerado.
- Botón primario: fondo `#B8FF2C`, texto `#0F1115`, hover `#8FD80F`. Esquinas ligeramente redondeadas.
- Botón secundario: borde `#B8FF2C`, texto `#B8FF2C`, fondo transparente, hover fondo suave lima.
- Sin estética gamer ni cyberpunk. El lima es un detalle, no el protagonista.

---

## 5. Stack técnico sugerido

El agente elige el stack con el que mejor pueda implementar esto. Sugerencias:

- **Next.js + Tailwind CSS** (recomendado si se quiere escalar o agregar blog/contenido)
- **Astro + Tailwind CSS** (más simple, excelente para sitios estáticos de una página)
- **HTML/CSS/JS vanilla** (si se prefiere algo sin framework)

El sitio es una sola página (SPA o scroll navigation). No necesita backend por ahora. El formulario de contacto puede usar Formspree, Web3Forms o similar para no necesitar servidor propio.

---

## 6. Elementos a NO incluir

- Lista de tecnologías o stacks usados (React, Node, etc.) como protagonistas
- Sección "Experiencia laboral" ni línea de tiempo de empleos
- Proyectos personales o side projects de práctica
- Porcentajes de habilidades tipo barra de progreso ("React: 85%")
- Frases de autoayuda o motivacionales
- Mención a que trabaja en Grupo CPS como empleado

---

## 7. Notas adicionales

- El sitio debe ser **totalmente responsive**. El visitante que llega desde Instagram o TikTok lo va a ver en el celular.
- Incluir meta tags básicos (title, description, og:image) para que se vea bien cuando alguien comparte el link.
- El dominio es `sebaviglione.com`. No hace falta configurar deploy, solo el código.
- Dejar comentarios en el código donde Seba tenga que reemplazar contenido (imágenes, número de WhatsApp, mail, redes sociales).
