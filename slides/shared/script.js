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
    
    // Add navigation buttons
    addNavigationButtons();
    
    // Make section navigation links clickable
    makeNextSectionLinksClickable();
  }
  
  // Add navigation buttons to the UI
  function addNavigationButtons() {
    const navContainer = document.createElement('div');
    navContainer.className = 'slide-navigation';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-button prev-button';
    prevButton.innerHTML = '&larr;';
    prevButton.title = 'Previous Slide';
    prevButton.addEventListener('click', prevSlide);
    
    const nextButton = document.createElement('button');
    nextButton.className = 'nav-button next-button';
    nextButton.innerHTML = '&rarr;';
    nextButton.title = 'Next Slide';
    nextButton.addEventListener('click', nextSlide);
    
    const presenterButton = document.createElement('button');
    presenterButton.className = 'nav-button presenter-button';
    presenterButton.innerHTML = 'P';
    presenterButton.title = 'Toggle Presenter Notes';
    presenterButton.addEventListener('click', togglePresenterMode);
    
    navContainer.appendChild(prevButton);
    navContainer.appendChild(presenterButton);
    navContainer.appendChild(nextButton);
    
    document.body.appendChild(navContainer);
  }
  
  // Make "Next: Section X" links clickable
  function makeNextSectionLinksClickable() {
    document.querySelectorAll('.next-steps').forEach(nextStepsElement => {
      const text = nextStepsElement.textContent;
      const sectionMatch = text.match(/Next:\s+Section\s+(\d+):\s+(.*)/i);
      
      if (sectionMatch) {
        const sectionNumber = sectionMatch[1];
        const sectionTitle = sectionMatch[2].trim();
        
        // Get current module from the URL path
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        const slidesIndex = pathParts.findIndex(part => part === 'slides');
        
        if (slidesIndex !== -1) {
          const moduleName = pathParts[slidesIndex + 1]; // e.g., "module-3-web-development-essentials"
          
          // Define module-specific section paths
          const modulePathMap = {
            'module-1-react-native-fundamentals': {
              '1': 'mobile-development-landscape',
              '2': 'why-react-native',
              '3': 'react-native-internals',
              '4': 'react-native-documentation'
            },
            'module-2-environment-setup': {
              '1': 'development-tools-installation',
              '2': 'creating-first-expo-project',
              '3': 'running-on-simulators-and-devices',
              '4': 'project-structure-and-configuration'
            },
            'module-3-web-development-essentials': {
              '1': 'web-history',
              '2': 'browser-fundamentals',
              '3': 'html-basics',
              '4': 'css-basics'
            },
            'module-4-javascript-essentials': {
              '1': 'javascript-fundamentals',
              '2': 'functions-and-scope',
              '3': 'arrays-and-objects',
              '4': 'asynchronous-javascript'
            }
          };
          
          // Get the correct path for this section number in the current module
          let sectionPath;
          if (modulePathMap[moduleName] && modulePathMap[moduleName][sectionNumber]) {
            sectionPath = modulePathMap[moduleName][sectionNumber];
          } else {
            // Fallback: convert the section title to a path format
            sectionPath = sectionTitle.toLowerCase().replace(/\s+/g, '-');
          }
          
          // Create a link that replaces the text
          const link = document.createElement('a');
          link.href = `../section-${sectionNumber}-${sectionPath}/index.html`;
          link.innerHTML = `<strong>Next:</strong> Section ${sectionNumber}: ${sectionTitle}`;
          
          // Clear the element and add the link
          nextStepsElement.innerHTML = '';
          nextStepsElement.appendChild(link);
        }
      }
    });
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
    
    // Find all presenter notes and toggle their visibility
    document.querySelectorAll('.presenter-notes').forEach(notes => {
      notes.style.display = isPresenterMode ? 'block' : 'none';
    });
    
    // Add/remove presenter mode class to body
    if (isPresenterMode) {
      document.body.classList.add('presenter-mode');
      console.log('Presenter mode enabled');
    } else {
      document.body.classList.remove('presenter-mode');
      console.log('Presenter mode disabled');
    }
    
    // Add visual indicator for presenter mode
    let indicator = document.getElementById('presenter-mode-indicator');
    if (isPresenterMode) {
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'presenter-mode-indicator';
        indicator.textContent = 'Presenter Mode';
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.left = '10px';
        indicator.style.backgroundColor = 'rgba(255, 87, 34, 0.8)';
        indicator.style.color = 'white';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '4px';
        indicator.style.zIndex = '2000';
        document.body.appendChild(indicator);
      }
    } else if (indicator) {
      indicator.remove();
    }
  }
  
  // Keyboard event handler
  function handleKeyDown(e) {
    // Don't handle events if they're in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        nextSlide();
        break;
      case 'ArrowLeft':
        prevSlide();
        break;
      case 'Home':
        goToSlide(0);
        break;
      case 'End':
        goToSlide(slides.length - 1);
        break;
      case 'p':
      case 'P':
        // Toggle presenter mode
        togglePresenterMode();
        e.preventDefault();
        break;
      case 'n':
      case 'N':
        nextSlide();
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
  
  // Add section navigation menu
  function addSectionNavMenu() {
    // Create the navigation menu container
    const navMenu = document.createElement('div');
    navMenu.className = 'section-nav-menu collapsed'; // Start collapsed
    
    // Create the menu toggle button (simplified)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'section-nav-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.title = 'Toggle Section Navigation';
    
    // Create the menu content
    const menuContent = document.createElement('div');
    menuContent.className = 'section-nav-content';
    menuContent.style.display = 'none';
    
    // Get base path for navigation
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    
    // Find the index of 'slides' in the path
    const slidesIndex = pathParts.findIndex(part => part === 'slides');
    if (slidesIndex === -1) return; // Not in slides directory
    
    // Extract the module name from the path
    const moduleName = pathParts[slidesIndex + 1]; // e.g., "module-3-web-development-essentials"
    if (!moduleName || !moduleName.startsWith('module-')) return; // Not in a module directory
    
    // Build the base path up to the module directory
    const moduleBasePath = pathParts.slice(0, slidesIndex + 2).join('/');
    
    // Add module overview link
    const moduleLink = document.createElement('a');
    moduleLink.href = `${moduleBasePath}/index.html`;
    moduleLink.textContent = 'Module Overview';
    moduleLink.className = 'section-nav-link module-link';
    menuContent.appendChild(moduleLink);
    
    // Define module-specific sections based on the current module
    const moduleMap = {
      'module-1-react-native-fundamentals': [
        { num: 1, name: 'mobile-development-landscape' },
        { num: 2, name: 'why-react-native' },
        { num: 3, name: 'react-native-internals' },
        { num: 4, name: 'react-native-documentation' }
      ],
      'module-2-environment-setup': [
        { num: 1, name: 'development-tools-installation' },
        { num: 2, name: 'creating-first-expo-project' },
        { num: 3, name: 'running-on-simulators-and-devices' },
        { num: 4, name: 'project-structure-and-configuration' }
      ],
      'module-3-web-development-essentials': [
        { num: 1, name: 'web-history' },
        { num: 2, name: 'browser-fundamentals' },
        { num: 3, name: 'html-basics' },
        { num: 4, name: 'css-basics' }
      ],
      'module-4-javascript-essentials': [
        { num: 1, name: 'javascript-fundamentals' },
        { num: 2, name: 'functions-and-scope' },
        { num: 3, name: 'arrays-and-objects' },
        { num: 4, name: 'asynchronous-javascript' }
      ],
      'module-5-typescript-essentials': [
        { num: 1, name: 'typescript-fundamentals' },
        { num: 2, name: 'advanced-types-and-interfaces' },
        { num: 3, name: 'typescript-with-react-native' },
        { num: 4, name: 'managing-type-definitions' }
      ],
      'module-6-react-essentials': [
        { num: 1, name: 'introduction-to-react' },
        { num: 2, name: 'components-and-jsx' },
        { num: 3, name: 'props-and-component-composition' },
        { num: 4, name: 'state-and-hooks' },
        { num: 5, name: 'component-lifecycle-and-effects' },
      ]
      // Add more modules as needed
    };
    
    // Get sections for this module, or use an empty array if not defined
    const sections = moduleMap[moduleName] || [];
    
    // If we have no predefined sections, try to scan for section directories
    if (sections.length === 0) {
      console.log('No predefined sections found for module:', moduleName);
    }
    
    // Add links for each section
    sections.forEach(section => {
      const sectionLink = document.createElement('a');
      sectionLink.href = `${moduleBasePath}/section-${section.num}-${section.name}/index.html`;
      const sectionTitle = section.name.replace(/-/g, ' ');
      sectionLink.textContent = `Section ${section.num}: ${sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1)}`;
      sectionLink.className = 'section-nav-link';
      
      // Highlight current section
      if (currentPath.includes(`section-${section.num}`)) {
        sectionLink.classList.add('current-section');
      }
      
      menuContent.appendChild(sectionLink);
    });
    
    // Toggle menu visibility when clicking the toggle button
    menuToggle.addEventListener('click', function() {
      if (menuContent.style.display === 'none') {
        menuContent.style.display = 'block';
        navMenu.classList.remove('collapsed');
      } else {
        menuContent.style.display = 'none';
        navMenu.classList.add('collapsed');
      }
    });
    
    // Add elements to the menu
    navMenu.appendChild(menuToggle);
    navMenu.appendChild(menuContent);
    
    // Add the menu to the document
    document.body.appendChild(navMenu);
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initSlides();
    setupPlatformSpecificContent();
    addSectionNavMenu();
    
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
    // Simple approach: just escape HTML entities
    const code = block.textContent;
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Set the escaped content
    block.innerHTML = escapedCode;
    
    // Add a class to the pre element for styling
    block.parentElement.classList.add('code-block');
  });
}); 