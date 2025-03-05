/**
 * @fileoverview Home screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { MainTabParamList } from '../navigation/MainNavigator';
import { MedicationsStackParamList } from '../navigation/MedicationsNavigator';

// Sample data for today's medications
const todaysMedications = [
  { id: '1', name: 'Aspirin', time: '8:00 AM', taken: true },
  { id: '2', name: 'Vitamin D', time: '9:00 AM', taken: true },
  { id: '3', name: 'Lisinopril', time: '1:00 PM', taken: false },
  { id: '4', name: 'Simvastatin', time: '8:00 PM', taken: false },
];

// Type for the composite navigation props
type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<MedicationsStackParamList>
>;

/**
 * Home screen component
 * Main dashboard displaying medication overview and schedule
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Home screen component
 */
export default function HomeScreen({ navigation }: HomeScreenProps) {
  // Calculate adherence percentage
  const takenCount = todaysMedications.filter(med => med.taken).length;
  const adherencePercentage = Math.round((takenCount / todaysMedications.length) * 100);
  
  // Get current date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Greeting>Hello, User!</Greeting>
          <DateText>{formattedDate}</DateText>
        </Header>
        
        <SummarySection>
          <SummaryCard>
            <SummaryTitle>Today's Progress</SummaryTitle>
            <ProgressContainer>
              <ProgressCircle>
                <ProgressText>{adherencePercentage}%</ProgressText>
              </ProgressCircle>
              <ProgressLabel>
                {takenCount} of {todaysMedications.length} medications taken
              </ProgressLabel>
            </ProgressContainer>
          </SummaryCard>
        </SummarySection>
        
        <Section>
          <SectionHeader>
            <SectionTitle>Today's Schedule</SectionTitle>
            <ViewAllButton 
              onPress={() => navigation.navigate('Medications')}
            >
              <ViewAllText>View All</ViewAllText>
            </ViewAllButton>
          </SectionHeader>
          
          {todaysMedications.map((medication) => (
            <MedicationCard 
              key={medication.id}
              onPress={() => 
                navigation.navigate('Medications', {
                  screen: 'MedicationDetails',
                  params: { id: medication.id, name: medication.name }
                })
              }
            >
              <MedicationInfo>
                <MedicationTime>{medication.time}</MedicationTime>
                <MedicationName>{medication.name}</MedicationName>
              </MedicationInfo>
              
              <MedicationStatus>
                {medication.taken ? (
                  <StatusIconContainer taken={true}>
                    <FontAwesome name="check" size={16} color="#fff" />
                  </StatusIconContainer>
                ) : (
                  <StatusIconContainer taken={false}>
                    <FontAwesome name="clock-o" size={16} color="#fff" />
                  </StatusIconContainer>
                )}
                
                <StatusText taken={medication.taken}>
                  {medication.taken ? 'Taken' : 'Scheduled'}
                </StatusText>
              </MedicationStatus>
            </MedicationCard>
          ))}
        </Section>
        
        <Section>
          <SectionHeader>
            <SectionTitle>Quick Actions</SectionTitle>
          </SectionHeader>
          
          <ActionButtonsContainer>
            <ActionButton 
              onPress={() => 
                navigation.navigate('Medications', {
                  screen: 'AddMedication'
                })
              }
            >
              <ActionButtonIcon>
                <FontAwesome name="plus" size={24} color="#6200ee" />
              </ActionButtonIcon>
              <ActionButtonText>Add Medication</ActionButtonText>
            </ActionButton>
            
            <ActionButton>
              <ActionButtonIcon>
                <FontAwesome name="bell" size={24} color="#6200ee" />
              </ActionButtonIcon>
              <ActionButtonText>Set Reminder</ActionButtonText>
            </ActionButton>
            
            <ActionButton>
              <ActionButtonIcon>
                <FontAwesome name="calendar" size={24} color="#6200ee" />
              </ActionButtonIcon>
              <ActionButtonText>Schedule</ActionButtonText>
            </ActionButton>
          </ActionButtonsContainer>
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

const Header = styled.View`
  padding: 20px;
  background-color: #6200ee;
`;

const Greeting = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

const DateText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const SummarySection = styled.View`
  padding: 0 20px;
  margin-top: -30px;
  margin-bottom: 20px;
`;

const SummaryCard = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const SummaryTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProgressCircle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #6200ee;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ProgressText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const ProgressLabel = styled.Text`
  font-size: 16px;
  color: #666;
  flex: 1;
`;

const Section = styled.View`
  padding: 20px;
  margin-bottom: 10px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const ViewAllButton = styled.TouchableOpacity``;

const ViewAllText = styled.Text`
  font-size: 14px;
  color: #6200ee;
  font-weight: 500;
`;

const MedicationCard = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const MedicationInfo = styled.View`
  flex: 1;
`;

const MedicationTime = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const MedicationName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const MedicationStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatusIconContainer = styled.View<{ taken: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.taken ? '#4CAF50' : '#FF9800'};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const StatusText = styled.Text<{ taken: boolean }>`
  font-size: 14px;
  color: ${props => props.taken ? '#4CAF50' : '#FF9800'};
  font-weight: 500;
`;

const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin: 0 5px;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const ActionButtonIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #f0e6ff;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const ActionButtonText = styled.Text`
  font-size: 14px;
  color: #333;
  text-align: center;
`; 