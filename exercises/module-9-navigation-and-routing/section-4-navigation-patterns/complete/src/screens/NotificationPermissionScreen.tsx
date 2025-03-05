/**
 * @fileoverview Notification Permission screen for the Medication Tracking app onboarding
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';

// Type for navigation props
type NotificationPermissionScreenProps = StackScreenProps<
  OnboardingStackParamList, 
  'NotificationPermission'
>;

/**
 * Notification Permission screen component
 * Second screen in the onboarding flow - asks for notification permissions
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Notification Permission screen component
 */
export default function NotificationPermissionScreen({ navigation }: NotificationPermissionScreenProps) {
  const handleAllowNotifications = () => {
    // In a real app, you would request notification permissions here
    // For this exercise, we'll just navigate to the next screen
    navigation.navigate('PrivacySettings');
  };
  
  const handleSkipForNow = () => {
    // Allow the user to skip but still continue the onboarding process
    navigation.navigate('PrivacySettings');
  };
  
  return (
    <Container>
      <ContentContainer>
        <IconContainer>
          <FontAwesome name="bell" size={80} color="#6200ee" />
        </IconContainer>
        
        <Title>Enable Notifications</Title>
        <Description>
          Get timely reminders for your medications and never miss a dose.
          Notifications help you stay on track with your medication schedule.
        </Description>
        
        <BenefitContainer>
          <BenefitItem>
            <BenefitIcon>🔔</BenefitIcon>
            <BenefitText>Receive dose reminders</BenefitText>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>📊</BenefitIcon>
            <BenefitText>Get medication refill alerts</BenefitText>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>📱</BenefitIcon>
            <BenefitText>Control which notifications you receive</BenefitText>
          </BenefitItem>
        </BenefitContainer>
      </ContentContainer>
      
      <ButtonContainer>
        <PrimaryButton onPress={handleAllowNotifications}>
          <PrimaryButtonText>Allow Notifications</PrimaryButtonText>
        </PrimaryButton>
        
        <SecondaryButton onPress={handleSkipForNow}>
          <SecondaryButtonText>Skip for Now</SecondaryButtonText>
        </SecondaryButton>
      </ButtonContainer>
    </Container>
  );
}

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
`;

const ContentContainer = styled.View`
  padding: 20px;
  align-items: center;
  margin-top: 60px;
`;

const IconContainer = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  line-height: 24px;
`;

const BenefitContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const BenefitItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BenefitIcon = styled.Text`
  font-size: 24px;
  margin-right: 16px;
`;

const BenefitText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  margin-bottom: 30px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const PrimaryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SecondaryButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;

const SecondaryButtonText = styled.Text`
  color: #6200ee;
  font-size: 16px;
  font-weight: 500;
`; 