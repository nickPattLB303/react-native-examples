# Module 2 Challenge: Environment Setup and Workflow Mastery - Starter

## Instructions for Instructors
This file contains the starter template for the Module 2 Challenge. Students will demonstrate their understanding of React Native development environment setup and workflow.

## Challenge Overview

### Scenario
You are setting up a new React Native development environment for a pharmacy application team. You need to create, configure, and document the development environment and workflow.

### Time Allocation
- Project Setup: 15 minutes
- Environment Configuration: 15 minutes
- Documentation: 15 minutes

## Part 1: Project Configuration

### Task 1: Create Project Structure
Create a new Expo project with the following requirements:

```bash
# Create the project
npx create-expo-app@latest PharmacyApp

# Additional setup steps here...
```

Document your configuration in `app.json`:

```json
{
  "expo": {
    "name": "Pharmacy Management",
    // Add your configuration here...
  }
}
```

### Task 2: Custom Scripts
Add development workflow scripts to `package.json`:

```json
{
  "scripts": {
    // Add your custom scripts here...
  }
}
```

## Part 2: Environment Troubleshooting Guide

Create a troubleshooting guide for common issues:

```markdown
# Environment Troubleshooting Guide

## Issue 1: Metro Bundler Port Conflict
### Symptoms:
- [Describe symptoms]
### Diagnosis:
- [Add diagnosis steps]
### Resolution:
- [Add resolution steps]

## Issue 2: iOS Simulator Launch Failure
### Symptoms:
- [Describe symptoms]
### Diagnosis:
- [Add diagnosis steps]
### Resolution:
- [Add resolution steps]

[Add more issues...]
```

## Part 3: Development Workflow

### Task 1: Development Tools Setup
Document the setup of development tools:

```markdown
# Development Tools Setup

## React Native DevTools
1. [Installation steps]
2. [Configuration steps]
3. [Usage instructions]

## Debugging Configuration
1. [Setup steps]
2. [Configuration options]
3. [Usage guide]

## Environment Configuration
1. [Development settings]
2. [Production settings]
3. [Environment variables]
```

### Task 2: Developer Workflow Checklist
Create a comprehensive workflow checklist:

```markdown
# Developer Workflow Checklist

## Environment Setup
- [ ] Node.js installation
- [ ] Expo CLI installation
- [ ] Platform-specific tools
[Add more items...]

## Project Setup
- [ ] Create new project
- [ ] Configure app.json
- [ ] Set up environment variables
[Add more items...]

## Running Applications
- [ ] iOS simulator setup
- [ ] Android emulator setup
- [ ] Physical device testing
[Add more items...]
```

## Part 4: Project Structure Analysis

Create a diagram or documentation of the project structure:

```markdown
# Project Structure Analysis

## Directory Structure
```
PharmacyApp/
├── [Complete the structure...]
```

## Entry Point Analysis
- [Explain the entry point]
- [Document key files]
- [Describe configuration relationships]

## Build Process
1. [Document build steps]
2. [Explain configuration impact]
3. [Note platform differences]
```

## Part 5: Setup Documentation

Create comprehensive setup documentation:

```markdown
# Development Environment Setup Guide

## Prerequisites
- [ ] macOS [version]
- [ ] Xcode [version]
- [ ] Android Studio [version]
[Add more prerequisites...]

## Installation Steps
1. [Step-by-step instructions]
2. [Configuration details]
3. [Verification steps]

## Environment Variables
```bash
# Add required environment variables
export VARIABLE_NAME=value
```

## Pharmacy-Specific Configuration
1. Camera Configuration
   - [Setup instructions]
   - [Permission configuration]

2. Push Notifications
   - [Setup instructions]
   - [Configuration steps]

3. Secure Storage
   - [Implementation guide]
   - [Security considerations]
```

## Evaluation Checklist

- [ ] Project created and configured correctly
- [ ] All required tools installed and verified
- [ ] Development workflow documented
- [ ] Common issues documented with solutions
- [ ] Environment-specific configuration completed
- [ ] Security considerations addressed
- [ ] Documentation is clear and complete

## Submission Requirements

1. Project Files:
   - Complete PharmacyApp project
   - Configuration files
   - Environment setup scripts

2. Documentation:
   - Setup guide
   - Troubleshooting guide
   - Workflow documentation
   - Security considerations

3. Screenshots:
   - Development environment
   - Running application
   - Tool configurations

## Additional Notes

- Focus on clarity in documentation
- Include specific versions for all tools
- Document platform-specific requirements
- Address security considerations for pharmacy data
- Include error handling and recovery procedures 