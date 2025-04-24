# Module 1: The React Native Ecosystem

## 1.4 Essential Resources: Mastering Official Documentation (reactnative.dev, docs.expo.dev)

Importance: In the rapidly evolving landscape of mobile development, relying on official documentation is paramount. For React Native and Expo development, the official websites reactnative.dev and docs.expo.dev serve as the primary, most accurate, and consistently updated sources of truth. Treating these as indispensable resources is a critical skill for building and maintaining production-quality applications.

React Native Docs (reactnative.dev):

-   Structure: This site is the definitive resource for the core React Native framework.24 Its navigation typically includes:
-   Guides: Covering fundamentals (JSX, components, state, props), platform-specific code, environment setup, styling (including Flexbox 26), and more advanced topics.24
-   Components & APIs: A comprehensive reference detailing built-in components (<View>, <Text>, <Image>, <ScrollView>, etc.) and core APIs (like StyleSheet 30, PixelRatio 31) with props, examples, and platform notes.32
-   Architecture: Explanations of React Native's inner workings, including detailed documentation on the New Architecture (JSI, Fabric, Turbo Modules).16
-   Community & Blog: Links to community resources and official announcements/articles.25
-   Key Features: The site often includes interactive code examples using the Snack Player, allowing users to experiment directly in the browser.24 It's crucial to note the documentation is versioned; developers must ensure they are consulting the documentation corresponding to the React Native version used in their project.29

Expo Docs (docs.expo.dev):

-   Structure: This site is the essential resource for the Expo framework, tooling, and services built around React Native.34 Key sections include:
-   Guides: Covering the entire development lifecycle with Expo, from "Get started" (creating projects 36, environment setup 37) and "Develop" (Expo CLI 38, navigation, UI, debugging 39) to "Review" and "Deploy".36
-   EAS (Expo Application Services): Detailed documentation on Expo's cloud services for building (Development Builds 41, production builds), submitting to app stores, and managing updates.42
-   Reference: API documentation for the Expo SDK modules (e.g., expo-location, expo-camera, expo-notifications).34
-   Troubleshooting: Guides for resolving common issues related to Expo CLI, EAS Build, updates, and general development errors.39
-   More: Includes core concepts, FAQs, community links (Discord, Forums 35), and versioning information.34
-   Key Features: Expo documentation also emphasizes SDK versioning, as compatibility between Expo SDK versions, React Native versions, and native dependencies is critical.34 The docs explain Expo-specific commands like npx create-expo-app 47, npx expo start 38, and the crucial npx expo install.48 Setup guides specific to Expo workflows, like using the iOS Simulator, are provided.50

Navigation & Search: Effective use involves leveraging the structured navigation sidebars and, critically, the search functionality available on both sites. Searching for specific component names (e.g., "FlatList"), API modules (e.g., "PermissionsAndroid"), CLI commands (e.g., "expo install"), or concepts (e.g., "Flexbox", "JSI") is often the quickest way to find relevant information.

Self-Reliance: Developing the habit of consulting the official documentation first when encountering issues or needing information about a specific feature fosters self-reliance and ensures developers are working with the most accurate information. Community forums and Stack Overflow are valuable secondary resources, but the official docs should always be the starting point.

Proficiency in React Native development, especially within the Expo ecosystem, requires familiarity with both documentation sites. Core framework concepts, fundamental components/APIs, and architectural details are typically found on reactnative.dev. Expo-specific tooling (CLI commands, Expo Go, Development Builds), Expo Application Services (EAS), and Expo SDK module APIs are documented on docs.expo.dev. Knowing which resource governs which aspect of the technology stack is essential for efficient problem-solving and development.

#### Works cited

16. About the New Architecture - React Native, accessed April 24, 2025, <https://reactnative.dev/architecture/landing-page>
24. Introduction - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/getting-started>
25. React Native - Learn once, write anywhere, accessed April 24, 2025, <https://reactnative.dev/>
26. Style - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/style>
29. Introduction - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/0.71/getting-started>
30. StyleSheet - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/stylesheet>
31. PixelRatio - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/pixelratio>
32. Core Components and APIs - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/components-and-apis>
34. Reference - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/versions/latest/>
35. Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/>
36. Create a project - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/get-started/create-a-project/>
37. Create your first app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/tutorial/create-your-first-app/>
38. Expo CLI - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/more/expo-cli/>
39. Troubleshooting overview - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/troubleshooting/overview/>
41. Set Up Your Expo Go Project to Use Development Builds | egghead.io, accessed April 24, 2025, <https://egghead.io/lessons/react-native-set-up-your-expo-go-project-to-use-development-builds>
42. Expo Go vs Development Builds: Which should you use?, accessed April 24, 2025, <https://expo.dev/blog/expo-go-vs-development-builds>
47. create-expo-app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/more/create-expo>
48. Recommended Setup for using Expo Install - Issue #212 - antfu-collective/ni - GitHub, accessed April 24, 2025, <https://github.com/antfu-collective/ni/issues/212>