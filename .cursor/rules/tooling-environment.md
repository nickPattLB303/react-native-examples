# Tooling and Development Environment

## Description
This rule defines the standards for tooling, development environments, and platforms used throughout the React Native training course.

## Rule
- Use specific platforms for different types of code:
  - HTML, CSS, JavaScript, React: CodePen
  - React Native: Expo Snack
  - Challenges: Repository branches with local setup

- React Native development setup:
  - Use Expo Go as the primary development environment
  - Follow the official Expo documentation for setup instructions
  - Additional tools introduced on a case-by-case basis with clear documentation

- Expo Snack SDK usage:
  - Create Snacks locally in the repository
  - Ensure all Snacks are properly documented
  - Include clear instructions for running and modifying Snacks

- Repository branch structure for exercises and challenges:
  - `exercises/<EXERCISE_NAME>/starter`: Starting point for exercises
  - `exercises/<EXERCISE_NAME>/complete`: Completed example for exercises
  - `challenges/<CHALLENGE_NAME>/starter`: Starting point for challenges
  - `challenges/<CHALLENGE_NAME>/complete`: Completed example for challenges

- All code examples must include:
  - Clear setup instructions
  - Required dependencies
  - Commands to run the code
  - Expected output or behavior

- For local development, provide:
  - Environment setup instructions
  - Troubleshooting guides
  - Platform-specific considerations (macOS, Windows, Linux)

## Examples
- Proper Expo Snack setup:
  ```markdown
  # Medication List Component

  ## Running this Example
  
  ### Option 1: Expo Snack (No Setup Required)
  1. Open this Snack in your browser: [Medication List Snack](https://snack.expo.dev/@username/medication-list)
  2. You can view the result in the preview pane or scan the QR code with the Expo Go app on your device
  
  ### Option 2: Local Development
  1. Clone the repository: `git clone https://github.com/username/react-native-training.git`
  2. Navigate to the example: `cd react-native-training/examples/medication-list`
  3. Install dependencies: `npm install`
  4. Start the development server: `npx expo start`
  5. Scan the QR code with the Expo Go app or press 'i' for iOS simulator / 'a' for Android emulator
  ```

- Proper challenge branch instructions:
  ```markdown
  # Pharmacy Locator Challenge

  ## Setup Instructions
  
  1. Clone the repository if you haven't already:
     ```bash
     git clone https://github.com/username/react-native-training.git
     ```
  
  2. Checkout the starter branch:
     ```bash
     git checkout challenges/pharmacy-locator/starter
     ```
  
  3. Install dependencies:
     ```bash
     npm install
     ```
  
  4. Start the development server:
     ```bash
     npx expo start
     ```
  
  ## Challenge Requirements
  
  Build a pharmacy locator that:
  - Displays a map with nearby pharmacies
  - Shows pharmacy details (name, address, hours)
  - Allows filtering by services offered
  - Provides directions to the selected pharmacy
  
  ## Reference Solution
  
  After completing the challenge, you can view the reference solution by checking out:
  ```bash
  git checkout challenges/pharmacy-locator/complete
  ```
  ``` 