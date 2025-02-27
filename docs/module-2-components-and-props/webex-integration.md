# Module 2: Components and Props - Webex Integration Plan

> Module: Components and Props  
> Estimated time: N/A - Instructor Resource

## Overview

This document provides specific guidance for integrating Webex chat discussions with Module 2: Components and Props. It includes suggested discussion prompts, collaborative exercises, and knowledge-checking activities designed to complement the repository content and Articulate e-learning materials.

## Key Learning Objectives for Webex Reinforcement

- Understand component composition and reusability
- Master props passing and data flow between components
- Apply pharmacy theme to component design
- Implement proper component organization patterns
- Practice component debugging and troubleshooting

## Discussion Prompts

### Pre-Module Discussion (Day Before)

Post these prompts in #module2 to prepare participants:

```
🔍 PREPARATION DISCUSSION:

Think about prescription/medication data for a pharmacy app. What kinds of components 
might we need to display this information effectively? Share 2-3 ideas for components 
and what props each might need.

Examples to consider:
- Medication details
- Prescription status
- Refill information
```

### During Module Discussions

Post these at designated checkpoints during the training:

#### After Component Basics (2.1)

```
💊 COMPONENT DESIGN DISCUSSION:

Now that we understand React Native components, let's think pharmacy-specific:

1. What are the advantages of breaking a medication list screen into smaller components?

2. Share a simple component you've created (or plan to create) that displays 
   medication information. What props does it need?

3. How would you handle different medication types (pills, liquids, etc.) in your component design?
```

#### After Props Deep Dive (2.2)

```
🔄 PROPS FLOW DISCUSSION:

Let's discuss how data flows through our pharmacy app components:

1. Sketch the component hierarchy for a Prescription Refill screen. What props would 
   flow down through this hierarchy?

2. When might you use prop destructuring in your medication components? Share an example.

3. How would you handle optional medication information (like side effects that might 
   not exist for all medications)?
```

#### After Component Lifecycle (2.3)

```
🔄 COMPONENT LIFECYCLE APPLICATION:

For our pharmacy app components:

1. When would you fetch medication data - in which lifecycle method/hook and why?

2. How would you handle loading states while waiting for medication data?

3. What cleanup might be needed when a patient switches away from their medication 
   details screen?
```

## Webex Collaborative Exercises

### Pair Programming Exercise: MedicationCard Component

Post in #challenges during the props section:

```
👥 PAIR PROGRAMMING CHALLENGE: MedicationCard Component

Form pairs in threads below. Each pair will build a MedicationCard component following these steps:

NAVIGATOR ROLE:
- Guide implementation decisions
- Share requirements and acceptance criteria
- Review code and suggest improvements

DRIVER ROLE:
- Implement the actual code
- Share screen or code snippets
- Explain implementation choices

REQUIREMENTS:
1. Create a MedicationCard component that displays:
   - Medication name (bold)
   - Dosage information
   - Next refill date
   - Warning indicator for interactions

2. Accept these props:
   - medication (object with name, dosage, refillDate)
   - hasInteractions (boolean)
   - onPressRefill (function)

3. Include a "Request Refill" button that calls onPressRefill

4. Style according to these rules:
   - Red background if hasInteractions is true
   - Yellow background if refill date is within 3 days
   - Green background otherwise

SWITCH ROLES halfway through!

Post your solution in a thread with screenshots of the component in different states.
```

### Group Code Review: Component Composition

```
🔍 GROUP CODE REVIEW: Component Composition

In groups of 3-4 (assigned in threads below), review each other's PrescriptionList component implementation:

1. Each person will share their implementation of the PrescriptionList component from today's exercise

2. For each implementation, the group should discuss:
   - Component composition - how well is it broken down?
   - Props usage - are they appropriately named and used?
   - Pharmacy terminology consistency
   - Code readability and maintainability
   - Performance considerations

3. Each review should provide:
   - 2 specific strengths
   - 1 suggestion for improvement
   - 1 question about the implementation

4. After all reviews, collaborate on a "best practices" list for component composition based on your discussion

Post your group's final best practices list in the main channel.
```

### Asynchronous Challenge: PropTypes Implementation

