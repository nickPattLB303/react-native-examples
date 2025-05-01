import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

/**
 * Represents a single prescription item in the list.
 * A simple, reusable component for displaying prescription details.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the prescription.
 * @param {string} props.status - The status of the prescription.
 * @returns {React.JSX.Element}
 */
const PrescriptionItem = ({ name, status }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemStatus}>{status}</Text>
    </View>
  );
};

/**
 * Prescriptions Screen Placeholder Component.
 *
 * Displays a list of prescriptions.
 * Demonstrates list rendering, state management with hooks, and custom components.
 *
 * Key Concepts Introduced Here:
 * - Core Components: <FlatList>
 * - Core Hooks: useState
 * - List rendering: 'data', 'renderItem', 'keyExtractor' props
 * - Custom components
 * - Keys in lists
 *
 * @returns {React.JSX.Element} The rendered prescriptions screen placeholder.
 */
export default function PrescriptionsScreen() {
  // useState Hook: Manages state within the functional component.
  // Returns the current state value and a function to update it.
  // @see https://react.dev/reference/react/useState
  const [prescriptions, setPrescriptions] = useState([
    { id: 'rx1', name: 'Lisinopril 10mg', status: 'Active' },
    { id: 'rx2', name: 'Metformin 500mg', status: 'Active' },
    { id: 'rx3', name: 'Simvastatin 20mg', status: 'Inactive' },
    { id: 'rx4', name: 'Amoxicillin 250mg', status: 'Needs Refill' },
  ]); // Initial mock data

  /**
   * Function passed to FlatList's renderItem prop.
   * Takes an individual item from the data array and returns a component to render.
   * Uses the custom <PrescriptionItem> component for display.
   *
   * @param {object} params
   * @param {object} params.item - The individual data item from the 'prescriptions' state.
   * @returns {React.JSX.Element}
   */
  const renderPrescriptionItem = ({ item }) => (
    <PrescriptionItem name={item.name} status={item.status} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescriptions Screen</Text>

      {/* FlatList: Efficiently renders scrolling lists.
       * - data: Array of data to render.
       * - renderItem: Function to render each item.
       * - keyExtractor: Function providing unique keys for items (for performance).
       * @see https://reactnative.dev/docs/flatlist
       */}
      <FlatList
        data={prescriptions}
        renderItem={renderPrescriptionItem}
        keyExtractor={(item) => item.id}
        style={{ width: '90%' }} // Basic styling for the list container
      />

      {/* --- TODOs for Development --- */}
      {/* 1. Replace mock data with data fetched from an API or state management. */}
      {/* 2. Implement pull-to-refresh functionality. */}
      {/* 3. Add press handlers to list items for navigation or actions. */}
      {/* 4. Implement filtering or sorting options. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20, // Add padding to avoid list touching the title directly
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Space below title
  },
  // Styles for the custom PrescriptionItem component
  listItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row', // Arrange name and status horizontally
    justifyContent: 'space-between', // Push name and status apart
    alignItems: 'center',
    width: '100%',
  },
  itemName: {
    fontSize: 16,
  },
  itemStatus: {
    fontSize: 14,
    color: 'grey',
  },
});
