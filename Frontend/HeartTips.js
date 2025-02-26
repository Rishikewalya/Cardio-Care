import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeartTips = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tips for a Healthy Heart</Text>
            {/* Add your healthy heart tips logic or UI here */}
            <Text style={styles.description}>
                Get daily tips on maintaining a healthy heart and lifestyle.
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

export default HeartTips;
