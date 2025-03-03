# Mobile Development Approaches Quiz

## Instructions for Instructors
This file contains the questions, answer options, and explanations for the Mobile Development Approaches Quiz. Use this content to create a Microsoft Form that students will access during the exercise.

For each question:
1. Add the question text
2. Add all answer options
3. Mark the correct answer(s)
4. Add the explanation text to appear after submission

## Quiz Questions

### Question 1: Conceptual Understanding
**Which of the following is NOT a characteristic of native mobile development?**

a) Direct access to all platform APIs and features
b) Single codebase that works across iOS and Android
c) Best possible performance for complex animations
d) First access to new OS features and capabilities

**Correct Answer:** b) Single codebase that works across iOS and Android

**Explanation:** Native development requires separate codebases for each platform - typically Swift/Objective-C for iOS and Kotlin/Java for Android. While this allows for optimal performance and full API access, it means maintaining multiple codebases. Cross-platform approaches like React Native aim to address this limitation by allowing a single, shared codebase.

### Question 2: Performance Comparison
**For a pharmacy app that needs to process and display complex medication interaction charts with real-time updates, which development approach would likely provide the best performance?**

a) Progressive Web App (PWA)
b) Hybrid app (Cordova/Ionic)
c) Native development
d) React Native

**Correct Answer:** c) Native development

**Explanation:** Native development provides the best performance for complex, graphics-intensive operations like real-time charting and animations. While React Native offers good performance for most use cases, when dealing with complex visualizations that require maximum graphics performance and CPU/GPU optimization, native development still has an edge. The pharmacy app's medication interaction charts with real-time updates would benefit from the direct access to platform-specific rendering optimizations.

### Question 3: Development Efficiency
**A pharmacy chain needs to quickly build a medication reminder app for both iOS and Android with limited developer resources. Which approach would likely provide the fastest time-to-market while maintaining acceptable performance?**

a) Building separate native iOS and Android apps
b) Creating a Progressive Web App
c) Using React Native
d) Developing a basic SMS reminder system

**Correct Answer:** c) Using React Native

**Explanation:** React Native allows for sharing a single codebase across platforms while still achieving near-native performance. For a medication reminder app which needs features like notifications and a responsive UI but isn't graphics-intensive, React Native offers an excellent balance of development speed and performance. The pharmacy chain can leverage a smaller development team to build for both platforms simultaneously, significantly reducing time-to-market compared to separate native development teams.

### Question 4: API Access
**A pharmacy app needs to implement a barcode scanner to identify medications. Which statement about API access is most accurate?**

a) A PWA cannot access the device camera under any circumstances
b) Hybrid apps can access the camera but with significant performance limitations
c) Only native apps can access the camera API
d) React Native can access the camera through native modules with performance comparable to native apps

**Correct Answer:** d) React Native can access the camera through native modules with performance comparable to native apps

**Explanation:** React Native can access device APIs like the camera through native modules. For barcode scanning, React Native libraries like react-native-camera provide near-native performance by leveraging the device's native camera APIs. PWAs can actually access the camera through the WebRTC API but with more limitations. Hybrid apps can also access the camera but typically with more performance overhead than React Native. Native apps do have the most direct access, but for most scanning scenarios, React Native's performance is comparable.

### Question 5: User Interface Consistency
**Which approach would best ensure that a pharmacy app maintains platform-specific UI patterns (following iOS design standards on iPhones and Material Design on Android)?**

a) Progressive Web App with responsive design
b) Hybrid app with platform detection
c) React Native with platform-specific components
d) Native development with separate design teams

**Correct Answer:** c) React Native with platform-specific components

**Explanation:** React Native is designed to render using native UI components, and it provides platform-specific components (like `<Switch>` which renders differently on iOS and Android) as well as the Platform API to conditionally render different components. This means a React Native app can automatically follow platform UI conventions without duplicating the entire codebase. While native development can also achieve this, it requires separate teams and codebases. PWAs and hybrid apps typically use web components that mimic native appearance but don't automatically adapt to platform standards.

### Question 6: Scenario-Based Decision
**A pharmacy is developing an app with these requirements:**
- Must work offline for rural pharmacists
- Needs to access the device's NFC reader for medication verification
- Must support barcode scanning
- Needs to be deployed in 3 months
- Development team has React web experience but no mobile experience

**Which approach would you recommend?**

a) Native development, starting with Android
b) Progressive Web App with service workers
c) React Native
d) Hybrid app using Ionic

**Correct Answer:** c) React Native

**Explanation:** React Native is the best choice for this scenario because:
1. It supports offline functionality through appropriate state management and AsyncStorage
2. It can access NFC through native modules (e.g., react-native-nfc-manager)
3. It has excellent barcode scanning libraries
4. The 3-month timeline is challenging but feasible with React Native's efficiency
5. The team's React web experience will transfer well to React Native

