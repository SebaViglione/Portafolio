// =========================
// UTILIDADES
// =========================

// Crear elemento DOM con atributos y texto
function el(tag, attrs = {}, text = '') {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  if (text) element.textContent = text;
  return element;
}

// Crear botón de link
function linkBtn(className, href, text) {
  const a = el('a', {
    class: className,
    href: href,
    target: '_blank',
    rel: 'noopener noreferrer'
  }, text);
  return a;
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================
const navbar = document.querySelector('.navbar');
const scrollIndicator = document.querySelector('.scroll-indicator');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Fade out scroll indicator when user scrolls
  if (scrollIndicator) {
    if (currentScrollY > 50) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }

  lastScrollY = currentScrollY;
});

// =========================
// MENÚ HAMBURGUESA
// =========================
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

function closeNav() {
  if (!siteNav) return;
  siteNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  if (!siteNav) return;
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Cerrar menú al hacer click en un link
siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      closeNav();
    }
  });
});

// Cerrar menú al cambiar a desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeNav();
  }
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (window.innerWidth < 768) {
    if (!siteNav?.contains(e.target) && !menuToggle?.contains(e.target)) {
      closeNav();
    }
  }
});

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (href === '#' || href.length <= 1) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80; // Offset para navbar fixed
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// =========================
// ANIMACIONES AL HACER SCROLL
// =========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar secciones para animaciones
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section, .card, .project-card');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Observar skill items para animar las barras de progreso
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
  });
});

// =========================
// ANIMACIÓN DE SKILL BARS
// =========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar) {
        const progress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
          progressBar.style.width = `${progress}%`;
        }, 100);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Inicializar observador de skills
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
  });
});

// =========================
// CARGA DE PROYECTOS
// =========================
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('No se pudo cargar projects.json');
    }

    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
    renderProjects([]);
  }
}

function renderProjects(projects) {
  const projectsList = document.getElementById('projects-list');

  if (!projectsList) return;

  projectsList.innerHTML = '';

  if (projects.length === 0) {
    projectsList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No hay proyectos disponibles.</p>';
    return;
  }

  projects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsList.appendChild(projectCard);
    // Solo inicializar galería si no es un video
    if (!project.video) {
      setupGallery(projectCard);
    }
  });

  // Agregar listeners de click a las tarjetas después de renderizarlas
  setTimeout(() => {
    if (typeof addCardListeners === 'function') {
      addCardListeners();
    }
  }, 100);
}

