# TalkItOut - Express Backend API

Backend server built with Node.js, Express, and MongoDB (via Mongoose) powering the TalkItOut college mental health support platform.

## Architecture

- **`config/db.js`**: Mongoose connection logic for local MongoDB or MongoDB Atlas.
- **`models/`**:
  - `User.js`: User schema with bcrypt password hashing hook, role management (`student` | `admin`), and password comparison method.
  - `Media.js`: Audio resources (`audiobook` | `music`) categorized by student wellness needs.
  - `Counsellor.js`: Verified counsellors with bios, rates, modes (`chat` | `in-person`), and available 7-day appointment slots.
  - `Booking.js`: Student counselling appointments with Razorpay order tracking and payment statuses.
- **`controllers/`**: Business logic cleanly separated from route definitions.
- **`routes/`**: Express routers exposing `/api/auth`, `/api/media`, and `/api/counsellors`.
- **`middleware/`**:
  - `authMiddleware.js`: `protect` (verifies JWT token) and `adminOnly` (role-based access control).
  - `errorHandler.js`: Centralized error handler returning consistent `{ success: false, message: "...", data: null }` responses.
  - `asyncHandler.js`: Wrapper utility for cleaner asynchronous controller code without try-catch bloat.
- **`seeder/seed.js`**: Database seed script populating default admin, sample student, 6 audiobooks, 8 music tracks, and 4 counsellors with 7-day dynamic slots.
- **`public/media/`**: Static audio asset serving for frontend streaming.

## Environment Variables
Defined in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/talkitout
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## Running the Server
```bash
npm install
npm run seed     # Populates sample data
npm run dev      # Starts with nodemon
```
