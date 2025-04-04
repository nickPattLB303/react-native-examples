import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

// Import screen components that belong to this stack
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

// Import the specific ParamList type for this stack from the central types file
import type { OrdersStackParamList } from "./types";

/**
 * Creates a Native Stack Navigator instance specifically for the Orders section.
 * We pass the `OrdersStackParamList` as a generic type argument to `createNativeStackNavigator`.
 * This provides type-checking for screen names and parameters used within this stack.
 *
 * `createNativeStackNavigator` uses native navigation primitives (UIViewController on iOS, Fragment on Android)
 * for performance and native look-and-feel.
 * @see https://reactnavigation.org/docs/native-stack-navigator/ - Official Native Stack Navigator docs.
 */
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();

/**
 * @description Defines the React Native component responsible for the navigation stack
 * within the "Orders" section of the application. It includes the screen for listing
 * orders (`OrdersList`) and the screen for viewing order details (`OrderDetail`).
 *
 * This component is typically nested within another navigator (like a Bottom Tab Navigator).
 *
 * @returns {React.ReactElement} The configured Native Stack Navigator component for the Orders section.
 */
function OrdersStackNavigator(): React.ReactElement {
  // Define default screen options for all screens within this *specific* stack.
  // These options can be overridden by individual screens using the `options` prop.
  const screenOptions: NativeStackNavigationOptions = {
    // `headerShown: true` means that each screen in this stack will display a header bar by default.
    // If this stack is nested inside a Tab navigator where the Tab navigator *already* shows a header,
    // you might set this to `false` to avoid double headers. In our case, the Tab navigator
    // hides its own header for the 'Orders' tab (see MainTabNavigator.tsx), so we show headers here.
    headerShown: true,
    // You could add other stack-wide options here, e.g.:
    // headerStyle: { backgroundColor: '#f4511e' },
    // headerTintColor: '#fff',
    // headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    // The Navigator component wraps all the screen definitions for this stack.
    <OrdersStack.Navigator
      initialRouteName="OrdersList"
      screenOptions={screenOptions}
    >
      {/* Define the first screen in the stack: the Orders List */}
      <OrdersStack.Screen
        // `name` must match a key defined in `OrdersStackParamList` ('OrdersList').
        // This is used for navigation actions (e.g., navigation.navigate('OrdersList')).
        name="OrdersList"
        // `component` specifies the React component to render for this screen.
        component={OrdersScreen}
        // `options` allows customizing the appearance and behavior of this specific screen.
        // Here, we set a custom title for the header bar.
        options={{ title: "Your Orders" }}
      />
      {/* Define the second screen in the stack: the Order Detail */}
      <OrdersStack.Screen
        // `name` must match a key defined in `OrdersStackParamList` ('OrderDetail').
        name="OrderDetail"
        // `component` specifies the React component to render.
        component={OrderDetailScreen}
        // `options` sets a custom title for this screen's header.
        // It could also receive a function to dynamically set options based on `route` params:
        // options={({ route }) => ({ title: `Order #${route.params.orderId}` })}
        options={{ title: "Order Details" }}
      />
      {/* Add more screens specific to the Orders flow here if needed in the future */}
    </OrdersStack.Navigator>
  );
}

// Export the component for use in other parts of the application (specifically, MainTabNavigator).
export default OrdersStackNavigator;
