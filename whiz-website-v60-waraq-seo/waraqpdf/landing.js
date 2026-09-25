(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const form = document.querySelector('#access-form');
  const formStatus = document.querySelector('#form-status');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.hidden;
      mobileMenu.hidden = isOpen;
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.textContent = isOpen ? 'Menu' : 'Close';
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
    }));
  }

  document.querySelectorAll('[data-open-tools]').forEach((a) => a.addEventListener('click', () => {
    const d = document.querySelector('#all-tools');
    if (d) d.open = true;
  }));

  document.querySelectorAll('a.wt-card[data-tool]').forEach((card) => card.addEventListener('click', () => {
    const msg = document.querySelector('#access-form [name="message"]');
    if (msg) msg.value = "I'm interested in: " + card.getAttribute('data-tool');
  }));
})();
