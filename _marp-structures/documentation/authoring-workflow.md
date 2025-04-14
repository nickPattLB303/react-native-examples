# Authoring Workflow

This document outlines the standard workflow for creating course content using the reusable Marp structures (snippets, templates, patterns) provided in the `/_marp-structures` directory. Following this workflow ensures consistency, quality, and adherence to the course requirements.

## Step-by-Step Workflow

1.  **Prepare Module File:**
    *   Navigate to the `/course-content` directory.
    *   Create a new Markdown file for your module (e.g., `module-name.md`) or open an existing one.
    *   **Crucially:** Add the Marp front matter exactly as shown below (with `---` on separate lines) as the very first lines of the file. This block should only appear **once** per file.
        ```yaml
        ---
        marp: true
        ---
        ```

2.  **Plan Your Content:**
    *   Define the learning objectives for the lesson or section.
    *   Outline the key concepts, examples, and activities needed.
    *   Consider the target audience's background (Native, Web, React, Angular) and incorporate relevant context.

2.  **Select Structure (Pattern or Templates):**
    *   **Consult `patterns-guide.md`:** Determine if an existing pattern (e.g., `concept-introduction-pattern`, `small-code-explanation-pattern`) matches your teaching goal for a sequence of slides.
    *   **If a pattern fits:** Use the sequence of templates defined in the pattern description.
    *   **If no pattern fits (or for single slides):** Consult `templates-guide.md` to select the appropriate individual template(s) for your content (e.g., `content-slide.md`, `diagram-slide.md`).

3.  **Create/Add to Module File:**
    *   Navigate to the relevant module file within the `/course-content` directory (or create a new one).
    *   Copy the full content of the selected template(s) or the sequence of templates from the chosen pattern into your module file. Remember to use `---` to separate individual slides (templates).

4.  **Populate Content:**
    *   Replace all placeholder text (e.g., `[Insert Title Here]`, `[Insert content point 1]`) within each template with your actual course content.
    *   Write clear, concise, and accurate explanations.
    *   Adhere strictly to the content constraints of each template (e.g., only title and single sentence description on `code-example-slide.md`, `diagram-slide.md`, `table-slide.md`).

5.  **Incorporate Snippets:**
    *   Consult `snippets-guide.md` to identify necessary snippets (e.g., callouts for different developer backgrounds, presenter notes structure if not already included in the template).
    *   Copy the required snippet content from the corresponding file in `/_marp-structures/snippets/`.
    *   Paste the snippet content into the appropriate location within your slide template.
    *   Fill in the snippet's placeholder text.

6.  **Write Notes:**
    *   **This is mandatory for almost all slides (except title/divider).**
    *   Use the standard notes snippet structure (`<!-- ... -->`).
    *   Write detailed, general-purpose explanations suitable for all learners.
    *   **Crucially:** For `code-example-slide.md` (if code > 5 lines), `embedded-example-slide.md`, `diagram-slide.md`, and `table-slide.md`, ensure notes meet the specific detail and length requirements outlined in the template/pattern guides (e.g., ~200 words for code/embeds, detailed explanation of diagrams/tables).

7.  **Handle Special Content:**
    *   **Code Examples:**
        *   Use `code-example-slide.md` for examples <= 25 lines. Ensure the correct language identifier is used.
        *   Use `embedded-example-slide.md` for examples > 25 lines. Follow the embedding instructions in `patterns-guide.md` precisely (create Sandbox/Snack, add comments/JSDoc, get embed code, paste into template).
    *   **Diagrams:** Use `diagram-slide.md` and write the diagram definition using Mermaid syntax within the ` ```mermaid ` block.
    *   **Tables:** Use `table-slide.md` and standard Markdown table syntax.

8.  **Add Links:**
    *   Include links to official documentation (React Native, React, Expo, JavaScript, TypeScript) or other authoritative sources whenever a concept is mentioned but not exhaustively covered.
    *   Use specific links (pointing to the exact page/section).
    *   Format links using standard Markdown: `[Visible Text](URL)`.

9.  **Review and Verify:**
    *   **Self-Review:** Before submitting or finalizing, review your content against the checklists provided in `templates-guide.md` and `patterns-guide.md`. Check for:
        *   Correct template/pattern usage.
        *   Adherence to content constraints (e.g., text limits on code/diagram/table slides).
        *   Presence and quality of notes (meeting length/detail requirements).
        *   Correct use of snippets (callouts, etc.).
        *   Logical heading structure.
        *   Accuracy and clarity of information.
        *   Inclusion of necessary links.
        *   Consistent terminology.
    *   **Preview:** Use the Marp VS Code extension preview to check the visual appearance and flow of your slides.

10. **Peer/Instructor Review (If Applicable):**
    *   Submit content for review, focusing on adherence to these structural guidelines and overall content quality.

## Key Principles

*   **Modularity:** Think in terms of reusable snippets and templates.
*   **Consistency:** Adhere strictly to the defined structures and guidelines.
*   **Completeness:** Ensure notes and linked resources provide comprehensive explanations.
*   **Simplicity:** Stick to the provided structures and standard Markdown/Marp features. Avoid unnecessary complexity.