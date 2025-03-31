# Debugging React Native Apps (Expo)

Effective debugging is crucial for development. Expo provides several ways to debug your SpeedyMeds application, ranging from simple console logs to more advanced standalone tools.

## 1. Console Logging

The simplest form of debugging. Use `console.log()`, `console.warn()`, and `console.error()` statements in your code.

- **Where to View:** Logs appear directly in the **terminal window** where you ran `npx expo start`.

## 2. Expo Go Developer Menu & Chrome DevTools

Expo Go provides an in-app developer menu and integrates with Chrome DevTools for JavaScript debugging.

- **Accessing the Menu:**
  - **Simulator:** Press `Cmd+D` (iOS) or `Cmd+M` (Android, sometimes `Ctrl+M`).
  - **Emulator:** Press `Cmd+M` or `Ctrl+M`.
  - **Physical Device:** Shake the device.
  - **Terminal:** Press `m` in the terminal running Metro.
- **Key Options:**
  - **Debug Remote JS / Debug:** This is the primary option. When enabled, it opens a new tab in your **Chrome browser** connected to your app's JavaScript runtime.
    - **Features:** You can use the standard Chrome DevTools:
      - **Console:** View `console.log` output, execute JavaScript commands.
      - **Sources:** Set breakpoints, step through code, inspect variables.
      - **Network:** Inspect basic network requests made using `fetch` or `XMLHttpRequest`. (May not show everything perfectly).
    - **Note:** Debugging remotely can sometimes impact performance slightly as the JS runs in Chrome instead of directly on the device/simulator.
  - **Show Element Inspector:** Toggles an overlay inspector in the app to view basic information about UI elements (layout, styles). Less powerful than web browser element inspection.
  - **Show Performance Monitor:** Displays an overlay showing FPS, RAM usage, etc.
  - **Reload:** Reloads the app's JavaScript bundle.
- **Recommendation:** This is the standard, built-in way to debug JS logic and is essential to learn.

## 3. React Native Debugger (Standalone App - Recommended)

React Native Debugger (RND) is a standalone desktop application that combines several powerful tools into one interface:

- Chrome DevTools (for JS debugging, console, network)
- React DevTools (for inspecting component hierarchy, props, state)
- Redux DevTools (if using Redux, not planned for this project initially)

- **Why Use It?** Provides a much better experience for inspecting React component state and props compared to the basic element inspector in Expo Go. Having everything in one window is convenient.
- **Installation:** Download the latest release for your OS from the [RND Releases Page](https://github.com/jhen0409/react-native-debugger/releases).
- **Usage:**
  1.  Close any existing Chrome DevTools tabs opened by Expo Go.
  2.  Launch the React Native Debugger application _before_ enabling remote debugging.
  3.  In your app running via Expo Go, open the Developer Menu (shake or `Cmd/Ctrl+M`).
  4.  Select **Debug Remote JS / Debug**.
  5.  RND should automatically connect (it listens on the default port 8081). A new window/tab might appear inside RND showing the debugger connected.
  6.  Use the React DevTools tab (⚛️) to inspect components and the Console tab for logs/JS debugging.
- **Recommendation:** Highly recommended for more serious debugging and component inspection once basic development starts.

## 4. Flipper (Advanced)

Flipper is a powerful, extensible desktop debugging platform created by Meta.

- **Features:** Offers detailed native module inspection, network inspection, crash reports, performance profiling, layout inspection, and can be extended with plugins.
- **Expo Integration:** Using Flipper with the Expo _managed workflow_ can sometimes require specific setup or might have limitations compared to bare React Native projects, although Expo is continuously improving compatibility. It often requires a development build (`npx expo run:ios` or `npx expo run:android`).
- **Recommendation:** Powerful but potentially more complex setup. Likely beyond the scope of the initial phases of this training course, but good to be aware of for advanced debugging needs, especially if working with custom native code or needing deep performance insights. ([Flipper Docs](https://fbflipper.com/))

## Summary for Course

- Start with `console.log()` viewed in the Metro terminal.
- Learn to use the **Expo Go Developer Menu** and **Chrome DevTools** integration (`Debug Remote JS`).
- Transition to using the **React Native Debugger** standalone application for a more integrated React debugging experience during component development (Phase 2/3).
- Flipper is an advanced option for future exploration.
