/**
 * @fileoverview Settings screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Switch, Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsStackParamList } from '../navigation/SettingsNavigator';

// Type for navigation props
type SettingsScreenProps = StackScreenProps<
  SettingsStackParamList,
  'SettingsList'
>;

// App version
const APP_VERSION = '1.0.0';

/**
 * Settings screen component
 * Main settings screen with navigation to sub-settings screens
 * @param {object} navigation - Navigation object for screen transitions
 * @param {object} route - Route object containing params
 * @returns Settings screen component
 */
export default function SettingsScreen({ navigation, route }: SettingsScreenProps) {
  // Get logout function from route params
  const { logout } = route.params;
  
  // State for toggle switches
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [refillAlertsEnabled, setRefillAlertsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' }
      ]
    );
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Account</SectionTitle>
          
          <SettingsItem
            onPress={() => navigation.navigate('Profile')}
          >
            <SettingsItemIcon>
              <FontAwesome name="user" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>My Profile</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
        </Section>
        
        <Section>
          <SectionTitle>Notifications</SectionTitle>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="bell" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemText>Medication Reminders</SettingsItemText>
            </SettingsToggleInfo>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={remindersEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="calendar" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemText>Refill Alerts</SettingsItemText>
            </SettingsToggleInfo>
            <Switch
              value={refillAlertsEnabled}
              onValueChange={setRefillAlertsEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={refillAlertsEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
          
          <SettingsItem
            onPress={() => navigation.navigate('NotificationsSettings')}
          >
            <SettingsItemIcon>
              <FontAwesome name="sliders" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>Advanced Notification Settings</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
        </Section>
        
        <Section>
          <SectionTitle>Appearance</SectionTitle>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="moon-o" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemText>Dark Mode</SettingsItemText>
            </SettingsToggleInfo>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={darkModeEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
        </Section>
        
        <Section>
          <SectionTitle>Support</SectionTitle>
          
          <SettingsItem
            onPress={() => navigation.navigate('About')}
          >
            <SettingsItemIcon>
              <FontAwesome name="info-circle" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>About</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
          
          <SettingsItem>
            <SettingsItemIcon>
              <FontAwesome name="life-ring" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>Help & Support</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
          
          <SettingsItem>
            <SettingsItemIcon>
              <FontAwesome name="file-text-o" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>Privacy Policy</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
          
          <SettingsItem>
            <SettingsItemIcon>
              <FontAwesome name="file-text" size={20} color="#6200ee" />
            </SettingsItemIcon>
            <SettingsItemText>Terms of Service</SettingsItemText>
            <ChevronIcon>
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </ChevronIcon>
          </SettingsItem>
        </Section>
        
        <Section>
          <LogoutButton onPress={handleLogout}>
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>
          
          <VersionText>Version {APP_VERSION}</VersionText>
        </Section>
      </ScrollView>
    </Container>
  );
}

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8f8;
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin: 16px 16px 8px 16px;
  text-transform: uppercase;
`;

const SettingsItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SettingsToggleItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SettingsToggleInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SettingsItemIcon = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const SettingsItemText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ChevronIcon = styled.View`
  padding: 4px;
`;

const LogoutButton = styled.TouchableOpacity`
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  border: 1px solid #d32f2f;
`;

const LogoutButtonText = styled.Text`
  color: #d32f2f;
  font-size: 16px;
  font-weight: 500;
`;

const VersionText = styled.Text`
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 24px;
`; 