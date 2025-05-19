## Section 3: How Rendering Works (Legacy vs. Fabric)

A core function of React Native is translating your React component hierarchy into actual native UI elements displayed on the screen. The way this rendering process occurs differs significantly between the Legacy Architecture and the New Architecture's Fabric renderer. Understanding these rendering differences is crucial when developing sophisticated UIs like those needed in our SpeedyMeds pharmacy application.

> 🧗‍♀️ **(Self-Led):** As you work through this section, try to visualize the rendering flow in both architectures. Consider drawing your own diagrams to reinforce your understanding of how UI elements move from JavaScript to the screen.

### Legacy Rendering Process (UI Manager)

In the Legacy Architecture, rendering involved multiple steps across different threads:

1.  **JS Thread:** React executes your component code and creates a tree of React elements (the virtual DOM).
2.  **Shadow Thread:** React Native calculates layout information based on your styles (using the Yoga layout engine on the dedicated Shadow Thread) and generates a "shadow tree" representing the native UI hierarchy and layout.
3.  **JS Thread -> Bridge:** Instructions to create, update, or delete native views based on the shadow tree calculation are serialized into JSON messages.
4.  **Bridge -> Native Thread:** These messages are sent asynchronously across the Bridge to the native side.
5.  **Native (UI) Thread:** The native UI Manager receives the messages, deserializes them, and executes the corresponding native UI operations (e.g., creating an `UIView` on iOS or a `ViewGroup` on Android) on the main UI thread.

This multi-step, asynchronous process, heavily reliant on the Bridge, could lead to delays, especially during complex updates or animations, resulting in dropped frames and a less fluid user experience. Coordinating layout calculations on the Shadow Thread with UI updates on the native main thread via the asynchronous bridge was a key challenge.

### New Architecture Rendering (Fabric)

Fabric streamlines the rendering process by leveraging JSI and integrating layout calculation more tightly, often moving work off the main native thread:

1.  **Render Phase (JS Thread -> C++ via JSI):** React executes your JS code to create a React Element Tree. Fabric immediately uses this, via JSI, to create a corresponding React Shadow Tree directly in C++. This bypasses the need to send serialized descriptions of the UI over the Bridge.
2.  **Commit Phase (C++):** The C++ Shadow Tree is finalized. Layout information is calculated within the C++ layer, typically on a background thread, using the Yoga layout engine. The tree, now including layout data, is promoted as the "next tree" ready to be displayed.
3.  **Mount Phase (C++ -> Native UI Thread via JSI):** Fabric efficiently determines the difference ("diffing") between the currently displayed Host View Tree and the newly calculated Shadow Tree. It then schedules the necessary atomic UI operations (view creation, updates, deletions) on the native main thread via JSI. Fabric has more control over prioritizing these updates.

**Diagram: Legacy vs. Fabric Rendering Flow**

```mermaid
graph TD
    subgraph "Legacy Rendering"
        A1[React JS Code] --> B1[React Element Tree]
        B1 --> C1["Bridge (Serialized JSON)"]
        C1 --> D1["Shadow Thread (Yoga Layout)"]
        D1 --> E1["Bridge (Serialized JSON)"]
        E1 --> F1["Native UI Thread (UI Manager)"]
        F1 --> G1["Native Views (UIView/ViewGroup)"]
    end

    subgraph "Fabric Rendering"
        A2[React JS Code] --> B2[React Element Tree]
        B2 --> C2["JSI (Direct C++ Calls)"]
        C2 --> D2["C++ Shadow Tree Generation"]
        D2 --> E2["Layout Calculation (C++ Yoga)"]
        E2 --> F2["Diffing & Mount Operations"]
        F2 --> G2["Native Views (UIView/ViewGroup)"]
    end

    style A1 fill:#D6EAF8,stroke:#2E86C1
    style B1 fill:#D6EAF8,stroke:#2E86C1
    style C1 fill:#FADBD8,stroke:#E74C3C
    style D1 fill:#D5F5E3,stroke:#27AE60
    style E1 fill:#FADBD8,stroke:#E74C3C
    style F1 fill:#D5F5E3,stroke:#27AE60
    style G1 fill:#FCF3CF,stroke:#F1C40F

    style A2 fill:#D6EAF8,stroke:#2E86C1
    style B2 fill:#D6EAF8,stroke:#2E86C1
    style C2 fill:#D5F5E3,stroke:#27AE60
    style D2 fill:#D5F5E3,stroke:#27AE60
    style E2 fill:#D5F5E3,stroke:#27AE60
    style F2 fill:#D5F5E3,stroke:#27AE60
    style G2 fill:#FCF3CF,stroke:#F1C40F
```

