/**
 * Test Suite for appDataStore (Zustand)
 *
 * @file This file contains unit tests for the global Zustand store defined in `appDataStore.ts`.
 * @module stores/__tests__/appDataStore.test
 *
 * @purpose To verify that the actions defined in the store correctly update the state
 * slices as expected. It tests each action individually to ensure the store's
 * state management logic is sound.
 *
 * @note Testing Zustand stores directly like this (outside of React components) is useful
 * for verifying the core logic of your actions and initial state. However, you also
 * need integration tests (using `@testing-library/react-native` with `render`) to ensure
 * components correctly interact with the store via the hook (`useAppDataStore`).
 *
 * @dependencies
 * - Zustand (`useAppDataStore`): The store hook itself, used to access `getState` and `setState`.
 * - @testing-library/react-native (`act`): Utility to wrap state updates for proper testing.
 * - Internal:
 *   - `../appDataStore`: The store being tested.
 *   - `../../types`: Type definitions for the data structures.
 *
 * @see {@link https://github.com/pmndrs/zustand | Zustand Documentation}
 * @see {@link https://reactjs.org/docs/testing-recipes.html#act | React Testing `act` Utility} - Explains why `act` is needed for state updates.
 * @see {@link ../appDataStore.ts | The Zustand Store Definition}
 */

import useAppDataStore from "../appDataStore"; // Import the hook to access the store instance
import { act } from "@testing-library/react-native"; // Import `act` for wrapping state updates
// Import types for creating mock data
import {
  UserProfile,
  MedicationReminder,
  Prescription,
  Order,
  PrescriptionSupplyStatus,
  PrescriptionAlert,
  OrderStatus,
} from "../../types"; // Adjust path as needed

/**
 * Helper function to get the current state of the Zustand store directly.
 *
 * @description Zustand stores expose a `getState()` method which returns the current state object.
 * This is useful in tests (and sometimes outside React components) to directly inspect the state
 * after an action has been performed, without needing to render a component and use the hook.
 *
 * @returns {AppDataState} The current state object from the `useAppDataStore`.
 * @see {@link https://github.com/pmndrs/zustand#reading-state-outside-of-react | Zustand: Reading state outside of React}
 */
const getState = () => useAppDataStore.getState();

/**
 * Test suite describing the behavior of the `appDataStore`.
 */
