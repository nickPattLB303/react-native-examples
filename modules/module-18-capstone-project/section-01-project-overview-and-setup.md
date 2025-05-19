## Section 01: Project Overview and Setup

This section re-introduces the SpeedyMeds capstone project, its primary goals, the technology stack you'll be working with, and how to ensure your local setup is correct and ready for development. Familiarity with this foundational information is key to navigating the project effectively.

### Project Goals Recap

The SpeedyMeds project is designed as your capstone, allowing you to apply the comprehensive skills learned throughout this React Native course. The primary goal is to take a pre-configured starter application and develop it into a more feature-rich mobile pharmacy application. You will focus on:

- Implementing UI for various screens based on provided mockups.
- Integrating features like prescription listings, order tracking, and user account management.
- Working within an established architecture that includes navigation, theming, state management (client and server), and a mock API layer.
- Adhering to best practices for code quality, testing, and accessibility.

Essentially, you'll be transforming placeholder screens and concepts into a tangible, functional application, mirroring a real-world development scenario where you build upon an existing foundation.

### Technology Stack

The SpeedyMeds project utilizes a modern and robust technology stack, common in many production React Native applications. Understanding these core technologies will be beneficial as you work through the implementation.

Key technologies include:

- **React Native (0.76.x):** The core framework for building native mobile applications using JavaScript and React.
- **Expo (SDK 52):** A platform and set of tools built around React Native that simplifies development, building, and deployment. The project is configured to use Expo's New Architecture (`newArchEnabled: true`).
- **TypeScript (5.3.x):** A superset of JavaScript that adds static typing, enhancing code quality and developer experience.
- **React Navigation (v6):** A comprehensive library for handling navigation and routing (Stack, Tabs) in React Native applications.
- **React Native Paper (v5):** A Material Design component library that provides a rich set of pre-built, customizable UI components, supporting Material Design 3.
- **Styled Components (v6):** A CSS-in-JS library for styling React components with enhanced features like theming and dynamic styling.
- **TanStack Query (v5):** A powerful library for managing server state, including data fetching, caching, and synchronization.
- **Zustand (v5):** A minimalistic and flexible client state management library.
- **ESLint & Prettier:** Tooling for maintaining code quality and consistency through linting and automatic code formatting.
- **Jest & React Native Testing Library:** Frameworks for writing and running unit and component tests.
- **Faker.js:** Used to generate realistic mock data for the simulated API.

> 📚 **Official Documentation:**
>
> - [React Native Official Docs](https://reactnative.dev/docs/getting-started)
> - [Expo Official Docs](https://docs.expo.dev/)
> - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
> - [React Navigation Docs (v6)](https://reactnavigation.org/)
> - [React Native Paper Docs (v5)](https://callstack.github.io/react-native-paper/)
> - [Styled Components Docs](https://styled-components.com/docs)
> - [TanStack Query Docs (v5)](https://tanstack.com/query/v5/docs/react/overview)
> - [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

### Initial Project Setup and Verification

Before diving into feature development, it's crucial to ensure your project is correctly set up and running. The `SpeedyMeds` repository contains detailed guides for this.

1.  **Environment Setup:**

    - If you haven't already, follow the detailed instructions in **[SETUP.md](../../SpeedyMeds/SETUP.md)** to install prerequisites (Node.js, npm/yarn, Watchman, Xcode/Android Studio tools) and clone the project.
    - Ensure you have the correct Expo Go version if you plan to test on a physical device, though the iOS Simulator or Android Emulator is the primary target.

2.  **Install Dependencies:**

    - Navigate to your project directory in the terminal.
    - Run `npm install --legacy-peer-deps` as specified in `SETUP.md`. This command installs all necessary project dependencies.

3.  **Run the Application:**

    - Start your iOS Simulator or Android Emulator.
    - In the project directory, run `npx expo start`.
    - In the Metro bundler terminal output, press `i` to open on the iOS Simulator or `a` to open on the Android Emulator.
    - The app should launch, and you should see the initial "Home Screen Placeholder".

4.  **Verify Core Functionality (as per [USAGE.md](../../SpeedyMeds/USAGE.md))**:
    - **Navigation:** Test tapping through the bottom tab navigator (Home, Prescriptions, Orders, Account). All screens should display their respective placeholder content.
    - **Nested Navigation:** On the "Orders" screen placeholder, tap the button to navigate to the "Order Detail" placeholder. Verify that the test Order ID is displayed.
    - **Theming:** On the "Account" screen placeholder, use the `ThemeSelector` component to switch between Light, Dark, and System themes. Confirm that the app's appearance updates across all screens.
    - **Background Data:** Open the JavaScript debugger (press `j` in the Metro terminal). On app load, observe console logs from the mock API (e.g., `API_SIMULATION: fetchUserProfile called`), indicating data is being fetched.

> [!IMPORTANT]
> Completing these verification steps is crucial. If you encounter issues, revisit the **[SETUP.md](../../SpeedyMeds/SETUP.md)** and **[TROUBLESHOOTING section of README.md](../../SpeedyMeds/README.md#troubleshooting-tips)**, or consult course support channels. Do not proceed with feature development until your basic setup is functioning correctly.

> 🌐 **(Web Developers new to large mobile starter projects):**
>
> **Comparison:** Unlike some web projects where you might build everything from scratch, this capstone provides a significant amount of boilerplate and configuration (navigation, theming, state management). This is common in larger mobile projects to ensure consistency and accelerate feature development.
>
> **Key Takeaway:** Your primary task isn't to set up these systems but to understand how they are configured and how to use them to build features. Spend time navigating the existing code, especially in `App.tsx`, `/src/navigation`, `/src/theme`, and `/src/stores`, to see how these pieces connect.
>
> **Source:** Review the `App.tsx` file in the `SpeedyMeds` project for a top-level view of provider setup.

Once you've verified the setup and initial functionality, you're ready to explore the project's structure in more detail in the next section.

### Next Steps

With your project set up and verified, the next step is to understand its internal structure. Proceed to [Section 02: Understanding the Project Scaffolding](./section-02-understanding-the-project-scaffolding.md) to learn about the directory layout and key files.
