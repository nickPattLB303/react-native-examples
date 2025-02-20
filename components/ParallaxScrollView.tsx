import type { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components/native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { CustomTheme } from '@/theme/types';

/** Height of the parallax header in pixels */
const HEADER_HEIGHT = 250;

/**
 * @interface StyledProps
 * @description Base props for styled components with theme support
 */
interface StyledProps {
  theme: CustomTheme;
}

/** Styled container component */
const Container = styled(ThemedView)<StyledProps>`
  flex: 1;
`;

/** Props for the styled header component */
interface HeaderProps {
  backgroundColor: string;
  theme: CustomTheme;
}

/** Styled header component with animation support */
const Header = styled(Animated.View)<HeaderProps>`
  height: ${HEADER_HEIGHT}px;
  overflow: hidden;
  background-color: ${({ backgroundColor }: HeaderProps) => backgroundColor};
`;

/** Styled content container */
const Content = styled(ThemedView)<StyledProps>`
  flex: 1;
  padding: ${({ theme }: StyledProps) => theme.spacing.xl}px;
  gap: ${({ theme }: StyledProps) => theme.spacing.md}px;
  overflow: hidden;
`;

/**
 * Props for the ParallaxScrollView component
 * @interface ParallaxScrollViewProps
 */
interface ParallaxScrollViewProps extends PropsWithChildren {
  /** React element to be displayed in the header */
  headerImage: ReactElement;
  /** Background colors for light and dark themes */
  headerBackgroundColor: {
    dark: string;
    light: string;
  };
}

/**
 * A scrollable component with parallax header effect
 * @component
 * @param {ParallaxScrollViewProps} props - The component props
 * @returns {JSX.Element} A scrollable view with parallax header effect
 */
export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: ParallaxScrollViewProps): JSX.Element {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  /** Animated style for the parallax header effect */
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Container>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Header
          backgroundColor={headerBackgroundColor[colorScheme]}
          style={headerAnimatedStyle}>
          {headerImage}
        </Header>
        <Content>{children}</Content>
      </Animated.ScrollView>
    </Container>
  );
}
