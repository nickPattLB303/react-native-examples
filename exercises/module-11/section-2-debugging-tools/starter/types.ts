/**
 * @fileoverview Type definitions for the Pharmacy Inventory app
 * @author React Native Training Team
 * @created 2023-07-01
 */

export interface Inventory {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  expiry: string;
} 