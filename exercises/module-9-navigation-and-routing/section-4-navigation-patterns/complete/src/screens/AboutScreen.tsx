/**
 * @fileoverview About screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { ScrollView, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsStackParamList } from '../navigation/SettingsNavigator';

// Type for navigation props
type AboutScreenProps = StackScreenProps<
  SettingsStackParamList,
  'About'
>;

// App information
const APP_VERSION = '1.0.0';
const APP_BUILD = '100';
const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * About screen component
 * Displays app information, credits, and support options
 * @param {object} navigation - Navigation object for screen transitions
 * @returns About screen component
 */
export default function AboutScreen({ navigation }: AboutScreenProps) {
  // Handle link press
  const handleLinkPress = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    });
  };
  
  // Handle rate app press
  const handleRateApp = () => {
    // In a real app, this would open the app store rating page
    Alert.alert(
      'Rate App',
      'This would typically open the App Store or Google Play Store for rating.',
      [{ text: 'OK' }]
    );
  };
  
  // Handle share app press
  const handleShareApp = () => {
    // In a real app, this would open the native share dialog
    Alert.alert(
      'Share App',
      'This would typically open the native share dialog.',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderSection>
          <AppIconPlaceholder>
            <AppIconText>M</AppIconText>
          </AppIconPlaceholder>
          <AppName>MedTrack</AppName>
          <AppVersion>Version {APP_VERSION} ({APP_BUILD})</AppVersion>
          <AppDescription>
            Your personal medication tracking assistant
          </AppDescription>
        </HeaderSection>
        
        <Section>
          <SectionTitle>About</SectionTitle>
          <AboutText>
            MedTrack helps you manage your medications, get timely reminders,
            and track your medication adherence. Never miss a dose again with
            our easy-to-use medication tracking system.
          </AboutText>
        </Section>
        
        <Section>
          <SectionTitle>Developer</SectionTitle>
          <InfoItem>
            <InfoLabel>Company</InfoLabel>
            <InfoValue>React Native Training Course</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Website</InfoLabel>
            <LinkText onPress={() => handleLinkPress('https://example.com')}>
              https://example.com
            </LinkText>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Contact</InfoLabel>
            <LinkText onPress={() => handleLinkPress('mailto:support@example.com')}>
              support@example.com
            </LinkText>
          </InfoItem>
        </Section>
        
        <Section>
          <SectionTitle>Legal</SectionTitle>
          <LinkItem onPress={() => navigation.navigate('PrivacyPolicy')}>
            <LinkItemText>Privacy Policy</LinkItemText>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </LinkItem>
          <LinkItem onPress={() => navigation.navigate('TermsOfService')}>
            <LinkItemText>Terms of Service</LinkItemText>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </LinkItem>
          <LinkItem onPress={() => navigation.navigate('Licenses')}>
            <LinkItemText>Open Source Licenses</LinkItemText>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </LinkItem>
        </Section>
        
        <Section>
          <SectionTitle>Support Us</SectionTitle>
          <ActionButton onPress={handleRateApp}>
            <ActionButtonIcon>
              <FontAwesome name="star" size={20} color="#6200ee" />
            </ActionButtonIcon>
            <ActionButtonText>Rate the App</ActionButtonText>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </ActionButton>
          <ActionButton onPress={handleShareApp}>
            <ActionButtonIcon>
              <FontAwesome name="share-alt" size={20} color="#6200ee" />
            </ActionButtonIcon>
            <ActionButtonText>Share with Friends</ActionButtonText>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </ActionButton>
        </Section>
        
        <Footer>
          <FooterText>© {COPYRIGHT_YEAR} React Native Training Course</FooterText>
          <FooterText>All rights reserved</FooterText>
        </Footer>
      </ScrollView>
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
`;

const HeaderSection = styled.View`
  align-items: center;
  padding: 30px 20px;
  background-color: #6200ee;
`;

const AppIconPlaceholder = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const AppIconText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #6200ee;
`;

const AppName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const AppVersion = styled.Text`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
`;

const AppDescription = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
`;

const Section = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const AboutText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
`;

const InfoItem = styled.View`
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

const LinkText = styled.Text`
  font-size: 16px;
  color: #6200ee;
`;

const LinkItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const LinkItemText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const ActionButtonIcon = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ActionButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const Footer = styled.View`
  padding: 20px;
  align-items: center;
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 4px;
`; 