/**
 * @fileoverview Exercise 7: Animation and Gestures Complete
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  PanResponder,
  Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Medication detail screen with animations and gestures
 * @returns {React.ReactElement} Medication detail component
 */
export default function MedicationDetail() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(120)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Swipe gesture for side effects
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const swipeOpacity = useRef(new Animated.Value(1)).current;
  const nextSwipeOpacity = useRef(new Animated.Value(0)).current;
  const [currentSideEffectIndex, setCurrentSideEffectIndex] = useState(0);
  
  // Medication data
  const medication = {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    schedule: '3 times daily',
    imageUrl: 'https://www.drugs.com/images/pills/nlm/006035601.jpg',
    description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    sideEffects: [
      'Diarrhea',
      'Stomach upset',
      'Headache',
      'Rash',
      'Nausea',
      'Vomiting'
    ],
    instructions: 'Take this medication by mouth with or without food as directed by your doctor, usually every 8 or 12 hours. The dosage is based on your medical condition and response to treatment.'
  };

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Only allow horizontal swiping
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          swipeAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Determine if swipe was left or right
        if (gestureState.dx < -50 && currentSideEffectIndex < medication.sideEffects.length - 1) {
          // Swipe left to next
          Animated.parallel([
            Animated.timing(swipeAnim, {
              toValue: -SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(swipeOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(nextSwipeOpacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            })
          ]).start(() => {
            setCurrentSideEffectIndex(currentSideEffectIndex + 1);
            swipeAnim.setValue(0);
            swipeOpacity.setValue(1);
            nextSwipeOpacity.setValue(0);
          });
        } else if (gestureState.dx > 50 && currentSideEffectIndex > 0) {
          // Swipe right to previous
          Animated.parallel([
            Animated.timing(swipeAnim, {
              toValue: SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(swipeOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(nextSwipeOpacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            })
          ]).start(() => {
            setCurrentSideEffectIndex(currentSideEffectIndex - 1);
            swipeAnim.setValue(0);
            swipeOpacity.setValue(1);
            nextSwipeOpacity.setValue(0);
          });
        } else {
          // Return to original position
          Animated.spring(swipeAnim, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      }
    })
  ).current;

  // Initial animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Toggle expanded state with animation
  const toggleExpanded = () => {
    setExpanded(!expanded);
    Animated.timing(expandAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // height animations can't use native driver
    }).start();
  };

  // Toggle liked state with animation
  const toggleLiked = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Animated header based on scroll position
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  // Animated height for expandable text
  const textHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 200], // Adjust based on your text size
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header, 
          { 
            transform: [{ translateY: headerTranslateY }],
            height: headerHeight,
            opacity: headerOpacity
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.title, 
            { transform: [{ scale: titleScale }] }
          ]}
        >
          {medication.name}
        </Animated.Text>
        <Text style={styles.subtitle}>{medication.dosage} - {medication.schedule}</Text>
      </Animated.View>
      
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Image with fade and scale animation */}
        <Animated.View 
          style={[
            styles.imageContainer, 
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={{ uri: medication.imageUrl }} 
            style={styles.image} 
            resizeMode="contain"
          />
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={toggleLiked}
            >
              <Animated.Text 
                style={[
                  styles.actionButtonText,
                  { transform: [{ scale: heartScale }] }
                ]}
              >
                {liked ? '❤️ Saved' : '🤍 Save'}
              </Animated.Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {
                // Pulse animation for reminder button
                Animated.sequence([
                  Animated.timing(scaleAnim, {
                    toValue: 1.05,
                    duration: 150,
                    useNativeDriver: true,
                  }),
                  Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                  })
                ]).start();
                console.log('Reminder set');
              }}
            >
              <Text style={styles.actionButtonText}>⏰ Reminder</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Description with expandable animation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Animated.View style={{ height: textHeight, overflow: 'hidden' }}>
            <Text style={styles.sectionText}>
              {medication.description}
            </Text>
          </Animated.View>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.readMoreText}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Instructions */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ 
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                }) 
              }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionText}>{medication.instructions}</Text>
        </Animated.View>
        
        {/* Side Effects with swipe gesture */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Side Effects</Text>
          <Text style={styles.swipeInstructionText}>
            Swipe left/right to see more side effects ({currentSideEffectIndex + 1}/{medication.sideEffects.length})
          </Text>
          
          <View style={styles.sideEffectContainer}>
            <Animated.View 
              {...panResponder.panHandlers}
              style={[
                styles.sideEffectCard,
                {
                  transform: [{ translateX: swipeAnim }],
                  opacity: swipeOpacity
                }
              ]}
            >
              <Text style={styles.sideEffectText}>
                • {medication.sideEffects[currentSideEffectIndex]}
              </Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.sideEffectCard,
                styles.nextSideEffectCard,
                {
                  opacity: nextSwipeOpacity,
                  transform: [
                    { 
                      translateX: swipeAnim.interpolate({
                        inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                        outputRange: [0, SCREEN_WIDTH, 0],
                      }) 
                    }
                  ]
                }
              ]}
            >
              <Text style={styles.sideEffectText}>
                • {currentSideEffectIndex < medication.sideEffects.length - 1 
                    ? medication.sideEffects[currentSideEffectIndex + 1]
                    : medication.sideEffects[currentSideEffectIndex - 1]}
              </Text>
            </Animated.View>
          </View>
          
          {/* Pagination dots */}
          <View style={styles.paginationContainer}>
            {medication.sideEffects.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.paginationDot,
                  currentSideEffectIndex === index && styles.activePaginationDot
                ]} 
              />
            ))}
          </View>
        </View>
        
        {/* Action Buttons with press animation */}
        <View style={styles.buttonContainer}>
          <TouchableWithAnimation 
            style={styles.button}
            onPress={() => console.log('Take medication')}
          >
            <Text style={styles.buttonText}>Take Now</Text>
          </TouchableWithAnimation>
          
          <TouchableWithAnimation 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => console.log('Skip dose')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Skip Dose</Text>
          </TouchableWithAnimation>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * TouchableOpacity with scale animation on press
 */
const TouchableWithAnimation = ({ children, style, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View 
        style={[
          style, 
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * App component that demonstrates the MedicationDetail
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDetail />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
    zIndex: 1000,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  readMoreText: {
    color: '#4A90E2',
    marginTop: 8,
    fontWeight: 'bold',
  },
  swipeInstructionText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  sideEffectContainer: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
  },
  sideEffectCard: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    width: '100%',
  },
  nextSideEffectCard: {
    position: 'absolute',
  },
  sideEffectText: {
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#4A90E2',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#4A90E2',
  },
}); 