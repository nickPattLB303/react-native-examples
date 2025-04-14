---
marp: true
---

# Module 1: React Native Fundamentals

---

## Core Concepts & Modern Architecture

**Welcome!** This foundational module introduces you to the exciting world of React Native. We'll explore why it's a powerful choice for mobile development, dive into how it works under the hood (focusing on the essential *modern* architecture), and equip you with the knowledge to start building high-quality, cross-platform mobile applications.

**Overall Goal:** Equip learners with a foundational understanding of React Native, its advantages, core components, and the essential modern architecture (New Architecture) they will be using, particularly with Expo.

**Prerequisite Knowledge:** Basic understanding of JavaScript and web development concepts (HTML/CSS equivalents, components) is helpful but not strictly required. Familiarity with React is a plus but will be built upon.

---

## Introduction to React Native

**Goal:** Understand the challenges of mobile development, the evolution of cross-platform solutions, and the compelling reasons why React Native has become a leading framework.

**Learning Objectives:**
After completing this section, you will be able to:
*   Describe the core challenges of traditional mobile development targeting multiple platforms.
*   Explain the limitations of early cross-platform approaches like WebViews.
*   Articulate the key advantages of React Native (code sharing, developer experience, native capabilities, performance context).
*   Understand the fundamental concept of JavaScript controlling native UI elements.

---

### The Mobile Challenge

Building mobile applications today often means targeting both iOS and Android to reach the widest audience. Historically, this presented significant challenges:

*   **Separate Codebases:** Native development required writing and maintaining distinct codebases (Swift/Objective-C for iOS, Kotlin/Java for Android).
*   **Different Skill Sets:** Teams needed specialized developers for each platform.
*   **Duplicated Effort:** Features, bug fixes, and updates had to be implemented twice.
*   **Increased Costs & Time:** Development and maintenance were expensive and time-consuming.

---

### Cross-Platform Evolution

Early attempts to solve this involved **Web-Based Approaches** (like Apache Cordova/PhoneGap). These wrapped web applications (HTML, CSS, JavaScript) inside a native "WebView" – essentially an embedded browser. While allowing code reuse, they often suffered from:

*   **Performance Issues:** WebViews weren't optimized for complex mobile interactions or animations, leading to sluggish experiences.
*   **Non-Native Feel:** Apps often didn't look or behave like true native applications.
*   **Limited Native API Access:** Accessing device features required complex plugins.

