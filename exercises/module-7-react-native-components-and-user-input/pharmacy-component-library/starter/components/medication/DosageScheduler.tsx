/**
 * DosageScheduler Component
 * 
 * A component that allows:
 * - Selecting time of day (morning, afternoon, evening, bedtime)
 * - Selecting frequency (daily, specific days, etc.)
 * - Displaying the next scheduled dose
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

// Define types for the component
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'bedtime';
export type Frequency = 'daily' | 'weekdays' | 'weekends' | 'custom';
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface DosageSchedulerProps {
  onChange: (schedule: DosageSchedule) => void;
  initialSchedule?: Partial<DosageSchedule>;
  style?: ViewStyle;
}

export interface DosageSchedule {
  timesOfDay: TimeOfDay[];
  frequency: Frequency;
  daysOfWeek: DayOfWeek[];
}

/**
 * DosageScheduler allows scheduling medication doses
 */
const DosageScheduler: React.FC<DosageSchedulerProps> = ({
  onChange,
  initialSchedule,
  style,
}) => {
  // Initialize with default schedule or provided initialSchedule
  const [schedule, setSchedule] = useState<DosageSchedule>({
    timesOfDay: initialSchedule?.timesOfDay || ['morning'],
    frequency: initialSchedule?.frequency || 'daily',
    daysOfWeek: initialSchedule?.daysOfWeek || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });

  // TODO: Implement function to toggle a time of day
  const toggleTimeOfDay = (time: TimeOfDay) => {
    // Update the schedule state and call onChange
  };

  // TODO: Implement function to set frequency
  const setFrequency = (newFrequency: Frequency) => {
    // Update the schedule state and call onChange
  };

  // TODO: Implement function to toggle a day of week
  const toggleDayOfWeek = (day: DayOfWeek) => {
    // Update the schedule state and call onChange
  };

  // TODO: Implement function to calculate and display next dose
  const calculateNextDose = (): string => {
    // Logic to determine next scheduled dose based on current time and schedule
    return "Tomorrow morning";
  };

  // TODO: Implement function to render time of day selectors
  const renderTimeOfDaySelectors = () => {
    const times: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'bedtime'];
    
    return (
      <View style={styles.timesContainer}>
        <Text style={styles.sectionTitle}>Time of Day</Text>
        <View style={styles.timeButtons}>
          {times.map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                schedule.timesOfDay.includes(time) && styles.timeButtonSelected
              ]}
              onPress={() => toggleTimeOfDay(time)}
            >
              <Text 
                style={[
                  styles.timeButtonText,
                  schedule.timesOfDay.includes(time) && styles.timeButtonTextSelected
                ]}
              >
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // TODO: Implement function to render frequency selectors
  const renderFrequencySelectors = () => {
    const frequencies: Frequency[] = ['daily', 'weekdays', 'weekends', 'custom'];
    
    return (
      <View style={styles.frequencyContainer}>
        <Text style={styles.sectionTitle}>Frequency</Text>
        <View style={styles.frequencyButtons}>
          {frequencies.map(freq => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.frequencyButton,
                schedule.frequency === freq && styles.frequencyButtonSelected
              ]}
              onPress={() => setFrequency(freq)}
            >
              <Text 
                style={[
                  styles.frequencyButtonText,
                  schedule.frequency === freq && styles.frequencyButtonTextSelected
                ]}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // TODO: Implement function to render days of week selectors (visible when frequency is 'custom')
  const renderDaysOfWeekSelectors = () => {
    if (schedule.frequency !== 'custom') return null;
    
    const days: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <View style={styles.daysContainer}>
        <Text style={styles.sectionTitle}>Days of Week</Text>
        <View style={styles.dayButtons}>
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                schedule.daysOfWeek.includes(day) && styles.dayButtonSelected
              ]}
              onPress={() => toggleDayOfWeek(day)}
            >
              <Text 
                style={[
                  styles.dayButtonText,
                  schedule.daysOfWeek.includes(day) && styles.dayButtonTextSelected
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // TODO: Implement function to render next dose information
  const renderNextDose = () => {
    return (
      <View style={styles.nextDoseContainer}>
        <Text style={styles.nextDoseLabel}>Next Dose:</Text>
        <Text style={styles.nextDoseText}>{calculateNextDose()}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderTimeOfDaySelectors()}
      {renderFrequencySelectors()}
      {renderDaysOfWeekSelectors()}
      {renderNextDose()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  // Times of day styles
  timesContainer: {
    marginBottom: 16,
  },
  timeButtons: {
    // TODO: Style the time buttons container
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeButton: {
    // TODO: Style the time button
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    marginBottom: 8,
  },
  timeButtonSelected: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#555',
  },
  timeButtonTextSelected: {
    color: '#FFFFFF',
  },
  // Frequency styles
  frequencyContainer: {
    marginBottom: 16,
  },
  frequencyButtons: {
    // TODO: Style the frequency buttons container
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  frequencyButton: {
    // TODO: Style the frequency button
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    marginBottom: 8,
  },
  frequencyButtonSelected: {
    backgroundColor: '#007AFF',
  },
  frequencyButtonText: {
    fontSize: 14,
    color: '#555',
  },
  frequencyButtonTextSelected: {
    color: '#FFFFFF',
  },
  // Days of week styles
  daysContainer: {
    marginBottom: 16,
  },
  dayButtons: {
    // TODO: Style the day buttons container
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    // TODO: Style the day button
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#007AFF',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  dayButtonTextSelected: {
    color: '#FFFFFF',
  },
  // Next dose styles
  nextDoseContainer: {
    // TODO: Style the next dose container
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7FF',
    padding: 12,
    borderRadius: 8,
  },
  nextDoseLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  nextDoseText: {
    fontSize: 14,
    color: '#0066CC',
  },
});

export default DosageScheduler; 