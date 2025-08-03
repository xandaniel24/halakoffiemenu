document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');
  const sidebar = document.getElementById('sidebar');
  const mainImage = document.getElementById('main-image');

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
    mainImage.style.transition = 'opacity 0.2s ease';
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = images[i];
      mainImage.style.opacity = 1;
    }, 200);
  }

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

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

      const filename = imageSrc.split('/').pop();
      index = images.findIndex(img => img.includes(filename));
    });
  });

  // SWIPE LEFT-RIGHT ONLY
  let xStart = null;
  let yStart = null;

  function touchStart(e) {
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
  }

  function touchEnd(e) {
    if (!xStart || !yStart) return;

    const xEnd = e.changedTouches[0].clientX;
    const yEnd = e.changedTouches[0].clientY;

    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 20) {
        index = (index + 1) % images.length;
        showImage(index);
      } else if (xDiff < -20) {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
      }
    }

    xStart = null;
    yStart = null;
  }

  window.addEventListener('touchstart', touchStart, false);
  window.addEventListener('touchend', touchEnd, false);

  showImage(index);
});
