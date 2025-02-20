import { useEffect } from 'react';
import styled from 'styled-components/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import type { CustomTheme } from '@/theme/types';
import { ThemedText } from '@/components/ThemedText';

interface WaveTextProps {
  theme: CustomTheme;
}

const WaveText = styled(ThemedText)<WaveTextProps>`
  font-size: ${({ theme }: WaveTextProps) => theme.typography.sizes.title - 4}px;
  line-height: ${({ theme }: WaveTextProps) => theme.typography.lineHeights.title}px;
  margin-top: -6px;
`;

/**
 * A component that displays an animated waving hand emoji
 * @component
 * @returns {JSX.Element} An animated waving emoji
 */
export function HelloWave(): JSX.Element {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }), 
        withTiming(0, { duration: 150 })
      ),
      4 // Run the animation 4 times
    );
  }, [rotationAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View 
      style={animatedStyle}
      accessibilityLabel="Waving hand emoji"
      accessibilityRole="image"
    >
      <WaveText>👋</WaveText>
    </Animated.View>
  );
}
