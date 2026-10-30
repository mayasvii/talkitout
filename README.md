# TalkItOut 🌿
> **A Comprehensive Mental Health & Wellness Web Platform for College Students**  
> *Final Year / Capstone Engineering Project (MERN Stack)*

TalkItOut is designed to address the mental health challenges commonly faced by university students, including exam anxiety, imposter syndrome, academic burnout, and loneliness. It provides student-tailored audio therapy (guided audiobooks and ambient focus/sleep soundscapes), interactive somatic grounding exercises, confidential appointment bookings with certified student counsellors via **Razorpay**, and a dedicated **Admin Portal** for campus wellness management.

---

## 📁 Project Architecture

```text
talkitout/
├── README.md                      # Complete project documentation & testing manual
├── .gitignore
├── client/                        # Frontend application (React 18 + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   ├── .env
│   └── src/
│       ├── api/
│       │   └── axiosInstance.js   # Centralized Axios with automatic Bearer token
│       ├── context/
│       │   ├── AuthContext.jsx    # User & JWT session persistence
│       │   ├── PlayerContext.jsx  # Global persistent audio state across pages
│       │   └── ToastContext.jsx   # Consistent toast alert notifications
│       ├── components/
│       │   ├── common/
│       │   │   ├── Icons.jsx      # Custom lightweight SVG icon suite
│       │   │   ├── LoadingSpinner.jsx
│       │   │   ├── EmptyState.jsx
│       │   │   ├── ErrorBoundary.jsx # Global React crash safety net
│       │   │   └── ToastContainer.jsx# Floating alert notification drawer
│       │   ├── layout/
│       │   │   ├── Navbar.jsx     # Responsive brand bar with mobile drawer & admin link
│       │   │   ├── Footer.jsx     # Quick links & Tele-MANAS 14416 crisis helpline
│       │   │   └── ProtectedRoute.jsx
│       │   ├── player/
│       │   │   └── AudioPlayer.jsx# Fixed bottom player (seek, volume, mute)
│       │   ├── breathe/
│       │   │   ├── BreathingTimer.jsx # Expanding circle pacer & ambient audio toggle
│       │   │   └── YogaFlow.jsx   # Step-by-step 5-min chair yoga with hold timers
│       │   └── counselling/
│       │       └── BookingModal.jsx# Mode, date & slot picker with Razorpay checkout
│       ├── data/
│       │   └── wellnessRoutines.js# Breathing pattern & desk yoga pose definitions
│       ├── pages/
│       │   ├── Home.jsx           # Hero, 4 feature cards, "How it works"
│       │   ├── Login.jsx          # Calming login with demo quick-fill buttons
│       │   ├── Signup.jsx         # Clean student registration with validation
│       │   ├── Dashboard.jsx      # Protected student hub & live "My Bookings"
│       │   ├── Audiobooks.jsx     # Category filters (Stress, Motivation, Self-Help)
│       │   ├── Music.jsx          # Mood tabs (Sleep, Focus, Anxiety Relief, Calm)
│       │   ├── Breathe.jsx        # Somatic grounding & yoga hub (guest warning)
│       │   ├── Counselling.jsx    # Counsellor cards & slot availability
│       │   └── AdminDashboard.jsx # Admin metrics, bookings table & slot editor
│       ├── App.jsx                # Layout wrapper & route map
│       ├── index.css              # Calm pastel design tokens & responsive CSS
│       └── main.jsx
└── server/                        # Backend REST API (Node.js + Express + Mongoose)
    ├── package.json
    ├── server.js                  # Main Express entry with dynamic CORS
    ├── .env.example
    ├── .env
    ├── config/
    │   ├── db.js                  # MongoDB Mongoose connection
    │   └── razorpay.js            # Razorpay SDK initialization
    ├── models/
    │   ├── User.js                # bcrypt hook, student/admin roles, matchPassword
    │   ├── Media.js               # Audiobooks & soundscape tracks with category rules
    │   ├── Counsellor.js          # Profiles & 7-day available slots array
    │   └── Booking.js             # Appointments, Razorpay order/payment IDs, status
    ├── controllers/
    │   ├── authController.js      # Register, Login, Me
    │   ├── mediaController.js     # Filtered media query & admin upload
    │   ├── counsellorController.js# Counsellor list & slot details
    │   ├── bookingController.js   # Razorpay order create, HMAC verify & My Bookings
    │   └── adminController.js     # All bookings audit, slot creation & deletion
    ├── routes/
    │   ├── authRoutes.js          # /api/auth
    │   ├── mediaRoutes.js         # /api/media
    │   ├── counsellorRoutes.js    # /api/counsellors
    │   ├── bookingRoutes.js       # /api/bookings
    │   └── adminRoutes.js         # /api/admin
    ├── middleware/
    │   ├── authMiddleware.js      # protect (JWT verification) & adminOnly guards
    │   ├── errorHandler.js        # Centralized JSON error responder
    │   └── asyncHandler.js        # Async try/catch wrapper
    ├── utils/
    │   └── generateToken.js       # JWT signing helper
    ├── seeder/
    │   └── seed.js                # Database populate script
    └── public/
        └── media/                 # Static audio storage for streaming
            ├── audiobooks/        # Category-based audiobook MP3 files
            └── music/             # Healing & focus soundscape MP3 files
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Axios, Custom SVG Icons, Context API
- **Backend**: Node.js, Express.js, Mongoose ODM
- **Database**: MongoDB (Local or MongoDB Atlas Cloud)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs password hashing
- **Payments**: Razorpay Node SDK & Razorpay Checkout.js (Test Mode)
- **Styling**: Custom Calm Pastel Design System (CSS Variables, Flexbox, CSS Grid)

---

## 📋 Environment Variables

### Backend (`/server/.env`)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:3000` (or Vercel URL) |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/talkitout` |
| `JWT_SECRET` | Secret key for signing auth tokens | `talkitout_super_secret_jwt_key_2026_capstone` |
| `JWT_EXPIRE` | Token validity duration | `30d` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID | `rzp_test_placeholder_key_id` |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret | `rzp_test_placeholder_key_secret` |

### Frontend (`/client/.env`)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## 🚀 Step-by-Step Setup Guide

### 1. Backend Server Setup
```bash
# 1. Navigate to the server folder
cd server

