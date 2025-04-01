# SpeedyMeds Project Roadmap

This document outlines the planned development phases and key milestones for the SpeedyMeds React Native training project.

## Guiding Principles

- **Learning Focus:** Prioritize applying concepts taught in the React Native course.
- **Best Practices:** Adhere to modern React Native development standards, including testing.
- **Iterative Development:** Build functionality incrementally across phases.
- **Collaboration:** Follow defined contribution workflows (see `CONTRIBUTING.md`).


## Tasks
  - [x] Initialize Expo project with TypeScript (`create-expo-app --template blank-typescript`).
  - [x] Create/Update initial documentation (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SETUP.md`, `USAGE.md`, `ROADMAP.md`).
  - [x] Create SVG mockups (`assets/images/`).
  - [x] Define key features based on mockups (integrated into `README.md`).
  - [x] Set up GitHub Issue/PR templates (`.github/`).
  - [x] Configure Expo settings (`app.json`).
  - [x] Configure TypeScript (`tsconfig.json`).
  - [x] Set up ESLint for code linting.
  - [x] Set up Prettier for code formatting.
  - [x] Integrate ESLint and Prettier with VS Code.
  - [x] Verify Jest setup (comes with Expo) and configure if needed.
  - [x] Install React Native Testing Library (`npx expo install @testing-library/react-native`).
  - [x] Configure Jest for React Native Testing Library (e.g., setup file).
  - [x] Explore and set up debugging tools (React Native Debugger, Flipper if applicable).
  - [ ] Set up React Navigation (Bottom Tab Navigator, Stack Navigator).
  - [ ] Integrate `react-native-paper` as the UI component library.
  - [ ] Set up `styled-components` for customizing `react-native-paper` components and layout styling.
  - [ ] Implement theme switching using `react-native-paper`'s theme provider.
  - [ ] Set up `zustand` for global state management.
  - [ ] Write tests for Zustand stores (actions, selectors).
  - [ ] Set up `TanStack Query` (React Query) for data fetching simulation.
  - [ ] Integrate `faker.js` to generate mock data for API responses.
  - [ ] Write tests for custom data-fetching hooks using React Query.
  - [ ] Build Screens based on mockups and requirements outlined in `README.md` (using custom hooks for logic where appropriate):
    - [ ] Dashboard Screen (`assets/images/dashboard.svg`)
    - [ ] Prescriptions Screen (`assets/images/prescriptions.svg`)
    - [ ] Prescription Detail Screen
    - [ ] Orders Screen
    - [ ] Order Detail Screen (`assets/images/orders.svg`)
    - [ ] Account Screen (`assets/images/account.svg`)
    - [ ] Screens for Account sub-sections (Personal Info, Payment, etc. - requires design/definition)
  - [ ] Write comprehensive unit and integration tests for all screens, custom hooks, and key components using React Native Testing Library.
  - [ ] Implement simulated data fetching using React Query (likely within custom hooks) and Faker.js for all relevant screens.
  - [ ] Manage application state (user info, potentially UI state) using Zustand and Context where appropriate (potentially accessed via custom hooks).
  - [ ] Implement form handling for account updates (using libraries like `react-hook-form` if desired, potentially with custom form hooks).
  - [ ] Write tests for form validation and submission logic.
  - [ ] Add basic error handling and loading states for simulated fetches (often managed within custom data-fetching hooks).
  - [ ] Refine styling and ensure consistency across the application.

## Future Considerations (Beyond Course Scope)

- Authentication
- Real API Integration
- Push Notifications
- Offline Support
- Integration & E2E Testing (e.g., using Detox or Maestro)
- CI/CD Pipeline (including automated testing)

_(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)_
