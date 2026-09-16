import { e, n, type DiagramProjectData, type ProjectText, type ViewLayout } from './types';

// Arce Licitaciones IA (repo público): cuatro vistas.

const layout: ViewLayout[] = [
  {
    // Fila de captura arriba (portal → n8n → scraper); debajo, cada pieza cae
    // recta desde la de arriba: el script bajo n8n, Postgres bajo el scraper.
    id: 'mapa',
    nodes: [
      n('portal', 'fabrica', 40, 60, 220),
      n('orq', 'servidor', 380, 60, 240),
      n('scraper', 'panel', 740, 60, 220),
      n('ollama', 'calc', 40, 340, 240),
      n('script', 'panel', 380, 340, 240),
      n('postgres', 'datos', 730, 340, 240),
      n('dashboard', 'web', 1090, 340, 240),
      n('equipo', 'persona', 1450, 340, 220),
    ],
    groups: [
      { id: 'gd', nodes: ['orq', 'scraper', 'postgres', 'script', 'dashboard'] },
      { id: 'gh', nodes: ['ollama'] },
    ],
    edges: [
      e('portal', 'orq'),
      e('orq', 'scraper'),
      e('scraper', 'postgres'),
      e('orq', 'script'),
      e('script', 'postgres', { bidir: true }),
      e('script', 'ollama', { bidir: true }),
      e('postgres', 'dashboard', { bidir: true }),
      e('dashboard', 'equipo', { bidir: true }),
    ],
    tour: [
      { nodes: ['portal', 'orq', 'scraper'], edges: ['portal>orq', 'orq>scraper'] },
      { nodes: ['scraper', 'postgres'], edges: ['scraper>postgres'] },
      { nodes: ['orq', 'script', 'ollama'], edges: ['orq>script', 'script>ollama'] },
      { nodes: ['script', 'postgres', 'dashboard'], edges: ['script>postgres', 'postgres>dashboard'] },
      { nodes: ['dashboard', 'equipo', 'postgres'], edges: ['dashboard>equipo', 'postgres>dashboard'] },
    ],
  },
  {
    // Los nodos reales del workflow, en serpentina de tres filas para que las
    // vueltas caigan rectas.
    id: 'workflow',
    nodes: [
      n('w1', 'paso', 40, 60, 200),
      n('w2', 'paso', 290, 60, 200),
      n('w3', 'paso', 540, 60, 200),
      n('w4', 'paso', 790, 60, 200),
      n('w5', 'paso', 1040, 60, 200),
      n('w6', 'gate', 1290, 60, 200),
      n('w7', 'panel', 1540, 60, 200),
      n('w8', 'paso', 1540, 320, 200),
      n('w9', 'paso', 1290, 320, 200),
      n('w10', 'datos', 1040, 320, 200),
      n('w11', 'datos', 790, 320, 200),
      n('w12', 'datos', 540, 320, 200),
      n('w13', 'datos', 290, 320, 200),
      n('w14', 'gate', 40, 320, 200),
      n('w15', 'calc', 40, 580, 200),
      n('w16', 'total', 290, 580, 200),
    ],
    groups: [
      { id: 'g1', nodes: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'] },
      { id: 'g2', nodes: ['w8', 'w9', 'w10', 'w11', 'w12', 'w13', 'w14'] },
      { id: 'g3', nodes: ['w15', 'w16'] },
    ],
    edges: [
      e('w1', 'w2'),
      e('w2', 'w3'),
      e('w3', 'w4'),
      e('w4', 'w5'),
      e('w5', 'w6'),
      e('w6', 'w7'),
      e('w7', 'w8'),
      e('w8', 'w9'),
      e('w9', 'w10'),
      e('w10', 'w11'),
      e('w11', 'w12'),
      e('w12', 'w13'),
      e('w13', 'w14'),
      e('w14', 'w15'),
      e('w15', 'w16'),
    ],
    tour: [
      { nodes: ['w1', 'w2', 'w3', 'w4', 'w5'], edges: ['w1>w2', 'w2>w3', 'w3>w4', 'w4>w5'] },
      { nodes: ['w6', 'w7', 'w8'], edges: ['w5>w6', 'w6>w7', 'w7>w8'] },
      { nodes: ['w9', 'w10', 'w11', 'w12', 'w13'], edges: ['w8>w9', 'w9>w10', 'w10>w11', 'w11>w12', 'w12>w13'] },
      { nodes: ['w14', 'w15', 'w16'], edges: ['w13>w14', 'w14>w15', 'w15>w16'] },
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
      n('ollamaN', 'calc', 1590, 60, 220),
      n('ollama1', 'calc', 1280, 300, 220),
      n('resultado', 'total', 1900, 300, 220),
      n('guardar', 'datos', 2210, 300, 220),
      n('fallback', 'gate', 660, 540, 220),
    ],
    groups: [
      { id: 'gp', nodes: ['pendientes', 'contexto', 'extraer'] },
      { id: 'ga', nodes: ['decision', 'chunk', 'ollamaN', 'ollama1'] },
      { id: 'gr', nodes: ['resultado', 'guardar'] },
    ],
    edges: [
      e('pendientes', 'contexto'),
      e('contexto', 'extraer'),
      e('extraer', 'decision'),
      e('decision', 'chunk'),
      e('decision', 'ollama1'),
      e('chunk', 'ollamaN'),
      e('ollamaN', 'resultado'),
      e('ollama1', 'resultado'),
      e('resultado', 'guardar'),
      e('extraer', 'fallback', { dashed: true }),
      e('fallback', 'resultado', { dashed: true }),
    ],
    tour: [
      { nodes: ['pendientes', 'contexto', 'extraer'], edges: ['pendientes>contexto', 'contexto>extraer'] },
      { nodes: ['decision', 'chunk', 'ollamaN', 'ollama1'], edges: ['extraer>decision', 'decision>chunk', 'chunk>ollamaN', 'decision>ollama1'] },
      { nodes: ['ollamaN', 'ollama1', 'resultado', 'guardar'], edges: ['ollamaN>resultado', 'ollama1>resultado', 'resultado>guardar'] },
      { nodes: ['extraer', 'fallback', 'resultado'], edges: ['extraer>fallback', 'fallback>resultado'] },
    ],
  },
  {
    // La API entre la vista y la interfaz; el detalle debajo de la lista; el
    // feedback vuelve a la API por una vertical limpia.
    id: 'dashboard',
    nodes: [
      n('vista', 'datos', 40, 300, 240),
      n('api', 'servidor', 380, 300, 260),
      n('ui', 'web', 740, 300, 260),
      n('equipo', 'persona', 1100, 300, 240),
      n('modal', 'web', 740, 560, 260),
      n('feedback', 'paso', 380, 560, 260),
      n('ajuste', 'gate', 40, 560, 240),
    ],
    groups: [
      { id: 'gs', nodes: ['vista', 'api'] },
      { id: 'gu', nodes: ['ui', 'modal'] },
      { id: 'gh', nodes: ['feedback', 'ajuste'] },
    ],
    edges: [
      e('api', 'vista', { bidir: true }),
      e('api', 'ui', { bidir: true }),
      e('ui', 'equipo', { bidir: true }),
      e('ui', 'modal'),
      e('modal', 'feedback'),
      e('feedback', 'api'),
      e('feedback', 'ajuste', { dashed: true }),
    ],
    tour: [
      { nodes: ['vista', 'api', 'ui'], edges: ['api>vista', 'api>ui'] },
      { nodes: ['ui', 'equipo', 'modal'], edges: ['ui>equipo', 'ui>modal'] },
      { nodes: ['modal', 'feedback', 'api'], edges: ['modal>feedback', 'feedback>api'] },
      { nodes: ['feedback', 'ajuste'], edges: ['feedback>ajuste'] },
    ],
  },
];

/* ───────────────────────────── Textos por idioma ──────────────────────────── */

const es: ProjectText = {
  header: {
    kicker: 'case study · arce licitaciones',
    title: 'Arce, en un diagrama que se puede tocar.',
    intro:
      'Cuatro vistas del sistema: el circuito completo del portal al dashboard, el workflow real de n8n, cómo se analiza cada pliego con IA local y cómo el equipo usa el dashboard y corrige a la IA. Cada caja se puede mover; cada vista tiene un recorrido explicado paso a paso.',
    footNote: 'El diagrama sigue el código publicado en GitHub. Los nombres de servicios, tablas y nodos son los reales.',
  },
  typeNames: {
    persona: 'persona',
    web: 'dashboard',
    servidor: 'orquestador',
    datos: 'datos',
    panel: 'proceso',
    fabrica: 'fuente externa',
    paso: 'nodo',
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
        'Del portal de compras estatales al equipo comercial: n8n orquesta, un scraper extrae, PostgreSQL guarda, un script analiza con un modelo local y el dashboard muestra solo lo relevante. Todo en contenedores, salvo la IA, que corre en el host.',
      script: [
        'Arce monitorea el portal de compras estatales de Uruguay y le deja al equipo comercial solo las licitaciones que importan para el rubro. Antes eran dos horas diarias revisando a mano.',
        'Cada 15 minutos n8n lee el RSS del portal; cuando aparece un llamado nuevo, un scraper con Puppeteer entra a la página y extrae detalle, adjuntos, aclaraciones e items.',
        'Todo se guarda estructurado y sin duplicados en PostgreSQL. Después un script toma los pliegos pendientes, extrae el texto en cualquier formato y se lo manda a un modelo de IA que corre en local.',
        'La IA devuelve un JSON: si es relevante, con qué confianza, por qué, y datos útiles como la visita técnica con fecha, lugar y contacto. Eso se guarda junto al llamado.',
        'El equipo abre el dashboard, ve las oportunidades ya filtradas y deja su feedback: si la IA acertó o no. Ese feedback queda guardado al lado del veredicto para ir ajustando el prompt.',
      ],
      nodes: {
        portal: {
          label: 'Portal de compras estatales',
          sub: 'feed RSS + página de cada llamado, con pliegos adjuntos',
          desc: 'La fuente. Publica los llamados como texto no estructurado y archivos en cualquier formato.',
        },
        orq: {
          label: 'n8n',
          sub: 'orquesta el flujo cada 15 minutos',
          desc: 'Coordina todo el recorrido: leer el RSS, disparar el scraper, guardar en la base y lanzar el análisis. Cambiar fuentes, reglas o frecuencia es tocar el workflow, no el código.',
        },
        scraper: {
          label: 'Scraper (Puppeteer)',
          sub: 'abre cada llamado nuevo y extrae detalle, adjuntos, aclaraciones e items',
          desc: 'Un script en Node que n8n ejecuta como comando. Devuelve JSON listo para insertar.',
        },
        ollama: {
          label: 'Ollama · IA local',
          sub: 'modelo sobre Llama 3.1 8b con un prompt especializado en el rubro',
          desc: 'Corre en el host, no en la nube: los datos no salen de la infraestructura, no hay costo por consulta ni límites de API externa.',
        },
        script: {
          label: 'Script de análisis',
          sub: 'toma los adjuntos pendientes, extrae el texto y consulta a la IA',
          desc: 'Un script de shell que corre dentro del contenedor de n8n. Procesa todo lo pendiente en una pasada, con chunking para documentos grandes y respaldo por metadatos cuando no hay texto.',
        },
        postgres: {
          label: 'PostgreSQL',
          sub: 'llamados · archivos adjuntos · aclaraciones · items · análisis IA · feedback',
          desc: 'Todo queda estructurado, deduplicado y con histórico consultable. Una vista arma lo que el dashboard necesita, con búsqueda de texto en español.',
        },
        dashboard: {
          label: 'Dashboard (Express)',
          sub: 'API + interfaz: grilla o lista, filtros, búsqueda y detalle de cada llamado',
          desc: 'Lee la vista de la base y guarda el feedback del equipo.',
        },
        equipo: {
          label: 'Equipo comercial',
          sub: 've solo lo relevante y opina',
          desc: 'Deja de revisar el portal: abre el dashboard y actúa sobre las oportunidades filtradas.',
        },
      },
      edges: {
        'portal>orq': 'RSS cada 15 min',
        'orq>scraper': 'llamados nuevos',
        'scraper>postgres': 'inserta sin duplicados',
        'orq>script': 'dispara el análisis',
        'script>postgres': 'análisis',
        'script>ollama': 'consulta',
        'postgres>dashboard': 'lee y guarda',
        'dashboard>equipo': 've · opina',
      },
      groups: { gd: 'EN CONTENEDORES DOCKER', gh: 'EN EL HOST' },
      tour: [
        'Cada 15 minutos n8n lee el RSS del portal de compras estatales y, por cada llamado nuevo, ejecuta un scraper con Puppeteer que entra a la página y extrae el detalle.',
        'Lo extraído se inserta en PostgreSQL sin duplicados: el llamado, sus adjuntos, las aclaraciones y los items.',
        'n8n dispara entonces el script de análisis, que extrae el texto de cada pliego y consulta a un modelo de IA que corre en local, en el host.',
        'El análisis vuelve a la base como una fila por adjunto, y una vista junta llamado, análisis y feedback para el dashboard.',
        'El equipo ve solo las oportunidades relevantes y deja su feedback, que queda guardado junto al veredicto de la IA para seguir afinando el prompt.',
      ],
    },
    workflow: {
      name: 'El workflow en n8n',
      intro:
        'Los nodos reales del workflow, en el orden en que corren: leer el portal, guardar en la base y lanzar el análisis. Ajustar una regla es editar un nodo.',
      nodes: {
        w1: { label: 'Disparador', sub: 'cada 15 minutos, o a mano', desc: 'El workflow arranca solo; también se puede ejecutar manualmente para reprocesar.' },
        w2: { label: 'Rango de fechas', sub: 'arma la URL del RSS con el período a consultar' },
        w3: { label: 'RSS del portal', sub: 'pide las últimas publicaciones' },
        w4: { label: 'XML → JSON', sub: 'convierte el feed' },
        w5: { label: 'Formateo', sub: 'normaliza campos y fechas' },
        w6: { label: 'Filtro de candidatos', sub: 'descarta por título lo que claramente no es del rubro', desc: 'Primer filtro barato, antes de gastar scraping y análisis.' },
        w7: { label: 'Arce Scraper', sub: 'ejecuta el script de Puppeteer por cada candidato' },
        w8: { label: 'Limpiar respuesta', sub: 'sanea el JSON que devolvió el scraper' },
        w9: { label: 'Merge', sub: 'junta llamados, adjuntos y aclaraciones' },
        w10: { label: 'Insertar llamados', sub: 'tabla llamados, sin duplicar' },
        w11: { label: 'Insertar adjuntos y aclaraciones', sub: 'expande y guarda cada archivo y cada aclaración' },
        w12: { label: 'Insertar items', sub: 'expande y guarda los items del llamado' },
        w13: { label: 'Borrar vencidos', sub: 'saca de la base los llamados ya cerrados' },
        w14: { label: 'Filtro de items por palabras clave', sub: 'decide qué llamados merecen análisis con IA', desc: 'Las palabras clave son configurables: en este caso, el rubro del aluminio y las aberturas.' },
        w15: { label: 'Ejecutar análisis IA', sub: 'corre el script de análisis como comando' },
        w16: { label: 'Parsear resultado', sub: 'lee el resumen del script y cierra la corrida' },
      },
      edges: {
        'w7>w8': 'JSON',
        'w14>w15': 'lo que interesa',
      },
      groups: { g1: '1 · LEER EL PORTAL', g2: '2 · GUARDAR EN POSTGRESQL', g3: '3 · ANALIZAR' },
      tour: [
        'Arranca solo cada 15 minutos: arma la URL con el rango de fechas, pide el RSS, lo convierte de XML a JSON y normaliza los campos.',
        'Un primer filtro por título descarta lo que claramente no es del rubro; solo los candidatos pasan por el scraper, que devuelve un JSON que se limpia.',
        'Lo extraído se junta y se inserta en PostgreSQL: llamados, adjuntos, aclaraciones e items, sin duplicados. Los llamados ya vencidos se borran.',
        'Un segundo filtro por palabras clave decide qué llamados merecen análisis; el script de IA corre como comando y el último nodo lee su resumen.',
      ],
    },
    analisis: {
      name: 'El análisis con IA',
      intro:
        'Qué le pasa a cada pliego: se extrae el texto en cualquier formato, se parte en fragmentos si es largo, se analiza con el modelo local y se sintetiza en un JSON con relevancia, confianza y datos accionables.',
      nodes: {
        pendientes: { label: 'Adjuntos pendientes', sub: 'archivos de llamados que todavía no tienen análisis', desc: 'El script consulta la base y procesa todo lo pendiente en una pasada.' },
        contexto: { label: 'Contexto del llamado', sub: 'descripción, aclaraciones e items', desc: 'Se agrega al prompt para que el modelo entienda el archivo dentro de su llamado.' },
        extraer: {
          label: 'Extraer texto',
          sub: 'PDF, DOC, DOCX, ODT, XLS, XLSX, ZIP y páginas HTML',
          desc: 'Herramientas de línea de comandos por formato: pdftotext, antiword o catdoc, pandoc, ssconvert, unzip. Los items en HTML tienen su propio extractor.',
        },
        decision: { label: '¿Más de 10.000 caracteres?', sub: 'los pliegos largos se analizan por fragmentos' },
        chunk: { label: 'Chunking', sub: 'fragmentos de unos 8.000 caracteres con solapamiento', desc: 'Así ningún dato queda cortado entre dos fragmentos.' },
        ollamaN: { label: 'Ollama por fragmento y síntesis', sub: 'un análisis parcial por trozo; después el modelo junta los parciales en un veredicto único', desc: 'Cada fragmento se manda con su número y el total, para que el modelo sepa qué parte está leyendo. Al final, una pasada más sintetiza todos los parciales.' },
        ollama1: { label: 'Ollama, una pasada', sub: 'el pliego corto se analiza entero' },
        resultado: {
          label: 'Resultado JSON',
          sub: 'relevante · confianza 0–100 · razón · resumen · ubicación · visita técnica (fecha, lugar, contacto) · materiales · formularios',
          desc: 'Un veredicto explicable: además de sí o no, por qué, y los datos que el comercial necesita para actuar.',
        },
        guardar: { label: 'Guardar análisis', sub: 'una fila por adjunto en la tabla de análisis', desc: 'El dashboard lo lee a través de la vista.' },
        fallback: {
          label: 'Sin texto extraíble',
          sub: 'análisis de respaldo por metadatos',
          desc: 'Si el archivo está escaneado, roto o en un formato raro, igual se produce un análisis con el título, la descripción y los items, marcado como tal.',
        },
      },
      edges: {
        'decision>chunk': 'sí',
        'decision>ollama1': 'no',
        'chunk>ollamaN': 'fragmentos',
        'ollamaN>resultado': 'síntesis',
        'resultado>guardar': 'una fila',
        'extraer>fallback': 'sin texto',
        'fallback>resultado': 'por metadatos',
      },
      groups: { gp: 'PREPARAR', ga: 'ANALIZAR', gr: 'RESULTADO' },
      tour: [
        'El script toma los adjuntos que todavía no tienen análisis, agrega el contexto del llamado y extrae el texto con la herramienta que corresponda a cada formato.',
        'Si el texto pasa de 10.000 caracteres se parte en fragmentos con solapamiento; cada uno se analiza por separado y el modelo sintetiza los parciales. Si es corto, va entero en una sola pasada.',
        'El resultado es un JSON explicable: relevante o no, con qué confianza y por qué, más resumen, ubicación, visita técnica con fecha, lugar y contacto, materiales y formularios. Se guarda una fila por adjunto.',
        'Cuando no hay texto extraíble, el análisis de respaldo usa los metadatos del llamado para que nada quede sin evaluar, marcado como tal.',
      ],
    },
    dashboard: {
      name: 'El dashboard y el feedback',
      intro:
        'La interfaz que ve el equipo: una API sobre una vista de la base, filtros y búsqueda, el detalle de cada llamado y el feedback humano que queda guardado junto al veredicto de la IA.',
      nodes: {
        vista: {
          label: 'Vista del dashboard',
          sub: 'llamados + análisis + feedback, con búsqueda de texto en español',
          desc: 'Una vista de PostgreSQL arma la fila completa que la interfaz muestra, para no calcular nada en el servidor web.',
        },
        api: {
          label: 'API (Express)',
          sub: 'lista con filtros y búsqueda · detalle de un llamado · guardar feedback',
          desc: 'Tres rutas: la lista, el detalle y el feedback. El servidor solo traduce entre la vista y la interfaz.',
        },
        ui: {
          label: 'Interfaz',
          sub: 'grilla o lista · filtros por relevancia y estado · búsqueda',
          desc: 'Cada llamado muestra su urgencia y el score de relevancia que le asignó la IA.',
        },
        equipo: { label: 'Equipo comercial', sub: 'revisa y decide', desc: 'Abre solo lo que la IA marcó relevante y confirma o corrige.' },
        modal: {
          label: 'Detalle del llamado',
          sub: 'datos estructurados, adjuntos, análisis de la IA y feedback',
          desc: 'Todo lo del llamado en un lugar: los archivos, el veredicto, la razón y la visita técnica.',
        },
        feedback: {
          label: 'Feedback humano',
          sub: 'relevante real · estado de seguimiento · comentario',
          desc: 'Se guarda junto al veredicto y la confianza que dio la IA en ese momento. Una fila por llamado, que se actualiza.',
        },
        ajuste: { label: 'Ajustar el prompt', sub: 'el feedback dice dónde se equivocó la IA', desc: 'Comparar veredicto contra realidad es la base para afinar el modelo y las palabras clave.' },
      },
      edges: {
        'api>vista': 'consulta',
        'api>ui': 'JSON',
        'ui>equipo': 'usa',
        'ui>modal': 'abre un llamado',
        'modal>feedback': 'guarda',
        'feedback>api': 'envía',
        'feedback>ajuste': 'qué corregir',
      },
      groups: { gs: 'SERVIDOR', gu: 'INTERFAZ', gh: 'EL HUMANO CORRIGE' },
      tour: [
        'La API lee una vista de la base que ya trae el llamado con su análisis y su feedback, y se la sirve a la interfaz con filtros y búsqueda.',
        'El equipo ve una grilla o lista con la urgencia y el score de cada llamado, y abre el detalle: adjuntos, veredicto de la IA, razón y visita técnica.',
        'Desde el detalle deja su feedback: si era relevante de verdad, en qué estado está el seguimiento y un comentario. Se guarda junto a lo que dijo la IA.',
        'Ese contraste entre veredicto y realidad es lo que permite ajustar el prompt y las palabras clave con datos, no con impresiones.',
      ],
    },
  },
};

