---
marp: true
theme: custom-theme
paginate: true
header: 'Module 04: JavaScript Essentials - Lesson 06: Asynchronous JavaScript'
footer: 'React Native Training'
---
<!-- Presenter notes for Title slide -->
<!-- Introduce async operations: tasks that take time (network requests, timers, file I/O). Explain JS's single-threaded nature and the need for non-blocking code using the event loop. -->

<!-- _class: lead -->
# Lesson 06: Asynchronous JavaScript

Handling operations that take time without blocking the main thread.

---
<!-- Presenter notes for Learning Objectives slide -->
<!-- Review objectives. Focus on Promises and async/await as the key takeaways. -->

## Learning Objectives

By the end of this lesson, you will be able to:

-   Understand the concept of asynchronous operations in JavaScript.
-   Recognize the limitations of traditional callbacks (Callback Hell).
-   Use Promises (`.then()`, `.catch()`, `.finally()`) to handle asynchronous results and errors.
-   Write cleaner asynchronous code using `async` functions and the `await` keyword.
-   Handle errors in `async`/`await` using `try...catch` blocks.
-   Use `Promise.all()` to run multiple promises concurrently.

---
<!-- Presenter notes for Introduction slide -->
<!-- Explain why async is needed. UI must remain responsive. Network requests are common async tasks in mobile apps. Briefly mention the event loop model (tasks queued, executed when main thread is free). -->

## Introduction: Why Asynchronous?

JavaScript in browsers and Node.js (and thus React Native) runs on a single main thread. If a long-running operation (like fetching data from a network, reading a large file, or complex calculations) were executed synchronously on this thread, it would block everything else, freezing the user interface (UI) and making the application unresponsive.

**Asynchronous programming** allows these long-running tasks to execute in the background without blocking the main thread. When the task completes (or fails), its result is handled later, typically via mechanisms like callbacks, Promises, or `async`/`await`. This keeps the UI responsive and improves user experience.

---
<!-- Presenter notes for Callbacks slide -->
<!-- Briefly explain callbacks as the original async pattern. Show a simple conceptual example. Then show nested callbacks leading to "Callback Hell" - hard to read/maintain. Transition to Promises as the solution. -->

## The Old Way: Callbacks

Historically, callbacks were the primary way to handle asynchronous operations. A callback is a function passed as an argument to another function, intended to be executed ("called back") when the asynchronous operation completes.

```typescript
// Conceptual Example (Not runnable without actual async function)
function fetchData(url: string, callback: (error: Error | null, data?: any) => void): void {
  // Simulate network request
  setTimeout(() => {
    if (Math.random() > 0.2) { // Simulate success
      callback(null, { id: 1, name: "Simulated Data" });
    } else { // Simulate error
      callback(new Error("Failed to fetch data"));
    }
  }, 1000); // Takes 1 second
}

// Using the callback
fetchData("/api/patient/1", (error, data) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Data:", data);
    // Problem: What if we need to make another async call based on this data?
    // fetchData(`/api/medications/${data.id}`, (err2, data2) => { ... }); // Leads to nesting
  }
});
```
Nesting callbacks for sequential asynchronous operations leads to "Callback Hell" or the "Pyramid of Doom," making code hard to read, debug, and maintain.

---
<!-- Presenter notes for Promises slide -->
<!-- Introduce Promises as objects representing the eventual result of an async operation. States: pending, fulfilled, rejected. Explain `.then()` for success, `.catch()` for errors, `.finally()` for cleanup. Show chaining `.then()`. -->

## Promises: A Better Way

Promises (introduced in ES6) provide a cleaner, more manageable way to handle asynchronous operations. A `Promise` is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

A Promise can be in one of three states:
-   **Pending:** Initial state, neither fulfilled nor rejected.
-   **Fulfilled:** The operation completed successfully, resulting in a value.
-   **Rejected:** The operation failed, resulting in an error.

We primarily *consume* promises using methods:
-   **`.then(onFulfilled, onRejected?)`**: Attaches callbacks for fulfillment (success) and optionally rejection (failure). Returns a new Promise, allowing chaining.
-   **`.catch(onRejected)`**: Attaches a callback specifically for handling rejection (errors). Equivalent to `.then(null, onRejected)`.
-   **`.finally(onFinally)`**: Attaches a callback that executes when the promise is settled (either fulfilled or rejected). Useful for cleanup tasks.

