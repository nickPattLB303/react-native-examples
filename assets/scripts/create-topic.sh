#!/bin/bash

# create-topic.sh
# Script to create a new topic with proper folder structure and template files
# Usage: ./create-topic.sh "01" "React Native Fundamentals"

# Check if topic number and name are provided
if [ $# -lt 2 ]; then
  echo "Usage: ./create-topic.sh <topic-number> <topic-name>"
  echo "Example: ./create-topic.sh 01 \"React Native Fundamentals\""
  exit 1
fi

TOPIC_NUMBER=$1
TOPIC_NAME=$2
TOPIC_SLUG=$(echo $TOPIC_NAME | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
TOPIC_DIR="topics/${TOPIC_NUMBER}-${TOPIC_SLUG}"

# Create directory structure
echo "Creating topic directory structure..."
mkdir -p ${TOPIC_DIR}/exercises
mkdir -p ${TOPIC_DIR}/challenges
mkdir -p ${TOPIC_DIR}/images
mkdir -p ${TOPIC_DIR}/slides

# Create main topic markdown file
TOPIC_FILE="${TOPIC_DIR}/${TOPIC_SLUG}.md"
echo "Creating main topic file: ${TOPIC_FILE}"

# Copy from template and replace placeholders
cp templates/main-topic-template.md ${TOPIC_FILE}
sed -i '' "s/\[Topic Title\]/${TOPIC_NAME}/g" ${TOPIC_FILE}

# Create README for the topic directory
README_FILE="${TOPIC_DIR}/README.md"
echo "Creating README file: ${README_FILE}"

cat > ${README_FILE} << EOF
# ${TOPIC_NAME}

This directory contains the course materials for the ${TOPIC_NAME} topic of the React Native Training course.

## Structure

- **${TOPIC_SLUG}.md**: Main topic content and slides
- **exercises/**: Hands-on exercises for this topic
- **challenges/**: More complex challenges for this topic
- **images/**: Images and diagrams used in the topic materials
- **slides/**: Additional slide files (if any)

## Related Topics

See the [course outline](../../course-outline.md) for information on how this topic fits into the overall course structure.
EOF

echo "Creating slides template for this topic..."
cat > ${TOPIC_DIR}/slides/00-title.md << EOF
---
marp: true
theme: company
paginate: false
header: ""
footer: "© 2025 - React Native Training"
class: title-slide
---

# ${TOPIC_NAME}

## React Native Training

<!-- 
Speaker Notes:
- Welcome participants to the ${TOPIC_NAME} module
- Briefly mention what will be covered in this topic
- Set expectations for the session duration and format
- Highlight any pre-requirements or things they should have ready
-->
EOF

echo "Done! Topic structure created at ${TOPIC_DIR}"
echo "Now you can:"
echo "1. Edit ${TOPIC_FILE} to add content"
echo "2. Create exercises with: ./assets/scripts/create-exercise.sh ${TOPIC_NUMBER} \"Exercise Name\""
echo "3. Create challenges with: ./assets/scripts/create-challenge.sh ${TOPIC_NUMBER} \"Challenge Name\""