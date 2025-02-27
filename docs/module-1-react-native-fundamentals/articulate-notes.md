# Module 1: React Native Fundamentals - Articulate Implementation Notes

> This document provides specific guidance for implementing Module 1 in Articulate 360.
> Reference the main [Articulate Integration Guide](../articulate-integration.md) for general workflows.

## Module Overview

Module 1 introduces the fundamentals of React Native and sets up the development environment. When implementing in Articulate 360, special attention should be given to the technical setup instructions that need to be simplified for e-learning format.

## Slide Breakdown

| Content Section | Slide Count | Slide Types | Special Considerations |
|-----------------|-------------|-------------|------------------------|
| 1.1 Introduction | 5 | Title, Content, Comparison | Use animations for React vs React Native comparison |
| 1.2 Environment Setup | 8 | Process, Screenshots | Consider video alternative for complex setup |
| 1.3 First App | 6 | Code, Process, Activity | Break code into very small segments |

## Interactive Elements

| Repository Exercise | Articulate Implementation | Notes |
|---------------------|---------------------------|-------|
| Setting Up Environment Checklist | Checkbox interaction | Break into OS-specific paths |
| Creating First Component | Step-by-step with validation | Use screenshots for each step |
| Component Quiz | Multiple choice knowledge check | Add detailed feedback for each option |

## Code Examples

| Example Name | Repository Location | Implementation Notes |
|--------------|---------------------|---------------------|
| HelloPharmacy.js | examples/module1/HelloPharmacy.js | Split into 3 progressive slides |
| MedicationList.js | examples/module1/MedicationList.js | Focus on component structure |
| AppWrapper.js | examples/module1/AppWrapper.js | Show file relationship diagram |

## Asset Inventory

| Asset | Source Location | Purpose | Processing Needed |
|-------|-----------------|---------|-------------------|
| react-native-architecture.svg | docs/assets/diagrams/ | Explain RN architecture | None - import as is |
| expo-workflow.png | docs/assets/images/ | Show development flow | Crop to focus on workflow |
| environment-setup-screenshot.png | docs/assets/images/ | Show terminal output | Add callouts to key areas |

## Pharmacy Theme Applications

For Module 1, these are the key pharmacy theme elements to maintain:

- First app should be a "Medication Information Display"
- Sample data should use medication names and dosages
- Examples should focus on pharmaceutical use cases
- Terminology should consistently use pharmacy terms

## Implementation Challenges

Potential challenges specific to Module 1:

1. **Environment Setup**: Technical setup instructions need simplification for Articulate
   - Solution: Create a separate downloadable PDF with detailed instructions

2. **Code Display**: First code examples need careful explanation for beginners
   - Solution: Use progressive build with annotations for each new concept

3. **Platform Differences**: iOS vs Android differences need clear explanation
   - Solution: Create comparison tables with screenshots of both platforms

## Knowledge Check Mapping

| Learning Objective | Repository Quiz Questions | Articulate Implementation |
|-------------------|---------------------------|---------------------------|
| Explain React Native's core concepts | 3 true/false + 2 multiple choice | Convert to standard Articulate quiz with same questions |
| Set up development environment | Environment checklist | Convert to interactive checklist with hints |
| Create basic component | Code challenge | Simplify to drag-and-drop code assembly |

## Slide Template Examples

### Introduction Slide
```
[Title] Welcome to React Native
[Image] Pharmacy app on phone
[Content] React Native lets you build mobile apps using JavaScript and React. In this module, we'll learn the fundamentals and create our first pharmaceutical information app.
```

### Code Example Slide
```
[Title] Your First Medication Component
[Code]
const MedicationItem = ({ name, dosage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
    </View>
  );
};
[Annotations]
1. Component name follows PascalCase convention
2. Props are destructured in parameters
3. Returns JSX that describes the UI
```

## Special Instructions

For the React Native Fundamentals module in Articulate:

1. Focus on conceptual understanding over technical details
2. Provide downloadable companion guide for environment setup
3. Create separate slides for iOS and Android examples
4. Use more visuals and fewer text blocks than the repository version
5. Add "Try It Yourself" links to Expo Snack for each major concept

## Additional Resources

Create links to these external resources:

1. React Native Documentation (simplified view)
2. Expo Documentation
3. Video tutorials for environment setup
4. Pharmacy app examples gallery 