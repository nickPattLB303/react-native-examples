#!/usr/bin/env node

/**
 * Content Validation Script
 * 
 * This script validates content alignment between slides and markdown documentation.
 * It checks for:
 * - Learning objectives consistency
 * - CodePen/Expo links validity
 * - Exercise structure consistency
 * - Path consistency
 * - Placeholder text identification
 * 
 * Usage: node scripts/validate-content.js [module-directory]
 * Example: node scripts/validate-content.js module-1-react-native-fundamentals
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chalk = require('chalk');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const SLIDES_DIR = path.join(DOCS_DIR, 'slides');
const MODULE_PREFIX = 'module-';

// Validation results storage
const validationResults = {
  errors: [],
  warnings: [],
  info: []
};

/**
 * Main validation function
 */
function validateContent(moduleDir) {
  console.log(chalk.blue(`\n=== Validating content alignment for ${moduleDir} ===\n`));
  
  // Validate module exists in both locations
  const docsModulePath = path.join(DOCS_DIR, moduleDir);
  const slidesModulePath = path.join(SLIDES_DIR, moduleDir);
  
  if (!fs.existsSync(docsModulePath)) {
    validationResults.errors.push(`Module directory ${moduleDir} not found in docs`);
    return;
  }
  
  if (!fs.existsSync(slidesModulePath)) {
    validationResults.errors.push(`Module directory ${moduleDir} not found in slides`);
    return;
  }

  // Get all sections in the module
  const docsSections = getDirectories(docsModulePath);
  const slidesSections = getDirectories(slidesModulePath);
  
  // Check if sections match
  const missingSections = docsSections.filter(section => !slidesSections.includes(section));
  const extraSections = slidesSections.filter(section => !docsSections.includes(section));
  
  if (missingSections.length > 0) {
    validationResults.errors.push(`Missing sections in slides: ${missingSections.join(', ')}`);
  }
  
  if (extraSections.length > 0) {
    validationResults.errors.push(`Extra sections in slides: ${extraSections.join(', ')}`);
  }
  
  // Validate each section that exists in both places
  const commonSections = docsSections.filter(section => slidesSections.includes(section));
  
  for (const section of commonSections) {
    validateSection(moduleDir, section);
  }
  
  // Display validation results
  displayResults();
}

/**
 * Validate a specific section
 */
function validateSection(moduleDir, sectionDir) {
  console.log(chalk.cyan(`\nValidating section: ${sectionDir}`));
  
  const docsReadmePath = path.join(DOCS_DIR, moduleDir, sectionDir, 'README.md');
  const slidesIndexPath = path.join(SLIDES_DIR, moduleDir, sectionDir, 'index.html');
  
  if (!fs.existsSync(docsReadmePath)) {
    validationResults.errors.push(`README.md not found for section ${sectionDir}`);
    return;
  }
  
  if (!fs.existsSync(slidesIndexPath)) {
    validationResults.errors.push(`index.html not found for section ${sectionDir}`);
    return;
  }
  
  // Read the content of both files
  const markdownContent = fs.readFileSync(docsReadmePath, 'utf8');
  const htmlContent = fs.readFileSync(slidesIndexPath, 'utf8');
  
  // Load HTML content with cheerio
  const $ = cheerio.load(htmlContent);
  
  // Validate learning objectives
  validateLearningObjectives(markdownContent, $, sectionDir);
  
  // Validate CodePen/Expo links
  validateExternalLinks(markdownContent, $, sectionDir);
  
  // Validate exercises
  validateExercises(markdownContent, $, sectionDir);
  
  // Check for placeholder content
  checkForPlaceholders(markdownContent, htmlContent, sectionDir);
}

/**
 * Validate that learning objectives match between formats
 */
