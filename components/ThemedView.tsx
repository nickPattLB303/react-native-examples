import { View, type ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Props for the ThemedView component
 * @interface ThemedViewProps
 * @extends {ViewProps}
 */
export interface ThemedViewProps extends ViewProps {
  /** Optional background color override */
  backgroundColor?: string;
  /** Whether to apply safe area insets */
  useSafeArea?: boolean;
  /** Specific safe area edges to apply */
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Whether the view is pressable/interactive */
  isInteractive?: boolean;
  /** Accessibility role for the view */
  accessibilityRole?: 'none' | 'button' | 'header' | 'tablist' | 'tab';
  /** Accessibility label */
  accessibilityLabel?: string;
}

/**
 * A themed view component that adapts its background color based on the current theme
 * and handles safe area insets appropriately
 * 
 * @component
 * @param {ThemedViewProps} props - The component props
 * @returns {JSX.Element} A themed view component
 * 
 * @example
 * ```tsx
 * <ThemedView
 *   backgroundColor="#ffffff"
 *   useSafeArea
 *   safeAreaEdges={['top']}
 *   style={{ padding: 16 }}
 * >
 *   {children}
 * </ThemedView>
 * ```
 */
export function ThemedView({ 
  style, 
  backgroundColor,
  useSafeArea = false,
  safeAreaEdges = ['top', 'bottom', 'left', 'right'],
  isInteractive = false,
  accessibilityRole = 'none',
  accessibilityLabel,
  ...otherProps 
}: ThemedViewProps): JSX.Element {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const bgColor = backgroundColor || theme.colors.background;
  
  const safeAreaStyle = useSafeArea ? {
    paddingTop: safeAreaEdges.includes('top') ? insets.top : 0,
    paddingBottom: safeAreaEdges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: safeAreaEdges.includes('left') ? insets.left : 0,
    paddingRight: safeAreaEdges.includes('right') ? insets.right : 0,
  } : {};

  return (
    <View 
      style={[
        { backgroundColor: bgColor },
        safeAreaStyle,
        style
      ]} 
      accessible={isInteractive}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      {...otherProps} 
    />
  );
}
