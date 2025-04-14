# Guidelines for Requesting New Module Creation

To ensure new course modules are created efficiently and accurately using the established reusable Marp structures, please provide requests with the following detailed information:

## 1. Module Definition

*   **Topic:** Clearly state the main topic (e.g., "React Native State Management").
*   **Filename:** Specify the desired filename and location (e.g., `/course-content/13-state-management.md`).
*   **Learning Objectives:** List specific, measurable outcomes for learners (e.g., "Compare and contrast Context API and Zustand," "Implement Zustand for global state").
*   **(Optional) Target Audience Emphasis:** Note any specific developer backgrounds (Native, Web, React, Angular) that require special attention or comparison points within this module.

## 2. Detailed Content Outline

*   Provide a hierarchical outline (sections, bullet points) covering **all** information to be included.
*   For each point, supply the core explanation or key message (this forms the basis of slide/presenter note content).

## 3. Source Material Links

*   For each major section/topic in the outline, provide **specific URLs** to the primary source material (e.g., official React Native docs, Expo docs, MDN, specific API documentation).

## 4. Structure Mapping (Crucial)

*   Explicitly map each section/concept in your outline to the **Pattern** (from `patterns-guide.md`) or sequence of **Templates** (from `templates-guide.md`) to be used.
    *   *Example:* "For 'Context API Basics', use the `concept-introduction-pattern`."
    *   *Example:* "Explain `create` function in Zustand using the `small-code-explanation-pattern`."
    *   *Example:* "Compare Zustand and Context API using two `content-slide.md` templates followed by a `table-slide.md`."

## 5. Specific Content Assets

*   **Code Examples:**
    *   For small examples (<= 25 lines): Provide the **exact code snippet** and specify the language identifier (`tsx`, `jsx`, etc.).
    *   For large examples (> 25 lines): Provide the **link to the pre-created, documented CodeSandbox or Expo Snack**.
*   **Diagrams:** Provide the **complete Mermaid syntax**.
*   **Tables:** Provide **header information and all data rows**.
*   **Callouts:** Indicate **precisely where** `info`, `warning`, `tip`, or specific `dev-context` callouts should be inserted and the **core message/comparison** they should convey.
*   **Links:** List any other specific external links required and indicate where they should be placed in the content.

## 6. Presenter Notes Guidance

*   Highlight any **critical points, specific line-by-line code explanations, or detailed interpretations** (for diagrams/tables) that **must** be included in the presenter notes for particular slides, beyond the standard template prompts.

---

Providing this level of detail will enable the most accurate and efficient generation of new course modules that fully leverage the reusable structure system.