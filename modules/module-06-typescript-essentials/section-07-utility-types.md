## Section 7: Utility Types

TypeScript comes with a set of built-in utility types that allow you to transform existing types in various common ways. These utilities help create new types based on existing ones without having to redefine them from scratch, promoting DRY (Don't Repeat Yourself) principles and enhancing type flexibility. This section will cover some of the most frequently used utility types like `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Readonly<T>`, with examples relevant to managing data in SpeedyMeds.

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

#### Other Utility Types

TypeScript provides many other utility types, including:

- `Record<K, T>`: Constructs an object type whose property keys are `K` and property values are `T`.
- `Exclude<T, U>`: Constructs a type by excluding from `T` all properties that are assignable to `U`.
- `Extract<T, U>`: Constructs a type by extracting from `T` all properties that are assignable to `U`.
- `NonNullable<T>`: Constructs a type by excluding `null` and `undefined` from `T`.
- `ReturnType<T>`: Constructs a type consisting of the return type of function `T`.
- `Parameters<T>`: Constructs a tuple type from the types used in the parameters of a function type `T`.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Utility types are extremely helpful for creating precise and maintainable type definitions without excessive boilerplate. They allow you to build upon existing types in expressive ways, which is essential for managing complex data models and API contracts in applications like SpeedyMeds.
