# Module 1: React Native Fundamentals - Instructor Session Guide

> Preparation Time: 60 minutes  
> Session Duration: 4 hours  
> Required Materials: Module 1 slides, environment setup repository, prescription tracker starter code

## Session Preparation Checklist

### Technical Setup
- [ ] Environment verification:
  - [ ] React Native development environment installed and tested
  - [ ] Expo CLI and Expo Go app functioning on demonstration device
  - [ ] Create a new blank project to verify setup works
  - [ ] Test run starter code for prescription tracker example
  - [ ] Prepare fallback Expo Snack links for all examples

- [ ] Presentation readiness:
  - [ ] Test all slides on presentation equipment
  - [ ] Verify code syntax highlighting is visible from back of room
  - [ ] Prepare terminal with increased font size for demonstrations
  - [ ] Set up mobile device screen mirroring for app demonstrations
  - [ ] Prepare backup screenshots of all app stages

### Content Preparation
- [ ] Review participant information:
  - [ ] Pre-assessment results on JavaScript/React experience
  - [ ] Distribution of learning paths (beginner/intermediate/advanced)
  - [ ] Any specific accommodation needs
  - [ ] Industry background of participants (pharmacy knowledge level)

- [ ] Customize examples:
  - [ ] Adjust pharmacy examples based on participant demographics
  - [ ] Prepare simplified examples for groups with limited JS experience
  - [ ] Identify advanced topics to cover for experienced developers
  - [ ] Prepare pharmacy-specific analogies for React Native concepts

### Materials Distribution
- [ ] Prepare for distribution:
  - [ ] Session handouts with key concepts and code snippets
  - [ ] GitHub repository access instructions
  - [ ] Troubleshooting guide for common setup issues
  - [ ] Quick reference card for React Native core components

## Session Blueprint

### Welcome and Introduction [15 min] [Slides 1-5]

> "Welcome to the React Native Training Course. I'm excited to guide you through building cross-platform mobile applications with React Native, using examples from the pharmacy industry to make our learning relevant and practical."

👥 **Opening Activity**: Round-robin introduction - name, role, one mobile app you use daily (5 min)

*Opening questions to gauge audience:*
- "Who has experience with React for web development?"
- "Who has published a mobile app before?"
- "What's your biggest challenge in mobile development?"

💊 **Pharmacy Connection**: Introduce how mobile apps are transforming pharmacy workflows and patient medication management

### Course Overview [10 min] [Slides 6-10]

*Key points to emphasize:*
- Training structure and progression
- Pharmacy theme throughout all examples
- Hands-on, project-based approach
- Learning paths accommodations

🟢 **For beginners**: Reassure that we'll build foundations step by step
🟣 **For advanced**: Highlight opportunities to explore advanced patterns

### Why React Native? [25 min] [Slides 11-20]

> "React Native offers a powerful solution for developing pharmacy applications that need to run on both iOS and Android, while maintaining native performance and feel."

*Key concepts to cover:*
- Cross-platform vs. native development trade-offs
- React Native's "learn once, write anywhere" philosophy
- Performance considerations for healthcare applications
- React Native's market position and community support

💊 **Pharmacy Connection**: Discuss how React Native enables pharmacies to deploy consistent experiences across different devices used by staff and patients

👥 **Discussion Activity**: "What features would be critical for a pharmacy mobile app?" (5 min)

### Break [10 min]

*During break:*
- Check Webex channel for any pre-posted questions
- Prepare environment for React Native fundamentals demonstration
- Set up sample project on demonstration device

### React Native Architecture [30 min] [Slides 21-30]

*Key technical points:*
- JavaScript thread and native bridge
- Component-based architecture
- Virtual DOM and reconciliation
- Native modules and third-party integration

*Visual aids to use:*
- Architecture diagram highlighting JS thread, native bridge, and UI components
- Component tree visualization for a medication list screen

🟢 **For beginners**: Focus on the high-level mental model
🟡 **For intermediate**: Explain reconciliation in more detail
🟣 **For advanced**: Discuss performance implications of bridge communication

### Live Demonstration: Setting Up React Native Environment [40 min]

*Pre-demonstration preparation:*
- Clear prior installations to demonstrate from scratch
- Have troubleshooting solutions ready for common errors
- Prepare Expo Snack fallback if local setup encounters issues

