# Section 4: CSS Basics

## Learning Objectives
After completing this section, you will be able to:
- Apply CSS styling to HTML elements
- Implement responsive design principles
- Recognize parallels between CSS and React Native styling

**Prerequisite Knowledge**: Sections 1-3
**Estimated Time**: 45-60 minutes

## CSS Overview

CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of HTML documents. It controls layout, colors, fonts, and other visual aspects of web pages.

### Adding CSS to HTML

There are three ways to add CSS to an HTML document:

#### 1. Inline CSS

```html
<h1 style="color: blue; font-size: 24px;">Medication List</h1>
```

#### 2. Internal CSS (in the `<head>` section)

```html
<head>
  <style>
    h1 {
      color: blue;
      font-size: 24px;
    }
  </style>
</head>
```

#### 3. External CSS (separate file)

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* styles.css */
h1 {
  color: blue;
  font-size: 24px;
}
```

> 🔄 **For React Native Developers**: React Native primarily uses the equivalent of inline styles through the `style` prop, though the `StyleSheet` API provides optimizations similar to external CSS.

### CSS Syntax

CSS consists of selectors and declarations:

```css
selector {
  property: value;
  property: value;
}
```

Example:

```css
h1 {
  color: blue;
  font-size: 24px;
}

.medication-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

