Module 11: Navigation and Routing in React Native

1. Introduction to React Native Navigation
   1.1. Role and Importance in Mobile User Experience (UX)
   Navigation forms the backbone of any mobile application, dictating how users move between different sections and functionalities. It involves managing the presentation of, and transitions between, multiple screens.1 The effectiveness of an application's navigation system is paramount to its success; a poorly designed or unintuitive navigation structure can significantly hinder usability and lead to user frustration, potentially causing users to abandon the app.3 Conversely, a seamless, logical, and predictable navigation flow enhances the overall user experience (UX) significantly.3
   Effective navigation acts as a silent guide, enabling users to discover features, complete tasks, and access information with minimal friction.4 This ease of movement contributes directly to higher user engagement and satisfaction.3 The chosen navigation patterns and underlying library are not merely technical implementation details; they are critical architectural decisions that shape the user's journey and perception of the application. They structure the application's information architecture, ensuring that users can build a mental model of the app and move through its hierarchy logically.5 Therefore, investing in well-designed navigation is crucial for achieving positive UX outcomes and meeting application goals.
   1.2. Overview of Common Navigation Patterns
   Several established navigation patterns are commonly employed in mobile applications, each suited to different architectural needs and user flows:
   Stack Navigation: This pattern manages screens in a stack, adhering to a "last-in, first-out" (LIFO) principle.2 When a user navigates to a new screen, it is pushed onto the top of the stack. Navigating back involves popping the current screen off the stack, revealing the previous one.7 This pattern is particularly well-suited for hierarchical content or linear sequences, such as stepping through an authentication process, completing a multi-stage form, or drilling down into detail views.2
   Tab Navigation: This pattern utilizes a persistent bar, typically located at the bottom (or sometimes top) of the screen, containing multiple destinations (tabs).10 Tapping a tab allows the user to switch directly between different top-level sections or views of an application.10 It is most effective when an app has a small number (typically three to five) of primary destinations that are of roughly equal importance and require frequent access.10 Routes associated with tabs are often lazily initialized, meaning their content is only mounted when the tab is first visited, optimizing initial load performance.15
   Drawer Navigation: This pattern employs a side panel, usually hidden off-screen by default, which slides in when invoked (e.g., by swiping from the edge or tapping a menu icon).17 The drawer typically contains a list of navigation links to various destinations within the app.17 It is often used when an application has a large number of top-level destinations (five or more) or when there are multiple levels of navigation hierarchy that don't fit well into a tab bar.17 By hiding secondary navigation options, the drawer helps declutter the main screen, allowing content to take precedence.18
   The selection of a navigation pattern is a critical design decision driven by the application's information architecture and the intended user journey. Many complex applications effectively combine these patterns; for instance, it is common to have a stack navigator nested within each screen of a tab navigator, allowing users to navigate hierarchically within a specific application section.2
   1.3. Introduction to Key Libraries: React Navigation & Expo Router
   To implement these navigation patterns in React Native, developers primarily rely on dedicated libraries. The two most prominent solutions within the ecosystem are React Navigation and Expo Router:
   React Navigation: This is the most widely adopted navigation solution within the React Native community.1 It is a standalone library providing a comprehensive suite of pre-built, highly customizable navigators for implementing stack, tab, drawer, and other patterns.1 React Navigation follows a configuration-first approach, where the navigation structure is defined programmatically using its API.26 It is compatible with both Expo-managed and bare React Native projects, offering flexibility in project setup.25 Version 6 (v6) is a recent major version, although version 7 is now available.27
   Expo Router: Developed by the Expo team, Expo Router offers a different paradigm based on file-system routing.26 It automatically generates routes based on the files and directories within a designated app folder. Expo Router is built on top of React Navigation, leveraging its underlying components and capabilities but providing a convention-over-configuration approach.26 It aims to simplify navigation setup, particularly for common patterns and within the Expo ecosystem.25 Version 3 (v3) is relevant in the context of recent Expo SDKs like 52 and 53.30
   React Native Navigation (Wix): While React Navigation and Expo Router are the focus, it's worth noting an alternative: react-native-navigation by Wix.2 This library takes a different approach by providing 100% native platform navigation components (e.g., using UINavigationController on iOS and Fragment on Android directly).32 This can potentially offer superior performance and a more authentic native feel but involves a different setup and API compared to the JavaScript-based solutions.32
   The choice between React Navigation and Expo Router often represents a core decision point for developers. React Navigation offers maximum flexibility, fine-grained control, and broader applicability, suitable for complex applications or bare React Native projects. Expo Router provides a streamlined, convention-based experience tightly integrated with the Expo platform, potentially accelerating development for standard layouts but with potentially less flexibility for highly custom scenarios. react-native-navigation presents a third option focused purely on native performance.
2. Core Technologies & Version Landscape
   Navigating the version landscape of React Native, Expo, and associated navigation libraries is crucial due to the rapid release cycles and potential for compatibility issues. Understanding the interplay between these components is essential for stable development.
   2.1. React Native Version Notes
   The version of React Native used in a project directly impacts the compatibility and feature availability of navigation libraries and their dependencies.
   Recent Versions: React Native 0.79 was highlighted as a stable release featuring performance improvements, faster Metro startup times, stable support for package exports, changes to JavaScriptCore (JSC) handling (moving to a community package), and updates to native module registration for better Swift compatibility.34 Community feedback indicated that patch version 0.79.2 was considered stable.35 Prior versions like 0.78 and 0.77 were also mentioned.35
   Expo SDK Alignment: Expo SDK 52 specifically requires React Native 0.76.30 This tight coupling means upgrading one often necessitates upgrading the other.
   Library Requirements: Navigation libraries often specify minimum React Native versions. React Navigation v7, for instance, requires React Native 0.72.0 or higher.40 This implies that React Navigation v6, the focus of this module, likely supports versions at or below this threshold but benefits from features or fixes in newer RN releases.
   Dependency Compatibility (react-native-screens): Core dependencies like react-native-screens (which provides native navigation primitives used by React Navigation) have strict compatibility requirements tied to the React Native version and the rendering architecture (Paper or Fabric).33 For example, with the traditional Paper architecture, react-native-screens v4.9.0+ is needed for RN 0.76+, while v4.0.0+ suffices for RN 0.72+.33 The requirements differ when using the New Architecture (Fabric).33
   New Architecture (Fabric): The gradual rollout of React Native's New Architecture (Fabric) adds another layer of complexity. Libraries need to explicitly support Fabric. Expo SDK 52 enables Fabric by default for new projects 30, and react-native-screens has specific version requirements for Fabric compatibility.33
   The choice of React Native version is therefore a critical first step, constraining the compatible versions of navigation libraries and their underlying native dependencies. The ongoing transition to the New Architecture necessitates careful checking of library support for Fabric if opting into the new renderer.
   2.2. Expo SDK Version Notes
   The Expo SDK bundles specific versions of React Native and various Expo libraries, aiming to provide a cohesive development environment. However, its rapid release schedule introduces significant challenges.
   Release Cadence and Stability: Recent SDK releases, particularly SDK 53, encountered stability issues and library compatibility problems shortly after launch.28 Users reported crashes, build errors (especially with native modules like react-native-svg or when integrating Expo Router 35), and inconsistencies.36 This led some developers to delay upgrades or prefer sticking with the slightly older SDK 52, which itself had initial stabilization phases.36
   SDK 52 Details: Expo SDK 52 uses React Native 0.76.30 It also raised the minimum deployment targets to iOS 15.1 and Android SDK 24 (compile SDK 35).30 A major highlight was enabling the New Architecture (Fabric) by default for new projects created with create-expo-app, although existing projects upgrading to SDK 52 could opt-in.30
   Expo Go Limitations: A significant factor forcing upgrades is the limited lifespan of Expo Go support for older SDKs. Expo Go for SDK 52 and higher only supports the New Architecture.30 Furthermore, Expo Go eventually drops support for older SDKs entirely (e.g., support for SDK 52 was removed), compelling developers using Expo Go for testing to either upgrade their project's SDK or switch to using development builds.46
   Dependency Management: The tight coupling within the Expo SDK means that upgrading the SDK often forces upgrades of numerous dependencies. Managing these dependencies and ensuring compatibility, especially with third-party libraries not yet updated for the latest SDK, is a common pain point.42 Using npx expo install <package> is strongly recommended over npm install or yarn add as it attempts to install compatible versions.44 Tools like expo-doctor can help identify inconsistencies.44 Some developers find the upgrade process so difficult that they resort to creating a new project with the target SDK version and manually migrating their codebase.43
   Expo Router Integration: Expo Router became the default navigation library included in new projects created via create-expo-app starting with SDK 50.28 Expo Router v3 appears to be the version associated with SDK 52/53, and notably, the Expo SDK 52 release notes mention that Expo Router began using React Navigation v7 internally.30
   The Expo ecosystem presents a trade-off: it simplifies initial setup and abstracts away native complexities, but its rapid release cycle and bundled dependencies can lead to significant friction during upgrades. Developers must be prepared for potential instability with new releases and carefully manage dependencies, often relying on Expo-specific tooling and sometimes needing complex migration strategies. The limited Expo Go support window further pressures adoption of newer SDKs.
   2.3. Table: Key Library Version Compatibility (Targeting Expo SDK 52 / RN 0.76)
   The following table provides a reference for potentially compatible library versions when targeting an environment based on Expo SDK 52, which uses React Native 0.76. Note that specific patch versions can be crucial, and thorough testing is always recommended. Compatibility can also depend on whether the New Architecture (Fabric) is enabled.

