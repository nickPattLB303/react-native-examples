# Environment Verification Checklist

## Development Environment Checks

### Metro Bundler
- [ ] Metro bundler starts successfully
  ```bash
  npx expo start
  ```
  - Expected: QR code and options menu displayed
  - If fails: Check Node.js version and Expo CLI installation

### iOS Development
- [ ] Xcode installation
  ```bash
  xcodebuild -version
  ```
  - Expected: Version information displayed
  - If fails: Reinstall Xcode from App Store

- [ ] iOS Simulator
  ```bash
  xcrun simctl list devices
  ```
  - Expected: List of available simulators
  - If fails: Check Xcode Command Line Tools

### Android Development
- [ ] Android Studio installation
  - Check Android Studio version
  - Verify SDK installation
  - Check platform tools

- [ ] Environment variables
  ```bash
  echo $ANDROID_HOME
  echo $PATH | grep android
  ```
  - Expected: Valid paths displayed
  - If fails: Update environment variables

- [ ] Emulator availability
  ```bash
  emulator -list-avds
  ```
  - Expected: List of available emulators
  - If fails: Create new emulator in Android Studio

## Common Issues and Solutions

### Metro Bundler Issues
1. Port already in use
   - Error: "Port 8081 already in use"
   - Solution: Kill existing process
     ```bash
     lsof -i :8081
     kill -9 <PID>
     ```

2. Cache issues
   - Error: "Unable to resolve module..."
   - Solution: Clear Metro cache
     ```bash
     npx expo start --clear
     ```

### iOS Simulator Issues
1. Simulator not responding
   - Solution: Reset simulator
     ```bash
     xcrun simctl erase all
     ```

2. App not installing
   - Solution: Delete app and reinstall
     - Long press app icon in simulator
     - Delete app
     - Restart bundler

### Android Emulator Issues
1. ADB not found
   - Error: "adb not found in PATH"
   - Solution: Add platform-tools to PATH
     ```bash
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

2. Emulator performance
   - Solution: Enable hardware acceleration
   - Check CPU virtualization support
   - Update graphics drivers

### Network Issues
1. Device can't connect
   - Check same network
   - Disable firewall temporarily
   - Try connecting via USB
   - Use tunnel mode:
     ```bash
     npx expo start --tunnel
     ```

2. QR code not working
   - Check network connectivity
   - Try manual URL entry
   - Verify Expo Go installation

## Verification Steps

### 1. Development Server
- [ ] Start Metro bundler
- [ ] Verify QR code generation
- [ ] Check available commands (i, a, w)

### 2. iOS Testing
- [ ] Launch iOS Simulator
- [ ] Install Expo Go
- [ ] Load application
- [ ] Verify hot reload
- [ ] Check console output

### 3. Android Testing
- [ ] Start Android Emulator
- [ ] Install Expo Go
- [ ] Load application
- [ ] Verify hot reload
- [ ] Check console output

### 4. Physical Device Testing
- [ ] Install Expo Go on device
- [ ] Connect to development server
- [ ] Load application
- [ ] Verify hot reload
- [ ] Check for error messages

## Testing Checklist

### Basic Functionality
- [ ] App loads successfully
- [ ] Navigation works
- [ ] UI elements render correctly
- [ ] Touch interactions work
- [ ] Keyboard input functions

### Development Features
- [ ] Hot reload works
- [ ] Console logs appear
- [ ] Debugging tools accessible
- [ ] Error messages visible
- [ ] Source maps working

### Performance
- [ ] App starts quickly
- [ ] Animations are smooth
- [ ] No visible lag
- [ ] Memory usage stable
- [ ] Network requests work

## Documentation

### Required Screenshots
- [ ] Metro bundler console
- [ ] iOS Simulator running app
- [ ] Android Emulator running app
- [ ] Physical device running app
- [ ] Development server status

### Error Documentation
For each error encountered:
- [ ] Error message
- [ ] Steps to reproduce
- [ ] Solution applied
- [ ] Verification of fix 