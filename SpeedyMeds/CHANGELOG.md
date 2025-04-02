# Changelog

All notable changes to the SpeedyMeds project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning (though formal versioning might be simplified for the course).

## [Unreleased]

### Added

- Initial project setup using Expo `blank-typescript` template.
- SVG mockups for Dashboard, Prescriptions, Order Detail, and Account screens (`assets/images/`).
- Initial `README.md` outlining project goals, setup, and workflow.
- Initial `CONTRIBUTING.md` defining contribution guidelines.
- Initial `CHANGELOG.md` (this file).
- Initial `SETUP.md` with detailed environment setup instructions.
- Initial `USAGE.md` placeholder.
- Initial `ROADMAP.md` outlining project phases.
- GitHub templates (`.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`).

### Changed

- Updated `README.md` with comprehensive project information, key features, and refined instructions.
- Updated `README.md` with comprehensive project information, key features, and refined instructions.
- Updated `CONTRIBUTING.md` with refined instructions and links.
- Refactored styling across all screens (`OrderDetailScreen`, `AccountScreen`, `PrescriptionsScreen`) to consistently use `styled-components` and the shared theme context.

### Fixed

- Corrected navigation prop types in `OrdersScreen` (using `BottomTabScreenProps` instead of `NativeStackScreenProps`) and updated navigation logic.
- Resolved TypeScript errors related to implicit `any` type for the `theme` prop in styled components across all screens by using explicit type annotations.

### Removed

- Separate `functional_requirements.md` (content integrated into other docs like `README.md` and `ROADMAP.md`).