---
<!-- Presenter notes for Promises Example slide -->
<!-- Walk through creating a promise (for demonstration). Show consuming it with `.then` and `.catch`. Show chaining `.then` calls. -->

## Promises Example (TypeScript)

```typescript
/**
 * Simulates fetching medication details asynchronously using a Promise.
 * @param medicationId - The ID of the medication to fetch.
 * @returns A Promise that resolves with medication data or rejects with an error.
 */
function fetchMedicationDetails(medicationId: string): Promise<{ id: string; name: string; stock: number }> {
  console.log(`Fetching details for ${medicationId}...`);
  // Return a new Promise - executor function runs immediately
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      if (medicationId === "MED123") {
        // Simulate success: call resolve with the result
        resolve({ id: medicationId, name: "Lisinopril", stock: 150 });
      } else if (medicationId === "ERR001") {
        // Simulate error: call reject with an Error object
        reject(new Error(`Medication ${medicationId} caused a server error.`));
      } else {
        // Simulate not found: call reject with an Error object
        reject(new Error(`Medication ${medicationId} not found.`));
      }
    }, 1500); // Simulate 1.5 second delay
  });
}

// --- Consuming the Promise ---

// 1. Basic .then and .catch
fetchMedicationDetails("MED123")
  .then((medicationData) => {
    // This runs if the promise is fulfilled (resolved)
    console.log("Success (then/catch):", medicationData);
  })
  .catch((error) => {
    // This runs if the promise is rejected
    console.error("Error (then/catch):", error.message);
  });

// 2. Handling a rejection
fetchMedicationDetails("MED456")
  .then((data) => console.log("This won't run")) // Skips .then on rejection
  .catch((error) => console.error("Not Found Error:", error.message)) // Output: Not Found Error: Medication MED456 not found.
  .finally(() => console.log("Fetch attempt finished for MED456.")); // Runs regardless of success/failure

// 3. Chaining .then (if the first .then returns a value or another promise)
fetchMedicationDetails("MED123")
  .then((medData) => {
    console.log("Chain Step 1: Got data, checking stock:", medData.stock);
    // Return a value for the next .then
    return medData.stock > 100; // Is stock high? (boolean)
  })
  .then((isStockHigh) => {
    // This receives the return value from the previous .then
    console.log("Chain Step 2: Is stock high?", isStockHigh); // Output: Chain Step 2: Is stock high? true
  })
  .catch((error) => console.error("Chaining Error:", error.message)); // Catches errors from fetch or any preceding .then
```
**(Copy button available in top-right corner)**

**Explanation:**

This example demonstrates creating and consuming Promises in TypeScript.

1.  **Creating a Promise (`fetchMedicationDetails`):**
    *   The function returns `Promise<{...}>`, indicating it will eventually yield an object of that shape or an error.
    *   `new Promise((resolve, reject) => { ... })` creates the promise. The function passed to the constructor (the "executor") runs immediately.
    *   Inside the executor, the asynchronous operation (simulated by `setTimeout`) occurs.
    *   If the operation succeeds, `resolve(value)` is called with the result. This fulfills the promise.
    *   If the operation fails, `reject(error)` is called, usually with an `Error` object. This rejects the promise.
2.  **Consuming with `.then()` and `.catch()`:**
    *   `.then(callback)`: The `callback` function passed to `.then` executes only if the promise is *fulfilled*. It receives the value passed to `resolve` as its argument (`medicationData`).
    *   `.catch(callback)`: The `callback` function passed to `.catch` executes only if the promise is *rejected*. It receives the value passed to `reject` (usually an `Error` object) as its argument (`error`).
    *   `.finally(callback)`: The `callback` passed to `.finally` executes when the promise settles (either fulfilled or rejected). It receives no arguments and is typically used for cleanup (e.g., hiding a loading indicator).
3.  **Chaining (`.then().then().catch()`):**
    *   `.then()` returns a *new* promise. This allows chaining multiple `.then()` calls to perform sequential asynchronous operations or process results step-by-step.
    *   The value returned from a `.then()` callback becomes the resolved value for the *next* `.then()` in the chain (e.g., `return medData.stock > 100;` passes the boolean result to the subsequent `.then((isStockHigh) => ...)`).
    *   If any promise in the chain rejects, or if an error is thrown inside a `.then()` callback, execution jumps to the nearest `.catch()` handler down the chain.

