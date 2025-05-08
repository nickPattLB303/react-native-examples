# React Native Training Course: Markdown Documentation Blueprint

Target Technologies: React Native (Latest Stable, e.g., 0.7x+), Expo SDK (Latest Stable, e.g., 52+), React Navigation v6, React Native Paper v5, TanStack Query v5, Zustand v4+, TypeScript (Latest Stable)

## I. Introduction

### A. Purpose of the Blueprint

This document establishes the definitive standards, structure, and patterns for creating the markdown documentation for the React Native Training Course. The markdown serves as the single source of truth for all course content, ensuring consistency across various distribution channels, including Confluence, Articulate 360, and instructor materials. Adherence to this blueprint is mandatory to achieve the course's goals of quality, consistency, and effectiveness.

### B. Course Goal and Target Audience

The primary goal of this course is to equip participants with the proficiency required for production-level React Native development. The course caters to developers with existing programming experience but assumes zero prior knowledge of React Native or related concepts covered within the modules. The curriculum is specifically designed to accommodate learners from diverse backgrounds: native Android developers, native iOS developers, web developers with React experience, and web developers with Angular experience. This blueprint incorporates mechanisms to address these varied backgrounds effectively.

### C. Blueprint Scope

This blueprint exclusively governs the creation of the markdown documentation content. It defines terminology, course structure, content patterns, module/section requirements, and guidelines for exercises and challenges. The creation of the final capstone project application itself, video scripts, slide decks, or specific configurations within distribution platforms (Confluence, Articulate 360) are outside the scope of this document, although the markdown content produced following this blueprint will inform those materials.

### D. Methodology: ADDIE Model Integration

The structure and requirements outlined in this blueprint are informed by the ADDIE model (Analysis, Design, Development, Implementation, Evaluation) for instructional design.

- **Analysis:** The course requirements, target audience analysis, and technology choices represent the Analysis phase inputs.
- **Design:** This blueprint document embodies the Design phase, detailing learning objectives, content structure, pedagogical strategies (like learner adaptation), assessment approaches (exercises/challenges), and media selection (markdown elements, diagrams).
- **Development:** The actual writing of the markdown documentation according to this blueprint constitutes the Development phase.
- **Implementation:** The delivery of the course content through various channels (Confluence, Articulate 360, Instructor-Led) is the Implementation phase.
- **Evaluation:** Feedback mechanisms and future course revisions based on learner performance and feedback represent the Evaluation phase, which should inform subsequent updates to this blueprint.

## II. Foundational Principles

### A. Instructional Design Principles

The course documentation adheres to established instructional design principles to maximize learning effectiveness:

- **Gagné's Nine Events of Instruction:** The structure incorporates elements like gaining attention (introductions), stating objectives, stimulating recall (prerequisites, background bridges), presenting content, providing guidance (explanations, examples), eliciting performance (exercises), providing feedback (solutions, quiz results), assessing performance (challenges), and enhancing retention (capstone relation, summaries).
- **Mayer's Principles of Multimedia Learning:** Emphasis is placed on using text and graphics together (Multimedia Principle), aligning visuals with relevant text (Contiguity Principle), using narration (implied for video/instructor-led) or text but not both redundantly for visuals (Redundancy Principle), avoiding irrelevant content (Coherence Principle), using conversational style (Personalization Principle), breaking content into manageable segments (Segmenting Principle), and introducing key concepts beforehand (Pretraining Principle). Mermaid diagrams and detailed explanations directly support these principles.
- **Constructivism:** Learners actively construct knowledge based on prior experience. The "Background Bridge Notes" and relating examples to the capstone project facilitate this by connecting new information to existing mental models or a consistent practical context.
- **Modular Design:** Content is structured into modules and sections that can function independently for asynchronous learners while forming a cohesive whole for linear paths. This supports flexibility and reusability.

### B. Technical Writing Principles (Microsoft Writing Style Guide)

All documentation MUST adhere to the Microsoft Writing Style Guide (MSWSG). Consult the [styleguide/](./styleguide/) directory and [styleguide/TOC.md](./styleguide/TOC.md) for detailed rules. Key principles and mandatory rules include:

- **Focus on Intent:** Clearly define the target audience (developer backgrounds) and their goals for each module and section. Content must directly help the learner achieve specific tasks.
- **Voice and Tone (Conversational, Friendly, Empathetic):**
  - Use natural, accessible language. Be less formal but not less precise. Explain concepts clearly, like talking one-on-one. See `styleguide/top-10-tips-style-voice.md`.
  - Project friendliness by using contractions (e.g., `it's`, `you're`, `we're`, `let's`). See `styleguide/word-choice/use-contractions.md`.
  - Use a supportive, empathetic tone. Acknowledge potentially frustrating concepts. Focus on what matters to the learner.
  - Primarily use the second person (`you`). See `styleguide/grammar/person.md`.
  - Use active voice whenever possible. See `styleguide/grammar/verbs.md`.
  - Avoid gender-specific pronouns in generic references; use `you` or role descriptions. See `styleguide/bias-free-communication.md`.
- **Word Choice (Simple, Concise):**
  - Be affirmative and avoid unnecessary words or qualifiers. Keep sentences short and focused. See `styleguide/top-10-tips-style-voice.md` and `styleguide/word-choice/use-simple-words-concise-sentences.md`.
  - Start statements with verbs where appropriate; edit out unnecessary phrases like "you can" or "there is/are". See `styleguide/top-10-tips-style-voice.md`.
  - Avoid jargon where simpler terms suffice, but explain necessary technical terms thoroughly. See `styleguide/word-choice/avoid-jargon.md`. Use technical terms carefully, per `styleguide/word-choice/use-technical-terms-carefully.md`.
  - Use US spelling. See `styleguide/word-choice/use-us-spelling-avoid-non-english-words.md`.
- **Scannability:** Put the most important information first. Use headings, lists, and short paragraphs to break up text. Make choices and next steps obvious. See `styleguide/scannable-content/`. Brevity also aids readability on various devices (See `styleguide/responsive-content.md`).
- **Procedures and Instructions:** Use the imperative mood (direct commands) for procedures and instructions. See `styleguide/procedures-instructions/writing-step-by-step-instructions.md` and `styleguide/grammar/verbs.md`.
- **Capitalization:** Default to sentence-style capitalization (capitalize only the first word and proper nouns) for headings, titles, UI labels, etc. Title-style capitalization is rare and used only for specific cases like official product names or specific publication titles. See `styleguide/capitalization.md`.
- **Numbers:** Follow specific rules for numerals vs. words (spell out zero-nine, numerals for 10+), comma usage, dates, percentages, ranges, etc. See `styleguide/numbers.md`.
- **Acronyms:** Define acronyms on first use (spell out term followed by acronym in parentheses) unless they are extremely common (e.g., USB, URL per _The American Heritage Dictionary_ or the MSWSG A-Z list). Avoid introducing acronyms used only once. Lowercase the spelled-out term unless it contains proper nouns. See `styleguide/acronyms.md`.
- **Punctuation:** Use the serial (Oxford) comma in lists of three or more items. Use one space after periods. Skip end punctuation for short headings and list items (three words or fewer). Follow specific rules for hyphens, dashes, etc. See `styleguide/punctuation/` and `styleguide/top-10-tips-style-voice.md`.
- **Links and URLs:** Use descriptive link text. Don't include `https://` unless the protocol is different. Omit trailing slashes unless required. See `styleguide/urls-web-addresses.md`.
- **Accessibility:** Write clear, simple text. Use descriptive link text. Structure content logically with headings. Provide text alternatives for visuals (diagram descriptions, image alt text). Use people-first language where applicable. See `styleguide/accessibility/`.
- **Developer Content:** Follow specific guidelines for formatting code examples, placeholders, and technical elements. See `styleguide/developer-content/`.
- **Localization/Machine Translation:** Use simple sentence structures, consistent terminology, and include "small words" (articles, prepositions) to aid translation. Avoid idioms and culturally specific references.

### C. Terminology Dictionary

Consistency in terminology is paramount. The following terms MUST be used consistently throughout the documentation. Usage should also align with the [Microsoft Writing Style Guide A-Z word list](./styleguide/a-z-word-list-term-collections/).

- **React Native:** The framework itself.
- **Expo:** The platform/toolset used for development and building. Refer to specific Expo modules (e.g., `expo-camera`, Expo Router) when discussing them.
- **Component:** Reusable UI building blocks (React concept). Distinguish between Core Components (provided by React Native, e.g., `<View>`, `<Text>`) and Custom Components (created by developers).
- **Hook:** Functions allowing functional components to use state and lifecycle features (React concept). Distinguish between Core Hooks (provided by React, e.g., `useState`, `useEffect`) and Custom Hooks.
- **Props:** (Properties) Data passed down from parent to child components.
- **State:** Data managed within a component that can change over time.
- **Native Modules:** Platform-specific code (Swift/Objective-C for iOS, Kotlin/Java for Android) bridged for use in React Native. Distinguish from JavaScript modules. Use "TurboModules" when specifically discussing the New Architecture's native modules.
- **JSI (JavaScript Interface):** The C++ layer enabling synchronous communication between JavaScript and native code in the New Architecture. Explain this replaces the asynchronous "Bridge" of the legacy architecture.
- **Fabric:** The New Architecture's rendering system.
- **Codegen:** The tool generating interface code between JS/TS and native modules in the New Architecture.
- **Expo Go:** The client app used for development and testing Expo projects without native builds.
- **Simulator (iOS) / Emulator (Android):** Software for running mobile apps on a desktop. Course focuses on iOS Simulator.
- **StyleSheet:** React Native's API for creating styles.
- **Styled Components:** The specific CSS-in-JS library used for styling.
- **React Native Paper:** The specific UI component library used.
- **TanStack Query (useQuery):** The library used for server state management.
- **Zustand:** The library used for client state management (alternative to Context API).
- **Context API:** React's built-in state management solution.
- **Expo Router:** File-based routing solution built on React Navigation.
- **React Navigation:** Library for handling navigation stacks, tabs, drawers.
- **Exercise:** Short, focused practice activity (15-20 mins).
- **Challenge:** More complex application of concepts (30-60 mins).
- **Module:** A major topical unit of the course.
- **Section:** A subdivision within a module, focusing on a specific concept or API.
- **Sign in / Sign out:** Preferred over "Log in / Log out".

_(This dictionary should be expanded as more specific terms arise during content development. Always check the MSWSG A-Z list for preferred terminology.)_

## III. Course Outline and Structure

### A. Course Philosophy and Flow

The course follows a progressive learning path, starting with foundational concepts and gradually building towards advanced topics and practical application. It begins with context (Mobile Dev History, Why RN), moves to setup, covers essential prerequisites (Web, JS, TS, React), dives deep into React Native specifics (Components, Hooks, Styling, Navigation, State, Native Modules), addresses practical concerns (Performance, Debugging, Publishing), and culminates in applying knowledge (though the capstone project implementation is out of scope for this blueprint). The structure ensures learners build a solid theoretical and practical understanding layer by layer. Exercises and challenges are strategically placed to reinforce learning after key concepts are introduced.

### B. Finalized Course Outline

The following outline is definitive and MUST be followed for the markdown documentation structure. Module order is fixed. Section titles and order are fixed. Exercise/Challenge placement is fixed.

