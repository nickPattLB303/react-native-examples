/**
 * Prettier Configuration for SpeedyMeds App
 *
 * This file configures Prettier, an opinionated code formatter. Prettier enforces
 * a consistent code style across the entire project by parsing code and re-printing it
 * according to its defined rules. This eliminates debates about code style and ensures
 * readability.
 *
 * This configuration object defines overrides for Prettier's default options.
 *
 * @see https://prettier.io/docs/en/configuration.html - Prettier Configuration Docs
 * @see https://prettier.io/docs/en/options.html - Prettier Options Documentation
 */
module.exports = {
  /**
   * Add semicolons at the end of every statement.
   * Default: true
   * @see https://prettier.io/docs/en/options.html#semicolons
   */
  semi: true,

  /**
   * Use single quotes ('') instead of double quotes ("") for strings where possible.
   * Default: false (uses double quotes)
   * @see https://prettier.io/docs/en/options.html#quotes
   */
  singleQuote: true,

  /**
   * Use double quotes ("") for JSX attributes instead of single quotes ('').
   * This is often preferred for consistency with HTML attributes.
   * Default: false (uses double quotes)
   * @see https://prettier.io/docs/en/options.html#jsx-quotes
   */
  jsxSingleQuote: false,

  /**
   * Add trailing commas wherever valid in ES5 (objects, arrays, function parameters).
   * This improves developer experience, especially for version control diffs (adding/removing
   * items only changes one line).
   * Options: "none", "es5", "all"
   * Default: "es5" (recommended)
   * @see https://prettier.io/docs/en/options.html#trailing-commas
   */
  trailingComma: "es5",

  /**
   * Specify the number of spaces per indentation level.
   * Default: 2
   * @see https://prettier.io/docs/en/options.html#tab-width
   */
  tabWidth: 2,

  /**
   * Specify the line length that Prettier will wrap on.
   * Lines will be broken automatically if they exceed this length.
   * Default: 80
   * @see https://prettier.io/docs/en/options.html#print-width
   */
  printWidth: 80,

  /**
   * Include parentheses around a sole arrow function parameter.
   * Options: "always", "avoid"
   * Default: "always" (e.g., `(x) => x`)
   * "avoid" would format as `x => x`. "always" is often preferred for consistency.
   * @see https://prettier.io/docs/en/options.html#arrow-function-parentheses
   */
  arrowParens: "always",

  // --- Other Common Options (Defaults shown, uncomment to change) ---
  // bracketSpacing: true, // Print spaces between brackets in object literals: { foo: bar }
  // jsxBracketSameLine: false, // Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line
  // requirePragma: false, // Require a special comment (`@prettier` or `@format`) at the top of files to format them
  // useTabs: false, // Indent lines with tabs instead of spaces
};
