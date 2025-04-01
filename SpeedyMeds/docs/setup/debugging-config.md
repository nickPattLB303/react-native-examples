# Debugging React Native Apps (Expo)

Effective debugging is crucial for development. Expo provides several modern tools to debug your SpeedyMeds application, ranging from simple console logs to integrated developer tools.

## 1. Console Logging

The simplest form of debugging. Use `console.log()`, `console.warn()`, and `console.error()` statements in your code.

- **Where to View:** Logs appear directly in the **terminal window** where you ran `npx expo start`.

## 2. Expo Developer Menu (`m`)

This menu, built into Expo Go and development builds, provides access to essential debugging utilities.

- **Accessing the Menu:**
  - **Simulator/Emulator:** Press `Cmd+M` or `Ctrl+M` (iOS/Android).
  - **iOS Simulator:** `Cmd+D` or `Ctrl+Cmd+Z`.
  - **Physical Device:** Shake the device (or three-finger tap on iOS).
  - **Terminal:** Press `m` in the terminal running Metro.
- **Key Options (Refer to Expo Docs for full list):**
  - **Reload:** Reloads the app's JavaScript bundle (often automatic with Fast Refresh).
  - **Toggle Performance Monitor:** Displays an overlay showing FPS, RAM usage, JS heap, view counts.
  - **Toggle Element Inspector:** Toggles an overlay inspector in the app to view basic UI element info (layout, styles) and highlight touchables.
  - **Open JS Debugger:** Launches the **React Native DevTools** (see next section).
  - **Fast Refresh:** Toggles automatic JS reloading on file changes (usually enabled by default).
- **Recommendation:** Use this menu for quick actions like reloading, inspecting elements on the device, and checking performance.

## 3. React Native DevTools (`j`) - Primary Debugger

This is the modern, recommended tool for debugging your app's JavaScript code and React components, replacing the older Chrome DevTools integration. It works with the Hermes engine.

- **Accessing:** Press `j` in the terminal window where `npx expo start` is running.
- **Key Features (Integrated Interface):**
  - **Console:** View `console.log` output, execute JavaScript commands in the app's context.
  - **Sources:** Set breakpoints (click line numbers or use `debugger;` statement), step through code, inspect variables and scope. Pause on exceptions (caught or uncaught).
  - **Network (Expo Only):** Inspect network requests (`fetch`, media loads) made by your app.
  - **Memory:** Inspect JavaScript memory usage and take heap snapshots.
  - **Components (React DevTools):** Inspect the React component tree, view/edit props and state, check component hierarchy.
  - **Profiler (React DevTools):** Record and analyze the performance of your JavaScript code execution and component rendering (debug builds only currently).
- **Recommendation:** This is the **main tool** for debugging JavaScript logic, inspecting component state/props, analyzing performance, and checking network requests.

## 4. Standalone React DevTools (`Shift+M`)

While React DevTools are integrated into React Native DevTools (`j`), you can also open a standalone version specifically focused on component inspection.

- **Accessing:** Press `Shift+M` in the terminal window where `npx expo start` is running.
- **Features:** Focuses on the component tree, props, state, and hooks. Can be paired with the Element Inspector from the Developer Menu. Also shows installed **Dev Tools Plugins**. Useful if you primarily want to focus on the component structure.
- **Recommendation:** Use when you need a dedicated view for component inspection or want to access Dev Tools Plugins.

## 5. VS Code Debugger (Experimental)

VS Code has built-in debugging capabilities that can connect to your Expo app using the same underlying protocol as React Native DevTools.

- **Setup:** Requires the [Expo Tools VS Code extension](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools).
- **Usage:** Connect your app, open the VS Code command palette (`Cmd/Ctrl+Shift+P`), and run `Expo: Debug ...`. Allows setting breakpoints, inspecting variables directly in VS Code.
- **Recommendation:** An alternative if you prefer debugging within your editor, but noted as experimental by Expo. React Native DevTools (`j`) is generally more stable and feature-rich.

## 6. React Native Debugger (Standalone App - DEPRECATED)

React Native Debugger (RND) **is no longer recommended or supported** for modern Expo/React Native projects (SDK 49+).

- **Reason:** It relied on the **Remote JS Debugging** feature, which has been **removed** from React Native (since 0.73) and is **incompatible** with the Hermes JavaScript engine (now the default).
- **Replacement:** Use the **React Native DevTools (`j`)** and **Standalone React DevTools (`Shift+M`)** described above.

## 7. Flipper (Advanced)

Flipper is a powerful, extensible desktop debugging platform created by Meta.

- **Features:** Offers detailed native module inspection, enhanced network inspection, crash reports, native performance profiling, layout inspection, database inspection, and more via plugins.
- **Expo Integration:** Works best with **development builds** (`npx expo run:ios` or `npx expo run:android`), not typically with Expo Go directly.
- **Recommendation:** Powerful for advanced debugging, especially when dealing with native code, complex state management, or needing deep performance insights. Potentially more complex setup. Good to be aware of for advanced needs.

## Summary for Course

1.  Start with `console.log()` viewed in the Metro terminal.
2.  Use the **Developer Menu (`m`)** for quick actions (reload, element/perf monitor).
3.  Use **React Native DevTools (`j`)** as the primary tool for JS debugging, component inspection (props/state), network checks, and profiling.
4.  Use **Standalone React DevTools (`Shift+M`)** for focused component inspection or accessing Dev Tools Plugins.
5.  Consider **VS Code Debugger** as an experimental alternative.
6.  Avoid the deprecated **React Native Debugger (RND)**.
7.  Explore **Flipper** for advanced/native debugging needs (likely requires development builds).

_(Primary Reference: [Expo Debugging Tools Docs](https://docs.expo.dev/debugging/tools/))_
