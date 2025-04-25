# Module 8: Asynchronous JavaScript

**Introduction**

JavaScript is fundamentally single-threaded, meaning it executes one operation at a time in sequence. However, many tasks in web and mobile development, such as fetching data from a server, reading files, or waiting for timers, take time. If JavaScript waited synchronously for these tasks, the entire application (especially the UI) would freeze. Asynchronous JavaScript allows these long-running operations to occur in the background without blocking the main execution thread, ensuring a responsive user experience.

This module covers the evolution of handling asynchronous operations in JavaScript, from traditional callbacks to the more modern and manageable Promises and `async/await` syntax, which are essential for tasks like network requests in React Native.

**Learning Objectives**

*   Understand the concept of synchronous vs. asynchronous execution.
*   Recognize the problems associated with callback-based asynchronous patterns ("Callback Hell").
*   Explain the purpose and states of JavaScript Promises (`pending`, `fulfilled`, `rejected`).
*   Consume Promises using `.then()` for success, `.catch()` for errors, and `.finally()` for cleanup.
*   Chain multiple asynchronous operations using `.then()`.
*   Write cleaner, more readable asynchronous code using `async` functions and the `await` operator.
*   Handle errors in `async/await` using `try...catch` blocks.
*   Understand how `Promise.all()` and `Promise.race()` handle multiple promises concurrently.
*   Apply asynchronous patterns for common React Native tasks like fetching data using the `fetch` API.

**Keywords**

*   Synchronous: Operations execute one after another, blocking subsequent code until completion.
*   Asynchronous: Operations initiate now but finish later, allowing other code to run in the meantime.
*   Non-blocking: Asynchronous operations do not block the main execution thread.
*   Callback Function: A function passed as an argument to another function, intended to be executed later (often upon completion of an async operation).
*   Callback Hell (Pyramid of Doom): Deeply nested callbacks, making code hard to read and maintain.
*   Promise: An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
*   Promise States: `pending` (initial state), `fulfilled` (operation completed successfully), `rejected` (operation failed).
*   `.then(onFulfilled, onRejected)`: Method to schedule callbacks for when a Promise settles (is fulfilled or rejected).
*   `.catch(onRejected)`: Shorthand for handling only rejected Promises.
*   `.finally(onFinally)`: Schedules a callback to run when the Promise settles, regardless of success or failure.
*   `async function`: A function declared with `async` that implicitly returns a Promise and allows the use of `await`.
*   `await`: An operator used inside `async function`s to pause execution until a Promise settles, then resumes with the resolved value (or throws the rejection reason).
*   `fetch` API: A modern browser/React Native API for making network requests (returns a Promise).
*   `Promise.all(iterable)`: Takes an iterable of Promises and returns a single Promise that resolves when all input Promises have resolved, or rejects if any input Promise rejects.
*   `Promise.race(iterable)`: Takes an iterable of Promises and returns a single Promise that resolves or rejects as soon as one of the input Promises resolves or rejects.

---

## The Problem: Blocking Operations

Imagine trying to fetch user data from a slow server synchronously:

```javascript
// Hypothetical synchronous fetch (doesn't actually exist like this in JS)
function fetchUserDataSync(userId) {
  // 1. Send request to server...
  // 2. WAIT (potentially seconds)... Application freezes here!
  // 3. Receive response...
  // 4. Return data
  console.log("Fetching user data...");
  // ...imagine a long delay here...
  console.log("Data received!");
  return { id: userId, name: "Alice" };
}

console.log("App started.");
const user = fetchUserDataSync(123); // Entire app would freeze during this call
console.log("User:", user);
console.log("App continues...");
```

This would lead to a terrible user experience. Asynchronous patterns solve this.

---

## Callbacks

The traditional way to handle async operations was using callback functions. The async function takes an extra argument: a function to call *back* when the operation completes.

**Example (Simulated):**

