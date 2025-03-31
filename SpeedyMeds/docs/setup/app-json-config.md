# Expo Configuration (`app.json`) Explained

This document explains the configuration settings found in the `app.json` file for the SpeedyMeds project. This file is crucial for controlling various aspects of the Expo application build and runtime behavior.

```json
// Current app.json content (as of YYYY-MM-DD):
{
  "expo": {
    "name": "SpeedyMeds",
    "slug": "SpeedyMeds",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## Key Configuration Sections:

1.  **`name`**: `"SpeedyMeds"`

    - **Purpose**: The display name of the app as it appears on the device's home screen and within system menus.
    - **Decision**: The name is appropriate for the project.

2.  **`slug`**: `"SpeedyMeds"`

    - **Purpose**: A URL-friendly identifier used in Expo Go and for publishing updates. It should be unique within an Expo account if publishing.
    - **Decision**: The slug matches the name and is suitable.

3.  **`version`**: `"1.0.0"`

    - **Purpose**: The initial version number of the application, following Semantic Versioning (SemVer).
    - **Decision**: Standard starting version. Will be updated as the project progresses (see `CHANGELOG.md`).

4.  **`orientation`**: `"portrait"`

    - **Purpose**: Locks the application to portrait mode.
    - **Decision**: Appropriate for this type of mobile application based on the mockups. `landscape` or `default` (allowing both) are other options if needed later.

5.  **`icon`**: `"./assets/icon.png"`

    - **Purpose**: Specifies the path to the main application icon file.
    - **Decision**: Uses the default Expo icon. This can be customized later in the project with a dedicated SpeedyMeds icon.

6.  **`userInterfaceStyle`**: `"light"`

    - **Purpose**: Sets the default appearance mode (light/dark). `light` forces light mode. `dark` forces dark mode. `automatic` respects the user's system setting.
    - **Decision**: `light` matches the initial mockups. We can change this to `automatic` later if dark mode support becomes a requirement.

7.  **`newArchEnabled`**: `true`

    - **Purpose**: Enables React Native's New Architecture (Fabric renderer and TurboModules). This generally offers performance improvements.
    - **Decision**: Keeping this `true` is recommended for new projects to leverage the latest architecture. It's good practice for learners to work with this enabled.

8.  **`splash`**: `{...}`

    - **Purpose**: Configures the splash screen displayed briefly when the app starts.
      - `image`: Path to the splash screen image.
      - `resizeMode`: How the image should fit the screen (`contain`, `cover`).
      - `backgroundColor`: Background color shown behind the image.
    - **Decision**: Uses default Expo splash assets. These can be customized later for branding. The `backgroundColor` could eventually match the app's theme.

9.  **`ios`**: `{...}`

    - **Purpose**: iOS-specific configurations.
      - `supportsTablet`: Allows the app to run on iPads.
    - **Decision**: Basic configuration is sufficient for now. Later, we might add `bundleIdentifier` for native builds.

10. **`android`**: `{...}`

    - **Purpose**: Android-specific configurations.
      - `adaptiveIcon`: Configures Android's adaptive icons (required for newer Android versions).
    - **Decision**: Basic configuration is sufficient for now. Later, we might add `package` for native builds.

11. **`web`**: `{...}`
    - **Purpose**: Web-specific configurations (when running as a Progressive Web App).
      - `favicon`: Sets the browser tab icon.
    - **Decision**: Basic configuration. Web support is not the primary focus of this course.

## Conclusion

The default `app.json` provided by the Expo `blank-typescript` template is well-suited for the initial development phase of the SpeedyMeds training project. Key settings like enabling the New Architecture are already in place. Further customizations (icons, splash screen, platform-specific identifiers) can be addressed later as needed.

_(Reference: [Expo app.json Configuration](https://docs.expo.dev/versions/latest/config/app/))_
