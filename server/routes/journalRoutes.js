const express = require('express');
const router = express.Router();
const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

// All journal routes are private and strictly protected
router.use(protect);

router.route('/')
  .get(getEntries)
  .post(createEntry);

router.route('/:id')
  .get(getEntry)
  .put(updateEntry)
  .delete(deleteEntry);

module.exports = router;
