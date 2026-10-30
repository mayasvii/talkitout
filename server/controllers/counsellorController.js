const Counsellor = require('../models/Counsellor');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all available counsellors
 * @route   GET /api/counsellors
 * @access  Public
 */
const getCounsellors = asyncHandler(async (req, res, next) => {
  const counsellors = await Counsellor.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: counsellors.length,
    message: 'Counsellors fetched successfully',
    data: counsellors,
  });
});

/**
 * @desc    Get a single counsellor by ID (including available slots)
 * @route   GET /api/counsellors/:id
 * @access  Public
 */
const getCounsellorById = asyncHandler(async (req, res, next) => {
  const counsellor = await Counsellor.findById(req.params.id);

  if (!counsellor) {
    return next(new ErrorResponse(`Counsellor not found with ID of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: 'Counsellor details fetched successfully',
    data: counsellor,
  });
});

module.exports = {
  getCounsellors,
  getCounsellorById,
};
