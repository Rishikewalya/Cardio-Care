import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeartDiseaseTestScreen() {
    const initialState = {
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fieldLabels = {
        age: "Age",
        sex: "Sex (1 = Male, 0 = Female)",
        cp: "Chest Pain Type (0-3)",
        trestbps: "Resting Blood Pressure (mmHg)",
        chol: "Cholesterol (mg/dL)",
        fbs: "Fasting Blood Sugar (1 = Yes, 0 = No)",
        restecg: "Resting ECG (0 = Normal, 1 = ST-T abnormality, 2 = LVH)",
        thalach: "Max Heart Rate",
        exang: "Exercise Induced Angina (1 = Yes, 0 = No)",
        oldpeak: "Oldpeak (ST Depression)",
        slope: "Slope of Peak Exercise ST Segment (0-2)",
        ca: "Number of Major Vessels (0-3)",
        thal: "Thalassemia (0-3)"
    };
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userDataString = await AsyncStorage.getItem('currentUser');
            const userData = JSON.parse(userDataString);
            const uniqueId = userData._id;

            const response = await axios.post('http://172.20.10.5:5000/api/predict', {
                ...formData,
                age: parseInt(formData.age),
                sex: parseInt(formData.sex),
                cp: parseInt(formData.cp),
                trestbps: parseInt(formData.trestbps),
                chol: parseInt(formData.chol),
                fbs: parseInt(formData.fbs),
                restecg: parseInt(formData.restecg),
                thalach: parseInt(formData.thalach),
                exang: parseInt(formData.exang),
                oldpeak: parseFloat(formData.oldpeak),
                slope: parseInt(formData.slope),
                ca: parseInt(formData.ca),
                thal: parseInt(formData.thal),
            });

            setResult(response.data);
            await axios.post('http://172.20.10.5:5000/api/predict/addRecord', {
                riskPrediction: response.data.prediction,
                probability: response.data.probability,
                treatment: response.data.treatment,
                uniqueId: uniqueId
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async () => {
    setLoading(true);
    try {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
        if (result.canceled) return;

        const formData = new FormData();
        formData.append('file', {
            uri: Platform.OS === 'android' ? result.assets[0].uri : result.assets[0].uri.replace('file://', ''),
            name: result.assets[0].name,
            type: result.assets[0].mimeType || 'application/pdf',
        });
        console.log("response me jaane ready hai")
        const response = await axios.post('http://172.20.10.5:5000/api/ocr/extract-data', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response.data,"response aa gya hai bhaiya")

        // Mapping API response keys to your form state keys
        const mappedData = {
            age: response.data["Age"] || '',
            sex: response.data["Sex"] === "Male" ? "1" : "0",
            cp: response.data["Chest Pain Type"] || '',
            trestbps: response.data["Resting Blood Pressure"] || '',
            chol: response.data["Cholesterol"] || '',
            fbs: response.data["Fasting Blood Sugar"] === "Yes" ? "1" : "0",
            restecg: response.data["Resting ECG"] === "Normal" ? "0"
                : response.data["Resting ECG"] === "ST-T abnormality" ? "1" 
                : response.data["Resting ECG"] === "Left ventricular hypertrophy" ? "2" 
                : '',

            thalach: response.data["Max Heart Rate"] || '',
            exang: response.data["Exercise Induced Angina"] === "Yes" ? "1" : "0",
            oldpeak: response.data["Oldpeak"] || '',
            slope: response.data["Slope of Peak Exercise ST Segment"] || '',
            ca: response.data["Major Vessels Colored by Fluoroscopy"] || '',
            thal: response.data["Thalassemia"] || ''
        };

        setFormData(prevState => ({
            ...prevState,
            ...mappedData
        }));

    } catch (error) {
        console.error('Error uploading file:', error);
    } finally {
        setLoading(false);
    }
};


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Heart Disease Risk Predictor</Text>
                    <Button title="Upload File for OCR" onPress={handleFileUpload} />
                    {Object.keys(initialState).map((key) => (
                        <View key={key} style={styles.inputContainer}>
                            <Text style={styles.label}>{fieldLabels[key]}:</Text>
                            <TextInput
                                style={styles.input}
                                // placeholder={`Enter ${fieldLabels[key]}`}
                                value={formData[key]}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, [key]: text }))}
                            />
                        </View>
                    ))}
                    <Button title="Predict Risk" onPress={handleSubmit} disabled={loading} />
                    {loading && <ActivityIndicator size={20} color="#0000ff" />}
                    {result && (
                        <View style={styles.result}>
                            <Text>Risk Prediction: {result.prediction === 1 ? 'High Risk' : 'Low Risk'}</Text>
                            <Text>Probability: {result.probability.toFixed(2)}</Text>
                            <Text>Treatment: {result.treatment}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, justifyContent: 'center' },
    container: { padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    inputContainer: { marginBottom: 15 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#fff' },
    result: { marginTop: 20, padding: 20, borderRadius: 8, backgroundColor: '#e0f7fa' }
});
