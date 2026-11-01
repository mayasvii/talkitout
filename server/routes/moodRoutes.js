const express = require('express');
const router = express.Router();
const { recordMood, getMyMoods } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');

// All mood routes are restricted to authenticated students
router.use(protect);

router.route('/')
  .post(recordMood);

router.route('/my')
  .get(getMyMoods);

module.exports = router;
