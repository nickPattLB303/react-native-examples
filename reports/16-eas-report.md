Module 16: EAS Build and Publishing
Target Versions: This module references the latest stable versions at the time of content creation: React Native 0.7x+, Expo SDK 52+, React Navigation v6, React Native Paper v5, TanStack Query v5, Zustand v4+, and TypeScript. Specific EAS features and commands are based on the most current EAS CLI and service capabilities.
Section 1: Introduction to EAS (Expo Application Services)
Expo Application Services (EAS) are a suite of deeply integrated cloud services designed by the team behind Expo to streamline the development, building, deployment, and management of Expo and React Native applications.1 EAS extends the capabilities of the local Expo development environment by providing robust cloud infrastructure and tooling for critical stages of the app lifecycle.
The core components of EAS include:
EAS Build: A cloud-based service that compiles and signs Android and iOS applications, offering full support for custom native code. This service allows developers to generate installable app binaries (.apk, .aab, .ipa) without needing to manage local native build environments like Android Studio or Xcode for every build.1
EAS Submit: A service that simplifies the process of uploading app binaries to the Apple App Store and Google Play Store. It automates many of the steps involved in app submission, often reducing a complex procedure to a single command-line instruction.1
EAS Update: This service enables developers to deploy Over-the-Air (OTA) updates to their users. These updates can include JavaScript code changes, asset modifications, and styling adjustments, allowing for rapid bug fixes and feature iterations without a full app store review cycle for eligible changes.1
EAS CLI: The command-line interface is the primary tool for interacting with all EAS services. Developers use eas-cli to initiate builds, submit apps, publish updates, manage project configurations, and authenticate with their Expo accounts.1
Beyond these core components, EAS also offers additional services such as:
EAS Workflows: To automate Continuous Integration and Continuous Deployment (CI/CD) pipelines for mobile app development.1
EAS Metadata: To manage app store listing information like descriptions, screenshots, and keywords.1
EAS Insights: To provide analytics on app performance and user engagement.1
EAS Hosting: For deploying Expo web applications and associated API routes.1
EAS addresses several common challenges in mobile app development by providing significant benefits:
Simplification of Native Builds: EAS Build abstracts the complexities of native compilation, allowing developers to build apps in the cloud without extensive local setup of Android Studio or Xcode.6 This is particularly beneficial for developers who may not have macOS hardware for iOS builds.
Seamless Custom Native Code Integration: A fundamental advantage of EAS Build is its first-class support for projects containing custom native modules written in Swift, Kotlin, Objective-C, or Java. This capability was a significant limitation in older Expo build systems.9
Streamlined App Store Submissions: EAS Submit automates many of the tedious and error-prone steps involved in submitting applications to Apple's App Store Connect and Google's Play Console.12
Rapid Iteration with OTA Updates: EAS Update allows for quick deployment of JavaScript and asset changes directly to users, bypassing the often lengthy app store review process for these types of modifications.2
Cross-Platform Consistency: EAS provides a unified set of tools and workflows for building, signing, and deploying both iOS and Android applications, promoting consistency in the development lifecycle.
Enhanced Team Collaboration: EAS facilitates sharing builds for internal testing and managing releases more effectively within a team environment.8
Robust CI/CD Automation: Through EAS Workflows, teams can implement sophisticated automation for their build, test, and deployment processes.1
Scalability and Reliability: By leveraging cloud infrastructure, EAS can handle the resource demands of building and distributing updates for applications at scale.8
The introduction and evolution of Expo Application Services mark a significant maturation of the Expo ecosystem. Initially, Expo's managed workflow, while user-friendly, presented limitations, especially concerning the integration of custom native code, which often led developers to "eject" to a bare React Native workflow to gain more control.9 EAS, particularly EAS Build, has fundamentally altered this dynamic by providing robust support for custom native code within a suite of managed cloud services. This shift transforms Expo from primarily a "managed workflow" provider, with its inherent constraints, to a "managed services" enabler. Developers can now harness the streamlined developer experience Expo is known for without being restricted by past limitations, effectively offering a powerful combination of ease of use and native flexibility. Services like EAS Submit and EAS Update further compound this by managing other complex facets of the mobile app lifecycle, such as deployment and post-launch updates, through the cloud. Consequently, Expo is no longer perceived merely as a framework for simpler projects or rapid prototyping but has solidified its position as a comprehensive platform capable of supporting professional, scalable React Native development, directly rivaling and often simplifying traditional native build and deployment toolchains.
Furthermore, the adoption of EAS fosters a "cloud-first" or "cloud-assisted" paradigm for mobile development workflows. This approach can reduce the dependency on specific local machine configurations for critical build and deployment tasks. For instance, EAS Build enables the creation of iOS application binaries even from non-macOS development environments, as the actual compilation occurs in the cloud.6 Similarly, EAS services manage intricate processes like code signing and direct interactions with app store APIs, which can be challenging to configure and maintain locally.12 This standardization of the build and deployment environment helps mitigate the common "it works on my machine" problem. While local builds remain an option (e.g., using eas build --local), the primary advantages and conveniences of EAS stem from its cloud-based services. This shift implies that teams can achieve greater consistency and accessibility in their build and release pipelines. New developers can become productive more quickly, as the need for extensive local setup of native development tools is diminished. However, this model also introduces a reliance on EAS services and stable internet connectivity for these critical development and deployment operations.
Official Documentation Link Box
Expo Application Services (EAS) Overview: https://docs.expo.dev/eas/ 1
EAS Build: https://docs.expo.dev/build/introduction/ 1
EAS Submit: https://docs.expo.dev/submit/introduction/ 1
EAS Update: https://docs.expo.dev/eas-update/introduction/ 1
EAS CLI: (Covered in Section 3, but related to overall EAS interaction)
Background Bridge Notes
For Native Developers (Android/iOS):
EAS Build can be conceptualized as a cloud-hosted, managed equivalent of your local Xcode or Android Studio build processes. It abstracts away much of the intricate environment setup and the often-complex management of signing certificates and provisioning profiles.
EAS Submit automates the interactions that would typically occur manually through the App Store Connect or Google Play Console web interfaces, or via specialized command-line tools like Apple's Transporter.
OTA updates delivered via EAS Update are fundamentally different from native code updates. They target the JavaScript bundle and associated assets, enabling rapid deployments for certain types of changes without necessitating a new store-reviewed binary. This is a powerful mechanism for quick fixes and UI tweaks that don't involve native layer modifications.
For Web Developers (React/Angular):
Consider EAS as a comprehensive CI/CD and deployment platform tailored specifically for mobile applications. It's analogous to services like Vercel, Netlify, or AWS Amplify for web applications, but with the added complexities of native code compilation and app store interactions.
The "building" of an app within EAS involves native compilation into platform-specific package files (.ipa for iOS, .aab for Android). These are then installed directly onto devices, unlike web builds which typically result in static assets (HTML, CSS, JS) served over HTTP.
App store submission is a formal review process mandated by Apple and Google, not merely a git push to deploy changes live. EAS Submit is designed to help navigate this regulated process.
OTA updates share some conceptual similarities with Hot Module Replacement (HMR) or live reload during web development. However, OTA updates are intended for production users, persist across app restarts, and involve a more structured delivery and compatibility management system.
Section 2: EAS Build vs. Classic Expo Build
The evolution of Expo's build systems reflects the platform's growth from a simplified framework for managed apps to a comprehensive solution for all React Native development. Understanding this transition is key to appreciating the capabilities of EAS Build.
Historically, expo build:[ios/android] (commonly referred to as "Classic Build") was the primary service for creating standalone application binaries from Expo projects.20 While it offered a convenient way to get apps built without local native tooling, Classic Build had several inherent limitations 10:
It was principally designed for "managed workflow" apps that used only the pre-included Expo SDK modules.
Support for custom native code or linking arbitrary third-party native modules was severely limited or non-existent. This was a major factor for developers "ejecting" from the managed workflow.
Builds often resulted in larger app binary sizes because they typically included a significant portion, if not all, of the Expo SDK's native modules, regardless of whether the app used them.
There was less flexibility in build configurations and direct native project modifications compared to a bare React Native project.
Recognizing these constraints and the evolving needs of the React Native community, Expo officially discontinued the Classic Build service (e.g., as of January 4, 2023).20 Developers using Classic Build were required to migrate to EAS Build or adopt local native build processes.20 The official announcement and migration guidance can be found on the Expo blog:(https://blog.expo.dev/classic-build-service-no-longer-supported-73c82b500f56).11
EAS Build was introduced as a modern, powerful, and flexible cloud build service. It is designed to cater to all React Native applications, whether they are Expo managed projects, bare React Native projects, or projects with extensive custom native code.1
The key advantages of EAS Build over the Classic Build system are substantial 10:
Full Custom Native Code Support: This is arguably the most significant improvement. EAS Build can compile apps with any custom native modules (written in Swift, Kotlin, Objective-C, Java) or third-party libraries that require native linking.
Smaller App Sizes: Unlike Classic Build, EAS Build includes only the native code that your application actually uses. This results in significantly smaller application binaries, with reports of up to 10x reduction in size.11
Development Builds: EAS Build allows the creation of development builds based on expo-dev-client. These builds enable developers to test custom native code changes directly on physical devices or simulators, offering a rich development experience similar to Expo Go but within their custom native environment.22
Granular Control and Configuration: Through the eas.json file, developers have extensive control over build profiles, environment variables, build tool versions, and other build parameters.24
Improved Build Infrastructure: EAS Build utilizes more powerful and configurable cloud build workers (e.g., M4 Pro-powered workers for iOS builds, offering significant speed improvements 26).
Seamless Workflow Integration: EAS Build integrates smoothly with other EAS services like EAS Submit (for app store deployment) and EAS Update (for OTA updates), creating a cohesive CI/CD pipeline.8
Bare React Native Project Support: EAS Build is not limited to Expo managed projects; it works equally well for bare React Native projects, providing them with a powerful cloud build solution.10
EAS Build can also be executed locally using the --local flag (e.g., eas build --platform ios --profile development --local), or potentially on a developer's own CI infrastructure, although the cloud-hosted service is its primary mode of operation.8
Conceptually, the "under the hood" differences between Classic Build and EAS Build are fundamental:
Classic Build: This system essentially took the user's JavaScript bundle and injected it into a pre-built native application shell. This shell contained all the Expo SDK's native modules. Configuration was primarily managed through app.json, with limited capacity for direct manipulation of the native project structure.
EAS Build: This service performs a full native build from the project's source code, much like compiling an app directly in Xcode or Android Studio. For projects using Expo's managed workflow features, it typically uses a process similar to npx expo prebuild internally. This command generates the native ios and android project folders based on the configurations in app.json or app.config.js and the installed native dependencies. EAS Build then applies further configurations specified in eas.json (such as build schemes, build types, and signing credentials) to customize the native build process. Finally, it compiles the native code and bundles the JavaScript, producing a truly custom native binary tailored to the specific application.
For projects previously reliant on Classic Build, migrating to EAS Build is not optional but a necessity.9 The key steps in this migration typically involve installing the EAS CLI, configuring the project for EAS Build by running eas build:configure (which creates or updates eas.json), and adapting any existing build scripts or CI/CD pipelines to use eas build commands. Detailed guidance is available in the official Expo documentation:(https://docs.expo.dev/build-reference/migrating/).20
The following table summarizes the key differences:
Feature
Classic expo build:[platform]
EAS Build
Custom Native Code Support
Very limited or none
Full support (Swift, Kotlin, Obj-C, Java)
Third-Party Native Module Linking
Highly restricted
Fully supported
App Binary Size
Often large (included many SDK modules by default)
Significantly smaller (only includes used native code)
Development Client Builds
Not applicable
Supported (expo-dev-client based)
Build Configuration Flexibility
Limited (primarily app.json)
Extensive (via eas.json profiles, env vars, tool versions)
Native Project Customization
Minimal
Full, via config plugins or bare workflow structure
Build Infrastructure & Speed
Older infrastructure
Modern, configurable workers (e.g., M4 Pro for iOS), generally faster
Support for Bare React Native Projects
Not primary focus
First-class support
Workflow Integration (Submit, Update)
Limited
Seamless integration with EAS Submit & EAS Update
Current Status
Deprecated / Sunset
Active / Recommended

The discontinuation of Classic Build and the introduction of EAS Build mark a pivotal moment for Expo, signaling a strong commitment to supporting the entire spectrum of React Native development. This ranges from simple applications to complex, enterprise-level projects that demand deep native integrations. The limitations of Classic Build, particularly its inability to easily handle custom native code, were a significant bottleneck for advanced use cases.10 EAS Build directly addresses this by making custom native code support a core feature, which is indispensable for sophisticated applications.10 This strategic shift positions Expo not merely as a tool for rapid prototyping or for developers wishing to avoid native code, but as a robust and comprehensive platform for production-grade React Native applications. It effectively reduces the necessity for developers to "eject" from the Expo ecosystem or to choose between Expo's enhanced developer experience and the full flexibility of native development. Consequently, Expo has become a more viable and attractive option for a much broader array of projects.
Moreover, the architecture of EAS Build, which involves generating native project structures (if not already present, as in a bare workflow) and then compiling them, presents a hybrid approach. This method combines the advantages of a managed configuration system—primarily through app.json/app.config.js and config plugins—with the unbridled power of full native builds. Developers continue to define a significant portion of their application's native configuration declaratively within app.json or app.config.js.8 Config plugins then automate the modification of native project files (such as Info.plist on iOS, or AndroidManifest.xml and build.gradle files on Android) based on these declarative settings, effectively bridging the JavaScript configuration world with the native project world.8 EAS Build subsequently takes these generated (or pre-existing, in a bare workflow scenario) native projects and executes a standard native compilation process.8 This layered strategy aims to offer the configuration simplicity characteristic of the managed workflow while still permitting the full customization and power inherent in native builds. It represents a more sustainable model for managing native project complexity, especially when compared to error-prone manual modifications of native files, particularly across React Native or Expo SDK upgrades. However, this also implies that for advanced troubleshooting or customization, a deeper understanding of how app.config.js settings and config plugins translate into actual native project configurations becomes increasingly important.
Official Documentation Link Box
EAS Build vs. Classic Build (Migration Guide): https://docs.expo.dev/build-reference/migrating/ 20
Expo Blog: Classic Build Service No Longer Supported: https://blog.expo.dev/classic-build-service-no-longer-supported-73c82b500f56 11
Background Bridge Notes
For Native Developers (Android/iOS): The transition from Classic Build to EAS Build signifies that Expo's build process now aligns more closely with standard native development practices. You regain full control over the native project structure and dependencies, similar to working directly in Android Studio or Xcode, but with the added layer of EAS's cloud-based build management and conveniences. Classic Build was, in contrast, more of an opaque "black box" that handled native aspects with less transparency and control.
For Web Developers (React/Angular): This evolution can be likened to moving from a highly restrictive Platform-as-a-Service (PaaS) that only permitted the use of certain pre-defined backend modules or configurations, to a more flexible and powerful PaaS or even an Infrastructure-as-a-Service (IaaS) model. A more flexible PaaS might allow custom server-side code, arbitrary dependencies, or Docker-based deployments. EAS Build grants this deeper level of control over the "native" backend of your mobile application, which is the compiled native code itself.
Section 3: Setting up EAS CLI
The Expo Application Services Command Line Interface (EAS CLI) is the indispensable tool for interacting with all EAS offerings. It serves as the bridge between your local development environment and Expo's cloud services, enabling you to initiate builds, submit applications to app stores, publish Over-the-Air (OTA) updates, manage your Expo account, and configure various EAS services.3
It's important to distinguish EAS CLI from the traditional expo-cli. The expo-cli (which is now integrated into the expo package and typically invoked via npx expo) is primarily focused on local development tasks. These include starting the Metro development server, running applications on simulators or physical devices (often with Expo Go or a development client), and prebuilding native project directories.28 In contrast, eas-cli is specifically designed for interacting with cloud services. It is installed as a separate global package.
Prerequisites for Installation:
Before installing EAS CLI, ensure your development environment meets the following requirements 3:
Node.js: The Long-Term Support (LTS) version of Node.js is recommended, as EAS CLI is a Node.js package.
npm or Yarn: A Node.js package manager (npm is bundled with Node.js; Yarn can be installed separately) is required to install the EAS CLI package.
Expo Account: An Expo account is mandatory to log in and utilize any EAS services. Accounts can be created free of charge on the expo.dev website.3
Git: EAS Build relies on Git for version control and for uploading your project's source code to the build servers.3 Your project should be a Git repository.
Installation:
To install EAS CLI globally on your system, open your terminal and run the following command 3:

Bash


npm install -g eas-cli


Alternatively, if you prefer Yarn:

Bash


yarn global add eas-cli


This makes the eas command accessible from any directory in your terminal. To verify a successful installation and check the installed version, you can run:

Bash


eas --version


Logging In:
After installation, you must log in to your Expo account through the EAS CLI. This authentication step allows the CLI to perform actions on your behalf within the EAS ecosystem. Use the command 3:

Bash


eas login


The CLI will prompt you to enter your Expo account username (or email) and password. Upon successful authentication, a token is typically stored on your local machine, allowing subsequent eas commands to be authorized without requiring credentials each time.
To verify which Expo account is currently authenticated, run 4:

Bash


eas whoami


This command will display the username of the logged-in account.
Initializing a Project with EAS:
Before you can use EAS services like EAS Build for a specific local project, that project needs to be linked to an EAS project on expo.dev. This is typically done using the eas init command (or eas project:init).5 While 30 refers to "EAS init" from a Replit dropdown, the more standard command-line approach is:

Bash


eas init


When you run this command within your project directory, EAS CLI may prompt you to either create a new project on EAS or link to an existing one associated with your account. This process usually involves updating your project's app.json (or app.config.js) and potentially eas.json with a unique project ID provided by EAS.
Updating EAS CLI:
EAS services and the EAS CLI itself are actively developed and updated. To ensure you have access to the latest features, improvements, and bug fixes, it's good practice to update your EAS CLI periodically. You can do this by running the installation command again:

Bash


npm install -g eas-cli


Or with Yarn:

Bash


yarn global add eas-cli


"Under the Hood" of EAS CLI Authentication:
When eas login is successfully executed, an authentication token is generated and securely stored on your local machine. The exact location can vary by operating system but is often found in a configuration directory like ~/.config/eas/auth.json or a similar path. This token is then automatically included in the headers of subsequent API requests made by the eas command to the EAS backend services, authenticating these requests. This mechanism is a common pattern for CLI tools that interact with cloud services and is similar to how tools like the git credential helper, npm login, or various cloud provider CLIs manage authentication.
The global installation of eas-cli and its distinct nature from the local development tool expo-cli (now typically invoked as npx expo) underscores a deliberate architectural decision. This separation delineates local development activities from interactions with cloud-based services. The expo-cli (or npx expo) is primarily concerned with the inner development loop: starting bundlers like Metro, running the application on local simulators or devices, and managing project configuration files.28 Conversely, eas-cli is tailored for the outer development loop, which includes building application binaries for distribution, submitting them to app stores, managing OTA updates, and interacting with various cloud infrastructure components.3 Maintaining these as separate entities allows for independent versioning and development cycles, reflecting their distinct operational domains. eas-cli must remain synchronized with changes in cloud APIs, while npx expo aligns with updates to the Expo SDK and local development tooling. While this separation might initially seem like an added complexity, it ultimately provides greater clarity and modularity in the Expo ecosystem. It also means that updates to one CLI do not necessarily mandate updates to the other, unless there's a direct interdependency.
The eas login and eas whoami authentication flow represents a standard, secure pattern, akin to OAuth-based authentication, which is critical for safeguarding access to cloud operations and resources tied to an Expo account. EAS services perform actions with significant real-world implications, such as building and signing applications with sensitive developer credentials, submitting apps to public app stores, and pushing updates to end-users. Account-based authentication via eas login ensures that only authorized individuals can initiate these actions for their respective projects.3 The locally stored authentication token functions as a session credential, obviating the need for users to re-enter their username and password for every command. This design highlights the importance of maintaining the security of the development machine where eas login has been performed, as the stored token could potentially be compromised. For automated environments like CI/CD pipelines, token-based authentication (e.g., using EAS Build secrets or environment variables like EXPO_TOKEN 20) is the preferred and more secure method over interactive logins. This also reinforces the Expo account itself as the central point of trust and authority for accessing EAS.
Official Documentation Link Box
Install EAS CLI: https://docs.expo.dev/build/setup/#install-the-latest-eas-cli 6
Automating EAS CLI commands (EAS Workflows): https://docs.expo.dev/eas/workflows/automating-eas-cli/ 1
Background Bridge Notes
For Native Developers (Android/iOS): The EAS CLI can be compared to specialized command-line tools you might already use for certain development or deployment tasks, such as fastlane for automation, or gradlew (Android) / xcodebuild (iOS) for compiling and building. However, eas-cli acts as a unified interface to a comprehensive suite of cloud-based services, rather than being solely focused on local tooling. It orchestrates remote actions.
For Web Developers (React/Angular): eas-cli is conceptually similar to the command-line interfaces provided by various cloud platforms (e.g., vercel cli, netlify cli, aws cli, gcloud cli). It serves as your local gateway for managing remote resources and services, but in this context, those resources are specifically tailored for mobile application build and deployment lifecycles.
Section 4: Configuring eas.json for Builds
The eas.json file is the cornerstone of configuration for Expo Application Services, playing a pivotal role in defining how EAS CLI interacts with services like EAS Build and EAS Submit.24 This JSON-formatted file resides at the root of your project, typically alongside package.json, and is usually generated or updated the first time you run eas build:configure in your project.24
Structure of eas.json for EAS Build:
All configurations pertaining to EAS Build are nested under the top-level build key within eas.json.24 The primary organizational unit under the build key is the build profile.
Build Profiles:
A build profile is a named collection of settings tailored for a specific build scenario. You can define multiple profiles to cater to different needs, such as development, internal testing, or production releases.24 While common default profiles like development, preview, and production are often generated, you are free to create profiles with custom names (e.g., staging-feature-X, adhoc-debug).24 To execute a build using a specific profile, you use the --profile <profile-name> flag with the eas build command (e.g., eas build --profile development).24 If no profile is specified, EAS CLI often defaults to the production profile if it exists.24
The default profiles typically serve distinct purposes 24:
development: Configured for creating development client builds. It usually has developmentClient: true and distribution: "internal". These builds include developer tools and are not intended for app store submission.
preview: Designed for internal testing by your team or stakeholders. These builds aim to replicate production-like conditions but are generally not signed for public app store distribution (often using ad-hoc or enterprise provisioning for iOS, or a standard .apk for Android). They do not include developer tools.
production: Tailored for builds that will be submitted to the app stores (Apple App Store, Google Play Store). These builds are signed with distribution credentials.
Official Documentation Link Box
eas.json for EAS Build: https://docs.expo.dev/build/eas-json/ 24
eas.json Full Schema Reference: https://docs.expo.dev/eas/json/ 25
Common Build Profile Properties (located under build.<profile-name>):
These properties can be defined at the root of a build profile and apply to both Android and iOS builds unless overridden by platform-specific settings.
extends (string): Allows a profile to inherit configurations from another profile. This is useful for reducing redundancy by defining a base profile and then creating specializations. For example, a preview profile might extend production and only override the distribution type.24
env (object): An object where keys are environment variable names and values are the names of secrets stored in EAS or literal values. These environment variables are set on the build worker during the build process and are accessible when app.config.js is evaluated. This is suitable for build-time configurations but not for highly sensitive secrets that should never be in version control if eas.json is committed.24
channel (string): Specifies the release channel for EAS Update. Builds created with this profile will be associated with this channel, allowing them to receive OTA updates published to the corresponding update channel or branch.2
distribution (enum: "store", "internal"):
"store": Indicates the build is intended for app store submission. The build artifacts (e.g., .ipa, .aab) are signed for store distribution, and the generated build URLs are typically not for direct installation.25
"internal": Indicates the build is for internal distribution. It can be shared via a URL and installed directly onto devices (e.g., for development builds or ad-hoc/enterprise previews).25
developmentClient (boolean): If true, this flag signifies that the build is a development client and includes the expo-dev-client library. This is essential for development builds.24
credentialsSource (enum: "local", "remote"): Determines the source of signing credentials. "remote" (the default) instructs EAS Build to use credentials managed by EAS. "local" allows you to provide your own credentials, for example, from a local file.25
autoIncrement (boolean or object): Controls whether and how the build version (e.g., iOS buildNumber, Android versionCode) is automatically incremented for each build.25
resourceClass (enum: "medium", "large", etc.): Specifies the virtual machine resources (CPU, RAM) allocated for the build job. Larger projects or those requiring faster build times might benefit from a "large" resource class, which may be subject to plan limitations.24
node, yarn, pnpm, bun, ruby, cocoapods (string): Allows specification of particular versions for these build tools to ensure a consistent build environment.24
image (string): Defines the base operating system and pre-installed tooling image for the build server. EAS Build often selects an appropriate image based on the project's Expo SDK version. For more specific needs, consult the(https://docs.expo.dev/build-reference/infrastructure/) documentation.24
cache (object): Configures dependency caching to speed up builds. Includes key (a string that, if changed, invalidates the cache) and paths (an array of paths to cache).25
applicationArchivePath (string): A path or glob pattern that EAS Build uses to locate the final build artifact (e.g., .apk, .aab, .ipa) after the compilation is complete.25
Platform-Specific Configurations (under build.<profile-name>.[android|ios]):
These settings are nested under android or ios keys within a build profile and either override common properties for that specific platform or provide unique options applicable only to that platform.24
Android-specific (android key):
buildType (enum: "apk", "aab"): Specifies the desired output artifact type. "aab" (Android App Bundle) is the default and recommended format for submissions to the Google Play Store.17 "apk" can be used for previews or direct installations.
image (string): Specifies an Android-specific build image from the available EAS Build server images.
gradleCommand (string): Allows specifying a custom Gradle command to be executed.33
ndk (string): Specifies the version of the Android NDK to be used.
withoutCredentials (boolean): If true, the build will proceed without requiring Android signing credentials. This is useful for certain custom build workflows or when signing is handled externally.25
iOS-specific (ios key):
simulator (boolean): If true, EAS Build creates a build compatible with the iOS Simulator. This is useful for development and testing on a simulator environment.6
image (string): Specifies an iOS-specific build image, which dictates the macOS version and Xcode version used for the build.
buildConfiguration (string): Defines the Xcode build configuration to use (e.g., "Debug" for development builds, "Release" for production builds).25
enterpriseProvisioning (boolean): Set to true if the build is intended for iOS enterprise distribution.
autoIncrement can also be configured here to be iOS-specific.
withoutCredentials (boolean): Similar to Android, if true, the iOS build will proceed without requiring signing credentials (certificate and provisioning profile).25
"Under the Hood" of eas.json Processing:
When eas build is executed, the EAS CLI performs several steps involving eas.json:
It reads the eas.json file from the project root.
It identifies the build profile specified by the --profile flag (or uses a default profile).
It resolves the profile's configuration, including processing any extends directives to merge settings from parent profiles. Platform-specific configurations within the chosen profile take precedence over common settings for their respective platforms.
This final, resolved configuration object is then transmitted to the EAS Build service.
The EAS Build service uses this configuration to provision an appropriate build worker (virtual machine) based on the specified image and resourceClass.
Environment variables defined in the profile's env block are set within the build worker's environment.
The specified versions of build tools (Node.js, Yarn, Cocoapods, Gradle, Xcode, etc.) are utilized.
The actual build process (e.g., Gradle tasks for Android, Xcode build commands for iOS) is then executed according to these configurations, ultimately producing the application binary.
Configuring eas.json (Guidance for Exercise 16.1):
To begin configuring eas.json for builds, you would typically run eas build:configure in your project directory. This command analyzes your project and generates a basic eas.json file with default development, preview, and production build profiles if one doesn't already exist, or it may offer to update an existing one.
To modify a profile, you would manually edit the eas.json file. For example:
To add an environment variable:
JSON
{
  "build": {
    "production": {
      "env": {
        "API_URL": "https://api.example.com/prod"
      }
    }
  }
}


To change the resource class for faster iOS builds:
JSON
{
  "build": {
    "production": {
      "ios": {
        "resourceClass": "large"
      }
    }
  }
}


To enable iOS simulator builds for the development profile:
JSON
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    }
  }
}


