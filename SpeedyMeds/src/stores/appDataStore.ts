import { create } from "zustand";
import type {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
} from "../types";

/**
 * Represents the state structure for the main application data.
 */
interface AppDataState {
  userProfile: UserProfile | null;
  medicationReminders: MedicationReminder[];
  prescriptions: Prescription[];
  orders: Order[];
  isLoading: boolean; // Combined loading state for simplicity
  error: Error | null;

  // Actions to update the store
  setUserProfile: (profile: UserProfile) => void;
  setMedicationReminders: (reminders: MedicationReminder[]) => void;
  setPrescriptions: (prescriptions: Prescription[]) => void;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

/**
 * Zustand store for managing global application data like user profile, prescriptions, orders, etc.
 *
 * Data is intended to be fetched via React Query and then synced to this store.
 */
const useAppDataStore = create<AppDataState>((set) => ({
  userProfile: null,
  medicationReminders: [],
  prescriptions: [],
  orders: [],
  isLoading: true, // Start in loading state
  error: null,

  setUserProfile: (profile) =>
    set({ userProfile: profile, isLoading: false, error: null }),
  setMedicationReminders: (reminders) =>
    set({ medicationReminders: reminders, isLoading: false, error: null }),
  setPrescriptions: (prescriptions) =>
    set({ prescriptions: prescriptions, isLoading: false, error: null }),
  setOrders: (orders) => set({ orders: orders, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error, isLoading: false }),
}));

export default useAppDataStore;