# 2. Install dependencies
npm install

# 3. Seed database with Admin, Student, 6 audiobooks, 8 music tracks, and 4 counsellors
npm run seed

# 4. Start the server
npm run dev
```
> Server runs at `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

**Default Seed Credentials:**
- **Admin**: `admin@talkitout.com` | Password: `Admin@123`
- **Student**: `student@talkitout.com` | Password: `Student@123`

---

### 2. Frontend Client Setup
```bash
# 1. In a new terminal, navigate to the client folder
cd client

# 2. Install dependencies
npm install

# 3. Start Vite dev server
npm run dev
```
> Client runs at `http://localhost:3000` (or `http://localhost:5173`).

---

## 💳 Razorpay Test Mode & Test Cards

TalkItOut uses Razorpay Test Mode keys to process student appointment payments.

### Official Razorpay Test Card Credentials:
When the Razorpay Checkout modal appears:
- **Card Number**: `4111 1111 1111 1111` (or any valid test card)
- **Expiry**: Any future date (e.g., `12/28`)
- **CVV**: `123`
- **OTP**: Enter any 4-digit code (e.g., `1234`) on the bank authorization screen to simulate a successful payment.
- **To test Failure**: Click **"Failure"** or close the Razorpay popup to verify cancelled transaction handling.

> *Offline/Demo Mode*: If testing without active internet or with placeholder keys, TalkItOut includes a built-in sandbox prompt asking if you'd like to simulate payment, ensuring seamless evaluation anytime.

---

## ☁️ Deployment Guidelines

