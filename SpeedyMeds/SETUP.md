# SpeedyMeds: Detailed Development Environment Setup Guide

Welcome! This guide provides comprehensive, step-by-step instructions for setting up your local development environment specifically for the **SpeedyMeds** React Native training project **starting point**.

Following these steps carefully is crucial for a smooth development experience, especially if you are new to React Native or Expo.

**Goal:** To ensure you can reliably run the SpeedyMeds starting application on an iOS Simulator (macOS only) or an Android Emulator (macOS/Windows/Linux) and utilize the project's development tools effectively.

**Prerequisites:** Please ensure you have already completed the initial steps mentioned in the main [README.md](./README.md), specifically:

1.  Cloned the project repository using Git.
2.  Installed Node.js (LTS version recommended) and npm.
3.  Installed Git.
4.  Installed a code editor (VS Code is strongly recommended).

---

## 1. Verify Core Tools

Before proceeding, let's double-check that Node.js, npm, and Git are correctly installed and accessible from your terminal.

```bash
node -v
npm -v
git --version
```
You should see version numbers printed (e.g., `v20.11.1`, `10.2.4`, `git version 2.43.0`). If not, install or update them:
- **Node.js/npm:** Download LTS from [nodejs.org](https://nodejs.org/). npm is included.
- **Git:** Download from [git-scm.com](https://git-scm.com/).

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
  - **Why:** Provides React Native specific features like IntelliSense for React Native APIs, debugging capabilities directly within VS Code (though we primarily use the external debugger via `j`), and commands for interacting with the Metro bundler.
  - **Install:** Search for `msjsdiag.vscode-react-native` and click Install.
- **(Optional but Recommended) GitLens — Git supercharged (`eamodio.gitlens`):**
  - **Why:** Massively enhances VS Code's built-in Git capabilities. Allows you to easily see code authorship (blame), history, compare branches/commits, and much more directly within the editor. Very helpful for understanding code evolution and collaborating.
  - **Install:** Search for `eamodio.gitlens` and click Install.

---

## 3. Simulator / Emulator Setup (Choose One or Both)

You need either an iOS Simulator (macOS only) or an Android Emulator to run and test the app locally during development.

### iOS Simulator (macOS Only)

1.  **Install Xcode:** Download and install the latest version of Xcode from the Mac App Store. Xcode includes the iOS SDK, Simulator, and necessary build tools.
2.  **Install Xcode Command Line Tools:**
    - After installing Xcode, open it once to agree to the license terms.
    - Open your **Terminal** and run: `xcode-select --install`.
    - If it's already installed, it will tell you. If not, it will prompt you to install. Agree to the installation.
    - **Verify (Optional):** Open Xcode, go to `Xcode` > `Settings...` (or `Preferences...`) > `Locations`. Ensure a version is selected in the "Command Line Tools" dropdown menu.
3.  **Launch Simulator:**
    - The easiest way is often via Xcode: `Xcode` > `Open Developer Tool` > `Simulator`.
    - Alternatively, you can find it via Spotlight search ("Simulator").
    - Once launched, you can choose the specific device (e.g., iPhone 15 Pro) via the `File` > `Open Simulator` menu if needed.
    - **Recommendation:** Launch the Simulator _before_ you start the Expo development server.

### Android Emulator

Setting up the Android Emulator involves installing Android Studio and configuring a virtual device.

1.  **Install Android Studio:** Download and install the latest version of Android Studio from the [official Android Developers site](https://developer.android.com/studio).
2.  **Configure Emulator (Android Virtual Device - AVD):**
    - Open Android Studio.
    - On the Welcome screen or via the `Tools` menu, find the **Device Manager** (previously AVD Manager). Look for an icon resembling a phone or tablet, or navigate through `Tools` > `Device Manager`.
    - Click `Create device` (or `+ Create Virtual Device`).
    - **Choose Hardware:** Select a phone definition from the list (e.g., "Pixel 6", "Pixel 7 Pro", or similar recent Pixel devices are good choices). Click `Next`.
    - **Select System Image:** Choose a recent Android version (API Level). Look for one under the "Recommended" tab. If the image isn't downloaded yet, click the "Download" link next to it. Wait for the download to complete. Select the downloaded image and click `Next`.
    - **Verify Configuration:** Give your AVD a name (optional) and review the settings. You can usually leave the defaults. Click `Finish`.
3.  **Launch Emulator:**
    - In the Device Manager list, find the virtual device you just created.
    - Click the **"Play" (triangle) icon** in the "Actions" column next to your device.
    - Wait for the emulator to fully boot up (it might take a minute or two the first time). You should see the Android home screen.
    - **Recommendation:** Launch the Emulator _before_ you start the Expo development server.

---

## 4. Project Installation and Running

Now that your environment is set up, let's install the project dependencies and run the app.

1.  **Navigate to Project Root:** Open your terminal and ensure you are in the main project directory (the one containing `package.json`) that you cloned earlier.
    ```bash
    cd path/to/SpeedyMeds
    ```
2.  **Create Environment File (`.env`) (If Necessary):**
    - This project includes an `.env.example` file. If that file contains instructions or variables required for your specific course environment (e.g., network configurations), follow these steps:
    - Copy the `.env.example` file to a new file named exactly `.env` in the **root** of the `SpeedyMeds` project directory.
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file and provide values for any required variables as instructed.
    - **Important Note:** The `.env` file is listed in `.gitignore` and should **not** be committed to version control, especially if it contains sensitive information.
    - **If `.env.example` is empty or not present, you can likely skip this step.**
3.  **Install Dependencies (Crucial Step!):**
    - Use the `npm install --legacy-peer-deps` command for the initial setup:
      ```bash
      npm install --legacy-peer-deps
      ```
    - **Why `--legacy-peer-deps`?** It's often needed in React Native projects to resolve conflicting version requirements between different libraries. It bypasses strict checks, allowing installation to complete more reliably.
4.  **Ensure Simulator/Emulator is Running:** Double-check that your chosen iOS Simulator or Android Emulator is running and fully booted.
5.  **Start the Expo Development Server:**
    - Use the `--localhost` flag for potentially more reliable connections with simulators/emulators.
      ```bash
      npx expo start --localhost
      ```
    - This command starts the Metro Bundler (which bundles your JavaScript code) and provides a development server. It will output logs, a QR code, and interactive prompts in your terminal.
6.  **Run the App on Simulator/Emulator:**
    - In the terminal where Metro is running:
      - Press `i` to attempt to open the app on the running **iOS Simulator**.
      - Press `a` to attempt to open the app on the running **Android Emulator**.
    - Expo CLI will automatically install the Expo Go client app onto the simulator/emulator if it's not already present, and then launch your SpeedyMeds project inside Expo Go. You should see the placeholder screen for the "Home" tab.

---

## 5. Managing Dependencies (Adding New Packages Later)

As you develop and add features, you might need to install new libraries. Remember the rule:

- **For libraries with native code or Expo/React Native integration (e.g., maps, camera, gestures, SVG):** **ALWAYS** use `npx expo install [package-name]`. Add `--dev` for development-only dependencies (e.g., types). This ensures compatibility with your Expo SDK version.
  ```bash
  # Example:
  npx expo install react-native-maps
  npx expo install @types/react-native-maps --dev
  # On Windows, you might need "-- --dev": npx expo install @types/react-native-maps -- --dev
  ```
- **For pure JavaScript libraries or dev tools without native ties (e.g., `lodash`, `date-fns`, testing utilities, most `@types/` packages):** Using `npm install [package-name]` (or `yarn add`) is generally okay. Add `--save-dev` for development dependencies.
  ```bash
  # Example:
  npm install date-fns
  npm install --save-dev @testing-library/jest-native
  ```
- **When in doubt, use `npx expo install`.** It's the safer default for Expo projects.

---

## 6. Troubleshooting Common Setup Issues

- **Errors mentioning "Watchman":** Watchman is a file-watching service used by Metro. If you see errors related to it (especially on macOS), try installing/reinstalling it via Homebrew: `brew update && brew install watchman` and `brew reinstall watchman`. Restarting your computer might also help.
- **Cannot Connect to Metro Bundler / App Doesn't Load:**
  - Ensure your simulator/emulator is running _before_ starting Metro (`npx expo start`).
  - Make sure your computer and emulator/simulator can connect (check firewalls if applicable). Using the `--localhost` flag often helps.
  - Try restarting Metro (`Ctrl+C` in the terminal, then `npx expo start --localhost`).
  - Try clearing caches: Run `npx expo start --clear` (clears Metro cache). Inside the Expo Go app on the simulator/device (if it partially loads), go to settings and clear cache there too.
  - As a last resort, try wiping the emulator data (in Android Studio Device Manager > Virtual Device Actions > Wipe Data) or resetting the simulator content and settings (in Simulator menu > Device > Erase All Content and Settings...). **Warning:** This deletes all apps and data on the simulator/emulator.
- **Android SDK / Emulator Issues:**
  - Ensure you have installed appropriate "Android SDK Platform" and "Android SDK Build-Tools" versions via Android Studio's SDK Manager (`Tools` > `SDK Manager`). Check Expo documentation for recommended versions if encountering build issues.
  - Make sure HAXM (Intel) or AMD Hypervisor/Windows Hypervisor Platform is correctly installed and enabled for emulator acceleration if applicable (check Android Studio setup guides).
- **Peer Dependency Errors during `npm install`:** Using the `--legacy-peer-deps` flag (as recommended in Step 3) should resolve most of these. If issues persist after adding a *new* package with `npm install`, try `npm install [package-name] --legacy-peer-deps`.

For more in-depth troubleshooting, consult the official [Expo Environment setup guide](https://docs.expo.dev/workflow/getting-started/#set-up-your-environment) and search the Expo forums or GitHub issues.

---

You should now have a working development environment! Refer back to the main [README.md](./README.md) and [USAGE.md](./USAGE.md) for instructions on interacting with the starting application, debugging, testing, and understanding the project structure. Happy coding!
