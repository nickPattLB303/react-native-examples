// Import built-in Jest matchers
import "@testing-library/jest-native/extend-expect";

// Add any other global setup items here if needed later
// e.g., mocking native modules, setting up mocks for libraries

// Example: Mock a native module if needed
// jest.mock('react-native-some-native-module', () => ({
//   // Mocked functions/properties
// }));

// Example: Mock navigation (useful later)
// jest.mock('@react-navigation/native', () => {
//   const actualNav = jest.requireActual('@react-navigation/native');
//   return {
//     ...actualNav,
//     useNavigation: () => ({
//       navigate: jest.fn(),
//       dispatch: jest.fn(),
//     }),
//     useRoute: () => ({
//       params: {},
//     }),
//   };
// });
