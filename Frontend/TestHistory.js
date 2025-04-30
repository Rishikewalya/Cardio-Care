import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const TestHistory = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('currentUser');
            const userData = JSON.parse(userDataString);
            const uniqueId = userData._id; // Retrieve the _id
                console.log(uniqueId)
                if (uniqueId) {
                    const response = await axios.post('http://172.20.10.5:5000/api/predict/getRecord', { uniqueId });
                    if (response.data.success) {
                        setRecords(response.data.record);
                    } else {
                        setError('Failed to fetch records');
                    }
                }
            } catch (err) {
                setError('An error occurred while fetching records');
                console.error(err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchRecords();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Test History</Text>
            {loading ? (
                <ActivityIndicator size={20} color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <View style={styles.recordsContainer}>
                    {records.length > 0 ? (
                        records.map((record, index) => (
                            <View key={index} style={styles.recordCard}>
                                <Text style={styles.recordText}>Risk Prediction: {record.riskPrediction==0?"low risk":"high risk"}</Text>
                                <Text style={styles.recordText}>Probability: {record.probability.toFixed(2)}</Text>
                                <Text style={styles.recordText}>Treatment: {record.treatment}</Text>
                                <Text style={styles.recordText}>Unique ID: {record.uniqueId}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noRecordsText}>No records found</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    recordsContainer: {
        flex: 1,
    },
    recordCard: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    recordText: {
        fontSize: 16,
        marginBottom: 5,
    },
    noRecordsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default TestHistory;
