## Section 1: Core HTML Concepts (Brief Review)

This section provides a high-level overview of fundamental HTML concepts. Understanding how web pages are structured using HTML helps in grasping the analogous component-based structure in React Native.

> [!TIP]
> If you're already comfortable with HTML basics, feel free to skim this section. Pay close attention to the Background Bridge Notes comparing HTML elements to native UI concepts.

#### A Brief History of HTML

HTML's roots go back to Tim Berners-Lee at CERN in the late 1980s and early 1990s. It evolved through proposals at the IETF and standardization efforts by the W3C (HTML 4.01 in 1999). A move towards stricter XML-based rules (XHTML) was later challenged by a more pragmatic approach from the WHATWG group, formed in 2004. This group drove the development of HTML5 (standardized 2014) and now maintains HTML as a "Living Standard," allowing it to evolve continuously while focusing on backward compatibility and features needed for modern web applications.

#### HTML Document Structure

HTML (HyperText Markup Language) is the standard language for creating web pages. A typical HTML document has a hierarchical structure:

- `<!DOCTYPE html>`: Declares the document type (HTML5) and ensures browsers use standards mode.
- `<html>`: The root element, enclosing all other content. Crucially, specify the document language using the `lang` attribute (e.g., `<html lang="en">`) for accessibility and search engines.
- `<head>`: Contains meta-information about the document (not displayed directly). This includes:
  - `<title>`: The page title shown in the browser tab.
  - `<meta charset="UTF-8">`: Specifies the character encoding.
  - `<link>`: Links to external resources, most commonly CSS stylesheets.
  - `<meta>`: Other metadata for SEO, viewport settings, descriptions, etc.
  - `<script>`: Links to JavaScript files or contains inline script (often placed before the closing `</body>` tag for performance reasons).
- `<body>`: Contains the visible page content (text, images, links, etc.). Only one `<body>` element per document.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <!-- Other meta-information -->
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
    <!-- Other visible content -->
  </body>
</html>
```

This example illustrates the fundamental boilerplate of an HTML5 document, including the `<!DOCTYPE>` declaration, the root `<html>` element with a language attribute, the `<head>` for metadata like the title and character set, and the `<body>` where all visible content resides. This hierarchical structure is foundational to how web pages are organized and later interpreted by browsers to build the DOM.

> 📲 **(Native Developers):**
>
> **Comparison:** HTML's hierarchical structure is conceptually similar to native UI hierarchies like Android's View hierarchy or iOS's UIView hierarchy. The parent-child relationships in HTML (container elements with nested children) parallel how native UI elements are nested within parent containers. The DOM (Document Object Model) is comparable to Android's View tree or iOS's UIView hierarchy in memory.
>
> **Key Takeaway:** HTML's structural patterns will feel familiar if you've worked with native UI hierarchies. Both use tree-like structures where parent elements/views contain and manage child elements/views, forming a complete UI.
>
> **Source:** [Android Developers: View Hierarchy](https://developer.android.com/guide/topics/ui/ui-events.html) / [Apple Developer: UIView](https://developer.apple.com/documentation/uikit/uiview)

#### Semantic HTML: Meaningful Structure

While HTML can structure content using generic container elements like `<div>` (block-level) and `<span>` (inline-level), **semantic HTML** uses elements that convey the meaning or purpose of the content they enclose. Using semantic elements provides significant benefits:

- **Accessibility:** Screen readers can interpret the page structure more effectively, enabling users to navigate by landmarks (e.g., main navigation, articles).
- **SEO:** Search engines better understand content hierarchy, potentially improving rankings.
- **Maintainability:** Code becomes more readable and self-documenting.
- **Browser Functionality:** Browsers might provide optimized default behaviors or styles.

Key semantic structural elements include:

- `<header>`: Introductory content for a page or section (logo, navigation, search).
- `<nav>`: Contains primary navigation links.
- `<main>`: Encloses the dominant, unique content of the page (use only once).
- `<article>`: Represents a self-contained piece of content (e.g., blog post).
- `<section>`: Groups related content, typically with a heading.
- `<aside>`: Contains content tangentially related (e.g., sidebar).
- `<footer>`: Closing content (copyright, contact info).

Choosing the right element focuses on meaning ("What does this content represent?") rather than just appearance. This separation of structure (HTML) from presentation (CSS) is fundamental.

#### Common Content Elements

HTML uses "tags" (like `<p>` for paragraph) to define elements. Here are a few core element types relevant for comparison with React Native:

- **Structure & Grouping:**
  - `<div>`: A generic block-level container for grouping content, often used for layout purposes.
  - `<span>`: A generic inline container, often used for styling specific parts of text.
- **Headings:** `<h1>` to `<h6>` define section headings, establishing a document outline.
- **Text Content:**
  - `<p>`: Represents a paragraph of text.
  - `<em>`: Indicates emphasis (typically italic).
  - `<strong>`: Indicates strong importance (typically bold).
- **Lists:**
  - `<ul>`: Unordered (bulleted) list.
  - `<ol>`: Ordered (numbered) list.
  - `<li>`: List item (used within `<ul>` or `<ol>`).
  - `<dl>`, `<dt>`, `<dd>`: Description list, term, and description.
- **Links:** `<a>` creates hyperlinks using the `href` attribute.
- **Media:** `<img>` embeds images (requires `src` and `alt` attributes).
- **Tables:** `<table>`, `<tr>` (row), `<th>` (header cell), `<td>` (data cell). Use `<thead>`, `<tbody>`, `<tfoot>`, `<caption>` for better structure. Tables are for tabular data, not page layout.
- **Forms:** `<form>` contains interactive controls. Common elements include `<input>` (various types like `text`, `password`, `checkbox`, `radio`, `submit`), `<textarea>`, `<select>`, `<option>`, `<button>`, and `<label>` (essential for accessibility).

#### Under the Hood: HTML Parsing and the DOM

When a browser receives an HTML document, it parses the markup to understand and render it:

1.  **Tokenization:** The browser reads the raw HTML bytes, converts them to characters, and then breaks them down into recognized units called tokens (e.g., start tags like `<p>`, end tags like `</p>`, attribute names, attribute values, text content).
2.  **Tree Construction (DOM):** These tokens are processed to build a tree-like data structure in memory called the **Document Object Model (DOM)**. Each HTML element becomes an object (a node) in this tree, preserving the parent-child and sibling relationships defined in the markup. Text within elements also becomes text nodes. The DOM is the browser's live representation of the page structure, which CSS uses for styling and JavaScript interacts with for dynamic behavior.

> 📚 **Official Documentation:**
>
> - [MDN Web Docs: HTML (HyperText Markup Language)](https://developer.mozilla.org/en-US/docs/Web/HTML)
> - [MDN Web Docs: HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
> - [MDN Web Docs: Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
> - [MDN Web Docs: Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
> - [MDN Web Docs: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

### Next Steps

Now that we've reviewed basic HTML structure, let's move on to the fundamental concepts of styling web content with CSS, focusing on layout.
