---
marp: true
theme: default
paginate: true
---

# **Mastering State Management & Data Flow in SpeedyMeds**
## Leveraging React Query, Zustand, and Faker.js

**Presenter:** Roo
**Date:** April 9, 2025

<!-- presenter notes
Welcome everyone. Today we'll dive deep into the core libraries managing data and state in the SpeedyMeds React Native project: TanStack Query (React Query) for server state, Zustand for global client state, and Faker.js for mock data generation. We'll explore *why* these tools were chosen, *how* they are implemented in SpeedyMeds, and *how they work together*. The goal is to equip you with the knowledge to confidently navigate and contribute to the project's data layer. We'll look at real code examples and discuss best practices. This session aims to be comprehensive enough for about an hour.
-->

---

# **What We'll Cover**

*   Introduction: The "Why" - Challenges in Mobile App Data Management
*   Faker.js: Powering Realistic Development Data
*   React Query (TanStack Query): Taming Server State
*   Zustand: Simplifying Global Client State
*   The Big Picture: How They Interact in SpeedyMeds (Data Flow)
*   Code Deep Dive: Key Files and Patterns
*   Best Practices & Alternatives
*   Q&A

<!-- presenter notes
Here's our roadmap for the session. We'll start with the context – the common challenges these libraries help solve. Then, we'll tackle each library individually, focusing on its role and implementation within SpeedyMeds. A key part will be understanding the data flow – how information moves from mock generation or simulated fetching through to our UI components. We'll pinpoint specific files and code patterns you'll encounter. Finally, we'll touch upon best practices and briefly mention alternatives before opening up for questions. Let's get started.
-->

---

# **Challenges in Mobile App Data Management**

*   **Server State:** Fetching, caching, background updates, handling loading/error states, avoiding redundant requests. How do we efficiently get data from the backend and keep it fresh without overwhelming the network or the UI?
*   **Client State:** Sharing state between screens/components (avoiding prop drilling), managing UI state (themes, modals), keeping state synchronized. How do we manage data created or needed *within* the app itself?
*   **Development Data:** Need for realistic data *before* backend is ready, testing edge cases, consistent development environments. How can we build the UI effectively when the API isn't available yet?

<!-- presenter notes
Before diving into the tools, let's consider the problems they solve. Managing data fetched from APIs (server state) is complex – caching, keeping it fresh, handling errors gracefully, and showing loading states are all vital. Separately, we need to manage state *within* the app itself – user preferences, UI toggles, data shared across screens. Passing this client state around can get messy (prop drilling). Lastly, during development, we often need realistic data to build against, even without a live API. These are the core challenges SpeedyMeds addresses with our chosen libraries: React Query for server state, Zustand for client state, and Faker.js for development data.
-->

---

# **Faker.js: Realistic Mock Data Generation**

*   **What:** Library to generate massive amounts of fake data for testing and development.
*   **Why:**
    *   Enables frontend development without backend dependency.
    *   Facilitates testing various data scenarios (long names, different formats, edge cases).
    *   Provides consistent mock data for predictable development.
*   **In SpeedyMeds:** Used to simulate API responses for user profiles, prescriptions, orders, etc., primarily within `SpeedyMeds/src/api/mockData.ts`.

<!-- presenter notes
First up is Faker.js. Its purpose is straightforward: create fake, but realistic-looking, data. Think names, addresses, dates, numbers, UUIDs, and much more. In SpeedyMeds, this is crucial. It allows us to build and test UI components that consume API data *before* the actual API endpoints exist or are stable. It's located in our `devDependencies` (see `SpeedyMeds/package.json`) because it's not needed in the production build. We use it within our simulated API functions located in `SpeedyMeds/src/api/mockData.ts` to generate the data structures defined in `SpeedyMeds/src/types`.
-->

---

# **Faker.js in Action: `api/mockData.ts`**

