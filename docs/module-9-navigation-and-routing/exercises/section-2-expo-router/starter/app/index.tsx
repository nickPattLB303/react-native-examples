/**
 * @fileoverview Home screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from 'expo-router';
import styled from 'styled-components/native';

/**
 * Home screen component displaying app overview and navigation options
 * @returns Home screen component
 */
export default function HomeScreen() {
  return (
    <Container>
      <Title>Medication Tracker</Title>
      <Subtitle>Keep track of your medications and prescriptions</Subtitle>
      
      <NavigationCard>
        <NavigationTitle>Quick Navigation</NavigationTitle>
        
        {/* TODO: Add navigation links to other screens */}
        {/* Example:
        <Link href="/medications" asChild>
          <NavigationButton>
            <ButtonText>View Medications</ButtonText>
          </NavigationButton>
        </Link>
        */}
      </NavigationCard>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #0078D7;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 40px;
  text-align: center;
`;

const NavigationCard = styled.View`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const NavigationTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #212529;
`;

const NavigationButton = styled.Pressable`
  background-color: #0078D7;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`; 