## Section 6: Running on Expo Go (Physical Device)

While the iOS Simulator is excellent for development on macOS, testing your application on a physical device is crucial for experiencing true device performance, an accurate feel of gestures, and for testing hardware-specific features (like the camera or GPS) that simulators can only approximate.

Expo Go makes it incredibly easy to run your app on a physical iPhone or Android device during the initial development phases.

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

    - _Image: Screenshot of the terminal output from `npx expo start` with the QR code highlighted._
    - _Caption: The QR code displayed by the Expo development server is used to open your project in Expo Go on a physical device._

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

### Limitations Recap

Remember that running via Expo Go uses the pre-built sandbox environment. **It cannot load projects that require custom native modules or native code modifications not already included in that specific build of Expo Go.** For those cases, you need a Development Build (see Section 1). ([Source](https://docs.expo.dev/develop/development-builds/introduction/))

> 📲 **(Native Developers - Android & iOS):**
>
> **Comparison:** This Expo Go method completely bypasses any local native compilation (`run:ios`/`run:android`). You're loading your JavaScript bundle into Expo's pre-compiled native app shell. This enables rapid JS iteration but offers no flexibility for custom native code during this phase.
>
> **Key Takeaway:** Expo Go offers speed by decoupling your JS from local native builds, at the cost of native customization.

While this course primarily uses the iOS Simulator, running on a physical device via Expo Go is valuable for initial testing and experiencing real-world interaction.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Running on Devices](https://docs.expo.dev/workflow/run-on-device/#running-on-devices-via-lan)
> - [Expo Docs: Expo Go](https://docs.expo.dev/get-started/expo-go/)
> - [Expo CLI: `start`](https://docs.expo.dev/more/expo-cli/#start) (mentions `--tunnel`)
