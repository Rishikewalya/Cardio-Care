import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Adjust path as necessary
import ProfileScreen from './ProfileScreen'; // Create this component for the profile page
import HeartDiseaseTestScreen from './HeartDiseaseTestScreen';
import AskChatBot from './AskChatBot'; // Import your new screens
import TestHistory from './TestHistory';
import HeartTips from './HeartTips';
import RiskAssessment from './RiskAssessment';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import UserList from './UserList';
import PendingRequests from './PendingRequests';
import ApprovedConnections from './ApprovedConnections';
import ConnectionDashboard from './ConnectionDashboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OCRScreen from './OCRScreen';
const Stack = createNativeStackNavigator();

// function CustomHeader({ navigation }) {
//   return (
//     <View style={styles.header}>
//       <View style={styles.headerContent}>
//         <Text style={styles.greeting}>Good Morning, Rishi</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <Icon name="person-circle" type="ionicon" size={28} color="#007bff" />
//         </TouchableOpacity>
//       </View>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search..."
//         placeholderTextColor="#999"
//       />
//     </View>
//   );
// }

// function BottomNavbar() {
//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity style={styles.navItem}>
//         <Icon name="home" type="font-awesome" size={28} color="#007bff" />
//         <Text style={styles.navText}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem}>
//         <Icon name="bell" type="font-awesome" size={28} color="#007bff" />
//         <Text style={styles.navText}>Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem}>
//         <Icon name="cog" type="font-awesome" size={28} color="#007bff" />
//         <Text style={styles.navText}>Settings</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <CustomHeader navigation={navigation} />
//       <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
//         <Text style={styles.title}>Cardio Care</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonTest}>
//             <Icon name="heartbeat" type="font-awesome" size={20} color="#fff" />
//             <Text style={styles.buttonText}>Heart Disease Test</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttonConsult}>
//             <Icon name="stethoscope" type="font-awesome" size={20} color="#fff" />
//             <Text style={styles.buttonText}>Consult Doctor</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Symptom Checker */}
//         <Text style={styles.subtitle}>Symptom Checker</Text>
//         <View style={styles.featureBox}>
//           <Text style={styles.featureText}>
//             Check for common symptoms like chest pain, fatigue, or shortness of breath.
//           </Text>
//           <TouchableOpacity style={styles.featureButton}>
//             <Text style={styles.featureButtonText}>Check Symptoms</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Test History */}
//         <Text style={styles.subtitle}>Test History</Text>
//         <View style={styles.featureBox}>
//           <Text style={styles.featureText}>
//             View your past test results to track your heart health progress over time.
//           </Text>
//           <TouchableOpacity style={styles.featureButton}>
//             <Text style={styles.featureButtonText}>View History</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Tips for a Healthy Heart */}
//         <Text style={styles.subtitle}>Tips for a Healthy Heart</Text>
//         <View style={styles.featureBox}>
//           <Text style={styles.featureText}>
//             Get daily tips on maintaining a healthy heart and lifestyle.
//           </Text>
//           <TouchableOpacity style={styles.featureButton}>
//             <Text style={styles.featureButtonText}>Get Tips</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Risk Factor Assessment */}
//         <Text style={styles.subtitle}>Risk Factor Assessment</Text>
//         <View style={styles.featureBox}>
//           <Text style={styles.featureText}>
//             Assess your heart disease risk based on lifestyle factors like smoking, diet, and exercise.
//           </Text>
//           <TouchableOpacity style={styles.featureButton}>
//             <Text style={styles.featureButtonText}>Assess Risk</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       {/* Bottom Navbar */}
//       <BottomNavbar />
//     </View>
//   );
// }

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
  name="Home" 
  component={HomeScreen} 
  options={{ headerShown: false }} 
/>
<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="HeartDiseaseTest" component={HeartDiseaseTestScreen} />
        <Stack.Screen name="AskChatBot" component={AskChatBot} />
        <Stack.Screen name="TestHistory" component={TestHistory} />
        <Stack.Screen name="HeartTips" component={HeartTips} />
        <Stack.Screen name="RiskAssessment" component={RiskAssessment} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="PendingRequests" component={PendingRequests} />
        <Stack.Screen name="ApprovedConnections" component={ApprovedConnections} />
    <Stack.Screen name="ConnectionDashboard" component={ConnectionDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingTop: 120, // Add padding to avoid overlap with the fixed header
//   },
//   header: {
//     backgroundColor: '#fff',
//     paddingTop: 60, // For status bar space on most devices
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   searchInput: {
//     marginTop: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 20,
//     color: '#007bff',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   buttonTest: {
//     flexDirection: 'row',
//     backgroundColor: '#ff6f61',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },
//   buttonConsult: {
//     flexDirection: 'row',
//     backgroundColor: '#1e90ff',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     flex: 1,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   featureBox: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   featureText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   featureButton: {
//     marginTop: 10,
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   featureButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     paddingVertical: 10,
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#007bff',
//   },
// });
