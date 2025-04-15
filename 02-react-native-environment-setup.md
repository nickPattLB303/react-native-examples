---
marp: true
headingDivider: 6
paginate: true
---
# **Module: Environment Setup & The Expo Ecosystem**

## **1. Introduction**

Welcome to the first step in your journey to becoming a proficient React Native developer! This foundational module focuses on establishing your local development environment using the Expo framework and ecosystem. Setting up the environment correctly is crucial for a smooth development experience.

### **Module Goal**

The primary goal of this module is to guide participants through the process of successfully setting up a local development environment tailored for React Native development using Expo. By the end of this module, participants will understand the core tools and workflows within the Expo ecosystem and be able to run their first React Native application on an iOS simulator.

### **Learning Objectives**

Upon successful completion of this module, participants will be able to:

* Install and configure all necessary prerequisite software (Node.js, Watchman, Xcode, iOS Simulator) on a macOS system.
* Articulate the role of the Expo Command Line Interface (CLI) and explain its advantages compared to the standard React Native CLI.
* Initialize a new React Native project using the Expo CLI command `npx create-expo-app@latest`.
* Describe the purpose and contents of key files and directories within a standard Expo project structure.
* Start the Expo development server using `npx expo start` and successfully launch the application on an iOS Simulator.
* Clearly differentiate between the various Expo development environments – Expo Go, Development Builds, and Production Builds – understanding their specific use cases, capabilities, and limitations.
* Identify common setup and runtime issues and apply appropriate troubleshooting steps to resolve them.
* Effectively utilize Expo Snack, the web-based playground, for completing course exercises and performing basic code experimentation.

### **Target Audience & Adaptation**

This course is specifically designed for developers who already possess proficiency in at least one of the following areas: native Android development (Java/Kotlin), native iOS development (Objective-C/Swift), web development with React, or web development with Angular.

Recognizing that participants come from diverse technical backgrounds, this module incorporates specific callouts and detailed explanations. These are designed to bridge knowledge gaps and provide relevant context, comparing React Native and Expo concepts to familiar paradigms in native or web development. The ultimate aim is to equip all participants, regardless of their starting point, for production-level React Native development. - [Expo vs React Native CLI: 10 Key Differences You Didn't Know | Attract Group](https://attractgroup.com/blog/expo-vs-react-native-cli-10-key-differences-you-didnt-know/)

> **Note for Learners from Native Backgrounds (Android/iOS)**
> Concepts like JavaScript runtimes (Node.js), package managers (npm), and bundlers (Metro) might be new. This module will relate Expo's abstractions (like the Expo CLI managing native builds) back to familiar tools like Android Studio or Xcode, highlighting the similarities and differences in workflow. - [From Jetpack Compose to React Native: An Android Developer's Perspective - Atomic Robot](https://atomicrobot.com/blog/compose-to-react-native/)

> **Note for Learners from Web Backgrounds (React/Angular)**
> While JavaScript tooling will feel familiar, concepts related to native mobile development, simulators/emulators (Xcode), and the specifics of React Native's component system and styling (vs. HTML/CSS) will be emphasized. Expo's tooling aims to make this transition smoother. - [React Native: Thoughts from a web developer - Mantel | Make things ...](https://mantelgroup.com.au/react-native-thoughts-from-a-web-developer/)

### **Learning Path Guidance**

This module serves as a critical foundation for all learning paths:

* **Instructor-Led:** Active participation in setup sessions is encouraged. Use the live coding demonstrations as an opportunity to follow along and ask clarifying questions regarding environment configuration or Expo concepts.
* **Self-Led:** Proceed through the steps sequentially. Utilize the provided links to official documentation for deeper understanding. Do not hesitate to request instructor support via Webex chat or huddles if installation or configuration issues arise.
* **Asynchronous:** This module is fundamental, regardless of the specific topics targeted later. Ensure the development environment is correctly set up by carefully following these instructions. If specific setup errors are encountered later, the Troubleshooting section can be referenced directly.

## **2. Prerequisites: Setting Up Your Local Development Environment (macOS & iOS Simulator Focus)**

Before diving into React Native code, it's essential to prepare the local development machine. This involves installing several core software components. This course focuses on macOS and development for the iOS Simulator, as it provides a consistent target environment for exercises and the capstone project.

### **Essential Tools Overview**

The following tools are required to build and run React Native applications using Expo on macOS for iOS development:

#### **Node.js (LTS Version)**

Node.js is a JavaScript runtime environment that executes JavaScript code outside of a web browser. It is fundamental to the React Native ecosystem, powering the Expo CLI, the Metro bundler (which packages the JavaScript code), and Node Package Manager (npm) or Yarn, which are used to manage project dependencies. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) Using the LTS (Long-Term Support) version is strongly recommended for stability and compatibility. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

#### **Watchman**

Developed by Meta (Facebook), Watchman is a service that watches files and records when they change. It's used by the Metro bundler to efficiently detect changes in the project's source code. This enables features like Fast Refresh, significantly speeding up the development cycle by quickly updating the app with code changes without a full rebuild. While technically optional, Watchman is highly recommended for optimal performance. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

#### **Xcode**

Xcode is Apple's integrated development environment (IDE) for developing macOS, iOS, iPadOS, watchOS, and tvOS applications. For React Native development targeting iOS, Xcode provides the necessary iOS SDKs, compilers, build tools, and, crucially, the iOS Simulator. While this course may not involve extensive direct coding in Swift or Objective-C within the Xcode IDE itself, installing Xcode is mandatory to build and run the native iOS portion of the React Native application on a simulator. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) Xcode also includes the Xcode Command Line Tools, which provide essential utilities like git and compilers accessible from the terminal.

### **Step-by-Step Installation Guide (macOS Focus)**

Follow these steps to install the required tools on the macOS machine:

#### **Install Node.js (LTS) and npm**

* **Recommended Method (using nvm):** Node Version Manager (nvm) allows managing multiple Node.js versions easily.
    * Install nvm by running the script from the official nvm repository in the terminal:
        ```bash
        curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh) | bash
        ```
        (Restart the terminal or run the export commands suggested by the script output). - [Download Node.js](https://nodejs.org/en/download)
    * Install the latest LTS version of Node.js:
        ```bash
        nvm install --lts
        ```
        - [Download Node.js](https://nodejs.org/en/download)
    * Set the installed LTS version as the default:
        ```bash
        nvm use --lts
        nvm alias default lts/*
        ```
        - [Hi! How can I install Node.js on my windows? - Reddit](https://www.reddit.com/r/node/comments/w25ifa/hi_how_can_i_install_nodejs_on_my_windows/)
* **Alternative Method (Direct Download):** Download the macOS Installer (.pkg) for the LTS version directly from the official [Node.js website](https://nodejs.org/en) and follow the installation prompts. - [Node.js — Run JavaScript Everywhere](https://nodejs.org/en)
* **Verification:** Open a new terminal window and verify the installation:
    ```bash
    node -v # Should output the installed LTS version (e.g., v20.x.x)
    npm -v  # Should output the corresponding npm version
    ```
    - [Download Node.js](https://nodejs.org/en/download)

#### **Install Watchman**

* **Prerequisite:** Ensure Homebrew (a package manager for macOS) is installed. If not, follow the instructions on the [Homebrew website](https://brew.sh/).
* **Installation:** Use Homebrew to install Watchman:
    ```bash
    brew update      # Update Homebrew package definitions
    brew install watchman
    ```
    - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)
* **Verification:**
    ```bash
    watchman --version
    ```

#### **Install Xcode and iOS Simulator**

* **Install Xcode:** Open the Mac App Store, search for "Xcode", and click "Install" or "Update". Note that Xcode is a large application, and the download may take considerable time. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)
* **Install Xcode Command Line Tools:** These tools are essential for building code from the command line.
    * Open Xcode.
    * Go to the Xcode menu > Settings... (or Preferences...).
    * Navigate to the Locations tab.
    * In the Command Line Tools dropdown, select the latest available version. If no version is selected, click the dropdown and choose one to initiate the installation. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) Accept the license agreement if prompted.
* **Install an iOS Simulator:**
    * In Xcode, go to Xcode menu > Settings... (or Preferences...).
    * Navigate to the Components tab.
    * Select an iOS simulator version (e.g., the latest stable version) and click the "Get" or download button next to it. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/)
* **Verification:** Launch the Simulator application to ensure it's installed correctly. You can do this via Spotlight search or by running `open -a Simulator` in the terminal. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/)

#### **(Optional) Android Studio Setup**

For participants interested in Android development, setting up Android Studio, the Android SDK, and an Android Virtual Device (AVD) is necessary. This process involves downloading Android Studio, configuring SDK paths, and creating an emulator instance. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

While not required for the iOS-focused exercises in this course, detailed instructions can be found in the official React Native "Setting up the development environment" guide under the "React Native CLI Quickstart" tab (select the "Android" target OS) or the Expo documentation for Android setup. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

### **Adapting Setup for Your Background**

* **Native Developers (iOS/Android):** You are likely familiar with Xcode or Android Studio. The key differences here involve using nvm for Node.js version management (a standard practice in the JavaScript world) and installing Watchman via Homebrew. While direct interaction with Xcode's interface might be minimal for this course, understanding that it provides the essential build tools and the simulator environment is crucial. The Expo CLI, introduced next, will abstract many of the build and run commands typically executed manually in native development workflows. - [Expo vs React Native CLI: 10 Key Differences You Didn't Know | Attract Group](https://attractgroup.com/blog/expo-vs-react-native-cli-10-key-differences-you-didnt-know/)
* **Web Developers (React/Angular):** Node.js, npm, and potentially yarn should feel comfortable. The new components are Xcode and Watchman. Xcode is a significant installation but necessary for running apps on the iOS simulator – think of it as analogous to browser developer tools, but for native iOS application development and debugging. Watchman enhances the development server's ability to detect file changes quickly, similar to hot-reloading tools common in web development, but specifically optimized for the scale and structure of native projects. - [React Native: Thoughts from a web developer - Mantel | Make things ...](https://mantelgroup.com.au/react-native-thoughts-from-a-web-developer/)

> The multi-step process involving Node.js, package managers, native IDEs like Xcode, and specific tools such as Watchman highlights the inherent complexity involved in setting up any mobile development environment, including standard React Native. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview) Native mobile development necessitates large, platform-specific toolchains (Xcode for iOS, Android Studio for Android). React Native builds upon this by adding the JavaScript ecosystem tooling (Node.js, npm/yarn). Furthermore, tools like Watchman are often needed to achieve optimal development performance. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) This combination can present a significant initial hurdle, particularly for developers transitioning from purely web backgrounds or those new to mobile development altogether. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview) This initial setup complexity underscores the value proposition of the Expo framework, which aims to abstract and simplify many of these initial native configuration steps, facilitating a faster start to development. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview) Therefore, while navigating this setup is essential, it also serves to motivate the course's focus on Expo as a means to accelerate onboarding and focus more quickly on React Native application logic.

