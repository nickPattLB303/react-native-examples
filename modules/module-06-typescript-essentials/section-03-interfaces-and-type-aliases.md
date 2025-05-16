## Section 3: Interfaces and Type Aliases

In the previous section, we learned about basic types and how to define the shape of an object using an object type literal. While that works for simple cases, TypeScript provides more powerful and reusable ways to define complex data structures: `interfaces` and `type` aliases. This section dives into creating and using these, highlighting their similarities, differences, and best use cases, particularly for structuring data in our SpeedyMeds application.

### Conceptual Content: Structuring Data with Interfaces and Type Aliases

Both interfaces and type aliases allow you to create custom names for type annotations, making your code more readable and maintainable.

#### Interfaces

An `interface` is a way to define a contract for an object\'s shape. It specifies what properties an object should have and what their types should be. Interfaces are particularly well-suited for describing the shapes of objects and classes.

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

**Interface Features:**

- **Optional Properties:** Properties can be marked as optional by adding a `?` after their name (e.g., `manufacturer?: string`).

- **Read-only Properties:** Properties can be marked as read-only using the `readonly` keyword. This means they can only be set when the object is first created.

- **Excess Property Checks:** When assigning an object literal _directly_ to a variable or passing it as an argument where an interface type is expected, TypeScript performs "excess property checking." If the object literal has properties not defined in the interface, a compile-time error occurs. This helps catch typos or misunderstandings about the expected shape. This check can be bypassed by assigning the object literal to another variable first or by using a type assertion, though these workarounds should be used cautiously.

- **Function Types in Interfaces:** Interfaces can describe function types. This is useful for defining contracts for functions.

  ```typescript
  interface MedicationSearchFunc {
    (searchTerm: string, includeOutOfStock: boolean): Medication[];
  }

  let searchMedications: MedicationSearchFunc;
  searchMedications = (term, includeOutOfStock) => {
    // Actual search logic for SpeedyMeds inventory would go here...
    console.log(
      `Searching for \'${term}\', include out of stock: ${includeOutOfStock}`
    );
    if (term.toLowerCase() === "ibuprofen") {
      return [ibuprofen]; // Assuming ibuprofen is defined as in the previous example
    }
    return [];
  };
  const results = searchMedications("ibuprofen", false);
  console.log(results.length > 0 ? results[0].name : "No results");
  // Output:
  // Searching for 'ibuprofen', include out of stock: false
  // Ibuprofen
  ```

- **Indexable Types in Interfaces:** Interfaces can describe types that can be "indexed into," like arrays or dictionaries where you access elements/properties using an index (number or string).

  ```typescript
  interface StockLevels {
    [medicationId: string]: number; // String index signature
  }

  const currentStock: StockLevels = {
    MED001: 100,
    MED002: 50,
    MED003: 0,
  };

  console.log(`Stock for MED001: ${currentStock["MED001"]}`); // Output: Stock for MED001: 100
  // currentStock[0] = 10; // Error if mixing index types without multiple signatures.

  interface PharmacyNotes {
    [noteIndex: number]: string; // Numeric index signature
  }
  const notes: PharmacyNotes = [];
  notes[0] = "Patient requested refill.";
  notes[1] = "Insurance pre-authorization pending.";
  console.log(notes[0]); // Output: Patient requested refill.
  ```

  Here, `StockLevels` describes an object where string keys map to number values (stock counts). `PharmacyNotes` describes an array-like structure where numeric indices map to string notes.

- **Extending Interfaces:** Interfaces can extend other interfaces, inheriting their members. This is a powerful way to create more specialized interfaces from general ones.

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

**Working with Union Types (`|`)**

A union type describes a value that can be one of several types. TypeScript uses the vertical bar (`|`) to denote a union type.

```typescript
// Simple union type
type MedicationIdentifier = string | number;

function findMedicationById(id: MedicationIdentifier) {
  // Before we can use methods specific to string or number,
  // TypeScript needs to know which type 'id' currently is.
  if (typeof id === "string") {
    // Here, TypeScript knows 'id' is a string
    console.log(`Searching for medication with string ID: ${id.toUpperCase()}`);
  } else {
    // Here, TypeScript knows 'id' is a number
    console.log(`Searching for medication with numeric ID: ${id.toFixed(0)}`);
  }
}

