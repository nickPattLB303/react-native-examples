## Section 6: Enums

Enums (enumerations) in TypeScript allow you to define a set of named constants. Using enums can make your code more readable and less error-prone by restricting a variable to a fixed set of possible values. They are useful when you have a group of related constants, such as states, categories, or options.

> 🛣️ **(All Learners):** Enums in TypeScript provide a way to create meaningful, descriptive constants. Understanding when to use them (and when to use alternatives like union types) is important for writing maintainable React Native code.

> 🧑‍🏫 **(Instructor-Led):** Consider comparing TypeScript enums with similar constructs in other languages students might be familiar with: Swift enums, Kotlin/Java enums, or even JavaScript constants. Highlight the runtime behavior differences.

> 🧗‍♀️ **(Self-Led):** When working with enums in your own projects, be mindful of their runtime implications. Try both numeric and string enums in the exercises to see their transpiled JavaScript output. For many cases, you might find union types (covered in Section 3) provide similar benefits with less runtime overhead.

### Conceptual Content: Defining Named Constants

TypeScript supports both numeric and string-based enums.

**1. Numeric Enums**

By default, enums are number-based. The first member is initialized to `0`, and each subsequent member is auto-incremented by `1` from the preceding value. You can also manually set the value of enum members.

- **Syntax & Default Behavior:**

  ```typescript
  enum OrderStatus {
    Pending, // 0
    Processing, // 1
    Shipped, // 2
    Delivered, // 3
    Cancelled, // 4
  }

  let currentOrderStatus: OrderStatus = OrderStatus.Processing;
  console.log(currentOrderStatus); // Output: 1

  // You can also access the name of the enum member from its value:
  console.log(OrderStatus[1]); // Output: Processing
  ```

- **SpeedyMeds Example: Prescription Priority**

  ```typescript
  enum PrescriptionPriority {
    Low = 1, // Manually set the start value
    Medium, // 2 (auto-incremented)
    High, // 3 (auto-incremented)
    Urgent, // 4 (auto-incremented)
  }

  function processPrescription(
    prescriptionId: string,
    priority: PrescriptionPriority
  ): void {
    console.log(
      `Processing prescription ${prescriptionId} with priority: ${PrescriptionPriority[priority]} (Value: ${priority})`
    );
    if (priority === PrescriptionPriority.Urgent) {
      console.log("ALERT: This is an URGENT prescription!");
    }
  }

  processPrescription("RX12345", PrescriptionPriority.High);
  processPrescription("RX67890", PrescriptionPriority.Urgent);
  ```

**Computed and Constant Members:**
Enum members can have constant values (known at compile time) or computed values (evaluated at runtime). Enums with computed members cannot have subsequent members that are not initialized.

```typescript
function getSystemLoad(): number {
  return Math.floor(Math.random() * 10);
}

enum SystemStatus {
  Stable = 0,
  Warning = getSystemLoad(), // Computed member
  // Error = 2, // Error! Enum member must have initializer if preceded by computed member.
  Error = Stable + 5, // OK if it can be computed by the compiler
}
```

For most common use cases, constant enum members (numeric or string literals) are preferred for simplicity and predictability.

**2. String Enums**

In a string enum, each member has to be explicitly initialized with a string literal, or with another string enum member. String enums offer better readability and debugging experience because the string value is directly available without needing to look up a numeric mapping.

- **Syntax:**

  ```typescript
  enum EnumName {
    Member1 = "VALUE1",
    Member2 = "VALUE2",
  }
  ```

- **SpeedyMeds Example: Medication Form**

  ```typescript
  enum MedicationForm {
    Tablet = "TABLET",
    Capsule = "CAPSULE",
    Syrup = "SYRUP",
    Injection = "INJECTION",
    Cream = "CREAM",
  }

  interface Medication {
    name: string;
    form: MedicationForm;
    dosage: string;
  }

  const amoxicillin: Medication = {
    name: "Amoxicillin",
    form: MedicationForm.Capsule,
    dosage: "250mg",
  };

  const hydrocortisone: Medication = {
    name: "Hydrocortisone Cream",
    form: MedicationForm.Cream,
    dosage: "1%",
  };

  function getDispensingInstructions(med: Medication): string {
    switch (med.form) {
      case MedicationForm.Tablet:
      case MedicationForm.Capsule:
        return `Take one ${med.form.toLowerCase()} orally.`;
      case MedicationForm.Syrup:
        return `Take indicated dosage of ${med.form.toLowerCase()} by mouth.`;
      case MedicationForm.Injection:
        return `${med.form.toLowerCase()} to be administered by a healthcare professional.`;
      case MedicationForm.Cream:
        return `Apply ${med.form.toLowerCase()} to affected area.`;
      default:
        // Exhaustiveness check with 'never' can be useful here
        const _exhaustiveCheck: never = med.form;
        return `Consult pharmacist for ${med.form} instructions.`;
    }
  }

  console.log(
    `${amoxicillin.name} (${amoxicillin.dosage}): ${getDispensingInstructions(
      amoxicillin
    )}`
  );
  console.log(
    `${hydrocortisone.name} (${
      hydrocortisone.dosage
    }): ${getDispensingInstructions(hydrocortisone)}`
  );
  ```

  String enums do not have a reverse mapping from value to name (e.g., `MedicationForm["TABLET"]` is not `"Tablet"` but the string value `"TABLET"` itself).