## **3. Diving into the Expo Ecosystem**

With the prerequisites installed, the next step is to understand Expo itself. Expo is more than just a single tool; it's a comprehensive **framework and platform** designed to streamline and enhance the React Native development experience. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

### **What is Expo?**

Expo consists of several key components working together:

#### **Expo Framework**

This encompasses a set of tools, services, and conventions built around React Native. It includes the Expo SDK, the Expo CLI, and often integrates with routing solutions like Expo Router. - [From Web to Native with React - Expo](https://expo.dev/blog/from-web-to-native-with-react) The framework aims to provide a more cohesive and opinionated development experience compared to using the bare React Native CLI alone. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli)

#### **Expo SDK**

Think of the Expo SDK as an "extended standard library" for React Native. - [From Web to Native with React - Expo](https://expo.dev/blog/from-web-to-native-with-react) React Native core provides fundamental UI components and APIs. The Expo SDK adds a curated collection of high-quality, well-maintained native modules that provide easy access to common device capabilities like camera, location, sensors, file system, authentication, notifications, and more. - [Expo vs React Native CLI: Key Differences Explained - Flatirons Development](https://flatirons.com/blog/expo-vs-react-native/) A key benefit is that these modules are versioned and tested together with specific React Native versions, simplifying upgrades and ensuring compatibility. - [FAQ - Expo Documentation](https://docs.expo.dev/faq/) Initially, many Expo SDK modules can be used without needing to build native code, thanks to Expo Go.

#### **Expo Application Services (EAS)**

EAS is a suite of optional cloud services that complement the open-source Expo framework. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) EAS includes:

* **EAS Build:** A cloud service for building native app binaries (.ipa for iOS,.apk/.aab for Android) without needing local native tooling setup. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli)
* **EAS Submit:** A service to streamline submitting builds to the Apple App Store and Google Play Store. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli)
* **EAS Update:** A service for deploying Over-the-Air (OTA) updates (JavaScript and asset changes) directly to users' installed apps without requiring a new store submission. - [Overview of using Expo with existing React Native apps - Expo ...](https://docs.expo.dev/bare/overview/)
* **EAS Metadata:** Manage store metadata.
* **EAS Secrets:** Manage secret credentials.

