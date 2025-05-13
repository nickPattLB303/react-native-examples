## Section 6: Creating Production Builds (iOS and Android)

This section details the process of creating production builds using EAS Build. Production builds are optimized, signed versions of your app, ready for submission to the Apple App Store and Google Play Store, or for final beta testing before a public release.

### Purpose of Production Builds

Production builds are the final output of your development cycle, intended for distribution to your end-users. They differ significantly from development builds:

- **Optimization:** Production builds are typically optimized for performance and size. This includes minifying JavaScript bundles, optimizing assets, and compiling native code with release configurations.
- **Release Signing:** They are signed with release certificates and keys, which are required by app stores to verify the app's authenticity and integrity.
- **No Debugging Symbols (Usually):** Debugging features and symbols are generally stripped to reduce app size and enhance security, though this can sometimes be configured.
- **Store-Ready:** These are the binaries (`.ipa` for iOS, `.aab` or `.apk` for Android) that you will upload to app store consoles.

### Key Characteristics of Production Builds

- **Optimized for Performance:** Code is often minified, and dead code is eliminated.
- **Secure:** Debugging capabilities are disabled, and the app is signed with production credentials.
- **Smaller Size:** Optimizations usually lead to a smaller binary size compared to debug or development builds.
- **Environment:** Typically configured to point to production backend services and use production API keys (managed via environment variables in the build profile).

### Configuring `eas.json` for Production

A `production` profile in your `eas.json` file is used to define the settings for these builds. Key configurations include:

```json
// In eas.json, under "build":
"production": {
  "distribution": "store",      // Critical: indicates this build is for app stores
  "env": {
    "EXPO_PUBLIC_APP_ENV": "production",
    "EXPO_PUBLIC_API_URL": "https://api.yourproduct.com"
    // Other production-specific environment variables
  },
  "android": {
    "buildType": "aab",         // Android App Bundle is recommended for Google Play
    "gradleCommand": ":app:bundleRelease" // Ensures a release build
    // "image": "production-stable-android-image" // Optional: Pin to a specific image
  },
  "ios": {
    "buildConfiguration": "Release", // Ensures a release build
    "enterpriseProvisioning": "adhoc" // or "universal" if applicable for internal enterprise distribution outside the App Store, otherwise handled by store distribution credentials.
    // "image": "production-stable-ios-image" // Optional: Pin to a specific image
  }
  // "credentialsSource": "remote" // Recommended: Let EAS manage credentials
}
```

- `distribution: "store"`: This tells EAS that the build is intended for public app stores.
- `android.buildType: "aab"`: Android App Bundles are the modern standard for Google Play, allowing for optimized APK delivery.
- `gradleCommand: ":app:bundleRelease"` (Android) and `buildConfiguration: "Release"` (iOS): These ensure that the native build tools create optimized release versions.

### Code Signing: The Key to Production

Code signing is a mandatory security measure for distributing apps. It verifies the developer's identity and ensures the code hasn't been tampered with since it was signed.

- **iOS:** Requires provisioning profiles and distribution certificates obtained from the Apple Developer Program. These link your app ID, your developer account, and the devices/stores it can be distributed to.
- **Android:** Requires a Keystore, which is a file containing cryptographic keys used to sign your app.

**How EAS Handles Credentials:**

EAS Build significantly simplifies credential management. With `credentialsSource: "remote"` (often the default or easily configured via `eas credentials`), EAS can securely generate, manage, and apply these signing credentials for you in the cloud. This means you don't always need to manually create, download, and upload these sensitive files.

- EAS CLI will guide you through the process of setting up credentials for your project if they don't exist (`eas credentials`).
- For iOS, EAS can integrate with your Apple Developer account to manage certificates and provisioning profiles.
- For Android, EAS can generate and securely store a Keystore for you.

> 🍏 **(iOS Developers):** If you've manually managed App IDs, Certificates (Development and Distribution), and Provisioning Profiles (Development, Ad Hoc, App Store) in the Apple Developer Portal and Xcode, you'll appreciate how EAS can automate much of this. EAS essentially acts as a secure intermediary, using your Apple Developer account to ensure your app is signed correctly for App Store distribution.

> 🤖 **(Android Developers):** You're likely familiar with generating a Keystore (`.jks` or `.keystore` file) and configuring your `build.gradle` file with signing configurations. EAS can handle the generation and secure storage of this Keystore, applying it automatically during the release build process. This avoids needing to store the Keystore in your repository or manage it manually on a CI server.

### Initiating a Production Build

To start a production build, use the EAS CLI with your `production` profile:

1.  **Ensure your `eas.json` `production` profile is correctly configured.**
2.  **Commit all your code changes to Git.** EAS Build typically requires a clean Git working tree and uses the latest commit.
3.  **Run the build command:**
    - **For Android:**
      ```bash
      eas build -p production --platform android
      ```
    - **For iOS:**
      `bash
    eas build -p production --platform ios
    `
      EAS CLI will then start the build process on the cloud servers. You can monitor the progress via the link provided in your terminal or on the Expo dashboard.

### Understanding Build Artifacts

Once the build successfully completes, EAS provides downloadable artifacts:

- **iOS:** An `.ipa` file. This is the application archive that you will upload to App Store Connect.
- **Android:** An `.aab` file (if `buildType` was `aab`). This is the Android App Bundle you will upload to Google Play Console. Google Play then uses the AAB to generate optimized APKs for different device configurations.
  If you configured `buildType: "apk"`, you would get an `.apk` file, but `.aab` is preferred for store releases.

### Testing Production Builds

Before submitting to app stores, it's crucial to test your production builds thoroughly:

- **Internal Distribution/TestFlight (iOS)/Internal Testing (Android):** Upload your production build to internal testing tracks on App Store Connect (TestFlight) or Google Play Console. Distribute it to a group of testers to catch any last-minute issues in the final release candidate.
- **Test Core Functionality:** Verify all critical app features, especially those interacting with production backend services.
- **Check Performance:** Ensure the app runs smoothly and efficiently.
- **Verify Analytics and Crash Reporting:** Confirm that any analytics or crash reporting tools are correctly configured for the production environment.

> [!IMPORTANT]
> Always test your production builds on a variety of real devices if possible, covering different OS versions and screen sizes that your target audience uses.

Creating production builds is a significant milestone in your app development journey. EAS Build streamlines this complex process, allowing you to focus on delivering a quality application.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Build profiles in `eas.json`](https://docs.expo.dev/build/profiles/)
> - [Expo Docs: Android app signing](https://docs.expo.dev/app-signing/android/)
> - [Expo Docs: iOS app signing](https://docs.expo.dev/app-signing/ios/)
> - [Expo Docs: Internal distribution](https://docs.expo.dev/build/internal-distribution/)

---

_Next: [Section 7: Submitting to App Stores (Overview)](./section-07-submitting-to-app-stores.md)_
