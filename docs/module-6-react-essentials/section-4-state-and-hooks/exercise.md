# Exercise: Medication Tracker with State

## Objective
Build a medication tracker component with state management, applying useState and useReducer hooks, and implementing state management best practices.

## Duration
45-60 minutes

## Exercise Description

In this exercise, you'll implement a medication tracking application with state management. You'll build components that maintain and update state, allowing users to track their medications, mark them as taken, and filter the list.

### Requirements

You'll create the following components:

1. **MedicationTracker**: The main component that manages the medication list state
2. **MedicationForm**: A form component for adding new medications 
3. **MedicationItem**: A component to display a single medication with actions
4. **FilterControls**: A component to filter the medication list by status

### Implementation Steps

#### 1. Set Up Basic State Structure

First, determine what state you need to track:

```jsx
function MedicationTracker() {
  // State for the medication list
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      schedule: 'Daily',
      isActive: true,
      lastTaken: null
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      schedule: 'Twice daily',
      isActive: true,
      lastTaken: null
    },
    {
      id: '3',
      name: 'Vitamin D',
      dosage: '1000 IU',
      schedule: 'Daily',
      isActive: false,
      lastTaken: '2023-06-10T08:30:00'
    }
  ]);

  // State for the active filter
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'taken'
  
  // Rest of the component...
}
```

#### 2. Implement MedicationForm Component

Create a form component to add new medications:

```jsx
function MedicationForm({ onAddMedication }) {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    schedule: 'Daily'
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID
    const newMedication = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      lastTaken: null
    };
    
    onAddMedication(newMedication);
    
    // Reset form
    setFormData({
      name: '',
      dosage: '',
      schedule: 'Daily'
    });
  };

  // Form JSX - implement the form UI
  // For web:
  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, dosage, and schedule */}
      {/* Use handleChange to update formData */}
      {/* Add a submit button */}
    </form>
  );
  
  // For React Native:
  /*
  return (
    <View>
      <TextInput 
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Medication Name"
      />
      {/* Other TextInput fields for dosage, Picker for schedule */}
      <Button 
        title="Add Medication" 
        onPress={handleSubmit} 
      />
    </View>
  );
  */
}
```

#### 3. Implement MedicationItem Component

Create a component to display a single medication:

```jsx
function MedicationItem({ medication, onToggleStatus, onDelete }) {
  // Render the medication with actions to toggle status and delete
  // For web:
  return (
    <div className={`medication-item ${medication.isActive ? 'active' : 'inactive'}`}>
      <h3>{medication.name}</h3>
      <p>Dosage: {medication.dosage}</p>
      <p>Schedule: {medication.schedule}</p>
      <p>Status: {medication.isActive ? 'Active' : 'Inactive'}</p>
      
      {medication.isActive ? (
        <button onClick={() => onToggleStatus(medication.id)}>
          Mark as Taken
        </button>
      ) : (
        <button onClick={() => onToggleStatus(medication.id)}>
          Mark as Active
        </button>
      )}
      
      <button onClick={() => onDelete(medication.id)}>
        Delete
      </button>
    </div>
  );
  
  // For React Native: Similar implementation with View, Text, Button/TouchableOpacity
}
```

#### 4. Implement Filter Controls

Create filter controls to show active, taken, or all medications:

```jsx
function FilterControls({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-controls">
      <button 
        className={activeFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button 
        className={activeFilter === 'active' ? 'active' : ''}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button 
        className={activeFilter === 'taken' ? 'active' : ''}
        onClick={() => onFilterChange('taken')}
      >
        Taken
      </button>
    </div>
  );
  
  // For React Native: Similar implementation with View and TouchableOpacity
}
```

#### 5. Implement Main MedicationTracker Component

Combine all components and implement state management functions:

