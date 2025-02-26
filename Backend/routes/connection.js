const express = require("express");
const Connection = require("../models/Connection");
const router = express.Router();



// Request Connection
router.post("/connect", async (req, res) => {
  const { doctorId, patientId } = req.body;
  try {
    console.log(doctorId,"hello doctor")
    const connection = new Connection({ doctorId, patientId });
    await connection.save();
    console.log("saved")
    res.status(201).json({ message: "Connection requested" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Approve Connection
router.post("/approve", async (req, res) => {
  const { connectionId } = req.body;
  console.log(connectionId,"its coming id ")
  try {
    const connection = await Connection.findById(connectionId);
    console.log(connection,"connection found")
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }
    connection.approved = true;
    await connection.save();
    console.log("approved")
    res.status(200).json({ message: "Connection approved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Connections (Approved and Pending)
router.get("/connections", async (req, res) => {
  const { userId, approved } = req.query; // approved=true/false
  console.log(userId,approved)
  try {
    const connections = await Connection.find({
      $or: [{ doctorId: userId }, { patientId: userId }],
      ...(approved ? { approved: approved === "true" } : {}),
    }).populate("doctorId patientId", "name email phone image");
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
