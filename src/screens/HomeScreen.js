import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LogoSvg from '../components/LogoSvg';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Plus Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>PLAN TO MAKE LIFE EASY</Text>

      {/* SVG Logo */}
      <LogoSvg style={styles.logo} />
      <Text style={styles.subTitle}>study planner</Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.buttonText}>let's get started</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        {/* Calendar Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('TaskList')}>
          <Ionicons name="calendar-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A57A7A',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  logo: {
    marginTop: 30,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#e2e2e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f8c6c6',
    paddingVertical: 10,
  },
});

export default HomeScreen;
