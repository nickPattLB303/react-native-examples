World-Class React Native Training Course: Structure and Outline
===============================================================

I. Introduction
---------------

### A. Course Vision and Objectives

This document outlines the structure for a world-class React Native training course designed to elevate developers already proficient in native mobile (Android/iOS) or modern web frameworks (React/Angular) to a level where they can confidently build and deploy production-ready React Native applications. The primary goal is to instill not just proficiency with the React Native framework itself, but also a deep understanding of the surrounding ecosystem, current best practices, and the architectural principles that underpin high-performance mobile applications.

Upon successful completion, participants will possess the knowledge and practical skills necessary to contribute effectively to professional React Native development teams, architect robust application features, optimize performance, and navigate the complexities of the modern mobile landscape using React Native and Expo. The course acknowledges the diverse technical backgrounds of its participants---ranging from imperative native development paradigms to declarative web frameworks---and is structured to bridge these experiences, converging on a unified, high-standard approach to building universal applications with React Native.

### B. Foundational Pillars

The design and structure of this course rest upon established principles of effective learning and clear technical communication.

Instructional Design Rigor: The course architecture adheres rigorously to the ADDIE model---Analyze, Design, Develop, Implement, Evaluate.1 This systematic instructional design framework ensures a structured approach to curriculum development, starting with a clear analysis of learner needs and culminating in evaluation and refinement.4 ADDIE provides a robust, time-tested methodology for organizing and streamlining course content production, ensuring that learning objectives are clearly defined and effectively met.2 Furthermore, the course integrates gold-standard instructional design best practices, drawing from principles like Gagne's Nine Events of Instruction (e.g., gaining attention, stating objectives, stimulating recall, providing guidance, eliciting performance, providing feedback) and Mayer's Principles of Multimedia Learning (e.g., using relevant visuals, minimizing extraneous cognitive load).8 This focus on pedagogical best practices aims to maximize learner engagement, comprehension, retention, and the successful transfer of skills to real-world application development.11

Technical Communication Standards: Clarity, precision, and consistency are paramount in technical training. All course materials, including lectures, code examples, exercises, and documentation, will adhere to the principles outlined in the Microsoft Writing Style Guide.15 This involves focusing on the learner's intent and task completion, using clear, concise, and everyday language (while remaining technically accurate), ensuring content is easily scannable through structure and formatting, and maintaining consistent terminology throughout the course.15 This commitment ensures that complex technical concepts are presented in an accessible and unambiguous manner, facilitating faster learning and reducing potential confusion.19

### C. Course Scope and Target Audience

This course is specifically tailored for experienced software developers with existing proficiency in one of the following domains:

-   Native Android Development (Kotlin/Java)

-   Native iOS Development (Swift/Objective-C)

-   Web Development with React

-   Web Development with Angular

The curriculum covers a comprehensive range of technologies essential for modern React Native development, including:

-   Core Frameworks: React Native (including the New Architecture), React.

-   Ecosystem & Tooling: Expo (Expo CLI, Expo Go, EAS Build & Submit), TypeScript, Metro Bundler.

-   UI & Styling: Core Components, Flexbox, StyleSheet API, styled-components, react-native-paper.

-   Navigation: React Navigation, Expo Router.

-   State Management: React Context API, Zustand, React Query (TanStack Query).

-   Fundamentals: Modern JavaScript (ES6+).

Notably, this course explicitly excludes Redux, focusing instead on the specified contemporary state management solutions (Context API, Zustand, React Query) which offer different paradigms and are increasingly prevalent in modern React ecosystems.

II. Course Blueprint: Foundational Modules
------------------------------------------

This section details the initial modules designed to establish a common baseline of understanding and essential setup skills for all participants, regardless of their prior development background.

### Module 1: The React Native Ecosystem (Aligns with Topic 1: RN Fundamentals)

-   Learning Objectives:

-   Trace the evolution of mobile development leading to cross-platform solutions like React Native.

-   Explain the core value proposition of React Native, particularly its modern architecture.

-   Describe how React Native works under the hood (JSI, Fabric, Turbo Modules).

-   Instill the importance of using official documentation.

-   Content & Activities:

-   History of Mobile Development: The module begins by contextualizing React Native within the broader history of mobile technology. This includes a concise journey from the early "brick" phones like the Motorola DynaTAC 8000X 23 and rudimentary Personal Digital Assistants (PDAs) 26, through the emergence of the first smartphones (e.g., IBM Simon with basic apps 26) and early mobile OS attempts.28 It covers the pivotal introduction of the iPhone (2007) and Android (2008) 26, which solidified the modern native platform dichotomy (iOS/Android) 31 and led to the explosion of mobile apps via dedicated App Stores.27 This historical overview 23 highlights the platform fragmentation and development challenges that spurred the need for efficient cross-platform solutions. Establishing this shared understanding of the mobile landscape's evolution provides a common ground for learners from diverse backgrounds and underscores the problem that modern React Native aims to solve effectively.

-   Why React Native?: This section moves beyond simply stating "cross-platform." For an audience of experienced developers, particularly those from native backgrounds who might be skeptical of performance trade-offs associated with older cross-platform frameworks, the justification for React Native is anchored in its New Architecture. The limitations of the previous architecture, characterized by an asynchronous, JSON-based bridge acting as a bottleneck between the JavaScript thread and native threads 33, are explained. This sets the stage for introducing the performance and developer experience improvements offered by the modern framework, directly addressing potential concerns about viability for production applications.

-   How React Native Works (New Architecture): A conceptual overview of the modern architecture is presented, focusing on the key components that enable performance improvements:

-   JavaScript Interface (JSI): Introduced as the cornerstone replacing the old bridge.33 JSI is explained as a C++ API that allows JavaScript code to hold direct references to C++ objects (and vice-versa), enabling direct, synchronous method invocation between the JavaScript and native realms.33 The critical advantage emphasized is the elimination of the serialization/deserialization overhead inherent in the old bridge architecture.33 This direct communication pathway is crucial for performance-critical operations and achieving a more native feel.

-   Fabric: Briefly introduced as the new rendering system, enabled by JSI.33 Its role in improving UI responsiveness and enabling features like concurrent rendering is mentioned.33

-   Turbo Modules: Presented as the new native module system, also leveraging JSI.33 Benefits like faster module loading (lazy loading) and more efficient communication compared to legacy native modules are highlighted.33 Framing the "Why React Native?" question around these architectural advancements provides a compelling technical rationale for adoption, especially for developers prioritizing performance and a near-native user experience.

-   Callout to Official Documentation: Participants are strongly encouraged to treat the official React Native (reactnative.dev) and Expo (docs.expo.dev) documentation as primary resources. Guidance on navigating these sites and effectively searching for component APIs, guides, and troubleshooting information will be provided. Fostering self-reliance on official documentation is a key skill for production development.

-   Instructional Notes: This module utilizes several of Gagne's Nine Events of Instruction.8 Attention is gained through the engaging history of mobile development. Objectives are clearly stated. Recall of prior development experience (native platform specifics vs. web development patterns) is stimulated to connect new information to existing knowledge. Content is presented logically, moving from historical context to the problem, and finally to React Native's modern solution.

### Module 2: React Native Environment Setup (Aligns with Topic 2: RN Environment Setup)

-   Learning Objectives:

-   Set up a local development environment for React Native using Expo and an iOS simulator.

-   Successfully create, run, and debug a basic Expo application using Expo Go.

-   Understand the purpose and usage of core Expo CLI commands (create-expo-app, expo start, expo install).

-   Differentiate between npx expo install and npm install and know when to use each.

-   Navigate the default Expo project structure and identify key files/folders.

-   Apply basic troubleshooting techniques for common setup issues.

-   Content & Activities:

-   Prerequisites: Installation of the current Node.js Long-Term Support (LTS) version is required, as it forms the foundation for the React Native tooling.46

-   iOS Simulator Setup (macOS Only): Detailed, step-by-step instructions are provided, adhering to the clarity principles of the Microsoft Writing Guide 15:

1.  Install Xcode: Download and install Xcode directly from the Mac App Store.48

2.  Install Xcode Command Line Tools: Open Xcode, navigate to Settings... > Locations, and select the latest version from the Command Line Tools dropdown.48 This installs essential tools used by the React Native build process.

3.  Install an iOS Simulator Runtime: Within Xcode Settings... > Components, download the desired iOS simulator version under Platform Support.48

4.  Install Watchman: Use Homebrew (brew update && brew install watchman) to install Watchman, a filesystem watcher that significantly improves the Metro bundler's performance by efficiently detecting file changes.48

-   Creating the Project: The command npx create-expo-app@latest <YourAppName> is introduced as the standard method for initializing a new Expo project.46 The command utilizes npx to run the package without requiring a global installation. The default template, which includes essential configurations like TypeScript and Expo Router, is used.46 Template options (--template) are mentioned briefly for awareness.51

-   Running the App: The command npx expo start is used to launch the Metro bundler and the Expo development server.46 The Expo CLI interface in the terminal is explained, including the QR code for connecting physical devices and the keyboard shortcuts. Specifically, pressing i will attempt to launch the application on the configured iOS simulator.46 Expo Go, the client application running on the simulator or physical device, is introduced as the environment for running the app during development.46

-   Expo Go Limitations: It is clarified that Expo Go is a versatile sandbox environment but has limitations; certain native APIs or custom native code require the creation of a "Development Build" 48, a concept introduced later in the course (EAS module).

-   Dependency Management (npx expo install vs. npm install): This is a critical distinction for Expo development.

-   npm install <package-name>: Explained as the standard Node.js command. It installs the latest version of a package compatible with the version range specified in package.json, updating package-lock.json.57

-   npx expo install <package-name>: Strongly recommended for installing dependencies in Expo projects.57 The rationale is thoroughly explained: Expo SDKs bundle specific versions of native modules. npx expo install intelligently consults the compatibility requirements for the project's current Expo SDK version and installs JavaScript library versions known to work correctly with those bundled native modules.57 This significantly reduces the risk of version mismatches, runtime errors, and difficult-to-debug issues commonly caused by using npm install directly for libraries with native dependencies.57 It also handles peer dependencies more gracefully within the Expo ecosystem.57

-   npx expo vs npm: npx executes packages directly (useful for CLIs like create-expo-app or expo), while npm manages installed project dependencies.57 npx expo install leverages Expo's specific version resolution logic, unlike the generic npm install.

-   Troubleshooting Common Setup Issues: A systematic approach to troubleshooting is presented, emphasizing understanding the cause before applying a fix.

-   Dependency Conflicts (ERESOLVE, Peer Dependency Errors): Often arise from using npm install instead of npx expo install, or when integrating libraries with conflicting requirements.58 The first step should always be attempting installation with npx expo install.57 The --legacy-peer-deps flag for npm install is explained as a temporary workaround that tells npm to ignore peer dependency conflicts (reverting to older npm behavior), but it doesn't fix the underlying incompatibility and should be used cautiously.59 The --force flag is generally discouraged as it aggressively overrides checks and can lead to a broken state.60 The best solution is usually to align dependency versions correctly, often guided by npx expo install.

-   Cache and Installation Issues: Strange build errors, packager misbehavior, or issues after dependency upgrades can sometimes be resolved by clearing out potentially corrupted state. The command sequence rm -rf node_modules && rm -f package-lock.json && npm install (or yarn/pnpm equivalents) forces a clean reinstallation of all dependencies.62 Cleaning the npm cache (npm cache clean --force) can also help.63 In persistent cases, a system reboot after cleaning might be required.63

-   Simulator Connection Problems: If the CLI hangs while trying to open the simulator, or the app doesn't launch within it, potential solutions include: manually opening the Simulator app via Spotlight (open -a Simulator), ensuring the Xcode license agreement is accepted, checking for prompts within the simulator that need interaction, or as a last resort, using the Simulator's Device > Erase All Content and Settings... menu option.48

-   Expo Router Specific Errors: Errors like EXPO_ROUTER_APP_ROOT not defined or require.context not enabled typically point to misconfigurations in babel.config.js or metro.config.js related to the Expo Router setup.65 Ensuring these files correctly include the Expo Router Babel plugin and extend the base Expo Metro config is key.

-   Diagnostic Tool: The command npx expo-doctor is introduced as a primary diagnostic tool. It checks the project configuration, dependencies, and environment for common issues and provides actionable advice.58 Running this should often be the first step when encountering setup problems.

-   Default Template Walkthrough: A guided tour of the standard project structure created by npx create-expo-app@latest:

-   app/: Contains all routing logic for Expo Router (files become routes).54

-   assets/: Stores static assets like images and fonts.46

-   components/, constants/, hooks/: Example directories for organizing reusable UI components, constant values, and custom hooks (not strictly enforced, but good practice).46

-   package.json: Defines project metadata, dependencies, and scripts (e.g., start, android, ios, web).51

-   app.json / app.config.js: Configures Expo-specific settings like app name, version, icon, splash screen, plugins, platform-specific properties.58

-   eas.json: Configures EAS Build profiles (e.g., development, preview, production) and EAS Submit settings.67

