## Section 7: Introduction to TanStack Query (React Query) v5

In the previous section, we established that server state comes with a unique set of challenges that often require specialized tools. General-purpose client state libraries, while excellent for UI state, can become cumbersome when managing asynchronous data fetching, caching, and synchronization. This is where **TanStack Query** (formerly known as React Query) comes into play.

TanStack Query v5 is a powerful data-synchronization library for fetching, caching, and updating asynchronous data in your React (and React Native) applications. It's not just another state management library; it's specifically designed to handle the complexities of server state, making your data-fetching logic more declarative, efficient, and maintainable.

### The Philosophy of TanStack Query

TanStack Query operates on a fundamental principle: **server state is different from client state**. It treats server state as asynchronous data that needs to be fetched, cached, and kept synchronized with the server, rather than as simple global client state that you manually manage.

Key tenets of its philosophy include:

- **Declarative Data Fetching:** You declare what data you need and how to fetch it; TanStack Query handles the when and how of fetching, caching, and updating.
- **Caching as a First-Class Citizen:** It provides robust caching mechanisms out of the box, reducing redundant data fetches and improving perceived performance.
- **Stale-While-Revalidate:** A common strategy where cached (potentially stale) data is shown immediately while fresh data is fetched in the background. This makes your UI feel fast.
- **Background Updates:** Automatically re-fetches data in the background under various conditions (e.g., window focus, network reconnection) to keep your data fresh.

By embracing these principles, TanStack Query simplifies server state management significantly, allowing you to write less code and build more resilient applications.

### Key Features and Benefits

TanStack Query offers a wealth of features that directly address the challenges of server state:

- **Declarative Data Fetching:** You use hooks like `useQuery` for fetching data and `useMutation` for CUD (Create, Update, Delete) operations. TanStack Query then handles the underlying fetching logic.
- **Automatic Caching:** Query results are automatically cached. Subsequent requests for the same data (identified by a unique query key) can be served instantly from the cache. You can configure cache behavior with `staleTime` and `gcTime`.
- **Background Updates & Stale Data Handling:** Implements strategies like "stale-while-revalidate," serving cached data immediately while refetching in the background. It also automatically refetches data on events like window focus or network reconnection.
- **Request Deduplication:** If multiple components request the same data (using the same query key) around the same time, TanStack Query automatically deduplicates these requests, making only one actual network call.
- **Pagination and Infinite Loading:** Provides built-in hooks (e.g., `useInfiniteQuery`) and patterns to simplify implementing pagination and infinite scroll features.
- **Optimistic Updates:** Offers first-class support and patterns for implementing optimistic UI updates, making applications feel more responsive.
- **Devtools:** Comes with dedicated developer tools (TanStack Query Devtools) that allow inspection of the query cache, query states, and manual interaction with queries, greatly aiding debugging. These can be integrated for use with React Native.
- **Reduced Boilerplate:** Significantly cuts down on the repetitive `useEffect` and `useState` code typically needed for managing loading states, error states, data fetching, and cleanup.
- **TypeScript Support:** Written in TypeScript, providing excellent type safety.
- **Protocol Agnostic:** Works with any asynchronous data fetching method (Fetch API, Axios, GraphQL clients, etc.).

Using TanStack Query for the SpeedyMeds app means you can manage fetching medication lists, patient details, prescription histories, and order statuses with significantly less manual effort, leading to more robust and responsive features.

### Basic Setup

Getting started with TanStack Query in a React Native project is straightforward.

1.  **Installation:**
    You'll need to install the library. As of TanStack Query v5, the React Query specific package is `@tanstack/react-query`.

    ```bash
    # Using npm
    npm install @tanstack/react-query

    # Using yarn
    yarn add @tanstack/react-query
    ```

