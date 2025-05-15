## Section 8: EAS Update (Over-the-Air Updates)

This section explores EAS Update, a powerful service that allows you to deploy updates to your app's JavaScript bundle and assets directly to your users' devices without requiring them to download a new version from the app store. This is commonly known as an Over-the-Air (OTA) update.

### What are Over-the-Air (OTA) Updates?

Over-the-Air (OTA) updates deliver new JavaScript code and assets (like images and fonts) to your app that is already installed on a user's device. When the app launches, it checks for new updates from a server, and if available, downloads and applies them. This means you can fix bugs, add new JavaScript-based features, or change your app's appearance without going through the full app store review and release process for every minor change.

**What can be updated OTA:**

- JavaScript code (business logic, UI components)
- Assets (images, fonts, sound files, JSON data)
- Styles defined in JavaScript

**What CANNOT be updated OTA:**

- Native code (Java/Kotlin for Android, Swift/Objective-C for iOS)
- Adding new native modules or updating versions of existing native dependencies
- Changes to native configurations (e.g., `Info.plist`, `AndroidManifest.xml` that affect native behavior)
- Upgrading the Expo SDK or React Native version (as these almost always involve native changes)

If you make any of these native-level changes, a new binary build must be created with EAS Build and submitted to the app stores.

**How it works conceptually:**

1.  Your app binary (built with EAS Build) includes the `expo-updates` native module.
2.  When the app starts, `expo-updates` checks with the EAS Update service for any new update published for its specific channel and runtime version.
3.  If an update (a new JS bundle and assets) is found, it's downloaded in the background.
4.  The next time the app is launched (or based on your configuration), it loads this new update.

```mermaid
graph LR;
    A[Developer Publishes Update via EAS CLI] --> B(EAS Update Service);
    C(User's App on Device) -->|1 Checks for Update| B;
    B -->|2 Update Available?| C;
    C -->|3 Downloads Update| B;
    C -- Upon Next Launch --> D[App Reloads with New JS & Assets];

    style A fill:#ccf,stroke:#333,stroke-width:2px;
    style B fill:#f9f,stroke:#333,stroke-width:2px;
    style C fill:#cfc,stroke:#333,stroke-width:2px;
    style D fill:#cfc,stroke:#333,stroke-width:2px;
```

This diagram shows the basic flow of an Over-the-Air update. The developer uses EAS CLI to publish an update to the EAS Update Service. When a user opens their app, the app checks with the EAS Update Service. If a new update is available for the app's specific configuration (like its channel and runtime version), the app downloads it. On the subsequent launch (or as configured), the app reloads, applying the new JavaScript bundle and assets. This allows for rapid iteration and bug fixing directly to users.

### Core Concepts of EAS Update

To effectively use EAS Update, it's important to understand these core concepts:

- **Builds and Updates Layers:** An installed app has two main layers:

  - **Native Layer:** The compiled binary code (Java/Kotlin/Swift/Objective-C) and native assets. This layer only changes when a user installs a new version of the app from an app store.
  - **Update Layer:** Your JavaScript bundle, other assets (images, fonts), and styling. EAS Update allows you to remotely swap this layer.

- **Runtime Version:** This is a **critical** string or policy defined in your project's `app.json` or `app.config.js` (e.g., `expo.runtimeVersion`). It describes the JavaScript-to-native interface contract of a specific app build.

  - **Purpose:** Ensures that an OTA update is only applied to a build if the update's target `runtimeVersion` exactly matches the `runtimeVersion` of the installed app build. This prevents crashes due to incompatibilities between JS code expecting certain native features and a native binary that doesn't have them (or has a different version).
  - **Definition:** Can be a specific string (e.g., `"1.0.0"`, `"exposdk:49.0.0"`) or an object defining a policy (e.g., `{"policy": "sdkVersion"}`, `{"policy": "appVersion"}`, `{"policy": "nativeVersion"}`, `{"policy": "fingerprint"}`). The `fingerprint` policy calculates a hash based on your project's native dependencies, providing a robust way to automatically change the runtime version when native code aspects change.
  - **When to Change:** You **MUST** change the `runtimeVersion` (or ensure your policy correctly changes it) whenever you make any changes to the native code of your app. This includes: upgrading Expo SDK/React Native, adding/removing/updating native dependencies, or modifying native project files (`Info.plist`, `AndroidManifest.xml`, `build.gradle`, Xcode project files) in a way that could alter the API available to JavaScript or the app's native behavior.

- **Channels:** Named streams used to distribute specific sets of updates to specific groups of app builds. You define a channel for a build profile in `eas.json` (e.g., `"channel": "production"`). Apps built for a particular channel will only check for and receive updates published to an update branch linked to that channel.

