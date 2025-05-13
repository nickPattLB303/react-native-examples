## Section 7: Conditional Rendering

Conditional rendering is a core concept in React that allows you to display different UI elements or components based on certain conditions or the current state of your application. This section explores common techniques for implementing conditional rendering in your React Native components.

### Why Use Conditional Rendering?

Often, you'll want to show or hide elements, or render entirely different components, based on factors like:

- User authentication status (e.g., show a login form or a user dashboard).
- Data availability (e.g., show a loading spinner while data is fetching, then the data itself, or an error message).
- User preferences or settings.
- Specific application state (e.g., show different content based on a selected tab).

React provides several ways to achieve this declaratively within your JSX.

### Using `if` Statements

While you cannot use `if` statements directly inside JSX curly braces `{}`, you can use them outside of the JSX to determine which elements or components to render. You can assign JSX to variables and then render those variables.

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface OrderStatusProps {
  status: "pending" | "processing" | "shipped" | "delivered";
}

const OrderStatusIndicator: React.FC<OrderStatusProps> = ({ status }) => {
  let statusMessage;
  let statusStyle;

  if (status === "pending") {
    statusMessage = <Text>Your SpeedyMeds order is pending confirmation.</Text>;
    statusStyle = styles.pending;
  } else if (status === "processing") {
    statusMessage = (
      <Text>Your order is currently being processed by the pharmacy.</Text>
    );
    statusStyle = styles.processing;
  } else if (status === "shipped") {
    statusMessage = <Text>Your medication has been shipped!</Text>;
    statusStyle = styles.shipped;
  } else if (status === "delivered") {
    statusMessage = (
      <Text>Your order has been delivered. Please check your doorstep.</Text>
    );
    statusStyle = styles.delivered;
  } else {
    statusMessage = <Text>Unknown order status.</Text>;
    statusStyle = styles.unknown;
  }

  return <View style={[styles.container, statusStyle]}>{statusMessage}</View>;
};

