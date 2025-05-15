# Section 3: Running on Simulators and Devices

## Learning Objectives
After completing this section, you will be able to:
- Run React Native applications on iOS simulators
- Run React Native applications on Android emulators
- Test applications on physical iOS and Android devices using Expo Go
- Understand the differences between development environments
- Troubleshoot common device and simulator issues

**Prerequisite Knowledge**: Sections 1 and 2 completion
**Estimated Time**: 30-45 minutes

## Introduction to Testing Environments

React Native allows you to test your application in different environments, each with its own advantages and limitations. In this section, we'll explore how to run your application on:

1. iOS Simulator
2. Android Emulator
3. Physical iOS device with Expo Go
4. Physical Android device with Expo Go

> 🔄 **For iOS Developers**: You're already familiar with the iOS Simulator, but React Native's integration provides some unique features and limitations compared to native iOS development.

> 🔄 **For Android Developers**: While you've used Android emulators before, the React Native development workflow introduces some differences you should be aware of.

> 🔄 **For Web Developers**: This section introduces mobile testing environments that might be new to you, but they follow similar principles to browser testing for web applications.

## Running on iOS Simulator

The iOS Simulator is part of Xcode and provides a way to test your iOS applications without a physical device.

### Launching Your App on iOS Simulator

Make sure you're in your project directory, then run:

```bash
npx expo start --ios
```

This command will:
1. Start the Metro bundler
2. Launch the iOS Simulator if it's not already running
3. Install the Expo Go app in the simulator
4. Open your application in Expo Go

Alternatively, you can:
1. Run `npx expo start` to start the Metro bundler
2. Press `i` in the terminal to launch the iOS Simulator

> 💡 **Deep Dive**: When you run your app in the iOS Simulator, React Native compiles your JavaScript code using the Metro bundler and loads it into the Expo Go app. The native bridge then translates React Native components into native iOS UI components. This differs from traditional iOS development, where your Objective-C or Swift code is compiled directly into machine code.

### Choosing Different iOS Simulator Devices

To run your app on a different iOS device type:

1. Open Xcode
2. Go to Xcode > Open Developer Tool > Simulator
3. In the Simulator, select File > Open Simulator > [Choose Device]
4. Run your app with `npx expo start --ios`

Alternatively, you can specify a simulator when launching:

```bash
npx expo start --ios --simulator="iPhone 14 Pro"
```

### Common iOS Simulator Issues and Solutions

#### Simulator is Slow

If the simulator is running slowly:
- Close other applications to free up resources
- Reduce the window size of the simulator
- Use a less resource-intensive device type (e.g., iPhone SE instead of iPhone 14 Pro Max)

#### App Doesn't Load or Shows Errors

If your app doesn't load properly:
- Reset the simulator (Simulator > Reset Content and Settings)
- Restart the Metro bundler with `npx expo start --clear`
- Check for any JavaScript errors in the Metro bundler console

#### Networking Issues

If your app cannot connect to your development server:
- Ensure your computer and simulator are not on different networks
- Check if any firewall settings are blocking connections
- Try running with `npx expo start --localhost`

## Running on Android Emulator

Android emulators allow you to test your application on different Android device configurations.

### Setting Up an Android Virtual Device (AVD)

Before running your app, you need to create an Android Virtual Device:

1. Open Android Studio
2. Click on "More Actions" or the three dots in the welcome screen
3. Select "Virtual Device Manager"
4. Click "Create Device"
5. Select a phone definition (e.g., Pixel 6)
6. Select a system image (e.g., Android 13)
7. Configure the AVD settings and click "Finish"

### Launching Your App on Android Emulator

Make sure your emulator is running, then in your project directory run:

```bash
npx expo start --android
```

This command will:
1. Start the Metro bundler
2. Connect to the running Android emulator
3. Install the Expo Go app in the emulator
4. Open your application in Expo Go

