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
 * 
 * @param medicationName - The name of the medication
 * @param strength - The strength/dosage of the medication
 * @param status - Current status of the prescription
 * @param daysRemaining - Number of days until refill is needed
 * @param onPressRefill - Callback when refill button is pressed
 * @param onPressDetails - Callback when details button is pressed
 * @param style - Optional additional styles for the container
 * 
 * @example
 * <MedicationListItem
 *   medicationName="Lisinopril"
 *   strength="10mg"
 *   status="active"
 *   daysRemaining={14}
 *   onPressRefill={() => handleRefill(medication.id)}
 *   onPressDetails={() => navigation.navigate('MedicationDetails', { id: medication.id })}
 * />
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
  /**
   * Renders the status badge with appropriate styling based on status
   */
  const renderStatusBadge = () => {
    // Define styling based on status
    const getStatusStyles = (): { backgroundColor: string; color: string } => {
      switch (status) {
        case 'active':
          return { backgroundColor: '#E5FFF2', color: '#00A36A' };
        case 'expired':
          return { backgroundColor: '#FFEBEB', color: '#FF3B30' };
        case 'refill-needed':
          return { backgroundColor: '#FFF5DD', color: '#D9A000' };
        case 'pending':
          return { backgroundColor: '#E5F5FF', color: '#007AFF' };
        default:
          return { backgroundColor: '#EFEFEF', color: '#555555' };
      }
    };

    const { backgroundColor, color } = getStatusStyles();

    return (
      <View style={[styles.badge, { backgroundColor }]}>
        <Text style={[styles.badgeText, { color }]}>
          {status.replace('-', ' ')}
        </Text>
      </View>
    );
  };

  /**
   * Renders the days remaining section with appropriate styling based on days left
   */
  const renderDaysRemaining = () => {
    // Determine text and color based on days remaining
    let daysText = '';
    let textColor = '#777777';

    if (daysRemaining <= 0) {
      daysText = 'Refill now';
      textColor = '#FF3B30';
    } else if (daysRemaining === 1) {
      daysText = '1 day remaining';
      textColor = '#D9A000';
    } else if (daysRemaining <= 3) {
      daysText = `${daysRemaining} days remaining`;
      textColor = '#D9A000';
    } else {
      daysText = `${daysRemaining} days remaining`;
    }

    return (
      <View style={styles.daysContainer}>
        <Text style={[styles.daysText, { color: textColor }]}>{daysText}</Text>
      </View>
    );
  };

  /**
   * Renders the action buttons (refill and details)
   */
  const renderActionButtons = () => {
    // Determine if refill button should be highlighted
    const isRefillHighlighted = daysRemaining <= 3 || status === 'refill-needed';

    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            isRefillHighlighted ? styles.actionButtonHighlighted : null
          ]}
          onPress={onPressRefill}
          accessibilityLabel="Refill prescription"
          accessibilityRole="button"
        >
          <Text 
            style={[
              styles.actionButtonText,
              isRefillHighlighted ? styles.actionButtonTextHighlighted : null
            ]}
          >
            Refill
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onPressDetails}
          accessibilityLabel="View medication details"
          accessibilityRole="button"
        >
          <Text style={styles.actionButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View 
      style={[styles.container, style]}
      accessible={true}
      accessibilityLabel={`${medicationName}, ${strength}, ${status}, ${daysRemaining} days remaining`}
      accessibilityRole="button"
    >
      {/* Medication information section */}
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.medicationName}>{medicationName}</Text>
          <Text style={styles.strength}>{strength}</Text>
        </View>
        {renderStatusBadge()}
      </View>
      
      {/* Days remaining section */}
      {renderDaysRemaining()}
      
      {/* Action buttons */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  strength: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    minWidth: 80,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  daysContainer: {
    marginVertical: 8,
    paddingVertical: 4,
  },
  daysText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButtonHighlighted: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtonTextHighlighted: {
    color: '#FFFFFF',
  },
});

export default MedicationListItem; 