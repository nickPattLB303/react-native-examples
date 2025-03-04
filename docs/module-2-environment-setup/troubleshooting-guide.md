# React Native Environment Setup: Troubleshooting Guide

This guide addresses common issues encountered during React Native environment setup. Use it as a reference when you face problems setting up your development environment.

## Table of Contents
1. [General Troubleshooting Steps](#general-troubleshooting-steps)
2. [Node.js and npm Issues](#nodejs-and-npm-issues)
3. [Expo CLI Issues](#expo-cli-issues)
4. [iOS Simulator Issues](#ios-simulator-issues)
5. [Android Emulator Issues](#android-emulator-issues)
6. [Physical Device Issues](#physical-device-issues)
7. [Dependency and Build Issues](#dependency-and-build-issues)
8. [Metro Bundler Issues](#metro-bundler-issues)
9. [Platform-Specific Error Messages](#platform-specific-error-messages)
10. [When to Reset Your Environment](#when-to-reset-your-environment)

## General Troubleshooting Steps

Before diving into specific issues, try these general troubleshooting steps:

1. **Check your Node.js version** - Ensure you're using a compatible version (at least 14.0.0, with LTS versions recommended):
   ```bash
   node -v
   ```

2. **Verify npm is working** - Check if npm can install packages:
   ```bash
   npm -v
   npm install -g expo-cli
   ```

3. **Clear npm cache** - Try clearing the npm cache:
   ```bash
   npm cache clean --force
   ```

4. **Check for global conflicts** - List global packages to identify conflicts:
   ```bash
   npm list -g --depth=0
   ```

5. **Verify environment variables** - Ensure PATH variables include the correct directories.

6. **Check repository health** - If cloning a project, ensure the repo is in good state:
   ```bash
   npm install
   ```

## Node.js and npm Issues

### Node.js Version Conflicts

**Issue**: Different projects require different Node.js versions.

**Solution**: Use Node Version Manager (nvm):
```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Windows: Use nvm-windows from https://github.com/coreybutler/nvm-windows

# Install and use a specific version
nvm install 16.13.0
nvm use 16.13.0
```

### npm Permission Errors

**Issue**: npm install commands fail with permission errors.

**Solution**: 
```bash
# Fix permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Alternative: Use npm with sudo (not recommended for security)
sudo npm install -g expo-cli
```

### Package Installation Hangs

**Issue**: npm install seems to hang.

**Solution**:
```bash
# Cancel the operation
Ctrl+C

# Try with a different registry
npm install --registry=https://registry.npmjs.org/

# Try with legacy peer deps for npm 7+
npm install --legacy-peer-deps
```

## Expo CLI Issues

### Expo CLI Not Found

**Issue**: `expo` command not found after installation.

**Solution**:
```bash
# Reinstall Expo CLI
npm uninstall -g expo-cli
npm install -g expo-cli

# Verify installation
npx expo --version

# Add to path if necessary (macOS/Linux)
export PATH=$PATH:~/.npm-global/bin

# If using npm with npx (recommended)
npx expo start
```

### Expo Project Creation Fails

**Issue**: `create-expo-app` fails to create a new project.

**Solution**:
```bash
# Try with npx directly
npx create-expo-app@latest MyApp

# Specify a template explicitly
npx create-expo-app@latest MyApp --template blank

# Try clearing the cache
npx clear-npx-cache
npx create-expo-app@latest MyApp
```

### Expo Login Issues

**Issue**: Cannot log in to Expo account.

**Solution**:
```bash
# Verify credentials
npx expo login

# Try with web login
npx expo login -w

# Log out first if already logged in
npx expo logout
npx expo login
```

## iOS Simulator Issues

### Xcode Not Installed Properly

**Issue**: iOS Simulator doesn't launch or reports Xcode issues.

**Solution**:
```bash
# Check Xcode installation
xcode-select -p

# Reset Xcode path
sudo xcode-select --reset

# Install Command Line Tools
xcode-select --install
```

### Simulator Doesn't Launch

**Issue**: iOS Simulator doesn't open when running the app.

**Solution**:
1. Open Xcode manually
2. Go to Xcode > Open Developer Tool > Simulator
3. Once Simulator is open, try running from Expo again:
   ```bash
   npx expo start --ios
   ```

### iOS Build Fails

**Issue**: iOS app fails to build for the simulator.

**Solution**:
```bash
# Check for valid iOS simulator
xcrun simctl list devices

# Start a specific simulator
xcrun simctl boot "iPhone 13"

# Try restarting Expo with clear cache
npx expo start -c --ios
```

## Android Emulator Issues

### Android SDK Not Found

**Issue**: Android SDK location not found or not configured.

**Solution**:
1. Check if Android Studio is installed
2. Verify ANDROID_HOME environment variable:
   ```bash
   # macOS/Linux
   echo $ANDROID_HOME
   
   # Should be set to something like:
   # /Users/username/Library/Android/sdk or
   # /home/username/Android/Sdk
   
   # Set if not defined:
   export ANDROID_HOME=~/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

### Emulator Won't Start

**Issue**: Android emulator fails to launch.

**Solution**:
1. Launch Android Studio
2. Open AVD Manager
3. Start the emulator manually
4. From your project, run:
   ```bash
   npx expo start --android
   ```

### Hardware Acceleration Issues

**Issue**: Emulator is extremely slow or shows hardware acceleration errors.

**Solution**:
1. Ensure hardware acceleration is enabled in BIOS
2. For Windows, install HAXM from Android Studio
3. For AMD processors on Windows, enable Windows Hypervisor Platform
4. Check acceleration status:
   ```bash
   # In Android SDK tools directory
   ./emulator -accel-check
   ```

## Physical Device Issues

### Device Not Detected

**Issue**: Physical device not detected when connected.

**Solution**:
#### For Android:
```bash
# Check if device is connected
adb devices

# If not listed, try:
adb kill-server
adb start-server
adb devices
```

#### For iOS:
1. Ensure device is trusted (prompt appears on device)
2. Verify the device appears in Xcode's devices list

### Expo Go App Can't Connect

**Issue**: Expo Go app can't connect to development server.

**Solution**:
1. Ensure device and computer are on the same WiFi network
2. Try with explicit host:
   ```bash
   npx expo start --host <your-local-ip>
   ```
3. Try with tunnel connection:
   ```bash
   npx expo start --tunnel
   ```
4. On Android, try connecting via USB and running:
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

### QR Code Scanning Issues

**Issue**: QR code scanning doesn't open the app.

**Solution**:
1. For iOS: Use the Camera app to scan
2. For Android: Use the Expo Go app to scan
3. Try entering the URL manually in the Expo Go app
4. Ensure the QR code is clearly visible and well-lit

## Dependency and Build Issues

### Incompatible Dependencies

**Issue**: Dependency version conflicts or incompatibilities.

**Solution**:
```bash
# Check for outdated packages
npm outdated

# Update packages
npx expo install --fix

# For specific incompatible package
npx expo install package@compatible-version

# If using Yarn
yarn why package-name
```

### Duplicate Dependencies

**Issue**: Multiple versions of the same package causing conflicts.

**Solution**:
```bash
# Use npm-dedupe to remove duplicates
npm dedupe

# Check node_modules structure
npx ls-remote node_modules

# For serious issues, try reinstalling
rm -rf node_modules
npm install
```

### Metro Configuration Issues

**Issue**: Metro bundler configuration errors.

**Solution**:
1. Create or update metro.config.js:
   ```jsx
   const { getDefaultConfig } = require('expo/metro-config');
   
   const config = getDefaultConfig(__dirname);
   
   module.exports = config;
   ```
2. Reset Metro cache:
   ```bash
   npx expo start --clear
   ```

## Metro Bundler Issues

### Metro Server Won't Start

**Issue**: Metro bundler fails to start.

**Solution**:
```bash
# Check if port 8081 is already in use
# macOS/Linux
lsof -i :8081

# Windows
netstat -ano | findstr :8081

# Kill the process using that port and try again
# Or use a different port
npx expo start --port 8082
```

### JavaScript Bundling Errors

**Issue**: Errors when bundling JavaScript code.

**Solution**:
```bash
# Clear Metro cache
npx expo start --clear

# Check for syntax errors in your code
npx eslint .

# Try with verbose logging
npx expo start --verbose
```

### Hot Reload Not Working

**Issue**: Changes to code aren't reflected in the app.

**Solution**:
1. Shake the device or press `r` in the terminal to reload
2. Ensure you haven't disabled hot reloading
3. Check if file watcher is working:
   ```bash
   # Increase file watch limits on Linux
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

## Platform-Specific Error Messages

### Common iOS Error Messages

#### "No provisioning profile found"
This occurs when trying to run on a physical device without proper setup.

**Solution**: 
1. Register for Apple Developer account
2. Set up a development team in Xcode
3. Create a provisioning profile

#### "Build input file cannot be found"
This happens when a file referenced in the build can't be located.

**Solution**:
1. Clean the build
   ```bash
   npx expo run:ios --no-build-cache
   ```
2. Check file paths for case sensitivity

### Common Android Error Messages

#### "SDK location not found"
Android SDK path is not correctly configured.

**Solution**:
1. Verify ANDROID_HOME environment variable
2. Create local.properties file in android/ folder:
   ```
   sdk.dir=/path/to/your/Android/sdk
   ```

#### "Gradle task assembleDebug failed"
Build tools or Gradle issues.

**Solution**:
1. Check Gradle version compatibility
2. Try with specific Gradle version:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug --info
   ```

## When to Reset Your Environment

If persistent issues can't be resolved, consider resetting your environment:

### Soft Reset
```bash
# Clear all caches
npm cache clean --force
npx react-native-clean-project

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Hard Reset
```bash
# For Expo projects
rm -rf node_modules
rm -rf .expo
npm cache clean --force
npm install
```

### Nuclear Option
1. Uninstall all development tools (Node.js, Android Studio, Xcode)
2. Remove configuration files
3. Reinstall tools following the latest official documentation

## Getting Additional Help

If this guide doesn't solve your issue:

1. **Check the official documentation**:
   - [Expo Documentation](https://docs.expo.dev/)
   - [React Native Documentation](https://reactnative.dev/docs/environment-setup)

2. **Search for similar issues**:
   - [Expo GitHub Issues](https://github.com/expo/expo/issues)
   - [React Native GitHub Issues](https://github.com/facebook/react-native/issues)
   - [Stack Overflow with the [react-native] tag](https://stackoverflow.com/questions/tagged/react-native)

3. **Join community discussions**:
   - [Expo Discord](https://chat.expo.dev/)
   - [Reactiflux Discord](https://www.reactiflux.com/)

4. **File a bug report**:
   - Include detailed environment information
   - Provide clear steps to reproduce
   - Share relevant logs and error messages 