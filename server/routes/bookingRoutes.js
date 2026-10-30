const express = require('express');
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getMyBookings,
} = require('../controllers/bookingController');

const { protect } = require('../middleware/authMiddleware');

/**
 * Booking Routes (Protected for Students)
 * Base prefix: /api/bookings
 */
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/my', protect, getMyBookings);

module.exports = router;
