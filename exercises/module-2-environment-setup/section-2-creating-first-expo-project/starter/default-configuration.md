# Default Expo Configuration Documentation

## app.json Sections

Document each major section in the default app.json configuration:

### General Configuration
```json
{
  "expo": {
    "name": "MedicineTracker",
    "slug": "MedicineTracker",
    "version": "1.0.0"
  }
}
```
- **name**: Application name displayed to users
- **slug**: URL-friendly name for your project
- **version**: Current version of your application

### Display Configuration
```json
{
  "expo": {
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light"
  }
}
```
- **orientation**: Controls allowed screen orientations
- **icon**: Application icon image
- **userInterfaceStyle**: Default appearance mode

### Splash Screen Configuration
```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```
- **image**: Splash screen image
- **resizeMode**: How the splash image should be scaled
- **backgroundColor**: Background color behind splash image

### Platform-specific Configuration

#### iOS Configuration
```json
{
  "expo": {
    "ios": {
      "supportsTablet": true
    }
  }
}
```
- **supportsTablet**: Enables iPad support
- [Document other iOS-specific options]

#### Android Configuration
```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```
- **adaptiveIcon**: Android adaptive icon configuration
- [Document other Android-specific options]

#### Web Configuration
```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```
- **favicon**: Web browser favicon
- [Document other web-specific options]

## Asset Configuration
```json
{
  "expo": {
    "assetBundlePatterns": [
      "**/*"
    ]
  }
}
```
- **assetBundlePatterns**: Patterns for files to include in the app bundle

## Purpose of Configuration Options

### General Options
- Control basic app information
- Define version numbers for stores
- Set up project identifiers

### Display Options
- Control app appearance
- Define orientation behavior
- Set up icons and themes

### Platform-specific Options
- Configure platform-specific features
- Set up platform-specific assets
- Enable/disable platform capabilities

## Configuration Best Practices

1. Version Management
   - Keep version numbers consistent
   - Follow semantic versioning
   - Update versions for store submissions

2. Asset Management
   - Use appropriate image sizes
   - Optimize assets for each platform
   - Follow platform-specific guidelines

3. Platform Configuration
   - Test on all target platforms
   - Configure platform-specific features appropriately
   - Follow platform guidelines for icons and splash screens 