const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, default: "Not Provided" }, // Default value for phone
  role: { type: String, enum: ["doctor", "patient"], required: true, default: "patient" }, // Default role
  age: { type: Number, default:0 },
  experience: { type: Number, default: null },
  specialization: { type: String, default: null },
  image:{type:String}
});

module.exports = mongoose.model('User', UserSchema);
