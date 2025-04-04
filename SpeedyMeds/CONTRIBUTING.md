# Contributing to SpeedyMeds

Welcome, contributors! We're excited to have you participate in building the SpeedyMeds application as part of the React Native training course. This project is designed as a learning experience, and contributing is a key part of that process. Following these guidelines helps ensure a smooth, effective, and collaborative learning environment for everyone.

## Code of Conduct

Please ensure all interactions (comments, PRs, discussions) are respectful, constructive, and collaborative. We aim for a positive learning environment where everyone feels comfortable asking questions and providing feedback.

## Getting Started

1.  **Complete Environment Setup:** Before writing any code, ensure you have meticulously followed all the setup steps outlined in the main [README.md](./README.md) and the detailed **[SETUP.md](./SETUP.md)**. A correct setup prevents many common issues.
2.  **Understand the Workflow:** Familiarize yourself with the **GitHub Flow** process described below. This is a standard workflow used in many development teams.
3.  **Check Issues & Roadmap:**
    - Look at the project's [GitHub Issues]([Your Repository URL]/issues) `<!-- TODO: Replace [Your Repository URL] with the actual repo URL -->` for available tasks, bugs, or features to work on.
    - Review the [ROADMAP.md](./ROADMAP.md) to understand the planned features and project phases.
    - **Claim an Issue:** If you want to work on an existing issue, please leave a comment indicating your intention to prevent duplicated effort.
    - **Propose New Work:** If you plan to work on something not listed (a new feature idea, a refactor), please **create an issue first** to discuss it with the instructor(s) and ensure it aligns with the project goals.

## Branching Strategy (GitHub Flow)

We use a simple GitHub Flow approach, which is great for projects with frequent releases or continuous deployment (and good for learning).

1.  **Sync `main` Branch:** Before starting any new work, always make sure your local `main` branch is up-to-date with the remote repository's `main` branch.

    ```bash
    # Switch to your local main branch
    git checkout main

    # Pull the latest changes from the remote 'origin' repository
    git pull origin main
    ```

2.  **Create a Feature Branch:** Create a new branch _from_ the up-to-date `main` branch for your specific task. Use a descriptive naming convention prefixed with a type (`feature/`, `fix/`, `chore/`, `docs/`, `test/`):
    - Examples:
      - `feature/add-prescription-list`
      - `fix/order-detail-date-format`
      - `chore/update-react-navigation`
      - `docs/improve-readme-setup`
      - `test/add-account-screen-tests`
    ```bash
    # Create and switch to your new branch
    git checkout -b feature/your-feature-name
    ```
