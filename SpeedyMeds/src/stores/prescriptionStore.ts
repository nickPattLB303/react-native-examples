/**
 * @fileoverview Zustand store for managing prescription data.
 */
import { create } from "zustand";
import { Prescription } from "../types";

/**
 * Interface for the Prescription store state and actions.
 * @interface PrescriptionState
 */
interface PrescriptionState {
  prescriptions: Prescription[];
  setPrescriptions: (prescriptions: Prescription[]) => void;
  addPrescription: (prescription: Prescription) => void; // Example action
}

/**
 * Zustand store hook for prescriptions.
 * @param {Function} set - Zustand setter function.
 * @param {Function} get - Zustand getter function.
 * @returns {PrescriptionState} The store state and actions.
 */
const usePrescriptionStore = create<PrescriptionState>()((set, get) => ({
  prescriptions: [],
  /**
   * Sets the entire list of prescriptions.
   * @param {Prescription[]} prescriptions - The array of prescriptions.
   */
  setPrescriptions: (prescriptions) => set({ prescriptions }),
  /**
   * Adds a single prescription to the existing list (example).
   * @param {Prescription} prescription - The prescription to add.
   */
  addPrescription: (prescription) =>
    set({ prescriptions: [...get().prescriptions, prescription] }),
}));

export default usePrescriptionStore;
