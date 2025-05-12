## Section 1: Core HTML Concepts (Brief Review)

This section provides a high-level overview of fundamental HTML concepts. Understanding how web pages are structured using HTML helps in grasping the analogous component-based structure in React Native.

> [!TIP]
> If you're already comfortable with HTML basics, feel free to skim this section. Pay close attention to the Background Bridge Notes comparing HTML elements to native UI concepts.

### Conceptual Content

#### HTML Document Structure

HTML (HyperText Markup Language) is the standard language for creating web pages. A typical HTML document has a hierarchical structure:

- `<!DOCTYPE html>`: Declares the document type and version (HTML5).
- `<html>`: The root element, enclosing all other content.
- `<head>`: Contains meta-information about the document (title, character set, links to stylesheets, scripts) not displayed directly on the page.
- `<body>`: Contains the visible page content (text, images, links, etc.).

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

This structure provides a logical organization for web content.

#### Common HTML Elements

HTML uses "tags" (like `<p>` for paragraph) to define elements. Here are a few core element types relevant for comparison with React Native:

- **Block-level Elements:** Typically start on a new line and occupy the full available width. Examples:
  - `<div>`: A generic container for grouping content, often used for layout purposes.
  - `<p>`: Represents a paragraph of text.
  - `<h1>` to `<h6>`: Define headings of different levels.
  - `<ul>`, `<ol>`, `<li>`: Create unordered (bulleted) and ordered (numbered) lists, respectively.
- **Inline Elements:** Do not start on a new line and only occupy the width necessary for their content. Examples:
  - `<span>`: A generic inline container, often used for styling specific parts of text.
  - `<a>`: Creates hyperlinks.
  - `<img>`: Embeds images.

#### Semantics

Semantic HTML means using elements that accurately describe their content's meaning, not just their appearance. For example, using `<h1>` for the main page title conveys its importance, whereas just styling a `<div>` to look like a heading does not. While React Native uses different components, the principle of using elements (components) that convey structure and meaning remains important.

> 📲 **(Native Developers):**
>
> **Comparison:** Think of HTML elements like native UI components (e.g., `UIView`/`ViewGroup` in iOS/Android, `UILabel`/`TextView`, `UIImageView`/`ImageView`). `<div>` is similar to a generic container view, while `<p>` is like a text label. The nested structure of HTML resembles the view hierarchy in native development.
>
> **Key Takeaway:** HTML provides a structured way to define UI content, similar to native UI frameworks, but using different element types and terminology.

> 🌐 **(Web Developers):**
>
> **Comparison:** You're familiar with these elements. The key is to start thinking about their _conceptual equivalents_ in React Native. A `<div>` often maps to a `<View>`, `<p>` or `<span>` to `<Text>`, and `<img>` to `<Image>`. The strict parent-child nesting is very similar.
>
> **Key Takeaway:** Your understanding of HTML structure directly translates to understanding React Native component trees, although the specific tags/components differ.

### Next Steps

Now that we've reviewed basic HTML structure, let's move on to the fundamental concepts of styling web content with CSS, focusing on layout.
