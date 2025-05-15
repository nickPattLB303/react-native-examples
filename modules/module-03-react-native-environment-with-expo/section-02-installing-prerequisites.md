## Section 2: Installing Prerequisites

Before you can create and run your first React Native Expo app, you need to install several essential development tools on your local machine. This section guides you through the installation process for Node.js, Yarn, Watchman, Xcode Command Line Tools (macOS), and Android Studio (for Android development). These prerequisites form the foundation of the development environment. ([Source](https://reactnative.dev/docs/set-up-your-environment))

> [!IMPORTANT]
> You may need administrator privileges on your machine to install some of this software. Ensure you have a stable internet connection for downloading the necessary files. The requirement for multiple tools and specific versions underscores the complexity inherent in cross-platform native development. React Native acts as a bridge between JavaScript and native platform APIs, and this bridge is sensitive to the versions of the JavaScript runtime (Node.js), native SDKs (Android SDK, iOS SDK via Xcode), compilers, and libraries. Careful adherence to version requirements is crucial.

### 1. Node.js (LTS Version) and npm

**Purpose:** Node.js is a JavaScript runtime environment that executes JavaScript code outside of a web browser. It is fundamental to the React Native ecosystem, powering the Expo CLI, the Metro bundler (which packages the JavaScript code), and Node Package Manager (npm) or Yarn, which are used to manage project dependencies. Using the LTS (Long-Term Support) version is strongly recommended for stability and compatibility. ([Source](https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman))

> 💡 **Why LTS?** Long-Term Support versions receive critical bug fixes and security updates for an extended period, ensuring a stable foundation for your projects.

**Target Version:** Use the latest **LTS (Long-Term Support)** version. LTS versions offer greater stability and longer support periods, crucial for development. As of mid-2025, Node.js 22.x is the active LTS. ([Source](https://nodejs.org/en/about/previous-releases))

**Installation Steps (macOS):**

1.  **(Recommended Method: nvm - Node Version Manager)**
    `nvm` allows you to manage multiple Node.js versions easily. This is highly recommended for avoiding version conflicts and ensuring you're using the correct Node version for different projects.
    - Install `nvm` by running the script from the official nvm repository in the terminal:
      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
      ```
      (Restart your terminal or run the `export` commands suggested by the script output for `nvm` to become available). ([Source](https://github.com/nvm-sh/nvm))
    - Install the latest LTS version of Node.js:
      ```bash
      nvm install --lts
      ```
    - Set the installed LTS version as the default for new terminal sessions:
      ```bash
      nvm alias default lts/*
      ```
    - Use the LTS version in your current session (if it didn't switch automatically):
      ```bash
      nvm use --lts
      ```
2.  **(Alternative macOS Method: Homebrew)** If you prefer Homebrew for managing packages directly (and not using nvm), you can install Node via Homebrew:
    ```bash
    brew install node
    ```

**Installation Steps (Windows/Linux):**

1.  **(Windows/Linux/Alternative macOS) Download Official Installer:** Visit [https://nodejs.org/](https://nodejs.org/) and download the LTS installer (`.pkg` for macOS, `.msi` for Windows) for your operating system. Run the installer and follow the prompts. ([Source](https://www.geeksforgeeks.org/install-node-js-on-windows/))

**Verification (All Platforms):**

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

**Purpose:** Developed by Meta (Facebook), Watchman is a service that watches files and records when they change. It's used by the Metro bundler to efficiently detect changes in your project's source code. While technically optional for Expo development, Watchman is **highly recommended** for optimal performance as it enables features like Fast Refresh to work significantly faster, speeding up your development cycle. ([Source](https://app.studyraid.com/en/read/2370/47234/installing-nodejs-and-watchman))

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

**Purpose:** This package provides essential Apple development tools (compilers like Clang, Git) needed to build software on macOS. They are required by Expo CLI and React Native to build the native iOS part of your application. ([Source](https://www.embarcadero.com/starthere/xe5/mobdevsetup/ios/en/installing_the_commandline_tools.html))

If you intend to run your app on an iOS Simulator or a physical iOS device, you will need to install the full **Xcode** application from the Mac App Store. Xcode includes the Command Line Tools, the iOS SDKs, build tools, and the iOS Simulator.

**Installation Steps (Xcode & Command Line Tools):**

1.  **Install Xcode:** Open the Mac App Store, search for "Xcode," and click "Install" or "Update." Xcode is a large application, so the download may take time.
2.  **Install/Configure Xcode Command Line Tools:**
    - After Xcode is installed, open it and accept the license agreement and any additional component installations it prompts for.
    - To ensure the command line tools are correctly selected, open Xcode, go to the **Xcode** menu > **Settings...** (or **Preferences...**). Navigate to the **Locations** tab. In the **Command Line Tools** dropdown, select the latest available version. If no version is selected, click the dropdown and choose one.
    - Alternatively, if you haven't installed the full Xcode yet or want to ensure CLTs are installed, you can try running the following in Terminal:
      ```bash
      xcode-select --install
      ```
      Click "Install" in the dialog box and agree to the license terms. This command works best if full Xcode is not yet installed or if only the tools are missing.
3.  **Install an iOS Simulator (if needed):**
    - In Xcode, go to **Xcode** menu > **Settings...** (or **Preferences...**).
    - Navigate to the **Components** tab.
    - Select an iOS simulator version (e.g., the latest stable version) and click the "Get" or download button next to it if it's not already installed.
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

> 💡 **Reflecting on the Setup Process:**
> The multi-step process involving Node.js, package managers, native IDEs like Xcode (for iOS) or Android Studio (for Android), and specific tools such as Watchman highlights the inherent complexity involved in setting up any mobile development environment, including standard React Native. Native mobile development necessitates large, platform-specific toolchains. React Native builds upon this by adding the JavaScript ecosystem tooling. This combination can present a significant initial hurdle, particularly for developers new to mobile development. This initial setup complexity underscores the value proposition of the Expo framework, which aims to abstract and simplify many of these initial native configuration steps, facilitating a faster start to development. Therefore, while navigating this setup is essential, it also serves to motivate this course's focus on Expo as a means to accelerate onboarding and focus more quickly on React Native application logic.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Setting up the development environment](https://reactnative.dev/docs/environment-setup)
> - [Node.js Downloads](https://nodejs.org/en/download/)
> - [Yarn Installation Guide](https://classic.yarnpkg.com/en/docs/install) (Classic) / [Yarn Installation](https://yarnpkg.com/getting-started/install) (Modern)
> - [Watchman Installation Guide](https://facebook.github.io/watchman/docs/install)
> - [Install Android Studio](https://developer.android.com/studio/install)
