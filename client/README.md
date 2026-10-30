# TalkItOut — React + Vite Client

The frontend web application for TalkItOut, designed with a calming pastel aesthetic (muted teal/sage green, soft lavender, warm off-white) to support college students under stress.

## Features Built
1. **Calm Pastel Design System**: Custom typography, rounded pill buttons, subtle hover transitions, and mobile-first responsiveness.
2. **Global AuthContext**: JWT stored in `localStorage`, persistent login session, and automatic header injection in `axiosInstance`.
3. **Protected Route Guard**: Restricts student dashboard access to authenticated users and redirects with return location.
4. **Shared Responsive Navbar**: Brand leaf logo, quick links, mobile hamburger drawer, and dynamic login/logout state.
5. **Shared Footer**: Quick links, mindfulness reminder, and official **Tele-MANAS crisis helpline (14416)** note.
6. **Pages**:
   - **Home (`/`)**: Hero section, 4 feature cards (Audiobooks, Music, Breathe, Counselling), and "How it works" 3-step guide.
   - **Signup (`/signup`)**: Name, email, password validation, connected to `/api/auth/register`.
   - **Login (`/login`)**: Email and password validation, evaluator quick-fill buttons for demo accounts, connected to `/api/auth/login`.
   - **Dashboard (`/dashboard`)**: Protected student greeting, quick access tool cards, and "My Bookings" placeholder.
   - **Audiobooks (`/audiobooks`)**: Category filter pills (All, Stress, Motivation, Self-Help), duration indicators, and play controls.
   - **Music (`/music`)**: Mood tabs (Sleep, Focus, Anxiety Relief, Calm), ambient cover art, and play controls.
   - **Breathe (`/breathe`)**: Full Somatic Grounding & Yoga module:
     - 4 guided routines (Box Breathing, 4-7-8 Breathing, Calm Coherence Breathing, 5-minute Desk Yoga).
     - Interactive `BreathingTimer`: smooth CSS-expanding animated circle, live cue, countdown, session selector (1/3/5 min), cycle counter, completion view, and ambient sound toggle (linked to `AudioPlayer`).
     - Guided `YogaFlow`: step-by-step chair yoga with hold countdown timer, progress bar, benefits, and next/prev controls.
     - Guest mode alert prompting to log in to save mindful progress.
   - **Counselling (`/counselling`)**: Counsellor directory preview loaded from the database.
7. **Persistent HTML5 AudioPlayer**:
   - Fixed at the bottom of the screen.
   - Track thumbnail, title, category badge.
   - Play/pause toggle, seek scrubber bar, current time and total duration.
   - Volume control slider and mute toggle.
   - Global context keeps playback running smoothly even when navigating between pages.

## How to Run

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:3000` (or `http://localhost:5173`) and proxy API requests to `http://localhost:5000`.