Category
Library
Recommended Version (Expo SDK 52 / RN 0.76)
Notes
Snippets
Expo SDK
expo
~52.0.x
Base SDK version.
30
React Native
react-native
0.76.x
Required by Expo SDK 52.
30
React Navigation (Core)
@react-navigation/native
^6.x
Base package for v6. Specific latest v6 patch needed (e.g., @react-navigation/core@6.4.17 was latest core patch 48).
48

@react-navigation/stack
^6.x
Stack navigator for v6.
9

@react-navigation/bottom-tabs
^6.x
Bottom Tabs navigator for v6.
16

@react-navigation/drawer
^6.x
Drawer navigator for v6.
23
Expo Router
expo-router
~3.x
Version aligned with SDK 52/53, uses React Nav v7 internally..3038
30
Dependencies
react-native-screens
~4.9.0 (Paper) / ~4.0.0 (Fabric)
Version depends on RN 0.76 and architecture.33 Use expo install.
1

react-native-safe-area-context
Use expo install recommended version
Required peer dependency for React Navigation.
1

react-native-gesture-handler
~2.12.0 (Check expo install recommendation)
Required for Stack/Drawer Navigators. Version mentioned in 46 context, verify with expo install.
8

react-native-reanimated
~2.14.4 / ^3.x (Check expo install recommendation)
Required for Drawer Navigator (v2+), potentially used by Stack. Version mentioned in 46 context, verify with expo install.
23

expo-linking
Use expo install recommended version
Used by Expo Router for deep linking.
51

expo-constants
Use expo install recommended version
Used by Expo Router.
51

expo-status-bar
Use expo install recommended version
Common utility, installed with Expo Router setup.
51

Note: Always prioritize versions recommended by npx expo install <package-name> for your specific Expo SDK version, as this tool attempts to resolve compatible dependencies.
This table serves as a crucial starting point for setting up a development environment for this course module, consolidating scattered version information and directly addressing the compatibility challenges frequently encountered by developers in the React Native and Expo ecosystems. 3. React Navigation v6 In-Depth
React Navigation v6 provides a robust and flexible solution for implementing navigation in React Native applications. This section delves into its installation, core concepts, and the specifics of its primary navigator types.
3.1. Installation & Setup (Expo vs. Bare)
The installation process for React Navigation v6 differs depending on whether the project uses the Expo managed workflow or is a bare React Native project.
Core Dependencies:
Regardless of the workflow, the foundational package @react-navigation/native is required.1 Additionally, two essential peer dependencies must be installed: react-native-screens (for native screen optimizations) and react-native-safe-area-context (for handling safe area insets on devices like iPhones with notches).1
Expo Managed Workflow Installation:
For projects managed by Expo, the installation is streamlined using the Expo CLI. The recommended command installs the core library and its peer dependencies, ensuring versions compatible with the project's Expo SDK version 1:
npx expo install @react-navigation/native@^6.x react-native-screens react-native-safe-area-context
Expo handles the necessary native linking automatically.
Bare React Native Workflow Installation:
For bare React Native projects, dependencies are typically installed using npm or Yarn 1:
npm install @react-navigation/native@^6.x react-native-screens react-native-safe-area-context
or
yarn add @react-navigation/native@^6.x react-native-screens react-native-safe-area-context
Additional steps are required for bare projects:
iOS: CocoaPods must be installed. After adding the dependencies, navigate to the ios directory and run npx pod-install ios (or pod install) to link the native modules.1
Android: Manual modifications are needed to prevent crashes related to activity restarts. In android/app/src/main/java/<your-package-name>/MainActivity.java (or .kt), add the following override method within the MainActivity class 52:
Java
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(null); // Modified line
}
(Kotlin syntax will differ slightly). Additionally, ensure the MainActivity has android:launchMode="singleTask" in the android/app/src/main/AndroidManifest.xml file.52
Navigator-Specific Dependencies:
React Navigation's navigators (Stack, Tabs, Drawer) are distributed as separate packages and must be installed individually as needed.8
@react-navigation/stack
@react-navigation/bottom-tabs
@react-navigation/drawer
Furthermore, the Stack and Drawer navigators have dependencies on react-native-gesture-handler for gesture interactions (like swipe-to-go-back or opening the drawer) and potentially react-native-reanimated (version 2 or 3 is required for the Drawer navigator) for animations.8 Installing these involves:
Adding the packages (npx expo install... for Expo, npm install... / yarn add... for bare).
Conditionally importing react-native-gesture-handler at the very top of the app's entry file (index.js or App.js) to avoid production crashes.8
Configuring the Reanimated Babel plugin in babel.config.js.23
Running npx pod-install ios for bare iOS projects.8
The significant difference in setup complexity between Expo managed and bare workflows is evident. Expo abstracts many native configuration details, simplifying the process for developers. However, this abstraction means developers working with bare React Native must handle these native integration steps manually, requiring a deeper understanding of the underlying platforms. The additional dependencies for gesture and animation libraries further complicate the setup for Stack and Drawer navigators.
3.2. Fundamental Concepts
React Navigation v6 operates on a set of core concepts that define its structure and programming model:
NavigationContainer: This component acts as the root of the navigation structure.1 It is responsible for managing the application's navigation state and connecting the navigator hierarchy to the device environment (handling deep links, back button behavior, etc.). It is essential to wrap the entire navigator setup within a single NavigationContainer at the application's entry point.1
Navigators: These are functions provided by the library (e.g., createNativeStackNavigator, createBottomTabNavigator, createDrawerNavigator) that, when called, return an object containing two components: a Navigator component and a Screen component.1 The Navigator component (e.g., Stack.Navigator) serves as a container that defines a specific navigation pattern (Stack, Tabs, Drawer) and holds the screens belonging to that pattern.
Screens: These represent the individual views or pages within the application that users navigate between. They are defined using the Screen component provided by the specific navigator (e.g., Stack.Screen, Tab.Screen, Drawer.Screen) nested inside the corresponding Navigator component.1 Each Screen requires at minimum:
name: A unique string identifying the route. This name is used programmatically when navigating to this screen.1
component: The React component that should be rendered when this route is active.1 It's crucial to pass the component reference directly, not an inline function, to avoid performance issues.50
options (optional): An object or function returning an object used to configure the screen's appearance and behavior within the navigator (e.g., header title, tab icon).1
navigation prop: Every component rendered as a Screen automatically receives a navigation prop.1 This prop is the primary interface for triggering navigation actions. It contains methods like navigate('RouteName', { params }) to go to another screen, goBack() to return to the previous screen, setParams({ newParams }) to update the current screen's parameters, and setOptions({ newOptions }) to update the screen's configuration dynamically.1
route prop: Alongside the navigation prop, screen components also receive a route prop.50 This prop holds information specific to the current route instance, most importantly route.name (the name defined in the Screen component) and route.params (an object containing parameters passed to this screen during navigation).50
This component-based, explicit configuration model requires developers to define their navigation structure programmatically. This provides a high degree of control and flexibility but contrasts with the convention-based, file-system approach used by Expo Router.
3.3. Navigation State Overview
React Navigation manages the application's navigation state internally, representing the current structure and history of visited screens.
State Management: The NavigationContainer is the central manager for this state object.50
State Structure: While the exact internal structure is considered an implementation detail and subject to change, the core accessible properties are index and routes.54 The routes property is typically an array representing the screens currently in the navigator's stack or list, and index points to the currently active route within that array.54 For nested navigators, the state object itself becomes hierarchical. Direct manipulation or reliance on properties beyond index and routes is strongly discouraged to avoid breakage in future updates.54
Accessing State:
navigation.getState(): This method, available on the navigation prop, returns a snapshot of the current navigation state for the navigator that the screen belongs to. However, it does not trigger component re-renders if the state changes later.54 It's mainly useful within event listeners or callbacks where immediate reactivity isn't needed.54
useNavigationState Hook: This hook is the recommended way to access navigation state reactively within a component. It accepts a selector function that receives the full state and returns a specific piece of data (e.g., state => state.index). The component will only re-render if the value returned by the selector changes, optimizing performance.54 Passing state => state will return the whole state object and cause re-renders on any state change.54
Immutability: React Navigation relies on the immutability of the navigation state to detect changes and update the UI correctly. Directly mutating the state object can lead to unpredictable behavior and bugs, and was never a supported pattern.40 Version 7 introduced freezing the state object in development mode to explicitly prevent accidental mutations 40, reinforcing the importance of treating the state as immutable even in v6.
The library provides controlled ways to interact with and observe the navigation state (navigation prop methods, useNavigationState hook) while abstracting the complexities of state transitions and internal management. Developers should work through these official APIs rather than attempting to directly manipulate the underlying state object.
3.4. Passing Parameters
Passing data between screens is a fundamental requirement for building dynamic applications. React Navigation v6 provides a clear mechanism for this using route parameters.
Passing Parameters: When triggering navigation using navigation.navigate(), parameters can be included as an object in the second argument.53
JavaScript
navigation.navigate('UserDetails', { userId: 123, source: 'Feed' });
Here, 'UserDetails' is the target route name, and the object contains the parameters userId and source being passed.
Accessing Parameters: In the component rendered for the 'UserDetails' screen, the passed parameters are available via the route.params object, which is part of the route prop automatically supplied to the screen.53
JavaScript
function UserDetailsScreen({ route }) {
const { userId, source } = route.params;
// Now userId is 123 and source is 'Feed'
//... render component using params
}

