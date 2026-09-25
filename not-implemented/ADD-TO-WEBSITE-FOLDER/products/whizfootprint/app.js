(() => {
  const header = document.querySelector('[data-header]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const productMenu = document.querySelector('[data-product-menu]');
  const productTrigger = productMenu?.querySelector('.products-trigger');

  const closeProducts = () => {
    productMenu?.classList.remove('is-open');
    productTrigger?.setAttribute('aria-expanded', 'false');
  };

  productTrigger?.addEventListener('click', () => {
    const open = productMenu.classList.toggle('is-open');
    productTrigger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (productMenu && !productMenu.contains(event.target)) closeProducts();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProducts();
  });

  mobileToggle?.addEventListener('click', () => {
    const open = header.classList.toggle('mobile-open');
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header?.classList.remove('mobile-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const accessForm = document.querySelector('[data-access-form]');
  const tokenInput = document.querySelector('#access-token');
  const tokenError = document.querySelector('#token-error');

  accessForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const token = tokenInput.value.trim();
    tokenError.hidden = false;

    if (!token) {
      tokenError.textContent = 'Enter the workspace token supplied by Whiz Solutions.';
      tokenInput.focus();
      return;
    }

    // Intentional handoff behavior: no token is transmitted until the production auth endpoint is connected.
    tokenError.textContent = 'Workspace authentication is ready to connect. Configure the production token endpoint before enabling this action.';
    tokenError.style.color = '#b9f4eb';
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
})();
