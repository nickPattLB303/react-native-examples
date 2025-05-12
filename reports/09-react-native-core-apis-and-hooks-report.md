Module 9: React Native Core APIs and Hooks
This module delves into essential React Native Application Programming Interfaces (APIs) and fundamental React Hooks that are pivotal for building robust and interactive mobile applications. Participants will gain a comprehensive understanding of how to interact with platform-specific features, manage screen dimensions for responsive layouts, display native alerts, and leverage core React Hooks for state management, side effects, and performance optimization. Furthermore, the module introduces the creation of custom Hooks to encapsulate and reuse logic effectively.
Target Versions for this Module:
React Native: 0.79+
Expo SDK: 52+
React: 18.x (as bundled with compatible React Native versions)
TypeScript: Version compatible with the project setup (e.g., as configured by Expo for SDK 52)
Section 1: Platform Module (Platform-Specific Code)
The Platform module in React Native is a crucial API that provides information about the platform on which the application is currently running. This enables developers to write platform-specific code, allowing for tailored user experiences and functionalities while maximizing code reuse in a cross-platform environment.
Core Concept: Detecting and Adapting to the Operating System
React Native applications run on different operating systems, primarily Android and iOS. These platforms often have distinct design guidelines, user interaction patterns, and available native capabilities. The Platform module allows the application to query the current operating system at runtime and conditionally execute code or render different components based on this information.
This capability is fundamental because it allows developers to:
Apply platform-specific styles to adhere to native look-and-feel.
Utilize platform-exclusive APIs or components.
Implement different interaction logic where platform conventions diverge.
The Platform API offers a more reliable method for determining the operating system compared to techniques like User-Agent sniffing commonly used in web development. User-Agent strings can be inconsistent or manipulated, leading to unreliable detection.1 In contrast, React Native's Platform module sources its information directly from the underlying native environment, providing a definitive and trustworthy indicator of the OS.
React Native facilitates platform-specific code through both runtime checks and build-time mechanisms. Runtime checks involve using Platform.OS or Platform.select directly in the JavaScript code. Build-time mechanisms include using platform-specific file extensions (e.g., myComponent.ios.tsx, myComponent.android.tsx), where the Metro bundler automatically picks the correct file for the target platform. Additionally, bundlers like Metro can perform "platform shaking" by statically analyzing Platform.OS checks. This process can remove dead code paths intended for other platforms from the final bundle, effectively turning some runtime checks into a build-time optimization for bundle size.3 This dual capability offers flexibility: minor adjustments can be handled with runtime checks, while significant structural differences can be managed with separate files, with potential for bundle optimization in both scenarios.
Official Documentation Link Box
React Native - Platform Specific Code: https://reactnative.dev/docs/platform-specific-code
React Native - Platform API: https://reactnative.dev/docs/platform 5
Platform.OS
The Platform.OS property is a string that indicates the operating system.
It returns 'ios' when the app is running on an iOS device.
It returns 'android' when the app is running on an Android device.
It can also return 'windows' or 'macos' for those respective platforms if supported, or 'web' if running in a web environment via a framework like Expo for Web.
Usage (TypeScript):

TypeScript


import { Platform, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios'? 50 : 20,
    backgroundColor: Platform.OS === 'web'? '#f0f0f0' : '#ffffff',
  },
  text: {
    fontSize: Platform.OS === 'android'? 18 : 20,
  },
});

const PlatformSpecificComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Current OS: {Platform.OS}</Text>
    {Platform.OS === 'ios' && <Text>This is an iOS specific message!</Text>}
  </View>
);

export default PlatformSpecificComponent;


In this example, the paddingTop style differs for iOS to account for the status bar, and fontSize is adjusted for Android.
Platform.Version
This property provides the version of the operating system.
On Android, Platform.Version is a number representing the Android API level (e.g., 33 for Android 13). 4
On iOS, Platform.Version is a string representing the OS version (e.g., "16.4"). 4
Usage (TypeScript):

TypeScript


import { Platform, Text } from 'react-native';

const OSVersionInfo = () => {
  let versionInfo: string = '';
  if (Platform.OS === 'ios') {
    const majorVersionIOS = parseInt(String(Platform.Version), 10);
    versionInfo = `iOS version: ${Platform.Version} (Major: ${majorVersionIOS})`;
    if (majorVersionIOS < 15) {
      console.log('This iOS version is older than 15.');
    }
  } else if (Platform.OS === 'android') {
    versionInfo = `Android API Level: ${Platform.Version}`;
    if (Platform.Version < 26) { // Android Oreo
      console.log('This Android API level is older than Oreo.');
    }
  } else {
    versionInfo = `OS: ${Platform.OS}, Version: ${Platform.Version}`;
  }
  return <Text>{versionInfo}</Text>;
};

export default OSVersionInfo;


Platform.constants
The Platform.constants property is an object containing various platform-specific constants. This allows for more fine-grained device-specific logic or analytics without needing a separate device information library for many common details.5 It's a rich source for device profiling.
Some key constants available under Platform.constants include 5:
isTesting (boolean): Indicates if the app is running in a test environment.
reactNativeVersion (object): Contains major, minor, patch, and optional prerelease numbers for the React Native version.
Android-specific:
Version (number): Android API level.
Release (string): Android OS release name (e.g., "12").
Serial (string): Hardware serial number.
Fingerprint (string): Build fingerprint.
Model (string): End-user-visible device name.
Brand (string): Consumer-visible brand.
Manufacturer (string): Device manufacturer.
uiMode (string): UI mode (e.g., 'normal', 'tv', 'car').
iOS-specific:
forceTouchAvailable (boolean): Indicates if 3D Touch is available.
interfaceIdiom (string): Interface type (e.g., 'phone', 'pad').
osVersion (string): OS version string.
systemName (string): OS name (e.g., "iOS").
Table: Key Platform.constants Properties
Constant Name
Type
Description
Platform(s)
isTesting
boolean
True if app is in a test environment
Both
reactNativeVersion
object
{major, minor, patch, prerelease?} of RN
Both
Version
number
Android API Level
Android
Release
string
Android OS Release (e.g., "12")
Android
Model
string
End-user visible device name
Android
Brand
string
Consumer-visible brand
Android
Manufacturer
string
Device manufacturer
Android
uiMode
string
UI mode (e.g., 'normal', 'tv')
Android
forceTouchAvailable
boolean
True if 3D Touch is available
iOS
interfaceIdiom
string
Interface type (e.g., 'phone', 'pad', 'vision')
iOS
osVersion
string
OS version string
iOS
systemName
string
OS name (e.g., "iOS")
iOS
isPad
boolean
True if the device is an iPad
iOS
isTV
boolean
True if the device is a TV (Apple TV or Android TV)
Both
isVision
boolean
True if the device is an Apple Vision Pro
iOS

Note: The availability of specific constants can vary slightly between React Native versions. Always consult the latest official documentation for the most current list.
Usage (TypeScript):

TypeScript


import { Platform, Text, View } from 'react-native';

const DeviceConstantsInfo = () => {
  return (
    <View>
      <Text>React Native Version: {Platform.constants.reactNativeVersion.major}.{Platform.constants.reactNativeVersion.minor}.{Platform.constants.reactNativeVersion.patch}</Text>
      {Platform.OS === 'android' && (
        <>
          <Text>Android Model: {Platform.constants.Model}</Text>
          <Text>Android Brand: {Platform.constants.Brand}</Text>
          <Text>Android UI Mode: {Platform.constants.uiMode}</Text>
        </>
      )}
      {Platform.OS === 'ios' && (
        <>
          <Text>iOS System Name: {Platform.constants.systemName}</Text>
          <Text>iOS Interface Idiom: {Platform.constants.interfaceIdiom}</Text>
          <Text>Is iPad: {Platform.isPad? 'Yes' : 'No'}</Text>
        </>
      )}
      <Text>Is TV: {Platform.isTV? 'Yes' : 'No'}</Text>
      <Text>Is Testing: {Platform.constants.isTesting? 'Yes' : 'No'}</Text>
    </View>
  );
};

export default DeviceConstantsInfo;


Platform.select(config)
The Platform.select method is a utility function that accepts an object with platform-specific keys (ios, android, native, default) and returns the value associated with the current platform. This is a clean way to define platform-specific values or even entire component configurations. 4
The resolution order is:
Platform-specific key (ios, android).
native (if the platform is iOS or Android and the specific key isn't found).
default (if no other key matches, or for other platforms like web).
Usage (TypeScript):

TypeScript


import { Platform, StyleSheet, Text, View } from 'react-native';
import ComponentIOS from './ComponentIOS'; // Assume these are defined
import ComponentAndroid from './ComponentAndroid';
import ComponentDefault from './ComponentDefault';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
   ...Platform.select({
      ios: {
        backgroundColor: 'silver',
      },
      android: {
        backgroundColor: 'lightgreen',
      },
      default: { // e.g., for web
        backgroundColor: 'lightblue',
      },
    }),
  },
  headerText: Platform.select({
    ios: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    android: {
      fontSize: 22,
      fontFamily: 'sans-serif-medium', // Example Android-specific font
    },
    default: {
      fontSize: 20,
    }
  }),
});

// Platform.select can return any type, including functions that return components
const PlatformSpecificComponentToRender = Platform.select({
  ios: () => ComponentIOS,
  android: () => ComponentAndroid,
  default: () => ComponentDefault,
})(); // Immediately invoke to get the component type

const SelectExample = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.headerText}>Platform Header</Text>
    {PlatformSpecificComponentToRender && <PlatformSpecificComponentToRender />}
  </View>
);

export default SelectExample;


