// A simplified version of highlight.js for syntax highlighting
document.addEventListener('DOMContentLoaded', () => {
  // Basic syntax highlighting function
  highlightCode();
  
  function highlightCode() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    if (codeBlocks.length === 0) return;
    
    // Add the hljs class to all code blocks
    codeBlocks.forEach(block => {
      block.classList.add('hljs');
      
      // Basic syntax highlighting for common programming constructs
      const html = block.innerHTML;
      
      // Replace JavaScript/TypeScript keywords
      const keywords = [
        'import', 'export', 'from', 'const', 'let', 'var', 'function', 'return',
        'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'default',
        'try', 'catch', 'finally', 'throw', 'new', 'delete', 'typeof', 'instanceof',
        'class', 'extends', 'super', 'this', 'static', 'get', 'set', 'async', 'await',
        'interface', 'type', 'enum', 'implements', 'private', 'protected', 'public'
      ];
      
      let highlightedHtml = html;
      
      // Highlight keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlightedHtml = highlightedHtml.replace(regex, `<span class="hljs-keyword">${keyword}</span>`);
      });
      
      // Highlight strings
      highlightedHtml = highlightedHtml.replace(/'([^']*)'/g, '<span class="hljs-string">\'$1\'</span>');
      highlightedHtml = highlightedHtml.replace(/"([^"]*)"/g, '<span class="hljs-string">"$1"</span>');
      
      // Highlight comments
      highlightedHtml = highlightedHtml.replace(/\/\/(.*)/g, '<span class="hljs-comment">// $1</span>');
      
      // Highlight numbers
      highlightedHtml = highlightedHtml.replace(/\b(\d+)\b/g, '<span class="hljs-number">$1</span>');
      
      // Update the code block with highlighted content
      block.innerHTML = highlightedHtml;
    });
  }
});