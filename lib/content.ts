import {
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Clock3,
  Database,
  FlaskConical,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  RefreshCw,
  Ruler,
  Server,
  UserRound,
  WalletCards,
} from 'lucide-react';
import { arceMedia } from './site';

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
  year?: string;
  image?: string;
  video?: string;
  tags: string[];
};

export type CaseStudyItem = { title: string; text: string };
export type CaseStudyArchStep = { step: string; title: string; text: string };
export type CaseStudyResult = { value: string; label: string };
export type CaseStudyCode = { label: string; note: string; href?: string; cta?: string };
export type CaseStudyGalleryItem = {
  kind: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  loop: boolean;
};

// Shape compartido por los tres case studies (cotizador, stock, arce).
// La estructura fija son cinco puntos numerados: problema de negocio,
// restricciones, decisiones técnicas y por qué, qué se descartó y resultado
// medible. Los campos opcionales habilitan secciones que no todos usan.
export type CaseStudy = {
  title: string;
  back: string;
  backFull: string;
  caseLabel: string;
  category: string;
  year: string;
  roleLabel: string;
  role: string;
  yearLabel: string;
  clientLabel: string;
  client: string;
  code: CaseStudyCode;
  stack: string[];
  tagline: string;
  summary: string;
  metricValue: string;
  metricText: string;
  problemLabel: string;
  problem: string[];
  constraintsLabel: string;
  constraintsHeading: string;
  constraints: CaseStudyItem[];
  insightLabel: string;
  insightHeading: string;
  insight: string[];
  beforeAfterText?: string;
  beforeLabel?: string;
  beforeValue?: string;
  afterLabel?: string;
  afterValue?: string;
  decisionsLabel: string;
  decisionsHeading: string;
  decisions: CaseStudyItem[];
  discardedLabel: string;
  discardedHeading: string;
  discarded: CaseStudyItem[];
  solutionLabel: string;
  solutionHeading: string;
  solution: CaseStudyItem[];
  solutionNote?: string;
  adminLabel?: string;
  adminHeading?: string;
  admin?: CaseStudyItem[];
  adminNote?: string;
  archLabel: string;
  archHeading: string;
  architecture: CaseStudyArchStep[];
  archNote?: string;
  diagram?: { cta: string; label: string; heading: string; text: string };
  securityLabel?: string;
  securityHeading?: string;
  security?: CaseStudyItem[];
  resultsLabel: string;
  resultsHeading: string;
  results: CaseStudyResult[];
  qualityLabel?: string;
  qualityHeading?: string;
  quality?: { metric: string; value: string }[];
  qualityNote?: string;
  demo?: { label: string; heading: string; aria: string; src: string };
  shotsLabel: string;
  shotsHeading: string;
  learningsLabel: string;
  learnings: string[];
  ctaHeading: string;
  ctaText: string;
  ctaContact: string;
  ctaMore: string;
  gallery: CaseStudyGalleryItem[];
};

export type CaseStudySlug = 'cotizador' | 'stock' | 'arce';

