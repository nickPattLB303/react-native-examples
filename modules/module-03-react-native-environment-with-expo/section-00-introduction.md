# Module 3: Setting Up Your React Native Environment with Expo

![Abstract graphic related to environment setup](./assets/images/module-3/module-banner.png)
_Setting up the foundation for your React Native development journey with Expo._

Welcome to Module 3! This module is your starting point for hands-on React Native development. We'll guide you through setting up a robust development environment using Expo, a powerful platform that simplifies building and iterating on React Native applications. By the end of this module, you'll have a working local setup, understand the core tools, and be ready to start building your first components.

## Target Audience Adaptation

> 🌐 **(Web Developers):**
>
> **Comparison:** If you've set up Node.js web applications before, this process will feel familiar with package managers and command-line tools. Expo abstracts away the complex native build configurations you'd otherwise need to manage with vanilla React Native.
>
> **Key Takeaway:** Expo eliminates the need to install and configure native SDKs directly, saving significant setup time.
>
> **Source:** [React Native Environment Setup - CLI](https://reactnative.dev/docs/environment-setup)

> 📲 **(Native Developers):**
>
> **Comparison:** While native development requires Xcode (iOS) or Android Studio with extensive configuration, Expo provides a streamlined alternative. Instead of managing build settings, provisioning profiles, and simulator configurations manually, Expo handles these complexities behind the scenes.
>
> **Key Takeaway:** Expo offers a significantly faster development cycle for prototyping and initial development compared to traditional native workflows.
>
> **Source:** [Expo vs. Native Development](https://docs.expo.dev/workflow/already-used-react-native/)
>
> **Example:** Instead of configuring CocoaPods dependencies or Gradle files manually, Expo manages native dependencies through simple JavaScript commands.

## Learning Objectives

By the end of this module, you will be able to:

- Describe the role of Expo and Expo Go in React Native development.
- Install all necessary prerequisite software (Node.js, npm/yarn, Xcode Command Line Tools).
- Create a new React Native project using `create-expo-app`.
- Differentiate between using `npx expo` and `npm`/`yarn` for project tasks.
- Launch and run your Expo application on the iOS Simulator.
- Launch and run your Expo application using the Expo Go app on a physical device (optional).
- Identify key files and directories within an Expo project structure.
- Execute essential Expo CLI commands for development (`start`, `install`, `run:ios`).
- Apply basic troubleshooting techniques for common environment setup issues.

## Prerequisites

- Completion of [Module 0: Course Introduction](../module-00-course-introduction/section-00-introduction.md) (Understanding course structure and tools).
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

[**Challenge 3: Environment Setup Verification (Microsoft Forms)**](https://forms.office.com/Pages/ResponsePage.aspx?id=example-challenge-3-form-id)

This challenge involves verifying your environment setup through a checklist in Microsoft Forms. You'll confirm that your environment is correctly configured and essential commands are working properly.

## Module Summary

This module equipped you with the foundational knowledge and practical skills to set up a complete React Native development environment using Expo. You learned about the roles of Expo and Expo Go, installed all necessary prerequisites including Node.js, npm/yarn, Watchman, and Xcode Command Line Tools. You successfully created your first Expo application, `SpeedyMedsPrototype`, using `create-expo-app` and explored the differences between `npx expo` commands and traditional `npm`/`yarn` scripts.

Key takeaways include understanding how to run your application on both the iOS Simulator and optionally on a physical device via Expo Go, navigating the Expo project structure, and utilizing essential Expo CLI commands like `start`, `install`, and `run:ios`. Finally, you were introduced to common troubleshooting techniques to address setup issues. With this environment in place, you are now fully prepared to dive into building React Native applications.

## Additional Resources

- [Awesome Expo: A curated list of awesome Expo tools, resources and examples](https://github.com/expo/awesome-expo)
- [Expo Blog](https://blog.expo.dev/) (For latest news and updates from the Expo team)
- [Setting up Continuous Integration for Expo](https://docs.expo.dev/guides/setting-up-continuous-integration/)
