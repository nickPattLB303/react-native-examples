## Section 6: Running on Expo Go (Physical Device)

While the iOS Simulator is excellent for development on macOS, testing your application on a physical device is crucial for experiencing true device performance, an accurate feel of gestures, and for testing hardware-specific features (like the camera or GPS) that simulators can only approximate.

Expo Go makes it incredibly easy to run your app on a physical iPhone or Android device during the initial development phases.

> 🧑‍🏫 **(Instructor-Led):** Consider setting aside time in class for students to download Expo Go and test their SpeedyMeds projects on physical devices. This is particularly valuable when introducing hardware features like camera access in later modules.

> 🧗‍♀️ **(Self-Led):** Even if you primarily develop using simulators, testing on a physical device periodically helps catch issues related to real-world usage that might not be apparent in simulators. Try to test on both iOS and Android devices if available.

### Prerequisites for Running on a Physical Device via Expo Go

1.  **Expo Go App Installed on Device:** Download and install the Expo Go app from the App Store (for iOS) or Google Play Store (for Android) onto your physical smartphone or tablet. ([Source](https://expo.dev/go))
2.  **Wi-Fi Connection:** Your computer (running the Expo development server) and your physical device (running Expo Go) MUST be connected to the **same Wi-Fi network**. Expo Go discovers the development server running on your machine at its local IP address (e.g., `192.168.1.x:8081`). ([Source](https://reactnative.dev/docs/running-on-device))
    > [!CAUTION]
    > Network configuration can sometimes interfere. Firewalls, VPNs, or complex network setups (like university or corporate networks with client isolation) might prevent Expo Go from connecting to your development server. Ensure your devices can communicate over the local network.
3.  **Expo Development Server Running:** Your Expo development server must be running (`npx expo start`).

### Steps to Run on a Physical Device

1.  **Start the Development Server:** If it's not already running, navigate to your project directory in your terminal and start the server (ensure it starts in Expo Go mode, which is the default):

    ```bash
    cd path/to/your/SpeedyMedsPrototype
    npx expo start
    ```

    > [!NOTE]
    > Ensure the server is started for Expo Go. The QR code should represent a URL starting with `exp://...`. If you accidentally started in development client mode (e.g., `npx expo start --dev-client`), the QR code will start with `exp+<your-app-slug>://...`, which Expo Go cannot open directly. Use `npx expo start` or `npx expo start --go` for Expo Go. ([Source](https://github.com/expo/expo/issues/33421))

2.  **Locate the QR Code:** The terminal output from `npx expo start` will display a QR code.

3.  **Open Expo Go on Your Device:** Launch the Expo Go app.
4.  **Scan the QR Code:** Use the scanning feature within the Expo Go app (or the device's Camera app on iOS) and point it at the QR code in your terminal.
5.  **App Bundling and Launch:** Expo Go will connect to your development server over the local network, download your app's JavaScript bundle, and launch your `SpeedyMedsPrototype` app on your device.

### Connecting via Tunnel (Alternative)

If your device cannot connect over the local network (e.g., different networks, firewalls), you can use Expo CLI's tunneling feature:

1.  **Install Tunneling Tool (if needed):** `ngrok` is commonly used.
    ```bash
    npm install -g @expo/ngrok
    ```
    ([Source](https://docs.expo.dev/more/expo-cli/))
2.  **Start with Tunnel Flag:**
    ```bash
    npx expo start --tunnel
    ```
    ([Source](https://docs.expo.dev/more/expo-cli/))
3.  **Scan Tunnel QR Code:** This creates a public URL (e.g., `exp://u.expo.dev/...`). Scan the new QR code displayed in the terminal using Expo Go. The connection will route through Expo's servers.

> [!NOTE]
> Tunneling is generally slower than direct local connections and requires an active internet connection on both your computer and device.

### Development Workflow with Expo Go on a Physical Device

The experience mirrors the simulator:

- **Fast Refresh:** Saved code changes trigger near-instant updates on the device.
- **Developer Menu:** Shake the device (or use other platform-specific gestures) to access the menu for reloading, debugging, etc.

### Hardware Features for SpeedyMeds

For a pharmacy application like SpeedyMeds, physical devices unlock several important features that simulators can't fully replicate:

```typescript
// Example of camera access for medication barcode scanning in SpeedyMeds
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

export default function MedicationScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    // In a real app, this would look up the medication in a database
    if (data.startsWith("RXMED")) {
      Alert.alert(
        "Medication Found",
        `Prescription ID: ${data}\nAcetaminophen 500mg\nTake 1-2 tablets every 6 hours as needed`,
        [
          { text: "OK" },
          {
            text: "Add to My Medications",
            onPress: () => console.log("Added to medications"),
          },
        ]
      );
    } else {
      Alert.alert(
        "Unknown Barcode",
        "This barcode doesn't match any known medications."
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text>
        Camera access denied. Please enable camera permissions in your device
        settings.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan Medication Barcode</Text>
          {scanned && <Text style={styles.rescanText}>Tap to scan again</Text>}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },
  scanText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rescanText: {
    color: "#66ff66",
    fontSize: 14,
    marginTop: 10,
  },
});
```

This code example demonstrates a common use case for our SpeedyMeds app that requires a physical device: scanning medication barcodes. While simulators can simulate camera access, they cannot actually scan physical barcodes.

Other hardware features relevant to SpeedyMeds that work best on physical devices include:

- **Location services** for finding nearby pharmacies
- **Push notifications** for medication reminders
- **Haptic feedback** when confirming important actions
- **Biometric authentication** (Face ID/Touch ID) for securing sensitive medical information

### Limitations Recap

Remember that running via Expo Go uses the pre-built sandbox environment. **It cannot load projects that require custom native modules or native code modifications not already included in that specific build of Expo Go.** For those cases, you need a Development Build (see Section 1). ([Source](https://docs.expo.dev/develop/development-builds/introduction/))

### Understanding Expo Go's Critical Limitations

While Expo Go is exceptionally useful for getting started quickly, prototyping, and simple course exercises, its pre-built, sandboxed nature imposes significant limitations. It's crucial to understand these to know when a Development Build becomes necessary for your project:

1.  **No Custom Native Code:**
    This is the most significant limitation. Expo Go's native code is fixed; it includes a specific version of the Expo SDK and its associated native modules. It **cannot** load or run any third-party native modules or custom native code (Swift, Objective-C, Kotlin, Java) that isn't already part of the pre-built Expo SDK version it bundles. Attempting to use such libraries (e.g., `react-native-firebase`, many specific hardware interaction modules, or your own custom native components) will result in runtime errors because the corresponding native implementation is missing within the Expo Go environment. ([Source](https://expo.dev/blog/expo-go-vs-development-builds))

2.  **Limited Native Configuration Testing:**
    Changes made in your project's configuration files (e.g., `app.json`, `app.config.js`) that affect native project files and settings (like `Info.plist` for iOS or `AndroidManifest.xml` for Android) cannot be fully tested in Expo Go. This includes:

    - **App Icon, Name, and Native Splash Screen:** Expo Go shows its own icon and name. While it might emulate your JavaScript-based splash screen, it cannot display the actual configured native splash screen or test advanced splash screen behavior (e.g., handling by `expo-splash-screen` native module in a standalone build).
    - **Other Native Settings:** Testing specific entitlements (e.g., for HealthKit, Siri), custom URL schemes (beyond basic Expo Go handling for development URLs), background modes (like audio playback or location updates), or other native manifest settings is not possible because Expo Go runs with its own predefined configurations.
      ([Source](https://docs.expo.dev/develop/development-builds/introduction/))

3.  **No Remote Push Notifications:**
    While local notifications can often be triggered and tested, receiving remote push notifications (sent from a server via Apple Push Notification service - APNs or Firebase Cloud Messaging - FCM) is **not supported** in Expo Go. This is because remote notifications require app-specific certificates, bundle identifiers, and setup that are incompatible with the generic, shared Expo Go client.
    ([Source](https://docs.expo.dev/develop/development-builds/introduction/), [Expo Notifications SDK Docs](https://docs.expo.dev/versions/latest/sdk/notifications/))

4.  **No True App/Universal Links Testing:**
    Testing deep linking mechanisms that require native configuration, such as iOS Universal Links (which require `apple-app-site-association` file verification and associated domain entitlements) or Android App Links (verified via `assetlinks.json`), is **impossible** in Expo Go. Expo Go can handle basic `exp://` deep links for development purposes but cannot test the full native deep linking setup required for production apps.
    ([Source](https://docs.expo.dev/develop/development-builds/introduction/))

5.  **Older Expo SDK Versions on Physical iOS Devices:**
    Due to Apple App Store restrictions, the version of Expo Go available on the App Store only supports the latest Expo SDK version (and potentially a few very recent ones). If your project uses an older Expo SDK version, you **cannot** run it using the App Store version of Expo Go on a physical iPhone. You would need a Development Build for that specific SDK version. (Simulators can often run older SDKs with the bundled Expo Go version that comes with `expo start`).
    ([Source](https://docs.expo.dev/develop/development-builds/introduction/))

6.  **Potential Behavior Discrepancies:**
    Because your app runs under Expo Go's bundle identifier (iOS) or package name (Android) and within its process, certain platform integrations or behaviors might differ slightly compared to a standalone production build of your app. This is rare for pure JavaScript logic but can occasionally surface with APIs that behave differently based on the host app's identity.

**When is Expo Go Suitable?**

Expo Go is ideal for:

- **Initial Learning & Experimentation:** Getting started quickly without any native build setup.
- **Prototyping:** Rapidly building and testing UI and basic functionality using the included Expo SDK modules.
- **Simple Course Exercises:** Convenient for exercises that don't involve custom native code or complex native configurations.

For most other scenarios, especially when integrating third-party native libraries or needing to test native configurations accurately, transitioning to a **Development Build** is necessary.

> 📲 **(Native Developers):**
>
> **Comparison:** Expo Go eliminates the need for code signing, provisioning profiles, and USB debugging setup that traditional iOS/Android development requires for physical device testing. Instead of deploying a compiled binary to the device through Xcode or Android Studio, you're remotely loading your JavaScript bundle into Expo's pre-compiled container app. This is similar to how web developers can instantly serve HTML/JS to a browser without compilation.
>
> **Key Takeaway:** Expo Go offers speed by decoupling your JS from local native builds, at the cost of native customization.
>
> **Source:** [React Native: Running on Device](https://reactnative.dev/docs/running-on-device)

> 🌐 **(Web Developers):**
>
> **Comparison:** Using Expo Go is conceptually similar to opening a website on your mobile device browser. Your local development server (like running a web server on localhost) serves your code to the Expo Go app (the "browser"). The QR code scanning is analogous to typing a URL, just more convenient for mobile.
>
> **Key Takeaway:** Think of Expo Go as a specialized browser for your React Native app, with the QR code as the URL.
>
> **Source:** [Expo Go Documentation](https://docs.expo.dev/get-started/expo-go/)

> 🔁 **(Asynchronous Learners):** Physical device testing is especially important when learning asynchronously. Make sure to test on real devices regularly since you won't have an instructor or peers immediately available to help troubleshoot device-specific issues.

While this course primarily uses the iOS Simulator, running on a physical device via Expo Go is valuable for initial testing and experiencing real-world interaction.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Running on Devices](https://docs.expo.dev/workflow/run-on-device/#running-on-devices-via-lan)
> - [Expo Docs: Expo Go](https://docs.expo.dev/get-started/expo-go/)
> - [Expo CLI: `start`](https://docs.expo.dev/more/expo-cli/#start) (mentions `--tunnel`)
> - [Expo Camera Documentation](https://docs.expo.dev/versions/latest/sdk/camera/)
> - [Expo Barcode Scanner Documentation](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/)