This method is particularly useful for defining style objects or selecting which component to render without cluttering the JSX with multiple conditional checks.
"Under the Hood": How Platform Works
The Platform module is a native module. This means that its core logic for determining the OS and its properties resides in native code (Java/Kotlin for Android, Objective-C/Swift for iOS).
Initialization: When the React Native application starts, the native side gathers relevant platform information (like OS type, version, device model, etc.).
Exporting Constants: This information is then exposed to the JavaScript environment as constants. Platform.OS, Platform.Version, and the values within Platform.constants are essentially JavaScript representations of these native-derived values. 7
Access in JS: When JavaScript code accesses Platform.OS, it's reading a pre-populated value that was determined natively. There isn't a dynamic "check" to the native side for every access; rather, these are constants available in the JS context after the native module initializes.
For example:
On Android, native code might use android.os.Build.VERSION.SDK_INT for Platform.Version, android.os.Build.MODEL for Platform.constants.Model, etc. 9
On iOS, native code might use UIDevice.current.systemName for Platform.constants.systemName, UIDevice.current.systemVersion for Platform.Version, and UIDevice.current.userInterfaceIdiom to determine Platform.isPad or Platform.constants.interfaceIdiom. 9
This native sourcing ensures accuracy, as the information comes directly from the operating system's APIs.
Background Bridge Notes
Understanding how platform-specific code is handled in other development paradigms can provide valuable context:
Native Android Developers:
Platform.OS === 'android' is a given.
Platform.select for styles or components is analogous to using resource qualifiers (e.g., layout-sw600dp for tablets, values-v21 for API 21+ specific dimensions or styles). However, resource qualifiers are resolved at build/resource loading time, whereas Platform.select is a runtime JavaScript evaluation (though Metro's platform shaking can optimize some Platform.OS checks at build time 3).
Android Build Flavors allow for more extensive code and resource variations at build time, which is a more powerful version of what React Native's platform-specific file extensions (.android.js) achieve. 11
Platform.constants.Version (API level) is directly used in native code for conditional logic (if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {... }).
Native iOS Developers:
Platform.OS === 'ios' is a given.
Platform.select is akin to runtime checks like if UIDevice.current.userInterfaceIdiom ==.pad {... } or if #available(iOS 15, *) {... }.
Conditional compilation flags (e.g., #if os(iOS) or #if targetEnvironment(simulator)) in Swift/Objective-C provide build-time code exclusion, similar in concept to how Metro handles platform-specific file extensions or platform shaking. 3
Platform.constants.osVersion is similar to UIDevice.current.systemVersion.
Web Developers (React/Angular):
Platform.OS and Platform.select are analogous to User-Agent sniffing or feature detection (e.g., checking navigator.userAgent or window.matchMedia) for conditional rendering/logic on the web. However, Platform.OS is far more reliable as it's based on the actual native OS, not browser-reported strings which can be inaccurate or spoofed. 1
Platform-specific file extensions (.ios.js, .android.js) are conceptually similar to having different entry points or using conditional imports managed by a web bundler (like Webpack or Rollup) based on environment variables. Expo's platform shaking optimization for Platform.OS checks 3 is a build-time optimization akin to tree-shaking in web bundlers, removing unused code for other platforms.
Section 2: Dimensions API (Getting Screen Size)
React Native provides mechanisms to obtain the width and height of the application's window and the device's screen. This information is crucial for creating responsive layouts that adapt to various screen sizes, orientations, and form factors. The primary tools for this are the Dimensions API and the more modern useWindowDimensions hook. 15
Mobile devices exhibit a wide variety of screen sizes and aspect ratios. Applications must adapt to these variations to ensure a consistent and usable experience. Hardcoding dimensions is generally impractical and leads to poor UI on many devices.
Official Documentation Link Box
React Native - Dimensions API: https://reactnative.dev/docs/dimensions 15
React Native - useWindowDimensions Hook: https://reactnative.dev/docs/usewindowdimensions 15
React Native - Height and Width: https://reactnative.dev/docs/height-and-width 18
Dimensions.get('window') vs. Dimensions.get('screen')
The Dimensions API provides a get() method to retrieve dimension information. It can fetch details for either the 'window' or the 'screen'.
Dimensions.get('window'): This returns the dimensions (width and height) of the visible application window.
On Android, this typically excludes the space occupied by the status bar (if it's not translucent) and the bottom navigation bar (soft menu bar). 15
On iOS, this generally refers to the bounds of the main UIWindow, which is the area your application can draw into.
This is often the more relevant dimension for layout calculations as it represents the actual usable space for your application's UI.
Dimensions.get('screen'): This returns the dimensions (width and height) of the entire physical device screen.
This includes areas that might be occupied by system UI elements like status bars or navigation bars. 15
This might be useful for specific calculations that need to know the absolute screen size, but less so for typical UI layout.
The distinction between 'window' and 'screen' is particularly important on Android and in scenarios like multi-window mode. Using 'screen' dimensions for layout might lead to UI elements being obscured by system bars, whereas 'window' dimensions provide the actual usable space for the application.19 Developers must consciously choose the appropriate dimension based on their layout needs.
Returned Object Structure (ScaledSize):
Both Dimensions.get('window') and Dimensions.get('screen') return a ScaledSize object with the following properties 15:
width (number): The width of the dimension in density-independent pixels (also referred to as points).
height (number): The height of the dimension in density-independent pixels (points).
scale (number): The pixel density of the screen. This is the ratio of physical pixels to logical points (e.g., 2 for an @2x display, 3 for an @3x display).
fontScale (number): The user's preferred font scaling factor, as set in the device's accessibility settings.
"Under the Hood": How Dimensions are Determined
The Dimensions API retrieves these values from the native platform:
Android: It likely interacts with native Android APIs such as android.util.DisplayMetrics.
window dimensions might use Resources.getSystem().displayMetrics.widthPixels and Resources.getSystem().displayMetrics.heightPixels adjusted for the app's usable area (e.g., after accounting for status and navigation bars). 15
screen dimensions would refer to the total physical screen size.
Native values are typically in physical pixels and are then converted to density-independent pixels (dp/points) for React Native by dividing by DisplayMetrics.density. 20
iOS: It likely uses UIScreen.main.bounds for screen dimensions and the main UIWindow's bounds for window dimensions. These values are already provided in points by the iOS system. 23
Usage (TypeScript):

TypeScript


import { Dimensions, Text, View, StyleSheet } from 'react-native';

const windowDims = Dimensions.get('window');
const screenDims = Dimensions.get('screen');

const DimensionInfoComponent = () => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoText}>Window Width: {windowDims.width.toFixed(2)}, Height: {windowDims.height.toFixed(2)}</Text>
    <Text style={styles.infoText}>Window Scale: {windowDims.scale}, Font Scale: {windowDims.fontScale.toFixed(2)}</Text>
    <Text style={styles.infoText}>Screen Width: {screenDims.width.toFixed(2)}, Height: {screenDims.height.toFixed(2)}</Text>
    <Text style={styles.infoText}>Screen Scale: {screenDims.scale}, Font Scale: {screenDims.fontScale.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoContainer: { padding: 10 },
  infoText: { fontSize: 14, marginBottom: 5 },
});

export default DimensionInfoComponent;


Official Documentation Link Box
Dimensions get() method: Found within the main Dimensions API documentation. 15
Dimensions.addEventListener('change', handler)
The Dimensions API allows you to subscribe to changes in screen dimensions, which is particularly useful for handling device rotation or adapting to resizable windows on platforms like foldable devices or tablets in multi-window mode. 15
Event Name: The event to listen for is 'change'.
Handler Function: The callback function you provide will be invoked whenever a dimension property changes. This handler receives a DimensionsValue object, which has the structure: { window: ScaledSize, screen: ScaledSize }. 15
Subscription Management: Dimensions.addEventListener returns an EmitterSubscription object. It is crucial to call the remove() method on this subscription when the component unmounts to prevent memory leaks and potential errors.
Usage (TypeScript):

TypeScript


import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, EmitterSubscription, ScaledSize } from 'react-native';

interface ScreenDimensionDetails {
  window: ScaledSize;
  screen: ScaledSize;
}

