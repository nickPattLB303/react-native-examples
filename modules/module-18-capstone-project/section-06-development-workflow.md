## Section 06: Development Workflow: Setup, Debugging, and Testing

Successfully completing the SpeedyMeds capstone project involves more than just writing code; it requires a structured development workflow. This section outlines recommended practices for understanding requirements, implementing features, testing your work, debugging issues, and maintaining code quality.

### 1. Understanding Requirements

Before writing any code for a feature or screen:

- **Consult the Roadmap:** Thoroughly review the **[ROADMAP.md](../../SpeedyMeds/ROADMAP.md)**. It contains the checklist of features to be implemented and serves as your primary guide.
- **Study Mockups:** Refer to the UI mockups provided in **[README.md](../../SpeedyMeds/README.md#%EF%B8%8F-target-ui-mockups)** to understand the visual targets for each screen.
- **Analyze Existing Code:** Familiarize yourself with related placeholder files in `src/screens/`, existing components in `src/components/`, and relevant services in `src/api/` or `src/stores/`.

### 2. Branching and Version Control

While this course module focuses on implementation, in a real-world or group scenario, proper Git practices are essential.

- **Branching:** For each new feature or significant piece of work, create a new branch from the main development branch.
- **Commits:** Make small, logical commits with clear messages.
- **Pull Requests (PRs):** If working in a team, use PRs for code review before merging.
- Refer to **[CONTRIBUTING.md](../../SpeedyMeds/CONTRIBUTING.md)** for general guidelines on Git workflow, which are especially important if you are undertaking this project as part of a group.

### 3. Feature Implementation (Iterative Cycle)

Adopt an iterative approach for implementing each feature or screen:

1.  **Identify & Plan:** Select a feature from the `ROADMAP.md`. Break it down into smaller, manageable tasks. Identify which existing components can be reused and which new ones need to be created.
2.  **Locate Files:** Find the relevant placeholder screen file in `src/screens/`. If creating new reusable components, place them in `src/components/`.
3.  **Component Structure:** Sketch out the component hierarchy for the screen or feature.
4.  **UI Implementation:**
    - Build the static UI using React Native core components, React Native Paper components, and custom Styled Components.
    - Ensure your UI is theme-aware, leveraging the theming system described in Section 05.
    - Focus on layout, styling, and responsiveness to match mockups.
5.  **State Management & Logic:**
    - Integrate client-side state using the Zustand store (`appDataStore`) for UI state or globally shared data.
    - Use TanStack Query (`useQuery`, `useMutation`) to fetch or update data from the mock API (`src/api/`).
    - Implement any business logic required for the feature.
6.  **Navigation:** If the feature involves navigating to new screens or passing data between screens, implement the necessary React Navigation logic, ensuring type safety using definitions from `src/navigation/types.ts`.
7.  **Documentation:** Add JSDoc comments to new functions, components, and complex logic to explain their purpose, parameters, and return values.

> [!TIP]
> Work incrementally! Implement a small piece of functionality, test it visually and logically, and then move to the next piece. This makes debugging easier and provides a sense of progress.

### 4. Testing Your Code

The SpeedyMeds project is set up with Jest and React Native Testing Library for unit and component testing. Writing tests is a crucial part of ensuring your application is robust and maintainable.

- **Locate/Create Test Files:** Tests for components are typically found in a `__tests__` subfolder within the component's directory (e.g., `src/components/MyComponent/__tests__/MyComponent.test.tsx`).
- **`renderWithProviders`:** Use the custom `renderWithProviders` utility from `src/test-utils/renderWithProviders.tsx`. This helper wraps your components with necessary global providers (Theme, Navigation, QueryClient) during tests, ensuring they render correctly and have access to context.

  ```typescript
  // Example usage in a test file
  import { renderWithProviders } from "../../test-utils/renderWithProviders";
  import MyComponent from "../MyComponent";

  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<MyComponent />);
    expect(getByText("Hello World")).toBeTruthy();
  });
  ```

- **Write Meaningful Tests:** Test component rendering, user interactions (e.g., button presses), and any specific logic within your components or hooks.
- **Run Tests:**
  - `npm test`: Runs tests in watch mode, rerunning them as you make changes.
  - `npm run test:ci`: Runs all tests once, suitable for continuous integration environments or a final check.

### 5. Debugging Techniques

Encountering bugs is a normal part of development. React Native and Expo provide several tools to help:

- **Expo Dev Menu:** Access this in your Simulator/Emulator (Cmd+D on iOS, Cmd+M or Ctrl+M on Android, or shake physical device).
  - **Reload:** Reloads the app JavaScript bundle.
  - **Debug Remote JS (Open JS Debugger):** Opens the Chrome DevTools (or your default browser's debugger) allowing you to set breakpoints, inspect variables, and view `console.log` output.
  - **Show Element Inspector:** Helps inspect the UI component tree and styles, similar to browser dev tools.
  - **Toggle Performance Monitor:** Shows real-time performance metrics.
- **`console.log()`:** Your primary tool for quick debugging. Output variables, check function execution, etc. View logs in the Metro bundler terminal or the JS Debugger console.
- **React DevTools:** When the JS Debugger is open, you can usually access React DevTools (often as a tab within the browser DevTools) to inspect the component hierarchy, props, and state.
- **Network Request Inspection:** Use the "Network" tab in your browser's JS Debugger to inspect API requests made by TanStack Query (even though they are to a mock API, they follow standard request patterns).

> [!CAUTION]
> Remember to remove or comment out temporary `console.log` statements before committing your code, especially for production-ready features.

### 6. Maintaining Code Quality

- **Linting (`npm run lint`):** Run ESLint to check your code for potential errors and style issues based on the project's configuration (`.eslintrc.js`). Address any reported warnings or errors.
- **Formatting (`npm run format`):** Use Prettier to automatically format your code according to the project's standards (`prettierrc.js`). VS Code might be configured to format on save if you have the Prettier extension installed and enabled.
- **TypeScript Best Practices:** Leverage TypeScript's features like strong typing, interfaces, and utility types to write clear, maintainable, and less error-prone code.

### 7. Accessibility (A11y)

Ensure your application is accessible to users with disabilities:

- Provide `accessibilityLabel` for interactive elements like buttons and icons that don't have descriptive text.
- Use `accessibilityRole` to define the purpose of components (e.g., `button`, `header`, `summary`).
- Ensure sufficient color contrast (the theming system should help with this, but be mindful of custom color combinations).
- Test with accessibility tools if possible.

> 🛠️ **(Developers new to a comprehensive dev toolchain like Expo's):**
>
> **Comparison:** If you're coming from a simpler setup (e.g., basic web development with minimal tooling), the array of tools and commands (Expo Dev Menu, JS Debugger, Linters, Formatters, Test Runners) might seem like a lot. However, each tool serves a specific purpose in improving development efficiency and code quality.
>
> **Key Takeaway:** Invest a little time in learning the basics of each tool. The Expo Dev Menu is your go-to for quick app interactions. The JS Debugger is invaluable for `console.log` and stepping through code. Linters and formatters automate code consistency, saving you time in the long run. Don't feel you need to master them all at once, but gradually incorporate them into your workflow.
>
> **Source:** Revisit [Module 15: Performance and Debugging](../module-15-performance-and-debugging/section-00-introduction.md). The official Expo documentation on [Debugging](https://docs.expo.dev/debugging/introduction/) is also an excellent resource.

By following this structured workflow, you can tackle the SpeedyMeds capstone project methodically, leading to a higher-quality implementation and a more rewarding development experience.
