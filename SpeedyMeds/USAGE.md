# Using the SpeedyMeds Application (Starting Point)

This document serves as a guide for interacting with the features of the SpeedyMeds application **starting point**. It describes what is functional in the provided codebase (`main` branch) and how to verify the core architecture.

**Note:** The primary goal of the capstone is to **implement** the UI and features within the placeholder screens described below.

---

## 1. Running the Application

Before interacting, ensure you have set up your development environment and can run the app successfully.

- **Refer to [SETUP.md](./SETUP.md)** for detailed environment configuration (Node, Xcode/Android Studio, Simulators/Emulators) and project installation.
- **Refer to the "Running the App" section in [README.md](./README.md)** for the commands to start the development server and launch the app on your simulator, emulator, or physical device via Expo Go.

Upon successful launch, you should see the initial "Home" screen placeholder.

---

## 2. Navigating the Application

The application uses a standard **bottom tab bar** for primary navigation between the main sections. The navigation structure itself is fully functional:

- **Home:** The main dashboard screen placeholder.
- **Prescriptions:** The prescriptions list screen placeholder.
- **Orders:** The entry point to the orders section (renders the orders list screen placeholder within a stack).
- **Account:** The user account screen placeholder.

Tap the corresponding icon in the bottom tab bar to switch between these placeholder sections.

Within the **Orders** tab, you can test nested navigation:

- The `OrdersScreen` placeholder contains a button ("Go to Detail Placeholder (TEST_ORD_123)").
- Tapping this button should navigate you to the `OrderDetailScreen` placeholder, which will display the test Order ID passed as a parameter.

---

## 3. Core Architecture Verification (Starting State)

While the screens themselves are placeholders, the underlying architecture is complete. You can verify parts of it:

### 3.1 Home Dashboard Placeholder (Tab 1)

- ✅ **View Placeholder:** Displays text confirming it's the "Home Screen Placeholder".
- ✅ **Theming Applied:** The background and text color should reflect the currently active theme (light/dark/system).

### 3.2 Prescriptions Placeholder (Tab 2)

- ✅ **View Placeholder:** Displays text confirming it's the "Prescriptions Screen Placeholder".
- ✅ **Theming Applied:** Background and text color match the active theme.

### 3.3 Orders Placeholder (Tab 3) & Order Detail Placeholder

- ✅ **View List Placeholder:** Displays text confirming it's the "Orders List Placeholder".
- ✅ **Navigate to Detail Placeholder:** Tap the "Go to Detail Placeholder (TEST_ORD_123)" button.
- ✅ **View Detail Placeholder:** The subsequent screen should display "Order Detail Placeholder" and "Received Order ID: TEST_ORD_123".
- ✅ **Theming Applied:** Background and text colors match the active theme on both screens.

### 3.4 Account Placeholder (Tab 4)

- ✅ **View Placeholder:** Displays text confirming it's the "Account Screen Placeholder".
- ✅ **Verify Theme Switching:** This screen includes the `ThemeSelector` component. Use the segmented buttons ("Light" / "Dark" / "System") to change the application's appearance instantly across all screens.
- ✅ **Theming Applied:** Background and text color match the active theme, and the `ThemeSelector` should function correctly.

### 3.5 Background Data Fetching (Verification via Debugger)

- ✅ **Initial Load:** When the app starts, the `useInitializeAppData` hook runs.
- ✅ **Check Console Logs:** Open the debugger (`j` in the Metro terminal). You should see console logs prefixed with `API_SIMULATION:` (e.g., `API_SIMULATION: fetchUserProfile called`) indicating the mock API functions were called.
- ✅ **Check Zustand State (Optional Advanced):** Using React DevTools (if configured) or by temporarily adding `console.log(useAppDataStore.getState())` somewhere, you can observe that the Zustand store (`appDataStore`) is populated with mock data (userProfile, prescriptions, etc.) after the initial load completes.

---

## 4. Development & Debugging Features

While developing your features:

- **Expo Dev Menu:** Access this menu for quick actions:
  - _iOS Simulator:_ Press `Cmd + D`
  - _Android Emulator:_ Press `Cmd + M` (macOS) or `Ctrl + M` (Windows/Linux)
  - _Physical Device:_ Shake the device.
  - _Options:_ Reload the app, Enable Performance Monitor, Element Inspector, etc.
- **React Native Debugger / Expo DevTools:** The primary tool for debugging JavaScript.
  - Press `j` in the Metro terminal (`npx expo start`) to open the debugger UI in your browser.
  - Use this to view `console.log` messages, inspect network requests (simulated ones will appear here), set breakpoints, and use the React DevTools profiler.
  - See `docs/setup/debugging-config.md` (if present) or standard Expo documentation for more details.

---

Your task is to replace the placeholder content with the actual UI and functionality for each screen, utilizing the provided architecture (theming, state management, navigation).
