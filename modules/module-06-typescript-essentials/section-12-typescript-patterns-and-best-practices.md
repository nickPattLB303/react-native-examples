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

Effective type organization in a SpeedyMeds application would mean having `Medication`, `Prescription`, `Patient` interfaces in `src/types/`, while `MedicationListItemProps` might be co-located with the `MedicationListItem` component.

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

In this SpeedyMeds example, `MedicationDTO` represents the raw API response. `Medication` is the clean model used by the app. The `transformMedicationDTO` function safely converts between them. `fetchAllMedications` is typed to return `Promise<Medication[]>`, so the component using it knows exactly what kind of data to expect.

> [!NOTE] > **Runtime Validation:** Remember that TypeScript types are erased at runtime. For truly robust API interactions, especially with external APIs you don't control, combine TypeScript with runtime validation libraries like Zod or io-ts to ensure the data actually matches your DTOs at runtime.

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

In this SpeedyMeds navigation example, `AppStackParamList` defines the screens and their parameters. `PatientDetailsScreen` uses `NativeStackScreenProps` to get typed `route.params` (so `patientId` is known to be a string) and a typed `navigation` object. This prevents errors like navigating to non-existent screens or passing incorrect/missing parameters.

**Benefits:**

- Prevents typos in screen names.
- Ensures required parameters are passed and optional ones are handled.
- Type-safe access to `route.params`.
- Autocompletion for screen names and parameters.

### Balancing Type Inference and Explicit Annotations

TypeScript excels at type inference, often deducing types automatically. However, knowing when to rely on inference versus when to provide explicit type annotations is key to writing clear and maintainable code.

- **Rely on Inference for:**

  - **Local Variables:** For variables declared and initialized within a function scope where their type is immediately obvious from the assigned value (e.g., `let name = "SpeedyMeds";` - `string` is clearly inferred).
  - **Simple Function Return Types:** If a function's logic is straightforward and its return type is easily and unambiguously inferred by TypeScript, an explicit annotation might be omitted for brevity (though explicit is often still preferred for clarity).

- **Use Explicit Annotations for:**
  - **Function Signatures:** Always explicitly type function parameters and return values. This forms the "contract" of the function, making its usage clear and preventing accidental changes to its API.
    ```typescript
    /**
     * Calculates the total cost including tax.
     * @param subtotal - The subtotal amount before tax.
     * @param taxRate - The tax rate (e.g., 0.07 for 7%).
     * @returns The total cost including tax.
     */
    function calculateTotal(subtotal: number, taxRate: number): number {
      return subtotal * (1 + taxRate);
    }
    ```
  - **Component Props and State:** As covered in Section 10, always explicitly define types or interfaces for component props and state.
  - **Complex Object Structures:** When defining objects with multiple properties, especially if they are not immediately assigned or if their structure is part of a larger data model.
  - **API Boundaries:** Data coming from or going to external systems (e.g., API responses, data from storage) should have explicit types.
  - **Variables Initialized with `null` or `undefined` (that will later hold a specific type):**
    ```typescript
    // Assuming UserProfile is defined elsewhere
    // type UserProfile = { id: string; name: string; /* ... */ };
    let currentUser: UserProfile | null = null; // Explicitly typed
    // Later: currentUser = fetchUserProfile();
    ```
  - **When TypeScript's Inference is Ambiguous or Defaults to `any`:** If TypeScript cannot confidently infer a type or infers `any` (and `noImplicitAny` is not strictly enforced), provide an explicit type to ensure safety.

Striking a good balance improves code readability: inference reduces verbosity for simple cases, while explicit annotations provide clarity and safety at critical boundaries.

### The Crucial Role of `strictNullChecks`

Enabling `"strictNullChecks": true` in your `tsconfig.json` (which is part of the recommended `"strict": true` setting) is one of the most impactful configurations for writing robust TypeScript and React Native applications.

**Why is it Crucial?**

JavaScript's `null` and `undefined` values are common sources of runtime errors (e.g., "Cannot read property 'x' of undefined"). Without `strictNullChecks`, these values can be assigned to any type, hiding potential bugs until your app crashes.

With `strictNullChecks` enabled:

- `null` and `undefined` become distinct types.
- You cannot assign `null` or `undefined` to a variable of another type (e.g., `string`, `number`) unless you explicitly include `null` or `undefined` in a union type (e.g., `string | null`).
- TypeScript forces you to consciously handle situations where a value might be `null` or `undefined` before trying to use it.

