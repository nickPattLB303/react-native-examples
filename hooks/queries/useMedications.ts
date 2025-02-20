/**
 * @module hooks/queries/useMedications
 * @description Custom hook for fetching and managing medication data
 */

import { useQuery, UseQueryResult } from 'react-query';
import { faker } from '@faker-js/faker';
import { useMemo } from 'react';
import { MedicationFilterType } from '@/components/medications/MedicationFilters';

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
 * @interface UseMedicationsOptions
 * @description Options for the useMedications hook
 */
export interface UseMedicationsOptions {
  /** Number of medications to generate */
  count?: number;
  /** Search query to filter medications */
  searchQuery?: string;
  /** Filter types to apply */
  filters?: MedicationFilterType[];
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
 * Filters medications based on search query and filters
 * @param {Medication[]} medications - Array of medications to filter
 * @param {string} searchQuery - Search query to filter by
 * @param {MedicationFilterType[]} filters - Filter types to apply
 * @returns {Medication[]} Filtered medications
 */
function filterMedications(
  medications: Medication[],
  searchQuery?: string,
  filters?: MedicationFilterType[]
): Medication[] {
  let filtered = medications;

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(med => 
      med.name.toLowerCase().includes(query) ||
      med.dosage.toLowerCase().includes(query) ||
      med.frequency.toLowerCase().includes(query)
    );
  }

  // Apply type filters
  if (filters?.length) {
    filtered = filtered.filter(med => {
      return filters.some(filter => {
        switch (filter) {
          case 'active':
            return med.isActive;
          case 'inactive':
            return !med.isActive;
          case 'requires_refill':
            return med.requiresRefill;
          case 'expiring_soon':
            return med.expiresAt.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000; // 30 days
          case 'recently_added':
            return Date.now() - med.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
          default:
            return true;
        }
      });
    });
  }

  return filtered;
}

/**
 * Custom hook for fetching and managing medication data
 * @param {UseMedicationsOptions} options - Hook options
 * @returns {UseQueryResult<Medication[]>} Query result containing medications data and status
 * 
 * @example
 * ```tsx
 * function MedicationList() {
 *   const [query, setQuery] = useState('');
 *   const [filters, setFilters] = useState<MedicationFilterType[]>([]);
 *   
 *   const { data: medications, isLoading, error } = useMedications({
 *     searchQuery: query,
 *     filters,
 *   });
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
export function useMedications({
  count = 10,
  searchQuery,
  filters,
}: UseMedicationsOptions = {}): UseQueryResult<Medication[]> {
  const query = useQuery(['medications', count], () => fetchMedications(count), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredData = useMemo(() => {
    if (!query.data) return [];
    return filterMedications(query.data, searchQuery, filters);
  }, [query.data, searchQuery, filters]);

  return {
    ...query,
    data: filteredData,
  };
} 