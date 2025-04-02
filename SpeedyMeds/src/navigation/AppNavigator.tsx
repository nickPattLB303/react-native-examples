import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
 * @property {{ orderId: string }} OrderDetail - The Order Detail screen requires an `orderId` string parameter.
 */
export type RootStackParamList = {
  MainTabs: undefined; // No params expected for the main tab navigator itself
  OrderDetail: { orderId: string }; // Expect an orderId parameter
  // Add other modal/full-screen views here if needed outside tabs
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * @description Component defining the main Bottom Tab Navigator structure.
 * It includes screens for Home, Prescriptions, Orders, and Account.
 * Headers are shown for screens within this navigator.
 * @returns {React.ReactElement} The configured Bottom Tab Navigator.
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // Show headers for tab screens (can customize per tab)
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide root stack header, tabs will show their own
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{ headerShown: true, title: "Order Details" }} // Show header for this screen
        />
        {/* Add other stack screens (modals, etc.) here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