3.  **Commit Changes Frequently:** Make your code changes on your feature branch. Commit your work often with clear, concise messages. We strongly recommend following the [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This standard format helps automate changelog generation and makes commit history easier to understand.

    - **Format:** `<type>[optional scope]: <description>`
    - **Common Types:** `feat` (new feature), `fix` (bug fix), `chore` (build process, tooling), `docs` (documentation changes), `style` (code style changes, formatting), `refactor` (code change that neither fixes a bug nor adds a feature), `test` (adding/fixing tests), `perf` (performance improvement).
    - **Example Commit Message:** `feat: add avatar and user info to AccountScreen`

    ```bash
    # Stage your changes
    git add .

    # Commit with a conventional commit message
    git commit -m "feat: add avatar and user info to AccountScreen"
    ```

4.  **Push Your Branch:** Push your local feature branch to the remote repository (GitHub).
    ```bash
    # Push the branch (the -u flag sets the upstream for the first push)
    git push -u origin feature/your-feature-name
    ```

## Pull Requests (PRs)

Once your feature or fix is complete and pushed to GitHub:

1.  **Self-Review & Test:**
    - Review your own code changes. Does it meet the requirements? Is it clear?
    - **Run Linters & Formatters:** Ensure your code adheres to the project's style guides.
      ```bash
      # Check for linting errors (ESLint)
      npm run lint
      # Apply automatic formatting (Prettier)
      npm run format
      ```
    - **Run Tests:** Ensure all existing tests pass, and add new tests for your changes.
      ```bash
      # Run tests (likely in watch mode, press 'a' to run all if needed)
      npm run test
      ```
2.  **Create Pull Request on GitHub:**
    - Navigate to the repository page on GitHub.
    - You should see a prompt to create a Pull Request from your recently pushed branch. Click it.
    - Ensure the base branch is `main` and the compare branch is your feature branch.
3.  **Use the PR Template:**
    - Fill out the Pull Request template (`.github/PULL_REQUEST_TEMPLATE.md`) thoroughly.
    - **Clearly describe:** What changes were made? Why were they made (motivation/context)? How can the reviewer test the changes? What were the test results? Include screenshots or GIFs if helpful for UI changes.
4.  **Link Related Issues:** If your PR addresses one or more GitHub Issues, link them using keywords like `Closes #123`, `Fixes #456`, or `Resolves #789` in the PR description. This automatically closes the linked issues when the PR is merged.
5.  **Request Review:** Use GitHub's "Reviewers" feature on the right side of the PR page to request a review from the course instructor(s) and/or designated peers.

## Code Standards & Best Practices

Adhering to these standards ensures code quality, consistency, and maintainability, making the project a better learning resource.

- **Language:** Use **TypeScript**. Leverage its features (types, interfaces, enums, generics) to improve code safety and clarity. Avoid using `any` where possible; define specific types instead.
- **Styling:**
  - Use **React Native Paper** for base Material Design components (`Button`, `Text`, `List`, `Avatar`, etc.).
  - Use **Styled Components** (`styled-components/native`) for custom styling, layout, and applying theme values. Create reusable styled components where appropriate.
  - Access theme values (`colors`, `customSpacing`, etc.) via the `theme` prop provided by the `StyledThemeProvider` or the `useTheme` hook.
- **Linting/Formatting:** Code **must** pass ESLint checks (`npm run lint`) and be formatted by Prettier (`npm run format`). Configure your editor for format-on-save using the project's `.vscode/settings.json`.
- **Components:**
  - Aim for small, focused, reusable components.
  - Follow the Single Responsibility Principle.
  - Use functional components with React Hooks.
  - Organize components logically (e.g., within `src/components/` or feature-specific directories if the project grows).
- **Custom Hooks:** Encapsulate reusable stateful logic, side effects (like data fetching wrappers, although `useInitializeAppData` handles most), or complex component logic within custom hooks (e.g., `useDebounce`, `useFormValidation`). Name them starting with `use`.
- **Testing:**
  - Write unit/component tests using **Jest** and **React Native Testing Library (RNTL)**.
  - Focus on testing component behavior from a user's perspective (querying elements, simulating events, asserting on visible output).
  - Test new components, custom hooks, utility functions, and complex logic.
  - Aim for reasonable test coverage for the functionality you add or modify.
  - Place test files in a `__tests__` directory alongside the code they test (e.g., `src/components/Button/__tests__/Button.test.tsx`) or in a central `__tests__` directory.
- **State Management:**
  - Use **Zustand** (`useAppDataStore`) for managing _global_ application state needed across multiple, potentially unrelated components (e.g., user profile, fetched lists).
  - For state local to a single component or shared only within a small, closely related component subtree, use standard React Hooks (`useState`, `useReducer`). Avoid overusing global state.
- **Data Fetching:** Use **TanStack Query (React Query)** via the `useInitializeAppData` hook for fetching and caching application-wide data. For data specific to a single screen/component (if needed later), consider using `useQuery` directly within that component or a dedicated hook.
- **Navigation:** Use **React Navigation**. Follow the established patterns (Stack, Tabs, nested navigators). Use the defined ParamList types (`src/navigation/types.ts`) for type safety.
- **Code Documentation:**
  - Write clear **JSDoc comments** (`/** ... */`) for functions, components, types, and complex logic blocks. Explain the "why" as well as the "what".
  - Use concise **inline comments** (`// ...`) to clarify specific lines or non-obvious code sections.
  - Aim for documentation that helps a novice developer understand the code's purpose and usage.
- **Accessibility (A11y):**
  - Strive to make all UI elements accessible.
  - Use appropriate accessibility props (`accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, `accessibilityState`).
  - Ensure sufficient color contrast (WCAG AA guidelines recommend 4.5:1 for normal text). Use tools to check contrast.
  - Ensure touch targets are adequately sized (at least 44x44 points is recommended).
  - Test with accessibility tools (VoiceOver on iOS, TalkBack on Android) periodically.
  - See: [React Native Accessibility Docs](https://reactnative.dev/docs/accessibility)

## Code Reviews

Code reviews are a critical part of learning and ensuring quality.

- **Reviewers:**
  - Provide **constructive, specific, and respectful** feedback. Focus on the code, not the person.
  - Check for correctness, clarity, performance, adherence to standards (including testing and documentation), and potential improvements.
  - Ask clarifying questions if needed. Suggest alternatives where appropriate.
  - Verify that tests pass and adequately cover the changes.
  - Use GitHub's review tools (commenting, suggesting changes, approving).
- **Authors:**
  - Be **receptive to feedback**. Understand that reviews are meant to improve the code and provide learning opportunities.
  - Respond to comments. Discuss suggestions respectfully if you have different perspectives.
  - Make necessary updates to your branch based on the feedback. Push the changes to update the PR.
  - Address **all** comments before marking the PR as ready for re-review or merging.

## Asking for Help

- **Try First:** Attempt to solve problems yourself first by consulting documentation (project docs, library docs), searching online (Stack Overflow, Google), and using debugging tools.
- **Be Specific:** When asking for help (on Slack, WebEx, or GitHub Issues), clearly describe the problem, what you've tried already, what you expected to happen, and what actually happened. Include relevant code snippets, error messages, and screenshots.
- **Use Appropriate Channels:** Use the designated course communication channel for general questions or discussions. Use GitHub Issues for specific bugs/tasks related to the codebase. Use PR comments for feedback on specific code changes.

---

Thank you for contributing to a positive, collaborative, and high-quality learning experience!