- **Module 0: Course Introduction**

  - Section 1: Welcome and Course Goals
  - Section 2: Target Audience and Prerequisites
  - Section 3: How to Use This Course (Explaining Learning Paths, Structure, Tools)
  - Section 4: Course Components and Terminology (Referencing this Blueprint)
  - Section 5: Setting Up Your Learning Environment (Software installs beyond RN itself, tool accounts)

- **Module 1: The Landscape of Mobile Development**

  - Section 1: A Brief History of Mobile Platforms (Pre-Smartphone to Modern OS)
  - Section 2: The Rise of Cross-Platform Development
  - Section 3: Why React Native? (Pros, Cons, Use Cases)
    - _Exercise 1.1: Framework Comparison Research (Microsoft Forms)_
  - Section 4: Understanding the React Native Ecosystem (Core, Expo, Community)
  - _Challenge 1: Mobile Development Quiz (Microsoft Forms)_

- **Module 2: React Native Architecture Explained**

  - Section 1: Legacy Architecture: The Bridge (Concepts, Limitations)
  - Section 2: The New Architecture: JSI, TurboModules, Fabric, Codegen (Concepts, Benefits)
    - _Diagram: Legacy Bridge Architecture (Mermaid)_
    - _Diagram: New Architecture Overview (Mermaid)_
  - Section 3: How Rendering Works (Legacy vs. Fabric)
    - _Exercise 2.1: Architecture Concepts Review (Microsoft Forms)_
  - Section 4: Implications for Developers (Performance, Synchronous Operations)
  - _Challenge 2: Architecture Diagramming (Microsoft Whiteboard)_

- **Module 3: Setting Up Your React Native Environment with Expo**

  - Section 1: Introduction to Expo and Expo Go
  - Section 2: Installing Prerequisites (Node.js, npm/yarn, Watchman, Xcode Command Line Tools)
  - Section 3: Creating Your First Expo App (`npx create-expo-app@latest`)
    - _Exercise 3.1: Create and Run Initial App (Instructions)_
  - Section 4: Understanding `npx expo` vs. `npm`/`yarn`
  - Section 5: Running on the iOS Simulator
  - Section 6: Running on Expo Go (Physical Device - Optional Mention)
  - Section 7: Expo Project Structure (File/Folder Overview)
  - Section 8: Essential Expo CLI Commands (`start`, `install`, `run:ios`)
  - Section 9: Troubleshooting Common Setup Issues (`rm -rf node_modules`, `--legacy-peer-deps`, etc.)
  - _Challenge 3: Environment Setup Verification (Checklist/Quiz - Microsoft Forms)_

- **Module 4: Web Development Essentials Refresher**

  - Section 1: Core HTML Concepts (Structure, Elements, Semantics) - Brief Review\*
  - Section 2: Core CSS Concepts (Selectors, Box Model, Layout - Flexbox Focus) - Brief Review\*
    - _Exercise 4.1: Basic HTML/CSS Structure (CodeSandbox)_
  - Section 3: Bridging Web Concepts to React Native (Mapping HTML elements to RN Components, CSS to StyleSheet)
  - _Challenge 4: Simple Layout Recreation (CodeSandbox)_

- **Module 5: JavaScript Essentials for React Native**

  - Section 1: Variables, Data Types, and Operators (ES6+ Focus: `let`, `const`)
  - Section 2: Control Flow (Conditionals, Loops)
  - Section 3: Functions (Arrow Functions, Scope, Closures)
    - _Exercise 5.1: Function Practice (CodeSandbox)_
  - Section 4: Objects and Arrays (Methods, Destructuring, Spread/Rest Operators)
    - _Exercise 5.2: Data Manipulation (CodeSandbox)_
  - Section 5: Asynchronous JavaScript (Callbacks, Promises, `async`/`await`)
    - _Diagram: Async/Await Flow (Mermaid)_
    - _Exercise 5.3: Async Function Implementation (CodeSandbox)_
  - Section 6: ES6 Modules (Import/Export)
  - _Challenge 5: Mini Pharmacy Data Processor (CodeSandbox)_

- **Module 6: TypeScript Essentials**

  - Section 1: Why TypeScript? (Benefits: Type Safety, Tooling)
  - Section 2: Basic Types (string, number, boolean, array, object, any, unknown, void, null, undefined)
  - Section 3: Interfaces and Type Aliases
    - _Exercise 6.1: Defining Interfaces (CodeSandbox)_
  - Section 4: Functions in TypeScript (Typing Parameters, Return Types)
  - Section 5: Generics
    - _Exercise 6.2: Generic Function (CodeSandbox)_
  - Section 6: Enums
  - Section 7: Utility Types (Partial, Required, Pick, Omit, etc.)
  - Section 8: Configuring TypeScript (`tsconfig.json` overview - as relevant to Expo)
  - _Challenge 6: Typing a Pharmacy API Response (CodeSandbox)_
  - _Note: All subsequent JS/React/RN code examples MUST use TypeScript._

- **Module 7: React Essentials for React Native**

  - Section 1: Introduction to React (Declarative UI, Component-Based)
  - Section 2: JSX (Syntax, Embedding Expressions, Attributes)
  - Section 3: Components (Functional Components Focus, Class Components Brief Mention)
    - _Exercise 7.1: Creating Functional Components (CodeSandbox)_
  - Section 4: Props (Passing Data Down)
    - _Exercise 7.2: Passing and Using Props (CodeSandbox)_
  - Section 5: State (`useState` Hook)
    - _Exercise 7.3: Managing Component State (CodeSandbox)_
  - Section 6: Handling Events (Press Events)
  - Section 7: Conditional Rendering
  - Section 8: Lists and Keys
    - _Exercise 7.4: Rendering Lists (CodeSandbox)_
  - Section 9: Component Lifecycle (`useEffect` Hook)
    - _Diagram: `useEffect` Lifecycle (Mermaid)_
    - _Exercise 7.5: Using `useEffect` for Side Effects (CodeSandbox)_
  - Section 10: React Context API (Introduction for State Management)
    - _Diagram: Context API Flow (Mermaid)_
    - _Exercise 7.6: Basic Context Usage (CodeSandbox)_
  - _Challenge 7: Simple Medication List App (CodeSandbox)_

- **Module 8: React Native Core Components**

  - Section 1: The Role of Core Components
  - Section 2: View (`<View>`) - The Fundamental Container
  - Section 3: Text (`<Text>`) - Displaying Text
  - Section 4: Image (`<Image>`) - Displaying Images (Local and Network)
  - Section 5: TextInput (`<TextInput>`) - User Input
    - _Exercise 8.1: Basic Form with TextInput (Expo Snack)_
  - Section 6: ScrollView (`<ScrollView>`) - Enabling Scrolling
  - Section 7: StyleSheet API - Basic Styling
    - _Exercise 8.2: Applying Styles with StyleSheet (Expo Snack)_
  - Section 8: Button and Pressable (`<Button>`, `<Pressable>`) - Handling Taps
    - _Exercise 8.3: Implementing Buttons (Expo Snack)_
  - Section 9: FlatList and SectionList - Efficient List Rendering
    - _Exercise 8.4: Displaying Data with FlatList (Expo Snack)_
  - Section 10: Other Core Components Overview (ActivityIndicator, Modal, etc.)
  - _Challenge 8: Build a Basic Prescription Item Card (Expo Snack)_

- **Module 9: React Native Core APIs and Hooks**

  - Section 1: Platform Module (Platform-Specific Code)
  - Section 2: Dimensions API (Getting Screen Size)
  - Section 3: Alert API (Displaying Native Alerts)
    - _Exercise 9.1: Using the Alert API (Expo Snack)_
  - Section 4: Core React Hooks Recap (`useState`, `useEffect`, `useContext`)
  - Section 5: `useRef` Hook (Accessing Component Instances/DOM Elements)
  - Section 6: `useCallback` and `useMemo` Hooks (Performance Optimization)
    - _Exercise 9.2: Optimizing with `useCallback` (Expo Snack)_
  - Section 7: Creating Custom Hooks (Encapsulating Logic)
    - _Exercise 9.3: Building a Custom Hook (Expo Snack)_
  - _Challenge 9: Custom Hook for Device Information (Expo Snack)_

- **Module 10: Styling in React Native**

  - Section 1: Styling Approaches Overview
  - Section 2: StyleSheet Deep Dive (Best Practices, Performance)
  - Section 3: Inline Styles (Usage and Limitations)
  - Section 4: Layout with Flexbox (Comprehensive Guide)
    - _Diagram: Flexbox Layout Examples (Mermaid)_
    - _Exercise 10.1: Complex Flexbox Layout (Expo Snack)_
  - Section 5: Introduction to Styled Components
    - _Exercise 10.2: Styling with Styled Components (Expo Snack)_
  - Section 6: Theming with Styled Components
  - Section 7: Introduction to UI Libraries: React Native Paper
  - Section 8: Using React Native Paper Components
    - _Exercise 10.3: Implementing UI with Paper Components (Expo Snack)_
  - Section 9: Theming with React Native Paper (v5)
    - _Exercise 10.4: Customizing Paper Theme (Expo Snack)_
  - Section 10: Responsive Design Techniques (Platform, Dimensions)
  - _Challenge 10: Style the Prescription Card with Paper and Styled Components (Expo Snack)_

- **Module 11: Navigation and Routing**

  - Section 1: Navigation Concepts (Stack, Tabs, Drawer)
  - Section 2: Introduction to React Navigation (v6)
  - Section 3: Stack Navigator Setup and Usage
    - _Exercise 11.1: Basic Stack Navigation (Expo Snack)_
  - Section 4: Tab Navigator Setup and Usage
    - _Exercise 11.2: Basic Tab Navigation (Expo Snack)_
  - Section 5: Drawer Navigator Setup and Usage
  - Section 6: Passing Parameters Between Screens
    - _Exercise 11.3: Passing Data via Navigation (Expo Snack)_
  - Section 7: Configuring Headers and Tabs (Styling, Options)
  - Section 8: Introduction to Expo Router
  - Section 9: File-Based Routing with Expo Router
    - _Exercise 11.4: Implementing Routes with Expo Router (Expo Snack)_
  - Section 10: Expo Router vs. React Navigation Configuration
  - Section 11: Deep Linking (Concepts and Setup with Expo Router)
  - _Challenge 11: Build Multi-Screen Navigation for SpeedyMeds (Expo Snack - Choose either React Navigation or Expo Router)_

- **Module 12: Handling User Input and Forms**

  - Section 1: Recap: TextInput Component
  - Section 2: Handling Text Changes (`onChangeText`)
  - Section 3: Form State Management Strategies
  - Section 4: Controlled Components Pattern
    - _Exercise 12.1: Building a Controlled Form Input (Expo Snack)_
  - Section 5: Introduction to Form Libraries (React Hook Form Recommended)
  - Section 6: Setting up React Hook Form
  - Section 7: Basic Form Validation with React Hook Form
    - _Exercise 12.2: Form with React Hook Form Validation (Expo Snack)_
  - Section 8: Handling Form Submission
  - Section 9: Other Input Types (Switches, Pickers - using Paper components)
    - _Exercise 12.3: Integrating Switch/Picker in a Form (Expo Snack)_
  - _Challenge 12: Create a Patient Information Form (Expo Snack)_

