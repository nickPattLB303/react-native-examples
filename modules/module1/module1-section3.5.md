# Module 3: Essential Web, JavaScript, and TypeScript Foundations

## 3.5 Applying TypeScript to React Native Components (Props, State, React.FC)

Interfaces and Types: TypeScript provides two primary ways to name custom object shapes: interface and type. Both can be used to define the structure of data, such as the props passed to a React component or the shape of the component's state.100

-   interface:
    TypeScript
    interface User {
      id: number;
      name: string;
      isAdmin?: boolean; // Optional property
    }

-   type (Type Alias):
    TypeScript
    type Point = {
      x: number;
      y: number;
    };
    // Types can also represent unions, primitives, etc.
    type ID = string | number;
    type Status = 'pending' | 'completed' | 'failed';

-   Differences & Recommendation: Interfaces support declaration merging (multiple declarations with the same name are merged) and can be extended using extends. Type aliases are generally more flexible, supporting unions (|), intersections (&), mapped types, and conditional types directly.100 While either can often be used for object shapes, a common recommendation is to default to using type unless the specific features of interfaces (like declaration merging or explicit extends for class hierarchies) are required, as type can be slightly less surprising in some edge cases.104

Typing Functions: Functions can be typed by specifying the types of their parameters and the type of their return value.105

TypeScript

function greet(name: string, age?: number): string { // age is optional
  if (age) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

Typing React Components: TypeScript integrates smoothly with React, allowing strong typing for components, props, and state.

-   Component Props: Define an interface or type for the component's props. Use React.FC<PropsType> (Functional Component) to type the component function itself. React.FC provides type checking for props and includes default properties like children (though explicit typing of children is often preferred).
    TypeScript
    import React, { useState } from 'react';
    import { View, Text, Button } from 'react-native';

    type GreetingProps = {
      name: string;
      initialEnthusiasm?: number; // Optional prop
    };

    const Greeting: React.FC<GreetingProps> = ({ name, initialEnthusiasm = 1 }) => {
      // Props are destructured and typed
      //... component logic...
      return <Text>Hello, {name}!</Text>;
    };

-   Component State (useState): The useState hook can be typed using generics (useState<StateType>) to specify the type of the state variable.106 TypeScript can often infer the type if an initial value is provided, but explicit typing is clearer, especially for complex types or when the initial value is null or undefined).
    TypeScript
      const [enthusiasmLevel, setEnthusiasmLevel] = useState<number>(initialEnthusiasm);
      const [user, setUser] = useState<User | null>(null); // State can be User object or null

-   Complete Example:
    TypeScript
    import React, { useState } from 'react';
    import { View, Text, Button, StyleSheet } from 'react-native';

    type CounterProps = {
      initialCount?: number;
    };

    const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
      const [count, setCount] = useState<number>(initialCount);

      const increment = () => setCount(prevCount => prevCount + 1);
      const decrement = () => setCount(prevCount => (prevCount > 0? prevCount - 1 : 0));

      return (
        <View style={styles.container}>
          <Text style={styles.countText}>Count: {count}</Text>
          <View style={styles.buttonRow}>
            <Button title="Decrement" onPress={decrement} color="red" />
            <Button title="Increment" onPress={increment} color="blue" />
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: { alignItems: 'center', marginVertical: 10 },
      countText: { fontSize: 18, marginBottom: 10 },
      buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: 200 },
    });

    export default Counter;
    (106)

Type Assertions (as): Sometimes, a developer might have more specific knowledge about a variable's type than TypeScript can infer (e.g., after fetching data from an untyped API or interacting with certain DOM elements). In these cases, a type assertion using the as keyword can be used to tell the compiler to treat the value as a specific type: const data = response.data as UserData;.101 Type assertions should be used sparingly and cautiously, as they essentially override the compiler's type checking and can hide potential errors if the assertion is incorrect.101 Using unknown and type guards is often a safer approach than asserting directly from any.

Mandate Enforcement: To ensure the development of robust, maintainable, and less error-prone applications, the use of TypeScript is mandatory for all subsequent code examples, exercises, challenges, and project work within this learning path. This reinforces the practical benefits of static typing in a production context.

Applying TypeScript to React Native components provides significant advantages by enforcing contracts at the component boundaries (props) and for internal data management (state). This prevents a common class of errors where incorrect data types are passed between components or used within state logic. Using React.FC<Props> and useState<StateType> allows the TypeScript compiler to verify the integrity of data flow within the component architecture, leading to more reliable and easier-to-debug applications.

#### Works cited

100. TypeScript Interface vs Type: Differences and Best Use Cases - Pieces for developers, accessed April 24, 2025, <https://pieces.app/blog/typescript-interface-vs-type-differences-and-best-use-cases>
101. Explain Type assertions in TypeScript | GeeksforGeeks, accessed April 24, 2025, <https://www.geeksforgeeks.org/explain-type-assertions-in-typescript/>
104. Type vs Interface: Which Should You Use? - Total TypeScript, accessed April 24, 2025, <https://www.totaltypescript.com/type-vs-interface-which-should-you-use>
105. Handbook - Functions - TypeScript, accessed April 24, 2025, <https://www.typescriptlang.org/docs/handbook/functions.html>
106. Using TypeScript - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/typescript>