-   babel.config.js: Configures the Babel JavaScript compiler (necessary for JSX, TypeScript, and specific plugins like react-native-reanimated or Expo Router's).65

-   metro.config.js: Configures the Metro bundler, which bundles JavaScript code for the app.65

-   tsconfig.json: Configures the TypeScript compiler options.71

-   Instructional Notes: Clear, numbered steps following the Microsoft Writing Guide 15 are used for setup procedures. Exact commands are provided for execution. Visual aids (screenshots or diagrams) are recommended for illustrating Xcode settings and the final project structure. A hands-on lab reinforces the module: participants set up their environment, create and run the default app, install a library using npx expo install, deliberately introduce a common error (e.g., using npm install for a native-dependent library), and use npx expo-doctor and other techniques to troubleshoot.

-   Table: Troubleshooting Common Expo Setup Issues\
    This table serves as a quick reference, aiding learners in overcoming initial hurdles and reinforcing the troubleshooting steps taught. Reducing frustration early on is key to maintaining motivation.9

|

Symptom/Error

 |

Potential Cause

 |

Recommended Solution(s)

 |
|

ERESOLVE / Peer Dependency Warning

 |

Incompatible dependency versions; often from using npm install directly.

 |

1\. Use npx expo install <package>.57 2\. Check library compatibility with your Expo SDK version. 3. As temporary workaround: npm install --legacy-peer-deps (use with caution).59 Avoid --force.60

 |
|

Packager errors, unexpected crashes after update

 |

Corrupted node_modules, cache issues, incomplete dependency installation.

 |

1\. rm -rf node_modules && rm -f package-lock.json && npm install.63 2\. npm cache clean --force.63 3\. Restart Metro bundler (Ctrl+C then npx expo start). 4. Restart computer.63

 |
|

CLI stuck on "Opening on iOS Simulator"

 |

Simulator unresponsive, Xcode license not accepted.

 |

1\. Manually open Simulator app (open -a Simulator).48 2\. In CLI, press i again. 3. Ensure Xcode license is accepted (may prompt on first Xcode run). 4. In Simulator menu: Device > Erase All Content and Settings... (last resort).48

 |
|

Expo Go app doesn't open in simulator

 |

Initial permission prompt missed.

 |

Interact with the simulator (click/drag) to trigger the "Open in Expo Go?" prompt, then accept.48

 |
|

EXPO_ROUTER_APP_ROOT not defined

 |

Expo Router Babel plugin missing or misconfigured in babel.config.js.

 |

Ensure plugins: ['expo-router/babel'] is present in babel.config.js.65 Clear cache: npx expo start -c.

 |
|

require.context not enabled

 |

Metro config not set up correctly for Expo Router.

 |

Ensure metro.config.js extends expo/metro-config or correctly enables context modules.65 Delete metro.config.js if customisation isn't needed to revert to default.

 |
|

General project configuration issues

 |

Various misconfigurations (plugins, dependencies, native setup).

 |

Run npx expo-doctor for automated checks and recommendations.58

 |

### Module 3: Essential Web, JavaScript, and TypeScript (Aligns with Topics 3, 4, 6)

-   Learning Objectives:

-   Identify key CSS concepts (Flexbox, styling properties) relevant to React Native styling.

-   Master core ES6+ JavaScript features essential for React/React Native development (variables, functions, objects, arrays, async).

-   Understand the benefits of TypeScript in large applications.

-   Apply basic TypeScript types and interfaces to React Native components and props.

-   Content & Activities:

-   Web Development Essentials (Light Intro): This section bridges the gap between web and native paradigms for styling and structure.

-   Component Analogy: Explain that React Native uses components like <View> and <Text> which serve similar structural and semantic purposes as HTML's <div> and <p> tags, respectively, but are fundamentally different native components, not HTML elements rendered in a WebView.72

-   Styling Concepts: Introduce React Native's styling mechanism:

-   Styles are defined using JavaScript objects, not separate CSS files.73

-   The StyleSheet.create API is the preferred method for defining styles, offering performance benefits and organization.74

-   Flexbox: Emphasize that Flexbox is the primary layout model in React Native.73 Highlight the key difference from web: flexDirection defaults to 'column' in React Native, not 'row'.78

-   Properties: Style property names use camelCase (e.g., backgroundColor) instead of CSS's kebab-case (background-color).73

-   Units: React Native uses unitless numbers representing density-independent pixels, ensuring consistent sizing across different screen densities, unlike web units like px, em, or rem.73

-   Key Differences from CSS: Explicitly state that there is no CSS cascading (styles don't automatically flow down the component tree) and inheritance is very limited, primarily occurring only within nested <Text> components.74 This distinction is vital for web developers accustomed to CSS rules.

-   JavaScript Essentials (ES6+ Focus): Cover modern JavaScript features crucial for writing effective React and React Native code.

-   Variables: Explain let (re-assignable, block-scoped) and const (not re-assignable, block-scoped) as the standard, contrasting with the older function-scoped var.82 Understanding block scope ({}) is essential.

-   Functions: Cover function declarations, function expressions, and prominently, Arrow Functions (=>). Explain their concise syntax and, crucially, how they handle the this keyword lexically (inheriting this from the surrounding scope), which simplifies event handling in class components (though less critical with hooks).82

-   Objects: Object literal syntax ({ key: value }), accessing properties (dot notation, bracket notation), defining methods within objects.82

-   Arrays: Array literal syntax ([item1, item2]), and focus on essential iteration and transformation methods: map (transforming each element), filter (selecting elements based on a condition), reduce (accumulating a single value from the array), forEach (executing a function for each element).82 These are fundamental for rendering lists and manipulating data in React.

-   Destructuring: Explain object (const { prop1, prop2 } = obj;) and array (const [item1, item2] = arr;) destructuring as a way to extract values into distinct variables concisely, improving code readability.82

-   Spread (...) and Rest (...) Operators: Explain the spread operator for copying properties from objects ({...obj1,...obj2}) or elements from arrays ([...arr1,...arr2]), and the rest operator for gathering remaining arguments into an array (function(...args) or remaining properties in destructuring).82

-   Template Literals: Introduce backticks (`) for creating strings that allow embedded expressions (${variable}) and multi-line strings without explicit newline characters.84

-   Ternary Operator: Explain the concise conditional expression condition? valueIfTrue : valueIfFalse as an alternative to simple if/else statements, often used in JSX for conditional rendering.84

-   ES Modules: Cover the standard import (named and default) and export (named and default) syntax for code organization and modularity.84

-   Asynchronous JavaScript: Explain the concept of asynchronous operations (like network requests). Introduce Promises and how to handle them using .then() for success and .catch() for errors. Focus on the modern async/await syntax as the preferred way to write cleaner, more readable asynchronous code that resembles synchronous code.82

-   TypeScript Essentials: Introduce TypeScript and its core concepts relevant to React Native development.

-   Why TypeScript?: Emphasize the benefits, particularly for developers coming from strongly-typed native languages. Static typing catches errors during development (compile-time) rather than at runtime, leading to more robust and reliable applications.86 It improves code maintainability, scalability, and significantly enhances collaboration within teams by providing clear contracts (types and interfaces).86 This early introduction provides a crucial safety net for those new to the JavaScript ecosystem.

-   Basic Types: Introduce fundamental types: string, number, boolean, null, undefined. Explain array typing (string or Array<string>) and basic object typing ({ key: string; count: number }).87 Briefly mention any but strongly advise against its overuse as it defeats the purpose of TypeScript.

-   Interfaces and Types: Show how to define custom object shapes using interface MyProps {... } or type MyType = {... }. Explain their use in defining contracts for component props and state.87

-   Typing Functions: Demonstrate how to add types to function parameters and specify return types (function add(a: number, b: number): number {... }).86

-   Typing React Components: Introduce React.FC<Props> (Functional Component) for typing functional components and their props.87 Show how to type the useState hook (useState<string>('')) and how props interfaces are used (const MyComponent: React.FC<MyProps> = (props) => {... }).87

-   Type Assertions: Explain the as keyword (value as string) for situations where the developer knows the type better than the compiler (e.g., data from an untyped API).88 Emphasize that this should be used sparingly and carefully, as it bypasses type checking.

-   Mandate Enforcement: Reiterate that from this module onwards, all code examples, exercises, challenges, and project work within the course must be written using TypeScript. This ensures consistency and reinforces the benefits of static typing for building production-ready applications.

-   Instructional Notes: Provide concise, clear code examples for every JavaScript and TypeScript concept introduced.82 Include targeted exercises: manipulating arrays using map/filter/reduce, writing an async function to simulate data fetching, defining TypeScript interfaces for component props, and typing a simple functional component with useState. Ensure code comments and explanations follow the Microsoft Writing Guide's principles for clarity and conciseness.15

### Module 4: React Fundamentals for Mobile Developers (Aligns with Topic 5: React Essentials)

-   Learning Objectives:

-   Explain the core principles of React: component-based architecture, declarative UI, virtual DOM.

-   Build functional components using JSX syntax.

-   Manage component state using the useState hook.

-   Pass data between components using props.

-   Handle side effects and component lifecycle events using the useEffect hook.

-   Contrast React concepts with equivalent paradigms in native (Android/iOS) and Angular development.

-   Content & Activities:

-   Core React Philosophy:

-   Component-Based Architecture: Reiterate that React applications are built by composing small, reusable, and encapsulated UI pieces called components.72 This modularity is key to building complex interfaces.

-   Declarative UI: This is a fundamental shift, especially for native developers. Emphasize that developers declare what the UI should look like for a given state, rather than writing imperative code to manually manipulate UI elements step-by-step.79 The UI is a function of the state (UI = f(state)). Contrast this directly with the imperative approach common in traditional Android (manipulating Views) and iOS (manipulating UIViews/ViewControllers) development.79 The framework handles the "how" of updating the display.

-   Virtual DOM (Conceptual): Briefly explain the concept for context, especially for web developers. React maintains an in-memory representation (virtual DOM) of the UI. When state changes, React calculates the difference (diffing) between the previous and new virtual DOM and then efficiently updates only the necessary parts of the actual native UI elements.90 This minimizes direct manipulation of the underlying platform UI views.

-   JSX (JavaScript XML):

-   Review JSX as the syntax used within JavaScript to define React elements, resembling HTML or XML.72 Compare its declarative nature to Android XML layouts or SwiftUI/Jetpack Compose.79

-   Show how to embed JavaScript expressions (variables, function calls) within JSX using curly braces {}.

-   Reinforce styling using the style prop, passing JavaScript objects (camelCase properties).72

-   Remind learners of key syntax differences from HTML: className becomes className in React DOM (though less relevant in RN), style properties are camelCased.90

-   Components:

-   Functional Components: Establish functional components as the modern standard for writing React components.83 Briefly acknowledge the existence of Class Components for context but focus all examples and teaching on functions.

-   Demonstrate creating simple functional components that return JSX.

-   Illustrate composition, where components render other components, allowing complex UIs to be built from smaller, manageable parts.

-   Props (Properties):

-   Explain props as the mechanism for passing data down the component tree, from parent to child.72

-   Emphasize that props are read-only within the receiving component; a component cannot modify its own props.79

-   Provide analogies for different backgrounds:

-   Native Developers: Compare props to Intent extras passed to Android Activities, arguments passed to Fragments, or parameters passed to initializers in iOS.79

-   Angular Developers: Compare props to using the @Input() decorator to receive data from a parent component.92

-   Show how to define expected props and their types using TypeScript interfaces (interface MyComponentProps { message: string; }).

-   State:

-   Define state as data that is managed within a component and can change over time, causing the component to re-render.79

-   Introduce the useState Hook: Explain its purpose for declaring state variables in functional components. Demonstrate the syntax: const [value, setValue] = useState(initialValue);.91 Explain that calling the setValue function triggers a re-render with the new value.

-   Clarify that useState creates state that is local to the specific instance of the component where it's called.

-   Lifecycle / Effects:

-   Introduce the useEffect Hook as the primary way to handle "side effects" in functional components.93 Define side effects as operations that interact with the outside world (e.g., data fetching, setting up subscriptions, manually changing the DOM/native views outside of React's control, setting timers).

-   Explain that useEffect runs after the component renders.

-   Detail the importance of the dependency array:

-   `` (empty array): Effect runs only once after the initial render (like componentDidMount or ngOnInit).94

-   [dep1, dep2]: Effect runs after the initial render and any time dep1 or dep2 changes.

-   No array: Effect runs after every render (use with caution).

-   Explain the optional cleanup function returned from the effect callback. This function runs before the component unmounts or before the effect runs again, used for cleanup tasks like unsubscribing from data sources or clearing timers.94

-   Map concepts to familiar paradigms:

-   Native Developers: Compare useEffect(...,) to componentDidMount (React Class) or viewDidLoad (iOS) / onCreate or onViewCreated (Android). Compare the cleanup function to componentWillUnmount or viewWillDisappear/onDestroyView.90

-   Angular Developers: Compare useEffect(...,) to ngOnInit and the cleanup function to ngOnDestroy.90

-   Handling Events: Briefly introduce the pattern of handling user interactions (like button presses) by passing function props (callbacks) down to child components (e.g., <Button onPress={handlePress} />).

-   Instructional Notes: Continuously draw parallels and contrasts with native (Android/iOS) 79 and Angular 90 development paradigms to leverage learners' existing knowledge. The declarative nature of React needs constant reinforcement for those coming from imperative backgrounds. All code examples must use TypeScript. Include practical lab exercises: building a simple counter using useState, creating parent/child components passing data via props, and fetching mock data using useEffect after the component mounts.

-   Table: React Concepts vs. Native/Angular Equivalents\
    This table facilitates faster learning by mapping new React concepts to familiar paradigms from the target audience's backgrounds, accelerating comprehension by leveraging existing mental models.79

|

React Concept

 |

Native Android Equivalent

 |

Native iOS Equivalent

 |

Angular Equivalent

 |
|

JSX / Component UI

 |

XML Layout / Jetpack Compose Composable

 |

Storyboard / SwiftUI View

 |

HTML Template

 |
|

Component Logic

 |

Activity / Fragment / ViewModel / Composable

 |

UIViewController / UIView / ViewModel

 |

Component Class (.ts)

 |
|

State (useState)

 |

ViewModel + LiveData / StateFlow / Compose State

 |

State variables / @State / ObservableObject

 |

Component properties / Service State

 |
|

Props

 |

Intent Extras / Fragment Arguments / Constructor Params

 |

Segue Data / Initializer Params / Struct/Class Properties

 |

@Input() decorator

 |
|

Effects (useEffect)

 |

Lifecycle Methods (onCreate, onResume, etc.)

 |

Lifecycle Methods (viewDidLoad, etc.)

 |

Lifecycle Hooks (ngOnInit, ngOnDestroy, etc.)

 |
|

Unidirectional Flow

 |

(Often MVVM/MVI patterns enforce similar)

 |

(Often MVC/MVVM patterns enforce similar)

 |

(Contrasts with Two-Way Binding via [(ngModel)])

 |

III. Course Blueprint: Core React Native Development
----------------------------------------------------

This section covers the modules focused on building the user interface and core functionalities of a React Native application.

### Module 5: React Native Core Components & APIs (Aligns with Topic 7: RN Components)

-   Learning Objectives:

-   Utilize fundamental React Native Core Components (View, Text, Image, TextInput, Button, Pressable, ScrollView, FlatList, SectionList) effectively.

-   Understand the specific props and use cases for each core component.

-   Differentiate between ScrollView and list virtualization components (FlatList, SectionList) for performance.

-   Implement best practices for creating reusable custom components.

-   Content & Activities:

-   Review: Briefly revisit the concept that React Native Core Components are JavaScript abstractions that render corresponding native platform views (UIView, Android View/ViewGroup) at runtime, ensuring a native look, feel, and performance.72

-   Deep Dive into Core Components: Explore the most commonly used components and their essential props:

-   <View>: The fundamental building block for UI layout.72 Emphasize its role as a container supporting Flexbox layout, styling, and accessibility controls. Analogous to <div> on the web or ViewGroup/UIView natively.72

-   <Text>: The exclusive component for rendering text strings.72 Cover common styling props (fontSize, color, fontWeight, textAlign, etc.) and the unique capability of inheriting styles when nested within other <Text> components.72 Analogous to <p> on the web or TextView/UITextView natively.72

-   <Image>: Used for displaying various types of images.72 Explain the source prop for different image sources: remote images via {uri: 'http://...'} 97, local project assets using require('./path/to/image.png') 97, and base64 encoded data URIs.97 Cover essential style props like width, height, and resizeMode (cover, contain, stretch, etc.). Image optimization is crucial for performance and will be revisited in the Performance module.38

-   <TextInput>: The core component for capturing user text input via the keyboard.72 Discuss the controlled component pattern (using value prop tied to state and onChangeText prop to update state). Cover key props like placeholder, keyboardType (e.g., 'numeric', 'email-address'), secureTextEntry (for passwords), autoCapitalize, multiline, onSubmitEditing.102

-   <Button> vs <Pressable>: Contrast the basic, platform-styled <Button> (limited customization) 77 with the more flexible <Pressable> component.77 <Pressable> allows for custom child components, detailed styling, and feedback customization based on interaction state (e.g., pressed).73 Explain how to handle onPress events for both.

-   <ScrollView>: A generic container that enables scrolling of its content.72 Suitable for a limited amount of content where all items can be rendered without significant performance impact. Crucially, warn against using ScrollView for long or dynamic lists due to performance limitations -- it renders all child components simultaneously.38

-   <FlatList>: The high-performance solution for rendering simple, long lists of data.99 Explain its virtualization mechanism: it only renders items currently visible (or about to become visible) on the screen, drastically improving memory usage and performance for large datasets.38 Cover essential props: data (array of list items), renderItem (function returning the component for each item), keyExtractor (function returning a unique key for each item).104 Mention optimization props (initialNumToRender, windowSize, getItemLayout) to be detailed later.105

-   <SectionList>: Similar to FlatList but designed for rendering lists with section headers.99 Also uses virtualization. Cover key props: sections (array of section objects, each with title and data), renderItem, renderSectionHeader, keyExtractor.104

-   Other Useful Components (Brief Overview): Mention the existence and basic purpose of components like ActivityIndicator (loading spinner), Modal (presenting content over the current view), Switch (boolean toggle), StatusBar (controlling the device status bar).98 Direct learners to the API documentation for details.

-   Custom Components: Building reusable components is fundamental to React development.

-   Rationale: Explain the benefits: Encapsulation (grouping related logic and UI), Reusability (avoiding code duplication), Consistency (maintaining a uniform look and feel), Maintainability.106

-   Best Practices:

-   Small & Focused: Adhere to the Single Responsibility Principle. Each component should do one thing well.106 Break down complex components into smaller ones.

-   Props for Customization: Design components to be flexible by accepting props for data and configuration.106 Define clear prop interfaces using TypeScript.

-   Composition: Build complex UIs by assembling simpler, reusable components.

-   Folder Structure: Recommend organizing custom components, potentially placing each component in its own folder containing the component file (index.tsx) and its styles (styles.ts, if separated).106

-   Type Definitions: Use TypeScript interfaces or PropTypes (though TS is preferred in this course) to document and enforce the expected props.106

-   Documentation: Stress the importance of clear comments within the code and potentially README files for more complex shared components, explaining usage and props.106

-   Instructional Notes: Provide clear, runnable examples for each core component, demonstrating key props and common usage patterns.72 Include hands-on labs: construct a screen layout using View, Text, Image, and TextInput; create a reusable custom button component using Pressable; implement a scrollable list of items using FlatList, ensuring keyExtractor is correctly implemented. Adhere to the Microsoft Writing Guide for documenting component APIs and props conceptually.21

### Module 6: React Native Hooks (Aligns with Topic 8: RN Hooks)

-   Learning Objectives:

-   Master the usage and purpose of core React hooks (useState, useEffect, useContext, useRef).

-   Apply performance optimization hooks (useCallback, useMemo) appropriately.

-   Utilize the useReducer hook for managing complex component state.

-   Understand and adhere to the Rules of Hooks.

-   Create and utilize custom hooks to encapsulate and reuse stateful logic.

-   Content & Activities:

-   Review of Basic Hooks (from Module 4): Briefly revisit the core hooks to ensure foundational understanding.

-   useState: Managing local component state. Syntax: const = useState(initialValue).93 Mention functional updates (setState(prevState => prevState + 1)) for state updates depending on the previous state, ensuring correctness during batching.94 Discuss lazy initial state (useState(() => computeExpensiveInitialState())) for avoiding costly computations on every render.94

-   useEffect: Handling side effects. Review syntax, the critical role of the dependency array (``, [dep], omitted) in controlling effect execution, and the cleanup function mechanism for preventing memory leaks (e.g., unsubscribing, clearing timers).93

-   useContext: Briefly mention its role in accessing data from a Context Provider without prop drilling. A deeper dive occurs in the State Management module.93

-   Additional Core Hooks: Introduce hooks for more advanced state management, performance optimization, and interacting with the component instance.

-   useRef: Explain its two main use cases: 1) Accessing underlying native component instances to call imperative methods (e.g., textInputRef.current.focus(), flatListRef.current.scrollToIndex()). 2) Storing mutable values that persist across renders without causing re-renders when changed (unlike state). Useful for things like storing interval IDs, previous state values, or flags.93 Syntax: const myRef = useRef(initialValue);. Access/modify the value via myRef.current.

-   useReducer: Present as an alternative to useState particularly suited for managing state logic that is complex, involves multiple related sub-values, or where the next state depends intricately on the previous state and an action.93 Explain the core concepts: the reducer function (state, action) => newState, the dispatch function for sending actions, and the action object structure. Compare useState vs. useReducer, highlighting scenarios where useReducer offers better organization and predictability.93

-   useCallback: Crucial for performance optimization. Explain that functions defined inside components get recreated on every render, leading to different function references. If these functions are passed as props to memoized child components (React.memo), the child will re-render unnecessarily because the prop (the function reference) has changed. useCallback(fn, deps) returns a memoized version of the callback function that only changes if one of its dependencies (deps array) has changed.93 Provide clear examples showing a parent passing a callback to a memoized child, first without useCallback (causing unnecessary re-renders) and then with useCallback (preventing them).

-   useMemo: Another performance hook. Explain that useMemo(computeExpensiveValue, deps) memoizes the result of a function call (computeExpensiveValue). The function is only re-executed if a dependency in the deps array changes; otherwise, the cached result is returned.93 Use cases include expensive calculations (e.g., filtering/sorting large arrays) or creating complex objects/arrays that should only be recalculated when necessary, preventing downstream re-renders. Emphasize avoiding premature optimization -- profile first.

-   useLayoutEffect: Explain its similarity to useEffect but highlight the timing difference: useLayoutEffect runs synchronously after React performs all DOM mutations but before the browser paints the screen.93 Its primary use case is reading layout information from the DOM (e.g., getting element dimensions) and synchronously re-rendering if needed to prevent visual inconsistencies. Mention it's less common in typical React Native development compared to web, as direct DOM manipulation is rarer, but important to know for specific scenarios like measuring native view layouts.

-   Rules of Hooks Revisited: Reinforce the two fundamental rules and their rationale.

-   Top Level Only: Hooks must be called at the top level of a function component or custom hook, not inside loops, conditions, or nested functions.111 Explain the reason: React relies on the consistent order of Hook calls across renders to correctly associate state and effects with their respective Hook calls.111 Calling hooks conditionally breaks this order and leads to unpredictable behavior and bugs. If conditional logic is needed, it should be placed inside the hook (e.g., useEffect(() => { if (condition) {... } }, [condition]);).

-   React Functions Only: Hooks can only be called from React function components or other custom Hooks.111 Explain the reason: Hooks are tied to the component's lifecycle and rendering process; calling them from regular JavaScript functions would disconnect them from this context.

-   Mention the ESLint plugin eslint-plugin-react-hooks which automatically enforces these rules, providing immediate feedback in the editor.111

-   Custom Hooks: Introduce the concept of creating custom hooks to extract and reuse stateful component logic.

-   Purpose: The primary motivation is reusability.111 If multiple components share the same complex stateful logic (e.g., fetching data, subscribing to events, managing form input state), that logic can be extracted into a custom hook. This avoids code duplication and makes components cleaner and more focused on their presentation.

-   Creating Custom Hooks: Demonstrate the process: Identify the reusable logic (involving one or more built-in hooks like useState, useEffect, etc.). Create a regular JavaScript function whose name starts with use (e.g., useWindowWidth, useFormInput, useFetch, useOnlineStatus 113). Move the reusable logic into this function. Return any state values or functions that the consuming components need.

-   Naming Convention: Reiterate that the use prefix is mandatory and signals to React and developers (and the linter) that the function follows the Rules of Hooks.112

-   Best Practices: Emphasize designing custom hooks with a single responsibility.112 Ensure they have clear inputs (arguments) and outputs (return values).112 Avoid hardcoding dependencies; pass necessary data or callbacks as arguments to make the hook more flexible and reusable.112 Ensure custom hooks are testable in isolation.112

-   Instructional Notes: Use practical examples to illustrate scenarios where useCallback and useMemo provide tangible benefits, perhaps using a profiler visualization conceptually. Include a hands-on lab where participants identify repetitive stateful logic (e.g., handling input field state and validation) in two separate components and refactor it into a reusable custom hook (e.g., useInput). Discuss potential performance pitfalls related to hooks, such as creating functions inside useEffect without proper dependency management or overusing useMemo/useCallback.93

### Module 7: React Native UI and Styling (Aligns with Topic 9: RN UI and Styling)

-   Learning Objectives:

-   Master styling components using StyleSheet.create.

-   Implement common layout patterns using Flexbox.

-   Apply platform-specific styles effectively.

-   Utilize styled-components for component-based styling and theming.

-   Integrate and customize the react-native-paper UI library for Material Design components.

-   Understand the trade-offs between different styling approaches.

-   Content & Activities:

-   StyleSheet.create Deep Dive:

-   Benefits: Explain the advantages over inline styles: performance optimization (style objects are created once and referenced by ID, reducing bridge traffic), better code organization, and compile-time validation of style properties.74

-   Syntax: Review the basic structure: const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: 'white' }, text: { color: 'blue' } });.74

-   Applying Styles: Demonstrate applying single styles (style={styles.container}) and combining multiple styles using the array syntax (style={[styles.base, styles.modifier]}). Emphasize that styles in the array are merged from left to right, with later styles overriding earlier ones for the same property.74

-   Best Practices: Strongly advocate avoiding inline styles (style={{ color: 'red' }}) for anything beyond trivial cases due to performance and maintainability drawbacks.73 Discuss organization strategies: keeping StyleSheet definitions within the component file for colocation 108 versus extracting styles into separate styles.ts files (trade-offs: colocation vs. separation of concerns).107 Recommend using constants or theme objects for defining reusable colors, font sizes, and spacing values to ensure consistency.76

-   Layout with Flexbox:

-   Core Concepts Review: Reiterate the fundamental Flexbox properties used for layout in React Native: flexDirection (defaults to 'column') 78, justifyContent (alignment along the main axis), alignItems (alignment along the cross axis), flex (proportion of available space), flexGrow, flexShrink, flexBasis.73

-   Common Layout Patterns: Provide practical examples and exercises for achieving common mobile layouts: centering items both horizontally and vertically, distributing space between items (space-between, space-around, space-evenly), creating fixed headers/footers with scrollable content areas, arranging items in rows and columns.

-   Positioning: Explain position: 'absolute' and position: 'relative' and their use cases, along with top, bottom, left, right.

-   Responsive and Platform-Specific Styling: Address the need for UIs to adapt to different screen sizes and platforms.

-   Flexible Sizing: Encourage using Flexbox properties (flex: 1) and percentages (width: '80%') for creating fluid layouts that adapt to screen dimensions, rather than fixed pixel values.73

-   Dimensions API: Introduce Dimensions.get('window') or Dimensions.get('screen') to retrieve device width and height.73 Caution that relying heavily on Dimensions for layout can lead to less maintainable code compared to well-structured Flexbox; use it sparingly for specific cases where Flexbox isn't sufficient.

-   Platform Module: Show how to use Platform.OS === 'ios' or Platform.OS === 'android' for simple conditional logic within style definitions or components.76

-   Platform.select: Demonstrate the Platform.select({ ios: {...styles }, android: {...styles }, default: {...styles } }) pattern for defining more complex, platform-specific style objects cleanly.77

-   Platform-Specific Files: Mention the convention of using file extensions like .ios.tsx and .android.tsx for platform-specific component implementations, which React Native automatically resolves.

-   styled-components/native: Introduce a popular CSS-in-JS library for React Native.

-   Concept: Explain CSS-in-JS: writing styles directly within JavaScript/TypeScript, often tied to specific components, enabling dynamic styling based on props and themes.73

-   Installation: npm install styled-components and npm install --save-dev @types/styled-components-react-native for TypeScript support.115

-   Usage: Demonstrate the core syntax: const StyledView = styled.View\ padding: 10px; background-color: papayawhip; `;. Show how to create styled versions of core RN components (styled.Text,styled.TouchableOpacity`, etc.).75

-   Dynamic Styling: Show how to interpolate functions based on component props: background-color: ${props => props.primary? 'palevioletred' : 'white'};.75

-   Extending Styles: Demonstrate how to create variations of styled components by wrapping existing ones: const TomatoButton = styled(Button)\ color: tomato; `;`.115

-   Theming: Introduce the <ThemeProvider> component to provide a theme object down the component tree via context, and the useTheme hook (or props.theme) to access theme values within styled components.116 This is powerful for implementing light/dark modes or brand consistency.

-   UI Library: react-native-paper: Introduce a popular component library implementing Google's Material Design.

-   Introduction: Position react-native-paper as a comprehensive suite of pre-built, customizable UI components (Buttons, Cards, Inputs, Dialogs, Appbars, etc.) following Material Design guidelines.70 It accelerates UI development and ensures visual consistency.

-   Setup: Guide through installation: npm install react-native-paper react-native-safe-area-context react-native-vector-icons.70 Explain that react-native-vector-icons needs native linking for bare React Native projects (usually npx pod-install ios), but Expo projects often handle this automatically or use @expo/vector-icons. Emphasize wrapping the entire application root with the <PaperProvider> component, which injects the theme.70 Mention the optional Babel plugin (react-native-paper/babel) for optimizing bundle size by tree-shaking unused components.70

-   Using Components: Provide examples of importing and using common components like <Button mode="contained">, <Card>, <TextInput label="Email">, <List.Item title="Item">, <Appbar.Header>.117 Direct learners to the official react-native-paper documentation for the full component API.

-   Theming: Explain how to customize the appearance using the theme prop on <PaperProvider>. Show how to use the default themes (MD3LightTheme, MD3DarkTheme - Note: Paper v5 uses MD3 by default 122), how to extend a default theme by overriding properties (e.g., colors.primary), and how components access the theme implicitly or explicitly via the useTheme hook provided by the library.70 Include a simple example of toggling between a light and dark theme using the PaperProvider.

-   Instructional Notes: Include hands-on labs for each major styling approach: Refactor a screen using only inline styles to use StyleSheet.create and Flexbox for layout. Build a complex, responsive card layout using Flexbox. Implement a settings screen using various react-native-paper components and apply a custom brand theme. Convert a component styled with StyleSheet to use styled-components with prop-based variations. Critically discuss the pros and cons of each method, encouraging learners to consider maintainability, performance, and developer experience.75

-   Table: Styling Approaches Comparison\
    This table provides a concise summary to help learners choose the appropriate styling strategy based on project requirements and team preferences.75

|

Approach

 |

Key Features

 |

Pros

 |

Cons

 |

Best Use Cases

 |
|

StyleSheet.create

 |

JS objects, performance optimization, basic validation, array merging

 |

Performant, built-in, good for static styles, clear separation possible 74

 |

Verbose, no dynamic props/theming easily, limited composition 73

 |

Performance-critical apps, simpler UIs, teams preferring explicit style objects.

 |
|

styled-components

 |

CSS-in-JS, component-based, dynamic props, theming, automatic vendor prefixing

 |

Excellent DX, dynamic styling, theming support, good maintainability, component encapsulation 75

 |

Runtime overhead (minor), potential learning curve for CSS-in-JS, adds dependency 75

 |

Complex UIs, apps requiring theming/dynamic styles, teams familiar with CSS-in-JS.

 |
|

react-native-paper

 |

Pre-built Material Design components, theming system, accessibility features

 |

Rapid development, enforces design consistency (Material), good defaults 70

 |

Opinionated (Material Design), adds dependencies, customization might be limited sometimes 117

 |

Apps needing Material Design, rapid prototyping, projects prioritizing consistency.

 |

### Module 8: React Native User Input and Forms (Aligns with Topic 12: RN User Input and Forms)

-   Learning Objectives:

-   Configure TextInput components for various input types and behaviors.

-   Implement robust form handling using react-hook-form.

-   Perform client-side validation using react-hook-form with schema validation.

-   Manage form submission state and display validation errors effectively.

-   Content & Activities:

-   Advanced TextInput Configuration:

-   Review: Recap the fundamental props: value and onChangeText for controlled inputs, placeholder.102

-   Advanced Props: Explore props for controlling keyboard behavior and input types: keyboardType (options like 'numeric', 'email-address', 'phone-pad'), secureTextEntry (for passwords), autoCapitalize ('none', 'sentences', 'words', 'characters'), autoComplete (for autofill hints), multiline (for multi-line input), maxLength.102

-   Event Handling: Discuss props for handling specific events: onSubmitEditing (when the user presses the submit button on the keyboard), onFocus (when the input gains focus), onBlur (when the input loses focus).102

-   Programmatic Control: Demonstrate how to use useRef to get a reference to the TextInput component and call its imperative methods like .focus() and .blur() programmatically.102

-   Challenges in Form Handling: Briefly discuss the inherent complexities of managing forms manually in React: tracking the state of multiple input values, handling validation logic for each field, managing error messages, tracking touched/dirty states, and handling the form submission process and its loading/error states. This motivates the need for a dedicated form library.

-   Introduction to react-hook-form:

-   Rationale: Introduce react-hook-form as a performant and developer-friendly library for managing forms in React and React Native.125 Highlight its key advantages: minimizes unnecessary component re-renders (improving performance), simplifies form state management, provides an intuitive API, and integrates seamlessly with popular schema validation libraries.125

-   Setup: Show the simple installation: npm install react-hook-form.125

-   Core react-hook-form Concepts:

-   useForm Hook: This is the central hook. Explain how to destructure the necessary functions and state from its return value: const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, watch, setValue, reset } = useForm();.125 Explain the purpose of each:

-   control: An object passed to the Controller component to connect inputs.

-   handleSubmit: A function wrapper for the form's submission handler, which automatically handles validation before calling the provided onSubmit function.125

-   formState: An object containing information about the form's state, including errors (validation errors), isSubmitting (submission in progress), isValid (form validity), isDirty (if any field has changed), touchedFields.

-   watch: Function to observe field values.

-   setValue: Function to programmatically set field values.

-   reset: Function to reset the form state.

-   Integrating with React Native Inputs (Controller): Explain that while register is common in web React Hook Form, the <Controller> component is the standard way to integrate with controlled components like React Native's TextInput, Switch, or custom input components. Demonstrate its usage:\
    TypeScript\
    import { Controller, useForm } from 'react-hook-form';\
    import { TextInput, Text, View } from 'react-native';

    // Inside component:\
    const { control, formState: { errors } } = useForm();

    <Controller\
      control={control}\
      rules={{ required: 'This field is required' }} // Validation rules\
      render={({ field: { onChange, onBlur, value } }) => (\
        <TextInput\
          onBlur={onBlur}\
          onChangeText={onChange}\
          value={value}\
          placeholder="Your Name"\
        />\
      )}\
      name="yourName" // Unique name for this field\
    />\
    {errors.yourName && <Text>{errors.yourName.message}</Text>}\
    Explain how render prop provides field object containing onChange, onBlur, value to connect to the TextInput.

-   Handling Submission: Show how to wrap the actual submission logic function (async (data) => {... }) with handleSubmit: <Button title="Submit" onPress={handleSubmit(onSubmitFunction)} />.125 Explain that handleSubmit prevents submission if validation fails and passes the validated form data object to onSubmitFunction.

-   Validation:

-   Built-in Rules: Demonstrate passing validation rules directly to the rules prop of the Controller component (e.g., { required: true, minLength: 5, pattern: /.../ }).125 Show how to provide custom error messages (e.g., { required: 'Username is mandatory' }).

-   Schema-Based Validation: Introduce this as a more robust and maintainable approach for complex forms. Explain the concept: define a validation schema using a library like Yup or (preferably, for better TypeScript integration and modern features) Zod. Install the corresponding resolver (e.g., npm install zod @hookform/resolvers/zod). Pass the resolver and schema to useForm:\
    TypeScript\
    import { zodResolver } from '@hookform/resolvers/zod';\
    import { z } from 'zod';

    const schema = z.object({\
      email: z.string().email('Invalid email address'),\
      password: z.string().min(8, 'Password must be at least 8 characters'),\
    });

    const { control, handleSubmit, formState: { errors } } = useForm({\
      resolver: zodResolver(schema),\
      mode: 'onBlur', // Or 'onChange', 'onSubmit'\
    });\
    Mentioning Yup 128 provides context, but focusing on Zod aligns better with the course's TypeScript mandate.

-   Displaying Errors: Show how to access the errors object from formState. The keys of the errors object correspond to the name prop of the Controller. Conditionally render error messages based on the presence of an error for a specific field (e.g., errors.email && <Text style={styles.error}>{errors.email.message}</Text>).125 Briefly touch upon accessibility best practices for associating errors with inputs.126

-   React Native Integration Example: Provide a complete code example for a typical login or registration form, demonstrating the use of useForm, Controller with TextInput, schema validation (e.g., with Zod), error display, and handling the handleSubmit process.

-   Instructional Notes: Strongly emphasize using the <Controller> component for integrating react-hook-form with React Native's controlled components, as this is the idiomatic approach. Provide clear, side-by-side code examples for setting up both built-in and schema-based validation. Include a lab exercise where participants build a multi-field registration form with various input types (TextInput for text, email, password) and implement validation using react-hook-form and a Zod schema.

### Module 9: Application State Management (Aligns with Topic 13: State Management)

-   Learning Objectives:

-   Differentiate between local, global, and server state.

-   Implement global state management using React Context API effectively, understanding its limitations.

-   Utilize Zustand for scalable and performant global state management.

-   Manage server state, caching, and synchronization using React Query (TanStack Query).

-   Choose the appropriate state management tool for different scenarios.

-   Content & Activities:

-   Types of State: Introduce the categorization of application state:

-   Local State: State confined to a single component or a small group of closely related components (e.g., input field values, toggle states). Typically managed with useState or useReducer.

-   Global State: State that needs to be accessed or modified by multiple components across different parts of the application tree (e.g., user authentication status, theme preferences, shopping cart contents).

-   Server Cache State: Data fetched from APIs that needs to be stored, synchronized, and potentially invalidated on the client. This includes managing loading states, errors, caching, and background updates.

-   Local State Review: Briefly recap useState and useReducer as the primary tools for managing local component state.

-   Global State with Context API:

-   Use Cases: Explain that Context API is well-suited for sharing low-frequency update global data like application themes, user authentication status, or locale/language settings, primarily to avoid prop drilling.110

-   Implementation: Demonstrate the three core parts:

1.  createContext(defaultValue): Creates the context object.

2.  <MyContext.Provider value={value}>: Wraps the part of the component tree that needs access to the context value. The value prop provides the data.110

3.  useContext(MyContext): Hook used within functional components to subscribe to context changes and access the current value.110

-   Best Practices: Advocate for creating multiple, smaller contexts focused on specific concerns (e.g., ThemeContext, AuthContext) rather than a single monolithic context.110 Centralize Provider components near the root of the relevant subtree.130

-   Pitfalls & Limitations: Critically discuss the main drawback: performance. When the value prop of a Provider changes, all components consuming that context via useContext will re-render, even if they only care about a small part of the value that didn't change.110 This makes Context unsuitable for high-frequency global state updates. Also, note that Context API itself doesn't provide advanced features like middleware or complex state derivation logic found in dedicated state management libraries.110 Avoid overusing Providers 130 and mutating context values directly.130

-   Global State with Zustand:

-   Introduction: Present Zustand as a small, fast, and scalable state management solution based on hooks. Highlight its simplicity and performance advantages over Context API for managing global state that updates frequently, due to its selective subscription mechanism.131

-   Setup: npm install zustand.

-   Creating a Store: Show the basic create function syntax for defining a store, which includes the initial state and action functions that modify the state:\
    TypeScript\
    import { create } from 'zustand';

    interface BearState {\
      bears: number;\
      increasePopulation: () => void;\
      removeAllBears: () => void;\
    }

    const useBearStore = create<BearState>((set) => ({\
      bears: 0,\
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\
      removeAllBears: () => set({ bears: 0 }),\
    }));\
    Explain the set function used within actions to update the state immutably.

-   Using the Store: Demonstrate how components access state and actions using the hook returned by create (useBearStore in the example). Introduce selectors for performance: const bears = useBearStore(state => state.bears);. Explain that selectors ensure the component only re-renders when the selected piece of state changes, preventing unnecessary updates.

-   Middleware: Briefly introduce common middleware:

-   persist: For automatically saving and rehydrating store state to/from storage (like AsyncStorage in React Native). Show basic setup.132

-   immer: For simplifying immutable updates by allowing "mutative" syntax within actions, handled correctly by Immer under the hood.131

-   Server State with React Query (TanStack Query):

-   Rationale: Explain that managing server state (API data) involves more than just fetching; it includes caching, background synchronization, handling stale data, retries on failure, pagination, infinite loading, etc..133 Position React Query as a specialized library that declaratively handles these complexities, separating server cache concerns from global client state.

-   Setup: npm install @tanstack/react-query. Explain the need to create a QueryClient instance and wrap the application root with <QueryClientProvider client={queryClient}>.

-   useQuery: The core hook for fetching, caching, and subscribing to data. Explain key options:

-   queryKey: An array uniquely identifying the data (e.g., ['todos'], ['todos', todoId]). Used for caching and dependency tracking.133 React Query automatically refetches when the key changes.

-   queryFn: The asynchronous function that fetches the data (must return a Promise).133

-   Returned State: Explain the useful properties returned: data (the fetched data), isLoading (initial fetch), isFetching (any fetch), isError, error, status ('pending', 'error', 'success').133

-   Caching & Stale Time: Explain cacheTime (how long data stays in cache after becoming inactive, default 5 mins) and staleTime (how long data is considered fresh before needing a background refetch, default 0).133 Understanding these is key to configuring caching behavior.

-   Refetching: Explain automatic refetching behaviors (refetchOnWindowFocus, refetchOnMount, refetchOnReconnect) and how to configure them.133 Mention React Native specific setup for online status and app focus refetching using onlineManager and focusManager.134

-   useMutation: The hook for performing data-modifying operations (POST, PUT, DELETE requests).133 Explain how to define the mutation function and use the returned mutate function to trigger it. Cover important callbacks like onSuccess (e.g., for invalidating related queries), onError (for error handling), and onMutate (for optimistic updates).

-   Query Invalidation: Explain how to use queryClient.invalidateQueries(['todos']) (often in onSuccess of a mutation) to mark data as stale and trigger refetches, ensuring the UI reflects server changes. Briefly mention optimistic updates as an advanced pattern.

-   Choosing the Right Tool: Provide guidance on selecting the appropriate state management approach:

-   Use Local State (useState/useReducer) for state confined to a single component.

-   Use Context API for low-frequency global state like themes or auth status, primarily to avoid prop drilling. Be mindful of performance implications.110

-   Use Zustand (or similar like Jotai) for more complex or frequently updated global client state where Context performance becomes an issue.

-   Use React Query (TanStack Query) for managing server cache state (API data), handling caching, synchronization, and mutations. Avoid putting server data directly into global client stores like Zustand or Context. This separation of concerns is a modern best practice.

-   Instructional Notes: Use clear diagrams to illustrate the different types of state and where each tool fits. Provide practical lab exercises: Implement theme switching using Context API. Create a simple shopping cart state (add/remove items, view count) using Zustand, potentially adding persistence with AsyncStorage. Fetch a list of items from a mock API using useQuery, display loading/error states, and implement a useMutation to add or delete an item, invalidating the list query on success.

IV. Course Blueprint: Advanced React Native Topics
--------------------------------------------------

This section delves into more advanced concepts crucial for building polished, performant, and deployable production applications.

### Module 10: Navigation and Routing (Aligns with Topic 11: Navigation)

-   Learning Objectives:

-   Implement stack, tab, and drawer navigation patterns using React Navigation primitives.

-   Set up and manage file-based routing using Expo Router.

-   Understand the relationship between Expo Router and React Navigation.

-   Pass parameters between screens and handle deep linking.

-   Configure headers, tab bars, and drawer styles.

-   Content & Activities:

-   Introduction to Mobile Navigation: Discuss common mobile navigation patterns (stack, tabs, drawer) and the need for a dedicated library in React Native (unlike native platforms which have built-in systems).79

-   React Navigation Fundamentals: Introduce React Navigation as the foundational community standard.135

-   Setup: Install core libraries (@react-navigation/native) and necessary dependencies (react-native-screens, react-native-safe-area-context) using npx expo install.135 For bare projects, also install react-native-gesture-handler and link pods.135 Wrap the app root in <NavigationContainer>.135

-   Stack Navigator (@react-navigation/native-stack or @react-navigation/stack): Explain the concept of pushing/popping screens onto a stack.136 Demonstrate creating a stack navigator (createNativeStackNavigator), defining screens (<Stack.Screen name="..." component={...} />), basic navigation (navigation.navigate('RouteName'), navigation.push('RouteName'), navigation.goBack()).135 Configure screen options (e.g., title, header styles).135

-   Tab Navigator (@react-navigation/bottom-tabs): Explain the tab bar pattern. Demonstrate creating a tab navigator (createBottomTabNavigator), defining tab screens, and configuring tab bar appearance (icons, labels).

-   Drawer Navigator (@react-navigation/drawer): Explain the side drawer pattern.137 Demonstrate creating a drawer navigator (createDrawerNavigator), defining drawer screens, and basic customization.

-   Nesting Navigators: Briefly explain how to nest navigators (e.g., a stack inside each tab).

-   Passing Parameters: Show how to pass parameters during navigation (navigation.navigate('Details', { itemId: 86 })) and how screens receive parameters (route.params).

-   Expo Router: Introduce Expo Router as a file-system-based routing layer built on top of React Navigation.66

-   Core Concepts (The "Rules"):

1.  Files in app/ directory become routes.66

2.  Each route has a URL (enables universal deep linking).66

3.  The first index.tsx matching / is the initial route.66

4.  Root app/_layout.tsx replaces App.js for setup/providers.66

5.  Non-route components live outside app/.66

6.  It uses React Navigation navigators under the hood.66

-   Layouts (_layout.tsx): Explain how _layout.tsx files within directories define the navigator for that segment (Stack, Tabs, Drawer, or Slot).66 Show examples:

-   Stack Layout: Export <Stack /> from expo-router.139 Files in the directory become screens in the stack.

-   Tabs Layout: Export <Tabs /> from expo-router.139 Files in the directory become tabs. Configure tabs using <Tabs.Screen options={...} />.

-   Slot Layout: Export <Slot /> for layouts without a specific navigator (e.g., adding headers/footers, modals).139

-   Navigation:

-   <Link href="/route">: Component for declarative navigation, similar to web <a> tags.71 Use asChild prop for custom components like <Pressable>.140

-   useRouter hook: Imperative navigation (router.push('/route'), router.replace('/route'), router.back(), router.navigate('/route') - navigate intelligently pushes or goes back).140

-   Relative paths (./, ../) are supported.140

-   Route Groups ((group-name)): Explain how directories named with parentheses organize routes without adding segments to the URL path (useful for organizing layouts, e.g., (tabs)).66

-   Dynamic Routes ([param].tsx, [...rest].tsx): Explain how to create routes that capture URL segments as parameters. Access parameters using useLocalSearchParams hook.

-   Deep Linking: Explain that Expo Router provides automatic deep linking based on the file structure.66 Discuss configuring URL schemes for native apps. Mention initialRouteName in layouts for handling deep link stack building.140

-   Redirects: Using the <Redirect href="/target" /> component.140

-   Expo Router vs React Navigation: Discuss the trade-offs.138 Expo Router offers file-based convenience, automatic deep linking, and tighter Expo integration, potentially feeling more intuitive for web developers. React Navigation offers more granular control, might be more familiar to existing RN developers, and is necessary if not using Expo or requiring highly complex custom navigation logic not easily mapped to files.138 Emphasize that Expo Router uses React Navigation.

-   Instructional Notes: Start with React Navigation basics as it underlies Expo Router. Provide clear file structure examples for Expo Router layouts. Lab: Implement a simple app with both stack and tab navigation using Expo Router. Include navigating between screens, passing parameters, and configuring basic header/tab options.

### Module 11: Performance and Debugging (Aligns with Topic 10: Performance and Debugging)

-   Learning Objectives:

-   Identify common performance bottlenecks in React Native applications.

-   Utilize React Native DevTools and platform-specific tools for debugging and profiling.

-   Apply techniques to optimize JavaScript thread performance (reducing re-renders).

-   Implement best practices for optimizing list rendering (FlatList/SectionList).

-   Optimize image loading and handling.

-   Understand the benefits of the Hermes engine.

-   Content & Activities:

-   Understanding Performance Bottlenecks:

-   JS Thread Overload: Explain that complex computations, excessive re-renders, and heavy logic on the single JavaScript thread can block it, leading to unresponsive UI and dropped frames (low JS FPS).33

-   UI Thread Overload: Complex native view hierarchies, heavy drawing operations, or too many simultaneous native animations can block the main UI thread (low UI FPS).105

-   Bridge Traffic (Legacy Architecture Context): Briefly mention that excessive data transfer between JS and Native was a bottleneck in the old architecture.38 JSI in the New Architecture mitigates this.39

-   Memory Issues: Large images, memory leaks (unreleased resources, uncleared timers/listeners), and inefficient data handling can lead to high memory usage and app crashes.38

-   Slow Initial Load (TTI - Time To Interactive): Large bundle sizes, synchronous operations during startup, and inefficient component loading contribute to slow app startup.38

-   Debugging Tools:

-   React Native DevTools (Built-in):

-   Accessing: Via Dev Menu ("Open DevTools") or j key in Metro terminal.145 Requires Hermes engine.145

-   Console Panel: Viewing logs (console.log, warnings, errors), evaluating JS expressions, filtering logs.146

-   Sources Panel: Viewing source code, setting breakpoints (debugger; statement or clicking line numbers), stepping through code execution, inspecting variables/scope/call stack.146

-   React Components Panel: Inspecting the component tree, viewing/editing props and state, highlighting component updates/re-renders.146

-   Profiler Panel: Recording and analyzing component render times and commit phases to identify performance bottlenecks in React rendering.

-   Memory Panel: Taking heap snapshots to analyze memory allocation and identify potential leaks.146

-   Dev Menu: Accessing (shake device or keyboard shortcuts).145 Key options: Reload, Open DevTools, Toggle Performance Monitor, Enable/Disable Fast Refresh.

-   LogBox: In-app display for errors and warnings during development.145 Fatal errors (syntax errors) are blocking; console errors/warnings appear as dismissible notifications.145 Can ignore specific logs.147

-   Performance Monitor Overlay: In-app overlay (toggled from Dev Menu) showing real-time FPS (UI and JS threads), RAM usage, View count.105 Useful for quick checks but less precise than dedicated profilers.145

-   Flipper (Mention as Legacy/Alternative): Briefly mention Flipper as a previous debugging tool, noting its deprecation for JS debugging in favor of the built-in DevTools in recent RN versions.147 It still offers valuable native inspection capabilities (layout, network, native logs, etc.).150

-   Native Platform Tools (Xcode & Android Studio): Essential for debugging native code (Modules/UI Components) and deep performance profiling (CPU, Memory, Network, System Traces).145 Briefly demonstrate how to launch the app in profile mode and use basic features like Android Studio Profiler (System Tracing) 148 or Xcode Instruments.

-   Performance Optimization Techniques:

-   Reducing Re-renders:

-   React.memo: Wrap functional components to prevent re-renders if props haven't changed (shallow comparison).

-   useCallback: Memoize callback functions passed as props to memoized children.93

-   useMemo: Memoize expensive calculations or object/array creations passed as props.93

-   Avoid inline functions/objects in props: These create new references on every render, breaking memoization.101

-   Optimize state structure: Avoid overly large state objects where unrelated changes trigger updates for components consuming only a part of the state. Use selectors with state management libraries (like Zustand).

-   why-did-you-render library: Introduce as a tool to detect potentially unnecessary component re-renders during development. Setup: install (@welldone-software/why-did-you-render), create wdyr.js file, import it first in entry point (index.js), enable tracking (Component.whyDidYouRender = true or trackAllPureComponents: true).151 Emphasize it's for development only.152

-   List Optimization (FlatList/SectionList):

-   Use keyExtractor correctly (stable, unique keys).

-   Implement getItemLayout: Provide item height/offset to skip layout calculations, significantly improving performance, especially for lists with fixed-height items.105

-   Tune initialNumToRender, maxToRenderPerBatch, windowSize: Control how many items are rendered initially and in subsequent batches during scrolling. Experiment to find optimal values.

-   Use simple components for list items: Avoid complex logic or heavy nesting within renderItem.

-   Memoize list items (React.memo).

-   Consider alternatives like FlashList from Shopify for potentially better performance in some scenarios.105

-   Image Optimization:

-   Resize images appropriately: Serve images sized for the display context, don't rely on React Native to downscale huge images.38

-   Use efficient formats: Prefer WebP for better compression and quality over JPEG/PNG.101

-   Use caching libraries: Libraries like react-native-fast-image can handle caching, improving load times and reducing network requests.38

-   Consider lazy loading images.38

-   Hermes Engine: Explain that Hermes is an open-source JavaScript engine optimized for React Native.34 Benefits include faster app startup time (TTI), reduced memory usage, and smaller app size compared to JavaScriptCore.34 Hermes is the default engine in newer React Native versions and required for React Native DevTools.145

-   Bundle Size Analysis: Briefly mention tools (like react-native-bundle-visualizer) to analyze the JavaScript bundle size and identify large dependencies, enabling code splitting or dependency optimization.144

-   Native Module Performance: If using custom native modules, ensure they are efficient and don't block the UI thread. Consider offloading heavy work to background threads.105

-   Instructional Notes: Provide practical demonstrations of using React Native DevTools (Profiler, Components panel highlighting updates). Include labs: Profile a component with unnecessary re-renders and optimize it using React.memo and useCallback. Optimize a poorly performing FlatList by implementing getItemLayout and memoizing items. Use why-did-you-render to identify unexpected re-renders.

### Module 12: Native Modules (Aligns with Topic 14: Native Modules)

-   Learning Objectives:

-   Understand when and why to create custom native modules.

-   Create a basic native module for iOS using Swift.

-   Create a basic native module for Android using Kotlin.

-   Call native module methods from JavaScript and handle callbacks/promises.

-   Understand the role of JSI and Turbo Modules in modern native module development (conceptual).

-   Content & Activities:

-   Why Native Modules?: Explain the scenarios requiring native modules: accessing platform-specific APIs not exposed by React Native (e.g., specialized hardware, OS features), reusing existing native code (Java/Kotlin/Swift/Objective-C), performance-critical computations unsuitable for the JS thread.154

-   Conceptual Overview (New Architecture):

-   Briefly revisit JSI as the direct communication layer.36

-   Introduce Turbo Modules as the new standard for native modules in the New Architecture.33 Explain key benefits enabled by JSI:

-   Lazy Loading: Modules are loaded only when first accessed by JS, improving app startup time compared to the old architecture where all modules initialized upfront.33

-   Type Safety: Use of typed specifications (TypeScript/Flow) with Codegen ensures type consistency between JS and native.33

-   Less Overhead: Direct JSI calls avoid bridge serialization overhead.33

-   Synchronous Access (Optional): JSI allows for synchronous function calls if needed, although async is still common.33

-   Introduce Codegen as the tool that automatically generates boilerplate interface code (C++, Java, Objective-C) from the JavaScript specification, simplifying the integration.33

-   Creating a Native Module (iOS - Swift): Provide a step-by-step guide (simplified example, e.g., a module to get device name or perform a simple calculation).

1.  Project Setup: Open the ios/<ProjectName>.xcworkspace in Xcode.154

2.  Create Swift File: Create a new Swift file (e.g., MyNativeModule.swift).154

3.  Create Bridging Header: Accept Xcode's prompt to create the Objective-C bridging header (<ProjectName>-Bridging-Header.h). This is crucial for Swift/Objective-C interop.154

4.  Implement Swift Class: Define a class inheriting from NSObject. Use @objc(ClassName) to expose it to Objective-C. Implement methods using @objc func. Use RCTResponseSenderBlock for callbacks or resolve/reject for Promises.154 Include requiresMainQueueSetup().154\
    Swift\
    // MyNativeModule.swift\
    import Foundation\
    import React

    @objc(MyNativeModule)\
    class MyNativeModule: NSObject {

      @objc // Example method with callback\
      func performAction(_ name: String, callback: @escaping RCTResponseSenderBlock) {\
        let result = "Hello, \(name)!"\
        callback() // First arg is error (null if none)\
      }

      // Example method with Promise\
      @objc\
      func performActionAsync(_ name: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {\
          // Simulate async work\
          DispatchQueue.global().async {\
              let result = "Hello async, \(name)!"\
              resolve(result)\
              // Or reject("ERROR_CODE", "Error message", nil)\
          }\
      }

      @objc\
      static func requiresMainQueueSetup() -> Bool {\
        return false // Typically false unless UI work needed in init\
      }\
    }

5.  Expose Module (Objective-C): Create an Objective-C .m file (e.g., MyNativeModule.m). Use RCT_EXTERN_MODULE to register the Swift class and RCT_EXTERN_METHOD to expose its methods to React Native.154 Ensure method signatures match Swift, including parameter labels (_ for first param often).\
    Objective-C\
    // MyNativeModule.m\
    #import <React/RCTBridgeModule.h>\
    #import <React/RCTEventEmitter.h> // If using events

    @interface RCT_EXTERN_MODULE(MyNativeModule, NSObject)

    RCT_EXTERN_METHOD(performAction:(NSString *)name callback:(RCTResponseSenderBlock)callback)

    RCT_EXTERN_METHOD(performActionAsync:(NSString *)name\
                      resolve:(RCTPromiseResolveBlock)resolve\
                      reject:(RCTPromiseRejectBlock)reject)

    @end

-   Creating a Native Module (Android - Kotlin): Provide a parallel step-by-step guide.

1.  Project Setup: Open the android folder in Android Studio.

2.  Create Kotlin Package: Create a new Kotlin file (e.g., MyNativePackage.kt). Implement ReactPackage. Override createNativeModules and createViewManagers. In createNativeModules, return a list containing an instance of the module class.156\
    Kotlin\
    // MyNativePackage.kt\
    package com.myreactnativeapp // Use your app's package name

    import com.facebook.react.ReactPackage\
    import com.facebook.react.bridge.NativeModule\
    import com.facebook.react.bridge.ReactApplicationContext\
    import com.facebook.react.uimanager.ViewManager\
    import java.util.Collections

    class MyNativePackage : ReactPackage {\
        override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {\
            return listOf(MyNativeModule(reactContext))\
        }

        override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {\
            return Collections.emptyList() // No UI components in this example\
        }\
    }

3.  Create Kotlin Module: Create the module file (e.g., MyNativeModule.kt). Inherit from ReactContextBaseJavaModule. Implement getName() (must match JS import name). Use @ReactMethod annotation for methods exposed to JS. Use Callback for callbacks or Promise for async methods.156\
    Kotlin\
    // MyNativeModule.kt\
    package com.myreactnativeapp

    import com.facebook.react.bridge.ReactApplicationContext\
    import com.facebook.react.bridge.ReactContextBaseJavaModule\
    import com.facebook.react.bridge.ReactMethod\
    import com.facebook.react.bridge.Callback\
    import com.facebook.react.bridge.Promise

    class MyNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

        override fun getName() = "MyNativeModule" // Name used in JS

        @ReactMethod // Expose method to JS\
        fun performAction(name: String, callback: Callback) {\
            val result = "Hello, $name!"\
            callback.invoke(null, result) // First arg is error (null if none)\
        }

        @ReactMethod\
        fun performActionAsync(name: String, promise: Promise) {\
            try {\
                // Simulate async work (use coroutines or threads in real apps)\
                val result = "Hello async, $name!"\
                promise.resolve(result)\
            } catch (e: Exception) {\
                promise.reject("ERROR_CODE", "Error message", e)\
            }\
        }\
    }

4.  Register Package: In MainApplication.kt (or .java), find the getPackages() method. Add an instance of MyNativePackage to the list returned by this method.156

-   Using the Native Module in JavaScript:

-   Import NativeModules from react-native.

-   Access the module: const { MyNativeModule } = NativeModules;.

-   Call methods: MyNativeModule.performAction('World', (error, result) => {... }); or const result = await MyNativeModule.performActionAsync('World');.154

-   Turbo Module Specifics (Brief Mention): Explain that for Turbo Modules, the process involves defining a typed JS spec (.ts or .js) 44, configuring Codegen to generate scaffolding 44, and then implementing the native logic in C++ (for cross-platform logic) or platform-specific languages (Kotlin/Swift) that conform to the generated interfaces.44 Direct users to official New Architecture docs for full Turbo Module creation guides.

-   Instructional Notes: Focus on the practical steps for creating a simple module for both platforms using the traditional bridge mechanism first, as it's conceptually simpler and still relevant. Clearly explain the role of the bridging header (iOS) and the package registration (Android). Use consistent naming (MyNativeModule) across examples. Provide the full code snippets for each file involved. Lab: Create a simple native module on both iOS and Android that returns a device constant (e.g., device name or OS version) and call it from JS.

### Module 13: EAS and Publishing (Aligns with Topic 15: EAS and Publishing)

-   Learning Objectives:

-   Explain the purpose and benefits of Expo Application Services (EAS).

-   Configure EAS Build using eas.json profiles for development, preview, and production.

-   Build application binaries (.apk,.aab,.ipa) using EAS Build.

-   Configure EAS Submit for deploying builds to app stores.

-   Submit builds to TestFlight/Internal Testing and production app stores (App Store Connect, Google Play Console).

-   Content & Activities:

-   Introduction to EAS: Explain Expo Application Services (EAS) as a suite of cloud services for React Native developers, extending beyond the capabilities of the classic Expo managed workflow. Highlight key services:

-   EAS Build: Cloud build service for generating native binaries (.apk, .aab, .ipa) for apps, including those with custom native code or specific configurations not supported by Expo Go.68

-   EAS Submit: Service for uploading builds to the Apple App Store and Google Play Store directly from the command line or CI/CD.69

-   EAS Update: Service for deploying Over-the-Air (OTA) updates (JavaScript and assets) to users without requiring a new store submission.

-   EAS CLI Setup:

-   Installation: npm install -g eas-cli.157

-   Login: eas login to authenticate with Expo account.157

-   Project Initialization: eas init (if not already configured) to link the project to an Expo account/organization.68

-   EAS Build Configuration (eas.json):

-   Explain the structure of eas.json and the concept of build profiles (e.g., development, preview, production).68

-   Common profile properties:

-   extends: Inherit configuration from another profile.69

-   developmentClient: Set to true for creating development builds (custom clients like Expo Go but with native code).67

-   distribution: 'store' (for App Store/Play Store) or 'internal' (for ad-hoc sharing via download link).67

-   channel: For targeting EAS Updates.

-   env: Define build-time environment variables (non-sensitive).67

-   credentialsSource: 'remote' (use EAS managed credentials - default) or 'local' (manage credentials manually).69

-   autoIncrement: Automatically increment build numbers/version codes (true, buildNumber, versionCode, version).67

-   Platform-specific configurations (ios, android):

-   image: Specify build worker image.

-   simulator: true to build for iOS simulator.69

-   buildType: 'apk' or 'app-bundle' for Android.69

-   gradleCommand, ndk, etc. (Android).

-   scheme, buildConfiguration, etc. (iOS).69

-   Example eas.json with typical profiles.

-   Running Builds:

-   Command: eas build --platform <ios|android> --profile <profile_name>.68

-   Example: eas build --platform android --profile production.158

-   Example: eas build --platform ios --profile preview --auto-submit (build and submit automatically).157

-   Local builds: eas build --platform <...> --profile <...> --local (builds on your machine using EAS CLI, still requires EAS account).158

-   Monitoring builds via the EAS website dashboard. Downloading artifacts (.apk, .aab, .ipa).

-   EAS Submit Configuration (eas.json):

-   Explain the submit key in eas.json with profiles (e.g., production).69

-   Android Configuration: serviceAccountKeyPath (path to Google Service Account JSON key) 158, track (internal, alpha, beta, production), releaseStatus (completed, draft, halted), changesNotSentForReview.158

-   iOS Configuration: appleId, ascAppId (App Store Connect App ID) 157, appleTeamId, API Key details (ascApiKeyPath, ascApiKeyId, ascApiKeyIssuerId) or App Specific Password (EXPO_APPLE_APP_SPECIFIC_PASSWORD env var).157 language, companyName.

-   App Store Connect Setup (iOS):

-   Apple Developer Account required.157

-   Create App ID (Bundle Identifier) in Developer Portal.

-   Create App Record in App Store Connect (Name, Bundle ID, SKU).157

-   Set up App Store Connect API Key for EAS Submit (recommended) or use App Specific Password.157

-   Fill out required app information (privacy, pricing, description, screenshots).

-   Google Play Console Setup (Android):

-   Google Play Developer Account required (fee, verification process).158

-   Create App in Play Console.158

-   Create Google Service Account with appropriate permissions (Service Account User, potentially others) and download JSON key.158 Link service account in Play Console API access settings.

-   Fill out required store listing information, content rating, privacy policy.

-   Important: Upload the first build (APK or AAB) manually to a track (e.g., Internal Testing) via Play Console before EAS Submit can work for subsequent uploads.158

-   Running Submissions:

-   Command: eas submit --platform <ios|android> --profile <profile_name>.157 Can also specify build ID or path to artifact.

-   EAS CLI guides through selecting build, providing credentials (if not configured in eas.json), and confirming submission details.159

-   Submitting to TestFlight (iOS): Select build, submit for review (if needed for external testers). Add internal/external testers in App Store Connect.159

-   Submitting to Google Play Tracks (Android): Choose track (internal, alpha, beta, production). Manage testers in Play Console.160

-   Promoting builds through testing tracks to production.

-   Instructional Notes: Use screenshots for App Store Connect and Google Play Console setup steps. Provide example eas.json configurations. Lab: Configure eas.json with development and production profiles. Perform an EAS build for internal distribution (distribution: 'internal'). Configure EAS Submit (using mock credentials/placeholders if necessary). Discuss the manual first upload requirement for Android.

### Module 14: Advanced Features (Aligns with Topic 16: Advanced Features)

-   Learning Objectives:

-   Implement basic animations using the core Animated API.

-   Perform simple layout animations using LayoutAnimation.

-   Introduce react-native-reanimated for more complex and performant animations.

-   Explore other advanced topics relevant to production apps (e.g., gestures, push notifications - brief overview).

-   Content & Activities:

-   Core Animated API:

-   Introduction: Built-in API for declarative animations.163

-   Core Concepts: Animated.Value (or useAnimatedValue hook) to hold the animated value 163, mapping values to style properties (e.g., opacity, transform) in an Animated.View (or other Animated. component).163

-   Animation Types:

-   Animated.timing(): Animates a value over a specified duration using an easing function (e.g., Easing.linear, Easing.ease, Easing.bounce).163 Key config: toValue, duration, easing, delay, useNativeDriver.163

-   Animated.spring(): Creates a physics-based spring animation.163 Key config: toValue, friction, tension, speed, bounciness, useNativeDriver.163

-   Animated.decay(): Animates from an initial velocity, gradually slowing to a stop.163 Key config: velocity, deceleration, useNativeDriver.163

-   Starting Animations: animation.start(callback).163 Callback receives { finished: boolean }.

-   Composing Animations: Animated.sequence(), Animated.parallel(), Animated.stagger(), Animated.delay() to combine multiple animations.164

-   useNativeDriver: true: Crucial for performance. Explain that this sends the animation definition to the native side, allowing the animation to run entirely on the UI thread without involving the JS thread, resulting in smoother animations, especially during JS thread contention.163 Note limitations: only works for non-layout properties (e.g., opacity, transform), not width, height, top, left, etc.

-   Interpolation (value.interpolate()): Mapping an animated value's range to another range (e.g., 0-1 to 0-100, or 0-1 to '0deg'-'360deg').165

-   LayoutAnimation API:

-   Purpose: Simple API for animating layout changes (position, size) automatically when state updates cause components to re-render in different positions or sizes.166 Animates all layout changes in the next render cycle.

-   Setup (Android): Requires enabling via UIManager.setLayoutAnimationEnabledExperimental(true).166

-   Usage: Call LayoutAnimation.configureNext(config) before the state change that triggers the layout update.166

-   Configuration: Use presets (LayoutAnimation.Presets.linear, .easeInEaseOut, .spring) 166 or create a custom config object specifying duration and animation types (create, update, delete) with properties (opacity, scaleXY).166

-   Limitations: Less granular control than Animated or Reanimated. Animates everything that changes layout. Can sometimes have unexpected results.

-   Introduction to react-native-reanimated:

-   Why Reanimated?: Addresses limitations of Animated (especially performance for complex gestures and animations not supported by native driver). Allows running animation logic directly on the UI thread using Worklets (JS functions executed synchronously on the UI thread).168 Provides more control and better performance for complex animations and gesture interactions.

-   Setup: Installation (npm install react-native-reanimated), add Babel plugin (plugins: ['react-native-reanimated/plugin'] in babel.config.js). Requires rebuilding the native app (or using a dev build).

-   Core Concepts (v2/v3):

-   Shared Values (useSharedValue): Reactive state containers similar to Animated.Value but designed for Reanimated. Updates trigger connected worklets.168 Access/modify via .value.

-   useAnimatedStyle: Hook that defines styles based on shared values. The style-generating function runs as a worklet on the UI thread.168

-   Animation Functions: withTiming(), withSpring(), withDecay(), withRepeat() used to update shared values with animations.168

-   Animated.View (and other components): Apply styles generated by useAnimatedStyle to these components.

-   useAnimatedProps: Similar to useAnimatedStyle but for non-style props (e.g., SVG path data).169

-   Layout Animations (Reanimated): Mention Reanimated's own powerful Layout Animation API as a more flexible alternative to LayoutAnimation (e.g., Entering, Exiting, Layout props on Animated components).167

-   Introduction to react-native-gesture-handler:

-   Purpose: Provides a more robust and performant way to handle complex touch gestures (pan, pinch, rotate, tap) compared to the basic Responder System. Works seamlessly with react-native-reanimated for gesture-driven animations.171

-   Setup: Installation (npm install react-native-gesture-handler), wrap app root in <GestureHandlerRootView>.172 Link pods for bare RN.

-   Core Concepts: Gesture objects (e.g., Gesture.Pan(), Gesture.Tap()), <GestureDetector> component to attach gestures, event callbacks (onUpdate, onStart, onEnd).171 Using gesture event data (e.g., event.translationX) with Reanimated shared values.172

-   Other Advanced Topics (Brief Overview):

-   Push Notifications: Mention Expo's expo-notifications module for handling push notifications.

-   Background Tasks: Briefly discuss limitations and libraries like react-native-background-fetch or Expo's expo-task-manager.

-   WebSockets: Mention built-in support.100

-   Working with Device Hardware (Camera, Location, etc.): Point to relevant Expo modules (expo-camera, expo-location).

-   Instructional Notes: Focus labs on the core Animated API first (timing, spring, interpolation, native driver). Introduce LayoutAnimation with a simple example. Provide a basic react-native-reanimated + react-native-gesture-handler example (e.g., dragging a box) to showcase the power and setup, directing learners to official docs for deeper dives. Keep the "Other Topics" section brief, pointing towards relevant libraries/modules.

V. Conclusion
-------------

This course structure provides a comprehensive roadmap for transforming proficient native or web developers into skilled, production-ready React Native engineers. By grounding the curriculum in established instructional design principles like the ADDIE model 1 and adhering to clear technical communication standards 15, the course aims for maximum effectiveness and knowledge retention.

The modular progression begins with foundational context, including the evolution of mobile development 23 and the rationale behind React Native's modern architecture centered on JSI, Fabric, and Turbo Modules.33 Essential environment setup using Expo and the iOS simulator is covered in detail, with a strong emphasis on correct dependency management (npx expo install 57) and systematic troubleshooting.48

Core JavaScript (ES6+) 82 and TypeScript 86 fundamentals are established early, providing the necessary language proficiency and the benefits of static typing crucial for large-scale application development. React fundamentals are then introduced, carefully mapping concepts like components, props, state (useState), and effects (useEffect) to paradigms familiar to native and Angular developers 79, easing the transition to React's declarative model.

Subsequent modules delve into the practical application of React Native, covering Core Components 72, advanced hooks (useRef, useReducer, useCallback, useMemo) 93, custom hook creation 112, and diverse styling strategies (StyleSheet, Flexbox, styled-components, react-native-paper).70 Form handling is addressed using react-hook-form 125, and modern state management techniques are explored, advocating for a layered approach using Context API, Zustand, and React Query (TanStack Query) based on the type of state being managed.110

Finally, the course covers essential production concerns, including navigation (React Navigation primitives and Expo Router file-based routing) 66, performance optimization and debugging using tools like React Native DevTools 105, creating native modules for platform-specific needs 44, building and submitting applications using EAS Build and Submit 69, and advanced features like animations (Animated, LayoutAnimation, react-native-reanimated).163

By systematically covering these topics with a focus on best practices, modern tooling, and the underlying architectural principles, this course structure is designed to equip participants with the comprehensive skills and deep understanding required to excel in professional React Native development.

#### Works cited

1.  ADDIE Model - Information Technology - UW Bothell, accessed April 24, 2025, <https://www.uwb.edu/it/addie>

2.  ADDIE: 5 Steps To Effective Training Courses | LearnUpon, accessed April 24, 2025, <https://www.learnupon.com/blog/addie-5-steps/>

3.  The ADDIE Model for Instructional Design Explained - ATD, accessed April 24, 2025, <https://www.td.org/content/newsletter/all-about-addie>

4.  What is ADDIE? Your Complete Guide to the ADDIE Model - ELM Learning, accessed April 24, 2025, <https://elmlearning.com/hub/instructional-design/addie-model/>

5.  The ADDIE Model Explained: Evolution, Steps, and Applications for 2025 - Research.com, accessed April 24, 2025, <https://research.com/education/the-addie-model>

6.  ADDIE Model Explained: All You Need to Know [+ FREE Template] - AIHR, accessed April 24, 2025, <https://www.aihr.com/blog/addie-model/>

7.  The ADDIE Learning Model for Instructional Designers - Digital Learning Institute, accessed April 24, 2025, <https://www.digitallearninginstitute.com/blog/the-digital-learning-design-process-addie-model-for-instructional-design>

8.  The Key Principles of Instructional Design (2025) - Devlin Peck, accessed April 24, 2025, <https://www.devlinpeck.com/content/principles-of-instructional-design>

9.  Instructional Design Basics and Best Practices - WorkRamp, accessed April 24, 2025, <https://www.workramp.com/blog/instructional-design-basics/>

10. The Ultimate Guide to Instructional Design | Moodle, accessed April 24, 2025, <https://moodle.com/us/news/guide-to-instructional-design/>

11. Mastering Instructional Design: 5 Essential Dos and Don'ts for Instructional Designers - Custom Learning and Development Solutions - ttcInnovations, accessed April 24, 2025, <https://ttcinnovations.com/mastering-instructional-design-five-essential-dos-and-donts-for-instructional-designers/>

12. What Is Instructional Design? Process, Best Practices, Trends - Whatfix, accessed April 24, 2025, <https://whatfix.com/blog/simplify-instructional-design-process/>

13. Instructional Design Best Practices - SkillSource Learning Partners, accessed April 24, 2025, <https://skillsourcelearning.com/instructional-design-best-practices>

14. The Must-Have Instructional Design Skills for 2023 - Digital Learning Institute, accessed April 24, 2025, <https://www.digitallearninginstitute.com/blog/the-must-have-instructional-design-skills-for-2023>

15. Microsoft Learn style guide - Quick start - Contributor guide, accessed April 24, 2025, <https://learn.microsoft.com/en-us/contribute/content/style-quick-start>

16. Welcome - Microsoft Writing Style Guide, accessed April 24, 2025, <https://learn.microsoft.com/en-us/style-guide/welcome/>

17. Microsoft Manual of Style - Wikipedia, accessed April 24, 2025, <https://en.wikipedia.org/wiki/Microsoft_Manual_of_Style>

18. Microsoft Writing Style Guide: A new guide for technical communication | Ken Cenerelli, accessed April 24, 2025, <https://kencenerelli.wordpress.com/2018/02/25/microsoft-writing-style-guide-a-new-guide-for-technical-communication/>

19. Writing tips - Microsoft Style Guide, accessed April 24, 2025, <https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips>

20. Writing step-by-step instructions - Microsoft Style Guide, accessed April 24, 2025, <https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions>

21. Reference documentation - Microsoft Style Guide, accessed April 24, 2025, <https://learn.microsoft.com/en-us/style-guide/developer-content/reference-documentation>

22. Microsoft Manual of Style, Fourth Edition eBook - Jason Hall, accessed April 24, 2025, <http://jasonhall.ca/wp-content/uploads/2015/08/Microsoft.Press_.Microsoft.Manual.of_.Style_.4th.Edition.Jan_.2012.pdf>

23. History of mobile phones | What was the first mobile phone? - Uswitch, accessed April 24, 2025, <https://www.uswitch.com/mobiles/guides/history-of-mobile-phones/>

24. 1\. A Brief History of Mobile - Mobile Design and Development [Book] - O'Reilly, accessed April 24, 2025, <https://www.oreilly.com/library/view/mobile-design-and/9780596806231/ch01.html>

25. History of Mobile Applications, accessed April 24, 2025, <https://www.uky.edu/~jclark/mas490apps/History%20of%20Mobile%20Apps.pdf>

26. Mobile Development - Course Websites, accessed April 24, 2025, <https://courses.grainger.illinois.edu/cs222/sp2023/07.%20Mobile%20Development.pdf>

27. A Brief History of Mobile Apps | Capitol Technology University, accessed April 24, 2025, <https://www.captechu.edu/blog/brief-history-of-mobile-apps>

28. The History of Mobile Apps and Evolution of Mobile Platforms - Webandcrafts, accessed April 24, 2025, <https://webandcrafts.com/blog/history-of-mobile-apps>

29. A History of Mobile Application Development - Sales Pipe Pro, accessed April 24, 2025, <https://spp.dev/blog/a-history-of-mobile-application-development/>

30. A Brief History of Mobile Apps - BoardActive, accessed April 24, 2025, <https://www.boardactive.com/post/a-brief-history-of-mobile-apps>

31. Mobile app development - Wikipedia, accessed April 24, 2025, <https://en.wikipedia.org/wiki/Mobile_app_development>

32. A Brief History of Mobile Apps - Blog - V-Soft Consulting, accessed April 24, 2025, <https://blog.vsoftconsulting.com/blog/a-brief-history-of-mobile-apps/>

33. Experiment With the New Architecture of React Native | {callstack}, accessed April 24, 2025, <https://www.callstack.com/blog/experiment-with-new-architecture-of-react-native>

34. React Native's New Architecture explained like I'm 10, accessed April 24, 2025, <https://news.notjust.dev/posts/react-native-s-new-architecture-explained-like-i-m-10>

35. React Native New Architecture - Neha Sharma, accessed April 24, 2025, <https://nehasharma.dev/posts/react-native-new-architecure>

36. React Native --- Ultimate Guide on New Architecture in depth - GitHub, accessed April 24, 2025, <https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md>

37. Leveraging React Native JSI to enhance speed and performance - LogRocket Blog, accessed April 24, 2025, <https://blog.logrocket.com/leveraging-react-native-jsi-enhance-speed-performance/>

38. Optimizing the Performance of React Native apps: Techniques & Best practices, accessed April 24, 2025, <https://www.techaheadcorp.com/blog/optimizing-the-performance-of-react-native-apps-techniques-best-practices/>

39. About the New Architecture - React Native, accessed April 24, 2025, <https://reactnative.dev/architecture/landing-page>

40. The New React Native Architecture - DEV Community, accessed April 24, 2025, <https://dev.to/joaoalissonsilva/the-new-react-native-architecture-1jn9>

41. React Native JSI: Part 1 - Getting Started - Notesnook Blog, accessed April 24, 2025, <https://blog.notesnook.com/getting-started-react-native-jsi/>

42. How does libraries that use JSI work in "regular" react native projects : r/reactnative - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/reactnative/comments/17wun6t/how_does_libraries_that_use_jsi_work_in_regular/>

43. React Native New Architecture, JSI, Native Modules & Rust with Oscar Franco - YouTube, accessed April 24, 2025, <https://www.youtube.com/watch?v=yZFu8CdhHVg>

44. react-native-new-architecture/docs/turbo-modules.md at main - GitHub, accessed April 24, 2025, <https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules.md>

45. Build a custom React Native Turbo Module for Android - LogRocket Blog, accessed April 24, 2025, <https://blog.logrocket.com/build-custom-react-native-turbo-module-android/>

46. Create your first app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/tutorial/create-your-first-app/>

47. Create a project - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/get-started/create-a-project/>

48. iOS Simulator - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/workflow/ios-simulator/>

49. Installing Xcode and Simulators | Apple Developer Documentation, accessed April 24, 2025, <https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators>

50. Issue with opening IOS Simulator | Apple Developer Forums, accessed April 24, 2025, <https://developer.apple.com/forums/thread/678469>

51. create-expo-app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/more/create-expo>

52. create-expo-app - NPM, accessed April 24, 2025, <https://www.npmjs.com/package/create-expo-app>

53. all available create-expo-app templates & versions? - Stack Overflow, accessed April 24, 2025, <https://stackoverflow.com/questions/78262576/all-available-create-expo-app-templates-versions>

54. expo-template-default/README.md at main - GitHub, accessed April 24, 2025, <https://github.com/expo/expo-template-default/blob/main/README.md>

55. expo/expo-template-default: ⚠️ This is a mirror template repository for the new Expo default project template. Contributions and bug reports should be made in expo/expo repository. - GitHub, accessed April 24, 2025, <https://github.com/expo/expo-template-default>

56. Set up your environment - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated>

57. Why You Should Use "npx expo install" instead of "npm install" in ..., accessed April 24, 2025, <https://medium.com/@huzaifaqureshi037/exwhy-you-should-use-npx-expo-install-instead-of-npm-install-in-expo-react-native-app-07d6156f064a>

58. New React Native / Expo templates not working - multiple errors #8727 | Support | ABP.IO, accessed April 24, 2025, <https://abp.io/support/questions/8727/New-React-Native--Expo-templates-not-working---multiple-errors>

59. "ERESOLVE unable to resolve dependency tree" when going from 50 to 51 : r/expo - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/expo/comments/1j9nsmy/eresolve_unable_to_resolve_dependency_tree_when/>

60. --force or --legacy-peer-deps? : r/nextjs - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/nextjs/comments/1hflgi6/force_or_legacypeerdeps/>

61. Expo APK build fails: Dependency conflict between react and react-native versions - NPM, accessed April 24, 2025, <https://community.latenode.com/t/expo-apk-build-fails-dependency-conflict-between-react-and-react-native-versions/10053>

62. Delete Node Modules Like a PRO - Tutorend, accessed April 24, 2025, <https://tutorend.com/tutorials/delete-node-modules-like-a-pro>

63. node.js - Expo React Native - Adding node_modules/react-native/cli.js. node_modules/react-native already exists in the file map as a file - Stack Overflow, accessed April 24, 2025, <https://stackoverflow.com/questions/79192568/expo-react-native-adding-node-modules-react-native-cli-js-node-modules-react>

64. Exp not seeing latest packages (since upgrade to metro bundler) - Issue #1656 - GitHub, accessed April 24, 2025, <https://github.com/expo/expo/issues/1656>

65. Troubleshooting - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/router/reference/troubleshooting/>

66. Core concepts of file-based routing - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/router/basics/core-concepts/>

67. Solution for Using Environment Variables in Expo with EAS Build - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/expo/comments/1feh09e/solution_for_using_environment_variables_in_expo/>

68. expo/eas-custom-builds-example - GitHub, accessed April 24, 2025, <https://github.com/expo/eas-custom-builds-example>

69. Configuration with eas.json - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/eas/json/>

70. Getting Started | React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/docs/guides/getting-started/>

71. File Based Routing with Expo Router - This Dot Labs, accessed April 24, 2025, <https://www.thisdot.co/blog/file-based-routing-with-expo-router>

72. Core Components and Native Components - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/intro-react-native-components>

73. React Native styling tutorial with examples - LogRocket Blog, accessed April 24, 2025, <https://blog.logrocket.com/react-native-styling-tutorial-examples/>

74. Style - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/style>

75. Styling in React Native: A Guide to CSS-in-JS and Design Principles - 4way Technologies, accessed April 24, 2025, <https://www.4waytechnologies.com/blog/styling-in-react-native-a-guide-to-css-in-js-and-design-principles>

76. React Native Styling: Best Practices and Techniques - Owlbuddy, accessed April 24, 2025, <https://owlbuddy.com/react-native-styling/>

77. React Native Button Style: Tips and Best Practices - André Adams, accessed April 24, 2025, <https://andreadams.com.br/react-native-button-style-tips-and-best-practices/>

78. How To Use Styling in React Native Apps - DigitalOcean, accessed April 24, 2025, <https://www.digitalocean.com/community/tutorials/react-styling-react-native>

79. An Android developer's guide to React Native, accessed April 24, 2025, <https://developer.amazon.com/apps-and-games/blogs/2025/04/react-native-for-android-developers>

80. Usage of !important in React Native - Stack Overflow, accessed April 24, 2025, <https://stackoverflow.com/questions/55379943/usage-of-important-in-react-native>

81. Is knowing CSS really well(advanced knowledge) can help with React Native styling (stylesheet) ? : r/reactnative - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/reactnative/comments/135gayo/is_knowing_css_really_welladvanced_knowledge_can/>

82. Top 12 JavaScript Concepts to Know Before Learning React - GeeksforGeeks, accessed April 24, 2025, <https://www.geeksforgeeks.org/top-javascript-concepts-to-know-before-learning-react/>

83. 6 essential skills for React JS web developers - Pluralsight, accessed April 24, 2025, <https://www.pluralsight.com/resources/blog/software-development/6-essential-skills-for-react-web-developers>

84. Essential Javascript for React That Every Developer Should Know - Altimetrik, accessed April 24, 2025, <https://www.altimetrik.com/blog/essential-javascript-for-react>

85. Javascript Essentials For React Native App Developers - TechAhead, accessed April 24, 2025, <https://www.techaheadcorp.com/blog/javascript-essentials-react-native-app-developers/>

86. React Native With TypeScript: Everything You Need To Know - Hidden Brains, accessed April 24, 2025, <https://www.hiddenbrains.com/blog/react-native-with-typescript.html>

87. Building Mobile Apps with TypeScript and React Native - CloudDevs, accessed April 24, 2025, <https://clouddevs.com/typescript/building-mobile-apps-with-react-native/>

88. Advanced TypeScript Concepts for React Developers with Real-World Examples - DhiWise, accessed April 24, 2025, <https://www.dhiwise.com/post/advanced-typescript-concepts>

89. Core React Concepts, accessed April 24, 2025, <https://reactresources.com/topics/core-concepts>

90. Getting Started with React, When You're an Angular Developer - Fabrit Global Blog, accessed April 24, 2025, <https://blog.fabritglobal.com/react-for-angular-developers/>

91. Choosing the Right Framework: React.js vs. Angular - DhiWise, accessed April 24, 2025, <https://www.dhiwise.com/blog/design-converter/reactjs-vs-angular-key-differences-you-should-know>

92. Angular for React Developers: A Comprehensive Learning Path - XenonStack, accessed April 24, 2025, <https://www.xenonstack.com/blog/angular-learning-path>

93. Tutorial on React Native Hooks to Build React Native App - Bacancy Technology, accessed April 24, 2025, <https://www.bacancytechnology.com/blog/react-native-hooks-to-build-app>

94. Hooks API Reference - React, accessed April 24, 2025, <https://legacy.reactjs.org/docs/hooks-reference.html>

95. React Hooks | GeeksforGeeks, accessed April 24, 2025, <https://www.geeksforgeeks.org/reactjs-hooks/>

96. Built-in React Hooks, accessed April 24, 2025, <https://react.dev/reference/react/hooks>

97. Core Components Cheatsheet - Learn React Native - Codecademy, accessed April 24, 2025, <https://www.codecademy.com/learn/learn-react-native/modules/core-components-react-native/cheatsheet>

98. Core Components -- React Native | A framework for building native apps using React, accessed April 24, 2025, <https://airbnb.io/react-native/releases/0.28/docs/tutorial-core-components.html>

99. Core Components and APIs - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/components-and-apis>

100. React Native Overview Notes - Micheal England, accessed April 24, 2025, <https://micheal.dev/blog/learning-react-native-basics/>

101. Top Tips to Boost React Native Performance in 2025 - Netguru, accessed April 24, 2025, <https://www.netguru.com/blog/react-native-performance>

102. TextInput - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/textinput>

103. Handling Text Input - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/handling-text-input>

104. Using List Views - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/using-a-listview>

105. React Native --- Ultimate Guide on Debugging , Profiling & Advanced Optimization (iOS + Android) - GitHub, accessed April 24, 2025, <https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md>

106. Creating Custom React Native Components for Reusability - CloudDevs, accessed April 24, 2025, <https://clouddevs.com/react-native/components-for-reusability/>

107. React Native Best Practices Every Developer Should Know - eSparkBiz, accessed April 24, 2025, <https://www.esparkinfo.com/blog/react-native-practices-developer-should-follow.html>

108. Best Practices for Managing Styles in a Scaling React Native App - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/reactnative/comments/18lkxj6/best_practices_for_managing_styles_in_a_scaling/>

109. React Native styling: Structure for style organization - Thoughtbot, accessed April 24, 2025, <https://thoughtbot.com/blog/structure-for-styling-in-react-native>

110. Mastering React Context API: Best Practices, Pitfalls, and Recommended Use-Cases, accessed April 24, 2025, <https://www.paulserban.eu/blog/post/mastering-react-context-api-best-practices-pitfalls-and-recommended-use-cases/>

111. Rules of Hooks - React, accessed April 24, 2025, <https://legacy.reactjs.org/docs/hooks-rules.html>

112. Custom React JS Hooks: What Are They and When to Use Them? | Turing, accessed April 24, 2025, <https://www.turing.com/blog/custom-react-js-hooks-how-to-use>

113. Reusing Logic with Custom Hooks - React, accessed April 24, 2025, <https://react.dev/learn/reusing-logic-with-custom-hooks>

114. Styling // React Native for Web - GitHub Pages, accessed April 24, 2025, <https://necolas.github.io/react-native-web/docs/styling/>

115. Basics - styled-components, accessed April 24, 2025, <https://styled-components.com/docs/basics>

116. Advanced Usage - styled-components, accessed April 24, 2025, <https://styled-components.com/docs/advanced>

117. Mastering React Native Paper: A Practical Guide - Scalable Path, accessed April 24, 2025, <https://www.scalablepath.com/react-native/react-native-paper>

118. Top 10 Examples of react-native-paper code in Javascript - CloudDefense.AI, accessed April 24, 2025, <https://www.clouddefense.ai/code/javascript/example/react-native-paper>

119. Getting Started - React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/4.0/getting-started.html>

120. List.Item | React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/docs/components/List/ListItem/>

121. List.Item - React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/3.0/list-item.html>

122. Theming | React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/docs/guides/theming/>

123. Theming with React Navigation | React Native Paper, accessed April 24, 2025, <https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation/>

124. The Ultimate Guide to Custom Theming with React Native Paper, Expo and Expo Router | by Hemanshu M Mahajan | Medium | PDF | Software - Scribd, accessed April 24, 2025, <https://www.scribd.com/document/849352111/The-Ultimate-Guide-to-Custom-Theming-with-React-Native-Paper-Expo-and-Expo-Router-by-Hemanshu-M-Mahajan-Medium>

125. Home | React Hook Form - Simple React forms validation, accessed April 24, 2025, <https://www.react-hook-form.com/>

126. Advanced Usage | React Hook Form - Simple React forms validation, accessed April 24, 2025, <https://www.react-hook-form.com/advanced-usage/>

127. React form validation with react hook form. Simple! - YouTube, accessed April 24, 2025, <https://www.youtube.com/watch?v=_Fqe16D-Yug>

128. React Native Form Validation Using Formik And Yup - Mindbowser, accessed April 24, 2025, <https://www.mindbowser.com/react-native-form-validation-using-formik-and-yup/>

129. React Context vs State: Choosing the Best State Management Approach - DhiWise, accessed April 24, 2025, <https://www.dhiwise.com/post/react-context-vs-state-choosing-the-best-state-management>

130. Mastering Context API Best Practices for State Management in Nextjs Applications, accessed April 24, 2025, <https://moldstud.com/articles/p-mastering-context-api-best-practices-for-state-management-in-nextjs-applications>

131. Immer middleware - Zustand, accessed April 24, 2025, <https://zustand.docs.pmnd.rs/integrations/immer-middleware>

132. Persisting store data - Zustand, accessed April 24, 2025, <https://zustand.docs.pmnd.rs/integrations/persisting-store-data>

133. useQuery | TanStack Query React Docs, accessed April 24, 2025, <https://tanstack.com/query/latest/docs/framework/react/reference/useQuery>

134. React Native | TanStack Query React Docs, accessed April 24, 2025, <https://tanstack.com/query/latest/docs/framework/react/react-native>

135. Navigating Between Screens - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/navigation>

136. Stack Navigator | React Navigation, accessed April 24, 2025, <https://reactnavigation.org/docs/stack-navigator/>

137. Drawer Navigator | React Navigation, accessed April 24, 2025, <https://reactnavigation.org/docs/drawer-navigator/>

138. Expo Router - a complete guide for React Native and the Web - UniqueDevs, accessed April 24, 2025, <https://uniquedevs.com/en/blog/how-to-master-expo-router-basics-best-practices-examples-and-comparisons/>

139. Navigation layouts in Expo Router, accessed April 24, 2025, <https://docs.expo.dev/router/basics/layout/>

140. Navigating between pages - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/router/navigating-pages>

141. Is expo-router a replacement for React Navigation for react native apps? #668 - GitHub, accessed April 24, 2025, <https://github.com/expo/router/discussions/668>

142. Migrate from React Navigation - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/router/migrate/from-react-navigation/>

143. Profiling React Native Apps: A Guide to Fixing Performance Bottlenecks - André Adams, accessed April 24, 2025, <https://andreadams.com.br/profiling-react-native-apps-a-guide-to-fixing-performance-bottlenecks/>

144. The Ultimate Guide to React Native Performance Optimization (2025) | {callstack}, accessed April 24, 2025, <https://www.callstack.com/ebook/the-ultimate-guide-to-react-native-optimization>

145. Debugging Basics - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/debugging>

146. React Native DevTools, accessed April 24, 2025, <https://reactnative.dev/docs/react-native-devtools>

147. Debugging Basics - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/0.73/debugging>

148. Profiling - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/profiling>

149. Profiling - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/0.71/profiling>

150. Flipper vs React Native Debugger vs Reactotron - FullStack Labs, accessed April 24, 2025, <https://www.fullstack.com/labs/resources/blog/flipper-vs-react-native-debugger-vs-reactotron>

151. How to use Why Did You Render library in React Native - Yajana N Rao, accessed April 24, 2025, <https://yajanarao.hashnode.dev/how-to-use-why-did-you-render-library-in-react-native-a95121978a75>

152. welldone-software/why-did-you-render - GitHub, accessed April 24, 2025, <https://github.com/welldone-software/why-did-you-render>

153. Why Did You Render - React & WordPress - DEV Community, accessed April 24, 2025, <https://dev.to/plank/why-did-you-render-react-wordpress-1flg>

154. Bridging Native iOS Code with React Native Using Swift: A Step-by-Step Guide, accessed April 24, 2025, <https://dev.to/amitkumar13/bridging-native-ios-code-with-react-native-using-swift-a-step-by-step-guide-b05>

155. Integrating Native iOS Code with React Native Using Swift: A Comprehensive Guide, accessed April 24, 2025, <https://dev.to/iamjpsharma/integrating-native-ios-code-with-react-native-using-swift-a-comprehensive-guide-3e48>

156. A guide to integrating Native modules into React Native Android apps - Morrow Digital, accessed April 24, 2025, <https://www.themorrow.digital/blog/how-to-integrate-native-android-code-into-a-react-native-project>

157. Submit to the Apple App Store - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/submit/ios/>

158. Submit to the Google Play Store - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/submit/android/>

159. Submit an iOS App to the Apple App Store and TestFlight using EAS | egghead.io, accessed April 24, 2025, <https://egghead.io/lessons/react-native-submit-an-ios-app-to-the-apple-app-store-and-testflight-using-eas>

160. Create an Android Release Build with EAS and Upload to Google Play Store | egghead.io, accessed April 24, 2025, <https://egghead.io/lessons/react-native-create-an-android-release-build-with-eas-and-upload-to-google-play-store>

161. React Native Expo Submit to IOS App Store - YouTube, accessed April 24, 2025, <https://www.youtube.com/watch?v=NcQYhZlIePM>

162. How to create a production build for Android | EAS Tutorial - YouTube, accessed April 24, 2025, <https://www.youtube.com/watch?v=nxlt8uwqhpE>

163. Animated - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/animated>

164. Animations - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/animations>

165. Animated - React Native, accessed April 24, 2025, <https://scarcoco.github.io/react-native/docs/0.16/animated>

166. LayoutAnimation - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/layoutanimation>

167. Custom Layout Animations with Reanimated - Part 1 - React Native University, accessed April 24, 2025, <https://www.reactnative.university/blog/react-native-layout-animations>

168. Shared Values | React Native Reanimated, accessed April 24, 2025, <https://docs.swmansion.com/react-native-reanimated/docs/2.x/fundamentals/shared-values/>

169. useAnimatedProps | React Native Reanimated, accessed April 24, 2025, <https://docs.swmansion.com/react-native-reanimated/docs/2.x/api/hooks/useAnimatedProps/>

170. List Layout Animations | React Native Reanimated, accessed April 24, 2025, <https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/list-layout-animations/>

171. React Native Gesture Handler - Software Mansion, accessed April 24, 2025, <https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/native-gesture>

172. Introduction to React Native Gesture Handler - Reactiive, accessed April 24, 2025, <https://reactiive.io/articles/introduction-to-gestures>