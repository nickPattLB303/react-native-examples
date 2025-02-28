# Section 1: Development Tools Installation

## Learning Objectives
After completing this section, you will be able to:
- Install all required development tools for React Native development on macOS
- Configure your system for both iOS and Android development
- Understand the purpose of each tool in the React Native development workflow
- Verify your installation with appropriate checks

**Prerequisite Knowledge**: Basic command line familiarity
**Estimated Time**: 30-45 minutes

## Essential Development Tools Overview

React Native development requires several tools and dependencies to create, build, and run applications across different platforms. In this section, we'll install and configure these tools on macOS.

> 🔄 **For iOS Developers**: You already have Xcode installed, but make sure it's updated to the latest stable version and that you have Command Line Tools installed.

> 🔄 **For Android Developers**: You already have Android Studio and the Android SDK, but you'll need to configure them specifically for React Native development.

> 🔄 **For Web Developers**: You're likely familiar with Node.js and npm, but you'll need additional tools for mobile development.

### Required Tools for macOS

Here's a complete list of the tools we'll install:

1. **Xcode and Command Line Tools** - Required for iOS development and general macOS development
2. **Node.js** - JavaScript runtime environment for running React Native
3. **Watchman** - File watching service that improves performance
4. **Expo CLI** - Command-line interface for managing Expo projects
5. **Expo Go App** - For testing on physical iOS and Android devices
6. **iOS Simulator** - For testing iOS applications on your Mac
7. **Android Studio** - Required for Android development
8. **JDK (Java Development Kit)** - Required for Android development
9. **Git** - Version control system

## Installation Steps

### 1. Install Xcode and Command Line Tools

Xcode is Apple's integrated development environment (IDE) required for iOS development.

