# Exercise: Building a Responsive Medication Dashboard

## Objective
Create a medication dashboard that adapts to different screen sizes and orientations, applying responsive design principles learned in this section.

**Difficulty Level**: Intermediate
**Estimated Time**: 60-90 minutes

## Prerequisites
- Completion of Section 3: Layout with Flexbox
- Completion of Section 4: Advanced UI Components
- Basic understanding of React Native's `Dimensions` API

## Exercise Description

In this exercise, you'll build a responsive dashboard for a medication tracking application. The dashboard should display differently based on:
- Screen size (phone vs tablet)
- Orientation (portrait vs landscape)
- Different UI components for different screen sizes

You'll need to implement responsive layouts, typography scaling, and conditional rendering based on device characteristics.

## Requirements

### 1. Responsive Layout
- Create a dashboard that adjusts its layout based on screen size and orientation
- For phones in portrait mode: Display a single column list of medications
- For phones in landscape mode: Display a two-column grid of medications
- For tablets: Display a sidebar with categories and a main area with medications

### 2. Responsive Typography
- Implement a scaling function for font sizes based on screen width
- Apply appropriate font sizes for different device categories

### 3. Adaptive Components
- Create different versions of your medication card component for different screen sizes:
  - **Small**: Simple list item with basic info
  - **Medium**: Card with more details
  - **Large**: Expanded card with all details and interactive elements

### 4. Orientation Handling
- Listen for orientation changes and update the layout accordingly
- Save and restore scroll position when orientation changes
- Optimize UI elements for both portrait and landscape modes

### 5. Safe Area Handling
- Properly handle safe areas for notched devices

## Setup Instructions

1. Create a new React Native project or use Expo Snack for this exercise
2. Set up the basic structure of your application with the following components:
   - `App.js`: Main component that handles orientation changes
   - `Dashboard.js`: Component that renders different layouts based on screen size
   - `MedicationCard.js`: Component with different variants for different screen sizes
   - `CategorySidebar.js`: Sidebar component for tablet layouts

## Implementation Steps

### Step 1: Set Up Responsive Utilities

Create a `responsive.js` utility file that includes:

```jsx
// utils/responsive.js
import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get screen dimensions
export const getScreenDimensions = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

// Determine if device is in landscape mode
export const isLandscape = () => {
  const { width, height } = getScreenDimensions();
  return width > height;
};

// Determine if device is a tablet
export const isTablet = () => {
  const { width, height } = getScreenDimensions();
  return (width > 768) || (height > 768);
};

// Scale font size based on screen width
export const scaleFontSize = (size) => {
  const { width } = getScreenDimensions();
  const scale = width / 375; // Based on iPhone X width
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
```

### Step 2: Create the Dashboard Layout

The Dashboard component should adapt to different screen sizes. Here's a starting point:

```jsx
// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { isTablet, isLandscape } from '../utils/responsive';
import MedicationList from './MedicationList';
import MedicationGrid from './MedicationGrid';
import CategorySidebar from './CategorySidebar';

const Dashboard = ({ medications, categories }) => {
  // Keep track of screen dimensions
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    
    return () => subscription?.remove();
  }, []);
  
  // Check if current layout is tablet
  const tablet = isTablet();
  
  // Check if current orientation is landscape
  const landscape = isLandscape();
  
  // Render the appropriate layout
  return (
    <View style={styles.container}>
      {tablet ? (
        <View style={styles.tabletLayout}>
          <CategorySidebar 
            categories={categories} 
            style={styles.sidebar} 
          />
          <View style={styles.content}>
            <MedicationGrid medications={medications} />
          </View>
        </View>
      ) : landscape ? (
        <MedicationGrid 
          medications={medications} 
          numColumns={2} 
        />
      ) : (
        <MedicationList medications={medications} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabletLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default Dashboard;
```

### Step 3: Implement the MedicationCard Component

Create a responsive card component that adapts to different screen sizes:

```jsx
// components/MedicationCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { isTablet, scaleFontSize } from '../utils/responsive';

const MedicationCard = ({ medication, size = 'medium' }) => {
  // Determine which variant to render based on size prop
  switch (size) {
    case 'small':
      return (
        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>{medication.name}</Text>
          <Text style={styles.smallDosage}>{medication.dosage}</Text>
        </View>
      );
      
    case 'large':
      return (
        <View style={styles.largeCard}>
          <View style={styles.largeHeader}>
            <Image source={{ uri: medication.image }} style={styles.largeImage} />
            <View style={styles.largeHeaderText}>
              <Text style={styles.largeTitle}>{medication.name}</Text>
              <Text style={styles.largeDosage}>{medication.dosage}</Text>
            </View>
          </View>
          <View style={styles.largeBody}>
            <Text style={styles.largeDescription}>{medication.description}</Text>
            <View style={styles.largeFooter}>
              <Text style={styles.largeSchedule}>{medication.schedule}</Text>
              <Text style={styles.largeRefills}>Refills: {medication.refills}</Text>
            </View>
          </View>
        </View>
      );
      
    case 'medium':
    default:
      return (
        <View style={styles.mediumCard}>
          <View style={styles.mediumHeader}>
            <Image source={{ uri: medication.image }} style={styles.mediumImage} />
            <View>
              <Text style={styles.mediumTitle}>{medication.name}</Text>
              <Text style={styles.mediumDosage}>{medication.dosage}</Text>
            </View>
          </View>
          <Text style={styles.mediumSchedule}>{medication.schedule}</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  // Small card styles
  smallCard: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  smallTitle: {
    fontSize: scaleFontSize(16),
    fontWeight: 'bold',
  },
  smallDosage: {
    fontSize: scaleFontSize(14),
    color: '#666',
  },
  
  // Medium card styles
  mediumCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mediumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mediumImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  mediumTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mediumDosage: {
    fontSize: scaleFontSize(16),
    color: '#666',
  },
  mediumSchedule: {
    fontSize: scaleFontSize(14),
    color: '#444',
  },
  
  // Large card styles
  largeCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  largeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  largeImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  largeHeaderText: {
    flex: 1,
  },
  largeTitle: {
    fontSize: scaleFontSize(22),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  largeDosage: {
    fontSize: scaleFontSize(18),
    color: '#666',
    marginBottom: 4,
  },
  largeBody: {
    marginTop: 8,
  },
  largeDescription: {
    fontSize: scaleFontSize(16),
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  largeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  largeSchedule: {
    fontSize: scaleFontSize(15),
    color: '#444',
  },
  largeRefills: {
    fontSize: scaleFontSize(15),
    color: '#444',
  },
});

export default MedicationCard;
```

