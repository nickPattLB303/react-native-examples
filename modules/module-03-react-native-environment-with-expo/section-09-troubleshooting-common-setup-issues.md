## Section 9: Troubleshooting Common Setup Issues

Setting up a development environment involves several moving parts, and occasionally things don't go perfectly smoothly. This section covers some common issues you might encounter during the installation or project creation process and suggests troubleshooting steps.

### Issue 1: Command Not Found (`node`, `npm`, `yarn`, `watchman`, `npx`, `expo`)

- **Symptom:** You type a command like `node -v` or `npx expo start`, and the terminal responds with `command not found` or similar.
- **Possible Causes & Solutions:**
  - **Installation Failed/Incomplete:** The tool might not have installed correctly. Re-run the installation steps from Section 2 for the specific tool (Node.js/npm, Yarn, Watchman).
  - **PATH Environment Variable:** The directory where the tool was installed might not be in your system's `PATH` environment variable. This tells your terminal where to look for executable commands.
    - Restarting your terminal session or even your computer after installation often resolves PATH issues.
    - For Node.js/npm installed via the official installer, the PATH is usually configured correctly. If using `nvm`, ensure you have selected a Node version (`nvm use <version>`).
    - For Homebrew packages (`watchman`), Homebrew usually handles the PATH configuration. You can try running `brew doctor` to diagnose potential Homebrew issues.
  - **Typos:** Double-check that you typed the command correctly.

### Issue 2: Expo CLI (`npx expo start`) Fails to Start Metro

- **Symptom:** Running `npx expo start` gives errors immediately, often related to port conflicts, Watchman, or modules.
- **Possible Causes & Solutions:**
  - **Port Conflict:** Another process might be using the default port Metro tries to use (often 8081 or 19000-19002). The error message usually indicates this (e.g., `EADDRINUSE`).
    - Stop any other React Native, web development servers, or processes that might be using the port.
    - You can try specifying a different port: `npx expo start --port 8088`
  - **Watchman Issues:** Errors might mention Watchman failing.
    - Ensure Watchman is installed (`brew install watchman`).
    - Try restarting Watchman: `watchman watch-del-all` then `watchman shutdown-server`. `npx expo start` will restart it.
    - Rarely, Watchman might need permissions. Consult Watchman documentation.
  - **Corrupted `node_modules` or Cache:** Sometimes dependencies or caches get into a bad state.
    - **Clean Install:** Stop the server (Ctrl+C).
      ```bash
      rm -rf node_modules
      npm install # or yarn install
      # Optional: Clear Metro cache
      npx expo start --clear
      ```
    - **Clear Expo Cache:** `npx expo start --clear` attempts to clear the Metro bundler cache.

### Issue 3: App Fails to Launch on Simulator/Device

- **Symptom:** `npx expo start` runs, but pressing `i` doesn't open the simulator, or the app crashes immediately upon launch in Expo Go or the simulator.
- **Possible Causes & Solutions:**
  - **Simulator Not Set Up/Running:** Ensure Xcode/Command Line Tools are installed. Try opening the Simulator app manually first (`Xcode > Open Developer Tool > Simulator`) and booting a device.
  - **Expo Go Outdated/Corrupted (on Simulator):** Sometimes the Expo Go app instance on the simulator gets stuck. You can try deleting the Expo Go app from the simulator (`Hardware > Erase All Content and Settings...` - **Warning:** this resets the entire simulator) or simply deleting the app like you would on a real device (long-press, then click the 'x'). Then press `i` again in the terminal; Expo CLI should reinstall Expo Go.
  - **Network Issues (Device):** If using Expo Go on a physical device, double-check that your computer and device are on the _same_ Wi-Fi network and can communicate (see Section 6). Try restarting Wi-Fi on both devices.
  - **Incompatible Dependencies:** If you recently installed a library (especially using `npm install` instead of `npx expo install`), it might be incompatible. Check the terminal output from `npx expo start` for specific error messages pointing to a particular module.
    - Try uninstalling the problematic package (`npm uninstall <package>` or `yarn remove <package>`) and reinstalling using `npx expo install <package>`.
    - If the error persists after installing with `npx expo install`, the library itself might have a bug or incompatibility with your Expo SDK version. Check the library's GitHub issues.
  - **Project Build Errors (Less common with Expo Go):** Look closely at the Metro bundler output in the terminal. Errors in your JavaScript/TypeScript code (`App.tsx` or other files) will often be reported here.

### Issue 4: Dependency Installation Issues (`npm`/`yarn`/`npx expo install`)

- **Symptom:** Installation commands fail with errors like `EPERM`, `permission denied`, network errors, or dependency conflicts (`peer dependency` warnings).
- **Possible Causes & Solutions:**
  - **Permissions:** Rarely, file system permissions might be incorrect. Running commands with `sudo` is generally **not** recommended for package management. Fix permissions on the relevant directories (`node_modules`, global install locations) if necessary, though this is complex.
  - **Network Problems:** Ensure you have a stable internet connection. Firewalls or proxies might interfere.
  - **Corrupted Cache:** Clear npm or yarn cache.
    - `npm cache clean --force`
    - `yarn cache clean`
  - **Peer Dependency Warnings:** These often appear but might not prevent your app from working. They indicate potential incompatibilities between your direct dependencies and _their_ dependencies. Read the warnings carefully. `npx expo install` helps avoid many critical conflicts.
    - Sometimes running `npm install --legacy-peer-deps` or adding `--legacy-peer-deps` to your `.npmrc` file can bypass stricter checks, but use this cautiously as it might hide real problems.

> [!TIP]
> When encountering errors, always read the error messages carefully. They often provide specific clues about the problem. Copying and searching for the error message online (along with terms like "React Native" or "Expo") is a standard developer troubleshooting technique.

### Challenge 3: Environment Setup Verification (Checklist/Quiz - Microsoft Forms)

This challenge verifies that you have successfully installed all the necessary tools and can run the core commands covered in this module.

**(URL_to_Tool)**

> 📚 **Official Documentation:**
>
> - [Expo Docs: Troubleshooting](https://docs.expo.dev/troubleshooting/errors/)
> - [React Native Docs: Troubleshooting](https://reactnative.dev/docs/troubleshooting)