const en: ProjectText = {
  header: {
    kicker: 'case study · arce tenders',
    title: 'Arce, in a diagram you can move around.',
    intro:
      'Four views of the system: the full circuit from the portal to the dashboard, the real n8n workflow, how every tender document is analyzed with local AI and how the team uses the dashboard and corrects the AI. Every box can be dragged; every view has a step-by-step walkthrough.',
    footNote: 'The diagram follows the code published on GitHub. Service, table and node names are the real ones.',
  },
  typeNames: {
    persona: 'person',
    web: 'dashboard',
    servidor: 'orchestrator',
    datos: 'data',
    panel: 'process',
    fabrica: 'external source',
    paso: 'node',
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
        'From the public procurement portal to the sales team: n8n orchestrates, a scraper extracts, PostgreSQL stores, a script analyzes with a local model and the dashboard shows only what matters. Everything in containers, except the AI, which runs on the host.',
      script: [
        'Arce monitors Uruguay’s public procurement portal and leaves the sales team only the tenders that matter for the trade. It used to be two hours a day of manual checking.',
        'Every 15 minutes n8n reads the portal’s RSS; when a new tender appears, a Puppeteer scraper opens the page and extracts details, attachments, clarifications and items.',
        'Everything is stored structured and deduplicated in PostgreSQL. Then a script takes the pending documents, extracts the text from any format and sends it to an AI model running locally.',
        'The AI returns a JSON: whether it is relevant, how confident, why, and useful data such as the site visit with date, place and contact. That is stored next to the tender.',
        'The team opens the dashboard, sees the opportunities already filtered and leaves feedback: whether the AI got it right. That feedback is stored next to the verdict to keep tuning the prompt.',
      ],
      nodes: {
        portal: {
          label: 'Public procurement portal',
          sub: 'RSS feed + a page per tender, with attached documents',
          desc: 'The source. It publishes tenders as unstructured text and files in any format.',
        },
        orq: {
          label: 'n8n',
          sub: 'orchestrates the flow every 15 minutes',
          desc: 'Coordinates the whole run: read the RSS, trigger the scraper, store in the database and launch the analysis. Changing sources, rules or frequency means editing the workflow, not the code.',
        },
        scraper: {
          label: 'Scraper (Puppeteer)',
          sub: 'opens each new tender and extracts details, attachments, clarifications and items',
          desc: 'A Node script that n8n runs as a command. It returns JSON ready to insert.',
        },
        ollama: {
          label: 'Ollama · local AI',
          sub: 'model based on Llama 3.1 8b with a prompt specialized in the trade',
          desc: 'Runs on the host, not in the cloud: data stays inside the infrastructure, with no per-call cost and no external API limits.',
        },
        script: {
          label: 'Analysis script',
          sub: 'takes pending attachments, extracts the text and queries the AI',
          desc: 'A shell script that runs inside the n8n container. It processes everything pending in one pass, chunking large documents and falling back to metadata when there is no text.',
        },
        postgres: {
          label: 'PostgreSQL',
          sub: 'tenders · attachments · clarifications · items · AI analysis · feedback',
          desc: 'Everything stays structured, deduplicated and with a queryable history. A view assembles what the dashboard needs, with Spanish full-text search.',
        },
        dashboard: {
          label: 'Dashboard (Express)',
          sub: 'API + interface: grid or list, filters, search and each tender’s detail',
          desc: 'Reads the database view and stores the team’s feedback.',
        },
        equipo: {
          label: 'Sales team',
          sub: 'sees only what matters and weighs in',
          desc: 'Stops checking the portal: opens the dashboard and acts on the filtered opportunities.',
        },
      },
      edges: {
        'portal>orq': 'RSS every 15 min',
        'orq>scraper': 'new tenders',
        'scraper>postgres': 'inserts, deduplicated',
        'orq>script': 'triggers the analysis',
        'script>postgres': 'analysis',
        'script>ollama': 'queries',
        'postgres>dashboard': 'reads and stores',
        'dashboard>equipo': 'sees · weighs in',
      },
      groups: { gd: 'IN DOCKER CONTAINERS', gh: 'ON THE HOST' },
      tour: [
        'Every 15 minutes n8n reads the procurement portal’s RSS and, for each new tender, runs a Puppeteer scraper that opens the page and extracts the details.',
        'What is extracted is inserted into PostgreSQL without duplicates: the tender, its attachments, the clarifications and the items.',
        'n8n then triggers the analysis script, which extracts the text of each document and queries an AI model running locally, on the host.',
        'The analysis goes back to the database as one row per attachment, and a view joins tender, analysis and feedback for the dashboard.',
        'The team sees only the relevant opportunities and leaves feedback, stored next to the AI’s verdict to keep refining the prompt.',
      ],
    },
    workflow: {
      name: 'The n8n workflow',
      intro:
        'The workflow’s real nodes, in the order they run: read the portal, store in the database and launch the analysis. Adjusting a rule means editing a node.',
      nodes: {
        w1: { label: 'Trigger', sub: 'every 15 minutes, or by hand', desc: 'The workflow starts on its own; it can also be run manually to reprocess.' },
        w2: { label: 'Date range', sub: 'builds the RSS URL with the period to query' },
        w3: { label: 'Portal RSS', sub: 'requests the latest publications' },
        w4: { label: 'XML → JSON', sub: 'converts the feed' },
        w5: { label: 'Formatting', sub: 'normalizes fields and dates' },
        w6: { label: 'Candidate filter', sub: 'drops by title what is clearly not in the trade', desc: 'A first cheap filter, before spending scraping and analysis.' },
        w7: { label: 'Arce Scraper', sub: 'runs the Puppeteer script for each candidate' },
        w8: { label: 'Clean response', sub: 'sanitizes the JSON the scraper returned' },
        w9: { label: 'Merge', sub: 'joins tenders, attachments and clarifications' },
        w10: { label: 'Insert tenders', sub: 'tenders table, without duplicates' },
        w11: { label: 'Insert attachments and clarifications', sub: 'expands and stores each file and each clarification' },
        w12: { label: 'Insert items', sub: 'expands and stores the tender’s items' },
        w13: { label: 'Delete expired', sub: 'removes already-closed tenders from the database' },
        w14: { label: 'Keyword filter on items', sub: 'decides which tenders deserve AI analysis', desc: 'The keywords are configurable: in this case, the aluminum and joinery trade.' },
        w15: { label: 'Run AI analysis', sub: 'runs the analysis script as a command' },
        w16: { label: 'Parse result', sub: 'reads the script’s summary and closes the run' },
      },
      edges: {
        'w7>w8': 'JSON',
        'w14>w15': 'what matters',
      },
      groups: { g1: '1 · READ THE PORTAL', g2: '2 · STORE IN POSTGRESQL', g3: '3 · ANALYZE' },
      tour: [
        'It starts on its own every 15 minutes: builds the URL with the date range, requests the RSS, converts it from XML to JSON and normalizes the fields.',
        'A first filter by title drops what is clearly not in the trade; only the candidates go through the scraper, which returns a JSON that gets cleaned.',
        'What is extracted is merged and inserted into PostgreSQL: tenders, attachments, clarifications and items, without duplicates. Expired tenders are deleted.',
        'A second filter by keywords decides which tenders deserve analysis; the AI script runs as a command and the last node reads its summary.',
      ],
    },
    analisis: {
      name: 'The AI analysis',
      intro:
        'What happens to each tender document: the text is extracted from any format, split into chunks if long, analyzed with the local model and synthesized into a JSON with relevance, confidence and actionable data.',
      nodes: {
        pendientes: { label: 'Pending attachments', sub: 'tender files that have no analysis yet', desc: 'The script queries the database and processes everything pending in one pass.' },
        contexto: { label: 'Tender context', sub: 'description, clarifications and items', desc: 'Added to the prompt so the model understands the file within its tender.' },
        extraer: {
          label: 'Extract text',
          sub: 'PDF, DOC, DOCX, ODT, XLS, XLSX, ZIP and HTML pages',
          desc: 'Command-line tools per format: pdftotext, antiword or catdoc, pandoc, ssconvert, unzip. HTML items have their own extractor.',
        },
        decision: { label: 'More than 10,000 characters?', sub: 'long documents are analyzed in chunks' },
        chunk: { label: 'Chunking', sub: 'chunks of about 8,000 characters with overlap', desc: 'So no piece of data is cut between two chunks.' },
        ollamaN: { label: 'Ollama per chunk and synthesis', sub: 'one partial analysis per piece; then the model merges the partials into a single verdict', desc: 'Each chunk is sent with its number and the total, so the model knows which part it is reading. A final pass synthesizes all the partials.' },
        ollama1: { label: 'Ollama, one pass', sub: 'a short document is analyzed whole' },
        resultado: {
          label: 'JSON result',
          sub: 'relevant · confidence 0–100 · reason · summary · location · site visit (date, place, contact) · materials · forms',
          desc: 'An explainable verdict: besides yes or no, why, and the data the salesperson needs to act.',
        },
        guardar: { label: 'Store analysis', sub: 'one row per attachment in the analysis table', desc: 'The dashboard reads it through the view.' },
        fallback: {
          label: 'No extractable text',
          sub: 'fallback analysis from metadata',
          desc: 'If the file is scanned, broken or in an odd format, an analysis is still produced from the title, description and items, flagged as such.',
        },
      },
      edges: {
        'decision>chunk': 'yes',
        'decision>ollama1': 'no',
        'chunk>ollamaN': 'chunks',
        'ollamaN>resultado': 'synthesis',
        'resultado>guardar': 'one row',
        'extraer>fallback': 'no text',
        'fallback>resultado': 'from metadata',
      },
      groups: { gp: 'PREPARE', ga: 'ANALYZE', gr: 'RESULT' },
      tour: [
        'The script takes the attachments that have no analysis yet, adds the tender’s context and extracts the text with the tool that matches each format.',
        'If the text exceeds 10,000 characters it is split into overlapping chunks; each one is analyzed separately and the model synthesizes the partials. If it is short, it goes whole in one pass.',
        'The result is an explainable JSON: relevant or not, how confident and why, plus summary, location, site visit with date, place and contact, materials and forms. One row per attachment is stored.',
        'When there is no extractable text, the fallback analysis uses the tender’s metadata so nothing goes unevaluated, flagged as such.',
      ],
    },
    dashboard: {
      name: 'The dashboard and the feedback',
      intro:
        'The interface the team sees: an API over a database view, filters and search, each tender’s detail and the human feedback stored next to the AI’s verdict.',
      nodes: {
        vista: {
          label: 'Dashboard view',
          sub: 'tenders + analysis + feedback, with Spanish full-text search',
          desc: 'A PostgreSQL view assembles the full row the interface shows, so nothing is computed on the web server.',
        },
        api: {
          label: 'API (Express)',
          sub: 'list with filters and search · one tender’s detail · save feedback',
          desc: 'Three routes: the list, the detail and the feedback. The server only translates between the view and the interface.',
        },
        ui: {
          label: 'Interface',
          sub: 'grid or list · filters by relevance and status · search',
          desc: 'Each tender shows its urgency and the relevance score the AI assigned.',
        },
        equipo: { label: 'Sales team', sub: 'reviews and decides', desc: 'Opens only what the AI flagged as relevant and confirms or corrects.' },
        modal: {
          label: 'Tender detail',
          sub: 'structured data, attachments, AI analysis and feedback',
          desc: 'Everything about the tender in one place: the files, the verdict, the reason and the site visit.',
        },
        feedback: {
          label: 'Human feedback',
          sub: 'actually relevant · follow-up status · comment',
          desc: 'Stored next to the verdict and confidence the AI gave at the time. One row per tender, updated in place.',
        },
        ajuste: { label: 'Tune the prompt', sub: 'the feedback says where the AI went wrong', desc: 'Comparing verdict against reality is the basis for refining the model and the keywords.' },
      },
      edges: {
        'api>vista': 'queries',
        'api>ui': 'JSON',
        'ui>equipo': 'uses',
        'ui>modal': 'opens a tender',
        'modal>feedback': 'saves',
        'feedback>api': 'sends',
        'feedback>ajuste': 'what to fix',
      },
      groups: { gs: 'SERVER', gu: 'INTERFACE', gh: 'THE HUMAN CORRECTS' },
      tour: [
        'The API reads a database view that already brings the tender with its analysis and its feedback, and serves it to the interface with filters and search.',
        'The team sees a grid or list with each tender’s urgency and score, and opens the detail: attachments, the AI’s verdict, reason and site visit.',
        'From the detail they leave feedback: whether it was actually relevant, what the follow-up status is and a comment. It is stored next to what the AI said.',
        'That contrast between verdict and reality is what allows tuning the prompt and the keywords with data, not impressions.',
      ],
    },
  },
};

export const arce: DiagramProjectData = { id: 'arce', slug: '/arce', layout, texts: { es, en } };
