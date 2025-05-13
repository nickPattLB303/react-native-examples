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

- **Declarative Hooks:** Provides custom React Hooks like `useQuery` (for fetching data) and `useMutation` (for creating, updating, or deleting data) that abstract away the complexities of data fetching logic.
- **Automatic Caching:** Caches query results in memory. You can configure cache times (`staleTime`, `gcTime` formerly `cacheTime`) to control how long data is considered fresh and how long it's kept in the cache after becoming inactive.
- **Background Updates & Refetching:** Automatically re-fetches stale data when:
  - A component using a query mounts.
  - The network reconnects.
  - The application window (or screen in React Native) is refocused by the user (configurable).
  - You can also configure polling (refetching on an interval).
- **Devtools:** Comes with its own Devtools (TanStack Query Devtools) that allow you to inspect cached data, query states, and manually trigger actions, making debugging server state incredibly easy. For React Native, you can integrate these Devtools to run in a browser.
- **Mutations and Optimistic Updates:** Provides a clean way to handle data mutations (POST, PUT, DELETE requests) and to implement optimistic updates for a smoother user experience.
- **Pagination and Infinite Scrolling:** Offers dedicated hooks and patterns (`useInfiniteQuery`) to simplify the implementation of pagination and infinite scrolling features.
- **SSR and SSG Support:** While more relevant for web, its core is framework agnostic, and it has excellent support for Server-Side Rendering and Static Site Generation in web frameworks.
- **TypeScript Support:** Written in TypeScript, offering excellent type safety for your queries and mutations.
- **Protocol Agnostic:** You can use it with any asynchronous data fetching method (Fetch API, Axios, GraphQL clients like Apollo or urql, or even direct `AsyncStorage` calls if you treat them as async data sources).

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
    const queryClient = new QueryClient();

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

    - `new QueryClient()`: This creates an instance of the query client. The client is responsible for managing the cache and all the queries within your application. You typically create only one instance of `QueryClient` for your entire app.
    - `<QueryClientProvider client={queryClient}>`: This component makes the `queryClient` instance available to all descendant components that use TanStack Query's hooks (like `useQuery` or `useMutation`).

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
> - [TanStack Query - Introduction](https://tanstack.com/query/v5/docs/react/overview)
> - [TanStack Query - Installation](https://tanstack.com/query/v5/docs/react/installation)
> - [TanStack Query - Important Defaults](https://tanstack.com/query/v5/docs/react/important-defaults)
> - [TanStack Query - Core Concepts (Queries)](https://tanstack.com/query/v5/docs/react/guides/queries)

With this introduction and setup in place, we are now ready to explore how to actually fetch data using TanStack Query's core hook, `useQuery`.

### Next Steps

In the next section, we'll dive into the core concepts of TanStack Query, focusing on how to define and use queries with the `useQuery` hook, handle mutations with `useMutation`, and understand the role of the `QueryClient`.
