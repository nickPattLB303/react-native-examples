/**
 * DosageScheduler Component
 * 
 * A component that allows:
 * - Selecting time of day (morning, afternoon, evening, bedtime)
 * - Selecting frequency (daily, specific days, etc.)
 * - Displaying the next scheduled dose
 */
import React, { useState, useEffect } from 'react';
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
 * 
 * @param onChange - Callback function when schedule changes
 * @param initialSchedule - Initial schedule configuration (optional)
 * @param style - Optional additional styles for the container
 * 
 * @example
 * <DosageScheduler
 *   onChange={(schedule) => saveSchedule(medication.id, schedule)}
 *   initialSchedule={{ 
 *     timesOfDay: ['morning', 'evening'],
 *     frequency: 'daily',
 *     daysOfWeek: ['Mon', 'Wed', 'Fri'] 
 *   }}
 * />
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

  // Call onChange whenever schedule changes
  useEffect(() => {
    onChange(schedule);
  }, [schedule, onChange]);

  /**
   * Toggles a time of day on/off
   * @param time The time of day to toggle
   */
  const toggleTimeOfDay = (time: TimeOfDay) => {
    setSchedule(prev => {
      // Check if time is already selected
      const isSelected = prev.timesOfDay.includes(time);
      let newTimesOfDay: TimeOfDay[];
      
      if (isSelected) {
        // Don't allow removing the last time of day
        if (prev.timesOfDay.length === 1) {
          return prev;
        }
        // Remove the time
        newTimesOfDay = prev.timesOfDay.filter(t => t !== time);
      } else {
        // Add the time
        newTimesOfDay = [...prev.timesOfDay, time];
      }
      
      return {
        ...prev,
        timesOfDay: newTimesOfDay,
      };
    });
  };

  /**
   * Sets the frequency and updates days of week accordingly
   * @param newFrequency The new frequency to set
   */
  const setFrequency = (newFrequency: Frequency) => {
    setSchedule(prev => {
      // Update days of week based on frequency
      let newDaysOfWeek: DayOfWeek[] = [...prev.daysOfWeek];
      
      // Adjust days of week based on frequency
      if (newFrequency === 'daily') {
        newDaysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      } else if (newFrequency === 'weekdays') {
        newDaysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      } else if (newFrequency === 'weekends') {
        newDaysOfWeek = ['Sat', 'Sun'];
      } else if (newFrequency === 'custom') {
        // For custom, keep existing days or default to all days
        newDaysOfWeek = prev.daysOfWeek.length ? prev.daysOfWeek : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      }
      
      return {
        ...prev,
        frequency: newFrequency,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  /**
   * Toggles a day of week on/off (for custom frequency)
   * @param day The day of week to toggle
   */
  const toggleDayOfWeek = (day: DayOfWeek) => {
    if (schedule.frequency !== 'custom') return;
    
    setSchedule(prev => {
      // Check if day is already selected
      const isSelected = prev.daysOfWeek.includes(day);
      let newDaysOfWeek: DayOfWeek[];
      
      if (isSelected) {
        // Don't allow removing the last day
        if (prev.daysOfWeek.length === 1) {
          return prev;
        }
        // Remove the day
        newDaysOfWeek = prev.daysOfWeek.filter(d => d !== day);
      } else {
        // Add the day
        newDaysOfWeek = [...prev.daysOfWeek, day];
      }
      
      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  /**
   * Calculates the next dose based on current schedule and time
   * @returns String describing the next dose time
   */
  const calculateNextDose = (): string => {
    // Get current date and time
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Map JavaScript day index to our day of week format
    const dayMapping: Record<number, DayOfWeek> = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    };
    
    // Map time of day to hour range
    const timeToHourRange: Record<TimeOfDay, number> = {
      'morning': 8,     // 8 AM
      'afternoon': 12,  // 12 PM
      'evening': 18,    // 6 PM
      'bedtime': 22,    // 10 PM
    };
    
    // Sort times of day chronologically
    const orderedTimesOfDay: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'bedtime'];
    const scheduledTimes = schedule.timesOfDay.sort(
      (a, b) => orderedTimesOfDay.indexOf(a) - orderedTimesOfDay.indexOf(b)
    );
    
    // Check if the current day is in the schedule
    const currentDayOfWeek = dayMapping[currentDay];
    const isDayInSchedule = schedule.daysOfWeek.includes(currentDayOfWeek);

    // Find the next scheduled time today
    if (isDayInSchedule) {
      for (const time of scheduledTimes) {
        if (currentHour < timeToHourRange[time]) {
          return `Today at ${time}`;
        }
      }
    }
    
    // If no time found today, find the next scheduled day
    const daysOrder: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayIndex = daysOrder.indexOf(currentDayOfWeek);
    
    // Check each day after today
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = daysOrder[nextDayIndex];
      
      if (schedule.daysOfWeek.includes(nextDay)) {
        // Return the first time of day on the next scheduled day
        if (i === 1) {
          return `Tomorrow at ${scheduledTimes[0]}`;
        } else {
          return `${nextDay} at ${scheduledTimes[0]}`;
        }
      }
    }
    
    // Fallback response if no valid time found (shouldn't happen with valid schedule)
    return "Schedule not set";
  };

  /**
   * Renders the time of day selection buttons
   */
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
              accessibilityLabel={`${time} ${schedule.timesOfDay.includes(time) ? 'selected' : 'not selected'}`}
              accessibilityRole="button"
              accessibilityState={{ selected: schedule.timesOfDay.includes(time) }}
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

  /**
   * Renders the frequency selection buttons
   */
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
              accessibilityLabel={`${freq} ${schedule.frequency === freq ? 'selected' : 'not selected'}`}
              accessibilityRole="button"
              accessibilityState={{ selected: schedule.frequency === freq }}
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

  /**
   * Renders the days of week selection (visible when frequency is 'custom')
   */
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
              accessibilityLabel={`${day} ${schedule.daysOfWeek.includes(day) ? 'selected' : 'not selected'}`}
              accessibilityRole="button"
              accessibilityState={{ selected: schedule.daysOfWeek.includes(day) }}
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

  /**
   * Renders the next dose information
   */
  const renderNextDose = () => {
    return (
      <View style={styles.nextDoseContainer}>
        <Text style={styles.nextDoseLabel}>Next Dose:</Text>
        <Text style={styles.nextDoseText}>{calculateNextDose()}</Text>
      </View>
    );
  };

  return (
    <View 
      style={[styles.container, style]}
      accessibilityLabel="Medication dosage scheduler"
      accessibilityRole="group"
    >
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4, // Compensate for button margin
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  timeButtonTextSelected: {
    color: '#FFFFFF',
  },
  // Frequency styles
  frequencyContainer: {
    marginBottom: 16,
  },
  frequencyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4, // Compensate for button margin
  },
  frequencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  frequencyButtonSelected: {
    backgroundColor: '#007AFF',
  },
  frequencyButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  frequencyButtonTextSelected: {
    color: '#FFFFFF',
  },
  // Days of week styles
  daysContainer: {
    marginBottom: 16,
  },
  dayButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
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
    fontWeight: '500',
    color: '#0066CC',
  },
});

export default DosageScheduler; 