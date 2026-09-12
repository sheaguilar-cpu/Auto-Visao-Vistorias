/* ==========================================
   AUTO VISÃO — SCRIPT PRINCIPAL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============ MENU MOBILE ============ */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');

      const icon = menuToggle.querySelector('i');
      if (nav.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  /* ============ HEADER SCROLL ============ */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ============ BACK TO TOP ============ */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ SCROLL REVEAL ============ */
  const revealElements = document.querySelectorAll(
    '.section, .section-header, .service-card, .feature-card, .info-card, .about-grid, .contact-item, .cta-inner, .about-card-float'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ============ CONTADOR ANIMADO ============ */
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      if (target >= 1000) {
        el.textContent = value.toLocaleString('pt-BR') + '+';
      } else if (target === 98) {
        el.textContent = value + '%';
      } else {
        el.textContent = value;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (target >= 1000) {
          el.textContent = target.toLocaleString('pt-BR') + '+';
        } else if (target === 98) {
          el.textContent = target + '%';
        } else {
          el.textContent = target;
        }
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ============ FORMULÁRIO RÁPIDO (HERO) ============ */
  const quickForm = document.getElementById('quickForm');

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = quickForm.querySelector('input[type="text"]').value.trim();
      const telefone = quickForm.querySelector('input[type="tel"]').value.trim();
      const veiculo = quickForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || '';
      const servico = quickForm.querySelector('select').value;

      if (!nome || !telefone || !veiculo || !servico) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
      }

      showToast(`Obrigado, ${nome}! Recebemos sua solicitação de "${servico}". Entraremos em contato em breve.`, 'success');
      quickForm.reset();
    });
  }

  /* ============ FORMULÁRIO DE CONTATO ============ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const telefone = contactForm.querySelector('input[type="tel"]').value.trim();
      const servico = contactForm.querySelector('select').value;
      const mensagem = contactForm.querySelector('textarea').value.trim();

      if (!nome || !email || !telefone || !servico || !mensagem) {
        showToast('Por favor, preencha todos os campos do formulário.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Por favor, informe um e-mail válido.', 'error');
        return;
      }

      showToast(`Mensagem enviada com sucesso! Obrigado, ${nome}. Responderemos em breve.`, 'success');
      contactForm.reset();
    });
  }

  /* ============ SCROLL SUAVE PARA ÂNCORAS ============ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============ TOAST NOTIFICAÇÃO ============ */
  function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${message}</span>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      top: '100px',
      right: '22px',
      maxWidth: '400px',
      background: type === 'success' ? '#0d9488' : '#dc2626',
      color: '#fff',
      padding: '16px 22px',
      borderRadius: '12px',
      boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: '9999',
      fontSize: '0.92rem',
      fontFamily: "'Poppins', sans-serif",
      transform: 'translateX(120%)',
      transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      fontWeight: '500',
      lineHeight: '1.4'
    });

    document.body.appendChild(toast);

    // Slide in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  /* ============ ANO DINÂMICO NO FOOTER ============ */
  const footerYear = document.querySelector('.footer-bottom p');
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace(/©\s*\d{4}/, `© ${currentYear}`);
  }

  /* ============ PARALLAX SUAVE NO HERO ============ */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - scrolled / 900;
      }
    });
  }

  /* ============ RIPPLE EFFECT NOS BOTÕES ============ */
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      Object.assign(ripple.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'ripple-effect 0.6s linear',
        pointerEvents: 'none'
      });

      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ============ ANIMAÇÃO RIPPLE (INJEÇÃO DINÂMICA) ============ */
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  /* ============ LOG DE BOAS-VINDAS ============ */
  console.log(
    '%c🚗 Auto Visão — Vistorias e Perícias Automotivas',
    'background: linear-gradient(135deg, #ff6b1a, #0d2c54); color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;'
  );
  console.log(
    '%c📍 Av. Andrade Neves, 1160 — Centro, Campinas/SP | ☎ (19) 3234-3929',
    'color: #0d2c54; font-size: 12px;'
  );

});
