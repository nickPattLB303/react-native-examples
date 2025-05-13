## Section 3: Setting up EAS CLI

This section guides you through the process of setting up the Expo Application Services (EAS) Command Line Interface (CLI). The EAS CLI is the primary tool you'll use to interact with all EAS services, including EAS Build, Submit, and Update, directly from your terminal. Proper installation and authentication are the first steps to leveraging the power of EAS.

### Prerequisites for EAS CLI

Before you install and use the EAS CLI, ensure you have the following prerequisites met:

- **Node.js:** EAS CLI is a Node.js package. You need Node.js (LTS version recommended) installed on your system. You can download it from [nodejs.org](https://nodejs.org/). If you've been developing React Native apps, you likely already have this.
- **npm or Yarn:** A Node.js package manager, either npm (which comes with Node.js) or Yarn. You'll use one of these to install EAS CLI.
- **Expo Account:** You need an Expo account to use EAS services. If you don't have one, you can sign up for free at [expo.dev](https://expo.dev/signup).
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

Once EAS CLI is installed, you need to log in to your Expo account to link the CLI with EAS services. This allows EAS CLI to act on your behalf, managing your projects, builds, and submissions.

1.  **In your terminal, run the login command:**
    ```bash
    eas login
    ```
2.  **Follow the prompts:** EAS CLI will typically prompt you for your Expo account username and password. Alternatively, it might open a browser window for you to authenticate via the Expo website.

    ```bash
    # Example output after running 'eas login'
    # We need to log in to your Expo account.
    # ? Log in with an existing Expo account or create a new one? › Log in with an existing Expo account
    # ✔ Email / Username: your_expo_username
    # ✔ Password: [hidden]
    # Authenticating...
    # Successfully logged in as your_expo_username!
    ```

    If you are already logged in via the `expo-cli` (the older CLI), `eas login` might detect this and log you in automatically or ask to use the existing session.

3.  **Confirmation:** Upon successful login, EAS CLI will store your session credentials locally and securely. You generally only need to log in once per machine, unless you explicitly log out using `eas logout`.

### How EAS CLI Connects to Your Project

After installing EAS CLI and logging in, you typically use it within the root directory of your React Native project. EAS CLI automatically detects your project configuration (from `app.json` or `app.config.js`) and interacts with EAS services in the context of that specific app.

For example, when you run `eas build`, the CLI will:

1.  Read your project's identifier (e.g., `@username/project-slug` from `app.json`).
2.  Communicate with the EAS servers, authenticating with your logged-in credentials.
3.  Initiate a build for the specified project on the EAS Build servers.

This seamless integration makes it straightforward to manage your app's cloud services without leaving your development environment.

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

> 📚 **Official Documentation:**
>
> - [Expo Docs: Installing EAS CLI](https://docs.expo.dev/eas/getting-started/#install-eas-cli)
> - [Expo Docs: Log in to your account](https://docs.expo.dev/eas/getting-started/#log-in-to-your-account)
> - [EAS CLI GitHub Repository](https://github.com/expo/eas-cli) (For checking releases, issues, and contributing)

With EAS CLI installed and configured, you are now ready to start defining build configurations for your project, which is the focus of our next section.

---

_Next: [Section 4: Configuring eas.json for Builds](./section-04-configuring-eas-json-for-builds.md)_
