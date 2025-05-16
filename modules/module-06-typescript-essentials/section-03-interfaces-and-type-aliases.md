## Section 3: Interfaces and Type Aliases

In the previous section, we learned about basic types and how to define the shape of an object using an object type literal. While that works for simple cases, TypeScript provides more powerful and reusable ways to define complex data structures: `interfaces` and `type` aliases. This section dives into creating and using these, highlighting their similarities, differences, and best use cases, particularly for structuring data in our SpeedyMeds application.

### Conceptual Content: Structuring Data with Interfaces and Type Aliases

Both interfaces and type aliases allow you to create custom names for type annotations, making your code more readable and maintainable.

#### Interfaces

An `interface` is a way to define a contract for an object's shape. It specifies what properties an object should have and what their types should be. Interfaces are particularly well-suited for describing the shapes of objects and classes.

**Defining an Interface:**

A short, self-contained example of defining and using an interface:

```typescript
interface Medication {
  medicationId: string;
  name: string;
  dosage: string;
  quantity: number;
  requiresPrescription: boolean;
  manufacturer?: string; // Optional property
  readonlyNDC?: string; // Read-only property (National Drug Code)
}

const ibuprofen: Medication = {
  medicationId: "MED001",
  name: "Ibuprofen",
  dosage: "200mg",
  quantity: 100,
  requiresPrescription: false,
  manufacturer: "SpeedyPharm",
  readonlyNDC: "12345-678-90",
};

function displayMedicationInfo(med: Medication): void {
  console.log(`Medication: ${med.name} (${med.dosage})`);
  console.log(`Quantity: ${med.quantity}`);
  if (med.manufacturer) {
    console.log(`Manufacturer: ${med.manufacturer}`);
  }
  // ibuprofen.readonlyNDC = "NEW-NDC"; // Error: Cannot assign to 'readonlyNDC' because it is a read-only property.
}

displayMedicationInfo(ibuprofen);
// Output:
// Medication: Ibuprofen (200mg)
// Quantity: 100
// Manufacturer: SpeedyPharm
```

In this SpeedyMeds example, the `Medication` interface clearly defines the structure for medication objects. It includes properties like `medicationId`, `name`, `dosage`, `quantity`, and `requiresPrescription`. It also demonstrates an optional property `manufacturer` (using `?`) and a `readonlyNDC` property (using `readonly`). The `displayMedicationInfo` function expects an argument that conforms to the `Medication` interface. TypeScript will ensure that any object passed to this function has the required properties and types. Attempting to modify a `readonly` property after object creation results in a compile-time error.

**Optional Properties:** Properties can be marked as optional by adding a `?` after their name (e.g., `manufacturer?: string`).

**Read-only Properties:** Properties can be marked as read-only using the `readonly` keyword. This means they can only be set when the object is first created.

**Extending Interfaces:** Interfaces can extend other interfaces, inheriting their members. This is a powerful way to create more specialized interfaces from general ones.

A short, self-contained example of extending an interface:

```typescript
interface Prescription {
  prescriptionId: string;
  doctorName: string;
  dateIssued: Date;
}

interface PrescribedMedication extends Medication {
  prescriptionDetails: Prescription;
  refillsRemaining: number;
}

const amoxicillinPrescription: PrescribedMedication = {
  medicationId: "MED002",
  name: "Amoxicillin",
  dosage: "250mg",
  quantity: 30,
  requiresPrescription: true, // Inherited from Medication
  manufacturer: "GenericLabs",
  prescriptionDetails: {
    prescriptionId: "RX78910",
    doctorName: "Dr. Smith",
    dateIssued: new Date("2023-10-26"),
  },
  refillsRemaining: 2,
};

console.log(
  `Prescribed: ${amoxicillinPrescription.name}, Refills: ${amoxicillinPrescription.refillsRemaining}`
);
// Output: Prescribed: Amoxicillin, Refills: 2
```

Here, `Prescription` is a new interface. The `PrescribedMedication` interface extends `Medication`, inheriting all its properties, and adds new ones specific to prescribed drugs, like `prescriptionDetails` and `refillsRemaining`. This promotes reusability and a clear type hierarchy.

#### Type Aliases

A `type` alias allows you to create a new name for any type, not just object types. This can be useful for primitive types, union types, tuple types, or any other type annotation.

**Defining a Type Alias:**

A short, self-contained example of using type aliases:

```typescript
// Type alias for a primitive type
type PatientID = string;

// Type alias for a union type
type MedicationStatus = "Available" | "OutOfStock" | "Discontinued";

// Type alias for an object type (similar to an interface)
type PharmacyLocation = {
  locationId: number;
  address: string;
  phoneNumber: string;
  pharmacistInCharge: string;
};

let currentPatient: PatientID = "PAT456";
let loratadineStatus: MedicationStatus = "Available";

const mainStreetPharmacy: PharmacyLocation = {
  locationId: 1,
  address: "123 Main St, Anytown",
  phoneNumber: "555-0100",
  pharmacistInCharge: "Dr. Emily White",
};

console.log(`Patient ID: ${currentPatient}, Status: ${loratadineStatus}`);
// Output: Patient ID: PAT456, Status: Available
console.log(
  `Main Street Pharmacy managed by: ${mainStreetPharmacy.pharmacistInCharge}`
);
// Output: Main Street Pharmacy managed by: Dr. Emily White

// loratadineStatus = "LowStock"; // Error: Type '"LowStock"' is not assignable to type 'MedicationStatus'.
```