Alternatively, you can:
1. Run `npx expo start` to start the Metro bundler
2. Press `a` in the terminal to launch on the Android emulator

> 💡 **Deep Dive**: The Android emulator virtualizes an entire Android operating system. Unlike iOS, which shares many architectural elements with macOS, Android has different architecture, making emulation more resource-intensive. This is why Android emulators are often slower than iOS simulators.

### Common Android Emulator Issues and Solutions

#### Emulator is Slow

Android emulators can be resource-intensive. To improve performance:
- Enable hardware acceleration in the AVD settings
- Use a device with fewer pixels (e.g., Pixel 4 instead of Pixel 6 Pro)
- Allocate more RAM to the emulator in the AVD settings
- Use the x86 or x86_64 system images instead of ARM

#### App Crashes or Doesn't Start

If your app crashes or doesn't start:
- Wipe data on the emulator (in AVD Manager > wipe data)
- Restart the Metro bundler with `npx expo start --clear`
- Check the Metro console and Android logs for errors

#### Hardware Virtualization Issues

If you get errors about hardware acceleration:
- Ensure virtualization is enabled in your BIOS settings
- On Windows, make sure Hyper-V is enabled
- On macOS, no additional configuration is needed for hardware acceleration

## Running on Physical iOS Devices

Testing on physical devices is crucial for evaluating real-world performance and user experience.

### Using Expo Go on iOS

To run your app on a physical iOS device:

1. Install the Expo Go app from the App Store on your iOS device
2. Make sure your computer and iOS device are on the same WiFi network
3. In your project directory, run `npx expo start`
4. Scan the QR code with your iOS device's camera
5. The Expo Go app will open and load your project

> 💡 **Deep Dive**: When you scan the QR code, your device connects to the Metro bundler running on your computer. The bundler sends the JavaScript code to your device, which then runs it within the Expo Go app. This avoids the need for provisioning profiles or App Store distribution during development.

### Common Physical iOS Device Issues and Solutions

#### Cannot Connect to Metro Bundler

If your device cannot connect to the Metro bundler:
- Ensure both your computer and device are on the same WiFi network
- Disable any VPNs on your computer or device
- Try running the bundler with an explicit IP: `npx expo start --host <your-computer-ip>`
- Check if your WiFi router has client isolation enabled (prevents devices from seeing each other)

#### App Loads Slowly or Crashes

If your app loads slowly or crashes on a physical device:
- Check the device's available storage and RAM
- Ensure your app's JavaScript bundle isn't too large
- Test on different iOS versions if possible
- Check device logs through Xcode for more detailed error information

## Running on Physical Android Devices

Android physical devices provide a true representation of how your app will perform for users.

### Using Expo Go on Android

To run your app on a physical Android device:

1. Install the Expo Go app from the Google Play Store on your Android device
2. Make sure your computer and Android device are on the same WiFi network
3. Enable Developer Mode on your Android device (Settings > About phone > tap Build number 7 times)
4. Enable USB debugging in Developer Options
5. In your project directory, run `npx expo start`
6. Scan the QR code with the Expo Go app (not the camera app)
7. The app will load your project

> 🔄 **For Android Developers**: This differs from traditional Android development, where you would build an APK and install it on the device. With Expo Go, you're running your code within the Expo Go container app.

### Common Physical Android Device Issues and Solutions

#### App Doesn't Scan QR Code Properly

If your device has trouble scanning the QR code:
- Make sure you're using the Expo Go app to scan, not the camera
- Increase the brightness of your computer screen
- Try entering the URL manually in Expo Go by tapping "Enter URL manually"

#### Performance Issues

If your app performs poorly on Android:
- Test on different Android versions and devices if possible
- Check if your device is in battery saver mode, which might limit performance
- Reduce animations and complex visual effects
- Use the Android profiler to identify performance bottlenecks

#### Connection or Loading Issues

