const mongoose = require('mongoose');

/**
 * JournalEntry Schema
 * Secure, private personal journal entries authored by students.
 * Only the owner can read, update, or delete their entries.
 */
const journalEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Journal entry must belong to a student user'],
    },
    title: {
      type: String,
      required: [true, 'Journal title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Journal content is required'],
      trim: true,
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

// Index for efficient chronological retrieval per user
journalEntrySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
