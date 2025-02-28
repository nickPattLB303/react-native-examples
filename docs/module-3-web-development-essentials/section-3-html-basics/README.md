# Section 3: HTML Basics

## Learning Objectives
After completing this section, you will be able to:
- Create well-structured HTML documents
- Use semantic HTML elements appropriately
- Understand how HTML concepts relate to React Native components

**Prerequisite Knowledge**: Sections 1-2
**Estimated Time**: 45-60 minutes

## HTML Overview

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web content using elements represented by tags.

### HTML Document Structure

A basic HTML document has the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pharmacy Medication List</title>
</head>
<body>
  <h1>Pharmacy Medication List</h1>
  <p>Welcome to your medication management system.</p>
</body>
</html>
```

- `<!DOCTYPE html>`: Declares the document type
- `<html>`: The root element
- `<head>`: Contains meta-information about the document
- `<body>`: Contains the visible page content

> 💡 **Deep Dive**: The HTML document structure creates a tree of elements, similar to how React and React Native create a tree of components. This hierarchical approach to UI organization is fundamental to modern frontend development.

### HTML Elements and Tags

HTML elements are defined by tags. Most elements have an opening tag, content, and a closing tag:

```html
<tagname>Content goes here...</tagname>
```

Some elements are self-closing (don't have closing tags):

```html
<input type="text" placeholder="Medication name">
<img src="pill.png" alt="Medication pill">
```

### Common HTML Elements

#### Text Elements

```html
<h1>Pharmacy Dashboard</h1>
<h2>Today's Medications</h2>
<p>You have 3 medications scheduled for today.</p>
<strong>Important:</strong> Take with food.
<em>Side effects may include drowsiness.</em>
```

#### List Elements

```html
<h3>Morning Medications</h3>
<ul>
  <li>Lisinopril 10mg</li>
  <li>Vitamin D 1000IU</li>
</ul>

<h3>Medication Schedule</h3>
<ol>
  <li>Take blood pressure medication</li>
  <li>Wait 30 minutes</li>
  <li>Eat breakfast</li>
  <li>Take remaining morning medications</li>
</ol>
```

#### Links and Navigation

```html
<a href="https://pharmacy.example.com">Visit Our Pharmacy</a>
<a href="refill.html">Request a Refill</a>
<a href="tel:+15555555555">Call Pharmacy: (555) 555-5555</a>
```

> 🔄 **For React Native Developers**: In React Native, navigation is typically handled by a library like React Navigation rather than simple href links.

#### Images

```html
<img src="images/medication.jpg" alt="Prescription bottle">
```

#### Forms and Input

```html
<form action="/submit-prescription" method="post">
  <label for="medication">Medication Name:</label>
  <input type="text" id="medication" name="medication">
  
  <label for="dosage">Dosage:</label>
  <input type="text" id="dosage" name="dosage">
  
  <label for="frequency">Frequency:</label>
  <select id="frequency" name="frequency">
    <option value="daily">Once Daily</option>
    <option value="twice">Twice Daily</option>
    <option value="three">Three Times Daily</option>
  </select>
  
  <input type="submit" value="Submit">
</form>
```

## Semantic HTML

Semantic HTML elements clearly describe their meaning to both the browser and the developer. Using semantic elements improves accessibility, SEO, and code readability.

### Common Semantic Elements

```html
<header>
  <h1>HealthRx Pharmacy</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/medications">Medications</a></li>
      <li><a href="/refills">Refills</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h2>Your Medications</h2>
    <article class="medication">
      <h3>Amoxicillin</h3>
      <p>500mg, 3 times daily</p>
    </article>
    <article class="medication">
      <h3>Lisinopril</h3>
      <p>10mg, once daily</p>
    </article>
  </section>
  
  <aside>
    <h2>Refill Reminders</h2>
    <p>Your Metformin prescription will expire in 5 days.</p>
  </aside>
</main>

<footer>
  <p>&copy; 2023 HealthRx Pharmacy</p>
</footer>
```

> 💡 **Deep Dive**: Semantic HTML is part of a broader concept of separating content from presentation. React Native follows a similar philosophy by separating component structure from styling.

## Tables

Tables are used to display data in rows and columns:

```html
<table>
  <thead>
    <tr>
      <th>Medication</th>
      <th>Dosage</th>
      <th>Frequency</th>
      <th>Next Dose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amoxicillin</td>
      <td>500mg</td>
      <td>Every 8 hours</td>
      <td>2:00 PM</td>
    </tr>
    <tr>
      <td>Lisinopril</td>
      <td>10mg</td>
      <td>Once daily</td>
      <td>8:00 AM</td>
    </tr>
    <tr>
      <td>Metformin</td>
      <td>1000mg</td>
      <td>Twice daily</td>
      <td>6:00 PM</td>
    </tr>
  </tbody>
</table>
```

> 🔄 **For React Native Developers**: React Native doesn't have direct table components, but you can create similar layouts using combinations of `View` and `FlatList` components.

## Div and Span

`<div>` and `<span>` are generic container elements used for grouping and styling:

```html
<div class="medication-card">
  <h3>Amoxicillin</h3>
  <p>Take <span class="highlight">500mg</span> three times daily</p>
</div>
```

- `<div>` is a block-level element (starts on a new line)
- `<span>` is an inline element (stays in the flow of text)

> 🔄 **For React Native Developers**: `<div>` is similar to React Native's `<View>` component, while `<span>` is somewhat similar to `<Text>`. In React Native, all text must be inside a `<Text>` component.

## HTML Attributes

HTML elements can have attributes that provide additional information:

```html
<a href="https://pharmacy.example.com" target="_blank" rel="noopener">Visit Our Pharmacy</a>

<input type="text" placeholder="Enter medication name" disabled>

<button id="refill-btn" class="primary-button" onclick="requestRefill()">Request Refill</button>
```

Common attributes include:
- `id`: Unique identifier
- `class`: Used for styling
- `style`: Inline CSS
- `src`: Source for images, scripts
- `href`: Hyperlink reference
- `alt`: Alternative text for images
- `data-*`: Custom data attributes

## Connection to React Native

HTML concepts have direct parallels in React Native:

| HTML Concept | React Native Equivalent |
|--------------|-------------------------|
| `<div>` | `<View>` |
| `<span>`, `<p>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<Button>`, `<TouchableOpacity>` |
| `<ul>`, `<ol>` | `<FlatList>`, `<SectionList>` |
| `<form>` | Component composition |
| HTML attributes | React props |
| CSS classes | StyleSheet objects |

> 💡 **Deep Dive**: While HTML separates structure (HTML) from presentation (CSS) and behavior (JavaScript), React Native combines these concerns into components. Each component encapsulates its structure, styling, and behavior, following a component-based architecture.

## Exercise: Building a Medication Card in HTML

Using CodePen, create an HTML structure for a medication card component that displays:
- Medication name
- Dosage information
- Schedule/frequency
- Important notes

**CodePen Link**: [Medication Card HTML Exercise](https://codepen.io/your-username/pen/create)

In this exercise, you'll:
1. Create a semantic HTML structure
2. Include all required information
3. Use appropriate HTML elements for each piece of content
4. Add simple attributes (we'll style it in the next section)

> 🚀 **Self-Led Learners**: After creating the HTML structure, think about how you would translate this to React Native components.

## Key Takeaways

- HTML describes the structure and content of web pages
- Semantic HTML improves accessibility and code readability
- HTML elements have direct parallels in React Native components
- Both HTML and React Native organize UI elements in a hierarchical tree
- Understanding HTML concepts provides a foundation for working with React Native 