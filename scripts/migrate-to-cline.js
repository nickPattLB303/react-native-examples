#!/usr/bin/env node

/**
 * migrate-to-cline.js
 * 
 * This script converts Cursor rules (.mdc files) to Cline custom modes (.roomodes file).
 * It reads all .mdc files from the .cursor/rules directory, extracts the relevant information,
 * and generates a .roomodes file with custom modes based on the rule types.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const CURSOR_RULES_DIR = '.cursor/rules';
const OUTPUT_FILE = '.roomodes';

// Helper function to read and parse an MDC file
function parseMdcFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter (between --- markers)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) {
    console.warn(`No frontmatter found in ${filePath}`);
    return null;
  }
  
  const frontmatterYaml = frontmatterMatch[1];
  let frontmatter;
  
  try {
    frontmatter = yaml.load(frontmatterYaml);
  } catch (error) {
    console.error(`Error parsing YAML in ${filePath}:`, error.message);
    return null;
  }
  
  // Extract content (everything after the frontmatter)
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  return {
    frontmatter,
    content: markdownContent.trim()
  };
}

// Helper function to convert glob patterns to regex patterns
function globsToRegex(globs) {
  if (!globs || !Array.isArray(globs) || globs.length === 0) {
    return '.*'; // Match everything by default
  }
  
  // Convert glob patterns to regex patterns
  const regexPatterns = globs.map(glob => {
    return glob
      .replace(/\./g, '\\.')  // Escape dots
      .replace(/\*\*/g, '.*') // ** becomes .*
      .replace(/\*/g, '[^/]*'); // * becomes [^/]*
  });
  
  // Join patterns with OR operator
  return regexPatterns.join('|');
}

// Helper function to sanitize content for JSON string
function sanitizeForJson(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '\\n')
    .replace(/"/g, '\\"');
}

// Main function
async function migrateToRoomodes() {
  console.log('Starting migration of Cursor rules to Cline custom modes...');
  
  // Check if the rules directory exists
  if (!fs.existsSync(CURSOR_RULES_DIR)) {
    console.error(`Error: Directory ${CURSOR_RULES_DIR} does not exist`);
    process.exit(1);
  }
  
  // Get all MDC files
  const mdcFiles = fs.readdirSync(CURSOR_RULES_DIR)
    .filter(file => file.endsWith('.mdc') && file !== 'template.mdc')
    .map(file => path.join(CURSOR_RULES_DIR, file));
  
  console.log(`Found ${mdcFiles.length} MDC files to process`);
  
  // Parse all MDC files
  const rules = mdcFiles.map(file => {
    console.log(`Parsing ${file}...`);
    const parsed = parseMdcFile(file);
    if (!parsed) {
      console.warn(`Failed to parse ${file}`);
      return null;
    }
    
    return {
      file: path.basename(file),
      ...parsed
    };
  }).filter(Boolean);
  
  console.log(`Successfully parsed ${rules.length} rules`);
  
  // Group rules by type
  const rulesByType = {};
  rules.forEach(rule => {
    const type = rule.frontmatter.type || 'Unknown';
    if (!rulesByType[type]) {
      rulesByType[type] = [];
    }
    rulesByType[type].push(rule);
  });
  
  console.log(`Grouped rules by type: ${Object.keys(rulesByType).join(', ')}`);
  
  // Generate custom modes
  const customModes = [];
  
  for (const [type, typeRules] of Object.entries(rulesByType)) {
    // Skip template
    if (type === 'Template') continue;
    
    console.log(`Processing ${typeRules.length} rules of type ${type}`);
    
    // Create slug from type
    const slug = `${type.toLowerCase()}-rules`;
    
    // Combine all globs from rules of this type
    const allGlobs = typeRules.flatMap(rule => rule.frontmatter.globs || []);
    const fileRegex = globsToRegex(allGlobs);
    
    console.log(`Generated file regex for ${type}: ${fileRegex}`);
    
    // Generate role definition by combining rule content
    let roleDefinition = `You are Roo, an AI assistant that helps maintain ${type.toLowerCase()} standards for the React Native Training Course. Follow these guidelines:\n\n`;
    
    typeRules.forEach(rule => {
      roleDefinition += `## ${rule.frontmatter.name}\n\n`;
      roleDefinition += `${rule.frontmatter.description}\n\n`;
      roleDefinition += `${rule.content}\n\n`;
    });
    
    // Determine appropriate tool groups based on rule type
    let groups = ["read"];
    
    // Add edit group with file restrictions
    groups.push(["edit", { 
      fileRegex, 
      description: `Files matching ${type} rules` 
    }]);
    
    // Add other groups based on rule type
    if (type === 'Core' || type === 'Process') {
      groups.push("command");
    }
    
    if (type === 'Core' || type === 'Content') {
      groups.push("browser");
    }
    
    if (type === 'Process') {
      groups.push("mcp");
    }
    
    // Create custom mode
    customModes.push({
      slug,
      name: `${type} Rules`,
      roleDefinition,
      groups
    });
    
    console.log(`Created custom mode: ${slug}`);
  }
  
  // Generate .roomodes file
  const roomodesContent = {
    customModes
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(roomodesContent, null, 2));
  console.log(`Generated ${OUTPUT_FILE} with ${customModes.length} custom modes`);
  
  console.log('\nMigration complete! You can now use these custom modes in Cline.');
  console.log('To test a mode, use: roo --mode=<slug>');
}

// Run the migration
migrateToRoomodes().catch(error => {
  console.error('Error during migration:', error);
  process.exit(1);
});