- **Module 13: State Management**

  - Section 1: Recap: `useState` and Prop Drilling Limitations
  - Section 2: Recap: React Context API Deep Dive (Provider, Consumer, `useContext`)
    - _Exercise 13.1: Managing Global Theme with Context (Expo Snack)_
  - Section 3: Context API Performance Considerations
  - Section 4: Introduction to Zustand (Client State)
    - _Diagram: Zustand Store Interaction (Mermaid)_
    - _Exercise 13.2: Implementing a Zustand Store (Expo Snack)_
  - Section 5: Zustand vs. Context API Comparison
  - Section 6: Introduction to Server State Management
  - Section 7: Introduction to TanStack Query (React Query) v5
  - Section 8: Core Concepts: Queries (`useQuery`), Mutations (`useMutation`), Query Client
    - _Diagram: `useQuery` Data Flow (Mermaid)_
    - _Exercise 13.3: Fetching Data with `useQuery` (Expo Snack)_
  - Section 9: Caching and Background Updates with TanStack Query
  - Section 10: Handling Mutations and Invalidating Queries
    - _Exercise 13.4: Posting Data with `useMutation` (Expo Snack)_
  - Section 11: React Native Specifics for TanStack Query (Online Manager, Focus Refetching)
  - _Challenge 13: Integrate Zustand and TanStack Query for Medication Data (Expo Snack)_

- **Module 14: Working with Native Modules**

  - Section 1: What are Native Modules? Why Use Them?
  - Section 2: Using Existing Native Modules (Community & Expo SDK)
  - Section 3: Expo SDK Modules Overview (Camera, Location, FileSystem, etc.)
    - _Exercise 14.1: Using an Expo SDK Module (e.g., `expo-device`) (Expo Snack)_
  - Section 4: Introduction to Creating Native Modules (Conceptual Overview)
  - Section 5: TurboModules (New Architecture Native Modules)
  - Section 6: JSI for Direct Communication
  - Section 7: Bridging Native UI Components (Conceptual Overview)
  - _Challenge 14: Research Native Module Alternatives (Microsoft Forms)_

- **Module 15: Performance and Debugging**

  - Section 1: Common Performance Bottlenecks in React Native
  - Section 2: Measuring Performance (Flipper, React DevTools Profiler)
  - Section 3: Optimizing Rendering (`React.memo`, `useCallback`, `useMemo`)
    - _Exercise 15.1: Applying Memoization (Expo Snack)_
  - Section 4: Optimizing Lists (FlatList/FlashList Best Practices)
  - Section 5: Image Optimization Strategies
  - Section 6: Reducing Bundle Size
  - Section 7: Debugging Tools (React Native Debugger, Chrome DevTools, Flipper)
  - Section 8: Handling Errors (Error Boundaries, Logging)
    - _Exercise 15.2: Implementing an Error Boundary (Expo Snack)_
  - Section 9: Understanding Hermes Engine Benefits
  - Section 10: New Architecture Performance Considerations
  - _Challenge 15: Profile and Identify Optimization Opportunity (Conceptual/Quiz - Microsoft Forms)_

- **Module 16: EAS Build and Publishing**

  - Section 1: Introduction to EAS (Expo Application Services)
  - Section 2: EAS Build vs. Classic Expo Build
  - Section 3: Setting up EAS CLI
  - Section 4: Configuring `eas.json` for Builds
    - _Exercise 16.1: Configure `eas.json` (Conceptual/Quiz - Microsoft Forms)_
  - Section 5: Creating Development Builds
  - Section 6: Creating Production Builds (iOS and Android)
  - Section 7: Submitting to App Stores (Overview)
  - Section 8: EAS Update (Over-the-Air Updates)
    - _Exercise 16.2: Publishing an EAS Update (Conceptual/Instructions)_
  - Section 9: Managing Secrets with EAS
  - _Challenge 16: EAS Build Workflow Diagram (Microsoft Whiteboard)_

- **Module 17: Advanced Features**

  - Section 1: Animations Overview (Animated API vs. Reanimated)
  - Section 2: Introduction to React Native Reanimated
    - _Exercise 17.1: Basic Reanimated Animation (Expo Snack)_
  - Section 3: Gestures with React Native Gesture Handler
    - _Exercise 17.2: Implementing a Basic Gesture (Expo Snack)_
  - Section 4: Combining Gestures and Animations
  - Section 5: Working with SVGs (`react-native-svg`)
  - Section 6: Push Notifications with `expo-notifications`
  - Section 7: Offline Data Storage (`AsyncStorage`, `expo-sqlite`, MMKV )
  - Section 8: Testing Strategies (Jest, React Native Testing Library)
    - _Exercise 17.3: Writing a Simple Unit Test (Expo Snack/CodeSandbox)_
  - _Challenge 17: Add an Animated Element to the Prescription Card (Expo Snack)_

- **Module 18: Capstone Project**

  - Section 1: Project Overview and Setup
  - Section 2: Understanding the Project Scaffolding
  - Section 3: Data Flow and State Management
    - _Diagram: Capstone Data Flow (Mermaid)_
  - Section 4: Navigation Implementation
    - _Diagram: Capstone Navigation Structure (Mermaid)_
  - Section 5: UI Layer: Theming and Styling
  - Section 6: Development Workflow: Setup, Debugging, and Testing
  - Section 7: Core Requirements and Milestones
  - Section 8: Evaluation and Submission
  - Section 9: Tips for Success

- **Module 19: Course Wrap-up and Next Steps**

  - Section 1: Course Summary and Key Takeaways (Recap of Modules 0-17)
  - Section 2: Capstone Project Reflection (Reviewing the SpeedyMeds project experience)
  - Section 3: Resources for Continued Learning (Communities, Blogs, Advanced Topics)
  - Section 4: Next Steps in Your React Native Journey (Career paths, contributing)
  - Section 5: Final Q&A / Feedback (Primarily for Instructor-Led Path)

## IV. Content Element Patterns and Standards

This section defines the mandatory patterns and standards for all markdown elements and custom course components used in the documentation. Strict adherence ensures consistency, readability, and supports the course's pedagogical goals.

### A. Core Markdown Syntax Rules

These rules define the required syntax for standard Markdown elements, incorporating MSWSG and [GitHub Docs](./contributing/style-guide-and-content-model/style-guide.md) guidelines. All Markdown documentation MUST be automatically formatted using Prettier with its default configuration. The following rules supplement Prettier's formatting by defining content structure, style, and areas where Prettier's defaults are to be adhered to or where manual attention is still required. Prettier's default settings for Markdown include `proseWrap: "preserve"` (meaning it does not re-wrap paragraph text) and `tabWidth: 2`.

