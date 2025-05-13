## Section 11: Deep Linking (Concepts and Setup with Expo Router)

Deep linking allows users to open your application at a specific screen or with particular content loaded, by clicking a URL. This is crucial for features like navigating from a website to your app, handling push notifications that lead to specific content, or sharing links that open directly to a piece of information within your SpeedyMeds application (e.g., a link to a specific medication's details page).

> 🛣️ **(All Learners):** Expo Router significantly simplifies deep linking setup compared to traditional React Navigation, as its URL-focused, file-system based routing naturally lends itself to this.

### Core Content

#### Conceptual Content: What is Deep Linking?

Deep linking refers to the ability to use a Uniform Resource Identifier (URI) or URL to launch a mobile application and open it to a specific screen or state. Instead of just opening the app to its home screen, a deep link can take the user directly to the relevant content they are interested in.

**Why is Deep Linking Important?**

- **User Experience:** Seamlessly transitions users from other apps (like email or web browsers) or notifications directly to the relevant content.
- **Marketing & Engagement:** Allows for targeted campaigns where users can be directed to specific product pages, promotional content, or features.
- **Sharing:** Enables users to share links to specific parts of your app with others.
- **Inter-App Communication:** Can be used for navigating between different apps.

**Types of Links:**

- **Custom URL Schemes:** e.g., `speedymeds://medications/aspirin123`.
- **Universal Links (iOS) / App Links (Android):** Standard `http` or `https` web URLs that are associated with your app (e.g., `https://speedymeds.example.com/medications/aspirin123`). These are generally preferred over custom schemes for security and flexibility.

Expo Router is designed with web principles in mind, so its routing system inherently supports URL-based navigation, making deep linking more straightforward.

#### Procedural Content: Deep Linking Setup with Expo Router

Expo Router handles most of the deep linking configuration automatically due to its file-system based routing which mirrors URL paths. When you build your app for production, you'll need to configure the associated domains (for Universal Links/App Links) and URL schemes.

**1. URL Scheme Configuration (for Development and Custom Schemes):**

You define a URL scheme for your app in the `app.json` or `app.config.js` file.

```json
// app.json (or app.config.js)
{
  "expo": {
    "name": "SpeedyMeds App",
    "slug": "speedymeds-app",
    "scheme": "speedymeds", // Your custom URL scheme
    // ... other configurations
    "plugins": [
      [
        "expo-router",
        {
          // "origin": "https://yourdomain.com" // Optional: For web and Universal Links/App Links base URL
        }
      ]
    ]
  }
}
```

- With `"scheme": "speedymeds"`, your app can be opened with URLs like `speedymeds://`.
- Expo Router will then map the path part of the URL (e.g., `/medications/aspirin123` from `speedymeds://medications/aspirin123`) to your file-based routes (e.g., `app/medications/[id].tsx`).

**2. Universal Links (iOS) and App Links (Android) Configuration:**

For production apps, using standard web URLs (`https` links) is recommended. This requires more setup:

- **iOS (Universal Links):**

  1.  **Associated Domains:** You need to host an `apple-app-site-association` (AASA) file on your web server at `https://yourdomain.com/.well-known/apple-app-site-association`.
  2.  **Entitlement:** Add an Associated Domains entitlement to your app in your Apple Developer account and Xcode project (or via EAS Build configuration).
  3.  **`app.json` Configuration:** Specify the associated domain in your `app.json` under `ios.associatedDomains`.
      ```json
      // app.json
      {
        "expo": {
          // ...
          "ios": {
            "bundleIdentifier": "com.speedymeds.app",
            "associatedDomains": ["applinks:yourdomain.com"]
          }
        }
      }
      ```

- **Android (App Links):**

  1.  **Asset Links JSON:** Host a `assetlinks.json` file on your web server at `https://yourdomain.com/.well-known/assetlinks.json`.
  2.  **`app.json` Configuration:** Add an intent filter to your Android manifest. Expo CLI and EAS Build typically handle generating the necessary intent filters based on your `expo-router` configuration and `scheme` or associated domains.
      You might need to specify `android.intentFilters` in `app.json` if you have specific needs, but Expo Router aims to configure this for you based on the `origin` if provided in the plugin options.

Expo's documentation provides detailed guides on setting up these `assetlinks.json` and AASA files, often managed via EAS services if you use them for hosting or builds.

**3. How Expo Router Handles Incoming Links:**

When your app is opened via a deep link (e.g., `speedymeds://orders/123` or `https://speedymeds.example.com/orders/123`):

- The operating system routes the URL to your app.
- Expo Router takes the path part of the URL (e.g., `/orders/123`).
- It matches this path to your file structure in the `app` directory (e.g., `app/orders/[id].tsx`).
- The corresponding screen is rendered, and parameters (like `id: '123'`) are available via `useLocalSearchParams()`.

**4. Preserving Back Stack on Deep Link:**

When a user deep links into a deeply nested screen, you often want the back button to navigate through the logical parent screens of your app, rather than exiting the app immediately. Expo Router allows you to configure this behavior.

- If your deep link targets a screen within a navigator (e.g., a screen inside a Stack or Tabs defined in a `_layout.tsx`), that navigator will be mounted.
- To ensure a proper back stack, you can use the `initialRouteName` prop on your navigator components within your `_layout.tsx` files. For example, if a deep link goes to `app/(tabs)/profile.tsx`, and `app/(tabs)/_layout.tsx` defines a `<Tabs initialRouteName="home">`, the "home" tab might be considered part of the stack history, depending on how the specific navigator handles it. The key is that by structuring your app with layouts, Expo Router builds up the necessary navigator context.
- For Stack navigators, if you deep link to `app/stack/screenC.tsx`, and `app/stack/_layout.tsx` defines a `<Stack />`, screens A and B (if they are parents in a conceptual hierarchy leading to C) would typically need to be part of the mounted stack for back navigation to work through them. Expo Router handles this by ensuring parent layouts are rendered. Setting an `initialRouteName` on a stack can ensure a base screen is always present in that stack if no other screen in the stack is specified by the URL.

Essentially, by defining your navigation hierarchy with layouts, Expo Router ensures that parent navigators are part of the rendered tree, which helps React Navigation (used underneath) to establish a meaningful back stack. You generally don't need to do much extra for simple cases beyond correctly structuring your layouts.

**5. Testing Deep Links:**

- **Development (Expo Go):**
- You can use `npx uri-scheme open <URL> --ios` or `npx uri-scheme open <URL> --android` to test custom schemes with the Expo Go app or development builds on simulators/emulators.
- Replace `<URL>` with your deep link, e.g., `exp://<YOUR_EXPO_DEV_SERVER_ADDRESS>/--/orders/123` (for Expo Go, `exp://.../--/` acts as a prefix to your app's path).
- If you have a custom scheme like `myapp://`, you can test `myapp://orders/123` directly on a development build.

- **Production/Standalone Builds:**
- Test by clicking actual links from a website, email, or by using platform-specific CLI tools (`xcrun simctl openurl <device> <URL>` for iOS Simulator, `adb shell am start -W -a android.intent.action.VIEW -d "<URL>" <package_name>` for Android).

**Example: Linking to a Medication Detail Screen**

- **File:** `app/medications/[id].tsx` (handles routes like `/medications/some-rx-id`)
- **URL Scheme:** `speedymeds`
- **Deep Link:** `speedymeds://medications/rx789`
- **Expo Router Action:** Opens the app, navigates to `app/medications/[id].tsx`, and `useLocalSearchParams()` in that screen will return `{ id: 'rx789' }`.

> [!IMPORTANT]
> The `origin` property in the `expo-router` plugin configuration in `app.json` is important for web support and can help in generating configuration for Universal Links/App Links if you are using services like EAS Metadata.
>
> ```json
> // app.json excerpt for expo-router plugin
> "plugins": [
>   [
>     "expo-router",
>     {
>       "origin": "https://app.speedymeds.com" // Your app's canonical web origin
>     }
>   ]
> ]
> ```

> 📚 **Official Documentation:**
>
> - [Expo Router: Deep Linking](https://docs.expo.dev/router/guides/deep-linking/)
> - [Expo: Linking (covers general deep linking concepts)](https://docs.expo.dev/guides/linking/)
> - [Expo: Universal Links (iOS)](https://docs.expo.dev/guides/universal-links/)
> - [Expo: Android App Links](https://docs.expo.dev/guides/android-app-links/)
> - [Expo: Configuring a URL scheme](https://docs.expo.dev/guides/linking/#configuring-a-url-scheme)
> - [Expo: EAS Metadata (for hosting AASA/assetlinks.json)](https://docs.expo.dev/eas/metadata/)

> 🌐 **(Web Developers):**
>
> **Key Takeaway:** Deep linking in mobile with Expo Router feels very much like standard URL routing on the web. The primary additional complexity comes from configuring the native OS (iOS/Android) to correctly associate your web domain or custom scheme with your app through AASA and assetlinks.json files.

#### Exercise: (No exercise for this section as per blueprint, deep linking setup can be complex)

The blueprint does not specify an exercise for Section 11. Implementing and testing deep linking thoroughly, especially Universal Links/App Links, involves external server configurations and build processes that go beyond a typical Expo Snack exercise.

A conceptual exercise could involve:

1.  Defining the desired deep link URLs for various SpeedyMeds app features (e.g., viewing a prescription, opening the refill page).
2.  Outlining the necessary `app.json` scheme configuration.
3.  Describing where the `apple-app-site-association` and `assetlinks.json` files would be hosted and what their basic content might include for a given domain.

#### Next Steps

This concludes the core topics for Module 11: Navigation and Routing. You've learned about fundamental navigation concepts, implementing stacks, tabs, and drawers with React Navigation, passing parameters, customizing appearance, and then explored file-system based routing and deep linking with Expo Router. The module challenge will allow you to apply these concepts to build a more comprehensive navigation structure for the SpeedyMeds app.
