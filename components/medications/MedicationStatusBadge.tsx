/**
 * @module components/medications/MedicationStatusBadge
 * @description A status badge component for displaying medication status
 */

import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { FlexRow } from '../styled/containers';

/** Available medication status types */
export const MEDICATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRING: 'expiring',
  EXPIRED: 'expired',
  NEEDS_REFILL: 'needs_refill',
} as const;

/** Type for medication status values */
export type MedicationStatus = typeof MEDICATION_STATUS[keyof typeof MEDICATION_STATUS];

/**
 * Props for the MedicationStatusBadge component
 * @interface MedicationStatusBadgeProps
 */
export interface MedicationStatusBadgeProps {
  /** The current status */
  status: MedicationStatus;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * Styled badge container
 */
const Badge = styled(FlexRow)<{ status: MedicationStatus }>`
  background-color: ${({ theme, status }) => {
    switch (status) {
      case MEDICATION_STATUS.ACTIVE:
        return `${theme.colors.success}20`;
      case MEDICATION_STATUS.INACTIVE:
        return `${theme.colors.error}20`;
      case MEDICATION_STATUS.EXPIRING:
      case MEDICATION_STATUS.NEEDS_REFILL:
        return `${theme.colors.warning}20`;
      default:
        return `${theme.colors.secondary}20`;
    }
  }};
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

/**
 * Maps status to display text
 */
const getStatusText = (status: MedicationStatus): string => {
  switch (status) {
    case MEDICATION_STATUS.ACTIVE:
      return 'Active';
    case MEDICATION_STATUS.INACTIVE:
      return 'Inactive';
    case MEDICATION_STATUS.EXPIRING:
      return 'Expiring Soon';
    case MEDICATION_STATUS.EXPIRED:
      return 'Expired';
    case MEDICATION_STATUS.NEEDS_REFILL:
      return 'Needs Refill';
    default:
      return 'Unknown';
  }
};

/**
 * Maps status to icon name
 */
const getStatusIcon = (status: MedicationStatus): string => {
  switch (status) {
    case MEDICATION_STATUS.ACTIVE:
      return 'checkmark.circle.fill';
    case MEDICATION_STATUS.INACTIVE:
      return 'xmark.circle.fill';
    case MEDICATION_STATUS.EXPIRING:
      return 'clock.fill';
    case MEDICATION_STATUS.EXPIRED:
      return 'exclamationmark.circle.fill';
    case MEDICATION_STATUS.NEEDS_REFILL:
      return 'bell.fill';
    default:
      return 'questionmark.circle.fill';
  }
};

/**
 * A status badge component that displays medication status with appropriate
 * styling and optional icon. The badge color and icon change based on the
 * status type.
 * 
 * @component
 * @param {MedicationStatusBadgeProps} props - The component props
 * @returns {JSX.Element} A status badge component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function MedicationItem() {
 *   return (
 *     <MedicationStatusBadge
 *       status={MEDICATION_STATUS.ACTIVE}
 *       showIcon
 *     />
 *   );
 * }
 * 
 * @example
 * // Without icon
 * function MedicationList() {
 *   return medications.map(med => (
 *     <View key={med.id}>
 *       <Text>{med.name}</Text>
 *       <MedicationStatusBadge status={med.status} />
 *     </View>
 *   ));
 * }
 * ```
 */
export const MedicationStatusBadge = memo(function MedicationStatusBadge({
  status,
  showIcon = true,
  style,
  testID,
}: MedicationStatusBadgeProps): JSX.Element {
  const theme = useTheme();

  const getStatusColor = (status: MedicationStatus) => {
    switch (status) {
      case MEDICATION_STATUS.ACTIVE:
        return theme.colors.success;
      case MEDICATION_STATUS.INACTIVE:
        return theme.colors.error;
      case MEDICATION_STATUS.EXPIRING:
      case MEDICATION_STATUS.NEEDS_REFILL:
        return theme.colors.warning;
      default:
        return theme.colors.secondary;
    }
  };

  return (
    <Badge
      status={status}
      style={style}
      testID={testID || `medication-status-badge-${status}`}
      accessibilityRole="text"
      accessibilityLabel={`Medication status: ${getStatusText(status)}`}
    >
      {showIcon && (
        <IconSymbol
          name={getStatusIcon(status)}
          size={16}
          color={getStatusColor(status)}
        />
      )}
      <ThemedText
        type="defaultSemiBold"
        color={getStatusColor(status)}
      >
        {getStatusText(status)}
      </ThemedText>
    </Badge>
  );
}); 