const es = {
  htmlLang: 'es',

  nav: {
    items: [
      { label: 'Proyectos', href: '#trabajos' },
      { label: 'Experiencia', href: '#experiencia' },
      { label: 'Sobre mí', href: '#sobre-mi' },
    ],
    cta: 'Contacto',
    status: 'abierto a posiciones',
    timeSr: 'hora local en Montevideo, Uruguay',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    switchLabel: 'EN',
    switchAria: 'Ver el sitio en inglés',
  },

  hero: {
    status: 'abierto a posiciones de desarrollo · montevideo, uy',
    title: {
      sr: 'Desarrollador backend. Construyo sistemas de gestión para operaciones reales.',
      l1: 'Desarrollador backend.',
      l2: 'Sistemas de gestión',
      l3pre: 'para operaciones',
      highlight: 'reales.',
    },
    copy: 'Trabajo en Grupo CPS, donde armé los tres sistemas que están acá abajo: stock, cotización de aberturas y monitoreo de licitaciones. Los hice solo, desde el modelo de datos hasta el deploy, y la empresa los usa todos los días.',
    ctaWork: 'Ver proyectos',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    portraitAlt: 'Sebastián Viglione',
  },

  bento: {
    estadoLabel: 'estado',
    estado: [
      { label: 'estado', value: 'abierto a posiciones', live: true },
      { label: 'base', value: 'Montevideo, UY', live: false },
      { label: 'idiomas', value: 'español · inglés C1', live: false },
      { label: 'formación', value: 'Ing. en Sistemas · UM', live: false },
    ],
    stackLabel: 'stack a diario',
    stack: ['typescript', 'node.js', 'next.js / react', 'postgresql', 'sql', 'supabase'],
    terminalTitle: 'cómo trabajo',
    values: [
      { title: 'Reglas en la base', text: 'las validaciones importantes viven en PostgreSQL, no en la interfaz.' },
      { title: 'Números verificados', text: 'antes de dar un cálculo por bueno lo comparo contra el sistema real.' },
      { title: 'Historial completo', text: 'los movimientos no se editan ni se borran, se registran.' },
    ],
    projectsLabel: 'en producción · grupo cps',
    portraitName: 'Sebastián Viglione',
    portraitRole: 'backend · grupo cps',
  },

  about: {
    label: 'sobre mí',
    heading: 'Sistemas internos, de la base de datos al deploy.',
    intro:
      'Trabajo como Developer & Systems Technician en Grupo CPS, una empresa de construcción y aberturas de aluminio. Los tres sistemas de esta página los hice ahí, solo: modelo de datos, reglas de negocio, API, interfaz y deploy en el servidor de la empresa.',
    body:
      'Lo que más me gusta es la parte de backend: entender bien el dominio y modelarlo, y que las reglas queden donde nadie las pueda saltear. Estudio Ingeniería en Sistemas en la Universidad de Montevideo y tengo inglés C1.',
    facts: [
      { label: 'Estudiante de Ingeniería en Sistemas · Universidad de Montevideo', icon: GraduationCap },
      { label: 'Developer & Systems Technician · Grupo CPS', icon: Briefcase },
      { label: 'Español nativo · Inglés C1 (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack, por nivel de dominio',
  },

  experience: {
    label: 'experiencia',
    heading: 'Dónde trabajé y qué hice.',
    items: [
      {
        role: 'Developer & Systems Technician',
        company: 'Grupo CPS',
        period: '12/2024 – actualidad',
        place: 'Montevideo, UY',
        bullets: [
          'Diseñé y construí Depósitos CPS, el sistema de stock de la empresa: kardex inmutable, costeo promedio ponderado y RPCs transaccionales en PostgreSQL, con ~160 aserciones de test sobre el núcleo SQL y 32 migraciones aplicadas por CI.',
          'Desarrollé el motor de cálculo del cotizador de aberturas: reverse engineering de 2.641 recetas de fábrica que bajó el error de material de 2,44× a ~1%, con 68+ tests automáticos.',
          'Automaticé el monitoreo de licitaciones públicas con n8n, Puppeteer e IA local: ~10 horas semanales de revisión manual eliminadas para el equipo comercial.',
          'Opero la infraestructura de esos sistemas en el VPS de la empresa: Supabase self-hosted, Docker y Coolify, con deploy automático en cada push, migraciones por CI y backups diarios.',
        ],
      },
    ],
    educationLabel: 'formación',
    education: [
      { title: 'Ingeniería en Sistemas', place: 'Universidad de Montevideo', period: 'en curso' },
      { title: 'Bachillerato Tecnológico en Informática', place: 'UTU Brazo Oriental', period: 'egresado' },
      { title: 'Inglés C1', place: 'Cambridge Advanced (CAE)', period: '' },
    ],
  },

  stackLevels: [
    {
      title: 'Trabajo a diario',
      note: 'Lo que uso todos los días.',
      items: ['TypeScript', 'Node.js', 'Next.js / React', 'PostgreSQL', 'SQL', 'Supabase'],
    },
    {
      title: 'Usado en producción',
      note: 'Lo usé en proyectos en producción, pero no todos los días.',
      items: ['Python', 'n8n', 'Docker', 'Linux', 'Ollama', 'Puppeteer', 'Jest', 'Three.js', 'Tailwind', 'Coolify'],
    },
    {
      title: 'Aprendiendo',
      note: 'En curso.',
      items: ['.NET / C#'],
    },
  ],

  work: {
    heading: 'Tres sistemas en producción, hechos de cero.',
    monoLabel: '[ proyectos ] — en producción ahora',
    statusChip: 'todo operativo',
    sitesLine: 'También hice cuatro sitios institucionales:',
    cursorLabel: 'VER',
    tools: [
      {
        name: 'Cotizador de Aberturas',
        domain: 'Case study',
        url: '/cotizador',
        description: 'Web B2B donde el cliente arma su pedido de aberturas y recibe un precio creíble. El núcleo es un motor de cálculo calibrado con reverse engineering sobre 2.641 recetas reales de fábrica.',
        label: 'COTIZADOR',
        kind: 'Motor de cálculo · Full-stack',
        year: '2026',
        cta: 'Ver case study',
        image: '/assets/projects/cotizador/imagen_hero.png',
        tags: ['Next.js', 'TypeScript', 'Three.js', 'Supabase', 'Pricing engine'],
      },
      {
        name: 'Depósitos CPS',
        domain: 'Case study',
        url: '/stock',
        description: 'Sistema interno de stock para depósitos y obras: compras, transferencias, vales y herramientas por número de serie sobre un kardex inmutable, con costeo promedio ponderado y alertas.',
        label: 'STOCK',
        kind: 'Sistema de stock · Grupo CPS',
        year: '2026',
        cta: 'Ver case study',
        image: '/assets/projects/depositos_cps/dashboard_inicial.png',
        tags: ['Next.js', 'Supabase', 'PostgreSQL', 'RLS'],
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Automatización que monitorea, filtra y analiza licitaciones públicas con n8n, PostgreSQL y modelos de IA local para detectar oportunidades.',
        label: 'ARCE',
        kind: 'Automatización & IA · Grupo CPS',
        year: '2025',
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

  practices: {
    label: 'cómo trabajo',
    heading: 'Cosas que hago siempre, en cualquier proyecto.',
    items: [
      {
        number: 1,
        title: 'Las reglas van en la base',
        text: 'Restricciones, transacciones y RLS en PostgreSQL. Si una regla solo existe en la interfaz, cualquiera que hable directo con la API se la saltea.',
        icon: Database,
      },
      {
        number: 2,
        title: 'Verifico los números',
        text: 'Cuando un cálculo importa, lo comparo contra el sistema que ya usa la empresa antes de darlo por bueno.',
        icon: Ruler,
      },
      {
        number: 3,
        title: 'Testeo donde está la lógica',
        text: 'Si la regla vive en SQL, el test corre en SQL. Si el motor de cálculo es puro, se prueba sin base de datos.',
        icon: FlaskConical,
      },
      {
        number: 4,
        title: 'Deploy reproducible',
        text: 'Docker, migraciones versionadas aplicadas por CI y backups diarios. Si la verificación falla, no se despliega.',
        icon: Server,
      },
    ],
  },

  contact: {
    label: 'contacto',
    title: {
      sr: '¿Hablamos?',
      l1: '¿Hablamos?',
      l2: '',
    },
    copy: 'Si querés hablar de una posición o preguntarme por alguno de estos proyectos, escribime. Respondo por mail o LinkedIn.',
    mail: 'Mail',
    social: 'También en:',
    formName: 'Tu nombre',
    formEmail: 'Tu email',
    formMessage: 'Mensaje',
    formSubmit: 'Enviar',
    formSending: 'Enviando',
    formDirectPre: 'Si preferís ir directo, escribime a',
  },

  footer: {
    tagline: 'hecho por mí, obviamente.',
  },

  // Contenido comercial: vive en /servicios, sin enlace desde la home.
  services: {
    label: 'qué puedo hacer por tu empresa',
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

  reasons: {
    label: 'cómo trabajo',
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

  servicesPage: {
    back: 'Volver',
    backFull: 'Volver al inicio',
    kicker: 'servicios',
    heading: 'Software a medida para empresas.',
    intro:
      'Sitios web, sistemas de gestión, automatización e IA aplicada para empresas que quieren ordenar su operación. Del sitio web al sistema interno que ahorra horas de trabajo manual, sin equipos grandes ni procesos eternos.',
    systemsLabel: 'sistemas en producción',
    systemsHeading: 'Lo que ya está funcionando.',
    systemsCta: 'Ver case study',
    sitesLabel: 'sitios web',
    sitesHeading: 'Cuatro sitios institucionales y comerciales en línea.',
    contactHeading: '¿Tenés un proyecto en mente?',
    contactText: 'Contame qué necesitás. Sin compromisos, sin tecnicismos. Si puedo ayudarte, te lo digo. Si no, también.',
    contactCta: 'Hablemos',
    contactMail: 'Escribirme por mail',
  },

  cotizador: {
    title: 'Cotizador de Aberturas',
    back: 'Volver',
    backFull: 'Volver a proyectos',
    caseLabel: 'case study',
    category: 'Motor de cálculo · Full-stack',
    year: '2026',
    roleLabel: 'Rol',
    role: 'Desarrollador único: producto, motor de cálculo, backend, base de datos y seguridad',
    yearLabel: 'Año',
    clientLabel: 'Cliente',
    client: 'Grupo CPS, industria de aberturas (aluminio + vidrio)',
    code: { label: 'Código', note: 'Privado · propiedad de Grupo CPS' },
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Three.js', 'Supabase', 'PostgreSQL', 'RLS', 'Jest'],
    tagline: 'Un cotizador de aberturas que da precios creíbles, no números inventados.',
    summary:
      'Una web donde el cliente arma su pedido de ventanas de aluminio y vidrio y recibe un precio estimado. El desafío no era la pantalla, sino calcular bien el precio: lo que parecía una fórmula simple en realidad dependía de cuánto aluminio y vidrio usa cada ventana de verdad. Para acertar, estudié las 2.641 recetas reales del software de fábrica y saqué de ahí los números que mueven el costo.',
    metricValue: '2,44× → ~1%',
    metricText: 'Cuánto bajó el error al calcular el aluminio, comparado con el sistema de fábrica. No lo arreglé con un número de ajuste a dedo, sino entendiendo de dónde venía la diferencia.',
    problemLabel: '01 · problema de negocio',
    problem: [
      'Grupo CPS fabrica aberturas de aluminio y vidrio. Cotizar a mano cada pedido es lento y depende de personal técnico: cada consulta de un cliente ocupaba tiempo de alguien de fábrica antes de saber siquiera si el pedido iba en serio.',
      'Querían una web sencilla donde el cliente se registre, arme un carrito con sus ventanas, envíe el pedido y le hagan seguimiento. El problema estaba en la palabra "sencilla": el precio de una ventana no sale de multiplicar el área por un precio por metro cuadrado. Depende de cuánto perfil de aluminio lleva cada tipo de ventana (marco, hoja, contravidrio, travesaños), de la medida real del vidrio, de herrajes, mano de obra, margen e IVA.',
      'La empresa ya calculaba todo esto con precisión en su software de fábrica, WinMaker, que guarda una "receta" por cada tipo de ventana: 2.641 archivos en un formato cerrado, imposible de usar directo en una web. Mi primer cálculo simple contaba 2,44 veces menos aluminio del que la ventana usa en realidad.',
    ],
    constraintsLabel: '02 · restricciones',
    constraintsHeading: 'Lo que había que tener en cuenta.',
    constraints: [
      { title: 'Sin acceso al software de fábrica desde la web', text: 'WinMaker es un sistema de escritorio con formato propio. No expone API ni se puede consultar en vivo: lo que necesitara de él tenía que extraerse una vez y quedar en mi modelo.' },
      { title: 'Costos internos que no pueden salir', text: 'El cliente tiene que ver un precio final, nunca el costo, el margen ni el precio por metro cuadrado. Cualquier diseño donde el navegador calcule quedaba descartado de entrada.' },
      { title: 'Datos que mantienen los técnicos, no el programador', text: 'Recetas, catálogos, colores y parámetros cambian con la fábrica. Tenían que poder cargarse desde un panel, sin tocar código.' },
      { title: 'Un solo desarrollador', text: 'Producto, motor, backend, base de datos y seguridad, en paralelo con otros sistemas de la empresa. Cada capa tenía que ser simple de mantener.' },
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
    decisionsLabel: '03 · decisiones técnicas y por qué',
    decisionsHeading: 'Por qué está armado así.',
    decisions: [
      { title: 'Motor de cálculo puro, sin I/O', text: 'Todo el pricing son funciones puras, testeables sin base de datos. Por eso tiene 68+ tests Jest y se pudo validar contra la fábrica sin levantar ningún servicio.' },
      { title: 'Geometría separada del costeo', text: 'Las recetas cambian cuánto material se cuenta; el costeo (costo por metro, costo por m², herrajes, margen, IVA) no se tocó. Traer los números de la fábrica no rompió nada de lo que ya funcionaba.' },
      { title: 'Parser propio y evaluador AST para el formato .PRO', text: 'En vez de ejecutar las recetas, un parser estático extrae por tipología solo las constantes geométricas (74, 126, 82/148 mm según el tipo) y cada una queda citada a su archivo de origen.' },
      { title: 'Snapshot inmutable por pedido', text: 'Cada pedido congela precios y nombres del momento, con folio asignado de forma atómica en la base (FOR UPDATE). Dos pedidos simultáneos nunca comparten número y un precio enviado no cambia por detrás.' },
      { title: 'Todo el cálculo del lado del servidor', text: 'Los endpoints devuelven DTOs sin datos sensibles. La service role vive solo en el servidor y RLS está habilitado sin políticas públicas.' },
      { title: 'Fallback explícito, nunca silencioso', text: 'Lo que no tiene receta cargada cotiza por estimación con el modelo genérico y queda marcado como tal. Un semáforo por receta muestra qué falta para cotizar con costo real.' },
    ],
    discardedLabel: '04 · qué se descartó',
    discardedHeading: 'Lo que descarté en el camino.',
    discarded: [
      { title: 'Fórmula área × precio por m²', text: 'Rápida, pero contaba 2,44 veces menos aluminio del real. Un factor de ajuste a dedo habría escondido el error en vez de corregirlo.' },
      { title: 'Portar WinMaker entero a la web', text: 'Preciso, pero inviable: 2.641 recetas en un formato cerrado y un motor de fabricación completo, para lo que tenía que ser un cotizador de entrada.' },
      { title: 'Links de resumen con ID secuencial', text: 'Permitían enumerar pedidos ajenos cambiando un número. Se reemplazaron por tokens UUID imposibles de adivinar.' },
      { title: 'Calcular en el navegador', text: 'Habría expuesto costos y márgenes a cualquiera que abriera las herramientas de desarrollo. Todo el motor corre en el servidor.' },
    ],
    solutionLabel: 'qué se construyó',
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
      'El cotizador no reemplaza a WinMaker, el sistema con el que la fábrica cotiza desde siempre: es la puerta de entrada para el cliente. Detrás, el cliente nunca ve costos internos ni margen: todo el cálculo ocurre en el servidor y al navegador solo llega el precio final.',
    adminLabel: 'el otro lado: administración',
    adminHeading: 'Un panel interno donde los técnicos cargan la realidad de la fábrica.',
    admin: [
      {
        title: 'Recetas técnicas parametrizables',
        text: 'Los técnicos cargan qué lleva cada abertura: perfiles con sus cortes, accesorios, vidrios y límites fabricables. Cada receta elige componentes de catálogos reales: perfiles y tiras de aluminio, herrajes, cámaras de DVH y mano de obra por estación.',
      },
      {
        title: 'Semáforo de costo real',
        text: 'Un "estado de carga" muestra qué le falta a cada receta para cotizar con costo real: rojo si la receta no tiene perfiles cargados o algún perfil está sin costo, amarillo si falta mano de obra, verde cuando el costo está completo.',
      },
      {
        title: 'Resolución con fallback',
        text: 'Si una combinación no tiene receta cargada, el motor no rompe: cotiza por estimación con el modelo genérico y lo marca como tal, así el equipo sabe exactamente qué falta afinar.',
      },
      {
        title: 'Parámetros que gobiernan el motor',
        text: 'Margen, IVA, desperdicios, recargos por color con su código WinMaker, la tasa de cambio USD/UYU que usa el motor y usuarios con roles y descuentos: todo lo que afecta el precio se administra desde el panel, detrás de APIs con control de acceso por rol.',
      },
    ],
    adminNote:
      'Esto es lo que hace que el sistema viva sin el programador: los dueños de los datos son los técnicos de la fábrica, no el código. La página del cliente es la mitad visible; esta es la mitad que la mantiene honesta.',
    diagram: {
      cta: 'Ver el diagrama interactivo',
      label: 'el sistema, en un diagrama',
      heading: 'Cómo encaja todo, en un diagrama que se puede tocar.',
      text: 'Cinco vistas con cajas que se pueden mover y un recorrido explicado paso a paso: el circuito completo, lo que hace el cliente, cómo se calcula el precio, lo que carga el técnico y cómo llega el pedido a la fábrica. Es la misma pieza que uso para explicar el sistema en diez minutos.',
    },
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
      { title: 'Pedidos congelados y auditables', text: 'Cada pedido guarda un snapshot inmutable de precios y nombres, con folio asignado de forma atómica en la base: dos pedidos simultáneos jamás comparten número, y nada cambia después por detrás.' },
      { title: 'Moneda con red de seguridad', text: 'Los costos conviven en dólares y pesos con una convención explícita de conversión. Si la tasa falta, el sistema degrada a un factor neutro definido en vez de romper a mitad del cálculo.' },
    ],
    resultsLabel: '05 · resultado medible',
    resultsHeading: 'Lo que se puede medir.',
    results: [
      { value: '2,44× → ~1%', label: 'de error en el cálculo de aluminio frente al sistema de fábrica, corregido en la geometría y no con un factor de ajuste.' },
      { value: '2.641', label: 'recetas reales de fábrica analizadas por reverse engineering.' },
      { value: '68+', label: 'tests automáticos: unitarios, de integración y el "modo sombra" contra WinMaker.' },
      { value: 'En producción', label: 'en cotizador.grupocps.com.uy, la puerta de entrada de los clientes de Grupo CPS.' },
    ],
    qualityLabel: 'calidad e ingeniería',
    qualityHeading: 'Cómo sé que los números están bien.',
    quality: [
      { metric: 'Recetas de fábrica analizadas', value: '2.641' },
      { metric: 'Formato cerrado .PRO descifrado', value: 'Parser propio + evaluador AST seguro' },
      { metric: 'Tests automáticos (Jest)', value: '68+' },
      { metric: 'Error de material vs. el sistema de fábrica', value: '2,44× → ~1%' },
      { metric: 'Auditoría propia del código', value: 'Hallazgos C1 a C8, catalogados y corregidos' },
      { metric: 'Calidad de código', value: 'TypeScript estricto, sin errores de tipo' },
    ],
    qualityNote:
      'El "modo sombra": una herramienta que compara, ventana por ventana, lo que calcula mi sistema contra el desglose real de piezas del software de fábrica. Sirve para medir cuánto me desvío antes de dar un precio por bueno.',
    shotsLabel: 'demo',
    shotsHeading: 'El cotizador en acción.',
    learningsLabel: 'aprendizajes',
    learnings: [
      'El problema difícil rara vez es el que se ve: la pantalla era lo fácil, el valor estaba en calcular bien y validar los números.',
      'No copié las 2.641 recetas a la fuerza: saqué solo lo que mueve el costo y dejé el resto como investigación aparte.',
      'Medir antes de afirmar: el "modo sombra" convirtió una corazonada ("el precio no cierra") en un número (2,44×) y después en una validación (~1%).',
      'El sistema completo incluye a quien lo mantiene: el panel interno y su semáforo de carga hacen que los técnicos, no el programador, sean los dueños de los datos.',
    ],
    ctaHeading: '¿Querés hablar de este proyecto?',
    ctaText: 'El código es privado, pero puedo contar en detalle cómo está hecho. Escribime si te interesa esto o querés hablar de una posición.',
    ctaContact: 'Contacto',
    ctaMore: 'Ver más proyectos',
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Recorrido en video por el cotizador, del armado de la ventana al pedido enviado', caption: 'Recorrido por el sistema: del armado de la abertura en 3D al pedido enviado.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Ventana cotizada renderizada en 3D girando sobre su eje', caption: 'Visualización 3D: la ventana cotizada gira para verse desde cualquier ángulo.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'PDF generado con la cotización armada', caption: 'PDF generado automáticamente con la cotización armada, listo para guardar o compartir.', width: 990, height: 1041, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_1.png', alt: 'Panel interno de carga técnica del cotizador', caption: 'El panel interno: recetas técnicas y catálogos de perfiles, tiras, vidrios, herrajes, mano de obra y parámetros que alimentan el motor.', width: 1920, height: 989, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_2.png', alt: 'Estado de carga de recetas con semáforo de costo real', caption: 'El "estado de carga": semáforo por receta que muestra qué falta para cotizar con costo real, y qué tipologías siguen cotizando por estimación.', width: 1920, height: 1018, loop: false },
    ],
  },

  stock: {
    title: 'Depósitos CPS',
    back: 'Volver',
    backFull: 'Volver a proyectos',
    caseLabel: 'case study',
    category: 'Sistema de stock · Full-stack',
    year: '2026',
    roleLabel: 'Rol',
    role: 'Desarrollador único: modelo de datos, núcleo SQL, backend, frontend y deploy',
    yearLabel: 'Año',
    clientLabel: 'Cliente',
    client: 'Grupo CPS, construcción y aberturas de aluminio',
    code: { label: 'Código', note: 'Privado · herramienta interna de Grupo CPS' },
    stack: ['Next.js', 'TypeScript', 'Tailwind 4', 'shadcn/ui', 'Supabase', 'PostgreSQL', 'RLS', 'Coolify'],
    tagline: 'El stock de toda la empresa en un solo lugar: qué hay, dónde está y a qué obra se fue.',
    summary:
      'Sistema interno de Grupo CPS para gestionar materiales y herramientas entre depósitos y obras: pedidos y órdenes de compra, transferencias, vales de consumo con rendición, reparaciones y ajustes. Cada operación queda asentada en un kardex inmutable con costeo por precio promedio ponderado, y el equipo ve stock valorizado, alertas y reportes en vivo.',
    metricValue: '100% trazable',
    metricText:
      'El stock nunca se corrige "a dedo": cada cambio nace de un comprobante numerado, con usuario y fecha. El número que ves es la suma de su historia. Y el stock negativo es imposible por diseño, incluso con operaciones simultáneas.',
    problemLabel: '01 · problema de negocio',
    problem: [
      'Grupo CPS mueve materiales y herramientas entre varios depósitos y obras en simultáneo. Ese movimiento se seguía con planillas, mensajes y memoria: saber cuánto había de un artículo y dónde estaba implicaba llamar, contar y confiar.',
      'Las consecuencias eran siempre las mismas: faltantes que aparecían con la obra arrancada, material "en viaje" que no figuraba en ningún lado, compras de apuro sin registro, y ningún número confiable de cuánto capital había inmovilizado en stock ni cuánto había consumido cada obra.',
      'Y había un problema más fino: las herramientas. Una amoladora no es "3 amoladoras": es esta amoladora, con su número de serie, que está en tal obra, volvió rota o se perdió. Y alguien tiene que responder por ella.',
    ],
    constraintsLabel: '02 · restricciones',
    constraintsHeading: 'Lo que había que tener en cuenta.',
    constraints: [
      { title: 'Varios depósitos y obras operando a la vez', text: 'Movimientos concurrentes desde distintos lugares. El saldo no puede depender de que dos personas no carguen al mismo tiempo.' },
      { title: 'Usuarios no técnicos, con roles distintos', text: 'Logística opera; jefes de obra y dirección consultan y piden. Cada uno tenía que ver y poder hacer solo lo suyo, sin que eso dependiera de la buena voluntad.' },
      { title: 'Servidor propio, sin nube de terceros', text: 'Los datos de la empresa quedan en su VPS. Eso fijó Supabase self-hosted, Docker y Coolify, y me dejó a cargo también de la operación.' },
      { title: 'Números que tienen que poder defenderse', text: 'El stock valorizado y el gasto por obra se usan para decidir compras y cerrar obras. Una estimación no sirve: cada número tiene que explicarse con comprobantes.' },
    ],
    insightLabel: 'la decisión clave',
    insightHeading: 'El stock no se edita: se registra. Todo lo demás se deriva de ahí.',
    insight: [
      'La decisión que ordena todo el sistema: nadie escribe "quedan 40 bolsas". Se registra el movimiento que lo explica (una compra recibida, una transferencia, un vale de consumo, un ajuste) como asiento de un kardex inmutable: los movimientos solo se insertan, y corregir es generar el contra-asiento, nunca borrar.',
      'El saldo por depósito lo mantiene la propia base de datos, con una restricción que hace imposible el stock negativo incluso con operaciones concurrentes. Y lo que está viajando o en el service también es stock: los depósitos virtuales "En tránsito" y "Reparación" garantizan que la suma de todos los saldos siempre iguale el stock real de la empresa.',
      'Sobre esa base, el costeo usa precio promedio ponderado congelado en cada movimiento: las transferencias no alteran el promedio y las devoluciones reingresan al costo del vale original. Por eso el "stock valorizado" del dashboard es un número defendible, no una estimación.',
    ],
    decisionsLabel: '03 · decisiones técnicas y por qué',
    decisionsHeading: 'Por qué está armado así.',
    decisions: [
      { title: 'Kardex append-only', text: 'Los movimientos solo se insertan; corregir es contra-asentar. Con esa sola decisión salieron gratis la auditoría, las anulaciones, el kardex por período y la valorización: todo es una consulta sobre la misma tabla.' },
      { title: 'El saldo lo mantiene la base, no la app', text: 'Un trigger actualiza el saldo por depósito en cada asiento y una restricción lo impide bajar de cero. Dos operaciones simultáneas sobre el mismo artículo no pueden dejar stock negativo, sin locks en la aplicación.' },
      { title: 'Costeo promedio ponderado congelado en cada movimiento', text: 'El costo unitario queda fijado al asentar: las transferencias no alteran el promedio y las devoluciones reingresan al costo del vale original. Así la valorización no cambia retroactivamente.' },
      { title: 'RPCs transaccionales como única puerta de escritura', text: 'Cada operación es una función SECURITY DEFINER que valida rol y reglas de negocio dentro de una transacción. Las tablas de movimientos no tienen políticas de escritura: aunque alguien hable directo con la API, no puede saltarse las reglas.' },
      { title: 'Depósitos virtuales "En tránsito" y "Reparación"', text: 'Lo que viaja o está en el service también es stock, en un depósito propio. Así la suma de todos los saldos siempre iguala el stock real y nada queda "en ningún lado".' },
      { title: 'Herramientas como unidades, no como cantidades', text: 'Cada herramienta tiene número de serie y ciclo de vida propio: disponible → en obra → en reparación → rota o perdida. Las rotas o perdidas se imputan a la obra que las tenía.' },
    ],
    discardedLabel: '04 · qué se descartó',
    discardedHeading: 'Lo que descarté en el camino.',
    discarded: [
      { title: 'Editar cantidades directamente', text: 'Es lo que hacían las planillas. Sin la historia detrás del número, no hay forma de explicar un faltante, anular sin borrar ni valorizar el stock.' },
      { title: 'Reglas de negocio en la capa de aplicación', text: 'Cualquier cliente que hable con la API podría saltárselas, y cada regla habría que repetirla en cada pantalla. En PostgreSQL hay una sola puerta y no tiene atajo.' },
      { title: 'Supabase en la nube', text: 'Más cómodo, pero los datos de la empresa saldrían de su servidor. Pesó más tener el control y no pagar un plan; a cambio, la operación la llevo yo.' },
      { title: 'Un sistema solo de materiales', text: 'Sin herramientas por número de serie, la mitad del problema (quién tiene qué, en qué obra, y quién responde) seguía viviendo en mensajes.' },
    ],
    solutionLabel: 'qué se construyó',
    solutionHeading: 'Todo el circuito del material, del pedido a la obra.',
    solution: [
      { title: 'Pedidos y órdenes de compra', text: 'Cualquier usuario, también los jefes de obra, pide lo que necesita con destino y fecha límite. Logística arma las órdenes, que pueden mezclar proveedores por renglón y alimentan un histórico de precios por artículo y proveedor.' },
      { title: 'Recepciones parciales', text: 'Las compras y transferencias se reciben de a tandas. Cerrar con faltantes es una decisión explícita, con motivo: recién ahí se da de baja lo que no llegó.' },
      { title: 'Transferencias "en viaje"', text: 'El material que va de un depósito a otro pasa por un estado intermedio real: mientras viaja no está en ninguno de los dos, está en tránsito, con camión y personas asignadas al traslado.' },
      { title: 'Vales de consumo con rendición', text: 'Lo que sale a obra se rinde: lo usado se imputa al gasto de la obra y lo que vuelve reingresa al stock al costo congelado del vale.' },
      { title: 'Herramientas por número de serie', text: 'Cada unidad física tiene su ciclo de vida: disponible → en obra → en reparación → rota o perdida. Se rinden por unidad, y las rotas o perdidas se imputan a la obra que las tenía.' },
      { title: 'Dashboard y alertas por usuario', text: 'Cada usuario arma su inicio con los widgets que le sirven, y las notificaciones avisan solas: pedidos vencidos o por vencer, transferencias demoradas y stock bajo mínimo.' },
    ],
    solutionNote:
      'El sistema también resuelve lo aburrido pero crítico: kardex por depósito u obra en cualquier período, consulta de un artículo en todos los depósitos a la vez, compras en pesos o dólares con su moneda registrada, y órdenes de compra en PDF con lugar para firmas, porque el circuito físico con el proveedor también es parte del sistema.',
    diagram: {
      cta: 'Ver el diagrama interactivo',
      label: 'el sistema, en un diagrama',
      heading: 'Cómo encaja todo, en un diagrama que se puede tocar.',
      text: 'Cinco vistas con cajas que se pueden mover y un recorrido explicado paso a paso: quién usa el sistema y qué hay detrás, el circuito del material del pedido a la obra, cómo se asienta y se valoriza cada movimiento, la vida de una herramienta con número de serie y cómo está construido.',
    },
    archLabel: 'arquitectura',
    archHeading: 'La lógica de negocio vive en la base de datos, no en la interfaz.',
    architecture: [
      { step: 'UI', title: 'Next.js + shadcn/ui', text: 'Pantallas de operación y consulta: dashboard personalizable, movimientos, kardex y catálogos.' },
      { step: 'API', title: 'Supabase self-hosted', text: 'PostgreSQL + Auth + API corriendo en el propio servidor de la empresa, no en una nube de terceros.' },
      { step: 'RPC', title: 'RPCs transaccionales', text: 'Cada operación es una función que valida rol y reglas de negocio dentro de la base, en una transacción.' },
      { step: 'LED', title: 'Kardex inmutable', text: 'Los movimientos solo se insertan; corregir es contra-asentar. Un trigger mantiene los saldos por depósito.' },
      { step: 'SEC', title: 'RLS en todas las tablas', text: 'Las tablas de movimientos no tienen políticas de escritura: la única puerta de entrada son las RPCs.' },
      { step: 'OPS', title: 'VPS + Coolify', text: 'Deploy automático en cada push, migraciones aplicadas por CI y backups diarios del servidor y de la base.' },
    ],
    archNote:
      'Ocultar botones en la interfaz es ergonomía; la barrera real está en PostgreSQL. Aunque alguien hablara directo con la API, no puede saltarse las reglas: cada escritura pasa por una función que valida todo del lado de la base.',
    securityLabel: 'seguridad y trazabilidad',
    securityHeading: 'Un sistema de stock es un sistema de confianza: cada número tiene que poder defenderse.',
    security: [
      { title: 'Roles con lo mínimo necesario', text: 'El rol admin opera y administra; el rol consulta (jefes de obra, dirección) lee todo pero solo escribe sus propios pedidos de compra y su dashboard. Y nadie puede auto-promoverse de rol.' },
      { title: 'Usuarios cerrados por defecto', text: 'El registro público está deshabilitado y los perfiles nacen inactivos, sin acceso a datos, hasta que un admin los activa desde la app.' },
      { title: 'Quién hizo qué, siempre', text: 'Emitir, recibir, cancelar, rendir: cada acción queda registrada con usuario y fecha, visible en todas las pantallas para todos los usuarios.' },
      { title: 'Anular no es borrar', text: 'Las anulaciones generan el asiento inverso y la historia queda completa. Nada se corrige en silencio.' },
    ],
    resultsLabel: '05 · resultado medible',
    resultsHeading: 'En números.',
    results: [
      { value: '100%', label: 'de los saldos trazables: cada número es la suma de comprobantes con usuario y fecha.' },
      { value: '0', label: 'stock negativo posible, por restricción de la base, incluso con operaciones concurrentes.' },
      { value: '~160', label: 'aserciones sobre el núcleo SQL, corriendo en una transacción que se revierte.' },
      { value: '32', label: 'migraciones versionadas, aplicadas por CI sobre una base limpia antes de cada deploy.' },
    ],
    qualityLabel: 'calidad e ingeniería',
    qualityHeading: 'El núcleo se prueba donde vive: en SQL.',
    quality: [
      { metric: 'Suite de tests del núcleo SQL', value: '1.500+ líneas · ~160 aserciones' },
      { metric: 'Qué cubre', value: 'Numeración, costeo PPP, recepciones parciales, rendiciones, herramientas por serie, RLS y roles' },
      { metric: 'Stock negativo', value: 'Imposible por diseño, incluso en concurrencia' },
      { metric: 'Esquema versionado', value: '32 migraciones, aplicadas automáticamente por CI' },
    ],
    qualityNote:
      'La suite corre dentro de una transacción que se revierte al final: prueba el núcleo real contra la base real, sin ensuciarla. Si la regla vive en PostgreSQL, el test también.',
    shotsLabel: 'capturas',
    shotsHeading: 'El sistema por dentro.',
    learningsLabel: 'aprendizajes',
    learnings: [
      'Si la gente no le cree al número, vuelve a la planilla. Por eso todo está pensado para que cada saldo se pueda explicar con sus comprobantes.',
      'Modelar movimientos en vez de cantidades simplificó todo lo demás: kardex, auditoría, anulaciones y valorización salieron del mismo diseño.',
      'Poner las reglas de negocio en la base de datos, y testearlas ahí, hace que la seguridad no dependa de qué botones muestra la interfaz.',
      'El circuito físico también es software: la orden de compra en PDF con lugar para firmas importa tanto como la tabla que la genera.',
    ],
    ctaHeading: '¿Querés hablar de este proyecto?',
    ctaText: 'El código es interno de la empresa, pero puedo contar cómo está diseñado. Escribime si te interesa esto o querés hablar de una posición.',
    ctaContact: 'Contacto',
    ctaMore: 'Ver más proyectos',
    gallery: [
      { kind: 'image', src: '/assets/projects/depositos_cps/dashboard_inicial.png', alt: 'Dashboard de inicio del sistema de depósitos de Grupo CPS', caption: 'El dashboard de inicio: stock valorizado, movimientos de los últimos 30 días, stock por depósito, gasto por obra y alertas de pedidos vencidos, transferencias demoradas y stock bajo mínimo.', width: 1920, height: 1079, loop: false },
      { kind: 'image', src: '/assets/projects/depositos_cps/kardex_deposito.png', alt: 'Kardex por depósito con saldos y movimientos del período', caption: 'El kardex por depósito u obra: saldos del período, cada movimiento con su comprobante y su usuario, y anulaciones como contra-asiento. Nada se borra.', width: 1920, height: 1079, loop: false },
      { kind: 'image', src: '/assets/projects/depositos_cps/orden_compra_pdf.png', alt: 'Orden de compra generada en PDF lista para firmar', caption: 'Orden de compra en PDF, lista para imprimir y firmar con el proveedor: el circuito físico también sale del sistema.', width: 1920, height: 1079, loop: false },
    ],
  },

  arce: {
    title: 'Arce',
    back: 'Volver',
    backFull: 'Volver a proyectos',
    caseLabel: 'case study',
    category: 'Automatización & IA',
    year: '2025',
    roleLabel: 'Rol',
    role: 'Diseño, desarrollo e infraestructura, de punta a punta',
    yearLabel: 'Año',
    clientLabel: 'Origen',
    client: 'Grupo CPS, por una necesidad real del equipo comercial',
    code: { label: 'Código', note: 'Público en GitHub', href: arceMedia.repo, cta: 'Ver repositorio' },
    stack: ['n8n', 'Node.js', 'Puppeteer', 'PostgreSQL', 'Ollama', 'IA local', 'Docker', 'Linux', 'Web scraping'],
    tagline: 'Monitoreo y análisis de licitaciones públicas con IA local.',
    summary:
      'Arce monitorea las publicaciones del portal de compras estatales (ARCE), extrae cada llamado, lo estructura, lo analiza con un modelo de IA que corre en local y deja en un dashboard solo las oportunidades relevantes para el equipo comercial.',
    metricValue: '~10 hs',
    metricText: 'de revisión manual ahorradas por semana al equipo comercial. Antes: 2 horas diarias, 5 días a la semana, mirando el portal a mano. Ahora el portal se consulta solo cada 15 minutos.',
    problemLabel: '01 · problema de negocio',
    problem: [
      'Detectar oportunidades significaba revisar a mano el portal de compras estatales (ARCE): un proceso lento, repetitivo y fácil de descuidar entre el resto del trabajo. Eran unas 2 horas diarias, 5 días a la semana, de una persona del equipo comercial.',
      'La información llegaba como texto no estructurado, difícil de comparar y filtrar. Cuando un llamado relevante aparecía y nadie lo veía a tiempo, era una oportunidad perdida: una licitación no se puede presentar fuera de plazo.',
    ],
    constraintsLabel: '02 · restricciones',
    constraintsHeading: 'Lo que había que tener en cuenta.',
    constraints: [
      { title: 'Datos no estructurados, en cualquier formato', text: 'Los pliegos llegan como PDF, DOC, DOCX, XLS o ZIP, a veces enormes. Todo tenía que convertirse a texto antes de poder evaluarlo.' },
      { title: 'Sin depender de una API de IA paga', text: 'Analizar cada pliego con un servicio externo no cerraba ni en costo ni en control de datos. La evaluación tenía que correr en hardware propio.' },
      { title: 'El rubro cambia, el sistema no', text: 'Aluminio hoy, otro rubro mañana. El criterio de relevancia tenía que ser configurable sin tocar código.' },
      { title: 'Usuarios comerciales, no técnicos', text: 'El resultado tenía que ser un dashboard simple, con la posibilidad de corregir a la IA cuando se equivoca.' },
    ],
    insightLabel: 'la decisión clave',
    insightHeading: 'Correr la IA en local y orquestar con n8n, para que el criterio cambie sin reescribir el sistema.',
    insight: [
      'La parte de IA es la más visible pero la más chica. Lo que ordenó el proyecto fue separar tres cosas: el pipeline de datos (que trae, limpia y deduplica cada llamado), el criterio de relevancia (un prompt de rubro que se cambia desde configuración) y la orquestación (un workflow en n8n que se edita sin tocar código).',
      'Así, cambiar el modelo, el rubro o la frecuencia no exige redeployar nada. El equipo comercial ve un dashboard; el resto corre solo cada 15 minutos.',
    ],
    beforeLabel: 'Revisión manual del portal',
    beforeValue: '2 hs/día',
    afterLabel: 'Hoy',
    afterValue: '0',
    beforeAfterText: 'El portal se revisaba a mano dos horas por día, cinco días por semana. Hoy nadie lo abre: n8n lo consulta cada 15 minutos y el dashboard muestra solo lo que importa.',
    decisionsLabel: '03 · decisiones técnicas y por qué',
    decisionsHeading: 'Por qué está construido así.',
    decisions: [
      { title: 'IA local, no en la nube', text: 'Ollama con Llama 3.1 8B mantiene los pliegos dentro de la infraestructura, elimina el costo por consulta y saca de la ecuación los límites de las APIs externas. Un modelo de 8B con un buen prompt de rubro alcanza para esta tarea.' },
      { title: 'n8n para orquestar', text: 'Coordinar el flujo en n8n permite cambiar reglas, fuentes o frecuencia tocando el workflow, en vez de reescribir y redeployar código. También lo puede ajustar alguien que no sea yo.' },
      { title: 'PostgreSQL como base, deduplicado', text: 'Guardar los llamados estructurados en Postgres habilita consultar, comparar y mantener un histórico, en lugar de procesar todo desde cero en cada corrida.' },
      { title: 'Chunking y fallback por metadatos', text: 'Los documentos grandes se parten en chunks para que entren en el contexto del modelo. Si un archivo no se puede extraer, se analiza por metadatos en vez de descartar el llamado.' },
      { title: 'Feedback humano guardado', text: 'El equipo marca desde el dashboard cuándo la IA acertó o se equivocó, y eso queda junto al análisis. Sirve para ajustar el prompt con casos reales.' },
      { title: 'Todo en Docker', text: 'El sistema corre containerizado sobre Linux: reproducible, aislado y desplegable en un servidor propio sin dependencias frágiles.' },
    ],
    discardedLabel: '04 · qué se descartó',
    discardedHeading: 'Lo que descarté en el camino.',
    discarded: [
      { title: 'API de OpenAI u otra nube', text: 'Costo por consulta, límites de uso y pliegos con datos de la empresa saliendo de la infraestructura. Para un proceso que corre cada 15 minutos, no cerraba.' },
      { title: 'Un cron con scripts sueltos', text: 'Funciona hasta que hay que cambiar una fuente, una frecuencia o agregar un paso. En n8n eso se hace sobre el workflow, con el historial de cada ejecución a la vista.' },
      { title: 'Filtrar solo por palabras clave en el título', text: 'Sin leer el pliego, una palabra clave no dice si el llamado es del rubro ni cuándo es la visita técnica. El modelo evalúa el documento completo.' },
    ],
    solutionLabel: 'qué se construyó',
    solutionHeading: 'Un pipeline que va del portal al dashboard sin que nadie lo toque.',
    solution: [
      { title: 'RSS cada 15 minutos', text: 'n8n consulta el feed de ARCE y detecta los llamados nuevos.' },
      { title: 'Scraping del detalle', text: 'Un scraper con Puppeteer extrae cada llamado nuevo y sus adjuntos.' },
      { title: 'Extracción multi-formato', text: 'PDF, DOC, DOCX, XLS y ZIP se convierten a texto, con chunking automático para documentos grandes.' },
      { title: 'Análisis con IA local', text: 'Llama 3.1 en Ollama evalúa la relevancia con un prompt de rubro y detecta fechas de visitas técnicas, lugares y contactos.' },
      { title: 'PostgreSQL deduplicado', text: 'Cada llamado queda estructurado, sin duplicados y con histórico consultable.' },
      { title: 'Dashboard con feedback', text: 'El equipo ve solo las oportunidades relevantes, ordenadas por urgencia, y corrige a la IA cuando se equivoca.' },
    ],
    solutionNote:
      'El tema de interés es configurable: en mi caso filtra por aluminio, el rubro de mi empresa, pero se adapta a cualquier otro sin tocar el código.',
    diagram: {
      cta: 'Ver el diagrama interactivo',
      label: 'el sistema, en un diagrama',
      heading: 'Cómo encaja todo, en un diagrama que se puede tocar.',
      text: 'Cuatro vistas con cajas que se pueden mover y un recorrido explicado paso a paso: el circuito completo del portal al dashboard, el workflow real de n8n nodo por nodo, cómo se analiza cada pliego con IA local y cómo el equipo usa el dashboard y corrige a la IA.',
    },
    archLabel: 'arquitectura',
    archHeading: 'Cómo fluyen los datos, de la fuente al dashboard.',
    architecture: [
      { step: '01', title: 'ARCE (compras estatales)', text: 'Las últimas publicaciones del portal de compras del Estado son el punto de entrada.' },
      { step: '02', title: 'Scraping automatizado', text: 'n8n consulta el RSS cada 15 minutos y un scraper con Puppeteer extrae el detalle de cada llamado nuevo.' },
      { step: '03', title: 'Extracción multi-formato', text: 'Los pliegos (PDF, DOC, DOCX, XLS, ZIP) se convierten a texto estructurado, con chunking automático para documentos grandes.' },
      { step: '04', title: 'PostgreSQL', text: 'Los llamados se almacenan deduplicados y con histórico consultable, sin reprocesar todo cada vez.' },
      { step: '05', title: 'IA local (Ollama)', text: 'Llama 3.1 con un prompt especializado clasifica cada licitación por relevancia y detecta visitas técnicas, fechas y contactos.' },
      { step: '06', title: 'Dashboard', text: 'El equipo ve solo las oportunidades relevantes, listas para actuar.' },
    ],
    archNote:
      'Todo el flujo está orquestado en n8n: ajustar fuentes, reglas o frecuencia se hace sobre el workflow, sin reescribir el sistema.',
    resultsLabel: '05 · resultado medible',
    resultsHeading: 'Qué cambió para el equipo.',
    results: [
      { value: '~10 hs', label: 'de búsqueda manual ahorradas cada semana (antes: 5 días × 2 hs revisando a mano).' },
      { value: '15 min', label: 'entre publicación y detección: ningún llamado nuevo espera más que eso.' },
      { value: '0', label: 'tiempo dedicado a revisar el portal de ARCE manualmente.' },
      { value: 'Configurable', label: 'el rubro de interés se cambia sin tocar el sistema (en mi caso, aluminio).' },
    ],
    demo: {
      label: 'demo',
      heading: 'El dashboard en funcionamiento.',
      aria: 'Demo del dashboard de Arce',
      src: arceMedia.video,
    },
    shotsLabel: 'capturas',
    shotsHeading: 'Por dentro.',
    learningsLabel: 'aprendizajes',
    learnings: [
      'La IA es la parte chica: el valor está en el pipeline que la alimenta con datos limpios, deduplicados y en texto plano.',
      'Orquestar con una herramienta visual hizo que el sistema lo pueda ajustar alguien que no soy yo, sin abrir el código.',
      'Guardar el feedback humano junto al análisis convierte cada error de la IA en un caso para mejorar el prompt.',
    ],
    ctaHeading: '¿Querés hablar de este proyecto?',
    ctaText: 'El código es público. Si querés discutir el diseño o hablar de una posición, escribime.',
    ctaContact: 'Contacto',
    ctaMore: 'Ver más proyectos',
    gallery: [
      { kind: 'image', src: '/assets/projects/arce/dashboard.png', alt: 'Vista principal del dashboard de Arce', caption: 'Dashboard principal: cada llamado con su urgencia y el score de relevancia que le asigna la IA.', width: 1920, height: 1082, loop: false },
      { kind: 'image', src: '/assets/projects/arce/licitacion-detalle.png', alt: 'Detalle de una licitación en Arce', caption: 'Detalle de un llamado: datos estructurados, archivos adjuntos, análisis de la IA y feedback humano.', width: 1920, height: 1082, loop: false },
      { kind: 'image', src: '/assets/projects/arce/n8n-workflow.png', alt: 'Workflow de Arce en n8n', caption: 'El flujo en n8n: RSS, parseo XML→JSON, scraping, filtrado por relevancia y carga a PostgreSQL.', width: 1326, height: 1009, loop: false },
    ],
  },

  thanks: {
    title: 'Mensaje enviado.',
    text: 'Gracias por escribirme. Recibí tu mensaje y te voy a responder apenas pueda.',
    home: 'Volver al inicio',
    mail: 'Mail',
  },
};

const en: typeof es = {
  htmlLang: 'en',

  nav: {
    items: [
      { label: 'Projects', href: '#trabajos' },
      { label: 'Experience', href: '#experiencia' },
      { label: 'About', href: '#sobre-mi' },
    ],
    cta: 'Contact',
    status: 'open to roles',
    timeSr: 'local time in Montevideo, Uruguay',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    switchLabel: 'ES',
    switchAria: 'View the site in Spanish',
  },

  hero: {
    status: 'open to developer roles · montevideo, uy',
    title: {
      sr: 'Backend developer. I build management systems for real operations.',
      l1: 'Backend developer.',
      l2: 'Management systems',
      l3pre: 'for real',
      highlight: 'operations.',
    },
    copy: 'I work at Grupo CPS, where I built the three systems below: stock, joinery quoting and tender monitoring. I did them on my own, from the data model to the deploy, and the company uses them every day.',
    ctaWork: 'View projects',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    portraitAlt: 'Sebastián Viglione',
  },

  bento: {
    estadoLabel: 'status',
    estado: [
      { label: 'status', value: 'open to roles', live: true },
      { label: 'based in', value: 'Montevideo, UY', live: false },
      { label: 'languages', value: 'Spanish · English C1', live: false },
      { label: 'education', value: 'Systems Eng. · UM', live: false },
    ],
    stackLabel: 'daily stack',
    stack: ['typescript', 'node.js', 'next.js / react', 'postgresql', 'sql', 'supabase'],
    terminalTitle: 'how I work',
    values: [
      { title: 'Rules in the database', text: 'the validations that matter live in PostgreSQL, not in the UI.' },
      { title: 'Verified numbers', text: 'before I call a calculation good, I check it against the real system.' },
      { title: 'Full history', text: 'movements are never edited or deleted, only recorded.' },
    ],
    projectsLabel: 'in production · grupo cps',
    portraitName: 'Sebastián Viglione',
    portraitRole: 'backend · grupo cps',
  },

  about: {
    label: 'about me',
    heading: 'Internal systems, from the database to the deploy.',
    intro:
      'I work as a Developer & Systems Technician at Grupo CPS, a construction and aluminum joinery company. The three systems on this page were built there, by me alone: data model, business rules, API, interface and deployment on the company’s server.',
    body:
      'The part I enjoy most is the backend: understanding the domain well enough to model it, and keeping the rules where nobody can skip them. I am studying Systems Engineering at Universidad de Montevideo and my English is C1.',
    facts: [
      { label: 'Systems Engineering student · Universidad de Montevideo', icon: GraduationCap },
      { label: 'Developer & Systems Technician · Grupo CPS', icon: Briefcase },
      { label: 'Native Spanish · C1 English (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack, by level of proficiency',
  },

  experience: {
    label: 'experience',
    heading: 'Where I worked and what I did.',
    items: [
      {
        role: 'Developer & Systems Technician',
        company: 'Grupo CPS',
        period: '12/2024 – present',
        place: 'Montevideo, UY',
        bullets: [
          'Designed and built Depósitos CPS, the company’s stock system: immutable ledger, weighted-average costing and transactional RPCs in PostgreSQL, with ~160 test assertions on the SQL core and 32 migrations applied by CI.',
          'Developed the pricing engine of the joinery quoter: reverse engineering of 2,641 factory recipes that brought the material error down from 2.44× to ~1%, with 68+ automated tests.',
          'Automated public tender monitoring with n8n, Puppeteer and local AI: ~10 hours of manual review per week removed for the sales team.',
          'Operate the infrastructure behind those systems on the company VPS: self-hosted Supabase, Docker and Coolify, with automatic deploys on every push, CI-applied migrations and daily backups.',
        ],
      },
    ],
    educationLabel: 'education',
    education: [
      { title: 'Systems Engineering', place: 'Universidad de Montevideo', period: 'in progress' },
      { title: 'Technological Baccalaureate in Informatics', place: 'UTU Brazo Oriental', period: 'completed' },
      { title: 'English C1', place: 'Cambridge Advanced (CAE)', period: '' },
    ],
  },

  stackLevels: [
    {
      title: 'Daily',
      note: 'What I use every day.',
      items: ['TypeScript', 'Node.js', 'Next.js / React', 'PostgreSQL', 'SQL', 'Supabase'],
    },
    {
      title: 'Used in production',
      note: 'Used in production projects, but not every day.',
      items: ['Python', 'n8n', 'Docker', 'Linux', 'Ollama', 'Puppeteer', 'Jest', 'Three.js', 'Tailwind', 'Coolify'],
    },
    {
      title: 'Learning',
      note: 'In progress.',
      items: ['.NET / C#'],
    },
  ],

  work: {
    heading: 'Three systems in production, built from scratch.',
    monoLabel: '[ projects ] — in production now',
    statusChip: 'all systems running',
    sitesLine: 'I also built four institutional websites:',
    cursorLabel: 'VIEW',
    tools: [
      {
        name: 'Aluminum Joinery Quoter',
        domain: 'Case study',
        url: '/cotizador',
        description: 'A B2B web app where the client builds their order of aluminum-and-glass joinery and gets a credible price. The core is a pricing engine calibrated by reverse engineering 2,641 real factory recipes.',
        label: 'COTIZADOR',
        kind: 'Pricing engine · Full-stack',
        year: '2026',
        cta: 'View case study',
        image: '/assets/projects/cotizador/imagen_hero.png',
        tags: ['Next.js', 'TypeScript', 'Three.js', 'Supabase', 'Pricing engine'],
      },
      {
        name: 'Depósitos CPS',
        domain: 'Case study',
        url: '/stock',
        description: 'Internal stock system for warehouses and construction sites: purchases, transfers, consumption vouchers and serial-numbered tools on an immutable ledger, with weighted-average costing and alerts.',
        label: 'STOCK',
        kind: 'Stock system · Grupo CPS',
        year: '2026',
        cta: 'View case study',
        image: '/assets/projects/depositos_cps/dashboard_inicial.png',
        tags: ['Next.js', 'Supabase', 'PostgreSQL', 'RLS'],
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Automation that monitors, filters and analyzes public tenders with n8n, PostgreSQL and local AI models to surface opportunities.',
        label: 'ARCE',
        kind: 'Automation & AI · Grupo CPS',
        year: '2025',
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

  practices: {
    label: 'how I work',
    heading: 'Things I do on every project.',
    items: [
      {
        number: 1,
        title: 'Rules go in the database',
        text: 'Constraints, transactions and RLS in PostgreSQL. If a rule only exists in the UI, anyone talking straight to the API can skip it.',
        icon: Database,
      },
      {
        number: 2,
        title: 'I check the numbers',
        text: 'When a calculation matters, I compare it against the system the company already uses before calling it good.',
        icon: Ruler,
      },
      {
        number: 3,
        title: 'Tests where the logic is',
        text: 'If the rule lives in SQL, the test runs in SQL. If the pricing engine is pure, it is tested without a database.',
        icon: FlaskConical,
      },
      {
        number: 4,
        title: 'Reproducible deploys',
        text: 'Docker, versioned migrations applied by CI and daily backups. If verification fails, nothing gets deployed.',
        icon: Server,
      },
    ],
  },

  contact: {
    label: 'contact',
    title: {
      sr: 'Get in touch.',
      l1: 'Get in touch.',
      l2: '',
    },
    copy: 'If you want to talk about a role or ask about any of these projects, write to me. I reply by email or LinkedIn.',
    mail: 'Mail',
    social: 'Also on:',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'Message',
    formSubmit: 'Send',
    formSending: 'Sending',
    formDirectPre: 'If you prefer, write me directly at',
  },

  footer: {
    tagline: 'built by me, obviously.',
  },

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

  servicesPage: {
    back: 'Back',
    backFull: 'Back to home',
    kicker: 'services',
    heading: 'Custom software for companies.',
    intro:
      'Websites, management software, automation and applied AI for companies that want to organize their operations. From the website to the internal system that saves hours of manual work, with no big teams and no endless processes.',
    systemsLabel: 'systems in production',
    systemsHeading: 'What is already running.',
    systemsCta: 'View case study',
    sitesLabel: 'websites',
    sitesHeading: 'Four institutional and commercial sites live.',
    contactHeading: 'Got a project in mind?',
    contactText: 'Tell me what you need. No commitments, no jargon. If I can help, I will tell you. If I cannot, I will tell you that too.',
    contactCta: 'Let’s talk',
    contactMail: 'Email me',
  },

  cotizador: {
    title: 'Aluminum Joinery Quoter',
    back: 'Back',
    backFull: 'Back to projects',
    caseLabel: 'case study',
    category: 'Pricing engine · Full-stack',
    year: '2026',
    roleLabel: 'Role',
    role: 'Sole developer: product, pricing engine, backend, database and security',
    yearLabel: 'Year',
    clientLabel: 'Client',
    client: 'Grupo CPS, aluminum-and-glass joinery industry',
    code: { label: 'Code', note: 'Private · owned by Grupo CPS' },
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Three.js', 'Supabase', 'PostgreSQL', 'RLS', 'Jest'],
    tagline: 'An aluminum joinery quoter that gives credible prices, not made-up numbers.',
    summary:
      'A web app where the client builds their order of aluminum-and-glass windows and gets an estimated price. The challenge was not the screen, but getting the price right: what looked like a simple formula actually depended on how much aluminum and glass each window really uses. To get it right, I studied the 2,641 real recipes from the factory software and pulled out the numbers that drive the cost.',
    metricValue: '2.44× → ~1%',
    metricText: 'How much the error in calculating the aluminum dropped, compared to the factory system. I did not fix it with a hand-tuned fudge factor, but by understanding where the difference came from.',
    problemLabel: '01 · business problem',
    problem: [
      'Grupo CPS manufactures aluminum-and-glass joinery. Quoting each order by hand is slow and depends on technical staff: every client inquiry took up someone’s time at the factory before anyone even knew whether the order was serious.',
      'They wanted a simple web app where the client signs up, builds a cart with their windows, sends the order and tracks it. The problem was in the word “simple”: the price of a window does not come from multiplying area by a price per square meter. It depends on how much aluminum profile each window type uses (frame, sash, glazing bead, transoms), on the real glass measurement, on hardware, labor, margin and VAT.',
      'The company already calculated all of this precisely in its factory software, WinMaker, which stores one “recipe” per window type: 2,641 files in a closed format, impossible to use directly on a website. My first simple calculation counted 2.44× less aluminum than the window actually uses.',
    ],
    constraintsLabel: '02 · constraints',
    constraintsHeading: 'What I had to work around.',
    constraints: [
      { title: 'No access to the factory software from the web', text: 'WinMaker is a desktop system with its own format. It exposes no API and cannot be queried live: whatever I needed from it had to be extracted once and live in my model.' },
      { title: 'Internal costs that can never leak', text: 'The client must see a final price, never the cost, the margin or the price per square meter. Any design where the browser does the math was out from the start.' },
      { title: 'Data maintained by technicians, not the programmer', text: 'Recipes, catalogs, colors and parameters change with the factory. They had to be editable from a panel, without touching code.' },
      { title: 'A single developer', text: 'Product, engine, backend, database and security, in parallel with other company systems. Every layer had to be simple to maintain.' },
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
    decisionsLabel: '03 · technical decisions and why',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Pure pricing engine, no I/O', text: 'All the pricing is pure functions, testable with no database. That is why it has 68+ Jest tests and could be validated against the factory without spinning up any service.' },
      { title: 'Geometry separated from costing', text: 'Recipes change how much material is counted; the costing (cost per meter, cost per m², hardware, margin, VAT) was untouched. Bringing in the factory numbers broke nothing that already worked.' },
      { title: 'Custom parser and AST evaluator for the .PRO format', text: 'Instead of executing the recipes, a static parser extracts per window type only the geometric constants (74, 126, 82/148 mm depending on the type), and each one is cited to its source file.' },
      { title: 'Immutable snapshot per order', text: 'Each order freezes the prices and names of that moment, with its number assigned atomically in the database (FOR UPDATE). Two simultaneous orders never share a number and a sent price never changes behind the scenes.' },
      { title: 'All the calculation on the server side', text: 'Endpoints return DTOs with no sensitive data. The service role lives only on the server and RLS is enabled with no public policies.' },
      { title: 'Explicit fallback, never silent', text: 'Whatever has no recipe loaded quotes by estimation with the generic model and is flagged as such. A per-recipe traffic light shows what is missing to quote with real cost.' },
    ],
    discardedLabel: '04 · what was discarded',
    discardedHeading: 'What I ruled out along the way.',
    discarded: [
      { title: 'Area × price per m² formula', text: 'Fast, but it counted 2.44× less aluminum than real. A hand-tuned correction factor would have hidden the error instead of fixing it.' },
      { title: 'Porting all of WinMaker to the web', text: 'Precise, but unfeasible: 2,641 recipes in a closed format and a full manufacturing engine, for what had to be an entry-level quoter.' },
      { title: 'Summary links with sequential IDs', text: 'They allowed enumerating other people’s orders by changing a number. Replaced with UUID tokens impossible to guess.' },
      { title: 'Calculating in the browser', text: 'It would have exposed costs and margins to anyone opening the dev tools. The whole engine runs on the server.' },
    ],
    solutionLabel: 'what was built',
    solutionHeading: 'A full-stack app with a pricing engine at its core.',
    solution: [
      { title: 'Sign up and log in', text: 'Each client has their own account.' },
      { title: 'Building the window in 3D', text: 'The client picks type, dimensions, line, glass, color and accessories, and sees the window rendered in 3D, which they can rotate to look at from any angle.' },
      { title: 'Cart with several windows', text: 'They group several windows into one order and build their quote like a draft: adding, removing and adjusting until it is the way they want.' },
      { title: 'Quote as a PDF', text: 'With one click it generates a clean PDF with all the windows, their specs and the total, ready to save or share.' },
      { title: 'Order that gets frozen', text: 'On submit, the prices and names of that moment are saved. Nothing is recalculated behind the scenes afterward.' },
      { title: 'Tracking', text: 'In “My orders” they see the status of each one, and can share a summary via a private link.' },
    ],
    solutionNote:
      'The quoter does not replace WinMaker, the system the factory has always quoted with: it is the client’s front door. Behind it, the client never sees internal costs or margin: all the calculation happens on the server and only the final price reaches the browser.',
    adminLabel: 'the other side: administration',
    adminHeading: 'An internal panel where technicians load the factory’s reality.',
    admin: [
      {
        title: 'Parameterizable technical recipes',
        text: 'Technicians load what each window type takes: profiles with their cuts, accessories, glass and manufacturable limits. Each recipe picks components from real catalogs: aluminum profiles and stock lengths, hardware, IGU spacers and labor per station.',
      },
      {
        title: 'Real-cost traffic light',
        text: 'A “load status” view shows what each recipe is missing to quote with real cost: red if the recipe has no profiles loaded or any profile is missing its cost, yellow if labor is missing, green when the cost is complete.',
      },
      {
        title: 'Resolution with fallback',
        text: 'If a combination has no recipe loaded, the engine does not break: it quotes by estimation with the generic model and flags it as such, so the team knows exactly what needs tuning.',
      },
      {
        title: 'Parameters that govern the engine',
        text: 'Margin, VAT, waste factors, color surcharges with their WinMaker code, the USD/UYU exchange rate the engine uses, and users with roles and discounts: everything that affects the price is managed from the panel, behind APIs with role-based access control.',
      },
    ],
    adminNote:
      'This is what lets the system live without the programmer: the owners of the data are the factory technicians, not the code. The client-facing page is the visible half; this is the half that keeps it honest.',
    diagram: {
      cta: 'Open the interactive diagram',
      label: 'the system, in a diagram',
      heading: 'How it all fits together, in a diagram you can move around.',
      text: 'Five views with draggable boxes and a step-by-step walkthrough: the full circuit, what the client does, how the price is calculated, what the technician loads and how the order reaches the factory. It is the same piece I use to explain the system in ten minutes.',
    },
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
    securityHeading: 'Client data and internal costs are at stake: security was a requirement, not an add-on.',
    security: [
      { title: 'No data served straight from the database', text: 'Everything goes through the server with login. The database master key lives only there, it never reaches the client’s browser.' },
      { title: 'Share links impossible to guess', text: 'A summary link is not a running number (1, 2, 3…) but a random code, so nobody can change it to peek at other people’s orders.' },
      { title: 'Inputs always bounded', text: 'Dimensions up to 6000 mm, integer quantities with a cap, limited text. Nothing gets in without checks.' },
      { title: 'Internal costs never exposed', text: 'The client sees the final price, never the cost, the margin or the price per square meter. All the calculation happens on the server.' },
      { title: 'Frozen, auditable orders', text: 'Each order stores an immutable snapshot of prices and names, with its number assigned atomically in the database: two simultaneous orders never share a number, and nothing changes behind the scenes afterward.' },
      { title: 'Currency with a safety net', text: 'Costs coexist in dollars and pesos with an explicit conversion convention. If the rate is missing, the system degrades to a defined neutral factor instead of breaking mid-calculation.' },
    ],
    resultsLabel: '05 · measurable result',
    resultsHeading: 'What can be measured.',
    results: [
      { value: '2.44× → ~1%', label: 'error in the aluminum calculation against the factory system, fixed in the geometry rather than with a correction factor.' },
      { value: '2,641', label: 'real factory recipes analyzed by reverse engineering.' },
      { value: '68+', label: 'automated tests: unit, integration and the “shadow mode” against WinMaker.' },
      { value: 'In production', label: 'at cotizador.grupocps.com.uy, the front door for Grupo CPS clients.' },
    ],
    qualityLabel: 'quality & engineering',
    qualityHeading: 'How I know the numbers are right.',
    quality: [
      { metric: 'Factory recipes analyzed', value: '2,641' },
      { metric: 'Proprietary .PRO format cracked', value: 'Custom parser + safe AST evaluator' },
      { metric: 'Automated tests (Jest)', value: '68+' },
      { metric: 'Material error vs. the factory system', value: '2.44× → ~1%' },
      { metric: 'Self-run code audit', value: 'Findings C1 to C8, cataloged and fixed' },
      { metric: 'Code quality', value: 'Strict TypeScript, no type errors' },
    ],
    qualityNote:
      'The “shadow mode”: a tool that compares, window by window, what my system calculates against the real parts breakdown from the factory software. It measures how far off I am before calling a price good.',
    shotsLabel: 'demo',
    shotsHeading: 'The quoter in action.',
    learningsLabel: 'takeaways',
    learnings: [
      'The hard problem is rarely the visible one: the screen was the easy part, the value was in calculating well and validating the numbers.',
      'I did not brute-force copy the 2,641 recipes: I pulled out only what moves the cost and left the rest as separate research.',
      'Measure before you claim: “shadow mode” turned a hunch (“the price doesn’t add up”) into a number (2.44×) and then into a validation (~1%).',
      'A complete system includes whoever maintains it: the internal panel and its load-status traffic light make the technicians, not the programmer, the owners of the data.',
    ],
    ctaHeading: 'Want to talk about this project?',
    ctaText: 'The code is private, but I can walk you through how it is built. Write to me if this interests you or you want to talk about a role.',
    ctaContact: 'Contact',
    ctaMore: 'More projects',
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Video walkthrough of the quoter, from building the window to the submitted order', caption: 'System walkthrough: from building the window in 3D to the submitted order.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Quoted window rendered in 3D rotating on its axis', caption: '3D visualization: the quoted window rotates to be seen from any angle.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'Generated PDF with the assembled quote', caption: 'PDF generated automatically with the assembled quote, ready to save or share.', width: 990, height: 1041, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_1.png', alt: 'Internal technical-data panel of the quoter', caption: 'The internal panel: technical recipes and catalogs of profiles, stock lengths, glass, hardware, labor and the parameters that feed the engine.', width: 1920, height: 989, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_2.png', alt: 'Recipe load status with real-cost traffic light', caption: 'The “load status” view: a per-recipe traffic light showing what is missing to quote with real cost, and which window types still quote by estimation.', width: 1920, height: 1018, loop: false },
    ],
  },

  stock: {
    title: 'Depósitos CPS',
    back: 'Back',
    backFull: 'Back to projects',
    caseLabel: 'case study',
    category: 'Stock system · Full-stack',
    year: '2026',
    roleLabel: 'Role',
    role: 'Sole developer: data model, SQL core, backend, frontend and deployment',
    yearLabel: 'Year',
    clientLabel: 'Client',
    client: 'Grupo CPS, construction and aluminum joinery',
    code: { label: 'Code', note: 'Private · internal Grupo CPS tool' },
    stack: ['Next.js', 'TypeScript', 'Tailwind 4', 'shadcn/ui', 'Supabase', 'PostgreSQL', 'RLS', 'Coolify'],
    tagline: 'The whole company’s stock in one place: what’s in stock, where it is and which site it went to.',
    summary:
      'Internal system for Grupo CPS to manage materials and tools across warehouses and construction sites: purchase requests and orders, transfers, consumption vouchers with reconciliation, repairs and adjustments. Every operation is recorded in an immutable stock ledger with weighted-average costing, and the team sees the stock valuation, alerts and reports live.',
    metricValue: '100% traceable',
    metricText:
      'Stock is never corrected “by hand”: every change is born from a numbered voucher, with user and date. The number you see is the sum of its history. And negative stock is impossible by design, even under concurrent operations.',
    problemLabel: '01 · business problem',
    problem: [
      'Grupo CPS moves materials and tools across several warehouses and construction sites at once. That movement was tracked with spreadsheets, messages and memory: knowing how much of an item there was, and where, meant calling, counting and trusting.',
      'The consequences were always the same: shortages discovered with the site already running, material “on the road” that showed up nowhere, rushed purchases with no record, and no reliable number for how much capital sat in stock or how much each site had consumed.',
      'And there was a subtler problem: tools. An angle grinder is not “3 angle grinders”: it is this grinder, with its serial number, which is at that site, came back broken or got lost. And someone has to answer for it.',
    ],
    constraintsLabel: '02 · constraints',
    constraintsHeading: 'What I had to work around.',
    constraints: [
      { title: 'Several warehouses and sites operating at once', text: 'Concurrent movements from different places. The balance cannot depend on two people not posting at the same time.' },
      { title: 'Non-technical users, with different roles', text: 'Logistics operates; site managers and management query and request. Each one had to see and do only their part, without that depending on goodwill.' },
      { title: 'Own server, no third-party cloud', text: 'The company’s data stays on its VPS. That fixed self-hosted Supabase, Docker and Coolify, and left me in charge of operations too.' },
      { title: 'Numbers that must hold up', text: 'Stock valuation and spending per site are used to decide purchases and close sites. An estimate is useless: every number must be explained by vouchers.' },
    ],
    insightLabel: 'the key decision',
    insightHeading: 'Stock is never edited: it is recorded. Everything else derives from that.',
    insight: [
      'The decision that organizes the whole system: nobody writes “40 bags left”. You record the movement that explains it (a received purchase, a transfer, a consumption voucher, an adjustment) as an entry in an immutable ledger: movements are insert-only, and correcting means posting the reversing entry, never deleting.',
      'The balance per warehouse is maintained by the database itself, with a constraint that makes negative stock impossible even under concurrent operations. And what is on the road or at the repair shop is stock too: the virtual warehouses “In transit” and “Repair” guarantee that the sum of all balances always equals the company’s real stock.',
      'On that foundation, costing uses a weighted average price frozen into each movement: transfers do not alter the average, and returns re-enter at the cost frozen in the original voucher. That is why the stock valuation on the dashboard is a defensible number, not an estimate.',
    ],
    decisionsLabel: '03 · technical decisions and why',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Append-only ledger', text: 'Movements are insert-only; correcting means posting a reversing entry. That single decision made auditing, voiding, period ledgers and valuation free: they are all queries over the same table.' },
      { title: 'The balance is kept by the database, not the app', text: 'A trigger updates the balance per warehouse on every entry and a constraint stops it from going below zero. Two simultaneous operations on the same item cannot leave negative stock, with no locks in the application.' },
      { title: 'Weighted-average cost frozen into each movement', text: 'The unit cost is fixed at posting time: transfers do not alter the average and returns re-enter at the original voucher’s cost. So the valuation never changes retroactively.' },
      { title: 'Transactional RPCs as the only write path', text: 'Every operation is a SECURITY DEFINER function that validates role and business rules inside a transaction. The movement tables have no write policies: even talking straight to the API, nobody can skip the rules.' },
      { title: 'Virtual “In transit” and “Repair” warehouses', text: 'What travels or sits at the repair shop is stock too, in its own warehouse. So the sum of all balances always equals the real stock and nothing ends up “nowhere”.' },
      { title: 'Tools as units, not quantities', text: 'Each tool has a serial number and its own life cycle: available → on site → under repair → broken or lost. Broken or lost ones are charged to the site that had them.' },
    ],
    discardedLabel: '04 · what was discarded',
    discardedHeading: 'What I ruled out along the way.',
    discarded: [
      { title: 'Editing quantities directly', text: 'That is what the spreadsheets did. Without the history behind the number, there is no way to explain a shortage, void without deleting, or value the stock.' },
      { title: 'Business rules in the application layer', text: 'Any client talking to the API could skip them, and every rule would have to be repeated on every screen. In PostgreSQL there is one door and it has no shortcut.' },
      { title: 'Cloud-hosted Supabase', text: 'More convenient, but the company’s data would leave its server. Keeping control and not paying for a plan mattered more; in exchange, I run the operations myself.' },
      { title: 'A materials-only system', text: 'Without serial-numbered tools, half the problem (who has what, at which site, and who answers for it) would still live in messages.' },
    ],
    solutionLabel: 'what was built',
    solutionHeading: 'The whole material circuit, from request to construction site.',
    solution: [
      { title: 'Purchase requests and orders', text: 'Any user, site managers included, requests what they need with destination and deadline. Logistics builds the orders, which can mix suppliers per line and feed a price history per item and supplier.' },
      { title: 'Partial receptions', text: 'Purchases and transfers are received in batches. Closing with missing items is an explicit decision, with a reason: only then is what never arrived written off.' },
      { title: '“In transit” transfers', text: 'Material moving between warehouses passes through a real intermediate state: while it travels it sits in neither warehouse, it is in transit, with a truck and people assigned to the trip.' },
      { title: 'Consumption vouchers with reconciliation', text: 'What goes out to a site gets reconciled: what was used is charged to the site’s spending, and what comes back re-enters stock at the voucher’s frozen cost.' },
      { title: 'Tools by serial number', text: 'Each physical unit has its own life cycle: available → on site → under repair → broken or lost. They are reconciled per unit, and broken or lost ones are charged to the site that had them.' },
      { title: 'Per-user dashboard and alerts', text: 'Each user builds their own home screen with the widgets they need, and notifications fire on their own: overdue or expiring requests, delayed transfers and stock below minimum.' },
    ],
    solutionNote:
      'The system also covers the boring-but-critical: a ledger view per warehouse or site for any period, one item queried across all warehouses at once, purchases in pesos or dollars with their currency recorded, and purchase orders as PDFs with signature lines, because the physical circuit with the supplier is part of the system too.',
    diagram: {
      cta: 'Open the interactive diagram',
      label: 'the system, in a diagram',
      heading: 'How it all fits together, in a diagram you can move around.',
      text: 'Five views with draggable boxes and a step-by-step walkthrough: who uses the system and what sits behind it, the material circuit from request to site, how every movement is recorded and valued, the life of a serial-numbered tool and how it is built.',
    },
    archLabel: 'architecture',
    archHeading: 'Business logic lives in the database, not in the interface.',
    architecture: [
      { step: 'UI', title: 'Next.js + shadcn/ui', text: 'Operation and query screens: customizable dashboard, movements, ledger views and catalogs.' },
      { step: 'API', title: 'Self-hosted Supabase', text: "PostgreSQL + Auth + API running on the company's own server, not on a third-party cloud." },
      { step: 'RPC', title: 'Transactional RPCs', text: 'Every operation is a function that validates role and business rules inside the database, in a transaction.' },
      { step: 'LED', title: 'Immutable ledger', text: 'Movements are insert-only; correcting means posting a reversing entry. A trigger maintains the balances per warehouse.' },
      { step: 'SEC', title: 'RLS on every table', text: 'The movement tables have no write policies at all: the only door in is the RPCs.' },
      { step: 'OPS', title: 'VPS + Coolify', text: 'Automatic deploy on every push, migrations applied by CI, and daily backups of both server and database.' },
    ],
    archNote:
      'Hiding buttons in the interface is ergonomics; the real barrier is in PostgreSQL. Even talking straight to the API, nobody can skip the rules: every write goes through a function that validates everything on the database side.',
    securityLabel: 'security & traceability',
    securityHeading: 'A stock system is a trust system: every number has to be able to defend itself.',
    security: [
      { title: 'Roles with the bare minimum', text: 'The admin role operates and administers; the viewer role (site managers, management) reads everything and can only create its own purchase requests and customize its dashboard. And nobody can promote their own role.' },
      { title: 'Users closed by default', text: 'Public sign-up is disabled and profiles are born inactive, with no access to data, until an admin activates them from the app.' },
      { title: 'Who did what, always', text: 'Issuing, receiving, canceling, reconciling: every action is recorded with user and date, visible on every screen for every user.' },
      { title: 'Voiding is not deleting', text: 'Voiding posts the reversing entry and the history stays complete. Nothing gets corrected quietly.' },
    ],
    resultsLabel: '05 · measurable result',
    resultsHeading: 'In numbers.',
    results: [
      { value: '100%', label: 'of balances traceable: every number is the sum of vouchers with user and date.' },
      { value: '0', label: 'negative stock possible, enforced by a database constraint, even under concurrent operations.' },
      { value: '~160', label: 'assertions on the SQL core, running inside a transaction that rolls back.' },
      { value: '32', label: 'versioned migrations, applied by CI on a clean database before every deploy.' },
    ],
    qualityLabel: 'quality & engineering',
    qualityHeading: 'The core is tested where it lives: in SQL.',
    quality: [
      { metric: 'SQL core test suite', value: '1,500+ lines · ~160 assertions' },
      { metric: 'What it covers', value: 'Numbering, weighted-average costing, partial receptions, reconciliations, serial-numbered tools, RLS and roles' },
      { metric: 'Negative stock', value: 'Impossible by design, even under concurrency' },
      { metric: 'Versioned schema', value: '32 migrations, applied automatically by CI' },
    ],
    qualityNote:
      'The suite runs inside a transaction that rolls back at the end: it tests the real core against the real database without dirtying it. If the rule lives in PostgreSQL, so does the test.',
    shotsLabel: 'screenshots',
    shotsHeading: 'The system from the inside.',
    learningsLabel: 'takeaways',
    learnings: [
      'If people do not believe the number, they go back to the spreadsheet. That is why everything is built so every balance can be explained by its vouchers.',
      'Modeling movements instead of quantities simplified everything else: ledger views, auditing, voiding and valuation all fell out of the same design.',
      'Putting business rules in the database, and testing them there, means security does not depend on which buttons the interface shows.',
      'The physical circuit is software too: the purchase order PDF with signature lines matters as much as the table that generates it.',
    ],
    ctaHeading: 'Want to talk about this project?',
    ctaText: 'The code is internal to the company, but I can explain how it is designed. Write to me if this interests you or you want to talk about a role.',
    ctaContact: 'Contact',
    ctaMore: 'More projects',
    gallery: [
      { kind: 'image', src: '/assets/projects/depositos_cps/dashboard_inicial.png', alt: 'Home dashboard of the Grupo CPS warehouse system', caption: 'The home dashboard: stock valuation, movements of the last 30 days, stock per warehouse, spending per site and alerts for overdue requests, delayed transfers and stock below minimum.', width: 1920, height: 1079, loop: false },
      { kind: 'image', src: '/assets/projects/depositos_cps/kardex_deposito.png', alt: 'Warehouse ledger view with period balances and movements', caption: 'The ledger view per warehouse or site: period balances, every movement with its voucher and user, and voidings as reversing entries. Nothing gets deleted.', width: 1920, height: 1079, loop: false },
      { kind: 'image', src: '/assets/projects/depositos_cps/orden_compra_pdf.png', alt: 'Purchase order generated as a PDF ready to sign', caption: 'A purchase order as a PDF, ready to print and sign with the supplier: the physical circuit comes out of the system too.', width: 1920, height: 1079, loop: false },
    ],
  },

  arce: {
    title: 'Arce',
    back: 'Back',
    backFull: 'Back to projects',
    caseLabel: 'case study',
    category: 'Automation & AI',
    year: '2025',
    roleLabel: 'Role',
    role: 'Design, development and infrastructure, end to end',
    yearLabel: 'Year',
    clientLabel: 'Origin',
    client: 'Grupo CPS, out of a real need of the sales team',
    code: { label: 'Code', note: 'Public on GitHub', href: arceMedia.repo, cta: 'View repository' },
    stack: ['n8n', 'Node.js', 'Puppeteer', 'PostgreSQL', 'Ollama', 'Local AI', 'Docker', 'Linux', 'Web scraping'],
    tagline: 'Monitoring and analysis of public tenders with local AI.',
    summary:
      'Arce monitors the publications of the state procurement portal (ARCE), extracts each tender, structures it, analyzes it with an AI model running locally and surfaces only the relevant opportunities for the sales team in a dashboard.',
    metricValue: '~10 hrs',
    metricText: 'of manual review saved per week for the sales team. Before: 2 hours a day, 5 days a week, checking the portal by hand. Now the portal is polled automatically every 15 minutes.',
    problemLabel: '01 · business problem',
    problem: [
      'Spotting opportunities meant manually reviewing the state procurement portal (ARCE): a slow, repetitive process, easy to neglect among everything else. It took about 2 hours a day, 5 days a week, of one person on the sales team.',
      'The information came as unstructured text, hard to compare and filter. When a relevant tender showed up and nobody saw it in time, it was a missed opportunity: a tender cannot be submitted after the deadline.',
    ],
    constraintsLabel: '02 · constraints',
    constraintsHeading: 'What I had to work around.',
    constraints: [
      { title: 'Unstructured data, in any format', text: 'Tender documents arrive as PDF, DOC, DOCX, XLS or ZIP, sometimes huge. Everything had to be converted to text before it could be evaluated.' },
      { title: 'No dependence on a paid AI API', text: 'Analyzing every document with an external service did not add up in cost or in data control. The evaluation had to run on our own hardware.' },
      { title: 'The field changes, the system does not', text: 'Aluminum today, another field tomorrow. The relevance criterion had to be configurable without touching code.' },
      { title: 'Sales users, not technical ones', text: 'The output had to be a simple dashboard, with a way to correct the AI when it gets it wrong.' },
    ],
    insightLabel: 'the key decision',
    insightHeading: 'Run the AI locally and orchestrate with n8n, so the criterion can change without rewriting the system.',
    insight: [
      'The AI part is the most visible but the smallest. What organized the project was separating three things: the data pipeline (which fetches, cleans and deduplicates every tender), the relevance criterion (a field-specific prompt changed from configuration) and the orchestration (an n8n workflow edited without touching code).',
      'So changing the model, the field or the frequency needs no redeploy. The sales team sees a dashboard; the rest runs on its own every 15 minutes.',
    ],
    beforeLabel: 'Manual review of the portal',
    beforeValue: '2 hrs/day',
    afterLabel: 'Today',
    afterValue: '0',
    beforeAfterText: 'The portal used to be checked by hand two hours a day, five days a week. Today nobody opens it: n8n polls it every 15 minutes and the dashboard shows only what matters.',
    decisionsLabel: '03 · technical decisions and why',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Local AI, not cloud', text: 'Ollama with Llama 3.1 8B keeps the documents inside the infrastructure, removes per-query cost and takes external API limits out of the equation. An 8B model with a good field-specific prompt is enough for this task.' },
      { title: 'n8n to orchestrate', text: 'Coordinating the flow in n8n means changing rules, sources or frequency by touching the workflow, instead of rewriting and redeploying code. Someone other than me can adjust it too.' },
      { title: 'PostgreSQL as the base, deduplicated', text: 'Storing the structured tenders in Postgres enables querying, comparing and keeping a history, instead of processing everything from scratch on each run.' },
      { title: 'Chunking and metadata fallback', text: 'Large documents are split into chunks so they fit the model’s context. If a file cannot be extracted, it is analyzed by metadata instead of discarding the tender.' },
      { title: 'Human feedback stored', text: 'From the dashboard the team marks when the AI got it right or wrong, and that is kept next to the analysis. It serves to tune the prompt with real cases.' },
      { title: 'Everything in Docker', text: 'The system runs containerized on Linux: reproducible, isolated and deployable on a private server with no fragile dependencies.' },
    ],
    discardedLabel: '04 · what was discarded',
    discardedHeading: 'What I ruled out along the way.',
    discarded: [
      { title: 'OpenAI or another cloud API', text: 'Per-query cost, usage limits and company documents leaving the infrastructure. For a process that runs every 15 minutes, it did not add up.' },
      { title: 'A cron job with loose scripts', text: 'It works until a source, a frequency or a step has to change. In n8n that is done on the workflow, with the history of every run in plain sight.' },
      { title: 'Filtering only by keywords in the title', text: 'Without reading the document, a keyword does not tell you whether the tender is in your field or when the site visit is. The model evaluates the full document.' },
    ],
    solutionLabel: 'what was built',
    solutionHeading: 'A pipeline that goes from the portal to the dashboard with nobody touching it.',
    solution: [
      { title: 'RSS every 15 minutes', text: 'n8n polls the ARCE feed and detects new tenders.' },
      { title: 'Detail scraping', text: 'A Puppeteer scraper extracts each new tender and its attachments.' },
      { title: 'Multi-format extraction', text: 'PDF, DOC, DOCX, XLS and ZIP are converted to text, with automatic chunking for large documents.' },
      { title: 'Local AI analysis', text: 'Llama 3.1 on Ollama scores relevance with a field-specific prompt and detects site-visit dates, places and contacts.' },
      { title: 'Deduplicated PostgreSQL', text: 'Each tender is stored structured, without duplicates and with a queryable history.' },
      { title: 'Dashboard with feedback', text: 'The team sees only the relevant opportunities, sorted by urgency, and corrects the AI when it is wrong.' },
    ],
    solutionNote:
      'The topic of interest is configurable: in my case it filters by aluminum, my company’s field, but it adapts to any other without touching the code.',
    diagram: {
      cta: 'Open the interactive diagram',
      label: 'the system, in a diagram',
      heading: 'How it all fits together, in a diagram you can move around.',
      text: 'Four views with draggable boxes and a step-by-step walkthrough: the full circuit from the portal to the dashboard, the real n8n workflow node by node, how every tender document is analyzed with local AI and how the team uses the dashboard and corrects the AI.',
    },
    archLabel: 'architecture',
    archHeading: 'How data flows, from source to dashboard.',
    architecture: [
      { step: '01', title: 'ARCE (state procurement)', text: 'The latest publications of the state procurement portal are the entry point.' },
      { step: '02', title: 'Automated scraping', text: 'n8n polls the RSS feed every 15 minutes and a Puppeteer scraper extracts the detail of each new tender.' },
      { step: '03', title: 'Multi-format extraction', text: 'Tender documents (PDF, DOC, DOCX, XLS, ZIP) are converted to structured text, with automatic chunking for large files.' },
      { step: '04', title: 'PostgreSQL', text: 'Tenders are stored deduplicated with a queryable history, without reprocessing everything each time.' },
      { step: '05', title: 'Local AI (Ollama)', text: 'Llama 3.1 with a specialized prompt scores each tender by relevance and detects site visits, dates and contacts.' },
      { step: '06', title: 'Dashboard', text: 'The team sees only the relevant opportunities, ready to act on.' },
    ],
    archNote:
      'The whole flow is orchestrated in n8n: adjusting sources, rules or frequency is done on the workflow, without rewriting the system.',
    resultsLabel: '05 · measurable result',
    resultsHeading: 'What changed for the team.',
    results: [
      { value: '~10 hrs', label: 'of manual search saved every week (before: 5 days × 2 hrs reviewing by hand).' },
      { value: '15 min', label: 'between publication and detection: no new tender waits longer than that.' },
      { value: '0', label: 'time spent reviewing the ARCE portal manually.' },
      { value: 'Configurable', label: 'the field of interest changes without touching the system (in my case, aluminum).' },
    ],
    demo: {
      label: 'demo',
      heading: 'The dashboard in action.',
      aria: 'Arce dashboard demo',
      src: arceMedia.video,
    },
    shotsLabel: 'screenshots',
    shotsHeading: 'Under the hood.',
    learningsLabel: 'takeaways',
    learnings: [
      'The AI is the small part: the value is in the pipeline that feeds it clean, deduplicated, plain-text data.',
      'Orchestrating with a visual tool means someone other than me can adjust the system without opening the code.',
      'Storing human feedback next to the analysis turns every AI mistake into a case for improving the prompt.',
    ],
    ctaHeading: 'Want to talk about this project?',
    ctaText: 'The code is public. If you want to discuss the design or talk about a role, write to me.',
    ctaContact: 'Contact',
    ctaMore: 'More projects',
    gallery: [
      { kind: 'image', src: '/assets/projects/arce/dashboard.png', alt: 'Main view of the Arce dashboard', caption: 'Main dashboard: each tender with its urgency and the relevance score assigned by the AI.', width: 1920, height: 1082, loop: false },
      { kind: 'image', src: '/assets/projects/arce/licitacion-detalle.png', alt: 'Detail of a tender in Arce', caption: 'Tender detail: structured data, attachments, AI analysis and human feedback.', width: 1920, height: 1082, loop: false },
      { kind: 'image', src: '/assets/projects/arce/n8n-workflow.png', alt: 'Arce workflow in n8n', caption: 'The n8n flow: RSS, XML→JSON parsing, scraping, relevance filtering and loading into PostgreSQL.', width: 1326, height: 1009, loop: false },
    ],
  },

  thanks: {
    title: 'Message sent.',
    text: 'Thanks for reaching out. I got your message and I will get back to you as soon as I can.',
    home: 'Back to home',
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
