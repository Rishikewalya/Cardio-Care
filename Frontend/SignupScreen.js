import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  // Handle Sign Up
  const handleSignup = async () => {
    try {
      console.log("coming here in signup")
      if (!name || !email || !password || !number || !role) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }

      // If Doctor role is selected, ensure specialization and experience are filled
      if (role === 'doctor' && (!specialization || !experience)) {
        Alert.alert('Error', 'Please fill out specialization and experience.');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', number);
      formData.append('role', role);
      formData.append('specialization', specialization);
      formData.append('experience', experience);

      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();
        const fileType = filename.split('.').pop();

        formData.append('image', {
          uri: localUri,
          name: filename,
          type: `image/${fileType}`,
        });
      }
      console.log("image part done")

      const response = await axios.post('http://172.20.10.5:5000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("response",response)
      if (response.data.success) {
        Alert.alert('Success', 'Signup successful! Redirecting to login.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
    <View style={styles.container}>
      {/* Heart Image */}
      <Image source={require('./Heart_logo_3.png')} style={styles.heartImage} />
      
      {/* Brand Name */}
      <Text style={styles.brandName}>CardioCare</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#999"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        placeholderTextColor="#999"
        value={number}
        keyboardType="phone-pad"
        maxLength={10} // Restricts input length to 10 characters
        onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, '').slice(0, 10))} // Ensures only numbers and limits to 10 digits
      />


      {/* Role Selection */}
      <View style={styles.pickerContainer}>
      <Picker
  selectedValue={role}
  onValueChange={(itemValue) => setRole(itemValue)}
  style={styles.picker}
>
  <Picker.Item label="Select Role" value="" color="#000" />
  <Picker.Item label="Doctor" value="doctor" color="#000" />
  <Picker.Item label="Patient" value="patient" color="#000" />
</Picker>
      </View>

      {/* Specialization Input (only for Doctor) */}
      {role === 'doctor' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Specialization"
            placeholderTextColor="#999"
            value={specialization}
            onChangeText={setSpecialization}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Experience"
            placeholderTextColor="#999"
            value={experience}
            onChangeText={setExperience}
          />
        </>
      )}

      {/* Image Upload Button */}
      <TouchableOpacity style={styles.signupButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && (
  <Image 
    source={{ uri: image }} 
    style={{ width: 200, height: 200, marginBottom: 20 }} 
  />
)}
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heartImage: {
    width: 140,
    height: 120,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 20,
  },
  imagePreviewContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ff6b6b',
  },
  uploadButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  loginLinkText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
