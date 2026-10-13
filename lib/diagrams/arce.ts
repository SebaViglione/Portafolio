import { e, n, type DiagramProjectData, type ProjectText, type ViewLayout } from './types';

// Arce Licitaciones IA (repo público): cuatro vistas. Desde octubre de 2026 es un
// único servicio Node.js/TypeScript (cron + pipeline + API + dashboard); la versión
// con n8n y scripts de bash se eliminó.

const layout: ViewLayout[] = [
  {
    // Fila de captura arriba (portal → servicio → scraper); debajo, cada pieza cae
    // recta desde la de arriba: el análisis bajo el servicio, Postgres bajo el scraper.
    id: 'mapa',
    nodes: [
      n('portal', 'fabrica', 40, 60, 220),
      n('app', 'servidor', 380, 60, 240),
      n('scraper', 'panel', 740, 60, 220),
      n('ia', 'calc', 40, 340, 240),
      n('analisis', 'panel', 380, 340, 240),
      n('postgres', 'datos', 730, 340, 240),
      n('dashboard', 'web', 1090, 340, 240),
      n('equipo', 'persona', 1450, 340, 220),
    ],
    groups: [
      { id: 'gd', nodes: ['app', 'scraper', 'postgres', 'analisis', 'dashboard'] },
      { id: 'gh', nodes: ['ia'] },
    ],
    edges: [
      e('portal', 'app'),
      e('app', 'scraper'),
      e('scraper', 'postgres'),
      e('app', 'analisis'),
      e('analisis', 'postgres', { bidir: true }),
      e('analisis', 'ia', { bidir: true }),
      e('postgres', 'dashboard', { bidir: true }),
      e('dashboard', 'equipo', { bidir: true }),
    ],
    tour: [
      { nodes: ['portal', 'app', 'scraper'], edges: ['portal>app', 'app>scraper'] },
      { nodes: ['scraper', 'postgres'], edges: ['scraper>postgres'] },
      { nodes: ['app', 'analisis', 'ia'], edges: ['app>analisis', 'analisis>ia'] },
      { nodes: ['analisis', 'postgres', 'dashboard'], edges: ['analisis>postgres', 'postgres>dashboard'] },
      { nodes: ['dashboard', 'equipo', 'postgres'], edges: ['dashboard>equipo', 'postgres>dashboard'] },
    ],
  },
  {
    // Una corrida del pipeline (app/src/pipeline/run.ts), en serpentina de dos
    // filas para que la vuelta caiga recta.
    id: 'pipeline',
    nodes: [
      n('p1', 'paso', 40, 60, 200),
      n('p2', 'datos', 290, 60, 200),
      n('p3', 'paso', 540, 60, 200),
      n('p4', 'gate', 790, 60, 200),
      n('p5', 'panel', 1040, 60, 200),
      n('p6', 'gate', 1040, 320, 200),
      n('p7', 'datos', 790, 320, 200),
      n('p8', 'panel', 540, 320, 200),
      n('p9', 'calc', 290, 320, 200),
      n('p10', 'total', 40, 320, 200),
    ],
    groups: [
      { id: 'g1', nodes: ['p1', 'p2', 'p3', 'p4', 'p5'] },
      { id: 'g2', nodes: ['p6', 'p7', 'p8', 'p9', 'p10'] },
    ],
    edges: [
      e('p1', 'p2'),
      e('p2', 'p3'),
      e('p3', 'p4'),
      e('p4', 'p5'),
      e('p5', 'p6'),
      e('p6', 'p7'),
      e('p7', 'p8'),
      e('p8', 'p9'),
      e('p9', 'p10'),
    ],
    tour: [
      { nodes: ['p1', 'p2', 'p3'], edges: ['p1>p2', 'p2>p3'] },
      { nodes: ['p3', 'p4', 'p5'], edges: ['p3>p4', 'p4>p5'] },
      { nodes: ['p5', 'p6', 'p7'], edges: ['p5>p6', 'p6>p7'] },
      { nodes: ['p7', 'p8', 'p9', 'p10'], edges: ['p7>p8', 'p8>p9', 'p9>p10'] },
    ],
  },
  {
    // Preparar → decidir → analizar (con o sin fragmentos) → resultado. El
    // camino de respaldo sale por abajo y entra al resultado sin cruzar nada.
    id: 'analisis',
    nodes: [
      n('pendientes', 'datos', 40, 300, 220),
      n('contexto', 'panel', 350, 300, 220),
      n('extraer', 'panel', 660, 300, 220),
      n('decision', 'gate', 970, 300, 220),
      n('chunk', 'calc', 1280, 60, 220),
      n('modeloN', 'calc', 1590, 60, 220),
      n('modelo1', 'calc', 1280, 300, 220),
      n('resultado', 'total', 1900, 300, 220),
      n('guardar', 'datos', 2210, 300, 220),
      n('fallback', 'gate', 660, 540, 220),
    ],
    groups: [
      { id: 'gp', nodes: ['pendientes', 'contexto', 'extraer'] },
      { id: 'ga', nodes: ['decision', 'chunk', 'modeloN', 'modelo1'] },
      { id: 'gr', nodes: ['resultado', 'guardar'] },
    ],
    edges: [
      e('pendientes', 'contexto'),
      e('contexto', 'extraer'),
      e('extraer', 'decision'),
      e('decision', 'chunk'),
      e('decision', 'modelo1'),
      e('chunk', 'modeloN'),
      e('modeloN', 'resultado'),
      e('modelo1', 'resultado'),
      e('resultado', 'guardar'),
      e('extraer', 'fallback', { dashed: true }),
      e('fallback', 'resultado', { dashed: true }),
    ],
    tour: [
      { nodes: ['pendientes', 'contexto', 'extraer'], edges: ['pendientes>contexto', 'contexto>extraer'] },
      { nodes: ['decision', 'chunk', 'modeloN', 'modelo1'], edges: ['extraer>decision', 'decision>chunk', 'chunk>modeloN', 'decision>modelo1'] },
      { nodes: ['modeloN', 'modelo1', 'resultado', 'guardar'], edges: ['modeloN>resultado', 'modelo1>resultado', 'resultado>guardar'] },
      { nodes: ['extraer', 'fallback', 'resultado'], edges: ['extraer>fallback', 'fallback>resultado'] },
    ],
  },
  {
    // La API entre la vista y la interfaz; la ficha debajo de la bandeja; el
    // feedback vuelve a la API por una vertical limpia.
    id: 'dashboard',
    nodes: [
      n('vista', 'datos', 40, 300, 240),
      n('api', 'servidor', 380, 300, 260),
      n('ui', 'web', 740, 300, 260),
      n('equipo', 'persona', 1100, 300, 240),
      n('ficha', 'web', 740, 560, 260),
      n('feedback', 'paso', 380, 560, 260),
      n('metricas', 'total', 40, 560, 240),
    ],
    groups: [
      { id: 'gs', nodes: ['vista', 'api'] },
      { id: 'gu', nodes: ['ui', 'ficha'] },
      { id: 'gh', nodes: ['feedback', 'metricas'] },
    ],
    edges: [
      e('api', 'vista', { bidir: true }),
      e('api', 'ui', { bidir: true }),
      e('ui', 'equipo', { bidir: true }),
      e('ui', 'ficha'),
      e('ficha', 'feedback'),
      e('feedback', 'api'),
      e('feedback', 'metricas', { dashed: true }),
    ],
    tour: [
      { nodes: ['vista', 'api', 'ui'], edges: ['api>vista', 'api>ui'] },
      { nodes: ['ui', 'equipo', 'ficha'], edges: ['ui>equipo', 'ui>ficha'] },
      { nodes: ['ficha', 'feedback', 'api'], edges: ['ficha>feedback', 'feedback>api'] },
      { nodes: ['feedback', 'metricas'], edges: ['feedback>metricas'] },
    ],
  },
];

