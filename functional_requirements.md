# Functional Requirements (Based on SVG Mockups)

This document outlines the functional requirements derived *only* from the elements visible in the finalized SVG mockups: `pharmacy-dashboard.svg`, `calm_clear_prescriptions.svg`, `alternate_order_detail.svg`, and `account_screen.svg`.

## I. Global / Cross-Cutting Requirements

1.  **Navigation:**
    *   Implement a bottom tab bar with four sections: Home, Prescriptions, Orders, Account.
    *   The active tab in the bottom bar must be visually indicated (e.g., highlighted icon and text).
    *   Tapping a tab icon/label must navigate the user to the corresponding screen.
    *   Implement back navigation functionality (e.g., from Order Detail back to Orders list - *implied*).
2.  **Styling:**
    *   All screens must adhere to the "Calm & Clear" visual style defined in the SVGs (colors, typography, spacing, component styles like cards and buttons).

## II. Home Screen (`pharmacy-dashboard.svg`)

1.  **Header:** Display a static "Welcome!" message.
2.  **Balance:**
    *   Display the user's "Current Balance" label and amount (e.g., "$0.00 Due").
    *   Provide a "Pay Now" button. (Functionality of button press is out of scope based *only* on mockups).
3.  **Feature Navigation:**
    *   Display interactive cards/sections for:
        *   "Prescriptions" (navigates to Prescriptions screen).
        *   "Orders" (navigates to Orders screen - *implied list view*).
        *   "Delivery" (navigates to a Delivery preferences screen - *screen not mocked*).
        *   "Resources" (navigates to a Health Resources screen - *screen not mocked*).
4.  **Reminders:**
    *   Display a "Medication Reminders" section.
    *   List individual reminders, showing the reminder name (e.g., "Morning Medication") and its scheduled time (e.g., "9:00 AM").

## III. Prescriptions Screen (`calm_clear_prescriptions.svg`)

1.  **Header:** Display the title "Prescriptions".
2.  **Search & Filter:**
    *   Provide a text input field for searching prescriptions.
    *   Provide a "Filter" button/icon. (Filtering mechanism details are out of scope).
3.  **Prescription List:**
    *   Display a list of prescriptions, potentially scrollable.
    *   For each prescription, display:
        *   Drug Name and Dosage.
        *   Estimated days supply remaining (with visual status indication - e.g., color-coded text/icon).
        *   Patient identifier (e.g., Name, Year).
        *   Number of refills remaining (with icon).
        *   Contextual alerts/info (e.g., "Price rising", "Save $X with delivery", with icons).
        *   Action buttons specific to the prescription context (e.g., "Find Savings"). (Button action details are out of scope).

## IV. Order Detail Screen (`alternate_order_detail.svg`)

1.  **Header:** Display the title "Orders" and a functional back arrow.
2.  **Order Summary:**
    *   Display the name and dosage of the ordered medication (e.g., "Welchol 40 mg").
    *   Display the order placement date.
    *   Display the order number.
3.  **Status Tracking:**
    *   Display a visual tracker (horizontal in mockup) showing the order stages (Placed, Processing, Shipped, Delivered).
    *   Visually indicate completed stages.
    *   Visually highlight the current stage.
    *   Display a textual summary of the current status (e.g., "Your medication was delivered.").
4.  **Tracking & Shipment:**
    *   Display the tracking number.
    *   Provide a "Track Shipment" button. (Button action details are out of scope).
5.  **Shipping Address:** Display the recipient's shipping address.

## V. Account Screen (`account_screen.svg`)

1.  **Header:** Display the title "Account".
2.  **Profile Summary:**
    *   Display a user avatar or initial.
    *   Display the user's name/identifier.
    *   Display the user's Member ID.
3.  **Account Options:**
    *   Display a list of navigable account management options, each with an icon and label:
        *   Personal Information
        *   Payment Methods
        *   Communication Preferences
        *   Security
        *   Help & Support
    *   Each option should navigate to its respective screen (screens not mocked).
4.  **Logout:** Provide a "Log Out" button. (Button action details are out of scope).