### Backend Deployment (Render.com)
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/).
3. Connect your repository and configure:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the **Environment Variables** tab, add:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will assign its own port)
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/talkitout?retryWrites=true&w=majority`
   - `JWT_SECRET`: `your_secure_production_secret`
   - `CLIENT_URL`: `https://your-talkitout-frontend.vercel.app`
   - `RAZORPAY_KEY_ID`: `your_razorpay_key_id`
   - `RAZORPAY_KEY_SECRET`: `your_razorpay_key_secret`
5. Click **Deploy Web Service**.

### Frontend Deployment (Vercel)
1. Import your repository into [Vercel](https://vercel.com/).
2. In Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. In **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com/api`
4. Click **Deploy**.

---

## 🧪 Comprehensive Manual Test Checklist

Use this checklist to test the full end-to-end functionality:

- [ ] **1. Student Registration**:
  - Visit `/signup`.
  - Try submitting with empty fields or short password to verify validation.
  - Fill in your details (e.g. `maya@college.edu`, `Maya@123`) and submit.
  - Verify automatic redirect to `/dashboard` with student greeting.

- [ ] **2. Authentication & Protected Routes**:
  - Log out via the Navbar.
  - Try accessing `/dashboard` directly; verify you are redirected to `/login`.
  - On `/login`, click the **"Demo Student"** button to auto-fill `student@talkitout.com` and log in.
  - Log out and click **"Demo Admin"** (`admin@talkitout.com`) to log in as administrator. Notice the **"Admin Panel"** appears in the Navbar!

- [ ] **3. Audiobooks & Music (Persistent Player)**:
  - Visit `/audiobooks`. Test category filter pills (*Stress, Motivation, Self-Help*).
  - Click **"Listen Now"** on any audiobook. Verify the fixed bottom audio player launches with scrubber, duration, and volume controls.
  - Navigate to `/music`. Test mood tabs (*Deep Sleep, Study Focus, Anxiety Relief, Calm*).
  - Notice the audio **continues playing without resetting** while navigating between pages!

- [ ] **4. Interactive Somatic Breathing & Desk Yoga**:
  - Visit `/breathe`.
  - Click **"Start Box Breathing"**. Select session length (**1 min**, **3 min**, **5 min**).
  - Click **"Start Session"**. Watch the animated circle smoothly expand on Inhale, pause on Hold, and deflate on Exhale.
  - Toggle **"Ambient Sound: On"** to verify harmonic 432Hz audio plays in sync with the session.
  - Visit the **"Begin Desk Yoga Flow"**. Test next/previous pose buttons and the hold countdown timer.

- [ ] **5. Counsellor Booking (Successful Payment)**:
  - Visit `/counselling`. Select a counsellor (e.g. *Dr. Ananya Sharma*).
  - Click **"Book a Session"** to open the modal.
  - Select mode (*💬 Online Chat* or *🏫 In-Person*).
  - Pick an available Date and Time slot. Review the fee breakdown.
  - Click **"Pay & Book Session"** to launch Razorpay Checkout.
  - Enter test card `4111 1111 1111 1111` and OTP `1234`.
  - Verify receipt confirmation view and check that the session appears under **"My Counselling Sessions"** in `/dashboard` with a green `✓ Confirmed (Paid)` badge.

- [ ] **6. Failed / Cancelled Payment Handling**:
  - Open booking modal for another slot.
  - In Razorpay Checkout, click the close button (**"✕"**) or trigger a failed transaction.
  - Verify the friendly message: *"Your payment was not completed or was cancelled. Your card was not charged."* with a **"Try Again"** button.

- [ ] **7. Double-Booking Prevention**:
  - Open the counsellor's booking modal again.
  - Notice the slot you previously booked is now marked as booked / unavailable!
  - If two students attempt to book the exact same slot concurrently, the backend returns: *"This slot is already booked by another student"*, and refreshes the schedule.

- [ ] **8. Admin Dashboard (`/admin`)**:
  - Log in with `admin@talkitout.com` / `Admin@123`.
  - Navigate to `/admin`.
  - View total platform metrics and the live **Student Bookings Audit Table** with Razorpay IDs.
  - Test the **Slot Availability Manager**: Select a counsellor, add a new date/time slot, and delete an unbooked slot.
