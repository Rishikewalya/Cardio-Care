import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SymptomChecker = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Symptom Checker</Text>
            {/* Add your symptom checking logic or UI here */}
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
});

export default SymptomChecker;
