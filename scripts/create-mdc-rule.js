#!/usr/bin/env node

/**
 * MDC Rule Generator
 * 
 * A utility script to generate new MDC rule files with the proper structure.
 * Usage: node create-mdc-rule.js <rule-name> [category]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const RULES_DIR = path.join(__dirname, '..', '.cursor', 'rules');
const CATEGORIES = {
  'structure': 'Repository and project structure',
  'code': 'Code standards and practices',
  'documentation': 'Documentation and content',
  'workflow': 'Workflows and processes',
  'training': 'Training and education',
  'integration': 'External integrations'
};

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
 * Generate an MDC rule file
 */
async function generateMdcRule() {
  console.log('\n🚀 MDC Rule Generator\n');
  
  // Get rule name
  const ruleName = process.argv[2] || await prompt('Rule name (kebab-case): ');
  if (!ruleName) {
    console.error('❌ Rule name is required');
    rl.close();
    return;
  }
  
  // Get or select category
  let category = process.argv[3];
  if (!category) {
    console.log('\nAvailable categories:');
    Object.entries(CATEGORIES).forEach(([key, desc]) => {
      console.log(`  ${key}: ${desc}`);
    });
    category = await prompt('\nCategory (default: documentation): ');
    if (!category) category = 'documentation';
  }
  
  if (!CATEGORIES[category]) {
    console.log(`⚠️ Unknown category "${category}", using "documentation" instead`);
    category = 'documentation';
  }
  
  // Get rule title
  const defaultTitle = ruleName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const title = await prompt(`Rule title (default: ${defaultTitle}): `) || defaultTitle;
  
  // Get rule description
  const defaultDescription = `Guidelines for ${title.toLowerCase()} in the React Native training repository.`;
  const description = await prompt(`Description (default: ${defaultDescription}): `) || defaultDescription;
  
  // Get glob patterns
  const defaultGlobs = getDefaultGlobs(category);
  const globs = await prompt(`Glob patterns (default: ${defaultGlobs.join(', ')}): `) || defaultGlobs.join(', ');
  
  // Always apply?
  const alwaysApplyDefault = category === 'structure' || category === 'workflow' ? 'true' : 'false';
  const alwaysApply = await prompt(`Always apply? (true/false, default: ${alwaysApplyDefault}): `) || alwaysApplyDefault;
  
  // Get references
  const references = await prompt('References (comma-separated file paths): ');
  
  // Generate the file content
  const fileContent = generateFileContent({
    title,
    description,
    globs: globs.split(',').map(g => g.trim()),
    alwaysApply: alwaysApply.toLowerCase() === 'true',
    references: references ? references.split(',').map(r => r.trim()) : []
  });
  
  // Write the file
  const filePath = path.join(RULES_DIR, `${ruleName}.mdc`);
  try {
    fs.writeFileSync(filePath, fileContent);
    console.log(`\n✅ Created rule file: ${filePath}`);
  } catch (error) {
    console.error(`\n❌ Error creating file: ${error.message}`);
  }
  
  rl.close();
}

/**
 * Get default glob patterns based on category
 * @param {string} category - The rule category
 * @returns {string[]} - Default glob patterns
 */
function getDefaultGlobs(category) {
  switch (category) {
    case 'structure':
      return ['**/*'];
    case 'code':
      return ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'];
    case 'documentation':
      return ['**/*.md', 'docs/**/*'];
    case 'workflow':
      return ['.github/**/*', 'scripts/**/*'];
    case 'training':
      return ['docs/**/*', 'exercises/**/*', 'challenges/**/*'];
    case 'integration':
      return ['**/*.md', 'docs/**/*'];
    default:
      return ['**/*.md'];
  }
}

/**
 * Generate MDC file content
 * @param {Object} options - The rule options
 * @returns {string} - The generated file content
 */
function generateFileContent({ title, description, globs, alwaysApply, references }) {
  const globsStr = globs.map(g => `"${g}"`).join(', ');
  const referencesContent = references.length > 0 
    ? '\n\n## @ References\n' + references.map(r => `@${r} - Reference`).join('\n')
    : '';
  
  return `# ${title}

## description
${description}

## globs
[${globsStr}]

## alwaysApply
${alwaysApply}

## Rule Content

### Purpose
[Describe the purpose of this rule]

### Guidelines
- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

### Examples
\`\`\`
[Example code or content]
\`\`\`${referencesContent}
`;
}

// Run the generator
generateMdcRule(); 