/**
 * @fileoverview Profile screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import styled from 'styled-components/native';

/**
 * Profile screen component displaying user information
 * @returns Profile screen component
 */
export default function ProfileScreen() {
  // Sample user data - would usually come from authentication or local storage
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: '01/15/1980',
    emergencyContact: 'Jane Doe (555) 987-6543',
  };
  
  return (
    <Container>
      <Title>My Profile</Title>
      
      <ProfileCard>
        <ProfilePicPlaceholder>
          <ProfileInitial>{user.name.charAt(0)}</ProfileInitial>
        </ProfilePicPlaceholder>
        
        <ProfileInfo>
          <InfoRow>
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>Phone:</InfoLabel>
            <InfoValue>{user.phone}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>Address:</InfoLabel>
            <InfoValue>{user.address}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>DOB:</InfoLabel>
            <InfoValue>{user.dateOfBirth}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>Emergency:</InfoLabel>
            <InfoValue>{user.emergencyContact}</InfoValue>
          </InfoRow>
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