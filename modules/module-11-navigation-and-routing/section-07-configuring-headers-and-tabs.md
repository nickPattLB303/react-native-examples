## Section 7: Configuring Headers and Tabs (Styling, Options)

Once you have your navigation structure in place, the next step is often to customize its appearance to match your app's branding and improve user experience. React Navigation provides extensive options for configuring headers (in Stack Navigators) and tab bars (in Tab Navigators). This section explores how to style these elements, set titles, add buttons, and manage their visibility for the SpeedyMeds app.

> 🛣️ **(All Learners):** Customization options can be applied at different levels: globally for a navigator or specifically for individual screens. Understanding this hierarchy is key to efficient styling.

### Core Content

#### Conceptual Content: Levels of Configuration

React Navigation allows you to configure visual elements like headers and tab bars in a few ways:

1.  **`screenOptions` on the Navigator:** You can set default options for all screens within a specific navigator (e.g., `Stack.Navigator` or `Tab.Navigator`). This is useful for applying consistent styling across multiple screens.
2.  **`options` on the Screen:** Each `Stack.Screen` or `Tab.Screen` component can also take an `options` prop to customize its appearance individually. These screen-specific options will override any defaults set by the navigator's `screenOptions`.
3.  **Dynamic Options:** Both `screenOptions` and `options` can be functions that receive `{ route, navigation }` as arguments, allowing you to set options dynamically based on the current route's parameters or navigation state.

#### Procedural Content: Configuring Stack Navigator Headers

Headers are a crucial part of stack navigation, providing context (title) and back navigation.

**1. Setting Header Titles:**

- **Static Title:**
  ```tsx
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: "SpeedyMeds Dashboard" }}
  />
  ```
- **Dynamic Title (based on route params):**
  ```tsx
  <Stack.Screen
    name="PrescriptionDetail"
    component={PrescriptionDetailScreen}
    options={({ route }) => ({
      title: `Details: ${route.params.prescriptionId}`,
    })}
  />
  ```
- **Setting title from within the screen component (less common for headers, but possible):**
  You can use `navigation.setOptions({ title: 'Updated Title' })` inside a screen component. This is useful if the title depends on data fetched within the screen.

**2. Styling the Header:**

Header styles can be applied via the `options` (for a single screen) or `screenOptions` (for all screens in a stack navigator) prop.

```tsx
// In Stack.Navigator screenOptions or Stack.Screen options
options={{
  title: 'My Screen',
  headerStyle: {
    backgroundColor: '#f4511e', // Background color of the header
  },
  headerTintColor: '#fff', // Color of the title and back button
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerTitleAlign: 'center', // 'left' or 'center' (Android defaults to left, iOS to center)
}}
```

**3. Adding Buttons to the Header:**

- `headerRight`: A function that returns a React element to display on the right side of the header.
- `headerLeft`: A function that returns a React element to display on the left side (the back button is shown here by default, but you can override it).

```tsx
// Example: Adding a Save button to headerRight
<Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={({ navigation, route }) => ({
    title: "Edit Profile",
    headerRight: () => (
      <Button
        onPress={() => {
          // Access route.params if needed, e.g., route.params.userId
          // Call a save function, e.g., saveProfileEdits();
          console.log("Save button pressed!");
          // Potentially navigate back or show a success message
        }}
        title="Save"
        color={Platform.OS === "ios" ? "#fff" : "#f4511e"} // iOS often uses text color for buttons
      />
    ),
  })}
/>
```

> [!TIP]
> When using `headerLeft` to provide a custom component, you might lose the default back button functionality. You may need to implement back navigation yourself using `navigation.goBack()` or render the default back button component provided by `@react-navigation/elements` (`HeaderBackButton`).

**4. Hiding the Header:**

```tsx
<Stack.Screen
  name="FullScreenImage"
  component={FullScreenImageScreen}
  options={{ headerShown: false }}
/>
```

#### Procedural Content: Configuring Tab Navigator Tab Bars

Tab bars provide access to the main sections of your app.

**1. Setting Tab Labels:**

- **Static Label:**
  ```tsx
  <Tab.Screen
    name="MedicationsTab"
    component={MedicationsNavigator}
    options={{ tabBarLabel: "My Meds" }}
  />
  ```
- **Dynamic Label (less common for tabs, but possible via `tabBarLabel` as a function):**
  ```tsx
  <Tab.Screen
    name="NotificationsTab"
    component={NotificationsScreen}
    options={{
      tabBarLabel: "Inbox",
      tabBarBadge: 3, // Display a badge with a count
    }}
  />
  ```
- The `title` option in `Tab.Screen` often also sets the label if `tabBarLabel` isn't specified.