> "Let's set up a React Native development environment together. I'll walk through each step, explaining not just what we're doing but why, and how these components work together."

*Step-by-step demonstration:*
1. Node.js and npm installation verification
2. Installing Expo CLI
3. Creating a new project
4. Folder structure explanation
5. Running on simulator/device
6. Making a simple change to demonstrate hot reloading

*Potential issues to watch for:*
- Node version compatibility issues
- Expo CLI installation errors
- Simulator/device connection problems
- Metro bundler failing to start

👥 **Guided Practice**: Have participants follow along on their machines
- Circulate assistant instructors to help troubleshoot
- Use colored cards system for help requests (red = blocked, yellow = question)

### Lunch Break [60 min]

*Pre-lunch assignment:*
> "During lunch, please complete the environment setup if you haven't already. Post any issues to the #help-desk channel in Webex."

*Lunch break instructor activities:*
- Address any setup issues from morning session
- Prepare medication tracker example for afternoon
- Review and adjust afternoon pace based on morning progress

### Core Components Overview [30 min] [Slides 31-40]

> "Now that we have our environment ready, let's explore the essential building blocks of React Native apps - the core components that we'll use to build our pharmacy applications."

*Components to cover with pharmacy examples:*
- View (container for prescription details)
- Text (medication instructions)
- Image (medication appearance)
- ScrollView (scrollable medication list)
- TextInput (dosage calculator input)
- TouchableOpacity (refill request button)

💊 **Pharmacy Connection**: For each component, provide a specific example of where it would be used in a pharmacy application

🟢 **For beginners**: Focus on the most commonly used props
🟣 **For advanced**: Mention performance considerations and alternatives

### Hands-On Exercise: Building a Simple Medication Display [45 min]

*Exercise setup:*
- Distribute starter code via repository or Expo Snack
- Review requirements and expected outcome
- Demonstrate completed version briefly

*Exercise requirements:*
1. Create a screen that displays medication information:
   - Medication name and strength
   - Dosage instructions
   - Pharmacy information
   - Refill button

2. Style the components appropriately:
   - Use StyleSheet for all styles
   - Implement a pharmacy-themed color scheme
   - Ensure text is appropriately sized and weighted

👥 **Facilitation approach:**
- Give participants 30 minutes of work time
- Provide checkpoint guidance at 10-minute intervals
- For stuck participants, offer progressive hints
- For quick finishers, suggest extensions (adding images, animations)

### Solution Walkthrough [20 min]

> "Let's review the solution to our medication display exercise, focusing on best practices and common pitfalls."

*Walkthrough focus points:*
- Component structure choices
- StyleSheet organization
- Accessibility considerations
- Performance optimization opportunities

🟢 **For beginners**: Highlight structure and basic styling
🟡 **For intermediate**: Focus on organization and best practices
🟣 **For advanced**: Discuss optimization and edge cases

### Break [15 min]

*During break:*
- Set up for styling deep dive
- Check Webex for questions
- Prepare styling examples on device

### Styling in React Native [40 min] [Slides 41-50]

> "Styling in React Native follows a subset of CSS with some important differences. Let's explore how to create consistent, maintainable styles for our pharmacy applications."

*Key styling concepts:*
- StyleSheet API benefits
- Flexbox layout system
- Platform-specific styling
- Responsive design approaches
- Theming and style organization

*Live demonstration:*
- Converting a medication list from basic to well-styled UI
- Implementing responsive layouts
- Handling different screen sizes

💊 **Pharmacy Connection**: Discuss the importance of clear visual hierarchy in medication information displays for patient safety

### Q&A and Day 1 Wrap-Up [20 min]

👥 **Knowledge Consolidation Activity**: "Write down three key concepts you learned today and one question you still have"

*Wrap-up points:*
- Recap key learnings from Module 1
- Address common questions from activity
- Preview Module 2 content on Components and Props
- Explain evening assignment

*Assignment instructions:*
> "Tonight, please complete the Module 1 exercise in the repository: creating a medication list screen with at least three medications. Post screenshots to the #module1 channel in Webex. We'll review these tomorrow morning."

## Learning Path Adaptations

### Beginner Path Support

*Key areas requiring additional support:*
- JavaScript fundamentals in React Native context
- Understanding component-based architecture
- Setting up development environment
- Debugging basics

