require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const predictorRoutes = require('./routes/predictor');
const authRoutes = require('./routes/auth');  // New Auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'YOUR_MONGODB_URI';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/predict', predictorRoutes);
app.use('/api/auth', authRoutes);  // New Auth route

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
