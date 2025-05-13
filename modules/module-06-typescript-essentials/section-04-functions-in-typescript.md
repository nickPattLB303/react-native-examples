## Section 4: Functions in TypeScript

Functions are fundamental building blocks in JavaScript and TypeScript. TypeScript enhances functions by allowing you to define types for parameters and return values, leading to more predictable and self-documenting code. This section explores how to effectively use types with functions in TypeScript.

### Conceptual Content: Typing Functions

Let's look at how TypeScript adds a layer of type safety to functions.

**1. Typing Parameters and Return Values**

By default, all function parameters are considered **required**. The TypeScript compiler checks that a value is provided for each required parameter when the function is called.

You can explicitly type function parameters and the value a function is expected to return.

- **Syntax:**

  ```typescript
  function functionName(param1: type1, param2: type2): returnType {
    // function body
    return someValue; // must match returnType
  }
  ```

- **SpeedyMeds Example: Calculating Medication Cost**

  ```typescript
  function calculateMedicationTotal(
    pricePerUnit: number,
    quantity: number,
    discountPercent: number
  ): number {
    const subTotal = pricePerUnit * quantity;
    const discountAmount = subTotal * (discountPercent / 100);
    return subTotal - discountAmount;
  }

  const itemPrice = 15.5; // dollars
  const itemCount = 2;
  const customerDiscount = 10; // 10%

  const finalCost = calculateMedicationTotal(
    itemPrice,
    itemCount,
    customerDiscount
  );
  console.log(`Final cost for medication: $${finalCost.toFixed(2)}`); // Output: Final cost for medication: $27.90

  // const invalidCost = calculateMedicationTotal("15.50", 2, 10); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
  ```

**Return Type Inference:**
If you don't explicitly specify a return type, TypeScript will try to infer it based on the `return` statements in the function. However, it's good practice to always explicitly define return types for clarity and to prevent unintentional changes.

```typescript
function getPatientGreeting(name: string) {
  // Return type inferred as string
  return `Hello, ${name}! Welcome to SpeedyMeds.`;
}
```

**Void Return Type:**
If a function doesn't return any value, you can specify its return type as `void`.

```typescript
function logErrorMessage(message: string, errorCode?: number): void {
  console.error(
    `Error: ${message}` + (errorCode ? ` (Code: ${errorCode})` : "")
  );
}

logErrorMessage("Failed to connect to pharmacy database.", 503);
```

**2. Different Ways to Write Functions**

TypeScript supports various ways to define functions, similar to JavaScript. Regardless of how they are written, the principles of typing parameters and return values apply.

- **Named Functions:**

  ```typescript
  function getMedicationStock(medicationName: string): number {
    // In a real scenario, this would check inventory
    if (medicationName.toLowerCase() === "amoxicillin") return 150;
    if (medicationName.toLowerCase() === "ibuprofen") return 230;
    return 0;
  }
  console.log(`Stock of Amoxicillin: ${getMedicationStock("Amoxicillin")}`);
  ```

- **Anonymous Functions (Function Expressions):**

  ```typescript
  const checkPatientEligibility = function (
    age: number,
    hasPrescription: boolean
  ): boolean {
    return age >= 18 && hasPrescription;
  };

  console.log(`Patient eligible? ${checkPatientEligibility(25, true)}`);
  ```

- **Arrow Functions:**
  Arrow functions provide a concise syntax and lexically bind the `this` value. They are widely used in modern JavaScript and React/React Native development.

  ```typescript
  const getPrescriptionRefillStatus = (
    prescriptionId: string,
    refillsLeft: number
  ): string => {
    if (refillsLeft > 0) {
      return `Prescription ${prescriptionId} has ${refillsLeft} refill(s) remaining.`;
    }
    return `Prescription ${prescriptionId} has no refills left.`;
  };

  console.log(getPrescriptionRefillStatus("RX78910", 2));
  ```

**3. Explicitly Defining Function Types**

Beyond typing parameters and return values inline, you can explicitly define the full type of a function. This is useful when assigning functions to variables, passing them as arguments, or defining them in interfaces or type aliases. The syntax involves specifying parameter types and the return type using an arrow (`=>`).

- **Syntax:** `(param1: type1, param2: type2) => returnType`

