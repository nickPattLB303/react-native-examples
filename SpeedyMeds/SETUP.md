# SpeedyMeds: Detailed Development Environment Setup Guide

Welcome! This guide provides comprehensive, step-by-step instructions for setting up your local development environment specifically for the **SpeedyMeds** React Native training project. Following these steps carefully is crucial for a smooth development experience, especially if you are new to React Native or Expo.

**Goal:** To ensure you can reliably run the SpeedyMeds application on an iOS Simulator (macOS only) or an Android Emulator (macOS/Windows/Linux) and utilize the project's development tools effectively.

**Prerequisites:** Please ensure you have already completed the initial steps mentioned in the main [README.md](./README.md), specifically:

1.  Cloned the project repository using Git.
2.  Installed Node.js (LTS version recommended) and npm.
3.  Installed Git.
4.  Installed a code editor (VS Code is strongly recommended).

---

## 1. Verify Core Tools

Before proceeding, let's double-check that Node.js, npm, and Git are correctly installed and accessible from your terminal (Command Prompt, PowerShell, Terminal, etc.).

- **Node.js & npm:** Open your terminal and run:
  ```bash
  node -v
  npm -v
  ```
  You should see version numbers printed (e.g., `v18.18.0`, `9.8.1`). If not, download and install Node.js LTS from [nodejs.org](https://nodejs.org/). npm is included with Node.js.
- **Git:** In your terminal, run:
  ```bash
  git --version
  ```
  You should see a git version number (e.g., `git version 2.39.2`). If not, download and install Git from [git-scm.com](https://git-scm.com/).

---

## 2. Recommended VS Code Extensions

Using VS Code is highly recommended. These extensions will significantly improve your development workflow with this project:

- **ESLint (`dbaeumer.vscode-eslint`):**
  - **Why:** Integrates the ESLint tool directly into VS Code. It will highlight code quality issues, potential errors, and style violations directly in your editor based on the project's `.eslintrc.js` configuration. This helps you catch mistakes early and maintain consistent code.
  - **Install:** Search for `dbaeumer.vscode-eslint` in the Extensions view (Ctrl+Shift+X or Cmd+Shift+X) and click Install.
- **Prettier - Code formatter (`esbenp.prettier-vscode`):**
  - **Why:** Integrates the Prettier code formatter. When configured (as done in this project's `.vscode/settings.json`), it automatically formats your code (JavaScript, TypeScript, JSON, Markdown, etc.) on save to match the project's defined style (`prettierrc.js`). This eliminates manual formatting and ensures consistency across all files.
  - **Install:** Search for `esbenp.prettier-vscode` and click Install. Ensure "Format On Save" is enabled in VS Code settings (this project includes a `.vscode/settings.json` to enable it automatically for this workspace).
- **React Native Tools (`msjsdiag.vscode-react-native`):**
  - **Why:** Provides React Native specific features like IntelliSense for React Native APIs, debugging capabilities directly within VS Code (though we primarily use the external React Native DevTools via `j`), and commands for interacting with the Metro bundler.
  - **Install:** Search for `msjsdiag.vscode-react-native` and click Install.
- **(Optional but Recommended) GitLens — Git supercharged (`eamodio.gitlens`):**
  - **Why:** Massively enhances VS Code's built-in Git capabilities. Allows you to easily see code authorship (blame), history, compare branches/commits, and much more directly within the editor. Very helpful for understanding code evolution and collaborating.
  - **Install:** Search for `eamodio.gitlens` and click Install.

---

## 3. Simulator / Emulator Setup (Choose One or Both)

You need either an iOS Simulator (macOS only) or an Android Emulator to run and test the app locally during development.

### iOS Simulator (macOS Only)

1.  **Install Xcode:** Download and install the latest version of Xcode from the **Mac App Store**. This is a large application, and the download/installation process can take a significant amount of time. Xcode includes the iOS SDK, Simulator, and necessary build tools.
2.  **Install Xcode Command Line Tools:**
    - After installing Xcode, open it once to agree to the license terms.
    - Open your **Terminal** and run: `xcode-select --install`.
    - If it's already installed, it will tell you. If not, it will prompt you to install. Agree to the installation.
    - **Verify (Optional):** Open Xcode, go to `Xcode` > `Settings...` (or `Preferences...`) > `Locations`. Ensure a version is selected in the "Command Line Tools" dropdown menu.
    <!-- > _[Placeholder: Screenshot of Xcode > Settings > Locations > Command Line Tools dropdown]_ -->
3.  **Launch Simulator:**
    - The easiest way is often via Xcode: `Xcode` > `Open Developer Tool` > `Simulator`.
    - Alternatively, you can find it via Spotlight search ("Simulator").
    - Once launched, you can choose the specific device (e.g., iPhone 15 Pro) via the `File` > `Open Simulator` menu if needed.
    - **Recommendation:** Launch the Simulator _before_ you start the Expo development server.

### Android Emulator

Setting up the Android Emulator involves installing Android Studio and configuring a virtual device.

1.  **Install Android Studio:** Download and install the latest version of Android Studio from the [official Android Developers site](https://developer.android.com/studio). Follow the installation wizard instructions.
2.  **Configure Emulator (Android Virtual Device - AVD):**
    - Open Android Studio.
    - On the Welcome screen or via the `Tools` menu, find the **Device Manager** (previously AVD Manager). Look for an icon resembling a phone or tablet, or navigate through `Tools` > `Device Manager`.
    <!-- > _[Placeholder: Screenshot of Android Studio Welcome Screen showing Device Manager location]_ -->
    - Click `Create device` (or `+ Create Virtual Device`).
    - **Choose Hardware:** Select a phone definition from the list (e.g., "Pixel 6", "Pixel 7 Pro", or similar recent Pixel devices are good choices). Click `Next`.
    - **Select System Image:** Choose a recent Android version (API Level). Look for one under the "Recommended" tab. If the image isn't downloaded yet, click the "Download" link next to it. Wait for the download to complete. Select the downloaded image and click `Next`.
    - **Verify Configuration:** Give your AVD a name (optional) and review the settings. You can usually leave the defaults. Click `Finish`.
    <!-- > _[Placeholder: GIF illustrating the process of Creating a Virtual Device (Hardware -> System Image -> Finish)]_ -->
3.  **Launch Emulator:**
    - In the Device Manager list, find the virtual device you just created.
    - Click the **"Play" (triangle) icon** in the "Actions" column next to your device.
    - Wait for the emulator to fully boot up (it might take a minute or two the first time). You should see the Android home screen.
    - **Recommendation:** Launch the Emulator _before_ you start the Expo development server.

---

## 4. Project Installation and Running

Now that your environment is set up, let's install the project dependencies and run the app.

1.  **Navigate to Project Root:** Open your terminal and ensure you are in the main project directory (the one containing `package.json`).
    ```bash
    cd path/to/SpeedyMeds
    ```
2.  **Create Environment File (`.env`):**
    - This step is required due to specific network/security configurations potentially needed for the _training course environment_.
    - In the **root** of the `SpeedyMeds` project directory (alongside `package.json`), create a new file named exactly `.env`.
    - Add the following single line to this file:
      ```
      NODE_TLS_REJECT_UNAUTHORIZED=0
      ```
    - **Security Warning:** This setting disables Node.js's default security check for TLS certificates. **Do not use this in production applications.** It's a workaround for potential certificate issues in specific development or corporate network environments. Ensure `.env` is listed in your `.gitignore` file (it should be by default) to avoid committing sensitive configurations. If you don't encounter network errors when running `npx expo start`, you might not strictly need this line.
3.  **Install Dependencies (Crucial Step!):**
    - Use the `npx expo install` command. **Do not use `npm install` or `yarn install` directly for the initial setup.**
      ```bash
      npx expo install
      ```
    - **Why `npx expo install` is Essential:** Expo projects rely on specific versions of React Native and other libraries that are compatible with the chosen Expo SDK version (defined in `app.json`). `npx expo install` reads your `package.json` and automatically installs compatible versions of known libraries, preventing many common version mismatch errors that occur when using `npm install` directly.
    - **Handling Peer Dependency Errors:** It's common in complex JavaScript projects to encounter "peer dependency" warnings or errors during installation (you might see `ERESOLVE unable to resolve dependency tree`). This means different libraries require slightly different versions of a shared dependency (often React itself). If `npx expo install` fails because of this, the recommended workaround is usually to use the `--legacy-peer-deps` flag with `npm`:
      ```bash
      # If the above 'npx expo install' fails, try this:
      npm install --legacy-peer-deps
      ```
      This tells npm to ignore the peer conflicts and proceed. Use this if necessary, but understand it bypasses some checks.
4.  **Ensure Simulator/Emulator is Running:** Double-check that your chosen iOS Simulator or Android Emulator is running and fully booted.
5.  **Start the Expo Development Server:**
    - Use the `--localhost` flag for more reliable connections with simulators/emulators, especially if you added the `.env` setting.
      ```bash
      npx expo start --localhost
      ```
    - This command starts the Metro Bundler (which bundles your JavaScript code) and provides a development server. It will output logs, a QR code, and interactive prompts in your terminal.
6.  **Run the App on Simulator/Emulator:**
    - In the terminal where Metro is running:
      - Press `i` to attempt to open the app on the running **iOS Simulator**.
      - Press `a` to attempt to open the app on the running **Android Emulator**.
    - Expo CLI will automatically install the Expo Go client app onto the simulator/emulator if it's not already present, and then launch your SpeedyMeds project inside Expo Go.
    <!-- > _[Placeholder: Screenshot showing Expo Go launching the app on iOS Simulator/Android Emulator]_ -->

---

## 5. Managing Dependencies (Adding New Packages Later)

As you develop, you might need to add new libraries. Remember the rule:

- **For libraries with native code or Expo/React Native integration (e.g., navigation, maps, camera, gestures):** **ALWAYS** use `npx expo install [package-name]`. Add `--dev` for development-only dependencies (e.g., types).
  ```bash
  npx expo install react-native-maps
  npx expo install @types/react-native-maps --dev
  # On Windows, you might need "--" before --dev: npx expo install @types/react-native-maps -- --dev
  ```
- **For pure JavaScript libraries or dev tools without native ties (e.g., `lodash`, `date-fns`, testing utilities, most `@types/` packages):** Using `npm install [package-name]` (or `yarn add`) is generally okay. Add `--save-dev` for development dependencies.
  ```bash
  npm install date-fns
  npm install --save-dev @testing-library/jest-native
  ```
- **When in doubt, use `npx expo install`.** It's the safer default for Expo projects.

---

## 6. Troubleshooting Common Setup Issues

- **Errors mentioning "Watchman":** Watchman is a file-watching service used by Metro. If you see errors related to it (especially on macOS), try installing/reinstalling it via Homebrew: `brew install watchman` and `brew reinstall watchman`. Restarting your computer might also help.
- **Cannot Connect to Metro Bundler:**
  - Ensure your simulator/emulator is running _before_ starting Metro (`npx expo start`).
  - Make sure your computer and emulator/simulator can connect (firewall issues?). Using the `--localhost` flag often helps.
  - Try restarting Metro (`Ctrl+C` in the terminal, then `npx expo start --localhost`).
  - Try clearing caches: Run `npx expo start --clear` (clears Metro cache). Inside the Expo Go app on the simulator/device, go to settings and clear cache there too.
  - As a last resort, try wiping the emulator data (in Android Studio Device Manager) or resetting the simulator content and settings (in Simulator menu).
- **Android SDK / Emulator Issues:**
  - Ensure you have installed appropriate "Android SDK Platform" and "Android SDK Build-Tools" versions via Android Studio's SDK Manager (`Tools` > `SDK Manager`). Match the requirements for your target Android version.
  - Make sure HAXM (Intel) or AMD Hypervisor is correctly installed and enabled for emulator acceleration if applicable.
- **Peer Dependency Errors during `npx expo install [package-name]`:** Use the `-- --legacy-peer-deps` flag as described in Step 3.

For more in-depth troubleshooting, consult the official [Expo Environment setup guide](https://docs.expo.dev/workflow/getting-started/#set-up-your-environment).

---

You should now have a working development environment! Refer back to the main [README.md](./README.md) for instructions on debugging, testing, and understanding the project structure. Happy coding!
