const fs = require('fs');
const path = require('path');

// --- Configuration ---
const templatesDir = path.join(__dirname, '..', 'templates');
const docsDir = path.join(__dirname, '..', 'docs', 'modules');
const lessonTemplateFile = path.join(templatesDir, 'lesson.md');
// ---

// --- Helper Functions ---
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function formatNumber(num) {
  return num.toString().padStart(2, '0');
}
// ---

// --- Argument Parsing ---
// Usage: node scripts/create-lesson.js <moduleNum> <moduleName> <lessonNum> <lessonTitle>
// Example: node scripts/create-lesson.js 02 "Environment Setup" 01 "Installing Prerequisites"
const args = process.argv.slice(2);

if (args.length !== 4) {
  console.error('Usage: npm run create-lesson -- <moduleNum> "<moduleName>" <lessonNum> "<lessonTitle>"');
  console.error('Example: npm run create-lesson -- 02 "Environment Setup" 01 "Installing Prerequisites"');
  process.exit(1);
}

const moduleNum = formatNumber(parseInt(args[0], 10));
const moduleName = args[1];
const lessonNum = formatNumber(parseInt(args[2], 10));
const lessonTitle = args[3];

if (isNaN(parseInt(moduleNum, 10)) || isNaN(parseInt(lessonNum, 10))) {
    console.error('Error: Module number and lesson number must be integers.');
    process.exit(1);
}

// --- File/Directory Paths ---
const moduleDirName = `${moduleNum}-${slugify(moduleName)}`;
const lessonFileName = `${lessonNum}-${slugify(lessonTitle)}.md`;

const targetModuleDir = path.join(docsDir, moduleDirName);
const targetLessonFile = path.join(targetModuleDir, lessonFileName);

// --- Read Template ---
let templateContent;
try {
  templateContent = fs.readFileSync(lessonTemplateFile, 'utf8');
} catch (err) {
  console.error(`Error reading lesson template: ${lessonTemplateFile}`, err);
  process.exit(1);
}

// --- Replace Placeholders ---
const currentYear = new Date().getFullYear();
let newContent = templateContent;
newContent = newContent.replace(/\[Module Title\]/g, moduleName);
newContent = newContent.replace(/Module X/g, `Module ${moduleNum}`); // For header/footer
newContent = newContent.replace(/\[Lesson Title\]/g, lessonTitle);
newContent = newContent.replace(/Lesson Y/g, `Lesson ${lessonNum}`); // For header/footer and titles
newContent = newContent.replace(/\[Year\]/g, currentYear.toString());

// --- Create Directory and Write File ---
try {
  // Create module directory if it doesn't exist
  if (!fs.existsSync(targetModuleDir)) {
    fs.mkdirSync(targetModuleDir, { recursive: true });
    console.log(`Created directory: ${targetModuleDir}`);
  }

  // Check if lesson file already exists
  if (fs.existsSync(targetLessonFile)) {
    console.warn(`Warning: Lesson file already exists: ${targetLessonFile}`);
    console.warn('Skipping file creation.');
    process.exit(0); // Exit gracefully, file exists
  }

  // Write the new lesson file
  fs.writeFileSync(targetLessonFile, newContent, 'utf8');
  console.log(`Successfully created lesson: ${targetLessonFile}`);

} catch (err) {
  console.error(`Error creating lesson file: ${targetLessonFile}`, err);
  process.exit(1);
}