function createProjectCard(project) {
  // Card principal
  const card = el('article', { class: 'project-card fade-in' });

  // Media container con galería o video
  const media = el('div', { class: 'project-media' });

  // Si hay video, usar video en lugar de galería
  if (project.video) {
    const video = el('video', {
      src: project.video,
      controls: '',
      loop: '',
      muted: '',
      playsinline: '',
      loading: 'lazy',
      style: 'width: 100%; height: 100%; object-fit: cover; aspect-ratio: 16/9;'
    });

    // Agregar poster si existe la primera imagen
    if (project.images && project.images.length > 0) {
      video.setAttribute('poster', project.images[0]);
    }

    media.appendChild(video);

    // Hover para reproducir/pausar video
    card.addEventListener('mouseenter', () => {
      video.play().catch(err => console.log('Video play failed:', err));
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
    });
  } else {
    // Usar galería de imágenes
    const gallery = el('div', { class: 'gallery', 'data-gallery-track': '' });

    // Agregar imágenes a la galería
    if (project.images && project.images.length > 0) {
      project.images.forEach((imageSrc, index) => {
        const img = el('img', {
          src: imageSrc,
          alt: `${project.title} - Captura ${index + 1}`,
          loading: 'lazy'
        });
        gallery.appendChild(img);
      });
    } else {
      // Imagen placeholder si no hay imágenes
      const placeholder = el('div', {
        class: 'gallery-placeholder',
        style: 'aspect-ratio: 16/9; background: var(--bg-secondary); display: flex; align-items: center; justify-content: center; color: var(--text-muted);'
      }, 'Sin imágenes disponibles');
      gallery.appendChild(placeholder);
    }

    // Botones de navegación de galería
    const prevBtn = el('button', {
      class: 'gallery-btn prev',
      'aria-label': 'Imagen anterior',
      'data-prev': ''
    }, '‹');

    const nextBtn = el('button', {
      class: 'gallery-btn next',
      'aria-label': 'Siguiente imagen',
      'data-next': ''
    }, '›');

    media.append(prevBtn, gallery, nextBtn);
  }

  // Información del proyecto
  const info = el('div', { class: 'project-info' });

  // Título (con traducción)
  const titleText = typeof project.title === 'object'
    ? (project.title[currentLang] || project.title.es || 'Proyecto')
    : (project.title || 'Proyecto');
  const title = el('h3', {}, titleText);

  // Descripción (con traducción)
  const descText = typeof project.description === 'object'
    ? (project.description[currentLang] || project.description.es || '')
    : (project.description || '');
  const description = el('p', {}, descText);

  // Stack tecnológico
  let stackContainer = null;
  if (Array.isArray(project.stack) && project.stack.length > 0) {
    stackContainer = el('div', { class: 'project-stack' });
    project.stack.forEach(tech => {
      const badge = el('span', { class: 'stack-badge' }, tech);
      stackContainer.appendChild(badge);
    });
  }

  // Features/Características (con traducción)
  let featuresList = null;
  const featuresArray = typeof project.features === 'object' && !Array.isArray(project.features)
    ? (project.features[currentLang] || project.features.es || [])
    : (project.features || []);

  if (Array.isArray(featuresArray) && featuresArray.length > 0) {
    featuresList = el('ul', { class: 'tech-list' });
    featuresArray.forEach(feature => {
      const li = el('li');
      const bullet = el('span', { class: 'tech-bullet' });
      li.appendChild(bullet);
      li.appendChild(document.createTextNode(feature));
      featuresList.appendChild(li);
    });
  }

  // Links
  const linksContainer = el('div', { class: 'links' });

  if (project.links) {
    const buttonTexts = translations[currentLang]?.projects || {
      btn_demo: 'Ver Demo',
      btn_code: 'Ver Código',
      btn_code_back: 'Código Backend',
      btn_doc: 'Documentación',
      btn_video: 'Ver Video'
    };

    if (project.links.demo) {
      linksContainer.appendChild(linkBtn('btn btn-primary', project.links.demo, buttonTexts.btn_demo));
    }
    if (project.links.code) {
      linksContainer.appendChild(linkBtn('btn btn-secondary', project.links.code, buttonTexts.btn_code));
    }
    if (project.links.code_back) {
      linksContainer.appendChild(linkBtn('btn btn-secondary', project.links.code_back, buttonTexts.btn_code_back));
    }
    if (project.links.doc) {
      linksContainer.appendChild(linkBtn('btn btn-secondary', project.links.doc, buttonTexts.btn_doc));
    }
    if (project.links.video) {
      linksContainer.appendChild(linkBtn('btn btn-secondary', project.links.video, buttonTexts.btn_video));
    }
  }

  // Ensamblar info
  info.appendChild(title);
  info.appendChild(description);
  if (stackContainer) {
    info.appendChild(stackContainer);
  }
  if (featuresList) {
    info.appendChild(featuresList);
  }
  info.appendChild(linksContainer);

  // Ensamblar card
  card.appendChild(media);
  card.appendChild(info);

  // Observar para animación
  observer.observe(card);

  return card;
}

// =========================
// GALERÍAS DE PROYECTOS
// =========================
function setupGallery(card) {
  const track = card.querySelector('[data-gallery-track]');
  const prevBtn = card.querySelector('[data-prev]');
  const nextBtn = card.querySelector('[data-next]');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('img'));

  // Si solo hay 1 imagen, ocultar botones
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  let currentIndex = 0;

  function updateGallery() {
    const offset = currentIndex * -100;
    track.style.transform = `translateX(${offset}%)`;
    track.style.transition = 'transform 0.4s ease';
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateGallery();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateGallery();
  }

  // Event listeners para botones
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    goToPrev();
  });
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    goToNext();
  });

  // Soporte táctil para mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    const diff = touchStartX - touchEndX;

    // Mínimo desplazamiento para considerar swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  });

  // Teclado para accesibilidad
  card.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  });
}

// =========================
// FOOTER - AÑO ACTUAL
// =========================
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =========================
// PARALLAX EFFECT (sutil)
// =========================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const parallaxElements = document.querySelectorAll('.blob');

  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// =========================
// CURSOR PERSONALIZADO (opcional, solo desktop)
// =========================
if (window.innerWidth >= 1024) {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const speed = 0.15;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Efecto hover en links y botones
  const interactiveElements = document.querySelectorAll('a, button, .badge');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.backgroundColor = 'rgba(223, 192, 150, 0.3)';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'rgba(223, 192, 150, 0.5)';
    });
  });
}

