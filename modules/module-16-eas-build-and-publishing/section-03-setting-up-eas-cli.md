## Section 3: Setting up EAS CLI

This section guides you through the process of setting up the Expo Application Services (EAS) Command Line Interface (CLI). The EAS CLI is the indispensable tool for interacting with all EAS offerings. It serves as the bridge between your local development environment and Expo's cloud services, enabling you to initiate builds, submit applications to app stores, publish Over-the-Air (OTA) updates, manage your Expo account, and configure various EAS services. Proper installation and authentication are the first steps to leveraging the power of EAS.

### Distinguishing EAS CLI from `expo` CLI

It's important to distinguish EAS CLI (`eas-cli`) from the traditional Expo CLI (`expo-cli`, which is now typically invoked via `npx expo`).

- **`expo` CLI (`npx expo`):** Primarily focused on local development tasks. These include starting the Metro development server, running applications on simulators or physical devices (often with Expo Go or a development client), managing local project configurations (like `app.json`), and prebuilding native project directories (`npx expo prebuild`).
- **EAS CLI (`eas-cli`):** Specifically designed for interacting with EAS cloud services. It is installed as a separate global package and handles tasks like cloud builds, app store submissions, OTA updates, and secret management.

This separation allows for independent versioning and development cycles, reflecting their distinct operational domains.

### Prerequisites for EAS CLI

Before you install and use the EAS CLI, ensure you have the following prerequisites met:

- **Node.js:** EAS CLI is a Node.js package. You need Node.js (LTS version recommended) installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- **npm or Yarn:** A Node.js package manager, either npm (which comes with Node.js) or Yarn. You'll use one of these to install EAS CLI.
- **Expo Account:** You need an Expo account to use EAS services. If you don't have one, you can sign up for free at [expo.dev](https://expo.dev/signup).
- **Git:** EAS Build relies on Git for version control and for uploading your project's source code to the build servers. Your project should be a Git repository, and Git must be installed on your system.
- **A React Native Project:** While you can install EAS CLI without a project, its primary use is within a React Native project managed with Expo.

### Installing EAS CLI

The EAS CLI is distributed as an npm package. You can install it globally on your system using either npm or Yarn. Installing it globally makes the `eas` command available in any project directory.

1.  **Open your terminal or command prompt.**
2.  **Choose your package manager and run the installation command:**

    - **Using npm:**
      ```bash
      npm install -g eas-cli
      ```
    - **Using Yarn:**
      ```bash
      yarn global add eas-cli
      ```

    > [!NOTE]
    > Depending on your system configuration, you might need to use `sudo` for npm global installs (e.g., `sudo npm install -g eas-cli`). However, it's generally recommended to configure npm to operate without `sudo` if possible. For Yarn, `sudo` is typically not required for global adds if Yarn itself was installed correctly.

3.  **Verify the installation:** After the installation completes, you can verify that EAS CLI is installed correctly by checking its version:
    ```bash
    eas --version
    ```
    This command should output the installed version of EAS CLI (e.g., `eas-cli/X.Y.Z`).

### Logging into Your Expo Account

Once EAS CLI is installed, you need to log in to your Expo account to link the CLI with EAS services. This authentication step allows the CLI to perform actions on your behalf within the EAS ecosystem.

1.  **In your terminal, run the login command:**
    ```bash
    eas login
    ```
2.  **Follow the prompts:** EAS CLI will prompt you for your Expo account username (or email) and password.

    ```bash
    # Example output after running 'eas login'
    # We need to log in to your Expo account.
    # ? Log in with an existing Expo account or create a new one? › Log in with an existing Expo account
    # ✔ Email / Username: your_expo_username
    # ✔ Password: [hidden]
    # Authenticating...
    # Successfully logged in as your_expo_username!
    ```

    Upon successful authentication, a token is typically stored on your local machine, allowing subsequent `eas` commands to be authorized without requiring credentials each time.

3.  **Verify Login Status (Optional but Recommended):** To verify which Expo account is currently authenticated, run:

    ```bash
    eas whoami
    ```

    This command will display the username of the logged-in account.

4.  **Logging Out (If Necessary):** You generally only need to log in once per machine. If you need to switch accounts or log out for security reasons, you can use:
    ```bash
    eas logout
    ```

### Initializing Your Project with EAS

Before you can use EAS services like EAS Build for a specific local project, that project needs to be linked to an EAS project on expo.dev. This is typically done using the `eas init` command (or `eas project:init`).

Run this command within your project's root directory:

```bash
eas init
```

EAS CLI may prompt you to either create a new project on EAS or link to an existing one associated with your account. This process usually involves updating your project's `app.json` (or `app.config.js`) and potentially `eas.json` with a unique project ID provided by EAS.

### Updating EAS CLI

EAS services and the EAS CLI itself are actively developed and updated. To ensure you have access to the latest features, improvements, and bug fixes, it's good practice to update your EAS CLI periodically. You can do this by running the same installation command again:

- **Using npm:**
  ```bash
  npm install -g eas-cli
  ```
- **Using Yarn:**
  ```bash
  yarn global add eas-cli
  ```

Regularly updating ensures compatibility and access to the newest functionalities.

### How EAS CLI Connects to Your Project

