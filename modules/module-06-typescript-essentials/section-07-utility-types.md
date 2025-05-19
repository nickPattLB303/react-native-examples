## Section 7: Utility Types

TypeScript comes with a set of built-in utility types that allow you to transform existing types in various common ways. These utilities help create new types based on existing ones without having to redefine them from scratch, promoting DRY (Don't Repeat Yourself) principles and enhancing type flexibility. This section covers some of the most frequently used utility types like `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Readonly<T>`, with examples relevant to managing data in SpeedyMeds, and then briefly introduces other useful ones.

> 🍏 **(iOS Developers - Swift):**
>
> **Comparison:** Swift doesn't have a direct equivalent to TypeScript's broad set of utility types implemented as generic types that transform other types. However, concepts like making properties optional (often handled by `Optional<T>` or `?` syntax directly in property definitions), creating read-only views (e.g., using `let` for constants or computed properties with private setters), or defining subsets of data for specific purposes (achieved through different structs/classes or protocols) share similar goals. Swift's `Codable` protocol with custom `CodingKeys` can also achieve effects similar to `Pick` or `Omit` for serialization.
>
> **Key Takeaway:** TypeScript utility types provide a concise, generic way to create variations of existing types (optional, required, subsets). In Swift, similar outcomes are often achieved through language features like optionals, access control, and by defining distinct, related types or using protocol compositions.
>
> **Source:** [Swift Language Guide - Properties](https://docs.swift.org/swift-book/LanguageGuide/Properties.html), [Swift Language Guide - Protocols](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)

> 🤖 **(Android Developers - Kotlin/Java):**
>
> **Comparison:** Kotlin and Java don't have a directly analogous system of built-in utility types like TypeScript for transforming existing types at the type level. However, goals achieved by utility types are often met using different language features or patterns:
>
> - `Partial<T>`: Similar to using nullable types (`String?` in Kotlin) for all properties or employing the Builder pattern for object creation.
> - `Readonly<T>`: Achieved through immutable data classes in Kotlin (`val` properties) or careful class design in Java (final fields, no setters, defensive copies).
> - `Pick<T>`/`Omit<T>`: Often handled by creating specific Data Transfer Objects (DTOs) or using libraries like MapStruct (Java) or Kotlin's data class `copy()` method with modifications for specific views of data.
>
> **Key Takeaway:** TypeScript utility types offer a powerful, type-level way to create variations of types (making properties optional/required, selecting/omitting properties). In Kotlin/Java, similar results are achieved through immutable design, DTOs, builder patterns, or language features for nullability and immutability.
>
> **Source:** [Kotlin Docs - Data Classes](https://kotlinlang.org/docs/data-classes.html), [Effective Java (Item 17: Minimize mutability)](https://www.oreilly.com/library/view/effective-java/9780134686097/)

### Conceptual Content: Transforming Types with Utilities

Utility types take one or more existing types as input and produce a new type as output, often by modifying properties (making them optional, required, read-only) or selecting/omitting specific properties.

#### `Partial<T>`

Constructs a type with all properties of `T` set to optional. This is useful when you want to represent an object that might only have some of the properties of a full type, such as when updating an entity or providing partial data.

A short, self-contained example using `Partial<T>`:

```typescript
interface MedicationDetails {
  medicationId: string;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
}

// Function to update medication details in SpeedyMeds
// It accepts a partial object containing only the fields to be updated.
/**
 * Updates specific details of a medication.
 * Accepts a partial medication object containing only the fields to be updated.
 * @param {string} id - The ID of the medication to update.
 * @param {Partial<MedicationDetails>} updates - An object with properties of MedicationDetails to update.
 * @returns {MedicationDetails} The fully updated medication object (mocked).
 */
function updateMedication(
  id: string,
  updates: Partial<MedicationDetails>
): MedicationDetails {
  // In a real app, this would fetch the existing medication by id,
  // apply the updates, and save it back to the database.
  const existingMedication: MedicationDetails = {
    medicationId: id,
    name: "Amoxicillin",
    description: "A common antibiotic.",
    dosageForm: "Capsule",
    strength: "250mg",
    manufacturer: "Generic Labs",
  };

  // Apply updates
  const updatedMedication = { ...existingMedication, ...updates };
  console.log("Updated Medication:", updatedMedication);
  return updatedMedication;
}

updateMedication("MED001", {
  description: "A broad-spectrum antibiotic.",
  manufacturer: "SpeedyPharm",
});
// Output: Updated Medication: { medicationId: 'MED001', name: 'Amoxicillin',
// description: 'A broad-spectrum antibiotic.', dosageForm: 'Capsule',
// strength: '250mg', manufacturer: 'SpeedyPharm' }

updateMedication("MED002", { strength: "500mg" });
// Output: Updated Medication: { medicationId: 'MED002', name: 'Amoxicillin',
// description: 'A common antibiotic.', dosageForm: 'Capsule',
// strength: '500mg', manufacturer: 'Generic Labs' }
```

In this example, `updateMedication` accepts a `Partial<MedicationDetails>` for the `updates` parameter. This means you can pass an object with only the properties you want to change (e.g., just `description` or just `strength`), and TypeScript will ensure those properties are valid keys of `MedicationDetails` and have the correct types.

#### `Required<T>`

Constructs a type with all properties of `T` set to required. This is the opposite of `Partial<T>`.

A short, self-contained example using `Required<T>`:

```typescript
interface PatientAddress {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

// Type for a fully validated and complete address, e.g., for shipping medication
type CompletePatientAddress = Required<PatientAddress>;

const shippingAddress: CompletePatientAddress = {
  street: "123 Pharmacy Lane",
  city: "Healthville",
  zipCode: "90210",
  country: "USA",
};

// const incompleteAddress: CompletePatientAddress = { street: "456 Oak Rd", city: "Townsville" };
// Error: Property 'zipCode' is missing in type '{ street: string; city: string; }' but required in type 'Required<PatientAddress>'.
// Error: Property 'country' is missing in type '{ street: string; city: string; }' but required in type 'Required<PatientAddress>'.

console.log(`Shipping to: ${shippingAddress.street}, ${shippingAddress.city}`);
// Output: Shipping to: 123 Pharmacy Lane, Healthville
```

Here, `PatientAddress` has all optional properties. `CompletePatientAddress` uses `Required<PatientAddress>` to create a new type where all these properties become mandatory. This is useful for scenarios like form validation where an initially partially filled object must become complete.

#### `Pick<T, K>`

Constructs a type by picking a set of properties `K` (a string literal or union of string literals) from `T`.

A short, self-contained example using `Pick<T, K>`:

```typescript
interface Prescription {
  prescriptionId: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  dateIssued: Date;
  doctorName: string;
}

// Type for displaying a summary of a prescription in a list
type PrescriptionSummary = Pick<
  Prescription,
  "prescriptionId" | "medicationName" | "dateIssued"
>;

const rxSummary: PrescriptionSummary = {
  prescriptionId: "RX98765",
  medicationName: "Metformin",
  dateIssued: new Date("2023-11-15"),
};

// const invalidSummary: PrescriptionSummary = { prescriptionId: "RX123", patientId: "PAT456" };
// Error: Object literal may only specify known properties, and 'patientId' does not exist in type 'PrescriptionSummary'.

console.log(
  `Prescription ID: ${rxSummary.prescriptionId}, Medication: ${rxSummary.medicationName}`
);
// Output: Prescription ID: RX98765, Medication: Metformin
```

`PrescriptionSummary` is created by picking only `prescriptionId`, `medicationName`, and `dateIssued` from the full `Prescription` interface. This is useful for creating smaller, focused types for specific UI components or API responses in SpeedyMeds, ensuring only necessary data is handled.

#### `Omit<T, K>`

Constructs a type by picking all properties from `T` and then removing `K` (a string literal or union of string literals).

A short, self-contained example using `Omit<T, K>`:

```typescript
interface UserProfile {
  userId: string;
  username: string;
  email: string;
  passwordHash: string; // Sensitive information
  lastLogin: Date;
  isActive: boolean;
}

// Type for user data that can be sent to the client (omitting sensitive passwordHash)
type PublicUserProfile = Omit<UserProfile, "passwordHash">;

const publicProfile: PublicUserProfile = {
  userId: "user001",
  username: "jane_pharmacist",
  email: "jane@speedymeds.com",
  lastLogin: new Date(),
  isActive: true,
  // passwordHash property is not allowed here and would cause an error.
};

console.log(
  `Public profile for: ${publicProfile.username}, Email: ${publicProfile.email}`
);
// Output: Public profile for: jane_pharmacist, Email: jane@speedymeds.com
```

`PublicUserProfile` is created by taking all properties from `UserProfile` but omitting `passwordHash`. This is crucial for security when, for example, sending user data from a server to a client application, ensuring sensitive information isn't exposed.

#### `Readonly<T>`

Constructs a type with all properties of `T` set to `readonly`, meaning they cannot be reassigned after object creation.

A short, self-contained example using `Readonly<T>`:

```typescript
interface AppConfiguration {
  apiVersion: string;
  featureFlags: { [key: string]: boolean };
  pharmacyName: string;
}

const initialConfig: AppConfiguration = {
  apiVersion: "v1.2.0",
  featureFlags: { newDashboard: true, enableTeleconsult: false },
  pharmacyName: "SpeedyMeds Central",
};

// Create a readonly version of the configuration to prevent accidental modifications at runtime
const runtimeConfig: Readonly<AppConfiguration> = initialConfig;

console.log(
  `Pharmacy: ${runtimeConfig.pharmacyName}, API Version: ${runtimeConfig.apiVersion}`
);
// Output: Pharmacy: SpeedyMeds Central, API Version: v1.2.0

// runtimeConfig.pharmacyName = "SpeedyMeds Downtown"; // Error: Cannot assign to 'pharmacyName' because it is a read-only property.
// runtimeConfig.featureFlags.newDashboard = false; // Error: Cannot assign to 'newDashboard' because it is a read-only property.
// (Note: This makes properties of featureFlags readonly, but not the object itself deeply. For deep readonly, see other patterns or libraries)
```

`runtimeConfig` is a `Readonly<AppConfiguration>`, making all its top-level properties (like `apiVersion` and `pharmacyName`) read-only. Attempting to change them will result in a TypeScript error. Note that `Readonly<T>` provides shallow immutability; nested objects (like `featureFlags`) are not deeply made read-only by `Readonly<T>` itself unless their types are also `Readonly`.

#### Other Useful Utility Types

TypeScript provides many other utility types. Here are a few more with brief explanations and examples:

- **`Record<Keys, Type>`**: Constructs an object type whose property keys are `Keys` (a string literal, numeric literal, symbol, or a union of these) and whose property values are `Type`. Useful for creating dictionaries or maps.

  ```typescript
  type MedicationForm = "Tablet" | "Capsule" | "Syrup";
  type FormAvailability = Record<MedicationForm, boolean>;

  const availableForms: FormAvailability = {
    Tablet: true,
    Capsule: true,
    Syrup: false,
  };
  console.log(availableForms.Tablet); // Output: true
  ```

- **`Exclude<UnionType, ExcludedMembers>`**: Constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

  ```typescript
  type OrderStatus =
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  type ActiveOrderStatus = Exclude<OrderStatus, "Delivered" | "Cancelled">;
  // ActiveOrderStatus is "Pending" | "Processing" | "Shipped"

  let currentJob: ActiveOrderStatus = "Processing";
  // currentJob = "Cancelled"; // Error
  ```

- **`Extract<Type, Union>`**: Constructs a type by extracting from `Type` all union members that are assignable to `Union`. This is the opposite of `Exclude`.

  ```typescript
  type PaymentMethod = "CreditCard" | "PayPal" | "BankTransfer" | "Cash";
  type OnlinePaymentMethod = Extract<PaymentMethod, "CreditCard" | "PayPal">;
  // OnlinePaymentMethod is "CreditCard" | "PayPal"

  let chosenOnlineMethod: OnlinePaymentMethod = "PayPal";
  ```

- **`NonNullable<Type>`**: Constructs a type by excluding `null` and `undefined` from `Type`.

  ```typescript
  type PatientNotes = string | null | undefined;
  type RequiredPatientNotes = NonNullable<PatientNotes>; // Type is string

  let urgentNote: RequiredPatientNotes = "Patient needs immediate attention!";
  // urgentNote = null; // Error
  ```

- **`Parameters<Type>`**: Constructs a tuple type from the types used in the parameters of a function type `Type`. For overloaded functions, it uses the last (most general) signature.

  ```typescript
  function logPrescription(
    id: string,
    medication: string,
    quantity: number
  ): void {}
  type PrescriptionLogParams = Parameters<typeof logPrescription>;
  // PrescriptionLogParams is [string, string, number]

  const params: PrescriptionLogParams = ["RX123", "Amoxicillin", 30];
  ```

- **`ReturnType<Type>`**: Constructs a type consisting of the return type of a function type `Type`. For overloaded functions, it uses the last (most general) signature.

  ```typescript
  function getPatientRecord(
    patientId: string
  ): { id: string; name: string; history: object[] } | undefined {
    return undefined;
  }
  type PatientRecordType = ReturnType<typeof getPatientRecord>;
  // PatientRecordType is { id: string; name: string; history: object[] } | undefined

  let record: PatientRecordType = { id: "P001", name: "John Doe", history: [] };
  ```

- **`InstanceType<Type>`**: Constructs a type consisting of the instance type of a constructor function type `Type`.

  ```typescript
  class Pharmacy {
    constructor(public name: string, public address: string) {}
  }
  type PharmacyInstance = InstanceType<typeof Pharmacy>;

  const speedyMedsCentral: PharmacyInstance = new Pharmacy(
    "SpeedyMeds Central",
    "123 Main St"
  );
  console.log(speedyMedsCentral.name); // Output: SpeedyMeds Central
  ```

#### Under the Hood: How Utility Types Work & Introduction to Mapped Types

Many of these built-in utility types are not "magic" compiler intrinsics but are themselves implemented using other advanced TypeScript features like **mapped types** and **conditional types**. Mapped types are a powerful way to create new object types by transforming the properties of an existing type. Conditional types allow types to be chosen based on conditions involving other types.

**Mapped Types Explained**

Mapped types iterate over the keys of an existing type (`keyof T`) and create a new property for each key, potentially transforming its type or modifiers (like `readonly` or `?`).

The general syntax for a mapped type is:

```typescript
// For some existing object type T
type NewType = {
  [PropertyKey in keyof T]: TransformedType; // PropertyKey gets each key from T
  // TransformedType is the new type for that property
};
```

**Key Features of Mapped Types:**

1.  **Iterating over Keys:** `K in keyof T` iterates through each property name `K` in the type `T`.
2.  **Accessing Property Types:** `T[K]` looks up the type of the property `K` in the original type `T`.
3.  **Adding Modifiers:** You can add `readonly` or `?` (optional) modifiers to the properties in the new type.
    ```typescript
    type AllOptional<T> = { [P in keyof T]?: T[P] }; // This is Partial<T>
    type AllReadonly<T> = { readonly [P in keyof T]: T[P] }; // This is Readonly<T>
    ```
4.  **Removing Modifiers:** You can also remove modifiers using `-readonly` or `-?`.
    ```typescript
    type AllMutable<T> = { -readonly [P in keyof T]: T[P] };
    type AllRequired<T> = { [P in keyof T]-?: T[P] }; // This is Required<T>
    ```
5.  **Key Remapping via `as`:** You can change the names of the properties in the new type using an `as` clause within the mapped type. This is powerful for creating new shapes or prefixing/suffixing property names.

    ```typescript
    interface ExampleUser {
      id: string;
      name: string;
      email: string;
    }
    // Creates getter methods for each property: e.g., getId, getName
    type Getters<T> = {
      [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
    };
    type UserGetters = Getters<ExampleUser>;
    // UserGetters is:
    // {
    //   getId: () => string;
    //   getName: () => string;
    //   getEmail: () => string;
    // }
    ```

    This example uses template literal types and intrinsic string manipulation types (`Capitalize`) for sophisticated key remapping.

6.  **Filtering Properties with `as` and `never`:** You can filter out keys by remapping them to the `never` type. If a key is remapped to `never`, it won't be included in the resulting type.

7.  **Conditional Property Types:** The type of each property in the new mapped type can be determined by a conditional type.

**Example of a Mapped Type (Conceptual Definition of `Partial<T>`):**

```typescript
// Conceptual definition of Partial<T>
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
```

This iterates over all properties (`P`) in the keys of type `T` (`keyof T`) and makes each one optional (`?`) while keeping its original type (`T[P]`).

**Advanced Mapped Type Example: Creating Form Field Types**

Let's take a `Medication` interface and create a mapped type that transforms its properties into a structure suitable for form fields, where each field has a `value` and an optional `error` string.

```typescript
interface Medication {
  id: string; // Will be included
  name: string; // Will be included
  dosage: number; // Will be included
  unit: string; // Will be included
  manufacturer: { name: string; country: string }; // Will be excluded by the conditional type below
}

/**
 * @template T - The base type whose properties will be transformed into form fields.
 * Transforms properties of T into form field objects ({ value: T[K]; error?: string })
 * if the property type is a string or number. Other property types become 'never'.
 */
type MedicationFormFields<T> = {
  // For each property K in T...
  [K in keyof T]: T[K] extends string | number // If the property type is string or number...
    ? { value: T[K]; error?: string } // ...then create this field structure
    : never; // ...otherwise, exclude this property from the result
};

/**
 * @template T - An object type, typically the result of MedicationFormFields<T>.
 * Filters out properties from T that are of type 'never'.
 * Useful for cleaning up mapped types where some properties were conditionally excluded.
 */
type ValidFormFields<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

type MedicationForm = ValidFormFields<MedicationFormFields<Medication>>;

// Example usage:
const medicationFormState: MedicationForm = {
  id: { value: "med-001" },
  name: { value: "Aspirin", error: "Name might be too generic" },
  dosage: { value: 100 },
  unit: { value: "mg" },
  // 'manufacturer' is not present because its type ({ name: string; country: string })
  // did not satisfy 'string | number', so it became 'never' and was filtered out.
};

console.log(medicationFormState.name.value); // Output: Aspirin
if (medicationFormState.name.error) {
  console.log(`Error for name: ${medicationFormState.name.error}`);
  // Output: Error for name: Name might be too generic
}
```

This more complex example (`MedicationFormFields` and `ValidFormFields`) first transforms properties based on a condition (if they are `string` or `number`). Properties not matching the condition become `never`. Then, `ValidFormFields` filters out these `never` properties to produce the final form type. This showcases the power of combining mapped types with conditional types and key remapping to create highly specific and useful derived types.

Understanding that these utilities are often built from more fundamental type operations like mapped and conditional types empowers you to:

1.  Better grasp how they work.
2.  Potentially create your own custom utility types tailored to specific project needs if the built-in ones don't quite fit.

This promotes DRY (Don't Repeat Yourself) principles at the type level, leading to more maintainable and expressive type definitions.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Utility types are extremely helpful for creating precise and maintainable type definitions without excessive boilerplate. They allow you to build upon existing types in expressive ways, which is essential for managing complex data models and API contracts in applications like SpeedyMeds.