findMedicationById("MED-123"); // Output: Searching for medication with string ID: MED-123
findMedicationById(45678); // Output: Searching for medication with numeric ID: 45678
```

**Type Narrowing with `typeof` and `instanceof`:**

When you have a value of a union type, TypeScript needs to know which specific type it is before you can use operations unique to that type. This process is called **narrowing**. TypeScript understands common JavaScript constructs like `typeof` and `instanceof` to narrow types within conditional blocks.

- `typeof value === "string"` (or `"number"`, `"boolean"`, `"function"`, etc.)
- `value instanceof ClassName`
- Property presence checks (`'propertyName' in object`)

If TypeScript can determine the specific type within a block, it will allow operations specific to that type.

**Further Versatility of Type Aliases:**

Type aliases can also be used for:

- **Intersection Types:** Combining multiple types into one.

  ```typescript
  type ContactInfo = { email: string; phone?: string };
  type Identity = { id: string; name: string };
  type EmployeeProfile = Identity & ContactInfo & { department: string };

  const employee: EmployeeProfile = {
    id: "emp123",
    name: "John Smith",
    email: "john.s@example.com",
    department: "Logistics",
  };
  ```

- **Function Types:** Aliasing function signatures.

  ```typescript
  type NotificationService = (
    message: string,
    recipientId: PatientID
  ) => boolean;
  const sendSmsNotification: NotificationService = (message, recipientId) => {
    console.log(`SMS to ${recipientId}: ${message}`);
    return true;
  };
  sendSmsNotification("Your prescription is ready for pickup.", "PAT456");
  ```

- **Tuple Types:** (As covered in basic types, they can be aliased for clarity)

  ```typescript
  type MedicationLotInfo = [
    batchNumber: number,
    expiryDate: string,
    quantity: number
  ];
  let lotX: MedicationLotInfo = [12345, "2026-01-31", 500];
  ```

- **Recursive Types:** Type aliases can refer to themselves, which is essential for defining recursive data structures like trees or linked lists.

  ```typescript
  type TreeNode<T> = {
    value: T;
    leftChild?: TreeNode<T>;
    rightChild?: TreeNode<T>;
  };
  const numberTree: TreeNode<number> = {
    value: 10,
    leftChild: { value: 5 },
    rightChild: { value: 15 },
  };
  ```

- **Generic Types:** Type aliases can themselves be generic.
  ```typescript
  type DataWrapper<T> = { data: T; timestamp: Date };
  const medicationData: DataWrapper<Medication> = {
    data: ibuprofen,
    timestamp: new Date(),
  };
  ```

**Advanced Union Type Patterns**

Working effectively with union types often involves more sophisticated patterns for type narrowing and ensuring all cases are handled.

**1. Discriminated Unions (Tagged Unions)**

A common and powerful pattern for working with union types is the **discriminated union**. This involves creating a union where each member type shares a common property (the "discriminant" or "tag") whose literal type is unique to that member. This allows TypeScript to narrow down the type easily using `switch` statements or conditional checks on the discriminant.

```typescript
interface TabletMedication {
  kind: "tablet"; // Discriminant property
  medicationName: string;
  tabletCount: number;
  strengthMg: number;
}

interface SyrupMedication {
  kind: "syrup"; // Discriminant property
  medicationName: string;
  volumeMl: number;
  concentrationMgPerMl: number;
}

interface CreamMedication {
  kind: "cream"; // Discriminant property
  medicationName: string;
  tubeSizeGrams: number;
  applicationArea: string;
}

type DispensedMedication = TabletMedication | SyrupMedication | CreamMedication;

function getDosageInstructions(med: DispensedMedication): string {
  switch (med.kind) {
    case "tablet":
      // TypeScript knows 'med' is TabletMedication here
      return `Take ${med.tabletCount} tablet(s) of ${med.medicationName} (${med.strengthMg}mg).`;
    case "syrup":
      // TypeScript knows 'med' is SyrupMedication here
      return `Take ${med.volumeMl}ml of ${med.medicationName} (${med.concentrationMgPerMl}mg/ml).`;
    case "cream":
      // TypeScript knows 'med' is CreamMedication here
      return `Apply ${med.medicationName} cream to ${med.applicationArea} as directed. Tube size: ${med.tubeSizeGrams}g.`;
    default:
      // Exhaustiveness check: if a new type is added to DispensedMedication
      // and not handled above, this line will cause a TypeScript error.
      const _exhaustiveCheck: never = med;
      return `Unknown medication kind: ${(_exhaustiveCheck as any).kind}`;
  }
}

const pill: DispensedMedication = {
  kind: "tablet",
  medicationName: "Amoxicillin",
  tabletCount: 1,
  strengthMg: 250,
};
const liquid: DispensedMedication = {
  kind: "syrup",
  medicationName: "Cough Syrup",
  volumeMl: 10,
  concentrationMgPerMl: 5,
};

