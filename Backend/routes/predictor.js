const express = require('express');
const router = express.Router();
const fs = require('fs');
const { spawn } = require('child_process');
const Record = require('../models/Record');


// Endpoint for prediction
router.post('/', (req, res) => {
    const inputData = req.body;

    // Validate input data
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    for (const field of requiredFields) {
        if (!(field in inputData)) {
            return res.status(400).json({ error: `Missing field: ${field}` });
        }
    }

    // Call Python script for prediction
    const pythonProcess = spawn('python', ['predictor.py', JSON.stringify(inputData)]);

    pythonProcess.stdout.on('data', (data) => {
        const predictionResult = JSON.parse(data);
        res.json(predictionResult);
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'An error occurred while predicting.' });
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