*   Specific locale import: `import { fakerEN as faker } from "@faker-js/faker";` (performance).
*   Generator functions (e.g., `generateMockUserProfile`, `generateMockPrescriptions`).
*   Uses various modules: `faker.location`, `faker.person`, `faker.date`, `faker.string`, `faker.number`, `faker.helpers`.
*   Includes "Mockup Consistency Logic" to ensure specific examples appear.
*   Type safety via imported TypeScript types from `../types`.
*   **Link:** [`SpeedyMeds/src/api/mockData.ts`](SpeedyMeds/src/api/mockData.ts)

```typescript
// Example: Generating a mock address
import { fakerEN as faker } from "@faker-js/faker";
import type { Address } from "../types";

const generateMockAddress = (): Address => ({
  // `faker.location.streetAddress()` -> '123 Main St'
  street: faker.location.streetAddress(),
  // `faker.location.city()` -> 'Anytown'
  city: faker.location.city(),
  // `faker.location.state({ abbreviated: true })` -> 'CA'
  state: faker.location.state({ abbreviated: true }),
  // `faker.location.zipCode()` -> '90210'
  zip: faker.location.zipCode(),
});
```

<!-- presenter notes
Let's look at the code in `SpeedyMeds/src/api/mockData.ts`. Notice the specific import `fakerEN` – this helps keep our app bundle smaller by only including the English language data. The file defines functions like `generateMockAddress`, shown here. It uses various Faker modules like `faker.location` to get realistic street addresses, cities, states, and zip codes. Other functions use `faker.person` for names, `faker.date` for dates (like birthdates or past order dates), `faker.string` for IDs (UUIDs, numeric strings), and `faker.number` for quantities or amounts (like balances or days supply). `faker.helpers.arrayElement` is handy for picking random items from predefined lists (like drug names or order statuses). An interesting pattern is the "Mockup Consistency Logic" – this hardcodes specific data points seen in UI mockups, making visual testing easier by ensuring predictable data for key items. Importantly, we import our TypeScript types (`Address`, `UserProfile`, etc. from `SpeedyMeds/src/types/index.ts`) to ensure the generated data matches what the rest of the app expects. This file is the foundation for our simulated API responses during development, used by functions in `SpeedyMeds/src/api/index.ts`.
-->

---

# **React Query (TanStack Query v5): Taming Server State**

*   **What:** Powerful library for fetching, caching, synchronizing, and updating **server state** in React applications.
*   **Why:** Simplifies data fetching logic, handles caching automatically, manages loading/error states, provides background updates & refetching, reduces boilerplate code. Solves many complexities of interacting with APIs.
*   **Core Concepts:**
    *   Queries (`useQuery`): For fetching data.
    *   Mutations (`useMutation`): For creating/updating/deleting data (not used in init hook, but important).
    *   Query Keys: Unique identifiers for data in the cache.
    *   Caching: Stores fetched data to avoid unnecessary requests.
    *   `staleTime`: How long fetched data is considered fresh.
    *   `cacheTime`: How long inactive data stays in the cache.

<!-- presenter notes
Now, let's talk about server state – data that lives on a server and we fetch via API. TanStack Query (the latest version of React Query, version 5 in our project - see `SpeedyMeds/package.json`) is our tool for this. It's much more than just a fetching library. It provides intelligent caching, automatic background refetching (e.g., on window focus or reconnect), state management for loading and errors, request deduplication, and much more, drastically simplifying how we interact with APIs. Key concepts we'll see are `useQuery` for fetching data, query keys for identifying data in the cache, and configurations like `staleTime` (how long data is fresh) and `cacheTime` (how long it stays in memory after becoming inactive).
-->

---

# **React Query in Action: `hooks/useInitializeAppData.ts`**

*   Centralized fetching hook: `useInitializeAppData`.
*   Uses `useQuery` for initial data loads (profile, reminders, prescriptions, orders).
*   Defines `queryKey` (from `SpeedyMeds/src/api/queryKeys.ts`) for caching & identification.
*   Uses `queryFn` (calls functions in `SpeedyMeds/src/api/index.ts`, which use mock data).
*   Configures `staleTime` per query (e.g., `Infinity` for profile, 5-10 mins for others).
*   **Link:** [`SpeedyMeds/src/hooks/useInitializeAppData.ts`](SpeedyMeds/src/hooks/useInitializeAppData.ts)
*   **Link:** [`SpeedyMeds/src/api/queryKeys.ts`](SpeedyMeds/src/api/queryKeys.ts)

