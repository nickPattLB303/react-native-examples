# SpeedyMeds: Detailed Development Environment Setup Guide

This guide provides specific instructions for installing and running the **SpeedyMeds** React Native training project **starting point**. Ensure you have completed any general environment setup prerequisites provided by your instructor (like installing Node.js, Git, VS Code, Xcode/Android Studio, and simulators/emulators) before proceeding with these project-specific steps.

**Goal:** To ensure you can reliably run the SpeedyMeds starting application on your configured iOS Simulator or Android Emulator and utilize the project's development tools effectively.

---

## Project Installation and Running

1.  **Navigate to Project Root:** Open your terminal and ensure you are in the main project directory (the one containing `package.json`) that you cloned earlier.
    ```bash
    cd path/to/SpeedyMeds
    ```

2.  **Review Environment File (`.env`):**
    - This project includes a pre-configured `.env` file in the root directory containing:
      ```
      NODE_TLS_REJECT_UNAUTHORIZED=0
      REACT_NATIVE_PACKAGER_HOSTNAME=localhost
      ```
    - **Purpose:** These settings help bypass potential SSL certificate issues in certain development/corporate networks (`NODE_TLS_REJECT_UNAUTHORIZED`) and ensure the Expo Metro bundler connects reliably to your simulator/emulator (`REACT_NATIVE_PACKAGER_HOSTNAME`).
    - **Action Needed:** **None.** You do not need to create or modify this file unless specifically instructed due to unique network issues.
    - **Important Note:** The `.env` file is listed in `.gitignore` and should **not** be committed to version control.

3.  **Install Dependencies (Crucial Step!):**
    - Use the `npm install --legacy-peer-deps` command for the initial setup:
      ```bash
      npm install --legacy-peer-deps
      ```
    - **Why `--legacy-peer-deps`?** It's often needed in React Native projects to resolve conflicting version requirements between different libraries.

4.  **Ensure Simulator/Emulator is Running:** Double-check that your chosen iOS Simulator or Android Emulator is running and fully booted.

5.  **Start the Expo Development Server:**
    - Since `REACT_NATIVE_PACKAGER_HOSTNAME=localhost` is set in the `.env` file, you typically do not need the `--localhost` flag.
      ```bash
      npx expo start
      ```
    - This command starts the Metro Bundler and provides a development server. It will output logs, a QR code, and interactive prompts in your terminal.

6.  **Run the App on Simulator/Emulator:**
    - In the terminal where Metro is running:
      - Press `i` to attempt to open the app on the running **iOS Simulator**.
      - Press `a` to attempt to open the app on the running **Android Emulator**.
    - Expo CLI will automatically install the Expo Go client app onto the simulator/emulator if it's not already present, and then launch your SpeedyMeds project inside Expo Go. You should see the placeholder screen for the "Home" tab.

---

## Managing Dependencies (Adding New Packages Later)

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

## Troubleshooting Common Setup Issues

- **Errors mentioning "Watchman":** Watchman is a file-watching service used by Metro. If you see errors related to it (especially on macOS), try installing/reinstalling it via Homebrew: `brew update && brew install watchman` and `brew reinstall watchman`. Restarting your computer might also help.
- **Cannot Connect to Metro Bundler / App Doesn't Load:**
  - Ensure your simulator/emulator is running _before_ starting Metro (`npx expo start`).
  - Make sure your computer and emulator/simulator can connect (check firewalls if applicable). The pre-configured `.env` file should help, but ensure no other network configurations are interfering.
  - Try restarting Metro (`Ctrl+C` in the terminal, then `npx expo start`).
  - Try clearing caches: Run `npx expo start --clear` (clears Metro cache). Inside the Expo Go app on the simulator/device (if it partially loads), go to settings and clear cache there too.
  - As a last resort, try wiping the emulator data (in Android Studio Device Manager > Virtual Device Actions > Wipe Data) or resetting the simulator content and settings (in Simulator menu > Device > Erase All Content and Settings...). **Warning:** This deletes all apps and data on the simulator/emulator.
- **Android SDK / Emulator Issues:**
  - Ensure you have installed appropriate "Android SDK Platform" and "Android SDK Build-Tools" versions via Android Studio's SDK Manager (`Tools` > `SDK Manager`). Check Expo documentation for recommended versions if encountering build issues.
  - Make sure HAXM (Intel) or AMD Hypervisor/Windows Hypervisor Platform is correctly installed and enabled for emulator acceleration if applicable (check Android Studio setup guides).
- **Peer Dependency Errors during `npm install`:** Using the `--legacy-peer-deps` flag (as recommended in Step 3) should resolve most of these. If issues persist after adding a *new* package with `npm install`, try `npm install [package-name] --legacy-peer-deps`.

For more in-depth troubleshooting, consult the official [Expo Environment setup guide](https://docs.expo.dev/workflow/getting-started/#set-up-your-environment) and search the Expo forums or GitHub issues.

---

You should now have a working development environment! Refer back to the main [README.md](./README.md) and [USAGE.md](./USAGE.md) for instructions on interacting with the starting application, debugging, testing, and understanding the project structure. Happy coding!
