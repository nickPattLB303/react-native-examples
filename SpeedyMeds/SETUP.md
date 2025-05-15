# SpeedyMeds: Project Setup Guide

This guide helps you get the **SpeedyMeds** React Native project installed and running. Before you start here, make sure you've got the basic development tools set up (Node.js, Git, VS Code, Xcode/Android Studio, etc.) as covered in the main course prerequisites.

**Goal:** Get the SpeedyMeds starter app running smoothly on your iOS Simulator or Android Emulator.

---

## Project Installation and Running

1.  **Navigate to Project Root:** Open your terminal, `cd` into the project directory you cloned.
    ```bash
    cd path/to/SpeedyMeds
    ```

2.  **About the `.env` File:**
    - You'll find a `.env` file in the project root with a couple of settings:
      ```
      NODE_TLS_REJECT_UNAUTHORIZED=0
      REACT_NATIVE_PACKAGER_HOSTNAME=localhost
      ```
    - **Purpose:** These help the app connect properly during development, especially if you're on certain networks. `NODE_TLS...` helps with potential SSL issues, and `REACT_NATIVE...` helps the bundler find your simulator/emulator.
    - **Action Needed:** **Probably none!** Just leave this file as is unless you run into specific connection problems and your instructor advises changes.
    - **Note:** This file isn't typically tracked by Git, so don't commit any changes you might make.

3.  **Install Dependencies:** Grab all the necessary libraries.
    ```bash
    # This command installs everything listed in package.json
    npm install --legacy-peer-deps
    ```
    - **Why `--legacy-peer-deps`?** Sometimes different React Native libraries ask for slightly different versions of shared packages. This flag tells npm to be a bit more flexible, which often helps the install succeed.

4.  **Start Your Simulator/Emulator:** Fire up your preferred virtual device.

5.  **Start the App:** Run the start script in your terminal.
    ```bash
    # This starts the Metro bundler
    npx expo start
    ```
    - Look for the QR code and command prompts in the terminal output.

6.  **Open on Device:**
    - In the terminal where Metro is running:
      - Press `i` → Open on iOS Simulator.
      - Press `a` → Open on Android Emulator.
    - Expo Go (the helper app) will install on the simulator/emulator if needed, and then your SpeedyMeds app should launch, showing the "Home Screen Placeholder".

---

## Managing Dependencies (Adding New Packages Later)

If you need to add more libraries as you build features:

- **For native-linked libraries (maps, camera, gestures, etc.):** Use `npx expo install [package-name]`. This helps ensure compatibility with your Expo version.
- **For pure JavaScript libraries (`date-fns`, etc.):** `npm install [package-name]` is usually fine.

Use `--save-dev` (for npm) or add `--dev` (for expo install) for development-only tools like types (`@types/...`).

---

## Troubleshooting Tips

Hit a snag? Here are a few common things to try:

- **Watchman Errors (macOS)?** Try `brew update && brew install watchman` or `brew reinstall watchman`.
- **Connection Issues?**
  - Make sure the simulator/emulator is running *before* `npx expo start`.
  - Check firewalls. The pre-configured `.env` file should help, but ensure no other network configurations are interfering.
  - Restart Metro (`Ctrl+C`, then `npx expo start`).
  - Clear caches: `npx expo start --clear`. You can also clear cache within the Expo Go app settings.
  - Last resort: Wipe emulator data / Erase simulator content (Warning: deletes all apps/data on the virtual device!).
- **Android Issues?** Check installed SDK Platforms/Build Tools in Android Studio's SDK Manager. Ensure Hypervisor acceleration (HAXM, AMD Hypervisor, etc.) is correctly installed and enabled.
- **Dependency Errors?** The `--legacy-peer-deps` flag during install usually helps. If errors pop up after adding a *new* package, try installing it with `npm install [package-name] --legacy-peer-deps`.

Check the official [Expo Environment setup guide](https://docs.expo.dev/workflow/getting-started/#set-up-your-environment) for more help.

---

You should be ready to code! Check out `README.md` and `USAGE.md` for more info on the project. Happy coding!
