import {
  Bot,
  BriefcaseBusiness,
  Clock3,
  MessageSquareText,
  MonitorSmartphone,
  RefreshCw,
  UserRound,
  WalletCards,
} from 'lucide-react';

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

export const contact = {
  email: 'sebaviglione10@gmail.com',
  linkedin: 'https://linkedin.com/in/sebaviglione',
  github: 'https://github.com/SebaViglione',
  whatsapp: 'https://wa.me/59892009897?text=Hola%20Seba%2C%20quiero%20hablar%20sobre%20un%20proyecto.',
};

export const navItems = [
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

export const services = [
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
];

export const projects: Project[] = [
  {
    name: 'Force Crossfit',
    domain: 'forcebox4c.com.uy',
    url: 'https://forcebox4c.com.uy',
    description: 'Necesitaban dejar de perder consultas por Instagram y tener un lugar propio donde la gente llegue, entienda la propuesta y se contacte.',
    label: 'FORCE',
    kind: 'Sitio comercial',
    cta: 'Ver sitio',
    image: '/assets/projects/forcecrossfit.png',
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
    image: '/assets/projects/opengym.png',
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
    image: '/assets/projects/grupo_cps.png',
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
    image: '/assets/projects/edificiogalicia.png',
    tags: ['Inmobiliaria', 'Landing', 'Contacto'],
  },
  {
    name: 'Arce Licitaciones',
    domain: 'ARCE-LICITACIONES-IA',
    url: 'https://github.com/SebaViglione/ARCE-LICITACIONES-IA',
    description: 'Automatización que monitorea, filtra y analiza licitaciones públicas con n8n, PostgreSQL y modelos de IA local para detectar oportunidades.',
    label: 'ARCE',
    kind: 'Automatización',
    cta: 'Ver proyecto',
    video: '/assets/projects/arce_dashboard_demo.webm',
    tags: ['n8n', 'PostgreSQL', 'IA local'],
  },
];

export const reasons = [
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
    title: 'Sin tecnicismos',
    text: 'Explicás tu problema en tu idioma. Yo me encargo de traducirlo a código. No necesitás saber de tecnología.',
    icon: MessageSquareText,
  },
];
