/**
 * TypeScript Declaration File for lodash.merge
 *
 * This file provides type definitions for the 'lodash.merge' package.
 * It ensures that TypeScript understands the shape and usage of the `merge`
 * function when imported specifically from 'lodash.merge', which is sometimes
 * necessary if the main 'lodash' package's types or module resolution cause issues.
 *
 * Used in `src/theme/theme.ts` for deep merging theme objects.
 */
declare module "lodash.merge" {
  // Import the specific 'merge' type definition from the main 'lodash' types.
  import { merge } from "lodash";
  // Export the imported 'merge' type as the default export for the 'lodash.merge' module.
  export = merge;
}
