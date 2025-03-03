# Module 1 Challenge: React Native Fundamentals Analysis

## Objective
Analyze different approaches to building a medication reminder app and evaluate the suitability of React Native for this project.

**Prerequisite Knowledge**: Module 1 content
**Estimated Time**: 45-60 minutes

> 💡 **Tip**: This challenge is about applying concepts, not creating perfect diagrams or exhaustive analyses. If you find yourself going down a rabbit hole on any section, just capture your main thoughts and move on. The architecture diagram is particularly helpful for cementing your understanding, but don't stress about making it perfect. Remember, this is just the intro - you'll get plenty more practice with these concepts!

## Challenge Description

In this challenge, you'll analyze a hypothetical medication reminder app from multiple perspectives. This app needs to:

1. Display a list of medications with dosage information
2. Send notifications for medication reminders
3. Allow users to mark medications as taken
4. Track adherence over time with simple charts
5. Scan medication barcodes (optional feature)

## Tasks

### 1. Approach Comparison

Create a comparison table evaluating how this app could be built using:
- Native iOS (Swift/UIKit)
- Native Android (Kotlin/Jetpack Compose)
- React Native
- Progressive Web App (PWA)

For each approach, consider:
- Development time and resources required
- Performance characteristics
- User experience quality
- Access to platform features
- Maintenance complexity

### 2. Architecture Analysis

For the React Native approach specifically:

1. Draw a high-level architecture diagram showing:
   - Key components and their relationships
   - Data flow between components
   - Integration with native features (notifications, barcode scanning)
   
2. Identify potential performance bottlenecks and how you would address them

3. Describe how you would structure the codebase, including:
   - Directory organization
   - Key files and their purposes
   - Third-party dependencies you would consider

### 3. Bridge Communication Analysis

For the medication reminder notification feature:

1. Trace the flow of data and control when:
   - A scheduled reminder needs to trigger a notification
   - The user taps on a notification to open the app
   - The app needs to access the device's camera for barcode scanning

2. Explain what happens at each step in the React Native architecture

### 4. Documentation Reference

For each of the following features, identify the specific section of the React Native documentation you would reference:

1. Creating the medication list interface
2. Implementing the notification system
3. Building the barcode scanning feature
4. Creating the adherence charts
5. Storing medication data locally

## Submission

Complete this challenge using the following resources:
- [Module 1 Challenge Analysis Microsoft Form](https://forms.office.com/r/module1ChallengeAnalysis) for the approach comparison table and documentation reference list
- [Module 1 Challenge Architecture Microsoft Whiteboard](https://whiteboard.microsoft.com/module1ChallengeArchitecture) for the React Native architecture diagram and bridge communication flow analysis

Your submission should include:
- The approach comparison table
- The React Native architecture diagram
- The bridge communication flow analysis
- Documentation reference list

## Evaluation Criteria

Your submission will be evaluated based on:
- Depth of understanding of React Native concepts
- Accuracy of technical explanations
- Clarity of diagrams and visualizations
- Thoughtfulness of architecture decisions
- Proper reference to documentation resources

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Architecture Overview](https://reactnative.dev/architecture/overview)

> 🔍 **Instructor Note**: This challenge assesses conceptual understanding rather than coding skills. Look for evidence that participants grasp the architectural concepts and can think critically about platform choices.

> 🚀 **Self-Led Learners**: Focus on the architecture diagram and bridge communication analysis, as these demonstrate your understanding of React Native's internal workings. 