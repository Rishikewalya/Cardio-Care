import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'; 
import heart_logo from "./Heart_logo_3.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation(); // Access navigation object

  const handleLogout = async () => {
    try {
      // Clear user session
      await AsyncStorage.removeItem('userToken');
      // Navigate to the login screen
      navigation.replace('Login'); // Ensure 'Login' is defined in your navigator
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
  
}

function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser,setCurrentUser]=useState();
  const features = [
    { title: 'Ask ChatBot', description: 'Check for common symptoms like chest pain, fatigue, or shortness of breath.' },
    { title: 'Test History', description: 'View your past test results to track your heart health progress over time.' },
    { title: 'Tips for a Healthy Heart', description: 'Get daily tips on maintaining a healthy heart and lifestyle.' },
    { title: 'Risk Factor Assessment', description: 'Assess your heart disease risk based on lifestyle factors like smoking, diet, and exercise.' },
  ];

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigateToUserList = async () => {
    try {
      // Fetch the current user's data from AsyncStorage
      const userDataString = await AsyncStorage.getItem("currentUser");
      const userData = JSON.parse(userDataString);
      setCurrentUser(userData)
      if (userData && userData.role) {
        const { role, userId } = userData;
        console.log("homescreen",role)
        // Navigate to the UserList screen with role and userId as parameters
        navigation.navigate("UserList", {
          role: role === "doctor" ? "patient" : "doctor",
          userId: userId, // Pass the logged-in user's ID
        });
      } else {
        alert("User data not found. Please log in again.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handlePendingRequest = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("currentUser");
      const userData = JSON.parse(userDataString);
      console.log("handlingrequest",userData._id)
      if (userData && userData.role === "doctor") {
        navigation.navigate("PendingRequests", { doctorId: userData._id });
      } else {
        navigation.navigate("Ask ChatBot");
      }
    } catch (error) {
      console.error("Error handling navigation:", error);
      Alert.alert("Error", "Unable to navigate. Please try again.");
    }
  };
  const handleApprovedConnections = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("currentUser");
      const userData = JSON.parse(userDataString);
  
      if (userData && userData.role) {
        const userId=userData._id
        console.log("Navigating to Approved Connections for:", userId);
  
        // Navigate to the Approved Connections screen with necessary parameters
        navigation.navigate("ApprovedConnections", { userId,userType: userData.role});
      } else {
        alert("User data not found. Please log in again.");
      }
    } catch (error) {
      console.error("Error retrieving approved connections:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <CustomHeader 
        navigation={navigation} 
        searchTerm={searchTerm} 
        onSearch={setSearchTerm} 
      />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.rowContainer}>
  <View style={styles.buttonWrapper}>
    <TouchableOpacity style={styles.buttonTest} onPress={() => navigation.navigate('HeartDiseaseTest')}>
      <Icon name="heartbeat" type="font-awesome" size={20} color="white" />
      <Text style={styles.buttonText}>Heart Disease Test</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.buttonWrapper}>
    <TouchableOpacity style={styles.buttonConsult} onPress={navigateToUserList}>
      <Icon name="heartbeat" type="font-awesome" size={20} color="white" />
      <Text style={styles.buttonText}>
      List of {currentUser ? (currentUser.role === 'doctor' ? 'patient' : 'doctor') : 'user'}
    </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonTest} onPress={handlePendingRequest}>
        <Icon name="check-circle" type="font-awesome" size={20} color="white" />
          <Text style={styles.featureButtonText}>Pending Request user</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonTest} onPress={handleApprovedConnections}>
        <Icon name="check-circle" type="font-awesome" size={20} color="white" />
          <Text style={styles.featureButtonText}>Connections</Text>
        </TouchableOpacity>
      </View>
    </View>


        {filteredFeatures.map((feature, index) => (
          <View key={index}>
            <Text style={styles.subtitle}>{feature.title}</Text>
            <View style={styles.featureBox}>
              <Text style={styles.featureText}>{feature.description}</Text>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => {
                  if (feature.title === 'Ask ChatBot') {
                    navigation.navigate('AskChatBot');
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
                  {feature.title === 'Ask ChatBot' ? 'Check Symptoms' : 
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
  rowContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    logoutButton: {
      // marginTop: 20,
      backgroundColor: '#FF6F61',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
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
    backgroundColor: '#FF6F61',
    borderColor:"#FF6F61",
    borderWidth:1,
    borderStyle:"solid",
    padding: 15,
    color:"white",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonConsult: {
    flexDirection: 'row',
    backgroundColor: '#FF6F61',
    padding: 15,
    color:"white",
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"#FF6F61",
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
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
    backgroundColor: '#FF6F61',
    borderWidth:1,
    borderStyle:"solid",
    borderColor:"#FF6F61",
    padding: 10,
    borderRadius: 8,
  },
  featureButtonText: {
    color: 'white',
    textAlign: 'center',
    marginLeft:5,
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
