# Module 3: Essential Web, JavaScript, and TypeScript Foundations

## 3.1 Styling in React Native: Core Concepts and CSS Divergences

Component Analogy: React Native utilizes core components like <View> and <Text> as fundamental building blocks for the UI. These serve similar structural and semantic purposes to HTML's <div> and <p> or <span> tags, respectively. However, it is crucial to understand that <View> and <Text> are abstractions that render to platform-native components (like UIView on iOS or android.view.View on Android), not HTML elements within a WebView.72

Styling Mechanism:

-   JavaScript Objects: Unlike web development where styles are typically defined in separate CSS files, React Native styles are defined directly within JavaScript using plain objects.26 Each key-value pair in the object represents a style property and its value.
-   StyleSheet.create API: While inline style objects (style={{ color: 'red' }}) are possible, the recommended approach is to use the StyleSheet.create API.26 This API takes an object containing named style objects and returns a similar object, but with potential optimizations (like sending style definitions over the bridge only once and referencing them by ID) and improved organization.30 Using StyleSheet.create also enables static analysis and validation of style properties in many development environments.30
    JavaScript
    import { StyleSheet, Text, View } from 'react-native';

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
    });

    const App = () => (
      <View style={styles.container}>
        <Text style={styles.title}>Styled Text</Text>
      </View>
    );

Layout with Flexbox:

-   Primary Model: Flexbox is the primary layout algorithm used in React Native to arrange components within their parent container.27 It provides a consistent way to build responsive layouts across different screen sizes.
-   Key Difference: A critical difference from web CSS is the default flexDirection. In React Native, flexDirection defaults to 'column' (arranging children vertically), whereas on the web, it defaults to 'row' (arranging children horizontally).27 Developers coming from the web must explicitly set flexDirection: 'row' for horizontal layouts. Other default Flexbox properties in React Native include alignItems: 'stretch'.
-   Core Properties: Developers use combinations of properties like flexDirection, justifyContent (alignment along the main axis), alignItems (alignment along the cross axis), flex (determining how components grow or shrink), and flexWrap (controlling multi-line wrapping) to achieve desired layouts.27

Style Properties & Units:

-   Property Naming: Style property names in React Native follow JavaScript conventions, using camelCase (e.g., backgroundColor, fontSize, fontWeight) instead of the kebab-case used in CSS (e.g., background-color, font-size, font-weight).26
-   Units: React Native employs a simplified unit system. Dimensions and positions are specified using unitless numbers which represent density-independent pixels (dp).31 This system ensures that UI elements appear roughly the same physical size across devices with different screen pixel densities. This contrasts sharply with web CSS, which uses various units like px, em, rem, %, vw, vh. The PixelRatio API can be used if direct conversion between dp and physical pixels is necessary.31

Key Differences from Web CSS:

-   No Cascading: Style properties do not cascade down the component tree as they do in CSS.76 Applying a style to a parent <View> does not automatically apply that style to its children. Styles must generally be applied directly to the element they are intended to affect.
-   Limited Inheritance: Style inheritance is very limited in React Native. The primary exception is within nested <Text> components, where properties like color, fontFamily, fontSize, and fontWeight can be inherited from parent <Text> components.76 This inheritance does not apply from <View> to <Text> or between other component types.

React Native's styling system strategically borrows familiar paradigms from web CSS, like Flexbox and common property names, to ease the transition for web developers. However, its implementation is adapted to the constraints and characteristics of native mobile platforms. The differences -- notably the default flexDirection, the density-independent pixel unit system, and the absence of cascading and widespread inheritance -- are crucial distinctions that developers, especially those with web backgrounds, must grasp to effectively style React Native applications.

#### Works cited

26. Style - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/style>
27. Layout with Flexbox - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/flexbox>
30. StyleSheet - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/stylesheet>
31. PixelRatio - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/pixelratio>
72. An Android developer's guide to React Native, accessed April 24, 2025, <https://developer.amazon.com/apps-and-games/blogs/2025/04/react-native-for-android-developers>
76. react-native-css-modules/docs/faq.md at master - GitHub, accessed April 24, 2025, <https://github.com/kristerkari/react-native-css-modules/blob/master/docs/faq.md>