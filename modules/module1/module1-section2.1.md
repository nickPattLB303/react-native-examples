# Module 2: React Native Environment Setup with Expo

## 2.1 Foundational Tools: Installing Node.js LTS

Requirement: The essential prerequisite for React Native and Expo development is Node.js. It provides the JavaScript runtime environment necessary for executing the various tools involved in the development process, including the Expo CLI, the Metro bundler, and package managers like npm or Yarn.

LTS Recommendation: It is strongly recommended to install the current Long-Term Support (LTS) version of Node.js.37 LTS releases prioritize stability and receive extended security updates and bug fixes, making them the ideal choice for development environments where reliability is crucial.51 Using non-LTS or outdated versions can lead to unexpected compatibility issues with the React Native and Expo tooling.

Current LTS: As of late 2024 / early 2025, the active LTS version is Node.js 22.x, codenamed "Jod".51 Developers should always verify the current LTS version via the official Node.js website 54 or the release schedule documentation.51

Installation (macOS): The recommended method for installing Node.js (and other command-line tools) on macOS is using Homebrew, a popular package manager. Installation can be done via the terminal command: $ brew install node.55 Homebrew simplifies the installation and updating process.

Verification: After installation, the installed Node.js version can be verified by running $ node -v in the terminal. Ensure this version corresponds to a current LTS release (e.g., v22.x.x).

The correct installation of a Node.js LTS version is fundamental because the entire React Native development toolchain relies on it. The Expo CLI, Metro bundler, and package managers are JavaScript applications executed by Node.js. Compatibility between these tools and the Node.js runtime is tested and ensured primarily for LTS versions. Using an appropriate LTS version minimizes the risk of encountering environment-related errors and ensures the stability of the development workflow.

#### Works cited

37. Create your first app - Expo Documentation, accessed April 24, 2025, <https://docs.expo.dev/tutorial/create-your-first-app/>
51. Node.js - endoflife.date, accessed April 24, 2025, <https://endoflife.date/nodejs>
54. Node.js --- Run JavaScript Everywhere, accessed April 24, 2025, <https://nodejs.org/en>
55. Set Up Your Environment - React Native, accessed April 24, 2025, <https://reactnative.dev/docs/set-up-your-environment>