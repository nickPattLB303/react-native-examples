/**
 * @fileoverview Pharmacy Inventory System - Complete Solution
 * @author React Native Training Course
 * @created 2023-09-01
 * 
 * This is a complete implementation of a TypeScript-based 
 * pharmacy inventory system using advanced types and interfaces.
 */

/**
 * Generic inventory item interface that can work with different product types
 * @template T The type of data specific to this inventory item
 */
interface InventoryItem<T> {
  id: number;
  name: string;
  quantity: number;
  location: string;
  lastUpdated: Date;
  readonly sku: string; // Readonly property
  notes?: string; // Optional property
  data: T; // Generic data property
}

/**
 * Interface for medication product data
 */
interface Medication {
  dosage: number;
  unit: string;
  frequency: string;
  readonly ndc: string;
  instructions?: string;
  sideEffects?: string[];
  controlledSubstance?: boolean;
}

/**
 * Interface for medical supply product data
 */
interface MedicalSupply {
  category: string;
  size?: string;
  material: string;
  sterile: boolean;
  expirationDate?: Date;
}

/**
 * Type alias for all possible inventory item types
 */
type PharmacyItem = InventoryItem<Medication> | InventoryItem<MedicalSupply>;

/**
 * Type guard to check if an item is a medication
 * @param {PharmacyItem} item - The item to check
 * @returns {boolean} True if the item is a medication
 */
function isMedication(item: PharmacyItem): item is InventoryItem<Medication> {
  return 'ndc' in item.data;
}

/**
 * Union type for different inventory actions using discriminated union pattern
 */
type InventoryAction = 
  | { type: 'restock'; itemId: number; quantity: number; lotNumber: string; }
  | { type: 'dispense'; itemId: number; quantity: number; patientId: string; }
  | { type: 'adjust'; itemId: number; quantity: number; reason: string; };

/**
 * Type for inventory-related functions
 */
type InventoryFunction<T extends PharmacyItem> = (item: T) => void;

// Sample data for testing
const medications: InventoryItem<Medication>[] = [
  {
    id: 1,
    name: "Amoxicillin",
    quantity: 200,
    location: "Shelf A1",
    lastUpdated: new Date(),
    sku: "MED-AMOX-500",
    notes: "Keep at room temperature",
    data: {
      dosage: 500,
      unit: "mg",
      frequency: "3 times daily",
      ndc: "68462-135"
    }
  },
  {
    id: 2,
    name: "Lisinopril",
    quantity: 150,
    location: "Shelf A2",
    lastUpdated: new Date(),
    sku: "MED-LISI-10",
    data: {
      dosage: 10,
      unit: "mg",
      frequency: "once daily",
      ndc: "65862-178"
    }
  }
];

const supplies: InventoryItem<MedicalSupply>[] = [
  {
    id: 101,
    name: "Surgical Gloves",
    quantity: 500,
    location: "Shelf B3",
    lastUpdated: new Date(),
    sku: "SUP-GLOVE-M",
    data: {
      category: "Protective Equipment",
      size: "Medium",
      material: "Latex-free",
      sterile: true
    }
  },
  {
    id: 102,
    name: "Gauze Pads",
    quantity: 350,
    location: "Shelf B5",
    lastUpdated: new Date(),
    sku: "SUP-GAUZE-4",
    data: {
      category: "Wound Care",
      size: "4x4",
      material: "Cotton",
      sterile: true,
      expirationDate: new Date("2025-06-30")
    }
  }
];

// Combined inventory array
const inventory: PharmacyItem[] = [...medications, ...supplies];

/**
 * Processes an inventory action based on its type
 * @param {InventoryAction} action - The inventory action to process
 * @param {PharmacyItem[]} inventory - The inventory to update
 * @returns {PharmacyItem | undefined} The updated item or undefined if item not found
 */
