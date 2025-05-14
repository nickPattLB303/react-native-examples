## Section 3: Expo SDK Modules Overview

This section provides an overview of the Expo SDK, a powerful suite of pre-built native modules. You'll learn about its benefits, how modules are categorized, explore some key modules in depth with code examples and under-the-hood insights, and get a comprehensive list of commonly used modules.

### What is the Expo SDK?

The Expo SDK is a curated collection of native modules, developed and maintained by the Expo team and community contributors. These modules provide JavaScript APIs for a wide array of native functionalities, abstracting away much of the complexity of direct native development and platform-specific differences between iOS and Android. The primary goal of the Expo SDK is to grant developers access to powerful native device capabilities through simple, consistent, and unified JavaScript APIs.

When you create an app with `create-expo-app`, many of these modules are readily available or can be easily added. Modules within the Expo SDK are designed for seamless integration, working reliably within the Expo Go app, Development Builds, and production applications built using EAS Build.

**Benefits of Using Expo SDK Modules:**

- **Well-Maintained and Tested:** Expo modules are actively maintained and rigorously tested across various iOS and Android versions and devices.
- **Guaranteed Compatibility:** Modules within a specific Expo SDK version are designed to work together seamlessly. Using `npx expo install` ensures you get compatible versions.
- **Consistent API Design:** Expo strives for a consistent and developer-friendly API design across its modules.
- **Simplified Setup:** Most Expo modules can be added to your project with a single `npx expo install` command, often requiring no further native configuration.
- **Comprehensive Documentation:** The Expo documentation provides detailed guides and API references for each module.

### Categorization of Expo SDK Modules (Conceptual)

The Expo SDK is extensive. To aid navigation, its modules can be conceptually grouped by functionality:

- **Sensors:** Accessing accelerometer, gyroscope, magnetometer, barometer, pedometer (e.g., `expo-sensors`).
- **UI Components & APIs:** Providing native UI elements or APIs like Maps (e.g., `react-native-maps`), SVG (e.g., `react-native-svg`), Haptics (e.g., `expo-haptics`).
- **Device Information:** Getting details about the device hardware and software (e.g., `expo-device`, `expo-network`, `expo-battery`).
- **File System:** Reading and writing to the app's sandboxed file system, downloading/uploading files (e.g., `expo-file-system`), managing assets (e.g., `expo-asset`).
- **Camera/Media:** Accessing the camera, photo library, audio/video playback (e.g., `expo-camera`, `expo-media-library`, `expo-image-picker`, `expo-av`).
- **Location:** Getting the device's geographic location (e.g., `expo-location`).
- **Notifications:** Handling push notifications and local notifications (e.g., `expo-notifications`).
- **Authentication:** Integrating with local authentication methods (e.g., `expo-local-authentication`).
- **Storage:** Securely storing small pieces of data (e.g., `expo-secure-store`), key-value storage (e.g., `@react-native-async-storage/async-storage`).
- **Updates:** Implementing Over-the-Air (OTA) updates (e.g., `expo-updates`).
- **Core Utilities:** Font loading (e.g., `expo-font`), splash screen control (e.g., `expo-splash-screen`), constants (e.g., `expo-constants`).

### Deep Dive into Key Modules

Below are examples of key Expo SDK modules, illustrating their functionality, use cases, basic usage in TypeScript, and a conceptual "under the hood" explanation.

#### 1. `expo-device`

