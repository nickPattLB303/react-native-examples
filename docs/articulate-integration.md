# Articulate 360 Integration Guide

> Module: Cross-Module Resource
> Estimated time: N/A - Reference Document

## Overview

This guide outlines the process for converting React Native Training Course materials to Articulate 360 format. It provides practical workflows, templates, and best practices for ensuring consistency between the GitHub repository content and the Articulate e-learning modules.

## Core Principles

1. **Repository First, Articulate Second**: We prioritize building a complete, high-quality repository. Articulate conversion is a secondary concern that should not slow down repository development.

2. **Conversion-Friendly Structure**: Create content with future conversion in mind, but don't let it dictate your approach.

3. **Documentation Over Constraints**: Document conversion considerations rather than enforcing strict limitations on repository content.

4. **Batch Conversion Planning**: Plan for Articulate conversion as a separate phase rather than trying to develop both simultaneously.

5. **Simplicity Over Perfection**: It's better to have complete repository content that needs adaptation than incomplete content that's perfectly Articulate-ready.

## Articulate 360 Project Structure

The Articulate 360 version of this course should mirror the module structure in this repository:

```
Articulate Project/
├── Module 1 - React Native Fundamentals/
│   ├── 1.1 Introduction to React Native
│   ├── 1.2 Setting Up Your Environment
│   └── 1.3 Creating Your First App
├── Module 2 - Components and Props/
│   ├── 2.1 Understanding Components
│   └── 2.2 Working with Props
└── Assets/
    ├── Code Examples/
    ├── Images/
    └── Diagrams/
```

## Content Conversion Workflow

Follow this process when converting repository content to Articulate 360:

1. **Review the Module**: Read through the entire module in the repository
2. **Check Articulate Notes**: Review the "Articulate Conversion Notes" section at the end of each module
3. **Create Slide Structure**: Map content sections to Articulate slides
4. **Import Assets**: Transfer all required images and diagrams
5. **Recreate Code Examples**: Use the code snippets as text in Articulate slides
6. **Build Interactions**: Convert exercises to appropriate Articulate interactions
7. **Review**: Compare with original repository content for accuracy

## Simplified Documentation Approach

During repository development, maintain minimal but useful documentation for future Articulate conversion:

1. **Brief Conversion Notes**: Include a short "Articulate Conversion Notes" section at the end of each module
2. **Asset Source Files**: Keep source files for diagrams and complex visuals
3. **Logical Content Structure**: Organize content in a way that naturally maps to slide sequences

## Slide Templates

We've created standardized Articulate slide templates for different content types:

| Content Type | Articulate Template | Notes |
|--------------|---------------------|-------|
| Concept Introduction | Title + Content | Use for introducing new concepts |
| Code Example | Code Display | Use syntax highlighting matching repository examples |
| Step-by-Step Instruction | Process | Use for sequential instructions |
| Knowledge Check | Multiple Choice | Include feedback for each option |
| Hands-on Exercise | Interactive Activity | Use for guided practice activities |

## Code Example Conversion

When converting code examples:

1. **Maintain Color Coding**: Recreate the syntax highlighting manually
2. **Use Progressive Build**: For complex examples, use Articulate's animation to build code progressively
3. **Add Callouts**: Use Articulate markers to highlight key parts of the code
4. **Include Copy Button**: Allow learners to copy code for use in their own environment

## Exercise Adaptation

Repository exercises should be converted to Articulate as follows:

| Repository Exercise Type | Articulate Implementation |
|--------------------------|---------------------------|
| CodePen/Expo Snack | Link to external resource + simplified recreation in Articulate |
| Multiple Choice | Native Articulate quiz |
| Hands-on Coding | Step-by-step instructions with screenshots |
| Diagramming Exercise | Drag-and-drop interaction in Storyline |

## Pharmacy Theme Consistency

Ensure all Articulate slides maintain the medication/pharmacy theme:

1. Use consistent terminology (prescriptions, medications, patients)
2. Keep the same example scenarios used in the repository
3. Maintain the visual theme across slides
4. Use pharmacy-related images and icons where appropriate

## Testing and Review

Before finalizing Articulate modules:

1. Review all code examples for accuracy
2. Test all interactions
3. Verify that all content from repository is covered
4. Check pharmacy theming consistency
5. Validate knowledge checks against learning objectives

## Simplified Articulate Notes Template

Each module should include a brief "Articulate Conversion Notes" section:

```markdown
#### Articulate Conversion Notes

**Key Visuals**: 
- Component hierarchy diagram (will need simplification)
- State flow chart (consider animation in Articulate)

**Interactive Opportunities**:
- The component matching exercise could use Articulate's matching interaction
- Consider converting the debugging challenge to a scenario-based interaction

**Potential Challenges**:
- The live coding section will need an alternative approach in Articulate
```

## Validation Approach

Keep validation lightweight and non-blocking:

1. **Optional Checks**: Run Articulate compatibility checks separately from main validation
2. **Warning-Only**: Treat Articulate compatibility issues as warnings, not errors
3. **Focus on Major Issues**: Only flag significant problems that would make conversion difficult

## Potential Conversion Challenges

Be aware of these common challenges when planning content:

1. **Complex Diagrams**: Diagrams with many interconnected elements may need to be simplified or split
2. **Interactive Code Examples**: Live coding exercises need alternative approaches in Articulate
3. **Deep Technical Content**: Very detailed technical explanations may need visual aids in Articulate
4. **Platform-Specific Instructions**: Multi-platform instructions may need separate slides in Articulate

## Balancing Progress with Conversion Planning

Remember these key principles:

1. **Don't Overoptimize**: It's better to have complete repository content that needs adaptation than incomplete content that's perfectly Articulate-ready.

2. **Leverage Articulate's Strengths**: Some content may actually work better when reimagined for Articulate rather than directly converted.

3. **Separate Concerns**: Keep repository development and Articulate planning as related but separate workflows.

4. **Document Decisions**: When you make choices that might affect Articulate conversion, briefly document your reasoning.

By following these guidelines, we can maintain consistency between the repository content and the Articulate 360 version of the course while taking advantage of Articulate's interactive capabilities and without slowing down repository development. 