```typescript
// Example: useQuery for User Profile
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { fetchUserProfile } from "../api";
import type { UserProfile } from "../types";

// Inside useInitializeAppData hook:
const {
  data: userProfile, // Fetched data (UserProfile | undefined)
  isFetching: isFetchingProfile, // Is query fetching? (incl. background)
  error: errorProfile, // Error object or null
}: UseQueryResult<UserProfile, Error> = useQuery({
  queryKey: queryKeys.userProfile, // ['userProfile']
  queryFn: fetchUserProfile, // Async function to get data
  staleTime: Infinity, // Data never considered stale automatically
});
```

<!-- presenter notes
In SpeedyMeds, the primary use of React Query for initial global data is centralized in the `useInitializeAppData` custom hook (`SpeedyMeds/src/hooks/useInitializeAppData.ts`). Look at this example fetching the user profile. We provide a `queryKey`, imported from `SpeedyMeds/src/api/queryKeys.ts` – using a central file for keys is a best practice for consistency and avoiding typos. The `queryFn` is the actual async function that fetches the data (here, `fetchUserProfile`, which currently gets mock data from `SpeedyMeds/src/api/index.ts`). Notice `staleTime: Infinity` – this tells React Query the user profile data, once fetched successfully, never becomes stale automatically. This is suitable for data that rarely changes. Other queries in this hook (for reminders, prescriptions, orders) use shorter `staleTime` values (like 5 or 10 minutes), meaning React Query might refetch them in the background if the app refocuses or the component remounts after that time. The hook destructures `data`, `isFetching` (true during initial load *and* background refetches), and `error` from the `useQuery` result. This hook *doesn't* return the data directly; its job is to trigger these fetches and then update our *client* state management solution, Zustand.
-->

---

# **Zustand: Minimalist Global Client State**

*   **What:** A small, fast, and scalable **client state** management solution using simplified flux principles. Unopinionated and hook-based.
*   **Why:**
    *   Simple API, minimal boilerplate.
    *   Manages global state accessible anywhere.
    *   Performs well (selective subscriptions via selectors).
    *   Integrates easily with React hooks.
    *   Good alternative to Redux or Context API for many use cases.
*   **Core Concepts:**
    *   Store: A single object holding state and actions.
    *   `create`: Function to build the store.
    *   `set`: Function used *inside* actions to update state immutably.
    *   Hook-based access: `create` returns a hook (e.g., `useAppDataStore`).
    *   Selectors: Functions passed to the hook to subscribe to specific state slices.

<!-- presenter notes
While React Query handles server state, we still need to manage state that's local to the application – things like UI state (theme settings, modal visibility), or data fetched from the server that needs to be easily accessible across many components without prop drilling. This is where Zustand comes in (version 5 in our project - see `SpeedyMeds/package.json`). It's a lightweight global state manager for client state. Think of it as a single store holding our application's client-side state. We use a hook generated by Zustand's `create` function to access it. Crucially, we can (and should) use selectors – functions passed to the hook – to ensure components only re-render when the specific piece of state they care about changes. It avoids the complexity of Redux boilerplate or the performance pitfalls of naive Context API usage.
-->

---

# **Zustand in Action: `stores/appDataStore.ts`**

*   Defines `AppDataState` interface (state shape + actions).
*   Uses `create<AppDataState>((set) => ({ ... }))` to build the store.
*   Initializes state (e.g., `userProfile: null`, `isLoading: true`).
*   Defines actions (e.g., `setUserProfile`, `setLoading`, `setError`) that use `set` to update state.
*   Exports the `useAppDataStore` hook for components.
*   **Link:** [`SpeedyMeds/src/stores/appDataStore.ts`](SpeedyMeds/src/stores/appDataStore.ts)

