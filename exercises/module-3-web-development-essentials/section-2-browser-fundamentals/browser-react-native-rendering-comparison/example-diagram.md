# Example Browser and React Native Rendering Comparison Diagram

Below is an example mermaid diagram illustrating the comparison between browser rendering and React Native rendering processes. This diagram shows the key steps in each pipeline and highlights the similarities and differences between them.

```mermaid
graph TD
    %% Define styles
    classDef browser fill:#a8d8ea,stroke:#333,stroke-width:1px;
    classDef reactNative fill:#f9d77e,stroke:#333,stroke-width:1px;
    classDef similar fill:#9de7bb,stroke:#333,stroke-width:1px;
    classDef performance fill:#ff9a8b,stroke:#333,stroke-width:1px;
    
    %% Title
    title[Browser vs React Native Rendering Comparison]
    
    %% Browser Rendering Pipeline
    subgraph "Browser Rendering Pipeline"
        B1[HTML Document]:::browser --> B2[Parse HTML]:::browser
        B2 --> B3[DOM Tree]:::browser
        
        B4[CSS Stylesheets]:::browser --> B5[Parse CSS]:::browser
        B5 --> B6[CSSOM Tree]:::browser
        
        B3 --> B7[Combine DOM & CSSOM]:::browser
        B6 --> B7
        B7 --> B8[Render Tree]:::browser
        B8 --> B9[Layout/Reflow]:::browser
        B9 --> B10[Paint]:::browser
        B10 --> B11[Composite]:::browser
        
        %% JavaScript interaction
        B12[JavaScript]:::browser --> B13[Modify DOM/CSSOM]:::browser
        B13 --> B7
    end
    
    %% React Native Rendering Pipeline
    subgraph "React Native Rendering Pipeline"
        R1[JSX Components]:::reactNative --> R2[Parse JSX]:::reactNative
        R2 --> R3[React Element Tree]:::reactNative
        R3 --> R4[Virtual DOM]:::reactNative
        R4 --> R5[Reconciliation/Diffing]:::reactNative
        R5 --> R6[Shadow Tree]:::reactNative
        R6 --> R7[Layout Calculation]:::reactNative
        R7 --> R8[Native Commands]:::reactNative
        R8 --> R9[Native UI Components]:::reactNative
        
        %% JavaScript interaction
        R10[JavaScript]:::reactNative --> R11[State/Props Changes]:::reactNative
        R11 --> R5
    end
    
    %% Similarities and Connections
    B3 <-.->|Similar concept|R4:::similar
    B7 <-.->|Similar purpose|R5:::similar
    B9 <-.->|Similar calculations|R7:::similar
    B13 <-.->|Similar trigger|R11:::similar
    
    %% Performance Considerations
    P1[DOM Manipulation\nCan cause reflows]:::performance --> B13
    P2[Long JS Tasks\nBlock rendering]:::performance --> B12
    P3[Bridge Serialization\nOverhead]:::performance --> R8
    P4[JS Thread Blocking\nAffects responsiveness]:::performance --> R10
```

## Key Components Explained

### Browser Rendering Pipeline

1. **HTML Document → Parse HTML → DOM Tree**
   - Browser receives HTML and parses it into a tree structure
   - DOM (Document Object Model) represents the page structure
   - Performance impact: Large/complex DOMs slow down processing

2. **CSS Stylesheets → Parse CSS → CSSOM Tree**
   - Browser parses CSS into the CSS Object Model
   - CSSOM represents all styling information
   - Performance impact: Complex selectors increase parse time

3. **Combine DOM & CSSOM → Render Tree**
   - Browser combines DOM and CSSOM to create the Render Tree
   - Only includes visible elements with their styles
   - Performance impact: Style recalculation can be expensive

4. **Layout/Reflow → Paint → Composite**
   - Layout: Calculate size and position of each element
   - Paint: Fill in pixels for each element
   - Composite: Combine layers for final display
   - Performance impact: Layout is particularly expensive

5. **JavaScript → Modify DOM/CSSOM**
   - JavaScript can modify the DOM and styles
   - Changes trigger parts of the rendering pipeline again
   - Performance impact: Frequent modifications cause performance issues

### React Native Rendering Pipeline

1. **JSX Components → Parse JSX → React Element Tree**
   - JSX is transformed into React elements
   - Creates a tree of React elements
   - Performance impact: Complex component trees take longer to process

2. **React Element Tree → Virtual DOM → Reconciliation/Diffing**
   - Virtual DOM is a lightweight representation of the UI
   - Reconciliation compares previous and new Virtual DOM
   - Performance impact: Efficient diffing minimizes updates

3. **Reconciliation → Shadow Tree → Layout Calculation**
   - Shadow Tree is a C++ implementation of the UI hierarchy
   - Yoga engine calculates layout using Flexbox
   - Performance impact: Complex layouts require more calculation

4. **Layout → Native Commands → Native UI Components**
   - Generate commands to create/update native views
   - Commands cross the bridge to the native thread
   - Native components are updated
   - Performance impact: Bridge serialization adds overhead

5. **JavaScript → State/Props Changes**
   - JavaScript runs in a separate thread
   - State/props changes trigger reconciliation
   - Performance impact: JavaScript thread blocking affects responsiveness

## Similarities and Differences

### Key Similarities
- Both use a tree structure to represent UI (DOM vs Virtual DOM)
- Both perform layout calculations (Reflow vs Yoga)
- Both have a reconciliation process to determine what to update
- Both are affected by JavaScript performance

### Key Differences
- Browser renders to the DOM, React Native to native UI components
- Browser combines DOM and CSSOM, React Native uses props for styling
- Browser rendering happens in one thread, React Native uses multiple threads
- React Native has a bridge serialization overhead that browsers don't have

## Performance Considerations

### Browser Performance Bottlenecks
- DOM manipulation triggering reflows
- Blocking JavaScript execution
- Complex CSS selectors
- Large DOM trees

### React Native Performance Bottlenecks
- Bridge serialization overhead
- JavaScript thread blocking
- Complex component hierarchies
- Frequent re-renders

## Notes for Instructors

When reviewing student diagrams, look for:
- Clear representation of both pipelines
- Identification of key similarities and differences
- Understanding of performance implications
- Proper sequencing of steps in each pipeline
- Recognition of the multi-threaded nature of React Native
