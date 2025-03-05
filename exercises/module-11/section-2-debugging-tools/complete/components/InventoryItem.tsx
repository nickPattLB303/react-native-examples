/**
 * @fileoverview Component for displaying a single inventory item
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Inventory } from '../types';
import { Logger } from '../utils/Logger';

interface InventoryItemProps {
  item: Inventory;
  onPress: () => void;
}

// Initialize logger
const logger = new Logger();

// Fixed: Added error handling and null checks
const InventoryItem: React.FC<InventoryItemProps> = React.memo(({ item, onPress }) => {
  // Fixed: Safe date formatting with null/undefined check
  const formattedDate = useMemo(() => {
    try {
      if (!item.expiry) {
        return 'No expiry date';
      }
      
      const expiryDate = new Date(item.expiry);
      
      // Check if date is valid
      if (isNaN(expiryDate.getTime())) {
        return 'Invalid date';
      }
      
      return `${expiryDate.getMonth() + 1}/${expiryDate.getDate()}/${expiryDate.getFullYear()}`;
    } catch (error) {
      logger.error('Error formatting date', { error, expiry: item.expiry });
      return 'Invalid date';
    }
  }, [item.expiry]);
  
  // Fixed: Safe check for quantity with default value
  const isLowStock = useMemo(() => {
    const quantity = item.quantity ?? 0;
    return quantity < 10;
  }, [item.quantity]);
  
  // Fixed: Safe price formatting with null/undefined check
  const formattedPrice = useMemo(() => {
    try {
      if (item.price === undefined || item.price === null) {
        return 'Price not available';
      }
      return `$${item.price.toFixed(2)}`;
    } catch (error) {
      logger.error('Error formatting price', { error, price: item.price });
      return 'Price not available';
    }
  }, [item.price]);
  
  // Check if date is expired
  const isExpired = useMemo(() => {
    try {
      if (!item.expiry) return false;
      
      const expiryDate = new Date(item.expiry);
      
      // Check if date is valid
      if (isNaN(expiryDate.getTime())) {
        return false;
      }
      
      return new Date() > expiryDate;
    } catch (error) {
      logger.error('Error checking expiry', { error, expiry: item.expiry });
      return false;
    }
  }, [item.expiry]);
  
  // Safe category display
  const category = item.category || 'Uncategorized';
  
  return (
    <ItemContainer onPress={onPress} isLowStock={isLowStock}>
      <Header>
        <NameText>{item.name}</NameText>
        <CategoryText>{category}</CategoryText>
      </Header>
      <DetailsRow>
        <DetailText>Price: {formattedPrice}</DetailText>
        <DetailText>Quantity: {item.quantity ?? 'Unknown'}</DetailText>
      </DetailsRow>
      <Footer>
        <ExpiryText isExpired={isExpired}>
          Expires: {formattedDate}
        </ExpiryText>
        {isLowStock && <LowStockText>Low Stock!</LowStockText>}
      </Footer>
    </ItemContainer>
  );
});

// Add display name for debugging
InventoryItem.displayName = 'InventoryItem';

interface ItemContainerProps {
  isLowStock: boolean;
}

const ItemContainer = styled(TouchableOpacity)<ItemContainerProps>`
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  background-color: ${props => props.isLowStock ? '#fff3cd' : '#fff'};
  border-color: ${props => props.isLowStock ? '#ffecb5' : '#dee2e6'};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
`;

const CategoryText = styled.Text`
  font-size: 14px;
  color: #6c757d;
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
`;

const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  color: #495057;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface ExpiryTextProps {
  isExpired: boolean;
}

const ExpiryText = styled.Text<ExpiryTextProps>`
  font-size: 14px;
  color: ${props => props.isExpired ? '#dc3545' : '#6c757d'};
`;

const LowStockText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fd7e14;
`;

export default InventoryItem; 