---
<!-- Presenter notes for Async/Await slide -->
<!-- Introduce async/await as syntactic sugar over Promises. Makes async code look more synchronous and linear. Explain `async` keyword for functions, `await` keyword to pause execution until promise settles. Explain `try...catch` for error handling. -->

## `async`/`await`: Cleaner Asynchronous Code

ES2017 introduced `async` and `await` keywords, providing syntactic sugar on top of Promises, making asynchronous code look and behave more like synchronous code, which is often easier to read and reason about.

-   **`async function`**: Declaring a function with `async` automatically makes it return a Promise. If the function returns a value, the promise resolves with that value. If it throws an error, the promise rejects with that error.
-   **`await`**: Can *only* be used inside an `async function*. It pauses the execution of the `async function` until the Promise it's waiting for settles (either fulfills or rejects).
    -   If the Promise fulfills, `await` returns the resolved value.
    -   If the Promise rejects, `await` throws the rejected error (which can be caught using `try...catch`).

---
<!-- Presenter notes for Async/Await Example slide -->
<!-- Rewrite the previous Promise example using async/await. Show how `await` replaces `.then`. Show `try...catch` replacing `.catch`. Emphasize the improved readability. -->

## `async`/`await` Example (TypeScript)

```typescript
// Assume fetchMedicationDetails function from previous example exists

/**
 * Processes medication details using async/await.
 * @param medicationId - The ID of the medication to process.
 */
async function processMedication(medicationId: string): Promise<void> { // async functions return Promises
  console.log(`--- Processing ${medicationId} using async/await ---`);
  try {
    // Pause execution until fetchMedicationDetails promise resolves
    const medData = await fetchMedicationDetails(medicationId);
    // Code here runs only after the promise fulfills
    console.log("Data received:", medData);

    // Simulate another async operation based on the result
    const isStockSufficient = await checkStockLevel(medData.stock); // Assuming checkStockLevel returns Promise<boolean>

    if (isStockSufficient) {
      console.log(`Stock level for ${medData.name} is sufficient.`);
      // Perform further actions...
    } else {
      console.log(`Stock level for ${medData.name} is LOW.`);
    }

  } catch (error) {
    // Catches any rejection from awaited promises or errors thrown in the try block
    console.error("Processing Error:", error instanceof Error ? error.message : String(error));
  } finally {
    // Runs whether try completed or catch was executed
    console.log(`--- Finished processing attempt for ${medicationId} ---`);
  }
}

// Dummy async function for demonstration
async function checkStockLevel(stock: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate short delay
    return stock > 50;
}

