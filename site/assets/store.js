const galleries = {
  stew: ['Beef-Stew.webp', 'can-02.webp', 'can-03.webp'],
  spoon: ['spoon-02.webp', 'spoon-01.webp', 'spoon-03.webp'],
  apron: ['apron-01.webp', 'apron-02.webp', 'apron-03.webp', 'apron-04.webp', 'apron-05.webp', 'apron-06.webp'],
};

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const key = gallery.dataset.gallery;
  const images = galleries[key];
  if (!images) return;

  const image = gallery.querySelector('img');
  const dots = gallery.querySelector('.gallery-dots');
  let current = 0;

  images.forEach((file, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', `Show image ${index + 1} of ${images.length}`);
    dot.addEventListener('click', () => show(index));
    dots.append(dot);
  });

  function show(index) {
    current = (index + images.length) % images.length;
    image.src = `assets/images/${images[current]}`;
    const label = key === 'apron' ? 'Business Attire Apron' : key === 'spoon' ? 'Advanced Beef-Stew Spoon' : 'Certified Beef-Stew';
    image.alt = `${label} image ${current + 1} of ${images.length}`;
    dots.querySelectorAll('.gallery-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === current);
      dot.setAttribute('aria-current', dotIndex === current ? 'true' : 'false');
    });
  }

  gallery.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  show(0);
});
