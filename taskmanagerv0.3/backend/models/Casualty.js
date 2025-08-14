
const mongoose = require('mongoose');

const CasualtySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    name: { type: String, required: true },
    gender: { type:String, enum: ['female', 'male', 'non'], required: true },
    age: { type:Number, required: true},
    condition: { type: String, enum: ['minor', 'moderate', 'serious', 'critical'], default: 'minor', required: true },
    notes: { type: String, },
    createdAt: { type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Casualty', CasualtySchema);
