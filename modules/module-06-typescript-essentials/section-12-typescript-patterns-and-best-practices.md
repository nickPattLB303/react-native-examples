## Section 12: TypeScript Patterns and Best Practices for React Native

Beyond the core language features, applying TypeScript effectively in a React Native project involves understanding common patterns for structuring types, handling asynchronous operations like API calls, integrating with navigation, and avoiding common pitfalls. This section covers these practical aspects to help you write cleaner, more maintainable, and robust React Native applications with TypeScript.

### Organizing Types in React Native Projects

As your React Native application grows, managing your TypeScript type definitions becomes crucial for maintainability and team collaboration. There isn\'t a single prescriptive way, but here are some common strategies and best practices:

**Strategies for Type Organization:**

1.  **Centralized `types` Directory:**

    - Create a top-level directory (e.g., `src/types/`) to store shared type definitions, especially those related to your domain models (e.g., `User`, `Medication`, `Order`), API response structures, or navigation parameters.
    - Within this directory, you can further organize types into files (e.g., `src/types/medication.ts`, `src/types/user.ts`).
    - Use a barrel file (`src/types/index.ts`) to re-export all types from this directory for easier imports elsewhere in your app:
      ```typescript
      // src/types/index.ts
      export * from "./medicationTypes";
      export * from "./patientTypes";
      export * from "./apiResponseTypes";
      export * from "./navigationParams";
      ```

2.  **Co-locating Types with Components/Modules:**

    - For types that are specific to a single component, screen, or module, define them directly within that component's directory (e.g., in a `types.ts` file next to `MyComponent.tsx`, or even within the `.tsx` file itself if very localized).
    - This improves encapsulation and makes it easier to understand a component\'s interface without navigating to a central types directory.

3.  **Hybrid Approach (Recommended for Many Projects):**
    - Use a central `types/` directory for globally shared types (domain models, API structures).
    - Co-locate types that are only used by a specific component, screen, or feature module.

**Example Project Structure:**

```plaintext
src/
├── api/
│   └── client.ts           // API client logic
├── components/
│   ├── MedicationCard/
│   │   ├── MedicationCard.tsx
│   │   └── types.ts          // Types specific to MedicationCard (e.g., MedicationCardProps)
│   └── common/
│       └── Button.tsx        // A common button component
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts            // Navigation param lists (e.g., RootStackParamList)
├── screens/
│   ├── HomeScreen/
│   │   └── HomeScreen.tsx
│   ├── MedicationDetailsScreen/
│   │   ├── MedicationDetailsScreen.tsx
│   │   └── types.ts          // Types for MedicationDetailsScreen props/state
│   └── ...
├── services/
│   └── medicationService.ts  // Business logic for medications
├── store/
│   └── medicationSlice.ts    // Redux slice for medications (might define its state type here)
├── types/
│   ├── index.ts              // Barrel file for shared types
│   ├── medicationTypes.ts    // e.g., Medication, DosageForm enum
│   ├── patientTypes.ts       // e.g., PatientProfile
│   └── apiResponseTypes.ts   // e.g., PaginatedResponse<T>, MedicationDTO
└── App.tsx
```

**Best Practices:**

- **Be Consistent:** Choose a strategy and stick to it within your project or team.
- **Keep Types Close to Usage:** If a type is only used by one file or module, define it there.
- **Export Clearly:** Use `export` for types that need to be used elsewhere.
- **Avoid Default Exports for Types (Generally):** Named exports (`export interface User`) are often preferred for types as they make imports more explicit and refactoring easier.
- **Leverage Declaration Merging and Module Augmentation Carefully:** For extending third-party types, place these declarations in appropriate global `.d.ts` files or specific setup files.

> Effective type organization in a SpeedyMeds application would mean having `Medication`, `Prescription`, `Patient` interfaces in `src/types/`, while `MedicationListItemProps` might be co-located with the `MedicationListItem` component.

### Type-Safe API Calls

Interacting with external APIs is a common source of runtime errors if not handled carefully. TypeScript helps by allowing you to define the expected shapes of API requests and responses.

**Steps for Type-Safe API Calls:**

