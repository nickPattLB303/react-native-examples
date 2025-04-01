import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Adjust path as needed

// Define the props type using the RootStackParamList and the screen name
type OrderDetailProps = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default OrderDetailScreen; 