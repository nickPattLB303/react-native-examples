# Action Plan: Creating Reusable Marp Content Structures for React Native Course

This plan outlines a structured approach to building reusable Marp content elements (snippets, templates, patterns) for the React Native course. It focuses on enforcing detailed requirements through clear documentation, defined workflows, and decision trees, while maintaining simplicity by using only Markdown and the Marp VS Code extension.

**Phase 1: Foundation and Core Concepts**

1.  **Define Terminology & Analogy:**
    *   Clearly document the definitions within this project:
        *   **Snippet:** A small, reusable block of Markdown/Marp syntax representing a specific, frequently used element (e.g., a callout box, presenter notes structure). *Think of these like primitive UI elements or utility functions.*
        *   **Template:** A pre-defined structure for a single slide, composed of Markdown, Marp directives, and potentially incorporating Snippets. Defines layout and required content types (e.g., Title Slide Template, Code Example Template). *Think of these like individual screen components.*
        *   **Pattern:** A specific sequence of Templates designed to present information in a standard way (e.g., introducing a concept, explaining a code example). *Think of these like user flows or composite components.*
    *   Emphasize this component-based analogy throughout the documentation to encourage modular thinking.

2.  **Establish Repository Structure:**
    *   Create dedicated directories in your GitHub repo:
        *   `/course-content`: For the actual course modules/lessons.
        *   `/_marp-structures`: To house the reusable elements.
            *   `/_marp-structures/snippets`: Contains individual Markdown files for each snippet.
            *   `/_marp-structures/templates`: Contains individual Markdown files for each slide template.
            *   `/_marp-structures/patterns`: Contains Markdown files describing patterns, possibly including example sequences.
            *   `/_marp-structures/documentation`: Contains guidelines, workflows, and decision trees.
    *   Create a root `README.md` in `/_marp-structures` explaining the purpose and usage of this system.

3.  **Define Global Marp Settings (Minimal):**
    *   In the `/_marp-structures/documentation`, specify the *minimal* required Marp front matter directives to be included in *every* course file (likely just `marp: true`). Avoid custom themes or complex settings to adhere to the simplicity requirement. Recommend standard Marp themes like `default` or `gaia`.

**Phase 2: Developing Snippets**

1.  **Identify Required Snippets:** Based on your requirements, create snippets for:
    *   Presenter Notes Structure (`<!-- ... -->` format, with guidance on general-purpose language).
    *   Callout Boxes (e.g., Info, Warning, Tip, Native Dev Context, Web Dev Context, React Dev Context, Angular Dev Context). Define standard formatting (e.g., using blockquotes `>` with bolded labels).
    *   Link Formatting (Standard Markdown `[Text](URL)`).
    *   Code Block Structure (Triple backticks with language identifier placeholder ` ```language\ncode\n``` `).
    *   Mermaid Diagram Structure ( ` ```mermaid\ndiagram\n``` `).
    *   Table Structure Placeholder (Basic Markdown table syntax).
    *   Strict Heading Levels (Guidance on using `#`, `##`, `###`, etc., consistently).

2.  **Create Snippet Files:**
    *   For each snippet, create a `.md` file in `/_marp-structures/snippets` (e.g., `info-callout.md`).
    *   The file should contain *only* the raw Markdown/HTML for the snippet.

3.  **Document Snippets:**
    *   In `/_marp-structures/documentation/snippets-guide.md`:
        *   List all available snippets.
        *   Provide the raw code for each snippet.
        *   Explain the purpose and intended use case for each.
        *   Include a simple decision tree or checklist: "When you need to add supplemental context for native developers, use the `native-dev-context-callout.md` snippet."

**Phase 3: Developing Slide Templates**

1.  **Identify Required Templates:** Based on requirements, define templates for common slide types:
    *   `title-slide.md`: For module/lesson titles.
    *   `section-divider-slide.md`: For separating major topics.
    *   `content-slide.md`: Standard text/bullet points, MUST include Presenter Notes snippet placeholder.
    *   `code-example-slide.md`: Title (`###`), single sentence description, Code Block snippet (<= 25 lines), Presenter Notes snippet (min. 200 words if code > 5 lines).
    *   `diagram-slide.md`: Title (`###`), single sentence description, Mermaid Diagram snippet, Presenter Notes snippet.
    *   `table-slide.md`: Title (`###`), single sentence description, Table snippet, Presenter Notes snippet.
    *   `embedded-example-slide.md`: Title (`###`), single sentence description, Placeholder text instructing author to embed CodeSandbox/Expo Snack link, Presenter Notes snippet (min. 200 words).

2.  **Create Template Files:**
    *   For each template, create a `.md` file in `/_marp-structures/templates`.
    *   Each file should contain the full Marp structure for that slide type, including necessary front matter (`marp: true`), slide separators (`---`), placeholder text (e.g., `[Insert Content Here]`), and references to required snippets (e.g., include the content of `presenter-notes.md` snippet).

3.  **Document Templates:**
    *   In `/_marp-structures/documentation/templates-guide.md`:
        *   List all available templates.
        *   Show the basic structure/example of each.
        *   Explain the purpose and constraints (e.g., "Use `code-example-slide.md` ONLY for code <= 25 lines. MUST include detailed presenter notes explaining the code.").
        *   Include strict rules regarding content accompanying code/diagrams/tables (title + single sentence only).
        *   Include line/word count *guidelines* (acknowledging manual enforcement).
        *   Include a decision tree: "Is the code > 25 lines? Use `embedded-example-slide.md`. Is it <= 25 lines? Use `code-example-slide.md`."

**Phase 4: Developing Content Patterns**

