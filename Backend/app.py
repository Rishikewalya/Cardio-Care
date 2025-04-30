from flask import Flask, request, jsonify
from flask_cors import CORS
import test  # Import your existing test.py module

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    question = data.get('question', '')
    
    if not question:
        return jsonify({'response': 'Please ask a question about heart health.'}), 400
    
    # Call your existing function from test.py
    response = test.get_chatbot_response(question)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)