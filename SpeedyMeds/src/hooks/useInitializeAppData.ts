/**
 * Custom Hook for Initial Application Data Fetching and State Synchronization
 *
 * Purpose:
 * This hook serves as the central point for fetching the essential application data
 * required when the app loads or initializes. It leverages TanStack Query (`useQuery`)
 * for the actual data fetching and caching logic. Crucially, it then synchronizes
 * the fetched data (and loading/error states) with the global Zustand store (`useAppDataStore`).
 *
 * Architecture Rationale:
 * Instead of having individual components call `useQuery` directly for this global data,
 * this hook centralizes the fetching logic. Components then read the data directly
 * from the Zustand store. This approach offers:
 *   - Decoupling: UI components are decoupled from the data fetching mechanism. They only
 *     need to know about the Zustand store.
 *   - Centralized Management: All initial data fetching and state synchronization logic
 *     is located in one place, making it easier to manage and update.
 *   - Consistency: Ensures all parts of the app access the same, synchronized global state.
 *   - Performance: TanStack Query handles efficient caching and background updates, while
 *     Zustand provides optimized state access for components.
 *
 * Usage:
 * This hook should typically be called once near the root of the application,
 * often within the main `App.tsx` or a component rendered early in the tree,
 * to ensure data fetching begins as soon as possible. It doesn't return data directly;
 * its primary role is to perform the side effect of populating the Zustand store.
 *
 * @see https://tanstack.com/query/v5/docs/react/overview - TanStack Query (React Query) Docs
 * @see https://github.com/pmndrs/zustand - Zustand Documentation
 * @see https://react.dev/reference/react/useEffect - React `useEffect` Hook Documentation
 * @see https://react.dev/reference/react/useQuery - React Query `useQuery` Hook Documentation (Conceptual link, actual is TanStack)
 */

import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query"; // Import UseQueryResult for potential type hints if needed
import useAppDataStore from "../stores/appDataStore"; // The Zustand store hook
import { queryKeys } from "../api/queryKeys"; // Centralized query keys
import {
  fetchUserProfile,
  fetchMedicationReminders,
  fetchPrescriptions,
  fetchOrders,
} from "../api"; // Simulated API fetch functions
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types"; // Import data types

/**
 * @description Custom hook responsible for initiating data fetching for essential
 * application data using TanStack Query and synchronizing the results (data, loading, error)
 * with the global `useAppDataStore` (Zustand).
 */