If your app cannot connect or load:
- Check that USB debugging is enabled
- Ensure your device and computer are on the same network
- Try connecting via USB and run `adb reverse tcp:8081 tcp:8081`
- Clear the Expo Go app's cache or reinstall it

## Comparing Development Environments

Each development environment has its advantages and disadvantages:

### iOS Simulator
- **Pros**: Fast to launch, closely mimics iOS behavior, easy to test different iOS versions and devices
- **Cons**: Not a perfect representation of real device performance, lacks physical sensors, consumes significant system resources

### Android Emulator
- **Pros**: Supports most Android APIs, can emulate different devices and Android versions
- **Cons**: Slower than iOS Simulator, consumes a lot of resources, hardware acceleration configuration can be complex

### Physical iOS Devices
- **Pros**: Actual device performance and behavior, access to all device features (camera, accelerometer, etc.)
- **Cons**: Requires constant connection to development machine, limited by available physical devices for testing

### Physical Android Devices
- **Pros**: Real-world performance testing, diverse hardware for testing, access to all device features
- **Cons**: Fragmentation of Android ecosystem makes testing across all configurations difficult, developer mode setup can be complex

## Best Practices for Multi-Platform Testing

For effective testing across platforms:

1. **Start with Simulators/Emulators**: They're quicker to set up and iterate with during early development.

2. **Test Critical Features on Physical Devices**: Especially features that use hardware capabilities like camera, GPS, or sensors.

3. **Test on Multiple OS Versions**: Particularly on Android, where fragmentation is common.

4. **Create a Device Testing Matrix**: Identify the most common device configurations your users will have and ensure you test on those.

5. **Use Expo's Device Preview**: This feature lets you see how your app looks on different device sizes simultaneously.

6. **Enable Remote Debugging**: Helpful for diagnosing issues specific to physical devices.

7. **Monitor Performance Metrics**: Pay attention to load times, responsiveness, and memory usage across different devices.

## Summary

In this section, you've learned how to run your React Native application on iOS simulators, Android emulators, and physical devices using Expo Go. You understand the pros and cons of each environment and how to troubleshoot common issues.

The ability to test across multiple environments is crucial for building robust React Native applications. By following the best practices outlined in this section, you can ensure your pharmacy application works well across a wide range of devices and platforms.

In the next section, we'll explore the project structure and configuration options in more detail, giving you a deeper understanding of how React Native projects are organized.

## Section 3 Exercise: Testing Environment Setup

**Objective**: Configure and document multiple testing environments for a React Native application.

**Tasks**:
1. Configure your development environment to test the default Expo app on at least two different platforms:
   - iOS Simulator (if on macOS)
   - Android Emulator
   - Web browser
   - Physical device (if available)

2. Document the process of setting up each testing environment in a file called `testing-environment.md`, including:
   - Prerequisites for each environment
   - Steps to configure each environment
   - Steps to launch the app on each environment
   - Screenshots of the default Expo app running on each platform

3. Create a testing verification checklist called `environment-verification.md` that includes:
   - Tests to verify that each environment is properly configured
   - Checks for common environment issues
   - Solutions for the most common problems you might encounter
   - What to try when the app doesn't load properly

4. Document the advantages and limitations of each testing environment in a file called `environment-comparison.md`:
   - Performance considerations
   - Feature limitations
   - Development workflow differences
   - When to use each environment during development

**Expected Output**:
- Successfully configured testing environments (at least 2)
- Three documentation files (testing-environment.md, environment-verification.md, and environment-comparison.md)
- Screenshots of the app running on each configured platform

**Hints**:
- To run on web: `npx expo start --web`
- To run on iOS: `npx expo start --ios`
- To run on Android: `npx expo start --android`
- For physical devices, create a connection using the Expo Go app
- Your verification checklist could include checks for:
  - Metro bundler connection
  - Proper rendering of UI elements
  - Reload functionality
  - Development server connectivity
