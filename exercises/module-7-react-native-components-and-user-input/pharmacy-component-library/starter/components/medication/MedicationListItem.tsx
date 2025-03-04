/**
 * MedicationListItem Component
 * 
 * Displays a medication item in a list with:
 * - Medication name and strength
 * - Prescription status (active, expired, etc.)
 * - Days remaining
 * - Quick action buttons (refill, details)
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

// Define types for the component
export type MedicationStatus = 'active' | 'expired' | 'refill-needed' | 'pending';

interface MedicationListItemProps {
  medicationName: string;
  strength: string;
  status: MedicationStatus;
  daysRemaining: number;
  onPressRefill: () => void;
  onPressDetails: () => void;
  style?: ViewStyle;
}

/**
 * MedicationListItem displays a medication in a list format with quick actions
 */
const MedicationListItem: React.FC<MedicationListItemProps> = ({
  medicationName,
  strength,
  status,
  daysRemaining,
  onPressRefill,
  onPressDetails,
  style,
}) => {
  // TODO: Implement a function to render the status badge with appropriate colors
  const renderStatusBadge = () => {
    // Return a badge component for the status with appropriate styling
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    );
  };

  // TODO: Implement a function to render the days remaining section
  const renderDaysRemaining = () => {
    return (
      <View style={styles.daysContainer}>
        <Text style={styles.daysText}>{daysRemaining} days remaining</Text>
      </View>
    );
  };

  // TODO: Implement a function to render the action buttons (refill and details)
  const renderActionButtons = () => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onPressRefill}
        >
          <Text style={styles.actionButtonText}>Refill</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onPressDetails}
        >
          <Text style={styles.actionButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* TODO: Implement the medication information section */}
      <View style={styles.infoContainer}>
        <Text style={styles.medicationName}>{medicationName}</Text>
        <Text style={styles.strength}>{strength}</Text>
        {renderStatusBadge()}
      </View>
      
      {/* TODO: Implement the days remaining section */}
      {renderDaysRemaining()}
      
      {/* TODO: Implement the action buttons */}
      {renderActionButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  infoContainer: {
    // TODO: Style the info container
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  strength: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  badge: {
    // TODO: Style the status badge
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#EFEFEF',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  daysContainer: {
    // TODO: Style the days remaining container
    marginVertical: 8,
  },
  daysText: {
    fontSize: 14,
    color: '#777',
  },
  actionsContainer: {
    // TODO: Style the actions container
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    // TODO: Style the action button
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MedicationListItem; 