const DynamicDimensionInfoComponent = () => {
  const = useState<ScreenDimensionDetails>({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const handleChange = ({ window, screen }: ScreenDimensionDetails) => {
      console.log('Dimensions changed:', { window, screen });
      setDimensions({ window, screen });
    };

    // Note: The type for the subscription can vary slightly based on RN versions or if using older types.
    // EmitterSubscription is common.
    const subscription: EmitterSubscription | undefined = Dimensions.addEventListener('change', handleChange as any); // Using 'as any' if type mismatch with older RN versions

    return () => {
      // Ensure subscription exists and has a remove method before calling
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
      // For more modern versions, subscription?.remove() is cleaner if types allow
      // Dimensions.removeEventListener('change', handleChange); // Older way, now remove on subscription
    };
  },);

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Current Window Width: {dimensions.window.width.toFixed(2)}</Text>
      <Text style={styles.infoText}>Current Window Height: {dimensions.window.height.toFixed(2)}</Text>
      {/* Display other dimension info as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { padding: 10, backgroundColor: '#e0e0e0' },
  infoText: { fontSize: 14, marginBottom: 5 },
});

export default DynamicDimensionInfoComponent;


There have been reports of Dimensions.addEventListener behaving unexpectedly with tools like Expo Go, particularly concerning the initial values or timing of updates during orientation changes.26 Using the useWindowDimensions hook is generally recommended for new component development.
Official Documentation Link Box
Dimensions addEventListener() method: Found within the main Dimensions API documentation. 15
useWindowDimensions Hook
The useWindowDimensions hook is the preferred method for accessing window dimensions within React components. It automatically updates its returned values (width, height, scale, fontScale) and triggers a re-render in the component whenever the application window's dimensions change, such as due to device rotation or resizing. 15
Advantages over Dimensions.get() + addEventListener:
Automatic Updates: Handles subscription to dimension changes internally.
Declarative: Aligns better with React's declarative programming paradigm.
Simplicity: Eliminates the boilerplate code required for manual event listeners, state management (useState/useEffect), and cleanup.
The useWindowDimensions hook effectively encapsulates the logic of listening to dimension changes and managing state, providing a cleaner and more React-idiomatic way to work with dynamic screen sizes.
Usage (TypeScript):

TypeScript


import React from 'react';
import { useWindowDimensions, Text, View, StyleSheet } from 'react-native';

const WindowDimensionsHookExampleComponent = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  // Example: Adjust layout based on width
  const isTablet = width > 768;

  return (
    <View style={[styles.dynamicContainer, { width: width * 0.8, height: height * 0.5 }]}>
      <Text style={styles.infoText}>Window Width: {width.toFixed(2)}</Text>
      <Text style={styles.infoText}>Window Height: {height.toFixed(2)}</Text>
      <Text style={styles.infoText}>Scale: {scale}, Font Scale: {fontScale.toFixed(2)}</Text>
      {isTablet && <Text style={styles.infoText}>Layout: Tablet</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  dynamicContainer: {
    padding: 10,
    backgroundColor: '#d0efff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
  },
  infoText: { fontSize: 14, marginBottom: 5 },
});

export default WindowDimensionsHookExampleComponent;


Official Documentation Link Box
useWindowDimensions Hook Documentation: https://reactnative.dev/docs/usewindowdimensions 24
Units in React Native: Density-Independent Pixels (dp/points), scale, fontScale
Understanding how React Native handles units is fundamental for creating consistent UIs across diverse devices.
Density-Independent Pixels (dp/points): All layout dimensions (like width, height, margin, padding) in React Native are specified as unitless numbers. These numbers represent density-independent pixels, often referred to as "points". The goal is that a component defined with, for example, width: 100 should appear roughly the same physical size on a low-density screen as on a high-density screen. 11
On Android, this unit directly corresponds to dp (density-independent pixels), where 1dp is equivalent to one physical pixel on a 160 DPI (dots per inch) screen. 22
On iOS, this unit is equivalent to points. 23
scale (Pixel Ratio): The scale property, available from both Dimensions.get() and useWindowDimensions(), indicates the device's pixel density. It's the ratio of physical pixels to logical density-independent points. For instance:
scale: 1 means 1 point = 1 physical pixel (e.g., mdpi Android devices).
scale: 2 means 1 point = 2x2 physical pixels (e.g., iPhone Retina displays, xhdpi Android).
scale: 3 means 1 point = 3x3 physical pixels (e.g., iPhone Plus/Max models, xxhdpi Android). 30 React Native (or the underlying native platform) uses this scale factor to convert the logical points defined in styles into the correct number of physical pixels for rendering on the device's screen. While React Native's unitless points system abstracts away direct pixel manipulation for layout, understanding scale is crucial for providing appropriately sized image assets (e.g., @1x, @2x, @3x images) to ensure sharpness on high-density displays.
fontScale: This property reflects the user's preferred font scaling factor, typically configured in the device's accessibility settings. When defining font sizes in styles, React Native automatically applies this scaling factor. Developers should be mindful of this to ensure text remains legible and layouts don't break when users adjust their font size preferences. 30
React Native's approach aims to simplify responsive design by providing an abstraction layer over native platform density handling. However, for pixel-perfect asset rendering, awareness of the scale factor remains important.
Background Bridge Notes
Native Android Developers:
React Native's unitless points are directly analogous to Android's dp. The scale factor from Dimensions is equivalent to DisplayMetrics.density. fontScale mirrors Configuration.fontScale. 20
Dimensions.get('window').height typically excludes system bars, similar to the usable space within an Activity's content view. Dimensions.get('screen').height is closer to the raw DisplayMetrics.heightPixels. 19
Native iOS Developers:
React Native's points are identical to iOS points. The scale factor corresponds to UIScreen.scale (@1x, @2x, @3x). 23
Dimensions.get('window').height usually refers to the UIWindow bounds, while Dimensions.get('screen').height aligns with UIScreen.main.bounds.height.
Web Developers (React/Angular):
React Native's points differ from web CSS px. Web px are also an abstraction but behave differently regarding device pixel ratios. React Native's system is more aligned with native mobile platform density independence. 31
Core React Native styling lacks direct equivalents to em, rem, vw, or vh, though percentage-based dimensions are supported relative to the parent. fontScale offers a concept similar to user-adjustable font sizes, which rem can facilitate on the web.
Table: Comparison of Sizing Units Across Platforms
Unit Type
React Native
Native Android
Native iOS
Web CSS
Primary Layout Unit
Density-Independent Points (unitless)
dp (Density-Independent Pixels)
Points
px (CSS Pixels)
Text Scaling Unit
Points (implicitly respects fontScale)
sp (Scale-Independent Pixels)
Points (implicitly respects Dynamic Type)
em, rem, pt
Pixel Density Ratio
Dimensions.scale / useWindowDimensions().scale
DisplayMetrics.density
UIScreen.scale
window.devicePixelRatio
Viewport Width/Height
Percentage of parent, or Dimensions.get('window').width/height
match_parent, ConstraintLayout percentages
Auto Layout constraints, GeometryReader
vw, vh, % (relative to viewport/parent)

This table helps bridge the understanding for developers coming from different backgrounds, clarifying how React Native's unit system relates to familiar concepts, thereby aiding in the creation of robust responsive designs. 11
Section 3: Alert API (Displaying Native Alerts)
The Alert API in React Native provides a straightforward way to display standard, native alert dialogs to the user. These dialogs are modal, meaning they interrupt user interaction with the rest of the app until dismissed. They are typically used for conveying important messages, asking for confirmations, or, on iOS, prompting for simple text input. 35
Using native alerts is often preferred for critical notifications because they are familiar to users and integrate seamlessly with the platform's look and feel, providing a more trustworthy and intuitive experience than custom JavaScript-based modals for these specific use cases.
Official Documentation Link Box
React Native - Alert API: https://reactnative.dev/docs/alert 35
Alert.alert(title, message?, buttons?, options?)
This is the primary method for displaying an alert dialog.
title (string): The main title of the alert dialog. If null or an empty string is passed, the title area might be hidden or appear empty, depending on the platform.
message (string, optional): An optional descriptive message displayed below the title.
buttons (AlertButton, optional): An array of button configuration objects. If not provided, a default "OK" button is usually displayed.
Each AlertButton object can have the following properties:
text (string): The text label displayed on the button.
onPress (function, optional): A callback function that is executed when the button is tapped.
style (string, iOS only): Specifies the button's style on iOS. Can be:
'default': Standard button style.
'cancel': Indicates a cancel action, often resulting in a visually distinct button (e.g., bolder font) and specific placement.
'destructive': Indicates an action that may destroy data, typically rendering the button text in red. 35
isPreferred (boolean, iOS only): If true, this button is marked as the preferred action, which may result in it being visually emphasized (e.g., bolded). 35
options (AlertOptions, optional): An object for additional, platform-specific alert configurations.
cancelable (boolean, Android only): If set to true, the alert dialog can be dismissed by tapping outside of its boundaries or by pressing the hardware back button on Android. The default is typically false, meaning the user must interact with one of the alert's buttons. 35
onDismiss (function, Android only): A callback function that is fired when the alert is dismissed, for example, by tapping outside (if cancelable is true) or pressing the back button. This is not called if a button's onPress is triggered. 35
userInterfaceStyle (string, iOS only): Allows specifying the interface style for the alert, such as 'light' or 'dark', overriding the system's current setting for this specific alert. 35
Platform Differences in Behavior and Appearance:
A key consideration when using Alert.alert is that its behavior and appearance can vary significantly between iOS and Android. Developers must either account for these differences with platform-specific logic or design alerts that are acceptable on both platforms.
Button Limits: iOS can display any number of buttons, typically arranged vertically if many. Android, however, is generally limited to a maximum of three buttons, which correspond to positive, negative, and neutral actions. 35
1 button on Android: Positive action.
2 buttons on Android: Negative, Positive (e.g., "Cancel", "OK").
3 buttons on Android: Neutral, Negative, Positive (e.g., "Later", "Cancel", "OK").
Button Styling: The style ('cancel', 'destructive') and isPreferred properties for buttons are iOS-specific and will be ignored on Android. Android button appearance is more standardized by the OS.
Dismissal Behavior: As noted, cancelable and onDismiss are Android-specific options. iOS alerts are typically dismissed only by tapping one of their action buttons. 37
"Under the Hood": Native Implementation
The Alert API is a native module. When Alert.alert() is called from JavaScript:
iOS: The JavaScript call is bridged to native iOS code, which then instantiates and configures a UIAlertController with a style of UIAlertController.Style.alert. The provided title, message, and buttons are used to configure the UIAlertController. Each button in the buttons array maps to a UIAlertAction. 37
Android: The call is bridged to native Android code, which constructs an android.app.AlertDialog (or often an androidx.appcompat.app.AlertDialog for consistent styling). The title, message, and buttons are set using methods like setTitle(), setMessage(), setPositiveButton(), setNegativeButton(), and setNeutralButton(). 37 When a user interacts with a button on the native alert, the native platform triggers the corresponding action, which then sends an event back to the JavaScript side to execute the onPress callback associated with that button.
Usage (TypeScript):

TypeScript


import { Alert, Platform } from 'react-native';

const showCrossPlatformAlert = () => {
  Alert.alert(
    'Important Notice',
    'Please confirm your choice to continue.',
    :),
    ],
    {
      cancelable: Platform.OS === 'android'? true : false, // Only applicable on Android
      onDismiss: Platform.OS === 'android'? 
        () => console.log('Alert dismissed by tapping outside or back button (Android)') 
        : undefined,
      userInterfaceStyle: Platform.OS === 'ios'? 'dark' : undefined, // iOS only option
    }
  );
};

// To trigger the alert:
// <Button title="Show Alert" onPress={showCrossPlatformAlert} />


The Alert API's reliance on native components means that testing interactions with these alerts (especially input prompts) often cannot be done with JavaScript-based testing libraries like React Native Testing Library. These libraries operate on the React component tree. Interacting with native alert dialogs typically requires End-to-End (E2E) testing tools such as Detox or Maestro, which can interact with the actual native UI elements, or by mocking the Alert module during unit/integration tests.42
It's also important to recognize that the Alert API is designed for simple, modal interactions. For more complex dialogs requiring custom layouts, diverse input types, or non-modal behavior, developers should create custom modal components (e.g., using the Modal core component) or utilize third-party dialog libraries.
Table: Alert.alert() Button Configuration Differences (iOS vs. Android)
Feature
iOS
Android
Notes
Max Buttons
Unlimited (practically limited by UI)
3 (Positive, Negative, Neutral)
Android orders buttons specifically (e.g., Neutral, Negative, Positive).
style: 'cancel'
Yes (specific behavior & placement)
Ignored directly; maps to Negative/Neutral based on button position and count.


style: 'destructive'
Yes (renders text in red)
Ignored


isPreferred
Yes (visually emphasizes button)
Ignored



This table summarizes key button configuration differences, helping developers design alerts that function effectively on both platforms.35
Alert.prompt(title, message?, callbackOrButtons?, type?, defaultValue?, keyboardType?, options?) (iOS-only)
This method displays an alert dialog that includes one or more text input fields, allowing the user to enter text. This functionality is exclusive to iOS. 35
title (string): The dialog's title.
message (string, optional): An optional message displayed above the input field(s).
callbackOrButtons (function or AlertButton, optional):
If a function is provided, it's called with the entered text (or an array of texts if multiple inputs are configured via type) when the user taps the "OK" (or equivalent positive) button.
If an array of AlertButton objects is provided, it configures the buttons just like in Alert.alert(). The onPress handler for buttons will need to handle the input values, which are not directly passed to button onPress handlers in this configuration. Accessing the input values typically requires using the callback function pattern or managing state outside if using the button array.
type (AlertType, optional): Configures the appearance and behavior of the text input field(s). Common values 35:
'default': Standard alert with no input fields (though prompt implies input, this might be a fallback or error).
'plain-text': A single plain text input field.
'secure-text': A single secure text input field (for passwords, characters are masked).
'login-password': Two text input fields: one for a login/username (plain text) and one for a password (secure text).
defaultValue (string, optional): The default text to pre-fill in the input field. If type is 'login-password', this might apply to the first field, or an array of defaults might be expected (consult specific RN version behavior).
keyboardType (string, optional): Specifies the keyboard type for the input field(s) (e.g., 'numeric', 'email-address'). Uses the same values as the TextInput keyboardType prop.
options (AlertOptions, optional): Similar to Alert.alert options, primarily userInterfaceStyle for iOS.
"Under the Hood" (iOS):
Alert.prompt() on iOS maps to a UIAlertController with style .alert. The text input fields are added to the alert controller using its addTextField(configurationHandler:) method. 40
Usage (TypeScript):

TypeScript


import { Alert, Platform, Button } from 'react-native';

const showIOSInputPrompt = () => {
  if (Platform.OS === 'ios') {
    Alert.prompt(
      'Enter Your Name',
      'Please provide your first name:',
      (text) => console.log('User entered:', text), // Simple callback for single input
      'plain-text', // Type of input
      'John Doe', // Default value
      'default' // Keyboard type
    );
  } else {
    Alert.alert('Not Supported', 'Input prompts are only available on iOS via Alert.prompt.');
  }
};

const showIOSLoginPrompt = () => {
  if (Platform.OS === 'ios') {
    Alert.prompt(
      'Login Required',
      'Enter username and password',
      if type is 'login-password'
            if (Array.isArray(credentials)) {
              console.log('Username:', credentials, 'Password:', credentials);
            } else {
              console.log('Login input:', credentials); // Fallback for single input types
            }
          },
          isPreferred: true,
        }
      ],
      'login-password', // Type for two input fields
      // For 'login-password', defaultValue can be tricky.
      // It might apply to the first field or require specific handling.
      // Check React Native documentation for precise behavior with multiple fields.
      // undefined, // defaultValue
      // undefined, // keyboardType
    );
  } else {
    Alert.alert('Not Supported', 'Login prompts are only available on iOS via Alert.prompt.');
  }
};

// To trigger:
// <Button title="Show Input Prompt (iOS)" onPress={showIOSInputPrompt} />
// <Button title="Show Login Prompt (iOS)" onPress={showIOSLoginPrompt} />


Table: Alert.prompt() (iOS) type Options
Type Value
Description
Input Field(s)
'default'
Standard alert, typically no input fields (behavior may vary if misused with prompt).
0 (or 1 if RN forces it)
'plain-text'
Single plain text input field.
1
'secure-text'
Single secure text input field (e.g., for passwords, characters masked).
1
'login-password'
Two text input fields: one for login (plain), one for password (secure).
2

This table clarifies the input configurations available with Alert.prompt on iOS.35
Background Bridge Notes
Native Android Developers:
Alert.alert() is a JavaScript wrapper around android.app.AlertDialog.Builder. The button limitations (max 3) and cancelable/onDismiss options directly map to AlertDialog capabilities. 38
Android lacks a direct system-level equivalent to Alert.prompt() with built-in text fields within the standard AlertDialog. Creating such a prompt natively would require a custom dialog layout containing EditText views.
Native iOS Developers:
Alert.alert() maps to UIAlertController with style .alert. Button styles (default, cancel, destructive) and the isPreferred flag map to UIAlertAction.Style and properties. 37
Alert.prompt() also maps to UIAlertController (style .alert) and utilizes the addTextField(configurationHandler:) method to incorporate input fields. 40
Web Developers (React/Angular):
Alert.alert() is functionally similar to window.alert() for simple messages and window.confirm() for two-button choices, but offers more button customization and native styling. 42
Alert.prompt() is conceptually similar to window.prompt(), but again, with richer button configuration and native iOS presentation.
Unlike web alert(), confirm(), and prompt(), which are synchronous and block JavaScript execution, React Native's Alert API calls are asynchronous. The onPress, onDismiss (Android), or prompt callback functions are invoked when the user interacts with the native dialog.
Exercise 9.1: Using the Alert API (Expo Snack)
Objective: Create a simple application that demonstrates the use of the Alert.alert() method to display different types of alerts.
Instructions:
Open a new Expo Snack or create a new file in your local Expo project.
Import Alert, Button, View, StyleSheet, and Platform from react-native.
Create a functional component, for example, AlertDemo.
Inside AlertDemo, implement three functions, each triggering a different alert:
showSimpleAlert(): Displays an alert with a title, a message, and a single "OK" button that logs "OK Pressed" to the console.
showTwoButtonAlert(): Displays an alert with a title, a message, a "Cancel" button (logs "Cancel Pressed"), and an "OK" button (logs "OK Pressed").
For iOS, make the "Cancel" button have style: 'cancel'.
showAndroidCancelableAlert(): Displays an alert (only if Platform.OS === 'android') with a title, message, and an "OK" button. Configure this alert to be cancelable: true and provide an onDismiss callback that logs "Alert dismissed via outside tap/back button".
In the AlertDemo component's JSX, render three Button components. Each button should call one ofthe functions created above when pressed.
Add some basic styling for the View container and Button components if desired.
Run the app on both an iOS and Android simulator/device (or use the Expo Snack web previews) to observe the behavior of each alert, paying attention to platform differences.
Example Snippet (Conceptual):

TypeScript


// Inside your AlertDemo component

const showSimpleAlert = () => {
  Alert.alert('Info', 'This is a simple informational alert.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
};

const showTwoButtonAlert = () => {
  Alert.alert(
    'Confirmation',
    'Do you want to proceed?',
   
  );
};

const showAndroidCancelableAlert = () => {
  if (Platform.OS === 'android') {
    Alert.alert(
      'Android Special',
      'This alert can be dismissed by tapping outside.',
      [{ text: 'Got it', onPress: () => console.log('Got it Pressed') }],
      {
        cancelable: true,
        onDismiss: () => console.log('Android alert dismissed (not via button)'),
      }
    );
  } else {
    Alert.alert('Android Only Feature', 'This specific alert configuration is for Android.');
  }
};

return (
  <View style={styles.container}>
    <Button title="Show Simple Alert" onPress={showSimpleAlert} />
    <Button title="Show Two-Button Alert" onPress={showTwoButtonAlert} />
    <Button title="Show Android Cancelable Alert" onPress={showAndroidCancelableAlert} />
  </View>
);


This exercise allows learners to practically apply the Alert API, observe its behavior, and understand how to handle some of its platform-specific options.
Section 4: Core React Hooks Recap (useState, useEffect, useContext)
Before diving into more specialized React Native APIs and advanced Hooks, it's crucial to have a solid understanding of the foundational Hooks provided by React: useState, useEffect, and useContext. These Hooks are the building blocks for managing state, handling side effects, and sharing data within functional components, which are the standard in modern React Native development. 44
Rules of Hooks (Recap):
It is paramount to remember the two fundamental rules of Hooks 45:
Only Call Hooks at the Top Level: Hooks must be called at the top level of your React function components or custom Hooks. They should not be called inside loops, conditions, or nested functions. This ensures Hooks are called in the same order each time a component renders, which is critical for React to correctly preserve the state of Hooks between multiple useState and useEffect calls.
Only Call Hooks from React Functions: Hooks should only be called from React function components or from custom Hooks. They should not be called from regular JavaScript functions or class components.
Adherence to these rules is enforced by the eslint-plugin-react-hooks ESLint plugin, which is typically included in React Native projects.
Official Documentation Link Box
React - Hooks Overview: https://legacy.reactjs.org/docs/hooks-overview.html 44 (Note: Link to legacy docs, prefer newer react.dev if available for general concepts)
React - Rules of Hooks: https://react.dev/reference/rules/rules-of-hooks 45
useState<S>(initialState: S | (() => S)):
The useState Hook allows functional components to declare and manage local state. 46
Declaration: It's called with an initial state value and returns an array containing two elements:
The current state value.
A function to update this state value (often called the "setter" function).
TypeScript
import React, { useState } from 'react';

const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('Guest');
const [user, setUser] = useState<{ id: number; username: string } | null>(null);


Initial State:
The argument passed to useState is the initialState. This value is used only during the first render.
Lazy Initialization: If the initial state is computationally expensive to create, you can pass a function (an "initializer function") to useState. This function will only be executed during the initial render. 46
TypeScript
const = useState(() => {
  // computeExpensiveInitialState()
  return { value: 42 };
});


Updating State:
The setter function (e.g., setCount) is used to update the state. When called, it schedules a re-render of the component with the new state value.
Functional Updates: When the new state depends on the previous state, it's crucial to use the functional update form. This form receives the previous state as an argument and returns the new state. This avoids issues related to stale closures, especially when updates are batched or asynchronous. 46
TypeScript
// Correct way to increment based on previous state
setCount(prevCount => prevCount + 1);

// Incorrect if multiple calls are batched or in closures:
// setCount(count + 1); // 'count' might be stale here
The importance of functional updates stems from how React processes state updates. If multiple setCount(count + 1) calls occur within the same event handler or effect, count might refer to its value at the beginning of that render, not the most recently updated value from a previous setCount call in the same batch. The functional update setCount(c => c + 1) ensures that each update is based on the actual latest state queued by React.
Immutability: When updating state that holds objects or arrays, it's essential to treat state as immutable. Always create a new object or array instance instead of directly mutating the existing one. Use the spread syntax (...) or array methods like map, filter, or concat that return new arrays. 46
TypeScript
interface UserProfile { name: string; age: number; preferences: { theme: string }; }
const [profile, setProfile] = useState<UserProfile>({
  name: 'Alex',
  age: 30,
  preferences: { theme: 'dark' }
});

const updateTheme = (newTheme: string) => {
  setProfile(prevProfile => ({
   ...prevProfile, // Spread existing profile properties
    preferences: {
     ...prevProfile.preferences, // Spread existing preferences
      theme: newTheme, // Update only the theme
    },
  }));
};

const [items, setItems] = useState<string>(['apple', 'banana']);
const addItem = (newItem: string) => {
  setItems(prevItems => [...prevItems, newItem]); // Create new array
};

If you directly mutate an object or array in state (e.g., profile.age = 31; setProfile(profile);), React's shallow comparison mechanism for detecting state changes (Object.is) might not recognize that the state has changed because the object/array reference remains the same. This can lead to the component not re-rendering as expected.
Official Documentation Link Box
React - useState Hook:(https://react.dev/reference/react/useState) 46
useEffect(setup: () => (void | (() => void)), dependencies?: React.DependencyList)
The useEffect Hook allows you to perform side effects in function components. Side effects are operations that interact with the "outside world" from your component, such as data fetching, setting up subscriptions (e.g., event listeners, timers), or manually changing the DOM. 48
setup function: This function contains the code for your side effect. It runs after every completed render by default (unless controlled by the dependency array).
Cleanup Function (Optional): The setup function can optionally return another function. This "cleanup function" runs before the component unmounts, and also before the effect runs again if its dependencies have changed. It's crucial for preventing memory leaks, for example, by unsubscribing from event listeners, clearing timers, or cancelling network requests. 48
dependencies array (Optional): This array controls when the setup function (and its corresponding cleanup) is re-executed.
If omitted (undefined): The effect runs after every render of the component. This is often not desired as it can lead to performance issues or infinite loops if the effect itself triggers a re-render.
Empty array (``): The effect runs only once after the initial render (component mount), and the cleanup function runs only when the component unmounts. This is suitable for one-time setup tasks.
Array with values ([dep1, dep2,...]): The effect runs after the initial render and then again only if any of the values in the dependency array have changed since the last render. React uses Object.is comparison for dependencies.
The dependency array is the most critical and often misunderstood part of useEffect. Incorrectly specified dependencies can lead to stale closures (where the effect function uses outdated values of props or state because those values were not listed as dependencies) or infinite loops (where the effect updates a value that is also in its dependency array, causing the effect to run again). 48
Common Use Cases:
Data Fetching:
TypeScript
import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

interface Post { id: number; title: string; body: string; }

const PostDisplay = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // console.log(`Effect triggered for postId: ${postId}`);
    setIsLoading(true);
    setError(null);

    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (e) {
        setError(e instanceof Error? e : new Error('Failed to fetch post'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    // Example cleanup: if fetchPost returned an AbortController, you could abort it here.
    return () => {
      // console.log(`Cleaning up effect for postId: ${postId}`);
      // E.g., abortController.abort();
    };
  }, [postId]); // Dependency: re-run effect if postId changes

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!post) return <Text>No post found.</Text>;

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
};
export default PostDisplay;


Subscribing to Events:
TypeScript
import React, { useState, useEffect } from 'react';
import { AppState, Text } from 'react-native';

const AppStateLogger = () => {
  const = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      console.log('AppState changed to', nextAppState);
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    console.log('AppState listener added');

    return () => {
      subscription.remove();
      console.log('AppState listener removed');
    };
  },); // Empty dependency array: run once on mount, cleanup on unmount

  return <Text>Current AppState: {appState}</Text>;
};
export default AppStateLogger;


Official Documentation Link Box
React - useEffect Hook: https://react.dev/reference/react/useEffect 48
useContext<T>(context: React.Context<T>): T
The useContext Hook provides a way to consume values from React Context. Context allows you to pass data through the component tree without having to pass props down manually at every level (prop drilling). 51
Creating Context: First, a context object is created using React.createContext(). This function accepts an optional default value, which is used if a component consuming the context does not find a matching Provider above it in the tree.
TypeScript
import React, { createContext } from 'react';

interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
}

const defaultTheme: AppTheme = {
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
};

export const ThemeContext = createContext<AppTheme>(defaultTheme);


Providing Context: The <Context.Provider> component is used to wrap a part of the component tree that needs access to the context value. It accepts a value prop, which is the data to be shared.
TypeScript
// In a higher-level component, e.g., App.tsx
import { ThemeProvider, ThemeContext } from './ThemeContext'; // Assuming ThemeContext is exported

const App = () => {
  const customTheme = { primaryColor: 'green', secondaryColor: 'lightgrey' };
  return (
    <ThemeContext.Provider value={customTheme}>
      {/*... rest of the app components... */}
      <MyThemedButton />
    </ThemeContext.Provider>
  );
};


