# Device Testing Guide Exercise

## Instructions for Instructors
This file contains the instructions and evaluation criteria for testing React Native applications on different devices and simulators. Students will create a testing guide and document the process.

## Exercise Overview

### Scenario
You are creating a testing guide for your pharmacy application development team. Document the process of running and testing the application on different platforms and create a systematic testing approach.

### Time Allocation
- iOS Setup & Testing: 20 minutes
- Android Setup & Testing: 20 minutes
- Documentation: 20 minutes

## Part 1: Testing Environment Setup

### Task 1: iOS Simulator Setup
Document the process of setting up and running the app on iOS simulators:

```markdown
## iOS Simulator Setup Guide

### Prerequisites
- [ ] Xcode installed and updated
- [ ] Command Line Tools installed
- [ ] iOS Simulator installed

### Setup Steps
1. Open Xcode and install required simulators:
   ```bash
   # List available simulators
   xcrun simctl list devices
   
   # Create a new simulator (if needed)
   xcrun simctl create "iPhone 14" "iPhone 14" "iOS15.0"
   ```

2. Configure simulator settings:
   - Enable location services
   - Configure camera simulation
   - Set up network conditions

### Running the App
1. Start the development server:
   ```bash
   npx expo start
   ```

2. Launch in simulator:
   ```bash
   # Using Expo CLI
   i
   
   # Or direct command
   npx expo run:ios
   ```
```

### Task 2: Android Emulator Setup
Document the process of setting up and running the app on Android emulators:

```markdown
## Android Emulator Setup Guide

### Prerequisites
- [ ] Android Studio installed
- [ ] Android SDK installed
- [ ] At least one AVD created

### Setup Steps
1. Create a new AVD:
   - Open Android Studio
   - Open Device Manager
   - Create Virtual Device
   - Select device definition
   - Choose system image
   - Configure AVD options

2. Configure environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Running the App
1. Start the emulator:
   ```bash
   # List AVDs
   emulator -list-avds
   
   # Start specific AVD
   emulator -avd [avd_name]
   ```

2. Launch the app:
   ```bash
   # Using Expo CLI
   a
   
   # Or direct command
   npx expo run:android
   ```
```

## Part 2: Physical Device Testing

### Task 1: iOS Device Setup
Create a guide for testing on physical iOS devices:

```markdown
## iOS Physical Device Testing

### Prerequisites
- [ ] Expo Go app installed
- [ ] Device connected to same network as development machine
- [ ] iOS device running iOS 13 or later

### Setup Steps
1. Install Expo Go from App Store
2. Enable developer mode on device
3. Trust developer certificate

### Testing Process
1. Start development server
2. Scan QR code with device camera
3. Document testing results
```

### Task 2: Android Device Setup
Create a guide for testing on physical Android devices:

```markdown
## Android Physical Device Testing

### Prerequisites
- [ ] Expo Go app installed
- [ ] USB debugging enabled
- [ ] Device connected to same network as development machine

### Setup Steps
1. Enable developer options
2. Configure USB debugging
3. Install Expo Go from Play Store

### Testing Process
1. Start development server
2. Scan QR code with Expo Go
3. Document testing results
```

## Part 3: Testing Documentation

Create a comprehensive testing documentation template:

```markdown
# Device Testing Documentation

## Test Environment

### Device/Simulator Information
- Platform: [iOS/Android]
- Device/Simulator: [Name and version]
- OS Version: [OS version]
- Screen Size: [Resolution]

### App Information
- Version: [App version]
- Build: [Build number]
- Environment: [Dev/Staging/Prod]

## Test Cases

### 1. App Launch
- [ ] App launches successfully
- [ ] Splash screen displays correctly
- [ ] Initial loading performance
- [ ] Memory usage at launch

### 2. UI Components
- [ ] Layout renders correctly
- [ ] Text is readable
- [ ] Images load properly
- [ ] Buttons are properly sized
- [ ] Touch targets are adequate

### 3. Navigation
- [ ] Tab navigation works
- [ ] Stack navigation works
- [ ] Gestures function properly
- [ ] Back navigation works

### 4. Device Features
- [ ] Camera access works
- [ ] Location services work
- [ ] Push notifications
- [ ] Deep linking

### 5. Performance
- [ ] Scrolling is smooth
- [ ] Animations are fluid
- [ ] No visible lag
- [ ] Memory usage is stable

## Issues Found
| Issue | Platform | Device | Steps to Reproduce | Priority |
|-------|----------|--------|-------------------|----------|
|       |          |        |                   |          |

## Testing Notes
- [Add any additional observations]
- [Note any platform-specific issues]
- [Document workarounds found]
```

## Evaluation Criteria

### Documentation Quality (40%)
- Clear setup instructions
- Complete testing procedures
- Well-organized structure
- Comprehensive test cases

### Testing Coverage (30%)
- Multiple devices/simulators
- Platform-specific features
- Error scenarios
- Performance testing

### Issue Documentation (30%)
- Clear issue descriptions
- Reproduction steps
- Platform information
- Priority assessment

### Strong submissions should:
- Include step-by-step guides
- Cover multiple platforms
- Document common issues
- Provide troubleshooting steps

### Weak submissions typically:
- Miss key setup steps
- Lack platform-specific details
- Have incomplete test cases
- Poor issue documentation

## Additional Notes for Instructors

When evaluating:
- Verify guides on different platforms
- Check completeness of test cases
- Review issue documentation quality
- Assess troubleshooting guidance

## Submission Requirements
- Complete setup guides
- Test case documentation
- Issue reports
- Testing results
- Screenshots from different platforms 