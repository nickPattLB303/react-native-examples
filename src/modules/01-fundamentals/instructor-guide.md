# Module 1: React Native Fundamentals - Instructor Guide

This guide provides recommendations for effectively teaching the React Native Fundamentals module, including timing, discussion points, common questions, and additional resources.

## Module Overview

**Duration:** 60-90 minutes (lecture) + 30 minutes (exercise/discussion)  
**Difficulty:** Beginner  
**Prerequisites:** None

## Learning Objectives

By the end of this module, participants should be able to:

1. Explain the evolution of mobile development approaches leading to React Native
2. Describe the key advantages and potential limitations of React Native
3. Understand how React Native works under the hood
4. Navigate and utilize the React Native documentation effectively

## Preparation

Before the session:

1. Review the [module content](README.md) and [slides](../../slides/01-fundamentals.html)
2. Familiarize yourself with the [exercise](../../exercises/01-pharmacy-app-vision.md) and [challenge](../../challenges/01-react-native-comparison.md)
3. Prepare examples of React Native apps to demonstrate (consider installing a few on your device)
4. Test any demos or code examples you plan to show
5. Review the latest React Native release notes for any recent changes

## Suggested Timeline

| Time | Activity |
|------|----------|
| 0:00 - 0:10 | Introduction and learning objectives |
| 0:10 - 0:25 | Mobile Development Evolution |
| 0:25 - 0:40 | Why React Native? |
| 0:40 - 0:55 | React Native Architecture |
| 0:55 - 1:10 | React Native Documentation |
| 1:10 - 1:20 | Q&A and discussion |
| 1:20 - 1:50 | Exercise: Pharmacy App Vision |
| 1:50 - 2:00 | Wrap-up and preview of next module |

## Key Discussion Points

### Mobile Development Evolution

- **Discussion Starter:** "What mobile development approaches have you worked with before?"
- **Activity Idea:** Create a timeline on a whiteboard and have participants place different frameworks/approaches on it
- **Emphasis:** The trade-offs between development efficiency and performance in different approaches

### Why React Native?

- **Discussion Starter:** "What challenges have you faced in mobile development that React Native might address?"
- **Activity Idea:** Have participants brainstorm pros and cons of React Native based on their existing knowledge
- **Emphasis:** The "learn once, write anywhere" philosophy vs. "write once, run anywhere"

### React Native Architecture

- **Discussion Starter:** "How do you think React Native achieves near-native performance while using JavaScript?"
- **Activity Idea:** Draw a diagram of the bridge architecture and have participants explain how a user interaction flows through the system
- **Emphasis:** The performance implications of the bridge and how the new architecture addresses these

### React Native Documentation

- **Discussion Starter:** "What resources do you typically use when learning a new technology?"
- **Activity Idea:** Quick scavenger hunt in the React Native docs to find specific information
- **Emphasis:** The importance of checking version-specific documentation

## Addressing Different Experience Levels

### For Participants with Native Mobile Experience

- Draw parallels between native development concepts and React Native
- Highlight where React Native simplifies common native development tasks
- Acknowledge the limitations compared to native development

### For Participants with Web/React Experience

- Emphasize the similarities with React for web
- Point out key differences in styling, navigation, and platform-specific considerations
- Show how web development skills transfer to React Native

### For Participants with No Mobile or React Experience

- Spend more time on fundamental concepts
- Use more visual explanations and analogies
- Consider pairing them with more experienced participants during activities

## Exercise Facilitation

For the "Pharmacy App Vision" exercise:

1. Introduce the exercise and explain its relevance to the course
2. Break participants into small groups (2-3 people) if possible
3. Circulate during the exercise to answer questions and provide guidance
4. Have groups share their app visions with the class
5. Highlight interesting or innovative ideas from different groups
6. Connect the exercise back to the module's key concepts

## Common Questions and Challenges

### "Is React Native suitable for all types of mobile apps?"

**Suggested Response:** "React Native is excellent for many types of apps, especially those with standard UI components and moderate performance requirements. However, apps requiring intensive graphics (like 3D games), specialized hardware access, or platform-specific features might benefit from native development or a hybrid approach. The key is to evaluate your specific requirements and constraints."

### "How does React Native compare to Flutter?"

**Suggested Response:** "Both are excellent cross-platform frameworks with different approaches. React Native uses JavaScript/TypeScript and renders to native components, making it familiar to web developers and ensuring platform-native look and feel. Flutter uses Dart and has its own rendering engine, providing more consistent cross-platform UI but with a steeper learning curve for those coming from web development. React Native has a larger community and ecosystem, while Flutter offers potentially better performance for complex animations."

### "Will I need to write native code when using React Native?"

**Suggested Response:** "For many applications, you won't need to write any native code. React Native and its ecosystem provide components and APIs for most common needs. However, for custom native functionality or optimizing performance-critical sections, you might need to write native modules. The good news is that you can start with pure JavaScript/TypeScript and add native code only when necessary."

### "How difficult is it to debug React Native applications?"

**Suggested Response:** "React Native provides several debugging tools, including Chrome Developer Tools integration, React Native Debugger, and Flipper. While debugging can be more complex than web development due to the bridge architecture and native components, the tooling has improved significantly. We'll cover debugging in detail in Module 11."

## Additional Resources

### For Instructors

- [React Native: The Past, Present, and Future](https://formidable.com/blog/2019/react-native-past-present-future/) - Historical context
- [React Native at Airbnb](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c) - Case study with pros and cons
- [The New React Native Architecture Explained](https://formidable.com/blog/2019/react-native-new-architecture/) - Detailed explanation of the new architecture

### For Participants

- [React Native Express](https://www.reactnative.express/) - Interactive learning resource
- [Awesome React Native](https://github.com/jondot/awesome-react-native) - Curated list of resources
- [React Native Radio](https://reactnativeradio.com/) - Podcast covering React Native topics

## Assessment Ideas

- **Quick Quiz:** 5-10 multiple choice questions on key concepts
- **Concept Map:** Have participants create a concept map showing the relationships between different mobile development approaches
- **Comparative Analysis:** Ask participants to compare React Native with another framework of their choice
- **Documentation Scavenger Hunt:** Provide a list of specific information to find in the React Native documentation

## Notes on Remote Delivery

If teaching remotely:

- Use breakout rooms for small group discussions and exercises
- Utilize collaborative tools like Miro or Mural for visual activities
- Consider pre-recording demos to avoid technical issues
- Use polls and chat to increase engagement
- Schedule more frequent breaks (5 minutes every 45-60 minutes)

## Feedback and Improvement

After teaching this module:

- Note which concepts participants struggled with
- Identify any outdated information that needs updating
- Collect suggestions for additional examples or activities
- Document common questions that weren't addressed in this guide

Please share your feedback and suggestions for improving this module by [creating an issue](https://github.com/your-org/react-native-course/issues) in the repository.
