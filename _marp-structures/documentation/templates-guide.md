# Templates Guide

This guide provides details on the available Marp slide templates located in the `/_marp-structures/templates/` directory. Templates provide pre-defined structures for common slide types, ensuring consistency in layout and content requirements.

## How to Use Templates

1.  Determine the type of slide you need to create (e.g., a title slide, a slide with a small code example).
2.  Consult the decision tree below or browse the available templates to find the most appropriate one.
3.  Copy the *entire content* of the chosen template file (e.g., `title-slide.md`) into your course module's Markdown file.
4.  If creating multiple slides, separate each template instance with `---`.
5.  Replace the placeholder text (e.g., `[Insert Title Here]`) with your actual content.
6.  Incorporate necessary snippets (like callouts) by copying them from the `/_marp-structures/snippets/` directory and pasting them into the appropriate location within the template. Refer to the `snippets-guide.md` for details.
7.  Strictly adhere to the content constraints and guidelines specified for each template, especially regarding presenter notes and accompanying text for code/diagrams/tables.

---

## Available Templates

### 1. Title Slide (`title-slide.md`)

**Purpose:** Used for the main title slide of a course module or major lesson.
**Structure Example:**
```markdown
<!-- _class: lead -->

# [Insert Module/Lesson Title Here]

## [Optional: Insert Subtitle or Module Number Here]

<!-- Presenter Notes -->
```
**Guidelines:**
*   Use as the very first slide of a module file.
*   Fill in the title and optional subtitle.
*   Include brief introductory presenter notes.

### 2. Section Divider Slide (`section-divider-slide.md`)

**Purpose:** Used to visually separate major sections within a module. Uses an inverted theme for contrast.
**Structure Example:**
```markdown
<!-- _class: invert -->
<style scoped> /* CSS for centering */ </style>

## [Insert Section Title Here]

<!-- Presenter Notes -->
```
**Guidelines:**
*   Use between distinct topics or sections.
*   Fill in the section title.
*   Include brief transitional presenter notes.

### 3. Content Slide (`content-slide.md`)

**Purpose:** The standard template for presenting textual information, bullet points, simple images, and incorporating callout snippets.
**Structure Example:**
```markdown
---
marp: true
---

# [Insert Slide Title Here]

*   [Insert content point 1]
*   [Insert content point 2]

<!-- Add more content/snippets -->

<!-- Presenter Notes -->
```
**Guidelines:**
*   The workhorse template for most informational slides.
*   MUST include comprehensive presenter notes using the standard structure.
*   Can include text, lists, images (`![alt](path)`), and callout snippets.
*   Follow logical heading structures (`#`, `##`, `###`).

### 4. Code Example Slide (`code-example-slide.md`)

**Purpose:** Specifically for displaying code examples **up to 25 lines**.
**Structure Example:**
```markdown
---
marp: true
---

### [Insert Code Example Title Here]

[Insert single sentence description...]

```[language]
// Code <= 25 lines
```

<!-- Presenter Notes -->
```
**Constraints & Guidelines:**
*   **Strictly for code examples <= 25 lines.** For longer examples, use `embedded-example-slide.md`.
*   **Accompanying text MUST be limited to:**
    *   A `###` level title.
    *   A single descriptive sentence immediately following the title.
*   **Presenter notes are MANDATORY** and must be detailed:
    *   If code > 5 lines, notes must be ~200 words minimum, explaining each line/block and summarizing logic/functionality.
    *   Use the standard presenter notes structure.
*   Use the correct language identifier in the code block (e.g., `tsx`, `jsx`).

### 5. Diagram Slide (`diagram-slide.md`)

**Purpose:** Specifically for displaying Mermaid diagrams.
**Structure Example:**
```markdown
---
marp: true
---

### [Insert Diagram Title Here]

[Insert single sentence description...]

```mermaid
// Diagram definition
[Insert Diagram Definition]
```

<!-- Presenter Notes -->
```
**Constraints & Guidelines:**
*   **Accompanying text MUST be limited to:**
    *   A `###` level title.
    *   A single descriptive sentence immediately following the title.
*   **Presenter notes are MANDATORY** and must clearly explain the diagram, its components, and the concept it illustrates.
*   Use the standard presenter notes structure.
*   All diagrams MUST use Mermaid syntax within the ` ```mermaid ` block.

### 6. Table Slide (`table-slide.md`)

**Purpose:** Specifically for displaying data in tables.
**Structure Example:**
```markdown
---
marp: true
---

### [Insert Table Title Here]

[Insert single sentence description...]

| Header 1 | Header 2 |
| :------- | :------- |
| Cell 1   | Cell 2   |
<!-- Replace with actual table -->

<!-- Presenter Notes -->
```
**Constraints & Guidelines:**
*   **Accompanying text MUST be limited to:**
    *   A `###` level title.
    *   A single descriptive sentence immediately following the title.
*   **Presenter notes are MANDATORY** and must explain the table's structure, data, and key takeaways.
*   Use the standard presenter notes structure.
*   Use standard Markdown table syntax.

### 7. Embedded Example Slide (`embedded-example-slide.md`)

**Purpose:** Specifically for large code examples **(> 25 lines)** requiring embedding from CodeSandbox or Expo Snack.
**Structure Example:**
```markdown
---
marp: true
---

### [Insert Embedded Example Title Here]

[Insert single sentence description...]

**➡️ Embedded Example:**
<!-- Instructions for Author -->
[**<<< PASTE EMBED CODE (e.g., iframe) HERE >>>**]

<!-- Presenter Notes -->
```
**Constraints & Guidelines:**
*   **Strictly for code examples > 25 lines.** For smaller examples, use `code-example-slide.md`.
*   **Accompanying text MUST be limited to:**
    *   A `###` level title.
    *   A single descriptive sentence immediately following the title.
*   **Presenter notes are MANDATORY** and must be detailed (~200 words minimum), explaining the embedded example's code structure, logic, and functionality. Reference specific files/sections within the embed if helpful.
*   The embedded CodeSandbox/Expo Snack itself MUST contain comprehensive code comments and JSDoc documentation.
*   Follow the instructions within the template comments to replace the placeholder with the actual embed code (usually an `<iframe>`).

---

## General Template Guidelines

*   **Notes:** Unless it's a title or divider slide, presenter notes following the standard structure are **mandatory**.
*   **Line/Word Counts:** While Marp doesn't enforce strict limits, be mindful of keeping slide content readable. Avoid overly dense slides. Presenter notes have specific length guidance for code/embeds.
*   **Consistency:** Use these templates consistently to maintain a professional and predictable course structure.
*   **Simplicity:** Adhere to the minimal Marp features used in these templates. Avoid adding complex custom styling or directives unless absolutely necessary and documented.

---

## Decision Tree (Simplified)

*   Need a module title slide? -> Use `title-slide.md`
*   Need to separate major sections? -> Use `section-divider-slide.md`
*   Need to show code?
    *   Code <= 25 lines? -> Use `code-example-slide.md`
    *   Code > 25 lines? -> Use `embedded-example-slide.md`
*   Need to show a diagram? -> Use `diagram-slide.md`
*   Need to show a table? -> Use `table-slide.md`
*   Need a standard content slide (text, bullets, images, callouts)? -> Use `content-slide.md`