# Module 2: React Native Environment Setup with Expo

## 2.7 Common Setup Hurdles and Troubleshooting Strategies (expo-doctor)

Approach: Encountering setup issues is common, especially when first configuring a development environment. A systematic approach is key: carefully read error messages, understand the potential cause, and then apply targeted solutions rather than random fixes.

npx expo-doctor: The primary diagnostic tool provided by Expo is expo-doctor.39 It should often be the first step when troubleshooting setup or configuration problems. Running $ npx expo-doctor in the project directory performs a series of checks on the environment, project configuration (package.json, app.json), dependencies, and native tooling versions.71 It reports potential issues and often provides actionable advice or links to relevant documentation for resolving them.

Common Issues & Solutions: The following table summarizes frequent setup problems and recommended solutions:

Table: Troubleshooting Common Expo Setup Issues

|
|

Symptom/Error
|

Potential Cause
|

Recommended Solution(s)
|
|
|

ERESOLVE / Peer Dependency Warning
|

Incompatible dependency versions; often from using npm install directly.
|

1\. Use npx expo install <package>. <br> 2. Check library compatibility with your Expo SDK version. <br> 3. As temporary workaround: npm install --legacy-peer-deps (use with caution). Avoid --force. 48
|
|
|

Packager errors, unexpected crashes after update
|

Corrupted node_modules, cache issues, incomplete dependency installation.
|

1\. rm -rf node_modules && rm -f package-lock.json && npm install (or yarn/pnpm equivalents). <br> 2. npm cache clean --force. <br> 3. Restart Metro bundler (Ctrl+C then npx expo start). <br> 4. Use npx expo start -c to clear Metro cache.66 <br> 5. Restart computer.
|
|
|

CLI stuck on "Opening on iOS Simulator"
|

Simulator unresponsive, Xcode license not accepted, initial build needed.
|

1\. Manually open Simulator app (open -a Simulator).50 <br> 2. In CLI, press i again. <br> 3. Ensure Xcode license is accepted (may prompt on first Xcode run). <br> 4. Ensure Xcode Command Line Tools are selected. <br> 5. In Simulator menu: Device > Erase All Content and Settings... (last resort).50
|
|
|

Expo Go app doesn't open in simulator
|

Initial permission prompt missed or simulator interaction needed.
|

Interact with the simulator (click/drag) to potentially trigger the "Open in Expo Go?" prompt, then accept.50 Ensure Expo Go is installed on the simulator (it should install automatically when pressing i).
|
|
|

EXPO_ROUTER_APP_ROOT not defined
|

Expo Router Babel plugin missing or misconfigured in babel.config.js.
|

Ensure plugins: ['expo-router/babel'] is present in babel.config.js. Clear cache: npx expo start -c.
|
|
|

require.context not enabled
|

Metro config (metro.config.js) not set up correctly for Expo Router.
|

Ensure metro.config.js extends expo/metro-config or correctly enables context modules for Expo Router. Delete metro.config.js if customization isn't needed to revert to default Expo Metro config. Clear cache: npx expo start -c.
|
|
|

General project configuration issues
|

Various misconfigurations (plugins, dependencies, native setup).
|

Run npx expo-doctor for automated checks and recommendations.39
|
|

Many common setup problems within the Expo ecosystem are specific to its architecture and tooling. Issues like dependency conflicts frequently arise from not using npx expo install, which respects the versioning constraints of the Expo SDK. Errors related to features like Expo Router often point to missing or incorrect configurations in babel.config.js or metro.config.js. Cache-related problems can affect the Metro bundler's behavior. Simulator connection issues might involve Xcode configuration or permissions. Because these issues are often tied to Expo's specific way of managing dependencies and integrating tools, understanding these ecosystem specifics and utilizing Expo's dedicated diagnostic tool, expo-doctor, are crucial for effective troubleshooting.

#### Works cited

39. Troubleshooting overview - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/troubleshooting/overview/>
48. Recommended Setup for using Expo Install - Issue #212 - antfu-collective/ni - GitHub, accessed April 24, 2025, <https://github.com/antfu-collective/ni/issues/212>
50. iOS Simulator - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/workflow/ios-simulator/>
66. How can I clean (reset cache) of React Native using Expo. Not sure if it is cache issue, accessed April 24, 2025, <https://stackoverflow.com/questions/51998636/how-can-i-clean-reset-cache-of-react-native-using-expo-not-sure-if-it-is-cach>
71. Issues building and using expo-location with react native (IOS) - Reddit, accessed April 24, 2025, <https://www.reddit.com/r/expo/comments/1evbtpb/issues_building_and_using_expolocation_with_react/>