Consuming Context with useContext: Inside any functional component that is a descendant of the Provider, useContext can be called with the context object to get the current context value.
TypeScript
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import the context object

const MyThemedButton = () => {
  const theme = useContext(ThemeContext); // Consumes the value from the nearest ThemeContext.Provider

  return (
    <View style={{ backgroundColor: theme.primaryColor, padding: 10 }}>
      <Text style={{ color: theme.secondaryColor }}>Themed Button</Text>
    </View>
  );
};


Updating Context Value: Context itself doesn't manage state. To make context values dynamic, you typically combine the Provider with useState or useReducer in the component that renders the Provider. Changes to the value prop of the Provider will cause all consuming components to re-render with the new context value.
TypeScript
// ThemeProvider.tsx
import React, { useState, createContext, ReactNode, useContext } from 'react';

interface Theme {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const defaultThemeContextState: Theme = {
  mode: 'light',
  toggleMode: () => console.warn('ThemeProvider not found'),
};

export const ThemeContext = createContext<Theme>(defaultThemeContextState);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light'? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext); // Custom hook for convenience
Then, in a component:
TypeScript
// MyScreen.tsx
import { useAppTheme } from './ThemeProvider';
import { View, Text, Button } from 'react-native';

const MyScreen = () => {
  const { mode, toggleMode } = useAppTheme();
  return (
    <View style={{ flex: 1, backgroundColor: mode === 'light'? '#FFF' : '#222' }}>
      <Text style={{ color: mode === 'light'? '#000' : '#FFF' }}>Current Mode: {mode}</Text>
      <Button title="Toggle Theme" onPress={toggleMode} />
    </View>
  );
};
While useContext greatly simplifies the problem of prop drilling, it's important to note that any component consuming a context will re-render if any part of the context value object changes, even if the component doesn't directly use the changed part. This can lead to performance considerations, often addressed by splitting contexts into more granular pieces or memoizing context values with useMemo.
Official Documentation Link Box
React - useContext Hook: https://react.dev/reference/react/useContext 51
Background Bridge Notes (for useEffect)
Mapping useEffect to traditional lifecycle methods from other platforms can help bridge conceptual gaps:
Native Android Developers:
useEffect(() => { /* effect */ },) (runs once on mount): Conceptually similar to performing setup in Activity.onCreate() or Fragment.onViewCreated().
useEffect(() => { return () => { /* cleanup */ } },) (cleanup on unmount): Analogous to cleanup logic in Activity.onDestroy() or Fragment.onDestroyView().
useEffect(() => { /* effect */ }, [dep]) (runs when dependencies change): This is more declarative than imperative lifecycle methods. It's akin to observing LiveData or other state holders and reacting to their changes, but useEffect ties these reactions directly to the component's render cycle and its declared data dependencies. 11
Native iOS Developers:
useEffect(() => { /* effect */ },): Similar to setup code in UIViewController.viewDidLoad() or viewWillAppear().
useEffect(() => { return () => { /* cleanup */ } },): Cleanup logic is comparable to what might be placed in viewWillDisappear(), viewDidDisappear(), or deinit.
useEffect(() => { /* effect */ }, [dep]): Reacting to dependency changes is akin to using Key-Value Observing (KVO), NotificationCenter observers, or delegate pattern callbacks to respond to data changes, but integrated into React's data flow. 54
Web Developers (Angular):
useEffect(() => { /* effect */ },): Corresponds to ngOnInit() for component initialization.
useEffect(() => { return () => { /* cleanup */ } },): Similar to ngOnDestroy() for cleanup.
useEffect(() => { /* effect */ }, [dep]): Conceptually similar to ngOnChanges() for reacting to input property changes, or manually managing subscriptions (e.g., to RxJS Observables) within ngOnInit and unsubscribing in ngOnDestroy. Angular's change detection and RxJS provide a more framework-integrated way of handling side effects, while useEffect offers a more direct, hook-based approach tied to component rendering and data dependencies. 56
Table: useEffect Lifecycle Equivalents (Conceptual)
React useEffect Usage
Native Android (Conceptual)
Native iOS (Conceptual)
Angular (Conceptual)
useEffect(fn,) (Mount)
onCreate/onViewCreated
viewDidLoad
ngOnInit
useEffect(() => { return cleanup },) (Unmount)
onDestroy/onViewDestroyed
deinit/viewDidDisappear
ngOnDestroy
useEffect(fn, [dep]) (Update based on dependencies)
Data observers (e.g., LiveData), custom listeners
KVO, NotificationCenter observers, delegates
ngOnChanges, RxJS subscriptions management

This table provides a conceptual mapping to help developers from various backgrounds understand how useEffect manages side effects in relation to familiar lifecycle patterns.11
Section 5: useRef Hook (Accessing Component Instances/DOM Elements)
The useRef Hook in React serves two primary purposes:
Creating a mutable reference object whose .current property can hold any value. This reference persists for the full lifetime of the component, and importantly, changing its .current property does not trigger a re-render.
Accessing underlying DOM elements or React component instances to call imperative methods on them.
58
useRef acts as an "escape hatch" from React's purely declarative model, allowing for direct interaction with elements or for managing values that should not influence the rendering lifecycle.
Official Documentation Link Box
React - useRef Hook:(https://react.dev/reference/react/useRef) 58
Creating and Using Refs
A ref is created by calling useRef with an initial value:

TypeScript


import React, { useRef } from 'react';

const myRef = useRef<number>(0); // Ref holding a number, initialized to 0
const inputRef = useRef<TextInput>(null); // Ref intended for a TextInput, initialized to null


myRef.current: The actual value of the ref is stored in its .current property. This property is mutable and can be read or assigned to.
Persistence: The ref object returned by useRef is stable and will be the same object across all re-renders of the component.
Non-Re-rendering Updates: Crucially, when you modify myRef.current (e.g., myRef.current = 10;), React does not re-render the component. This makes useRef suitable for storing values that are not directly tied to the visual output of the component but are needed for its internal logic or for interacting with imperative APIs.
The mutability of ref.current and its non-rendering nature are its core strengths. However, this also means that if a value stored in a ref is directly used in JSX and is expected to update the UI upon change, useRef is the wrong tool; useState should be used instead.
Usage for Mutable Values (e.g., Timer ID):

TypeScript


import React, { useRef, useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const IntervalTimerComponent = () => {
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID
  const = useState<number>(0);
  const = useState<boolean>(false);

  const handleStart = () => {
    if (intervalIdRef.current === null) { // Prevent multiple intervals
      setIsRunning(true);
      intervalIdRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (intervalIdRef.current!== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    handleStop();
    setSeconds(0);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current!== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  },); // Empty dependency array ensures cleanup runs only on unmount

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Seconds: {seconds}</Text>
      <View style={styles.buttonRow}>
        {!isRunning? (
          <Button title="Start" onPress={handleStart} />
        ) : (
          <Button title="Stop" onPress={handleStop} />
        )}
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: { alignItems: 'center', marginVertical: 20 },
  timerText: { fontSize: 24, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '60%' },
});

export default IntervalTimerComponent;


In this example, intervalIdRef stores the ID returned by setInterval. Modifying intervalIdRef.current does not cause IntervalTimerComponent to re-render. The re-renders are driven by the seconds and isRunning state variables. 59
Accessing DOM/Native Component Instances
A primary use of useRef in React Native is to get a direct reference to the underlying native view instance of a core component (like View, TextInput, ScrollView, FlatList). This allows you to call imperative methods available on these instances.
Attaching Refs: The ref prop is used on a component:
TypeScript
import { TextInput } from 'react-native';
//...
const myInputRef = useRef<TextInput>(null);
//...
return <TextInput ref={myInputRef} placeholder="Enter text here" />;

After the component mounts and the TextInput is rendered, myInputRef.current will hold a reference to the TextInput instance.
Calling Imperative Methods:
TextInput:
myInputRef.current?.focus(): Programmatically brings focus to the input.
myInputRef.current?.blur(): Removes focus from the input.
myInputRef.current?.clear(): Clears the text content of the input.
myInputRef.current?.isFocused(): Returns true if the input is focused.
ScrollView / FlatList:
myListRef.current?.scrollToEnd({ animated: true }): Scrolls to the end of the list.
myListRef.current?.scrollToIndex({ animated: true, index: 5, viewPosition: 0.5 }): Scrolls to the item at the specified index. viewPosition: 0 (top), 0.5 (center), 1 (bottom). 64
myListRef.current?.scrollToOffset({ animated: true, offset: 500 }): Scrolls to a specific pixel offset.
View:
myViewRef.current?.measure((x, y, width, height, pageX, pageY) => { console.log(width, height, pageX, pageY); }): Measures the layout (size and position on screen) of the view. The callback receives layout metrics.
myViewRef.current?.measureInWindow((x, y, width, height) => {... }): Measures position relative to the window.
myViewRef.current?.measureLayout(relativeToNativeNode, (left, top, width, height) => {... }, () => { /* error callback */ }): Measures layout relative to an ancestor.
React.forwardRef:
When creating custom functional components that encapsulate a core component (like a styled TextInput), the parent component cannot directly obtain a ref to the inner core component using the ref prop on the custom component. The ref would point to the custom component function itself, which is not useful for calling imperative methods.
React.forwardRef allows a component to pass a ref it receives down to one of its children. 66
TypeScript
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Button } from 'react-native';

interface CustomInputProps extends TextInputProps {
  // any custom props
}

// Define what methods the parent can call via the ref
export interface CustomInputRef {
  focus: () => void;
  clearText: () => void;
}

const CustomInput = forwardRef<CustomInputRef, CustomInputProps>((props, ref) => {
  const internalInputRef = useRef<TextInput>(null);

  // Expose specific methods to the parent component via the passed 'ref'
  useImperativeHandle(ref, () => ({
    focus: () => {
      internalInputRef.current?.focus();
    },
    clearText: () => {
      internalInputRef.current?.clear();
    },
  }));

  return (
    <TextInput
      ref={internalInputRef}
      style={styles.input}
      placeholderTextColor="#888"
      {...props}
    />
  );
});

const ParentWithCustomInput = () => {
  const customInputApiRef = useRef<CustomInputRef>(null);

  return (
    <View>
      <CustomInput ref={customInputApiRef} placeholder="My Custom Input" />
      <Button title="Focus Custom Input" onPress={() => customInputApiRef.current?.focus()} />
      <Button title="Clear Custom Input" onPress={() => customInputApiRef.current?.clearText()} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 5 },
});

export default ParentWithCustomInput;

forwardRef is essential for creating reusable components that need to expose imperative control over their underlying native elements to parent components. Without it, encapsulation would break the ability to perform such interactions. useImperativeHandle is often used with forwardRef to customize the instance value that is exposed to parent components when using ref.
"Under the Hood": Refs and Native Interaction
When a ref is attached to a React Native core component, React Native's rendering system (Fabric in the New Architecture, or the legacy system) ensures that ref.current is populated with an object that can bridge calls to the native side.
For methods like focus() or scrollToIndex(), calling them on ref.current dispatches a command to the UIManager (in the legacy architecture) or directly invokes a native method via JSI (in the New Architecture). This command instructs the corresponding native view to perform the action.
For measure(), a request is sent to the native layout system to calculate the view's metrics. Once calculated, these values are passed back to the JavaScript callback function.
Example: Focusing an Input and Scrolling a FlatList

TypeScript


import React, { useRef } from 'react';
import { TextInput, Button, View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';

interface Item { id: string; title: string; }

const RefExampleScreen = () => {
  const nameInputRef = useRef<TextInput>(null);
  const listRef = useRef<FlatList<Item>>(null);

  const dummyData: Item = Array.from({ length: 30 }, (_, i) => ({
    id: `item-${i}`,
    title: `List Item ${i + 1}`,
  }));

  const focusNameInput = () => {
    nameInputRef.current?.focus();
  };

  const scrollToItem15 = () => {
    listRef.current?.scrollToIndex({ animated: true, index: 14, viewPosition: 0 }); // 0 for top
  };

  const renderListItem = ({ item }: { item: Item }) => (
    <Text style={styles.listItem}>{item.title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput ref={nameInputRef} placeholder="Enter your name" style={styles.input} />
      <Button title="Focus Name Input" onPress={focusNameInput} />
      <Button title="Scroll to Item 15" onPress={scrollToItem15} />
      <FlatList
        ref={listRef}
        data={dummyData}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 10 },
  input: { borderWidth: 1, borderColor: 'grey', padding: 8, marginBottom: 10 },
  list: { marginTop: 10, flexGrow: 1, borderWidth: 1, borderColor: 'lightgrey' },
  listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default RefExampleScreen;


This example demonstrates how refs can be used to imperatively control focus and scroll behavior.64
Storing Mutable Values (e.g., Previous State/Props)
Since useRef persists across renders and its updates don't trigger re-renders, it's an excellent tool for storing values that you want to compare against current props/state, or any mutable value that is part of your component's internal logic but not its direct visual output. 59
A common pattern is to store the previous value of a prop or state variable to perform comparisons or trigger logic when a change occurs.
Usage (TypeScript):

TypeScript


import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const PreviousPropTracker = ({ count }: { count: number }) => {
  const previousCountRef = useRef<number>(); // Will be undefined initially

  useEffect(() => {
    // This effect runs *after* the component has rendered with the new 'count' prop.
    // So, at this point, 'previousCountRef.current' still holds the value from the *previous* render cycle.
    console.log(`Current count: ${count}, Previous count: ${previousCountRef.current}`);

    // Update the ref's current value to the current 'count' for the *next* render cycle.
    previousCountRef.current = count;
  }, [count]); // This effect depends on 'count' and runs when 'count' changes.

  return (
    <View style={styles.trackerContainer}>
      <Text>Current Count: {count}</Text>
      <Text>Previous Count: {previousCountRef.current === undefined? 'N/A' : previousCountRef.current}</Text>
    </View>
  );
};

const AppWithTracker = () => {
  const [appCount, setAppCount] = useState(0);
  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Button title="Increment App Count" onPress={() => setAppCount(c => c + 1)} />
      <PreviousPropTracker count={appCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  trackerContainer: { marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'green' },
});

export default AppWithTracker;


In this example, previousCountRef.current will always hold the value of count from the previous render, allowing for comparisons or logic based on changes.
Background Bridge Notes
Native Android Developers:
Attaching a ref to a TextInput and calling inputRef.current.focus() is analogous to obtaining a reference to an EditText (e.g., via View Binding or findViewById) and then calling editText.requestFocus() followed by InputMethodManager.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT).
myViewRef.current.measure(...) is similar to using View.getLocationOnScreen() or View.getGlobalVisibleRect() to get position and size information.
Native iOS Developers:
inputRef.current.focus() is conceptually similar to having an IBOutlet for a UITextField and programmatically making it the first responder by calling textField.becomeFirstResponder().
myViewRef.current.measure(...) is akin to querying a UIView's frame or bounds properties, or using methods like convert(_:to:) to get coordinates relative to different views.
Web Developers (React/Angular):
useRef for DOM access in React is the idiomatic equivalent to document.getElementById(), document.querySelector() in vanilla JavaScript 72, or Angular's @ViewChild decorator used to get a reference to a DOM element or component instance.74 The key advantage of useRef is its integration with React's virtual DOM and component lifecycle.
Using useRef to store mutable values that don't trigger re-renders is similar to using instance variables (properties) in class components (in React or other frameworks like Angular) or module-scoped variables outside components. useRef ties the lifetime of this mutable value to the specific component instance. 76
Table: useRef vs. Other Referencing/Mutable Value Mechanisms
Mechanism
Primary Use
Triggers Re-render?
Scope/Lifecycle
Typical Scenario
useRef (DOM/Component)
Access/manipulate native view instances
No
Component instance
inputRef.current.focus(), listRef.current.scrollToIndex()
useRef (Mutable Value)
Store persistent value without re-render
No
Component instance
Timer ID, previous props/state, animation handles
useState
Manage component state that drives UI
Yes
Component instance
Form inputs, visibility toggles, data for display
Instance Variable (Class Comp)
Store persistent value
No (if not in this.state)
Class instance
Similar to useRef for mutable values in classes
document.getElementById (Web)
Direct DOM access (outside React model)
N/A (external to React)
Global DOM
Legacy/non-React DOM manipulation (avoid in React)
@ViewChild (Angular)
Access child component/DOM element in Angular
N/A (Angular specific)
Component instance
Imperative calls on child components/elements

This table helps clarify the distinct roles and behaviors of useRef compared to other mechanisms for referencing elements or storing mutable data, which is particularly useful for learners transitioning from different programming paradigms.58
Section 6: useCallback and useMemo Hooks (Performance Optimization)
In React, performance optimization often involves preventing unnecessary re-renders of components. Two key hooks for this purpose are useCallback and useMemo. They help by memoizing functions and values, respectively, thereby preserving referential equality across renders. 78
In JavaScript, functions and objects are reference types. This means that if a new function or object is created in a parent component during each render (even if its underlying code or data is identical), it will be a new reference. When such new references are passed as props to child components, especially those optimized with React.memo, the child components will perceive these as changed props and re-render, even if the semantic value or behavior hasn't changed. useCallback and useMemo address this by returning a cached (memoized) version of the function or value, which only changes if its specified dependencies change.
Official Documentation Link Box
React - useCallback Hook: https://react.dev/reference/react/useCallback 78
React - useMemo Hook: https://react.dev/reference/react/useMemo 79
React - React.memo API: https://react.dev/reference/react/memo 93
useCallback(fn, dependencies)
The useCallback Hook returns a memoized version of the callback function fn. This memoized callback only changes if one of the values in the dependencies array has changed. 78
Syntax: const memoizedCallback = useCallback(fnToMemoize, dependencyArray);
fnToMemoize: The function definition you want to cache.
dependencyArray: An array of values that fnToMemoize depends on (props, state, or other values from the component's scope).
If the array is empty (``), the returned callback will be created once and its reference will never change for the lifetime of the component.
If any dependency in the array changes between renders (compared using Object.is), useCallback will return a new function reference.
If the dependency array is omitted, a new function will be returned on every render (negating the purpose of useCallback).
Use Cases:
Passing Callbacks to Memoized Child Components: When a child component is wrapped with React.memo, passing a memoized callback (created with useCallback) prevents the child from re-rendering unnecessarily if the callback function itself hasn't semantically changed. 84
Dependency for Other Hooks: When a function is used as a dependency in another hook (e.g., useEffect, or another useCallback/useMemo), memoizing it with useCallback ensures that the dependent hook doesn't re-run unnecessarily due to a new function reference on each render. 78
"Under the Hood":
useCallback works by storing the function instance from the previous render. On subsequent renders, it compares the current dependencies with the previous dependencies. If they are identical (using Object.is comparison), it returns the stored function instance. If they differ, it creates a new function instance with the current scope, stores it, and returns it..86
TypeScript Example:

TypeScript


import React, { useState, useCallback } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

interface ChildButtonProps {
  onPress: () => void;
  title: string;
}

// A child component memoized with React.memo
const MemoizedChildButton = React.memo(({ onPress, title }: ChildButtonProps) => {
  console.log(`Rendering ChildButton: ${title}`);
  return <Button title={title} onPress={onPress} />;
});

const ParentWithCallbacks = () => {
  const [count, setCount] = useState(0);
  const [anotherValue, setAnotherValue] = useState(0); // To trigger parent re-renders

  // This callback is memoized. It will only be a new function if 'count' changes (which it doesn't here).
  // If 'count' were used inside, it should be in dependencies.
  // For updating state based on previous state, use functional update to avoid dependency on 'count'.
  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
    console.log('Increment button clicked');
  },); // Empty dependency array means this function reference is stable.

  const handleDecrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
    console.log('Decrement button clicked');
  },); // Stable reference

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Text style={styles.text}>Another Value: {anotherValue}</Text>
      <Button title="Update Another Value (triggers parent re-render)" onPress={() => setAnotherValue(val => val + 1)} />

