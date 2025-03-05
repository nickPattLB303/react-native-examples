/**
 * @fileoverview Utility for monitoring performance in the app
 * @author React Native Training Team
 * @created 2023-07-01
 */

/**
 * A simple performance monitoring utility to measure execution time
 * of operations in the application.
 */
export class PerformanceMonitor {
  private measurements: Record<string, number[]> = {};
  private activeTimers: Record<string, number> = {};
  
  /**
   * Start measuring the execution time of an operation
   * @param label - Identifier for the operation being measured
   * @returns A function to call when the operation is complete
   */
  startMeasure(label: string): () => void {
    const startTime = performance.now();
    const uniqueId = `${label}-${Date.now()}`;
    this.activeTimers[uniqueId] = startTime;
    
    return () => {
      this.endMeasure(uniqueId, label);
    };
  }
  
  /**
   * End the measurement for an operation and record the duration
   * @param uniqueId - Unique identifier for this specific measurement
   * @param label - Identifier for the operation being measured
   */
  private endMeasure(uniqueId: string, label: string): void {
    const endTime = performance.now();
    const startTime = this.activeTimers[uniqueId];
    
    if (!startTime) {
      console.warn(`No active timer found for ${label} with ID ${uniqueId}`);
      return;
    }
    
    const duration = endTime - startTime;
    
    if (!this.measurements[label]) {
      this.measurements[label] = [];
    }
    
    this.measurements[label].push(duration);
    
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    
    // Clean up the active timer
    delete this.activeTimers[uniqueId];
  }
  
  /**
   * Get the average duration for a specific operation
   * @param label - Identifier for the operation
   * @returns The average duration in milliseconds, or null if no measurements exist
   */
  getAverageDuration(label: string): number | null {
    const measurements = this.measurements[label];
    
    if (!measurements || measurements.length === 0) {
      return null;
    }
    
    const sum = measurements.reduce((acc, duration) => acc + duration, 0);
    return sum / measurements.length;
  }
  
  /**
   * Get all measurements for a specific operation
   * @param label - Identifier for the operation
   * @returns Array of durations in milliseconds, or empty array if no measurements exist
   */
  getMeasurements(label: string): number[] {
    return this.measurements[label] || [];
  }
  
  /**
   * Clear all measurements for a specific operation
   * @param label - Identifier for the operation
   */
  clearMeasurements(label: string): void {
    if (this.measurements[label]) {
      delete this.measurements[label];
    }
  }
  
  /**
   * Clear all measurements
   */
  clearAllMeasurements(): void {
    this.measurements = {};
  }
  
  /**
   * Get a summary of all measurements
   * @returns Object containing average durations for all measured operations
   */
  getSummary(): Record<string, number | null> {
    const summary: Record<string, number | null> = {};
    
    for (const label in this.measurements) {
      summary[label] = this.getAverageDuration(label);
    }
    
    return summary;
  }
} 