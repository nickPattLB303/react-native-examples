/**
 * @fileoverview Zustand store for managing dashboard data.
 */
import { create } from "zustand";
import { DashboardData } from "../types";

/**
 * Interface for the Dashboard store state and actions.
 * @interface DashboardState
 */
interface DashboardState {
  dashboardData: DashboardData | null;
  setDashboardData: (data: DashboardData) => void;
}

/**
 * Zustand store hook for dashboard data.
 * @param {Function} set - Zustand setter function.
 * @returns {DashboardState} The store state and actions.
 */
const useDashboardStore = create<DashboardState>()((set) => ({
  dashboardData: null,
  /**
   * Sets the dashboard data.
   * @param {DashboardData} data - The dashboard data object.
   */
  setDashboardData: (data) => set({ dashboardData: data }),
}));

export default useDashboardStore;
