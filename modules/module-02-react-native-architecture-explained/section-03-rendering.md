## Section 3: How Rendering Works (Legacy vs. Fabric)

A core function of React Native is translating your React component hierarchy into actual native UI elements displayed on the screen. The way this rendering process occurs differs significantly between the Legacy Architecture and the New Architecture's Fabric renderer.

**Legacy Rendering Process (UI Manager)**

In the Legacy Architecture, rendering involved multiple steps across different threads:

1.  **JS Thread:** React executes your component code and creates a tree of React elements (the virtual DOM).
2.  **JS Thread:** React Native calculates layout information based on your styles (using the Yoga layout engine) and generates a "shadow tree" representing the native UI hierarchy and layout.
3.  **JS Thread -> Bridge:** Instructions to create, update, or delete native views based on the shadow tree calculation are serialized into JSON messages.
4.  **Bridge -> Native Thread:** These messages are sent asynchronously across the Bridge to the native side.
5.  **Native (UI) Thread:** The native UI Manager receives the messages, deserializes them, and executes the corresponding native UI operations (e.g., creating an `UIView` on iOS or a `ViewGroup` on Android) on the main UI thread.

This multi-step, asynchronous process, heavily reliant on the Bridge, could lead to delays, especially during complex updates or animations, resulting in dropped frames and a less fluid user experience. Coordinating layout calculations on the JS thread with UI updates on the native main thread was a key challenge.

**New Architecture Rendering (Fabric)**

Fabric streamlines the rendering process by leveraging JSI and moving more work off the main native thread:

1.  **JS Thread:** React creates the element tree as before.
2.  **JS Thread -> JSI -> C++:** Instead of sending serialized messages over the Bridge, React Native uses JSI to create the shadow tree directly in C++. This C++ shadow tree is accessible from both JavaScript and native code.
3.  **Background Thread (C++):** Layout calculations using the Yoga engine happen primarily on a background thread within the C++ layer.
4.  **C++ -> JSI -> Native (UI) Thread:** Once the layout is complete, Fabric uses JSI to schedule UI operations (view creation, updates) on the native main thread more efficiently and with higher priority possibilities.

**Key Differences and Benefits of Fabric:**

- **Reduced Bridge Overhead:** Fabric minimizes reliance on the asynchronous Bridge for rendering, reducing serialization costs and latency.
- **Synchronous Operations:** JSI allows for more synchronous communication between JavaScript and the rendering system when needed, improving responsiveness for things like text input measurement or gesture handling.
- **Improved Threading Model:** Layout calculations are moved off the main native UI thread, freeing it up to respond to user interactions more quickly. Fabric has more control over prioritizing UI updates.
- **Faster Mounting:** Creating and updating native views can be faster due to the more direct communication path via JSI.
- **Concurrent React Features:** Fabric is designed to integrate better with future React features like Concurrent Rendering, enabling more sophisticated UI patterns and better performance under heavy load.

> 🌐 **(Web Developers - React/Angular):**
>
> **Comparison:** Fabric's rendering approach brings React Native closer to how React works in the browser with its Virtual DOM, but with the added complexity of managing native UI elements. The direct interaction via JSI and C++ shadow tree is a significant departure from manipulating a browser DOM directly or via web workers.
>
> **Key Takeaway:** Fabric significantly optimizes the rendering pipeline compared to the legacy approach by reducing asynchronous bottlenecks and improving thread management, leading to performance closer to native apps.

Understanding these rendering differences highlights how the New Architecture tackles core performance issues present in the legacy system, aiming for a smoother and more native-like user experience.

**(URL_to_Tool)** (TODO: Replace with actual Microsoft Forms link for Exercise 2.1: Architecture Concepts Review)
