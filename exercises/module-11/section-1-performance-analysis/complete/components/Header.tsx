/**
 * @fileoverview Header component for the Medication Tracker app with performance optimization
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface HeaderProps {
  title: string;
}

// Use React.memo to prevent unnecessary re-renders when props haven't changed
const Header: React.FC<HeaderProps> = React.memo(({ title }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
});

// Add display name for debugging
Header.displayName = 'Header';

// Use platform-specific styling
const HeaderContainer = styled.View`
  height: 60px;
  padding: 0 16px;
  background-color: #007bff;
  justify-content: center;
  ${Platform.OS === 'ios' 
    ? `
      shadow-opacity: 0.2;
      shadow-radius: 2px;
      shadow-color: #000;
      shadow-offset: 0px 2px;
    `
    : `
      elevation: 4;
    `
  }
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export default Header; 