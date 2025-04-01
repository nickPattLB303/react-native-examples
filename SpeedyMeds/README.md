# SpeedyMeds - React Native Training Capstone Project

## Overview

Welcome to the SpeedyMeds project! This application serves as the capstone project for the React Native training course. Its primary purpose is to provide a hands-on learning experience, allowing participants to apply React Native concepts by building a functional mobile pharmacy application from the ground up.

We will simulate a professional development environment, utilizing standard workflows like GitHub Flow, Pull Requests (PRs), code reviews, issue tracking, and unit testing.

### UI Mockups

_(These represent the target design for the application)_

**Dashboard:**
![Dashboard](./assets/images/dashboard.svg)

**Prescriptions:**
![Prescriptions](./assets/images/prescriptions.svg)

**Order Detail:**
![Order Detail](./assets/images/orders.svg)

**Account:**
![Account](./assets/images/account.svg)

## Target Audience

This repository is intended for developers participating in the React Native training course.

## Key Features (Based on Mockups)

*   **Home Dashboard:** Displays welcome message, current balance, quick navigation cards (Prescriptions, Orders, Delivery, Resources), and medication reminders.
*   **Prescriptions Screen:** Allows searching/filtering prescriptions and displays a list including drug info, dosage, days supply, patient, refills, alerts, and actions.
*   **Order Detail Screen:** Shows details for a specific order (drug info, order date/number), a status tracker (Placed, Processing, Shipped, Delivered), tracking number with a tracking button, and shipping address.
*   **Account Screen:** Displays user profile summary (avatar, name, ID) and provides navigation to manage Personal Information, Payment Methods, Communication Preferences, Security, Help & Support, along with a Log Out button.
*   **Global Navigation:** Consistent bottom tab bar for Home, Prescriptions, Orders, and Account sections.

## Technology Stack

This project utilizes the following core technologies:

*   **React Native:** Framework for building native mobile apps using React. ([Official Docs](https://reactnative.dev/docs/getting-started))
*   **Expo:** Platform and toolset for React Native development, simplifying builds and development workflows. ([Official Docs](https://docs.expo.dev/))
*   **TypeScript:** Superset of JavaScript adding static typing for improved code quality and maintainability. ([Official Docs](https://www.typescriptlang.org/docs/))
*   **Jest:** JavaScript testing framework (configured via `jest-expo` preset). ([Official Docs](https://jestjs.io/docs/getting-started))
*   **React Native Testing Library:** Utilities for testing React Native components. ([Official Docs](https://callstack.github.io/react-native-testing-library/))
*   **React Navigation:** Routing and navigation solution (Phase 3). ([Official Docs](https://reactnavigation.org/))
*   **ESLint & Prettier:** Code linting and formatting (configured via `eslint-config-expo` and Prettier plugins).
*   **(Phase 3 Additions):** React Native Paper, Styled Components, React Query (TanStack Query), Zustand, Faker.js.

## Getting Started

### Prerequisites

*   **Node.js:** LTS version recommended. [Download Node.js](https://nodejs.org/)
*   **npm:** Comes bundled with Node.js.
*   **Git:** For version control. [Download Git](https://git-scm.com/)
*   **Code Editor:** VS Code is recommended. [Download VS Code](https://code.visualstudio.com/)
*   **iOS Simulator:** Requires Xcode (macOS only).
*   **Android Emulator:** Requires Android Studio.
*   **(Optional) Expo Go App:** For testing on physical devices. [Expo Go](https://expo.dev/go)

_(See [SETUP.md](./SETUP.md) for more detailed environment setup instructions for simulators/emulators.)_

### Setup

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL] # <-- Replace with actual repo URL
    cd SpeedyMeds
    ```
2.  **Install Dependencies:** Use `npx expo install` which ensures compatible versions for Expo projects.
    ```bash
    npx expo install
    ```
    _(This command wraps `npm install` or `yarn add` and checks for version compatibility within the Expo ecosystem.)_

### Running the App (Simulators/Emulators Recommended)

1.  **Ensure Simulator/Emulator is Running:** Launch your preferred iOS Simulator (via Xcode) or Android Emulator (via Android Studio). See [SETUP.md](./SETUP.md) for details.
2.  **Start the Development Server:**
    ```bash
    npx expo start
    ```
3.  **Open the App:**
    *   **On iOS Simulator:** Press `i` in the terminal where Expo Metro Bundler is running.
    *   **On Android Emulator:** Press `a` in the terminal.
    *   **(Optional) On Physical Device:** Ensure the Expo Go app is installed and scan the QR code displayed in the terminal using the app. Your computer and device must be on the same Wi-Fi network.

### Debugging

The primary debugging tool is the **React Native DevTools**.
1.  With the Metro server running (`npx expo start`), press `j` in the terminal.
2.  This opens a browser tab with integrated tools for inspecting the console, component hierarchy (React DevTools), network requests, and setting breakpoints.

See [docs/setup/debugging-config.md](./docs/setup/debugging-config.md) for more details on debugging options.

### Running Tests

Unit tests are run using Jest and React Native Testing Library. The test runner is configured to watch for changes by default.
```bash
npm run test
# or
yarn test
```
See [docs/setup/testing-config.md](./docs/setup/testing-config.md) for more details on the testing setup.

_(See [USAGE.md](./USAGE.md) for more details on using the application as features are built.)_

## Project Structure (Initial)

```
SpeedyMeds/
├── .github/              # GitHub specific files (templates)
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .vscode/              # VS Code specific settings (e.g., format on save)
├── __tests__/            # Unit and integration tests (using Jest)
│   └── App.test.tsx      # Example test file
├── assets/               # Static assets like images, fonts, SVGs
│   ├── images/           # SVG mockups (dashboard.svg, etc.)
│   └── ...               # Default Expo icons/splash
├── docs/                 # Project documentation
│   └── setup/            # Setup guides (linting, testing, etc.)
├── App.tsx               # Main application component (entry point)
├── index.ts              # Entry point for Metro bundler
├── app.json              # Expo configuration file
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file (for RNTL matchers)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── .prettierignore       # Prettier ignore file
├── prettierrc.js         # Prettier configuration (Note: Renamed from .prettierrc.js if applicable)
├── CHANGELOG.md          # Record of project changes
├── CONTRIBUTING.md       # Contribution guidelines
├── README.md             # This file
├── ROADMAP.md            # Project development plan
├── SETUP.md              # Detailed environment setup guide
└── USAGE.md              # Application usage guide
```
_(Note: This structure will evolve as we add screens, components, and other features.)_

## Development Workflow

We follow the **GitHub Flow** branching strategy. Writing unit tests for new features and bug fixes is encouraged. Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines, coding standards, testing expectations, and PR processes.

## Project Phases

This project is structured in multiple phases as outlined in the [ROADMAP.md](./ROADMAP.md).

## Documentation

*   [SETUP.md](./SETUP.md)
*   [CONTRIBUTING.md](./CONTRIBUTING.md)
*   [USAGE.md](./USAGE.md)
*   [ROADMAP.md](./ROADMAP.md)
*   [CHANGELOG.md](./CHANGELOG.md)
*   Setup Guides:
    *   [Expo Config (`app.json`)](./docs/setup/app-json-config.md)
    *   [TypeScript Config (`tsconfig.json`)](./docs/setup/tsconfig-config.md)
    *   [Linting & Formatting](./docs/setup/linting-formatting-config.md)
    *   [Testing Setup](./docs/setup/testing-config.md)
    *   [Debugging Tools](./docs/setup/debugging-config.md)

## Contact & Support

For questions related to the course or this project, please use the designated course communication channel (e.g., WebEx, Slack).
