## Section 03: Data Flow and State Management

Understanding how data flows through the SpeedyMeds application and how its state is managed is crucial for implementing features correctly. This project employs a combination of Zustand for global client-side state and TanStack Query for managing server-side state, including interactions with a mock API.

### Client-Side State Management with Zustand

Zustand is used for managing global client-side state that needs to be accessible across various parts of the application. This typically includes data like user preferences, theme settings (though the theme itself is managed by a separate `ThemeContext`), or application-wide flags that aren't directly tied to server data.

**The `appDataStore` (`src/stores/appDataStore.ts`):**

The primary client-side store in SpeedyMeds is `appDataStore.ts`. This store is designed to hold application data that is fetched once or changes infrequently, such as the user's profile information or other initial application settings loaded from the mock API.

**Key characteristics:**

- **Structure:** It defines a state shape (interface) and actions to update that state.
- **Access:** Components can subscribe to this store and react to state changes, or use selectors to pick specific pieces of state.
- **Example Usage (Conceptual):**

  ```typescript
  // Inside a component
  import { useAppDataStore } from "../stores/appDataStore"; // Adjust path as needed

  const MyComponent = () => {
    const userProfile = useAppDataStore((state) => state.userProfile);
    const isLoading = useAppDataStore((state) => state.isLoadingInitially);

    if (isLoading) {
      return <LoadingIndicator />;
    }

    return <Text>Welcome, {userProfile?.firstName}</Text>;
  };
  ```

  This example demonstrates how a component might access `userProfile` and an `isLoadingInitially` flag from the `appDataStore`. The actual implementation details are in `src/stores/appDataStore.ts`.

> [!TIP]
> Explore `src/stores/appDataStore.ts` to see the exact state structure and actions defined. Notice how it might include initial states and functions to update them.

### Server-Side State Management with TanStack Query

TanStack Query (formerly React Query) is the designated library for managing server state. This involves fetching, caching, synchronizing, and updating data from an API. In SpeedyMeds, this API is simulated but treated as if it were a real backend.

**The API Layer (`src/api/`):**

- **`mockData.ts`**: Uses Faker.js to generate realistic-looking mock data for entities like users, prescriptions, orders, etc.
- **`index.ts` (in `src/api/`)**: Exports asynchronous functions that simulate API calls (e.g., `fetchUserProfile()`, `fetchOrders(userId)`, `fetchPrescriptions(userId)`). These functions often include a slight delay to mimic network latency.
- **Query Keys**: A convention for query keys (often in a `queryKeys.ts` file or defined alongside API functions) is used to uniquely identify and manage queries within TanStack Query's cache.

**Using TanStack Query Hooks:**

- **`useQuery`**: Used for fetching data. It handles caching, background refetching, and provides status states (loading, error, success).

  ```typescript
  // Conceptual example for fetching orders
  import { useQuery } from '@tanstack/react-query';
  import { fetchOrders } from '../api'; // Adjust path
  import { QUERY_KEYS } from '../api/queryKeys'; // Adjust path

  const OrdersScreen = () => {
    const userId = 'user-123'; // Example user ID
    const { data: orders, isLoading, isError, error } = useQuery({
      queryKey: [QUERY_KEYS.orders, userId],
      queryFn: () => fetchOrders(userId),
    });

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <ErrorDisplay message={error.message} />;

    return <FlatList data={orders} renderItem={...} />;
  };
  ```

- **`useMutation`**: Used for creating, updating, or deleting data. It provides helper functions to manage the mutation lifecycle and can be configured to invalidate relevant queries upon success, triggering automatic refetches.

