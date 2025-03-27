# 08: Icons 📍

Icons are essential for intuitive mobile navigation and conveying actions. While you *can* use static image files (`.png`) for icons, **vector icons** are generally preferred. They scale without losing quality and can be easily styled (color, size) via props/styles.

*   **Vector Icons:** Rendered from font files or SVG. Scalable and stylable.
*   **`react-native-vector-icons`:** A popular library providing bundled icon sets (FontAwesome, Material Icons, etc.). Often included with Expo.
*   **Usage:** Import icon components and use them like `<Text>`.
*   **Custom Icons:** Possible via custom icon fonts or SVG libraries.

> Vector icons offer flexibility and scalability compared to raster image icons.

<div class="android-dev">🤖 **Android Devs:** Think of vector icons like using Vector Drawables (`<vector>`) in XML. `react-native-vector-icons` bundles common icon fonts (like Material Design Icons) for easy use.</div>
<div class="ios-dev">🍏 **iOS Devs:** Similar to using SF Symbols or embedding icon fonts. `react-native-vector-icons` provides access to many standard sets within React Native.</div>
<div class="react-dev">⚛ **React Devs:** Analogous to using icon font libraries (like FontAwesome via CSS classes) or SVG icons on the web. This library provides React components for icons.</div>
<div class="angular-dev">🅰 **Angular Devs:** Similar to using libraries like Angular Material Icons or FontAwesome directives. You import and use icon components directly.</div>

<blockquote><details>

Icons play a crucial role in mobile UI design, providing quick visual cues for actions, navigation items, and status indicators. While using individual PNG image files for each icon (with @2x/@3x variants) is possible, it can become cumbersome to manage and doesn't offer easy styling (like changing color dynamically). Vector icons solve these problems. They are typically based on icon fonts (where each character maps to an icon glyph) or SVG (Scalable Vector Graphics). Because they are vector-based, they can be scaled to any size without loss of quality, and their color can usually be changed easily via styling props, just like text color. The most widely used library for vector icons in React Native is `react-native-vector-icons`. It bundles many popular icon sets (FontAwesome, MaterialCommunityIcons, Ionicons, etc.) and provides corresponding React components, making it straightforward to incorporate icons into your application. Expo projects often come with this library pre-installed or easily addable.

</details></blockquote>

---

## Using `react-native-vector-icons`

This library is the de facto standard for vector icons in React Native.

**Installation (if not already in your Expo project):**

```bash
npx expo install react-native-vector-icons @expo/vector-icons
```

**Usage:**

1.  **Find Icons:** Browse available icons (e.g., [oblador.github.io/react-native-vector-icons/](https://oblador.github.io/react-native-vector-icons/)). Note the icon set (e.g., `MaterialCommunityIcons`) and icon name (e.g., `pill`).
2.  **Import:** Import the specific icon set component.
3.  **Render:** Use the component, passing `name`, `size`, and `color` props.

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Import the specific icon set component you need
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Another example

const MedicationInfoWithIcons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="pill" size={24} color="#007AFF" style={styles.icon} />
        <Text style={styles.text}>Lisinopril 10mg</Text>
      </View>
      <View style={styles.infoRow}>
        <FontAwesome name="calendar-check-o" size={22} color="#34C759" style={styles.icon} />
        <Text style={styles.text}>Next refill: Tomorrow</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="clock-alert-outline" size={24} color="#FF9500" style={styles.icon} />
        <Text style={styles.text}>Take with food</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row', // Icon and text side-by-side
    alignItems: 'center', // Vertically center icon and text
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Space between icon and text
    width: 24, // Ensure consistent spacing alignment
    textAlign: 'center', // Center icon within its width (useful if sizes vary slightly)
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Allow text to take remaining space
  },
});

export default MedicationInfoWithIcons;
```

> The `size` and `color` props make styling vector icons trivial. Treat them like text elements.

<blockquote><details>

`react-native-vector-icons` simplifies using icon fonts significantly. After installation (often handled by `npx expo install @expo/vector-icons` which wraps the core library for Expo), you can start using icons. The first step is usually browsing the available icon sets and finding the specific icon name you need – the library's directory or website is the best place for this. Once you know the set (e.g., `MaterialCommunityIcons`) and name (e.g., `"pill"`), you import the corresponding component (`import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';`). You then render this component like `<MaterialCommunityIcons name="pill" size={24} color="#007AFF" />`. The `name` prop specifies which icon to display from the set. The `size` prop controls the icon's size (in dp, just like font size), and the `color` prop sets its color. Because these icons are typically rendered using font glyphs, they behave much like text elements and can often be styled using text-related style properties if needed (though `size` and `color` props are standard). The example shows how to integrate icons alongside text using a simple Flexbox row layout.

</details></blockquote>

---

## Creating Icon Buttons

Combine vector icons with `Pressable` (or other touchables) to create interactive icon buttons.

```typescript
import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  iconName: string;
  size?: number;
  color?: string;
  onPress: () => void;
  label?: string; // Optional text label
  disabled?: boolean;
}

const IconButton = ({
  iconName,
  size = 24,
  color = '#007AFF',
  onPress,
  label,
  disabled = false,
}: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.buttonContainer,
        label ? styles.buttonWithLabel : styles.buttonIconOnly,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <MaterialCommunityIcons name={iconName} size={size} color={disabled ? '#aaa' : color} />
      {label && <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  buttonWithLabel: {
    // Styles specific to buttons with labels (e.g., min width)
  },
  buttonIconOnly: {
    // Styles specific to icon-only buttons (e.g., aspect ratio)
  },
  buttonPressed: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)', // Light blue background on press
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
  labelDisabled: {
      color: '#aaa',
  }
});

// Example Usage:
const PrescriptionActions = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <IconButton iconName="plus-circle-outline" label="Add New" onPress={() => {}} />
        <IconButton iconName="pill" label="Refill" onPress={() => {}} color="#34C759" />
        <IconButton iconName="trash-can-outline" label="Remove" onPress={() => {}} color="#FF3B30" disabled />
        <IconButton iconName="information-outline" onPress={() => {}} color="#555" />
    </View>
);

export default PrescriptionActions;
```

