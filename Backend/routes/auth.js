require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'vishal-kaira',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET// Replace with actual secret
});

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

router.post('/signup', upload, async (req, res) => {
  try {
    const { name, email, password, number, role, specialization, experience } = req.body;
    let imageUrl = '';

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Upload image to Cloudinary if an image is provided
    if (req.file) {
      // Convert the upload_stream callback to a promise
      const uploadToCloudinary = (buffer) => {
        return new Promise((resolve, reject) => {
          const bufferStream = new stream.PassThrough();
          bufferStream.end(buffer);

          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );

          bufferStream.pipe(uploadStream);
        });
      };

      // Upload the image buffer to Cloudinary
      imageUrl = await uploadToCloudinary(req.file.buffer);
      console.log(imageUrl, "Image URL from Cloudinary");
    }

    // Create user object, handling doctor-specific fields
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash password
      number,
      role,
      specialization: role === 'doctor' ? specialization : undefined,
      experience: role === 'doctor' ? experience : undefined,
      image: imageUrl, // Image URL from Cloudinary
    });

    // Save to database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret');
  res.status(200).json({ success: true, token, user });
});

// Get all users (patients/doctors)
router.get('/users', async (req, res) => {
  const { role } = req.query;
  try {
    const users = await User.find({ role }, { password: 0 }); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
