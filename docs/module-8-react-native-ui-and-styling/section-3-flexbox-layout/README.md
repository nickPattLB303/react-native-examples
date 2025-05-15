# Section 3: Flexbox Layout in React Native

## Learning Objectives
After completing this section, you will be able to:
- Understand how Flexbox layout works in React Native
- Apply Flexbox properties to create responsive layouts
- Use flex direction, justification, and alignment effectively
- Create complex layouts using nested Flex containers
- Implement common UI patterns with Flexbox
- Apply Flexbox with both StyleSheet API and styled-components

**Prerequisite Knowledge**: Styling Fundamentals in React Native (Section 1)
**Estimated Time**: 60-75 minutes

## Introduction to Flexbox in React Native

Flexbox is the primary layout system in React Native. It provides a consistent way to arrange components and create responsive layouts across different screen sizes. While React Native's Flexbox implementation is similar to CSS Flexbox on the web, there are some important differences to be aware of.

> 💡 **Key Insight**: In React Native, Flexbox is the default layout system, unlike the web where you need to explicitly set `display: flex`. All View components in React Native use Flexbox by default.

## Flexbox Basics

### Flex Direction

The `flexDirection` property determines the primary axis of the layout. It can be:

- `row` (default on web): Items are placed from left to right
- `column` (default in React Native): Items are placed from top to bottom
- `row-reverse`: Items are placed from right to left
- `column-reverse`: Items are placed from bottom to top

```jsx
import { StyleSheet, View, Text } from 'react-native';

function FlexDirectionExample() {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Row</Text>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
      
      <View style={styles.columnContainer}>
        <Text style={styles.label}>Column</Text>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    width: 50,
    height: 50,
    margin: 5,
  },
  box1: { backgroundColor: '#ff7979' },
  box2: { backgroundColor: '#7ed6df' },
  box3: { backgroundColor: '#badc58' },
});
```

### Justify Content

The `justifyContent` property aligns items along the primary axis. Options include:

- `flex-start` (default): Items are packed toward the start of the flex direction
- `flex-end`: Items are packed toward the end of the flex direction
- `center`: Items are centered along the line
- `space-between`: Items are evenly distributed; first item at the start, last item at the end
- `space-around`: Items are evenly distributed with equal space around them
- `space-evenly`: Items are evenly distributed with equal space around them, including the edges

```jsx
import { StyleSheet, View, Text } from 'react-native';

function JustifyContentExample() {
  return (
    <View style={styles.container}>
      <View style={[styles.layout, { justifyContent: 'flex-start' }]}>
        <Text style={styles.label}>flex-start</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <View style={[styles.layout, { justifyContent: 'center' }]}>
        <Text style={styles.label}>center</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <View style={[styles.layout, { justifyContent: 'flex-end' }]}>
        <Text style={styles.label}>flex-end</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <View style={[styles.layout, { justifyContent: 'space-between' }]}>
        <Text style={styles.label}>space-between</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <View style={[styles.layout, { justifyContent: 'space-around' }]}>
        <Text style={styles.label}>space-around</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <View style={[styles.layout, { justifyContent: 'space-evenly' }]}>
        <Text style={styles.label}>space-evenly</Text>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  layout: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: '#7ed6df',
    borderRadius: 4,
  },
});
```

### Align Items

The `alignItems` property aligns items along the cross axis. Options include:

- `stretch` (default): Items are stretched to fit the container
- `flex-start`: Items are placed at the start of the cross axis
- `flex-end`: Items are placed at the end of the cross axis
- `center`: Items are centered along the cross axis
- `baseline`: Items are aligned such that their baselines align

```jsx
import { StyleSheet, View, Text } from 'react-native';

function AlignItemsExample() {
  return (
    <View style={styles.container}>
      <View style={[styles.layout, { alignItems: 'flex-start' }]}>
        <Text style={styles.label}>flex-start</Text>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
      
      <View style={[styles.layout, { alignItems: 'center' }]}>
        <Text style={styles.label}>center</Text>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
      
      <View style={[styles.layout, { alignItems: 'flex-end' }]}>
        <Text style={styles.label}>flex-end</Text>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
      
      <View style={[styles.layout, { alignItems: 'stretch' }]}>
        <Text style={styles.label}>stretch</Text>
        <View style={[styles.stretchBox, styles.box1]} />
        <View style={[styles.stretchBox, styles.box2]} />
        <View style={[styles.stretchBox, styles.box3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  layout: {
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  box: {
    width: 50,
    margin: 5,
  },
  stretchBox: {
    width: 50,
    margin: 5,
    height: undefined, // Required for stretch to work
  },
  box1: { 
    backgroundColor: '#ff7979',
    height: 30,
  },
  box2: { 
    backgroundColor: '#7ed6df',
    height: 50,
  },
  box3: { 
    backgroundColor: '#badc58',
    height: 70,
  },
});
```

