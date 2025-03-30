# SpeedyMeds - React Native Training Capstone Project

## Overview

Welcome to the SpeedyMeds project! This application serves as the capstone project for the [Your Company Name] React Native training course. Its primary purpose is to provide a hands-on learning experience, allowing participants to apply React Native concepts by building a functional mobile pharmacy application from the ground up.

We will simulate a professional development environment, utilizing standard workflows like GitHub Flow, Pull Requests (PRs), code reviews, and issue tracking.

## Target Audience

This repository is intended for developers participating in the [Your Company Name] React Native training course.

## Key Features (Based on Mockups)

*   **Dashboard:** Overview of key information and navigation.
*   **Prescription Management:** View prescription details, status, and related actions.
*   **Order Tracking:** Track medication order status and details.
*   **Account Management:** View and manage user profile and settings.

## Technology Stack

This project utilizes the following core technologies:

*   **React Native:** Framework for building native mobile apps using React.
*   **Expo:** Platform and toolset for React Native development, simplifying builds and development workflows.
*   **TypeScript:** Superset of JavaScript adding static typing for improved code quality and maintainability.
*   **React Navigation:** Routing and navigation solution (Phase 3).
*   **ESLint & Prettier:** Code linting and formatting (to be configured).
*   **(Phase 3 Additions):** React Native Paper, Styled Components, React Query (TanStack Query), Zustand, Faker.js.

## Getting Started

### Prerequisites

*   **Node.js:** LTS version recommended. [Download Node.js](https://nodejs.org/)
*   **npm:** Comes bundled with Node.js.
*   **Git:** For version control. [Download Git](https://git-scm.com/)
*   **Expo Go App:** Install on your physical iOS or Android device. [Expo Go](https://expo.dev/go)
*   **Code Editor:** VS Code is recommended. [Download VS Code](https://code.visualstudio.com/)
*   **(Optional) iOS Simulator:** Requires Xcode (macOS only).
*   **(Optional) Android Emulator:** Requires Android Studio. [Download Android Studio](https://developer.android.com/studio)

### Setup

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd SpeedyMeds
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Note: While we use `npx expo` for running Expo-specific commands, `npm install` is the standard way to install all project dependencies listed in `package.json`.)*

### Running the App

1.  **Start the Development Server:**
    ```bash
    npx expo start
    ```
2.  **Open the App:**
    *   **On iOS Simulator:** Press `i` in the terminal where Expo Metro Bundler is running.
    *   **On Android Emulator:** Press `a` in the terminal.
    *   **On Physical Device:** Scan the QR code displayed in the terminal or browser window using the Expo Go app.

## Project Structure (Initial)

```
SpeedyMeds/
├── assets/             # Static assets like images, fonts, SVGs
│   ├── images/         # SVG mockups
│   └── ...             # Default Expo icons/splash
├── App.tsx             # Main application component (entry point)
├── index.ts            # Entry point for Metro bundler
├── app.json            # Expo configuration file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```
*(Note: This structure will evolve as we add screens, components, and other features.)*

## Development Workflow

We will follow the **GitHub Flow** branching strategy:

1.  Create a new branch from `main` for each feature or bug fix (e.g., `feature/add-login-screen`, `fix/dashboard-layout`).
2.  Commit your changes regularly with clear messages.
3.  Push your branch to the GitHub repository.
4.  Create a Pull Request (PR) targeting the `main` branch.
5.  Request code reviews from instructors or peers.
6.  Address feedback and make necessary changes.
7.  Once approved, the PR will be merged into `main`.

Please refer to `CONTRIBUTING.md` (to be created) for detailed contribution guidelines, coding standards, and PR processes.

## Project Phases

This project is structured in two main phases:

1.  **Phase 1: Project Setup:** Configuring the development environment (Expo, TypeScript, Linting, Debugging).
2.  **Phase 2: Simple Screens:** Building basic versions of key screens using core React Native concepts (Core Components, StyleSheet, Flexbox, basic state/props).
3.  **Phase 3: Full Project:** Rebuilding the application using a more advanced stack (React Navigation, UI libraries, state management, data fetching) to implement the full functionality based on mockups.

## Documentation

*   [CONTRIBUTING.md](./CONTRIBUTING.md) (To be created)
*   [CHANGELOG.md](./CHANGELOG.md) (To be created)
*   [functional_requirements.md](../functional_requirements.md) (Based on mockups)
*   *(Other documents will be linked here as created)*

## Contact & Support

For questions related to the course or this project, please use the designated **[Your WebEx Channel Name]** WebEx channel.
