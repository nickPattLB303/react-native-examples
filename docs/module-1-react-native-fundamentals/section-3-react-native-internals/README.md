# Section 3: React Native Internals

## Learning Objectives
After completing this section, you will be able to:
- Explain the core architecture of React Native
- Understand how the JavaScript and native threads communicate
- Describe the rendering process from React components to native UI
- Identify the key components of the React Native runtime

**Prerequisite Knowledge**: Basic understanding of React and mobile development concepts
**Estimated Time**: 30-45 minutes

## Introduction

To truly understand React Native, we need to look under the hood at its architecture. This knowledge will help you debug issues, optimize performance, and make better design decisions.

### High-Level Overview

At its core, React Native consists of three main parts:

1. **JavaScript Thread**: Where your React code runs
2. **Native Threads**: Platform-specific (iOS/Android) threads that handle UI rendering
3. **Bridge**: The communication layer between JavaScript and native code

![React Native Architecture](./examples/architecture-diagram.png)

> 💡 **Tip**: This section gets pretty technical - don't worry if it doesn't all click right away. Focus on grasping the basic idea of how JavaScript talks to native code through the bridge. The implementation details will make more sense once you've built a few components. If something feels too complex, just make a mental note and keep moving - we'll revisit these concepts in context later.

> 💡 **Deep Dive**: React Native is not a "compile once, run anywhere" framework like Flutter. Instead, it's a "learn once, write anywhere" framework that uses a runtime bridge to connect JavaScript code with native platform components. This approach allows for true native rendering while maintaining a unified development experience.

### The JavaScript Thread

The JavaScript thread is where most of your application code runs. It includes:

- React Core: The reconciliation engine
- Your application logic
- State management
- Event handling
- Network requests

```javascript
// This code runs in the JavaScript thread
function MedicationScreen() {
  const [medications, setMedications] = useState([]);
  
  useEffect(() => {
    // Network request happens in JS thread
    fetchMedications().then(data => {
      setMedications(data);
    });
  }, []);
  
  return (
    <FlatList
      data={medications}
      renderItem={({ item }) => <MedicationItem medication={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}
```

