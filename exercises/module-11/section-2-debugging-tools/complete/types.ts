/**
 * @fileoverview Type definitions for the Pharmacy Inventory app
 * @author React Native Training Team
 * @created 2023-07-01
 */

// Fixed: Made some properties optional to handle potential null/undefined values
export interface Inventory {
  id: string;
  name: string;
  category?: string; // Optional to handle missing categories
  quantity?: number; // Optional to handle missing quantities
  price?: number; // Optional to handle missing prices
  expiry?: string; // Optional to handle missing expiry dates
} 