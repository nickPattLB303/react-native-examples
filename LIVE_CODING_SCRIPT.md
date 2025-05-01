# SpeedyMedsPOC Live Coding Session Script (Presenter Guide)

**Hey everyone! Welcome!** Today, we're going to dive into some foundational React Native concepts by building out parts of our `SpeedyMedsPOC` app. We've got a basic structure ready to go, and we'll focus on bringing these screens to life using core React Native tools and Expo Router.

**Our Mission Today:** Get comfortable with Expo Router, styling with `StyleSheet`, layout using Flexbox, using Core Components, understanding JSX and declarative programming, making Custom Components, handling Taps (Events), rendering Lists, and using basic React Hooks like `useState` and `useEffect`.

**Ready? Let's code!**

---

## Part 1: Dashboard Discovery (JSX, Core Components, StyleSheet, Flexbox, Events)

**(File: `app/(tabs)/index.js`)**

"Okay, team, let's open up our first file: `app/(tabs)/index.js`. This is our Dashboard, the first thing users see. Right now, it's looking a bit bare, let's jazz it up!"

"Take a look at the structure. It's a standard React function. Inside `return`, we see `<View>` and `<Text>`. These are our bread-and-butter **Core Components** in React Native."

*   "Think of `<View>` like a blank canvas or a `<div>` from the web world. It doesn't look like anything on its own, but it's super important for organizing our layout and holding other components. It's the master of **Flexbox** layout!"
    *   *(Mention: @see https://reactnative.dev/docs/view)*
*   "And `<Text>`? Well, it's for... text! 😄 Simple, right? But remember, in React Native, *all* text needs to be inside a `<Text>` tag. No exceptions!"
    *   *(Mention: @see https://reactnative.dev/docs/text)*

"See that stuff that looks like HTML inside our JavaScript function? That's **JSX**! It's a cool way to write our UI structure visually. It gets translated into regular JavaScript calls under the hood. We can even sprinkle in JavaScript using curly braces `{}` later on."

"Now, how do we make it look good? Check out the `StyleSheet.create` call at the bottom."

*   "This is React Native's way of doing CSS. We write styles as JavaScript objects (notice `justifyContent` is camelCase, not `justify-content`)."
*   "Using `StyleSheet` is good practice – it sends the styles over to the native side efficiently and keeps our code tidy."
    *   *(Mention: @see https://reactnative.dev/docs/stylesheet & https://reactnative.dev/docs/style)*

"Let's peek at the `container` style. `flex: 1`, `justifyContent: 'center'`, `alignItems: 'center'`. This is **Flexbox** magic!"

*   "`flex: 1` is like saying 'Hey, `<View>`, take up ALL the room your parent gives you!'"
*   "`justifyContent` controls how items are arranged along the main direction (usually top-to-bottom). `'center'` puts them right in the middle vertically."
*   "`alignItems` controls arrangement across the *other* direction (usually left-to-right). `'center'` puts them in the middle horizontally."
*   "Imagine tidying up toy blocks in a box. `justifyContent` is how you line them up from top-to-bottom, `alignItems` is how you position them left-to-right within that line."
    *   *(Mention: @see https://reactnative.dev/docs/flexbox)*

"Okay, theory time over! Let's add a button and make something happen! We need to handle **Events**. First, import `Button` from `react-native`."

```diff
+ import { View, Text, StyleSheet, Button } from 'react-native';
- import { View, Text, StyleSheet } from 'react-native';
```

"Now, pop a `<Button>` inside our main `<View>`:"

```diff
     <View style={styles.container}>
       <Text style={styles.title}>Dashboard Screen</Text>
 
+      {/* Add the Button here */}
+      <Button
+        title="Press Me!"
+        onPress={() => alert('Button Pressed!')} // Simple inline event handler
+      />
+
       {/* --- TODOs for Live Session --- */}
       {/* ... (keep existing TODOs) ... */}
     </View>
```

"Boom! A button! The important prop here is `onPress`. This is our **Event Handler**. We give it a function, and React Native runs that function when the button is tapped. Here, a simple `alert` pops up."

*   "This also shows the **Declarative** style of React. We *declare* what the UI should be (`View`, `Text`, `Button` with a title) and *what should happen* (`onPress` does an alert). We don't manually wire up click listeners like in older ways of UI programming. We just describe the *state* and the *reactions*."

---

## Part 2: Listing Prescriptions (`useState`, `FlatList`, Custom Component)

**(File: `app/(tabs)/prescriptions.js`)**

"Alright, onto the Prescriptions screen! We need to show a list. The go-to component for lists in React Native is `<FlatList>`. It's super efficient for long lists because it only renders what's visible."

"But first, where does the data come from? We need some *state*! Let's use the **`useState`** hook. Hooks are special functions that let us add React features like state to our function components."

*   "`useState` gives our component a little memory bank. It returns the current state value and a function to update it."
    *   *(Mention: @see https://react.dev/reference/react/useState)*

"Let's import `useState` and `FlatList`."

```diff
+ import React, { useState } from 'react';
- import React from 'react';
+ import { View, Text, StyleSheet, FlatList } from 'react-native';
- import { View, Text, StyleSheet } from 'react-native';
```

"Now, inside our `PrescriptionsScreen` function, let's set up state with some fake prescription data and also define a function called `renderItem` that tells `FlatList` *how* to draw each item."

```diff
 export default function PrescriptionsScreen() {
 
   // TODO: Add mock data using useState hook during live session.
+  // useState returns an array: [stateVariable, setterFunction]
+  const [prescriptions, setPrescriptions] = useState([
+    { id: 'rx1', name: 'Lisinopril 10mg', status: 'Active' },
+    { id: 'rx2', name: 'Metformin 500mg', status: 'Active' },
+    { id: 'rx3', name: 'Simvastatin 20mg', status: 'Inactive' },
+    { id: 'rx4', name: 'Amoxicillin 250mg', status: 'Needs Refill' },
+  ]);
 
   // TODO: Define a renderItem function for FlatList during live session.
+  // This function receives an object with an 'item' property ({ item })
+  // and returns the JSX for a single list row.
+  const renderPrescriptionItem = ({ item }) => (
+    <View style={styles.listItem}>
+      <Text style={styles.itemName}>{item.name}</Text>
+      <Text style={styles.itemStatus}>{item.status}</Text>
+    </View>
+  );
 
   return (
     // ... rest of the return statement
   );
 }
 
+// Add styles for list items at the bottom
 const styles = StyleSheet.create({
   // ... (keep existing container and title styles)
+  listItem: {
+    padding: 15,
+    marginBottom: 10,
+    backgroundColor: 'white',
+    borderRadius: 5,
+    flexDirection: 'row', // Arrange items horizontally
+    justifyContent: 'space-between', // Push items apart
+    alignItems: 'center',
+  },
+  itemName: {
+    fontSize: 16,
+  },
+  itemStatus: {
+    fontSize: 14,
+    color: 'grey',
+  },
 });
```

"Okay, state is ready, renderer is ready. Let's put the `<FlatList>` in our JSX."

```diff
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Prescriptions Screen</Text>
 
       {/* --- TODOs for Live Session --- */}
-      {/* 1. Introduce the <FlatList> component here. */}
-      {/* 2. Explain the 'data', 'renderItem', and 'keyExtractor' props. */}
-      {/* 3. Demonstrate creating a simple custom list item component. */}
       {/* ... (Keep TODOs 4, 5, 6) ... */} 
 
+      {/* 1. Introduce the <FlatList> component here. */}
+      {/* @see https://reactnative.dev/docs/flatlist */}
+      <FlatList
+        // 2. Explain the 'data', 'renderItem', and 'keyExtractor' props.
+        data={prescriptions} // The array of data from our useState
+        renderItem={renderPrescriptionItem} // Function to render each item
+        keyExtractor={(item) => item.id} // Function to get a unique key for each item
+        // Why keys? React needs unique keys to efficiently update the list
+        // when data changes. Think of them like unique IDs or name tags.
+        style={{ width: '90%' }} // Add some width for visibility
+      />
     </View>
   );
```

"See? `<FlatList>` takes our `data`, uses our `renderItem` function for each piece of data, and uses `keyExtractor` to get a unique ID (our `item.id`) for each row. Those **Keys** are crucial for React to know which item is which if the list changes."

"Now, this `renderItem` function is doing a bit of work. Let's make it cleaner by creating a **Custom Component**! This is a huge part of React - breaking UI into reusable pieces."

"Define a *new* function component called `PrescriptionItem` *above* our `PrescriptionsScreen`."

```diff
 // Define PrescriptionItem component ABOVE PrescriptionsScreen
+const PrescriptionItem = ({ name, status }) => {
+  // This component receives name and status as props
+  return (
+    <View style={styles.listItem}>
+      <Text style={styles.itemName}>{name}</Text>
+      <Text style={styles.itemStatus}>{status}</Text>
+    </View>
+  );
+};
 
 // Now update renderPrescriptionItem inside PrescriptionsScreen
 export default function PrescriptionsScreen() {
   // ... (useState stays the same)
 
+  // Update renderItem to use the custom component
   const renderPrescriptionItem = ({ item }) => (
-    <View style={styles.listItem}>
-      <Text style={styles.itemName}>{item.name}</Text>
-      <Text style={styles.itemStatus}>{item.status}</Text>
-    </View>
+    // 3. Demonstrate creating a simple custom list item component.
+    <PrescriptionItem name={item.name} status={item.status} />
   );
 
   return (
     // ... (FlatList stays the same in the return)
   );
 }
 
 // ... (Styles remain the same)
```

"Nice! Our `renderItem` is now super simple. It just uses our `PrescriptionItem` component and passes down the `name` and `status` as props. Much cleaner!"

---

## Part 3: Orders List Fun (Navigation, Parameters, `Pressable`)

**(File: `app/(tabs)/orders/index.js`)**

"Let's hop over to the Orders tab (`orders/index.js`). The plan here is to list orders, and when you tap one, navigate to a detail screen for *that specific order*. This means **Navigation** with **Parameters** using **Expo Router**!"

"We'll need `useState` again for mock data, `FlatList` for the list, `useRouter` from `expo-router` to actually *do* the navigating, and `Pressable` to make the list items tappable."

"Let's get our imports sorted."

```diff
+// Add useState, FlatList, Pressable
 import React, { useState } from 'react';
-import React from 'react';
+// Need Pressable
+import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
-import { View, Text, StyleSheet } from 'react-native';
 import { useRouter } from 'expo-router';
```

"Inside the component, set up state, a function to handle navigation, and our `renderItem`."

```diff
 export default function OrdersListScreen() {
   // useRouter hook: Provides navigation functions.
   const router = useRouter();
 
   // TODO: Add mock order data using useState during live session.
+  const [orders, setOrders] = useState([
+    { id: 'ord123', date: '2024-07-28', status: 'Delivered' },
+    { id: 'ord456', date: '2024-07-25', status: 'Delivered' },
+    { id: 'ord789', date: '2024-08-01', status: 'Processing' },
+  ]);
 
   // TODO: Define handleNavigateToDetails function during live session.
-  // const handleNavigateToDetails = (orderId) => {
-  //   router.push(`/orders/${orderId}`);
-  // };
+  // This function takes the orderId and uses router.push to navigate.
+  const handleNavigateToDetails = (orderId) => {
+    // 3. Implement navigation to the detail screen using router.push.
+    // router.push is like navigating forward in a web browser history.
+    // 4. Show how to pass the order ID as a route parameter.
+    // We use template literals to build the path dynamically.
+    // This path matches the filename '[orderId].js' in the same directory.
+    // @see https://docs.expo.dev/router/navigating/navigating-between-pages/
+    router.push(`/orders/${orderId}`);
+    // 5. Explain the Expo Router stack navigation concept within this tab.
+    // Because we defined a Stack layout in 'orders/_layout.js', pushing
+    // here adds the detail screen ON TOP of this list screen within the Orders tab.
+  };
 
   // TODO: Define renderOrderItem function for FlatList during live session.
-  // const renderOrderItem = ({ item }) => (
-  //   <Pressable onPress={() => handleNavigateToDetails(item.id)}>...
+  // Uses Pressable for tappable items.
+  const renderOrderItem = ({ item }) => (
+    // 2. Create a pressable list item component (<Pressable>).
+    // Pressable is more flexible than Button for custom touch interactions.
+    // @see https://reactnative.dev/docs/pressable
+    <Pressable
+      style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]} // Style changes on press
+      onPress={() => handleNavigateToDetails(item.id)} // Call handler on press
+    >
+      <Text style={styles.itemText}>Order #{item.id}</Text>
+      <Text style={styles.itemText}>{item.date}</Text>
+    </Pressable>
+  );
 
   return (
      // ... rest of return
   );
 }
 
+// Add styles for list items and pressed state
 const styles = StyleSheet.create({
   // ... (keep existing container and title styles)
+  listItem: {
+    padding: 15,
+    marginBottom: 1, // Use border/margin for separation
+    backgroundColor: 'white',
+    borderBottomWidth: StyleSheet.hairlineWidth,
+    borderBottomColor: '#ccc',
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+  },
+  listItemPressed: {
+    backgroundColor: '#e0e0e0', // Visual feedback
+  },
+  itemText: {
+    fontSize: 16,
+  },
 });
```

"Let's wire up the `FlatList` in the JSX."

```diff
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Orders List Screen</Text>
 
       {/* --- TODOs for Live Session --- */}
+      {/* ... (Keep TODO 5) ... */}
 
-      {/* 1. Implement <FlatList> to display mock orders. */}
-      {/* 2. Create a pressable list item component (<Pressable>). */}
-      {/* 3. Implement navigation to the detail screen using router.push. */}
-      {/* 4. Show how to pass the order ID as a route parameter. */}
-      {/* 5. Explain the Expo Router stack navigation concept within this tab. */}
+      {/* 1. Implement <FlatList> to display mock orders. */}
+      <FlatList
+        data={orders}
+        renderItem={renderOrderItem}
+        keyExtractor={(item) => item.id}
+        style={{ width: '100%' }} // Make list take full width
+      />
     </View>
   );
```

"Okay! We're using `useRouter` to get the `router` object. Our `handleNavigateToDetails` function uses `router.push` with a *dynamic path* (`/orders/${orderId}`). This tells Expo Router: 'Go to the screen that matches this pattern'. And because our detail screen is named `[orderId].js`, it matches! The `Pressable` component wraps our list item, calling this handler `onPress`. Because we set up a Stack navigator in `orders/_layout.js`, this pushes the detail screen onto the navigation stack *within* the Orders tab."

---

## Part 4: Order Detail Deep Dive (Receiving Parameters, `useEffect`)

**(File: `app/(tabs)/orders/[orderId].js`)**

"We made it to the Order Detail screen! The cool thing here is the filename: `[orderId].js`. Those square brackets tell Expo Router this is a **dynamic route** – the `orderId` part can change."

"How do we *get* that changing ID inside our component? With another hook: **`useLocalSearchParams`**!"

"Import it first."

```diff
 import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
+// Import the hook
 import { useLocalSearchParams } from 'expo-router';
```

"Then, call it inside the component."

```diff
 export default function OrderDetailScreen() {
-  const { orderId } = useLocalSearchParams(); 
+  const { orderId } = useLocalSearchParams(); // Destructure directly
 
   // ... (rest of the component)
```

"Now `orderId` holds the actual ID passed from the list screen. Let's show it!"

```diff
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Order Detail Screen</Text>
+      {/* 2. Demonstrate displaying the received 'orderId'. */} 
       <Text style={styles.text}>Details for Order ID: {orderId}</Text>
 
       {/* --- TODOs for Live Session --- */}
       {/* ... (Keep TODOs 3, 4, 5) ... */} 
     </View>
   );
```

"Sweet! We passed data between screens. Now, normally, you'd use this `orderId` to fetch the full order details from an API. Fetching data is a 'side effect'. What hook do we use for side effects? **`useEffect`**!"

*   "Remember, `useEffect` runs *after* the component renders. It's the perfect place for API calls, timers, or anything that interacts with the outside world."
*   "Crucially, it takes a dependency array. This tells React *when* to re-run the effect." 
    *   *(Mention: @see https://react.dev/reference/react/useEffect)*

"Let's import `useEffect`."

```diff
+// Add useEffect import
 import React, { useEffect } from 'react';
-import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
 import { useLocalSearchParams } from 'expo-router';
```

"And add the hook inside our component."

```diff
 export default function OrderDetailScreen() {
-  const { orderId } = useLocalSearchParams(); 
+  const { orderId } = useLocalSearchParams(); // Destructure directly
 
   // TODO: Use useEffect hook to fetch/load order details based on orderId during live session.
+  // 3. Introduce the useEffect hook for side effects.
+  useEffect(() => {
+    // This code runs after the component mounts AND if orderId changes.
+    console.log("Fetching details for order:", orderId);
+    // In a real app, you would put your API call here:
+    // fetchOrderDetails(orderId).then(data => { /* update state */ });
+
+    // useEffect can also return a cleanup function, useful for subscriptions
+    // return () => { console.log("Cleaning up effect for order:", orderId); };
+  }, [orderId]); // 4. Discuss the dependency array in useEffect ([orderId]).
+                 // This tells React to re-run the effect ONLY if orderId changes.
+                 // If empty [], it runs only once after mount.
 
   return (
     // ... (return statement remains the same)
   );
 }
 
 // ... (styles remain the same)
```

"Check your console when you navigate here! You'll see the log. The `[orderId]` in the dependency array is key. It ensures we only re-fetch data if the user somehow navigates to a *different* order detail screen *from* this screen (unlikely in this simple setup, but crucial in complex apps)."

---

## Part 5: Account Screen Styling & Structure Practice

**(File: `app/(tabs)/account.js`)**

"Last stop, the Account screen! This screen is a great canvas for practicing more complex **Flexbox** layouts and reinforcing **Custom Components** and **Event Handling**."

"Let's imagine we want sections for user info and actions. We'll use `<View>`s for these sections."

"We might need `Button` again, and potentially `ScrollView` if the content gets long."

```diff
 import React from 'react';
+// Add Button, maybe ScrollView
 import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
-import { View, Text, StyleSheet } from 'react-native';
```

"Let's refactor the `return` to include these sections."

```diff
 export default function AccountScreen() {
 
   // TODO: Define event handler functions during live session.
+  const handleEditProfile = () => { alert('Edit Profile TBD'); };
+  const handleSignOut = () => { alert('Sign Out TBD'); };
-  // const handleEditProfile = () => { console.log('Edit Profile') };
-  // const handleSignOut = () => { console.log('Sign Out') };
 
   return (
-    <View style={styles.container}>
+    // Use ScrollView if content might exceed screen height
+    <ScrollView contentContainerStyle={styles.scrollContainer}>
       <Text style={styles.title}>Account Screen</Text>
 
       {/* --- TODOs for Live Session --- */}
+      {/* ... (Keep TODOs 4, 5) ... */}
 
-      {/* 1. Build a layout with multiple sections using <View> and Flexbox. */}
-      {/* 2. Add <Button> or <Pressable> components for actions. */}
-      {/* 3. Implement simple event handlers for the buttons. */}
-      {/* 4. Demonstrate creating and using a custom component (e.g., <SettingsRow>). */}
-      {/* 5. Apply styling using StyleSheet to different elements. */}
-    </View>
+      {/* 1. Build a layout with multiple sections using <View> and Flexbox. */}
+      {/* Section 1: User Info */}
+      <View style={styles.section}>
+        <Text style={styles.sectionTitle}>User Information</Text>
+        <Text style={styles.text}>Name: Jane Doe (Placeholder)</Text>
+        <Text style={styles.text}>Email: jane.doe@example.com</Text>
+      </View>
+
+      {/* Section 2: Actions */} 
+      <View style={styles.section}>
+        <Text style={styles.sectionTitle}>Actions</Text>
+        {/* 2. Add <Button> or <Pressable> components for actions. */}
+        {/* 3. Implement simple event handlers for the buttons. */} 
+        <View style={styles.buttonContainer}>
+          <Button title="Edit Profile" onPress={handleEditProfile} />
+        </View>
+        <View style={styles.buttonContainer}>
+          <Button title="Sign Out" color="red" onPress={handleSignOut} />
+        </View>
+      </View>
+
+      {/* (Optional TODO 4: Create a <SettingsRow> component here) */} 
+
+    </ScrollView>
   );
 }
 
+// Add/update styles
 const styles = StyleSheet.create({
+  scrollContainer: {
+    flexGrow: 1, // Allows content to grow and scroll
+    padding: 16,
+    backgroundColor: '#f5f5f5',
+  },
+  // Remove container centering if using ScrollView sections
+  // container: { ... },
   container: {
     flex: 1,
-    justifyContent: 'center',
-    alignItems: 'center',
+    // Remove centering if using sections
+    // justifyContent: 'center',
+    // alignItems: 'center',
     backgroundColor: '#f5f5f5',
   },
   title: {
-    fontSize: 20,
+    fontSize: 24, // Make title larger
     fontWeight: 'bold',
+    marginBottom: 24, // Add more space below title
+    textAlign: 'center',
+  },
+  section: {
+    backgroundColor: 'white',
+    padding: 16,
+    borderRadius: 8,
+    marginBottom: 16, // Space between sections
+    // Add shadow (optional)
+    shadowColor: '#000',
+    shadowOffset: { width: 0, height: 1 },
+    shadowOpacity: 0.1,
+    shadowRadius: 2,
+    elevation: 2,
+  },
+  sectionTitle: {
+    fontSize: 18,
+    fontWeight: '600',
+    marginBottom: 12,
+  },
+  text: {
+    fontSize: 16,
+    marginBottom: 8,
+    color: '#333',
+  },
+  buttonContainer: {
+    marginTop: 10, // Space buttons vertically
   },
 });
```

"See how we used multiple `<View>`s, styled with **StyleSheet**, to create logical sections? We added buttons with `onPress` handlers again. This is a perfect spot where you could create a custom `<SettingsRow>` component to display each setting, making the code even more modular – just like we did with `<PrescriptionItem>`!"

---

**(End of Script - Ready for Q&A or Wrap-up)** 