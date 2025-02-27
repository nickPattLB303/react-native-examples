/**
 * @fileoverview Script to validate cross-references between documentation files
 * @author React Native Training Course
 * @created 2023-02-27
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Directories to scan for markdown files
const DOCS_DIRECTORIES = [
  'docs',
  '.cursor/rules'
];

// Function to extract markdown links from content
function extractMarkdownLinks(content) {
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const mcdLinkRegex = /\[([^\]]+)\]\(mdc:([^)]+)\)/g;
  
  const links = [];
  let match;
  
  // Extract standard markdown links
  while ((match = mdLinkRegex.exec(content)) !== null) {
    if (!match[2].startsWith('http')) {
      links.push({
        text: match[1],
        path: match[2],
        isMdc: false
      });
    }
  }
  
  // Extract mdc: links
  while ((match = mcdLinkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      path: match[2],
      isMdc: true
    });
  }
  
  return links;
}

// Find all markdown files
function findMarkdownFiles() {
  const markdownFiles = [];
  
  DOCS_DIRECTORIES.forEach(dir => {
    const files = walkDirectory(dir);
    markdownFiles.push(...files);
  });
  
  return markdownFiles;
}

// Walk directory recursively to find markdown files
function walkDirectory(dir) {
  const results = [];
  
  try {
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat && stat.isDirectory()) {
        // Recursive call for directories
        results.push(...walkDirectory(fullPath));
      } else if (file.endsWith('.md') || file.endsWith('.mdc')) {
        results.push(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}: ${error.message}`);
  }
  
  return results;
}

// Validate that a file exists
function fileExists(filePath, basePath) {
  try {
    const fullPath = path.resolve(basePath, filePath);
    return fs.existsSync(fullPath);
  } catch (error) {
    return false;
  }
}

// Main validation function
function validateLinks() {
  const markdownFiles = findMarkdownFiles();
  let errorCount = 0;
  
  console.log(chalk.blue(`Found ${markdownFiles.length} markdown files to validate`));
  
  markdownFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const links = extractMarkdownLinks(content);
      const baseDir = path.dirname(file);
      
      links.forEach(link => {
        // Skip fragment-only links and absolute URLs
        if (link.path.startsWith('#') || link.path.startsWith('http')) {
          return;
        }
        
        // For mdc: links, check if the file exists in docs or rules
        if (link.isMdc) {
          let found = false;
          for (const dir of DOCS_DIRECTORIES) {
            if (fileExists(link.path, dir)) {
              found = true;
              break;
            }
          }
          
          if (!found) {
            console.error(chalk.red(`[ERROR] In ${file}: Broken mdc link to "${link.path}" (${link.text})`));
            errorCount++;
          }
        } 
        // For regular markdown links, check relative to current file
        else {
          if (!fileExists(link.path, baseDir)) {
            console.error(chalk.red(`[ERROR] In ${file}: Broken link to "${link.path}" (${link.text})`));
            errorCount++;
          }
        }
      });
    } catch (error) {
      console.error(chalk.red(`[ERROR] Could not read file ${file}: ${error.message}`));
      errorCount++;
    }
  });
  
  if (errorCount === 0) {
    console.log(chalk.green('✓ All links are valid'));
    return true;
  } else {
    console.error(chalk.red(`✗ Found ${errorCount} broken links`));
    return false;
  }
}

// Run the validation if executed directly
if (require.main === module) {
  const success = validateLinks();
  process.exit(success ? 0 : 1);
}

module.exports = validateLinks; 