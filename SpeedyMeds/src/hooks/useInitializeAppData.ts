import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAppDataStore from "../stores/appDataStore";
import { queryKeys } from "../api/queryKeys";
import {
  fetchUserProfile,
  fetchMedicationReminders,
  fetchPrescriptions,
  fetchOrders,
} from "../api";

/**
 * Custom hook to initialize application data using React Query.
 *
 * Fetches user profile, reminders, prescriptions, and orders,
 * then updates the Zustand store (`useAppDataStore`).
 */
export const useInitializeAppData = () => {
  const {
    setUserProfile,
    setMedicationReminders,
    setPrescriptions,
    setOrders,
    setError,
    setLoading,
  } = useAppDataStore();

  const {
    data: userProfile,
    isFetching: isFetchingProfile,
    error: errorProfile,
  } = useQuery({
    queryKey: queryKeys.userProfile,
    queryFn: fetchUserProfile,
    staleTime: Infinity, // Keep profile data fresh
  });

  const {
    data: reminders,
    isFetching: isFetchingReminders,
    error: errorReminders,
  } = useQuery({
    queryKey: queryKeys.medicationReminders,
    queryFn: () => fetchMedicationReminders(2),
    staleTime: 1000 * 60 * 5, // Refetch reminders every 5 mins
  });

  const {
    data: prescriptions,
    isFetching: isFetchingPrescriptions,
    error: errorPrescriptions,
  } = useQuery({
    queryKey: queryKeys.prescriptions,
    queryFn: () => fetchPrescriptions(5),
    staleTime: 1000 * 60 * 10, // Refetch prescriptions every 10 mins
  });

  const {
    data: orders,
    isFetching: isFetchingOrders,
    error: errorOrders,
  } = useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => fetchOrders(3),
    staleTime: 1000 * 60 * 5, // Refetch orders every 5 mins
  });

  // Combined loading state
  const isLoading =
    isFetchingProfile ||
    isFetchingReminders ||
    isFetchingPrescriptions ||
    isFetchingOrders;

  // Combined error handling
  const queryError =
    errorProfile || errorReminders || errorPrescriptions || errorOrders;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (queryError) {
      console.error("Error fetching app data:", queryError);
      setError(
        queryError instanceof Error
          ? queryError
          : new Error("An unknown error occurred"),
      );
    }
  }, [queryError, setError]);

  useEffect(() => {
    if (userProfile) {
      setUserProfile(userProfile);
    }
  }, [userProfile, setUserProfile]);

  useEffect(() => {
    if (reminders) {
      setMedicationReminders(reminders);
    }
  }, [reminders, setMedicationReminders]);

  useEffect(() => {
    if (prescriptions) {
      setPrescriptions(prescriptions);
    }
  }, [prescriptions, setPrescriptions]);

  useEffect(() => {
    if (orders) {
      setOrders(orders);
    }
  }, [orders, setOrders]);

  // Return value is minimal as data is managed in Zustand store
  // Could return isLoading/error if needed directly in components
};
