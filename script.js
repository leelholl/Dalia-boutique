(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');

  function setMenuOpen(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    nav.classList.toggle('is-open', open);
    nav.inert = !open;
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });

  // Une vraie photo remplace le visuel de secours seulement après chargement réussi.
  document.querySelectorAll('[data-image]').forEach(art => {
    const entry = window.DAILA_IMAGES?.[art.dataset.image];
    const source = typeof entry === 'string' ? entry : entry?.src;
    if (!source) return;
    const image = new Image();
    image.decoding = 'async';
    if (art.classList.contains('art-hero')) image.fetchPriority = 'high';
    image.onload = () => {
      art.style.backgroundImage = `url(\"${source}\")`;
      art.classList.add('has-photo');
      art.setAttribute('aria-label', typeof entry === 'object' && entry.alt ? entry.alt : 'Photo de la boutique Daila');
    };
    fetch(source, { method: 'HEAD' })
      .then(response => {
        if (response.ok) image.src = source;
      })
      .catch(() => {});
  });

  const items = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('is-visible'));
  }

  // Le consentement précède toute requête vers Google Maps.
  document.querySelector('#show-map').addEventListener('click', event => {
    const frame = document.createElement('iframe');
    frame.id = 'map-frame';
    frame.title = 'Carte pour trouver Daila Boutique à Bruxelles';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.src = 'https://www.google.com/maps?q=50.8024886,4.3367963&hl=fr&z=17&output=embed';
    event.currentTarget.closest('.map-wrap').prepend(frame);
    document.querySelector('#map-consent').remove();
  });

  const heroArt = document.querySelector('.hero-art');
  if (heroArt && !reducedMotion && window.matchMedia('(min-width: 761px)').matches) {
    let frame = 0;
    window.addEventListener('scroll', () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        heroArt.style.translate = `0 ${Math.min(window.scrollY * 0.035, 32)}px`;
        frame = 0;
      });
    }, { passive: true });
  }
})();
