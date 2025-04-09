---
marp: true
theme: custom-theme
paginate: true
header: 'Setup Guide'
footer: 'React Native Training'
---

<!-- _class: lead -->
# Setup Guide: Expo Go & iOS Simulator

Let's get your development environment ready for React Native using Expo Go and the iOS Simulator.

---

## Overview

This guide covers the simplest setup path, ideal for getting started quickly without complex native build configurations. We will use:

-   **Expo Go:** A client app for iOS and Android that lets you run Expo projects without needing Xcode or Android Studio builds initially.
-   **iOS Simulator:** Included with Xcode, allows running and testing iOS apps on your Mac.
-   **`create-expo-app`:** The command-line tool to generate new Expo projects.

> **Note:** This guide assumes you are using macOS. Windows/Linux users can use Expo Go on a physical device or Android Studio Emulator (setup not covered here).

---

## Prerequisites

Before you begin, ensure you have the following installed:

1.  **Node.js (LTS version):** Expo requires Node.js. Download the LTS version from [nodejs.org](https://nodejs.org/). Verify installation by opening Terminal and running `node -v`.
2.  **Watchman (Recommended):** A file-watching service. Install via Homebrew: `brew install watchman`.
3.  **Xcode:** Install the latest version from the Mac App Store. This includes the iOS Simulator and necessary command-line tools.
    -   After installation, open Xcode, go to `Settings` > `Locations`, and ensure a `Command Line Tools` version is selected.
    -   You may need to agree to licenses by running `sudo xcodebuild -license` in Terminal.

---

## Step 1: Create Your Expo App

1.  Open your Terminal.
2.  Navigate to the directory where you want to create your project (e.g., `cd ~/Development`).
3.  Run the `create-expo-app` command:

```bash
npx create-expo-app@latest MyFirstExpoApp
```

-   `npx`: Executes npm packages without globally installing them. Ensures you use the latest `create-expo-app`.
-   `MyFirstExpoApp`: Replace this with your desired project name.

This command will download the template, install dependencies, and create a new directory for your project.

---

## Step 2: Navigate and Start the App

1.  Change into your new project directory:

```bash
cd MyFirstExpoApp
```

2.  Start the development server:

```bash
npx expo start
```

-   This command starts Metro (the JavaScript bundler) and provides options to run your app.

You should see output in the terminal, including a QR code and options like:
`› Press i │ run on iOS simulator`

---

## Step 3: Run on iOS Simulator

1.  In the terminal where `npx expo start` is running, press `i`.
2.  This will automatically:
    -   Launch the iOS Simulator (if not already open).
    -   Install the Expo Go app onto the simulator (if not already installed).
    *   Open your project within the Expo Go app.

You should see your basic Expo app running in the simulator! Changes you make to your code (e.g., in `App.tsx`) will automatically reload in the simulator.

---

## Understanding `npx expo install` vs. `npm install`

When adding libraries to your Expo project, **always prefer `npx expo install`**:

```bash
npx expo install react-native-paper # Example
```

**Why?**
-   Expo projects rely on specific versions of libraries that are compatible with the installed Expo SDK version.
-   `npx expo install [library]` automatically installs the version of `[library]` known to be compatible with your project's Expo SDK.
-   Using `npm install [library]` or `yarn add [library]` might install an incompatible version, leading to runtime errors or unexpected behavior.

Reference: [Why use npx expo install?](https://medium.com/@huzaifaqureshi037/exwhy-you-should-use-npx-expo-install-instead-of-npm-install-in-expo-react-native-app-07d6156f064a)

---

## Common Troubleshooting

**1. Dependency Issues / Errors during `npm install` or `npx expo install`:**
   - Sometimes, dependency conflicts arise. You might see errors mentioning `peer dependencies`.
   - **Solution 1:** Try adding the `--legacy-peer-deps` flag (use with caution):
     ```bash
     npm install --legacy-peer-deps
     # or if installing a specific package
     npx expo install some-package --legacy-peer-deps
     ```
   - **Solution 2:** Clean install. Delete `node_modules` and `package-lock.json` (or `yarn.lock`) and reinstall:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     # or if using expo install for specific packages after cleaning
     # npx expo install some-package some-other-package
     ```

---

## Common Troubleshooting (Continued)

**2. Simulator Not Launching / App Not Opening:**
   - Ensure Xcode and Command Line Tools are correctly installed and selected (see Prerequisites).
   - Try restarting the simulator and the Metro server (`npx expo start`).
   - Quit the Expo Go app on the simulator and try pressing `i` again.
   - Check for error messages in the Metro terminal output.

**3. Cache Issues:**
   - Sometimes Metro's cache can cause problems. Restart the server with a clean cache:
     ```bash
     npx expo start -c
     ```

---

## Exploring the Default Expo Project Structure

Let's look at the key files/folders in `MyFirstExpoApp`:

```
MyFirstExpoApp/
├── .expo/             # Temp files generated by Expo CLI
├── .git/              # Git repository data (if initialized)
├── assets/            # Static assets (images, fonts)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── node_modules/      # Project dependencies (managed by npm/yarn)
├── .gitignore         # Files/folders ignored by Git
├── App.tsx            # The main entry point component for your app
├── app.json           # Expo configuration file (app name, icon, splash, etc.)
├── babel.config.js    # Babel configuration (JavaScript transpiler)
├── package-lock.json  # Exact dependency versions (npm)
├── package.json       # Project metadata and dependencies
└── tsconfig.json      # TypeScript configuration
```

---

## Key Files Explained

-   **`App.tsx`:** This is where your application starts. You'll modify this file to build your UI.
-   **`app.json`:** Crucial Expo configuration. Defines app name, version, icon, splash screen, supported platforms, dependencies linked to Expo SDK features, and more. See [Expo app.json Reference](https://docs.expo.dev/versions/latest/config/app/).
-   **`package.json`:** Standard Node.js project file listing dependencies and scripts (`start`, `android`, `ios`, `web`).
-   **`assets/`:** Place your images and custom fonts here. Expo handles bundling them.
-   **`babel.config.js`:** Configures Babel to transpile modern JavaScript/TypeScript for compatibility. Usually uses `babel-preset-expo`.
-   **`tsconfig.json`:** Configures the TypeScript compiler.

---

## You're Ready!

Your environment is set up. You can now start modifying `App.tsx` and exploring the world of React Native development with Expo!

Next recommended step: Proceed to **Module 1: React Native Fundamentals**.