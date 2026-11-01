const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from server/.env without logging sensitive information
dotenv.config({ path: path.join(__dirname, '../.env') });

const Counsellor = require('../models/Counsellor');

const photoMappings = {
  'Dr. Ananya Sharma': '/counsellors/dr-ananya-sharma.svg',
  'Dr. Rahul Verma': '/counsellors/dr-rahul-verma.svg',
  'Ms. Sneha Patel': '/counsellors/ms-sneha-patel.svg',
  'Dr. Arjun Sen': '/counsellors/dr-arjun-sen.svg',
};

const updatePhotos = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Error: MONGO_URI is not defined in server/.env');
      process.exit(1);
    }

    console.log('[Script] Connecting to MongoDB database...');
    await mongoose.connect(mongoUri);
    console.log('[Script] Connected successfully.');

    console.log('[Script] Updating counsellor profile photos...');
    const results = [];

    for (const [name, photoUrl] of Object.entries(photoMappings)) {
      const counsellor = await Counsellor.findOne({ name });
      if (counsellor) {
        const oldPhoto = counsellor.photo;
        counsellor.photo = photoUrl;
        await counsellor.save();
        results.push({
          name,
          updated: true,
          oldPhoto,
          newPhoto: photoUrl,
        });
        console.log(`[Script] Updated "${name}" -> ${photoUrl}`);
      } else {
        results.push({
          name,
          updated: false,
          reason: 'Counsellor not found by name',
        });
        console.log(`[Script] Warning: "${name}" was not found in the database.`);
      }
    }

    console.log('[Script] All matching counsellor photos updated successfully.');
    await mongoose.disconnect();
    console.log('[Script] Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error(`[Script Error]: ${err.message}`);
    process.exit(1);
  }
};

updatePhotos();
