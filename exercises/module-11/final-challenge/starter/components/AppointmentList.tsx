/**
 * @fileoverview Appointment list component for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Appointment } from '../types';

interface AppointmentListProps {
  appointments: Appointment[];
}

// BUG: This component has performance issues
const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  // BUG: Unnecessary state for render counting
  const [renderCount, setRenderCount] = useState(0);
  
  // BUG: Track render count inefficiently
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  // BUG: Creating a new function on every render
  const sortAppointments = () => {
    // BUG: Creates a new array and sorts on every render
    return [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };
  
  // BUG: Calculating this on every render
  const sortedAppointments = sortAppointments();
  
  // BUG: Creating a new function on every render
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointmentDate = new Date(dateString);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const diffTime = appointmentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // BUG: Creating a new function on every render
  const getAppointmentStatusText = (dateString: string) => {
    const daysUntil = getDaysUntil(dateString);
    
    if (daysUntil < 0) {
      return 'Past';
    } else if (daysUntil === 0) {
      return 'Today';
    } else if (daysUntil === 1) {
      return 'Tomorrow';
    } else if (daysUntil <= 7) {
      return `In ${daysUntil} days`;
    } else {
      return `In ${Math.floor(daysUntil / 7)} weeks`;
    }
  };
  
  // BUG: Creating a new function on every render
  const getAppointmentStatusColor = (dateString: string) => {
    const daysUntil = getDaysUntil(dateString);
    
    if (daysUntil < 0) {
      return '#777777'; // Past
    } else if (daysUntil <= 1) {
      return '#e74c3c'; // Today or tomorrow
    } else if (daysUntil <= 7) {
      return '#f39c12'; // Within a week
    } else {
      return '#3498db'; // More than a week away
    }
  };
  
  // BUG: Creating a new function on every render
  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    // BUG: Inefficient calculation on every render
    const statusText = getAppointmentStatusText(item.date);
    const statusColor = getAppointmentStatusColor(item.date);
    
    return (
      <View style={styles.appointmentItem}>
        <View style={styles.appointmentHeader}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
        
        <Text style={styles.specialtyText}>{item.specialty}</Text>
        
        <View style={styles.appointmentDetails}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <Text style={styles.purposeText}>{item.purpose}</Text>
        
        {item.notes && (
          <Text style={styles.notesText}>Notes: {item.notes}</Text>
        )}
        
        <View style={styles.reminderContainer}>
          <Text style={[
            styles.reminderText,
            item.reminderSet ? styles.reminderSet : styles.reminderNotSet
          ]}>
            {item.reminderSet ? 'Reminder Set' : 'No Reminder'}
          </Text>
          
          {/* BUG: Empty handler with no debounce */}
          <TouchableOpacity onPress={() => console.log(`Toggle reminder for ${item.id}`)}>
            <Text style={styles.reminderToggle}>
              {item.reminderSet ? 'Remove' : 'Set Reminder'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Upcoming Appointments: {appointments.length} | Renders: {renderCount}
        </Text>
      </View>
      
      <FlatList
        data={sortedAppointments}
        renderItem={renderAppointmentItem}
        // BUG: Missing key extractor
        contentContainerStyle={styles.listContent}
        // BUG: Missing performance optimizations
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  appointmentItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  specialtyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginLeft: 10,
    textAlign: 'right',
  },
  purposeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reminderSet: {
    color: '#27ae60',
  },
  reminderNotSet: {
    color: '#7f8c8d',
  },
  reminderToggle: {
    fontSize: 14,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});

export default AppointmentList; 