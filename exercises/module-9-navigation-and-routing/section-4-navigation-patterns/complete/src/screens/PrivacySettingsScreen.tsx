/**
 * @fileoverview Privacy Settings screen for the Medication Tracking app onboarding
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';

// Type for navigation props
type PrivacySettingsScreenProps = StackScreenProps<
  OnboardingStackParamList, 
  'PrivacySettings'
>;

/**
 * Privacy Settings screen component
 * Final screen in the onboarding flow - configures privacy settings
 * @param {object} navigation - Navigation object for screen transitions
 * @param {object} route - Route object containing params
 * @returns Privacy Settings screen component
 */
export default function PrivacySettingsScreen({ route, navigation }: PrivacySettingsScreenProps) {
  // Get completeOnboarding function from root navigator (passed through Welcome screen)
  const { completeOnboarding } = route.params || {};
  
  // State for toggle switches
  const [usageDataEnabled, setUsageDataEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [healthDataSharing, setHealthDataSharing] = useState(false);
  
  const handleCompleteOnboarding = () => {
    // In a real app, you would save these settings
    completeOnboarding();
  };
  
  return (
    <Container>
      <ContentContainer>
        <IconContainer>
          <FontAwesome name="lock" size={80} color="#6200ee" />
        </IconContainer>
        
        <Title>Privacy Settings</Title>
        <Description>
          Configure how your data is used in the app. 
          You can change these settings anytime in the app settings.
        </Description>
        
        <SettingsContainer>
          <SettingItem>
            <SettingContent>
              <SettingTitle>Usage Data Collection</SettingTitle>
              <SettingDescription>
                Help us improve by sharing anonymous usage data
              </SettingDescription>
            </SettingContent>
            <Switch
              value={usageDataEnabled}
              onValueChange={setUsageDataEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={usageDataEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingItem>
          
          <SettingItem>
            <SettingContent>
              <SettingTitle>Location Services</SettingTitle>
              <SettingDescription>
                Find nearby pharmacies and healthcare providers
              </SettingDescription>
            </SettingContent>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={locationEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingItem>
          
          <SettingItem>
            <SettingContent>
              <SettingTitle>Health Data Integration</SettingTitle>
              <SettingDescription>
                Connect with health services for better recommendations
              </SettingDescription>
            </SettingContent>
            <Switch
              value={healthDataSharing}
              onValueChange={setHealthDataSharing}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={healthDataSharing ? '#6200ee' : '#f4f3f4'}
            />
          </SettingItem>
        </SettingsContainer>
      </ContentContainer>
      
      <ButtonContainer>
        <FinishButton onPress={handleCompleteOnboarding}>
          <FinishButtonText>Complete Setup</FinishButtonText>
        </FinishButton>
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

const SettingsContainer = styled.View`
  width: 100%;
`;

const SettingItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const SettingContent = styled.View`
  flex: 1;
  margin-right: 16px;
`;

const SettingTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const SettingDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  margin-bottom: 30px;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`;

const FinishButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`; 