The JavaScript code runs in a JavaScript engine:
- On iOS: JavaScriptCore (the Safari JS engine)
- On Android: Either JavaScriptCore or Hermes (Facebook's optimized JS engine for mobile)

> 🔄 **For Web Developers**: This is similar to how JavaScript runs in a browser, but without DOM manipulation. Instead of updating a DOM, React Native updates a "shadow tree" that then communicates changes to the native side.

### The Native Threads

Each platform has its own native threads:

**iOS Native Thread:**
- Manages UIKit components
- Handles native module calls
- Renders UI using UIView hierarchy

**Android Native Thread:**
- Manages Android UI components
- Handles native module calls
- Renders UI using Android View hierarchy

> 🔄 **For iOS Developers**: Think of this as the main thread in UIKit applications where all UI updates must occur.

> 🔄 **For Android Developers**: This is equivalent to the main thread in Android where UI operations must take place.

### The Bridge

The bridge is the communication layer between JavaScript and native code. It:

1. Serializes data between JavaScript and native code
2. Queues and batches messages for efficiency
3. Enables asynchronous communication

```
JavaScript Thread                Bridge                 Native Thread
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Code     │──────▶ JSON Messages  │──────▶  Native Modules │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        ▲                                                  │
        │                                                  │
        └──────────────────────────────────────────────────┘
                         Callbacks/Events
```

> 💡 **Deep Dive**: The bridge uses a serialization/deserialization process for all communication. This means that complex objects are converted to JSON strings, sent across the bridge, and then parsed back into objects on the other side. This process introduces some overhead, which is why operations that require frequent bridge communication (like animations) can sometimes cause performance issues.

## The Rendering Process

Let's follow what happens when you render a component:

### 1. React Reconciliation

When your component's state or props change, React's reconciliation algorithm (also known as the Virtual DOM) determines what needs to update.

```javascript
// State update triggers reconciliation
const [selectedMedication, setSelectedMedication] = useState(null);

// Later in your code
setSelectedMedication(medication); // Triggers React reconciliation
```

### 2. Shadow Tree Updates

React Native maintains a "shadow tree" in C++ that mirrors your component hierarchy. After reconciliation, React Native updates this shadow tree.

> 💡 **Deep Dive**: The shadow tree is a lightweight representation of your UI hierarchy. It's used to calculate layout using a C++ implementation of Flexbox called Yoga. This happens on a separate thread to avoid blocking the main thread.

### 3. Layout Calculation

The Yoga layout engine calculates positions and dimensions for all components based on their flexbox properties.

```javascript
// These style properties are processed by the Yoga layout engine
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
  medicationCard: {
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  }
});
```

### 4. Native Command Generation

Once layout is calculated, React Native generates commands to create and update native views.

### 5. Native UI Updates

These commands cross the bridge and are executed on the native thread, updating the actual UI components the user sees.

```
React Component → Virtual DOM → Shadow Tree → Layout Calculation → Native Commands → Native Views
```

> 🔄 **For Android Developers**: This is similar to how RecyclerView works with its Adapter and ViewHolder pattern, but with an additional layer of abstraction.

> 🔄 **For iOS Developers**: This process is comparable to how UICollectionView manages its cells, but with React determining the updates instead of delegate methods.

## Native Modules and Components

React Native provides two ways to extend its functionality with native code:

### Native Modules

Native modules allow you to write native code and expose it to JavaScript. They're useful for:
- Accessing platform APIs not yet supported by React Native
- Performance-critical operations
- Integrating with third-party native SDKs

**iOS Example (Objective-C):**
```objective-c
@implementation RCTMedicationScanner

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(scanMedication:(NSString *)barcode
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Native implementation of barcode scanning
  // ...
  
  // Return result to JavaScript
  resolve(@{@"name": @"Amoxicillin", @"dosage": @"500mg"});
}

@end
```

**Android Example (Java):**
```java
public class MedicationScannerModule extends ReactContextBaseJavaModule {
  @Override
  public String getName() {
    return "MedicationScanner";
  }
  
  @ReactMethod
  public void scanMedication(String barcode, Promise promise) {
    // Native implementation of barcode scanning
    // ...
    
    // Return result to JavaScript
    WritableMap result = Arguments.createMap();
    result.putString("name", "Amoxicillin");
    result.putString("dosage", "500mg");
    promise.resolve(result);
  }
}
```

**JavaScript Usage:**
```javascript
import { NativeModules } from 'react-native';
const { MedicationScanner } = NativeModules;

// Later in your code
async function scanMed() {
  try {
    const result = await MedicationScanner.scanMedication('123456789');
    console.log(result); // { name: 'Amoxicillin', dosage: '500mg' }
  } catch (error) {
    console.error(error);
  }
}
```

### Native Components

Native components allow you to create custom UI components with native code:

**iOS Example (Swift with Objective-C bridging):**
```swift
class MedicationBarcodeScannerManager: RCTViewManager {
  override func view() -> UIView! {
    return MedicationBarcodeScanner()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
```

**Android Example (Java):**
```java
public class MedicationBarcodeScannerManager extends SimpleViewManager<BarcodeScannerView> {
  @Override
  public String getName() {
    return "MedicationBarcodeScanner";
  }
  
  @Override
  protected BarcodeScannerView createViewInstance(ThemedReactContext reactContext) {
    return new BarcodeScannerView(reactContext);
  }
}
```

**JavaScript Usage:**
```javascript
import { requireNativeComponent } from 'react-native';
const MedicationBarcodeScanner = requireNativeComponent('MedicationBarcodeScanner');

function ScanScreen() {
  return (
    <View style={styles.container}>
      <MedicationBarcodeScanner style={styles.scanner} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}
```

> 💡 **Deep Dive**: When you use a native component, React Native creates a corresponding native view in the platform's UI system. Props you pass from JavaScript are sent across the bridge and applied to the native view. Events triggered in the native view can be sent back to JavaScript through the bridge.

## Threading Model

React Native uses several threads to maintain responsiveness:

1. **Main Thread (Native)**: Handles UI updates and user interactions
2. **JavaScript Thread**: Runs your React code and business logic
3. **Shadow Thread**: Performs layout calculations
4. **Background Threads**: Handle various tasks like image processing

This multi-threaded architecture helps keep the UI responsive even when performing complex operations.

> 💡 **Deep Dive**: The JavaScript thread is single-threaded, just like in a browser. This means long-running JavaScript operations can block other JavaScript code from executing. However, because UI rendering happens on a separate native thread, the app can still respond to user interactions even if the JavaScript thread is busy.

## The New Architecture

React Native is evolving with a new architecture that addresses some limitations of the current design:

### Key Components of the New Architecture:

1. **JavaScript Interface (JSI)**: Direct communication between JavaScript and C++ without serialization
2. **Fabric**: A new rendering system with synchronous operations
3. **TurboModules**: More efficient native modules
4. **CodeGen**: Automatic generation of native code from JavaScript specifications

> 💡 **Deep Dive**: The new architecture replaces the bridge with JSI (JavaScript Interface), which allows JavaScript to hold references to C++ objects and call methods on them directly. This eliminates the serialization/deserialization overhead of the bridge and enables synchronous communication between JavaScript and native code.

## Exercise: React Native Architecture Diagram

In this exercise, you will create a visual representation of React Native's architecture to understand how data flows through the system when a user interacts with a pharmacy app.

### Objective
Visualize and explain the complete data flow in a React Native application from user interaction to UI updates, identifying potential performance bottlenecks.

### Steps
1. Create a diagram that illustrates the flow of data and control in a React Native application:
   - Start with a user interaction (e.g., tapping a "Refill Prescription" button)
   - Show how the event travels through the React Native architecture
   - Illustrate how data flows back to update the UI
   - Identify potential performance bottlenecks in this flow

2. Include the following components in your diagram:
   - The JavaScript thread processing the event
   - The bridge serializing/deserializing messages
   - The native modules handling platform-specific operations
   - The UI components being updated
   - The threading model and how it affects the flow

3. Add annotations explaining:
   - Where potential delays might occur
   - How the architecture handles asynchronous operations
   - What happens when multiple UI updates are triggered simultaneously

### Application
This exercise simulates the architectural analysis needed when optimizing a pharmacy app's performance. Understanding React Native's internal architecture is crucial when debugging performance issues in medication management features, implementing smooth prescription refill workflows, or optimizing medication reminder notifications that require interaction with native device capabilities.

#### Exercise Resources
Complete this exercise using the [Architecture Diagram Microsoft Whiteboard](https://whiteboard.microsoft.com/architectureDiagram) to create your diagram.

## Summary

React Native's architecture is a sophisticated system that bridges the gap between JavaScript and native mobile platforms. By understanding how the JavaScript thread communicates with native components through the bridge, you can better optimize your applications and debug issues when they arise.

The multi-threaded design allows React Native to maintain UI responsiveness while executing JavaScript code, and the component-based model enables a declarative approach to building interfaces. As React Native evolves with its new architecture, many of the current limitations around performance and synchronous native interactions are being addressed.

In the next section, we'll explore the official React Native documentation and learn how to effectively use it as a resource throughout your development journey. 