console.log(getDosageInstructions(pill));
// Output: Take 1 tablet(s) of Amoxicillin (250mg).
console.log(getDosageInstructions(liquid));
// Output: Take 10ml of Cough Syrup (5mg/ml).
```

In this SpeedyMeds example, `DispensedMedication` is a discriminated union. Each member (`TabletMedication`, `SyrupMedication`, `CreamMedication`) has a `kind` property with a unique string literal. Inside `getDosageInstructions`, the `switch (med.kind)` statement allows TypeScript to correctly infer the specific type of `med` within each `case` block, enabling safe access to type-specific properties.

**2. User-Defined Type Guards**

Sometimes, `typeof` or `instanceof` aren\'t enough for complex type checking. You can create **user-defined type guards**, which are functions whose return type is a _type predicate_ in the form `parameterName is Type`.

```typescript
interface Prescription {
  prescriptionId: string;
  items: string[];
}

interface OverTheCounterSale {
  saleId: string;
  items: string[];
  loyaltyCardUsed: boolean;
}

type PharmacyTransaction = Prescription | OverTheCounterSale;

// User-defined type guard
function isPrescription(tx: PharmacyTransaction): tx is Prescription {
  return (tx as Prescription).prescriptionId !== undefined;
}

function processTransaction(tx: PharmacyTransaction): void {
  console.log("Processing transaction...");
  if (isPrescription(tx)) {
    // TypeScript knows 'tx' is a Prescription here
    console.log(
      `Prescription ID: ${tx.prescriptionId}. Items: ${tx.items.join(", ")}`
    );
  } else {
    // TypeScript knows 'tx' is an OverTheCounterSale here (by elimination)
    console.log(
      `OTC Sale ID: ${tx.saleId}. Loyalty card: ${tx.loyaltyCardUsed}`
    );
  }
}

const rx: PharmacyTransaction = {
  prescriptionId: "RX123",
  items: ["Aspirin", "Vitamin C"],
};
const otc: PharmacyTransaction = {
  saleId: "SALE456",
  items: ["Band-aids"],
  loyaltyCardUsed: true,
};

processTransaction(rx);
// Output:
// Processing transaction...
// Prescription ID: RX123. Items: Aspirin, Vitamin C
processTransaction(otc);
// Output:
// Processing transaction...
// OTC Sale ID: SALE456. Loyalty card: true
```

If `isPrescription` returns `true`, TypeScript will narrow the type of `tx` to `Prescription` within the `if` block. This is useful for encapsulating complex type checking logic.

**3. Exhaustiveness Checking with `never`**

When working with union types, especially in `switch` statements or a series of `if/else if` blocks, you want to ensure that all possible cases of the union are handled. TypeScript can help with this using the `never` type.

The idea is to assign the variable to a type `never` in the `default` case (or final `else`). If all legitimate cases of the union have been covered, the variable at that point in the code path would indeed be of type `never` (meaning it shouldn\'t be possible to reach that code with a valid member of the union). If you later add a new member to the union type but forget to update the `switch` statement, TypeScript will raise an error because the variable can no longer be considered `never` in the `default` path.

This technique was demonstrated in the `DispensedMedication` example above within the `default` case of the `switch` statement:

```typescript
    default:
      // If all cases are handled, `_exhaustiveCheck` will be `never`
      const _exhaustiveCheck: never = med;
      // If a new medication kind is added to the DispensedMedication union
      // and not handled in a case, 'med' will not be 'never',
      // and this assignment will cause a TypeScript error, reminding you to update the switch.
      return `Unknown medication kind: ${(_exhaustiveCheck as any).kind}`;