React Native's New Renderer: Fabric React Native emerged as a revolutionary approach, aiming to provide the efficiency of web-like development while delivering truly *native* user experiences and performance. [React Native's New Renderer: Fabric](https://dev.to/theadultnoble_/react-natives-new-renderer-fabric-5898)

---

### Why Choose React Native?

React Native offers a powerful combination of benefits that make it a popular choice for startups and large enterprises alike.

---

#### Code Sharing & Efficiency

Write the bulk of your application logic and UI in JavaScript once and deploy it on both iOS and Android. While some platform-specific adjustments might be needed, code sharing often reaches 70-90%, drastically reducing development time and cost.

* https://www.thedroidsonroids.com/blog/flutter-vs-react-native-comparison
* https://softteco.com/blog/react-native-vs-flutter
* https://webandcrafts.com/blog/flutter-vs-react-native
  
---

#### Developer Experience (DX)

*   **Leverage React:** If you know React for the web, you'll feel right at home. The component model, state management, and declarative approach translate directly.
*   **Fast Refresh:** See your code changes reflected almost instantly without losing your application state – a massive productivity booster.
    *   https://softteco.com/blog/react-native-vs-flutter
    *   https://webandcrafts.com/blog/flutter-vs-react-native
*   **Large Ecosystem:** Tap into the vast JavaScript ecosystem (npm) for libraries and tools.

---

#### Native Capabilities

*   **Real Native Components:** Unlike WebView-based solutions, React Native renders using actual native UI components (e.g., `UIView` on iOS, `android.view.View` on Android).[3, 1] This ensures your app looks, feels, and performs like a native app because, in large part, it *is* native at the UI level.
*   **Native API Access:** Easily access platform-specific APIs and device features through native modules.[5]

---

#### Performance Context

React Native has always aimed for near-native performance.[3, 4] While early versions had limitations (which we'll discuss), the *modern architecture* has significantly improved performance, addressing previous bottlenecks and enabling smoother animations and interactions.[6, 7, 8, 9, 10, 11, 12] While direct comparisons with frameworks like Flutter show Flutter often having an edge in raw rendering speed due to its custom engine [2, 13, 4, 14], React Native's modern architecture delivers excellent performance for the vast majority of applications and continues to improve.[8, 15, 14]

---

#### Strong Backing 

Developed and used extensively by Meta (Facebook, Instagram), and adopted by major companies like Microsoft, Shopify, Tesla, and Walmart, ensuring ongoing investment and a vibrant community.[2]

---

### Core Idea: JavaScript Controlling Native

The fundamental magic of React Native is this: **You write JavaScript, React Native makes it native.**

You define your UI using familiar React components (like `<View>`, `<Text>`). Your application logic (handling button presses, fetching data, managing state) is written in JavaScript. React Native then acts as a bridge or interface, translating these JavaScript instructions into the corresponding actions on the native iOS or Android platform.[1] It tells the native side to render a specific button, update a piece of text, or respond to a user's touch.

Understanding *how* this translation happens is key to mastering React Native, especially with its recent architectural evolution.

---

## How React Native Works: From Bridge to JSI

Understand the evolution of React Native's architecture, contrasting the limitations of the old "Bridge" with the capabilities of the modern "New Architecture" (JSI, Fabric, TurboModules).

<!---
**Learning Objectives:**
After completing this section, you will be able to:
*   Describe the components and communication flow of the Legacy Bridge architecture.
*   Identify the key limitations of the Legacy Bridge (asynchronicity, serialization overhead, JS bottleneck, eager loading).
*   Explain the purpose and function of the core New Architecture components: JSI, Fabric, and TurboModules.
*   Understand how JSI enables direct, synchronous communication and eliminates serialization overhead.
*   Describe how Fabric improves rendering and enables modern React features.
*   Explain how TurboModules improve startup time through lazy loading.
*   Define Bridgeless mode and its role in completing the architectural transition.
-->

---

### The Old Way: The Legacy Bridge (Conceptual Overview)

To appreciate the advancements of the modern architecture, it's essential to understand the original design, often called the "Legacy Architecture" or "Bridge Architecture." It primarily involved three threads [16]:

1.  **JavaScript Thread:** Ran your application's JavaScript code (React components, business logic) using a JavaScript engine (like JavaScriptCore or later, Hermes).[16]
2.  **Native/UI Thread:** Managed the native platform's UI elements (iOS UIKit or Android UI toolkit) and executed native module code.[16] This is the main thread responsible for rendering what the user sees.
3.  **Shadow Thread:** Calculated the layout (position and dimensions) of UI elements using the Yoga layout engine, offloading this work from the main Native/UI thread.[16]

<!-- *(Instructor: Display a simple diagram showing JS Thread <-> Bridge <-> Native Thread, with Shadow Thread branching off Native)* -->

---

#### How it Worked

Communication between the JavaScript world and the Native world happened via the **Bridge**. Think of it as a message queue.[17, 18, 16, 19]

---

*   When your JavaScript code needed to update the UI (e.g., change text) or call a native API (e.g., access device location), it would:
    1.  Serialize the instructions and data into a JSON string.[16, 20, 21]
    2.  Send this JSON message across the Bridge asynchronously.[16, 20, 21]
    3.  The Native side would receive the message, deserialize the JSON, and execute the instruction.[16, 20]
    4.  If a response was needed, the process happened in reverse (Native serializes -> Bridge -> JS deserializes).

---

#### The Limitations

This architecture, while innovative for its time, had inherent drawbacks that became bottlenecks, especially for complex apps [18, 16, 22, 21]

---

*   **Asynchronous Bottleneck:** Communication was fundamentally asynchronous. JavaScript couldn't simply call a native function and get an immediate result back; it had to send a message and wait for a potential callback.[7, 16, 20, 23, 21] This made certain interactions complex or inefficient.
*   **Serialization Overhead:** Converting data to JSON and back for *every* interaction added significant processing overhead, especially for frequent updates (like animations) or large data payloads.[16, 9, 20, 23, 21]
*   **Single JS Thread Bottleneck:** JavaScript runs on a single thread. If complex calculations or heavy logic kept the JS thread busy, it couldn't send UI update messages across the Bridge, leading to dropped frames and an unresponsive UI.[16, 23]
*   **Eager Native Module Loading:** Typically, all Native Modules required by the app were loaded and initialized when the app started, even if they weren't needed immediately. This increased app startup time.[16, 10, 19, 23]

<!-- These limitations were the primary motivation for the development of React Native's New Architecture. -->

---

### The New Way: The New Architecture

React Native has undergone a major internal redesign, known as the **New Architecture**. This isn't just an update; it's a fundamental shift designed to overcome the Bridge's limitations and unlock higher performance and new capabilities.[6, 7, 8, 16, 9, 11]

*   **Key Components:** The core pillars of the New Architecture are:
    *   **JSI (JavaScript Interface)** [17, 11, 12, 19]
    *   **Fabric (Renderer)** [17, 11, 12, 19]
    *   **TurboModules (Native Modules)** [17, 11, 12, 19]
    *   **(Supporting Tool: Codegen)** [17, 11, 12, 19]
*   **Current Status:** The New Architecture was introduced experimentally in React Native 0.68 [8, 11, 24, 25, 21, 26] and became the **default** starting with React Native 0.76.[27, 8] Crucially for this course, popular tools like **Expo SDK 52 and later enable the New Architecture by default** for new projects.[28, 29, 27, 30] This means you are likely already using it!

Let's break down the components:

### 2.3. JSI (JavaScript Interface): Direct Communication

JSI is the replacement for the Bridge and the heart of the New Architecture.[17, 16, 10, 11, 12, 19]

*   **What it is:** JSI is a lightweight interface written in C++ that allows JavaScript code and Native code (including C++ layers) to communicate *directly*.[7, 17, 16, 10, 11, 12, 19]
*   **How it Works:** It enables JavaScript to hold direct references to C++ objects (called "Host Objects") living in the native/C++ realm, and vice versa.[7, 10, 12, 1] JavaScript can then invoke methods *directly* on these C++ objects, much like calling methods on regular JavaScript objects.[7, 10, 12]
*   **Key Benefits:**
    *   **Eliminates Serialization Overhead:** Because communication happens via direct method calls on object references, the costly process of serializing/deserializing data to JSON for every interaction is largely eliminated.[7, 16, 9, 10, 11, 12, 23, 21] This leads to significantly faster communication.
    *   **Enables Synchronous Communication:** JSI allows JavaScript to call a native function and *wait* for its result synchronously, just like calling a regular JavaScript function.[7, 27, 9, 10, 11, 12, 1, 22, 23] This simplifies many interactions that were complex under the asynchronous Bridge model.
    *   **Engine Agnostic:** JSI provides an abstraction layer, decoupling React Native from a specific JavaScript engine. This allows the use of engines like Hermes (the default, optimized for mobile), V8, or JavaScriptCore.[16, 10, 12]

> **Analogy:** Think of the old Bridge like sending letters (JSON messages) back and forth via postal mail (asynchronous, serialization overhead). JSI is like having a direct phone line (direct calls, synchronous capability, less overhead).

*(Instructor: Display a diagram comparing the Bridge's indirect, serialized flow with JSI's direct method invocation flow)*

### 2.4. Fabric: The Modern Renderer

Fabric is React Native's new rendering system, replacing the old UI Manager and built using JSI.[6, 17, 10, 31, 11, 12, 19]

*   **What it is:** Fabric handles turning your React components into pixels on the screen.
*   **How it Works:** It moves more rendering logic (like creating the layout tree, called the "Shadow Tree") into a shared C++ layer.[9, 10, 31, 12, 1] It uses JSI for efficient communication between your JavaScript React code and the native rendering logic.[10, 12]
*   **Key Benefits:**
    *   **Improved Performance & Consistency:** The shared C++ core leads to more efficient rendering and better consistency across iOS and Android.[8, 31, 12]
    *   **Enables Modern React Features:** Fabric's tight integration with JSI and its concurrent capabilities allow React Native to fully support React 18+ features like [7, 17, 9, 10, 31, 11, 12]:
        *   **Concurrent Rendering:** Allows React to work on multiple state updates simultaneously, prioritizing important ones (like user input) to keep the UI responsive even during complex updates.
        *   **Transitions:** Mark specific UI updates as non-urgent, preventing them from blocking more critical interactions.
        *   **Suspense for Data Fetching:** Declaratively handle loading states for asynchronous operations.
    *   **Smoother UI:** These features result in smoother animations, faster interactions, and a generally more responsive user experience.[8, 31, 12]
    *   **Potential for Lazy Initialization:** Host Components (native views like `<View>`, `<Text>`) can be initialized more lazily, potentially improving app startup time.[11, 12]

### 2.5. TurboModules: Efficient Native Modules

TurboModules are the next generation of Native Modules (the way you access platform-specific APIs like camera, Bluetooth, storage, etc.), designed to work seamlessly with JSI.[6, 17, 16, 10, 31, 11, 12, 19, 32, 5, 33]

*   **What they are:** The modern way to bridge JavaScript code with native platform capabilities.
*   **Key Benefits:**
    *   **Lazy Loading:** This is the killer feature. Unlike legacy modules that loaded at startup, TurboModules are only initialized the *first time* your JavaScript code actually tries to use them.[6, 16, 10, 31, 11, 12, 19, 23, 33] JavaScript holds a reference via JSI, and the native code loads on demand. This significantly improves app startup time, especially for apps with many native dependencies.[16, 10, 11, 12]
    *   **JSI Integration:** They use JSI for communication, gaining the benefits of reduced overhead and the potential for synchronous method calls where appropriate.[10, 11, 12]
    *   **Type Safety via Codegen:** TurboModules rely on a tool called **Codegen**. Developers define the module's interface (methods, parameters, return types) using typed JavaScript (TypeScript or Flow).[12, 32, 5, 33] Codegen reads this definition and automatically generates the necessary C++ and native boilerplate code, ensuring that the types match across the JS/Native boundary.[17, 16, 10, 11, 12, 19, 22, 32, 5, 33] This reduces runtime errors and speeds up development.[11, 12]

### 2.6. Bridgeless Mode: The Final Step

While JSI, Fabric, and TurboModules replaced the Bridge for core rendering and module communication, some parts of the React Native runtime (like error handling, timers, global event emitters) still initially relied on the old Bridge infrastructure being present.[17, 18]

**Bridgeless Mode** represents the final stage of the New Architecture rollout.[17, 18, 11, 23]

*   **What it is:** When enabled, Bridgeless mode completely **disables the initialization of the legacy Bridge**.[17, 18, 11, 23] It moves all remaining runtime functionalities off the Bridge.
*   **Benefit:** Removes the final dependencies and overhead associated with the old Bridge, contributing to slightly faster startup and a cleaner architecture.[18, 9, 11]
*   **Compatibility:** An **interoperability layer** was introduced to allow most legacy Native Modules (written for the Bridge) to continue functioning even when the Bridge itself isn't initialized.[34, 18, 23] They are accessed via the new JSI-based system.
*   **Default Status:** Bridgeless mode became the **default setting** (when the New Architecture is enabled) starting with React Native 0.74.[17, 34, 19, 23]

---

> **🧠 Exercise: Architecture Matching Quiz**
>
> **Objective:** Reinforce understanding of which New Architecture component addresses specific limitations of the Legacy Bridge.
>
> **Instructions:** Match the Legacy Bridge Limitation on the left with the primary New Architecture Component that solves it on the right.
>
> | Legacy Bridge Limitation | New Architecture Component |
> | :------------------------------------------- | :------------------------- |
> | 1. JSON Serialization Overhead | A. Fabric |
> | 2. Asynchronous Communication Bottleneck | B. TurboModules |
> | 3. Eager Loading of All Native Modules | C. JSI |
> | 4. Limited Support for Concurrent Features | |
>
> *(Answer Key: 1-C, 2-C, 3-B, 4-A)*

---

> **💡 Deep Dive (Optional): C++ Host Objects**
> JSI's ability to let JavaScript hold references to C++ objects ("Host Objects") is fundamental.[10, 12] This means JavaScript isn't just sending data *to* the native side; it's directly interacting with objects *living* on the native side (often in a shared C++ layer). This direct interaction model is what eliminates the need for serialization and enables synchronous calls, forming the bedrock of the New Architecture's performance gains.

> **👨‍🏫 Instructor Note:** Emphasize that while JSI *enables* synchronous calls, it doesn't mean *all* communication is now synchronous or blocking. Asynchronous operations (like network requests) still happen asynchronously (often returning Promises). The key is that synchronous access *is now possible* when needed, which wasn't efficiently achievable with the Bridge. Overusing synchronous JSI calls for long-running native tasks *can* still block the JS thread, so they should be used judiciously.

---

## Section 3: Working with the Modern Architecture

**Section Goal:** Understand the practical implications of the New Architecture for everyday development, including performance, debugging, leveraging new features, and how Expo integrates with it.

**Learning Objectives:**
After completing this section, you will be able to:
*   Explain *why* understanding the New Architecture is relevant for developers.
*   Connect specific New Architecture components to practical performance benefits (startup time, UI smoothness).
*   Describe conceptual debugging considerations related to the New Architecture.
*   Recognize how Expo enables and supports the New Architecture.
*   Identify tools like `expo-doctor` for checking library compatibility.

### 3.1. Why This Matters for You (Recap & Practical Implications)

You might be wondering, "This architecture stuff is complex, do I *really* need to know it?" While React Native aims to abstract away much of this complexity, understanding the fundamentals of the New Architecture is crucial for several practical reasons:

*   **You're Using It!** With modern tools like Expo SDK 52+ [28, 29] and recent React Native versions [27, 8], the New Architecture is the default. Understanding your environment is key to working effectively within it.
*   **Performance:** Knowing the "why" behind performance characteristics helps you write better code.[7, 8]
    *   Faster startup? Thank TurboModules' lazy loading.[16, 10, 11, 12]
    *   Smoother scrolling in long lists or complex animations? Fabric's concurrent rendering capabilities play a big role.[8, 10, 31, 12]
    *   Faster calls to native device features? JSI's direct communication reduces overhead.[7, 10, 11, 12]
*   **Debugging:** When things go wrong, having the right mental model helps diagnose issues. Is a UI freeze caused by a long-running synchronous JSI call? Is unexpected UI behavior related to concurrent rendering? Understanding the architecture provides context.[9]
*   **Leveraging Modern Features:** The New Architecture unlocks the full power of React 18+.[7, 17, 9, 10, 31, 11, 12] To effectively use features like `useTransition` for non-blocking updates or `Suspense` for data fetching, understanding the underlying capabilities provided by Fabric is beneficial.[7, 12]
*   **Ecosystem & Compatibility:** The React Native library ecosystem is still adapting. You'll encounter libraries mentioning New Architecture or Fabric compatibility. Understanding the basics helps you navigate compatibility notes and potential issues.[29, 9, 12, 25]

### 3.2. Performance Considerations (Conceptual)

The New Architecture brings tangible performance benefits, although the exact impact depends on the specific app [7, 8]:

*   **Faster App Startup:** Lazy loading of TurboModules means the app doesn't waste time initializing native code that isn't immediately needed.[16, 10, 11, 12] This is often one of the most noticeable improvements.
*   **Smoother User Interface:** Fabric's ability to handle rendering concurrently means complex UI updates or animations are less likely to block the main thread, resulting in fewer dropped frames and a more fluid experience.[7, 8, 10, 31, 12] Features like automatic batching in React 18, enabled by Fabric, also contribute by grouping multiple state updates into single re-renders.[7, 8, 9]
*   **More Efficient Native Interaction:** JSI's direct communication path reduces the latency and overhead compared to sending JSON messages over the Bridge, making frequent calls to native modules faster.[7, 9, 10, 11, 12]

> **Note:** While the architecture provides these capabilities, simply enabling it doesn't automatically make every app faster. Sometimes, code needs to be adapted to take full advantage of new features like concurrent rendering.[7]

### 3.3. Debugging in the New Era (Conceptual)

Debugging tools and techniques are evolving alongside the architecture.[27, 9, 35] While specific tools will be covered later, keep these conceptual points in mind:

*   **Synchronous Calls:** Be mindful that synchronous calls via JSI, while powerful, *can* block the JavaScript thread if the native operation takes too long. If your UI freezes during interaction with a native module, investigate if a synchronous call is the culprit.
*   **Concurrent Rendering:** Fabric's concurrency can sometimes lead to UI updates happening in an order you might not initially expect, especially if using features like `useTransition`. Understanding concurrency helps debug related visual glitches.
*   **Interop Layer:** If you're using older libraries that haven't fully migrated, issues might arise from the interoperability layer that allows them to work with the New Architecture.[34, 18, 23]

The new default React Native DevTools introduced in 0.76 aim to provide better insights into this modern environment.[27]

### 3.4. Expo & The New Architecture

Expo provides excellent support for the New Architecture, making it easy to adopt:

*   **Default Enabled:** As mentioned, `npx create-expo-app` enables the New Architecture by default for SDK 52 and later projects by setting `"newArchEnabled": true` in your `app.json` (or `app.config.js`).[28, 29, 30]
*   **Expo Go:** Starting with SDK 52, the Expo Go client app (used for quick development previews) *only* supports the New Architecture.[28, 29] This ensures the development environment matches the default project setup. If you need to use the *old* architecture (e.g., due to an incompatible library), you must create a custom development build after setting `"newArchEnabled": false`.[29]
*   **Expo Modules:** All native modules built using the modern Expo Modules API automatically support the New Architecture.[29]
*   **Dependency Validation:** Expo Doctor (`npx expo-doctor`) integrates with the([https://reactnative.directory/](https://reactnative.directory/)) to help you check if your project's third-party native libraries are known to be compatible with the New Architecture.[29, 12] This is invaluable for identifying potential migration blockers. You can configure this check in your `package.json`.[29]

> **💡 Tip:** While the New Architecture is complex internally, tools like Expo aim to make using it as seamless as possible. Focus on understanding the *benefits* (performance, modern features) and *implications* (compatibility checks, default status) for now. You don't need to be an expert in C++ or JSI internals to build great apps!

---

> **🧠 Exercise: Performance Scenario Analysis**
>
> **Objective:** Apply knowledge of New Architecture components to predict performance implications.
>
> **Instructions:** For each scenario below, identify the primary New Architecture component(s) involved and briefly explain how they might lead to better performance compared to the Legacy Bridge architecture.
>
> 1.  **Scenario:** An app loads a screen with 10 different native features (e.g., camera access, Bluetooth, file storage, biometrics), but the user only interacts with one initially.
>     *   *Hint:* Think about initial loading.
> 2.  **Scenario:** An app displays a complex, infinitely scrolling list of items with rich media and interactive elements, requiring smooth scrolling performance.
>     *   *Hint:* Think about UI rendering and responsiveness.
> 3.  **Scenario:** An app frequently communicates with a native sensor (e.g., accelerometer) to update the UI in near real-time.
>     *   *Hint:* Think about the communication channel between JS and Native.
>
> **Application:** This exercise helps connect abstract architectural concepts to concrete performance benefits you might observe or strive for in your applications. Understanding these links aids in making informed design and implementation choices.

*(Self-Correction/Refinement: Ensure the exercise clearly asks for comparison to the legacy bridge to reinforce the 'improvement' aspect.)*

---

## Section 4: Core Components & Documentation

**Section Goal:** Get a first look at essential React Native UI building blocks and learn how to effectively use the official documentation – a critical skill for any developer.

**Learning Objectives:**
After completing this section, you will be able to:
*   Identify fundamental React Native components (`View`, `Text`, `Image`, `StyleSheet`, `Button`).
*   Recognize the importance of the official React Native and Expo documentation.
*   Navigate key sections of the documentation to find information.
*   Identify community resources for help and further learning.

### 4.1. Essential Building Blocks (Preview)

React Native provides a set of core components that are the fundamental building blocks for your UI. Think of them like the basic HTML elements for mobile. Here are a few essential ones:

*   **`<View>`:** The most fundamental component for building UI. It's a container that supports layout with Flexbox, styling, some touch handling, and accessibility controls. Conceptually similar to a `<div>` in web development.
*   **`<Text>`:** A component for displaying text. You must wrap all text content within a `<Text>` component. Similar to `<p>` or `<span>`.
*   **`<Image>`:** A component for displaying different types of images, including network images, static resources, temporary local images, and images from the camera roll. Like `<img>`.
*   **`<StyleSheet>`:** Provides an abstraction layer similar to CSS Stylesheets. You define styles using JavaScript objects, which offers performance benefits and code organization.
*   **`<Button>`:** A basic button component that handles touches and displays text.

```jsx
import React from 'react';
// Import necessary components from react-native
import { StyleSheet, View, Text, Button, Image } from 'react-native';

const SimpleComponent = () => {
  const handlePress = () => {
    console.log('Button Pressed!');
  };

  return (
    // Use View as a container
    <View style={styles.container}>
      {/* Display text using Text */}
      <Text style={styles.title}>Welcome to React Native!</Text>

      {/* Display an image */}
      <Image
        style={styles.logo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} // Network image
      />

      {/* A simple Button */}
      <Button
        title="Press Me"
        onPress={handlePress}
        color="#841584"
      />
    </View>
  );
};

// Define styles using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default SimpleComponent;
```

This is just a tiny glimpse! We'll explore these and many other components in detail in subsequent modules.

### 4.2. Mastering the Documentation

The **single most important skill** you can develop as a React Native developer is learning how to effectively use the documentation.

*   **Official React Native Docs:** [reactnative.dev](https://reactnative.dev/) [12]
    *   Your primary source for core components, APIs, architecture details [12], and guides on fundamental concepts.
    *   **Key Sections:** Getting Started, Components, APIs, Guides, Architecture.
    *   **Essential Practice:** Always check component `Props` (available properties), platform compatibility notes (does it work differently on iOS vs. Android?), and usage examples.
*   **Official Expo Docs:** [docs.expo.dev](https://docs.expo.dev/) [29]
    *   Essential if you're using the Expo ecosystem (which we are in this course!).
    *   Covers Expo SDK APIs (accessing device features like camera, location, sensors), Expo CLI commands, build services (EAS Build), configuration (`app.json`/`app.config.js`), and guides specific to the Expo workflow.

**Tips for Effective Use:**

*   **Use the Search:** Both sites have powerful search bars.
*   **Check the Version:** Ensure the documentation version matches the React Native/Expo SDK version you are using, as APIs can change.
*   **Read the Guides:** For complex topics (like Navigation, Performance, Accessibility), the guides provide in-depth explanations.
*   **Explore Examples:** Many pages have interactive examples or code snippets – use them!

### 4.3. Finding Help & Community Resources

Beyond the official docs, the React Native community is vast and helpful:

*   **GitHub:**
    *  ([https://github.com/facebook/react-native](https://github.com/facebook/react-native)): For reporting core issues and discussions.[36]
    *   [New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture): Specific discussions and guides related to the New Architecture.[33]
    *  ([https://github.com/react-native-community](https://github.com/react-native-community)): Home to many essential third-party libraries.
*   **Forums & Chat:**
    *   Stack Overflow (tag: `react-native`)
    *   Reactiflux Discord: A large, active chat community for React and React Native developers.
*   **Other Resources:**
    *  ([https://reactnative.directory/](https://reactnative.directory/)): A searchable database of libraries, often with compatibility information.[29]

> **👨‍🏫 Instructor Note:** Strongly encourage students to bookmark the official documentation sites and make them their first stop when encountering problems or learning new features. Emphasize that even experienced developers constantly refer to the docs.

---

> **🧠 Exercise: Documentation Scavenger Hunt**
>
> **Objective:** Develop effective documentation search and navigation skills to find specific information relevant to mobile app development.
>
> **Instructions:** Use the official React Native ([reactnative.dev](https://reactnative.dev/)) and Expo ([docs.expo.dev](https://docs.expo.dev/)) documentation to find the answers to the following questions. Note *where* you found the answer (e.g., specific component page, guide name).
>
> 1.  Find the `prop` on the core React Native `<Image>` component used to display a placeholder image while the main image is loading.
> 2.  Locate the Expo API documentation for accessing the device's Camera.
> 3.  Find the guide in the React Native documentation that explains how to handle user touches and gestures.
> 4.  Discover where in the React Native documentation you can find detailed information about the "Fabric" rendering system.
> 5.  Find the Expo documentation page that explains how to configure app icons.
>
> **Application:** This exercise simulates real-world development tasks where you need to quickly look up API details, understand concepts, or configure project settings using official resources. Mastering documentation navigation is crucial for efficient development and problem-solving.

---

## Module Summary

Congratulations on completing the first module! We've covered a lot of ground:

*   Established the context for React Native within the mobile development landscape.
*   Highlighted the key advantages that make React Native a compelling choice.
*   Journeyed through React Native's architectural evolution, understanding the limitations of the Legacy Bridge and the significant improvements brought by the **New Architecture (JSI, Fabric, TurboModules)**.
*   Discussed the practical relevance of this modern architecture for performance, debugging, and leveraging new features.
*   Previewed essential core components and emphasized the critical skill of using the official documentation.

You now have a solid conceptual foundation. Remember, the New Architecture, while complex internally, is designed to make building high-performance, modern mobile apps *easier* in the long run. Understanding its principles will empower you as you move forward.

In the next module, we'll roll up our sleeves and start building our first React Native application, putting these concepts into practice!

---

> **⭐ Module Challenge (Optional / End-of-Module)**
>
> **Task:** Analyze a hypothetical simple Medication Reminder app.
>
> 1.  **Component Structure:** Briefly outline the main components you might create (e.g., `MedicationList`, `ReminderItem`, `AddReminderScreen`).
> 2.  **Feature Focus:** Identify 1-2 key features, for example:
>     *   Displaying medication images efficiently within the list.
>     *   Scheduling a native platform notification for a reminder time.
> 3.  **Architecture Connection:** Briefly explain how your understanding of the **New Architecture** might influence your thinking about implementing these features or their expected performance, compared to assumptions you might have made based *only* on the old Bridge concept.
>     *   *Example thought process for images:* "With Fabric's improved rendering [8, 31, 12], I'd expect smoother scrolling even with many images compared to potential bottlenecks with the old Bridge sending image data."
>     *   *Example thought process for notifications:* "Accessing the native notification API would use a TurboModule.[11, 12] Knowing about JSI [7, 12] means the call might be more direct and potentially faster than serializing data over the old Bridge. Lazy loading [10, 12] means the notification module code won't slow down app startup if the user doesn't set reminders immediately."
>
> **Goal:** This challenge encourages you to start connecting the architectural concepts learned in this module to practical application development considerations, reinforcing the "why it matters" aspect. Focus on the conceptual links, not deep implementation details at this stage.

***