```javascript
function fetchDataWithCallback(url, callback) {
  console.log(`Fetching from ${url}...`);
  setTimeout(() => { // Simulate network delay
    const success = Math.random() > 0.3;
    if (success) {
      const data = { message: "Data from " + url };
      callback(null, data); // Call back with null error and the data
    } else {
      const error = new Error("Failed to fetch data");
      callback(error, null); // Call back with an error and null data
    }
  }, 1000);
}

console.log("Requesting data...");
fetchDataWithCallback("/api/users", (error, data) => {
  if (error) {
    console.error("Error fetching users:", error.message);
  } else {
    console.log("Users data:", data);
    // Problem: Nested callbacks for sequential operations
    fetchDataWithCallback("/api/posts", (error, data) => {
      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        console.log("Posts data:", data);
        // ... leads to Callback Hell / Pyramid of Doom
      }
    });
  }
});
console.log("Request initiated, continuing execution...");
```

**Problems with Callbacks:**

*   **Callback Hell:** Deep nesting makes code hard to read and debug.
*   **Error Handling:** Error handling logic can become repetitive and scattered.
*   **Control Flow:** Managing complex sequences or parallel operations is cumbersome.

---

## Promises (ES6+)

Promises provide a cleaner, more structured way to handle asynchronous operations. A Promise represents a future value.

**Creating a Promise (less common to create directly, usually consumed):**

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Perform asynchronous operation
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Operation successful!"); // Fulfill the promise
    } else {
      reject(new Error("Operation failed!")); // Reject the promise
    }
  }, 1000);
});
```

**Consuming a Promise:**

Uses the `.then()`, `.catch()`, and `.finally()` methods.

```javascript
console.log("Promise initiated...");

myPromise
  .then((successMessage) => {
    // Called when the Promise is fulfilled (resolved)
    console.log("Success:", successMessage);
    return "Processed: " + successMessage; // Value passed to the next .then()
  })
  .then((processedMessage) => {
    // Chaining: Called with the return value of the previous .then()
    console.log("Chained then:", processedMessage);
  })
  .catch((errorMessage) => {
    // Called if the Promise is rejected at any point in the chain
    console.error("Error:", errorMessage.message);
  })
  .finally(() => {
    // Called whether the Promise was fulfilled or rejected
    console.log("Promise settled (finally).");
  });

console.log("Promise handler attached, continuing execution...");
```

**Key Advantages of Promises over Callbacks:**

*   **Readability:** Avoids deep nesting; chaining `.then()` is much clearer.
*   **Error Handling:** Centralized error handling with `.catch()`.
*   **Composability:** Easier to manage sequences and parallel operations (`Promise.all`, `Promise.race`).

**Using `fetch` with Promises:**

The `fetch` API (used for network requests in browsers and React Native) returns a Promise.

```javascript
console.log("Fetching data using fetch...");

fetch('https://jsonplaceholder.typicode.com/posts/1') // Returns a Promise for the Response
  .then(response => {
    console.log("Received response object");
    if (!response.ok) { // Check for HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // .json() also returns a Promise for the parsed body
  })
  .then(data => {
    console.log("Parsed data:", data);
  })
  .catch(error => {
    console.error("Fetch error:", error.message);
  });

console.log("Fetch initiated...");
```

---

## `async`/`await` (ES2017+)

`async/await` is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code, which significantly improves readability.

*   **`async function`**: Declares a function that operates asynchronously. It always implicitly returns a Promise. The resolved value of the Promise is whatever the `async function` returns.
*   **`await`**: Can only be used *inside* an `async function`. It pauses the execution of the `async function` until the Promise it's waiting for settles (resolves or rejects).
    *   If the Promise resolves, `await` returns the resolved value.
    *   If the Promise rejects, `await` throws the rejected value (error), which can be caught using `try...catch`.

**Example (Rewriting fetch using async/await):**

```javascript
// Must be inside an async function to use await
async function fetchDataAsync() {
  console.log("Fetching data using async/await...");
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log("Received response object (await)");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // await pauses until response.json() promise resolves
    const data = await response.json();
    console.log("Parsed data (await):", data);
    return data; // This becomes the resolved value of the fetchDataAsync promise

  } catch (error) {
    console.error("Async/await fetch error:", error.message);
    // Handle the error appropriately, maybe return null or re-throw
    throw error; // Re-throw if the caller needs to know about the error
  }
}

