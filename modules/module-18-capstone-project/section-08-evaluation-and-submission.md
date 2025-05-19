## Section 08: Evaluation and Submission

This section provides general guidelines on how your SpeedyMeds capstone project will be evaluated and what to consider for submission. Your instructor or the specific course platform will provide the definitive and detailed submission instructions and grading rubrics.

### Evaluation Criteria

While specific rubrics may vary, the evaluation of your capstone project will generally focus on the following key areas, reflecting the skills and knowledge covered throughout the course:

1.  **Functionality & Completeness:**

    - Successful implementation of the core features and screens outlined in **Section 07: Core Requirements and Milestones** (derived from `ROADMAP.md`).
    - Correct behavior of implemented features (e.g., navigation works, data displays accurately, forms submit as expected).
    - Handling of loading and error states for asynchronous operations.

2.  **User Interface (UI) and User Experience (UX):**

    - Adherence to the provided UI mockups in `README.md` in terms of layout and general appearance.
    - Consistent application of styling using React Native Paper and Styled Components.
    - Effective use of the theming system, ensuring the app works well in both light and dark modes.
    - Overall usability and intuitiveness of the application.

3.  **Code Quality and Architecture:**

    - Readability, organization, and maintainability of the TypeScript code.
    - Adherence to React and React Native best practices.
    - Proper use of components, props, and state.
    - Effective creation and use of reusable components in `src/components/`.
    - Clear and logical project structure within the `src/` directory.
    - Consistent code formatting (Prettier) and adherence to linting rules (ESLint).

4.  **State Management:**

    - Correct implementation and use of Zustand for global client-side state (`appDataStore`).
    - Appropriate use of TanStack Query (`useQuery`, `useMutation`) for managing server-side state and interacting with the mock API.
    - Proper handling of data fetching, caching, and synchronization.

5.  **Navigation:**

    - Correct implementation of the main tab navigation and any nested stack navigators.
    - Accurate passing of parameters between screens (e.g., `orderId`).
    - Type-safe navigation using the defined navigation types (`src/navigation/types.ts`).

6.  **Testing:**

    - Adequacy and quality of unit and component tests for new features and components.
    - Effective use of Jest and React Native Testing Library, including the `renderWithProviders` utility.

7.  **Accessibility (A11y):**

    - Implementation of accessibility best practices, such as providing `accessibilityLabel` and `accessibilityRole` for interactive elements.

8.  **Code-Level Documentation (JSDoc):**

    - Clarity, accuracy, and completeness of JSDoc comments for functions, components, hooks, and complex types.

9.  **Version Control (If applicable, especially for group work):**
    - Adherence to Git best practices and the guidelines in `CONTRIBUTING.md` (e.g., meaningful commit messages, proper branching).

### General Submission Guidelines

Always refer to the specific submission instructions provided by your instructor or the course platform. However, here are some general points to consider:

1.  **Repository:** You will typically submit a link to your Git repository (e.g., GitHub, GitLab) containing your completed SpeedyMeds project.

    - Ensure all your latest code is pushed to the repository.
    - If it's a private repository, ensure you've granted access to your instructor/evaluators.

2.  **Runnable Project:** The submitted project must be runnable by the evaluators following the instructions in your project's `README.md` and the original `SETUP.md`.

    - Ensure all dependencies are correctly listed in `package.json`.
    - Double-check that there are no local-only configurations that would prevent it from running on another machine.

3.  **Project `README.md` (Your Fork/Copy):**

    - It is good practice to update the `README.md` in your version of the project.
    - You might include:
      - A brief summary of the features you implemented.
      - Notes on any bonus features you tackled or specific challenges you overcame.
      - Any known issues or parts you didn't get to (if applicable).
      - Instructions for running any specific part of the application if it deviates from the standard setup.

4.  **Cleanliness:**
    - Remove any temporary debugging code (e.g., excessive `console.log` statements) that is not relevant for submission.
    - Ensure your code is linted and formatted.

> [!IMPORTANT]
> The guidelines above are general. Your instructor or course platform will provide the precise details regarding what to submit, how to submit it, deadlines, and the specific grading rubric that will be used. Always prioritize those official instructions.

> 🛣️ **(All Learners):**
>
> **(Self-Led/Asynchronous Path):** While you might not have a formal submission deadline to an instructor, use these evaluation criteria as a self-assessment checklist. Consider sharing your project with peers for feedback if you're part of a study group.
>
> **(Instructor-Led Path):** Pay close attention to any interim milestones or submission requirements your instructor sets. Feedback provided during the project development is invaluable for your final submission.

Preparing a clean, well-documented, and fully functional project according to the requirements will be key to a successful capstone evaluation.

### Next Steps

Understanding the evaluation criteria and submission guidelines sets you up for a successful project completion. To further aid you, the next section offers some valuable tips and best practices. Proceed to [Section 09: Tips for Success](./section-09-tips-for-success.md).
