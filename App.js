import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [isDarkMode, setIsDarkMode] = useState(false); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedTheme = await AsyncStorage.getItem('theme');

        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
        if (storedTheme) {
          setIsDarkMode(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  
  const saveTasksToStorage = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  
  const toggleDarkMode = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
  };

  
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { id: Date.now(), status: 'pending', ...newTask }];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status === 'pending' ? 'done' : 'pending' }
        : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? '#444' : '#A57A7A' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>

        {/* Add Task Screen */}
        <Stack.Screen name="AddTask">
          {(props) => <AddTaskScreen {...props} addTask={addTask} />}
        </Stack.Screen>

        {/* Task List Screen */}
        <Stack.Screen name="TaskList">
          {(props) => (
            <TaskListScreen
              {...props}
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTaskStatus={toggleTaskStatus}
            />
          )}
        </Stack.Screen>

        {/* Task Detail Screen */}
        <Stack.Screen name="TaskDetail">
          {(props) => (
            <TaskDetailScreen
              {...props}
              editTask={editTask}
              deleteTask={deleteTask}
              toggleTaskStatus={toggleTaskStatus}
            />
          )}
        </Stack.Screen>

       {/* Calendar Screen */}
       <Stack.Screen name="Calendar">
          {(props) => <CalendarScreen {...props} tasks={tasks} />}
        </Stack.Screen>

        {/* Settings Screen */}
        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
