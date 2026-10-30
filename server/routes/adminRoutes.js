const express = require('express');
const router = express.Router();

const {
  getAllBookings,
  addSlot,
  removeSlot,
} = require('../controllers/adminController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Admin Routes
 * Base prefix: /api/admin
 * All routes require valid JWT + role: 'admin'
 */
router.use(protect);
router.use(adminOnly);

router.get('/bookings', getAllBookings);
router.post('/counsellors/:id/slots', addSlot);
router.delete('/counsellors/:id/slots/:slotId', removeSlot);

module.exports = router;
