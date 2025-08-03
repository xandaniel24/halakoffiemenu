document.getElementById('toggleSidebar').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
});

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const imagePath = this.getAttribute('data-image');
    document.getElementById('slideshow').src = imagePath;
    document.getElementById('sidebar').classList.remove('open');
  });
});

document.getElementById('fsBtn').addEventListener('click', function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
