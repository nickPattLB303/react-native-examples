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
  - [x] Integrate `react-native-paper` as the UI component library. // Theme setup done
  - [x] Set up `styled-components` for customizing `react-native-paper`. // Theme setup done
  - [x] Implement theme switching using `react-native-paper`.

- **State Management & Data Handling:**

  - [ ] Set up `zustand` for global state management.
  - [ ] Set up `TanStack Query` (React Query) for data fetching simulation.
  - [ ] Integrate `faker.js` to generate mock data.

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
  - [ ] Refine styling and ensure consistency.

## Future Considerations (Beyond Course Scope)

- Authentication
- Real API Integration
- Push Notifications
- Offline Support
- Integration & E2E Testing (e.g., Detox, Maestro)
- CI/CD Pipeline

_(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)_
