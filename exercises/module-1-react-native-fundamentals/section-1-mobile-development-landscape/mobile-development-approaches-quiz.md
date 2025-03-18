# Mobile Development Approaches Quiz

## Quiz Overview
This Microsoft Forms quiz assesses understanding of different mobile development approaches, their evolution, and decision-making factors for selecting the appropriate approach for specific scenarios.

## Quiz Configuration
- **Title**: Mobile Development Approaches Quiz
- **Description**: Test your knowledge of native, hybrid, and cross-platform mobile development approaches, including React Native.
- **Settings**:
  - Shuffle questions: Yes
  - Show progress: Yes
  - Show right answers after submission: Yes
  - One response per person: Yes
  - Record name: Yes

## Questions

### Question 1: Multiple Choice
**Question**: Which of the following best describes native mobile development?
**Points**: 10
**Required**: Yes

**Choices**:
- Applications built specifically for each platform using platform-specific languages and tools *(Correct)*
  - *Additional description*: Native apps are built using platform-specific languages like Swift/Objective-C for iOS and Java/Kotlin for Android.
- Applications built using web technologies and wrapped in a native container
  - *Additional description*: This describes hybrid or WebView-based approaches like PhoneGap/Cordova.
- Applications built using a single codebase that compiles to native code for each platform
  - *Additional description*: This describes cross-platform approaches like React Native or Flutter.
- Applications built using progressive web technologies that can be installed from a browser
  - *Additional description*: This describes Progressive Web Apps (PWAs).

### Question 2: Multiple Choice
**Question**: What was the primary innovation that React Native introduced to cross-platform development?
**Points**: 10
**Required**: Yes

**Choices**:
- Using a WebView to render UI components
  - *Additional description*: This was the approach used by earlier solutions like PhoneGap/Cordova.
- Rendering actual native UI components while using JavaScript for logic *(Correct)*
  - *Additional description*: React Native uses the native rendering engines and bridges JavaScript to native components.
- Compiling all code to native binaries before deployment
  - *Additional description*: This approach is more similar to Xamarin's method.
- Creating a custom rendering engine that looks the same on all platforms
  - *Additional description*: This is more similar to Flutter's approach with its Skia/Impeller rendering engine.

### Question 3: Ranking
**Question**: Rank the following mobile development approaches from highest to lowest in terms of performance.
**Points**: 15
**Required**: Yes

**Items to rank**:
1. Native development *(Correct position: 1)*
2. React Native *(Correct position: 2)*
3. Flutter *(Correct position: 3)*
4. Hybrid/WebView-based approaches *(Correct position: 4)*
5. Progressive Web Apps *(Correct position: 5)*

### Question 4: Multiple Choice
**Question**: Which of the following is NOT a key business challenge in mobile development according to the section?
**Points**: 10
**Required**: Yes

**Choices**:
- Development costs for multiple platforms
  - *Additional description*: This is a significant business challenge mentioned in the section.
- Maintenance overhead
  - *Additional description*: Maintaining multiple codebases is a key business challenge.
- Time-to-market pressure
  - *Additional description*: The need to release quickly is a business challenge mentioned.
- Hardware compatibility issues *(Correct)*
  - *Additional description*: While this is a technical challenge, it wasn't specifically listed as a business challenge in the section.
- Finding specialized talent
  - *Additional description*: Finding developers skilled in multiple platforms is a business challenge mentioned.

### Question 5: Multiple Choice with Multiple Answers
**Question**: Which of the following are key innovations that React Native introduced? (Select all that apply)
**Points**: 15
**Required**: Yes
**Multiple answers**: Yes

**Choices**:
- JavaScript Core Execution *(Correct)*
  - *Additional description*: Running JavaScript in a separate thread, not in a WebView.
- Native Component Rendering *(Correct)*
  - *Additional description*: Using actual native UI components, not web components.
- Declarative UI Paradigm *(Correct)*
  - *Additional description*: Bringing React's component model to mobile.
- Hot Reloading *(Correct)*
  - *Additional description*: Dramatically improving developer experience.
- Bridge Architecture *(Correct)*
  - *Additional description*: Enabling JavaScript to communicate with native modules.
- Custom Rendering Engine
  - *Additional description*: This is more characteristic of Flutter, not React Native.

### Question 6: Text
**Question**: Briefly explain the concept of "learn once, write anywhere" as it applies to React Native.
**Points**: 15
**Required**: Yes
**Text length**: Long answer

**Answer guidance**: A good answer should mention that "learn once, write anywhere" acknowledges platform differences while providing a unified development experience. It differs from "write once, run anywhere" by recognizing that some platform-specific code may be necessary, but the overall approach and skills are transferable between platforms. The philosophy emphasizes learning the React paradigm and then applying it across different platforms.

### Question 7: Multiple Choice
**Question**: Based on the Shopify case study, what percentage of code sharing between platforms did they achieve with React Native?
**Points**: 10
**Required**: Yes

**Choices**:
- 70-80%
  - *Additional description*: This was their initial estimate, not the actual result.
- 80-90%
  - *Additional description*: This is lower than what they actually achieved.
- 95-99% *(Correct)*
  - *Additional description*: They achieved exceptional code sharing between platforms, far exceeding their initial 80% estimate.
- 100%
  - *Additional description*: Complete code sharing is rarely achievable due to platform-specific requirements.

### Question 8: Rating
**Question**: On a scale of 1-5, how would you rate the importance of considering existing team skills when choosing a mobile development approach?
**Points**: 5
**Required**: Yes
**Rating**: 1-5 stars

**Answer guidance**: This is subjective, but the section emphasizes team factors as a key consideration in the decision-making process. A rating of 4-5 would align with the section's emphasis on considering existing skill sets, team size and structure, learning capacity, and development preferences.

### Question 9: Multiple Choice
**Question**: Scenario: A startup with a team of 5 web developers (experienced in React) needs to build a mobile app with complex UI and animations that must be released on both iOS and Android within 3 months. Which approach would you recommend?
**Points**: 15
**Required**: Yes

**Choices**:
- Native development
  - *Additional description*: This would require hiring new developers or extensive training, and would likely not meet the timeline with separate codebases.
- Hybrid/WebView approach
  - *Additional description*: This might struggle with complex UI and animations due to performance limitations.
- React Native *(Correct)*
  - *Additional description*: Leverages the team's existing React skills, provides good performance for UI and animations, and enables cross-platform development to meet the timeline.
- Flutter
  - *Additional description*: While capable, this would require the team to learn Dart and a new framework, adding risk to the tight timeline.

### Question 10: Multiple Choice
**Question**: Which of the following statements about Flutter is NOT correct according to the section?
**Points**: 10
**Required**: Yes

**Choices**:
- Flutter uses the Dart programming language
  - *Additional description*: This is correctly stated in the section.
- Flutter has a custom rendering engine
  - *Additional description*: The section mentions Flutter's Impeller (previously Skia) rendering engine.
- Flutter uses native UI components *(Correct)*
  - *Additional description*: The section specifically states that Flutter does NOT use native components, instead using its own rendering engine.
- Flutter has strong performance characteristics
  - *Additional description*: The section acknowledges Flutter's strong performance.
- Flutter has a growing ecosystem
  - *Additional description*: This is correctly stated in the section.
