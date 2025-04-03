/**
 * @fileoverview Zustand store for managing order data.
 */
import { create } from "zustand";
import { Order } from "../types";

/**
 * Interface for the Order store state and actions.
 * @interface OrderState
 */
interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

/**
 * Zustand store hook for orders.
 * @param {Function} set - Zustand setter function.
 * @returns {OrderState} The store state and actions.
 */
const useOrderStore = create<OrderState>()((set) => ({
  orders: [],
  /**
   * Sets the list of orders.
   * @param {Order[]} orders - The array of orders.
   */
  setOrders: (orders) => set({ orders }),
}));

export default useOrderStore;
