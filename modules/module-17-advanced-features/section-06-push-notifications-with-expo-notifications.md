## Section 6: Push Notifications with `expo-notifications`

This section delves into implementing push notifications in your React Native application using the `expo-notifications` library. Push notifications are a vital tool for engaging users, delivering timely information, and encouraging interaction with your app, such as reminding a SpeedyMeds user to take their medication.

### Conceptual Content

**What are Push Notifications?**

Push notifications are messages sent from a server to a user's device, appearing even when the app is not actively in use. They serve various purposes:

- **Alerts & Reminders:** Informing users about important events (e.g., medication reminders, appointment confirmations).
- **Updates:** Notifying users about new content or features.
- **Re-engagement:** Encouraging inactive users to return to the app.

There are two main types of push notifications:

1.  **Local Notifications:** Scheduled and triggered directly by the application on the device itself. They don't require a server. Useful for reminders or time-based alerts set within the app.
2.  **Remote (or Push) Notifications:** Sent from an app server to devices via a push notification service provided by the platform vendor (Apple Push Notification service - APNs for iOS, Firebase Cloud Messaging - FCM for Android).

**`expo-notifications` Library**

`expo-notifications` is an Expo SDK library that provides a unified API for handling both local and remote push notifications across iOS and Android. It simplifies the complexities of interacting with platform-specific services.

**Key Features:**

- Scheduling local notifications.
- Receiving remote push notifications.
- Handling notification responses (e.g., when a user taps a notification).
- Managing notification permissions.
- Setting notification channels (Android) and categories (iOS).
- Badge count management.

**Installation and Setup**

1.  **Install the library:**

    ```bash
    npx expo install expo-notifications
    ```

2.  **Configuration (`app.json` / `app.config.js`):**
    For remote push notifications, you often need to configure platform-specific settings (like an FCM server key for Android or APNs setup for iOS). Expo attempts to simplify this, especially when using EAS Build. For basic local notifications, minimal configuration might be needed. However, to customize appearance and behavior (e.g., icons, sounds), you may need to add configuration to your `app.json` or `app.config.js`.

    Example for custom Android notification icon and color:

    ```json
    // app.json
    {
      "expo": {
        // ... other config
        "plugins": [
          [
            "expo-notifications",
            {
              "icon": "./assets/notification-icon.png", // Path to your 96x96 grayscale icon
              "color": "#FFFFFF" // Color for the icon
            }
          ]
        ]
      }
    }
    ```

> [!IMPORTANT]
> For remote push notifications in production, you will need to configure credentials with APNs and FCM. EAS Build significantly helps in managing this process. Refer to the official Expo documentation for detailed setup instructions, especially when preparing for production builds.

### Referential Content

**1. Requesting Permissions**

Before you can send or receive notifications, you must request permission from the user.

```typescript
import * as Notifications from "expo-notifications";

async function requestPermissionsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true, // For Siri announcements, etc.
      },
    });
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return false;
  }
  return true;
}
```

**2. Getting the Expo Push Token**

To send remote push notifications to a specific device, you need its unique Expo Push Token. This token is specific to Expo's notification service, which then routes messages via APNs/FCM.

```typescript
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";

async function getPushTokenAsync() {
  if (!(await requestPermissionsAsync())) return; // Ensure permissions are granted

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      throw new Error('Project ID not found. Make sure you have configured 'extra.eas.projectId' in your app.config.js.');
    }
    const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log('Expo Push Token:', token);
    // Send this token to your backend server to store it against the user.
    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
    alert('Failed to get push token.');
    return null;
  }
}
```

> [!CAUTION]
> Expo Push Tokens are device-specific and can change. You should request and update the token on your server whenever the app starts or the token changes.

**3. Scheduling Local Notifications**

You can schedule a notification to appear at a later time.

```typescript
import * as Notifications from "expo-notifications";

async function scheduleLocalNotification(
  title: string,
  body: string,
  data: object,
  seconds: number
) {
  if (!(await requestPermissionsAsync())) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data, // Optional data to pass with the notification
      sound: "default", // Or a custom sound file
    },
    trigger: {
      seconds: seconds, // Number of seconds from now
      // repeats: true, // Optional: for repeating notifications
    },
  });
  console.log(`Scheduled notification: "${title}" in ${seconds} seconds`);
}

// Example: Schedule a SpeedyMeds medication reminder
// scheduleLocalNotification(
//   'SpeedyMeds Reminder',
//   'Time to take your Amoxicillin!',
//   { medicationId: 'amox123', dosage: '250mg' },
//   5 // In 5 seconds
// );
```

**4. Handling Received Notifications**

You need to set up listeners to handle notifications when they are received while the app is foregrounded, and to respond when a user interacts with a notification (e.g., taps it) when the app is backgrounded or killed.