> Wrap the icon component within a `Pressable` and apply styles for visual feedback and layout.

<blockquote><details>

Vector icons are frequently used as buttons or interactive elements. The standard way to achieve this is by wrapping the icon component (e.g., `<MaterialCommunityIcons>`) inside a `Pressable` component (or `TouchableOpacity`, etc.). The `Pressable` handles the touch events (`onPress`, `onLongPress`) and provides feedback states (`pressed`). You can then style the `Pressable` container to define the button's background, padding, border radius, and press feedback (like changing background color or opacity). The `IconButton` example demonstrates creating a reusable component that takes an `iconName`, `size`, `color`, `onPress` handler, an optional `label`, and a `disabled` state. It renders the `MaterialCommunityIcons` component inside a `Pressable`. The styles applied to the `Pressable` change based on whether it's pressed or disabled, providing visual cues. If a `label` is provided, it's rendered below the icon. This pattern encapsulates the logic for creating consistent, interactive icon buttons throughout your application.

</details></blockquote>

---

## Custom Icons & SVG

If bundled icon sets aren't sufficient, you have options:

1.  **Create a Custom Icon Font:**
    *   Use services like IcoMoon, Fontello, or Fontastic to compile SVG icons into a font file (`.ttf`).
    *   Add the font file to your project assets (e.g., `/assets/fonts`).
    *   Link the font (see Custom Fonts section).
    *   Use `createIconSet` from `react-native-vector-icons` to create a custom component for your font.

2.  **Use SVG:**
    *   Use libraries like `react-native-svg` to render SVG images directly.
    *   **Installation:** `npx expo install react-native-svg`
    *   Allows embedding SVG code or loading `.svg` files.
    *   Offers fine-grained control over vector graphics.

```typescript
// Example using react-native-svg (Conceptual)
import React from 'react';
import { SvgXml } from 'react-native-svg'; // Or SvgUri, SvgCss, etc.

// SVG content as a string
const customPillSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#888"/>
<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="#007AFF"/>
</svg>
`;

const CustomPillIcon = ({ size = 24, color = '#007AFF' /* Color prop might need specific handling in SVG */ }) => {
  // Note: Dynamically changing fill colors within SVG strings can be complex.
  // Libraries might offer helpers, or you might pass props directly to SVG elements if using JSX syntax.
  return <SvgXml xml={customPillSvg} width={size} height={size} />;
};

export default CustomPillIcon;
```

> SVGs offer more power for complex graphics but can be more complex to manage and style dynamically than icon fonts. Custom fonts require more setup but integrate well with `react-native-vector-icons`.

<blockquote><details>

While `react-native-vector-icons` covers many common use cases, you might need custom icons specific to your brand or application. One approach is creating a custom icon font. Tools like IcoMoon allow you to upload your own SVG files and generate a font file (`.ttf`). You then add this font to your project's assets and link it (similar to custom text fonts). `react-native-vector-icons` provides a `createIconSet` function that lets you map glyph names in your custom font to a React component, allowing you to use your custom icons just like the bundled sets (e.g., `<MyCustomIcon name="custom-logo" size={30} />`).

Alternatively, you can use Scalable Vector Graphics (SVG) directly with libraries like `react-native-svg`. This library allows you to render SVG data within your React Native application. You can embed SVG XML as a string (`SvgXml`), load it from a URI (`SvgUri`), or even construct SVG elements using JSX-like syntax (`<Svg><Circle cx="50" cy="50" r="40" fill="red" /></Svg>`). SVGs offer maximum flexibility for complex vector graphics but might require more effort to style dynamically (e.g., changing colors based on props) compared to the simple `color` prop of icon fonts. Choose the approach based on the complexity of your icons and your styling needs.

</details></blockquote>

---

## Summary: Icons

*   📍 **Vector Icons Preferred:** Use over raster images for scalability and easy styling.
*   🔧 **`react-native-vector-icons`:** Standard library, often included via `@expo/vector-icons`.
    *   Import specific sets (e.g., `MaterialCommunityIcons`).
    *   Use `<IconSet name="..." size={...} color="..." />`.
*   <0xF0><0x9F><0x95><0x8B>️ **Icon Buttons:** Wrap icons in `Pressable` for interactivity.
*   🎨 **Custom Icons:**
    *   Create custom icon fonts and use `createIconSet`.
    *   Use `react-native-svg` for direct SVG rendering.
*   ✅ **Benefits:** Sharp at any size, easy color/size changes.

> Use vector icons for clear, scalable, and easily stylable iconography in your application.

<blockquote><details>

This section focused on incorporating icons into React Native applications, emphasizing the advantages of using vector icons over static raster images due to their scalability and ease of styling. We highlighted `react-native-vector-icons` (often via `@expo/vector-icons`) as the primary library for accessing popular icon font sets like Material Icons and FontAwesome. Usage involves importing the desired icon set component and rendering it with `name`, `size`, and `color` props. We demonstrated how to create interactive icon buttons by combining these icon components with `Pressable`. Finally, we touched upon options for using custom icons, either by generating a custom icon font and integrating it with `react-native-vector-icons` using `createIconSet`, or by leveraging the `react-native-svg` library for direct SVG rendering. Choosing the right icon strategy enhances usability and visual consistency.

</details></blockquote> 