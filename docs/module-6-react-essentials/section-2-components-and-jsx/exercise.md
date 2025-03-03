# Exercise: Creating Components

## Objective
Practice creating functional components for a medication tracking app, applying JSX syntax, conditional rendering, and list rendering patterns.

## Duration
30 minutes

## Exercise Description

In this exercise, you'll implement a set of React components for a medication tracking application. You'll create several components with different responsibilities and make them work together.

### Requirements

You'll create the following components:

1. **MedicationHeader**: Displays a title and a small description
2. **MedicationItem**: Displays information about a single medication
3. **MedicationList**: Renders multiple MedicationItem components
4. **StatusBadge**: Shows the status of a medication (taken, pending, skipped)
5. **MedicationApp**: The root component that combines all others

### Sample Data

Use this sample data for your implementation:

```jsx
// Sample medication data
const medications = [
  { id: '1', name: 'Aspirin', dosage: '100mg', schedule: 'Daily', status: 'active' },
  { id: '2', name: 'Ibuprofen', dosage: '200mg', schedule: 'As needed', status: 'low' },
  { id: '3', name: 'Amoxicillin', dosage: '500mg', schedule: 'Twice daily', status: 'inactive' },
];
```

### Implementation Steps

#### 1. MedicationHeader Component

Create a component that:
- Accepts `title` and `description` props
- Renders the title in an h1 tag
- Renders the description in a paragraph tag

```jsx
function MedicationHeader({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

#### 2. StatusBadge Component

Create a component that:
- Accepts a `status` prop
- Renders different text/styling based on the status value
- Implements conditional rendering based on the status

```jsx
function StatusBadge({ status }) {
  // Your implementation here
  // Should render differently based on status (active, low, inactive)
}
```

#### 3. MedicationItem Component

Create a component that:
- Accepts a `medication` object as a prop
- Displays the medication name, dosage, and schedule
- Uses the StatusBadge component to display the status

```jsx
function MedicationItem({ medication }) {
  // Your implementation here
  // Should display medication details and use StatusBadge
}
```

#### 4. MedicationList Component

Create a component that:
- Accepts an array of `medications` as a prop
- Maps over the array to render a MedicationItem for each medication
- Adds proper keys to the list items
- Handles the empty list case

```jsx
function MedicationList({ medications }) {
  // Your implementation here
  // Should map over medications array and render MedicationItem components
}
```

#### 5. MedicationApp Component

Create a component that:
- Uses all the components above
- Passes the appropriate props to each component

```jsx
function MedicationApp() {
  // Your implementation here
  // Should combine all components and pass the sample data
}
```

### Bonus Challenges

1. Add the ability to filter medications by status
2. Implement a search input that filters medications by name
3. Add a form to add new medications to the list
4. Use React.Fragment where appropriate to avoid unnecessary wrapper divs

## Deliverables

1. Create a file with all 5 components implemented
2. Each component should handle its responsibilities correctly
3. Components should work together to display the medication data
4. Proper use of props, JSX, conditional rendering, and list rendering

## Evaluation Criteria

- Correct implementation of functional components
- Proper use of JSX syntax
- Effective use of conditional rendering patterns
- Correct implementation of list rendering with keys
- Appropriate component composition

## Tips

- Remember to follow React naming conventions (PascalCase for components)
- Use destructuring for props where appropriate
- Consider what should be conditional vs. what should always render
- Remember to include key props when rendering lists
- Consider which components should be presentational (receive props) vs. which might need state 