```
🌙 EVENING CHALLENGE: PropTypes for Pharmacy Components

For tonight's optional challenge:

1. Add PropTypes to the components we built today:
   - MedicationItem
   - PrescriptionList
   - RefillButton

2. Consider:
   - Which props should be required vs optional?
   - What specific types should each prop validate against?
   - Are there custom validators you could create for medication data?
   - How would you document these PropTypes for other developers?

3. BONUS: Implement defaultProps for optional props

Share your implementation in a thread with an explanation of your PropTypes decisions.

We'll review the best implementations tomorrow morning!
```

## Knowledge Check Activities

### Quick Poll: Component Concepts

```
📊 QUICK POLL: Component Concepts

Test your understanding with these quick questions (react with the letter of your answer):

1️⃣ Which statement about React Native components is TRUE?
A) Components must always render at least one element
B) Components can only receive a maximum of 5 props
C) Function components cannot have state
D) Class components are recommended over function components

2️⃣ When passing props to a component, which is the CORRECT syntax?
A) <MedicationItem name="Aspirin" dose={500} />
B) <MedicationItem name="Aspirin" dose="500" />
C) <MedicationItem {name: "Aspirin", dose: 500} />
D) <MedicationItem props={name: "Aspirin", dose: 500} />

3️⃣ In a pharmacy app, which would be the MOST appropriate prop name?
A) value
B) thing
C) medicationDosage
D) med_dose
```

### Concept Mapping Challenge

```
🗺️ CONCEPT MAPPING CHALLENGE

In threads below, create a concept map connecting these ideas:
- Components
- Props
- JSX
- Component hierarchy
- Data flow
- Rendering

Use pharmacy app examples for each connection you make!

For example: "Props → Component Hierarchy: The MedicationList component passes prescription IDs as props to each PrescriptionItem child component"

Try to connect at least 4 concepts in your map.
```

## Module-Specific Troubleshooting Guide

Pin this message in the #module2 channel:

```
📋 COMMON COMPONENT & PROPS ISSUES:

1️⃣ "Cannot read property 'X' of undefined" in components
   🔍 Check: Are you destructuring a prop that might not exist?
   ✅ Solution: Add default values or conditional rendering
   Example: const { name = 'Unknown' } = medication || {};

2️⃣ Component not re-rendering when props change
   🔍 Check: Are you comparing objects directly in shouldComponentUpdate?
   ✅ Solution: Use deep comparison or break into primitive props

3️⃣ Props seem to be one step behind expected values
   🔍 Check: Are you using state and props together correctly?
   ✅ Solution: Use functional updates with setState

4️⃣ Style props not applying correctly
   🔍 Check: StyleSheet order matters! Later styles override earlier ones
   ✅ Solution: Check style array order or style merging

Post in thread if you need help with any of these issues.
```

## Instructor Notes

### Key Discussion Points

During Webex discussions, emphasize these points:

1. **Component Granularity**: Push participants to make smaller, more focused components
2. **Props vs State**: Clarify confusion between when to use each
3. **Pharmacy Relevance**: Keep bringing discussion back to pharmacy use cases
4. **Common Patterns**: Highlight Container/Presentational patterns for medication data

### Potential Misconceptions to Address

Be prepared to address these common misconceptions:

1. "More components always mean better organization" - Discuss the balance
2. "Props are only for data" - Emphasize passing callbacks too
3. "Each screen should be one component" - Explain component composition benefits

### Knowledge Gap Indicators

Watch for these signs of knowledge gaps in Webex discussions:

1. Confusion between props and state usage
2. Difficulty with component hierarchy planning
3. Prop drilling without consideration of alternatives
4. Inconsistent naming conventions for props

## Follow-Up Activities

After completing the module, post these follow-up prompts:

```
📝 MODULE 2 CONSOLIDATION:

Now that we've completed the Components and Props module:

1. Create a diagram of your pharmacy app's component hierarchy
   (Screenshot and share in thread)

2. Identify one component you would refactor and explain why
   (Focus on component composition and props management)

3. Share one "aha moment" you had about components or props

Your insights will help fellow participants and inform our approach to Module 3!
```

---

By integrating these Webex activities with Module 2, participants will reinforce their understanding of Components and Props through collaborative discussion, peer feedback, and practical application in a pharmacy context. 