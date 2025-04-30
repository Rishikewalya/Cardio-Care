import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import heart_logo from "./Heart_logo_3.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.20.10.5:5000/api/auth/login', { email, password });
      if (response.data.success) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(response.data.user));
        navigation.navigate('Home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView 
      style={styles.scrollView} 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
    >
      {/* Heart Image */}
      <Image source={heart_logo} style={styles.heartImage} />
      
      {/* Brand Name */}
      <Text style={styles.brandName}>CardioCare</Text>

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

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  container: {
    flexGrow: 1, // Important to make ScrollView content take full height
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  loginButton: {
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    paddingVertical: 10,
  },
  signupText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
