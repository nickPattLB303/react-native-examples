/**
 * @fileoverview Header component for the Prescription Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

interface HeaderProps {
  title: string;
}

// Simple header component - no fixes needed as it was already optimized
const Header: React.FC<HeaderProps> = React.memo(({ title }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.View`
  height: 60px;
  padding: 0 16px;
  background-color: #4a6da7;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 4;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`;

export default Header; 