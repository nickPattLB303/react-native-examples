/**
 * @module components/ui/IconSymbol
 * @description Cross-platform icon component that uses MaterialIcons on Android and web
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import type { MaterialIconName } from '@expo/vector-icons/MaterialIcons';

/**
 * Mapping of SFSymbol names to MaterialIcons names
 * @see https://icons.expo.fyi for MaterialIcons
 * @see SF Symbols app on Mac for SFSymbols
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'box.fill': 'inventory',
  'gear.fill': 'settings',
  'person.fill': 'person',
  'cart.fill': 'shopping-cart',
  'bell.fill': 'notifications',
  'magnifyingglass': 'search',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'plus': 'add',
  'minus': 'remove',
  'xmark': 'close',
  'checkmark': 'check',
} as const;

/** Available icon names based on the mapping */
export type IconSymbolName = keyof typeof MAPPING;

/** Props for the IconSymbol component */
export interface IconSymbolProps {
  /** Name of the icon from the available SFSymbol mappings */
  name: IconSymbolName;
  /** Size of the icon in pixels */
  size?: number;
  /** Color of the icon */
  color: string | OpaqueColorValue;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Weight of the icon (only applies to iOS) */
  weight?: SymbolWeight;
}

/**
 * A cross-platform icon component that provides consistent icons across platforms
 * Uses native SFSymbols on iOS and MaterialIcons on Android/web
 * 
 * @component
 * @param {IconSymbolProps} props - The component props
 * @returns {JSX.Element} An icon component
 * 
 * @example
 * ```tsx
 * <IconSymbol
 *   name="house.fill"
 *   size={24}
 *   color="#000000"
 *   weight="medium"
 * />
 * ```
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: IconSymbolProps): JSX.Element {
  const materialIconName = MAPPING[name] as MaterialIconName;
  
  return (
    <MaterialIcons 
      color={color} 
      size={size} 
      name={materialIconName} 
      style={style} 
    />
  );
}
