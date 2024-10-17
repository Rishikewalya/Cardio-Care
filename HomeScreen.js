import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'; 
import heart_logo from "./Heart_logo_3.png";

function CustomHeader({ navigation, searchTerm, onSearch }) {
  return (
    <LinearGradient 
      colors={['#FF6F61', '#FF9478']} // Orange gradient
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View style={{ flexDirection: "row", alignItems: "center" }}> 
          <Image source={heart_logo} style={{ width: 50, height: 40, marginRight: 10 }} />
          <Text style={styles.greeting}>CardioCare</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person-circle" type="ionicon" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" type="font-awesome" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={onSearch}
        />
      </View>
    </LinearGradient>
  );
}

function BottomNavbar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" type="font-awesome" size={28} color="#FF6F61" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="bell" type="font-awesome" size={28} color="#FF6F61" />
        <Text style={styles.navText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="cog" type="font-awesome" size={28} color="#FF6F61" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    { title: 'Symptom Checker', description: 'Check for common symptoms like chest pain, fatigue, or shortness of breath.' },
    { title: 'Test History', description: 'View your past test results to track your heart health progress over time.' },
    { title: 'Tips for a Healthy Heart', description: 'Get daily tips on maintaining a healthy heart and lifestyle.' },
    { title: 'Risk Factor Assessment', description: 'Assess your heart disease risk based on lifestyle factors like smoking, diet, and exercise.' },
  ];

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <CustomHeader 
        navigation={navigation} 
        searchTerm={searchTerm} 
        onSearch={setSearchTerm} 
      />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonTest} onPress={() => navigation.navigate('HeartDiseaseTest')}>
            <Icon name="heartbeat" type="font-awesome" size={20} color="#FF6F61" />
            <Text style={styles.buttonText}>Heart Disease Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonConsult}>
            <Icon name="stethoscope" type="font-awesome" size={20} color="#1E90FF" />
            <Text style={styles.buttonText}>Consult Doctor</Text>
          </TouchableOpacity>
        </View>

        {filteredFeatures.map((feature, index) => (
          <View key={index}>
            <Text style={styles.subtitle}>{feature.title}</Text>
            <View style={styles.featureBox}>
              <Text style={styles.featureText}>{feature.description}</Text>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => {
                  if (feature.title === 'Symptom Checker') {
                    navigation.navigate('SymptomChecker');
                  } else if (feature.title === 'Test History') {
                    navigation.navigate('TestHistory');
                  } else if (feature.title === 'Tips for a Healthy Heart') {
                    navigation.navigate('HeartTips');
                  } else if (feature.title === 'Risk Factor Assessment') {
                    navigation.navigate('RiskAssessment');
                  }
                }}
              >
                <Text style={styles.featureButtonText}>
                  {feature.title === 'Symptom Checker' ? 'Check Symptoms' : 
                   feature.title === 'Test History' ? 'View History' : 
                   feature.title === 'Tips for a Healthy Heart' ? 'Get Tips' : 
                   'Assess Risk'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background for contrast with orange
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonTest: {
    flexDirection: 'row',
    // backgroundColor: '#FF6F61',
    borderColor:"#FF6F61",
    borderWidth:1,
    borderStyle:"solid",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonConsult: {
    flexDirection: 'row',
    // backgroundColor: '#1E90FF',
    padding: 15,
    color:"black",
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"#1E90FF",
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  featureBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  featureButton: {
    marginTop: 10,
    // backgroundColor: '#FF6F61',
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"#FF6F61",
    padding: 10,
    borderRadius: 8,
  },
  featureButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#FF6F61',
  },
});

export default HomeScreen;
