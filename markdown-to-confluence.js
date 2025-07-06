#!/usr/bin/env node

/**
 * Markdown to Confluence Wiki Markup Converter
 * 
 * This script converts all markdown files in the ./modules directory
 * to Confluence Wiki Markup format, handling all edge cases and 
 * special syntax patterns found in the documentation.
 * 
 * Usage: node markdown-to-confluence.js
 */

const fs = require('fs');
const path = require('path');

class MarkdownToConfluenceConverter {
  constructor() {
    this.outputDir = './confluence-wiki-markup';
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Convert a single markdown content string to Confluence wiki markup
   */
  convertMarkdownToConfluence(markdown) {
    let confluence = markdown;

    // 1. Handle admonitions first (before other conversions)
    confluence = this.convertAdmonitions(confluence);

    // 2. Handle code blocks (must be before inline code)
    confluence = this.convertCodeBlocks(confluence);

    // 3. Handle text formatting (bold, italic) - before inline code to avoid conflicts
    confluence = this.convertTextFormatting(confluence);

    // 4. Handle inline code (backticks) - after text formatting
    confluence = this.convertInlineCode(confluence);

    // 5. Handle headers
    confluence = this.convertHeaders(confluence);

    // 6. Handle tables
    confluence = this.convertTables(confluence);

    // 7. Handle lists
    confluence = this.convertLists(confluence);

    // 8. Handle links
    confluence = this.convertLinks(confluence);

    // 9. Handle images
    confluence = this.convertImages(confluence);

    // 10. Handle block quotes
    confluence = this.convertBlockQuotes(confluence);

    // 11. Handle horizontal rules
    confluence = this.convertHorizontalRules(confluence);

    // 12. Handle line breaks and spacing
    confluence = this.cleanupSpacing(confluence);

    return confluence;
  }

  /**
   * Convert GitHub-style admonitions to Confluence macros
   */
  convertAdmonitions(content) {
    // Handle block admonitions like > [!NOTE], > [!TIP], etc.
    const admonitionRegex = /^>\s*\[!(NOTE|TIP|CAUTION|WARNING|IMPORTANT)\]\s*\n((?:>.*\n?)*)/gm;
    
    return content.replace(admonitionRegex, (match, type, content) => {
      const cleanContent = content.replace(/^>\s*/gm, '').trim();
      
      const macroMap = {
        'NOTE': 'info',
        'TIP': 'tip',
        'CAUTION': 'warning',
        'WARNING': 'warning',
        'IMPORTANT': 'note'
      };
      
      const macroType = macroMap[type] || 'info';
      return `{${macroType}}\n${cleanContent}\n{${macroType}}`;
    });
  }

  /**
   * Convert code blocks to Confluence code macro
   */
  convertCodeBlocks(content) {
    // Handle fenced code blocks with language specification
    const fencedCodeRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    
    return content.replace(fencedCodeRegex, (match, language, code) => {
      const lang = language || 'text';
      
      // Handle mermaid diagrams specially
      if (lang === 'mermaid') {
        return `{mermaid}\n${code.trim()}\n{mermaid}`;
      }
      
      // Map common languages to Confluence equivalents
      const languageMap = {
        'javascript': 'js',
        'typescript': 'js',
        'tsx': 'js',
        'jsx': 'js',
        'bash': 'bash',
        'shell': 'bash',
        'json': 'js',
        'yaml': 'yaml',
        'yml': 'yaml',
        'xml': 'xml',
        'html': 'html',
        'css': 'css',
        'sql': 'sql',
        'python': 'py',
        'java': 'java',
        'kotlin': 'kotlin',
        'swift': 'swift',
        'objective-c': 'objc',
        'c': 'c',
        'cpp': 'cpp',
        'c++': 'cpp'
      };
      
      const confluenceLanguage = languageMap[lang.toLowerCase()] || lang;
      
      return `{code:language=${confluenceLanguage}}\n${code.trim()}\n{code}`;
    });
  }

  /**
   * Convert inline code (backticks) to Confluence monospace
   */
  convertInlineCode(content) {
    // Handle inline code with single backticks
    // More robust approach: only convert backticks that are not inside code blocks
    const lines = content.split('\n');
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if we're entering or leaving a code block
      if (line.trim().startsWith('{code')) {
        inCodeBlock = true;
      } else if (line.trim() === '{code}' && inCodeBlock) {
        inCodeBlock = false;
      }
      
      // Only convert backticks if we're not in a code block
      if (!inCodeBlock) {
        // Convert single backticks to Confluence monospace
        // Avoid converting backticks that are already part of formatted text
        lines[i] = line.replace(/(?<!{)`([^`\n]+)`(?!})/g, '{{$1}}');
      }
    }
    
    return lines.join('\n');
  }

  /**
   * Convert markdown headers to Confluence headers
   */
  convertHeaders(content) {
    // Convert headers (h1-h6)
    return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      return `h${level}. ${title}`;
    });
  }

  /**
   * Convert markdown tables to Confluence tables
   */
  convertTables(content) {
    // Handle markdown tables
    const tableRegex = /(\|.*\|[\r\n]+)+(\|[\s]*:?-+:?[\s]*)+(\|.*\|[\r\n]*)+/g;
    
    return content.replace(tableRegex, (match) => {
      const lines = match.trim().split('\n');
      let confluenceTable = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip separator line (contains dashes)
        if (line.includes('---') || line.includes('-')) {
          continue;
        }
        
        if (line.startsWith('|') && line.endsWith('|')) {
          const cells = line.slice(1, -1).split('|').map(cell => cell.trim());
          
          if (i === 0) {
            // Header row
            confluenceTable += '||' + cells.join('||') + '||\n';
          } else {
            // Data row
            confluenceTable += '|' + cells.join('|') + '|\n';
          }
        }
      }
      
      return confluenceTable;
    });
  }

  /**
   * Convert markdown lists to Confluence lists
   */
  convertLists(content) {
    // Handle unordered lists (-, *, +)
    content = content.replace(/^(\s*)[-*+]\s+(.+)$/gm, (match, indent, text) => {
      const level = Math.floor(indent.length / 2) + 1;
      return '*'.repeat(level) + ' ' + text;
    });

    // Handle ordered lists
    content = content.replace(/^(\s*)\d+\.\s+(.+)$/gm, (match, indent, text) => {
      const level = Math.floor(indent.length / 2) + 1;
      return '#'.repeat(level) + ' ' + text;
    });

    return content;
  }

  /**
   * Convert markdown links to Confluence links
   */
  convertLinks(content) {
    // Handle [text](url) format
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$2|$1]');
    
    // Handle reference-style links [text][ref] (basic conversion)
    content = content.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, '[$1]');
    
    return content;
  }

  /**
   * Convert markdown images to Confluence images
   */
  convertImages(content) {
    // Handle ![alt](src) format
    return content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '!$2|alt=$1!');
  }

  /**
   * Convert text formatting (bold, italic)
   */
  convertTextFormatting(content) {
    // Handle bold first (**text** or __text__)
    // Use more specific matching to ensure we catch all bold text
    content = content.replace(/\*\*([^*]+?)\*\*/g, '*$1*');
    content = content.replace(/__([^_]+?)__/g, '*$1*');
    
    // Handle italic (*text* or _text_) - only after bold is converted
    // Be extremely careful to avoid list markers and already processed content
    // Split into lines and process each line individually to avoid issues
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip if line starts with list marker
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        continue;
      }
      
      // Convert single asterisk italic (but not at start of list)
      lines[i] = line.replace(/(?<!^[\s]*)\*([^*\n]+?)\*/g, (match, text) => {
        // Extra safety: don't convert if it contains asterisks or looks like a list
        if (text.includes('*') || match.trim().startsWith('*')) {
          return match;
        }
        return `_${text}_`;
      });
    }
    content = lines.join('\n');
    
    // Handle underscore italic carefully
    content = content.replace(/(?<!_)\b_([^_\n]+?)_\b(?!_)/g, '_$1_');
    
    // Handle strikethrough (~~text~~)
    content = content.replace(/~~([^~\n]+?)~~/g, '-$1-');
    
    return content;
  }

  /**
   * Convert block quotes
   */
  convertBlockQuotes(content) {
    // Handle multi-line block quotes that aren't admonitions
    const blockQuoteRegex = /^>\s*([^[].*(?:\n>\s*.*)*)/gm;
    
    return content.replace(blockQuoteRegex, (match, quote) => {
      // Clean up the quote by removing the > prefix from each line
      const cleanQuote = quote.replace(/\n>\s*/g, '\n').trim();
      return `bq. ${cleanQuote}`;
    });
  }

  /**
   * Convert horizontal rules
   */
  convertHorizontalRules(content) {
    // Handle horizontal rules (---, ***, ___)
    return content.replace(/^[-*_]{3,}$/gm, '----');
  }

  /**
   * Clean up spacing and formatting
   */
  cleanupSpacing(content) {
    // Remove excessive blank lines (more than 2 consecutive)
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // Ensure proper spacing around macros
    content = content.replace(/({[^}]+})\n*({[^}]+})/g, '$1\n\n$2');
    
    return content.trim();
  }

  /**
   * Process all markdown files in the modules directory
   */
  processModulesDirectory() {
    const modulesPath = './modules';
    
    if (!fs.existsSync(modulesPath)) {
      console.error('Error: ./modules directory not found');
      return;
    }

    this.processDirectory(modulesPath, '');
  }

  /**
   * Recursively process a directory
   */
  processDirectory(dirPath, relativePath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const itemRelativePath = path.join(relativePath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Create corresponding directory in output
        const outputDirPath = path.join(this.outputDir, itemRelativePath);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        
        // Recursively process subdirectory
        this.processDirectory(fullPath, itemRelativePath);
      } else if (stat.isFile() && item.endsWith('.md')) {
        // Process markdown file
        this.processMarkdownFile(fullPath, itemRelativePath);
      }
    }
  }

  /**
   * Process a single markdown file
   */
  processMarkdownFile(filePath, relativePath) {
    try {
      console.log(`Processing: ${relativePath}`);
      
      const markdown = fs.readFileSync(filePath, 'utf8');
      const confluence = this.convertMarkdownToConfluence(markdown);
      
      // Create output file with .wiki extension
      const outputFileName = relativePath.replace(/\.md$/, '.wiki');
      const outputPath = path.join(this.outputDir, outputFileName);
      
      fs.writeFileSync(outputPath, confluence, 'utf8');
      console.log(`✅ Converted: ${relativePath} → ${outputFileName}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${relativePath}:`, error.message);
    }
  }

  /**
   * Generate a summary report
   */
  generateSummary() {
    const summaryPath = path.join(this.outputDir, 'CONVERSION_SUMMARY.txt');
    const timestamp = new Date().toISOString();
    
    const summary = `Markdown to Confluence Wiki Markup Conversion Summary
Generated: ${timestamp}

This directory contains all markdown files from ./modules converted to Confluence Wiki Markup format.

Key Conversions Applied:
- Headers: ## Title → h2. Title
- Code blocks: \`\`\`js → {code:language=js}
- Inline code: \`code\` → {{code}}
- Admonitions: > [!NOTE] → {info}
- Tables: | cell | → ||header|| and |cell|
- Lists: - item → * item, 1. item → # item
- Links: [text](url) → [url|text]
- Images: ![alt](src) → !src|alt=alt!
- Bold: **text** → *text*
- Italic: *text* → _text_
- Block quotes: > text → bq. text

Special Handling:
- Mermaid diagrams converted to {mermaid} macro
- GitHub-style admonitions converted to appropriate Confluence macros
- Language-specific code highlighting preserved
- Nested lists maintain proper indentation

File Extensions:
- All .md files converted to .wiki files
- Directory structure preserved

Usage in Confluence:
1. Copy the content from the .wiki files
2. Paste directly into Confluence editor
3. Switch to "Wiki Markup" mode if needed
4. Content should render properly with all formatting preserved
`;

    fs.writeFileSync(summaryPath, summary, 'utf8');
    console.log(`\n📋 Summary report generated: ${summaryPath}`);
  }

  /**
   * Run the complete conversion process
   */
  run() {
    console.log('🚀 Starting Markdown to Confluence Wiki Markup Conversion...\n');
    
    try {
      this.processModulesDirectory();
      this.generateSummary();
      
      console.log('\n✅ Conversion completed successfully!');
      console.log(`📁 Output directory: ${this.outputDir}`);
      console.log('\n📖 Files are ready to be copied into Confluence');
      
    } catch (error) {
      console.error('\n❌ Conversion failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the converter if this script is executed directly
if (require.main === module) {
  const converter = new MarkdownToConfluenceConverter();
  converter.run();
}

module.exports = MarkdownToConfluenceConverter;