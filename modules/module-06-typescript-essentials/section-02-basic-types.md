## Section 2: Basic Types

This section introduces the fundamental data types in TypeScript. Understanding these basic types is the first step towards leveraging TypeScript's type system to write safer and more predictable code. We'll cover common types like `string`, `number`, and `boolean`, as well as special types like `any`, `unknown`, `void`, `null`, and `undefined`.

### Conceptual Content: Everyday Types in TypeScript

TypeScript extends JavaScript's set of types with a static type system. When you declare a variable, you can (and often should) provide a type annotation to specify what kind of values it can hold.

#### Core Primitive Types

These are the most basic data types available in JavaScript and, by extension, TypeScript.

- **`string`**: Represents textual data. Enclosed in single quotes (`' '`), double quotes (`" "`), or backticks (`` ` ``) for template literals.
  A short, self-contained example of using the `string` type:

  ```typescript
  let medicationName: string = "Amoxicillin";
  let dosageForm: string = "Tablet";
  let instruction: string = `Take ${medicationName} (${dosageForm}) twice a day.`;

  console.log(instruction);
  // Output: Take Amoxicillin (Tablet) twice a day.

  // medicationName = 123; // Error: Type 'number' is not assignable to type 'string'.
  ```

  This example declares three string variables related to our SpeedyMeds app. `medicationName` and `dosageForm` use simple string assignments, while `instruction` uses a template literal to embed other variables. The commented-out line shows how TypeScript would prevent assigning a number to a variable explicitly typed as a string.

- **`number`**: Represents all numbers, including integers and floating-point values. There's no separate `int` or `float` type as in some other languages.
  A short, self-contained example of using the `number` type:

  ```typescript
  let quantityInStock: number = 150;
  let pricePerUnit: number = 25.99;
  let discountPercentage: number = 0.1; // 10%

  let finalPrice: number = pricePerUnit * (1 - discountPercentage);
  console.log(
    `Pills available: ${quantityInStock}, Final price: $${finalPrice.toFixed(
      2
    )}`
  );
  // Output: Pills available: 150, Final price: $23.39

  // quantityInStock = "many"; // Error: Type 'string' is not assignable to type 'number'.
  ```

  Here, `quantityInStock`, `pricePerUnit`, and `discountPercentage` are all declared as numbers. A calculation for `finalPrice` is performed, and its result is logged. The `.toFixed(2)` method is a standard JavaScript number method. The commented-out line demonstrates a type error if a string were assigned to `quantityInStock`.

- **`boolean`**: Represents a logical value, either `true` or `false`.
  A short, self-contained example of using the `boolean` type:

  ```typescript
  let requiresPrescription: boolean = true;
  let isGenericAvailable: boolean = false;

  if (requiresPrescription) {
    console.log("This medication requires a prescription.");
  } else {
    console.log("This medication is available over-the-counter.");
  }
  // Output: This medication requires a prescription.

  // isGenericAvailable = "yes"; // Error: Type 'string' is not assignable to type 'boolean'.
  ```

  This example shows two boolean variables relevant to SpeedyMeds. The `if` statement demonstrates conditional logic based on `requiresPrescription`. Attempting to assign a non-boolean value would result in a TypeScript error.

#### Arrays

TypeScript allows you to define arrays of values. You can specify the type of elements the array can hold using two syntaxes:

- `type[]`: e.g., `number[]` for an array of numbers.
- `Array<type>`: e.g., `Array<string>` for an array of strings.

A short, self-contained example of using array types:

```typescript
let activeIngredients: string[] = ["Simvastatin", "Ezetimibe"];
let batchNumbers: Array<number> = [10234, 20589, 30112];

console.log(`Primary ingredient: ${activeIngredients[0]}`);
// Output: Primary ingredient: Simvastatin

activeIngredients.push("Inactive binder");
// batchNumbers.push("Batch-A"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(batchNumbers);
// Output: [ 10234, 20589, 30112 ]
```

This example demonstrates both syntaxes for declaring typed arrays. `activeIngredients` is an array of strings, and `batchNumbers` is an array of numbers. Standard array operations like `push` work as expected, but TypeScript enforces that only elements of the declared type can be added, as shown by the commented-out error line.

#### Objects

To define the shape of an object, you can use an object type literal. This specifies the names of properties and their types.

A short, self-contained example of using an object type:

```typescript
let patientProfile: {
  patientId: string;
  name: string;
  age: number;
  hasInsurance: boolean;
  allergies?: string[]; // Optional property
};

patientProfile = {
  patientId: "P789012",
  name: "Jane Doe",
  age: 42,
  hasInsurance: true,
  allergies: ["Penicillin", "Sulfa"],
};

console.log(`Patient: ${patientProfile.name}, Age: ${patientProfile.age}`);
// Output: Patient: Jane Doe, Age: 42

// patientProfile.age = "forty-two"; // Error: Type 'string' is not assignable to type 'number'.
// patientProfile.contact = "555-1234"; // Error: Property 'contact' does not exist on type '...'.
```

Here, `patientProfile` is an object whose structure is explicitly defined. It must have `patientId`, `name`, `age`, and `hasInsurance` properties with specified types. The `allergies` property is marked as optional with `?`. Assigning a value of the wrong type to a property or adding an undefined property will result in TypeScript errors.

Later in Section 3, we will explore more powerful ways to define object shapes using `interfaces` and `type` aliases.

#### Special Types

TypeScript has a few special types that are important to understand:

- **`any`**: Represents any JavaScript value. Using `any` effectively disables type checking for that variable. It should be used sparingly, as it undermines the benefits of TypeScript.
  A short, self-contained example illustrating `any`:

  ```typescript
  let flexibleData: any = "Could be a string";
  console.log(flexibleData.toUpperCase()); // Works if it's a string

  flexibleData = 12345;
  console.log(flexibleData.toFixed(2)); // Works if it's a number

  flexibleData = { description: "Or an object" };
  console.log(flexibleData.description); // Works if it has this property

  // No compile-time errors, but potential runtime errors if used incorrectly:
  // console.log(flexibleData.nonExistentProperty.anotherCall());
  ```

  This example shows `flexibleData` assigned values of different types without TypeScript raising an error. While `any` provides flexibility, it sacrifices type safety. Accessing `nonExistentProperty` would not cause a compile-time error but would likely lead to a runtime error. It's often a sign that you might need to define a more specific type or use `unknown`.

- **`unknown`**: Similar to `any`, `unknown` can represent any value. However, it's safer because you must perform type checking (e.g., using `typeof` or type assertions) before you can operate on a value of type `unknown`.
  A short, self-contained example illustrating `unknown`:

  ```typescript
  let userInput: unknown = "123 Main St"; // Simulating user input for SpeedyMeds delivery

  // console.log(userInput.toUpperCase()); // Error: 'userInput' is of type 'unknown'.

  if (typeof userInput === "string") {
    console.log(userInput.toUpperCase()); // OK: userInput is now known to be a string
    // Output: 123 MAIN ST
  }

  let responseCode: unknown = 404;
  if (typeof responseCode === "number") {
    console.log(`API Response Code: ${responseCode}`);
    // Output: API Response Code: 404
  }
  ```

  Here, attempting to call `toUpperCase()` on `userInput` directly results in an error because its type is `unknown`. Only after checking its type with `typeof userInput === 'string'` can we safely call string methods on it. This makes `unknown` a type-safer alternative to `any` when dealing with values of uncertain type.

- **`void`**: Used as the return type for functions that do not return a value.
  A short, self-contained example illustrating `void`:

  ```typescript
  function logMedicationOrder(orderId: string, medication: string): void {
    console.log(`Order ${orderId} placed for ${medication}. No return value.`);
    // No return statement, or an empty return (return;)
  }

  logMedicationOrder("ORD789", "Lisinopril");
  // Output: Order ORD789 placed for Lisinopril. No return value.
  ```

  The `logMedicationOrder` function performs an action (logging to console) but doesn't return any specific value, so its return type is `void`.

- **`null` and `undefined`**: In TypeScript, `null` and `undefined` are actual types that represent the absence of a value. By default, `null` and `undefined` can be assigned to any other type. However, when the `strictNullChecks` compiler option is enabled (which is highly recommended and often default in modern setups like Expo), you must explicitly indicate if a variable can be `null` or `undefined` using a union type (e.g., `string | null`).
  A short, self-contained example illustrating `null` and `undefined` (assuming `strictNullChecks` is on):

  ```typescript
  let prescribingDoctor: string | null = "Dr. Alice Wonderland";
  prescribingDoctor = null; // Allowed because type includes null

  let patientNotes: string | undefined;
  // patientNotes is currently undefined
  patientNotes = "Patient reports mild headache.";
  patientNotes = undefined; // Allowed because type includes undefined (implicitly or explicitly)

  console.log(`Doctor: ${prescribingDoctor}, Notes: ${patientNotes}`);
  // Output: Doctor: null, Notes: undefined

  // let patientAge: number = null; // Error: Type 'null' is not assignable to type 'number' (if strictNullChecks is on)
  let refillCount: number | null = 5;
  refillCount = null;
  ```

  This demonstrates how to explicitly allow `null` or `undefined` for variables using union types. If `strictNullChecks` is enabled (as it should be for robust code), assigning `null` or `undefined` to a type that doesn't explicitly include it will cause an error. This helps prevent unexpected `null` or `undefined` errors at runtime.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
> - [TypeScript Handbook: Everyday Types (covers primitives, arrays, any, unknown, etc.)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
> - [TypeScript Handbook: `null` and `undefined`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
> - [TypeScript Handbook: `unknown` type](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

Mastering these basic types is crucial as they form the building blocks for more complex type definitions and patterns you'll encounter in TypeScript and React Native development. The next section will build upon this foundation by introducing interfaces and type aliases for creating more structured and reusable types.
