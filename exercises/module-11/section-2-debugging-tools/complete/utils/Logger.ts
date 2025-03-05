/**
 * @fileoverview Logger utility for debugging
 * @author React Native Training Team
 * @created 2023-07-01
 */

// Log levels
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

/**
 * Logger utility for structured logging
 */
export class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  
  /**
   * Log a debug message
   * @param message The message to log
   * @param data Additional data to log
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }
  
  /**
   * Log an info message
   * @param message The message to log
   * @param data Additional data to log
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }
  
  /**
   * Log a warning message
   * @param message The message to log
   * @param data Additional data to log
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }
  
  /**
   * Log an error message
   * @param message The message to log
   * @param data Additional data to log
   */
  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }
  
  /**
   * Log a message with the specified level
   * @param level The log level
   * @param message The message to log
   * @param data Additional data to log
   */
  private log(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
    
    // Add to logs array
    this.logs.push(entry);
    
    // Keep logs under the maximum size
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
    
    // Log to console with appropriate styling
    const formattedData = data ? JSON.stringify(data) : '';
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[${level}] ${message}`, formattedData);
        break;
      case LogLevel.INFO:
        console.info(`[${level}] ${message}`, formattedData);
        break;
      case LogLevel.WARN:
        console.warn(`[${level}] ${message}`, formattedData);
        break;
      case LogLevel.ERROR:
        console.error(`[${level}] ${message}`, formattedData);
        break;
    }
  }
  
  /**
   * Get all logs
   * @returns All logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }
  
  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }
  
  /**
   * Export logs as JSON
   * @returns Logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(this.logs);
  }
} 