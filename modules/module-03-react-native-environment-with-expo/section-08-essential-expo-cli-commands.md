# Section 8: Essential Expo CLI commands

Mastering Expo CLI commands is crucial for efficient React Native development. This section provides a comprehensive reference to the most important commands you'll use daily, along with practical examples and usage patterns for cross-platform development.

## Command categories overview

Expo CLI commands are organized into logical categories based on their purpose in the development workflow. Understanding these categories helps you quickly find the right command for your task.

### Development workflow commands

Commands for daily development tasks:

- **`npx expo start`** - Start the development server
- **`npx expo run:ios`** - Build and run on iOS Simulator (macOS only)
- **`npx expo run:android`** - Build and run on Android emulator
- **`npx expo install`** - Install packages with SDK compatibility

### Project management commands

Commands for project setup and configuration:

- **`npx create-expo-app`** - Create new Expo projects
- **`npx expo prebuild`** - Generate native code for development builds
- **`npx expo config`** - View and validate project configuration
- **`npx expo doctor`** - Diagnose common project issues

### Build and deployment commands

Commands for production builds and publishing:

- **`npx expo build`** - Build app binaries (legacy)
- **`eas build`** - Build with Expo Application Services (modern)
- **`npx expo export`** - Export for web deployment
- **`npx expo publish`** - Publish to Expo's hosting service

