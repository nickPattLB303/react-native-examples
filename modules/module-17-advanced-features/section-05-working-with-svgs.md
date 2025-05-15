## Section 5: Working with SVGs (`react-native-svg`)

This section covers how to incorporate Scalable Vector Graphics (SVGs) into your React Native applications using the `react-native-svg` library. SVGs are an excellent choice for icons, logos, and simple illustrations because they are resolution-independent and can be scaled without loss of quality.

### Conceptual Content

**What are SVGs?**

SVG stands for Scalable Vector Graphics. Unlike raster graphics (like PNGs or JPEGs) which are made up of pixels, SVGs are XML-based markup that describe two-dimensional vector graphics. This means they define graphics as a set of points, lines, curves, and shapes. Because they are vector-based, SVGs can be scaled to any size without becoming pixelated or blurry, making them ideal for applications that need to support various screen densities and sizes.

**Benefits of Using SVGs:**

- **Scalability:** Perfect rendering at any size and resolution.
- **Small File Size:** SVGs, especially for simpler graphics, can often have smaller file sizes compared to their raster counterparts.
- **Manipulability:** SVG properties (like color, stroke, opacity) can be manipulated through code, allowing for dynamic icons or themed graphics.
- **Accessibility:** SVGs can include text alternatives and semantic information, improving accessibility.
- **Widely Supported:** It's a web standard, and `react-native-svg` brings this power to React Native.

**`react-native-svg` Library**

`react-native-svg` is the de facto library for using SVGs in React Native. It provides React components that map to SVG elements (e.g., `<Svg>`, `<Path>`, `<Circle>`, `<Rect>`), allowing you to render SVG images directly within your application.

**Installation and Setup**

In an Expo project, `react-native-svg` is typically very easy to install:

1.  **Install the library:**

    ```bash
    npx expo install react-native-svg
    ```

    Expo's `install` command will ensure that a compatible version of the library is installed and linked correctly for your Expo SDK version.

No further Babel or native configuration is usually required for basic usage in Expo-managed projects.

### Referential Content

`react-native-svg` allows you to render SVGs in a few ways:

1.  **Inline SVG XML:** You can embed SVG elements directly as JSX components.
2.  **Loading from a `.svg` file (via an asset or URI):** While direct file loading requires some setup or using a helper, a common approach is to convert `.svg` files into React Native components, either manually or using tools.
3.  **Using `SvgUri` or `SvgXml` components:** For loading SVGs from a remote URL or an XML string respectively.

**Common `react-native-svg` Components:**

- **`<Svg>`:** The root component for any SVG graphic. It defines the viewport for the SVG.
  - Props: `width`, `height`, `viewBox` (defines the internal coordinate system and aspect ratio).
- **Shape Components:**
  - **`<Path d="..." />`:** Defines a path using SVG path data. This is one of the most versatile elements, capable of drawing complex shapes.
  - **`<Circle cx="..." cy="..." r="..." />`:** Draws a circle.
  - **`<Rect x="..." y="..." width="..." height="..." />`:** Draws a rectangle.
  - **`<Line x1="..." y1="..." x2="..." y2="..." />`:** Draws a line.
  - **`<Polygon points="..." />`:** Draws a shape with straight lines connecting a series of points.
  - **`<Polyline points="..." />`:** Similar to Polygon, but the path doesn't automatically close.
  - **`<Ellipse cx="..." cy="..." rx="..." ry="..." />`:** Draws an ellipse.
- **Text Component:**
  - **`<Text x="..." y="..." />`:** Renders text within an SVG. Note this is `Svg.Text`, not `ReactNative.Text`.
  - **`<TSpan>`:** Used inside `<Text>` for more control over parts of the text.
- **Grouping and Definition Components:**
  - **`<G>`:** Used to group multiple SVG elements together. Transformations applied to a `<G>` element affect all its children.
  - **`<Defs>`:** Used to define reusable elements like gradients, patterns, or symbols that can be referenced by other SVG elements.
  - **`<Use href="#id" />` or `xlinkHref="#id"`:** Allows you to reuse elements defined in `<Defs>`.
- **Styling Props:** Most SVG elements accept presentation attributes like `fill` (fill color), `stroke` (stroke color), `strokeWidth`, `opacity`, etc.

**`viewBox` Attribute**

The `viewBox` attribute is crucial for SVG scalability and responsiveness. It is defined by four numbers: `min-x`, `min-y`, `width`, and `height` (e.g., `viewBox="0 0 100 100"`).

