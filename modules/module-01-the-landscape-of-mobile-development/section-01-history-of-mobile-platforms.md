## Section 1: A Brief History of Mobile Platforms

Understanding where mobile development came from helps us appreciate the context and challenges that led to solutions like React Native. Let's take a quick journey through the evolution of mobile platforms.

**The Early Days (Pre-Smartphone)**

Before the glossy touchscreens we know today, mobile devices were much simpler.

- **Feature Phones:** These phones primarily focused on calls and SMS. Applications, if available, were often written in Java ME (Micro Edition) or proprietary languages, with very limited capabilities and distribution challenges. Development was fragmented across many different manufacturers and operating systems (like Symbian, early BlackBerry OS).
- **PDAs (Personal Digital Assistants):** Devices like Palm Pilots and Pocket PCs offered more advanced features like calendars, contacts, and basic productivity apps. They had their own operating systems (Palm OS, Windows Mobile) and SDKs, hinting at the potential of mobile computing but lacking widespread consumer adoption and connectivity.

**The Smartphone Revolution**

The launch of the original iPhone in 2007 marked a turning point, ushering in the modern smartphone era dominated by two major players:

- **iOS (Apple):** Introduced a touch-centric UI, the App Store model for application distribution, and a native SDK based on Objective-C (later adding Swift). This created a cohesive ecosystem but was exclusive to Apple hardware.
- **Android (Google):** Launched shortly after iOS, Android offered an open-source alternative, running on a wide variety of hardware from different manufacturers. Its native SDK primarily used Java (later adding Kotlin support). This led to broader reach but also introduced challenges with device fragmentation (different screen sizes, hardware capabilities, OS versions).

> 📲 **(Native Developers - iOS/Android):** You lived through much of this recent history! The core concepts of native SDKs, platform-specific languages (Swift/Objective-C, Kotlin/Java), and distinct UI paradigms defined your development world. This history sets the stage for understanding _why_ businesses sought alternatives to maintaining separate codebases for iOS and Android.

**Key Takeaways from Mobile History**

- **Platform Fragmentation:** The diversity of early operating systems and hardware made reaching a wide audience difficult and expensive.
- **Rise of Dominant Ecosystems:** iOS and Android simplified the landscape but created a fundamental split, requiring separate development efforts for each.
- **App Stores:** Revolutionized software distribution, creating massive opportunities but also introducing platform-specific guidelines and review processes.
- **Native SDKs:** Provided powerful access to device features but demanded specialized skills for each platform.

This historical context highlights the core problem that cross-platform development aims to solve: reducing the complexity and cost associated with targeting multiple mobile operating systems. We'll explore this further in the next section.
