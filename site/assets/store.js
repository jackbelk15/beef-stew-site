const galleries = {
  spoon: ['spoon-01.jpg', 'spoon-02.jpg', 'spoon-03.jpg'],
  apron: ['apron-01.jpg', 'apron-02.jpg', 'apron-03.jpg', 'apron-04.jpg', 'apron-05.jpg', 'apron-06.jpg'],
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
    image.alt = `${key === 'apron' ? 'Business Attire Apron' : 'Advanced Beef-Stew Spoon'} image ${current + 1} of ${images.length}`;
    dots.querySelectorAll('.gallery-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === current);
      dot.setAttribute('aria-current', dotIndex === current ? 'true' : 'false');
    });
  }

  gallery.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  show(0);
});
