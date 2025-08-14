
const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
    filename: { type: String, required: true },
    originalname: { type: String },
    mimetype: { type: String, enum: ['image/jpeg', 'image/jpg', 'application/pdf', 'image/png'], required: true },
    size : { type: Number, max: 10 * 1024 * 1024 },
    url : { type: String },
    uploadedAt: { type:Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Attachment', AttachmentSchema);