```jsx
function MedicationTracker() {
  // State as defined earlier
  // ...
  
  // Add a new medication
  const addMedication = (medication) => {
    setMedications([...medications, medication]);
  };
  
  // Toggle a medication's status
  const toggleMedicationStatus = (id) => {
    setMedications(medications.map(med => {
      if (med.id === id) {
        return {
          ...med,
          isActive: !med.isActive,
          lastTaken: !med.isActive ? null : new Date().toISOString()
        };
      }
      return med;
    }));
  };
  
  // Delete a medication
  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  // Get filtered medications
  const getFilteredMedications = () => {
    switch (filter) {
      case 'active':
        return medications.filter(med => med.isActive);
      case 'taken':
        return medications.filter(med => !med.isActive);
      default:
        return medications;
    }
  };
  
  const filteredMedications = getFilteredMedications();
  
  // Render the components
  return (
    <div className="medication-tracker">
      <h1>Medication Tracker</h1>
      
      <MedicationForm onAddMedication={addMedication} />
      
      <FilterControls 
        activeFilter={filter} 
        onFilterChange={setFilter} 
      />
      
      <div className="medication-list">
        {filteredMedications.length === 0 ? (
          <p>No medications found.</p>
        ) : (
          filteredMedications.map(medication => (
            <MedicationItem
              key={medication.id}
              medication={medication}
              onToggleStatus={toggleMedicationStatus}
              onDelete={deleteMedication}
            />
          ))
        )}
      </div>
    </div>
  );
  
  // For React Native: Similar implementation with View and other components
}
```

#### 6. Advanced Implementation with useReducer (Bonus)

For more complex state logic, refactor the component to use useReducer:

```jsx
// Define reducer
function medicationsReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEDICATION':
      return {
        ...state,
        medications: [...state.medications, action.payload]
      };
    case 'TOGGLE_STATUS':
      return {
        ...state,
        medications: state.medications.map(med => {
          if (med.id === action.payload) {
            return {
              ...med,
              isActive: !med.isActive,
              lastTaken: !med.isActive ? null : new Date().toISOString()
            };
          }
          return med;
        })
      };
    case 'DELETE_MEDICATION':
      return {
        ...state,
        medications: state.medications.filter(med => med.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// Use the reducer in the component
function MedicationTrackerWithReducer() {
  const [state, dispatch] = useReducer(medicationsReducer, {
    medications: [
      // Initial medications as before
    ],
    filter: 'all'
  });
  
  const { medications, filter } = state;
  
  // Get filtered medications
  const getFilteredMedications = () => {
    // Same implementation as before
  };
  
  const filteredMedications = getFilteredMedications();
  
  // Render the components
  return (
    <div className="medication-tracker">
      <h1>Medication Tracker (with useReducer)</h1>
      
      <MedicationForm 
        onAddMedication={(medication) => 
          dispatch({ type: 'ADD_MEDICATION', payload: medication })
        } 
      />
      
      <FilterControls 
        activeFilter={filter} 
        onFilterChange={(newFilter) =>
          dispatch({ type: 'SET_FILTER', payload: newFilter })
        } 
      />
      
      <div className="medication-list">
        {filteredMedications.length === 0 ? (
          <p>No medications found.</p>
        ) : (
          filteredMedications.map(medication => (
            <MedicationItem
              key={medication.id}
              medication={medication}
              onToggleStatus={(id) =>
                dispatch({ type: 'TOGGLE_STATUS', payload: id })
              }
              onDelete={(id) =>
                dispatch({ type: 'DELETE_MEDICATION', payload: id })
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
```

### Bonus Challenges

1. **Persistence**: Use localStorage (web) or AsyncStorage (React Native) to persist the medications state
2. **Form Validation**: Add validation to the medication form using state to track errors
3. **Undo Feature**: Implement an undo feature that lets users revert their last action
4. **Custom Hooks**: Extract state logic into custom hooks (e.g., useMedications, useFilter)

## Deliverables

1. Functional medication tracker application with state management
2. Components that demonstrate proper state usage and updates
3. Filtering functionality to show different medication sets
4. Ability to add, mark as taken/active, and delete medications

## Evaluation Criteria

- Correct implementation of useState/useReducer hooks
- Proper state updates (no direct mutations)
- Effective lifting of state to appropriate components
- Good state organization and management
- Implementation of derived state where appropriate
- Performance considerations (avoiding unnecessary re-renders)

## Tips

- Keep components focused on a single responsibility
- Lift state up to the lowest common parent when multiple components need the same data
- Use functional updates when new state depends on previous state
- Consider which state should be local vs. lifted
- Extract complex state logic into reducer functions
- Remember that state updates are asynchronous 