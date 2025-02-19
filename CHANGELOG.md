# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Installed dependencies: react-native-paper, styled-components, zustand, react-query, faker (Faker JS)
- Implemented four-tab navigation structure with Home, Medications, Orders, and Account tabs
- Created stack navigation layouts for Medications, Orders, and Account sections
- Added new screen components:
  - Medications: List and Details screens
  - Orders: List and Details screens
  - Account: Main, Profile, and Settings screens
- Implemented basic navigation between screens using react-native-paper Button components
- Added themed components and consistent styling across all new screens
- Added comprehensive JSDoc documentation to all navigation components and screens:
  - Module and function-level documentation
  - Type definitions and return values
  - Component descriptions and usage information
- Integrated react-native-paper theming system:
  - Created custom theme that combines MD3 and Navigation themes
  - Added support for light and dark mode
  - Configured system fonts with proper weights
  - Synchronized colors with existing color scheme
- Enhanced theme system:
  - Created custom theme types and configuration
  - Integrated styled-components with React Native Paper
  - Added theme spacing, border radius, and elevation tokens
  - Added typography configuration with standardized sizes and line heights
  - Improved dark mode support with unified theme provider
  - Fixed font configuration to properly support MD3 typography scale
  - Added comprehensive JSDoc documentation to theme system:
    - Module and interface documentation
    - Property descriptions and type information
    - Component documentation with props and return types
  - Enhanced TypeScript support:
    - Added proper type declarations for styled-components
    - Fixed theme type compatibility with Navigation theme
    - Improved type safety across theme system
  - Started migration from StyleSheet to styled-components:
    - Created shared styled container components
    - Converted account screens to use styled-components
    - Converted medications screens to use styled-components
    - Converted orders screens to use styled-components
    - Improved theme consistency with spacing tokens
    - Fixed theme provider integration and type safety
    - Consolidated theme configuration in a single location
    - Enhanced component documentation and type safety:
      - Added detailed JSDoc examples
      - Improved type definitions and interfaces
      - Fixed TypeScript strict mode compliance
      - Added proper return type annotations
    - Created shared styled text components:
      - BaseText with theme-aware typography
      - Title, Subtitle, SemiBoldText variants
      - Link component with primary color
      - Converted ThemedText to use styled-components
      - Added color prop support for dynamic text colors
      - Fixed typography configuration and theme integration
    - Created shared styled button components:
      - BaseButton with theme integration
      - PrimaryButton, SecondaryButton, OutlineButton variants
      - Support for different sizes and full-width option
      - Consistent styling with theme tokens
      - Added ThemedButton component for easy usage
    - Created shared styled list components:
      - BaseListItem with theme integration
      - ListContainer for consistent layout
      - ListSeparator for visual separation
      - ListItemTitle and ListItemDescription components
      - Specialized MedicationListItem component:
        - Medication-specific styling and icons
        - Support for name, dosage, and frequency
        - Compact mode option
      - Specialized OrderListItem component:
        - Order-specific styling and icons
        - Status-based color coding
        - Support for order details display
        - Compact mode option

### Changed
- Updated tab navigation layout to use new icon set for tab bar icons
- Restructured app/(tabs) directory to support new navigation hierarchy
- Modified existing Home tab to integrate with new navigation structure
- Enhanced code documentation with detailed JSDoc comments following JSDoc standards
- Updated root layout to use PaperProvider for consistent theming
- Migrated ThemedText from StyleSheet to styled-components for better theme integration
- Added typography configuration to theme system for consistent text styling
- Converted Button components to use styled-components with theme integration
- Added list components with consistent styling and theme integration
- Implemented specialized list items for medications and orders
- Converted existing components to use styled-components:
  - Collapsible component with theme-aware spacing and animations
  - ParallaxScrollView with styled containers and headers
  - HelloWave with typography integration
  - TabBarBackground with proper blur styling
  - NotFoundScreen with consistent spacing
  - HomeScreen with theme-aware containers
  - Improved component consistency and theme integration
  - Enhanced maintainability and code organization
- Enhanced TypeScript support in styled components:
  - Added proper type definitions for styled component props
  - Fixed theme type inference in template literals
  - Improved type safety in styled component functions
  - Created reusable interfaces for styled component props

### Removed
- Removed explore.tsx and its associated tab
- Cleaned up unused navigation code from previous implementation
- Removed StyleSheet-based text styles in favor of styled-components
- Eliminated inline styles and StyleSheet instances from converted components
- Removed all remaining StyleSheet.create calls from the codebase
