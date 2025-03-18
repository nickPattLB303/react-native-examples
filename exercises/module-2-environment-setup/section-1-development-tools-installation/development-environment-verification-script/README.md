# Development Environment Verification Script

This directory contains the materials for the "Development Environment Verification Script" exercise for Section 1: Development Tools Installation.

## Exercise Overview

In this exercise, you will create a shell script that verifies your React Native development environment is correctly set up. This script will check for all required development tools, their versions, and proper configuration, helping you identify any installation issues that need to be resolved before you begin development.

## Files Included

- `env-check-template.sh`: A starter template for your verification script
- `environment-verification-example.md`: An example of a completed verification documentation

## Exercise Instructions

### Step 1: Create Your Verification Script

1. Use the provided template (`env-check-template.sh`) as a starting point
2. Complete the script to check for all required development tools:
   - Node.js installation and version (should be 16.0.0 or higher)
   - npm installation and version
   - Watchman installation
   - Xcode and Command Line Tools installation (for macOS)
   - Android SDK installation and environment variables
   - Expo CLI accessibility
   - Git installation

3. For each tool, your script should:
   - Check if the tool is installed
   - Verify the version meets requirements
   - Validate any necessary configurations
   - Output results with clear formatting (using colors if possible)
   - Provide troubleshooting suggestions for any failed checks

### Step 2: Test Your Script

1. Make your script executable:
   ```bash
   chmod +x env-check.sh
   ```

2. Run your script:
   ```bash
   ./env-check.sh
   ```

3. Fix any issues detected by your script

### Step 3: Document Your Process

Create a markdown file named `environment-verification.md` that includes:
- The commands used to check each tool
- Screenshots of successful verification
- Any issues encountered and how you resolved them

## Learning Objectives

After completing this exercise, you will be able to:
- Apply shell scripting skills to automate environment verification
- Understand the required components of a React Native development environment
- Learn how to programmatically check for installed software and configurations
- Develop troubleshooting skills for common installation issues

## Estimated Time

This exercise is designed to take approximately 15-20 minutes to complete.
