# SpeedyMeds Project Roadmap

This document outlines the planned development milestones for the SpeedyMeds React Native training project.

## Guiding Principles

- **Learning Focus:** Prioritize applying concepts taught in the React Native course.
- **Best Practices:** Adhere to modern React Native development standards, including testing.
- **Iterative Development:** Build functionality incrementally.
- **Collaboration:** Follow defined contribution workflows (see `CONTRIBUTING.md`).

## Project Tasks / Milestones

- **Setup & Configuration:**

  - [x] Initialize Expo project with TypeScript.
  - [x] Create/Update initial documentation.
  - [x] Create SVG mockups.
  - [x] Define key features based on mockups.
  - [x] Set up GitHub Issue/PR templates.
  - [x] Configure Expo settings (`app.json`).
  - [x] Configure TypeScript (`tsconfig.json`).
  - [x] Set up ESLint for code linting.
  - [x] Set up Prettier for code formatting.
  - [x] Integrate ESLint and Prettier with VS Code.
  - [x] Verify/Configure Jest setup.
  - [x] Install React Native Testing Library.
  - [x] Configure Jest for React Native Testing Library.
  - [x] Explore and set up debugging tools.

- **Core App Structure & UI:**

  - [x] Set up React Navigation (Bottom Tab Navigator, Stack Navigator).
  - [x] Integrate `react-native-paper` as the UI component library.
  - [x] Set up `styled-components` and integrate with `react-native-paper` theme.
  - [x] Implement theme switching using `react-native-paper`.

- **State Management & Data Handling:**

  - [x] Set up `zustand` for global state management.
  - [x] Integrate `faker.js` to generate mock data.

- **Screen Implementation (Based on Mockups):**

  - [ ] Dashboard Screen
  - [ ] Prescriptions Screen
  - [ ] Prescription Detail Screen
  - [ ] Orders Screen
  - [ ] Order Detail Screen
  - [ ] Account Screen
  - [ ] Account Sub-Sections (Personal Info, Payment, etc.)

- **Functionality & Logic:**

  - [ ] Implement simulated data fetching using React Query + Faker.js.
  - [ ] Manage application state using Zustand/Context.
  - [ ] Implement form handling for account updates (e.g., using `react-hook-form`).
  - [ ] Add basic error handling and loading states for fetches.

- **Testing:**

  - [ ] Write tests for Zustand stores.
  - [ ] Write tests for custom data-fetching hooks.
  - [ ] Write comprehensive unit/integration tests for screens, hooks, components.
  - [ ] Write tests for form validation and submission logic.

- **Final Touches:**
  - [x] Standardize styling approach using `styled-components` across screens.
  - [ ] Further refine styling details for consistency.

## Future Considerations (Beyond Course Scope)

- Authentication
- Real API Integration
- Push Notifications
- Offline Support
- Integration & E2E Testing (e.g., Detox, Maestro)
- CI/CD Pipeline

_(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)_

## Core Functionality & Architecture

- [x] **Project Initialization:** Expo + TypeScript template.
- [x] **Basic Navigation:** Setup React Navigation (Bottom Tabs + Stack).
- [x] **UI Library:** Integrate React Native Paper for components and theming.
- [x] **Styling:** Setup Styled Components for custom component styling.
- [x] **Linting/Formatting:** Configure ESLint and Prettier for code quality.
- [x] **Testing:** Configure Jest and React Native Testing Library.
- [ ] **Data Fetching:** ~~Integrate TanStack Query (React Query) for server state.~~ **DONE**
- [ ] **State Management:** ~~Integrate Zustand for global client state.~~ **DONE**
- [ ] **Mock Data:** ~~Set up Faker.js to generate realistic data for development.~~ **DONE**
- [ ] **API Simulation:** Create mock API functions to simulate backend interaction.
- [ ] **Error Handling:** Implement global error handling/display.
- [ ] **Type Safety:** Define comprehensive TypeScript types for API data and props.
