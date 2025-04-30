import sys
import pandas as pd
import pickle
import json
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

# Load models
with open('models/rf_classifier.pkl', 'rb') as f:
    rf_classifier = pickle.load(f)

with open('models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
    
# Treatment recommendations based on prediction
def get_treatment_recommendation(prediction, probability):
    if prediction == 1:
        if probability > 0.8:
            return "Immediate medical attention recommended."
        elif probability > 0.6:
            return "Consultation with a cardiologist advised."
        else:
            return "Further tests may be necessary."
    else:
        if probability < 0.2:
            return "Maintain a healthy lifestyle."
        else:
            return "Regular check-ups recommended."

# Correct feature order
features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

# Get input data
input_data = json.loads(sys.argv[1])
input_df = pd.DataFrame([[input_data[feature] for feature in features]], columns=features)

# Scale input data
input_scaled = scaler.transform(input_df)

# Make prediction
prediction = rf_classifier.predict(input_scaled)
probability = rf_classifier.predict_proba(input_scaled)[0][1]

# Get treatment recommendation
treatment = get_treatment_recommendation(prediction[0], probability)

# Prepare result
result = {
    'prediction': int(prediction[0]),
    'probability': probability,
    'treatment': treatment
}

print(json.dumps(result))
