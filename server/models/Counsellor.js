const mongoose = require('mongoose');

/**
 * Counsellor Schema
 * Represents certified mental health professionals, student counsellors,
 * and therapists available for booking on TalkItOut.
 */
const counsellorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the counsellor name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    photo: {
      type: String,
      required: [true, 'Please provide a photo URL or image path'],
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    specialization: {
      type: String,
      required: [true, 'Please provide the counsellor specialization (e.g., Anxiety, Exam Stress, Depression)'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Please provide a brief bio or description of experience'],
      trim: true,
    },
    fee: {
      type: Number,
      required: [true, 'Please specify the consultation fee in INR'],
      min: [0, 'Fee cannot be negative'],
    },
    modes: {
      type: [String],
      required: [true, 'Please specify consultation modes available'],
      enum: {
        values: ['chat', 'in-person'],
        message: '{VALUE} is not a valid mode. Allowed values: "chat", "in-person".',
      },
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: 'At least one consultation mode must be selected.',
      },
    },
    availableSlots: [
      {
        date: {
          type: String, // Stored as ISO date string 'YYYY-MM-DD' for straightforward comparison
          required: [true, 'Slot date is required (YYYY-MM-DD)'],
        },
        time: {
          type: String, // e.g., "10:00 AM", "03:30 PM"
          required: [true, 'Slot time is required'],
        },
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Counsellor', counsellorSchema);
