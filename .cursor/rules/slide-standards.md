# Slide and Presentation Standards

## Description
This rule defines the standards for HTML slides and presentation materials used in the instructor-led training sessions.

## Rule
- All slides must be created using HTML and CSS (no PowerPoint or other presentation software)
- Slides must be organized in the `slides` directory by module and section
- Each presentation should include:
  - Title slide with module/section name
  - Learning objectives slide
  - Content slides with concise information
  - Code example slides
  - Summary/recap slide
  - Exercise/challenge introduction slide

- Slide design requirements:
  - Clean, minimalist design
  - Consistent typography and color scheme
  - High contrast for readability
  - Responsive design for different screen sizes
  - Syntax highlighting for code examples

- Content guidelines:
  - Keep text concise (bullet points, not paragraphs)
  - Use visual aids where appropriate (diagrams, images)
  - Include presenter notes for additional context
  - Provide links to documentation and resources
  - Include timestamps/agenda for time management

- Code examples in slides:
  - Should be concise and focused on the concept being taught
  - Must use syntax highlighting
  - Should be legible from the back of a classroom
  - Complex examples should be broken down into steps

- Slide navigation:
  - Include progress indicator
  - Provide clear navigation controls
  - Support keyboard navigation

## Examples
- Proper slide directory structure:
  ```
  /slides
    /module-1-javascript-fundamentals
      /section-1-variables
        index.html
        styles.css
        script.js
        /images
      /section-2-functions
        index.html
        styles.css
        script.js
        /images
  ```

- Proper slide HTML structure:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Native Components | Module 2, Section 3</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="../../shared/highlight.css">
  </head>
  <body>
    <div class="slides">
      <!-- Title Slide -->
      <section class="slide title-slide">
        <h1>React Native Components</h1>
        <h2>Building Blocks of Your Application</h2>
        <p class="metadata">Module 2, Section 3 | 45 minutes</p>
      </section>
      
      <!-- Learning Objectives Slide -->
      <section class="slide objectives-slide">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Understand the component-based architecture</li>
          <li>Create functional and class components</li>
          <li>Use props to configure components</li>
          <li>Manage component state</li>
        </ul>
      </section>
      
      <!-- Content Slide -->
      <section class="slide content-slide">
        <h2>Component Types</h2>
        <div class="columns">
          <div class="column">
            <h3>Functional Components</h3>
            <ul>
              <li>Simple, focused components</li>
              <li>Use hooks for state</li>
              <li>Preferred for most cases</li>
            </ul>
          </div>
          <div class="column">
            <h3>Class Components</h3>
            <ul>
              <li>Traditional React pattern</li>
              <li>Built-in lifecycle methods</li>
              <li>Used in legacy code</li>
            </ul>
          </div>
        </div>
        <div class="presenter-notes">
          Emphasize that functional components are the modern approach, but understanding class components is important for maintaining existing codebases.
        </div>
      </section>
      
      <!-- Code Example Slide -->
      <section class="slide code-slide">
        <h2>Functional Component Example</h2>
        <pre><code class="language-jsx">
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MedicationItem = ({ name, dosage, frequency }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage}, {frequency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: '#666'
  }
});

export default MedicationItem;
        </code></pre>
      </section>
      
      <!-- Summary Slide -->
      <section class="slide summary-slide">
        <h2>Summary</h2>
        <ul>
          <li>Components are the building blocks of React Native apps</li>
          <li>Functional components with hooks are the modern approach</li>
          <li>Props allow components to be configurable</li>
          <li>StyleSheet provides a way to style components</li>
        </ul>
        <div class="next-steps">
          <p><strong>Next:</strong> Exercise - Create a Pharmacy Card Component</p>
        </div>
      </section>
    </div>
    
    <script src="../../shared/highlight.js"></script>
    <script src="script.js"></script>
  </body>
  </html>
  