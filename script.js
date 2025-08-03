document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');
  const sidebar = document.getElementById('sidebar');
  const mainImage = document.getElementById('main-image');

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const imageSrc = link.getAttribute('data-image');
      mainImage.src = imageSrc;
      sidebar.classList.remove('open');
    });
  });
});
