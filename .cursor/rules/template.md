---
name: "Template Rule"
version: "1.0"
description: "Brief description of what this rule does"
priority: "medium"
type: "Core"
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
[README.md](mdc:README.md)
[README.md](mdc:docs/README.md)
[Cursor Rules README](mdc:.cursor/README.md)

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