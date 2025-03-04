document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentSlideIndex = 0;

  function showSlide(index) {
    // Ensure the index is within bounds
    if (index < 0) {
      index = 0;
    } else if (index >= slides.length) {
      index = slides.length - 1;
    }

    // Update current slide index
    currentSlideIndex = index;
    
    // Hide all slides
    slides.forEach((slide, i) => {
      slide.style.display = 'none';
    });
    
    // Show the current slide
    slides[currentSlideIndex].style.display = 'flex';
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  // Add keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      nextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      prevSlide();
    }
  });

  // Initialize - show the first slide
  showSlide(0);
  
  // Initialize code highlighting if available
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
}); 