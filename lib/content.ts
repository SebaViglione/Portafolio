import {
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  RefreshCw,
  UserRound,
  WalletCards,
} from 'lucide-react';

export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export type Project = {
  name: string;
  domain: string;
  url: string;
  description: string;
  label: string;
  kind: string;
  cta: string;
  image?: string;
  video?: string;
  tags: string[];
};

const es = {
  htmlLang: 'es',
  whatsapp: 'https://wa.me/59892009897?text=Hola%20Seba%2C%20quiero%20hablar%20sobre%20un%20proyecto.',

  nav: {
    items: [
      { label: 'Sobre mí', href: '#sobre-mi' },
      { label: 'Trabajos', href: '#trabajos' },
      { label: 'Servicios', href: '#servicios' },
      { label: 'Contacto', href: '#contacto' },
    ],
    cta: 'Hablemos',
    menuOpen: 'Abrir menu',
    menuClose: 'Cerrar menu',
    switchLabel: 'EN',
    switchAria: 'Ver el sitio en inglés',
  },

  hero: {
    kicker: 'disponible para proyectos',
    title: {
      sr: 'Hago software que ordena tu operación.',
      l1: 'Hago software',
      l2: 'que ordena',
      l3pre: 'tu',
      highlight: 'operación.',
    },
    copy: 'Desde el sitio web hasta el sistema interno que te ahorra horas de trabajo manual. Sin equipos grandes, sin procesos eternos.',
    credential: 'Developer en Grupo CPS · Estudiante de Ingeniería en Sistemas · Inglés C1',
    ctaWhatsapp: 'Hablemos por WhatsApp',
    ctaWork: 'Ver trabajos',
    portraitCaption: 'Software a medida para empresas',
    scroll: 'scroll',
    portraitAlt: 'Sebastián Viglione',
  },

  about: {
    label: 'sobre mí',
    heading: 'Autodidacta desde los 12. Hoy construyo software en producción.',
    intro:
      'Mi perfil está orientado a la Ingeniería en Sistemas, con una base autodidacta que empecé a los 12 años. Lo que me define es la curiosidad técnica y la iniciativa: desarrollo proyectos integrales —full stack, IA local y automatización— para validar mis habilidades resolviendo problemas en entornos productivos reales.',
    body:
      'Hoy trabajo como Developer & Systems Technician en Grupo CPS, donde construyo soluciones internas, integro APIs y automatizo procesos del negocio. Me muevo cómodo de la base de datos al frontend, y de un script suelto al sistema completo.',
    facts: [
      { label: 'Estudiante de Ingeniería en Sistemas — Universidad de Montevideo', icon: GraduationCap },
      { label: 'Developer & Systems Technician — Grupo CPS', icon: Briefcase },
      { label: 'Español nativo · Inglés C1 (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack',
    cvButton: 'Descargar CV',
  },

  stackGroups: [
    { title: 'Desarrollo web', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind'] },
    { title: 'Lenguajes', items: ['Python', 'SQL'] },
    { title: 'Backend / APIs', items: ['REST APIs', 'JSON', 'Webhooks'] },
    { title: 'Datos', items: ['PostgreSQL', 'ETL'] },
    { title: 'Automatización & IA', items: ['n8n', 'Ollama', 'OpenAI API', 'IA local'] },
    { title: 'Infraestructura', items: ['Linux', 'Docker', 'Bash', 'Git', 'GitHub'] },
  ],

  services: {
    label: 'que puedo hacer por tu empresa',
    heading: 'Soluciones a medida, sin vueltas.',
    more: 'Más info',
    items: [
      {
        title: 'Desarrollo web',
        text: 'Tu primer punto de contacto con clientes. Que cuando alguien te googlee, encuentre algo que genere confianza y sepa cómo hablarte.',
        icon: MonitorSmartphone,
      },
      {
        title: 'Software de gestión',
        text: 'Cuando la operación queda repartida entre mensajes, planillas y tareas manuales, armamos un sistema que ponga todo en su lugar.',
        icon: BriefcaseBusiness,
      },
      {
        title: 'Automatización',
        text: 'Procesos repetitivos que hoy hacés a mano y podrían resolverse solos, con reglas claras y control humano cuando hace falta.',
        icon: RefreshCw,
      },
      {
        title: 'IA aplicada',
        text: 'IA cuando suma de verdad: para responder consultas, ordenar información o revisar datos internos sin venderte una caja negra.',
        icon: Bot,
      },
    ],
  },

  work: {
    label: 'trabajos recientes',
    heading: 'Cosas que hice que ya están funcionando.',
    swipe: 'Deslizá para ver más trabajos',
    moreKicker: 'próximamente',
    moreTitle: 'y más...',
    moreText: 'Hay más trabajos y sistemas que puedo mostrarte según lo que necesites resolver.',
    moreCta: 'Hablemos',
    toolsLabel: 'Herramientas & sistemas',
    sitesLabel: 'Sitios web',
    tools: [
      {
        name: 'Cotizador de Aberturas',
        domain: 'Case study',
        url: '/cotizador',
        description: 'Web B2B donde el cliente arma su pedido de aberturas y recibe un precio creíble. El núcleo es un motor de cálculo calibrado con reverse engineering sobre 2.641 recetas reales de fábrica.',
        label: 'COTIZADOR',
        kind: 'Herramienta comercial · Full-stack',
        cta: 'Ver case study',
        image: '/assets/projects/cotizador/imagen_hero.png',
        tags: ['Next.js', 'TypeScript', 'Supabase', 'Pricing engine'],
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Automatización que monitorea, filtra y analiza licitaciones públicas con n8n, PostgreSQL y modelos de IA local para detectar oportunidades.',
        label: 'ARCE',
        kind: 'Automatización & IA',
        cta: 'Ver case study',
        video: '/assets/projects/arce_dashboard_demo.webm',
        tags: ['n8n', 'PostgreSQL', 'IA local'],
      },
    ] as Project[],
    sites: [
      {
        name: 'Force Crossfit',
        domain: 'forcebox4c.com.uy',
        url: 'https://forcebox4c.com.uy',
        description: 'Necesitaban dejar de perder consultas por Instagram y tener un lugar propio donde la gente llegue, entienda la propuesta y se contacte.',
        label: 'FORCE',
        kind: 'Sitio comercial',
        cta: 'Ver sitio',
        image: '/assets/projects/forcecrossfit.webp',
        tags: ['Web', 'Reservas', 'Mobile first'],
      },
      {
        name: 'Open Gym',
        domain: 'opengym.uy',
        url: 'https://opengym.uy',
        description: 'La gente tenía que poder encontrar el gimnasio, entender qué ofrece y consultar sin depender de mensajes sueltos o información perdida.',
        label: 'OPEN',
        kind: 'Sitio comercial',
        cta: 'Ver sitio',
        image: '/assets/projects/opengym.webp',
        tags: ['Web', 'Contacto', 'Performance'],
      },
      {
        name: 'Grupo CPS',
        domain: 'grupocps.com.uy',
        url: 'https://grupocps.com.uy',
        description: 'Una empresa constructora necesita transmitir confianza antes del primer contacto. El sitio ordena quiénes son, qué hacen y cómo consultar.',
        label: 'CPS',
        kind: 'Institucional',
        cta: 'Ver sitio',
        image: '/assets/projects/grupo_cps.webp',
        tags: ['Institucional', 'Contenido', 'Formulario'],
      },
      {
        name: 'Edificio Galicia',
        domain: 'edificiogalicia.com.uy',
        url: 'https://edificiogalicia.com.uy',
        description: 'Presentación digital para un desarrollo inmobiliario: información clara, confianza visual y un camino directo para recibir consultas.',
        label: 'GAL',
        kind: 'Landing inmobiliaria',
        cta: 'Ver sitio',
        image: '/assets/projects/edificiogalicia.webp',
        tags: ['Inmobiliaria', 'Landing', 'Contacto'],
      },
    ] as Project[],
  },

  reasons: {
    label: 'como trabajo',
    heading: 'Sin agencias en el medio. Hablás directo conmigo.',
    items: [
      {
        number: 1,
        title: 'Trato directo',
        text: 'Sabés con quién estás hablando desde el primer mensaje y podés explicar el problema sin intermediarios.',
        icon: UserRound,
      },
      {
        number: 2,
        title: 'Sin vueltas',
        text: 'Si algo no funciona, se corrige rápido. El proceso es simple, conversado y con prioridades claras.',
        icon: Clock3,
      },
      {
        number: 3,
        title: 'A tu medida',
        text: 'El presupuesto y el alcance se adaptan al problema real, no a un paquete cerrado que nadie pidió.',
        icon: WalletCards,
      },
      {
        number: 4,
        title: 'Lenguaje claro',
        text: 'Me contás el problema en tus palabras y yo lo traduzco a software. Te mantengo al tanto sin perderte en tecnicismos.',
        icon: MessageSquareText,
      },
    ],
  },

  contact: {
    label: 'contacto',
    title: {
      sr: '¿Tenés un proyecto en mente?',
      l1: '¿Tenés un proyecto',
      l2: 'en mente?',
    },
    copy: 'Contame qué necesitás. Sin compromisos, sin tecnicismos. Si puedo ayudarte, te lo digo. Si no, también.',
    whatsapp: 'WhatsApp',
    mail: 'Mail',
    social: 'También en redes:',
    formName: 'Tu nombre',
    formEmail: 'Tu email',
    formMessage: '¿En qué puedo ayudarte?',
    formSubmit: 'Mandar mensaje',
    formSending: 'Enviando',
    formDirectPre: 'Si preferís ir directo, escribime a',
  },

  footer: {
    tagline: 'hecho por mí, obviamente.',
  },

  arce: {
    back: 'Volver',
    backFull: 'Volver a trabajos',
    caseLabel: 'case study',
    category: 'Automatización & IA',
    year: '2025',
    roleLabel: 'Rol',
    role: 'Diseño, desarrollo e infraestructura — de punta a punta',
    yearLabel: 'Año',
    repoBtn: 'Ver repositorio',
    demoBtn: 'Ver demo',
    tagline: 'Monitoreo y análisis de licitaciones públicas con IA local.',
    stack: ['Python', 'n8n', 'PostgreSQL', 'Ollama', 'IA local', 'Docker', 'Linux', 'Web scraping', 'JSON'],
    summary:
      'Arce monitorea las publicaciones del portal de compras estatales (ARCE), extrae cada llamado, lo estructura, lo analiza con un modelo de IA que corre en local y deja en un dashboard solo las oportunidades relevantes para el equipo comercial.',
    problemLabel: 'El problema',
    problem: [
      'Detectar oportunidades significaba revisar a mano el portal de compras estatales (ARCE): un proceso lento, repetitivo y fácil de descuidar entre el resto del trabajo. Eran unas 2 horas diarias, 5 días a la semana.',
      'La información llegaba como texto no estructurado, difícil de comparar y filtrar. Cuando un llamado relevante aparecía y nadie lo veía a tiempo, era una oportunidad perdida.',
    ],
    solutionLabel: 'La solución',
    solution: [
      'Arce automatiza todo ese recorrido. Monitorea las últimas publicaciones de ARCE, extrae cada llamado, lo convierte a un formato estructurado y lo evalúa con IA local para decidir si es relevante.',
      'El tema de interés es configurable: en mi caso filtra por aluminio, el rubro de mi empresa, pero se adapta a cualquier otro sin tocar el código.',
      'El equipo deja de revisar el portal: abre un dashboard y ve únicamente las oportunidades que importan, ya filtradas y ordenadas.',
    ],
    archLabel: 'arquitectura',
    archHeading: 'Cómo fluyen los datos, de la fuente al dashboard.',
    architecture: [
      { step: '01', title: 'ARCE (compras estatales)', text: 'Las últimas publicaciones del portal de compras del Estado son el punto de entrada.' },
      { step: '02', title: 'Scraping en Python', text: 'Scripts que extraen automáticamente cada llamado publicado.' },
      { step: '03', title: 'Estructuración', text: 'El texto no estructurado se normaliza a JSON consistente y comparable.' },
      { step: '04', title: 'PostgreSQL', text: 'Los llamados se almacenan con histórico consultable, sin reprocesar todo cada vez.' },
      { step: '05', title: 'IA local (Ollama)', text: 'Un modelo que corre en local clasifica y filtra cada licitación por relevancia.' },
      { step: '06', title: 'Dashboard', text: 'El equipo ve solo las oportunidades relevantes, listas para actuar.' },
    ],
    orchestration:
      'Todo el flujo está orquestado en n8n: ajustar fuentes, reglas o frecuencia se hace sobre el workflow, sin reescribir el sistema.',
    decisionsLabel: 'decisiones técnicas',
    decisionsHeading: 'Por qué está construido así.',
    decisions: [
      { title: 'IA local, no en la nube', text: 'Usar Ollama con modelos locales mantiene los datos dentro de la infraestructura, elimina el costo por consulta y saca de la ecuación los límites de las APIs externas.' },
      { title: 'n8n para orquestar', text: 'Coordinar el flujo en n8n permite cambiar reglas, fuentes o frecuencia tocando el workflow, en vez de reescribir y redeployar código.' },
      { title: 'PostgreSQL como base', text: 'Guardar los llamados estructurados en Postgres habilita consultar, comparar y mantener un histórico, en lugar de procesar todo desde cero en cada corrida.' },
      { title: 'Todo en Docker', text: 'El sistema corre containerizado sobre Linux: reproducible, aislado y desplegable en un servidor propio sin dependencias frágiles.' },
    ],
    demoLabel: 'demo',
    demoHeading: 'El dashboard en funcionamiento.',
    demoAria: 'Demo del dashboard de Arce',
    shotsLabel: 'capturas',
    shotsHeading: 'Por dentro.',
    shotsPending: 'Captura en camino',
    resultsLabel: 'resultados',
    results: [
      { value: '~10 hs', label: 'de búsqueda manual ahorradas cada semana (antes: 5 días × 2 hs revisando a mano).' },
      { value: '0', label: 'tiempo dedicado a revisar el portal de ARCE manualmente.' },
      { value: 'Configurable', label: 'el rubro de interés se cambia sin tocar el sistema (en mi caso, aluminio).' },
    ],
    gallery: [
      { src: '/assets/projects/arce/dashboard.png', alt: 'Vista principal del dashboard de Arce', caption: 'Dashboard principal: cada llamado con su urgencia y el score de relevancia que le asigna la IA.', width: 1920, height: 1082, available: true },
      { src: '/assets/projects/arce/licitacion-detalle.png', alt: 'Detalle de una licitación en Arce', caption: 'Detalle de un llamado: datos estructurados, archivos adjuntos, análisis de la IA y feedback humano.', width: 1920, height: 1082, available: true },
      { src: '/assets/projects/arce/n8n-workflow.png', alt: 'Workflow de Arce en n8n', caption: 'El flujo en n8n: RSS, parseo XML→JSON, scraping, filtrado por relevancia y carga a PostgreSQL.', width: 1326, height: 1009, available: true },
    ],
    ctaHeading: '¿Tenés un proceso que se podría automatizar así?',
    ctaText: 'Si algo de esto se parece a un problema tuyo, hablémoslo.',
    ctaTalk: 'Hablemos',
    ctaCode: 'Ver el código',
    ctaGithub: 'Más en GitHub',
  },

  cotizador: {
    title: 'Cotizador de Aberturas',
    back: 'Volver',
    backFull: 'Volver a trabajos',
    caseLabel: 'case study',
    category: 'Herramienta comercial · Full-stack',
    year: '2026',
    roleLabel: 'Rol',
    role: 'Desarrollador full-stack único — producto, motor de cálculo, backend, base de datos y seguridad',
    yearLabel: 'Año',
    clientLabel: 'Cliente',
    client: 'Grupo CPS — industria de aberturas (aluminio + vidrio)',
    repoBtn: 'Hablemos del proyecto',
    privateNote: 'El código es privado por tratarse de un proyecto de cliente.',
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Supabase', 'PostgreSQL', 'RLS', 'Jest'],
    tagline: 'Un cotizador de aberturas que da precios creíbles, no números inventados.',
    summary:
      'Una web donde el cliente arma su pedido de ventanas de aluminio y vidrio y recibe un precio estimado. El desafío no era la pantalla, sino calcular bien el precio: lo que parecía una fórmula simple en realidad dependía de cuánto aluminio y vidrio usa cada ventana de verdad. Para acertar, estudié las 2.641 recetas reales del software de fábrica y saqué de ahí los números que mueven el costo.',
    metricValue: '2,44× → ~1%',
    metricText: 'Cuánto bajó el error al calcular el aluminio, comparado con el sistema de fábrica. No lo arreglé con un número de ajuste a dedo, sino entendiendo de dónde venía la diferencia.',
    problemLabel: 'El problema',
    problem: [
      'Grupo CPS fabrica aberturas de aluminio y vidrio. Cotizar a mano cada pedido es lento y depende de personal técnico. Querían una web sencilla donde el cliente se registre, arme un carrito con sus ventanas, envíe el pedido y le hagan seguimiento.',
      'El problema estaba en la palabra "sencilla". El precio de una ventana no sale de multiplicar el área por un precio por metro cuadrado: depende de cuánto perfil de aluminio lleva cada tipo de ventana (el marco, la hoja que se abre, el contravidrio que sujeta el vidrio, los travesaños) y de la medida real del vidrio, además de herrajes, mano de obra, margen e IVA.',
      'La empresa ya calculaba todo esto con precisión en su software de fábrica, WinMaker, que guarda una "receta" por cada tipo de ventana: 2.641 archivos en un formato cerrado, imposible de usar directo en una web. Mi primer cálculo simple se quedaba muy corto: contaba 2,44 veces menos aluminio del que la ventana usa en realidad.',
    ],
    insightLabel: 'la decisión clave',
    insightHeading: 'Sacar de las recetas solo los números que mueven el precio, sin copiar todo el software de fábrica.',
    insight: [
      'Tenía dos caminos malos: una fórmula simple (rápida pero falsa) o reconstruir entero el software de fábrica (preciso pero inviable). Elegí el punto medio: leer de las recetas únicamente las medidas que afectan el costo.',
      'El error no era un número mal puesto, era de fondo. La fórmula simple contaba solo el contorno del marco. Pero una ventana real lleva mucho más aluminio: el marco, la hoja que se abre, el contravidrio que sujeta el vidrio y los travesaños. Y el vidrio se mide por el hueco real que queda, no por el tamaño total de la ventana.',
      'Así que armé un programa que lee esas 2.641 recetas y extrae, para cada tipo de ventana, las medidas exactas que la fábrica ya usa. Esas medidas alimentan el cálculo de precio que ya existía: cambia cuánto material se cuenta, no la forma de poner el precio.',
    ],
    beforeAfterText:
      'Ejemplo concreto: para una ventana fija de 1×1 m, la fórmula simple calculaba 4,32 m de perfil de aluminio. En la realidad usa unos 7,7 m (el marco más el contravidrio que sostiene el vidrio). Esa diferencia, sumada a cómo se mide el vidrio, explica el 2,44× sin inventar nada.',
    beforeLabel: 'Fórmula simple calculaba',
    beforeValue: '4,32 m',
    afterLabel: 'Aluminio que usa de verdad',
    afterValue: '~7,7 m',
    solutionLabel: 'la solución',
    solutionHeading: 'Una app full-stack con un motor de cálculo en el núcleo.',
    solution: [
      { title: 'Registro e inicio de sesión', text: 'Cada cliente tiene su cuenta propia.' },
      { title: 'Armado de la ventana en 3D', text: 'El cliente elige tipo, medidas, línea, vidrio, color y accesorios, y ve la abertura renderizada en 3D, que puede girar para mirarla desde cualquier ángulo.' },
      { title: 'Carrito de varias ventanas', text: 'Junta varias aberturas en un mismo pedido y arma su presupuesto como un borrador: suma, saca y ajusta hasta dejarlo como quiere.' },
      { title: 'Cotización en PDF', text: 'Con un clic genera un PDF prolijo con todas las ventanas, sus especificaciones y el total, listo para guardar o compartir.' },
      { title: 'Pedido que queda congelado', text: 'Al enviarlo, se guardan los precios y nombres de ese momento. Nada se recalcula por detrás después.' },
      { title: 'Seguimiento', text: 'En "Mis pedidos" ve el estado de cada uno, y puede compartir un resumen por un link privado.' },
    ],
    solutionNote:
      'El cotizador no viene a reemplazar a WinMaker, el sistema con el que la fábrica cotiza desde siempre: es la puerta de entrada para el cliente. Un primer acercamiento intuitivo y atractivo, donde puede armar su abertura, probar combinaciones y sacarse las dudas por su cuenta. Y para Grupo CPS, una forma de recibir cada presupuesto que se pide y darle un seguimiento ordenado. Detrás, el cliente nunca ve costos internos ni margen: todo el cálculo ocurre en el servidor y al navegador solo llega el precio final.',
    archLabel: 'arquitectura',
    archHeading: 'Una frontera estricta entre lo público y lo privado.',
    architecture: [
      { step: 'UI', title: 'Navegador', text: 'Configurador · carrito · mis-pedidos.' },
      { step: 'API', title: 'app/api/*', text: 'Frontera HTTP: auth, autorización y DTOs sin datos sensibles.' },
      { step: 'SRV', title: 'src/server/*', text: 'Lógica privada: consultas, persistencia, service-role.' },
      { step: 'CALC', title: 'src/lib/cotizador/*', text: 'Motor de cálculo puro, sin I/O, 100% testeable.' },
      { step: 'DOM', title: 'src/technical/*', text: 'Tipos, normalización, compatibilidades y validaciones.' },
      { step: 'DB', title: 'supabase/schema.sql', text: 'PostgreSQL canónico con Row-Level Security.' },
    ],
    archNote:
      'La parte que calcula medidas está separada de la parte que arma el precio. Por eso traer los números de la fábrica cambió las cantidades de material sin tocar la lógica de precios, y todo el cálculo se puede testear solo, sin base de datos.',
    securityLabel: 'seguridad por diseño',
    securityHeading: 'Hay datos de clientes y costos internos en juego: la seguridad fue requisito, no agregado.',
    security: [
      { title: 'Ningún dato directo de la base', text: 'Todo pasa por el servidor con login. La llave maestra de la base vive solo ahí, nunca llega al navegador del cliente.' },
      { title: 'Links para compartir imposibles de adivinar', text: 'El link de un resumen no es un número seguido (1, 2, 3…) sino un código aleatorio, así nadie puede cambiarlo para espiar pedidos ajenos.' },
      { title: 'Entradas siempre acotadas', text: 'Medidas hasta 6000 mm, cantidades enteras con tope, textos limitados. Nada entra sin control.' },
      { title: 'Costos internos nunca expuestos', text: 'El cliente ve el precio final, nunca el costo, el margen ni el precio por metro cuadrado. Todo el cálculo ocurre en el servidor.' },
    ],
    qualityLabel: 'calidad e ingeniería',
    qualityHeading: 'Medir antes de afirmar.',
    quality: [
      { metric: 'Recetas de fábrica analizadas', value: '2.641' },
      { metric: 'Tests automáticos (Jest)', value: '68+' },
      { metric: 'Error de material vs. el sistema de fábrica', value: '2,44× → ~1%' },
      { metric: 'Calidad de código', value: 'TypeScript estricto, sin errores de tipo' },
    ],
    qualityNote:
      'El "modo sombra": una herramienta que compara, ventana por ventana, lo que calcula mi sistema contra el desglose real de piezas del software de fábrica. Sirve para medir cuánto me desvío antes de dar un precio por bueno. La diferencia entre "creo que está bien" y "lo medí".',
    shotsLabel: 'demo',
    shotsHeading: 'El cotizador en acción.',
    learningsLabel: 'por qué este proyecto me representa',
    learnings: [
      'El problema difícil rara vez es el que se ve: la pantalla era lo fácil, el valor estaba en calcular bien y validar los números.',
      'No copié las 2.641 recetas a la fuerza: saqué solo lo que mueve el costo y dejé el resto como investigación aparte.',
      'Medir antes de afirmar: el "modo sombra" convirtió una corazonada ("el precio no cierra") en un número (2,44×) y después en una validación (~1%).',
      'Seguridad y trazabilidad desde el día uno, no como parche.',
    ],
    ctaHeading: '¿Tenés un cálculo o una operación que no cierra con una fórmula simple?',
    ctaText: 'Es el tipo de problema que me gusta. El código de este proyecto es privado, pero podemos hablarlo.',
    ctaTalk: 'Hablemos del proyecto',
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Recorrido en video por el cotizador, del armado de la ventana al pedido enviado', caption: 'Recorrido por el sistema: del armado de la abertura en 3D al pedido enviado.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Ventana cotizada renderizada en 3D girando sobre su eje', caption: 'Visualización 3D: la ventana cotizada gira para verse desde cualquier ángulo.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'PDF generado con la cotización armada', caption: 'PDF generado automáticamente con la cotización armada, listo para guardar o compartir.', width: 990, height: 1041, loop: false },
    ],
  },

  thanks: {
    title: 'Mensaje enviado.',
    text: 'Gracias por escribirme. Recibí tu mensaje y te voy a responder apenas pueda.',
    home: 'Volver al inicio',
    whatsapp: 'WhatsApp',
    mail: 'Mail',
  },
};

const en: typeof es = {
  htmlLang: 'en',
  whatsapp: 'https://wa.me/59892009897?text=Hi%20Seba%2C%20I%27d%20like%20to%20talk%20about%20a%20project.',

  nav: {
    items: [
      { label: 'About', href: '#sobre-mi' },
      { label: 'Work', href: '#trabajos' },
      { label: 'Services', href: '#servicios' },
      { label: 'Contact', href: '#contacto' },
    ],
    cta: "Let's talk",
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    switchLabel: 'ES',
    switchAria: 'View the site in Spanish',
  },

  hero: {
    kicker: 'available for projects',
    title: {
      sr: 'I build software that organizes your operation.',
      l1: 'I build software',
      l2: 'that organizes',
      l3pre: 'your',
      highlight: 'operation.',
    },
    copy: 'From the website to the internal system that saves you hours of manual work. No big teams, no endless processes.',
    credential: 'Developer at Grupo CPS · Systems Engineering student · C1 English',
    ctaWhatsapp: "Let's talk on WhatsApp",
    ctaWork: 'See work',
    portraitCaption: 'Custom software for companies',
    scroll: 'scroll',
    portraitAlt: 'Sebastián Viglione',
  },

  about: {
    label: 'about me',
    heading: 'Self-taught since 12. Today I build software in production.',
    intro:
      "My focus is on Systems Engineering, with a self-taught foundation I started at age 12. What defines me is technical curiosity and initiative: I build end-to-end projects —full stack, local AI and automation— to prove my skills by solving problems in real production environments.",
    body:
      'Today I work as a Developer & Systems Technician at Grupo CPS, where I build internal tools, integrate APIs and automate business processes. I move comfortably from the database to the frontend, and from a quick script to a full system.',
    facts: [
      { label: 'Systems Engineering student — Universidad de Montevideo', icon: GraduationCap },
      { label: 'Developer & Systems Technician — Grupo CPS', icon: Briefcase },
      { label: 'Native Spanish · C1 English (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack',
    cvButton: 'Download CV',
  },

  stackGroups: [
    { title: 'Web development', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind'] },
    { title: 'Languages', items: ['Python', 'SQL'] },
    { title: 'Backend / APIs', items: ['REST APIs', 'JSON', 'Webhooks'] },
    { title: 'Data', items: ['PostgreSQL', 'ETL'] },
    { title: 'Automation & AI', items: ['n8n', 'Ollama', 'OpenAI API', 'Local AI'] },
    { title: 'Infrastructure', items: ['Linux', 'Docker', 'Bash', 'Git', 'GitHub'] },
  ],

  services: {
    label: 'what I can do for your company',
    heading: 'Custom solutions, no fuss.',
    more: 'Learn more',
    items: [
      {
        title: 'Web development',
        text: 'Your first point of contact with clients. So when someone googles you, they find something that builds trust and shows them how to reach you.',
        icon: MonitorSmartphone,
      },
      {
        title: 'Management software',
        text: 'When your operation is scattered across messages, spreadsheets and manual tasks, we build a system that puts everything in its place.',
        icon: BriefcaseBusiness,
      },
      {
        title: 'Automation',
        text: 'Repetitive processes you do by hand today that could run on their own, with clear rules and human control when needed.',
        icon: RefreshCw,
      },
      {
        title: 'Applied AI',
        text: 'AI when it really adds value: to answer queries, organize information or review internal data without selling you a black box.',
        icon: Bot,
      },
    ],
  },

  work: {
    label: 'recent work',
    heading: 'Things I built that are already running.',
    swipe: 'Swipe to see more work',
    moreKicker: 'coming soon',
    moreTitle: 'and more...',
    moreText: 'There are more projects and systems I can show you depending on what you need to solve.',
    moreCta: "Let's talk",
    toolsLabel: 'Tools & systems',
    sitesLabel: 'Websites',
    tools: [
      {
        name: 'Aluminum Joinery Quoter',
        domain: 'Case study',
        url: '/cotizador',
        description: 'A B2B web app where the client builds their order of aluminum-and-glass joinery and gets a credible price. The core is a pricing engine calibrated by reverse engineering 2,641 real factory recipes.',
        label: 'COTIZADOR',
        kind: 'Commercial tool · Full-stack',
        cta: 'View case study',
        image: '/assets/projects/cotizador/imagen_hero.png',
        tags: ['Next.js', 'TypeScript', 'Supabase', 'Pricing engine'],
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Automation that monitors, filters and analyzes public tenders with n8n, PostgreSQL and local AI models to surface opportunities.',
        label: 'ARCE',
        kind: 'Automation & AI',
        cta: 'View case study',
        video: '/assets/projects/arce_dashboard_demo.webm',
        tags: ['n8n', 'PostgreSQL', 'Local AI'],
      },
    ] as Project[],
    sites: [
      {
        name: 'Force Crossfit',
        domain: 'forcebox4c.com.uy',
        url: 'https://forcebox4c.com.uy',
        description: 'They needed to stop losing inquiries through Instagram and have a place of their own where people arrive, understand the offer and get in touch.',
        label: 'FORCE',
        kind: 'Commercial site',
        cta: 'Visit site',
        image: '/assets/projects/forcecrossfit.webp',
        tags: ['Web', 'Booking', 'Mobile first'],
      },
      {
        name: 'Open Gym',
        domain: 'opengym.uy',
        url: 'https://opengym.uy',
        description: 'People needed to be able to find the gym, understand what it offers and reach out without relying on scattered messages or lost information.',
        label: 'OPEN',
        kind: 'Commercial site',
        cta: 'Visit site',
        image: '/assets/projects/opengym.webp',
        tags: ['Web', 'Contact', 'Performance'],
      },
      {
        name: 'Grupo CPS',
        domain: 'grupocps.com.uy',
        url: 'https://grupocps.com.uy',
        description: 'A construction company needs to convey trust before the first contact. The site lays out who they are, what they do and how to reach them.',
        label: 'CPS',
        kind: 'Institutional',
        cta: 'Visit site',
        image: '/assets/projects/grupo_cps.webp',
        tags: ['Institutional', 'Content', 'Form'],
      },
      {
        name: 'Edificio Galicia',
        domain: 'edificiogalicia.com.uy',
        url: 'https://edificiogalicia.com.uy',
        description: 'Digital presentation for a real estate development: clear information, visual trust and a direct path to receive inquiries.',
        label: 'GAL',
        kind: 'Real estate landing',
        cta: 'Visit site',
        image: '/assets/projects/edificiogalicia.webp',
        tags: ['Real estate', 'Landing', 'Contact'],
      },
    ] as Project[],
  },

  reasons: {
    label: 'how I work',
    heading: 'No agencies in between. You talk directly with me.',
    items: [
      {
        number: 1,
        title: 'Direct contact',
        text: 'You know who you are talking to from the first message and you can explain the problem with no middlemen.',
        icon: UserRound,
      },
      {
        number: 2,
        title: 'No runaround',
        text: 'If something does not work, it gets fixed fast. The process is simple, conversational and with clear priorities.',
        icon: Clock3,
      },
      {
        number: 3,
        title: 'Tailored to you',
        text: 'The budget and scope adapt to the real problem, not to a closed package nobody asked for.',
        icon: WalletCards,
      },
      {
        number: 4,
        title: 'Clear language',
        text: 'You tell me the problem in your words and I translate it into software. I keep you posted without drowning you in jargon.',
        icon: MessageSquareText,
      },
    ],
  },

  contact: {
    label: 'contact',
    title: {
      sr: 'Got a project in mind?',
      l1: 'Got a project',
      l2: 'in mind?',
    },
    copy: "Tell me what you need. No commitments, no jargon. If I can help, I'll tell you. If I can't, I'll tell you that too.",
    whatsapp: 'WhatsApp',
    mail: 'Mail',
    social: 'Also on:',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'How can I help you?',
    formSubmit: 'Send message',
    formSending: 'Sending',
    formDirectPre: 'If you prefer, write me directly at',
  },

  footer: {
    tagline: 'built by me, obviously.',
  },

  arce: {
    back: 'Back',
    backFull: 'Back to work',
    caseLabel: 'case study',
    category: 'Automation & AI',
    year: '2025',
    roleLabel: 'Role',
    role: 'Design, development and infrastructure — end to end',
    yearLabel: 'Year',
    repoBtn: 'View repository',
    demoBtn: 'View demo',
    tagline: 'Monitoring and analysis of public tenders with local AI.',
    stack: ['Python', 'n8n', 'PostgreSQL', 'Ollama', 'Local AI', 'Docker', 'Linux', 'Web scraping', 'JSON'],
    summary:
      'Arce monitors the publications of the state procurement portal (ARCE), extracts each tender, structures it, analyzes it with an AI model running locally and surfaces only the relevant opportunities for the sales team in a dashboard.',
    problemLabel: 'The problem',
    problem: [
      'Spotting opportunities meant manually reviewing the state procurement portal (ARCE): a slow, repetitive process, easy to neglect among everything else. It was about 2 hours a day, 5 days a week.',
      'The information came as unstructured text, hard to compare and filter. When a relevant tender showed up and nobody saw it in time, it was a missed opportunity.',
    ],
    solutionLabel: 'The solution',
    solution: [
      'Arce automates that whole journey. It monitors the latest ARCE publications, extracts each tender, converts it to a structured format and evaluates it with local AI to decide whether it is relevant.',
      'The topic of interest is configurable: in my case it filters by aluminum, my company’s field, but it adapts to any other without touching the code.',
      'The team stops checking the portal: they open a dashboard and see only the opportunities that matter, already filtered and sorted.',
    ],
    archLabel: 'architecture',
    archHeading: 'How data flows, from source to dashboard.',
    architecture: [
      { step: '01', title: 'ARCE (state procurement)', text: 'The latest publications of the state procurement portal are the entry point.' },
      { step: '02', title: 'Python scraping', text: 'Scripts that automatically extract each published tender.' },
      { step: '03', title: 'Structuring', text: 'Unstructured text is normalized into consistent, comparable JSON.' },
      { step: '04', title: 'PostgreSQL', text: 'Tenders are stored with a queryable history, without reprocessing everything each time.' },
      { step: '05', title: 'Local AI (Ollama)', text: 'A locally running model classifies and filters each tender by relevance.' },
      { step: '06', title: 'Dashboard', text: 'The team sees only the relevant opportunities, ready to act on.' },
    ],
    orchestration:
      'The whole flow is orchestrated in n8n: adjusting sources, rules or frequency is done on the workflow, without rewriting the system.',
    decisionsLabel: 'technical decisions',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Local AI, not cloud', text: 'Using Ollama with local models keeps data inside the infrastructure, removes per-query cost and takes external API limits out of the equation.' },
      { title: 'n8n to orchestrate', text: 'Coordinating the flow in n8n means changing rules, sources or frequency by touching the workflow, instead of rewriting and redeploying code.' },
      { title: 'PostgreSQL as the base', text: 'Storing the structured tenders in Postgres enables querying, comparing and keeping a history, instead of processing everything from scratch on each run.' },
      { title: 'Everything in Docker', text: 'The system runs containerized on Linux: reproducible, isolated and deployable on a private server with no fragile dependencies.' },
    ],
    demoLabel: 'demo',
    demoHeading: 'The dashboard in action.',
    demoAria: 'Arce dashboard demo',
    shotsLabel: 'screenshots',
    shotsHeading: 'Under the hood.',
    shotsPending: 'Screenshot on the way',
    resultsLabel: 'results',
    results: [
      { value: '~10 hrs', label: 'of manual search saved every week (before: 5 days × 2 hrs reviewing by hand).' },
      { value: '0', label: 'time spent reviewing the ARCE portal manually.' },
      { value: 'Configurable', label: 'the field of interest changes without touching the system (in my case, aluminum).' },
    ],
    gallery: [
      { src: '/assets/projects/arce/dashboard.png', alt: 'Main view of the Arce dashboard', caption: 'Main dashboard: each tender with its urgency and the relevance score assigned by the AI.', width: 1920, height: 1082, available: true },
      { src: '/assets/projects/arce/licitacion-detalle.png', alt: 'Detail of a tender in Arce', caption: 'Tender detail: structured data, attachments, AI analysis and human feedback.', width: 1920, height: 1082, available: true },
      { src: '/assets/projects/arce/n8n-workflow.png', alt: 'Arce workflow in n8n', caption: 'The n8n flow: RSS, XML→JSON parsing, scraping, relevance filtering and loading into PostgreSQL.', width: 1326, height: 1009, available: true },
    ],
    ctaHeading: 'Got a process that could be automated like this?',
    ctaText: 'If any of this looks like a problem of yours, let us talk.',
    ctaTalk: "Let's talk",
    ctaCode: 'View the code',
    ctaGithub: 'More on GitHub',
  },

  cotizador: {
    title: 'Aluminum Joinery Quoter',
    back: 'Back',
    backFull: 'Back to work',
    caseLabel: 'case study',
    category: 'Commercial tool · Full-stack',
    year: '2026',
    roleLabel: 'Role',
    role: 'Sole full-stack developer — product, pricing engine, backend, database and security',
    yearLabel: 'Year',
    clientLabel: 'Client',
    client: 'Grupo CPS — aluminum-and-glass joinery industry',
    repoBtn: "Let's talk about the project",
    privateNote: 'The code is private since it is a client project.',
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Supabase', 'PostgreSQL', 'RLS', 'Jest'],
    tagline: 'An aluminum joinery quoter that gives credible prices, not made-up numbers.',
    summary:
      'A web app where the client builds their order of aluminum-and-glass windows and gets an estimated price. The challenge was not the screen, but getting the price right: what looked like a simple formula actually depended on how much aluminum and glass each window really uses. To get it right, I studied the 2,641 real recipes from the factory software and pulled out the numbers that drive the cost.',
    metricValue: '2.44× → ~1%',
    metricText: 'How much the error in calculating the aluminum dropped, compared to the factory system. I did not fix it with a hand-tuned fudge factor, but by understanding where the difference came from.',
    problemLabel: 'The problem',
    problem: [
      'Grupo CPS manufactures aluminum-and-glass joinery. Quoting each order by hand is slow and depends on technical staff. They wanted a simple web app where the client signs up, builds a cart with their windows, sends the order and tracks it.',
      'The problem was in the word "simple". The price of a window does not come from multiplying area by a price per square meter: it depends on how much aluminum profile each window type uses (the frame, the opening sash, the bead that holds the glass, the transoms) and on the real glass measurement, plus hardware, labor, margin and VAT.',
      'The company already calculated all of this precisely in its factory software, WinMaker, which stores one "recipe" per window type: 2,641 files in a closed format, impossible to use directly on a website. My first simple calculation fell far short: it counted 2.44× less aluminum than the window actually uses.',
    ],
    insightLabel: 'the key decision',
    insightHeading: 'Pull from the recipes only the numbers that move the price, without copying the whole factory software.',
    insight: [
      'I had two bad options: a simple formula (fast but false) or rebuilding the entire factory software (precise but unfeasible). I chose the middle ground: read from the recipes only the measurements that affect the cost.',
      'The error was not a wrong number, it was structural. The simple formula counted only the outline of the frame. But a real window holds much more aluminum: the frame, the opening sash, the bead that holds the glass and the transoms. And the glass is measured by the real opening that is left, not by the total size of the window.',
      'So I built a program that reads those 2,641 recipes and pulls out, for each window type, the exact measurements the factory already uses. Those measurements feed the pricing calculation that already existed: what changes is how much material is counted, not how the price is built.',
    ],
    beforeAfterText:
      'Concrete example: for a 1×1 m fixed window, the simple formula calculated 4.32 m of aluminum profile. In reality it uses about 7.7 m (the frame plus the bead that holds the glass). That gap, together with how the glass is measured, explains the 2.44× with nothing made up.',
    beforeLabel: 'Simple formula calculated',
    beforeValue: '4.32 m',
    afterLabel: 'Aluminum it really uses',
    afterValue: '~7.7 m',
    solutionLabel: 'the solution',
    solutionHeading: 'A full-stack app with a pricing engine at its core.',
    solution: [
      { title: 'Sign up and log in', text: 'Each client has their own account.' },
      { title: 'Building the window in 3D', text: 'The client picks type, dimensions, line, glass, color and accessories, and sees the window rendered in 3D, which they can rotate to look at from any angle.' },
      { title: 'Cart with several windows', text: 'They group several windows into one order and build their quote like a draft: adding, removing and adjusting until it is the way they want.' },
      { title: 'Quote as a PDF', text: 'With one click it generates a clean PDF with all the windows, their specs and the total, ready to save or share.' },
      { title: 'Order that gets frozen', text: 'On submit, the prices and names of that moment are saved. Nothing is recalculated behind the scenes afterward.' },
      { title: 'Tracking', text: 'In "My orders" they see the status of each one, and can share a summary via a private link.' },
    ],
    solutionNote:
      'The quoter does not come to replace WinMaker, the system the factory has always quoted with: it is the client’s front door. An intuitive, eye-catching first approach where they can build their window, try combinations and clear up their doubts on their own. And for Grupo CPS, a way to capture every quote requested and give it orderly follow-up. Behind it, the client never sees internal costs or margin: all the calculation happens on the server and only the final price reaches the browser.',
    archLabel: 'architecture',
    archHeading: 'A strict boundary between public and private.',
    architecture: [
      { step: 'UI', title: 'Browser', text: 'Configurator · cart · my-orders.' },
      { step: 'API', title: 'app/api/*', text: 'HTTP boundary: auth, authorization and DTOs with no sensitive data.' },
      { step: 'SRV', title: 'src/server/*', text: 'Private logic: queries, persistence, service-role.' },
      { step: 'CALC', title: 'src/lib/cotizador/*', text: 'Pure pricing engine, no I/O, 100% testable.' },
      { step: 'DOM', title: 'src/technical/*', text: 'Types, normalization, compatibilities and validations.' },
      { step: 'DB', title: 'supabase/schema.sql', text: 'Canonical PostgreSQL with Row-Level Security.' },
    ],
    archNote:
      'The part that calculates measurements is separated from the part that builds the price. That is why bringing in the factory numbers changed the material quantities without touching the pricing logic, and the whole calculation can be tested on its own, with no database.',
    securityLabel: 'security by design',
    securityHeading: 'There is client data and internal costs at stake: security was a requirement, not an add-on.',
    security: [
      { title: 'No data served straight from the database', text: 'Everything goes through the server with login. The database master key lives only there, it never reaches the client’s browser.' },
      { title: 'Share links impossible to guess', text: 'A summary link is not a running number (1, 2, 3…) but a random code, so nobody can change it to peek at other people’s orders.' },
      { title: 'Inputs always bounded', text: 'Dimensions up to 6000 mm, integer quantities with a cap, limited text. Nothing gets in without checks.' },
      { title: 'Internal costs never exposed', text: 'The client sees the final price, never the cost, the margin or the price per square meter. All the calculation happens on the server.' },
    ],
    qualityLabel: 'quality & engineering',
    qualityHeading: 'Measure before you claim.',
    quality: [
      { metric: 'Factory recipes analyzed', value: '2,641' },
      { metric: 'Automated tests (Jest)', value: '68+' },
      { metric: 'Material error vs. the factory system', value: '2.44× → ~1%' },
      { metric: 'Code quality', value: 'Strict TypeScript, no type errors' },
    ],
    qualityNote:
      'The "shadow mode": a tool that compares, window by window, what my system calculates against the real parts breakdown from the factory software. It measures how far off I am before calling a price good. The difference between "I think it’s right" and "I measured it".',
    shotsLabel: 'demo',
    shotsHeading: 'The quoter in action.',
    learningsLabel: 'why this project represents me',
    learnings: [
      'The hard problem is rarely the visible one: the screen was the easy part, the value was in calculating well and validating the numbers.',
      'I did not brute-force copy the 2,641 recipes: I pulled out only what moves the cost and left the rest as separate research.',
      'Measure before you claim: "shadow mode" turned a hunch ("the price doesn’t add up") into a number (2.44×) and then into a validation (~1%).',
      'Security and traceability from day one, not as a patch.',
    ],
    ctaHeading: 'Got a calculation or an operation that a simple formula can’t pin down?',
    ctaText: 'That’s the kind of problem I enjoy. The code for this project is private, but we can talk about it.',
    ctaTalk: "Let's talk about the project",
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Video walkthrough of the quoter, from building the window to the submitted order', caption: 'System walkthrough: from building the window in 3D to the submitted order.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Quoted window rendered in 3D rotating on its axis', caption: '3D visualization: the quoted window rotates to be seen from any angle.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'Generated PDF with the assembled quote', caption: 'PDF generated automatically with the assembled quote, ready to save or share.', width: 990, height: 1041, loop: false },
    ],
  },

  thanks: {
    title: 'Message sent.',
    text: 'Thanks for reaching out. I got your message and I will get back to you as soon as I can.',
    home: 'Back to home',
    whatsapp: 'WhatsApp',
    mail: 'Mail',
  },
};

export const dictionaries = { es, en };
export type Dictionary = typeof es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localizedHref(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'es') return normalized;
  if (normalized === '/') return '/en';
  return `/en${normalized}`;
}
