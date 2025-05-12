## Section 3: Creating Your First Expo App (`npx create-expo-app@latest`)

With all the prerequisites installed, you're now ready to create your first React Native application using Expo! We'll use the `create-expo-app` command-line tool, which sets up a new project with a sensible default configuration and template.

### The `create-expo-app` Command

`create-expo-app` is the official command-line interface (CLI) tool for creating new Expo projects. Using `npx` (which comes with npm) allows you to run this tool without globally installing it first. `npx create-expo-app@latest` ensures you are always using the most recent version of the project creation tool.

**Command Breakdown:**

- `npx`: A package runner tool that comes with npm. It executes a package from the npm registry either by downloading it temporarily or using a locally cached version.
- `create-expo-app`: The name of the package/tool that scaffolds a new Expo project.
- `@latest`: This optional tag tells `npx` to use the newest version of `create-expo-app` available.
- `YourProjectName`: You'll replace this with the desired name for your application (e.g., `SpeedyMedsApp`, `MyFirstApp`). Project names should typically be in kebab-case (e.g., `my-project-name`) or PascalCase (e.g., `MyProjectName`) for the directory, though `create-expo-app` will often normalize this.

### Creating the Project

Let's create your first application. For this course, we'll be working towards building aspects of a pharmacy application we call "SpeedyMeds". Let's name our initial project `SpeedyMedsPrototype`.

1.  **Open your Terminal.**
2.  **Navigate to your desired projects directory (Optional):** You can create the project anywhere, but it's good practice to have a dedicated folder for your development projects (e.g., `~/Developer` or `~/Projects`).
    ```bash
    cd ~/Developer # Or your preferred directory
    ```
3.  **Run the create command:** Type the following command and press Enter. Replace `SpeedyMedsPrototype` if you prefer a different name, but we'll use this one for consistency in the course.
    ```bash
    npx create-expo-app@latest SpeedyMedsPrototype
    ```
4.  **Wait for project creation:** The tool will download the necessary template, install dependencies (like React, React Native, and Expo SDK packages), and set up your project directory. This might take a few minutes depending on your internet connection.
    You should see output like:

    ```
    ✔ Creating project...
    ✔ Using unversioned Expo SDK
    ✔ Downloaded and extracted project files.
    ✔ Installed JavaScript dependencies.
    ✔ Installed CocoaPods.
    ✔ Your project is ready!
    ```

    > [!NOTE]
    > If prompted to choose a template (e.g., Blank, Blank (TypeScript), Tabs), select the **Blank (TypeScript)** template for this course. `create-expo-app` often defaults to a TypeScript template now, which is what we want.

5.  **Navigate into your project directory:** Once it's done, change into your newly created project folder:
    ```bash
    cd SpeedyMedsPrototype
    ```

Congratulations! You've successfully created your first Expo project.

### Exercise 3.1: Create and Run Initial App (Instructions)

This exercise solidifies the project creation process and ensures your environment is working correctly by running the newly created app.

**Objective:** Create a new Expo app and run it on the iOS Simulator.

**Instructions:**

1.  **Ensure Prerequisites are Met:** Double-check that you have completed all installations from Section 2 (Node.js, npm/yarn, Watchman, Xcode Command Line Tools).
2.  **Create a New Expo App:**
    - Open your terminal.
    - Navigate to a directory where you want to store your projects (e.g., `cd ~/Developer`).
    - Run the command: `npx create-expo-app@latest MyTestApp` (you can name it `MyTestApp` or similar for this exercise).
    - When prompted, choose the **Blank (TypeScript)** template if options are presented.
    - Wait for the project creation to complete.
3.  **Navigate into the Project Directory:**
    - Once created, run `cd MyTestApp` (or your chosen app name).
4.  **Start the Development Server:**
    - Inside your project directory, run the command: `npx expo start`
    - This will start the Metro Bundler (React Native's JavaScript bundler) and provide you with options to run your app.
5.  **Run on iOS Simulator:**
    - In the terminal where Metro Bundler is running, press the `i` key.
    - This will attempt to launch your app on an available iOS Simulator. If you have multiple simulators, it might pick a default one. The simulator should open, boot up (if not already running), and then install and launch your app.
    - You should see the default screen of a new Expo app (usually some welcome text).

**Expected Outcome:**

- A new Expo project folder (`MyTestApp`) is created on your system.
- The `npx expo start` command successfully starts the Metro Bundler.
- Pressing `i` launches the app on the iOS Simulator, displaying the initial screen.

> [!TIP]
> If the simulator doesn't open or the app doesn't launch, review the troubleshooting tips in Section 9 of this module. Common issues include Watchman not being installed or running correctly, or problems with the simulator itself.

This exercise confirms that your basic setup is functional and you can create and run Expo projects. We'll explore running on physical devices and other CLI commands in subsequent sections.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Create your first app](https://docs.expo.dev/get-started/create-your-first-app/)
> - [Expo Docs: `create-expo-app`](https://docs.expo.dev/more/expo-cli/#create-expo-app)
