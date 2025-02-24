# Documentation Standards and Writing Style

## Description
This rule defines the documentation standards, writing style, and formatting requirements for all content in the React Native training course.

## Rule
- All documentation must follow the Microsoft Writing Style Guide:
  - Use active voice and present tense
  - Be concise and direct
  - Use second person (you/your) when addressing the reader
  - Use gender-neutral language
  - Use consistent terminology throughout

- Course development must follow the ADDIE model:
  - Analysis: Identify learning needs and objectives
  - Design: Plan the learning approach and structure
  - Development: Create content and materials
  - Implementation: Deliver the training
  - Evaluation: Assess effectiveness and gather feedback

- Documentation must support all three learning paths:
  1. End-to-end instructor-led
  2. End-to-end self-led
  3. Async - learn specific topics as needed

- Include distinct callout boxes to guide users based on their learning path and background:
  ```markdown
  > 🔍 **Instructor Note**: Additional context for the instructor-led sessions.
  
  > 💡 **Deep Dive**: Detailed "under the hood" explanations for those interested in framework internals.
  
  > 🚀 **Quick Start**: Simplified instructions for those with relevant background knowledge.
  
  > 🔄 **Platform Specific**: Information relevant to Android/iOS/Web developers.
  ```

- All technical explanations must include detailed "under the hood" information about how React Native works internally, not just surface-level descriptions.

- All code examples must include:
  - JSDoc documentation
  - Comments explaining key concepts
  - References to official documentation where appropriate

## Examples
- Proper writing style:
  ```markdown
  # Using State in React Native

  When you create a component that needs to track changing data, you should use state. State allows your component to remember and update information over time.
  
  > 💡 **Deep Dive**: Under the hood, React Native uses a reconciliation algorithm to efficiently update only the parts of the native UI that have changed when state updates. This differs from how state works in web React because it must bridge JavaScript and native code.
  
  > 🔄 **Platform Specific**: If you're coming from Android development, this is similar to how ViewModel works with LiveData. For iOS developers, think of it as similar to SwiftUI's @State property wrapper.
  ```

- Improper writing style:
  ```markdown
  # State in React Native

  React Native has state which is used when data changes. The developer should implement state in their components when they need to track data. React Native handles the updates for you.
  ``` 