export const useInitializeAppData = (): void => {
  // Get the action functions (setters) from the Zustand store.
  // We use these functions to update the global state once data is fetched or errors occur.
  const {
    setUserProfile,
    setMedicationReminders,
    setPrescriptions,
    setOrders,
    setError, // Action to set a global error state
    setLoading, // Action to set a global loading state
  } = useAppDataStore();

  // --- Data Fetching using TanStack Query (`useQuery`) ---
  // For each piece of data, we use `useQuery`. TanStack Query handles caching,
  // background refetching, loading/error states, etc.

  /**
   * Fetches User Profile data.
   * - `queryKey`: Unique identifier for this data in the cache (from `queryKeys.ts`).
   * - `queryFn`: The asynchronous function that performs the actual data fetching (from `api/index.ts`).
   * - `staleTime: Infinity`: Tells React Query that this data, once fetched successfully,
   *   is considered fresh forever and should not be automatically refetched in the background
   *   based on time. Refetching might still occur on mount, window focus, or manual invalidation.
   *   Suitable for data that rarely changes, like a user profile.
   * @see https://tanstack.com/query/v5/docs/react/guides/important-defaults - `staleTime` explanation
   */
  const {
    data: userProfile, // The fetched data (type: UserProfile | undefined)
    isFetching: isFetchingProfile, // Boolean: true if this specific query is currently fetching (including background refetches)
    error: errorProfile, // Error object if the query failed, otherwise null
  }: UseQueryResult<UserProfile, Error> = useQuery({
    // Type annotation for better clarity, though often inferred
    queryKey: queryKeys.userProfile,
    queryFn: fetchUserProfile,
    staleTime: Infinity,
  });

  /**
   * Fetches Medication Reminders.
   * - `queryFn`: Note the arrow function `() => fetchMedicationReminders(2)`. This is used
   *   when the fetch function requires arguments.
   * - `staleTime: 1000 * 60 * 5`: Data is considered fresh for 5 minutes (300,000 ms).
   *   After 5 minutes, if the data is needed again (e.g., component re-mount, window focus),
   *   React Query will return the stale data immediately but trigger a background refetch.
   */
  const {
    data: reminders,
    isFetching: isFetchingReminders,
    error: errorReminders,
  }: UseQueryResult<MedicationReminder[], Error> = useQuery({
    queryKey: queryKeys.medicationReminders,
    queryFn: () => fetchMedicationReminders(2), // Fetch 2 mock reminders
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /**
   * Fetches Prescriptions.
   * - `staleTime: 1000 * 60 * 10`: Considered fresh for 10 minutes.
   */
  const {
    data: prescriptions,
    isFetching: isFetchingPrescriptions,
    error: errorPrescriptions,
  }: UseQueryResult<Prescription[], Error> = useQuery({
    queryKey: queryKeys.prescriptions,
    queryFn: () => fetchPrescriptions(5), // Fetch 5 mock prescriptions
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  /**
   * Fetches Orders.
   * - `staleTime: 1000 * 60 * 5`: Considered fresh for 5 minutes.
   */
  const {
    data: orders,
    isFetching: isFetchingOrders,
    error: errorOrders,
  }: UseQueryResult<Order[], Error> = useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => fetchOrders(3), // Fetch 3 mock orders
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // --- State Synchronization using React `useEffect` ---
  // We use `useEffect` hooks to react to changes in the data, loading, and error
  // states returned by `useQuery` and update the central Zustand store accordingly.

  // Calculate a combined loading state for the global Zustand store.
  // The app's global `isLoading` state reflects if *any* essential query is actively fetching.
  // Note on `isFetching` vs `isLoading` from `useQuery`:
  // - `isLoading`: True only during the initial hard loading state (no data yet).
  // - `isFetching`: True during initial load AND background refetches.
  // We use `isFetching` here so the global `isLoading` state reflects any background activity,
  // which might be useful for subtle loading indicators, though `isLoading` could be used
  // if only an initial "blocking" loading state is desired.
  const isAnyQueryFetching =
    isFetchingProfile ||
    isFetchingReminders ||
    isFetchingPrescriptions ||
    isFetchingOrders;

  // Aggregate potential errors from any of the queries.
  const queryError =
    errorProfile || errorReminders || errorPrescriptions || errorOrders;

  // Effect to update the global loading state in Zustand.
  // Runs whenever `isAnyQueryFetching` or `setLoading` changes.
  useEffect(() => {
    // Call the Zustand action to update the global loading flag.
    setLoading(isAnyQueryFetching);
    // `setLoading` is included as a dependency to satisfy the `eslint-plugin-react-hooks/exhaustive-deps` rule.
    // Zustand guarantees that action functions have stable identities, so this doesn't cause unnecessary re-runs.
  }, [isAnyQueryFetching, setLoading]);

  // Effect to update the global error state in Zustand.
  // Runs whenever `queryError` or `setError` changes.
  useEffect(() => {
    if (queryError) {
      // Log the actual error for debugging purposes.
      console.error("Error fetching initial application data:", queryError);
      // Update the Zustand store with the error object.
      // Ensure we pass an actual Error instance.
      setError(
        queryError instanceof Error
          ? queryError
          : new Error("An unknown error occurred during data fetching"),
      );
    } else {
      // Optional: Clear the error state if there are no current errors.
      // setError(null); // Uncomment if errors should clear automatically once fetches succeed.
      // Leaving it commented means errors persist until explicitly cleared or overwritten by a new error,
      // which might be preferable to inform the user that *something* failed previously.
    }
    // `setError` is included as a dependency per exhaustive-deps rules (stable identity from Zustand).
  }, [queryError, setError]);

  // Effect to update the user profile in Zustand when fetched data changes.
  // Runs when `userProfile` (data from useQuery) or `setUserProfile` (Zustand action) changes.
  useEffect(() => {
    // Only update the store if the data is actually available (not undefined).
    if (userProfile) {
      setUserProfile(userProfile);
    }
    // Dependencies: `userProfile` (data) and `setUserProfile` (action, included per exhaustive-deps rule).
  }, [userProfile, setUserProfile]);

  // Effect to update medication reminders in Zustand.
  useEffect(() => {
    if (reminders) {
      setMedicationReminders(reminders);
    }
  }, [reminders, setMedicationReminders]); // Dependencies: `reminders` (data), `setMedicationReminders` (action)

  // Effect to update prescriptions in Zustand.
  useEffect(() => {
    if (prescriptions) {
      setPrescriptions(prescriptions);
    }
  }, [prescriptions, setPrescriptions]); // Dependencies: `prescriptions` (data), `setPrescriptions` (action)

  // Effect to update orders in Zustand.
  useEffect(() => {
    if (orders) {
      setOrders(orders);
    }
  }, [orders, setOrders]); // Dependencies: `orders` (data), `setOrders` (action)

  // This hook doesn't need to return anything as its purpose is to trigger
  // data fetching (via useQuery) and update the global state (via Zustand actions).
  // Components will consume the loading, error, and data states directly from useAppDataStore.
};