1. Open the App Store and search for "Xcode"
2. Click "Get" or "Download" to install Xcode (this may take some time as it's a large download)
3. Once installed, open Xcode and accept any license agreements
4. Install Command Line Tools by opening Terminal and running:

```bash
xcode-select --install
```

> 💡 **Deep Dive**: The Command Line Tools package gives you essential development tools like Git, the Apple LLVM compiler, and build tools necessary for native development. React Native uses these tools during the build process to compile native code for iOS.

### 2. Install Homebrew

Homebrew is a package manager for macOS that makes it easy to install development tools.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions to complete the installation.

> 💡 **Tip**: After installing Homebrew, make sure to follow any post-installation instructions that appear in your terminal, such as adding Homebrew to your PATH.

### 3. Install Node.js

Node.js is a JavaScript runtime that powers React Native development.

```bash
brew install node
```

Verify the installation:

```bash
node --version  # Should show v16.x or later
npm --version   # Should show v8.x or later
```

> 💡 **Deep Dive**: React Native uses Node.js not only during development but also at runtime. The Metro bundler (React Native's JavaScript bundler) runs on Node.js and is responsible for transforming your JavaScript code into a format that can be interpreted by the JavaScript engine on the device.

### 4. Install Watchman

Watchman is a file watching service that improves performance for file changes.

```bash
brew install watchman
```

Verify the installation:

```bash
watchman --version
```

> 💡 **Deep Dive**: Watchman optimizes the development workflow by efficiently observing file changes. When you modify your code, Watchman notifies the Metro bundler, which then rebundles your JavaScript. This enables features like Fast Refresh, which updates your app without requiring a full reload.

### 5. Install Git

Git is essential for version control and package management.

```bash
brew install git
```

Verify the installation:

```bash
git --version
```

### 6. Set Up iOS Development Environment

The iOS Simulator comes with Xcode, but we need to make sure it's correctly set up:

1. Open Xcode
2. Go to Preferences (Xcode > Preferences or Command + ,)
3. Go to the Locations tab
4. Make sure a valid SDK is selected for Command Line Tools

> 🔄 **For iOS Developers**: You're already familiar with this setup, but verify that your environment is configured for the latest iOS version you want to target.

### 7. Set Up Android Development Environment

For Android development, we need both Android Studio and the JDK:

#### Install JDK

```bash
brew install --cask adoptopenjdk/openjdk/adoptopenjdk11
```

#### Install Android Studio

1. Download Android Studio from [the official website](https://developer.android.com/studio)
2. Install Android Studio by following the installation wizard
3. During setup, ensure that the following components are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
4. Complete the installation and launch Android Studio
5. In the "Welcome to Android Studio" window, click on "More Actions" > "SDK Manager"
6. In the SDK Platforms tab, select:
   - Android 13 (Tiramisu)
   - Android 12 (S)
   - Android 11 (R)
7. In the SDK Tools tab, select:
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android Emulator
   - Android SDK Platform-Tools
8. Click "Apply" to download and install these components

#### Configure Android Environment Variables

Add these lines to your shell profile file (`.zshrc`, `.bash_profile`, or `.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Reload your shell profile:

```bash
source ~/.zshrc  # Or the appropriate file for your shell
```

> 🔄 **For Android Developers**: You're familiar with this setup, but make sure your `ANDROID_HOME` path is correctly set and that you have all the necessary SDK components installed.

### 8. Install Expo CLI

Expo CLI is a command-line utility for creating and managing Expo projects:

```bash
npm install -g expo-cli
```

Verify the installation:

```bash
expo --version
```

### 9. Install Expo Go on Your Mobile Devices

For testing on physical devices:

1. For iOS: Download [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) from the App Store
2. For Android: Download [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from the Google Play Store

## Verifying Your Installation

Let's verify that all tools are correctly installed and configured:

### 1. Verify Node.js and npm

```bash
node --version
npm --version
```

### 2. Verify Watchman

```bash
watchman --version
```

### 3. Verify Xcode Command Line Tools

```bash
xcode-select --print-path
```

This should output something like `/Applications/Xcode.app/Contents/Developer`.

### 4. Verify Android SDK

```bash
sdkmanager --list | grep "installed"
```

This should list all installed Android SDK packages.

### 5. Verify Expo CLI

```bash
expo --version
```

## Troubleshooting Common Installation Issues

### Xcode Command Line Tools Issues

If you encounter issues with Xcode Command Line Tools:

```bash
sudo xcode-select --reset
xcode-select --install
```

### Node.js Version Conflicts

If you need to manage multiple Node.js versions:

```bash
brew install nvm
```

Follow the instructions to configure nvm, then:

```bash
nvm install 16
nvm use 16
```

### Android SDK Configuration Issues

If Android environment variables aren't working:

1. Check that the path in `ANDROID_HOME` actually exists
2. Make sure you've sourced your profile file after adding the variables
3. Verify with:

```bash
echo $ANDROID_HOME
```

> 💡 **Deep Dive**: React Native's build process uses these environment variables to locate the Android SDK tools it needs for compiling and packaging your application. Without them, the Metro bundler and React Native CLI won't be able to communicate with the Android tools.

## Summary

In this section, you've installed and configured all the necessary tools for React Native development on macOS. These tools create a complete environment for developing, building, and testing React Native applications for both iOS and Android platforms.

Understanding the purpose of each tool is crucial for troubleshooting issues that may arise during development. The combination of these tools enables the React Native workflow, allowing you to write JavaScript code that gets executed in a native environment.

In the next section, we'll use these tools to create our first Expo project and start the React Native development process.

## Section 1 Exercise: Development Tools Verification

**Objective**: Verify that all required development tools are correctly installed and configured.

**Tasks**:
1. Create a script named `env-check.sh` (macOS/Linux) or `env-check.bat` (Windows) that performs the following checks:
   - Verify Node.js installation and version (should be 14.0.0 or higher)
   - Verify npm installation and version
   - Verify Expo CLI installation and version
   - Verify Android SDK installation (for Android development)
   - Verify Xcode installation (for iOS development on macOS)
   - Check if Watchman is installed (for macOS)
   - Output all results in a formatted way

2. Run the script and fix any issues detected.

3. Document the process in a file called `environment-verification.md`, including:
   - Commands used to check each tool
   - Any issues encountered and how you resolved them
   - Screenshots of successful verification

**Expected Output**:
- A working verification script
- A documentation file describing the process and results

**Hint**: Here's a starter template for your verification script (macOS/Linux):

```bash
#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

echo "===== React Native Environment Verification ====="
echo "Checking development tools..."

# Check Node.js
if command_exists node; then
  node_version=$(node -v)
  echo "✅ Node.js is installed: $node_version"
  # Add version check logic here
else
  echo "❌ Node.js is not installed"
fi

# Check npm
# Add your code here

# Check Expo CLI
# Add your code here

# Check Watchman (macOS only)
# Add your code here

# Check Xcode (macOS only)
# Add your code here

# Check Android SDK
# Add your code here

echo "===== Verification Complete ====="
``` 