```typescript
import { create } from "zustand";
import type { Prescription, UserProfile } from "../types";

// Interface defines shape
export interface AppDataState {
  userProfile: UserProfile | null;
  prescriptions: Prescription[];
  isLoading: boolean;
  error: Error | null;
  setUserProfile: (profile: UserProfile) => void;
  setPrescriptions: (prescriptions: Prescription[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

// Store creation
const useAppDataStore = create<AppDataState>((set) => ({
  // Initial state
  userProfile: null,
  prescriptions: [],
  isLoading: true,
  error: null,
  // Action implementations
  setUserProfile: (profile) => set({ userProfile: profile }),
  setPrescriptions: (prescriptions) => set({ prescriptions: prescriptions }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error, isLoading: false }), // Also sets loading false on error
}));

export default useAppDataStore;
```

<!-- presenter notes
The heart of our Zustand implementation is `SpeedyMeds/src/stores/appDataStore.ts`. First, we define the `AppDataState` TypeScript interface – this clearly documents everything the store holds (like `userProfile`, `prescriptions`, `isLoading`, `error`) and the functions (actions) available to change it (`setUserProfile`, `setPrescriptions`, etc.). This provides type safety. Then, we use Zustand's `create` function, passing our interface as a generic type. `create` takes a function that receives `set` as an argument. Inside, we return an object containing: 1) the initial state values (`userProfile: null`, `prescriptions: []`, `isLoading: true`, `error: null`), and 2) the implementation of our actions. Actions are just functions that call the `set` function provided by Zustand. You pass `set` an object containing the state slices you want to change. Zustand handles merging this into the existing state immutably (creating a new state object). For example, `setPrescriptions` takes an array and calls `set({ prescriptions: prescriptions })`. Note that `setError` also sets `isLoading` to false. Finally, `create` returns the custom hook, `useAppDataStore`, which we export for components to use.
-->

---

# **Accessing Zustand State in Components**

*   Import the hook: `import useAppDataStore from "../stores/appDataStore";`
*   **Pattern 1: Selectors (Preferred for Performance)**
    *   Subscribe to specific state slices. Component only re-renders if *that slice* changes.
    *   Example (`HomeScreen.tsx`, `PrescriptionsScreen.tsx`, `OrdersScreen.tsx`):
      ```typescript
      // Get only the needed data and loading/error states
      const prescriptions = useAppDataStore((state) => state.prescriptions);
      const isLoading = useAppDataStore((state) => state.isLoading);
      const error = useAppDataStore((state) => state.error);
      ```
*   **Pattern 2: Whole State (Simpler, Less Performant)**
    *   Access the entire state object. Component re-renders if *any* part changes.
    *   Example (`AccountScreen.tsx`):
      ```typescript
      // Get the whole state object and destructure
      const { userProfile, isLoading, error } = useAppDataStore();
      ```
*   **Links:** [`SpeedyMeds/src/screens/HomeScreen.tsx`](SpeedyMeds/src/screens/HomeScreen.tsx), [`SpeedyMeds/src/screens/AccountScreen.tsx`](SpeedyMeds/src/screens/AccountScreen.tsx)

<!-- presenter notes
How do our screens actually *use* the data in the Zustand store? They import the `useAppDataStore` hook we created. The preferred pattern, seen in `HomeScreen`, `OrdersScreen`, and `PrescriptionsScreen`, uses selectors. A selector is a function you pass to the hook, like `(state) => state.prescriptions`. This tells Zustand "I only care about the `prescriptions` part of the state." The component will *only* re-render if `prescriptions` changes, even if other parts of the store (like `userProfile`) are updated. This is crucial for performance, especially as the store grows. You can select multiple values this way by calling the hook multiple times with different selectors. The second pattern, seen in `AccountScreen`, calls the hook without a selector: `useAppDataStore()`. This returns the *entire* state object, which is then destructured (`const { userProfile, isLoading, error } = ...`). While slightly simpler to write initially, it means the `AccountScreen` will re-render if *any* part of the `appDataStore` changes (e.g., if `orders` are updated), which might be unnecessary. Use selectors whenever possible for better performance.
-->

