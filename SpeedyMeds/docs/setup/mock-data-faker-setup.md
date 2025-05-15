# Generating Mock Data (Faker.js)

## Overview

To help us build and test the UI without needing a real backend server right away, this project uses a library called [Faker.js](https://fakerjs.dev/). It's a handy tool that creates realistic-looking fake data (like names, addresses, dates, etc.).

**Why?** This lets us work on the app's screens and components using data that looks like the real deal, even before the actual API is ready.

**Important:** Remember, this data is completely fake! In a real app, we'd replace this mock data setup with actual calls to a server.

## Setup (Already Done!)

Faker.js is already installed as a development dependency in the project.

## How It's Used

### 1. Defining Data Shapes (`src/types/index.ts`)

First, we defined TypeScript types (like `UserProfile`, `Prescription`, `Order`) to know exactly what structure our data should have.

```typescript
// Example from src/types/index.ts
export interface Prescription {
  id: string;
  drugName: string;
  // ... other properties
}
```

### 2. Generating Mock Data (`src/api/mockData.ts`)

We created functions in `src/api/mockData.ts` that use Faker.js to generate arrays of data matching our TypeScript types.

- **Using Faker:** Functions like `generateMockUserProfile` or `generateMockPrescriptions` call various `faker` methods (e.g., `faker.person.firstName()`, `faker.location.city()`, `faker.helpers.arrayElement()`) to create the fake data.

  ```typescript
  // Example from src/api/mockData.ts
  import { fakerEN as faker } from "@faker-js/faker";
  import type { Address } from "../types";

  const generateMockAddress = (): Address => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode(),
  });
  ```

- **Mockup Consistency:** You might notice some logic in `mockData.ts` that makes sure specific examples seen in the UI mockups (like certain prescription names) are included in the generated data. This just helps keep things consistent while developing against the mockups.

### 3. Simulating the API (`src/api/index.ts`)

The generated mock data is then used by functions in `src/api/index.ts` (like `fetchUserProfile`, `fetchPrescriptions`). These functions pretend to be real API calls by returning the mock data after a short, artificial delay.

```typescript
// Example from src/api/index.ts
import { generateMockPrescriptions } from "./mockData";
import type { Prescription } from "../types";

const networkDelay = (ms: number) => /* ... */ ;

export const fetchPrescriptions = async (
  count: number = 5,
): Promise<Prescription[]> => {
  await networkDelay(750); // Simulate waiting for a network response
  console.log("API_SIMULATION: fetchPrescriptions called");
  return generateMockPrescriptions(count); // Return the fake data
};
```

## Key Takeaways

- Faker.js gives us realistic fake data to build with.
- Combining it with TypeScript types helps ensure the data structure is correct.
- The fake data is generated in `src/api/mockData.ts` and used by the simulated API in `src/api/index.ts`.
