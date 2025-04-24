# Module 2: React Native Environment Setup with Expo

## 2.4 Expo Go vs. Development Builds: Understanding the Trade-offs

Expo Go Role: Expo Go serves as an excellent starting point for React Native development within the Expo ecosystem. It's a pre-built native application that functions as a sandbox, allowing developers to quickly load and run their JavaScript code on simulators or physical devices without needing to compile native code themselves.41 This significantly lowers the barrier to entry and speeds up initial prototyping and learning.41

Expo Go Limitations: The primary limitation of Expo Go stems from its nature as a pre-compiled sandbox.41 It comes bundled with a specific, fixed set of native modules from the Expo SDK and core React Native.42 Consequently:

-   No Custom Native Code: Developers cannot add their own custom native modules (written in Swift, Objective-C, Kotlin, or Java).
-   Limited Third-Party Libraries: React Native libraries that include their own native code not already present in Expo Go cannot be used.42 This includes many popular community libraries, especially those interacting with specific hardware or platform features in unique ways (e.g., certain camera libraries, background processing tools, specific Firebase modules 43).
-   Environmental Differences: Since Expo Go runs the app within its own container, certain behaviors might differ from a standalone production build. This can affect features like deep linking, push notification handling, or anything relying on the app's specific bundle identifier or package name.42

Development Builds: When the limitations of Expo Go are encountered, the solution is to create a Development Build.41 A Development Build is essentially a custom-built version of the native application shell, specifically for the developer's project. Key characteristics include:

-   Includes Project Dependencies: It bundles only the native code required by the project's specific dependencies (including any custom native modules or compatible third-party libraries).41
-   Development Tools: It typically includes the expo-dev-client library, which provides development tools similar to Expo Go (connecting to the dev server, reloading, debugging menu) but within the context of the custom native build.43
-   Build Methods: Development Builds can be created using Expo Application Services (EAS) Build, which compiles the native app in the cloud, or by building locally using Xcode and Android Studio if the native toolchains are set up.42

EAS (Expo Application Services): EAS Build is Expo's cloud build service that simplifies the creation of Development Builds (and production builds).42 It allows developers to generate these custom native builds without needing to install or manage Xcode or Android Studio locally, which is particularly beneficial for cross-platform teams or developers without macOS hardware for iOS builds.42

When to Use Which:

-   Start with Expo Go: Ideal for initial project setup, learning React Native/Expo basics, prototyping, and using libraries included in the Expo Go runtime.
-   Switch to Development Build: Necessary when the project requires:
-   Adding custom native code.
-   Using third-party React Native libraries with native dependencies not included in Expo Go.
-   Testing features that behave differently in Expo Go (e.g., deep linking, specific push notification configurations).
-   Creating a build that more closely mirrors the final production environment.

Development Builds, particularly when managed through EAS Build, represent a significant evolution in the Expo workflow. They provide a smooth pathway from the highly managed Expo Go environment towards incorporating full native capabilities. This avoids the abrupt and often complex "ejection" process associated with older Expo workflows, allowing developers to retain many Expo tooling benefits (like cloud builds and updates via EAS) while gaining the flexibility to use any compatible native code. It bridges the gap between the simplicity of the initial Expo experience and the power required for complex, production-grade applications.

#### Works cited

41. Set Up Your Expo Go Project to Use Development Builds | egghead.io, accessed April 24, 2025, <https://egghead.io/lessons/react-native-set-up-your-expo-go-project-to-use-development-builds>
42. Expo Go vs Development Builds: Which should you use?, accessed April 24, 2025, <https://expo.dev/blog/expo-go-vs-development-builds>
43. Navigating from 𝝠 Expo Go to EAS build - notJust.dev Newsletter, accessed April 24, 2025, <https://news.notjust.dev/posts/navigating-from-expo-go-to-eas-build>