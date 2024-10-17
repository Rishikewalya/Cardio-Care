const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    riskPrediction: { type: Number, required: true },  
    probability: { type: Number, required: true}, 
    treatment: { type: String, required: true }, 
    uniqueId: { type: String, required: true}
  });
  

module.exports = mongoose.model('Record', RecordSchema);
