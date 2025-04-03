/**
 * @fileoverview Custom hooks for fetching application data using React Query
 * and updating Zustand stores.
 */

import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardData,
  fetchOrders,
  fetchPrescriptions,
  fetchUserProfile,
} from "../api/mockApi";
import useDashboardStore from "../stores/dashboardStore";
import useOrderStore from "../stores/orderStore";
import usePrescriptionStore from "../stores/prescriptionStore";
import useUserProfileStore from "../stores/userProfileStore";
import { DashboardData, Order, Prescription, UserProfile } from "../types";

/**
 * Query key for user profile data.
 * @constant {string[]} USER_PROFILE_QUERY_KEY
 */
const USER_PROFILE_QUERY_KEY = ["userProfile"];
/**
 * Query key for prescriptions data.
 * @constant {string[]} PRESCRIPTIONS_QUERY_KEY
 */
const PRESCRIPTIONS_QUERY_KEY = ["prescriptions"];
/**
 * Query key for orders data.
 * @constant {string[]} ORDERS_QUERY_KEY
 */
const ORDERS_QUERY_KEY = ["orders"];
/**
 * Query key for dashboard data.
 * @constant {string[]} DASHBOARD_QUERY_KEY
 */
const DASHBOARD_QUERY_KEY = ["dashboard"];

/**
 * Custom hook to fetch user profile data.
 * Fetches data using React Query and updates the user profile Zustand store on success.
 * @returns {object} The React Query result object for the user profile query.
 */
export const useUserProfileQuery = () => {
  const setProfile = useUserProfileStore((state) => state.setProfile);

  return useQuery<UserProfile, Error>({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    onSuccess: (data) => {
      console.log("[Query Hook] User profile fetched, updating store...");
      setProfile(data);
    },
    staleTime: Infinity, // Keep profile data fresh indefinitely unless invalidated
    gcTime: Infinity,
  });
};

/**
 * Custom hook to fetch prescriptions data.
 * Fetches data using React Query and updates the prescriptions Zustand store on success.
 * @returns {object} The React Query result object for the prescriptions query.
 */
export const usePrescriptionsQuery = () => {
  const setPrescriptions = usePrescriptionStore(
    (state) => state.setPrescriptions,
  );

  return useQuery<Prescription[], Error>({
    queryKey: PRESCRIPTIONS_QUERY_KEY,
    queryFn: fetchPrescriptions,
    onSuccess: (data) => {
      console.log("[Query Hook] Prescriptions fetched, updating store...");
      setPrescriptions(data);
    },
    // Example: Refetch every 5 minutes or on window focus
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

/**
 * Custom hook to fetch orders data.
 * Fetches data using React Query and updates the orders Zustand store on success.
 * @returns {object} The React Query result object for the orders query.
 */
export const useOrdersQuery = () => {
  const setOrders = useOrderStore((state) => state.setOrders);

  return useQuery<Order[], Error>({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: fetchOrders,
    onSuccess: (data) => {
      console.log("[Query Hook] Orders fetched, updating store...");
      setOrders(data);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

/**
 * Custom hook to fetch dashboard data.
 * Fetches data using React Query and updates the dashboard Zustand store on success.
 * @returns {object} The React Query result object for the dashboard query.
 */
export const useDashboardQuery = () => {
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);

  return useQuery<DashboardData, Error>({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: fetchDashboardData,
    onSuccess: (data) => {
      console.log("[Query Hook] Dashboard data fetched, updating store...");
      setDashboardData(data);
    },
    staleTime: 1 * 60 * 1000, // Refresh dashboard data more frequently
    refetchOnWindowFocus: true,
  });
};