This example demonstrates various uses of `type` aliases. `PatientID` is an alias for `string`. `MedicationStatus` is an alias for a union type, restricting its values to specific strings. `PharmacyLocation` defines an object shape, much like an interface. Type aliases provide a concise way to refer to complex types, improving code readability. The error for `loratadineStatus` shows how the union type restricts possible values.

#### Differences Between Interfaces and Type Aliases

While interfaces and type aliases can often be used interchangeably for object shapes, there are some key differences:

1.  **Extensibility (Declaration Merging):**

    - **Interfaces** can be defined multiple times with the same name, and TypeScript will merge their definitions. This is called "declaration merging." This is useful for augmenting interfaces over time or from different sources.
    - **Type aliases** cannot be merged. If you define a type alias with the same name twice, TypeScript will report an error (duplicate identifier).

    A short, self-contained example illustrating interface declaration merging:

    ```typescript
    interface UserProfile {
      userId: string;
      username: string;
    }

    interface UserProfile {
      email?: string; // email is now merged into UserProfile
      lastLogin: Date;
    }

    const user: UserProfile = {
      userId: "usr123",
      username: "john_doe",
      email: "john.doe@example.com",
      lastLogin: new Date(),
    };

    console.log(`User: ${user.username}, Email: ${user.email}`);
    // Output: User: john_doe, Email: john.doe@example.com
    ```

    The `UserProfile` interface is defined twice. TypeScript merges these definitions, so the `user` object must conform to all properties from both declarations (`userId`, `username`, `email`, `lastLogin`). This feature is particularly useful when extending existing interfaces, perhaps from third-party libraries.

2.  **Implementation (for Classes):**

    - An `interface` can be `implemented` by a class, meaning the class agrees to adhere to the interface's structure.
    - A `type` alias describing an object shape can also be implemented by a class (in recent TypeScript versions), but interfaces are generally preferred for this purpose due to their traditional role in object-oriented programming.

3.  **Mapping Types and Conditional Types:**
    - `Type` aliases are more versatile when it comes to creating more complex types using mapped types or conditional types, which are advanced TypeScript features we might touch upon later. For instance, utility types like `Partial<T>` or `Pick<T, K>` often work more directly with types defined via `type` aliases when constructing new shapes dynamically.

**When to Use Which?**

- **Use `interface` when:**
  - Defining the shape of objects or classes.
  - You need extensibility through declaration merging.
  - You want to define a contract that a class must implement.
- **Use `type` when:**
  - Defining aliases for primitive types (e.g., `type UserID = string;`).
  - Defining aliases for union types (e.g., `type Status = "success" | "error";`).
  - Defining aliases for tuple types.
  - You need to use mapped types or conditional types to create complex utility types.

For most object shape definitions in React Native applications, either can work. However, the community often leans towards `interface` for defining props for React components and object shapes, and `type` for union types or more complex type manipulations.

> 🛣️ **(All Learners):** Consistency is key. Whichever you choose for defining object shapes, try to stick with it within a project or team for better readability and maintainability. Many projects use interfaces for public API definitions (like component props) and type aliases for internal state or simpler type combinations.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces)
> - [TypeScript Handbook: Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
> - [TypeScript Docs: Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

### Exercise 6.1: Defining Interfaces

Now it's time to practice what you've learned about interfaces.

**Objective:** Define interfaces to model patient and prescription data for the SpeedyMeds application.

**Instructions:**

1.  Create an interface named `Patient` with the following properties:
    - `patientId` (string, read-only)
    - `firstName` (string)
    - `lastName` (string)
    - `dateOfBirth` (Date)
    - `contactNumber` (string, optional)
    - `allergies` (array of strings, optional)
2.  Create an interface named `PrescriptionItem` with the following properties:
    - `medicationName` (string)
    - `dosage` (string)
    - `quantity` (number)
3.  Create an interface named `PrescriptionRecord` that extends `Patient` and adds the following properties:
    - `prescriptionId` (string, read-only)
    - `doctorName` (string)
    - `datePrescribed` (Date)
    - `items` (array of `PrescriptionItem` objects)
    - `isFilled` (boolean)
4.  Create an example object instance for `PrescriptionRecord` and log some of its properties to the console.

**Tool:** CodeSandbox

**(https://codesandbox.io)** (_Note: You will need to create a new TypeScript sandbox or use a provided template._)

This exercise will help you solidify your understanding of creating, extending, and using interfaces to structure complex data, a common task in application development.
