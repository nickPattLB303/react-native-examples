# React Native Training Course

This repository contains materials for a comprehensive React Native training course. The course is designed to support multiple learning paths: instructor-led, self-led, and asynchronous learning.

## Project Structure

```
react-native-course/
├── assets/                  # Shared assets (images, custom CSS, etc.)
├── modules/                 # Course modules
│   ├── 01-react-native-fundamentals/
│   ├── 02-environment-setup/
│   ├── ...
│   └── 12-advanced-features/
├── reveal.js/              # Reveal.js library for presentations
├── templates/              # Templates for creating new modules
└── index.html              # Course home page
```

## How to Use This Repository

### Viewing the Course

1. Open `index.html` in a web browser to access the course home page
2. Navigate to any module by clicking on the module links
3. Each module can be viewed in two modes:
   - **Presentation Mode**: The default view when opening a module's index.html
   - **Document Mode**: Click the "View as Document" link in the presentation or navigate directly to the module's content.md file

### Creating New Modules

1. Create a new directory for your module in the `modules/` directory
2. Copy the template files from the `templates/` directory:
   ```
   cp templates/module-template.html modules/your-module-name/index.html
   cp templates/content-template.md modules/your-module-name/content.md
   ```
3. Update the module title in both files
4. Edit the content.md file with your module content

## Markdown Formatting for Dual-Purpose Content

The content is written in Markdown and structured to work both as slides and as documentation:

- **Horizontal Slides**: Separated by `---` (three dashes)
- **Vertical Slides**: Separated by `--` (two dashes)
- **Speaker Notes**: Start with `Note:` on a new line
- **Custom Classes**: Use HTML divs with class names for special formatting:
  ```html
  <div class="note">This is a note.</div>
  <div class="warning">This is a warning.</div>
  <div class="platform-specific">Platform-specific content.</div>
  <div class="exercise">Exercise content.</div>
  <div class="challenge">Challenge content.</div>
  ```

### Learning Path Indicators

```html
<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>
```

### Experience Level Indicators

```html
<div class="android-dev">Android Developer</div>
<div class="ios-dev">iOS Developer</div>
<div class="react-dev">React Developer</div>
<div class="angular-dev">Angular Developer</div>
```

## Reveal.js Features

This course uses [Reveal.js](https://revealjs.com/) for presentations. Key features include:

- **Navigation**: Use arrow keys to navigate between slides
- **Overview Mode**: Press 'Esc' or 'o' to see an overview of all slides
- **Speaker Notes**: Press 'S' to open speaker notes
- **Fullscreen**: Press 'F' to enter fullscreen mode
- **Zoom**: Alt+click (or Ctrl+click) on any element to zoom in

## Development

### Prerequisites

- A modern web browser
- Optional: Node.js and npm for running a local server

### Running Locally

For the best experience, serve the files using a local web server:

```bash
# If you have Node.js installed
npx http-server

# If you have Python installed
# Python 3
python -m http.server
# Python 2
python -m SimpleHTTPServer
```

Then open `http://localhost:8080` in your browser.