- **SpeedyMeds Example: `LogActivityFunction` Type**

  ```typescript
  type LogActivityFunction = (
    userId: string,
    action: string,
    details?: object
  ) => void;

  const auditLog: LogActivityFunction = (user, action, details) => {
    console.log(
      `AUDIT: User '${user}' performed action '${action}'. ${
        details ? "Details: " + JSON.stringify(details) : ""
      }`
    );
  };

  const recordSystemEvent: LogActivityFunction = (
    systemComponent,
    eventName,
    data
  ) => {
    // Parameter names (systemComponent, eventName, data) can differ from the type definition
    // as long as their types are compatible.
    auditLog(`SYSTEM (${systemComponent})`, eventName, data);
  };

  auditLog("pharmacist01", "Viewed Prescription RX1001");
  recordSystemEvent("InventoryModule", "StockLevelLow", {
    medicationNdc: "NDC123",
    currentStock: 5,
  });
  ```

  Here, `LogActivityFunction` defines the contract for any function that logs an activity. Both `auditLog` and `recordSystemEvent` conform to this type.

**4. Optional and Default Parameters**

- **Optional Parameters:**
  You can mark parameters as optional by adding a `?` after the parameter name. Optional parameters must come after required parameters. Inside the function, an optional parameter will have the type `T | undefined` (where `T` is the specified type).

  - **SpeedyMeds Example:**

    ```typescript
    function createPatientProfile(
      firstName: string,
      lastName: string,
      middleName?: string
    ): string {
      return `Patient: ${firstName} ${
        middleName ? middleName + " " : ""
      }${lastName}`;
    }

    console.log(createPatientProfile("John", "Doe")); // Output: Patient: John Doe
    console.log(createPatientProfile("Jane", "Doe", "Alice")); // Output: Patient: Jane Alice Doe
    ```

- **Default Parameters:**
  You can provide default values for parameters. If an argument is not provided for a parameter with a default value (or if `undefined` is passed), the default value is used. Parameters with default values are treated as optional, and TypeScript infers their type from the default value if not explicitly annotated.

  - **SpeedyMeds Example:**

    ```typescript
    function scheduleDelivery(
      patientId: string,
      address: string,
      preferredTimeSlot: string = "Anytime"
    ): void {
      console.log(
        `Scheduling delivery for patient ${patientId} to ${address}. Preferred time: ${preferredTimeSlot}`
      );
    }

    scheduleDelivery("P123", "123 Main St, Anytown");
    scheduleDelivery("P456", "456 Oak Ave, Anytown", "Morning (9AM-12PM)");
    ```

**5. Rest Parameters**

Rest parameters allow a function to accept an indefinite number of arguments as an array. This is useful when you want to work with a variable number of arguments. The rest parameter must be the last parameter in the function signature and must be of an array type.

- **Syntax:** Use the spread operator (`...`) before the parameter name. The rest parameter must be an array type and must be the last parameter in the function signature.

- **SpeedyMeds Example: Logging multiple symptoms**

  ```typescript
  function recordPatientSymptoms(
    patientId: string,
    ...symptoms: string[]
  ): void {
    console.log(`Patient ${patientId} reported the following symptoms:`);
    symptoms.forEach((symptom) => console.log(`- ${symptom}`));
  }

  recordPatientSymptoms("P789", "Headache", "Fever", "Sore Throat");
  recordPatientSymptoms("P101", "Cough");
  ```

**6. Function Overloading**

TypeScript allows you to declare multiple function signatures for a single function name. This is called function overloading and is useful when a function can be called with different numbers or types of arguments and may behave differently or return different types based on the input. The actual implementation of the function must have a signature that is general enough to encompass all the overload signatures. The compiler picks the correct overload based on the arguments provided during the call.

- **Syntax:** Declare the overload signatures first, followed by the implementation signature.

