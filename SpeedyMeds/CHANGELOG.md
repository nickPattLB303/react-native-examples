# Changelog

All notable changes to the SpeedyMeds project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning (though formal versioning might be simplified for the course).

---

## [Unreleased] - 2025-04-04 (Comprehensive Review & Enhancement)

### Added

- **Exemplary Documentation:** Added extensive JSDoc comments, inline explanations, and documentation links across all `src` files (`api`, `context`, `hooks`, `navigation`, `screens`, `stores`, `theme`, type declarations) and root configuration files (`.eslintrc.js`, `.prettierignore`, `prettierrc.js`, `tsconfig.json`, `App.tsx`, `app.json`).
- **Enhanced Root Docs:** Significantly improved `README.md`, `SETUP.md`, and `USAGE.md` with detailed explanations, setup steps, usage guides, troubleshooting tips, and project structure diagrams.
- **Navigation Icons:** Added icons to the bottom tab navigator using `MaterialCommunityIcons`.
- **`OrderStatus.CANCELLED`:** Added a new status to the `OrderStatus` enum in `src/types/index.ts`.
- **Theme `warning` Color:** Added `warning` and `onWarning` color mappings to the light and dark themes in `src/theme/theme.ts`.

### Changed

- **Navigation Refactor (Structure):** Refactored navigation logic from a single `AppNavigator.tsx` into multiple focused files: `types.ts`, `OrdersStackNavigator.tsx`, `MainTabNavigator.tsx`, and a simplified `AppNavigator.tsx` (root).
- **Navigation Refactor (Logic):** Implemented a nested `OrdersStackNavigator` within the `MainTabNavigator` to handle navigation between `OrdersScreen` and `OrderDetailScreen`, improving structure and scalability. Updated relevant screen prop types (`OrdersScreen`, `OrderDetailScreen`).
- **Theme Config (`app.json`):** Changed `userInterfaceStyle` from `"light"` to `"automatic"` to better support system theme preferences initially.
- **Code Formatting:** Applied Prettier formatting across the project to ensure consistency.
- **Documentation Overhaul:** Reviewed and updated all existing documentation files (`docs/setup/*`, `README.md`, `SETUP.md`, etc.) for clarity, accuracy, consistency, and added links/diagrams where appropriate.

### Fixed

- **Theme Type Inference:** Resolved TypeScript errors in `PrescriptionsScreen.tsx` related to accessing extended theme properties (`warning`, `textLight`) within styled components and helper functions using a workaround (importing base `customColors`).
- **ESLint Formatting:** Corrected various minor formatting issues reported by ESLint (mostly related to newlines) by running `npm run format`.

---

## [Previous State - Before 2025-04-04 Review]

_(This represents the approximate state before the major review/refactor)_

### Added

- Initial project setup using Expo `blank-typescript` template.
- SVG mockups for Dashboard, Prescriptions, Order Detail, and Account screens (`assets/images/`).
- Basic project documentation (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SETUP.md`, `USAGE.md`, `ROADMAP.md`).
- Initial `docs/setup/` guides for various tools.
- GitHub templates (`.github/`).
- Core dependencies (React Navigation, Paper, Styled Components, React Query, Zustand, Faker, etc.).
- Basic theme structure (`src/theme/`) and context (`src/context/`).
- Basic Zustand store (`src/stores/appDataStore.ts`).
- Mock data generation (`src/api/mockData.ts`) and API simulation (`src/api/index.ts`).
- Initial screen components (`src/screens/`) with basic content.
- Initial navigation setup (Stack + Tabs in single `AppNavigator.tsx`).
- Linting/Formatting setup (`.eslintrc.js`, `prettierrc.js`).
- TypeScript setup (`tsconfig.json`).
- Testing setup placeholders (`jest.config.js`, `jest.setup.js`).

### Changed

- Some initial updates to documentation and styling consistency.

### Removed

- Separate `functional_requirements.md`.
