# Module 10: Styling in React Native

<!-- Optional: Relevant banner image (e.g., abstract graphic related to styling) -->
<!-- ![Styling Banner](./assets/images/module-10/styling-banner.png) -->
<!-- Caption: Visualizing different styling approaches in React Native. -->

Welcome to Module 10, where we'll explore the diverse world of styling in React Native. Effective styling is crucial for creating visually appealing, brand-aligned, and user-friendly mobile applications. This module will equip you with the knowledge and skills to implement various styling strategies, from fundamental `StyleSheet` techniques to advanced theming with UI libraries, all within the context of our SpeedyMeds application.

## Target Audience Adaptation

Styling in React Native draws concepts from web development, particularly CSS, but with its own unique APIs and paradigms.

> 🌐 **(Web Developers):**
>
> **Comparison:** You'll find Flexbox layout very familiar to CSS Flexbox. React Native's `StyleSheet` API will remind you of writing CSS in JavaScript, but with camelCased property names (e.g., `backgroundColor` instead of `background-color`). Concepts like "cascading" don't apply in the same way; styles are typically scoped to components.
>
> **Key Takeaway:** While many CSS concepts apply, React Native uses a JavaScript-based approach (`StyleSheet` or CSS-in-JS libraries) rather than separate CSS files. Style properties are also a subset of what's available on the web.
>
> **Source:** [Style - React Native](https://reactnative.dev/docs/style)

> 🤖 **(Android Developers):**
>
> **Comparison:** Styling in React Native is quite different from XML-based layouts and styles (e.g., `styles.xml`, themes, material design components). Instead of defining styles in XML, you'll use JavaScript objects. Flexbox will be the primary layout mechanism, which differs from ConstraintLayout or LinearLayout.
>
> **Key Takeaway:** Embrace the JavaScript-centric styling and Flexbox for layout. You'll find more dynamic control over styles directly within your component logic.
>
> **Source:** [Layout with Flexbox - React Native](https://reactnative.dev/docs/flexbox)

> 🍏 **(iOS Developers):**
>
> **Comparison:** React Native styling diverges from UIKit's Storyboards, XIBs, or programmatic Auto Layout and UIAppearance. Style definitions live in JavaScript. Flexbox is the layout engine, which has conceptual similarities to Auto Layout but with a different syntax and model.
>
> **Key Takeaway:** Shift from visual tools or Swift/Objective-C styling APIs to JavaScript objects and Flexbox. The direct manipulation of style objects in code offers flexibility.
>
> **Source:** [Layout with Flexbox - React Native](https://reactnative.dev/docs/flexbox)

## Learning Objectives

By the end of this module, you will be able to:

- Describe various styling approaches available in React Native.
- Implement styles using the `StyleSheet` API effectively, adhering to best practices.
- Utilize inline styles and understand their appropriate use cases and limitations.
- Master layout creation and management using Flexbox.
- Integrate and use Styled Components for component-centric styling.
- Implement basic theming concepts using Styled Components.
- Introduce React Native Paper as a UI component library.
- Incorporate and customize React Native Paper components in an application.
- Apply theming to React Native Paper components to match application branding.
- Implement responsive design techniques to adapt UIs to different screen sizes and platforms.

## Prerequisites

Before starting this module, ensure you have completed:

- [Module 7: React Essentials for React Native](../module-07-react-essentials-for-react-native/section-00-introduction.md)
- [Module 8: React Native Core Components](../module-08-react-native-core-components/section-00-introduction.md)

> [!TIP]
> If you have extensive experience with CSS, particularly Flexbox, you may find some layout concepts familiar. However, pay close attention to the React Native-specific `StyleSheet` API, CSS-in-JS libraries, and UI component library integration, as these will be key to building UIs for SpeedyMeds.

---

## Module Sections Overview

This module is divided into the following sections, each building upon the last to provide a comprehensive understanding of styling in React Native:

1.  **Styling Approaches Overview:** A high-level look at `StyleSheet`, inline styles, CSS-in-JS, and UI libraries.
2.  **StyleSheet Deep Dive:** Best practices and performance considerations for `StyleSheet.create()`.
3.  **Inline Styles:** Appropriate usage and limitations of direct style application.
4.  **Layout with Flexbox:** A comprehensive guide to React Native's layout engine.
5.  **Introduction to Styled Components:** Using this popular CSS-in-JS library.
6.  **Theming with Styled Components:** Creating consistent designs with themes.
7.  **Introduction to UI Libraries: React Native Paper:** Leveraging pre-built Material Design components.
8.  **Using React Native Paper Components:** Practical examples of common Paper components.
9.  **Theming with React Native Paper:** Customizing the look and feel of Paper components.
10. **Responsive Design Techniques:** Adapting your UI to various screen sizes and platforms.

## Module Challenge

After completing all sections, you will apply your knowledge in a practical challenge:

**Challenge 10: Style the Prescription Card with Paper and Styled Components**

This challenge involves taking a basic `PrescriptionCard` component (similar to examples seen throughout the module) and applying a comprehensive styling treatment. You will be required to use React Native Paper for some structural elements and theming, and `styled-components` for more granular or custom styling aspects, ensuring the card is visually appealing and responsive.

**(https://snack.expo.dev/@course-materials/module-10-challenge)**

_Detailed requirements and starter code for the challenge are provided within the Expo Snack linked above._

## Module Summary

In this module, we've journeyed through the multifaceted landscape of styling in React Native. We started by understanding the core styling mechanisms: the efficient `StyleSheet` API and the flexible, albeit more cautiously used, inline styles. A significant portion was dedicated to mastering Flexbox, the cornerstone of layout in React Native, enabling you to arrange components with precision and adaptability.

We then explored more advanced and opinionated styling solutions. `styled-components` introduced a component-centric approach with CSS-in-JS, enhancing reusability and enabling powerful prop-based dynamic styles and theming. Building on this, we delved into UI component libraries, focusing on React Native Paper, to leverage pre-built Material Design components for rapid UI development and its own robust theming system. Finally, we tied these concepts together by discussing responsive design techniques, ensuring your applications provide an optimal user experience across a multitude of devices by utilizing the `Dimensions` and `Platform` APIs.

By now, you should be equipped to make informed decisions about which styling strategies to employ for different parts of your SpeedyMeds application, balancing code organization, performance, and development speed to create beautiful and functional user interfaces.

## Additional Resources (Optional)

- [React Native Styling Cheatsheet by Stephen Grider](https://www.sgrider.com/archive/react-native-style-sheet-cheat-sheet/): A handy quick reference for common React Native style properties.
- [Material Design 3 Specification](https://m3.material.io/): For a deeper understanding of the design principles behind React Native Paper v5.
- [Can I use... Support tables for HTML5, CSS3, etc.](https://caniuse.com/): While web-focused, it can be helpful for understanding CSS property support which often informs React Native styling capabilities (though always verify with React Native docs).
