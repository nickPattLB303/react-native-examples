# SpeedyMeds Project Roadmap

This document outlines the planned development phases and key milestones for the SpeedyMeds React Native training project.

## Guiding Principles

*   **Learning Focus:** Prioritize applying concepts taught in the React Native course.
*   **Best Practices:** Adhere to modern React Native development standards.
*   **Iterative Development:** Build functionality incrementally across phases.
*   **Collaboration:** Follow defined contribution workflows (see `CONTRIBUTING.md`).

## Phase 1: Project Setup (Current Focus)

*   **Goal:** Establish a solid foundation for development.
*   **Tasks:**
    *   [x] Initialize Expo project with TypeScript (`create-expo-app --template blank-typescript`).
    *   [x] Create initial documentation (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SETUP.md`, `USAGE.md`, `ROADMAP.md`).
    *   [x] Define functional requirements based on mockups (`functional_requirements.md`).
    *   [ ] Configure Expo settings (`app.json`).
    *   [ ] Configure TypeScript (`tsconfig.json`).
    *   [ ] Set up ESLint for code linting.
    *   [ ] Set up Prettier for code formatting.
    *   [ ] Integrate ESLint and Prettier with VS Code.
    *   [ ] Explore and set up debugging tools (React Native Debugger, Flipper if applicable).
    *   [ ] Set up GitHub repository, branch protection rules (instructor task).
    *   [ ] Set up GitHub Issue/PR templates (instructor task).

## Phase 2: Simple Screens

*   **Goal:** Learn and apply fundamental React Native concepts.
*   **Tasks:**
    *   [ ] Create a simple Dashboard screen (`screens/SimpleDashboard.tsx`):
        *   Use core components (`View`, `Text`, `Button`, `Image`).
        *   Apply inline styles.
        *   Implement layout using Flexbox.
        *   Utilize basic TypeScript (props, state if needed).
    *   [ ] Refactor Dashboard styles using `StyleSheet.create`.
    *   [ ] Introduce a basic theme structure (e.g., `styles/theme.ts`).
    *   [ ] Create reusable custom components for Dashboard elements (e.g., `components/FeatureCard.tsx`).
    *   [ ] Implement basic navigation using Expo Router (or initial React Navigation setup if preferred for simplicity here).
    *   [ ] Create a simple Account screen (`screens/SimpleAccount.tsx`):
        *   Use custom components, Flexbox, and `StyleSheet` theme.
    *   [ ] Implement a simple form for updating mock user information on the Account screen (using basic state).
    *   [ ] Introduce React Context API for managing simple shared state (e.g., mock user info).
    *   [ ] Archive Phase 2 code into a dedicated folder (e.g., `archive/phase2_simple_screens/`).

## Phase 3: Full Project Rebuild

*   **Goal:** Build the complete application functionality using a more advanced and scalable tech stack.
*   **Tasks:**
    *   [ ] Set up React Navigation (Bottom Tab Navigator, Stack Navigator).
    *   [ ] Integrate `react-native-paper` as the UI component library.
    *   [ ] Set up `styled-components` (or alternative like `twrnc`) for customizing `react-native-paper` components and layout styling.
    *   [ ] Implement theme switching (if desired) using `react-native-paper`'s theme provider.
    *   [ ] Set up `zustand` for global state management.
    *   [ ] Set up `TanStack Query` (React Query) for data fetching simulation.
    *   [ ] Integrate `faker.js` to generate mock data for API responses.
    *   [ ] Rebuild Screens based on mockups and requirements:
        *   [ ] Dashboard Screen
        *   [ ] Prescriptions Screen (List View)
        *   [ ] Prescription Detail Screen (if applicable, not explicitly mocked but likely needed)
        *   [ ] Orders Screen (List View - implied)
        *   [ ] Order Detail Screen (`alternate_order_detail.svg`)
        *   [ ] Account Screen (`account_screen.svg`)
        *   [ ] Screens for Account sub-sections (Personal Info, Payment, etc. - requires design/definition)
    *   [ ] Implement simulated data fetching using React Query and Faker.js for all relevant screens.
    *   [ ] Manage application state (user info, potentially UI state) using Zustand and Context where appropriate.
    *   [ ] Implement form handling for account updates (using libraries like `react-hook-form` if desired).
    *   [ ] Add basic error handling and loading states for simulated fetches.
    *   [ ] Refine styling and ensure consistency across the application.

## Future Considerations (Beyond Course Scope)

*   Authentication
*   Real API Integration
*   Push Notifications
*   Offline Support
*   Testing (Unit, Integration, E2E)
*   CI/CD Pipeline

*(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)*