## Section 7: Expo Project Structure (File/Folder Overview)

When you create a new project with `create-expo-app` using the default template (or the `tabs` template), it generates a specific directory structure built around **Expo Router** for file-based navigation. Understanding this structure is essential for navigating your project, adding screens, managing assets, and configuring your application.

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

- _Diagram: Mermaid diagram showing the Expo Router project structure hierarchy._

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

- _Caption: This diagram illustrates the standard structure of a new Expo project using Expo Router. The `app/` directory is central for navigation. Grayed-out folders are generated/managed by tools. Pink files are optional configurations._

### Key Files and Folders Explained

- **`app/` Directory**: The heart of **Expo Router**. Each `.tsx` file inside `app/` typically defines a screen (React component) and automatically becomes a route in your navigation hierarchy based on its filename. ([Source](https://docs.expo.dev/router/basics/project-structure/))

  - `_layout.tsx`: Special files that define shared UI layouts (like navigation bars, tab bars) for segments (directories) of your app. The root `app/_layout.tsx` often sets up the primary navigation (e.g., a Stack navigator). Layouts in subdirectories (like `app/(tabs)/_layout.tsx`) define nested navigation.
  - `index.tsx`: Represents the default screen for a directory segment.
  - `(group-name)/`: Parentheses denote a "route group", used for organizing files or applying a layout without adding a segment to the URL path.
  - `[param].tsx`: Defines dynamic routes where `param` is a URL parameter.
  - `modal.tsx`: A convention for screens presented modally.

- **`app.json` / `app.config.js`**: The **primary Expo configuration file**. Defines metadata (name, version, icon, splash), platform-specific settings (bundle identifiers, permissions), SDK version, plugins (native module configurations), update settings (EAS Update), orientation, web support, and more. Expo uses this file to generate native configuration files (`Info.plist`, `AndroidManifest.xml`) during the prebuild process, abstracting away much native complexity. ([Source](https://docs.expo.dev/versions/latest/config/app/))

- **`package.json`**: Standard Node.js manifest: lists metadata, dependencies (`react`, `react-native`, `expo`, `expo-router`), devDependencies, and scripts (`start`, `android`, `ios`, `web`). The `"main"` field usually points to `expo-router/entry` when using Expo Router.

- **`assets/`**: Convention for static assets like images and fonts. Files here are bundled by Metro.

- **`components/`**: A common **convention** (not strictly required) for storing reusable React components shared across multiple screens.

- **`constants/`**: Another **convention** for storing constant values like color palettes, API keys (though sensitive keys should use `.env`), or theme configurations.

- **`public/`**: Holds static assets specifically for **web builds**. Files here are served directly by the web server (e.g., `favicon.ico`, `robots.txt`). Useful for assets needed before the JS bundle loads or outside the Metro bundling process. ([Source](https://docs.expo.dev/distribution/publishing-websites/#other-static-assets))

- **`babel.config.js`**: Configures Babel. Usually uses `babel-preset-expo`, which includes necessary transforms for React Native, TypeScript, and common features. May also include `expo-router/babel` plugin for Expo Router features.

- **`tsconfig.json`**: TypeScript configuration. Defines compiler options like target JS version, JSX mode, module resolution, strictness settings, and path aliases (`"paths"`, `"baseUrl"`) for cleaner imports (e.g., `@/components/*`).

- **`.gitignore`**: Standard Git ignore file. Crucially, for projects using the **Continuous Native Generation (CNG)** workflow (the Expo default), this file should ignore the native `ios/` and `android/` directories, as they are treated as build artifacts generated by `npx expo prebuild`.

- **`package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`**: Lockfiles ensuring reproducible dependency installations. **Always commit these to version control.**

- **`metro.config.js` (Optional)**: Allows customizing the Metro bundler configuration. You might create this file to add custom asset extensions, source file extensions, or configure module resolvers. ([Source](https://docs.expo.dev/guides/customizing-metro/))

- **`eas.json` (Optional)**: Configures **EAS Build profiles**. Generated when you run `eas build:configure`, it defines different build settings (e.g., development, preview, production) for creating builds on Expo Application Services.

- **`ios/` and `android/` (Generated - Typically Ignored)**: These directories contain the **native platform projects** (Xcode project for iOS, Gradle project for Android). In the default Expo workflow (CNG), these are **generated artifacts** created by `npx expo prebuild` based on `app.json`/`app.config.js` and config plugins. **You generally should not edit files in these directories directly**, as changes will be overwritten the next time `prebuild` runs. They are usually added to `.gitignore`. (You only commit these if you _eject_ from the CNG workflow). ([Source](https://docs.expo.dev/workflow/continuous-native-generation/))

### Expo's Abstraction Approach

This structure highlights Expo's philosophy: manage native configuration primarily through `app.json`/`app.config.js` and Expo Router's file-based system, using `prebuild` to generate the native projects as needed. This simplifies the developer experience, especially for those without deep native platform expertise.

> 📲 **(Native Developers):**
>
> **Comparison:** `app.json`/`app.config.js` replaces direct editing of `Info.plist`/`AndroidManifest.xml` for many common settings. Config Plugins handle more complex native modifications programmatically. The `ios/` and `android/` folders are treated like build outputs, not primary source code, unless you specifically move away from the CNG workflow. Expo Router replaces manual setup of native navigation containers (like `UINavigationController` or Android Fragments/Activities for navigation structure).
>
> **Key Takeaway:** Configuration is centralized in JS/JSON; native projects are generated artifacts.

> 🌐 **(Web Developers):**
>
> **Comparison:** Expo Router's `app/` directory feels similar to file-based routing in frameworks like Next.js or Remix. `app.json` is like a mix of `package.json` metadata and build configurations specific to mobile apps. The `ios/`/`android/` folders are analogous to a complex build output directory (`dist/`, `build/`) that you wouldn't typically edit directly.
>
> **Key Takeaway:** File-based routing in `app/`, central configuration in `app.json`, native folders are generated.

Understanding this structure, particularly the role of the `app/` directory and `app.json`, is key to developing effectively with Expo and Expo Router.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Project Structure (Expo Router)](https://docs.expo.dev/router/basics/project-structure/)
> - [Expo Docs: Configuration with app.json / app.config.js](https://docs.expo.dev/versions/latest/config/app/)
> - [Expo Docs: Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/)
> - [Expo Docs: Customizing Metro](https://docs.expo.dev/guides/customizing-metro/)
> - [React Native Docs: Project Structure](https://reactnative.dev/docs/project-structure) (General perspective)
