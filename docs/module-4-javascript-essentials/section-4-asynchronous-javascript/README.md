# Section 4: Asynchronous JavaScript

## Learning Objectives
After completing this section, you will be able to:
- Understand the asynchronous nature of JavaScript
- Work with callbacks, promises, and async/await
- Handle errors in asynchronous code
- Implement common asynchronous patterns in React Native
- Fetch and process data from APIs
- Manage multiple asynchronous operations

**Estimated Time**: 45-60 minutes

## Introduction to Asynchronous JavaScript

JavaScript is single-threaded, meaning it can only execute one operation at a time. However, many operations in React Native development (like network requests, file operations, and animations) take time to complete. Asynchronous programming allows JavaScript to handle these operations without blocking the main thread.

### Synchronous vs. Asynchronous Code

```javascript
// Synchronous code executes in sequence
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third

// Asynchronous code doesn't block execution
console.log("First");
setTimeout(() => {
  console.log("Second - after delay");
}, 1000);
console.log("Third");
// Output: First, Third, Second - after delay
```

> 💡 **React Native Tip**: Understanding asynchronous JavaScript is crucial for React Native development, as many operations like API calls, animations, and storage operations are asynchronous.

## Callbacks

Callbacks are functions passed as arguments to other functions, to be executed after an operation completes.

### Basic Callback Pattern

```javascript
function fetchMedication(id, callback) {
  // Simulate API request with setTimeout
  setTimeout(() => {
    const medication = {
      id: id,
      name: "Aspirin",
      dosage: "81mg"
    };
    callback(medication);
  }, 1000);
}

// Using the callback
fetchMedication(123, (medication) => {
  console.log(`Fetched ${medication.name}`);
  // Do something with the medication data
});

console.log("Fetching medication...");
// Output:
// "Fetching medication..."
// (after 1 second) "Fetched Aspirin"
```

### Callback Hell

When multiple asynchronous operations depend on each other, callbacks can lead to deeply nested code known as "callback hell":

```javascript
fetchPatient(patientId, (patient) => {
  fetchMedications(patient.id, (medications) => {
    fetchPharmacy(medications[0].pharmacyId, (pharmacy) => {
      fetchPharmacist(pharmacy.id, (pharmacist) => {
        // Deep nesting makes code hard to read and maintain
        console.log(`Contact ${pharmacist.name} at ${pharmacy.name} about ${medications[0].name} for ${patient.name}`);
      });
    });
  });
});
```

> ⚠️ **Warning**: Callback hell makes code difficult to read, debug, and maintain. Modern JavaScript provides better alternatives like Promises and async/await.

## Promises

Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Promise Basics

```javascript
// Creating a promise
function fetchMedicationPromise(id) {
  return new Promise((resolve, reject) => {
    // Simulate API request
    setTimeout(() => {
      if (id > 0) {
        const medication = {
          id: id,
          name: "Aspirin",
          dosage: "81mg"
        };
        resolve(medication); // Success
      } else {
        reject(new Error("Invalid medication ID")); // Failure
      }
    }, 1000);
  });
}

// Using a promise
fetchMedicationPromise(123)
  .then(medication => {
    console.log(`Fetched ${medication.name}`);
    return medication; // Return for chaining
  })
  .then(medication => {
    console.log(`Dosage: ${medication.dosage}`);
  })
  .catch(error => {
    console.error("Error fetching medication:", error);
  })
  .finally(() => {
    console.log("Fetch operation completed");
  });

console.log("Fetching medication...");
```

### Promise States

A Promise can be in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

### Promise Chaining

Promises can be chained to handle sequences of asynchronous operations:

```javascript
// Refactoring the callback hell example with promises
fetchPatientPromise(patientId)
  .then(patient => {
    console.log(`Patient: ${patient.name}`);
    return fetchMedicationsPromise(patient.id);
  })
  .then(medications => {
    console.log(`Medications: ${medications.length}`);
    return fetchPharmacyPromise(medications[0].pharmacyId);
  })
  .then(pharmacy => {
    console.log(`Pharmacy: ${pharmacy.name}`);
    return fetchPharmacistPromise(pharmacy.id);
  })
  .then(pharmacist => {
    console.log(`Pharmacist: ${pharmacist.name}`);
  })
  .catch(error => {
    console.error("Error in promise chain:", error);
  });
```

### Promise.all

For handling multiple promises that can run concurrently:

```javascript
// Fetch multiple medications in parallel
const medicationPromises = [
  fetchMedicationPromise(1),
  fetchMedicationPromise(2),
  fetchMedicationPromise(3)
];

Promise.all(medicationPromises)
  .then(medications => {
    console.log(`Fetched ${medications.length} medications`);
    medications.forEach(med => {
      console.log(`- ${med.name}: ${med.dosage}`);
    });
  })
  .catch(error => {
    // If any promise rejects, the catch handler is called
    console.error("Error fetching medications:", error);
  });
```