EAS offers free tiers and paid plans based on usage. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli) While powerful for production workflows, using EAS is not mandatory for developing with Expo. - [Overview of using Expo with existing React Native apps - Expo ...](https://docs.expo.dev/bare/overview/)

### **Expo CLI vs. React Native CLI Deep Dive**

A crucial distinction in the React Native world is the choice between the Expo CLI and the standard React Native CLI.

#### **React Native CLI ("Bare" Workflow)**

This is the original method for creating React Native projects. It generates projects with `android` and `ios` directories containing the native platform code. - [Expo vs React Native CLI: 10 Key Differences You Didn't Know | Attract Group](https://attractgroup.com/blog/expo-vs-react-native-cli-10-key-differences-you-didnt-know/) This gives developers direct, unrestricted access to modify native code and integrate any third-party native module. - [Expo vs React Native CLI: 10 Key Differences You Didn't Know | Attract Group](https://attractgroup.com/blog/expo-vs-react-native-cli-10-key-differences-you-didnt-know/) However, it necessitates manual configuration of the native development environments (Xcode, Android Studio, SDKs, dependencies like CocoaPods) and requires developers to manage native build processes themselves. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview) Upgrading React Native versions can also be more complex, often involving manual changes to native project files.

#### **Expo CLI**

Expo CLI is designed to simplify and accelerate React Native development. It offers numerous advantages, particularly for getting started and for leveraging the broader Expo ecosystem - [FAQ - Expo Documentation](https://docs.expo.dev/faq/):

* **Simplified Setup & Workflow:** Expo CLI significantly reduces the initial setup time compared to the React Native CLI. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview) Developers can often start writing code and running their app in Expo Go without configuring Xcode or Android Studio immediately. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview)
* **Managed Development (Expo Go):** The Expo Go client app allows running and testing JavaScript code changes instantly on a device or simulator without requiring local native builds initially. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview)
* **Integrated Tooling:** Provides features like automatic TypeScript setup, built-in web support via Metro, improved terminal logging (combining JS and native logs), integrated environment variable support (.env files), direct access to the Hermes debugger, automatic installation of compatible dependency versions (`npx expo install`), and built-in tunneling support (`--tunnel`). - [FAQ - Expo Documentation](https://docs.expo.dev/faq/)
* **Continuous Native Generation (CNG) / Prebuild:** Expo promotes a workflow where the `android` and `ios` native project folders are not typically checked into source control. Instead, they are generated on demand using the `npx expo prebuild` command based on the project's dependencies and the `app.json`/`app.config.js` configuration file. - [Overview of using Expo with existing React Native apps - Expo ...](https://docs.expo.dev/bare/overview/) This approach simplifies React Native upgrades and management of native configurations, replacing the older, often complex "ejecting" process which is now deprecated. - [FAQ - Expo Documentation](https://docs.expo.dev/faq/)
* **Compatibility:** Expo CLI can be used alongside the React Native CLI if needed, and Expo Application Services (EAS) are designed to work with *any* React Native project, whether started with Expo CLI or React Native CLI. - [FAQ - Expo Documentation](https://docs.expo.dev/faq/)

#### **Why Expo CLI for this Course**

The decision to use Expo CLI in this training program is based on several factors aligned with the course goals:

* **Faster Onboarding:** Enables participants to become productive more quickly by minimizing initial setup friction. - [React Native Expo vs CLI: Key Differences - hashnode.dev](https://thefrontendforge.hashnode.dev/react-native-expo-versus-cli-a-detailed-overview)
* **Simplified Workflow:** Abstracts common complexities, allowing focus on React Native concepts and application logic.
* **Production Readiness Path:** Provides a clear path to production builds and updates through strong integration with EAS. - [Overview of using Expo with existing React Native apps - Expo ...](https://docs.expo.dev/bare/overview/)
* **Modern Practices:** Aligns with the direction recommended by the React Native team and leverages modern features like CNG. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli)

### **Installing and Using the Expo & EAS CLIs**

While `npx create-expo-app` handles project creation, the Expo CLI and EAS CLI are often used for ongoing development, building, and service interactions.

* **Installation:** It's recommended to install the EAS CLI globally, as it bundles the Expo CLI and is required for interacting with Expo Application Services.
    ```bash
    npm install -g eas-cli
    ```
    - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)
* **Verification:**
    ```bash
    eas --version # This should also show the bundled Expo CLI version
    ```
* **Expo Account Login:** Many EAS features require an Expo account. It's advisable to create one ([expo.dev/signup](https://expo.dev/signup)) and log in via the CLI early on:
    ```bash
    eas login
    ```
    - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

> The structure of the Expo ecosystem reveals an opinionated approach to React Native development. React Native itself provides the core bridge to native platforms, but it's relatively unopinionated about tooling, libraries, and workflows. - [FAQ - Expo Documentation](https://docs.expo.dev/faq/) Developers using the standard React Native CLI often assemble their own "framework" by selecting and integrating various tools and libraries. - [Why Expo is a great fit for new and existing React Native apps](https://expo.dev/blog/why-expo-is-a-great-fit-for-new-and-existing-react-native-apps) Expo, in contrast, bundles these components—CLI, SDK, EAS, optional Router—into a more cohesive and integrated framework. - [From Web to Native with React - Expo](https://expo.dev/blog/from-web-to-native-with-react) This inherent opinionation simplifies the development process by making many common choices for the developer, such as the default bundler (Metro), a curated set of SDK libraries, and recommended build services (EAS). - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli) While this streamlines development, it historically came with trade-offs in flexibility compared to the "bare" React Native CLI workflow. However, with the evolution of tools like Development Builds and Config Plugins, Expo has significantly reduced these limitations, offering a powerful yet manageable development experience. - [Expo vs React Native CLI: 10 Key Differences You Didn't Know | Attract Group](https://attractgroup.com/blog/expo-vs-react-native-cli-10-key-differences-you-didnt-know/) Participants should recognize that adopting Expo means embracing this integrated ecosystem, which offers substantial benefits in speed and convenience but implies using Expo's recommended tools and services for the most seamless path.

## **4. Creating and Understanding Your First Expo Project**

Let's create our first project using the Expo CLI and explore its structure.

### **Initializing with `npx create-expo-app@latest`**

The recommended way to start a new Expo project is using the `create-expo-app` command-line tool via `npx`. `npx` allows running Node.js package executables without needing to install them globally, ensuring the latest version is always used. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/)

1.  Open your terminal and navigate to the directory where you want to create your project.
2.  Run the command:
    ```bash
    npx create-expo-app@latest SpeedyMedsApp
    ```
    Replace `SpeedyMedsApp` with your desired project name.
3.  Follow the prompts: The command will likely ask for the app name if not provided as an argument. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/) It will then create a new directory with that name, download the template, and install the necessary dependencies.

By default, `create-expo-app` uses the default template. This template is designed for multi-screen applications and comes pre-configured with essential tools like Expo Router for navigation and TypeScript for type safety, making it an excellent starting point for most projects. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt)

Other templates can be specified using the `--template` flag (e.g., `--template blank` for a minimal setup, `--template tabs` for a tab-based navigation start). - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/) The `--example` flag can be used to clone projects directly from the `expo/examples` repository. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/)

### **Exploring the Project Structure**

Navigate into your newly created project directory (`cd SpeedyMedsApp`). The typical structure generated by the default template includes:

