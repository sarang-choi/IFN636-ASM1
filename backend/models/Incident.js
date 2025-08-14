
const mongoose = require('mongoose'); //require -> node.js grammer

const IncidentSchema = new mongoose.Schema({
    title: { type: String, required: true },  //reauired: true -> essentially type
    type: { type: String, required: true },
    severity: { type: String, enum: ['minor', 'moderate', 'serious', 'critical'], default: 'minor', required: true },
    description: { type: String },
    location: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, required: true }, //date.now -> when it's not chosen, it shows current date and time. default: normal 
});

module.exports = mongoose.model('Incident', IncidentSchema);
