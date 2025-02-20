/**
 * @module components/orders/OrderTrackingCard
 * @description A card component for displaying order tracking information
 */

import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle, Linking } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { Card, FlexRow } from '../styled/containers';

/**
 * Props for the OrderTrackingCard component
 * @interface OrderTrackingCardProps
 */
export interface OrderTrackingCardProps {
  /** Tracking number */
  trackingNumber: string;
  /** Carrier name */
  carrier: string;
  /** Current location */
  currentLocation?: string;
  /** Estimated delivery date */
  estimatedDelivery?: string;
  /** Last update timestamp */
  lastUpdate?: string;
  /** Optional tracking URL */
  trackingUrl?: string;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional test ID for testing */
  testID?: string;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Styled info section
 */
const InfoSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * Styled map preview container
 */
const MapPreview = styled.View`
  height: 120px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  justify-content: center;
`;

/**
 * Styled divider
 */
const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.surfaceVariant};
  margin-vertical: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * A card component that displays comprehensive order tracking information
 * including current location, estimated delivery, and a map preview.
 * 
 * @component
 * @param {OrderTrackingCardProps} props - The component props
 * @returns {JSX.Element} An order tracking card component
 * 
 * @example
 * ```tsx
 * function OrderTracking() {
 *   return (
 *     <OrderTrackingCard
 *       trackingNumber="1Z999AA1234567890"
 *       carrier="UPS"
 *       currentLocation="San Francisco, CA"
 *       estimatedDelivery="2024-03-20"
 *       lastUpdate="2024-03-15 14:30"
 *       trackingUrl="https://ups.com/track?id=1Z999AA1234567890"
 *     />
 *   );
 * }
 * ```
 */
export const OrderTrackingCard = memo(function OrderTrackingCard({
  trackingNumber,
  carrier,
  currentLocation,
  estimatedDelivery,
  lastUpdate,
  trackingUrl,
  style,
  testID,
  onError,
}: OrderTrackingCardProps): JSX.Element {
  const theme = useTheme();

  const handleTrackingPress = useCallback(async () => {
    if (!trackingUrl) return;

    try {
      const canOpen = await Linking.canOpenURL(trackingUrl);
      if (canOpen) {
        await Linking.openURL(trackingUrl);
      } else {
        throw new Error('Cannot open tracking URL');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to open tracking URL'));
    }
  }, [trackingUrl, onError]);

  return (
    <Card
      style={style}
      testID={testID || 'order-tracking-card'}
    >
      <InfoSection>
        <FlexRow>
          <IconSymbol
            name="box.truck.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText type="title">
            Tracking Information
          </ThemedText>
        </FlexRow>

        <FlexRow>
          <IconSymbol
            name="number.circle.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>
            {carrier} - {trackingNumber}
          </ThemedText>
        </FlexRow>

        {currentLocation && (
          <FlexRow>
            <IconSymbol
              name="location.fill"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>
              Current Location: {currentLocation}
            </ThemedText>
          </FlexRow>
        )}

        {estimatedDelivery && (
          <FlexRow>
            <IconSymbol
              name="calendar"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>
              Estimated Delivery: {estimatedDelivery}
            </ThemedText>
          </FlexRow>
        )}

        {lastUpdate && (
          <FlexRow>
            <IconSymbol
              name="clock.fill"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>
              Last Update: {lastUpdate}
            </ThemedText>
          </FlexRow>
        )}
      </InfoSection>

      <MapPreview>
        <IconSymbol
          name="map.fill"
          size={48}
          color={theme.colors.onSurfaceVariant}
        />
        <ThemedText
          type="default"
          color={theme.colors.onSurfaceVariant}
        >
          Map preview coming soon
        </ThemedText>
      </MapPreview>

      <Divider />

      {trackingUrl && (
        <ThemedText
          type="link"
          onPress={handleTrackingPress}
          accessibilityRole="button"
          accessibilityHint="Double tap to open tracking details in browser"
        >
          View Detailed Tracking
        </ThemedText>
      )}
    </Card>
  );
}); 