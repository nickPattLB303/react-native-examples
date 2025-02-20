/**
 * @module MedicationsScreen
 * @description Main medications list screen component
 * @since 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useDebounce } from '@/hooks/useDebounce';

import { ScreenContainer } from '@/components/styled/containers';
import { MedicationListItem } from '@/components/MedicationListItem';
import { MedicationSearchBar } from '@/components/medications/MedicationSearchBar';
import { MedicationFilters, MedicationFilterType } from '@/components/medications/MedicationFilters';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useMedications } from '@/hooks/queries/useMedications';

/**
 * @function MedicationsScreen
 * @description Displays a list of medications with search and filter functionality
 * @returns {React.ReactElement} A screen component showing the medications list
 */
export default function MedicationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<MedicationFilterType[]>([]);
  
  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const { data: medications = [], isLoading, error, refetch } = useMedications({
    searchQuery: debouncedSearchQuery,
    filters: selectedFilters,
  });

  const handleFilterToggle = useCallback((id: MedicationFilterType) => {
    setSelectedFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const handleMedicationPress = useCallback((id: string) => {
    router.push({
      pathname: '/(tabs)/medications/details',
      params: { id },
    });
  }, []);

  if (isLoading && !medications.length) {
    return <LoadingState message="Loading medications..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Error Loading Medications"
        description="There was a problem loading your medications. Please try again."
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  if (!medications.length) {
    if (debouncedSearchQuery || selectedFilters.length) {
      return (
        <EmptyState
          icon="pill"
          title="No Results"
          description={`No medications found${debouncedSearchQuery ? ` matching "${debouncedSearchQuery}"` : ''}${selectedFilters.length ? ' with selected filters' : ''}.`}
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedFilters([]);
          }}
        />
      );
    }

    return (
      <EmptyState
        icon="pill"
        title="No Medications"
        description="You haven't added any medications yet."
        actionLabel="Add Medication"
        onAction={() => router.push('/(tabs)/medications/details')}
      />
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <MedicationSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        isLoading={isLoading}
      />
      
      <MedicationFilters
        selectedIds={selectedFilters}
        onToggle={handleFilterToggle}
        style={styles.filters}
      />

      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <MedicationListItem
            name={item.name}
            dosage={item.dosage}
            frequency={item.frequency}
            onPress={() => handleMedicationPress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.list}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    marginVertical: 8,
  },
  list: {
    paddingBottom: 16,
  },
}); 