---

# **Data Flow: Connecting the Dots**

```mermaid
graph LR
    A[App Load / Component Mount] --> B(useInitializeAppData Hook);
    B -- Triggers --> C{useQuery (React Query)};
    C -- Calls --> D[API Functions (api/index.ts)];
    D -- Uses --> E[mockData.ts (Faker.js)];
    D -- Returns Mock Data --> C;
    C -- Returns --> F[Data, isFetching, Error];
    B -- useEffect observes --> F;
    B -- Calls Actions (setProfile, setLoading...) --> G[Zustand Store (appDataStore)];
    G -- Updates --> H{Global State};
    I[UI Screens (e.g., HomeScreen)] -- Subscribes via --> J(useAppDataStore Hook w/ Selectors);
    J -- Reads --> H;
    I -- Renders --> K[User Interface];

    style E fill:#ccf,stroke:#333,stroke-width:1px
    style C fill:#9cf,stroke:#333,stroke-width:2px
    style G fill:#9fc,stroke:#333,stroke-width:2px
    style B fill:#eee,stroke:#333,stroke-width:1px
    style J fill:#eee,stroke:#333,stroke-width:1px
```

<!-- presenter notes
Let's visualize how these pieces fit together in SpeedyMeds for the initial data load. When the app loads, the `useInitializeAppData` hook runs (likely called from `App.tsx`). This hook uses React Query (`useQuery`) to initiate data fetching for profile, prescriptions, etc. `useQuery` calls our API functions (defined in `SpeedyMeds/src/api/index.ts`). Currently, these API functions use `SpeedyMeds/src/api/mockData.ts` (powered by Faker.js) to generate and return mock responses. React Query manages the fetching process, caching, and returns the data, loading status (`isFetching`), and any errors back to the `useInitializeAppData` hook. Inside `useInitializeAppData`, `useEffect` hooks observe these results. Based on the results, the hook calls the appropriate action functions (like `setPrescriptions`, `setLoading`, `setError`) on our Zustand store (`appDataStore`). The Zustand store updates its internal global state. Finally, our UI screens (like `HomeScreen`) subscribe to the Zustand store using the `useAppDataStore` hook, ideally with selectors. When the relevant state in Zustand changes, the components re-render to display the updated information, loading indicators, or error messages to the user. This architecture decouples fetching from components and centralizes global state management.
-->

---

# **Key Files & Responsibilities Review**

*   `SpeedyMeds/src/api/mockData.ts`:
    *   **Role:** Faker.js implementation, generates mock data structures.
*   `SpeedyMeds/src/api/index.ts`:
    *   **Role:** (Implicit) Simulated API fetch functions (calls generators in `mockData.ts`).
*   `SpeedyMeds/src/api/queryKeys.ts`:
    *   **Role:** Centralized definitions for React Query cache keys.
*   `SpeedyMeds/src/hooks/useInitializeAppData.ts`:
    *   **Role:** Central React Query fetching logic for global data, synchronizes results to Zustand via `useEffect`.
*   `SpeedyMeds/src/stores/appDataStore.ts`:
    *   **Role:** Zustand store definition (state interface, initial state, actions), exports `useAppDataStore` hook.
*   `SpeedyMeds/src/screens/*.tsx`:
    *   **Role:** UI components consuming global state from `useAppDataStore`.

<!-- presenter notes
To recap, these are the essential files involved in this data flow. `mockData.ts` is where Faker lives, creating our fake data. The (implied) `api/index.ts` contains the async functions that `useQuery` calls, which currently return the mock data. `queryKeys.ts` keeps our React Query cache keys organized and consistent. `useInitializeAppData.ts` is the crucial bridge, orchestrating the React Query fetches and pushing the results into Zustand using `useEffect`. `appDataStore.ts` *is* the Zustand store, defining the state shape and actions. And finally, the screen components are the consumers, reading data from the Zustand store via the `useAppDataStore` hook to render the UI. Understanding the responsibility of each file is key to navigating this part of the codebase.
-->