describe("appDataStore", () => {
  /**
   * Setup function executed before each individual test case (`it` block).
   *
   * @purpose Ensures each test starts with a clean, predictable initial state.
   * This prevents state from one test leaking into and affecting another.
   *
   * @action Uses `useAppDataStore.setState` directly to force the store back to its
   * initial values (null profile, empty arrays, isLoading: true, error: null).
   * @action Wraps the `setState` call in `act` because modifying Zustand state, even
   * outside React, can trigger effects or subscriptions that React Testing Library
   * expects to be wrapped. This ensures all updates are processed before the test proceeds.
   */
  beforeEach(() => {
    // `act` ensures that all updates related to this state change are processed
    act(() => {
      // Directly set the entire state back to its initial values.
      // `setState` replaces the entire state object here.
      useAppDataStore.setState({
        userProfile: null,
        medicationReminders: [],
        prescriptions: [],
        orders: [],
        isLoading: true, // Reset to initial loading state
        error: null, // Reset error state
        // Note: We also need to include the action functions in the reset
        // because setState replaces the *entire* store content by default.
        // Alternatively, Zustand v4+ allows partial state replacement by default,
        // but explicitly resetting is safer for clarity in tests.
        // Let's get the original actions to avoid redefining them:
        setUserProfile: getState().setUserProfile,
        setMedicationReminders: getState().setMedicationReminders,
        setPrescriptions: getState().setPrescriptions,
        setOrders: getState().setOrders,
        setLoading: getState().setLoading,
        setError: getState().setError,
      });
    });
  });

  /**
   * Test case: Verifies the `setUserProfile` action.
   *
   * @action Calls the `setUserProfile` action with mock data.
   * @assertion Checks if the `userProfile` slice in the store's state now matches the mock data.
   */
  it("should set user profile", () => {
    // Arrange: Create mock profile data
    const mockProfile: UserProfile = {
      firstName: "Jane",
      lastNameInitial: "D",
      birthYear: 1985,
      memberId: "67890",
      balanceDue: 50.0,
    };

    // Act: Call the action. Wrap in `act` as it modifies state.
    act(() => {
      // Get the action from the current state and call it
      getState().setUserProfile(mockProfile);
    });

    // Assert: Check if the state was updated correctly
    expect(getState().userProfile).toEqual(mockProfile);
  });

  /**
   * Test case: Verifies the `setMedicationReminders` action.
   *
   * @action Calls the `setMedicationReminders` action with mock data.
   * @assertion Checks if the `medicationReminders` slice in the store's state now matches the mock data.
   */
  it("should set medication reminders", () => {
    // Arrange: Create mock reminders data
    const mockReminders: MedicationReminder[] = [
      { id: "rem3", name: "Midday Pill", time: "12:00 PM" },
    ];

    // Act: Call the action, wrapped in `act`
    act(() => {
      getState().setMedicationReminders(mockReminders);
    });

    // Assert: Check if the state was updated
    expect(getState().medicationReminders).toEqual(mockReminders);
  });

  /**
   * Test case: Verifies the `setPrescriptions` action.
   *
   * @action Calls the `setPrescriptions` action with mock data.
   * @assertion Checks if the `prescriptions` slice in the store's state now matches the mock data.
   */
  it("should set prescriptions", () => {
    // Arrange: Create mock prescriptions data
    const mockPrescriptions: Prescription[] = [
      {
        id: "rx3",
        drugName: "Lisinopril",
        dosage: "10mg",
        daysSupplyRemaining: 30,
        supplyStatus: PrescriptionSupplyStatus.OK, // Use enum member for type safety
        patientName: "Jane D",
        refillsRemaining: 2,
        alert: PrescriptionAlert.NONE, // Use enum member
      },
    ];

    // Act: Call the action, wrapped in `act`
    act(() => {
      getState().setPrescriptions(mockPrescriptions);
    });

    // Assert: Check if the state was updated
    expect(getState().prescriptions).toEqual(mockPrescriptions);
  });

  /**
   * Test case: Verifies the `setOrders` action.
   *
   * @action Calls the `setOrders` action with mock data.
   * @assertion Checks if the `orders` slice in the store's state now matches the mock data.
   */
  it("should set orders", () => {
    // Arrange: Create mock orders data
    const mockOrders: Order[] = [
      {
        id: "ord3",
        drugName: "Aspirin",
        dosage: "81mg",
        orderDate: new Date(), // Use a real date object
        orderNumber: "ORD333",
        status: OrderStatus.PROCESSING, // Use enum member
        shippingAddress: {
          street: "123 Side St",
          city: "Sometown",
          state: "NY",
          zip: "54321",
        },
      },
    ];

    // Act: Call the action, wrapped in `act`
    act(() => {
      getState().setOrders(mockOrders);
    });

    // Assert: Check if the state was updated
    expect(getState().orders).toEqual(mockOrders);
  });

  /**
   * Test case: Verifies the `setLoading` action.
   *
   * @action Calls the `setLoading` action with `false` and then `true`.
   * @assertion Checks if the `isLoading` state updates correctly after each call.
   */
  it("should set loading state", () => {
    // Assert initial state (set in beforeEach)
    expect(getState().isLoading).toBe(true);

    // Act 1: Set loading to false
    act(() => {
      getState().setLoading(false);
    });
    // Assert 1: Check if updated
    expect(getState().isLoading).toBe(false);

    // Act 2: Set loading back to true
    act(() => {
      getState().setLoading(true);
    });
    // Assert 2: Check if updated again
    expect(getState().isLoading).toBe(true);
  });

  /**
   * Test case: Verifies the `setError` action.
   *
   * @action Calls the `setError` action with a mock Error object, then with `null`.
   * @assertion Checks if the `error` state updates correctly.
   * @assertion Checks if `isLoading` is set to `false` when an error is set.
   * @assertion Checks if `isLoading` remains `false` when the error is cleared.
   */
  it("should set error state and set loading to false", () => {
    // Arrange: Create a mock error
    const mockError = new Error("Test error");

    // Assert initial state
    expect(getState().error).toBeNull();
    expect(getState().isLoading).toBe(true); // Should be true initially from beforeEach

    // Act 1: Set an error
    act(() => {
      getState().setError(mockError);
    });
    // Assert 1: Check error state and that loading became false
    expect(getState().error).toEqual(mockError);
    expect(getState().isLoading).toBe(false); // setError action implementation sets isLoading to false

    // Act 2: Clear the error
    act(() => {
      getState().setError(null);
    });
    // Assert 2: Check error is cleared and loading remains false
    expect(getState().error).toBeNull();
    // Note: Clearing the error doesn't automatically set loading back to true.
    // The loading state is managed independently based on actual data fetching operations.
    expect(getState().isLoading).toBe(false);
  });
});
