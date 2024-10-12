import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestHistory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test History</Text>
            {/* Add your test history logic or UI here */}
            <Text style={styles.description}>
                View your past test results and track your heart health progress over time.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default TestHistory;
