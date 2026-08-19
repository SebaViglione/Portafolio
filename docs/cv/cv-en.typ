#import "template.typ": cv

#cv((
  lang: "en",
  name: [Sebastián Viglione Chiarlone],
  subtitle: [Developer & Systems Technician \ Systems Engineering student],
  labels: (
    contact: "Contact",
    education: "Education",
    skills: "Technical skills",
    languages: "Languages",
    soft: "Soft skills",
    profile: "Professional profile",
    experience: "Work experience",
    projects: "Featured projects",
  ),
  contact: (
    ("Location", "Montevideo, Uruguay"),
    ("Email", "sebaviglione10@gmail.com"),
    ("Portfolio", "sebaviglione.com"),
    ("LinkedIn", "linkedin.com/in/sebaviglione"),
    ("GitHub", "github.com/SebaViglione"),
  ),
  education: (
    (title: "Systems Engineering", detail: "Universidad de Montevideo · currently enrolled"),
    (title: "Technological Baccalaureate in Informatics", detail: "UTU Brazo Oriental · excellent academic record"),
  ),
  skills: (
    ("Languages", "Python, SQL, TypeScript, JavaScript"),
    ("Web", "React, Next.js, Tailwind, Three.js"),
    ("Backend/API", "REST APIs, JSON, webhooks, Supabase, Jest"),
    ("Data", "PostgreSQL, ETL"),
    ("Automation & AI", "n8n, Ollama, OpenAI API"),
    ("Infrastructure", "Linux, Docker, Bash, Git, GitHub"),
  ),
  languages: (
    ("Spanish", "Native"),
    ("English", "Advanced C1 (CAE)"),
  ),
  soft: (
    "Fast learner with technical curiosity",
    "Teamwork and clear communication",
    "Autonomous problem-solving",
    "Adaptable and open to feedback",
  ),
  profile: [Software developer focused on building systems that organize operations: internal tools, integrations and automation. At Grupo CPS I build solutions that integrate systems through REST APIs, JSON and webhooks, with PostgreSQL as the main database and deployments on Linux and Docker. I move comfortably from the database to the frontend (TypeScript, React/Next.js). Systems Engineering student (Universidad de Montevideo) with a technological baccalaureate in informatics (UTU), C1 English.],
  experience: (
    title: "Developer & Systems Technician · Grupo CPS",
    period: "12/2024 – Present",
    bullets: (
      [Development and maintenance of internal solutions that automate operational and commercial processes.],
      [Integration of REST APIs, webhooks and JSON structures with Python, TypeScript and n8n to connect systems and business flows.],
      [Python scripts for data extraction, cleaning and processing from external sources, including web scraping.],
      [Administration of PostgreSQL, Linux and Docker; Git/GitHub for versioning, deployment and maintenance.],
      [Institutional and commercial websites for digital presence and lead generation.],
      [Requirements gathering with internal users to turn business needs into working solutions.],
    ),
  ),
  projects: (
    (
      title: "Aluminum joinery quoting system · Grupo CPS",
      tags: ("Next.js", "React", "TypeScript", "Supabase (PostgreSQL)", "Three.js", "Jest"),
      bullets: (
        [B2B web app where the client builds their order with a 3D preview and live pricing, plus an internal panel where technicians load real fabrication recipes and components.],
        [Pricing engine calibrated by reverse engineering 2,641 real factory recipes.],
        [Live at #text(fill: rgb("#1B3A6B"), weight: "bold")[cotizador.grupocps.com.uy].],
      ),
    ),
    (
      title: "Depósitos CPS · internal stock system",
      tags: ("Next.js", "Supabase", "PostgreSQL", "RLS"),
      bullets: (
        [Stock for warehouses and construction sites: purchases, transfers, vouchers and serial-numbered tools on an immutable ledger, with weighted-average costing and alerts.],
      ),
    ),
    (
      title: "Arce · public tender monitoring",
      tags: ("n8n", "Node.js", "Puppeteer", "PostgreSQL", "Ollama", "Docker"),
      bullets: (
        [Pipeline that detects, processes and classifies public tenders with local AI; saves the sales team about 10 hours of manual review per week.],
      ),
    ),
    (
      title: "Commercial and institutional websites",
      tags: ("Web", "4 sites in production"),
      bullets: (
        [Force Crossfit, Open Gym, Grupo CPS and Edificio Galicia: sites focused on building trust and capturing inquiries.],
      ),
    ),
  ),
  footer: [Detailed case studies of these projects at #text(fill: rgb("#1B3A6B"), weight: "bold")[sebaviglione.com]. Open to full-time roles and freelance projects.],
))
