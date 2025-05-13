## Section 2: Basic Types

TypeScript extends JavaScript by adding types. Understanding these basic types is the first step towards leveraging TypeScript's power. These types allow you to declare the expected data shape for your variables, function parameters, and object properties, enabling the TypeScript compiler to catch errors early.

### Conceptual Content: Core Data Types in TypeScript

Let's explore the most commonly used basic types in TypeScript. Many of these will feel familiar if you have experience with JavaScript, but TypeScript provides explicit ways to work with them.

**1. `string`**

Represents textual data, enclosed in single quotes (`'`), double quotes (`"`), or backticks (`` ` `` for template literals).

- **SpeedyMeds Example:**

```typescript
let patientName: string = "John Doe";
let medicationName: string = "Amoxicillin";
let dosageInstructions: string = `${medicationName} 250mg - Take one tablet twice a day.`;

console.log(patientName);
console.log(dosageInstructions);
```

**2. `number`**

Represents all numeric values, including integers and floating-point numbers. TypeScript does not differentiate between `int`, `float`, `double`, etc., as some other languages do.

- **SpeedyMeds Example:**

```typescript
let patientAge: number = 45;
let medicationDosageMg: number = 250.5;
let pillsPerPack: number = 30;

console.log(`Patient Age: ${patientAge}`);
console.log(`Dosage: ${medicationDosageMg}mg`);
```

**3. `boolean`**

Represents a logical value, either `true` or `false`.

- **SpeedyMeds Example:**

```typescript
let requiresPrescription: boolean = true;
let isRefillAvailable: boolean = false;

if (requiresPrescription) {
  console.log("A prescription is required for this medication.");
}
```

**4. `array`**

Represents an ordered list of values. You can define array types in two ways:

- `typeName[]`: (e.g., `string[]` for an array of strings)
- `Array<typeName>`: (e.g., `Array<number>` for an array of numbers)

* **SpeedyMeds Example:**

```typescript
let allergies: string[] = ["Penicillin", "Sulfa"];
let vitalSignsBPM: Array<number> = [72, 75, 68];
let prescriptionHistory: any[] = ["Lisinopril", 10, new Date(2023, 0, 15)]; // Array of mixed types (using 'any' - see below)

console.log(`Patient Allergies: ${allergies.join(", ")}`);
console.log(`Recent Heart Rates: ${vitalSignsBPM}`);
```

**5. `object`**

Represents any non-primitive type (i.e., not `string`, `number`, `boolean`, `symbol`, `null`, or `undefined`). It's a general type; for more specific object shapes, you'll use interfaces or type aliases (covered in the next section).

- **SpeedyMeds Example:**

```typescript
let patientProfile: object;

patientProfile = {
  name: "Jane Doe",
  age: 32,
  contact: {
    email: "jane.doe@example.com",
    phone: "555-0102",
  },
};

console.log(patientProfile);
// console.log(patientProfile.name); // TypeScript might warn here if 'object' type doesn't know about 'name'
// More specific types (interfaces/type aliases) are better for this.
```

**6. `any`**

Represents a dynamic type. Using `any` essentially opts out of type checking for that particular variable. It can be useful during migration from JavaScript or when working with truly dynamic data, but it should be used sparingly as it sacrifices type safety.

- **SpeedyMeds Example:**

```typescript
let medicationDetails: any = "Ibuprofen 200mg";
console.log(medicationDetails.toUpperCase()); // Works, as string has toUpperCase

medicationDetails = { name: "Paracetamol", strength: 500 };
// console.log(medicationDetails.toUpperCase()); // This would cause a runtime error if medicationDetails is now an object.
// TypeScript won't catch this if type is 'any'.

let someValue: any;
someValue = 10;
someValue = "Hello";
someValue = true;
```

> [!CAUTION]
> While `any` provides flexibility, it undermines the core benefit of TypeScript – type safety. Strive to use more specific types whenever possible. Consider `unknown` as a safer alternative if the type is truly unknown.

**7. `unknown`**

A type-safe counterpart to `any`. When a value is of type `unknown`, you cannot perform most operations on it without first performing some form of type checking (like using a type guard or type assertion) to narrow down its type.

- **SpeedyMeds Example:**

```typescript
let externalDrugInfo: unknown;

externalDrugInfo = "Retrieved from external API";

if (typeof externalDrugInfo === "string") {
  console.log(externalDrugInfo.toUpperCase()); // OK, type is narrowed to string
}

// console.log(externalDrugInfo.someProperty); // Error: Object is of type 'unknown'.
```

**8. `void`**

Represents the absence of a return value, typically used as the return type for functions that do not return a value.

- **SpeedyMeds Example:**

```typescript
function logPrescription(medication: string, dosage: number): void {
  console.log(`Prescription logged: ${medication}, ${dosage}mg`);
  // No return statement
}

logPrescription("Metformin", 500);
```

**9. `null` and `undefined`**

In TypeScript, both `null` and `undefined` have their own types, named `null` and `undefined` respectively. By default, `null` and `undefined` are subtypes of all other types, meaning you can assign `null` or `undefined` to something like a `string` or `number` variable. However, when the `strictNullChecks` compiler option is enabled (common in modern TypeScript projects and recommended), `null` and `undefined` can only be assigned to `any`, `unknown`, or their respective types. To allow a variable to hold a specific type OR `null`/`undefined`, you use union types (e.g., `string | null`).

- **SpeedyMeds Example (with `strictNullChecks` in mind):**

```typescript
let patientMiddleName: string | null = null; // Can be a string or null
let nextAppointmentDate: Date | undefined;

patientMiddleName = "Robert";
// patientMiddleName = undefined; // Error if type is string | null (unless also | undefined)

if (nextAppointmentDate) {
  console.log(`Next appointment: ${nextAppointmentDate.toLocaleDateString()}`);
} else {
  console.log("No upcoming appointment scheduled.");
}
```

**10. `never`**

The `never` type represents the type of values that never occur. For example, it's the return type for a function that always throws an error or one that has an infinite loop.

- **SpeedyMeds Example:**

```typescript
function criticalErrorHandler(message: string): never {
  throw new Error(`Critical System Error in SpeedyMeds: ${message}`);
}

function infiniteProcessingLoop(): never {
  while (true) {
    // Process background tasks...
  }
}
```

These basic types form the building blocks for more complex type definitions you'll encounter and create in TypeScript. Mastering them is essential for writing type-safe and maintainable code.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
> - [TypeScript Handbook - Everyday Types (covers primitives, arrays, any, etc.)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

In the next section, we'll explore how to define more complex shapes for our data using interfaces and type aliases.

---

Course Creation Guidelines Complete
