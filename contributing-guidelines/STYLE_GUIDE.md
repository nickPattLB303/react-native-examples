# Course Content Style Guide

This guide outlines the styling, formatting, and structural conventions for creating course content using Markdown and Marp. Adhering to these guidelines ensures consistency, readability, and maintainability across all modules and learning paths.

## General Principles

*   **Consistency:** Maintain absolute consistency in structure, language, tone, and styling.
*   **Clarity:** Prioritize clear and accurate explanations. Use visuals and examples effectively.
*   **Microsoft Writing Style Guide:** Follow the principles outlined in the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) for tone, voice, grammar, and terminology. Adopt a fun, friendly, collaborative, yet expert and authoritative tone.
*   **Accessibility:** Ensure content is accessible. Use semantic Markdown, provide alt text if images are used (though prefer Mermaid), and ensure React Native code includes accessibility props.
*   **Modularity:** Structure content so it can be easily understood independently (for async learners) while flowing logically for linear paths.

## Marp Usage

*   **Slide Breaks:** Use `<!-- --- -->` (an HTML comment containing three hyphens) on its own line to separate slides.
*   **Themes:** Use the **default Marp theme**. Avoid custom themes unless a specific, high-value need is identified and approved.
*   **Directives:** Keep directive usage minimal.
    *   `<!-- _class: lead -->`: Permitted for title or section divider slides to center and enlarge text if needed for visual hierarchy. Document any other class usage here if adopted later.
    *   Avoid custom headers, footers, or complex background directives initially.
*   **HTML:** Enable HTML rendering (`"markdown.marp.enableHtml": true` in `.vscode/settings.json`) primarily for presenter notes (`<!-- -->`) and embedding Snacks/Sandboxes (using `<iframe>`). Avoid arbitrary HTML for general content formatting; use Markdown.

## Slide Structure & Constraints

*   **Heading Structure:**
    *   `# H1`: Reserved **only** for the main title slide of a module or a major section divider slide.
    *   `## H2`: Use for the **title of every standard content slide**.
    *   `### H3+`: Use for subheadings *within* a single slide to structure content logically.
*   **Content Limits (Per Slide):**
    *   **Text:** Maximum **15 lines** of visible text (excluding H2 title, presenter notes, and code blocks/diagrams).
    *   **Word Count:** Aim for approximately **100 words** or less of visible text (excluding H2 title, presenter notes, code/diagrams). *Rationale: Keeps slides focused and prevents information overload.*
    *   **Code (Inline):** Maximum **25 lines**. Use embeds for longer examples.
*   **Presenter Notes:**
    *   **Mandatory:** Required for **all** educational slides (any slide containing conceptual information, code, diagrams, tables, etc.). Not required for simple title/divider slides.
    *   **Format:** Use HTML comments: `<!-- Presenter Notes: [Detailed explanation here] -->`.
    *   **Content:** Provide detailed, supplementary explanations of the slide's content. Word generically (as documentation, not instructions *to* a presenter). Do **not** introduce new concepts not covered on the slide itself.
    *   **Length (Code):** For slides with code examples > 5 lines, presenter notes must be **at least 200 words**, explaining the code's purpose, logic, key APIs, and line-by-line details where appropriate.
*   **Single Focus:** Each slide should focus on a single core idea, concept, or step. Break complex topics into multiple slides using defined Patterns.

## Markdown Formatting

*   **Lists:** Use standard Markdown bulleted (`*`, `-`, `+`) or numbered (`1.`) lists for sequences or itemization.
*   **Emphasis:** Use `**bold**` for strong emphasis or UI elements, and `*italic*` for mild emphasis or defining terms. Use `\`code\`` for inline code, filenames, or commands.
*   **Code Blocks (Inline):**
    *   Use triple backticks (```) with the correct language identifier (e.g., `tsx`, `jsx`, `typescript`, `javascript`, `css`, `html`, `json`, `yaml`, `bash`).
    *   Must adhere to the 25-line limit.
    *   Must be accompanied by presenter notes (200+ words if > 5 lines).
    *   Slides with code blocks should generally only have an H2 title and a single introductory sentence; the main explanation belongs in presenter notes or adjacent slides.
*   **Code Blocks (Embeds - Snack/Sandbox):**
    *   Use `<iframe>` HTML for embedding. Get the embed code from Snack/Sandbox.
    *   Use Expo Snack for React Native examples > 25 lines.
    *   Use CodeSandbox for Web (HTML/CSS/JS/React) examples > 25 lines.
    *   Slides with embeds should only have an H2 title and a single introductory sentence.
    *   Requires presenter notes (200+ words if code > 5 lines) explaining the embedded code.
*   **Tables:** Use standard Markdown table syntax. Keep tables concise and focused. Explain table content in presenter notes or adjacent slides.
*   **Links:**
    *   Use descriptive link text: `[Expo Documentation](https://docs.expo.dev/)` instead of just the URL.
    *   Include tooltips for clarity, especially for official docs: `[React Native Core Components](https://reactnative.dev/docs/components-and-apis "Link to Official React Native Documentation")`.
    *   Prioritize links to official React Native and Expo documentation. Link directly to the relevant page/section.
    *   Use links generously when concepts are introduced but not exhaustively covered, per requirements.
*   **Callouts:**
    *   Use Markdown blockquotes (`>`).
    *   Start with the type in bold: `> **Tip:** Use `npx expo install`...`
    *   Follow the types defined in `TERMINOLOGY.md`.
    *   Ensure explanations within callouts are sufficiently detailed or link to resources, per requirements.

## Visuals

*   **Mermaid Diagrams:**
    *   Use Mermaid syntax within ```mermaid code blocks.
    *   Prefer Mermaid over static images for diagrams (flowcharts, sequences, hierarchies).
    *   Slides with diagrams should only have an H2 title and a single introductory sentence. Explanation belongs in presenter notes or adjacent slides.
    *   *(Styling Note: Currently using default Mermaid rendering. A consistent theme/style may be defined later if needed.)*
*   **Images:** Avoid static images unless absolutely necessary (e.g., screenshots of UI that cannot be represented otherwise). If used, store them in `/assets/images`, use descriptive filenames, and include meaningful alt text in Markdown (`![Alt text describing the image](assets/images/filename.png)`).

## Code Standards (Examples/Exercises/Challenges)

*   **Theme:** Adhere strictly to the pharmacy/medication theme ("SpeedyMeds").
*   **TypeScript:** Mandatory for all JS/React/RN code from "TypeScript Essentials" onwards. Use strict typing.
*   **Accessibility (React Native):** All RN code *must* include comprehensive accessibility props (`accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, etc.).
*   **JSDoc:** All functions, classes, types, and complex logic *must* have comprehensive JSDoc comments.
*   **Expo:** Default to Expo libraries/APIs. Use `npx expo install`. Explain `npx expo` vs `npm`/`yarn`. Assume Expo Go / iOS Simulator environment.
*   **Formatting:** Code should be formatted using Prettier (via VS Code settings).
*   **Comments:** Include inline comments (`//`) for clarifying non-obvious logic within code blocks, in addition to JSDoc.
