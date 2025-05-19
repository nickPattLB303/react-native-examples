# Module 3: Setting Up Your React Native Environment with Expo

![Abstract graphic related to environment setup](./assets/images/module-3/module-banner.png)
_Setting up the foundation for your React Native development journey with Expo._

Welcome to Module 3! This module is your starting point for hands-on React Native development. We'll guide you through setting up a robust development environment using Expo, a powerful platform that simplifies building and iterating on React Native applications. By the end of this module, you'll have a working local setup, understand the core tools, and be ready to start building your first components.

## Module Goal

The primary goal of this module is to guide you through the process of successfully setting up a local development environment tailored for React Native development using Expo. By the end of this module, you will understand the core tools and workflows within the Expo ecosystem and be able to run your first React Native application on an iOS simulator and, optionally, on a physical device using Expo Go.

## Target Audience Adaptation

> 🌐 **(Web Developers):**
>
> **Comparison:** If you've set up Node.js web applications before, this process will feel familiar with package managers and command-line tools. Expo abstracts away the complex native build configurations you'd otherwise need to manage with vanilla React Native. Concepts related to native mobile development, simulators/emulators (Xcode), and the specifics of React Native's component system and styling (vs. HTML/CSS) will be emphasized. Expo's tooling aims to make this transition smoother.
>
> **Key Takeaway:** Expo eliminates the need to install and configure native SDKs directly, saving significant setup time. You're moving from targeting the browser DOM to controlling native iOS/Android UI elements via JavaScript.
>
> **Source:** [React Native Environment Setup - CLI](https://reactnative.dev/docs/environment-setup), [React Native: Thoughts from a web developer - Mantel](https://mantelgroup.com.au/react-native-thoughts-from-a-web-developer/)

> 📲 **(Native Developers):**
>
> **Comparison:** While native development requires Xcode (iOS) or Android Studio with extensive configuration, Expo provides a streamlined alternative. Instead of managing build settings, provisioning profiles, and simulator configurations manually, Expo handles these complexities behind the scenes. Concepts like JavaScript runtimes (Node.js), package managers (npm), and bundlers (Metro) might be new. This module will relate Expo's abstractions (like the Expo CLI managing native builds) back to familiar tools like Android Studio or Xcode.
>
> **Key Takeaway:** Expo offers a significantly faster development cycle for prototyping and initial development compared to traditional native workflows. Think of Expo CLI as adding a simplifying layer on top of the familiar Xcode/Android Studio build processes for many common tasks.
>
> **Source:** [Expo vs. Native Development](https://docs.expo.dev/workflow/already-used-react-native/), [From Jetpack Compose to React Native: An Android Developer's Perspective - Atomic Robot](https://atomicrobot.com/blog/compose-to-react-native/)
>
> **Example:** Instead of configuring CocoaPods dependencies or Gradle files manually, Expo manages native dependencies through simple JavaScript commands.

> 🛣️ **(All Learners):** This module serves as a critical foundation for all learning paths.
>
> 🧑‍🏫 **(Instructor-Led):** Active participation in setup sessions is encouraged. Use the live coding demonstrations as an opportunity to follow along and ask clarifying questions regarding environment configuration or Expo concepts.
>
> 🧗‍♀️ **(Self-Led):** Proceed through the steps sequentially. Utilize the provided links to official documentation for deeper understanding. Do not hesitate to request instructor support via Webex chat or huddles if installation or configuration issues arise.
>
> 🔁 **(Asynchronous):** This module is fundamental, regardless of the specific topics targeted later. Ensure the development environment is correctly set up by carefully following these instructions. If specific setup errors are encountered later, the Troubleshooting section can be referenced directly.

## Learning Objectives

By the end of this module, you will be able to:

- Install and configure all necessary prerequisite software (Node.js, Watchman, Xcode, iOS Simulator) on a macOS system.
- Articulate the role of the Expo Command Line Interface (CLI) and explain its advantages compared to the standard React Native CLI.
- Initialize a new React Native project using the Expo CLI command `npx create-expo-app@latest`.
- Describe the purpose and contents of key files and directories within a standard Expo project structure.
- Start the Expo development server using `npx expo start` and successfully launch the application on an iOS Simulator.
- Clearly differentiate between the various Expo development environments – Expo Go, Development Builds, and Production Builds – understanding their specific use cases, capabilities, and limitations.
- Identify common setup and runtime issues and apply appropriate troubleshooting steps to resolve them.
- Effectively utilize Expo Snack, the web-based playground, for completing course exercises and performing basic code experimentation (where applicable).
- Differentiate between using `npx expo` and `npm`/`yarn` for project tasks.
- Launch and run your Expo application using the Expo Go app on a physical device (optional).
- Execute essential Expo CLI commands for development (`start`, `install`, `run:ios`).

## Prerequisites

- Completion of [Module 2: React Native Architecture Explained](../module-02-react-native-architecture-explained/section-00-introduction.md).
- Basic familiarity with using the command line/terminal.
- Administrator privileges on your macOS machine for software installation.

## Module Sections

- [Section 1: Introduction to Expo and Expo Go](./section-01-introduction-to-expo-and-expo-go.md)
- [Section 2: Installing Prerequisites](./section-02-installing-prerequisites.md)
- [Section 3: Creating Your First Expo App (`npx create-expo-app@latest`)](./section-03-creating-your-first-expo-app.md)
- [Section 4: Understanding `npx expo` vs. `npm`/`yarn`](./section-04-understanding-npx-expo-vs-npm-yarn.md)
- [Section 5: Running on the iOS Simulator](./section-05-running-on-the-ios-simulator.md)
- [Section 6: Running on Expo Go (Physical Device - Optional Mention)](./section-06-running-on-expo-go.md)
- [Section 7: Expo Project Structure (File/Folder Overview)](./section-07-expo-project-structure.md)
- [Section 8: Essential Expo CLI Commands (`start`, `install`, `run:ios`)](./section-08-essential-expo-cli-commands.md)
- [Section 9: Troubleshooting Common Setup Issues](./section-09-troubleshooting-common-setup-issues.md)

## Module Challenge

**(https://forms.office.com/Pages/ResponsePage.aspx?id=example-challenge-3-form-id)**

This challenge involves verifying your environment setup through a checklist in Microsoft Forms. You'll confirm that your environment is correctly configured and essential commands are working properly.

## Module Summary

This module provided a comprehensive guide to establishing a local development environment using the Expo framework on macOS, with a focus on the iOS Simulator. We covered understanding the Expo ecosystem (Framework, SDK, EAS), the advantages of Expo CLI including Continuous Native Generation (CNG), and walked through installing essential tools like Node.js (LTS via nvm), Watchman, and Xcode. You created your first Expo project (`SpeedyMedsPrototype`) using `npx create-expo-app@latest` and explored its structure, focusing on `app/` for Expo Router and `app.json`/`app.config.js` for configuration. You learned to run your app on the iOS Simulator via `npx expo start` and `npx expo run:ios`, understanding the client-server model.

A key distinction was made between Expo Go (for quick starts) and Development Builds (for custom native needs). We also covered essential Expo CLI commands (`start`, `run:ios`/`android`, `install`, `prebuild`, `doctor`), troubleshooting techniques, and the role of Expo Snack.

**Key Takeaways from this module include:**

- A correctly configured environment is foundational for efficient React Native development.
- Expo significantly streamlines setup and iteration by managing native complexities.
- Understanding the difference between Expo Go and Development Builds is crucial for choosing the right workflow.
- Configuration files like `app.config.js` offer powerful control.
- Systematic troubleshooting is a vital skill for mobile developers.
- `npx expo install` is essential for adding compatible dependencies.

With this environment in place, you are now fully prepared to dive into building React Native applications.

## Additional Resources

- [Awesome Expo: A curated list of awesome Expo tools, resources and examples](https://github.com/expo/awesome-expo)
- [Expo Blog](https://blog.expo.dev/) (For latest news and updates from the Expo team)
- [Setting up Continuous Integration for Expo](https://docs.expo.dev/guides/setting-up-continuous-integration/)
- [Expo Documentation - Get Started](https://docs.expo.dev/get-started/create-a-new-app/)
- [Expo CLI Reference](https://docs.expo.dev/more/expo-cli/)
- [Expo Configuration (`app.json`/`app.config.js`)](https://docs.expo.dev/versions/latest/config/app/)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo Go](https://docs.expo.dev/get-started/expo-go/)
- [Expo Snack](https://snack.expo.dev/)
- [Expo Troubleshooting](https://docs.expo.dev/troubleshooting/errors/)
- [Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/)
- [React Native Docs - Setting up the development environment](https://reactnative.dev/docs/environment-setup)