// Example Usage
processMedication("MED123"); // Will succeed
processMedication("MED456"); // Will fail (not found)
```
**(Copy button available in top-right corner)**

**Explanation:**

This example refactors the promise consumption logic using `async`/`await`.

1.  **`async function processMedication(...)`:** The `async` keyword before `function` signifies that this function will work with asynchronous operations using `await` and will implicitly return a Promise. The `: Promise<void>` return type indicates it doesn't resolve with a specific value upon completion.
2.  **`await fetchMedicationDetails(...)`:** The `await` keyword is placed before the call to `fetchMedicationDetails`. This does several things:
    *   It pauses the execution of the `processMedication` function *at this line*.
    *   It waits for the Promise returned by `fetchMedicationDetails` to settle.
    *   If the promise *fulfills*, `await` unwraps the resolved value, which is then assigned to the `medData` variable. Execution then resumes on the next line.
    *   If the promise *rejects*, `await` throws the rejection error.
3.  **Sequential Execution:** Code following an `await` looks synchronous. The `console.log("Data received:", medData)` line only runs *after* `fetchMedicationDetails` has successfully completed and its result is available in `medData`. Similarly, `await checkStockLevel(...)` waits for that promise before proceeding to the `if/else` block. This makes sequential asynchronous operations much easier to read than `.then()` chaining.
4.  **`try...catch` Block:** To handle potential rejections from `await` expressions (or any other errors within the `try` block), we wrap the asynchronous code in a `try...catch` block.
    *   If any `await`ed promise rejects, execution immediately jumps to the `catch (error)` block.
    *   The `error` variable holds the value the promise was rejected with (usually an `Error` object).
    *   The `instanceof Error` check is a good practice before accessing `error.message`.
5.  **`finally` Block:** The `finally` block executes regardless of whether the `try` block completed successfully or an error was caught in the `catch` block. It's suitable for cleanup code that must always run.
6.  **Readability:** Compare this `async`/`await` structure to the equivalent `.then()` chaining and `.catch()` handling in the previous example. `async`/`await` often results in code that is significantly easier to follow for complex asynchronous workflows.

---
<!-- Presenter notes for Promise.all slide -->
<!-- Explain `Promise.all` for running multiple promises concurrently and waiting for *all* to complete. Useful for independent async tasks. Show example fetching multiple details. Explain how it rejects if *any* promise rejects. -->

## Running Promises Concurrently: `Promise.all()`

Sometimes you need to perform multiple asynchronous operations concurrently and wait for all of them to finish. `Promise.all()` is ideal for this.

-   **Input:** Takes an array of Promises.
-   **Output:** Returns a *single* Promise that:
    -   **Fulfills** when *all* input promises have fulfilled. The resolved value is an array containing the resolved values of the input promises, in the same order.
    -   **Rejects** as soon as *any one* of the input promises rejects. The rejection reason is the reason from the first promise that rejected.

---
<!-- Presenter notes for Promise.all Example slide -->
<!-- Show creating an array of promises. Pass to `Promise.all`. Use `await` or `.then` to get the array of results. Show error handling - if one fails, the whole `Promise.all` rejects. -->

## `Promise.all()` Example (TypeScript)

```typescript
// Assume fetchMedicationDetails function from previous examples exists

/**
 * Fetches details for multiple medications concurrently.
 * @param medicationIds - An array of medication IDs.
 */
async function fetchMultipleDetails(medicationIds: string[]): Promise<void> {
  console.log(`--- Fetching details for: ${medicationIds.join(', ')} ---`);
  try {
    // Create an array of Promises by calling fetchMedicationDetails for each ID
    const fetchPromises = medicationIds.map(id => fetchMedicationDetails(id));
    // Example: [ Promise(MED123), Promise(MEDXYZ), Promise(MED789) ]

    // Wait for ALL promises in the array to resolve
    const results = await Promise.all(fetchPromises);

    // 'results' is an array containing the resolved values in order
    console.log("All details fetched successfully:");
    results.forEach(medData => {
      console.log(` - ${medData.name} (Stock: ${medData.stock})`);
    });

  } catch (error) {
    // If ANY of the promises in fetchPromises rejects, Promise.all rejects immediately
    console.error("Error fetching multiple details:", error instanceof Error ? error.message : String(error));
  } finally {
    console.log(`--- Finished multiple fetch attempt ---`);
  }
}

// Example Usage
fetchMultipleDetails(["MED123", "MED004"]); // Assuming MED004 exists and resolves
// (Will likely log success for both if MED004 is handled in fetchMedicationDetails)

