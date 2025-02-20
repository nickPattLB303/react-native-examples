/**
 * @module hooks/queries/useMedications
 * @description Custom hook for fetching and managing medication data
 */

import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

/**
 * @interface Medication
 * @description Interface for medication data
 */
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  isActive: boolean;
  requiresRefill: boolean;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * Generates a fake medication using Faker.js
 * @returns {Medication} A fake medication object
 */
function generateMedication(): Medication {
  return {
    id: faker.string.uuid(),
    name: faker.science.chemicalElement().name,
    dosage: `${faker.number.int({ min: 5, max: 500 })}mg`,
    frequency: faker.helpers.arrayElement(['Once daily', 'Twice daily', 'Three times daily', 'As needed']),
    isActive: faker.datatype.boolean(),
    requiresRefill: faker.datatype.boolean(),
    expiresAt: faker.date.future(),
    createdAt: faker.date.past(),
  };
}

/**
 * Simulates fetching medications from an API
 * @param {number} count - Number of medications to generate
 * @returns {Promise<Medication[]>} A promise that resolves to an array of medications
 */
async function fetchMedications(count: number = 10): Promise<Medication[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.from({ length: count }, generateMedication);
}

/**
 * Custom hook for fetching and managing medication data
 * @param {number} count - Number of medications to fetch
 * @returns {UseQueryResult<Medication[]>} Query result containing medications data and status
 * 
 * @example
 * ```tsx
 * function MedicationList() {
 *   const { data: medications, isLoading, error } = useMedications();
 *   
 *   if (isLoading) return <LoadingState message="Loading medications..." />;
 *   if (error) return <ErrorState error={error} />;
 *   
 *   return (
 *     <FlatList
 *       data={medications}
 *       renderItem={({ item }) => <MedicationListItem {...item} />}
 *       keyExtractor={item => item.id}
 *     />
 *   );
 * }
 * ```
 */
export function useMedications(count: number = 10) {
  return useQuery(['medications', count], () => fetchMedications(count), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
} 