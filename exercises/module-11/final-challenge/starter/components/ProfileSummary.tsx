/**
 * @fileoverview Profile summary component for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserProfile } from '../types';

interface ProfileSummaryProps {
  profile: UserProfile;
}

// BUG: This component has performance issues
const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profile }) => {
  // BUG: Unnecessary states
  const [isExpanded, setIsExpanded] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  
  // BUG: Track render count inefficiently
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  // BUG: Unnecessary timer that keeps running
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`Profile for ${profile.name} has been rendered ${renderCount} times`);
    }, 5000);
    
    // BUG: Missing cleanup
  }, [profile, renderCount]);
  
  // BUG: Creating a new function on every render
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // BUG: Inefficient calculation on every render
  const getAgeCategory = () => {
    if (profile.age < 18) {
      return 'Minor';
    } else if (profile.age < 65) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };
  
  // Calculate age category on every render
  const ageCategory = getAgeCategory();
  
  // BUG: Creating a new function on every render
  const renderEmergencyContacts = () => {
    return profile.emergencyContacts.map(contact => (
      <View key={contact.id} style={styles.contactItem}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactDetail}>{contact.relationship}</Text>
        <Text style={styles.contactDetail}>{contact.phoneNumber}</Text>
      </View>
    ));
  };
  
  // BUG: Expanding and collapsing causes re-renders of the full parent component tree
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.details}>
            {profile.age} years old ({ageCategory}) | {profile.gender} | {profile.bloodType}
          </Text>
        </View>
        
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={styles.expandButton}>
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.renderCount}>Renders: {renderCount}</Text>
      
      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medical Conditions:</Text>
            <View style={styles.chipContainer}>
              {profile.conditions.map((condition, index) => (
                <Text key={index} style={styles.chip}>{condition}</Text>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergies:</Text>
            <View style={styles.chipContainer}>
              {profile.allergies.map((allergy, index) => (
                <Text key={index} style={styles.chip}>{allergy}</Text>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contacts:</Text>
            <View style={styles.contactsContainer}>
              {renderEmergencyContacts()}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  expandButton: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  renderCount: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  expandedContent: {
    marginTop: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 13,
    color: '#333',
  },
  contactsContainer: {
    marginTop: 5,
  },
  contactItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  contactDetail: {
    fontSize: 13,
    color: '#666',
  },
});

export default ProfileSummary; 