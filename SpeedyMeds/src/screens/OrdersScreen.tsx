import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Adjust path as needed

// Define the props type using the RootStackParamList and the screen name
type OrdersProps = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const OrdersScreen: React.FC<OrdersProps> = ({ navigation }) => {
  const handlePress = () => {
    // Navigate to OrderDetail screen with a dummy orderId
    navigation.navigate('OrderDetail', { orderId: '12345' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders Screen</Text>
      <Button title="View Order 12345" onPress={handlePress} />
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
    marginBottom: 20, // Add some space before the button
  },
});

export default OrdersScreen; 