import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import axios from "axios";

const ApprovedConnections = ({ route, navigation }) => {
  const [approvedConnections, setApprovedConnections] = useState([]);
  const { userId, userType } = route.params || {}; // userType can be "doctor" or "patient"

  useEffect(() => {
    const fetchApprovedConnections = async () => {
      try {
        console.log("User ID:", userId, "User Type:", userType);
        const endpoint = `http://172.20.10.5:5000/api/con/connections?userId=${userId}&approved=true`;

        const response = await axios.get(endpoint);
        console.log("Approved connections response:", response);
        setApprovedConnections(response.data);
      } catch (error) {
        console.error("Error fetching approved connections:", error);
        Alert.alert("Error", "Unable to fetch approved connections.");
      }
    };

    fetchApprovedConnections();
  }, [userId, userType]);

  const renderConnection = ({ item }) => {
    const connectionData = userType === "doctor" ? item.doctorId : item.patientId;

    return (
      <View style={styles.connectionCard}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          {connectionData.image ? (
            <Image source={{ uri: connectionData.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.fallbackImage}>
              <Text style={styles.fallbackText}>{connectionData.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>

        {/* Connection Details */}
        <View style={styles.infoContainer}>
          <Text style={styles.connectionText}>
            {userType === "doctor" ? `Patient Name: ${connectionData.name}` : `Doctor Name: ${connectionData.name}`}
          </Text>
          <Text style={styles.detailText}>Email: {connectionData.email}</Text>
          <Text style={styles.detailText}>Phone: {connectionData.phone}</Text>

          {/* Open Dashboard Button */}
          <TouchableOpacity
            style={styles.dashboardButton}
            onPress={() => navigation.navigate("ConnectionDashboard", { connection: item })}
          >
            <Text style={styles.dashboardButtonText}>Open Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {userType === "doctor" ? "Approved Patients" : "Approved Doctors"}
      </Text>
      <FlatList
        data={approvedConnections}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderConnection}
        ListEmptyComponent={<Text style={styles.emptyText}>No approved connections found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  connectionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fallbackImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    flex: 1,
  },
  connectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  dashboardButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  dashboardButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default ApprovedConnections;
