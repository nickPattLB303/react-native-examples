# Module 3: Essential Web, JavaScript, and TypeScript Foundations

## 3.3 Handling Asynchronicity: Promises and async/await

Concept: Mobile applications frequently perform operations that don't complete immediately. Fetching data from a network, reading from device storage, accessing hardware sensors, or even simple timers are inherently asynchronous. JavaScript needs mechanisms to manage these operations without blocking the main execution thread, ensuring the UI remains responsive.

Promises: Promises were introduced to provide a cleaner way to handle asynchronous operations compared to older callback-based patterns (which could lead to "callback hell"). A Promise is an object representing the eventual result (or failure) of an asynchronous operation. It exists in one of three states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed).

-   .then(onFulfilled, onRejected): This method is used to schedule callbacks that execute when the Promise settles. The onFulfilled function receives the resolved value if the Promise is fulfilled, and onRejected receives the reason (error) if it's rejected.
-   .catch(onRejected): This is shorthand for .then(null, onRejected), specifically for handling errors (rejected Promises).

async/await: While Promises improved asynchronous handling, complex operations could still result in lengthy .then() chains. The async and await keywords, introduced in ES2017, provide syntactic sugar built on top of Promises, making asynchronous code look and feel more like synchronous code.96

-   async Keyword: When placed before a function declaration (async function myFunction() {...}), it signifies that the function will always return a Promise.96 If the function explicitly returns a value, that value becomes the resolved value of the Promise. If it throws an error, the Promise is rejected with that error.
-   await Keyword: This keyword can only be used inside an async function.96 When await is placed before an expression (typically a Promise), it pauses the execution of the async function until that Promise settles.96
-   If the Promise is fulfilled, await returns the fulfilled value.97
-   If the Promise is rejected, await throws the rejection reason (error).97
-   Benefits: async/await significantly improves the readability and maintainability of asynchronous code.96 It allows developers to write asynchronous logic in a sequential style, avoiding nested callbacks or complex Promise chains. Error handling can often be done using standard try...catch blocks around await expressions.96

TypeScript

// Example using async/await to fetch data
async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url); // Pauses until fetch promise resolves
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Pauses until json() promise resolves
    return data; // Resolved value of the promise returned by fetchData
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Re-throws error to reject the promise returned by fetchData
  }
}

// Usage
fetchData('https://api.example.com/data')
.then(data => {
    console.log('Data received:', data);
  })
.catch(error => {
    console.error('Error in fetchData usage:', error);
  });

Asynchronous operations are fundamental to nearly all non-trivial mobile applications. Whether fetching user data, saving preferences, getting GPS coordinates, or responding to timers, developers constantly deal with tasks that don't complete instantly. Promises provide the underlying structure, but async/await offers the most readable and manageable syntax for handling these common scenarios. Proficiency with async/await is therefore indispensable for building functional and responsive React Native applications.

#### Works cited

96. async function - JavaScript - MDN Web Docs - Mozilla, accessed April 24, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function>
97. await - JavaScript - MDN Web Docs - Mozilla, accessed April 24, 2025, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await>