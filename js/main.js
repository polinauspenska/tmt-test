// ============ Sticky navbar background on scroll ============
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============ Scroll progress bar ============
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('mobile-open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ============ Active nav link on scroll ============
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav__link');
if (sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));
}

// ============ Magnetic buttons ============
document.querySelectorAll('.btn--primary, .btn--secondary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ============ Program card cursor glow ============
document.querySelectorAll('.program-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// ============ Contact form character counter ============
const messageField = document.getElementById('message');
const counter = document.getElementById('messageCount');
if (messageField && counter) {
  const max = messageField.getAttribute('maxlength') || 300;
  const update = () => { counter.textContent = `${messageField.value.length}/${max}`; };
  messageField.addEventListener('input', update);
  update();
}

// ============ Contact form submit -> thank you page ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'thank-you.html';
  });
}

// ============ Footer year ============
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
