import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RiskAssessment = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Risk Factor Assessment</Text>
            {/* Add your risk assessment logic or UI here */}
            <Text style={styles.description}>
                Assess your heart disease risk based on lifestyle factors like smoking, diet, and exercise.
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

export default RiskAssessment;