To create a new custom profile, you can copy an existing profile block, rename it (e.g., to "staging"), and then modify its properties. Using the extends property is highly recommended to avoid duplication if the new profile shares many settings with an existing one. For instance, a staging profile might extend production but use a different channel or env variables.
Always refer to the official eas.json schema documentation for a comprehensive list of all available properties and their valid values to ensure correct configuration.
The following table provides an overview of key build profile properties in eas.json:

Property
Description & Purpose
Applicable To
Example Value / Common Usage
Relevant Snippet(s)
extends
Inherits configuration from another profile to reduce duplication.
Common
"production" (e.g., preview extends production)
24
distribution
Specifies if the build is for app stores (store) or internal sharing (internal).
Common
"internal" for dev/preview, "store" for production
25
channel
Links the build to an EAS Update channel for OTA updates.
Common
"production", "staging"
2
env
Defines environment variables available during the build process.
Common
{ "API_KEY": "your_api_key_secret_name_in_eas" }
24
resourceClass
Selects the VM resources (CPU, RAM) for the build job.
Common, Android, iOS
"medium", "large"
24
developmentClient
If true, indicates the build is a development client (uses expo-dev-client).
Common
true for development profiles
24
android.buildType
Specifies the Android artifact type (apk or aab).
Android
"aab" for Play Store, "apk" for internal/preview
17
ios.simulator
If true, creates a build compatible with the iOS Simulator.
iOS
true for development (simulator) profiles
6
node
Specifies the Node.js version for the build environment.
Common
"18.18.0"
24
applicationArchivePath
Path/pattern to locate the final build artifact (e.g., .apk, .ipa).
Common
Default usually works; customize if output path changes.
25
autoIncrement
Controls automatic incrementing of build versions/numbers.
Common, Android, iOS
true, or an object for finer control (e.g., { "ios": "buildNumber" })
25
credentialsSource
Determines if EAS-managed (remote) or user-provided (local) signing credentials are used.
Common
"remote" (default)
25
android.gradleCommand
Custom Gradle command for Android builds.
Android
":app:assembleDebug" for debug builds
33
ios.buildConfiguration
Xcode build configuration (Debug or Release).
iOS
"Debug" for development, "Release" for production
25
image
Specifies the base OS/tooling image for the build server.
Common, Android, iOS
"latest", "ubuntu-22.04-jdk-17-ndk-r26b", "macos-sequoia-15.4-xcode-16.3"
24