*Support strategies:*
- Provide simplified starter code with more comments
- Offer "code completion" exercises rather than "code from scratch"
- Use more visual analogies for React concepts
- Schedule optional 30-minute post-session support time

### Intermediate Path Extensions

*Areas for deeper exploration:*
- Styling best practices and organization
- Performance considerations
- Debugging techniques
- Platform-specific adaptations

*Extension activities:*
- Challenge to implement custom component compositions
- Suggest refactoring exercises for provided examples
- Pose "what if" scenarios for edge cases

### Advanced Path Challenges

*Advanced topics to address:*
- Bridge communication performance
- Native module integration
- Architecture patterns for complex applications
- Testing strategies

*Challenge options:*
- Implement a complex layout with nested ScrollViews
- Create a custom animated component
- Optimize rendering for long medication lists
- Develop platform-specific adaptations

## Demonstration Plan

### Demo 1: Environment Setup

*Starting point:*
- Fresh development machine (or virtual environment)

*Steps to demonstrate:*
1. Node.js verification: `node -v` and `npm -v`
2. Expo CLI installation: `npm install -g expo-cli`
3. Project creation: `expo init PharmacyTracker`
4. Selecting template: blank (TypeScript)
5. Project structure exploration
6. Starting the development server: `npm start`
7. Running on iOS simulator, Android emulator, and physical device
8. Making a simple change to App.js
9. Demonstrating hot reload functionality

*Potential issues and fallbacks:*
- Issue: Node.js version incompatibility
  - Fallback: Use nvm to install compatible version
- Issue: Expo CLI installation fails
  - Fallback: Use npx instead: `npx expo-cli init PharmacyTracker`
- Issue: Simulator/emulator doesn't connect
  - Fallback: Use Expo Snack with QR code to physical device
- Issue: Metro bundler errors
  - Fallback: Clear cache and restart: `expo start -c`

### Demo 2: Creating a Medication Component

*Starting code:*
```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationComponent = () => {
  // We'll build this together
  return (
    <View>
      <Text>Medication Component</Text>
    </View>
  );
};

export default MedicationComponent;
```

*Live coding steps:*
1. Add medication data object
2. Implement component JSX structure
3. Add basic styling
4. Demonstrate props usage
5. Add conditional rendering
6. Implement proper styling with StyleSheet
7. Discuss and implement platform-specific adjustments

*Final code target:*
```jsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const MedicationComponent = ({ medication }) => {
  const { name, dosage, instructions, isHighPriority } = medication;
  
  return (
    <View style={[styles.container, isHighPriority && styles.highPriority]}>
      <Text style={styles.medicationName}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  highPriority: {
    borderLeftWidth: 4,
    borderLeftColor: '#c00',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0052cc',
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica Neue',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  dosage: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#555',
  },
});

export default MedicationComponent;
```

## Exercise Facilitation Guide

### Medication Display Exercise

*Setup instructions:*
1. Direct participants to the `/exercises/module1/medication-display/` folder
2. Review README.md for exercise requirements
3. Ensure everyone can run the starter code

*Participant instructions:*
> "Using the starter code provided, build a medication display component that shows medication details and styling according to the requirements. You have 30 minutes to complete this exercise."

*Facilitation strategy:*
- First 5 minutes: Clarify requirements and answer initial questions
- At 10 minutes: Check-in on progress, address common issues
- At 20 minutes: Provide hint about styling approaches if needed
- Last 5 minutes: Reminder to finalize and prepare to discuss approach

*Common issues to watch for:*
- Confusion between View and Text component usage
- StyleSheet syntax errors
- Flexbox layout challenges
- Conditional styling implementation

*Solution walkthrough approach:*
1. Start with component structure decisions
2. Explain styling choices
3. Demonstrate alternatives where relevant
4. Connect to real-world pharmacy application needs

## Q&A Preparation

### Anticipated Questions and Answers

1. **Q: "How does React Native's performance compare to fully native apps?"**
   A: "React Native approaches native performance for most UI interactions because it renders using native components. The JavaScript bridge can introduce some overhead for complex interactions or animations. For pharmacy apps handling standard UI and data display, performance differences are typically minimal. Areas requiring intense computation might benefit from native modules."

2. **Q: "Do I need to learn Swift/Kotlin to use React Native effectively?"**
   A: "For most pharmacy application features, you won't need Swift or Kotlin. However, understanding basic native concepts can help when debugging or when you need to extend React Native with custom native modules. We recommend focusing on JavaScript/React fundamentals first, then exploring native code as needed for specific requirements."

