# React Native Training Course

Welcome to the React Native Training Course repository! This repository serves as the central source of truth for all React Native training materials, designed to support multiple learning paths and delivery methods.

## About This Course

This comprehensive React Native training course is designed for developers with backgrounds in native mobile development (iOS/Android) or web development (React/Angular). It provides a structured path to becoming proficient in React Native development through detailed content, hands-on exercises, and real-world challenges.

The course follows best practices outlined in the ADDIE instructional design model and Microsoft Writing Style Guide, with a consistent pharmacy theme (SpeedyMeds) throughout all examples and exercises.

## Course Structure

This repository is structured as follows:

```
react-native-training/
├── README.md                 # This file
├── CONTRIBUTING.md           # Guidelines for contributing
├── course-outline.md         # Detailed course outline
├── make-scripts-executable.sh # Script to make all scripts executable
├── assets/                   # Shared assets
│   ├── images/               # Global images and diagrams
│   ├── scripts/              # Helper scripts for content creation
│   │   ├── create-topic.sh
│   │   ├── create-exercise.sh
│   │   ├── create-challenge.sh
│   │   └── validate-content.sh
│   └── theme/                # Styling for slides
│       └── company-theme.css
├── templates/                # Reusable content templates
│   ├── main-topic-template.md
│   ├── exercise-template.md
│   ├── challenge-template.md
│   └── slides/
│       ├── title-slide.md
│       ├── content-slide.md
│       └── code-slide.md
└── topics/                   # Course content organized by topic
    ├── 01-react-native-fundamentals/
    │   ├── react-native-fundamentals.md
    │   ├── slides/
    │   ├── exercises/
    │   ├── challenges/
    │   └── images/
    ├── 02-react-native-environment-setup/
    │   └── ...
    ├── 03-web-development-essentials/
    │   └── ...
    └── ...
```

## Learning Paths

This course supports three different learning paths:

1. **Instructor-Led**: 4-week intensive program with daily 1-hour sessions
2. **Self-Led**: Self-paced learning with complete documentation
3. **Asynchronous**: Topic-specific learning on an as-needed basis

All content is designed to be modular, allowing learners to follow their preferred path while ensuring consistent quality and depth.

## Content Types

The course includes the following types of content:

1. **Main Topic Documents**: Comprehensive coverage of each topic with explanations, diagrams, code examples, and references
2. **Slide Decks**: Marp-based presentations for instructor-led sessions
3. **Exercises**: 15-20 minute guided practice activities
4. **Challenges**: 30-60 minute comprehensive assignments
5. **Reference Materials**: Links to official documentation and additional resources

## Content Creation Tools

This repository includes several helper scripts to streamline content creation:

### Setting Up

First, make the scripts executable:

```bash
./make-scripts-executable.sh
```

### Creating New Content

To create a new topic:

```bash
./assets/scripts/create-topic.sh "01" "React Native Fundamentals"
```

To create a new exercise for a topic:

```bash
./assets/scripts/create-exercise.sh "01" "Basic Component Creation"
```

To create a new challenge for a topic:

```bash
./assets/scripts/create-challenge.sh "01" "Medication List Filter"
```

### Validating Content

To validate content for consistency and completeness:

```bash
# Validate all content
./assets/scripts/validate-content.sh

# Validate a specific topic
./assets/scripts/validate-content.sh 01
```

## Content Guidelines

All course content follows these guidelines:

1. **Consistency**: Uses consistent terminology, formatting, and approaches
2. **Inclusivity**: Accommodates different learning paths and developer backgrounds
3. **Theming**: All examples use the SpeedyMeds pharmacy theme
4. **Modern Practices**: TypeScript and accessibility are emphasized throughout
5. **Hands-on Learning**: Practical exercises and challenges reinforce concepts
6. **Comprehensive**: Covers both basics and advanced topics
7. **Modularity**: Content can be used independently or as part of the full course

## Using Marp for Presentations

This course uses [Marp](https://marp.app/) for creating slide decks from Markdown. To view or present slides:

1. Install the [Marp for VS Code extension](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
2. Open any slide markdown file in the `slides/` directory
3. Use the "Open Preview" button in VS Code to view the slides
4. Export to PDF or present directly from VS Code

## Course Distribution

This repository serves as the single source of truth for all course content, which can then be distributed through:

1. **Confluence**: For documentation and self-paced learning
2. **Articulate 360**: For interactive online learning
3. **GitHub**: For code examples and capstone project
4. **Live Sessions**: For instructor-led training

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this course.

## License

[Include appropriate license information here]