/* ───────────────────────────── Textos por idioma ──────────────────────────── */

const es: ProjectText = {
  header: {
    kicker: 'case study · arce licitaciones',
    title: 'Arce, en un diagrama que se puede tocar.',
    intro:
      'Cuatro vistas del sistema: el circuito completo del portal al dashboard, una corrida del pipeline etapa por etapa, cómo se analiza cada pliego con IA y cómo el equipo usa el dashboard y corrige a la IA. Cada caja se puede mover; cada vista tiene un recorrido explicado paso a paso.',
    footNote: 'El diagrama sigue el código publicado en GitHub (la versión en TypeScript, de octubre de 2026). Los módulos y tablas son los reales.',
  },
  typeNames: {
    persona: 'persona',
    web: 'dashboard',
    servidor: 'servicio',
    datos: 'datos',
    panel: 'proceso',
    fabrica: 'fuente externa',
    paso: 'etapa',
    calc: 'IA',
    total: 'resultado',
    entrada: 'entrada',
    gate: 'decisión',
    config: 'infraestructura',
    estado: 'estado',
    ok: 'estado',
    bad: 'estado',
  },
  views: {
    mapa: {
      name: 'Mapa general',
      intro:
        'Del portal de compras estatales al equipo: un solo servicio en Node.js corre el pipeline cada 15 minutos, PostgreSQL guarda, un modelo de IA analiza los pliegos y el dashboard muestra lo relevante. Todo en Docker; la IA corre en el host con Ollama o en Anthropic.',
      script: [
        'Arce monitorea el portal de compras estatales de Uruguay y le deja al equipo solo las licitaciones que importan para un rubro. Se usó para el aluminio y ahora se reorienta a analizar el historial de compras del Estado.',
        'Cada 15 minutos el servicio lee el RSS del portal y filtra por rubro; por cada candidato nuevo, Puppeteer entra a la página y extrae detalle, adjuntos, aclaraciones e ítems.',
        'Todo se guarda estructurado y sin duplicados en PostgreSQL. Después el módulo de análisis descarga los pliegos pendientes, los pasa a texto y se los manda al modelo de IA.',
        'La IA responde en un formato fijo: si es relevante, con qué confianza, qué hay que hacer, dónde, si hay visita técnica y qué formularios presentar. Eso se valida y se guarda junto al llamado.',
        'El equipo abre el dashboard, revisa lo filtrado y corrige a la IA cuando se equivoca. Cada corrección se guarda junto a lo que dijo la IA y alimenta las métricas de precisión.',
      ],
      nodes: {
        portal: {
          label: 'Portal de compras estatales',
          sub: 'feed RSS + página de cada llamado, con pliegos adjuntos',
          desc: 'La fuente. Publica los llamados como texto no estructurado y archivos en cualquier formato.',
        },
        app: {
          label: 'Servicio Arce (Node.js)',
          sub: 'cron cada 15 min · pipeline · API · una corrida a la vez',
          desc: 'Un único servicio en TypeScript reemplazó a la versión con n8n y scripts de bash. La configuración (rubro, frecuencia, modelo) se valida al arrancar.',
        },
        scraper: {
          label: 'Scraper (Puppeteer)',
          sub: 'abre cada candidato y extrae detalle, adjuntos, aclaraciones e ítems',
          desc: 'Un módulo del servicio: un Chromium compartido, dos páginas en paralelo.',
        },
        ia: {
          label: 'Modelo de IA',
          sub: 'Ollama en el host (por defecto) o Anthropic',
          desc: 'Los dos proveedores cumplen la misma interfaz y el mismo esquema de respuesta. Cambiar es una variable de entorno.',
        },
        analisis: {
          label: 'Análisis de pliegos',
          sub: 'descarga, extrae el texto y consulta a la IA',
          desc: 'Procesa los adjuntos pendientes con un tope por corrida, fragmenta los largos y analiza por metadatos cuando no hay texto.',
        },
        postgres: {
          label: 'PostgreSQL',
          sub: 'llamados · adjuntos · aclaraciones · ítems · análisis IA · feedback · corridas',
          desc: 'Todo queda estructurado, deduplicado y con historial, con migraciones versionadas. Una vista arma lo que el dashboard necesita, con búsqueda de texto en español.',
        },
        dashboard: {
          label: 'API + dashboard',
          sub: 'Express 5 · React (Vite) · bandeja de revisión y métricas',
          desc: 'La API sirve la vista de la base, guarda el feedback y calcula las métricas; el dashboard se compila y lo sirve el mismo servicio.',
        },
        equipo: {
          label: 'Equipo',
          sub: 've lo relevante y corrige',
          desc: 'Deja de revisar el portal: abre el dashboard y actúa sobre las oportunidades filtradas.',
        },
      },
      edges: {
        'portal>app': 'RSS cada 15 min',
        'app>scraper': 'candidatos nuevos',
        'scraper>postgres': 'inserta sin duplicados',
        'app>analisis': 'adjuntos pendientes',
        'analisis>postgres': 'análisis',
        'analisis>ia': 'consulta',
        'postgres>dashboard': 'lee y guarda',
        'dashboard>equipo': 've · corrige',
      },
      groups: { gd: 'EN DOCKER', gh: 'EN EL HOST O EN LA NUBE' },
      tour: [
        'Cada 15 minutos el servicio lee el RSS del portal, filtra por rubro y, por cada candidato nuevo, abre la página con Puppeteer y extrae el detalle.',
        'Lo extraído se inserta en PostgreSQL sin duplicados y en una transacción: el llamado, sus adjuntos, las aclaraciones y los ítems.',
        'El módulo de análisis toma los adjuntos pendientes, los pasa a texto y consulta al modelo de IA: Ollama en el host o Anthropic, con el mismo contrato.',
        'El análisis vuelve a la base validado, una fila por adjunto, y una vista junta llamado, análisis y feedback para el dashboard.',
        'El equipo ve las oportunidades relevantes y corrige a la IA cuando se equivoca; cada corrección queda guardada y suma a las métricas.',
      ],
    },
    pipeline: {
      name: 'Una corrida del pipeline',
      intro:
        'Qué pasa cada 15 minutos, en orden: actualizar estados, leer el portal, filtrar, scrapear, guardar y analizar. Cada corrida queda registrada con su resumen.',
      nodes: {
        p1: { label: 'Disparador', sub: 'cron cada 15 min, botón «Actualizar ahora» o la API', desc: 'Un candado en memoria garantiza una sola corrida a la vez: si hay una en curso, la siguiente se saltea.' },
        p2: { label: 'Estados', sub: 'marca vencidos y archiva los viejos', desc: 'Nada se borra: los llamados con apertura pasada quedan como vencidos y, a los 120 días, archivados.' },
        p3: { label: 'RSS del portal', sub: 'publicaciones de los últimos 60 días' },
        p4: { label: 'Filtro por rubro', sub: 'palabra o frase completa, sin acentos, con exclusiones', desc: 'Primer filtro barato: solo llamados con apertura futura que mencionan el rubro. Las palabras salen del archivo de rubro.' },
        p5: { label: 'Scraper', sub: 'Puppeteer, dos páginas en paralelo', desc: 'Lo que ya se vio hoy no se vuelve a scrapear.' },
        p6: { label: 'Filtro por ítems', sub: 'si ningún ítem menciona el rubro, se descarta' },
        p7: { label: 'Guardar en PostgreSQL', sub: 'llamado, aclaraciones, adjuntos e ítems en una transacción' },
        p8: { label: 'Descarga y extracción', sub: 'pliegos a texto, con OCR para los escaneados' },
        p9: { label: 'Análisis con IA', sub: 'adjuntos pendientes, con tope por corrida' },
        p10: { label: 'Registro de la corrida', sub: 'resumen, duración y errores en la base', desc: 'El dashboard muestra el estado de la última corrida.' },
      },
      edges: {
        'p5>p6': 'detalle e ítems',
      },
      groups: { g1: '1 · LEER Y FILTRAR', g2: '2 · GUARDAR Y ANALIZAR' },
      tour: [
        'La corrida arranca por el cron, el botón o la API, siempre de a una. Primero actualiza estados: lo vencido se marca y lo viejo se archiva, sin borrar nada. Después pide el RSS de los últimos 60 días.',
        'El filtro por rubro descarta lo que no menciona las palabras del rubro o ya cerró; solo los candidatos pasan al scraper, que abre cada página con Puppeteer.',
        'Un segundo filtro mira los ítems del llamado; lo que pasa se guarda en PostgreSQL en una transacción, con sus aclaraciones y adjuntos.',
        'Por último se descargan y extraen los pliegos pendientes, la IA los analiza y la corrida queda registrada con su resumen.',
      ],
    },
    analisis: {
      name: 'El análisis con IA',
      intro:
        'Qué le pasa a cada pliego: se extrae el texto en cualquier formato, se parte en fragmentos si no entra en el contexto del modelo, se analiza y sale en un formato fijo con relevancia, confianza y datos accionables.',
      nodes: {
        pendientes: { label: 'Adjuntos pendientes', sub: 'archivos de llamados que todavía no tienen análisis', desc: 'Se procesan con un tope por corrida para que ninguna corrida se eternice.' },
        contexto: { label: 'Contexto del llamado', sub: 'título, descripción, ítems y aclaraciones', desc: 'Se agrega al prompt junto con los criterios del rubro, para que el modelo entienda el archivo dentro de su llamado.' },
        extraer: {
          label: 'Extraer texto',
          sub: 'PDF (con OCR), DOC, DOCX, RTF, ODT, planillas, ZIP y HTML',
          desc: 'pdftotext y tesseract para los escaneados, pandoc, antiword y unzip recursivo, siempre sin shell y con nombres saneados. Los pliegos de la Intendencia de Montevideo se siguen hasta los PDF reales.',
        },
        decision: { label: '¿Entra en el contexto?', sub: 'el límite se calcula a partir del contexto del modelo' },
        chunk: { label: 'Fragmentos', sub: 'con solapamiento, tamaño derivado del contexto', desc: 'Así ningún dato queda cortado entre dos fragmentos.' },
        modeloN: { label: 'IA por fragmento y síntesis', sub: 'un análisis parcial por trozo; después el modelo junta los parciales', desc: 'Al final, una pasada más sintetiza todos los parciales en un solo veredicto.' },
        modelo1: { label: 'IA, una pasada', sub: 'el pliego entra entero' },
        resultado: {
          label: 'Respuesta validada',
          sub: 'JSON Schema (Zod): relevante · confianza 0–100 · qué hacer · dónde · visita técnica · formularios',
          desc: 'El modelo está obligado a responder con ese esquema; antes de guardar se normalizan confianza, fechas y contactos.',
        },
        guardar: { label: 'Guardar análisis', sub: 'una fila por adjunto, con modelo, tokens y duración', desc: 'El dashboard lo lee a través de la vista.' },
        fallback: {
          label: 'Sin texto extraíble',
          sub: 'análisis de respaldo por los datos del llamado',
          desc: 'Si el archivo está roto o no tiene texto, igual se produce un análisis con título, descripción e ítems, con confianza acotada y marcado como tal.',
        },
      },
      edges: {
        'decision>chunk': 'no entra',
        'decision>modelo1': 'entra',
        'chunk>modeloN': 'fragmentos',
        'modeloN>resultado': 'síntesis',
        'resultado>guardar': 'una fila',
        'extraer>fallback': 'sin texto',
        'fallback>resultado': 'por metadatos',
      },
      groups: { gp: 'PREPARAR', ga: 'ANALIZAR', gr: 'RESULTADO' },
      tour: [
        'Se toman los adjuntos que todavía no tienen análisis, se agrega el contexto del llamado y se extrae el texto con la herramienta que corresponda a cada formato, con OCR para los escaneados.',
        'Si el texto no entra en el contexto del modelo, se parte en fragmentos con solapamiento, se analiza cada uno y se sintetizan los parciales. Si entra, va entero en una sola pasada.',
        'La respuesta sale con un esquema fijo: relevante o no, con qué confianza, qué hay que hacer, dónde, visita técnica y formularios. Se valida, se normaliza y se guarda una fila por adjunto.',
        'Cuando no hay texto extraíble, el análisis de respaldo usa los datos del llamado para que nada quede sin evaluar, marcado como tal.',
      ],
    },
    dashboard: {
      name: 'El dashboard y el feedback',
      intro:
        'La interfaz que ve el equipo: una API sobre una vista de la base, una bandeja de revisión en React, la ficha de cada llamado y las correcciones humanas que se convierten en métricas de la IA.',
      nodes: {
        vista: {
          label: 'Vista del dashboard',
          sub: 'llamados + análisis + feedback, con búsqueda de texto en español',
          desc: 'Una vista de PostgreSQL arma la fila completa que la interfaz muestra, para no calcular nada en el servidor web.',
        },
        api: {
          label: 'API (Express 5)',
          sub: 'llamados · detalle · feedback · métricas · corridas · salud · rubros',
          desc: 'Valida lo que entra con Zod y solo traduce entre la base y la interfaz.',
        },
        ui: {
          label: 'Bandeja de revisión',
          sub: 'React · agrupada por plazo · búsqueda, filtros y orden',
          desc: 'Cada llamado con su urgencia y la relevancia que le asignó la IA; se navega con el teclado.',
        },
        equipo: { label: 'Equipo', sub: 'revisa y decide', desc: 'Abre lo que la IA marcó relevante y confirma o corrige.' },
        ficha: {
          label: 'Ficha del llamado',
          sub: 'datos, adjuntos, análisis de la IA y la decisión humana',
          desc: 'Todo lo del llamado en un lugar: los archivos, el veredicto, la razón y la visita técnica.',
        },
        feedback: {
          label: 'Corrección humana',
          sub: 'relevante real · estado de seguimiento · comentario',
          desc: 'Se guarda junto a lo que había dicho la IA en ese momento.',
        },
        metricas: {
          label: 'Métricas de la IA',
          sub: 'matriz de confusión · precisión · recall · F1, por modelo',
          desc: 'Comparar veredicto contra realidad dice cuánto acierta cada modelo y dónde ajustar los criterios del rubro.',
        },
      },
      edges: {
        'api>vista': 'consulta',
        'api>ui': 'JSON',
        'ui>equipo': 'usa',
        'ui>ficha': 'abre un llamado',
        'ficha>feedback': 'guarda',
        'feedback>api': 'envía',
        'feedback>metricas': 'se mide',
      },
      groups: { gs: 'SERVIDOR', gu: 'INTERFAZ', gh: 'EL HUMANO CORRIGE' },
      tour: [
        'La API lee una vista de la base que ya trae el llamado con su análisis y su feedback, y se la sirve a la bandeja de revisión.',
        'El equipo ve los llamados agrupados por plazo, con su urgencia y relevancia, y abre la ficha: adjuntos, veredicto de la IA, razón y visita técnica.',
        'Desde la ficha deja su decisión: si era relevante de verdad, el estado del seguimiento y un comentario. Se guarda junto a lo que dijo la IA.',
        'Ese contraste se convierte en métricas (precisión, recall, F1 por modelo): ajustar el modelo o los criterios se decide con datos.',
      ],
    },
  },
};

