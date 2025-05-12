Module 4: Web Development Essentials Refresher
I. Introduction: Laying the Foundation for React Native UI
Welcome to Module 4, designed as an essential refresher on the core web development technologies that underpin the user interface (UI) layer of React Native applications: HyperText Markup Language (HTML) and Cascading Style Sheets (CSS). While React Native utilizes JavaScript for its styling and structure definition (JSX), a solid understanding of HTML's structural concepts and CSS's styling and layout principles is invaluable. Many concepts, particularly around layout with Flexbox, translate directly, while others provide crucial background context for understanding how UIs are built and rendered.
This module revisits the fundamentals, assuming varying levels of prior web development experience among learners. The goal is to establish a common ground, ensuring everyone possesses the foundational knowledge needed to effectively build and style components in React Native. We will explore the "what" and the "why" behind HTML structure and CSS styling, delve into how browsers process these technologies, and explicitly bridge this knowledge to the React Native environment. Key concepts include semantic HTML for meaningful structure, CSS selectors for targeting elements, the cascade and specificity for managing styles, the box model for understanding element space, and Flexbox for modern layout. By refreshing these essentials, learners will be better equipped to grasp React Native's UI paradigms, write cleaner code, and debug layout and style issues more effectively.
II. Core Web Technologies Refresher
A. HTML: Structuring Web Content
HyperText Markup Language (HTML) is the fundamental building block of the World Wide Web, defining the meaning and structure of web content.1 It provides the skeleton upon which styling (CSS) and interactivity (JavaScript) are applied.

1. A Brief History: From CERN to WHATWG
   The origins of HTML trace back to 1980 with Tim Berners-Lee's ENQUIRE prototype at CERN, evolving into a proposal for an Internet-based hypertext system in 1989.2 Berners-Lee specified the initial HTML and developed the first browser and server software in late 1990.2
   The first official proposal emerged in mid-1993 as an Internet Draft by the Internet Engineering Task Force (IETF).2 Early development saw competing proposals and rapid evolution, with additions like forms, tables, and image maps introduced via supplemental RFCs.2
   Standardization efforts shifted to the World Wide Web Consortium (W3C), founded by Berners-Lee in 1994.3 The W3C published HTML 3.2 in 1997 and HTML 4.01 in late 1999.2
   A parallel effort, XHTML, aimed to reformulate HTML using the stricter rules of XML, beginning in 2000.2 However, its rigidity led some browser vendors and developers to form the Web Hypertext Application Technology Working Group (WHATWG) in 2004, focusing on evolving HTML more pragmatically.3
   WHATWG began work on HTML5, which eventually became a joint effort with the W3C and was standardized in 2014.2 Today, HTML is maintained by WHATWG as a "Living Standard," continuously evolving.2 This shift reflects a move towards a more practical, developer-driven evolution of the language, focusing on adding features needed for modern web applications while maintaining backward compatibility.
