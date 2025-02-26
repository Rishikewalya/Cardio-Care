// models/Connection.js
const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approved: { type: Boolean, default: false }, // Approval status
  sharedFiles: [
    {
      fileUrl: String,
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Connection", connectionSchema);
