const express = require('express');
const router = express.Router();

const {
  getMedia,
  getMediaById,
  createMedia,
} = require('../controllers/mediaController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Media Routes
 * Base prefix: /api/media
 */

// Public route to filter/search media, admin route to add media
router.route('/')
  .get(getMedia)
  .post(protect, adminOnly, createMedia);

// Public route to get a single media item by ID
router.route('/:id')
  .get(getMediaById);

module.exports = router;
