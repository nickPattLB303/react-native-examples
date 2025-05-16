## Section 7: Utility Types

TypeScript comes with a set of built-in utility types that allow you to transform existing types in various common ways. These utilities help create new types based on existing ones without having to redefine them from scratch, promoting DRY (Don't Repeat Yourself) principles and enhancing type flexibility. This section will cover some of the most frequently used utility types like `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Readonly<T>`, with examples relevant to managing data in SpeedyMeds, and then briefly introduce other useful ones.

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

#### Under the Hood: How Utility Types Work (Briefly)

Many of these utility types are not "magic" compiler intrinsics but are themselves implemented using other advanced TypeScript features like **mapped types** and **conditional types** (which allow types to be chosen based on conditions involving other types). For example, `Partial<T>` can be conceptually defined using a mapped type like this:

```typescript
// Conceptual definition
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
```

This iterates over all properties (`P`) in the keys of type `T` (`keyof T`) and makes each one optional (`?`) while keeping its original type (`T[P]`).

Understanding that these utilities are often built from more fundamental type operations empowers you to:

1.  Better grasp how they work.
2.  Potentially create your own custom utility types tailored to specific project needs if the built-in ones don't quite fit.

This promotes DRY (Don't Repeat Yourself) principles at the type level, leading to more maintainable and expressive type definitions.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Utility types are extremely helpful for creating precise and maintainable type definitions without excessive boilerplate. They allow you to build upon existing types in expressive ways, which is essential for managing complex data models and API contracts in applications like SpeedyMeds.
