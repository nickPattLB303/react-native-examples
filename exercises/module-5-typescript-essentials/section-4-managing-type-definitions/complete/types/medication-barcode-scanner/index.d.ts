/**
 * Type definitions for the medication-barcode-scanner library
 * @version 1.0.0
 */

declare module 'medication-barcode-scanner' {
  /**
   * Types of barcodes that can be scanned
   */
  export type BarcodeType = 'NDC' | 'RxNorm' | 'GTIN' | 'UPC' | 'QR' | 'DataMatrix';

  /**
   * Medication form types
   */
  export type MedicationForm = 'tablet' | 'capsule' | 'liquid' | 'cream' | 'injection' | 'patch' | 'inhaler';

  /**
   * Basic medication information returned from a barcode scan
   */
  export interface MedicationInfo {
    id: string;
    name: string;
    dosage: string;
    form: MedicationForm;
    manufacturer: string;
    expiryDate?: string;
  }

  /**
   * Options for configuring a barcode scan
   */
  export interface ScanOptions {
    /**
     * Type of scan to perform
     */
    scanType: 'medication' | 'prescription' | 'patient';
    
    /**
     * Timeout in seconds
     */
    timeout?: number;
    
    /**
     * Specific barcode types to detect
     */
    barcodeTypes?: BarcodeType[];
    
    /**
     * Enable scan sound
     */
    enableSound?: boolean;
    
    /**
     * Enable haptic feedback
     */
    enableHaptic?: boolean;
  }

  /**
   * Result of a successful barcode scan
   */
  export interface ScanResult {
    /**
     * Whether the scan was successful
     */
    success: boolean;
    
    /**
     * Scan data
     */
    data: {
      /**
       * Barcode code/value
       */
      code: string;
      
      /**
       * Type of barcode
       */
      type: BarcodeType;
      
      /**
       * Medication information
       */
      medication: MedicationInfo;
    };
  }

  /**
   * Settings for the barcode scanner
   */
  export interface ScannerSettings {
    /**
     * Camera resolution
     */
    resolution?: 'low' | 'medium' | 'high';
    
    /**
     * Auto-focus
     */
    autoFocus?: boolean;
    
    /**
     * Enable torch/flashlight
     */
    enableTorch?: boolean;
    
    /**
     * Scan front-facing codes only
     */
    frontFacingOnly?: boolean;
  }

  /**
   * Scan a medication barcode
   * @param options - Scan configuration options
   * @returns Promise with scan result
   */
  export function scanBarcode(options: ScanOptions): Promise<ScanResult>;

  /**
   * Check if the barcode scanner is available on the device
   * @returns boolean indicating scanner availability
   */
  export function isScannerAvailable(): boolean;

  /**
   * Configure scanner settings
   * @param settings - Scanner settings to configure
   * @returns boolean indicating if settings were applied successfully
   */
  export function configureScannerSettings(settings: ScannerSettings): boolean;
} 