While a PWA could work offline and the team's skills would transfer, reliable NFC access is limited in browsers. Native development would provide the best hardware access but would require learning new languages and likely exceed the timeline given the team's background. Hybrid apps would face similar NFC limitations to PWAs.

### Question 7: Maintenance Considerations
**A pharmacy app needs to be maintained for 5+ years with regular updates. Which factor is MOST important when choosing a development approach for long-term maintenance?**

a) Initial development cost
b) Framework stability and ecosystem sustainability
c) App store ranking algorithms
d) Current performance benchmarks

**Correct Answer:** b) Framework stability and ecosystem sustainability

**Explanation:** For long-term maintenance, the stability of the underlying framework and its ecosystem is critical. This includes factors like:
- How actively maintained is the framework?
- Is there a strong community and corporate backing?
- Is the framework likely to be supported for years to come?
- How stable are updates to the framework?

React Native scores well here with strong backing from Facebook/Meta, a large community, and a track record of continuous improvement without breaking changes. When maintaining an app for 5+ years, the initial development cost becomes less significant compared to ongoing maintenance costs. Performance benchmarks are important but technologies evolve, and today's performance may not reflect the situation in 5 years.

### Question 8: Business Requirements Analysis
**A national pharmacy chain wants to create an app for prescription refills. They have:**
- 5 native iOS developers
- 3 native Android developers 
- 10 React web developers
- A 6-month deadline
- Requirements for camera access, push notifications, and offline functionality
- A need to support both newest and 3-year-old devices

**What would be the most efficient approach?**

a) Maintain separate native teams and codebases
b) Create a PWA for quick deployment
c) Transition to React Native, with native developers creating custom modules
d) Build a hybrid app that wraps a web experience

**Correct Answer:** c) Transition to React Native, with native developers creating custom modules

**Explanation:** This approach leverages the strengths of both teams:
1. React web developers (10) can quickly transition to React Native, accelerating development
2. Native developers (8 total) can focus on creating optimal native modules for camera access and other platform-specific features
3. React Native supports push notifications and offline functionality well
4. The approach maximizes developer utilization and efficiency

Maintaining separate native teams would be inefficient given the large number of React developers available. A PWA might struggle with reliable push notifications on iOS and camera access limitations. A hybrid app would face similar limitations and performance issues, particularly on older devices. The React Native approach provides the best balance of development efficiency, feature support, and performance across device generations.

### Question 9: Update and Distribution
**Which statement about app updates is MOST accurate when comparing different mobile development approaches?**

a) Native apps always require app store approval for any changes
b) React Native apps can update their JavaScript bundle without app store approval, within certain limitations
c) PWAs cannot be updated once installed on a device
d) All approaches require the same update process through app stores

**Correct Answer:** b) React Native apps can update their JavaScript bundle without app store approval, within certain limitations

**Explanation:** React Native apps can utilize over-the-air (OTA) updates for their JavaScript code through services like CodePush or Expo Updates. This allows developers to push bug fixes and minor updates directly to users without going through the app store review process. However, there are limitations - changes to native code or major updates still require app store approval. 

Native apps generally require app store approval for any code changes. PWAs actually have an advantage here as they can be updated instantly on the server side. Hybrid apps may also use strategies to update their web content without app store approval, but with more limitations than PWAs.

### Question 10: Integration Scenario
**A pharmacy needs to integrate their app with:**
- Legacy internal prescription systems
- Healthcare provider APIs
- Insurance verification services
- Secure patient authentication

**Which approach provides the best security model for these integrations?**

a) PWAs offer the strongest security model
b) All approaches provide equivalent security capabilities
c) Native apps have inherent security advantages
d) The security depends more on implementation than the development approach

**Correct Answer:** d) The security depends more on implementation than the development approach

**Explanation:** Security is primarily determined by the implementation details rather than the development approach itself. All approaches can be implemented securely or insecurely. Key security factors include:

1. How authentication is handled
2. Whether sensitive data is properly encrypted
3. How API calls are secured
4. Proper validation and sanitization of inputs
5. Secure storage of credentials and tokens

While native apps do have some advantages in terms of secure storage options and keychain access, React Native can access these same capabilities through native modules. PWAs have traditionally had more limitations in secure storage, but modern APIs are closing this gap. The most important factor is following security best practices regardless of the development approach chosen.

## Additional Resources for Instructors

When creating the Microsoft Form:
- Set a time limit of 20 minutes
- Randomize question order if possible
- Show explanations after submission
- Include a pharmacy-themed header image
- Set the form to collect participant names for tracking completion 