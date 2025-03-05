/**
 * @fileoverview Component for displaying a single inventory item
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Inventory } from '../types';

interface InventoryItemProps {
  item: Inventory;
  onPress: () => void;
}

// This component has several bugs to debug
const InventoryItem: React.FC<InventoryItemProps> = ({ item, onPress }) => {
  // Bug 1: This will throw an error if expiry is null
  const expiryDate = new Date(item.expiry);
  const formattedDate = `${expiryDate.getMonth() + 1}/${expiryDate.getDate()}/${expiryDate.getFullYear()}`;
  
  // Bug 2: This will throw an error if quantity is undefined
  const isLowStock = item.quantity < 10;
  
  // Bug 3: This will cause a render error if item.price is undefined
  const formattedPrice = `$${item.price.toFixed(2)}`;
  
  return (
    <ItemContainer onPress={onPress} isLowStock={isLowStock}>
      <Header>
        <NameText>{item.name}</NameText>
        <CategoryText>{item.category}</CategoryText>
      </Header>
      <DetailsRow>
        <DetailText>Price: {formattedPrice}</DetailText>
        <DetailText>Quantity: {item.quantity}</DetailText>
      </DetailsRow>
      <Footer>
        <ExpiryText isExpired={new Date() > expiryDate}>
          Expires: {formattedDate}
        </ExpiryText>
        {isLowStock && <LowStockText>Low Stock!</LowStockText>}
      </Footer>
    </ItemContainer>
  );
};

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