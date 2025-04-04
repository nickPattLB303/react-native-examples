# Using the SpeedyMeds Application

This document serves as a guide for interacting with the features of the SpeedyMeds application as they are developed throughout the React Native training course.

**Note:** This is a **living document**. It will be updated incrementally with specific instructions, screenshots, and usage details as features are implemented and refined.

## 1. Running the Application

Before using the application, ensure you have set up your development environment and can run the app successfully.

- **Refer to [SETUP.md](./SETUP.md)** for detailed, step-by-step instructions on environment configuration (Node, Xcode/Android Studio, Simulators/Emulators) and project installation.
- **Refer to the "Running the App" section in [README.md](./README.md)** for the commands to start the development server and launch the app on your simulator, emulator, or physical device via Expo Go.

## 2. Navigating the Application

The application uses a standard bottom tab bar for primary navigation between the main sections:

- **Home:** The main dashboard screen. Provides an overview and potentially quick actions.
- **Prescriptions:** Lists your medications.
- **Orders:** Shows your past and current medication orders. Allows viewing details.
- **Account:** Access your profile information and settings.

Tap the corresponding icon in the bottom tab bar to switch between these sections. Within sections like "Orders", you might navigate further into detail screens (e.g., tapping an order in the list takes you to the Order Detail screen).

## 3. Core Features (Current Skeleton Status)

This section will detail how to use specific features once they are implemented.

### 3.1 Home Dashboard

- **(Partially Implemented)** View welcome message and placeholder balance due card.
- **(Partially Implemented)** View basic medication reminders list (name and time).
- **(Implemented)** **Change Theme:** Use the segmented buttons (Light/Dark/System) to change the application's appearance instantly.
- **(Partially Implemented)** **Navigate:** Use the placeholder navigation cards to navigate to the Prescriptions and Orders tabs.

### 3.2 Prescriptions Screen

- **(Partially Implemented)** View a list of mock prescriptions, including drug name, dosage, patient, refills remaining, and supply status (indicated by badge color/text).
- **(Partially Implemented)** View alerts associated with prescriptions (e.g., Price Rising, Savings Available).
- **(Placeholder)** Use the search bar (currently does not filter).
- **(To be implemented)** Navigate to a prescription detail view (if applicable).
- **(To be implemented)** Initiate refill requests.

### 3.3 Orders Screen

- **(Partially Implemented)** View a list of mock orders, including drug name, dosage, order number, status, and date.
- **(Implemented)** **View Order Details:** Tap on any order in the list (or the "View Hardcoded Order" test button) to navigate to the `OrderDetailScreen`.
- **(Placeholder - Detail Screen)** View the `orderId` on the detail screen (screen is otherwise empty).
- **(To be implemented - Detail Screen)** View full order details (status tracker, tracking number, shipping address, items).
- **(To be implemented - Detail Screen)** Track shipment via tracking number button.

### 3.4 Account Screen

- **(Implemented)** View your mock profile information (Avatar initial, Name, Birth Year, Member ID).
- **(Placeholder)** Tap on list items (Personal Information, Payment Methods, etc.) to simulate navigation (currently logs to console).
- **(Placeholder)** Tap the "Log Out" button (currently logs to console).

## 4. Development Features

- **Debugging Menu:** Access the Expo development menu (shake device, Cmd+D/Cmd+M/Ctrl+M) for options like Reload, Performance Monitor, Element Inspector.
- **React Native DevTools:** Press `j` in the Metro terminal to open the primary debugger for console logs, breakpoints, network inspection, etc. (See `docs/setup/debugging-config.md`).

---

_This document will be updated as the project progresses._
