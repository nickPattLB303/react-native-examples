# Digging into Expo Config (`app.json`)

Let's take a look at the `app.json` file! This is Expo's main configuration file for the SpeedyMeds project. Think of it as the control panel for your app's metadata, icons, splash screen, build settings, and more. You'll modify this file directly if you need to change these kinds of project-level settings.

```json
// Current app.json content:
{
  "expo": {
    "name": "SpeedyMeds",
    "slug": "SpeedyMeds",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic", // Now respects system theme!
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

## Key Settings Explained:

1.  **`name`**: `"SpeedyMeds"`
    - **What it does**: The app's display name on the home screen.
    - **Our Setup**: Looks good!

2.  **`slug`**: `"SpeedyMeds"`
    - **What it does**: A URL-friendly name used by Expo services.
    - **Our Setup**: Matches the name, all set.

3.  **`version`**: `"1.0.0"`
    - **What it does**: Your app's current version.
    - **Our Setup**: Standard starting version.

4.  **`orientation`**: `"portrait"`
    - **What it does**: Locks the app to portrait orientation.
    - **Our Setup**: Makes sense for this app based on the mockups.

5.  **`icon`**: `"./assets/icon.png"`
    - **What it does**: Points to the app icon file.
    - **Our Setup**: Uses the default Expo icon for now. You could swap this out later with a custom SpeedyMeds icon!

6.  **`userInterfaceStyle`**: `"automatic"`
    - **What it does**: Controls the app's theme appearance. `light` forces light mode, `dark` forces dark mode, and `automatic` respects the user's phone setting.
    - **Our Setup**: Set to `automatic` so it works nicely with our light/dark theme setup out of the box!

7.  **`newArchEnabled`**: `true`
    - **What it does**: Turns on React Native's New Architecture (Fabric & TurboModules) for potential performance boosts.
    - **Our Setup**: Good to have this enabled from the start.

8.  **`splash`**: `{...}`
    - **What it does**: Configures the loading screen shown when the app starts.
    - **Our Setup**: Uses default Expo assets. Could be customized later for branding.

9.  **`ios`**: `{...}`
    - **What it does**: Settings specific to iOS builds.
    - **Our Setup**: Basic setting to support iPads is included.

10. **`android`**: `{...}`
     - **What it does**: Settings specific to Android builds.
     - **Our Setup**: Includes configuration for modern Android adaptive icons.

11. **`web`**: `{...}`
     - **What it does**: Settings for web support (if you run the app in a browser).
     - **Our Setup**: Basic favicon setting.

## Conclusion

The `app.json` file is set up with sensible defaults for this project, including support for automatic light/dark mode and the New Architecture. You likely won't need to touch this much initially, but it's good to know where these settings live!

_(Want all the details? Check out the official [Expo `app.json` Configuration Documentation](https://docs.expo.dev/versions/latest/config/app/).)_ 