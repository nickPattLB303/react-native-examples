# Using the SpeedyMeds Application

This document serves as a guide for interacting with the features of the SpeedyMeds application as they are developed throughout the React Native training course.

**Note:** This is a **living document**. It will be updated incrementally with specific instructions, screenshots, and usage details as features are implemented and refined.

---

## 1. Running the Application

Before using the application, ensure you have set up your development environment and can run the app successfully.

- **Refer to [SETUP.md](./SETUP.md)** for detailed, step-by-step instructions on environment configuration (Node, Xcode/Android Studio, Simulators/Emulators) and project installation.
- **Refer to the "Running the App" section in [README.md](./README.md)** for the commands to start the development server and launch the app on your simulator, emulator, or physical device via Expo Go.

---

## 2. Navigating the Application

The application uses a standard **bottom tab bar** for primary navigation between the main sections:

- **Home:** The main dashboard screen. Provides an overview and quick navigation.
- **Prescriptions:** Lists your medications and allows searching.
- **Orders:** Shows your past and current medication orders. Allows viewing details.
- **Account:** Access your profile information and settings.

Tap the corresponding icon in the bottom tab bar to switch between these sections.

Within some sections, you can navigate further:

- **Orders Screen:** Tapping an order in the list navigates to the `OrderDetailScreen`.

---

## 3. Core Features (Current Implementation Status)

This section details how to use the currently implemented features. Features marked with ✅ are mostly functional, while ⚠️ indicates partial implementation or placeholder behavior, and ❌ indicates not yet implemented.

### 3.1 Home Dashboard (Tab 1)

- ✅ **View Welcome & Balance:** See a welcome message with your (mock) first name and a card displaying a placeholder balance due.
- ✅ **View Reminders:** See a basic list of mock medication reminders showing the name and time.
- ✅ **Change Theme:** Use the segmented buttons ("Light" / "Dark" / "System") at the bottom of the screen to change the application's appearance instantly. The "System" option follows your device's current light/dark mode setting.
- ✅ **Navigate:** Tap the "Prescriptions" or "Orders" cards to navigate directly to those respective tabs. The "Delivery" and "Resources" cards are placeholders and do not navigate anywhere yet.

### 3.2 Prescriptions Screen (Tab 2)

- ✅ **View List:** See a list of mock prescriptions displaying:
  - Drug Name & Dosage
  - Patient Name & Refills Remaining
  - Supply Status Badge (colored based on days remaining: Green for OK, Yellow for Low, Red for Critical)
  - Alerts (e.g., "Price may be rising" icon and text)
- ✅ **Search Prescriptions:** Use the search bar at the top to filter the list. Typing text (e.g., "Atorva") will dynamically filter the list to show only prescriptions whose drug name contains the typed text (case-insensitive). Clearing the search bar shows all prescriptions again.
- ❌ **Navigate to Detail:** Tapping on a prescription item currently does nothing. (Future: Navigate to a detail view).
- ❌ **Refill Requests:** No functionality exists yet to request refills.

### 3.3 Orders Screen (Tab 3) & Order Detail

- ✅ **View List:** See a list of mock orders displaying drug name, dosage, order number, status (e.g., "Delivered", "Shipped"), and order date.
- ✅ **Navigate to Detail:** Tap on any order item in the list to navigate to the `OrderDetailScreen`.
- ⚠️ **View Order Detail Screen:** The detail screen currently only displays the `orderId` passed from the list. The rest of the screen (status tracker, tracking info, address) is **not yet implemented**.
- ✅ **Test Button:** A button labeled "View Hardcoded Order 12345" exists for testing navigation to the detail screen with a specific ID.
- ❌ **Track Shipment:** No functionality exists yet on the detail screen to track shipments.

### 3.4 Account Screen (Tab 4)

- ✅ **View Profile Summary:** See your mock profile information displayed at the top (Avatar with initials, Full Name, Birth Year, Member ID).
- ⚠️ **Navigate (Placeholder):** Tap on list items like "Personal Information", "Payment Methods", "Communication Preferences", "Security", or "Help & Support". This currently **only logs a message to the console/debugger** indicating which item was pressed; it does not navigate to a new screen.
- ⚠️ **Log Out (Placeholder):** Tap the "Log Out" button. This currently **only logs a message to the console/debugger**; it does not perform an actual logout action.

---

## 4. Development & Debugging Features

While using the app during development:

- **Expo Dev Menu:** Access this menu for quick actions:
  - _iOS Simulator:_ Press `Cmd + D`
  - _Android Emulator:_ Press `Cmd + M` (macOS) or `Ctrl + M` (Windows/Linux)
  - _Physical Device:_ Shake the device.
  - _Options:_ Reload the app, Enable Performance Monitor, Element Inspector, etc.
- **React Native Debugger / Expo DevTools:** The primary tool for debugging JavaScript.
  - Press `j` in the Metro terminal (`npx expo start`) to open the debugger UI in your browser.
  - Use this to view `console.log` messages, inspect network requests, set breakpoints, and use the React DevTools profiler.
  - See `docs/setup/debugging-config.md` for more details.

---

_This document will be updated as the project progresses and features become fully implemented._
