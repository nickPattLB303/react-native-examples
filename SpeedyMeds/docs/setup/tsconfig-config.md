# TypeScript Configuration (`tsconfig.json`) Explained

This document explains the TypeScript configuration settings in `tsconfig.json` for the SpeedyMeds project, focusing on promoting code quality and best practices for the training course.

## Base Configuration

The project's `tsconfig.json` extends `expo/tsconfig.base`. This base configuration provided by Expo includes sensible defaults for React Native development, such as setting the target JavaScript version (`esnext`), module system (`commonjs` or `esnext` depending on context), enabling JSX (`react-native`), and including necessary library definitions (`DOM`, `ESNext`).

```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Key Compiler Options Explained:

1.  **`extends`**: `"expo/tsconfig.base"`
    *   **Purpose**: Inherits recommended TypeScript settings from Expo, ensuring compatibility with the Expo toolchain and React Native.
    *   **Decision**: Essential for Expo projects.

2.  **`compilerOptions.strict`**: `true`
    *   **Purpose**: Enables a wide range of strict type-checking options (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `useUnknownInCatchVariables`, `alwaysStrict`). This is highly recommended for catching potential errors at compile time.
    *   **Decision**: Crucial for leveraging TypeScript's benefits and teaching robust coding practices.

3.  **`compilerOptions.noUnusedLocals`**: `true` (Added)
    *   **Purpose**: Reports errors on unused local variables.
    *   **Decision**: Encourages cleaner code by removing dead code. Helps learners avoid clutter.

4.  **`compilerOptions.noUnusedParameters`**: `true` (Added)
    *   **Purpose**: Reports errors on unused function parameters.
    *   **Decision**: Promotes cleaner function signatures. While sometimes parameters are intentionally unused (e.g., in callbacks), this encourages explicit handling (like prefixing with `_`) if necessary.

5.  **`compilerOptions.noImplicitReturns`**: `true` (Added)
    *   **Purpose**: Ensures all code paths in a function return a value if the function is declared to return something other than `void`.
    *   **Decision**: Prevents runtime errors where a function might unexpectedly return `undefined`.

6.  **`compilerOptions.forceConsistentCasingInFileNames`**: `true` (Added)
    *   **Purpose**: Disallows imports that differ only in casing from the actual file name on disk.
    *   **Decision**: Prevents potential issues, especially when developers work across different operating systems (macOS/Windows) with varying case sensitivity in their file systems. Promotes consistency.

## Conclusion

By extending the Expo base configuration and enabling strict mode along with additional checks (`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `forceConsistentCasingInFileNames`), we establish a robust TypeScript setup. This configuration helps catch errors early, enforces code quality, and aligns with best practices, providing a solid foundation for the training course.

*(Reference: [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig))*