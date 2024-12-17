import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = ({ navigation, addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  
  const handleSaveTask = () => {
    if (taskName && taskDescription) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        date: date.toDateString(),
        time: time.toLocaleTimeString(),
        status: 'pending',
      };

      addTask(newTask);  
      navigation.navigate('TaskList'); 
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LET'S ADD TASKS</Text>

      <Text style={styles.label}>NAME OF TASK</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <Text style={styles.label}>TASK DESCRIPTION</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />

      <View style={styles.dateTimeContainer}>
        {/* Date Picker */}
        <View>
          <Text style={styles.label}>DATE</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.picker}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </View>

        {/* Time Picker */}
        <View>
          <Text style={styles.label}>TIME</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.picker}>
            <Text>{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </View>
      </View>

      <TouchableOpacity onPress={handleSaveTask} style={styles.saveButton}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TaskList')}
        style={styles.checkTasksButton}
      >
        <Text style={styles.checkText}>check your tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A57A7A', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'white' },
  label: { fontWeight: 'bold', marginTop: 10, color: '#FFF' },
  input: { backgroundColor: '#ddd', padding: 10, borderRadius: 5 },
  textArea: { backgroundColor: '#ddd', padding: 10, borderRadius: 5, height: 80 },
  dateTimeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  picker: { backgroundColor: '#ddd', padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: '#3DA9FC', padding: 15, borderRadius: 5, marginTop: 10 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  checkTasksButton: { backgroundColor: '#4FB0C6', padding: 15, borderRadius: 5, marginTop: 10 },
  checkText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
});

export default AddTaskScreen;