Initial Parameters: Default parameters can be provided for a screen using the initialParams prop on the corresponding Screen component definition.53 These are used if no parameters are passed during navigation or are shallow-merged with passed parameters.
JavaScript
<Stack.Screen
name="UserDetails"
component={UserDetailsScreen}
initialParams={{ userId: 0, source: 'Unknown' }}
/>

Updating Parameters: A screen can update its own parameters using the navigation.setParams() method.53 This merges the provided parameters with the existing ones.
JavaScript
navigation.setParams({ source: 'Profile' }); // Updates only the source param
Note that setParams is generally not intended for updating screen options (like the header title); navigation.setOptions() should be used for that purpose.53
Passing Parameters Back: Data can be passed back to a previous screen by navigating to it with parameters. If the target screen already exists in the stack, navigate effectively acts like goBack but allows passing params.53 The receiving (previous) screen would typically use a React.useEffect hook listening to changes in route.params to react to the returned data.53
JavaScript
// In Screen B, navigating back to Screen A with data
navigation.navigate({
name: 'ScreenA',
params: { resultData: 'some value' },
merge: true, // Important to merge params
});

// In Screen A
React.useEffect(() => {
if (route.params?.resultData) {
// Process resultData
}
},);

Nested Navigators: To pass parameters to a screen within a nested navigator, the navigate call must specify the parent navigator's name, the target screen within it, and the params.53
JavaScript
navigation.navigate('AccountTabs', { // Parent Navigator name
screen: 'Settings', // Target screen name inside parent
params: { user: 'Jane' }, // Params for the target screen
});

Best Practices: It is strongly recommended that parameters are JSON-serializable (plain objects, strings, numbers, booleans, arrays of serializable values).53 This ensures compatibility with features like state persistence and deep linking. Passing complex object instances or functions as params should be avoided. Instead of passing large data objects, it's often better to pass only an identifier (e.g., userId), and let the destination screen fetch the required data using that ID, potentially utilizing a global state management solution for shared data.53
Parameter passing is thus a vital mechanism for creating context-aware navigation flows, allowing screens to display relevant information based on how the user arrived there.
3.5. Stack Navigator (@react-navigation/stack)
The Stack Navigator is arguably the most common navigator type, managing screens in a hierarchical stack.2
Installation: Requires installing @react-navigation/stack and its dependency react-native-gesture-handler. Optionally, @react-native-masked-view/masked-view is needed for specific UIKit-style header animations.8 Setup follows the steps outlined in Section 3.1, including conditional imports and pod installation for bare projects.
Usage: Import createStackNavigator from @react-navigation/stack. Call it to get the Stack object containing Stack.Navigator and Stack.Screen components.8 Define screens within Stack.Navigator.
JavaScript
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function AppStack() {
return (
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
);
}

Header Configuration: The header bar displayed by the Stack Navigator is highly customizable via the options prop on Stack.Screen or the screenOptions prop on Stack.Navigator.8 Common options include:
title: Sets the header title.8
headerStyle: Styles the header container (e.g., backgroundColor).8
headerTintColor: Sets the color for the title and back button.8
headerTitleStyle: Styles the title text.8
headerShown: Boolean to show/hide the header (default true).8
headerBackTitleVisible: Boolean to show/hide the back button title on iOS.8 (Note: Replaced by headerBackButtonDisplayMode in v7 40).
headerLeft: Function returning a React element for the left side (e.g., custom back button).8
headerRight: Function returning a React element for the right side (e.g., action button).8
header: Function returning a completely custom header component.8
Animation & Presentation: The presentation option (formerly mode in older versions, deprecated in v6 40) controls the screen's presentation style (e.g., 'card', 'modal', 'transparentModal') affecting animations and appearance.8 Header animation styles can also be customized.
The Stack Navigator provides the fundamental LIFO navigation pattern essential for drilling down into content or progressing through steps. Its extensive configuration options allow developers to tailor the appearance and behavior, particularly the header, to match platform conventions or custom designs. The reliance on react-native-gesture-handler enables native-like swipe gestures.
3.6. Bottom Tabs Navigator (@react-navigation/bottom-tabs)
This navigator implements the common pattern of a tab bar at the bottom of the screen for switching between primary application sections.10
Installation: Requires installing @react-navigation/bottom-tabs after setting up the core React Navigation packages.16
Usage: Import createBottomTabNavigator from @react-navigation/bottom-tabs. Call it to get the Tab object containing Tab.Navigator and Tab.Screen components.16 Define tabs as Tab.Screen instances within Tab.Navigator.
JavaScript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function AppTabs() {
return (
<Tab.Navigator>
<Tab.Screen name="Feed" component={FeedScreen} />
<Tab.Screen name="Messages" component={MessagesScreen} />
</Tab.Navigator>
);
}