1.  **Define Types for API Responses (DTOs - Data Transfer Objects):**
    Create interfaces or type aliases that exactly match the structure of the JSON data you expect from the API. Pay attention to naming conventions (e.g., snake_case from backend vs. camelCase in frontend).

2.  **Define Types for Application Models:**
    These are the types your application will use internally. They might differ from DTOs (e.g., different property names, combined data, added methods).

3.  **Create Transformation Functions (if needed):**
    Write functions to map DTOs to your application models. These functions should be typed.

4.  **Type Your API Client/Functions:**
    Ensure your functions that make API calls (`fetch`, Axios instances) are typed to expect specific request parameters (if any) and to return Promises of your DTO or application model types.

5.  **Handle Errors with Types:**
    Define types for potential API error responses.

A short, self-contained example of type-safe API calls:

```tsx
import { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

// 1. Define API Response Type (DTO - Data Transfer Object)
interface MedicationDTO {
  id_med: string; // API uses snake_case and different key names
  drug_name: string;
  strength_value: number;
  strength_unit: string;
  available_stock: number;
}

// 2. Define Application Model Type
interface Medication {
  id: string;
  name: string;
  strength: string; // Combined from DTO
  stock: number;
}

// 3. Transformation Function (DTO to Application Model)
function transformMedicationDTO(dto: MedicationDTO): Medication {
  return {
    id: dto.id_med,
    name: dto.drug_name,
    strength: `${dto.strength_value}${dto.strength_unit}`,
    stock: dto.available_stock,
  };
}

// Mock API base URL
const API_BASE_URL = "https://my-speedymeds-api.com/api";

// 4. Typed API Fetch Function
async function fetchAllMedications(): Promise<Medication[]> {
  try {
    // In a real app, use fetch or a library like Axios
    // const response = await fetch(`${API_BASE_URL}/medications`);
    // if (!response.ok) {
    //   throw new Error(`API Error: ${response.status}`);
    // }
    // const dtoArray: MedicationDTO[] = await response.json();

    // Mocking the API call for this example
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    const mockDtoArray: MedicationDTO[] = [
      {
        id_med: "MED001",
        drug_name: "Lisinopril",
        strength_value: 10,
        strength_unit: "mg",
        available_stock: 150,
      },
      {
        id_med: "MED002",
        drug_name: "Metformin",
        strength_value: 500,
        strength_unit: "mg",
        available_stock: 275,
      },
      {
        id_med: "MED003",
        drug_name: "Simvastatin",
        strength_value: 20,
        strength_unit: "mg",
        available_stock: 90,
      },
    ];

    return mockDtoArray.map(transformMedicationDTO);
  } catch (error) {
    console.error("Failed to fetch medications:", error);
    // Consider how to type/handle errors more robustly in a real app
    return []; // Return empty array or throw a typed error
  }
}

// Example React Native Component using the typed API call
export default function MedicationStockList() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllMedications()
      .then((data) => {
        setMedications(data);
      })
      .catch((err) => {
        setError(err.message || "An unexpected error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading medications: {error}</Text>;
  }

  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.name} ({item.strength})
          </Text>
          <Text>Stock: {item.stock}</Text>
        </View>
      )}
    />
  );
}
```

> In this SpeedyMeds example, `MedicationDTO` represents the raw API response. `Medication` is the clean model used by the app. The `transformMedicationDTO` function safely converts between them. `fetchAllMedications` is typed to return `Promise<Medication[]>`, so the component using it knows exactly what kind of data to expect.
>
> **Runtime Validation:** Remember that TypeScript types are erased at runtime. For truly robust API interactions, especially with external APIs you don\'t control, combine TypeScript with runtime validation libraries like Zod or io-ts to ensure the data actually matches your DTOs at runtime.

### TypeScript with React Navigation

React Navigation is the de facto standard for navigation in React Native. TypeScript significantly improves the safety and developer experience when working with it by allowing you to type your navigation stack, screens, and parameters.

**Core Concepts for Typed Navigation:**

