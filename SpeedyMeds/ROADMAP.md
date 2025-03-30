# SpeedyMeds Project Roadmap

This document outlines the planned development phases and key milestones for the SpeedyMeds React Native training project.

## Guiding Principles

*   **Learning Focus:** Prioritize applying concepts taught in the React Native course.
*   **Best Practices:** Adhere to modern React Native development standards, including testing.
*   **Iterative Development:** Build functionality incrementally across phases.
*   **Collaboration:** Follow defined contribution workflows (see `CONTRIBUTING.md`).

## Phase 1: Project Setup (Current Focus)

*   **Goal:** Establish a solid foundation for development.
*   **Tasks:**
    *   [x] Initialize Expo project with TypeScript (`create-expo-app --template blank-typescript`).
    *   [x] Create/Update initial documentation (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SETUP.md`, `USAGE.md`, `ROADMAP.md`).
    *   [x] Create SVG mockups (`assets/images/`).
    *   [x] Define key features based on mockups (integrated into `README.md`).
    *   [x] Set up GitHub Issue/PR templates (`.github/`).
    *   [ ] Configure Expo settings (`app.json`).
    *   [ ] Configure TypeScript (`tsconfig.json`).
    *   [ ] Set up ESLint for code linting.
    *   [ ] Set up Prettier for code formatting.
    *   [ ] Integrate ESLint and Prettier with VS Code.
    *   [ ] Verify Jest setup (comes with Expo) and configure if needed.
    *   [ ] Install React Native Testing Library (`npx expo install @testing-library/react-native`).
    *   [ ] Configure Jest for React Native Testing Library (e.g., setup file).
    *   [ ] Explore and set up debugging tools (React Native Debugger, Flipper if applicable).
    *   [ ] Set up GitHub repository, branch protection rules (instructor task).

## Phase 2: Simple Screens

*   **Goal:** Learn and apply fundamental React Native concepts, including basic testing.
*   **Tasks:**
    *   [ ] Create a simple Dashboard screen (`screens/SimpleDashboard.tsx`):
        *   Use core components (`View`, `Text`, `Button`, `Image`).
        *   Apply inline styles.
        *   Implement layout using Flexbox.
        *   Utilize basic TypeScript (props, state if needed).
    *   [ ] Write basic unit tests for the Dashboard screen (e.g., rendering text).
    *   [ ] Refactor Dashboard styles using `StyleSheet.create`.
    *   [ ] Introduce a basic theme structure (e.g., `styles/theme.ts`).
    *   [ ] Create reusable custom components for Dashboard elements (e.g., `components/FeatureCard.tsx`).
    *   [ ] Write unit tests for custom components.
    *   [ ] Implement basic navigation using Expo Router (or initial React Navigation setup if preferred for simplicity here).
    *   [ ] Create a simple Account screen (`screens/SimpleAccount.tsx`):
        *   Use custom components, Flexbox, and `StyleSheet` theme.
    *   [ ] Write basic unit tests for the Account screen.
    *   [ ] Implement a simple form for updating mock user information on the Account screen (using basic state).
    *   [ ] Write tests for form interaction/state updates.
    *   [ ] Introduce React Context API for managing simple shared state (e.g., mock user info).
    *   [ ] Write tests for context provider/consumer interactions (if feasible).
    *   [ ] Archive Phase 2 code into a dedicated folder (e.g., `archive/phase2_simple_screens/`).

## Phase 3: Full Project Rebuild

*   **Goal:** Build the complete application functionality using a more advanced and scalable tech stack, with comprehensive testing.
*   **Tasks:**
    *   [ ] Set up React Navigation (Bottom Tab Navigator, Stack Navigator).
    *   [ ] Integrate `react-native-paper` as the UI component library.
    *   [ ] Set up `styled-components` (or alternative like `twrnc`) for customizing `react-native-paper` components and layout styling.
    *   [ ] Implement theme switching (if desired) using `react-native-paper`'s theme provider.
    *   [ ] Set up `zustand` for global state management.
    *   [ ] Write tests for Zustand stores (actions, selectors).
    *   [ ] Set up `TanStack Query` (React Query) for data fetching simulation.
    *   [ ] Integrate `faker.js` to generate mock data for API responses.
    *   [ ] Write tests for custom data-fetching hooks using React Query.
    *   [ ] Rebuild Screens based on mockups and requirements outlined in `README.md` (using custom hooks for logic where appropriate):
        *   [ ] Dashboard Screen
        *   [ ] Prescriptions Screen (List View)
        *   [ ] Prescription Detail Screen (if applicable, not explicitly mocked but likely needed)
        *   [ ] Orders Screen (List View - implied)
        *   [ ] Order Detail Screen (`assets/images/orders.svg`)
        *   [ ] Account Screen (`assets/images/account.svg`)
        *   [ ] Screens for Account sub-sections (Personal Info, Payment, etc. - requires design/definition)
    *   [ ] Write comprehensive unit and integration tests for all screens, custom hooks, and key components using React Native Testing Library.
    *   [ ] Implement simulated data fetching using React Query (likely within custom hooks) and Faker.js for all relevant screens.
    *   [ ] Manage application state (user info, potentially UI state) using Zustand and Context where appropriate (potentially accessed via custom hooks).
    *   [ ] Implement form handling for account updates (using libraries like `react-hook-form` if desired, potentially with custom form hooks).
    *   [ ] Write tests for form validation and submission logic.
    *   [ ] Add basic error handling and loading states for simulated fetches (often managed within custom data-fetching hooks).
    *   [ ] Refine styling and ensure consistency across the application.

## Future Considerations (Beyond Course Scope)

*   Authentication
*   Real API Integration
*   Push Notifications
*   Offline Support
*   Integration & E2E Testing (e.g., using Detox or Maestro)
*   CI/CD Pipeline (including automated testing)

*(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)*