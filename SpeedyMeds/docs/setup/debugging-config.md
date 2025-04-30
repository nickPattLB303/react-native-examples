# Debugging React Native Apps (Expo / React Native CLI)

Effective debugging is crucial for development. Modern React Native (including projects managed with Expo) provides several tools to debug your application, ranging from simple console logs to integrated developer tools.

## 1. Console Logging

The simplest form of debugging. Use `console.log()`, `console.warn()`, and `console.error()` statements in your code.

- **Where to View:**
  - Logs appear directly in the **terminal window** where you ran `npx expo start` or `npx react-native start`.
  - They also appear in the **Console** tab of the **React Native DevTools**.

## 2. LogBox

React Native's built-in tool for displaying errors and warnings directly within the app.

- **Fatal Errors:** Automatically shows unrecoverable errors (e.g., syntax errors) with stack traces. Not dismissable until the error is fixed.
- **Console Errors/Warnings:** Displayed as on-screen notifications (red/yellow badges). Tapping them provides more details. These are often hidden when React Native DevTools is open, making the DevTools Console the preferred place to view them.
- **Ignoring Logs:** You can configure LogBox to ignore specific warnings or all logs using the `LogBox` API (e.g., `LogBox.ignoreLogs([...])`, `LogBox.ignoreAllLogs()`).
- **Reference:** [LogBox Docs](https://reactnative.dev/docs/debugging#logbox)

## 3. Expo Developer Menu / React Native Dev Menu (`m`)

This in-app menu provides access to essential development and debugging utilities.

- **Accessing the Menu:**
  - **Simulator/Emulator:** Press `Cmd+M` (macOS) or `Ctrl+M` (Windows/Linux). For iOS Simulator, `Ctrl+Cmd+Z` or Device > Shake also works.
  - **Physical Device:** Shake the device.
  - **Terminal:** Press `m` in the terminal running Metro.
- **Key Options:**
  - **Reload:** Reloads the app's JavaScript bundle (often automatic with Fast Refresh).
  - **Open Debugger / Open DevTools:** Launches the **React Native DevTools** (see next section).
  - **Show/Hide Performance Monitor:** Toggles an overlay showing FPS, RAM usage, JS heap, view counts. (See section below)
  - **Toggle Element Inspector:** Toggles an overlay inspector in the app to view basic UI element info (layout, styles). Can be paired with React DevTools.
  - **Fast Refresh:** Toggles automatic JS reloading on file changes (usually enabled by default).
- **Recommendation:** Use this menu for quick actions like reloading, toggling the performance monitor/element inspector, and launching DevTools.
- **Reference:** [Opening the Dev Menu](https://reactnative.dev/docs/debugging#opening-the-dev-menu)

## 4. React Native DevTools (`j`) - Primary Debugger

This is the modern, built-in, and **recommended** tool for debugging your app's JavaScript code, inspecting React components, viewing network requests (Expo), analyzing performance, and more. It works directly with the Hermes engine (React Native's default JavaScript engine) and uses source maps.

- **Accessing:** Press `j` in the terminal window where `npx expo start` or `npx react-native start` is running. Requires Google Chrome or Microsoft Edge.
- **Key Features (Integrated Interface):**
  - **Console:** View `console.log` output, execute JavaScript commands, inspect objects, filter messages. [Ref](https://reactnative.dev/docs/react-native-devtools#console)
  - **Sources:** View source files, set breakpoints (click line numbers or use `debugger;` statement), step through code execution, inspect variables and scope, pause on exceptions. [Ref](https://reactnative.dev/docs/react-native-devtools#sources--breakpoints)
  - **Network (Expo Only):** Inspect network requests (`fetch`, XHR, media loads) made by your app.
  - **Memory:** Inspect JavaScript memory usage, take heap snapshots, record allocation timelines to identify memory leaks. [Ref](https://reactnative.dev/docs/react-native-devtools#memory)
  - **Components (React DevTools):** Inspect the React component tree, view/edit props and state, highlight component updates, locate elements on screen. [Ref](https://reactnative.dev/docs/react-native-devtools#react-components)
  - **Profiler (React DevTools):** Record and analyze the performance of component rendering and commits to identify performance bottlenecks. [Ref](https://reactnative.dev/docs/react-native-devtools#react-profiler)
- **Recommendation:** This is the **primary tool** you should use for most JavaScript logic debugging, inspecting component state/props, analyzing performance, and checking network requests in development builds.
- **Reference:** [React Native DevTools Guide](https://reactnative.dev/docs/react-native-devtools)

## 5. Performance Monitor

An in-app overlay providing real-time performance metrics.

- **Accessing:** Toggle via the **Developer Menu (`m`)**.
- **Metrics Displayed:** UI FPS, JS FPS, RAM usage, JS heap size, View counts, etc.
- **Recommendation:** Useful for quickly assessing performance during development. For accurate measurements, use the native profiling tools in Xcode or Android Studio or the Profiler tab in React Native DevTools.
- **Reference:** [Performance Monitor Docs](https://reactnative.dev/docs/debugging#performance-monitor)

## 6. Standalone React DevTools

While React DevTools are integrated into React Native DevTools (`j`), you might sometimes use the standalone electron app or browser extension, though direct connection methods have changed.

- **Modern Approach:** The integrated **Components** and **Profiler** tabs within React Native DevTools (`j`) are the standard way to use React DevTools with React Native.
- **Legacy Note:** Previously, a standalone React DevTools app could connect, but the primary method is now the integrated version.

## 7. VS Code Debugger (Expo Extension)

VS Code has debugging capabilities that can connect to your Expo app via the Expo Tools extension.

- **Setup:** Requires the [Expo Tools VS Code extension](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools).
- **Usage:** Connect your app, use the VS Code command palette (`Cmd/Ctrl+Shift+P`) and run `Expo: Debug ...`. Allows setting breakpoints and inspecting variables within VS Code.
- **Recommendation:** An alternative if you prefer debugging within your editor. The official React Native documentation notes that VS Code debugging is _not directly supported_ by the React team, and React Native DevTools (`j`) is the officially supported and generally recommended approach. [Ref](https://reactnative.dev/docs/react-native-devtools#core-features)

## Deprecated / Replaced Tools

- **Remote JS Debugging (Chrome DevTools via `chrome://inspect`):** This method is **deprecated and removed** in modern React Native versions (since 0.73+). It executed JS in Chrome's V8 engine, causing inconsistencies, and is incompatible with Hermes. **Do not use.**
- **React Native Debugger (Standalone App - RND):** This standalone application relied on Remote JS Debugging and is therefore **obsolete and incompatible** with modern React Native (Hermes). **Do not use.**
- **Flipper:** While a powerful platform, Flipper is **no longer the recommended primary tool** for React Native JavaScript debugging. React Native DevTools (`j`) has integrated and improved upon many of its core JS/React debugging features (Console, Network, React DevTools). Flipper might still be used in **development builds** (`npx expo run:ios/android` or `npx react-native run-ios/android`) for advanced _native_ debugging tasks (native module inspection, detailed layout inspection, native performance profiling, database inspection) via its plugin system. For standard JS/React debugging, use React Native DevTools. [Ref](https://shift.infinite.red/why-you-dont-need-flipper-in-your-react-native-app-and-how-to-get-by-without-it-3af461955109), [Ref](https://reactnative.dev/docs/debugging#flipper-and-alternative-debugging-tools)

## Summary for Course

1.  Use `console.log()` viewed in the Metro terminal or React Native DevTools **Console**.
2.  Be aware of **LogBox** for in-app errors/warnings.
3.  Use the **Developer Menu (`m`)** for quick actions (reload, toggle element/perf monitor, open DevTools).
4.  Use **React Native DevTools (`j`)** as the **primary tool** for JS debugging (Sources, breakpoints), component inspection (Components - props/state), network checks (Network tab - Expo), memory inspection (Memory), and performance profiling (Profiler).
5.  Use the **Performance Monitor** overlay for quick performance checks.
6.  Avoid deprecated tools like **Remote JS Debugging** and **React Native Debugger (RND)**.
7.  Understand that **Flipper** is generally replaced by React Native DevTools for JS debugging but remains relevant for advanced native-level debugging in development builds.

_(Primary References: [React Native Debugging Docs](https://reactnative.dev/docs/debugging), [React Native DevTools Docs](https://reactnative.dev/docs/react-native-devtools))_
