## Section 9: Caching and Background Updates with TanStack Query

One of the most powerful aspects of TanStack Query is its sophisticated caching mechanism and its ability to keep your data synchronized with the server through intelligent background updates. These features work together to provide a responsive user experience while minimizing unnecessary network requests and ensuring data freshness in your SpeedyMeds application.

### Deep Dive into Caching

TanStack Query uses an in-memory cache to store the data fetched by your queries. The `queryKey` you provide to `useQuery` serves as the unique identifier for that data within the cache.

Two crucial configuration options determine how TanStack Query handles cached data:

1.  **`staleTime`**: This option defines how long fetched data is considered "fresh." When a query result is fresh, TanStack Query will use the cached data without attempting a network request, even if a component using that query re-mounts or its `queryKey` remains the same.

    - **Default:** `0` milliseconds. This means data is considered stale immediately by default.
    - **Behavior:** Once `staleTime` has elapsed since the data was last fetched (i.e., `Date.now() > dataUpdatedAt + staleTime`), the data becomes "stale." Stale data is still served immediately from the cache for a fast UI response. However, if the query associated with the stale data is actively being observed (i.e., a component using `useQuery` for that key is mounted), TanStack Query will trigger a background refetch to get potentially updated data.
    - **"Under the Hood":** TanStack Query stores a `dataUpdatedAt` timestamp with each cache entry. When a query instance becomes active, it compares `Date.now()` with `dataUpdatedAt + staleTime`. If `Date.now()` is less than this sum, the data is fresh; otherwise, it's stale.
    - **Usage:** For data that doesn't change frequently (e.g., a list of medical departments), a longer `staleTime` (e.g., `5 * 60 * 1000` for 5 minutes) can reduce network requests.

    ```tsx
    // Example: Setting staleTime for a query
    // const { data } = useQuery({
    //   queryKey: ['medicalDepartments'],
    //   queryFn: fetchMedicalDepartments,
    //   staleTime: 10 * 60 * 1000, // Data considered fresh for 10 minutes
    // });
    ```

2.  **`gcTime`** (Garbage Collection Time, formerly `cacheTime`):
    This option determines how long data remains in the cache _after all components using that query have unmounted_ (i.e., the query becomes inactive and its reference count drops to zero). Once `gcTime` expires for an inactive query, its data is garbage collected from the cache to free up memory.

    - **Default:** `5 * 60 * 1000` (5 minutes).
    - **Behavior:** When a query becomes inactive, a timer based on `gcTime` starts. If no component subscribes to that query again before the timer expires, the cached data for that query key is removed from memory. Setting `gcTime` to `Infinity` disables garbage collection for that query (not generally recommended for all queries).
    - **"Under the Hood":** The Query Cache maintains reference counts for each query key. When the count drops to zero, the `gcTime` timer begins for that cache entry.
    - **Usage:** If a user navigates away and quickly returns (within `gcTime`), cached data is likely still available for an immediate display (though it might be stale and trigger a background refetch). `gcTime` should generally be set to a value greater than or equal to `staleTime`.

    ```tsx
    // Example: Setting gcTime for a query
    // const { data } = useQuery({
    //   queryKey: ['patientArchive', patientId],
    //   queryFn: () => fetchArchivedPatientData(patientId),
    //   staleTime: 60 * 60 * 1000, // 1 hour (archived data rarely changes)
    //   gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours even if inactive
    // });
    ```

Understanding `staleTime` and `gcTime` is key to fine-tuning TanStack Query's caching behavior to match your application's data volatility and performance requirements. This sophisticated caching strategy allows developers to optimize for perceived performance (instant cache reads) while ensuring data eventually becomes consistent and unused data is cleaned up.

### How Data is Served from Cache

When `useQuery` is mounted or its `queryKey` changes:

1.  TanStack Query checks the cache for data associated with the `queryKey`.
2.  **If data exists in the cache:**
    - It checks if the data is fresh (`Date.now() < dataUpdatedAt + staleTime`).
    - **If fresh:** The cached data is returned immediately. No network request is made. `status` is `'success'`, `isFetching` is `false`.
    - **If stale:** The stale cached data is returned immediately. A background refetch is triggered if the query is active. `status` is `'success'`, `isFetching` becomes `true` during the refetch, and the UI updates again when the refetch completes with new data or an error.
3.  **If no data exists in the cache:**
    - The query enters the `'pending'` state (`isPending` is `true`, `isFetching` is `true`).
    - The `queryFn` is executed to fetch data from the server.
    - Once the fetch completes, the data is stored in the cache, and the component updates with `status: 'success'` and the data, or `status: 'error'` and the error.

### Background Data Synchronization Strategies

TanStack Query employs several strategies to automatically keep your cached data synchronized with the server in the background, ensuring that users see up-to-date information without manual intervention.

1.  **`refetchOnMount`**:

    - **Behavior:** When a component using a specific query mounts, TanStack Query checks if the data for that query is stale (i.e., older than its `staleTime`). If it is stale, the query will be automatically re-fetched.
    - **Default:** `true`.
    - **Benefit:** Ensures that when a user navigates to a screen, they are likely to see fresh data, especially if the default `staleTime` of `0` is used.
    - **Configuration:** Can be set globally or per query.

