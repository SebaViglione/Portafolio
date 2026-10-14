import { e, n, type DiagramProjectData, type ProjectText, type ViewLayout } from './types';

// Arce Licitaciones IA (repo público): cuatro vistas. Desde el 14 de octubre de 2026
// el foco es el módulo de mercado (app/src/mercado): ingesta del histórico de ARCE
// por API, estadísticas en vistas materializadas y un analista de IA que las lee.
// El monitor del rubro (pipeline RSS → IA → bandeja) sigue en el mismo servicio y
// solo aparece en el mapa general.

const layout: ViewLayout[] = [
  {
    // Arriba, el camino del dato (portal → scraper → ingesta → base → vistas → IA);
    // abajo, lo que ve la gente: el tablero, centrado bajo vistas e IA, recibe las
    // estadísticas y los informes, y el monitor del rubro entra por la izquierda.
    id: 'mapa',
    nodes: [
      n('portal', 'fabrica', 40, 60, 220),
      n('scraper', 'estado', 360, 60, 220),
      n('ingesta', 'servidor', 680, 60, 240),
      n('postgres', 'datos', 1020, 60, 240),
      n('vistas', 'panel', 1360, 60, 240),
      n('analista', 'calc', 1700, 60, 240),
      n('monitor', 'paso', 40, 360, 220),
      n('tablero', 'web', 1530, 360, 240),
      n('direccion', 'persona', 1870, 360, 240),
    ],
    groups: [
      { id: 'gf', nodes: ['portal', 'scraper'] },
      { id: 'gm', nodes: ['ingesta', 'postgres', 'vistas', 'analista'] },
    ],
    edges: [
      e('portal', 'scraper'),
      e('scraper', 'ingesta'),
      e('ingesta', 'postgres'),
      e('postgres', 'vistas'),
      e('vistas', 'analista'),
      e('vistas', 'tablero'),
      e('analista', 'tablero'),
      e('tablero', 'direccion', { bidir: true }),
      e('portal', 'monitor', { dashed: true }),
      e('monitor', 'tablero', { dashed: true }),
    ],
    tour: [
      { nodes: ['portal', 'scraper', 'ingesta'], edges: ['portal>scraper', 'scraper>ingesta'] },
      { nodes: ['ingesta', 'postgres'], edges: ['ingesta>postgres'] },
      { nodes: ['postgres', 'vistas', 'tablero'], edges: ['postgres>vistas', 'vistas>tablero'] },
      { nodes: ['vistas', 'analista', 'tablero', 'direccion'], edges: ['vistas>analista', 'analista>tablero', 'tablero>direccion'] },
      { nodes: ['portal', 'monitor', 'tablero'], edges: ['portal>monitor', 'monitor>tablero'] },
    ],
  },
  {
    // Un lote, de izquierda a derecha. Los desvíos (rechazo, sin cambios) caen
    // por debajo de la decisión que los produce; el reproceso entra desde arriba.
    id: 'ingesta',
    nodes: [
      n('lote', 'entrada', 40, 300, 220),
      n('contrato', 'gate', 350, 300, 220),
      n('crudo', 'datos', 660, 300, 220),
      n('hash', 'gate', 970, 300, 220),
      n('normalizar', 'panel', 1280, 300, 240),
      n('tablas', 'datos', 1610, 300, 240),
      n('rechazo', 'bad', 350, 560, 220),
      n('igual', 'ok', 970, 560, 220),
      n('reproceso', 'paso', 1280, 60, 240),
      n('refresco', 'total', 1940, 300, 220),
    ],
    groups: [
      { id: 'gv', nodes: ['lote', 'contrato'] },
      { id: 'gc', nodes: ['crudo', 'hash'] },
      { id: 'gn', nodes: ['normalizar', 'tablas'] },
    ],
    edges: [
      e('lote', 'contrato'),
      e('contrato', 'crudo'),
      e('crudo', 'hash'),
      e('hash', 'normalizar'),
      e('normalizar', 'tablas'),
      e('tablas', 'refresco'),
      e('contrato', 'rechazo', { dashed: true }),
      e('hash', 'igual', { dashed: true }),
      e('reproceso', 'normalizar', { dashed: true }),
    ],
    tour: [
      { nodes: ['lote', 'contrato', 'rechazo'], edges: ['lote>contrato', 'contrato>rechazo'] },
      { nodes: ['contrato', 'crudo', 'hash', 'igual'], edges: ['contrato>crudo', 'crudo>hash', 'hash>igual'] },
      { nodes: ['hash', 'normalizar', 'tablas'], edges: ['hash>normalizar', 'normalizar>tablas'] },
      { nodes: ['tablas', 'refresco', 'reproceso', 'normalizar'], edges: ['tablas>refresco', 'reproceso>normalizar'] },
    ],
  },
  {
    // De las tablas a las respuestas: reglas → hechos → tres preguntas en columna
    // → tablero. Lo que queda afuera cae debajo de las reglas.
    id: 'estadisticas',
    nodes: [
      n('tablas', 'datos', 40, 300, 220),
      n('reglas', 'gate', 350, 300, 240),
      n('afuera', 'bad', 350, 560, 240),
      n('hechos', 'datos', 690, 300, 240),
      n('refresco', 'paso', 690, 60, 240),
      n('precio', 'total', 1030, 60, 240),
      n('oportunidad', 'total', 1030, 300, 240),
      n('competencia', 'total', 1030, 540, 240),
      n('tablero', 'web', 1370, 300, 240),
    ],
    groups: [
      { id: 'gr', nodes: ['reglas', 'afuera'] },
      { id: 'gh', nodes: ['refresco', 'hechos'] },
      { id: 'go', nodes: ['precio', 'oportunidad', 'competencia'] },
    ],
    edges: [
      e('tablas', 'reglas'),
      e('reglas', 'hechos'),
      e('reglas', 'afuera', { dashed: true }),
      e('refresco', 'hechos'),
      e('hechos', 'precio'),
      e('hechos', 'oportunidad'),
      e('hechos', 'competencia'),
      e('precio', 'tablero'),
      e('oportunidad', 'tablero'),
      e('competencia', 'tablero'),
    ],
    tour: [
      { nodes: ['tablas', 'reglas', 'afuera'], edges: ['tablas>reglas', 'reglas>afuera'] },
      { nodes: ['reglas', 'hechos', 'refresco'], edges: ['reglas>hechos', 'refresco>hechos'] },
      { nodes: ['hechos', 'oportunidad', 'precio', 'competencia'], edges: ['hechos>oportunidad', 'hechos>precio', 'hechos>competencia'] },
      { nodes: ['precio', 'oportunidad', 'competencia', 'tablero'], edges: ['precio>tablero', 'oportunidad>tablero', 'competencia>tablero'] },
    ],
  },
  {
    // El pedido entra desde arriba al paquete; la cadena paquete → modelo →
    // controles → guardado corre en una fila; lo descartado cae debajo del control.
    id: 'analista',
    nodes: [
      n('pedido', 'persona', 350, 60, 240),
      n('cifras', 'datos', 40, 300, 220),
      n('paquete', 'panel', 350, 300, 240),
      n('modelo', 'calc', 690, 300, 240),
      n('esquema', 'gate', 1030, 300, 240),
      n('verificar', 'gate', 1370, 300, 240),
      n('descarte', 'bad', 1370, 560, 240),
      n('guardar', 'datos', 1710, 300, 240),
      n('tablero', 'web', 1710, 60, 240),
    ],
    groups: [
      { id: 'ga', nodes: ['cifras', 'paquete'] },
      { id: 'gc', nodes: ['esquema', 'verificar', 'descarte'] },
    ],
    edges: [
      e('pedido', 'paquete'),
      e('cifras', 'paquete'),
      e('paquete', 'modelo'),
      e('modelo', 'esquema'),
      e('esquema', 'verificar'),
      e('verificar', 'descarte', { dashed: true }),
      e('verificar', 'guardar'),
      e('guardar', 'tablero'),
    ],
    tour: [
      { nodes: ['pedido', 'cifras', 'paquete'], edges: ['pedido>paquete', 'cifras>paquete'] },
      { nodes: ['paquete', 'modelo', 'esquema'], edges: ['paquete>modelo', 'modelo>esquema'] },
      { nodes: ['esquema', 'verificar', 'descarte'], edges: ['esquema>verificar', 'verificar>descarte'] },
      { nodes: ['verificar', 'guardar', 'tablero'], edges: ['verificar>guardar', 'guardar>tablero'] },
    ],
  },
];

