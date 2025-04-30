# SpeedyMeds Scaffolding Status

This document outlines the features and setup included in the **scaffolding** provided by this template repository's `main` branch. This represents the starting point for the SpeedyMeds React Native training project capstone.

Development work beyond this scaffolding (implementing remaining features, further testing, etc.) occurs within group-specific forks of this repository during the training course.

## Guiding Principles (Applied during Scaffolding Setup)

- **Learning Focus:** Prioritize applying concepts taught in the React Native course effectively.
- **Best Practices:** Adhere to modern React Native development standards.
- **Iterative Development:** Build functionality incrementally.

## Included Features & Setup (Scaffolding State - Complete)

_(Status Key: [x] = Done)_

### Phase 1: Project Foundation & Core Setup (Complete)

- [x] **Project Initialization:** Initialize Expo project with TypeScript template.
- [x] **Version Control:** Set up Git repository and basic GitHub workflow elements (templates).
- [x] **Initial Documentation:** Create `README.md`, `SETUP.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `USAGE.md`, `ROADMAP.md` (this file).
- [x] **Configuration:**
  - [x] Configure Expo settings (`app.json`).
  - [x] Configure TypeScript (`tsconfig.json`).
  - [x] Set up ESLint & Prettier (`.eslintrc.js`, `prettierrc.js`, `.prettierignore`).
  - [x] Integrate ESLint/Prettier with VS Code (`.vscode/settings.json`).
- [x] **Testing Foundation:**
  - [x] Verify/Configure Jest setup (`jest.config.js`).
  - [x] Install React Native Testing Library.
  - [x] Configure Jest setup file for RNTL (`jest.setup.js`).
- [x] **Debugging Setup:** Explore and document debugging tools (`docs/setup/debugging-config.md`).
- [x] **Mockups:** Create/Include SVG mockups (`assets/images/`).

### Phase 2: UI & Navigation Structure (Complete)

- [x] **UI Library:** Integrate React Native Paper (v5 / MD3).
- [x] **Styling:** Set up Styled Components.
- [x] **Theming:**
  - [x] Define base theme tokens (colors, spacing, typography, shape).
  - [x] Create comprehensive light and dark themes (`theme.ts`).
  - [x] Implement theme context and provider (`ThemeContext.tsx`).
  - [x] Integrate theme with PaperProvider, StyledThemeProvider.
  - [x] Implement theme switching capability (Light/Dark/System).
- [x] **Navigation:**
  - [x] Set up React Navigation (Native Stack, Bottom Tabs).
  - [x] Define navigation types (`types.ts`).
  - [x] Implement main tab structure (`MainTabNavigator.tsx`).
  - [x] Implement nested stack for Orders (`OrdersStackNavigator.tsx`).
  - [x] Implement root navigator (`AppNavigator.tsx`).
  - [x] Add icons to bottom tabs.
  - [x] Integrate navigation theming.
- [x] **Basic Screens:** Create placeholder screen components (`src/screens/`).

### Phase 3: Data Flow & State Management (Complete)

- [x] **Mock Data:** Set up Faker.js to generate realistic mock data (`mockData.ts`).
- [x] **API Simulation:** Create mock API functions simulating async fetching (`api/index.ts`).
- [x] **Server State:** Integrate TanStack Query (React Query) for data fetching & caching.
  - [x] Define query keys (`queryKeys.ts`).
  - [x] Configure React Native focus/online management (`App.tsx`).
- [x] **Global Client State:** Integrate Zustand for global state (`appDataStore.ts`).
- [x] **Data Synchronization:** Implement hook (`useInitializeAppData.ts`) to fetch data via React Query and sync to Zustand store.
- [x] **Type Safety:** Define comprehensive TypeScript types for API data structures (`types/index.ts`).

---

This concludes the setup provided by the scaffolding in the `main` branch. Further development (implementing screen logic, adding more tests, etc.) is part of the course exercise within group forks.
