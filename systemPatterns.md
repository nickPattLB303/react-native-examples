# React Native Training Course - System Patterns

## Repository Structure

The React Native Training Course repository follows a specific structure to organize content effectively:

```
/
├── README.md                 # Repository overview and navigation
├── docs/                     # Documentation and slides
│   ├── README.md             # Documentation overview
│   ├── module-1-react-native-fundamentals/
│   │   ├── README.md         # Module overview
│   │   ├── section-1-mobile-development-landscape/
│   │   │   ├── README.md     # Section content
│   │   │   └── examples/     # Code examples
│   │   ├── section-2-why-react-native/
│   │   └── ...
│   ├── module-2-environment-setup/
│   └── ...
│   ├── slides/               # HTML/CSS slides for presentations
│   │   ├── README.md         # Slides overview
│   │   ├── shared/           # Shared resources for slides
│   │   │   ├── styles.css    # Common styles
│   │   │   ├── script.js     # Common scripts
│   │   │   └── images/       # Shared images
│   │   ├── module-1-react-native-fundamentals/
│   │   │   ├── section-1-mobile-development-landscape/
│   │   │   │   └── index.html
│   │   │   └── ...
│   │   └── ...
├── exercises/                # Exercise code
│   ├── basic-component/
│   │   ├── starter/          # Starter code for exercise
│   │   └── complete/         # Completed example
│   └── ...
└── challenges/               # Challenge code
    ├── medication-tracker/
    │   ├── starter/          # Starter code for challenge
    │   └── complete/         # Completed example
    └── ...
```

## Naming Conventions

### Directories and Files

- Module directories: `module-X-name-with-hyphens`
- Section directories: `section-X-name-with-hyphens`
- Example directories: `examples`
- Exercise directories: `exercises/name-with-hyphens/starter` and `exercises/name-with-hyphens/complete`
- Challenge directories: `challenges/name-with-hyphens/starter` and `challenges/name-with-hyphens/complete`
- README files: `README.md` (for module and section overviews)
- Content files: `name-with-hyphens.md`
- Slide files: `index.html` (in section-specific slide directories)

### Content References

- Module references: "Module X: Name" (e.g., "Module 3: Web Development Essentials")
- Section references: "Section X: Name" (e.g., "Section 2: Why React Native")
- Exercise references: "Exercise: Name" (e.g., "Exercise: Basic Component")
- Challenge references: "Challenge: Name" (e.g., "Challenge: Medication Tracker")

## Documentation Hierarchy

The documentation follows a hierarchical structure:

1. **Modules**: Large topics that represent major course components
   - Each module has its own directory and README.md file
   - Module README.md files include an overview, learning objectives, and links to sections

2. **Sections**: Components of modules that focus on specific subtopics
   - Each section has its own directory and README.md file
   - Section README.md files include an overview, learning objectives, and content

3. **Sub-sections**: Components of sections that provide detailed information
   - Sub-sections are included within section README.md files
   - Sub-sections use heading levels to indicate hierarchy

## Slide Organization

Slides are organized in a parallel structure to the documentation:

1. **Module Slides**: Slides for each module
   - Located in `docs/slides/module-X-name-with-hyphens/`

2. **Section Slides**: Slides for each section
   - Located in `docs/slides/module-X-name-with-hyphens/section-Y-name-with-hyphens/`
   - Each section has an `index.html` file that contains the slides

3. **Shared Resources**: Common styles, scripts, and images
   - Located in `docs/slides/shared/`
   - Used across all slide presentations for consistency

## Content Patterns

### README.md Structure

Module README.md files follow this structure:
```markdown
# Module X: Name

## Overview
Brief description of the module.

## Learning Objectives
- Objective 1
- Objective 2
- ...

## Sections
1. [Section 1: Name](./section-1-name-with-hyphens/README.md)
2. [Section 2: Name](./section-2-name-with-hyphens/README.md)
...

## Resources
- Resource 1
- Resource 2
...
```

Section README.md files follow this structure:
```markdown
# Section X: Name

## Overview
Brief description of the section.

## Learning Objectives
- Objective 1
- Objective 2
- ...

## Content
### Sub-section 1
Content for sub-section 1.

### Sub-section 2
Content for sub-section 2.
...

## Examples
- [Example 1](./examples/example-1.js)
- [Example 2](./examples/example-2.js)
...

## Exercises
- [Exercise: Name](../../exercises/name/README.md)
...

## Resources
- Resource 1
- Resource 2
...
```

### Slide Structure

Slide HTML files follow this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module X, Section Y: Name</title>
    <link rel="stylesheet" href="../../shared/styles.css">
</head>
<body>
    <div class="slides">
        <section class="slide title-slide">
            <h1>Module X, Section Y: Name</h1>
            <p>React Native Training Course</p>
        </section>
        
        <section class="slide">
            <h2>Learning Objectives</h2>
            <ul>
                <li>Objective 1</li>
                <li>Objective 2</li>
                <!-- ... -->
            </ul>
        </section>
        
        <!-- Content slides -->
        
        <section class="slide">
            <h2>Summary</h2>
            <ul>
                <li>Key point 1</li>
                <li>Key point 2</li>
                <!-- ... -->
            </ul>
        </section>
    </div>
    
    <script src="../../shared/script.js"></script>
</body>
</html>
```

## Exercise and Challenge Patterns

### Exercise Structure

Exercises follow this structure:
```
exercises/name-with-hyphens/
├── README.md         # Exercise instructions
├── starter/          # Starter code
│   ├── App.js
│   └── ...
└── complete/         # Completed example
    ├── App.js
    └── ...
```

Exercise README.md files follow this structure:
```markdown
# Exercise: Name

## Objective
Brief description of the exercise objective.

## Instructions
1. Step 1
2. Step 2
...

## Resources
- Resource 1
- Resource 2
...

## Expected Output
Description or screenshot of the expected output.
```

### Challenge Structure

Challenges follow this structure:
```
challenges/name-with-hyphens/
├── README.md         # Challenge instructions
├── starter/          # Starter code
│   ├── App.js
│   └── ...
└── complete/         # Completed example
    ├── App.js
    └── ...
```

Challenge README.md files follow this structure:
```markdown
# Challenge: Name

## Objective
Brief description of the challenge objective.

## Requirements
- Requirement 1
- Requirement 2
...

## Resources
- Resource 1
- Resource 2
...

## Evaluation Criteria
- Criterion 1
- Criterion 2
...
```

## Code Example Patterns

All code examples follow these patterns:

1. **Theme**: All examples use the medication/pharmacy/orders theme
2. **Documentation**: All code includes JSDoc documentation
3. **Platform-Specific Code**: Platform-specific code is clearly marked and explained
4. **Consistency**: Variable naming, code style, and structure are consistent across examples

Example:
```javascript
/**
 * MedicationList component displays a list of medications
 * @param {Object[]} medications - Array of medication objects
 * @param {string} medications[].id - Unique identifier for the medication
 * @param {string} medications[].name - Name of the medication
 * @param {string} medications[].dosage - Dosage information
 * @param {Function} onSelectMedication - Callback function when a medication is selected
 * @returns {JSX.Element} Rendered component
 */
const MedicationList = ({ medications, onSelectMedication }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectMedication(item)}>
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.medicationDosage}>{item.dosage}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};