3. **Q: "How do I handle offline capabilities for a pharmacy app?"**
   A: "Offline capabilities are crucial for pharmacy apps, especially in clinical settings with potential connectivity issues. React Native offers several approaches: AsyncStorage for simple data, SQLite for structured storage, or libraries like WatermelonDB for more complex offline-first architectures. We'll cover offline strategies in detail in Module 5."

4. **Q: "What's the best way to organize styles in a large React Native project?"**
   A: "For pharmacy apps with consistent design language, we recommend: 1) A theme file with colors, spacing, and typography, 2) Component-specific StyleSheet objects, 3) Shared style utilities for common patterns, and 4) Consider style libraries like styled-components for more complex theming. This maintains the medication/pharmacy theme consistently across the application."

### Challenge Question Strategies

*For deeper technical questions:*
- Acknowledge complexity
- Provide concise answer for current context
- Offer to explore in depth during breaks
- Connect to relevant module later in course

*For out-of-scope questions:*
- Validate the importance of the question
- Briefly explain how it relates to the current topic
- Note when/if it will be covered later
- Offer resources for self-exploration

### Handling Unknown Questions

*When you don't know the answer:*
1. Acknowledge the good question
2. Be honest about not having an immediate answer
3. Suggest exploration approach: "Let's think about how we might solve this..."
4. Commit to researching and following up: "I'll research this during break and get back to you..."
5. Consider if another participant might have insight to share

## Session Closure

### Key Concept Summary

*Main takeaways to emphasize:*
1. React Native enables cross-platform development with a single codebase
2. Component-based architecture allows for maintainable, reusable UI elements
3. Styling follows CSS-like patterns with important platform-specific considerations
4. The development workflow emphasizes rapid iteration and hot reloading

### Preview of Module 2

> "Tomorrow in Module 2, we'll dive deeper into components and props, learning how to create more sophisticated interfaces for our pharmacy application. We'll explore component composition, data flow through props, and best practices for building maintainable component hierarchies."

*Specific topics to highlight:*
- Component lifecycle and hooks
- Props versus state
- Component composition patterns
- PropTypes for type checking

### Assignment Instructions

*Evening exercise:*
> "Please complete the medication list exercise in the repository. Create a scrollable list displaying at least three medications with different styling based on medication attributes like priority or interaction warnings. This will prepare you for tomorrow's work on component composition."

*Resources to highlight:*
- Reference implementation in `/examples/module1/MedicationList.js`
- Styling guide in documentation
- React Native FlatList documentation

### Feedback Collection

👥 **End-of-Day Survey**: Distribute quick feedback form with:
1. One concept that's clear
2. One concept that's still confusing
3. Pace assessment (too fast, just right, too slow)
4. Specific requests for tomorrow

## Webex Integration

### Pre-Session Webex Activities
- Post welcome message with first-day preparation instructions
- Share environment setup guide and troubleshooting resources
- Create thread for participants to introduce themselves

### In-Session Webex References
- Mention relevant Webex channels at the start of each major section
- Direct specific questions to Webex for extended discussion
- Highlight the #help-desk channel for environment setup issues

### Post-Session Webex Follow-up
- Post session summary with key points
- Create thread for assignment submissions
- Schedule office hours for additional questions
- Post preview questions for next module

## Articulate Integration

*Content overlap with Articulate:*
- Environment setup tutorials
- Core components reference
- Basic styling guide

*Live session value-adds beyond Articulate:*
- Interactive troubleshooting of environment issues
- Real-time Q&A on React Native concepts
- Live demonstrations of code changes and effects
- Collaborative problem-solving activities

*References to Articulate content:*
> "For additional review of today's concepts, the Articulate module on React Native Fundamentals provides detailed explanations and interactive examples, particularly the sections on core components and styling."

## Continuous Improvement Notes

*After each delivery, update these notes:*

- **First delivery date:** [To be completed]
- **Instructor:** [Name]
- **Pace assessment:** [Too fast/slow/just right]
- **Time adjustments needed:** [Section-specific notes]
- **Successful activities:** [List highlights]
- **Challenging sections:** [List areas needing improvement]
- **Participant feedback highlights:** [Key quotes or themes]
- **Recommended changes for next delivery:** [Specific adjustments] 