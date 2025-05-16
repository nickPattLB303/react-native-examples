## Section 6: Enums

Enums (enumerations) in TypeScript allow you to define a set of named constants. Using enums can make your code more readable and less prone to errors caused by typos or using arbitrary "magic" numbers or strings. This section covers how to define and use numeric and string enums, their JavaScript representation, `const enums` for optimization, and alternatives like `as const` objects and literal union types. These are particularly useful in the SpeedyMeds application for representing fixed sets of values like order statuses, medication forms, or user roles.

### Conceptual Content: Defining Sets of Named Constants

Enums provide a way to group related values under a common name, improving code clarity and maintainability.

#### Numeric Enums

By default, enums are number-based. The first member is assigned the value `0`, and subsequent members auto-increment from there. You can also manually assign numeric values.

A short, self-contained example of a numeric enum:

```typescript
enum OrderStatus {
  Pending, // 0 by default
  Processing, // 1 by default
  Shipped, // 2 by default
  Delivered, // 3 by default
  Cancelled, // 4 by default
}

let currentOrderStatus: OrderStatus = OrderStatus.Processing;
console.log(`Current order status code: ${currentOrderStatus}`); // Output: Current order status code: 1

// You can also get the name of the enum member from its value:
console.log(`Status name: ${OrderStatus[currentOrderStatus]}`); // Output: Status name: Processing

if (currentOrderStatus === OrderStatus.Shipped) {
  console.log("Order has been shipped.");
} else {
  console.log("Order is not yet shipped or has a different status.");
  // Output: Order is not yet shipped or has a different status.
}

// Manually assigned values
enum DosageForm {
  Tablet = 100,
  Capsule = 200,
  Syrup = 300,
  Injection = 400,
}

let selectedForm: DosageForm = DosageForm.Capsule;
console.log(`Selected dosage form code: ${selectedForm}`); // Output: Selected dosage form code: 200
console.log(`Form name: ${DosageForm[selectedForm]}`); // Output: Form name: Capsule
```

In this SpeedyMeds example, `OrderStatus` defines various stages of an order. `OrderStatus.Processing` evaluates to `1`. Numeric enums allow reverse mapping, meaning you can get the string name of an enum member from its numeric value (e.g., `OrderStatus[1]` gives `"Processing"`). The `DosageForm` enum demonstrates manually assigning starting values.

#### String Enums

String enums are a popular choice because they offer better readability and debugging experiences, as the string value is directly available at runtime. In a string enum, each member must be explicitly initialized with a string literal or another string enum member.

A short, self-contained example of a string enum:

```typescript
enum PrescriptionType {
  New = "NEW_PRESCRIPTION",
  Refill = "REFILL_PRESCRIPTION",
  Transfer = "TRANSFER_PRESCRIPTION",
  Adjustment = "ADJUSTMENT",
}

interface PrescriptionRequest {
  patientId: string;
  type: PrescriptionType;
  medicationName: string;
}

const newRx: PrescriptionRequest = {
  patientId: "PAT789",
  type: PrescriptionType.New,
  medicationName: "Lisinopril",
};

/**
 * Processes a prescription request based on its type.
 * @param {PrescriptionRequest} request - The prescription request object.
 */
function processPrescription(request: PrescriptionRequest): void {
  console.log(
    `Processing a "${request.type}" for patient ${request.patientId} for ${request.medicationName}.`
  );
  if (request.type === PrescriptionType.Refill) {
    console.log("Checking previous prescription details...");
  }
}

processPrescription(newRx);
// Output: Processing a "NEW_PRESCRIPTION" for patient PAT789 for Lisinopril.

// newRx.type = "REFILL"; // Error: Type '"REFILL"' is not assignable to type 'PrescriptionType'.
// You must use the enum member: newRx.type = PrescriptionType.Refill;
```

Here, `PrescriptionType` uses string values for its members. This makes logs and debugging easier because you see meaningful strings like `"NEW_PRESCRIPTION"` instead of numbers. String enums do not have reverse mapping like numeric enums. String enum members can also be initialized with other string enum members.

