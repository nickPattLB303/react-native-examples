## Section 8: Essential Expo CLI Commands (`start`, `install`, `run:ios`)

The Expo CLI is your primary tool for managing and running your Expo project. While it offers many commands, this section focuses on the most essential ones you'll use frequently during development: `start`, `install`, and `run:ios`.

Remember, the recommended way to run these commands is using `npx expo <command>` within your project directory.

### 1. `npx expo start`

This is arguably the most fundamental command. It starts the Metro development server, which bundles your JavaScript code and serves it to the Expo Go app or your development build.

**What it does:**

- Starts the Metro Bundler.
- Opens Expo Dev Tools in your web browser (a GUI for managing the server and viewing logs).
- Displays a QR code in the terminal for connecting with Expo Go on physical devices.
- Provides keyboard shortcuts in the terminal to open your app on simulators (`i` for iOS, `a` for Android), web (`w`), show the QR code again (`c`), or reload the app (`r`).
- Watches your project files for changes and enables Live/Hot Reloading (Fast Refresh).

**Usage:**

```bash
cd path/to/your/SpeedyMedsPrototype
npx expo start
```

- _Image: Screenshot of Expo Dev Tools web interface opened after running `npx expo start`._
- _Caption: Expo Dev Tools provides a graphical interface in your browser to manage the development server, view connection status, see device logs, and access build settings._

### 2. `npx expo install [package-name]`

When adding new libraries (dependencies) to your Expo project, especially those with native code, you should **always** use `npx expo install` instead of `npm install` or `yarn add`.

**Why use `npx expo install`?**

- **Version Compatibility:** Expo projects rely on specific versions of libraries that are tested and known to work together within a particular Expo SDK version. `npx expo install` automatically selects a compatible version of the library for your project's SDK, preventing potential version conflicts or native build errors.
- **Native Dependency Handling:** For libraries that include native code, `expo install` can sometimes perform additional configuration steps required for them to work correctly within the Expo managed workflow.

**Usage:**

```bash
cd path/to/your/SpeedyMedsPrototype

# Example: Install React Native Paper (UI library)
npx expo install react-native-paper

# Example: Install React Navigation (Navigation library)
npx expo install @react-navigation/native
```

> [!IMPORTANT]
> Using `npm install` or `yarn add` directly for packages that interact with the Expo SDK or have native components can lead to difficult-to-diagnose errors or crashes because you might install an incompatible version. Always prefer `npx expo install` for adding dependencies to Expo projects.

### 3. `npx expo run:ios` / `npx expo run:android`

While `npx expo start` combined with Expo Go or the simulator (`i`/`a` keys) is great for initial development, sometimes you need to build and run the native project directly, especially:

- When you add custom native code.
- When you need to test features not fully supported by Expo Go (rare for Expo SDK modules).
- When creating a _development build_ that includes specific native libraries not bundled in Expo Go.

`npx expo run:ios` and `npx expo run:android` compile the native code (`ios` or `android` directories) for your project and install/launch the app on a connected device or simulator/emulator.

**What it does:**

- Ensures you have the native directories (`ios`/`android`). If not, it might prompt you to run `npx expo prebuild` first.
- Installs native dependencies (using CocoaPods for iOS, Gradle for Android).
- Builds the native application binary (`.app` for iOS Simulator, `.apk` for Android).
- Installs and launches the built app on a target device/simulator.
- Connects the running app to the Metro development server (if started).

**Usage:**

```bash
cd path/to/your/SpeedyMedsPrototype

# Build and run on an iOS simulator or connected device
npx expo run:ios

# Build and run on an Android emulator or connected device
# npx expo run:android
```

> [!NOTE]
> Running `npx expo run:ios` typically requires a full Xcode installation, not just the Command Line Tools, as it invokes the Xcode build system. Similarly, `npx expo run:android` requires Android Studio setup. This process is slower than using Expo Go because it involves native compilation.

> 📲 **(Native Developers - iOS & Android):** `npx expo run:ios` is conceptually similar to pressing the "Run" button in Xcode for your project. It triggers the native build process (compiling Swift/Objective-C, running CocoaPods) and deploys the result to a target. `npx expo run:android` does the equivalent using Gradle and the Android toolchain. Expo CLI orchestrates these native build tools for you.

Mastering these three commands (`start`, `install`, `run:ios`) provides a solid foundation for your daily Expo development workflow.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Expo CLI Commands](https://docs.expo.dev/more/expo-cli/)
> - [Expo Docs: `expo start`](https://docs.expo.dev/more/expo-cli/#expo-start)
> - [Expo Docs: `expo install`](https://docs.expo.dev/more/expo-cli/#expo-install)
> - [Expo Docs: `expo run:ios`](https://docs.expo.dev/more/expo-cli/#expo-runios)
> - [Expo Docs: `expo run:android`](https://docs.expo.dev/more/expo-cli/#expo-runandroid)
