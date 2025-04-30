// import React, { useState } from 'react';
// import { View, Button, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import placeholderimg from "./placeholder-image.jpg";
// export default function HeartDiseaseTestScreen() {
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     // Function to pick an image from the device
//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     // Function to simulate the image processing and prediction
//     const handleImageSubmit = async () => {
//         setLoading(true);
        
//         // Simulate a 5-second wait for extracting fields and predicting
//         setTimeout(() => {
//             setResult({
//                 prediction: 0.9,  // Dummy prediction
//                 probability: 5,   // Dummy probability
//                 treatment: 'Great' // Dummy treatment
//             });
//             setLoading(false);
//         }, 5000);  // 5-second delay
//     };

//     return (
//         <View style={styles.container}>
//             {/* Space for the image */}
//             <View style={styles.imageContainer}>
//                 {image ? (
//                     <Image 
//                         source={{ uri: image }} 
//                         style={styles.image} 
//                     />
//                 ) : (
//                     <Image 
//                         source={placeholderimg} // Placeholder image
//                         style={styles.image} 
//                     />
//                 )}
//             </View>

//             {/* Pick Image and Submit buttons in a row */}
//             <View style={styles.buttonRow}>
//                 <Button title="Pick an image" onPress={pickImage} style={styles.button} />
//                 <View style={styles.spacing} />
//                 <Button 
//                     title="Submit Image" 
//                     onPress={handleImageSubmit} 
//                     style={styles.button} 
//                     disabled={!image || loading}
//                 />
//             </View>

//             {/* Loading Indicator */}
//             {loading && <ActivityIndicator size="20" color="#0000ff" />}

//             {/* Prediction result */}
//             {result && !loading && (
//                 <View style={styles.resultContainer}>
//                     <Text style={styles.resultText}>Prediction: {result.prediction}</Text>
//                     <Text style={styles.resultText}>Probability: {result.probability}</Text>
//                     <Text style={styles.resultText}>Treatment: {result.treatment}</Text>
//                 </View>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         marginBottom: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: 200,
//         height: 200,
//         borderRadius: 10,
//         borderColor: '#ddd',
//         borderWidth: 1,
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     spacing: {
//         width: 10,
//     },
//     resultContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     resultText: {
//         fontSize: 18,
//         marginVertical: 5,
//     },
// });