> 🍏 **(iOS Developers - Swift):**
>
> **Comparison:** Swift's `enum` keyword is very powerful, allowing for associated values, raw values (strings, characters, or any integer or floating-point type), methods, and computed properties. TypeScript enums are simpler, primarily focusing on creating sets of named constants, similar to Swift enums with raw values (especially string or integer raw values). Swift's `CaseIterable` protocol for iterating over enum cases doesn't have a direct, built-in counterpart for TypeScript enums (though you can iterate over object keys for non-const enums).
>
> **Key Takeaway:** TypeScript enums provide a way to define named constants similar to Swift's basic enum usage with raw values. For more complex enum behaviors like associated values, you'd use TypeScript's discriminated unions and other patterns.
>
> **Source:** [Swift Language Guide - Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)

> 🤖 **(Android Developers - Kotlin/Java):**
>
> **Comparison:** Java `enum` types and Kotlin `enum class` are both more feature-rich than basic TypeScript enums, allowing members to have their own properties and methods. TypeScript enums are closer to a simple set of named integer or string constants. Kotlin's `sealed class` offers a more analogous way to represent restricted hierarchies, similar to how discriminated unions are used in TypeScript for more complex "enum-like" scenarios.
>
> **Key Takeaway:** Use TypeScript enums for defining simple sets of related constants. If you need enum members with distinct data or behavior, discriminated unions (covered previously/later) are often a better fit in TypeScript, akin to sealed classes in Kotlin.
>
> **Source:** [Kotlin Docs - Enum Classes](https://kotlinlang.org/docs/enum-classes.html), [Java Tutorials - Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

#### Constant vs. Computed Enum Members

Enum members can have values that are either constant or computed.

- **Constant Members:** Their values are known at compile time. This includes:

  - Members without initializers (which get default numeric values, like in `OrderStatus`).
  - Members initialized with numeric or string literals (like in `DosageForm` or `PrescriptionType`).
  - Members initialized with expressions involving other constant enum members.

- **Computed Members:** Their values are calculated at runtime. If an enum contains computed members, any uninitialized members that come _after_ a computed member _must_ be initialized.

```typescript
/**
 * Returns a starting value, used here to demonstrate computed enum members.
 * @returns {number} The starting value (5).
 */
function getStartingValue() {
  return 5;
}

enum ComplexEnum {
  A, // 0 (constant)
  B = getStartingValue(), // Computed member
  // C, // Error! Enum member must have initializer if previous member is computed.
  D = B + 1, // Computed (depends on B)
  E = "E_VALUE".length, // Computed
}

console.log(ComplexEnum.A); // Output: 0
console.log(ComplexEnum.B); // Output: 5
console.log(ComplexEnum.D); // Output: 6
console.log(ComplexEnum.E); // Output: 7
```

While computed members offer flexibility, they can make enums harder to reason about. Constant members are generally preferred for clarity and predictability.

#### Heterogeneous Enums

While possible, it's generally advised to avoid enums that mix string and numeric members (heterogeneous enums) as they can lead to confusion.

#### Const Enums

For performance-critical applications, you can use `const enums`. `const enum` members are completely inlined at compile time. This means they don't generate any JavaScript code for the enum object itself; only the used values are substituted.

A short, self-contained example of a const enum:

```typescript
const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

let apiCallMethod: HttpMethod = HttpMethod.GET;

// When this TypeScript is compiled to JavaScript, HttpMethod.GET will be replaced directly with "GET".
// No HttpMethod object will exist at runtime.
console.log(`API call will use method: ${apiCallMethod}`); // Output: API call will use method: GET

// console.log(HttpMethod[HttpMethod.GET]); // Error: A const enum member can only be accessed using a string literal.
// Reverse mapping is not supported for const enums.
```

`const enums` can offer a slight performance benefit by reducing the amount of generated JavaScript code. However, they have limitations, such as not being able to iterate over their members or access them via computed property names. Reverse mapping is also not available. `const enum` members can only be initialized with constant enum expressions (not computed values).

#### Under the Hood: How Enums are Compiled to JavaScript

Understanding how enums are translated to JavaScript helps in grasping their runtime behavior (this does not apply to `const enum`s, which are inlined).

- **Numeric Enums:** Compile into a JavaScript object that supports both forward (name to value) and reverse (value to name) mappings. This is often achieved using an Immediately Invoked Function Expression (IIFE).

  ```typescript
  // TypeScript
  enum NumericDirection {
    Up = 1,
    Down,
    Left,
    Right,
  }
  ```

  ```javascript
  // Conceptual Compiled JavaScript (simplified)
  var NumericDirection;
  (function (NumericDirection) {
    NumericDirection[(NumericDirection["Up"] = 1)] = "Up";
    NumericDirection[(NumericDirection["Down"] = 2)] = "Down";
    NumericDirection[(NumericDirection["Left"] = 3)] = "Left";
    NumericDirection[(NumericDirection["Right"] = 4)] = "Right";
  })(NumericDirection || (NumericDirection = {}));
  // console.log(NumericDirection.Up); // 1
  // console.log(NumericDirection[2]); // "Down"
  ```

- **String Enums:** Compile into a simpler JavaScript object that maps names to their string values. No reverse mapping is automatically generated.

  ```typescript
  // TypeScript
  enum StringDirection {
    Up = "UP_DIR",
    Down = "DOWN_DIR",
  }
  ```

  ```javascript
  // Conceptual Compiled JavaScript (simplified)
  var StringDirection = {
    Up: "UP_DIR",
    Down: "DOWN_DIR",
  };
  // console.log(StringDirection.Up); // "UP_DIR"
  ```

#### Alternatives to Enums: `as const` Objects and Literal Union Types

While enums are useful, TypeScript offers other patterns that can sometimes be more idiomatic or lightweight, especially when a full runtime enum object isn\'t needed.

1.  **Object Literals with `as const` (Const Assertions):**
    This creates a true constant object where all properties are `readonly` and their values are treated as literal types. This is often considered more JavaScript-friendly.

    ```typescript
    const MedicationForm = {
      TABLET: "TABLET",
      CAPSULE: "CAPSULE",
      SYRUP: "SYRUP",
    } as const; // The 'as const' assertion is key here

    // To get a union type of the values:
    type MedicationFormValue =
      (typeof MedicationForm)[keyof typeof MedicationForm];
    // MedicationFormValue is "TABLET" | "CAPSULE" | "SYRUP"

    let form: MedicationFormValue = MedicationForm.TABLET;
    // form = "LIQUID"; // Error: Type '"LIQUID"' is not assignable to type 'MedicationFormValue'.

    console.log(MedicationForm.CAPSULE); // Output: CAPSULE
    ```

    The `as const` object provides a runtime object with type-safe values, but no reverse mapping like numeric enums.

2.  **Literal Union Types:**
    For simple sets of string or numeric constants where no runtime object is needed at all, literal union types are the most lightweight and direct approach. They are purely type-level constructs.

    ```typescript
    type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

    let currentPayment: PaymentStatus = "Paid";
    // currentPayment = "Error"; // Error: Type '"Error"' is not assignable to type 'PaymentStatus'.

    console.log(`Payment status: ${currentPayment}`); // Output: Payment status: Paid
    ```

**Choosing Between Enums, `as const`, and Literal Unions:**

- **Enums:** Use when you need a distinct nominal type, when reverse mapping for numeric values is beneficial, or when you prefer the explicit `Enum.Member` syntax. Be mindful that non-const enums add to the generated JavaScript bundle size.
- **`const enum`:** Best for performance-critical scenarios where you need named constants and value inlining, and don\'t need a runtime object or reverse mapping.
- **`as const` Objects:** Good when you want a runtime JavaScript object (e.g., for iteration over keys/values) with strong type safety for its values, and prefer a more standard JavaScript object pattern.
- **Literal Union Types:** Ideal for simple, fixed sets of string or numeric values where you only need type checking and no runtime object representation. They have zero runtime overhead.

For many common cases, especially with string constants, literal union types or `as const` objects offer excellent type safety with potentially less overhead or a more JavaScript-native feel than traditional enums.

### More on Literal Types

Beyond simple union types of string or number literals, TypeScript offers more advanced ways to use literal types, including boolean literals and template literal types.

**1. Boolean Literal Types**

You can use `true` or `false` as types to restrict a variable to a specific boolean value. This is often used in discriminated unions or conditional types.

```typescript
interface SuccessResponse {
  status: "success";
  isValid: true;
  data: object;
}

interface ErrorResponse {
  status: "error";
  isValid: false;
  errorCode: number;
  errorMessage: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * Handles an API response by checking its 'isValid' status.
 * @param {ApiResponse} response - The API response object (either SuccessResponse or ErrorResponse).
 */
function handleResponse(response: ApiResponse) {
  if (response.isValid === true) {
    // Or simply if (response.isValid)
    // TypeScript knows response is SuccessResponse here
    console.log("Data:", response.data);
  } else {
    // TypeScript knows response is ErrorResponse here
    console.log("Error:", response.errorMessage);
  }
}
```

**2. Template Literal Types**

Introduced in TypeScript 4.1, template literal types allow you to construct new string literal types by concatenating or manipulating existing string literal types. They build on string literal types and have the ability to expand into many strings via unions.

```typescript
// Basic string literal types
type MedicationColor = "Red" | "Blue" | "Green";
type MedicationForm = "Pill" | "Syrup" | "Capsule";

// Template literal type combining the above
type MedicationSKU = `${MedicationColor}-${MedicationForm}`;
// This type expands to: "Red-Pill" | "Red-Syrup" | "Red-Capsule" |
//                       "Blue-Pill" | "Blue-Syrup" | "Blue-Capsule" |
//                       "Green-Pill" | "Green-Syrup" | "Green-Capsule"

let sku1: MedicationSKU = "Red-Pill"; // Valid
let sku2: MedicationSKU = "Blue-Capsule"; // Valid
// let sku3: MedicationSKU = "Red-Liquid";   // Error: Type '"Red-Liquid"' is not assignable to type 'MedicationSKU'.
// let sku4: MedicationSKU = "Yellow-Pill"; // Error: Type '"Yellow-Pill"' is not assignable to type 'MedicationSKU'.

console.log(`Selected SKU: ${sku1}`); // Output: Selected SKU: Red-Pill

// Can also be used with built-in string manipulation types like Capitalize, Uncapitalize, Lowercase, Uppercase
type EventName<T extends string> = `${T}Changed`;
type MedicationName = "aspirin" | "ibuprofen";
type MedicationEvent = EventName<Capitalize<MedicationName>>;
// MedicationEvent becomes "AspirinChanged" | "IbuprofenChanged"

let event1: MedicationEvent = "AspirinChanged";
// let event2: MedicationEvent = "aspirinChanged"; // Error
```

Template literal types are very powerful for creating precise string types that reflect patterns in your data, such as event names, style variants, or API route patterns, providing strong type safety for string-based APIs.

> 🛣️ **(All Learners):** String enums or `as const` objects with literal union types are often preferred in modern TypeScript development for their clarity and ease of debugging, as the string values are explicit. Numeric enums are useful when you need bitwise operations or when a numeric representation is more natural for the domain, but ensure their usage is well-documented.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)
> - [TypeScript Docs: Enums (more detailed explanation)](https://www.typescriptlang.org/docs/handbook/enums.html)

Enums help make your code more robust by restricting variables to a predefined set of values, improving type safety and making intentions clearer. They are a valuable tool for representing states, types, or categories within your SpeedyMeds application logic.
