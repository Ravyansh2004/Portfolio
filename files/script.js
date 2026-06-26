document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('copy-year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const typedText = document.getElementById('typing-text');
  const roles = ['Frontend Developer', 'Web Designer', 'Django Enthusiast', 'Tech Problem Solver'];
  let typeIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    if (!typedText) return;
    const current = roles[typeIndex];
    if (deleting) {
      charIndex -= 1;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        typeIndex = (typeIndex + 1) % roles.length;
      }
    } else {
      charIndex += 1;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
      }
    }
    const delay = deleting ? 70 : 120;
    setTimeout(typeRole, charIndex === 0 && deleting ? 300 : delay);
  }
  typeRole();

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn?.classList.add('show');
    } else {
      scrollTopBtn?.classList.remove('show');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const progressBars = document.querySelectorAll('.skill-bar-fill');
  const countItems = document.querySelectorAll('.stat-num');

  function animateOnVisible(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('skill-bar-fill')) {
        const width = el.getAttribute('data-width');
        el.style.width = `${width}%`;
      }
      if (el.classList.contains('stat-num')) {
        const count = Number(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.floor(count / 30));
        const interval = setInterval(() => {
          current += step;
          if (current >= count) {
            el.textContent = `${count}${suffix}`;
            clearInterval(interval);
          } else {
            el.textContent = `${current}${suffix}`;
          }
        }, 45);
      }
      if (el.classList.contains('fade-in')) {
        el.classList.add('visible');
      }
      observer.unobserve(el);
    });
  }

  const observer = new IntersectionObserver(animateOnVisible, {
    threshold: 0.2,
  });

  document.querySelectorAll('.fade-in, .skill-bar-fill, .stat-num').forEach(el => observer.observe(el));
});
