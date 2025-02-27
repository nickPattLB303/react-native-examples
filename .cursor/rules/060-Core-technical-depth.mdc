---
name: "Technical Depth and Explanations"
version: "1.0"
description: "ensures that all technical content provides sufficient depth, particularly focusing on \"under the hood\" explanations of React Native's internal workings rather than just surface-level API usage"
priority: "high"
type: "Core"
globs: 
  - "docs/**/*.md"
triggers:
  - file_change
  - file_open
alwaysApply: false
---

# Technical Depth and Explanations

[README.md](mdc:README.md)
[README.md](mdc:docs/README.md)
[Cursor Rules README](mdc:.cursor/README.md)


## Description
This rule ensures that all technical content provides sufficient depth, particularly focusing on "under the hood" explanations of React Native's internal workings rather than just surface-level API usage.

## Rule
- All technical explanations must include:
  - Surface-level usage instructions (how to use the API/feature)
  - Mid-level conceptual explanations (how it works conceptually)
  - Deep-level internal explanations (how it works under the hood)

- "Under the hood" explanations must cover:
  - JavaScript to native bridge mechanics where relevant
  - Threading model and performance implications
  - Platform-specific implementation details
  - Rendering pipeline and reconciliation process
  - Memory management considerations

- Avoid vague explanations like:
  - "React Native handles that for you"
  - "It just works"
  - "The framework takes care of this"

- Include diagrams and visual explanations for complex concepts:
  - Architecture diagrams
  - Data flow diagrams
  - Component lifecycle visualizations
  - Bridge communication flow

- Connect React Native concepts to familiar concepts in:
  - Android development (Java/Kotlin)
  - iOS development (Swift/Objective-C)
  - Web development (React/Angular)

- Include references to source code or official documentation for further exploration

## Examples
- Proper technical explanation:
  ```markdown
  # React Native FlatList Component

  ## Usage (Surface Level)
  The `FlatList` component is used to render large lists of data efficiently. Here's how to implement a basic list:

  ```jsx
  <FlatList
    data={medications}
    renderItem={({ item }) => <MedicationItem medication={item} />}
    keyExtractor={item => item.id.toString()}
  />
  ```

  ## How It Works (Mid Level)
  Unlike a standard mapping of items to components, `FlatList` only renders items that are currently visible on screen plus a small buffer. As you scroll, items that move off-screen are recycled, and new items are rendered as they come into view.

  ## Under The Hood (Deep Level)
  The `FlatList` component is built on React Native's `VirtualizedList`, which implements virtualization. Here's what happens internally:

  1. **Native List Components**: On iOS, `FlatList` uses `UICollectionView`, while on Android it uses `RecyclerView`. These native components are specifically designed for efficient list rendering.

  2. **Cell Recycling**: Rather than creating new view instances for each item, `FlatList` maintains a pool of reusable "cells" (views). As you scroll, off-screen cells are detached from their data and recycled for new items coming into view.

  3. **Windowing**: The component maintains a "window" of rendered items. The JavaScript thread calculates which items should be visible based on scroll position and sends only those items across the bridge to the native thread.

  4. **Bridge Optimization**: To minimize bridge traffic (a common performance bottleneck), `FlatList` batches updates and only sends the minimum required information across the bridge.

  5. **Memory Management**: By rendering only visible items, memory usage remains relatively constant regardless of list size. This is critical for mobile apps where memory constraints are significant.

  > 🔍 **For Android Developers**: This recycling mechanism is very similar to how `RecyclerView` and `ViewHolder` pattern works in native Android.

  > 🔍 **For iOS Developers**: This is analogous to `UICollectionView`'s cell reuse mechanism with `dequeueReusableCell(withReuseIdentifier:for:)`.
  ```

- Improper technical explanation:
  ```markdown
  # FlatList Component

  The `FlatList` component is used to render lists in React Native. It's optimized for performance and handles rendering efficiently. React Native takes care of recycling views as you scroll.

  ```jsx
  <FlatList
    data={medications}
    renderItem={({ item }) => <MedicationItem medication={item} />}
    keyExtractor={item => item.id.toString()}
  />
  ```
  