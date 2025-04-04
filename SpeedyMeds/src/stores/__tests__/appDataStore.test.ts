import useAppDataStore from "../appDataStore"; // Adjust path as needed
import { act } from "@testing-library/react-native";
import {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
  PrescriptionSupplyStatus, // Add enum import
  PrescriptionAlert, // Add enum import
  OrderStatus, // Import necessary types/enums
} from "../../types"; // Adjust path as needed

// Helper function to get the current state outside of React components
const getState = () => useAppDataStore.getState();

describe("appDataStore", () => {
  // Reset store state before each test
  beforeEach(() => {
    act(() => {
      useAppDataStore.setState({
        userProfile: null,
        medicationReminders: [],
        prescriptions: [],
        orders: [],
        isLoading: true, // Reset to initial state
        error: null,
      });
    });
  });

  it("should set user profile", () => {
    const mockProfile: UserProfile = {
      firstName: "Jane",
      lastNameInitial: "D",
      birthYear: 1985,
      memberId: "67890",
      balanceDue: 50.0,
    };
    act(() => {
      getState().setUserProfile(mockProfile);
    });
    expect(getState().userProfile).toEqual(mockProfile);
  });

  it("should set medication reminders", () => {
    const mockReminders: MedicationReminder[] = [
      { id: "rem3", name: "Midday Pill", time: "12:00 PM" },
    ];
    act(() => {
      getState().setMedicationReminders(mockReminders);
    });
    expect(getState().medicationReminders).toEqual(mockReminders);
  });

  it("should set prescriptions", () => {
    const mockPrescriptions: Prescription[] = [
      {
        id: "rx3",
        drugName: "Lisinopril",
        dosage: "10mg",
        daysSupplyRemaining: 30,
        supplyStatus: PrescriptionSupplyStatus.OK, // Use enum member
        patientName: "Jane D",
        refillsRemaining: 2,
        alert: PrescriptionAlert.NONE, // Use enum member
      },
    ];
    act(() => {
      getState().setPrescriptions(mockPrescriptions);
    });
    expect(getState().prescriptions).toEqual(mockPrescriptions);
  });

  it("should set orders", () => {
    const mockOrders: Order[] = [
      {
        id: "ord3",
        drugName: "Aspirin",
        dosage: "81mg",
        orderDate: new Date(),
        orderNumber: "ORD333",
        status: OrderStatus.PROCESSING,
        shippingAddress: {
          street: "123 Side St",
          city: "Sometown",
          state: "NY",
          zip: "54321",
        },
      },
    ];
    act(() => {
      getState().setOrders(mockOrders);
    });
    expect(getState().orders).toEqual(mockOrders);
  });

  it("should set loading state", () => {
    expect(getState().isLoading).toBe(true); // Initial state check
    act(() => {
      getState().setLoading(false);
    });
    expect(getState().isLoading).toBe(false);
    act(() => {
      getState().setLoading(true);
    });
    expect(getState().isLoading).toBe(true);
  });

  it("should set error state and set loading to false", () => {
    const mockError = new Error("Test error");
    expect(getState().error).toBeNull();
    expect(getState().isLoading).toBe(true); // Should be true initially

    act(() => {
      getState().setError(mockError);
    });
    expect(getState().error).toEqual(mockError);
    expect(getState().isLoading).toBe(false); // setError should set loading to false

    // Test clearing the error
    act(() => {
      getState().setError(null);
    });
    expect(getState().error).toBeNull();
    // Note: Clearing error doesn't automatically set loading back to true
    expect(getState().isLoading).toBe(false);
  });
});
