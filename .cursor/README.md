# Cursor Rules for React Native Training Course

This directory contains Cursor AI rules for the React Native Training Course project. These rules help ensure consistency and quality across all aspects of the course development.

## What are Cursor Rules?

Cursor Rules are guidelines that help Cursor AI understand the project's requirements, standards, and best practices. They enable more accurate and helpful AI assistance when working on the project.

## Rules Structure

The rules are organized in the `rules` directory using the `.mdc` format:

### MDC Format
The `.mdc` format includes metadata that helps Cursor AI understand when and how to apply rules. Rules follow a numeric naming convention:

- Core Rules (001-099): Fundamental project standards
- Content Rules (100-199): Content creation and management
- Process Rules (200-299): Development workflow and processes

Example rules:
- `001-Core-index.mdc`: Overview of all rules
- `020-Core-code-standards.mdc`: Code examples and JSDoc requirements
- `110-Content-learning-paths.mdc`: Educational approach and learning paths
- `210-Process-tooling-environment.mdc`: Development tools and environments

## MDC Format Structure

The `.mdc` files follow this structure:

```yaml
---
name: "Rule Name"
version: "1.0"
description: "Detailed description of what the rule does"
priority: "high"
type: "Core"  # Can be "Core", "Content", or "Process"
globs: 
  - "**/*.js"    # File patterns this rule applies to
  - "**/*.jsx"   
triggers:
  - file_change
  - file_open
alwaysApply: false  # Whether the rule should always be applied
---
```

Key components:
- **name**: The name of the rule (usually matches the title)
- **version**: Version number for tracking changes
- **description**: A detailed explanation of what the rule does
- **priority**: Importance level of the rule ("high", "medium", or "low")
- **type**: Category of the rule ("Core", "Content", or "Process")
- **globs**: Patterns that determine which files the rule applies to
- **triggers**: Events that cause the rule to be applied (file_change, file_open)
- **alwaysApply**: When set to `true`, the rule is applied regardless of the files being edited
- **@ references**: The content can include references to other files using the `@` syntax (e.g., `@README.md`)

## Ignore Files

The project includes two special files to control what files Cursor processes:

### .cursorignore

The `.cursorignore` file (located in the project root) specifies which files and directories should be ignored by Cursor features. It follows the same syntax as `.gitignore`.

### .cursorindexignore

The `.cursorindexignore` file controls which files are excluded from Cursor's codebase indexing feature. This is more restrictive than `.cursorignore` to optimize indexing performance.

Both ignore files support standard gitignore syntax, including negation with `!` to explicitly include files that would otherwise be ignored.

## How to Use These Rules

When using Cursor AI to assist with this project:

1. Reference these rules to ensure AI-generated content follows project standards
2. Point the AI to specific rules when working on particular aspects of the project
3. Update rules as project requirements evolve

## Updating Rules

If you need to update these rules:

1. Edit the relevant rule file
2. Update the index files if necessary
3. Commit the changes to the repository
4. **Important**: Due to a known bug with .mdc files, you may need to close Cursor completely and select 'Override' when prompted to ensure changes persist 