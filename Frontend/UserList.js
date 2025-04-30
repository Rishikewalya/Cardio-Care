import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView 
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserCard = ({ user, onConnect }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        {user.image ? (
          <Image 
            source={{ uri: user.image }} 
            style={styles.profileImage} 
          />
        ) : (
          <View style={styles.fallbackImage}>
            <Text style={styles.fallbackText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        {user.role === 'doctor' ? (
          <>
            <Text style={styles.detail}>
              <Text style={styles.label}>Specialization: </Text>
              {user.specialization}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Experience: </Text>
              {user.experience} years
            </Text>
          </>
        ) : (
          <Text style={styles.detail}>
            <Text style={styles.label}>Contact: </Text>
            {user.phone}
          </Text>
        )}
        
        <TouchableOpacity 
          style={styles.connectButton}
          onPress={() => onConnect(user._id)}
        >
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const UserList = ({ route }) => {
  const [users, setUsers] = useState([]);
  const { role } = route.params || {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.5:5000/api/auth/users?role=${role}`
        );
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    if (role) {
      fetchUsers();
    }
  }, [role]);

  const connectUser = async (id) => {
    try {
      const userDataString = await AsyncStorage.getItem("currentUser");
      const userData = JSON.parse(userDataString);
      const userRole = userData.role;
      const userId = userData._id;

      await axios.post("http://172.20.10.5:5000/api/con/connect", {
        doctorId: userRole === "doctor" ? id : userId,
        patientId: userRole === "doctor" ? userId : id,
      });
      
      alert("Connection request sent successfully!");
    } catch (error) {
      console.error("Error connecting:", error);
      alert("Failed to send connection request. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Available {role === 'doctor' ? 'Doctors' : 'Patients'}
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <UserCard user={item} onConnect={connectUser} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  fallbackImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  connectButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UserList;