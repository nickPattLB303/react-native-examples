# Handling Asynchronicity: Promises and async/await

Mobile applications frequently perform operations that don't complete immediately. Fetching data from a network, reading from device storage, accessing hardware sensors, or even simple timers are inherently asynchronous. JavaScript needs mechanisms to manage these operations without blocking the main execution thread, ensuring the UI remains responsive.

## The Challenge of Asynchronous Code

In synchronous code, operations happen one after another in a predictable sequence:

```javascript
const name = getUserName(); // Get the user's name
console.log(`Hello, ${name}!`); // Use the name immediately
processUserData(); // Continue with other operations
```

However, many operations in mobile development take time to complete:

- Network requests (API calls)
- File system operations
- Camera or location access
- Animations and timers

If these operations were performed synchronously, they would freeze the UI until completion, creating a poor user experience.

## Evolution of Asynchronous Patterns in JavaScript

### 1. Callbacks

The original pattern for handling asynchronous operations in JavaScript was callbacks - functions passed as arguments to be executed when an operation completes:

```javascript
// Using callbacks
function fetchUserData(userId, callback) {
  // Simulate network request
  setTimeout(() => {
    const user = { id: userId, name: 'John Doe' };
    callback(null, user); // null means no error
  }, 1000);
}

fetchUserData(123, (error, user) => {
  if (error) {
    console.error('Error fetching user:', error);
    return;
  }
  console.log('User data:', user);
});
```

**Problems with callbacks:**

- **Callback Hell**: Nested callbacks for sequential async operations become difficult to read and maintain
- **Error Handling**: Error propagation is manual and inconsistent
- **Inversion of Control**: You hand control of your program flow to another function

```javascript
// Callback hell example
fetchUserData(123, (error, user) => {
  if (error) {
    console.error('Error fetching user:', error);
    return;
  }
  
  fetchUserPosts(user.id, (error, posts) => {
    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }
    
    fetchPostComments(posts[0].id, (error, comments) => {
      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }
      
      // Finally we can do something with the data
      console.log('User:', user);
      console.log('First post:', posts[0]);
      console.log('Comments:', comments);
    });
  });
});
```

### 2. Promises

Promises were introduced to provide a cleaner way to handle asynchronous operations. A Promise is an object representing the eventual result (or failure) of an asynchronous operation.

A Promise exists in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

```javascript
// Creating a Promise
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulate network request
    setTimeout(() => {
      if (userId > 0) {
        const user = { id: userId, name: 'John Doe' };
        resolve(user); // Success
      } else {
        reject(new Error('Invalid user ID')); // Failure
      }
    }, 1000);
  });
}

// Using a Promise
fetchUserData(123)
  .then(user => {
    console.log('User data:', user);
    return fetchUserPosts(user.id); // Return another Promise
  })
  .then(posts => {
    console.log('User posts:', posts);
    return fetchPostComments(posts[0].id); // Return another Promise
  })
  .then(comments => {
    console.log('Post comments:', comments);
  })
  .catch(error => {
    console.error('Error in Promise chain:', error);
  })
  .finally(() => {
    console.log('Promise chain completed, regardless of outcome');
  });
```

**Key Promise Methods:**

- **`.then(onFulfilled, onRejected)`**: Schedules callbacks to be called when the Promise is settled. The `onFulfilled` function receives the resolved value, and `onRejected` receives the reason (error) if it's rejected.

- **`.catch(onRejected)`**: Shorthand for `.then(null, onRejected)`, specifically for handling errors (rejected Promises).

- **`.finally(onFinally)`**: Schedules a callback to be called when the Promise is settled (either fulfilled or rejected). Useful for cleanup operations.

**Promise Combinators:**

- **`Promise.all(iterable)`**: Takes an array of Promises and returns a new Promise that fulfills with an array of the fulfillment values when all Promises in the array fulfill, or rejects with the reason of the first Promise that rejects.

```javascript
// Wait for multiple Promises to complete
Promise.all([
  fetchUserData(123),
  fetchUserPosts(123),
  fetchUserSettings(123)
])
  .then(([user, posts, settings]) => {
    console.log('All data loaded:', user, posts, settings);
  })
  .catch(error => {
    console.error('At least one request failed:', error);
  });
```

- **`Promise.race(iterable)`**: Returns a Promise that fulfills or rejects as soon as one of the Promises in the iterable fulfills or rejects.

```javascript
// Set a timeout for a fetch operation
const fetchWithTimeout = (url, timeout = 5000) => {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
};
```

- **`Promise.allSettled(iterable)`**: Returns a Promise that fulfills with an array of objects describing the outcome of each Promise, regardless of whether they fulfilled or rejected.

```javascript
// Get the result of multiple operations, even if some fail
Promise.allSettled([
  fetchUserData(123),  // Might succeed
  fetchUserData(-1)    // Will fail with invalid ID
])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Fulfilled:', result.value);
      } else {
        console.log('Rejected:', result.reason);
      }
    });
  });
```

- **`Promise.any(iterable)`**: Returns a Promise that fulfills as soon as one of the Promises in the iterable fulfills. If all Promises reject, it rejects with an AggregateError.

```javascript
// Try multiple API endpoints, use the first one that succeeds
Promise.any([
  fetch('https://api1.example.com/data'),
  fetch('https://api2.example.com/data'),
  fetch('https://api3.example.com/data')
])
  .then(response => response.json())
  .then(data => console.log('Data from first successful API:', data))
  .catch(error => console.error('All APIs failed:', error));
```

