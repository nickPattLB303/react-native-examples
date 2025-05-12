Module 3: Setting Up Your React Native Environment with Expo
Target Versions: React Native 0.7x+, Expo SDK 52+, Node.js LTS (22.x recommended as of mid-2025), Yarn (Optional, v1 or v4+), Android SDK Platform 35, Android SDK Build-Tools 35.0.0, Xcode 15+
Section 1: Introduction to Expo and Expo Go
This section introduces Expo, a framework and platform for building universal React applications, and its development tool, Expo Go. Understanding Expo and its different development approaches is fundamental before setting up the environment.
What is Expo?
Expo is an open-source framework built around React Native that aims to simplify the development of native Android and iOS applications using JavaScript and React.1 It provides a suite of tools and services designed to streamline the entire development lifecycle, from project initialization to deployment. Key features include:
File-Based Routing: Expo Router offers a convention-based routing system similar to web frameworks, simplifying navigation logic.1
Standard Library of Native Modules: The Expo SDK includes a curated set of pre-built native modules (APIs for accessing device capabilities like camera, location, sensors, etc.), eliminating the need for manual native configuration for many common tasks.1
Development Tools: Expo CLI provides commands for starting development servers, building apps, managing dependencies, and more.3
Over-the-Air (OTA) Updates: Allows pushing JavaScript and asset updates directly to users' devices without requiring a new app store submission.1
Expo Application Services (EAS): A complementary set of cloud services for building, submitting, and updating applications, managing credentials, and more.1
Expo maintains an active community on GitHub and(https://chat.expo.dev).1
What is Expo Go?
Expo Go is a pre-built native application available on the Google Play Store and Apple App Store.6 It acts as a sandbox environment, enabling developers to quickly start building and iterating on React Native projects without needing to set up native build tools (Xcode or Android Studio) immediately.6 When a new Expo project is started using npx expo start, developers can scan a QR code using the Expo Go app on their physical device to load and run their project's JavaScript code.8
How Expo Go Works: Under the Hood
Understanding how Expo Go functions requires recognizing the two main parts of a React Native application during development with this tool 6:
The Native App (Expo Go): This is the application installed from the app store. It contains the React Native runtime and a specific, fixed set of native modules and APIs bundled by the Expo team for a particular Expo SDK version. The list of included dependencies can be found in its package.json (e.g., https://github.com/expo/expo/blob/main/apps/expo-go/package.json#L23).6 Once installed, this native part is immutable.
The JavaScript Bundle: This is the code written by the developer (React components, logic, styles). When npx expo start is run, a development server (Metro bundler) starts on the developer's machine. Expo Go connects to this server over the local network (or via a tunnel) and downloads the JavaScript bundle.
React Native acts as the bridge, allowing the JavaScript code running inside Expo Go to communicate with the native modules already compiled into that specific version of the Expo Go app.6 If the JavaScript code attempts to call a native module that is not included in the installed Expo Go build, the app will crash because the corresponding native code doesn't exist within the sandbox.6
Expo Go vs. Development Builds
While Expo Go provides the fastest way to get started, it has inherent limitations due to its pre-packaged nature.5 For projects requiring more flexibility, Development Builds are the recommended approach.5
A Development Build is essentially a custom "debug" version of your own application, built using your local native toolchain (Xcode/Android Studio) or EAS Build.5 It includes the expo-dev-client library, which provides a developer menu for connecting to the Metro server, similar to Expo Go, but within the context of your actual app build.6
The fundamental difference is control over native code:
Expo Go: Limited to the native modules pre-installed by the Expo team. Cannot add custom native modules or modify native project configurations (like Info.plist or AndroidManifest.xml) directly.6
Development Builds: Allow the inclusion of any native module (from the React Native community or custom-written) and direct modification of native project files or configurations (often managed via Expo Config Plugins).6
Scenarios requiring a Development Build include 6:
Using third-party React Native libraries with native code not included in Expo Go (e.g., react-native-firebase, many Bluetooth or hardware interaction libraries).
Writing custom native modules in Swift/Objective-C or Kotlin/Java.
Testing native UI customizations like custom app icons, splash screens, or deep linking configurations.
Testing features tightly coupled with native configurations, like push notification certificates.
Working on projects using older Expo SDK versions on physical iOS devices (as Apple restricts installing older App Store versions).
Expo Go represents a high level of abstraction, prioritizing immediate startup and ease of use. Development Builds offer a step towards lower-level control, mirroring traditional native development more closely by allowing custom native integration, albeit with the added setup complexity of native toolchains. Expo Application Services (EAS) further complements this by providing cloud infrastructure to manage the build and distribution processes for these potentially more complex custom builds.5 While Expo Go is an excellent entry point for learning and prototyping, most applications intended for production will transition to using Development Builds during their lifecycle.5
Background Bridge Note: Native Developers
Think of Expo Go as analogous to running a pre-compiled shell application where your contribution is primarily the JavaScript logic injected at runtime. You don't control the shell's native dependencies. This contrasts sharply with the standard native workflow where you compile the entire application from source, managing all native libraries (via Gradle/Maven or CocoaPods/SPM) and configurations directly. A Development Build brings the process closer to what you're familiar with; it's your app being compiled, allowing you to integrate any native library or custom native code, just like in traditional Android or iOS development. The expo-dev-client library within it simply adds tooling for connecting to the JavaScript development server.
Background Bridge Note: Web Developers
Imagine Expo Go as a specialized web browser designed specifically to run React Native code. This "browser" comes with a fixed set of built-in "Web APIs" – these are the native modules bundled within Expo Go. Your JavaScript code can only use the APIs provided by this specific browser version. If you need an API not included (like needing a specific browser extension), you can't add it to the standard Expo Go "browser." A Development Build is like compiling your own custom version of this browser, where you can include any specific "APIs" (native modules) you require. This gives you full control over the native capabilities but requires you to manage the "browser" build process itself using native tools (Xcode/Android Studio).
Table 1: Expo Go vs. Development Builds Comparison
Feature
Expo Go
Development Build
Native Module Support
Limited to pre-bundled Expo SDK modules
Any React Native module (Expo SDK, community, custom)
Custom Native Code
Not supported
Supported
Initial Setup
Minimal (Install Expo Go app)
Requires Native Toolchain (Xcode/Android Studio) Setup
Build Process
None (Uses pre-built app)
Requires local build (run:ios/run:android) or EAS Build
Typical Use Case
Learning, Prototyping, Simple Apps
Active Development, Apps with Custom Native Needs
Flexibility
Low
High
Production Readiness
Not recommended for store submission
Foundation for Production Builds

Section 2: Installing Prerequisites
Before creating and running a React Native application using Expo, several essential development tools must be installed and configured on the local machine. These prerequisites form the foundation of the development environment.14
Overview of Prerequisites:
Node.js (with npm): JavaScript runtime and package manager.
Yarn (Optional): An alternative package manager.
Watchman (macOS/Linux): A file-watching service for performance.
Xcode Command Line Tools (macOS): Essential build tools for macOS.
Android Studio (for Android development): IDE and SDK manager for Android.
The requirement for multiple tools and specific versions underscores the complexity inherent in cross-platform native development. React Native acts as a bridge between JavaScript and native platform APIs (iOS/Android). This bridge is sensitive to the versions of the JavaScript runtime (Node.js), the native SDKs (Android SDK, iOS SDK via Xcode), the compilers (Xcode CLTs, JDK), and the JavaScript libraries themselves. A mismatch in any of these components can lead to build failures or runtime errors. Expo's tooling aims to manage this sensitivity, but the initial environment setup demands careful adherence to documented version requirements.14
Node.js and npm
Purpose: Node.js is a runtime environment that allows JavaScript code to be executed outside of a web browser. It's essential for running the Expo CLI, the Metro JavaScript bundler, and various other build scripts and development tools used in React Native development.15 npm (Node Package Manager) is bundled with Node.js and is used to install, manage, and share reusable code packages (dependencies) for the project.15
Target Version: It is strongly recommended to use the latest LTS (Long-Term Support) version of Node.js. LTS versions receive critical bug fixes and security updates for an extended period, providing stability crucial for development environments.15 As of mid-2025, Node.js 22.x is the active LTS line, while 24.x is the "Current" release (slated for LTS in October 2025).22 Using the latest LTS (e.g., 22.x) is generally the safest choice. React Native documentation often specifies a minimum required Node version (e.g., 18+ for RN 0.7x).14
Installation:
macOS: The recommended method is using Homebrew: Open Terminal and run brew install node.15 Alternatively, download the official macOS Installer (.pkg) from nodejs.org or use a version manager like nvm (nvm install --lts).
Windows: The recommended method is downloading the official Windows Installer (.msi) for the LTS version from nodejs.org.14 Run the installer and follow the prompts. Alternatives include using package managers like Chocolatey (choco install nodejs-lts) 14 or nvm-windows.14
Verification: Open a new terminal/command prompt window after installation and run:
node -v (Should display the installed Node.js version, e.g., v22.x.x) 19
npm -v (Should display the installed npm version) 19
Yarn (Optional Package Manager)
Purpose: Yarn is an alternative package manager to npm. Yarn Classic (v1) was often preferred for its performance and deterministic installation behavior (via the yarn.lock file).20 Yarn Modern (v2+) introduced features like Plug'n'Play (PnP), but PnP is incompatible with React Native's module resolution. Therefore, Expo projects using Yarn Modern must configure it to use the traditional node_modules structure by setting nodeLinker: node-modules in a .yarnrc.yml file.20 Developers can choose either npm or Yarn based on preference.
Installation:
Using Corepack (Recommended for Yarn Modern): Corepack is included with Node.js v16.10+. Enable it and install the latest stable Yarn Modern:
Bash
corepack enable
corepack prepare yarn@stable --activate
21
Using npm (for Yarn Classic v1):
Bash
npm install --global yarn
20
macOS (Homebrew): brew install yarn 20
Verification: Open a terminal and run yarn --version.21
Watchman (macOS / Linux)
Purpose: Watchman is a file-watching service developed by Facebook.15
"Under the Hood" Role: The Metro bundler (used by npx expo start) leverages Watchman to efficiently monitor the project's source files for changes. Instead of Metro constantly scanning the entire directory tree (which can be slow, especially on large projects), Watchman uses the operating system's native file system event notifications to quickly detect modifications. When a change is detected, Watchman notifies Metro, which then triggers a rebuild of the affected modules. This mechanism is crucial for enabling fast development features like Fast Refresh (React Native's Hot Module Replacement implementation) while maintaining good performance.15
Installation:
macOS: Recommended method is using Homebrew: brew install watchman.15
Linux: Installation varies by distribution. On Debian/Ubuntu-based systems, try sudo apt-get update && sudo apt-get install watchman. On others, it might require building from source (cloning the repository and following build instructions).15
Windows: Watchman is generally not required or easily installed for React Native development on Windows. Metro uses alternative, less performant file-watching mechanisms on Windows.14
Verification: Open a terminal and run watchman --version.15
Xcode Command Line Tools (macOS)
Purpose: This package provides essential command-line developer tools from Apple's Xcode IDE, including C/C++/Objective-C compilers (Clang), the Git version control system, and other utilities necessary for building software on macOS.29 These tools are required on macOS even if only developing for Android, as some JavaScript dependencies installed via npm/yarn might have native C/C++ addons that need to be compiled during installation.
Installation: The easiest way is to open the Terminal and run:
Bash
xcode-select --install
This command prompts a graphical installer to download and install the tools.30 Alternatively, installing the full Xcode application from the Mac App Store also includes the Command Line Tools (which might need enabling in Xcode Preferences > Locations).
Full Xcode Requirement: Note that the full Xcode application (a large download) is only necessary if you intend to build and run your app on an iOS Simulator or a physical iOS device.14 The Command Line Tools alone are sufficient for general setup and Android development on macOS.
Verification: Open Terminal and run xcode-select -p. A successful installation should output a path, typically /Library/Developer/CommandLineTools.30
Android Studio (for Android Development)
Purpose: Android Studio is the official Integrated Development Environment (IDE) from Google for native Android app development. For React Native developers targeting Android, it's essential because it provides the graphical interface (SDK Manager) to install and manage the required versions of the Android SDK, platform tools, build tools, and emulator system images needed to compile and run the Android version of the app.14
Installation:
Download Android Studio from the official(https://developer.android.com/studio).31
Run the downloaded installer (.dmg on macOS, .exe on Windows, .tar.gz on Linux) and follow the Setup Wizard instructions.31
During the setup wizard or initial launch, ensure the following components are selected for installation: Android SDK, Android SDK Platform, and Android Virtual Device (AVD).14
SDK Manager Configuration: React Native requires specific versions of the Android SDK components.
Open Android Studio. Access the SDK Manager:
macOS: Android Studio > Settings > Languages & Frameworks > Android SDK.
Windows/Linux: File > Settings > Languages & Frameworks > Android SDK.
In the "SDK Platforms" tab, check the box for "Show Package Details" in the bottom right.
Locate and expand the entry for Android 15.0 (VanillaIceCream). Ensure the item named Android SDK Platform 35 is checked.14
Also check a corresponding system image for the emulator, such as Google APIs Intel x86_64 Atom System Image (or Google APIs ARM 64 v8a System Image on Apple Silicon Macs).14
Switch to the "SDK Tools" tab. Again, check "Show Package Details".
Locate and expand the "Android SDK Build-Tools" entry. Ensure version 35.0.0 is checked.14 (Uncheck other Build-Tools versions unless needed for other native projects).
Click "Apply" or "OK" to download and install the selected components.
Environment Variable Setup (ANDROID_HOME / ANDROID_SDK_ROOT): Build tools like Gradle (used by React Native for Android builds) need to know the location of the installed Android SDK. This is configured via an environment variable. While ANDROID_HOME is the traditional variable, ANDROID_SDK_ROOT is the newer, preferred name, though ANDROID_HOME is often still supported for backward compatibility.
Find SDK Location: In the Android Studio SDK Manager, the path to the SDK is displayed at the top. Default locations are typically:
macOS: $HOME/Library/Android/sdk
Windows: %LOCALAPPDATA%\Android\Sdk 14
Linux: $HOME/Android/Sdk
Set Environment Variable:
macOS: Edit your shell profile file (e.g., ~/.zshrc for Zsh, ~/.bash_profile for Bash). Add the line: export ANDROID_SDK_ROOT="/Users/your_username/Library/Android/sdk" (replace with your actual path). Save the file, and either restart the terminal or run source ~/.zshrc (or equivalent). It's also recommended to add the SDK's platform-tools to your PATH: export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools.
Windows: Search for "Edit the system environment variables". Click "Environment Variables...". Under "User variables", click "New...". Enter ANDROID_SDK_ROOT as the variable name and the SDK path (e.g., C:\Users\your_username\AppData\Local\Android\Sdk) as the value.14 Click OK. You might also need to add %ANDROID_SDK_ROOT%\platform-tools to your user Path variable. Changes require opening a new Command Prompt or PowerShell window to take effect.
Linux: Edit your shell profile file (e.g., ~/.bashrc or ~/.zshrc). Add export ANDROID_SDK_ROOT="$HOME/Android/Sdk" and export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools. Save and source the file or restart the terminal.
Verification: Open a new terminal/command prompt and check:
macOS/Linux: echo $ANDROID_SDK_ROOT
Windows: echo %ANDROID_SDK_ROOT% or Get-ChildItem -Path Env:\ANDROID_SDK_ROOT (in PowerShell).14 The command should output the path you set. Also try running adb version to ensure platform-tools are in the PATH.
Background Bridge Note: Native Android Developers
You are likely very familiar with Android Studio, the SDK Manager, and setting ANDROID_HOME/ANDROID_SDK_ROOT. The key differences for React Native setup are the specific requirements for SDK Platform 35 and Build Tools 35.0.0, which might differ from your current native project settings.14 Additionally, you'll need to install Node.js (LTS version) and potentially Watchman (on macOS/Linux), which are standard tools in the JavaScript ecosystem but new additions compared to a pure native Android workflow.
Background Bridge Note: Native iOS Developers
You already have Xcode and the Command Line Tools installed. The new requirements for this setup are Node.js (LTS), npm (comes with Node), and Watchman (on macOS). If you plan to target Android development as well, you will also need to install Android Studio and configure the Android SDK as described above. Think of Node.js/npm/Yarn as the JavaScript world's equivalent to CocoaPods or Swift Package Manager – they manage the project's code libraries (dependencies). Watchman is a performance optimization tool for the JavaScript bundler.
Background Bridge Note: Web Developers
While Node.js, npm, and potentially Yarn are familiar tools from web development, setting up for React Native involves installing platform-specific native development environments. Android Studio and the Xcode Command Line Tools (or the full Xcode for iOS) provide the necessary compilers, SDKs, and emulators/simulators because React Native ultimately compiles down to native application code, not just web bundles. Watchman is a specialized file watcher optimized for the large codebases often found in native development. The need to configure environment variables like ANDROID_SDK_ROOT is also specific to interfacing with the native build tools.
Table 2: Prerequisite Installation Commands Summary (Recommended Methods)
Prerequisite
macOS Command (Homebrew Recommended)
Windows Command (Installer/Choco Recommended)
Verification Command
Node.js (LTS)
brew install node
Download .msi from nodejs.org or choco install nodejs-lts
node -v
npm
Bundled with Node.js
Bundled with Node.js
npm -v
Yarn (Optional)
corepack enable && corepack prepare yarn@stable --activate or npm i -g yarn or brew install yarn
corepack enable && corepack prepare yarn@stable --activate or npm i -g yarn or choco install yarn
yarn --version
Watchman
brew install watchman
N/A (Generally not required)
watchman --version (macOS/Linux)
Xcode CLTs
xcode-select --install
N/A
xcode-select -p
Android Studio
Download .dmg from(https://developer.android.com/studio)
Download .exe from(https://developer.android.com/studio)
Launch Android Studio
Android SDK/Build Tools
Via Android Studio SDK Manager
Via Android Studio SDK Manager
Check SDK Manager UI
ANDROID_SDK_ROOT
export ANDROID_SDK_ROOT=... in profile
Set via System Environment Variables
echo $ANDROID_SDK_ROOT (macOS/Linux) / echo %ANDROID_SDK_ROOT% (Win CMD)

Section 3: Creating Your First Expo App (npx create-expo-app@latest)
With the prerequisites installed, the next step is to create a new React Native project using Expo's official command-line tool, create-expo-app.
Introduction to create-expo-app
create-expo-app is a command-line utility designed specifically to initialize new Expo projects.1 Its primary purpose is to simplify the setup process by:
Generating a standard project directory structure.
Installing essential dependencies (like react, react-native, expo).
Configuring basic project settings (e.g., app.json, package.json, tsconfig.json).
Providing various project templates to start from.
This tool embodies the principle of "convention over configuration," offering sensible defaults and a pre-defined structure that allows developers to become productive quickly without needing to make numerous initial setup decisions.25 This contrasts with initializing a bare React Native project manually, which requires more configuration of build tools and dependencies.
Running the Command
To create a new Expo project, open your terminal or command prompt, navigate to the directory where you want to store your projects, and run the following command:

Bash


npx create-expo-app@latest MyFirstExpoApp


Replace MyFirstExpoApp with your desired project name. If you omit the name, the tool will prompt you for it.25
npx: This is a package runner tool included with npm (since version 5.2). It executes a package command (create-expo-app in this case) without needing to globally install the package first. It downloads the package temporarily or uses a cached version.
@latest: This suffix ensures that npx uses the most recent version of the create-expo-app tool, guaranteeing access to the latest features and templates.25
Alternatives using other package managers are also available 25:
Yarn: yarn create expo-app MyFirstExpoApp
pnpm: pnpm create expo-app MyFirstExpoApp
Bun: bun create expo MyFirstExpoApp
Project Templates
create-expo-app uses templates to define the initial project structure and dependencies. You can specify a template using the --template flag or select one interactively if prompted. Common templates include 25:
default (Recommended): This is the standard template used if none is specified. It sets up a project designed for multi-screen applications, including:
expo-router for file-based navigation.
TypeScript configuration enabled (tsconfig.json).
Essential Expo libraries.
blank: A minimal template with only the core expo package and dependencies, without any navigation or TypeScript pre-configured.
blank-typescript: The minimal blank template but with TypeScript enabled.
tabs: A template pre-configured with expo-router and a basic tab navigation layout, using TypeScript.
bare-minimum: Similar to blank, but it also runs npx expo prebuild during setup, generating the native ios and android directories immediately.
Additionally, the --example <example-name> flag allows initializing a project based on one of the official examples available in the expo/examples repository.25
What Happens During Creation
When you run create-expo-app, it performs several actions 25:
Creates a new directory with the specified project name.
Copies the files from the chosen template into this directory.
Initializes a Git repository within the project directory (unless Git is not found or disabled).
Installs the necessary npm dependencies listed in the template's package.json, using the detected package manager (npm, yarn, pnpm, or bun). This step can be skipped using the --no-install flag.
Sets up basic configuration files like app.json (or app.config.js), package.json, and tsconfig.json (if applicable).
Exercise 3.1: Create and Run Initial App
Instructions:
Open Terminal: Launch your terminal (Terminal on macOS/Linux, Command Prompt or PowerShell or WSL on Windows).
Navigate: Use the cd command to navigate to the directory where you want to create your project (e.g., cd Documents/Projects).
Create Project: Run the command:
Bash
npx create-expo-app@latest MyFirstExpoApp
(Press Enter if prompted for the app name, accepting the default). Wait for the process to complete; it might take a few minutes to download dependencies.
Enter Project Directory: Once finished, navigate into the newly created project folder:
Bash
cd MyFirstExpoApp


Start Development Server: Run the command to start the Expo development server:
Bash
npx expo start


Observe Output: Watch the terminal. You should see messages indicating the Metro bundler is starting, followed by a QR code and a list of keyboard commands. The server is now running and ready to serve your app.
(Further steps on connecting a simulator or device will be covered in subsequent sections)
Section 4: Understanding npx expo vs. npm/yarn
After creating the project, interaction primarily happens through command-line tools. It's important to distinguish between standard package manager commands (npm, yarn) and Expo-specific commands run via npx expo.
Recap: Package Managers (npm, yarn)
As covered in Section 2, npm and yarn are package managers for the Node.js ecosystem. Their core function is to manage the project's dependencies – the external libraries listed in the package.json file. Commands like npm install, npm update, yarn add, yarn remove directly interact with the package registry (npmjs.com) to download, install, or update these dependencies in the node_modules directory.
Introducing npx expo Commands
Expo projects include the expo package as a development dependency. This package provides a Command Line Interface (CLI) with various commands tailored for Expo development.3 These commands are typically executed using npx expo <command> (or yarn expo <command>, pnpm expo <command>, bunx expo <command>). npx ensures that the command provided by the locally installed expo package within your project is used, rather than requiring a global installation of expo-cli (which was the older practice).
The Role of npx expo install
One of the most crucial Expo CLI commands is npx expo install. While it seems similar to npm install or yarn add, it performs a vital extra step: compatibility validation.3
Why it's Needed: The React Native ecosystem involves a tight coupling between JavaScript code and native platform code. Different versions of React Native often require specific versions of other libraries (like react-native-gesture-handler, react-native-screens, etc.) to function correctly. Simply installing the @latest version of a library with npm install might fetch a version incompatible with the specific react-native version used by your project's Expo SDK, leading to build errors or runtime crashes.17
How it Works ("Under the Hood"): The Expo team maintains a compatibility map that defines known working versions of popular libraries for each Expo SDK release. When you run npx expo install <package-name>, the command consults this map for your project's SDK version. If a specific compatible version of <package-name> is recommended, expo install instructs the underlying package manager (npm/yarn/pnpm/bun) to install that specific version. If the package isn't in the map or no specific version is required, it likely defaults to standard package manager behavior (installing the latest compatible version based on semantic versioning).17
Usage: It's strongly recommended to use npx expo install whenever adding new dependencies to an Expo project.
Example: npx expo install react-native-maps
Example (multiple packages): npx expo install expo-camera expo-av
Contrast with npm install/yarn add: These standard commands lack the Expo SDK-specific compatibility check. They install based purely on version constraints in package.json and the registry, potentially leading to mismatches in a React Native context.
Other npx expo Commands
Beyond install, the Expo CLI provides a suite of commands that orchestrate various development tasks, acting as a higher-level interface over underlying tools 3:
start: Manages the Metro bundler and development server.3
run:ios / run:android: Interact with native build tools (Xcode, Gradle) to compile and run the app.33
prebuild: Generates the native ios and android project directories from templates and configuration.3
config: Inspects the project's evaluated configuration.3
This demonstrates that the Expo CLI is more than just a project initializer; it's a crucial orchestration layer designed to simplify and manage the inherent complexities of the React Native build process and dependency management within the Expo ecosystem.
Background Bridge Note: Native Developers
Consider npx expo install as a specialized dependency management command akin to using a Gradle plugin or a CocoaPods hook that enforces specific version compatibility rules within your platform's ecosystem (e.g., ensuring AndroidX library versions align). Standard npm install is like fetching a dependency directly via Maven Central or Swift Package Index without these extra ecosystem-specific checks. The other npx expo commands (start, run:*, prebuild) act as convenient scripts that automate interactions with tools you might otherwise use directly (like Metro, xcodebuild, gradlew, ADB, simulator/emulator commands).
Background Bridge Note: Web Developers
While npm install and yarn add are familiar, npx expo install introduces a concept specific to the challenges of cross-platform native development. Because the JavaScript code must interact correctly with underlying native code shipped with the specific React Native version, library version alignment is critical in a way not typically encountered in pure web development. npx expo install provides a safety net managed by the Expo framework. Think of other npx expo commands as higher-level wrappers around the build tools (Metro bundler, native compilers) needed to get your React code running on a native device or simulator, not just in a browser.
Section 5: Running on the iOS Simulator
To test the iOS version of the application during development, the iOS Simulator included with Xcode is used. This requires a macOS development environment.
Prerequisites:
A computer running macOS.
The full Xcode application installed from the Mac App Store (not just the Command Line Tools).14 Xcode includes the iOS Simulator and the necessary build tools (xcodebuild).
An Expo project created using create-expo-app.
Launching the Simulator:
Ensure Runtime is Installed: Open Xcode. Go to the menu bar: Xcode > Settings (or Preferences) > Platforms. Ensure that at least one iOS Simulator runtime is installed. Download one if necessary.
Launch a Simulator:
You can open the Simulator app directly via Spotlight search (Simulator) or by running open -a Simulator in the Terminal.
Alternatively, within Xcode, go to Window > Devices and Simulators, select the "Simulators" tab, choose a simulator, and boot it up. It's often sufficient to just have one simulator running before executing the Expo command.
Running the App using npx expo run:ios
This is the primary command to build and run your app locally on the iOS simulator or a connected device.
Navigate to Project: Open your terminal and use cd to navigate into your project's root directory (e.g., cd MyFirstExpoApp).
Run the Command: Execute the following:
Bash
npx expo run:ios
4
What npx expo run:ios Does:
Prebuild Check/Execution: It first checks if the native ios project directory exists. If not, it automatically runs npx expo prebuild --platform ios to generate the necessary Xcode project files based on your app.json/app.config.js and installed config plugins.13
Native Compilation: It invokes Apple's xcodebuild tool behind the scenes to compile the native Swift/Objective-C code within the ios directory, linking necessary frameworks and libraries (including React Native itself and any other native modules).
Installation: Once the compilation is successful, it creates an .app bundle and installs it onto the currently running iOS Simulator (or the one specified using the --simulator or --device flag).35
Launch: It then launches the newly installed application on the simulator.
Start Metro: By default, it also starts the Metro development server (unless the --no-bundler flag is used).36 The compiled app running on the simulator needs this server to load its JavaScript code.
Connecting to Metro
Once the app launches on the simulator, the native code (specifically, the React Native framework embedded within it) automatically attempts to connect to the Metro server running on your development machine (typically http://localhost:8081). It fetches the initial JavaScript bundle and establishes a WebSocket connection for receiving updates via Fast Refresh / Hot Module Replacement whenever you save changes to your JS/TS files.
Alternative Launch Method (npx expo start)
You can also launch the app on the simulator via the Expo CLI's interactive terminal UI:
Run npx expo start in your project directory.
Wait for the Metro server to start and the QR code/menu to appear.
Press the i key in the terminal window.4
This triggers a similar sequence of actions (prebuild if needed, compile, install, launch) as npx expo run:ios.
Background Bridge Note: Native iOS Developers
The npx expo run:ios command essentially automates the standard Xcode "Build and Run" process (shortcut Cmd+R) for the simulator. It handles the pod install (if needed), calls xcodebuild, and interacts with simctl (the simulator control tool) to install and launch the app. The key difference from a pure native app is that after launching, the React Native app immediately connects to the Metro server running on your Mac to download and execute the JavaScript bundle that defines the UI and application logic, rather than executing purely compiled Swift/Objective-C code for the UI layer.
Background Bridge Note: Web/Android Developers
The iOS Simulator is Apple's official tool for emulating various iPhone and iPad models running different iOS versions directly on your Mac. It provides a high-fidelity environment for testing. Unlike browser-based device simulation or Android Emulators (which can run on Windows/Linux/macOS), developing and testing for iOS requires a macOS machine and Xcode due to Apple's development ecosystem restrictions. The npx expo run:ios command bridges your JavaScript project with this native iOS build and simulation environment.
Section 6: Running on Expo Go (Physical Device - Optional Mention)
While Development Builds and simulators/emulators are central to the workflow, it's worth briefly revisiting how to run the initial project using the Expo Go app on a physical device. This method is often the very first way a developer sees their code running, especially before setting up native toolchains.
Purpose: Provides a quick way to preview the JavaScript parts of an application on a real device without any local native compilation. Ideal for initial exploration, simple prototypes, and sharing previews easily.5
Prerequisites:
The Expo Go application installed on your physical iOS or Android device from the respective app store.7
Your development machine (running npx expo start) and your physical device must be connected to the same Wi-Fi network.37
Steps:
Navigate to Project: In your terminal, cd into your project directory.
Start Metro Server: Run the command:
Bash
npx expo start
4
Wait for Terminal UI: The Metro bundler will start, and the terminal will display output including a QR code.8
Scan QR Code: Open the Camera app on your iOS device or the Expo Go app's built-in scanner (on Android or iOS) and point it at the QR code displayed in the terminal.8
Load App: Your device should prompt you to open the link in Expo Go. Tapping this will launch the Expo Go app, which will then connect to your development server over the local network and download/run your project's JavaScript bundle.8
Connection: The connection relies on the local network. Expo Go discovers the development server running on your machine at its local IP address (e.g., 192.168.1.x:8081).
Tunneling (Optional Advanced Feature): If your device cannot connect over the local network (e.g., different networks, restrictive firewalls), you can use Expo CLI's tunneling feature.
Install the tunneling provider (ngrok is commonly used): npm install -g @expo/ngrok.33
Start the server with the tunnel flag: npx expo start --tunnel.33
This creates a public URL (e.g., exp://u.expo.dev/...?channel-name=main). Scanning the QR code associated with this tunnel URL allows Expo Go to connect via Expo's servers, bypassing local network restrictions. Note that tunneling is generally slower than direct local connections and requires an active internet connection on both devices.33
Troubleshooting QR Code Scanning: If scanning the QR code fails (e.g., iOS shows "No usable data found"), ensure you are running npx expo start in the correct mode for Expo Go. Expo Go expects a QR code starting with exp://.... If you accidentally started the server in development client mode (npx expo start --dev-client), the QR code will start with exp+<your-app-slug>://..., which Expo Go cannot handle directly.9 Ensure you are using the standard npx expo start (or npx expo start --go) when targeting the Expo Go app.
Limitations Recap: Remember, running via Expo Go uses the pre-built sandbox environment. It cannot load projects that require custom native modules or native code modifications not already included in that specific build of Expo Go.6
Background Bridge Note: All Developers
This method completely bypasses the local native build process (npx expo run:ios/run:android). It's purely about loading the JavaScript bundle from your development server into the pre-existing Expo Go native application container. This makes it very fast for seeing JS changes but limits its applicability to projects that don't need custom native capabilities. Contrast this sharply with running on a simulator or using a Development Build, both of which involve compiling your app's specific native code.
Section 7: Expo Project Structure (File/Folder Overview)
Understanding the layout of files and folders generated by create-expo-app is essential for navigating and developing an Expo project. The following describes the typical structure, primarily based on the default template (which includes Expo Router and TypeScript).
Root Directory Files:
app.json / app.config.js: This is the heart of your Expo project's configuration.3 It's a JavaScript object (or a file exporting one) that defines metadata and settings for your app. Expo reads this file to configure various aspects, including:
App Metadata: name, version, slug (unique identifier), owner (Expo account).
Visuals: icon, splash screen image and behavior.
Platform Settings: ios and android keys for platform-specific configurations like bundleIdentifier, package, buildNumber, versionCode, googleServicesFile, infoPlist modifications.
Expo SDK: sdkVersion (which Expo SDK the project targets).
Plugins: plugins array to configure Expo Config Plugins for modifying native projects during prebuild.11
Updates: Configuration for Expo Updates (OTA updates).
Orientation: orientation (portrait, landscape, default).
Web Support: web key for configuring web builds (bundler, favicon).
Entry Point: entryPoint (usually defaults, managed by expo-router if used).
It serves as an abstraction layer over the native Info.plist (iOS) and AndroidManifest.xml (Android) files, allowing configuration via JavaScript.5
package.json: The standard Node.js project manifest. It lists:
Project name and version.
main entry point (often set to expo-router/entry when using Expo Router 2).
scripts for running common tasks (e.g., "start": "expo start", "android": "expo run:android", "ios": "expo run:ios").
dependencies and devDependencies required by the project.
package-lock.json / yarn.lock / pnpm-lock.yaml: These are lock files automatically generated by the respective package managers (npm/Yarn/pnpm). They record the exact versions of every installed dependency, ensuring that subsequent installations (npm install, yarn install, etc.) on different machines or at later times install the exact same dependency tree. This is crucial for creating reproducible builds and avoiding unexpected issues caused by subtle dependency version changes. These files should be committed to version control.
tsconfig.json: (Present in TypeScript templates) Configures the TypeScript compiler (tsc). Defines options like target JavaScript version, module system, JSX handling, strictness checks, and importantly for Expo, often includes compilerOptions.paths and compilerOptions.baseUrl for setting up module path aliases (e.g., allowing imports like @/components/Button instead of relative paths).34
babel.config.js: Configures Babel, the JavaScript compiler used by Metro to transpile modern JavaScript (ES6+) and TypeScript/JSX into code compatible with the target JavaScript engine (Hermes or older JSC). Expo projects typically use babel-preset-expo, which includes necessary plugins for React Native, Expo features, and potentially expo-router/babel if using Expo Router.2
metro.config.js (Optional): Allows customization of the Metro bundler. While often not needed initially because expo/metro-config provides sensible defaults, you can create this file (e.g., via npx expo customize metro.config.js) to modify Metro's behavior, such as adding custom file extensions for assets (resolver.assetExts) or source code (resolver.sourceExts), or configuring custom module resolvers.34
.gitignore: A standard file specifying intentionally untracked files that Git should ignore. Expo templates provide a default .gitignore that excludes common files like node_modules/, operating system files (.DS_Store), editor configurations (.vscode/), environment files (.env), and often the generated native directories (/ios, /android) when using Continuous Native Generation (CNG).11
eas.json (Optional): Configuration file specifically for Expo Application Services (EAS). It defines different build profiles (e.g., development, preview, production) specifying build settings like credentials, distribution methods, environment variables, etc. This file is typically generated by running eas build:configure.28
Key Directories:
node_modules/: This directory contains all the project's dependencies (and their dependencies) downloaded by the package manager. It can become very large and should never be committed to version control (it's ignored by .gitignore). It's recreated by running npm install or yarn install.
app/ (Expo Router Default): When using the default or tabs template with Expo Router, this directory is central to the application's structure and navigation.2
Files and folders within app/ automatically become routes in the app.
_layout.tsx: Defines a layout component that wraps routes within the same directory level. The root layout (app/_layout.tsx) is the main entry point for the UI.
index.tsx: Represents the default route for a directory (e.g., app/index.tsx is the home screen).
(group-name)/: Parentheses denote route groups, used for organizing routes or applying specific layouts without affecting the URL path. E.g., app/(tabs)/index.tsx.
[param].tsx: Defines dynamic routes where param is a URL parameter.
assets/: The conventional location for static assets like images (.png, .jpg), fonts (.ttf, .otf), or potentially sound files.34 Metro handles bundling these assets and making them available to the application.
components/ (Common Convention): While not strictly enforced by Expo, it's a widely adopted convention to create a components/ directory at the root (or within specific feature folders) to store reusable React components (e.g., buttons, cards, inputs) used throughout the application.40
ios/ and android/ (Generated): These directories contain the actual native platform projects – an Xcode project for iOS and a Gradle project for Android.3 Crucially, in a typical Expo workflow utilizing Continuous Native Generation (CNG), these folders are generated by the npx expo prebuild command based on the configuration in app.json and any installed config plugins.13 Developers generally avoid editing files within these directories directly, instead relying on app.json and plugins for modifications. They might only be generated when needed (e.g., before running npx expo run:ios) or might be present if the bare-minimum template was used or if the project was manually prebuilt.
public/ (Web/Static Assets): Used primarily for web builds. Files placed here (e.g., favicon.ico, robots.txt, an overriding index.html) are served directly by the Metro development server for the web and are copied as-is into the output directory (default dist/) during a web export (npx expo export -p web).33
This structure, particularly the abstraction provided by app.json and the automated generation of the ios/android directories via prebuild and config plugins, exemplifies Expo's approach. It aims to abstract away much of the native configuration complexity, allowing developers to manage settings primarily through JavaScript/JSON and enabling easier project upgrades and maintenance by treating the native projects as build artifacts rather than primary source code.5
Background Bridge Note: Native Developers
The ios/ and android/ folders will look familiar, containing the standard Xcode and Gradle project structures. However, the key philosophical difference in Expo's recommended workflow (CNG) is that these are often treated as generated output rather than primary source files you edit daily. Configuration changes (like adding permissions, linking libraries with native steps, changing icons) are ideally done through app.json and config plugins, and then npx expo prebuild regenerates these native projects. app.json acts as a higher-level abstraction for Info.plist, AndroidManifest.xml, and parts of build.gradle/Podfile. The node_modules/ directory is the equivalent of your downloaded Gradle/Maven dependencies or CocoaPods/SPM packages. assets/ maps roughly to res/drawable or Asset Catalogs. The app/ directory (with Expo Router) dictates UI navigation, analogous to using Navigation Controllers/Fragments or Jetpack Navigation graphs, but driven by file system structure.
Background Bridge Note: Web Developers
The project structure shares many similarities with modern web frameworks (especially React-based ones like Next.js). package.json, tsconfig.json, babel.config.js, node_modules/, assets/, and components/ will feel familiar. The app/ directory structure for routing is directly inspired by frameworks like Next.js. The main distinctions are:
app.json/app.config.js: This is the central configuration hub specific to Expo, managing native app settings that don't exist in web development.
ios/ and android/: These folders contain the platform-specific native code required to actually run your React Native application on mobile devices. While you might not edit them directly often, their presence signifies that the output is a native app, not just a web bundle.
metro.config.js: Configuration for Metro, the bundler optimized for React Native (different from Webpack, Rollup, or Vite commonly used in web-only projects, although Expo can use Metro for web builds too 34).
Section 8: Essential Expo CLI Commands (start, install, run:ios)
The Expo CLI, accessed via npx expo..., is the primary interface for managing and running an Expo project during development. This section details the most frequently used commands.4
npx expo start
Purpose: This is the command used to initiate the development environment for your application.4
Functionality:
Starts the Metro bundler, which is responsible for compiling your JavaScript/TypeScript code, resolving dependencies, and bundling everything together.3
Launches a development server, typically on http://localhost:8081, that serves the bundled code and assets to your app (running on a simulator, device, or web browser).4
Displays an interactive Terminal UI in your console. This UI shows:
A QR code for connecting the Expo Go app.4
The local network URL for manual connection.
Logs from the bundler and potentially from the running application.
A menu of keyboard shortcuts for common actions (e.g., r to reload the app, m to toggle the developer menu, i to run on iOS simulator, a to run on Android emulator/device, w to run in web browser).4
Establishes a WebSocket connection with connected clients for features like Fast Refresh (Hot Module Replacement) and communication with the developer menu.
Targeting: By default, npx expo start prepares to serve the app to Expo Go. If the expo-dev-client package is installed in the project, it assumes you'll be using a Development Build instead.33 You can explicitly force the target using flags:
--go: Target Expo Go.9
--dev-client: Target a Development Build.9
Key Options:
-c or --clear: Clears the Metro bundler cache before starting (useful for resolving caching issues).33
--port <number>: Specifies a different port for the Metro server.33
--tunnel: Uses ngrok (if @expo/ngrok is installed) to create a public URL for the development server, allowing connections from devices not on the same local network.33
--offline: Attempts to run the server without an internet connection (may limit some features).
--web: Opens the app in a web browser.34
--ios: Attempts to launch the app on an iOS simulator/device (similar to run:ios).33
--android: Attempts to launch the app on an Android emulator/device (similar to run:android).33
"Under the Hood" (Metro & Fast Refresh): When expo start runs, it invokes the Metro bundler.34 Metro builds a graph of all your project's JavaScript modules starting from the entry point. It uses Babel to transpile code.39 For development, it enables features like Fast Refresh.42 When you save a file, Watchman (if available) quickly notifies Metro.26 Metro determines which modules were affected and sends a minimal update over the WebSocket connection to the running app. React Native's Fast Refresh runtime then attempts to apply these changes without losing the component's state (e.g., preserving text input values, scroll position). If only React components were changed in a module, only those components are re-rendered. If non-component code changed, or if the changes introduce errors, Fast Refresh might re-run affected modules or fall back to a full app reload.42 This provides a much faster feedback loop than traditional full reloads.
npx expo install [package...]
Purpose: To install and manage project dependencies while ensuring their versions are compatible with the specific Expo SDK version being used.4
Functionality: As detailed in Section 4, this command checks a compatibility list maintained by Expo and installs the recommended version of the specified package(s) using the project's configured package manager (npm, yarn, pnpm, bun).17
Key Options:
--check: Verifies if currently installed dependencies match the recommended versions for the SDK, reporting discrepancies.33
--fix: Automatically attempts to update installed dependencies to the recommended compatible versions.33
Importance: Using npx expo install instead of plain npm install or yarn add is highly recommended in Expo projects to prevent version conflicts that are common in the React Native ecosystem.17
npx expo run:ios
Purpose: To build the native iOS project locally and run it on an attached physical iOS device or an iOS Simulator.4 Requires macOS and Xcode.
Functionality: Orchestrates the native build process:
Runs npx expo prebuild -p ios if the ios directory doesn't exist.35
Uses xcodebuild to compile the Xcode project in the ios directory [Implied by Xcode requirement].
Installs the resulting .app file onto the target simulator or device.
Launches the application.
Starts the Metro server (by default) to serve the JS bundle.35
Key Options:
--device [name|udid]: Specifies a connected physical device.35
--simulator [name|udid]: Specifies a simulator (e.g., "iPhone 15 Pro"). Defaults to a booted simulator or a default one.
--configuration: Specifies the build configuration (Debug is default).35
--no-bundler: Compiles and installs the app but does not start the Metro server.36
npx expo run:android (Brief Mention)
Purpose: To build the native Android project locally and run it on an attached physical Android device or an Android Emulator.4 Requires Android Studio setup and JDK.
Functionality: Similar to run:ios, it runs prebuild if needed, uses Gradle to compile the Android project in the android directory, installs the APK, launches the app, and starts Metro.35
Key Options: --device [id], --variant [flavor] (e.g., debug, release), --app-id, --no-bundler.35
Other Useful Commands (Brief Mention)
npx expo prebuild: Manually generates/updates the native ios and android project folders based on app.json and plugins. Use --clean to delete existing native folders first.3
npx expo config: Displays the evaluated project configuration after processing app.json/app.config.js. Useful for debugging configuration issues.3 Use --type prebuild to see the config used for generating native projects.
npx expo doctor: Checks the project and development environment for common problems, like dependency mismatches, configuration errors, or tool setup issues.4 Often the first step in troubleshooting.
npx expo customize [file]: Generates template configuration files, like metro.config.js or babel.config.js, if they don't exist.34
Table 3: Essential Expo CLI Commands Summary
Command
Purpose
Key Use Case Example
npx expo start
Start the Metro development server & show Terminal UI
npx expo start (then scan QR or press i/a/w)
npx expo install <pkg>
Install package(s) ensuring Expo SDK compatibility
npx expo install react-native-gesture-handler
npx expo run:ios
Build and run app on iOS simulator/device (macOS only)
npx expo run:ios --simulator "iPhone 15"
npx expo run:android
Build and run app on Android emulator/device
npx expo run:android
npx expo prebuild
Generate/update native ios/android project folders
npx expo prebuild --platform ios --clean
npx expo doctor
Diagnose project/environment setup issues
npx expo doctor (run when encountering unexpected errors)

Section 9: Troubleshooting Common Setup Issues
Setting up a React Native development environment involves multiple tools and configurations, making it prone to errors, especially for newcomers. This section outlines common issues encountered during the setup process covered in this module and provides systematic troubleshooting steps.
General Troubleshooting Strategy:
When encountering an error during setup or when running commands like npx expo start or npx expo run:ios/run:android:
Read the Error Message: Carefully examine the output in the terminal. Error messages often contain specific clues about the problem's origin (e.g., a missing file, a network error, a dependency conflict, a native build failure).
Run Expo Doctor: Execute npx expo doctor@latest in your project directory. This tool performs automated checks for common configuration problems, dependency version mismatches, and environment issues, often providing direct suggestions for fixes.4
Clear Caches: Corrupted or outdated caches are frequent culprits. Clear relevant caches:
Metro Bundler Cache: npx expo start -c.41
Package Manager Cache: npm cache clean --force or yarn cache clean.
Watchman Cache (macOS/Linux): watchman watch-del-all.
Native Build Caches: If you have ios/android folders, try regenerating them (npx expo prebuild --clean) 41 or manually deleting build artifacts (e.g., rm -rf ios/build, rm -rf android/build android/.gradle).
Reinstall Dependencies: Inconsistent or corrupted node_modules can cause various issues. Delete the folder entirely and reinstall:
Bash
rm -rf node_modules
npm install
# or yarn install / pnpm install / bun install
As a more drastic measure, you can also delete the lock file (package-lock.json, yarn.lock, etc.) before deleting node_modules and reinstalling. This forces the package manager to resolve dependencies fresh, but might update packages unintentionally.41
Verify Tool Versions: Double-check that all installed prerequisites (Node.js, npm/yarn, Xcode/CLTs, Android Studio, JDK, specific SDK Platform/Build Tools) meet the versions specified at the beginning of this module or in the official React Native/Expo documentation for your SDK version.
Consult Documentation: Refer to the official Expo Troubleshooting guides (https://docs.expo.dev/troubleshooting/introduction/), React Native Environment Setup docs (https://reactnative.dev/docs/environment-setup), and specific library documentation.38
Search Online: Use a search engine with the specific error message. Check resources like Stack Overflow, Expo Forums (https://forums.expo.dev/), and GitHub Issues for the relevant repositories (Expo, React Native, specific libraries).
Specific Common Issues and Solutions:
command not found: expo / command not found: node / command not found: watchman etc.:
Symptom: Terminal reports it cannot find the command you're trying to run.
Solution: The required tool is either not installed or its installation directory is not included in your system's PATH environment variable. Revisit Section 2, verify the installation steps for the specific tool, and ensure the PATH is correctly configured (especially for Node.js/npm and potentially Android SDK platform-tools). Restart your terminal after making PATH changes.
iOS Simulator Build Fails (npx expo run:ios):
Symptom: Errors during the "Compiling" or "Building" phase, often mentioning Xcode, CocoaPods, or signing.
Solution:
Ensure full Xcode is installed and updated from the Mac App Store.
Run xcode-select --install to ensure Command Line Tools are installed and selected. Open Xcode once and accept the license agreement if prompted.
CocoaPods issues: Navigate to the ios directory (cd ios) and try pod install --repo-update. If errors persist, try deleting the Pods folder and lockfile: rm -rf Pods Podfile.lock && pod install. Ensure your Ruby environment (which CocoaPods uses) is functional.14
Check ios/Podfile for any unusual configurations.
Ensure a development team is selected in Xcode if you've opened the project there (usually not needed for simulator builds via Expo CLI).
Android Build Fails (npx expo run:android - Gradle Errors):
Symptom: Lengthy error messages during the Gradle build process, often mentioning compilation errors, resource issues, or dependency resolution failures.
Solution:
Verify ANDROID_SDK_ROOT (or ANDROID_HOME) environment variable is correctly set and points to your installed SDK location. Open a new terminal after setting it.14
Verify JAVA_HOME environment variable is set correctly if needed (often points to the JDK installed by Android Studio or a separate JDK like Zulu 17). Check Expo/RN docs for recommended JDK version.14
Double-check that the correct Android SDK Platform (35) and Build Tools (35.0.0) are installed via the Android Studio SDK Manager (see Section 2).14
Try cleaning the Gradle build cache: cd android &&./gradlew clean.
Try stopping the Gradle daemon: cd android &&./gradlew --stop.
Check network connection; Gradle needs to download dependencies. Check proxy settings if applicable.
Examine the specific error message – it might point to an issue within a specific native module or a resource conflict.
Expo Go Connection Issues (QR Code / Network):
Symptom: Expo Go app cannot connect to the development server; QR code scanning doesn't work, or the app shows a connection error.
Solution:
Ensure your computer and mobile device are on the same Wi-Fi network.
Check firewalls (on computer or network) aren't blocking the Metro port (default 8081).
Verify you are scanning the correct type of QR code (exp:// for Expo Go, exp+...:// for Dev Client).9 Use npx expo start --go if targeting Expo Go.
Try restarting the Metro server (Ctrl+C then npx expo start).
Try restarting the Expo Go app and/or the device.
If network issues persist, try using the --tunnel option.33
Dependency Conflicts / npm ERR! ERESOLVE:
Symptom: npm install or npx expo install fails with messages about unresolved peer dependencies or conflicting versions.
Solution:
Run npx expo install --check to identify incompatible packages and then npx expo install --fix to attempt automatic correction.33
Carefully examine the conflicting dependencies listed in the error message. You might need to manually adjust versions in package.json (use npx expo install package@version to install a specific compatible version).
As a last resort, consider using the --legacy-peer-deps flag (see below).
Using --legacy-peer-deps:
What it Does: This flag tells npm version 7 and later to ignore peer dependency conflicts during installation, effectively reverting to the behavior of npm v6.44
Why Use It: Sometimes, complex dependency trees or packages that haven't fully updated their peer dependency requirements for the latest React Native/Expo versions can create irresolvable conflicts. This flag allows the installation to proceed despite these conflicts.
Risks: Ignoring peer dependency conflicts can lead to unexpected runtime errors if the versions are genuinely incompatible. It should be used cautiously and ideally as a temporary measure while waiting for libraries to be updated.
How to Use with Expo/EAS: The most common way is to create a file named .npmrc in the root of your project and add the line: legacy-peer-deps=true. This configuration will be respected by npm install and also by EAS Build during the dependency installation phase.44 An alternative for EAS Build is to add an eas-build-pre-install script in your package.json that runs npm config set legacy-peer-deps true.44
Watchman Errors (macOS/Linux):
Symptom: Errors related to Watchman failing to start, "too many files watched," or permission issues.
Solution: May involve increasing system limits for file watches (consult OS documentation), checking Watchman permissions, or configuring Watchman to ignore specific directories (like build outputs or caches) via a .watchmanconfig file in the project root.15 Try restarting Watchman (watchman shutdown-server then let expo start restart it).
Challenge 3: Environment Setup Verification
(Placeholder for Checklist/Quiz - To be implemented in a tool like Microsoft Forms)
This challenge requires learners to confirm they have successfully completed the core setup steps by verifying tool installations and running basic commands. A checklist could include:
[ ] Node.js LTS installed (Verify node -v).
[ ] npm installed (Verify npm -v).
[ ] (macOS/Linux) Watchman installed (Verify watchman --version).
[ ] (macOS) Xcode Command Line Tools installed (Verify xcode-select -p).
[ ] (If targeting Android) Android Studio installed.
[ ] (If targeting Android) Android SDK Platform 35 installed (Check SDK Manager).
[ ] (If targeting Android) Android SDK Build-Tools 35.0.0 installed (Check SDK Manager).
[ ] (If targeting Android) ANDROID_SDK_ROOT environment variable set (Verify echo $ANDROID_SDK_ROOT or echo %ANDROID_SDK_ROOT%).
[ ] Successfully created a new project using npx create-expo-app@latest.
[ ] Successfully started the Metro server using npx expo start.
[ ] Successfully ran the initial app on either:
[ ] iOS Simulator (macOS only, via npx expo run:ios or i in Terminal UI).
[ ] Expo Go app on a physical device (via QR code scan).
[ ] Android Emulator (via npx expo run:android or a in Terminal UI - requires emulator setup).
Works cited
Introduction - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/get-started/introduction/
Install Expo Router - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/installation/
@expo/cli - npm, accessed May 12, 2025, https://www.npmjs.com/package/@expo/cli
Tools for development - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/develop/tools/
Develop an app with Expo - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/workflow/overview/
Introduction to development builds - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/develop/development-builds/introduction/
Expo Go - Expo, accessed May 12, 2025, https://expo.dev/go
How to start your first Expo project in 2 minutes - YouTube, accessed May 12, 2025, https://www.youtube.com/watch?v=yOUAEfDuI44
QR code stopped working in --dev-client mode ("No usable data found" error when scanned) · Issue #33421 · expo/expo - GitHub, accessed May 12, 2025, https://github.com/expo/expo/issues/33421
Understanding Expo - WesVance, accessed May 12, 2025, https://www.wesvance.com/posts/understanding-expo
Expo managed vs bare workflow : r/reactnative - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1ainaia/expo_managed_vs_bare_workflow/
Lack of tools to enhance Security in expo managed workflow app - Reddit, accessed May 12, 2025, https://www.reddit.com/r/expo/comments/1iha1jp/lack_of_tools_to_enhance_security_in_expo_managed/
Continuous Native Generation (CNG) - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/workflow/continuous-native-generation/
Set Up Your Environment · React Native, accessed May 12, 2025, https://reactnative.dev/docs/set-up-your-environment
Installing Node.js and Watchman - Developing Mobile Apps with React Native | StudyRaid, accessed May 12, 2025, https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman
Expo SDK 52 - Expo Changelog, accessed May 12, 2025, https://expo.dev/changelog/2024-11-12-sdk-52
Recommended Setup for using Expo Install · Issue #212 · antfu-collective/ni - GitHub, accessed May 12, 2025, https://github.com/antfu-collective/ni/issues/212
How to Install Expo CLI NPM for Your Development Environment - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/easy-steps-to-install-expo-cli-npm-for-your-development
How to Install Node.js on Windows - GeeksforGeeks, accessed May 12, 2025, https://www.geeksforgeeks.org/install-node-js-on-windows/
Installation | Yarn - Yarn 1, accessed May 12, 2025, https://classic.yarnpkg.com/lang/en/docs/install/
How to Install Yarn on Ubuntu - phoenixNAP, accessed May 12, 2025, https://phoenixnap.com/kb/how-to-install-yarn-ubuntu
Node v24.0.0 (Current), accessed May 12, 2025, https://nodejs.org/en/blog/release/v24.0.0
Node.js Releases, accessed May 12, 2025, https://nodejs.org/en/about/previous-releases
Node.js — Installing Node.js via package manager, accessed May 12, 2025, https://nodejs.org/en/download/package-manager/all
create-expo-app - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/more/create-expo
Watchman - Mastering React Native [Book] - O'Reilly Media, accessed May 12, 2025, https://www.oreilly.com/library/view/mastering-react-native/9781785885785/ch02s03.html
ELI5: Watchman - Watching for Changes to Build Faster - Meta for Developers, accessed May 12, 2025, https://developers.facebook.com/blog/post/2021/03/15/eli5-watchman-watching-changes-build-faster/
docs.expo.dev, accessed May 12, 2025, https://docs.expo.dev/llms-full.txt
Installing the Xcode Command Line Tools on a Mac - Embarcadero, accessed May 12, 2025, https://www.embarcadero.com/starthere/xe5/mobdevsetup/ios/en/installing_the_commandline_tools.html
Use xcode-select to Install Xcode Command Line Tools · Mac Install ..., accessed May 12, 2025, https://mac.install.guide/commandlinetools/4
Install Android Studio | Android Developers, accessed May 12, 2025, https://developer.android.com/studio/install
Download Expo CLI For Windows | Restackio, accessed May 12, 2025, https://www.restack.io/p/expo-cli-knowledge-download-expo-cli-for-windows
Expo CLI - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/more/expo-cli/
Metro bundler - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/guides/customizing-metro/
Local app development - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/guides/local-app-development/
expo/docs/pages/bare/using-expo-cli.mdx at main - GitHub, accessed May 12, 2025, https://github.com/expo/expo/blob/main/docs/pages/bare/using-expo-cli.mdx
Running On Device - React Native, accessed May 12, 2025, https://reactnative.dev/docs/running-on-device
Troubleshooting - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/router/reference/troubleshooting/
Migrate from Expo Webpack, accessed May 12, 2025, https://docs.expo.dev/router/migrate/from-expo-webpack/
Project Structure | React Native / Expo Starter, accessed May 12, 2025, https://starter.obytes.com/getting-started/project-structure/
fyi/troubleshooting-sdk-upgrades.md at main · expo/fyi - GitHub, accessed May 12, 2025, https://github.com/expo/fyi/blob/main/troubleshooting-sdk-upgrades.md
Beyond HMR: Understanding React's Fast Refresh - DEV Community, accessed May 12, 2025, https://dev.to/leapcell/beyond-hmr-understanding-reacts-fast-refresh-13h8
React Native 0.78 - React 19 and more, accessed May 12, 2025, https://reactnative.dev/blog/2025/02/19/react-native-0.78
How to tell Expo to install npm dependencies with --legacy-peerdeps option?, accessed May 12, 2025, https://stackoverflow.com/questions/73933728/how-to-tell-expo-to-install-npm-dependencies-with-legacy-peerdeps-option