      {/* MemoizedChildButton will not re-render when "Another Value" changes because handleIncrement's reference is stable */}
      <MemoizedChildButton onPress={handleIncrement} title="Increment Count" />
      <MemoizedChildButton onPress={handleDecrement} title="Decrement Count" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  text: { fontSize: 18, marginVertical: 8 },
});

export default ParentWithCallbacks;


In this example, if handleIncrement was not wrapped in useCallback, MemoizedChildButton would re-render every time ParentWithCallbacks re-renders (e.g., when anotherValue changes), because handleIncrement would be a new function instance each time. useCallback ensures handleIncrement maintains the same reference unless its dependencies change.
useMemo(computeExpensiveValue, dependencies)
The useMemo Hook returns a memoized value. It recomputes the memoized value only when one of the dependencies has changed. This is useful for avoiding expensive calculations on every render. 79
Syntax: const memoizedValue = useMemo(() => computeFunction(dep1, dep2), [dep1, dep2]);
computeFunction: A function that returns the value to be memoized. This function is executed during rendering.
dependencyArray: An array of values that computeFunction depends on. If any dependency changes, computeFunction is re-executed. If empty (``), the value is computed once and never changes.
Use Cases:
Memoizing Expensive Calculations: If a component performs a computationally intensive calculation, useMemo can cache the result, preventing re-calculation on every render if the inputs haven't changed. 79
Memoizing Objects or Arrays Passed as Props: When passing objects or arrays as props to child components (especially those wrapped with React.memo), useMemo can ensure that these props maintain referential equality if their underlying data hasn't changed, thus preventing unnecessary child re-renders.
TypeScript
const itemStyle = useMemo(() => ({
  backgroundColor: isActive? 'blue' : 'grey',
  padding: 10,
}), [isActive]);
// Pass itemStyle to a memoized child


