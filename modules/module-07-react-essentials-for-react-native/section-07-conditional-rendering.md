## Section 7: Conditional Rendering

Often in your applications, you'll want to show or hide UI elements, or render different components altogether, based on the current state or props. This is known as **conditional rendering**. React offers several flexible ways to achieve this, leveraging standard JavaScript operators and syntax.

### Using `if` Statements

Standard JavaScript `if` statements are a straightforward way to conditionally render JSX. Since you can't embed `if` statements directly _inside_ JSX, you typically use them _outside_ the JSX, preparing variables that will then be embedded.

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface PrescriptionStatusProps {
  isRefillAvailable: boolean;
  medicationName: string;
}

const PrescriptionStatus: React.FC<PrescriptionStatusProps> = ({
  isRefillAvailable,
  medicationName,
}) => {
  let statusMessage;
  let actionButton;

  if (isRefillAvailable) {
    statusMessage = (
      <Text style={styles.availableText}>
        Refill available for {medicationName}!
      </Text>
    );
    actionButton = (
      <Button
        title="Request Refill Now"
        onPress={() => alert("Refill requested!")}
        color="#4CAF50"
      />
    );
  } else {
    statusMessage = (
      <Text style={styles.unavailableText}>
        {medicationName} is not yet eligible for refill.
      </Text>
    );
    actionButton = (
      <Button
        title="Check Eligibility Later"
        onPress={() => alert("Will notify when eligible.")}
        disabled
      />
    );
  }

  return (
    <View style={styles.container}>
      {statusMessage}
      <View style={styles.buttonContainer}>{actionButton}</View>
    </View>
  );
};

const PatientDashboard: React.FC = () => {
  const [canRefillAdvil, setCanRefillAdvil] = useState(true);

  return (
    <View style={styles.dashboard}>
      <PrescriptionStatus
        medicationName="Advil"
        isRefillAvailable={canRefillAdvil}
      />
      <PrescriptionStatus
        medicationName="Metformin"
        isRefillAvailable={false}
      />
      <Button
        title={`Toggle Advil Refill (${canRefillAdvil ? "On" : "Off"})`}
        onPress={() => setCanRefillAdvil(!canRefillAdvil)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  availableText: {
    color: "green",
    fontSize: 16,
    marginBottom: 10,
  },
  unavailableText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  dashboard: {
    padding: 10,
  },
});

export default PatientDashboard;
```

In this example, the `PrescriptionStatus` component uses `if/else` to assign different JSX to `statusMessage` and `actionButton` variables based on the `isRefillAvailable` prop. These variables are then rendered.

### Using Logical `&&` Operator (Short-Circuit Evaluation)

For scenarios where you want to render something _only if_ a condition is true (and render nothing otherwise), the JavaScript logical AND (`&&`) operator is very concise and commonly used.

If the condition is `true`, the expression after `&&` will be output. If it's `false`, React will ignore and skip it.

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MedicationAlertsProps {
  hasCriticalAlert: boolean;
  alertMessage?: string;
}

const MedicationAlerts: React.FC<MedicationAlertsProps> = ({
  hasCriticalAlert,
  alertMessage,
}) => {
  return (
    <View style={styles.alertContainer}>
      <Text style={styles.title}>Urgent Medication Alerts</Text>
      {hasCriticalAlert && (
        <View style={styles.criticalAlertBox}>
          <Text style={styles.criticalAlertText}>
            CRITICAL:{" "}
            {alertMessage ||
              "Please review your medication schedule immediately!"}
          </Text>
        </View>
      )}
      {!hasCriticalAlert && (
        <Text style={styles.noAlertsText}>
          No critical alerts at this time.
        </Text>
      )}
    </View>
  );
};

const AlertsScreen: React.FC = () => {
  return (
    <View>
      <MedicationAlerts
        hasCriticalAlert={true}
        alertMessage="Interaction warning: Do not take with grapefruit."
      />
      <MedicationAlerts hasCriticalAlert={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff0f0",
    borderRadius: 4,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  criticalAlertBox: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 4,
  },
  criticalAlertText: { color: "#a00", fontWeight: "bold" },
  noAlertsText: { color: "#555", fontStyle: "italic" },
});

export default AlertsScreen;
```

Here, the `criticalAlertBox` `View` (and its contents) is only rendered if `hasCriticalAlert` is `true`.

### Using the Ternary Operator (`condition ? trueValue : falseValue`)

The conditional (ternary) operator is excellent for inline conditional rendering where you need to choose between two expressions.

```tsx
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const OrderStatusButton: React.FC = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    // In a real app, call an API to place the order
    alert("SpeedyMeds order placed!");
  };

  const handleCancelOrder = () => {
    setIsOrderPlaced(false);
    alert("SpeedyMeds order cancelled.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Order Status: {isOrderPlaced ? "Order Confirmed" : "Pending Order"}
      </Text>
      <Pressable
        onPress={isOrderPlaced ? handleCancelOrder : handlePlaceOrder}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: isOrderPlaced
              ? pressed
                ? "darkred"
                : "red"
              : pressed
              ? "darkgreen"
              : "green",
          },
        ]}
      >
        <Text style={styles.buttonText}>
          {isOrderPlaced ? "Cancel SpeedyMeds Order" : "Place SpeedyMeds Order"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  statusText: { fontSize: 16, marginBottom: 15 },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default OrderStatusButton;
```

In `OrderStatusButton`:

- The text displayed for order status changes based on `isOrderPlaced`.
- The button's text and its `onPress` handler change based on `isOrderPlaced`.
- The background color of the button also changes based on `isOrderPlaced` and the `pressed` state.

### Preventing a Component from Rendering (`null`)

In rare cases, you might want a component to render nothing. You can do this by having it return `null`.

```tsx
import React from "react";
import { Text } from "react-native";

interface ConfidentialNoteProps {
  userRole: "admin" | "doctor" | "patient";
  note: string;
}

const ConfidentialNote: React.FC<ConfidentialNoteProps> = ({
  userRole,
  note,
}) => {
  if (userRole !== "admin" && userRole !== "doctor") {
    return null; // Don't render anything if not admin or doctor
  }

  return (
    <Text style={{ color: "purple", fontStyle: "italic", marginTop: 5 }}>
      Confidential ({userRole}): {note}
    </Text>
  );
};

// Usage:
// <ConfidentialNote userRole="doctor" note="Check patient X for side effects." />
// <ConfidentialNote userRole="patient" note="This note will not be visible." />
```

Returning `null` from a component's render method does not affect the firing of the component's lifecycle methods (which we'll cover with `useEffect` soon).

> ⚛️ **(Web Developers - React):**
>
> **Comparison:** Conditional rendering techniques (`if` statements, `&&`, ternary operator, returning `null`) are identical in React for the web and React Native.
>
> **Key Takeaway:** You can directly apply your existing knowledge of conditional rendering patterns.

Conditional rendering is a fundamental part of building dynamic and responsive UIs. By choosing the appropriate JavaScript constructs, you can effectively control what your React Native application displays based on any conditions you need.

_(No exercise is specifically defined for this section in the blueprint, but the concepts are often integrated into exercises for state, props, and lists.)_

> 📚 **Official Documentation:**
>
> - [React Docs - Conditional Rendering](https://react.dev/learn/conditional-rendering)
