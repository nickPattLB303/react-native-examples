/**
 * React Native Training Course - Enhanced Slide Functionality
 * 
 * This file contains common JavaScript functionality used across all slide decks,
 * with enhanced interactivity and visual effects.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Reveal.js with enhanced configuration
  Reveal.initialize({
    // Display presentation controls
    controls: true,
    
    // Display a presentation progress bar
    progress: true,
    
    // Display the page number of the current slide
    slideNumber: function(slide) {
      return `<span class="slide-number-current">${slide.h + 1}</span>/<span class="slide-number-total">${Reveal.getTotalSlides()}</span>`;
    },
    
    // Push each slide change to the browser history
    history: true,
    
    // Enable keyboard shortcuts for navigation
    keyboard: true,
    
    // Enable the slide overview mode
    overview: true,
    
    // Vertical centering of slides
    center: false,
    
    // Enable touch navigation on devices with touch input
    touch: true,
    
    // Loop the presentation
    loop: false,
    
    // Change the presentation direction to be RTL
    rtl: false,
    
    // See https://github.com/hakimel/reveal.js/#navigation-mode
    navigationMode: 'default',
    
    // Transition style - enhanced
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // Transition speed
    transitionSpeed: 'default', // default/fast/slow
    
    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Number of slides away from the current that are visible
    viewDistance: 3,
    
    // The "normal" size of the presentation, aspect ratio will be preserved
    width: 1200,
    height: 700,
    
    // Factor of the display size that should remain empty around the content
    margin: 0.1,
    
    // Enable slide navigation via mouse wheel
    mouseWheel: true,
    
    // Hide cursor when inactive
    hideInactiveCursor: true,
    
    // Time before the cursor is hidden (in ms)
    hideCursorTime: 3000,
    
    // Plugins configuration
    plugins: [ RevealHighlight, RevealNotes, RevealZoom, RevealSearch, RevealMarkdown ]
  });

  // Enhanced event listeners
  // Update slide numbers in footer
  updateSlideNumbers();
  Reveal.on('slidechanged', updateSlideNumbers);
  Reveal.on('ready', updateSlideNumbers);

  // Apply module-specific styling based on data attribute
  applyModuleStyling();

  // Initialize code snippets with proper syntax highlighting
  highlightCode();

  // Add platform-specific toggle functionality
  setupPlatformToggles();
  
  // Setup learning path toggles
  setupLearningPathToggles();
  
  // Add animation to content boxes
  animateContentBoxes();
  
  // Initialize interactive elements
  initializeInteractiveElements();
  
  // Add keyboard shortcut for platform toggles
  document.addEventListener('keydown', function(event) {
    // Alt + 1-4 for platform toggles
    if (event.altKey && event.key >= '1' && event.key <= '4') {
      const platforms = ['android', 'ios', 'react', 'angular'];
      const platformIndex = parseInt(event.key) - 1;
      if (platformIndex < platforms.length) {
        const platformButton = document.querySelector(`.platform-toggle[data-platform="${platforms[platformIndex]}"]`);
        if (platformButton) {
          platformButton.click();
        }
      }
    }
    
    // Alt + Q/W/E for learning path toggles
    if (event.altKey) {
      if (event.key === 'q') {
        const button = document.querySelector('.path-toggle[data-path="instructor"]');
        if (button) button.click();
      } else if (event.key === 'w') {
        const button = document.querySelector('.path-toggle[data-path="self"]');
        if (button) button.click();
      } else if (event.key === 'e') {
        const button = document.querySelector('.path-toggle[data-path="async"]');
        if (button) button.click();
      }
    }
  });
  
  // Add progress indicator for exercises and challenges
  setupProgressTracking();
});

/**
 * Updates the slide numbers in the footer with enhanced formatting
 */
