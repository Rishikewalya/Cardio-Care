import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import axios from "axios";

const PendingRequestCard = ({ request, onApprove }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        {request.doctorId.image ? (
          <Image source={{ uri: request.doctorId.image }} style={styles.profileImage} />
        ) : (
          <View style={styles.fallbackImage}>
            <Text style={styles.fallbackText}>
              {request?.doctorId?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{request.doctorId.name}</Text>
        <Text style={styles.email}>{request.doctorId.email}</Text>
        <Text style={styles.email}>{request.doctorId.phone}</Text>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => onApprove(request._id)}
        >
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const PendingRequests = ({ route }) => {
  const [connections, setConnections] = useState([]);
  const { doctorId } = route.params || {};

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.5:5000/api/con/connections?userId=${doctorId}&approved=false`
        );

        setConnections(response.data);
        console.log(connections,"fetch pending");
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        Alert.alert("Error", "Unable to fetch requests. Please try again later.");
      }
    };
    fetchRequests();
  }, [doctorId]);

  const handleApprove = async (connectionId) => {
    try {
      console.log("conneciton id",connectionId)
      await axios.post("http://172.20.10.5:5000/api/con/approve", { connectionId });
      alert("Request approved!");
      setConnections(connections.filter((c) => c._id !== connectionId));
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pending Requests</Text>
      <FlatList
  data={connections}
  keyExtractor={(item) => item._id.toString()}
  renderItem={({ item }) => (
    <PendingRequestCard request={item} onApprove={() => handleApprove(item._id)} />
  )}
  contentContainerStyle={styles.listContainer}
  ListEmptyComponent={
    <Text style={styles.emptyText}>No pending requests at the moment.</Text>
  }
/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    color: "#333",
    backgroundColor: "#fff",
    shadowColor: "#000",
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
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
  },
  fallbackImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  approveButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
  },
  approveButtonText: {
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

export default PendingRequests;