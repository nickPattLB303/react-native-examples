/**
 * Profile Screen
 * 
 * This screen displays the user's profile information.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Import data
import user from '../data/user';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user" size={60} color="#ffffff" />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <FontAwesome name="envelope" size={16} color="#4a8577" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <FontAwesome name="phone" size={16} color="#4a8577" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <FontAwesome name="map-marker" size={16} color="#4a8577" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>
              {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <FontAwesome name="calendar" size={16} color="#4a8577" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>{user.dateOfBirth}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>My Prescriptions</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => alert('Add prescription functionality would go here')}
          >
            <FontAwesome name="plus" size={14} color="#4a8577" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {user.prescriptions.map((prescription, index) => (
          <View key={index} style={styles.prescriptionCard}>
            <View style={styles.prescriptionHeader}>
              <Text style={styles.prescriptionName}>{prescription.medicationName}</Text>
              <TouchableOpacity
                onPress={() => alert('View prescription details')}
              >
                <FontAwesome name="eye" size={16} color="#4a8577" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.prescriptionDetails}>
              <Text style={styles.prescriptionDetail}>
                <Text style={styles.detailLabel}>Doctor: </Text>
                {prescription.doctor}
              </Text>
              <Text style={styles.prescriptionDetail}>
                <Text style={styles.detailLabel}>Expires: </Text>
                {prescription.expiryDate}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => alert('Edit profile functionality would go here')}
        >
          <FontAwesome name="pencil" size={16} color="#4a8577" />
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => alert('Change password functionality would go here')}
        >
          <FontAwesome name="lock" size={16} color="#4a8577" />
          <Text style={styles.actionButtonText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]}
          onPress={() => alert('Logout functionality would go here')}
        >
          <FontAwesome name="sign-out" size={16} color="#f44336" />
          <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a8577',
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 12,
    marginBottom: 0,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    color: '#4a8577',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(74, 133, 119, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
  },
  prescriptionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  prescriptionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  prescriptionDetails: {
    marginLeft: 4,
  },
  prescriptionDetail: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  detailLabel: {
    color: '#666666',
  },
  actionSection: {
    backgroundColor: '#ffffff',
    margin: 12,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#4a8577',
    marginLeft: 12,
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutText: {
    color: '#f44336',
  },
}); 