/**
 * @fileoverview Script to validate Articulate 360 compatibility of course materials
 * @author React Native Training Course Team
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Configuration
const DOCS_DIR = 'docs';
const MODULE_PATTERN = `${DOCS_DIR}/module-*/`;
const SECTION_PATTERN = `${DOCS_DIR}/module-*/section-*/`;
const README_PATTERN = '**/README.md';

// Counters for reporting
let warnings = 0;
let errors = 0;
let checked = 0;

/**
 * Check if a module README includes Articulate implementation notes
 * @param {string} filePath - Path to the README file
 * @returns {boolean} - Whether the file has implementation notes
 */
function checkArticulateNotes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('Articulate 360 Implementation Notes');
}

/**
 * Check for potential Articulate conversion issues in a markdown file
 * @param {string} filePath - Path to the markdown file
 */
function checkArticulateCompatibility(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  let fileWarnings = 0;
  
  // Check for deeply nested headings (more than 3 levels)
  const headingLevels = content.match(/^#{4,}\s/gm);
  if (headingLevels && headingLevels.length > 0) {
    console.log(chalk.yellow(`⚠️  ${relativePath}: Contains ${headingLevels.length} deeply nested headings (> H3)`));
    fileWarnings++;
  }
  
  // Check for complex tables (more than 5 columns)
  const tableRows = content.match(/\|.*\|/g);
  if (tableRows && tableRows.length > 0) {
    const maxColumns = Math.max(...tableRows.map(row => 
      (row.match(/\|/g) || []).length - 1
    ));
    
    if (maxColumns > 5) {
      console.log(chalk.yellow(`⚠️  ${relativePath}: Contains tables with ${maxColumns} columns (> 5)`));
      fileWarnings++;
    }
  }
  
  // Check for embedded videos
  if ((content.includes('<video') || content.includes('![](')) && 
      (content.includes('.mp4') || content.includes('.webm'))) {
    console.log(chalk.yellow(`⚠️  ${relativePath}: Contains embedded videos that should be externally hosted`));
    fileWarnings++;
  }
  
  // Check for very large images
  const imageMatches = content.match(/!\[.*?\]\(.*?\)/g) || [];
  for (const imageMatch of imageMatches) {
    const imagePath = imageMatch.match(/\(([^)]+)\)/)[1];
    if (!imagePath.startsWith('http')) {
      const fullImagePath = path.resolve(path.dirname(filePath), imagePath);
      if (fs.existsSync(fullImagePath)) {
        try {
          const stats = fs.statSync(fullImagePath);
          if (stats.size > 1000000) { // 1MB
            console.log(chalk.yellow(`⚠️  ${relativePath}: Contains large image (${Math.round(stats.size/1024)}KB): ${imagePath}`));
            fileWarnings++;
          }
        } catch (err) {
          // Skip file size check if there's an error
        }
      }
    }
  }
  
  // Check for README files without Articulate notes
  if (filePath.endsWith('README.md') && 
      (filePath.includes('/module-') || filePath.includes('/section-'))) {
    if (!checkArticulateNotes(filePath)) {
      console.log(chalk.red(`❌ ${relativePath}: Missing "Articulate 360 Implementation Notes" section`));
      errors++;
    }
  }
  
  warnings += fileWarnings;
  checked++;
  
  return fileWarnings === 0;
}

/**
 * Main validation function
 */
function validateArticulateCompatibility() {
  console.log(chalk.blue('🔍 Checking Articulate 360 compatibility...'));
  
  // Find all module and section README files
  const moduleReadmes = glob.sync(`${MODULE_PATTERN}${README_PATTERN}`);
  const sectionReadmes = glob.sync(`${SECTION_PATTERN}${README_PATTERN}`);
  const allReadmes = [...moduleReadmes, ...sectionReadmes];
  
  // Check all README files
  for (const readme of allReadmes) {
    checkArticulateCompatibility(readme);
  }
  
  // Find all markdown files in docs
  const allMarkdownFiles = glob.sync(`${DOCS_DIR}/**/*.md`, {
    ignore: ['**/node_modules/**', '**/README.md']
  });
  
  // Check all other markdown files
  for (const mdFile of allMarkdownFiles) {
    checkArticulateCompatibility(mdFile);
  }
  
  // Report results
  console.log(chalk.blue(`\n📊 Articulate Compatibility Report:`));
  console.log(chalk.blue(`   Checked ${checked} files`));
  console.log(chalk.yellow(`   Found ${warnings} warnings`));
  console.log(chalk.red(`   Found ${errors} errors`));
  
  if (errors > 0) {
    console.log(chalk.red('\n❌ Articulate compatibility validation failed'));
    process.exit(1);
  } else if (warnings > 0) {
    console.log(chalk.yellow('\n⚠️  Articulate compatibility validation passed with warnings'));
    process.exit(0);
  } else {
    console.log(chalk.green('\n✅ Articulate compatibility validation passed'));
    process.exit(0);
  }
}

// Run validation
validateArticulateCompatibility(); 