Configuration: Customization is done via options on Tab.Screen or screenOptions on Tab.Navigator. Key options include 15:
tabBarLabel: Text label for the tab.
tabBarIcon: Function returning a React element for the tab icon. Receives { focused: boolean, color: string, size: number }.
tabBarBadge: String or number to display a notification badge on the icon.
tabBarActiveTintColor, tabBarInactiveTintColor: Colors for active/inactive labels and icons.
tabBarActiveBackgroundColor, tabBarInactiveBackgroundColor: Background colors for active/inactive tabs.
tabBarStyle: Styles for the tab bar container.
tabBarItemStyle: Styles for individual tab item containers.
tabBarShowLabel: Boolean to show/hide labels (default true).
tabBarHideOnKeyboard: Boolean to hide the tab bar when the keyboard is open (default false in v7, true in v4 15).
tabBar: Function returning a completely custom tab bar component. Receives state, descriptors, navigation.
Lazy Loading: By default, screens associated with tabs are lazily loaded – they are not mounted until the user navigates to them for the first time.15 This can be disabled with the lazy={false} option.
Deprecated Options: In v6, many options were grouped under tabBarOptions. This was deprecated and replaced by individual options in v7.40
Native Alternative: For a more platform-authentic look and feel, the separate react-native-bottom-tabs library integrates native iOS (TabView) and Android (BottomNavigationView) components with React Navigation.27 This offers platform-specific styling (like iOS blur, Material You theming) and adapts layout across different devices (iPadOS, tvOS, visionOS, macOS) but restricts icon customization (requires image assets, SF Symbols, or URIs instead of arbitrary React components).27
The standard @react-navigation/bottom-tabs provides a highly customizable JavaScript-based implementation suitable for most use cases. However, for projects prioritizing native fidelity and performance, especially across multiple Apple/Android platforms, the react-native-bottom-tabs alternative presents a compelling option, albeit with different customization constraints.
3.7. Drawer Navigator (@react-navigation/drawer)
The Drawer Navigator implements a slide-out menu, typically used for accessing a larger number of primary destinations or secondary features.17
Installation: Requires installing @react-navigation/drawer and its dependencies react-native-gesture-handler and react-native-reanimated (v2 or v3).23 Setup follows the steps in Section 3.1.
Usage: Import createDrawerNavigator from @react-navigation/drawer. Call it to get the Drawer object containing Drawer.Navigator and Drawer.Screen components.23 Define screens within Drawer.Navigator.
JavaScript
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

function AppDrawer() {
return (
<Drawer.Navigator initialRouteName="Dashboard">
<Drawer.Screen name="Dashboard" component={DashboardScreen} />
<Drawer.Screen name="Settings" component={SettingsScreen} />
</Drawer.Navigator>
);
}

Configuration: Options are set via options on Drawer.Screen or screenOptions on Drawer.Navigator. Key options include 23:
drawerLabel: Text label for the item in the drawer.
drawerIcon: Function returning a React element for the item's icon. Receives { focused: boolean, color: string, size: number }.
drawerActiveTintColor, drawerInactiveTintColor: Colors for active/inactive items.
drawerActiveBackgroundColor, drawerInactiveBackgroundColor: Background colors for active/inactive items.
drawerItemStyle, drawerLabelStyle: Styles for drawer items and labels.
drawerStyle: Styles for the drawer container itself (e.g., width, backgroundColor).
drawerType: Determines drawer animation/behavior (front, back, slide, permanent).
drawerPosition: Side from which the drawer appears (left or right).
swipeEnabled: Boolean to enable/disable swipe gesture to open/close.
headerShown: Boolean to show/hide the default header for screens within the drawer.
Custom Drawer Content: The drawerContent prop on Drawer.Navigator allows providing a custom component to render the entire drawer's content.23 This is useful for adding headers, footers, user information, or other non-navigation elements. Helper components like DrawerContentScrollView (handles safe areas and scrolling), DrawerItemList (renders the standard list of navigation items), and DrawerItem (renders a single customizable item) are available from @react-navigation/drawer to facilitate building custom content.23 The custom component receives props including navigation and state.
Deprecated Options: Similar to tabs, v6 grouped many options under drawerContentOptions, which was deprecated and replaced by individual options in v7.40
The Drawer Navigator is essential for organizing applications with numerous sections. Its ability to be customized via the drawerContent prop makes it highly versatile for incorporating branding and additional functionality beyond simple navigation links. Its reliance on gesture and animation libraries is fundamental to its interactive nature. 4. Expo Router v3 In-Depth
Expo Router introduces a file-system-based approach to routing in React Native, aiming to simplify navigation setup, especially within the Expo ecosystem. It builds upon React Navigation, translating file conventions into navigation components.
4.1. Installation & Setup (Targeting Expo SDK 52)
Setting up Expo Router can be done when creating a new project or by adding it to an existing one.
New Project (Recommended): The quickest way is to use create-expo-app with a template that includes Expo Router, such as the default or tabs template.51
npx create-expo-app@latest --template tabs
Manual Installation (Existing Expo SDK 52 Project): For adding Expo Router to an existing project (assumed to be Expo SDK 52 based on the course context), follow these steps 51:
Install Dependencies: Use npx expo install to ensure compatible versions are added for your SDK: npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
Set Entry Point: Modify package.json to point the main field to the Expo Router entry point:
JSON
{
"main": "expo-router/entry"
}
The initial file loaded by this entry point will be app/\_layout.tsx.51 For custom initialization logic (like setting up analytics or polyfills before the app renders), create a custom entry file (e.g., index.js), perform setup there, and end the file with import 'expo-router/entry';. Then, update the main field in package.json to point to this custom file (e.g., "main": "index.js").51
Configure app.json:
Add a scheme for deep linking: { "expo": { "scheme": "your-app-scheme" } }.51
For web support, install react-native-web and react-dom (npx expo install react-native-web react-dom) and enable the Metro bundler for web: { "expo": { "web": { "bundler": "metro" } } }.51
Configure babel.config.js: Ensure the Babel configuration uses the babel-preset-expo. If the file exists, modify it; otherwise, creating it or deleting it (to use the default) is sufficient 51:
JavaScript
module.exports = function(api) {
api.cache(true);
return {
presets: ['babel-preset-expo'],
};
};

