# Module 3: Setting up your React Native environment with Expo

Setting up a development environment is the foundation of any successful React Native journey. This module introduces you to Expo, the powerful platform that simplifies React Native development, and guides you through creating a complete development environment. By the end of this module, you'll have a fully functional setup that allows you to build, test, and deploy React Native applications efficiently across multiple platforms.

## Target audience adaptation

> 🍏 **iOS Developers:**
>
> **Comparison:** Unlike Xcode's integrated development environment where everything is bundled together, React Native with Expo separates the development tools (Node.js, Expo CLI) from the runtime environment (iOS Simulator, Expo Go). This modular approach offers more flexibility but requires understanding multiple components.
>
> **Key Takeaway:** You'll work primarily with command-line tools and external editors rather than a single IDE like Xcode, but you can still use iOS Simulator for testing.
>
> **Source:** [Xcode Overview](https://developer.apple.com/xcode/)

> 🤖 **Android Developers:**
>
> **Comparison:** Similar to Android Studio's SDK Manager and Gradle build system, Expo handles dependency management and build processes. However, instead of managing multiple SDK versions and build variants manually, Expo abstracts much of this complexity while still providing access to native features through Android emulators and physical devices.
>
> **Key Takeaway:** Expo simplifies the Android development workflow you're familiar with while maintaining the power of native development.
>
> **Source:** [Android Studio Overview](https://developer.android.com/studio/intro)

> 🌐 **Web Developers:**
>
> **Comparison:** React Native development with Expo parallels modern web development workflows. Like using Create React App or Vite for web projects, `create-expo-app` scaffolds your project structure. The development server, hot reloading, and package management work similarly to familiar web tools.
>
> **Key Takeaway:** The development experience will feel familiar, but you'll be targeting mobile platforms instead of browsers.
>
> **Source:** [Create React App Documentation](https://create-react-app.dev/)

## Learning objectives

- Set up a complete React Native development environment using Expo on Windows, macOS, or Linux
- Install and configure all necessary prerequisites for cross-platform React Native development
- Create your first Expo application using the latest tools and best practices
- Understand the differences between Expo CLI commands and traditional npm/yarn workflows
- Choose and configure your preferred development approach: iOS Simulator, Android Emulator, or Expo Go
- Navigate and understand the Expo project structure
- Execute essential Expo CLI commands for development workflows
- Identify and resolve common setup and configuration issues across different platforms
- Utilize Expo Snack for rapid prototyping and learning

## Prerequisites

- Basic familiarity with command-line interfaces (Terminal on macOS/Linux, Command Prompt or PowerShell on Windows)
- Understanding of package managers (npm or yarn) from web development experience
- Completion of Module 0: Course Introduction
- Computer running Windows 10+, macOS 10.15+, or recent Linux distribution

> [!IMPORTANT]
> This course supports Windows, macOS, and Linux development. You can choose between three development approaches: iOS Simulator (macOS only), Android Emulator (all platforms), or Expo Go on physical devices (all platforms). Each approach has its benefits and we'll help you choose the best option for your situation.

## Module sections

1. [Introduction to Expo and Expo Go](./section-01-introduction-to-expo-and-expo-go.md)
2. [Installing prerequisites](./section-02-installing-prerequisites.md)
3. [Creating your first Expo app](./section-03-creating-your-first-expo-app.md)
4. [Understanding npx expo vs npm/yarn](./section-04-understanding-npx-expo-vs-npm-yarn.md)
5. [Running on simulators and emulators](./section-05-running-on-simulators-emulators.md)
6. [Running on Expo Go](./section-06-running-on-expo-go.md)
7. [Expo project structure](./section-07-expo-project-structure.md)
8. [Essential Expo CLI commands](./section-08-essential-expo-cli-commands.md)
9. [Troubleshooting common setup issues](./section-09-troubleshooting-common-setup-issues.md)
10. [Expo Snack playground](./section-10-expo-snack-playground.md)

## Module challenge

**[Environment Setup Verification Challenge](https://forms.microsoft.com/r/MODULE3CHALLENGE)** - Comprehensive checklist and knowledge verification to ensure your development environment is properly configured and functional.

## Module summary

This module established your React Native development foundation using Expo across Windows, macOS, and Linux platforms. You've learned to install and configure essential prerequisites, create new projects using modern Expo tools, and understand the relationship between Expo CLI and traditional Node.js package managers. You've also gained hands-on experience with your chosen development approach—whether using simulators, emulators, or Expo Go on physical devices.

The troubleshooting techniques and common issue resolutions you've learned will serve you throughout your React Native journey. Additionally, your introduction to Expo Snack provides a valuable tool for rapid experimentation and learning without local setup requirements.

With your environment properly configured, you're now ready to dive deep into React Native development fundamentals in the upcoming modules.

## Additional resources

- [Expo Documentation - Getting Started](https://docs.expo.dev/get-started/installation/)
- [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup)
- [Node.js Best Practices for Developers](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Cross-Platform Development with Expo](https://docs.expo.dev/workflow/already-used-react-native/)
- [Expo Community Discord](https://discord.gg/expo) for real-time help and discussions
