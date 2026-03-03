const revealItems = document.querySelectorAll('.reveal');

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => io.observe(item));

const imageSlot = document.querySelector('.image-slot');

if (imageSlot) {
  const setOffset = (x, y) => {
    imageSlot.style.setProperty('--mx', `${x}px`);
    imageSlot.style.setProperty('--my', `${y}px`);
  };

  const updateFromPointer = (event) => {
    const rect = imageSlot.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return;
    }

    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    setOffset(relX * 52, relY * 52);
  };

  imageSlot.addEventListener('mousemove', updateFromPointer);
  imageSlot.addEventListener('pointermove', updateFromPointer);

  imageSlot.addEventListener('mouseleave', () => {
    setOffset(0, 0);
  });

  imageSlot.addEventListener('pointerleave', () => {
    setOffset(0, 0);
  });
}

const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (siteHeader && navToggle && mainNav) {
  const setOpen = (open) => {
    siteHeader.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.contains('is-open');
    setOpen(!isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setOpen(false);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setOpen(false);
    }
  });
}