- **Branches (EAS Update Branches):** Chronological lists of updates. When you publish an update (e.g., `eas update --branch main`), you are adding it to a specific EAS Update branch. Channels are then pointed to these branches. By default, a channel (e.g., `production`) is linked to an EAS Update branch of the same name (`production`).

- **Update Manifest:** A JSON file served by the EAS Update service. It contains metadata about a specific update, including a list of assets (JS bundle, images, fonts), the launch asset (usually the main JS bundle), a unique update ID, creation timestamp, and the target `runtimeVersion`.

- **Assets:** All assets required by the update are uploaded to EAS servers and typically served via a Content Delivery Network (CDN) for efficient global distribution. The `expo-updates` library is intelligent enough to only download assets that have changed since the last update, minimizing data usage.

### Benefits of EAS Update

- **Rapid Bug Fixes:** Quickly deploy fixes for JavaScript-related bugs without waiting for app store review.
- **Faster Feature Rollouts:** Release new features developed purely in JavaScript much faster.
- **A/B Testing & Experimentation:** Deploy different versions of your JS bundle to different user segments (requires more advanced setup).
- **Reduced User Friction:** Users get updates automatically without needing to visit the app store and manually update the app.
- **Improved Development Velocity:** Iterate quickly on the JS parts of your app even after a store release.

### EAS Update and `expo-updates`

EAS Update works in conjunction with the `expo-updates` library, which must be installed in your project. This library is responsible for the client-side logic of checking for, downloading, and applying updates.

- **Installation:** If you initialized your project with a recent version of Expo, `expo-updates` is likely already installed. If not, you can install it with `npx expo install expo-updates`.
- **Configuration in `app.json` / `app.config.js`:** `expo-updates` is configured via the `updates` key in your `app.json` or `app.config.js` file (e.g., `expo.updates`). Key properties include:

  - `url`: The URL of the EAS Update service endpoint for your project (e.g., `https://u.expo.dev/YOUR_PROJECT_ID`). Usually configured automatically by `eas update:configure`.
  - `enabled`: Boolean (default `true`). Set to `false` to disable OTA updates for a build; the app will always use the embedded JS bundle.
  - `checkAutomatically`: (enum: `"ON_LOAD"`, `"ON_ERROR_RECOVERY"`, `"NEVER"`, `"WIFI_ONLY"`). `ON_LOAD` (default) checks every time the app starts. `ON_ERROR_RECOVERY` only checks if the app previously crashed due to an update. `NEVER` requires manual checks via the API.
  - `fallbackToCacheTimeout`: Number in milliseconds (e.g., `30000` for 30 seconds). Time the app waits for a new update to download on launch before using the most recent cached update or embedded update. Default is `0` (historically meant wait indefinitely, but now typically applies the update on next launch; check latest docs for exact behavior if not set or set to 0). Setting a timeout ensures faster startup on slow networks.
  - `runtimeVersion`: (string or object) As discussed above, critical for compatibility.
  - `requestHeaders`: (object) Allows sending custom HTTP headers with update requests (e.g., `{"expo-channel-name": "production"}`).
  - `codeSigningCertificate`: (string, e.g., `"./certificates/code-signing.crt"`) Path to the PEM-formatted X.509 certificate used for verifying code-signed updates. Requires a new build to embed.
  - `codeSigningMetadata`: (object, e.g., `{"keyid": "main", "alg": "rsa-v1_5-sha256"}`) Metadata for the `codeSigningCertificate`.

  When you use EAS Build, your app is automatically configured to use EAS Update as its update source, setting the appropriate `updates.url`.

**Client-Side Update Process:**

1.  **Check for Update:** If `checkAutomatically` is `ON_LOAD`, when the app launches, `expo-updates` sends a request to the `updates.url`. This request includes the app's current `runtimeVersion`, platform, and often the channel (via `requestHeaders`).
2.  **Manifest Download:** If EAS Update finds a compatible update, it responds with the update manifest.
3.  **Asset Download:** `expo-updates` compares assets in the manifest with locally cached assets, downloading only new or changed ones.
4.  **Applying the Update:** By default, if an update is successfully downloaded, `expo-updates` applies it the next time the app is launched (cold start). If `fallbackToCacheTimeout` is very short and download is fast, it might apply on current launch, but relying on "next launch" is safer. For immediate application, use the JavaScript API.

### `expo-updates` JavaScript API

For more control over the update process, `expo-updates` provides a JavaScript API. Import it using `import * as Updates from 'expo-updates';`.