> 🌐 **Web Developers:**
>
> **Comparison:** Expo CLI commands serve a similar role to scripts in web development (like `npm run build`, `npm start`) but are specifically designed for mobile development workflows. They handle complex tasks like native builds, device deployment, and cross-platform asset management that web development doesn't require.
>
> **Key Takeaway:** These commands abstract away the complexity of mobile development while providing fine-grained control when needed.
>
> **Source:** [npm Scripts Documentation](https://docs.npmjs.com/cli/v8/using-npm/scripts)

## Core development commands

These commands form the foundation of daily React Native development with Expo.

### npx expo start

The primary command for starting your development environment.

**Basic usage:**

```bash
npx expo start
```

**Common options:**

| **Flag**       | **Purpose**                         | **Usage Example**             |
| -------------- | ----------------------------------- | ----------------------------- |
| `--clear`      | Clear Metro bundler cache           | `npx expo start --clear`      |
| `--dev-client` | Start for development builds        | `npx expo start --dev-client` |
| `--tunnel`     | Use tunneling for remote access     | `npx expo start --tunnel`     |
| `--offline`    | Work without internet connection    | `npx expo start --offline`    |
| `--web`        | Start web development server        | `npx expo start --web`        |
| `--ios`        | Automatically open iOS Simulator    | `npx expo start --ios`        |
| `--android`    | Automatically open Android emulator | `npx expo start --android`    |

**When to use different options:**

- **`--clear`**: When experiencing caching issues or after major dependency changes
- **`--tunnel`**: When working on corporate networks or sharing with remote devices
- **`--dev-client`**: When testing custom native code or using development builds
- **`--offline`**: When working without internet or to test offline functionality
- **`--ios`**: Quick start with iOS Simulator (macOS only)
- **`--android`**: Quick start with Android emulator (all platforms)

**Example development session:**

```bash
# Start with cache clear after installing new packages
npx expo start --clear

# Or start and immediately open iOS Simulator (macOS only)
npx expo start --ios

# Or start and immediately open Android emulator (all platforms)
npx expo start --android

# Start with tunnel for network-restricted environments
npx expo start --tunnel
```

### npx expo install

Installs packages with Expo SDK compatibility checking.

**Basic usage:**

```bash
npx expo install package-name
```

**Installing multiple packages:**

```bash
npx expo install @react-navigation/native @react-navigation/stack expo-permissions
```

**Key benefits over npm install:**

- **SDK Compatibility**: Ensures package versions work with your Expo SDK version
- **Automatic Resolution**: Handles version conflicts automatically
- **Team Consistency**: All team members get the same compatible versions

**Example package installation workflow:**

```bash
# Install React Native Paper UI library
npx expo install react-native-paper

# Install navigation dependencies
npx expo install @react-navigation/native @react-navigation/stack

# Install Expo SDK modules
npx expo install expo-camera expo-location expo-notifications
```

### npx expo run:ios

Builds and runs your app on iOS Simulator with development build capabilities (macOS only).

**Basic usage:**

```bash
npx expo run:ios
```

**Common options:**

| **Flag**           | **Purpose**              | **Usage Example**                           |
| ------------------ | ------------------------ | ------------------------------------------- |
| `--device`         | Specify simulator device | `npx expo run:ios --device "iPhone 15 Pro"` |
| `--clear`          | Clear build cache        | `npx expo run:ios --clear`                  |
| `--no-build-cache` | Disable build caching    | `npx expo run:ios --no-build-cache`         |
| `--configuration`  | Set build configuration  | `npx expo run:ios --configuration Release`  |

**When to use run:ios vs expo start:**

- **Use `run:ios`** when:

  - Testing custom native modules
  - Working with development builds
  - Need full native build control

- **Use `expo start --ios`** when:
  - Using managed workflow
  - Standard development without custom native code
  - Want faster iteration cycles

### npx expo run:android

Builds and runs your app on Android emulator with development build capabilities (all platforms).

**Basic usage:**

```bash
npx expo run:android
```

**Common options:**

| **Flag**           | **Purpose**             | **Usage Example**                              |
| ------------------ | ----------------------- | ---------------------------------------------- |
| `--device`         | Specify emulator device | `npx expo run:android --device Pixel_7_API_34` |
| `--clear`          | Clear build cache       | `npx expo run:android --clear`                 |
| `--variant`        | Specify build variant   | `npx expo run:android --variant release`       |
| `--no-build-cache` | Disable build caching   | `npx expo run:android --no-build-cache`        |

**Android-specific options:**

```bash
# List available Android devices
npx expo run:android --device

# Run on specific Android Virtual Device
npx expo run:android --device Pixel_7_API_34

# Build release variant for testing
npx expo run:android --variant release
```

**When to use run:android vs expo start:**

- **Use `run:android`** when:

  - Testing custom native modules
  - Working with development builds
  - Need to test Android-specific features
  - Testing production build variants

- **Use `expo start --android`** when:
  - Using managed workflow
  - Standard development without custom native code
  - Want faster iteration cycles

> 🤖 **Android Developers:**
>
> **Comparison:** The `run:android` command works similarly to running your app from Android Studio. It compiles the native Android project and installs the APK on your emulator or device. The main difference is that you're working with React Native/Expo project structure instead of traditional Android project structure.
>
> **Key Takeaway:** Your existing Android build and deployment knowledge applies directly to React Native development.
>
> **Source:** [Android Developer Build Guide](https://developer.android.com/studio/run)

## Project configuration commands

These commands help manage project settings and diagnose issues.

### npx expo config

Displays your project configuration in a readable format.

**Basic usage:**

```bash
npx expo config
```

**Options:**

| **Flag** | **Purpose**             | **Usage Example**               |
| -------- | ----------------------- | ------------------------------- |
| `--type` | Specify config type     | `npx expo config --type public` |
| `--full` | Show full configuration | `npx expo config --full`        |

**Understanding configuration output:**

```json
{
  "name": "SpeedyMeds",
  "slug": "speedymeds",
  "version": "1.0.0",
  "sdkVersion": "52.0.0",
  "platforms": ["ios", "android", "web"],
  "ios": {
    "bundleIdentifier": "com.yourcompany.speedymeds"
  },
  "android": {
    "package": "com.yourcompany.speedymeds"
  }
}
```

**When to use `expo config`:**

- Verify app.json settings are applied correctly
- Debug configuration issues
- Check resolved SDK versions
- Validate platform-specific settings

### npx expo doctor

Diagnoses common project issues and provides solutions.

**Basic usage:**

```bash
npx expo doctor
```

**Common issues detected:**

- **Dependency Conflicts**: Incompatible package versions
- **Configuration Errors**: Invalid app.json settings
- **Environment Issues**: Missing or outdated tools
- **Platform Problems**: iOS/Android setup issues

**Example doctor output:**

```
✅ Expo CLI is up to date
✅ Expo SDK dependencies are compatible
⚠️  react-native-gesture-handler is not compatible with SDK 52
❌ Android SDK not found

Issues found:
1. Run: npx expo install react-native-gesture-handler
2. Install Android SDK or set ANDROID_HOME environment variable
```

### npx expo prebuild

Generates native iOS and Android project files for development builds.

**Basic usage:**

```bash
npx expo prebuild
```

**Options:**

| **Flag**     | **Purpose**                       | **Usage Example**                           |
| ------------ | --------------------------------- | ------------------------------------------- |
| `--clear`    | Clear existing native directories | `npx expo prebuild --clear`                 |
| `--platform` | Generate for specific platform    | `npx expo prebuild --platform ios`          |
| `--template` | Use specific template             | `npx expo prebuild --template bare-minimum` |

**Platform-specific prebuild:**

```bash
# Generate only iOS native code (macOS only)
npx expo prebuild --platform ios

# Generate only Android native code (all platforms)
npx expo prebuild --platform android

# Generate both platforms
npx expo prebuild
```

**When to use prebuild:**

- Adding custom native modules
- Configuring advanced native settings
- Transitioning from managed to bare workflow
- Creating development builds

> [!IMPORTANT]
> Running `prebuild` changes your project structure significantly by adding `ios/` and `android/` directories. This is typically done when you need features beyond the managed workflow.

## Utility and debugging commands

Commands for troubleshooting and project maintenance.

### npx expo customize

Allows customization of Metro bundler and other configurations.

**Basic usage:**

```bash
npx expo customize
```

**Customizable configurations:**

- **Metro config**: `metro.config.js` for bundler customization
- **Babel config**: Advanced Babel transformations
- **Webpack config**: Web-specific build settings

### npx expo export

Exports your app for web deployment or static hosting.

**Basic usage:**

```bash
npx expo export
```

**Platform-specific export:**

```bash
# Export for all platforms
npx expo export

# Export for specific platform
npx expo export --platform ios
npx expo export --platform android
npx expo export --platform web
```

**Output structure:**

```
dist/
├── assets/           # Optimized images and fonts
├── bundles/         # Platform-specific JavaScript bundles
│   ├── ios/         # iOS-specific bundle
│   ├── android/     # Android-specific bundle
│   └── web/         # Web-specific bundle
├── index.html       # Entry point for web (if web platform enabled)
└── manifest.json    # App manifest
```

**Use cases:**

- Deploy to static hosting (Netlify, GitHub Pages)
- Create offline-capable web apps
- Generate optimized production builds

## Build and publishing commands

Commands for creating production-ready applications.

### npx expo publish (Legacy)

Publishes your app to Expo's hosting service for easy sharing.

**Basic usage:**

```bash
npx expo publish
```

**Publishing workflow:**

1. Builds optimized JavaScript bundle
2. Uploads to Expo's CDN
3. Generates shareable URL and QR code
4. Makes app available in Expo Go

**Example publish output:**

```
Publishing project...
📦 Building bundle
🚀 Uploading assets
✅ Published
📱 Project URL: https://exp.host/@username/speedymeds
```

### eas build (Modern)

The modern way to build production app binaries using Expo Application Services.

**Basic setup:**

```bash
npm install -g eas-cli
eas login
eas build:configure
```

**Build for specific platforms:**

```bash
# Build for iOS (macOS only for local testing)
eas build --platform ios

# Build for Android (all platforms)
eas build --platform android

# Build for all platforms
eas build --platform all
```

> [!NOTE]
> EAS (Expo Application Services) is covered in detail in Module 16. This section provides basic awareness of the commands available.

## Command chaining and workflows

Combine commands effectively for common development scenarios.

### Daily development workflow

```bash
# Morning setup - choose your platform
cd SpeedyMeds

# Option 1: iOS development (macOS only)
npx expo start --clear --ios

# Option 2: Android development (all platforms)
npx expo start --clear --android

# Option 3: Multi-platform development
npx expo start --clear
# Then press 'i' for iOS or 'a' for Android

# Install new package during development
npx expo install react-native-elements

# Restart development server after package installation
# (Press Ctrl+C to stop, then restart)
npx expo start
```

### Cross-platform testing workflow

```bash
# Test on both platforms during development
npx expo start

# In terminal interface:
# Press 'i' to test on iOS Simulator (macOS only)
# Press 'a' to test on Android Emulator
# Press 'w' to test in web browser

# Or use tunnel for physical devices
npx expo start --tunnel
# Scan QR code with Expo Go on multiple devices
```

### Troubleshooting workflow

```bash
# Diagnose issues
npx expo doctor

# Clear all caches
npx expo start --clear

# Check configuration
npx expo config

# Reinstall dependencies if needed
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### Pre-deployment workflow

```bash
# Verify configuration
npx expo config --full

# Run final tests on all platforms
npx expo start --clear

# Export for web (if needed)
npx expo export --platform web

# Build for app stores (modern approach)
eas build --platform all
```

## Command flags and options reference

Understanding common flags helps you use commands more effectively.

### Global flags (work with most commands)

| **Flag**            | **Purpose**              | **Commands**                                  |
| ------------------- | ------------------------ | --------------------------------------------- |
| `--help`            | Show command help        | All commands                                  |
| `--version`         | Show CLI version         | All commands                                  |
| `--non-interactive` | Skip interactive prompts | Most commands                                 |
| `--clear`           | Clear caches             | `start`, `run:ios`, `run:android`, `prebuild` |

### Platform-specific flags

| **Flag**    | **Purpose**             | **Commands**                    |
| ----------- | ----------------------- | ------------------------------- |
| `--ios`     | Target iOS platform     | `start`, `run:ios`, `build`     |
| `--android` | Target Android platform | `start`, `run:android`, `build` |
| `--web`     | Target web platform     | `start`, `export`               |

### Development flags

| **Flag**       | **Purpose**           | **Commands** |
| -------------- | --------------------- | ------------ |
| `--dev-client` | Use development build | `start`      |
| `--tunnel`     | Enable tunneling      | `start`      |
| `--offline`    | Work offline          | `start`      |
| `--port`       | Specify port          | `start`      |

## Platform-specific command patterns

### iOS development patterns (macOS only)

```bash
# Quick iOS development start
npx expo start --ios

# iOS with development build
npx expo run:ios --configuration Debug

# iOS release build for testing
npx expo run:ios --configuration Release

# iOS with specific simulator
npx expo run:ios --device "iPhone 15 Pro Max"
```

### Android development patterns (all platforms)

```bash
# Quick Android development start
npx expo start --android

# Android with development build
npx expo run:android --variant debug

# Android release build for testing
npx expo run:android --variant release

# Android with specific emulator
npx expo run:android --device Pixel_7_API_34
```

### Cross-platform development patterns

```bash
# Start development server for all platforms
npx expo start

# Export for all platforms
npx expo export --platform all

# Install packages (works for all platforms)
npx expo install react-native-paper

# Publish to Expo Go (works on all devices)
npx expo publish
```

## Best practices for command usage

Follow these patterns for efficient development workflows.

### Use descriptive flags

```bash
# Good: Clear intent
npx expo start --clear --android

# Less clear: Abbreviated flags might be confusing to teammates
npx expo start -c -a
```

### Combine related operations

```bash
# Efficient: Install and restart in sequence
npx expo install react-native-paper && npx expo start --clear
```

### Leverage configuration files

Instead of always using command flags, configure defaults in `package.json`:

```json
{
  "scripts": {
    "start": "expo start --clear",
    "ios": "expo start --ios",
    "android": "expo start --android",
    "tunnel": "expo start --tunnel"
  }
}
```

Then use shorter npm commands:

```bash
npm start
npm run ios      # macOS only
npm run android  # All platforms
npm run tunnel   # Network-restricted environments
```

### Document team conventions

Create a project README documenting which commands and flags your team uses:

```markdown
## Development Commands

- `npm start` - Start development server with cache clear
- `npm run ios` - Start and open iOS Simulator (macOS only)
- `npm run android` - Start and open Android Emulator (all platforms)
- `npm run tunnel` - Start with tunnel for network issues
- `npx expo install PACKAGE` - Install packages (always use this over npm install)
- `npx expo doctor` - Run before reporting bugs
```

## Official documentation

> 📚 **Official Documentation:**
>
> - [Expo CLI Reference](https://docs.expo.dev/workflow/expo-cli/)
> - [EAS CLI Reference](https://docs.expo.dev/build-reference/e)
> - [Metro Configuration](https://docs.expo.dev/guides/customizing-metro/)
> - [Expo Configuration](https://docs.expo.dev/workflow/configuration/)
>
> 🗂️ **Additional Resources:**
>
> - [Expo CLI GitHub Repository](https://github.com/expo/expo-cli)
> - [Command Line Interface Best Practices](https://clig.dev/)

## Next steps

You now have a comprehensive understanding of essential Expo CLI commands for cross-platform React Native development. These commands will become second nature as you progress through your development journey. The next section addresses common setup and configuration issues you might encounter across different platforms, providing practical solutions to keep your development environment running smoothly.
