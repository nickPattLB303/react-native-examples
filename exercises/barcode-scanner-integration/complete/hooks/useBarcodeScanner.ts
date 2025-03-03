import { useState, useCallback } from 'react';

// Import types from our declaration file
// In a real app, these would come from the module
// but for this exercise, we'll import them from our defined types
import type { 
  ScanOptions, 
  ScanResult, 
  PharmacyScanOptions, 
  PharmacyScanResult 
} from 'medication-barcode-scanner';

// Mock reference to the scanner library
// In a real app, this would be properly imported
// @ts-ignore - using our declaration file for type safety
const medicationBarcodeScanner = (window as any).medicationBarcodeScanner;

/**
 * Possible states of the barcode scanner
 */
export type ScannerState = 'idle' | 'scanning' | 'completed' | 'error';

/**
 * Type of the scan result based on the scan options
 */
export type ScanResultType<T extends ScanOptions> = 
  T extends PharmacyScanOptions ? PharmacyScanResult : ScanResult;

/**
 * Hook parameters
 */
export interface UseBarcodeScannerOptions {
  /**
   * Auto-initialize the scanner when component mounts
   */
  autoInitialize?: boolean;
  
  /**
   * Callback when scan is successful
   */
  onScanSuccess?: (result: ScanResult | PharmacyScanResult) => void;
  
  /**
   * Callback when scan fails
   */
  onScanError?: (error: Error) => void;
}

/**
 * Hook return type
 */
export interface UseBarcodeScannerReturn {
  /**
   * Current state of the scanner
   */
  state: ScannerState;
  
  /**
   * Scan result (will be null if scan not completed or failed)
   */
  result: ScanResult | PharmacyScanResult | null;
  
  /**
   * Error object if scan failed
   */
  error: Error | null;
  
  /**
   * Whether the scanner is available on the device
   */
  isAvailable: boolean;
  
  /**
   * Start scanning with the given options
   */
  startScan: <T extends ScanOptions>(options: T) => Promise<ScanResultType<T> | null>;
  
  /**
   * Reset the scanner state
   */
  reset: () => void;
}

/**
 * Custom hook for using the medication barcode scanner
 * 
 * @param options - Configuration options for the scanner
 * @returns Object with scanner state, methods, and results
 */
export function useBarcodeScanner(
  options: UseBarcodeScannerOptions = {}
): UseBarcodeScannerReturn {
  // State for tracking scanner status
  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<ScanResult | PharmacyScanResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  // Check if scanner is available
  const checkAvailability = useCallback(() => {
    try {
      const available = medicationBarcodeScanner.isScannerAvailable();
      setIsAvailable(available);
      return available;
    } catch (err) {
      setIsAvailable(false);
      return false;
    }
  }, []);

  // Initialize scanner when component mounts
  useState(() => {
    if (options.autoInitialize) {
      checkAvailability();
    }
  });

  /**
   * Start scanning with the given options
   */
  const startScan = useCallback(async <T extends ScanOptions>(
    scanOptions: T
  ): Promise<ScanResultType<T> | null> => {
    // Reset state
    setResult(null);
    setError(null);
    setState('scanning');

    try {
      // Check availability first
      if (!checkAvailability()) {
        throw new Error('Barcode scanner is not available on this device');
      }

      // Determine which scan function to use based on options
      const scanMethod = 'checkInventory' in scanOptions ? 
        medicationBarcodeScanner.scanPharmacyBarcode : 
        medicationBarcodeScanner.scanBarcode;

      // Perform the scan
      const scanResult = await scanMethod(scanOptions) as ScanResultType<T>;

      // Update state with results
      setResult(scanResult);
      setState('completed');

      // Call success callback if provided
      if (options.onScanSuccess) {
        options.onScanSuccess(scanResult);
      }

      return scanResult;
    } catch (err) {
      // Handle errors
      const error = err instanceof Error ? err : new Error('Unknown scanner error');
      setError(error);
      setState('error');

      // Call error callback if provided
      if (options.onScanError) {
        options.onScanError(error);
      }

      return null;
    }
  }, [checkAvailability, options.onScanSuccess, options.onScanError]);

  /**
   * Reset the scanner state
   */
  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
  }, []);

  return {
    state,
    result,
    error,
    isAvailable,
    startScan,
    reset
  };
} 