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

interface CheckmarkIconProps {
  color?: string;
  size?: number;
}

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

- We import `Svg` and `Path` from `react-native-svg`.
- The `CheckmarkIcon` component takes optional `color` and `size` props.
- The `<Svg>` component sets up the canvas with a `viewBox` of "0 0 24 24". This means our path data is defined within a 24x24 coordinate system.
- The `width` and `height` props of the `<Svg>` component are set to the `size` prop, so the 24x24 `viewBox` will be scaled to fit these dimensions.
- The `<Path>` component defines the checkmark shape using SVG path data (`d` attribute). The `fill` prop is set to the `color` prop.

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

interface RxLogoProps {
  size?: number;
}

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

- The SVG XML from `rx-logo.svg` is translated into `react-native-svg` components (`<Rect>`, `<Path>`).
- Props like `stroke-width` become `strokeWidth` to match React prop naming conventions.
- This `RxLogo` component can now be imported and used like any other React component, with the `size` prop controlling its rendered dimensions.

> [!TIP]
> For managing a large number of SVG icons, consider using a tool like SVGR to automatically convert your SVG files into React Native components. This can be integrated into your build process or run as a one-time script.

> 📚 **Official Documentation:**
>
> - [React Native SVG GitHub Repository (Primary Docs)](https://github.com/react-native-svg/react-native-svg)
> - [MDN Web Docs: SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
> - [SVGR Tool](https://react-svgr.com/)

### Next Steps

Working with SVGs allows for crisp, scalable graphics. Next, we will move on to another important feature for engaging users: implementing push notifications using `expo-notifications`.
