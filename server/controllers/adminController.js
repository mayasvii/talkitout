const Booking = require('../models/Booking');
const Counsellor = require('../models/Counsellor');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all student bookings across the platform
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
const getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate('user', 'name email role createdAt')
    .populate('counsellor', 'name photo specialization fee')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    message: 'All platform bookings retrieved successfully',
    data: bookings,
  });
});

/**
 * @desc    Add an available appointment slot for a counsellor
 * @route   POST /api/admin/counsellors/:id/slots
 * @access  Private/Admin
 */
const addSlot = asyncHandler(async (req, res, next) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return next(new ErrorResponse('Please provide both slot date (YYYY-MM-DD) and time', 400));
  }

  const counsellor = await Counsellor.findById(req.params.id);
  if (!counsellor) {
    return next(new ErrorResponse('Counsellor not found', 404));
  }

  // Check if identical slot already exists
  const existingSlot = counsellor.availableSlots.find(
    (s) => s.date === date.trim() && s.time.toLowerCase() === time.trim().toLowerCase()
  );

  if (existingSlot) {
    return next(new ErrorResponse('An appointment slot for this date and time already exists', 400));
  }

  counsellor.availableSlots.push({
    date: date.trim(),
    time: time.trim(),
    isBooked: false,
  });

  await counsellor.save();

  res.status(201).json({
    success: true,
    message: 'Slot added successfully',
    data: counsellor.availableSlots,
  });
});

/**
 * @desc    Remove an unbooked appointment slot from a counsellor
 * @route   DELETE /api/admin/counsellors/:id/slots/:slotId
 * @access  Private/Admin
 */
const removeSlot = asyncHandler(async (req, res, next) => {
  const counsellor = await Counsellor.findById(req.params.id);
  if (!counsellor) {
    return next(new ErrorResponse('Counsellor not found', 404));
  }

  const slot = counsellor.availableSlots.id(req.params.slotId);
  if (!slot) {
    return next(new ErrorResponse('Appointment slot not found', 404));
  }

  // Prevent deleting booked slots
  if (slot.isBooked) {
    return next(
      new ErrorResponse('Cannot delete an appointment slot that is already booked by a student.', 400)
    );
  }

  counsellor.availableSlots.pull(req.params.slotId);
  await counsellor.save();

  res.status(200).json({
    success: true,
    message: 'Appointment slot deleted successfully',
    data: counsellor.availableSlots,
  });
});

module.exports = {
  getAllBookings,
  addSlot,
  removeSlot,
};
