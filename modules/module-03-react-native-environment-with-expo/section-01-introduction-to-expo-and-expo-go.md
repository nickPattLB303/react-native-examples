## Section 1: Introduction to Expo and Expo Go

This section introduces Expo, a key platform in the React Native ecosystem that we'll use throughout this course, and its companion development tool, Expo Go.

### What is Expo?

Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React. Think of it as a set of tools, libraries, and services built _around_ React Native that significantly simplifies the development experience, especially for those new to mobile development or those coming from a web background.

Key benefits of using Expo include:

- **Simplified Setup:** Expo handles much of the complex configuration required for native mobile development. You often don't need to directly use Xcode or Android Studio during development.
- **Expo SDK:** A curated collection of native modules (accessing device features like camera, location, sensors) that are pre-built and readily available in your JavaScript code. This avoids the need to manually link native libraries early on.
- **Expo Go App:** A development client app that lets you instantly run and test your project on physical devices or simulators without compiling native code yourself.
- **Over-the-Air (OTA) Updates:** Easily push updates to your app's JavaScript bundle without needing a full App Store resubmission (using EAS Update).
- **Build Service (EAS Build):** A cloud service that compiles your native app binaries (`.ipa` for iOS, `.apk`/`.aab` for Android) when you're ready to distribute them.
- **Development Workflow:** Tools and services that streamline common tasks like managing secrets, running development servers, and creating development builds.

> [!IMPORTANT]
> While Expo simplifies many aspects, it's still built on top of React Native. Understanding core React Native concepts (covered in later modules) remains essential. Expo provides powerful abstractions, but knowing what's happening underneath is crucial for advanced development and troubleshooting.

### What is Expo Go?

Expo Go is a free mobile client app available on the App Store (iOS) and Google Play Store (Android). It allows you to open and run Expo projects instantly during development without needing to build the native code yourself via Xcode or Android Studio.

Here's how it works:

1.  You run your Expo project on your computer using the Expo CLI (`npx expo start`).
2.  The CLI starts a development server and shows a QR code.
3.  You open the Expo Go app on your physical device (or use it within the iOS Simulator).
4.  You scan the QR code (or enter the URL) using Expo Go.
5.  Expo Go downloads your app's JavaScript bundle from the development server and runs it within its pre-built native environment.

This provides a very fast feedback loop: make a change in your code, save it, and see the update almost instantly in Expo Go.

> [!NOTE]
> Expo Go includes the entire Expo SDK. This means any app running in Expo Go has access to all the Expo SDK APIs by default. However, if your project requires custom native code not included in the Expo SDK, you'll eventually need to create a _development build_ or use EAS Build, which packages your specific native code. We'll cover development builds and EAS Build in Module 16.

> 📚 **Official Documentation:**
>
> - [Expo Docs: What is Expo?](https://docs.expo.dev/introduction/expo/)
> - [Expo Docs: Expo Go](https://docs.expo.dev/get-started/expo-go/)
> - [React Native Docs: Platforms to try - Expo](https://reactnative.dev/docs/0.74/more-resources#platforms-to-try)
