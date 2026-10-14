import {
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Clock3,
  CodeXml,
  Globe,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  RefreshCw,
  Server,
  UserRound,
  WalletCards,
  Wrench,
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
  summary?: { problem: string; decision: string; result: string };
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
      sr: 'Desarrollador backend. A cargo de los sistemas de Grupo CPS.',
      l1: 'Desarrollador backend.',
      l2: 'A cargo de los sistemas',
      l3pre: 'de',
      highlight: 'Grupo CPS.',
    },
    copy: 'Soy el único responsable de sistemas de una empresa de construcción y aberturas. Diseño, construyo y opero el software que la empresa usa todos los días, como el cotizador y el sistema de stock, conectado a sus tableros de Monday.',
    ctaWork: 'Ver proyectos',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    portraitAlt: 'Sebastián Viglione',
    portraitName: 'Sebastián Viglione',
    portraitRole: 'líder de desarrollo y sistemas · grupo cps',
    areasLabel: 'Qué tengo a cargo',
    areas: [
      { title: 'Desarrollo de software', tag: 'principal', text: 'Sistemas propios en producción, conectados a Monday.', icon: CodeXml },
      { title: 'Infraestructura', tag: '', text: 'Servidor de la empresa, deploys automáticos y backups diarios.', icon: Server },
      { title: 'Soporte IT', tag: 'secundario', text: 'Computadoras, equipos y usuarios de la oficina.', icon: Wrench },
    ],
  },

  about: {
    label: 'sobre mí',
    heading: 'De la UTU a liderar los sistemas de una empresa.',
    intro:
      'Hice el Bachillerato Tecnológico en Informática en la UTU y hoy estudio Ingeniería en Sistemas en la Universidad de Montevideo, en paralelo con el trabajo. Entré a Grupo CPS en diciembre de 2024 y hoy tengo a cargo toda el área de sistemas.',
    body:
      'Lo que más disfruto es el backend: entender un dominio hasta poder modelarlo, poner las reglas donde nadie las pueda saltear y comparar los resultados contra la realidad antes de darlos por buenos. Trabajo en español y en inglés (C1).',
    facts: [
      { label: 'Estudiante de Ingeniería en Sistemas · Universidad de Montevideo', icon: GraduationCap },
      { label: 'Líder de Desarrollo y Sistemas · Grupo CPS', icon: Briefcase },
      { label: 'Español nativo · Inglés C1 (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack, por nivel de dominio',
  },

  experience: {
    label: 'experiencia',
    heading: 'Dónde trabajo y qué hago.',
    role: {
      title: 'Líder de Desarrollo y Sistemas',
      company: 'Grupo CPS',
      period: '12/2024 – hoy',
      place: 'Montevideo, UY',
      scope:
        'Único responsable del área de sistemas: desarrollo de software (lo principal), infraestructura, sitios de la empresa y soporte IT a la oficina.',
    },
    areas: [
      {
        title: 'Desarrollo de software',
        tag: 'principal',
        icon: CodeXml,
        bullets: [
          'Diseño, construyo y mantengo los sistemas internos de punta a punta: modelo de datos, reglas de negocio, API, interfaz y deploy.',
          'El cotizador y el sistema de stock están en producción: los usan clientes, ventas, logística, obra y dirección. Arce, que analiza las compras del Estado, está en una nueva etapa.',
          'Los conecto con los tableros de Monday de la empresa para que la producción y las tareas avancen sin cargar los datos dos veces.',
        ],
        links: [
          { label: 'Cotizador', href: '/cotizador' },
          { label: 'Depósitos', href: '/stock' },
          { label: 'Arce', href: '/arce' },
        ],
      },
      {
        title: 'Infraestructura',
        tag: '',
        icon: Server,
        bullets: [
          'Opero el servidor de la empresa: Supabase self-hosted, Docker y Coolify.',
          'Deploy automático en cada push, migraciones aplicadas por CI y backups diarios.',
        ],
        links: [],
      },
      {
        title: 'Sitios de la empresa',
        tag: '',
        icon: Globe,
        bullets: [
          'Mantengo grupocps.com.uy, en español e inglés.',
          'Armé un template para los sitios de los desarrollos inmobiliarios; el primero es Edificio Galicia.',
        ],
        links: [],
      },
      {
        title: 'Soporte IT',
        tag: 'secundario',
        icon: Wrench,
        bullets: ['Mantenimiento de las computadoras y equipos de la oficina.', 'Soporte a los usuarios en el día a día.'],
        links: [],
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
    heading: 'Tres sistemas, hechos de cero.',
    monoLabel: '[ proyectos ] — grupo cps',
    statusChip: '2 en producción · 1 en nueva etapa',
    sitesLabel: 'sitios web',
    sitesHeading: 'También hago sitios web.',
    sitesNote: 'Freelance, para clientes de Uruguay y de Estados Unidos, y los sitios de Grupo CPS.',
    cursorLabel: 'VER',
    summaryLabels: { problem: 'problema', decision: 'decisión', result: 'resultado' },
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
        summary: {
          problem: 'El precio de una abertura no sale del m²: depende de cuánto aluminio y vidrio lleva de verdad.',
          decision: 'Extraer la geometría de 2.641 recetas del software de fábrica, sin portarlo entero.',
          result: 'Error de material de 2,44× a ~1%, validado con pedidos que valoró la fábrica.',
        },
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
        summary: {
          problem: 'El stock de depósitos y obras vivía en planillas, mensajes y memoria.',
          decision: 'Un kardex inmutable con las reglas en PostgreSQL: el stock no se edita, se registra.',
          result: '100% de los saldos trazables y stock negativo imposible, incluso con operaciones simultáneas.',
        },
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Inteligencia de mercado sobre las compras del Estado uruguayo: qué productos conviene vender, a qué precio se gana y contra quién, con estadísticas en PostgreSQL y una IA que las interpreta.',
        label: 'ARCE',
        kind: 'Datos & IA · Grupo CPS',
        year: '2025–2026',
        cta: 'Ver case study',
        image: '/assets/projects/arce/mercado-oportunidades.webp',
        tags: ['TypeScript', 'PostgreSQL', 'IA'],
        summary: {
          problem: 'La dirección quería saber qué venderle al Estado, a qué precio y contra quién.',
          decision: 'Las cifras salen de SQL sobre el histórico de compras; la IA solo las lee y las interpreta.',
          result: 'Listo para recibir el histórico y probado de punta a punta con datos sintéticos.',
        },
      },
    ] as Project[],
    sites: [
      {
        name: 'Innately Italy',
        domain: 'innatelyitaly.com',
        url: 'https://innatelyitaly.com',
        description: 'Un estudio de Washington DC que importa mobiliario y cocinas italianas. Reemplacé su WordPress por un sitio estático rápido, con redirecciones desde las URLs viejas y sin cortar el mail, trabajando en inglés con la dueña.',
        label: 'INNATELY',
        kind: 'freelance · EE. UU.',
        cta: 'Ver sitio',
        image: '/assets/projects/innately.webp',
        tags: ['Next.js', 'Migración', 'Performance'],
      },
      {
        name: 'Force Crossfit',
        domain: 'forcebox4c.com.uy',
        url: 'https://forcebox4c.com.uy',
        description: 'Un box de crossfit que perdía consultas por Instagram. El sitio ordena la propuesta, los horarios y el contacto en un lugar propio.',
        label: 'FORCE',
        kind: 'freelance · gimnasio',
        cta: 'Ver sitio',
        image: '/assets/projects/forcecrossfit.webp',
        tags: ['Web', 'Reservas', 'Mobile first'],
      },
      {
        name: 'Open Gym',
        domain: 'opengym.uy',
        url: 'https://opengym.uy',
        description: 'Un gimnasio que necesitaba que la gente lo encuentre, entienda qué ofrece y consulte sin depender de mensajes sueltos.',
        label: 'OPEN',
        kind: 'freelance · gimnasio',
        cta: 'Ver sitio',
        image: '/assets/projects/opengym.webp',
        tags: ['Web', 'Contacto', 'Performance'],
      },
      {
        name: 'Edificio Galicia',
        domain: 'edificiogalicia.com.uy',
        url: 'https://edificiogalicia.com.uy',
        description: 'La web de los desarrollos inmobiliarios de Grupo CPS, sobre un template reutilizable. Edificio Galicia está en obra y sin renders: las plantas y vistas 3D se generan desde los planos de los arquitectos.',
        label: 'GAL',
        kind: 'grupo cps · desarrollos',
        cta: 'Ver sitio',
        image: '/assets/projects/edificiogalicia.webp',
        tags: ['Python', 'Three.js', 'Template'],
      },
      {
        name: 'Grupo CPS',
        domain: 'grupocps.com.uy',
        url: 'https://grupocps.com.uy',
        description: 'El sitio de la empresa, en español e inglés. El catálogo de obras se genera desde datos y el build falla si a una obra le falta información.',
        label: 'CPS',
        kind: 'grupo cps · institucional',
        cta: 'Ver sitio',
        image: '/assets/projects/grupo_cps.webp',
        tags: ['Astro', 'ES/EN', 'Contenido validado'],
      },
    ] as Project[],
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
    systemsLabel: 'sistemas que construí',
    systemsHeading: 'Lo que ya construí.',
    systemsCta: 'Ver case study',
    sitesLabel: 'sitios web',
    sitesHeading: 'Cinco sitios en línea, para clientes de acá y de afuera.',
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
    role: 'Desarrollador único: producto, motor de cálculo, backend, base de datos, seguridad y app móvil',
    yearLabel: 'Año',
    clientLabel: 'Cliente',
    client: 'Grupo CPS, industria de aberturas (aluminio + vidrio)',
    code: { label: 'Código', note: 'Privado · propiedad de Grupo CPS' },
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Three.js', 'PostgreSQL', 'Supabase self-hosted', 'Expo / React Native', 'Jest'],
    tagline: 'Un cotizador de aberturas que da precios creíbles, no números inventados.',
    summary:
      'Una web, y ahora también una app, donde el cliente arma su pedido de ventanas de aluminio y vidrio y recibe un precio. El desafío no era la pantalla, sino calcular bien el precio: lo que parecía una fórmula simple en realidad dependía de cuánto aluminio y vidrio usa cada ventana de verdad. Para acertar, estudié las 2.641 recetas reales del software de fábrica, saqué de ahí los números que mueven el costo y después lo validé con pedidos de prueba que la propia fábrica valoró en ese software.',
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
      'Ejemplo concreto, el que usé para medir: un paño fijo de 1200×1000 mm con un travesaño. La fórmula simple calculaba 4,75 m de perfil de aluminio. El software de fábrica, para esa misma ventana, despieza 11,61 m: el marco, el travesaño y el contravidrio de cada paño. Con las medidas sacadas de las recetas, mi cálculo da 11,72 m. De ahí sale el 2,44× y de ahí sale el ~1%.',
    beforeLabel: 'Fórmula simple calculaba',
    beforeValue: '4,75 m',
    afterLabel: 'Ahora calcula (fábrica: 11,61 m)',
    afterValue: '11,72 m',
    decisionsLabel: '03 · decisiones técnicas y por qué',
    decisionsHeading: 'Por qué está armado así.',
    decisions: [
      { title: 'Motor de cálculo puro, sin I/O', text: 'Todo el pricing son funciones puras, testeables sin base de datos. Por eso se pudo validar contra la fábrica sin levantar ningún servicio, y la app móvil lo reusa tal cual para cotizar sin conexión.' },
      { title: 'Geometría separada del costeo', text: 'Las recetas cambiaron cuánto material se cuenta sin tocar cómo se pone el precio. Después el costeo también se volvió real (cada perfil por su peso y el precio por kilo del color elegido, la mano de obra por receta) sin tocar la geometría. Cada mitad cambió sin romper la otra.' },
      { title: 'Parser propio y evaluador AST para el formato .PRO', text: 'En vez de ejecutar las recetas, un parser estático extrae por tipología solo las constantes geométricas (74, 126, 82/148 mm según el tipo) y cada una queda citada a su archivo de origen.' },
      { title: 'Snapshot inmutable por pedido', text: 'Cada pedido congela precios y nombres del momento, con folio asignado de forma atómica en la base (FOR UPDATE). Dos pedidos simultáneos nunca comparten número y un precio enviado no cambia por detrás.' },
      { title: 'Todo el cálculo del lado del servidor', text: 'Los endpoints devuelven DTOs sin datos sensibles. La service role vive solo en el servidor y RLS está habilitado sin políticas públicas.' },
      { title: 'Sin receta completa, no hay precio', text: 'Una combinación de línea y tipo de ventana sin receta completa no se ofrece, y una abertura que necesita revisión técnica se guarda sin precio. Prefiero no cotizar a cotizar con una estimación disfrazada de precio.' },
      { title: 'El pedido vuelve al software de fábrica', text: 'Cada pedido genera un archivo .pto que la fábrica abre en WinMaker, que lo dibuja y lo despieza con su propia receta. El formato que al principio había que descifrar terminó siendo el destino del pedido.' },
    ],
    discardedLabel: '04 · qué se descartó',
    discardedHeading: 'Lo que descarté en el camino.',
    discarded: [
      { title: 'Fórmula área × precio por m²', text: 'Rápida, pero contaba 2,44 veces menos aluminio del real. Un factor de ajuste a dedo habría escondido el error en vez de corregirlo.' },
      { title: 'Portar WinMaker entero a la web', text: 'Preciso, pero inviable: 2.641 recetas en un formato cerrado y un motor de fabricación completo, para lo que tenía que ser un cotizador de entrada.' },
      { title: 'Links de resumen con ID secuencial', text: 'Permitían enumerar pedidos ajenos cambiando un número. Se reemplazaron por tokens UUID imposibles de adivinar.' },
      { title: 'Calcular con costos en el navegador', text: 'Habría expuesto costos y márgenes a cualquiera que abriera las herramientas de desarrollo. El cálculo con costos corre en el servidor; la app móvil cotiza sin conexión, pero solo con precios de venta.' },
    ],
    solutionLabel: 'qué se construyó',
    solutionHeading: 'Una app full-stack con un motor de cálculo en el núcleo.',
    solution: [
      { title: 'Armado paso a paso, con la ventana en 3D', text: 'El cliente elige tipo, medidas, línea, vidrio, color y accesorios en cuatro pantallas, con el precio en vivo. Ve la abertura en 3D, que puede girar, y el dibujo técnico, y puede comparar líneas y vidrios antes de decidir.' },
      { title: 'Cotizar sin crear cuenta', text: 'Primero deja sus datos de contacto y después arma la ventana. Quien tiene cuenta guarda borradores y pedidos.' },
      { title: 'Varias aberturas por pedido', text: 'Suma, duplica y ajusta aberturas en un mismo pedido hasta dejarlo como quiere.' },
      { title: 'Cotización en PDF', text: 'Un PDF prolijo con todas las ventanas, sus especificaciones y el total. Los revendedores tienen una versión con su propia marca para dársela a su cliente.' },
      { title: 'Pedido congelado y seguimiento', text: 'Al enviarlo se guardan los precios y nombres de ese momento, y nada se recalcula por detrás. En "Mis pedidos" ve el estado de cada uno y puede compartir un resumen por un link privado.' },
      { title: 'App móvil sin conexión (en desarrollo)', text: 'Una app que usa el mismo motor de cálculo que la web y cotiza sin señal, con los precios de venta descargados. Los pedidos quedan en cola y se envían solos cuando vuelve la conexión.' },
    ],
    solutionNote:
      'El cotizador no reemplaza a WinMaker, el sistema con el que la fábrica trabaja desde siempre: es la puerta de entrada para el cliente, y el pedido termina ahí, como un archivo que WinMaker abre. El cliente nunca ve costos internos ni margen: al navegador y a la app solo llega el precio final.',
    adminLabel: 'el otro lado: administración',
    adminHeading: 'Un panel interno donde los técnicos cargan la realidad de la fábrica.',
    admin: [
      {
        title: 'Recetas técnicas parametrizables',
        text: 'Los técnicos cargan qué lleva cada abertura: perfiles con sus cortes, accesorios, vidrios y límites fabricables. Cada receta elige componentes de catálogos reales: perfiles con su precio por color, accesorios, cámaras de DVH y mano de obra.',
      },
      {
        title: 'Estado de carga por receta',
        text: 'Un tablero muestra qué le falta a cada receta para cotizar con costo real: perfiles sin cargar, perfiles sin precio en el color, límites o accesorios. Lo que no está completo no se le ofrece al cliente.',
      },
      {
        title: 'Del pedido al taller',
        text: 'Cada pedido se ve con su desglose de costo y pasa por estados alineados al tablero comercial de la empresa. Desde ahí se genera el archivo .pto que la fábrica abre en WinMaker.',
      },
      {
        title: 'Parámetros que gobiernan el motor',
        text: 'Margen, IVA, desperdicios, colores con su código WinMaker, el tipo de cambio del dólar tomado del Banco Central (con historial y carga manual de respaldo) y usuarios con roles y descuentos: todo lo que afecta el precio se administra desde el panel, detrás de APIs con control de acceso por rol.',
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
      { step: 'UI', title: 'Web y app móvil', text: 'Configurador · pedidos · app Expo que cotiza sin conexión.' },
      { step: 'API', title: 'app/api/*', text: 'Frontera HTTP: auth, autorización y DTOs sin datos sensibles.' },
      { step: 'SRV', title: 'src/server/*', text: 'Lógica privada: pedidos, PDF, archivo .pto y tipo de cambio.' },
      { step: 'CALC', title: 'src/lib/cotizador/*', text: 'Motor de cálculo puro, sin I/O; la app lo reusa para cotizar offline.' },
      { step: 'DOM', title: 'src/technical/* · src/shared/*', text: 'Tipologías, validaciones y contratos compartidos por web y móvil.' },
      { step: 'DB', title: 'PostgreSQL', text: 'Esquema canónico en Supabase self-hosted, con Row-Level Security.' },
    ],
    archNote:
      'La parte que calcula medidas está separada de la parte que arma el precio, y ninguna de las dos toca la base. Por eso traer los números de la fábrica no rompió los precios, el costeo real no rompió la geometría y la app móvil pudo usar el mismo motor sin reescribirlo.',
    securityLabel: 'seguridad por diseño',
    securityHeading: 'Hay datos de clientes y costos internos en juego: la seguridad fue requisito, no agregado.',
    security: [
      { title: 'Ningún dato directo de la base', text: 'Todo pasa por el servidor con login. La llave maestra de la base vive solo ahí, nunca llega al navegador del cliente.' },
      { title: 'Links para compartir imposibles de adivinar', text: 'El link de un resumen no es un número seguido (1, 2, 3…) sino un código aleatorio, así nadie puede cambiarlo para espiar pedidos ajenos.' },
      { title: 'Entradas siempre acotadas', text: 'Medidas dentro de los límites de cada receta, cantidades enteras con tope, textos limitados. Un color desconocido frena la cotización en vez de cotizar mal.' },
      { title: 'Costos internos nunca expuestos', text: 'El cliente ve el precio final, nunca el costo ni el margen. El cálculo con costos ocurre en el servidor, y la app móvil solo recibe precios de venta.' },
      { title: 'Pedidos congelados y auditables', text: 'Cada pedido guarda un snapshot inmutable de precios y nombres, con folio asignado de forma atómica en la base: dos pedidos simultáneos jamás comparten número, y nada cambia después por detrás.' },
      { title: 'Control de acceso verificado en cada build', text: 'Un test hace fallar el build si alguna ruta de la API queda sin control de acceso. Una auditoría propia cerró además una fuga de costos en una ruta pública y endureció los headers.' },
    ],
    resultsLabel: '05 · resultado medible',
    resultsHeading: 'Lo que se puede medir.',
    results: [
      { value: '2,44× → ~1%', label: 'de error en el cálculo de aluminio frente al sistema de fábrica, corregido en la geometría y no con un factor de ajuste.' },
      { value: '2.641', label: 'recetas reales de fábrica analizadas por reverse engineering.' },
      { value: 'Validado', label: 'con pedidos de prueba que la propia fábrica valoró en WinMaker: el costo de la web nunca queda por debajo del de taller.' },
      { value: 'En producción', label: 'en cotizador.grupocps.com.uy, la puerta de entrada de los clientes de Grupo CPS.' },
    ],
    qualityLabel: 'calidad e ingeniería',
    qualityHeading: 'Cómo sé que los números están bien.',
    quality: [
      { metric: 'Recetas de fábrica analizadas', value: '2.641' },
      { metric: 'Formato cerrado .PRO descifrado', value: 'Parser propio + evaluador AST seguro' },
      { metric: 'Error de material vs. el sistema de fábrica', value: '2,44× → ~1%' },
      { metric: 'Validación', value: 'Pedidos de prueba valorados por la fábrica en WinMaker' },
      { metric: 'Calibración', value: 'Archivo histórico de cotizaciones de la empresa' },
      { metric: 'Control de acceso', value: 'Verificado por test en cada ruta de la API' },
      { metric: 'Calidad de código', value: 'TypeScript estricto, sin errores de tipo' },
    ],
    qualityNote:
      'El "modo sombra": una herramienta que compara, ventana por ventana, lo que calcula mi sistema contra el desglose real de piezas del software de fábrica. Sirve para medir cuánto me desvío antes de dar un precio por bueno. Después vino la prueba de verdad: pedidos que la fábrica valoró en su software y devolvió, con una regla fija: cada diferencia se cierra con una causa, no con un coeficiente.',
    shotsLabel: 'demo',
    shotsHeading: 'El cotizador en acción.',
    learningsLabel: 'aprendizajes',
    learnings: [
      'El problema difícil rara vez es el que se ve: la pantalla era lo fácil, el valor estaba en calcular bien y validar los números.',
      'No copié las 2.641 recetas a la fuerza: saqué solo lo que mueve el costo y dejé el resto como investigación aparte.',
      'Medir antes de afirmar: el "modo sombra" convirtió una corazonada ("el precio no cierra") en un número (2,44×) y después en una validación (~1%).',
      'El sistema completo incluye a quien lo mantiene: el panel interno y su estado de carga hacen que los técnicos, no el programador, sean los dueños de los datos.',
      'Un núcleo puro paga dividendos: como el motor nunca tocó la base, la app móvil sin conexión salió reusándolo, sin reescribir el cálculo.',
    ],
    ctaHeading: '¿Querés hablar de este proyecto?',
    ctaText: 'El código es privado, pero puedo contar en detalle cómo está hecho. Escribime si te interesa esto o querés hablar de una posición.',
    ctaContact: 'Contacto',
    ctaMore: 'Ver más proyectos',
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Recorrido en video por el cotizador, del armado de la ventana al pedido enviado', caption: 'Recorrido por el sistema: del armado de la abertura en 3D al pedido enviado.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Ventana cotizada renderizada en 3D girando sobre su eje', caption: 'Visualización 3D: la ventana cotizada gira para verse desde cualquier ángulo.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'PDF generado con la cotización armada', caption: 'PDF generado automáticamente con la cotización armada, listo para guardar o compartir.', width: 990, height: 1041, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_1.png', alt: 'Panel interno de carga técnica del cotizador', caption: 'El panel interno: recetas técnicas, catálogos y parámetros que alimentan el motor.', width: 1920, height: 989, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_2.png', alt: 'Estado de carga de recetas con semáforo de costo real', caption: 'El "estado de carga": qué le falta a cada receta para cotizar con costo real.', width: 1920, height: 1018, loop: false },
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
      { value: 'En producción', label: 'lo usan logística, jefes de obra y dirección de Grupo CPS, en el servidor de la empresa.' },
    ],
    qualityLabel: 'calidad e ingeniería',
    qualityHeading: 'El núcleo se prueba donde vive: en SQL.',
    quality: [
      { metric: 'Tests del núcleo SQL', value: 'Suite de integración que recorre el circuito completo, en una transacción que se revierte' },
      { metric: 'Qué cubre', value: 'Numeración, costeo PPP, recepciones parciales, rendiciones, herramientas por serie, RLS y roles' },
      { metric: 'Stock negativo', value: 'Imposible por diseño, incluso en concurrencia' },
      { metric: 'Esquema versionado', value: 'Migraciones aplicadas por CI sobre una base limpia antes de cada deploy' },
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
    category: 'Datos & IA',
    year: '2025–2026',
    roleLabel: 'Rol',
    role: 'Diseño, desarrollo e infraestructura, de punta a punta',
    yearLabel: 'Año',
    clientLabel: 'Origen',
    client: 'Grupo CPS, por un pedido de la dirección',
    code: { label: 'Código', note: 'Público en GitHub', href: arceMedia.repo, cta: 'Ver repositorio' },
    stack: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Zod', 'Ollama', 'Anthropic', 'React', 'Docker'],
    tagline: 'Inteligencia de mercado sobre las compras del Estado uruguayo.',
    summary:
      'Arce junta el histórico de compras estatales de Uruguay (qué se adjudicó, a quién, a qué precio y qué organismo lo compró) y lo convierte en estadísticas comparables: qué productos conviene vender, a qué precio se gana y contra quién se compite. Un modelo de IA lee esas cifras y escribe el análisis para la dirección, sin calcular nada por su cuenta.',
    metricValue: 'Auditable',
    metricText:
      'Cada respuesta de la IA se guarda junto con las cifras exactas que vio. Cualquier conclusión se puede rastrear hasta el número que la respalda.',
    problemLabel: '01 · problema de negocio',
    problem: [
      'Arce nació para otra cosa: leer el portal de compras estatales (ARCE) cada 15 minutos y decirle a la empresa qué llamados abiertos de aluminio le servían. Esa parte sigue funcionando.',
      'Después la dirección hizo una pregunta más grande: no qué licitación sirve hoy, sino qué conviene venderle al Estado, a qué precio y contra quién. Eso no sale de los llamados abiertos de un rubro. Hace falta todo el histórico de adjudicaciones, de cualquier producto, y compararlo de forma honesta.',
    ],
    constraintsLabel: '02 · restricciones',
    constraintsHeading: 'Lo que había que tener en cuenta.',
    constraints: [
      { title: 'Todavía sin datos', text: 'La descarga masiva del histórico va a ser un servicio aparte. Este sistema tenía que estar listo para recibirla y sacar las estadísticas solo, sin trabajo manual, apenas lleguen los lotes.' },
      { title: 'Datos públicos, pero desprolijos', text: 'Pesos, dólares y unidades indexadas; kilos, litros y resmas; precios con y sin impuestos; llamados anulados; proveedores que a veces llegan sin RUT. Comparar eso sin normalizar es comparar ruido.' },
      { title: 'Millones de filas', text: 'Con el histórico completo, los rankings no se pueden calcular en cada consulta.' },
      { title: 'Números que se puedan defender', text: 'Las conclusiones van a la dirección para decidir qué vender. Una cifra sin origen, o una IA que inventa, no sirve.' },
    ],
    insightLabel: 'la decisión clave',
    insightHeading: 'Los números salen de SQL. La IA los interpreta, no los calcula.',
    insight: [
      'Lo tentador era darle los datos a un modelo y pedirle conclusiones. Pero un modelo que calcula se puede equivocar sin que nadie lo note, y no hay forma de reproducir cómo llegó a un número.',
      'Por eso las estadísticas se calculan en PostgreSQL y el modelo solo recibe un paquete con las cifras ya hechas. Responde con un esquema fijo y citando números, los productos que menciona se verifican contra el paquete, y cada respuesta queda guardada junto con lo que vio.',
    ],
    decisionsLabel: '03 · decisiones técnicas y por qué',
    decisionsHeading: 'Por qué está construido así.',
    decisions: [
      { title: 'Contrato tolerante, estructura estricta', text: 'La API de ingesta acepta lo que el portal muestra (números con coma, fechas dd/mm/aaaa, la moneda como aparece) y lo normaliza. Pero un ítem sin número o una adjudicación sin proveedor se rechaza con el detalle del error, por llamado, sin tirar el lote entero.' },
      { title: 'Cada llamado viaja entero', text: 'Un llamado llega con sus ítems, ofertas y adjudicaciones y reemplaza su versión anterior en una transacción. El crudo se guarda con un hash: lo repetido no se reprocesa y, si cambian las reglas, todo se recalcula desde los crudos sin volver a scrapear.' },
      { title: 'Comparar solo lo comparable', text: 'Todo en pesos uruguayos sin impuestos, con la cotización del día de cada adjudicación. El precio se compara solo dentro de la misma unidad, sin llamados anulados, y con medianas y percentiles en vez de promedios.' },
      { title: 'Estadísticas precalculadas', text: 'Ocho vistas materializadas en PostgreSQL, con una fila por adjudicación como base. Se recalculan solas un minuto después del último lote y todas las noches, sin bloquear el tablero.' },
      { title: 'Un índice de oportunidad a la vista', text: 'Un puntaje de 0 a 100 por producto que combina volumen, frecuencia, cuántos organismos lo compran y qué tan repartido está entre proveedores. Los pesos están en una línea de SQL y el tablero muestra los cuatro componentes.' },
      { title: 'El mismo modelo, local o en la nube', text: 'El analista usa el proveedor del resto del sistema: Ollama en CPU (uno a tres minutos por informe) o la API de Anthropic (segundos). El paquete de datos se recorta al contexto de cada modelo.' },
    ],
    discardedLabel: '04 · qué se descartó',
    discardedHeading: 'Lo que descarté en el camino.',
    discarded: [
      { title: 'Que la IA calcule', text: 'Más rápido de armar, pero los números no se pueden reproducir ni auditar. El modelo lee cifras; no las produce.' },
      { title: 'Promedios', text: 'Un solo precio mal cargado en el portal arrastra la estadística entera. Medianas y percentiles lo absorben.' },
      { title: 'Un modelo de scoring entrenado', text: 'Sin datos reales todavía, una fórmula visible que se ajusta en una línea es más honesta que una caja negra. Primero hay que ver el mercado real.' },
      { title: 'Un endpoint por entidad', text: 'Ítems, ofertas y adjudicaciones por separado le complicaban la vida al scraper y hacían difícil que reenviar un lote no duplicara nada.' },
    ],
    solutionLabel: 'qué se construyó',
    solutionHeading: 'Del dato crudo a una recomendación con cifras.',
    solution: [
      { title: 'API de ingesta', text: 'Recibe lotes de llamados históricos con token, los valida contra un contrato publicado como JSON Schema y guarda el crudo.' },
      { title: 'Normalización', text: 'Proveedores por RUT, artículos por código del catálogo de ARCE, organismos, monedas y unidades llevados a un mismo canon.' },
      { title: 'Qué vender', text: 'Ranking de productos por índice de oportunidad, con el desglose de cada puntaje.' },
      { title: 'A qué precio', text: 'Distribución del precio ganador por producto y unidad, tendencia mensual y, donde el portal publica el cuadro comparativo, cuánto más barata fue la oferta que ganó.' },
      { title: 'Quién gana y quién compra', text: 'Proveedores con su cuota, tasa de éxito y contra quién compiten; organismos con lo que más compran.' },
      { title: 'El analista de IA', text: 'Un informe del mercado para la dirección, un veredicto por producto (entrar, explorar o evitar, con precio de entrada) y respuestas a preguntas libres, siempre citando los datos.' },
    ],
    solutionNote:
      'La primera etapa sigue en el mismo servicio: el monitor del rubro lee el portal cada 15 minutos, analiza los pliegos con IA y deja los llamados en una bandeja de revisión. Lo que falta es el scraper del histórico; mientras tanto, el tablero se probó con tres años de compras sintéticas que entran por la misma API.',
    diagram: {
      cta: 'Ver el diagrama interactivo',
      label: 'el sistema, en un diagrama',
      heading: 'Cómo encaja todo, en un diagrama que se puede tocar.',
      text: 'Cuatro vistas con cajas que se pueden mover y un recorrido explicado paso a paso: el circuito completo del portal al tablero, cómo entra y se normaliza un lote, cómo una adjudicación se vuelve estadística y cómo la IA escribe el análisis sin inventar cifras.',
    },
    archLabel: 'arquitectura',
    archHeading: 'Cómo fluyen los datos, del lote al tablero.',
    architecture: [
      { step: '01', title: 'Scraper del histórico (pendiente)', text: 'Un servicio aparte que recorre el portal y manda lotes de llamados por API.' },
      { step: '02', title: 'Ingesta', text: 'Token, contrato en Zod, crudo con hash y una transacción por llamado.' },
      { step: '03', title: 'PostgreSQL normalizado', text: 'Organismos, proveedores, artículos, llamados, ítems, ofertas, adjudicaciones y cotizaciones.' },
      { step: '04', title: 'Vistas materializadas', text: 'Una fila por adjudicación en pesos sin impuestos y, sobre ella, precios, rankings y competencia.' },
      { step: '05', title: 'Analista (Ollama o Anthropic)', text: 'Lee un paquete de cifras y responde con JSON validado, guardado junto al paquete.' },
      { step: '06', title: 'API y tablero', text: 'Express y React: qué vender, productos, competidores y compradores.' },
    ],
    archNote:
      'Vive en el mismo servicio en Docker que el monitor del rubro, con módulo y esquema de base propios: el pipeline original no se tocó.',
    resultsLabel: '05 · resultado',
    resultsHeading: 'Qué quedó funcionando.',
    results: [
      { value: 'Listo para datos', label: 'apenas el scraper mande lotes, las estadísticas se recalculan solas, sin pasos manuales.' },
      { value: 'Sin cifras inventadas', label: 'los productos que menciona la IA se verifican contra los datos que recibió; los que no existen se descartan.' },
      { value: 'Cobertura visible', label: 'el tablero dice qué parte de los datos tiene precio comparable y qué quedó afuera, y por qué.' },
      { value: 'Probado de punta a punta', label: 'con tres años de compras sintéticas por la misma API y un test de integración contra una base real.' },
    ],
    shotsLabel: 'capturas',
    shotsHeading: 'El tablero, con datos de demostración.',
    learningsLabel: 'aprendizajes',
    learnings: [
      'Cuando cambia la pregunta, cambia el dato que importa: pasar de "¿me sirve este llamado?" a "¿qué conviene vender?" movió el centro del sistema del pliego a la adjudicación.',
      'Lo difícil de comparar precios no es la estadística sino la normalización: moneda, unidad e impuestos deciden si un número significa algo.',
      'Separar quién calcula de quién interpreta deja que la IA sume sin convertirse en una fuente de cifras sin respaldo.',
      'Construir el receptor antes que el scraper, y probarlo con datos sintéticos por la misma puerta, dejó el contrato validado antes del primer dato real.',
    ],
    ctaHeading: '¿Querés hablar de este proyecto?',
    ctaText: 'El código es público. Si querés discutir el diseño o hablar de una posición, escribime.',
    ctaContact: 'Contacto',
    ctaMore: 'Ver más proyectos',
    gallery: [
      { kind: 'image', src: '/assets/projects/arce/mercado-oportunidades.webp', alt: 'Tablero de Arce: ranking de productos por índice de oportunidad y el informe de la IA', caption: 'Qué vender: productos ordenados por índice de oportunidad, con sus cuatro componentes, y el informe que la IA escribe a partir de esas cifras. Datos sintéticos de demostración.', width: 1920, height: 1200, loop: false },
      { kind: 'image', src: '/assets/projects/arce/mercado-producto-ia.webp', alt: 'Ficha de producto en Arce con el veredicto de la IA', caption: 'Ficha de un producto: el veredicto de la IA con precio de entrada apoyado en los percentiles, competidores que importan y a quién venderle primero. Datos sintéticos.', width: 1920, height: 1467, loop: false },
      { kind: 'image', src: '/assets/projects/arce/mercado-proveedor.webp', alt: 'Ficha de un competidor en Arce', caption: 'Ficha de un competidor: cuánto gana por mes, qué vende, a quién y con qué tasa de éxito. Datos sintéticos.', width: 1920, height: 1200, loop: false },
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
      sr: 'Backend developer. In charge of the systems at Grupo CPS.',
      l1: 'Backend developer.',
      l2: 'In charge of the systems',
      l3pre: 'at',
      highlight: 'Grupo CPS.',
    },
    copy: 'I am the sole person in charge of systems at a construction and aluminum joinery company. I design, build and run the software the company uses every day, like the quoter and the stock system, connected to its Monday boards.',
    ctaWork: 'View projects',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    portraitAlt: 'Sebastián Viglione',
    portraitName: 'Sebastián Viglione',
    portraitRole: 'software & systems lead · grupo cps',
    areasLabel: 'What I am in charge of',
    areas: [
      { title: 'Software development', tag: 'main focus', text: 'Systems of my own in production, connected to Monday.', icon: CodeXml },
      { title: 'Infrastructure', tag: '', text: 'The company server, automatic deploys and daily backups.', icon: Server },
      { title: 'IT support', tag: 'secondary', text: 'Office computers, equipment and users.', icon: Wrench },
    ],
  },

  about: {
    label: 'about me',
    heading: 'From a technical high school to leading a company’s systems.',
    intro:
      'I did the Technological Baccalaureate in Informatics at UTU and I am now studying Systems Engineering at Universidad de Montevideo, alongside work. I joined Grupo CPS in December 2024 and today I am in charge of the whole systems area.',
    body:
      'The part I enjoy most is the backend: understanding a domain well enough to model it, putting the rules where nobody can skip them, and checking results against reality before calling them good. I work in Spanish and English (C1).',
    facts: [
      { label: 'Systems Engineering student · Universidad de Montevideo', icon: GraduationCap },
      { label: 'Software & Systems Lead · Grupo CPS', icon: Briefcase },
      { label: 'Native Spanish · C1 English (CAE)', icon: Languages },
      { label: 'Montevideo, Uruguay', icon: MapPin },
    ],
    stackLabel: 'stack, by level of proficiency',
  },

  experience: {
    label: 'experience',
    heading: 'Where I work and what I do.',
    role: {
      title: 'Software & Systems Lead',
      company: 'Grupo CPS',
      period: '12/2024 – present',
      place: 'Montevideo, UY',
      scope:
        'Sole owner of the company’s systems area: software development (the main focus), infrastructure, company websites and office IT support.',
    },
    areas: [
      {
        title: 'Software development',
        tag: 'main focus',
        icon: CodeXml,
        bullets: [
          'I design, build and maintain the internal systems end to end: data model, business rules, API, interface and deploy.',
          'The quoter and the stock system are in production, used by clients, sales, logistics, construction sites and management. Arce, which analyzes state purchases, is in a new stage.',
          'I connect them to the company’s Monday boards so production and tasks move forward without entering data twice.',
        ],
        links: [
          { label: 'Quoter', href: '/cotizador' },
          { label: 'Depósitos', href: '/stock' },
          { label: 'Arce', href: '/arce' },
        ],
      },
      {
        title: 'Infrastructure',
        tag: '',
        icon: Server,
        bullets: [
          'I run the company server: self-hosted Supabase, Docker and Coolify.',
          'Automatic deploys on every push, migrations applied by CI and daily backups.',
        ],
        links: [],
      },
      {
        title: 'Company websites',
        tag: '',
        icon: Globe,
        bullets: [
          'I maintain grupocps.com.uy, in Spanish and English.',
          'I built a template for the real estate development sites; the first one is Edificio Galicia.',
        ],
        links: [],
      },
      {
        title: 'IT support',
        tag: 'secondary',
        icon: Wrench,
        bullets: ['Maintenance of the office computers and equipment.', 'Day-to-day support for the users.'],
        links: [],
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
    heading: 'Three systems, built from scratch.',
    monoLabel: '[ projects ] — grupo cps',
    statusChip: '2 in production · 1 in a new stage',
    sitesLabel: 'websites',
    sitesHeading: 'I also build websites.',
    sitesNote: 'Freelance, for clients in Uruguay and the United States, plus the Grupo CPS sites.',
    cursorLabel: 'VIEW',
    summaryLabels: { problem: 'problem', decision: 'decision', result: 'result' },
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
        summary: {
          problem: 'The price of a window does not come from square meters: it depends on how much aluminum and glass it really takes.',
          decision: 'Pull the geometry out of 2,641 factory-software recipes, without porting the whole thing.',
          result: 'Material error from 2.44× down to ~1%, validated with orders the factory priced.',
        },
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
        summary: {
          problem: 'Stock across warehouses and sites lived in spreadsheets, messages and memory.',
          decision: 'An immutable ledger with the rules in PostgreSQL: stock is never edited, only recorded.',
          result: '100% traceable balances and negative stock made impossible, even with concurrent operations.',
        },
      },
      {
        name: 'Arce Licitaciones',
        domain: 'Case study',
        url: '/arce',
        description: 'Market intelligence on Uruguay’s public procurement: which products are worth selling, at what price bids are won and against whom, with statistics in PostgreSQL and an AI that interprets them.',
        label: 'ARCE',
        kind: 'Data & AI · Grupo CPS',
        year: '2025–2026',
        cta: 'View case study',
        image: '/assets/projects/arce/mercado-oportunidades.webp',
        tags: ['TypeScript', 'PostgreSQL', 'AI'],
        summary: {
          problem: 'Management wanted to know what to sell to the State, at what price and against whom.',
          decision: 'The figures come from SQL over the purchase history; the AI only reads and interprets them.',
          result: 'Ready to receive the history and tested end to end with synthetic data.',
        },
      },
    ] as Project[],
    sites: [
      {
        name: 'Innately Italy',
        domain: 'innatelyitaly.com',
        url: 'https://innatelyitaly.com',
        description: 'A Washington DC studio that imports Italian furniture and kitchens. I replaced their WordPress with a fast static site, with redirects from the old URLs and no email downtime, working in English with the owner.',
        label: 'INNATELY',
        kind: 'freelance · US',
        cta: 'Visit site',
        image: '/assets/projects/innately.webp',
        tags: ['Next.js', 'Migration', 'Performance'],
      },
      {
        name: 'Force Crossfit',
        domain: 'forcebox4c.com.uy',
        url: 'https://forcebox4c.com.uy',
        description: 'A crossfit box that was losing inquiries on Instagram. The site puts the offer, schedule and contact in a place of its own.',
        label: 'FORCE',
        kind: 'freelance · gym',
        cta: 'Visit site',
        image: '/assets/projects/forcecrossfit.webp',
        tags: ['Web', 'Booking', 'Mobile first'],
      },
      {
        name: 'Open Gym',
        domain: 'opengym.uy',
        url: 'https://opengym.uy',
        description: 'A gym that needed people to find it, understand what it offers and reach out without relying on scattered messages.',
        label: 'OPEN',
        kind: 'freelance · gym',
        cta: 'Visit site',
        image: '/assets/projects/opengym.webp',
        tags: ['Web', 'Contact', 'Performance'],
      },
      {
        name: 'Edificio Galicia',
        domain: 'edificiogalicia.com.uy',
        url: 'https://edificiogalicia.com.uy',
        description: 'The website for Grupo CPS real estate developments, built on a reusable template. Edificio Galicia is under construction with no renders: floor plans and 3D views are generated from the architects’ drawings.',
        label: 'GAL',
        kind: 'grupo cps · developments',
        cta: 'Visit site',
        image: '/assets/projects/edificiogalicia.webp',
        tags: ['Python', 'Three.js', 'Template'],
      },
      {
        name: 'Grupo CPS',
        domain: 'grupocps.com.uy',
        url: 'https://grupocps.com.uy',
        description: 'The company site, in Spanish and English. The project catalog is generated from data and the build fails if a project is missing information.',
        label: 'CPS',
        kind: 'grupo cps · corporate',
        cta: 'Visit site',
        image: '/assets/projects/grupo_cps.webp',
        tags: ['Astro', 'ES/EN', 'Validated content'],
      },
    ] as Project[],
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
    systemsLabel: 'systems I built',
    systemsHeading: 'What I have already built.',
    systemsCta: 'View case study',
    sitesLabel: 'websites',
    sitesHeading: 'Five sites live, for clients here and abroad.',
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
    role: 'Sole developer: product, pricing engine, backend, database, security and mobile app',
    yearLabel: 'Year',
    clientLabel: 'Client',
    client: 'Grupo CPS, aluminum-and-glass joinery industry',
    code: { label: 'Code', note: 'Private · owned by Grupo CPS' },
    stack: ['Next.js 16', 'React', 'TypeScript', 'TailwindCSS 4', 'Three.js', 'PostgreSQL', 'Supabase self-hosted', 'Expo / React Native', 'Jest'],
    tagline: 'An aluminum joinery quoter that gives credible prices, not made-up numbers.',
    summary:
      'A web app, and now a mobile app too, where the client builds their order of aluminum-and-glass windows and gets a price. The challenge was not the screen, but getting the price right: what looked like a simple formula actually depended on how much aluminum and glass each window really uses. To get it right, I studied the 2,641 real recipes from the factory software, pulled out the numbers that drive the cost, and then validated it with test orders the factory itself priced in that software.',
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
      'Concrete example, the one I measured with: a 1200×1000 mm fixed window with one transom. The simple formula calculated 4.75 m of aluminum profile. For that same window, the factory software breaks down 11.61 m: the frame, the transom and the glazing bead of each pane. With the measurements pulled from the recipes, my calculation gives 11.72 m. That is where the 2.44× comes from, and where the ~1% comes from.',
    beforeLabel: 'Simple formula calculated',
    beforeValue: '4.75 m',
    afterLabel: 'Now calculates (factory: 11.61 m)',
    afterValue: '11.72 m',
    decisionsLabel: '03 · technical decisions and why',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Pure pricing engine, no I/O', text: 'All the pricing is pure functions, testable with no database. That is why it could be validated against the factory without spinning up any service, and the mobile app reuses it as is to quote offline.' },
      { title: 'Geometry separated from costing', text: 'The recipes changed how much material is counted without touching how the price is built. Later the costing became real too (each profile by its weight and the per-kilo price of the chosen color, labor per recipe) without touching the geometry. Each half changed without breaking the other.' },
      { title: 'Custom parser and AST evaluator for the .PRO format', text: 'Instead of executing the recipes, a static parser extracts per window type only the geometric constants (74, 126, 82/148 mm depending on the type), and each one is cited to its source file.' },
      { title: 'Immutable snapshot per order', text: 'Each order freezes the prices and names of that moment, with its number assigned atomically in the database (FOR UPDATE). Two simultaneous orders never share a number and a sent price never changes behind the scenes.' },
      { title: 'All the calculation on the server side', text: 'Endpoints return DTOs with no sensitive data. The service role lives only on the server and RLS is enabled with no public policies.' },
      { title: 'No complete recipe, no price', text: 'A line and window-type combination without a complete recipe is not offered, and a window that needs technical review is saved without a price. I would rather not quote than quote with an estimate dressed up as a price.' },
      { title: 'The order goes back to the factory software', text: 'Each order generates a .pto file the factory opens in WinMaker, which draws it and breaks it down with its own recipe. The format I first had to decode ended up being where the order lands.' },
    ],
    discardedLabel: '04 · what was discarded',
    discardedHeading: 'What I ruled out along the way.',
    discarded: [
      { title: 'Area × price per m² formula', text: 'Fast, but it counted 2.44× less aluminum than real. A hand-tuned correction factor would have hidden the error instead of fixing it.' },
      { title: 'Porting all of WinMaker to the web', text: 'Precise, but unfeasible: 2,641 recipes in a closed format and a full manufacturing engine, for what had to be an entry-level quoter.' },
      { title: 'Summary links with sequential IDs', text: 'They allowed enumerating other people’s orders by changing a number. Replaced with UUID tokens impossible to guess.' },
      { title: 'Calculating with costs in the browser', text: 'It would have exposed costs and margins to anyone opening the dev tools. The calculation with costs runs on the server; the mobile app quotes offline, but only with sale prices.' },
    ],
    solutionLabel: 'what was built',
    solutionHeading: 'A full-stack app with a pricing engine at its core.',
    solution: [
      { title: 'Step-by-step builder, with the window in 3D', text: 'The client picks type, dimensions, line, glass, color and accessories across four screens, with a live price. They see the window in 3D, which they can rotate, and the technical drawing, and can compare lines and glass before deciding.' },
      { title: 'Quote without an account', text: 'They leave their contact details first and then build the window. Clients with an account keep drafts and orders.' },
      { title: 'Several windows per order', text: 'They add, duplicate and adjust windows in one order until it is the way they want.' },
      { title: 'Quote as a PDF', text: 'A clean PDF with all the windows, their specs and the total. Resellers get a version with their own brand to hand to their client.' },
      { title: 'Frozen order and tracking', text: 'On submit, the prices and names of that moment are saved and nothing is recalculated behind the scenes. In “My orders” they see the status of each one and can share a summary via a private link.' },
      { title: 'Offline mobile app (in development)', text: 'An app that uses the same pricing engine as the web and quotes with no signal, using downloaded sale prices. Orders wait in a queue and send themselves when the connection comes back.' },
    ],
    solutionNote:
      'The quoter does not replace WinMaker, the system the factory has always worked with: it is the client’s front door, and the order ends up there, as a file WinMaker opens. The client never sees internal costs or margin: only the final price reaches the browser and the app.',
    adminLabel: 'the other side: administration',
    adminHeading: 'An internal panel where technicians load the factory’s reality.',
    admin: [
      {
        title: 'Parameterizable technical recipes',
        text: 'Technicians load what each window type takes: profiles with their cuts, accessories, glass and manufacturable limits. Each recipe picks components from real catalogs: profiles with their price per color, accessories, IGU spacers and labor.',
      },
      {
        title: 'Load status per recipe',
        text: 'A board shows what each recipe is missing to quote with real cost: profiles not loaded, profiles with no price in the color, limits or accessories. Whatever is incomplete is not offered to the client.',
      },
      {
        title: 'From order to workshop',
        text: 'Each order shows its cost breakdown and moves through statuses aligned with the company’s sales board. From there, the team generates the .pto file the factory opens in WinMaker.',
      },
      {
        title: 'Parameters that govern the engine',
        text: 'Margin, VAT, waste factors, colors with their WinMaker code, the dollar exchange rate taken from the Central Bank (with history and a manual fallback), and users with roles and discounts: everything that affects the price is managed from the panel, behind APIs with role-based access control.',
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
      { step: 'UI', title: 'Web and mobile app', text: 'Configurator · orders · Expo app that quotes offline.' },
      { step: 'API', title: 'app/api/*', text: 'HTTP boundary: auth, authorization and DTOs with no sensitive data.' },
      { step: 'SRV', title: 'src/server/*', text: 'Private logic: orders, PDF, the .pto file and the exchange rate.' },
      { step: 'CALC', title: 'src/lib/cotizador/*', text: 'Pure pricing engine, no I/O; the app reuses it to quote offline.' },
      { step: 'DOM', title: 'src/technical/* · src/shared/*', text: 'Window types, validations and contracts shared by web and mobile.' },
      { step: 'DB', title: 'PostgreSQL', text: 'Canonical schema on self-hosted Supabase, with Row-Level Security.' },
    ],
    archNote:
      'The part that calculates measurements is separated from the part that builds the price, and neither touches the database. That is why bringing in the factory numbers did not break the prices, real costing did not break the geometry, and the mobile app could use the same engine without rewriting it.',
    securityLabel: 'security by design',
    securityHeading: 'Client data and internal costs are at stake: security was a requirement, not an add-on.',
    security: [
      { title: 'No data served straight from the database', text: 'Everything goes through the server with login. The database master key lives only there, it never reaches the client’s browser.' },
      { title: 'Share links impossible to guess', text: 'A summary link is not a running number (1, 2, 3…) but a random code, so nobody can change it to peek at other people’s orders.' },
      { title: 'Inputs always bounded', text: 'Dimensions within each recipe’s limits, integer quantities with a cap, limited text. An unknown color stops the quote instead of quoting wrong.' },
      { title: 'Internal costs never exposed', text: 'The client sees the final price, never the cost or the margin. The calculation with costs happens on the server, and the mobile app only receives sale prices.' },
      { title: 'Frozen, auditable orders', text: 'Each order stores an immutable snapshot of prices and names, with its number assigned atomically in the database: two simultaneous orders never share a number, and nothing changes behind the scenes afterward.' },
      { title: 'Access control checked on every build', text: 'A test fails the build if any API route is left without access control. A self-run audit also closed a cost leak in a public route and hardened the headers.' },
    ],
    resultsLabel: '05 · measurable result',
    resultsHeading: 'What can be measured.',
    results: [
      { value: '2.44× → ~1%', label: 'error in the aluminum calculation against the factory system, fixed in the geometry rather than with a correction factor.' },
      { value: '2,641', label: 'real factory recipes analyzed by reverse engineering.' },
      { value: 'Validated', label: 'with test orders the factory itself priced in WinMaker: the web’s cost never falls below the workshop’s.' },
      { value: 'In production', label: 'at cotizador.grupocps.com.uy, the front door for Grupo CPS clients.' },
    ],
    qualityLabel: 'quality & engineering',
    qualityHeading: 'How I know the numbers are right.',
    quality: [
      { metric: 'Factory recipes analyzed', value: '2,641' },
      { metric: 'Proprietary .PRO format cracked', value: 'Custom parser + safe AST evaluator' },
      { metric: 'Material error vs. the factory system', value: '2.44× → ~1%' },
      { metric: 'Validation', value: 'Test orders priced by the factory in WinMaker' },
      { metric: 'Calibration', value: 'The company’s historical quote archive' },
      { metric: 'Access control', value: 'Checked by a test on every API route' },
      { metric: 'Code quality', value: 'Strict TypeScript, no type errors' },
    ],
    qualityNote:
      'The “shadow mode”: a tool that compares, window by window, what my system calculates against the real parts breakdown from the factory software. It measures how far off I am before calling a price good. Then came the real test: orders the factory priced in its own software and sent back, with one fixed rule: every gap gets closed with a cause, not a coefficient.',
    shotsLabel: 'demo',
    shotsHeading: 'The quoter in action.',
    learningsLabel: 'takeaways',
    learnings: [
      'The hard problem is rarely the visible one: the screen was the easy part, the value was in calculating well and validating the numbers.',
      'I did not brute-force copy the 2,641 recipes: I pulled out only what moves the cost and left the rest as separate research.',
      'Measure before you claim: “shadow mode” turned a hunch (“the price doesn’t add up”) into a number (2.44×) and then into a validation (~1%).',
      'A complete system includes whoever maintains it: the internal panel and its load status make the technicians, not the programmer, the owners of the data.',
      'A pure core pays off: since the engine never touched the database, the offline mobile app came out by reusing it, without rewriting the calculation.',
    ],
    ctaHeading: 'Want to talk about this project?',
    ctaText: 'The code is private, but I can walk you through how it is built. Write to me if this interests you or you want to talk about a role.',
    ctaContact: 'Contact',
    ctaMore: 'More projects',
    gallery: [
      { kind: 'video', src: '/assets/projects/cotizador/video_recorrido_sistema.mp4', alt: 'Video walkthrough of the quoter, from building the window to the submitted order', caption: 'System walkthrough: from building the window in 3D to the submitted order.', width: 1280, height: 720, loop: false },
      { kind: 'video', src: '/assets/projects/cotizador/ventana_rotando.mp4', alt: 'Quoted window rendered in 3D rotating on its axis', caption: '3D visualization: the quoted window rotates to be seen from any angle.', width: 1280, height: 720, loop: true },
      { kind: 'image', src: '/assets/projects/cotizador/pdf_generado_cotizacion.png', alt: 'Generated PDF with the assembled quote', caption: 'PDF generated automatically with the assembled quote, ready to save or share.', width: 990, height: 1041, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_1.png', alt: 'Internal technical-data panel of the quoter', caption: 'The internal panel: technical recipes, catalogs and the parameters that feed the engine.', width: 1920, height: 989, loop: false },
      { kind: 'image', src: '/assets/projects/cotizador/panel_interno_2.png', alt: 'Recipe load status with real-cost traffic light', caption: 'The “load status” view: what each recipe is missing to quote with real cost.', width: 1920, height: 1018, loop: false },
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
      { value: 'In production', label: 'used by logistics, site managers and management at Grupo CPS, on the company’s own server.' },
    ],
    qualityLabel: 'quality & engineering',
    qualityHeading: 'The core is tested where it lives: in SQL.',
    quality: [
      { metric: 'SQL core tests', value: 'Integration suite that walks the full circuit, inside a transaction that rolls back' },
      { metric: 'What it covers', value: 'Numbering, weighted-average costing, partial receptions, reconciliations, serial-numbered tools, RLS and roles' },
      { metric: 'Negative stock', value: 'Impossible by design, even under concurrency' },
      { metric: 'Versioned schema', value: 'Migrations applied by CI on a clean database before every deploy' },
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
    category: 'Data & AI',
    year: '2025–2026',
    roleLabel: 'Role',
    role: 'Design, development and infrastructure, end to end',
    yearLabel: 'Year',
    clientLabel: 'Origin',
    client: 'Grupo CPS, at management’s request',
    code: { label: 'Code', note: 'Public on GitHub', href: arceMedia.repo, cta: 'View repository' },
    stack: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Zod', 'Ollama', 'Anthropic', 'React', 'Docker'],
    tagline: 'Market intelligence on Uruguay’s public procurement.',
    summary:
      'Arce gathers the history of Uruguay’s public purchases (what was awarded, to whom, at what price and which agency bought it) and turns it into comparable statistics: which products are worth selling, at what price bids are won and who the competition is. An AI model reads those figures and writes the analysis for management, without computing anything on its own.',
    metricValue: 'Auditable',
    metricText:
      'Every AI answer is stored together with the exact figures it saw. Any conclusion can be traced back to the number behind it.',
    problemLabel: '01 · business problem',
    problem: [
      'Arce started out doing something else: reading the state procurement portal (ARCE) every 15 minutes and telling the company which open aluminum tenders were worth bidding on. That part still runs.',
      'Then management asked a bigger question: not which tender is useful today, but what is worth selling to the State, at what price and against whom. Open tenders in one field cannot answer that. It takes the full history of awards, for every product, compared honestly.',
    ],
    constraintsLabel: '02 · constraints',
    constraintsHeading: 'What I had to work around.',
    constraints: [
      { title: 'No data yet', text: 'Bulk download of the history will be a separate service. This system had to be ready to receive it and produce the statistics on its own, with no manual work, as soon as batches arrive.' },
      { title: 'Public data, but messy', text: 'Pesos, dollars and indexed units; kilos, liters and reams; prices with and without taxes; cancelled tenders; suppliers that sometimes come without a tax ID. Comparing that without normalizing is comparing noise.' },
      { title: 'Millions of rows', text: 'With the full history, rankings cannot be computed on every query.' },
      { title: 'Numbers that hold up', text: 'The conclusions go to management to decide what to sell. A figure with no source, or an AI that makes things up, is useless.' },
    ],
    insightLabel: 'the key decision',
    insightHeading: 'The numbers come from SQL. The AI interprets them, it does not compute them.',
    insight: [
      'The tempting route was to hand the data to a model and ask for conclusions. But a model that computes can be wrong without anyone noticing, and there is no way to reproduce how it got to a number.',
      'So the statistics are computed in PostgreSQL and the model only receives a package with the figures already done. It answers with a fixed schema and cites numbers, the products it mentions are checked against the package, and every answer is stored with what it saw.',
    ],
    decisionsLabel: '03 · technical decisions and why',
    decisionsHeading: 'Why it is built this way.',
    decisions: [
      { title: 'Tolerant contract, strict structure', text: 'The ingestion API accepts what the portal shows (decimal commas, dd/mm/yyyy dates, the currency as written) and normalizes it. But an item with no number or an award with no supplier is rejected with the error detail, per tender, without dropping the whole batch.' },
      { title: 'Each tender travels whole', text: 'A tender arrives with its items, bids and awards and replaces its previous version in one transaction. The raw payload is stored with a hash: repeats are not reprocessed and, if the rules change, everything is rebuilt from the raw data without scraping again.' },
      { title: 'Compare only what is comparable', text: 'Everything in Uruguayan pesos before tax, using the exchange rate of each award’s date. Prices are compared only within the same unit, without cancelled tenders, and with medians and percentiles instead of averages.' },
      { title: 'Precomputed statistics', text: 'Eight materialized views in PostgreSQL, built on one row per award. They refresh on their own a minute after the last batch and every night, without blocking the dashboard.' },
      { title: 'An opportunity index in plain sight', text: 'A 0–100 score per product combining volume, frequency, how many agencies buy it and how spread it is across suppliers. The weights are one line of SQL and the dashboard shows all four components.' },
      { title: 'Same model, local or in the cloud', text: 'The analyst uses the provider the rest of the system uses: Ollama on CPU (one to three minutes per report) or the Anthropic API (seconds). The data package is trimmed to each model’s context.' },
    ],
    discardedLabel: '04 · what was discarded',
    discardedHeading: 'What I ruled out along the way.',
    discarded: [
      { title: 'Letting the AI compute', text: 'Faster to build, but the numbers cannot be reproduced or audited. The model reads figures; it does not produce them.' },
      { title: 'Averages', text: 'A single mistyped price on the portal drags the whole statistic. Medians and percentiles absorb it.' },
      { title: 'A trained scoring model', text: 'With no real data yet, a visible formula that is tuned in one line is more honest than a black box. The real market has to be seen first.' },
      { title: 'One endpoint per entity', text: 'Items, bids and awards sent separately made the scraper’s job harder and made it hard to resend a batch without duplicating anything.' },
    ],
    solutionLabel: 'what was built',
    solutionHeading: 'From raw data to a recommendation backed by figures.',
    solution: [
      { title: 'Ingestion API', text: 'Receives batches of historical tenders with a token, validates them against a contract published as JSON Schema and stores the raw payload.' },
      { title: 'Normalization', text: 'Suppliers by tax ID, articles by ARCE catalog code, agencies, currencies and units brought to a single canon.' },
      { title: 'What to sell', text: 'Products ranked by opportunity index, with the breakdown of each score.' },
      { title: 'At what price', text: 'Winning price distribution per product and unit, monthly trend and, where the portal publishes the bid comparison, how much cheaper the winning bid was.' },
      { title: 'Who wins and who buys', text: 'Suppliers with their share, win rate and who they compete with; agencies with what they buy most.' },
      { title: 'The AI analyst', text: 'A market report for management, a verdict per product (enter, explore or avoid, with an entry price) and answers to free-form questions, always citing the data.' },
    ],
    solutionNote:
      'The first stage still lives in the same service: the field monitor reads the portal every 15 minutes, analyzes tender documents with AI and leaves them in a review inbox. What is missing is the history scraper; meanwhile, the dashboard was tested with three years of synthetic purchases sent through the same API.',
    diagram: {
      cta: 'Open the interactive diagram',
      label: 'the system, in a diagram',
      heading: 'How it all fits together, in a diagram you can move around.',
      text: 'Four views with draggable boxes and a step-by-step walkthrough: the full circuit from the portal to the dashboard, how a batch comes in and gets normalized, how an award becomes a statistic and how the AI writes the analysis without making up figures.',
    },
    archLabel: 'architecture',
    archHeading: 'How the data flows, from the batch to the dashboard.',
    architecture: [
      { step: '01', title: 'History scraper (pending)', text: 'A separate service that walks the portal and sends batches of tenders through the API.' },
      { step: '02', title: 'Ingestion', text: 'Token, Zod contract, raw payload with a hash and one transaction per tender.' },
      { step: '03', title: 'Normalized PostgreSQL', text: 'Agencies, suppliers, articles, tenders, items, bids, awards and exchange rates.' },
      { step: '04', title: 'Materialized views', text: 'One row per award in pesos before tax and, on top of it, prices, rankings and competition.' },
      { step: '05', title: 'Analyst (Ollama or Anthropic)', text: 'Reads a package of figures and answers with validated JSON, stored next to the package.' },
      { step: '06', title: 'API and dashboard', text: 'Express and React: what to sell, products, competitors and buyers.' },
    ],
    archNote:
      'It lives in the same Docker service as the field monitor, with its own module and database schema: the original pipeline was left untouched.',
    resultsLabel: '05 · result',
    resultsHeading: 'What is up and running.',
    results: [
      { value: 'Ready for data', label: 'as soon as the scraper sends batches, the statistics refresh on their own, with no manual steps.' },
      { value: 'No made-up figures', label: 'the products the AI mentions are checked against the data it received; those that do not exist are dropped.' },
      { value: 'Visible coverage', label: 'the dashboard shows how much of the data has a comparable price and what was left out, and why.' },
      { value: 'Tested end to end', label: 'with three years of synthetic purchases through the same API and an integration test against a real database.' },
    ],
    shotsLabel: 'screenshots',
    shotsHeading: 'The dashboard, with demo data.',
    learningsLabel: 'takeaways',
    learnings: [
      'When the question changes, the data that matters changes: going from "is this tender for us?" to "what is worth selling?" moved the center of the system from the tender document to the award.',
      'The hard part of comparing prices is not the statistics but the normalization: currency, unit and taxes decide whether a number means anything.',
      'Separating who computes from who interprets lets the AI add value without becoming a source of unbacked figures.',
      'Building the receiver before the scraper, and testing it with synthetic data through the same door, validated the contract before the first real record.',
    ],
    ctaHeading: 'Want to talk about this project?',
    ctaText: 'The code is public. If you want to discuss the design or talk about a role, write to me.',
    ctaContact: 'Contact',
    ctaMore: 'More projects',
    gallery: [
      { kind: 'image', src: '/assets/projects/arce/mercado-oportunidades.webp', alt: 'Arce dashboard: products ranked by opportunity index and the AI report', caption: 'What to sell: products ranked by opportunity index, with its four components, and the report the AI writes from those figures. Synthetic demo data.', width: 1920, height: 1200, loop: false },
      { kind: 'image', src: '/assets/projects/arce/mercado-producto-ia.webp', alt: 'Product page in Arce with the AI verdict', caption: 'A product page: the AI verdict with an entry price based on the percentiles, the competitors that matter and who to sell to first. Synthetic data.', width: 1920, height: 1467, loop: false },
      { kind: 'image', src: '/assets/projects/arce/mercado-proveedor.webp', alt: 'Competitor page in Arce', caption: 'A competitor page: how much it wins per month, what it sells, to whom and at what win rate. Synthetic data.', width: 1920, height: 1200, loop: false },
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