The diagram above illustrates the fundamental differences between the legacy and Fabric rendering flows. In the Legacy Rendering flow (top), you can see multiple Bridge crossings (red components) that require serialization/deserialization and asynchronous communication. This adds latency and potential bottlenecks, especially for complex UIs or rapid updates. The Yoga layout calculations happen on a dedicated Shadow Thread, but still need to communicate back through the Bridge.

In contrast, the Fabric Rendering flow (bottom) shows a more streamlined process. Through JSI, JavaScript can directly communicate with the C++ layer to create the Shadow Tree. The layout calculations still use Yoga but occur within the C++ environment, eliminating a Bridge crossing. The final mounting process is more direct and controlled, with better diffing and prioritization capabilities. These improvements result in faster, smoother rendering performance with fewer dropped frames—essential for responsive UIs like medication lists or patient records in our SpeedyMeds application.

### Key Differences and Benefits of Fabric:

- **Reduced Bridge Overhead:** Fabric minimizes reliance on the asynchronous Bridge for rendering, reducing serialization costs and latency significantly.
- **Synchronous Operations:** JSI allows for more synchronous communication between JavaScript and the rendering system when needed (e.g., layout measurement), improving responsiveness for things like text input measurement or gesture handling.
- **Improved Threading Model:** Layout calculations happen in C++ (often off the main thread), freeing the main native UI thread to respond to user interactions more quickly. Fabric enables better prioritization of UI updates.
- **Faster Mounting:** Diffing the trees in C++ and scheduling atomic updates via JSI leads to faster and more efficient creation and updating of native views.
- **Concurrent React Features:** Fabric is designed to integrate seamlessly with React 18+ features like Concurrent Rendering, Suspense for data fetching, and Transitions, enabling more sophisticated UI patterns and better performance under heavy load.

> 📚 **Official Documentation:**
>
> - [Fabric Renderer | React Native](https://reactnative.dev/architecture/fabric-renderer)
> - [Fabric Native Components | React Native](https://reactnative.dev/docs/new-architecture-fabric-components)
> - [React Docs: Render and Commit](https://react.dev/learn/render-and-commit)
> - [Understanding Yoga Layout Engine](https://yogalayout.com/docs/)
>
> 🗂️ **Additional Resources:**
>
> - [React Native New Architecture Deep Dive](https://medium.com/shopify-engineering/react-native-at-shopify-benefits-of-the-new-architecture-edcecef0b5f)
> - [The Evolution of React Native's Architecture](https://formidable.com/blog/2019/lean-core-and-react-native-new-architecture/)

> 🌐 **(Web Developers):**
>
> **Comparison:** Fabric's rendering approach brings React Native closer to how React works in the browser with its Virtual DOM, but with the added complexity of managing native UI elements. The direct interaction via JSI and C++ shadow tree is a significant departure from manipulating a browser DOM directly or via web workers. The three-phase pipeline (Render, Commit, Mount) mirrors concepts in React itself.
>
> **Key Takeaway:** Fabric significantly optimizes the rendering pipeline compared to the legacy approach by reducing asynchronous bottlenecks, improving thread management through its C++ core, and enabling modern React features, leading to performance closer to native apps.
>
> **Source:** [React Documentation: Rendering Process](https://react.dev/learn/render-and-commit)

### Implications for SpeedyMeds Development

In our SpeedyMeds pharmacy application, the rendering process has direct implications for user experience:

- The medication list will benefit from Fabric's optimized rendering, especially when scrolling through large numbers of prescriptions. The improved diffing and priority management can keep the list smooth, even when new prescriptions are added.
- The patient detail screen, with its multiple information sections and potentially complex layout, will render more efficiently with the New Architecture's rendering pipeline.
- Form inputs for patient data or prescription information will be more responsive with the synchronous operations enabled by JSI, especially for validation and real-time feedback.

Understanding these rendering processes helps us make informed decisions about component structure, state management, and animation approaches in our pharmacy application.

Understanding these rendering differences highlights how the New Architecture tackles core performance issues present in the legacy system, aiming for a smoother and more native-like user experience.

### Exercise

Test your understanding of React Native's architectural rendering with **Exercise 2.1: Architecture Concepts Review**, a short quiz:

**(https://forms.microsoft.com/architecture-concepts-review)**

### Next Steps

Now that you understand how rendering works in both architectures, let's explore the practical implications these architectural differences have for you as a developer, including performance considerations and new capabilities the architecture enables.