function validateLearningObjectives(markdown, $, sectionDir) {
  // Extract learning objectives from markdown
  const markdownObjectivesMatch = markdown.match(/## Learning Objectives\s+After completing this section[^]*?(-[^\n]+\n)+/);
  
  if (!markdownObjectivesMatch) {
    validationResults.warnings.push(`No learning objectives section found in markdown for ${sectionDir}`);
    return;
  }
  
  const markdownObjectives = markdownObjectivesMatch[0]
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().substring(1).trim());
  
  // Extract learning objectives from slides
  const slideObjectives = [];
  $('.objectives-slide li').each((_, element) => {
    slideObjectives.push($(element).text().trim());
  });
  
  if (slideObjectives.length === 0) {
    validationResults.warnings.push(`No learning objectives found in slides for ${sectionDir}`);
    return;
  }
  
  // Compare objectives
  if (markdownObjectives.length !== slideObjectives.length) {
    validationResults.errors.push(`Learning objectives count mismatch in ${sectionDir}: markdown has ${markdownObjectives.length}, slides have ${slideObjectives.length}`);
  }
  
  // Check each objective for similarity
  for (let i = 0; i < Math.min(markdownObjectives.length, slideObjectives.length); i++) {
    const mdObj = markdownObjectives[i].toLowerCase();
    const slideObj = slideObjectives[i].toLowerCase();
    
    if (!areStringsEquivalent(mdObj, slideObj)) {
      validationResults.errors.push(`Learning objective mismatch in ${sectionDir}:\nMarkdown: ${markdownObjectives[i]}\nSlide: ${slideObjectives[i]}`);
    }
  }
}

/**
 * Validate that CodePen/Expo links are consistent and follow the pattern
 */
function validateExternalLinks(markdown, $, sectionDir) {
  // Check CodePen links in markdown
  const markdownCodePenLinks = (markdown.match(/\[.*CodePen.*?\]\((https:\/\/codepen\.io\/[^)]+)\)/g) || [])
    .map(link => {
      const matches = link.match(/\[.*CodePen.*?\]\((https:\/\/codepen\.io\/[^)]+)\)/);
      return matches ? matches[1] : null;
    })
    .filter(Boolean);
  
  // Check CodePen links in slides
  const slideCodePenLinks = [];
  $('a[href*="codepen.io"]').each((_, element) => {
    slideCodePenLinks.push($(element).attr('href'));
  });
  
  // Check for link count mismatch
  if (markdownCodePenLinks.length !== slideCodePenLinks.length) {
    validationResults.warnings.push(`CodePen link count mismatch in ${sectionDir}: markdown has ${markdownCodePenLinks.length}, slides have ${slideCodePenLinks.length}`);
  }
  
  // Validate link format
  const validCodePenPattern = /^https:\/\/codepen\.io\/react-native-course\/pen\/[a-zA-Z0-9-]+$/;
  
  markdownCodePenLinks.forEach(link => {
    if (!validCodePenPattern.test(link)) {
      validationResults.errors.push(`Invalid CodePen link format in markdown for ${sectionDir}: ${link}`);
    }
    
    if (link.includes('your-username')) {
      validationResults.errors.push(`Placeholder username in CodePen link in markdown for ${sectionDir}: ${link}`);
    }
  });
  
  slideCodePenLinks.forEach(link => {
    if (!validCodePenPattern.test(link)) {
      validationResults.errors.push(`Invalid CodePen link format in slides for ${sectionDir}: ${link}`);
    }
    
    if (link.includes('your-username')) {
      validationResults.errors.push(`Placeholder username in CodePen link in slides for ${sectionDir}: ${link}`);
    }
  });
  
  // Similar checks for Expo links if needed
}

/**
 * Validate exercises are consistent between formats
 */
