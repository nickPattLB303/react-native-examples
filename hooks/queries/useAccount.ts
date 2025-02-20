/**
 * @module hooks/queries/useAccount
 * @description Custom hook for fetching and managing account data
 */

import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

/**
 * @interface Address
 * @description Interface for address data
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

/**
 * @interface PaymentMethod
 * @description Interface for payment method data
 */
export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  lastFourDigits: string;
  expiryDate: string;
  isDefault: boolean;
}

/**
 * @interface Account
 * @description Interface for account data
 */
export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    autoRefill: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generates a fake address using Faker.js
 * @param {boolean} isDefault - Whether this is the default address
 * @returns {Address} A fake address object
 */
function generateAddress(isDefault: boolean = false): Address {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    isDefault,
  };
}

/**
 * Generates a fake payment method using Faker.js
 * @param {boolean} isDefault - Whether this is the default payment method
 * @returns {PaymentMethod} A fake payment method object
 */
function generatePaymentMethod(isDefault: boolean = false): PaymentMethod {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['credit', 'debit']),
    lastFourDigits: faker.string.numeric(4),
    expiryDate: faker.date.future().toISOString().slice(0, 7), // YYYY-MM format
    isDefault,
  };
}

/**
 * Simulates fetching account data from an API
 * @returns {Promise<Account>} A promise that resolves to account data
 */
async function fetchAccount(): Promise<Account> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    dateOfBirth: faker.date.past({ years: 50 }),
    addresses: [
      generateAddress(true),
      ...Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => generateAddress()),
    ],
    paymentMethods: [
      generatePaymentMethod(true),
      ...Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => generatePaymentMethod()),
    ],
    preferences: {
      notifications: faker.datatype.boolean(),
      emailUpdates: faker.datatype.boolean(),
      autoRefill: faker.datatype.boolean(),
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

/**
 * Custom hook for fetching and managing account data
 * @returns {UseQueryResult<Account>} Query result containing account data and status
 * 
 * @example
 * ```tsx
 * function AccountProfile() {
 *   const { data: account, isLoading, error } = useAccount();
 *   
 *   if (isLoading) return <LoadingState message="Loading account..." />;
 *   if (error) return <ErrorState error={error} />;
 *   
 *   return (
 *     <View>
 *       <ProfileHeader
 *         firstName={account.firstName}
 *         lastName={account.lastName}
 *         email={account.email}
 *       />
 *       <AddressList addresses={account.addresses} />
 *       <PaymentMethodList paymentMethods={account.paymentMethods} />
 *     </View>
 *   );
 * }
 * ```
 */
export function useAccount() {
  return useQuery(['account'], fetchAccount, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
} 