> 📚 **Official Documentation:**
>
> - [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
> - [TanStack Query - Core Concepts](https://tanstack.com/query/v5/docs/react/guides/core-concepts)
> - [TanStack Query - Queries (`useQuery`)](https://tanstack.com/query/v5/docs/react/guides/queries)
> - [TanStack Query - Mutations (`useMutation`)](https://tanstack.com/query/v5/docs/react/guides/mutations)
> - [TanStack Query - Query Keys](https://tanstack.com/query/v5/docs/react/guides/query-keys)

### Initial Application Data Loading

On application startup, some initial data (like the user profile or a list of medication reminders) needs to be fetched and made available globally. The SpeedyMeds project handles this using a custom hook.

**`useInitializeAppData` Hook (`src/hooks/useInitializeAppData.ts`):**

This custom hook, likely called once in `App.tsx` or a top-level component, orchestrates the initial data fetching:

1.  It uses TanStack Query's `useQuery` (or perhaps `useQueries` for multiple initial fetches) to call the relevant mock API functions (e.g., `fetchUserProfile()`, `fetchMedicationReminders()`).
2.  Upon successful data retrieval by TanStack Query, it uses actions from the `appDataStore` (Zustand) to populate the global client-side store with this initial server data.
3.  It might also manage an `isLoadingInitially` flag within the `appDataStore` that can be used to show a global loading indicator or splash screen until essential data is ready.

This pattern separates the concern of fetching/caching server data (TanStack Query) from storing/accessing globally needed application data (Zustand).

### Overall Data Flow Diagram

The following diagram illustrates the general flow of data and state management within the SpeedyMeds application:

```mermaid
graph LR
    subgraph UI Layer
        ScreenComponent["Screen Component (e.g., HomeScreen)"]
        ReusableComponent["Reusable Component (e.g., PrescriptionCard)"]
    end

    subgraph State Management Layer
        ZustandStore["Zustand Store (`appDataStore`)"]
        TanStackQueryCache["TanStack Query (Cache & Hooks)"]
    end

    subgraph API Layer
        MockAPI["Mock API (`src/api/`)"]
        FakerJS["Faker.js (Generates Mock Data)"]
    end

    subgraph Initialization
        useInitializeAppData["`useInitializeAppData` Hook"]
    end

    UserInteraction["(User Interaction, e.g., Button Press)"] -- Triggers Action --> ScreenComponent
    ScreenComponent -- Reads/Updates --> ZustandStore
    ScreenComponent -- Uses Hook (e.g., `useQuery`) --> TanStackQueryCache
    ReusableComponent -- Reads --> ZustandStore
    ReusableComponent -- Uses Hook --> TanStackQueryCache

    TanStackQueryCache -- Fetches/Updates --> MockAPI
    MockAPI -- Uses --> FakerJS

    useInitializeAppData -- Uses Hook --> TanStackQueryCache
    useInitializeAppData -- Populates --> ZustandStore

    %% Styling for clarity
    classDef ui fill:#D6EAF8,stroke:#3498DB,stroke-width:2px;
    classDef state fill:#D1F2EB,stroke:#1ABC9C,stroke-width:2px;
    classDef api fill:#FCF3CF,stroke:#F1C40F,stroke-width:2px;
    classDef init fill:#FADBD8,stroke:#E74C3C,stroke-width:2px;

    class ScreenComponent,ReusableComponent ui;
    class ZustandStore,TanStackQueryCache state;
    class MockAPI,FakerJS api;
    class useInitializeAppData init;
```

**Diagram Explanation:**

This diagram shows the main layers and how they interact:

1.  **API Layer:** At the base, `Faker.js` generates mock data used by the `Mock API` in `src/api/`.
2.  **State Management Layer:**
    - `TanStack Query` interacts with the `Mock API` to fetch or update data. It maintains its own cache and provides hooks (`useQuery`, `useMutation`) for UI components to access and manipulate server state.
    - The `Zustand Store` (`appDataStore`) holds global client-side state. It can be populated by direct actions or, as in the initial load, by data fetched via TanStack Query.
3.  **Initialization:** The `useInitializeAppData` hook uses `TanStack Query` to fetch initial data from the `Mock API` and then populates the `Zustand Store`.
4.  **UI Layer:**
    - `Screen Components` and `Reusable Components` access data by:
      - Subscribing to the `Zustand Store` for global client state.
      - Using `TanStack Query` hooks for server state.
    - User interactions in the UI can trigger actions that update the Zustand store directly or initiate mutations via TanStack Query to update server data (which then reflects back in the cache and UI).

This architecture provides a clear separation of concerns: TanStack Query handles the complexities of server data (caching, refetching), while Zustand manages readily available global state for the UI.

> ⚛️ **(React Web Developers familiar with Redux or other complex state managers):**
>
> **Comparison:** Zustand offers a more lightweight and less boilerplate-heavy approach to global state compared to traditional Redux. Its hook-based API can feel more aligned with modern React patterns. TanStack Query, similarly, abstracts many complexities of data fetching that you might have handled manually or with libraries like `redux-thunk` or `redux-saga` for async operations.
>
> **Key Takeaway:** Embrace the simplicity of Zustand for client state. For server state, TanStack Query is quite powerful and declarative; focus on understanding query keys and how `useQuery` and `useMutation` manage the data lifecycle for you.
>
> **Source:** Check out the official documentation for both [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) and [TanStack Query](https://tanstack.com/query/v5/docs/react/overview) to see their core philosophies.

By understanding these state management strategies and the overall data flow, you'll be better equipped to implement features that correctly display, update, and persist data within the SpeedyMeds application.
