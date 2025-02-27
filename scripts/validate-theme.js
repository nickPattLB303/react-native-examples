/**
 * @fileoverview Script to validate pharmacy theme consistency across code examples
 * @author React Native Training Course
 * @created 2023-02-27
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Pharmacy theme terminology to check for
const PHARMACY_TERMS = [
  'medication',
  'prescription',
  'pharmacy',
  'dosage',
  'patient',
  'inventory',
  'drug',
  'dispense',
  'refill',
  'order',
  'treatment'
];

// Medical/healthcare verbs that should be used
const HEALTHCARE_VERBS = [
  'administer',
  'diagnose',
  'dispense',
  'prescribe',
  'refill',
  'treat',
  'monitor',
  'deliver',
  'track'
];

// Unacceptable example data (not healthcare-themed)
const UNACCEPTABLE_TERMS = [
  'foo',
  'bar',
  'baz',
  'qux',
  'todo',
  'item',
  'product',
  'widget',
  'user',
  'customer'
];

// File extensions to scan
const FILE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

// Find all React component files
function findComponentFiles() {
  const files = [];
  
  // Find all JS/JSX/TS/TSX files that aren't in node_modules
  FILE_EXTENSIONS.forEach(ext => {
    const pattern = `**/*.${ext}`;
    const matches = glob.sync(pattern, {
      ignore: ['node_modules/**', 'dist/**', 'build/**', 'scripts/**', '.github/**']
    });
    files.push(...matches);
  });
  
  // Filter to only include React/React Native files
  return files.filter(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      return content.includes('import React') || 
             content.includes('from \'react\'') || 
             content.includes('from "react"') ||
             content.includes('from \'react-native\'') ||
             content.includes('from "react-native"');
    } catch (error) {
      console.error(`Error reading file ${file}: ${error.message}`);
      return false;
    }
  });
}

// Check if file contains pharmacy terms
function hasPharmacyTerms(content) {
  return PHARMACY_TERMS.some(term => 
    content.includes(term) || 
    content.toLowerCase().includes(term)
  );
}

// Check if file contains healthcare verbs
function hasHealthcareVerbs(content) {
  return HEALTHCARE_VERBS.some(verb => 
    content.includes(verb) || 
    content.toLowerCase().includes(verb)
  );
}

// Check if file contains unacceptable terms
function hasUnacceptableTerms(content) {
  return UNACCEPTABLE_TERMS.some(term => {
    // Look for the term as a standalone identifier, not part of a larger word
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    return regex.test(content);
  });
}

// Check if component name contains pharmacy terms
function componentHasPharmacyName(file, content) {
  // Extract the component name(s) from the file
  const componentNames = [];
  
  // Pattern for function components
  const funcComponentRegex = /function\s+([A-Z][a-zA-Z0-9]*)/g;
  let match;
  while ((match = funcComponentRegex.exec(content)) !== null) {
    componentNames.push(match[1]);
  }
  
  // Pattern for class components
  const classComponentRegex = /class\s+([A-Z][a-zA-Z0-9]*)\s+extends\s+React\.Component/g;
  while ((match = classComponentRegex.exec(content)) !== null) {
    componentNames.push(match[1]);
  }
  
  // Pattern for const = () => {} components
  const constComponentRegex = /const\s+([A-Z][a-zA-Z0-9]*)\s*=/g;
  while ((match = constComponentRegex.exec(content)) !== null) {
    componentNames.push(match[1]);
  }
  
  // If no component names found, use filename as fallback
  if (componentNames.length === 0) {
    const basename = path.basename(file, path.extname(file));
    // If the filename is PascalCase, treat it as a component name
    if (/^[A-Z]/.test(basename)) {
      componentNames.push(basename);
    }
  }
  
  // Check if any component name contains a pharmacy term
  return componentNames.some(name => 
    PHARMACY_TERMS.some(term => 
      name.toLowerCase().includes(term.toLowerCase())
    )
  );
}

// Validate pharmacy theme
function validateTheme() {
  const files = findComponentFiles();
  let errorCount = 0;
  
  console.log(chalk.blue(`Found ${files.length} React component files to validate`));
  
  // Check each file
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Skip utility and configuration files
      if (file.includes('utils') || file.includes('config') || file.includes('test')) {
        return;
      }
      
      const hasTerms = hasPharmacyTerms(content);
      const hasVerbs = hasHealthcareVerbs(content);
      const hasUnaccTerms = hasUnacceptableTerms(content);
      const hasPharmacyCompName = componentHasPharmacyName(file, content);
      
      // Report errors
      if (!hasTerms) {
        console.error(chalk.red(`[ERROR] ${file}: Missing pharmacy theme terminology`));
        errorCount++;
      }
      
      if (!hasVerbs) {
        console.warn(chalk.yellow(`[WARNING] ${file}: Missing healthcare-related verbs`));
      }
      
      if (hasUnaccTerms) {
        console.error(chalk.red(`[ERROR] ${file}: Contains non-healthcare example data`));
        errorCount++;
      }
      
      if (!hasPharmacyCompName) {
        console.warn(chalk.yellow(`[WARNING] ${file}: Component name does not reflect pharmacy theme`));
      }
      
    } catch (error) {
      console.error(chalk.red(`[ERROR] Could not read file ${file}: ${error.message}`));
      errorCount++;
    }
  });
  
  if (errorCount === 0) {
    console.log(chalk.green('✓ All component files follow pharmacy theme'));
    return true;
  } else {
    console.error(chalk.red(`✗ Found ${errorCount} pharmacy theme issues`));
    return false;
  }
}

// Run the validation if executed directly
if (require.main === module) {
  const success = validateTheme();
  process.exit(success ? 0 : 1);
}

module.exports = validateTheme; 