- **Functionality:** Provides comprehensive information about the physical device executing the application, such as OS name and version, device model and manufacturer, total memory, device type (phone, tablet, tv), and more.
- **Common Use Cases:** Gathering analytics data about user devices, tailoring UI elements or features based on device characteristics (e.g., different layouts for tablets), displaying debugging information, checking OS compatibility for certain features.
- **TypeScript Code Example:**

  ```typescript
  import * as Device from "expo-device";

  console.log(`OS: ${Device.osName} ${Device.osVersion}`);
  console.log(`Model: ${Device.manufacturer} ${Device.modelName}`);
  console.log(`Is Tablet: ${Device.deviceType === Device.DeviceType.TABLET}`);
  console.log(
    `Total Memory: ${
      Device.totalMemory
        ? (Device.totalMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB"
        : "N/A"
    }`
  );
  ```

- **Under the Hood Nugget:** This module acts as a wrapper around standard native platform APIs. On Android, it primarily utilizes the `android.os.Build` class and related system services. On iOS, it accesses properties from `UIDevice` and `ProcessInfo.processInfo`. Expo ensures these disparate native APIs are presented through a consistent JavaScript interface.

#### 2. `expo-location`

- **Functionality:** Enables access to the device's geographic location information using various providers (GPS, Wi-Fi, cellular). It includes built-in handling for requesting necessary user permissions.
- **Common Use Cases:** Implementing map features, geotagging photos or posts, providing location-aware recommendations or services, tracking movement (with appropriate permissions and battery considerations).
- **TypeScript Code Example:**

  ```typescript
  import * as Location from "expo-location";
  import { LocationObject } from "expo-location";

  async function getCurrentLocation(): Promise<LocationObject | null> {
    // Request permission first
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      // Optionally inform the user
      return null;
    }

    try {
      // Get the current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Adjust accuracy as needed
      });
      console.log(
        "Location:",
        location.coords.latitude,
        location.coords.longitude
      );
      return location;
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  }
  ```

- **Under the Hood Nugget:** `expo-location` abstracts the platform-specific location services frameworks. On Android, it typically interacts with the `FusedLocationProviderClient` API (part of Google Play Services). On iOS, it utilizes the `CoreLocation` framework (`CLLocationManager`). Expo's module handles permission requests and unifies location updates.

#### 3. `expo-camera`

- **Functionality:** Provides components and APIs for displaying a live camera preview, capturing photos, and recording videos. It also manages camera permissions.
- **Common Use Cases:** Building custom in-app camera interfaces, integrating QR code or barcode scanning capabilities (often used with `expo-barcode-scanner`), capturing images or videos for user profiles or content creation.
- **TypeScript Code Example (Conceptual JSX & Logic):**

  ```typescript
  import React, { useState, useRef } from "react";
  import { View, Button, Text } from "react-native";
  import { Camera, CameraType, CameraCapturedPicture } from "expo-camera";

  function MyCameraComponent() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef<Camera>(null);

    if (!permission) {
      return <View />; // Permissions are still loading
    }

    if (!permission.granted) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      );
    }

    async function takePicture() {
      if (cameraRef.current) {
        const photo: CameraCapturedPicture =
          await cameraRef.current.takePictureAsync({ quality: 0.7 });
        console.log("Photo URI:", photo.uri);
        // Handle the captured photo (e.g., display it, upload it)
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          {/* UI Overlays for controls can go here */}
        </Camera>
        <Button title="Take Pic" onPress={takePicture} />
        {/* Add button to flip camera type etc. */}
      </View>
    );
  }
  ```

- **Under the Hood Nugget:** `expo-camera` renders a native view component displaying the live camera feed. It uses modern native camera APIs: `CameraX` on Android (part of Android Jetpack) and `AVFoundation` on iOS. The JavaScript API methods trigger corresponding native operations on the camera view instance.

#### 4. `expo-file-system`

- **Functionality:** Provides access to a portion of the device's local file system that is sandboxed for the application. Allows reading, writing, deleting files and directories, downloading files from network URLs, and uploading files.
- **Common Use Cases:** Caching network responses or images, storing user-generated content (like downloaded documents or saved drafts), managing application assets or configuration files, downloading files for offline access.
- **TypeScript Code Example:**

  ```typescript
  import * as FileSystem from "expo-file-system";

  async function manageFiles() {
    const fileUri = FileSystem.documentDirectory + "myUserData.json"; // Use documentDirectory for user files

    try {
      const jsonData = JSON.stringify({
        userId: 123,
        preferences: { theme: "dark" },
      });
      await FileSystem.writeAsStringAsync(fileUri, jsonData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("File written successfully!");

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        const data = JSON.parse(content);
        console.log("Read data:", data);
      }

      const downloadUri = FileSystem.cacheDirectory + "profilePic.jpg"; // Use cacheDirectory for temporary files
      const { uri: downloadedUri } = await FileSystem.downloadAsync(
        "https://example.com/remote/image.jpg",
        downloadUri
      );
      console.log("Finished downloading to ", downloadedUri);

      // await FileSystem.deleteAsync(fileUri); // Example deletion
    } catch (error) {
      console.error("File system error:", error);
    }
  }
  ```

- **Under the Hood Nugget:** This module interacts with standard native file I/O APIs, operating within the app's sandboxed directories (Internal Storage/External Cache on Android; Application Support/Caches on iOS). Constants like `FileSystem.documentDirectory` map to appropriate platform-specific paths.

### Expo Abstraction Layer

A key benefit of using Expo SDK modules is the abstraction layer they provide. The JavaScript API exposed to you aims for stability and consistency across platforms and SDK versions. Expo can update the underlying native implementation of a module (e.g., to adopt a newer Android API or fix an iOS bug) without necessarily requiring changes to your JavaScript code. Expo manages the versioning and compatibility of its modules within SDK releases, significantly reducing your maintenance burden.

### Key Expo SDK Modules

Below is an overview of some popular and widely used modules from the Expo SDK. This list is not exhaustive, and new modules or features are regularly added.

- **`expo-sharing`**:
  - **Purpose:** Allows sharing files or data from your app to other apps using the native sharing UI.
  - **Use Case:** Sharing images, documents, or text content.

### Key Expo SDK Modules Overview Table

The following table provides a quick reference to some of the most commonly used Expo SDK modules, their core purpose, and links to their official documentation. For a complete list, always refer to the official Expo documentation.

| Module Name (`expo-`)  | Core Functionality                                 | Common Use Cases                                           | Link to Official Expo Docs                                              |
| ---------------------- | -------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| `device`               | Device hardware/software information               | Analytics, conditional UI/features, debugging              | [Link](https://docs.expo.dev/versions/latest/sdk/device/)               |
| `location`             | Access device geographic location                  | Maps, geotagging, location-aware features                  | [Link](https://docs.expo.dev/versions/latest/sdk/location/)             |
| `camera`               | Camera preview, photo/video capture                | Custom camera UI, QR/barcode scanning, image/video capture | [Link](https://docs.expo.dev/versions/latest/sdk/camera/)               |
| `file-system`          | App file system access, download/upload            | Caching, storing user content, offline data                | [Link](https://docs.expo.dev/versions/latest/sdk/file-system/)          |
| `asset`                | Manage static assets (images, fonts)               | Loading images/fonts bundled with app or downloaded        | [Link](https://docs.expo.dev/versions/latest/sdk/asset/)                |
| `font`                 | Load custom fonts                                  | Using custom typography in the application                 | [Link](https://docs.expo.dev/versions/latest/sdk/font/)                 |
| `notifications`        | Handle push and local notifications                | Engaging users, providing timely alerts                    | [Link](https://docs.expo.dev/versions/latest/sdk/notifications/)        |
| `secure-store`         | Secure key-value storage                           | Storing sensitive data like auth tokens, API keys          | [Link](https://docs.expo.dev/versions/latest/sdk/secure-store/)         |
| `splash-screen`        | Control the native splash screen visibility        | Keeping splash screen visible during asset loading         | [Link](https://docs.expo.dev/versions/latest/sdk/splash-screen/)        |
| `updates`              | Implement Over-the-Air (OTA) updates               | Deploying JS/asset updates quickly                         | [Link](https://docs.expo.dev/versions/latest/sdk/updates/)              |
| `av`                   | Audio/Video playback and recording                 | Music players, video players, voice memo features          | [Link](https://docs.expo.dev/versions/latest/sdk/av/)                   |
| `sensors`              | Access device sensors (accelerometer, gyro, etc.)  | Motion detection, device orientation tracking, AR          | [Link](https://docs.expo.dev/versions/latest/sdk/sensors/)              |
| `haptics`              | Trigger native haptic feedback                     | Enhancing user interaction with tactile feedback           | [Link](https://docs.expo.dev/versions/latest/sdk/haptics/)              |
| `constants`            | System/app constants (manifest, device year, etc.) | Accessing build-time config, platform checks               | [Link](https://docs.expo.dev/versions/latest/sdk/constants/)            |
| `local-authentication` | Use biometrics/passcode for authentication         | Securing parts of the app, confirming user identity        | [Link](https://docs.expo.dev/versions/latest/sdk/local-authentication/) |
| `image-picker`         | Select images/videos from library or camera        | Profile picture selection, uploading media                 | [Link](https://docs.expo.dev/versions/latest/sdk/image-picker/)         |
| `sqlite`               | SQLite database interaction                        | Storing structured data locally for offline access         | [Link](https://docs.expo.dev/versions/latest/sdk/sqlite/)               |
| `web-browser`          | Open web links in-app or system browser            | Displaying help articles, terms of service                 | [Link](https://docs.expo.dev/versions/latest/sdk/web-browser/)          |
| `sharing`              | Share files/data to other apps via native UI       | Sharing images, documents, or text content                 | [Link](https://docs.expo.dev/versions/latest/sdk/sharing/)              |

_(This table is not exhaustive but covers many frequently used modules. Other modules like `expo-application`, `expo-barcode-scanner`, `expo-media-library`, etc., are also very useful.)_

> [!TIP]
> The Expo SDK is constantly evolving. Always refer to the [official Expo documentation](https://docs.expo.dev/versions/latest/) for the most current list of modules, their detailed APIs, and usage examples.

> 📚 **Official Documentation:**
>
> - [Expo API Reference](https://docs.expo.dev/versions/latest/) (Browse individual modules here)

The extensive nature of the Expo SDK significantly lowers the barrier to entry for incorporating native features into React Native applications. For developers, especially those without deep native Android or iOS experience, the SDK provides a highly productive path. However, this convenience comes with a dependency on the Expo ecosystem and its release cycle. Understanding this trade-off between the convenience of the Expo SDK and the potential need for deeper native control is important for long-term project planning.

### Exercise 14.1: Using an Expo SDK Module

Time to put your knowledge into practice! This exercise will guide you through using a simple Expo SDK module to retrieve and display device information.

**Objective:** Use the `expo-device` module to display some information about the device or simulator running the app.

**Instructions in Snack:** The linked Expo Snack contains detailed instructions in its `README.md` or code comments. Generally, you will:

1. Import `expo-device`.
2. Access properties like `Device.manufacturer`, `Device.modelName`, `Device.osName`, and `Device.osVersion`.
3. Display this information using `<Text>` components.

**(https://snack.expo.dev/@courses/module-14-exercise-1)**
