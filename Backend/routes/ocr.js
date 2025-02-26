const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');

const router = express.Router();

// File storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle file upload and OCR processing
router.post('/extract-data', upload.single('file'), async (req, res) => {
    try {
        console.log("Processing file...");

        const python = spawn('python', ['ocr.py']); // Run Python script

        // Send base64 encoded file to Python
        console.log("script sent")
        python.stdin.write(JSON.stringify({ file: req.file.buffer.toString('base64') }));
        python.stdin.end();
        console.log("get ready for output")
        let result = "";

        python.stdout.on('data', (data) => {
            result += data.toString();
        });
        console.log(result)
        python.stdout.on('end', () => {
            try {
                res.json(JSON.parse(result));  // Send extracted data to frontend
            } catch (error) {
                console.error("Parsing error:", error);
                res.status(500).json({ error: "Error parsing Python output" });
            }
        });

        python.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            res.status(500).json({ error: "OCR processing failed" });
        });

    } catch (error) {
        res.status(500).json({ error: "Error processing file" });
    }
});

module.exports = router;
