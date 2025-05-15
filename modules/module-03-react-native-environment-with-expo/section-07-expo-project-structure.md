## Section 7: Expo Project Structure (File/Folder Overview)

When you create a new project with `create-expo-app` using the default template (or the `tabs` template), it generates a specific directory structure built around **Expo Router** for file-based navigation. Understanding this structure is essential for navigating your project, adding screens, managing assets, and configuring your application.

> 🧑‍🏫 **(Instructor-Led):** Consider having students create a diagram of their own project structure as a reference. This physical mapping activity helps solidify understanding of how different files relate to each other.

> 🧗‍♀️ **(Self-Led):** Take time to explore each folder and file in your project, opening key files to understand their content. Getting familiar with this structure now will make adding new features much easier later.

Let's examine the typical structure of a project created with the default Expo Router template:

```text
SpeedyMedsPrototype/
├── .expo/                   # Generated: Caching and temporary files
├── .git/                    # Generated: Git version control data
├── .gitignore               # Config: Files/folders for Git to ignore
├── app/                     # Source: Expo Router screens and layouts
│   ├── (tabs)/              # Source: Layout route for tab navigation
│   │   ├── _layout.tsx      # Source: Defines the tab navigator UI
│   │   ├── index.tsx        # Source: Screen for the first tab
│   │   └── two.tsx          # Source: Screen for the second tab
│   ├── _layout.tsx          # Source: Root layout (e.g., Stack Navigator)
│   ├── index.tsx            # Source: Default initial screen (if no root index)
│   └── modal.tsx            # Source: Example modal screen
├── assets/                  # Source: Static assets (images, fonts)
│   ├── images/              # Source: Image files
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   └── icon.png
│   └── fonts/               # Source: Font files
├── components/              # Source: Reusable UI components
│   └── ThemedText.tsx
├── constants/               # Source: Constant values (e.g., Colors.ts)
│   └── Colors.ts
├── node_modules/            # Generated: Project dependencies
├── public/                  # Source: Static assets for web builds
├── app.json                 # Config: Expo project configuration
├── babel.config.js          # Config: Babel compiler configuration
├── eas.json                 # Config: EAS Build profiles (optional, generated)
├── metro.config.js          # Config: Metro bundler configuration (optional)
├── package.json             # Config: Project metadata and dependencies
├── package-lock.json/yarn.lock # Generated: Locks dependency versions
└── tsconfig.json            # Config: TypeScript compiler configuration
```

```mermaid
graph TD
    ProjectRoot[SpeedyMedsPrototype/]
    ProjectRoot --> DotExpo[.expo/]
    ProjectRoot --> DotGit[.git/]
    ProjectRoot --> DotGitignore[gitignore]
    ProjectRoot --> AppDir[app/]
    AppDir --> AppLayout[_layout.tsx]
    AppDir --> AppIndex[index.tsx]
    AppDir --> AppModal[modal.tsx]
    AppDir --> AppTabsDir[(tabs)/]
    AppTabsDir --> TabsLayout[_layout.tsx]
    AppTabsDir --> TabsIndex[index.tsx]
    AppTabsDir --> TabsTwo[two.tsx]
    ProjectRoot --> AssetsDir[assets/]
    AssetsDir --> ImagesDir[images/]
    AssetsDir --> FontsDir[fonts/]
    ProjectRoot --> ComponentsDir[components/]
    ProjectRoot --> ConstantsDir[constants/]
    ProjectRoot --> NodeModules[node_modules/]
    ProjectRoot --> PublicDir[public/]
    ProjectRoot --> AppJson[app.json]
    ProjectRoot --> BabelConfig[babel.config.js]
    ProjectRoot --> EASJson[eas.json]
    ProjectRoot --> MetroConfig[metro.config.js]
    ProjectRoot --> PackageJson[package.json]
    ProjectRoot --> LockFile[yarn.lock / package-lock.json]
    ProjectRoot --> TsconfigJson[tsconfig.json]

    style DotExpo fill:#eee,stroke:#333,stroke-width:1px
    style DotGit fill:#eee,stroke:#333,stroke-width:1px
    style NodeModules fill:#eee,stroke:#333,stroke-width:1px
    style LockFile fill:#eee,stroke:#333,stroke-width:1px
    style EASJson fill:#f9f,stroke:#333,stroke-width:1px
    style MetroConfig fill:#f9f,stroke:#333,stroke-width:1px
```

