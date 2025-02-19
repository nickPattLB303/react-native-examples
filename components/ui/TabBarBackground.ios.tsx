/**
 * @module components/ui/TabBarBackground
 * @description iOS-specific tab bar background with blur effect
 */

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * @component StyledBlurView
 * @description Styled blur view that fills its container
 */
const StyledBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

/**
 * @function BlurTabBarBackground
 * @description Component that provides a native blur effect for the tab bar background
 * @returns {React.ReactElement} A blur view component
 */
export default function BlurTabBarBackground(): React.ReactElement {
  return (
    <StyledBlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
    />
  );
}

/**
 * @function useBottomTabOverflow
 * @description Hook to calculate the bottom tab overflow accounting for safe area
 * @returns {number} The calculated overflow value in pixels
 */
export function useBottomTabOverflow(): number {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