// Example Usage
const OrderTracker = () => {
  const [currentStatus, setCurrentStatus] = useState<
    "pending" | "processing" | "shipped" | "delivered"
  >("processing");
  // In a real app, currentStatus would likely come from props or a data fetch

  return (
    <View>
      <OrderStatusIndicator status={currentStatus} />
      {/* Buttons to simulate status change could be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderRadius: 5, marginVertical: 5 },
  pending: { backgroundColor: "#FFD700" }, // Gold
  processing: { backgroundColor: "#ADD8E6" }, // Light Blue
  shipped: { backgroundColor: "#90EE90" }, // Light Green
  delivered: { backgroundColor: "#32CD32" }, // Lime Green
  unknown: { backgroundColor: "#D3D3D3" }, // Light Grey
});

export default OrderTracker;
```

In this example, the `statusMessage` and `statusStyle` are determined using `if/else if` statements before the `return` statement.

### Logical `&&` Operator (Short-Circuit Evaluation)

For simple conditions where you want to render something only if a condition is true (and render nothing otherwise), the JavaScript logical AND (`&&`) operator is a concise option. If the condition is true, the expression after `&&` will be rendered. If it's false, React ignores it.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PrescriptionAlertsProps {
  hasUrgentAlerts: boolean;
  alertCount: number;
}

const PrescriptionAlerts: React.FC<PrescriptionAlertsProps> = ({
  hasUrgentAlerts,
  alertCount,
}) => {
  return (
    <View style={styles.container}>
      <Text>Prescription Dashboard</Text>
      {hasUrgentAlerts && (
        <View style={styles.urgentContainer}>
          <Text style={styles.urgentText}>
            URGENT: You have {alertCount} critical alert(s)!
          </Text>
        </View>
      )}
      {!hasUrgentAlerts && alertCount > 0 && (
        <Text>You have {alertCount} non-urgent notification(s).</Text>
      )}
      {alertCount === 0 && <Text>No new prescription alerts.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  urgentContainer: { backgroundColor: "red", padding: 5, marginVertical: 5 },
  urgentText: { color: "white", fontWeight: "bold" },
});

export default PrescriptionAlerts;
```

Here, the urgent alert `View` is only rendered if `hasUrgentAlerts` is true.

> [!CAUTION]
> When using the logical `&&` operator for conditional rendering, be mindful of falsy values that are not boolean `false`. For example, if a variable `count` is `0` (which is falsy), the expression `{count && <MyComponent />}` will render `0` in your UI, not nothing. To avoid this, always ensure the left-hand side of the `&&` operator is a boolean expression (e.g., `{count > 0 && <MyComponent />}`).

### Ternary Conditional Operator (`condition ? trueExpression : falseExpression`)

The ternary operator is useful for inline conditional rendering where you want to render one thing if a condition is true, and another thing if it's false.

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Text style={styles.welcomeText}>
          Welcome back, valued SpeedyMeds patient!
        </Text>
      ) : (
        <Text style={styles.infoText}>
          Please sign in to manage your prescriptions.
        </Text>
      )}
      <Button
        title={isLoggedIn ? "Sign Out" : "Sign In"}
        onPress={toggleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 15 },
  welcomeText: { fontSize: 16, color: "green", marginBottom: 10 },
  infoText: { fontSize: 16, color: "#555", marginBottom: 10 },
});

export default LoginStatus;
```

This component renders different text and a different button label based on the `isLoggedIn` state.

### Preventing Rendering with `null`

In some cases, you might want a component to render nothing. You can do this by returning `null`.

```tsx
import React from "react";
import { Text } from "react-native";

interface OptionalMessageProps {
  message?: string;
  show: boolean;
}

const OptionalMessage: React.FC<OptionalMessageProps> = ({ message, show }) => {
  if (!show || !message) {
    return null; // Render nothing if show is false or no message
  }
  return <Text>Special Instructions: {message}</Text>;
};

export default OptionalMessage;
```

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** All these conditional rendering techniques (`if` statements, `&&`, ternary operator, returning `null`) are identical to how you'd do it in React for the web.
>
> **Key Takeaway:** Your existing React conditional rendering patterns are directly applicable.

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** Angular uses directives like `*ngIf` for conditional rendering. React integrates these concepts directly into JavaScript logic within JSX. The ternary operator and logical `&&` are common JavaScript idioms that React leverages effectively for this purpose.
>
> **Key Takeaway:** Learn to use JavaScript's own conditional operators and `if` statements (outside JSX or by assigning JSX to variables) to control what gets rendered. There are no special template directives for this in React.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** This is similar to programmatically setting the visibility of UI elements (e.g., `view.setVisibility(View.GONE)` in Android or `view.isHidden = true` in iOS) or choosing which views to add to a layout based on conditions. React makes this declarative: you describe the conditions, and React handles the showing/hiding or swapping of native views.
>
> **Key Takeaway:** You control the presence or appearance of UI elements by embedding JavaScript conditions directly or indirectly within your JSX structure.

Conditional rendering is essential for creating responsive and dynamic UIs that adapt to changing data and application states. Mastering these techniques will allow you to build more sophisticated user experiences in your SpeedyMeds app.

> 📚 **Official Documentation:**
>
> - [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering)

### Using `switch` Statements

For scenarios where you have multiple mutually exclusive conditions determining what to render, a `switch` statement (used outside of your JSX, similar to `if` statements) can be clearer than a long chain of `if/else if` statements. You can assign the resulting JSX to a variable.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NotificationBannerProps {
  type: "info" | "warning" | "error" | "success";
  message: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type,
  message,
}) => {
  let bannerContent;
  let bannerStyle;

  switch (type) {
    case "info":
      bannerStyle = styles.info;
      bannerContent = <Text>ℹ️ Info: {message}</Text>;
      break;
    case "warning":
      bannerStyle = styles.warning;
      bannerContent = <Text>⚠️ Warning: {message}</Text>;
      break;
    case "error":
      bannerStyle = styles.error;
      bannerContent = <Text>🛑 Error: {message}</Text>;
      break;
    case "success":
      bannerStyle = styles.success;
      bannerContent = <Text>✅ Success: {message}</Text>;
      break;
    default:
      bannerStyle = styles.unknown;
      bannerContent = <Text>{message}</Text>;
  }

  return <View style={[styles.bannerBase, bannerStyle]}>{bannerContent}</View>;
};

const styles = StyleSheet.create({
  bannerBase: { padding: 12, borderRadius: 4, marginVertical: 8 },
  info: { backgroundColor: "#E0EFFF", borderColor: "#B0CFFF", borderWidth: 1 },
  warning: {
    backgroundColor: "#FFF3E0",
    borderColor: "#FFD180",
    borderWidth: 1,
  },
  error: { backgroundColor: "#FFEBEE", borderColor: "#FFCDD2", borderWidth: 1 },
  success: {
    backgroundColor: "#E8F5E9",
    borderColor: "#C8E6C9",
    borderWidth: 1,
  },
  unknown: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
});

// Example Usage
// <NotificationBanner type="error" message="Failed to submit prescription." />

export default NotificationBanner;
```

### Using Object Mapping for Conditional Renders

Another clean way to render different components or JSX based on a specific prop value is to use an object as a map. This is particularly useful when you have a direct mapping from a string or number value to a corresponding UI representation.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Assume Icon components are available, e.g., from a library or custom made
// import { TabletIcon, CapsuleIcon, SyrupIcon, DefaultIcon } from './Icons';

interface MedicationFormDisplayProps {
  form: "tablet" | "capsule" | "liquid" | "other";
}

const MedicationFormDisplay: React.FC<MedicationFormDisplayProps> = ({
  form,
}) => {
  const FORM_COMPONENTS_MAP: {
    [key in MedicationFormDisplayProps["form"]]?: JSX.Element;
  } = {
    tablet: <Text>💊 Tablet</Text>, // Replace with <TabletIcon />
    capsule: <Text> कैप्सूल Capsule</Text>, // Replace with <CapsuleIcon />
    liquid: <Text>💧 Liquid</Text>, // Replace with <SyrupIcon />
  };

  const ComponentToRender = FORM_COMPONENTS_MAP[form] || (
    <Text>❓ Other Form</Text>
  ); // Fallback

  return <View style={styles.formContainer}>{ComponentToRender}</View>;
};

const styles = StyleSheet.create({
  formContainer: { padding: 5, alignItems: "flex-start" },
});

// Example Usage
// <MedicationFormDisplay form="tablet" />

export default MedicationFormDisplay;
```

This pattern can be very readable and maintainable, especially if the mapping logic becomes complex.

### Preventing Rendering with `null`

In some cases, you might want a component to render nothing. You can do this by returning `null`.

```tsx
import React from "react";
import { Text } from "react-native";

interface OptionalMessageProps {
  message?: string;
  show: boolean;
}

const OptionalMessage: React.FC<OptionalMessageProps> = ({ message, show }) => {
  if (!show || !message) {
    return null; // Render nothing if show is false or no message
  }
  return <Text>Special Instructions: {message}</Text>;
};

export default OptionalMessage;
```
