# React Native Training Course - Style Guide

This document outlines the style and formatting guidelines for all course content to ensure consistency, clarity, and quality.

## Core Principles

-   **Clarity & Conciseness:** Follow the principles of the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/). Use simple language and avoid jargon where possible, or explain it clearly when necessary.
-   **Accuracy:** Ensure all technical information is up-to-date with the latest official React Native and Expo documentation and best practices. Cite sources and link to official docs frequently.
-   **Consistency:** Maintain a uniform structure, tone, and visual style across all modules and lessons. Use the provided templates.
-   **Engagement:** Make the content visually appealing and interactive through examples, exercises, challenges, and diagrams.
-   **Learner-Centric:** Address different backgrounds (Native/Web Devs) using specific callouts. Explain concepts thoroughly ("under the hood").

## Formatting & Marp

-   **Templates:** Use the Markdown templates provided in the `/templates` directory for modules, lessons, exercises, challenges, code blocks, callouts, and Mermaid diagrams.
-   **Marp Directives:** Use standard Marp front-matter directives (`theme`, `paginate`, `header`, `footer`, `_class: lead`, etc.) as defined in the templates.
-   **Markdown:** Use standard Markdown syntax for text formatting (headings, lists, bold, italics, links, etc.).

## Tone & Language

-   **Friendly & Encouraging:** Maintain a positive and supportive tone.
-   **Professional & Authoritative:** Ensure technical accuracy and clear explanations.
-   **Inclusive Language:** Avoid exclusionary language or assumptions.

## Code Examples

-   **Language:** Use TypeScript (`tsx` or `ts`) for all React Native code examples. JavaScript may be used for configuration files or scripts where appropriate.
-   **Clarity:** Keep examples focused on the concept being taught.
-   **Completeness:** Provide enough context for the example to be understood.
-   **Explanation:** **Every code block MUST be accompanied by a detailed explanation (minimum 200 words)** covering purpose, concepts, breakdown, types, styling, etc., as outlined in `templates/code-block.md`.
-   **JSDoc:** Include comprehensive JSDoc comments for functions, components, and types.
-   **TypeScript:** Use strong typing for props, state, function arguments, and return values.
-   **Accessibility:** Include relevant accessibility props (`accessibilityLabel`, `accessibilityRole`, etc.) in React Native components.
-   **Expo:** Default to using Expo libraries and APIs unless unavailable or explicitly necessary to show a non-Expo alternative.

## Visuals & Diagrams

-   **Mermaid:** Use Mermaid for all diagrams (flowcharts, sequence diagrams, etc.).
-   **Template:** Adhere strictly to the structure and configuration provided in `templates/mermaid-diagram.md` to ensure consistent `neo` theme/look and Font Awesome icons.
-   **Clarity:** Ensure diagrams are easy to understand and accurately represent the concept.
-   **Explanation:** Provide a brief text explanation accompanying each diagram.

## Callouts

-   Use the specific blockquote formats defined in `templates/callout.md` for:
    -   `Note:`
    -   `Tip:`
    -   `Important:`
    -   `Warning:`
    -   `Native Dev Context:`
    -   `Web Dev Context:`

## Exercises & Challenges

-   **Time Estimates:** Provide realistic time estimates (Exercises: 15-20 min, Challenges: 30-60 min).
-   **Theme:** Relate scenarios to the pharmacy/medication theme.
-   **Clarity:** Provide clear instructions, starter code (Expo Snack preferred), and expected outcomes.
-   **Solutions:** Link to clear solutions.

## Links

-   Include abundant links to official React Native, Expo, TypeScript, and relevant library documentation.
-   Verify links are working and point to the correct resources.

---

*This style guide is a living document and may be updated as the course evolves.*