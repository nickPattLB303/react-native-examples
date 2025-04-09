#!/bin/bash

# create-challenge.sh
# Script to create a new challenge for a topic using the challenge template
# Usage: ./create-challenge.sh "01" "Medication List Filter"

# Check if topic number and challenge name are provided
if [ $# -lt 2 ]; then
  echo "Usage: ./create-challenge.sh <topic-number> <challenge-name>"
  echo "Example: ./create-challenge.sh 01 \"Medication List Filter\""
  exit 1
fi

TOPIC_NUMBER=$1
CHALLENGE_NAME=$2
CHALLENGE_SLUG=$(echo $CHALLENGE_NAME | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Find the topic directory
TOPIC_DIRS=$(find topics -type d -name "${TOPIC_NUMBER}-*" -maxdepth 1)
TOPIC_COUNT=$(echo "$TOPIC_DIRS" | wc -l)

if [ "$TOPIC_COUNT" -eq 0 ]; then
  echo "Error: No topic found with number ${TOPIC_NUMBER}"
  echo "Create the topic first using: ./assets/scripts/create-topic.sh ${TOPIC_NUMBER} \"Topic Name\""
  exit 1
fi

if [ "$TOPIC_COUNT" -gt 1 ]; then
  echo "Error: Multiple topics found with number ${TOPIC_NUMBER}. Please check your topic directories."
  exit 1
fi

TOPIC_DIR=$TOPIC_DIRS
TOPIC_NAME=$(basename $TOPIC_DIR | sed 's/^[0-9]\+-//' | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
CHALLENGES_DIR="${TOPIC_DIR}/challenges"

# Create the challenge file
CHALLENGE_FILE="${CHALLENGES_DIR}/${CHALLENGE_SLUG}.md"
echo "Creating challenge file: ${CHALLENGE_FILE}"

# Copy from template and replace placeholders
cp templates/challenge-template.md ${CHALLENGE_FILE}
sed -i '' "s/\[Challenge Name\]/${CHALLENGE_NAME}/g" ${CHALLENGE_FILE}
sed -i '' "s/\[Related Topic\]/${TOPIC_NAME}/g" ${CHALLENGE_FILE}
sed -i '' "s/\[challenge-name\]/${CHALLENGE_SLUG}/g" ${CHALLENGE_FILE}

# Create directories for challenge images if needed
IMAGES_DIR="${TOPIC_DIR}/images"
mkdir -p ${IMAGES_DIR}

# Create a placeholder mockup image for the challenge
MOCKUP_FILE="${IMAGES_DIR}/${CHALLENGE_SLUG}-mockup.png"
if [ ! -f "$MOCKUP_FILE" ]; then
  echo "Note: You'll need to create a mockup image at: ${MOCKUP_FILE}"
fi

echo "Done! Challenge created at ${CHALLENGE_FILE}"
echo "Next steps:"
echo "1. Edit ${CHALLENGE_FILE} to add challenge content"
echo "2. Create and add the mockup image to ${MOCKUP_FILE}"
echo "3. Update the main topic file to reference this challenge"