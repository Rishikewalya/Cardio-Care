const express = require('express');
const router = express.Router();
const fs = require('fs');
const { spawn } = require('child_process');
const Record = require('../models/Record');


// Endpoint for prediction
router.post('/', (req, res) => {
    const inputData = req.body;
 
    // Validate input data
    console.log(inputData,"input validate")
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    for (const field of requiredFields) {
        if (!(field in inputData)) {
            return res.status(400).json({ error: `Missing field: ${field}` });
        }
    }

    // Call Python script for prediction
    const pythonProcess = spawn('python', ['predictor.py', JSON.stringify(inputData)]);
    let predictionResult = '';
    let errorOccurred = false;

    pythonProcess.stdout.on('data', (data) => {
        predictionResult += data.toString(); // Accumulate the output data
    });

    pythonProcess.stderr.on('data', (error) => {
        errorOccurred = true; // Mark that an error occurred
        console.error(`Error: ${error}`);
        if (!res.headersSent) {
            res.status(500).json({ error: 'An error occurred while predicting.' });
        }
    });

    pythonProcess.on('close', (code) => {
        if (!errorOccurred && !res.headersSent) {
            try {
                // Parse the accumulated prediction result and send it
                const result = JSON.parse(predictionResult);
                res.json(result);
            } catch (parseError) {
                console.error(`Parsing Error: ${parseError}`);
                res.status(500).json({ error: 'Error parsing prediction result.' });
            }
        }
    });
});

router.post('/addRecord', async (req, res) => {
    const { riskPrediction, probability,treatment,uniqueId } = req.body;
    const record = new Record({riskPrediction, probability,treatment,uniqueId });
    console.log(record)
    await record.save();
    res.json({ success: true});
});
router.post('/getRecord', async (req, res) => {
    const { uniqueId } = req.body;
    console.log(uniqueId)
    const records = await Record.find({ uniqueId: uniqueId });
    if (!records) {
        return res.json({ success: false, message: 'No records found' });
    }
    console.log(records);
    res.json({ success: true, record: records });
});

module.exports = router;
