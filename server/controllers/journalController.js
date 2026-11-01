const JournalEntry = require('../models/JournalEntry');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Create a new private journal entry
 * @route   POST /api/journal
 * @access  Private (Student)
 */
const createEntry = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !title.trim() || !content || !content.trim()) {
    return next(new ErrorResponse('Please provide both a title and content for your journal entry', 400));
  }

  const entry = await JournalEntry.create({
    user: req.user._id,
    title: title.trim(),
    content: content.trim(),
  });

  res.status(201).json({
    success: true,
    message: 'Journal entry saved safely in your private vault',
    data: entry,
  });
});

/**
 * @desc    Get all journal entries for the authenticated student
 * @route   GET /api/journal
 * @access  Private (Student)
 */
const getEntries = asyncHandler(async (req, res, next) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: entries.length,
    message: 'Journal entries retrieved successfully',
    data: entries,
  });
});

/**
 * @desc    Get a single journal entry by ID
 * @route   GET /api/journal/:id
 * @access  Private (Student - Owner only)
 */
const getEntry = asyncHandler(async (req, res, next) => {
  const entry = await JournalEntry.findById(req.params.id);

  if (!entry) {
    return next(new ErrorResponse('Journal entry not found', 404));
  }

  // Enforce privacy: only the owner can access
  if (entry.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse('Access denied: You can only view your own journal entries', 403));
  }

  res.status(200).json({
    success: true,
    message: 'Journal entry retrieved',
    data: entry,
  });
});

/**
 * @desc    Update a journal entry
 * @route   PUT /api/journal/:id
 * @access  Private (Student - Owner only)
 */
const updateEntry = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  let entry = await JournalEntry.findById(req.params.id);

  if (!entry) {
    return next(new ErrorResponse('Journal entry not found', 404));
  }

  // Enforce ownership
  if (entry.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse('Access denied: You can only edit your own journal entries', 403));
  }

  if (title !== undefined) entry.title = title.trim();
  if (content !== undefined) entry.content = content.trim();

  await entry.save();

  res.status(200).json({
    success: true,
    message: 'Journal entry updated successfully',
    data: entry,
  });
});

/**
 * @desc    Delete a journal entry
 * @route   DELETE /api/journal/:id
 * @access  Private (Student - Owner only)
 */
const deleteEntry = asyncHandler(async (req, res, next) => {
  const entry = await JournalEntry.findById(req.params.id);

  if (!entry) {
    return next(new ErrorResponse('Journal entry not found', 404));
  }

  // Enforce ownership
  if (entry.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse('Access denied: You can only delete your own journal entries', 403));
  }

  await JournalEntry.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Journal entry deleted permanently',
    data: {},
  });
});

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
};
