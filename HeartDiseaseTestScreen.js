import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HeartDiseaseTestScreen() {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [cp, setCp] = useState('');
    const [trestbps, setTrestbps] = useState('');
    const [chol, setChol] = useState('');
    const [fbs, setFbs] = useState('');
    const [restecg, setRestecg] = useState('');
    const [thalach, setThalach] = useState('');
    const [exang, setExang] = useState('');
    const [oldpeak, setOldpeak] = useState('');
    const [slope, setSlope] = useState('');
    const [ca, setCa] = useState('');
    const [thal, setThal] = useState('');

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleSubmit = async () => {
        setLoading(true);  // Start loading
        try {
            const userDataString = await AsyncStorage.getItem('currentUser');
            const userData = JSON.parse(userDataString);
            const uniqueId = userData._id; // Retrieve the _id
            console.log("unique id ",uniqueId)
            const response = await axios.post('http://192.168.1.3:5000/api/predict', {
                age: parseInt(age),
                sex: parseInt(sex),
                cp: parseInt(cp),
                trestbps: parseInt(trestbps),
                chol: parseInt(chol),
                fbs: parseInt(fbs),
                restecg: parseInt(restecg),
                thalach: parseInt(thalach),
                exang: parseInt(exang),
                oldpeak: parseFloat(oldpeak),
                slope: parseInt(slope),
                ca: parseInt(ca),
                thal: parseInt(thal),
            });
            setResult(response.data);
            const recordData = {
                riskPrediction: response.data.prediction, 
                probability: response.data.probability,   
                treatment: response.data.treatment,        
                uniqueId: uniqueId                          
            };
            await addRecord(recordData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);  // Stop loading after request completes
        }
    };
    const addRecord = async (recordData) => {
        try {
            console.log("add record started")
            const response = await axios.post('http://192.168.1.3:5000/api/predict/addRecord', recordData);
            console.log('Record added:', response.data);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Heart Disease Risk Predictor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sex (0 for female, 1 for male)"
                        value={sex}
                        onChangeText={setSex}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Chest Pain Type (0-3)"
                        value={cp}
                        onChangeText={setCp}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Resting Blood Pressure"
                        value={trestbps}
                        onChangeText={setTrestbps}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cholesterol"
                        value={chol}
                        onChangeText={setChol}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fasting Blood Sugar (0 or 1)"
                        value={fbs}
                        onChangeText={setFbs}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Resting Electrocardiographic Results (0-2)"
                        value={restecg}
                        onChangeText={setRestecg}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Maximum Heart Rate Achieved"
                        value={thalach}
                        onChangeText={setThalach}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Exercise Induced Angina (0 or 1)"
                        value={exang}
                        onChangeText={setExang}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Oldpeak"
                        value={oldpeak}
                        onChangeText={setOldpeak}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Slope of Peak Exercise ST Segment (0-2)"
                        value={slope}
                        onChangeText={setSlope}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Number of Major Vessels (0-3)"
                        value={ca}
                        onChangeText={setCa}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Thalassemia (0-3)"
                        value={thal}
                        onChangeText={setThal}
                        keyboardType="numeric"
                    />

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" /> // Display loading spinner
                    ) : (
                        <Button title="Predict Risk" onPress={handleSubmit} />
                    )}

                    {result && (
                        <View style={styles.result}>
                            <Text style={styles.resultText}>
                                Risk Prediction: {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                            </Text>
                            <Text style={styles.resultText}>
                                Probability: {result.probability.toFixed(2)}
                            </Text>
                            <Text style={styles.resultText}>
                                Treatment: {result.treatment}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    result: {
        marginTop: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#e0f7fa',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 10,
    },
});
