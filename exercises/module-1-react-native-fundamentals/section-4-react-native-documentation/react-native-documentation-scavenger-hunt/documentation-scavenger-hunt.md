# React Native Documentation Scavenger Hunt

## Form Overview
This Microsoft Forms scavenger hunt tests students' ability to navigate the React Native documentation efficiently and find specific information about components, APIs, and best practices.

## Form Configuration
- **Title**: React Native Documentation Scavenger Hunt
- **Description**: Practice finding specific information in the React Native documentation that will be essential for your future development work.
- **Settings**:
  - Show progress: Yes
  - One response per person: Yes
  - Record name: Yes

## Form Structure

### Introduction Section
**Title**: Documentation Search Strategies
**Text**: 
In this scavenger hunt, you'll practice finding specific information in the React Native documentation. For each challenge, try to use a different search strategy:
- Built-in documentation search
- Navigation through documentation sections
- Google with site-specific search (site:reactnative.dev)
- Following links between related topics
- Checking community resources

For each challenge, record the exact location where you found the information, the search strategy you used, and a brief summary of what you found.

### Challenge 1: Image Component Loading States

**Question Type**: Long Answer Text
**Question**: 
Find the props for the `Image` component that handle loading states and placeholders. What are they called, and how would you use them to show a loading indicator while an image loads and a fallback image if loading fails?

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. A code snippet showing how to implement loading and error states for an image

**Required**: Yes

### Challenge 2: Deep Linking Implementation

**Question Type**: Long Answer Text
**Question**: 
Locate information about how to implement deep linking in a React Native app. Deep linking allows users to open your app directly to a specific screen when they click a link.

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. A brief summary of the steps required to implement deep linking
4. Any additional libraries or tools recommended for deep linking

**Required**: Yes

### Challenge 3: Device Information Access

**Question Type**: Long Answer Text
**Question**: 
Find the API for accessing device information like OS version and device model in React Native. Is this functionality built into React Native core, or do you need an additional library?

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. The name of the API or library you would use
4. A code snippet showing how to access the device's OS version and model

**Required**: Yes

### Challenge 4: Pull-to-Refresh Implementation

**Question Type**: Long Answer Text
**Question**: 
Discover how to implement pull-to-refresh functionality in a `FlatList` component. This is a common pattern in mobile apps that allows users to refresh content by pulling down on the list.

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. The component or props needed to implement pull-to-refresh
4. A code snippet showing a basic implementation

**Required**: Yes

### Challenge 5: Bundle Size Optimization

**Question Type**: Long Answer Text
**Question**: 
Find information about optimizing JavaScript bundle size for better app performance in React Native. This is important for ensuring your app loads quickly and runs smoothly.

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. At least three techniques for reducing bundle size
4. Any tools recommended for analyzing bundle size

**Required**: Yes

### Challenge 6: Platform-Specific Code

**Question Type**: Long Answer Text
**Question**: 
Find information about how to write platform-specific code in React Native. How can you create components or styles that are different on iOS and Android?

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. At least two different methods for writing platform-specific code
4. A code example showing one of these methods

**Required**: Yes

### Challenge 7: Accessibility Features

**Question Type**: Long Answer Text
**Question**: 
Locate information about implementing accessibility features in React Native. What props or APIs are available to make your app more accessible to users with disabilities?

Record:
1. The URL or documentation section where you found this information
2. The search strategy you used
3. At least three accessibility props or APIs
4. A brief explanation of how each one improves accessibility

**Required**: Yes

### Challenge 8: Community Resources

**Question Type**: Long Answer Text
**Question**: 
Find three community resources (beyond the official documentation) that would be helpful for React Native developers. These could be libraries, tools, forums, or other resources.

Record:
1. The names and URLs of the resources you found
2. The search strategy you used to find them
3. A brief description of what each resource provides
4. Why you think each resource would be valuable

**Required**: Yes

### Reflection Question

**Question Type**: Long Answer Text
**Question**: 
Based on your experience with this scavenger hunt, which search strategies did you find most effective for different types of information? How might you approach documentation searches in your future development work?

**Required**: Yes

### Rating Question

**Question Type**: Rating
**Question**: How confident do you feel in your ability to find information in the React Native documentation?
**Rating Scale**: 1-5 (1 = Not at all confident, 5 = Very confident)
**Required**: Yes

## Evaluation Guidance

### Challenge 1: Image Component Loading States
Look for mentions of:
- `onLoadStart`, `onLoad`, `onLoadEnd`, `onError` props
- `defaultSource` prop for placeholders
- Activity indicators during loading
- Error handling patterns

### Challenge 2: Deep Linking Implementation
Look for understanding of:
- Manifest/Info.plist configuration
- URL scheme registration
- Handling incoming links
- Integration with navigation libraries

### Challenge 3: Device Information Access
Look for:
- Recognition that this requires a community library
- Mention of `react-native-device-info` or similar
- Basic usage patterns
- Platform considerations

### Challenge 4: Pull-to-Refresh Implementation
Look for:
- `refreshControl` prop on ScrollView/FlatList
- `RefreshControl` component
- `onRefresh` and `refreshing` props
- Proper state management

### Challenge 5: Bundle Size Optimization
Look for techniques like:
- Code splitting
- Removing unused dependencies
- Using production builds
- Hermes engine
- ProGuard/R8 for Android

### Challenge 6: Platform-Specific Code
Look for methods like:
- Platform.OS checks
- Platform.select()
- Platform-specific file extensions (.ios.js/.android.js)
- Platform-specific components

### Challenge 7: Accessibility Features
Look for props like:
- `accessible`
- `accessibilityLabel`
- `accessibilityHint`
- `accessibilityRole`
- Screen reader considerations

### Challenge 8: Community Resources
Look for valuable resources like:
- React Native Community GitHub
- React Native Directory
- Reactiflux Discord
- Popular blogs or YouTube channels
- Third-party component libraries
