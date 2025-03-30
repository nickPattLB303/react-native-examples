# Contributing to SpeedyMeds

Welcome, contributors! We're excited to have you participate in building the SpeedyMeds application as part of the React Native training course. Following these guidelines helps ensure a smooth and effective learning and development process for everyone.

## Code of Conduct

This project adheres to the [Your Company Name] Code of Conduct. Please ensure all interactions are respectful and constructive.

## Getting Started

1.  **Ensure Setup is Complete:** Before contributing, make sure you have followed all the setup steps outlined in the main [README.md](./README.md).
2.  **Understand the Workflow:** Familiarize yourself with the GitHub Flow process described below.
3.  **Check Issues:** Look at the project's issue tracker ([Link to GitHub Issues if used, otherwise specify process]) for tasks or bugs to work on. If you plan to work on something not listed, consider creating an issue first to discuss it.

## Branching Strategy (GitHub Flow)

We use a simple GitHub Flow approach:

1.  **Sync `main`:** Before starting work, ensure your local `main` branch is up-to-date with the remote repository:
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Create a Feature Branch:** Create a new branch off `main` for your specific task (feature, bug fix, chore). Use a descriptive naming convention:
    *   `feature/short-description` (e.g., `feature/dashboard-layout`)
    *   `fix/short-description` (e.g., `fix/login-button-alignment`)
    *   `chore/short-description` (e.g., `chore/update-dependencies`)
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Commit Changes:** Make your code changes. Commit frequently with clear, concise messages. We recommend a simple format:
    *   Start with a type (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`).
    *   Follow with a short description in the present tense.
    *   Example: `feat: add user profile avatar to account screen`
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

1.  **Create a Pull Request:** Go to the GitHub repository and create a new Pull Request from your feature branch targeting the `main` branch.
2.  **Use the Template:** Fill out the PR template (`PULL_REQUEST_TEMPLATE.md` - to be created) providing details about the changes, motivation, and any testing steps.
3.  **Link Issues:** If your PR addresses a specific issue, link it in the PR description (e.g., "Closes #123").
4.  **Request Review:** Request a review from the course instructor(s) and/or designated peers.

## Code Standards

*   **Language:** Use TypeScript. Follow best practices taught in the course.
*   **Styling:** Adhere to the "Calm & Clear" visual style. Use `StyleSheet` for Phase 2 and `react-native-paper`/`styled-components` for Phase 3 as directed.
*   **Linting/Formatting:** Follow the rules defined by ESLint and Prettier (once configured). Ensure your code passes linting checks before creating a PR.
*   **Components:** Create reusable components where appropriate.

## Code Reviews

*   **Reviewers:** Provide constructive, respectful feedback focused on correctness, clarity, adherence to standards, and learning opportunities.
*   **Authors:** Be receptive to feedback. Discuss suggestions respectfully and make necessary updates to your branch. Push the changes to update the PR.

## Communication

*   Use the designated **[Your WebEx Channel Name]** WebEx channel for general questions, discussions, and coordination.
*   Use GitHub PR comments for specific feedback related to code changes.
*   Use GitHub Issues for tracking specific tasks, bugs, and feature requests.

Thank you for contributing to a positive and productive learning environment!