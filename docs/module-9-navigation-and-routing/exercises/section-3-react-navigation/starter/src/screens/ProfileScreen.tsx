/**
 * @fileoverview Profile screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/RootNavigator';

/**
 * Type definition for navigation props
 */
type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Profile'>;

/**
 * Profile screen component displaying user information
 * @returns Profile screen component
 */
export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  // Sample user data - would usually come from authentication or local storage
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
  };
  
  return (
    <Container>
      <Title>My Profile</Title>
      
      {/* TODO: Display user profile information */}
      <ProfileCard>
        <ProfilePicPlaceholder>
          <ProfileInitial>{user.name.charAt(0)}</ProfileInitial>
        </ProfilePicPlaceholder>
        
        <ProfileInfo>
          <Text>Implement the user profile information here</Text>
        </ProfileInfo>
      </ProfileCard>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 20px;
`;

const ProfileCard = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ProfilePicPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #0078D7;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfileInitial = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;

const ProfileInfo = styled.View`
  width: 100%;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-vertical: 8px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 80px;
  color: #6c757d;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  flex: 1;
  color: #212529;
`; 