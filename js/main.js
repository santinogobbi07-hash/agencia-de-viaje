/* =============================================
   CAPPELETTI VIAJES - JavaScript
   ============================================= */

// ---------- NAVBAR: scroll effect ----------
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- MOBILE MENU ----------
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// ---------- FILTROS DE PAQUETES ----------
const filtros    = document.querySelectorAll('.filtro-btn');
const paquetCards = document.querySelectorAll('.paquete-card');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    // Actualizar botón activo
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    paquetCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn .4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ---------- CONTADOR ANIMADO DE STATS ----------
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Usar IntersectionObserver para arrancar el contador cuando sea visible
const statsSection = document.querySelector('.stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNums.forEach(animateCounter);
    }
  });
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);

// ---------- ANIMACION SCROLL SUAVE DE CARDS ----------
const observeCards = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.paquete-card, .destino-card, .beneficio-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity .5s ease, transform .5s ease';
  observeCards.observe(card);
});

// ---------- ACTIVE LINK EN SCROLL ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.btn-nav)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active-link');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active-link');
    }
  });
}, { passive: true });
