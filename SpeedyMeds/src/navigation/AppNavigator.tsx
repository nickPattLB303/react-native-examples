import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; // Import icons
// Import your placeholder screens
import HomeScreen from "../screens/HomeScreen";
import PrescriptionsScreen from "../screens/PrescriptionsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import AccountScreen from "../screens/AccountScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

/**
 * @description Defines the parameters expected by each screen in the root Native Stack Navigator.
 * The root stack contains the main `MainTabs` navigator and any screens presented
 * modally or pushed on top of the tab navigator, such as `OrderDetail`.
 * @property {undefined} MainTabs - Represents the nested Bottom Tab Navigator. No parameters are passed to it directly.
 * // OrderDetail is now nested within the Orders stack inside MainTabs
 */
export type RootStackParamList = {
  MainTabs: undefined; // No params expected for the main tab navigator itself
  // Add other modal/full-screen views here if needed outside tabs (e.g., SettingsModal)
};

/**
 * @description Defines the parameters expected by each screen within the Bottom Tab Navigator (`MainTabs`).
 * Currently, none of the tab screens expect any parameters.
 * @property {undefined} Home - The Home/Dashboard screen.
 * @property {undefined} Prescriptions - The Prescriptions screen.
 * @property {undefined} Orders - The Orders screen.
 * @property {undefined} Account - The Account screen.
 */
export type BottomTabParamList = {
  Home: undefined;
  Prescriptions: undefined;
  Orders: undefined;
  Account: undefined;
};

// Define ParamList for the new Orders Stack
export type OrdersStackParamList = {
  OrdersList: undefined; // The main Orders screen
  OrderDetail: { orderId: string }; // The Order Detail screen
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();

// --- Orders Stack Navigator ---
/**
 * @description Navigator specifically for the Orders section, containing the list and detail screens.
 * @returns {React.ReactElement} The configured Orders Stack Navigator.
 */
function OrdersNavigator() {
  return (
    <OrdersStack.Navigator
      // Keep headers consistent with other tabs, or customize as needed
      screenOptions={{
        headerShown: true, // Or false if the tab navigator shows the header
      }}
    >
      <OrdersStack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={{ title: "Your Orders" }} // Set header title for the list screen
      />
      <OrdersStack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "Order Details" }} // Set header title for the detail screen
      />
    </OrdersStack.Navigator>
  );
}

// --- Bottom Tab Navigator ---
/**
 * @description Component defining the main Bottom Tab Navigator structure.
 * It includes screens for Home, Prescriptions, the Orders stack, and Account.
 * Configures icons for each tab.
 * @returns {React.ReactElement} The configured Bottom Tab Navigator.
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, // Show headers for tab screens (Orders stack manages its own)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<
            typeof MaterialCommunityIcons
          >["name"] = "help-circle"; // Default icon

          if (route.name === "Home") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          } else if (route.name === "Prescriptions") {
            iconName = focused ? "pill" : "pill"; // Using same for focused/unfocused
          } else if (route.name === "Orders") {
            iconName = focused ? "receipt" : "script-text-outline"; // Use script-text-outline for unfocused
          } else if (route.name === "Account") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        // Optional: Customize active/inactive tint colors if needed
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
      {/* Orders tab now renders the OrdersNavigator stack */}
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{ headerShown: false }} // Important: Hide Tab header for the Orders stack
      />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

/**
 * @description Props for the main AppNavigator component.
 * @property {Theme} navigationTheme - The navigation theme object (from `@react-navigation/native`)
 *                                     to be applied to the NavigationContainer.
 */
interface AppNavigatorProps {
  navigationTheme: Theme;
}

/**
 * @description The main application navigator component.
 * Sets up the `NavigationContainer` with the provided theme and defines the
 * root `NativeStackNavigator`. The root stack contains the `MainTabNavigator`
 * and other screens like `OrderDetail`.
 * @param {AppNavigatorProps} props - Component props.
 * @param {Theme} props.navigationTheme - The theme to apply to the NavigationContainer.
 * @returns {React.ReactElement} The main application navigator.
 */
function AppNavigator({ navigationTheme }: AppNavigatorProps) {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false, // Hide root stack header; headers managed by nested navigators
        }}
      >
        <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
        {/* OrderDetail Screen is removed from here - it's inside OrdersNavigator now */}
        {/* Add other root stack screens (modals, etc.) here if needed */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
