/**
 * @fileoverview Signup screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

// Type for navigation props
type SignupScreenProps = StackScreenProps<AuthStackParamList, 'Signup'>;

/**
 * Signup screen component
 * Allows users to create a new account
 * @param {object} navigation - Navigation object for screen transitions
 * @returns Signup screen component
 */
export default function SignupScreen({ navigation }: SignupScreenProps) {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Handle signup button press
  const handleSignup = () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // For this exercise, we'll just show a success message and navigate back
    // In a real app, you would call an API to create the account
    Alert.alert(
      'Success',
      'Account created successfully! Please sign in.',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    );
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <Title>Create Account</Title>
        <Subtitle>Sign up to get started</Subtitle>
        
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
        </FormGroup>
        
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
        
        <FormGroup>
          <Label>Password</Label>
          <Input
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </FormGroup>
        
        <SignupButton onPress={handleSignup}>
          <SignupButtonText>Create Account</SignupButtonText>
        </SignupButton>
        
        <LoginContainer>
          <LoginText>Already have an account? </LoginText>
          <LoginButton onPress={() => navigation.navigate('Login')}>
            <LoginButtonText>Sign In</LoginButtonText>
          </LoginButton>
        </LoginContainer>
      </Container>
    </ScrollView>
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
  margin-top: 40px;
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

const SignupButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SignupButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const LoginText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const LoginButton = styled.TouchableOpacity``;

const LoginButtonText = styled.Text`
  color: #6200ee;
  font-size: 14px;
  font-weight: 500;
`; 