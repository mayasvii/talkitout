const Mood = require('../models/Mood');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Record or update student's daily mood (1 entry per day)
 * @route   POST /api/moods
 * @access  Private (Student)
 */
const recordMood = asyncHandler(async (req, res, next) => {
  const { moodLevel, note } = req.body;

  const level = Number(moodLevel);
  if (!level || level < 1 || level > 5) {
    return next(new ErrorResponse('Please provide a valid mood level between 1 and 5', 400));
  }

  // Calculate start and end of today in local date
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  // Check if a mood entry already exists for today
  let mood = await Mood.findOne({
    user: req.user._id,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  if (mood) {
    // Update existing daily entry
    mood.moodLevel = level;
    if (note !== undefined) {
      mood.note = note.trim();
    }
    await mood.save();

    return res.status(200).json({
      success: true,
      message: "Today's mood updated successfully",
      data: mood,
    });
  }

  // Otherwise create a fresh entry for today
  mood = await Mood.create({
    user: req.user._id,
    moodLevel: level,
    note: note ? note.trim() : '',
  });

  res.status(201).json({
    success: true,
    message: 'Mood recorded successfully',
    data: mood,
  });
});

/**
 * @desc    Get authenticated student's mood history (last 30 days)
 * @route   GET /api/moods/my
 * @access  Private (Student)
 */
const getMyMoods = asyncHandler(async (req, res, next) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const moods = await Mood.find({
    user: req.user._id,
    createdAt: { $gte: thirtyDaysAgo },
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    count: moods.length,
    message: 'Mood history retrieved successfully',
    data: moods,
  });
});

module.exports = {
  recordMood,
  getMyMoods,
};
