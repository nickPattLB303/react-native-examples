## Section 4: Understanding `npx expo` vs. `npm`/`yarn`

Now that you've created your project and seen commands like `npx create-expo-app` and `npx expo start`, let's clarify the difference between running commands directly with `npx expo` versus using your package manager (`npm run` or `yarn`). Understanding this helps you know which command to use in different situations.

### Package Managers: `npm` and `yarn`

As you know from Section 2, `npm` (Node Package Manager) and `yarn` are tools for managing your project's JavaScript dependencies (the libraries and tools your project needs, listed in `package.json`).

One key feature they provide is running **scripts** defined in your `package.json` file. Open your `package.json` in the `SpeedyMedsPrototype` project, and you'll see a section similar to this:

```json
{
  // ... other fields
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
  // ... dependencies
}
```

This `scripts` object defines shortcuts. For example:

- `npm run start` or `yarn start` will execute the command `expo start`.
- `npm run ios` or `yarn ios` will execute the command `expo start --ios`.

Using these scripts is common practice in Node.js projects for standard tasks like starting development servers, running tests, or building the project.

> 🌐 **(Web Developers):** This `scripts` section in `package.json` should feel very familiar. It works exactly like it does in web development projects (React, Angular, Vue, etc.) for defining and running project tasks.

### The Expo CLI: `expo` and `npx expo`

The `expo` package provides the **Expo Command Line Interface (CLI)**, a dedicated tool for interacting with Expo projects and services. It offers a wide range of commands specifically tailored for the Expo ecosystem, such as:

- `expo start`: Starts the Metro development server.
- `expo install`: Installs a library and ensures compatibility with your project's Expo SDK version.
- `expo run:ios`: Builds the native iOS project and runs it on a simulator or device (requires native build).
- `expo prebuild`: Generates the native `ios` and `android` directories.
- `expo login`: Logs into your Expo account.
- `expo publish` (Classic): Publishes an update for the classic build system.
- Commands for interacting with EAS (Expo Application Services), like `eas build`, `eas submit`, `eas update` (covered later).

**Why `npx expo ...`?**

We use `npx expo <command>` (e.g., `npx expo start`) to run these commands.

- `npx` allows us to run the `expo` CLI tool _without_ having to install it globally on our system using `npm install --global expo-cli`. This is the currently recommended approach by the Expo team.
- It ensures we are using the version of `expo` CLI that is compatible with our project, often the one listed in the project's local `node_modules`.
- It avoids potential conflicts if different projects on your system required different global versions of the CLI.

### When to Use Which?

1.  **For Expo-specific tasks:** Use `npx expo <command>`. This is the most direct and recommended way to use the Expo CLI for tasks like starting the server (`npx expo start`), installing compatible packages (`npx expo install`), logging in (`npx expo login`), generating native directories (`npx expo prebuild`), etc.

2.  **For running predefined scripts:** Use `npm run <script>` or `yarn <script>`. This is useful for the common scripts predefined in `package.json` (`start`, `ios`, `android`, `web`) or any custom scripts you might add later. It's slightly shorter to type `yarn ios` than `npx expo start --ios`.

**In summary:**

- `npm`/`yarn` are primarily for managing dependencies and running scripts defined in `package.json`.
- `npx expo` is for directly executing commands provided by the Expo CLI tool, ensuring you use the correct version without global installation.

You'll see both forms used in documentation and tutorials. For this course, we will generally prefer using `npx expo <command>` for clarity and to emphasize that we are using the Expo CLI directly, but running the predefined scripts (`yarn start`, `yarn ios`, etc.) is also perfectly valid.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Expo CLI](https://docs.expo.dev/more/expo-cli/)
> - [npm Docs: npx](https://docs.npmjs.com/cli/v10/commands/npx)
> - [Node.js Guides: Working with package.json](https://nodejs.dev/en/learn/working-with-package-json/)
