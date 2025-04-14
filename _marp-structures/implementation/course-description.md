# React Native Training Course Requirements

## Goal
The goal of the course is for the participants to be proficient in React Native and able to do production development after completion. 

## Parameters
### Learning Paths
The course is designed to support multiple learning paths:

#### Instructor-Led
content: All course content
duration: 4 weeks
Approach: Collaborative
includes: 
1. daily 1-hour instructor led sessions
2. self-directed learning
3. instructor support through Webex chat and huddles
4. Access to Webex channel for collaboration with other developers
5. Access to Github repo with capstone project
6. Access through confluence documentation

#### Self-led
content: All course content
duration: Self-paced but designed for completion in 4 weeks
Approach: independent learning with collaborative resources upon request
includes: 
1. self-directed learning
2. Access to Confluence documentation
3. Access to Articulate 360 course
4. instructor support through Webex chat and huddles (upon request)
5. Access to Webex channel for collaboration with other developers (upon request)
6. Access to Github repo with capstone project (upon request)

#### Asynchronous
content: Specific topics determined on an as needed basis by the user
duration: Self-determined
includes: 
1. self-directed learning
2. Access to Confluence documentation
3. Access to Articulate 360 course
4. instructor support through Webex chat and huddles (upon request)
5. Access to Webex channel for collaboration with other developers (upon request)
6. Access to Github repo with capstone project (upon request)

### Participant backgrounds and experience 
The course is specifically designed for developers proficient in one of the following. 

1. native android development
2. native iOS development
3. web development with React
4. web development with angular

### Course distribution channels
The course will be accessible via the following channels.

Confluence documentation
Online course made with articulate 360
Github repo with capstone project
Live Instructor-led training sessions
Webex channels and instructor support

### Approach
Use the ADDIE Model
Use the Microsoft Writing Style Guide
Hands on real world experience
Fun, friendly, and collaborative

#### Resources for examples exercises and challenges
codepen or codesandbox
expo snack
Microsoft forms
Microsoft whiteboard
Github Repo(s) - Restricted to only standard repo’s (gists, codespaces and other tools are blocked.)

### Materials

Should be modular so that a single source can support all learning paths. Instructor-lead and self-lead learners should be able to go through the course from start to finish, and async learners should be able to jump in and learn a specific topic independently.
structure, language, tone, and styling must be consistent throughout the course
Materials must always alert and guide the user based on learning path or experience. If a learner could potentially have experience on a certain topic, they can be advised to skim for review as opposed to doing a deep dive. If a topic has more relevance for one learning path or another call it out.
They should always include detailed tie ins to developer experience. If someone is a native developer they should be able to find detailed information on how a topic compares to the native world.
Content should always explain in detail what is going on under the hood. Just saying something is handled by react native automatically is not sufficient. It should explain how the framework handles it.
All information must be accurate up to date with the latest official documentation and best practices.
Content should always be curated using official documentation as sources. Content should essentially be a clone of official documentation but less verbose, more visually engaging, and hands on with links for more details. 
content must include an abundance of links to official documentation and other helpful resources
content should make abundant use of visuals and mermaid diagrams
All examples exercises and challenges should follow a pharmacy/medication theme Ideally tying into the capstone project in some shape or form.
code examples should always be accompanied by detailed descriptions and explanations (at least 200 words)
All code must have comprehensive jsdoc documentation
All React native code must have comprehensive typescript typing and accessibility support
All non react native code may exclude typescript and accessibility support
All react native code will be done in expo snack or in an expo go environment with an iOS simulator
Default to using Expo libraries and dependencies unless unavailable or explicitly instructed otherwise
Exercises should take 15 - 20 minutes
Challenges should take 30 - 60 minutes

### Required topics
1. React Native Fundamentals
a light introduction giving the history of mobile development, from the beginning up through the current state of react native, why react native, some background on how react native works under the hood, and a callout to the react native docs to encourage utilizing official documentation.
2. React Native Environment Setup
Cover only the simplest setup possible with expo go `npx create-expo-app@latest` https://docs.expo.dev/more/create-expo/ and iOS simulator use the expo docs as a guide https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated . Include all relevant commands and troubleshooting steps with very detailed explanations (for example when something like `— legacy-peer-deps` or `rm -rf node_modules` is needed). Be explicit about when to use `npx expo` vs npm and why. https://medium.com/@huzaifaqureshi037/exwhy-you-should-use-npx-expo-install-instead-of-npm-install-in-expo-react-native-app-07d6156f064a. Also include a walkthrough of expos default template, including file structure, tools and configurations.
3. Web Development Essentials
a light intro to web development, html, and css to help understand the core concepts of react native
4. JavaScript Essentials
Make sure to use typescript in all examples, exercises and challenges from this point forward
5. React Essentials
6. TypeScript Essentials
7. React Native Components
Include core and custom components
8. React Native Hooks
Include core and custom hooks
9. React Native UI and Styling
Make sure to cover StyleSheet, styled-components, and ui libraries such as React Native Paper
10. Performance and Debugging
11. Navigation and Routing
Make sure to cover Expo Routing as well as react navigation
12. React Native User Input and forms
13. State Management
Exclude redux. Include context api, zustand and react-query, aka useQuery
14. Native Modules
15. EAS and publishing
16. Advanced Features
Animations, and other advanced features, etc.17. Capstone project
A real world development experience where the instructor and participants collaborate to build an app in a traditional dev team environment. Project contains scaffolding and configurations set up so that the team can work together to build out functionality.

