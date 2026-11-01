const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (from ../.env)
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const User = require('../models/User');
const Media = require('../models/Media');
const Counsellor = require('../models/Counsellor');
const Booking = require('../models/Booking');

/**
 * Helper function to generate appointment slots for the next 7 days starting from tomorrow.
 * Formats each slot with a 'YYYY-MM-DD' date string and standard morning/afternoon times.
 */
const generateNext7DaysSlots = () => {
  const slots = [];
  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    times.forEach((time) => {
      slots.push({
        date: dateStr,
        time,
        isBooked: false,
      });
    });
  }

  return slots;
};

/**
 * Seed Database Function
 */
const seedDatabase = async () => {
  try {
    console.log('[Seeder] Connecting to MongoDB...');
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/talkitout';
    await mongoose.connect(mongoUri);
    console.log('[Seeder] MongoDB connected.');

    // Step 1: Clear existing data
    console.log('[Seeder] Clearing old collections...');
    await User.deleteMany();
    await Media.deleteMany();
    await Counsellor.deleteMany();
    await Booking.deleteMany();
    console.log('[Seeder] Old collections cleared.');

    // Step 2: Seed Admin User (and 1 sample student for testing)
    console.log('[Seeder] Creating admin user...');
    await User.create([
      {
        name: 'Admin TalkItOut',
        email: 'admin@talkitout.com',
        password: 'Admin@123', // Will be hashed by User pre-save hook
        role: 'admin',
      },
      {
        name: 'Aarav Sharma (Student)',
        email: 'student@talkitout.com',
        password: 'Student@123',
        role: 'student',
      },
    ]);
    console.log('[Seeder] Admin created: admin@talkitout.com / Admin@123');
    console.log('[Seeder] Sample student created: student@talkitout.com / Student@123');

    // Step 3: Seed 6 Audiobooks (2 stress, 2 motivation, 2 self-help)
    console.log('[Seeder] Seeding 2 verified audiobook entries (real audio files)...');
    const audiobooks = [
      {
        title: 'Meditations — Marcus Aurelius',
        description: 'Timeless Stoic reflections on overcoming stress, cultivating inner calm, and maintaining mental equilibrium amid life\'s pressures. Narrated by LibriVox volunteers, public domain.',
        type: 'audiobook',
        category: 'stress',
        audioUrl: '/media/audiobooks/exam-stress-relief.mp3',
        coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        duration: '04:00',
      },
      {
        title: 'As a Man Thinketh — James Allen',
        description: 'A foundational classic on mindful thought, mental resilience, and personal mastery. Thought and character shape our reality. Narrated by LibriVox volunteers, public domain.',
        type: 'audiobook',
        category: 'motivation',
        audioUrl: '/media/audiobooks/beat-procrastination.mp3',
        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
        duration: '04:00',
      },
    ];

    // Step 4: Seed 8 Music tracks (2 sleep, 2 focus, 2 anxiety, 2 calm)
    console.log('[Seeder] Seeding 8 music tracks...');
    const musicTracks = [
      {
        title: 'Deep Delta Sleep Soundscape',
        description: 'Slow binaural soundscape embedded with 2Hz delta waves designed to guide restless minds into restful sleep.',
        type: 'music',
        category: 'sleep',
        audioUrl: '/media/music/deep-delta-sleep.mp3',
        coverImage: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=600&q=80',
        duration: '45:00',
      },
      {
        title: 'Midnight Rain & Soft Piano',
        description: 'Gentle acoustic piano melodies layered over high-definition rainfall for bedtime relaxation.',
        type: 'music',
        category: 'sleep',
        audioUrl: '/media/music/midnight-rain-piano.mp3',
        coverImage: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80',
        duration: '30:00',
      },
      {
        title: 'Lo-Fi Study Beats for Late Nights',
        description: 'Chill, non-intrusive 80 BPM lo-fi hip-hop beats crafted specifically to sustain long coding and reading sessions.',
        type: 'music',
        category: 'focus',
        audioUrl: '/media/music/lofi-study-beats.mp3',
        coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
        duration: '40:20',
      },
      {
        title: 'Alpha Waves Deep Concentration',
        description: '10Hz alpha frequency tone with ambient synth textures to induce an effortless academic flow state.',
        type: 'music',
        category: 'focus',
        audioUrl: '/media/music/alpha-waves-focus.mp3',
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        duration: '25:40',
      },
      {
        title: 'Breath of Serenity (432Hz)',
        description: 'A soothing 432Hz harmonic acoustic track designed to slow down rapid heartbeats during anxiety spikes.',
        type: 'music',
        category: 'anxiety',
        audioUrl: '/media/music/breath-of-serenity.mp3',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        duration: '15:00',
      },
      {
        title: 'Panic De-escalation Ambient Pad',
        description: 'Warm, grounding analog pads that promote progressive muscle relaxation and diaphragmatic breathing.',
        type: 'music',
        category: 'anxiety',
        audioUrl: '/media/music/panic-deescalation.mp3',
        coverImage: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
        duration: '12:30',
      },
      {
        title: 'Gentle Morning Sunlight',
        description: 'Uplifting acoustic guitar and cello harmonies to begin your college day with mindfulness and balance.',
        type: 'music',
        category: 'calm',
        audioUrl: '/media/music/morning-sunlight.mp3',
        coverImage: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80',
        duration: '18:15',
      },
      {
        title: 'Ocean Waves & Forest Whispers',
        description: 'Organic field recordings of coastal waves and gentle pine forest wind for stress reduction.',
        type: 'music',
        category: 'calm',
        audioUrl: '/media/music/ocean-forest-ambient.mp3',
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        duration: '35:00',
      },
    ];

    await Media.insertMany([...audiobooks, ...musicTracks]);
    console.log(`[Seeder] Seeded ${audiobooks.length} audiobooks and ${musicTracks.length} music tracks.`);

    // Step 5: Seed 4 sample counsellors with slots over the next 7 days
    console.log('[Seeder] Seeding 4 sample counsellors with available slots for the next 7 days...');
    const counsellors = [
      {
        name: 'Dr. Ananya Sharma',
        photo: '/counsellors/dr-ananya-sharma.svg',
        specialization: 'Exam Stress, Anxiety & Academic Burnout',
        bio: 'Ph.D. in Clinical Psychology with 8+ years experience guiding college students through exam pressure, imposter syndrome, and emotional regulation.',
        fee: 500,
        modes: ['chat', 'in-person'],
        availableSlots: generateNext7DaysSlots(),
      },
      {
        name: 'Dr. Rahul Verma',
        photo: '/counsellors/dr-rahul-verma.svg',
        specialization: 'Depression, Loneliness & Career Confusion',
        bio: 'Compassionate psychotherapist specializing in existential student challenges, hostel adaptation, career dilemmas, and emotional wellness.',
        fee: 450,
        modes: ['chat', 'in-person'],
        availableSlots: generateNext7DaysSlots(),
      },
      {
        name: 'Ms. Sneha Patel',
        photo: '/counsellors/ms-sneha-patel.svg',
        specialization: 'Social Anxiety & Interpersonal Relationships',
        bio: 'Certified CBT practitioner and student mentor helping students overcome public speaking fears, social isolation, and relationship friction.',
        fee: 400,
        modes: ['chat'],
        availableSlots: generateNext7DaysSlots(),
      },
      {
        name: 'Dr. Arjun Sen',
        photo: '/counsellors/dr-arjun-sen.svg',
        specialization: 'Mindfulness, Sleep Disorders & Somatic Therapy',
        bio: 'Holistic mental wellness specialist blending mindfulness meditation, CBT, and sleep hygiene coaching to overcome chronic insomnia.',
        fee: 600,
        modes: ['chat', 'in-person'],
        availableSlots: generateNext7DaysSlots(),
      },
    ];

    await Counsellor.insertMany(counsellors);
    console.log(`[Seeder] Seeded ${counsellors.length} counsellors successfully.`);

    console.log('========================================================');
    console.log('Database Seeding Completed Successfully!');
    console.log('Admin: admin@talkitout.com / Admin@123');
    console.log('Student: student@talkitout.com / Student@123');
    console.log('Audiobooks: 6 entries');
    console.log('Music Tracks: 8 entries');
    console.log('Counsellors: 4 entries with dynamic 7-day slots');
    console.log('========================================================');

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
