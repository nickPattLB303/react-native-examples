## Section 07: Core Requirements and Milestones

This section outlines the core features and functionalities you are expected to implement in the SpeedyMeds capstone project. The primary source for this checklist is the **[ROADMAP.md](../../SpeedyMeds/ROADMAP.md)** file within the project repository. Your goal is to work through these items, transforming the placeholder screens into a functional and visually appealing application.

> [!IMPORTANT]
> The following checklist, derived from `ROADMAP.md`, defines the scope of work for the SpeedyMeds capstone project. Successful completion involves addressing these requirements. Refer to the mockups in `README.md` for visual targets and previous modules for implementation techniques.

### Implementation Checklist

This checklist is organized by core screens/features and general development tasks. Use it to track your progress.

#### Core Screens & Features

- [ ] **Home Screen (`HomeScreen.tsx`):**

  - [ ] Show a friendly welcome message (using `userProfile` data from the Zustand store, populated via `useInitializeAppData`).
  - [ ] Display the balance card (mock data can be used or added to `userProfile`).
  - [ ] List the medication reminders (using `medicationReminders` data, likely fetched via TanStack Query and potentially stored in Zustand or used directly).
  - [ ] Make the "Prescriptions" and "Orders" cards navigate to the respective tabs in the `MainTabNavigator`.
  - [ ] (Bonus) Add functionality or navigation to the other informational cards if time permits.

- [ ] **Prescriptions Screen (`PrescriptionsScreen.tsx`):**

  - [ ] Display the list of prescriptions using `FlatList` (fetching `prescriptions` data via TanStack Query).
  - [ ] Create a reusable `PrescriptionCard.tsx` component in `src/components/` to display individual prescription details (name, dosage, status, refill date, etc.).
  - [ ] Style the card and status badges (e.g., "Active", "Refill Due") using the application theme (React Native Paper and Styled Components). Consider creating a `StatusBadge.tsx` component.
  - [ ] Implement the search bar functionality to filter prescriptions by name (client-side filtering on the fetched data is acceptable).
  - [ ] (Bonus) Make tapping a `PrescriptionCard` navigate to a new `PrescriptionDetailScreen` (you will need to create this screen and add it to a relevant navigator, possibly a new stack).

- [ ] **Orders Screen (`OrdersScreen.tsx`):**

  - [ ] Display the list of past orders using `FlatList` (fetching `orders` data via TanStack Query).
  - [ ] Create a reusable `OrderListItem.tsx` component in `src/components/` to display a summary of each order (order ID, date, status, total amount).
  - [ ] Ensure each list item navigates to the `OrderDetailScreen`, correctly passing the `orderId` as a route parameter.
  - [ ] Remove the initial hardcoded test button that navigates to the detail screen placeholder.

- [ ] **Order Detail Screen (`OrderDetailScreen.tsx`):**

  - [ ] Fetch details for a specific order using `useQuery` from TanStack Query. The `orderId` will be received as a route parameter.
  - [ ] You may need to add or simulate a `fetchOrderDetail(orderId)` function in `src/api/` if one doesn't exist.
  - [ ] Implement proper loading states (e.g., using `LoadingIndicator`) while data is being fetched.
  - [ ] Implement error handling (e.g., using `ErrorDisplay`) if the data fetching fails.
  - [ ] Display the full order details based on the mockups. This includes order status, shipping address, tracking information (mock), items in the order, and pricing details.

- [ ] **Account Screen (`AccountScreen.tsx`):**
  - [ ] Display the user's profile information (e.g., name, email, member ID) using `userProfile` data from the Zustand store.
  - [ ] Consider creating a `ProfileHeader.tsx` component for a polished look.
  - [ ] Update the list items (e.g., "Edit Profile", "Payment Methods", "Settings") to navigate to actual screens. This may require creating new placeholder screens and potentially a new stack navigator for account-related settings.
  - [ ] The `ThemeSelector` component should remain functional. You can redesign its placement or appearance if desired.
  - [ ] (Bonus) Implement basic "Log Out" functionality (e.g., clearing user data from Zustand store and navigating to a hypothetical login screen – creating the full login screen is out of scope unless you have ample extra time).

#### General Development Tasks

These tasks apply across all feature implementations:

- [ ] **Component Building:** Create well-structured, reusable components in `src/components/`. Follow established React patterns and TypeScript best practices.
- [ ] **Styling:** Apply styles consistently using the application's theming system (React Native Paper and Styled Components). Ensure UIs are responsive and match the mockups where possible.
- [ ] **Testing:** Write unit and component tests for your new components and any complex logic. Utilize the `renderWithProviders` utility. Aim for reasonable test coverage for the features you implement.
- [ ] **Linting/Formatting:** Regularly run `npm run lint` and `npm run format` (or rely on editor integration) to maintain code quality and consistency.
- [ ] **Accessibility (A11y):** Implement accessibility best practices, including providing `accessibilityLabel` and `accessibilityRole` for interactive elements.
- [ ] **Documentation (JSDoc):** Add JSDoc comments to new functions, components, hooks, and complex type definitions to explain their purpose and usage.
- [ ] **Code Review (If applicable):** If working in a group, participate in code reviews, providing constructive feedback and addressing feedback received, following guidelines in `CONTRIBUTING.md`.

> 🛣️ **(All Learners):**
>
> **(Self-Led/Asynchronous Path):** Treat this checklist as your guide. Work through the screens and features at your own pace. It's recommended to tackle one screen at a time, completing its core functionality before moving to the next. Refer to previous modules extensively.
>
> **(Instructor-Led Path):** Your instructor may provide a more structured timeline or specific focus areas from this list for each session or milestone. Be prepared to discuss your progress and challenges.

Completing these requirements will demonstrate your ability to apply the concepts learned throughout the course to build a functional and well-structured React Native application.
