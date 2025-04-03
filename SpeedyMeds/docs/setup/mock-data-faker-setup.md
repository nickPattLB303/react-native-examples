# Mock Data Generation (Faker.js)

## Overview

To facilitate development and testing without relying on a live backend, this project uses [Faker.js](https://fakerjs.dev/) to generate realistic mock data for user profiles, prescriptions, orders, and reminders. This ensures that UI components can be built and tested with data that closely resembles what a real API might return.

## Installation

Faker.js is installed as a development dependency:

```bash
npm install @faker-js/faker --save-dev --legacy-peer-deps
# or using yarn:
# yarn add @faker-js/faker --dev --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag was necessary during setup due to potential peer dependency conflicts within the project. See `SETUP.md` for more details.

## Configuration and Usage

### 1. TypeScript Types (`src/types/index.ts`)

First, TypeScript interfaces and enums were defined to represent the structure of the data needed by the application (e.g., `UserProfile`, `Prescription`, `Order`). This provides type safety for the generated mock data.

```typescript
// Example from src/types/index.ts
export interface Prescription {
  id: string;
  drugName: string;
  dosage: string;
  daysSupplyRemaining: number;
  supplyStatus: PrescriptionSupplyStatus; // Enum
  patientName: string;
  refillsRemaining: number;
  alert: PrescriptionAlert; // Enum
  savingsAmount?: number;
}
```

### 2. Mock Data Generation (`src/api/mockData.ts`)

A dedicated module (`src/api/mockData.ts`) contains functions that use Faker.js to generate data conforming to the defined TypeScript types.

- **Locale Specificity:** To optimize performance and bundle size, the English locale (`en`) is explicitly imported:
  ```typescript
  import { fakerEN as faker } from "@faker-js/faker";
  ```
- **Generator Functions:** Functions like `generateMockUserProfile`, `generateMockPrescriptions`, etc., utilize various Faker methods (`faker.person.firstName()`, `faker.location.streetAddress()`, `faker.date.past()`, `faker.helpers.arrayElement()`, etc.) to create realistic data.
  ```typescript
  // Example from src/api/mockData.ts
  import { fakerEN as faker } from "@faker-js/faker";
  import type { Address } from '../types';

  const generateMockAddress = (): Address => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode(),
  });
  ```
- **Mockup Consistency:** The generation functions include logic to ensure that specific data points shown in the UI mockups (e.g., the Welchol order, specific prescription details) are included in the generated datasets for consistency during development.

### 3. API Simulation (`src/api/index.ts`)

The mock data generators are used within simulated API functions (`fetchUserProfile`, `fetchPrescriptions`, etc.) located in `src/api/index.ts`. These functions mimic network requests by returning the generated data after a short delay.

```typescript
// Example from src/api/index.ts
import { generateMockPrescriptions } from './mockData';
import type { Prescription } from '../types';

const networkDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPrescriptions = async (count: number = 5): Promise<Prescription[]> => {
  await networkDelay(750);
  console.log('API: fetchPrescriptions called');
  return generateMockPrescriptions(count);
};
```

## Key Takeaways

- Faker.js provides realistic data for UI development and testing.
- Explicitly importing locales (`fakerEN`) is recommended for performance.
- Combining Faker with TypeScript interfaces ensures type safety.
- Mock data generation is centralized in `src/api/mockData.ts`. 