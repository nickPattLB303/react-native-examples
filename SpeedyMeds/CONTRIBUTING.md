# Contributing to SpeedyMeds

Welcome, contributors! We're excited to have you participate in building the SpeedyMeds application as part of the React Native training course. Following these guidelines helps ensure a smooth and effective learning and development process for everyone.

## Code of Conduct

Please ensure all interactions are respectful and constructive, following general professional conduct guidelines.

## Getting Started

1.  **Ensure Setup is Complete:** Before contributing, make sure you have followed all the setup steps outlined in the main [README.md](./README.md) and the detailed [SETUP.md](./SETUP.md).
2.  **Understand the Workflow:** Familiarize yourself with the GitHub Flow process described below.
3.  **Check Issues:** Look at the project's [GitHub Issues]([Your Repository URL]/issues) # <-- Replace with actual repo URL/issues
    for tasks or bugs to work on. If you plan to work on something not listed, please create an issue first to discuss it with the instructor(s).

## Branching Strategy (GitHub Flow)

We use a simple GitHub Flow approach:

1.  **Sync `main`:** Before starting work, ensure your local `main` branch is up-to-date with the remote repository:
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Create a Feature Branch:** Create a new branch off `main` for your specific task (feature, bug fix, chore). Use a descriptive naming convention:
    - `feature/short-description` (e.g., `feature/dashboard-layout`)
    - `fix/short-description` (e.g., `fix/login-button-alignment`)
    - `chore/short-description` (e.g., `chore/update-dependencies`)
    - `test/short-description` (e.g., `test/add-button-tests`)
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Commit Changes:** Make your code changes. Commit frequently with clear, concise messages. We recommend following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification:
    - Start with a type (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`).
    - Follow with a short description in the present tense.
    - Example: `feat: add user profile avatar to account screen`
    ```bash
    git add .
    git commit -m "feat: add user profile avatar to account screen"
    ```
4.  **Push Branch:** Push your feature branch to the remote repository:
    ```bash
    git push origin feature/your-feature-name
    ```

## Pull Requests (PRs)

Once your feature or fix is complete:

1.  **Run Linters & Tests:** Ensure your code passes linting checks and all unit tests pass locally:

    ```bash
    # Check for linting errors
    npm run lint
    # or yarn lint

    # Run unit tests (likely in watch mode, press 'a' to run all)
    npm run test
    # or yarn test
    ```

2.  **Create a Pull Request:** Go to the GitHub repository and create a new Pull Request from your feature branch targeting the `main` branch.
3.  **Use the Template:** Fill out the PR template (`.github/PULL_REQUEST_TEMPLATE.md`) providing details about the changes, motivation, testing steps, and test results.
4.  **Link Issues:** If your PR addresses a specific issue, link it in the PR description (e.g., "Closes #123").
5.  **Request Review:** Request a review from the course instructor(s) and/or designated peers via GitHub's review request feature.

## Code Standards

- **Language:** Use TypeScript. Follow best practices.
- **Styling:** Adhere to the "Calm & Clear" visual style. Use `react-native-paper` for components and theming and `styled-components`for further customization.
- **Linting/Formatting:** Follow the rules defined by ESLint and Prettier. Ensure your code passes linting checks (`npm run lint`) before creating a PR. Use format-on-save or run `npm run format` to maintain consistent style.
- **Components:** Create reusable components where appropriate. Keep components focused on a single responsibility.
- **Custom Hooks:** Encapsulate reusable stateful logic, side effects (like data fetching), or complex component logic within custom hooks (e.g., `useUserProfile`, `useOrderTracking`). Follow the `use` naming convention.
- **Testing:** Write unit tests using Jest and React Native Testing Library for new components, custom hooks, utility functions, and complex logic. Aim for reasonable test coverage for the functionality you add or modify. Tests should be placed in a `__tests__` directory alongside the code they are testing or in a central `__tests__` directory.
- **State Management:** Prefer Zustand for managing global application state accessible across multiple components. For simpler state confined to a single component or shared only within a closely related component subtree, use standard React Hooks (`useState`, `useReducer`, `useContext`).
- **Data Fetching:** Use `TanStack Query` (React Query).
- **Navigation:** Use React Navigation.
- **Code Documentation:** Use JSDoc and code comments to document code.
- **Accessibility:** Ensure all components are accessible. Use appropriate ARIA roles, labels, and semantic elements. Test with screen readers and keyboard navigation. Follow React Native's accessibility guidelines and use built-in accessibility props (e.g., `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`). Consider color contrast ratios (minimum 4.5:1 for normal text) and touch target sizes (minimum 44x44 points).

## Code Reviews

- **Reviewers:** Provide constructive, respectful feedback focused on correctness, clarity, adherence to standards (including testing), and learning opportunities. Use GitHub's review comment features. Check if tests pass and cover the changes adequately.
- **Authors:** Be receptive to feedback. Discuss suggestions respectfully and make necessary updates to your branch, including adding or modifying tests as needed. Push the changes to update the PR. Address all comments before requesting re-review or merging.

## Communication

- Use the designated course communication channel (e.g., WebEx, Slack) for general questions, discussions, and coordination.
- Use GitHub PR comments for specific feedback related to code changes.
- Use GitHub Issues for tracking specific tasks, bugs, and feature requests.

Thank you for contributing to a positive and productive learning environment!
