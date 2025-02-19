/**
 * @module RootLayout
 * @description Root layout component that provides theme and navigation configuration
 */

import { DarkTheme, DefaultTheme, Theme as NavigationTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/lib/typescript/types';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * @interface FontStyle
 * @description Defines the structure for font styles
 */
interface FontStyle {
  fontFamily: string;
  fontWeight: '400' | '500' | '700' | '900';
}

/**
 * @interface FontConfig
 * @description Defines the structure for font configuration
 */
interface FontConfig {
  regular: FontStyle;
  medium: FontStyle;
  bold: FontStyle;
  heavy: FontStyle;
}

// Adapt navigation theme to MD3
const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DarkTheme,
});

/**
 * @constant fontConfig
 * @description System font configuration for the application
 */
const fontConfig: FontConfig = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
  heavy: {
    fontFamily: 'System',
    fontWeight: '900',
  },
};

/**
 * @type CustomTheme
 * @description Combined type for Material Design 3 and Navigation themes
 */
type CustomTheme = MD3Theme & NavigationTheme;

/**
 * @constant CustomLightTheme
 * @description Light theme configuration combining MD3 and Navigation themes
 */
const CustomLightTheme: CustomTheme = {
  ...MD3LightTheme,
  ...NavigationLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationLightTheme.colors,
    primary: Colors.light.tint,
    secondary: Colors.light.tabIconDefault,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    ...fontConfig,
  },
};

/**
 * @constant CustomDarkTheme
 * @description Dark theme configuration combining MD3 and Navigation themes
 */
const CustomDarkTheme: CustomTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: Colors.dark.tint,
    secondary: Colors.dark.tabIconDefault,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    ...fontConfig,
  },
};

/**
 * @function RootLayout
 * @description Root layout component that provides theme and navigation configuration
 * @returns {React.ReactElement} The root layout component with theme and navigation providers
 */
export default function RootLayout(): React.ReactElement | null {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
