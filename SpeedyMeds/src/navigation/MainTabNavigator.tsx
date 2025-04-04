import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Import screen components & the nested Orders stack navigator
import HomeScreen from "../screens/HomeScreen";
import PrescriptionsScreen from "../screens/PrescriptionsScreen";
import AccountScreen from "../screens/AccountScreen";
import OrdersStackNavigator from "./OrdersStackNavigator"; // Import the nested stack

// Import the specific ParamList type for this tab navigator
import type { BottomTabParamList } from "./types";

/**
 * Creates a Bottom Tab Navigator instance.
 * We pass the `BottomTabParamList` as a generic type argument to `createBottomTabNavigator`.
 * This provides type-checking for screen names used within this tab navigator.
 * @see https://reactnavigation.org/docs/bottom-tab-navigator/ - Official Bottom Tab Navigator docs.
 */
const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * @description Defines the React Native component for the main Bottom Tab Navigator.
 * This navigator displays the primary sections of the app (Home, Prescriptions, Orders, Account)
 * as tabs at the bottom of the screen. The 'Orders' tab renders a nested Stack Navigator.
 * It also configures the icons for each tab.
 *
 * @returns {React.ReactElement} The configured Bottom Tab Navigator component.
 */
function MainTabNavigator(): React.ReactElement {
  /**
   * @description Configuration options applied to all screens within the Bottom Tab Navigator.
   * This function receives the `route` and `navigation` objects for each screen, allowing
   * options to be set dynamically based on the current route.
   * @param {object} props - Props provided by React Navigation.
   * @param {object} props.route - The route object for the current screen.
   * @returns {BottomTabNavigationOptions} The configuration options for the screen.
   * @see https://reactnavigation.org/docs/screen-options-resolution/ - How screen options are resolved.
   */
  const screenOptions = ({
    route,
  }: {
    route: any; // Using 'any' here as specific route type isn't strictly needed for this logic
  }): BottomTabNavigationOptions => ({
    // `headerShown: true` means screens rendered directly by this tab navigator
    // (Home, Prescriptions, Account) will show a header bar by default.
    // The header for the 'Orders' tab is explicitly hidden in its `Tab.Screen` options
    // because the nested `OrdersStackNavigator` manages its own headers.
    headerShown: true,

    /**
     * @description Function to render the icon for each tab.
     * @param {object} iconProps - Props provided by React Navigation for the icon.
     * @param {boolean} iconProps.focused - Whether the tab is currently active.
     * @param {string} iconProps.color - The color to use for the icon (managed by the navigator's theme/options).
     * @param {number} iconProps.size - The size to use for the icon.
     * @returns {React.ReactElement} The icon component to render.
     * @see https://reactnavigation.org/docs/bottom-tab-navigator/#tabbaricon - `tabBarIcon` documentation.
     * @see https://icons.expo.fyi/ - Directory of icons available in `@expo/vector-icons`.
     */
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }): React.ReactElement => {
      // Determine the icon name based on the route name and focus state.
      let iconName: React.ComponentProps<
        typeof MaterialCommunityIcons
      >["name"] = "help-circle"; // Default icon if no match

      if (route.name === "Home") {
        iconName = focused ? "view-dashboard" : "view-dashboard-outline";
      } else if (route.name === "Prescriptions") {
        // Using the same solid pill icon regardless of focus state for this example.
        iconName = "pill";
      } else if (route.name === "Orders") {
        // Note: This 'Orders' route corresponds to the entire OrdersStackNavigator.
        iconName = focused ? "receipt" : "script-text-outline";
      } else if (route.name === "Account") {
        iconName = focused ? "account-circle" : "account-circle-outline";
      }

      // Return the icon component from MaterialCommunityIcons.
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    },

    // --- Optional Tab Bar Styling ---
    // These options can be uncommented and customized to change the tab bar appearance.
    // `tabBarActiveTintColor`: Sets the color of the icon and label for the active tab.
    // tabBarActiveTintColor: 'tomato',
    // `tabBarInactiveTintColor`: Sets the color for inactive tabs.
    // tabBarInactiveTintColor: 'gray',
    // `tabBarStyle`: Apply custom styles to the tab bar container itself.
    // tabBarStyle: { backgroundColor: '#eee' },
    // `tabBarLabelStyle`: Apply custom styles to the tab labels.
    // tabBarLabelStyle: { fontSize: 12 },
    // `tabBarShowLabel`: Whether to show the labels below the icons (default is true).
    // tabBarShowLabel: false,
  });

  return (
    // The Tab.Navigator component wraps the screen definitions for the bottom tabs.
    // `screenOptions` applies the configuration defined above to all tabs.
    <Tab.Navigator screenOptions={screenOptions}>
      {/* Define the Home tab screen */}
      <Tab.Screen
        // `name` must match a key in `BottomTabParamList` ('Home').
        name="Home"
        // `component` is the React component to render for this tab.
        component={HomeScreen}
        // `options` could be used here to override `screenOptions` specifically for Home, e.g., options={{ title: 'Dashboard' }}
      />
      {/* Define the Prescriptions tab screen */}
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />

      {/* Define the Orders tab screen */}
      {/* This tab renders the entire OrdersStackNavigator */}
      <Tab.Screen
        name="Orders"
        // The `component` is the navigator component we imported.
        component={OrdersStackNavigator}
        // **Important:** We set `headerShown: false` here specifically for the Orders tab.
        // This prevents the Tab Navigator from showing its *own* header *above* the
        // headers already managed *within* the OrdersStackNavigator. This avoids double headers.
        options={{ headerShown: false }}
      />
      {/* Define the Account tab screen */}
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// Export the component for use in the Root Navigator (AppNavigator).
export default MainTabNavigator;
