# SpeedyMeds Project Roadmap & Feature Status

This document outlines the planned development milestones and tracks the implementation status for the SpeedyMeds React Native training project. It serves as a high-level guide for understanding the project's scope and progress.

## Guiding Principles

- **Learning Focus:** Prioritize applying concepts taught in the React Native course effectively.
- **Best Practices:** Adhere to modern React Native development standards, including comprehensive documentation and testing (where applicable).
- **Iterative Development:** Build functionality incrementally, focusing on core features first.
- **Collaboration:** Follow defined contribution workflows (see [CONTRIBUTING.md](./CONTRIBUTING.md)).

## Development Phases & Feature Status

_(Status Key: [x] = Done, [ ] = To Do / In Progress)_

### Phase 1: Project Foundation & Core Setup (Complete)

- [x] **Project Initialization:** Initialize Expo project with TypeScript template.
- [x] **Version Control:** Set up Git repository and basic GitHub workflow elements (templates).
- [x] **Initial Documentation:** Create `README.md`, `SETUP.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `USAGE.md`, `ROADMAP.md`.
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

### Phase 4: Screen Implementation & Feature Logic (In Progress / To Do)

- [ ] **Home Screen:**
  - [x] Display welcome message & theme switcher.
  - [ ] Display actual balance due from state.
  - [ ] Display medication reminders list from state.
  - [ ] Implement navigation cards (placeholders).
- [ ] **Prescriptions Screen:**
  - [x] Display list of mock prescriptions from state.
  - [x] Display supply status badges and alerts correctly.
  - [ ] Implement search/filtering functionality.
  - [ ] Implement navigation to detail view (if needed).
  - [ ] Implement refill request logic (placeholder/simulated).
- [ ] **Orders Screen:**
  - [x] Display list of mock orders from state.
  - [x] Implement navigation to Order Detail screen.
- [ ] **Order Detail Screen:**
  - [x] Display passed `orderId`.
  - [ ] Fetch and display full details for the specific order (using `orderId`).
  - [ ] Implement status tracker UI.
  - [ ] Implement tracking button logic (placeholder/link).
- [ ] **Account Screen:**
  - [x] Display mock user profile info from state.
  - [ ] Implement navigation to sub-sections (placeholders ok).
  - [ ] Implement Log Out functionality (placeholder/simulated).
- [ ] **Account Sub-Sections (Personal Info, Payment, etc.):**
  - [ ] Create placeholder screens.
  - [ ] (Optional) Implement basic form handling (e.g., using `react-hook-form`) for one section.
- [ ] **Error Handling:** Implement more user-friendly display of global errors.
- [ ] **Loading States:** Refine loading indicators (e.g., skeleton loaders).

### Phase 5: Testing (To Do)

- [ ] Write unit tests for Zustand store actions/selectors.
- [ ] Write unit tests for custom hooks (e.g., `useInitializeAppData` logic if feasible).
- [ ] Write component tests (RNTL) for reusable components (once created).
- [ ] Write component/screen tests (RNTL) for key screens (e.g., rendering lists, basic interactions, navigation).
- [ ] Write tests for form validation and submission logic (if implemented).

### Phase 6: Refinement & Finalization (To Do)

- [ ] Code cleanup and final refactoring.
- [ ] Ensure all documentation is up-to-date and accurate.
- [ ] Final accessibility check.
- [ ] Performance review (basic checks).

---

## Future Considerations (Beyond Course Scope)

These are features typically found in production apps but are likely outside the scope of this training project:

- User Authentication (Login/Registration)
- Real Backend API Integration (replacing mock data)
- Push Notifications
- Offline Data Storage & Synchronization
- End-to-End (E2E) Testing (e.g., Detox, Maestro)
- CI/CD Pipeline Setup (Automated builds, tests, deployments)
- Advanced Performance Optimization
- Analytics Integration

---

_(This roadmap is a living document and may be adjusted based on course progress and learning objectives.)_
