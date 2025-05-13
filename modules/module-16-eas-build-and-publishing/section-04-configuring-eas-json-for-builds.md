## Section 4: Configuring `eas.json` for Builds

This section focuses on `eas.json`, the configuration file that gives you fine-grained control over your EAS Build process. You'll learn what `eas.json` is, how to generate and structure it, and how to define different build profiles for various purposes like development, preview, and production.

### What is `eas.json`?

`eas.json` is a JSON file that resides in the root of your project. Its primary purpose is to define "build profiles." A build profile is a named set of configurations that tells EAS Build how to build your app. By using different profiles, you can create builds tailored for specific needs, such as a development build with debugging enabled, or a production build optimized for the app stores.

This file is your central point of control for customizing the build environment, specifying credentials, setting environment variables, and much more. It allows for reproducible builds and a configuration-as-code approach to your build pipeline.

### Generating and Structuring `eas.json`

While you can create `eas.json` manually, the recommended way to initialize it is by using the EAS CLI:

```bash
eas build:configure
```

Running this command in your project's root directory will ask you a few questions and generate an `eas.json` file with default profiles. If the file already exists, EAS CLI will respect its content and may help you add new platforms if they are not yet configured.

A typical `eas.json` file structure looks like this:

```json
{
  "cli": {
    "version": ">= 3.0.0" // Specifies the compatible EAS CLI version range
  },
  "build": {
    "development": {
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "buildConfiguration": "Debug"
      },
      "env": {
        "APP_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "distribution": "store",
      "env": {
        "APP_ENV": "production"
      }
      // Platform-specific settings for production can be added here
    }
  },
  "submit": {
    "production": {}
    // Configurations for EAS Submit can be defined here
  }
}
```

**Key parts of the structure:**

- **`cli.version`**: Specifies the version range of `eas-cli` that is compatible with this configuration file. This helps ensure that your builds don't break due to incompatible CLI versions.
- **`build`**: This is the main object containing all your build profiles. Each key under `build` (e.g., `development`, `preview`, `production`) is a distinct build profile.
- **Build Profiles (e.g., `development`, `production`):** Each profile object contains configurations specific to that build type.
- **`submit`**: This object contains configurations for EAS Submit, allowing you to define profiles for submitting your app to the stores.

### Understanding Build Profiles

EAS Build profiles allow you to manage different build configurations for your app without altering your application code. Common default profiles include:

- **`development`**: Typically used for creating development builds with debugging enabled. These builds often include a development client, allowing you to load your project from a development server (`npx expo start --dev-client`) for rapid iteration with custom native code.
- **`preview`**: Often used for internal distribution or QA testing. These builds might point to a staging backend and can be quickly shared with testers.
- **`production`**: Used for creating release builds that are optimized and ready for submission to the Apple App Store or Google Play Store.

You can name your profiles anything you like, but these three provide a good starting point. You can select a profile when initiating a build using `eas build -p <profile-name>`.

### Common Properties in a Build Profile

Within each build profile, you can specify various properties to control the build process:

- **`extends`**: Allows one profile to inherit configurations from another, reducing duplication. For example, your `preview` profile might extend `production` and only override specific settings.
- **`distribution`**: Determines how the app will be distributed. Common values:
  - `"store"`: For builds intended for app stores.
  - `"internal"`: For internal distribution (e.g., to testers via ad-hoc or enterprise provisioning).
- **`channel`**: (Primarily for EAS Update) Specifies the update channel for the build. This allows you to release updates to specific builds.
- **`env`**: An object where you can define environment variables that will be available during the build process and can be embedded into your app. Example: `"env": { "API_URL": "https://api.example.com" }`.
- **`credentialsSource`**: Specifies where EAS Build should get your build credentials (signing certificates, provisioning profiles). Can be `"local"` (you manage them locally and upload them) or `"remote"` (EAS manages them for you – recommended for simplicity).
- **`developmentClient`**: A boolean (`true` or `false`). If `true`, EAS Build will create a development client build. Defaults to `false`.
- **Platform-Specific Settings (`android` and `ios`):** Each profile can have nested `android` and `ios` objects to define platform-specific configurations.
  - **Android Specific (`android`):**
    - `buildType`: Can be `"apk"` or `"aab"` (Android App Bundle - recommended for store submissions).
    - `image`: Specifies the Docker image to use for the Android build environment (e.g., `"ubuntu-20.04-jdk-11-ndk-r21e"`). This allows control over Android SDK, NDK, and Java versions.
    - `gradleCommand`: Custom Gradle command (e.g., `":app:assembleRelease"`).
    - `ndkVersion`: Specific NDK version to use.
  - **iOS Specific (`ios`):**
    - `buildConfiguration`: Typically `"Release"` or `"Debug"`.
    - `image`: Specifies the macOS image to use for the iOS build environment (e.g., `"macos-ventura-xcode-14.2"`). This controls the Xcode and macOS versions.
    - `cocoapods`: Version of CocoaPods to use.
    - `simulator`: Boolean. If `true`, builds for the iOS simulator (useful for development/testing).
