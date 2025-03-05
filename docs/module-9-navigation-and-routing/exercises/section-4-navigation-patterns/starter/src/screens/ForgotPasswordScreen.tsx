/**
 * @fileoverview Forgot Password screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

// Type for navigation props
type ForgotPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;

/**
 * Forgot Password screen component
 * Allows users to request a password reset
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Forgot Password screen component
 */
export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  // State for form fields
  const [email, setEmail] = useState('');
  
  // Handle reset password button press
  const handleResetPassword = () => {
    // Basic validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    // For this exercise, we'll just show a success message and navigate back
    // In a real app, you would call an API to send a reset email
    Alert.alert(
      'Success',
      'If an account exists with this email, you will receive password reset instructions.',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    );
  };
  
  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>Enter your email to receive reset instructions</Subtitle>
      
      <FormGroup>
        <Label>Email</Label>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </FormGroup>
      
      <ResetButton onPress={handleResetPassword}>
        <ResetButtonText>Send Reset Instructions</ResetButtonText>
      </ResetButton>
      
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>Back to Login</BackButtonText>
      </BackButton>
    </Container>
  );
}

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-top: 60px;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const FormGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
`;

const ResetButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const BackButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
`;

const BackButtonText = styled.Text`
  color: #6200ee;
  font-size: 16px;
  font-weight: 500;
`; 