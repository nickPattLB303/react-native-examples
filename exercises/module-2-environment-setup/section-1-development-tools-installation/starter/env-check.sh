#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to check version meets minimum requirement
version_meets_requirement() {
  local version=$1
  local required=$2
  version=${version#v}  # Remove 'v' prefix if present
  
  if [ "$(printf '%s\n' "$required" "$version" | sort -V | head -n1)" = "$required" ]; then 
    return 0
  else
    return 1
  fi
}

echo "===== React Native Environment Verification ====="
echo "Checking development tools..."

# Check Node.js
if command_exists node; then
  node_version=$(node -v)
  echo "✅ Node.js is installed: $node_version"
  if version_meets_requirement "$node_version" "14.0.0"; then
    echo "  ✓ Node.js version meets minimum requirement (14.0.0)"
  else
    echo "  ✗ Node.js version does not meet minimum requirement (14.0.0)"
  fi
else
  echo "❌ Node.js is not installed"
fi

# Check npm
if command_exists npm; then
  npm_version=$(npm -v)
  echo "✅ npm is installed: $npm_version"
else
  echo "❌ npm is not installed"
fi

# Check Expo CLI
if command_exists expo; then
  expo_version=$(expo --version)
  echo "✅ Expo CLI is installed: $expo_version"
else
  echo "❌ Expo CLI is not installed"
fi

# Check Watchman (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
  if command_exists watchman; then
    watchman_version=$(watchman --version)
    echo "✅ Watchman is installed: $watchman_version"
  else
    echo "❌ Watchman is not installed"
  fi
fi

# Check Xcode (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
  if command_exists xcodebuild; then
    xcode_version=$(xcodebuild -version | head -n 1)
    echo "✅ Xcode is installed: $xcode_version"
  else
    echo "❌ Xcode is not installed"
  fi
fi

# Check Android SDK
if [[ -n "$ANDROID_HOME" ]]; then
  echo "✅ Android SDK is configured: $ANDROID_HOME"
  # TODO: Add more specific Android SDK checks here
else
  echo "❌ Android SDK is not configured (ANDROID_HOME not set)"
fi

echo "===== Verification Complete =====" 