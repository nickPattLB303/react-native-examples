React Native Core Components: A Comprehensive Guide (Module 8)
Target Technology Versions:
React Native: 0.74+
Expo SDK: 52+
React Navigation: v6
React Native Paper: v5
TanStack Query: v5
Zustand: v4+
TypeScript
This module delves into the foundational elements of building user interfaces in React Native: the Core Components. These components are the essential building blocks provided by the React Native framework, enabling developers to construct rich, native-feeling mobile applications for both iOS and Android from a single JavaScript codebase.
Section 1: The Role of Core Components
React Native Core Components are pre-built, reusable UI elements that serve as the fundamental building blocks for mobile application development within the framework.1 They are essentially React components specifically tailored for creating mobile UIs. Their primary purpose is to simplify the process of UI creation, allowing developers to integrate common interface elements like views, text, images, and interactive controls seamlessly into their applications.1 This modular approach enhances not only the speed of development but also the maintainability and scalability of projects.1
These components act as an abstraction layer over the native UI elements of the underlying mobile platform (iOS or Android). When a React Native application is compiled and run, these JavaScript-based Core Components are translated into their corresponding native counterparts. For instance, a <View> component in React Native maps to a UIView on iOS and an android.view.View (or ViewGroup) on Android, while a <Text> component becomes a UILabel or android.widget.TextView.1 This direct mapping to native widgets is what gives React Native applications their characteristic native look, feel, and performance, distinguishing them from web-based cross-platform solutions that often rely on web views.1
Utilizing Core Components typically involves a straightforward process:
Identify the Component: Determine the appropriate Core Component that best suits the UI requirement (e.g., <Text> for displaying text, <Image> for images). 1
Import the Component: Import the chosen component from the react-native library. 1
Integrate the Component: Incorporate the component into the JSX code for rendering within the application's UI hierarchy. 1
Each Core Component accepts a set of properties, known as props, which allow developers to customize its behavior, appearance, and content.1 For example, the style prop can be used to define visual characteristics, while an onPress prop might define the action to take when a button is tapped.
Unlike web development where HTML provides tags like <div>, <p>, or <h1> for structure and content 2, React Native uses its Core Components like <View> (analogous to <div>) and <Text> (analogous to <p> or <span>) to achieve similar outcomes in a mobile-native context.1 The benefits of using these components, and by extension, community-developed UI libraries built upon them, include reusability, extensive customization options through props, an improved and consistent user experience across platforms, and an enhanced developer experience due to the structured and component-based nature of React.4
It's important to distinguish Core Components from third-party UI libraries like React Native Elements or React Native Paper. While Core Components provide the fundamental, unstyled building blocks, UI libraries typically offer a collection of more complex, pre-styled, and often themeable components that are built using these Core Components.4 UI libraries aim to accelerate development further by providing ready-made solutions for common UI patterns, whereas Core Components give developers the raw tools to build anything from scratch.
The design of React Native Core Components as an abstraction layer is fundamental to its cross-platform capabilities. They serve as a "lingua franca," allowing JavaScript code to command the creation and manipulation of native UI elements. This not only simplifies development but also ensures that the resulting applications perform well because they are, at their core, rendering actual native views. The "bridge" (in legacy architecture) or JSI (in the New Architecture) facilitates the communication between the JavaScript realm where these components are defined and the native realm where they are rendered, making this entire system possible.
Official Documentation Link Box
React Native Components and APIs: https://reactnative.dev/docs/components-and-apis
React Components and Props: https://react.dev/learn/your-first-component 6, https://legacy.reactjs.org/docs/components-and-props.html 7
Understanding React Native Components (Thoughtbot): https://thoughtbot.com/blog/understanding-react-native-components 1
Background Bridge Notes: UI Building Blocks
For Native Android/iOS Developers:
React Native Core Components are analogous to the fundamental UI widgets you use in native development (e.g., UIView, UILabel, UIImageView in iOS; View, TextView, ImageView in Android). However, instead of instantiating and configuring them in Swift/Objective-C or Kotlin/Java, you define them declaratively in JavaScript using JSX.
The props system in React Native is similar to setting attributes or properties on native views. For example, styling a <Text> component via its style prop is conceptually similar to configuring an NSAttributedString for a UILabel or applying styles to a TextView.
The layout system (Flexbox) will be different from Auto Layout (iOS) or XML-based layouts like ConstraintLayout (Android).
For Web Developers (React/Angular):
Core Components like <View>, <Text>, and <Image> are your primary building blocks, much like HTML elements (<div>, <p>, <img>) are on the web. However, you cannot use HTML tags directly in React Native.
The component-based architecture will feel familiar if you've used React. Props and state management concepts are largely the same.
Styling is done with JavaScript objects and often uses a subset of CSS properties, but there's no actual CSS, and features like cascading work differently. Layout is primarily handled by Flexbox.
Section 2: View (<View>) - The Fundamental Container
The <View> component is arguably the most fundamental and pervasively used UI building block in React Native.3 Its primary role is to serve as a container that can hold other components, supporting layout with Flexbox, styling, some touch handling capabilities, and accessibility controls.8 Think of it as the primary structural element for organizing UI elements on the screen.
Native Mapping:
A crucial aspect of <View> is its direct mapping to the native view equivalents on the platform the React Native application is running on.8
On iOS, a <View> translates to a UIView. 8
On Android, it maps to an android.view.View or, more specifically, an android.view.ViewGroup when it contains children, as ViewGroup is the base class for layouts and view containers in Android that can hold other views. 8
In web environments (when using React Native for Web), it typically maps to a <div> element. 8
This mapping ensures that the UI benefits from native performance and behavior.
Nesting and Children:
<View> components are designed to be nested within other views and can contain zero to many children of any type.8 This hierarchical structure is how complex user interfaces are constructed, with <View> components forming the backbone of the layout.
Layout with Flexbox:
Layout in React Native is primarily handled by Flexbox, and <View> is the main component used to define Flexbox containers and items.8
Default Direction: Unlike CSS on the web where flex-direction defaults to row, in React Native, it defaults to column for <View> components. This means children are laid out vertically by default. 13
Key Flexbox Properties: A combination of Flexbox properties applied to <View> styles allows for flexible and responsive layouts:
flex (number): Defines how a view will fill available space along the main axis relative to its siblings. A view with flex: 1 will take up all available space if it's the only child, or share space proportionally if other children also have flex values. 13
flexDirection (enum: 'row', 'column', 'row-reverse', 'column-reverse'): Specifies the direction of the main axis. 13
justifyContent (enum: 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'): Aligns children along the main axis. 13
alignItems (enum: 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'): Aligns children along the cross axis. 13
flexWrap (enum: 'wrap', 'nowrap', 'wrap-reverse'): Controls whether children wrap to the next line if they overflow the container. 13
flexBasis, flexGrow, flexShrink: Provide more fine-grained control over item sizing along the main axis. 13
width, height: Can be set to absolute numbers (density-independent pixels) or percentages. 14
position (enum: 'relative', 'absolute'): Defines how a view is positioned. 14
Styling:
<View> components are styled using the style prop, which accepts a JavaScript object or an array of objects.8 While inline styles are supported, it is highly recommended to use StyleSheet.create for defining styles due to performance benefits and better code organization.8 Style properties are typically camelCased versions of CSS properties (e.g., backgroundColor).
Touch Handling:
<View> has some built-in support for touch handling through the Responder Event System. Props like onStartShouldSetResponder, onMoveShouldSetResponder, etc., can be used to manage touch interactions.8 The pointerEvents prop ('auto', 'none', 'box-none', 'box-only') controls whether a <View> can be the target of touch events and if its children can be.8 For more complex touch interactions like taps or presses with visual feedback, components like <Pressable> or <TouchableOpacity> are generally preferred.
Accessibility:
<View> supports various accessibility props to make applications more usable for people with disabilities. These include:
accessible (boolean): When true, indicates the view is an accessibility element. 8
accessibilityLabel (string): A concise description of the element. 8
accessibilityHint (string): An additional hint about the element's action. 8
accessibilityRole (enum): Communicates the purpose of the component (e.g., 'button', 'header'). 8
accessibilityState (object): Describes the current state (e.g., { disabled: true, selected: false }). 8
Key Props for <View>:
A summary of some important props:
style: Applies styling rules.
children: The nested components or content within the <View>.
onLayout: A callback invoked on mount and on layout changes, providing the dimensions (x, y, width, height) of the view. 8
accessible, accessibilityLabel, accessibilityRole, accessibilityState, accessibilityHint: For accessibility.
pointerEvents: Controls touch event targeting. 8
hitSlop: Defines how far a touch can stray from the view's bounds and still be registered. 8
collapsable (boolean, Android): If true, this view may be removed from the native hierarchy as an optimization if it's purely for layout and doesn't draw anything or handle touches. Using nativeID or testID disables this. 8
nativeID, testID: For native identification and testing. 8
"Under the Hood"
Mapping to android.view.ViewGroup:
The reason a React Native <View> often maps to an android.view.ViewGroup (like LinearLayout, RelativeLayout, etc.) rather than a simple android.view.View on Android is fundamental to its role as a container.11 A basic android.view.View is a standalone visual component that cannot, by default, contain other child views. In contrast, android.view.ViewGroup is specifically designed to hold and arrange child views. Since React Native's <View> is inherently a container that can have children (other <View>s, <Text>, <Image>, etc.), it must be backed by a native component with similar capabilities. If <View> were mapped to a simple android.view.View, attempting to nest other components within it would lead to errors, as a standard View cannot act as a parent in a view hierarchy.11 Thus, React Native utilizes ViewGroupManager to create native UI components that can manage child views, ensuring the hierarchical structure of React components translates correctly to the Android native UI.11 On iOS, UIView inherently supports subviews, so this distinction is less pronounced.
Fabric Architecture and <View> Rendering:
In React Native's New Architecture, featuring Fabric, the rendering of components like <View> is significantly re-engineered for better performance and interoperability.16 The process involves several phases 18:
Render Phase: React executes in JavaScript, creating a tree of React Elements. For each host component (like <View>), the Fabric renderer synchronously creates a corresponding C++ object called a React Shadow Node (e.g., ViewShadowNode). These shadow nodes form a React Shadow Tree, which is an immutable, platform-agnostic representation of the UI.18
Commit Phase: Once the Shadow Tree is complete, layout information is calculated. Yoga, the layout engine, computes the size and position of each shadow node based on its Flexbox styles.19 The new Shadow Tree (with layout info) and the React Element Tree are then promoted as the "next tree" to be mounted.18
Mount Phase: The React Shadow Tree is transformed into a Host View Tree (the actual native views on the screen). This involves diffing the new Shadow Tree against the previously rendered one to determine the minimal set of native view mutations (create, update, delete).18 These operations are then executed on the native UI thread, creating or updating the UIView or android.view.ViewGroup instances.18 Fabric aims to make this process more efficient, enabling synchronous communication between JavaScript and native UI via JSI (JavaScript Interface), reducing bridge overhead, and supporting concurrent rendering features.16
The <View> component serves as the universal layout primitive in React Native. Its adoption of Flexbox by default offers a consistent and powerful layout system. For web developers, this is a familiar paradigm, easing the transition to mobile. For native developers accustomed to Auto Layout (iOS) or XML-based layouts (Android), Flexbox represents a mental shift but provides a unified approach across platforms. The collapsable prop on Android offers a glimpse into how React Native performs native-level optimizations, removing views that are purely for layout to flatten the native view hierarchy and improve rendering performance. This demonstrates that while <View> provides an abstraction, it's still deeply connected to the underlying native rendering mechanisms.
Key Props Table for <View>
Prop
Type
Description
style
StyleProp<ViewStyle>
Applies styling rules (Flexbox, dimensions, colors, etc.).
children
React.ReactNode
The nested components or content within the <View>.
onLayout
(event: LayoutChangeEvent) => void
Callback invoked on mount and layout changes, providing dimensions (event.nativeEvent.layout).
accessible
boolean
If true, the view is an accessibility element.
accessibilityLabel
string
A concise description of the element for screen readers.
accessibilityRole
AccessibilityRole
Communicates the purpose of the component (e.g., 'button', 'header').
pointerEvents
`'auto' \
'none' \
hitSlop
Insets
Defines an area outside the view's bounds where touches are still registered.
collapsable
boolean (Android only)
If true, this view may be removed from the native hierarchy if it's purely for layout and doesn't draw or handle touches. Default true.

Official Documentation Link Box
React Native View: https://reactnative.dev/docs/view 8 (Note: Link points to latest, content based on 0.74 where specified)
React Native Layout with Flexbox: https://reactnative.dev/docs/flexbox 14
React Native View Style Props: https://reactnative.dev/docs/view-style-props 15
iOS UIView: https://developer.apple.com/documentation/uikit/uiview
Android View: https://developer.android.com/reference/android/view/View
Android ViewGroup: https://developer.android.com/reference/android/view/ViewGroup
Background Bridge Notes: Layout Systems
For Native Android/iOS Developers:
React Native's <View> is the primary container, similar to UIView (iOS) or ViewGroup (Android). Layout is primarily managed by Flexbox properties applied via the style prop. This differs from XML-based layouts (LinearLayout, RelativeLayout, ConstraintLayout) in Android or Auto Layout/programmatic frames in iOS.
The concept of flex: 1 is key for making views expand to fill available space, analogous to certain weight/constraint configurations in native layouts.
Units are density-independent pixels by default, simplifying cross-resolution design compared to manually managing dp/sp (Android) or points and scale factors (iOS). 22
For Web Developers (React/Angular):
<View> is the closest equivalent to HTML's <div>. It's the fundamental container for layout.
Flexbox in React Native is very similar to CSS Flexbox, making layout concepts largely transferable. Key differences include flexDirection defaulting to 'column' instead of 'row', and some property names or supported values might differ slightly. 13
There is no direct equivalent of CSS Grid, though complex layouts can be achieved with nested Flexbox.
Positioning (absolute, relative) works similarly to CSS, but the context for absolute positioning is tied to parent views with non-static positioning or transforms. 14
Section 3: Text (<Text>) - Displaying Text
The <Text> component is the fundamental React Native element for displaying text content within an application.3 It supports nesting for complex styling, handles touch events, and has its own layout rules distinct from Flexbox.
Purpose and Role:
Its primary role is to render strings of text on the screen. Unlike web development where text can exist freely within many HTML elements, React Native enforces a stricter rule: all text nodes must be wrapped within a <Text> component.23 You cannot, for instance, place a raw string directly as a child of a <View>. This requirement is a direct consequence of React Native's need to efficiently manage text rendering and styling on native platforms. Native operating systems typically use specific UI elements for text (like UILabel on iOS or TextView on Android).24 The <Text> component provides the necessary abstraction layer to interact with these native text elements, ensuring that text rendering goes through React Native's controlled pipeline for applying text-specific native properties and layout.
Nesting Capabilities:
<Text> components can be nested within other <Text> components.23 This feature is powerful for applying different styles to different segments of a string. For example, one part of a sentence can be bold, while another part is colored red, all within a single logical text block.

JavaScript

<Text style={{fontSize: 16}}>
This is <Text style={{fontWeight: 'bold'}}>bold</Text> and this is <Text style={{color: 'red'}}>red</Text>.
</Text>

Internally, React Native translates these nested structures into a flat NSAttributedString on iOS or a SpannableString on Android, which are the native mechanisms for handling styled text ranges.23
Layout Inside <Text>:
A crucial distinction of the <Text> component is its layout behavior. Everything rendered inside a <Text> component uses text layout rules, not Flexbox.23 This means that child elements (which must also be <Text> components or raw strings) are treated as inline elements. They flow together and wrap to the next line when they reach the end of the parent <Text> container's boundary. This contrasts with <View> components, whose children are laid out as rectangular blocks according to Flexbox rules.
For example:

JavaScript

// Text container: text flows inline
<Text>
<Text>First part and </Text>
<Text>second part</Text>
</Text>
// Output might be: |First part and second part| or wrapped if space is limited.

// View container: each Text is a block
<View>
<Text>First part and </Text>
<Text>second part</Text>
</View>
// Output will be:
// |First part and |
// |second part |

23
Styling and Inheritance:
Styling for <Text> components is applied via the style prop. React Native implements a limited form of style inheritance, which applies only within <Text> subtrees.23 This means styles (like color, fontFamily, fontSize) applied to a parent <Text> component will be inherited by its child <Text> components unless explicitly overridden. However, a <Text> component will not inherit text styles from a parent <View> component.
This design choice promotes strong component isolation, a core React principle, ensuring that a text component behaves predictably regardless of where it's placed in the UI hierarchy.23 It also simplifies the underlying native implementation, as the framework doesn't need to traverse up the entire view tree to determine text styles.23 This contrasts sharply with CSS on the web, which features extensive cascading style inheritance.
Key text-specific style props include 26:
color: Sets the text color.
fontFamily: Specifies the font family.
fontSize: Sets the font size (numeric value).
fontStyle: 'normal' or 'italic'.
fontWeight: 'normal', 'bold', or numeric values ('100' to '900').
lineHeight: Controls the vertical spacing between lines of text.
textAlign: 'auto', 'left', 'right', 'center', 'justify' (Android Oreo+).
textDecorationLine: 'none', 'underline', 'line-through', 'underline line-through'.
textShadowColor, textShadowOffset ({width, height}), textShadowRadius: For text shadow effects.
textTransform: 'none', 'uppercase', 'lowercase', 'capitalize'.
includeFontPadding (Android): Removes extra font padding. 26
textAlignVertical (Android): Vertical alignment of text. 26
Key Props for <Text>:
children (ReactNode): The text content or nested <Text> components.
style (StyleProp<TextStyle>): Applies text-specific styles.
numberOfLines (number): Truncates the text to a specific number of lines, often used with ellipsizeMode. 23
ellipsizeMode (enum: 'head', 'middle', 'tail', 'clip'): Determines how text is truncated when numberOfLines is exceeded. Default is 'tail'. 23
onPress (function): Makes the text touchable, invoking the callback on a press. 23
selectable (boolean): If true, allows the user to select text for copying. Default is false. 23
accessibilityLabel (string): Provides a label for screen readers.
allowFontScaling (boolean): Whether fonts should scale to respect Text Size accessibility settings. Default is true. 27
adjustsFontSizeToFit (boolean, iOS only): Automatically adjusts font size to fit within the component's bounds.
minimumFontScale (number, iOS only): Used with adjustsFontSizeToFit.
"Under the Hood"
Native Mapping:
On iOS, the React Native <Text> component typically maps to a native UILabel.24 UILabel is efficient for displaying static or simple styled text.
On Android, it maps to android.widget.TextView.24 The selectable prop introduces an interesting nuance. Standard UILabel on iOS has limited text selection capabilities.28 When selectable={true} is used, or if more advanced text interaction features are needed, React Native might internally use or configure the underlying native component differently, potentially leveraging features akin to UITextView on iOS, which offers more robust text selection and editing capabilities.28 The existence of third-party libraries like react-native-uitextview explicitly aims to provide UITextView's selection behavior, highlighting that the default <Text> mapping might not cover all native text functionalities without specific props or extensions.28 This illustrates that core component abstractions, while powerful, can have subtle platform-dependent behaviors or require deeper understanding for advanced use cases.
Fabric Architecture:
In the Fabric architecture, a TextShadowNode would be responsible for managing the properties and layout of <Text> components. Text layout itself is a complex process that often relies on native platform capabilities (e.g., CoreText on iOS, Android's text layout engine). Fabric, with JSI, allows for more efficient communication and coordination with these native text layout and rendering systems.29 For instance, measuring text size, which is crucial for layout, can be done more synchronously if needed.
Key Props Table for <Text>
Prop
Type
Description
children
React.ReactNode
The text content or nested <Text> components.
style
StyleProp<TextStyle>
Applies text-specific styles (color, font, alignment, etc.).
numberOfLines
number
Truncates text to this many lines. 0 for no limit.
ellipsizeMode
`'head' \
'middle' \
onPress
(event: GestureResponderEvent) => void
Callback invoked when the text is pressed.
selectable
boolean
If true, text can be selected by the user for copy-paste. Default false.
accessibilityLabel
string
Overrides the text read by screen readers.

Official Documentation Link Box
React Native Text: https://reactnative.dev/docs/0.74/text 23 (Link is for 0.74, latest version is 0.79 as of docs)
React Native Text Style Props: https://reactnative.dev/docs/text-style-props 26
MDN Text Content (HTML):(https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content) (for web comparison)
iOS UILabel: https://developer.apple.com/documentation/uikit/uilabel
iOS UITextView: https://developer.apple.com/documentation/uikit/uitextview 31
Android TextView:(https://developer.android.com/reference/android/widget/TextView)
Background Bridge Notes: Text Rendering and Styling
For Native Android/iOS Developers:
Styling <Text> in React Native using JavaScript style objects is analogous to working with NSAttributedString in iOS (for UILabel or UITextView) or SpannableString in Android (for TextView) to apply varied styles within a single text block. However, the React Native approach unifies this under a single component and prop system.
The <Text> component abstracts away the differences between UILabel (primarily for static, non-selectable display) and UITextView (for selectable, scrollable, editable text) on iOS, or the rich styling capabilities of TextView on Android. The selectable and multiline (from TextInput, but conceptually related for UITextView) props hint at these underlying native distinctions.
Text layout rules (wrapping, inline flow) within a <Text> component are managed by React Native, leveraging native text rendering engines.
For Web Developers (React/Angular):
A key difference from HTML is the mandatory use of the <Text> component for all text content. You cannot have raw text inside a <View> like you can have text inside a <div>.2 HTML elements like <p>, <span>, <h1>-<h6> all render text directly.
Style inheritance is more restricted in React Native. Text styles (like fontFamily, color) are generally only inherited from a parent <Text> component to a child <Text> component, not from a <View> to a <Text>.23 This contrasts with CSS cascading, where text styles can be inherited from any ancestor.
The layout of elements within a <Text> component follows text flow rules (inline, wrapping), whereas in HTML, elements like <p> are block-level by default, and <span> is inline. The <Text> component itself, when placed in a <View>, behaves according to Flexbox rules applied to that <View>.23
Section 4: Image (<Image>) - Displaying Images (Local and Network)
The <Image> component is React Native's standard solution for rendering various types of images within an application.3 It supports displaying network images fetched from URLs, static image resources bundled with the application, temporary local images (e.g., from the camera roll), and images encoded as data URIs.34
Image Sources (source prop):
The source prop is central to the <Image> component and determines what image to display. Its value type depends on the image source:
Static Image Resources:
To include images that are part of your project's source code (e.g., in an assets folder), you use the require() function: source={require('./path/to/image.png')}.35 The React Native bundler handles these assets, including packaging them appropriately for each platform.
Density Suffixes (@2x, @3x): React Native automatically selects the best image resolution for the device's screen density by looking for files with @2x or @3x suffixes (e.g., my-icon.png, my-icon@2x.png, my-icon@3x.png).35 This ensures images appear crisp on high-resolution displays. If an exact match isn't found, it picks the next best size to avoid blurriness.35
One benefit of require() is that the bundler can determine the image dimensions, so you often don't need to specify width and height manually unless you need dynamic scaling.35
Network Images:
To display images from a remote URL, the source prop takes an object with a uri key: source={{ uri: 'https://example.com/image.jpg' }}.33
Mandatory Dimensions: A critical point for network (and data URI) images is that you must manually specify width and height via the style prop.33 React Native cannot determine the dimensions of remote images before they are downloaded. Failure to provide dimensions can result in the image not appearing or causing layout issues. This requirement is a direct consequence of React Native's layout system, which calculates layout in JavaScript, often before asynchronous operations like image fetching are complete. Providing explicit dimensions ensures predictable layout calculations and prevents UI jumps.
It's highly recommended to use https for image URLs to comply with App Transport Security (ATS) on iOS.35
You can also send HTTP headers or a body with the image request by adding method, headers, or body properties to the source object: source={{ uri: '...', method: 'POST', headers: { Authorization: 'Bearer token' } }}.35
Temporary Local Images:
Images stored on the device's local file system (e.g., from the camera roll or other local storage) can be displayed using a file:/// URI in the source object: source={{ uri: 'file:///path/to/local/image.jpg' }}.34 Dimensions usually need to be specified.
Data URI Images (Base64 encoded):
For embedding image data directly, such as Base64 encoded images received from an API, use the data: URI scheme: source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAA...' }}.33
Like network images, these also require manual width and height specification and are generally recommended only for very small, dynamic images due to the overhead of the Base64 string.35
Native Asset Images (for Hybrid Apps):
If integrating React Native into an existing native application, you can use images already included in the native project's resources (e.g., Xcode asset catalogs or Android drawable/asset folders). This is done by providing the asset name (without extension for drawables/asset catalogs) as the uri: source={{ uri: 'app_icon' }} or source={{ uri: 'asset:/image.png' }} for Android assets folder.35 Manual dimension specification is also required for these.
Key Props for <Image>:
source (ImageSourcePropType): Specifies the image to display, as detailed above.33
style: Used for applying styles, most importantly width and height for network/data images. Also supports common View styles like borderColor, borderWidth, borderRadius, opacity, and tintColor (for applying a tint to template/monochromatic images).34
resizeMode (enum): Determines how the image should be resized or scaled if its natural dimensions do not match the dimensions of the <Image> component's view. This prop directly abstracts and unifies the platform-specific concepts of contentMode in iOS UIImageView and scaleType in Android ImageView, providing a consistent cross-platform API.34
cover (default): Scales the image uniformly (maintaining aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view. This may result in some parts of the image being cropped to fill the bounds.33 (Maps to UIView.ContentMode.scaleAspectFill on iOS, ImageView.ScaleType.CENTER_CROP on Android).
contain: Scales the image uniformly (maintaining aspect ratio) so that both dimensions will be equal to or less than the corresponding dimension of the view. The entire image is made visible within the view, potentially leaving empty space (letterboxing/pillarboxing).33 (Maps to UIView.ContentMode.scaleAspectFit on iOS, ImageView.ScaleType.FIT_CENTER on Android).
stretch: Scales the width and height of the image independently, which may change the aspect ratio of the source image to fill the view.33 (Maps to UIView.ContentMode.scaleToFill on iOS, ImageView.ScaleType.FIT_XY on Android).
repeat (iOS only, or requires custom implementation): Repeats the image to cover the frame of the view. The image will keep its size and aspect ratio, unless it is larger than the view, in which case it will be scaled down uniformly so that it is contained in the view.33
center: Centers the image within the view. If the image is larger than the view, it's scaled down uniformly (like contain) to fit within the view.33 (Maps to UIView.ContentMode.center on iOS, ImageView.ScaleType.CENTER_INSIDE or CENTER on Android depending on size).
defaultSource (ImageSource): A static image (usually from require()) to display as a placeholder while the main source image is loading. Note: On Android, this prop is ignored on debug builds.33
loadingIndicatorSource (ImageSource (uri only) or number): Specifies an image source to be rendered as a loading indicator while the main image is downloading.34
blurRadius (number): Applies a blur filter to the image. The value is the blur radius.34
onError (function (event: {nativeEvent: {error: string}}) => void): Callback invoked if an error occurs during image loading (e.g., network error, invalid URI). The event contains an error message.34
onLoad (function (event: {nativeEvent: {source: {width: number, height: number, uri: string}}}) => void): Callback invoked when the image has successfully loaded. The event provides the width and height of the loaded image via nativeEvent.source.34
onLoadStart (function () => void): Callback invoked when the image load process begins.
onLoadEnd (function () => void): Callback invoked when the image load process finishes, regardless of success or failure.
accessibilityLabel (string): Provides an alternative text description for screen readers, making the image accessible.34
capInsets (Rect, iOS only): Defines resizable regions for an image, useful for creating stretchable buttons or backgrounds where corners remain fixed and centers/edges stretch.33 See Apple's documentation for more details.
fadeDuration (number, Android only): Duration in milliseconds for a fade-in animation when the image loads. Default is 300ms.33
progressiveRenderingEnabled (boolean, Android only): Enables progressive JPEG streaming if the image supports it.
source.cache (iOS only, for network images): Controls caching behavior. Values can be:
'default': Uses the native platform's default caching strategy.
'reload': Loads from the original source, ignoring any existing cache.
'force-cache': Uses existing cache data regardless of age. If not cached, loads from source and then caches.
'only-if-cached': Uses existing cache data only. If not cached, fails to load without attempting network request. 33
Image Caching & Performance:
Effective image handling is crucial for app performance and user experience. Slow-loading images or excessive data usage can be detrimental.
iOS cache prop: As detailed above, this prop provides fine-grained control over caching for network images on iOS.33
General Strategies:
Caching Libraries: For more advanced caching needs (disk caching, preloading, cache management across sessions), libraries like react-native-fast-image are highly recommended. They often provide better performance and more control than the default <Image> component for network images.42
Image Compression/Optimization: Always compress and optimize images for mobile delivery. Use tools like ImageOptim, TinyPNG, or services that provide image optimization to reduce file sizes without significant quality loss.42
Appropriate Formats: Choose image formats wisely. JPEGs are good for photos, PNGs for graphics with transparency. WebP often offers superior compression and quality compared to JPEG and PNG and is supported on both Android and iOS (though older iOS versions might need polyfills or specific handling).
Resizing to Dimensions: Serve images from your backend that are appropriately sized for the display context on the device. Avoid downloading very large images only to scale them down significantly on the client side.
Lazy Loading: For lists of images (e.g., in a FlatList), ensure that images are only loaded when they are about to enter the viewport. FlatList handles this for its items by default. For other scenarios, custom lazy loading or libraries might be needed.42
Placeholders: Utilize defaultSource or loadingIndicatorSource to provide immediate visual feedback to the user while the main image is loading.33 This improves perceived performance and avoids jarring empty spaces. The existence of these props and community libraries underscores a focus on user experience in image loading. Providing immediate feedback or placeholders during loading processes is a key aspect of developing high-quality React Native applications.
"Under the Hood"
Native Mapping:
On iOS, the React Native <Image> component is primarily mapped to the native UIImageView class.10 UIImageView is responsible for displaying image data (UIImage objects) on the screen.
On Android, <Image> maps to the native android.widget.ImageView class.10 This widget handles the display of drawable resources, bitmaps, etc.
resizeMode to Native Equivalents:
As mentioned, the resizeMode prop is an abstraction over native platform scaling behaviors:
iOS UIImageView.contentMode:
contain maps to UIView.ContentMode.scaleAspectFit.
cover maps to UIView.ContentMode.scaleAspectFill.
stretch maps to UIView.ContentMode.scaleToFill.
center maps to UIView.ContentMode.center. 39
Android ImageView.ScaleType:
contain maps to ImageView.ScaleType.FIT_CENTER.
cover maps to ImageView.ScaleType.CENTER_CROP.
stretch maps to ImageView.ScaleType.FIT_XY.
center can map to ImageView.ScaleType.CENTER or ImageView.ScaleType.CENTER_INSIDE depending on image and view sizes. 40
Image Loading & Caching Internals:
React Native's internal image loader handles the fetching of images from network URLs or loading them from local static assets. On the native side, platforms have their own image loading and caching mechanisms.
iOS: Uses NSURLSession for network requests and can leverage NSURLCache for HTTP caching. The cache prop on the <Image> source object for iOS directly influences how these native caching mechanisms are utilized.
Android: Historically, React Native has used the Fresco library by Facebook for image loading and caching on Android. Fresco is a powerful library that handles image downloading, caching (memory and disk), and display, with support for features like progressive JPEGs. The specific implementation details can evolve, but the general principle is that React Native bridges JavaScript image requests to native image loading libraries or APIs.
Fabric Architecture:
In the Fabric architecture, an ImageShadowNode would be responsible for receiving props from JavaScript, participating in layout calculations (especially important given the need for explicit dimensions), and then instructing the native side (via the Mounting Layer) to create/update the native UIImageView or android.widget.ImageView. JSI would facilitate more direct communication for event handling (like onLoad, onError) and potentially for more advanced image manipulation or control in the future.46 The core benefits of Fabric, such as improved UI responsiveness and more efficient updates, would apply to image-heavy UIs as well.
Key Props Table for <Image>
Prop
Type
Description
source
ImageSourcePropType
Specifies the image source (static, network URI, local URI, data URI).
style
StyleProp<ImageStyle>
Applies styling, crucially width and height for network/data images. Also borderRadius, borderColor, opacity, tintColor, etc.
resizeMode
`'cover' \
'contain' \
defaultSource
ImageSourcePropType (static resource)
Placeholder image displayed while the main source is loading.
loadingIndicatorSource
ImageSourcePropType (URI only or number)
Image source for a loading indicator displayed during download.
onError
(event: {nativeEvent: {error: string}}) => void
Callback invoked if an error occurs during image loading.
onLoad
(event: {nativeEvent: {source: {width, height, uri}}}) => void
Callback invoked when the image has successfully loaded, providing image dimensions.
accessibilityLabel
string
Alt text for screen readers.

Official Documentation Link Box
React Native Image: https://reactnative.dev/docs/image 34
React Native Images Guide (asset handling): https://reactnative.dev/docs/images 35
React Native Image Style Props: https://reactnative.dev/docs/image-style-props 38
Expo Image (alternative with more features): https://docs.expo.dev/versions/latest/sdk/image/ 43
Apple UIImageView contentMode: https://developer.apple.com/documentation/uikit/uiview/contentmode 39
Android ImageView ScaleType:(https://developer.android.com/reference/android/widget/ImageView.ScaleType) 40
Background Bridge Notes: Image Handling
For Native Android/iOS Developers:
The <Image> component's prop-based configuration (e.g., source={{uri: '...'}}, resizeMode) is the React Native way of achieving what you'd do natively by, for example, creating a UIImage from data/URL and assigning it to UIImageView.image, then setting UIImageView.contentMode on iOS. On Android, this would be akin to using BitmapFactory to decode an image (or a library like Glide/Picasso to load from a URL) into an ImageView and setting its scaleType.
React Native's @2x/@3x convention for static assets 35 is a streamlined approach compared to managing different drawable folders (mdpi, hdpi, xhdpi, etc.) on Android or dealing with asset catalogs and image sets on iOS. React Native's bundler handles the selection.
For Web Developers (React/Angular):
The <Image source={{uri: '...'}} style={{width, height}} /> syntax is analogous to the HTML <img src="./..." width="..." height="..." /> tag.48
A key difference is the mandatory width and height styling for network images in React Native.34 Web browsers can often infer dimensions or reflow content once an image loads, but React Native's layout is typically calculated before the image is fully downloaded, necessitating explicit dimensions to prevent a 0x0 size or layout shifts.
The resizeMode prop in React Native is similar in concept to the CSS object-fit property (e.g., resizeMode: 'contain' is like object-fit: contain;) [43 (Expo Image comparison)].
Section 5: TextInput (<TextInput>) - User Input
The <TextInput> component is a foundational element in React Native for capturing text input from the user via the device's virtual or hardware keyboard.3 It provides a configurable text field that can be used for various purposes, such as forms, search bars, message composition, and more.
Purpose and Role:
Its primary function is to allow users to enter and edit text within the application. It supports a wide range of features including auto-correction, auto-capitalization, placeholder text, different keyboard types (e.g., numeric, email), and secure text entry for passwords.27
Controlled Component Pattern:
The standard and highly recommended way to use <TextInput> in React Native is as a controlled component.27 This pattern ensures that the component's value is driven by the React state, providing a single source of truth for the input's content.
Definition: In a controlled component, the JavaScript state holds the current value of the input. Any changes made by the user trigger an update to this state, which in turn re-renders the input with the new value.
Implementation:
A state variable is declared in the parent component (typically using the useState hook in functional components) to store the input's text value.
This state variable is then passed to the value prop of the <TextInput> component.
The onChangeText prop of the <TextInput> is set to a callback function. This function receives the new text string as an argument whenever the user types and is responsible for updating the state variable with this new text. 27
Example (TypeScript):

TypeScript

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';

const MyTextInputComponent = () => {
const = useState('');
const [number, setNumber] = useState('');

return (
<SafeAreaView style={styles.container}>
<Text>Enter some text:</Text>
<TextInput
style={styles.input}
placeholder="Type here to translate!"
onChangeText={newText => setText(newText)} // Updates state on text change
value={text} // Input value is controlled by 'text' state
onSubmitEditing={() => console.log('Text submitted:', text)}
/>
<Text style={{padding: 10, fontSize: 22}}>
{text.split(' ').map((word) => word && '🍕').join(' ')}
</Text>

      <Text style={{marginTop: 20}}>Enter a number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Useless placeholder for number"
        onChangeText={newNumber => setNumber(newNumber)} // Updates state on number change
        value={number} // Input value is controlled by 'number' state
        keyboardType="numeric" // Shows numeric keyboard
      />
    </SafeAreaView>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 10,
},
input: {
height: 40,
borderColor: 'gray',
borderWidth: 1,
paddingHorizontal: 10,
marginBottom: 10,
},
});

export default MyTextInputComponent;

This example, adapted from 50 and 27, demonstrates two controlled <TextInput> fields. The first translates typed words into pizza emojis, and the second is configured for numeric input. The value of each input is tied to a React state variable (text and number), and onChangeText updates these state variables.
The prevalence of this "controlled component" pattern is a direct reflection of React's core philosophy of unidirectional data flow and maintaining a single source of truth for application state.51 This approach makes the application state more predictable and easier to debug compared to uncontrolled inputs where the state might reside directly in the native view or DOM.
Key Props for <TextInput>:
value (string): The current text value of the input. Essential for controlled components.27
onChangeText (function (text: string) => void): Callback invoked with the new text string every time the input's content changes. Used to update the state in controlled components.27
placeholder (string): A string displayed in the input field when value is empty, providing a hint to the user.3
style: Accepts a style object to customize the appearance of the text input (e.g., height, borderColor, padding).27
keyboardType (enum): Specifies the type of keyboard to display (e.g., 'default', 'numeric', 'email-address', 'phone-pad', 'url'). This helps optimize user input for different data types.27
secureTextEntry (boolean): If true, obscures the entered text, typically with dots or asterisks. Commonly used for password fields. Does not work with multiline={true}.27
autoCapitalize (enum: 'none', 'sentences' (default), 'words', 'characters'): Controls automatic capitalization behavior. Not supported by all keyboard types (e.g., name-phone-pad).27
autoCorrect (boolean): Enables or disables the platform's auto-correction feature. Default is true.27
multiline (boolean): If true, allows the input to accept multiple lines of text. Default is false.3 On iOS, multiline text aligns to the top; on Android, it centers vertically by default.
numberOfLines (number, Android only for initial height): Suggests the number of lines for a multiline input, primarily affecting its initial height on Android.
maxLength (number): Restricts the input to a maximum number of characters.3
editable (boolean): If false, the text cannot be edited by the user. Default is true.
onSubmitEditing (function (event: {nativeEvent: {text: string, eventCount: number, target: number}}) => void): Callback invoked when the user presses the keyboard's submit button (e.g., "Return", "Done", "Go"). Not called on iOS for keyboardType="phone-pad".27
onFocus (function (event: {nativeEvent: {eventCount: number, target: number}}) => void): Callback invoked when the input field gains focus.27
onBlur (function (event: {nativeEvent: {eventCount: number, target: number}}) => void): Callback invoked when the input field loses focus.27
selection (object { start: number, end?: number }): Programmatically controls the cursor position and selected text range. end is optional; if not provided, it defaults to start, placing the cursor. A bug related to this prop's initialization on Android for RN 0.74 was noted.52
placeholderTextColor (color): Sets the color of the placeholder text.
autoFocus (boolean): If true, the input field automatically gains focus when the component mounts. Default is false.27
blurOnSubmit (boolean): If true for single-line inputs, the keyboard is dismissed (input blurred) when the submit button is pressed. For multiline inputs, setting this to true means pressing return will blur the field and trigger onSubmitEditing instead of inserting a newline.27 This nuanced behavior, especially with multiline fields, highlights the importance of careful documentation review, as seemingly simple props can have different effects based on other configurations.
clearButtonMode (enum, iOS only): Controls when the standard clear button appears in the text field (e.g., 'never', 'while-editing', 'unless-editing', 'always').27
returnKeyType (enum): Specifies the label of the return key on the keyboard (e.g., 'done', 'go', 'next', 'search', 'send'). This can provide context to the user about the action performed upon submission.
Standard accessibility props (accessible, accessibilityLabel, etc.) are also available.
The variety of props like keyboardType, secureTextEntry, autoCapitalize, and autoCorrect exists because <TextInput> aims to provide a comprehensive, cross-platform abstraction over the diverse native keyboard functionalities and input behaviors available on iOS and Android.27 Each of these props typically maps to specific native settings (e.g., UIKeyboardType on iOS, android:inputType on Android), saving developers from writing platform-specific code for common input configurations.
Methods:
<TextInput> components expose several imperative methods that can be called on a ref to the component:
focus(): Programmatically brings focus to the input field, usually causing the keyboard to appear.27
blur(): Programmatically removes focus from the input field, usually dismissing the keyboard.27
isFocused(): Returns true if the input field is currently focused, false otherwise.
clear(): Programmatically clears all text from the input field.
"Under the Hood"
Native Mapping:
On iOS, <TextInput> typically maps to a native UITextField for single-line inputs. If multiline={true} is set, it maps to a UITextView, which is designed for handling multiple lines of text and scrolling.31 UITextField offers features like placeholder text, clear buttons, and various keyboard types. UITextView provides more extensive text editing and display capabilities.
On Android, <TextInput> maps to the native android.widget.EditText component.54 EditText is a subclass of TextView specifically designed for editable text, supporting various input types, hint text, and integration with input method editors (IMEs).54 Material Design components often wrap EditText (e.g., com.google.android.material.textfield.TextInputEditText used with TextInputLayout) to provide enhanced features like floating labels and helper text.55
Event Handling: User interactions with the native input element (keystrokes, focus changes, submission) generate native events. React Native's event system bridges these native events to the JavaScript side, where they trigger the corresponding callbacks like onChangeText, onFocus, onBlur, and onSubmitEditing.
Fabric Architecture:
In the Fabric architecture, a TextInputShadowNode would manage the properties, layout, and state of the text input. Communication with the native UITextField/UITextView or EditText for text manipulation, cursor updates, and keyboard event handling would become more direct and potentially synchronous through JSI, compared to the asynchronous bridge of the legacy architecture.56 This can lead to improved responsiveness for text input operations and more seamless integration with native input features.
Key Props Table for <TextInput>
Prop
Type
Description
value
string
The current text value of the input (for controlled components).
onChangeText
(text: string) => void
Callback invoked with the new text string when the input's content changes.
placeholder
string
Text displayed in the input when it's empty.
style
StyleProp<TextStyle>
Custom styles for the text input.
keyboardType
KeyboardTypeOptions
Specifies the type of keyboard to display (e.g., 'numeric', 'email-address').
secureTextEntry
boolean
If true, obscures entered text (for passwords).
multiline
boolean
If true, allows multiple lines of input.
onSubmitEditing
(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
Callback invoked when the keyboard's submit button is pressed.

Official Documentation Link Box
React Native TextInput: https://reactnative.dev/docs/textinput 27
React Native Handling Text Input Guide: https://reactnative.dev/docs/handling-text-input 50
React Controlled Components (Conceptual): https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable 51
iOS UITextField: https://developer.apple.com/documentation/uikit/uitextfield 53
iOS UITextView: https://developer.apple.com/documentation/uikit/uitextview 31
Android EditText:(https://developer.android.com/reference/android/widget/EditText) 54
Material Components Text Fields (Android): https://m2.material.io/components/text-fields/android 57 (Provides context on native Android text field features)
Background Bridge Notes: Text Input Handling
For Native Android/iOS Developers:
The controlled component pattern in React Native, where value is set from state and onChangeText updates that state, differs from typical native approaches. Natively, you might get text using editText.getText().toString() (Android) or textField.text (iOS) when needed, and listen for changes using TextWatcher (Android) or UITextFieldDelegate methods (iOS). React Native centralizes this state management in JavaScript.
Props like keyboardType, returnKeyType, autoCapitalize, and secureTextEntry directly map to native input configurations you'd set programmatically or via XML attributes (e.g., android:inputType, textField.keyboardType, textField.isSecureTextEntry).
For Web Developers (React/Angular):
The controlled component pattern for <TextInput> (using value and onChangeText) will be very familiar if you've worked with controlled inputs in React for the web (using value and onChange for <input> or <textarea>).51
<TextInput> serves the role of both HTML's <input> and <textarea> elements. The multiline prop differentiates between single-line and multi-line input, whereas HTML uses distinct tags.58
The keyboardType prop is analogous to the type attribute on HTML <input> elements (e.g., type="email", type="number"), influencing the virtual keyboard displayed.
Exercise 8.1: Basic Form with TextInput (Expo Snack)
(This section outlines the foundational knowledge for the exercise. The actual Expo Snack content will be developed based on these principles.)
Objective: Create a simple form with two TextInput fields (e.g., for username and password) and a submit button. Display the entered values or a confirmation message upon submission.
Key Concepts to Apply:
<View> for Layout: Use <View> components to structure the form elements (e.g., a main container, containers for each label-input pair). Apply Flexbox styles for arrangement.
<Text> for Labels: Use <Text> components to label the input fields.
<TextInput> for Input:
Implement two <TextInput> components.
Use the controlled component pattern for each:
Maintain state variables for username and password using useState.
Bind these state variables to the value prop of their respective <TextInput>.
Use the onChangeText prop to update the state variables.
Utilize placeholder props for user guidance.
Set secureTextEntry={true} for the password field.
Optionally, use keyboardType (e.g., 'email-address' for username if applicable).
<Button> or <Pressable> for Submission:
Add a button for form submission.
The onPress handler should access the current values from the state variables and perform an action (e.g., display an Alert with the entered data, or log it to the console).
StyleSheet.create for Styling: Define all styles in a StyleSheet.create block for better organization and performance.
Expo Snack Link Placeholder: ``Section 6: ScrollView (<ScrollView>) - Enabling Scrolling
The <ScrollView> component is a generic scrolling container provided by React Native that wraps the platform's native scrolling capabilities.3 Its primary purpose is to allow users to scroll through content that is larger than the physical dimensions of the screen.
Purpose and Role:
<ScrollView> is designed to hold multiple and diverse child components, such as <Text>, <Image>, and other <View> elements, arranging them in a scrollable list.60 It supports both vertical (default) and horizontal scrolling.
A critical requirement for <ScrollView> to function correctly is that it must have a bounded height (or width, for horizontal scrolling).3 Since <ScrollView> contains children of potentially unbounded height within a bounded container, the container itself needs to know its own dimensions. This can be achieved by setting a direct height style on the <ScrollView> (generally discouraged for responsiveness) or, more commonly, by ensuring that all its parent views have bounded heights, often by using flex: 1 to allow the <ScrollView> to expand and fill the available space within a flex container.59 Forgetting this is a frequent source of issues where the ScrollView might not appear or not scroll as expected. This requirement arises because native scrolling views (like UIScrollView on iOS and android.widget.ScrollView on Android) need a defined frame to calculate the scrollable content area relative to their viewport. If the <ScrollView> itself has no defined height, the underlying native view won't know its viewport size, leading to incorrect behavior.
Key Props for <ScrollView>:
children (ReactNode): The content to be made scrollable. These are rendered all at once.
horizontal (boolean): If true, children are arranged in a row and scrolling is horizontal. Default is false (vertical scrolling).59
showsHorizontalScrollIndicator (boolean): When true (default), displays the horizontal scroll indicator during scrolling.
showsVerticalScrollIndicator (boolean): When true (default), displays the vertical scroll indicator.
style (StyleProp<ViewStyle>): Styles applied to the <ScrollView> container itself.
contentContainerStyle (StyleProp<ViewStyle>): Styles applied to the inner view that wraps all the child components. This is useful for adding padding around the content, or for using Flexbox properties to align children within the scrollable area (e.g., alignItems: 'center' for horizontally centered content in a vertical scroll view).62
keyboardDismissMode (enum: 'none' (default), 'on-drag', 'interactive' (iOS only)): Determines how the keyboard is dismissed when a drag gesture begins on the scroll view.59
'none': Drags do not dismiss the keyboard.
'on-drag': The keyboard is dismissed when a drag begins.
'interactive' (iOS): The keyboard is dismissed interactively with the drag.
keyboardShouldPersistTaps (enum: 'never' (default), 'always', 'handled'): Controls whether taps on the scroll view (while the keyboard is up) are handled by the scroll view (potentially dismissing the keyboard) or by its children.59 This is important for forms within scrollable content.
pagingEnabled (boolean): If true, the scroll view snaps to multiples of its own size when scrolling. This is useful for creating swipeable page-like carousels.60
refreshControl (element): Accepts a <RefreshControl> component instance to add "pull-to-refresh" functionality. Only works for vertical scroll views (horizontal={false}).63
stickyHeaderIndices (array of numbers): An array of child indices that will cause those children to "stick" to the top of the <ScrollView>'s viewport as content is scrolled beneath them, until pushed off by the next sticky header.59
onScroll (function (event: NativeSyntheticEvent<NativeScrollEvent>) => void): A callback that is invoked frequently during scrolling. The event.nativeEvent object contains details like contentOffset: {x, y}, contentSize: {width, height}, layoutMeasurement: {width, height}, and zoomScale (iOS).
scrollEventThrottle (number, iOS only default is 0, Android default is 16ms): Controls how often the onScroll event is fired while scrolling, in milliseconds. Lower values mean more frequent events.
decelerationRate (enum/number: 'fast', 'normal', or a custom float value): A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. 'normal' is 0.998 on iOS and 0.985 on Android. 'fast' is 0.99 on iOS and 0.9 on Android.59
snapToInterval (number): When set, causes the scroll view to snap to multiples of this value. Often used with snapToAlignment and decelerationRate="fast".
snapToAlignment (enum: 'start', 'center', 'end'): Defines the alignment of the snap points when snapToInterval is used. Default is 'start'.59
bounces (boolean, iOS only): When true (default), the scroll view bounces when it reaches the end of the content if the content is larger than the scroll view. Setting to false disables all bouncing.63
overScrollMode (enum, Android only: 'auto' (default), 'always', 'never'): Configures the behavior when the user over-scrolls the content.59
scrollEnabled (boolean): When false, scrolling is disabled. Default is true.
nestedScrollEnabled (boolean, Android only): Enables/disables nested scrolling for Android API level 21+.
Props like keyboardDismissMode and keyboardShouldPersistTaps indicate that <ScrollView> is designed to interact intelligently with the keyboard. This is a common requirement in UIs like forms or chat interfaces where scrollable content coexists with text inputs, showcasing a deeper level of platform integration beyond simple content scrolling.59
Performance Considerations:
A key characteristic of <ScrollView> is that it renders all its child components at once, regardless of whether they are currently visible on the screen.59
This makes <ScrollView> simple and suitable for a small number of items or content that isn't excessively long.60
However, for long lists or large datasets, this behavior can lead to performance issues, including slow initial render times, high memory consumption, and janky scrolling, because the framework has to process and hold all child views in memory.61
For displaying long lists of data, components like <FlatList> or <SectionList> are strongly recommended. These components use virtualization, meaning they only render items that are currently (or about to be) visible in the viewport, significantly improving performance and memory efficiency.60 This "render-all" vs. "virtualization" is the single most important factor when choosing between <ScrollView> and list components.
Methods:
<ScrollView> instances have methods that can be called via a ref:
scrollTo(options: { x?: number, y?: number, animated?: boolean }): Scrolls to a specific x, y offset within the scrollable content. animated (default true) controls if the scroll is animated.63
scrollToEnd(options?: { animated?: boolean }): Scrolls to the end of the content. animated (default true) controls the animation.63
flashScrollIndicators(): Briefly makes the scroll indicators visible.63
"Under the Hood"
Native Mapping:
On iOS, <ScrollView> wraps the native UIScrollView class. Many of its props (e.g., bounces, decelerationRate, pagingEnabled, zoomScale-related props not detailed here but available) directly correspond to UIScrollView properties and behaviors.62
On Android, <ScrollView> wraps the native android.widget.ScrollView for vertical scrolling and android.widget.HorizontalScrollView for horizontal scrolling. Props like overScrollMode and fadingEdgeLength are specific to Android's native scrolling views.62
Touch System Integration:
<ScrollView> integrates with React Native's gesture responder system to manage touch interactions and determine when a touch gesture should initiate a scroll, versus being handled by a child component.59 The disableScrollViewPanResponder prop can be used to give full touch control to children in specific cases, like when snapToInterval is used.59
Fabric Architecture:
In the Fabric architecture, a ScrollViewShadowNode would exist to manage layout and props from the JavaScript side. The actual scrolling mechanics (physics, gesture handling) are primarily managed by the underlying native UIScrollView or android.widget.ScrollView. Fabric's role would be to improve the efficiency of communication for prop updates (e.g., changing contentContainerStyle dynamically) and event bridging (e.g., onScroll events). Issues like the one noted in 66 regarding contentOffset and animated styles on Android with Fabric suggest that the integration of complex components like ScrollView into the new architecture involves intricate details and ongoing refinements. The ScrollView in react-native-reanimated is often a wrapper around the core ScrollView to enable animated interactions.
Key Props Table for <ScrollView>
Prop
Type
Description
children
React.ReactNode
The content to be made scrollable.
style
StyleProp<ViewStyle>
Styles for the ScrollView container itself. Must ensure a bounded height/width.
contentContainerStyle
StyleProp<ViewStyle>
Styles applied to the inner content container that wraps all children. Useful for padding or aligning content.
horizontal
boolean
If true, children are arranged and scrolled horizontally. Default false.
showsVerticalScrollIndicator
boolean
Toggles visibility of the vertical scroll indicator. Default true.
showsHorizontalScrollIndicator
boolean
Toggles visibility of the horizontal scroll indicator. Default true.
onScroll
(event: NativeSyntheticEvent<NativeScrollEvent>) => void
Callback invoked frequently during scrolling. Provides contentOffset, contentSize, etc.
keyboardDismissMode`'none' \
'on-drag' \

Official Documentation Link Box
React Native ScrollView: https://reactnative.dev/docs/scrollview 59
React Native Using a ScrollView Guide: https://reactnative.dev/docs/using-a-scrollview 60
iOS UIScrollView: https://developer.apple.com/documentation/uikit/uiscrollview
Android ScrollView:(https://developer.android.com/reference/android/widget/ScrollView)
Android HorizontalScrollView:(https://developer.android.com/reference/android/widget/HorizontalScrollView)
Background Bridge Notes: Scrolling Paradigms
For Native Android/iOS Developers:
<ScrollView> is conceptually very similar to UIScrollView on iOS and ScrollView/HorizontalScrollView on Android. You configure its behavior (scrolling direction, indicators, bouncing, paging) via props in JavaScript rather than setting properties directly on the native view objects.
The requirement for a bounded height/width for <ScrollView> mirrors how native scroll views need a defined frame to function correctly within a layout.
Features like refreshControl (for pull-to-refresh) and stickyHeaderIndices provide JavaScript-based abstractions for common native scrolling patterns.
For Web Developers (React/Angular):
<ScrollView> is React Native's equivalent to making a <div> scrollable using CSS overflow: scroll or overflow: auto.67 However, React Native does not use the overflow CSS property for this purpose; you must use a dedicated scroll component like <ScrollView>. While overflow: 'scroll' might have some limited effect on a <View> in some contexts (especially React Native for Web), it's not the standard way to enable scrolling for general content in mobile.67
The direction of scroll (vertical or horizontal) is explicitly controlled by the horizontal prop, unlike CSS where scroll direction is typically inferred from content overflow and fixed dimensions.
The performance characteristic of rendering all children at once is a key difference from how browsers handle very long scrollable content (which might involve some level of optimization, though not as explicitly managed as React Native's FlatList).
Section 7: StyleSheet API - Basic Styling
In React Native, styling is accomplished using JavaScript. The StyleSheet API is the primary mechanism provided by the framework for defining and managing styles for components.32 Its core method, StyleSheet.create(), is used to define a collection of named style objects.
Purpose of StyleSheet.create:
The main reasons for using StyleSheet.create() are:
Performance Optimization: When styles are defined with StyleSheet.create(), React Native can optimize their handling. Instead of passing plain JavaScript style objects (which might be re-created on every render) over the bridge to the native side repeatedly, these styles are typically assigned a unique ID. This ID is then sent over the bridge only once, and the native side can reference the full style object from its registry.68 This reduces the amount of data serialized and transferred, especially for static styles, leading to better rendering performance compared to inline styles or plain objects that change identity on each render. While this was particularly crucial for the legacy bridge, the principle of efficient referencing and minimizing redundant data remains beneficial even with the New Architecture's JSI.
Code Organization and Readability: Moving style definitions out of the component's render function and into a StyleSheet.create() block significantly improves code clarity.32 Assigning meaningful names to styles (e.g., styles.container, styles.titleText) makes the JSX markup cleaner and easier to understand, as it separates presentation concerns from component logic.
Validation and Static Analysis: StyleSheet.create() helps in catching errors related to style properties or values during development. When used with type systems like TypeScript or Flow, it can provide static type checking, ensuring that only valid style properties and values are used, and offering autocompletion for style attributes.71
Syntax and Usage:
JavaScript Objects: Styles are defined as JavaScript objects where keys are style rule names and values are objects containing style properties.
JavaScript
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'white',
},
text: {
fontSize: 16,
color: 'black',
},
});
68
CamelCase Properties: CSS property names are written in camelCase in JavaScript (e.g., backgroundColor instead of background-color, fontSize instead of font-size).32
Applying Styles:
Styles are applied to components using the style prop: <View style={styles.container} />.68
Multiple styles can be applied by passing an array to the style prop: <Text style={} />. Styles are merged from left to right, with later styles in the array overriding earlier ones if they define the same properties.68 This is useful for conditional styling or composing styles from multiple sources.
JavaScript
<View style={} />

Common Style Properties (Overview):
React Native supports a subset of CSS properties, adapted for the mobile context.
Flexbox Properties: Fundamental for layout. Key properties include flex (defines how an item should grow or shrink), flexDirection ('row', 'column'), justifyContent (alignment along the main axis), alignItems (alignment along the cross axis), alignSelf, flexWrap. 14
Dimensions: width, height, minWidth, maxWidth, minHeight, maxHeight. Values are typically unitless numbers (representing density-independent pixels) or percentage strings (e.g., '50%').14
Margins & Paddings: margin, marginTop, marginRight, marginBottom, marginLeft, marginHorizontal, marginVertical. Similar properties exist for padding. Values are unitless numbers.14
Colors & Backgrounds: color (for text color), backgroundColor.73 Colors can be specified as hex codes (e.g., '#RRGGBB', '#AARRGGBB'), rgb(), rgba(), hsl(), hsla(), or predefined color names.
Borders: borderWidth, borderColor, borderRadius. Specific side variants like borderTopWidth, borderLeftColor, borderTopLeftRadius are also available.73 borderStyle ('solid', 'dotted', 'dashed').
Text Styles: Properties like fontSize, fontWeight, fontStyle, fontFamily, textAlign, lineHeight, textDecorationLine are applied to the style prop of <Text> components.26
Transforms: The transform style prop accepts an array of transformation objects, each specifying a single transform function and its value (e.g., { translateX: 10 }, { scale: 0.5 }, { rotate: '45deg' }).73 Common transforms include:
translateX, translateY: Move along X or Y axis.
scale, scaleX, scaleY: Scale uniformly or along a specific axis.
rotate, rotateX, rotateY, rotateZ: Rotate around Z (2D), X, Y, or Z axis (3D perspective). Angles are strings (e.g., '30deg', '1.57rad').
Positioning: position can be 'relative' (default) or 'absolute'. When 'absolute', elements are positioned using top, left, bottom, right relative to their first non-statically positioned ancestor.14
zIndex (number): Controls the stacking order of positioned elements. Higher zIndex appears on top.
opacity (number between 0 and 1): Controls the transparency of an element.
Other StyleSheet APIs:
StyleSheet.flatten(style): Takes an array of style objects (or registered style IDs) and merges them into a single plain JavaScript object. This can be useful for debugging, passing styles to components that don't accept arrays, or when needing to introspect style values. However, using it excessively can negate some performance optimizations by bypassing the ID referencing system.68
StyleSheet.compose(style1, style2): Combines two style objects. style2 will override any conflicting properties in style1. Returns one of the styles if the other is falsy, avoiding unnecessary array allocation.68
StyleSheet.absoluteFill: A predefined style object equivalent to { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }. Useful for creating overlays that fill their parent.68
StyleSheet.absoluteFillObject: The same as absoluteFill, but provided as a plain object, useful for spreading into other style objects or for use with StyleSheet.create(). 68
StyleSheet.hairlineWidth: A constant representing the thinnest possible line width that can be drawn on the current device (typically 1 physical pixel, but represented as a density-independent pixel value). Useful for creating subtle borders or separators.68
"Under the Hood": How StyleSheet Translates to Native Styles:
When StyleSheet.create() is used, React Native processes these JavaScript style objects.
ID Assignment & Caching: For styles defined in StyleSheet.create(), React Native typically assigns a unique ID to each style rule object. These style objects and their IDs are registered.
Bridge Transmission: When a component renders with a style like styles.myStyle, instead of sending the entire JavaScript style object over the bridge (in the legacy architecture) for every instance of that style, React Native often sends just the pre-computed ID.68 The native side (UIManager) maintains a registry of these styles and can look up the full style definition using the ID. This significantly reduces the amount of data that needs to be serialized and sent from JavaScript to native, especially for frequently used static styles.
Native Translation: The native rendering system (UIManager in legacy, or Fabric's rendering pipeline) takes these style definitions (whether resolved by ID or passed as inline objects for dynamic styles) and translates them into the corresponding native view properties or layout parameters.
For example, a style like { backgroundColor: 'blue', width: 100 } applied to a <View> would instruct the native side to create/update a UIView (iOS) or android.view.View (Android) and set its background color property and its width.
Flexbox styles (e.g., flex: 1, alignItems: 'center') are interpreted by the Yoga layout engine.20 Yoga calculates the positions and sizes of all elements based on these Flexbox rules. The results of Yoga's calculations (frames: x, y, width, height) are then applied to the corresponding native views. In the New Architecture with Fabric and JSI, while the bridge bottleneck is largely eliminated, the principle of efficiently defining and referencing styles remains important for performance. Styles are still processed and applied to shadow nodes, which then inform the native view updates.
The styling system in React Native represents a deliberate convergence and simplification of styling paradigms. It draws inspiration from web CSS (especially Flexbox) but is heavily adapted for the native mobile context and performance considerations. It is not "CSS on mobile" but a distinct system tailored for the framework's architecture. This involves JavaScript objects, camelCase property names, a primary focus on Flexbox for layout, and different inheritance rules.32 Convenience constants like StyleSheet.absoluteFill and StyleSheet.hairlineWidth demonstrate an API design that is not just functional but also considerate of common developer needs, aiming to improve developer experience by reducing boilerplate for frequent styling patterns.68
Key StyleSheet API Table
API Element
Type
Description
StyleSheet.create()
(styles: T) => T
Primary method to define named style objects. Optimizes styles and provides validation.
StyleSheet.flatten()
`(style?: StyleProp<T>) => T \
undefined`
StyleSheet.compose()
(style1?: StyleProp<T>, style2?: StyleProp<T>) => StyleProp<T>
Combines two styles, with style2 overriding style1.
StyleSheet.absoluteFill
RegisteredStyle<ViewStyle>
A pre-registered style object for { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }.
StyleSheet.absoluteFillObject
ViewStyle
A plain object version of absoluteFill.
StyleSheet.hairlineWidth
number
A constant for the thinnest possible line width on the current device.

Official Documentation Link Box
React Native StyleSheet: https://reactnative.dev/docs/stylesheet 68 (Latest version, content based on 0.74 where specified)
React Native Style Prop: https://reactnative.dev/docs/style 70
React Native Layout Props (Flexbox): https://reactnative.dev/docs/layout-props 14
React Native Transforms: https://reactnative.dev/docs/transforms 74
MDN CSS Documentation (for general CSS concepts):(https://developer.mozilla.org/en-US/docs/Web/CSS)
Background Bridge Notes: Styling Paradigms
For Native Android Developers: 22
React Native's StyleSheet approach using JavaScript objects is fundamentally different from Android's XML-based styling system, which involves <style> resources in styles.xml, themes defined in themes.xml, and layout attributes directly in XML layout files (e.g., android:layout_width, android:textColor, android:background).
There's no direct, built-in equivalent to Android's powerful theme system for global styling in React Native. Theming is typically achieved through custom solutions using React Context, higher-order components, or theming libraries that pass style configurations down the component tree.22
Units in React Native are primarily density-independent pixels by default (unitless numbers), abstracting away Android's dp (density-independent pixels) and sp (scale-independent pixels).22 While percentages are supported for some properties, the fine-grained control over different density buckets (mdpi, hdpi, etc.) via resource qualifiers is handled differently; React Native's asset system (@2x, @3x images) and Flexbox are used for responsiveness.
Android's resource qualifier system (e.g., layout-sw600dp, values-land) for adapting UIs to different screen sizes, orientations, and languages does not have a direct counterpart in React Native's styling. Responsiveness is primarily achieved using Flexbox, percentage dimensions, and the Dimensions or useWindowDimensions APIs to adapt layouts programmatically.
For Native iOS Developers: 14
React Native StyleSheet offers a JavaScript-based declarative approach, contrasting with programmatic styling in UIKit (e.g., setting UIView.frame, view.backgroundColor, or defining Auto Layout constraints in Swift/Objective-C) and the visual approach of Interface Builder/Storyboards.
Compared to SwiftUI's Modifiers, React Native styling is also declarative but syntactically different. SwiftUI applies styles using a chain of modifier methods (e.g., Text("Hello").padding().background(Color.blue)).78 React Native uses a single style prop that accepts a JavaScript object or an array of objects. Both achieve declarative UI styling, but the expression and application differ.
Auto Layout's constraint-based system is powerful for defining complex relationships between views. React Native's Flexbox, while different, provides its own robust system for defining flexible and adaptive layouts.
For Web Developers (React/Angular): 32
StyleSheet in React Native is JavaScript-based, unlike traditional CSS files or even many CSS-in-JS libraries on the web that might allow writing actual CSS syntax within template literals.
No True Cascading: A major difference is the absence of CSS-style cascading. Styles applied to a parent <View> are not automatically inherited by child <View> or <Text> components (with the limited exception of <Text>-to-<Text> style inheritance for text-specific properties like color and fontFamily).32 Each component generally needs to be styled explicitly.
Property Naming: Style properties use camelCase (e.g., backgroundColor) instead of kebab-case (background-color) common in CSS.32
Units: React Native primarily uses unitless numbers, which are interpreted as density-independent pixels. Percentages (as strings, e.g., '50%') are supported for some properties like width and height. This differs from the wide array of units in CSS (px, em, rem, vw, vh, etc.).
Selectors and Pseudo-classes: React Native does not support CSS selectors (like class selectors, ID selectors, attribute selectors) or pseudo-classes (:hover, :focus) and pseudo-elements (::before, ::after) directly in its styling system.72 Interactions like hover or focus are typically handled by managing state and conditionally applying styles using JavaScript.
Flexbox is the default and primary layout system, and its implementation in React Native is very close to the CSS Flexbox standard, making it a familiar tool for web developers.
Table: React Native Style Property vs. CSS Equivalent
React Native Style (camelCase)
CSS Equivalent (kebab-case)
Notes
backgroundColor
background-color

color
color
(For <Text> components)
fontSize
font-size
Unitless number in RN (dp), various units in CSS (px, em, rem).
fontWeight
font-weight
Supports 'normal', 'bold', and string/number weights like '400', 500.
margin
margin
Single value applies to all sides. Specific sides: marginTop, marginLeft, etc.
padding
padding
Single value applies to all sides. Specific sides: paddingTop, paddingLeft, etc.
width, height
width, height
Unitless number (dp) or percentage string (e.g., '50%') in RN.
flex
flex
In RN, typically a single number (e.g., flex: 1).
flexDirection
flex-direction
Default is 'column' in RN, 'row' in web CSS.
alignItems
align-items

justifyContent
justify-content

borderRadius
border-radius
Single value applies to all corners. Specific corners: borderTopLeftRadius, etc.
borderWidth
border-width
Single value applies to all sides. Specific sides: borderTopWidth, etc.
position: 'absolute'
position: absolute;

transform: [{ translateX: 10 }]
transform: translateX(10px);
RN transform is an array of objects. CSS transform is a space-separated list of functions. Angles in strings (e.g. '45deg').

Exercise 8.2: Applying Styles with StyleSheet (Expo Snack)
(This section outlines the foundational knowledge for the exercise. The actual Expo Snack content will be developed based on these principles.)
Objective: Create a simple UI layout with a few <View> and <Text> components and style them using StyleSheet.create. Demonstrate the use of Flexbox for layout, and apply various style properties like colors, margins, paddings, and borders.
Key Concepts to Apply:
Import StyleSheet: From react-native.
Create a Styles Object: Use StyleSheet.create({...}) to define named style rules.
Define a main container style (e.g., using flex: 1 to fill the screen, backgroundColor, padding).
Define styles for child <View> elements (e.g., box style with width, height, margin, backgroundColor).
Define styles for <Text> elements (e.g., titleText with fontSize, fontWeight, color, textAlign).
Apply Styles:
Apply the container style to a root <View>.
Create several child <View> components and apply the box style.
Use Flexbox properties (e.g., flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center') on a parent <View> to arrange the "boxes".
Place <Text> components inside the boxes or container and apply text styles.
Demonstrate Style Merging (Optional): Create a variation of a box or text style and apply it using an array: style={}.
Use StyleSheet.hairlineWidth (Optional): Apply a very thin border to one of the elements.
Expo Snack Link Placeholder: ``
Section 8: Button and Pressable (<Button>, <Pressable>) - Handling Taps
React Native provides several ways to handle user tap interactions, primarily through the <Button> and <Pressable> core components. While <Button> offers simplicity for standard use cases, <Pressable> provides a more flexible and customizable foundation for touch interactions.
<Button> Component:
The <Button> component is a basic, platform-rendered button that aims to provide a native look and feel with minimal configuration.3 It's suitable for scenarios where a standard platform button is sufficient and extensive customization is not required.
Purpose: To render a simple, tappable button that triggers an action.83
Key Props:
title (string, required): The text to display inside the button. On Android, the title is automatically converted to uppercase.83
onPress (function, required): A callback function that is invoked when the user taps the button. This function receives a PressEvent object.83
color (string): This prop's behavior differs by platform:
iOS: Sets the color of the button's text.83
Android: Sets the background color of the button. The default is '#2196F3'.83
disabled (boolean): If true, the button is visually disabled, and all interactions are blocked. Default is false.83
accessibilityLabel (string): Text used by screen readers to describe the button, enhancing accessibility. It is recommended to set this prop.83
touchSoundDisabled (boolean, Android only): If true, disables the default system sound played on touch. Default is false.83
TV-specific props like hasTVPreferredFocus and nextFocus\* (Android TV) are also available for controlling focus in TV environments.83
Styling Limitations: The <Button> component offers very limited styling capabilities. Beyond the color prop, you cannot directly apply custom styles (like padding, margin, font styles, or complex background) using the style prop as you would with a <View> or <Text>.83 If extensive customization is needed, <Pressable> is the recommended alternative.83
Platform Differences: The most notable platform differences are the behavior of the color prop and the automatic uppercasing of the title on Android.83
<Pressable> Component:
Introduced in React Native 0.63, the <Pressable> component is a more versatile and highly customizable Core Component wrapper designed to detect various stages of press interactions on its children.3 It is now generally the recommended option for handling touch-based input and creating custom interactive elements due to its flexibility.84
Purpose: To make any of its child content (which can be a single component or a tree of components) respond to press gestures, providing detailed feedback and control over the interaction states.86
\*\*Key
Works cited
Understanding React Native Components - Thoughtbot, accessed May 12, 2025, https://thoughtbot.com/blog/understanding-react-native-components
Learn the Basics - React Native, accessed May 12, 2025, https://reactnative.dev/docs/tutorial
React Native - 15 Core Components - DEV Community, accessed May 12, 2025, https://dev.to/himanshuaggar/react-native-15-core-components-2ifg
Top 5 React Native UI Components in 2025 - BrowserStack, accessed May 12, 2025, https://www.browserstack.com/guide/react-native-ui-components
React Native UI Libraries vs. React Native Elements: Which One to Choose - Creole Studios, accessed May 12, 2025, https://www.creolestudios.com/react-native-ui-libraries-vs-elements/
Your First Component - React, accessed May 12, 2025, https://react.dev/learn/your-first-component
Components and Props - React, accessed May 12, 2025, https://legacy.reactjs.org/docs/components-and-props.html
View - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/view
View - React Native, accessed May 12, 2025, https://reactnative.dev/docs/view
React vs. React Native: What are the differences? | Hygraph, accessed May 12, 2025, https://hygraph.com/blog/react-vs-react-native
Advanced React Native - ViewGroupManager in Android, accessed May 12, 2025, https://cuneyt.aliustaoglu.biz/en/advanced-react-native-viewgroupmanager-android/
Breaking down the Difference Between React, ReactJS, and React ..., accessed May 12, 2025, https://dev.to/brilworks/breaking-down-the-difference-between-react-reactjs-and-react-native-4d2m
Layout with Flexbox - React Native Archive, accessed May 12, 2025, https://archive.reactnative.dev/docs/flexbox
Layout with Flexbox - React Native, accessed May 12, 2025, https://reactnative.dev/docs/flexbox
View Style Props - React Native, accessed May 12, 2025, https://reactnative.dev/docs/view-style-props
Deep Dive into React Native's New Architecture: JSI, TurboModules, Fabric & YogaSQL Databases in Fabric? - ESPC Conference, 2025, accessed May 12, 2025, https://www.sharepointeurope.com/deep-dive-into-react-natives-new-architecture-jsi-turbomodules-fabric-yoga/
Understanding React Native's New Architecture: Fabric and TurboModules Explained, accessed May 12, 2025, https://metadesignsolutions.com/understanding-react-natives-new-architecture-fabric-and-turbomodules-explained/
Render, Commit, and Mount · React Native, accessed May 12, 2025, https://reactnative.dev/architecture/render-pipeline
React Native Fabric: How It Enhances Mobile Development?, accessed May 12, 2025, https://www.bacancytechnology.com/blog/react-native-fabric
What is Fabric in React Native and how does it work? - DianApps, accessed May 12, 2025, https://dianapps.com/blog/what-is-fabric-in-react-native-and-how-does-it-work/
How does React Native's New Architecture affect performance? - DEV Community, accessed May 12, 2025, https://dev.to/amazonappdev/how-does-react-natives-new-architecture-affect-performance-1dkf
An Android Developer's Guide to React Native - DEV Community, accessed May 12, 2025, https://dev.to/amazonappdev/an-android-developers-guide-to-react-native-j66
Text · React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/text
Universal Native Apps with React Native - JBS Dev, accessed May 12, 2025, https://www.jbs.dev/resources/resource-center/blog/universal-native-apps-with-react-native/
Text // React Native for Web, accessed May 12, 2025, https://necolas.github.io/react-native-web/docs/text/
Text Style Props · React Native, accessed May 12, 2025, https://reactnative.dev/docs/text-style-props
TextInput · React Native, accessed May 12, 2025, https://reactnative.dev/docs/textinput
bluesky-social/react-native-uitextview: A UITextView ... - GitHub, accessed May 12, 2025, https://github.com/bluesky-social/react-native-uitextview
Experiment With the New Architecture of React Native | {callstack}, accessed May 12, 2025, https://www.callstack.com/blog/experiment-with-new-architecture-of-react-native
About the New Architecture - React Native, accessed May 12, 2025, https://reactnative.dev/architecture/landing-page
UITextView | Apple Developer Documentation, accessed May 12, 2025, https://developer.apple.com/documentation/uikit/uitextview
Styling in React Native: A Beginner's Guide to Using StyleSheet for Cl - hashnode.dev, accessed May 12, 2025, https://janellgames.hashnode.dev/styling-in-react-native-with-stylesheet-a-beginners-guide
Image - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.70/image
Image · React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/image
Images · React Native, accessed May 12, 2025, https://reactnative.dev/docs/images
React Native Images - Tutorialspoint, accessed May 12, 2025, https://www.tutorialspoint.com/react_native/react_native_images.htm
Props - React Native, accessed May 12, 2025, https://reactnative.dev/docs/props
Image Style Props - React Native, accessed May 12, 2025, https://reactnative.dev/docs/image-style-props
UIImageView | Apple Developer Documentation, accessed May 12, 2025, https://developer.apple.com/documentation/uikit/uiimageview
Working with the ImageView | CodePath Android Cliffnotes, accessed May 12, 2025, https://guides.codepath.com/android/Working-with-the-ImageView
Image - React Native, accessed May 12, 2025, https://reactnative.dev/docs/image
Optimizing Image Loading in React Native Apps | MoldStud, accessed May 12, 2025, https://moldstud.com/articles/p-optimizing-image-loading-in-react-native-apps
Image - Expo Documentation, accessed May 12, 2025, https://docs.expo.dev/versions/latest/sdk/image/
Purposes of UIView, UIImage, UIImageView - General Discussion ..., accessed May 12, 2025, https://codecrew.codewithchris.com/t/purposes-of-uiview-uiimage-uiimageview/17522
ImageView.ScaleType Class (Android.Widget) | Microsoft Learn, accessed May 12, 2025, https://learn.microsoft.com/en-us/dotnet/api/android.widget.imageview.scaletype?view=net-android-34.0
A Deep Dive into React Native's New Architecture: Fabric and TurboModules - Hypecode, accessed May 12, 2025, https://hypecode.tech/en/blog/deep-dive-into-react-native-new-architecture-fabric-and-turbomodules
React Native New Architecture - DEV Community, accessed May 12, 2025, https://dev.to/hellonehha/react-native-new-architecture-1hao
React vs HTML – Can You Spot a Difference? - UXPin, accessed May 12, 2025, https://www.uxpin.com/studio/blog/react-vs-html/
What is the difference between using img tag src attribute in HTML to display image and styling it in CSS? - Stack Overflow, accessed May 12, 2025, https://stackoverflow.com/questions/29313592/what-is-the-difference-between-using-img-tag-src-attribute-in-html-to-display-im
Handling Text Input - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/handling-text-input
– React, accessed May 12, 2025, https://react.dev/reference/react-dom/components/input
[0.74] 'selection' prop does not work on Android on TextInput component initialization · Issue #283 · reactwg/react-native-releases - GitHub, accessed May 12, 2025, https://github.com/reactwg/react-native-releases/issues/283
UITextFieldDelegate | Apple Developer Documentation, accessed May 12, 2025, https://developer.apple.com/documentation/uikit/uitextfielddelegate
EditText Class (Android.Widget) - Learn Microsoft, accessed May 12, 2025, https://learn.microsoft.com/en-us/dotnet/api/android.widget.edittext?view=net-android-35.0
TextInputEditText | API reference - Android Developers, accessed May 12, 2025, https://developer.android.com/reference/com/google/android/material/textfield/TextInputEditText
Fabric Architecture in React Native - Tutorialspoint, accessed May 12, 2025, https://www.tutorialspoint.com/how-does-the-fabric-architecture-work-in-react-native
Text fields - Material Design, accessed May 12, 2025, https://m2.material.io/develop/android/components/text-fields/
Handling Multi-Line Text Input in React Textarea - DhiWise, accessed May 12, 2025, https://www.dhiwise.com/post/how-to-handle-multi-line-text-input-with-react-textarea
ScrollView - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/scrollview
Using a ScrollView - React Native, accessed May 12, 2025, https://reactnative.dev/docs/using-a-scrollview
When to Use FlatList Instead of ScrollView in React Native - DEV ..., accessed May 12, 2025, https://dev.to/paulocappa/when-to-use-flatlist-instead-of-scrollview-in-react-native-9m1
ScrollView - React Native, accessed May 12, 2025, https://reactnative.dev/docs/scrollview
ScrollView - React Native Archive, accessed May 12, 2025, https://archive.reactnative.dev/docs/scrollview
React Native: ScrollView vs. FlatList vs. SectionList | by Niall Maher - Codú, accessed May 12, 2025, https://www.codu.co/articles/react-native-scrollview-vs-flatlist-vs-sectionlist-q7mso8v_
Maximizing Performance in React Native (+ Expo), accessed May 12, 2025, https://koptional.com/resource/optimizing-react-native-expo/
[Android][Fabric] ScrollView's contentOffset resets to initial value on re-render when style={...} changes (with animated height style) · Issue #7453 · software-mansion/react-native-reanimated - GitHub, accessed May 12, 2025, https://github.com/software-mansion/react-native-reanimated/issues/7453
React Native Overflow And Scroll, accessed May 12, 2025, https://stackoverflow.com/questions/39722439/react-native-overflow-and-scroll
StyleSheet - React Native, accessed May 12, 2025, https://reactnative.dev/docs/0.74/stylesheet
How React Native Works - Digitalya, accessed May 12, 2025, https://digitalya.co/blog/how-react-native-works/
Style - React Native, accessed May 12, 2025, https://reactnative.dev/docs/style
StyleSheet - React Native, accessed May 12, 2025, https://reactnative.dev/docs/stylesheet
Styling // React Native for Web - GitHub Pages, accessed May 12, 2025, https://necolas.github.io/react-native-web/docs/styling/
Supported style properties | React Native Reanimated, accessed May 12, 2025, https://docs.swmansion.com/react-native-reanimated/docs/next/guides/supported-properties/
Transforms · React Native, accessed May 12, 2025, https://reactnative.dev/docs/transforms
StyleSheet // React Native for Web, accessed May 12, 2025, https://necolas.github.io/react-native-web/docs/style-sheet/
Layout Props - React Native, accessed May 12, 2025, https://reactnative.dev/docs/layout-props
An Android developer's guide to React Native, accessed May 12, 2025, https://developer.amazon.com/apps-and-games/blogs/2025/04/react-native-for-android-developers
SwiftUI vs UIKit: iOS Development Comparison - 2025 : Aalpha, accessed May 12, 2025, https://www.aalpha.net/blog/swiftui-vs-uikit-comparison/
Is Swift dramatically better than React Native? : r/iOSProgramming - Reddit, accessed May 12, 2025, https://www.reddit.com/r/iOSProgramming/comments/1i2ytge/is_swift_dramatically_better_than_react_native/
RANT: Styling in React Native is so behind compared to the "web", are there any universally liked and used tools for it? - Reddit, accessed May 12, 2025, https://www.reddit.com/r/reactnative/comments/1jrxx2j/rant_styling_in_react_native_is_so_behind/
JetpackCompose vs React vs SwiftUI - Compare Declarative UI Frameworks, accessed May 12, 2025, https://www.jetpackcompose.app/compare-declarative-frameworks/JetpackCompose-vs-React-vs-SwiftUI
SwiftUI vs Jetpack Compose, React Native and Other Alternatives | MetaCTO, accessed May 12, 2025, https://www.metacto.com/blogs/swiftui-alternatives-and-competitors-a-comprehensive-comparison-in-2023
Button - React Native, accessed May 12, 2025, https://reactnative.dev/docs/button
Crafting a Custom Button Component in React Native - DEV Community, accessed May 12, 2025, https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj
React Native: Touchable Opacity vs Button Element Explained - hashnode.dev, accessed May 12, 2025, https://syeddayimshah.hashnode.dev/react-native-touchable-opacity-vs-button-element-explained
Reason React Native Pressable, accessed May 12, 2025, https://reason-react-native.github.io/en/docs/components/Pressable/
dev.to, accessed May 12, 2025, https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj#:~:text=Differences%20Between%20Touchable%20Components&text=While%20Button%20offers%20simplicity%20by,to%20handle%20touch%2Dbased%20input.