// Estilos para cursor personalizado (inyectados)
if (window.innerWidth >= 1024) {
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: rgba(223, 192, 150, 0.5);
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease, background-color 0.2s ease;
      mix-blend-mode: difference;
    }

    body {
      cursor: none;
    }

    a, button, .badge {
      cursor: none;
    }
  `;
  document.head.appendChild(style);
}

// =========================
// GITHUB ACTIVITY
// =========================
const GITHUB_USERNAME = 'SebaViglione';

async function loadGitHubData() {
  try {
    // Cargar datos del usuario
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

    // Verificar rate limit
    const remainingRequests = userResponse.headers.get('X-RateLimit-Remaining');
    const resetTime = userResponse.headers.get('X-RateLimit-Reset');

    console.log(`GitHub API - Requests restantes: ${remainingRequests}`);

    if (!userResponse.ok) {
      if (userResponse.status === 403) {
        throw new Error('Rate limit excedido. Intenta de nuevo en unos minutos.');
      }
      throw new Error('Error al cargar usuario de GitHub');
    }

    const userData = await userResponse.json();

    // Cargar repositorios
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!reposResponse.ok) {
      throw new Error('Error al cargar repositorios');
    }
    const reposData = await reposResponse.json();

    // Calcular commits de los últimos 30 días - SOLO EN LOS 5 REPOS MÁS ACTIVOS
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const since = thirtyDaysAgo.toISOString();

    let totalCommits = 0;

    // Reducido a 5 repos para minimizar peticiones
    const activeRepos = reposData
      .filter(repo => new Date(repo.pushed_at) >= thirtyDaysAgo)
      .slice(0, 5);

    // Solo hacer peticiones de commits si tenemos rate limit disponible
    if (parseInt(remainingRequests) > 10) {
      for (const repo of activeRepos) {
        try {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&since=${since}&per_page=100`
          );
          if (commitsResponse.ok) {
            const commits = await commitsResponse.json();
            totalCommits += commits.length;
          }
        } catch (err) {
          console.warn(`No se pudieron cargar commits de ${repo.name}:`, err);
        }
      }
    } else {
      console.warn('Rate limit bajo, mostrando commits estimados');
      // Estimación aproximada basada en repos activos
      totalCommits = activeRepos.length > 0 ? activeRepos.length * 3 : 0;
    }

    // Actualizar estadísticas
    document.getElementById('total-repos').textContent = userData.public_repos || 0;
    document.getElementById('recent-commits').textContent = totalCommits;
    document.getElementById('followers-count').textContent = userData.followers || 0;

    // Renderizar solo los primeros 6 repositorios más recientes
    renderGitHubRepos(reposData.slice(0, 6));

  } catch (error) {
    console.error('Error al cargar datos de GitHub:', error);

    // Mostrar mensaje más específico
    const errorMessage = error.message.includes('Rate limit')
      ? 'Límite de peticiones de GitHub alcanzado. Por favor recarga en unos minutos.'
      : 'No se pudieron cargar los datos de GitHub. Verifica tu conexión.';

    document.getElementById('repos-list').innerHTML = `
      <p style="text-align: center; color: var(--text-muted); padding: 2rem;">
        ${errorMessage}
      </p>
    `;

    // Mostrar valores por defecto en stats
    document.getElementById('total-repos').textContent = '-';
    document.getElementById('recent-commits').textContent = '-';
    document.getElementById('followers-count').textContent = '-';
  }
}

