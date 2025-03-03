/**
 * Simulated Inventory API
 * 
 * TODO: Create proper typings for API responses and requests
 * Create appropriate interfaces in a separate types directory
 */

// Simulated API endpoint for fetching medications
export async function fetchMedications() {
  // This simulates an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Returning an empty array to force the app to use the sample data
      // In a real app, this would return data from an API
      resolve([]);
    }, 1000);
  });
}

// Update inventory levels for a specific medication
export async function updateInventory(medicationId, updates) {
  // Simulates an API request to update inventory
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        medicationId,
        timestamp: new Date().toISOString(),
        updates
      });
    }, 500);
  });
}

// Get detailed inventory report
export async function getInventoryReport(options) {
  // Simulates an API request for an inventory report
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        generatedAt: new Date().toISOString(),
        totalItems: 45,
        lowStockItems: 8,
        expiringSoonItems: 12,
        reportDetails: {
          format: options?.format || 'summary',
          period: options?.period || '30days',
          categories: options?.categories || ['all']
        }
      });
    }, 1500);
  });
}

// Place an order for low stock items
export async function placeOrder(medications) {
  // Simulates an API request to place an order
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Array.isArray(medications) || medications.length === 0) {
        reject(new Error('Invalid order request'));
        return;
      }
      
      resolve({
        success: true,
        orderId: `ORD-${Date.now()}`,
        items: medications.map(med => ({
          id: med.id,
          quantity: med.reorderPoint * 2 - med.stock,
          price: Math.random() * 100 + 5 // Dummy price calculation
        })),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      });
    }, 2000);
  });
} 