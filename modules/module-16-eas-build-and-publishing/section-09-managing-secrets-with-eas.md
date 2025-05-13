## Section 9: Managing Secrets with EAS

This section covers the crucial topic of managing secrets within your Expo and React Native applications when using Expo Application Services (EAS). Securely handling API keys, environment variables, and other sensitive data is paramount for any production application.

### What are Secrets in Mobile Apps?

In the context of mobile applications, "secrets" refer to sensitive pieces of information that your app might need to function but should not be publicly exposed. Examples include:

- API keys for third-party services (e.g., Google Maps, Stripe, Firebase, your own backend).
- Backend URLs that might differ per environment (development, staging, production).
- Encryption keys or other sensitive configuration values.

**Why is secure management important?**

If secrets are mishandled, they can be extracted from your app's code (if hardcoded) or from your version control history. This can lead to unauthorized access to services, data breaches, and significant security vulnerabilities, potentially incurring financial costs or reputational damage.

### The Problem with Hardcoding or Committing Secrets

- **Hardcoding:** Placing secrets directly in your JavaScript or native code is highly insecure. App bundles can be decompiled, revealing these hardcoded values.
- **Committing to Version Control (e.g., Git):** Even if secrets are in configuration files, committing them to your repository (especially public ones) makes them permanently accessible in the repository's history, even if you remove them later. Accidentally committing `.env` files or similar is a common mistake.

### Introduction to EAS Secrets

EAS Build provides a secure way to manage secrets required during the build process of your application. These are typically environment variables that can configure your app for different environments (development, staging, production) or provide it with necessary API keys at build time.

**How EAS Secrets work:**

1.  You define secrets (key-value pairs) using the EAS CLI.
2.  These secrets are securely stored by Expo, associated with your Expo account and project.
3.  When you run an EAS Build, these secrets are made available as environment variables within the build environment on the EAS servers.
4.  Your application can then be built to include these values, for example, by embedding them via your app configuration (`app.config.js` or `app.json` using the `extra` field) or directly if build tools support it.

This approach ensures that the actual secret values do not need to be present in your source code repository.

### Managing Secrets with EAS CLI

EAS CLI provides commands to manage your secrets:

- **Creating a Secret:**
  Use the `eas secrets:create <SECRET_NAME>` command. You will be prompted to enter the secret value. This value is then securely transmitted and stored by Expo.

  ```bash
  eas secrets:create MY_API_KEY
  # You'll be prompted to enter the value for MY_API_KEY
  # Optionally, you can specify for which build profiles this secret applies (Android/iOS specific variants are also possible)
  ```

  You can create secrets that are global to your project or specific to build profiles and platforms (though build profile-specific secrets are often managed by using distinct secret names and referencing them in the respective `env` sections of `eas.json`).

- **Listing Secrets:**
  To see the names of secrets you have created for your project (values are not displayed for security):

  ```bash
  eas secrets:list
  ```

- **Deleting a Secret:**
  ```bash
  eas secrets:delete <SECRET_NAME>
  ```

### Accessing Secrets During EAS Build

Once a secret is created (e.g., `MY_API_KEY`), it becomes available as an environment variable (with the same name, `MY_API_KEY`) in the EAS Build environment.

You can then make this build-time environment variable accessible to your application code. A common way is to use the `extra` field in your `app.config.js` (or `app.json`) and access it via `expo-constants`.

**Example using `app.config.js`:**

```javascript
// app.config.js
export default ({ config }) => {
  return {
    ...config, // Preserves existing app.json configurations
    extra: {
      apiKey: process.env.MY_API_KEY, // MY_API_KEY is from EAS Secrets
      anotherSecret: process.env.ANOTHER_SECRET_FROM_EAS,
      eas: {
        projectId: "your-eas-project-id", // Automatically added by EAS CLI
      },
    },
  };
};
```

**In your application code:**

```typescript
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.apiKey;

if (apiKey) {
  console.log("Using API Key:", apiKey);
  // Initialize your service with apiKey
} else {
  console.warn("API Key is not defined in app configuration!");
}
```

> [!IMPORTANT]
> For secrets to be accessible in your client-side JavaScript bundle (i.e., in your React Native code), they must be explicitly exposed through your app configuration like shown above. Environment variables available during the build process are not automatically available in your app's runtime JS unless you make them so. If the secret name in `app.config.js` (or via `extra` in `app.json`) starts with `EXPO_PUBLIC_`, it will be directly embeddable. Otherwise, using `Constants.expoConfig.extra` is the standard way.

Alternatively, you can define environment variables directly in your `eas.json` build profiles using the `env` property. These can also reference EAS Secrets if those secrets are set as environment variables on the build machine.

```json
// In eas.json, under a build profile:
"env": {
  "EXPO_PUBLIC_API_URL": "https://api.production.com", // Directly set
  "THIRD_PARTY_KEY": "${THIRD_PARTY_API_KEY_FROM_EAS_SECRET}" // Using an EAS Secret as a variable
}
```

In the example above, `THIRD_PARTY_API_KEY_FROM_EAS_SECRET` would be a secret you created with `eas secrets:create THIRD_PARTY_API_KEY_FROM_EAS_SECRET`.

### Best Practices for Secret Management

- **Principle of Least Privilege:** Only provide secrets that are absolutely necessary for a given build profile or environment.
- **Do Not Log Secrets:** Be careful not to log secret values in your build logs or application console output.
- **Use Distinct Secrets for Environments:** Use different secret names or values for development, staging, and production environments (e.g., `DEV_API_KEY`, `PROD_API_KEY`). Manage which ones are used via your `eas.json` `env` configurations per profile.
- **Regularly Review Secrets:** Periodically review your stored secrets and remove any that are no longer needed.
- **Rotate Keys:** If a service provider allows or recommends key rotation, follow their guidelines.

### Build Secrets vs. Runtime Secrets

It's important to distinguish between:

- **Build Secrets:** These are secrets (like API keys for a third-party service your app directly talks to) that are embedded into your app binary at build time. EAS Secrets primarily helps with these.
- **Runtime Secrets:** These are secrets that your app might need while it's running, but are too sensitive to embed even in a build (e.g., user session tokens, or API keys for a backend that _your backend_ talks to). These should typically be fetched from a secure backend API you control, not embedded in the client app.

EAS Secrets are for secrets that are safe to be _within_ your app binary but not in your source code repository.

> [!CAUTION]
> Any secret embedded into your app (even via EAS Secrets and build variables) can potentially be extracted by a determined attacker if they decompile your app. For highly sensitive operations or keys that should never touch the client-side, always perform those operations on a secure backend server that your app communicates with.

Securely managing secrets is a fundamental aspect of app development. EAS Secrets provides a robust mechanism for handling build-time secrets within the Expo ecosystem.

> 📚 **Official Documentation:**
>
> - [Expo Docs: Environment variables and secrets](https://docs.expo.dev/guides/environment-variables/)
> - [Expo Docs: Using secrets in builds (EAS Build Variables)](https://docs.expo.dev/build/variables/#secrets-as-environment-variables)
> - [Expo Docs: `eas secrets` command reference](https://docs.expo.dev/eas-cli/secrets-command/)

This concludes Module 16 on EAS Build and Publishing. You should now have a foundational understanding of how to build, update, and manage secrets for your React Native applications using Expo Application Services. Remember to consult the official Expo documentation for the most up-to-date and detailed information as these services evolve.

---

_End of Module 16._
_Refer back to [Module Introduction](./section-00-introduction.md) for the Module Challenge and Summary._