function processInventoryAction(action: InventoryAction, inventory: PharmacyItem[]): PharmacyItem | undefined {
  // Find the item in the inventory
  const item = inventory.find(i => i.id === action.itemId);
  
  if (!item) {
    return undefined;
  }

  // Type guard pattern using discriminated union
  switch (action.type) {
    case 'restock':
      item.quantity += action.quantity;
      item.lastUpdated = new Date();
      updateDisplay('actionResult', `Restocked ${item.name} with ${action.quantity} units. Lot number: ${action.lotNumber}`);
      break;
      
    case 'dispense':
      if (item.quantity >= action.quantity) {
        item.quantity -= action.quantity;
        item.lastUpdated = new Date();
        updateDisplay('actionResult', `Dispensed ${action.quantity} units of ${item.name} to patient ${action.patientId}`);
      } else {
        updateDisplay('actionResult', `Error: Insufficient quantity of ${item.name} to dispense`);
      }
      break;
      
    case 'adjust':
      item.quantity = action.quantity;
      item.lastUpdated = new Date();
      updateDisplay('actionResult', `Adjusted ${item.name} quantity to ${action.quantity}. Reason: ${action.reason}`);
      break;
  }

  return item;
}

// Examples of utility types
// Readonly version of inventory item (all properties become readonly)
type ReadonlyInventoryItem<T> = Readonly<InventoryItem<T>>;

// Basic summary view with only essential properties
type InventorySummary = Pick<PharmacyItem, 'id' | 'name' | 'quantity' | 'location'>;

// Type for updating an inventory item (all properties optional)
type InventoryUpdate<T> = Partial<InventoryItem<T>>;

/**
 * Creates a summary of all inventory items
 * @param {PharmacyItem[]} items - The items to summarize
 * @returns {InventorySummary[]} Array of summarized items
 */
function createInventorySummary(items: PharmacyItem[]): InventorySummary[] {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    location: item.location
  }));
}

/**
 * Gets low stock items that need reordering
 * @param {PharmacyItem[]} items - The items to check
 * @param {number} threshold - The quantity threshold for low stock
 * @returns {PharmacyItem[]} Array of low stock items
 */
function getLowStockItems(items: PharmacyItem[], threshold: number): PharmacyItem[] {
  return items.filter(item => item.quantity < threshold);
}

// DOM Manipulation functions

/**
 * Updates the HTML display with formatted data
 * @param {string} elementId - The ID of the HTML element to update
 * @param {any} data - The data to display
 */
function updateDisplay(elementId: string, data: any): void {
  const element = document.getElementById(elementId);
  if (element) {
    if (typeof data === 'string') {
      element.innerHTML = data;
    } else {
      element.innerHTML = JSON.stringify(data, null, 2)
        .replace(/\n/g, '<br>')
        .replace(/\s{2}/g, '&nbsp;&nbsp;');
    }
  }
}

// Event listeners for demo interactions
document.addEventListener('DOMContentLoaded', () => {
  // Initial inventory display
  updateDisplay('inventoryDisplay', createInventorySummary(inventory));
  
  // Create specialized view
  const lowStockItems = getLowStockItems(inventory, 200);
  updateDisplay('dataView', {
    viewType: 'Low Stock Items',
    items: lowStockItems.map(item => `${item.name} (${item.quantity})`)
  });
  
  // Set up action button
  const actionButton = document.getElementById('processAction');
  if (actionButton) {
    actionButton.addEventListener('click', () => {
      const actionType = (document.getElementById('actionType') as HTMLSelectElement).value as 'restock' | 'dispense' | 'adjust';
      const itemId = parseInt((document.getElementById('itemId') as HTMLInputElement).value);
      const quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
      
      // Create the appropriate action object based on the action type
      let action: InventoryAction;
      
      switch (actionType) {
        case 'restock':
          action = {
            type: 'restock',
            itemId,
            quantity,
            lotNumber: `LOT-${new Date().getTime().toString().slice(-6)}`
          };
          break;
          
        case 'dispense':
          action = {
            type: 'dispense',
            itemId,
            quantity,
            patientId: `P-${Math.floor(1000 + Math.random() * 9000)}`
          };
          break;
          
        case 'adjust':
          action = {
            type: 'adjust',
            itemId,
            quantity,
            reason: 'Inventory count adjustment'
          };
          break;
          
        default:
          throw new Error(`Unknown action type: ${actionType}`);
      }
      
      // Process the action
      const updatedItem = processInventoryAction(action, inventory);
      
      // Update the inventory display
      updateDisplay('inventoryDisplay', createInventorySummary(inventory));
      
      // Update specialized view
      const lowStockItems = getLowStockItems(inventory, 200);
      updateDisplay('dataView', {
        viewType: 'Low Stock Items',
        items: lowStockItems.map(item => `${item.name} (${item.quantity})`)
      });
    });
  }
}); 