- **`Updates.checkForUpdateAsync()`**: Asynchronously checks if a new update is available. Returns `UpdateCheckResult` (`isAvailable: boolean`, `manifest?: object`).
- **`Updates.fetchUpdateAsync()`**: Asynchronously downloads an available update. Returns `UpdateFetchResult` (`isNew: boolean`, `manifest?: object`).
- **`Updates.reloadAsync()`**: Instructs the app to reload and apply the most recently downloaded update. This makes a downloaded update active.
- **`useUpdates()` Hook:** A React hook (`import { useUpdates } from 'expo-updates';`) providing reactive state: `isUpdateAvailable`, `isUpdatePending`, `isChecking`, `isDownloading`, `error`, `lastCheckForUpdateTimeSinceRestart`, `availableUpdate`, `downloadedUpdate`, `currentlyRunning`.
- **Constants:** Access runtime information like `Updates.isEmbeddedLaunch` (boolean), `Updates.updateId` (string or null), `Updates.runtimeVersion` (string or null), `Updates.channel` (string or null).

This API allows you to build custom update UIs (e.g., prompt users to update, show download progress).

### Configuring Builds for EAS Update (Channels)

Builds are configured to point to specific "channels" for updates. A channel is like a named stream where you publish updates. For example, you might have a `production` channel for live app updates and a `staging` channel for previewing updates with testers.

You can specify the channel a build should subscribe to in your `eas.json` build profiles:

```json
// In eas.json, under "build.production":
"production": {
  "distribution": "store",
  "channel": "production", // This build will look for updates on the "production" channel
  "env": {
    "EXPO_PUBLIC_APP_ENV": "production"
  }
  // ... other production settings
}

// In eas.json, under "build.preview":
"preview": {
  "distribution": "internal",
  "channel": "staging", // This build will look for updates on the "staging" channel
  "env": {
    "EXPO_PUBLIC_APP_ENV": "staging"
  }
  // ... other preview settings
}
```

By default, if no channel is specified in the build profile, EAS Build will assign a channel name that matches the build profile name (e.g., a build from the `production` profile will default to the `production` channel).

### Publishing an Update

To publish an update (your current JavaScript code and assets) to a specific channel, you use the `eas update` command. Ensure your project is configured first (`eas update:configure`).

```bash
eas update --branch <update-branch-name> --message "Your update message"
# Example: eas update --branch main --message "Fixed login button bug"

# Or publish directly to a channel (which resolves to its linked branch)
eas update --channel production --message "New feature V2"

# The --auto flag can also be used, which typically handles local bundling and upload:
# eas update --auto --branch main --message "Updated assets"
```

- `--branch <update-branch-name>`: EAS Update uses branches (distinct from Git branches, though often named similarly) to group updates. You publish to an EAS Update branch.
- `--channel <channel-name>`: A higher-level convenience that publishes to the EAS Update branch currently linked to that channel.
- `--message "Your update message"`: A descriptive message for this update (e.g., "Fixed login button bug").

EAS will bundle your JavaScript and assets, upload them to the EAS Update service, and make them available on the specified branch (and thus to any channels pointing to that branch).

### Code Signing for EAS Updates

Code signing adds a critical layer of security, ensuring update authenticity and integrity.

- **Purpose:** Prevents tampering with updates (e.g., by malicious actors during transit or if a CDN is compromised). The client app verifies the update genuinely came from you.
- **Process:**
  1.  **Generate Keys & Certificate:** Use `npx expo-updates codesigning:generate`. This creates:
      - `private-key.pem` (Keep this secret! Used for signing.)
      - `public-key.pem` (Derived from private key.)
      - `certificate.pem` (Contains the public key, embedded in your app build.)
  2.  **Configure Project:** Run `npx expo-updates codesigning:configure`. This adds `codeSigningCertificate` (path to `certificate.pem`) and `codeSigningMetadata` (with `keyid` and `alg`) to `expo.updates` in your `app.config.js`. A new app binary build is required to embed the certificate.
  3.  **Publish Signed Update:** When publishing with `eas update`, provide the path to your private key (e.g., `eas update --private-key-path ../keys/private-key.pem --branch main ...`). EAS CLI uses this to sign the update bundle locally before uploading. The private key itself is NOT uploaded.
  4.  **Client Verification:** When `expo-updates` downloads an update, it uses the public key from the embedded certificate to verify the signature. Invalid updates are rejected.
- **Importance:** Highly recommended for all apps, especially those handling sensitive data. It provides a strong guarantee against unauthorized code execution.

### Viewing Update History

