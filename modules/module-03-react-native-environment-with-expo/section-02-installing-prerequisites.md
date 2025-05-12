## Section 2: Installing Prerequisites

Before you can create and run your first React Native Expo app, you need to install a few essential tools on your macOS machine. This section guides you through the installation process for Node.js (which includes npm), Yarn (an alternative package manager), Watchman, and Xcode Command Line Tools.

> [!IMPORTANT]
> You'll need administrator privileges on your macOS machine to install this software. Ensure you have a stable internet connection for downloading the necessary files.

### 1. Node.js (LTS Version) and npm

Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. React Native and Expo rely heavily on Node.js for bundling your JavaScript code, running the development server, and managing project dependencies. npm (Node Package Manager) is included with Node.js and is used to install and manage software packages (libraries, tools) for your projects.

**Installation Steps:**

1.  **Visit the Node.js Website:** Open your web browser and navigate to the official Node.js website: [https://nodejs.org/](https://nodejs.org/).
2.  **Download LTS Version:** You should see download options on the homepage. It's highly recommended to download the **LTS (Long Term Support)** version. LTS versions are more stable and are supported for a longer period. Click on the LTS version for macOS to download the installer (`.pkg` file).
    - _Caption: The Node.js website homepage showing download options. The LTS version is usually highlighted._
3.  **Run the Installer:** Once the download is complete, open the `.pkg` file from your Downloads folder. Follow the on-screen instructions. You can generally accept the default settings.
4.  **Verify Installation:** After the installation is complete, open your Terminal application (you can find it in `Applications/Utilities/` or search for it using Spotlight).
    To verify Node.js is installed, type the following command and press Enter:
    ```bash
    node -v
    ```
    This should print the installed Node.js version (e.g., `v18.18.0`).
    To verify npm is installed, type:
    ```bash
    npm -v
    ```
    This should print the installed npm version (e.g., `9.8.1`).

> [!TIP]
> There are other ways to install Node.js, such as using a version manager like `nvm` (Node Version Manager). `nvm` allows you to easily switch between different Node.js versions. While not required for this course, it's a useful tool for managing multiple projects with different Node.js needs. For simplicity, we're using the official installer here.

### 2. Yarn (Optional, but Recommended)

Yarn is an alternative package manager to npm. It was developed by Facebook and is known for its speed, reliability, and deterministic installs. While you can use npm for Expo projects, Yarn is often preferred in the React Native community and by Expo documentation. We recommend installing it.

**Installation Steps (after installing Node.js/npm):**

1.  **Open Terminal.**
2.  **Install Yarn using npm:** The easiest way to install Yarn is via npm (which you installed with Node.js). Type the following command and press Enter:
    ```bash
    npm install --global yarn
    ```
3.  **Verify Installation:** To check if Yarn was installed correctly, type:
    ```bash
    yarn --version
    ```
    This should print the installed Yarn version (e.g., `1.22.19`).

### 3. Watchman

Watchman is a tool developed by Facebook for watching file system changes. React Native uses Watchman to detect when you save changes to your code and then automatically triggers a rebuild or reload of your application. It's crucial for a fast development experience.

**Installation Steps:**

1.  **Install Homebrew (if you don't have it):** Watchman is most easily installed via Homebrew, a package manager for macOS. If you don't have Homebrew installed, open your Terminal and run the following command (you can copy it from [https://brew.sh/](https://brew.sh/)):
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    Follow the on-screen instructions. This might take a few minutes.
2.  **Install Watchman using Homebrew:** Once Homebrew is installed, type the following command in your Terminal and press Enter:
    ```bash
    brew install watchman
    ```
3.  **Verify Installation:** To check if Watchman was installed correctly, you can try:
    ```bash
    watchman --version
    ```
    This should output version information.

### 4. Xcode Command Line Tools

Even if you primarily use Expo Go for development, certain tools and scripts, especially those related to iOS development or building native dependencies, require parts of Xcode, specifically the Command Line Tools. These tools include compilers and other utilities necessary for native development.

**Installation Steps:**

1.  **Open Terminal.**
2.  **Run the Installer Command:** Type the following command and press Enter:
    ```bash
    xcode-select --install
    ```
3.  **Follow Prompts:** A dialog box will appear asking if you want to install the tools. Click "Install" and agree to the license terms. The tools will then download and install. This might take some time depending on your internet connection.

> [!NOTE]
> If the command `xcode-select --install` tells you the tools are already installed, you're all set. You don't need to install the full Xcode application from the App Store for Expo development unless you plan to dive deep into custom native iOS code or need to use the full Xcode IDE for specific tasks (which is beyond the scope of initial Expo development).

With these prerequisites installed, you are now ready to create your first Expo application!

> 📚 **Official Documentation:**
>
> - [Node.js Downloads](https://nodejs.org/en/download/)
> - [Yarn Installation Guide](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
> - [Watchman Installation Guide](https://facebook.github.io/watchman/docs/install.html#build-and-install-from-source) (Homebrew method is recommended for macOS)
> - [Expo Docs: Install Node.js and Git](https://docs.expo.dev/get-started/installation/#install-nodejs-and-git) (Git is usually pre-installed on macOS or comes with Xcode Command Line Tools)