- `min-x`, `min-y`: The upper-left corner of the viewBox.
- `width`, `height`: The width and height of the viewBox.
  This defines the coordinate system for the SVG graphic. The `width` and `height` props on the `<Svg>` component define how large this `viewBox` will be rendered on the screen. The browser/renderer will scale the `viewBox` to fit into the dimensions specified by `width` and `height`, preserving the aspect ratio by default.

### Procedural Content

**Example 1: Inline SVG Icon**

Let's create a simple checkmark icon for our SpeedyMeds app using inline SVG components. This could be used to indicate a verified prescription or a completed task.

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

/**
 * @interface CheckmarkIconProps
 * @description Defines the properties for the CheckmarkIcon component.
 * @property {string} [color="#4CAF50"] - The fill color of the checkmark icon.
 * @property {number} [size=24] - The width and height of the icon.
 */
interface CheckmarkIconProps {
  color?: string;
  size?: number;
}

/**
 * @component CheckmarkIcon
 * @description A reusable SVG checkmark icon component.
 * It renders a scalable checkmark path within an Svg container.
 * Useful in the SpeedyMeds app for indicating success or verification.
 * @param {CheckmarkIconProps} props - The properties for the component.
 * @returns {React.ReactElement} The rendered CheckmarkIcon component.
 */
const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  color = "#4CAF50",
  size = 24,
}) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <Svg height={size} width={size} viewBox="0 0 24 24">
        <Path
          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

// Example Usage:
// const MyScreen = () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text>Prescription Verified: <CheckmarkIcon size={30} color="green" /></Text>
//     <Text>Task Completed: <CheckmarkIcon size={20} color="#03A9F4" /></Text>
//   </View>
// );

export default CheckmarkIcon;
```

**Explanation of Example 1:**

This `CheckmarkIcon` component demonstrates how to create a simple, reusable vector icon directly within your React Native code using `react-native-svg`. The icon is a standard checkmark, which could be used in the SpeedyMeds app to indicate a verified prescription, a successfully completed action, or a selected item.

The key aspects of this component are:

1.  **Props for Customization (`color`, `size`):** The component accepts `color` and `size` props, allowing it to be easily reused with different appearances. Default values are provided for convenience (`#4CAF50` green and `24` pixels).

2.  **`<Svg>` Container:** The root of our icon is the `<Svg>` component from `react-native-svg`. We pass the `size` prop to its `height` and `width` attributes. This defines the dimensions the SVG will occupy on the screen.

3.  **`viewBox="0 0 24 24"`:** This is a critical attribute. It defines the internal coordinate system of the SVG graphic. In this case, we're saying our drawing space is a 24x24 unit square. Regardless of the actual `size` prop passed (e.g., 30, 50, or 100 pixels), the drawing instructions within the `viewBox` will be scaled to fit those dimensions. This is what makes SVGs scalable without loss of quality.

4.  **`<Path>` Element:** The actual checkmark shape is drawn using a single `<Path>` element. The `d` attribute contains a string of SVG path commands that define the lines and curves of the checkmark. This specific path data is a common representation for a checkmark icon. The `fill` attribute of the `<Path>` is set to the `color` prop, allowing the icon's color to be dynamically changed.

5.  **Container `<View>`:** The `<Svg>` element is wrapped in a standard React Native `<View>`. While not strictly necessary for the SVG itself to render, this container uses Flexbox properties (`justifyContent: "center", alignItems: "center"`) and is given the icon's `width` and `height`. This can be helpful for layout purposes, ensuring the icon is aligned as expected if it's placed alongside other elements, and makes the touchable area (if any were added) consistent with the icon size.

By creating the icon this way, we have a component that is lightweight, scalable to any dimension without pixelation, and customizable in color. This is far more efficient for simple icons than using multiple PNG files for different resolutions and colors.

**Example 2: Using a Local SVG File (as a Component)**

Often, you'll have SVG files (e.g., icons from a design tool). While `react-native-svg` doesn't directly render `.svg` files like an `<Image>` component renders raster images, the common practice is to convert these SVG files into React Native components.