function updateSlideNumbers() {
  const indices = Reveal.getIndices();
  const totalSlides = Reveal.getTotalSlides();
  const slideNumberElement = document.querySelector('.slide-number');
  
  if (slideNumberElement) {
    // Get current slide title if available
    let slideTitle = '';
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide) {
      const heading = currentSlide.querySelector('h2, h3');
      if (heading) {
        slideTitle = heading.textContent;
      }
    }
    
    // Update slide number with title if available
    if (slideTitle) {
      slideNumberElement.innerHTML = `<span class="slide-number-current">${indices.h + 1}</span>/<span class="slide-number-total">${totalSlides}</span> - ${slideTitle}`;
    } else {
      slideNumberElement.innerHTML = `<span class="slide-number-current">${indices.h + 1}</span>/<span class="slide-number-total">${totalSlides}</span>`;
    }
  }
}

/**
 * Applies module-specific styling based on data attribute with enhanced visual effects
 */
function applyModuleStyling() {
  const moduleNumber = document.body.getAttribute('data-module');
  if (moduleNumber) {
    document.body.classList.add(`module-${moduleNumber}`);
    
    // Update header and footer with module gradient
    const header = document.querySelector('.slide-header');
    const footer = document.querySelector('.slide-footer');
    
    if (header && moduleNumber) {
      header.style.background = `var(--module-gradient)`;
    }
    
    if (footer && moduleNumber) {
      footer.style.background = `var(--module-gradient)`;
    }
    
    // Update document title with module information
    const titleElement = document.querySelector('title');
    if (titleElement) {
      const moduleTitle = document.querySelector('.header-title');
      if (moduleTitle) {
        titleElement.textContent = moduleTitle.textContent + ' - React Native Training Course';
      }
    }
    
    // Add module badge to title slide
    const titleSlide = document.querySelector('.slides section:first-child');
    if (titleSlide) {
      const moduleBadge = document.createElement('div');
      moduleBadge.className = 'module-badge';
      moduleBadge.style.position = 'absolute';
      moduleBadge.style.top = '10px';
      moduleBadge.style.right = '10px';
      moduleBadge.style.background = `var(--module-gradient)`;
      moduleBadge.style.color = 'white';
      moduleBadge.style.padding = '5px 10px';
      moduleBadge.style.borderRadius = '4px';
      moduleBadge.style.fontSize = '0.8em';
      moduleBadge.style.fontWeight = 'bold';
      moduleBadge.textContent = `Module ${moduleNumber}`;
      titleSlide.appendChild(moduleBadge);
    }
  }
}

/**
 * Highlights code blocks using highlight.js with enhanced styling
 */