After installing EAS CLI and logging in, you typically use it within the root directory of your React Native project. EAS CLI automatically detects your project configuration (from `app.json` or `app.config.js`) and interacts with EAS services in the context of that specific app.

For example, when you run `eas build`, the CLI will:

1.  Read your project's identifier (e.g., `@username/project-slug` from `app.json`).
2.  Communicate with the EAS servers, authenticating with your logged-in credentials.
3.  Initiate a build for the specified project on the EAS Build servers.

This seamless integration makes it straightforward to manage your app's cloud services without leaving your development environment.

### Under the Hood: EAS CLI Authentication and Architecture

- **Authentication Token:** When `eas login` is successfully executed, an authentication token is generated and securely stored on your local machine. The exact location can vary by operating system but is often found in a configuration directory like `~/.config/eas/auth.json` or a similar path. This token is then automatically included in the headers of subsequent API requests made by the `eas` command to the EAS backend services, authenticating these requests. This mechanism is a common pattern for CLI tools that interact with cloud services.

- **Separate CLIs (Architectural Choice):** The global installation of `eas-cli` and its distinct nature from the local development tool `expo` CLI (typically invoked as `npx expo`) underscores a deliberate architectural decision. This separation delineates local development activities from interactions with cloud-based services. `eas-cli` must remain synchronized with changes in cloud APIs, while `npx expo` aligns with updates to the Expo SDK and local development tooling. While this separation might initially seem like an added complexity, it ultimately provides greater clarity and modularity in the Expo ecosystem.

- **Account-Based Trust:** EAS services perform actions with significant real-world implications (e.g., building with sensitive credentials, submitting to app stores). Account-based authentication via `eas login` ensures that only authorized individuals can initiate these actions. The locally stored token acts as a session credential. For automated environments like CI/CD pipelines, token-based authentication (e.g., using an `EXPO_TOKEN` environment variable) is preferred.

### Troubleshooting Common Setup Issues

- **Command not found (`eas: command not found`):**
  - This usually means the global installation directory for Node.js packages is not in your system's `PATH` environment variable. Consult the documentation for your operating system and Node.js/npm/Yarn setup to ensure the path is correctly configured.
  - Try restarting your terminal session after installation.
- **Permission Errors (EACCES):**
  - If you encounter permission errors with `npm install -g`, it often indicates issues with npm's global directory permissions. Research how to fix npm permissions for your OS, or consider using a Node version manager like `nvm` which can help avoid these issues.
- **Login Failures:**
  - Double-check your Expo username and password.
  - Ensure you have a stable internet connection.
  - If you use two-factor authentication (2FA) on your Expo account, `eas login` will typically prompt for your 2FA code.
  - Sometimes, corporate firewalls or proxies can interfere. If you suspect this, you may need to configure proxy settings for your terminal or npm/Yarn.

> [!TIP]
> If you encounter persistent issues, running the command with a verbose flag (if available, e.g., `eas login --verbose`, though verbosity flags vary by command) or checking the EAS CLI GitHub repository for known issues can be helpful. The Expo community forums and Discord are also excellent resources for support.

> 🤖 **(Android Developers):**
>
> **Comparison:** The EAS CLI (`eas`) can be compared to specialized command-line tools you might already use for certain development or deployment tasks, such as `fastlane` for automation, or `gradlew` for compiling and building. However, `eas-cli` acts as a unified interface to a comprehensive suite of cloud-based services, rather than being solely focused on local tooling. It orchestrates remote actions.
>
> **Key Takeaway:** `eas-cli` is your command center for cloud operations like building your `.aab` and submitting it to the Play Store, distinct from local `gradlew` commands.

> 🍏 **(iOS Developers):**
>
> **Comparison:** Similar to Android developers, `eas-cli` can be likened to tools like `fastlane` or even `xcodebuild` when used for scripting CI/CD tasks. It provides a higher-level abstraction for interacting with cloud services for building (`.ipa`) and submitting to App Store Connect.
>
> **Key Takeaway:** `eas-cli` manages cloud builds and submissions, simplifying the interaction with Apple's ecosystem without needing to manually run `xcodebuild` commands for these specific cloud tasks.

> 🌐 **(Web Developers - React/Angular):**
>
> **Comparison:** `eas-cli` is conceptually similar to the command-line interfaces provided by various cloud platforms (e.g., `vercel cli`, `netlify cli`, `aws cli`, `gcloud cli`). It serves as your local gateway for managing remote resources and services, but in this context, those resources are specifically tailored for mobile application build and deployment lifecycles.
>
> **Key Takeaway:** Just as you use a CLI to deploy your web app to a hosting provider, you use `eas-cli` to send your mobile app to cloud build services and app stores.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Install EAS CLI](https://docs.expo.dev/build/setup/#install-the-latest-eas-cli)
> - [Expo Docs: Log in to your account (from Build setup)](https://docs.expo.dev/build/setup/#log-in-to-your-expo-account)
> - [Expo Docs: Getting Started with EAS (includes login)](https://docs.expo.dev/eas/getting-started/#log-in-to-your-account)
> - [EAS CLI GitHub Repository](https://github.com/expo/eas-cli) (For checking releases, issues, and contributing)

With EAS CLI installed and configured, you are now ready to start defining build configurations for your project, which is the focus of our next section.

---

_Next: [Section 4: Configuring eas.json for Builds](./section-04-configuring-eas-json-for-builds.md)_
