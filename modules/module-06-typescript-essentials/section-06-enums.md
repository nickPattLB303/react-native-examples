## Section 6: Enums

Enums (enumerations) in TypeScript allow you to define a set of named constants. Using enums can make your code more readable and less prone to errors caused by typos or using arbitrary "magic" numbers or strings. This section covers how to define and use numeric and string enums, which can be particularly useful in the SpeedyMeds application for representing fixed sets of values like order statuses, medication forms, or user roles.

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

Here, `PrescriptionType` uses string values for its members. This makes logs and debugging easier because you see meaningful strings like `"NEW_PRESCRIPTION"` instead of numbers. String enums do not have reverse mapping like numeric enums.

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

`const enums` can offer a slight performance benefit by reducing the amount of generated JavaScript code. However, they have limitations, such as not being able to iterate over their members or access them via computed property names. Reverse mapping is also not available.

> 🛣️ **(All Learners):** String enums are often preferred in modern TypeScript development for their clarity and ease of debugging, as the string values are explicit. Numeric enums are useful when you need bitwise operations or when a numeric representation is more natural for the domain, but ensure their usage is well-documented.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)
> - [TypeScript Docs: Enums (more detailed explanation)](https://www.typescriptlang.org/docs/handbook/enums.html)

Enums help make your code more robust by restricting variables to a predefined set of values, improving type safety and making intentions clearer. They are a valuable tool for representing states, types, or categories within your SpeedyMeds application logic.
