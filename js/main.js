/* =============================================
   CAPPELETTI VIAJES — JavaScript
   ============================================= */

// ---------- NAVBAR: scroll effect ----------
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- MOBILE MENU ----------
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// ---------- FILTROS DE PAQUETES ----------
const filtros      = document.querySelectorAll('.filtro-btn');
const paquetCards  = document.querySelectorAll('.paquete-card');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    paquetCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeUp .4s ease forwards';
        });
      }
    });
  });
});

// ---------- CONTADOR ANIMADO ----------
const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString('es-AR');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString('es-AR');
    }
  }, 16);
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach(animateCounter);
      }
    });
  }, { threshold: 0.4 }).observe(statsSection);
}

// ---------- REVEAL ON SCROLL ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grids
      const siblings = Array.from(entry.target.parentElement.children);
      const index    = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- FAQ ACCORDION ----------
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Cerrar todos los abiertos
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').classList.remove('open');
    });

    // Abrir el clickeado (si estaba cerrado)
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ---------- ACTIVE LINK EN SCROLL ----------
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.btn-nav)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--primary)';
    }
  });
}, { passive: true });
