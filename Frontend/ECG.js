import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function ECG() {
  const [heaFile, setHeaFile] = useState(null);
  const [datFile, setDatFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [ecgImage, setEcgImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pickHeaFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        const { name, uri } = result.assets[0];
        if (!name.endsWith('.hea')) {
          setError('Please select a .hea file');
          return;
        }
        setHeaFile({ name, uri });
        setError(null);
      }
    } catch (err) {
      setError('Error selecting .hea file');
      console.error(err);
    }
  };

  const pickDatFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        const { name, uri } = result.assets[0];
        if (!name.endsWith('.dat')) {
          setError('Please select a .dat file');
          return;
        }
        setDatFile({ name, uri });
        setError(null);
      }
    } catch (err) {
      setError('Error selecting .dat file');
      console.error(err);
    }
  };

  const analyzeECG = async () => {
    if (!heaFile || !datFile) {
      setError('Please select both .hea and .dat files');
      return;
    }
    console.log("Image URL:", "http://172.20.10.5:5000/uploads/temp_visualization.png");

    setLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      
      // Add .hea file
      formData.append('heaFile', {
        uri: heaFile.uri,
        name: heaFile.name,
        type: 'application/octet-stream'
      });
      
      // Add .dat file
      formData.append('datFile', {
        uri: datFile.uri,
        name: datFile.name,
        type: 'application/octet-stream'
      });

      console.log(formData)
      // Send to backend
      const response = await axios.post('http://172.20.10.5:5000/api/predict/analyze-ecg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { prediction, imageUrl } = response.data;
      console.log(response.data)
      setPrediction(prediction);
      setEcgImage(imageUrl);
    } catch (err) {
      setError('Error analyzing ECG data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ECG Analysis</Text>
      
      <View style={styles.fileSection}>
        <Text style={styles.sectionTitle}>Upload ECG Files</Text>
        
        <View style={styles.fileRow}>
          <Text style={styles.fileLabel}>Header File (.hea):</Text>
          <Button title="Select .hea file" onPress={pickHeaFile} />
          {heaFile && <Text style={styles.fileName}>{heaFile.name}</Text>}
        </View>
        
        <View style={styles.fileRow}>
          <Text style={styles.fileLabel}>Data File (.dat):</Text>
          <Button title="Select .dat file" onPress={pickDatFile} />
          {datFile && <Text style={styles.fileName}>{datFile.name}</Text>}
        </View>
        
        <Button 
          title={loading ? "Processing..." : "Analyze ECG"} 
          onPress={analyzeECG} 
          disabled={loading || !heaFile || !datFile} 
          color="#2196F3"
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {prediction && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Analysis Results</Text>
          
          <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Detected Conditions:</Text>
  
            {/* Display the predicted class */}
            <Text style={styles.predictionItem}>
              • Condition: {prediction.class}
            </Text>
            
            {/* Display the probability as a percentage */}
            <Text style={styles.predictionItem}>
              • Probability: {(prediction.probability * 100).toFixed(2)}%
            </Text>
          </View>

          
          {ecgImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageTitle}>ECG Visualization:</Text>
              <Image 
                source={{ uri: `http://192.168.1.7:5000/uploads/temp_visualization.png?timestamp=${new Date().getTime()}` }} 
                style={styles.ecgImage} 
                resizeMode="contain"
              />
            </View>
          )}

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  fileSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileRow: {
    marginBottom: 15,
  },
  fileLabel: {
    marginBottom: 5,
    fontWeight: '500',
  },
  fileName: {
    marginTop: 5,
    color: 'green',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  resultSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  predictionContainer: {
    marginBottom: 15,
  },
  predictionTitle: {
    fontWeight: '500',
    marginBottom: 5,
  },
  predictionItem: {
    marginLeft: 10,
    marginBottom: 3,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageTitle: {
    fontWeight: '500',
    marginBottom: 10,
  },
  ecgImage: {
    width: '100%',
    height: 200,
    marginTop: 5,
  },
});