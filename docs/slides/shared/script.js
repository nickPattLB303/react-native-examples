/**
 * React Native Training Course Slides
 * Navigation and functionality script
 */

(function() {
  // DOM elements
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let isPresenterMode = false;
  
  // Initialize slides
  function initSlides() {
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
      slide.style.display = index === 0 ? 'flex' : 'none';
      
      // Add slide numbers
      const slideNumber = document.createElement('div');
      slideNumber.className = 'slide-number';
      slideNumber.textContent = `${index + 1}/${slides.length}`;
      slide.appendChild(slideNumber);
      
      // Setup presenter notes if they exist
      const presenterNotes = slide.querySelector('.presenter-notes');
      if (presenterNotes) {
        presenterNotes.style.display = 'none';
      }
    });
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);
    
    // Add swipe event listeners for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        nextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        prevSlide();
      }
    }
    
    // Add URL hash navigation
    if (window.location.hash) {
      const slideIndex = parseInt(window.location.hash.substring(1)) - 1;
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slides.length) {
        goToSlide(slideIndex);
      }
    }
  }
  
  // Navigation functions
  function goToSlide(index) {
    if (index < 0) {
      index = 0;
    } else if (index >= slides.length) {
      index = slides.length - 1;
    }
    
    slides[currentSlide].style.display = 'none';
    slides[index].style.display = 'flex';
    currentSlide = index;
    
    // Update URL hash
    window.location.hash = `#${currentSlide + 1}`;
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  function togglePresenterMode() {
    isPresenterMode = !isPresenterMode;
    
    slides.forEach(slide => {
      const presenterNotes = slide.querySelector('.presenter-notes');
      if (presenterNotes) {
        presenterNotes.style.display = isPresenterMode ? 'block' : 'none';
      }
    });
    
    // Add/remove presenter mode class to body
    if (isPresenterMode) {
      document.body.classList.add('presenter-mode');
    } else {
      document.body.classList.remove('presenter-mode');
    }
  }
  
  // Keyboard event handler
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'n':
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'p':
        prevSlide();
        break;
      case 'Home':
        goToSlide(0);
        break;
      case 'End':
        goToSlide(slides.length - 1);
        break;
      case 'p':
        if (e.ctrlKey || e.metaKey) {
          togglePresenterMode();
          e.preventDefault();
        }
        break;
    }
  }
  
  // Platform-specific content
  function setupPlatformSpecificContent() {
    // Get platform preference from localStorage or URL params
    const urlParams = new URLSearchParams(window.location.search);
    let platform = urlParams.get('platform') || localStorage.getItem('platform') || 'all';
    
    // Set initial platform visibility
    setPlatformVisibility(platform);
    
    // Create platform selector
    const platformSelector = document.createElement('div');
    platformSelector.className = 'platform-selector';
    platformSelector.innerHTML = `
      <label>Platform focus:</label>
      <select id="platform-select">
        <option value="all" ${platform === 'all' ? 'selected' : ''}>All Platforms</option>
        <option value="android" ${platform === 'android' ? 'selected' : ''}>Android</option>
        <option value="ios" ${platform === 'ios' ? 'selected' : ''}>iOS</option>
        <option value="web" ${platform === 'web' ? 'selected' : ''}>Web</option>
      </select>
    `;
    
    document.body.appendChild(platformSelector);
    
    // Add event listener to platform selector
    document.getElementById('platform-select').addEventListener('change', function(e) {
      const selectedPlatform = e.target.value;
      setPlatformVisibility(selectedPlatform);
      localStorage.setItem('platform', selectedPlatform);
    });
  }
  
  function setPlatformVisibility(platform) {
    const androidElements = document.querySelectorAll('.platform-android');
    const iosElements = document.querySelectorAll('.platform-ios');
    const webElements = document.querySelectorAll('.platform-web');
    
    if (platform === 'all') {
      // Show all platform-specific content
      androidElements.forEach(el => el.style.display = 'block');
      iosElements.forEach(el => el.style.display = 'block');
      webElements.forEach(el => el.style.display = 'block');
    } else {
      // Show only selected platform content
      androidElements.forEach(el => el.style.display = platform === 'android' ? 'block' : 'none');
      iosElements.forEach(el => el.style.display = platform === 'ios' ? 'block' : 'none');
      webElements.forEach(el => el.style.display = platform === 'web' ? 'block' : 'none');
    }
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initSlides();
    setupPlatformSpecificContent();
    
    // Add print button
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.textContent = 'Print Slides';
    printButton.addEventListener('click', function() {
      window.print();
    });
    document.body.appendChild(printButton);
  });
})();

// Syntax highlighting
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach((block) => {
    highlightCode(block);
  });
});

// Simple syntax highlighter
function highlightCode(element) {
  const code = element.textContent;
  
  // JavaScript/JSX highlighting patterns
  const patterns = [
    { pattern: /(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|=>)/g, className: 'hljs-keyword' },
    { pattern: /(["'`])(?:(?=(\\?))\2.)*?\1/g, className: 'hljs-string' },
    { pattern: /\/\/.*|\/\*[\s\S]*?\*\//g, className: 'hljs-comment' },
    { pattern: /\b\d+\b/g, className: 'hljs-number' },
    { pattern: /\b(React|useState|useEffect|useContext|useRef)\b/g, className: 'hljs-function' },
    { pattern: /(<\/?[a-zA-Z][a-zA-Z0-9]*>?)/g, className: 'hljs-tag' },
    { pattern: /([a-zA-Z]+)=/g, className: 'hljs-attr' },
    { pattern: /\b(true|false|null|undefined)\b/g, className: 'hljs-built_in' }
  ];
  
  let highlightedCode = code;
  
  // Apply syntax highlighting
  patterns.forEach(({ pattern, className }) => {
    highlightedCode = highlightedCode.replace(pattern, match => 
      `<span class="${className}">${match}</span>`
    );
  });
  
  element.innerHTML = highlightedCode;
} 