/* ───────────────────────────── Textos por idioma ──────────────────────────── */

const es: ProjectText = {
  header: {
    kicker: 'case study · arce licitaciones',
    title: 'Arce, en un diagrama que se puede tocar.',
    intro:
      'Cuatro vistas del sistema: el circuito completo del portal al tablero, cómo entra y se normaliza un lote del histórico, cómo una adjudicación se vuelve estadística y cómo la IA escribe el análisis sin inventar cifras. Cada caja se puede mover; cada vista tiene un recorrido explicado paso a paso.',
    footNote: 'El diagrama sigue el código publicado en GitHub (módulo de mercado, octubre de 2026). Los módulos y las reglas son los reales.',
  },
  typeNames: {
    persona: 'persona',
    web: 'tablero',
    servidor: 'servicio',
    datos: 'datos',
    panel: 'proceso',
    fabrica: 'fuente externa',
    paso: 'etapa',
    calc: 'IA',
    total: 'resultado',
    entrada: 'entrada',
    gate: 'control',
    config: 'infraestructura',
    estado: 'pendiente',
    ok: 'sin cambios',
    bad: 'descartado',
  },
  views: {
    mapa: {
      name: 'Mapa general',
      intro:
        'Del portal de compras estatales a la dirección: el histórico entra por una API, se normaliza en PostgreSQL, las estadísticas se precalculan y una IA las lee para escribir el análisis. Todo en un servicio en Docker; la IA corre con Ollama o Anthropic.',
      script: [
        'Arce responde una pregunta de la dirección: qué conviene venderle al Estado, a qué precio y contra quién. Para eso usa todo el histórico de compras estatales de Uruguay, no solo los llamados abiertos.',
        'Un scraper aparte, todavía pendiente, va a recorrer el portal y mandar los llamados por lotes a una API. El sistema ya está listo para recibirlos.',
        'La API valida cada llamado, guarda el crudo y lo normaliza: proveedores por RUT, artículos por código, monedas y unidades en un mismo canon.',
        'Sobre eso, PostgreSQL precalcula las estadísticas: qué vender, a qué precio, quién gana y quién compra. Una IA lee esas cifras y escribe el informe, sin calcular nada por su cuenta.',
        'La etapa anterior sigue funcionando en el mismo servicio: el monitor que filtra los llamados abiertos del rubro y los deja en una bandeja de revisión.',
      ],
      nodes: {
        portal: {
          label: 'Portal de compras estatales',
          sub: 'ARCE: llamados, ofertas y adjudicaciones de todo el Estado',
          desc: 'La fuente. Publica cada llamado con sus ítems y, cuando se adjudica, a quién y a qué precio.',
        },
        scraper: {
          label: 'Scraper del histórico',
          sub: 'servicio aparte · todavía pendiente',
          desc: 'Va a recorrer el portal y mandar los llamados por lotes, siguiendo el contrato que publica la API. Mientras tanto, un generador de datos sintéticos usa la misma puerta.',
        },
        ingesta: {
          label: 'API de ingesta',
          sub: 'token · contrato en Zod · crudo con hash',
          desc: 'Valida cada llamado, lo guarda tal cual llegó y lo normaliza en una transacción. Lo repetido no se reprocesa.',
        },
        postgres: {
          label: 'PostgreSQL (esquema mercado)',
          sub: 'organismos · proveedores · artículos · llamados · ítems · ofertas · adjudicaciones · cotizaciones',
          desc: 'Los datos normalizados: proveedores por RUT, artículos por código del catálogo, monedas y unidades en un canon.',
        },
        vistas: {
          label: 'Estadísticas',
          sub: '8 vistas materializadas',
          desc: 'Se recalculan solas un minuto después del último lote, todas las noches y a pedido, sin bloquear el tablero.',
        },
        analista: {
          label: 'Analista de IA',
          sub: 'Ollama o Anthropic · lee cifras, no las calcula',
          desc: 'Recibe un paquete con las estadísticas ya hechas y escribe el informe, el veredicto por producto o la respuesta a una pregunta.',
        },
        monitor: {
          label: 'Monitor del rubro',
          sub: 'la primera etapa · RSS cada 15 min · pliegos analizados con IA',
          desc: 'Filtra los llamados abiertos de un rubro y los deja en una bandeja de revisión. Sigue funcionando en el mismo servicio.',
        },
        tablero: {
          label: 'Tablero (React)',
          sub: 'qué vender · productos · competidores · compradores',
          desc: 'Filtros por período y categoría, fichas por producto y proveedor, y la cobertura de los datos a la vista.',
        },
        direccion: {
          label: 'Dirección',
          sub: 'decide qué vender y a qué precio',
          desc: 'Lee el tablero y el informe, y le hace preguntas libres a la IA.',
        },
      },
      edges: {
        'portal>scraper': 'recorre',
        'scraper>ingesta': 'lotes por API',
        'ingesta>postgres': 'normaliza',
        'postgres>vistas': 'precalcula',
        'vistas>analista': 'cifras',
        'vistas>tablero': 'estadísticas',
        'analista>tablero': 'informes',
        'tablero>direccion': 'consulta · pregunta',
        'portal>monitor': 'RSS',
        'monitor>tablero': 'bandeja de revisión',
      },
      groups: { gf: 'FUERA DEL SISTEMA', gm: 'MÓDULO DE MERCADO' },
      tour: [
        'El scraper del histórico, un servicio aparte que todavía falta, va a recorrer el portal y mandar los llamados por lotes a la API de ingesta.',
        'La ingesta valida cada llamado contra el contrato, guarda el crudo y lo normaliza en PostgreSQL.',
        'Con los datos normalizados, ocho vistas materializadas precalculan lo que muestra el tablero: qué vender, a qué precio, quién gana y quién compra.',
        'El analista de IA lee esas cifras y escribe el informe para la dirección, que también le puede hacer preguntas libres desde el tablero.',
        'La primera etapa sigue en el mismo servicio: el monitor del rubro lee el RSS del portal y deja los llamados abiertos en una bandeja de revisión.',
      ],
    },
    ingesta: {
      name: 'La ingesta de un lote',
      intro:
        'Qué pasa cuando llega un lote del histórico: se valida cada llamado por separado, se guarda el crudo con un hash, se normaliza y se dispara el recálculo de las estadísticas.',
      nodes: {
        lote: { label: 'Lote de llamados', sub: 'hasta 500 por envío, con token', desc: 'Cada llamado viaja entero: ítems, ofertas y adjudicaciones juntos.' },
        contrato: {
          label: 'Contrato (Zod)',
          sub: 'tolerante con el formato, estricto con la estructura',
          desc: 'Acepta números con coma, fechas dd/mm/aaaa y la moneda como aparece en el portal. Un ítem sin número o una adjudicación sin proveedor no pasa.',
        },
        rechazo: { label: 'Llamado rechazado', sub: 'con el detalle del error', desc: 'Se rechaza ese llamado, no el lote entero. El scraper recibe qué falló y dónde.' },
        crudo: { label: 'Crudo', sub: 'el JSON tal cual llegó, con un hash de su contenido', desc: 'Es la fuente de verdad: todo lo demás se puede reconstruir desde acá.' },
        hash: { label: '¿Contenido nuevo?', sub: 'se compara el hash con la versión anterior' },
        igual: { label: 'Sin cambios', sub: 'no se reprocesa', desc: 'Reenviar un lote no duplica nada.' },
        normalizar: {
          label: 'Normalizar',
          sub: 'RUT · artículos · organismos · monedas · unidades · estados',
          desc: 'Un proveedor que llegó solo con nombre se fusiona cuando aparece su RUT. Un llamado que cambió reemplaza a sus hijos en una transacción.',
        },
        tablas: { label: 'Tablas normalizadas', sub: 'llamados, ítems, ofertas, adjudicaciones' },
        reproceso: {
          label: 'Reprocesar',
          sub: 'desde los crudos, a pedido',
          desc: 'Si cambian las reglas de normalización, se recalcula todo sin volver a pedirle nada al scraper.',
        },
        refresco: { label: 'Recálculo programado', sub: 'un minuto después del último lote', desc: 'Si llegan varios lotes seguidos, se recalcula una sola vez al final.' },
      },
      edges: {
        'lote>contrato': 'cada llamado',
        'contrato>crudo': 'válido',
        'contrato>rechazo': 'inválido',
        'hash>normalizar': 'nuevo o cambió',
        'hash>igual': 'igual',
        'reproceso>normalizar': 'reglas nuevas',
        'tablas>refresco': 'dispara',
      },
      groups: { gv: 'VALIDAR', gc: 'GUARDAR EL CRUDO', gn: 'NORMALIZAR' },
      tour: [
        'Llega un lote con token. Cada llamado se valida por separado contra el contrato: el formato se tolera, la estructura no. Un llamado inválido se rechaza con el detalle, sin tirar el resto.',
        'Lo válido se guarda tal cual llegó, con un hash de su contenido. Si el hash es el mismo que la última vez, no se hace nada más.',
        'Si es nuevo o cambió (por ejemplo, pasó de publicado a adjudicado), se normaliza y reemplaza a la versión anterior dentro de una transacción.',
        'Al final se programa el recálculo de las estadísticas. Y como el crudo queda guardado, cualquier cambio en las reglas se aplica reprocesando, sin volver a scrapear.',
      ],
    },
    estadisticas: {
      name: 'De la adjudicación a la estadística',
      intro:
        'Cómo los datos normalizados se vuelven respuestas: reglas para comparar solo lo comparable, una fila por adjudicación como base y, sobre ella, qué vender, a qué precio y quién gana.',
      nodes: {
        tablas: { label: 'Tablas normalizadas', sub: 'adjudicaciones con producto, cantidad, precio, proveedor y organismo' },
        reglas: {
          label: 'Reglas anti-ruido',
          sub: 'pesos sin impuestos · misma unidad · sin anulados',
          desc: 'Las monedas extranjeras se convierten con la cotización del día de la adjudicación. Un precio con impuestos de tasa desconocida no entra en las estadísticas de precio.',
        },
        afuera: {
          label: 'Queda afuera, y se dice',
          sub: 'anulados, sin fecha, sin cotización o sin base impositiva',
          desc: 'Algunas filas cuentan para volúmenes pero no para precios. El tablero muestra la cobertura de cada regla.',
        },
        hechos: { label: 'Hechos', sub: 'una fila por adjudicación, en pesos uruguayos sin impuestos', desc: 'La base de las series y los rankings.' },
        refresco: { label: 'Refresco', sub: 'tras cada lote, cada noche o a pedido', desc: 'Concurrente, para no bloquear el tablero mientras se recalcula.' },
        precio: {
          label: 'A qué precio',
          sub: 'p10 · p25 · mediana · p75 · p90 · tendencia mensual',
          desc: 'Donde hay cuadro comparativo, también cuánto más barata fue la oferta ganadora que las perdedoras.',
        },
        oportunidad: {
          label: 'Qué vender',
          sub: 'índice de 0 a 100 sobre los últimos 24 meses',
          desc: 'Volumen (35 %), frecuencia de llamados (20 %), organismos que lo compran (20 %) y apertura entre proveedores (25 %). Una fórmula visible, no una caja negra.',
        },
        competencia: {
          label: 'Quién gana y quién compra',
          sub: 'cuotas · tasa de éxito · competidores · organismos',
          desc: 'Para cada proveedor, qué vende, a quién y contra quién compite.',
        },
        tablero: { label: 'Tablero', sub: 'qué vender · productos · competidores · compradores' },
      },
      edges: {
        'tablas>reglas': 'filtra y convierte',
        'reglas>hechos': 'comparable',
        'reglas>afuera': 'no comparable',
        'refresco>hechos': 'recalcula',
        'hechos>precio': 'percentiles',
        'hechos>oportunidad': 'índice',
        'hechos>competencia': 'rankings',
      },
      groups: { gr: 'COMPARAR SOLO LO COMPARABLE', gh: 'LA BASE', go: 'LAS RESPUESTAS' },
      tour: [
        'Antes de calcular nada, las reglas: todo a pesos sin impuestos con la cotización del día, precios solo dentro de la misma unidad y sin llamados anulados. Lo que no cumple queda afuera, y el tablero dice cuánto y por qué.',
        'Lo comparable forma la vista base: una fila por adjudicación. Se recalcula sola después de cada lote y cada noche, sin bloquear las consultas.',
        'Sobre esa base salen las respuestas: el índice de oportunidad por producto, la distribución del precio ganador y los rankings de proveedores y compradores. Medianas y percentiles, no promedios.',
        'El tablero las muestra con filtros por período y categoría, y con el desglose de cada número a la vista.',
      ],
    },
    analista: {
      name: 'El analista de IA',
      intro:
        'Cómo la IA escribe el análisis sin inventar cifras: recibe un paquete con las estadísticas ya calculadas, responde con un esquema fijo, se verifica lo que menciona y la respuesta se guarda junto con lo que vio.',
      nodes: {
        pedido: {
          label: 'Pedido',
          sub: 'informe del mercado · veredicto de un producto · pregunta libre',
          desc: 'En una pregunta libre se buscan los productos y proveedores mencionados para armar sus fichas.',
        },
        cifras: { label: 'Estadísticas', sub: 'oportunidades, precios, proveedores, compradores', desc: 'Salen de SQL: reproducibles y auditables.' },
        paquete: {
          label: 'Paquete de datos',
          sub: 'texto con las cifras, recortado al contexto del modelo',
          desc: 'Amplio con Anthropic, acotado con un modelo local de 8k tokens. El modelo nunca consulta la base: solo ve esto.',
        },
        modelo: {
          label: 'Modelo de IA',
          sub: 'Ollama local o Anthropic, el mismo del resto del sistema',
          desc: 'En CPU, un informe tarda de uno a tres minutos: por eso se pide y se consulta por estado. Con Anthropic, segundos.',
        },
        esquema: {
          label: 'Respuesta con esquema',
          sub: 'JSON validado · cita números · dice qué no puede responder',
          desc: 'El prompt le prohíbe inventar cifras o nombres. Un veredicto trae entrar, explorar o evitar, con confianza y precio de entrada.',
        },
        verificar: { label: 'Verificación', sub: 'cada producto mencionado se busca en el paquete' },
        descarte: { label: 'Descartado', sub: 'productos que no estaban en los datos' },
        guardar: {
          label: 'Informe + paquete',
          sub: 'la respuesta, guardada con los datos exactos que la originaron',
          desc: 'Cualquier conclusión se puede auditar: si el modelo se equivoca, se ve qué tenía delante.',
        },
        tablero: { label: 'Tablero', sub: 'informe, veredicto en la ficha del producto, respuestas' },
      },
      edges: {
        'pedido>paquete': 'qué analizar',
        'cifras>paquete': 'cifras',
        'paquete>modelo': 'prompt',
        'modelo>esquema': 'JSON',
        'verificar>descarte': 'no existe',
        'verificar>guardar': 'verificado',
        'guardar>tablero': 'se consulta',
      },
      groups: { ga: 'ARMAR EL CONTEXTO', gc: 'CONTROLAR' },
      tour: [
        'Alguien pide un informe del mercado, el veredicto de un producto o hace una pregunta libre. Con eso se arma un paquete de texto con las estadísticas ya calculadas, recortado a lo que entra en el contexto del modelo.',
        'El modelo, local o en la nube, solo ve ese paquete. Responde en JSON con un esquema fijo y citando los números.',
        'La respuesta se valida y cada producto que menciona se busca en el paquete. Si no estaba, se descarta: la IA no puede agregar datos que no recibió.',
        'Lo que pasa se guarda junto con el paquete exacto que lo originó, y el tablero lo muestra. Cualquier conclusión se puede rastrear hasta su cifra.',
      ],
    },
  },
};