Clear Cache: Run the development server with the clear flag: npx expo start --clear.51
Update Resolutions (If Upgrading): If upgrading from an older Expo Router version, remove any specific resolutions or overrides for metro, metro-resolver, or react-refresh in package.json.51
Compatibility Considerations (SDK 52): While these steps outline the process, practical experience suggests potential friction. Users have reported build failures when adding expo-router to projects downgraded to SDK 52, specifically related to missing Gradle plugins (expo-module-gradle-plugin) required by dependencies like expo-linking.45 This underscores the importance of ensuring all dependencies align correctly with the specific SDK patch version and potentially needing manual troubleshooting even when using expo install. As noted previously, Expo Router v3 seems most relevant for SDK 52, likely using React Navigation v7 internally.30
While create-expo-app offers the simplest path, manual installation requires careful configuration across multiple project files. The tight coupling with the Expo SDK version makes compatibility a critical factor, potentially requiring more effort than the documented steps suggest, especially when dealing with specific patch versions or downgrades.
4.2. Fundamental Concepts (File-based Routing, Layouts)
Expo Router's core paradigm revolves around using the file system to define the navigation structure.
File-based Routing: All navigable screens (routes or pages) within the application are represented by files (typically .tsx or .jsx) located inside the app directory (or optionally src/app).29 Any file within this directory that exports a default React component is treated as a distinct route.29 Components, hooks, or utilities not intended as routes should reside outside the app directory.29
URL Mapping: A direct mapping exists between the file's path relative to the app directory and the URL used to access that route.29 For instance, app/user/profile.tsx corresponds to the URL /user/profile. This inherent URL mapping enables universal deep linking by default.29
Layout Routes (\_layout.tsx): These special files define the navigational structure and shared UI for a specific directory segment.29 A \_layout.tsx file exports a default component that typically renders a navigator component (like Stack, Tabs, or Drawer) or uses the Slot component to render the matched child route within a custom layout structure (e.g., adding a persistent header/footer).59 The layout component wraps the content of the files/subdirectories within its directory.
Root Layout (app/\_layout.tsx): This is the most crucial layout file, residing directly within the app directory.29 It serves as the application's navigation entry point, defining the top-level navigator. It also replaces the traditional role of App.js or App.tsx for global setup tasks like loading fonts, initializing context providers, or interacting with the splash screen before the navigation UI renders.29
Index Routes (index.tsx): A file named index.tsx within any directory acts as the default route for that segment.29 For example, accessing /user would render app/user/index.tsx. The application's initial route upon launch is the first index.tsx file found that matches the root URL /, considering any route groups.29
Route Groups ((group-name)): Directories whose names are enclosed in parentheses, like (tabs), serve to organize routes structurally without adding segments to the URL path.29 This is commonly used to group screens belonging to a specific layout (e.g., all tabs within (tabs)) while allowing the routes within the group to be accessed directly (e.g., /home instead of /tabs/home).
Slot Component (<Slot />): When a \_layout.tsx file defines a custom layout structure without using a built-in navigator component (Stack, Tabs, Drawer), the <Slot /> component is used within that layout to specify where the matched child route component should be rendered.59 If a navigator component is used, it handles the rendering of its children implicitly.
Underlying Mechanism: It's important to remember that Expo Router translates this file structure into standard React Navigation components and configurations behind the scenes.29 This means that concepts and configuration options from React Navigation (like screen options) are often directly applicable to Expo Router layouts.29
Expo Router offers a distinct developer experience centered around file system conventions. This abstraction layer simplifies the definition of routes and layouts compared to React Navigation's programmatic approach. Mastering the roles of \_layout.tsx, index.tsx, route groups, and the underlying connection to React Navigation is key to effectively using Expo Router.
4.3. Implementing Layouts (Stack, Tabs, Drawer)
Implementing common navigation patterns in Expo Router follows a consistent approach using \_layout.tsx files.
Stack Layout: This is the default navigation behavior if no \_layout.tsx is present in a directory.62 To explicitly define a stack navigator and configure it, create a \_layout.tsx file within the desired directory (e.g., app/products/\_layout.tsx). This file should export a default component that returns the <Stack /> component from expo-router.59 Files within this directory automatically become screens in the stack. Screen-specific options (like header title or visibility) are configured by adding <Stack.Screen name="route-name" options={{...}} /> components as children of the <Stack /> component, where name matches the corresponding filename.59
Tabs Layout: To create a tab bar, typically a route group directory is used (e.g., app/(tabs)). Inside this directory, create a \_layout.tsx file that exports a component returning the <Tabs /> component from expo-router.61 Individual tabs are defined using <Tabs.Screen name="route-name" options={{...}} /> components nested within <Tabs />. The name prop corresponds to the filename of the screen component (e.g., name="index" for index.tsx, name="settings" for settings.tsx). The options prop is used to configure the tab's appearance, such as title (label in the tab bar) and tabBarIcon.61 Tabs can be programmatically hidden from the bar by setting href: null in their options.61
Drawer Layout: Implementing a drawer requires installing additional dependencies: @react-navigation/drawer, react-native-gesture-handler, and react-native-reanimated.24 Create a \_layout.tsx file (often the root app/\_layout.tsx if the drawer is global). This file should export a component that returns the <Drawer /> component from expo-router/drawer. Crucially, the entire drawer layout must be wrapped in a <GestureHandlerRootView> component from react-native-gesture-handler to enable swipe gestures.24 Drawer items are configured using <Drawer.Screen name="route-name" options={{...}} /> components inside <Drawer />. Options like drawerLabel and title (for the header) can be set here.24
The implementation pattern is consistent: the \_layout.tsx file within a directory defines the navigator (Stack, Tabs, Drawer) that governs the routes (files) within that directory. Configuration is applied using nested Screen components within the navigator component, leveraging the options available from the underlying React Navigation navigators.
4.4. Passing Parameters
Expo Router facilitates passing data between routes primarily through URL path segments and query parameters, aligning closely with web routing conventions.
Methods of Passing: Parameters are embedded within the href prop of the <Link /> component or as arguments to imperative navigation functions like router.navigate() or router.push().62
Dynamic Route Parameters: For routes defined with dynamic segments (e.g., app/posts/[postId].tsx), the value for the segment is included directly in the path.62
JavaScript
// Link component

<Link href="/posts/123">View Post 123</Link>

// Imperative navigation
router.push('/posts/123');

Query Parameters: Additional parameters can be passed as query strings appended to the URL or using a params object.62
JavaScript
// Query string in href

<Link href="/search?q=react&sort=date">Search</Link>

// Using params object with Link

<Link href={{ pathname: '/search', params: { q: 'react', sort: 'date' } }}>Search</Link>

// Query string with navigate
router.navigate('/search?q=react&sort=date');

// Using params object with navigate
router.navigate('/search', { q: 'react', sort: 'date' });
Any key in the params object that does not match a dynamic segment in the pathname is treated as a query parameter.62
Accessing Parameters: In the destination screen component, all parameters (both from dynamic route segments and query strings) are accessed using the useLocalSearchParams() hook provided by expo-router.62 This hook returns an object where keys are the parameter names and values are the corresponding string values from the URL.
JavaScript
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function PostScreen() {
// For route /posts/123?showComments=true
const { postId, showComments } = useLocalSearchParams();
// postId will be "123", showComments will be "true"
return <Text>Post ID: {postId}, Show Comments: {showComments}</Text>;
}

Updating Parameters: To modify query parameters on the current route without triggering a full navigation transition, the router.setParams() method can be used.62 This is useful for implementing features like filtering or pagination where the URL should reflect the state change.
JavaScript
// Assuming current route is /search?q=react
router.setParams({ sort: 'relevance' }); // Updates URL to /search?q=react&sort=relevance

