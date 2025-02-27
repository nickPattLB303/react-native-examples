# React Native Training Course

A comprehensive training course for React Native development with a pharmacy/healthcare theme.

## 📋 Quick Start

```bash
# Install dependencies
npm install

# Set up Husky hooks
npm run prepare

# Run validations
npm run validate
```

## 📱 Sample Components

The repository includes sample components that adhere to all course requirements:

- `src/components/MedicationCard.jsx` - A reusable card for displaying medication details
- `src/screens/PrescriptionListScreen.jsx` - A screen showing medication lists
- `src/data/MedicationData.js` - Sample pharmacy-themed data

Use these files as templates for creating your own components and screens.

## 🧪 Validation System

This project includes a comprehensive validation system to ensure all code follows:

1. **Pharmacy Theme Requirements** - All examples use healthcare terminology
2. **Platform-Specific Guidelines** - Platform code includes explanatory comments
3. **Documentation Standards** - Cross-references and structure are validated
4. **Code Quality Standards** - ESLint ensures code meets quality requirements

## 💻 Available Scripts

```bash
# Run all validations
npm run validate

# Run specific validations
npm run validate:theme         # Check pharmacy theme adherence
npm run validate:platform-code # Check platform-specific code
npm run validate:links         # Verify documentation cross-links 
npm run validate:docs          # Validate documentation structure
npm run lint                   # Run ESLint
```

## 📚 Documentation

- [Developer Guide](./docs/developer-guide.md) - Comprehensive guide for contributors
- [Course Structure](./docs/course-structure.md) - Overview of course modules and structure
- [Core Concepts](./docs/core-concepts.md) - Core React Native concepts covered in the course

## 🔄 Continuous Integration

This repository uses GitHub Actions for continuous validation:

- Each PR triggers automatic validation checks
- Detailed validation reports are generated as artifacts
- PRs must pass all validation checks before merging

## 🧩 Project Structure

```
├── .github/workflows    # GitHub Actions CI workflows
├── docs/                # Documentation files
├── scripts/             # Validation scripts
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   └── data/            # Sample data providers
└── .eslintrc.js         # ESLint configuration
```

## 🏥 Pharmacy Theme

This training course uses a consistent pharmacy/healthcare theme:

- Components use medication and pharmacy terminology
- Data examples are based on prescriptions and healthcare
- Functions use healthcare verbs (prescribe, dispense, administer)

To learn more about the theme requirements, see the [Developer Guide](./docs/developer-guide.md).

## ❓ Need Help?

If you need assistance, check:

1. The [Developer Guide](./docs/developer-guide.md) for detailed information
2. Review existing components for examples
3. Contact the course maintainers via the Webex chat channel

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.