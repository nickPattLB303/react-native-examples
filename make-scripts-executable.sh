#!/bin/bash

# make-scripts-executable.sh
# Script to make all the shell scripts in the project executable
# Run this script once after cloning the repository

# Set text formatting variables
BOLD='\033[1m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${BOLD}Making React Native Training Course scripts executable${NC}"
echo "======================================================="

# Make all the scripts in assets/scripts executable
SCRIPT_COUNT=0
for script in assets/scripts/*.sh; do
  if [ -f "$script" ]; then
    chmod +x "$script"
    echo -e "${GREEN}Made executable:${NC} $script"
    SCRIPT_COUNT=$((SCRIPT_COUNT+1))
  fi
done

# Make this script executable too
chmod +x make-scripts-executable.sh
echo -e "${GREEN}Made executable:${NC} make-scripts-executable.sh"
SCRIPT_COUNT=$((SCRIPT_COUNT+1))

echo "======================================================="
echo -e "${BOLD}Successfully made $SCRIPT_COUNT scripts executable${NC}"
echo ""
echo "You can now run the following commands to create content:"
echo "  ./assets/scripts/create-topic.sh <topic-number> \"Topic Name\""
echo "  ./assets/scripts/create-exercise.sh <topic-number> \"Exercise Name\""
echo "  ./assets/scripts/create-challenge.sh <topic-number> \"Challenge Name\""
echo "  ./assets/scripts/validate-content.sh [topic-number]"
echo ""
echo "Example:"
echo "  ./assets/scripts/create-topic.sh 02 \"React Native Environment Setup\""