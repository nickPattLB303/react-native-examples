/**
 * @module providers/QueryProvider
 * @description React Query provider with default configuration for the app
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * Default React Query client configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

/**
 * @interface QueryProviderProps
 * @description Props for the QueryProvider component
 */
interface QueryProviderProps {
  /** React child components */
  children: React.ReactNode;
}

/**
 * @function QueryProvider
 * @description Provides React Query context with default configuration
 * @param {QueryProviderProps} props - Component props
 * @returns {React.ReactElement} A query provider component
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <QueryProvider>
 *       <AppContent />
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 