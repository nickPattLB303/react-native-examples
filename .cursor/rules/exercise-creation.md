# Exercise Creation Rules

## Directory Structure
```
exercises/
└── module-{number}-{name}/
    └── section-{number}-{name}/
        └── {exercise-name}.md
```

## Exercise Types and Templates

### 1. Analysis Exercise Template
Used for exercises that require students to analyze and evaluate concepts.

**Required Sections:**
- Instructions for Instructors
- Exercise Overview with Scenario
- Multiple Parts (2-4)
- Example Response Formats
- Evaluation Criteria
- Additional Notes for Instructors

**Example:** `react-native-advantages-analysis.md`

### 2. Documentation Exercise Template
Used for exercises that test documentation navigation and research skills.

**Required Sections:**
- Instructions for Instructors
- Exercise Overview with Scenario
- Time Allocation
- Multiple Parts with Specific Tasks
- Example Response Formats
- Evaluation Criteria
- Additional Notes for Microsoft Forms

**Example:** `react-native-documentation-scavenger-hunt.md`

### 3. Diagram Exercise Template
Used for exercises that involve creating or completing diagrams.

**Required Files:**
- Starter diagram file (`*-starter.md`)
- Complete diagram file (`*-complete.md`)

**Required Sections in Each:**
- Instructions/Overview
- Mermaid Diagram Code
- Component Explanations
- Requirements/Key Points
- Evaluation Criteria

**Example:** `react-native-architecture-diagram-starter.md`

## Naming Conventions

1. File Names:
   - Use kebab-case
   - Include exercise type if applicable (e.g., `-analysis`, `-diagram`)
   - Include `-starter` or `-complete` for diagram exercises

2. Section Names:
   - Use Title Case for headings
   - Use sentence case for descriptions
   - Use code formatting for technical terms

## Content Guidelines

### 1. Scenario Requirements
- Must relate to pharmacy app theme
- Include realistic technical requirements
- Specify clear deliverables
- Provide example formats

### 2. Response Formats
- Use markdown code blocks for examples
- Include placeholders in [brackets]
- Provide clear structure
- Include all required fields

### 3. Evaluation Criteria
- Must total 100%
- Include specific criteria for each component
- Define characteristics of strong/weak responses
- Include practical application elements

### 4. Microsoft Forms Integration
- Include character limits
- Specify question types
- Note time limits
- Include auto-save requirements
- Add progress indicators

## Quality Standards

### 1. Technical Accuracy
- All code examples must be functional
- Documentation links must be current
- Platform-specific notes must be included
- Error cases must be considered

### 2. Clarity
- Clear instructions
- Consistent formatting
- Proper markdown syntax
- Well-structured headings

### 3. Completeness
- All sections required by template
- Example responses provided
- Evaluation criteria defined
- Instructor notes included

## Review Process

1. **Technical Review**
   - Code correctness
   - Documentation accuracy
   - Platform compatibility
   - Error handling

2. **Content Review**
   - Learning objectives alignment
   - Scenario relevance
   - Clarity of instructions
   - Evaluation criteria completeness

3. **Format Review**
   - Template compliance
   - Markdown formatting
   - File structure
   - Naming conventions 