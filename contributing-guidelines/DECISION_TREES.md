# Content Creation Decision Trees & Workflows

This document provides decision-making guidance for creating course content, ensuring consistency and appropriate use of defined structures (Snippets, Templates, Patterns) and tools (CodeSandbox, Expo Snack, Forms, Whiteboard, GitHub).

## 1. Choosing Content Structure

*   **Goal:** Create a single slide or piece of content.
    *   **Is it a standard slide type (Title, Content, Code, Diagram, Table, Section Divider)?**
        *   **Yes:** Start with the corresponding **Template** from the `/templates` directory.
        *   **No:** Start with a basic slide structure (H2 title, presenter notes) and build using standard Markdown and **Snippets**.
    *   **Need to insert a common element (Callout, Code Block, Mermaid Diagram, Table, Link, Presenter Note)?**
        *   **Yes:** Use the corresponding VS Code **Snippet** from `.vscode/course.code-snippets`.
        *   **No:** Use standard Markdown.
*   **Goal:** Teach a specific concept, workflow, or API.
    *   **Does a defined Content Pattern exist for this type of topic (e.g., Concept Introduction, API Deep Dive, Workflow/Process)?**
        *   **Yes:** Follow the sequence of **Templates** outlined in the documented **Pattern**. Populate the templates using **Snippets** and custom content.
        *   **No:** Construct a logical sequence of slides using appropriate **Templates** and **Snippets**. Consider proposing a new **Pattern** if this sequence is likely reusable.

## 2. Choosing Code Example Format

*   **Is the code example React Native specific?**
    *   **Yes (React Native):**
        *   **Is the code > 25 lines OR requires interactive demonstration?**
            *   **Yes:** Use **Expo Snack**. Embed the Snack URL using an `<iframe>` (use Snippet). Create `starter/` and `completed/` versions locally if part of an exercise/challenge, then manually create/update Snacks and embed both URLs.
            *   **No:** Use an **Inline Code Block** (```tsx ... ```) within a `code-slide-inline.md` template (use Snippet). Ensure it's <= 25 lines.
    *   **No (Web: HTML/CSS/JS/React):**
        *   **Is the code > 25 lines OR requires interactive demonstration/live preview?**
            *   **Yes:** Use **CodeSandbox**. Embed the Sandbox URL using an `<iframe>` (use Snippet). For exercises/challenges, create `starter/` and `completed/` locally, publish both using the CodeSandbox CLI (`npx codesandbox ./`), and embed both URLs.
            *   **No:** Use an **Inline Code Block** (```jsx ... ```, ```javascript ... ```, etc.) within a `code-slide-inline.md` template (use Snippet). Ensure it's <= 25 lines.

*Remember: All code examples > 5 lines require 200+ words of presenter notes. Slides with code/embeds should have minimal other text.*

## 3. Choosing Visualization Format

*   **Goal:** Visualize a relationship, flow, process, hierarchy, or state change.
    *   **Yes:** Use a **Mermaid Diagram** within a `diagram-slide.md` template (use Snippet).
*   **Goal:** Compare features, list properties/options, or present structured data concisely.
    *   **Yes:** Use a Markdown **Table** within a `table-slide.md` template (use Snippet).
*   **Goal:** Explain a concept linearly, provide definitions, or list steps/pros/cons.
    *   **Yes:** Use standard Markdown text and lists within a `content-slide.md` template.
*   **Goal:** Show a specific UI state or element that cannot be easily described or diagrammed.
    *   **Yes (Use Sparingly):** Use a static **Image** (`![Alt text](...)`). Store in `/assets/images`.

*Remember: Slides with diagrams/tables should have minimal other text. Explanations go in presenter notes or adjacent slides.*

## 4. Choosing Callout Type

*   **Goal:** Provide guidance specific to Instructor-Led, Self-Led, or Async learners.
    *   **Use:** `> **[Instructor-Led/Self-Led/Async]:** ...`
*   **Goal:** Compare/contrast a concept with Native Android, iOS, React Web, or Angular Web.
    *   **Use:** `> **[Native Android/iOS/React Web/Angular Web Developers]:** ...` (Ensure detailed explanation or link).
*   **Goal:** Highlight critical information that must not be missed.
    *   **Use:** `> **Important:** ...`
*   **Goal:** Offer helpful advice, shortcuts, or best practices.
    *   **Use:** `> **Tip:** ...`
*   **Goal:** Warn about potential pitfalls, common errors, or deprecated features.
    *   **Use:** `> **Warning:** ...`

## 5. Choosing Exercise/Challenge Tool

*   **Goal:** Check knowledge retention (multiple choice, short answer).
    *   **Tool:** **Microsoft Forms**.
*   **Goal:** Facilitate collaborative brainstorming or diagramming (esp. Instructor-Led).
    *   **Tool:** **Microsoft Whiteboard**.
*   **Goal:** Practice a small, specific code snippet (Web - HTML/CSS/JS/React).
    *   **Tool:** **Inline Code Block** (if no interaction needed) OR **CodeSandbox** (if interaction/preview needed).
*   **Goal:** Practice a small, specific code snippet (React Native).
    *   **Tool:** **Inline Code Block** (if no interaction needed) OR **Expo Snack** (if interaction/preview needed).
*   **Goal:** Build/debug a larger web feature within a small project context.
    *   **Tool:** **CodeSandbox**. (Use `starter/` & `completed/` structure, publish via CLI).
*   **Goal:** Build/debug a larger React Native feature (no complex native modules).
    *   **Tool:** **Expo Snack**. (Use `starter/` & `completed/` structure, create Snacks manually).
*   **Goal:** Work on a more complex task involving multiple files, specific native modules (not in Snack), or within a larger project structure.
    *   **Tool:** **GitHub Repository** (branch/fork of a dedicated exercise repo or simplified capstone). Provide clear clone/checkout instructions for `starter` and `completed` branches/tags.

*Remember: All exercises/challenges require a `README.md` with clear instructions. Code-based ones need `starter/` and `completed/` versions, with comprehensive JSDoc/comments in the completed code.*
