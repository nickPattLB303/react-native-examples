# Debugging Your React Native App

Debugging is a normal part of development, and thankfully, React Native (especially with Expo) gives us some great tools to figure out what's going on when things don't work as expected!

Here's a rundown of the main tools you'll likely use:

## 1. Classic `console.log()`

The simplest way to peek inside your code! Add `console.log("My variable:", myVariable)` or similar messages to see values or check if a piece of code is running.

- **Where to See Logs:** Check the **terminal window** where you ran `npx expo start`. They also show up nicely in the **React Native DevTools** (see below).

## 2. LogBox (In-App Errors/Warnings)

React Native has a built-in way to show errors and warnings right on your app screen.

- **Errors:** Big red screens usually mean something crashed. You'll need to fix the code to make it go away.
- **Warnings:** Yellow boxes pop up at the bottom for less critical issues. You can tap them for details or swipe to dismiss. Often, these warnings are also easier to see in the DevTools console.

## 3. Developer Menu (`m`)

This is your quick-access toolkit inside the app.

- **How to Open:**
  - **Simulator/Emulator:** `Cmd+M` (Mac) or `Ctrl+M` (Windows/Linux). `Ctrl+Cmd+Z` often works on iOS Sim too.
  - **Device:** Give your phone a little shake.
  - **Terminal:** Press `m` in the terminal running Metro.
- **Useful Buttons:**
  - **Reload:** Refreshes your app's code.
  - **Open Debugger / Open DevTools:** This is the key one – it launches the main debugging tool!
  - **Toggle Element Inspector:** Lets you tap on UI elements in the app to see basic style and layout info.
  - **Toggle Performance Monitor:** Shows FPS (Frames Per Second) and other performance stats right on the screen.

## 4. React Native DevTools (`j`) - Your Best Friend!

This is the **main tool** you'll use for digging into your app's JavaScript code. It runs in your web browser (Chrome/Edge) and connects directly to your app.

- **How to Open:** Press `j` in the terminal where `npx expo start` is running.
- **What It Does:**
  - **Console:** See all your `console.log` messages clearly, run quick JS snippets.
  - **Sources:** View your code, set **breakpoints** (click line numbers or add `debugger;` in your code) to pause execution, step through code line-by-line, and inspect variable values.
  - **Network (Expo only):** See the (simulated) network requests your app is making.
  - **Components (React DevTools):** Explore your React component tree, see the props and state of each component, and even edit them live!
  - **Profiler (React DevTools):** Helps find performance bottlenecks by recording how your components render.
- **Recommendation:** Spend most of your debugging time here! It's powerful for understanding JS logic, component state, and performance.
- **Reference:** [React Native DevTools Guide](https://reactnative.dev/docs/react-native-devtools)

## 5. Performance Monitor Overlay

A quick way to see if your app is running smoothly.

- **How to Open:** Toggle it from the **Developer Menu (`m`)**.
- **What It Shows:** FPS, RAM usage, etc.
- **Good For:** Spotting obvious performance drops while you're working.

## Tools You Likely Won't Need (Good to Know)

- **Remote JS Debugging / Standalone React Native Debugger (RND):** These are older methods that are **deprecated/obsolete** with modern React Native. They don't work well (or at all) with the current setup. Stick with the built-in React Native DevTools (`j`).
- **Flipper:** A powerful tool, especially for deep native debugging, but for the JavaScript/React debugging you'll do most often in this course, the **React Native DevTools (`j`)** is now the recommended and more integrated choice.

## Quick Summary

1.  Use `console.log()` freely.
2.  Use the **Developer Menu (`m`)** for quick reloads and to open the main debugger.
3.  Use **React Native DevTools (`j`)** for almost everything else: stepping through code, checking component state/props, viewing logs, and checking performance.

Happy Debugging! It's part of the process! 🐛➡️✅
