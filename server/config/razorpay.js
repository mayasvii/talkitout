const Razorpay = require('razorpay');

/**
 * Returns a configured Razorpay client instance using test mode keys from environment variables.
 */
let instance = null;

const getRazorpayClient = () => {
  if (!instance) {
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_placeholder_key_secret';

    instance = new Razorpay({
      key_id,
      key_secret,
    });
  }
  return instance;
};

module.exports = getRazorpayClient;
