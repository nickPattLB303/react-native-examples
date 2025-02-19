import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function OrdersScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Orders</ThemedText>
      <Link href="/orders/details" asChild>
        <Button mode="contained">View Order Details</Button>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
}); 