
const express = require('express');
const { getCasualties, addCasualty, updateCasualty, deleteCasualty } = require('../controllers/casualtyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getCasualties).post(protect, addCasualty);
router.route('/:id').put(protect, updateCasualty).delete(protect, deleteCasualty);

module.exports = router;