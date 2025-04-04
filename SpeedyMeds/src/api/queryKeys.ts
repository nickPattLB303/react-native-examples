/**
 * Centralized Query Keys for TanStack Query (React Query)
 *
 * This file defines constants for the query keys used throughout the SpeedyMeds application
 * with TanStack Query (`@tanstack/react-query`).
 *
 * What are Query Keys?
 * Query keys are essential for TanStack Query. They act as unique identifiers for the data
 * being fetched and cached. TanStack Query uses these keys internally to:
 *   - Uniquely identify cached data.
 *   - Determine when data needs refetching.
 *   - Automatically manage cache invalidation and updates after mutations.
 *
 * Structure:
 * Query keys are typically arrays.
 *   - The first element is often a string representing the general data type (e.g., 'userProfile', 'prescriptions').
 *   - Subsequent elements can provide more specific identifiers, like IDs or filters, if needed
 *     to differentiate between different queries for the same type of data (e.g., ['prescriptions', { status: 'active' }]).
 *     In this project, our current keys are simple as we fetch general lists or single items.
 *
 * Why Centralize?
 * Defining keys in a central location like this offers several advantages:
 *   - Consistency: Ensures the same key is used everywhere for the same data.
 *   - Refactorability: Makes it easy to update keys if needed.
 *   - Reduced Typos: Prevents errors caused by mistyping keys in different parts of the code.
 *   - Collocation: Keeps all data identifiers together for easy reference.
 *
 * `as const` Assertion:
 * We use the TypeScript `as const` assertion for each key array. This tells TypeScript
 * to infer the narrowest possible type for the array (a tuple with specific string literal types)
 * rather than a general `string[]`. This improves type safety when using these keys with
 * TanStack Query hooks and functions, allowing for better autocompletion and type checking,
 * especially when dealing with more complex keys involving variables.
 *
 * @see https://tanstack.com/query/v5/docs/react/guides/query-keys - Official TanStack Query Keys Guide
 * @see https://tanstack.com/query/v5/docs/react/typescript#using-as-const - Using `as const` with Query Keys
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions - TypeScript `const` Assertions
 */

/**
 * @description An object containing all the query keys used in the application.
 * Each property corresponds to a specific piece of server state managed by TanStack Query.
 */
export const queryKeys = {
  /**
   * @description Query key for fetching the current user's profile data.
   * Used by `useQuery` in `useInitializeAppData` and potentially for refetching/invalidating
   * after profile updates.
   */
  userProfile: ["userProfile"] as const,

  /**
   * @description Query key for fetching the list of medication reminders for the user.
   */
  medicationReminders: ["medicationReminders"] as const,

  /**
   * @description Query key for fetching the list of user's prescriptions.
   * Used by `useQuery` in `useInitializeAppData`. Could be extended if filtering/pagination
   * were added (e.g., `prescriptions: (filters) => ['prescriptions', filters] as const`).
   */
  prescriptions: ["prescriptions"] as const,

  /**
   * @description Query key for fetching the list of user's orders.
   */
  orders: ["orders"] as const,

  // Add more query keys here as needed for new data types.
  // Example for fetching a specific order detail:
  // orderDetail: (orderId: string) => ['orders', orderId] as const,
};