Expo Router's parameter passing mechanism is intrinsically linked to the URL structure generated by its file-based routing. The useLocalSearchParams hook offers a convenient and unified API for retrieving these parameters within screen components, differing from React Navigation's approach of accessing parameters via the route.params prop.
4.5. Deep Linking Configuration
Deep linking allows users to open specific screens within an application directly from an external URL. Expo Router simplifies this process considerably due to its inherent URL mapping.
Automatic Support: Because every route in Expo Router corresponds directly to a URL path based on its file location, deep linking is supported universally by default.29 Any valid route path can potentially be used as a deep link.
Scheme Configuration: The primary configuration step is defining a custom URL scheme for the application in the app.json file.51 This is done by adding the scheme property within the expo object:
JSON
{
"expo": {
"scheme": "mycoolapp"
}
}
After adding or changing the scheme, a new development build is required for it to take effect.58 This configuration allows the app to be opened using URLs like mycoolapp://profile/settings. If no scheme is provided, Expo uses the android.package and ios.bundleIdentifier by default.58
Handling Incoming Links: Expo Router automatically handles incoming deep links based on the configured scheme and the file structure within the app directory.58 It maps the path part of the URL (e.g., /profile/settings in mycoolapp://profile/settings) to the corresponding file route (e.g., app/profile/settings.tsx) and navigates the user there. Manual handling using expo-linking APIs like Linking.useURL() is generally unnecessary when using Expo Router.58
Testing Deep Links: The npx uri-scheme command-line tool can be used to simulate opening deep links during development 58: npx uri-scheme open mycoolapp://profile/settings --ios For testing within the Expo Go app, which uses the exp:// scheme, the format includes /--/ before the app path 58: npx uri-scheme open exp://<expo-go-address>/--/profile/settings --ios
Preserving Back Stack: When a user deep links into a nested screen, it's often desirable for the back button to navigate through the logical parent screens rather than exiting the app immediately. Expo Router allows configuring this using the initialRouteName option within the \_layout.tsx file of the relevant navigator segment.62 Setting initialRouteName ensures that the specified screen within that layout is loaded onto the stack before the deep-linked screen, creating a more natural back navigation history.62
Deep linking is treated as a core, built-in feature in Expo Router, significantly reducing the setup and handling complexity compared to manual implementations often required with other navigation solutions. The file structure itself defines the deep link targets, requiring only the scheme configuration to enable the functionality.
4.6. Conceptual Link: File Structure to Navigation State
While developers using Expo Router primarily interact with the file system to define routes and layouts, it's crucial to understand how this structure relates to the underlying navigation state managed by React Navigation.
File Structure as State Definition: The arrangement of files and \_layout.tsx files within the app directory serves as a declarative definition of the application's possible navigation states and the relationships between them.29 Directories establish hierarchy, \_layout.tsx files specify the type of navigator (Stack, Tabs, Drawer) governing that hierarchy level 59, and individual files represent the leaf nodes (screens) in the navigation tree.
Translation to React Navigation: Expo Router acts as a translation layer at build time or runtime. It parses the file structure and generates the corresponding programmatic configuration required by React Navigation's core components (NavigationContainer, Stack.Navigator, Tab.Navigator, etc.).29
Internal State Management: The actual runtime navigation state (the current stack of screens, the active tab, the history) is still managed internally by these underlying React Navigation components, following the principles described in Section 3.3.29
Imperative Navigation: When using functions like router.navigate(), router.push(), or router.back(), these commands are effectively manipulating the internal React Navigation state machine, pushing or popping routes from the relevant navigator's state.62
In essence, Expo Router abstracts the definition of the navigation state away from explicit code and into the file system conventions. However, the runtime behavior and the state management itself still rely on the robust mechanisms of React Navigation. This abstraction simplifies the developer experience for common cases but means that for deeper debugging or understanding complex behaviors, knowledge of React Navigation's state principles remains valuable. 5. Navigation Patterns & Platform Guidelines
Implementing effective navigation involves not only choosing the right library but also applying appropriate patterns and adhering to platform-specific design conventions to ensure an intuitive and familiar user experience.
5.1. Stack, Tab, Drawer Patterns in Practice
The choice and implementation of navigation patterns directly influence how users interact with the app.
Stack: Best suited for tasks involving a sequence of steps (like a checkout or onboarding flow) or drilling down into hierarchical content (e.g., list -> detail view).2 Implemented using createStackNavigator in React Navigation or a <Stack /> layout in Expo Router. Provides a clear sense of progression and easy backward navigation.
Tabs: Ideal for presenting 3-5 primary, distinct sections of an app that users might switch between frequently.10 Implemented using createBottomTabNavigator in React Navigation or a <Tabs /> layout in Expo Router. Offers persistent, quick access to top-level destinations. For enhanced platform fidelity, consider the native tabs alternative (react-native-bottom-tabs) which uses native platform components.27
Drawer: Suitable for apps with a large number of top-level destinations (more than 5) or for housing secondary navigation items, settings, or profile links.17 Implemented using createDrawerNavigator in React Navigation or a <Drawer /> layout in Expo Router. Keeps the main interface clean by hiding less frequently accessed options.
Combining Patterns: Complex applications often require nesting navigators.2 A common example is placing a Stack Navigator within each screen of a Tab Navigator. This allows users to navigate hierarchically within a specific tab's context. Implementing nested navigation requires careful consideration of how navigation actions propagate and how state is managed across the nested structure. Type checking with TypeScript can become more complex, often requiring helper types like CompositeScreenProps in React Navigation.65
While the implementation details differ between React Navigation (programmatic configuration) and Expo Router (file-based convention), the fundamental principles of when to use each pattern remain consistent. The optimal choice depends on the application's information architecture and the desired user flow.
5.2. iOS Human Interface Guidelines (HIG)
Adhering to Apple's HIG helps ensure that React Native applications feel native and intuitive to iOS users. Key navigation guidelines include:
Navigation Styles: iOS primarily uses three navigation styles 6:
Hierarchical: Users make sequential choices screen by screen (e.g., Settings app). The standard component is the Navigation Bar at the top, displaying the current screen's title and a back button to return to the previous level.6
Flat: Users switch between distinct categories or modes (e.g., Music app). The standard component is the Tab Bar at the bottom for primary categories, or a Page Control (dots) for swiping between pages of similar content (like Weather locations).6
Content-driven: Navigation emerges from the content itself (e.g., games, books). Less reliant on standard controls.
Core Principles: Designs should prioritize Clarity (easy to understand), Deference (UI doesn't distract from content), and Depth (visual layers guide the user).66 Navigation should feel natural, predictable, and logical, without dominating the interface.6
Standard Components: Using standard iOS navigation controls (UINavigationBar, UITabBar, UIPageControl - or their React Native equivalents) is strongly encouraged for familiarity and predictability.6 React Navigation's Native Stack navigator and the react-native-bottom-tabs library aim to provide implementations that closely mimic these native components.
Consistency and Usability: Navigation paths should be clear and predictable.6 Transitions between screens should be consistent.3 Interactive elements like icons and buttons need clear iconography and sufficient touch target size and spacing to be easily tappable.3
Following these guidelines helps create applications that align with user expectations on the iOS platform, leading to a smoother and more intuitive experience.
5.3. Android Material Design 3 Guidelines
Google's Material Design system provides comprehensive guidelines for Android UI and navigation. Material 3 (M3) is the latest iteration.
Key Navigation Components (M3):
Navigation Bar: Replaces the M2 "Bottom Navigation".12 Used for 3-5 top-level destinations on compact screens.12 Features updated M3 styling (taller container, no elevation shadow by default, pill-shaped active indicator, dynamic color support).12 Icons are essential; text labels are recommended.12 Implementations exist in Jetpack Compose and MDC-Android.12 Note: Some documentation snippets may still refer to the older M2 "Bottom Navigation" component.13
Navigation Drawer: Recommended for apps with 5 or more top-level destinations or complex navigation hierarchies.19 M3 defines two types 17:
Modal Drawer: Overlays content, typically used on compact/medium screens. Dismissed by selecting an item, tapping the scrim (overlay), or swiping.19
Standard Drawer: Appears alongside content, primarily for larger (expanded) screens. Can be permanently visible or dismissible via a menu icon.20
Navigation Rail: A compact vertical navigation component suitable for medium and expanded screen sizes (tablets/desktops), often used instead of a Navigation Bar or Drawer on larger layouts.12
Top App Bar: Often contains navigation controls like a back button (Up action) or a menu icon to open a Navigation Drawer.17
Navigation Directions: Material Design defines three navigation directions 5:
Lateral: Moving between screens at the same hierarchy level (e.g., using Navigation Bar, Drawer, Rail, or Tabs).
Forward: Moving deeper into the hierarchy or through steps in a flow (e.g., tapping list items, buttons).
Reverse: Moving backward, either chronologically (system Back button) or hierarchically within the app (Up action in the Top App Bar).5
Back Stack Behavior (Android Jetpack Navigation): Android's navigation system relies heavily on the concept of a back stack managed by the NavController.69
It's a LIFO stack: navigate() pushes destinations onto the stack.69
The system Back button typically calls popBackStack(), removing the top destination.69
The Up button in the app bar usually calls navigateUp(), which also pops the stack but may have slightly different behavior based on the navigation graph hierarchy.69
popBackStack(destinationId, inclusive) allows popping multiple destinations until a specific one is reached.69
The popUpTo attribute/option used with navigation actions provides declarative control over stack manipulation during forward navigation (e.g., clearing login screens after successful login).69 State can optionally be saved and restored during pop operations, enabling patterns like multiple back stacks.69
Understanding Material Design 3 components and Android's back stack behavior is crucial for creating applications that feel native and behave predictably on Android devices. React Native navigation libraries often wrap or mimic these native components and behaviors. 6. Comparative Analysis: React Navigation vs. Expo Router
Choosing between React Navigation and Expo Router is a significant decision for React Native projects. This section compares the two libraries across key aspects.
6.1. Architectural Differences
The most fundamental difference lies in their core architectural approach to defining navigation:
React Navigation: Employs a configuration-first or programmatic architecture.25 Developers explicitly define navigator components (Stack.Navigator, Tab.Navigator, etc.) and screen components (Stack.Screen, Tab.Screen, etc.) within their JavaScript/TypeScript code using the library's provided APIs. This approach offers maximum control and explicitness over the navigation structure.
Expo Router: Utilizes a file-based architecture, adopting a convention-over-configuration philosophy.25 The navigation structure, routes, and layouts are inferred directly from the organization of files and directories within the app folder. Special file names like \_layout.tsx and index.tsx, along with directory naming conventions like (group-name), dictate the navigation behavior.
Underlying Relationship: Despite their different approaches, Expo Router is built on top of React Navigation.26 It essentially acts as a compiler or abstraction layer that translates the file system conventions into the necessary React Navigation configurations internally.
This architectural divergence leads to different developer experiences. React Navigation requires more explicit setup but offers granular control, making the navigation logic clear within the code. Expo Router simplifies setup by relying on file system conventions, potentially reducing boilerplate but making the navigation logic implicit in the project structure.
6.2. Feature Comparison
While Expo Router leverages React Navigation, their feature sets and how features are accessed differ:
Navigator Types: Both libraries support the primary navigation patterns: Stack, Tabs, and Drawer.8 React Navigation, being the foundational library, might offer easier integration with more niche or custom-built navigators due to its programmatic API.
Customization: React Navigation provides a significantly higher degree of customization for navigator appearance, behavior, and transitions through its extensive options API.25 Expo Router offers less direct customization, relying more on the default behaviors derived from conventions. However, since it uses React Navigation underneath, many React Navigation screen options can still be applied within Expo Router's \_layout.tsx files.29
Deep Linking: Expo Router offers automatic deep linking configuration based on the file structure; only scheme definition in app.json is typically required.29 React Navigation requires manual configuration, typically involving setting up a linking prop on the NavigationContainer with mappings between URL patterns and route names/params.
Web Support: Both libraries support targeting the web platform. Expo Router's universal URL mapping based on file paths provides a potentially smoother path for web integration.29 React Navigation also supports web but might involve more explicit configuration for URL handling.27
State Management: Both libraries manage their internal navigation state. Neither replaces the need for global application state management (like Redux, Zustand, etc.) if required. React Navigation has established patterns for integrating with state management libraries like Redux.25
Type Safety (TypeScript): Both libraries support TypeScript. React Navigation requires manual type annotations for navigation props, route props, and parameters, which can become complex with nested navigators.65 Expo Router aims to simplify type checking, particularly with its static API features introduced alongside React Navigation v7.27
React Navigation offers a broader and more configurable feature set directly through its API. Expo Router simplifies the implementation of core features, especially deep linking and basic layouts, by abstracting React Navigation's capabilities through its file-based conventions.
6.3. Pros, Cons, and Use Cases
The architectural and feature differences lead to distinct advantages and disadvantages:
React Navigation:
Pros:
Maturity & Stability: Well-established library with extensive testing and a long history.25
Flexibility & Control: Offers maximum customization and fine-grained control over navigation logic and UI.25
Large Community & Resources: Benefits from vast community support, extensive documentation, tutorials, and readily available solutions.25
Ecosystem Agnostic: Works seamlessly in both Expo-managed and bare React Native projects.25
Handles Complexity Well: Explicit configuration makes managing complex, nested navigation structures more straightforward.25
Cons:
Boilerplate: Requires more code to set up navigators and screens compared to Expo Router's conventions.25
Learning Curve: The extensive API and configuration options can present a steeper learning curve, especially for beginners or simple apps.25
Use Cases: Best suited for large or complex applications, projects requiring highly customized navigation, bare React Native projects, and teams that prefer explicit configuration over convention.25
Expo Router:
Pros:
Simplicity & Speed: Easier and faster setup for common navigation patterns due to file-based conventions.25
Reduced Boilerplate: Less code required for basic navigation setup.25
Automatic Deep Linking: Simplifies deep link implementation significantly.29
Expo Integration: Tightly integrated with the Expo ecosystem and CLI.25
Good for Beginners: Lower barrier to entry for developers new to React Native navigation.25
Cons:
Less Flexible: Customization options are more limited compared to React Navigation.25
Maturity & Community: Newer library with a smaller community and potentially fewer readily available solutions for complex issues.25
Complexity Handling: Can become "hacky" or less intuitive when implementing complex or non-standard navigation patterns.26
Expo Ecosystem Tied: Primarily designed for and benefits most within Expo-managed projects.
Upgrade Path: Tightly coupled with Expo SDK releases, potentially inheriting stability issues or requiring frequent adaptation (as discussed in Section 2.2).
Use Cases: Ideal for small to medium-sized Expo projects, applications with standard navigation requirements (Stack, Tabs), rapid prototyping, projects prioritizing web support alongside native, and teams preferring convention-based development.25
The decision hinges on project requirements and team preferences. Expo Router offers an appealing, streamlined experience for standard use cases within Expo, while React Navigation provides the power and flexibility needed for more demanding or platform-agnostic projects.
6.4. Table: Feature Comparison Summary
Feature
React Navigation v6
Expo Router v3
Routing Approach
Programmatic / Configuration-First
File-based / Convention-over-Configuration
Setup Ease (Simple Apps)
Moderate (Requires explicit config)
High (Convention-driven, less boilerplate)
Setup Ease (Complex Apps)
Moderate (Explicit control can be clearer)
Moderate-to-Low (Can become complex/hacky)
Customization
High (Extensive API and options)
Medium (Relies on conventions, uses RN options underneath)
Deep Linking Setup
Manual Configuration Required
Largely Automatic (Requires scheme config)
Navigator Variety
High (Stack, Tabs, Drawer, Native Stack, + Custom)
Medium (Stack, Tabs, Drawer built-in layouts)
Community Support
Very High (Large, mature community)
Medium (Growing, but smaller than React Nav)
Ecosystem
Works in Expo & Bare RN
Primarily designed for Expo (can work in bare with setup)
Web Support
Yes (Requires configuration)
Yes (Integrated via file-based routing)
Type Safety (TS)
Good (Requires manual annotation)
Good (Aims for simpler typing via static API)

7. Conclusion
   This report has compiled detailed information on navigation and routing within React Native, focusing on React Navigation v6 and Expo Router v3, intended as foundational material for developing Module 11 of a training course.
   7.1. Summary of Key Learnings for Course Module Development
   Several critical points emerge from the analysis that should be emphasized in the course module:
   Navigation's Centrality: Navigation is not an afterthought but a core pillar of mobile UX. Its implementation directly impacts usability, user engagement, and overall app success.
   Pattern Recognition: Understanding the fundamental patterns (Stack, Tab, Drawer) and their appropriate use cases is essential for designing logical and intuitive information architectures.
   Library Dichotomy: The React Native ecosystem offers two primary navigation paradigms: React Navigation's flexible, programmatic approach and Expo Router's convention-driven, file-based system. Students need to understand the trade-offs between these two.
   Versioning Hell: The fast-paced nature of React Native and Expo releases creates significant challenges around version compatibility between the core framework, SDKs, navigation libraries, and their dependencies (like react-native-screens, react-native-gesture-handler, react-native-reanimated). Emphasizing the use of compatible versions (referencing resources like Table 2.3) and tools like expo install and expo-doctor is crucial for practical success.
   Setup Discrepancies: The installation and setup process varies drastically between Expo managed projects (more streamlined) and bare React Native projects (requiring manual native configuration). This difference should be clearly highlighted.
   Core Concepts: Regardless of the library chosen, understanding fundamental concepts like Navigators, Screens, the navigation and route props, and parameter passing is necessary. Expo Router builds upon React Navigation, so these concepts remain relevant even when using the file-based approach.
   Platform Awareness: Designing navigation that respects platform conventions (iOS HIG and Android Material Design) leads to a more native and intuitive user experience. Libraries often provide features (like Native Stack or native tabs) to facilitate this.
   Informed Choices: Selecting a navigation library and pattern involves trade-offs. There is no single "best" solution; the optimal choice depends on project complexity, customization needs, ecosystem choices (Expo vs. Bare), and team preferences.
   7.2. Guidance on Library/Pattern Selection
   The course module should equip students to make informed decisions about navigation strategies. Guidance should include:
   Decision Framework: Encourage students to consider:
   Project Complexity: Is the navigation structure simple or highly intricate with many nested levels?
   Customization Needs: Does the design require significant deviation from standard navigation UI and behavior?
   Development Environment: Is the project Expo-managed or bare React Native?
   Team Preference: Does the team favor explicit configuration or convention-based development?
   Library Recommendations:
   Suggest Expo Router as a strong starting point for projects within the Expo ecosystem, especially those with standard navigation requirements (Stack, Tabs) where rapid setup and automatic deep linking are valued.
   Recommend React Navigation for complex applications, projects demanding high levels of customization, bare React Native projects, or when maximum flexibility and control are paramount.
   Pattern Selection: Advise students to choose the initial navigation pattern(s) based on the app's primary information architecture – Tabs or Drawer for top-level organization, Stack for hierarchical flows within sections. Emphasize that combining patterns is often necessary.
   Versioning Caution: Reinforce the need to carefully manage versions, use recommended installation commands (npx expo install), and test thoroughly, especially during library or SDK upgrades, due to the potential for breaking changes and compatibility issues observed in the ecosystem.
   Works cited
   Navigating Between Screens - React Native, accessed May 12, 2025, https://reactnative.dev/docs/navigation
   Architecting Seamless Navigation for React Native Apps: Patterns, Libraries & Best Practices, accessed May 12, 2025, https://www.techaheadcorp.com/blog/architecting-seamless-navigation-for-react-native-apps-patterns-libraries-best-practices/
   How navigation can make or break your mobile app, accessed May 12, 2025, https://makingsense.com/blog/post/how-navigation-can-make-or-break-your-mobile-app
   Navigation UX: Pattern Types and Tips to Enhance User Experience - Userpilot, accessed May 12, 2025, https://userpilot.com/blog/navigation-ux/
   Understanding navigation - Material Design, accessed May 12, 2025, https://m2.material.io/design/navigation/understanding-navigation.html
   Navigation - Interaction - iOS Human Interface Guidelines, accessed May 12, 2025, https://codershigh.github.io/guidelines/ios/human-interface-guidelines/interaction/navigation/index.html
   Stack Navigator - Thunkable Docs, accessed May 12, 2025, https://docs.thunkable.com/app-design/screens-and-navigators/stack-navigator
   Stack Navigator | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/stack-navigator/
   Stack Navigator | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/6.x/stack-navigator
   Bottom Tab Bar Navigation Design Best Practices - UX World, accessed May 12, 2025, https://uxdworld.com/bottom-tab-bar-navigation-design-best-practices/
   Tabs - Material Design, accessed May 12, 2025, https://m2.material.io/components/tabs
   Navigation bar – Material Design 3, accessed May 12, 2025, https://m3.material.io/components/navigation-bar
   Bottom navigation - Material Design, accessed May 12, 2025, https://m2.material.io/components/bottom-navigation
   accessed December 31, 1969, https://developer.android.com/develop/ui/views/components/bottomnavigation
   createBottomTabNavigator - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/4.x/bottom-tab-navigator
   Bottom Tabs Navigator | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/bottom-tab-navigator/
   Navigation drawer | Jetpack Compose - Android Developers, accessed May 12, 2025, https://developer.android.com/develop/ui/compose/components/drawer
   Drawer Navigator - Thunkable Docs, accessed May 12, 2025, https://docs.thunkable.com/app-design/screens-and-navigators/drawer-navigator
   Navigation drawer - Material Design, accessed May 12, 2025, https://m2.material.io/components/navigation-drawer
   Navigation drawer – Material Design 3, accessed May 12, 2025, https://m3.material.io/components/navigation-drawer/guidelines
   Navigation drawer – Material Design 3, accessed May 12, 2025, https://m3.material.io/components/navigation-drawer
   Material Design 3 in Compose | Jetpack Compose | Android ..., accessed May 12, 2025, https://developer.android.com/develop/ui/compose/designsystems/material3
   Drawer Navigator | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/drawer-navigator/
   Drawer - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/advanced/drawer/
   Expo Router vs React Navigation: Navigating the React Native ..., accessed May 12, 2025, https://phrubel42.hashnode.dev/expo-router-vs-react-navigation-navigating-the-react-native-ecosystem
   Is expo-router a replacement for React Navigation for react native ..., accessed May 12, 2025, https://github.com/expo/router/discussions/668
   Blog | React Navigation, accessed May 12, 2025, https://reactnavigation.org/blog/
   Stuck on Welcome Page after SDK 52 update / Router.isReady() is undefined · Issue #34834 · expo/expo - GitHub, accessed May 12, 2025, https://github.com/expo/expo/issues/34834
   Core concepts of file-based routing - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/basics/core-concepts/
   Expo SDK 52 - Expo Changelog, accessed May 12, 2025, https://expo.dev/changelog/2024-11-12-sdk-52
   Expo Router | react-native-unistyles, accessed May 12, 2025, https://unistyl.es/v3/guides/expo-router/
   react-native-navigation - NPM, accessed May 12, 2025, https://www.npmjs.com/package/react-native-navigation
   react-native-screens - NPM, accessed May 12, 2025, https://www.npmjs.com/package/react-native-screens
   React Native 0.79 - Faster tooling and much more, accessed May 12, 2025, https://reactnative.dev/blog/2025/04/08/react-native-0.79
   What's the most stable and bug-free React Native version as of now? Facing major dependency issues with ^0.77.1 : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1ki96vj/whats_the_most_stable_and_bugfree_react_native/
   Donwgraded from Expo SDK 52 to 51 : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1k4cqt1/donwgraded_from_expo_sdk_52_to_51/
   Expo SDK 52 is HUUUGE! Here is what you have to know… - notJust.dev Newsletter, accessed May 12, 2025, https://news.notjust.dev/posts/expo-sdk-52-is-huuuge-here-is-what-you-have-to-know
   Authentication Provider with Expo Router v4 & Expo SDK 52 - GitHub, accessed May 12, 2025, https://github.com/budzHors7/Expo-Authentication-SDK-51
   Starter template for React Native v76, Expo SDK 52, TypeScript, Eslint, Prettier and Husky. - GitHub, accessed May 12, 2025, https://github.com/francislagares/react-native-starter
   Upgrading from 6.x - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/upgrading-from-6.x
   Upgrading from 6.x - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/upgrading-from-6.x/
   Stable expo version ? : r/expo - Reddit, accessed May 12, 2025, https://www.reddit.com/r/expo/comments/1kf6qhf/stable_expo_version/
   What do you think about creating a new Expo SDK 53 project and copying code instead of upgrading? : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1kczzu1/what_do_you_think_about_creating_a_new_expo_sdk/
   Can I use latest expo modules with expo 52? - Reddit, accessed May 12, 2025, https://www.reddit.com/r/expo/comments/1kcgdh0/can_i_use_latest_expo_modules_with_expo_52/
   expo-router causes Android build to fail on Expo 52 due to missing expo-module-gradle-plugin · Issue #36638 - GitHub, accessed May 12, 2025, https://github.com/expo/expo/issues/36638
   Expo SDK 52 to 53 Migration Breaks Compatibility with Some React Native Libraries — How Can I Resolve This? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/79611796/expo-sdk-52-to-53-migration-breaks-compatibility-with-some-react-native-librarie
   Expo sdk 52 new architecture: true app does not work on android 7 on production #33960, accessed May 12, 2025, https://github.com/expo/expo/issues/33960
   react-navigation/core@6.4.12 Release - GitClear, accessed May 12, 2025, https://www.gitclear.com/open_repos/react-navigation/react-navigation/release/@react-navigation~core@6.4.12
   Getting started | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/6.x/getting-started
   Hello React Navigation | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/6.x/hello-react-navigation
   Install Expo Router - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/installation/
   Getting started | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/getting-started/
   Passing parameters to routes | React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/6.x/params
   useNavigationState - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/use-navigation-state/
   Bottom Tabs meet Native | React Navigation, accessed May 12, 2025, https://reactnavigation.org/blog/2025/01/29/using-react-navigation-with-native-bottom-tabs/
   DrawerNavigator reference - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/1.x/drawer-navigator/
   create-expo-app - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/more/create-expo
   Linking into your app - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/linking/into-your-app/
   Navigation layouts in Expo Router - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/basics/layout/
   Expo Router - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/versions/latest/sdk/router/
   Tabs - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/advanced/tabs/
   Navigating between pages - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/basics/navigation/
   Passing parameters to the routes | Expo Router - GitHub Pages, accessed May 12, 2025, https://expo.github.io/router/docs/migration/react-navigation/params
   Expo Router v3 Tab Navigation with Stack, search, and large title, accessed May 12, 2025, https://stackoverflow.com/questions/77871441/expo-router-v3-tab-navigation-with-stack-search-and-large-title
   Type checking with TypeScript - React Navigation, accessed May 12, 2025, https://reactnavigation.org/docs/typescript/
   Mastering iOS Human Interface Guidelines for Optimal App Design - Netguru, accessed May 12, 2025, https://www.netguru.com/blog/ios-human-interface-guidelines
   BottomNavigationBar class - material library - Dart API - Flutter API, accessed May 12, 2025, https://api.flutter.dev/flutter/material/BottomNavigationBar-class.html
   Material 3 Navigation Drawer with Android Jetpack Compose - Tomáš Repčík, accessed May 12, 2025, https://tomasrepcik.dev/blog/2023/2023-03-04-jetpack-drawer/
   Navigation and the back stack | App architecture | Android Developers, accessed May 12, 2025, https://developer.android.com/guide/navigation/backstack
