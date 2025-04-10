# Course Content Terminology

This document defines the core terminology used for creating and organizing content within the React Native training course repository. Consistent use of these terms is crucial for maintainability and collaboration.

## Content Building Blocks

*   **Snippet:**
    *   **Definition:** A small, reusable block of Markdown representing a specific, atomic element (e.g., a callout box structure, a Mermaid diagram placeholder, a code block structure with presenter notes).
    *   **Purpose:** Snippets are the smallest, most fundamental building blocks, designed for quick insertion and consistency of micro-elements within slides.
    *   **Implementation:** Primarily implemented as VS Code Snippets stored in `.vscode/course.code-snippets`.

*   **Template:**
    *   **Definition:** A complete Markdown file (`.md`) defining the structure and standard elements of a single, specific *type* of slide (e.g., Title Slide, Content Slide with Bullets, Code Example Slide, Diagram Slide).
    *   **Purpose:** Templates provide the macro-structure for individual slides, ensuring consistency in layout and required elements (like titles and presenter notes) for common slide types.
    *   **Implementation:** Stored as `.md` files in the `/templates` directory. They are composed of standard Markdown and placeholders where Snippets are intended to be used.

*   **Pattern:**
    *   **Definition:** A recommended sequence or combination of different **Templates** used to effectively teach a specific concept, workflow, or topic.
    *   **Purpose:** Patterns guide the pedagogical flow of information, ensuring concepts are introduced, explained, visualized, and reinforced consistently (e.g., Concept Intro -> Diagram -> Code Example -> Key Takeaways).
    *   **Implementation:** Documented as best practices and recommended sequences within `DECISION_TREES.md`. Not typically a single file, but a documented approach.

## Content Organization

*   **Module:**
    *   **Definition:** A collection of related Patterns and individual slides covering a major topic area from the course outline (e.g., "React Native Fundamentals", "JavaScript Essentials", "State Management").
    *   **Purpose:** Organizes the course into logical learning units.
    *   **Implementation:** Represented as a numbered directory within `/content` (e.g., `/content/01-rn-fundamentals/`). Contains one or more `.md` files, typically starting with `module.md` or broken into logical sub-topic files.

## Specific Content Elements

*   **Callout:**
    *   **Definition:** A distinctively formatted block of text (using Markdown blockquotes `>`) used to provide targeted guidance, context, or emphasis.
    *   **Purpose:** To draw attention to information specific to certain learners or situations.
    *   **Types:**
        *   `Learning Path`: Guidance for Instructor-Led, Self-Led, or Async learners. (`> **Instructor-Led:** ...`)
        *   `Experience Tie-in`: Comparisons/analogies for developers from specific backgrounds (Native Android/iOS, React Web, Angular Web). (`> **Native iOS Developers:** ...`)
        *   `Important Note`: Critical information that shouldn't be missed. (`> **Important:** ...`)
        *   `Tip`: Helpful advice or best practices. (`> **Tip:** ...`)
        *   `Warning`: Potential pitfalls or things to avoid. (`> **Warning:** ...`)
    *   **Implementation:** Created using VS Code Snippets or manually following the blockquote format with bolded type.

*   **Presenter Notes:**
    *   **Definition:** Additional context, detailed explanations, or elaborations hidden within HTML comments (`<!-- Presenter Notes: ... -->`) in the Markdown source.
    *   **Purpose:** Provide deeper understanding for instructors presenting the material or for learners viewing the raw Markdown as documentation. They supplement the visible slide content.
    *   **Constraints:** Must be worded generically (not addressing a presenter directly), contain only elaborations on the slide's topic (no new, unrelated concepts), and meet length requirements (e.g., 200+ words for code examples > 5 lines).
    *   **Implementation:** Added within `<!-- Presenter Notes: -->` tags on relevant slides.
