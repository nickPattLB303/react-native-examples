## Section 5: Creating Development Builds

This section explains what development builds are, why they are essential when working with custom native code, and how to create and use them with EAS Build. Development builds bridge the gap between the rapid iteration of Expo Go and the need to test your app's full native capabilities on physical devices or simulators/emulators.

### What are Development Builds?

A development build is a special version of your app, created using EAS Build, that includes a **development client**. This client allows your standalone app (running on a device or simulator) to connect to the Metro bundler (your development server running on your computer via `npx expo start`).

**Why are they needed?**

- **Testing Custom Native Code:** Expo Go can only run pre-built native modules. If you add custom native modules (either third-party or your own), you cannot test them with Expo Go. Development builds include these custom native modules, allowing you to test their functionality thoroughly during development.
- **Iteration Similar to Expo Go:** Once a development build is installed on your device, you can connect it to your Metro development server. This means that when you save changes to your JavaScript/TypeScript code, those changes are reflected live in the development build, just like with Expo Go. This provides a much faster iteration cycle than repeatedly creating full production builds.
- **Debugging Native Issues:** They allow you to debug both the JavaScript and native parts of your application in a real device or simulator environment.

In essence, a development build gives you the best of both worlds: the ability to run and test any native code, combined with the fast refresh and live reloading features you're used to from Expo Go.

### Development Builds vs. Expo Go

| Feature                  | Expo Go                                   | Development Build (via EAS Build)              |
| ------------------------ | ----------------------------------------- | ---------------------------------------------- |
| **Custom Native Code**   | Not supported                             | Fully supported                                |
| **Included Modules**     | Expo SDK pre-built modules only           | All modules in your project (SDK + custom)     |
| **Build Process**        | No build needed (uses pre-built client)   | Requires build via EAS Build                   |
| **Installation**         | Download Expo Go from app stores          | Install `.apk`/`.ipa` on device/simulator      |
| **Iteration Speed (JS)** | Very Fast (Live/Hot reloading)            | Very Fast (Live/Hot reloading via Metro)       |
| **Use Case**             | Early development, JS-only changes, demos | Development with native code, full app testing |

### Configuring `eas.json` for Development Builds

To create a development build, you need a dedicated build profile in your `eas.json` file. Typically, this profile is named `development`. The key property that enables a development build is `developmentClient: true`.

Here's a reminder of a typical `development` profile from the previous section:

```json
// In eas.json, under "build":
"development": {
  "developmentClient": true,         // This is the crucial flag
  "distribution": "internal",        // Usually for internal distribution
  "env": {
    "EXPO_PUBLIC_APP_ENV": "development"
  },
  "android": {
    "gradleCommand": ":app:assembleDebug"
    // Potentially other Android-specific settings
  },
  "ios": {
    "buildConfiguration": "Debug"
    // Potentially other iOS-specific settings
  }
}
```

Setting `developmentClient: true` instructs EAS Build to include the necessary development client libraries and configurations in the binary.

### Initiating a Development Build

Once your `eas.json` is configured, you can initiate a development build using the EAS CLI:

1.  **Open your terminal in your project's root directory.**
2.  **Run the build command, specifying the development profile and the target platform:**

    - **For Android:**
      ```bash
      eas build -p development --platform android
      ```
    - **For iOS:**
      ```bash
      eas build -p development --platform ios
      ```
    - **For both platforms (will queue two separate builds):**
      ```bash
      eas build -p development --platform all
      ```

    EAS CLI will upload your project to the EAS Build servers and queue the build. You'll receive a URL where you can track the build progress on the Expo dashboard.

### Installing the Development Build

Once the build is complete, EAS will provide a downloadable artifact (`.apk` for Android, `.ipa` for iOS).

- **Android (`.apk`):**

  1.  Download the `.apk` file from the build details page on the Expo dashboard or via the link provided by EAS CLI.
  2.  If using an Android Emulator, you can often drag and drop the `.apk` file onto the emulator window to install it.
  3.  Alternatively, use Android Debug Bridge (`adb`):
      ```bash
      adb install path/to/your-app.apk
      ```
  4.  Ensure "Install from unknown sources" is enabled on your Android device if installing directly.

- **iOS (`.ipa`):**
  1.  Download the `.ipa` file.
  2.  Installing an `.ipa` on a physical iOS device for development typically requires it to be signed for ad-hoc distribution, and the device's UDID must be registered in your Apple Developer account's provisioning profile. EAS Build can help manage this if you configure credentials correctly.
  3.  For iOS Simulators: Development builds for simulators are usually in a `.tar.gz` format. Download and extract it, then drag the `.app` file onto your open simulator.
      Alternatively, you can use `xcrun simctl install <simulator-id> path/to/your-app.app`.

> [!IMPORTANT]
> For iOS physical devices, managing provisioning profiles and device UDIDs is essential. EAS Build aims to simplify this, especially if you let EAS manage your credentials. Ensure your Apple Developer account is set up correctly.

### Connecting to the Metro Bundler

After installing the development build on your device or simulator:

1.  **Start your local development server with the `--dev-client` flag:**

    ```bash
    npx expo start --dev-client
    ```

    This command starts the Metro bundler, similar to a regular `npx expo start`, but it's specifically configured to serve your development client.

2.  **Open the development build app on your device/simulator.**

3.  **Connect to Metro:** The development client app should automatically detect the running Metro server on your local network if they are on the same Wi-Fi. If not, it will typically show a UI where you can manually enter the Metro server address (e.g., `exp://<your-local-ip>:8081`). The Metro server running in your terminal will also display a QR code that the development client can scan.

Once connected, any changes you make to your JavaScript/TypeScript code will trigger a live reload or hot reload in the development build, just like with Expo Go.

### Benefits of Iterating with Development Builds

- **Test Real Native Behavior:** Confidently test features that rely on custom native modules.
- **Faster than Full Builds:** Avoids repeated full build cycles for every JS change.
- **Realistic Performance Testing:** Get a better sense of your app's performance on actual hardware.
- **Debug with Native Tools:** Allows you to use Xcode or Android Studio debuggers if needed for native issues.

### Troubleshooting Common Issues

- **App Doesn't Connect to Metro:**
  - Ensure your development machine and the device/simulator are on the same Wi-Fi network.
  - Check firewall settings that might be blocking connections to the Metro port (default 8081).
  - Manually enter the IP address if auto-discovery fails.
- **Build Failures:**
  - Carefully examine the build logs provided by EAS Build on the Expo dashboard. They are usually very detailed.
  - Ensure all native dependencies are correctly installed and configured in your project.
  - Check for compatibility issues between libraries.
- **Installation Issues (iOS):**
  - Often related to provisioning profiles or signing certificates. Verify your setup in the Apple Developer portal and your EAS project configuration. Ensure the device UDID is included in the profile for ad-hoc builds.

Development builds are a powerful tool in the Expo and React Native development workflow, enabling robust testing and iteration when custom native code is involved.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Development builds overview](https://docs.expo.dev/develop/development-builds/introduction/)
> - [Expo Docs: Creating your first development build](https://docs.expo.dev/develop/development-builds/create-a-build/)
> - [Expo Docs: Using the development build](https://docs.expo.dev/develop/development-builds/use-the-build/)

---

_Next: [Section 6: Creating Production Builds (iOS and Android)](./section-06-creating-production-builds.md)_
