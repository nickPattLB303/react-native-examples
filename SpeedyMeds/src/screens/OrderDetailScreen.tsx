import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator"; // Adjust path as needed

/**
 * @description Props for the OrderDetailScreen.
 * Includes navigation props provided by React Navigation's NativeStackScreenProps
 * and expects an `orderId` string within the route parameters.
 * @typedef {object} OrderDetailProps
 * @property {NativeStackScreenProps<RootStackParamList, "OrderDetail">['route']} route - Route object containing parameters.
 * @property {NativeStackScreenProps<RootStackParamList, "OrderDetail">['navigation']} navigation - Navigation object.
 */
type OrderDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "OrderDetail"
>;

/**
 * @description Screen component to display details for a specific order.
 * Retrieves the `orderId` from the route parameters passed during navigation.
 * @param {OrderDetailProps} props - The component props.
 * @param {object} props.route - The route object provided by React Navigation.
 * @param {object} props.route.params - Parameters passed to this route.
 * @param {string} props.route.params.orderId - The unique identifier for the order to display.
 * @returns {React.ReactElement} The rendered Order Detail screen.
 */
const OrderDetailScreen: React.FC<OrderDetailProps> = ({ route }) => {
  // Access the route params
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Detail Screen</Text>
      <Text>Order ID: {orderId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default OrderDetailScreen;
