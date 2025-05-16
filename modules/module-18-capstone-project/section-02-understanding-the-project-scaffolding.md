## Section 02: Understanding the Project Scaffolding

To effectively contribute to the SpeedyMeds project, it's essential to understand its structure—how files and folders are organized. This section breaks down the scaffolding, helping you locate relevant code, configurations, and assets as you develop features.

### Top-Level Project Structure

The SpeedyMeds project root contains several key directories and configuration files. Here's an overview based on the information in the project `README.md`:

```plaintext
SpeedyMeds/
├── .github/              # GitHub specific files (PR/Issue templates, workflows)
├── .vscode/              # VS Code specific settings (recommended extensions, format on save)
├── __tests__/            # Config/setup for tests (top-level tests if any)
├── assets/               # Static assets (images, fonts, mockups)
├── docs/                 # Project documentation (guides, architecture decisions)
├── src/                  # Application source code (MOST OF YOUR WORK HAPPENS HERE)
├── .env                  # Pre-configured environment variables for development
├── .env.example          # Example environment variables
├── .eslintrc.js          # ESLint configuration (code quality rules)
├── .gitignore            # Files/folders ignored by Git
├── .prettierignore       # Files/folders ignored by Prettier
├── App.tsx               # Root React component, sets up global providers
├── app.json              # Expo configuration file (app metadata, build settings)
├── index.ts              # App entry point (managed by Expo)
├── jest.config.js        # Jest configuration (test runner settings)
├── jest.setup.js         # Jest setup file (global mocks, RNTL setup)
├── package.json          # Project dependencies and scripts (npm)
├── prettierrc.js         # Prettier configuration (code formatting rules)
├── tsconfig.json         # TypeScript configuration
├── CHANGELOG.md          # Record of significant project changes
├── CONTRIBUTING.md       # Guidelines for contributing to the project
├── README.md             # Project overview and entry point
├── ROADMAP.md            # Describes starting state and implementation goals
├── SETUP.md              # Detailed environment setup guide
└── USAGE.md              # Application usage guide (interacting with starter app)
```

**Key items to note:**

- **`.github/`**: Contains templates for pull requests and issues, and potentially CI/CD workflow configurations. Useful for understanding contribution processes in a team setting.
- **`.vscode/`**: Holds VS Code editor-specific settings, like recommended extensions and format-on-save configurations, to help maintain a consistent development environment.
- **`assets/`**: Stores all static assets. The `README.md` mockups are also referenced here (`assets/images/`). You'll place any new images or custom fonts in this directory.
- **`docs/`**: Contains supplementary project documentation. The `SETUP.md` you used is here.
- **`src/`**: This is the heart of the application, containing all the TypeScript/React Native code you'll be writing or modifying. We'll explore this in more detail below.
- **Configuration Files (Root Level):** Files like `.eslintrc.js`, `prettierrc.js`, `jest.config.js`, `tsconfig.json`, and `package.json` define the project's linting, formatting, testing, TypeScript compilation, and dependency management rules. While you might not need to modify these extensively, understanding their purpose is helpful.
- **`App.tsx`**: The main entry point for the React application logic, responsible for setting up global providers like navigation, theme, and React Query.
- **`app.json`**: Expo's primary configuration file. It defines metadata like the app name, slug, version, icon, splash screen, and platform-specific settings (iOS/Android).
- **`index.ts`**: The actual native entry point of the application, usually managed by Expo. You typically don't need to touch this file.
- **Markdown Docs:** `README.md`, `ROADMAP.md`, `SETUP.md`, `USAGE.md`, `CONTRIBUTING.md`, and `CHANGELOG.md` provide critical information about the project.

### The `src` Directory: Application Source Code

The `src` directory is where you'll spend most of your time. It's organized to separate concerns and make the codebase manageable:

