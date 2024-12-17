import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const TaskListScreen = ({ navigation, tasks, toggleTaskStatus, deleteTask }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TASK LIST</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            {/* Task Details */}
            <View>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text>Date: {item.date} | Time: {item.time}</Text>
              <Text>Status: {item.status}</Text>
            </View>

            {/* Buttons for Done, Edit, and Delete */}
            <View style={styles.buttonsContainer}>
              {/* Done Button */}
              <TouchableOpacity
                style={[styles.button, styles.doneButton]}
                onPress={() => toggleTaskStatus(item.id)}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>

              {/* Edit Button */}
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => navigation.navigate('TaskDetail', { task: item })}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    marginBottom: 10,
    color: '#FFFFFF', 
  },
  taskItem: {
    backgroundColor: '#F5F5F5', 
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', 
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  button: {
    padding: 8,
    marginVertical: 3,
    borderRadius: 5,
    width: 70,
    alignItems: 'center',
    backgroundColor: '#000000', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});

export default TaskListScreen;
