/* ===== SETUP ===== */
const images = [
  'images/Artboard 1.png', 'images/Artboard 2.png', 'images/Artboard 3.png', 'images/Artboard 4.png',
  'images/Artboard 5.png', 'images/Artboard 6.png', 'images/Artboard 7.png', 'images/Artboard 8.png',
  'images/Artboard 9.png', 'images/Artboard 10.png'
];

let index = 0;
const img = document.getElementById('slideshow');
const toggle = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

/* ===== SLIDESHOW FUNCTION ===== */
function showImage(i) {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = images[i];
    img.style.opacity = 1;
  }, 200);
}

/* ===== MENU CLICK HANDLER ===== */
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const imgSrc = this.getAttribute('data-image');

    img.style.opacity = 0;
    setTimeout(() => {
      img.src = imgSrc;
      img.style.opacity = 1;
    }, 200);

    sidebar.classList.remove('show');

    // Update index berdasarkan nama file
    const filename = imgSrc.split('/').pop();
    index = images.findIndex(path => path.split('/').pop() === filename);
  });
});

/* ===== SWIPE HANDLER ===== */
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

/* ===== SIDEBAR TOGGLE ===== */
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});
