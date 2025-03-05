/**
 * @fileoverview Utility for monitoring performance in the app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import { InteractionManager } from 'react-native';

/**
 * A utility class for monitoring performance in the app
 */
export class PerformanceMonitor {
  private measurements: Record<string, { start: number; end?: number; duration?: number }> = {};
  private frameRateCallbacks: Array<(fps: number) => void> = [];
  private frameRateMonitorId: number | null = null;
  
  /**
   * Start measuring a performance metric
   * @param name The name of the metric to measure
   * @returns A function to call when the measurement is complete
   */
  startMeasure(name: string): () => void {
    const start = performance.now();
    this.measurements[name] = { start };
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      this.measurements[name] = { ...this.measurements[name], end, duration };
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      return duration;
    };
  }
  
  /**
   * Get all measurements
   * @returns A record of all measurements
   */
  getMeasurements(): Record<string, { start: number; end?: number; duration?: number }> {
    return { ...this.measurements };
  }
  
  /**
   * Clear all measurements
   */
  clearMeasurements(): void {
    this.measurements = {};
  }
  
  /**
   * Start monitoring frame rate
   * @param callback A function to call with the current frame rate
   * @returns A function to call to stop monitoring
   */
  monitorFrameRate(callback: (fps: number) => void): () => void {
    this.frameRateCallbacks.push(callback);
    
    if (this.frameRateMonitorId === null) {
      let lastFrameTime = performance.now();
      let frames = 0;
      
      const calculateFPS = () => {
        const now = performance.now();
        const delta = now - lastFrameTime;
        frames++;
        
        if (delta >= 1000) {
          const fps = frames * 1000 / delta;
          this.frameRateCallbacks.forEach(cb => cb(fps));
          frames = 0;
          lastFrameTime = now;
        }
        
        this.frameRateMonitorId = requestAnimationFrame(calculateFPS);
      };
      
      this.frameRateMonitorId = requestAnimationFrame(calculateFPS);
    }
    
    return () => {
      this.frameRateCallbacks = this.frameRateCallbacks.filter(cb => cb !== callback);
      
      if (this.frameRateCallbacks.length === 0 && this.frameRateMonitorId !== null) {
        cancelAnimationFrame(this.frameRateMonitorId);
        this.frameRateMonitorId = null;
      }
    };
  }
  
  /**
   * Run a function after interactions are complete
   * @param fn The function to run
   * @param name The name of the task for logging
   */
  runAfterInteractions(fn: () => void, name: string): void {
    console.log(`[Performance] Scheduling task: ${name}`);
    InteractionManager.runAfterInteractions(() => {
      const end = this.startMeasure(`Task_${name}`);
      fn();
      end();
    });
  }
} 