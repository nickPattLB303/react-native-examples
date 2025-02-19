import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Props for the ThemedView component
 * @interface ThemedViewProps
 * @extends {ViewProps}
 */
export interface ThemedViewProps extends ViewProps {
  /** Optional color to use in light theme */
  lightColor?: string;
  /** Optional color to use in dark theme */
  darkColor?: string;
}

/**
 * A themed view component that adapts its background color based on the current theme
 * 
 * @component
 * @param {ThemedViewProps} props - The component props
 * @param {ViewStyle} [props.style] - Optional style overrides
 * @param {string} [props.lightColor] - Color to use in light theme
 * @param {string} [props.darkColor] - Color to use in dark theme
 * @returns {JSX.Element} A themed view component
 * 
 * @example
 * ```tsx
 * <ThemedView
 *   lightColor="#ffffff"
 *   darkColor="#000000"
 *   style={{ padding: 16 }}
 * >
 *   {children}
 * </ThemedView>
 * ```
 */
export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  ...otherProps 
}: ThemedViewProps): JSX.Element {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor }, 
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