function highlightCode() {
  document.querySelectorAll('pre code').forEach((block) => {
    // Add line numbers
    block.classList.add('line-numbers');
    
    // Highlight the code
    hljs.highlightBlock(block);
    
    // Add copy button
    const pre = block.parentNode;
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '5px';
    copyButton.style.right = '5px';
    copyButton.style.padding = '3px 8px';
    copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '3px';
    copyButton.style.fontSize = '0.8em';
    copyButton.style.cursor = 'pointer';
    
    copyButton.addEventListener('click', function() {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
    
    if (pre.style.position !== 'relative') {
      pre.style.position = 'relative';
    }
    pre.appendChild(copyButton);
    
    // Add language indicator
    const language = block.className.match(/language-(\w+)/)?.[1];
    if (language) {
      const languageIndicator = document.createElement('div');
      languageIndicator.className = 'language-indicator';
      languageIndicator.textContent = language;
      languageIndicator.style.position = 'absolute';
      languageIndicator.style.bottom = '5px';
      languageIndicator.style.right = '5px';
      languageIndicator.style.padding = '2px 5px';
      languageIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      languageIndicator.style.borderRadius = '3px';
      languageIndicator.style.fontSize = '0.7em';
      pre.appendChild(languageIndicator);
    }
  });
}

/**
 * Sets up platform-specific toggle functionality with enhanced UI feedback
 */
function setupPlatformToggles() {
  // Get user's background from localStorage if available
  const userBackground = localStorage.getItem('userBackground');
  
  // Hide all platform callouts initially
  document.querySelectorAll('.platform-callout').forEach(el => {
    el.style.display = 'none';
  });
  
  if (userBackground) {
    // Show relevant platform callouts
    document.querySelectorAll(`.${userBackground}-callout`).forEach(el => {
      el.style.display = 'block';
    });
    
    // Add active class to the selected background button
    const activeButton = document.querySelector(`.platform-toggle[data-platform="${userBackground}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  } else {
    // If no preference is set, show all platform callouts
    document.querySelectorAll('.platform-callout').forEach(el => {
      el.style.display = 'block';
    });
  }
  
  // Add click handlers to platform toggle buttons
  document.querySelectorAll('.platform-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      
      // Check if this button is already active
      const isActive = this.classList.contains('active');
      
      // Remove active class from all buttons
      document.querySelectorAll('.platform-toggle').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // If clicking an already active button, show all platforms
      if (isActive) {
        localStorage.removeItem('userBackground');
        
        // Show all platform callouts
        document.querySelectorAll('.platform-callout').forEach(el => {
          el.style.display = 'block';
          
          // Add fade-in animation
          el.style.animation = 'fadeIn 0.3s ease-in-out';
        });
        
        // Show notification
        showNotification('Showing all platform content');
      } else {
        // Save user preference
        localStorage.setItem('userBackground', platform);
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all platform callouts
        document.querySelectorAll('.platform-callout').forEach(el => {
          el.style.display = 'none';
        });
        
        // Show relevant platform callouts with animation
        document.querySelectorAll(`.${platform}-callout`).forEach(el => {
          el.style.display = 'block';
          
          // Add fade-in animation
          el.style.animation = 'fadeIn 0.3s ease-in-out';
        });
        
        // Show notification
        showNotification(`Showing ${platform} content`);
      }
    });
  });
}

/**
 * Sets up learning path toggle functionality
 */
function setupLearningPathToggles() {
  // Get user's learning path from localStorage if available
  const learningPath = localStorage.getItem('learningPath') || 'instructor';
  
  // Hide all path-specific content initially
  document.querySelectorAll('[data-path]').forEach(el => {
    if (el.getAttribute('data-path') !== 'all') {
      el.style.display = 'none';
    }
  });
  
  // Show content for the selected path
  document.querySelectorAll(`[data-path="${learningPath}"], [data-path="all"]`).forEach(el => {
    el.style.display = 'block';
  });
  
  // Add active class to the selected path button
  const activeButton = document.querySelector(`.path-toggle[data-path="${learningPath}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Add click handlers to learning path toggle buttons
  document.querySelectorAll('.path-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const path = this.getAttribute('data-path');
      
      // Save user preference
      localStorage.setItem('learningPath', path);
      
      // Remove active class from all buttons
      document.querySelectorAll('.path-toggle').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all path-specific content
      document.querySelectorAll('[data-path]').forEach(el => {
        if (el.getAttribute('data-path') !== 'all') {
          el.style.display = 'none';
        }
      });
      
      // Show content for selected path with animation
      document.querySelectorAll(`[data-path="${path}"], [data-path="all"]`).forEach(el => {
        el.style.display = 'block';
        
        // Add fade-in animation
        el.style.animation = 'fadeIn 0.3s ease-in-out';
      });
      
      // Show notification
      showNotification(`Switched to ${path} learning path`);
    });
  });
}

/**
 * Shows a temporary notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
  // Remove any existing notification
  const existingNotification = document.querySelector('.slide-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'slide-notification';
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '60px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  notification.style.color = 'white';
  notification.style.padding = '8px 16px';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '1000';
  notification.style.fontSize = '0.9rem';
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 2000);
}

/**
 * Animates content boxes when they come into view
 */
function animateContentBoxes() {
  // Add animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Add animation to content boxes when slide changes
  Reveal.on('slidechanged', function(event) {
    const currentSlide = event.currentSlide;
    
    // Animate content boxes
    const contentBoxes = currentSlide.querySelectorAll('.info-box, .warning-box, .tip-box, .exercise-box, .challenge-box');
    contentBoxes.forEach((box, index) => {
      box.style.opacity = '0';
      box.style.animation = 'none';
      
      setTimeout(() => {
        box.style.opacity = '1';
        box.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
      }, 100);
    });
    
    // Animate platform callouts
    const platformCallouts = currentSlide.querySelectorAll('.platform-callout');
    platformCallouts.forEach((callout, index) => {
      if (callout.style.display !== 'none') {
        callout.style.opacity = '0';
        callout.style.animation = 'none';
        
        setTimeout(() => {
          callout.style.opacity = '1';
          callout.style.animation = `slideInRight 0.5s ease forwards ${index * 0.2}s`;
        }, 300);
      }
    });
    
    // Animate code blocks
    const codeBlocks = currentSlide.querySelectorAll('pre');
    codeBlocks.forEach((block, index) => {
      block.style.opacity = '0';
      block.style.animation = 'none';
      
      setTimeout(() => {
        block.style.opacity = '1';
        block.style.animation = `slideInLeft 0.5s ease forwards ${index * 0.2}s`;
      }, 500);
    });
  });
}

/**
 * Initializes interactive elements in the slides
 */
function initializeInteractiveElements() {
  // Add click-to-zoom functionality for images
  document.querySelectorAll('.reveal img:not(.no-zoom)').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.cursor = 'zoom-out';
      
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.style.maxWidth = '90%';
      zoomedImg.style.maxHeight = '90%';
      zoomedImg.style.objectFit = 'contain';
      zoomedImg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
      
      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', function() {
        this.remove();
      });
    });
  });
  
  // Add collapsible sections
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.style.cursor = 'pointer';
    header.style.userSelect = 'none';
    
    // Add indicator
    const indicator = document.createElement('span');
    indicator.textContent = '▼';
    indicator.style.marginLeft = '10px';
    indicator.style.fontSize = '0.8em';
    indicator.style.transition = 'transform 0.3s ease';
    header.appendChild(indicator);
    
    // Get the content to collapse
    const content = header.nextElementSibling;
    if (content && content.classList.contains('collapsible-content')) {
      // Initially collapsed
      content.style.display = 'none';
      indicator.style.transform = 'rotate(-90deg)';
      
      header.addEventListener('click', function() {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          indicator.style.transform = 'rotate(0deg)';
        } else {
          content.style.display = 'none';
          indicator.style.transform = 'rotate(-90deg)';
        }
      });
    }
  });
}