const en: ProjectText = {
  header: {
    kicker: 'case study · arce tenders',
    title: 'Arce, in a diagram you can move around.',
    intro:
      'Four views of the system: the full circuit from the portal to the dashboard, one pipeline run stage by stage, how every tender document is analyzed with AI and how the team uses the dashboard and corrects the AI. Every box can be dragged; every view has a step-by-step walkthrough.',
    footNote: 'The diagram follows the code published on GitHub (the TypeScript version, October 2026). Module and table names are the real ones.',
  },
  typeNames: {
    persona: 'person',
    web: 'dashboard',
    servidor: 'service',
    datos: 'data',
    panel: 'process',
    fabrica: 'external source',
    paso: 'stage',
    calc: 'AI',
    total: 'result',
    entrada: 'input',
    gate: 'decision',
    config: 'infrastructure',
    estado: 'status',
    ok: 'status',
    bad: 'status',
  },
  views: {
    mapa: {
      name: 'Overview',
      intro:
        'From the public procurement portal to the team: a single Node.js service runs the pipeline every 15 minutes, PostgreSQL stores, an AI model analyzes the documents and the dashboard shows what matters. Everything in Docker; the AI runs on the host with Ollama or on Anthropic.',
      script: [
        'Arce monitors Uruguay’s public procurement portal and leaves the team only the tenders that matter for a given field. It was used for aluminum and is now being steered toward analyzing the history of state purchases.',
        'Every 15 minutes the service reads the portal’s RSS and filters by field; for each new candidate, Puppeteer opens the page and extracts details, attachments, clarifications and items.',
        'Everything is stored structured and deduplicated in PostgreSQL. Then the analysis module downloads the pending documents, turns them into text and sends them to the AI model.',
        'The AI answers in a fixed format: whether it is relevant, how confident, what has to be done, where, whether there is a site visit and which forms to submit. That is validated and stored next to the tender.',
        'The team opens the dashboard, reviews what was filtered and corrects the AI when it is wrong. Every correction is stored next to what the AI said and feeds the precision metrics.',
      ],
      nodes: {
        portal: {
          label: 'Public procurement portal',
          sub: 'RSS feed + a page per tender, with attached documents',
          desc: 'The source. It publishes tenders as unstructured text and files in any format.',
        },
        app: {
          label: 'Arce service (Node.js)',
          sub: 'cron every 15 min · pipeline · API · one run at a time',
          desc: 'A single TypeScript service replaced the version built on n8n and bash scripts. Configuration (field, frequency, model) is validated at startup.',
        },
        scraper: {
          label: 'Scraper (Puppeteer)',
          sub: 'opens each candidate and extracts details, attachments, clarifications and items',
          desc: 'A module of the service: one shared Chromium, two pages in parallel.',
        },
        ia: {
          label: 'AI model',
          sub: 'Ollama on the host (default) or Anthropic',
          desc: 'Both providers implement the same interface and the same response schema. Switching is an environment variable.',
        },
        analisis: {
          label: 'Document analysis',
          sub: 'downloads, extracts the text and queries the AI',
          desc: 'Processes pending attachments with a cap per run, chunks the long ones and falls back to metadata when there is no text.',
        },
        postgres: {
          label: 'PostgreSQL',
          sub: 'tenders · attachments · clarifications · items · AI analysis · feedback · runs',
          desc: 'Everything is structured, deduplicated and kept with history, with versioned migrations. A view builds what the dashboard needs, with Spanish full-text search.',
        },
        dashboard: {
          label: 'API + dashboard',
          sub: 'Express 5 · React (Vite) · review inbox and metrics',
          desc: 'The API serves the database view, stores feedback and computes the metrics; the dashboard is built and served by the same service.',
        },
        equipo: {
          label: 'Team',
          sub: 'sees what matters and corrects',
          desc: 'Stops checking the portal: opens the dashboard and acts on the filtered opportunities.',
        },
      },
      edges: {
        'portal>app': 'RSS every 15 min',
        'app>scraper': 'new candidates',
        'scraper>postgres': 'inserts, no duplicates',
        'app>analisis': 'pending attachments',
        'analisis>postgres': 'analysis',
        'analisis>ia': 'query',
        'postgres>dashboard': 'reads and stores',
        'dashboard>equipo': 'sees · corrects',
      },
      groups: { gd: 'IN DOCKER', gh: 'ON THE HOST OR IN THE CLOUD' },
      tour: [
        'Every 15 minutes the service reads the portal’s RSS, filters by field and, for each new candidate, opens the page with Puppeteer and extracts the details.',
        'What was extracted goes into PostgreSQL, deduplicated and in one transaction: the tender, its attachments, the clarifications and the items.',
        'The analysis module takes the pending attachments, turns them into text and queries the AI model: Ollama on the host or Anthropic, with the same contract.',
        'The analysis comes back to the database validated, one row per attachment, and a view joins tender, analysis and feedback for the dashboard.',
        'The team sees the relevant opportunities and corrects the AI when it is wrong; every correction is stored and feeds the metrics.',
      ],
    },
    pipeline: {
      name: 'One pipeline run',
      intro:
        'What happens every 15 minutes, in order: update statuses, read the portal, filter, scrape, store and analyze. Every run is logged with its summary.',
      nodes: {
        p1: { label: 'Trigger', sub: 'cron every 15 min, the “Update now” button or the API', desc: 'An in-memory lock guarantees a single run at a time: if one is in progress, the next is skipped.' },
        p2: { label: 'Statuses', sub: 'flags expired tenders and archives old ones', desc: 'Nothing is deleted: tenders past their opening date are flagged as expired and archived after 120 days.' },
        p3: { label: 'Portal RSS', sub: 'publications from the last 60 days' },
        p4: { label: 'Field filter', sub: 'whole word or phrase, accent-insensitive, with exclusions', desc: 'A cheap first filter: only tenders with a future opening date that mention the field. The words come from the field file.' },
        p5: { label: 'Scraper', sub: 'Puppeteer, two pages in parallel', desc: 'What was already seen today is not scraped again.' },
        p6: { label: 'Item filter', sub: 'if no item mentions the field, it is dropped' },
        p7: { label: 'Store in PostgreSQL', sub: 'tender, clarifications, attachments and items in one transaction' },
        p8: { label: 'Download and extraction', sub: 'documents to text, with OCR for scanned ones' },
        p9: { label: 'AI analysis', sub: 'pending attachments, with a cap per run' },
        p10: { label: 'Run log', sub: 'summary, duration and errors in the database', desc: 'The dashboard shows the status of the latest run.' },
      },
      edges: {
        'p5>p6': 'details and items',
      },
      groups: { g1: '1 · READ AND FILTER', g2: '2 · STORE AND ANALYZE' },
      tour: [
        'The run starts from the cron, the button or the API, always one at a time. It first updates statuses: expired tenders are flagged and old ones archived, nothing deleted. Then it requests the RSS for the last 60 days.',
        'The field filter drops whatever does not mention the field’s words or has already closed; only candidates reach the scraper, which opens each page with Puppeteer.',
        'A second filter looks at the tender items; what passes is stored in PostgreSQL in one transaction, with its clarifications and attachments.',
        'Finally the pending documents are downloaded and extracted, the AI analyzes them and the run is logged with its summary.',
      ],
    },
    analisis: {
      name: 'AI analysis',
      intro:
        'What happens to each document: the text is extracted from any format, split into chunks if it does not fit the model context, analyzed and returned in a fixed format with relevance, confidence and actionable data.',
      nodes: {
        pendientes: { label: 'Pending attachments', sub: 'files from tenders that have no analysis yet', desc: 'They are processed with a cap per run so no run drags on forever.' },
        contexto: { label: 'Tender context', sub: 'title, description, items and clarifications', desc: 'It is added to the prompt along with the field criteria, so the model understands the file within its tender.' },
        extraer: {
          label: 'Extract text',
          sub: 'PDF (with OCR), DOC, DOCX, RTF, ODT, spreadsheets, ZIP and HTML',
          desc: 'pdftotext and tesseract for scanned files, pandoc, antiword and recursive unzip, always without a shell and with sanitized names. Montevideo city hall documents are followed to the real PDFs.',
        },
        decision: { label: 'Does it fit the context?', sub: 'the limit is computed from the model context' },
        chunk: { label: 'Chunks', sub: 'overlapping, sized from the context', desc: 'That way no piece of data is cut between two chunks.' },
        modeloN: { label: 'AI per chunk and synthesis', sub: 'one partial analysis per chunk; then the model merges the partials', desc: 'At the end, one more pass synthesizes all the partials into a single verdict.' },
        modelo1: { label: 'AI, one pass', sub: 'the whole document fits' },
        resultado: {
          label: 'Validated response',
          sub: 'JSON Schema (Zod): relevant · confidence 0–100 · what to do · where · site visit · forms',
          desc: 'The model is forced to answer with that schema; before saving, confidence, dates and contacts are normalized.',
        },
        guardar: { label: 'Store analysis', sub: 'one row per attachment, with model, tokens and duration', desc: 'The dashboard reads it through the view.' },
        fallback: {
          label: 'No extractable text',
          sub: 'fallback analysis from the tender data',
          desc: 'If the file is broken or has no text, an analysis is still produced from the title, description and items, with capped confidence and flagged as such.',
        },
      },
      edges: {
        'decision>chunk': 'does not fit',
        'decision>modelo1': 'fits',
        'chunk>modeloN': 'chunks',
        'modeloN>resultado': 'synthesis',
        'resultado>guardar': 'one row',
        'extraer>fallback': 'no text',
        'fallback>resultado': 'from metadata',
      },
      groups: { gp: 'PREPARE', ga: 'ANALYZE', gr: 'RESULT' },
      tour: [
        'Attachments without an analysis are picked up, the tender context is added and the text is extracted with the right tool for each format, with OCR for scanned files.',
        'If the text does not fit the model context, it is split into overlapping chunks, each one is analyzed and the partials are synthesized. If it fits, it goes whole in a single pass.',
        'The response comes out with a fixed schema: relevant or not, how confident, what has to be done, where, site visit and forms. It is validated, normalized and stored as one row per attachment.',
        'When there is no extractable text, the fallback analysis uses the tender data so nothing goes unevaluated, flagged as such.',
      ],
    },
    dashboard: {
      name: 'Dashboard and feedback',
      intro:
        'The interface the team sees: an API on top of a database view, a React review inbox, the detail of each tender and human corrections that turn into AI metrics.',
      nodes: {
        vista: {
          label: 'Dashboard view',
          sub: 'tenders + analysis + feedback, with Spanish full-text search',
          desc: 'A PostgreSQL view builds the complete row the interface shows, so the web server computes nothing.',
        },
        api: {
          label: 'API (Express 5)',
          sub: 'tenders · detail · feedback · metrics · runs · health · fields',
          desc: 'It validates input with Zod and only translates between the database and the interface.',
        },
        ui: {
          label: 'Review inbox',
          sub: 'React · grouped by deadline · search, filters and sorting',
          desc: 'Each tender with its urgency and the relevance the AI assigned; it can be navigated with the keyboard.',
        },
        equipo: { label: 'Team', sub: 'reviews and decides', desc: 'Opens what the AI marked relevant and confirms or corrects it.' },
        ficha: {
          label: 'Tender detail',
          sub: 'data, attachments, AI analysis and the human decision',
          desc: 'Everything about the tender in one place: the files, the verdict, the reason and the site visit.',
        },
        feedback: {
          label: 'Human correction',
          sub: 'actually relevant · follow-up status · comment',
          desc: 'It is stored next to what the AI had said at that moment.',
        },
        metricas: {
          label: 'AI metrics',
          sub: 'confusion matrix · precision · recall · F1, per model',
          desc: 'Comparing verdict against reality says how often each model is right and where to tune the field criteria.',
        },
      },
      edges: {
        'api>vista': 'query',
        'api>ui': 'JSON',
        'ui>equipo': 'uses',
        'ui>ficha': 'opens a tender',
        'ficha>feedback': 'saves',
        'feedback>api': 'sends',
        'feedback>metricas': 'measured',
      },
      groups: { gs: 'SERVER', gu: 'INTERFACE', gh: 'THE HUMAN CORRECTS' },
      tour: [
        'The API reads a database view that already brings the tender with its analysis and feedback, and serves it to the review inbox.',
        'The team sees tenders grouped by deadline, with their urgency and relevance, and opens the detail: attachments, AI verdict, reason and site visit.',
        'From the detail they record their decision: whether it was really relevant, the follow-up status and a comment. It is stored next to what the AI said.',
        'That contrast turns into metrics (precision, recall, F1 per model): tuning the model or the criteria is decided with data.',
      ],
    },
  },
};

export const arce: DiagramProjectData = { id: 'arce', slug: '/arce', layout, texts: { es, en } };
