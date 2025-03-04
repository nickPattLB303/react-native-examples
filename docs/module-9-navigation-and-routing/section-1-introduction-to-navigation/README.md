# Section 1: Introduction to Navigation

## Overview

Navigation is a fundamental aspect of mobile applications, allowing users to move between different screens and access various features. This section introduces the core concepts of navigation in React Native applications, comparing different navigation approaches, and explaining the importance of a well-designed navigation system.

## Learning Objectives

By the end of this section, you will be able to:

- Understand the importance of navigation in mobile applications
- Identify common navigation patterns in mobile apps
- Compare different navigation libraries available for React Native
- Recognize when to use different navigation patterns
- Understand the basics of the navigation stack

## Navigation in Mobile Applications

### Why Navigation Matters

Navigation is one of the most critical aspects of user experience in mobile applications. A well-designed navigation system:

- Helps users understand where they are in the app
- Makes it easy to move between different sections
- Provides context and hierarchy for information
- Supports users' mental models of how the app is organized
- Enables efficient task completion

### Common Navigation Patterns

Mobile applications typically use several standard navigation patterns:

#### Stack Navigation

Stack navigation is the most fundamental navigation pattern, where screens are stacked on top of each other. When a user navigates to a new screen, it's pushed onto the stack. When they go back, the top screen is popped off the stack.

```typescript
// Conceptual example of stack navigation
const Stack = createStackNavigator();

function MedicationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedicationList" component={MedicationListScreen} />
      <Stack.Screen name="MedicationDetail" component={MedicationDetailScreen} />
    </Stack.Navigator>
  );
}
```

#### Tab Navigation

Tab navigation allows users to switch between different sections of an app using tabs, typically displayed at the bottom of the screen.

```typescript
// Conceptual example of tab navigation
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medications" component={MedicationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

#### Drawer Navigation

Drawer navigation provides a side menu that can be pulled out from the edge of the screen, typically containing less frequently used navigation options.

```typescript
// Conceptual example of drawer navigation
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainTabs} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}
```

#### Modal Navigation

Modal navigation presents screens that overlay the current screen, often used for focused tasks or quick actions.

```typescript
// Conceptual example of modal navigation
<Stack.Navigator mode="modal">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
</Stack.Navigator>
```

## Navigation Libraries in React Native

React Native doesn't include a built-in navigation system, so developers rely on third-party libraries. The two most popular options are:

### React Navigation

React Navigation is a standalone library that provides a complete navigation solution for React Native apps. It's highly customizable and supports all common navigation patterns.

**Key features:**
- Component-based API
- Extensive customization options
- TypeScript support
- Large community and ecosystem
- Support for native navigation gestures

### Expo Router

Expo Router is a file-based routing library built on top of React Navigation. It brings web-like routing to React Native, making navigation more declarative and easier to understand.

**Key features:**
- File-based routing (similar to Next.js)
- Automatic route generation based on file structure
- Built-in support for deep linking
- Seamless integration with Expo
- TypeScript support

## Choosing a Navigation Approach

When deciding between React Navigation and Expo Router, consider:

1. **Project Structure**: Expo Router works best with a file-based structure, while React Navigation gives more flexibility.
2. **Team Background**: Developers from web backgrounds may prefer Expo Router's file-based approach.
3. **Customization Needs**: React Navigation offers more fine-grained control over navigation behavior.
4. **Deep Linking**: Both support deep linking, but Expo Router makes it more straightforward.
5. **Project Size**: For larger projects, Expo Router's file-based organization can help maintain structure.

## Navigation Concepts

### The Navigation Stack

The navigation stack is a fundamental concept in mobile navigation. It works like a stack data structure:

- New screens are "pushed" onto the stack
- Going back "pops" screens off the stack
- The top screen in the stack is what the user sees
- The stack maintains navigation history

### Navigation State

Navigation state represents the current state of navigation in your app, including:

- Which screens are in the stack
- Which tab is active
- Parameters passed to each screen
- Navigation history

### Navigation Props

In React Navigation and Expo Router, screens receive navigation props that allow them to:

- Navigate to other screens
- Go back to previous screens
- Access route parameters
- Modify the navigation header
- Listen to navigation events

```typescript
// Example of using navigation props
function MedicationDetailScreen({ navigation, route }) {
  const { medicationId } = route.params;
  
  return (
    <View>
      <Text>Medication ID: {medicationId}</Text>
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}
```

## Best Practices for Navigation

1. **Keep navigation structure simple and intuitive**
2. **Limit navigation depth** (avoid deep nesting)
3. **Provide clear visual indicators** of current location
4. **Use consistent navigation patterns** throughout the app
5. **Implement proper type safety** with TypeScript
6. **Test navigation thoroughly** on different devices
7. **Consider accessibility** in navigation design

## Exercise: Navigation Analysis

Analyze the navigation patterns in popular mobile applications:

1. Open a pharmacy or healthcare app on your device
2. Identify the navigation patterns used (stack, tab, drawer, etc.)
3. Map out the navigation structure
4. Note how the app indicates the current location to users
5. Consider how you might implement a similar structure in React Native

## Next Steps

In the next section, we'll dive deeper into Expo Router, learning how to implement file-based routing in a React Native application.

## Additional Resources

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Navigation Patterns in Mobile UX Design](https://www.nngroup.com/articles/mobile-navigation-patterns/)
- [TypeScript and Navigation](https://reactnavigation.org/docs/typescript/)
