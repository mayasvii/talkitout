const jwt = require('jsonwebtoken');

/**
 * Generate a JSON Web Token (JWT) for an authenticated user.
 *
 * @param {string} id - The MongoDB _id of the user
 * @returns {string} Signed JWT token string
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports = generateToken;
