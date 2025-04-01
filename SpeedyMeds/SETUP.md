# SpeedyMeds Development Environment Setup

This guide provides detailed instructions for setting up your development environment to work on the SpeedyMeds project. Please ensure you have followed the basic steps in the main [README.md](./README.md) first (cloning the repo, installing dependencies).

**The primary development workflow for this course utilizes iOS Simulators (macOS) or Android Emulators.** Using physical devices with Expo Go is possible but secondary.

## Prerequisites Recap

- **Node.js & npm:** Required for running JavaScript, managing packages, and using Expo CLI. Verify installation:
  ```bash
  node -v
  npm -v
  ```
  If not installed, download from [nodejs.org](https://nodejs.org/). LTS version is recommended.
- **Git:** Required for version control. Verify installation:
  ```bash
  git --version
  ```
  If not installed, download from [git-scm.com](https://git-scm.com/).
- **Code Editor:** VS Code is highly recommended due to its excellent TypeScript and React Native support. Download from [code.visualstudio.com](https://code.visualstudio.com/).
- **iOS Simulator (macOS Only):** Requires Xcode.
- **Android Emulator:** Requires Android Studio.

## Recommended VS Code Extensions

Install these extensions in VS Code for a better development experience:

- **ESLint:** Integrates ESLint into VS Code (we will configure ESLint later). Search for `dbaeumer.vscode-eslint` in the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
- **Prettier - Code formatter:** Integrates Prettier for automatic code formatting (we will configure Prettier later). Search for `esbenp.prettier-vscode`.
- **React Native Tools:** Provides debugging, IntelliSense, and command integration for React Native. Search for `msjsdiag.vscode-react-native`.
- **(Optional) GitLens — Git supercharged:** Enhances Git capabilities within VS Code (viewing history, blame, etc.). Search for `eamodio.gitlens`.

## Simulator / Emulator Setup

### iOS Simulator (macOS Only)

1.  **Install Xcode:** Download and install Xcode from the Mac App Store. This is a large download and installation can take time.
2.  **Install Xcode Command Line Tools:** Open Xcode, go to `Xcode` > `Settings` (or `Preferences`) > `Locations`. Ensure a version is selected in the "Command Line Tools" dropdown. If not, Xcode might prompt you to install them, or you can run `xcode-select --install` in your terminal.
3.  **Launch Simulator:** You can open the Simulator app directly (`Applications` > `Xcode` > `Open Developer Tool` > `Simulator`). It's recommended to launch it before running the Expo start command. Choose a recent iPhone model.

### Android Emulator

1.  **Install Android Studio:** Download and install Android Studio from the [official Android Developers site](https://developer.android.com/studio).
2.  **Configure Emulator:**
    - Open Android Studio.
    - Go to `Tools` > `Device Manager` (or look for the Device Manager icon/menu item).
    - Click `Create device`.
    - Choose a device definition (e.g., Pixel 6 or similar) and click `Next`.
    - Select a system image (choose a recent API level, download if necessary) and click `Next`.
    - Verify configuration and click `Finish`.
3.  **Launch Emulator:** In the Device Manager, click the "Play" (triangle) button next to the virtual device you created. Wait for the emulator to boot up completely before running the Expo start command.

## Running the App (Detailed)

1.  **Navigate to Project:** Open your terminal and navigate to the project directory:
    ```bash
    cd path/to/SpeedyMeds
    ```
2.  **Install Dependencies (if not done yet):** Ensure all dependencies are installed using the Expo-recommended command:
    ```bash
    npx expo install
    ```
3.  **Ensure Simulator/Emulator is Running:** Make sure your chosen iOS Simulator or Android Emulator is running.
4.  **Start Metro Bundler:** Run the Expo development server:
    ```bash
    npx expo start
    ```
    This command starts the Metro Bundler, which compiles your JavaScript code and serves it to the Expo Go app or simulators/emulators. It will also display a QR code and provide options in the terminal.
5.  **Run on Simulator/Emulator:**
    - **iOS Simulator:** Press `i` in the terminal where Metro Bundler is running.
    - **Android Emulator:** Press `a` in the terminal.
      Expo CLI will attempt to install the Expo Go app onto the simulator/emulator (if needed) and launch your project.

## Managing Dependencies (Important!)

Understanding how to install dependencies correctly is crucial in Expo projects to maintain compatibility.

### Installing All Project Dependencies (Initial Setup / Clean Install)

Use `npx expo install` **without arguments** after cloning the repository or deleting `node_modules` and `package-lock.json`.

```bash
# Installs all dependencies based on package.json and ensures compatibility
npx expo install
```
*   **Why:** This command ensures that the versions installed (and recorded in `package-lock.json`) are compatible with your project's Expo SDK version. It's the recommended way to perform the initial install for an Expo project.

### Adding NEW Individual Dependencies

When adding **new** libraries or dependencies to the project later, **always prefer `npx expo install [package-name]`**.

```bash
# Correct way to add a new runtime dependency (e.g., a UI library, utility)
npx expo install some-new-library

# Correct way to add a new dev dependency (e.g., a testing tool, types)
npx expo install some-dev-library --dev
# Note: On Windows, you might need "--" before --dev: npx expo install some-dev-library -- --dev
```
*   **Why:** `npx expo install [package-name]` checks the compatibility of the specific package version with your project's Expo SDK version, especially important for libraries with native code or those interacting closely with React Native APIs (like navigation, maps, gestures). It helps prevent common native module mismatches and other dependency conflicts. Using `npm install [package-name]` or `yarn add [package-name]` directly bypasses this check and might install an incompatible version.
*   **When is `npm install [package-name] --save-dev` okay?** For development tools that *don't* interact with the Expo/React Native runtime (like `eslint`, `prettier`, most `@types/` packages) or pure JS utilities (`lodash`, `date-fns`), using `npm install --save-dev` is generally acceptable, as Expo's compatibility check isn't strictly necessary for them. However, using `npx expo install --dev` is still a safe default.

For more details, see this article: [Why You Should Use “npx expo install” instead of “npm install” in Expo React Native App](https://medium.com/@huzaifaqureshi037/exwhy-you-should-use-npx-expo-install-instead-of-npm-install-in-expo-react-native-app-07d6156f064a)

### Running Project Scripts

Use `npm run <script-name>` (or `yarn <script-name>`) to execute scripts defined in the `"scripts"` section of your `package.json` (e.g., `npm run start`, `npm run test`, `npm run lint`).

### (Optional) Running on Physical Device

1.  **Install Expo Go:** Download the "Expo Go" app from the App Store (iOS) or Google Play Store (Android) onto your physical device. ([Expo Go Info](https://expo.dev/go))
2.  **Connect:** Ensure your computer and physical device are on the **same Wi-Fi network**.
3.  **Scan QR Code:** Open the Expo Go app on your device and scan the QR code displayed in the terminal or the browser window opened by `npx expo start`.
4.  The app bundle will be downloaded and run on your device.

## Troubleshooting Common Issues

- **Watchman Issues (macOS):** If you encounter errors related to Watchman (a file watching service), try installing or reinstalling it using Homebrew: `brew install watchman`.
- **Emulator/Simulator Connection Problems:**
  - Ensure the emulator/simulator is fully booted _before_ pressing `a` or `i`.
  - Try restarting the Metro Bundler (`Ctrl+C` then `npx expo start`).
  - Try clearing the Expo Go cache (inside Expo Go app settings on the device/emulator) or reinstalling Expo Go on the simulator/emulator. You might need to wipe emulator data or uninstall/reinstall Expo Go via Expo CLI commands if issues persist.
- **Android SDK Issues:** Ensure necessary SDK components are installed via Android Studio's SDK Manager (`Tools` > `SDK Manager`). You might need specific "Android SDK Platform" versions or "Android SDK Build-Tools".

Refer to the official [Expo Environment setup guide](https://docs.expo.dev/workflow/getting-started/#set-up-your-environment) for more comprehensive troubleshooting.