```typescript
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

// This listener is fired whenever a notification is received while the app is foregrounded
const notificationListener = useRef<Notifications.Subscription>();
// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
const responseListener = useRef<Notifications.Subscription>();

// Call this in your root component (e.g., App.tsx)
function setupNotificationHandlers() {
  // Set default behavior for how notifications should be presented when received while the app is foregrounded.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // Show an alert
      shouldPlaySound: true, // Play a sound
      shouldSetBadge: false, // Set the app icon badge number (iOS only)
    }),
  });

  useEffect(() => {
    requestPermissionsAsync(); // Request permissions on app load
    getPushTokenAsync(); // Attempt to get and log the push token

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
        // You can add logic here for when a notification is received by the device
        // e.g., update UI, store data
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
        const notificationData = response.notification.request.content.data;
        // Example: Navigate to a specific screen based on notification data
        if (notificationData && notificationData.medicationId) {
          console.log(
            "Navigate to medication details for:",
            notificationData.medicationId
          );
          // navigation.navigate('MedicationDetails', { id: notificationData.medicationId });
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
}
```

> [!IMPORTANT]
> On Android, you might need to configure Notification Channels for more control over notification appearance and behavior. `expo-notifications` will use a default channel if none is specified. Refer to the Expo documentation for creating and managing channels.

**5. Sending Push Notifications (Server-Side)**

To send remote push notifications, your backend server will make an HTTP POST request to the Expo Push API endpoint (`https://exp.host/--/api/v2/push/send`) with the Expo Push Token(s) and the notification payload.

Example payload (JSON):

```json
{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "sound": "default",
  "title": "SpeedyMeds Update",
  "body": "Your prescription for Metformin is ready for pickup!",
  "data": { "orderId": "xyz789", "type": "pickupReady" }
}
```

