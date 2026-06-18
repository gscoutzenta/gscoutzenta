/* Zenta · scripts compartidos */
(function () {
  // Nav: cambia a "scrolled" tras pasar 30px (a menos que sea always-scrolled)
  const nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('always-scrolled')) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // Menú mobile
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('mobile-panel');
  const close = document.getElementById('mobile-close');
  if (toggle && panel && close) {
    toggle.addEventListener('click', () => panel.classList.add('open'));
    close.addEventListener('click', () => panel.classList.remove('open'));
    panel.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => panel.classList.remove('open'))
    );
  }

  // Reveal al entrar en viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Counters (data-count)
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('es-AR');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('es-AR');
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // Smooth anchor con offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Año dinámico en footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Botón flotante de WhatsApp (se inyecta en todas las páginas)
  (function injectWhatsApp() {
    const WA = 'https://wa.me/5493878359312?text=' +
      encodeURIComponent('Hola! Quiero hacer una consulta sobre el Grupo Scout Zenta');
    const css = `
      .wa-float{position:fixed;right:20px;bottom:20px;z-index:350;width:60px;height:60px;
        border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;
        justify-content:center;font-size:1.9rem;text-decoration:none;
        box-shadow:0 8px 24px rgba(37,211,102,.45);transition:transform .25s ease,box-shadow .25s ease}
      .wa-float:hover{transform:scale(1.08);box-shadow:0 12px 30px rgba(37,211,102,.6)}
      .wa-float::before{content:"";position:absolute;inset:0;border-radius:50%;
        background:#25d366;opacity:.45;animation:wa-pulse 2.4s ease-out infinite;z-index:-1}
      @keyframes wa-pulse{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.8);opacity:0}}
      @media(max-width:540px){.wa-float{width:54px;height:54px;font-size:1.7rem;right:16px;bottom:16px}}`;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    const a = document.createElement('a');
    a.href = WA;
    a.className = 'wa-float';
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Escribinos por WhatsApp');
    a.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    document.body.appendChild(a);
  })();
})();
