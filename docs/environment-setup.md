# Environment Setup Guide

This guide will help you set up your development environment for the React Native Training Course.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- A code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/))

## Setting Up Expo

For this course, we'll be using Expo to simplify the React Native development process.

### 1. Install Expo CLI

```bash
npm install -g expo-cli
```

### 2. Create an Expo Account

Visit [expo.dev](https://expo.dev/) and create a free account. This will allow you to:
- Publish and share your projects
- Build native binaries in the cloud
- Access additional Expo services

### 3. Install Expo Go on Your Mobile Device

To run your apps on a physical device:

- **iOS**: Download [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store
- **Android**: Download [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from the Google Play Store

## Setting Up Simulators/Emulators (Optional)

If you prefer to test on simulators/emulators:

### iOS Simulator (macOS only)

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the Mac App Store
2. Open Xcode and install the required components when prompted
3. Open Xcode → Preferences → Components and install a simulator

### Android Emulator

1. Install [Android Studio](https://developer.android.com/studio)
2. During installation, ensure the following are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
3. Open Android Studio → More Actions → Virtual Device Manager
4. Click "Create Device" and follow the instructions to create an emulator

## Setting Up This Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-native-training.git
   cd react-native-training
   ```

2. Check out the docs branch:
   ```bash
   git checkout docs
   ```

3. For exercises and challenges, you'll check out specific branches as instructed in the course materials.

## Verifying Your Setup

To verify that everything is set up correctly:

1. Create a new Expo project:
   ```bash
   expo init TestProject
   cd TestProject
   ```

2. Start the development server:
   ```bash
   expo start
   ```

3. You should see a QR code in your terminal. Scan this with the Expo Go app on your device, or press 'i' or 'a' to open in an iOS simulator or Android emulator.

## Troubleshooting

If you encounter issues during setup:

- Check the [Expo documentation](https://docs.expo.dev/get-started/installation/) for the most up-to-date instructions
- Visit the [Expo forums](https://forums.expo.dev/) for community support
- Consult the instructor or course assistants for help

## Next Steps

Once your environment is set up, you're ready to start the course! Head to [Module 1: React Native Fundamentals](./module-1-react-native-fundamentals/README.md) to begin your React Native journey. 