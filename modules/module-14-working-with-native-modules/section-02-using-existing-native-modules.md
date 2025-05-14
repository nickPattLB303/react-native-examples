## Section 2: Using Existing Native Modules (Community & Expo SDK)

This section focuses on how to leverage the rich ecosystem of pre-built native modules. You'll learn where to find them, how to evaluate them, how they are installed and linked (especially in Expo projects with Config Plugins), and the basic steps for using them in your application code.

### The Power of Pre-Built Modules: The Ecosystem

Fortunately, you don't always need to write native modules from scratch. The React Native ecosystem is vast, and a significant number of common (and even niche) native functionalities have already been wrapped into convenient JavaScript APIs. This ecosystem can be broadly categorized:

1.  **React Native Core Modules:** These are fundamental modules bundled directly with React Native itself (e.g., `Alert`, `Linking`, `AppState`, `Platform`, `Dimensions`). They provide essential building blocks.
2.  **Expo SDK Modules:** Expo provides a comprehensive suite of high-quality, well-maintained native modules that cover a wide range of functionalities, from accessing device hardware like the camera or GPS, to integrating with system services like authentication or notifications. These are generally the first place to look when working within an Expo-managed project. (Covered in detail in Section 3).
3.  **Community Modules:** Beyond the core framework and the Expo SDK, a vast number of native modules are developed, shared, and maintained by the broader React Native community, including individual developers and companies (e.g., packages under `@react-native-community` like `@react-native-async-storage/async-storage`). These modules cover a diverse spectrum of functionalities.
4.  **Third-Party Libraries:** Many other native modules are available on npm and GitHub, created by various organizations for specific services or features.

### Finding and Evaluating Native Modules

When you need specific native functionality, here's how you can search:

- **Expo Documentation:** If you\'re using Expo, the [Expo API Reference](https://docs.expo.dev/versions/latest/) is the best place to start for Expo SDK modules.
- **React Native Directory:** [reactnative.directory](https://reactnative.directory/) is a searchable database.
- **NPM Search:** Search on [npmjs.com](https://www.npmjs.com/) (e.g., "react native bluetooth", "expo chart").
- **GitHub Search:** Searching on GitHub can also reveal relevant libraries.

> [!IMPORTANT]
> Evaluating community modules demands careful consideration due to variability in quality, maintenance, and compatibility. Here's what to look for:
>
> - **Maintenance Activity:** Check the repository's commit history, release frequency, and responsiveness to issues and pull requests. An actively maintained library is more likely to stay compatible.
> - **Open Issues and Pull Requests:** Review open issues for known bugs, compatibility problems, or feature limitations. Look at pull requests to gauge community involvement and the maintainer\'s engagement.
> - **Documentation Quality:** Clear, comprehensive documentation is crucial for understanding how to install, configure, and use the module correctly.
> - **Compatibility:** Verify compatibility with your target React Native version (e.g., 0.7x+), target platform versions (iOS/Android), and crucially, with the Expo ecosystem if applicable (look for Config Plugin support or if it's an Expo module).
> - **New Architecture Support:** As the React Native ecosystem transitions, check if the module supports or has plans to support the New Architecture (TurboModules/Fabric). Using compatible modules is increasingly important.
>
> The process of vetting community modules requires greater diligence than selecting a typical pure JavaScript library because native modules introduce dependencies on native build systems and platform APIs.

### Installation and Linking (Under the Hood)

Integrating a native module involves adding the JavaScript package and ensuring the associated native code is correctly included and linked during the mobile app build process.

1.  **NPM/Yarn Installation:** Like any JavaScript dependency, native module packages are installed using a package manager:

    ```bash
    # For Expo projects, prefer npx expo install (see below)
    npm install <package-name>
    # or
    yarn add <package-name>
    ```

2.  **Linking (Legacy Context - Pre-RN 0.60):**
    In earlier React Native versions, after installing a package containing native code, developers often had to run `react-native link <package-name>`. This command attempted to automate modifying native project files (`Podfile` for iOS, Gradle files for Android). This process was manual for complex cases and sometimes prone to errors.

3.  **Autolinking (RN 0.60+):**
    React Native versions 0.60 and above introduced **autolinking**. The React Native build tools now automatically detect native modules within `node_modules` based on their package configuration.

    - **iOS:** During `pod install` (part of `npx react-native run:ios` or Xcode build), CocoaPods detects the module's `.podspec` file and links the native dependency.
    - **Android:** The Gradle build system detects the module's configuration and automatically includes it.
      Autolinking removes the need for `react-native link` in most cases for standard React Native projects.

4.  **Expo: `npx expo install`, Prebuild, and Config Plugins**
    The Expo ecosystem, particularly when not in the bare workflow, handles native dependencies differently and more seamlessly.

    - **`npx expo install <library-name>`:**
      This is the **strongly recommended** command for installing any library (especially those with native code) in Expo projects.

      ```bash
      npx expo install expo-camera
      npx expo install react-native-maps
      ```

      `npx expo install` ensures installation of a package version compatible with your project's Expo SDK version and, for many community native modules, it automatically configures the necessary **Config Plugins**.

    - **Expo SDK Modules:** Modules part of the core Expo SDK are either pre-compiled into Expo Go or seamlessly included during Development Builds or EAS Builds.

    - **Community Modules & Expo Config Plugins:**
      Historically, the Expo Managed Workflow restricted using community modules with custom native code because developers didn't directly access native project files. **Expo Config Plugins** overcome this.
      A Config Plugin is a script (usually JavaScript) associated with a native module. When Expo prepares the native projects (during `expo prebuild` or implicitly during `eas build`), it executes these Config Plugins. The plugins programmatically modify the native configuration files (like `Info.plist`, `AndroidManifest.xml`, `build.gradle`, `Podfile`) to correctly integrate the community module's native dependencies before native compilation.
      This allows developers to use a wide range of community native modules within the Expo workflow without needing to "eject" or directly manage native code.

      ```mermaid
      graph TD
          A[Developer runs `npx expo install community-module`] --> B{Module has Config Plugin?};
          B -- Yes --> C[Config Plugin registered in app.json/app.config.js];
          C -- `eas build` or `expo prebuild` --> D[Expo runs Config Plugin];
          D --> E[Plugin modifies native project files (Info.plist, build.gradle, etc.)];
          E --> F[Native code from community-module is linked];
          F --> G[App builds successfully with native feature];
          B -- No --> H{Module is pure JS?};
          H -- Yes --> I[Works directly];
          H -- No --> J[May require bare workflow or manual setup];
      ```

      This diagram illustrates how Expo Config Plugins facilitate the integration of community native modules. Config Plugins act as programmatic "install scripts" for the native side of community libraries, making them usable within Expo's traditionally managed environment.

    The evolution from manual linking to autolinking and then to the sophisticated Config Plugin system in Expo simplifies native code integration significantly.

### Importing and Using Modules in Code

After installation, using a native module in your JavaScript or TypeScript code is usually straightforward:

1.  **Import the module:**

    ```typescript
    import * as Device from "expo-device"; // Expo SDK module
    import NetInfo from "@react-native-community/netinfo"; // Community module
    import SomeThirdPartyModule from "some-third-party-module"; // Third-party module
    ```

    The exact import statement depends on how the library exports its functionalities (named exports vs. default export). Always refer to the library's documentation.

2.  **Call its methods:**
    Native module methods are exposed as JavaScript functions. These functions might be synchronous or, more commonly, asynchronous (returning a Promise).

    ```typescript
    // Example using expo-device (synchronous properties)
    console.log("Device type:", Device.deviceType);
    console.log("OS Version:", Device.osVersion);

    // Example using @react-native-community/netinfo (asynchronous method)
    const checkConnection = async () => {
      try {
        const state = await NetInfo.fetch();
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      } catch (error) {
        console.error("Failed to get network state", error);
      }
    };

    checkConnection();
    ```

> [!IMPORTANT]
> Always check for compatibility between the native module, your React Native version, and your Expo SDK version (if applicable). `npx expo install` greatly helps with this for Expo projects. For other libraries, consult their documentation.

> [!CAUTION]
> When considering third-party libraries, especially smaller or less-known ones:
>
> - Check their maintenance status (e.g., last commit date on GitHub).
> - Look at the number of open issues and pull requests.
> - Check for community adoption (e.g., GitHub stars, npm downloads).
>   An unmaintained library can become a source of bugs or compatibility issues.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Using Libraries (Explains `npx expo install`)](https://docs.expo.dev/guides/using-libraries/)
> - [Expo Docs: Config Plugins](https://docs.expo.dev/guides/config-plugins/)
> - [React Native Docs: Linking Libraries (Explains autolinking)](https://reactnative.dev/docs/linking-libraries-ios) (iOS section, concept applies to Android too)
> - [React Native Directory](https://reactnative.directory/)