### 3. Async/Await

While Promises improved asynchronous handling, complex operations could still result in lengthy `.then()` chains. The `async` and `await` keywords, introduced in ES2017, provide syntactic sugar built on top of Promises, making asynchronous code look and feel more like synchronous code.

```javascript
// Using async/await
async function loadUserData(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('User data:', user);
    
    const posts = await fetchUserPosts(user.id);
    console.log('User posts:', posts);
    
    const comments = await fetchPostComments(posts[0].id);
    console.log('Post comments:', comments);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error loading user data:', error);
    throw error; // Re-throw to allow calling code to handle it
  } finally {
    console.log('Data loading completed or failed');
  }
}

// Calling the async function
loadUserData(123)
  .then(data => console.log('All data:', data))
  .catch(error => console.error('Error in loadUserData:', error));
```

**Key Concepts:**

- **`async` Keyword**: When placed before a function declaration (`async function myFunction() {...}`), it signifies that the function will always return a Promise. If the function explicitly returns a value, that value becomes the resolved value of the Promise. If it throws an error, the Promise is rejected with that error.

- **`await` Keyword**: This keyword can only be used inside an `async` function. When `await` is placed before an expression (typically a Promise), it pauses the execution of the `async` function until that Promise settles.
  - If the Promise is fulfilled, `await` returns the fulfilled value.
  - If the Promise is rejected, `await` throws the rejection reason (error).

**Benefits of async/await:**

1. **Readability**: Code looks more like synchronous code, making it easier to understand the flow.
2. **Error Handling**: You can use standard `try/catch` blocks for error handling.
3. **Debugging**: Easier to debug with clear stack traces and the ability to set breakpoints.
4. **Sequential Execution**: Makes sequential async operations more intuitive.

## Practical Examples in React Native

### Fetching Data from an API

```typescript
// Using async/await with TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error; // Re-throw to allow calling code to handle it
  }
}

// Usage in a React component
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!user) return <Text>No user found</Text>;

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};
```

### Parallel vs Sequential Execution

Sometimes you need to run multiple asynchronous operations in parallel rather than sequentially:

```typescript
// Sequential execution (each waits for the previous)
async function loadDataSequentially() {
  const start = Date.now();
  
  const users = await fetchUsers();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  
  console.log(`Sequential loading took ${Date.now() - start}ms`);
  return { users, posts, comments };
}

// Parallel execution (all start at the same time)
async function loadDataInParallel() {
  const start = Date.now();
  
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  
  console.log(`Parallel loading took ${Date.now() - start}ms`);
  return { users, posts, comments };
}
```

### Working with Device APIs

Many React Native and Expo APIs return Promises:

```typescript
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

async function getUserLocationAndPhoto() {
  try {
    // Request permissions (these return Promises)
    const locationPermission = await Location.requestForegroundPermissionsAsync();
    if (!locationPermission.granted) {
      throw new Error('Location permission not granted');
    }
    
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      throw new Error('Camera permission not granted');
    }
    
    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    
    // Take a photo
    const photoResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (photoResult.canceled) {
      throw new Error('User cancelled photo capture');
    }
    
    return {
      location: location.coords,
      photo: photoResult.assets[0]
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Best Practices

1. **Always handle errors**: Use try/catch with async/await or .catch() with Promises.

2. **Avoid mixing Promise chains and async/await**: Choose one style for consistency.

3. **Remember that await only pauses the current function**: It doesn't block the entire application.

4. **Use Promise.all for concurrent operations**: When operations don't depend on each other.

5. **Be careful with loops**: 
   ```javascript
   // This runs sequentially (often desired for controlled execution)
   for (const item of items) {
     await processItem(item);
   }
   
   // This runs all promises in parallel (better performance but less control)
   const promises = items.map(item => processItem(item));
   const results = await Promise.all(promises);
   ```

6. **Consider using libraries** like axios for HTTP requests, which provide better error handling and request cancellation.

7. **Implement timeouts** for operations that might hang:
   ```javascript
   const fetchWithTimeout = async (url, ms = 5000) => {
     const controller = new AbortController();
     const timeoutId = setTimeout(() => controller.abort(), ms);
     
     try {
       const response = await fetch(url, { signal: controller.signal });
       clearTimeout(timeoutId);
       return response;
     } catch (error) {
       clearTimeout(timeoutId);
       if (error.name === 'AbortError') {
         throw new Error('Request timed out');
       }
       throw error;
     }
   };
   ```

## Resources for Further Learning

- [MDN Web Docs - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs - Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [JavaScript.info - Promises, async/await](https://javascript.info/async)
- [React Native Networking Guide](https://reactnative.dev/docs/network)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [TanStack Query (React Query)](https://tanstack.com/query/latest) - A library for managing async data in React

## Summary

Asynchronous operations are fundamental to nearly all non-trivial mobile applications. Whether fetching user data, saving preferences, getting GPS coordinates, or responding to timers, developers constantly deal with tasks that don't complete instantly.

Promises provide the underlying structure for handling asynchronous operations, but async/await offers the most readable and manageable syntax. Proficiency with async/await is therefore indispensable for building functional and responsive React Native applications.

Remember that while async/await makes asynchronous code look synchronous, it's still asynchronous under the hood. The function pauses execution at await points, but the JavaScript event loop continues running, allowing the UI to remain responsive.