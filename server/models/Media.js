const mongoose = require('mongoose');

const AUDIOBOOK_CATEGORIES = ['stress', 'motivation', 'self-help'];
const MUSIC_CATEGORIES = ['sleep', 'focus', 'anxiety', 'calm'];
const ALL_CATEGORIES = [...AUDIOBOOK_CATEGORIES, ...MUSIC_CATEGORIES];

/**
 * Media Schema
 * Represents audio resources (audiobooks and ambient/healing music tracks)
 * designed to aid mental wellness, focus, and relaxation.
 */
const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a media title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a media description'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please specify media type: audiobook or music'],
      enum: {
        values: ['audiobook', 'music'],
        message: '{VALUE} is not supported. Use "audiobook" or "music".',
      },
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a media category'],
      enum: {
        values: ALL_CATEGORIES,
        message: `{VALUE} is not a valid category. Valid options: ${ALL_CATEGORIES.join(', ')}`,
      },
      validate: {
        validator: function (val) {
          if (this.type === 'audiobook') {
            return AUDIOBOOK_CATEGORIES.includes(val);
          }
          if (this.type === 'music') {
            return MUSIC_CATEGORIES.includes(val);
          }
          return true;
        },
        message: props =>
          `Category "${props.value}" is not valid for media type. Audiobooks allow: [${AUDIOBOOK_CATEGORIES.join(
            ', '
          )}]. Music allows: [${MUSIC_CATEGORIES.join(', ')}].`,
      },
      lowercase: true,
    },
    audioUrl: {
      type: String,
      required: [true, 'Please provide the audio URL or static file path'],
      trim: true,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    },
    duration: {
      type: String,
      required: [true, 'Please provide the duration (e.g. "12:30" or "15 mins")'],
      trim: true,
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

// Helpful index for filtering media by type and category quickly
mediaSchema.index({ type: 1, category: 1 });

module.exports = mongoose.model('Media', mediaSchema);
