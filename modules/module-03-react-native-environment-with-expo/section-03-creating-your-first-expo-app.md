## Section 3: Creating Your First Expo App (`npx create-expo-app@latest`)

With all the prerequisites installed, you're now ready to create your first React Native application using Expo! We'll use the `create-expo-app` command-line tool, which sets up a new project with a sensible default configuration and template, embodying the principle of "convention over configuration" to get you started quickly.

### The `create-expo-app` Command

`create-expo-app` is the official command-line interface (CLI) tool for creating new Expo projects. Using `npx` (which comes with npm) allows you to run this tool without globally installing it first. `npx create-expo-app@latest` ensures you are always using the most recent version of the project creation tool.

**Command Breakdown:**

- `npx`: A package runner tool included with npm (since v5.2). It executes a package command (`create-expo-app` here) without needing a global install.
- `create-expo-app`: The name of the package/tool that scaffolds a new Expo project.
- `@latest`: This suffix ensures `npx` uses the most recent version of `create-expo-app`. ([Source](https://docs.expo.dev/more/create-expo))
- `YourProjectName`: You'll replace this with the desired name for your application (e.g., `SpeedyMedsApp`, `MyFirstApp`). Project names should typically use kebab-case (`my-project-name`) or PascalCase (`MyProjectName`) for the directory name.

**Alternatives:**

You can also use other package managers: ([Source](https://docs.expo.dev/more/create-expo))

- Yarn: `yarn create expo-app YourProjectName`
- pnpm: `pnpm create expo-app YourProjectName`
- Bun: `bun create expo YourProjectName`

### Creating the Project

Let's create your first application. For this course, we'll be working towards building aspects of a pharmacy application we call "SpeedyMeds". Let's name our initial project `SpeedyMedsPrototype`.

1.  **Open your Terminal.**
2.  **Navigate to your desired projects directory (Optional):** Use `cd` to move to where you keep your development projects (e.g., `cd ~/Developer`).
3.  **Run the create command:**
    ```bash
    npx create-expo-app@latest SpeedyMedsPrototype
    ```
4.  **Project Templates (If Prompted):** `create-expo-app` might prompt you to choose a template. Common options include: ([Source](https://docs.expo.dev/more/create-expo))
    - **`default` (Recommended):** Sets up a multi-screen app with Expo Router and TypeScript. Often the default if no template is specified.
    - `blank`: Minimal template with only core Expo packages.
    - `blank-typescript`: Minimal template with TypeScript enabled.
    - `tabs`: Pre-configured with Expo Router and basic tab navigation (using TypeScript).
    - `bare-minimum`: Similar to `blank`, but runs `npx expo prebuild` to generate native folders immediately.
      **For this course, if prompted, select the `default` template or the `tabs` template.** If not prompted, the default is usually suitable.
5.  **Wait for project creation:** The tool performs several steps: ([Source](https://docs.expo.dev/more/create-expo))

    - Creates a new directory (`SpeedyMedsPrototype`).
    - Copies files from the chosen template.
    - Initializes a Git repository (if Git is available).
    - Installs JavaScript dependencies (`react`, `react-native`, `expo`, etc.) using your detected package manager.
    - Installs native dependencies (CocoaPods for iOS).
    - Sets up configuration files (`app.json`, `package.json`, `tsconfig.json`, etc.).
      You should see output like:

    ```
    ✔ Creating project...
    ✔ Using Expo SDK: ...
    ✔ Downloaded and extracted project files.
    ✔ Installed JavaScript dependencies.
    ✔ Installed CocoaPods.
    ✔ Your project is ready!
    ```

6.  **Navigate into your project directory:**
    ```bash
    cd SpeedyMedsPrototype
    ```

Congratulations! You've successfully created your first Expo project.

### Exercise 3.1: Create and Run Initial App (Instructions)

This exercise solidifies the project creation process and ensures your environment is working correctly by running the newly created app.

**Objective:** Create a new Expo app using the recommended template and run it on the iOS Simulator.

**Instructions:**

1.  **Ensure Prerequisites are Met:** Double-check completion of installations from Section 2 (Node.js, npm/yarn, Watchman, Xcode Command Line Tools).
2.  **Create a New Expo App:**
    - Open your terminal.
    - Navigate to a directory for projects (e.g., `cd ~/Developer`).
    - Run: `npx create-expo-app@latest MyTestApp`.
    - If prompted for a template, choose `default` or `tabs`. If not prompted, proceed.
    - Wait for project creation.
3.  **Navigate into the Project Directory:**
    - `cd MyTestApp`.
4.  **Start the Development Server:**
    - Run: `npx expo start`.
5.  **Run on iOS Simulator:**
    - In the terminal where Metro is running, press `i`.
    - The simulator should open, boot, install the app, and launch it.
    - You should see the default screen of the chosen template (e.g., basic text or tab structure).

**Expected Outcome:**

- A new Expo project folder (`MyTestApp`) exists.
- `npx expo start` runs successfully.
- Pressing `i` launches the app on the iOS Simulator, showing the template's initial screen.

> [!TIP]
> If the simulator doesn't open or the app fails, review troubleshooting tips in Section 9. Ensure Watchman is running and the simulator is functional.

This exercise confirms your basic setup. We'll explore other commands and running on devices/emulators next.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Create your first app](https://docs.expo.dev/get-started/create-your-first-app/)
> - [Expo Docs: `create-expo-app`](https://docs.expo.dev/more/create-expo/)
> - [Expo Docs: Templates](https://docs.expo.dev/get-started/templates/)
