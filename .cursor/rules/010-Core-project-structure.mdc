---
description: "defines the structure and organization of the React Native training course repository"
globs: 
alwaysApply: false
---

# Project Structure and Organization

[README.md](mdc:README.md)
[README.md](mdc:docs/README.md)
[Cursor Rules README](mdc:.cursor/README.md)


## Description
This rule defines the structure and organization of the React Native training course repository.

## Rule
- The repository follows a specific branch structure:
  - `main`: Contains README.md with navigation instructions and course overview
  - `docs`: Contains all text-based documentation in markdown format and HTML/CSS slides for live training sessions
  - `exercises/<EXERCISE_NAME>/starter`: Starter code for exercises
  - `exercises/<EXERCISE_NAME>/complete`: Completed examples for exercises
  - `challenges/<CHALLENGE_NAME>/starter`: Starter code for challenges
  - `challenges/<CHALLENGE_NAME>/complete`: Completed examples for challenges

- Documentation should follow a hierarchical structure:
  - Modules (large topics, as defined in [Course Modules](mdc:101-Content-course-modules.mdc))
  - Sections (components of modules)
  - Sub-sections (components of sections)

- Each module and section should have its own README.md file that provides an overview, learning objectives, and navigation links

- Slides should be organized in the docs branch under a dedicated slides directory:
  - `/slides/module-X/section-Y/`

- All code examples should follow the medication/pharmacy/orders theme
- All starter and completed code must include JSDoc documentation

## Examples
- Proper branch naming: `exercises/basic-component/starter`
- Improper branch naming: `exercise-basic-component-starter`

- Proper documentation structure:
  ```
  /docs
    /module-1-javascript-fundamentals
      README.md  # Module overview, learning objectives, section links
      /section-1-variables
        README.md  # Section overview, learning objectives, content
        variables.md
        /examples
          variable-examples.js
      /section-2-functions
        README.md  # Section overview, learning objectives, content
        functions.md
        /examples
          function-examples.js
    /slides
      /module-1-javascript-fundamentals
        /section-1-variables
          index.html
          styles.css
          script.js
        /section-2-functions
          index.html
          styles.css
          script.js
  ``` 