- **Headings:** Headings provide both structure and visual points of reference to help readers scan content. If
  you can break text logically into smaller sections, the extra
  spacing and distinct fonts associated with headings
  will help readers scan content and find entry points, per [./styleguide/scannable-content/headings.md](./styleguide/scannable-content/headings.md)
  - MUST use ATX style (`#`) only. Prettier will enforce a single space following the `#`.
  - Sentence case is required for headings (capitalize only the first word and proper nouns), per `styleguide/capitalization.md`.
  - Prettier will enforce single blank lines preceding and following each heading.
  - Headings MUST increment by one (e.g., H2 follows H1, H3 follows H2); skipping levels is forbidden.
  - Headings MUST NOT contain bold or other inline formatting.
  - Each document MUST have exactly one H1 heading , serving as the document title.
  - Skip end punctuation for headings (per `styleguide/punctuation/`).
  - Headers must adequately describe the content under them. Headers can either follow the [guidelines for writing titles](/contributing/style-guide-and-content-model/contents-of-a-github-docs-article#titles) or can be written as questions.
  - You can use H3 and H4 level headers to further organize content into related groups, but you cannot skip header levels.
  - There must be text content between a header and subheader, such as an introduction. per [./contributing/style-guide-and-content-model/style-guide.md#headers](./contributing/style-guide-and-content-model/style-guide.md#headers).
- **Paragraphs:** Prettier will enforce separation of consecutive paragraphs with a single blank line and will collapse multiple consecutive blank lines.
  - While Prettier's default `proseWrap: "preserve"` setting means it will not automatically re-wrap paragraph lines, authors SHOULD manually aim for a line length of approximately 100 characters for readability. Avoid manually creating overly long lines.
  - Do **not** use forced line breaks (e.g., ending a line with two spaces or using `<br>` tags) within sentences or paragraphs. Allow text to wrap naturally. This improves readability and accessibility across different screen sizes, per `styleguide/accessibility/writing-all-abilities.md`.
- **Emphasis:** Use `**bold**` for bold text (double asterisks). Use `*italic*` for italic text (single asterisk). Use `***bold and italic***` for combined emphasis. To display literal asterisks, escape them with a backslash (`\*`). Prettier will preserve this formatting. Use emphasis sparingly for highlighting key terms or concepts.
- **Lists:** Lists work best when they have two to seven items. Each item should be fairly
  short—the reader should be able to see at least two, and preferably
  three, list items at a glance. It's OK to have a couple of short
  paragraphs in a list item, but don't exceed that length too often, per [./styleguide/scannable-content/lists.md](./styleguide/scannable-content/lists.md).
  - Items in a list MUST be parallel in grammatical structure (e.g., each item is a noun phrase, or each starts with a verb), per [./styleguide/scannable-content/lists.md](./styleguide/scannable-content/lists.md#bulleted-lists).
  - **Unordered (Bulleted) Lists:**
    - MUST use a hyphen (`-`) followed by a space for each item. Prettier will enforce this style.
    - Use for items that have something in common but don't need to appear in a particular order, per [./styleguide/scannable-content/lists.md#bulleted-lists](./styleguide/scannable-content/lists.md#bulleted-lists).
    - If the order of items is not important, alphabetize the list. If order is important (but not strictly sequential), order items by importance to the reader (e.g., broadest to most specialized), per [./contributing/style-guide-and-content-model/style-guide.md#lists](./contributing/style-guide-and-content-model/style-guide.md#lists).
  - **Ordered (Numbered) Lists:**
    - MUST use the format `1.` (or other sequential numbers like `0.`, `2.`) followed by a space for each item. Prettier will format ordered lists, potentially re-numbering them sequentially if lazy numbering (e.g., all `1.`) was used.
    - Use for sequential items (like a procedure) or prioritized items (like a top 10 list), per [./styleguide/scannable-content/lists.md#numbered-lists](./styleguide/scannable-content/lists.md#numbered-lists).
  - **Introducing Lists:**
    - Make sure the purpose of the list is clear. Introduce the list with a heading, a complete sentence, or a fragment that ends with a colon, per [./styleguide/scannable-content/lists.md#introductory-text](./styleguide/scannable-content/lists.md#introductory-text).
    - If you introduce a list with a heading, don't use explanatory text after the heading. Also, don't use a colon or period after the heading, per [./styleguide/scannable-content/lists.md#introductory-text](./styleguide/scannable-content/lists.md#introductory-text).
    - Introductions should be descriptive, clearly conveying the list's subject. Avoid nonspecific phrases like "the following" or "these items" where possible, to improve clarity and localization, per [./contributing/style-guide-and-content-model/style-guide.md#lists](./contributing/style-guide-and-content-model/style-guide.md#lists).
  - **Capitalization:** Begin each list item with a capital letter unless there's a specific reason not to (e.g., a command that is always lowercase). If necessary, rewrite items so they all begin with capitals or all with lowercase, per [./styleguide/scannable-content/lists.md#capitalization](./styleguide/scannable-content/lists.md#capitalization) and [./contributing/style-guide-and-content-model/style-guide.md#lists](./contributing/style-guide-and-content-model/style-guide.md#lists).
  - **Punctuation of List Items:**
    - End each list item with a period if:
      - Any item forms a complete sentence when combined with the list introduction (if the intro ends with a colon).
      - Any item _by itself_ is a complete sentence.
    - **Exception:** Do not use periods if all items have three or fewer words, OR if the items are UI labels, headings, subheadings, or strings. This rule for short items is also highlighted in [./styleguide/top-10-tips-style-voice.md](./styleguide/top-10-tips-style-voice.md). The comprehensive rule is per [./styleguide/scannable-content/lists.md#punctuation](./styleguide/scannable-content/lists.md#punctuation).
    - Do NOT use semicolons, commas, or conjunctions (like _and_ or _or_) at the end of individual list item lines, per [./styleguide/scannable-content/lists.md#punctuation](./styleguide/scannable-content/lists.md#punctuation).
  - **Serial (Oxford) Commas:** In prose, or when a single list item itself contains a series of three or more elements, always use the serial (Oxford) comma before the conjunction (e.g., "apples, bananas, and oranges"), per [./styleguide/punctuation/commas.md](./styleguide/punctuation/commas.md) and [./styleguide/top-10-tips-style-voice.md](./styleguide/top-10-tips-style-voice.md).
  - **Formatting and Indentation:**
    - Nested lists will be indented by Prettier. With the default `tabWidth: 2`, this typically results in a 2-space indent, though Prettier may use 4 spaces in certain contexts. The formatting applied by Prettier is the standard.
    - Prettier will ensure a single blank line precedes and follows the entire list block (both ordered and unordered).
    - Avoid unneeded linebreaks within and around lists, per [./contributing/style-guide-and-content-model/style-guide.md#linebreaks](./contributing/style-guide-and-content-model/style-guide.md#linebreaks).
  - **Task Lists:** MUST use the syntax `- [ ]` for incomplete items and `- [x]` for completed items. Prettier will format these using `-` as the bullet marker.
  - **Term-Definition Lists:** When writing a list where items consist of a term and its definition, use a colon as a delimiter after the term. The definition (secondary text) should be capitalized as if it were the beginning of a new sentence, per [./contributing/style-guide-and-content-model/style-guide.md#lists](./contributing/style-guide-and-content-model/style-guide.md#lists). Example: `- `Term`: This is the definition.`
- **Links:**
  - Use inline link syntax `[Link Text](URL)` for most links. Prettier will ensure this syntax is correctly formatted.
  - **Link Text:**
    - MUST be descriptive and clearly indicate the destination's content. Ideally, use the title of the target page or a concise summary of its content. Link text should make sense without the surrounding text. See `styleguide/urls-web-addresses.md` and [./contributing/style-guide-and-content-model/style-guide.md#links](./contributing/style-guide-and-content-model/style-guide.md#links).
    - Avoid generic phrases like "click here," "read more," or "link."
  - **Introducing Links:**
    - Introduce links with a simple "see" if the context is clear (e.g., "For details, see [Page Title](URL).").
    - Otherwise, use introductory phrases like "For more information, see [Page Title](URL)" or "To learn more about Concept X, see [Relevant Article](URL)," per [./contributing/style-guide-and-content-model/style-guide.md#formatting-links](./contributing/style-guide-and-content-model/style-guide.md#formatting-links).
    - Avoid making arbitrary words or phrases within a sentence into hyperlinks without a clear lead-in. This improves readability and translatability.
  - **External Links:**
    - MUST use the full absolute URL (e.g., `https://example.com/path/to/page`).
    - Omitting `https://` is acceptable only if the protocol is `http` AND the link still functions correctly; however, including `https://` is generally safer. Always include the protocol if it's different (e.g., `ftp://`).
    - Omit trailing slashes where possible, unless they are required for the URL to resolve correctly. See `styleguide/urls-web-addresses.md`.
    - When linking to an external page, consider mentioning the destination site if it provides useful context (e.g., "See [React Hooks API Reference](URL) in the official React documentation."), per [./contributing/style-guide-and-content-model/style-guide.md#links-to-external-resources](./contributing/style-guide-and-content-model/style-guide.md#links-to-external-resources).
  - **Internal Links (Within This Course):**
    - Links to other markdown files within the _same course module directory_ MUST use relative paths (e.g., `[Link to Section 3](./section-3-setup.md)`).
    - Links _between different modules_ should generally be avoided to maintain modularity. If essential, and the final platform's inter-module linking mechanism is unknown, use a clear placeholder (e.g., `(TODO: Link to Module X, Section Y: Topic)` accompanied by a comment for later review) rather than attempting a relative path that might break.
  - **Links to Sections:**
    - For links to sections _within the same document_: Use `[Link to Section Title](#section-title-slug)`. The link text should ideally match or clearly reference the target section title. The `#section-title-slug` is typically auto-generated by Markdown renderers based on the heading text (e.g., "## My Awesome Section" becomes `#my-awesome-section`). Verify slug behavior.
    - For links to sections _in a different document (within the same module)_: Use `[Link to Page Title - Section Title](./other-page.md#section-title-slug)`.
    - Ensure the link text provides enough context about the destination. See [./contributing/style-guide-and-content-model/style-guide.md#links-to-specific-sections-of-articles](./contributing/style-guide-and-content-model/style-guide.md#links-to-specific-sections-of-articles).
  - **Reference-Style Links:**
    - Syntax: `[link text][reference-id]` with `[reference-id]: URL "Optional Title"` defined elsewhere (typically at the end of the section or document).
    - MAY be used sparingly if a URL is very long and used multiple times, or if it significantly improves the readability of a paragraph dense with links. Prettier will format these correctly.
  - **Link Frugality and Placement:**
    - Be judicious with links. Only include them if they provide clear value or are necessary for the learner's understanding or task completion.
    - Place critical links directly in the relevant text. Related but non-essential links can be grouped in an "Additional Resources" list at the end of a section or module, or introduced as "For further reading, see..."
    - Avoid repeating the exact same link multiple times in close proximity within the same article section. Refer to [./contributing/style-guide-and-content-model/style-guide.md#links](./contributing/style-guide-and-content-model/style-guide.md#links).
  - **Punctuation and Links:**
    - If a period or other punctuation at the end of a sentence might be confused as part of an adjacent URL, rewrite the sentence or set the URL off (e.g., on a new line or after a colon). See `styleguide/urls-web-addresses.md`.
    - Do not include punctuation marks (like periods or commas) _inside_ the `[Link Text]` or `(URL)` unless they are a legitimate part of the URL itself, per [./contributing/style-guide-and-content-model/style-guide.md#formatting-links](./contributing/style-guide-and-content-model/style-guide.md#formatting-links).
  - **Abundance of Official Documentation Links:**
    - REQUIRED. The course content explains and curates, but does not replace, official documentation.
    - Primarily use the "Official Documentation Box" custom component (defined in IV.B) for links to React Native, Expo, MDN library docs, etc. Relevant links can also be naturally embedded within the text where appropriate.
- **Images:**
  - **Syntax:** Use standard Markdown image syntax: `![Alt Text](URL "Optional Tooltip Title")`. Prettier will ensure correct formatting and spacing.
    - The `Alt Text` is mandatory.
    - The `"Optional Tooltip Title"` (which becomes the HTML `title` attribute) should generally be omitted unless it provides significant, non-redundant value on hover.
  - **URL:** The URL MUST point to an image file (e.g., PNG, JPG, SVG) stored within a designated course assets directory (e.g., `./assets/images/module-X/filename.png`).
  - **Alt Text (Mandatory):**
    - MUST provide a concise (approx. 40-150 characters), descriptive textual equivalent of the image's content and function. Reference `styleguide/accessibility/graphics-design-media.md`.
    - MUST express the core idea or meaning, not just a literal description.
    - MUST end with punctuation (usually a period).
    - Do NOT start with redundant phrases like "Image of..." or "Graphic showing...". Screen readers announce this.
    - DO start with the _type_ of graphic, e.g., "Screenshot of..." or "Diagram showing...".
    - If the image contains highlights (outlines, arrows), describe them (e.g., "...button is outlined in orange.").
    - For screenshots: Focus on the key UI elements and their state relevant to the context. Alt text is not a replacement for instructional text in the document.
    - Reference: [./contributing/style-guide-and-content-model/style-guide.md#alt-text](./contributing/style-guide-and-content-model/style-guide.md#alt-text).
  - **Caption (Mandatory):** Every image MUST be immediately followed by a brief paragraph serving as a caption. The caption explains the image's context, highlights key elements shown, or clarifies its relevance to the surrounding text.
  - **Image Quality and Formatting:**
    - Images MUST be high-resolution and clear.
    - Crop images tightly to the relevant area needed to illustrate the point.
    - Use annotations (arrows, boxes, highlights) directly on the image sparingly and only where necessary to draw attention; these annotations MUST be explained in the caption.
  - **File Naming:**
    - Use descriptive file names in lowercase kebab-case.
    - Include relevant context (module, concept, UI element) in the name (e.g., `module-3-ios-simulator-initial-screen.png`, `component-view-layout-example.png`).
    - Maintain consistent naming conventions across the course assets.
    - Reference: [./contributing/style-guide-and-content-model/style-guide.md#file-names-for-images](./contributing/style-guide-and-content-model/style-guide.md#file-names-for-images).
  - **Usage Context:**
    - Use static images (PNG, JPG, SVG) for screenshots, illustrations, or static diagrams (though Mermaid is preferred for diagrams - see IV.C).
    - Do NOT use animated GIFs. Convey dynamic concepts using text, Mermaid diagrams, or link to external videos if necessary.
    - Do NOT use images of code or command-line output _instead_ of using fenced code blocks. Screenshots should illustrate UI or visual results, not replace text content. Reference: [./contributing/style-guide-and-content-model/style-guide.md#alt-text-for-images-of-command-line-interfaces](./contributing/style-guide-and-content-model/style-guide.md#alt-text-for-images-of-command-line-interfaces).
- **Code Blocks:**
  - **Syntax:** MUST use fenced code blocks (triple backticks ```) exclusively. Indented code blocks are forbidden. Prettier enforces the use of fenced code blocks.
  - **Language Identifier:** A language identifier (e.g., `tsx`, `typescript`, `javascript`, `bash`, `json`, `mermaid`) MUST be included immediately after the opening backticks to enable syntax highlighting.
  - **Formatting:** Prettier, with its default `embeddedLanguageFormatting: "auto"` setting, will format the code within fenced code blocks according to standard rules for the specified language. This includes appropriate indentation and handling of blank lines.
  - **Line Length:** Aim for a code line length of around 80 characters maximum within blocks to prevent horizontal scrolling where feasible, per [./contributing/style-guide-and-content-model/style-guide.md#code-blocks](./contributing/style-guide-and-content-model/style-guide.md#code-blocks).
  - **Inline Code:** Inline code snippets within paragraphs MUST use single backticks (e.g., `const example = true;`). Prettier will preserve this formatting. Use this for referencing variables, function names, properties, keywords, short code fragments, file names, directory names, commands, etc., within prose. See `styleguide/developer-content/formatting-developer-text-elements.md`.
  - **Placeholders:** Placeholders within code MUST use `ALL-CAPS-KEBAB-CASE` (e.g., `YOUR-API-KEY`, `MY-VARIABLE`). The meaning of each placeholder MUST be explained clearly in the accompanying text. See [./contributing/style-guide-and-content-model/style-guide.md#placeholders](./contributing/style-guide-and-content-model/style-guide.md#placeholders).
  - **Command Line Examples:**
    - Do NOT include command prompts (e.g., `$`, `#`, `>`) in runnable command examples to facilitate easy copy-pasting.
    - If showing command output is necessary, place it immediately after the command within the same code block and comment it out using the appropriate comment character for the shell (usually `#`). Example:
      ```bash
      npx expo install my-library
      # Installing my-library...
      # Added 1 package
      ```
    - See [./contributing/style-guide-and-content-model/style-guide.md#code-blocks](./contributing/style-guide-and-content-model/style-guide.md#code-blocks) and [./contributing/style-guide-and-content-model/style-guide.md#commands](./contributing/style-guide-and-content-model/style-guide.md#commands).
  - **HTML:** Do NOT use HTML tags for styling or formatting _within_ standard Markdown fenced code blocks.
  - **Context for Excerpts:** When showing an excerpt from a larger file, provide enough surrounding context (e.g., enclosing function, import statements if relevant) for the user to understand the snippet's position and dependencies. See [./contributing/style-guide-and-content-model/style-guide.md#examples](./contributing/style-guide-and-content-model/style-guide.md#examples).
  - **Code Example Standards:** Detailed standards for code example quality, explanations, comments (including JSDoc), security, accessibility, testing, and relevance to the course theme are defined in **Section IV.D: Code Example Standards**. This section (IV.A) focuses only on the core Markdown syntax and formatting rules for code blocks. Refer to IV.D for comprehensive requirements.
- **Tables:**
  - **Syntax:**
    - MUST use the pipe (`|`) and hyphen (`-`) syntax for defining headers and rows.
    - Every row MUST begin and end with a pipe (`|`).
    - Prettier will automatically align columns in the Markdown source using spaces for readability and ensure a blank line precedes the table.
  - **Purpose:** Use tables for presenting structured, comparable data (e.g., values, attributes, categories with examples, simple action mappings). Reference `styleguide/scannable-content/tables.md`.
  - **When NOT to Use:** Do NOT use tables for simple lists of items; use standard Markdown lists (`-` or `1.`) instead. Reference `styleguide/scannable-content/tables.md` and `contributing/style-guide-and-content-model/style-guide.md#use-tables-only-for-presenting-tabular-information`.
  - **Introduction:** Every table MUST be preceded by a brief introductory sentence explaining its purpose and summarizing its content. This sentence MUST end with a period (not a colon). Avoid repeating information in the text that is clear from the table itself. Reference `styleguide/scannable-content/tables.md` and `contributing/style-guide-and-content-model/style-guide.md#avoid-describing-table-data`.
  - **Headers:**
    - **Column Headers:** MUST be concise, descriptive, and specific. Use Sentence case capitalization. Reference `styleguide/scannable-content/tables.md`.
    - **Row Headers:** If the first column serves to describe the rows (acting as a header for row data, e.g., listing item names or properties), ensure this structure is clear. The top-left cell should ideally describe the row headers unless redundant. This is crucial for accessibility. Reference `contributing/style-guide-and-content-model/style-guide.md#use-proper-markup-for-row-and-column-headers`.
  - **Cell Content:**
    - Avoid complex content like multiple paragraphs, nested lists, or code blocks within cells. Use alternative formatting (like separate sections with headings) if content is too complex for a table cell.
    - Place primary identifiers (e.g., item names, commands) in the leftmost column. Reference `styleguide/scannable-content/tables.md`.
    - Keep cell text brief (ideally one line) for readability and responsiveness. Reference `styleguide/scannable-content/tables.md`.
    - Populate every cell. Use "None" or "Not applicable" (preferred over "N/A") for empty cells; do not leave them blank or use dashes. Reference both style guides.
    - Ensure entries within a column are grammatically parallel (e.g., all nouns, all verb phrases). Reference `styleguide/scannable-content/tables.md`.
    - Use Sentence case capitalization unless the content requires specific casing (e.g., code `variableName`). Reference `styleguide/scannable-content/tables.md`.
    - Use periods or other end punctuation only if cells contain complete sentences or a mix of sentences and fragments. Reference `styleguide/scannable-content/tables.md`.
  - **Symbols:** If using symbols (e.g., for Yes/No), use standard icons (like check ✔️ / cross ❌) consistently and provide a legend or ensure context makes their meaning clear. Avoid emoji. Populate all relevant cells. Reference `contributing/style-guide-and-content-model/style-guide.md#use-clear-consistent-symbols-and-labels`.
  - **Alignment:** Use Markdown alignment syntax in the separator line (`:---` for left, `:---:` for center, `---:` for right) to control column alignment. Default to left-alignment. Center-align columns containing only symbols or very short, uniform data. Reference `contributing/style-guide-and-content-model/style-guide.md#align-table-content-consistently`.
- **Blockquotes:**
  - Use the `>` character followed by a space at the beginning of each line. Prettier will ensure correct formatting of blockquotes, including the `>` marker and spacing for single or multiple paragraphs.
  - Standard blockquotes should be used only for actual quotations from external sources. For other highlighted information, use the custom Callout components defined below.
- **Horizontal Rules:**
  - Use three consecutive hyphens (`---`) on a line by themselves. Prettier will enforce this style and ensure a single blank line precedes and follows horizontal rules.
  - Use sparingly, primarily to indicate a major thematic break within a very long section where a subheading isn't appropriate.

### B. Custom Course Component Definitions

These components utilize specific Markdown conventions to create standardized elements for pedagogical purposes.

- **Callouts/Alerts (Note, Tip, Important, Caution, Warning):** Based on established conventions for technical documentation alerts (see `./contributing/style-guide-and-content-model/style-guide.md`).

  - **Syntax and Purpose:**

    - **NOTE:**

            > [!NOTE]
            > Information the user should notice even if skimming. Use for supplementary details, reminders, or context.

    - **TIP:**

            > [!TIP]
            > Optional information to help a user be more successful or efficient. Use for best practices, shortcuts, or alternative approaches.

    - **IMPORTANT:**

            > [!IMPORTANT]
            > Essential information required for user success or understanding. Use for critical concepts, prerequisites, setup steps, or core requirements.
            ```
            *   **Usage Context:** To highlight non-negotiable requirements or foundational knowledge.

      - **CAUTION:**
        ```
        > [!CAUTION]
        > Negative potential consequences of an action that are generally recoverable. Use for actions that might lead to errors, performance issues, unexpected behavior, or minor data inconsistencies if instructions aren't followed carefully.
        ```
        - **Usage Context:** To advise care when performing actions that could lead to minor problems if done incorrectly.
      - **WARNING:**
        ```
        > [!WARNING]
        > Negative potential consequences of an action that may be severe or non-recoverable. Use for critical security advice, actions with irreversible consequences (data loss), major pitfalls, or steps that could render the application unusable.
        ```

  - **Usage Rules:** Use callouts judiciously. They should highlight information, not contain core instruction. Content within callouts MUST be concise and directly related to the callout type. The `>` tag MUST be on its own line. All subsequent lines of the callout content MUST start with `. Paragraph breaks within a callout can be achieved using a line containing only `.

- **Background Bridge Notes:** Designed to explicitly address learners from different development backgrounds, comparing and contrasting React Native concepts with their existing knowledge.

  - **Syntax:**

        > <TARGET_AUDIENCE_EMOJI> **<TARGET_AUDIENCE>:**
        > **Comparison:** Explain how this React Native concept relates to or differs from common patterns in the target audience's background (e.g., Android lifecycle vs. useEffect, iOS Auto Layout vs. Flexbox, React web state vs. RN state).
        >
        > **Key Takeaway:** Briefly summarize the most crucial difference or similarity.
        >
        > **Source:** [<TITLE_FOR_SOURCE>](<LINK_TO_SOURCE_DOCUMENTATION_FOR_TARGET_BACKGOUND>)
        >
        > **Example: (Optional)** Provide a very brief native code snippet (conceptual) or analogy relevant to the target background.

  - **Usage Rules:** MUST be used immediately following the primary explanation of a core React Native concept where a significant difference or potential point of confusion exists for one or more of the specified target backgrounds (Native Android, Native iOS, Web React, Web Angular). The `(Target Audience)` MUST be specified accurately (e.g., `(iOS Developers)`, `(Android Developers)`, `(React Developers)`, `(Angular Developers)`). If applicable to both native platforms, use `(Native Developers)`. If applicable to both web frameworks, use `(Web Developers)`. Separate notes may be needed if the comparison points differ significantly. Content MUST be focused on comparison and clarification, avoiding redundant explanation of the core concept itself. Use specific emoji's to help draw the attention of the `(Target Audience)`. Use 🍏 for iOS Developers, use 🤖 for Android, use 📲 for Native Developers, use ⚛️ for React Developers, use 🅰 for Angular Developers, and use 🌐 for Web Developers. MUST include links to official documentation and other trusted sources for further details around concepts related to the target background (Android, iOS, React, Angular).
    - **Usage Context:** Immediately after explaining a core RN concept with significant differences from Native (Android/iOS), Web React, or Web Angular paradigms. Target audience MUST be specified.

- **Learning Path Guidance:** Provides context or direction specific to the different ways learners might engage with the course (Instructor-Led, Self-Led, Asynchronous).

  - **Syntax:**

        > <TARGET_PATH_EMOJI> **<TARGET_PATH>:** Provide specific advice, suggest preparation for instructor-led sessions, recommend review strategies for self-paced learners, or highlight the standalone relevance for asynchronous learners.

  - **Usage Rules:** Use judiciously at strategic points, such as the start of a module, the start of a section, exercises, or challenges. The `(Target Path)` MUST be specified (e.g., `(Instructor-Led)`, `(Self-Led)`, `(Asynchronous)`, `(All Learners)`). Guidance should be actionable and relevant to the specified learning path(s). Use specific emoji's to help draw the attention of the `(Target Path)`. Use 🧑‍🏫 for iInstructor-Led, use 🧗‍♀️ for Self-Led, use 🔁 for Asynchronous, and use 🛣️ for All Learners.

        > 📚 **Official Documentation:**
        >
        > - [<LINK_TITLE>](<URL>)
        > - [<LINK_TITLE>](<URL>)
        > - [<LINK_TITLE>](<URL>)
        > - [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
        >
        > 🗂️ **Additional Resources:**
        >
        > - [<LINK_TITLE>](<URL>)
        > - [<LINK_TITLE>](<URL>)
        > - [<LINK_TITLE>](<URL>)
        > - [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### C. Visual Element Standards

- **Mermaid Diagrams:** MANDATORY for visualizing complex information like architecture, flows, and hierarchies. They are a primary tool for explanation, not an optional addition.

  - **Requirement:** Use Mermaid diagrams to illustrate:
    - System Architecture (e.g., Legacy Bridge vs. New Architecture)
    - Component Hierarchies (where relationships are complex or instructive)
    - State Management Flows (e.g., Context API, Zustand, TanStack Query data flow)
    - Navigation Flows (e.g., Stack/Tab/Drawer interactions)
    - Asynchronous Logic Flow (e.g., `async/await`, Promise chains)
    - Conditional Rendering Logic (if complex)
    - Build Processes (e.g., EAS Build workflow)
  - **Syntax:** Embed within standard fenced code blocks using the `mermaid` language identifier :Code snippet

        ```
        graph TD;
            A --> B{Decision};
            B -- Yes --> C[Action 1];
            B -- No --> D[Action 2];
            C --> E[End];
            D --> E;

        ```

  - **Diagram Types:** Utilize appropriate diagram types based on the information being presented:
    - **Flowcharts (`graph TD` or `graph LR`):** For processes, workflows, decision logic.
    - **Sequence Diagrams (`sequenceDiagram`):** For illustrating interactions between components or systems over time (e.g., API calls, event handling).
    - **Class Diagrams (`classDiagram`):** Use sparingly, primarily for illustrating component prop structures or complex type relationships if beneficial.
    - **State Diagrams (`stateDiagram-v2`):** For visualizing component lifecycles or state machine logic.
    - _(Refer to Mermaid documentation for specific syntax )_
  - **Placement:** Insert the Mermaid code block immediately following the paragraph that introduces or references the concept being diagrammed.
  - **Text Description:** MANDATORY. Every Mermaid diagram MUST be immediately followed by a detailed explanatory paragraph (minimum 100 words). This description must explain the purpose of the diagram, define its elements (nodes, actors, states), and walk through the depicted flow or structure. This is crucial for accessibility and comprehension.
  - **Simplicity and Clarity:** Diagrams must prioritize clarity over complexity. If a concept requires a very complex diagram, break it down into multiple, simpler diagrams illustrating different aspects. Use clear, concise labels for all elements. Avoid unnecessary visual clutter.
  - **Consistency:** Maintain consistent styling (e.g., shapes for similar entity types, line styles for similar relationships) across diagrams within the course. If using custom styling via `classDef`, apply it consistently.

- **Images/Screenshots:** Use to visually support textual explanations, especially for UI elements, setup steps, or tool interfaces.
  - **Requirement:** Include screenshots for:
    - Illustrating steps in environment setup (e.g., Xcode settings, terminal commands/output).
    - Showing the visual output of UI code examples.
    - Demonstrating the use of debugging tools or IDE features.
    - Visualizing the structure of the Expo Go app or simulator interface.
  - **Formatting:** Adhere strictly to the image rules in IV.A (mandatory descriptive Alt Text, mandatory caption paragraph, single blank line before/after). Images MUST be high-resolution, clear, and cropped tightly to the relevant area. Use annotations (arrows, boxes, highlights) directly on the image where necessary to draw attention to specific elements; these annotations MUST be explained in the caption paragraph.

### D. Code Example Standards

Code examples are critical learning tools and MUST adhere to the following standards, guided by MSWSG (`styleguide/developer-content/code-examples.md`) and pedagogical best practices. The goal is clarity, accuracy, reusability, and relevance to the course's capstone theme (SpeedyMeds).

**1. General Principles:**

- **Purposeful Scenarios:** Examples MUST illustrate meaningful developer tasks and scenarios relevant to the SpeedyMeds theme, not contrived or obvious points.
- **Gradual Complexity:** Start with simple examples and build complexity incrementally as concepts are layered. Prioritize frequently used or potentially difficult elements.
- **Accuracy and Testing:** All code examples MUST be compiled, tested, and verified against the target technology versions.
- **Readability and Formatting:** Code MUST be formatted using a standard Prettier configuration. Use meaningful names for variables, functions, etc.
- **Security:** Write secure code. Validate input, avoid hard-coded secrets, and be mindful of common security practices.
- **Accessibility:** Code rendering UI MUST include appropriate accessibility props (`accessibilityLabel`, `accessibilityHint`, etc.) with meaningful values.
- **Expo Focus:** Default to Expo libraries/APIs when available. Use core React Native APIs for fundamental concepts or where no Expo equivalent exists.
- **Capstone Relation:** All examples (beyond basic syntax illustration) MUST relate contextually to the SpeedyMeds theme (variables, component names, scenarios).
- **Copy/Run Capability:** Provide easy ways for learners to copy code. For long examples, use Expo Snack or CodeSandbox as appropriate (See Section VI).

**2. Example Types and Usage:**

This blueprint defines three tiers of code examples, each with specific usage contexts and documentation requirements. An abundance of _Inline_ and _Short, Self-Contained_ examples is MANDATORY, especially when introducing new concepts, syntax, or APIs.

- **a) Inline Code Snippets (`code`):**

  - **Purpose:** To illustrate specific syntax elements, keywords, prop names, simple function calls, or brief fragments directly within explanatory text.
  - **Usage:** Mandatory when introducing new language syntax, API elements (props, method names), or configuration values for the first time. Use liberally within paragraphs to ground explanations in concrete code.
  - **Format:** Use single backticks (``).
  - **Explanation:** Context is provided by the surrounding sentence(s). No separate explanation block or JSDoc required.
  - **Example Context:** "To manage component state, use the `useState` Hook. Pass the initial state as an argument, like `useState(0)`."

- **b) Short, Self-Contained Examples:**

  - **Purpose:** To demonstrate a single, focused concept, API usage, or technique in a runnable context. Illustrates _how_ to use a specific element introduced in the text.
  - **Usage:** Use frequently after explaining a core concept, component, hook, or API. Ideal for showing the basic implementation of a feature.
  - **Format:** Use fenced code blocks (```) with the correct language identifier (`tsx`, `typescript`, `json`, `bash`, etc.). MUST be runnable in the appropriate tool (Expo Snack for RN, CodeSandbox for JS/TS/React fundamentals).
  - **Explanation:**
    - MUST be preceded by a single sentence introducing the example's specific purpose (e.g., "This example shows how to fetch data using `useEffect`.").
    - MUST be followed by a focused explanation (approx. 50-100 words) clarifying the key parts of the code, the concept demonstrated, and the expected outcome. This explanation focuses only on the new concept being shown.
    - JSDoc comments within the code are OPTIONAL but encouraged for clarity if the code involves a non-trivial function or component definition.
    - The 200-word minimum description does NOT apply.
  - **Example Context:** After explaining the `<Button>` component and its `onPress` prop, provide a short, runnable Snack example showing a simple `<Button>` that triggers an `Alert`. The explanation would focus _only_ on the `<Button>` and `onPress` connection, not re-explain the entire component structure.

- **c) Long Samples:**
  - **Purpose:** To illustrate multiple features working together, complex scenarios, architectural patterns, or best practices. Often integrates several concepts covered previously.
  - **Usage:** Use more sparingly than short examples. Reserve for the end of sections covering multiple related topics, end-of-module examples, or dedicated walkthroughs/tutorials. Avoid using long samples to introduce fundamental concepts.
  - **Format:** Use fenced code blocks (```) with the correct language identifier. MUST be runnable (Expo Snack/CodeSandbox). May be accompanied by helper files or setup instructions if necessary.
  - **Explanation:**
    - MUST be preceded by an introduction describing the scenario, requirements, dependencies, and what the sample demonstrates.
    - MUST be followed by a detailed text description (minimum 200 words). This description must explain the overall purpose, break down key sections, define important elements, explain the concepts illustrated, describe the outcome, and link to relevant APIs/docs.
    - JSDoc comments (`/** ... */`) are MANDATORY within the code for all exported functions, classes, components, custom hooks, and complex types, explaining purpose, params (`@param`), returns (`@returns`), etc.
    - Inline comments (`//`) SHOULD be used judiciously to clarify non-obvious logic. Do not comment on the obvious. Keep comments synchronized with code changes.
  - **Example Context:** After covering `useState`, `useEffect`, `FlatList`, and basic styling, a long sample could show a screen component that fetches a list of medications from a mock API, stores it in state, and renders it using `FlatList`, applying styles from `StyleSheet`. The detailed explanation would cover how these pieces work together.

**3. Comments and Explanations:**

- **Inline Comments (`//`):** Use within code blocks (primarily in _Long Samples_, optionally in _Short Examples_) to clarify non-obvious logic or specific lines. Avoid commenting on obvious syntax. Keep comments concise and synchronized with code.
- **JSDoc (`/** ... */`):\*\* Mandatory *only* for *Long Samples\* as defined above. Apply to all key functions, components, hooks, classes, and types.
- **Text Explanations (Following Code Blocks):** Required for _Short_ and _Long_ examples. The depth varies: focused and brief (~50-100 words) for _Short Examples_, detailed and comprehensive (200+ words) for _Long Samples_.

**4. Exception Handling:**

- Show exception handling (`try`/`catch`) only when it is intrinsic to the example's purpose (e.g., demonstrating error boundaries or specific API error handling). Do not clutter simple examples with boilerplate error catching for invalid arguments.

By defining these tiers and adjusting documentation requirements, the blueprint encourages frequent, focused examples while reserving comprehensive documentation efforts for more complex, integrative samples, aligning with both MSWSG and effective pedagogical practice.

### E. Mandatory Table: Custom Markdown Component Reference

**Table IV.1: Custom Markdown Component Reference**

| **Component Name**         | **Purpose**                                                                                      | **Markdown Syntax Example**                                                                                                                    | **Required Usage Context**                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Callout (NOTE)             | Supplementary details, reminders, context.                                                       | `> [!NOTE]` <br> `> Content...`                                                                                                                | To provide additional information that is helpful but not critical.                                                                                                            |
| Callout (TIP)              | Best practices, shortcuts, alternative approaches.                                               | `> [!TIP]` <br> `> Content...`                                                                                                                 | To offer optional advice for efficiency or better results.                                                                                                                     |
| Callout (IMPORTANT)        | Essential information for success, critical concepts, prerequisites.                             | `> [!IMPORTANT]` <br> `> Content...`                                                                                                           | To highlight non-negotiable requirements or foundational knowledge.                                                                                                            |
| Callout (CAUTION)          | Warns of potential negative but recoverable consequences (errors, performance issues).           | `> [!CAUTION]` <br> `> Content...`                                                                                                             | To advise care when performing actions that could lead to minor problems if done incorrectly.                                                                                  |
| Callout (WARNING)          | Warns of potentially severe or non-recoverable consequences (data loss, security risks).         | `> [!WARNING]` <br> `> Content...`                                                                                                             | To alert users to critical risks or actions with irreversible outcomes.                                                                                                        |
| Background Bridge Note     | Compares/contrasts RN concepts with specific developer backgrounds (Native/Web).                 | `> 📲 **Target Audience:` <br> `> **Comparison:**...` <br> `> **Key Takeaway:**...` <br> `> **Source:**...`<br> `> **Example:** (Optional)...` | Immediately after explaining a core RN concept with significant differences from Native (Android/iOS), Web React, or Web Angular paradigms. Target audience MUST be specified. |
| Learning Path Guidance     | Provides context/direction specific to Instructor-Led, Self-Led, or Asynchronous learning paths. | `> 🛣️ **Target Path:**...`                                                                                                                     | Strategically placed before complex topics, exercises, or challenges to offer path-specific advice. Target path(s) MUST be specified.                                          |
| Official Documentation Box | Highlights key links to official documentation for important APIs, components, or concepts.      | `> 📚 **Official Documentation:**` <br> `> *(URL)` <br> `> *(URL)` <br> `> 🗂️ **Additional Resources:**` <br> `> *(URL)` <br> `> *(URL)`       | In sections introducing significant new technical elements (APIs, components, core concepts like Flexbox, JSI). Links must be to canonical official sources.                   |

_The inclusion of Table IV.1 provides authors with a quick, accessible reference for implementing these essential custom components correctly, reinforcing consistency and adherence to the blueprint's pedagogical adaptations._

### F. Course Content Types

To ensure clarity, consistency, and pedagogical effectiveness within each section, content MUST be categorized and structured according to the following defined content types, inspired by established documentation models. Sections will typically combine multiple content types.

- **Conceptual Content:** Explains fundamental concepts, theories, "under the hood" mechanisms, purpose, and importance. This type answers "What is it?" and "Why does it matter?". It includes explanatory paragraphs, overviews, and detailed breakdowns of how things work.
- **Procedural Content:** Provides step-by-step instructions for completing specific tasks or workflows. This type answers "How do I do it?". It includes numbered steps, command-line instructions, and code examples that demonstrate a sequence of actions. Exercises and Challenges are larger-scale applications of procedural content.
- **Referential Content:** Presents structured, detailed information about APIs, components, props, types, configuration options, or terminology. This type answers "What are the details?". It includes API descriptions, parameter lists, tables, and definitions.
- **Troubleshooting Content:** Addresses common issues, errors, and unexpected behavior, providing solutions or workarounds. This type answers "What went wrong?" and "How do I fix it?". It includes descriptions of problems, error messages, and resolution steps.

These content types provide a framework for organizing information logically within sections, ensuring that learners can easily find explanations, instructions, reference details, and help with problems.

Furthermore, the mandatory inclusion of Mermaid diagrams and detailed explanations for both visuals and code significantly elevates the pedagogical value of the documentation. These elements move beyond simple descriptions to actively guide learners through complex concepts and practical implementations. This aligns directly with the "0-to-mastery" goal by providing multiple modalities and deeper context. However, this requirement substantially increases the effort and expertise needed for content creation. Project planning must account for the time required to develop accurate, clear diagrams and comprehensive code walkthroughs, and quality assurance processes must rigorously evaluate these elements. Similarly, the constraint that all code examples relate to the capstone project fosters a cohesive and practical learning journey. It allows learners to incrementally build familiarity with the domain and see direct application of concepts. This necessitates careful planning by content creators to ensure relevant and meaningful examples can be devised for every topic, potentially requiring a shared library of capstone-themed data models or UI snippets to maintain consistency.

## V. Module and Section Requirements

This section outlines the mandatory structural and content requirements for every module and section within the course documentation. These rules ensure consistency, pedagogical soundness, and alignment with the course objectives.

### A. Standard Module Structure

Each module's primary markdown file(s) MUST follow this structure precisely:

1. **Module Title:** H1 heading (`# Module X: Title`), using the exact title specified in Section III.B.
2. **Module Introduction Image (Recommended):** An optional but encouraged relevant banner image (e.g., React Native logo variant, abstract graphic related to the module topic). MUST adhere to all image standards (IV.C), including alt text and caption.
3. **Introduction Paragraph:** A concise (2-4 sentences) overview of the module's topic, its importance within React Native development, and what the learner will achieve by completing it.
4. **Target Audience Adaptation:** Explicitly address the relevance of the module to different developer backgrounds. Use introductory sentences or dedicated "Background Bridge Notes" (IV.B) where significant differences in perspective or prior knowledge exist (e.g., "Native developers will find the component lifecycle familiar, while web developers should note the differences from browser DOM lifecycles."). Mention specific backgrounds (Android, iOS, React, Angular) as appropriate.
5. **Learning Objectives:** A bulleted list (`*`) clearly stating the specific, measurable skills or knowledge the learner will gain. Objectives MUST start with action verbs (e.g., "Implement," "Describe," "Configure," "Compare," "Debug"). Example: `* Configure navigation between two screens using Expo Router.`
6. **Prerequisites:** A bulleted list (`*`) identifying necessary prior knowledge or completed modules. MUST include links to the relevant preceding module(s) within the course documentation. Example: `* Completion of Module 7: React Essentials for React Native.`
7. **Module Sections:** The core content, divided into sections as defined in the finalized outline (III.B) and adhering to the Standard Section Structure (V.B).
8. **Module Challenge:** A link to the module's culminating challenge, placed after the final content section. Format: `**(URL_to_Tool)**` (See Section VI).
9. **Module Summary:** A brief (1-2 paragraphs) recap highlighting the most critical concepts and skills covered in the module.
10. **Additional Resources (Optional):** A bulleted list (`*`) of high-quality, supplementary resources (e.g., key blog posts, conference talks, community libraries) that go beyond the mandatory official documentation links embedded within sections.

### B. Standard Section Structure

Each section within a module MUST adhere to the following structure and content ordering:

1.  **Section Title:** H2 or H3 heading (`## Section X: Title` or `### Subsection Y: Title`), matching the finalized outline (III.B).
2.  **Section Introduction:** 1-2 sentences clearly stating the purpose or topic of the section.
3.  **Core Content (Ordered by Content Type):** The main explanatory text, definitions, concepts, procedures, etc., organized according to the content types defined in Section IV.F. Content within this block MUST follow this general order, though not all types will be present in every section:
    - **Conceptual Content:** Overviews, explanations, "under the hood" details, purpose, importance, use cases. (See IV.F)
      - _Includes:_ Explanatory paragraphs, diagrams (IV.C) illustrating concepts or flows, "Background Bridge Notes" (IV.B), relevant Callouts (IV.B), Learning Path Guidance (IV.B).
    - **Referential Content:** Detailed information about APIs, components, props, types, configuration, terminology. (See IV.F)
      - _Includes:_ API/Component/Hook Explanations (covering Purpose, Syntax, Parameters/Props, Return Value, Usage/Remarks), tables (IV.A), definitions, "Official Documentation Link Box" (IV.B).
    - **Prerequisites (for this section's procedures/exercises):** A brief list or paragraph outlining necessary prior knowledge or setup specifically required for the procedural content or exercise within _this_ section. MUST be placed immediately before the relevant procedural steps or the link to the exercise. (See V.C for more details).
    - **Procedural Content:** Step-by-step instructions for tasks, code implementation steps. (See IV.F)
      - _Includes:_ Numbered steps (IV.A), command-line instructions, Code Examples (IV.D) demonstrating procedures, diagrams (IV.C) illustrating workflows.
    - **Troubleshooting Content:** Common issues, errors, and solutions related to the section's topic or procedures. (See IV.F)
      - _Includes:_ Descriptions of problems, error messages, resolution steps, troubleshooting tips integrated near relevant procedural content.
4.  **Section Exercise (If applicable):** A link to the section's associated exercise, placed after the core content block. Format: `**(URL_to_Tool)**` (See Section VI). Exercises are placed according to the finalized outline (III.B).
5.  **Next Steps (Optional):** A brief list or paragraph suggesting logical follow-up actions or linking to related sections/modules within the course. Use for internal course navigation guidance.
6.  **Additional Resources (Optional):** A bulleted list of high-quality, supplementary external resources (e.g., key blog posts, conference talks, community libraries) relevant to the section's topic. Use for external learning guidance.

Content within the "Core Content" block MUST strictly adhere to all formatting and element standards defined in Section IV.

### C. Content Depth and Linking Rules

The substance of the content must meet these requirements:

- **0-to-Mastery Depth:** All content MUST assume the learner has zero prior knowledge of the specific topic being covered in that module or section, even if they have experience in related areas. Explanations must start from fundamental principles and build comprehensively towards practical application and advanced nuances. Avoid assuming implicit knowledge.
- **"Under the Hood" Explanations:** It is insufficient to state _that_ something works; the documentation MUST explain _how_ it works internally whenever feasible and relevant. Examples include explaining the asynchronous nature of the legacy bridge, the synchronous mechanism of JSI , how `StyleSheet`translates to native styling, or how Expo manages the build process. This provides deeper understanding beyond surface-level API usage.
- **Accuracy and Up-to-Date Information:** All technical information, API descriptions, code examples, and procedural steps MUST be rigorously verified against the latest stable versions of the target technologies (React Native 0.7x+, Expo SDK 52+, React Navigation v6, React Native Paper v5, TanStack Query v5, Zustand v4+, TypeScript) at the time of content creation. Outdated information is unacceptable. The specific target versions MUST be stated at the beginning of this blueprint.
- **Official Documentation Integration:** The course content acts as a curated, explanatory layer on top of official documentation, providing context, hands-on examples, and structured learning paths. It does not replace official docs. Therefore, an abundance of direct links to specific, relevant pages within the official documentation (React Native, Expo, React, TypeScript, MDN, library docs) is MANDATORY. Use the "Official Documentation Link Box" (IV.B) for key resources in each relevant section, and embed other relevant links naturally within the text.

### D. Learner Adaptation Implementation

Content must be adapted to support learners with different backgrounds and engaging via different learning paths:

- **Developer Backgrounds (Native/Web):** Consistently use "Background Bridge Notes" (IV.B) immediately after explaining core concepts where paradigms differ significantly between native (Android/iOS) and web (React/Angular) development. Key areas for comparison include component lifecycle management, UI layout systems (XML/AutoLayout vs. Flexbox), navigation patterns, state management philosophies, build/deployment processes, and performance considerations. These notes should bridge the conceptual gap for learners coming from a specific background.
- **Learning Paths (Instructor/Self/Async):** Strategically embed "Learning Path Guidance" notes (IV.B) at key junctures. For example:
  - Before a complex topic: Suggest pre-reading for instructor-led, or breaking it down for self-paced.
  - Before an exercise/challenge: Highlight collaborative aspects for instructor-led, or self-assessment focus for self-paced.
  - At module start/end: Indicate how the module fits into the overall flow for linear paths, or its standalone value for asynchronous learners.
- **Skimming Guidance:** For foundational modules covering prerequisite knowledge (e.g., JavaScript, React Essentials), include a standard "TIP" callout (IV.B) at the beginning, advising learners already proficient in that area to skim for review while paying attention to React Native specific nuances. Example: `> Experienced React developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.`

The stringent requirements for content depth ("0-to-mastery," "under the hood") and accuracy demand significant subject matter expertise and meticulous research from content creators. This ensures the course provides genuine value and achieves the goal of proficiency. However, it also implies a substantial commitment to ongoing maintenance. The rapidly evolving nature of React Native and Expo means that content, especially code examples and API usage, will require regular reviews and updates to prevent obsolescence. A well-defined maintenance strategy, though beyond this blueprint's scope, is a critical corollary for the course's long-term success.

Effectively implementing learner adaptation requires more than just following syntax; it demands pedagogical insight. Content creators must thoughtfully identify the specific points where different backgrounds might lead to confusion or where different learning paths benefit from tailored guidance. The "Background Bridge Notes" and "Learning Path Guidance" components provide the _tools_ for adaptation, but their value depends entirely on their strategic and accurate application. Review processes must therefore evaluate not just the presence of these elements, but their pedagogical effectiveness in genuinely supporting diverse learners.

## VI. Exercises, Challenges, and Assessment

Practical application is crucial for skill acquisition. This section defines the tools, formats, and requirements for all exercises and challenges within the course.

### A. Tooling Mandate and Usage Rules

To ensure consistency, manageability, and pedagogical appropriateness, the following tools MUST be used for specific types of activities. The selection balances the need for isolated environments for foundational concepts against the necessity of a true React Native environment for framework-specific work.

- **CodeSandbox:** MANDATORY for all coding Exercises and Challenges within modules preceding the introduction of the React Native environment (specifically: Module 4: Web Essentials, Module 5: JS Essentials, Module 6: TS Essentials, Module 7: React Essentials).
  - _Rationale:_ Provides an isolated, web-focused environment suitable for teaching fundamental JavaScript, TypeScript, and React concepts without the added complexity or setup requirements of React Native. Prevents premature exposure to RN tooling.
  - _Usage:_ Use standard JavaScript or TypeScript project templates as appropriate.
- **Expo Snack:** MANDATORY for all coding Exercises and Challenges in modules covering React Native specific topics (from Module 3: Environment Setup onwards).
  - _Rationale:_ Provides an accessible, browser-based React Native development environment that directly aligns with the course's Expo focus. Allows learners to experiment with RN components and APIs without local setup friction.
  - _Usage:_ Snacks must be configured to use the course's target Expo SDK version (e.g., SDK 52+).
- **Microsoft Forms:** MANDATORY for all non-coding activities designed as quizzes, knowledge checks, research tasks, or conceptual reviews.
  - _Rationale:_ Offers features suitable for creating and automatically (or manually) grading quizzes, collecting short responses, and structuring knowledge checks. Integrates within the expected organizational toolset.
  - _Usage:_ Leverage appropriate question types, feedback mechanisms, and settings as outlined in VI.B.
- **Microsoft Whiteboard:** MANDATORY for Exercises or Challenges that require collaborative diagramming, visual brainstorming, or architectural design.
  - _Rationale:_ Provides a collaborative digital canvas suitable for visualizing flows, structures, and ideas, supporting activities like system design or component hierarchy planning.
  - _Usage:_ Provide clear prompts; templates are recommended. Leverage collaboration features for instructor-led paths.
- **GitHub Repositories:** OPTIONAL solely for instructors to provide starter code templates or complete solutions for CodeSandbox or Expo Snack activities. GitHub MUST NOT be used as the platform where learners _complete_ their exercises/challenges (except for the separate Capstone Project). Use standard repositories only; GitHub Gists, Codespaces, or other related tools are explicitly disallowed for course exercises/challenges.
  - _Rationale:_ Provides version control and a standard way to distribute starter code or solutions if desired, but keeps the interactive learning environment within the mandated sandbox tools.

### B. Implementation Requirements within Tools

- **Expo Snack:**
  - MUST include a `README.md` file within the Snack clearly explaining the exercise/challenge objective, any setup steps within the Snack, and the expected outcome.
  - MUST be configured to use the target Expo SDK version specified in this blueprint.
  - MUST include all necessary dependencies (`package.json`) pre-installed for the activity.
  - Solutions (if provided via Snack) MUST be in a separate, clearly labeled Snack link.
- **CodeSandbox:**
  - MUST include a `README.md` file within the Sandbox explaining the objective, setup, and expected outcome.
  - MUST use appropriate standard JavaScript/TypeScript project templates.
  - Solutions (if provided via CodeSandbox) MUST be in a separate, clearly labeled Sandbox link.
- **Microsoft Forms:**
  - MUST include clear instructions in the Form description.
  - MUST utilize appropriate question types (e.g., multiple choice, text entry, ranking, rating) relevant to the assessment goal.
  - MUST assign point values for questions intended for automatic grading.
  - MUST provide feedback for correct/incorrect answers where pedagogically appropriate (e.g., for knowledge checks, but potentially disabled for graded assessments until released by instructor).
  - MAY use features like question shuffling or time limits if suitable for the specific activity design.
  - Settings for showing results automatically MUST be configured based on the learning path and assessment purpose (e.g., immediate feedback for self-led, delayed for instructor-graded).
- **Microsoft Whiteboard:**
  - MUST include a clear text prompt defining the task within the Whiteboard itself.
  - SHOULD provide a starting template (e.g., basic shapes, zones) if it helps structure the activity.
  - Collaboration features (shared cursors, comments) SHOULD be utilized in instructor-led scenarios.
  - Instructions should specify that learners should export their completed Whiteboard as a PNG image for review or submission where applicable.

### C. Content and Formatting Rules for Exercises/Challenges

- **Linking:** Every Exercise and Challenge MUST be linked directly from the relevant section or module end in the main markdown documentation using the following exact format:
  - `**(URL_to_Tool)**` (e.g., `**(https://snack.expo.dev/...)**`)
  - `**(URL_to_Tool)**` (e.g., `**(https://snack.expo.dev/...)**`)
- **Description within Tool:** The linked tool (Snack, Sandbox, Form, Whiteboard) MUST contain a comprehensive description of the task. This includes clear objectives, step-by-step instructions if necessary, any required starter code or data, and a definition of the expected outcome or success criteria.
- **Capstone Relation:** All Exercises and Challenges MUST be designed with the SpeedyMeds pharmacy/medication theme as their context. Tasks should involve scenarios, data, or UI elements relevant to this theme.
- **Duration Adherence:** Task complexity MUST be carefully calibrated to align with the specified timeframes: Exercises 15-20 minutes, Challenges 30-60 minutes. This requires realistic estimation during design.
- **Solutions:** Complete, working solutions MUST be provided for every Exercise and Challenge. Solutions should be accessible separately from the main activity prompt (e.g., linked from the markdown, provided as a separate Snack/Sandbox link, shared by the instructor for Forms quizzes). Solution code MUST adhere to all code standards outlined in Section IV.D.

### D. Mandatory Table: Activity Tooling Matrix

**Table VI.1: Activity Tooling Matrix**

| **Module Category**               | **Activity Type**                  | **Mandatory Tool**   | **Rationale**                                                 | **Key Implementation Rules**                                     |
| --------------------------------- | ---------------------------------- | -------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Foundational (Web, JS, TS, React) | Coding Exercise/Challenge          | CodeSandbox          | Isolated web environment, avoids premature RN complexity      | README.md, Standard JS/TS Template, Separate Solution Link       |
| React Native Core & Advanced      | Coding Exercise/Challenge          | Expo Snack           | Required RN environment, Expo focus, accessibility            | README.md, Target Expo SDK, Dependencies, Separate Solution Link |
| All Modules                       | Quiz / Knowledge Check / Research  | Microsoft Forms      | Assessment features, ease of use, tracking                    | Clear Prompt, Relevant Form Features, Configurable Feedback      |
| All Modules (where applicable)    | Diagramming / Visual Brainstorming | Microsoft Whiteboard | Collaborative visual canvas, idea structuring                 | Clear Prompt, Template (Optional), Export for Review             |
| All Modules (Optional Support)    | Starter Code / Solutions           | GitHub Repository    | Version control, code distribution (Instructor use primarily) | Standard Repos Only, Link Clearly, Not for Learner Completion    |

_Table VI.1 provides unambiguous guidance on tool selection for practical activities, ensuring consistency and leveraging the strengths of each platform for its intended purpose._

The decision to use a dual-platform approach for coding exercises (CodeSandbox for fundamentals, Expo Snack for React Native) is pedagogically driven. It introduces concepts in an appropriate context without overwhelming learners early on. However, this necessitates clear communication within the course materials. Section introductions, exercise links, and the initial "How to Use This Course" module must explicitly state which platform is being used and why, ensuring learners are not confused by the transition. Managing links and access across two external platforms also requires careful organization by the course administrators or instructors.

Furthermore, the reliance on external, third-party tools (CodeSandbox, Expo Snack, Microsoft Forms, Microsoft Whiteboard) for essential learning activities introduces a dependency risk. Changes to these platforms' UIs, features, or availability could potentially break exercises or render instructions inaccurate. This underscores the critical need for a regular maintenance and validation process for the course content, ensuring all external links remain active and the steps described align with the current state of the tools.

Finally, the requirement for all practical activities to connect back to the SpeedyMeds capstone project provides valuable context and reinforces learning through consistent application. However, it adds a layer of complexity to exercise design. Creators must ensure that each activity not only teaches the target concept effectively but also fits logically within the pharmacy theme. Developing a shared set of reusable capstone-related assets (data models, UI snippets, common scenarios) could significantly aid content creators in meeting this requirement efficiently and consistently across the course.

## VII. Blueprint Governance

This section defines the rules governing the maintenance and application of this blueprint document itself.

### A. Immutability and Control

This blueprint document represents the single, authoritative source of rules and standards for creating the React Native Training Course markdown documentation. All content MUST conform to the specifications outlined herein. Deviation from these standards is not permitted. While the technological landscape evolves , changes to this blueprint must follow a controlled process, ensuring stability and predictability in content creation. It serves as the "hard immutable rules" requested.

### B. Review and Update Process

Modifications to this blueprint may become necessary over time due to significant changes in underlying technologies (e.g., major React Native or Expo releases), updates to best practices, or substantial feedback gathered during course evaluation. Any proposed changes MUST undergo a formal review process involving key stakeholders (e.g., lead instructional designer, lead engineer, project manager). Approved changes MUST be documented, the blueprint version number incremented, and all updates clearly communicated to all content creators and reviewers. This controlled approach balances the need for stability with the necessity of keeping the course relevant and effective.

### C. Enforcement and Compliance

Adherence to this blueprint is mandatory and MUST be verified throughout the content creation lifecycle. Specific checkpoints include:

- **Author Self-Check:** Content creators are responsible for understanding and applying these standards.
- **Peer Review:** Colleagues should review content specifically against blueprint requirements.
- **Subject Matter Expert (SME) Review:** SMEs verify technical accuracy _and_ adherence to specified patterns (e.g., code standards, "under the hood" explanations).
- **Instructional Design (ID) Review:** ID reviewers verify pedagogical soundness, clarity, consistency, and correct implementation of learner adaptation elements.
- **Checklists:** Standardized review checklists derived directly from this blueprint MUST be used in all review phases to ensure systematic and thorough verification.

The establishment of this blueprint as a definitive guide, coupled with a controlled update process and rigorous enforcement through multi-stage reviews, is essential for achieving the desired quality and consistency. While labeled "immutable" to emphasize its authority, the provision for formal updates acknowledges the dynamic nature of the subject matter. The success of the blueprint ultimately depends not just on its content, but on the commitment to its enforcement during the development and review cycles. Utilizing checklists derived from this document will be instrumental in making the enforcement process practical and effective, ensuring that all contributors adhere to the established standards.

## VIII. Conclusion

This blueprint provides a comprehensive and prescriptive framework for developing the markdown documentation for the React Native Training Course. By establishing strict standards for terminology, structure, content elements, pedagogical approaches, and practical activities, it aims to ensure a consistent, high-quality, and effective learning experience that meets the goal of bringing developers to production proficiency in React Native.

The integration of instructional design principles , technical writing best practices , and specific adaptations for diverse learner backgrounds and paths forms the foundation of this blueprint. The mandatory use of visual aids like Mermaid diagrams and the requirement for detailed explanations, particularly for "under the hood" concepts and code examples, are designed to foster deep understanding. The carefully chosen tooling strategy for exercises balances pedagogical needs with practical constraints.

Successful implementation requires not only adherence to the rules laid out but also a commitment to the underlying principles of clarity, accuracy, consistency, and learner-centricity. The demands for content depth and ongoing maintenance in a rapidly evolving ecosystem necessitate dedicated resources and a proactive approach to keeping the material current. Rigorous enforcement through structured review processes is critical to realizing the blueprint's potential. By following this blueprint diligently, the development team can create a world-class training resource that effectively empowers developers to master React Native.