2. Basic Document Structure
Every HTML document follows a fundamental structure. It begins with a <!DOCTYPE html> declaration, a historical artifact that ensures browsers render the page in standards mode.4
The root element is <html>, which contains all other elements. It's crucial to declare the document's language using the lang attribute (e.g., <html lang="en">) for accessibility and search engines.4
Inside <html>, there are two main sections:
<head>: Contains metadata about the document, not displayed directly on the page. This includes the document <title> (shown in the browser tab), links to CSS stylesheets (<link>), links to favicons, character set definitions (<meta charset="UTF-8">), and other metadata (<meta>) for SEO or social media.4
<body>: Contains the actual content of the page that is displayed to the user, such as text, images, links, tables, and lists.5 Only one <body> element is permitted per document.6
3. Semantic HTML: Meaningful Structure
While HTML can structure content using generic container elements like <div> (block-level) and <span> (inline-level), semantic HTML uses elements that convey the meaning or purpose of the content they enclose.7
Using semantic elements provides significant benefits 7:
Accessibility: Screen readers and other assistive technologies can interpret the page structure more effectively, enabling users to navigate based on landmarks (e.g., "find the main navigation").8
SEO: Search engines can better understand the content hierarchy and importance, potentially improving search rankings.7
Maintainability: Code becomes more readable and easier to understand for developers, as the tags themselves describe the type of content.7
Browser Functionality: Browsers may provide default behaviors or styles optimized for certain semantic elements.
Key semantic structural elements include 6:
<header>: Introductory content for a page or section (logo, navigation, search).
<nav>: Contains primary navigation links.
<main>: Encloses the dominant, unique content of the page. Use only once per page, directly inside <body>.
<article>: Represents a self-contained piece of content (e.g., blog post, news story) that could stand alone.
<section>: Groups related content, typically with a heading; represents a thematic grouping within a page or article.
<aside>: Contains content tangentially related to the main content (e.g., sidebar, glossary).
<footer>: Closing content for a page or section (copyright, contact info, related links).
Choosing the right element involves considering the meaning of the content ("What element best describes this data?") rather than its default appearance.7 This practice of separating structure (HTML) from presentation (CSS) is a cornerstone of modern web development.
4. Common Content Elements
   Beyond structural semantics, HTML provides numerous elements for marking up specific types of content 1:
   Headings: <h1> to <h6> define section headings, with <h1> being the highest level.6 They create a document outline.
   Paragraphs: <p> represents a paragraph of text.
   Lists: <ul> (unordered list, bullet points), <ol> (ordered list, numbered), <li> (list item within <ul> or <ol>), <dl> (description list), <dt> (term), <dd> (description).5
   Links (Anchors): <a> creates hyperlinks using the href attribute to specify the destination URL.4 Link text should be descriptive.4
   Images: <img> embeds images, requiring src (source URL) and alt (alternative text for accessibility) attributes. It's a void/empty element (no closing tag).4
   Emphasis/Importance: <em> (emphasis, typically italic), <strong> (strong importance, typically bold).5 Use these for semantic meaning, not just visual styling.
   Tables: <table> for tabular data, <tr> (table row), <th> (table header cell), <td> (table data cell). Use <thead>, <tbody>, <tfoot>, and <caption> for better structure and accessibility.4 Tables should be used for data, not page layout.4
   Forms: <form> contains interactive controls for submitting data. Common elements include <input> (various types like text, password, checkbox, radio, submit 1), <textarea>, <select>, <option>, <button>, and <label> (associates text with a control for accessibility).4
5. Under the Hood: HTML Parsing and the DOM
   When a browser receives an HTML document, it begins parsing the markup.9
   Tokenization: The raw bytes are converted into characters, then into tokens (e.g., start tags like <p>, end tags like </p>, attribute names, attribute values, text content).10
   Tree Construction (DOM): These tokens are used to build a tree-like data structure called the Document Object Model (DOM).9 Each HTML element, attribute, and piece of text becomes a node in this tree, representing the document's structure and relationships (parent, child, sibling) in memory.9 The DOM is the browser's internal representation of the page, which CSS and JavaScript can interact with. Parsing can trigger further requests, such as for linked CSS files or images.9 An Accessibility Tree is also constructed based on the DOM for assistive technologies.9
   B. CSS: Styling the Web
   Cascading Style Sheets (CSS) is the language used to describe the presentation (appearance and layout) of HTML documents.1 It allows developers to separate content structure (HTML) from visual design, leading to more maintainable and flexible websites.