* **`app/`**: This directory is central to Expo Router's file-based navigation system. Files and folders within `app/` define the navigation routes of the application. This will be covered in detail in a dedicated navigation module. - [Create your first app - Expo Documentation](https://docs.expo.dev/tutorial/create-your-first-app/)
* **`assets/`**: Contains static assets like images (e.g., `icon.png`, `splash.png`) and fonts. These assets are bundled with the application during the build process. - [Create your first app - Expo Documentation](https://docs.expo.dev/tutorial/create-your-first-app/)
* **`components/`**: Often included in templates as a suggested location for reusable UI components. - [Create your first app - Expo Documentation](https://docs.expo.dev/tutorial/create-your-first-app/)
* **`constants/`**: May be included for storing constant values like colors or configuration settings.
* **`node_modules/`**: The standard directory where all project dependencies (libraries downloaded via npm or yarn) are stored. It should typically be included in `.gitignore`.
* **`.gitignore`**: A standard Git file specifying intentionally untracked files that Git should ignore (e.g., `node_modules`, build artifacts, environment files).
* **`App.js` / `index.js` / `expo-router/entry`**: The main entry point for the application. With the default Expo Router template, the `main` field in `package.json` points to `expo-router/entry`, which handles the initialization. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/) You might find an `app/_layout.tsx` file acting as the root layout component. - [Install Expo Router - Expo Documentation](https://docs.expo.dev/router/installation/)
* **`package.json`**: The heart of the Node.js project manifest. It lists project metadata, dependencies (`dependencies`, `devDependencies`), and scripts (`scripts` section containing commands like `start`, `android`, `ios`, `web`). - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/) Key dependencies include `expo`, `react`, `react-native`, and `expo-router`.
* **`tsconfig.json`**: The TypeScript configuration file. It defines compiler options for TypeScript, specifies which files to include, and enables features like path aliases for cleaner imports. - [Using TypeScript - Expo Documentation](https://docs.expo.dev/guides/typescript/)

### **Configuration Deep Dive**

Understanding the configuration files is crucial for managing and customizing an Expo project.

#### **`app.json` / `app.config.js` / `app.config.ts`**

This is the central configuration hub for an Expo project. - [Develop an app with Expo - Expo Documentation](https://docs.expo.dev/workflow/overview/)

##### Purpose

It configures a wide range of aspects, including:

* App Metadata: `name`, `slug` (unique identifier), `version`, `orientation`, `icon`, splash screen images and behavior. - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
* Platform Specifics: Settings for Android (`androidStatusBar`, `package` name, `permissions`) and iOS (`bundleIdentifier`, `infoPlist` modifications, `entitlements`, `associatedDomains`). - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
* Updates: Configuration for EAS Update (e.g., `updates.url`, `updates.checkAutomatically`). - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
* Plugins: An array listing config plugins to be applied during prebuild. - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
* API Keys & Integrations: Configuration for services like Firebase, Maps, etc.

##### Static vs. Dynamic Config

* `.json` files (`app.json`) are static. They are simple key-value pairs. - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
* `.js` or `.ts` files (`app.config.js`, `app.config.ts`) are dynamic. They export a function that receives the current config and can return a modified config object. This allows using JavaScript logic, environment variables (`process.env`), or asynchronous operations (though the final returned config must be synchronous) to customize the configuration based on the context (e.g., development vs. production). - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)
    ```javascript
    // Example app.config.js using environment variables
    module.exports = ({ config }) => {
      // config contains the static config from app.json if it exists
      // Modify config based on environment
      if (process.env.MY_ENVIRONMENT === 'production') {
        config.backgroundColor = '#ffffff'; // Example production setting
        config.extra = { // Custom data accessible at runtime
          apiEndpoint: '[https://prod.speedymeds.com/api](https://prod.speedymeds.com/api)'
        };
      } else {
        config.backgroundColor = '#f0f0f0'; // Example development setting
         config.extra = {
          apiEndpoint: '[https://dev.speedymeds.com/api](https://dev.speedymeds.com/api)'
        };
      }
      // Return the final config object
      return config;
    };
    ```

##### Runtime Access

Most configuration values defined in the app config are accessible within the application's JavaScript code at runtime via the `Constants.expoConfig` object from the `expo-constants` library. - [Configure with app config - Expo Documentation](https://docs.expo.dev/workflow/configuration/)

##### Reference

For a complete list of all available properties, consult the [App config reference](https://docs.expo.dev/versions/latest/config/app/). - [app.json / app.config.js - Expo Documentation](https://docs.expo.dev/versions/latest/config/app/)

#### **`babel.config.js`**

Configures Babel, the JavaScript compiler. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/)

##### Role

Babel transforms modern JavaScript syntax (like ES6 features, JSX used in React) into code that can be understood by the JavaScript engine running the app (typically Hermes on native, or standard browser engines for web). - [babel.config.js - Expo Documentation](https://docs.expo.dev/versions/latest/config/babel/) It ensures code compatibility across different environments.

##### Default Preset (`babel-preset-expo`)

Expo projects automatically use `babel-preset-expo`. This preset intelligently configures Babel for React Native, extending the base `@react-native/babel-preset`. - [babel-preset-expo - NPM](https://www.npmjs.com/package/babel-preset-expo) It includes necessary transforms for JSX, Flow/TypeScript stripping, and automatically enables plugins for libraries like `react-native-reanimated` if they are installed in the project. - [Install Expo Router - Expo Documentation](https://docs.expo.dev/router/installation/) It also handles platform-specific optimizations like tree-shaking for web builds. - [babel-preset-expo - NPM](https://www.npmjs.com/package/babel-preset-expo)

##### Customization

While often unnecessary, customization is possible. Running `npx expo customize babel.config.js` creates the file with the default preset. - [babel.config.js - Expo Documentation](https://docs.expo.dev/versions/latest/config/babel/)

```javascript
// Default babel.config.js
module.exports = function(api) {
  api.cache(true); // Cache results for faster builds
  return {
    presets: ['babel-preset-expo'],
    // Add custom plugins here if needed
    // plugins: ['my-custom-babel-plugin']
  };
};

```

Changes require restarting the Metro bundler, often with the --clear flag (npx expo start --clear) to ensure the cache is updated. - Install Expo Router - Expo Documentation
#### **`metro.config.js`**

Configures the Metro bundler. - [create-expo-app - Expo Documentation](https://docs.expo.dev/more/create-expo/)

##### **Role**

Metro takes the application's entry point (e.g., expo-router/entry), resolves all imported JavaScript modules and assets (images, fonts), transforms the code using Babel, and bundles everything into one or more JavaScript files that the client app (Expo Go or Development Build) can execute. - [Metro bundler - Expo Documentation](https://docs.expo.dev/guides/customizing-metro/) It also runs the development server that facilitates Fast Refresh.

##### **Default Config (expo/metro-config)**

Expo provides a default Metro configuration (expo/metro-config) that handles most common React Native and Expo requirements, including support for TypeScript, asset handling, and platform extensions (.ios.js, .android.js, .native.js). - [Metro bundler - Expo Documentation](https://docs.expo.dev/guides/customizing-metro/)

##### **Customization**

Customizations can be made by creating a metro.config.js file (using npx expo customize metro.config.js) and modifying the exported configuration object, ensuring it extends the default Expo config. - [Metro bundler - Expo Documentation](https://docs.expo.dev/guides/customizing-metro/)

```javascript
// Example metro.config.js extending default and adding SVG assets
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow Metro to handle SVG files as assets
config.resolver.assetExts.push('svg');

// Add 'cjs' for CommonJS modules if needed (example)
// config.resolver.sourceExts.push('cjs');

module.exports = config;
```



Common customizations include adding new file extensions for assets (resolver.assetExts) or source code (resolver.sourceExts). - [Metro bundler - Expo Documentation](https://docs.expo.dev/guides/customizing-metro/) Metro also reads the tsconfig.json (or jsconfig.json) to support path aliases. - [Using TypeScript - Expo Documentation](https://docs.expo.dev/guides/typescript/)

### **Diagram: Anatomy of an Expo Project**

```mermaid
graph TD
    A[Expo Project Root] --> B(package.json);
    A --> C(app.config.js);
    A --> D(babel.config.js);
    A --> E(metro.config.js);
    A --> F(tsconfig.json);
    A --> G(node_modules/);
    A --> H(assets/);
    A --> I(app/);
    A --> J(components/);
    A --> K(.gitignore);

    B -- defines dependencies --> G;
    B -- defines scripts --> A;
    C -- configures app metadata & native settings --> A;
    C -- lists plugins --> A;
    D -- configures JS transpilation --> E;
    E -- bundles JS & assets --> A;
    E -- reads --> D;
    E -- reads --> F;
    F -- configures TypeScript --> A;
    H -- contains --> L[icon.png];
    H -- contains --> M[splash.png];
    I -- contains --> N[(_layout.tsx, index.tsx,...)];
    J -- contains --> O[(Custom Components)];

    subgraph Configuration
        C; D; E; F;
    end
    subgraph "Code & Assets"
        H; I; J;
    end
    subgraph Dependencies
        G;
    end
    subgraph "Project Management"
        B; K;
    end

    style G fill:#eee,stroke:#333,stroke-width:1px
    style H fill:#eee,stroke:#333,stroke-width:1px
    style I fill:#eee,stroke:#333,stroke-width:1px
    style J fill:#eee,stroke:#333,stroke-width:1px
```



> The way Expo centralizes a significant amount of project configuration—spanning app metadata, native platform settings, build options, and plugin integrations—into app.json or its dynamic counterparts (app.config.js/.ts) is a cornerstone of its developer experience. - [Develop an app with Expo - Expo Documentation](https://docs.expo.dev/workflow/overview/) This contrasts sharply with traditional native development or even standard React Native CLI projects, where configurations are often scattered across various platform-specific files (like AndroidManifest.xml, build.gradle, Info.plist, Xcode project settings). Expo provides a unified, JavaScript-based layer for managing these settings. - [Develop an app with Expo - Expo Documentation](https://docs.expo.dev/workflow/overview/) This abstraction is further empowered by Config Plugins, which allow libraries or developers to programmatically modify the underlying native project files based on the app config during the prebuild step. - [Config plugins: Introduction - Expo Documentation](https://docs.expo.dev/guides/config-plugins/) This "configuration as code" paradigm is fundamental to enabling Continuous Native Generation (CNG). With CNG, the android and ios directories are treated not as primary source code to be manually edited and version-controlled, but as build artifacts generated deterministically from the project's configuration and dependencies. - [Overview of using Expo with existing React Native apps - Expo ...](https://docs.expo.dev/bare/overview/) Consequently, developers need to understand that app.config.js is more than just metadata; it's a powerful mechanism for controlling the native aspects of the application, often without directly touching native code, especially when used in conjunction with prebuild and config plugins. This represents a significant departure and simplification compared to the standard React Native CLI workflow.

## **5. Running Your Application**
Once the project is created and the basic structure is understood, the next step is to run the application and see it in action on the iOS Simulator.

### **The Development Server (npx expo start)**

The core command to initiate the development process is `npx expo start`.

#### **Functionality**
Running this command in the project's root directory starts the Metro bundler and the Expo development server. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Metro is responsible for taking all the JavaScript code and assets, resolving dependencies, and creating a JavaScript bundle that the client application can understand and execute. - [Metro bundler - Expo Documentation](https://docs.expo.dev/guides/customizing-metro/) The development server facilitates communication between the development machine and the client app (running on a simulator or physical device), enabling features like live reloading and Fast Refresh.

#### **Terminal UI**
Upon successful startup, the terminal displays several pieces of information - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/):

* A QR code: Scanning this with the Expo Go app on a physical device connects it to the development server.
* Network URLs: URLs for accessing the app over the local network or via a tunnel if enabled.
* Logs: Output from the Metro bundler and potentially from the running application (console.log statements).
* Interactive Menu: A list of keyboard commands to interact with the development process (e.g., opening the app on different platforms, reloading, opening developer tools). Pressing ? displays all available commands. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/)

### **Launching on the iOS Simulator**
With the development server running, launching the app on the iOS Simulator is straightforward:

* **Primary Method**: Press `i` in the terminal window where `npx expo start` is running. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) Expo CLI will attempt to launch the app on the most recently opened iOS Simulator. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/)
* **Selecting a Specific Simulator**: If multiple simulators are installed or running, or if the default behavior doesn't target the desired one, press `Shift + i`. This presents a list of available simulators to choose from. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) Alternatively, one can ensure the desired simulator is the only one open before pressing `i`, or use the more explicit `npx expo run:ios --device "Simulator Name"` command (e.g., `npx expo run:ios --device "iPhone 15 Pro"`) which builds and installs specifically for that device. - [react native - Expo: Change default IOS simulator - Stack Overflow](https://stackoverflow.com/questions/41961685/expo-change-default-ios-simulator)
* **First Launch Experience**: The first time the app is launched on a clean simulator, it might prompt for permission to open the Expo Go app (if Expo Go is the target). - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) The simulator will then connect to the Metro server running on localhost (or the specified host/port) to download and execute the JavaScript bundle.

### **Understanding npx expo \<command\> vs. Global Commands**
It's important to use the correct method for invoking Expo CLI commands within a project:

* **`npx expo <command>`**: (Or `yarn expo <command>`, `pnpm expo <command>`) This command uses the version of the expo-cli package installed locally within the project's node_modules directory. This is the recommended approach because it guarantees that the CLI version being used is compatible with the specific Expo SDK version the project depends on. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/)
* **Global `expo` command**: If expo-cli was installed globally (`npm install -g expo-cli`), running `expo <command>` uses that global installation. This version might differ from the project's required version, potentially leading to unexpected errors or compatibility issues.

Therefore, consistently use `npx expo...` (or the equivalent for the package manager being used) for all commands related to the project (e.g., `npx expo start`, `npx expo install`, `npx expo prebuild`).

### **Essential Command Line Flags (npx expo start flags)**
The `npx expo start` command accepts several flags to modify its behavior:

* **`--port <number>`**: Specifies a different network port for the Metro server to listen on (default is often 8081 or 19000, but Expo dynamically selects an available one). - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Example: `npx expo start --port 8088`.
* **`--clear` (`-c`)**: Clears the Metro bundler cache before starting. This is a crucial troubleshooting step when encountering stale code, resolution errors, or unexpected behavior after configuration changes. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Example: `npx expo start --clear`.
* **`--dev-client`**: Forces the app to attempt launching in a Development Build, even if Expo Go is available. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Useful when specifically testing a development build workflow.
* **`--go`**: Forces the app to attempt launching in the Expo Go app, overriding detection of a development build. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Useful for quick tests if both environments are set up.
* **`--tunnel`**: Starts a tunnel using ngrok, providing a publicly accessible HTTPS URL for the development server. - [Migrate from React Native CLI to Expo CLI - Expo Documentation](https://docs.expo.dev/workflow/already-used-react-native/) This is useful for:
  * Testing on physical devices when the device cannot connect to the development machine over the local network.
  * Sharing the development app with others outside the local network.
  * Working in environments with restrictive firewalls.
  * Note: Tunneling can be slower than local connections, and the URL is public. May require installing @expo/ngrok globally (`npm i -g @expo/ngrok`). - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/)
* **`--offline`**: Starts the development server without making any outbound network requests. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Useful for development without an internet connection, although initial dependency resolution still requires connectivity.

### **Exercise: Launching the SpeedyMeds Template**
**Goal**: Gain hands-on experience initializing and running a basic Expo application using Expo Snack, observing the development workflow.

**Tool**: Expo Snack (snack.expo.dev)

**Theme**: Pharmacy / SpeedyMeds

**Duration**: 15-20 minutes

**Tasks**:
1. **Open the Starter Snack**: Navigate to the following pre-configured Expo Snack: https://snack.expo.dev/@course-materials/speedymeds-env-setup-exercise (Note: This is a placeholder URL; a real Snack would need to be created). This Snack contains a basic App.tsx file displaying a simple welcome message for the SpeedyMeds app.
2. **Fork the Snack**: Click the "Fork" button in the Snack interface to create your own editable copy.
3. **Explore Previews**: Observe the application running in the different preview tabs: "Web", "Android", and "iOS".
4. **Modify the Code**: In the App.tsx file within the editor pane, locate the `<Text>` component displaying the welcome message. Change the text to something different, for example: "Welcome to the SpeedyMeds Kiosk!".
5. **Observe Fast Refresh**: Notice how the previews in the Web, Android, and iOS tabs automatically update almost instantly to reflect the code change. This demonstrates Expo's Fast Refresh capability, powered by the Metro bundler.
6. **(Optional) Introduce an Error**: Try introducing a syntax error (e.g., remove a closing tag) and observe the error message that appears in the preview and the Snack console. Correct the error to see the app recover.

This exercise provides a low-friction introduction to the basic edit-and-refresh cycle fundamental to React Native development with Expo.
> The typical development workflow in React Native, especially with Expo, relies on a distinct client-server model. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Unlike traditional native development where compiled code runs self-contained, or web development where the browser fetches static assets, React Native development involves:
> * A client application (Expo Go or a Development Build) running on the target platform (simulator or physical device).
> * A development server (powered by the Metro bundler) running on the host machine (the developer's computer).
> 
> The client connects to the server (usually over the local network) to fetch the JavaScript bundle containing the application logic and UI definitions. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) This architecture is what enables rapid iteration through features like Fast Refresh: when JavaScript code is saved, Metro quickly rebundles only the changed parts and sends the update to the client, which applies the changes often without losing application state. - [What is metro bundler in react-native? - Stack Overflow](https://stackoverflow.com/questions/48158438/what-is-metro-bundler-in-react-native) This avoids the time-consuming native recompilation cycle required for native code changes. Understanding this separation is key for troubleshooting. Problems might originate from the client (e.g., simulator crashes, native module issues in a Development Build) or the server (e.g., Metro bundling errors, caching problems). Tools like the `--tunnel` flag further highlight this model by allowing the client and server to operate across different networks. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) It's also important to remember that this client-server model is specific to development; production builds typically embed the final JavaScript bundle directly within the native application package. - [What is metro bundler in react-native? - Stack Overflow](https://stackoverflow.com/questions/48158438/what-is-metro-bundler-in-react-native)

## **6. Choosing Your Development Environment: Go vs. Builds**
Expo provides distinct environments for running React Native applications during different phases of the development lifecycle. Understanding the purpose and limitations of each is crucial for an efficient workflow and for achieving production readiness. The main choices during development are Expo Go and Development Builds.

### **Expo Go: The Sandbox**

Expo Go is a pre-built native application, available for free from the Google Play Store and Apple App Store, developed and maintained by the Expo team. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/)

#### **How it Works**
It acts as a sandbox or container. When an Expo project is started using `npx expo start`, Expo Go can connect to the development server (via QR code scan or local network discovery) and execute the project's JavaScript bundle. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) Expo Go comes pre-packaged with a specific version of the Expo SDK, meaning it already contains the native code for many common Expo libraries (like camera, location, etc.). - [FAQ - Expo Documentation](https://docs.expo.dev/faq/)

#### **Use Cases**

Expo Go is exceptionally useful for:
* **Initial Learning & Experimentation**: Getting started quickly without any native build setup. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/)
* **Prototyping**: Rapidly building and testing UI and basic functionality using the included Expo SDK modules. - [Expo Go](https://expo.dev/go)
* **Simple Course Exercises**: Convenient for exercises that don't involve custom native code or complex native configurations.

#### **Critical Limitations**
Despite its convenience, Expo Go has significant limitations that prevent its use for developing and testing many features required in production applications - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/):

* **No Custom Native Code**: The most significant limitation. Expo Go's native code is fixed; it cannot load or run any third-party native modules or custom native code that isn't already part of the pre-built Expo SDK version it includes. - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use) Attempting to use such libraries (e.g., react-native-firebase, specific hardware interaction modules) will result in runtime errors because the corresponding native implementation is missing. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **Limited Native Configuration Testing**: Changes made in app.json or via config plugins that affect native project files (e.g., Info.plist, AndroidManifest.xml, build settings) cannot be fully tested in Expo Go. This includes:
  * **App Icon/Name/Splash Screen**: Expo Go shows an emulated splash screen but cannot display the actual configured native splash screen or test advanced splash screen behavior. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) The app icon and name displayed are those of Expo Go itself, not the project's configured ones.
  * **Other Native Settings**: Testing specific entitlements, URL schemes (beyond basic Expo Go handling), background modes, or other native manifest settings is not possible. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **No Remote Push Notifications**: While local notifications can be triggered, receiving remote push notifications (sent from a server via APNs or FCM) is not supported in Expo Go. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) This requires app-specific certificates and setup incompatible with the generic Expo Go client.
* **No App/Universal Links**: Testing deep linking mechanisms that require native configuration (like iOS Universal Links or Android App Links verifying associated domains) is impossible in Expo Go. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **Older SDKs on iOS Devices**: Expo Go in the App Store only supports the latest Expo SDK version. Due to Apple's restrictions on installing older app versions, testing projects using older SDKs on a physical iPhone requires a Development Build. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **Potential Behavior Discrepancies**: Because the app runs under Expo Go's bundle identifier/package name, certain integrations or platform behaviors might differ slightly compared to a standalone production build. - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use)

