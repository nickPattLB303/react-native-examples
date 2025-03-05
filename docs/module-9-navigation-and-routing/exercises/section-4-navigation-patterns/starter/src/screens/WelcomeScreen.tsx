/**
 * @fileoverview Welcome screen for the Medication Tracking app onboarding
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';

// Type for navigation props
type WelcomeScreenProps = StackScreenProps<OnboardingStackParamList, 'Welcome'>;

/**
 * Welcome screen component
 * First screen in the onboarding flow
 * @param {object} navigation - Navigation object for screen transitions
 * @param {object} route - Route object containing params
 * @returns Welcome screen component
 */
export default function WelcomeScreen({ navigation, route }: WelcomeScreenProps) {
  // Get completeOnboarding function from route params
  const { completeOnboarding } = route.params;
  
  // For this exercise, we'll provide options to skip onboarding or continue
  const handleSkip = () => {
    completeOnboarding();
  };
  
  const handleContinue = () => {
    navigation.navigate('NotificationPermission');
  };
  
  return (
    <Container>
      <LogoContainer>
        <LogoPlaceholder>
          <LogoText>MedTrack</LogoText>
        </LogoPlaceholder>
      </LogoContainer>
      
      <ContentContainer>
        <Title>Welcome to MedTrack</Title>
        <Description>
          Your personal medication tracking assistant. Keep track of your medications, 
          get reminders, and never miss a dose again.
        </Description>
        
        <FeatureContainer>
          <FeatureItem>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureText>Track all your medications in one place</FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>⏰</FeatureIcon>
            <FeatureText>Set reminders for medication doses</FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureText>Monitor your medication adherence</FeatureText>
          </FeatureItem>
        </FeatureContainer>
      </ContentContainer>
      
      <ButtonContainer>
        <ContinueButton onPress={handleContinue}>
          <ContinueButtonText>Get Started</ContinueButtonText>
        </ContinueButton>
        
        <SkipButton onPress={handleSkip}>
          <SkipButtonText>Skip Onboarding</SkipButtonText>
        </SkipButton>
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

const LogoContainer = styled.View`
  align-items: center;
  margin-top: 60px;
`;

const LogoPlaceholder = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #6200ee;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const ContentContainer = styled.View`
  padding: 20px;
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

const FeatureContainer = styled.View`
  margin-top: 20px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const FeatureIcon = styled.Text`
  font-size: 24px;
  margin-right: 16px;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  margin-bottom: 30px;
`;

const ContinueButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const ContinueButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SkipButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;

const SkipButtonText = styled.Text`
  color: #6200ee;
  font-size: 16px;
  font-weight: 500;
`; 