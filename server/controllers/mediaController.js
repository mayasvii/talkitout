const Media = require('../models/Media');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all media items with optional filtering by type and category
 * @route   GET /api/media?type=audiobook|music&category=stress|sleep|...
 * @access  Public
 */
const getMedia = asyncHandler(async (req, res, next) => {
  const { type, category } = req.query;
  const filter = {};

  // Apply type filter if provided
  if (type) {
    const cleanType = type.toLowerCase().trim();
    if (!['audiobook', 'music'].includes(cleanType)) {
      return next(
        new ErrorResponse('Invalid type parameter. Use "audiobook" or "music".', 400)
      );
    }
    filter.type = cleanType;
  }

  // Apply category filter if provided
  if (category) {
    filter.category = category.toLowerCase().trim();
  }

  // Retrieve matching media documents
  const media = await Media.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: media.length,
    message: 'Media items retrieved successfully',
    data: media,
  });
});

/**
 * @desc    Get single media item by its MongoDB _id
 * @route   GET /api/media/:id
 * @access  Public
 */
const getMediaById = asyncHandler(async (req, res, next) => {
  const mediaItem = await Media.findById(req.params.id);

  if (!mediaItem) {
    return next(new ErrorResponse(`Media item not found with ID of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: 'Media item details retrieved successfully',
    data: mediaItem,
  });
});

/**
 * @desc    Create a new media resource (Audiobook or Music)
 * @route   POST /api/media
 * @access  Private/Admin
 */
const createMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Media resource created successfully',
    data: media,
  });
});

module.exports = {
  getMedia,
  getMediaById,
  createMedia,
};
