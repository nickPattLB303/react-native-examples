# SpeedyMeds - React Native Training Capstone Project

[![React Native](https://img.shields.io/badge/React%20Native-0.7x-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2051-blue?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 🚀 Overview

Welcome to the SpeedyMeds **Template Repository**! This project provides the **scaffolding** (starting codebase) for the capstone project in a React Native training course. Its primary goal is to offer a pre-configured environment where participants can immediately begin applying React Native concepts to build a functional mobile pharmacy application.

**Course Structure:** This template repository is typically **forked** for each training group. Students work collaboratively within their assigned group's fork. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the specific workflow.

This scaffolding emphasizes best practices in:

- **Modern Frameworks:** Utilizing React Native with Expo for streamlined development.
- **Strong Typing:** Leveraging TypeScript for enhanced code quality and maintainability.
- **Component Architecture:** Building reusable UI components.
- **State Management:** Implementing both client-side (Zustand) and server-side (TanStack Query) state management strategies.
- **Navigation:** Structuring app flow with React Navigation (Stack & Tabs).
- **Styling & Theming:** Combining React Native Paper (Material Design) and Styled Components for flexible UI design with light/dark mode support.
- **Code Quality:** Enforcing standards with ESLint and Prettier.
- **Testing:** Setting up unit and component tests using Jest and React Native Testing Library.
- **Development Workflow:** Following a collaborative workflow within a dedicated group repository (details in [CONTRIBUTING.md](./CONTRIBUTING.md)).

The aim is to provide a **robust starting point (scaffolding)** for the course project, allowing students to focus on feature development while learning how common tools and patterns integrate in React Native. This `main` branch contains the scaffolding code; a completed version exists on the `completed-example` branch for reference.

---

## 🎨 UI Mockups (Target Design)

These images represent the intended final look and feel of the application's core screens. The current implementation status is noted in the "Key Features" section below.

**Dashboard:**
![Dashboard Mockup](./assets/images/dashboard.svg)

**Prescriptions:**
![Prescriptions Mockup](./assets/images/prescriptions.svg)

**Order Detail:**
![Order Detail Mockup](./assets/images/orders.svg)

**Account:**
![Account Mockup](./assets/images/account.svg)

---

## 🎯 Target Audience

This repository serves two main audiences:
- **Instructors:** Use this repository as the **template** to fork for new training groups.
- **Students:** Clone your assigned **group fork** to begin the capstone project. The code here represents the starting point (`main` branch) and a potential reference (`completed-example` branch).

---

## ✨ Key Features (Current Implementation Status)

This section outlines the core features based on the mockups and their **current development status**.

- ✅ **Home Dashboard:** Displays welcome message, placeholder balance card, navigation cards (Prescriptions & Orders are functional), and a basic medication reminders list. Theme switcher (Light/Dark/System) is fully functional.
- ✅ **Prescriptions Screen:** Displays a list of mock prescriptions with drug name, dosage, patient info, refills, status badges (OK/Low/Critical), and alerts (Price Rising). Includes a functional search bar that filters the list by drug name.
- ❌ **Order Detail Screen:** A placeholder screen exists (`OrderDetailScreen.tsx`), but the UI and logic are **not yet implemented**. Navigation _to_ this screen from the Orders list is functional.
- ✅ **Account Screen:** Displays a user profile summary (avatar, name, birth year, member ID). Includes a list of placeholder navigation items (Personal Info, Payment, etc.) that log to the console when pressed (no actual navigation yet). Placeholder Log Out button also logs to console.
- ✅ **Global Navigation:** A consistent bottom tab navigator allows switching between Home, Prescriptions, Orders, and Account screens. Icons are displayed correctly.
- ✅ **Theming:** Supports Light, Dark, and System theme preferences via `ThemeContext` and React Native Paper/Styled Components integration. Changes apply instantly across the app.

---

## 🛠️ Technology Stack & Key Concepts

This project utilizes the following core technologies and demonstrates key concepts:

- **React Native:** Framework for building native mobile apps using React. ([Docs](https://reactnative.dev/docs/getting-started))
  - _Concepts:_ Core Components (`View`, `Text`, `FlatList`), Styling (StyleSheet, Flexbox), Platform APIs (`Platform`, `AppState`, `useColorScheme`).
- **Expo:** Platform and toolset simplifying React Native development, builds, and workflows. ([Docs](https://docs.expo.dev/))
  - _Concepts:_ Managed Workflow, Expo CLI (`npx expo start`), `app.json` configuration, Expo Go app, Development Builds.
- **TypeScript:** Superset of JavaScript adding static typing for improved code reliability. ([Docs](https://www.typescriptlang.org/docs/))
  - _Concepts:_ Type Safety, Interfaces (`interface`), Enums (`enum`), Generics, Type Utilities, `tsconfig.json`.
- **React Navigation (v6):** Routing and navigation solution for React Native apps. ([Docs](https://reactnavigation.org/))
  - _Concepts:_ Stack Navigator (`createNativeStackNavigator`), Bottom Tab Navigator (`createBottomTabNavigator`), Nested Navigators, Type Checking Navigators (`ParamList`, `ScreenProps`), Theming Integration.
- **React Native Paper (v5 - MD3):** UI component library providing pre-built Material Design 3 components and theming capabilities. ([Docs](https://callstack.github.io/react-native-paper/))
  - _Concepts:_ Material Design 3, Component Usage (`Button`, `List`, `Card`, `Searchbar`, `Badge`), Theming (`PaperProvider`), Dark Mode Support.
- **Styled Components:** CSS-in-JS library for component-level styling with full JavaScript power. ([Docs](https://styled-components.com/))
  - _Concepts:_ Tagged Template Literals, Dynamic Styling (based on props), Theme Integration (`ThemeProvider`), TypeScript Integration (`styled.d.ts`).
- **TanStack Query (React Query v5):** Powerful library for managing asynchronous "server state" (data fetching, caching, synchronization). ([Docs](https://tanstack.com/query/v5/docs/react/overview))
  - _Concepts:_ Server State vs Client State Distinction, `useQuery` Hook, Query Keys, Caching (`staleTime`, `cacheTime`), Background Updates, React Native Integration (Focus/Online Refetching).
- **Zustand:** Minimalist global client-side state management library. ([Docs](https://docs.pmnd.rs/zustand/getting-started/introduction))
  - _Concepts:_ Centralized Store (`create`), Actions, Hook-based Access (`useStore`), Selectors for Performance Optimization.
- **ESLint & Prettier:** Tools for code linting (identifying potential errors/bad practices) and automatic code formatting.
  - _Concepts:_ Code Quality Enforcement, Style Consistency, Configuration (`.eslintrc.js`, `prettierrc.js`), Editor Integration (Format on Save).
- **Faker.js:** Library for generating realistic mock/fake data (used as a dev dependency). ([Docs](https://fakerjs.dev/))
  - _Concepts:_ Mocking API responses for development and testing.
- **Jest & React Native Testing Library (RNTL):** Framework and library for unit and component testing. ([Jest Docs](https://jestjs.io/docs/getting-started), [RNTL Docs](https://callstack.github.io/react-native-testing-library/))
  - _Concepts:_ Test Setup (`jest.config.js`, `jest.setup.js`), Writing Tests (`describe`, `it`, `expect`), Mocking (`jest.mock`), User-Centric Testing Philosophy.
- **@react-native-community/netinfo:** Detects network connection status and details. ([GitHub](https://github.com/react-native-netinfo/react-native-netinfo))
  - _Concepts:_ Native Module Integration, Network Awareness for features like offline support or query retries.

---

## 🚀 Getting Started

Follow these steps to set up and run the **scaffolding project** locally. If you are a student, you should perform these steps within your assigned **group fork repository**, not this template repository.

### Prerequisites

- **Node.js:** LTS version recommended (e.g., 18.x, 20.x). Check `.nvmrc` if present. [Download Node.js](https://nodejs.org/)
- **Package Manager:** npm (comes with Node.js) or Yarn Classic.
- **Git:** For cloning and version control. [Download Git](https://git-scm.com/)
- **Code Editor:** VS Code is highly recommended with extensions: ESLint, Prettier - Code formatter. [Download VS Code](https://code.visualstudio.com/)
- **Mobile Development Environment:**
  - **iOS:** macOS with Xcode installed.
  - **Android:** Android Studio installed (for SDK and emulator management).
- **(Optional) Expo Go App:** For testing on physical devices. [Install Expo Go](https://expo.dev/go)

➡️ **Detailed Setup:** For comprehensive environment setup instructions (Xcode command-line tools, Android SDK paths, emulator creation, troubleshooting), please refer to **[SETUP.md](./SETUP.md)**.

### Installation

1.  **Clone the Correct Repository:**
    - **Instructors:** Clone this template repository if you need to modify the base scaffolding.
    - **Students:** Clone **your assigned group fork repository**. Your instructor will provide the URL.
    ```bash
    # Example for a student in the 'Apr' group:
    # git clone [URL for SpeedyMeds-Group-Apr]
    # cd SpeedyMeds-Group-Apr
    git clone <YOUR_ASSIGNED_REPOSITORY_URL>
    cd <REPOSITORY_DIRECTORY_NAME>
    ```
2.  **Install Dependencies:** Use `npx expo install` to ensure compatible package versions.
    ```bash
    npx expo install
    ```
    - **Why `npx expo install`?** It wraps `npm install` or `yarn add`, checking package versions against the project's Expo SDK version for compatibility, especially for libraries with native code. Using `npm install` directly might lead to version conflicts. [More Info](https://docs.expo.dev/workflow/expo-cli/#installation).
    - **Adding New Packages:** Prefer `npx expo install [package-name]` for potentially native libraries. Use `npm install [package-name]` or `yarn add [package-name]` for pure JS libraries.
    - **Peer Dependencies:** If you encounter peer dependency errors, you might need the `--legacy-peer-deps` flag (use cautiously): `npx expo install [package] -- --legacy-peer-deps`. For persistent issues, try removing `node_modules` and `package-lock.json` / `yarn.lock` and running `npm install --legacy-peer-deps` or `yarn install`.

### Running the App

1.  **Start Simulator/Emulator:** Launch your desired iOS Simulator (from Xcode) or Android Emulator (from Android Studio).
2.  **Check `.env`:** See [SETUP.md](./SETUP.md) if any environment variables are needed (e.g., for network configurations).
3.  **Start Metro Bundler:**
    ```bash
    npx expo start
    # Or, for potentially more stable simulator connections:
    # npx expo start --localhost
    ```
4.  **Open in Simulator/Emulator/Device:**
    - Press `i` in the terminal → Open on iOS Simulator.
    - Press `a` in the terminal → Open on Android Emulator.
    - Scan the QR code with the Expo Go app on your phone (must be on the same Wi-Fi network as your computer).

### Debugging

- **Expo DevTools:** Press `j` in the Metro terminal to open the debugger UI in your browser. This provides access to console logs, React DevTools (component inspection), network requests, and more.
- **React Native Debugger (Standalone):** A powerful standalone app combining Chrome DevTools, React DevTools, and Redux DevTools. (Requires separate installation).

➡️ **Detailed Debugging Guide:** See [docs/setup/debugging-config.md](./docs/setup/debugging-config.md).

### Running Tests

```bash
# Run tests in interactive watch mode
npm test
# or
yarn test

# Run tests once (e.g., for CI)
npm run test:ci
# or
yarn test:ci

# Run tests and generate a coverage report
npm run test:coverage
# or
yarn test:coverage
```

➡️ **Detailed Testing Guide:** See [docs/setup/testing-config.md](./docs/setup/testing-config.md).

---

## 📂 Project Structure

```
SpeedyMeds/
├── .github/              # GitHub specific files (PR/Issue templates, workflows)
├── .vscode/              # VS Code specific settings (recommended extensions, format on save)
├── __tests__/            # Config/setup for tests (may contain top-level integration tests later)
├── assets/               # Static assets (images, fonts)
│   ├── images/           # SVG mockups, icons, etc.
│   └── ...               # Default Expo icons/splash
├── docs/                 # Project documentation (guides, architecture decisions)
│   └── setup/            # Detailed setup guides for tools/libraries
├── src/                  # Application source code
│   ├── api/              # Data fetching logic, API client setup, mock data, query keys
│   ├── components/       # Reusable UI components shared across screens
│   │   └── __tests__/    # Unit/component tests specific to components
│   ├── context/          # React Context providers (e.g., ThemeContext)
│   │   └── __tests__/    # Tests for context logic
│   ├── hooks/            # Custom React hooks (e.g., useInitializeAppData)
│   │   └── __tests__/    # Tests for custom hooks
│   ├── navigation/       # Navigation setup (React Navigation stacks, tabs, types)
│   ├── screens/          # Screen components (individual views/pages of the app)
│   │   └── __tests__/    # Tests specific to screen components
│   ├── stores/           # Global state management stores (Zustand)
│   │   └── __tests__/    # Tests for store actions and logic
│   ├── test-utils/       # Testing utilities (e.g., custom render function)
│   ├── theme/            # Theming definitions (colors, spacing, typography, Paper/Styled Comp themes)
│   └── types/            # Shared TypeScript interfaces and type definitions
├── .env.example          # Example environment variables (copy to .env if needed)
├── .eslintrc.js          # ESLint configuration (code quality rules)
├── .gitignore            # Files/folders ignored by Git
├── .prettierignore       # Files/folders ignored by Prettier
├── App.tsx               # Root React component, sets up providers (Navigation, Theme, QueryClient)
├── app.json              # Expo configuration file (app metadata, build settings)
├── index.ts              # App entry point (managed by Expo)
├── jest.config.js        # Jest configuration (test runner settings)
├── jest.setup.js         # Jest setup file (global mocks, RNTL setup)
├── package.json          # Project dependencies and scripts
├── prettierrc.js         # Prettier configuration (code formatting rules)
├── tsconfig.json         # TypeScript configuration
├── CHANGELOG.md          # Record of significant project changes
├── CONTRIBUTING.md       # Guidelines for contributing to the project
├── README.md             # This file: Project overview and entry point
├── ROADMAP.md            # High-level project development plan/feature list
├── SETUP.md              # Detailed environment setup guide
└── USAGE.md              # Application usage guide (how features work)
```

---

## 🤝 Course Development Workflow

This template repository itself doesn't typically receive direct contributions during a course. Instead, development occurs within **group-specific forks**.

**Students:** Please refer to the **[CONTRIBUTING.md](./CONTRIBUTING.md)** file **within your assigned group fork repository** for detailed instructions on:
- Cloning the group repository.
- Creating feature branches.
- Committing changes.
- Pushing branches to the group repository.
- Creating Pull Requests (PRs) within the group repository.
- Code review expectations.
- Coding standards and testing requirements.

**Instructors:** The workflow for updating this template repository follows standard practices (branch, commit, PR, merge).

---

## 📚 Documentation Index

- **Environment Setup:** [SETUP.md](./SETUP.md)
- **Contribution Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **How to Use the App:** [USAGE.md](./USAGE.md)
- **(Removed/Simplified in Scaffolding):** `ROADMAP.md`
- **Version History:** [CHANGELOG.md](./CHANGELOG.md)
- **Tooling Setup Guides (`docs/setup/`):**
  - [Expo Config (`app.json`)](./docs/setup/app-json-config.md)
  - [TypeScript Config (`tsconfig.json`)](./docs/setup/tsconfig-config.md)
  - [Linting & Formatting (ESLint, Prettier)](./docs/setup/linting-formatting-config.md)
  - [Navigation (React Navigation)](./docs/setup/navigation-setup.md)
  - [UI & Styling (Paper, Styled Comp.)](./docs/setup/ui-styling-setup.md)
  - [Mock Data (Faker.js)](./docs/setup/mock-data-faker-setup.md)
  - [Data Fetching (React Query)](./docs/setup/data-fetching-react-query-setup.md)
  - [State Management (Zustand)](./docs/setup/state-management-zustand-setup.md)
  - [Testing (Jest, RNTL)](./docs/setup/testing-config.md)
  - [Debugging Tools](./docs/setup/debugging-config.md)

---

## 📞 Contact & Support

For questions related to the course material or this specific capstone project, please use the designated course communication channel (e.g., WebEx, Slack, Forum).

For bugs, feature requests, or suggestions related to the project's codebase itself, please **open an issue** on the project's GitHub repository.

---