### **Development Builds: Your Custom Environment**
Development Builds are the recommended solution for overcoming Expo Go's limitations and developing production-grade applications. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/)

#### **Concept**

A Development Build is essentially a debug version of your actual application, built with your specific native dependencies and configurations, but with added development tooling. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) It's like creating your own personalized, customizable version of Expo Go. - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/)

#### **Role of expo-dev-client**
To create a Development Build, the expo-dev-client library must be installed in the project (`npx expo install expo-dev-client`). - [Local app development - Expo Documentation](https://docs.expo.dev/develop/development-builds/use-development-builds/) This library injects development features into the debug build, including:

* **A launcher screen**: Appears when the build is opened, showing connection status and allowing connection to different development servers (e.g., your local machine, a tunnel URL, or even a specific EAS Update branch). - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **The developer menu**: Accessible via shake gesture or keyboard shortcut, providing options like reloading, element inspection, performance monitoring, etc.. - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
* **Error overlays and improved debugging information**.

#### **Overcoming Go's Limitations**
Development Builds directly address the shortcomings of Expo Go - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli):

* **Any Native Code**: Allows the inclusion and use of any third-party native module or custom native code.
* **Full Native Config Testing**: Enables complete testing of all native configurations defined in app.json or via config plugins, including the actual app icon, splash screen, push notifications, deep links, background modes, entitlements, etc.
* **Any SDK Version**: Works with any Expo SDK version, including older ones, on all platforms (including physical iOS devices).