---

# **Best Practices & Alternatives**

*   **React Query:**
    *   Use descriptive, structured `queryKeys` (arrays recommended).
    *   Configure `staleTime`/`cacheTime` thoughtfully based on data volatility.
    *   Centralize keys (`queryKeys.ts`).
    *   Use `useMutation` for data updates (POST/PUT/DELETE).
    *   Leverage `QueryClientProvider` at the app root.
*   **Zustand:**
    *   Use selectors for performance (`useAppDataStore(state => state.slice)`).
    *   Keep store slices logical; avoid monolithic stores if complexity grows.
    *   Define actions for all state changes; don't mutate state directly.
    *   Use TypeScript interfaces/types for state and actions.
    *   Consider middleware (e.g., `persist` for storage, `devtools` for debugging).
*   **Faker.js:** Import specific locales (`fakerEN`), keep generation logic separate.
*   **Architecture:** Centralizing initial fetches (`useInitializeAppData`) is good for global data. Components can fetch their *own* specific data using `useQuery` directly if needed (e.g., `OrderDetailScreen` could fetch details for one order).
*   **Alternatives:**
    *   Client State: Redux Toolkit, Jotai, Valtio, Recoil, React Context API.
    *   Server State: SWR, Apollo Client (GraphQL), RTK Query.

<!-- presenter notes
Some key takeaways and best practices observed or recommended: Always use clear, structured query keys with React Query (arrays are common, e.g., `['orders', orderId]`) and think about your caching strategy (`staleTime`, `cacheTime`). For Zustand, selectors are crucial for performance in most cases. Keep your store organized and always update state via defined actions. The pattern of using a dedicated hook like `useInitializeAppData` to sync React Query fetches to Zustand works well for global data, but remember, components *can* still use `useQuery` directly for screen-specific data not needed globally. While these libraries work well here, be aware of alternatives like Redux Toolkit (more boilerplate but powerful devtools/middleware) for client state or SWR (similar to React Query) for server state, each with its own trade-offs.
-->

---

# **Q&A**

## Questions?

<!-- presenter notes
We've covered a lot about how SpeedyMeds handles data fetching, client state, and mock data using React Query, Zustand, and Faker.js. We looked at the core concepts, the specific implementation in our codebase, the data flow, and some best practices. Now is the time for any questions you might have about the implementation details, the concepts we discussed, why certain choices were made, potential improvements, testing strategies, or anything else related to this topic. Don't hesitate to ask!
-->

---

# **Thank You & Resources**

*   **React Query Docs:** [https://tanstack.com/query/v5/docs/react/overview](https://tanstack.com/query/v5/docs/react/overview)
*   **Zustand Docs:** [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
*   **Faker.js Docs:** [https://fakerjs.dev/](https://fakerjs.dev/)
*   **SpeedyMeds Codebase:**
    *   [`SpeedyMeds/src/hooks/useInitializeAppData.ts`](SpeedyMeds/src/hooks/useInitializeAppData.ts)
    *   [`SpeedyMeds/src/stores/appDataStore.ts`](SpeedyMeds/src/stores/appDataStore.ts)
    *   [`SpeedyMeds/src/api/mockData.ts`](SpeedyMeds/src/api/mockData.ts)
    *   [`SpeedyMeds/src/api/queryKeys.ts`](SpeedyMeds/src/api/queryKeys.ts)

<!-- presenter notes
Thank you for your time and attention. Hopefully, this session provided a clear understanding of the data management strategy in SpeedyMeds using this combination of libraries. Here are links to the official documentation for each library – they are excellent resources for diving deeper into specific features or APIs. I've also included direct links to the key files we discussed within the SpeedyMeds project structure for easy reference. Feel free to explore the codebase further to solidify your understanding. If you have more questions later, don't hesitate to reach out.
-->