1.  **Identify Required Patterns:** Define standard sequences for teaching:
    *   `concept-introduction-pattern`: e.g., `content-slide.md` (definition) -> `diagram-slide.md` (visual) -> `content-slide.md` (explanation/context).
    *   `small-code-explanation-pattern`: e.g., `content-slide.md` (concept intro) -> `code-example-slide.md` (code <= 25 lines) -> `content-slide.md` (summary/reinforcement).
    *   `large-code-explanation-pattern`: e.g., `content-slide.md` (concept intro) -> `embedded-example-slide.md` (instructions + link placeholder + detailed presenter notes) -> `content-slide.md` (summary/reinforcement).
    *   `topic-overview-pattern`: e.g., `title-slide.md` -> `content-slide.md` (objectives) -> `content-slide.md` (agenda).
    *   `module-summary-pattern`: e.g., `content-slide.md` (key takeaways) -> `content-slide.md` (next steps/links).

2.  **Document Patterns:**
    *   In `/_marp-structures/documentation/patterns-guide.md`:
        *   Describe each pattern conceptually.
        *   List the sequence of templates involved (e.g., "Concept Introduction: `content-slide.md` -> `diagram-slide.md` -> `content-slide.md`").
        *   Explain *when* and *why* to use each pattern.
        *   Provide detailed instructions for the `large-code-explanation-pattern`, including:
            *   How to create a CodeSandbox/Expo Snack.
            *   How to get the embeddable link/iframe code.
            *   How to insert it into the `embedded-example-slide.md` (likely using HTML within the Markdown: `<iframe src="..."></iframe>`).
            *   Reinforce the requirement for extensive code comments/JSDoc within the Sandbox/Snack itself.
        *   Include a decision tree: "Need to explain a concept visually? Use `concept-introduction-pattern` with a diagram. Need to show a large code example? Use `large-code-explanation-pattern`."

**Phase 5: Workflow and Enforcement**

1.  **Define Content Creation Workflow:**
    *   Document the step-by-step process for course authors in `/_marp-structures/documentation/authoring-workflow.md`:
        1.  Consult `patterns-guide.md` to select the appropriate pattern for the teaching goal.
        2.  If no pattern fits, consult `templates-guide.md` to select individual templates.
        3.  Copy the relevant template(s) or pattern structure into the `/course-content` directory.
        4.  Consult `snippets-guide.md` and insert required snippets (callouts, presenter notes, etc.).
        5.  Write content, strictly adhering to the guidelines within the chosen templates/patterns and the overall requirements (linking, terminology, depth, presenter note quality, line limits).
        6.  For large code examples, follow the specific embedding instructions in `patterns-guide.md`.
        7.  Use Mermaid syntax for all diagrams (` ```mermaid `).
        8.  Review against checklists provided in the documentation.

2.  **Create Enforcement Checklists:**
    *   Within the documentation (`templates-guide.md`, `patterns-guide.md`), include checklists for authors to self-verify adherence:
        *   Presenter notes present and meet quality/length standards?
        *   Code example size constraints followed?
        *   Correct template used for code/diagrams/tables?
        *   Accompanying text limited to title/sentence for code/diagrams/tables?
        *   Line/word count guidelines considered?
        *   Required links to official docs included?
        *   Consistent terminology used?
        *   Learner path/experience callouts used where appropriate?

**Phase 6: Review and Iteration**

1.  **Establish Review Process:** Define a peer-review or instructor-review process focusing on adherence to the established structures and requirements.
2.  **Iterate:** Plan for periodic review and refinement of the snippets, templates, patterns, and documentation based on author feedback and course evolution.

---

## Mermaid Diagram: Content Structure Hierarchy

```mermaid
graph TD
    A[Course Module (.md)] --> B(Patterns);
    B --> C{Templates};
    C --> D{Snippets};
    C --> E[Marp Directives];
    C --> F[Markdown Content];
    D --> G[Raw Markdown/HTML];

    subgraph "Reusable Structures (`/_marp-structures`)"
        direction LR
        D;
        C;
        B;
        H[Documentation];
    end

    subgraph "Guides (`/_marp-structures/documentation`)"
        direction TB
        H --> I[Workflows];
        H --> J[Decision Trees];
        H --> K[Checklists];
        H --> L[Snippet Guide];
        H --> M[Template Guide];
        H --> N[Pattern Guide];
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#cfc,stroke:#333,stroke-width:2px
    style D fill:#ffc,stroke:#333,stroke-width:2px
    style H fill:#eee,stroke:#333,stroke-width:2px
```

---

## Mermaid Diagram: Simplified Authoring Decision Flow

```mermaid
graph TD
    A[Start: Need to Add Content] --> B{What is the Teaching Goal?};
    B -- Introduce Concept --> C[Use 'Concept Introduction Pattern'];
    B -- Explain Small Code (<25 lines) --> D[Use 'Small Code Explanation Pattern'];
    B -- Explain Large Code (>25 lines) --> E[Use 'Large Code Explanation Pattern'];
    B -- Other (Single Slide) --> F{Choose Appropriate Template?};
    F -- Code Example --> G[Use 'Code Example Template'];
    F -- Diagram --> H[Use 'Diagram Template'];
    F -- Table --> I[Use 'Table Template'];
    F -- Basic Text --> J[Use 'Content Template'];
    F -- Section Title --> K[Use 'Section Divider Template'];
    C --> L[Follow Pattern Steps];
    D --> L;
    E --> L;
    G --> M[Fill Template Content];
    H --> M;
    I --> M;
    J --> M;
    K --> M;
    L --> N{Need Snippets?};
    M --> N;
    N -- Yes --> O[Consult Snippet Guide & Insert];
    N -- No --> P[Review Content vs. Checklists];
    O --> P;
    P --> Q[End: Content Drafted];

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style Q fill:#f9f,stroke:#333,stroke-width:2px