**Common Patterns for Handling Potential `null` or `undefined` Values:**

1.  **Explicit Checks (Type Guards):**

    ```typescript
    function printName(user: { name?: string }): void {
      if (user.name !== undefined && user.name !== null) {
        console.log(user.name.toUpperCase()); // Safe
      } else {
        console.log("User name not provided.");
      }
    }
    ```

2.  **Optional Chaining (`?.`):**
    Safely access properties or call methods on potentially `null` or `undefined` objects. If any part of the chain is `null` or `undefined`, the expression short-circuits and returns `undefined`.

    ```typescript
    interface Patient {
      id: string;
      details?: {
        address?: {
          street?: string;
          city: string;
        };
      };
    }
    const patient: Patient = { id: "p123" };
    const streetName = patient.details?.address?.street; // Type: string | undefined
    console.log(streetName); // undefined, no error
    ```

3.  **Nullish Coalescing (`??`):**
    Provide a default value if an expression evaluates to `null` or `undefined`. It only coalesces for `null` or `undefined`, unlike `||` which coalesces for any falsy value (e.g., `''`, `0`).

    ```typescript
    // Assuming 'settings' is an object that might have 'customPharmacyName'
    // const settings: { customPharmacyName?: string | null } = { customPharmacyName: null };
    const pharmacyName =
      settings.customPharmacyName ?? "SpeedyMeds Default Pharmacy";
    // If settings.customPharmacyName is null or undefined, pharmacyName becomes "SpeedyMeds Default Pharmacy".
    // If it's an empty string "", it remains "".
    ```

4.  **Conditional Rendering (in React Native components):**
    Only render a component or part of the UI if the required data is available.

    ```tsx
    // {medicationDetails && <Text>{medicationDetails.description}</Text>}
    // or
    // {isLoading ? <ActivityIndicator /> : <DataDisplay data={data} />}
    ```

5.  **Non-null Assertion Operator (`!`):**
    Use with extreme caution. The `!` operator after an expression (e.g., `user!.name`) tells TypeScript that you are certain the value is not `null` or `undefined`. This silences the compiler but provides no runtime safety. Only use it if you have performed checks or have guarantees that TypeScript cannot see.
    ```typescript
    // interface User { profile: { name: string } };
    // function getKnownUser(): User { /* ... guarantees user and profile are returned ... */ return { profile: { name: "Test" } } };
    // const userName = getKnownUser()!.profile.name; // Use only if absolutely sure
    ```
    It's generally better to refactor code to avoid needing `!`.

By embracing `strictNullChecks` and using these patterns, you significantly reduce a major category of runtime errors in your React Native applications.

### Leveraging JSDoc with TypeScript for Comprehensive Documentation

As established in the course introduction, combining TypeScript with JSDoc comments is our standard for creating well-documented, maintainable code. While TypeScript defines the _structure_ and _type contracts_ for the compiler, JSDoc describes the _purpose_, _intent_, _usage context_, and _nuances_ for human developers.

**Why Both?**

- **TypeScript** provides compile-time type safety and enables powerful tooling (autocompletion, refactoring). Its type annotations are a form of structural documentation.
- **JSDoc** provides narrative documentation, explains complex logic, clarifies parameter meanings beyond their types, describes side effects, provides usage examples, and can document non-obvious behaviors or design decisions.

This dual approach ensures maximum clarity: types guarantee structural correctness, while JSDoc provides essential human-readable context.

**Common JSDoc Tags with TypeScript:**

Many JSDoc tags work seamlessly with TypeScript, and IDEs often use them to enhance tooltips and code intelligence:

- `@param {paramType} paramName - Description.` (Type can often be omitted if clear from TS)
- `@returns {returnType} Description.` (Type can often be omitted if clear from TS)
- `@typedef {(object|TypeExpression)} TypeName - Description.` (Useful for defining complex types or shapes that JSDoc tools can pick up, especially if you want to document properties within an object type alias).
- `@property {propertyType} propertyName - Description.` (Used within `@typedef` for object properties).
- `@template T - Description of generic type parameter.`
- `@throws {ErrorType} Description of error.`
- `@deprecated Explanation for deprecation.`
- `@example Caption for example\n codeFencedJsOrTsBlock()`
- `@see Link or reference.`
- `@author AuthorName`
- `@since VersionNumber`

**Illustrative Example:**

Consider a function for submitting a complex order in the SpeedyMeds system. It involves an asynchronous operation, specific data structures, and potential error handling.

