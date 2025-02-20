import { PropsWithChildren } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue,
  withSpring,
  interpolate
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const AnimatedIcon = Animated.createAnimatedComponent(IconSymbol);
const AnimatedView = Animated.createAnimatedComponent(ThemedView);

const SPACING = {
  xs: 8,
  lg: 24,
} as const;

/**
 * Props for the Collapsible component
 * @interface CollapsibleProps
 * @extends {PropsWithChildren}
 */
interface CollapsibleProps extends PropsWithChildren {
  /** Title to display in the collapsible header */
  title: string;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Initial state of the collapsible section */
  defaultOpen?: boolean;
  /** Optional callback when collapse state changes */
  onStateChange?: (isOpen: boolean) => void;
  /** Optional custom animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * A collapsible section component with smooth animations and accessibility support
 * 
 * @component
 * @param {CollapsibleProps} props - The component props
 * @returns {JSX.Element} A collapsible section component
 * 
 * @example
 * ```tsx
 * <Collapsible 
 *   title="Section Title" 
 *   defaultOpen={true}
 *   onStateChange={(isOpen) => console.log('Collapsible state:', isOpen)}
 * >
 *   <Text>Collapsible content goes here</Text>
 * </Collapsible>
 * ```
 */
export function Collapsible({ 
  children, 
  title,
  style,
  defaultOpen = false,
  onStateChange,
  animationDuration = 300,
}: CollapsibleProps): JSX.Element {
  const theme = useTheme();
  const rotationValue = useSharedValue(defaultOpen ? 1 : 0);
  const contentHeight = useSharedValue(defaultOpen ? 1 : 0);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ 
      rotate: `${interpolate(rotationValue.value, [0, 1], [0, 90])}deg`
    }]
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentHeight.value,
    transform: [{ 
      scale: interpolate(contentHeight.value, [0, 1], [0.95, 1])
    }]
  }));

  const handlePress = () => {
    const newValue = rotationValue.value === 0 ? 1 : 0;
    rotationValue.value = withSpring(newValue, {
      damping: 20,
      stiffness: 200
    });
    contentHeight.value = withTiming(newValue, {
      duration: animationDuration
    });
    onStateChange?.(newValue === 1);
  };

  return (
    <ThemedView style={style}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ expanded: rotationValue.value === 1 }}
        accessibilityHint={`Tap to ${rotationValue.value === 1 ? 'collapse' : 'expand'} section`}
      >
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
          <AnimatedIcon
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme.colors.onSurface}
            style={iconAnimatedStyle}
          />
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
      
      <AnimatedView 
        style={[
          { 
            marginTop: SPACING.xs,
            marginLeft: SPACING.lg 
          },
          contentAnimatedStyle
        ]}
      >
        {children}
      </AnimatedView>
    </ThemedView>
  );
}
