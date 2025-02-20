/**
 * @module store/usePreferencesStore
 * @description User preferences state management using Zustand
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @interface PreferencesState
 * @description Interface for user preferences state
 */
export interface PreferencesState {
  /** Medication reminder settings */
  medicationReminders: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'custom';
    customFrequency?: number;
  };
  /** Order notification preferences */
  orderNotifications: {
    status: boolean;
    shipping: boolean;
    delivery: boolean;
  };
  /** Display preferences */
  display: {
    showInactiveMedications: boolean;
    defaultOrdersFilter: 'all' | 'active' | 'completed';
    compactView: boolean;
  };
  /** Actions to update preferences */
  actions: {
    setMedicationReminders: (settings: Partial<PreferencesState['medicationReminders']>) => void;
    setOrderNotifications: (settings: Partial<PreferencesState['orderNotifications']>) => void;
    setDisplay: (settings: Partial<PreferencesState['display']>) => void;
    resetPreferences: () => void;
  };
}

/**
 * Initial state for preferences
 */
const initialState: Omit<PreferencesState, 'actions'> = {
  medicationReminders: {
    enabled: true,
    frequency: 'daily',
  },
  orderNotifications: {
    status: true,
    shipping: true,
    delivery: true,
  },
  display: {
    showInactiveMedications: false,
    defaultOrdersFilter: 'active',
    compactView: false,
  },
};

/**
 * User preferences store using Zustand with persistence
 * @example
 * ```tsx
 * function MedicationSettings() {
 *   const { medicationReminders, actions } = usePreferencesStore();
 *   
 *   return (
 *     <Switch
 *       value={medicationReminders.enabled}
 *       onValueChange={(enabled) => 
 *         actions.setMedicationReminders({ enabled })
 *       }
 *     />
 *   );
 * }
 * ```
 */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setMedicationReminders: (settings) =>
          set((state) => ({
            medicationReminders: { ...state.medicationReminders, ...settings },
          })),
        setOrderNotifications: (settings) =>
          set((state) => ({
            orderNotifications: { ...state.orderNotifications, ...settings },
          })),
        setDisplay: (settings) =>
          set((state) => ({
            display: { ...state.display, ...settings },
          })),
        resetPreferences: () => set(initialState),
      },
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 