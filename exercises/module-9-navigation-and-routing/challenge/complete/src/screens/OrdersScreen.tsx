/**
 * Orders Screen
 * 
 * This screen displays a list of the user's medication orders.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Import data
import orders from '../data/orders';

export default function OrdersScreen() {
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return '#ff9800';
      case 'shipped':
        return '#2196f3';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#757575';
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return 'clock-o';
      case 'shipped':
        return 'truck';
      case 'delivered':
        return 'check-circle';
      case 'cancelled':
        return 'times-circle';
      default:
        return 'question-circle';
    }
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => alert(`Order details for ${item.id} would be shown here`)}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{item.id}</Text>
              <View style={[
                styles.statusTag,
                { backgroundColor: getStatusColor(item.status) }
              ]}>
                <FontAwesome 
                  name={getStatusIcon(item.status)} 
                  size={12} 
                  color="#ffffff" 
                />
                <Text style={styles.statusText}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.orderInfo}>
              <Text style={styles.orderDate}>Ordered on: {item.date}</Text>
              <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.orderItems}>
              <Text style={styles.itemsTitle}>Items:</Text>
              {item.items.map((orderItem, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{orderItem.medicationName}</Text>
                  <Text style={styles.itemQuantity}>x{orderItem.quantity}</Text>
                </View>
              ))}
            </View>
            
            {item.trackingNumber && (
              <View style={styles.trackingContainer}>
                <Text style={styles.trackingLabel}>Tracking:</Text>
                <Text style={styles.trackingNumber}>{item.trackingNumber}</Text>
              </View>
            )}
            
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => alert('Order details would be shown here')}
              >
                <FontAwesome name="file-text-o" size={14} color="#4a8577" />
                <Text style={styles.actionText}>Details</Text>
              </TouchableOpacity>
              
              {item.status === 'delivered' && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => alert('Reorder functionality would go here')}
                >
                  <FontAwesome name="refresh" size={14} color="#4a8577" />
                  <Text style={styles.actionText}>Reorder</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a8577',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    color: '#333333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
  },
  trackingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  trackingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginRight: 8,
  },
  trackingNumber: {
    fontSize: 14,
    color: '#666666',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#4a8577',
    marginLeft: 4,
  },
}); 