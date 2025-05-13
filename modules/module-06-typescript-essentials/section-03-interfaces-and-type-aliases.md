## Section 3: Interfaces and Type Aliases

While basic types are essential, real-world applications often deal with more complex data structures. TypeScript provides two primary ways to define the "shape" of objects: interfaces and type aliases. Both allow you to create named types for your data structures, enhancing code readability and providing strong type checking for objects.

### Conceptual Content: Defining Object Shapes

Let's delve into interfaces and type aliases, exploring their syntax, use cases, and differences.

**1. Interfaces (`interface`)**

An interface is a way to define a contract for an object's shape. It specifies the names and types of properties that an object must have. Interfaces are particularly well-suited for describing the shapes of objects or the contracts of classes.

- **Syntax:**

  ```typescript
  interface InterfaceName {
    propertyName1: type1;
    propertyName2: type2;
    optionalProperty?: type3; // Optional properties are denoted with a ?
    readonly readonlyProperty: type4; // Readonly properties cannot be changed after an object is created
  }
  ```

- **SpeedyMeds Example: `Patient` Interface**

  ```typescript
  interface Patient {
    patientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    contactNumber?: string; // Optional
    readonly medicalRecordNumber: string;
    allergies: string[];
  }

  function displayPatientInfo(patient: Patient): void {
    console.log(
      `Patient: ${patient.firstName} ${patient.lastName} (MRN: ${patient.medicalRecordNumber})`
    );
    console.log(`DOB: ${patient.dateOfBirth.toLocaleDateString()}`);
    if (patient.contactNumber) {
      console.log(`Contact: ${patient.contactNumber}`);
    }
    if (patient.allergies.length > 0) {
      console.log(`Allergies: ${patient.allergies.join(", ")}`);
    }
  }

  const currentPatient: Patient = {
    patientId: "P1001",
    firstName: "Alice",
    lastName: "Wonderland",
    dateOfBirth: new Date(1990, 4, 15),
    contactNumber: "555-0100",
    medicalRecordNumber: "MRN789001",
    allergies: ["Dust", "Pollen"],
  };

  displayPatientInfo(currentPatient);

  // currentPatient.medicalRecordNumber = "MRN_NEW"; // Error: Cannot assign to 'medicalRecordNumber' because it is a read-only property.
  ```

**Extending Interfaces:**
Interfaces can extend other interfaces, inheriting their members. This is useful for creating more specialized types based on existing ones.

- **SpeedyMeds Example: `PediatricPatient` Extending `Patient`**

  ```typescript
  interface Patient {
    patientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    readonly medicalRecordNumber: string;
  }

  interface PediatricPatient extends Patient {
    guardianName: string;
    schoolName?: string;
  }

  const childPatient: PediatricPatient = {
    patientId: "P2005",
    firstName: "Charlie",
    lastName: "Brown",
    dateOfBirth: new Date(2015, 8, 20),
    medicalRecordNumber: "MRN654002",
    guardianName: "Sally Brown",
  };

  console.log(
    `${childPatient.firstName} is a pediatric patient, guardian: ${childPatient.guardianName}.`
  );
  ```

**2. Type Aliases (`type`)**

A type alias allows you to create a new name (an alias) for any type, not just object shapes. This can be a primitive type, a union type, a tuple, or any other type.

- **Syntax (for object shapes):**

  ```typescript
  type TypeAliasName = {
    propertyName1: type1;
    propertyName2: type2;
    optionalProperty?: type3;
    readonly readonlyProperty: type4;
  };
  ```

- **SpeedyMeds Example: `Medication` Type Alias**

  ```typescript
  type Medication = {
    medicationId: string;
    name: string;
    dosage: string; // e.g., "250mg", "10ml"
    form: "Tablet" | "Capsule" | "Syrup" | "Injection"; // Union type
    manufacturer?: string;
    readonly ndcCode: string; // National Drug Code
  };

  function logMedication(med: Medication): void {
    console.log(
      `Medication: ${med.name} (${med.dosage}), Form: ${med.form}, NDC: ${med.ndcCode}`
    );
    if (med.manufacturer) {
      console.log(`Manufacturer: ${med.manufacturer}`);
    }
  }

  const painRelief: Medication = {
    medicationId: "M5001",
    name: "Ibuprofen",
    dosage: "200mg",
    form: "Tablet",
    ndcCode: "NDC12345-678-01",
  };

  logMedication(painRelief);
  ```

