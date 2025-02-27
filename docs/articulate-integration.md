# Articulate 360 Integration Guide

> Module: Cross-Module Resource
> Estimated time: N/A - Reference Document

## Overview

This guide outlines the process for converting React Native Training Course materials to Articulate 360 format. It provides practical workflows, templates, and best practices for ensuring consistency between the GitHub repository content and the Articulate e-learning modules.

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
2. **Check Articulate Notes**: Review the "Articulate 360 Implementation Notes" section at the end of each module
3. **Create Slide Structure**: Map content sections to Articulate slides
4. **Import Assets**: Transfer all required images and diagrams
5. **Recreate Code Examples**: Use the code snippets as text in Articulate slides
6. **Build Interactions**: Convert exercises to appropriate Articulate interactions
7. **Review**: Compare with original repository content for accuracy

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

## Module-Specific Considerations

### Module 1: React Native Fundamentals
- Heavy focus on environment setup - consider adding video demonstrations
- Make CodePen examples available via direct links

### Module 2: Components and Props
- Ensure component hierarchy visualizations are clear
- Consider adding animations for props passing between components

## Testing and Review

Before finalizing Articulate modules:

1. Review all code examples for accuracy
2. Test all interactions
3. Verify that all content from repository is covered
4. Check pharmacy theming consistency
5. Validate knowledge checks against learning objectives

## Asset Management

Track all assets using the Asset Inventory table:

| Asset Name | Source Location | Articulate Location | Notes |
|------------|-----------------|---------------------|-------|
| medication_list.png | docs/assets/images/ | Assets/Images/ | Used in 3 slides |
| PrescriptionForm.jsx | examples/module2/ | Assets/Code Examples/ | Split into 2 slides |

## Implementation Template

Each module in the repository should include an Articulate implementation section like this:

```markdown
### Articulate 360 Implementation Notes

**Slide Structure:**
- Introduction: 1 slide with learning objectives
- Core Concepts: 3-5 slides
- Code Examples: 2-3 slides per example
- Practice Activities: 1-2 interactive slides
- Summary: 1 slide

**Interactive Elements:**
- Convert the quiz to Articulate knowledge check
- Use drag-and-drop for component structure exercise

**Special Considerations:**
- This module requires extra attention to the state flow diagram
- Code examples should build progressively
```

By following these guidelines, we can maintain consistency between the repository content and the Articulate 360 version of the course while taking advantage of Articulate's interactive capabilities. 