This diagram illustrates the standard folder hierarchy within a new Expo project created using the default Expo Router template (`SpeedyMedsPrototype`). Key directories like `app/` (containing screen routes and layouts), `assets/`, `components/`, and `constants/` hold your source code and resources. Configuration files such as `app.json`, `package.json`, and `tsconfig.json` define project settings and dependencies. Other folders like `.expo/`, `.git/`, and `node_modules/` are typically generated or managed by development tools and version control. Understanding the roles of these core directories, especially the `app/` directory for routing and `app.json` for configuration, is fundamental to navigating and building your application effectively with Expo.

### Key Files and Folders Explained

- **`app/` Directory**: The heart of **Expo Router**. Each `.tsx` file inside `app/` typically defines a screen (React component) and automatically becomes a route in your navigation hierarchy based on its filename. ([Source](https://docs.expo.dev/router/basics/project-structure/))

  - `_layout.tsx`: Special files that define shared UI layouts (like navigation bars, tab bars) for segments (directories) of your app. The root `app/_layout.tsx` often sets up the primary navigation (e.g., a Stack navigator). Layouts in subdirectories (like `app/(tabs)/_layout.tsx`) define nested navigation.
  - `index.tsx`: Represents the default screen for a directory segment.
  - `(group-name)/`: Parentheses denote a "route group", used for organizing files or applying a layout without adding a segment to the URL path.
  - `[param].tsx`: Defines dynamic routes where `param` is a URL parameter.
  - `modal.tsx`: A convention for screens presented modally.

- **`app.json` / `app.config.js`**: The **primary Expo configuration file**. Defines metadata (name, version, icon, splash), platform-specific settings (bundle identifiers, permissions), SDK version, plugins (native module configurations), update settings (EAS Update), orientation, web support, and more. Expo uses this file to generate native configuration files (`Info.plist`, `AndroidManifest.xml`) during the prebuild process, abstracting away much native complexity. ([Source](https://docs.expo.dev/versions/latest/config/app/))

  - **Static vs. Dynamic Configuration:**

    - `app.json`: A static JSON file. Simple key-value pairs.
    - `app.config.js` or `app.config.ts`: Allows for dynamic configuration. You export a function that receives the current config (which includes `app.json` if it exists) and can return a modified config object. This enables using JavaScript logic, environment variables (`process.env`), or even asynchronous operations (though the final returned config must be synchronous) to customize settings based on context (e.g., development vs. production).

    **Dynamic Config Example (`app.config.js`):**

    ```javascript
    // app.config.js
    export default ({ config }) => {
      // config contains the static config from app.json if it exists
      // Modify config based on an environment variable
      if (process.env.MY_ENVIRONMENT === "production") {
        config.name = "SpeedyMeds Pro";
        config.backgroundColor = "#FFFFFF";
        // Add custom data accessible at runtime via Constants.expoConfig.extra
        config.extra = {
          ...config.extra, // Preserve existing extra fields
          apiEndpoint: "https://prod.speedymeds.com/api",
          eas: {
            projectId: "your-production-project-id",
          },
        };
      } else {
        config.name = "SpeedyMeds Dev";
        config.backgroundColor = "#EEEEEE";
        config.extra = {
          ...config.extra,
          apiEndpoint: "https://dev.speedymeds.com/api",
          eas: {
            projectId: "your-development-project-id",
          },
        };
      }
      // Always return the modified config object
      return config;
    };
    ```

    ([Source](https://docs.expo.dev/versions/latest/config/app/#dynamic-configuration-with-appconfigjs))

  - **Runtime Access:** Many configuration values from your `app.json` or `app.config.js` (especially those under the `extra` key) are accessible within your application's JavaScript code at runtime via the `Constants.expoConfig` object from the `expo-constants` library. `import Constants from 'expo-constants'; console.log(Constants.expoConfig.extra.apiEndpoint);`

- **`package.json`**: Standard Node.js manifest: lists metadata, dependencies (`react`, `react-native`, `expo`, `expo-router`), devDependencies, and scripts (`start`, `android`, `ios`, `web`). The `"main"` field usually points to `expo-router/entry` when using Expo Router.

- **`assets/`**: Convention for static assets like images and fonts. Files here are bundled by Metro.

- **`components/`**: A common **convention** (not strictly required) for storing reusable React components shared across multiple screens.

- **`constants/`**: Another **convention** for storing constant values like color palettes, API keys (though sensitive keys should use `.env`), or theme configurations.

- **`public/`**: Holds static assets specifically for **web builds**. Files here are served directly by the web server (e.g., `favicon.ico`, `robots.txt`). Useful for assets needed before the JS bundle loads or outside the Metro bundling process. ([Source](https://docs.expo.dev/distribution/publishing-websites/#other-static-assets))

- **`babel.config.js`**: Configures Babel. Usually uses `babel-preset-expo`, which includes necessary transforms for React Native, TypeScript, and common features. May also include `expo-router/babel` plugin for Expo Router features.
  This preset intelligently configures Babel for React Native, extending the base `@react-native/babel-preset`. It includes necessary transforms for JSX, Flow/TypeScript stripping, and automatically enables plugins for libraries like `react-native-reanimated` if they are installed. It also handles platform-specific optimizations like tree-shaking for web builds.
  You can generate a basic `babel.config.js` by running `npx expo customize babel.config.js`. A typical file looks like this:

  ```javascript
  // babel.config.js
  module.exports = function (api) {
    api.cache(true); // Cache Babel's transformation results for faster builds
    return {
      presets: ["babel-preset-expo"],
      // Add custom plugins here if needed
      // plugins: ['my-custom-babel-plugin']
    };
  };
  ```

  Changes to `babel.config.js` usually require restarting the Metro bundler, often with the `--clear` flag (`npx expo start --clear`), to ensure the cache is updated.

- **`tsconfig.json`**: TypeScript configuration. Defines compiler options like target JS version, JSX mode, module resolution, strictness settings, and path aliases (`"paths"`, `"baseUrl"`) for cleaner imports (e.g., `@/components/*`).

- **`.gitignore`**: Standard Git ignore file. Crucially, for projects using the **Continuous Native Generation (CNG)** workflow (the Expo default), this file should ignore the native `ios/` and `android/` directories, as they are treated as build artifacts generated by `npx expo prebuild`.

- **`package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`**: Lockfiles ensuring reproducible dependency installations. **Always commit these to version control.**

- **`metro.config.js` (Optional)**: Allows customizing the Metro bundler configuration. You might create this file to add custom asset extensions, source file extensions, or configure module resolvers. ([Source](https://docs.expo.dev/guides/customizing-metro/))
  Expo provides a default Metro configuration (`expo/metro-config`) that handles most common React Native and Expo requirements. You can generate a `metro.config.js` file that extends this default by running `npx expo customize metro.config.js`.
  A common customization is adding new asset types. For example, to allow Metro to handle SVG files as assets:

  ```javascript
  // metro.config.js
  const { getDefaultConfig } = require("expo/metro-config");

  const config = getDefaultConfig(__dirname);

  // Allow Metro to handle SVG files as assets
  config.resolver.assetExts.push("svg");

  // You can add other customizations here, e.g., for source extensions:
  // config.resolver.sourceExts.push('cjs');

  module.exports = config;
  ```

  Metro also reads `tsconfig.json` (or `jsconfig.json`) to support path aliases defined there, which can simplify import statements.

- **`eas.json` (Optional)**: Configures **EAS Build profiles**. Generated when you run `eas build:configure`, it defines different build settings (e.g., development, preview, production) for creating builds on Expo Application Services.

- **`ios/` and `android/` (Generated - Typically Ignored)**: These directories contain the **native platform projects** (Xcode project for iOS, Gradle project for Android). In the default Expo workflow (CNG), these are **generated artifacts** created by `npx expo prebuild` based on `app.json`/`app.config.js` and config plugins. **You generally should not edit files in these directories directly**, as changes will be overwritten the next time `prebuild` runs. They are usually added to `.gitignore`. (You only commit these if you _eject_ from the CNG workflow). ([Source](https://docs.expo.dev/workflow/continuous-native-generation/))

### TypeScript in Your Project Structure

TypeScript is integrated throughout the project, with `.tsx` files for React components and `.ts` files for non-component code. Let's look at how TypeScript typing might be used in a SpeedyMeds app structure:

```typescript
// types/index.ts - Central location for shared types
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  expiryDate: Date;
  instructions: string;
  isRefillable: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: {
    open: string;
    close: string;
    days: string[];
  };
}

export interface User {
  id: string;
  name: string;
  prescriptions: string[]; // IDs of medications
  preferredPharmacy?: string; // ID of pharmacy
}

// Example of how these types would be used in various project files:

// app/(tabs)/medications.tsx - A screen component in the routing structure
import { View, Text, FlatList } from "react-native";
import { Medication } from "../../types";
import { MedicationCard } from "../../components/MedicationCard";
import { useGetMedications } from "../../hooks/useGetMedications";

export default function MedicationsScreen() {
  const { medications, isLoading } = useGetMedications();

  return (
    <View>
      <Text>Your Medications</Text>
      {isLoading ? (
        <Text>Loading your prescriptions...</Text>
      ) : (
        <FlatList<Medication>
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MedicationCard medication={item} />}
        />
      )}
    </View>
  );
}

// components/MedicationCard.tsx - A reusable component
import { View, Text, StyleSheet } from "react-native";
import { Medication } from "../types";

interface MedicationCardProps {
  medication: Medication;
  onPress?: (id: string) => void;
}

export function MedicationCard({ medication, onPress }: MedicationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{medication.name}</Text>
      <Text>{medication.dosage}</Text>
      <Text>{medication.frequency}</Text>
      <Text>{medication.instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
```

This example demonstrates how TypeScript integrates with your project structure, providing type safety across different files and components.

> 🔁 **(Asynchronous Learners):** When setting up your own project or joining an existing codebase, spend extra time familiarizing yourself with the project structure. Creating a personal "map" of key files and relationships will help you navigate efficiently when working independently.

### Expo's Abstraction Approach

This structure highlights Expo's philosophy: manage native configuration primarily through `app.json`/`app.config.js` and Expo Router's file-based system, using `prebuild` to generate the native projects as needed. This simplifies the developer experience, especially for those without deep native platform expertise.

> **Key Insight: The Power of Centralized Configuration and CNG**
> The way Expo centralizes a significant amount of project configuration—spanning app metadata, native platform settings, build options, and plugin integrations—into `app.json` or its dynamic counterparts (`app.config.js`/`.ts`) is a cornerstone of its developer experience. This contrasts sharply with traditional native development or even standard React Native CLI projects, where configurations are often scattered across various platform-specific files (like `AndroidManifest.xml`, `build.gradle`, `Info.plist`, Xcode project settings).
>
> Expo provides a unified, JavaScript-based layer for managing these settings. This abstraction is further empowered by Config Plugins, which allow libraries or developers to programmatically modify the underlying native project files based on the app config during the prebuild step. This "configuration as code" paradigm is fundamental to enabling **Continuous Native Generation (CNG)**. With CNG, the `ios` and `android` directories are treated not as primary source code to be manually edited and version-controlled, but as build artifacts generated deterministically from the project's configuration and dependencies. Consequently, developers need to understand that `app.config.js` is more than just metadata; it's a powerful mechanism for controlling the native aspects of the application, often without directly touching native code, especially when used in conjunction with prebuild and config plugins. This represents a significant departure and simplification compared to the standard React Native CLI workflow.

> 📲 **(Native Developers):**
>
> **Comparison:** `app.json`/`app.config.js` replaces direct editing of `Info.plist`/`AndroidManifest.xml` for many common settings. Config Plugins handle more complex native modifications programmatically. The `ios/` and `android/` folders are treated like build outputs, not primary source code, unless you specifically move away from the CNG workflow. Expo Router replaces manual setup of native navigation containers (like `UINavigationController` or Android Fragments/Activities for navigation structure).
>
> **Key Takeaway:** Configuration is centralized in JS/JSON; native projects are generated artifacts.
>
> **Source:** [Expo Config Plugins Documentation](https://docs.expo.dev/config-plugins/introduction/)

> 🌐 **(Web Developers):**
>
> **Comparison:** Expo Router's `app/` directory feels similar to file-based routing in frameworks like Next.js or Remix. `app.json` is like a mix of `package.json` metadata and build configurations specific to mobile apps. The `ios/`/`android/` folders are analogous to a complex build output directory (`dist/`, `build/`) that you wouldn't typically edit directly.
>
> **Key Takeaway:** File-based routing in `app/`, central configuration in `app.json`, native folders are generated.
>
> **Source:** [Next.js App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing)

Understanding this structure, particularly the role of the `app/` directory and `app.json`, is key to developing effectively with Expo and Expo Router.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Project Structure (Expo Router)](https://docs.expo.dev/router/basics/project-structure/)
> - [Expo Docs: Configuration with app.json / app.config.js](https://docs.expo.dev/versions/latest/config/app/)
> - [Expo Docs: Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/)
> - [Expo Docs: Customizing Metro](https://docs.expo.dev/guides/customizing-metro/)
> - [TypeScript Documentation: tsconfig.json](https://www.typescriptlang.org/tsconfig)
> - [React Native Docs: Project Structure](https://reactnative.dev/docs/project-structure) (General perspective)