### Other Promise Methods

```javascript
// Promise.race - resolves or rejects as soon as one promise resolves/rejects
Promise.race([
  fetchMedicationPromise(1),
  fetchMedicationPromise(2)
])
  .then(firstMedication => {
    console.log(`First result: ${firstMedication.name}`);
  });

// Promise.allSettled - waits for all promises to settle (resolve or reject)
Promise.allSettled([
  fetchMedicationPromise(1),
  fetchMedicationPromise(-1) // Will reject
])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(`Success: ${result.value.name}`);
      } else {
        console.log(`Failed: ${result.reason}`);
      }
    });
  });

// Promise.any - resolves if any promise resolves, rejects if all reject
Promise.any([
  fetchMedicationPromise(-1), // Will reject
  fetchMedicationPromise(2)
])
  .then(medication => {
    console.log(`At least one succeeded: ${medication.name}`);
  })
  .catch(error => {
    console.error("All promises failed");
  });
```

## Async/Await

Async/await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code.

### Basic Syntax

```javascript
// Async function declaration
async function fetchMedicationData(id) {
  try {
    // Await pauses execution until the promise resolves
    const medication = await fetchMedicationPromise(id);
    console.log(`Fetched ${medication.name}`);
    return medication;
  } catch (error) {
    console.error("Error fetching medication:", error);
    throw error; // Re-throw or handle the error
  }
}

// Using an async function
fetchMedicationData(123)
  .then(medication => {
    console.log(`Dosage: ${medication.dosage}`);
  })
  .catch(error => {
    console.error("Error in async function:", error);
  });

// Async arrow function
const fetchPatientData = async (id) => {
  // Implementation
};
```

### Sequential vs. Parallel Execution

```javascript
// Sequential execution (each await waits for the previous to complete)
async function fetchSequential() {
  console.time("sequential");
  
  const medication1 = await fetchMedicationPromise(1);
  const medication2 = await fetchMedicationPromise(2);
  const medication3 = await fetchMedicationPromise(3);
  
  console.timeEnd("sequential"); // ~3000ms (1s + 1s + 1s)
  return [medication1, medication2, medication3];
}

// Parallel execution (start all promises before awaiting)
async function fetchParallel() {
  console.time("parallel");
  
  const promise1 = fetchMedicationPromise(1);
  const promise2 = fetchMedicationPromise(2);
  const promise3 = fetchMedicationPromise(3);
  
  const medication1 = await promise1;
  const medication2 = await promise2;
  const medication3 = await promise3;
  
  console.timeEnd("parallel"); // ~1000ms (all run concurrently)
  return [medication1, medication2, medication3];
}

// Using Promise.all with async/await
async function fetchParallelWithPromiseAll() {
  console.time("promise.all");
  
  const medications = await Promise.all([
    fetchMedicationPromise(1),
    fetchMedicationPromise(2),
    fetchMedicationPromise(3)
  ]);
  
  console.timeEnd("promise.all"); // ~1000ms
  return medications;
}
```

### Error Handling with Async/Await

```javascript
// Using try/catch
async function fetchWithErrorHandling() {
  try {
    const patient = await fetchPatientPromise(123);
    const medications = await fetchMedicationsPromise(patient.id);
    
    if (medications.length === 0) {
      throw new Error("No medications found");
    }
    
    return medications;
  } catch (error) {
    console.error("Error in medication fetch:", error);
    // Handle error or re-throw
    throw error;
  } finally {
    console.log("Fetch operation completed");
  }
}

// Alternative pattern for multiple operations
async function fetchMultipleWithErrorHandling() {
  try {
    // Patient fetch
    const patient = await fetchPatientPromise(123);
    
    // Medication fetch - with its own error handling
    let medications = [];
    try {
      medications = await fetchMedicationsPromise(patient.id);
    } catch (medError) {
      console.warn("Could not fetch medications:", medError);
      // Continue with empty medications array
    }
    
    // Pharmacy fetch - only if we have medications
    let pharmacy = null;
    if (medications.length > 0) {
      try {
        pharmacy = await fetchPharmacyPromise(medications[0].pharmacyId);
      } catch (pharmError) {
        console.warn("Could not fetch pharmacy:", pharmError);
      }
    }
    
    return { patient, medications, pharmacy };
  } catch (error) {
    console.error("Critical error:", error);
    throw error;
  }
}
```

## Fetch API and HTTP Requests

The Fetch API is commonly used in React Native for making HTTP requests.

### Basic Fetch Request

