const fs = require('fs');
const path = require('path');

// --- Configuration ---
const snackBaseUrl = 'https://snack.expo.dev/';
const defaultPlatform = 'web';
const codeFileName = 'App.js';
const dependenciesFileName = 'dependencies.txt';
const linkText = 'Try this interactive example on Expo Snack!';
// ---

// Get directory path from command line arguments
const exampleDir = process.argv[2];

if (!exampleDir) {
  console.error('❌ Error: Please provide the path to the example directory.');
  console.log('Usage: node generate-snack-link.js <path/to/example>');
  process.exit(1);
}

// --- Read Files ---
let code = '';
let dependencies = [];

try {
  const codeFilePath = path.join(exampleDir, codeFileName);
  if (fs.existsSync(codeFilePath)) {
    code = fs.readFileSync(codeFilePath, 'utf8');
  } else {
    console.warn(`⚠️ Warning: ${codeFileName} not found in ${exampleDir}. Snack will be empty.`);
  }

  const dependenciesFilePath = path.join(exampleDir, dependenciesFileName);
  if (fs.existsSync(dependenciesFilePath)) {
    const depsContent = fs.readFileSync(dependenciesFilePath, 'utf8');
    dependencies = depsContent.split('\n').map(dep => dep.trim()).filter(dep => dep); // Split by line, trim whitespace, remove empty lines
  } else {
     console.log(`ℹ️ Info: ${dependenciesFileName} not found. Assuming no extra dependencies.`);
  }

} catch (err) {
  console.error(`❌ Error reading files in ${exampleDir}:`, err);
  process.exit(1);
}

// --- Prepare Parameters ---
const exampleName = path.basename(exampleDir); // Use directory name as Snack name

// --- Construct URL ---
const urlParams = new URLSearchParams({
  platform: defaultPlatform,
  name: exampleName,
  // Only add dependencies if there are any
  ...(dependencies.length > 0 && { dependencies: dependencies.join(',') }), // Join deps with comma
  code: code,
});

const snackUrl = `${snackBaseUrl}?${urlParams.toString()}`;

// --- Generate Markdown ---
const markdownLink = `[${linkText}](${snackUrl})`;

// --- Output ---
console.log('\n✨ Generated Snack Markdown Link:\n');
console.log(markdownLink);
console.log('\n'); 