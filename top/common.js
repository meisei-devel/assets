document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /*
   * Whole-card navigation is shared UI behavior.
   * Real links/buttons inside a card keep their own destination/action.
   */
  document.querySelectorAll('.article-card, .estate-card').forEach((card) => {
    const primaryLink = card.matches('.article-card')
      ? card.querySelector('h2 a')
      : card.querySelector('h3 a');

    if (!primaryLink || !primaryLink.href) return;

    card.tabIndex = 0;
    card.setAttribute('role', 'link');

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, select, textarea, label')) return;
      window.location.href = primaryLink.href;
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      if (event.target.closest('a, button, input, select, textarea, label')) return;
      event.preventDefault();
      window.location.href = primaryLink.href;
    });
  });
});
