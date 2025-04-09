#!/bin/bash

# create-exercise.sh
# Script to create a new exercise for a topic using the exercise template
# Usage: ./create-exercise.sh "01" "Basic Component Creation"

# Check if topic number and exercise name are provided
if [ $# -lt 2 ]; then
  echo "Usage: ./create-exercise.sh <topic-number> <exercise-name>"
  echo "Example: ./create-exercise.sh 01 \"Basic Component Creation\""
  exit 1
fi

TOPIC_NUMBER=$1
EXERCISE_NAME=$2
EXERCISE_SLUG=$(echo $EXERCISE_NAME | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

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
EXERCISES_DIR="${TOPIC_DIR}/exercises"

# Create the exercise file
EXERCISE_FILE="${EXERCISES_DIR}/${EXERCISE_SLUG}.md"
echo "Creating exercise file: ${EXERCISE_FILE}"

# Copy from template and replace placeholders
cp templates/exercise-template.md ${EXERCISE_FILE}
sed -i '' "s/\[Exercise Name\]/${EXERCISE_NAME}/g" ${EXERCISE_FILE}
sed -i '' "s/\[Related Topic\]/${TOPIC_NAME}/g" ${EXERCISE_FILE}

# Create directories for exercise images if needed
IMAGES_DIR="${TOPIC_DIR}/images"
mkdir -p ${IMAGES_DIR}

echo "Done! Exercise created at ${EXERCISE_FILE}"
echo "Next steps:"
echo "1. Edit ${EXERCISE_FILE} to add exercise content"
echo "2. Add any required images to ${IMAGES_DIR}"
echo "3. Update the main topic file to reference this exercise"