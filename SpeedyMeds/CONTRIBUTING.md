# Contributing to Your SpeedyMeds Group Project

Welcome, team! This guide outlines how you'll contribute to the SpeedyMeds application within **your assigned group's dedicated repository fork** (or the main repository if working individually).

Following these steps ensures everyone can work together effectively and learn standard development practices.

**Remember:** You are working within a copy (a fork) of the main template repository, specifically created for your training group, or directly in the main repository per instructor guidance. All your work (branches, commits, Pull Requests) will happen **inside this designated repository**.

## Getting Started: Your Project Repository

1.  **Clone Your Repository:** Your instructor will provide the URL for your specific repository (e.g., `SpeedyMeds-Group-Apr` or the main project repo). Clone this repository to your local machine. **Do not clone other template repositories unless instructed.**
    ```bash
    # Example: Replace with YOUR repository's actual URL
    git clone <your_repository_url>
    cd <your_repository_directory>
    ```
2.  **Ensure You're on `main`:** The `main` branch contains the starting code (Option 2 state: architecture complete, placeholder screens). Make sure you start from this branch.
    ```bash
    git checkout main
    git pull origin main # Ensure you have the latest starting code
    ```
3.  **Complete Environment Setup:** Before writing code, ensure you've followed the setup steps in `SETUP.md` within your cloned repository. A correct setup prevents many common issues.
4.  **Understand the Workflow:** Familiarize yourself with the branching and Pull Request process described below (if applicable to your course structure).
5.  **Check for Tasks:** Your instructor will likely assign tasks or features. Coordinate with your instructor and teammates (if applicable) on who is working on what (e.g., using course communication channels or potentially GitHub Issues _within your repository_ if enabled).

## Branching Strategy (Within Your Repository)

We use a simple feature branching workflow.

1.  **Sync `main` Branch:** Before starting new work, ensure your local `main` branch (which contains the starting code or the latest integrated code) is up-to-date with the `main` branch on GitHub _in your repository_.

    ```bash
    # Switch to your local main branch
    git checkout main

    # Pull the latest changes from your repository's main branch
    # 'origin' should point to your repo by default when you clone it
    git pull origin main
    ```

2.  **Create a Feature Branch:** Create a new branch _from_ the up-to-date `main` branch for your specific task. Use a descriptive naming convention prefixed with a type (`feature/`, `fix/`, `chore/`, `docs/`, `test/`):
    - Examples:
      - `feature/implement-prescription-list-ui`
      - `fix/order-detail-date-format`
      - `chore/update-react-navigation`
      - `docs/improve-readme-setup`
      - `test/add-account-screen-tests`
    ```bash
    # Create and switch to your new branch (make sure you're on 'main' first)
    git checkout -b feature/your-feature-name
    ```
3.  **Commit Changes Frequently:** Make your code changes on your feature branch. Commit your work often with clear, concise messages. We strongly recommend following the [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) specification.

    - **Format:** `<type>[optional scope]: <description>`
    - **Common Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`.
    - **Example:** `feat: implement basic layout for AccountScreen`

    ```bash
    # Stage your changes
    git add .

    # Commit with a conventional commit message
    git commit -m "feat: implement basic layout for AccountScreen"
    ```

4.  **Push Your Branch:** Push your local feature branch to **your repository** on GitHub.
    ```bash
    # Push the branch (the -u flag sets the upstream for the first push)
    git push -u origin feature/your-feature-name
    ```

### Workflow Visualization

```mermaid
graph TD
   A[Start Task] --> B(git checkout main);
   B --> C(git pull origin main);
   C --> D(git checkout -b feature/your-feature);
   D --> E[Code & Commit];
   E --> F(git push -u origin feature/your-feature);
   F --> G{Create PR on GitHub (If Req.)};
   G --> H{Request Review (If Req.)};
   H --> I{Address Feedback (If Req.)};
   I --> J[Merge PR (If Req.)];
   J --> K[End Task];
   I --> E;
```

## Pull Requests (PRs) - If Applicable

If your course involves Pull Requests for review/merging:

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
      # Or run once for CI-like check
      npm run test:ci
      ```
2.  **Create Pull Request on GitHub (Within Your Repo):**
    - Navigate to **your repository page** on GitHub.
    - You should see a prompt to create a Pull Request from your recently pushed branch. Click it.
    - Ensure the **base branch** is `main` and the **compare branch** is your feature branch.
3.  **Use the PR Template:**
    - Fill out the Pull Request template (`.github/PULL_REQUEST_TEMPLATE.md` if present) thoroughly.
    - **Clearly describe:** What changes were made? Why? How can it be tested? Include screenshots/GIFs for UI changes.
4.  **Link Related Issues (If Applicable):** If your repository uses GitHub Issues, link them using keywords like `Closes #123` in the PR description.
5.  **Request Review:** Use GitHub's "Reviewers" feature to request a review from the course instructor(s) and/or designated peers as per course instructions.

## Code Standards & Best Practices

- **Language:** Use **TypeScript**. Avoid `any` where possible.
- **Styling:** Use **React Native Paper** and **Styled Components**. Access theme values correctly via `useTheme` or context.
- **Linting/Formatting:** Code **must** pass `npm run lint` and be formatted via `npm run format`. Use format-on-save in your editor.
- **Components:** Aim for small, focused, reusable functional components (`src/components/`).
- **Custom Hooks:** Encapsulate reusable stateful logic (`src/hooks/`). Name them starting with `use`.
- **Testing:** Write unit/component tests using **Jest** and **RNTL** (`src/**/__tests__/`). Focus on user perspective testing. Add tests for new components and functionality.
- **State Management:** Use **Zustand** (`useAppDataStore`) for _global_ state needed across multiple disconnected screens. Use React Hooks (`useState`, `useReducer`) for local component state.
- **Data Fetching:** Use **TanStack Query (React Query)** (e.g., `useQuery`, `useMutation`) for interacting with APIs (even the simulated one initially). Leverage the existing setup in `useInitializeAppData` and `queryKeys`.
- **Navigation:** Use **React Navigation**. Follow established patterns from `src/navigation/` and use defined types (`src/navigation/types.ts`).
- **Code Documentation:** Write clear **JSDoc** for functions, components, and types. Use inline comments sparingly for non-obvious logic.
- **Accessibility (A11y):** Strive for accessible UI elements (labels, roles, contrast, touch targets).

## Code Reviews (If Applicable)

Code reviews are crucial for learning and quality.

- **Reviewers (Instructor/Peers):**
  - Provide **constructive, specific, and respectful** feedback on PRs within the designated repository.
  - Check for correctness, clarity, performance, adherence to standards, testing, etc.
  - Use GitHub's review tools.
- **Authors:**
  - Be **receptive to feedback**.
  - Respond to comments and discuss respectfully.
  - Make necessary updates to your feature branch based on feedback. Push changes to update the PR.
  - Address **all** comments before marking the PR as ready for merge (or as instructed).

## Asking for Help

- **Try First:** Consult documentation (`README.md`, `USAGE.md`, specific file JSDocs), search online, use debugging tools.
- **Be Specific:** Clearly describe the problem, what you tried, expected vs. actual results. Include code snippets/errors/screenshots.
- **Use Appropriate Channels:** Use course communication channels (e.g., Slack, WebEx) for general help or questions. Use PR comments for feedback on specific code (if applicable). Use GitHub Issues (if enabled in your repository) for specific bugs/tasks.

---

Let's build something great! Happy coding!
