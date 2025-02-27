#!/bin/bash

# Script to migrate Cursor rule files from .md to .mdc format
# This script will help create .mdc files with proper frontmatter

echo "Migrating Cursor rule files to .mdc format..."
echo "=============================================="

# Create the rules template file if it doesn't exist
TEMPLATE_FILE=".cursor/rules/template.mdc"
if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "Creating template file at $TEMPLATE_FILE"
  cat > "$TEMPLATE_FILE" << 'EOF'
---
name: "Template Rule"
version: "1.0"
description: "Brief description of what this rule does"
priority: "medium"
type: "Template"
globs: 
  - "**/*.js"    # JavaScript files
  - "**/*.jsx"   # React JSX files
  - "**/*.ts"    # TypeScript files
  - "**/*.tsx"   # TypeScript React files
  - "docs/**/*.md" # Markdown documentation files
triggers:
  - file_change
  - file_open
alwaysApply: false
---

# Rule Title

## Overview
This is where you provide a general overview of the rule.

## Key Guidelines
@.cursor/README.md
@docs/README.md

- Guideline 1
- Guideline 2
- Guideline 3

## Examples
```javascript
// Example code here
```

## References
- Link to reference 1
- Link to reference 2
EOF
fi

# Define rule mapping with numbering convention
# Structure: source file | rule number | rule type
RULES=(
  ".cursor/rules/index.md|001|Core"
  ".cursor/rules/project-structure.md|010|Core"
  ".cursor/rules/code-standards.md|020|Core"
  ".cursor/rules/documentation-standards.md|030|Core"
  ".cursor/rules/slide-standards.md|040|Core"
  ".cursor/rules/quality-assurance-checklist.md|050|Core"
  ".cursor/rules/technical-depth.md|060|Core"
  ".cursor/rules/course-modules.md|101|Content"
  ".cursor/rules/learning-paths.md|110|Content"
  ".cursor/rules/content-alignment-template.md|120|Content"
  ".cursor/rules/module-development-process.md|201|Process"
  ".cursor/rules/tooling-environment.md|210|Process"
)

# Function to extract title from markdown file
extract_title() {
  grep -m 1 "^# " "$1" | sed 's/^# //'
}

# Function to extract description from markdown file
extract_description() {
  grep -A 1 "^## Description" "$1" | tail -n 1 | sed 's/^This rule //' | sed 's/\.$//'
}

# Function to determine priority based on the rule type
determine_priority() {
  local rule_type="$1"
  case "$rule_type" in
    "Core")
      echo "high"
      ;;
    "Content")
      echo "medium"
      ;;
    "Process")
      echo "medium"
      ;;
    *)
      echo "low"
      ;;
  esac
}