- **SpeedyMeds Example: `findPatient` function**

  ```typescript
  interface PatientSummary {
    id: string;
    fullName: string;
    lastVisit?: Date;
  }

  // Overload signatures
  function findPatient(id: string): PatientSummary | undefined;
  function findPatient(firstName: string, lastName: string): PatientSummary[];

  // Implementation signature (must be compatible with all overloads)
  function findPatient(
    arg1: string,
    arg2?: string
  ): PatientSummary | PatientSummary[] | undefined {
    const mockPatients: PatientSummary[] = [
      { id: "P001", fullName: "John Doe", lastVisit: new Date(2023, 10, 15) },
      { id: "P002", fullName: "Jane Smith", lastVisit: new Date(2024, 0, 5) },
      { id: "P003", fullName: "John Appleseed" },
    ];

    if (typeof arg1 === "string" && arg2 === undefined) {
      // Called with findPatient(id: string)
      console.log(`Searching for patient by ID: ${arg1}`);
      return mockPatients.find((p) => p.id === arg1);
    } else if (typeof arg1 === "string" && typeof arg2 === "string") {
      // Called with findPatient(firstName: string, lastName: string)
      console.log(`Searching for patients named: ${arg1} ${arg2}`);
      return mockPatients.filter(
        (p) => p.fullName.includes(arg1) && p.fullName.includes(arg2)
      );
    }
    return undefined; // Should not happen if called according to overloads
  }

  const patientById = findPatient("P001");
  if (patientById) {
    console.log(`Found by ID: ${patientById.fullName}`);
  }

  const patientsByName = findPatient("John", "Doe"); // Note: Example might need more robust name matching
  console.log(`Found by Name: ${patientsByName.length} patient(s)`);
  if (patientsByName.length > 0) {
    console.log(`  - ${patientsByName[0].fullName}`);
  }

  // const patientByNumber = findPatient(123); // Error: No overload matches this call.
  ```

  When an overloaded function is called, TypeScript tries to match the call with one of the overload signatures from top to bottom. The implementation signature itself is not directly callable from the outside in a way that bypasses the overloads.

**7. Typing `this` in Functions**

TypeScript can help you manage the `this` keyword, which can sometimes be tricky in JavaScript. You can provide an explicit `this` parameter as the first parameter of a function. This parameter is only used for type checking by the TypeScript compiler and is **erased during compilation to JavaScript**; it does not affect the runtime behavior of `this`.

```typescript
interface MedicationDispenser {
  dispense: (medicationName: string) => void;
  checkStock: (this: MedicationDispenser, medicationName: string) => number;
}

const myDispenser: MedicationDispenser = {
  dispense: (medicationName) => {
    console.log(`Dispensing ${medicationName}`);
    // `this` in arrow functions is lexically bound, so it wouldn't typically refer to myDispenser here
    // unless it's part of a method in a class that sets up `this` correctly.
  },
  checkStock: function (
    this: MedicationDispenser,
    medicationName: string
  ): number {
    // Here, `this` is explicitly typed as MedicationDispenser
    // In a real scenario, `this` would refer to the object `myDispenser`
    console.log(
      `Checking stock for ${medicationName} using dispenser context.`
    );
    return Math.random() * 100; // Placeholder for actual stock check
  },
};

myDispenser.checkStock("Aspirin");
// To call a function that expects `this`, you might use .call() or .apply()
// const checkStockFunc = myDispenser.checkStock;
// checkStockFunc("Ibuprofen"); // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'MedicationDispenser'.
```

This is a more advanced use case and often comes into play with callback functions or when separating methods from objects.

Understanding how to type functions effectively is crucial for writing robust and maintainable TypeScript code. It helps prevent common errors related to incorrect argument types, missing arguments, or unexpected return values.

> [!NOTE] > **`Under the Hood`: Function Type Compatibility**
> TypeScript checks if one function type is assignable to another based on their structure. For a function `sourceFunc` to be assignable to a target function type `targetFuncType`:
>
> - **Parameters:** `sourceFunc` must accept at least the parameters of `targetFuncType` (or fewer if `targetFuncType` has optional parameters). Parameter types are generally checked contravariantly (meaning `sourceFunc` parameter types can be supertypes of `targetFuncType` parameter types), though with `strictFunctionTypes: false` (not recommended), they can be bivariant.
> - **Return Type:** The return type of `sourceFunc` must be assignable to (a subtype of) the return type of `targetFuncType` (this is called covariance).
>   This structural compatibility ensures that functions can be used interchangeably if their "shapes" (signatures) match in a type-safe way.

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
> - [TypeScript Handbook - Everyday Types (covers function syntax)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions)

In the next section, we will explore generics, which allow you to write reusable, type-safe functions and classes that can work with a variety of types.

---

Course Creation Guidelines Complete
