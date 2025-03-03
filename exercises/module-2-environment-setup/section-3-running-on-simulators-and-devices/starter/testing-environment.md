# Testing Environment Setup Documentation

## iOS Simulator Setup

### Prerequisites
- macOS operating system
- Xcode installed
- Xcode Command Line Tools installed
- Expo CLI installed

### Configuration Steps
1. Install Xcode from the App Store
   ```bash
   # Verify Xcode installation
   xcodebuild -version
   ```

2. Install Xcode Command Line Tools
   ```bash
   xcode-select --install
   ```

3. Configure Xcode simulator
   - Open Xcode
   - Navigate to Preferences > Locations
   - Set Command Line Tools version

### Launch Steps
1. Start the Expo development server
   ```bash
   npx expo start
   ```

2. Launch iOS Simulator
   ```bash
   # Option 1: Using Expo CLI
   i

   # Option 2: Direct command
   npx expo start --ios
   ```

## Android Emulator Setup

### Prerequisites
- Android Studio installed
- Android SDK installed
- Java Development Kit (JDK) installed
- Environment variables configured

### Configuration Steps
1. Install Android Studio
   ```bash
   # Verify installation
   android --version
   ```

2. Configure Android SDK
   - Open Android Studio
   - Navigate to SDK Manager
   - Install required SDK platforms and tools

3. Set up environment variables
   ```bash
   # Add to ~/.zshrc or ~/.bash_profile
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Launch Steps
1. Start Android Emulator
   ```bash
   # List available emulators
   emulator -list-avds

   # Start specific emulator
   emulator -avd [emulator_name]
   ```

2. Launch app on emulator
   ```bash
   # Option 1: Using Expo CLI
   a

   # Option 2: Direct command
   npx expo start --android
   ```

## Web Browser Setup

### Prerequisites
- Node.js installed
- npm installed
- Expo CLI installed

### Configuration Steps
1. Install web dependencies
   ```bash
   npx expo install react-dom react-native-web @expo/webpack-config
   ```

### Launch Steps
1. Start web development server
   ```bash
   npx expo start --web
   ```

## Physical Device Setup

### iOS Device Setup
1. Install Expo Go from App Store
2. Connect to same network as development machine
3. Scan QR code with Camera app

### Android Device Setup
1. Install Expo Go from Play Store
2. Enable Developer Mode
   - Settings > About phone
   - Tap Build number 7 times
   - Enable USB debugging
3. Connect to same network as development machine
4. Scan QR code with Expo Go app

## Screenshots

### iOS Simulator
[Insert screenshot of app running on iOS Simulator]

### Android Emulator
[Insert screenshot of app running on Android Emulator]

### Web Browser
[Insert screenshot of app running in web browser]

### Physical Device
[Insert screenshot of app running on physical device] 