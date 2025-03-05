/**
 * @fileoverview Exercise 6: Custom UI Components Complete
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  AccessibilityProps
} from 'react-native';

// Types for our components
interface ButtonProps extends AccessibilityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface CardProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardHeaderProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

interface CardSubtitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

interface MedicationImageProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

interface InfoRowProps {
  label: string;
  value: string;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  style?: ViewStyle;
}

interface MedicationCardProps {
  medication: {
    id: string;
    name: string;
    dosage: string;
    nextDose: string;
    remaining: number;
    refills: number;
    imageUrl: string;
  };
  onTakeNow?: () => void;
  onViewDetails?: () => void;
  style?: ViewStyle;
}

/**
 * Button component with primary and secondary variants
 */
const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle,
  ...accessibilityProps
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style
      ]} 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      {...accessibilityProps}
    >
      <Text 
        style={[
          styles.buttonText, 
          variant === 'secondary' && styles.secondaryButtonText,
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Card component for consistent styling
 */
const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

/**
 * Card header component
 */
const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

/**
 * Card content component
 */
const CardContent: React.FC<CardContentProps> = ({ children, style }) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

/**
 * Card footer component
 */
const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

/**
 * Card title component
 */
const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

/**
 * Card subtitle component
 */
const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, style }) => {
  return (
    <Text style={[styles.subtitle, style]}>
      {children}
    </Text>
  );
};

/**
 * Medication image component
 */
const MedicationImage: React.FC<MedicationImageProps> = ({ source, style, containerStyle }) => {
  return (
    <View style={[styles.imageContainer, containerStyle]}>
      <Image 
        source={source} 
        style={[styles.image, style]} 
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Medication image"
      />
    </View>
  );
};

/**
 * Info row component for displaying label-value pairs
 */
const InfoRow: React.FC<InfoRowProps> = ({ label, value, labelStyle, valueStyle, style }) => {
  return (
    <View style={[styles.infoRow, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
};

/**
 * Composable medication card component
 */
const MedicationCard: React.FC<MedicationCardProps> = ({ 
  medication, 
  onTakeNow = () => console.log('Take medication'), 
  onViewDetails = () => console.log('View details'),
  style
}) => {
  return (
    <Card style={style}>
      <CardHeader>
        <CardTitle>{medication.name}</CardTitle>
        <CardSubtitle>{medication.dosage}</CardSubtitle>
      </CardHeader>
      
      <CardContent>
        <MedicationImage source={{ uri: medication.imageUrl }} />
        
        <View style={styles.details}>
          <InfoRow 
            label="Next Dose:" 
            value={medication.nextDose} 
          />
          
          <InfoRow 
            label="Remaining:" 
            value={`${medication.remaining} tablets`} 
          />
          
          <InfoRow 
            label="Refills:" 
            value={`${medication.refills} remaining`} 
          />
        </View>
      </CardContent>
      
      <CardFooter>
        <Button 
          title="Take Now" 
          onPress={onTakeNow} 
          style={{ marginRight: 8 }}
          accessibilityHint="Mark this medication as taken"
        />
        
        <Button 
          title="Details" 
          variant="secondary" 
          onPress={onViewDetails}
          style={{ marginLeft: 8 }}
          accessibilityHint="View medication details"
        />
      </CardFooter>
    </Card>
  );
};

/**
 * App component that demonstrates the MedicationCard
 * @returns {React.ReactElement} App component
 */
export function App() {
  const medications = [
    {
      id: '1',
      name: 'Amoxicillin',
      dosage: '500mg',
      nextDose: '4:00 PM',
      remaining: 12,
      refills: 2,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/006035601.jpg',
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      nextDose: '9:00 AM Tomorrow',
      remaining: 45,
      refills: 5,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/167140101.jpg',
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '1000mg',
      nextDose: '9:00 PM',
      remaining: 28,
      refills: 3,
      imageUrl: 'https://www.drugs.com/images/pills/nlm/007815101.jpg',
    },
  ];

  // Example of how to handle medication actions
  const handleTakeMedication = (id: string) => {
    console.log(`Taking medication ${id}`);
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for medication ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle} accessibilityRole="header">My Medications</Text>
      <ScrollView>
        {medications.map(medication => (
          <MedicationCard 
            key={medication.id} 
            medication={medication} 
            onTakeNow={() => handleTakeMedication(medication.id)}
            onViewDetails={() => handleViewDetails(medication.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// Export the MedicationCard component as default
export default MedicationCard;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4A90E2',
  },
}); 