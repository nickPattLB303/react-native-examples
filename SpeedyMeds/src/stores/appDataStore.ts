/**
 * Zustand Store for Global Application Data
 *
 * @file This file defines the central state management store for the SpeedyMeds application using Zustand.
 * @module stores/appDataStore
 *
 * @purpose This store holds data that needs to be accessed or modified by multiple components
 * across the application, such as user information, prescriptions, orders, and global loading/error states.
 * Using a central store avoids prop drilling (passing data down through many component layers).
 *
 * @dependencies
 * - Zustand (`create` function): The core library used to create the store.
 * - Internal:
 *   - `../types`: Provides the TypeScript definitions (`UserProfile`, `Prescription`, etc.) for the data stored.
 *
 * @key_concepts Zustand:
 *   - **Store:** A single object containing the application's state and functions (actions) to update it.
 *   - **`create`:** The primary function from Zustand used to build a store. It takes a setup function.
 *   - **`set`:** A function provided *inside* the setup function. Actions use `set` to update the state immutably (meaning it creates a new state object instead of modifying the old one). `set` automatically merges the changes.
 *   - **Hook (`useAppDataStore`):** Zustand generates a React hook (`useAppDataStore` in this case) from `create`. Components use this hook to access the store's state and actions.
 *   - **Selectors:** When using the hook in a component, you typically provide a selector function (e.g., `state => state.userProfile`). This tells Zustand to only re-render the component if *that specific piece* of state changes, which is great for performance.
 *
 * @data_flow in this App:
 *   1. **Fetching:** Data (like profile, prescriptions) is initially fetched using TanStack Query (React Query) within the `useInitializeAppData` custom hook.
 *      *See: `../hooks/useInitializeAppData.ts`*
 *   2. **Observing:** The `useInitializeAppData` hook monitors the status (loading, success, error) of those data fetches.
 *   3. **Updating Store:** Based on the fetch status, `useInitializeAppData` calls the action functions defined *in this file* (e.g., `setPrescriptions`, `setError`, `setLoading`).
 *   4. **State Change:** This Zustand store updates its internal state (`prescriptions`, `error`, `isLoading`, etc.).
 *   5. **UI Update:** Components that are subscribed to this store via the `useAppDataStore` hook (and potentially using selectors) will automatically re-render if the relevant state slice has changed.
 *
 * @see {@link https://github.com/pmndrs/zustand | Zustand Documentation} - Official Zustand docs.
 * @see {@link ../hooks/useInitializeAppData.ts | useInitializeAppData Hook} - Responsible for fetching data and populating this store.
 * @see {@link ../types/index.ts | Project Type Definitions} - Defines the shapes of `UserProfile`, `Prescription`, etc.
 */

import { create } from "zustand"; // Import the main function from Zustand to create the store
// Import the TypeScript types for the data structures we'll be storing.
// Using specific types makes the store type-safe and easier to understand.
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types";

/**
 * Defines the structure (the "shape") of the state managed by this Zustand store.
 *
 * @description This interface lists all the pieces of data (`userProfile`, `prescriptions`, etc.)
 * and the functions (`setUserProfile`, `setLoading`, etc.) that will be available in the store.
 * Exporting this interface allows other parts of the application (like tests) to understand
 * the store's structure.
 *
 * @interface AppDataState
 */
export interface AppDataState {
  // --- State Slices ---
  // These properties hold the actual application data.

  /**
   * The profile information for the currently logged-in user.
   * It's `null` initially and when no user is loaded or if there was an error fetching it.
   * @type {UserProfile | null}
   */
  userProfile: UserProfile | null;

  /**
   * An array containing the user's medication reminders.
   * Starts as an empty array `[]`.
   * @type {MedicationReminder[]}
   */
  medicationReminders: MedicationReminder[];

  /**
   * An array containing the user's prescriptions.
   * Starts as an empty array `[]`.
   * @type {Prescription[]}
   */
  prescriptions: Prescription[];

  /**
   * An array containing the user's past and present orders.
   * Starts as an empty array `[]`.
   * @type {Order[]}
   */
  orders: Order[];

  // --- Metadata ---
  // These properties provide information *about* the state, like loading or error status.

  /**
   * A flag indicating if the essential application data (profile, prescriptions, etc.)
   * is currently being fetched for the first time.
   * Set to `true` initially, and managed by `setLoading` and `setError` actions,
   * usually triggered by the `useInitializeAppData` hook.
   * UI components can use this to show a global loading indicator.
   * @type {boolean}
   */
  isLoading: boolean;

