## Section 5: Asynchronous JavaScript (Callbacks, Promises, async/await)

> [!TIP]
> Experienced developers may find concepts in this section familiar. It's recommended to skim for review, focusing particularly on comparisons drawn to the React Native environment and any differences highlighted in Background Bridge Notes.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Asynchronous)
> - [MDN Web Docs: Using callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
> - [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
> - [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
> - [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
> - [MDN Web Docs: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
> - [MDN Web Docs: Using microtasks in JavaScript with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)

Asynchronous operations are a cornerstone of modern JavaScript, especially in environments like React Native where non-blocking I/O (Input/Output) operations such as network requests, file system access, or timers are essential for a responsive user interface. This section explores the evolution of handling asynchronicity in JavaScript, from traditional callbacks to Promises and the more recent async/await syntax.

### 5.1. Fundamentals of Synchronous vs. Asynchronous Programming in JavaScript

* **Synchronous Execution**: In a synchronous programming model, code is executed sequentially, one line at a time. Each operation must complete before the next operation can begin. If a long-running synchronous operation (e.g., a complex calculation or a blocking I/O call, though the latter is rare in JavaScript's main thread) occurs, it will block the main thread of execution. In a UI application, this results in an unresponsive interface (e.g., the app freezes) until the operation finishes.30
* **Asynchronous Execution**: Asynchronous programming allows operations, particularly those that take time (like fetching data from a server, reading a file, or waiting for a timer), to be initiated and then run in the background without blocking the main thread. The main thread can continue executing other code. When the asynchronous operation eventually completes (or fails), a specific piece of code (often a callback function, or a Promise handler) is executed to handle the result or error.30
* **Why Asynchronous is Crucial for UI Applications**: In UI-driven applications such as those built with React Native, maintaining a responsive user interface is paramount. Asynchronous operations prevent the UI from freezing during time-consuming tasks. For instance, if a network request were synchronous, the entire app would become unresponsive until the data was received from the server. Asynchronous patterns ensure that the user can continue to interact with the app while these operations are in progress.

### 5.2. Callbacks

Callbacks were the earliest mechanism for handling asynchronous operations in JavaScript.

* **Definition**: A callback is a function that is passed as an argument to another function. This passed-in function is intended to be executed ("called back") at a later time, typically after the completion of an asynchronous operation or an event.30
* **Role in Asynchronous Operations**:
  + **Event Handlers**: Used extensively in browser and Node.js environments to respond to events (e.g., user clicks, mouse movements, server responses). button.addEventListener('click', function() { /\* This is a callback \*/ });
  + **Timers**: Functions like setTimeout() and setInterval() accept callbacks to be executed after a specified delay or at regular intervals. setTimeout(function() { /\* This callback runs after 1 second \*/ }, 1000);
  + **Network Requests**: Older APIs for making network requests (like the XMLHttpRequest object in browsers or some core Node.js modules) relied heavily on callbacks to handle responses or errors.
* **"Callback Hell" (Pyramid of Doom)**:
  + When multiple asynchronous operations need to be performed in sequence, where each operation depends on the result of the previous one, it often leads to deeply nested callback functions. This pattern is pejoratively known as "Callback Hell" or the "Pyramid of Doom" due to the triangular shape the indented code forms.30
  + **Consequences**:
    - **Readability Suffers**: The code becomes very difficult to read and follow due to excessive nesting and indentation.
    - **Maintainability Decreases**: Modifying or debugging such code is challenging and error-prone.
    - **Error Handling Becomes Complex**: Each nested callback might require its own error handling logic, leading to repetitive and often inconsistent error management.31
  + **Example**:
    JavaScript
    // Illustrative example of callback hell
    asyncOperation1(arg1, function(error1, result1) {
     if (error1) {
     handleError(error1);
     } else {
     asyncOperation2(result1, function(error2, result2) {
     if (error2) {
     handleError(error2);
     } else {
     asyncOperation3(result2, function(error3, result3) {
     if (error3) {
     handleError(error3);
     } else {
     //...and so on
     console.log("All operations complete:", result3);
     }
     });
     }
     });
     }
    });

> 🌐 **(Web Developers):**
> > **Comparison:** If you're used to handling asynchronous operations with more structured patterns like Promises or async/await (which are common in modern web development), the "callback hell" pattern might seem overly complex and difficult to manage. Many languages have evolved beyond deeply nested callbacks for asynchronous flows.
> >
> > **Key Takeaway:** While callbacks are fundamental, prefer Promises and `async`/`await` for managing asynchronous sequences in modern JavaScript and React Native to improve readability and maintainability.
> >
> > **Source:** [MDN Web Docs: Using callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

> 📲 **(Native Developers):**
> > **Comparison:** Native languages often use patterns like completion handlers (Swift) or listeners/observers (Kotlin/Java) for asynchronous results. JavaScript's traditional callback pattern, especially when deeply nested ("callback hell"), can be less structured than some native asynchronous handling mechanisms. Promises and `async`/`await` offer more linear and readable alternatives.
> >
> > **Key Takeaway:** Recognize the limitations of deeply nested callbacks and leverage Promises and `async`/`await` for cleaner asynchronous code in React Native.
> >
> > **Source:** [MDN Web Docs: Using callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

The difficulties posed by callback hell were a primary motivation for the introduction of Promises in ES6.

### 5.3. Promises (ES6+)

Promises provide a more robust and structured approach to managing asynchronous operations, offering a cleaner alternative to callback-based patterns.

* **Core Concepts**: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value (or reason for failure). It acts as a placeholder for a future value.32
* **States of a Promise**: A Promise can be in one of three states 32:
  1. pending: The initial state; the asynchronous operation has not yet completed.
  2. fulfilled (often referred to as resolved): The operation completed successfully, and the Promise has a fulfillment value.
  3. rejected: The operation failed, and the Promise has a reason for the failure (typically an error object). A Promise is considered **settled** if it is either fulfilled or rejected (i.e., no longer pending). Once a Promise is settled, its state and value/reason are immutable.
* **Creating a Promise**: Promises are typically created using the new Promise() constructor, which takes an "executor" function as an argument. The executor function itself receives two functions as arguments: resolve and reject.
  JavaScript
  const myPromise = new Promise((resolve, reject) => {
   // Perform an asynchronous operation
   setTimeout(() => {
   const success = Math.random() > 0.5;
   if (success) {
   resolve("Operation was successful!"); // Fulfill the promise
   } else {
   reject(new Error("Operation failed.")); // Reject the promise
   }
   }, 1000);
  });
* **Consuming Promises**: The primary way to interact with a Promise and handle its eventual outcome is through its methods:
  + **.then(onFulfilled, onRejected)**: This method is used to schedule callbacks for when the Promise settles.32
    - onFulfilled: A function called if the Promise is fulfilled. It receives the fulfillment value as its argument.
    - onRejected (optional): A function called if the Promise is rejected. It receives the rejection reason as its argument.
    - Crucially, .then() *always returns a new Promise*. This is what enables **Promise chaining**.33
  + **.catch(onRejected)**: This method is a more readable shorthand for .then(null, onRejected). It's used specifically to handle rejections.32 It also returns a new Promise.
  + **.finally(onFinally)**: This method schedules a callback function to be executed when the Promise is settled, regardless of whether it was fulfilled or rejected. It's useful for cleanup tasks (e.g., hiding a loading spinner). The onFinally callback receives no arguments, and its return value is generally ignored (unless it throws an error or returns a rejected promise). It also returns a new Promise that typically resolves with the original promise's outcome.32
* **Promise Chaining**:
  + Because .then(), .catch(), and .finally() return new Promises, these methods can be chained together to create a sequence of asynchronous operations in a more linear and readable fashion than nested callbacks.33
  + **How Return Values Affect the Chain** 33:
    - If an onFulfilled or onRejected handler returns a regular value (not a Promise), the Promise returned by .then() (or .catch()) is fulfilled with that value.
    - If a handler throws an error, the returned Promise is rejected with that error.
    - If a handler returns another Promise (let's call it P2), the Promise returned by .then() (or .catch()) will "adopt" the state of P2. That is, it will wait for P2 to settle and then settle with P2's fulfillment value or rejection reason. This is key for sequencing asynchronous operations where one depends on the completion of another.

JavaScript
fetchUserData()
 .then(user => {
 console.log("User data:", user);
 return fetchUserOrders(user.id); // Returns another promise
 })
 .then(orders => {
 console.log("User orders:", orders);
 // Further processing
 })
 .catch(error => {
 console.error("An error occurred:", error);
 })
 .finally(() => {
 console.log("Cleanup operations finished.");
 });

> 🌐 **(Web Developers):**
> > **Comparison:** Promises provide a more structured way to handle asynchronous operations compared to traditional callbacks, similar to how Promises are used in modern web development APIs (like Fetch). They offer a cleaner way to chain asynchronous steps and handle errors, aligning with patterns you might be familiar with from other asynchronous programming models.
> >
> > **Key Takeaway:** Promises are the standard way to manage asynchronous operations in modern JavaScript. Understand their states and methods (`.then()`, `.catch()`, `.finally()`) for effective asynchronous control flow.
> >
> > **Source:** [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

> 📲 **(Native Developers):**
> > **Comparison:** Promises offer a structured approach to asynchronous operations that can be compared to concepts like Futures or Tasks in native languages. They represent a value that will be available later and provide methods to handle success or failure, offering a more organized alternative to deeply nested callbacks.
> >
> > **Key Takeaway:** Promises provide a clear and manageable way to work with asynchronous results. Familiarize yourself with their lifecycle and how to consume them using `.then()`, `.catch()`, and `.finally()`.
> >
> > **Source:** [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* **Static Promise Methods**: The Promise constructor itself provides several static utility methods for working with multiple Promises 32:
  + Promise.resolve(value): Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e., has a .then method), the returned promise will "follow" that thenable, adopting its eventual state. If the value is not a thenable, the returned promise will be fulfilled with the value.
  + Promise.reject(reason): Returns a Promise object that is rejected with the given reason.
  + Promise.all(iterableOfPromises): Takes an iterable (e.g., an array) of Promises. It returns a single Promise that:
    - Fulfills when *all* of the input Promises have fulfilled. The fulfillment value is an array of the fulfillment values of the input Promises, in the same order as the input iterable.
    - Rejects if *any* of the input Promises reject, with the rejection reason of the first Promise that rejected.
  + Promise.race(iterableOfPromises): Takes an iterable of Promises. It returns a single Promise that:
    - Settles (fulfills or rejects) as soon as the *first* Promise in the iterable settles, with the same fulfillment value or rejection reason.
  + Promise.allSettled(iterableOfPromises) (ES2020+): Takes an iterable of Promises. It returns a Promise that fulfills after all of the given Promises have either fulfilled or rejected. The fulfillment value is an array of objects, each describing the outcome of a Promise: {status: "fulfilled", value:...} or {status: "rejected", reason:...}. This is useful when you need to know the outcome of all operations, regardless of individual failures.
  + Promise.any(iterableOfPromises) (ES2021+): Takes an iterable of Promises. It returns a Promise that fulfills as soon as *any* of the input Promises fulfill, with the value of the first one that fulfilled. If all input Promises reject, it rejects with an AggregateError (an error object that groups all the individual rejection reasons).

<br>

**Table 5.1: Promise States and Transitions**

| **State** | **Description** | **How it's Reached** | **Next Possible States** |
| --- | --- | --- | --- |
| pending | Initial state, operation not yet completed | When new Promise() is created | fulfilled, rejected |
| fulfilled | Operation completed successfully, has a value | Executor calls resolve(value) | (Terminal state) |
| rejected | Operation failed, has a reason (error) | Executor calls reject(reason) or error thrown in executor | (Terminal state) |

<br>

### 5.4. async/await (ES2017+)

async/await is a more recent addition to JavaScript (ES2017) that provides syntactic sugar on top of Promises. It allows asynchronous, Promise-based code to be written in a style that looks and behaves more like synchronous code, making it easier to read and reason about.34

* **async Functions**:
  + To use await, the enclosing function must be declared with the async keyword.
  + Syntax: async function myFunction() { /\*... \*/ } or const myArrowFunction = async () => { /\*... \*/ };.34
  + An async function *always* implicitly returns a Promise.34
    - If the async function executes a return value; statement, the Promise it returns will be fulfilled with value.
    - If the async function throws an error (or an awaited Promise within it rejects and is not caught), the Promise it returns will be rejected with that error.
* **await Keyword**:
  + The await keyword can *only* be used inside an async function (or at the top level of JavaScript modules in modern environments).34
  + When await is placed before a Promise, it pauses the execution of the async function until that Promise settles (fulfills or rejects).34 It does *not* block the main JavaScript thread; instead, it yields control back to the event loop, allowing other code to run.
  + If the awaited Promise fulfills, the await expression evaluates to the fulfillment value of the Promise.
  + If the awaited Promise rejects, the await expression throws the rejection reason. This thrown error can be caught using a standard try...catch block within the async function.35
* **Simplification of Promise-based Code**:
  + async/await helps to avoid long chains of .then() calls, resulting in code that is often flatter, more linear, and easier to follow, especially for complex sequences of asynchronous operations.
  + **Example Comparison**:
    JavaScript
    // Using Promises with.then()
    function fetchDataWithPromises() {
     return fetch('https://api.example.com/data')
     .then(response => {
     if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
     }
     return response.json();
     })
     .then(data => {
     console.log("Data received (Promises):", data);
     return data; // Make data available to the next.then() if chained
     })
     .catch(error => {
     console.error("Failed to fetch data (Promises):", error);
     throw error; // Re-throw to propagate the error if needed
     });
    }

    // Using async/await
    async function fetchDataWithAsyncAwait() {
     try {
     const response = await fetch('https://api.example.com/data');
     if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
     }
     const data = await response.json();
     console.log("Data received (async/await):", data);
     return data; // The async function's promise will fulfill with this
     } catch (error) {
     console.error("Failed to fetch data (async/await):", error);
     throw error; // The async function's promise will reject with this
     }
    }
* **Error Handling with try...catch**:
  + Standard try...catch blocks can be used around await expressions to handle errors (rejected Promises) in a way that is familiar from synchronous error handling.34 This often makes error handling logic more straightforward compared to `.catch()` chains.

> 🌐 **(Web Developers):**
> > **Comparison:** If you're familiar with `async`/`await` syntax from other languages (like C# or Python), JavaScript's implementation will feel very similar. It provides a more synchronous-looking way to write asynchronous code based on Promises, significantly improving readability compared to `.then()` chains.
> >
> > **Key Takeaway:** `async`/`await` is syntactic sugar over Promises and is the preferred style for writing asynchronous code in modern JavaScript and React Native due to its readability and ease of error handling with `try...catch`.
> >
> > **Source:** [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

> 📲 **(Native Developers):**
> > **Comparison:** While native languages have different concurrency primitives, the `async`/`await` pattern is becoming increasingly common across languages. JavaScript's `async`/`await` provides a way to write asynchronous code that looks sequential, which can be easier to follow than callback-based or even Promise-chaining approaches, potentially feeling more familiar if you've encountered similar patterns.
> >
> > **Key Takeaway:** `async`/`await` simplifies working with Promises, making asynchronous code look and behave more like synchronous code. Use `try...catch` for handling errors within `async` functions.
> >
> > **Source:** [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

### 5.5. "Under the Hood": Event Loop, Callback Queue (Task Queue), and Microtask Queue

JavaScript is a single-threaded language, meaning it has only one call stack and can execute only one piece of code at a time. However, it achieves concurrency (handling multiple things seemingly at once) through a mechanism involving the event loop, and different task queues, which operate in conjunction with APIs provided by the hosting environment (like a web browser or Node.js).

* **JavaScript as a Single-Threaded Language**: At its core, the JavaScript engine has a single thread for code execution.
* **The Call Stack**: This is a data structure that keeps track of function calls in the program. When a function is called, a new frame is pushed onto the stack. When a function returns, its frame is popped off the stack.
* **Web APIs / Node.js Background Operations**: Asynchronous operations like setTimeout, DOM events (in browsers), fetch requests, or file system operations (in Node.js) are not handled directly by the JavaScript engine's main thread. Instead, they are offloaded to the browser's Web APIs or the Node.js environment's underlying system (often using separate threads managed by the environment). When these background operations complete, they don't directly interrupt the JavaScript execution; instead, they place their associated callback functions into a queue.36
* **The Event Loop**: This is a constantly running process that monitors both the Call Stack and the task queues. Its fundamental job is to take a task from a queue and push it onto the Call Stack for execution, but *only when the Call Stack is empty*.36
* **Callback Queue (Task Queue / Macrotask Queue)**:
  + This queue holds callback functions that are ready to be executed. These callbacks typically come from completed "macrotasks" such as:
    - setTimeout and setInterval timers.
    - I/O operations (e.g., network responses, file reads).
    - User interaction events (e.g., clicks, key presses).
    - UI rendering updates (in browsers).
  + The Event Loop picks one task from this queue per "tick" or iteration, but only when the Call Stack is empty.36
* **Microtask Queue**:
  + This queue holds callbacks from completed "microtasks." Microtasks have a higher priority than macrotasks. The primary sources of microtasks are:
    - Promise handlers (.then(), .catch(), .finally() callbacks). When a Promise settles, its attached handlers are scheduled as microtasks.
    - Callbacks registered with queueMicrotask().
    - MutationObserver callbacks (in browsers).
  + **Higher Priority and Execution Timing**: The Microtask Queue is processed *after* the currently executing synchronous script finishes, and critically, *after each macrotask* from the Callback Queue finishes. Before the Event Loop considers taking another macrotask or performing rendering updates, it will execute *all* tasks currently in the Microtask Queue until it is empty. This means if a microtask adds another microtask to the queue, that new microtask will also be executed before the next macrotask or rendering.36
* **Order of Execution**: The general flow is as follows:
  1. All synchronous code currently on the Call Stack executes until the Call Stack is empty.
  2. The JavaScript engine checks the Microtask Queue. If it's not empty, it executes all microtasks in the queue sequentially until the Microtask Queue becomes empty. This happens within the same event loop tick.
  3. (Browser specific) If rendering updates are due and conditions allow, the browser may perform UI rendering.
  4. The Event Loop checks the Callback (Macrotask) Queue. If it's not empty, it dequeues the oldest task, pushes its callback function onto the Call Stack, and execution jumps back to step 1 (executing this new task).
* **Implications for Developers**: Understanding this execution order is crucial for predicting the behavior of code that mixes synchronous operations, Promises, async/await, and traditional callbacks like setTimeout. For example, a Promise's `.then()` callback (a microtask) will always execute before a `setTimeout` callback (a macrotask) scheduled for the same effective "time," even if the `setTimeout` delay is 0ms.

> 🌐 **(Web Developers):**
> > **Comparison:** If you're used to multi-threaded environments or different concurrency models, JavaScript's single-threaded nature combined with the Event Loop, Callback Queue (Macrotask Queue), and Microtask Queue might require a shift in thinking. Understanding how asynchronous tasks are managed and prioritized is key to avoiding blocking the main thread and keeping the UI responsive.
> >
> > **Key Takeaway:** The Event Loop is how JavaScript handles asynchronous operations without blocking. Microtasks (like Promise handlers) have higher priority than macrotasks (like setTimeout callbacks).
> >
> > **Source:** [MDN Web Docs: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) and [MDN Web Docs: Using microtasks in JavaScript with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)

> 📲 **(Native Developers):**
> > **Comparison:** Native development often involves managing multiple threads for background tasks to keep the UI responsive. JavaScript's single-threaded Event Loop model achieves concurrency differently by offloading operations to the environment and using queues to manage callbacks. Understanding the Event Loop, macrotasks, and microtasks is essential for writing non-blocking code in React Native.
> >
> > **Key Takeaway:** JavaScript's concurrency relies on the Event Loop and task queues, not traditional multi-threading. Pay attention to the priority difference between microtasks and macrotasks.
> >
> > **Source:** [MDN Web Docs: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) and [MDN Web Docs: Using microtasks in JavaScript with queueMicrotask()](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)

#### Conceptual Diagram: Async/Await Flow

```mermaid
graph TD;
    A[Async Function Start] --> B{Await Promise};
    B -- Promise Pending --> C[Yield Control to Event Loop];
    C --> D[Other Code Executes];
    D --> E{Awaited Promise Settles?};
    E -- Yes --> F[Resume Async Function];
    F -- Promise Fulfilled --> G[Get Fulfillment Value];
    F -- Promise Rejected --> H[Throw Rejection Reason];
    G --> I[Continue Execution];
    H --> J[Handle Error (try...catch)];
    I --> K[Async Function End];
    J --> K;
    E -- No --> C;
```

This diagram illustrates the flow of execution within an `async` function when the `await` keyword is used. The process begins when the `async` function starts executing synchronously (A). When an `await` keyword is encountered before a Promise (B), the function's execution is paused. If the awaited Promise is still in the pending state, control is yielded back to the JavaScript Event Loop (C), allowing other code in the program to run (D). This is the non-blocking nature of `await`. The Event Loop continuously checks if the awaited Promise has settled (E). Once the Promise settles (either fulfills or rejects), the async function is scheduled to resume execution (F). If the Promise was fulfilled, the fulfillment value is returned by the `await` expression (G), and the async function continues executing from where it left off (I) until it reaches its end (K) or encounters another `await`. If the Promise was rejected, the rejection reason is thrown as an exception at the point of the `await` (H). This exception can be caught using a standard `try...catch` block within the `async` function (J), allowing for familiar error handling. If the error is not caught, the `async` function's implicit Promise will be rejected. The key takeaway is that `await` doesn't block the main thread; it's a mechanism that works with Promises and the Event Loop to manage asynchronous sequences in a more readable, sequential style.

#### Conceptual Diagram: Event Loop, Call Stack, Callback Queue, Microtask Queue Interaction

```mermaid
graph LR;
    CallStack(Call Stack)
    WebAPIs(Web APIs / Background)
    CallbackQueue(Callback Queue<br>(Macrotask Queue))
    MicrotaskQueue(Microtask Queue)
    EventLoop(Event Loop)

    CallStack -- function calls --> CallStack;
    WebAPIs -- completed async op --> CallbackQueue;
    WebAPIs -- Promise settles --> MicrotaskQueue;
    CallbackQueue -- task ready --> EventLoop;
    MicrotaskQueue -- task ready --> EventLoop;
    EventLoop -- Call Stack empty<br>+ Microtask Queue not empty --> MicrotaskQueue;
    EventLoop -- Call Stack empty<br>+ Microtask Queue empty<br>+ Callback Queue not empty --> CallbackQueue;
    EventLoop -- pushes task --> CallStack;
    CallStack -- function returns --> CallStack;
```

This diagram illustrates the core components and interactions of the JavaScript Event Loop mechanism. The **Call Stack** is where synchronous function calls are executed. When asynchronous operations (like timers, network requests, or DOM events) are initiated, they are offloaded to **Web APIs / Background** provided by the environment (browser or Node.js). Once these operations complete, their associated callback functions are placed into either the **Callback Queue** (also known as the Task Queue or Macrotask Queue) for tasks like `setTimeout` or I/O, or the **Microtask Queue** for tasks like Promise handlers. The **Event Loop** is a continuous process that monitors the Call Stack and the queues. Its primary rule is to push a task from a queue onto the Call Stack *only when the Call Stack is empty*. The Microtask Queue has higher priority than the Callback Queue. This means that after the Call Stack becomes empty, the Event Loop will process *all* tasks in the Microtask Queue before taking the next task from the Callback Queue. This mechanism allows JavaScript, despite being single-threaded, to handle asynchronous operations efficiently without blocking the main thread, ensuring a responsive application.

**(TODO: Add CodeSandbox link for Exercise 5.3)**
