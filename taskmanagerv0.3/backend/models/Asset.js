
const mongoose = require('mongoose'); //require -> node.js grammer

const AssetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: [ 'personnel', 'vehicle', 'equipment', 'medical' ], required: true },
    capacity: { type: Number, min: 0, default :0 },
    status: { type: String, enum: ['available', 'assigned', 'maintenance', 'retired'], default: 'available', required: true },
    notes: { type: String }, 
},
    { timestamps: true}
);

module.exports = mongoose.model('Asset', AssetSchema);
