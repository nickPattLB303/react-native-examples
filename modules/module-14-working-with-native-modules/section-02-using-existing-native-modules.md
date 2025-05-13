## Section 2: Using Existing Native Modules (Community & Expo SDK)

This section focuses on how to leverage the rich ecosystem of pre-built native modules. You'll learn where to find them, how to install them into your Expo project, and the basic steps for using them in your application code.

### The Power of Pre-Built Modules

Fortunately, you don't always need to write native modules from scratch. The React Native ecosystem is vast, and a significant number of common (and even niche) native functionalities have already been wrapped into convenient JavaScript APIs by the community and by Expo.

You can find existing native modules from several sources:

1.  **React Native Core:** Many fundamental APIs and components provided by React Native itself (e.g., `Alert`, `Linking`, `AppState`) are implemented as native modules.
2.  **Expo SDK:** Expo provides a comprehensive suite of high-quality, well-maintained native modules that cover a wide range of functionalities, from accessing device hardware like the camera or GPS, to integrating with system services like authentication or notifications. These are generally the first place to look when working within an Expo-managed project.
3.  **React Native Community Libraries:** Packages under the `@react-native-community` scope (e.g., `@react-native-community/async-storage`, `@react-native-community/datetimepicker`) are community-driven and often represent modules that were once part of React Native core but have been spun out.
4.  **Third-Party Libraries:** A vast number of other native modules are available on npm and GitHub, created by individual developers and organizations.

### Finding Native Modules

When you need specific native functionality, here's how you can search for existing modules:

- **Expo Documentation:** If you're using Expo, the [Expo API Reference](https://docs.expo.dev/versions/latest/) is the best place to start. It lists all modules included in the Expo SDK.
- **React Native Directory:** [reactnative.directory](https://reactnative.directory/) is a searchable database of React Native libraries. While useful, always check the library's maintenance status and compatibility.
- **NPM Search:** You can search on [npmjs.com](https://www.npmjs.com/) using keywords like "react-native-calendar", "expo-bluetooth", etc.
- **GitHub Search:** Searching on GitHub can also reveal relevant libraries.

### Installing Native Modules in Expo Projects

Once you've found a module, you need to install it. In Expo projects, the recommended way to install libraries, especially those with native code, is using the Expo CLI.

**Using `npx expo install <library-name>`**

This is the preferred command for Expo projects. For example:

```bash
npx expo install expo-camera
npx expo install react-native-maps
```

> [!IMPORTANT]
> The `npx expo install` command does more than just `npm install` or `yarn add`. It ensures that you install a version of the library that is compatible with your project's Expo SDK version. It also handles any necessary native project configuration or linking steps, often by utilizing config plugins.

**Using `npm install <library-name>` or `yarn add <library-name>`**

You might use `npm` or `yarn` directly for:

- Pure JavaScript libraries that don't have any native code.
- Working in a bare React Native project (not managed by Expo).

> [!CAUTION]
> If you install a library with native code using `npm` or `yarn` directly in an Expo project, and that library isn't an Expo module or doesn't have an Expo config plugin, it might not work correctly without manual configuration or by running `npx expo prebuild --clean` to regenerate the native project files. Always prefer `npx expo install` for libraries with native components in Expo projects.

### Linking Native Modules and Expo Prebuild

In older React Native versions (before 0.60), "linking" native modules involved running `react-native link <library-name>` to update the native iOS and Android project files. Modern React Native features autolinking, which generally handles this automatically.

In Expo's managed workflow, you typically don't interact with native project files directly. When you add a library that requires native changes, Expo's build process handles the integration. If you're using development builds or need to work with the native code directly, you'll use `npx expo prebuild --clean`.

**Expo Prebuild (`npx expo prebuild --clean`)**
This command generates the native `ios` and `android` project directories based on your app configuration and installed dependencies. It's the process that effectively "links" your native modules in an Expo context when moving to a bare workflow or creating development builds. Commands like `npx expo run:ios` or `npx expo run:android` will often trigger a prebuild if these directories are missing or if relevant app config changes are detected.

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
> - [Expo Docs: Installing dependencies](https://docs.expo.dev/workflow/expo-cli/#installing-dependencies)
> - [Expo Docs: Prebuild](https://docs.expo.dev/workflow/prebuild/)
> - [React Native Community GitHub](https://github.com/react-native-community)
