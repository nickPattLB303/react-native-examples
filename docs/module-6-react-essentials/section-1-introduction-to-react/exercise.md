# Exercise: Component Breakdown

## Objective
Apply your understanding of React's component-based architecture by identifying and planning components for a medication tracking interface.

## Duration
15-20 minutes

## Exercise Description

In this exercise, you'll analyze a mock-up of a medication tracking interface and identify potential React components. This exercise will help you practice thinking in terms of components, which is fundamental to React development.

### Mock-up

Below is a mockup of a medication tracking interface:

```
+-------------------------------------------------------+
| MEDICATION TRACKER                     [Profile Icon] |
+-------------------------------------------------------+
| [Search Bar                         ]  [Filter Button]|
+-------------------------------------------------------+
| ACTIVE MEDICATIONS (3)                                |
+-------------------------------------------------------+
| +---------------------------------------------------+ |
| | Lisinopril                                [TAKEN] | |
| | 10mg - Once daily                                 | |
| | Next dose: Today at 8:00 PM                       | |
| +---------------------------------------------------+ |
|                                                       |
| +---------------------------------------------------+ |
| | Metformin                              [PENDING]  | |
| | 500mg - Twice daily                               | |
| | Next dose: Today at 12:00 PM                      | |
| +---------------------------------------------------+ |
|                                                       |
| +---------------------------------------------------+ |
| | Atorvastatin                           [SKIPPED]  | |
| | 20mg - Once daily                                 | |
| | Next dose: Tomorrow at 8:00 AM                    | |
| +---------------------------------------------------+ |
+-------------------------------------------------------+
| UPCOMING MEDICATIONS (2)                              |
+-------------------------------------------------------+
| +---------------------------------------------------+ |
| | Aspirin                                           | |
| | 81mg - Once daily                                 | |
| | Next dose: Today at 9:00 PM                       | |
| +---------------------------------------------------+ |
|                                                       |
| +---------------------------------------------------+ |
| | Vitamin D                                         | |
| | 1000 IU - Once daily                              | |
| | Next dose: Tomorrow at 8:00 AM                    | |
| +---------------------------------------------------+ |
+-------------------------------------------------------+
|                [+ ADD MEDICATION]                     |
+-------------------------------------------------------+
| [Home] [Medications] [Calendar] [Settings]            |
+-------------------------------------------------------+
```

### Tasks

1. **Identify Components**:
   - Identify at least 5 potential React components in this UI
   - For each component, describe its purpose and responsibility
   - Note which components might be reused in different parts of the app

2. **Component Hierarchy**:
   - Draw or sketch a component hierarchy showing parent-child relationships
   - Determine which components might contain state
   - Determine which components would receive props

3. **Props Planning**:
   - For each component you identified, list the props it might need
   - Consider which props would be required vs. optional
   - Think about prop types (strings, numbers, functions, etc.)

4. **Reusability Analysis**:
   - Identify which components could be made generic for reuse
   - Describe how you would parameterize these components with props

## Deliverables

Create a document with:

1. List of components with descriptions
2. Component hierarchy diagram (can be text-based or a simple sketch)
3. Props list for each component
4. Notes on component reusability

## Example Partial Solution

Here's a partial solution to get you started:

### Identified Components:

1. **AppHeader**
   - Purpose: Displays the app title and profile icon
   - Reusable: Yes, could be used on multiple screens

2. **SearchBar**
   - Purpose: Allows user to search for medications
   - Reusable: Yes, could be used in other search contexts

3. **MedicationItem**
   - Purpose: Displays a single medication with its details
   - Reusable: Yes, used multiple times in the list

(Continue this analysis for the rest of the components you identify)

## Tips

- Think in terms of single responsibility - each component should do one thing well
- Consider which parts of the UI repeat and could be abstracted into reusable components
- Think about which components might need to maintain state (like whether a medication is taken)
- Consider separation of concerns - presentational vs. container components 