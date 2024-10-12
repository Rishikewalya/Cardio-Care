import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'; 

function CustomHeader({ navigation, searchTerm, onSearch }) {
    return (
        <LinearGradient 
            colors={['rgba(0, 123, 255, 0.8)', 'rgba(0, 123, 255, 0.4)']} 
            style={styles.header}
        >
            <View style={styles.headerContent}>
                <Text style={styles.greeting}>Good Morning, Rishi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person-circle" type="ionicon" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <Icon name="search" type="font-awesome" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchTerm} // Bind search term to TextInput
                    onChangeText={onSearch} // Update search term on change
                />
            </View>
        </LinearGradient>
    );
}

function BottomNavbar({ navigation }) {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navItem}>
                <Icon name="home" type="font-awesome" size={28} color="#007bff" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Icon name="bell" type="font-awesome" size={28} color="#007bff" />
                <Text style={styles.navText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Icon name="cog" type="font-awesome" size={28} color="#007bff" />
                <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

function HomeScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data to search within
    const features = [
        { title: 'Symptom Checker', description: 'Check for common symptoms like chest pain, fatigue, or shortness of breath.' },
        { title: 'Test History', description: 'View your past test results to track your heart health progress over time.' },
        { title: 'Tips for a Healthy Heart', description: 'Get daily tips on maintaining a healthy heart and lifestyle.' },
        { title: 'Risk Factor Assessment', description: 'Assess your heart disease risk based on lifestyle factors like smoking, diet, and exercise.' },
    ];

    // Filter features based on search term
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
                <Text style={styles.title}>Cardio Care</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonTest}
                     onPress={() => navigation.navigate('HeartDiseaseTest')} // Add this line
                     >
                        <Icon name="heartbeat" type="font-awesome" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Heart Disease Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonConsult}>
                        <Icon name="stethoscope" type="font-awesome" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Consult Doctor</Text>
                    </TouchableOpacity>
                </View>

                {/* Dynamically render features based on search */}
                {filteredFeatures.map((feature, index) => (
    <View key={index}>
        <Text style={styles.subtitle}>{feature.title}</Text>
        <View style={styles.featureBox}>
            <Text style={styles.featureText}>
                {feature.description}
            </Text>
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
                     feature.title === 'Risk Factor Assessment' ? 'Assess Risk' : 'Learn More'}
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
      backgroundColor: '#f0f0f0',
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 120, // Add padding to avoid overlap with the fixed header
    },
    header: {
      backgroundColor: '#fff',
      paddingTop: 60, // For status bar space on most devices
      paddingHorizontal: 20,
      paddingBottom: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    greeting: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    searchInput: {
      flex: 1,
      marginTop: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#007bff',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#333',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    buttonTest: {
      flexDirection: 'row',
      backgroundColor: '#ff6f61',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    buttonConsult: {
      flexDirection: 'row',
      backgroundColor: '#1e90ff',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 10,
      fontSize: 16,
    },
    featureBox: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
    },
    featureText: {
      fontSize: 16,
      color: '#333',
    },
    featureButton: {
      marginTop: 10,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 8,
    },
    featureButtonText: {
      color: '#fff',
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
      color: '#007bff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%', // Keep a reasonable width
        height: 40, // Set a fixed height for a slimmer look
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20, // Rounded corners for a cleaner design
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginTop: 10,
        alignSelf: 'center', // Center the search bar
    },
    searchIcon: {
        marginRight: 10,
    },
  });

export default HomeScreen;