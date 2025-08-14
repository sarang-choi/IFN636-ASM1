
const express = require('express');
const { getAssets, addAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getAssets).post(protect, addAsset);
router.route('/:id').put(protect, updateAsset).delete(protect, deleteAsset);

module.exports = router;