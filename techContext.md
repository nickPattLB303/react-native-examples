# React Native Training Course - Technical Context

## Development Environment

### Tools and Platforms

The React Native Training Course uses the following tools and platforms:

1. **Code Examples and Exercises**
   - **HTML, CSS, JavaScript, React**: CodePen
   - **React Native**: Expo Snack
   - **Analysis Exercises**: Microsoft Forms
   - **Diagramming Exercises**: Microsoft Whiteboard
   - **Challenges**: Repository branches with local setup

2. **Local Development**
   - **React Native**: Expo Go
   - **Code Editor**: Visual Studio Code with recommended extensions
   - **Version Control**: Git and GitHub
   - **Package Manager**: npm or yarn

3. **Documentation and Slides**
   - **Documentation**: Markdown
   - **Slides**: HTML, CSS, JavaScript
   - **E-Learning**: Articulate 360

### Setup Instructions

#### Expo Go Setup

For instructors and learners who want to run examples locally:

1. Install Node.js (version 14 or later)
2. Install Expo CLI: `npm install -g expo-cli`
3. Install Expo Go app on iOS or Android device
4. Clone the repository: `git clone https://github.com/example/react-native-training-course.git`
5. Navigate to an exercise directory: `cd exercises/basic-component/starter`
6. Install dependencies: `npm install`
7. Start the development server: `expo start`
8. Scan the QR code with the Expo Go app

#### Expo Snack SDK Usage

For creating and using Expo Snacks:

1. Create Snacks locally in the repository
2. Ensure all Snacks are properly documented
3. Include clear instructions for running and modifying Snacks
4. Use consistent naming conventions for Snacks

#### Local Development Instructions

For contributors to the course:

1. Clone the repository: `git clone https://github.com/example/react-native-training-course.git`
2. Install dependencies: `npm install`
3. For documentation and slides:
   - Navigate to the docs directory: `cd docs`
   - Start a local server: `npx serve`
   - Open a browser and navigate to `http://localhost:5000`
4. For exercises and challenges:
   - Navigate to the exercise directory: `cd exercises/basic-component/starter`
   - Install dependencies: `npm install`
   - Start the development server: `expo start`

### Repository Branch Structure

The repository follows this branch structure for exercises and challenges:

- `exercises/<EXERCISE_NAME>/starter`: Starting point for exercises
- `exercises/<EXERCISE_NAME>/complete`: Completed example for exercises
- `challenges/<CHALLENGE_NAME>/starter`: Starting point for challenges
- `challenges/<CHALLENGE_NAME>/complete`: Completed example for challenges

All code examples include:
- Clear setup instructions
- Required dependencies
- Commands to run the code
- Expected output or behavior

For local development, the repository provides:
- Environment setup instructions
- Troubleshooting guides
- Platform-specific considerations (macOS, Windows, Linux)

## Code Standards

### General Standards

- All code must follow the medication/pharmacy/orders theme
- All code must include JSDoc documentation
- All code must follow the Airbnb JavaScript Style Guide
- All code must be compatible with the latest stable version of React Native
- All code must handle platform-specific differences appropriately

### JSDoc Requirements

All code examples must include JSDoc documentation with the following elements:

- Description of the component or function
- Parameter descriptions with types
- Return value description with type
- Example usage where appropriate
- Platform-specific notes where applicable

Example:
```javascript
/**
 * MedicationItem component displays information about a medication
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the medication
 * @param {string} props.dosage - Dosage information
 * @param {string} props.frequency - How often to take the medication
 * @param {Function} props.onPress - Callback function when the item is pressed
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * <MedicationItem
 *   name="Ibuprofen"
 *   dosage="200mg"
 *   frequency="Every 6 hours"
 *   onPress={() => console.log('Pressed')}
 * />
 */
```

### Platform-Specific Code

Platform-specific code must be clearly marked and explained:

```javascript
// Platform-specific imports
import { Platform } from 'react-native';

// Platform-specific styles
const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 20 : 16,
    // iOS uses more padding due to different default appearance
  },
});

// Platform-specific component logic
const renderButton = () => {
  if (Platform.OS === 'ios') {
    // iOS-specific button implementation
    return <IOSButton />;
  } else {
    // Android-specific button implementation
    return <AndroidButton />;
  }
};
```

### Exercise and Challenge Structure

#### Exercise Structure

Exercises must include:
- Clear instructions
- Starter code with TODO comments
- Complete solution code
- Expected output description or screenshot
- Learning objectives
- Time estimate

