## Section 3: How Rendering Works (Legacy vs. Fabric)

A core function of React Native is translating your React component hierarchy into actual native UI elements displayed on the screen. The way this rendering process occurs differs significantly between the Legacy Architecture and the New Architecture's Fabric renderer.

**Legacy Rendering Process (UI Manager)**

In the Legacy Architecture, rendering involved multiple steps across different threads:

1.  **JS Thread:** React executes your component code and creates a tree of React elements (the virtual DOM).
2.  **Shadow Thread:** React Native calculates layout information based on your styles (using the Yoga layout engine on the dedicated Shadow Thread) and generates a "shadow tree" representing the native UI hierarchy and layout.
3.  **JS Thread -> Bridge:** Instructions to create, update, or delete native views based on the shadow tree calculation are serialized into JSON messages.
4.  **Bridge -> Native Thread:** These messages are sent asynchronously across the Bridge to the native side.
5.  **Native (UI) Thread:** The native UI Manager receives the messages, deserializes them, and executes the corresponding native UI operations (e.g., creating an `UIView` on iOS or a `ViewGroup` on Android) on the main UI thread.

This multi-step, asynchronous process, heavily reliant on the Bridge, could lead to delays, especially during complex updates or animations, resulting in dropped frames and a less fluid user experience. Coordinating layout calculations on the Shadow Thread with UI updates on the native main thread via the asynchronous bridge was a key challenge.

**New Architecture Rendering (Fabric)**

Fabric streamlines the rendering process by leveraging JSI and integrating layout calculation more tightly, often moving work off the main native thread:

1.  **Render Phase (JS Thread -> C++ via JSI):** React executes your JS code to create a React Element Tree. Fabric immediately uses this, via JSI, to create a corresponding React Shadow Tree directly in C++. This bypasses the need to send serialized descriptions of the UI over the Bridge.
2.  **Commit Phase (C++):** The C++ Shadow Tree is finalized. Layout information is calculated within the C++ layer, typically on a background thread, using the Yoga layout engine. The tree, now including layout data, is promoted as the "next tree" ready to be displayed.
3.  **Mount Phase (C++ -> Native UI Thread via JSI):** Fabric efficiently determines the difference ("diffing") between the currently displayed Host View Tree and the newly calculated Shadow Tree. It then schedules the necessary atomic UI operations (view creation, updates, deletions) on the native main thread via JSI. Fabric has more control over prioritizing these updates.

**Key Differences and Benefits of Fabric:**

- **Reduced Bridge Overhead:** Fabric minimizes reliance on the asynchronous Bridge for rendering, reducing serialization costs and latency significantly.
- **Synchronous Operations:** JSI allows for more synchronous communication between JavaScript and the rendering system when needed (e.g., layout measurement), improving responsiveness for things like text input measurement or gesture handling.
- **Improved Threading Model:** Layout calculations happen in C++ (often off the main thread), freeing the main native UI thread to respond to user interactions more quickly. Fabric enables better prioritization of UI updates.
- **Faster Mounting:** Diffing the trees in C++ and scheduling atomic updates via JSI leads to faster and more efficient creation and updating of native views.
- **Concurrent React Features:** Fabric is designed to integrate seamlessly with React 18+ features like Concurrent Rendering, Suspense for data fetching, and Transitions, enabling more sophisticated UI patterns and better performance under heavy load.

> 🌐 **(Web Developers - React/Angular):**
>
> **Comparison:** Fabric's rendering approach brings React Native closer to how React works in the browser with its Virtual DOM, but with the added complexity of managing native UI elements. The direct interaction via JSI and C++ shadow tree is a significant departure from manipulating a browser DOM directly or via web workers. The three-phase pipeline (Render, Commit, Mount) mirrors concepts in React itself.
>
> **Key Takeaway:** Fabric significantly optimizes the rendering pipeline compared to the legacy approach by reducing asynchronous bottlenecks, improving thread management through its C++ core, and enabling modern React features, leading to performance closer to native apps.

Understanding these rendering differences highlights how the New Architecture tackles core performance issues present in the legacy system, aiming for a smoother and more native-like user experience.

**(URL_to_Tool)** (TODO: Replace with actual Microsoft Forms link for Exercise 2.1: Architecture Concepts Review)
