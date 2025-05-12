## Section 6: Running on Expo Go (Physical Device - Optional Mention)

While the iOS Simulator is excellent for development on macOS, testing your application on a physical device is crucial for experiencing true device performance, an accurate feel of gestures, and for testing hardware-specific features (like the camera or GPS) that simulators can only approximate.

Expo Go makes it incredibly easy to run your app on a physical iPhone or Android device.

### Prerequisites for Running on a Physical Device via Expo Go

1.  **Expo Go App Installed on Device:** Download and install the Expo Go app from the App Store (for iOS) or Google Play Store (for Android) onto your physical smartphone or tablet.
2.  **Wi-Fi Connection:** Your computer (running the Expo development server) and your physical device (running Expo Go) MUST be connected to the **same Wi-Fi network**.
    > [!CAUTION]
    > Network configuration can sometimes interfere. Firewalls, VPNs, or complex network setups (like university or corporate networks with client isolation) might prevent Expo Go from connecting to your development server. Ensure your devices can communicate over the local network.
3.  **Expo Project Running:** Your Expo development server must be running (`npx expo start`).

### Steps to Run on a Physical Device

1.  **Start the Development Server:** If it's not already running, navigate to your project directory in your terminal and start the server:
    ```bash
    cd path/to/your/SpeedyMedsPrototype
    npx expo start
    ```
2.  **Locate the QR Code:** The terminal output from `npx expo start` will display a QR code.

    - _Image: Screenshot of the terminal output from `npx expo start` with the QR code highlighted._
    - _Caption: The QR code displayed by the Expo development server is used to open your project in Expo Go on a physical device._

3.  **Open Expo Go on Your Device:** Launch the Expo Go app on your iPhone or Android device.
4.  **Scan the QR Code:**
    - **On iOS:** Tap the "Scan QR Code" option within Expo Go (usually on the "Projects" tab) and point your device's camera at the QR code in your terminal.
    - **On Android:** Expo Go for Android often has a prominent "Scan QR Code" button or section. Use it to scan the QR code.
5.  **App Bundling and Launch:** Once the QR code is scanned successfully:
    - Expo Go will connect to your development server over the local network.
    - It will download your app's JavaScript bundle.
    - Your `SpeedyMedsPrototype` app will launch and run on your physical device.

### Development Workflow with Expo Go on a Physical Device

The development experience is very similar to using the simulator:

- **Live Reloading/Fast Refresh:** Changes you save in your code will automatically trigger a reload or update in the app on your device.
- **Developer Menu:** On iOS, physically shake your device to open the developer menu. On Android, shaking also usually works, or there might be a gesture like a three-finger long press. This menu allows you to access options like reloading the app, enabling performance monitors, or connecting to the JavaScript debugger.

> [!TIP]
> If QR code scanning is problematic, the terminal output from `npx expo start` also provides a direct URL (e.g., `exp://<your-local-ip-address>:<port>`). You can often manually type this URL into a "Connect to Project" or similar field within the Expo Go app if available, or send the link to your device and open it.

> 📲 **(Native Developers - Android & iOS):** Expo Go acts as a pre-built client that already contains the native runtime for the Expo SDK. When you scan the QR code, you're essentially telling this client to load and execute your app's JavaScript bundle from your development machine. This is why you don't need to compile native code (e.g., via Android Studio or Xcode) for each change during this phase of development. It allows for a much faster iteration cycle, especially useful for UI development and business logic implemented in JavaScript.

While this course primarily focuses on the iOS Simulator for consistency in instructions, running your app on a physical device using Expo Go is a valuable practice and highly recommended for a complete testing experience.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Running on Devices](https://docs.expo.dev/workflow/run-on-device/#running-on-devices-via-lan)
> - [Expo Docs: Expo Go](https://docs.expo.dev/get-started/expo-go/)
