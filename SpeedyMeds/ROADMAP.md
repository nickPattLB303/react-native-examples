# SpeedyMeds Project Starting State & Next Steps

This document outlines the features and architectural setup provided in this **starting point** (`main` branch) and the high-level goals for implementation during the capstone project.

## Guiding Principles (For Capstone Implementation)

- **Apply Course Concepts:** Effectively utilize the React Native concepts, patterns, and libraries taught in the course.
- **Feature Completion:** Implement the core user-facing features based on provided requirements or mockups.
- **Code Quality:** Adhere to the established code standards (TypeScript, ESLint, Prettier, Testing).
- **Collaboration (If Applicable):** Follow the contribution workflow outlined in `CONTRIBUTING.md`.

## Included Features & Setup (Starting State - Option 2)

This `main` branch provides a fully configured architectural foundation:

- ✅ **Project Foundation & Core Setup:** Expo, TypeScript, Git, Documentation Structure.
- ✅ **Configuration:** Expo (`app.json`), TypeScript (`tsconfig.json`), ESLint, Prettier, VS Code settings.
- ✅ **Testing Foundation:** Jest & React Native Testing Library configured (`jest.config.js`, `jest.setup.js`), custom `renderWithProviders` utility.
- ✅ **UI Library:** React Native Paper (v5 / MD3) integrated.
- ✅ **Styling:** Styled Components set up and integrated with theming.
- ✅ **Theming:** Comprehensive Light/Dark/System themes defined (`src/theme/`), `ThemeContext` provider implemented and integrated.
- ✅ **Navigation:** React Navigation (Native Stack, Bottom Tabs) configured (`src/navigation/`), including type safety (`types.ts`). Navigation between placeholders works.
- ✅ **Mock Data:** Faker.js setup (`src/api/mockData.ts`) providing realistic mock data.
- ✅ **API Simulation:** Simulated async API functions (`src/api/index.ts`).
- ✅ **Server State:** TanStack Query (React Query) configured (`App.tsx`, `src/api/queryKeys.ts`), including RN focus/online management.
- ✅ **Global Client State:** Zustand store defined and set up (`src/stores/appDataStore.ts`).
- ✅ **Data Synchronization:** Initial data fetching hook pattern implemented (`src/hooks/useInitializeAppData.ts`) using React Query and syncing to Zustand.
- ✅ **Type Safety:** Comprehensive TypeScript types defined (`src/types/`).
- ✅ **Basic Components:** Generic `ScreenContainer`, `LoadingIndicator`, `ErrorDisplay`, `ThemeSelector` provided.

- 🟡 **Screens (`src/screens/`):** All core screen files exist but contain only **minimal placeholders** displaying the screen name. The core task is to implement these screens.

## Next Steps & Implementation Goals (Student Tasks)

The primary goal of the capstone project is to build out the user interface and functionality within the provided architectural foundation. Key implementation tasks include:

1.  **Implement Home Screen:** Display welcome message, balance (using data from `useAppDataStore`), medication reminders list, and implement navigation from cards.
2.  **Implement Prescriptions Screen:** Display the list of prescriptions (from `useAppDataStore`), implement search/filtering logic, and potentially add navigation to a detail view (requires creating a new screen/stack).
3.  **Implement Orders Screen:** Display the list of orders (from `useAppDataStore`) and ensure navigation to the `OrderDetailScreen` works correctly (using the real order ID).
4.  **Implement Order Detail Screen:** Fetch (using `useQuery` and `orderId` param) and display detailed information for a specific order (status, tracking, items, address).
5.  **Implement Account Screen:** Display user profile details (from `useAppDataStore`), implement actual navigation for settings items (potentially creating new screens/stacks), and implement logout functionality.
6.  **Build Reusable Components:** Create new components (`src/components/`) as needed (e.g., `PrescriptionCard`, `OrderListItem`, `ProfileHeader`).
7.  **Styling:** Apply styles consistently using the provided theme and React Native Paper/Styled Components.
8.  **Testing:** Write unit and component tests for new components and screen logic.
9.  **Refinement:** Improve UI/UX, handle edge cases, enhance accessibility.

*(Specific tasks, priorities, and features may be further defined by course instructors.)*
