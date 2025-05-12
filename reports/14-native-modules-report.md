Module 14: Working with Native Modules
(Target Versions: React Native 0.7x+, Expo SDK 52+, TypeScript)
This module delves into the critical concept of Native Modules within the React Native ecosystem. Participants will gain a comprehensive understanding of what Native Modules are, the fundamental reasons for their use, how to leverage the extensive ecosystem of existing modules (with a focus on the Expo SDK), and a conceptual grasp of the modern architectural approaches (JSI, TurboModules, Fabric) for creating custom native integrations. The goal is to equip learners with the knowledge to effectively utilize native capabilities within their React Native applications.
Section 1: What are Native Modules? Why Use Them?
Core Definition
At its heart, a React Native application orchestrates two distinct worlds: the JavaScript realm, where the application logic resides and runs within a JavaScript engine (commonly Hermes in modern React Native), and the Native Platform realm, encompassing the underlying operating system code (Java/Kotlin for Android, Objective-C/Swift for iOS). Native Modules serve as the essential conduits, the communication channels that bridge these two worlds.
A Native Module is, fundamentally, a piece of native code designed to be callable from JavaScript. It exposes specific functionalities of the underlying native platform—APIs, device capabilities, system services—to the JavaScript layer of a React Native application. This allows JavaScript code, which is inherently limited in its direct access to device hardware and OS features, to invoke native operations.
It is crucial to understand that nearly every interaction a React Native application has with the device or operating system, beyond pure JavaScript computation and UI rendering managed directly by React Native's core, relies on some form of native module. Whether it's accessing the camera, getting the device's location, displaying a native alert, or even core functionalities provided by React Native itself, these actions are mediated through native modules, whether they are part of the React Native core, included via the Expo SDK, sourced from third-party libraries, or custom-built.
**
The "Why": Use Cases & Motivations
The necessity for Native Modules stems from several key requirements in mobile application development:
Accessing Platform-Specific APIs: Mobile operating systems offer a vast array of APIs for interacting with device hardware and system services. Many of these are not exposed through React Native's standard components or APIs out-of-the-box. Native Modules provide the mechanism to tap into these capabilities, such as interacting with Bluetooth Low Energy (BLE) peripherals, utilizing specialized sensors (like barometers or proximity sensors), integrating with native machine learning frameworks (Core ML on iOS, ML Kit on Android), performing complex background tasks adhering to platform constraints, or implementing platform-specific user interface patterns not available in React Native core.
Performance Optimization: While JavaScript engines like Hermes are highly optimized, certain tasks remain computationally intensive. Operations like heavy image or video processing, complex mathematical calculations, cryptographic operations, or large-scale data manipulation can sometimes block the single JavaScript thread, leading to a sluggish user interface and poor user experience. Executing these demanding tasks within native code, which can leverage multi-threading and highly optimized platform libraries, often yields significantly better performance. Native Modules allow developers to offload these computations to the native side. **
Reusing Existing Native Code: Many organizations possess pre-existing native libraries developed for Android (as .aar or .jar files) or iOS (as .framework or .a static libraries). These libraries might contain valuable business logic, proprietary algorithms, or platform-specific utilities. Native Modules provide a pathway to integrate and utilize this existing native code within a React Native application, avoiding the substantial effort and potential introduction of errors associated with rewriting the logic entirely in JavaScript.
Integrating Third-Party Native SDKs: The mobile ecosystem is rich with third-party services offering Software Development Kits (SDKs) for functionalities like analytics, crash reporting, push notifications, payment processing, advertising, and more. These SDKs are typically provided as native libraries. Native Modules act as the necessary wrappers or adapters to incorporate these external native SDKs into a React Native application, allowing JavaScript code to interact with their features.
Core Mechanism Evolution (Under the Hood)
The way JavaScript communicates with native code has evolved significantly in React Native, directly impacting the performance and capabilities of Native Modules:
Legacy Architecture: The Bridge: In older versions of React Native (pre-0.68, approximately, though the transition is gradual), communication relied heavily on the "Bridge." This was an asynchronous, message-passing mechanism.
Process: When JavaScript needed to call a native function, it would construct a message containing the module name, method name, and arguments. This payload was serialized into a JSON string.
Transmission: The serialized message was placed onto a queue and sent across the Bridge to the native side.
Native Execution: The native side would deserialize the message, identify the target module and method, convert the arguments to native types, and invoke the native code.
Callback (Optional): If the JavaScript call expected a result (via a callback or Promise), the native code would execute, potentially perform its own asynchronous operations, and eventually send a result back across the Bridge, again involving serialization and deserialization.
Key Characteristics: The defining traits of the Bridge were its asynchronous nature (JS calls didn't block waiting for the native side, relying on callbacks/Promises) and the serialization overhead (converting data to/from JSON for every call). This could lead to latency and bottlenecks, especially for frequent or high-throughput communication. **
New Architecture: JSI (JavaScript Interface): The New Architecture introduces a fundamentally different communication layer built upon the JavaScript Interface (JSI). JSI represents a paradigm shift.
Direct C++ Layer: JSI is essentially an API defined in C++ that allows the JavaScript engine (Hermes) to interact directly with C++ code, and vice-versa. React Native leverages this C++ layer as an intermediary between JavaScript and the native platform code (Java/Kotlin/Objective-C/Swift).
Synchronous Potential: The most significant change enabled by JSI is the ability for JavaScript to hold direct references to native objects (represented as C++ Host Objects) and invoke methods on them synchronously. This means JS can call a function, execution can jump to C++/native code, perform an operation, and return a result directly back to JS, all within the same "tick" of the JS event loop (assuming the native operation itself is synchronous).
Bypassing Overhead: JSI eliminates the need for JSON serialization/deserialization for many types of data transfer and bypasses the asynchronous message queue of the legacy bridge. This results in significantly faster and more efficient communication.
Foundation for Modern Modules: It's critical to understand that modern native module implementations (specifically TurboModules, discussed later) are built on top of JSI. JSI provides the underlying high-performance communication channel. **
The move from the asynchronous, serialization-heavy Bridge to the direct, synchronous-capable JSI layer is more than just an internal implementation detail. It fundamentally enhances the potential for deep, performant integration between JavaScript and native code. The limitations imposed by the Bridge's latency and overhead restricted certain types of interactions, particularly those requiring frequent updates or low-latency responses (like driving animations smoothly from native events or handling real-time data streams). JSI removes these barriers, allowing JavaScript and native code to interact almost as if they were in the same execution environment for synchronous operations. This capability makes React Native feel considerably "closer" to native performance in scenarios leveraging JSI-based communication, enabling features and integrations that were previously impractical or inefficient.
Furthermore, recognizing the core reasons for using native modules—accessing platform APIs, optimizing performance, reusing code, integrating SDKs—helps developers make informed architectural decisions. When faced with a complex feature or a performance challenge, understanding why native modules exist provides a framework for evaluation. Is the problem solvable with pure JavaScript? If not, does an Expo SDK module or a community module address the need? Only when these options are exhausted does the significant undertaking of creating a custom native module become the logical, albeit more complex, path forward. This structured approach prevents developers from prematurely diving into native development and helps direct problem-solving efforts effectively.
Background Bridge Note
For Native Android/iOS Developers: The concept of Native Modules can be mapped to familiar native development practices.
Android: Think of creating a Native Module as somewhat analogous to defining a Java or Kotlin class containing methods intended to be called from another layer (like JavaScript). In the legacy system, methods were often annotated with @ReactMethod. React Native managed the process of making these methods callable from JS and handling data marshalling across the Java-JS boundary, conceptually similar to how Java Native Interface (JNI) allows Java and C/C++ interaction, but highly abstracted by the React Native framework (Bridge or JSI). TurboModules, built on JSI, introduce a more formalized contract definition using specs and C++.
iOS: Similarly, Native Modules in iOS involved creating Objective-C or Swift classes that typically conformed to the RCTBridgeModule protocol in the legacy system. Methods exposed to JavaScript were marked using macros like RCT_EXPORT_METHOD. React Native handled the bridging between Objective-C/Swift and JavaScript. JSI and TurboModules replace this mechanism with a C++ layer and code generation based on a defined specification, akin to how one might bridge Swift and Objective-C, but extended to JavaScript.
Key Takeaway: React Native provides the abstraction layer (whether the older Bridge or the newer JSI) that handles the complex inter-process and cross-language communication, allowing native developers to focus primarily on implementing the desired platform functionality.
For Web Developers (React/Angular): There isn't a direct, one-to-one equivalent to Native Modules in standard browser-based web development. Browsers provide a fixed set of Web APIs (like fetch, localStorage, DOM manipulation APIs, Geolocation, etc.) that JavaScript can access. Native Modules are React Native's mechanism for extending the set of available APIs beyond what React Native provides out-of-the-box. They allow JavaScript code to reach "down" into the underlying mobile operating system and hardware capabilities, accessing features unavailable in the sandboxed browser environment. This is conceptually closer to how Node.js uses C++ add-ons to interact with the host system's file system, network stack, or other low-level resources, providing capabilities beyond standard browser JavaScript.
Official Documentation Link Box
React Native - Native Modules Introduction (Official Docs): https://reactnative.dev/docs/native-modules-intro
React Native - Native Modules (Android - Legacy Focus): https://reactnative.dev/docs/native-modules-android
React Native - Native Modules (iOS - Legacy Focus): https://reactnative.dev/docs/native-modules-ios
React Native - Communication between Native and React Native (New Architecture focus): https://reactnative.dev/docs/communication-native-react-native
Section 2: Using Existing Native Modules (Community & Expo SDK)
The Ecosystem
The power of React Native is significantly amplified by its rich ecosystem of pre-built Native Modules. Developers seldom need to venture into writing custom native code from scratch for common functionalities, as solutions often already exist. This ecosystem can be broadly categorized:
React Native Core Modules: These are fundamental modules bundled directly with React Native itself. Examples include the Platform module (for detecting the OS), Dimensions (for getting screen size), and Alert (for displaying native alerts). These provide essential building blocks for most applications and were covered in Module 9, but it's important to recognize them as implementations of the native module pattern.
Expo SDK Modules: Expo maintains a curated collection of high-quality, robust native modules specifically designed for ease of use within the Expo ecosystem (Managed Workflow, Development Builds, EAS Build). These cover a wide range of common needs, from accessing sensors and camera to handling file system operations and push notifications. They offer simplified JavaScript APIs and abstract away much of the underlying native complexity. A deeper dive into these modules is provided in Section 3. \*\*
Community Modules: Beyond the core framework and the Expo SDK, a vast number of native modules are developed, shared, and maintained by the broader React Native community, including individual developers and companies. These modules cover a diverse spectrum of functionalities, from integrating specific hardware to wrapping niche native libraries or providing alternative implementations of common features.
Discovering Community Modules
Finding suitable community modules requires navigating the ecosystem effectively. Key resources include:
React Native Directory: (https://reactnative.directory/) A searchable database specifically for React Native libraries, often providing compatibility information (including Expo support).
npm Registry: Searching npm (https://www.npmjs.com/) using relevant keywords (e.g., "react native bluetooth", "react native chart").
GitHub: Searching GitHub for React Native libraries, allowing inspection of code, issues, and activity.
However, evaluating community modules demands careful consideration due to variability in quality, maintenance, and compatibility:
Maintenance Activity: Check the repository's commit history, release frequency, and responsiveness to issues and pull requests. An actively maintained library is more likely to stay compatible with future React Native, iOS, and Android updates.
Open Issues and Pull Requests: Review open issues for known bugs, compatibility problems, or feature limitations. Look at pull requests to gauge community involvement and the maintainer's engagement.
Documentation Quality: Clear, comprehensive documentation is crucial for understanding how to install, configure, and use the module correctly.
Compatibility: Verify compatibility with the target React Native version (0.7x+), target platform versions (iOS/Android), and crucially, with the Expo ecosystem if applicable (see Config Plugins below).
New Architecture Support: As the React Native ecosystem transitions, check if the module supports or has plans to support the New Architecture (TurboModules/Fabric). Using modules compatible with the New Architecture is increasingly important for future-proofing applications and leveraging performance benefits.
The process of vetting community modules requires greater diligence than selecting a typical pure JavaScript library. This is because native modules introduce dependencies on native build systems and platform APIs. A poorly maintained or incompatible native module can lead to build failures, runtime crashes, or subtle bugs that are harder to debug than issues confined to the JavaScript layer. Compatibility issues might arise not just with React Native versions, but also specific OS versions or conflicts with other native modules used in the project. Therefore, careful evaluation focusing on maintenance, compatibility (especially New Architecture readiness), and documentation is essential before integrating a community module.
Installation and Linking (Under the Hood)
Integrating a native module into a project involves adding the JavaScript package and ensuring the associated native code is correctly included and linked during the mobile app build process. The mechanisms for this have evolved:
npm/yarn Installation: Like any JavaScript dependency, native module packages are installed using a package manager:
Bash
npm install <package-name>

# or

yarn add <package-name>

Linking (Legacy Context - Pre-RN 0.60): In earlier React Native versions, after installing a package containing native code, developers often had to run react-native link <package-name>. This command attempted to automate the process of modifying native project files: updating the Podfile (iOS) to include the module's native dependency via CocoaPods and modifying settings.gradle and app/build.gradle (Android) to include the native library project. This process was manual for complex cases and sometimes prone to errors.
Autolinking (RN 0.60+): React Native versions 0.60 and above introduced autolinking. This significantly simplified the process for standard React Native projects (those not using the Expo Managed Workflow). The React Native build tools (specifically, the CLI and the native build processes for iOS and Android) are now designed to automatically detect native modules within the node_modules directory based on their package configuration (package.json and platform-specific configuration files).
iOS: During pod install (which is typically run automatically as part of npx react-native run-ios or the Xcode build process), CocoaPods detects the module's .podspec file and links the native dependency.
Android: The Gradle build system detects the module's configuration and automatically includes it as a dependency during the build sync process.
Autolinking removes the need for react-native link in most cases for standard projects. **
Expo: npx expo install, Prebuild, and Config Plugins: The Expo ecosystem, particularly the Managed Workflow, handles native dependencies differently.
npx expo install: When working within an Expo project, it is strongly recommended to use npx expo install <package-name> instead of npm install or yarn add. This command serves multiple purposes:
It ensures installation of a package version known to be compatible with the project's Expo SDK version.
For many popular community native modules, it can automatically configure the necessary Config Plugins (see below).
Expo SDK Modules: Modules that are part of the core Expo SDK are either pre-compiled into the Expo Go client app (for development) or seamlessly included when creating Development Builds or production builds via EAS Build. No manual linking is required.
Community Modules & Native Code: Historically, the Expo Managed Workflow restricted the use of community modules that included custom native code because developers didn't have direct access to the underlying native project files (ios and android directories).
Expo Config Plugins: This limitation is overcome by Config Plugins. A Config Plugin is essentially a script (written in JavaScript) associated with a native module. When Expo prepares the native projects (either during expo prebuild for local native builds or implicitly during eas build), it executes these Config Plugins. The plugins programmatically modify the native configuration files (like Info.plist, AndroidManifest.xml, build.gradle, Podfile) to correctly integrate the community module's native dependencies before the actual native compilation begins. This allows developers to use a wide range of community native modules within the Expo Managed Workflow without needing to "eject" or directly manage native code. **
The evolution from manual linking (react-native link) to autolinking in core React Native, and further to the sophisticated Config Plugin system within Expo, highlights a significant trend: simplifying the developer experience around native code integration. Manual linking was often a source of friction and errors. Autolinking streamlined this for standard projects. Config Plugins were a crucial innovation for Expo, bridging the gap between the convenience of the Managed Workflow and the need to leverage the broader ecosystem of community native modules. This dramatically increased the flexibility and power of Expo development without sacrificing its core benefits.
Usage in JavaScript/TypeScript
Once a native module is installed and properly linked (either via autolinking or Expo's mechanisms), using it in JavaScript or TypeScript follows the standard ES6 module import syntax:

TypeScript

// Import the default export (common for modules exposing an object)
import SomeNativeModule from 'some-native-module-package';

// Or import specific functions/constants exposed by the module
import { doSomethingNative, NATIVE_CONSTANT } from 'another-native-module-package';

// Example usage (hypothetical)
async function performNativeAction() {
try {
const result = await SomeNativeModule.performAction('some data');
console.log('Native action result:', result);

    const anotherResult = await doSomethingNative(NATIVE_CONSTANT);
    console.log('Another native result:', anotherResult);

} catch (error) {
console.error('Error calling native module:', error);
}
}

The specific functions, methods, and constants available will be defined by the module's API, which should be detailed in its documentation.
Background Bridge Note
For Native Android/iOS Developers: Adding a community React Native module is conceptually similar to adding a third-party library or dependency in native development.
Android: It's like adding a dependency to your app/build.gradle file (e.g., implementation 'com.example:library:1.0.0'). Autolinking or Expo Config Plugins automate finding and adding these Gradle dependencies based on the installed npm package.
iOS: It's akin to adding a Pod to your Podfile and running pod install. Autolinking or Config Plugins automate the discovery of the module's .podspec file and its inclusion in the Podfile.
Key Takeaway: React Native's tooling (autolinking, npx expo install, Config Plugins) acts as a higher-level package manager that coordinates both JavaScript dependencies (via npm/yarn) and the corresponding native dependencies (via Gradle/CocoaPods).
For Web Developers (React/Angular): Installing a community module starts identically to installing any JavaScript library using npm or yarn. The crucial difference arises when the library contains native code (for Android or iOS). Unlike web development where the library is purely JavaScript (or compiles to JS), these React Native libraries require an additional step to integrate their native parts into the mobile application's build process. Autolinking (for standard RN) and Expo Config Plugins (for Expo projects) handle this native integration step, which doesn't have a direct parallel in browser-based development. Think of it as npm install plus an automated step that configures the underlying mobile project to recognize and compile the library's native components.
Official Documentation Link Box
React Native - Linking Libraries (Official Docs - explains autolinking): https://reactnative.dev/docs/linking-libraries-ios (iOS section, concept applies to Android too)
Expo - Using Libraries (Explains npx expo install): https://docs.expo.dev/guides/using-libraries/
Expo - Config Plugins: https://docs.expo.dev/guides/config-plugins/
React Native Directory: https://reactnative.directory/
Section 3: Expo SDK Modules Overview
Introduction to Expo SDK
The Expo SDK is a cornerstone of the Expo ecosystem, providing a curated suite of high-quality, well-maintained native modules that cover a vast range of common application development needs. The primary goal of the Expo SDK is to grant developers access to powerful native device capabilities through simple, consistent, and unified JavaScript APIs. This abstracts away much of the underlying native implementation complexity and platform-specific differences between iOS and Android.
Modules within the Expo SDK are designed for seamless integration. They work reliably within the Expo Go app (a development client containing the SDK), Development Builds (custom builds of the Expo Go client including additional native modules), and production applications built using EAS Build (Expo Application Services). This focus on integration and ease of use significantly streamlines the development process for common native functionalities.
\*\*
Categorization (Conceptual)
The Expo SDK is extensive. To aid navigation, its modules can be conceptually grouped by functionality:
Sensors: Accessing accelerometer, gyroscope, magnetometer, barometer, pedometer (expo-sensors).
UI Components & APIs: Providing native UI elements or APIs like Date/Time pickers, Maps (react-native-maps, often used with Expo), SVG (react-native-svg), Haptics (expo-haptics).
Device Information: Getting details about the device hardware and software (expo-device), network state (expo-network), battery (expo-battery), screen orientation (expo-screen-orientation).
File System: Reading and writing to the app's sandboxed file system, downloading/uploading files (expo-file-system), managing assets (expo-asset).
Camera/Media: Accessing the camera, photo library, audio/video playback (expo-camera, expo-media-library, expo-image-picker, expo-av).
Location: Getting the device's geographic location (expo-location).
Notifications: Handling push notifications and local notifications (expo-notifications).
Authentication: Integrating with local authentication methods (Face ID, Touch ID, Passcode) (expo-local-authentication).
Storage: Securely storing small pieces of data (expo-secure-store), key-value storage (@react-native-async-storage/async-storage, commonly used).
Updates: Implementing Over-the-Air (OTA) updates (expo-updates).
Core Utilities: Font loading (expo-font), splash screen control (expo-splash-screen), constants (expo-constants).
Deep Dive into Key Modules (Examples)
Below are examples of key Expo SDK modules, illustrating their functionality, use cases, basic usage in TypeScript, and a conceptual "under the hood" explanation.

1. expo-device
   Functionality: Provides comprehensive information about the physical device executing the application, such as OS name and version, device model and manufacturer, total memory, device type (phone, tablet, tv), and more.
   Common Use Cases: Gathering analytics data about user devices, tailoring UI elements or features based on device characteristics (e.g., different layouts for tablets), displaying debugging information, checking OS compatibility for certain features.
   TypeScript Code Example:
   TypeScript
   import \* as Device from 'expo-device';

console.log(`OS: ${Device.osName} ${Device.osVersion}`);
console.log(`Model: ${Device.manufacturer} ${Device.modelName}`);
console.log(`Is Tablet: ${Device.deviceType === Device.DeviceType.TABLET}`);
console.log(`Total Memory: ${Device.totalMemory? (Device.totalMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB' : 'N/A'}`);

Under the Hood Nugget: This module acts as a wrapper around standard native platform APIs used for retrieving device information. On Android, it primarily utilizes the android.os.Build class and related system services. On iOS, it accesses properties from UIDevice and ProcessInfo.processInfo. Expo ensures these disparate native APIs are presented through a consistent JavaScript interface. The module is bundled within Expo Go and Development Builds, requiring no separate installation for basic Expo setups. 2. expo-location
Functionality: Enables access to the device's geographic location information using various providers (GPS, Wi-Fi, cellular). It includes built-in handling for requesting necessary user permissions.
Common Use Cases: Implementing map features, geotagging photos or posts, providing location-aware recommendations or services, tracking movement (with appropriate permissions and battery considerations).
TypeScript Code Example:
TypeScript
import \* as Location from 'expo-location';
import { LocationObject } from 'expo-location';

async function getCurrentLocation(): Promise<LocationObject | null> {
// Request permission first
let { status } = await Location.requestForegroundPermissionsAsync();
if (status!== 'granted') {
console.error('Permission to access location was denied');
// Optionally inform the user
return null;
}

try {
// Get the current location
let location = await Location.getCurrentPositionAsync({
accuracy: Location.Accuracy.Balanced, // Adjust accuracy as needed
});
console.log('Location:', location.coords.latitude, location.coords.longitude);
return location;
} catch (error) {
console.error('Error getting location:', error);
return null;
}
}

Under the Hood Nugget: expo-location abstracts the platform-specific location services frameworks. On Android, it typically interacts with the FusedLocationProviderClient API, part of Google Play Services, which intelligently manages underlying providers (GPS, Wi-Fi, cellular). On iOS, it utilizes the CoreLocation framework (CLLocationManager). Expo's module handles the complexities of requesting permissions (manifest entries, runtime prompts), configuring accuracy/power usage, and delivering location updates through a unified JavaScript API. 3. expo-camera
Functionality: Provides components and APIs for displaying a live camera preview, capturing photos, and recording videos. It also manages camera permissions.
Common Use Cases: Building custom in-app camera interfaces, integrating QR code or barcode scanning capabilities (often used in conjunction with a dedicated scanning library like expo-barcode-scanner), capturing images or videos for user profiles or content creation.
TypeScript Code Example (Conceptual JSX & Logic):
TypeScript
import React, { useState, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from 'expo-camera';

function MyCameraComponent() {
const [permission, requestPermission] = Camera.useCameraPermissions();
const = useState(CameraType.back);
const cameraRef = useRef<Camera>(null);

if (!permission) {
// Camera permissions are still loading
return <View />;
}

if (!permission.granted) {
// Camera permissions are not granted yet
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
<Button onPress={requestPermission} title="Grant Permission" />
</View>
);
}

async function takePicture() {
if (cameraRef.current) {
const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({ quality: 0.7 });
console.log('Photo URI:', photo.uri);
// Handle the captured photo (e.g., display it, upload it)
}
}

return (
<View style={{ flex: 1 }}>
<Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
{/_ UI Overlays for controls can go here _/}
</Camera>
<Button title="Take Pic" onPress={takePicture} />
{/_ Add button to flip camera type etc. _/}
</View>
);
}

Under the Hood Nugget: expo-camera renders a native view component that displays the live feed from the device's camera hardware. It uses modern native camera APIs for robust functionality: CameraX on Android (part of Android Jetpack) and AVFoundation on iOS. The JavaScript API provides methods (takePictureAsync, recordAsync, etc.) that trigger the corresponding native operations on the camera view instance. Expo manages permissions and abstracts differences in native API usage. 4. expo-file-system
Functionality: Provides access to a portion of the device's local file system that is sandboxed for the application. Allows reading, writing, deleting files and directories, downloading files from network URLs, and uploading files.
Common Use Cases: Caching network responses or images, storing user-generated content (like downloaded documents or saved drafts), managing application assets or configuration files, downloading files for offline access.
TypeScript Code Example:
TypeScript
import \* as FileSystem from 'expo-file-system';

async function manageFiles() {
const fileUri = FileSystem.documentDirectory + 'myUserData.json'; // Use documentDirectory for user files

try {
// Write data to a file
const jsonData = JSON.stringify({ userId: 123, preferences: { theme: 'dark' } });
await FileSystem.writeAsStringAsync(fileUri, jsonData, {
encoding: FileSystem.EncodingType.UTF8,
});
console.log('File written successfully!');

    // Read data from the file
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const data = JSON.parse(content);
      console.log('Read data:', data);
    }

    // Download a file
    const downloadUri = FileSystem.cacheDirectory + 'profilePic.jpg'; // Use cacheDirectory for temporary files
    const { uri: downloadedUri } = await FileSystem.downloadAsync(
      'https://example.com/remote/image.jpg',
      downloadUri
    );
    console.log('Finished downloading to ', downloadedUri);

    // Delete the file later
    // await FileSystem.deleteAsync(fileUri);

} catch (error) {
console.error('File system error:', error);
}
}

Under the Hood Nugget: This module interacts with the standard native file I/O APIs provided by Android and iOS, operating within the application's designated storage directories (e.g., Internal Storage, External Cache Directory on Android; Application Support Directory, Caches Directory on iOS). It provides constants like FileSystem.documentDirectory and FileSystem.cacheDirectory that map to the appropriate platform-specific paths, ensuring cross-platform compatibility for accessing standard app storage locations. The download/upload functionalities typically leverage native networking libraries for efficient transfers.
Expo Abstraction Layer
A key benefit of using Expo SDK modules is the abstraction layer they provide. The JavaScript API exposed to the developer aims for stability and consistency across platforms and versions. Expo can update the underlying native implementation of a module (e.g., to adopt a newer, more performant Android API or fix a platform-specific bug) without necessarily requiring changes to the developer's JavaScript code. Expo manages the versioning and compatibility of its modules within the SDK releases, significantly reducing the burden on developers compared to managing disparate community native modules individually.
Key Expo SDK Modules Overview Table
The following table provides a quick reference to some of the most commonly used Expo SDK modules, their core purpose, and links to their official documentation.
Module Name (expo-)
Core Functionality
Common Use Cases
Link to Official Expo Docs
expo-device
Device hardware/software information
Analytics, conditional UI/features, debugging
Link
expo-location
Access device geographic location
Maps, geotagging, location-aware features
Link
expo-camera
Camera preview, photo/video capture
Custom camera UI, QR/barcode scanning, image/video capture
Link
expo-file-system
App file system access, download/upload
Caching, storing user content, offline data
Link
expo-asset
Manage static assets (images, fonts)
Loading images/fonts bundled with the app or downloaded
Link
expo-font
Load custom fonts
Using custom typography in the application
Link
expo-notifications
Handle push and local notifications
Engaging users, providing timely alerts
Link
expo-secure-store
Secure key-value storage
Storing sensitive data like auth tokens, API keys
Link
expo-splash-screen
Control the native splash screen visibility
Keeping splash screen visible during asset loading, smooth transitions
Link
expo-updates
Implement Over-the-Air (OTA) updates
Deploying JS/asset updates quickly without a full app store submission
Link
expo-av
Audio/Video playback and recording
Music players, video players, voice memo features
Link
expo-sensors
Access device sensors (accelerometer, gyro, etc.)
Motion detection, device orientation tracking, augmented reality
Link
expo-haptics
Trigger native haptic feedback
Enhancing user interaction with tactile feedback
Link
expo-constants
System/app constants (manifest, device year, etc.)
Accessing build-time config, platform checks
Link
expo-local-authentication
Use biometrics/passcode for authentication
Securing parts of the app, confirming user identity
Link

(Note: This table is not exhaustive but covers many frequently used modules.)
The extensive nature of the Expo SDK significantly lowers the barrier to entry for incorporating native features into React Native applications. For developers, especially those without deep native Android or iOS experience, the SDK provides a highly productive path. Instead of needing to find, evaluate, install, and potentially configure a community native module (using Config Plugins), developers using Expo can often achieve the desired functionality with a simple npx expo install expo-<module-name> and by utilizing the well-documented, consistent JavaScript API provided. This drastically reduces friction and complexity for a wide array of common mobile development tasks.
However, this convenience comes with a dependency on the Expo ecosystem and its release cycle. While generally a significant advantage, projects with highly specialized native requirements not covered by the Expo SDK or existing community modules (with Config Plugins) might find the pure Managed Workflow limiting. In such cases, developers might need to use Development Builds with custom native code or explore other integration patterns. Understanding this trade-off between the convenience and productivity of the Expo SDK and the potential need for deeper native control is important for long-term project planning and architectural strategy.
Section 4: Introduction to Creating Native Modules (Conceptual Overview)
When to Consider Creating Custom Modules
While the Expo SDK and the vast community library ecosystem cover a multitude of use cases, situations arise where creating a custom Native Module becomes necessary. However, this path involves significantly more complexity than using pre-built solutions. Therefore, the decision to build a custom module should be made deliberately, after exhausting other possibilities.
Always prioritize exploring existing solutions first:
Check the Expo SDK for relevant modules.
Search for well-maintained Community Modules (using resources like React Native Directory) that might meet the need, potentially requiring an Expo Config Plugin for integration.
Custom Native Module development should typically be considered only in the following scenarios:
Integrating Proprietary In-house Native SDKs: When an organization needs to use its own existing, private native libraries (Android/iOS) within a React Native application.
Accessing Niche Platform APIs: When the application requires access to very specific or newly released OS features or hardware capabilities that are not yet wrapped by React Native core, the Expo SDK, or any suitable community module.
Optimizing Critical Performance Bottlenecks: If a core functionality suffers from severe performance issues even after optimizing JavaScript code, and existing native solutions (like Expo SDK modules) are insufficient or not applicable, writing highly optimized native code might be the only way to achieve the required performance.
Needing Fine-Grained Control: When an existing module provides the general functionality but lacks the specific configuration options, callbacks, or low-level control required for the application's unique needs.
Contributing to the Ecosystem: When developing a novel capability that could benefit other React Native developers, contributing it as a new open-source native module.
The creation of custom native modules represents a substantial increase in complexity and required expertise compared to consuming pre-built ones. It pushes developers beyond the JavaScript/TypeScript realm into native platform development (Java/Kotlin for Android, Objective-C/Swift for iOS), native build systems (Gradle, Xcode), and the intricacies of React Native's cross-language communication architecture. This necessitates a broader skillset and significantly increases both initial development time and ongoing maintenance effort. Consequently, the decision to build custom native code should be approached with caution and undertaken only when the benefits clearly outweigh the associated costs and complexities.
High-Level Process Overview
Creating a native module fundamentally involves bridging the JavaScript and native worlds. This requires writing code in multiple languages and environments:
JavaScript/TypeScript Interface: Defining the API that the JavaScript code will use to interact with the native module. This includes specifying the methods, arguments, and return types (or Promise/callback structures).
Native Implementation (Android): Writing the actual logic using Java or Kotlin, utilizing Android SDK APIs. This code needs to be structured to integrate with React Native's module system.
Native Implementation (iOS): Writing the corresponding logic using Objective-C or Swift, utilizing iOS SDK APIs, and structuring it for React Native integration.
Bridging Code: Implementing the necessary glue code that allows React Native to discover the module and route calls between JavaScript and the native implementations. The specifics of this bridging code differ significantly between the legacy architecture and the New Architecture.
Furthermore, setting up a proper native development environment is essential, requiring installations of Android Studio (with the Android SDK and NDK) and Xcode (with the iOS SDK and command-line tools).
Legacy Architecture Approach (Brief Historical Context)
Before the advent of the New Architecture (JSI, TurboModules, Fabric), creating native modules followed a different pattern, heavily reliant on the asynchronous Bridge:
Android: Developers typically created a Java class extending ReactContextBaseJavaModule. Methods intended to be callable from JavaScript were annotated with @ReactMethod. Data types were manually converted between JavaScript types (often received as ReadableMap, ReadableArray, etc.) and Java types. Communication back to JS usually involved invoking Callbacks or resolving Promises passed from JS.
iOS: Developers created an Objective-C class implementing the RCTBridgeModule protocol. Methods exposed to JavaScript were defined using the RCT_EXPORT_METHOD macro. Similar manual type checking and conversion were necessary between JS types (like NSDictionary, NSArray) and Objective-C types. Callbacks (RCTResponseSenderBlock) or Promises (RCTPromiseResolveBlock, RCTPromiseRejectBlock) were used for returning results.
**
This legacy approach suffered from the limitations of the Bridge: asynchronous communication overhead and the lack of built-in type safety between JS and native calls. While crucial for understanding older React Native codebases or community libraries that haven't migrated, this legacy method is not the recommended approach for creating new native modules.
New Architecture Prerequisite
The modern, preferred, and future-facing approach for creating native integrations is through React Native's New Architecture. This architecture fundamentally redesigns the communication (JSI) and rendering (Fabric) layers for improved performance and capabilities.
Key components relevant to native module creation in the New Architecture are:
JSI (JavaScript Interface): The underlying C++ communication layer enabling direct, synchronous interaction.
TurboModules: The new system for implementing native modules, leveraging JSI and code generation for type safety and performance.
Fabric: The new rendering system, which includes Fabric Native Components for bridging native UI elements.
To utilize TurboModules or Fabric Components, the New Architecture must be enabled in the React Native application. This typically involves setting configuration flags:
Android: Setting newArchEnabled=true in the android/gradle.properties file.
iOS: Running pod install within the ios directory after setting the environment variable RCT_NEW_ARCH_ENABLED=1.
The subsequent sections (Section 5: TurboModules, Section 6: JSI, Section 7: Fabric Components) focus exclusively on these modern New Architecture concepts. The existence and promotion of the New Architecture signal a clear strategic direction from the React Native core team. It aims to address the inherent performance limitations and complexities of the legacy bridge-based system. Investing heavily in JSI, TurboModules, and Fabric indicates that future React Native advancements and community library developments will increasingly rely on these foundations. Therefore, adopting the New Architecture, especially for new native integrations, is crucial for performance, future compatibility, and avoiding technical debt associated with legacy approaches.
Complexity Acknowledgement
It must be emphasized that creating custom native modules, even with the New Architecture's improvements, remains a complex task significantly exceeding the difficulty of typical application development purely within JavaScript/TypeScript and React Native components. It demands a solid understanding of:
Native platform development (Android/iOS SDKs, languages, lifecycles).
Native build systems (Gradle for Android, CocoaPods/Xcode for iOS).
The intricacies of React Native's specific architecture (JSI, TurboModules/Fabric concepts, Codegen).
Potentially C++ for deeper JSI interactions or complex module implementations.
This course provides a conceptual overview of these advanced topics to ensure learners understand the underlying mechanisms and the modern approach. It does not aim to be a comprehensive guide to implementing custom native modules from scratch, which would require dedicated, in-depth study of each platform and the New Architecture specifics.
Official Documentation Link Box
React Native - New Architecture Migration Guide (For enabling): https://reactnative.dev/docs/new-architecture-intro
React Native - Turbo Native Modules (Entry point for new way): https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules
Android Native Modules (Legacy - for context): https://reactnative.dev/docs/native-modules-android
iOS Native Modules (Legacy - for context): https://reactnative.dev/docs/native-modules-ios
Section 5: TurboModules (New Architecture Native Modules)
Purpose and Goals
TurboModules represent the evolution of Native Modules within React Native's New Architecture. They are designed to replace the legacy native module system, addressing its performance bottlenecks and lack of type safety.
The primary goals behind TurboModules are:
Improved Performance: Leverage the JSI layer for faster, more direct communication between JavaScript and native code, including the possibility of synchronous execution.
Strong Type Safety: Enforce consistency between the JavaScript interface and the native implementation at build time, reducing runtime errors.
Lazy Loading: Load native modules into memory only when they are first required by the JavaScript code, improving application startup time compared to the legacy system where many modules were initialized upfront.
Reduced Initialization Overhead: Streamline the process of making native modules available to JavaScript.
Core Concepts (Under the Hood)
TurboModules achieve their goals through a combination of JSI, explicit specifications, and code generation:
JSI (JavaScript Interface): TurboModules are fundamentally built upon JSI. They rely on JSI's ability to allow JavaScript to hold direct references to native objects (implemented in C++ initially, then bridging to platform native code) and invoke methods on them. This direct interaction bypasses the serialization and asynchronous queuing of the legacy Bridge.
**
Specification (Spec) File: The contract, or API, of a TurboModule is explicitly defined in a JavaScript file using strict typing. This is typically done using TypeScript (or Flow, Facebook's static type checker). This "spec" file details the exact methods the module will expose to JavaScript, including the names, parameter types, and return types (including Promises).
**
Codegen (Code Generation): React Native includes a build-time tool called Codegen. This tool reads the JavaScript spec file (TypeScript/Flow) and automatically generates significant portions of the boilerplate code required to connect the JavaScript side to the native implementations. This generated code includes:
C++ interface code: Defines the C++ representation of the module that interacts directly with JSI.
Native interface code: Generates interfaces or protocols in the target native languages (Java/Kotlin for Android, Objective-C++ for iOS) that the developer's custom native implementation must conform to.
Benefits: Codegen ensures that the native implementation adheres precisely to the structure defined in the JS spec, guaranteeing type consistency across the JS-Native boundary. It also significantly reduces the amount of manual "glue" code developers need to write.
Lazy Loading: Unlike legacy modules, which were often discovered and initialized eagerly during application startup, TurboModules are designed to be loaded on demand. The JavaScript runtime only resolves and initializes the native implementation of a TurboModule the first time one of its methods is actually called from JavaScript. This "just-in-time" loading contributes to faster application startup times, particularly for apps with many native modules.
Benefits
The TurboModule system offers tangible advantages over the legacy approach:
Performance: The combination of JSI's direct, synchronous-capable communication and lazy loading leads to significant performance improvements, especially for frequently called methods and app startup time.
Type Safety: By defining the module interface in TypeScript/Flow and using Codegen to generate corresponding native interfaces, type mismatches between JavaScript calls and native implementations are caught at build time, not as runtime errors. This leads to more robust and reliable integrations.
Reduced Boilerplate: Codegen automates the generation of repetitive and error-prone bridging code (especially the C++ JSI layer), allowing developers to focus more on the core native logic.
This shift towards an interface-driven approach (Spec + Codegen) marks a significant maturation in how React Native handles native integrations. The legacy system relied heavily on naming conventions and runtime checks, making it susceptible to subtle errors if the JavaScript call signature didn't perfectly match the native method implementation. TurboModules enforce this contract rigorously through static typing and build-time code generation, much like how using TypeScript within a JavaScript project improves code quality and reduces runtime bugs. This emphasis on a clear, verifiable contract leads to more robust and maintainable native modules.
Development Workflow (Conceptual)
Creating a TurboModule involves these conceptual steps:
Write the Spec: Create a TypeScript (or Flow) file defining the interface of the module, specifying all methods and their signatures.
Configure Codegen: Set up the project's build configuration to run Codegen, pointing it to the spec file.
Run Codegen: Execute the build process, which triggers Codegen to generate the C++ and native interface code based on the spec.
Implement Native Logic: Write the platform-specific native code (Java/Kotlin for Android, Objective-C/Swift for iOS) that implements the logic for the methods defined in the spec. This implementation must conform to the interfaces generated by Codegen.
Register the Module: Ensure the native module implementation is registered with React Native so it can be found and invoked via JSI.
Integrate: Link the native code into the application's build process (e.g., via Gradle for Android, CocoaPods for iOS).
While Codegen simplifies the bridging aspect, it's important to recognize that implementing TurboModules still demands substantial native development expertise. Developers must write the actual platform-specific code in Java/Kotlin or Objective-C/Swift. They also need a conceptual understanding of how JSI facilitates the communication and how the generated C++ code fits into the picture. Furthermore, configuring the build system to correctly incorporate Codegen and link the custom native code requires familiarity with native build tooling (Gradle, Xcode/CocoaPods). TurboModules streamline part of the native module creation process but do not eliminate the inherent complexity of cross-language development and native platform integration.
Background Bridge Note
For Native Android/iOS Developers: The TurboModule workflow, particularly the Spec + Codegen aspect, can be compared to using Interface Definition Languages (IDL) or similar code generation tools sometimes employed in native development or cross-platform communication (e.g., AIDL for inter-process communication in Android, Protocol Buffers for data serialization, OpenAPI generators for web APIs). The TypeScript spec serves as the formal definition of the cross-language contract. Codegen then generates the necessary stub/interface code. The reliance on JSI introduces a C++ layer that might be less familiar than the direct Java-to-JS or Objective-C-to-JS bridging used in the legacy React Native system.
For Web Developers (React/Angular): Think of the TypeScript spec file as defining the API contract for your native functionality, much like you would define TypeScript types or interfaces for data fetched from a backend API or define a GraphQL schema. Codegen acts like a specialized build tool that reads this high-level contract and automatically generates the low-level "plumbing" code (in C++ and native languages) needed to connect your JavaScript calls to the actual native implementation. It ensures that the "backend" (the native code) adheres to the expectations set by the "frontend" (the JavaScript spec), providing type safety across the boundary.
Official Documentation Link Box
React Native - Turbo Native Modules: https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules
React Native - Codegen: https://reactnative.dev/docs/the-new-architecture/modules-codegen
React Native - JSI Overview: https://reactnative.dev/docs/the-new-architecture/pillars-jsi
Section 6: JSI for Direct Communication
Recap: JSI Definition
JSI, or JavaScript Interface, is a pivotal component of React Native's New Architecture. It is fundamentally a lightweight, general-purpose Application Programming Interface (API) implemented in C++. Its core function is to enable direct, bidirectional interaction between a JavaScript engine (specifically Hermes, which is optimized for JSI, but also JavaScriptCore) and C++ code.
Crucially, JSI acts as the foundation upon which the New Architecture's communication mechanisms—TurboModules and the Fabric renderer's interaction layer—are built. It serves as the high-performance replacement for the legacy asynchronous message bridge that characterized older React Native versions.
**
How it Works (Under the Hood)
Understanding JSI involves grasping several key concepts:
C++ Layer: JSI defines a set of C++ interfaces, classes, and functions. The JavaScript engine implements one side of these interfaces, and the host environment (React Native) implements the other. This shared C++ interface allows them to communicate directly without needing intermediate layers like JSON serialization for basic interactions.
Direct Method Calls & Host Objects: JSI allows C++ code to expose objects, known as Host Objects, directly to the JavaScript runtime. JavaScript code can obtain references to these Host Objects and invoke their methods as if they were regular JavaScript objects. This method invocation translates into a direct call to the underlying C++ method.
Synchronous Execution: This is arguably the most transformative aspect of JSI. When JavaScript calls a method on a JSI Host Object, the execution can transfer synchronously to the C++ layer. If the corresponding C++ method (and any native code it calls) executes quickly and returns a value, that value can be returned directly back to the JavaScript caller within the same execution cycle (or "tick") of the JavaScript event loop. This capability for synchronous, low-latency, request-response style interaction was impossible with the inherently asynchronous legacy Bridge.
Efficient Data Transfer (Avoiding Serialization): For many common data types (numbers, booleans, strings, and potentially simple objects), JSI allows more direct manipulation and transfer between JavaScript and C++ compared to the legacy bridge's mandatory serialization/deserialization to/from JSON strings. While complex objects might still require some form of conversion, bypassing JSON for frequent, simple calls significantly reduces overhead. (Note: This is a conceptual simplification; the exact memory management and data handling are complex but the key takeaway is the reduction in serialization overhead compared to the Bridge).
Implications of Synchronous Communication
The ability of JSI to facilitate synchronous calls has profound implications:
Performance Gains: For interactions that require immediate responses or high frequency, JSI offers substantial performance improvements by eliminating the latency and overhead associated with the Bridge's asynchronous queuing and JSON serialization. This is crucial for smooth animations driven by native events, real-time updates from sensors, or any scenario requiring tight coupling between JS logic and native operations.
Simplified Logic: In the legacy system, managing sequences of operations that involved native calls often required complex Promise chains or nested callbacks to handle the asynchronous nature of the Bridge. Synchronous JSI calls can simplify this logic, making code easier to write, read, and debug in scenarios where an immediate result from native code is needed before proceeding in JavaScript.
New Capabilities: JSI unlocks possibilities that were previously impractical or performed poorly. For example, JavaScript can synchronously query native state information needed for immediate UI rendering calculations, or complex C++ libraries (e.g., for high-performance computing or shared business logic) can be exposed directly to JS for instant invocation.
JSI represents the single most critical architectural innovation enabling the performance leap and enhanced capabilities of the New Architecture. The primary bottleneck in JS-Native communication within the legacy React Native architecture was unequivocally the Bridge. JSI directly tackles this limitation by replacing the indirect, asynchronous, serialization-dependent message passing system with one based on direct, synchronous-capable C++ function calls. Grasping the concept of JSI's synchronous potential is fundamental to appreciating the benefits offered by both TurboModules (for native functionality) and Fabric (for UI rendering).
JSI vs. The Bridge (Comparison)
Aspect
Legacy Bridge
JSI (New Architecture)
Key Difference
Communication
Indirect (Message Queue), Asynchronous
Direct (C++ Layer), Synchronous Capable
Synchronicity, Latency
Data Transfer
JSON Serialization/Deserialization (Overhead)
More Direct (Less Serialization Overhead)
Efficiency, Reduced Bottleneck
Performance
Slower (Async Latency, Serialization Bottleneck)
Significantly Faster (for many operations)
Speed, Responsiveness
Mechanism
Message Passing (JS -> Native)
Direct Function Calls (JS <-> C++ <-> Native)
Interaction Model
JS Interaction
Callbacks, Promises
Direct Method Calls (on Host Objects), Promises
Potential for Simpler Logic (Synchronous cases)

While TurboModules and Fabric provide higher-level abstractions, the introduction of a mandatory C++ layer via JSI subtly shifts the skillset potentially involved in deep React Native integration. Although Codegen aims to abstract away much of the direct JSI/C++ interaction for standard TurboModule/Fabric Component creation, developers venturing into highly custom JSI integrations, debugging complex cross-language issues, or optimizing performance at the lowest level might find themselves needing to understand or even write C++ code. This contrasts with the legacy system where proficiency in Java/Kotlin and Objective-C/Swift was often sufficient for native module development. It adds another potential layer of complexity for those pushing the boundaries of native integration.
Official Documentation Link Box
React Native - JSI Overview (Official Docs): https://reactnative.dev/docs/the-new-architecture/pillars-jsi
Blog Post: Under the hood of React Native's new architecture (Provides context): https://medium.com/@ospfranco/react-native-new-architecture-under-the-hood-of-the-new-renderer-fabric-4651789aae49 (Note: Find potentially more official/recent posts if available)
Hermes Engine - JSI: https://hermesengine.dev/docs/jsi/ (Hermes specific documentation on its JSI implementation)
Section 7: Bridging Native UI Components (Conceptual Overview)
Purpose: Why Bridge Native UI?
While React Native provides a rich set of core components (<View>, <Text>, <Image>, etc.) that render to native platform widgets, there are scenarios where developers need to incorporate native UI elements directly that have no direct equivalent or sufficient counterpart within the standard React Native library.
Examples include:
Embedding native map views (like MapKit on iOS or Google Maps on Android) with their full feature sets.
Integrating highly specialized, platform-specific video players or editors.
Displaying native advertising banners from third-party SDKs.
Using custom-built native views that involve complex drawing, unique gesture handling, or deep integration with platform frameworks.
Bridging Native UI Components allows developers to embed these native views directly within their React Native application's component hierarchy, manage their lifecycle, and communicate with them (passing properties down and receiving events up) from JavaScript.
Legacy Architecture Approach (UIManager, RCTViewManager - Brief Context)
In the legacy architecture, bridging native UI components involved several key pieces:
Native View Implementation: Creating the custom native view class (e.g., extending View or ViewGroup on Android, UIView on iOS).
ViewManager: Creating a corresponding manager class (e.g., extending SimpleViewManager<T> on Android, RCTViewManager on iOS). This manager was responsible for creating instances of the native view and exposing its properties (props) and events to React Native. Props were typically exposed using annotations (@ReactProp) or macros (RCT_EXPORT_VIEW_PROPERTY).
UIManager: On the JavaScript side, React Native's UIManager module was responsible for communicating with the native ViewManagers via the asynchronous Bridge. When a React Native component representing the native view was rendered or updated, UIManager would send messages across the Bridge instructing the native ViewManager to create the view or update its properties.
Communication: All communication—updating props, sending commands, receiving events—flowed through the asynchronous Bridge. This could lead to noticeable latency and synchronization issues, sometimes referred to as the "layout jump" problem, where the JS state and the native UI state could briefly diverge due to the Bridge's delay. Gesture handling that required tight coordination between native events and JS responses could also feel less responsive.
**
New Architecture: Fabric Components (Under the Hood)
The New Architecture introduces Fabric, React Native's new rendering system, which fundamentally changes how native UI components are integrated. Fabric Native Components are the modern way to bridge native UI.
Key concepts underpinning Fabric Components include:
JSI (JavaScript Interface): Just like TurboModules, Fabric relies heavily on JSI for communication. This enables more direct and potentially synchronous interaction between the JavaScript logic controlling the component and the native view itself. Prop updates and event dispatches can bypass the Bridge's serialization and queuing overhead.
Specification (Spec) File (TypeScript/Flow): Similar to TurboModules, the interface for a Fabric Native Component is defined in a JavaScript spec file using TypeScript or Flow. This spec explicitly declares the props the native component accepts from JavaScript and the events (callbacks, like onChange) it can emit back to JavaScript.
Codegen (Code Generation): The React Native Codegen tool processes this spec file. For Fabric Components, it generates:
C++ Shadow Node definitions: Fabric maintains a UI tree in C++, called the "Shadow Tree," which mirrors the React component tree. Codegen generates C++ classes representing the shadow nodes for the custom native component. These shadow nodes hold the component's props and layout information.
Native ViewManager interfaces: Similar to TurboModules, it generates interfaces that the native ViewManager implementation must conform to, ensuring type consistency for props and event handling.
Fabric Renderer: This is the core of the new rendering system. It uses JSI to communicate between JavaScript and the C++ Shadow Tree. When React updates a component, Fabric can efficiently update the corresponding C++ Shadow Node. Fabric then calculates the layout (using Yoga, also in C++) and orchestrates the creation and updating of the actual native views on the main thread based on the information in the Shadow Tree. This architecture allows for more efficient rendering, better prioritization of UI updates, and improved synchronization between the JS state and the native UI.
**
Fabric, by addressing the UI rendering and interaction bottlenecks inherent in the legacy UIManager/Bridge system, aims to deliver UI performance and responsiveness much closer to that of purely native applications. It completes the vision started by JSI and TurboModules, overhauling React Native's core architecture to eliminate the major performance limitations associated with the old bridge, thereby making React Native a more viable option for applications demanding high-performance, complex, or deeply integrated native UI elements.
Benefits of Fabric Components
Integrating native UI using Fabric Components offers significant advantages:
Performance: More efficient rendering pipeline. Prop updates and event handling benefit from JSI's lower latency, leading to smoother animations and more responsive interactions.
Synchronization: The architecture inherently provides better synchronization between the JavaScript state and the native UI, reducing issues like layout jumps. Fabric has mechanisms to ensure consistency between the JS and Native UI threads.
Type Safety: Codegen enforces type consistency for props and events between the JavaScript spec and the native implementation at build time.
Architectural Integration: Designed to work seamlessly with the other pillars of the New Architecture (JSI, TurboModules).
Development Workflow (Conceptual)
Creating a Fabric Native Component follows a pattern similar to TurboModules, but with a focus on UI:
Write the Spec: Define the component's props and event callbacks in a TypeScript (or Flow) spec file.
Configure Codegen: Set up the build to run Codegen for the Fabric component spec.
Run Codegen: Generate the C++ Shadow Node code and native ViewManager interfaces.
Implement Native View: Create the actual native UI component (Android View/ViewGroup, iOS UIView).
Implement Native ViewManager: Write the ViewManager code (Java/Kotlin, Objective-C/Swift) that creates instances of the native view and handles prop updates and event emissions, conforming to the Codegen-generated interfaces.
Implement C++ Shadow Node Logic (Optional but often needed): Sometimes, custom C++ logic is needed for the shadow node, especially for complex layout or state handling, although Codegen handles much of the basics.
Register & Integrate: Register the component and integrate its native code into the app build.
Similar to TurboModules, creating Fabric components is an advanced task. It requires not only understanding the Fabric architecture (Specs, Codegen, Shadow Nodes, JSI) but also solid expertise in native UI development on both Android (Views, ViewGroups, layout, drawing, touch events) and iOS (UIViews, AutoLayout, drawing, gesture recognizers). This arguably represents an even higher level of complexity than creating non-UI TurboModules, as it involves the intricacies of native rendering, layout, and user interaction. It is typically the domain of specialized library developers or teams with strong native skills who need to embed highly custom or platform-specific UI elements within a React Native application.
Background Bridge Note
For Native Android/iOS Developers: Creating a Fabric Component relates to building custom UI views (View/ViewGroup in Android, UIView in iOS) and exposing their configurable properties and callbacks. The Fabric architecture introduces the formal Spec + Codegen step to define the interface exposed to React Native. Communication relies on JSI and the C++ Shadow Tree, replacing the legacy Bridge/UIManager mechanism. The concept of a Shadow Tree, managed in C++, might be conceptually linked to virtual DOM ideas but is implemented natively for managing layout and view properties efficiently off the main UI thread where possible.
For Web Developers (React/Angular): Think of creating a Fabric Native Component as analogous to building a sophisticated React wrapper component around a complex, non-React UI element, like a specialized charting library instantiated via a plain DOM API, a Web Component, or content within an <iframe>. The Fabric Component acts as a bridge, allowing you to control this "external" UI element (the native view) using standard React props and receive events via callbacks. Fabric and JSI work together to make this integration much smoother and more performant than the legacy system allowed, aiming to make the bridged native component feel almost like a native React Native component in terms of responsiveness.
Legacy vs. New Architecture Native Integration Comparison
The following table summarizes the key differences between the legacy and New Architecture approaches for native integration:
Aspect
Legacy Architecture Method
New Architecture Method
Key Differences
JS-Native Calls
Bridge (Message Queue)
JSI (JavaScript Interface)
Performance: JSI is faster (direct C++).<br>Synchronicity: JSI allows sync calls.
Data Transfer
JSON Serialization/Deserialization
Direct C++ interaction (less serialization overhead)
Efficiency: JSI reduces data conversion bottleneck.
Native Module Logic
RCTBridgeModule (iOS)<br>ReactContextBaseJavaModule (Android)
TurboModules (Spec + Codegen + JSI)
Type Safety: Build-time checks via Spec/Codegen.<br>Loading: Lazy loading.
Native UI Bridging
UIManager<br>RCTViewManager (iOS)<br>ViewManager (Android)
Fabric Components (Spec + Codegen + JSI + Shadow Tree)
Rendering: More efficient pipeline.<br>Sync: Better JS/Native UI sync.
Type System
Runtime checks, Naming conventions, Manual conversion
Build-time via Codegen based on TypeScript/Flow Spec
Robustness: Errors caught earlier.<br>Reliability: Enforced contracts.
Architecture Core
Asynchronous Bridge
Synchronous-capable JSI + C++ Layer
Foundation: Performance, capabilities.

This table highlights the comprehensive nature of the New Architecture's improvements. By replacing the Bridge with JSI and introducing interface-driven development with Codegen for both TurboModules and Fabric Components, React Native aims to provide a more performant, reliable, and type-safe foundation for all forms of native integration.
Official Documentation Link Box
React Native - Fabric Native Components: https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components
React Native - Fabric Renderer: https://reactnative.dev/docs/the-new-architecture/pillars-fabric-renderer
React Native - Codegen (also applies here): https://reactnative.dev/docs/the-new-architecture/modules-codegen (Sections relevant to Fabric Components)
Legacy Native UI Components (Android - for context): https://reactnative.dev/docs/native-components-android
Legacy Native UI Components (iOS - for context): https://reactnative.dev/docs/native-components-ios
Section 8: Challenge 14: Research Native Module Alternatives
(Note: This section provides the context and framework for the challenge itself, which would typically be presented externally, e.g., via Microsoft Forms or a similar platform.)
Goal
The objective of this challenge is to encourage learners to think critically about problem-solving within the React Native ecosystem. Specifically, it aims to reinforce the understanding that while creating custom Native Modules (TurboModules/Fabric Components) is a powerful capability, it should be a carefully considered decision, not the immediate default for every complex task or platform interaction. Learners should actively research and evaluate alternative approaches before committing to the significant effort involved in custom native development.
Conceptual Basis for the Challenge
The challenge should prompt learners to analyze scenarios where a feature might initially seem to require custom native code. For each scenario, they should research and compare the feasibility, pros, and cons of using custom native modules versus several potential alternatives:
Pure JavaScript Libraries / Core APIs:
Description: Can the required functionality be achieved using only JavaScript, potentially leveraging existing React Native core APIs (Animated, LayoutAnimation, Fetch, etc.) or well-established, pure-JS community libraries (e.g., for state management, date manipulation, complex calculations)?
Pros: Maximum cross-platform code reuse, generally faster development cycle, leverages existing JS skills, no native build complexity.
Cons: Limited by JavaScript performance for CPU-intensive tasks, no direct access to platform-specific APIs or hardware features, potential for large JS bundle size impacting startup.
WebViews (react-native-webview):
Description: Can the functionality be implemented as a standard web page (HTML, CSS, JavaScript) and embedded within the React Native app using a WebView component? Communication between the React Native app and the WebView content is possible via message passing.
Pros: Ability to reuse existing web assets and libraries, access to the vast web development ecosystem (e.g., complex charting libraries, HTML canvas), potentially faster implementation for web-centric features.
Cons: Performance overhead compared to native components, communication bridge between RN and WebView can be complex to manage, UI might not feel fully native, offline capabilities require careful implementation (Service Workers), potential security considerations. \*\*
Expo SDK / Community Modules with Config Plugins:
Description: Before building custom code, thoroughly investigate if an existing module within the Expo SDK or a community module (usable via an Expo Config Plugin if in an Expo project) already provides the needed native functionality.
Pros: Leverages existing, often well-tested native code; significantly less development effort than building from scratch; integrates well with Expo workflow (if using Expo modules or Config Plugins).
Cons: Functionality is limited to what the module provides; reliant on third-party maintenance and updates; potential compatibility issues (though Expo SDK is generally reliable).
Server-Side Logic:
Description: Can computationally intensive tasks, complex business logic, or operations requiring access to large datasets be offloaded to a backend server? The React Native app would then interact with the server via network requests (e.g., REST API, GraphQL).
Pros: Removes heavy load from the client device, logic becomes platform-agnostic, potentially more scalable, easier to update logic without client releases.
Cons: Requires network connectivity, introduces network latency, requires backend infrastructure and development.
Other Cross-Platform Frameworks (Brief Mention):
Description: In rare cases where the core requirement heavily relies on extremely deep, complex, and performance-critical native integration for a specific feature, acknowledge that other development approaches might be considered for that specific feature (though React Native with its New Architecture is increasingly capable). This is less an alternative within RN and more a broader architectural consideration.
Framework for Analysis
The challenge should guide learners to evaluate these alternatives based on criteria relevant to real-world development decisions:
Development Effort & Complexity: How long will it take? What skills are required?
Performance Characteristics: How fast will it run? What is the impact on battery life or resource consumption?
Access to Native APIs/Features: Can it access the required device hardware or OS services?
User Experience (UX) & Look/Feel: Will it feel seamless and integrated? Will it match platform conventions?
Maintainability: How easy is it to update, debug, and manage long-term?
Platform Consistency: Will the solution work reliably and similarly across both iOS and Android?
Challenge Format Suggestion (Microsoft Forms)
Present 2-3 realistic development scenarios (e.g., "Implement a feature to scan and parse complex QR codes containing vCard data," "Build a highly interactive data visualization component showing real-time sensor readings," "Integrate a proprietary C++ signal processing library").
For each scenario, ask learners to:
Identify the most likely approaches (e.g., Custom TurboModule, Community Module, WebView, Pure JS).
Research potential existing libraries/modules for each viable approach.
Briefly discuss the pros and cons of each approach specifically for that scenario, using the analysis framework above.
Conclude which approach seems most appropriate and justify the choice.
This challenge serves a crucial pedagogical purpose. It moves beyond simply understanding how native modules work to understanding when and why they should (or should not) be used. By prompting learners to actively research and evaluate alternatives like WebViews, existing modules, or pure JS solutions, it cultivates a pragmatic approach to problem-solving. This helps prevent developers from defaulting to the most complex solution (custom native code) when simpler, faster, or more maintainable alternatives might exist. Developing this sense of trade-offs is essential for efficient and effective React Native development. Furthermore, reinforcing the power of Expo Config Plugins and the utility of WebViews equips learners with practical tools frequently used in modern React Native projects, particularly within the Expo ecosystem, enabling them to maximize productivity and leverage the framework's strengths.
Module 14 Conclusions
This module provided a comprehensive exploration of Native Modules in React Native, transitioning from fundamental concepts to the intricacies of the New Architecture. Key takeaways include:
Necessity: Native Modules are essential for bridging the gap between JavaScript and the underlying native platforms (iOS/Android), enabling access to platform APIs, optimizing performance-critical code, reusing existing native libraries, and integrating third-party SDKs.
Ecosystem Leverage: A vast ecosystem of pre-built modules exists (React Native core, Expo SDK, Community). Developers should prioritize finding existing solutions before considering custom development. Expo SDK modules, in particular, offer a streamlined and reliable way to access common native features within the Expo ecosystem. Tools like npx expo install and Config Plugins further simplify the integration of community modules in Expo projects.
Architectural Evolution: The shift from the legacy Bridge (asynchronous, serialization-heavy) to the New Architecture's JSI (synchronous-capable, direct C++ interaction) is fundamental. JSI enables significant performance improvements and new capabilities.
Modern Integration (New Architecture):
TurboModules: The modern standard for creating native functionality modules, leveraging JSI, TypeScript/Flow Specs, and Codegen for improved performance, type safety, and lazy loading.
Fabric Components: The modern standard for integrating native UI components, also using JSI, Specs, and Codegen, alongside the Fabric Renderer and C++ Shadow Tree for efficient rendering and better synchronization.
Complexity: Creating custom native modules (TurboModules or Fabric Components) remains a complex task requiring native platform development skills (Java/Kotlin, ObjC/Swift), understanding of native build systems, and familiarity with the New Architecture concepts (JSI, Codegen, potentially C++). It should be undertaken deliberately when existing solutions are insufficient.
Informed Decisions: Developers must weigh the trade-offs between different approaches (Pure JS, WebViews, Existing Modules, Custom Native Code, Server-Side Logic) based on factors like performance, complexity, maintainability, and required native access.
Understanding Native Modules, both how to use existing ones effectively and the concepts behind creating new ones (especially with the New Architecture), is crucial for developers aiming to build sophisticated, high-performance React Native applications that fully leverage the capabilities of mobile platforms.