Consult the [Expo Server SDKs](https://docs.expo.dev/push-notifications/sending-notifications/#server-side-integrations) or build your own server logic to interact with this API.

### Procedural Content

**Example: Setting up Basic Notification Handling and Scheduling a Local Reminder**

Let's integrate the permission request and a simple local notification scheduler into a conceptual SpeedyMeds component.

```tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, Platform, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // For projectId

// Must be called in the root component (App.tsx) or early in your app's lifecycle
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true, // Example: enable badge setting
  }),
});

/**
 * Requests notification permissions and retrieves the Expo Push Token.
 * It checks existing permissions and requests new ones if not granted.
 * If permissions are granted, it attempts to get the Expo Push Token using the projectId.
 * Alerts are shown if permissions are denied or token retrieval fails.
 *
 * @async
 * @function requestPermissionsAndGetToken
 * @returns {Promise<string | null>} A promise that resolves with the Expo Push Token string or null if permission is denied or an error occurs.
 */
async function requestPermissionsAndGetToken() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission to receive notifications was denied.");
    return null;
  }

  try {
    // Ensure you have projectId in your app.config.js extra.eas.projectId
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      console.warn(
        "Project ID not found in app.config.js. Push token won't be generated."
      );
      alert(
        "Project ID configuration is missing. Push token cannot be generated."
      );
      return null;
    }
    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;
    console.log("Expo Push Token:", token);
    return token;
  } catch (e) {
    console.error("Failed to get push token", e);
    alert("Failed to get push token. Check console for details.");
    return null;
  }
}

/**
 * A React component to demonstrate scheduling and handling notifications for SpeedyMeds.
 * It requests permissions, displays the Expo Push Token, allows scheduling a local
 * medication reminder, and sets up listeners for incoming notifications and responses.
 *
 * @returns {React.ReactElement} The rendered SpeedyMedsNotificationScheduler component.
 */
const SpeedyMedsNotificationScheduler: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    requestPermissionsAndGetToken().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("App Received Notification:", notification);
        // Handle foreground notification (e.g., update UI state)
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User Interacted With Notification:", response);
        // Handle user tapping on the notification
        const data = response.notification.request.content.data;
        if (data && data.screen) {
          // navigation.navigate(data.screen, data.params);
          alert(
            `Navigate to ${data.screen} with params: ${JSON.stringify(
              data.params
            )}`
          );
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const scheduleMedicationReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "SpeedyMeds Reminder 💊",
        body: "Don't forget to take your prescribed medication!",
        data: { screen: "MedicationLog", params: { from: "reminder" } },
        sound: "default",
      },
      trigger: { seconds: 5 }, // Show in 5 seconds for testing
    });
    alert("Medication reminder scheduled for 5 seconds from now!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tokenText}>
        Expo Push Token: {expoPushToken ?? "Requesting..."}
      </Text>
      <Button
        title="Schedule Medication Reminder (in 5s)"
        onPress={scheduleMedicationReminder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  tokenText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 12,
    paddingHorizontal: 10,
  },
});

export default SpeedyMedsNotificationScheduler;
```

**Explanation of the Example:**

This `SpeedyMedsNotificationScheduler` component provides a comprehensive demonstration of integrating `expo-notifications` for both local reminders and as a foundation for remote push notifications. Let's break down its functionality step-by-step:

1.  **Global Notification Handler (`Notifications.setNotificationHandler`):**
    Called once, typically at the root of your application (like `App.tsx`), this configuration defines how the app should behave when a notification is received _while the app is in the foreground_. In this example, we've configured it to `shouldShowAlert: true`, `shouldPlaySound: true`, and `shouldSetBadge: true` (for iOS), meaning foreground notifications will be actively presented to the user. Without this, foreground notifications might be silently received.

2.  **Permission Request and Token Retrieval (`requestPermissionsAndGetToken` function):**

    - This asynchronous helper function first checks the current notification permission status using `Notifications.getPermissionsAsync()`.
    - If permission isn't already granted, it calls `Notifications.requestPermissionsAsync()` to prompt the user. The `ios` specific options configure what permissions are asked for (alert, badge, sound, announcements).
    - If `finalStatus` is not `'granted'`, it alerts the user and returns `null`.
    - Crucially, for obtaining an Expo Push Token (used by Expo's servers to route remote notifications to this specific device via APNs/FCM), the `projectId` is required. This is fetched from `Constants.expoConfig?.extra?.eas?.projectId`. **It's vital that your `app.config.js` or `app.json` is correctly configured with this `projectId` under `extra.eas` if you intend to use Expo's push services.**
    - If the `projectId` is found, `Notifications.getExpoPushTokenAsync({ projectId })` is called. The `.data` property of the result contains the actual token string.
    - This token is then logged and returned. In a real application, this token would be sent to your backend server to be associated with the current user, enabling targeted push notifications.
    - Error handling is included to catch issues during token retrieval.

3.  **Component State and Lifecycle (`SpeedyMedsNotificationScheduler`):**

    - `expoPushToken` (state variable via `useState`): Stores the retrieved Expo Push Token to display it in the UI.
    - `notificationListener` and `responseListener` (via `useRef`): These refs hold references to the active notification event listeners, allowing them to be cleaned up properly.
    - `useEffect` hook: This is the heart of the component's setup and cleanup logic.
      - On component mount, it calls `requestPermissionsAndGetToken()` and updates the `expoPushToken` state.
      - `Notifications.addNotificationReceivedListener()`: Sets up a listener that fires whenever any notification is received by the device _while the app is running (foreground or background)_. The callback receives the `notification` object. This is useful for telemetry or updating app state silently.
      - `Notifications.addNotificationResponseReceivedListener()`: Sets up a listener that fires when a user _interacts_ with a notification (e.g., taps on it). This works whether the app was in the foreground, background, or even killed (and then launched by the notification tap). The `response` object contains the `notification` and the `actionIdentifier` if custom actions were used. The `response.notification.request.content.data` holds any custom data sent with the notification, which is critical for deep linking or custom handling (e.g., navigating to a specific screen).
      - The `return` function within `useEffect` is a cleanup function. It's crucial for removing the notification listeners when the component unmounts, preventing memory leaks and unexpected behavior. It uses `Notifications.removeNotificationSubscription()` with the stored listener references.

4.  **Scheduling a Local Notification (`scheduleMedicationReminder` function):**

    - This asynchronous function demonstrates how to schedule a local notification using `Notifications.scheduleNotificationAsync()`.
    - `content`: Defines the visual aspects of the notification (`title`, `body`, `sound`) and, importantly, a `data` payload. In this SpeedyMeds example, `data: { screen: "MedicationLog", params: { from: "reminder" } }` is included. This custom data can be retrieved by the `responseListener` to navigate the user to the `MedicationLog` screen when they tap the reminder.
    - `trigger`: Specifies when the notification should appear. Here, `seconds: 5` means it will fire 5 seconds after scheduling, useful for testing. For real reminders, you'd calculate seconds based on a specific date/time or use other trigger types like `DailyTrigger`, `WeeklyTrigger`, etc. (not shown in this specific example but available in the library).
    - An alert confirms to the user that the reminder has been scheduled.

5.  **UI Elements:**
    - A `<Text>` component displays the `expoPushToken` or a "Requesting..." message.
    - A `<Button>` allows the user to trigger the `scheduleMedicationReminder` function.

This comprehensive example covers the essential lifecycle of notifications: configuring global handling, requesting permissions, obtaining a push token, scheduling local notifications with data, and setting up listeners for both receiving notifications and handling user interactions with them. This forms a solid base for any application needing robust notification capabilities.

> [!CAUTION]
> Testing remote push notifications often requires a physical device, as simulators may have limitations. For Expo Go, ensure your device is logged into the same Expo account as your development machine. For development builds, ensure they are correctly configured for notifications.

> 📚 **Official Documentation:**
>
> - [Expo Notifications Overview](https://docs.expo.dev/versions/latest/sdk/notifications/)
> - [Expo: Sending Notifications with Expo's Push API](https://docs.expo.dev/push-notifications/sending-notifications/)
> - [Expo: Receiving Notifications](https://docs.expo.dev/push-notifications/receiving-notifications/)
> - [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
> - [Apple Push Notification service (APNs)](https://developer.apple.com/documentation/usernotifications)

### Next Steps

Understanding push notifications is key for user engagement. Next, we'll explore how to manage data offline, enabling your application to function even without a persistent internet connection.