1.  **Define a Param List:** Create a type alias (e.g., `RootStackParamList`) that maps screen names to their expected parameter types. If a screen takes no parameters, use `undefined`.

    ```typescript
    // Example: src/navigation/types.ts
    export type RootStackParamList = {
      Login: undefined; // No params for Login screen
      Dashboard: { userId: string };
      MedicationDetails: { medicationId: string; fromScreen?: string };
      Settings: undefined;
    };
    ```

2.  **Type Navigators:** When creating navigators (e.g., `createStackNavigator<RootStackParamList>()`), provide your param list type as a generic argument.

3.  **Type Screen Props:** Use utility types provided by React Navigation (like `StackScreenProps`, `NativeStackScreenProps`, `BottomTabScreenProps`) to type the `navigation` and `route` props in your screen components. These are generic types that take your param list and the current screen's name.

    ```typescript
    // In your screen component, e.g., MedicationDetailsScreen.tsx
    import type { NativeStackScreenProps } from "@react-navigation/native-stack";
    import type { RootStackParamList } from "./navigation/types"; // Adjust path

    type Props = NativeStackScreenProps<
      RootStackParamList,
      "MedicationDetails"
    >;
    // Now, props.route.params will be correctly typed as { medicationId: string; fromScreen?: string }
    // And props.navigation will have typed methods for RootStackParamList
    ```

4.  **Type `useNavigation` and `useRoute` Hooks:** Similarly, type the hooks if you use them.

    ```typescript
    import {
      useNavigation,
      useRoute,
      RouteProp,
    } from "@react-navigation/native";
    import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
    import type { RootStackParamList } from "./navigation/types";

    // For useNavigation
    type DetailsScreenNavigationProp = NativeStackNavigationProp<
      RootStackParamList,
      "MedicationDetails"
    >;
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    // navigation.navigate('Dashboard', { userId: '123' }) // Typed!

    // For useRoute
    type DetailsScreenRouteProp = RouteProp<
      RootStackParamList,
      "MedicationDetails"
    >;
    const route = useRoute<DetailsScreenRouteProp>();
    // const medId = route.params.medicationId; // Typed!
    ```

A short, self-contained example structure for typed navigation:

```tsx
// navigation/types.ts
export type AppStackParamList = {
  PatientList: undefined;
  PatientDetails: { patientId: string };
  AddMedicationScreen: { patientId: string; prescriptionId?: string };
};

// --- PatientDetailsScreen.tsx ---
import React from "react";
import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "./navigation/types"; // Adjust path

// Define props for this specific screen
type PatientDetailsProps = NativeStackScreenProps<
  AppStackParamList,
  "PatientDetails"
>;

const PatientDetailsScreen: React.FC<PatientDetailsProps> = ({
  route,
  navigation,
}) => {
  const { patientId } = route.params; // Type-safe: patientId is string

  const handleAddMedication = () => {
    // Type-safe navigation: requires patientId, prescriptionId is optional
    navigation.navigate("AddMedicationScreen", { patientId });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details for Patient ID: {patientId}</Text>
      <Button
        title="Add Medication for Patient"
        onPress={handleAddMedication}
      />
      <Button title="Go Back to List" onPress={() => navigation.goBack()} />
      {/* <Button title="Go to NonExistentScreen" onPress={() => navigation.navigate('NonExistent')} /> // TypeScript Error! */}
    </View>
  );
};
export default PatientDetailsScreen;

// --- App.tsx (Navigator setup - simplified) ---
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import type { AppStackParamList } from './navigation/types'; // Adjust path
// import PatientDetailsScreen from './screens/PatientDetailsScreen'; // Adjust path

// const Stack = createNativeStackNavigator<AppStackParamList>();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* <Stack.Screen name="PatientList" component={PatientListScreenComponent} /> */}
//         <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
//         {/* <Stack.Screen name="AddMedicationScreen" component={AddMedicationScreenComponent} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;
```

> In this SpeedyMeds navigation example, `AppStackParamList` defines the screens and their parameters. `PatientDetailsScreen` uses `NativeStackScreenProps` to get typed `route.params` (so `patientId` is known to be a string) and a typed `navigation` object. This prevents errors like navigating to non-existent screens or passing incorrect/missing parameters.

**Benefits:**

- Prevents typos in screen names.
- Ensures required parameters are passed and optional ones are handled.
- Type-safe access to `route.params`.
- Autocompletion for screen names and parameters.

