# Development Tools Verification Exercise

## Instructions for Instructors
This file contains the script template and evaluation criteria for verifying React Native development tool installation. Students will create and run a verification script to ensure their development environment is properly configured.

## Exercise Overview

### Scenario
You are setting up a new development team for a pharmacy application project. Create a verification script that new team members can run to ensure their development environment is correctly configured.

### Time Allocation
- Script Creation: 20 minutes
- Testing and Documentation: 10 minutes

## Part 1: Verification Script Creation

Create a shell script that verifies the installation and configuration of all required development tools. Use this template as a starting point:

```bash
#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
YELLOW='\033[1;33m'

# Function to check command version
check_version() {
    local cmd=$1
    local version=$2
    if command -v $cmd >/dev/null 2>&1; then
        local current_version=$($cmd --version | head -n 1)
        echo -e "${GREEN}✓${NC} $cmd is installed: $current_version"
        return 0
    else
        echo -e "${RED}✗${NC} $cmd is not installed"
        return 1
    fi
}

# Function to check environment variables
check_env_var() {
    local var_name=$1
    if [ -z "${!var_name}" ]; then
        echo -e "${RED}✗${NC} $var_name is not set"
        return 1
    else
        echo -e "${GREEN}✓${NC} $var_name is set to: ${!var_name}"
        return 0
    fi
}

echo "=== React Native Development Environment Verification ==="
echo "Checking required tools and configurations..."
echo

# 1. Node.js and npm
echo "Checking Node.js and npm..."
check_version "node" "16.0.0"
check_version "npm" "8.0.0"
echo

# 2. Watchman (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Checking Watchman..."
    check_version "watchman"
    echo
fi

# Add your verification checks here for:
# - Xcode and Command Line Tools (macOS)
# - Android Studio
# - JDK
# - Expo CLI
# - Git
# - Environment variables

echo "=== Verification Complete ==="
```

### Required Checks

1. **Node.js and npm**
   - Verify installation
   - Check minimum versions
   - Test npm registry access

2. **Platform-specific Tools**
   - Xcode and Command Line Tools (macOS)
   - Android Studio
   - JDK
   - Android SDK

3. **Environment Variables**
   - ANDROID_HOME
   - Path includes platform-tools
   - Path includes emulator

4. **Development Tools**
   - Watchman
   - Expo CLI
   - Git

## Part 2: Documentation

Create a markdown file named `verification-results.md` that includes:

```markdown
# Development Environment Verification Results

## System Information
- OS Version:
- Node Version:
- npm Version:
- Xcode Version (if applicable):
- Android Studio Version:
- JDK Version:

## Verification Results
[Include script output here]

## Issues Found
- [List any issues discovered]
- [Include steps taken to resolve]

## Environment Variables
- [List all relevant environment variables]
- [Note any missing or incorrect values]

## Next Steps
- [List any remaining tasks]
- [Note any recommended updates]
```

## Evaluation Criteria

### Script Functionality (40%)
- Comprehensive tool verification
- Accurate version checking
- Proper error handling
- Clear output formatting

### Documentation Quality (30%)
- Complete system information
- Clear issue documentation
- Detailed resolution steps
- Well-organized format

### Error Handling (30%)
- Meaningful error messages
- Helpful resolution hints
- Graceful failure handling
- Platform-specific considerations

### Strong submissions should:
- Include all required tool checks
- Provide clear, formatted output
- Handle platform differences
- Include helpful error messages
- Document verification results

### Weak submissions typically:
- Miss critical tool checks
- Lack error handling
- Have unclear output
- Ignore platform differences

## Additional Notes for Instructors

When evaluating:
- Test script on different platforms
- Verify all tool checks are included
- Ensure error messages are helpful
- Check documentation completeness

## Submission Requirements
- Complete verification script
- Verification results documentation
- List of any unresolved issues
- Screenshots of script execution 