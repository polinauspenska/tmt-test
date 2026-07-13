// ============ Scroll fade-in / stagger reveal ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger')
  .forEach(el => revealObserver.observe(el));

// ============ Animated number counters (stat cards) ============
function animateCounter(el) {
  const raw = el.getAttribute('data-counter');
  const match = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) { el.textContent = raw; return; }
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const decimals = (numStr.split('.')[1] || '').length;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = (target * eased).toFixed(decimals);
    el.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ============ Subtle parallax on hero glow ============
const heroGlow = document.querySelector('.hero__glow');
if (heroGlow) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroGlow.style.transform = `translateX(-50%) translateY(${y * 0.15}px)`;
  }, { passive: true });
}

// ============ Radial "who we serve" gentle float stagger ============
document.querySelectorAll('.radial-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