**Extending Type Aliases (using intersections):**
While type aliases don't have a direct `extends` keyword like interfaces, you can achieve similar results using intersection types (`&`).

- **SpeedyMeds Example: `Prescription` extending `Medication`**

  ```typescript
  type Medication = {
    medicationId: string;
    name: string;
    ndcCode: string;
  };

  type PrescriptionDetails = {
    prescriptionId: string;
    patientId: string;
    prescribingDoctor: string;
    datePrescribed: Date;
    quantity: number;
    refillsRemaining: number;
  };

  type Prescription = Medication &
    PrescriptionDetails & {
      dispensingPharmacy?: string;
    };

  const currentPrescription: Prescription = {
    medicationId: "M6002",
    name: "Lisinopril",
    ndcCode: "NDC98765-432-10",
    prescriptionId: "RXC10098",
    patientId: "P1001",
    prescribingDoctor: "Dr. Eva Smith",
    datePrescribed: new Date(),
    quantity: 30,
    refillsRemaining: 2,
    dispensingPharmacy: "SpeedyMeds Central",
  };

  console.log(
    `Prescription for ${currentPrescription.name}, prescribed by ${currentPrescription.prescribingDoctor}.`
  );
  ```

**3. Interfaces vs. Type Aliases**

For defining object shapes, interfaces and type aliases are often interchangeable. However, there are subtle differences:

- **Extensibility:** Interfaces can be extended using the `extends` keyword. Type aliases can achieve similar results with intersection types (`&`). A key difference is that an interface can be defined multiple times with the same name, and TypeScript will merge these declarations (declaration merging). Type aliases cannot be re-declared once created.

  ```typescript
  // Declaration Merging (Interfaces only)
  interface User {
    name: string;
  }
  interface User {
    age: number;
  }
  const user: User = { name: "John", age: 30 }; // Works!

  // type MyType = { x: number };
  // type MyType = { y: string }; // Error: Duplicate identifier 'MyType'.
  ```

- **Primitive Aliases:** Type aliases can name primitive types, union types, tuples, etc. Interfaces are primarily for object shapes.
  ```typescript
  type PatientID = string | number;
  type Coordinates = [number, number]; // Tuple
  type NullableString = string | null;
  ```
- **Implementation:** Classes can `implement` interfaces (and type aliases that define object shapes) to ensure they adhere to a contract.

**General Recommendation:**

- Use `interface` when defining the shape of objects or contracts for classes, especially if you anticipate needing to extend them or benefit from declaration merging.
- Use `type` for aliasing primitives, union types, tuples, or when you need features not available with interfaces (like mapped types, conditional types, which are more advanced topics).

Many teams establish a convention (e.g., always use `interface` for object shapes unless a `type` alias feature is specifically needed).

> 📚 **Official Documentation:**
>
> - [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces)
> - [TypeScript Handbook - Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
> - [TypeScript Docs: Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

### Exercise 6.1: Defining Interfaces

Now it's time to practice defining your own interfaces.

**Objective:** Define interfaces for a `Pharmacy` and its `StaffMember` within the SpeedyMeds context.

**Instructions:**

1.  Create an interface named `StaffMember` with the following properties:
    - `staffId` (string, readonly)
    - `firstName` (string)
    - `lastName` (string)
    - `role` (union type: "Pharmacist", "Technician", "Cashier")
    - `yearsOfService` (number)
    - `onLeave` (boolean, optional)
2.  Create an interface named `Pharmacy` with the following properties:
    - `pharmacyId` (string, readonly)
    - `name` (string)
    - `address` (string)
    - `phoneNumber` (string)
    - `staff` (an array of `StaffMember` objects)
    - `hasDriveThru` (boolean)
3.  Create an example `Pharmacy` object that utilizes these interfaces, including at least two staff members.
4.  Write a function that takes a `Pharmacy` object and logs its name and the full name of its staff members.

**Access the Exercise:**

**(https://codesandbox.io/s/speedymeds-ts-interfaces-exercise-placeholder)** (Note: This is a placeholder link. A live CodeSandbox link with setup will be provided.)

---

Course Creation Guidelines Complete
