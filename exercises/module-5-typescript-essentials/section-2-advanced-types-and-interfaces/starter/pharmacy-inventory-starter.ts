/**
 * @fileoverview Pharmacy Inventory System - Starter Code
 * @author React Native Training Course
 * @created 2023-09-01
 * 
 * This starter code provides the basic structure for implementing
 * a TypeScript-based pharmacy inventory system using advanced types.
 */

// TODO: Create a generic InventoryItem<T> interface that works with different product types
// Hint: Include common inventory properties plus a generic data property

// TODO: Create an interface for Medication products
// Hint: Include properties like name, dosage, unit, etc.

// TODO: Create an interface for MedicalSupply products
// Hint: Include properties like name, category, size, etc.

// TODO: Create a type union for different inventory actions (restock, dispense, adjust)
// Hint: Each action type should have a discriminated union with a 'type' property

// TODO: Implement a function that uses type guards to handle different inventory actions
// Hint: Use the 'type' property to determine which action is being performed

// TODO: Use utility types to create specialized views of inventory data
// Hint: Try using Pick, Omit, Partial, or Readonly

// Sample data for testing (uncomment and modify as needed)
/*
const medications = [
  {
    id: 1,
    name: "Amoxicillin",
    quantity: 200,
    location: "Shelf A1",
    data: {
      dosage: 500,
      unit: "mg",
      frequency: "3 times daily",
      ndc: "68462-135"
    }
  },
  // Add more medications...
];

const supplies = [
  {
    id: 101,
    name: "Surgical Gloves",
    quantity: 500,
    location: "Shelf B3",
    data: {
      category: "Protective Equipment",
      size: "Medium",
      material: "Latex-free"
    }
  },
  // Add more supplies...
];
*/

// DOM Manipulation functions to display results

/**
 * Updates the HTML display with inventory information
 * @param {string} elementId - The ID of the HTML element to update
 * @param {any} data - The data to display
 */
function updateDisplay(elementId: string, data: any): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = JSON.stringify(data, null, 2)
      .replace(/\n/g, '<br>')
      .replace(/\s{2}/g, '&nbsp;&nbsp;');
  }
}

/**
 * Processes an inventory action and updates the display
 * @param {any} action - The inventory action to process
 */
function processInventoryAction(action: any): void {
  // TODO: Implement this function using type guards
  // to handle different action types appropriately
  
  updateDisplay('actionResult', `Processed action: ${JSON.stringify(action)}`);
}

// Event listeners for demo interactions
document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('processAction');
  if (actionButton) {
    actionButton.addEventListener('click', () => {
      const actionType = (document.getElementById('actionType') as HTMLSelectElement).value;
      const itemId = parseInt((document.getElementById('itemId') as HTMLInputElement).value);
      const quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
      
      // TODO: Create the appropriate action object based on the action type
      const action = {
        type: actionType,
        itemId: itemId,
        quantity: quantity
      };
      
      processInventoryAction(action);
    });
  }
}); 