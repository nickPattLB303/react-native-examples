# React Native Training Course Developer Guide

## 📋 TL;DR

- **Theme**: All examples must use pharmacy/medication terminology
- **Validation**: Run `npm run validate` before submitting PRs
- **Pre-commit**: Husky hooks will validate your code on commit
- **Components**: Use sample components in `src/components` as templates

## 🔍 Introduction

This guide helps you understand the pharmacy-themed React Native training course requirements and how to use our automated validation tools to ensure your contributions meet our standards.

## 🏥 Pharmacy Theme Requirements

All code examples in this training course must follow our pharmacy theme:

### Component Names

Components should include pharmacy terminology in their names:
- ✅ `MedicationCard`, `PrescriptionList`, `PharmacyHeader`
- ❌ `UserCard`, `ItemList`, `AppHeader`

### Data Examples

Always use pharmacy-related data in examples:
- ✅ Medications, prescriptions, patients, dosages
- ❌ Products, users, items, widgets

### Healthcare Verbs

Use healthcare-specific verbs in your functions and methods:
- ✅ `dispense()`, `prescribe()`, `administer()`, `refill()`
- ❌ `handle()`, `process()`, `get()`, `fetch()`

## 🔧 Validation Tools

### Running Validation

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

### Pre-commit Hooks

We use Husky to run validations before each commit:

1. The pre-commit hook runs `lint-staged` 
2. `lint-staged` checks:
   - ESLint on staged JS/TS files
   - Theme validation on staged JS/TS files
   - Platform-specific code validation on JS/TS files
   - Documentation link validation on markdown files

To bypass hooks in emergencies (not recommended):
```bash
git commit -m "Your message" --no-verify
```

## 📱 Platform-Specific Code

When writing platform-specific code:

### Using Platform.OS

Always include explanatory comments:

```javascript
// ✅ Good example
// iOS: Uses native UIPickerView
// Android: Uses Material Design Dropdown
const Picker = Platform.OS === 'ios' 
  ? IOSPickerComponent 
  : AndroidPickerComponent;

// ❌ Bad example (no explanation)
const style = Platform.OS === 'ios' ? style1 : style2;
```

### Platform.select()

Include comments for each platform:

```javascript
// ✅ Good example
const buttonStyle = Platform.select({
  // iOS: Uses rounded corners and shadows
  ios: { 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  // Android: Uses Material Design elevation
  android: { 
    borderRadius: 4,
    elevation: 4,
  }
});

// ❌ Bad example (no explanations)
const fontSize = Platform.select({
  ios: 18,
  android: 16,
});
```

### Platform-specific Files

When using `.ios.js` and `.android.js` files:
- Always include both platform versions OR a default version
- Document differences between platforms in comments

## 🧩 Sample Components

Use our sample components as templates:

- `MedicationCard`: Shows how to display medication information
- `PrescriptionListScreen`: Demonstrates how to use components with data

## 🧪 Common Validation Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Missing pharmacy theme terminology" | Code doesn't use pharmacy terms | Add pharmacy-related terms to your component/data |
| "Component name does not reflect pharmacy theme" | Component name lacks pharmacy terms | Rename component to include pharmacy terminology |
| "Platform-specific code without explanatory comments" | Missing comments for platform code | Add comments explaining platform differences |
| "Platform-specific file without counterpart" | Missing the alternative platform file | Create the corresponding platform file |

## 💡 Best Practices

1. **Start with templates**: Use the sample components as starting points
2. **Run validation locally**: Use `npm run validate` before submitting PRs 
3. **Check GitHub Actions**: Review validation reports on PR submissions
4. **Real-world examples**: Base examples on realistic pharmacy scenarios
5. **Consistent terminology**: Use the same terms throughout related examples

## 📚 Additional Resources

- [Course Structure Documentation](./course-structure.md)
- [Core Concepts](./core-concepts.md)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

## Need Help?

If you're having trouble with the validation tools or understanding the requirements, please:

1. Check existing documentation
2. Review error messages carefully
3. Contact the course maintainers via the Webex chat channel

Happy coding! 💊🔬💉