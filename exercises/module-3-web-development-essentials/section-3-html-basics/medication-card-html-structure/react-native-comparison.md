# HTML to React Native Comparison Guide

This guide shows how the HTML structure of the medication card would translate to React Native components. Understanding these parallels helps bridge the gap between web and mobile development.

## Basic Structure Comparison

| HTML Element | React Native Equivalent | Notes |
|--------------|-------------------------|-------|
| `<div>`, `<article>`, `<section>` | `<View>` | General container components |
| `<p>`, `<h1>` to `<h6>`, `<span>` | `<Text>` | All text must be inside Text components |
| `<img>` | `<Image>` | Requires width and height props |
| `<ul>`, `<ol>` | `<FlatList>` or `<ScrollView>` with mapped items | No direct equivalent |
| `<li>` | Custom component or `<View>` with `<Text>` | No direct equivalent |
| `<a>` | `<TouchableOpacity>` with `Linking` API | For external links |
| `<button>` | `<Button>` or `<TouchableOpacity>` | TouchableOpacity is more customizable |
| `<input>` | `<TextInput>` | For text entry |
| `<form>` | Component composition | No direct equivalent |

## Complete Medication Card Example

Here's how the medication card HTML structure would translate to React Native:

```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, FlatList } from 'react-native';

// A collapsible component to replace HTML's details/summary
const Collapsible = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View style={styles.collapsible}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.collapsibleHeader}>
          <Text style={styles.collapsibleTitle}>{title}</Text>
          <Text>{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      {expanded && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};

// Description list item component to replace HTML's dt/dd
const DescriptionItem = ({ term, description }) => (
  <View style={styles.descriptionItem}>
    <Text style={styles.term}>{term}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

// Main medication card component
const MedicationCard = () => {
  // Data for the medication
  const sideEffects = [
    'Dry cough',
    'Dizziness or lightheadedness',
    'High potassium levels',
    'Headache'
  ];
  
  const administrationSteps = [
    'Take 1 tablet once daily in the morning',
    'Take with or without food',
    'Take at the same time each day'
  ];
  
  return (
    <View style={styles.card}>
      {/* Header - equivalent to <header> */}
      <View style={styles.header}>
        <Text style={styles.medicationName}>Lisinopril</Text>
        <Text style={styles.genericName}>Generic for: Prinivil, Zestril</Text>
      </View>
      
      {/* Main content - equivalent to <main> */}
      <View style={styles.mainContent}>
        {/* Dosage section - equivalent to <section class="dosage-info"> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dosage Information</Text>
          <View style={styles.descriptionList}>
            <DescriptionItem term="Strength:" description="10mg" />
            <DescriptionItem term="Form:" description="Tablet" />
            <DescriptionItem term="Route:" description="Oral" />
          </View>
        </View>
        
        {/* Schedule section - equivalent to <section class="schedule-info"> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administration Schedule</Text>
          {/* List - equivalent to <ul> */}
          <FlatList
            data={administrationSteps}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>• {item}</Text>
              </View>
            )}
          />
        </View>
        
        {/* Warnings section - equivalent to <section class="warnings"> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Warnings</Text>
          <Text style={styles.warningText}>
            <Text style={styles.bold}>Do not stop taking without consulting your doctor.</Text>
          </Text>
          <Text style={styles.warningText}>
            May cause dizziness. Monitor blood pressure regularly.
          </Text>
          
          {/* Collapsible - equivalent to <details>/<summary> */}
          <Collapsible title="Possible Side Effects">
            <FlatList
              data={sideEffects}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text>• {item}</Text>
                </View>
              )}
            />
          </Collapsible>
        </View>
        
        {/* Refill section - equivalent to <section class="refill-info"> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refill Information</Text>
          <Text>Prescription #: <Text style={styles.highlight}>RX29501-3</Text></Text>
          <Text>Refills Remaining: <Text style={styles.highlight}>3</Text></Text>
          <Text>Next Refill Date: <Text style={styles.highlight}>04/15/2025</Text></Text>
        </View>
      </View>
      
      {/* Footer - equivalent to <footer> */}
      <View style={styles.footer}>
        <Text style={styles.sectionTitle}>Prescribing Doctor</Text>
        <Text>Dr. Sarah Johnson</Text>
        <View style={styles.address}>
          <Text>Internal Medicine Associates</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+15555551234')}>
            <Text style={styles.link}>Phone: (555) 555-1234</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles - equivalent to CSS classes
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 16,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  genericName: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  mainContent: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descriptionList: {
    marginVertical: 8,
  },
  descriptionItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  term: {
    fontWeight: 'bold',
    marginRight: 8,
    minWidth: 80,
  },
  description: {
    flex: 1,
  },
  listItem: {
    marginBottom: 4,
    paddingLeft: 8,
  },
  warningText: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  collapsible: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginVertical: 8,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  collapsibleTitle: {
    fontWeight: 'bold',
  },
  collapsibleContent: {
    padding: 12,
    backgroundColor: '#fff',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  address: {
    marginTop: 8,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default MedicationCard;
```

## Key Differences Between HTML and React Native

### 1. Text Components

In HTML, text can be placed directly inside any element:
```html
<div>This is text</div>
```

In React Native, all text must be inside a `<Text>` component:
```jsx
<View>
  <Text>This is text</Text>
</View>
```

### 2. Styling Approach

HTML uses CSS with class and ID selectors:
```html
<div class="card">
  <h2 class="title">Medication</h2>
</div>
```

React Native uses StyleSheet objects with direct references:
```jsx
<View style={styles.card}>
  <Text style={styles.title}>Medication</Text>
</View>

const styles = StyleSheet.create({
  card: { /* styles */ },
  title: { /* styles */ }
});
```

### 3. List Rendering

HTML has semantic list elements:
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

React Native uses component composition or FlatList:
```jsx
<FlatList
  data={['Item 1', 'Item 2']}
  renderItem={({ item }) => <Text>{item}</Text>}
  keyExtractor={(item, index) => index.toString()}
/>
```

### 4. Event Handling

HTML uses attributes like `onclick`:
```html
<button onclick="handleClick()">Click me</button>
```

React Native uses props:
```jsx
<TouchableOpacity onPress={handlePress}>
  <Text>Click me</Text>
</TouchableOpacity>
```

### 5. Form Elements

HTML has various input types:
```html
<input type="text" placeholder="Enter name">
<select>
  <option>Option 1</option>
</select>
```

React Native has specialized components:
```jsx
<TextInput placeholder="Enter name" />
<Picker>
  <Picker.Item label="Option 1" value="option1" />
</Picker>
```

## Conclusion

While the structure and organization principles are similar between HTML and React Native, the implementation details differ significantly. Understanding these differences helps in translating web development knowledge to mobile app development with React Native.
