/**
 * React Native Training Course - Common Slide Functionality
 * 
 * This file contains common JavaScript functionality used across all slide decks.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Reveal.js with common configuration
  Reveal.initialize({
    // Display presentation controls
    controls: true,
    
    // Display a presentation progress bar
    progress: true,
    
    // Display the page number of the current slide
    slideNumber: true,
    
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
    
    // Transition style
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // Transition speed
    transitionSpeed: 'default', // default/fast/slow
    
    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Number of slides away from the current that are visible
    viewDistance: 3,
    
    // Parallax background image
    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
    
    // Parallax background size
    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"
    
    // Number of pixels to move the parallax background per slide
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,
    
    // The "normal" size of the presentation, aspect ratio will be preserved
    width: 1200,
    height: 700,
    
    // Factor of the display size that should remain empty around the content
    margin: 0.1,
    
    // Plugins configuration
    plugins: [ RevealHighlight, RevealNotes, RevealZoom ]
  });

  // Add slide numbers to footer
  updateSlideNumbers();
  Reveal.on('slidechanged', updateSlideNumbers);

  // Add module-specific styling based on data attribute
  applyModuleStyling();

  // Initialize code snippets with proper syntax highlighting
  highlightCode();

  // Add platform-specific toggle functionality
  setupPlatformToggles();
});

/**
 * Updates the slide numbers in the footer
 */
function updateSlideNumbers() {
  const indices = Reveal.getIndices();
  const totalSlides = Reveal.getTotalSlides();
  const slideNumberElement = document.querySelector('.slide-number');
  
  if (slideNumberElement) {
    slideNumberElement.textContent = `Slide ${indices.h + 1}/${totalSlides}`;
  }
}

/**
 * Applies module-specific styling based on data attribute
 */
function applyModuleStyling() {
  const moduleNumber = document.body.getAttribute('data-module');
  if (moduleNumber) {
    document.body.classList.add(`module-${moduleNumber}`);
    
    // Update header and footer with module color
    const header = document.querySelector('.slide-header');
    const footer = document.querySelector('.slide-footer');
    
    if (header && moduleNumber) {
      header.style.backgroundColor = `var(--module-color)`;
    }
    
    if (footer && moduleNumber) {
      footer.style.backgroundColor = `var(--module-color)`;
    }
  }
}

/**
 * Highlights code blocks using highlight.js
 */
function highlightCode() {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

/**
 * Sets up platform-specific toggle functionality
 */
function setupPlatformToggles() {
  // Get user's background from localStorage if available
  const userBackground = localStorage.getItem('userBackground');
  
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
  }
  
  // Add click handlers to platform toggle buttons
  document.querySelectorAll('.platform-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      
      // Save user preference
      localStorage.setItem('userBackground', platform);
      
      // Remove active class from all buttons
      document.querySelectorAll('.platform-toggle').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all platform callouts
      document.querySelectorAll('.platform-callout').forEach(el => {
        el.style.display = 'none';
      });
      
      // Show relevant platform callouts
      document.querySelectorAll(`.${platform}-callout`).forEach(el => {
        el.style.display = 'block';
      });
    });
  });
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