```javascript
// GET request
fetch('https://api.example.com/medications')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    console.log('Medications:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// Using async/await with fetch
async function fetchMedications() {
  try {
    const response = await fetch('https://api.example.com/medications');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### POST Request with Fetch

```javascript
async function createMedication(medicationData) {
  try {
    const response = await fetch('https://api.example.com/medications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
      },
      body: JSON.stringify(medicationData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating medication:', error);
    throw error;
  }
}

// Usage
createMedication({
  name: 'Ibuprofen',
  dosage: '200mg',
  frequency: 'every 6 hours'
})
  .then(newMedication => {
    console.log('Created:', newMedication);
  })
  .catch(error => {
    console.error('Creation failed:', error);
  });
```

## Asynchronous Patterns in React Native

### Component Data Fetching

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define async function inside useEffect
    async function loadMedications() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/medications');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setMedications(data);
        setError(null);
      } catch (err) {
        setError('Failed to load medications: ' + err.message);
        setMedications([]);
      } finally {
        setLoading(false);
      }
    }

    loadMedications();
    
    // Optional cleanup function
    return () => {
      // Cancel any pending requests if component unmounts
      // (requires additional implementation with AbortController)
    };
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <FlatList
      data={medications}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Text>{item.name} - {item.dosage}</Text>
      )}
    />
  );
}
```

### Handling Race Conditions

When multiple asynchronous operations are in flight, you need to ensure that responses are handled in the correct order:

```javascript
function MedicationDetail({ medicationId }) {
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    async function fetchData() {
      setLoading(true);
      
      try {
        const data = await fetchMedicationPromise(medicationId);
        
        // Only update state if component is still mounted
        // and this is the latest request
        if (isMounted) {
          setMedication(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Fetch error:', error);
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    // Cleanup function to run when component unmounts
    // or when medicationId changes
    return () => {
      isMounted = false;
    };
  }, [medicationId]); // Re-run when medicationId changes
  
  // Component rendering logic
}
```

### Debouncing API Calls

For search inputs or other frequently changing values, debouncing prevents excessive API calls:

```javascript
import { useState, useEffect } from 'react';

// Custom hook for debounced API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in a component
function MedicationSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Only perform search when debouncedSearchTerm changes
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      
      fetch(`https://api.example.com/medications?search=${debouncedSearchTerm}`)
        .then(response => response.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Search error:', error);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
  
  // Component rendering logic
}
```

## Error Handling Strategies

### Global Error Handling

```javascript
// Set up global error handler for unhandled promise rejections
if (typeof process !== 'undefined') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Log to monitoring service
  });
}

// For React Native, you can use the ErrorUtils global
if (global.ErrorUtils) {
  const originalGlobalHandler = global.ErrorUtils.getGlobalHandler();
  
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    // Log to monitoring service
    console.error('Global error:', error);
    
    // Call original handler
    originalGlobalHandler(error, isFatal);
  });
}
```

### Retry Pattern

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed:`, error);
      lastError = error;
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError}`);
}

// Usage
fetchWithRetry('https://api.example.com/medications')
  .then(data => console.log('Data:', data))
  .catch(error => console.error('All retries failed:', error));
```

### Timeout Pattern

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
}

// Usage
fetchWithTimeout('https://api.example.com/medications', {}, 3000)
  .then(response => response.json())
  .then(data => console.log('Data:', data))
  .catch(error => {
    if (error.message === 'Request timed out') {
      console.error('The request took too long to complete');
    } else {
      console.error('Fetch error:', error);
    }
  });
```

## Exercises

### Exercise 1: Promise Chain
Create a series of functions that simulate:
1. Fetching a patient record
2. Using the patient ID to fetch their medications
3. Using the medication data to calculate a daily schedule
4. Handle errors appropriately at each step

### Exercise 2: Async/Await Refactoring
Take the following callback-based code and refactor it using async/await:

```javascript
function getMedicationSchedule(patientId, callback) {
  fetchPatient(patientId, (error, patient) => {
    if (error) {
      callback(error);
      return;
    }
    
    fetchMedications(patient.id, (error, medications) => {
      if (error) {
        callback(error);
        return;
      }
      
      generateSchedule(medications, (error, schedule) => {
        if (error) {
          callback(error);
          return;
        }
        
        callback(null, schedule);
      });
    });
  });
}
```

### Exercise 3: API Integration
Create a React Native component that:
1. Fetches medication data from an API
2. Displays a loading state while fetching
3. Handles and displays errors appropriately
4. Renders the medication data in a list
5. Implements a refresh mechanism

## Key Takeaways

- Asynchronous JavaScript is essential for handling time-consuming operations without blocking the main thread
- Callbacks were the original way to handle asynchronous code but can lead to callback hell
- Promises provide a more structured approach to asynchronous programming with better error handling
- Async/await offers the most readable syntax for working with asynchronous code
- Error handling is critical in asynchronous code and should be implemented at appropriate levels
- React Native applications heavily rely on asynchronous operations for data fetching, storage, and user interactions
- Understanding parallel vs. sequential execution helps optimize performance in React Native apps 