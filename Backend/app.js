require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const predictorRoutes = require('./routes/predictor');
const ocrRoutes = require('./routes/ocr');
const authRoutes = require('./routes/auth');  // New Auth routes
const connectRoutes=require('./routes/connection')
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'YOUR_MONGODB_URI';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/predict', predictorRoutes);
app.use('/api/con', connectRoutes);
app.use('/api/auth', authRoutes);  // New Auth route
app.use('/api/ocr', ocrRoutes);  // New Auth route
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