### Align Self

The `alignSelf` property allows individual items to override the `alignItems` of their container:

- `auto` (default): Inherits the parent's alignItems value
- `flex-start`: Item is placed at the start of the cross axis
- `flex-end`: Item is placed at the end of the cross axis
- `center`: Item is centered along the cross axis
- `stretch`: Item is stretched to fit the container
- `baseline`: Item is aligned such that its baseline aligns with other items' baselines

```jsx
import { StyleSheet, View, Text } from 'react-native';

function AlignSelfExample() {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.label}>alignSelf</Text>
        <View style={[styles.box, { alignSelf: 'flex-start' }]}>
          <Text style={styles.boxText}>start</Text>
        </View>
        <View style={[styles.box, { alignSelf: 'center' }]}>
          <Text style={styles.boxText}>center</Text>
        </View>
        <View style={[styles.box, { alignSelf: 'flex-end' }]}>
          <Text style={styles.boxText}>end</Text>
        </View>
        <View style={[styles.box, { alignSelf: 'stretch', height: undefined }]}>
          <Text style={styles.boxText}>stretch</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  layout: {
    flexDirection: 'row',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  box: {
    width: 70,
    height: 70,
    backgroundColor: '#7ed6df',
    borderRadius: 4,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
```

### Flex Property

The `flex` property specifies how items grow or shrink to fill the available space:

- `flex: 0` (default): Item does not grow or shrink
- `flex: 1`: Item can grow and shrink as needed
- `flex: 2`, `flex: 3`, etc.: Item grows proportionally to other items

```jsx
import { StyleSheet, View, Text } from 'react-native';

function FlexExample() {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.label}>flex property</Text>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={styles.boxText}>flex: 1</Text>
        </View>
        <View style={[styles.box, { flex: 2 }]}>
          <Text style={styles.boxText}>flex: 2</Text>
        </View>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={styles.boxText}>flex: 1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  layout: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  box: {
    height: 70,
    backgroundColor: '#7ed6df',
    borderRadius: 4,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
```

### Flex Wrap

The `flexWrap` property controls whether items wrap to the next line when there isn't enough space:

- `nowrap` (default): Items are forced into a single line
- `wrap`: Items wrap to additional lines if needed
- `wrap-reverse`: Items wrap to additional lines in reverse order

```jsx
import { StyleSheet, View, Text } from 'react-native';

function FlexWrapExample() {
  return (
    <View style={styles.container}>
      <View style={[styles.layout, { flexWrap: 'nowrap' }]}>
        <Text style={styles.label}>nowrap</Text>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.box} />
        ))}
      </View>
      
      <View style={[styles.layout, { flexWrap: 'wrap' }]}>
        <Text style={styles.label}>wrap</Text>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.box} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  layout: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: '#7ed6df',
    borderRadius: 4,
    margin: 5,
  },
});
```

## Flexbox with Styled Components

Styled Components provides a more CSS-like syntax for applying Flexbox layouts in React Native. Here's how you can use Flexbox with styled-components:

```jsx
import React from 'react';
import styled from 'styled-components/native';

// Create styled components with Flexbox properties
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  margin-bottom: 15px;
  padding: 10px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  margin-bottom: 15px;
  padding: 10px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
`;

const Box = styled.View`
  width: ${props => props.width || '50px'};
  height: ${props => props.height || '50px'};
  background-color: ${props => props.color || '#7ed6df'};
  border-radius: 4px;
  margin: 5px;
  ${props => props.flex && `flex: ${props.flex}`};
  ${props => props.alignSelf && `align-self: ${props.alignSelf}`};
`;

