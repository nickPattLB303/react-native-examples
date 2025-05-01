# Understanding TypeScript Config (`tsconfig.json`)

This document explains the settings in the `tsconfig.json` file, which is like the rulebook for how TypeScript checks your code in the SpeedyMeds project.

## Base Configuration (`extends`)

Our `tsconfig.json` starts by inheriting settings from `"expo/tsconfig.base"`. This base configuration from Expo includes essential defaults for React Native projects, ensuring things like JSX and modern JavaScript features work correctly out of the box.

```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    // Our specific rules go here!
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Key Compiler Options Explained:

We've added a few extra rules (`compilerOptions`) on top of the Expo base to help write better, safer code:

1.  **`"strict": true`**
    - **Why:** This is the big one! It turns on all of TypeScript's strictest checks (like preventing accidental `null` or `undefined` errors, requiring types for variables, etc.). It might seem picky at first, but it catches *tons* of potential bugs before you even run your code. Highly recommended for robust development!

2.  **`"noUnusedLocals": true`**
    - **Why:** Flags any variables you declared but never actually used. Helps keep your code tidy and removes clutter.

3.  **`"noUnusedParameters": true`**
    - **Why:** Similar to the above, but for function parameters you never use. Keeps function definitions clean. (If you *need* a parameter for type reasons but don't use it, just prefix it with `_`, like `_unusedParam`, to tell TypeScript it's intentional).

4.  **`"noImplicitReturns": true`**
    - **Why:** Makes sure that if you declare a function should return something (like a `string` or `number`), all possible paths through that function actually *do* return a value. Prevents sneaky `undefined` returns.

5.  **`"forceConsistentCasingInFileNames": true`**
    - **Why:** Ensures your `import` statements match the exact casing of the file names (e.g., `import MyComponent from './MyComponent'` not `'./mycomponent'`). Prevents confusing issues, especially when working across different computers (Mac/Windows/Linux handle casing differently).

## Conclusion

This `tsconfig.json` setup provides a strong foundation for writing type-safe and high-quality code in the SpeedyMeds project. The strict settings help you leverage the full power of TypeScript to catch errors early. Your code editor (like VS Code) uses this file extensively to give you helpful autocompletion and error highlighting as you code!

_(Reference: [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig))_
_(Reference: [Expo TypeScript Guide](https://docs.expo.dev/guides/typescript/))_
