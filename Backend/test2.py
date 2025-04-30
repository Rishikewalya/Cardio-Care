import sys
import os
import json
import numpy as np
import wfdb
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Masking
from tensorflow.keras import backend as K
K.clear_session()
# Fixed filenames (same as what server.js uses)

def get_record_path(file_path):
    """Returns path without extension for WFDB compatibility"""
    return os.path.join(os.path.dirname(file_path), os.path.splitext(os.path.basename(file_path))[0])

# Directly set the file paths for .hea and .dat files
hea_file_path = sys.argv[1]
dat_file_path = sys.argv[2]

# Verify files exist
if not os.path.exists(hea_file_path) or not os.path.exists(dat_file_path):
    print(json.dumps({"error": "Required files not found"}))
    exit(1)

# Model setup
num_classes = 52
scp_classes = [
    "Normal ECG", "Inferior Myocardial Infarction", "Atrial Flutter", 
    "Non-Diagnostic T Wave abnormalities", "Non-Specific ST/T changes", 
    "Digitalis Effect", "Left Ventricular Hypertrophy", "Left Posterior Fascicular Block", 
    "Long QT Interval", "Left Anterior Fascicular Block", "Incomplete Right Bundle Branch Block", 
    "Right Atrial Overload / Enlargement", "Right Ventricular Hypertrophy", 
    "Intraventricular Conduction Delay", "Lateral Myocardial Infarction", 
    "Anterior-Septal Myocardial Infarction", "Acute Myocardial Infarction", 
    "Ischemia Anterolateral", "First-Degree Atrioventricular Block", "Pacemaker Rhythm", 
    "Ischemia Lateral", "Severe Hypertrophy", "Ischemia Inferolateral", 
    "Inferolateral Myocardial Infarction", "Non-Specific Ischemia", "Premature Ventricular Complex", 
    "Complete Right Bundle Branch Block", "Complete Left Bundle Branch Block", 
    "Anterolateral Myocardial Infarction", "Aneurysm", "Ischemia Anterior-Septal", 
    "Electrolyte Imbalance", "Left Atrial Overload / Enlargement", 
    "Incomplete Left Bundle Branch Block", "Ischemia Inferior", "Atrial Fibrillation", 
    "Injury Anterior-Septal", "Injury Anterolateral", "Inferoposterior Myocardial Infarction", 
    "Ischemia Anterior", "Injury Lateral", "Inferoposterolateral Myocardial Infarction", 
    "Third-Degree Atrioventricular Block", "Premature Atrial Complex", "Injury Inferolateral", 
    "Second-Degree Atrioventricular Block", "Paroxysmal Supraventricular Tachycardia", 
    "Posterior Myocardial Infarction", "Sinus Tachycardia", "Wolff-Parkinson-White Syndrome", 
    "Injury Inferior", "Bigeminy"
]

# Initialize model
model = Sequential([
    Masking(mask_value=0.0, input_shape=(1000, 12)),
    LSTM(128, return_sequences=True),
    Dropout(0.3),
    LSTM(64),
    Dropout(0.3),
    Dense(num_classes, activation='sigmoid')
])
model.compile(loss='binary_crossentropy', optimizer='adam')

# Load weights if available
weights_path = 'scp_code_predictor_from_df.h5'  # Adjust if path is different
if os.path.exists(weights_path):
    model.load_weights(weights_path)

try:
    # Read ECG data using fixed filenames
    record_path = get_record_path(hea_file_path)
    signals, fields = wfdb.rdsamp(record_path)
    
    # Preprocessing
    target_shape = (1000, 12)
    if signals.shape[0] < target_shape[0]:
        signals = np.vstack((signals, np.zeros((target_shape[0] - signals.shape[0], signals.shape[1]))))
    elif signals.shape[0] > target_shape[0]:
        signals = signals[:target_shape[0], :]
    
    signals = signals / np.max(np.abs(signals))
    X = signals.reshape(1, *target_shape)
    
    # Prediction
    prediction = model.predict(X)[0]
    max_index = np.argmax(prediction)
    
    # Results
    result = {
        "prediction": {
            "class": scp_classes[max_index],
            "probability": float(prediction[max_index])
        },
        "top_predictions": [
            {"class": scp_classes[i], "probability": float(prediction[i])}
            for i in np.argsort(prediction)[-5:][::-1]
        ],
        "imageFilename": "temp_visualization.png",  # Fixed output filename
        "path":hea_file_path

    }
    output_filename = "ecg_results.txt"
    with open(output_filename, 'w') as f:
        #Write as nicely formatted JSON
        json.dump(result, f, indent=4)
    
    # Save visualization
    plt.figure(figsize=(12, 8))
    for i in range(min(12, signals.shape[1])):
        plt.subplot(4, 3, i+1)
        plt.plot(signals[:, i])
        plt.title(f'Lead {i+1}')
    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(hea_file_path), result["imageFilename"]))
    plt.close()
    
    print(json.dumps(result))

except Exception as e:
    error_result = {"error": str(e)}
    print(json.dumps(error_result))
    exit(1)