function renderGitHubRepos(repos) {
  const reposList = document.getElementById('repos-list');

  if (!repos || repos.length === 0) {
    reposList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No hay repositorios disponibles.</p>';
    return;
  }

  reposList.innerHTML = '';

  repos.forEach(repo => {
    const repoCard = el('div', { class: 'repo-card fade-in' });

    // Header con nombre y estrellas
    const header = el('div', { class: 'repo-header' });

    const repoName = el('a', {
      class: 'repo-name',
      href: repo.html_url,
      target: '_blank',
      rel: 'noopener noreferrer'
    });

    repoName.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
      ${repo.name}
    `;

    const stats = el('div', { class: 'repo-stats' });

    if (repo.stargazers_count > 0) {
      const stars = el('span', { class: 'repo-stat' });
      stars.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        ${repo.stargazers_count}
      `;
      stats.appendChild(stars);
    }

    if (repo.forks_count > 0) {
      const forks = el('span', { class: 'repo-stat' });
      forks.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="18" r="3"></circle>
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="18" cy="6" r="3"></circle>
          <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
          <path d="M12 12v3"></path>
        </svg>
        ${repo.forks_count}
      `;
      stats.appendChild(forks);
    }

    header.append(repoName, stats);

    // Descripción
    let description = null;
    if (repo.description) {
      description = el('p', { class: 'repo-description' }, repo.description);
    }

    // Lenguaje
    let language = null;
    if (repo.language) {
      language = el('div', { class: 'repo-language' });
      const dot = el('span', { class: 'language-dot' });
      language.appendChild(dot);
      language.appendChild(document.createTextNode(repo.language));
    }

    // Botón visitar repo
    const visitBtn = el('a', {
      class: 'btn btn-secondary btn-sm',
      href: repo.html_url,
      target: '_blank',
      rel: 'noopener noreferrer'
    });

    const visitText = translations[currentLang]?.github?.view_on_github || 'Ver en GitHub';
    visitBtn.innerHTML = `
      <span>${visitText}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    `;

    // Ensamblar card
    repoCard.appendChild(header);
    if (description) repoCard.appendChild(description);
    if (language) repoCard.appendChild(language);
    repoCard.appendChild(visitBtn);

    reposList.appendChild(repoCard);

    // Observar para animación
    observer.observe(repoCard);
  });
}

// =========================
// THEME TOGGLE (Dark/Light Mode)
// =========================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cargar tema guardado o detectar preferencia del sistema
function initTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}

// Cambiar tema
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Event listener para el botón
themeToggle?.addEventListener('click', toggleTheme);

// Inicializar tema al cargar
initTheme();

// =========================
// SISTEMA DE TRADUCCIÓN
// =========================
let translations = {};
let currentLang = 'es';

// Cargar traducciones
async function loadTranslations() {
  try {
    const response = await fetch('data/translations.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo cargar translations.json');
    translations = await response.json();

    // Cargar idioma guardado o detectar idioma del navegador
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      currentLang = savedLang;
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language || navigator.userLanguage;
      currentLang = browserLang.startsWith('es') ? 'es' : 'en';
    }

    applyTranslations(currentLang);
    updateLangToggle(currentLang);
  } catch (error) {
    console.error('Error cargando traducciones:', error);
  }
}

// Aplicar traducciones
function applyTranslations(lang) {
  // Traducir textos
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let translation = translations[lang];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        translation = null;
        break;
      }
    }

    if (translation) {
      element.textContent = translation;
    }
  });

  // Traducir placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let translation = translations[lang];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        translation = null;
        break;
      }
    }

    if (translation) {
      element.setAttribute('placeholder', translation);
    }
  });

  // Actualizar atributo lang del HTML
  document.documentElement.setAttribute('lang', lang);

  // Actualizar meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const descriptions = {
      es: 'Desarrollador web especializado en automatización e IA local. HTML, CSS, JavaScript, PostgreSQL, n8n, Docker y más.',
      en: 'Web developer specialized in automation and local AI. HTML, CSS, JavaScript, PostgreSQL, n8n, Docker and more.'
    };
    metaDesc.setAttribute('content', descriptions[lang]);
  }

  // Actualizar title
  const titles = {
    es: 'Sebastián Viglione | Desarrollador Web',
    en: 'Sebastián Viglione | Web Developer'
  };
  document.title = titles[lang];

  // Actualizar enlaces de descarga de CV
  updateCVLinks(lang);
}

// Actualizar enlaces de descarga de CV según idioma
function updateCVLinks(lang) {
  const cvLinks = document.querySelectorAll('a[href*="CV Sebastián Viglione Chiarlone"]');
  const cvPaths = {
    es: 'assets/cv/CV Sebastián Viglione Chiarlone ESPAÑOL.pdf',
    en: 'assets/cv/CV Sebastián Viglione Chiarlone ENGLISH.pdf'
  };

  cvLinks.forEach(link => {
    link.setAttribute('href', cvPaths[lang]);
  });
}

// Actualizar botón de idioma
function updateLangToggle(lang) {
  document.querySelectorAll('.lang-option').forEach(option => {
    const optionLang = option.getAttribute('data-lang');
    if (optionLang === lang) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

// Cambiar idioma
function changeLanguage(lang) {
  if (lang === currentLang) return;

  currentLang = lang;
  localStorage.setItem('language', lang);
  applyTranslations(lang);
  updateLangToggle(lang);

  // Recargar proyectos para actualizar botones
  loadProjects();
}

// Event listener para el botón de idioma
document.addEventListener('DOMContentLoaded', () => {
  const langOptions = document.querySelectorAll('.lang-option');

  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
});

// =========================
// MODAL FUNCTIONS (GLOBAL)
// =========================
let modal, modalBody;

// Función para agregar listeners a todas las tarjetas
function addCardListeners() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    // Hacer que toda la tarjeta sea clickeable
    card.style.cursor = 'pointer';

    // Remover el atributo data-listener si existe para evitar duplicados
    if (card.hasAttribute('data-has-listener')) {
      return;
    }

    // Marcar que ya tiene listener
    card.setAttribute('data-has-listener', 'true');

    // Agregar listener
    card.addEventListener('click', (e) => {
      // Prevenir que se abra el modal si se hace click en los botones de la galería
      if (e.target.closest('.gallery-btn')) {
        e.stopPropagation();
        return;
      }
      // Prevenir que se abra el modal si se hace click en los links
      if (e.target.closest('.links a')) {
        e.stopPropagation();
        return;
      }
      openModal(index);
    });
  });
}

// Abrir modal
function openModal(projectIndex) {
  if (!modal || !modalBody) return;

  const cards = document.querySelectorAll('.project-card');
  if (cards[projectIndex]) {
    const cardClone = cards[projectIndex].cloneNode(true);
    modalBody.innerHTML = '';
    modalBody.appendChild(cardClone);

    // Re-inicializar galería en modal
    setupGallery(cardClone);

    // Autoplay de video en modal si existe
    const modalVideo = cardClone.querySelector('video');
    if (modalVideo) {
      modalVideo.play().catch(err => console.log('Modal video autoplay failed:', err));
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Cerrar modal
function closeModal() {
  if (!modal) return;

  // Pausar cualquier video que esté reproduciéndose en el modal
  const modalVideo = modalBody?.querySelector('video');
  if (modalVideo) {
    modalVideo.pause();
  }

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// =========================
// INICIALIZACIÓN
// =========================
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations();
  loadProjects();
  loadGitHubData();

  // Mostrar scroll indicator solo en hero
  const scrollIndicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    }
  });

  // =========================
  // PROJECT VIEW TOGGLE & MODAL
  // =========================
  const viewButtons = document.querySelectorAll('.view-btn');
  const projectsList = document.getElementById('projects-list');
  modal = document.getElementById('project-modal');
  modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const viewToggle = document.querySelector('.view-toggle');

  // Función para actualizar el slider
  function updateSlider(activeBtn) {
    const toggleRect = viewToggle.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const left = btnRect.left - toggleRect.left;
    const width = btnRect.width;
    const height = btnRect.height;
    const top = btnRect.top - toggleRect.top;

    viewToggle.style.setProperty('--slider-left', `${left}px`);
    viewToggle.style.setProperty('--slider-width', `${width}px`);
    viewToggle.style.setProperty('--slider-height', `${height}px`);
    viewToggle.style.setProperty('--slider-top', `${top}px`);
  }

  // Cargar vista preferida
  const savedView = localStorage.getItem('projectsView') || 'list';
  if (savedView === 'grid') {
    projectsList.classList.add('grid-view');
    document.querySelector('.view-btn[data-view="grid"]').classList.add('active');
    document.querySelector('.view-btn[data-view="list"]').classList.remove('active');
  }

  // Inicializar slider en la posición correcta
  setTimeout(() => {
    const activeBtn = document.querySelector('.view-btn.active');
    if (activeBtn) updateSlider(activeBtn);
  }, 100);

  // Actualizar slider en resize
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.view-btn.active');
    if (activeBtn) updateSlider(activeBtn);
  });

  // Cambiar vista
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;

      // Actualizar botones activos
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Actualizar slider
      updateSlider(btn);

      // Cambiar clase del grid
      if (view === 'grid') {
        projectsList.classList.add('grid-view');
      } else {
        projectsList.classList.remove('grid-view');
      }

      // Guardar preferencia
      localStorage.setItem('projectsView', view);

      // Siempre agregar listeners de click a las cards
      setTimeout(addCardListeners, 100);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Agregar listeners a todas las tarjetas siempre
  setTimeout(addCardListeners, 500);

  // =========================
  // CONTACT FORM - NETLIFY NATIVE HANDLING
  // =========================
  // El formulario se envía de forma nativa (sin AJAX) para que Netlify lo detecte correctamente.
  // Solo agregamos feedback visual durante el envío.

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      // No prevenir el submit - dejar que el formulario se envíe nativamente a Netlify
      const submitBtn = contactForm.querySelector('.btn-submit');

      // Mostrar mensaje "Enviando..." solo visualmente
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

      // Netlify procesará el formulario y redirigirá a /gracias.html
      // No necesitamos manejar nada más aquí
    });
  }

  // Log de bienvenida
  console.log('%c¡Hola! 👋', 'font-size: 24px; font-weight: bold; color: #dfc096;');
  console.log('%cSi estás viendo esto, probablemente te interese el código.', 'font-size: 14px; color: #a8a8b3;');
  console.log('%cRevisá el repositorio: https://github.com/SebaViglione', 'font-size: 14px; color: #dfc096;');
});
