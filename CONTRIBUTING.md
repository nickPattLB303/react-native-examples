# Contributing to the React Native Training Course

Thank you for your interest in contributing to the React Native Training Course! This document provides guidelines and processes for maintaining consistent, high-quality course content.

## Content Standards

All contributions to this course should follow these standards:

### General Guidelines

1. **Consistency**: Maintain consistent terminology, formatting, and structure
2. **Accuracy**: Ensure technical accuracy and alignment with latest React Native practices
3. **Completeness**: Provide comprehensive coverage of topics with appropriate depth
4. **Clarity**: Use clear, concise language suitable for the target audience
5. **Accessibility**: Ensure content is accessible to all participants
6. **Modularity**: Design content to work both independently and as part of the whole course

### Technical Requirements

1. **TypeScript**: All code examples must use TypeScript with proper typing
2. **Accessibility**: Include accessibility attributes and practices in all UI components
3. **Modern Practices**: Use current React Native best practices and patterns
4. **Testing**: Include references to testing where appropriate
5. **Pharmacy Theme**: All examples should relate to the SpeedyMeds pharmacy theme
6. **Cross-Platform**: Examples should work on both iOS and Android unless explicitly noted

### Content Structure

1. **Topic Files**: Follow the structure in the main-topic-template.md
2. **Exercises**: Follow the structure in exercise-template.md with 15-20 minute scope
3. **Challenges**: Follow the structure in challenge-template.md with 30-60 minute scope
4. **Slides**: Use appropriate slide templates with consistent styling

## Workflow for Contributions

### Creating New Content

1. **Use the helper scripts** to create new topic, exercise, or challenge files:
   ```bash
   ./assets/scripts/create-topic.sh "XX" "Topic Name"
   ./assets/scripts/create-exercise.sh "XX" "Exercise Name"
   ./assets/scripts/create-challenge.sh "XX" "Challenge Name"
   ```

2. **Fill in the templates** with your content, following the structure and guidelines
3. **Create any necessary images** and place them in the appropriate images directory
4. **Validate your content** using the validation script:
   ```bash
   ./assets/scripts/validate-content.sh XX
   ```

### Updating Existing Content

1. **Review the existing content** to understand its structure and purpose
2. **Make focused changes** that preserve the existing format and style
3. **Update related content** if your changes affect other files
4. **Validate the updated content** using the validation script
5. **Document your changes** in commit messages or pull request descriptions

## Pull Request Process

1. **Create a branch** for your changes with a descriptive name
2. **Make your changes** following the guidelines above
3. **Run the validation script** to ensure content meets standards
4. **Submit a pull request** with a clear description of the changes
5. **Address any review feedback** promptly

## Content Review Checklist

Before submitting content, ensure it meets these criteria:

- [ ] Follows the appropriate template structure
- [ ] Uses consistent terminology and formatting
- [ ] Includes pharmacy-themed examples and context
- [ ] Contains appropriate learning path adaptations
- [ ] All code examples use TypeScript with proper typing
- [ ] All UI components include accessibility attributes
- [ ] Includes clear learning objectives and summary
- [ ] References appropriate official documentation
- [ ] Exercises and challenges are well-defined and achievable
- [ ] Passes the validation script checks

## Style Guide

### Writing Style

- Use active voice and present tense
- Address the learner directly ("you")
- Be concise but thorough
- Define technical terms when first introduced
- Use consistent capitalization for technical terms
- Follow the Microsoft Writing Style Guide for general writing principles

### Code Style

- Follow the React Native community code style
- Use meaningful variable and function names
- Include comments for complex logic
- Use JSDoc comments for functions and components
- Follow TypeScript best practices
- Ensure code examples are complete and functional

### Visual Style

- Use the provided company theme for all slide content
- Follow a consistent visual style for diagrams and illustrations
- Ensure adequate contrast and readability
- Use the same icon style throughout diagrams

## Mermaid Diagrams

Mermaid diagrams should follow the template provided in the requirements:

```
---
config:
  theme: neo
  look: neo
---
flowchart TD
    A("fab:fa-youtube Starter Guide") --> B("fab:fa-youtube Make Flowchart")
    B --> C("fa:fa-book-open Learn More")
    C --> n1[" "] & D{"Use the editor"} & n2["Many shapes"]
    D -- Build and Design --> E("fa:fa-shapes Visual Editor")
    E --> F("fa:fa-chevron-up Add node in toolbar")
    D -- Use AI --> G("fa:fa-comment-dots AI chat")
    G --> H("fa:fa-arrow-left Open AI in side menu")
    D -- Mermaid js --> I("fa:fa-code Text")
    I --> J("fa:fa-arrow-left Type Mermaid syntax")
    n1@{ icon: "fa:gem", pos: "b", h: 24}
    n2@{ shape: delay}
    style E color:#FFFFFF, fill:#AA00FF, stroke:#AA00FF
    style G color:#FFFFFF, stroke:#00C853, fill:#00C853
    style I color:#FFFFFF, stroke:#2962FF, fill:#2962FF
```

Use Font Awesome icons (with `fa:`, `fab:` prefixes) and maintain the same color scheme.

## Questions and Support

If you have questions about contributing to the course, please [contact information here].

Thank you for helping to make this React Native training course a valuable resource for all participants!