/**
 * Module augmentation for medication-barcode-scanner
 * Adds pharmacy-specific functionality
 */

// Import original module
import 'medication-barcode-scanner';

declare module 'medication-barcode-scanner' {
  /**
   * Pharmacy-specific medication information
   */
  export interface PharmacyMedicationInfo extends MedicationInfo {
    /**
     * Whether the medication is a controlled substance
     */
    isControlled?: boolean;
    
    /**
     * DEA schedule for controlled substances (2-5)
     */
    schedule?: 2 | 3 | 4 | 5;
    
    /**
     * Whether the medication requires refrigeration
     */
    requiresRefrigeration?: boolean;
    
    /**
     * Drug interaction classes
     */
    interactionClasses?: string[];
    
    /**
     * Pharmacy inventory information
     */
    inventory?: {
      /**
       * Number of units in stock
       */
      inStock: number;
      
      /**
       * Location in the pharmacy
       */
      location: string;
      
      /**
       * Reorder threshold
       */
      reorderThreshold: number;
    };
  }

  /**
   * Pharmacy-specific barcode types
   */
  export type PharmacyBarcodeType = BarcodeType | 'Pharmacy' | 'Insurance' | 'DEA';

  /**
   * Pharmacy-specific scan options
   */
  export interface PharmacyScanOptions extends ScanOptions {
    /**
     * Check inventory during scan
     */
    checkInventory?: boolean;
    
    /**
     * Verify against pharmacy database
     */
    verifyDatabase?: boolean;
    
    /**
     * Pharmacy location ID
     */
    pharmacyLocationId?: string;
  }

  /**
   * Pharmacy-specific scan result
   */
  export interface PharmacyScanResult extends ScanResult {
    /**
     * Pharmacy-specific medication data
     */
    data: {
      code: string;
      type: PharmacyBarcodeType;
      medication: PharmacyMedicationInfo;
      
      /**
       * Pharmacy verification result
       */
      verification?: {
        verified: boolean;
        timestamp: string;
        pharmacist?: string;
      };
    };
  }

  /**
   * Scan a medication barcode with pharmacy-specific options
   */
  export function scanPharmacyBarcode(
    options: PharmacyScanOptions
  ): Promise<PharmacyScanResult>;

  /**
   * Check if medication is in pharmacy inventory
   */
  export function checkMedicationInventory(
    medicationId: string
  ): Promise<{ inStock: number; location: string }>;
} 