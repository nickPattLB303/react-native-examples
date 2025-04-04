# SpeedyMeds - React Native Training Capstone Project

[![React Native](https://img.shields.io/badge/React%20Native-0.7x-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2051-blue?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)

## Overview

Welcome to the SpeedyMeds project! This application serves as the **capstone project** for the React Native training course. Its primary purpose is to provide a comprehensive, hands-on learning experience where participants apply fundamental and advanced React Native concepts to build a functional mobile pharmacy application from scratch.

This project aims to simulate a professional development environment, emphasizing best practices in:

- **Code Quality:** Using TypeScript, ESLint, and Prettier.
- **Architecture:** Implementing clear separation of concerns (UI, state, API, navigation).
- **State Management:** Utilizing Zustand for global state and TanStack Query for server state.
- **Styling & Theming:** Combining React Native Paper and Styled Components with light/dark mode support.
- **Navigation:** Implementing robust navigation using React Navigation (Stack & Tabs).
- **Testing:** Setting up Jest and React Native Testing Library for unit/component tests.
- **Workflow:** Adhering to standard practices like GitHub Flow, Pull Requests (PRs), code reviews, and issue tracking.
- **Documentation:** Maintaining clear and helpful documentation for setup, usage, and architecture.

The goal is to create an **exemplary learning resource** that showcases how these tools and concepts integrate in a real-world (albeit simulated) application, providing a solid foundation for novice React Native developers.

### UI Mockups

_(These represent the target design and features for the application)_

**Dashboard:**
![Dashboard](./assets/images/dashboard.svg)

**Prescriptions:**
![Prescriptions](./assets/images/prescriptions.svg)

**Order Detail:**
![Order Detail](./assets/images/orders.svg)

**Account:**
![Account](./assets/images/account.svg)

## Target Audience

This repository is primarily intended for developers participating in the associated React Native training course. However, it can also serve as a reference for anyone learning React Native and looking for examples of integrating common libraries and patterns.

## Key Features (Based on Mockups - Current Status: Skeleton Implemented)

- **Home Dashboard:** Displays welcome message, placeholder balance, placeholder navigation cards (Prescriptions/Orders navigate), and basic medication reminders list. Theme switcher functional.
- **Prescriptions Screen:** Displays a list of prescriptions with basic info, status badges, and alerts. Includes a placeholder search bar (no filtering logic yet).
- **Order Detail Screen:** Placeholder screen exists but is not yet implemented.
- **Account Screen:** Displays user profile summary (avatar, name, ID) and placeholder navigation list items (no navigation logic yet). Placeholder Log Out button.
- **Global Navigation:** Consistent bottom tab bar for Home, Prescriptions, Orders, and Account sections, with appropriate icons.
- **Theming:** Supports Light, Dark, and System theme preferences.

## Technology Stack & Key Concepts Demonstrated

This project utilizes the following core technologies and demonstrates key concepts:

- **React Native:** Framework for building native mobile apps using React. ([Official Docs](https://reactnative.dev/docs/getting-started))
  - _Concepts:_ Core Components, Styling, Platform APIs (`Platform`, `AppState`).
- **Expo:** Platform and toolset simplifying React Native development, builds, and workflows. ([Official Docs](https://docs.expo.dev/))
  - _Concepts:_ Managed Workflow, Expo CLI, `app.json` configuration, Expo Go, Development Builds (implied).
- **TypeScript:** Superset of JavaScript adding static typing. ([Official Docs](https://www.typescriptlang.org/docs/))
  - _Concepts:_ Type Safety, Interfaces, Enums, Generics (`tsconfig.json`, Type Utilities).
- **React Navigation (v6):** Routing and navigation solution. ([Official Docs](https://reactnavigation.org/))
  - _Concepts:_ Stack Navigator, Bottom Tab Navigator, Nested Navigators, Type Checking Navigators, Theming Integration.
- **React Native Paper (v5 - MD3):** UI component library & theming. ([Official Docs](https://callstack.github.io/react-native-paper/))
  - _Concepts:_ Material Design 3, Component Usage, Theming (`PaperProvider`), Dark Mode.
- **Styled Components:** CSS-in-JS for component styling/customization. ([Official Docs](https://styled-components.com/))
  - _Concepts:_ Tagged Template Literals, Theme Integration (`ThemeProvider`), TypeScript Integration (`styled.d.ts`).
- **TanStack Query (React Query v5):** Asynchronous state management (data fetching, caching). ([Official Docs](https://tanstack.com/query/v5/docs/react/overview))
  - _Concepts:_ Server State vs Client State, `useQuery`, Query Keys, Caching (`staleTime`), React Native Integration (Focus/Online Management).
- **Zustand:** Minimalist global client-side state management. ([Official Docs](https://docs.pmnd.rs/zustand/getting-started/introduction))
  - _Concepts:_ Centralized Store, Actions, Hook-based Access, Selectors (implied).
- **ESLint & Prettier:** Code linting and formatting.
  - _Concepts:_ Code Quality Enforcement, Style Consistency, Configuration (`.eslintrc.js`, `prettierrc.js`), Editor Integration.
- **Faker.js:** Library for generating realistic mock data (dev dependency). ([Official Docs](https://fakerjs.dev/))
  - _Concepts:_ Mocking APIs, Development Tooling.
- **Jest & React Native Testing Library (RNTL):** Unit and component testing. ([Jest Docs](https://jestjs.io/docs/getting-started), [RNTL Docs](https://callstack.github.io/react-native-testing-library/))
  - _Concepts:_ Test Setup (`jest.config.js`, `jest.setup.js`), Writing Tests, User-Centric Testing.
- **@react-native-community/netinfo:** Detects network connection status. ([GitHub Repo](https://github.com/react-native-netinfo/react-native-netinfo))
  - _Concepts:_ Native Module Integration, Network Awareness.

## Getting Started

### Prerequisites

- **Node.js:** LTS version recommended (check `.nvmrc` if present). [Download Node.js](https://nodejs.org/)
- **npm or Yarn:** Package manager (npm comes with Node.js).
- **Git:** For version control. [Download Git](https://git-scm.com/)
- **Code Editor:** VS Code with recommended extensions (ESLint, Prettier) is highly suggested. [Download VS Code](https://code.visualstudio.com/)
- **iOS Simulator:** Requires Xcode (macOS only).
- **Android Emulator:** Requires Android Studio (Setup can be complex).
- **(Optional) Expo Go App:** For testing on physical devices. [Expo Go](https://expo.dev/go)

_(See [SETUP.md](./SETUP.md) for more detailed environment setup instructions, especially for simulators/emulators and potential troubleshooting.)_

### Setup

1.  **Clone the Repository:**
    ```bash
    # Replace [Your Repository URL] with the actual URL from GitHub/GitLab/etc.
    git clone [Your Repository URL]
    cd SpeedyMeds
    ```
2.  **Install Dependencies:** Use `npx expo install` for installing packages listed in `package.json`. This command is crucial as it ensures versions compatible with the project's Expo SDK are installed.

    ```bash
    npx expo install
    ```

    - **Why `npx expo install`?** It acts as a wrapper around `npm install` or `yarn add`, automatically selecting compatible versions of common React Native libraries based on the Expo SDK version specified in `app.json`. Using `npm install` directly can sometimes lead to version mismatches and runtime errors. See [Why Use "npx expo install"](https://medium.com/@huzaifaqureshi037/exwhy-you-should-use-npx-expo-install-instead-of-npm-install-in-expo-react-native-app-07d6156f064a).
    - **Adding New Packages:** Always prefer `npx expo install [package-name]` when adding new libraries that might have native dependencies. For pure JavaScript libraries, `npm install [package-name]` or `yarn add [package-name]` is usually fine.
    - **Peer Dependency Issues:** Occasionally, even with `npx expo install`, you might encounter "peer dependency" warnings or errors due to complex dependency trees. If installation fails, you might need the `--legacy-peer-deps` flag (use with caution):

      ```bash
      # Example for installing a new package with the flag
      npx expo install [package-name] -- --legacy-peer-deps

      # Example for reinstalling all packages if needed (last resort)
      # rm -rf node_modules package-lock.json && npm install --legacy-peer-deps
      ```

### Running the App (Simulators/Emulators Recommended)

1.  **Ensure Simulator/Emulator is Running:** Launch your preferred iOS Simulator (via Xcode) or Android Emulator (via Android Studio). See [SETUP.md](./SETUP.md).
2.  **Create `.env` File (If Required):** Check [SETUP.md](./SETUP.md) for any required environment variables (like `NODE_TLS_REJECT_UNAUTHORIZED=0` if facing specific network issues).
3.  **Start the Development Server:** Using `--localhost` is often recommended for simulator/emulator builds to avoid potential network issues.
    ```bash
    npx expo start --localhost
    ```
    - Alternatively, just `npx expo start` might work depending on your network setup.
4.  **Open the App:** Follow the prompts in the terminal:
    - Press `i` to open on the iOS Simulator.
    - Press `a` to open on the Android Emulator.
    - Scan the QR code with the Expo Go app on a physical device (ensure device and computer are on the same network).

### Debugging

The primary debugging tool is the **React Native DevTools**, integrated with Expo.

1.  With the Metro server running (`npx expo start`), press `j` in the terminal.
2.  This opens a browser tab with tools for console logs, component inspection (React DevTools), network requests, source maps (breakpoints), and performance profiling.

See [docs/setup/debugging-config.md](./docs/setup/debugging-config.md) for a detailed overview of all debugging tools and techniques.

### Running Tests

Unit and component tests are run using Jest and React Native Testing Library.

```bash
# Run tests in watch mode (reruns on file changes)
npm run test
# or
yarn test

# Run tests once and generate coverage report (if configured in package.json)
# npm run test:coverage
```

See [docs/setup/testing-config.md](./docs/setup/testing-config.md) for details on the testing setup.

_(See [USAGE.md](./USAGE.md) for more details on using the application as features are built.)_

## Project Structure

```
SpeedyMeds/
├── .github/              # GitHub specific files (PR/Issue templates)
├── .vscode/              # VS Code specific settings (recommended extensions, format on save)
├── __tests__/            # Unit and integration tests (Jest/RNTL)
├── assets/               # Static assets (images, fonts, icons)
│   ├── images/           # SVG mockups, other image assets
│   └── ...               # Default Expo icons/splash
├── docs/                 # Project documentation (guides, architecture)
│   └── setup/            # Detailed setup guides for tools/libraries
├── src/                  # Application source code
│   ├── api/              # API layer (fetching logic, mock data, query keys)
│   ├── components/       # Reusable UI components (Currently Empty)
│   ├── context/          # React Context providers (e.g., ThemeContext)
│   ├── hooks/            # Custom React hooks (e.g., useInitializeAppData)
│   ├── navigation/       # Navigation setup (React Navigation stacks, tabs, types)
│   │   ├── types.ts
│   │   ├── OrdersStackNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── AppNavigator.tsx  # Root navigator & container setup
│   ├── screens/          # Screen components (individual views of the app)
│   ├── stores/           # Global state management stores (Zustand)
│   ├── theme/            # Theming definitions (colors, spacing, typography, etc.)
│   └── types/            # Shared TypeScript interfaces and type definitions
├── .env.example          # Example environment variables (if needed)
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── .prettierignore       # Prettier ignore file
├── App.tsx               # Root React component, sets up providers
├── app.json              # Expo configuration file
├── index.ts              # App entry point (managed by Expo)
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file (e.g., for RNTL matchers)
├── package.json          # Project dependencies and scripts
├── prettierrc.js         # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── CHANGELOG.md          # Record of project changes
├── CONTRIBUTING.md       # Contribution guidelines
├── README.md             # This file
├── ROADMAP.md            # Project development plan/feature list
├── SETUP.md              # Detailed environment setup guide
└── USAGE.md              # Application usage guide (how to run/use features)
```

## Development Workflow

This project follows the **GitHub Flow** branching strategy. Writing unit tests for new features and bug fixes is strongly encouraged. Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines, coding standards, testing expectations, and the Pull Request process.

## Documentation Index

- **Getting Started:** [SETUP.md](./SETUP.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Using the App:** [USAGE.md](./USAGE.md)
- **Project Plan:** [ROADMAP.md](./ROADMAP.md)
- **Change History:** [CHANGELOG.md](./CHANGELOG.md)
- **Setup Guides (`docs/setup/`):**
  - [Expo Config (`app.json`)](./docs/setup/app-json-config.md)
  - [TypeScript Config (`tsconfig.json`)](./docs/setup/tsconfig-config.md)
  - [Linting & Formatting (ESLint, Prettier)](./docs/setup/linting-formatting-config.md)
  - [Navigation Setup (React Navigation)](./docs/setup/navigation-setup.md)
  - [UI Library & Styling (Paper, Styled Comp.)](./docs/setup/ui-styling-setup.md)
  - [Mock Data Generation (Faker.js)](./docs/setup/mock-data-faker-setup.md)
  - [Data Fetching & Caching (React Query)](./docs/setup/data-fetching-react-query-setup.md)
  - [State Management (Zustand)](./docs/setup/state-management-zustand-setup.md)
  - [Testing Setup (Jest, RNTL)](./docs/setup/testing-config.md)
  - [Debugging Tools](./docs/setup/debugging-config.md)

## Contact & Support

For questions related to the course or this project, please use the designated course communication channel (e.g., WebEx, Slack). For bugs or feature requests related to the project code itself, please open an issue on GitHub.