const en: ProjectText = {
  header: {
    kicker: 'case study · arce tenders',
    title: 'Arce, in a diagram you can move around.',
    intro:
      'Four views of the system: the full circuit from the portal to the dashboard, how a batch of historical data comes in and gets normalized, how an award becomes a statistic and how the AI writes the analysis without making up figures. Every box can be dragged; every view has a step-by-step walkthrough.',
    footNote: 'The diagram follows the code published on GitHub (market module, October 2026). Module names and rules are the real ones.',
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
    gate: 'check',
    config: 'infrastructure',
    estado: 'pending',
    ok: 'unchanged',
    bad: 'dropped',
  },
  views: {
    mapa: {
      name: 'Overview',
      intro:
        'From the public procurement portal to management: the history comes in through an API, gets normalized in PostgreSQL, the statistics are precomputed and an AI reads them to write the analysis. All in one Docker service; the AI runs on Ollama or Anthropic.',
      script: [
        'Arce answers a question from management: what is worth selling to the State, at what price and against whom. To do that it uses the full history of Uruguay’s public purchases, not just open tenders.',
        'A separate scraper, still pending, will walk the portal and send tenders in batches to an API. The system is already ready to receive them.',
        'The API validates each tender, stores the raw payload and normalizes it: suppliers by tax ID, articles by code, currencies and units in a single canon.',
        'On top of that, PostgreSQL precomputes the statistics: what to sell, at what price, who wins and who buys. An AI reads those figures and writes the report, without computing anything on its own.',
        'The previous stage still runs in the same service: the monitor that filters open tenders in one field and leaves them in a review inbox.',
      ],
      nodes: {
        portal: {
          label: 'Public procurement portal',
          sub: 'ARCE: tenders, bids and awards from the whole State',
          desc: 'The source. It publishes each tender with its items and, once awarded, to whom and at what price.',
        },
        scraper: {
          label: 'History scraper',
          sub: 'separate service · still pending',
          desc: 'It will walk the portal and send tenders in batches, following the contract the API publishes. Meanwhile, a synthetic data generator uses the same door.',
        },
        ingesta: {
          label: 'Ingestion API',
          sub: 'token · Zod contract · raw payload with a hash',
          desc: 'Validates each tender, stores it as it arrived and normalizes it in one transaction. Repeats are not reprocessed.',
        },
        postgres: {
          label: 'PostgreSQL (market schema)',
          sub: 'agencies · suppliers · articles · tenders · items · bids · awards · exchange rates',
          desc: 'The normalized data: suppliers by tax ID, articles by catalog code, currencies and units in a single canon.',
        },
        vistas: {
          label: 'Statistics',
          sub: '8 materialized views',
          desc: 'They refresh on their own a minute after the last batch, every night and on demand, without blocking the dashboard.',
        },
        analista: {
          label: 'AI analyst',
          sub: 'Ollama or Anthropic · reads figures, does not compute them',
          desc: 'Receives a package with the statistics already done and writes the report, the product verdict or the answer to a question.',
        },
        monitor: {
          label: 'Field monitor',
          sub: 'the first stage · RSS every 15 min · documents analyzed with AI',
          desc: 'Filters open tenders in one field and leaves them in a review inbox. It still runs in the same service.',
        },
        tablero: {
          label: 'Dashboard (React)',
          sub: 'what to sell · products · competitors · buyers',
          desc: 'Filters by period and category, pages per product and supplier, and data coverage in plain sight.',
        },
        direccion: {
          label: 'Management',
          sub: 'decides what to sell and at what price',
          desc: 'Reads the dashboard and the report, and asks the AI free-form questions.',
        },
      },
      edges: {
        'portal>scraper': 'walks',
        'scraper>ingesta': 'batches via API',
        'ingesta>postgres': 'normalizes',
        'postgres>vistas': 'precomputes',
        'vistas>analista': 'figures',
        'vistas>tablero': 'statistics',
        'analista>tablero': 'reports',
        'tablero>direccion': 'browses · asks',
        'portal>monitor': 'RSS',
        'monitor>tablero': 'review inbox',
      },
      groups: { gf: 'OUTSIDE THE SYSTEM', gm: 'MARKET MODULE' },
      tour: [
        'The history scraper, a separate service still to be built, will walk the portal and send tenders in batches to the ingestion API.',
        'Ingestion validates each tender against the contract, stores the raw payload and normalizes it in PostgreSQL.',
        'With the data normalized, eight materialized views precompute what the dashboard shows: what to sell, at what price, who wins and who buys.',
        'The AI analyst reads those figures and writes the report for management, who can also ask it free-form questions from the dashboard.',
        'The first stage still lives in the same service: the field monitor reads the portal’s RSS and leaves open tenders in a review inbox.',
      ],
    },
    ingesta: {
      name: 'Ingesting a batch',
      intro:
        'What happens when a batch of historical data arrives: each tender is validated on its own, the raw payload is stored with a hash, normalized, and a statistics refresh is triggered.',
      nodes: {
        lote: { label: 'Batch of tenders', sub: 'up to 500 per request, with a token', desc: 'Each tender travels whole: items, bids and awards together.' },
        contrato: {
          label: 'Contract (Zod)',
          sub: 'tolerant with format, strict with structure',
          desc: 'Accepts decimal commas, dd/mm/yyyy dates and the currency as written on the portal. An item with no number or an award with no supplier does not pass.',
        },
        rechazo: { label: 'Tender rejected', sub: 'with the error detail', desc: 'That tender is rejected, not the whole batch. The scraper gets what failed and where.' },
        crudo: { label: 'Raw payload', sub: 'the JSON as it arrived, with a hash of its content', desc: 'It is the source of truth: everything else can be rebuilt from here.' },
        hash: { label: 'New content?', sub: 'the hash is compared with the previous version' },
        igual: { label: 'Unchanged', sub: 'not reprocessed', desc: 'Resending a batch duplicates nothing.' },
        normalizar: {
          label: 'Normalize',
          sub: 'tax ID · articles · agencies · currencies · units · statuses',
          desc: 'A supplier that came with only a name is merged once its tax ID shows up. A tender that changed replaces its children in one transaction.',
        },
        tablas: { label: 'Normalized tables', sub: 'tenders, items, bids, awards' },
        reproceso: {
          label: 'Reprocess',
          sub: 'from the raw payloads, on demand',
          desc: 'If the normalization rules change, everything is rebuilt without asking the scraper for anything.',
        },
        refresco: { label: 'Scheduled refresh', sub: 'one minute after the last batch', desc: 'If several batches arrive in a row, it refreshes only once at the end.' },
      },
      edges: {
        'lote>contrato': 'each tender',
        'contrato>crudo': 'valid',
        'contrato>rechazo': 'invalid',
        'hash>normalizar': 'new or changed',
        'hash>igual': 'same',
        'reproceso>normalizar': 'new rules',
        'tablas>refresco': 'triggers',
      },
      groups: { gv: 'VALIDATE', gc: 'STORE THE RAW PAYLOAD', gn: 'NORMALIZE' },
      tour: [
        'A batch arrives with a token. Each tender is validated on its own against the contract: format is tolerated, structure is not. An invalid tender is rejected with the detail, without dropping the rest.',
        'What is valid is stored as it arrived, with a hash of its content. If the hash matches the last one, nothing else happens.',
        'If it is new or changed (say, it went from published to awarded), it is normalized and replaces the previous version inside a transaction.',
        'At the end a statistics refresh is scheduled. And since the raw payload is kept, any change in the rules is applied by reprocessing, without scraping again.',
      ],
    },
    estadisticas: {
      name: 'From award to statistic',
      intro:
        'How the normalized data becomes answers: rules to compare only what is comparable, one row per award as the base and, on top of it, what to sell, at what price and who wins.',
      nodes: {
        tablas: { label: 'Normalized tables', sub: 'awards with product, quantity, price, supplier and agency' },
        reglas: {
          label: 'Anti-noise rules',
          sub: 'pesos before tax · same unit · no cancelled tenders',
          desc: 'Foreign currencies are converted with the exchange rate of the award date. A price including tax at an unknown rate does not enter the price statistics.',
        },
        afuera: {
          label: 'Left out, and said so',
          sub: 'cancelled, undated, no exchange rate or unknown tax base',
          desc: 'Some rows count for volumes but not for prices. The dashboard shows the coverage of each rule.',
        },
        hechos: { label: 'Facts', sub: 'one row per award, in Uruguayan pesos before tax', desc: 'The base for the series and the rankings.' },
        refresco: { label: 'Refresh', sub: 'after each batch, every night or on demand', desc: 'Concurrent, so the dashboard is not blocked while it recomputes.' },
        precio: {
          label: 'At what price',
          sub: 'p10 · p25 · median · p75 · p90 · monthly trend',
          desc: 'Where a bid comparison exists, also how much cheaper the winning bid was than the losing ones.',
        },
        oportunidad: {
          label: 'What to sell',
          sub: '0–100 index over the last 24 months',
          desc: 'Volume (35%), tender frequency (20%), agencies buying it (20%) and openness across suppliers (25%). A visible formula, not a black box.',
        },
        competencia: {
          label: 'Who wins and who buys',
          sub: 'shares · win rate · competitors · agencies',
          desc: 'For each supplier, what it sells, to whom and who it competes with.',
        },
        tablero: { label: 'Dashboard', sub: 'what to sell · products · competitors · buyers' },
      },
      edges: {
        'tablas>reglas': 'filters and converts',
        'reglas>hechos': 'comparable',
        'reglas>afuera': 'not comparable',
        'refresco>hechos': 'recomputes',
        'hechos>precio': 'percentiles',
        'hechos>oportunidad': 'index',
        'hechos>competencia': 'rankings',
      },
      groups: { gr: 'COMPARE ONLY WHAT IS COMPARABLE', gh: 'THE BASE', go: 'THE ANSWERS' },
      tour: [
        'Before computing anything, the rules: everything in pesos before tax at the day’s exchange rate, prices only within the same unit and no cancelled tenders. What does not comply is left out, and the dashboard says how much and why.',
        'What is comparable forms the base view: one row per award. It refreshes on its own after each batch and every night, without blocking queries.',
        'The answers come from that base: the opportunity index per product, the winning price distribution and the supplier and buyer rankings. Medians and percentiles, not averages.',
        'The dashboard shows them with period and category filters, and with the breakdown of every number in plain sight.',
      ],
    },
    analista: {
      name: 'The AI analyst',
      intro:
        'How the AI writes the analysis without making up figures: it receives a package with the statistics already computed, answers with a fixed schema, what it mentions is checked and the answer is stored with what it saw.',
      nodes: {
        pedido: {
          label: 'Request',
          sub: 'market report · product verdict · free-form question',
          desc: 'For a free-form question, the products and suppliers mentioned are looked up to build their pages.',
        },
        cifras: { label: 'Statistics', sub: 'opportunities, prices, suppliers, buyers', desc: 'They come from SQL: reproducible and auditable.' },
        paquete: {
          label: 'Data package',
          sub: 'text with the figures, trimmed to the model context',
          desc: 'Generous with Anthropic, tight with an 8k-token local model. The model never queries the database: it only sees this.',
        },
        modelo: {
          label: 'AI model',
          sub: 'local Ollama or Anthropic, the same as the rest of the system',
          desc: 'On CPU a report takes one to three minutes, so it is requested and then polled. With Anthropic, seconds.',
        },
        esquema: {
          label: 'Schema-bound answer',
          sub: 'validated JSON · cites numbers · says what it cannot answer',
          desc: 'The prompt forbids inventing figures or names. A verdict comes as enter, explore or avoid, with confidence and an entry price.',
        },
        verificar: { label: 'Verification', sub: 'every product mentioned is looked up in the package' },
        descarte: { label: 'Dropped', sub: 'products that were not in the data' },
        guardar: {
          label: 'Report + package',
          sub: 'the answer, stored with the exact data that produced it',
          desc: 'Any conclusion can be audited: if the model gets it wrong, you can see what it had in front of it.',
        },
        tablero: { label: 'Dashboard', sub: 'report, verdict on the product page, answers' },
      },
      edges: {
        'pedido>paquete': 'what to analyze',
        'cifras>paquete': 'figures',
        'paquete>modelo': 'prompt',
        'modelo>esquema': 'JSON',
        'verificar>descarte': 'does not exist',
        'verificar>guardar': 'verified',
        'guardar>tablero': 'retrieved',
      },
      groups: { ga: 'BUILD THE CONTEXT', gc: 'CHECK' },
      tour: [
        'Someone asks for a market report, a product verdict or a free-form question. That builds a text package with the statistics already computed, trimmed to what fits the model context.',
        'The model, local or in the cloud, only sees that package. It answers in JSON with a fixed schema, citing the numbers.',
        'The answer is validated and every product it mentions is looked up in the package. If it was not there, it is dropped: the AI cannot add data it did not receive.',
        'What passes is stored with the exact package that produced it, and the dashboard shows it. Any conclusion can be traced back to its figure.',
      ],
    },
  },
};

export const arce: DiagramProjectData = { id: 'arce', slug: '/arce', layout, texts: { es, en } };
