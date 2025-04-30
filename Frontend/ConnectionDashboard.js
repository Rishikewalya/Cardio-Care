import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";

const ConnectionDashboard = ({ route }) => {
  const { connection } = route.params;
  const userData = connection.doctorId || connection.patientId;

  const handleAddData = () => {
    Alert.alert("Add Data", "Feature to add data for the connection.");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        {userData.image ? (
          <Image source={{ uri: userData.image }} style={styles.profileImage} />
        ) : (
          <View style={styles.fallbackImage}>
            <Text style={styles.fallbackText}>{userData.name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
      </View>

      {/* Connection Details */}
      <Text style={styles.heading}>Connection Dashboard</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {userData.name}</Text>
        <Text style={styles.infoText}>Email: {userData.email}</Text>
        <Text style={styles.infoText}>Phone: {userData.phone}</Text>
        <Text style={styles.infoText}>Connection ID: {connection.id}</Text>
      </View>

      {/* Add Data Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddData}>
        <Text style={styles.addButtonText}>Add Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fallbackImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConnectionDashboard;