You can view the history of updates, manage channels, and see which builds are pointing to which updates on your Expo dashboard ([expo.dev/dashboard](https://expo.dev/dashboard)). This provides visibility into your OTA release process.

### Rollbacks and Error Recovery

- **Server-Side Rollbacks:** If an update introduces an issue, you can use `eas update:rollback --branch <branch-name> --group <update-group-id>` to revert an update branch to a specific previously published update group. Or, via the Expo dashboard, re-point the channel to an older update from the same branch.
- **Error Recovery (Client-Side):** `expo-updates` has a built-in safety net. If a newly applied OTA update causes the app to crash repeatedly shortly after launch (e.g., multiple crashes within a few minutes), it may automatically attempt to roll back to the last known good update or the embedded update to prevent the app from becoming unusable ("bricked").

### Considerations and Limitations

- **Native Code Cannot Be Updated OTA:** EAS Update can only update the JavaScript bundle and assets. Any changes to native code (Java/Kotlin on Android, Swift/Objective-C on iOS), including adding new native modules or updating existing ones, require a new binary to be built with EAS Build and submitted to the app stores.
- **Runtime Version:** Updates are tied to a specific "runtime version" of your app. The runtime version is determined by the native dependencies (Expo SDK version, React Native version, other native modules). If you change native dependencies, you'll create a new runtime version, and OTA updates for an old runtime won't apply to builds with the new runtime.
- **Update Size:** Large updates can take time to download, especially on slower connections. Optimize your assets and keep your JS bundle size in check.
- **Testing:** Thoroughly test OTA updates on a staging channel or with a segment of users before rolling them out to everyone.

> [!CAUTION]
> While OTA updates are powerful, relying on them too heavily for major feature releases without any store update can sometimes lead to a large diff between the store version and the OTA updated version. It's good practice to periodically release new binaries to the store to consolidate native changes and major updates.

EAS Update is an indispensable tool for maintaining and iterating on your React Native application post-launch, providing speed and flexibility that traditional app store releases alone cannot offer.

> 🤖 **(Android Developers):**
>
> **Comparison:** OTA updates are distinct from submitting new `.aab` files to the Play Store. They exclusively affect the JavaScript and asset layers. The `runtimeVersion` is crucial for ensuring the JS bundle is compatible with the installed native binary. Code signing for OTA updates is an additional security layer for these dynamic updates, complementing the standard signing of the app binary.
>
> **Key Takeaway:** Use OTA for rapid JS-based fixes and UI tweaks. Native changes still require a new Play Store release. `runtimeVersion` is your safety contract.

> 🍏 **(iOS Developers):**
>
> **Comparison:** OTA updates bypass the App Store review for JS/asset changes, unlike full `.ipa` submissions. The `runtimeVersion` ensures JS compatibility with the native iOS code. OTA code signing is an app-level security measure for the JS bundle, separate from Apple's binary signing.
>
> **Key Takeaway:** OTA updates offer speed for non-native changes. For native module updates or SDK upgrades, a new App Store submission is necessary. `runtimeVersion` prevents crashes from incompatible updates.

> 🌐 **(Web Developers - React/Angular):**
>
> **Comparison:** OTA updates are like deploying new frontend code to a web app. If your web app fetches its main JS bundle from a server, updating that bundle is somewhat analogous. However, `expo-updates` adds more sophistication: active client-side update checks, efficient asset downloading, caching, controlled application of updates, `runtimeVersion` for native compatibility, and cryptographic code signing—features beyond a typical browser cache refresh.
>
> **Key Takeaway:** EAS Update is a managed delivery system for your app's JS and assets, more advanced than simple web deploys, with strong safety (runtime versioning) and security (code signing) features.

> 📚 **Official Documentation:**
>
> - [Expo Docs: EAS Update Introduction](https://docs.expo.dev/eas-update/introduction/)
> - [Expo Docs: How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/)
> - [Expo Docs: `expo-updates` library](https://docs.expo.dev/versions/latest/sdk/updates/)
> - [Expo Docs: Channels (for EAS Update)](https://docs.expo.dev/eas-update/channels/)
> - [Expo Docs: `eas update` command reference](https://docs.expo.dev/eas-update/eas-update-command/)

> 🔁 **(Asynchronous):** As an asynchronous learner, consider how EAS Update might fit into your current or future project workflow. The ability to deploy quick updates without going through app stores can dramatically reduce your maintenance burden. Think about what kinds of changes in your app could be handled via OTA updates versus when you'd need a full rebuild.

### Exercise 16.2: Publishing an EAS Update

This exercise provides conceptual instructions on how you would publish an EAS Update. Since this requires a deployed app and specific project setup, we will focus on the commands and thought process.

**Scenario:** You have an app in production built with the `production` profile, which points to the `production` channel for updates. You've just fixed a critical JavaScript bug on your `main` Git branch.

**Task:** Conceptually outline the steps and the EAS CLI command you would use to deploy this fix as an OTA update.

`**(The URL for this Microsoft Forms exercise will be provided through your learning platform)**`

(This would ideally be a document or a series of steps for the student to follow conceptually, or a quiz in Microsoft Forms asking them to identify the correct command and parameters.)

---

_Next: [Section 9: Managing Secrets with EAS](./section-09-managing-secrets-with-eas.md)_
