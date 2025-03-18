# React Native Environment Verification Documentation

This document provides an overview of the verification process for my React Native development environment setup.

## Verification Script

I created a shell script to verify that all required development tools are correctly installed and configured. The script checks for:

- Node.js installation and version
- npm installation and version
- Watchman installation
- Xcode and Command Line Tools (macOS only)
- Android SDK installation and environment variables
- Expo CLI accessibility
- Git installation

## Commands Used for Verification

### Node.js and npm

```bash
# Check if Node.js is installed and get version
node --version

# Check if npm is installed and get version
npm --version

# Check if version is greater than or equal to required version
if [ "$(printf '%s\n' "16.0.0" "$node_version" | sort -V | head -n1)" = "16.0.0" ]; then
  echo "Node.js version meets requirements"
else
  echo "Node.js version does not meet requirements"
fi
```

### Watchman

```bash
# Check if Watchman is installed and get version
watchman --version
```

### Xcode and Command Line Tools

```bash
# Check if Xcode is installed
xcode-select -p

# Check if Xcode Command Line Tools are installed
pkgutil --pkg-info=com.apple.pkg.CLTools_Executables
```

### Android SDK

```bash
# Check if ANDROID_HOME environment variable is set
echo $ANDROID_HOME

# Check if Android SDK directories exist
ls -la $ANDROID_HOME/platform-tools
ls -la $ANDROID_HOME/emulator

# Check if Android SDK tools are in PATH
which adb
which emulator
```

### Expo CLI

```bash
# Check if Expo CLI is accessible
npx expo --version
```

### Git

```bash
# Check if Git is installed and get version
git --version
```

## Verification Results

Below are screenshots of the successful verification of my development environment:

### Script Execution

![Script Execution](https://example.com/script-execution.png)
*Note: This is a placeholder. In your actual documentation, include a real screenshot of your script execution.*

### Node.js and npm Verification

![Node.js and npm Verification](https://example.com/node-npm-verification.png)
*Note: This is a placeholder. In your actual documentation, include a real screenshot of your Node.js and npm verification.*

### Android SDK Verification

![Android SDK Verification](https://example.com/android-sdk-verification.png)
*Note: This is a placeholder. In your actual documentation, include a real screenshot of your Android SDK verification.*

## Issues Encountered and Resolutions

### Issue 1: Node.js Version Too Old

**Problem**: The script detected that my Node.js version was 14.17.0, which is below the required 16.0.0.

**Resolution**: I installed nvm (Node Version Manager) and used it to install and switch to Node.js 16:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 16
nvm install 16

# Use Node.js 16
nvm use 16
```

### Issue 2: Android SDK Environment Variables Not Set

**Problem**: The script could not find the Android SDK because the environment variables were not set correctly.

**Resolution**: I added the following lines to my `~/.zshrc` file:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then I reloaded the shell configuration:

```bash
source ~/.zshrc
```

## Conclusion

After resolving the issues mentioned above, all verification checks passed successfully. My development environment is now properly set up for React Native development.

The verification script has been a valuable tool for ensuring that all required components are correctly installed and configured. It will also be useful for quickly checking the environment setup on other machines or after system updates.