**2. Setting Tab Icons:**

This is typically done via the `tabBarIcon` function within `screenOptions` of the `Tab.Navigator` or `options` of a `Tab.Screen`.

```tsx
// In Tab.Navigator screenOptions or Tab.Screen options
options={{
  tabBarIcon: ({ focused, color, size }) => {
    // focused: boolean, true if tab is active
    // color: string, color for the icon (active/inactive tint will be applied)
    // size: number, default size for the icon
    let iconName;
    if (route.name === 'HomeTab') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'SettingsTab') {
      iconName = focused ? 'settings' : 'settings-outline';
    }
    return <Ionicons name={iconName as any} size={size} color={color} />;
  },
}}
```

**3. Styling the Tab Bar:**

These options usually go into the `screenOptions` of the `Tab.Navigator`.

```tsx
// In Tab.Navigator screenOptions
screenOptions={{
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarActiveBackgroundColor: '#e0e0e0',
  tabBarInactiveBackgroundColor: '#ffffff',
  tabBarStyle: [
    {
      display: "flex", // Default, but can be 'none' to hide
      backgroundColor: '#f0f0f0', // Overall tab bar background
      // Add other styles like borderTopColor, height, etc.
    },
    null
  ],
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  // headerShown: false, // Common if tabs manage their own stack headers
}}
```

**4. Hiding the Tab Bar for a Specific Screen (usually within a nested stack):**

If a screen within a stack (that is itself inside a tab navigator) should hide the bottom tab bar (e.g., a detail screen or a modal), you can set the `tabBarStyle: { display: 'none' }` option. This is often done dynamically.

```tsx
// Inside a screen component that's part of a stack nested in a tab navigator
React.useLayoutEffect(() => {
  // Get the parent TabNavigator's navigation object
  const tabNavigation = navigation.getParent();
  if (tabNavigation) {
    tabNavigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }
  // Reset on unmount
  return () => {
    if (tabNavigation) {
      tabNavigation.setOptions({
        tabBarStyle: { display: "flex" }, // Or your default style
      });
    }
  };
}, [navigation]);
```

A more common approach is to define a separate stack navigator for modal screens outside the tab navigator or leverage the `tabBarVisible` option if available and appropriate for your React Navigation version structure (though `tabBarStyle: {display: 'none'}` is more current for v6 fine-grained control).

For screens within a stack that is itself a tab, the `options` for the `<Stack.Screen>` can influence the tab bar if carefully configured with `navigation.getParent()` or if certain options bubble up. The most straightforward way for a _specific screen_ in a nested stack to hide the tab bar is often to have a separate stack for full-screen views outside the tab navigator, or manage visibility via context/state if it needs to be dynamic for many screens.

> [!TIP]
> The `getFocusedRouteNameFromRoute` helper from `@react-navigation/native` can be useful when nesting navigators to determine the currently focused route in a child navigator, which can then be used to conditionally hide the tab bar from the parent navigator's `screenOptions`.

> 📚 **Official Documentation:**
>
> - [Configuring the header bar - React Navigation](https://reactnavigation.org/docs/header-buttons)
> - [Header styling - React Navigation](https://reactnavigation.org/docs/stack-navigator/#headerstyle)
> - [Screen options for tabs - React Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/#options)
> - [Hiding tab bar in specific screens - React Navigation](https://reactnavigation.org/docs/hiding-tabbar-in-screens)
> - [`getFocusedRouteNameFromRoute` - React Navigation](https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state)

> 🍏 **(iOS Developers):**
>
> **Comparison:** Customizing `UINavigationBar` appearance (background, title text attributes) and `UIBarButtonItem`s is analogous. For `UITabBar`, setting `tabBarItem` properties (title, image, selectedImage) and `UITabBarAppearance` is similar.

> 🤖 **(Android Developers):**
>
> **Comparison:** Styling the `Toolbar` or `AppBarLayout` (title, background, menu items) and `BottomNavigationView` (item icons, labels, colors, background) directly relates to these options.

#### Exercise: (No exercise for this section as per blueprint, but one could be added)

The blueprint does not specify an exercise for Section 7. A relevant exercise could involve:

1.  Customizing the header style (background color, title color, font weight) for a Stack Navigator.
2.  Adding a custom `headerRight` button to one of the stack screens.
3.  Customizing the `tabBarActiveTintColor`, `tabBarInactiveTintColor`, and `tabBarLabelStyle` for a Tab Navigator.
4.  Setting custom icons for each tab based on focus state.

#### Next Steps

While React Navigation offers powerful imperative and component-based ways to define navigation, Expo has introduced its own file-system-based routing solution called Expo Router. The next section will introduce you to this alternative approach.