2.  **`refetchOnWindowFocus`**:

    - **Behavior:** When the application window (or screen in React Native) regains focus after being in the background or unfocused, TanStack Query will automatically re-fetch stale queries.
    - **Default:** `true`.
    - **Benefit:** This is incredibly useful for data that might change while the user is not actively using your app (e.g., new messages, updated order statuses in SpeedyMeds). When they return, the data is silently updated.
    - **Configuration:** Can be set globally or per query.

    ```tsx
    // Example: Disabling refetchOnWindowFocus for a specific query
    // useQuery({
    //   queryKey: ['userSettings'],
    //   queryFn: fetchUserSettings,
    //   refetchOnWindowFocus: false, // User settings rarely change in the background
    // });
    ```

3.  **`refetchOnReconnect`**:

    - **Behavior:** If the device loses network connectivity and then reconnects, TanStack Query will automatically re-fetch stale queries.
    - **Default:** `true`.
    - **Benefit:** Helps ensure data consistency after network interruptions, which are common in mobile environments.
    - **Configuration:** Can be set globally or per query.

4.  **Polling with `refetchInterval`**:

    - **Behavior:** You can configure a query to re-fetch data at a specified interval, regardless of other conditions. This is known as polling.
    - **Default:** `false` (no polling).
    - **Benefit:** Useful for data that updates very frequently on the server and needs to be near real-time, without relying on WebSockets (e.g., live stock prices, real-time tracking information, or perhaps rapidly changing queue status in a virtual pharmacy waiting room).
    - **`refetchIntervalInBackground`**: A related option (`false` by default) determines if polling continues even when the app window is not focused.

    ```tsx
    // Example: Polling for pharmacy waiting list updates every 30 seconds
    // useQuery({
    //   queryKey: ['pharmacyWaitingList', pharmacyId],
    //   queryFn: () => fetchWaitingList(pharmacyId),
    //   refetchInterval: 30 * 1000, // 30 seconds
    //   // refetchIntervalInBackground: true, // Optional: continue polling in background
    // });
    ```

> [!CAUTION]
> Be mindful when using polling (`refetchInterval`). Frequent polling can increase network usage and server load. Use it judiciously for data that genuinely requires near real-time updates and where other mechanisms like push notifications or WebSockets are not feasible.

### Benefits for SpeedyMeds

These caching and background update features provide significant benefits for an application like SpeedyMeds:

- **Responsiveness:** Users see cached data immediately while fresh data loads in the background, making the app feel faster.
- **Data Freshness:** Automatic re-fetching on focus or reconnect helps ensure that critical information like medication availability, prescription status, or appointment times are kept reasonably up-to-date without requiring the user to manually refresh.
- **Reduced Boilerplate:** You don't have to write manual `useEffect` hooks with complex logic to handle these refetching scenarios; TanStack Query manages it for you.
- **Offline Resilience (Partial):** While TanStack Query itself is not a full offline solution (it doesn't handle mutations while offline without extra setup), its caching means that previously fetched data is available even if the network is temporarily unavailable, improving the user experience in spotty connectivity.

By intelligently combining `staleTime`, `gcTime`, and the various `refetchOn...` options, you can create a robust data synchronization strategy tailored to the specific needs of different data types within your SpeedyMeds application.

### Table: TanStack Query Caching and Refetching Options

| Option                        | Default       | Description                                                                           | Impact on Behavior                                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `staleTime`                   | `0`           | Duration (ms) data is considered fresh after fetch.                                   | Prevents background refetches while data is fresh. `0` means data is always stale.  |
| `gcTime`                      | `300000` (5m) | Duration (ms) inactive cached data is kept before garbage collection.                 | Controls memory usage by removing unused data. Should generally be `>= staleTime`.  |
| `refetchOnMount`              | `true`        | Refetch stale query when a new instance mounts.                                       | Ensures component gets fresh data on mount if cached data is stale.                 |
| `refetchOnWindowFocus`        | `true`        | Refetch stale query on window/app focus.                                              | Updates data when user returns to the app. Requires FocusManager setup in RN.       |
| `refetchOnReconnect`          | `true`        | Refetch stale query on network reconnection.                                          | Updates data after network interruptions. Requires OnlineManager setup in RN.       |
| `refetchInterval`             | `false`       | Interval (ms) for automatic polling, or `false` to disable.                           | Continuously updates data at a fixed frequency (e.g., for real-time dashboards).    |
| `refetchIntervalInBackground` | `false`       | If `refetchInterval` is set, determines if polling continues when app is not focused. | Can keep data fresh even in background, but use with caution on mobile for battery. |

> 📚 **Official Documentation:**
>
> - [TanStack Query - Caching](https://tanstack.com/query/v5/docs/react/guides/caching)
> - [TanStack Query - `staleTime` and `gcTime`](https://tanstack.com/query/v5/docs/react/guides/important-defaults) (covers `staleTime` and `gcTime` as important defaults)
> - [TanStack Query - Background Fetching Indicators (`isFetching`)](https://tanstack.com/query/v5/docs/react/guides/background-fetching-indicators)
> - [TanStack Query - Window Focus Refetching](https://tanstack.com/query/v5/docs/react/guides/window-focus-refetching)
> - [TanStack Query - Polling / `refetchInterval`](https://tanstack.com/query/v5/docs/react/guides/polling)

### Next Steps

Understanding caching and background updates is crucial for leveraging TanStack Query's power. Next, we'll focus on how to handle data modifications using mutations and how to effectively update your cached data after these mutations occur to keep your UI consistent.
