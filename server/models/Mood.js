const mongoose = require('mongoose');

/**
 * Mood Schema
 * Tracks a student's daily emotional state (1-5 scale) with an optional personal reflection note.
 */
const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Mood entry must belong to a student user'],
    },
    moodLevel: {
      type: Number,
      required: [true, 'Mood level is required (1 to 5)'],
      min: [1, 'Mood level must be at least 1'],
      max: [5, 'Mood level cannot exceed 5'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Mood note cannot exceed 500 characters'],
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by user and date
moodSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Mood', moodSchema);
