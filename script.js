document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');
  const sidebar = document.getElementById('sidebar');
  const mainImage = document.getElementById('main-image');

  // Gambar default
  const images = [
    'images/Artboard 1.png',
    'images/Artboard 2.png',
    'images/Artboard 3.png',
    'images/Artboard 4.png',
    'images/Artboard 5.png',
    'images/Artboard 6.png',
    'images/Artboard 7.png',
    'images/Artboard 8.png',
    'images/Artboard 9.png',
    'images/Artboard 10.png'
  ];

  let index = 0;

  function showImage(i) {
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = images[i];
      mainImage.style.opacity = 1;
    }, 200);
  }

  // Toggle sidebar
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Klik link di sidebar
  document.querySelectorAll('.sidebar a').forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const imageSrc = link.getAttribute('data-image');
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = 1;
      }, 200);

      sidebar.classList.remove('open');

      // Update index (biar bisa swipe kalau nanti ditambah lagi)
      const filename = imageSrc.split('/').pop();
      index = images.findIndex(img => img.includes(filename));
    });
  });

  // Swipe gesture
  let xStart = null;
  function touchStart(e) {
    xStart = e.touches[0].clientX;
  }
  function touchEnd(e) {
    if (!xStart) return;
    const diff = xStart - e.changedTouches[0].clientX;
    if (diff > 20) index = (index + 1) % images.length;
    if (diff < -20) index = (index - 1 + images.length) % images.length;
    showImage(index);
    xStart = null;
  }

  window.addEventListener('touchstart', touchStart, false);
  window.addEventListener('touchend', touchEnd, false);

  // Tampilkan gambar awal
  showImage(index);
});