  /**
   * Holds an `Error` object if fetching the initial application data failed.
   * It's `null` if there's no error or if data is still loading.
   * UI components can use this to show a global error message.
   * @type {Error | null}
   */
  error: Error | null;

  // --- Actions (State Modifiers) ---
  // These are functions defined within the store that are the *only* way to modify the state.
  // They typically call the `set` function provided by Zustand.

  /**
   * Action to update the `userProfile` slice of the state.
   * @param {UserProfile} profile - The new user profile data.
   * @returns {void}
   */
  setUserProfile: (profile: UserProfile) => void;

  /**
   * Action to update the `medicationReminders` slice of the state.
   * @param {MedicationReminder[]} reminders - The new array of reminders.
   * @returns {void}
   */
  setMedicationReminders: (reminders: MedicationReminder[]) => void;

  /**
   * Action to update the `prescriptions` slice of the state.
   * @param {Prescription[]} prescriptions - The new array of prescriptions.
   * @returns {void}
   */
  setPrescriptions: (prescriptions: Prescription[]) => void;

  /**
   * Action to update the `orders` slice of the state.
   * @param {Order[]} orders - The new array of orders.
   * @returns {void}
   */
  setOrders: (orders: Order[]) => void;

  /**
   * Action to explicitly set the global `isLoading` state.
   * @param {boolean} loading - The new loading status.
   * @returns {void}
   */
  setLoading: (loading: boolean) => void;

  /**
   * Action to explicitly set or clear the global `error` state.
   * Note: Setting an error implicitly sets `isLoading` to `false`.
   * @param {Error | null} error - The `Error` object or `null` to clear the error.
   * @returns {void}
   */
  setError: (error: Error | null) => void;
}

/**
 * Creates the Zustand store instance for managing global application data.
 *
 * @description This is where the store is actually created using Zustand's `create` function.
 * - `create<AppDataState>`: We provide our `AppDataState` interface to `create` for TypeScript checking.
 *   This ensures our initial state and actions match the defined structure.
 * - `(set) => ({ ... })`: This is the "creator function". It receives `set` as an argument.
 *   - `set`: The function provided by Zustand to update the state. You pass it an object
 *     containing the state slices you want to change. It merges this object with the
 *     current state immutably (creating a new state object).
 *   - `{ ... }`: The object returned by the creator function defines:
 *     1. **Initial State:** The starting values for all state properties (`userProfile: null`, `isLoading: true`, etc.).
 *     2. **Action Implementations:** The actual code for each action function defined in `AppDataState`.
 *
 * The result of `create` is the custom hook (`useAppDataStore`) that components will use.
 *
 * @see {@link https://github.com/pmndrs/zustand#first-create-a-store | Zustand `create` API}
 */
const useAppDataStore = create<AppDataState>((set) => ({
  // --- Initial State Values ---
  userProfile: null, // Start with no user profile loaded
  medicationReminders: [], // Start with empty lists
  prescriptions: [],
  orders: [],
  isLoading: true, // Assume data is loading when the app starts and the store is initialized
  error: null, // Start with no error

  // --- Action Implementations ---
  // These functions define *how* the state is updated when an action is called.
  // They all use the `set` function provided by the `create` call.

  /** Sets the user profile in the state */
  setUserProfile: (profile) => set({ userProfile: profile }), // Only updates userProfile

  /** Sets the medication reminders in the state */
  setMedicationReminders: (reminders) =>
    set({ medicationReminders: reminders }), // Only updates medicationReminders

  /** Sets the prescriptions in the state */
  setPrescriptions: (prescriptions) => set({ prescriptions: prescriptions }), // Only updates prescriptions

  /** Sets the orders in the state */
  setOrders: (orders) => set({ orders: orders }), // Only updates orders

  /**
   * Sets the global loading state.
   * Typically called by `useInitializeAppData` when fetching starts or finishes.
   */
  setLoading: (loading) => set({ isLoading: loading }), // Updates isLoading

  /**
   * Sets the global error state.
   * If an error occurs during initial data load, `useInitializeAppData` calls this.
   * Setting an error also automatically sets `isLoading` to `false` because
   * the loading process has effectively ended (even if unsuccessfully).
   */
  setError: (error) => set({ error: error, isLoading: false }), // Updates error AND isLoading
}));

// Export the custom hook generated by `create`.
// Components will import this hook to interact with the store:
// `import useAppDataStore from './stores/appDataStore';`
// `const prescriptions = useAppDataStore(state => state.prescriptions);`
// `const setLoading = useAppDataStore(state => state.setLoading);`
export default useAppDataStore;
