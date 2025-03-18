#!/bin/bash

# React Native Development Environment Verification Script
# This script checks if all required tools for React Native development are installed
# and properly configured on your system.

# ANSI color codes for better formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to compare version numbers
version_greater_equal() {
  [ "$1" = "$(echo -e "$1\n$2" | sort -V | tail -n1)" ]
}

# Function to print section header
print_header() {
  echo -e "\n${BLUE}===== $1 =====${NC}"
}

# Function to print success message
print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error message
print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# Function to print warning message
print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}  React Native Development Environment Check  ${NC}"
echo -e "${BLUE}===============================================${NC}"
echo "Checking for required development tools..."

# Check Node.js
print_header "Node.js"
if command_exists node; then
  node_version=$(node -v | cut -d 'v' -f 2)
  print_success "Node.js is installed: v$node_version"
  
  # Check Node.js version (should be 16.0.0 or higher)
  if version_greater_equal "$node_version" "16.0.0"; then
    print_success "Node.js version is 16.0.0 or higher"
  else
    print_warning "Node.js version is below 16.0.0. Consider upgrading for better compatibility."
    echo "  Tip: Use 'brew install node' to upgrade, or use nvm to manage multiple versions."
  fi
else
  print_error "Node.js is not installed"
  echo "  Install Node.js using: brew install node"
fi

# Check npm
# TODO: Add your code here to check if npm is installed and its version

# Check Watchman
# TODO: Add your code here to check if Watchman is installed

# Check Xcode and Command Line Tools (macOS only)
# TODO: Add your code here to check if Xcode and Command Line Tools are installed

# Check Android SDK
# TODO: Add your code here to check if Android SDK is installed and environment variables are set

# Check Expo CLI
# TODO: Add your code here to check if Expo CLI is accessible

# Check Git
# TODO: Add your code here to check if Git is installed

# Summary
print_header "Summary"
# TODO: Add your code here to provide a summary of the checks

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}          Verification Complete              ${NC}"
echo -e "${BLUE}===============================================${NC}"
