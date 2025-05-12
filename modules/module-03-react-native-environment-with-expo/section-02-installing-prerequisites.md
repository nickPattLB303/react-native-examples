## Section 2: Installing Prerequisites

Before you can create and run your first React Native Expo app, you need to install several essential development tools on your local machine. This section guides you through the installation process for Node.js, Yarn, Watchman, Xcode Command Line Tools (macOS), and Android Studio (for Android development). These prerequisites form the foundation of the development environment. ([Source](https://reactnative.dev/docs/set-up-your-environment))

> [!IMPORTANT]
> You may need administrator privileges on your machine to install some of this software. Ensure you have a stable internet connection for downloading the necessary files. The requirement for multiple tools and specific versions underscores the complexity inherent in cross-platform native development. React Native acts as a bridge between JavaScript and native platform APIs, and this bridge is sensitive to the versions of the JavaScript runtime (Node.js), native SDKs (Android SDK, iOS SDK via Xcode), compilers, and libraries. Careful adherence to version requirements is crucial.

### 1. Node.js (LTS Version) and npm

**Purpose:** Node.js is a JavaScript runtime environment essential for running the Expo CLI, the Metro JavaScript bundler, and various other build scripts. npm (Node Package Manager) is bundled with Node.js and is used to install and manage software packages (dependencies). ([Source](https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman))

**Target Version:** Use the latest **LTS (Long-Term Support)** version. LTS versions offer greater stability and longer support periods, crucial for development. As of mid-2025, Node.js 22.x is the active LTS. ([Source](https://nodejs.org/en/about/previous-releases))

**Installation Steps:**

1.  **(macOS - Recommended) Install using Homebrew:** If you have Homebrew installed (see Watchman section below if not), open Terminal and run:
    ```bash
    brew install node
    ```
2.  **(Windows/Linux/Alternative macOS) Download Official Installer:** Visit [https://nodejs.org/](https://nodejs.org/) and download the LTS installer (`.pkg` for macOS, `.msi` for Windows) for your operating system. Run the installer and follow the prompts. ([Source](https://www.geeksforgeeks.org/install-node-js-on-windows/))
3.  **Verify Installation:** Open a _new_ terminal/command prompt window and run:
    ```bash
    node -v
    # Expected output: v22.x.x (or your installed LTS version)
    npm -v
    # Expected output: Corresponding npm version (e.g., 10.x.x)
    ```

> [!TIP]
> Version managers like `nvm` (Node Version Manager) or `nvm-windows` allow you to easily install and switch between multiple Node.js versions. This is useful for managing different project requirements but is not required for this course.

### 2. Yarn (Optional, but Recommended)

**Purpose:** Yarn is an alternative package manager to npm. It offers features like deterministic installs via a lock file. Expo projects work with both Yarn Classic (v1) and Yarn Modern (v2+). ([Source](https://classic.yarnpkg.com/lang/en/docs/install/))

> [!IMPORTANT]
> Yarn Modern's Plug'n'Play (PnP) mode is incompatible with React Native. If using Yarn Modern (v2+), you MUST configure it to use `node_modules` by creating a `.yarnrc.yml` file in your project root with the following content:
>
> ```yaml
> nodeLinker: node-modules
> ```
>
> ([Source](https://classic.yarnpkg.com/lang/en/docs/install/))

**Installation Steps:**

1.  **(Recommended for Yarn Modern) Use Corepack:** Corepack is included with Node.js v16.10+. Open Terminal and run:
    ```bash
    corepack enable
    corepack prepare yarn@stable --activate
    ```
    ([Source](https://phoenixnap.com/kb/how-to-install-yarn-ubuntu))
2.  **(Alternative - Yarn Classic or if Corepack fails) Use npm:**
    ```bash
    npm install --global yarn
    ```
3.  **Verify Installation:** Open Terminal and run:
    ```bash
    yarn --version
    # Expected output: Your installed Yarn version (e.g., 1.22.x or 4.x.x)
    ```

### 3. Watchman (macOS / Linux)

**Purpose:** Watchman is a file-watching service developed by Facebook. It significantly improves the performance of the Metro bundler during development. ([Source](https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman))

**Under the Hood:** Metro uses Watchman to efficiently monitor your project files for changes. Instead of constantly scanning the entire project, Watchman uses OS notifications to instantly detect saves. This allows Metro to quickly rebuild only the necessary parts of your app, enabling features like Fast Refresh. ([Source](https://www.oreilly.com/library/view/mastering-react-native/9781785885785/ch02s03.html))

**Installation Steps:**

1.  **(macOS - Recommended) Install using Homebrew:**
    - Install Homebrew if you haven't: Open Terminal and run the command from [https://brew.sh/](https://brew.sh/).
    - Install Watchman:
      ```bash
      brew install watchman
      ```
2.  **(Linux):** Installation varies. Try `sudo apt-get update && sudo apt-get install watchman` on Debian/Ubuntu, or build from source. ([Source](https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman))
3.  **(Windows):** Watchman is generally not required or easily installed for React Native development on Windows. Metro uses slower, alternative file-watching methods. ([Source](https://reactnative.dev/docs/set-up-your-environment))
4.  **Verify Installation:** Open Terminal and run:
    ```bash
    watchman --version
    ```

### 4. Xcode Command Line Tools (macOS Only)

**Purpose:** This package provides essential Apple development tools (compilers like Clang, Git) needed to build software on macOS. They are required even if only developing for Android, as some JavaScript dependencies might have native C/C++ addons that need compilation during `npm install`. ([Source](https://www.embarcadero.com/starthere/xe5/mobdevsetup/ios/en/installing_the_commandline_tools.html))

**Installation Steps:**

1.  **Open Terminal.**
2.  **Run the Installer Command:**
    ```bash
    xcode-select --install
    ```
3.  **Follow Prompts:** Click "Install" in the dialog box and agree to the license terms.
4.  **Verify Installation:** Open Terminal and run:
    ```bash
    xcode-select -p
    # Expected output: /Library/Developer/CommandLineTools (or similar)
    ```
    ([Source](https://mac.install.guide/commandlinetools/4))

> [!NOTE]
> If the command reports the tools are already installed, you're set. Installing the _full_ Xcode application (a large download from the Mac App Store) is only required if you intend to build and run your app on an iOS Simulator or a physical iOS device. ([Source](https://reactnative.dev/docs/set-up-your-environment))

### 5. Android Studio (for Android Development)

**Purpose:** Android Studio is Google's official IDE for native Android development. For React Native, it's essential for installing and managing the Android SDK, build tools, and emulators needed to compile and run the Android version of your app. ([Source](https://reactnative.dev/docs/set-up-your-environment))

**Installation Steps:**

1.  **Download Android Studio:** Get the installer for your OS from [https://developer.android.com/studio](https://developer.android.com/studio). ([Source](https://developer.android.com/studio/install))
2.  **Run Installer:** Follow the Setup Wizard. Ensure **Android SDK**, **Android SDK Platform**, and **Android Virtual Device (AVD)** components are selected for installation.
3.  **Configure SDK Manager:** React Native requires specific SDK components.
    - Open Android Studio. Access the SDK Manager (Android Studio > Settings/Preferences > Languages & Frameworks > Android SDK).
    - In the "SDK Platforms" tab, check "Show Package Details".
    - Find and expand **Android 15.0 ("VanillaIceCream")**. Ensure **Android SDK Platform 35** is checked.
    - Also check a system image for the emulator (e.g., **Google APIs Intel x86_64 Atom System Image** or **Google APIs ARM 64 v8a System Image** on Apple Silicon).
    - Switch to the "SDK Tools" tab. Check "Show Package Details".
    - Expand **Android SDK Build-Tools**. Ensure version **35.0.0** is checked (uncheck others unless needed). ([Source](https://reactnative.dev/docs/set-up-your-environment))
    - Click "Apply" or "OK" to install selected components.
4.  **Set Environment Variable (`ANDROID_SDK_ROOT`):** Build tools need to find the SDK.
    - **Find SDK Location:** The path is shown at the top of the SDK Manager window (e.g., `~/Library/Android/sdk` on macOS, `%LOCALAPPDATA%\\Android\\Sdk` on Windows). ([Source](https://reactnative.dev/docs/set-up-your-environment))
    - **(macOS):** Edit `~/.zshrc` (or `~/.bash_profile`). Add:
      ```bash
      export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk" # Replace with your actual path
      export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
      ```
      Save, then run `source ~/.zshrc` (or restart Terminal).
    - **(Windows):** Search "Edit the system environment variables". Click "Environment Variables...". Under "User variables", click "New...". Variable name: `ANDROID_SDK_ROOT`, Value: your SDK path. Click OK. Also, add `%ANDROID_SDK_ROOT%\\platform-tools` to your user `Path` variable. Restart Command Prompt/PowerShell. ([Source](https://reactnative.dev/docs/set-up-your-environment))
    - **(Linux):** Edit `~/.bashrc` or `~/.zshrc`. Add:
      ```bash
      export ANDROID_SDK_ROOT="$HOME/Android/Sdk" # Replace with your actual path
      export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
      ```
      Save, then run `source ~/.bashrc` (or restart Terminal).
5.  **Verify Environment Variable:** Open a _new_ terminal/command prompt and run:
    - **(macOS/Linux):** `echo $ANDROID_SDK_ROOT`
    - **(Windows CMD):** `echo %ANDROID_SDK_ROOT%`
    - **(Windows PowerShell):** `Get-ChildItem -Path Env:\\ANDROID_SDK_ROOT`
      The command should output the path you set. Also try running `adb version` to verify `platform-tools` are in the PATH. ([Source](https://reactnative.dev/docs/set-up-your-environment))

> 🤖 **(Native Android Developers):**
>
> **Comparison:** You're familiar with Android Studio and `ANDROID_SDK_ROOT`. The key differences are the specific SDK/Build Tools versions (35) required by React Native 0.7x+ and the need to install Node.js (LTS) and potentially Watchman (macOS/Linux).
>
> **Key Takeaway:** Adapt your existing Android environment by installing Node/Watchman and ensuring the correct SDK/Build Tools versions are active.

> 🍏 **(Native iOS Developers):**
>
> **Comparison:** You have Xcode/CLTs. The new tools are Node.js (LTS), npm/Yarn (JS package managers like CocoaPods/SPM), and Watchman. If targeting Android, you also need to install and configure Android Studio and the Android SDK as described.
>
> **Key Takeaway:** Install the JavaScript ecosystem tools (Node, npm/Yarn, Watchman) and the Android toolchain if needed.

> 🌐 **(Web Developers):**
>
> **Comparison:** Node.js, npm/Yarn are familiar. The major additions are the native development environments: Android Studio (+SDK config) and Xcode Command Line Tools (or full Xcode for iOS simulation). These provide the compilers and SDKs needed because React Native builds native apps.
>
> **Key Takeaway:** Augment your web toolchain with platform-specific native SDKs and tools (Android Studio, Xcode CLTs).

### Summary: Prerequisite Installation Commands (Recommended Methods)

**Table 2: Prerequisite Installation Commands Summary**

| Prerequisite            | macOS Command (Homebrew Recommended)                         | Windows Command (Installer/Choco Recommended)                | Verification Command                                                         |
| :---------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Node.js (LTS)           | `brew install node`                                          | Download .msi from nodejs.org or `choco install nodejs-lts`  | `node -v`                                                                    |
| npm                     | Bundled with Node.js                                         | Bundled with Node.js                                         | `npm -v`                                                                     |
| Yarn (Optional)         | `corepack enable && corepack prepare yarn@stable --activate` | `corepack enable && corepack prepare yarn@stable --activate` | `yarn --version`                                                             |
| Watchman                | `brew install watchman`                                      | N/A (Generally not required)                                 | `watchman --version` (macOS/Linux)                                           |
| Xcode CLTs (macOS)      | `xcode-select --install`                                     | N/A                                                          | `xcode-select -p`                                                            |
| Android Studio          | Download .dmg from developer.android.com/studio              | Download .exe from developer.android.com/studio              | Launch Android Studio                                                        |
| Android SDK/Build Tools | Via Android Studio SDK Manager                               | Via Android Studio SDK Manager                               | Check SDK Manager UI                                                         |
| ANDROID_SDK_ROOT        | `export ANDROID_SDK_ROOT=...` in profile                     | Set via System Environment Variables                         | `echo $ANDROID_SDK_ROOT` (macOS/Linux) / `echo %ANDROID_SDK_ROOT%` (Win CMD) |

With these prerequisites installed, you are now ready to create your first Expo application!

> 📚 **Official Documentation:**
>
> - [React Native Docs: Setting up the development environment](https://reactnative.dev/docs/environment-setup)
> - [Node.js Downloads](https://nodejs.org/en/download/)
> - [Yarn Installation Guide](https://classic.yarnpkg.com/en/docs/install) (Classic) / [Yarn Installation](https://yarnpkg.com/getting-started/install) (Modern)
> - [Watchman Installation Guide](https://facebook.github.io/watchman/docs/install)
> - [Install Android Studio](https://developer.android.com/studio/install)
