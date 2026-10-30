const mongoose = require('mongoose');

/**
 * Booking Schema
 * Records consultation appointments booked by students with counsellors,
 * along with Razorpay transaction and payment status tracking.
 */
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a student user'],
    },
    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Counsellor',
      required: [true, 'Booking must be associated with a counsellor'],
    },
    mode: {
      type: String,
      required: [true, 'Please specify consultation mode (chat or in-person)'],
      enum: {
        values: ['chat', 'in-person'],
        message: '{VALUE} is not a valid mode. Allowed values: "chat", "in-person".',
      },
    },
    date: {
      type: String,
      required: [true, 'Booking date is required (YYYY-MM-DD)'],
    },
    time: {
      type: String,
      required: [true, 'Booking time is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Booking fee amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'paid', 'failed'],
        message: '{VALUE} is not a valid status. Choose: "pending", "paid", or "failed".',
      },
      default: 'pending',
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
