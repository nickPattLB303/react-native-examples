# SpeedyMeds Project Roadmap: Starting State & Implementation Checklist

This document outlines the architectural setup provided in this **starting point** (`main` branch) and provides a checklist of implementation goals for the capstone project.

## Project Goal

The primary goal of the capstone project is to build out the user interface and functionality for a mobile pharmacy application within the provided architectural foundation, applying the concepts and libraries learned during the course.

## Starting State Summary

This `main` branch provides a fully configured architectural foundation, including:

- ✅ **Core Setup:** Expo, TypeScript, Git, Documentation Structure, ESLint, Prettier, Jest/RNTL.
- ✅ **Navigation:** React Navigation (Tabs & Stack) fully configured with type safety.
- ✅ **Theming:** Light/Dark/System themes via `ThemeContext`, integrated with React Native Paper & Styled Components.
- ✅ **State Management:** Zustand for global client state, TanStack Query for server state caching (with RN integration).
- ✅ **API Layer:** Simulated API using Faker.js and a data initialization hook pattern (`useInitializeAppData`).
- ✅ **Basic Components:** Reusable `ScreenContainer`, `LoadingIndicator`, `ErrorDisplay`, `ThemeSelector`.
- 🟡 **Screens:** Core screen files exist (`HomeScreen`, `PrescriptionsScreen`, etc.) but contain only minimal placeholders.

Refer to `README.md` for more detailed information on the starting state and technologies used.

## Implementation Checklist

This checklist outlines the core features to implement. Use this to track your progress. Details for each feature should align with the target UI mockups provided in `README.md` and course requirements.

### Core Screens & Features

- [ ] **Home Screen (`HomeScreen.tsx`):**
    - [ ] Display personalized welcome message (using `userProfile` from `useAppDataStore`).
    - [ ] Display placeholder balance card (or fetch/display real balance if API evolves).
    - [ ] Display list of medication reminders (using `medicationReminders` from `useAppDataStore`).
    - [ ] Implement navigation from "Prescriptions" and "Orders" cards to the respective tabs.
    - [ ] (Optional Stretch) Implement functionality for "Delivery" and "Resources" cards.
- [ ] **Prescriptions Screen (`PrescriptionsScreen.tsx`):**
    - [ ] Display the list of prescriptions using `FlatList` (data from `useAppDataStore`).
    - [ ] Create a reusable `PrescriptionCard` component (`src/components/`) to display individual prescription details (Drug Name, Dosage, Patient, Refills, Supply Status Badge, Alerts).
    - [ ] Style the `PrescriptionCard` and status badges according to mockups and theme (using `StatusBadge` logic).
    - [ ] Implement the search bar functionality to filter the list by drug name (case-insensitive).
    - [ ] (Optional Stretch) Add navigation to a new `PrescriptionDetailScreen` upon tapping a card.
- [ ] **Orders Screen (`OrdersScreen.tsx`):**
    - [ ] Display the list of orders using `FlatList` (data from `useAppDataStore`).
    - [ ] Create a reusable `OrderListItem` component (`src/components/`) to display order summary (Drug Name, Dosage, Order #, Status, Date).
    - [ ] Implement `onPress` navigation for each list item to navigate to `OrderDetailScreen`, passing the correct `orderId`.
    - [ ] Remove or disable the hardcoded test navigation button.
- [ ] **Order Detail Screen (`OrderDetailScreen.tsx`):**
    - [ ] Fetch specific order details using `useQuery` (TanStack Query), the `orderId` route parameter, and a simulated `fetchOrderDetail` function (you may need to add this to `src/api/index.ts` and `mockData.ts`).
    - [ ] Handle loading and error states for the `useQuery` fetch.
    - [ ] Display detailed order information based on mockups (e.g., status tracker, item details, shipping address, tracking info if available).
- [ ] **Account Screen (`AccountScreen.tsx`):**
    - [ ] Display user profile summary (Avatar, Name, Birth Year, Member ID) using data from `useAppDataStore`.
    - [ ] Create a `ProfileHeader` component if desired.
    - [ ] Implement actual navigation for list items (Personal Information, Payment Methods, etc.). This will likely require creating new placeholder screens and potentially new stack navigators.
    - [ ] Ensure the `ThemeSelector` remains functional.
    - [ ] (Optional Stretch) Implement placeholder "Log Out" functionality (e.g., clearing Zustand state, navigating to a hypothetical Login screen).

### General Tasks

- [ ] **Component Development:** Create reusable components in `src/components/` as needed.
- [ ] **Styling:** Apply consistent styling using `useTheme`, React Native Paper components, and/or `styled-components`.
- [ ] **Testing:** Write unit/component tests for new components and business logic using Jest and RNTL. Ensure tests pass (`npm run test:ci`).
- [ ] **Linting/Formatting:** Regularly run `npm run lint` and `npm run format` (or use editor integration) to maintain code quality.
- [ ] **Accessibility:** Add appropriate `accessibilityLabel`, `accessibilityRole`, etc., to interactive elements.
- [ ] **Code Review (If Applicable):** Participate in the code review process as outlined in `CONTRIBUTING.md`.
