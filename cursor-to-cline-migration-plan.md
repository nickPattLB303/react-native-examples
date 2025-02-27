# Plan: Converting Cursor Rules to Cline Rules

## 1. Understanding the Differences

**Cursor Rules:**
- Stored as `.mdc` files in `.cursor/rules/` directory
- Have YAML frontmatter with metadata (name, version, description, priority, type, globs, triggers, alwaysApply)
- Content is in Markdown format
- Rules are applied based on file patterns and triggers

**Cline Rules:**
- Defined as custom modes in either:
  - Global file: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_custom_modes.json`
  - Workspace-specific: `.roomodes` file in the workspace root
- Custom modes have a JSON structure with fields like slug, name, roleDefinition, groups, and optional customInstructions
- Modes can have tool group restrictions (read, edit, browser, command, mcp)

## 2. Mapping Strategy

We'll map Cursor rules to Cline custom modes as follows:

1. **Rule Categories → Custom Modes**:
   - Core Rules → Core mode
   - Content Rules → Content mode
   - Process Rules → Process mode

2. **Rule Content → Role Definitions**:
   - The Markdown content of each rule will be incorporated into the roleDefinition field
   - References to other files will be included as context

3. **File Patterns → Tool Group Restrictions**:
   - The globs patterns will be converted to fileRegex patterns for the edit tool group

## 3. Implementation Steps

### Step 1: Create a `.roomodes` file structure
Create a basic structure for the `.roomodes` file with the three main categories of modes.

### Step 2: Extract content from Cursor rules
For each category (Core, Content, Process), extract the relevant content from the corresponding `.mdc` files.

### Step 3: Transform the content
Convert the extracted content into the format required for Cline custom modes.

### Step 4: Generate the `.roomodes` file
Combine all the transformed content into a single `.roomodes` file.

### Step 5: Test and refine
Test the custom modes in Cline and refine as needed.

## 4. Implementation Details

### Creating a Migration Script

We'll create a Node.js script that will:

1. Read all `.mdc` files from the `.cursor/rules/` directory
2. Parse the YAML frontmatter and Markdown content
3. Group the rules by type (Core, Content, Process)
4. Generate a role definition for each mode type by combining the relevant rule content
5. Create appropriate file restrictions based on the glob patterns
6. Generate the `.roomodes` file with the custom modes

### Example `.roomodes` Structure

```json
{
  "customModes": [
    {
      "slug": "core-rules",
      "name": "Core Rules",
      "roleDefinition": "You are Roo, an AI assistant that helps maintain core standards for the React Native Training Course. Follow these guidelines:\n\n[Content from Core rules...]",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.md$|\\.js$|\\.jsx$|\\.ts$|\\.tsx$|\\.html$", "description": "Documentation and code files" }],
        "browser",
        "command"
      ]
    },
    {
      "slug": "content-rules",
      "name": "Content Rules",
      "roleDefinition": "You are Roo, an AI assistant that helps maintain content standards for the React Native Training Course. Follow these guidelines:\n\n[Content from Content rules...]",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.md$|\\.html$", "description": "Documentation and slide files" }],
        "browser"
      ]
    },
    {
      "slug": "process-rules",
      "name": "Process Rules",
      "roleDefinition": "You are Roo, an AI assistant that helps maintain process standards for the React Native Training Course. Follow these guidelines:\n\n[Content from Process rules...]",
      "groups": [
        "read",
        ["edit", { "fileRegex": "\\.js$|\\.jsx$|\\.ts$|\\.tsx$", "description": "Code files" }],
        "command",
        "mcp"
      ]
    }
  ]
}
```

## 5. Detailed Migration Script Implementation

Here's a detailed implementation plan for the migration script (`migrate-to-cline.js`):

```javascript
// Required dependencies
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // You'll need to install this: npm install js-yaml

// Configuration
const CURSOR_RULES_DIR = '.cursor/rules';
const OUTPUT_FILE = '.roomodes';

// Helper function to read and parse an MDC file
function parseMdcFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter (between --- markers)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) {
    return null;
  }
  
  const frontmatterYaml = frontmatterMatch[1];
  const frontmatter = yaml.load(frontmatterYaml);
  
  // Extract content (everything after the frontmatter)
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  return {
    frontmatter,
    content: markdownContent.trim()
  };
}

// Helper function to convert glob patterns to regex patterns
function globsToRegex(globs) {
  if (!globs || !Array.isArray(globs)) {
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

// Main function
async function migrateToRoomodes() {
  // Get all MDC files
  const mdcFiles = fs.readdirSync(CURSOR_RULES_DIR)
    .filter(file => file.endsWith('.mdc'))
    .map(file => path.join(CURSOR_RULES_DIR, file));
  
  // Parse all MDC files
  const rules = mdcFiles.map(file => {
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
  
  // Group rules by type
  const rulesByType = {};
  rules.forEach(rule => {
    const type = rule.frontmatter.type || 'Unknown';
    if (!rulesByType[type]) {
      rulesByType[type] = [];
    }
    rulesByType[type].push(rule);
  });
  
  // Generate custom modes
  const customModes = [];
  
  for (const [type, typeRules] of Object.entries(rulesByType)) {
    // Skip template
    if (type === 'Template') continue;
    
    // Create slug from type
    const slug = `${type.toLowerCase()}-rules`;
    
    // Combine all globs from rules of this type
    const allGlobs = typeRules.flatMap(rule => rule.frontmatter.globs || []);
    const fileRegex = globsToRegex(allGlobs);
    
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
  }
  
  // Generate .roomodes file
  const roomodesContent = {
    customModes
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(roomodesContent, null, 2));
  console.log(`Generated ${OUTPUT_FILE} with ${customModes.length} custom modes`);
}

// Run the migration
migrateToRoomodes().catch(console.error);
```

### Installation and Usage

To use the migration script:

1. Install the required dependencies:
   ```bash
   npm install js-yaml
   ```

2. Create the script file:
   ```bash
   mkdir -p scripts
   touch scripts/migrate-to-cline.js
   # Copy the script content into this file
   chmod +x scripts/migrate-to-cline.js
   ```

3. Run the script:
   ```bash
   node scripts/migrate-to-cline.js
   ```

4. Verify the generated `.roomodes` file:
   ```bash
   cat .roomodes
   ```

## 6. Testing and Validation

After generating the `.roomodes` file:
1. Validate the JSON structure
2. Test each custom mode in Cline
3. Verify that the file restrictions work as expected
4. Make any necessary adjustments to the role definitions or file restrictions

## 7. Next Steps

1. Switch to Code mode to implement the migration script
2. Run the script to generate the `.roomodes` file
3. Test the custom modes in Cline
4. Refine as needed