"Under the Hood":
useMemo executes the computeExpensiveValue function during the render. It stores the returned value. On subsequent renders, it compares the current dependencies with the previous ones. If they are the same, it returns the stored value without re-executing computeExpensiveValue. If dependencies differ, it re-executes the function, stores the new result, and returns it..86
TypeScript Example:

TypeScript


import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';

// Assume this is a computationally expensive function
const calculateFactorial = (n: number): number => {
  console.log(`Calculating factorial for ${n}`);
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = n; i > 0; i--) {
    result *= i;
  }
  return result;
};

const FactorialCalculator = () => {
  const [number, setNumber] = useState<number>(1);
  const = useState<number>(0); // To force re-renders

  // Factorial is memoized and only recalculates if 'number' changes.
  // Re-renders caused by 'triggerRender' will not cause recalculation.
  const factorial = useMemo(() => {
    return calculateFactorial(number);
  }, [number]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calculate Factorial of:</Text>
      <TextInput
        style={styles.input}
        value={String(number)}
        onChangeText={text => setNumber(parseInt(text, 10) |
| 0)}
        keyboardType="number-pad"
      />
      <Text style={styles.resultText}>Factorial: {factorial}</Text>
      <Button title="Force Re-render Parent" onPress={() => setTriggerRender(val => val + 1)} />
      <Text>Parent Render Count: {triggerRender}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 8, width: 100, textAlign: 'center', marginBottom: 10 },
  resultText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});

export default FactorialCalculator;


In this example, calculateFactorial is only called when number changes, not when FactorialCalculator re-renders due to triggerRender state changes.
useCallback vs useMemo 91:
useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
useCallback memoizes the function itself (referential equality for the function).
useMemo memoizes the result of the function execution (referential equality for the returned value). Use useCallback for functions (event handlers, callbacks passed to children) and useMemo for computed values (derived data, complex objects/arrays).
React.memo(Component, arePropsEqual?)
React.memo is a Higher Order Component (HOC) that memoizes a functional component. If the component's props are the same between renders (shallow comparison by default), React.memo skips re-rendering the component and reuses the last rendered result. 93
Usage: Wrap your component with React.memo:
TypeScript
const MyMemoizedComponent = React.memo(MyComponent);


