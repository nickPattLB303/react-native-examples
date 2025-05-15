## Section 7: Offline Data Storage

This section explores strategies for storing data offline in your React Native application. Offline data storage is crucial for creating apps that remain functional without an internet connection, improve performance by caching data, and provide a seamless user experience. We will cover `AsyncStorage` for simple key-value storage, `expo-sqlite` for relational data, and briefly mention MMKV as a high-performance alternative.

### Conceptual Content

Many mobile applications need to store data locally on the device. This could be user preferences, application settings, cached API responses, or even a full dataset for offline functionality. For SpeedyMeds, this could include storing user login tokens, drafted prescription notes, or a local cache of medication information.

**Why Offline Storage?**

- **Offline Access:** Allows users to access data and use app features even when they are not connected to the internet.
- **Performance:** Reduces the need for frequent network requests by caching data locally, leading to faster load times.
- **Reduced Data Usage:** Minimizes data transfer by relying on local data when possible.
- **Improved User Experience:** Provides a smoother experience by minimizing loading states and handling network interruptions gracefully.

**Choosing an Offline Storage Solution**

The choice of storage solution depends on the type and complexity of the data you need to store:

- **Simple Key-Value Data:** For settings, user preferences, or small pieces of unstructured data, a key-value store is often sufficient.
- **Structured/Relational Data:** For more complex data with relationships (e.g., a list of medications with dosages and schedules), a local SQL database is more appropriate.
- **Performance-Critical Data:** For scenarios requiring very fast read/write operations, specialized storage libraries might be considered.

### Referential Content

**1. AsyncStorage (`@react-native-async-storage/async-storage`)**

AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It's suitable for storing small amounts of data, like user preferences or authentication tokens.

- **Characteristics:**
  - Asynchronous API (returns Promises).
  - Stores data as strings. You need to serialize (e.g., `JSON.stringify`) objects/arrays before storing and deserialize (`JSON.parse`) after retrieving.
  - Unencrypted: Not suitable for sensitive data without an additional encryption layer.
  - Can be slow for large amounts of data due to its asynchronous nature and serialization overhead.
- **Installation:**

  ```bash
  npx expo install @react-native-async-storage/async-storage
  ```

- **Common Methods:**
  - `setItem(key: string, value: string): Promise<void>`
  - `getItem(key: string): Promise<string | null>`
  - `removeItem(key: string): Promise<void>`
  - `mergeItem(key: string, value: string): Promise<void>` (merges a JSON value into an existing JSON value)
  - `getAllKeys(): Promise<string[]>`
  - `clear(): Promise<void>` (clears all AsyncStorage for all keys)

**2. `expo-sqlite`**

`expo-sqlite` provides an API to interact with a SQLite database stored on the device. SQLite is a lightweight, file-based relational database, ideal for storing structured data.

- **Characteristics:**
  - SQL-based relational database.
  - Supports transactions for atomic operations.
  - Data is persistent.
  - Good for managing larger datasets and complex queries.
- **Installation:**

  ```bash
  npx expo install expo-sqlite
  ```

- **Core API:**
  - `SQLite.openDatabase(name: string, version?: string, description?: string, size?: number, callback?: (db: WebSQLDatabase) => void): WebSQLDatabase`
  - `db.transaction(callback: (tx: SQLTransaction) => void, errorCallback?: (error: SQLError) => void, successCallback?: () => void)`
  - `tx.executeSql(sqlStatement: string, arguments?: any[], successCallback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void, errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean)`
    - `SQLResultSet` contains `rowsAffected`, `insertId`, and `rows` (an array of objects).

**3. MMKV (`react-native-mmkv`)**

MMKV (Multi-Process Key-Value) is a high-performance, persistent key-value storage framework developed by Tencent. `react-native-mmkv` provides a React Native binding for it.

- **Characteristics:**
  - Extremely fast read/write operations (often faster than AsyncStorage).
  - Synchronous API (though asynchronous wrappers can be built).
  - Supports storing strings, numbers, booleans, and `Uint8Array`.
  - Offers built-in encryption capabilities.
  - Can be a good alternative to AsyncStorage for performance-sensitive key-value storage or when encryption is needed out-of-the-box.
- \*\*Installation (requires a development build for native modules if not already set up):

  ```bash
  npm install react-native-mmkv
  # or
  yarn add react-native-mmkv
  ```

  Then, `npx expo prebuild` (if you haven't already) or use a development build with EAS Build.

- **Basic Usage:**

  ```typescript
  import { MMKV } from "react-native-mmkv";
  const storage = new MMKV({
    id: "user-preferences",
    encryptionKey: "your-secure-key",
  });
  storage.set("username", "SpeedyUser");
  const username = storage.getString("username");
  ```

> [!IMPORTANT]
> While MMKV offers excellent performance and encryption, it adds native dependencies. Ensure your build process (e.g., EAS Build with a development client) can handle this if you choose to use it. For this course, we will primarily focus on AsyncStorage and `expo-sqlite` as they are more commonly integrated with Expo Go compatible examples.

### Procedural Content

**Example 1: Using AsyncStorage to Store User Preferences**

Let's say SpeedyMeds allows users to choose a theme (light/dark). We can store this preference using AsyncStorage.

```tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@SpeedyMeds:appTheme"; // Convention: use a prefix for keys

type Theme = "light" | "dark";

const ThemePreference: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const [isLoading, setIsLoading] = useState(true);

  const loadThemePreference = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedTheme = (await AsyncStorage.getItem(
        THEME_KEY
      )) as Theme | null;
      if (storedTheme) {
        setCurrentTheme(storedTheme);
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
      // Default to light theme on error
      setCurrentTheme("light");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveThemePreference = async (theme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
      setCurrentTheme(theme);
      alert(`Theme saved: ${theme}`);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
      alert("Error saving theme.");
    }
  };

  useEffect(() => {
    loadThemePreference();
  }, [loadThemePreference]);

  if (isLoading) {
    return <Text>Loading theme...</Text>;
  }

  const isDarkMode = currentTheme === "dark";

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Current Theme: {currentTheme}
      </Text>
      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          Dark Mode:
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) =>
            saveThemePreference(value ? "dark" : "light")
          }
          value={isDarkMode}
        />
      </View>
      <Button
        title="Clear Theme Preference"
        onPress={async () => {
          await AsyncStorage.removeItem(THEME_KEY);
          setCurrentTheme("light"); // Reset to default
          alert("Theme preference cleared.");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  lightContainer: { backgroundColor: "#FFFFFF" },
  darkContainer: { backgroundColor: "#333333" },
  lightText: { color: "#000000" },
  darkText: { color: "#FFFFFF" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ThemePreference;
```