#### Capstone Project Description: SpeedyMeds - React Native Training Capstone Scaffolding

**Purpose & Overview:**
SpeedyMeds is a **template repository** designed as the starting point (scaffolding) for a capstone project within a React Native training course. Its primary goal is to provide students with a pre-configured, best-practice-oriented environment, allowing them to immediately focus on applying React Native concepts to build a functional mobile pharmacy application. The project emphasizes modern frameworks, strong typing, component architecture, state management, navigation, styling, code quality, and testing. The `main` branch contains this scaffolding, while a `completed-example` branch serves as a reference. Development work is intended to occur in group-specific forks of this template.

**Functionality & Current Status (Scaffolding):**
The scaffolding provides a functional base application with core navigation and some partially implemented screens based on provided UI mockups:
*   **Navigation:** A bottom tab navigator (`MainTabNavigator.tsx`) allows switching between Home, Prescriptions, Orders, and Account screens. The Orders tab uses a nested stack navigator (`OrdersStackNavigator.tsx`). Navigation is powered by React Navigation v6.
*   **Home Screen:** Displays a welcome message, placeholder cards, and functional navigation links to Prescriptions and Orders. Includes a working theme switcher (Light/Dark/System).
*   **Prescriptions Screen:** Shows a list of mock prescriptions fetched via React Query, with filtering functionality based on drug name.
*   **Orders Screen:** Displays a list of mock orders. Navigation *to* the Order Detail screen is set up.
*   **Order Detail Screen:** Exists as a placeholder (`OrderDetailScreen.tsx`), but the UI and logic are **not implemented** in the scaffolding. This is a key area for student development.
*   **Account Screen:** Shows basic user profile information and placeholder action items.
*   **Theming:** Fully functional light/dark/system theme support using React Native Paper, Styled Components, and a custom `ThemeContext`.

**Technology Stack & Key Concepts:**
The project leverages a modern React Native stack:
*   **Core:** React Native (0.76.x), Expo SDK (~52)
*   **Language:** TypeScript (5.x)
*   **Navigation:** React Navigation (v6 - Stack & Tabs)
*   **UI & Styling:** React Native Paper (v5 - Material Design 3), Styled Components
*   **State Management:** TanStack Query (v5) for server state (data fetching/caching from mock API) and Zustand (v5) for global client state.
*   **Testing:** Jest (~29.7) and React Native Testing Library (v13) for unit/component testing.
*   **Code Quality:** ESLint and Prettier for linting and formatting.
*   **Mock Data:** Faker.js (v9) for generating realistic development data.
*   **Utilities:** `@react-native-community/netinfo` for network status awareness.

**Workflows & Configuration:**
*   **Development:** Started via `npx expo start` (scripts: `start`, `ios`, `android`). Dependencies managed via `npx expo install` or `npm`/`yarn`.
*   **Code Quality:** Enforced via `npm run lint` and `npm run format`.
*   **Testing:** Executed via `npm test` (watch mode) or `npm run test:ci`. Coverage reports generated with `npm run test:coverage`.
*   **Configuration:** Managed through `app.json` (Expo), `tsconfig.json` (TypeScript), `.eslintrc.js`, `prettierrc.js`, `jest.config.js`, and `jest.setup.js`.
*   **Collaboration:** Intended workflow involves students working on feature branches within their group's fork, using Pull Requests for code review (details in `CONTRIBUTING.md`).

**Dependencies:**
Key dependencies include `expo`, `react`, `react-native`, `@react-navigation/*`, `react-native-paper`, `styled-components`, `@tanstack/react-query`, `zustand`, and development dependencies like `typescript`, `eslint`, `prettier`, `jest`, `@testing-library/react-native`, and `@faker-js/faker`.

**Remaining Work (for Students):**
The primary remaining work involves building out the features based on the provided scaffolding and mockups. This includes implementing the UI and logic for screens like Order Detail, potentially adding more complex state interactions, writing comprehensive tests for new and existing components/screens, and refining the overall application functionality.

