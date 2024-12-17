import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ tasks, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  
  const getMarkedDates = () => {
    const markedDates = {};
    tasks.forEach((task) => {
      markedDates[task.date] = {
        marked: true,
        dotColor: 'black',
        selected: true,
        selectedColor: '#A57A7A',
      };
    });
    return markedDates;
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>CALENDAR</Text>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        current={new Date().toISOString().split('T')[0]} 
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        monthFormat={'MMMM yyyy'}
        markingType={'custom'}
        markedDates={getMarkedDates()} 
        theme={{
          selectedDayBackgroundColor: '#A57A7A',
          todayTextColor: '#333',
          arrowColor: 'black',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
        }}
      />

      {/* Task Details */}
      {selectedDate ? (
        <View style={styles.taskDetails}>
          <Text style={styles.dateText}>Tasks on {selectedDate}</Text>
          {tasks.filter((task) => task.date === selectedDate).length > 0 ? (
            tasks
              .filter((task) => task.date === selectedDate)
              .map((task) => (
                <View key={task.id} style={styles.taskItem}>
                  <Text style={styles.taskText}>
                    {task.name} - {task.time} ({task.status})
                  </Text>
                </View>
              ))
          ) : (
            <Text style={styles.noTaskText}>No tasks on this day</Text>
          )}
        </View>
      ) : (
        <Text style={styles.promptText}>Select a date to see tasks</Text>
      )}

      {/* Navigation Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButton}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TaskList')}>
          <Text style={styles.navButton}>Task List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A57A7A',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  calendar: {
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#FDFDFD',
  },
  taskDetails: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskItem: {
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
    padding: 5,
    marginVertical: 3,
  },
  taskText: {
    fontSize: 14,
    color: '#333',
  },
  noTaskText: {
    fontSize: 14,
    color: '#666',
  },
  promptText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: 'auto',
    backgroundColor: '#f8c6c6',
  },
  navButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CalendarScreen;