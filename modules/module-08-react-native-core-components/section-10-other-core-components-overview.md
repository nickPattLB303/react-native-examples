## Section 10: Other Core Components Overview

This section provides a brief overview of several other useful React Native Core Components that supplement the ones discussed in detail previously. Familiarity with these components will broaden your UI development toolkit for applications like SpeedyMeds.

### Conceptual Content: Overview of Other Core Components

Here are a few more Core Components you might encounter or need:

- **`<ActivityIndicator>`:**

  - **Purpose:** Displays a circular loading indicator (a spinner).
  - **Use Case:** Useful for showing that some background activity is in progress, like fetching data from a server for SpeedyMeds (e.g., loading prescription history).
  - **Key Props:** `size` (`'small'` or `'large'`), `color`, `animating` (boolean to show/hide).
  - **Docs:** [ActivityIndicator](https://reactnative.dev/docs/activityindicator)

- **`<Modal>`:**

  - **Purpose:** Presents content above an enclosing view. It's a way to display temporary UI that requires user interaction or attention, like dialogs, pop-ups, or full-screen overlays.
  - **Use Case:** In SpeedyMeds, a modal could be used to display a confirmation dialog before refilling a prescription, show an enlarged image of a medication, or present a date picker.
  - **Key Props:** `visible` (boolean to show/hide), `animationType` (`'slide'`, `'fade'`, `'none'`), `transparent` (boolean), `onRequestClose` (Android back button handler).
  - **Docs:** [Modal](https://reactnative.dev/docs/modal)

- **`<Switch>`:**

  - **Purpose:** Renders a boolean input (an on/off switch).
  - **Use Case:** For settings in SpeedyMeds, like enabling/disabling notifications for prescription refills.
  - **Key Props:** `value` (boolean), `onValueChange` (function called when the switch is toggled), `trackColor` (color of the switch track), `thumbColor` (color of the switch thumb).
  - **Docs:** [Switch](https://reactnative.dev/docs/switch)

- **`<StatusBar>`:**

  - **Purpose:** Allows you to control the app's status bar (the bar at the top of the screen that displays time, battery, network signal, etc.).
  - **Use Case:** To set the status bar's style (light or dark content), background color, or visibility, to match the SpeedyMeds app theme on different screens.
  - **Key Props:** `barStyle` (`'default'`, `'light-content'`, `'dark-content'`), `backgroundColor` (Android only), `hidden` (boolean), `translucent` (Android only).
  - **Docs:** [StatusBar](https://reactnative.dev/docs/statusbar)

- **`<RefreshControl>`:**
  - **Purpose:** This component is used inside a `<ScrollView>` or `<FlatList>` to add pull-to-refresh functionality.
  - **Use Case:** Allowing users of SpeedyMeds to pull down on a list of prescriptions or messages to check for new updates.
  - **Key Props:** `refreshing` (boolean, set to true when data is loading), `onRefresh` (function called when a refresh is initiated), `tintColor` (iOS), `colors` (Android).
  - **Docs:** [RefreshControl](https://reactnative.dev/docs/refreshcontrol)

These components, along with the ones covered in previous sections, form a powerful toolkit for building rich and interactive user interfaces in React Native. Always refer to the official documentation for the most up-to-date information on props and usage.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Components and APIs](https://reactnative.dev/docs/components-and-apis) (A good starting point to explore all available components)

### Next Steps

This concludes our overview of React Native Core Components. You should now have a solid understanding of the fundamental building blocks for creating UIs. It's time to put this knowledge to the test with the module challenge, which you can find linked in the main introduction file for this module. After the challenge, Module 9 will explore React Native Core APIs and Hooks.
