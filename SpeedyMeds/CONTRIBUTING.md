# Contributing to Your SpeedyMeds Group Project

Welcome, team! This guide outlines how you'll contribute to the SpeedyMeds application within **your assigned group's dedicated repository fork**. Following these steps ensures everyone can work together effectively and learn standard development practices.

**Remember:** You are working within a copy (a fork) of the main template repository, specifically created for your training group. All your work (branches, commits, Pull Requests) will happen **inside this group repository**.

## Code of Conduct

Please ensure all interactions (comments, PRs, discussions) are respectful, constructive, and collaborative. We aim for a positive learning environment where everyone feels comfortable asking questions and providing feedback.

## Getting Started: Your Group Repository

1.  **Clone Your Group Repository:** Your instructor will provide the URL for your group's specific fork (e.g., `SpeedyMeds-Group-Apr`). Clone this repository to your local machine. **Do not clone the main template repository.**
    ```bash
    # Example: Replace with YOUR group's actual URL
    git clone <your_group_repository_url>
    cd <your_group_repository_directory>
    ```
2.  **Complete Environment Setup:** Before writing code, ensure you've followed the setup steps in `SETUP.md` within your cloned group repository. A correct setup prevents many common issues.
3.  **Understand the Workflow:** Familiarize yourself with the branching and Pull Request process described below. This simulates a common team workflow.
4.  **Check for Tasks:** Your instructor will likely assign tasks or features. Coordinate with your instructor and teammates on who is working on what (e.g., using course communication channels or potentially GitHub Issues *within your group repository* if enabled).

## Branching Strategy (Within Your Group Repository)

We use a simple feature branching workflow within your group's repository.

1.  **Sync `main` Branch:** Before starting new work, ensure your local `main` branch (which contains the group's latest integrated code) is up-to-date with the `main` branch on GitHub *in your group repository*.
    ```bash
    # Switch to your local main branch
    git checkout main

    # Pull the latest changes from your group repository's main branch
    # 'origin' should point to your group fork by default when you clone it
    git pull origin main
    ```
2.  **Create a Feature Branch:** Create a new branch *from* the up-to-date `main` branch for your specific task. Use a descriptive naming convention prefixed with a type (`feature/`, `fix/`, `chore/`, `docs/`, `test/`):
    - Examples:
        - `feature/add-prescription-list`
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
    - **Example:** `feat: add avatar and user info to AccountScreen`
    ```bash
    # Stage your changes
    git add .

    # Commit with a conventional commit message
    git commit -m "feat: add avatar and user info to AccountScreen"
    ```
4.  **Push Your Branch:** Push your local feature branch to **your group's repository** on GitHub.
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
   F --> G{Create PR on GitHub};
   G --> H{Request Review};
   H --> I{Address Feedback};
   I --> J[Merge PR (by Instructor/Lead)];
   J --> K[End Task];
   I --> E; % Loop for feedback
```


## Pull Requests (PRs) - Within Your Group Repository

Once your feature or fix is complete and pushed to your group's GitHub repository:

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
2.  **Create Pull Request on GitHub (Within Your Group Repo):**
    - Navigate to **your group's repository page** on GitHub.
    - You should see a prompt to create a Pull Request from your recently pushed branch. Click it.
    - Ensure the **base branch** is `main` (the target branch in your group repo) and the **compare branch** is your feature branch.
3.  **Use the PR Template:**
    - Fill out the Pull Request template (`.github/PULL_REQUEST_TEMPLATE.md` if present) thoroughly.
    - **Clearly describe:** What changes were made? Why? How can it be tested? Include screenshots/GIFs for UI changes.
4.  **Link Related Issues (If Applicable):** If your group uses GitHub Issues *within the group repository*, link them using keywords like `Closes #123` in the PR description.
5.  **Request Review:** Use GitHub's "Reviewers" feature to request a review from the course instructor(s) and/or designated peers **within your group**.

## Code Standards & Best Practices

(This section remains largely the same as the original, as the standards apply regardless of the repository structure. Ensure you follow these within your group's codebase.)

- **Language:** Use **TypeScript**. Avoid `any`.
- **Styling:** Use **React Native Paper** and **Styled Components**. Access theme values correctly.
- **Linting/Formatting:** Code **must** pass `npm run lint` and be formatted via `npm run format`. Use format-on-save.
- **Components:** Aim for small, focused, reusable functional components.
- **Custom Hooks:** Encapsulate reusable stateful logic. Name them starting with `use`.
- **Testing:** Write unit/component tests using **Jest** and **RNTL**. Focus on user perspective testing. Aim for reasonable coverage.
- **State Management:** Use **Zustand** (`useAppDataStore`) for *global* state. Use React Hooks (`useState`, `useReducer`) for local state.
- **Data Fetching:** Use **TanStack Query (React Query)** via `useInitializeAppData` or `useQuery` as appropriate.
- **Navigation:** Use **React Navigation**. Follow established patterns and use defined types.
- **Code Documentation:** Write clear **JSDoc** and inline comments.
- **Accessibility (A11y):** Strive for accessible UI elements (labels, roles, contrast, touch targets). Test with screen readers.

## Code Reviews (Within Your Group)

Code reviews are crucial for learning and quality within your group.

- **Reviewers (Instructor/Peers):**
    - Provide **constructive, specific, and respectful** feedback on PRs within the group repository.
    - Check for correctness, clarity, performance, adherence to standards, testing, etc.
    - Use GitHub's review tools.
- **Authors:**
    - Be **receptive to feedback**.
    - Respond to comments and discuss respectfully.
    - Make necessary updates to your feature branch based on feedback. Push changes to update the PR.
    - Address **all** comments before marking the PR as ready for merge.

## Asking for Help

- **Try First:** Consult documentation, search online, use debugging tools.
- **Be Specific:** Clearly describe the problem, what you tried, expected vs. actual results. Include code/errors/screenshots.
- **Use Appropriate Channels:** Use course communication channels (Slack, WebEx) for general help. Use PR comments for feedback on specific code within your group repo. Use GitHub Issues (if enabled in your group repo) for specific bugs/tasks.

---

Let's build something great together in your group! Happy coding!
