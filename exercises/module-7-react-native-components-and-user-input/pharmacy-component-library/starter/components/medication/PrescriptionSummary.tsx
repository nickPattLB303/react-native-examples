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
}

/**
 * PrescriptionSummary displays comprehensive prescription information
 */
const PrescriptionSummary: React.FC<PrescriptionSummaryProps> = ({
  patientName,
  medicationName,
  medicationDetails,
  doctor,
  pharmacy,
  fillHistory,
  style,
}) => {
  // TODO: Implement a function to render a section with title and content
  const renderSection = (title: string, content: string) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{content}</Text>
      </View>
    );
  };

  // TODO: Implement a function to render the fill history section
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
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyDetails}>
                  {item.quantity} filled at {item.pharmacy}
                </Text>
              </View>
            )}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* TODO: Implement the patient and medication information section */}
      <View style={styles.header}>
        <Text style={styles.patientName}>{patientName}</Text>
        <Text style={styles.medicationName}>{medicationName}</Text>
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
    // TODO: Style the header section
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationName: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  section: {
    // TODO: Style the section container
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  historySection: {
    // TODO: Style the history section
    marginTop: 8,
  },
  historyItem: {
    // TODO: Style the history item
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 6,
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyHistory: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
});

export default PrescriptionSummary; 