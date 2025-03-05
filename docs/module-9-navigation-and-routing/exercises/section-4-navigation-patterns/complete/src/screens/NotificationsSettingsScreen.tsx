/**
 * @fileoverview Notifications Settings screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Switch, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { SettingsStackParamList } from '../navigation/SettingsNavigator';

// Type for notification time
type NotificationTime = {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
};

// Sample notification times - In a real app, these would come from storage
const initialNotificationTimes: NotificationTime[] = [
  { id: '1', label: 'Morning Medication', time: '08:00 AM', enabled: true },
  { id: '2', label: 'Afternoon Medication', time: '01:00 PM', enabled: true },
  { id: '3', label: 'Evening Medication', time: '08:00 PM', enabled: true },
];

// Type for navigation props
type NotificationsSettingsScreenProps = StackScreenProps<
  SettingsStackParamList,
  'NotificationsSettings'
>;

/**
 * Notifications Settings screen component
 * Allows user to configure notification preferences
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Notifications Settings screen component
 */
export default function NotificationsSettingsScreen({ navigation }: NotificationsSettingsScreenProps) {
  // State for notification settings
  const [notificationTimes, setNotificationTimes] = useState<NotificationTime[]>(initialNotificationTimes);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [earlyRemindersEnabled, setEarlyRemindersEnabled] = useState(false);
  const [missedDoseAlertsEnabled, setMissedDoseAlertsEnabled] = useState(true);
  
  // Toggle notification time enabled state
  const toggleNotificationTime = (id: string) => {
    setNotificationTimes(prevTimes =>
      prevTimes.map(time =>
        time.id === id ? { ...time, enabled: !time.enabled } : time
      )
    );
  };
  
  // Handle edit time button press
  const handleEditTime = (id: string, currentTime: string, label: string) => {
    // In a real app, this would show a time picker
    Alert.alert(
      'Edit Reminder Time',
      `You would see a time picker here to change ${label} from ${currentTime}`,
      [{ text: 'OK' }]
    );
  };
  
  // Handle add new reminder button press
  const handleAddReminder = () => {
    // In a real app, this would show a form to add a new reminder
    Alert.alert(
      'Add New Reminder',
      'You would see a form here to add a new medication reminder',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Medication Reminders</SectionTitle>
          
          {notificationTimes.map((item) => (
            <NotificationItem key={item.id}>
              <NotificationInfo>
                <NotificationLabel>{item.label}</NotificationLabel>
                <NotificationTime>{item.time}</NotificationTime>
              </NotificationInfo>
              
              <ActionContainer>
                <EditButton 
                  onPress={() => handleEditTime(item.id, item.time, item.label)}
                >
                  <FontAwesome name="pencil" size={18} color="#6200ee" />
                </EditButton>
                
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleNotificationTime(item.id)}
                  trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
                  thumbColor={item.enabled ? '#6200ee' : '#f4f3f4'}
                />
              </ActionContainer>
            </NotificationItem>
          ))}
          
          <AddButton onPress={handleAddReminder}>
            <FontAwesome name="plus" size={16} color="#6200ee" />
            <AddButtonText>Add New Reminder</AddButtonText>
          </AddButton>
        </Section>
        
        <Section>
          <SectionTitle>Alert Preferences</SectionTitle>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="volume-up" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemText>Sound</SettingsItemText>
            </SettingsToggleInfo>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={soundEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="mobile" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemText>Vibration</SettingsItemText>
            </SettingsToggleInfo>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={vibrationEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
        </Section>
        
        <Section>
          <SectionTitle>Additional Alerts</SectionTitle>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="clock-o" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemInfo>
                <SettingsItemText>Early Reminders</SettingsItemText>
                <SettingsItemDescription>
                  Get notified 15 minutes before scheduled time
                </SettingsItemDescription>
              </SettingsItemInfo>
            </SettingsToggleInfo>
            <Switch
              value={earlyRemindersEnabled}
              onValueChange={setEarlyRemindersEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={earlyRemindersEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
          
          <SettingsToggleItem>
            <SettingsToggleInfo>
              <SettingsItemIcon>
                <FontAwesome name="exclamation-triangle" size={20} color="#6200ee" />
              </SettingsItemIcon>
              <SettingsItemInfo>
                <SettingsItemText>Missed Dose Alerts</SettingsItemText>
                <SettingsItemDescription>
                  Get notified if you haven't marked a dose as taken
                </SettingsItemDescription>
              </SettingsItemInfo>
            </SettingsToggleInfo>
            <Switch
              value={missedDoseAlertsEnabled}
              onValueChange={setMissedDoseAlertsEnabled}
              trackColor={{ false: '#d3d3d3', true: '#b39ddb' }}
              thumbColor={missedDoseAlertsEnabled ? '#6200ee' : '#f4f3f4'}
            />
          </SettingsToggleItem>
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
  background-color: white;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin: 16px 16px 8px 16px;
  text-transform: uppercase;
`;

const NotificationItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const NotificationInfo = styled.View`
  flex: 1;
`;

const NotificationLabel = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const NotificationTime = styled.Text`
  font-size: 14px;
  color: #666;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditButton = styled.TouchableOpacity`
  padding: 8px 12px;
  margin-right: 8px;
`;

const SettingsToggleItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SettingsToggleInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const SettingsItemIcon = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const SettingsItemInfo = styled.View`
  flex: 1;
`;

const SettingsItemText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const SettingsItemDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 8px;
`;

const AddButtonText = styled.Text`
  color: #6200ee;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`; 