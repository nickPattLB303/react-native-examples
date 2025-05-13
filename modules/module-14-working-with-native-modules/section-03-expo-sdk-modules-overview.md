## Section 3: Expo SDK Modules Overview (Camera, Location, FileSystem, etc.)

This section provides an overview of the Expo SDK, a powerful suite of pre-built native modules. You'll learn about its benefits and explore some of the most commonly used modules that allow you to easily access device features and system services.

### What is the Expo SDK?

The Expo SDK is a curated collection of native modules, developed and maintained by the Expo team and community contributors. These modules provide JavaScript APIs for a wide array of native functionalities, abstracting away much of the complexity of direct native development. When you create an app with `create-expo-app`, many of these modules are readily available or can be easily added.

**Benefits of Using Expo SDK Modules:**

- **Well-Maintained and Tested:** Expo modules are actively maintained and rigorously tested across various iOS and Android versions and devices.
- **Guaranteed Compatibility:** Modules within a specific Expo SDK version are designed to work together seamlessly. Using `npx expo install` ensures you get compatible versions.
- **Consistent API Design:** Expo strives for a consistent and developer-friendly API design across its modules.
- **Simplified Setup:** Most Expo modules can be added to your project with a single `npx expo install` command, often requiring no further native configuration.
- **Comprehensive Documentation:** The Expo documentation provides detailed guides and API references for each module.

### Key Expo SDK Modules

Below is an overview of some popular and widely used modules from the Expo SDK. This list is not exhaustive, and new modules or features are regularly added.

- **`expo-device`**:
  - **Purpose:** Provides information about the physical device (e.g., model, manufacturer, OS version, device type).
  - **Use Case:** Displaying device-specific information, tailoring UI/UX based on device characteristics.
- **`expo-constants`**:
  - **Purpose:** Accesses system and app-level constants, including your app manifest (`app.json`/`app.config.js`) details, device IDs, and platform information.
  - **Use Case:** Retrieving app version, API keys stored in the manifest (use with caution for client-side keys), or checking platform-specific values.
- **`expo-application`**:
  - **Purpose:** Provides information specific to the application itself (e.g., bundle ID, native build version, install time).
  - **Use Case:** Internal tracking, displaying application version information.
- **`expo-camera`**:
  - **Purpose:** Enables access to the device's camera for taking photos and recording videos.
  - **Use Case:** Building custom camera interfaces, QR code scanners (often combined with `expo-barcode-scanner`).
- **`expo-image-picker`**:
  - **Purpose:** Allows users to select images or videos from the device's media library or take a new photo/video with the camera.
  - **Use Case:** Profile picture selection, uploading media content.
- **`expo-location`**:
  - **Purpose:** Provides access to the device's geolocation services (GPS, network-based location).
  - **Use Case:** Implementing map features, location-aware services, tagging content with location.
- **`expo-sensors`**:
  - **Purpose:** Accesses various device motion and orientation sensors like Accelerometer, Gyroscope, Magnetometer, Pedometer.
  - **Use Case:** Implementing motion-controlled features, fitness tracking, augmented reality experiences.
- **`expo-file-system`**:
  - **Purpose:** Provides tools for reading, writing, and managing files and directories within the app's sandboxed file system.
  - **Use Case:** Downloading files, caching data, managing user-generated content.
- **`expo-av`**:
  - **Purpose:** Comprehensive module for audio and video playback and recording.
  - **Use Case:** Building media players, voice recorders, video streaming apps.
- **`expo-notifications`**:
  - **Purpose:** Handles scheduling and receiving local notifications, and receiving push notifications.
  - **Use Case:** Reminders, alerts, real-time updates via push.
- **`expo-local-authentication`**:
  - **Purpose:** Enables biometric authentication (Face ID, Touch ID, Android Biometrics).
  - **Use Case:** Securing sensitive parts of an application.
- **`expo-secure-store`**:
  - **Purpose:** Provides encrypted storage for sensitive data like API tokens or user credentials.
  - **Use Case:** Securely storing small pieces of information.
- **`expo-sqlite`**:
  - **Purpose:** Offers a JavaScript API for interacting with an SQLite database.
  - **Use Case:** Storing structured data locally for offline access.
- **`expo-web-browser`**:
  - **Purpose:** Allows opening web links in an in-app browser or the system's default browser.
  - **Use Case:** Displaying help articles, terms of service, or external web content.
- **`expo-haptics`**:
  - **Purpose:** Triggers various types of haptic feedback (vibrations).
  - **Use Case:** Enhancing user experience with tactile feedback for actions.
- **`expo-sharing`**:
  - **Purpose:** Allows sharing files or data from your app to other apps using the native sharing UI.
  - **Use Case:** Sharing images, documents, or text content.

> [!TIP]
> The Expo SDK is constantly evolving. Always refer to the [official Expo documentation](https://docs.expo.dev/versions/latest/) for the most current list of modules, their detailed APIs, and usage examples.

> 📚 **Official Documentation:**
>
> - [Expo API Reference](https://docs.expo.dev/versions/latest/) (Browse individual modules here)

### Exercise 14.1: Using an Expo SDK Module

Time to put your knowledge into practice! This exercise will guide you through using a simple Expo SDK module to retrieve and display device information.

**Objective:** Use the `expo-device` module to display some information about the device or simulator running the app.

**Instructions in Snack:** The linked Expo Snack contains detailed instructions in its `README.md` or code comments. Generally, you will:

1. Import `expo-device`.
2. Access properties like `Device.manufacturer`, `Device.modelName`, `Device.osName`, and `Device.osVersion`.
3. Display this information using `<Text>` components.

**(https://snack.expo.dev/@courses/module-14-exercise-1)**
