# SpeedyMeds - React Native Training Capstone Project Starting Point

[![React Native](https://img.shields.io/badge/React%20Native-0.7x-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-blue?logo=expo)](https://docs.expo.dev/get-started/create-a-new-app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 🚀 Overview

Welcome to the SpeedyMeds **Starting Point**! This repository provides the foundation for the capstone project in a React Native training course. Its primary goal is to offer a pre-configured environment with the core architecture already set up, allowing participants to immediately begin applying React Native concepts to build a functional mobile pharmacy application by implementing UI and features.

**Course Structure:** This repository (or a group-specific fork) serves as the starting code. Participants work collaboratively or individually based on course instructions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the specific contribution workflow if applicable.

This starting point emphasizes best practices and includes a ready-to-use setup for:

- **Modern Frameworks:** Utilizing React Native with Expo for streamlined development.
- **Strong Typing:** Leveraging TypeScript for enhanced code quality and maintainability.
- **Component Architecture:** A structure ready for building reusable UI components.
- **State Management:** Pre-configured client-side (Zustand) and server-side (TanStack Query) state management. Includes a global store and data initialization hook pattern.
- **Navigation:** Pre-configured app flow using React Navigation (Native Stack & Bottom Tabs) with types defined.
- **Styling & Theming:** Fully integrated React Native Paper (Material Design 3) and Styled Components with a complete light/dark mode theme system (`ThemeContext`) ready to use.
- **Code Quality:** Enforced standards with ESLint and Prettier.
- **Testing:** Setup for unit and component tests using Jest and React Native Testing Library, including a custom render function with providers.
- **Development Workflow:** Standard setup for running and debugging the app.

The aim is to provide a **robust architectural foundation**, allowing students to focus on implementing screens and features within a well-structured project, learning how common tools and patterns integrate in React Native. This `main` branch contains this starting code.

---

## 🎨 Target UI Mockups

These images provide a general guide for the look and feel of the application's core screens that you will implement. The current state provides placeholders for these screens.

**Dashboard:**
![Dashboard Mockup](./assets/images/dashboard.svg)

**Prescriptions:**
![Prescriptions Mockup](./assets/images/prescriptions.svg)

**Order Detail:**
![Order Detail Mockup](./assets/images/orders.svg)

**Account:**
![Account Mockup](./assets/images/account.svg)

---

## ✨ Key Features & Starting State

This section outlines the pre-configured architecture and the state of the application screens provided in this starting point:

- ✅ **Core Architecture:**
  - **Navigation:** Bottom Tab and Native Stack navigators are fully configured with defined types (`src/navigation/`). Navigation between placeholder screens is functional.
  - **Theming:** Light, Dark, and System theme preferences are supported via `ThemeContext` (`src/context/`) and integrated with React Native Paper/Styled Components (`src/theme/`). Theme definitions (`colors`, `typography`, `spacing`, `shape`) are complete. A `ThemeSelector` component exists (`src/components/`).
  - **State Management:** Zustand (`src/stores/appDataStore.ts`) is set up for global client state. TanStack Query (`App.tsx`, `src/api/queryKeys.ts`) is configured for server state caching and management, including React Native focus/online managers.
  - **Data Fetching:** A simulated API layer (`src/api/`) using mock data (`src/api/mockData.ts`) is included. A hook (`src/hooks/useInitializeAppData.ts`) demonstrates fetching initial data with TanStack Query and syncing to the Zustand store.
  - **Tooling:** TypeScript, ESLint, Prettier, and Jest are fully configured.
- 🟡 **Screens (`src/screens/`):** All main screen files exist (`HomeScreen`, `PrescriptionsScreen`, `OrdersScreen`, `OrderDetailScreen`, `AccountScreen`) but contain **minimal placeholder content**. They render their name and use the theme for background/text color, serving as starting points for implementation.
  - `OrderDetailScreen` placeholder correctly receives and displays the `orderId` navigation parameter.
  - `OrdersScreen` placeholder includes a button to test navigation to the `OrderDetailScreen` placeholder.
  - `AccountScreen` placeholder includes the `ThemeSelector` component to demonstrate theme switching.
- ✅ **Reusable Components (`src/components/`):** Generic components for `LoadingIndicator`, `ErrorDisplay`, `ScreenContainer`, and `ThemeSelector` are provided.
- ✅ **Testing Setup (`src/test-utils/`, `jest.setup.js`):** Configuration and a custom `renderWithProviders` function are ready for testing components within the theme context. Tests for placeholder screens verify basic rendering.
- ✅ **Environment Configuration (`.env`):** A `.env` file is pre-configured at the root with `NODE_TLS_REJECT_UNAUTHORIZED=0` and `REACT_NATIVE_PACKAGER_HOSTNAME=localhost`. This helps bypass potential SSL certificate issues in certain development environments and ensures the Metro bundler connects correctly without needing the `--localhost` flag.

---

## 🛠️ Technology Stack & Key Concepts

This project utilizes the following core technologies and demonstrates key concepts:

- **React Native:** Framework for building native mobile apps using React. ([Docs](https://reactnative.dev/docs/getting-started))
  - _Concepts Demonstrated:_ Core Components (placeholders use `View`, `Text`), Styling (placeholders use `useTheme`), Platform APIs (`Platform` used in `typography.ts`).
- **Expo:** Platform and toolset simplifying React Native development, builds, and workflows. ([Docs](https://docs.expo.dev/))
  - _Concepts Demonstrated:_ Managed Workflow, Expo CLI (`npx expo start`), `app.json` configuration, Expo Go app, Development Builds.
- **TypeScript:** Superset of JavaScript adding static typing for improved code reliability. ([Docs](https://www.typescriptlang.org/docs/))
  - _Concepts Demonstrated:_ Type Safety, Interfaces/Types (`src/types/`), Enums (`src/types/`), Generics (in libraries), Type Utilities (`src/navigation/types.ts`), `tsconfig.json`.
- **React Navigation (v6):** Routing and navigation solution for React Native apps. ([Docs](https://reactnavigation.org/))
  - _Concepts Demonstrated:_ Stack Navigator (`createNativeStackNavigator`), Bottom Tab Navigator (`createBottomTabNavigator`), Nested Navigators, Type Checking Navigators (`ParamList`, `ScreenProps` used in placeholders), Theming Integration.
- **React Native Paper (v5 - MD3):** UI component library providing pre-built Material Design 3 components and theming capabilities. ([Docs](https://callstack.github.io/react-native-paper/))
  - _Concepts Demonstrated:_ Material Design 3, Component Usage (placeholders use `Text`, `useTheme`), Theming (`PaperProvider`), Dark Mode Support (fully configured).
- **Styled Components:** CSS-in-JS library for component-level styling with full JavaScript power. ([Docs](https://styled-components.com/))
  - _Concepts Demonstrated:_ Tagged Template Literals (used in placeholders and components), Theme Integration (`ThemeProvider`, `useTheme`), TypeScript Integration (`styled.d.ts`).
- **TanStack Query (React Query v5):** Powerful library for managing asynchronous "server state" (data fetching, caching, synchronization). ([Docs](https://tanstack.com/query/v5/docs/react/overview))
  - _Concepts Demonstrated:_ Server State vs Client State Distinction, `useQuery` Hook (in `useInitializeAppData`), Query Keys (`queryKeys.ts`), Caching (`staleTime` used), Background Updates, React Native Integration (Focus/Online Refetching configured).
- **Zustand:** Minimalist global client-side state management library. ([Docs](https://docs.pmnd.rs/zustand/getting-started/introduction))
  - _Concepts Demonstrated:_ Centralized Store (`create` in `appDataStore.ts`), Actions, Hook-based Access (`useAppDataStore`), (Selectors demonstrated in tests/hooks).
- **ESLint & Prettier:** Tools for code linting (identifying potential errors/bad practices) and automatic code formatting.
  - _Concepts Demonstrated:_ Code Quality Enforcement, Style Consistency, Configuration (`.eslintrc.js`, `prettierrc.js`), Editor Integration (Format on Save encouraged).
- **Faker.js:** Library for generating realistic mock/fake data (used in `src/api/mockData.ts`).
  - _Concepts Demonstrated:_ Mocking API responses for development and testing.
- **Jest & React Native Testing Library (RNTL):** Framework and library for unit and component testing. ([Jest Docs](https://jestjs.io/docs/getting-started), [RNTL Docs](https://callstack.github.io/react-native-testing-library/))
  - _Concepts Demonstrated:_ Test Setup (`jest.config.js`, `jest.setup.js`), Writing Tests (`describe`, `it`, `expect`), Mocking (`jest.mock` used in tests and setup), Testing Utilities (`renderWithProviders`).
- **@react-native-community/netinfo:** Detects network connection status and details. ([GitHub](https://github.com/react-native-netinfo/react-native-netinfo))
  - _Concepts Demonstrated:_ Native Module Integration, Network Awareness (configured for React Query).

---

## 🚀 Getting Started

Follow these steps to set up and run the **starting point project** locally.

### Prerequisites

- **Node.js:** LTS version recommended.
- **Package Manager:** npm.
- **Git:** For cloning and version control.
- **Code Editor:** VS Code is highly recommended with extensions: ESLint, Prettier - Code formatter. [Download VS Code](https://code.visualstudio.com/)
- **Mobile Development Environment:**
  - **iOS:** macOS with Xcode installed.
  - **Android:** Android Studio installed (for SDK and emulator management).
- **(Optional) Expo Go App:** For testing on physical devices. [Install Expo Go](https://expo.dev/go)

➡️ **Detailed Setup:** For comprehensive environment setup instructions (Xcode command-line tools, Android SDK paths, emulator creation, troubleshooting), please refer to **[SETUP.md](./SETUP.md)**.

### Installation

1.  **Clone the Repository:**
    - **Students:** Clone this repository or your assigned group fork repository.
    ```bash
    # Example:
    git clone <YOUR_REPOSITORY_URL>
    cd <REPOSITORY_DIRECTORY_NAME>
    ```
2.  **Install Dependencies:** Use `npm install --legacy-peer-deps` to ensure compatible package versions.
    ```bash
    npm install --legacy-peer-deps
    ```
    - **Why `--legacy-peer-deps`?** This flag helps avoid installation errors related to conflicting peer dependency requirements common in React Native projects. Use cautiously.
    - **Adding New Packages:** Prefer `npx expo install [package-name]` for libraries with native code. Use `npm install [package-name]` for pure JS libraries.

### Running the App

1.  **Start Simulator/Emulator:** Launch your desired iOS Simulator (from Xcode) or Android Emulator (from Android Studio).
2.  **Start Metro Bundler:** Note that the included `.env` file sets `REACT_NATIVE_PACKAGER_HOSTNAME=localhost`, so the `--localhost` flag is generally not needed here.
    ```bash
    npx expo start
    ```
3.  **Open in Simulator/Emulator/Device:**
    - Press `i` in the terminal → Open on iOS Simulator.
    - Press `a` in the terminal → Open on Android Emulator.
    - Scan the QR code with the Expo Go app on your phone (must be on the same Wi-Fi network as your computer).

### Debugging

- **Expo DevTools:** Press `j` in the Metro terminal to open the debugger UI in your browser. This provides access to console logs, React DevTools (component inspection), network requests, and more.
- **React Native Debugger (Standalone):** A powerful standalone app combining Chrome DevTools, React DevTools, and Redux DevTools. (Requires separate installation).

➡️ **Detailed Debugging Guide:** See `docs/setup/debugging-config.md` or standard Expo/React Native debugging documentation.

### Running Tests

```bash
# Run tests in interactive watch mode
npm test

# Run tests once (e.g., for CI)
npm run test:ci
```

➡️ **Detailed Testing Guide:** See `docs/setup/testing-config.md` or standard Jest/RNTL documentation.

---

## 📂 Project Structure

```
SpeedyMeds/
├── .github/              # GitHub specific files (PR/Issue templates, workflows)
├── .vscode/              # VS Code specific settings (recommended extensions, format on save)
├── __tests__/            # Config/setup for tests (top-level tests if any)
├── assets/               # Static assets (images, fonts)
│   └── ...               # Icons/splash screen images
├── docs/                 # Project documentation (guides, architecture decisions)
│   └── setup/            # Detailed setup guides (if provided beyond base docs)
├── src/                  # Application source code
│   ├── api/              # Data fetching simulation (mockData.ts, index.ts), query keys
│   ├── components/       # Reusable UI components (Loading, Error, Container, ThemeSelector)
│   │   └── __tests__/    # Unit/component tests for components
│   ├── context/          # React Context providers (ThemeContext)
│   │   └── __tests__/    # Tests for context logic
│   ├── hooks/            # Custom React hooks (useInitializeAppData)
│   │   └── __tests__/    # Tests for custom hooks (if applicable)
│   ├── navigation/       # Navigation setup (AppNavigator, MainTabNavigator, OrdersStack, types)
│   ├── screens/          # Screen components (PLACEHOLDERS: Home, Account, Orders, Detail, Prescriptions)
│   │   └── __tests__/    # Tests for screen components (verify placeholders render)
│   ├── stores/           # Global state management stores (Zustand: appDataStore)
│   │   └── __tests__/    # Tests for store actions and logic
│   ├── test-utils/       # Testing utilities (custom renderWithProviders function)
│   ├── theme/            # Theming definitions (colors, spacing, typography, shape, theme assembly)
│   └── types/            # Shared TypeScript interfaces and type definitions
├── .env                  # **IMPORTANT:** Pre-configured env file (DO NOT COMMIT IF MODIFIED)
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
├── CHANGELOG.md          # Record of significant project changes (minimal for starting point)
├── CONTRIBUTING.md       # Guidelines for contributing to the project (essential for group work)
├── README.md             # This file: Project overview and entry point
├── ROADMAP.md            # Describes the starting state and next steps/goals for implementation
├── SETUP.md              # Detailed environment setup guide
└── USAGE.md              # Application usage guide (how to interact with the starting state)
```

---

## 🤝 Course Development Workflow

Development occurs within this repository (or a group-specific fork).

**Students:** Please refer to the **[CONTRIBUTING.md](./CONTRIBUTING.md)** file for detailed instructions on:

- Cloning the repository.
- Branching strategies (if applicable).
- Committing changes (Conventional Commits recommended).
- Pushing branches.
- Creating Pull Requests (PRs) (if applicable).
- Code review expectations.
- Coding standards and testing requirements.

---

## 📚 Documentation Index

- **Environment Setup:** [SETUP.md](./SETUP.md)
- **Contribution Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **How to Use the App (Starting State):** [USAGE.md](./USAGE.md)
- **Starting State & Next Steps:** [ROADMAP.md](./ROADMAP.md)
- **Version History:** [CHANGELOG.md](./CHANGELOG.md)
- **Detailed Tooling Setup Guides (`docs/setup/`):** (Refer to specific files if present for deeper dives into the pre-configured tools)

---

## 📞 Contact & Support

For questions related to the course material or this specific capstone project, please use the designated course communication channels.

For technical issues or bugs found within this starting codebase itself, please report them as instructed by your course instructor (e.g., via course channels or GitHub Issues if enabled).

---
