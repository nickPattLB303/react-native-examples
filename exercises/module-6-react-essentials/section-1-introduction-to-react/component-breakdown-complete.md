# Component Breakdown Exercise - Complete

## Completed Diagram

```mermaid
graph TD
    %% Main App Component
    App[App Container<br/>State: global app state]
    
    %% First Level Components
    Header[Header Component<br/>Props: title, profileIcon]
    Main[Main Content Area]
    Footer[Navigation Footer<br/>Props: activeTab, onTabChange]
    
    %% Header Components
    SearchBar[SearchBar<br/>Props: value, onChange<br/>State: searchTerm]
    FilterButton[FilterButton<br/>Props: onPress, isActive]
    Header --> SearchBar
    Header --> FilterButton
    
    %% Main Content Components
    MedicationLists[Medication Lists Container<br/>State: medications, filter]
    AddButton[Add Medication Button<br/>Props: onPress]
    Main --> MedicationLists
    Main --> AddButton
    
    %% Medication Lists Breakdown
    SectionActive[Section Header<br/>Props: title, count]
    SectionUpcoming[Section Header<br/>Props: title, count]
    MedicationLists --> SectionActive
    MedicationLists --> SectionUpcoming
    
    %% Medication Items - Active
    subgraph ActiveMedications [Active Medications]
        MedItem1[MedicationItem<br/>Props: medication, onStatusChange]
        MedItem2[MedicationItem<br/>Props: medication, onStatusChange]
        MedItem3[MedicationItem<br/>Props: medication, onStatusChange]
    end
    
    %% Medication Items - Upcoming
    subgraph UpcomingMedications [Upcoming Medications]
        MedItem4[MedicationItem<br/>Props: medication, onStatusChange]
        MedItem5[MedicationItem<br/>Props: medication, onStatusChange]
    end
    
    SectionActive --> ActiveMedications
    SectionUpcoming --> UpcomingMedications
    
    %% Medication Item Components
    MedTitle[Medication Title<br/>Props: name]
    MedDetails[Medication Details<br/>Props: dosage, schedule]
    NextDose[Next Dose Info<br/>Props: time, date]
    StatusBadge[Status Badge<br/>Props: status]
    
    MedItem1 --> MedTitle
    MedItem1 --> MedDetails
    MedItem1 --> NextDose
    MedItem1 --> StatusBadge
    
    %% Footer Components
    HomeTab[Home Tab<br/>Props: isActive, onPress]
    MedsTab[Medications Tab<br/>Props: isActive, onPress]
    CalendarTab[Calendar Tab<br/>Props: isActive, onPress]
    SettingsTab[Settings Tab<br/>Props: isActive, onPress]
    
    Footer --> HomeTab
    Footer --> MedsTab
    Footer --> CalendarTab
    Footer --> SettingsTab
    
    %% Application Structure
    App --> Header
    App --> Main
    App --> Footer
    
    %% Style definitions
    classDef container fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef component fill:#e1f5fe,stroke:#01579b,stroke-width:1px;
    classDef reusable fill:#e8f5e9,stroke:#2e7d32,stroke-width:1px,stroke-dasharray: 5 5;
    classDef stateful fill:#fff9c4,stroke:#ffa000,stroke-width:1px;
    classDef presentational fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px;
    
    %% Apply styles
    class App container;
    class Header,Main,Footer component;
    class MedicationLists,SearchBar stateful;
    class MedTitle,MedDetails,NextDose,StatusBadge,SectionActive,SectionUpcoming presentational;
    class MedItem1,MedItem2,MedItem3,MedItem4,MedItem5 reusable;
```

## Component Breakdown Analysis

### 1. Container Components (Manage State)
- **App Container**: Top-level component containing global state and main structure
- **Medication Lists Container**: Manages medications data and filtered views
- **SearchBar**: Manages input state and performs filtering

### 2. Reusable Components
- **MedicationItem**: Used multiple times to display each medication
- **StatusBadge**: Used to display various statuses (TAKEN, PENDING, SKIPPED)
- **SectionHeader**: Used for both Active and Upcoming sections
- **TabItem**: Used in navigation footer for each tab option

### 3. Presentational Components (Props Only)
- **Medication Title/Details/NextDose**: Display medication information
- **FilterButton**: Displays and triggers filters
- **AddButton**: Triggers add medication action

### 4. Prop Flow Analysis

#### Key Props
- **medication**: Object containing all medication data (passed to MedicationItem)
- **status**: String representing medication status (passed to StatusBadge)
- **onStatusChange**: Function to update medication status
- **onTabChange**: Function to navigate between app sections
- **onFilter**: Function to filter medications by category

#### State Management
- App-level state should include:
  - List of all medications
  - Active filter/search terms
  - Current tab selection
- Component-level state includes:
  - Search input value
  - Local UI states (expanded/collapsed sections)

### 5. Custom Hooks Opportunities
- **useMedicationFilter**: Manage filtering logic for medications
- **useMedicationStatus**: Handle status changes and updates
- **useSearchAndFilter**: Combine search and filter functionality

### 6. Performance Considerations
- MedicationItems should be memoized to prevent unnecessary rerenders
- Lists should implement virtualization for large datasets
- Status changes should update only the affected item

### 7. Proposed Component Structure
- Separate stateful container components from presentational components
- Use composition for complex components like MedicationItem
- Extract common UI patterns into reusable components
- Implement context for deeply nested components needing access to global state 