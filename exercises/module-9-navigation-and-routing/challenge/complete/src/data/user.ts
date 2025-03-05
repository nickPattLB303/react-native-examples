/**
 * Sample user data
 * 
 * This file contains sample user data to use in the app.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dateOfBirth: string;
  memberSince: string;
  prescriptions: {
    id: string;
    medicationName: string;
    doctor: string;
    expiryDate: string;
  }[];
}

const user: User = {
  id: 'USR-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  },
  dateOfBirth: '1985-05-15',
  memberSince: '2022-03-10',
  prescriptions: [
    {
      id: 'PRE-001',
      medicationName: 'Amoxicillin',
      doctor: 'Dr. Smith',
      expiryDate: '2023-12-31',
    },
    {
      id: 'PRE-002',
      medicationName: 'Lisinopril',
      doctor: 'Dr. Johnson',
      expiryDate: '2024-02-15',
    },
    {
      id: 'PRE-003',
      medicationName: 'Metformin',
      doctor: 'Dr. Williams',
      expiryDate: '2023-10-20',
    },
  ],
};

export default user; 