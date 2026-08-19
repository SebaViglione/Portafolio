#import "template.typ": cv

#cv((
  lang: "es",
  name: [Sebastián Viglione Chiarlone],
  subtitle: [Developer & Systems Technician \ Estudiante de Ingeniería en Sistemas],
  labels: (
    contact: "Contacto",
    education: "Educación",
    skills: "Skills técnicas",
    languages: "Idiomas",
    soft: "Competencias",
    profile: "Perfil profesional",
    experience: "Experiencia laboral",
    projects: "Proyectos destacados",
  ),
  contact: (
    ("Ubicación", "Montevideo, Uruguay"),
    ("Email", "sebaviglione10@gmail.com"),
    ("Portfolio", "sebaviglione.com"),
    ("LinkedIn", "linkedin.com/in/sebaviglione"),
    ("GitHub", "github.com/SebaViglione"),
  ),
  education: (
    (title: "Ingeniería en Sistemas", detail: "Universidad de Montevideo · estudiante en curso"),
    (title: "Bachillerato Tecnológico en Informática", detail: "UTU Brazo Oriental · excelente escolaridad"),
  ),
  skills: (
    ("Lenguajes", "Python, SQL, TypeScript, JavaScript"),
    ("Web", "React, Next.js, Tailwind, Three.js"),
    ("Backend/API", "REST APIs, JSON, webhooks, Supabase, Jest"),
    ("Datos", "PostgreSQL, ETL"),
    ("Automatización & IA", "n8n, Ollama, OpenAI API"),
    ("Infraestructura", "Linux, Docker, Bash, Git, GitHub"),
  ),
  languages: (
    ("Español", "Nativo"),
    ("Inglés", "Avanzado C1 (CAE)"),
  ),
  soft: (
    "Aprendizaje rápido y curiosidad técnica",
    "Trabajo en equipo y comunicación clara",
    "Autonomía para resolver problemas",
    "Adaptabilidad y buena disposición al feedback",
  ),
  profile: [Desarrollador de software enfocado en construir sistemas que ordenan operaciones: herramientas internas, integraciones y automatización. En Grupo CPS desarrollo soluciones que integran sistemas mediante APIs REST, JSON y webhooks, con PostgreSQL como base de datos principal y despliegues sobre Linux y Docker. Me muevo cómodo de la base de datos al frontend (TypeScript, React/Next.js). Estudiante de Ingeniería en Sistemas (Universidad de Montevideo), con bachillerato tecnológico en informática (UTU), inglés C1.],
  experience: (
    title: "Developer & Systems Technician · Grupo CPS",
    period: "12/2024 – Actualidad",
    bullets: (
      [Desarrollo y mantenimiento de soluciones internas que automatizan procesos operativos y comerciales.],
      [Integración de APIs REST, webhooks y estructuras JSON con Python, TypeScript y n8n para conectar sistemas y flujos de negocio.],
      [Desarrollo de scripts en Python para extracción, limpieza y procesamiento de datos de fuentes externas, incluyendo web scraping.],
      [Administración de PostgreSQL, Linux y Docker; uso de Git/GitHub para versionado, despliegue y mantenimiento.],
      [Desarrollo de sitios web institucionales y comerciales para presencia digital y captación de clientes.],
      [Relevamiento con usuarios internos para convertir necesidades del negocio en soluciones funcionales.],
    ),
  ),
  projects: (
    (
      title: "Cotizador de aberturas de aluminio · Grupo CPS",
      tags: ("Next.js", "React", "TypeScript", "Supabase (PostgreSQL)", "Three.js", "Jest"),
      bullets: (
        [Web B2B donde el cliente arma su pedido con vista 3D y precio en vivo, y panel interno donde los técnicos cargan recetas de fabricación y componentes reales.],
        [Motor de cálculo calibrado con reverse engineering sobre 2.641 recetas reales de fábrica.],
        [En producción: #text(fill: rgb("#1B3A6B"), weight: "bold")[cotizador.grupocps.com.uy].],
      ),
    ),
    (
      title: "Depósitos CPS · sistema interno de stock",
      tags: ("Next.js", "Supabase", "PostgreSQL", "RLS"),
      bullets: (
        [Stock para depósitos y obras: compras, transferencias, vales y herramientas por número de serie sobre un kardex inmutable, con costeo promedio ponderado y alertas.],
      ),
    ),
    (
      title: "Arce · monitoreo de licitaciones públicas",
      tags: ("n8n", "Node.js", "Puppeteer", "PostgreSQL", "Ollama", "Docker"),
      bullets: (
        [Pipeline que detecta, procesa y clasifica licitaciones con IA local; ahorra al equipo comercial unas 10 horas semanales de revisión manual.],
      ),
    ),
    (
      title: "Sitios web comerciales e institucionales",
      tags: ("Web", "4 sitios en producción"),
      bullets: (
        [Force Crossfit, Open Gym, Grupo CPS y Edificio Galicia: sitios orientados a generar confianza y captar consultas.],
      ),
    ),
  ),
  footer: [Case studies detallados de estos proyectos en #text(fill: rgb("#1B3A6B"), weight: "bold")[sebaviglione.com]. Abierto a roles full-time y a proyectos freelance.],
))
