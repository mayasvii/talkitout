const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the connection string from environment variables.
 * Compatible with local MongoDB instances (mongodb://localhost:27017/talkitout)
 * as well as MongoDB Atlas cloud clusters (mongodb+srv://...).
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern Mongoose 6+ has sensible defaults, but keeping explicit options ensures compatibility
      autoIndex: true,
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Active Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Exit process with failure code if database fails to connect
    process.exit(1);
  }
};

module.exports = connectDB;
