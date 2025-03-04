/**
 * PrescriptionSummary Component
 * 
 * A component that shows:
 * - Patient name
 * - Medication details
 * - Prescribing doctor
 * - Pharmacy location
 * - Fill history
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Define types for the component
export interface FillHistoryItem {
  date: string;
  quantity: number;
  pharmacy: string;
}

interface PrescriptionSummaryProps {
  patientName: string;
  medicationName: string;
  medicationDetails: string;
  doctor: string;
  pharmacy: string;
  fillHistory: FillHistoryItem[];
  style?: ViewStyle;
  onPressPrintDetails?: () => void;
}

/**
 * PrescriptionSummary displays comprehensive prescription information
 * 
 * @param patientName - Patient's full name
 * @param medicationName - Name of the medication
 * @param medicationDetails - Detailed instructions for the medication
 * @param doctor - Prescribing doctor's name
 * @param pharmacy - Pharmacy name and location
 * @param fillHistory - Array of fill history items
 * @param style - Optional additional styles for the container
 * @param onPressPrintDetails - Optional callback when print details is pressed
 * 
 * @example
 * <PrescriptionSummary
 *   patientName="John Smith"
 *   medicationName="Lisinopril 10mg"
 *   medicationDetails="Take 1 tablet by mouth daily for high blood pressure"
 *   doctor="Dr. Sarah Johnson"
 *   pharmacy="Pharmacy Plus, 123 Main St"
 *   fillHistory={[
 *     { date: '2023-05-15', quantity: 30, pharmacy: 'Pharmacy Plus' },
 *     { date: '2023-04-15', quantity: 30, pharmacy: 'Pharmacy Plus' }
 *   ]}
 *   onPressPrintDetails={() => handlePrintDetails()}
 * />
 */
const PrescriptionSummary: React.FC<PrescriptionSummaryProps> = ({
  patientName,
  medicationName,
  medicationDetails,
  doctor,
  pharmacy,
  fillHistory,
  style,
  onPressPrintDetails,
}) => {
  /**
   * Renders a section with title and content
   * @param title Section title
   * @param content Section content text
   */
  const renderSection = (title: string, content: string) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{content}</Text>
      </View>
    );
  };

  /**
   * Formats a date string to a more readable format
   * @param dateString Date string in YYYY-MM-DD format
   * @returns Formatted date string
   */
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return dateString;
    }
  };

  /**
   * Renders the fill history section
   */
  const renderFillHistory = () => {
    return (
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Fill History</Text>
        
        {fillHistory.length === 0 ? (
          <Text style={styles.emptyHistory}>No fill history available</Text>
        ) : (
          <FlatList
            data={fillHistory}
            keyExtractor={(item, index) => `fill-${index}`}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
                <Text style={styles.historyDetails}>
                  <Text style={styles.historyQuantity}>{item.quantity} tablets</Text> filled at{' '}
                  <Text style={styles.historyPharmacy}>{item.pharmacy}</Text>
                </Text>
              </View>
            )}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  };

  /**
   * Renders print button if onPressPrintDetails is provided
   */
  const renderPrintButton = () => {
    if (!onPressPrintDetails) return null;
    
    return (
      <TouchableOpacity 
        style={styles.printButton}
        onPress={onPressPrintDetails}
        accessibilityLabel="Print prescription details"
        accessibilityRole="button"
      >
        <Text style={styles.printButtonText}>Print Details</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View 
      style={[styles.container, style]}
      accessibilityLabel={`Prescription summary for ${patientName}, ${medicationName}`}
      accessibilityRole="header"
    >
      {/* Patient and medication information section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.medicationName}>{medicationName}</Text>
        </View>
        
        {/* Print button */}
        {renderPrintButton()}
      </View>
      
      {/* Render the individual sections */}
      {renderSection('Medication Details', medicationDetails)}
      {renderSection('Prescribing Doctor', doctor)}
      {renderSection('Pharmacy', pharmacy)}
      
      {/* Render the fill history */}
      {renderFillHistory()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 16,
    color: '#555',
  },
  printButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  printButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
    paddingVertical: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  historySection: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
  },
  historyItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#FCFCFC',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 14,
    color: '#666',
  },
  historyQuantity: {
    fontWeight: '500',
    color: '#555',
  },
  historyPharmacy: {
    fontWeight: '500',
    color: '#555',
  },
  emptyHistory: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export default PrescriptionSummary; 