import React, { useState, memo, useCallback } from 'react';
import { Link, type LinkProps } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform, ActivityIndicator, type ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ThemedView } from './ThemedView';

/**
 * Props for the ExternalLink component
 * @interface ExternalLinkProps
 * @extends {Omit<LinkProps, 'href'>}
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ExternalLink href="https://example.com">
 *   Visit Example
 * </ExternalLink>
 * 
 * // With loading state
 * <ExternalLink 
 *   href="https://example.com"
 *   showLoadingState
 * >
 *   Visit with Loading
 * </ExternalLink>
 * 
 * // With error handling
 * <ExternalLink 
 *   href="https://example.com"
 *   onError={(error) => console.error('Failed to open:', error)}
 * >
 *   Visit with Error Handling
 * </ExternalLink>
 * 
 * // With custom styling
 * <ExternalLink 
 *   href="https://example.com"
 *   style={{ color: 'blue', fontSize: 16 }}
 * >
 *   Styled Link
 * </ExternalLink>
 * ```
 */
export interface ExternalLinkProps extends Omit<LinkProps, 'href'> {
  /** The URL to open in the browser */
  href: string;
  /** Optional callback when the link fails to open */
  onError?: (error: Error) => void;
  /** Whether to show a loading indicator while opening the browser */
  showLoadingState?: boolean;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * A component that handles external links in a platform-specific way.
 * On web, it opens in a new tab. On native, it opens in an in-app browser
 * using expo-web-browser. The component includes loading states and error
 * handling for a better user experience.
 * 
 * @component
 * @param {ExternalLinkProps} props - The component props
 * @returns {JSX.Element} A link component that handles external URLs
 * 
 * @example
 * // In a navigation menu
 * function NavigationMenu() {
 *   const handleError = useCallback((error: Error) => {
 *     showErrorToast(error.message);
 *   }, []);
 * 
 *   return (
 *     <View>
 *       <ExternalLink 
 *         href="https://docs.example.com"
 *         showLoadingState
 *         onError={handleError}
 *       >
 *         Documentation
 *       </ExternalLink>
 *     </View>
 *   );
 * }
 * 
 * @example
 * // In a card component
 * function ResourceCard({ url, title }) {
 *   return (
 *     <Card>
 *       <Card.Title title={title} />
 *       <Card.Content>
 *         <ExternalLink 
 *           href={url}
 *           showLoadingState
 *           style={{ color: theme.colors.primary }}
 *         >
 *           Learn More
 *         </ExternalLink>
 *       </Card.Content>
 *     </Card>
 *   );
 * }
 */
export const ExternalLink = memo(function ExternalLink({ 
  href, 
  onError,
  showLoadingState = false,
  testID,
  style,
  ...rest 
}: ExternalLinkProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  // Memoize the loading indicator style
  const loadingIndicatorStyle = React.useMemo((): ViewStyle => ({ 
    position: 'absolute',
    right: -24,
    top: '50%',
    transform: [{ translateY: -12 }]
  }), []);

  // Memoize the container style
  const containerStyle = React.useMemo(() => ({ 
    opacity: isLoading ? 0.7 : 1 
  }), [isLoading]);

  // Memoize the link style
  const linkStyle = React.useMemo(() => ([
    { color: theme.colors.primary },
    style
  ]), [theme.colors.primary, style]);

  // Memoize the press handler
  const handlePress = useCallback(async (event: any) => {
    if (Platform.OS !== 'web') {
      try {
        // Prevent the default behavior of linking to the default browser on native
        event.preventDefault();
        
        if (showLoadingState) {
          setIsLoading(true);
        }

        // Open the link in an in-app browser
        await openBrowserAsync(href);
      } catch (error) {
        // Handle any errors that occur while opening the browser
        const finalError = error instanceof Error 
          ? error 
          : new Error('Failed to open link');
        
        onError?.(finalError);
        
        // Log the error for debugging
        console.warn('ExternalLink error:', finalError);
      } finally {
        if (showLoadingState) {
          setIsLoading(false);
        }
      }
    }

    // Call the original onPress handler if provided
    rest.onPress?.(event);
  }, [href, showLoadingState, onError, rest]);

  return (
    <ThemedView style={containerStyle}>
      <Link
        target="_blank"
        accessibilityRole="link"
        accessibilityHint="Opens in external browser"
        accessibilityState={{ busy: isLoading }}
        testID={testID}
        style={linkStyle}
        {...rest}
        href={href as any} // Type assertion needed since expo-router doesn't handle external URLs well
        onPress={handlePress}
      />
      {isLoading && (
        <ThemedView style={loadingIndicatorStyle}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </ThemedView>
      )}
    </ThemedView>
  );
});
