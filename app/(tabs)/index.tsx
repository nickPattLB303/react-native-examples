/**
 * @module app/tabs/HomeScreen
 * @description Home screen component with welcome message and getting started steps
 */

import { Image, Platform } from 'react-native';
import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * @interface StyledProps
 * @description Base props for styled components with theme support
 */
interface StyledProps {
  theme: DefaultTheme;
}

/**
 * @component TitleContainer
 * @description Container for the welcome title and wave animation
 */
const TitleContainer = styled(ThemedView)<StyledProps>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }: StyledProps) => theme.spacing.sm}px;
`;

/**
 * @component StepContainer
 * @description Container for each getting started step
 */
const StepContainer = styled(ThemedView)<StyledProps>`
  gap: ${({ theme }: StyledProps) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }: StyledProps) => theme.spacing.sm}px;
`;

/**
 * @component ReactLogo
 * @description Styled React logo image for the header
 */
const ReactLogo = styled(Image)`
  height: 178px;
  width: 290px;
  bottom: 0;
  left: 0;
  position: absolute;
`;

/**
 * @function HomeScreen
 * @description Main home screen component with welcome message and getting started steps
 * @returns {React.ReactElement} The home screen component
 */
export default function HomeScreen(): React.ReactElement {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ReactLogo source={require('@/assets/images/partial-react-logo.png')} />
      }>
      <TitleContainer>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </TitleContainer>
      <StepContainer>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </StepContainer>
      <StepContainer>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </StepContainer>
      <StepContainer>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </StepContainer>
    </ParallaxScrollView>
  );
}
