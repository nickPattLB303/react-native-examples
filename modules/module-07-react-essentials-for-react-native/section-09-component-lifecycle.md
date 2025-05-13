## Section 9: Component Lifecycle (`useEffect` Hook)

React components go through various phases from the time they are created and added to the UI until they are removed. This is known as the **component lifecycle**. In functional components, side effects (like data fetching, subscriptions, or manually changing the DOM in browser environments) are managed using the `useEffect` Hook.

### What are Side Effects?

Side effects are operations that a component performs that go beyond just rendering UI based on its props and state. Common examples include:

- Fetching data from an API.
- Setting up or cleaning up subscriptions (e.g., to timers, event listeners, or real-time data sources).
- Manually modifying native UI elements (though this is less common and often discouraged in React Native, it's a classic example of a side effect in web React with the DOM).
- Logging to the console.
- Saving data to local storage (`AsyncStorage` in React Native).

These operations don't fit directly into the rendering logic because they often need to happen _after_ React has updated the UI, or they involve interactions with systems outside of React.

### The `useEffect` Hook

The `useEffect` Hook allows you to perform side effects in your functional components. It takes two arguments:

1.  **A setup function:** This function contains the code for your side effect. React will run this function _after_ every completed render (by default).
2.  **An optional dependency array:** This array tells React when to re-run the setup function. If provided, `useEffect` will only re-run the effect if one of the values in the dependency array has changed since the last render.

```tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

interface PharmacyInfo {
  id: string;
  name: string;
  isOpen: boolean;
  operatingHours: string;
}

const PharmacyStatusDisplay: React.FC<{ pharmacyId: string }> = ({
  pharmacyId,
}) => {
  const [pharmacyInfo, setPharmacyInfo] = useState<PharmacyInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect for fetching pharmacy data
  useEffect(() => {
    console.log(`Effect running for pharmacyId: ${pharmacyId}`);
    setIsLoading(true);
    setError(null);

    // Simulate API call
    const fetchPharmacyData = async () => {
      try {
        // Replace with an actual API call in a real app
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
        let data: PharmacyInfo;
        if (pharmacyId === "pharma123") {
          data = {
            id: "pharma123",
            name: "SpeedyMeds Central Branch",
            isOpen: true,
            operatingHours: "9 AM - 9 PM",
          };
        } else if (pharmacyId === "pharma456") {
          data = {
            id: "pharma456",
            name: "SpeedyMeds North Outlet",
            isOpen: false,
            operatingHours: "10 AM - 6 PM (Closed Today)",
          };
        } else {
          throw new Error("Pharmacy not found");
        }
        setPharmacyInfo(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch pharmacy data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPharmacyData();

    // Optional: Cleanup function
    return () => {
      console.log(
        `Cleanup for pharmacyId: ${pharmacyId}. (E.g., cancel API request if component unmounts)`
      );
      // In a real scenario, you might abort a fetch request here if the component unmounts
      // or clear timers/subscriptions set up in the effect.
    };
  }, [pharmacyId]); // Dependency array: Re-run effect if pharmacyId changes

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!pharmacyInfo) {
    return <Text>No pharmacy information available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pharmacyName}>{pharmacyInfo.name}</Text>
      <Text style={pharmacyInfo.isOpen ? styles.openText : styles.closedText}>
        Status: {pharmacyInfo.isOpen ? "Open" : "Closed"}
      </Text>
      <Text>Hours: {pharmacyInfo.operatingHours}</Text>
    </View>
  );
};

// Example Usage
const PharmacyScreen: React.FC = () => {
  const [currentPharmacy, setCurrentPharmacy] = useState("pharma123");
  return (
    <View style={{ padding: 10 }}>
      <PharmacyStatusDisplay pharmacyId={currentPharmacy} />
      <Button
        title="Load North Outlet"
        onPress={() => setCurrentPharmacy("pharma456")}
      />
      <Button
        title="Load Central Branch"
        onPress={() => setCurrentPharmacy("pharma123")}
      />
      <Button
        title="Load Invalid Pharmacy"
        onPress={() => setCurrentPharmacy("invalid999")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  pharmacyName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  openText: { color: "green", marginBottom: 5 },
  closedText: { color: "red", marginBottom: 5 },
  loader: { marginTop: 20 },
  errorText: { color: "red", marginTop: 20, textAlign: "center" },
});

// Need to add a Button component if not already available in the scope, for example:
const Button: React.FC<{
  title: string;
  onPress: () => void;
  color?: string;
}> = ({ title, onPress, color }) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: color || "#2196F3",
      padding: 10,
      marginVertical: 5,
      borderRadius: 3,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>{title}</Text>
  </Pressable>
);

export default PharmacyScreen;
```

**Explanation:**

1.  **Data Fetching:** The `useEffect` Hook is used to fetch pharmacy data when the component mounts or when `pharmacyId` changes.
2.  **Dependency Array `[pharmacyId]`:**
    - This tells React to re-run the effect function (including the data fetch) **only if** the `pharmacyId` prop has changed since the last render.
    - If the dependency array was empty (`[]`), the effect would run only once after the initial render and clean up only when the component unmounts. This is suitable for one-time setup like global event listeners or initial data fetches that don't depend on props or state.
    - If the dependency array is **omitted entirely**, the effect runs after _every_ render. This can lead to performance issues or infinite loops if the effect itself triggers a state update that causes a re-render.
3.  **Cleanup Function (Optional):**
    - The function returned from the `useEffect` setup function is the cleanup function. React runs this function before re-running the effect due to dependency changes, and also when the component is unmounted (removed from the UI).
    - It's used to clean up any resources set up by the effect, like cancelling network requests, clearing timers (`clearInterval`, `clearTimeout`), or removing event listeners. This prevents memory leaks and unexpected behavior.
4.  **Loading and Error States:** The component manages `isLoading` and `error` states to provide feedback to the user during the data fetching process.

### `useEffect` Lifecycle Diagram

```mermaid
graph LR
    A[Component Mounts / Dependencies Change] --> B{Run Effect Setup Function};
    B -- Side Effect Occurs --> C{Optional: Return Cleanup Function};
    C -- If Returned --> D{React Stores Cleanup Function};
    E[Dependencies Change Again OR Component Unmounts] --> F{Run Stored Cleanup Function (if any)};
    F --> A;
    B -- No Cleanup Returned --> G[Effect Finished for this Render/Change];
    G --> E;
```

**Diagram Explanation:**

This diagram illustrates the flow of the `useEffect` Hook:

1.  **Component Mounts / Dependencies Change (`A`):** When the component is first added to the UI (mounts) or when any value in its dependency array changes, React prepares to run the effect.
2.  **Run Effect Setup Function (`B`):** React executes the main function you provided to `useEffect`. This is where your side effect logic (e.g., API calls, subscriptions) resides.
3.  **Optional: Return Cleanup Function (`C`):** Your setup function can optionally return another function. This is the cleanup function.
4.  **React Stores Cleanup Function (`D`):** If a cleanup function is returned, React stores it.
5.  **Dependencies Change Again OR Component Unmounts (`E`):**
    - If the component is about to re-run the effect because its dependencies changed, or if the component is about to be removed from the UI (unmount), React will first execute the stored cleanup function.
    - If the effect is re-running due to dependency changes, after cleanup, the process loops back to (`A`) to run the setup function again with the new dependencies.
    - If the component is unmounting, the lifecycle for this effect instance ends after cleanup.
6.  **Run Stored Cleanup Function (`F`):** The previously stored cleanup function is executed to clean up resources from the _previous_ run of the effect or before unmounting.
7.  **No Cleanup Returned / Effect Finished (`G`):** If the setup function doesn't return a cleanup function, or after the setup function completes, the effect is considered finished for that particular render cycle or dependency change. The component then waits for the next trigger (`E`).

The key is that cleanup from a _previous_ effect run happens _before_ the _next_ effect setup function runs.

### Controlling When `useEffect` Runs

- **Run after every render:** Omit the dependency array. (Use with caution!)
  ```javascript
  useEffect(() => {
    console.log("Component rendered or updated");
    // This runs after every single render
  });
  ```
- **Run only once after initial render (on mount):** Provide an empty dependency array `[]`.
  ```javascript
  useEffect(() => {
    console.log("Component did mount - for one-time setup");
    // Fetch initial data, set up global listeners
    return () => {
      console.log("Component will unmount - for cleanup");
      // Clean up global listeners
    };
  }, []); // Empty array means it only depends on nothing changing, so runs once
  ```
- **Run when specific values change:** Include those values in the dependency array.
  ```javascript
  useEffect(() => {
    console.log(`User ID or pharmacyId changed: ${userId}, ${pharmacyId}`);
    // Fetch data specific to userId or pharmacyId
  }, [userId, pharmacyId]); // Re-runs if userId or pharmacyId changes
  ```

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** `useEffect` works identically in React for the web and React Native. The concepts of setup functions, cleanup functions, and dependency arrays are the same. The types of side effects might differ (e.g., DOM manipulation on web vs. interacting with native modules in RN), but the Hook itself behaves consistently.
>
> **Key Takeaway:** Your knowledge of `useEffect` from web React is directly transferable.

> 📲 **(Native Developers - iOS/Android):**
>
> **Comparison:** `useEffect` covers scenarios handled by various lifecycle methods in native development.
>
> - An effect with an empty dependency array `[]` is similar to `viewDidLoad` / `viewDidAppear` (iOS) or `onCreate` / `onStart` / `onResume` (Android) for setup, and `deinit` / `viewWillDisappear` (iOS) or `onDestroy` / `onStop` (Android) for cleanup when the component unmounts.
> - An effect with dependencies is like observing property changes (e.g., KVO in iOS, or using LiveData/Flow in Android with observers) and reacting to them. The cleanup function is crucial for removing observers to prevent memory leaks.
>
> **Key Takeaway:** `useEffect` is a versatile Hook for managing operations that need to occur outside the normal render flow, triggered by component rendering or changes in specific data.

The `useEffect` Hook is powerful and essential for building fully-featured React components that can interact with the outside world, manage resources, and respond to changes over time.

### Exercise 7.5: Using `useEffect` for Side Effects

**Objective:** Create a component that fetches mock user data using `useEffect` when it mounts and displays a welcome message.

**Instructions:**

1.  Open a CodeSandbox.
2.  Define a TypeScript interface for `UserData` (e.g., `{ id: string; name: string; preferredPharmacy: string; }`).
3.  Create a functional component named `UserProfileDisplay`.
4.  Inside `UserProfileDisplay`, use `useState` to manage:
    - `userData` (type `UserData | null`, initialized to `null`).
    - `isLoading` (boolean, initialized to `true`).
5.  Use `useEffect` to simulate fetching user data when the component mounts:
    - The effect should run only once.
    - Inside the effect, set `isLoading` to `true`.
    - Simulate an API call (e.g., using `setTimeout` for 1-2 seconds).
    - After the delay, create a mock `UserData` object (e.g., `{ id: 'user001', name: 'Jane Doe', preferredPharmacy: 'SpeedyMeds Downtown' }`).
    - Set the fetched data to the `userData` state and set `isLoading` to `false`.
6.  Conditionally render:
    - An `<ActivityIndicator />` (or a "Loading..." `<Text>`) if `isLoading` is `true`.
    - If `isLoading` is `false` and `userData` is available, display a welcome message like "Welcome, {userData.name}! Your preferred pharmacy is {userData.preferredPharmacy}."
    - If `isLoading` is `false` and `userData` is `null` (e.g., fetch failed, though we are not simulating failure here), display an error message.
7.  Render your `UserProfileDisplay` component in the main `App` component.

**(https://codesandbox.io)** (A pre-configured CodeSandbox with React and TypeScript should be set up for this exercise. For now, this is a placeholder link.)

> 📚 **Official Documentation:**
>
> - [React Docs - `useEffect` Hook](https://react.dev/reference/react/useEffect)
> - [React Docs - Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
> - [React Docs - You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) (Important for understanding when _not_ to use `useEffect`)
