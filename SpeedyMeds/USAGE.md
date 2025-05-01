# Using the SpeedyMeds Application

This guide walks you through exploring the **starting point** for the SpeedyMeds app. It shows what's already working and how you can check out the core architecture before you start building.

**Note:** Your main goal is to build upon this foundation and implement the actual UI and features in the placeholder screens!

---

## 1. Running the Application

First things first, get the app running on your simulator or emulator.

- Need help with setup? Check out **[SETUP.md](./SETUP.md)**.
- Ready to run? Use the commands in the **[README.md](./README.md)** ("Running the App" section).

Once it launches, you should see the "Home Screen Placeholder".

---

## 2. Exploring Navigation

The app uses a standard **bottom tab bar** for the main sections. Give it a try!

- Tap the icons (**Home**, **Prescriptions**, **Orders**, **Account**) to switch between the placeholder screens.

Inside the **Orders** tab, you can even test nested navigation:

- Find the button on the Orders placeholder screen ("Go to Detail Placeholder...").
- Tap it! You should navigate to the `OrderDetailScreen` placeholder, which will show the test Order ID (`TEST_ORD_123`) that was passed along.

---

## 3. Verifying the Core Architecture

Even though the screens look basic, the underlying structure is all set up. Here's how you can see it in action:

### 3.1 Placeholder Screens (All Tabs)

- ✅ **See Placeholders:** Each tab should show a basic screen confirming its name (e.g., "Home Screen Placeholder").
- ✅ **Check Theming:** Notice the background and text colors? They should automatically match your system's theme (or the theme you select on the Account tab). This confirms the Theme Context is working.

### 3.2 Theme Switching (Account Tab)

- ✅ **Go to Account Tab:** Navigate to the Account placeholder.
- ✅ **Use the ThemeSelector:** Try tapping the "Light", "Dark", and "System" buttons. The app's appearance should change instantly across all screens!

### 3.3 Background Data Fetching (Under the Hood)

- ✅ **Check Console Logs:** When the app first loads, open the debugger (`j` in the Metro terminal). Look for logs starting with `API_SIMULATION:` (like `API_SIMULATION: fetchUserProfile called`). This shows the simulated API calls are running in the background.
- ✅ **Peek at Global State (Optional):** If you're curious, you can use React DevTools or add a temporary `console.log(useAppDataStore.getState())` to see that the Zustand store gets filled with mock data after the initial load.

---

## 4. Development & Debugging Tools

As you start building, these tools will be your friends:

- **Expo Dev Menu:** Quickly reload, inspect elements, etc.
  - _iOS Sim:_ `Cmd + D`
  - _Android Emu:_ `Cmd + M` (macOS) / `Ctrl + M` (Win/Linux)
  - _Device:_ Shake it!
- **Expo DevTools / Debugger:** Your main tool for seeing logs, debugging JS, inspecting components.
  - Press `j` in the Metro terminal where `npx expo start` is running.

---

Now you're ready to dive in and replace the placeholder content with your awesome UI and features! Refer to the [ROADMAP.md](./ROADMAP.md) for the implementation checklist.
