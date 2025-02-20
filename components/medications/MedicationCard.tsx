/**
 * @module components/medications/MedicationCard
 * @description A detailed card component for displaying medication information
 */

import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { Card, FlexRow } from '../styled/containers';

/**
 * Props for the MedicationCard component
 * @interface MedicationCardProps
 */
export interface MedicationCardProps {
  /** Medication name */
  name: string;
  /** Medication dosage */
  dosage: string;
  /** Medication frequency */
  frequency: string;
  /** Next refill date */
  nextRefillDate?: string;
  /** Days supply remaining */
  daysSupplyRemaining?: number;
  /** Whether the medication is active */
  isActive?: boolean;
  /** Whether a refill is needed */
  needsRefill?: boolean;
  /** Optional refill action handler */
  onRefill?: () => void;
  /** Optional delete action handler */
  onDelete?: () => void;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
  /** Optional error handler */
  onError?: (error: Error) => void;
}

/**
 * Styled header section
 */
const Header = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * Styled status badge
 */
const StatusBadge = styled.View<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.error}20;
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

/**
 * Styled info section
 */
const InfoSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

/**
 * Styled actions section
 */
const Actions = styled(FlexRow)`
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

/**
 * A detailed card component for displaying comprehensive medication information.
 * It includes status indicators, detailed information, and action buttons.
 * 
 * @component
 * @param {MedicationCardProps} props - The component props
 * @returns {JSX.Element} A detailed medication card component
 * 
 * @example
 * ```tsx
 * function MedicationDetail() {
 *   const handleRefill = useCallback(() => {
 *     // Handle refill request
 *   }, []);
 * 
 *   const handleDelete = useCallback(() => {
 *     // Handle delete request
 *   }, []);
 * 
 *   return (
 *     <MedicationCard
 *       name="Aspirin"
 *       dosage="81mg"
 *       frequency="Once daily"
 *       nextRefillDate="2024-04-15"
 *       daysSupplyRemaining={30}
 *       isActive={true}
 *       needsRefill={false}
 *       onRefill={handleRefill}
 *       onDelete={handleDelete}
 *     />
 *   );
 * }
 * ```
 */
export const MedicationCard = memo(function MedicationCard({
  name,
  dosage,
  frequency,
  nextRefillDate,
  daysSupplyRemaining,
  isActive = true,
  needsRefill = false,
  onRefill,
  onDelete,
  style,
  onError,
}: MedicationCardProps): JSX.Element {
  const theme = useTheme();

  const handleRefill = useCallback(() => {
    try {
      onRefill?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to request refill'));
    }
  }, [onRefill, onError]);

  const handleDelete = useCallback(() => {
    try {
      onDelete?.();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Failed to delete medication'));
    }
  }, [onDelete, onError]);

  return (
    <Card style={style}>
      <Header>
        <ThemedText type="title">{name}</ThemedText>
        <StatusBadge isActive={isActive}>
          <ThemedText
            type="defaultSemiBold"
            color={isActive ? theme.colors.primary : theme.colors.error}
          >
            {isActive ? 'Active' : 'Inactive'}
          </ThemedText>
        </StatusBadge>
      </Header>

      <InfoSection>
        <FlexRow>
          <IconSymbol
            name="pills.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>{dosage}</ThemedText>
        </FlexRow>

        <FlexRow>
          <IconSymbol
            name="clock.fill"
            size={24}
            color={theme.colors.primary}
          />
          <ThemedText>{frequency}</ThemedText>
        </FlexRow>

        {nextRefillDate && (
          <FlexRow>
            <IconSymbol
              name="calendar"
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText>Next refill: {nextRefillDate}</ThemedText>
          </FlexRow>
        )}

        {typeof daysSupplyRemaining === 'number' && (
          <FlexRow>
            <IconSymbol
              name={needsRefill ? 'bell.fill' : 'checkmark.circle.fill'}
              size={24}
              color={needsRefill ? theme.colors.error : theme.colors.primary}
            />
            <ThemedText
              color={needsRefill ? theme.colors.error : undefined}
            >
              {daysSupplyRemaining} days supply remaining
            </ThemedText>
          </FlexRow>
        )}
      </InfoSection>

      <Actions>
        {onDelete && (
          <ThemedText
            type="link"
            color={theme.colors.error}
            onPress={handleDelete}
            accessibilityRole="button"
            accessibilityHint="Double tap to delete medication"
          >
            Delete
          </ThemedText>
        )}
        {onRefill && (
          <ThemedText
            type="link"
            onPress={handleRefill}
            accessibilityRole="button"
            accessibilityHint="Double tap to request refill"
          >
            Request Refill
          </ThemedText>
        )}
      </Actions>
    </Card>
  );
}); 