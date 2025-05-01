import { Stack } from 'expo-router';

/**
 * Root Layout Configuration for the SpeedyMedsPOC App.
 *
 * This component sets up the main navigation structure using Expo Router's Stack navigator.
 * It primarily renders the Tab navigator defined in '(tabs)' but can also be used
 * to configure global settings or add screens outside the tabs (e.g., modals).
 *
 * Expo Router uses file-based routing, and '_layout.js' files define the layout
 * structure for a directory segment.
 *
 * @see https://docs.expo.dev/router/layouts/ - Expo Router Layouts Documentation
 * @see https://docs.expo.dev/router/navigating/stack/ - Expo Router Stack Navigator Documentation
 */
export default function RootLayout() {
  return (
    // The Stack navigator provides a way to transition between screens where
    // new screens are placed on top of a stack.
    <Stack>
      {/*
       * Defines the screen for the main tab navigator.
       * It references the layout defined in 'app/(tabs)/_layout.js'.
       * The 'headerShown: false' option hides the header for this specific stack screen,
       * allowing the Tab navigator or nested Stack navigators to manage their own headers.
       */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/*
       * Add other stack screens here if needed, for example, a modal:
       * <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
       */}
    </Stack>
  );
} 