#prescription-form {
  max-width: 600px;
  margin: 0 auto;
}
```

## CSS Selectors

Selectors determine which elements receive the style:

### Element Selector

```css
h1 {
  color: blue;
}
```

### Class Selector

```css
.medication-card {
  background-color: #f5f5f5;
}
```

### ID Selector

```css
#prescription-form {
  max-width: 600px;
}
```

### Attribute Selector

```css
input[type="text"] {
  border: 1px solid #ccc;
}
```

### Descendant Selector

```css
.medication-card h3 {
  margin-top: 0;
}
```

### Combined Selectors

```css
.medication-card.active {
  border: 2px solid #4285f4;
}
```

> 💡 **Deep Dive**: CSS selectors enable targeting specific elements in the DOM tree. React Native doesn't have this concept - styles are applied directly to components via props, which is more explicit and avoids some of the complexity of CSS specificity.

## Common CSS Properties

### Text Styling

```css
.medication-name {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  text-decoration: underline;
  line-height: 1.5;
}
```

### Box Model

The CSS box model consists of:
- Content
- Padding
- Border
- Margin

```css
.medication-card {
  width: 300px;
  height: auto;
  padding: 16px;
  border: 1px solid #ddd;
  margin: 10px;
}
```

> 🔄 **For React Native Developers**: React Native uses a subset of the CSS box model, but measurements are in density-independent pixels rather than the various units available in CSS.

### Background

```css
.medication-card {
  background-color: #f8f9fa;
  background-image: url('pill-pattern.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 50px 50px;
}
```

### Display and Positioning

#### Display Property

```css
.medication-card {
  display: block; /* Other values: inline, inline-block, flex, grid, none */
}
```

#### Position Property

```css
.badge {
  position: absolute; /* Other values: relative, fixed, sticky, static */
  top: 10px;
  right: 10px;
}

.medication-container {
  position: relative;
}
```

> 💡 **Deep Dive**: React Native primarily uses Flexbox for layout, which is just one of several layout mechanisms in CSS. This provides a more consistent layout experience across different platforms.

## Flexbox Layout

Flexbox is a powerful layout system for creating responsive designs:

```css
.medication-list {
  display: flex;
  flex-direction: row; /* or column */
  flex-wrap: wrap;
  justify-content: space-between; /* horizontal alignment */
  align-items: center; /* vertical alignment */
  gap: 16px;
}

.medication-card {
  flex: 1;
  min-width: 250px;
}
```

> 🔄 **For React Native Developers**: React Native's layout system is primarily based on Flexbox, with some differences from the web implementation. Most Flexbox concepts transfer directly to React Native.

## CSS Units

CSS offers various units for measurements:

- `px`: Pixels
- `%`: Percentage of parent element
- `em`: Relative to the font-size of the element
- `rem`: Relative to the font-size of the root element
- `vh`/`vw`: Percentage of viewport height/width

```css
.container {
  width: 80%; /* 80% of parent width */
  max-width: 1200px; /* Maximum width in pixels */
  font-size: 1rem; /* Same as root font size */
  padding: 2em; /* 2x the element's font size */
  min-height: 50vh; /* 50% of viewport height */
}
```

> 🔄 **For React Native Developers**: React Native primarily uses density-independent pixels, without the variety of units available in CSS.

## Responsive Design

Responsive design ensures that websites look good on all devices by adapting to different screen sizes.

### Media Queries

```css
/* Base styles for all devices */
.medication-card {
  width: 100%;
  padding: 10px;
}

/* Styles for tablets and larger */
@media (min-width: 768px) {
  .medication-card {
    width: 48%;
    padding: 15px;
  }
}

/* Styles for desktops and larger */
@media (min-width: 1024px) {
  .medication-card {
    width: 31%;
    padding: 20px;
  }
}
```

> 🔄 **For React Native Developers**: React Native has a different approach to responsive design through the `Dimensions` API and responsive hooks. Media queries don't exist in the same way.

### Mobile-First Design

A best practice is to design for mobile first, then enhance for larger screens:

```css
/* Mobile styles (default) */
.medication-list {
  flex-direction: column;
}

/* Tablet and larger */
@media (min-width: 768px) {
  .medication-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

## CSS Variables (Custom Properties)

CSS variables allow you to define reusable values:

```css
:root {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --danger-color: #ea4335;
  --font-heading: 'Roboto', sans-serif;
  --spacing-unit: 8px;
}

.medication-name {
  color: var(--primary-color);
  font-family: var(--font-heading);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.warning {
  color: var(--danger-color);
}
```

> 🔄 **For React Native Developers**: React Native doesn't have built-in CSS variables, but you can achieve the same effect by defining a theme object in JavaScript.

## Connection to React Native Styling

React Native styling is heavily inspired by CSS, but with some key differences:

| CSS | React Native |
|-----|--------------|
| `color: blue;` | `color: 'blue',` |
| `font-size: 16px;` | `fontSize: 16,` |
| `margin: 10px 20px;` | `margin: 10, marginHorizontal: 20,` |
| `background-color: #f0f0f0;` | `backgroundColor: '#f0f0f0',` |
| Class selectors | Style objects applied to components |
| External stylesheets | StyleSheet.create() |
| Media queries | Dimensions API, responsive hooks |
| CSS variables | JavaScript constants/objects |

### React Native StyleSheet Example:

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  medicationCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

> 💡 **Deep Dive**: The `StyleSheet.create()` method in React Native offers performance optimizations by validating styles at compile time and converting them to atomic IDs.

## Exercise: Styling a Medication Card with CSS

Using the HTML structure you created in the previous exercise, add CSS styling to create a visually appealing medication card.

**CodePen Link**: [Medication Card CSS Exercise](https://codepen.io/your-username/pen/create)

In this exercise, you'll:
1. Define appropriate CSS selectors for your HTML structure
2. Apply styling for typography, colors, spacing, and layout
3. Make the design responsive using media queries
4. Use CSS variables for consistent styling
5. Add hover effects for interactive elements

> 🚀 **Self-Led Learners**: After completing the CSS styling, try to recreate the same design using React Native's StyleSheet approach (you can do this conceptually if you're not yet familiar with React Native syntax).

## Key Takeaways

- CSS controls the presentation and layout of HTML documents
- The box model, Flexbox, and Grid are fundamental for layout
- Responsive design ensures websites work well across all devices
- React Native styling is heavily inspired by CSS but with some key differences
- Understanding CSS concepts provides a foundation for React Native styling
- React Native simplifies styling by using a subset of CSS capabilities
- Both CSS and React Native StyleSheet follow the principle of separating presentation from content 