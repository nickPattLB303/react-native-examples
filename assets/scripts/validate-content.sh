#!/bin/bash

# validate-content.sh
# Script to validate the content structure and consistency
# Usage: ./validate-content.sh [topic-number]

# Set text formatting variables
BOLD='\033[1m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Track issues
ERRORS=0
WARNINGS=0

# Function to print error
error() {
  echo -e "${RED}[ERROR]${NC} $1"
  ERRORS=$((ERRORS+1))
}

# Function to print warning
warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
  WARNINGS=$((WARNINGS+1))
}

# Function to print success
success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Validate a single topic
validate_topic() {
  local topic_dir=$1
  local topic_num=$(basename "$topic_dir" | cut -d'-' -f1)
  local topic_name=$(basename "$topic_dir" | sed 's/^[0-9]\+-//' | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
  local topic_slug=$(echo "$topic_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  
  echo -e "${BOLD}Validating Topic: $topic_name ($topic_dir)${NC}"
  
  # Check if main topic file exists
  local main_file="${topic_dir}/${topic_slug}.md"
  if [ ! -f "$main_file" ]; then
    error "Main topic file not found: $main_file"
  else
    # Check main file structure
    echo "Checking main topic file structure..."
    
    # Check for required sections
    if ! grep -q "## Learning Objectives" "$main_file"; then
      warning "Missing section: Learning Objectives in $main_file"
    fi
    
    if ! grep -q "## Key Terminology" "$main_file"; then
      warning "Missing section: Key Terminology in $main_file"
    fi
    
    if ! grep -q "## Introduction" "$main_file"; then
      warning "Missing section: Introduction in $main_file"
    fi
    
    if ! grep -q "## Summary" "$main_file"; then
      warning "Missing section: Summary in $main_file"
    fi
    
    # Check for pharmacy context
    if ! grep -q "SpeedyMeds Context" "$main_file"; then
      warning "Missing pharmacy context in $main_file"
    fi
    
    # Check for developer path adaptations
    if ! grep -q "For Native Developers" "$main_file"; then
      warning "Missing native developer adaptation in $main_file"
    fi
    
    if ! grep -q "For Web Developers" "$main_file"; then
      warning "Missing web developer adaptation in $main_file"
    fi
    
    # Check for code examples with TypeScript
    if grep -q '```js' "$main_file" || grep -q '```javascript' "$main_file"; then
      warning "Using JavaScript instead of TypeScript in code examples in $main_file"
    fi
    
    # Check for mermaid diagrams
    if ! grep -q "```mermaid" "$main_file"; then
      warning "No mermaid diagrams found in $main_file"
    fi
  fi
  
  # Check exercises directory
  local exercises_dir="${topic_dir}/exercises"
  if [ ! -d "$exercises_dir" ]; then
    error "Exercises directory not found: $exercises_dir"
  else
    echo "Checking exercises..."
    # Count exercise files
    local exercise_count=$(find "$exercises_dir" -name "*.md" | wc -l)
    if [ "$exercise_count" -eq 0 ]; then
      warning "No exercises found in $exercises_dir"
    else
      success "Found $exercise_count exercises"
      
      # Validate each exercise
      for exercise_file in "$exercises_dir"/*.md; do
        local exercise_name=$(basename "$exercise_file" .md | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
        echo "Checking exercise: $exercise_name"
        
        # Check for duration
        if ! grep -q "Duration:" "$exercise_file"; then
          warning "Missing duration in $exercise_file"
        fi
        
        # Check for pharmacy theme
        if ! grep -q "## Pharmacy Theme Integration" "$exercise_file"; then
          warning "Missing pharmacy theme section in $exercise_file"
        fi
        
        # Check for code with TypeScript
        if grep -q '```js' "$exercise_file" || grep -q '```javascript' "$exercise_file"; then
          warning "Using JavaScript instead of TypeScript in code examples in $exercise_file"
        fi
        
        # Check for accessibility guidance
        if ! grep -q "accessibility" "$exercise_file"; then
          warning "No mention of accessibility in $exercise_file"
        fi
        
        # Check for developer path adaptations
        if ! grep -q "For Native Developers" "$exercise_file"; then
          warning "Missing native developer adaptation in $exercise_file"
        fi
        
        if ! grep -q "For Web Developers" "$exercise_file"; then
          warning "Missing web developer adaptation in $exercise_file"
        fi
      done
    fi
  fi
  
  # Check challenges directory
  local challenges_dir="${topic_dir}/challenges"
  if [ ! -d "$challenges_dir" ]; then
    error "Challenges directory not found: $challenges_dir"
  else
    echo "Checking challenges..."
    # Count challenge files
    local challenge_count=$(find "$challenges_dir" -name "*.md" | wc -l)
    if [ "$challenge_count" -eq 0 ]; then
      warning "No challenges found in $challenges_dir"
    else
      success "Found $challenge_count challenges"
      
      # Validate each challenge
      for challenge_file in "$challenges_dir"/*.md; do
        local challenge_name=$(basename "$challenge_file" .md | tr '-' ' ' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
        echo "Checking challenge: $challenge_name"
        
        # Check for duration
        if ! grep -q "Duration:" "$challenge_file"; then
          warning "Missing duration in $challenge_file"
        fi
        
        # Check for pharmacy theme
        if ! grep -q "## Pharmacy Theme" "$challenge_file"; then
          warning "Missing pharmacy theme section in $challenge_file"
        fi
        
        # Check for code with TypeScript
        if grep -q '```js' "$challenge_file" || grep -q '```javascript' "$challenge_file"; then
          warning "Using JavaScript instead of TypeScript in code examples in $challenge_file"
        fi
        
        # Check for accessibility requirements
        if ! grep -q "accessibility" "$challenge_file"; then
          warning "No mention of accessibility in $challenge_file"
        fi
        
        # Check for mockup image reference
        local challenge_slug=$(basename "$challenge_file" .md)
        local mockup_path="../images/${challenge_slug}-mockup.png"
        
        if ! grep -q "$mockup_path" "$challenge_file"; then
          warning "Missing mockup image reference in $challenge_file"
        fi
        
        # Check if mockup image exists
        local actual_image_path="${topic_dir}/images/${challenge_slug}-mockup.png"
        if [ ! -f "$actual_image_path" ]; then
          warning "Mockup image file not found: $actual_image_path"
        fi
        
        # Check for developer path adaptations
        if ! grep -q "For Native Developers" "$challenge_file"; then
          warning "Missing native developer adaptation in $challenge_file"
        fi
        
        if ! grep -q "For Web Developers" "$challenge_file"; then
          warning "Missing web developer adaptation in $challenge_file"
        fi
      done
    fi
  fi
  
  # Check images directory
  local images_dir="${topic_dir}/images"
  if [ ! -d "$images_dir" ]; then
    warning "Images directory not found: $images_dir"
  else
    local image_count=$(find "$images_dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" \) | wc -l)
    if [ "$image_count" -eq 0 ]; then
      warning "No images found in $images_dir"
    else
      success "Found $image_count images"
    fi
  fi
  
  # Check slides directory
  local slides_dir="${topic_dir}/slides"
  if [ ! -d "$slides_dir" ]; then
    warning "Slides directory not found: $slides_dir"
  else
    local slide_count=$(find "$slides_dir" -name "*.md" | wc -l)
    if [ "$slide_count" -eq 0 ]; then
      warning "No slide files found in $slides_dir"
    else
      success "Found $slide_count slide files"
      
      # Check if title slide exists
      if [ ! -f "${slides_dir}/00-title.md" ]; then
        warning "Title slide not found: ${slides_dir}/00-title.md"
      fi
      
      # Check slide files for marp header
      for slide_file in "$slides_dir"/*.md; do
        if ! grep -q "marp: true" "$slide_file"; then
          warning "Missing marp header in $slide_file"
        fi
        
        if ! grep -q "theme: company" "$slide_file"; then
          warning "Not using company theme in $slide_file"
        fi
      done
    fi
  fi
  
  echo ""
}

# Main validation process
echo -e "${BOLD}React Native Training Course Content Validation${NC}"
echo "======================================================="
echo ""

# Validate course structure
echo -e "${BOLD}Validating Course Structure${NC}"

# Check for essential files
if [ ! -f "README.md" ]; then
  error "README.md file missing from root directory"
fi

if [ ! -f "course-outline.md" ]; then
  error "course-outline.md file missing from root directory"
fi

if [ ! -f "CONTRIBUTING.md" ]; then
  warning "CONTRIBUTING.md file missing from root directory"
fi

# Check for essential directories
if [ ! -d "templates" ]; then
  error "templates directory missing"
fi

if [ ! -d "assets" ]; then
  error "assets directory missing"
fi

if [ ! -d "topics" ]; then
  error "topics directory missing"
fi

# Check for template files
for template in "main-topic-template.md" "exercise-template.md" "challenge-template.md"; do
  if [ ! -f "templates/$template" ]; then
    error "Template file missing: templates/$template"
  fi
done

# Check for slide templates
for slide_template in "title-slide.md" "content-slide.md" "code-slide.md"; do
  if [ ! -f "templates/slides/$slide_template" ]; then
    warning "Slide template file missing: templates/slides/$slide_template"
  fi
done

# Check for theme
if [ ! -f "assets/theme/company-theme.css" ]; then
  error "Company theme CSS file missing: assets/theme/company-theme.css"
fi

# Check for scripts
for script in "create-topic.sh" "create-exercise.sh" "create-challenge.sh" "validate-content.sh"; do
  if [ ! -f "assets/scripts/$script" ]; then
    error "Script file missing: assets/scripts/$script"
  fi
done

echo ""

# Validate topics
if [ $# -eq 1 ]; then
  # Validate specific topic
  topic_pattern="topics/$1-*"
  topic_dirs=$(find $topic_pattern -maxdepth 0 -type d 2>/dev/null)
  
  if [ -z "$topic_dirs" ]; then
    error "No topic found with number $1"
  else
    for topic_dir in $topic_dirs; do
      validate_topic "$topic_dir"
    done
  fi
else
  # Validate all topics
  topic_dirs=$(find topics/* -maxdepth 0 -type d 2>/dev/null | sort)
  
  if [ -z "$topic_dirs" ]; then
    warning "No topic directories found in topics/"
  else
    for topic_dir in $topic_dirs; do
      validate_topic "$topic_dir"
    done
  fi
fi

# Summary
echo -e "${BOLD}Validation Summary${NC}"
echo "======================================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}All content validated successfully with no issues!${NC}"
else
  if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}Found $ERRORS errors${NC}"
  fi
  
  if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}Found $WARNINGS warnings${NC}"
  fi
  
  echo ""
  echo "Please address these issues to ensure content quality and consistency."
fi

exit $ERRORS