### Common TypeScript Pitfalls in React Native

While TypeScript brings many benefits, some common pitfalls can undermine its effectiveness if not addressed:

1.  **Overusing `any`:**

    - **Pitfall:** Using `any` disables type checking for that variable or expression, losing the benefits of TypeScript.
    - **Solution:** Avoid `any` whenever possible. Use more specific types, `unknown` (with type narrowing), or generics.

    ```typescript
    // ❌ Avoid: function processData(data: any) { console.log(data.property); /* No safety */ }
    // ✅ Better: function processData(data: unknown) {
    //   if (typeof data === 'object' && data !== null && 'property' in data) {
    //      console.log((data as {property: unknown}).property);
    //   }
    // }
    ```

2.  **Incorrect Type Assertions (`as` keyword):**

    - **Pitfall:** Type assertions tell TypeScript to treat a value as a specific type, but they don\'t perform any runtime checks. If the assertion is wrong, it can lead to runtime errors.
    - **Solution:** Use assertions sparingly. Prefer type guards or runtime validation for data from external sources (like APIs). If you must use an assertion, be sure the type is correct.

    ```typescript
    // const user = response.data as User; // Potentially unsafe if response.data isn't actually a User
    // Better: Use a type guard or validation library like Zod.
    ```

3.  **Not Handling `null` or `undefined` (if `strictNullChecks` is off or bypassed):**

    - **Pitfall:** Assuming a value is always present when it might be `null` or `undefined`, leading to runtime errors like "Cannot read property 'x' of undefined."
    - **Solution:** Enable `strictNullChecks` (usually default in modern Expo templates). Use optional chaining (`?.`), nullish coalescing (`??`), and explicit checks (`if (value != null)`).

    ```typescript
    // interface User { profile?: { name?: string } }
    // const userName = user.profile.name; // ❌ Potential error if profile or name is undefined
    // const userNameSafe = user.profile?.name ?? 'Guest'; // ✅ Safe
    ```

4.  **Forgetting to Type `useState` and `useRef` for Complex Types:**

    - **Pitfall:** If `useState` is initialized with an empty array (`[]`) or object (`{}`), TypeScript might infer its type as `any[]` or a very loose object type, reducing type safety.
    - **Solution:** Provide an explicit type argument for `useState` or `useRef` when dealing with arrays of specific objects, complex objects, or `null` initial values that will later hold a specific type.

    ```typescript
    // const [users, setUsers] = useState([]); // ❌ users type might be any[]
    // const [users, setUsers] = useState<User[]>([]); // ✅ users type is User[]

    // const userProfile, setUserProfile = useState(null); // ❌ userProfile is 'null' then anything
    // const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // ✅ Explicit
    ```

5.  **Mismatched Event Handler Types for React Native:**

    - **Pitfall:** Using web React event types (e.g., `React.ChangeEvent<HTMLInputElement>`) or assuming event structures like `event.target.value` for React Native event handlers.
    - **Solution:** Use the correct React Native event types (`GestureResponderEvent`, `NativeSyntheticEvent<T>`, or direct value types like `string` for `onChangeText`). Refer to React Native documentation or type definitions for specific components.

    ```typescript
    // // ❌ Incorrect for TextInput onChangeText:
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
    // ✅ Correct for TextInput onChangeText:
    // const handleChange = (text: string) => { /* ... */ };
    ```

6.  **Ignoring TypeScript Errors:**
    - **Pitfall:** Using `@ts-ignore` or similar mechanisms to suppress TypeScript errors without understanding or fixing the underlying issue.
    - **Solution:** Treat TypeScript errors as real bugs. Understand why the error is happening and refactor the code or types to resolve it correctly. Use suppression comments only as a last resort for truly unresolvable external library issues and document why.

By being aware of these common pitfalls and actively working to address them, you can maximize the benefits of TypeScript in your React Native projects, leading to more reliable and maintainable code.

> 📚 **Official Documentation & Further Reading:**
>
> - [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
> - [React Navigation: Type Checking with TypeScript](https://reactnavigation.org/docs/typescript/)
> - [React TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)

---