function validateExercises(markdown, $, sectionDir) {
  // Extract exercises from markdown
  const markdownExercises = [];
  const exerciseMatches = markdown.matchAll(/## Exercise: ([^\n]+)/g);
  
  for (const match of exerciseMatches) {
    markdownExercises.push(match[1].trim());
  }
  
  // Extract exercises from slides
  const slideExercises = [];
  $('.exercise-slide h2').each((_, element) => {
    const title = $(element).text().trim();
    if (title.startsWith('Exercise:')) {
      slideExercises.push(title.substring('Exercise:'.length).trim());
    }
  });
  
  // Check for exercise count mismatch
  if (markdownExercises.length !== slideExercises.length) {
    validationResults.errors.push(`Exercise count mismatch in ${sectionDir}: markdown has ${markdownExercises.length}, slides have ${slideExercises.length}`);
  }
  
  // Compare exercise titles
  for (let i = 0; i < Math.min(markdownExercises.length, slideExercises.length); i++) {
    if (markdownExercises[i] !== slideExercises[i]) {
      validationResults.warnings.push(`Exercise title mismatch in ${sectionDir}:\nMarkdown: ${markdownExercises[i]}\nSlide: ${slideExercises[i]}`);
    }
  }
}

/**
 * Check for placeholder content in both formats
 */
function checkForPlaceholders(markdown, html, sectionDir) {
  const placeholderPatterns = [
    /\[.*?\]/g,               // [Placeholder text]
    /TODO/gi,                 // TODO comments
    /FIXME/gi,                // FIXME comments
    /your-username/g,         // Placeholder usernames
    /lorem ipsum/gi,          // Lorem ipsum text
    /placeholder/gi,          // Generic "placeholder" text
    /example\.com/g           // Example domains
  ];
  
  // Check markdown for placeholders
  placeholderPatterns.forEach(pattern => {
    const matches = markdown.match(pattern);
    if (matches) {
      validationResults.warnings.push(`Possible placeholder content in markdown for ${sectionDir}: ${matches.join(', ')}`);
    }
  });
  
  // Check HTML for placeholders (excluding code blocks)
  const htmlTextContent = html.replace(/<pre><code[^>]*>[^]*?<\/code><\/pre>/g, '');
  placeholderPatterns.forEach(pattern => {
    const matches = htmlTextContent.match(pattern);
    if (matches) {
      validationResults.warnings.push(`Possible placeholder content in slides for ${sectionDir}: ${matches.join(', ')}`);
    }
  });
}

/**
 * Get all directories in a given path
 */
function getDirectories(sourcePath) {
  return fs.readdirSync(sourcePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Compare two strings for rough equivalence
 */
function areStringsEquivalent(str1, str2) {
  // Normalize strings by removing punctuation, extra spaces, and converting to lowercase
  const normalize = str => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  // Check if they're exactly equal after normalization
  if (normalizedStr1 === normalizedStr2) {
    return true;
  }
  
  // Check if they're at least 80% similar
  const longerStr = normalizedStr1.length > normalizedStr2.length ? normalizedStr1 : normalizedStr2;
  const shorterStr = normalizedStr1.length > normalizedStr2.length ? normalizedStr2 : normalizedStr1;
  
  return shorterStr.length / longerStr.length > 0.8;
}

/**
 * Display validation results
 */
function displayResults() {
  console.log('\n=== Validation Results ===\n');
  
  if (validationResults.errors.length === 0 && validationResults.warnings.length === 0) {
    console.log(chalk.green('✓ All validations passed successfully!'));
    return;
  }
  
  if (validationResults.errors.length > 0) {
    console.log(chalk.red(`\n${validationResults.errors.length} Errors:`));
    validationResults.errors.forEach((error, index) => {
      console.log(chalk.red(`${index + 1}. ${error}`));
    });
  }
  
  if (validationResults.warnings.length > 0) {
    console.log(chalk.yellow(`\n${validationResults.warnings.length} Warnings:`));
    validationResults.warnings.forEach((warning, index) => {
      console.log(chalk.yellow(`${index + 1}. ${warning}`));
    });
  }
  
  if (validationResults.info.length > 0) {
    console.log(chalk.blue(`\n${validationResults.info.length} Informational:`));
    validationResults.info.forEach((info, index) => {
      console.log(chalk.blue(`${index + 1}. ${info}`));
    });
  }
  
  // Summary
  const totalIssues = validationResults.errors.length + validationResults.warnings.length;
  console.log(chalk.cyan(`\nTotal issues found: ${totalIssues}`));
  
  // Exit with error code if there are errors
  if (validationResults.errors.length > 0) {
    process.exit(1);
  }
}

// Parse command-line arguments
const moduleArg = process.argv[2];

if (!moduleArg) {
  console.log(chalk.yellow('No module specified. Usage: node validate-content.js <module-directory>'));
  console.log(chalk.yellow('Example: node validate-content.js module-1-react-native-fundamentals'));
  process.exit(1);
}

// Ensure module directory follows naming convention
if (!moduleArg.startsWith(MODULE_PREFIX)) {
  console.log(chalk.yellow(`Module directory should start with "${MODULE_PREFIX}". Example: module-1-react-native-fundamentals`));
  process.exit(1);
}

// Run validation
validateContent(moduleArg); 