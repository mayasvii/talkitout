const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Register a new student or user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Basic presence checks
  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide name, email, and password', 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(new ErrorResponse('A user with this email address already exists', 400));
  }

  // Prevent arbitrary user creation with admin role unless explicitly allowed
  const assignedRole = role === 'admin' ? 'admin' : 'student';

  // Create new user (password is automatically hashed via Mongoose pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
    role: assignedRole,
  });

  // Generate JWT token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      createdAt: user.createdAt,
    },
  });
});

/**
 * @desc    Authenticate user & return JWT token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate presence of email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide both an email and password', 400));
  }

  // Find user and explicitly select password (which is select: false by default)
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid email or password credentials', 401));
  }

  // Verify entered password against hashed password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid email or password credentials', 401));
  }

  // Generate JWT token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
});

/**
 * @desc    Get currently logged-in user profile
 * @route   GET /api/auth/me
 * @access  Private (Requires JWT token)
 */
const getMe = asyncHandler(async (req, res, next) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Current user profile fetched successfully',
    data: user,
  });
});

module.exports = {
  register,
  login,
  getMe,
};
