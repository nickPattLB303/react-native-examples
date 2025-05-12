## Section 8: Essential Expo CLI Commands

The Expo CLI is your primary tool for managing and running your Expo project. While it offers many commands, this section covers the most essential ones you'll use frequently during development.

Remember, the recommended way to run these commands is using `npx expo <command>` within your project directory.

### Core Development Commands

**1. `npx expo start`**

Starts the Metro development server, which bundles your JavaScript code, serves assets, and enables Fast Refresh.

- **Role:** Runs Metro, provides a QR code, opens Dev Tools GUI, offers terminal UI options.
- **Common Options:**
  - `--dev-client`: Starts the server for a Development Build.
  - `--go`: Explicitly starts the server for Expo Go.
  - `--offline`: Attempts to start offline (may fail if caches aren't populated).
  - `--clear`: Clears the Metro cache before starting.
  - `--port <number>`: Use a specific port number.
  - `--tunnel`: Creates a public URL using Expo's tunnel service (via ngrok) to share or connect when not on the same network. Requires `@expo/ngrok`.
  - `-a`, `-i`, `-w`: Shortcut flags to attempt opening on Android, iOS, or Web automatically after starting.
- **Usage:** `npx expo start` (Defaults to Expo Go mode)

**2. `npx expo run:[ios|android]`**

Builds the native project locally and runs it on a simulator/emulator or connected physical device.

- **Role:** Orchestrates native build tools (Xcodebuild, Gradle), installs dependencies (CocoaPods, Maven), builds the `.app`/`.apk`, installs, and launches.
- **Common Options:**
  - `--device [name|udid]`: Target a specific physical device.
  - `--simulator "Simulator Name"` (iOS): Target a specific simulator (use `xcrun simctl list devices` to see names).
  - `--variant [debug|release]` (Android): Specify build variant.
  - `--no-bundler`: Builds and installs the app but does not start the Metro server.
- **Usage:** `npx expo run:ios` or `npx expo run:android`

**3. `npx expo install [package...]`**

Installs JavaScript dependencies, ensuring versions are compatible with your project's Expo SDK.

- **Role:** Checks Expo's compatibility map and instructs npm/yarn/pnpm to install the correct version. Essential for avoiding version mismatches with native modules.
- **Usage:** `npx expo install package-name another-package`

> [!IMPORTANT]
> Always use `npx expo install` over `npm install`/`yarn add` when adding libraries, especially those with native code.

### Project Configuration & Maintenance

**4. `npx expo prebuild`**

Generates the native `ios` and `android` project directories based on `app.json`/`app.config.js` and installed config plugins. This is the core of **Continuous Native Generation (CNG)**.

- **Role:** Reads Expo config, applies config plugins, creates/updates native project files (`Info.plist`, `AndroidManifest.xml`, build files, etc.).
- **Common Options:**
  - `--platform [ios|android]`: Generate only for a specific platform.
  - `--clean`: Deletes existing `ios`/`android` directories before generating.
  - `--no-install`: Skips running `pod install` after generating the `ios` directory.
  - `--template <name|path>`: Use a specific native project template (advanced).
- **Usage:** `npx expo prebuild` (usually run automatically by `run:*` commands if needed, but can be run manually).

**5. `npx expo config`**

Inspects the fully resolved configuration of your project after processing `app.json`/`app.config.js` and config plugins.

- **Role:** Useful for debugging configuration issues or seeing the final values that will be used during prebuild or builds.
- **Common Options:**
  - `--type [public|prebuild|introspect]`: Shows different views of the config (`public` is the static JSON, `prebuild` shows values used for native generation, `introspect` shows plugin details).
  - `-p [ios|android]`: Show platform-specific config.
- **Usage:** `npx expo config` or `npx expo config --type prebuild -p ios`

**6. `npx expo doctor`**

Diagnoses potential issues with your project setup, dependencies, or environment.

- **Role:** Checks for common problems like mismatched versions, missing dependencies, or environment setup issues.
- **Usage:** `npx expo doctor`

**7. `npx expo upgrade`**

Upgrades your project's Expo SDK version and attempts to install compatible versions of core dependencies.

- **Role:** Modifies `package.json`, installs new versions using `npx expo install`. Read the upgrade guide for the target SDK version carefully before running.
- **Usage:** `npx expo upgrade` (Upgrades to the latest supported SDK) or `npx expo upgrade <sdk-version>`

**8. `npx expo customize [file]`**

Copies default configuration files (like `metro.config.js`, `babel.config.js`, `app.config.js`) into your project for customization.

- **Role:** Provides a starting point if you need to modify default build tool configurations.
- **Usage:** `npx expo customize metro.config.js`

### Expo Account Management (for EAS)

**9. `npx expo login` / `logout` / `whoami`**

Manages authentication with your Expo account, which is required for using Expo Application Services (EAS).

- **Role:** `login` prompts for credentials, `logout` clears credentials, `whoami` shows the currently logged-in user.
- **Usage:** `npx expo login`

### Summary Table

| Command                        | Primary Purpose                                                   |
| :----------------------------- | :---------------------------------------------------------------- | -------------------------------------------------------------- |
| `npx expo start`               | Start Metro dev server, enable Fast Refresh, provide QR code/UI   |
| `npx expo run:[ios             | android]`                                                         | Build native project locally, run on simulator/emulator/device |
| `npx expo install [pkg...]`    | Install dependencies with Expo SDK compatibility checks           |
| `npx expo prebuild`            | Generate/update native `ios`/`android` projects from config (CNG) |
| `npx expo config`              | Inspect resolved project configuration                            |
| `npx expo doctor`              | Diagnose project setup issues                                     |
| `npx expo upgrade`             | Upgrade project to a newer Expo SDK version                       |
| `npx expo customize [file]`    | Copy default config files for customization                       |
| `npx expo login/logout/whoami` | Manage Expo account session (for EAS)                             |

> 📲 **(Native Developers):**
>
> **Comparison:** `start` manages Metro (like running `react-native start` but integrated). `run:*` orchestrates `xcodebuild`/`gradlew`. `install` is a package manager wrapper with version validation. `prebuild` automates native project generation based on JS config (akin to code generation tools). `config` introspects this generation process. `doctor` is a diagnostic tool.
>
> **Key Takeaway:** Expo CLI wraps and extends native tools and package managers with Expo-specific logic and workflows (like CNG and compatibility checks).

> 🌐 **(Web Developers):**
>
> **Comparison:** `start` is like your `npm run dev` or `vite` command. `run:*` has no direct web equivalent but involves native compilation. `install` is `npm install` plus safety checks. `prebuild`/`config` relate to generating the underlying native app structure from your config, somewhat analogous to how a web framework might generate boilerplate or optimized build outputs based on its config.
>
> **Key Takeaway:** Familiar concepts (`start`, `install`) have native-specific enhancements (`run:*`, `prebuild`, compatibility checks).

Mastering these commands provides a solid foundation for your daily Expo development workflow.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Expo CLI Reference](https://docs.expo.dev/more/expo-cli/)
> - Specific command docs are linked from the main reference page (e.g., `start`, `install`, `run:ios`, `prebuild`, `config`, `doctor`, `upgrade`).
