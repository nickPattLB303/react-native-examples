import React, { useEffect } from 'react';
import {
  Text,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

interface StyledProps {
  theme: {
    colors: {
      background: string;
      text: string;
      card: string;
      border: string;
      primary: string;
    };
    typography: {
      fontSize: {
        medium: number;
        xlarge: number;
      };
      fontWeight: {
        bold: string;
      };
    };
  };
}

/**
 * Styled Components
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
const Container = styled(ScrollView)<StyledProps>`
  flex: 1;
  padding: 16px;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;

const Title = styled(Text)<StyledProps>`
  margin-bottom: 16px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  font-size: ${(props: StyledProps) => props.theme.typography.fontSize.xlarge}px;
  font-weight: ${(props: StyledProps) => props.theme.typography.fontWeight.bold};
`;

const Card = styled(Animated.View)<StyledProps>`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-width: 1px;
  background-color: ${(props: StyledProps) => props.theme.colors.card};
  border-color: ${(props: StyledProps) => props.theme.colors.border};
  ${Platform.select({
    ios: `
      shadow-color: ${(props: StyledProps) => props.theme.colors.text};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;

const PrimaryCard = styled(Card)`
  background-color: ${(props: StyledProps) => props.theme.colors.primary};
`;

const CardText = styled(Text)<StyledProps>`
  line-height: 24px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  font-size: ${(props: StyledProps) => props.theme.typography.fontSize.medium}px;
`;

const WhiteText = styled(CardText)`
  color: #FFFFFF;
`;

/**
 * HomeScreen Component
 * 
 * Demonstrates theme application across different UI elements with
 * smooth animations and platform-specific styling using styled-components.
 * 
 * Component References:
 * - styled-components: {@link https://styled-components.com/docs/basics#react-native}
 * - Animated: {@link https://reactnative.dev/docs/animated}
 * - Platform: {@link https://reactnative.dev/docs/platform-specific-code}
 * 
 * Features:
 * - Theme-aware styling with styled-components
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
 * - Uses styled-components for theme-aware styling
 * - Demonstrates proper theme application patterns
 * - Follows accessibility guidelines
 * 
 * Performance Considerations:
 * - Uses native driver for animations
 * - Optimizes styled-components with proper typing
 * - Implements proper cleanup for animations
 * - Uses memoization where appropriate
 * 
 * Accessibility:
 * - Proper heading hierarchy
 * - Sufficient color contrast
 * - Readable typography
 * - Proper content structure
 * 
 * Styled Components:
 * - Container: Main scrollable container with theme background
 * - Title: Themed text component with proper typography
 * - Card: Themed card with platform-specific shadows
 * - CardText: Themed text with proper line height
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

  return (
    <Container
      contentInsetAdjustmentBehavior="automatic"
      accessibilityRole="scrollbar"
      accessibilityLabel="Theme demonstration screen"
    >
      <Animated.View 
        style={{ opacity: fadeAnim }}
        accessible={true}
        accessibilityRole="none"
      >
        <Title accessibilityRole="header">
          Theme Demo
        </Title>

        {/* Theme demonstration card */}
        <Card
          accessible={true}
          accessibilityRole="none"
        >
          <CardText>
            This card demonstrates theme application to various UI elements.
            The background, text color, and border should all adapt to the
            current theme.
          </CardText>
        </Card>

        {/* Primary color demonstration card */}
        <PrimaryCard
          accessible={true}
          accessibilityRole="none"
        >
          <WhiteText>
            This card shows how to use the primary theme color with
            consistent typography and spacing.
          </WhiteText>
        </PrimaryCard>

        <ThemeSwitcher />
      </Animated.View>
    </Container>
  );
}; 