Interaction with useCallback/useMemo: To make React.memo effective, props that are functions or objects should be memoized using useCallback or useMemo in the parent component. Otherwise, new references for these props on each parent render will cause the memoized child to re-render anyway. 84
arePropsEqual function (optional): You can provide a custom comparison function as the second argument to React.memo if shallow comparison of props is not sufficient. This function receives (prevProps, nextProps) and should return true if props are equal (and rendering can be skipped), false otherwise.
Performance Considerations
Memoization with useCallback and useMemo is not free. These hooks introduce a small overhead:
Storing the previous function/value and dependencies.
Comparing dependencies on each render.
Therefore, they should be used strategically:
Profile First: Use tools like the React DevTools Profiler to identify actual performance bottlenecks before applying memoization. Premature optimization can add unnecessary complexity and might even slightly degrade performance if the cost of memoization outweighs the rendering cost. 85
When to Optimize:
For components that render frequently with the same props.
For components with expensive rendering logic.
When passing callbacks or complex objects as props to React.memo-wrapped children.
When functions or values are dependencies of useEffect and you want to control its execution frequency.
Native Optimizations: While React hooks optimize the JavaScript side, remember that native performance (e.g., smooth animations, efficient list rendering with FlashList or optimized FlatList) also depends on native platform capabilities and how React Native interacts with them. For instance, offloading CPU-intensive tasks from the JS thread using Web Workers (if applicable in the RN context via specific libraries) or ensuring native modules are efficient are separate but related concerns to overall app performance. 97
Over-reliance on useCallback and useMemo without understanding the underlying cause of re-renders can sometimes mask deeper issues in component structure or state management. It's often better to simplify component logic or state flow first.
Exercise 9.2: Optimizing with useCallback (Expo Snack)
Objective: Demonstrate how useCallback in conjunction with React.memo can prevent unnecessary re-renders of a child component.
Instructions:
Create an Expo Snack or a new file in your local Expo project.
Parent Component (ParentOptimizer):
Import useState, useCallback, React from 'react'.
Import View, Text, Button, StyleSheet from 'react-native'.
Create a state variable count initialized to 0.
Create another state variable unrelatedData initialized to 0 (this is to trigger parent re-renders without affecting the child's relevant prop).
Define a function handleItemPress that logs a message like "Item pressed!".
Initially, do not wrap handleItemPress with useCallback.
Render Text displaying count and unrelatedData.
Render a Button to increment count.
Render a Button to increment unrelatedData.
Render an instance of MemoizedListItem (created below), passing handleItemPress as a prop named onPress.
Child Component (ListItem -> MemoizedListItem):
Create a functional component ListItem that accepts an onPress function prop and a title string prop.
Inside ListItem, add console.log('ListItem rendered:', title);.
It should render a Button with the given title that calls onPress when pressed.
Wrap ListItem with React.memo to create MemoizedListItem.
Observation - Part 1 (Without useCallback):
Run the app. Press the "Increment Unrelated Data" button in the parent.
Observe the console. You should see "ListItem rendered:..." logged, indicating MemoizedListItem re-rendered even though its onPress prop's behavior didn't change (only its reference did).
Modification - Part 2 (With useCallback):
In ParentOptimizer, modify the handleItemPress function by wrapping it with useCallback. Use an empty dependency array `` since it doesn't depend on any props or state from ParentOptimizer for its own definition (if it did, those would go in the array).
TypeScript
const handleItemPress = useCallback(() => {
  console.log('Item pressed!');
},);


Observation - Part 2:
Run the app again. Press the "Increment Unrelated Data" button.
Observe the console. This time, "ListItem rendered:..." should not be logged (or logged far less, only on initial mount or if its other props changed). This demonstrates that useCallback provided a stable reference for onPress, allowing React.memo to effectively skip the re-render.
Press the "Increment Count" button. ParentOptimizer re-renders, but MemoizedListItem should still not re-render due to handleItemPress being stable.
Conceptual Code for Snack:

TypeScript


import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ListItemProps {
  onPress: () => void;
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({ onPress, title }) => {
  console.log('ListItem rendered:', title);
  return <Button title={title} onPress={onPress} />;
};

const MemoizedListItem = React.memo(ListItem);

const ParentOptimizer: React.FC = () => {
  const [count, setCount] = useState(0);
  const = useState(0);

  // Part 1: const handleItemPress = () => { console.log('Item with ID X pressed!'); };
  // Part 2: Wrap with useCallback
  const handleItemPress = useCallback(() => {
    console.log('Item pressed!');
  },); // Empty dependency array: stable function reference

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <Text>Unrelated Data: {unrelatedData}</Text>
      <Button title="Increment Count" onPress={() => setCount(c => c + 1)} />
      <Button title="Increment Unrelated Data" onPress={() => setUnrelatedData(u => u + 1)} />
      <MemoizedListItem onPress={handleItemPress} title="My Action Item" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center' }});
export default ParentOptimizer;


This exercise provides a hands-on understanding of how useCallback and React.memo work together for performance optimization.101
Section 7: Creating Custom Hooks (Encapsulating Logic)
Custom Hooks are a powerful feature in React that allow you to extract component logic into reusable functions. By creating custom Hooks, you can share stateful logic between different components without resorting to more complex patterns like higher-order components or render props. This promotes cleaner, more modular, and more maintainable code. 103
Core Concept: Reusing Stateful Logic
A custom Hook is essentially a JavaScript function whose name starts with use (e.g., useUserData, useFormInput) and that can call other Hooks (like useState, useEffect, or even other custom Hooks). 103
Why Create Custom Hooks?
Reusability: Share logic across multiple components without duplicating code.
Abstraction: Hide complex implementation details behind a simple interface. A component can use a custom Hook to achieve a certain behavior without needing to know how that behavior is implemented.
Readability & Organization: Keep component code focused on rendering and UI concerns by moving complex state management or side effect logic into custom Hooks.
Testability: Custom Hooks can often be tested in isolation, simplifying the testing process.
Rules and Conventions for Custom Hooks: 45
Naming Convention: Custom Hook names must start with the prefix use followed by a capital letter (e.g., useOnlineStatus). This convention is crucial because:
It signals to developers and to React that the function is a Hook.
React's linter plugins (eslint-plugin-react-hooks) rely on this naming to enforce the Rules of Hooks within your custom Hook. If a function doesn't start with use, the linter won't allow you to call other Hooks like useState or useEffect inside it.
Call Other Hooks: Custom Hooks can, and often do, call built-in React Hooks (useState, useEffect, useContext, useRef, useCallback, useMemo, etc.) or other custom Hooks.
Top-Level Calls: Just like built-in Hooks, custom Hooks must be called at the top level of React functional components or other custom Hooks. They cannot be called inside loops, conditions, or nested functions.
State and Effects are Isolated: Each time you use a custom Hook in a component, all state and effects declared inside that custom Hook are fully isolated to that specific component instance. Custom Hooks share logic, not state itself. 104
How to Build a Custom Hook (General Steps):
Identify Reusable Logic: Look for patterns in your components where the same stateful logic or side effect management is repeated.
Create a Function: Define a JavaScript function with a name starting with use (e.g., useToggle).
Move Logic: Extract the relevant useState, useEffect, and other Hook calls, along with any related helper functions, into this new custom Hook function.
Define Inputs (Arguments): Determine what parameters your custom Hook needs to receive from the component using it (e.g., an initial value, a URL for data fetching).
Define Outputs (Return Value): Decide what values or functions your custom Hook should return to the component. This could be state variables, functions to update that state, loading/error statuses, etc. You can return these as an array (like useState) or an object.
Use the Custom Hook: Call your custom Hook from your functional components just like any built-in Hook.
Example: useToggle Custom Hook
A simple custom Hook to manage a boolean toggle state.

TypeScript


import { useState, useCallback } from 'react';

// Custom Hook: useToggle
// initialState: The initial boolean state (defaults to false)
// Returns: A tuple
function useToggle(initialState: boolean = false): [boolean, () => void] {
  const = useState<boolean>(initialState);

  // useCallback ensures the toggle function has a stable reference
  // unless 'setState' itself were to change (which it doesn't for a given component instance).
  // Here, an empty dependency array is appropriate as toggle's definition doesn't depend on external variables
  // that change over the component's lifecycle in a way that would require toggle to be redefined.
  const toggle = useCallback(() => {
    setState(prevState =>!prevState);
  },); // No dependencies needed as setState is stable and it uses functional update.

  return [state, toggle];
}

export default useToggle;

// Example Usage in a Component:
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
// import useToggle from './useToggle'; // Assuming useToggle is in a separate file

const ToggleComponent = () => {
  const = useToggle(false); // Using the custom hook

  return (
    <View style={styles.container}>
      <Text style={styles.text}>The toggle is: {isToggled? 'ON' : 'OFF'}</Text>
      <Button title={isToggled? "Turn OFF" : "Turn ON"} onPress={toggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});

// export default ToggleComponent;


This useToggle hook encapsulates the logic for managing and toggling a boolean state, making it reusable across any component that needs this functionality.108
Other Potential Custom Hook Examples:
useFormInput(initialValue): Manages the state and onChangeText handler for a TextInput.
useKeyboardStatus(): Uses the Keyboard module's listeners to provide keyboard visibility status and height. 111
useScreenOrientation(): Uses the Dimensions API or expo-screen-orientation to provide the current screen orientation. 109
useDebounce(value, delay): Returns a debounced version of a value, useful for delaying API calls based on user input.
useFetch(url, options): Encapsulates logic for fetching data, managing loading and error states. 105
Custom Hooks are a fundamental pattern for building scalable and maintainable React and React Native applications by promoting logic reuse and separation of concerns.
Official Documentation Link Box
React - Building Your Own Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks 103
React (Legacy) - Custom Hooks: https://legacy.reactjs.org/docs/hooks-custom.html 104
Exercise 9.3: Building a Custom Hook (Expo Snack)
Objective: Create a custom Hook useTimer that encapsulates timer logic (start, stop, reset, and current time).
Instructions:
Create useTimer.ts:
Define a function useTimer(initialSeconds: number = 0).
Inside, use useState for seconds (initialized with initialSeconds) and isActive (boolean, initially false).
Use useRef to store the interval ID (intervalRef).
Use useEffect to handle the setInterval when isActive is true and seconds is greater than 0 (for countdown) or just incrementing (for stopwatch).
The effect should clear the interval if isActive becomes false or if seconds reaches 0 (for a countdown).
The cleanup function for useEffect must clear the interval (clearInterval(intervalRef.current)).
Dependencies for this useEffect will likely be [isActive, seconds] (or just [isActive] if it's a stopwatch that doesn't stop at 0).
Implement start, stop, and reset functions:
start(): Sets isActive to true.
stop(): Sets isActive to false.
reset(): Calls stop() and sets seconds back to initialSeconds (or 0 if it's a stopwatch).
Wrap start, stop, reset in useCallback to ensure stable references if they are passed down or used in effects.
Return an object: { seconds, isActive, start, stop, reset }.
Create TimerComponent.tsx:
Import and use the useTimer hook: const { seconds, isActive, start, stop, reset } = useTimer(60); (for a 60-second countdown).
Render the seconds and isActive status.
Render "Start", "Stop", and "Reset" buttons that call the respective functions from the hook.
Test:
Verify that the timer starts, stops, and resets correctly.
Ensure the timer cleans up properly if the component were to unmount (though harder to test directly in a simple Snack without navigation).
Conceptual Code for useTimer.ts:

TypeScript


import { useState, useEffect, useRef, useCallback } from 'react';

export interface TimerHookResult {
  seconds: number;
  isActive: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

function useTimer(initialSeconds: number = 0, isCountdown: boolean = false): TimerHookResult {
  const = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (isCountdown) {
          setSeconds(prevSeconds => {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              setIsActive(false); // Stop timer when it reaches 0
              if (intervalRef.current) clearInterval(intervalRef.current);
              return 0;
            }
          });
        } else { // Stopwatch mode
          setSeconds(prevSeconds => prevSeconds + 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isCountdown]); // Re-run effect if isActive or isCountdown changes

  const start = useCallback(() => {
    setIsActive(true);
  },);

  const stop = useCallback(() => {
    setIsActive(false);
  },);

  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  },);

  return { seconds, isActive, start, stop, reset };
}

export default useTimer;


Conceptual Code for TimerComponent.tsx:

TypeScript


import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useTimer from './useTimer'; // Assuming useTimer.ts is in the same directory or imported correctly

const TimerComponent = () => {
  // Example: 60 second countdown timer
  const { seconds, isActive, start, stop, reset } = useTimer(60, true);

  // Example: Stopwatch
  // const { seconds, isActive, start, stop, reset } = useTimer(0, false);


  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time: {seconds}s</Text>
      <Text>Status: {isActive? 'Running' : 'Stopped'}</Text>
      <View style={styles.buttonContainer}>
        {!isActive? (
          <Button title="Start" onPress={start} />
        ) : (
          <Button title="Stop" onPress={stop} />
        )}
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timerText: { fontSize: 30, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '80%' },
});

export default TimerComponent;


This exercise reinforces the concepts of useState, useEffect, useRef, and useCallback by combining them into a practical, reusable custom Hook.
Challenge 9: Custom Hook for Device Information (Expo Snack)
Objective: Create a custom Hook useDeviceInfo that provides various pieces of device information using the Platform and Dimensions (or useWindowDimensions) APIs.
Instructions:
Create useDeviceInfo.ts:
Define a function useDeviceInfo().
Inside the hook:
Use Platform.OS to get the operating system.
Use Platform.Version to get the OS version.
Access relevant constants from Platform.constants (e.g., reactNativeVersion, Model for Android, systemName for iOS, isPad, isTV).
Use useWindowDimensions() to get current width, height, scale, and fontScale.
(Optional Advanced) Use useEffect with Dimensions.addEventListener('change',...) to also provide screen dimensions and keep them updated if you want to show the difference, though useWindowDimensions is generally preferred for window metrics. If you do this, ensure proper cleanup.
The hook should return an object containing all this information. Define an interface for the return type.
TypeScript
interface DeviceInfo {
  os: typeof Platform.OS;
  osVersion: string | number;
  rnVersion: string; // e.g., "0.79.0"
  deviceModel?: string; // Android: Platform.constants.Model
  systemName?: string; // iOS: Platform.constants.systemName
  isPad?: boolean; // iOS: Platform.isPad
  isTV: boolean; // Both: Platform.isTV
  windowWidth: number;
  windowHeight: number;
  windowScale: number;
  windowFontScale: number;
  // Optional: screen dimensions if implemented
  // screenWidth?: number;
  // screenHeight?: number;
}


Create DeviceInfoDisplay.tsx:
Import and use the useDeviceInfo hook: const deviceInfo = useDeviceInfo();.
Render the information obtained from the hook in a readable format using Text components.
Allow the layout to rotate (if on a device/simulator that supports it) to see useWindowDimensions update the width/height.
Structure and TypeScript:
Ensure your custom hook and component are well-typed.
Organize your code clearly.
Conceptual Code for useDeviceInfo.ts:

TypeScript


import { Platform, useWindowDimensions, ScaledSize } from 'react-native';
import { useEffect, useState } from 'react'; // Only if using Dimensions.addEventListener

export interface DeviceInfo {
  os: typeof Platform.OS;
  osVersion: string | number;
  rnVersion: string;
  deviceModel?: string;
  systemName?: string;
  isPad?: boolean;
  isTV: boolean;
  window: ScaledSize;
  // For screen dimensions, you might need Dimensions API and listener
  // screen?: ScaledSize;
}

function useDeviceInfo(): DeviceInfo {
  const windowDimensions = useWindowDimensions();

  const rnVersionObj = Platform.constants.reactNativeVersion;
  const rnVersionString = `<span class="math-inline">\{rnVersionObj\.major\}\.</span>{rnVersionObj.minor}.<span class="math-inline">\{rnVersionObj\.patch\}</span>{rnVersionObj.prerelease? `-${rnVersionObj.prerelease}` : ''}`;

  const info: DeviceInfo = {
    os: Platform.OS,
    osVersion: Platform.Version,
    rnVersion: rn


Works cited
Browser detection using the user agent string (UA sniffing) - HTTP - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent
Let's create a simple React hook to detect browsers and their capabilities - DEV Community, accessed May 12, 2025, https://dev.to/morewings/lets-create-a-simple-react-hook-to-detect-browsers-and-their-capabilities-4lnf
Tree shaking and code removal - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/guides/tree-shaking/
Platform-Specific Code · React Native, accessed May 12, 2025, https://reactnative.dev/docs/platform-specific-code
Platform · React Native, accessed May 12, 2025, https://reactnative.dev/docs/platform
Platform - react-native - Web Coding Center, accessed May 12, 2025, https://webcodingcenter.com/react-native/Platform.html
How React Native Works - Digitalya, accessed May 12, 2025, https://digitalya.co/blog/how-react-native-works/
How React Native works | GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/react-native-works/
Use platform-specific APIs | Kotlin Multiplatform Development Documentation - JetBrains, accessed May 12, 2025, https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-connect-to-apis.html
React Native Overview Notes - Micheal England, accessed May 12, 2025, https://micheal.dev/blog/learning-react-native-basics/
An Android developer's guide to React Native, accessed May 12, 2025, https://developer.amazon.com/apps-and-games/blogs/2025/04/react-native-for-android-developers
Speeding up your Build phase - React Native, accessed May 12, 2025, https://reactnative.dev/docs/build-speed
Handling Platform-Specific Code with Platform Module: Conditional Rendering Based on Platform : Course Building Cross-Platform Apps with React Native | Cursa, accessed May 12, 2025, https://cursa.app/en/page/handling-platform-specific-code-with-platform-module-conditional-rendering-based-on-platform
Improving times for both iOS build and CI for a React Native app - GitHub Gist, accessed May 12, 2025, https://gist.github.com/gorhom/2d7caaeb64c21694dc691cedbe18e134
Dimensions · React Native, accessed May 12, 2025, https://reactnative.dev/docs/dimensions
Handling screen sizes and orientation - Developing Mobile Apps with React Native, accessed May 12, 2025, https://app.studyraid.com/en/read/2370/47247/handling-screen-sizes-and-orientation
How to Get Window Width and Height In React Native ? | GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/how-to-get-window-width-and-height-in-react-native/
Height and Width - React Native, accessed May 12, 2025, https://reactnative.dev/docs/height-and-width
What's the difference between 'window' and 'screen' in the Dimensions API - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/44978804/whats-the-difference-between-window-and-screen-in-the-dimensions-api
React native - Different screen values between JS and native side - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/78350261/react-native-different-screen-values-between-js-and-native-side
Dimensions - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.70/dimensions
Support different pixel densities | Compatibility - Android Developers, accessed May 12, 2025, https://developer.android.com/training/multiscreen/screendensities
Detect Screen Size - SwiftUI Handbook - Design+Code, accessed May 12, 2025, https://designcode.io/swiftui-handbook-detect-screen-size/
useWindowDimensions · React Native, accessed May 12, 2025, https://reactnative.dev/docs/usewindowdimensions
Dimensions - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.71/dimensions
Odd behavior from `useWindowDimensions` hook : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1e5fs02/odd_behavior_from_usewindowdimensions_hook/
useWindowDimensions - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.73/usewindowdimensions
useWindowDimensions - React Native Archive, accessed May 12, 2025, https://archive.reactnative.dev/docs/next/usewindowdimensions
Common handler properties | React Native Gesture Handler - Software Mansion, accessed May 12, 2025, https://docs.swmansion.com/react-native-gesture-handler/docs/1.x/api/gesture-handlers/common-gh/
PixelRatio - React Native, accessed May 12, 2025, https://reactnative.dev/docs/pixelratio
Quirks | NativeWind, accessed May 12, 2025, https://nativewind.dev/core-concepts/quirks
Platform Differences | NativeWind, accessed May 12, 2025, https://www.nativewind.dev/core-concepts/differences
What's The Difference Between PX, EM, REM, %, VW, And VH? - Elementor, accessed May 12, 2025, https://elementor.com/help/whats-the-difference-between-px-em-rem-vw-and-vh/
When to use Rem, Em, VW/VH, %, PX? : r/Frontend - Reddit, accessed May 12, 2025, https://www.reddit.com/r/Frontend/comments/sn2yns/when_to_use_rem_em_vwvh_px/
Alert · React Native, accessed May 12, 2025, https://reactnative.dev/docs/alert
Alert – React Native | A framework for building native apps using React, accessed May 12, 2025, https://airbnb.io/react-native/releases/0.18/docs/alert.html
Alert - React Native, accessed May 12, 2025, https://scarcoco.github.io/react-native/docs/0.34/alert
Alert - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.70/alert
Component Consistency between Platforms. · react-native-community discussions-and-proposals - GitHub, accessed May 12, 2025, https://github.com/react-native-community/discussions-and-proposals/discussions/359
UIAlertController | Apple Developer Documentation, accessed May 12, 2025, https://developer.apple.com/documentation/uikit/uialertcontroller
Alert - React Native Archive, accessed May 12, 2025, https://archive.reactnative.dev/docs/0.27/alert
Testing React Native Alerts - Nick Pachulski, accessed May 12, 2025, https://pachulski.me/testing-react-native-alerts
JavaScript's prompt, confirm and alert considered "old-fashioned" [closed], accessed May 12, 2025, https://softwareengineering.stackexchange.com/questions/106031/javascripts-prompt-confirm-and-alert-considered-old-fashioned
Hooks at a Glance - React, accessed May 12, 2025, https://legacy.reactjs.org/docs/hooks-overview.html
Rules of Hooks – React, accessed May 12, 2025, https://react.dev/reference/rules/rules-of-hooks
useState - React, accessed May 12, 2025, https://react.dev/reference/react/useState
React useState hook: Complete guide and tutorial - Contentful, accessed May 12, 2025, https://www.contentful.com/blog/react-usestate-hook/
useEffect – React, accessed May 12, 2025, https://react.dev/reference/react/useEffect
useEffect Hook | React - ReScript, accessed May 12, 2025, https://rescript-lang.org/docs/react/latest/hooks-effect
Using the Effect Hook - React, accessed May 12, 2025, https://legacy.reactjs.org/docs/hooks-effect.html
useContext - React, accessed May 12, 2025, https://react.dev/reference/react/useContext
React | Hooks | useContext() - Codecademy, accessed May 12, 2025, https://www.codecademy.com/resources/docs/react/hooks/useContext
Android Native Modules, accessed May 12, 2025, https://reactnative.dev/docs/legacy/native-modules-android
Understanding useEffect vs. Class Component Lifecycle Methods in React Native, accessed May 12, 2025, https://dev.to/amitkumar13/understanding-useeffect-vs-class-component-lifecycle-methods-in-react-native-25o4
React: useEffect explained with lifecycle methods - PROTOTYP, accessed May 12, 2025, https://prototyp.digital/blog/react-useeffect-explained-with-lifecycle-methods
React vs Angular - A Comprehensive Comparison - Codefinity, accessed May 12, 2025, https://codefinity.com/blog/React-vs-Angular---A-Comprehensive-Comparison
Angular vs. React Which One is Better for Web Development - Fullestop, accessed May 12, 2025, https://www.fullestop.com/blog/angular-vs-react-which-one-is-better-for-web-development
useRef - React, accessed May 12, 2025, https://react.dev/reference/react/useRef
React useRef() - A complete guide - Hygraph, accessed May 12, 2025, https://hygraph.com/blog/react-useref-a-complete-guide
Mastering React's useRef Hook: A Deep Dive - DEV Community, accessed May 12, 2025, https://dev.to/samabaasi/mastering-reacts-useref-hook-a-deep-dive-1548
What is useRef in React? How to use it? - SheCodes, accessed May 12, 2025, https://www.shecodes.io/athena/89879-what-is-useref-in-react-how-to-use-it
Understanding the useInterval Hook in React: A Complete Overview - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/understanding-the-useinterval-hook-in-react
BUILD a React Timer with useRef - YouTube, accessed May 12, 2025, https://www.youtube.com/watch?v=s6UAuFzL308
FlatList - React Native, accessed May 12, 2025, https://reactnative.dev/docs/flatlist
React Native scrollToIndex - Dynamic size item scroll inside FlatList - YouTube, accessed May 12, 2025, https://www.youtube.com/watch?v=pTtxhuThMew
A Guide to Passing Ref to Child Components in React - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/react-workflow-how-to-pass-ref-to-child-effectively
React forwardRef: A Comprehensive Guide on How to Use It - Blogs - Purecode.AI, accessed May 12, 2025, https://blogs.purecode.ai/blogs/react-forwardref
React useRef - textInput focus example - GitHub Gist, accessed May 12, 2025, https://gist.github.com/masonkristopher/a50db7faf8ea126fc2f18ec00051c1b9
How to set focus on an input field after rendering in React - CoreUI, accessed May 12, 2025, https://coreui.io/blog/how-to-set-focus-on-an-input-field-after-rendering-in-react/
How to Access Previous Props & State Values with React Hooks - Telerik.com, accessed May 12, 2025, https://www.telerik.com/blogs/how-to-access-previous-props-state-values-react-hooks
How to access previous props or state with React Hooks - LogRocket Blog, accessed May 12, 2025, https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
Mastering DOM Access in React: Trading querySelector for useRef - Code Captains, accessed May 12, 2025, https://codecaptains.com/en/blog/4/useref-vs-queryselector
useRef instead of querySelector in React, accessed May 12, 2025, https://www.meje.dev/blog/useref-not-queryselector
Angular vs React - Component Party, accessed May 12, 2025, https://component-party.dev/compare/angular-vs-react
reactjs - React - Equivalent to Angular template reference variables? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/52037894/react-equivalent-to-angular-template-reference-variables
What does the useRef hook do, and when do we use it? - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/what-does-the-useref-hook-do-and-when-do-we-use-it/
A Complete Guide to useRef | Giovanni Benussi Blog, accessed May 12, 2025, https://www.giovannibenussi.com/blog/a-complete-guide-to-useref
useCallback – React, accessed May 12, 2025, https://react.dev/reference/react/useCallback
useMemo – React, accessed May 12, 2025, https://react.dev/reference/react/useMemo
Optimizing Performance with useMemo and useCallback Hooks - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/optimizing-performance-with-usememo-and-usecallback-hooks/
Optimizing React Components with useMemo and useCallback - DEV Community, accessed May 12, 2025, https://dev.to/wafa_bergaoui/usememo-vs-usecallback-in-react-1l9o
React useCallback() - A complete guide - Hygraph, accessed May 12, 2025, https://hygraph.com/blog/react-usecallback-a-complete-guide
React useCallback Hook - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/react-js-usecallback-hook/
Memoization in React - How useCallback Works - Refine dev, accessed May 12, 2025, https://refine.dev/blog/react-usecallback-guide/
React.memo + useCallback: How to avoid unnecessary re-renders - DEV Community, accessed May 12, 2025, https://dev.to/gunnarhalen/reactmemo-usecallback-how-to-avoid-unnecessary-re-renders-3pn8
What does useCallback/useMemo do in React? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/53159301/what-does-usecallback-usememo-do-in-react
How React Forget will make React useMemo and useCallback hooks absolutely redundant, accessed May 12, 2025, https://dev.to/usulpro/how-react-forget-will-make-react-usememo-and-usecallback-hooks-absolutely-redundant-4l68
ReactJS useMemo Hook - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/react-js-usememo-hook/
eslint-plugin-react-usememo/docs/rules/require-usememo.md at main - GitHub, accessed May 12, 2025, https://github.com/arthurgeron/eslint-plugin-react-usememo/blob/main/docs/rules/require-usememo.md
Learn How to Use the useMemo Hook Once and for All - Telerik.com, accessed May 12, 2025, https://www.telerik.com/blogs/learn-how-usememo-hook-once-all
useCallback vs. useMemo - Jan Hesters, accessed May 12, 2025, https://www.janhesters.com/blog/usecallback-vs-usememo
When to use useCallback, useMemo and useEffect ? | GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/when-to-use-usecallback-usememo-and-useeffect/
memo – React, accessed May 12, 2025, https://react.dev/reference/react/memo
React.memo explained: When to use it (and when not to) - LogRocket Blog, accessed May 12, 2025, https://blog.logrocket.com/react-memo/
React Top-Level API, accessed May 12, 2025, https://legacy.reactjs.org/docs/react-api.html
What is React memo? How to improve React performance - Contentful, accessed May 12, 2025, https://www.contentful.com/blog/react-memo-improve-performance/
Top 10 React Performance Optimization Tips - OneNine, accessed May 12, 2025, https://onenine.com/top-10-react-performance-optimization-tips/
React Native Performance Optimization Tips for Scalable Apps - Brilworks, accessed May 12, 2025, https://www.brilworks.com/blog/react-native-app-performance-tips/
React Native — Ultimate Guide on Performance Optimization - GitHub, accessed May 12, 2025, https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md
React Performance: Common Problems & Their Solutions | Product Blog • Sentry, accessed May 12, 2025, https://blog.sentry.io/react-js-performance-guide/
Best Practices for reducing lag in Expo apps, accessed May 12, 2025, https://expo.dev/blog/best-practices-for-reducing-lag-in-expo-apps
React Native Efficiency: useMemo, useCallback & FlashList - Mindbowser, accessed May 12, 2025, https://www.mindbowser.com/react-native-usememo-usecallback-flashlist-guide/
Reusing Logic with Custom Hooks – React, accessed May 12, 2025, https://react.dev/learn/reusing-logic-with-custom-hooks
Building Your Own Hooks - React, accessed May 12, 2025, https://legacy.reactjs.org/docs/hooks-custom.html
React Custom Hooks | GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/reactjs-custom-hooks/
Creating React custom hooks with Pieces, accessed May 12, 2025, https://pieces.app/blog/creating-custom-hooks-reactjs
Crafting Clear Code with React Hooks Naming Convention - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/crafting-clear-code-with-react-hooks-naming-convention
Custom react hook useToggle in Typescript - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/60205864/custom-react-hook-usetoggle-in-typescript
Creating Custom Hooks in React Native - Kodaschool, accessed May 12, 2025, https://kodaschool.com/blog/creating-custom-hooks-in-react-native
Custom Hooks - useToggle() - DEV Community, accessed May 12, 2025, https://dev.to/mertcannkocerr/custom-hooks-usetoggle-7hj
useKeyboard.ts - react-native-community/hooks - GitHub, accessed May 12, 2025, https://github.com/react-native-community/hooks/blob/main/src/useKeyboard.ts
Thinking in React Tutorial: a custom hook to capture keystrokes in TypeScript - Newline.co, accessed May 12, 2025, https://www.newline.co/@eigenjoy/thinking-in-react-tutorial-a-custom-hook-to-capture-keystrokes-in-typescript--9300662c
Keyboard handling - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/guides/keyboard-handling/
Keyboard · React Native, accessed May 12, 2025, https://reactnative.dev/docs/keyboard
ReactJS useOrientation Custom Hook - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/reactjs-useorientation-custom-hook/
custom-react-hooks/use-orientation - NPM, accessed May 12, 2025, https://www.npmjs.com/package/%40custom-react-hooks%2Fuse-orientation
Managing orientation changes in React Native apps - LogRocket Blog, accessed May 12, 2025, https://blog.logrocket.com/managing-orientation-changes-react-native-apps/
