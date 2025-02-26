#!/usr/bin/env node

/**
 * MD to MDC Converter
 * 
 * A utility script to convert existing markdown rule files to the MDC format.
 * Usage: node convert-md-to-mdc.js <md-file-path> [glob-patterns] [always-apply]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt the user for input with a question
 * @param {string} question - The question to ask
 * @returns {Promise<string>} - The user's answer
 */
function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

/**
 * Extract title and description from markdown content
 * @param {string} content - The markdown content
 * @returns {Object} - The extracted title and description
 */
function extractTitleAndDescription(content) {
  const lines = content.split('\n');
  let title = '';
  let description = '';
  
  // Extract title (first h1)
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    }
  }
  
  // Extract description (from ## Description section if exists)
  const descriptionRegex = /## Description\s+([\s\S]*?)(?=##|$)/;
  const descMatch = content.match(descriptionRegex);
  
  if (descMatch && descMatch[1]) {
    description = descMatch[1].trim();
  } else {
    // Try to extract from first paragraph after title
    let foundTitle = false;
    let paragraphLines = [];
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        foundTitle = true;
        continue;
      }
      
      if (foundTitle && line.startsWith('##')) {
        break;
      }
      
      if (foundTitle && line.trim() !== '') {
        paragraphLines.push(line);
      } else if (paragraphLines.length > 0 && line.trim() === '') {
        break;
      }
    }
    
    description = paragraphLines.join(' ').trim();
  }
  
  return { title, description };
}

/**
 * Suggest glob patterns based on content
 * @param {string} content - The markdown content
 * @returns {string[]} - Suggested glob patterns
 */
function suggestGlobPatterns(content) {
  const patterns = [];
  
  // Check for mentions of specific file types or directories
  if (content.includes('documentation') || content.includes('docs')) {
    patterns.push('**/*.md', 'docs/**/*');
  }
  
  if (content.includes('code') || content.includes('javascript') || content.includes('typescript')) {
    patterns.push('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx');
  }
  
  if (content.includes('slide') || content.includes('presentation')) {
    patterns.push('docs/slides/**/*', '**/*.html');
  }
  
  if (content.includes('exercise') || content.includes('challenge')) {
    patterns.push('exercises/**/*', 'challenges/**/*');
  }
  
  // If no specific patterns found, use a catch-all
  if (patterns.length === 0) {
    patterns.push('**/*');
  }
  
  return [...new Set(patterns)]; // Remove duplicates
}

/**
 * Suggest if the rule should always apply
 * @param {string} content - The markdown content
 * @returns {boolean} - Whether the rule should always apply
 */
function suggestAlwaysApply(content) {
  // Rules about project structure, processes, or general guidelines should always apply
  return content.includes('structure') || 
         content.includes('process') || 
         content.includes('guideline') || 
         content.includes('standard');
}

/**
 * Convert markdown content to MDC format
 * @param {string} content - The markdown content
 * @param {string[]} globPatterns - Glob patterns for the rule
 * @param {boolean} alwaysApply - Whether the rule should always apply
 * @returns {string} - The converted MDC content
 */
function convertToMdc(content, globPatterns, alwaysApply) {
  const { title, description } = extractTitleAndDescription(content);
  const globsStr = globPatterns.map(g => `"${g}"`).join(', ');
  
  // Start with the new MDC header
  let mdcContent = `# ${title}\n\n## description\n${description}\n\n## globs\n[${globsStr}]\n\n## alwaysApply\n${alwaysApply}\n\n## Rule Content\n`;
  
  // Extract and append the remaining content (everything after title and description)
  const lines = content.split('\n');
  let skipLines = true;
  let contentLines = [];
  
  for (const line of lines) {
    // Skip title line
    if (line.startsWith('# ')) {
      skipLines = true;
      continue;
    }
    
    // Skip description section if it exists
    if (line.startsWith('## Description')) {
      skipLines = true;
      continue;
    }
    
    // Start including content at the next heading
    if (skipLines && line.startsWith('##')) {
      skipLines = false;
    }
    
    if (!skipLines) {
      contentLines.push(line);
    }
  }
  
  // Add the content
  mdcContent += contentLines.join('\n');
  
  return mdcContent;
}

/**
 * The main function to convert a markdown file to MDC
 */
async function convertMdToMdc() {
  console.log('\n🔄 MD to MDC Converter\n');
  
  // Get the input file path
  const inputFile = process.argv[2] || await prompt('Path to markdown file: ');
  if (!inputFile) {
    console.error('❌ File path is required');
    rl.close();
    return;
  }
  
  // Check if file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    rl.close();
    return;
  }
  
  // Read the markdown file
  const content = fs.readFileSync(inputFile, 'utf8');
  const { title } = extractTitleAndDescription(content);
  
  console.log(`\nConverting: ${path.basename(inputFile)}`);
  console.log(`Title: ${title}`);
  
  // Suggest glob patterns
  const suggestedPatterns = suggestGlobPatterns(content);
  console.log(`\nSuggested glob patterns: ${suggestedPatterns.join(', ')}`);
  const inputPatterns = process.argv[3] || await prompt('Glob patterns (comma-separated, press Enter to use suggested): ');
  const globPatterns = inputPatterns ? inputPatterns.split(',').map(p => p.trim()) : suggestedPatterns;
  
  // Suggest always apply
  const suggestedAlwaysApply = suggestAlwaysApply(content);
  console.log(`\nSuggested alwaysApply: ${suggestedAlwaysApply}`);
  const inputAlwaysApply = process.argv[4] || await prompt(`Always apply? (true/false, press Enter to use ${suggestedAlwaysApply}): `);
  const alwaysApply = inputAlwaysApply ? inputAlwaysApply.toLowerCase() === 'true' : suggestedAlwaysApply;
  
  // Convert to MDC
  const mdcContent = convertToMdc(content, globPatterns, alwaysApply);
  
  // Determine output file path
  const inputBasename = path.basename(inputFile, '.md');
  const outputFile = path.join(path.dirname(inputFile), `${inputBasename}.mdc`);
  
  // Write the MDC file
  try {
    fs.writeFileSync(outputFile, mdcContent);
    console.log(`\n✅ Created MDC file: ${outputFile}`);
  } catch (error) {
    console.error(`\n❌ Error creating file: ${error.message}`);
  }
  
  rl.close();
}

// Run the converter
convertMdToMdc(); 