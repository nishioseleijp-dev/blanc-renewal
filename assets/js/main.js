/* =========================================
   SENSE Product Company - Main JS
   ========================================= */

// --- Header scroll effect ---
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// --- Mobile nav ---
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-close');

if (navToggle && navOverlay) {
  navToggle.addEventListener('click', () => navOverlay.classList.add('open'));
  navClose?.addEventListener('click', () => navOverlay.classList.remove('open'));
  navOverlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navOverlay.classList.remove('open'));
  });
}

// --- Scroll reveal ---
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// --- Style tabs (blanc page) ---
const styleTabs = document.querySelectorAll('.style-tab');
const stylePanels = document.querySelectorAll('.style-panel');

if (styleTabs.length) {
  styleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      styleTabs.forEach(t => t.classList.remove('active'));
      stylePanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

// --- Active nav link ---
const currentPath = window.location.pathname;
document.querySelectorAll('.site-nav a, .nav-overlay a').forEach(a => {
  if (a.getAttribute('href') === currentPath ||
      (currentPath.includes(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
    a.classList.add('active');
  }
});

// --- Smooth anchor scroll ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Page hero slider (brand pages: blanc / megurino / logs-sauna / mera / qbe / xxcia-dome) ---
// 旧: 各ブランドページのインライン<script>に重複 → ここへ集約
(function () {
  const slides = document.querySelectorAll('.page-hero .hero-slide');
  if (!slides.length) return;

  const dots        = document.querySelectorAll('.page-hero .hero-dot');
  const prev        = document.querySelector('.page-hero .hero-arrow-prev');
  const next        = document.querySelector('.page-hero .hero-arrow-next');
  const bar         = document.querySelector('.page-hero .hero-progress');
  const contentArea = document.querySelector('.page-hero .hero-content-area');
  let current = 0;
  let timer;

  function applyTheme() {
    if (!contentArea) return;
    const theme = slides[current].dataset.theme || 'light';
    contentArea.classList.remove('hero-theme-light', 'hero-theme-dark');
    contentArea.classList.add('hero-theme-' + theme);
  }

  function resetBar() {
    if (!bar) return;
    bar.classList.remove('running');
    bar.style.width = '0%';
    void bar.offsetWidth;
    bar.classList.add('running');
  }

  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    applyTheme();
    resetBar();
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach(dot => dot.addEventListener('click', () => { goTo(+dot.dataset.index); startAuto(); }));
  if (prev) prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  applyTheme();
  resetBar();
  startAuto();
})();