```typescript
// Assuming these types are defined elsewhere for clarity in a real project:
interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}
interface ShippingAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
interface ApiResponse<TData> {
  success: boolean;
  data: TData | null;
  error?: { message: string; code?: number };
}

/**
 * @typedef {object} SubmitOrderPayloadDef
 * @property {OrderItem[]} items - The list of items in the order.
 * @property {ShippingAddress} shippingAddress - The address for shipping.
 * @property {string} customerId - The ID of the customer placing the order.
 * @property {string} paymentMethodId - The ID of the payment method to use.
 */
type SubmitOrderPayload = {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  customerId: string;
  paymentMethodId: string;
};

/**
 * @typedef {object} SubmitOrderResponseDataDef
 * @property {string} orderId - The unique ID of the successfully created order.
 * @property {string} estimatedDeliveryDate - An ISO date string for estimated delivery.
 * @property {number} totalAmount - The final amount charged.
 */
type SubmitOrderResponseData = {
  orderId: string;
  estimatedDeliveryDate: string; // ISO Date string
  totalAmount: number;
};

/**
 * Submits a new medication or supply order to the backend system.
 * This function handles the API call, basic validation (conceptual),
 * and returns a structured response indicating success or failure.
 *
 * @async
 * @param {SubmitOrderPayload} orderPayload - The complete order data to be submitted.
 * @param {string} authToken - The user's authentication token for the API request.
 * @returns {Promise<ApiResponse<SubmitOrderResponseData>>} A promise that resolves to a standardized API response.
 *          If successful, `data` will contain an object conforming to {@link SubmitOrderResponseDataDef}.
 *          If failed, `error` will contain error details.
 * @throws {Error} Throws a generic Error for unexpected issues during submission
 *                 (e.g., network failure not caught as an API error).
 *                 Specific API errors should be checked within the 'error' property of the returned ApiResponse.
 *
 * @example
 * async function handlePlaceOrder() {
 *   const payload: SubmitOrderPayload = {
 *     items: [{ productId: "med123", quantity: 2, unitPrice: 10.50 }],
 *     shippingAddress: { street: "123 Main St", city: "Anytown", zipCode: "12345", country: "USA" },
 *     customerId: "cust789",
 *     paymentMethodId: "pm_abcdef123456",
 *   };
 *   const token = "some_auth_token";
 *   try {
 *     const response = await submitSpeedyMedsOrder(payload, token);
 *     if (response.success && response.data) {
 *       console.log("Order placed successfully! ID:", response.data.orderId);
 *       console.log("Estimated Delivery:", response.data.estimatedDeliveryDate);
 *     } else {
 *       console.error("Order submission failed:", response.error?.message);
 *     }
 *   } catch (e) {
 *     console.error("Critical error during order submission:", e);
 *   }
 * }
 */
async function submitSpeedyMedsOrder(
  orderPayload: SubmitOrderPayload,
  authToken: string
): Promise<ApiResponse<SubmitOrderResponseData>> {
  console.log(`Submitting order for customer ${orderPayload.customerId}...`);

  // --- Actual implementation would involve a fetch/axios call ---
  // Placeholder mock implementation:
  await new Promise((resolve) => setTimeout(resolve, 750)); // Simulate network delay

  if (orderPayload.items.length === 0) {
    return {
      success: false,
      data: null,
      error: { message: "Order must contain items.", code: 400 },
    };
  }

  if (Math.random() > 0.15) {
    // Simulate 85% success rate
    const mockResponseData: SubmitOrderResponseData = {
      orderId: `ORD-${Date.now()}`,
      estimatedDeliveryDate: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
      totalAmount:
        orderPayload.items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        ) * 1.07, //  with 7% tax
    };
    return { success: true, data: mockResponseData, error: undefined };
  } else {
    // Simulate API error
    return {
      success: false,
      data: null,
      error: {
        message: "Payment processing failed due to insufficient funds.",
        code: 402,
      },
    };
  }
}
```

In this example, JSDoc provides context on the function's purpose, its asynchronous nature (`@async`), detailed descriptions for parameters (`@param`) and the complex return type (`@returns`), a link to a related type (`@link`), potential errors (`@throws`), and a usage example (`@example`). This complements the TypeScript types, making the function much easier to understand and use correctly.

By consistently applying both TypeScript for type safety and JSDoc for descriptive context, you create a high-quality, robust, and developer-friendly codebase.

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