6. A Brief History: Separating Style from Structure
   In the early web, styling was often mixed directly with HTML using presentational tags (like <font>, now deprecated 1) or attributes. This made consistent styling and site-wide changes difficult.
   CSS was first proposed by Håkon Wium Lie at CERN in 1994 to address this.11 The goal was to provide a separate language for styling, allowing designers more control and enabling documents to be presented differently across various media.
   CSS Level 1 (CSS1) became a W3C Recommendation in December 1996, developed jointly by Lie and Bert Bos.11 It introduced fundamental properties for fonts, colors, margins, borders, and basic selectors.
   CSS Level 2 (CSS2), released in 1998, added capabilities like positioning, z-index, media types (for print, screen, etc.), and more advanced selectors.11
   CSS Level 3 (CSS3), starting around 1999 and evolving continuously since, took a modular approach.11 Instead of a single large specification, CSS3 is broken down into smaller modules (e.g., Selectors, Box Model, Backgrounds and Borders, Flexbox, Grid), allowing different parts to evolve independently. This modularity has enabled faster standardization and adoption of new features like transitions, animations, gradients, responsive design capabilities (media queries), and advanced layout systems.11 The W3C continues to maintain and develop CSS standards.2
7. Selectors and Basic Syntax
   A CSS rule consists of a selector and a declaration block.11 The selector defines which HTML element(s) the rule applies to, and the declaration block (enclosed in curly braces {}) contains one or more declarations.11 Each declaration is a property-value pair (e.g., color: blue;), separated by a colon, and ending with a semicolon.11
   Selectors are patterns that match elements in the DOM. Common types include:
   Type Selector: Matches elements by tag name (e.g., p selects all <p> elements).13
   Class Selector: Matches elements with a specific class attribute value, prefixed with a period (.) (e.g., .highlight selects <p class="highlight">).14
   ID Selector: Matches an element with a specific id attribute value, prefixed with a hash (#) (e.g., #main-nav selects <nav id="main-nav">). An ID should be unique within a document.14
   Attribute Selector: Matches elements based on the presence or value of an attribute (e.g., input[type="text"] selects text input fields).15
   Universal Selector: Matches any element, denoted by an asterisk (\*).14
   Combinators define relationships between selectors:
   Descendant Combinator (space): Selects elements that are descendants of another element (e.g., article p selects all <p> inside an <article>).14
   Child Combinator (>): Selects elements that are direct children of another element (e.g., ul > li selects <li> elements directly inside a <ul>).14
   Adjacent Sibling Combinator (+): Selects an element immediately preceded by another element (e.g., h2 + p selects the first <p> right after an <h2>).
   General Sibling Combinator (~): Selects elements preceded by another element, sharing the same parent (e.g., h2 ~ p selects all <p> elements that follow an <h2> within the same parent).14
   Pseudo-classes select elements based on state or characteristics not reflected in the DOM structure (e.g., :hover, :focus, :nth-child()).4
   Pseudo-elements select and style a specific part of an element (e.g., ::before, ::after, ::first-line).15
8. Under the Hood: The Cascade Algorithm
   The "Cascading" in CSS refers to the algorithm browsers use to resolve conflicts when multiple rules target the same element and property.16 Understanding this process is key to predicting which styles will ultimately be applied.
   Styles originate from different sources 16:
   User-agent Stylesheets: Default styles provided by the browser itself.
   User Stylesheets: Custom styles applied by the browser user (often for accessibility).
   Author Stylesheets: Styles written by the web developer (the most common source).
   The cascade assigns precedence based on origin and importance (the !important flag). The simplified order of precedence (from lowest to highest) is generally 16:
   User-agent normal styles
   User normal styles
   Author normal styles
   CSS Animations (@keyframes)
   Author !important styles
   User !important styles
   User-agent !important styles
   CSS Transitions
   This order means author styles override browser defaults, but user !important styles can override author !important styles.16 This hierarchy reflects a deliberate design choice: developers control the general presentation, but users retain ultimate control, especially for accessibility needs (e.g., enforcing larger font sizes or specific color contrasts via user !important styles). The browser's own crucial overrides (like display: none!important) have the highest precedence among !important declarations from stylesheets. Transitions and animations operate slightly differently, applying dynamically over other defined styles.
   Crucially, the browser considers origin and importance before looking at selector specificity.16 A rule from a higher-precedence origin (like an author style) will always win over a rule from a lower-precedence origin (like a user-agent style), regardless of the selectors' specificity.
9. Winning the Style War: Understanding Specificity
   When multiple rules from the same origin and importance level apply to the same element and property, specificity determines which rule wins.16 Specificity is a weight calculated based on the components of the selector.15
   The calculation can be visualized using columns (or categories): Inline Styles, IDs, Classes/Attributes/Pseudo-classes, Type/Pseudo-elements.18
   Inline Styles: Styles applied directly via the style attribute have the highest specificity (conceptually 1-0-0-0).18
   IDs: Each ID selector (#myId) contributes to the ID column.15
   Classes, Attributes, Pseudo-classes: Each class (.myClass), attribute selector ([type="text"]), or pseudo-class (:hover) contributes to the Class column.15
   Type, Pseudo-elements: Each type selector (div) or pseudo-element (::before) contributes to the Type column.15
   The universal selector (\*), combinators (>, +, ~, space), and the :where() pseudo-class contribute zero specificity.15 Selectors inside negation pseudo-classes like :not() do contribute to specificity.15
   To compare specificities, compare the columns from left to right (Inline > ID > Class > Type). The selector with the higher value in the most significant column wins.18 For example, a selector with one ID (0-1-0-0) is more specific than a selector with ten classes (0-0-10-0).
   If two selectors have the exact same specificity, the rule that appears last in the CSS source order wins.16
   The !important flag overrides specificity calculations entirely within its origin level.15 However, overuse of !important is discouraged as it breaks the natural cascade and makes debugging significantly harder.15 It should generally be reserved for specific overrides, like user styles or temporarily debugging.
   Table: CSS Specificity Calculation Examples
   Selector Type
   Specificity Value (Conceptual)
   Example Selector
   Calculated Value (ID-Class-Type)
   Inline Style
   1-0-0-0
   style="..."
   (Highest - treated separately)
   ID
   0-1-0-0
   #myId
   1-0-0
   Class
   0-0-1-0
   .myClass
   0-1-0
   Attribute
   0-0-1-0
   [type="text"]
   0-1-0
   Pseudo-class
   0-0-1-0
   :hover
   0-1-0
   Type
   0-0-0-1
   div
   0-0-1
   Pseudo-element
   0-0-0-1
   ::before
   0-0-1
   Complex

- nav#mainNav > ul.navList li a:hover
  1-2-3
  Universal / Combinators
  0-0-0-0
  \*, >, +, ~,
  (Add no value)
  :where() Exception
  0-0-0-0
  :where(.someClass)
  (Always zero)

  _Note: The table uses a simplified 3-column (ID-Class-Type) representation for comparing stylesheet rules, excluding the implicit highest weight of inline styles._

5. The CSS Box Model: Defining Space and Borders
   Every element rendered by a browser is treated as a rectangular box.19 The CSS Box Model describes how the dimensions (width, height), padding, border, and margin of an element interact to determine the space it occupies on the page.19
   The model consists of concentric layers 19:
   Content Box: The area where the actual content (text, images) resides. Its dimensions can be explicitly set using width and height.
   Padding Box: Optional transparent space surrounding the content area. Controlled by padding properties (e.g., padding-top, padding-left).
   Border Box: Optional line surrounding the padding box. Controlled by border properties (e.g., border-width, border-style, border-color).
   Margin Box: Optional transparent space surrounding the border box. It separates the element from its neighbors. Controlled by margin properties (e.g., margin-bottom, margin-right).
   By default, CSS uses the standard box model (box-sizing: content-box). In this model, the width and height properties apply only to the content box. The total space occupied by the element is the sum of the content dimensions plus any padding and border.19 For example, an element with width: 100px; padding: 10px; border: 1px; would actually take up 100 + 10 + 10 + 1 + 1 = 122px horizontally.
   An alternative, often more intuitive model is activated by setting box-sizing: border-box. In this model, the width and height properties define the dimensions of the area including the content, padding, and border.20 The content area shrinks to accommodate padding and borders. This makes it easier to size elements predictably, as the specified width/height represents the final visible size.
   Margin Collapsing: A behavior where the vertical margins (top/bottom) of adjacent block-level boxes combine (collapse) into a single margin, whose size is typically the larger of the two collapsing margins. This happens only in the vertical direction and under specific conditions.19
6. Arranging Elements: Introduction to CSS Flexbox
   CSS Flexible Box Layout, or Flexbox, is a powerful one-dimensional layout model designed to provide a more efficient way to distribute space among items in a container and align them, even when their size is unknown or dynamic.21 It excels at arranging items in a single row or column.
   Flexbox is activated by setting the display property of a container element to flex or inline-flex.21
   Core Concepts 21:
   Flex Container: The parent element with display: flex.
   Flex Items: The direct children of the flex container.
   Axes: Flexbox layout is based on two axes:
   Main Axis: The primary axis along which flex items are laid out. Its direction is defined by the flex-direction property (row (default), column, row-reverse, column-reverse).
   Cross Axis: The axis perpendicular to the main axis.
   Key Properties for Alignment and Distribution 21:
   flex-direction: Defines the main axis (row or column) and direction.
   justify-content: Aligns flex items along the main axis within the container (e.g., flex-start, flex-end, center, space-between, space-around, space-evenly).
   align-items: Aligns flex items along the cross axis within their line (e.g., stretch (default), flex-start, flex-end, center, baseline).
   align-self: Allows individual flex items to override the container's align-items value.
   flex-wrap: Controls whether flex items wrap onto multiple lines (nowrap (default), wrap, wrap-reverse).
   align-content: Aligns the lines of items along the cross axis when there are multiple lines (due to flex-wrap: wrap). Only effective when items wrap.
   Flexibility Properties 21:
   flex-grow: Dictates how much an item grows relative to others if there's extra space.
   flex-shrink: Dictates how much an item shrinks relative to others if there isn't enough space.
   flex-basis: Defines the default size of an item before remaining space is distributed.
   flex: A shorthand for flex-grow, flex-shrink, and flex-basis.
   Flexbox represented a significant advancement over older layout techniques like floats or relying on tables for non-tabular layout.4 It provided developers with simpler, more robust tools specifically designed for building application UIs, making tasks like vertical centering or equal-height columns trivial compared to previous methods.21 Its focus on space distribution and alignment along axes makes it highly suitable for responsive design.
   Table: Common CSS Flexbox Alignment Properties
   Property
   Controls Alignment/Distribution On
   Key Values
   Effect
   flex-direction
   Main Axis Direction
   row, column, row-reverse, column-reverse
   Sets the flow direction of items. Default: row.
   justify-content
   Main Axis
   flex-start, flex-end, center, space-between, space-around, space-evenly
   Distributes space between/around items along the main axis. Default: flex-start.
   align-items
   Cross Axis (single line)
   stretch, flex-start, flex-end, center, baseline
   Aligns items along the cross axis within their line. Default: stretch.
   align-content
   Cross Axis (multiple lines)
   stretch, flex-start, flex-end, center, space-between, space-around
   Distributes space between lines along the cross axis (requires flex-wrap: wrap). Default: stretch.
   align-self
   Cross Axis (single item)
   auto, stretch, flex-start, flex-end, center, baseline
   Overrides the container's align-items for an individual flex item. Default: auto.
   flex-wrap
   Item Wrapping
   nowrap, wrap, wrap-reverse
   Controls if items wrap onto new lines. Default: nowrap.

7. Under the Hood: How Browsers Apply CSS
   After parsing HTML into the DOM, the browser processes CSS to apply styles.9 Different browser rendering engines (like Blink/Chromium, Gecko/Firefox, WebKit/Safari) handle this, but follow standard processes.25
   Fetch & Parse CSS: The browser fetches CSS from <link> tags, <style> blocks, or inline style attributes.9 The raw CSS text is then parsed:
   Tokenization: Broken into meaningful units (selectors, properties, values, braces, etc.).25
   CSSOM Construction: Tokens are structured into the CSS Object Model (CSSOM), a tree representing selectors and their corresponding styles.26
   Style Calculation: The browser combines the DOM and CSSOM trees. For each element in the DOM, it determines the final set of computed CSS properties by applying the cascade rules (origin, importance), specificity, and inheritance (where properties not directly set on an element are inherited from its parent).15 Relative units (like em, %) are converted to absolute pixel values.26
   Render Tree Construction: A new tree, the Render Tree (or Layout Tree), is created. It includes only the elements that will actually be displayed (e.g., elements with display: none are omitted) along with their computed styles.9
   Layout (Reflow): The browser calculates the exact geometric information (size and position) for each node in the Render Tree within the viewport.10 This involves determining where each box should appear based on the box model, positioning schemes, and layout modes like Flexbox.
   Painting: The browser traverses the Render Tree and "paints" the pixels for each visible element onto the screen, layer by layer. This includes drawing text, colors, borders, shadows, images, etc..10
   Compositing: If elements were painted onto separate layers (often done for performance optimization, especially with transforms or opacity), the browser combines these layers into the final image displayed on the screen.10 Changes that affect layout (like modifying dimensions) can trigger a reflow and repaint, while changes affecting only appearance (like color) might only trigger a repaint, which is generally faster.26
   C. Bridge Notes: Styling in React Native
   Understanding HTML structure and CSS styling/layout provides a strong foundation for working with React Native's UI system, although there are key differences and direct translations.
   StyleSheet API: React Native uses JavaScript to define styles, primarily through the StyleSheet.create method. This API creates optimized style objects that are sent over the native bridge efficiently.
   JavaScript
   import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
container: {
flex: 1, // Use Flexbox
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
text: {
color: 'blue',
fontSize: 18, // Numbers often assume pixels
fontWeight: 'bold', // String values for keywords
marginVertical: 10, // Specific properties like marginVertical exist
},
});

function MyComponent() {
return (
<View style={styles.container}>
<Text style={styles.text}>Hello, React Native!</Text>
</View>
);
}

Property Mapping: Many CSS properties have direct equivalents in React Native, but naming conventions differ:
Properties are written in camelCase (e.g., background-color becomes backgroundColor, font-size becomes fontSize).
Values are often numbers (pixels are the assumed unit for dimensions, padding, margin, font sizes) or strings (for colors, keywords like 'bold', 'center', or percentage values like '50%'). Unitless numbers are used for properties like lineHeight or flex.
CSS Subset: React Native implements a subset of CSS properties, primarily focusing on layout, text styling, colors, and transformations. Not all web CSS properties (especially complex pseudo-selectors or some advanced layout features beyond Flexbox) are available.
Flexbox is Default: Crucially, Flexbox is the default and primary layout system in React Native. All <View> components behave like flex containers by default. This choice was made because Flexbox's model for distributing space and aligning items works consistently and effectively across different screen sizes and platforms (iOS, Android), simplifying the challenge of cross-platform UI development compared to relying on platform-specific or traditional web layout systems.21 Key differences from web Flexbox include:
flexDirection defaults to 'column' instead of 'row'.
alignItems defaults to 'stretch'.
flex: 1 is commonly used on a container to make it fill available space along the main axis.
Properties like justifyContent, alignItems, alignSelf, flexWrap, flexGrow, flexShrink, flexBasis work similarly to their web counterparts.
No Cascade/Specificity (Mostly): React Native does not implement the full CSS cascade or specificity rules in the same way as browsers. Styles are typically applied directly to components via the style prop. Style resolution is simpler: styles passed directly to a component generally override styles inherited or defined earlier. Inline styles (style={{...}}) are common and performant. This approach aligns better with the component-based architecture of React and avoids the complexity and potential performance overhead of implementing a full CSS engine in a non-browser environment.
Table: Mapping Common Web CSS to React Native Styles
Web CSS Property
React Native Style Property
Value Example (Web)
Value Example (RN)
Notes
background-color
backgroundColor
#FF0000 / red
'#FF0000' / 'red'
String values.
color
color
blue
'blue'
String values.
font-size
fontSize
16px / 1.2em
16
Number (pixels assumed).
font-weight
fontWeight
bold / 700
'bold' / '700'
String values (keywords or numeric strings).
margin
margin, marginTop, marginLeft, marginVertical, marginHorizontal
10px / 5%
10 / '5%' / { marginTop: 10 }
Number (pixels), percentage string, or specific props.
padding
padding, paddingTop, paddingLeft, paddingVertical, paddingHorizontal
10px
10 / { paddingTop: 10 }
Number (pixels) or specific props.
border
borderWidth, borderColor, borderStyle, borderRadius
1px solid black
borderWidth: 1, borderColor: 'black'
Shorthand split; borderRadius added.
width / height
width / height
100px / 50%
100 / '50%'
Number (pixels) or percentage string.
display: flex;
(Default Behavior)
display: flex;
(Implicit on <View>)
Flexbox is default in RN for <View>.
flex-direction
flexDirection
row
'column' (default), 'row'
Default differs from web.
justify-content
justifyContent
center
'center'
Same values as web.
align-items
alignItems
center
'center' / 'stretch' (default)
Same values as web.

III. Conclusion: Reinforcing Core Concepts and Their Application in React Native
This module revisited the foundational pillars of web front-end development: HTML for structure and CSS for styling and layout. Key takeaways include the importance of using semantic HTML to create meaningful, accessible, and maintainable document structures 7, and the power of CSS to separate presentation concerns from content.1
We explored the mechanisms browsers use to apply styles, including the Cascade algorithm that prioritizes styles based on origin and importance 16, and the Specificity rules that resolve conflicts between competing selectors within the same origin.15 Understanding the CSS Box Model is crucial for managing element dimensions, padding, borders, and margins.19 Furthermore, proficiency in CSS Flexbox is essential, as it provides a robust system for one-dimensional layout and alignment.21
These web concepts directly inform and underpin UI development in React Native. While React Native employs JavaScript (StyleSheet) for styling and JSX for structure, the underlying principles remain highly relevant. JSX structure mirrors HTML's element hierarchy, StyleSheet properties often map directly (albeit with camelCase naming) to CSS properties, and most importantly, Flexbox serves as the default layout engine in React Native. Although React Native simplifies style application by largely omitting the complex cascade and specificity rules of web CSS, a firm grasp of the original concepts—especially Flexbox and the box model—is indispensable for building sophisticated, responsive, and maintainable user interfaces in the React Native ecosystem.
Learners are encouraged to experiment with these HTML and CSS concepts, perhaps using online playgrounds like CodePen or JSFiddle for web practice, and then consciously apply the translated principles (particularly Flexbox layout) within their React Native projects. Continued reference to authoritative resources like the MDN Web Docs (links provided in the Appendix) will further solidify understanding and mastery.
Appendix
Glossary of Key HTML & CSS Terms
Block-level Element: An HTML element that typically starts on a new line and occupies the full width available to it (e.g., <div>, <p>, <h1>, <header>).1
Box Model: The CSS model describing how elements are rendered as rectangular boxes with layers: content, padding, border, and margin.19
Cascade: The CSS algorithm that determines how property values from different sources (user-agent, user, author) and importance levels (!important) are combined, defining precedence.16
CSSOM (CSS Object Model): A tree-like structure representing the parsed CSS stylesheets, similar to the DOM for HTML.26
DOM (Document Object Model): A programming interface for HTML documents. It represents the page structure as a tree of objects that can be manipulated by scripting languages like JavaScript.9
Flex Container: The parent element on which display: flex or display: inline-flex is applied.21
Flex Item: A direct child element of a flex container.21
Flexbox (Flexible Box Layout): A CSS layout module designed for arranging items in one dimension (a row or a column), providing powerful alignment and space distribution capabilities.21
Inline-level Element: An HTML element that does not start on a new line and only occupies the width required by its content (e.g., <span>, <a>, <img>, <strong>).1
Main Axis: In Flexbox, the primary axis along which flex items are laid out (determined by flex-direction).21
Cross Axis: In Flexbox, the axis perpendicular to the main axis.21
Semantic HTML: Using HTML elements according to their meaning and purpose, rather than just for presentation (e.g., using <nav> for navigation instead of a generic <div>).7
Selector: A CSS pattern used to identify the HTML element(s) to which a set of style rules should apply.13
Specificity: The algorithm used by browsers to determine which CSS rule applies if multiple rules with the same origin and importance target the same element. Calculated based on the types of selectors used (ID, class, type).15
Consolidated Links to Key MDN Documentation
HTML Basics:
HTML (HyperText Markup Language):(https://developer.mozilla.org/en-US/docs/Web/HTML) 1
HTML Element Reference:(https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) 6
Introduction to HTML:(https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) 5
Document and website structure:(https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents) 8
Semantic HTML Guide:(https://developer.mozilla.org/en-US/curriculum/core/semantic-html/) 4
Semantics Glossary:(https://developer.mozilla.org/en-US/docs/Glossary/Semantics) 7
CSS Basics:
CSS Selectors:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators) 14
Basic Selectors:(https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors) 13
The Cascade:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade) 16
Specificity:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity) 18
Introduction to the CSS Box Model:(https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model) 19
CSS Box Model Module:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model) 20
CSS Flexbox:
CSS Flexible Box Layout:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) 21
Basic Concepts of Flexbox:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) 22
Aligning Items in a Flex Container:(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container) 24
Browser Rendering:
How Browsers Work (High-Level):(https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites) 9
Works cited
HTML: HyperText Markup Language - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/HTML
HTML - Wikipedia, accessed May 12, 2025, https://en.wikipedia.org/wiki/HTML
HTML history: Milestones in the web markup language - Content Snare, accessed May 12, 2025, https://contentsnare.com/html-history/ 2. Semantic HTML | MDN Curriculum, accessed May 12, 2025, https://developer.mozilla.org/en-US/curriculum/core/semantic-html/
Structuring content with HTML - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content
HTML elements reference - HTML: HyperText Markup Language - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements
Semantics - MDN Web Docs Glossary: Definitions of Web-related terms, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Glossary/Semantics
Structuring documents - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents
How browsers load websites - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites
How Your Browser Renders the Screen: A High-Level Understanding. - Yash Thakur, accessed May 12, 2025, https://yashthakur.hashnode.dev/how-your-browser-renders-the-screen-a-high-level-understanding
CSS | Definition, History, & Facts | Britannica, accessed May 12, 2025, https://www.britannica.com/technology/CSS-programming-language
CSS history - W3C, accessed May 12, 2025, https://www.w3.org/Style/CSS/history.html
Basic CSS selectors - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors
CSS selectors and combinators - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators
Specificity - CSS: Cascading Style Sheets - UDN Web Docs: MDN Backup, accessed May 12, 2025, https://udn.realityripple.com/docs/Web/CSS/Specificity
Introducing the CSS Cascade - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade
Cascade - CSS | MDN - DevDoc, accessed May 12, 2025, https://www.devdoc.net/web/developer.mozilla.org/en-US/docs/Web/CSS/Cascade.html
Specificity - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity
The box model - Learn web development | MDN, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model
CSS box model - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model
CSS flexible box layout - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
Basic concepts of flexbox - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
An Introduction to CSS Layout Algorithms - Integral.io, accessed May 12, 2025, https://integral.io/insights/blog/an-introduction-to-css-layout-algorithms/
Aligning items in a flex container - CSS: Cascading Style Sheets - MDN Web Docs, accessed May 12, 2025, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container
How do browsers read and interpret CSS? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/3527800/how-do-browsers-read-and-interpret-css
How Browsers Parse & Render CSS: What You Need to Know - DEV Community, accessed May 12, 2025, https://dev.to/javascriptwizzard/how-browsers-parse-render-css-what-you-need-to-know-3029