/**
 * Sets up progress tracking for exercises and challenges
 */
function setupProgressTracking() {
  // Get completed items from localStorage
  const completedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
  
  // Add checkboxes to exercises and challenges
  document.querySelectorAll('.exercise-box, .challenge-box').forEach(box => {
    const title = box.querySelector('h3')?.textContent || 'Untitled';
    const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Create checkbox container
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'progress-checkbox';
    checkboxContainer.style.position = 'absolute';
    checkboxContainer.style.top = '10px';
    checkboxContainer.style.right = '10px';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = completedItems.includes(id);
    checkbox.style.transform = 'scale(1.5)';
    
    // Create label
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = 'Completed';
    label.style.marginLeft = '5px';
    label.style.fontSize = '0.8em';
    
    // Add event listener
    checkbox.addEventListener('change', function() {
      const completedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
      
      if (this.checked) {
        if (!completedItems.includes(id)) {
          completedItems.push(id);
        }
        showNotification(`Marked "${title}" as completed`);
      } else {
        const index = completedItems.indexOf(id);
        if (index !== -1) {
          completedItems.splice(index, 1);
        }
        showNotification(`Marked "${title}" as incomplete`);
      }
      
      localStorage.setItem('completedItems', JSON.stringify(completedItems));
      updateProgressIndicator();
    });
    
    // Assemble and add to box
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    box.appendChild(checkboxContainer);
  });
  
  // Add overall progress indicator to header
  const header = document.querySelector('.slide-header');
  if (header) {
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    progressIndicator.style.marginLeft = 'auto';
    progressIndicator.style.marginRight = '20px';
    progressIndicator.style.fontSize = '0.9em';
    header.appendChild(progressIndicator);
    
    updateProgressIndicator();
  }
  
  function updateProgressIndicator() {
    const progressIndicator = document.querySelector('.progress-indicator');
    if (!progressIndicator) return;
    
    const completedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
    const totalItems = document.querySelectorAll('.exercise-box, .challenge-box').length;
    const completedCount = completedItems.length;
    const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
    
    progressIndicator.innerHTML = `Progress: <strong>${percentage}%</strong> (${completedCount}/${totalItems})`;
  }
}

