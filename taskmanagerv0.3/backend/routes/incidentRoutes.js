
const express = require('express');
const { getIncidents, addIncident, updateIncident, deleteIncident } = require('../controllers/incidentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getIncidents).post(protect, addIncident);
router.route('/:id').put(protect, updateIncident).delete(protect, deleteIncident);

module.exports = router;