The eas.json file effectively serves as both an "Infrastructure as Code" and "Configuration as Code" manifest for an application's build and deployment lifecycle within the EAS ecosystem. It declaratively defines critical aspects of the build environment, such as tool versions, operating system images, and resource classes.24 Furthermore, it specifies the nature of build outputs and their types—whether it's a development client, an APK, AAB, or IPA, and its intended distribution method.17 It also governs build behavior, including how credentials are handled, caching strategies, and the injection of environment variables.25 By committing eas.json to version control (Git), the entire build setup becomes reproducible, auditable, and versionable. This practice brings established DevOps principles into the mobile app development workflow, fostering consistency, enabling automation, and significantly reducing the likelihood of manual configuration errors. It empowers teams to systematically manage complex build variations and maintain a clear record of their build configurations over time.
The extends property within eas.json build profiles, though seemingly simple, is a potent mechanism for adhering to DRY (Don't Repeat Yourself) principles and fostering maintainable build configurations. This is especially true for projects that necessitate numerous build variants, a common scenario in mobile app development where different versions might be needed for development debugging, internal releases, staging environments, and production store submissions. Without the extends feature, common settings would have to be duplicated across multiple profiles, inevitably leading to increased maintenance overhead and a higher risk of inconsistencies.24 The extends property allows for the definition of a base profile (e.g., a comprehensive production profile) from which other specialized profiles can inherit. These specialized profiles can then selectively override specific settings as needed.24 This hierarchical approach enables teams to construct a clear and logical structure for their build configurations, enhancing the readability and manageability of the eas.json file. Such organization proves particularly beneficial as a project scales and the demand for diverse build types grows, for instance, to support different white-label versions of an app, A/B testing features, or various QA builds. However, it's worth noting that deeply nested or circular extends chains can become challenging to debug, and EAS imposes a depth limit on these extensions.25
A crucial link between EAS Build and EAS Update is forged by the channel property within build profiles. This property is fundamental for enabling targeted Over-the-Air (OTA) updates to different categories of application builds. Builds created using a specific profile can be tagged with a designated channel name, such as "production," "staging," or "beta".35 Subsequently, the EAS Update service utilizes these channel names to deliver specific OTA updates exclusively to builds that are associated with that particular channel.2 This capability allows, for example, the deployment of experimental or beta updates only to builds on a "staging" channel, which might be used by internal testers or a limited group of early adopters, while stable and thoroughly tested updates are pushed to builds on the "production" channel, reaching the general user base. This tight integration between the build configuration (via eas.json) and the update distribution mechanism (via channels) is essential for implementing effective software release strategies such as phased rollouts, A/B testing of new JavaScript-based features, and maintaining distinct update streams for different user segments or testing phases. Misconfiguration of these channels can lead to unintended consequences, such as updates being delivered to the wrong set of users, underscoring the importance of careful setup.
Background Bridge Notes
For Native Developers (Android/iOS): Think of eas.json as a high-level configuration layer that sits on top of your project's native build files (like build.gradle for Android or Xcode project settings such as .xcscheme files and Info.plist for iOS). It doesn't entirely replace these native configuration files but rather controls how EAS Build interacts with them and sets up the overall build environment. Properties within eas.json such as buildConfiguration (for iOS) or gradleCommand (for Android) often map directly to concepts you're familiar with in native development.
For Web Developers (React/Angular): The build profiles defined in eas.json are analogous to the different build configurations or environments you might manage in a web project. For example, you might have distinct configurations for development, staging, and production builds in a webpack.config.js file or an angular.json workspace configuration. A key difference is that eas.json also dictates aspects of the cloud infrastructure used for the build, such as the virtual machine size (resourceClass) and the operating system image, which is a layer of control not typically present in web build configurations that focus solely on asset bundling and optimization.
Section 5: Creating Development Builds
Development builds are a cornerstone of modern Expo and React Native development, especially when projects involve custom native code or third-party native libraries not included in the standard Expo Go application.
What are Development Builds?
A development build is essentially a debug-configured version of your actual application that includes the expo-dev-client library.8 Its primary purpose is to enable developers to run and test their app on physical devices or simulators/emulators in an environment that accurately reflects the app's native dependencies.6 This provides a development experience similar to using Expo Go—offering features like live reloading, Fast Refresh, and access to the developer menu—but critically, it operates within the context of your fully custom native app environment.22 This allows for the testing of native features such as push notifications, specific hardware interactions, or authentication flows that rely on native components, all during the active development phase.22
The key distinction from Expo Go is that Expo Go is a pre-built, general-purpose client application provided by Expo, containing a fixed set of common native modules. In contrast, a development build is your app, compiled with your project's specific native dependencies and custom native code.6
Official Documentation Link Box
Development Builds Introduction: https://docs.expo.dev/develop/development-builds/introduction/ 24
Create a Development Build: https://docs.expo.dev/develop/development-builds/create-a-build/ 6
Why Use Development Builds?
Development builds become necessary when:
Expo Go is insufficient due to the project's use of custom native code or third-party native libraries that are not part of the Expo Go bundle.
You want to experience the "look and feel of what users will experience" with your specific native setup during development.22
Working with projects initialized as bare React Native or Expo projects that have been "ejected" but still wish to leverage Expo's development tooling and OTA update capabilities.
You need to preview EAS Updates that are targeted using a specific runtimeVersion, as these updates cannot be loaded in Expo Go.35
Creating a Development Build with EAS Build:
To create a development build using EAS Build, certain prerequisites must be met 6:
An active Expo account.
EAS CLI installed and logged into your Expo account.
For iOS Simulator builds created via EAS: While the build happens in the cloud, triggering it and installing it often involves a macOS machine with the iOS Simulator installed locally. The eas.json file must also be configured appropriately for simulator builds.
For iOS device builds created via EAS: A paid Apple Developer Program account is required for code signing, enabling installation on physical iOS devices.
The eas.json file needs a dedicated build profile, typically named development, configured with the following key properties 6:
"developmentClient": true: This flag is essential; it tells EAS Build to include and configure expo-dev-client.
"distribution": "internal": This allows the build to be installed directly via a shared link or QR code, bypassing app stores.
For iOS Simulator builds: "ios": { "simulator": true }.
For Android builds: No special simulator flag is needed as the same .apk artifact generally works on both physical devices and emulators.24
Optionally, for Android debug builds, you might specify: "android": { "gradleCommand": ":app:assembleDebug" }.33 For iOS debug builds: "ios": { "buildConfiguration": "Debug" }.33
The command to initiate a development build is 6:

Bash


eas build -p [android|ios] --profile development


(Replace [android|ios] with the desired platform).
After the build successfully completes on EAS servers, the EAS CLI will typically prompt you to install the application on a connected device or running simulator/emulator.6 Alternatively, development builds can be downloaded from your project's dashboard on expo.dev or installed using the Expo Orbit tool.6
Using a Development Build:
Install the generated .apk (for Android) or .ipa (for iOS) file onto your target physical device or simulator/emulator.
Start the Metro bundler for your project from your local machine by running: npx expo start.6
The expo-dev-client embedded within your development build will detect and connect to this running Metro development server.
Open the app on your device/simulator. It will load the JavaScript bundle and assets from your local Metro server, enabling features like live reload, Fast Refresh, the developer menu, element inspector, and performance monitor, much like the Expo Go experience.22 General dev server features are also described in.28
Local Development Builds (Alternative to EAS Build):
Instead of using EAS Build's cloud infrastructure, you can also create development builds locally:
Using Expo CLI commands: npx expo run:android or npx expo run:ios.6 These commands compile the app locally and install it on a connected device/emulator. This requires a full local native build tool setup (Android Studio with SDK/NDK, Xcode with command-line tools).6
Using EAS CLI for local orchestration: eas build -p [android|ios] --profile development --local.6 This command uses EAS CLI's build logic but performs the compilation on your local machine.
"Under the Hood" - How expo-dev-client Works:
The expo-dev-client is a native library that you integrate into your project's dependencies. When a development build containing this library is launched:
expo-dev-client provides an initial native UI. This UI often resembles the Expo Go launch screen and allows the app to connect to a running Metro development server.
It can automatically discover Metro servers running on the same local network or allow manual connection to a specified URL (e.g., an ngrok tunnel for remote development or collaboration).
Once a connection is established, expo-dev-client fetches the JavaScript bundle and associated assets from the Metro server and executes the React Native application logic.
Crucially, it also bridges various development-time features, such as invoking the developer menu, handling live/hot reloading requests from Metro, and displaying runtime errors.
The following table provides an initial comparison between Development Builds and Production Builds:
Aspect
Development Build
Production Build (Preview)
Primary Purpose
Iterative development, debugging with full native access
App store submission, final testing, end-user distribution
Includes Developer Tools
Yes (expo-dev-client, dev menu, live reload)
No
JavaScript Minification
No or minimal (optimized for debugging speed)
Yes (optimized for performance and size)
Typical Signing
Debug certificates (Android), Development/Ad-hoc provisioning (iOS)
Distribution certificates/keystores
Distribution Method
Direct install (QR/link), npx expo run:[platform], local EAS build
App stores (TestFlight, Play Console tracks), enterprise distribution
Store Submission
No
Yes

Development builds signify a crucial architectural evolution within the Expo ecosystem. They empower developers by granting full native capabilities while striving to retain the renowned developer experience that Expo is known for. Historically, Expo's managed workflow often presented a trade-off: ease of use (facilitated by Expo Go) at the cost of native flexibility. The introduction of expo-dev-client and the ability to create development builds via EAS Build effectively eliminates this compromise.6 Developers can now seamlessly install any third-party native library or write custom native code in Swift, Kotlin, Java, or Objective-C, and still benefit from rapid iteration cycles thanks to features like Fast Refresh, live reload, and the integrated Expo developer menu. This enhancement significantly broadens Expo's applicability, making it a more attractive and viable platform for projects with complex or specialized native requirements. It effectively bridges the gap that once existed between the highly abstracted "managed" workflow and the more hands-on "bare" React Native workflow, offering a path that combines benefits from both.
The workflow associated with development builds—first creating the native build and then separately running npx expo start to serve the JavaScript—decouples the native runtime environment from the JavaScript bundling and serving process. This separation offers considerable flexibility but also necessitates an understanding of two distinct stages in the development cycle. The command eas build --profile development (or its local equivalents like npx expo run:[platform]) compiles and installs the native shell, which is the "client" application.6 This native shell changes relatively infrequently, typically only when native dependencies are added, removed, or updated. In contrast, the npx expo start command initiates the Metro server, which is responsible for bundling the JavaScript code and serving it to the development client.6 This bundling and serving process occurs continuously as JavaScript code is modified, enabling live updates. The development client, once installed, connects to this Metro server to load and execute the JavaScript logic. Developers must recognize that modifications to native code (e.g., installing a new native module, writing custom Swift/Kotlin) require a rebuild of the development client itself. JavaScript-only changes, however, are reflected rapidly via the Metro connection. This is a departure from the Expo Go model, where the native shell is fixed and provided by Expo. While this two-stage process is powerful, it can be a point of confusion for newcomers if not clearly elucidated. An interesting consequence of this decoupling is that the development client build artifact (the .apk or .ipa file) can itself be shared among team members. Each team member can then run their own local Metro instance and connect their installed development client to it, facilitating collaborative development and testing on individual code branches.
Background Bridge Notes
For Native Developers (Android/iOS): A development build in the Expo context is essentially your standard "Debug" build configuration that you would typically compile and run from Xcode or Android Studio directly onto a device or emulator for testing purposes. The expo-dev-client library augments this by adding the Expo-specific bridge for live reloading and JavaScript bundling from a Metro server.
For Web Developers (React/Angular): The concept of a development build combined with a running Metro server is very similar to your local development server setup (e.g., running npm start for a React app using webpack-dev-server, or ng serve for an Angular app). The development build artifact (the .apk or .ipa) acts like your web browser, but it's a native application shell. The npx expo start command, which runs Metro, is analogous to your webpack-dev-server or other development server that bundles and serves your web application's assets with HMR capabilities. The key difference is the initial, explicit "build" step required to create the native shell before you can start serving JavaScript to it.
Section 6: Creating Production Builds (iOS and Android)
Production builds are the culmination of the development process, representing the version of your application that will be distributed to end-users through app stores or other official channels.
What are Production Builds?
A production build is an optimized and signed version of your application, specifically prepared for submission to app stores like the Apple App Store and Google Play Store, or for final production-level testing.17 Its primary purpose is to create the final, distributable artifacts—an .ipa file for iOS and typically an .aab (Android App Bundle) file for Android—that will be installed on users' devices.
Key characteristics of production builds include:
Optimization: JavaScript code is minified, and various optimizations are applied to enhance performance and reduce bundle size.
Exclusion of Developer Tools: Libraries and tools intended for development, such as expo-dev-client and the developer menu, are excluded from the build.
Distribution Signing: The application code is cryptographically signed with distribution certificates (for iOS) or keystores (for Android). This signing process is mandatory for app store submission and verifies the app's authenticity and integrity.
Official Documentation Link Box
Build project for app stores: https://docs.expo.dev/deploy/build-project/ 17
App signing (managed credentials): https://docs.expo.dev/app-signing/managed-credentials/ 6
Creating a Production Build with EAS Build:
EAS Build streamlines the creation of production builds. The following prerequisites are generally required 3:
An active paid Apple Developer Program membership (currently $99 USD per year) is necessary for creating iOS production builds for the App Store.3
A Google Play Developer account (currently a $25 USD one-time fee) is required for submitting Android builds to the Google Play Store.3
EAS CLI must be installed and you must be logged into your Expo account.
Your project's app.json or app.config.js must be configured with the necessary application identifiers: bundleIdentifier for iOS and package for Android.
eas.json Configuration for Production Builds:
A build profile, typically named production, is used for these builds.17 This profile might be quite minimal by default, as many EAS Build defaults are already oriented towards production:

JSON


{
  "build": {
    "production": {}
  }
}


Key considerations for the production profile include:
"distribution": "store" is either implicitly set or should be explicitly configured for builds intended for app store submission.25
For Android, "buildType": "aab" is the default and recommended setting, producing an Android App Bundle for optimal distribution via Google Play.17
For iOS, EAS Build will produce an .ipa file.
Credentials Management: EAS Build can manage signing credentials. It can guide you through generating new credentials (keystores for Android, distribution certificates and provisioning profiles for iOS) and store them securely, or it can use existing credentials that you provide or upload.17
The command to initiate a production build is 17:

Bash


eas build -p [android|ios|all] --profile production


(Replace [android|ios|all] with the target platform(s)). The --profile production flag might be optional if production is the only defined profile or if it's set as the default. EAS Build handles the complexities of code signing using the credentials configured for the project and profile.
Output Artifacts:
iOS: An .ipa file is generated. This is the iOS App Store Package that you submit to App Store Connect.7
Android: By default, an .aab (Android App Bundle) file is produced.17 While an .apk can be specified (e.g., by setting "buildType": "apk" in eas.json), this is generally not recommended for Play Store submissions due to the benefits of AABs.17
App Signing "Under the Hood":
Code signing is a critical security measure in mobile app distribution. It verifies the identity of the app developer and ensures that the app code has not been altered or corrupted since it was signed. App stores mandate signed applications.
iOS Signing:
This process requires a Distribution Certificate (which identifies you or your organization as a trusted Apple developer) and a Provisioning Profile. The provisioning profile links the distribution certificate, the App ID (your app's unique identifier), and specifies how the app can be distributed (e.g., App Store, Ad Hoc).
EAS can assist in creating these credentials through interactions with App Store Connect or can use existing credentials if you upload them to EAS.
The final .ipa file is signed using these credentials.
Android Signing:
This requires a Keystore, which is a binary file containing one or more private keys.
EAS can generate a new keystore for your application and store it securely on its servers, or you can upload an existing keystore if you have one (e.g., for an app already on the Play Store).17
The .aab or .apk file is signed with a key from this keystore.
Google Play App Signing: For apps distributed via Google Play, Google strongly recommends (and for new apps, requires) using Play App Signing. With this model, you sign your app bundle (AAB) with an "upload key." When you upload the AAB to the Play Console, Google verifies it using your upload key, then re-signs the APKs it generates from the AAB with the final "app signing key," which Google manages for you. This enhances security, as the app signing key is kept secure by Google.
EAS Role in Signing: EAS significantly simplifies the often convoluted process of managing and applying these signing credentials. It can automate fetching, applying, and sometimes even generating these credentials during the build process, abstracting away many manual and error-prone steps.17
Build Artifacts Explained:
.ipa (iOS App Archive): This is a package file format used by Apple to distribute iOS applications. It's essentially a ZIP file containing the app's executable binary and all its resources (images, assets, etc.). This is the file you upload to App Store Connect for distribution through the App Store or TestFlight.
.aab (Android App Bundle): This is a publishing format for Android apps. An AAB includes all your app's compiled code and resources but defers the final APK generation and signing (with the app signing key, if using Play App Signing) to Google Play. When a user downloads your app, Google Play uses the AAB to generate and serve optimized APKs tailored to that user's specific device configuration (e.g., screen density, CPU architecture). This results in smaller download sizes for users and is the preferred format for new apps submitted to Google Play.38
.apk (Android Package Kit): This is the traditional package file format for Android applications. An APK is a complete, installable application. While EAS Build can produce APKs for production profiles (if buildType: "apk" is set), AABs are generally the better choice for Google Play Store distribution due to their optimization benefits.
Local Production Builds (Alternative to EAS Build):
It is possible to create production builds locally, either by using eas build --profile production --local or by manually configuring Xcode and Android Studio for release builds.6 This approach requires a complete local native development environment setup (Android Studio, Xcode, correct SDKs, etc.) and involves manual management of all signing credentials. It is generally more complex and error-prone than using EAS cloud builds, especially for developers less familiar with native build intricacies. For detailed instructions on local production builds, refer to the Local app compilation 6 and the Local App Production Guide.39
The following table completes the comparison between Development and Production builds:
Aspect
Development Build
Production Build
Primary Purpose
Iterative development, debugging with full native access
App store submission, final testing, end-user distribution
Includes Developer Tools
Yes (expo-dev-client, dev menu, live reload)
No
JavaScript Minification
No or minimal (optimized for debugging speed)
Yes (optimized for performance and size)
Typical Signing
Debug certificates (Android), Development/Ad-hoc provisioning (iOS)
Distribution certificates/keystores for app stores
Distribution Method
Direct install (QR/link), npx expo run:[platform], local EAS build
App stores (TestFlight, Play Console tracks), enterprise distribution
Store Submission
No
Yes
Output Artifacts
Development .apk/.ipa (often debug signed)
Release .aab (Android), release .ipa (iOS) (distribution signed)
eas.json Profile Example
developmentClient: true, distribution: "internal"
distribution: "store", Android buildType: "aab"

EAS Build for production significantly democratizes the mobile app release process. It achieves this by abstracting away many of the platform-specific complexities that have historically been major hurdles for developers, particularly concerning code signing and build environment configuration. The process of code signing for both iOS (managing certificates and provisioning profiles) and Android (handling keystores) is notoriously intricate and a common source of frustration, especially for those new to mobile development or teams primarily focused on JavaScript.17 EAS offers to manage these credentials, either by guiding the developer through their creation or by using existing ones, thereby simplifying this critical step considerably.17 Furthermore, building applications for multiple platforms typically necessitates distinct development environments, toolchains, and often, different operating systems (e.g., macOS for iOS builds). EAS provides a unified, cloud-based environment that handles these requirements. This lowers the barrier to entry for publishing React Native applications, enabling smaller teams or individual developers to achieve professional and consistent release pipelines without requiring deep, specialized native expertise in both iOS and Android build systems. It also helps mitigate the "it works on my machine" problem by standardizing the environment in which release builds are created.
The standardization on Android App Bundles (.aab) for Android production builds within EAS reflects an alignment with industry best practices and Google's strategic direction for app distribution on Google Play. This offers tangible benefits, most notably smaller and more optimized app downloads for end-users.38 EAS defaults to AAB for production Android builds, guiding developers towards this modern format.17 However, this shift also requires developers to understand its implications. AABs fundamentally change how Android apps are delivered: developers publish an AAB, and Google Play then generates and signs the final APKs that users install. This can be a conceptual adjustment for those accustomed to building and signing the final APKs themselves. For instance, testing an AAB directly is not as straightforward as installing an APK (though Google Play Console's internal app sharing and internal testing tracks facilitate AAB testing). It also introduces a distinction between the "upload key" (used by the developer to sign the AAB) and the "app signing key" (managed by Google Play to sign the distributed APKs). EAS helps in managing the upload key aspect of this process.
Background Bridge Notes
For Native Developers (Android/iOS): Creating production builds with EAS is analogous to configuring and running your "Release" build configuration in Xcode or Android Studio. EAS steps in to help manage the signing identities (certificates, provisioning profiles, keystores), which you might otherwise handle manually within the IDEs or through scripting tools like Fastlane. The emphasis on the AAB format for Android might be a key point of learning if your prior experience was primarily with generating and distributing APKs directly.
For Web Developers (React/Angular): The concept of a "production build" is familiar from web development (e.g., running npm run build to create optimized, minified static assets). However, for mobile applications, this process involves several additional layers of complexity. Beyond JavaScript optimization, it includes compiling native code and, crucially, code signing with platform-specific cryptographic keys, a step that has no direct parallel in typical web deployment workflows. The resulting .ipa or .aab files are self-contained executable packages, not just a collection of static files to be served by a web server.
Section 7: Submitting to App Stores (Overview)
After a production build of your application has been successfully created and tested, the final step in reaching your users is to submit it to the official app marketplaces: Apple's App Store (for iOS apps) and the Google Play Store (for Android apps). This process involves more than just uploading a file; it includes providing detailed metadata about your app, adhering to platform guidelines, and undergoing a review by the respective store teams.
EAS Submit is a hosted service provided by Expo designed to automate and simplify the often complex task of uploading and submitting app binaries to these stores.1 The primary goal of EAS Submit is to streamline this multi-step procedure, often reducing it to a single command-line instruction, thereby making the submission process faster and less error-prone.1
The core command for this service is:

Bash


eas submit -p [ios|android]


(Replace [ios|android] with the target platform).12
EAS Submit can also be integrated directly with EAS Build using the --auto-submit flag, which initiates a submission automatically after a successful build:

Bash


eas build -p [platform] --profile production --auto-submit


.12
Official Documentation Link Box
EAS Submit Introduction: https://docs.expo.dev/submit/introduction/ 1
Submit to App Stores Guide: https://docs.expo.dev/deploy/submit-to-app-stores/ 12
Configure EAS Submit with eas.json: https://docs.expo.dev/submit/eas-json/ 1
Prerequisites for using EAS Submit:
Successfully using EAS Submit requires several prerequisites to be in place 12:
General:
EAS CLI must be installed on your system and you need to be logged into your Expo account.
A production-ready build artifact (an .ipa file for iOS or an .aab file for Android) must be available. This is typically generated using EAS Build.
For Apple App Store Submission:
An active Apple Developer Program membership.
An app record must be created in App Store Connect. While EAS Submit can sometimes assist in creating this if it doesn't exist, it's generally good practice to set this up manually beforehand, especially for the first submission.13
The correct bundleIdentifier must be configured in your project's app.json or app.config.js.
Authentication with App Store Connect: This is typically handled by configuring an App Store Connect API Key with EAS. This is the recommended method for automation and CI/CD environments. Alternatively, EAS Submit can prompt for Apple ID login, which may involve 2-factor authentication.12
For Google Play Store Submission:
An active Google Play Developer account.
An app record must be created in the Google Play Console.43
The correct package name must be configured in your project's app.json or app.config.js.
A Google Service Account JSON key with appropriate permissions must be generated from the Google Cloud Console and configured with EAS. This key allows EAS to authenticate with the Google Play Developer API on your behalf.3
Crucially, for Android apps, the first version of the app must typically be uploaded manually to the Google Play Console at least once. This is a current limitation of the Google Play Developer API.3 Subsequent submissions can then be automated using EAS Submit.
How EAS Submit Works "Under the Hood":
When you initiate eas submit:
EAS CLI prompts you to select the platform (iOS or Android) and the build artifact you wish to submit. You can choose from recent builds created with EAS Build or provide a path to a locally stored artifact.
Authentication:
For iOS submissions, EAS uses the configured App Store Connect API key (if available) or prompts for Apple ID credentials.
For Android submissions, EAS utilizes the configured Google Service Account JSON key to authenticate with Google's APIs.
Binary Upload:
For iOS, EAS Submit uploads the .ipa file to App Store Connect. This is similar to the process of using Apple's Transporter application but is handled by EAS servers.14
For Android, it uploads the .aab file to the Google Play Console.
Submission Management:
EAS Submit can associate the uploaded build with a specific version or release track within the respective app store (e.g., TestFlight for iOS, or internal/alpha/beta/production tracks for Android).
If you are using the EAS Metadata service (which is beyond the scope of this module but part of the broader EAS ecosystem), EAS Submit might also update store listing information like descriptions and screenshots.
The EAS CLI provides real-time feedback on the submission's progress and status.45 A significant advantage of EAS Submit, particularly for iOS, is that the submission process runs on Expo's cloud servers. This means you do not need macOS-specific tools like Apple's Transporter app installed locally to submit iOS apps, enabling iOS submissions from Windows or Linux development environments.14
Configuring Submissions with eas.json (Submit Profile):
Similar to EAS Build, EAS Submit can be configured using profiles within the eas.json file, under a top-level submit key.12 A common profile name is production.
Platform-specific options within a submit profile include:
Android (android key):
serviceAccountKeyPath: Path to your Google Service Account JSON key file.
track: The Google Play Console track to submit to (e.g., internal, alpha, beta, production).
releaseStatus: The status of the release (e.g., completed to roll out immediately, draft to save as a draft).
iOS (ios key):
ascAppId: Your app's unique App Store Connect App ID (Apple ID number).
appleId: Your Apple ID (email address), used if not employing an App Store Connect API key.
ascApiKeyPath, ascApiKeyIssuerId, ascApiKeyId: Details for using an App Store Connect API key for authentication.
Manual Submission Process (Brief Overview for Context):
Understanding the manual process highlights the value EAS Submit provides.
iOS (via App Store Connect) 13:
Ensure App ID, Distribution Certificate, and Provisioning Profile are correctly set up via the Apple Developer Portal.
Create (or update) an app record in App Store Connect.
Archive the build in Xcode to generate an .ipa file (or download it from EAS Build if built there).
Upload the .ipa file using Apple's Transporter application or directly through Xcode.
Log into App Store Connect and fill in all required metadata: version information, release notes, screenshots, app description, pricing and availability, privacy information, etc.
Select the uploaded build for the version you are releasing.
Submit the version for review by Apple.
Android (via Google Play Console) 3:
Create (or update) an app listing in the Google Play Console.
Fill in store listing details: app title, descriptions, graphic assets, categorization, content rating questionnaire, pricing, and distribution settings.
Navigate to a release track (e.g., internal testing, closed testing, open testing, or production).
Create a new release within the chosen track.
Upload your .aab (or .apk) file to this release.
Enter release notes and review the release.
Roll out the release (either fully or as a staged rollout).
EAS Submit automates many of these manual steps, particularly the binary upload and initial association with a release, significantly reducing manual effort and potential for error.12
Troubleshooting Common Submission Issues (High-Level):
While a dedicated troubleshooting module would cover this in depth, common issues often relate to:
Credential Errors: Invalid or expired API keys, incorrect Google Service Account configurations, or Apple ID login problems (2FA issues).18
Identifier Mismatches: The bundleIdentifier (iOS) or package name (Android) in your app's configuration not matching the record in App Store Connect or Google Play Console.
Binary Rejections: The app stores might reject binaries for various reasons, including missing permissions declarations, incorrect signing (though EAS Build helps prevent many signing issues), use of private APIs, or content policy violations.
App Store API Downtimes or Changes: Occasionally, the app store services themselves may experience issues or undergo changes that affect automated tools.
Outdated EAS CLI Version: Using an old version of eas-cli can sometimes lead to compatibility problems with the latest EAS backend services or app store APIs.48
EAS Submit, by abstracting the intricacies of platform-specific submission tools and the complexities of credential management, substantially lowers the barrier to entry for cross-platform application publishing. A key benefit is its "build once, submit anywhere (from anywhere)" capability. Traditionally, manual iOS submissions necessitate a macOS machine equipped with Xcode and/or Apple's Transporter application.14 EAS Submit's cloud-based iOS submission mechanism circumvents this requirement, enabling developers using Windows or Linux systems to fully manage their iOS release pipeline.14 Furthermore, the task of managing API keys, service account credentials, and login sessions for two distinct app store platforms can be daunting. EAS centralizes and simplifies parts of this credential management process.12 Consequently, a single eas submit command can replace a multitude of manual steps that would otherwise be performed across different web portals and platform-specific software tools. This standardization enhances developer productivity and reduces the depth of platform-specific knowledge required for the individual or team member responsible for releases.
However, it's important to note that EAS, while powerful, operates within the constraints imposed by the underlying platform ecosystems. A clear example of this is the prerequisite for Android applications to be manually uploaded to the Google Play Console at least once before EAS Submit can be used for subsequent automated submissions.3 This requirement is explicitly stated as a limitation of the Google Play Developer API.12 It means that the very first interaction to establish the application's presence on the Play Store must be a manual one. Once this initial "bootstrap" is complete, EAS Submit can effectively automate future submissions. This initial manual step, if not anticipated, can be a point of friction for developers aiming for full automation from the outset. It also serves as a pertinent reminder that EAS functions as a sophisticated layer on top of App Store Connect and the Google Play Console, rather than a complete replacement for them. These native store portals remain the ultimate authorities and sources of truth for app management and policy enforcement.
The tight integration of EAS Submit with EAS Build (e.g., through the --auto-submit flag) and its synergy with EAS Workflows clearly indicate a strategic direction towards enabling a fully automated "code-to-store" pipeline for Expo developers.5 The eas build --auto-submit command, for instance, condenses two major phases of the release process—building the application and initiating its submission—into a single, streamlined command.12 Furthermore, EAS Workflows empower teams to configure automated triggers for builds and submissions based on code commits to specific repository branches (e.g., merging to main or release branches).5 This level of automation mirrors mature CI/CD practices commonly observed in web development and other software engineering disciplines. By adopting these capabilities, development teams can achieve a high degree of automation, significantly reducing manual intervention, minimizing the potential for human error in their release processes, and ultimately enabling more frequent, reliable, and predictable application releases. However, the effective implementation and maintenance of these sophisticated automated workflows necessitate careful and precise configuration of eas.json files, workflow YAML definitions, and secure management of all associated credentials.
Background Bridge Notes
For Native Developers (Android/iOS): Using EAS Submit is conceptually similar to employing tools like fastlane deliver or other CI/CD automation scripts tailored for app store deployment. You will recognize familiar concepts such as Apple's TestFlight for distributing pre-release iOS builds and Google Play Console's release tracks (internal, alpha, beta, production) for managing Android releases. EAS aims to provide an integrated experience within its ecosystem for these tasks.
For Web Developers (React/Angular): App store submission represents a significantly different paradigm compared to typical web application deployment. It's not merely a matter of pushing code to a server or CDN. Instead, it's a formal, regulated process involving reviews by platform holders (Apple and Google), strict metadata requirements, and specific binary packaging formats. EAS Submit endeavors to make this multi-step, platform-specific process feel more like a single, unified command, abstracting away many of the underlying complexities.
Section 8: EAS Update (Over-the-Air Updates)
Over-the-Air (OTA) updates are a powerful feature in the mobile app development landscape, allowing developers to deliver certain types of updates directly to users' devices without requiring them to download a new version of the app from the app store.
Introduction to Over-the-Air (OTA) Updates:
OTA updates, in the context of React Native and Expo, provide a mechanism to update an application's JavaScript bundle, assets (such as images, fonts, and sound files), and styling directly on users' devices.1
What can be updated: Changes made to the JavaScript codebase, modifications to assets, and updates to styles defined in JavaScript are eligible for OTA updates.
What cannot be updated: Native code (Java/Kotlin for Android, Swift/Objective-C for iOS) cannot be updated via OTA. If you add new native modules, update existing native dependencies, change native configurations (like Info.plist or AndroidManifest.xml in a way that affects native behavior), or upgrade the Expo SDK / React Native version itself (which often involves native changes), a new binary build must be created and submitted to the app stores.
Benefits of OTA Updates 15:
Rapid Bug Fixes: Quickly address critical bugs that exist purely within the JavaScript layer of your application.
Faster Iteration: Roll out new JavaScript-based features, UI enhancements, or UX improvements more rapidly.
Bypass App Store Review Times: For updates that only involve JS and assets, you can often bypass the potentially lengthy app store review process. (Note: Store policies must still be adhered to regarding the nature of changes pushed via OTA).
Reduced Downtime & Enhanced User Experience: Deliver fixes and improvements to users more quickly, minimizing the impact of bugs and keeping the app experience fresh.
Official Documentation Link Box
EAS Update Introduction: https://docs.expo.dev/eas-update/introduction/ 1
How EAS Update works: https://docs.expo.dev/eas-update/how-it-works/ 2
Send over-the-air updates: https://docs.expo.dev/deploy/send-over-the-air-updates/ 50
expo-updates API Reference: https://docs.expo.dev/versions/latest/sdk/updates/ 51
Publishing updates: https://docs.expo.dev/eas-update/publishing-updates/
Code Signing for EAS Updates: https://docs.expo.dev/eas-update/code-signing/ 52
EAS Update Service:
EAS Update is Expo's hosted service specifically designed for distributing OTA updates to your applications.19 It works in close conjunction with the expo-updates library, which must be integrated into your app.
Core Concepts of EAS Update "Under the Hood" 2:
Understanding these concepts is crucial for effectively using EAS Update:
Builds and Updates Layers: Think of an installed app build as having two main layers:
Native Layer: This is the compiled binary code (Java/Kotlin/Swift/Objective-C) and native assets. It changes only when you release a new version through the app store.
Update Layer: This consists of your JavaScript bundle, other assets like images and fonts, and styling information. EAS Update allows you to swap this layer remotely.
Channels:
Channels are named streams used to distribute specific sets of updates to specific groups of app builds. Common channel names include production, staging, preview, or beta.2
You define a channel for a build profile in your eas.json file (e.g., "channel": "production").35 When an app is built with that profile, it becomes associated with that channel.
Apps built for a particular channel will only check for and receive updates published to that channel (or, more accurately, to an update branch that is linked to that channel).
Runtime Versions:
The runtimeVersion is a critical string or policy that describes the JavaScript-to-native interface contract of a specific app build.2
It is defined in your project's app.json or app.config.js file using the runtimeVersion property (e.g., as a specific string like "1.0.0", or using a policy like "sdkVersion", "appVersion", "nativeVersion", or "fingerprint").53
Compatibility is key: An OTA update will only be applied to a build if the update's target runtimeVersion exactly matches the runtimeVersion of the installed app build.
When to change runtimeVersion: You must change the runtimeVersion whenever you make changes to the native code of your app. This includes upgrading the Expo SDK or React Native version, adding or removing native dependencies, or modifying native project files in a way that could alter the API available to JavaScript. Failure to do so can lead to crashes if an OTA update tries to use native functionality that isn't present or has changed in an incompatible way in the user's installed binary.
Branches:
Conceptually similar to Git branches, EAS Update branches are streams that contain a chronological list of updates.2 The most recently published update on a branch is considered the active one for that branch.
You publish updates to a specific branch using eas update --branch <branchname>.2
Channels are then linked to these branches. By default, a channel (e.g., production) is linked to an EAS Update branch of the same name (production). However, you can change this mapping. For example, during a hotfix, you might temporarily point your production channel to a hotfix-1.2.3 branch. The command eas update --channel <channelname> is a higher-level convenience that publishes to the branch currently linked to that channel.
Update Manifest:
This is a JSON file served by the EAS Update service. It contains metadata about a specific update, including a list of assets (JS bundle, images, fonts), the launch asset (usually the main JS bundle), a unique update ID, creation timestamp, and the target runtimeVersion.2
Assets:
All assets required by the update (JavaScript bundles, images, fonts, etc.) are uploaded to EAS servers and typically served via a Content Delivery Network (CDN) for efficient global distribution. The expo-updates library is intelligent enough to only download assets that have changed since the last update, minimizing data usage.
The expo-updates Library (Client-Side Handling):
This library is embedded in your app and is responsible for communicating with the EAS Update service and managing the update lifecycle on the client device.
Installation: expo install expo-updates.55
Configuration in app.json or app.config.js (under expo.updates key) 15:
url (string): The URL of the EAS Update service endpoint for your project. This is usually configured automatically when you run eas update:configure.
enabled (boolean, default: true): A flag to enable or disable the expo-updates library for a build. If false, the app will always run the code embedded at build time.
checkAutomatically (enum: ON_LOAD, ON_ERROR_RECOVERY, NEVER, WIFI_ONLY): Determines when the app automatically checks for updates. ON_LOAD is the default, meaning it checks every time the app starts.
fallbackToCacheTimeout (number, in milliseconds): The time the app will wait for a new update to download on launch before giving up and loading the most recent cached update (or embedded update if none cached). Default is 0 (which historically meant wait indefinitely, but behavior might vary; check latest docs). A common practice is to set it to a few seconds to ensure a fast startup if the network is slow.
runtimeVersion (string or object): As described previously, this is crucial for ensuring compatibility between the native build and the OTA update.
requestHeaders (object): Allows you to send custom HTTP headers with update requests. This is often used to send the expo-channel-name header, allowing the server to identify which channel the request is for.
codeSigningCertificate (string) and codeSigningMetadata (object): Used for verifying the digital signature of downloaded updates if code signing is enabled.52
How it Works on the Client 2:
Check for Update: If checkAutomatically is set to ON_LOAD (the default), when the app launches, the expo-updates library sends a request to the configured updates.url. This request includes information like the current app's runtimeVersion, platform, and often the channel (via requestHeaders).
Manifest Download: If the EAS Update service finds a compatible update available on the branch linked to the app's channel, it responds with the update manifest.
Asset Download: expo-updates then compares the assets listed in the manifest with any assets already cached on the device from previous updates. It only downloads assets that are new or have changed.
Applying the Update:
By default, if an update is successfully downloaded, expo-updates will apply it the next time the app is launched (cold start).51 Some sources suggest that if the download is very fast (before fallbackToCacheTimeout), it might attempt to load immediately on the current launch, but relying on the "next launch" behavior is generally safer for predictability.2
If checkAutomatically is not ON_LOAD, or if you want more control, you must use the JavaScript API to manage the update process.
JavaScript API (import * as Updates from 'expo-updates';) 19:
Updates.checkForUpdateAsync(): Asynchronously checks with the server if a new update is available. Returns a promise that resolves to an UpdateCheckResult object containing isAvailable (boolean) and manifest (if available).
Updates.fetchUpdateAsync(): Asynchronously downloads an available update to the device's local storage. Returns a promise that resolves to an UpdateFetchResult object containing isNew (boolean) and manifest.
Updates.reloadAsync(): Instructs the app to reload and apply the most recently downloaded update. This is how you make a downloaded update active immediately (or rather, on the next JS context reload).
useUpdates() hook: A React hook that provides reactive state information about the update process, such as isUpdateAvailable, isUpdatePending, currentlyRunning update details, and any errors encountered during checks or downloads.19
Various constants like Updates.isEmbeddedLaunch, Updates.updateId, Updates.runtimeVersion, Updates.channel provide information about the current state of expo-updates.
Publishing an Update (Guidance for Exercise 16.2):
To publish an OTA update using EAS CLI:
Ensure your project is configured for EAS Update (run eas update:configure if you haven't already). This sets up the necessary updates.url in your app.json/app.config.js.
Make the desired JavaScript or asset changes in your codebase.
Commit your changes to Git (EAS Update often uses Git history to track updates, though this is more nuanced with modern EAS).
Run the EAS Update command. The common practice is to specify a branch:
Bash
eas update --branch <your-branch-name> --message "Your descriptive update message"
For example, to publish to a branch named production:
Bash
eas update --branch production --message "Fix for login button UI glitch"


.15
Alternatively, you can publish to a channel (which then resolves to its linked branch):
bash eas update --channel production --message "New feature rollout V2"
The --auto flag can also be used with eas update, which typically handles the bundling process locally and then uploads the update.2
5. Process:
* EAS CLI will bundle your JavaScript code and collect necessary assets (usually creating a dist directory locally with the update contents).
* This bundle and assets are then uploaded to the EAS Update service.
* A new update record is created on the specified EAS Update branch.
* If code signing is enabled for your project, EAS CLI will prompt you for the private key (or use one from a secure environment variable if in CI) to sign the update locally before uploading the signature along with the update bundle.52
Code Signing for EAS Updates 52:
Code signing adds a critical layer of security to your OTA updates, ensuring their authenticity and integrity.
Purpose: To prevent tampering with updates by malicious actors (e.g., during transit over a compromised network, or if a CDN is compromised). The client app can verify that the update genuinely came from you and hasn't been altered.
Process:
Generate Keys and Certificate: Use npx expo-updates codesigning:generate to create a private key (private-key.pem), a public key (public-key.pem), and a code signing certificate (certificate.pem). The private key must be kept secret and secure by the developer. The certificate contains the public key and is embedded into the app build.
Configure Project: Run npx expo-updates codesigning:configure to help set up your project. This involves adding the codeSigningCertificate (path to certificate.pem) and codeSigningMetadata (with keyid and alg like rsa-v1_5-sha256) to the updates object in your app.json/app.config.js. A new app build is required to embed the certificate.
Publish Signed Update: When publishing, provide the path to your private key to the eas update command (e.g., eas update --private-key-path../keys/private-key.pem). The EAS CLI uses this private key to sign the update bundle locally before uploading it. The private key itself is not uploaded.
Client Verification: When the expo-updates library in the client app downloads an update, it uses the public key from the embedded certificate to verify the signature of the update. If the signature is valid, the update is considered authentic and can be applied. If verification fails, the update is rejected.
Importance: Highly recommended for any application, especially those handling sensitive data or performing critical operations, as it provides a strong guarantee against unauthorized code execution.
Rollbacks and Error Recovery 59:
EAS CLI Rollback: The eas update:rollback command allows you to revert an update branch to a previously published update or to instruct clients to use the update embedded in their binary. This is a server-side action.
expo-updates Error Recovery: The client library has built-in mechanisms to handle situations where a newly applied OTA update causes the app to crash repeatedly shortly after launch. In such cases, expo-updates may automatically attempt to roll back to the last known good update or the embedded update to prevent the app from becoming "bricked" (unusable). This is a crucial safety net.
The following table summarizes key expo-updates configuration options in app.json/app.config.js:

Property
Role & Explanation
Default Value / Example
Relevant Snippet(s)
updates.url
The URL from which expo-updates fetches update manifests. Essential for connecting to EAS Update or a custom update server.
e.g., "https://u.expo.dev/YOUR_PROJECT_ID" (set by eas update:configure)
15
updates.enabled
Boolean; enables or disables the entire OTA update system for the build.
true
51
updates.checkAutomatically
Defines when the app automatically checks for updates (ON_LOAD, ON_ERROR_RECOVERY, NEVER, WIFI_ONLY).
ON_LOAD (formerly ALWAYS in some docs)
15
updates.fallbackToCacheTimeout
Milliseconds to wait for a new update on launch before using a cached/embedded one. Helps ensure fast startup on slow networks.
0 (behavior might mean wait indefinitely or apply next launch; check latest docs)
15
runtimeVersion
String or object policy; ensures updates are compatible with the build's native code. Critical for stability.
Policy-based, e.g., { "policy": "sdkVersion" } or string like "1.0.0"
2
updates.requestHeaders
Object; custom HTTP headers sent with update requests (e.g., for channel targeting or authentication).
e.g., { "expo-channel-name": "production" }
15
codeSigningCertificate
Path to the PEM-formatted X.509 certificate used for verifying codesigned updates.
e.g., "./certs/codesigning.pem"
52
codeSigningMetadata
Object containing metadata for the codeSigningCertificate, like keyid and alg (algorithm).
e.g., { "keyid": "main", "alg": "rsa-v1_5-sha256" }
52

The runtimeVersion stands out as the most critical configuration for ensuring the stability and safety of OTA updates. It functions as a strict contract between the application's compiled native code (the binary installed on the user's device) and the JavaScript bundle delivered via an OTA update. Changes to the native code, such as integrating new native modules, upgrading the React Native version or Expo SDK, or altering existing native functionalities, can easily introduce breaking changes in the API that JavaScript code relies upon.2 If an OTA update (which is essentially a new JavaScript bundle) expects a native API that either doesn't exist or has changed in an incompatible manner in the user's installed binary, the application is highly likely to crash upon trying to execute the updated JavaScript code.35 The runtimeVersion mechanism prevents this by ensuring that a given build will only attempt to download and apply OTA updates that are explicitly tagged with an identical runtimeVersion.2 This implies a crucial responsibility for developers: they must diligently update the runtimeVersion in their app.config.js whenever any such native changes are made. Failure to adhere to this discipline is a common cause of OTA update failures and can lead to widespread application crashes for users who receive an incompatible update. This necessitates a robust versioning strategy that carefully considers and coordinates changes in both the native and JavaScript layers of the application.
EAS Update's system of channels and branches, when used in conjunction with runtimeVersion, unlocks the potential for sophisticated deployment strategies that go far beyond simple hotfixes. These mechanisms allow for practices like phased rollouts, A/B testing of JavaScript-based features, and the delivery of environment-specific updates. Channels, such as production or staging, enable the segmentation of users or builds into different groups, each receiving updates from a distinct stream.2 Update branches, on the other hand, allow for the management of different versions or feature streams of updates independently, much like branches in a version control system.2 A single native build (identified by its runtimeVersion) can, in principle, be directed to receive updates from different compatible update branches or channels. While dynamically changing the update source on the client-side using methods like setUpdateUrlOverrideAsync is typically reserved for development or preview scenarios 61, the server-side mapping of a channel to a specific update branch is a key mechanism for controlling update flow in production. This means EAS Update is not merely an emergency bug-fixing tool; it's a feature-rich delivery platform for the JavaScript portion of an application. For instance, a development team could create a feature-X update branch, publish iterative JavaScript changes to it, link a preview channel (used by QA builds) to this branch for testing, and then, once the feature is validated, merge or promote those JavaScript changes to a production branch that feeds the production channel. All these OTA updates would target the same set of compatible native builds that share the correct runtimeVersion.
Code signing for EAS Updates, as detailed in 52 and 52, is an indispensable security measure. It directly addresses the risk of man-in-the-middle (MITM) attacks that could occur during the update delivery process, thereby ensuring that the JavaScript code executed on users' devices is authentic and has not been maliciously altered. While OTA updates are typically downloaded over HTTPS, which encrypts the data in transit and protects against tampering by network-level attackers, code signing provides an additional, stronger layer of assurance. The update bundle itself is cryptographically signed by the developer using a private key, and this signature is then verified by the app using a public key embedded within the app binary at build time. This robust verification protects against more sophisticated attack vectors, such as a compromised update server or a compromised Content Delivery Network (CDN) that might be used to distribute the update files. The critical aspect here is that the private key used for signing never leaves the developer's control (or their secure CI/CD environment). For applications that handle sensitive user data or perform critical financial or operational functions, implementing code signing for OTA updates should be considered a mandatory security practice. It significantly enhances the defense-in-depth posture of the application. However, it's also important to acknowledge that this added security comes with an increase in setup complexity and the ongoing responsibility of securely managing the signing keys.
Background Bridge Notes
For Native Developers (Android/iOS): OTA updates are a distinct concept from the process of submitting new versions of your app binary to the app stores. OTA updates exclusively affect the JavaScript and asset layers of your application. This is incredibly powerful for deploying quick fixes or UI tweaks rapidly, but it does not replace the need for a full native update when native code itself changes (e.g., new SDK features, bug fixes in native modules). The concept of runtimeVersion is paramount to grasp, as it governs the compatibility between the native binary and the OTA JavaScript bundle. Code signing for OTA updates is an additional security layer specifically for these dynamic updates, complementing the standard signing of the app binary.
For Web Developers (React/Angular): OTA updates can be thought of as a more robust and managed version of deploying new frontend code to a web application. If your web app fetches its main JavaScript bundle from a server, updating that bundle on the server is somewhat analogous to publishing an OTA update. However, expo-updates introduces several layers of sophistication not typically found in simple web deployments. This includes client-side logic for actively checking for updates, downloading them efficiently (often only changed assets), caching them, and then applying them in a controlled manner. Furthermore, features like runtimeVersion for compatibility checking against the "native shell" (the app binary) and cryptographic code signing for security are significantly more advanced than a typical browser cache refresh or a new JavaScript file being served.
Exercise 16.2: Publishing an EAS Update (Conceptual/Instructions)
This exercise focuses on understanding the conceptual steps involved in publishing an Over-the-Air (OTA) update using EAS Update.
Conceptual Steps & Instructions:
Prerequisites Check:
Ensure your project is set up with EAS CLI and you are logged in (eas login, eas whoami).
Verify that expo-updates is installed in your project (expo install expo-updates).
Confirm your project has been configured for EAS Update by running eas update:configure. This step ensures that app.json or app.config.js contains the necessary updates.url pointing to your project on EAS.
Ensure you have a build of your app (created with EAS Build or locally) that includes expo-updates and is configured with a specific channel (e.g., in eas.json) and runtimeVersion (in app.json/app.config.js). This build should be installed on a test device or simulator.
Make Code Changes:
Modify your JavaScript code or assets. For example, change some text in a component, update an image, or fix a JavaScript-related bug.
Important: Do not make any changes that would require a new native build (e.g., installing a new native module, changing native code, upgrading React Native/Expo SDK version that has native changes). If such changes are made, you would need to increment the runtimeVersion and create a new binary build, not just an OTA update.
Commit Changes (Good Practice):
Commit your code changes to your Git repository with a descriptive message. While not strictly required for all eas update scenarios, it's good practice for tracking and reproducibility.
Publish the Update using EAS CLI:
Open your terminal in the project root.
Use the eas update command. You'll typically specify the branch you want to publish to. If your channels are mapped to branches (default is same name), publishing to a branch makes the update available to builds on the linked channel(s).
Example command:
Bash
eas update --branch production --message "Updated welcome message text and fixed a typo on home screen"
Replace "production" with your target branch name (e.g., staging, development, or a feature-specific branch). The --message flag adds a descriptive note to the update, visible in the EAS Dashboard.
If your project uses code signing for updates, you will need to provide the path to your private key:
Bash
eas update --branch production --private-key-path path/to/your/private-key.pem --message "Securely signed update with new assets"


Monitor the Update Process:
EAS CLI will output progress as it bundles your JavaScript and assets, and then uploads them to the EAS Update service.
Once successfully published, the update will be available on the specified branch.
Test the Update on a Device/Simulator:
Open the app that was previously installed (from step 1, which is configured for the correct channel and runtime version).
How the update is applied depends on your expo-updates configuration in app.json/app.config.js:
If checkAutomatically is ON_LOAD (default): Close and reopen the app. The update should be downloaded in the background. You might need to close and reopen it a second time for the new update to be applied and visible.50
If you have implemented manual update checking logic (using Updates.checkForUpdateAsync(), Updates.fetchUpdateAsync(), and Updates.reloadAsync()): Trigger your manual update check.
Verify that your code changes are reflected in the app.
Verify in EAS Dashboard (Optional but Recommended):
Log in to your Expo account at expo.dev.
Navigate to your project, then to the "Updates" section.
You should see your newly published update listed under the respective branch, along with its message, timestamp, and other details. You can also see which channels are pointing to which branches.
Key Considerations for Learners:
Runtime Version: Emphasize that the runtimeVersion of the published update must match the runtimeVersion of the app build you are testing on. If they don't match, the update will not be applied.
Channels and Branches: Explain the relationship: builds are on channels, updates are on branches, and channels are linked to branches.
Native vs. JS Changes: Reinforce what can and cannot be updated via OTA.
Testing: Always test OTA updates thoroughly on a staging or development channel before publishing to a production channel.
This conceptual exercise provides the foundational knowledge for understanding how to deploy OTA updates, a critical skill for maintaining and iterating on React Native applications efficiently.
Section 9: Managing Secrets with EAS
Securely managing secrets—such as API keys, authentication tokens, database credentials, and other sensitive configuration values—is paramount in application development. Improper handling can lead to security vulnerabilities, including exposure in public repositories, reverse engineering from app binaries, or unauthorized access to backend services and third-party APIs.34
Expo Application Services (EAS) provides a robust system for managing these secrets. It allows developers to store sensitive information securely on EAS servers and make it available as environment variables during the EAS Build process or to EAS Workflows.34 Secrets can be scoped either account-wide (available to all projects under an account) or project-specific (available only to a particular project).62
Official Documentation Link Box
Environment variables and secrets in EAS: [https://docs.expo.dev/eas/environment-variables/](
Works cited
Expo Application Services - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas/
How EAS Update works - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas-update/how-it-works/
Expo - Bolt.new, accessed May 13, 2025, https://support.bolt.new/integrations/expo
How to Create an Expo Account & Install EAS CLI Globally (Step-by-Step Guide) - YouTube, accessed May 13, 2025, https://www.youtube.com/watch?v=k818GucPXGM
Get started with EAS Workflows - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas/workflows/get-started/
Create a development build - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/develop/development-builds/create-a-build/
Complete Guide to React Native Deployment for iOS and Android - Bugsee, accessed May 13, 2025, https://bugsee.com/blog/https-bugsee-com-blog-complete-guide-to-react-native-deployment-for-ios-and-android/
Develop an app with Expo - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/workflow/overview/
Confused about EAS : r/expo - Reddit, accessed May 13, 2025, https://www.reddit.com/r/expo/comments/1655cix/confused_about_eas/
Introducing EAS - DEV Community, accessed May 13, 2025, https://dev.to/expo/introducing-eas-c63
Classic Build service no longer supported | by Brent Vatne | Exposition, accessed May 13, 2025, https://blog.expo.dev/classic-build-service-no-longer-supported-73c82b500f56
Submit to app stores - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/deploy/submit-to-app-stores/
Submit an iOS App to the Apple App Store and TestFlight using EAS | egghead.io, accessed May 13, 2025, https://egghead.io/lessons/react-native-submit-an-ios-app-to-the-apple-app-store-and-testflight-using-eas
Async Office Hours: How to quickly publish to the App Store & Play Store with EAS Submit, accessed May 13, 2025, https://www.youtube.com/watch?v=-KZjr576tuE
React Native OTA Updates with Expo EAS: Step-by-Step Guide & Best Practices, accessed May 13, 2025, https://dev.to/nour_abdou/react-native-ota-updates-with-expo-eas-step-by-step-guide-best-practices-1idk
Web and Mobile Dev with Expo and Express - Keyhole Software, accessed May 13, 2025, https://keyholesoftware.com/expo-and-express-mobile-web-development/
Build your project for app stores - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/deploy/build-project/
EAS Submit - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/submit/introduction/
EAS Update - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas-update/introduction/
When running expo build:android, I get 'expo build:android has been discontinued (January 4, 2023)' Error - Stack Overflow, accessed May 13, 2025, https://stackoverflow.com/questions/75183247/when-running-expo-buildandroid-i-get-expo-buildandroid-has-been-discontinued
Apps created with "expo build:ios" are rejected from submission with an app thinning error · Issue #4253 - GitHub, accessed May 13, 2025, https://github.com/expo/expo-cli/issues/4253
Expo Go & Development Builds: Which should you use? - YouTube, accessed May 13, 2025, https://www.youtube.com/watch?v=FdjczjkwQKE
How to configure a development build | EAS Tutorial - YouTube, accessed May 13, 2025, https://www.youtube.com/watch?v=uQCE9zl3dXU
Configure EAS Build with eas.json - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/build/eas-json/
Configuration with eas.json - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas/json/
EAS Build & Workflows: introducing M4 Pro - Expo Changelog, accessed May 13, 2025, https://expo.dev/changelog/eas-build-workflows-m4-pro
FAQ - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/faq/
Expo CLI - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/more/expo-cli/
Why Expo is a great fit for new and existing React Native apps, accessed May 13, 2025, https://expo.dev/blog/why-expo-is-a-great-fit-for-new-and-existing-react-native-apps
Building Mobile Apps with Expo and Replit, accessed May 13, 2025, https://docs.replit.com/tutorials/expo-on-replit
Automating Expo Android Submission with EAS Using GitHub Actions: A Step-by-Step Guide. - DEV Community, accessed May 13, 2025, https://dev.to/jocanola/automating-expo-android-submission-with-eas-using-github-actions-a-step-by-step-guide-36b3
expo/docs/pages/build/eas-json.mdx at main - GitHub, accessed May 13, 2025, https://github.com/expo/expo/blob/main/docs/pages/build/eas-json.mdx
eas.json | Open Source at Infinite Red, accessed May 13, 2025, https://docs.infinite.red/ignite-cli/boilerplate/eas.json/
Solution for Using Environment Variables in Expo with EAS Build - Reddit, accessed May 13, 2025, https://www.reddit.com/r/expo/comments/1feh09e/solution_for_using_environment_variables_in_expo/
Using EAS Update - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/build/updates/
Build server infrastructure - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/build-reference/infrastructure/
expo/docs/pages/eas-update/deployment-patterns.mdx at main - GitHub, accessed May 13, 2025, https://github.com/expo/expo/blob/main/docs/pages/eas-update/deployment-patterns.mdx
Create a production build for Android - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/tutorial/eas/android-production-build/
Create a production build locally - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/guides/local-app-production/
My First Expo App: 1 month in - Reddit, accessed May 13, 2025, https://www.reddit.com/r/expo/comments/1i88nyu/my_first_expo_app_1_month_in/
App Store Connect Guide: How to release apps to the App Store, test with TestFlight, and more - Bitrise Blog, accessed May 13, 2025, https://bitrise.io/blog/post/app-store-connect-guide-how-to-release-apps-to-the-app-store-test-with-testflight-and-more
How to Publish an iOS App on the App Store in 9 Steps - Orangesoft, accessed May 13, 2025, https://orangesoft.co/blog/how-to-submit-an-ios-app-to-the-app-store
Create and set up your app - Play Console Help - Google Help, accessed May 13, 2025, https://support.google.com/googleplay/android-developer/answer/9859152?hl=en
Step-by-step instructions on how to publish an app on Google Play Store - ASOdesk, accessed May 13, 2025, https://asodesk.com/blog/how-to-publish-an-app-on-google-play-store/
android - Google play console submit permissions error - Stack Overflow, accessed May 13, 2025, https://stackoverflow.com/questions/79383234/google-play-console-submit-permissions-error/79387506
Deploying to App Store from Windows Using Expo EAS : r/reactnative - Reddit, accessed May 13, 2025, https://www.reddit.com/r/reactnative/comments/1jkavc0/deploying_to_app_store_from_windows_using_expo_eas/
EAS Submit reads too much information from local project folder expo config file · Issue #2911 - GitHub, accessed May 13, 2025, https://github.com/expo/eas-cli/issues/2911
EAS Submit issues? : r/expo - Reddit, accessed May 13, 2025, https://www.reddit.com/r/expo/comments/1j4cmed/eas_submit_issues/
eas submit stuck on waiting for an available submitter · Issue #2758 · expo/eas-cli - GitHub, accessed May 13, 2025, https://github.com/expo/eas-cli/issues/2758
Send over-the-air updates - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/deploy/send-over-the-air-updates/
Updates - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/versions/latest/sdk/updates/
End-to-end code signing with EAS Update - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas-update/code-signing/
app.json / app.config.js - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/versions/latest/config/app/#updates
How Does EAS Update Work for a Public App? : r/expo - Reddit, accessed May 13, 2025, https://www.reddit.com/r/expo/comments/1jdkolz/how_does_eas_update_work_for_a_public_app/
How to Implement OTA Updates in React Native: Auto-Restart with Expo - Cerulean Studio, accessed May 13, 2025, https://blog.cerulean.studio/ota-updates-in-react-native-auto-restart-with-expo
app.json / app.config.js - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/versions/latest/config/app/
eas update tutorial | Expo | React Native - YouTube, accessed May 13, 2025, https://www.youtube.com/watch?v=HYh3UqxYzpA
@expo/use-updates - npm, accessed May 13, 2025, https://www.npmjs.com/package/@expo/use-updates
Rollbacks - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas-update/rollbacks/
expo/docs/pages/eas-update/error-recovery.mdx at main - GitHub, accessed May 13, 2025, https://github.com/expo/expo/blob/main/docs/pages/eas-update/error-recovery.mdx
Override update configuration at runtime - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas-update/override/
Environment variables in EAS - Expo Documentation, accessed May 13, 2025, https://docs.expo.dev/eas/environment-variables/
