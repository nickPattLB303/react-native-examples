/**
 * @fileoverview Profile screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsStackParamList } from '../navigation/SettingsNavigator';

// Sample user data - In a real app, this would come from a user context or API
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, USA 12345',
  dateOfBirth: '01/15/1980',
  emergencyContact: 'Jane Doe (555) 987-6543',
};

// Type for navigation props
type ProfileScreenProps = StackScreenProps<
  SettingsStackParamList,
  'Profile'
>;

/**
 * Profile screen component
 * Displays user information and allows navigation to profile editing
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Profile screen component
 */
export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <ProfilePicturePlaceholder>
            <FontAwesome name="user" size={60} color="#FFF" />
          </ProfilePicturePlaceholder>
          <ProfileName>{userData.name}</ProfileName>
          <ProfileEmail>{userData.email}</ProfileEmail>
          <EditButton>
            <EditButtonText>Edit Profile</EditButtonText>
          </EditButton>
        </ProfileHeader>
        
        <ProfileCard>
          <ProfileSection>
            <SectionTitle>Contact Information</SectionTitle>
            
            <InfoRow>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{userData.email}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>{userData.phone}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>{userData.address}</InfoValue>
            </InfoRow>
          </ProfileSection>
          
          <ProfileSection>
            <SectionTitle>Personal Information</SectionTitle>
            
            <InfoRow>
              <InfoLabel>Date of Birth</InfoLabel>
              <InfoValue>{userData.dateOfBirth}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Emergency Contact</InfoLabel>
              <InfoValue>{userData.emergencyContact}</InfoValue>
            </InfoRow>
          </ProfileSection>
          
          <ProfileSection>
            <SectionTitle>Health Information</SectionTitle>
            
            <HealthInfoButton>
              <HealthInfoButtonIcon>
                <FontAwesome name="heartbeat" size={20} color="#6200ee" />
              </HealthInfoButtonIcon>
              <HealthInfoButtonText>Allergies</HealthInfoButtonText>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </HealthInfoButton>
            
            <HealthInfoButton>
              <HealthInfoButtonIcon>
                <FontAwesome name="medkit" size={20} color="#6200ee" />
              </HealthInfoButtonIcon>
              <HealthInfoButtonText>Medical Conditions</HealthInfoButtonText>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </HealthInfoButton>
            
            <HealthInfoButton>
              <HealthInfoButtonIcon>
                <FontAwesome name="user-md" size={20} color="#6200ee" />
              </HealthInfoButtonIcon>
              <HealthInfoButtonText>Healthcare Providers</HealthInfoButtonText>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </HealthInfoButton>
          </ProfileSection>
          
          <ProfileSection>
            <SectionTitle>Privacy</SectionTitle>
            
            <PrivacyButton>
              <PrivacyButtonIcon>
                <FontAwesome name="lock" size={20} color="#6200ee" />
              </PrivacyButtonIcon>
              <PrivacyButtonText>Privacy Settings</PrivacyButtonText>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </PrivacyButton>
            
            <PrivacyButton>
              <PrivacyButtonIcon>
                <FontAwesome name="shield" size={20} color="#6200ee" />
              </PrivacyButtonIcon>
              <PrivacyButtonText>Data Sharing</PrivacyButtonText>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </PrivacyButton>
          </ProfileSection>
        </ProfileCard>
      </ScrollView>
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: 24px;
  background-color: #6200ee;
`;

const ProfilePicturePlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const ProfileName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const ProfileEmail = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
`;

const EditButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
`;

const EditButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const ProfileCard = styled.View`
  margin: 16px;
  background-color: white;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  overflow: hidden;
`;

const ProfileSection = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const InfoRow = styled.View`
  margin-bottom: 12px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  color: #333;
`;

const HealthInfoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

const HealthInfoButtonIcon = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const HealthInfoButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const PrivacyButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

const PrivacyButtonIcon = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const PrivacyButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`; 