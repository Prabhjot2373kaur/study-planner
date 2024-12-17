import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TaskDetailScreen = ({ route, navigation, editTask, deleteTask, toggleTaskStatus }) => {
  const { task } = route.params;
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);
  const [time, setTime] = useState(task.time);

  const handleSave = () => {
    editTask({ ...task, name, description, date, time });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Task</Text>

      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setDescription}
        value={description}
      />
      <TextInput style={styles.input} onChangeText={setDate} value={date} />
      <TextInput style={styles.input} onChangeText={setTime} value={time} />

      <Button title="Save Changes" onPress={handleSave} />
      <Button title="Mark as Done" onPress={() => toggleTaskStatus(task.id)} />
      <Button title="Delete Task" color="red" onPress={() => deleteTask(task.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A57A7A', padding: 20 },
  label: { color: '#FFF', fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#D3D3D3', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default TaskDetailScreen;
