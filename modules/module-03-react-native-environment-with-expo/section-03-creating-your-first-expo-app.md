## Section 3: Creating Your First Expo App (`npx create-expo-app@latest`)

With all the prerequisites installed, you're now ready to create your first React Native application using Expo! We'll use the `create-expo-app` command-line tool, which sets up a new project with a sensible default configuration and template, embodying the principle of "convention over configuration" to get you started quickly.

### The `create-expo-app` Command

`create-expo-app` is the official command-line interface (CLI) tool for creating new Expo projects. Using `npx` (which comes with npm) allows you to run this tool without globally installing it first. `npx create-expo-app@latest` ensures you are always using the most recent version of the project creation tool.

**Command Breakdown:**

- `npx`: A package runner tool included with npm (since v5.2). It executes a package command (`create-expo-app` here) without needing a global install.
- `create-expo-app`: The name of the package/tool that scaffolds a new Expo project.
- `@latest`: This suffix ensures `npx` uses the most recent version of `create-expo-app`. ([Source](https://docs.expo.dev/more/create-expo))
- `YourProjectName`: You'll replace this with the desired name for your application (e.g., `SpeedyMedsApp`, `MyFirstApp`). Project names should typically use kebab-case (`my-project-name`) or PascalCase (`MyProjectName`) for the directory name.

> [!TIP]
> Project names should follow a consistent naming convention. For React Native apps, it's recommended to use either kebab-case (e.g., `speedy-meds-app`) or PascalCase (e.g., `SpeedyMedsApp`). Avoid using spaces or special characters as this may cause issues with project files or commands.

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
      Other templates can be specified using the `--template` flag (e.g., `npx create-expo-app@latest MyProject --template blank`). Additionally, the `--example` flag can be used to clone projects directly from the `expo/examples` GitHub repository (e.g., `npx create-expo-app@latest MyProject --example with-custom-font`).
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

### TypeScript in Expo Projects

Modern Expo templates come with TypeScript support out of the box. TypeScript adds static type checking to JavaScript, catching type-related errors early in development and providing better editor support through autocompletion and documentation.

The default template creates several TypeScript configuration files:

- `tsconfig.json`: The main TypeScript configuration
- `types.tsx` or similar file: Contains shared type definitions for your project

You'll see `.tsx` file extensions for React components (instead of `.jsx`) and `.ts` for non-component files (instead of `.js`).

```typescript
// Example type definitions for a Medication in SpeedyMeds
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

// Example of a component with typed props
interface MedicationItemProps {
  medication: Medication;
  onPress: (id: string) => void;
}

export function MedicationItem({ medication, onPress }: MedicationItemProps) {
  // Component implementation
}
```

> 🛣️ **(All Learners):** Using TypeScript from the beginning of your project provides significant advantages in code quality and developer experience. Even if you're new to TypeScript, the basic types are straightforward to learn, and the benefits of catching errors early are substantial.

### Exercise 3.1: Create and Run Initial App

This exercise guides you through creating your first Expo project, specifically tailored to the SpeedyMeds theme we'll be using throughout the course.

**(https://snack.expo.dev/@example/speedymeds-starter-exercise3-1)**

In this exercise, you'll:

1. Create a new Expo project using the `create-expo-app` command
2. Explore the generated project files
3. Make a simple modification to the home screen
4. Run the app on the iOS Simulator

The Snack provides a virtual environment to verify your understanding of the concepts, but you should also complete these steps on your local machine to ensure your development environment is properly configured.

#### Prerequisites for this Exercise

- Node.js and npm installed (Section 2)
- Xcode Command Line Tools installed (Section 2)
- Watchman installed (Section 2)

> [!NOTE]
> This exercise confirms your basic setup. We'll explore other commands and running on devices/emulators in the upcoming sections.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Create your first app](https://docs.expo.dev/get-started/create-a-new-app/)
> - [Expo Docs: `create-expo-app`](https://docs.expo.dev/more/create-expo/)
> - [Expo Docs: Templates](https://docs.expo.dev/get-started/templates/)
> - [TypeScript Documentation](https://www.typescriptlang.org/docs/)
> - [React Native TypeScript](https://reactnative.dev/docs/typescript)
