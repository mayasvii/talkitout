const express = require('express');
const router = express.Router();

const {
  getCounsellors,
  getCounsellorById,
} = require('../controllers/counsellorController');

/**
 * Counsellor Routes
 * Base prefix: /api/counsellors
 */
router.route('/')
  .get(getCounsellors);

router.route('/:id')
  .get(getCounsellorById);

module.exports = router;
