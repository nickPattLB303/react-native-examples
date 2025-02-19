import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

/**
 * Props for the ExternalLink component
 * @interface ExternalLinkProps
 * @extends {Omit<ComponentProps<typeof Link>, 'href'>}
 */
interface ExternalLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  /** The URL to open in the browser */
  href: string;
}

/**
 * A component that handles external links in a platform-specific way
 * On web, it opens in a new tab
 * On native, it opens in an in-app browser using expo-web-browser
 * 
 * @component
 * @param {ExternalLinkProps} props - The component props
 * @returns {JSX.Element} A link component that handles external URLs
 * 
 * @example
 * ```tsx
 * <ExternalLink href="https://example.com">
 *   Visit Example
 * </ExternalLink>
 * ```
 */
export function ExternalLink({ href, ...rest }: ExternalLinkProps): JSX.Element {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native
          event.preventDefault();
          // Open the link in an in-app browser
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
