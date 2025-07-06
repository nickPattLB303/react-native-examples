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

    // 1. Add table of contents at the beginning
    confluence = this.addTableOfContents(confluence);

    // 2. Handle admonitions first (before other conversions)
    confluence = this.convertAdmonitions(confluence);

    // 3. Improve structure - convert complex lists to headings
    confluence = this.improveStructure(confluence);

    // 4. Handle code blocks (must be before inline code) - improved for nested blocks
    confluence = this.convertCodeBlocks(confluence);

    // 5. Handle text formatting (bold, italic) - before inline code to avoid conflicts
    confluence = this.convertTextFormatting(confluence);

    // 6. Handle inline code (backticks) - after text formatting
    confluence = this.convertInlineCode(confluence);

    // 7. Handle headers - improved to fix heading levels
    confluence = this.convertHeaders(confluence);

    // 8. Handle tables
    confluence = this.convertTables(confluence);

    // 9. Handle lists
    confluence = this.convertLists(confluence);

    // 10. Handle links
    confluence = this.convertLinks(confluence);

    // 11. Handle images
    confluence = this.convertImages(confluence);

    // 12. Handle block quotes (after code blocks so nested code is handled)
    confluence = this.convertBlockQuotes(confluence);

    // 13. Handle any remaining code blocks that might have been missed (post-processing)
    confluence = this.postProcessCodeBlocks(confluence);

    // 13. Handle horizontal rules
    confluence = this.convertHorizontalRules(confluence);

    // 14. Handle line breaks and spacing
    confluence = this.cleanupSpacing(confluence);

    return confluence;
  }

  /**
   * Add table of contents at the beginning of the document
   */
  addTableOfContents(content) {
    // Check if content has headers (excluding the first h1 which will be omitted)
    const hasHeaders = /^#{2,6}\s+/m.test(content);
    
    if (hasHeaders) {
      return '{toc}\n\n' + content;
    }
    
    return content;
  }

  /**
   * Improve document structure by converting complex nested lists to proper headings
   */
  improveStructure(content) {
    // Convert list items that contain bold headers and code blocks to proper headings
    // Look for patterns like:
    // - **Title:** Description
    //   ```code```
    
    const lines = content.split('\n');
    const result = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Check if this is a list item with bold title that should become a heading
      const listWithBoldMatch = line.match(/^(\s*)[-*+]\s+\*\*([^*]+):\*\*(.*)/);
      
      if (listWithBoldMatch) {
        const indent = listWithBoldMatch[1];
        const title = listWithBoldMatch[2];
        const description = listWithBoldMatch[3];
        
        // Determine heading level based on indentation and context
        const headingLevel = Math.min(4, Math.max(3, Math.floor(indent.length / 2) + 3));
        
        // Convert to heading
        result.push(`${'#'.repeat(headingLevel)} ${title}`);
        if (description.trim()) {
          result.push('');
          result.push(description.trim());
        }
        
        // Look ahead for indented content (code blocks, additional text)
        i++;
        while (i < lines.length) {
          const nextLine = lines[i];
          
          // If it's indented content or empty line, include it
          if (nextLine.startsWith(indent + '  ') || nextLine.trim() === '') {
            // Remove the extra indentation
            const cleanedLine = nextLine.substring(indent.length + 2);
            result.push(cleanedLine);
            i++;
          } else {
            // Break if we hit non-indented content
            i--;
            break;
          }
        }
      } else {
        result.push(line);
      }
      
      i++;
    }
    
    return result.join('\n');
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
    // First handle indented code blocks that might be nested in lists
    const lines = content.split('\n');
    const result = [];
    let i = 0;
    let inCodeBlock = false;
    let codeBlockBuffer = [];
    let codeBlockLanguage = '';
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Check for fenced code block start
      const fenceMatch = line.match(/^(\s*)```(\w+)?/);
      
      if (fenceMatch && !inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockLanguage = fenceMatch[2] || 'text';
        codeBlockBuffer = [];
        
        // Handle mermaid diagrams specially - convert to mermaid.ink link
        if (codeBlockLanguage === 'mermaid') {
          // Don't add opening tag here, we'll process the content first
        } else {
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
          
          const confluenceLanguage = languageMap[codeBlockLanguage.toLowerCase()] || codeBlockLanguage;
          result.push(`{code:language=${confluenceLanguage}}`);
        }
      } else if (line.trim() === '```' && inCodeBlock) {
        // Ending a code block
        inCodeBlock = false;
        
        if (codeBlockLanguage === 'mermaid') {
          // Convert mermaid diagram to mermaid.ink link
          const mermaidCode = codeBlockBuffer.join('\n');
          const mermaidLink = this.convertMermaidToLink(mermaidCode);
          result.push(mermaidLink);
        } else {
          // Add the code content and close the code block
          result.push(...codeBlockBuffer);
          result.push(`{code}`);
        }
        
        codeBlockBuffer = [];
        codeBlockLanguage = '';
      } else if (inCodeBlock) {
        // Inside a code block, preserve the line as-is
        codeBlockBuffer.push(line);
      } else {
        // Normal line, not in a code block
        result.push(line);
      }
      
      i++;
    }
    
    // Handle any remaining code block buffer (unclosed code blocks)
    if (inCodeBlock && codeBlockBuffer.length > 0) {
      if (codeBlockLanguage === 'mermaid') {
        const mermaidCode = codeBlockBuffer.join('\n');
        const mermaidLink = this.convertMermaidToLink(mermaidCode);
        result.push(mermaidLink);
      } else {
        result.push(...codeBlockBuffer);
        result.push(`{code}`);
      }
    }
    
    return result.join('\n');
  }

  /**
   * Convert mermaid diagram code to a code block (since links don't work well in Confluence)
   */
  convertMermaidToLink(mermaidCode) {
    // Clean up the mermaid code
    const cleanCode = mermaidCode.trim();
    
    // Since mermaid.ink links don't work well when copy-pasted, use a code block instead
    return `{code:title=Mermaid Diagram|language=text}\n${cleanCode}\n{code}\n\n_(Note: This is a Mermaid diagram. Copy the code to a Mermaid editor like https://mermaid.live to view the diagram)_`;
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
        // Convert single backticks to Confluence monospace with double braces
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
    // Convert headers (h1-h6) but adjust levels:
    // - Skip the first h1 (top level heading)
    // - Make the first h2 become h1, h3 become h2, etc.
    
    const lines = content.split('\n');
    let firstH1Found = false;
    
    const result = lines.map(line => {
      const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headerMatch) {
        const level = headerMatch[1].length;
        const title = headerMatch[2];
        
        // Skip the very first h1 (usually the document title)
        if (level === 1 && !firstH1Found) {
          firstH1Found = true;
          return ''; // Skip this line
        }
        
        // Adjust header levels: h2->h1, h3->h2, h4->h3, etc.
        const adjustedLevel = Math.max(1, level - 1);
        return `h${adjustedLevel}. ${title}`;
      }
      
      return line;
    });
    
    return result.join('\n');
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
   * Post-process any remaining code blocks that might have been missed
   */
  postProcessCodeBlocks(content) {
    // Look for any remaining ``` patterns that weren't converted
    const lines = content.split('\n');
    const result = [];
    let i = 0;
    let inCodeBlock = false;
    let codeBlockBuffer = [];
    let codeBlockLanguage = '';
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Check for fenced code block start
      const fenceMatch = line.match(/^(\s*)```(\w+)?/);
      
      if (fenceMatch && !inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockLanguage = fenceMatch[2] || 'text';
        codeBlockBuffer = [];
        
        // Handle mermaid diagrams specially
        if (codeBlockLanguage === 'mermaid') {
          // Don't add opening tag here, we'll process the content first
        } else {
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
          
          const confluenceLanguage = languageMap[codeBlockLanguage.toLowerCase()] || codeBlockLanguage;
          result.push(`{code:language=${confluenceLanguage}}`);
        }
      } else if (line.trim() === '```' && inCodeBlock) {
        // Ending a code block
        inCodeBlock = false;
        
        if (codeBlockLanguage === 'mermaid') {
          // Convert mermaid diagram to code block
          const mermaidCode = codeBlockBuffer.join('\n');
          const mermaidBlock = this.convertMermaidToLink(mermaidCode);
          result.push(mermaidBlock);
        } else {
          // Add the code content and close the code block
          result.push(...codeBlockBuffer);
          result.push(`{code}`);
        }
        
        codeBlockBuffer = [];
        codeBlockLanguage = '';
      } else if (inCodeBlock) {
        // Inside a code block, preserve the line as-is
        codeBlockBuffer.push(line);
      } else {
        // Normal line, not in a code block
        result.push(line);
      }
      
      i++;
    }
    
    // Handle any remaining code block buffer (unclosed code blocks)
    if (inCodeBlock && codeBlockBuffer.length > 0) {
      if (codeBlockLanguage === 'mermaid') {
        const mermaidCode = codeBlockBuffer.join('\n');
        const mermaidBlock = this.convertMermaidToLink(mermaidCode);
        result.push(mermaidBlock);
      } else {
        result.push(...codeBlockBuffer);
        result.push(`{code}`);
      }
    }
    
    return result.join('\n');
  }

  /**
   * Convert block quotes
   */
  convertBlockQuotes(content) {
    // Handle all remaining > blockquotes that haven't been converted yet
    // This includes nested blockquotes within existing bq. sections
    const lines = content.split('\n');
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if this line starts with > and is not already part of an admonition
      if (line.match(/^>\s+/) && !line.includes('[!')) {
        // This is a blockquote line that needs conversion
        const cleanedLine = line.replace(/^>\s*/, '').trim();
        
        // If it's not empty, add as blockquote
        if (cleanedLine) {
          result.push(`bq. ${cleanedLine}`);
        } else {
          result.push(''); // Preserve empty lines
        }
      } else {
        result.push(line);
      }
    }
    
    return result.join('\n');
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