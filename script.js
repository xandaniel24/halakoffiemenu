/* ===== SETUP ===== */
const images = [
  'images/Artboard 1.png','images/Artboard 2.png','images/Artboard 3.png','images/Artboard 4.png',
  'images/Artboard 5.png','images/Artboard 6.png','images/Artboard 7.png','images/Artboard 8.png',
  'images/Artboard 9.png','images/Artboard 10.png'
];

let index = 0;
const img     = document.getElementById('slideshow');
const fsBtn   = document.getElementById('fsBtn');
const toggle  = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

/* ===== SLIDESHOW & MENU LINK ===== */
function showImage(i) {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = images[i];
    img.style.opacity = 1;
  }, 200);
}

// Sidebar menu image switch
document.querySelectorAll('.sidebar a').forEach((link, i) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const imgSrc = this.getAttribute('data-image');

    img.style.opacity = 0;
    setTimeout(() => {
      img.src = imgSrc;
      img.style.opacity = 1;
    }, 200);

    sidebar.classList.remove('show');

    // ✅ Update index aman berdasarkan nama file
    const filename = imgSrc.split('/').pop();
    index = images.findIndex(imgPath => imgPath.split('/').pop() === filename);
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

/* ===== FULLSCREEN ===== */
fsBtn.addEventListener('click', () => {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();

  fsBtn.style.display = 'none';
  img.style.display = 'block';
  toggle.style.display = 'block';
  sidebar.style.display = 'block';
  showImage(index);

  window.addEventListener('touchstart', touchStart, false);
  window.addEventListener('touchend', touchEnd, false);
});

/* ===== SIDEBAR TOGGLE ===== */
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