- **Build Workflow Customization:**
  - `prebuildCommand`, `postbuildCommand`: Custom shell commands to run before or after the main build command.
  - `node`, `yarn`, `npm`: Specify versions for Node.js and package managers.

### Example Profile Configurations

**1. Development Profile for Debugging:**

```json
// In eas.json, under "build":
"development": {
  "developmentClient": true,
  "distribution": "internal",
  "env": {
    "EXPO_PUBLIC_APP_ENV": "development",
    "EXPO_PUBLIC_API_URL": "http://localhost:3000/dev"
  },
  "android": {
    "gradleCommand": ":app:assembleDebug"
    // "image": "latest" // Or a specific image
  },
  "ios": {
    "buildConfiguration": "Debug"
    // "image": "latest" // Or a specific image
  }
}
```

This profile creates a development client, sets environment variables for a dev backend, and uses debug configurations for both platforms.

**2. Production Profile for Store Submission:**

```json
// In eas.json, under "build":
"production": {
  "distribution": "store",
  "env": {
    "EXPO_PUBLIC_APP_ENV": "production",
    "EXPO_PUBLIC_API_URL": "https://api.speedymeds.com/v1"
  },
  "android": {
    "buildType": "aab",
    "gradleCommand": ":app:bundleRelease"
    // Consider specifying a production-stable image
  },
  "ios": {
    "buildConfiguration": "Release"
    // Consider specifying a production-stable image
  }
}
```

This profile is configured for store distribution, uses production environment variables, builds an AAB for Android, and uses release configurations.

### Best Practices for `eas.json`

- **Version Control:** Always commit `eas.json` to your version control system (Git). This ensures that your build configurations are tracked and consistent across your team.
- **Use `extends`:** For profiles that share many common settings (e.g., `preview` and `production`), use the `extends` property to avoid redundancy and make maintenance easier.
- **Environment Variables:** Use the `env` property for environment-specific configurations (API URLs, feature flags) rather than hardcoding them in your app. Prefix with `EXPO_PUBLIC_` to make them available in your JavaScript code.
- **Specify Images:** While `latest` can be convenient for build images, for critical production builds, consider specifying exact image versions (e.g., `"ubuntu-22.04-jdk-11-ndk-r21e"`, `"macos-ventura-xcode-14.3.1"`) to ensure build reproducibility and avoid unexpected changes from `latest` tag updates.
- **Review Regularly:** As your project evolves or EAS CLI updates, review your `eas.json` to ensure it's still optimal and uses the latest recommended practices.

> [!CAUTION]
> Be careful with secrets in `eas.json`. While environment variables are fine, avoid putting highly sensitive, non-build related secrets directly into this file. Use EAS Secrets for managing sensitive API keys or credentials that are injected at build time (covered in a later section).

Configuring `eas.json` thoughtfully is a critical step in establishing a robust and reliable build pipeline for your React Native application using EAS.

> 📚 **Official Documentation:**
>
> - [Expo Docs: `eas.json` reference](https://docs.expo.dev/build/eas-json/)
> - [Expo Docs: Build profiles](https://docs.expo.dev/build/profiles/)
> - [Expo Docs: Environment variables and secrets in builds](https://docs.expo.dev/build/variables/)

### Exercise 16.1: Configure `eas.json`

This is a conceptual exercise to test your understanding of `eas.json` configurations.

`**(MICROSOFT_FORMS_URL_EXERCISE_16_1)**`

(The Microsoft Forms quiz will present scenarios and ask you to choose or define appropriate `eas.json` properties and profile structures.)

---

_Next: [Section 5: Creating Development Builds](./section-05-creating-development-builds.md)_