- **`api/`**: Contains the simulated API logic. `mockData.ts` likely uses Faker.js to generate data, and `index.ts` might export functions that mimic API calls (e.g., `fetchUserProfile`, `fetchOrders`). It also includes query keys for TanStack Query.
- **`components/`**: Intended for reusable UI components that can be shared across multiple screens (e.g., `LoadingIndicator`, `ErrorDisplay`, `ScreenContainer`, `ThemeSelector`). Any new generic components you create (like `PrescriptionCard` or `OrderListItem` from the roadmap) should go here. Each component may have its own `__tests__` subfolder.
- **`context/`**: Holds React Context providers. The `ThemeContext` for managing light/dark mode is located here.
- **`hooks/`**: For custom React Hooks that encapsulate reusable logic (e.g., `useInitializeAppData` which likely fetches initial data on app load).
- **`navigation/`**: Contains all React Navigation setup, including stack navigators, tab navigators, and type definitions for routes and parameters (e.g., `AppNavigator.tsx`, `MainTabNavigator.tsx`).
- **`screens/`**: Contains the main screen components. These are the top-level components for each view in your application (e.g., `HomeScreen.tsx`, `OrdersScreen.tsx`). Initially, these are placeholders.
- **`stores/`**: For global client-side state management. The SpeedyMeds project uses Zustand, and this directory would house store definitions (e.g., `appDataStore.ts`).
- **`test-utils/`**: Contains testing utilities, most notably the custom `renderWithProviders` function, which wraps components in necessary providers (like Theme, Navigation, QueryClient) during tests to ensure they render correctly.
- **`theme/`**: Defines the application's visual theme, including color palettes for light and dark modes, typography, spacing, and shape definitions. It likely assembles themes for React Native Paper and Styled Components.
- **`types/`**: Contains shared TypeScript interfaces and type definitions used across the application, promoting consistency and type safety.

> [!TIP]
> When starting on a new feature, try to identify which of these `src` subdirectories will be affected. For example, building a new UI element for a screen might involve creating a new component in `src/components/`, adding logic to a screen in `src/screens/`, and perhaps defining new types in `src/types/`.

### Key Configuration Files Deep Dive

- **`App.tsx`**: As the root React component, `App.tsx` is crucial. It initializes global providers like `QueryClientProvider` (for TanStack Query), `CustomThemeProvider` (for your app-wide theme), `PaperProvider` (for React Native Paper components), and `StyledThemeProvider` (for Styled Components). It also likely sets up listeners for app state (active/background) and network connectivity to inform React Query.
- **`app.json`**: This Expo configuration file controls many aspects of your app when it's built and run through Expo. Key fields include `name`, `slug`, `version`, `icon`, `splash`, `userInterfaceStyle` (for theme preference), and `newArchEnabled`.
- **`package.json`**: Defines project scripts (like `npm start`, `npm test`), lists all dependencies (`dependencies`) and development dependencies (`devDependencies`). This is where you see the exact versions of libraries like `expo`, `react-native`, `react-navigation`, etc.
- **`tsconfig.json`**: Configures the TypeScript compiler (TSC). It specifies options like the target JavaScript version, module system, JSX mode, strictness, and path aliases (if any).
- **`jest.config.js` & `jest.setup.js`**: Configure the Jest testing framework. `jest.config.js` sets the preset (e.g., `jest-expo`), files to ignore during transformation, and points to `jest.setup.js`. The setup file typically includes global mocks or configurations for React Native Testing Library.

> 🤖 **(Native Android/iOS Developers accustomed to platform-specific project structures):**
>
> **Comparison:** The React Native (especially with Expo) project structure abstracts away many of the native platform files (like Gradle scripts in Android or `Podfile`/`.xcworkspace` in iOS) into JSON or JavaScript configurations. The `ios/` and `android/` directories are often minimal or managed by Expo tools unless you're doing advanced native module development.
>
> **Key Takeaway:** Focus on the JavaScript/TypeScript side of things within the `src/` directory and the various JS/JSON configuration files at the root. Expo handles much of the native project complexity. If you were to "eject" from Expo or work with a bare React Native project, you'd see more of the traditional native project files.
>
> **Source:** Explore the ["Bare Workflow" vs "Managed Workflow"](https://docs.expo.dev/workflow/managed-and-bare/) documentation on the Expo site to understand these differences more deeply.

Understanding this scaffolding is the first step to confidently navigating and contributing to the SpeedyMeds project. In the next sections, we'll look at how data flows through this structure and how specific features like navigation and theming are implemented.
