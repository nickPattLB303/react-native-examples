document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlideIndex = 0;

  // Function to show the active slide
  function showSlide(index) {
    // Keep index within bounds
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    // Update current index
    currentSlideIndex = index;

    // Hide all slides and show the current one
    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  // Navigation functions
  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      nextSlide();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevSlide();
      e.preventDefault();
    }
  });

  // Initialize the first slide
  showSlide(0);

  // Initialize syntax highlighting if available
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }
});