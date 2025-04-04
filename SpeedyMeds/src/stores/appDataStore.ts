/**
 * Zustand Store for Global Application Data
 *
 * This file defines a Zustand store responsible for holding the main application data
 * that needs to be accessible globally across different components and screens.
 * Zustand is a small, fast, and scalable state management solution for React.
 *
 * Key Concepts:
 *   - Store: A central object holding the state and actions to modify it.
 *   - State: The data itself (e.g., user profile, lists of prescriptions/orders).
 *   - Actions: Functions defined within the store that are used to update the state.
 *   - Hook-based: Components access the store using the generated hook (`useAppDataStore`).
 *   - Selectors: Components typically select only the specific pieces of state they need,
 *     which optimizes re-renders.
 *
 * Data Flow in this App:
 *   1. Data is fetched using TanStack Query (React Query) within the `useInitializeAppData` hook.
 *   2. The `useInitializeAppData` hook observes the results from TanStack Query.
 *   3. When data is successfully fetched or errors occur, `useInitializeAppData` calls the
 *      appropriate action functions (defined below) in *this* Zustand store.
 *   4. This store updates its state (e.g., `userProfile`, `prescriptions`, `isLoading`, `error`).
 *   5. UI components subscribe to this store using `useAppDataStore` and re-render when
 *      the relevant parts of the state change.
 *
 * @module stores/appDataStore
 * @see https://github.com/pmndrs/zustand - Zustand Documentation
 * @see hooks/useInitializeAppData - Hook responsible for populating this store.
 * @see types/index - Defines the data structures stored here.
 */

import { create } from "zustand";
// Import the TypeScript types for the data structures being stored.
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types";

/**
 * @description Defines the structure (shape) of the state managed by this Zustand store.
 * It includes slices for different data types and associated metadata like loading/error states.
 * It also defines the signatures for the action functions used to modify the state.
 * @interface AppDataState
 */
export interface AppDataState {
  // Add export keyword
  // --- State Slices ---
  /** The currently logged-in user's profile information. Null if not loaded or error. */
  userProfile: UserProfile | null;
  /** An array of medication reminders for the user. */
  medicationReminders: MedicationReminder[];
  /** An array of the user's prescriptions. */
  prescriptions: Prescription[];
  /** An array of the user's orders. */
  orders: Order[];

  // --- Metadata ---
  /**
   * A boolean flag indicating if any of the initial core application data is currently being fetched.
   * This is typically set to `true` initially and managed by the `useInitializeAppData` hook.
   * Components can use this to display global loading indicators.
   */
  isLoading: boolean;
  /**
   * Holds an Error object if any of the initial data fetches failed, otherwise null.
   * Components can use this to display global error messages.
   */
  error: Error | null;

  // --- Actions (State Modifiers) ---
  /** Action to update the user profile state slice. */
  setUserProfile: (profile: UserProfile) => void;
  /** Action to update the medication reminders state slice. */
  setMedicationReminders: (reminders: MedicationReminder[]) => void;
  /** Action to update the prescriptions state slice. */
  setPrescriptions: (prescriptions: Prescription[]) => void;
  /** Action to update the orders state slice. */
  setOrders: (orders: Order[]) => void;
  /** Action to explicitly set the global loading state. */
  setLoading: (loading: boolean) => void;
  /** Action to explicitly set or clear the global error state. */
  setError: (error: Error | null) => void;
}

/**
 * Creates the Zustand store for managing global application data.
 *
 * `create<AppDataState>((set) => ({ ... }))` initializes the store.
 *   - `<AppDataState>` provides TypeScript type safety for the store's state and actions.
 *   - `(set)`: The function passed to `create` receives the `set` function as an argument.
 *     The `set` function is used within actions to update the store's state. It merges
 *     the provided object with the existing state immutably.
 *   - `{ ... }`: The object returned defines the initial state of the store and the
 *     implementation of the action functions.
 *
 * @see https://github.com/pmndrs/zustand#first-create-a-store - Zustand `create` API
 */
const useAppDataStore = create<AppDataState>((set) => ({
  // --- Initial State ---
  userProfile: null, // Start with no user profile loaded
  medicationReminders: [], // Start with empty arrays for lists
  prescriptions: [],
  orders: [],
  isLoading: true, // Assume data is loading initially when the store is created
  error: null, // Start with no error

  // --- Action Implementations ---
  // Each action calls the `set` function provided by Zustand to update state.
  // Note: Individual data setters (`setUserProfile`, `setMedicationReminders`, etc.)
  // only update their specific slice of the state. The global `isLoading` and `error`
  // states are managed separately by the `setLoading` and `setError` actions,
  // typically driven by the `useInitializeAppData` hook based on the overall fetch status.

  setUserProfile: (profile) => set({ userProfile: profile }),

  setMedicationReminders: (reminders) =>
    set({ medicationReminders: reminders }), // Example: Just setting reminders

  setPrescriptions: (prescriptions) => set({ prescriptions: prescriptions }),

  setOrders: (orders) => set({ orders: orders }),

  // Action to specifically control the global loading flag.
  setLoading: (loading) => set({ isLoading: loading }),

  // Action to specifically control the global error flag.
  // Setting an error also implicitly sets isLoading to false.
  setError: (error) => set({ error: error, isLoading: false }),
}));

// Export the custom hook generated by `create`. Components will import and use this hook.
export default useAppDataStore;