const Label = styled.Text`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding-horizontal: 5px;
  font-size: 12px;
  color: #666;
`;

const BoxText = styled.Text`
  color: white;
  font-weight: bold;
`;

// Example component using styled-components with Flexbox
function FlexboxWithStyledComponents() {
  return (
    <Container>
      {/* Justify Content Example */}
      <Row justify="space-between">
        <Label>space-between</Label>
        <Box />
        <Box />
        <Box />
      </Row>
      
      <Row justify="center">
        <Label>center</Label>
        <Box />
        <Box />
        <Box />
      </Row>
      
      {/* Align Items Example */}
      <Row align="flex-start" style={{ height: 100 }}>
        <Label>align: flex-start</Label>
        <Box height="30px" />
        <Box height="50px" />
        <Box height="70px" />
      </Row>
      
      {/* Flex Property Example */}
      <Row>
        <Label>flex property</Label>
        <Box flex={1}>
          <BoxText>flex: 1</BoxText>
        </Box>
        <Box flex={2} color="#ff7979">
          <BoxText>flex: 2</BoxText>
        </Box>
        <Box flex={1} color="#badc58">
          <BoxText>flex: 1</BoxText>
        </Box>
      </Row>
      
      {/* Align Self Example */}
      <Row style={{ height: 150 }}>
        <Label>alignSelf</Label>
        <Box alignSelf="flex-start">
          <BoxText>start</BoxText>
        </Box>
        <Box alignSelf="center">
          <BoxText>center</BoxText>
        </Box>
        <Box alignSelf="flex-end">
          <BoxText>end</BoxText>
        </Box>
        <Box alignSelf="stretch" height="auto">
          <BoxText>stretch</BoxText>
        </Box>
      </Row>
    </Container>
  );
}

export default FlexboxWithStyledComponents;
```

### Benefits of Using Styled Components with Flexbox

1. **CSS-like syntax**: More intuitive for developers familiar with CSS
2. **Props-based styling**: Easily create dynamic layouts based on props
3. **Component reusability**: Create reusable layout components
4. **Cleaner component structure**: Styles are co-located with components
5. **Theming support**: Easily integrate with theme context

## Common UI Patterns with Flexbox

### 1. Card Layout

```jsx
import { StyleSheet, View, Text, Image } from 'react-native';

function MedicationCard() {
  return (
    <View style={styles.card}>
      <Image
        source={require('./assets/pill-icon.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Medication Name</Text>
        <Text style={styles.subtitle}>10mg - Once daily</Text>
        <Text style={styles.description}>
          Take with food. Avoid grapefruit juice.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
});
```

### 2. Header with Navigation

```jsx
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Medications</Text>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 24,
    color: 'white',
  },
});
```

### 3. Form Layout

```jsx
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

function LoginForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### 4. Grid Layout

```jsx
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2; // 40 = padding and margin

function MedicationGrid() {
  const medications = [
    { id: '1', name: 'Aspirin', dosage: '100mg' },
    { id: '2', name: 'Ibuprofen', dosage: '200mg' },
    { id: '3', name: 'Paracetamol', dosage: '500mg' },
    { id: '4', name: 'Amoxicillin', dosage: '250mg' },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {medications.map(med => (
          <View key={med.id} style={styles.item}>
            <Text style={styles.itemName}>{med.name}</Text>
            <Text style={styles.itemDosage}>{med.dosage}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: itemWidth,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

### 5. Absolute Positioning with Flexbox

```jsx
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function FloatingActionButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Main Content</Text>
      
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});
```

## Common Flexbox Patterns with Styled Components

Here are the same UI patterns implemented using styled-components:

### 1. Card Layout with Styled Components

```jsx
import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  margin-vertical: 8px;
`;

const CardImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 15px;
`;

const CardContent = styled.View`
  flex: 1;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 12px;
  color: #888;
`;

function MedicationCard() {
  return (
    <Card>
      <CardImage source={require('./assets/pill-icon.png')} />
      <CardContent>
        <Title>Medication Name</Title>
        <Subtitle>10mg - Once daily</Subtitle>
        <Description>Take with food. Avoid grapefruit juice.</Description>
      </CardContent>
    </Card>
  );
}

export default MedicationCard;
```

### 2. Header with Navigation using Styled Components
