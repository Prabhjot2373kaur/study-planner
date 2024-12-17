import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(true); 

  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedBio = await AsyncStorage.getItem('bio');
        const savedImage = await AsyncStorage.getItem('profileImage');
        const savedDarkMode = await AsyncStorage.getItem('isDarkMode');

        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
        if (savedBio) setBio(savedBio);
        if (savedImage) setProfileImage(savedImage);
        if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));

        setIsEditing(!savedName); 
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('bio', bio);
      await AsyncStorage.setItem('profileImage', profileImage || '');
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

      setIsEditing(false); 
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  
  const removeImage = () => setProfileImage(null);

 
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode && styles.darkContainer,
      ]}
    >
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        User Settings
      </Text>

      {/* Display Mode */}
      {!isEditing ? (
        <View style={styles.profileContainer}>
          {profileImage && (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          )}
          <Text style={[styles.profileText, isDarkMode && styles.darkText]}>
            Name: {name}
          </Text>
          <Text style={[styles.profileText, isDarkMode && styles.darkText]}>
            Email: {email}
          </Text>
          <Text style={[styles.profileText, isDarkMode && styles.darkText]}>
            Bio: {bio}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
       
        <>
          {/* Profile Image */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={[styles.imagePlaceholder, isDarkMode && styles.darkText]}>
                Tap to Add Image
              </Text>
            )}
          </TouchableOpacity>
          {profileImage && (
            <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
              <Text style={styles.removeText}>Remove Image</Text>
            </TouchableOpacity>
          )}

          {/* Form */}
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Name</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Email</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[styles.label, isDarkMode && styles.darkText]}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea, isDarkMode && styles.darkInput]}
            placeholder="Enter a short bio"
            multiline
            value={bio}
            onChangeText={setBio}
          />

          {/* Dark Mode Toggle */}
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, isDarkMode && styles.darkText]}>
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#ccc', true: '#555' }}
              thumbColor={isDarkMode ? '#FFF' : '#333'}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#A57A7A',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: { color: '#FFF' },
  profileContainer: { alignItems: 'center' },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePlaceholder: { color: '#333' },
  removeButton: { backgroundColor: '#FF4C4C', padding: 5, borderRadius: 5 },
  removeText: { color: '#FFF' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#FFF', padding: 10, marginBottom: 10, borderRadius: 5 },
  darkInput: { backgroundColor: '#555', color: '#FFF' },
  textArea: { height: 80 },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: { fontSize: 16, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#333', padding: 10, borderRadius: 5 },
  buttonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
});

export default SettingsScreen;
