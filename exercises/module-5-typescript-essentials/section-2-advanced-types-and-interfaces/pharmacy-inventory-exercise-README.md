# Advanced TypeScript Exercise: Pharmacy Inventory System

This exercise is designed to help you practice advanced TypeScript features in a real-world scenario. You'll implement a pharmacy inventory system that demonstrates concepts like generic types, advanced interfaces, union types, type guards, and utility types.

## Exercise Setup

This exercise is designed to work in CodePen. You'll need to:

1. Create a new CodePen project
2. Add the HTML and TypeScript files as described below
3. Make sure to set the preprocessor to TypeScript in CodePen settings

## Starter Code

The starter code provides a basic structure with TODOs that you need to implement. It includes:

- **pharmacy-inventory-starter.html**: The HTML interface for interacting with the inventory system
- **pharmacy-inventory-starter.ts**: The TypeScript starter code with TODOs for you to complete

### Using the Starter Code

1. Create a new CodePen project
2. Copy the contents of `pharmacy-inventory-starter.html` into the HTML panel
3. Copy the contents of `pharmacy-inventory-starter.ts` into the JS/TS panel
4. Set the JavaScript Preprocessor to TypeScript in the CodePen settings
5. Follow the TODOs in the TypeScript file to implement the required functionality

## Completed Example

A completed implementation is provided for reference:

- **pharmacy-inventory-complete.html**: The HTML interface for the completed solution
- **pharmacy-inventory-complete.ts**: The complete TypeScript implementation

### Key Features Demonstrated

1. **Generic Interfaces**: Using `InventoryItem<T>` to work with different product types
2. **Advanced Interface Features**: Including optional and readonly properties
3. **Union Types**: Creating discriminated unions for inventory actions
4. **Type Guards**: Safely handling different data types
5. **Utility Types**: Using Pick, Readonly, and Partial to create specialized views

## Exercise Requirements

Your task is to implement the following:

1. A generic `InventoryItem<T>` interface that can work with different product types
2. Interfaces for medication and medical supply products
3. A type union for different inventory actions (restock, dispense, adjust)
4. Type guards to handle different inventory actions correctly
5. Utility types to create specialized views of your inventory data

## Testing Your Implementation

The HTML interface provides controls to:
- Select an action type (restock, dispense, adjust)
- Enter an item ID and quantity
- Process the action and see the results displayed in the UI

Successful implementation will show:
- Properly formatted inventory items
- Correct handling of different action types
- Type-safe operations that update the inventory and display

## Learning Outcomes

After completing this exercise, you should be able to:
- Implement advanced TypeScript interfaces with optional and readonly properties
- Create and use union types for complex type relationships
- Apply type guards to ensure type safety
- Implement generic types for reusable, type-safe components
- Use utility types to transform existing types in practical ways

## Tips for Success

- Read through the entire starter code before you begin
- Implement one TODO at a time and test your changes
- Refer to the TypeScript documentation if you get stuck
- Use the completed example only as a last resort

Happy coding! 