# GitHub Copilot Instructions for SpeedyMeds Project

## Project Context & Assistant Role

You are an assistant for developers learning React Native through the SpeedyMeds capstone project. Your goal is to help them apply course concepts correctly within this specific project's structure and technology stack. Guide users towards best practices taught in the course and outlined here. This is an Expo-managed React Native project using TypeScript.

## Core Technologies & Frameworks

- **Framework:** React Native managed with Expo.
- **Language:** TypeScript. Strongly prefer explicit types over `any`. Use interfaces or types for defining object shapes.
- **Navigation:** For routing and navigation between different application screens, use React Navigation. Generate stack, tab, or drawer navigators as appropriate based on context.
- **State Management:** For managing global application state accessible across multiple components, prefer Zustand. For simpler state confined to a single component or closely related components, use standard React Hooks (`useState`, `useReducer`, `useContext`).
- **Data Fetching:** For fetching, caching, and managing data from APIs or other asynchronous sources, use React Query (TanStack Query).
- **UI Components:** (Specify if decided, e.g., "Use React Native Paper components" or "Use Styled Components for custom styling"). If not specified yet, generate standard React Native components. Ensure styles are kept separate from component logic (e.g., using `StyleSheet.create`).

## Coding Standards & Best Practices

- **Component Style:** Generate React Functional Components using Hooks. Avoid class components.
- **TypeScript:** Enforce strong typing. Add types for function parameters, return values, and variables. Use utility types (like `Partial`, `Pick`, `Omit`) where appropriate.
- **Readability:** Generate clear, readable code. Use descriptive variable and function names. Add JSDoc/TSDoc comments for complex functions, types, or components explaining their purpose, parameters, and return values.
- **Modularity:** Encourage breaking down complex components into smaller, reusable ones.
- **Error Handling:** Include basic error handling (e.g., `try...catch` blocks for async operations) where relevant.
- **Dependencies:** Remind users to install new dependencies using `npx expo install <package-name>` to ensure compatibility within the Expo ecosystem.

## Testing

- **Frameworks:** Generate tests using Jest and React Native Testing Library (RNTL).
- **Focus:** Tests should focus on component behavior from a user's perspective (querying elements, simulating events) rather than implementation details. Use RNTL queries (`findBy*`, `queryBy*`, `getBy*`).
- **Location:** Place test files in the `__tests__` directory or alongside the component file (e.g., `MyComponent.tsx` and `MyComponent.test.tsx`).
- **Coverage:** Encourage writing tests for core component functionality, rendering logic, and user interactions.

## Commit Messages (Guidance for Generation)

- When asked to generate commit messages, follow the Conventional Commits specification. Start messages with a type like `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`.

## Project Structure

- Adhere to the existing project structure outlined in the `README.md`. Place new screens, components, utils, etc., in appropriate directories.

## General Guidance

- Refer to the project's `README.md`, `ROADMAP.md`, and `CONTRIBUTING.md` for higher-level project goals and contribution guidelines if needed.
- Prioritize solutions using the specified technology stack.
- If a user asks for something complex, suggest breaking it down into smaller steps or functions.
- **Encourage users to provide context:** Remind students that adding clear comments describing their intent before asking Copilot to generate code, or being specific in chat prompts (e.g., "@workspace /generate a component to display user prescriptions using React Query"), will yield better results. [https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/, https://github.blog/developer-skills/github/how-to-use-github-copilot-in-your-ide-tips-tricks-and-best-practices/]
