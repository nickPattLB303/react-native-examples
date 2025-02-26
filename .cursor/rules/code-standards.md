# Code Standards and Examples

## Description
This rule defines the standards for all code examples, exercises, challenges, and projects in the React Native training course.

## Rule
- All code must follow the medication/pharmacy/orders theme:
  - Use relevant variable names (e.g., `medication`, `prescription`, `pharmacy`)
  - Create examples that model real-world pharmacy scenarios
  - Use consistent domain terminology throughout

- All code must include comprehensive JSDoc documentation:
  - File headers with description, author, and date
  - Function documentation with parameters, return values, and examples
  - Class documentation with description and usage examples
  - Component documentation with props and state descriptions

- Platform-specific code must be clearly marked and explained:
  ```javascript
  // iOS-specific implementation
  if (Platform.OS === 'ios') {
    // Implementation with explanation of iOS-specific behavior
  }
  // Android-specific implementation
  else if (Platform.OS === 'android') {
    // Implementation with explanation of Android-specific behavior
  }
  ```

- Exercise and challenge structure:
  - Exercises (15-30 minutes): End of each section
  - Challenges (30-60 minutes): End of each module
  - Capstone project: Final week of training

- Code platform usage:
  - HTML, CSS, JavaScript, React: CodePen
  - React Native: Expo Snack
  - Analysis Exercises: Microsoft Forms
  - Diagramming Exercises: Microsoft Whiteboard
  - Challenges: Pre-made branches in the repository

- React Native setup:
  - Use Expo Go setup as described in Expo documentation
  - Additional tools introduced on a case-by-case basis

## Examples
- Proper JSDoc documentation:
  ```javascript
  /**
   * @fileoverview Component for displaying a list of medications
   * @author Training Course Author
   * @created 2023-05-01
   */

  /**
   * Calculates the dosage based on patient weight and medication concentration
   * @param {number} weight - Patient weight in kg
   * @param {number} concentration - Medication concentration in mg/ml
   * @returns {number} The calculated dosage in ml
   * @example
   * // Returns 2.5
   * calculateDosage(50, 20)
   */
  function calculateDosage(weight, concentration) {
    return weight * 0.001 * concentration;
  }
  ```

- Improper JSDoc documentation:
  ```javascript
  // Function to calculate dosage
  function calculateDosage(weight, concentration) {
    return weight * 0.001 * concentration;
  }
  ```

- Proper themed example:
  ```javascript
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' }
  ];

  function MedicationList({ medications }) {
    return (
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicationItem 
            name={item.name}
            dosage={item.dosage}
            frequency={item.frequency}
          />
        )}
      />
    );
  }
  ``` 