2.  **`QueryClient` and `QueryClientProvider`:**
    At the root of your application (or the part of your app that will use TanStack Query), you need to create an instance of `QueryClient` and provide it to your component tree using the `QueryClientProvider`.

    ```tsx
    // App.tsx (or your main app file)
    import React from "react";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    // ... your other imports and components (e.g., NavigationContainer)
    import MainNavigator from "./src/navigation/MainNavigator"; // Example navigator

    // Create a client
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // Default stale time for all queries: 5 minutes
          gcTime: 10 * 60 * 1000,    // Default garbage collection (cache) time: 10 minutes
        },
      },
    });

    const App: React.FC = () => {
      return (
        <QueryClientProvider client={queryClient}>
          {/* 
            Your existing providers like NavigationContainer, ThemeProvider, etc., 
            can go inside or outside QueryClientProvider depending on your needs. 
            Generally, QueryClientProvider is one of the outermost providers.
          */}
          <MainNavigator />
        </QueryClientProvider>
      );
    };

    export default App;
    ```

    **Explanation:**

    - `new QueryClient()`: This creates an instance of the query client. The client is responsible for managing the cache and all the queries within your application. You typically create only one instance of `QueryClient` for your entire app. You can also set default options for all queries and mutations here.
    - `<QueryClientProvider client={queryClient}>`: This component makes the `queryClient` instance available to all descendant components that use TanStack Query's hooks (like `useQuery` or `useMutation`).

### Important Note for TanStack Query v5 Users

TanStack Query v5 introduced some significant and beneficial changes to its API compared to v4. If you are familiar with older versions or see examples using older syntax, keep these key v5 changes in mind:

1.  **Object Syntax for Hooks:** Most hooks (`useQuery`, `useMutation`, `useInfiniteQuery`, etc.) and `queryClient` methods now accept a **single options object** as their parameter. This replaces the previous pattern of multiple positional arguments or function overloads.

    *   **Example (`useQuery`):**
        *   v4 style: `useQuery('todos', fetchTodos, { staleTime: 5000 });`
        *   v5 style: `useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: 5000 });`
    This change improves API consistency, readability (especially for functions with many options), and TypeScript integration.

2.  **`gcTime` (Garbage Collection Time):** The option previously known as `cacheTime` in v4 has been renamed to `gcTime` in v5. This name more accurately reflects its purpose: controlling how long inactive query data remains in memory before being garbage collected.

Throughout this module, all examples and explanations will use the **v5 syntax and terminology**.

### Conceptual Overview: Queries

A **query** in TanStack Query is a declarative dependency on an asynchronous source of data. It's tied to a unique **query key** and a **query function** that returns a promise.

- **Query Key (`queryKey`):** An array that uniquely identifies the data you want to fetch. It can be a simple array with a string (e.g., `['todos']`) or a more complex array with strings and variables (e.g., `['todo', todoId]`, `['medications', { category: 'painkiller', page: 1 }]`). TanStack Query uses this key for caching, re-fetching, and sharing data across your application.
- **Query Function (`queryFn`):** An asynchronous function (a function that returns a Promise) responsible for fetching your data. This function will typically use `fetch`, `axios`, or any other data-fetching library to get data from your API. It receives an object containing the `queryKey` as an argument, which can be useful if your query key contains parameters needed for the fetch.

When you use a query (e.g., via the `useQuery` hook), TanStack Query will:

1.  Check if data for the given `queryKey` exists in the cache.
2.  If cached data exists and is considered fresh, it returns the cached data immediately.
3.  If cached data is stale or doesn't exist, it calls your `queryFn` to fetch new data.
4.  While fetching, it provides loading and status indicators.
5.  Once data is fetched successfully, it caches it using the `queryKey` and returns the data.
6.  If the fetch fails, it provides error information.

This basic model, combined with its powerful features, forms the foundation of server state management with TanStack Query.

> [!TIP]
> TanStack Query is highly configurable. The default settings for caching and refetching are sensible for many applications, but you can customize them per query or globally on the `QueryClient` instance to fit your specific needs.

> 📚 **Official Documentation:**
>
> - [TanStack Query - Introduction (Overview)](https://tanstack.com/query/v5/docs/react/overview)
> - [Why Use TanStack Query?](https://tanstack.com/query/v5/docs/react/overview#why-use-tanstack-query)
> - [TanStack Query - Installation](https://tanstack.com/query/v5/docs/react/installation)
> - [TanStack Query - Important Defaults](https://tanstack.com/query/v5/docs/react/important-defaults)
> - [TanStack Query - Core Concepts (Queries)](https://tanstack.com/query/v5/docs/react/guides/queries)
> - [Migrating to TanStack Query v5 (Official Guide)](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5) (Helpful if familiar with v4)

With this introduction and setup in place, we are now ready to explore how to actually fetch data using TanStack Query's core hook, `useQuery`.

### Next Steps

In the next section, we'll dive into the core concepts of TanStack Query, focusing on how to define and use queries with the `useQuery` hook, handle mutations with `useMutation`, and understand the role of the `QueryClient`.
