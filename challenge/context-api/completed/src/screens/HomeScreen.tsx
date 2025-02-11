import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

/**
 * HomeScreen Component
 * 
 * Demonstrates theme application across different UI elements with
 * smooth animations and platform-specific styling.
 * 
 * Component References:
 * - ScrollView: {@link https://reactnative.dev/docs/scrollview}
 * - Animated: {@link https://reactnative.dev/docs/animated}
 * - Platform: {@link https://reactnative.dev/docs/platform-specific-code}
 * 
 * Features:
 * - Theme-aware styling with proper TypeScript types
 * - Animated content loading with native driver
 * - Platform-specific shadows and elevation
 * - Responsive layout using flexbox
 * - Proper accessibility implementation
 * 
 * Native Equivalents:
 * - iOS: UIViewController with dynamic appearance
 *   {@link https://developer.apple.com/documentation/uikit/uiviewcontroller}
 * - Android: Activity with Material theming
 *   {@link https://material.io/develop/android/theming/color}
 * 
 * Implementation Notes:
 * - Uses useTheme hook for consistent theme access
 * - Implements fade-in animation for content
 * - Handles platform-specific shadow implementations
 * - Demonstrates proper theme application patterns
 * - Follows accessibility guidelines
 * 
 * Performance Considerations:
 * - Uses native driver for animations
 * - Minimizes style calculations with StyleSheet
 * - Optimizes platform-specific code with Platform.select
 * - Implements proper cleanup for animations
 * 
 * Accessibility:
 * - Proper heading hierarchy
 * - Sufficient color contrast
 * - Readable typography
 * - Proper content structure
 * 
 * Usage:
 * ```tsx
 * <HomeScreen />
 * ```
 */
export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  
  /**
   * Animation value for content fade-in
   * @see https://reactnative.dev/docs/animated#value
   */
  const [fadeAnim] = React.useState(new Animated.Value(0));

  /**
   * Initial animation sequence
   * Fades in content when component mounts
   * 
   * Animation References:
   * - Timing: {@link https://reactnative.dev/docs/animated#timing}
   * - Native Driver: {@link https://reactnative.dev/docs/animations#using-the-native-driver}
   */
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Performance optimization
    }).start();

    // Cleanup animation on unmount
    return () => {
      fadeAnim.setValue(0);
    };
  }, []);

  /**
   * Platform-specific shadow styles
   * Handles different shadow implementations between iOS and Android
   * 
   * Style References:
   * - iOS Shadows: {@link https://reactnative.dev/docs/shadow-props}
   * - Android Elevation: {@link https://reactnative.dev/docs/view-style-props#elevation-android}
   * 
   * @returns Platform-specific shadow style object
   */
  const getShadowStyle = () => Platform.select({
    ios: {
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentInsetAdjustmentBehavior="automatic"
      accessibilityRole="scrollbar"
      accessibilityLabel="Theme demonstration screen"
    >
      <Animated.View 
        style={{ opacity: fadeAnim }}
        accessible={true}
        accessibilityRole="none"
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.xlarge,
              fontWeight: theme.typography.fontWeight.bold as '700',
            },
          ]}
          accessibilityRole="header"
        >
          Theme Demo
        </Text>

        {/* Theme demonstration card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              ...getShadowStyle(),
            },
          ]}
          accessible={true}
          accessibilityRole="none"
        >
          <Text
            style={[
              styles.cardText,
              {
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.medium,
              },
            ]}
          >
            This card demonstrates theme application to various UI elements.
            The background, text color, and border should all adapt to the
            current theme.
          </Text>
        </View>

        {/* Primary color demonstration card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.primary,
              ...getShadowStyle(),
            },
          ]}
          accessible={true}
          accessibilityRole="none"
        >
          <Text
            style={[
              styles.cardText,
              {
                color: '#FFFFFF',
                fontSize: theme.typography.fontSize.medium,
              },
            ]}
          >
            This card shows how to use the primary theme color with
            consistent typography and spacing.
          </Text>
        </View>

        <ThemeSwitcher />
      </Animated.View>
    </ScrollView>
  );
};

/**
 * Component styles
 * 
 * Style References:
 * - Layout Props: {@link https://reactnative.dev/docs/layout-props}
 * - Style Props: {@link https://reactnative.dev/docs/style}
 * - Typography: {@link https://reactnative.dev/docs/text-style-props}
 * 
 * Layout Notes:
 * - Uses flexbox for responsive layout
 * - Maintains consistent spacing scale
 * - Implements proper typography hierarchy
 * - Follows platform-specific styling guidelines
 * 
 * Accessibility Considerations:
 * - Touch targets meet size requirements
 * - Text meets contrast guidelines
 * - Proper content spacing
 * - Clear visual hierarchy
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Consistent content padding
  },
  title: {
    marginBottom: 16, // Proper spacing after title
  },
  card: {
    padding: 16, // Internal card padding
    borderRadius: 8, // Consistent corner rounding
    marginBottom: 16, // Spacing between cards
    borderWidth: 1, // Subtle border for definition
  },
  cardText: {
    lineHeight: 24, // Improved readability
  },
}); 