fetchMultipleDetails(["MED123", "ERR001", "MED004"]); // This will fail because ERR001 rejects
// Output:
// --- Fetching details for: MED123, ERR001, MED004 ---
// Fetching details for MED123...
// Fetching details for ERR001...
// Fetching details for MED004...
// Error fetching multiple details: Medication ERR001 caused a server error.
// --- Finished multiple fetch attempt ---
```
**(Copy button available in top-right corner)**

**Explanation:**

This example uses `Promise.all()` to fetch details for multiple medications concurrently.

1.  **Purpose:** To demonstrate how to efficiently handle multiple independent asynchronous operations when you need to wait for all of them to complete before proceeding.
2.  **Creating an Array of Promises:** The `medicationIds.map(id => fetchMedicationDetails(id))` line is key. The `map` array method iterates over each `id` in the `medicationIds` array and calls `fetchMedicationDetails(id)` for each one. Since `fetchMedicationDetails` returns a Promise, `map` creates a *new array* (`fetchPromises`) where each element is a Promise representing a pending fetch operation.
3.  **`await Promise.all(fetchPromises)`:**
    *   `Promise.all()` takes the array of promises (`fetchPromises`) as input.
    *   It initiates all the fetch operations roughly simultaneously (concurrency depends on browser/environment limits, but they don't wait for each other to start).
    *   The `await` keyword pauses the `fetchMultipleDetails` function until the single Promise returned by `Promise.all()` settles.
    *   This Promise settles only when *all* promises inside `fetchPromises` have settled.
4.  **Success Case:** If *all* promises in `fetchPromises` fulfill, the `Promise.all()` promise fulfills. The `await` then returns an array (`results`) containing the resolved values from each input promise, in the same order as the original `fetchPromises` array. The code then iterates over `results` to log the data.
5.  **Failure Case:** If *any single promise* in `fetchPromises` rejects (like `fetchMedicationDetails("ERR001")` in the second example usage), the `Promise.all()` promise immediately *rejects*. It doesn't wait for the other promises to finish. The rejection reason is the reason from the first promise that rejected. Execution jumps to the `catch` block.
6.  **Efficiency:** Compared to awaiting each fetch sequentially inside a loop, `Promise.all()` is much more efficient for independent operations as it allows them to run in parallel, significantly reducing the total waiting time.

---
<!-- Presenter notes for Context slide -->
<!-- Native Devs: Similar concepts exist (Coroutines/Flow in Kotlin, async/await/Combine in Swift, RxJava/RxSwift). Promises/async/await are JS's standard way. Web Devs: Essential JS knowledge, heavily used in all frameworks for API calls, etc. -->

## Context for Developers

> **Native Dev Context:** (For Android/iOS Developers)
> Handling asynchronous operations is critical in mobile development to keep the UI thread free. While JavaScript uses an event loop with Promises and `async`/`await`, native platforms have their own concurrency models:
> - **Android:** Coroutines (Kotlin - recommended), RxJava, AsyncTask (legacy), Threads/Executors. Coroutines with `suspend` functions and `Flow` are conceptually similar to `async`/`await` and asynchronous streams.
> - **iOS:** Grand Central Dispatch (GCD), Operations, Swift Concurrency (`async`/`await`, Actors - recommended), Combine framework, RxSwift. Swift's `async`/`await` is syntactically very similar to JavaScript's.
> Understanding Promises helps grasp the underlying mechanism before `async`/`await`.

> **Web Dev Context:** (For React/Angular/Vue Developers)
> Promises and `async`/`await` are fundamental for modern web development, especially for interacting with APIs (`fetch`, Axios), handling user events that trigger async actions, and managing application state updates based on asynchronous results. You'll use `async`/`await` extensively in React Native for fetching data, interacting with device APIs (like AsyncStorage, Camera, Location), and more. Libraries like TanStack Query (React Query) build heavily on Promises for data fetching and caching.

---
<!-- Presenter notes for Summary slide -->
<!-- Recap: Async needed for non-blocking. Callbacks -> Promises (`.then`/`.catch`) -> Async/Await (`async`/`await`/`try-catch`). `Promise.all` for concurrency. -->

## Summary

In this lesson, we learned how JavaScript handles asynchronous operations:

-   Asynchronous code prevents blocking the main thread, keeping the UI responsive.
-   Callbacks were the old way, often leading to "Callback Hell".
-   **Promises** represent eventual results, handled using `.then()` (success), `.catch()` (error), and `.finally()` (cleanup).
-   **`async`/`await`** provides cleaner syntax built on Promises, making async code look more synchronous using `async` functions, the `await` keyword, and `try...catch` for errors.
-   **`Promise.all()`** runs multiple promises concurrently and waits for all to complete.

---
<!-- Presenter notes for Next Steps slide -->
<!-- Point to next module (React Essentials). Encourage practicing async/await with simulated delays or simple API calls (e.g., using JSONPlaceholder). -->

## Next Steps

Handling asynchronous operations is crucial for building interactive applications. Try creating functions that return Promises using `setTimeout` to simulate delays, and consume them using both `.then()`/`.catch()` and `async`/`await`.

This concludes the JavaScript Essentials module. Proceed to **Module 05: React Essentials** to learn the core concepts of the React library, which forms the foundation of React Native.

**Further Reading:**
-   [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
-   [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
-   [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
-   [MDN: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
-   [MDN: Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)