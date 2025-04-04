/**
 * Navigation Parameter List Definitions for SpeedyMeds App
 *
 * This file centralizes the type definitions for the parameters expected by each screen
 * across all navigators (Root Stack, Bottom Tabs, Orders Stack). Defining these types
 * provides strong type-safety for navigation actions (e.g., `navigation.navigate`)
 * and route parameters (`route.params`).
 *
 * @see https://reactnavigation.org/docs/typescript/ - Official React Navigation TypeScript documentation.
 * @see https://reactnavigation.org/docs/params/ - Documentation on passing parameters to routes.
 */

// ============================================================================
// Root Stack Navigator Types
// ============================================================================

/**
 * @description Defines the parameters expected by each screen directly within the Root Native Stack Navigator.
 * The Root Stack acts as the main container, typically holding nested navigators (like our `MainTabs`)
 * or screens that should appear over the entire app (e.g., modals, full-screen views).
 *
 * Each key in this object represents a route name within the Root Stack.
 * The value associated with each key defines the type of parameters that route expects.
 * `undefined` signifies that the route expects no parameters.
 */
export type RootStackParamList = {
  /**
   * @description Represents the main Bottom Tab Navigator component.
   * As a navigator itself, it doesn't typically receive direct navigation parameters
   * when navigated to as a whole unit within the Root Stack.
   */
  MainTabs: undefined;

  // Example: If you added a modal screen directly to the root stack:
  // SettingsModal: { userId: string }; // This screen would expect a userId parameter
};

// ============================================================================
// Bottom Tab Navigator Types
// ============================================================================

/**
 * @description Defines the parameters expected by each screen within the Bottom Tab Navigator (`MainTabs`).
 * These are the main sections of the app accessible via the bottom tabs.
 *
 * Similar to `RootStackParamList`, each key is a route name (tab name), and the value
 * defines the parameters expected when navigating *to that specific tab*.
 */
export type BottomTabParamList = {
  /**
   * @description The Home/Dashboard screen. Expects no parameters.
   */
  Home: undefined;

  /**
   * @description The Prescriptions list screen. Expects no parameters.
   */
  Prescriptions: undefined;

  /**
   * @description Represents the entry point for the nested Orders Stack Navigator.
   * When navigating to the 'Orders' *tab*, no parameters are expected directly for the tab itself.
   * Navigation within the Orders section (to 'OrdersList' or 'OrderDetail') is handled
   * by the `OrdersStackNavigator` and its `OrdersStackParamList`.
   */
  Orders: undefined;

  /**
   * @description The User Account screen. Expects no parameters.
   */
  Account: undefined;
};

// ============================================================================
// Orders Stack Navigator Types
// ============================================================================

/**
 * @description Defines the parameters expected by each screen within the nested Orders Stack Navigator.
 * This stack handles navigation specifically within the "Orders" section of the app.
 */
export type OrdersStackParamList = {
  /**
   * @description The main screen within the Orders stack, typically displaying a list of orders.
   * Expects no parameters when navigated to.
   */
  OrdersList: undefined;

  /**
   * @description The screen displaying details for a specific order.
   * Expects an object containing an `orderId` property of type `string`
   * to be passed as a parameter during navigation.
   * Example: `navigation.navigate('OrderDetail', { orderId: 'some-id-123' });`
   */
  OrderDetail: { orderId: string };
};
