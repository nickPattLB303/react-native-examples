/**
 * @fileoverview Exercise 4: Responsive Design Complete with Styled Components
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  Dimensions, 
  useWindowDimensions,
  StatusBar,
  Platform 
} from 'react-native';
import styled from 'styled-components/native';

/**
 * Responsive medication dashboard component using styled-components
 * @returns {React.ReactElement} Medication dashboard component
 */
export default function MedicationDashboard() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('portrait');
  
  // Determine if the device is in portrait or landscape mode
  useEffect(() => {
    setOrientation(width < height ? 'portrait' : 'landscape');
  }, [width, height]);

  const isTablet = width >= 768;
  
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '8:00 AM, 4:00 PM, 12:00 AM', instructions: 'Take with food' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '9:00 AM', instructions: 'Take on an empty stomach' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '9:00 AM, 9:00 PM', instructions: 'Take with meals' },
    { id: '4', name: 'Simvastatin', dosage: '20mg', schedule: '9:00 PM', instructions: 'Take in the evening' },
    { id: '5', name: 'Losartan', dosage: '50mg', schedule: '8:00 AM', instructions: 'Take as directed' }
  ];

  const upcomingDoses = [
    { id: '1', medication: 'Amoxicillin', time: '4:00 PM', taken: false },
    { id: '2', medication: 'Lisinopril', time: '9:00 AM', taken: true },
    { id: '3', medication: 'Metformin', time: '9:00 AM', taken: true },
    { id: '4', medication: 'Metformin', time: '9:00 PM', taken: false },
  ];

  return (
    <Container 
      isTablet={isTablet} 
      paddingTop={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0}
    >
      <Title isTablet={isTablet}>Medication Dashboard</Title>
      
      <Content orientation={orientation} isTablet={isTablet}>
        <SectionContainer 
          flex={1} 
          marginRight={orientation === 'landscape' || isTablet ? 10 : 0}
          marginBottom={orientation === 'portrait' && !isTablet ? 20 : 0}
        >
          <SectionTitle isTablet={isTablet}>Upcoming Doses</SectionTitle>
          <ScrollView>
            <UpcomingDosesList
              isTablet={isTablet}
              orientation={orientation}
            >
              {upcomingDoses.map(dose => (
                <DoseCard 
                  key={dose.id} 
                  isTablet={isTablet} 
                  orientation={orientation}
                  screenWidth={width}
                >
                  <DoseMedication isTablet={isTablet}>{dose.medication}</DoseMedication>
                  <DoseTime isTablet={isTablet}>{dose.time}</DoseTime>
                  <DoseStatus isTablet={isTablet}>
                    {dose.taken ? 'Taken' : 'Upcoming'}
                  </DoseStatus>
                </DoseCard>
              ))}
            </UpcomingDosesList>
          </ScrollView>
        </SectionContainer>
        
        <SectionContainer 
          flex={orientation === 'landscape' || isTablet ? 2 : 1}
        >
          <SectionTitle isTablet={isTablet}>My Medications</SectionTitle>
          <ScrollView>
            <MedicationsList
              isTablet={isTablet}
              orientation={orientation}
            >
              {medications.map(med => (
                <MedicationCard 
                  key={med.id} 
                  isTablet={isTablet} 
                  orientation={orientation}
                  screenWidth={width}
                >
                  <MedicationName isTablet={isTablet}>{med.name}</MedicationName>
                  <MedicationDosage isTablet={isTablet}>{med.dosage}</MedicationDosage>
                  <MedicationSchedule isTablet={isTablet}>{med.schedule}</MedicationSchedule>
                  <MedicationInstructions isTablet={isTablet}>{med.instructions}</MedicationInstructions>
                </MedicationCard>
              ))}
            </MedicationsList>
          </ScrollView>
        </SectionContainer>
      </Content>
    </Container>
  );
}

/**
 * App component that demonstrates the MedicationDashboard
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDashboard />;
}

// Styled components for responsive UI
const Container = styled.SafeAreaView<{
  isTablet: boolean;
  paddingTop?: number;
}>`
  flex: 1;
  padding: ${props => props.isTablet ? 24 : 16}px;
  padding-top: ${props => props.paddingTop || 0}px;
`;

const Title = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 32 : 24}px;
  font-weight: bold;
  margin-bottom: ${props => props.isTablet ? 24 : 16}px;
  margin-top: ${props => props.isTablet ? 40 : 20}px;
`;

const Content = styled.View<{
  orientation: string;
  isTablet: boolean;
}>`
  flex-direction: ${props => 
    props.orientation === 'landscape' || props.isTablet ? 'row' : 'column'};
  flex: 1;
`;

const SectionContainer = styled.View<{
  flex: number;
  marginRight?: number;
  marginBottom?: number;
}>`
  flex: ${props => props.flex};
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
`;

const SectionTitle = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 22 : 18}px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const UpcomingDosesList = styled.View<{
  isTablet: boolean;
  orientation: string;
}>`
  flex-direction: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 'row' : 'column'};
  flex-wrap: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 'wrap' : 'nowrap'};
`;

const DoseCard = styled.View<{
  isTablet: boolean;
  orientation: string;
  screenWidth: number;
}>`
  background-color: white;
  padding: ${props => props.isTablet ? 18 : 15}px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-right: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 10 : 0}px;
  width: ${props => 
    props.isTablet && props.orientation === 'portrait' 
    ? `${props.screenWidth / 2 - 30}px` 
    : '100%'};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 1;
`;

const DoseMedication = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 18 : 16}px;
  font-weight: bold;
`;

const DoseTime = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 16 : 14}px;
  color: #666;
`;

const DoseStatus = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 16 : 14}px;
  margin-top: 5px;
`;

const MedicationsList = styled.View<{
  isTablet: boolean;
  orientation: string;
}>`
  flex-direction: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 'row' : 'column'};
  flex-wrap: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 'wrap' : 'nowrap'};
`;

const MedicationCard = styled.View<{
  isTablet: boolean;
  orientation: string;
  screenWidth: number;
}>`
  background-color: white;
  padding: ${props => props.isTablet ? 18 : 15}px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-right: ${props => 
    props.isTablet && props.orientation === 'portrait' ? 10 : 0}px;
  width: ${props => 
    props.isTablet && props.orientation === 'portrait' 
    ? `${props.screenWidth / 2 - 30}px` 
    : '100%'};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 1;
`;

const MedicationName = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 20 : 18}px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MedicationDosage = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 18 : 16}px;
`;

const MedicationSchedule = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 16 : 14}px;
  color: #666;
  margin-top: 5px;
`;

const MedicationInstructions = styled.Text<{
  isTablet: boolean;
}>`
  font-size: ${props => props.isTablet ? 16 : 14}px;
  color: #666;
  margin-top: 5px;
  font-style: italic;
`; 