for RULE_INFO in "${RULES[@]}"; do
  # Parse rule info
  FILE=$(echo "$RULE_INFO" | cut -d'|' -f1)
  RULE_NUMBER=$(echo "$RULE_INFO" | cut -d'|' -f2)
  RULE_TYPE=$(echo "$RULE_INFO" | cut -d'|' -f3)
  
  # Extract file name without extension
  BASE_NAME=$(basename "$FILE" .md)
  
  # New MDC file with numbering convention
  MDC_FILE=".cursor/rules/${RULE_NUMBER}-${RULE_TYPE}-${BASE_NAME}.mdc"
  
  if [ -f "$MDC_FILE" ]; then
    echo "⚠️  Skipping $BASE_NAME, .mdc file already exists at $MDC_FILE"
    continue
  fi
  
  if [ ! -f "$FILE" ]; then
    echo "⚠️  Source file $FILE not found"
    continue
  fi
  
  TITLE=$(extract_title "$FILE")
  DESCRIPTION=$(extract_description "$FILE")
  PRIORITY=$(determine_priority "$RULE_TYPE")
  
  echo "Migrating: $BASE_NAME"
  echo "  Title: $TITLE"
  echo "  Description: $DESCRIPTION"
  echo "  Rule: ${RULE_NUMBER}-${RULE_TYPE}-${BASE_NAME}"
  
  # Create MDC file with frontmatter
  echo "---" > "$MDC_FILE"
  echo "name: \"${TITLE}\"" >> "$MDC_FILE"
  echo "version: \"1.0\"" >> "$MDC_FILE"
  echo "description: \"$DESCRIPTION\"" >> "$MDC_FILE"
  echo "priority: \"$PRIORITY\"" >> "$MDC_FILE"
  echo "type: \"$RULE_TYPE\"" >> "$MDC_FILE"
  
  # Add appropriate glob patterns based on the rule file
  echo "globs: " >> "$MDC_FILE"
  
  case "$BASE_NAME" in
    "code-standards")
      echo "  - \"**/*.js\"" >> "$MDC_FILE"
      echo "  - \"**/*.jsx\"" >> "$MDC_FILE"
      echo "  - \"**/*.ts\"" >> "$MDC_FILE"
      echo "  - \"**/*.tsx\"" >> "$MDC_FILE"
      echo "  - \"**/*.html\"" >> "$MDC_FILE"
      ;;
    "documentation-standards"|"content-alignment-template"|"project-structure"|"technical-depth")
      echo "  - \"docs/**/*.md\"" >> "$MDC_FILE"
      ;;
    "slide-standards")
      echo "  - \"docs/slides/**/*.html\"" >> "$MDC_FILE"
      ;;
    "learning-paths"|"course-modules")
      echo "  - \"docs/**/*.md\"" >> "$MDC_FILE"
      echo "  - \"docs/slides/**/*.html\"" >> "$MDC_FILE"
      ;;
    "quality-assurance-checklist"|"module-development-process")
      echo "  - \"**/*\"" >> "$MDC_FILE"
      ;;
    "tooling-environment")
      echo "  - \"**/*.js\"" >> "$MDC_FILE"
      echo "  - \"**/*.jsx\"" >> "$MDC_FILE"
      echo "  - \"**/*.ts\"" >> "$MDC_FILE"
      echo "  - \"**/*.tsx\"" >> "$MDC_FILE"
      ;;
    *)
      echo "  - \"**/*\"" >> "$MDC_FILE"
      ;;
  esac
  
  # Add triggers
  echo "triggers:" >> "$MDC_FILE"
  echo "  - file_change" >> "$MDC_FILE"
  echo "  - file_open" >> "$MDC_FILE"
  
  # Determine if rule should always apply
  ALWAYS_APPLY="false"
  if [[ "$BASE_NAME" == "index" || "$BASE_NAME" == "code-standards" || "$BASE_NAME" == "quality-assurance-checklist" ]]; then
    ALWAYS_APPLY="true"
  fi
  
  echo "alwaysApply: $ALWAYS_APPLY" >> "$MDC_FILE"
  echo "---" >> "$MDC_FILE"
  echo "" >> "$MDC_FILE"
  
  # Add file references
  echo "# $TITLE" >> "$MDC_FILE"
  echo "" >> "$MDC_FILE"
  echo "@.cursor/README.md" >> "$MDC_FILE"
  
  # Add content-specific references
  case "$BASE_NAME" in
    "code-standards")
      echo "@docs/README.md" >> "$MDC_FILE"
      ;;
    "documentation-standards")
      echo "@docs/README.md" >> "$MDC_FILE"
      ;;
    "slide-standards")
      echo "@docs/slides/README.md" >> "$MDC_FILE"
      ;;
    *)
      echo "@docs/README.md" >> "$MDC_FILE"
      ;;
  esac
  
  echo "" >> "$MDC_FILE"
  
  # Append the original content, skipping the title
  tail -n +2 "$FILE" >> "$MDC_FILE"
  
  echo "✅ Created $MDC_FILE"
done

echo ""
echo "Migration complete! Please review the new .mdc files."
echo "Note: Due to a known bug with .mdc files, you may need to close Cursor"
echo "completely and select 'Override' when prompted to ensure changes persist." 