#### **Creation Methods**
Development Builds require a native build process:

* **EAS Build (Cloud)**: The easiest method, especially if local native tooling isn't set up. Uses the command `eas build --profile development` (profiles are configured in eas.json). - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) Requires an Expo account and EAS CLI setup. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) EAS handles the native build environment (macOS for iOS, Linux for Android) and signing (for development).
* **Local Build**: Uses the commands `npx expo run:android` or `npx expo run:ios`. This requires having the respective native development environment fully configured locally (Android Studio + SDK/JDK for Android, Xcode + Command Line Tools for iOS). - [Local app development - Expo Documentation](https://docs.expo.dev/develop/development-builds/use-development-builds/) If the android or ios directories don't exist, these commands implicitly run `npx expo prebuild` first to generate them based on the project configuration. - [Local app development - Expo Documentation](https://docs.expo.dev/develop/development-builds/use-development-builds/)

### **Production Builds: Ready for Release**
Production Builds are the final, optimized versions of the application intended for distribution.

#### **Purpose**

These builds are stripped of development tools (expo-dev-client is not included), optimized for performance and size, and configured for release (e.g., using production API keys, disabling debug features). - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) They are the builds submitted to the Apple App Store and Google Play Store or distributed internally.

#### **Creation**
Typically created using EAS Build with a production profile: `eas build --profile production`. - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) EAS Build handles the complexities of code signing for release, which is often a challenging part of native development. - [Putting the Expo vs React Native debate to rest | Retool Blog | Cache](https://retool.com/blog/expo-cli-vs-react-native-cli)

### **Enhanced Table: Expo Development Environments Compared**

This table summarizes the key differences between the three environments:

| Feature | Expo Go | Development Build | Production Build (EAS Build) |
|---------|---------|-------------------|------------------------------|
| Setup | Install from App Store - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) | Build via EAS or Locally - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) | Build via EAS Build - [docs.expo.dev](https://docs.expo.dev/llms-full.txt) |
| Custom Native Code | No - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) | Yes |
| Third-Party Native Libs | Only pre-included Expo SDK - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use) | Any - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) | Any |
| Native Config Testing | Limited (Icon/Splash Emulation) - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes (Full: Icon, Splash, Push, Links) - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | N/A (Is the final config) |
| Remote Push Notifications | No - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes |
| Deep Linking (App/Univ.) | No - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Yes |
| Developer Tools | Built-in (Dev Menu, Fast Refresh) - [Introduction to development builds - Expo Documentation](https://docs.expo.dev/develop/development-builds/introduction/) | Included via expo-dev-client - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) | No |
| Use Case | Learning, Prototyping, Simple SDK tests - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) | Development, Full Feature Testing - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use) | App Store Distribution, Release - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) |
| Creation Method | Download - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) | `eas build --profile development` or `npx expo run:[platform]` - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) | `eas build --profile production` - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) |
### **Diagram: Expo Development Lifecycle**

This flowchart illustrates the typical progression through Expo's development environments:

```mermaid
graph TD
    Start --> A{Create Project: `npx create-expo-app`};
    A --> B{Start Dev Server: `npx expo start`};
    B --> C{Run in Expo Go?};
    C -- Yes --> D[Expo Go: Learning/Prototyping];
    D --> E{Limitations Hit? (Native Code/Config)};
    C -- No --> F{Install `expo-dev-client`};
    E -- Yes --> F;
    F --> G{Build Dev Build};
    G -- Cloud --> H[`EAS Build: \`eas build --profile development\``];
    G -- Local --> I[`Local Build: \`npx expo run:[platform]\``];
    H --> J[Run Development Build];
    I --> J;
    J --> K{Connect Dev Server: `npx expo start`};
    K --> L[Development & Testing];
    L --> M{Ready for Release?};
    M -- Yes --> N[`EAS Build: \`eas build --profile production\``];
    N --> O[Production Build (.ipa/.aab)];
    O --> P[Submit to Stores];
    M -- No --> L;
    E -- No --> L;

    style D fill:#f9f,stroke:#333,stroke-width:2px
    style L fill:#ccf,stroke:#333,stroke-width:2px
    style O fill:#9cf,stroke:#333,stroke-width:2px