```

This is a powerful pattern to make your code more robust against future changes.

#### Differences Between Interfaces and Type Aliases

While interfaces and type aliases can often be used interchangeably for object shapes, there are some key differences:

1.  **Extensibility (Declaration Merging & Augmentation):**

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

    - `Type` aliases describing an object shape can also be implemented by a class (in recent TypeScript versions), but interfaces are generally preferred for this purpose due to their traditional role in object-oriented programming.
    - Type aliases can achieve a form of "extension" using intersection types: `type ExtendedType = BaseType & { additionalProp: string; };` This creates a new type by combining others, rather than modifying an existing one.

    **Module Augmentation (Advanced Declaration Merging):**
    A particularly powerful use of declaration merging is **module augmentation**. This allows you to extend the types defined in external modules, such as libraries or even React Native itself, without modifying their original source code. This is extremely useful for adding custom properties or specializing existing types to fit your application\'s needs.

    For example, you might want to add custom properties to React Native\'s built-in `TextStyle` interface if your application uses a custom text rendering component or has global text style conventions:

    ```typescript
    // In one of your .ts or .d.ts files (e.g., global.d.ts or theme.ts)
    declare module "react-native" {
      // Augment the existing TextStyle interface
      interface TextStyle {
        fontFamilySystem?: string; // Example: for a custom font loading system
        textShadowColorAndroid?: string; // Example: Android-specific property
      }
    }

    // Now you can use these custom properties in your StyleSheet.create calls,
    // and TypeScript will recognize them as valid TextStyle properties.
    // import { StyleSheet } from 'react-native';
    // const styles = StyleSheet.create({
    //   customText: {
    //     fontSize: 16,
    //     fontFamilySystem: 'YourCustomFont-Regular',
    //     textShadowColorAndroid: '#00000033'
    //   }
    // });
    ```

    In this example, we use `declare module 'react-native'` to tell TypeScript we are augmenting the `react-native` module. Inside this block, we redefine the `TextStyle` interface, adding our new optional properties. TypeScript intelligently merges this with the original `TextStyle` definition from React Native.

    Module augmentation is essential for:

    - Extending theme types from styling libraries.
    - Adding custom properties to navigation parameters for React Navigation.
    - Making third-party library types more specific to your project.

    It should be used carefully, typically in dedicated type definition files (`.d.ts`) or specific setup files, to keep track of these global augmentations.

2.  **Implementation (for Classes):**

    - An `interface` can be `implemented` by a class, meaning the class agrees to adhere to the interface's structure.
    - A `type` alias describing an object shape can also be implemented by a class (in recent TypeScript versions), but interfaces are generally preferred for this purpose due to their traditional role in object-oriented programming.

3.  **Mapping Types and Conditional Types:**
    - `Type` aliases are more versatile when it comes to creating more complex types using mapped types or conditional types, which are advanced TypeScript features we might touch upon later. For instance, utility types like `Partial<T>` or `Pick<T, K>` often work more directly with types defined via `type` aliases when constructing new shapes dynamically.

For most object shape definitions in React Native applications, either can work. However, the community often leans towards `interface` for defining props for React components and object shapes, and `type` for union types or more complex type manipulations. The error messages from TypeScript can sometimes be slightly clearer when an interface is mismatched compared to a complex type alias.

#### Choosing Between Interfaces and Type Aliases: Practical Guidance

While many features overlap, especially for defining object shapes, here's some common guidance to help you decide when to use `interface` versus `type`:

- **Use `interface` when:**

  - Defining the shape of objects or class contracts, especially if you anticipate or need declaration merging. This is common for library authors who want to allow users to augment the library's types.
  - You prefer the `extends` keyword for inheritance-like patterns between object shapes (interfaces extending other interfaces can sometimes be slightly more performant for the compiler than type intersections, though this is often negligible).
  - Your project or team style guide explicitly prefers interfaces for object shapes.

- **Use `type` alias when:**
  - Defining unions, intersections, tuples, or creating aliases for primitive types (e.g., `type UserID = string;`).
  - Working with advanced mapped types or conditional types, as type aliases are often more flexible for these complex transformations.
  - You want to ensure a type definition is "closed" and cannot be implicitly extended via declaration merging elsewhere in the codebase.
  - Defining types for React component props and state. Many developers prefer `type` aliases for this purpose because component APIs are generally more constrained and don't typically require declaration merging. The flexibility of `type` aliases for unions and intersections also aligns well with the compositional patterns in React.

**Consistency is Key:** More important than strict adherence to one over the other is consistency within your project or team. Choose a convention (e.g., "use `interface` for all object shapes unless a `type` alias feature like unions is specifically needed," or "always use `type` for component props and state") and apply it uniformly. This improves readability and maintainability.

**Summary Table: Interfaces vs. Type Aliases**

| Feature                     | Interface                                                      | Type Alias                                                                      |
| :-------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Primary Use**             | Defining object shapes, class contracts                        | Naming any type (primitives, unions, intersections, objects, tuples, etc.)      |
| **Declaration Merging**     | Yes                                                            | No                                                                              |
| **Extending/Implementing**  | `extends` for interfaces, `implements` for classes             | Can simulate extension via intersections (`&`); can be `implemented` by classes |
| **Aliasing Non-Objects**    | No (primarily for object shapes, can describe function types)  | Yes (primitives, unions, tuples, function types, etc.)                          |
| **Recursive Types**         | Possible, but sometimes more straightforward with type aliases | Yes, can directly refer to themselves in their definition.                      |
| **Complex Type Creation**   | Less direct for mapped/conditional types                       | Often used as the target for utility, mapped, or conditional types.             |
| **Readability for Objects** | Often preferred for object shapes due to `interface` keyword   | Can be very readable, especially for complex or combined types.                 |
| **Error Messages**          | Sometimes considered slightly clearer for object mismatches    | Generally good, but can be complex for deeply nested/utility types.             |

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