/**
 * Creates and initializes a code editor for interactive examples
 * @param {string} elementId - The ID of the container element
 * @param {string} language - The programming language
 * @param {string} initialCode - The initial code to display
 * @param {Function} runCallback - Callback function when Run button is clicked
 */
function createCodeEditor(elementId, language, initialCode, runCallback) {
  const container = document.getElementById(elementId);
  if (!container) return;
  
  // Create editor elements
  const editorContainer = document.createElement('div');
  editorContainer.className = 'code-editor-container';
  
  const editor = document.createElement('div');
  editor.className = 'code-editor';
  editor.setAttribute('contenteditable', 'true');
  editor.textContent = initialCode;
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'code-editor-buttons';
  
  const runButton = document.createElement('button');
  runButton.className = 'run-button';
  runButton.textContent = 'Run';
  runButton.addEventListener('click', function() {
    if (typeof runCallback === 'function') {
      runCallback(editor.textContent);
    }
  });
  
  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.textContent = 'Reset';
  resetButton.addEventListener('click', function() {
    editor.textContent = initialCode;
    highlightEditorCode(editor, language);
  });
  
  // Assemble the editor
  buttonContainer.appendChild(runButton);
  buttonContainer.appendChild(resetButton);
  editorContainer.appendChild(editor);
  editorContainer.appendChild(buttonContainer);
  container.appendChild(editorContainer);
  
  // Add result container if needed
  const resultContainer = document.createElement('div');
  resultContainer.className = 'code-result';
  resultContainer.innerHTML = '<div class="result-header">Output:</div><div class="result-content"></div>';
  container.appendChild(resultContainer);
  
  // Initialize syntax highlighting
  highlightEditorCode(editor, language);
  
  // Add input event for live syntax highlighting
  editor.addEventListener('input', function() {
    highlightEditorCode(editor, language);
  });
  
  return {
    getCode: function() {
      return editor.textContent;
    },
    setCode: function(code) {
      editor.textContent = code;
      highlightEditorCode(editor, language);
    },
    showResult: function(result) {
      const resultContent = resultContainer.querySelector('.result-content');
      if (resultContent) {
        resultContent.innerHTML = result;
      }
    }
  };
}

/**
 * Applies syntax highlighting to a contenteditable code editor
 * @param {HTMLElement} editor - The editor element
 * @param {string} language - The programming language
 */
function highlightEditorCode(editor, language) {
  const code = editor.textContent;
  const highlighted = hljs.highlight(code, { language }).value;
  
  // Preserve cursor position
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const startOffset = range.startOffset;
  const startContainer = range.startContainer;
  
  // Update content with highlighted code
  editor.innerHTML = highlighted;
  
  // Restore cursor position (simplified approach)
  try {
    const newRange = document.createRange();
    newRange.setStart(editor.childNodes[0] || editor, Math.min(startOffset, (editor.childNodes[0] || editor).length));
    newRange.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(newRange);
  } catch (e) {
    // Fallback if we can't restore cursor position
    console.warn('Could not restore cursor position', e);
  }
}

/**
 * Toggles visibility of content based on learning path
 * @param {string} path - The learning path to show ('instructor', 'self', 'async')
 */
function toggleLearningPath(path) {
  // Hide all learning path content
  document.querySelectorAll('[data-path]').forEach(el => {
    el.style.display = 'none';
  });
  
  // Show content for selected path
  document.querySelectorAll(`[data-path="${path}"], [data-path="all"]`).forEach(el => {
    el.style.display = 'block';
  });
  
  // Update active state on toggle buttons
  document.querySelectorAll('.path-toggle').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeButton = document.querySelector(`.path-toggle[data-path="${path}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Save preference
  localStorage.setItem('learningPath', path);
}

// Initialize learning path from saved preference
document.addEventListener('DOMContentLoaded', function() {
  const savedPath = localStorage.getItem('learningPath') || 'instructor';
  toggleLearningPath(savedPath);
  
  // Add click handlers to learning path toggle buttons
  document.querySelectorAll('.path-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const path = this.getAttribute('data-path');
      toggleLearningPath(path);
    });
  });
});
