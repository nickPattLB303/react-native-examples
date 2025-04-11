# Snippets Guide

This guide provides details on the available Markdown/Marp snippets located in the `/_marp-structures/snippets/` directory. Snippets are small, reusable blocks of code designed to ensure consistency for common elements across the course content.

## How to Use Snippets

1.  Identify the element you need (e.g., a warning callout, presenter notes).
2.  Find the corresponding snippet file in `/_marp-structures/snippets/`.
3.  Copy the *entire content* of the snippet file.
4.  Paste the content into your course Markdown file where needed.
5.  Replace the placeholder text (e.g., `[Insert text here]`) with your actual content, following any specific guidelines mentioned for that snippet.

---

## Available Snippets

### 1. Presenter Notes (`presenter-notes.md`)

**Purpose:** Provides the standard structure for slide presenter notes.
**Code:**
```html
<!-- 
Presenter Notes:

- Explain the concepts presented on the slide in detail.
- Use general-purpose language suitable for all learners (NOT presenter-specific instructions).
- Ensure notes are comprehensive, especially for code examples (>5 lines require ~200 words explaining the code line-by-line and summarizing logic).
- Do not introduce new concepts here that aren't covered elsewhere in the main slide content.
- This content is visible to all learners.

[Insert detailed, general-purpose explanation here]

-->
```
**Guidelines:**
*   MUST be included on all content slides (non-title, non-divider).
*   Language must be general-purpose, not presenter-specific.
*   Follow length and detail requirements outlined in the main course guidelines, especially for code examples.

### 2. Info Callout (`info-callout.md`)

**Purpose:** Highlights general information or provides additional context.
**Code:**
```markdown
> **ℹ️ Info:** [Insert informational text here. Ensure explanations are detailed or link to comprehensive resources.]
```
**Guidelines:**
*   Use for helpful context, elaborations, or non-critical details.
*   Ensure explanations are sufficiently detailed or provide links to official documentation/resources.

### 3. Warning Callout (`warning-callout.md`)

**Purpose:** Calls attention to potential pitfalls, common errors, or important cautions.
**Code:**
```markdown
> **⚠️ Warning:** [Insert critical warning or caution here. Explain potential pitfalls or issues clearly.]
```
**Guidelines:**
*   Use for critical information that learners must be aware of to avoid problems.

### 4. Tip Callout (`tip-callout.md`)

**Purpose:** Offers helpful suggestions, best practices, or shortcuts.
**Code:**
```markdown
> **💡 Tip:** [Insert helpful tip, best practice, or shortcut here.]
```
**Guidelines:**
*   Use for advice that can improve understanding, efficiency, or code quality.

### 5. Native Dev Context Callout (`native-dev-context-callout.md`)

**Purpose:** Provides specific context for learners with native Android/iOS development backgrounds.
**Code:**
```markdown
> **📱 Native Dev Context (Android/iOS):** [Insert explanation comparing/contrasting the current topic with native Android/iOS development concepts. Be specific and detailed.]
```
**Guidelines:**
*   Use when a concept has a direct parallel or important difference compared to native development. Be specific (e.g., compare `useState` to `LiveData`/`StateFlow` or `@State`).

### 6. Web Dev Context Callout (`web-dev-context-callout.md`)

**Purpose:** Provides specific context for learners with general web development backgrounds (HTML, CSS, JS).
**Code:**
```markdown
> **🌐 Web Dev Context:** [Insert explanation comparing/contrasting the current topic with general web development concepts (HTML, CSS, JS). Be specific and detailed.]
```
**Guidelines:**
*   Use when a concept relates to standard web technologies (e.g., comparing React Native styling to CSS).

### 7. React Dev Context Callout (`react-dev-context-callout.md`)

**Purpose:** Provides specific context for learners with React (web) development backgrounds.
**Code:**
```markdown
> **⚛️ React Dev Context:** [Insert explanation comparing/contrasting the current topic with React (web) concepts. Highlight similarities and differences, especially regarding the environment (DOM vs. Native). Be specific and detailed.]
```
**Guidelines:**
*   Use to bridge the gap between React for web and React Native (e.g., explaining differences in available components, styling, or platform APIs).

### 8. Angular Dev Context Callout (`angular-dev-context-callout.md`)

**Purpose:** Provides specific context for learners with Angular development backgrounds.
**Code:**
```markdown
> **🅰️ Angular Dev Context:** [Insert explanation comparing/contrasting the current topic with Angular concepts. Highlight differences in architecture, state management, component lifecycle, etc. Be specific and detailed.]
```
**Guidelines:**
*   Use when a concept differs significantly from the Angular way (e.g., comparing JSX to Angular templates, navigation approaches).

### 9. Code Block (`code-block.md`)

**Purpose:** Provides a standard structure for inserting code examples (up to 25 lines for standard code slides).
**Code:**
```markdown
```[language]
// Insert code here (max 25 lines for this template type)
// Remember to use the correct language identifier (e.g., jsx, tsx, javascript, typescript, css, html, shell)
```
```
**Guidelines:**
*   Always specify the correct language identifier (e.g., `jsx`, `tsx`, `javascript`).
*   Adhere to the line limits specified by the template/pattern being used.
*   Ensure accompanying presenter notes meet the required detail level.

### 10. Mermaid Diagram (`mermaid-diagram.md`)

**Purpose:** Provides a standard structure for inserting Mermaid diagrams.
**Code:**
```markdown
```mermaid
// Insert Mermaid diagram definition here
// Example:
// graph TD
//    A[Start] --> B(Process);
//    B --> C{Decision};
//    C -->|Yes| D[End];
//    C -->|No| B;

[Insert Diagram Definition]
```
```
**Guidelines:**
*   Use for all diagrams in the course.
*   Ensure the diagram is clear and accurately represents the concept.
*   Ensure accompanying presenter notes explain the diagram.

### 11. Table Structure (`table-structure.md`)

**Purpose:** Provides a basic Markdown table structure.
**Code:**
```markdown
| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Align-L  | Center   | Align-R  |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

<!-- Replace with actual table content. Adjust alignment (:, ::, :), columns, and rows as needed. -->
```
**Guidelines:**
*   Replace placeholder content with actual data.
*   Adjust column count, alignment, and rows as necessary.
*   Ensure accompanying presenter notes explain the table content.

---

## General Snippet Guidelines

*   **Heading Levels:** Use Markdown headings (`#`, `##`, `###`, etc.) logically and hierarchically. Do not skip levels (e.g., going from `#` to `###`). Marp uses headings to structure slides, so consistency is key. Typically:
    *   `#`: Slide Title (often handled by the template)
    *   `##`: Major Section on a Slide
    *   `###`: Sub-section or Title for elements like code blocks/diagrams
    *   `####+`: Use sparingly for finer granularity within text blocks if necessary.
*   **Links:** Use standard Markdown links `[Visible Text](URL)`. Ensure links point to official documentation or highly reputable sources. Be specific (link to the exact page/section, not just the homepage).

---

## Decision Tree (Simplified)

*   Need presenter notes? -> Use `presenter-notes.md`
*   Need to highlight info/warning/tip? -> Use `info-callout.md`, `warning-callout.md`, or `tip-callout.md`
*   Need context for specific dev background? -> Use `native-dev-context-callout.md`, `web-dev-context-callout.md`, `react-dev-context-callout.md`, or `angular-dev-context-callout.md`
*   Need to show code (<=25 lines)? -> Use `code-block.md` (within appropriate template)
*   Need a diagram? -> Use `mermaid-diagram.md` (within appropriate template)
*   Need a table? -> Use `table-structure.md` (within appropriate template)