```



> **Callout: Transitioning from Expo Go to Development Builds**
>
> The transition from Expo Go to a Development Build becomes necessary when the project's requirements exceed Expo Go's capabilities. This typically occurs when:
> * A third-party library containing custom native code (not included in the Expo SDK) needs to be installed (e.g., react-native-firebase, specific hardware SDKs).
> * Accurate testing of native configurations is required, such as the final app icon, native splash screen behavior, remote push notifications, or universal/app links.
> * Development needs to occur using an older Expo SDK version on a physical iOS device.
> 
> Most applications intended for production will necessitate a transition to Development Builds relatively early in their lifecycle. - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) The process is designed to be straightforward: install the expo-dev-client package, create the development build using either EAS Build or local commands, and then run `npx expo start`. The development server will automatically detect and connect to the running Development Build instead of attempting to launch Expo Go. - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/)
> Development Builds serve as a critical bridge between the simplicity of Expo Go and the requirements of a production application. - [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/) While Expo Go provides an unparalleled easy entry point, its inherent limitations regarding native code and configuration testing make it unsuitable for comprehensive development and testing of complex applications. - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use) Production builds, the ultimate goal, lack the necessary development tools for efficient iteration. - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) Development Builds elegantly solve this by combining the flexibility to include any native code and test all configurations (like a production app) with the essential development tooling provided by expo-dev-client (similar to Expo Go's tooling). - [Create a development build - Expo Documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) This allows developers to test features like push notifications, deep linking, and custom native modules within an environment that closely mirrors the final production app, while still benefiting from the rapid iteration cycle enabled by Fast Refresh. - [Expo Go vs Development Builds: Which should you use?](https://expo.dev/blog/expo-go-vs-development-builds-which-should-you-use) Therefore, mastering the creation and usage of Development Builds is not merely an advanced topic but a fundamental skill for any developer aiming to build production-ready applications using the Expo ecosystem. This module emphasizes its importance and outlines the pathways (EAS Build or local builds) to create them.

## **7. Troubleshooting Common Setup & Runtime Issues**
Encountering issues during setup or development is a normal part of the software development process. Developing a systematic approach to troubleshooting is essential.

### **Proactive Debugging Mindset**

When faced with an error or unexpected behavior:

* **Read Carefully**: Pay close attention to the full error message in the terminal, simulator, or browser console. Often, the message itself contains clues about the root cause.
* **Check Logs**: Examine the terminal output from `npx expo start` (for Metro bundler errors) and, if applicable, the native build logs (from `npx expo run:[platform]` or the EAS Build details page). - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
* **Isolate the Problem**: Try to reproduce the issue in a minimal context. Does it happen in a newly created project (`npx create-expo-app@latest`)? Does commenting out recent code changes resolve it?
* **Consult Documentation**: Search the official Expo and React Native documentation for the error message or related concepts.
* **Search the Community**: Look for solutions on Stack Overflow, the Expo Forums (forums.expo.dev), the Expo Discord server (chat.expo.dev), or relevant GitHub repositories. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/) Provide clear details and error logs when asking for help.

### **Common Problem Areas & Solutions**
Here are some frequently encountered issues and their potential solutions:

#### **Dependency/Installation Issues**

* **Problem**: Errors during npm install, yarn install, or npx expo install. Corrupted node_modules or lock files.
  * **Solution**: Delete the node_modules directory and the package-lock.json (for npm) or yarn.lock (for yarn) file, then run npm install or yarn install again. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
* **Problem**: Peer dependency warnings during installation.
  * **Solution**: Often, these warnings can be ignored if the app works correctly. If issues arise, investigate the specific peer dependency conflict. Using `npm install --legacy-peer-deps` can sometimes resolve installation blockage but should be used cautiously as it might lead to runtime incompatibilities. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
* **Problem**: Incompatible versions of Expo SDK packages installed.
  * **Solution**: Always use `npx expo install <package-name>` instead of `npm install` or `yarn add` for packages within the Expo SDK or those known to have version dependencies with the SDK. This command ensures compatible versions are installed. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/) Run `npx expo-doctor` to diagnose dependency version mismatches. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)

#### **Metro Bundler Issues**
* **Problem**: Development server (`npx expo start`) fails to start, crashes, or behaves erratically. Stale code is served.
  * **Solution**: Clear the Metro cache using the `--clear` flag: `npx expo start --clear`. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/)
* **Problem**: "Unable to resolve module <module_name>" error. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
  * **Solution**:
    * Verify the import path is correct (check spelling, case sensitivity, and relative path).
    * Ensure the imported file actually exists.
    * Check that the required package is listed in package.json and installed in node_modules.
    * Make sure the file isn't accidentally excluded by .gitignore. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
    * Restart the Metro server (`npx expo start --clear`).
* **Problem**: Errors related to babel.config.js or metro.config.js after customization.
  * **Solution**: Double-check the syntax in the configuration file. Ensure it extends the default Expo configurations correctly (babel-preset-expo, expo/metro-config). Restart Metro with `--clear`. - [babel.config.js - Expo Documentation](https://docs.expo.dev/versions/latest/config/babel/)
* **Problem**: EXPO_ROUTER_APP_ROOT not defined error (specific to Expo Router).
  * **Solution**: This usually indicates an issue with the Babel configuration for Expo Router. Ensure babel-preset-expo is correctly set up in babel.config.js (it includes the router plugin). Try clearing the cache (`npx expo start --clear`). - [Troubleshooting - Expo Documentation](https://docs.expo.dev/router/troubleshooting/) Verify the metro.config.js extends expo/metro-config. - [Troubleshooting - Expo Documentation](https://docs.expo.dev/router/troubleshooting/)

#### **Native Build Failures (Local run:ios or EAS Build)**
* **Problem**: Errors during the native compilation phase (e.g., "PhaseScriptExecution", Gradle errors, Pod installation failures, linking errors).
  * **Solution**:
    * **Clean Build Artifacts**: For local builds, clean the native build caches. In Xcode, go to Product > Clean Build Folder. For Android, run `./gradlew clean` inside the android directory. If using CNG, regenerating the native directories with `npx expo prebuild --clean` can resolve issues caused by stale or corrupted native files. - [Continuous Native Generation (CNG) - Expo Documentation](https://docs.expo.dev/workflow/prebuild/)
    * **Check Tool Versions**: Ensure the correct version of Xcode and the Xcode Command Line Tools are installed and selected in Xcode settings. - [Xcode 16.3 and SDK 52 / React Native 0.76 · Issue #35807 · expo/expo - GitHub](https://github.com/expo/expo/issues/35807) Verify Java JDK and Android SDK installations if building for Android.
    * **Examine Logs**: Carefully review the full build logs from EAS Build or the local build command output. Native errors can be verbose, but often the root cause is indicated near the first error message. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/) Distinguish between JavaScript (Metro) errors and native compilation errors. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
    * **Test Locally (Release Mode)**: Before relying solely on EAS Build, try building locally in release configuration: `npx expo run:ios --configuration Release` or `npx expo run:android --variant release`. If this fails, the issue is likely in the project setup or local environment. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)
    * **Verify Environment**: Ensure consistency in Node.js versions, environment variables, and dependency versions between the local setup and the EAS Build environment. - [Troubleshoot build errors and crashes - Expo Documentation](https://docs.expo.dev/build-reference/troubleshooting/)

#### **Simulator/Expo Go Connectivity Issues**
* **Problem**: Simulator launches, but the app doesn't load inside Expo Go, or the connection fails. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) QR code scanning doesn't work.
  * **Solution**:
    * **Network**: Ensure the simulator/device and the development machine are on the same Wi-Fi network. Check for firewalls or network configurations that might block connections on the required ports (usually 8081, 19000-1900x).
    * **Restart Everything**: Stop the Metro server (Ctrl+C), close the Simulator/Expo Go app, and restart the server (`npx expo start`).
    * **Reinstall Expo Go**: On the simulator, try manually uninstalling Expo Go (long-press the icon) or erasing the simulator content (Device > Erase All Content and Settings...). Then, press `i` (or `Shift+i`) in the Expo CLI to reinstall Expo Go. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/)
    * **Use Tunnel**: If persistent network issues are suspected, try running with the tunnel flag: `npx expo start --tunnel`. - [Expo CLI - Expo Documentation](https://docs.expo.dev/more/expo-cli/)

### **Challenge: Fixing a Broken Pharmacy App Setup**
**Goal**: Apply troubleshooting techniques to diagnose and resolve common errors in a sample Expo project.

**Tool**: Expo Snack (snack.expo.dev) or a provided Git repository branch.

**Theme**: SpeedyMeds - Error Reporting Kiosk

**Duration**: 30-45 minutes

**Scenario**:
Access the provided "broken" Expo Snack: https://snack.expo.dev/@course-materials/speedymeds-env-setup-challenge (Note: Placeholder URL). This Snack represents a simple "Error Reporting Kiosk" for the SpeedyMeds pharmacy. It has been intentionally modified to include a few common errors:

* **Metro Error**: An incorrect import path for a component (e.g., importing ./Component/Button instead of ./components/Button) is causing an "Unable to resolve module" error.
* **Runtime Error**: A component attempts to use a function or component from a library (e.g., expo-device) that has not been added as a dependency in the Snack's configuration (or package.json if using a repo). This might cause a runtime crash or a different Metro error.
* **(Optional - if using repo)**: A configuration error in app.json, such as referencing a non-existent asset file for the icon, leading to a warning or potential build issue later.

**Task**:
1. **Fork the Snack/Clone the Branch**: Create your own copy to work on.
2. **Identify the Errors**: Observe the errors displayed in the Snack previews/console or the terminal output when running the project locally.
3. **Diagnose and Fix**:
   * Analyze the error messages to understand the problems.
   * Locate the incorrect import path in the code and correct it.
   * Identify the missing dependency. Add the required package (e.g., expo-device) using the Snack interface's dependency manager (or `npx expo install expo-device` locally). Update the code to import and use it correctly if necessary.
   * (If applicable) Find and fix the configuration error in app.json.
4. **Verify**: Ensure the application runs without errors in the previews after applying the fixes. The kiosk should display correctly.
5. **Document**: Briefly describe the errors encountered and the steps taken to resolve each one.

This challenge simulates real-world debugging scenarios, reinforcing the importance of careful error analysis and systematic problem-solving.
> The prevalence of troubleshooting sections in documentation and the volume of setup-related questions in community forums underscore a critical reality: debugging is a core competency for mobile developers. - [iOS Simulator - Expo Documentation](https://docs.expo.dev/workflow/ios-simulator/) The complexity arises from the multiple layers involved – the JavaScript runtime (Node.js, Hermes), the React Native framework itself, the native platform (iOS/Android SDKs), build tools (Xcode, Gradle), the bundler (Metro), and the Expo-specific tooling and services. An error can originate in any of these layers. While Expo significantly simplifies many aspects, particularly the initial setup and native builds, it doesn't eliminate the possibility of encountering issues, especially as applications grow in complexity, integrate numerous third-party libraries, or involve custom native code. Therefore, developers must cultivate the ability to systematically diagnose problems across this entire stack. This involves more than just knowing specific commands; it requires learning how to effectively read and interpret logs, understand different types of error messages (JavaScript vs. native), isolate the source of the problem, and leverage documentation and community resources. This troubleshooting section and the accompanying challenge aim to instill this methodical approach, which is indispensable for becoming a productive and self-sufficient React Native developer.

## **8. Expo Snack: The Online React Native Playground**
Expo Snack (snack.expo.dev) is an invaluable tool, especially during the learning process. It's an open-source, web-based IDE that allows writing and running React Native code directly in the browser without any local installation. - [expo/guides/Expo Documentation Writing Style Guide.md at main - GitHub](https://github.com/expo/expo/blob/main/guides/Expo%20Documentation%20Writing%20Style%20Guide.md)

### **How it Works**

Snack operates by executing the React Native JavaScript code within a pre-built runtime environment, similar in concept to how Expo Go works. - [snack/docs/snack-sdk.md at main · expo/snack - GitHub](https://github.com/expo/snack/blob/main/docs/snack-sdk.md) It provides live previews for Web, Android, and iOS simultaneously within the browser interface. Code changes made in the editor are typically reflected near-instantly in the previews thanks to Fast Refresh. It uses the snack-sdk internally to manage the code, dependencies, and communication with the preview runtimes. - [snack/docs/snack-sdk.md at main · expo/snack - GitHub](https://github.com/expo/snack/blob/main/docs/snack-sdk.md)

### **Benefits for Learning and Collaboration**
* **Zero Setup**: The most significant advantage for learners is the complete elimination of local environment setup for basic tasks. Participants can start writing and running React Native code immediately. - [Get Support - Expo](https://docs.expo.dev/more/support/)
* **Easy Sharing & Embedding**: Snacks can be saved and shared via a simple URL, making it easy to share code examples, bug reproductions, or exercise solutions. - [Get Support - Expo](https://docs.expo.dev/more/support/) They can also be embedded directly into websites or documentation platforms. - [Get Support - Expo](https://docs.expo.dev/more/support/)
* **Rapid Experimentation**: Provides a quick and easy way to test small code snippets, experiment with different Expo SDK APIs, or try out UI ideas without creating a full local project.
* **Course Consistency**: Using Snack for exercises ensures all participants have the same starting point and runtime environment, minimizing setup-related discrepancies.

### **Key Limitations to Be Aware Of**
While extremely useful, Snack has limitations similar to Expo Go, making it unsuitable for developing full-scale production applications:

* **No Custom Native Modules**: Like Expo Go, Snack can only execute code that relies on the Expo SDK modules pre-bundled within its runtime environment. It cannot run projects requiring third-party native modules or custom native code [Implied by similarity to Go and focus on code sharing].
* **Limited Native Configuration Testing**: Testing features that depend on specific native configurations (app icons, splash screens, push notifications, deep linking, background tasks) is generally not possible or highly limited in Snack. - [Notifications - Expo Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
* **Performance Differences**: The performance observed in Snack previews might not accurately reflect the performance on real devices.
* **Not for Complex Projects**: Snack is designed for smaller code examples and experiments, not for managing large, multi-feature applications or long-term development efforts. - [Get Support - Expo](https://docs.expo.dev/more/support/)
* **API Limitations**: Certain APIs might have limitations within the Snack environment (e.g., web-specific APIs like Web Share might be restricted by the browser context Snack runs in). - [Sharing - Expo Documentation](https://docs.expo.dev/guides/sharing/)

### **Using Snack for Course Activities**
Many of the exercises and some challenges in this course, particularly those focusing on core React Native concepts, UI development, styling, and basic Expo SDK usage (that don't require native builds or specific configurations), will be provided as Expo Snacks. This approach maximizes learning time by minimizing setup overhead for these specific tasks. However, later modules focusing on native capabilities, build processes, and the capstone project will require transitioning to local development using Development Builds.
Expo Snack serves as a powerful learning accelerator by removing the initial friction of environment setup. - Get Support - Expo This barrier is often the most significant hurdle when learning a new framework. - React Native Expo vs CLI: Key Differences - hashnode.dev Snack allows learners to dive directly into writing code and understanding fundamental React Native concepts—components, props, state, styling—and exploring many Expo SDK APIs without delay. - Get Support - Expo This immediate feedback loop is highly beneficial for reinforcing learning. However, it's crucial to recognize that Snack's limitations mirror those of Expo Go. - Notifications - Expo Documentation It provides a simplified view of the React Native world and does not encompass the full development workflow required for building and testing production applications, especially those involving custom native integrations or configurations. Therefore, while Snack is an excellent pedagogical tool for introductory exercises and illustrating concepts, the curriculum must explicitly address its limitations and guide learners toward local development using Development Builds as they progress to more advanced topics and prepare for real-world application development. Relying solely on Snack would leave a critical gap in understanding the complete Expo and React Native development lifecycle.
9. Module Recap & Next Steps
Summary
This module provided a comprehensive guide to setting up the development environment for React Native using the Expo ecosystem on macOS, targeting the iOS Simulator. Key areas covered include:
Identifying and installing prerequisites: Node.js (LTS), Watchman, and Xcode (including Command Line Tools and an iOS Simulator).
Understanding the Expo ecosystem: Expo Framework, Expo SDK, and Expo Application Services (EAS).
Comparing Expo CLI and React Native CLI, highlighting the advantages of Expo CLI for streamlined development.
Creating a new project using npx create-expo-app@latest and exploring the default project structure and configuration files (app.config.js, babel.config.js, metro.config.js).
Running the application using npx expo start and launching it on the iOS Simulator.
Differentiating between Expo Go, Development Builds, and Production Builds, understanding their specific use cases and limitations.
Developing a systematic approach to troubleshooting common setup and runtime errors.
Introducing Expo Snack as a web-based playground for learning and experimentation.
Key Takeaways
Environment is Key: A correctly configured local environment is the foundation for efficient React Native development.
Expo Simplifies: The Expo framework and CLI significantly streamline the setup, build, and development process compared to the standard React Native CLI workflow, especially for common tasks and accessing device capabilities via the Expo SDK.
Choose Your Environment Wisely: Expo Go is excellent for starting and learning, but Development Builds are essential for testing native features and building production-ready applications. Understanding when to transition is crucial.
Configuration Matters: Files like app.config.js, babel.config.js, and metro.config.js are powerful tools for customizing the application and the build process.
Troubleshooting is a Skill: Expect to encounter issues; learning to diagnose and resolve them effectively using logs, documentation, and community resources is vital.
Next Module Preview
Having established the development environment, the next module, "React Native Fundamentals: Core Components, Props, and State," will dive into the core building blocks of React Native applications. Participants will learn about fundamental components like View, Text, Image, and TextInput, understand how data is passed using props, and manage component state using React Hooks (useState).
Further Resources
For more in-depth information on the topics covered in this module, refer to the official Expo documentation:
Setting up your environment: https://docs.expo.dev/get-started/set-up-your-environment/
Expo CLI Reference: https://docs.expo.dev/more/expo-cli/
App Configuration (app.json/app.config.js): https://docs.expo.dev/versions/latest/config/app/
Development Builds: https://docs.expo.dev/develop/development-builds/introduction/
Expo Go: https://expo.dev/go
Expo Snack: https://snack.expo.dev/
Troubleshooting Build Errors: https://docs.expo.dev/build-reference/troubleshooting/
Continuous Native Generation (Prebuild): <https://docs.expo