### Step 4: Create List and Grid Components

Now create components to display medications in both list and grid formats:

```jsx
// components/MedicationList.js
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MedicationCard from './MedicationCard';

const MedicationList = ({ medications }) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MedicationCard 
          medication={item} 
          size="medium" 
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});

export default MedicationList;
```

```jsx
// components/MedicationGrid.js
import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import MedicationCard from './MedicationCard';

const MedicationGrid = ({ medications, numColumns = 2 }) => {
  // Calculate item width based on number of columns
  const screenWidth = Dimensions.get('window').width;
  const padding = 16;
  const spacing = 8;
  const availableWidth = screenWidth - (padding * 2) - (spacing * (numColumns - 1));
  const itemWidth = availableWidth / numColumns;
  
  // Render grid item with appropriate width
  const renderItem = ({ item }) => {
    return (
      <MedicationCard
        medication={item}
        size="large"
        style={{ width: itemWidth, margin: spacing / 2 }}
      />
    );
  };
  
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      key={numColumns} // Force re-render when columns change
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 16,
  },
});

export default MedicationGrid;
```

### Step 5: Create the CategorySidebar Component for Tablets

```jsx
// components/CategorySidebar.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleFontSize } from '../utils/responsive';

const CategorySidebar = ({ categories, onCategorySelect, selectedCategory, style }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => onCategorySelect(item.id)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.sidebar, style]}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: scaleFontSize(20),
    fontWeight: 'bold',
    marginBottom: 24,
    marginLeft: 8,
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#e6f7ff',
  },
  categoryText: {
    fontSize: scaleFontSize(16),
    color: '#333',
  },
  selectedCategoryText: {
    color: '#0066cc',
    fontWeight: '600',
  },
});

export default CategorySidebar;
```

### Step 6: Create the Main App Component

```jsx
// App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Dashboard from './components/Dashboard';

// Sample data
const MEDICATIONS = [
  {
    id: 1,
    name: 'Amoxicillin',
    dosage: '500mg',
    schedule: 'Every 8 hours',
    image: 'https://example.com/medications/amoxicillin.jpg',
    description: 'Antibiotic used to treat bacterial infections.',
    refills: 3,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily',
    image: 'https://example.com/medications/lisinopril.jpg',
    description: 'Used to treat high blood pressure and heart failure.',
    refills: 5,
    categoryId: 2,
  },
  // Add more medications as needed
];

const CATEGORIES = [
  { id: 1, name: 'Antibiotics' },
  { id: 2, name: 'Blood Pressure' },
  { id: 3, name: 'Pain Relief' },
  { id: 4, name: 'Allergies' },
  { id: 5, name: 'Sleep Aids' },
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Filter medications by selected category
  const filteredMedications = selectedCategory
    ? MEDICATIONS.filter(med => med.categoryId === selectedCategory)
    : MEDICATIONS;
  
  return (
    <SafeAreaView style={styles.container}>
      <Dashboard
        medications={filteredMedications}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
```

## Testing

To thoroughly test your responsive design:

1. Use the Expo app on different physical devices if possible
2. Test in both portrait and landscape orientations
3. If using an emulator, try different device configurations:
   - iPhone SE (small phone)
   - iPhone 13 Pro Max (large phone)
   - iPad (tablet)
4. Use Chrome DevTools to simulate different screen sizes if testing in a web environment

## Bonus Challenges

If you finish early or want to enhance your implementation:

1. **Theme Support**: Add a theme system with dark/light mode that responds to system preferences
2. **Advanced Animations**: Add animations when transitioning between layouts
3. **Dynamic Type**: Support dynamic type scaling based on the user's device settings
4. **Voice Over/Accessibility**: Make sure your responsive layouts work well with screen readers
5. **Physical Button Handling**: Add handling for hardware buttons (volume, back) that adapts based on layout

## Submission Guidelines

Submit your completed exercise with:

1. Screenshots of your app running on different sized devices
2. Screenshots of both portrait and landscape orientations
3. A brief explanation of your responsive design approach
4. Any challenges you faced and how you overcame them

## Helpful Resources

- [React Native Dimensions API](https://reactnative.dev/docs/dimensions)
- [React Native SafeAreaView](https://reactnative.dev/docs/safeareaview)
- [React Native PixelRatio](https://reactnative.dev/docs/pixelratio)
- [Responsive UI in React Native](https://reactnative.dev/docs/next/responsive-ui) 