/**
 * @fileoverview Header component for the Medication Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  // Re-renders unnecessarily when parent re-renders
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  height: 60px;
  padding: 0 16px;
  background-color: #007bff;
  justify-content: center;
  elevation: 4;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  shadow-color: #000;
  shadow-offset: { height: 2, width: 0 };
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export default Header; 