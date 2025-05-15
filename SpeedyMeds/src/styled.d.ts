/**
 * Styled Components Theme Declaration File
 *
 * Purpose:
 * This TypeScript declaration file (`.d.ts`) is essential for integrating our custom
 * application theme (`AppTheme`) with the `styled-components` library. It tells
 * TypeScript what the structure of the `theme` prop provided by the `<ThemeProvider>`
 * from `styled-components/native` should look like.
 *
 * How it Works:
 *   - `import "styled-components/native";`: This imports the base types from the library.
 *   - `import type { AppTheme } from "./theme/theme";`: Imports our custom, extended theme type.
 *   - `declare module "styled-components/native" { ... }`: This uses TypeScript's
 *     "declaration merging" and "module augmentation" features. We are essentially reopening
 *     the original `styled-components/native` module declaration.
 *   - `export interface DefaultTheme extends AppTheme {}`: Inside the augmented module,
 *     we declare an interface named `DefaultTheme`. Styled Components looks for this specific
 *     interface name. By extending it with our `AppTheme`, we tell TypeScript that the
 *     `theme` prop available within styled component template literals (e.g., `${props => props.theme...}`)
 *     will have all the properties defined in our `AppTheme` (including both the standard
 *     React Native Paper properties and our custom ones like `customSpacing`).
 *
 * Benefits:
 *   - Type Safety: Provides strong type checking when accessing theme properties.
 *   - Autocompletion: Enables editor autocompletion for theme properties within styled components.
 *
 * Note:
 * Despite this setup, sometimes TypeScript might still struggle with perfect type inference
 * within complex template literal functions. In such cases, explicitly typing the `props` or
 * `theme` object within the function (e.g., `${(props: { theme: AppTheme }) => ...}`)
 * might still be necessary as a workaround (as seen in PrescriptionsScreen.tsx).
 *
 * @module styled.d.ts
 * @see https://styled-components.com/docs/advanced#theming - Styled Components Theming
 * @see https://styled-components.com/docs/api#typescript - Styled Components TypeScript API
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html - TypeScript Declaration Merging
 * @see theme/theme - Where the `AppTheme` type is defined.
 */

// Import base types allowing module augmentation.
import "styled-components/native";
// Import our custom theme type definition.
import type { AppTheme } from "./theme/theme"; // Ensure path is correct

// Augment the 'styled-components/native' module declaration.
declare module "styled-components/native" {
  /**
   * Extend the built-in `DefaultTheme` interface from styled-components.
   * By extending it with `AppTheme`, we inform TypeScript about the shape
   * of the theme object that will be passed down via the ThemeProvider.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
  // The empty interface body `{}` is correct here; we are just merging types.
  // The eslint disable comment is optional but can prevent warnings if your rules enforce non-empty interfaces.
}
