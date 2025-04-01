import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your placeholder screens
import HomeScreen from "../screens/HomeScreen";
import PrescriptionsScreen from "../screens/PrescriptionsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import AccountScreen from "../screens/AccountScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

// Define type checking for the navigators
// Root stack includes the main TabNavigator and any screens outside the tabs (like OrderDetail)
export type RootStackParamList = {
  MainTabs: undefined; // No params expected for the main tab navigator itself
  OrderDetail: { orderId: string }; // Expect an orderId parameter
  // Add other modal/full-screen views here if needed outside tabs
};

// Define type checking for the screens within the Bottom Tab Navigator
export type BottomTabParamList = {
  Home: undefined;
  Prescriptions: undefined;
  Orders: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Define the Bottom Tab Navigator component
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

// Define the Root Stack Navigator component
function AppNavigator() {
  return (
    <NavigationContainer>
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