// Calling the async function
async function main() {
    console.log("Calling async function...");
    try {
        const result = await fetchDataAsync();
        if (result) {
             console.log("Async function completed successfully with result:", result.title);
        }
    } catch(error) {
        console.error("Error caught in main:", error.message);
    }
    console.log("Async function call finished.");
}

main();
console.log("Async function invoked, continuing execution...");
```

**Key Advantages of `async/await`:**

*   **Readability:** Looks very much like synchronous code.
*   **Error Handling:** Uses standard `try...catch` blocks, which is familiar and cleaner than `.catch()` chains for complex logic.
*   **Debugging:** Easier to step through asynchronous code in debuggers.

---

## Handling Multiple Promises

### `Promise.all(iterable)`

Useful when you need multiple asynchronous operations to complete before proceeding. It rejects as soon as *any* of the input promises reject.

```javascript
async function fetchMultipleUrls() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  try {
    console.log("Fetching all URLs...");
    // Create an array of fetch promises
    const fetchPromises = urls.map(url => fetch(url).then(res => {
        if (!res.ok) throw new Error(`Failed: ${url}`);
        return res.json();
    }));

    // Wait for all promises to resolve
    const results = await Promise.all(fetchPromises);

    console.log("All fetches complete:");
    results.forEach((data, index) => {
      console.log(`Data ${index + 1}: ${data.title}`);
    });
    return results;

  } catch (error) {
    console.error("Error in Promise.all:", error.message);
  }
}

fetchMultipleUrls();
```

### `Promise.race(iterable)`

Useful when you want the result of the *first* promise to settle (either resolve or reject).

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve('One resolved'), 500));
const promise2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Two rejected')), 200));
const promise3 = new Promise(resolve => setTimeout(() => resolve('Three resolved'), 1000));

Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log("Promise.race resolved:", result);
  })
  .catch(error => {
    // This will be called because promise2 rejects first
    console.error("Promise.race rejected:", error.message);
  });
// Output: Promise.race rejected: Two rejected
```

---

## Asynchronous Operations in React Native

Fetching data from APIs is a primary use case for async operations in React Native.

**Example (Fetching data in a functional component with Hooks):**

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts (optional)
  // useEffect(() => {
  //   loadData();
  // }, []); // Empty dependency array means run once on mount

  return (
    <View style={styles.container}>
      <Button title="Fetch Data" onPress={loadData} disabled={loading} />
      {loading && <ActivityIndicator style={styles.indicator} size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      {data && (
        <View style={styles.dataContainer}>
          <Text>Data Loaded:</Text>
          <Text>User ID: {data.userId}</Text>
          <Text>Title: {data.title}</Text>
          <Text>Completed: {data.completed ? 'Yes' : 'No'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  indicator: { marginTop: 20 },
  errorText: { marginTop: 20, color: 'red' },
  dataContainer: { marginTop: 20, alignItems: 'flex-start' },
});

export default DataFetcher;

```

**Conclusion**

Asynchronous JavaScript is essential for building responsive applications. While callbacks were the original method, Promises offer better structure and error handling. `async/await` syntax provides the most readable and maintainable way to write asynchronous code that looks synchronous, making it the preferred approach for modern JavaScript and React Native development, especially when dealing with network requests or other I/O operations.

**Further Reading:**

*   MDN: [Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
*   MDN: [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
*   MDN: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
*   MDN: [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
*   MDN: [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
*   MDN: [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
*   MDN: [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
*   MDN: [`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
*   React Native Docs: [Networking](https://reactnative.dev/docs/network)

**Next:** [Module 9: Modules](./09-modules.md) 