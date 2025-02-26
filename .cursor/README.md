# Cursor Rules for React Native Training Course

This directory contains Cursor AI rules for the React Native Training Course project. These rules help ensure consistency and quality across all aspects of the course development.

## What are Cursor Rules?

Cursor Rules are guidelines that help Cursor AI understand the project's requirements, standards, and best practices. They enable more accurate and helpful AI assistance when working on the project.

## MDC Format

We are adopting the `.mdc` format for all rules, which provides several advantages:

- **Explicit descriptions**: Clear description field at the top of each rule
- **Targeted application**: Rules can target specific file types using glob patterns
- **Universal rules**: Rules can be set to always apply regardless of context
- **File references**: Rules can reference specific files in the project using `@` notation

## Rules Structure

The rules are organized in the `rules` directory:

### Core Rules
- [project-structure.mdc](./rules/project-structure.mdc): Repository and documentation structure
- [user-rules.mdc](./rules/user-rules.mdc): Core principles for Claude assistance
- [code-standards.md](./rules/code-standards.md): Code examples and JSDoc requirements
- [documentation-standards.md](./rules/documentation-standards.md): Writing style and formatting

### Training Content Rules
- [course-modules.md](./rules/course-modules.md): Course modules and organization
- [learning-paths.md](./rules/learning-paths.md): Educational approach and learning paths
- [technical-depth.md](./rules/technical-depth.md): Technical explanations and depth
- [slide-standards.md](./rules/slide-standards.md): Presentation and slide standards

### Development Rules
- [tooling-environment.md](./rules/tooling-environment.md): Development tools and environments

### Integration Rules
- [articulate360-integration.mdc](./rules/articulate360-integration.mdc): Guidelines for Articulate 360 integration
- [slack-channel-integration.mdc](./rules/slack-channel-integration.mdc): Slack channel usage and organization

### Training Delivery Rules
- [instructor-session-management.mdc](./rules/instructor-session-management.mdc): ADDIE model for instructor sessions
- [react-native-promotion.mdc](./rules/react-native-promotion.mdc): Promoting React Native adoption

## Migration Status

We are in the process of migrating all rules to the `.mdc` format. See [migration-plan.mdc](./migration-plan.mdc) for details.

## Utilities

The following utility scripts are available to work with rules:

- [create-mdc-rule.js](../scripts/create-mdc-rule.js): Generate new MDC rule files
- [convert-md-to-mdc.js](../scripts/convert-md-to-mdc.js): Convert existing MD rules to MDC format

## How to Use These Rules

When using Cursor AI to assist with this project:

1. Reference these rules to ensure AI-generated content follows project standards
2. Point the AI to specific rules when working on particular aspects of the project
3. Update rules as project requirements evolve

## Additional Tools

- [.cursorignore](../.cursorignore): Specifies files to exclude from Cursor's indexing

## Updating Rules

If you need to update these rules:

1. Edit the relevant rule file or create a new one using the utility scripts
2. Update this README file if necessary
3. Commit the changes to the repository 