Tools like [SVGR](https://react-svgr.com/) (specifically its `@svgr/cli` or webpack loader) can automate this process. For an Expo project, you might run a script or manually convert simple SVGs.

Let's assume you have an `rx-logo.svg` file for SpeedyMeds:

```xml
<!-- rx-logo.svg -->
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="15" fill="#2196F3"/>
  <path d="M30 70L30 30L45 30C55 30 55 40 45 40L30 40" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M55 70L70 30" stroke="white" stroke-width="5" stroke-linecap="round"/>
</svg>
```

You could convert this into a React Native component manually or using a tool:

```tsx
// components/RxLogo.tsx
import React from "react";
import Svg, { Rect, Path } from "react-native-svg";

/**
 * @interface RxLogoProps
 * @description Defines the properties for the RxLogo component.
 * @property {number} [size=100] - The width and height of the logo.
 */
interface RxLogoProps {
  size?: number;
}

/**
 * @component RxLogo
 * @description A component that renders the SpeedyMeds Rx logo using SVG elements.
 * This demonstrates how an existing SVG file can be converted into a reusable
 * React Native component using `react-native-svg`.
 * @param {RxLogoProps} props - The properties for the component.
 * @returns {React.ReactElement} The rendered RxLogo component.
 */
const RxLogo: React.FC<RxLogoProps> = ({ size = 100 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Rect width="100" height="100" rx="15" fill="#2196F3" />
      <Path
        d="M30 70L30 30L45 30C55 30 55 40 45 40L30 40"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M55 70L70 30"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default RxLogo;
```

**Explanation of Example 2:**

This `RxLogo` component illustrates a common workflow for using SVGs in React Native: converting an existing `.svg` file (like one exported from a design tool) into a dedicated React Native component. This approach makes the SVG easily reusable and manageable within your project, especially for more complex graphics like logos. The SpeedyMeds Rx logo serves as our example here.

Key steps and concepts involved:

1.  **Original SVG Structure:** We start with the XML content of an `rx-logo.svg` file. This file contains standard SVG elements like `<svg>`, `<rect>`, and `<path>` with various attributes defining the logo's appearance (dimensions, colors, path data, stroke properties).

2.  **Translation to `react-native-svg` Components:** The core idea is to replace each SVG XML tag with its corresponding component from the `react-native-svg` library.

    - The root `<svg>` tag becomes the `<Svg>` component.
    - `<rect>` becomes `<Rect>`.
    - `<path>` becomes `<Path>`.

3.  **Prop Mapping:** SVG attributes are mapped to React-style props. For example:

    - `width` and `height` on the `<svg>` tag map directly to `width` and `height` props on the `<Svg>` component.
    - `viewBox` is also a direct mapping.
    - `fill` on `<rect>` maps to the `fill` prop.
    - `stroke-width` on `<path>` becomes `strokeWidth` (camelCase).
    - `stroke-linecap` becomes `strokeLinecap`.
    - `stroke-linejoin` becomes `strokeLinejoin`.
      This conversion to camelCase is standard for React props that correspond to hyphenated HTML/SVG attributes.

4.  **Component Encapsulation:** The translated SVG elements are wrapped in a functional React component (`RxLogo`). This component can accept props, such as `size`, to allow for easy customization of the logo's rendered dimensions while maintaining its aspect ratio due to the `viewBox`.

5.  **Benefits of Componentization:**
    - **Reusability:** Import and use `<RxLogo size={50} />` anywhere in the app.
    - **Maintainability:** If the logo design changes, you update this single component.
    - **Performance:** For static SVGs, this is generally efficient. `react-native-svg` renders these elements on the native side.
    - **Type Safety:** With TypeScript, `RxLogoProps` provides type checking for the component's props.

While manual conversion is feasible for simple SVGs like this logo, for projects with many complex SVGs, tools like SVGR (`@svgr/cli`) are highly recommended. SVGR can automate the conversion from `.svg` files to React Native components, handling optimizations and prop transformations, significantly streamlining the development workflow. This `RxLogo` could be used in various places within the SpeedyMeds application, such as in the header, on a splash screen, or as part of branding elements.

> [!TIP]
> For managing a large number of SVG icons, consider using a tool like SVGR to automatically convert your SVG files into React Native components. This can be integrated into your build process or run as a one-time script.

> 📚 **Official Documentation:**
>
> - [React Native SVG GitHub Repository (Primary Docs)](https://github.com/react-native-svg/react-native-svg)
> - [MDN Web Docs: SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
> - [SVGR Tool](https://react-svgr.com/)

### Next Steps

Working with SVGs allows for crisp, scalable graphics. Next, we will move on to another important feature for engaging users: implementing push notifications using `expo-notifications`.
