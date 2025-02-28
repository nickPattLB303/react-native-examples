# Module 2 Challenge: Environment Setup and Workflow Mastery

## Objective
Demonstrate mastery of the React Native development environment and workflow by completing a series of environment configuration and troubleshooting tasks.

**Prerequisite Knowledge**: Module 2 content
**Estimated Time**: 45-60 minutes

> 💡 **Tip**: This challenge focuses on verifying your environment setup and understanding the development workflow. Keep the Expo documentation handy for reference.

## Challenge Description

In this challenge, you'll demonstrate your understanding of the React Native development environment by completing a series of tasks related to project setup, environment configuration, and workflow operations. This will test your ability to:

1. Set up and configure a React Native project with specific requirements
2. Diagnose and resolve common environment issues
3. Use developer tools effectively
4. Understand project structure and configuration options
5. Customize the development environment for pharmacy app development

## Tasks

### 1. Project Configuration

1. Create a new Expo project called "PharmacyApp":
   ```bash
   npx create-expo-app@latest PharmacyApp
   ```

2. Configure the project with the following specifications:
   - Set the display name to "Pharmacy Management"
   - Configure the splash screen background color to a pharmacy-appropriate color
   - Add at least two custom scripts to the package.json for development workflow
   - Document your configuration changes

### 2. Environment Troubleshooting

For each of the following common issues, document the:
- Likely cause
- Commands or process to diagnose the issue
- Steps to resolve the issue

1. Metro bundler fails to start with a "port already in use" error
2. iOS simulator launch fails after running `npx expo run:ios`
3. Expo Go app cannot find your project on your local network
4. Node dependencies installation fails with version conflicts
5. "Command not found: adb" error when trying to run on Android device

### 3. Development Workflow Optimization

1. Set up a development environment with the following tools:
   - React Native DevTools
   - A logging/debugging solution
   - Environment configuration for development vs. production

2. Create a development workflow checklist for a team of developers that covers:
   - Environment setup verification steps
   - Project creation and configuration
   - Running on different platforms
   - Debugging tools setup
   - Common troubleshooting procedures

### 4. Project Structure Analysis

1. Create a diagram or detailed explanation of the default Expo project structure, explaining:
   - The purpose of each major file and directory
   - How the entry point works
   - Where to add custom components
   - Configuration file purposes and relationships
   - Build process overview

2. Research and document three approaches to organizing a larger React Native pharmacy application, with pros and cons for each approach.

### 5. Setup Documentation

1. Create comprehensive documentation for setting up the development environment for your pharmacy application, including:
   - Step-by-step instructions for macOS
   - Required tools and their versions
   - Environment variables and configuration
   - Verification steps to ensure proper setup
   - Troubleshooting guide for common issues

2. Make your documentation pharmacy-specific by including details relevant to:
   - Camera access for medication scanning
   - Push notifications for medication reminders
   - Secure storage for patient data

## Submission

Complete this challenge using the following steps:

1. Create a document with your answers to all sections
2. Include screenshots of your configured environment
3. Package your PharmacyApp project (excluding node_modules) for submission
4. Submit the document and project archive to the course instructor or upload to the designated location

## Evaluation Criteria

Your submission will be evaluated based on:
- Accuracy of troubleshooting information
- Quality and completeness of documentation
- Proper configuration of the project
- Understanding of project structure
- Effectiveness of workflow optimizations
- Application of pharmacy-specific considerations

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Expo Project Structure](https://docs.expo.dev/workflow/project-structure/)

> 🔍 **Instructor Note**: This challenge assesses practical knowledge of the development environment. Pay attention to the students' troubleshooting approach and understanding of how different components interact.

> 🚀 **Self-Led Learners**: This challenge is your opportunity to verify that your development environment is correctly set up before moving on to building actual applications. Take time to understand each component of the environment. 