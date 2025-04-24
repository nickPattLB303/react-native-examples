# Module 2: React Native Environment Setup with Expo

## 2.3 Initiating and Running an Expo Project (create-expo-app, expo start, Expo Go)

Creating the Project:

-   Command: The standard method for initializing a new Expo project is via the create-expo-app command-line tool. It is typically run using npx to ensure the latest version is used without requiring a global installation: $ npx create-expo-app@latest <YourAppName>.28 Replace <YourAppName> with the desired project name.
-   npx: Using npx executes the create-expo-app package directly from the npm registry, downloading it temporarily if needed.47
-   Default Template: By default, create-expo-app uses a template that includes useful starting configurations, such as TypeScript support and the Expo Router library for file-based navigation.37 Alternative templates (e.g., blank, tabs, bare-minimum) can be specified using the --template flag.47

Running the App:

-   Command: Once the project is created, navigate into the project directory ($ cd <YourAppName>) and start the development server using: $ npx expo start.37
-   Expo CLI & Metro: This command launches the Metro bundler (which compiles and serves the JavaScript code) and the Expo development server. It presents a Terminal UI with options.37
-   Terminal UI: The UI displays a QR code that can be scanned by the Expo Go app on a physical device to load the project.37 It also provides keyboard shortcuts for various actions.38
-   Launching on Simulator: Pressing the i key in the terminal while the development server is running will attempt to install and launch the application on the configured iOS simulator.38

Expo Go:

-   Role: Expo Go is a client application, pre-installed on the simulator (when launched via i) or installed manually on a physical device.37 It acts as a native sandbox environment that connects to the running development server (Metro), downloads the JavaScript bundle, and executes the React Native application.41

The combination of npx expo start and Expo Go facilitates a rapid development cycle. Metro efficiently bundles JavaScript code changes, and Expo Go often updates the running application via Fast Refresh without requiring a full native rebuild. This workflow mirrors the quick feedback loop common in web development, significantly accelerating the process of iterating on UI and application logic compared to traditional native compilation cycles.

#### Works cited

28. Get Started with React Native, accessed April 24, 2025, <https://reactnative.dev/docs/environment-setup>
37. Create your first app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/tutorial/create-your-first-app/>
38. Expo CLI - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/more/expo-cli/>
41. Set Up Your Expo Go Project to Use Development Builds | egghead.io, accessed April 24, 2025, <https://egghead.io/lessons/react-native-set-up-your-expo-go-project-to-use-development-builds>
47. create-expo-app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/more/create-expo>