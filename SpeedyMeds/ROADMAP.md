# SpeedyMeds Project Roadmap: Starting State & Implementation Checklist

This document gives you an overview of the project's starting point (`main` branch) and a checklist of features ready to be built!

## Project Goal

The main goal is to practice building a mobile pharmacy application using React Native! You'll take the provided foundation and bring the user interface and features to life, applying all the concepts and libraries learned during the course.

## Starting State Summary

This `main` branch gets you started quickly with a solid architectural setup:

- ✅ **Core Setup:** Expo, TypeScript, Git, Docs, Linters (ESLint/Prettier), Testing (Jest/RNTL) are all ready.
- ✅ **Navigation:** React Navigation Tabs & Stack are set up with types.
- ✅ **Theming:** Light/Dark/System themes are working via `ThemeContext` and integrated with UI libraries.
- ✅ **State Management:** Zustand (global state) & TanStack Query (server state) are configured.
- ✅ **API Layer:** Includes a simulated API using Faker.js so you can work with data right away.
- ✅ **Basic Components:** Some handy components like `ScreenContainer`, `LoadingIndicator` are provided.
- 🟡 **Screens:** The main screen files exist, but they're placeholders waiting for your implementation!

Check out `README.md` for more details on the tech stack.

## Implementation Checklist (Your Mission!)

Here are the core features to implement. Treat this as a guide and have fun bringing the app to life! Refer to the mockups in `README.md` for visual targets.

### Core Screens & Features

- [ ] **Home Screen (`HomeScreen.tsx`):**
    - [ ] Show a friendly welcome message (using `userProfile` data).
    - [ ] Display the balance card.
    - [ ] List the medication reminders (using `medicationReminders` data).
    - [ ] Make the "Prescriptions" and "Orders" cards navigate to the right tabs.
    - [ ] (Bonus) Add functionality to the other cards if you have time!
- [ ] **Prescriptions Screen (`PrescriptionsScreen.tsx`):**
    - [ ] Display the list of prescriptions using `FlatList` (using `prescriptions` data).
    - [ ] Create a `PrescriptionCard` component to show prescription details beautifully.
    - [ ] Style the card and status badges using the theme (check out `StatusBadge` logic!).
    - [ ] Implement the search bar to filter prescriptions by name.
    - [ ] (Bonus) Make tapping a card navigate to a detail screen (you'll need to create it!).
- [ ] **Orders Screen (`OrdersScreen.tsx`):**
    - [ ] Display the list of orders using `FlatList` (using `orders` data).
    - [ ] Create an `OrderListItem` component for the order summary.
    - [ ] Make list items navigate to `OrderDetailScreen`, passing the correct `orderId`.
    - [ ] Remove the hardcoded test button.
- [ ] **Order Detail Screen (`OrderDetailScreen.tsx`):**
    - [ ] Fetch details for a specific order using `useQuery` and the `orderId` param. (You might need to add a `fetchOrderDetail` simulation in `src/api/`).
    - [ ] Show loading/error states while fetching.
    - [ ] Display the full order details based on the mockups (status, address, tracking, etc.).
- [ ] **Account Screen (`AccountScreen.tsx`):**
    - [ ] Show the user's profile info (using `userProfile` data).
    - [ ] Maybe create a `ProfileHeader` component?
    - [ ] Make the list items navigate to actual screens (you might need to create new screens/stacks).
    - [ ] The `ThemeSelector` should still work - feel free to move it if you like!
    - [ ] (Bonus) Add basic "Log Out" functionality.

### General Development Tasks

- [ ] **Component Building:** Create awesome reusable components in `src/components/`.
- [ ] **Styling:** Make it look good using the theme, Paper components, and styled-components.
- [ ] **Testing:** Write tests for your components and logic.
- [ ] **Linting/Formatting:** Keep the code tidy with `npm run lint` / `npm run format`.
- [ ] **Accessibility:** Make your UI accessible with labels and roles.
- [ ] **Documentation:** Add helpful JSDoc comments.
- [ ] **Code Review:** Collaborate and learn through code reviews (follow `CONTRIBUTING.md`).
