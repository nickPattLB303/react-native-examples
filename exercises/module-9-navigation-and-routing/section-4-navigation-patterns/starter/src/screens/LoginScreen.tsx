/**
 * @fileoverview Login screen for the Medication Tracking app
 * @author React Native Training Course
 * @created 2023-06-01
 */

import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

// Type for navigation props
type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;

/**
 * Login screen component
 * Allows users to sign in to the application
 * @param {object} navigation - Navigation object for screen transitions
 * @param {object} route - Route object containing params
 * @returns Login screen component
 */
export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  // Get login function from route params
  const { login } = route.params;
  
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Handle login button press
  const handleLogin = () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    // For this exercise, we'll just simulate a successful login
    // In a real app, you would call an authentication API
    login();
  };
  
  return (
    <Container>
      <LogoPlaceholder>
        <LogoText>MedTrack</LogoText>
      </LogoPlaceholder>
      
      <Title>Welcome Back</Title>
      <Subtitle>Sign in to continue</Subtitle>
      
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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </FormGroup>
      
      <ForgotPassword onPress={() => navigation.navigate('ForgotPassword')}>
        <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
      </ForgotPassword>
      
      <LoginButton onPress={handleLogin}>
        <LoginButtonText>Sign In</LoginButtonText>
      </LoginButton>
      
      <SignupContainer>
        <SignupText>Don't have an account? </SignupText>
        <SignupButton onPress={() => navigation.navigate('Signup')}>
          <SignupButtonText>Sign Up</SignupButtonText>
        </SignupButton>
      </SignupContainer>
    </Container>
  );
}

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const LogoPlaceholder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #6200ee;
  align-self: center;
  margin-top: 60px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
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

const ForgotPassword = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

const ForgotPasswordText = styled.Text`
  color: #6200ee;
  font-size: 14px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #6200ee;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-bottom: 20px;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SignupContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const SignupText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const SignupButton = styled.TouchableOpacity``;

const SignupButtonText = styled.Text`
  color: #6200ee;
  font-size: 14px;
  font-weight: 500;
`; 