#### Challenge Structure

Challenges must include:
- Problem statement
- Requirements
- Starter code (minimal)
- Complete solution code
- Evaluation criteria
- Learning objectives
- Time estimate

## Technical Depth Levels

The course provides explanations at three levels of technical depth:

### Surface Level

Basic understanding of concepts and how to use features:

```javascript
// Surface level explanation
// FlatList is a component for rendering lists efficiently
const MedicationList = ({ medications }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>{item.name} - {item.dosage}</Text>
      )}
    />
  );
};
```

### Mid Level

More detailed explanations, best practices, and common pitfalls:

```javascript
// Mid level explanation
// FlatList optimizes rendering by only rendering items that are currently visible
// It's important to provide a keyExtractor for performance and to avoid warnings
const MedicationList = ({ medications }) => {
  // Using memo to prevent unnecessary re-renders
  const renderItem = React.useCallback(({ item }) => (
    <MedicationItem
      name={item.name}
      dosage={item.dosage}
      onPress={() => handleMedicationPress(item)}
    />
  ), [handleMedicationPress]);

  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
};
```

### Deep Level

"Under the hood" explanations, implementation details, and architecture:

```javascript
// Deep level explanation
// FlatList uses VirtualizedList under the hood, which implements windowing
// Windowing only renders items that are currently visible in the viewport
// This significantly improves performance for large lists

// The rendering process works as follows:
// 1. VirtualizedList calculates which items are visible based on scroll position
// 2. It renders only those items plus a buffer (controlled by windowSize)
// 3. As the user scrolls, it renders new items and removes items that are no longer visible
// 4. This recycling of item views is what makes FlatList efficient

// Performance optimization parameters:
// - initialNumToRender: Initial number of items to render (default 10)
// - maxToRenderPerBatch: Maximum number of items to render per batch (default 10)
// - windowSize: Number of viewports to render outside the visible area (default 21)
// - updateCellsBatchingPeriod: Milliseconds between batch updates (default 50ms)
// - removeClippedSubviews: Whether to detach views outside the viewport (default false on iOS, true on Android)
```

## Automated Validation

### ESLint Configuration

The project uses ESLint to enforce code standards:

```json
{
  "extends": [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  "plugins": [
    "react",
    "react-native",
    "jsdoc"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react-native/no-inline-styles": 2,
    "jsdoc/require-description": 1,
    "jsdoc/require-param": 1,
    "jsdoc/require-returns": 1
  }
}
```

### Documentation Validation

The project includes scripts to validate documentation:

- Check for broken links
- Verify that all modules and sections have README.md files
- Ensure that learning objectives are defined for all modules and sections
- Validate that code examples follow the pharmacy/medication theme
- Check for consistency between slides and markdown documentation

### Pre-commit Hooks

The project uses pre-commit hooks to ensure quality:

- Lint code examples
- Format code with Prettier
- Validate documentation
- Check for broken links
- Run tests for code examples

## Integration with External Tools

### Articulate 360 Integration

The course content is designed to be compatible with Articulate 360:

- Content structure follows a format that can be easily converted to Articulate
- Interactive elements are designed to map to Articulate features
- Code examples are formatted for optimal display in Articulate
- The pharmacy theme is consistent across all content for seamless integration

### Microsoft Forms Integration

Analysis exercises use Microsoft Forms:

- Forms are created for each analysis exercise
- Links to forms are included in both slides and markdown documentation
- Form responses are collected for assessment
- Forms include multiple choice, short answer, and long answer questions

### Microsoft Whiteboard Integration

Diagramming exercises use Microsoft Whiteboard:

- Whiteboard templates are created for each diagramming exercise
- Links to whiteboard templates are included in both slides and markdown documentation
- Whiteboards include instructions and starting elements
- Completed whiteboards can be saved and shared for assessment

### CodePen Integration

HTML, CSS, JavaScript, and React exercises use CodePen:

- CodePen templates are created for each exercise
- Links to CodePen templates are included in both slides and markdown documentation
- CodePen templates include starter code with TODO comments
- Completed CodePens can be forked and shared for assessment

### Expo Snack Integration

React Native exercises use Expo Snack:

- Expo Snack templates are created for each exercise
- Links to Expo Snack templates are included in both slides and markdown documentation
- Expo Snack templates include starter code with TODO comments
- Completed Expo Snacks can be saved and shared for assessment