# Patterns Guide

This guide describes standard content patterns, which are recommended sequences of slide templates (from `/_marp-structures/templates/`) designed to present information consistently and effectively. Using these patterns helps structure lessons logically and ensures all necessary components (like explanations before/after code) are included.

## How to Use Patterns

There are two main ways to use patterns:

**Option A: Using the Pattern Example Files (Recommended for Ease)**
1.  Identify your teaching goal (e.g., introduce a new concept, explain a code example).
2.  Consult the decision tree below or browse the available patterns to find the one that best fits your goal.
3.  Locate the corresponding example pattern file in `/_marp-structures/patterns/` (e.g., `concept-introduction-pattern.md`).
4.  Copy the *entire content* of the example pattern file into your course module's Markdown file.
5.  Populate the placeholder content within the copied structure, following the guidelines in `templates-guide.md` and `snippets-guide.md`.
6.  **Important:** Remember that the final module file needs a single `--- marp: true ---` front matter block at the very top. The example pattern files intentionally omit this.

**Option B: Manually Combining Templates**
1.  Identify your teaching goal and the appropriate pattern from the descriptions below.
2.  Note the sequence of templates required by the pattern.
3.  Copy the content of each required template file from `/_marp-structures/templates/` into your course module file, ensuring they are separated by `---`.
4.  Populate each template with content, following the guidelines in `templates-guide.md` and `snippets-guide.md`.
5.  Ensure the flow between the slides is logical and smooth.
6.  **Important:** Add the `--- marp: true ---` front matter once at the very top of your final module file.

---

## Available Patterns

### 1. Concept Introduction Pattern

**Purpose:** To introduce and explain a new concept, often using a visual aid.
**Sequence:**
1.  `content-slide.md`: Define the concept, explain its importance.
2.  `diagram-slide.md` (Optional but Recommended): Provide a visual representation (Mermaid diagram).
3.  `content-slide.md`: Elaborate on the concept, provide context, examples, or relate it to prior knowledge.

**When to Use:** When introducing a fundamental idea, workflow, architecture, or abstract concept for the first time.

### 2. Small Code Explanation Pattern (`<= 25 lines`)

**Purpose:** To explain a specific piece of code that is 25 lines or less.
**Sequence:**
1.  `content-slide.md`: Introduce the concept the code demonstrates or the problem it solves. Provide necessary background.
2.  `code-example-slide.md`: Display the code (max 25 lines). Title and single sentence description only on this slide. **Detailed notes explaining the code are mandatory.**
3.  `content-slide.md`: Summarize what the code does, reinforce the key takeaways, or discuss alternatives/next steps.

**When to Use:** For focused code examples illustrating syntax, a specific function, component usage, or a small algorithm. **Strictly for code <= 25 lines.**

### 3. Large Code Explanation Pattern (`> 25 lines`)

**Purpose:** To explain a larger, more complex code example requiring an embedded CodeSandbox or Expo Snack.
**Sequence:**
1.  `content-slide.md`: Introduce the concept the code demonstrates or the problem it solves. Explain the context and goals of the embedded example.
2.  `embedded-example-slide.md`: Provide the title, single sentence description, and the embedded CodeSandbox/Expo Snack. **Detailed notes explaining the embedded code are mandatory.**
3.  `content-slide.md`: Summarize the key functionality shown in the embed, discuss important patterns or takeaways, and guide learners on how to interact with the embed.

**When to Use:** For complex components, multi-file examples, or code exceeding 25 lines that benefits from live interaction.

**Instructions for Embedding (within `embedded-example-slide.md`):**
1.  **Prepare Example:** Create your code example on [codesandbox.io](https://codesandbox.io) (for web/React) or [snack.expo.dev](https://snack.expo.dev) (for React Native).
2.  **Add Documentation:** Ensure the code within the Sandbox/Snack is thoroughly commented and includes JSDoc documentation where appropriate, following best practices. This is crucial as learners will interact directly with this code.
3.  **Get Embed Code:**
    *   **CodeSandbox:** Click "Share" -> "Embed". Copy the `<iframe>` code.
    *   **Expo Snack:** Click the "Embed" tab below the editor. Copy the `<iframe>` code.
4.  **Paste into Template:** Open the `embedded-example-slide.md` template content in your course file. Delete the placeholder comment `[<<< PASTE EMBED CODE... >>>]` and the instructional comments surrounding it. Paste the copied `<iframe>` code in its place.
5.  **Write Notes:** Fill in the notes section for the `embedded-example-slide.md`, providing a detailed explanation (~200 words minimum) of the embedded code's structure, logic, and key features, as required by the template.

### 4. Topic Overview Pattern

**Purpose:** To start a new major topic or lesson, setting expectations.
**Sequence:**
1.  `section-divider-slide.md` or `title-slide.md`: Announce the new topic/lesson.
2.  `content-slide.md`: Outline the learning objectives for this topic.
3.  `content-slide.md`: Provide an agenda or list of sub-topics to be covered.

**When to Use:** At the beginning of a significant new section or lesson within a module.

### 5. Module Summary Pattern

**Purpose:** To conclude a module or major lesson, reinforcing key points.
**Sequence:**
1.  `content-slide.md`: Summarize the key takeaways and concepts covered. Use bullet points for clarity.
2.  `content-slide.md`: Suggest next steps, link to relevant resources (official docs, further reading), or introduce the next module/topic briefly.
3.  (Optional) `content-slide.md`: Include a call to action, review questions, or information about related exercises/challenges.

**When to Use:** At the end of a complete module or major lesson.

---

## Decision Tree (Simplified)

*   Need to introduce a new concept? -> Use `concept-introduction-pattern`
*   Need to explain code?
    *   Code <= 25 lines? -> Use `small-code-explanation-pattern`
    *   Code > 25 lines? -> Use `large-code-explanation-pattern` (follow embedding instructions)
*   Need to start a new major topic/lesson? -> Use `topic-overview-pattern`
*   Need to wrap up a module/lesson? -> Use `module-summary-pattern`