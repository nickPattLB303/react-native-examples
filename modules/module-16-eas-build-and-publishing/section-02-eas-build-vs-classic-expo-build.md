## Section 2: EAS Build vs. Classic Expo Build

This section delves into the evolution of Expo's build services, comparing the modern EAS Build with the legacy "classic" Expo build system (commands like `expo build:ios` and `expo build:android`). Understanding this transition is key to appreciating the power and flexibility that EAS Build brings to your development workflow, especially when dealing with custom native code and requiring more control over the build environment.

### Understanding Classic `expo build`

The classic `expo build` service was Expo's original solution for creating standalone app binaries. For many years, it served developers by providing a way to build `ipa` and `apk`/`aab` files without needing to configure Xcode or Android Studio locally. It worked well for projects that stayed within the confines of the Expo Go environment, meaning they primarily used JavaScript and the pre-included native modules available in the Expo SDK.

**Key Characteristics of Classic `expo build`:**

- **Managed Workflow:** It offered a highly managed, somewhat opaque build process. Developers had limited control over the build environment or native dependencies beyond what was specified in their `app.json`.
- **Prebuilt Native Code:** It relied on a prebuilt set of native modules. If your app didn't need custom native code, classic build was often sufficient.
- **Simplicity for Standard Expo Apps:** For projects that fit its model, it was straightforward to use.

### Limitations of Classic `expo build`

As the React Native ecosystem grew and developers sought more customization, the limitations of classic `expo build` became more apparent:

- **No Custom Native Code:** This was the most significant limitation. If your project required a specific native module not included in the Expo SDK, or if you needed to write your own native Swift/Objective-C or Kotlin/Java code, classic `expo build` could not be used directly. Developers had to `eject` from the managed workflow to a bare workflow, losing some of Expo's conveniences.
- **Limited Control:** Developers had minimal control over native dependencies, build settings, or the versions of native tools used in the build process.
- **Slower Updates for Native Aspects:** If a new version of a native library or a critical native patch was needed, developers were often reliant on Expo to update their build servers.
- **Opaque Build Process:** Debugging build failures could be challenging due to the lack of visibility into the build steps.

> [!IMPORTANT]
> The classic `expo build:[android]` and `expo build:[ios]` services are now deprecated and will be fully sunset. All new projects and existing projects should migrate to EAS Build for a more robust, flexible, and future-proof build solution. See the [official Expo documentation](https://docs.expo.dev/build-reference/migrating/) for migration guides.

### Introducing EAS Build: The Successor

EAS Build was created to address the limitations of the classic system and provide a first-class build experience for all Expo projects, including those with custom native code (often referred to as the "bare workflow" in the past, though EAS makes this distinction less rigid).

**Key Improvements with EAS Build:**

- **Full Support for Custom Native Code:** You can include any third-party React Native library or write your own native code, and EAS Build will compile it.
- **Granular Control:** Through `eas.json` build profiles, you have significant control over the build environment, dependencies (like specific Node.js or CocoaPods versions), build commands, and more.
- **Transparent Build Process:** EAS Build provides more detailed logs and insights into the build steps, making it easier to troubleshoot issues.
- **Faster, More Reliable Builds:** Optimized infrastructure and more configurable environments often lead to faster and more reliable builds.
- **Integration with EAS Services:** Seamlessly works with EAS Submit for app store distribution and EAS Update for over-the-air updates.
- **Reproducible Builds:** Configuration-as-code via `eas.json` helps ensure that builds are reproducible.

### Comparison: EAS Build vs. Classic `expo build`

The following table highlights the key differences between EAS Build and the classic `expo build` service:

| Feature                 | Classic `expo build`                   | EAS Build                                            |
| ----------------------- | -------------------------------------- | ---------------------------------------------------- |
| **Custom Native Code**  | Not supported (required eject)         | Fully supported                                      |
| **Build Configuration** | Limited (via `app.json`)               | Extensive (via `eas.json` profiles)                  |
| **Native Dependencies** | Managed by Expo, limited customization | Full control, customizable versions                  |
| **Build Environment**   | Opaque, managed by Expo                | Configurable (Node, Yarn, CocoaPods versions)        |
| **Build Logs**          | Basic                                  | Detailed and transparent                             |
| **Workflow Support**    | Primarily Managed Expo workflow        | All Expo projects (Managed, Bare, Custom Dev Client) |
| **Service Status**      | Deprecated / Sunset                    | Actively Developed, Recommended                      |
| **Cost Model**          | Included with Expo (free tier limits)  | Free tier + Usage-based paid plans                   |

This table summarizes the evolution. EAS Build is designed to be a more powerful, flexible, and developer-friendly solution that caters to the needs of modern React Native development, whether you're building a simple app or a complex application with extensive native integrations.

> 🤖 **(Android Developers):** Think of classic `expo build` as a black-box Gradle build where you had little access to the `build.gradle` file. EAS Build gives you back that control, allowing you to specify versions and configurations much like you would in a native Android project, but managed in the cloud.

> 🍏 **(iOS Developers):** For those familiar with Xcode build schemes and manual `xcodebuild` commands, classic `expo build` abstracted all of that away. EAS Build, through profiles, reintroduces a level of customization akin to managing different build configurations, but without needing to directly manage Xcode on a CI server.

By moving to EAS Build, you gain the flexibility to incorporate any native module or custom code your project requires, aligning your Expo development experience more closely with the broader React Native ecosystem, while still benefiting from Expo's managed services and cloud infrastructure.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Migrating from classic builds to EAS Build](https://docs.expo.dev/build-reference/migrating/)
> - [Expo Docs: Why EAS Build?](https://docs.expo.dev/build/introduction/#why-eas-build)
> - [Expo Docs: Differences between EAS Build and `expo build`](https://docs.expo.dev/build-reference/differences/)

Next, we will guide you through setting up the EAS CLI, the command-line tool you'll use to interact with all EAS services, including EAS Build.

---

_Next: [Section 3: Setting up EAS CLI](./section-03-setting-up-eas-cli.md)_