**3. Heterogeneous Enums**

Enums can technically mix string and numeric members, but this is generally discouraged as it can lead to confusion.

```typescript
enum MixedBag {
  Yes = 1,
  No = "NO",
  // Maybe = Yes + 1 // Error here if No is a string
}
```

It's best to stick to either purely numeric or purely string enums for clarity and maintainability.

**4. Enums at Runtime and Compile Time**

Enums are real objects that exist at runtime. This means you can pass enum members to functions, assign them to variables, etc.

However, you can also use `const enums` if you want TypeScript to completely erase the enum definition at compile time and inline the actual values. This can result in a smaller JavaScript bundle.

- **Const Enums:**

  ```typescript
  const enum UserRole {
    Admin = "ADMIN",
    Editor = "EDITOR",
    Viewer = "VIEWER",
  }

  const currentUserRole: UserRole = UserRole.Admin;
  // When compiled, UserRole.Admin might be replaced directly with "ADMIN".
  // You cannot access const enum members via computed property access (e.g., UserRole["Admin"]).
  console.log(`Current user role: ${currentUserRole}`);
  ```

  Const enums are useful for performance-critical scenarios or when you want to avoid the overhead of a runtime enum object, but they have limitations (e.g., no reverse mapping for numeric const enums, and they cannot be discovered at runtime if their module is ambiently declared).

> [!NOTE] > **`Under the Hood`: JavaScript Representation of Enums**
> Regular (non-const) enums are compiled into JavaScript objects that exist at runtime.
>
> - **Numeric Enums:** Generate an Immediately Invoked Function Expression (IIFE) that creates an object with both forward (name to value) and reverse (value to name) mappings.
>   For example, `enum Color { Red = 0, Green = 1 }` might compile to something like:
>   ```javascript
>   // Simplified representation
>   var Color;
>   (function (Color) {
>     Color[(Color["Red"] = 0)] = "Red";
>     Color[(Color["Green"] = 1)] = "Green";
>   })(Color || (Color = {}));
>   ```
> - **String Enums:** Compile to simpler objects containing only the name-to-value mapping.
>   For example, `enum Mode { On = "ON", Off = "OFF" }` might compile to:
>   ```javascript
>   // Simplified representation
>   var Mode = {
>     On: "ON",
>     Off: "OFF",
>   };
>   ```
>   This runtime object is why you can access enum members like `OrderStatus.Processing` and also perform reverse lookups like `OrderStatus[1]` for numeric enums.

**When to Use Enums:**

- When you have a small, fixed set of related constants.
- To improve code readability by giving meaningful names to special values.
- To restrict the possible values a variable can take.

Alternatives to enums in some cases include using string literal union types (e.g., `type DosageForm = "TABLET" | "CAPSULE";`), which can offer similar type safety without creating a runtime object (unless `const enum` is used). Another common pattern is using plain objects with `as const` to create a set of readonly, literal-typed constants.

**Comparing Enums, Literal Unions, and `as const` Objects:**

- **Enums:**

  - Provide a distinct nominal-like type.
  - Numeric enums offer reverse mapping (value to name).
  - Generate runtime JavaScript objects (unless `const enum`), which adds to bundle size.
  - `const enum` values are inlined, avoiding runtime overhead but losing runtime discoverability.

- **Literal Union Types** (e.g., `type Status = "Pending" | "Success";`):

  - Purely a compile-time construct; no runtime overhead.
  - Offer excellent type safety for a fixed set of string or number literals.
  - No reverse mapping or runtime object.
  - Often preferred for simple sets of string or numeric constants where a runtime object isn't needed.

- **Objects with `as const`** (e.g., `const HttpStatus = { Ok: 200, NotFound: 404 } as const;`):
  - Creates a plain JavaScript object with `readonly` properties and literal types for its values.
  - More JavaScript-idiomatic for some developers.
  - Provides a runtime object that can be iterated or used.
  - To get a union type of its values, you can use `typeof HttpStatus[keyof typeof HttpStatus]` (which would result in `200 | 404`).
  - No automatic reverse mapping like numeric enums.

The choice depends on the specific needs: if you need a runtime object with reverse mapping, numeric enums are suitable. If you only need type safety for a set of known string/number constants with no runtime footprint, literal unions are excellent. `as const` objects provide a runtime structure with strong type safety and are a good alternative to string enums if you prefer a plain object.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

Enums provide a clean and type-safe way to work with sets of named constants, making your SpeedyMeds application logic clearer and more robust.

---
