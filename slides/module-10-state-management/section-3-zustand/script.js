// Slide navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  // Show initial slide
  showSlide(currentSlide);
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevSlide();
    }
  });
  
  // Functions for navigation
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
  
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  }
  
  // Initialize code highlighting
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
});