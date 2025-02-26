import sys
import json
import fitz  # PyMuPDF
import re
import base64
from io import BytesIO

def extract_text_from_pdf(pdf_bytes):
    """Extracts text from a PDF file given as bytes."""
    text = ""
    doc = fitz.open("pdf", pdf_bytes)  # Read PDF from bytes
    for page in doc:
        text += page.get_text("text")  # Extract selectable text
    return text

def extract_health_data(text):
    """Extracts predefined health keywords and their values from text."""
    keywords = {
        "Age": r"Age:\s*(\d+)",  
        "Sex": r"Sex:\s*(Male|Female|Other)",  
        "Chest Pain Type": r"Chest Pain Type:\s*(\d+)",  # Extract only number
        "Resting Blood Pressure": r"Resting Blood Pressure:\s*(\d+)",  # No 'mmHg'
        "Cholesterol": r"Cholesterol:\s*(\d+)",  # No 'mg/dL'
        "Fasting Blood Sugar": r"Fasting Blood Sugar.*?:\s*(Yes|No)",
        "Resting ECG": r"Resting ECG:\s*(Normal|ST-T abnormality|Left ventricular hypertrophy)",
        "Max Heart Rate": r"Max Heart Rate:\s*(\d+)",  # No 'bpm'
        "Exercise Induced Angina": r"Exercise Induced Angina:\s*(Yes|No)",
        "Oldpeak": r"Oldpeak.*?:\s*([\d\.]+)",  # Removes extra text
        "Slope of Peak Exercise ST Segment": r"Slope of Peak Exercise ST Segment:\s*(\d+)",
        "Major Vessels Colored by Fluoroscopy": r"Major Vessels Colored by Fluoroscopy:\s*(\d+)",
        "Thalassemia": r"Thalassemia:\s*(\d+)"  # Extract only number
    }
    
    extracted_data = {}

    for key, pattern in keywords.items():
        match = re.search(pattern, text)
        if match:
            extracted_data[key] = match.group(1).strip()

    return extracted_data

def main():
    """Reads base64-encoded PDF input from Node.js and processes it."""
    try:
        input_data = sys.stdin.read()  # Read JSON input from Node.js
        data = json.loads(input_data)

        # Decode base64 PDF data
        pdf_bytes = base64.b64decode(data['file'])
        
        # Extract text and structured data
        extracted_text = extract_text_from_pdf(pdf_bytes)
        health_data = extract_health_data(extracted_text)

        # Return JSON output
        print(json.dumps(health_data))
        sys.stdout.flush()

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()

if __name__ == "__main__":
    main()
