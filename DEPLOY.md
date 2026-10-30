# 🚀 TalkItOut — Deployment Guide (Beginner-Friendly)

> **Goal**: Make TalkItOut live on the internet so anyone can open it from any device, any time —
> even when your laptop is off.
>
> **Services used — all FREE:**
> | What | Service | Website |
> |---|---|---|
> | Database | MongoDB Atlas | cloud.mongodb.com |
> | Backend (API server) | Render | render.com |
> | Frontend (website) | Vercel | vercel.com |

---

## Before you start

Make sure your code is on GitHub. If not, follow the **Git & GitHub** section in the main README first.

You will need:
- [ ] A free GitHub account
- [ ] A free MongoDB Atlas account
- [ ] A free Render account
- [ ] A free Vercel account
- [ ] (Optional) Razorpay test keys from dashboard.razorpay.com

---

## STEP 1 — Set up the Database on MongoDB Atlas

> Think of MongoDB Atlas as "your database in the cloud". It stores all user accounts, bookings, etc.

1. Go to **[cloud.mongodb.com](https://cloud.mongodb.com)** and sign up for free.

2. Click **"Build a Database"** → choose **"FREE (M0 Shared)"** → pick any region close to India (e.g. Mumbai) → click **Create**.

3. **Set a username and password** (write these down!):
   - Username: e.g. `talkitout_user`
   - Password: e.g. `MySecurePass123` (no `@` or `#` characters — they break URLs)
   - Click **"Create User"**

4. **Allow access from anywhere** (required for Render):
   - In the left menu, click **"Network Access"** → **"Add IP Address"**
   - Click **"Allow Access From Anywhere"** (this adds `0.0.0.0/0`)
   - Click **Confirm**

5. **Get your connection string**:
   - In the left menu, click **"Database"** → click **"Connect"** on your cluster
   - Choose **"Drivers"** → select **Node.js**
   - Copy the connection string. It looks like:
     ```
     mongodb+srv://talkitout_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add your database name before the `?`:
     ```
     mongodb+srv://talkitout_user:MySecurePass123@cluster0.xxxxx.mongodb.net/talkitout?retryWrites=true&w=majority
     ```
   - **Save this string** — you will need it in Step 2 and Step 3.

---

## STEP 2 — Deploy the Backend on Render

> Render runs your Node.js/Express server 24/7 in the cloud.

1. Go to **[render.com](https://render.com)** → sign up → click **"Sign in with GitHub"**

2. Click **"New +"** → **"Web Service"**

3. Connect your GitHub account → find your `talkitout` repository → click **Connect**

4. Fill in these settings:
   | Setting | Value |
   |---|---|
   | **Name** | `talkitout-api` |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

5. Scroll down to **"Environment Variables"** → click **"Add Environment Variable"** for each of these:

   | Key | Value |
   |---|---|
   | `MONGO_URI` | Your Atlas connection string from Step 1 |
   | `JWT_SECRET` | A long random string — e.g. `TalkItOut2026CapstoneSecretKeyXyz!` |
   | `JWT_EXPIRE` | `30d` |
   | `NODE_ENV` | `production` |
   | `CLIENT_URL` | `https://talkitout.vercel.app` *(you will update this after Step 4)* |
   | `RAZORPAY_KEY_ID` | Your Razorpay test key ID (or leave the placeholder for demo) |
   | `RAZORPAY_KEY_SECRET` | Your Razorpay test key secret (or leave the placeholder for demo) |

   > ⚠️ **Important**: Do NOT add `PORT` — Render sets this automatically.

6. Click **"Create Web Service"**. Render will build and deploy your backend.
   - Wait 2–3 minutes for the first deploy to finish.
   - You will see a URL like: `https://talkitout-api.onrender.com`
   - Click that URL and add `/api/health` at the end: `https://talkitout-api.onrender.com/api/health`
   - You should see: `{ "success": true, "message": "TalkItOut API is running smoothly" }` ✅

> ⚠️ **Free Render note**: The free plan "sleeps" after 15 minutes of no traffic. The first request after sleep takes ~30 seconds to wake up. This is normal for demos — just open the `/api/health` URL once before you start your demo.

---

## STEP 3 — Seed the Database (run once from your laptop)

> This creates the demo admin user, audiobooks, music, and counsellors in your Atlas database.
> You only need to do this once.

1. Open your `server/.env` file and temporarily change `MONGO_URI` to your **Atlas URI** from Step 1.

2. Open a terminal (Command Prompt or PowerShell), go to the server folder:
   ```bash
   cd C:\Users\mayasvi\.gemini\antigravity\scratch\talkitout\server
   npm run seed
   ```

3. You should see:
   ```
   Database Seeding Completed Successfully!
   Admin: admin@talkitout.com / Admin@123
   Student: student@talkitout.com / Student@123
   Audiobooks: 6 entries   |   Music Tracks: 8 entries   |   Counsellors: 4 entries
   ```

4. After seeding, you can change `MONGO_URI` back to your local URI if you want to keep developing locally — or leave it as Atlas.

---

## STEP 4 — Deploy the Frontend on Vercel

> Vercel hosts your React app and gives you a free public URL.

1. Go to **[vercel.com](https://vercel.com)** → sign up with GitHub

2. Click **"Add New Project"** → import your `talkitout` GitHub repository

3. Fill in these settings:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `client` |
   | **Framework Preset** | Vite *(Vercel usually auto-detects this)* |
   | **Build Command** | `npm run build` *(auto-detected)* |
   | **Output Directory** | `dist` *(auto-detected)* |

4. Expand **"Environment Variables"** → add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://talkitout-api.onrender.com/api` *(use your Render URL from Step 2)* |

5. Click **"Deploy"**. Vercel will build your frontend.
   - Wait 1–2 minutes.
   - You will see a URL like: `https://talkitout.vercel.app`
   - Open it in your browser — you should see the TalkItOut home page! 🎉

6. **Go back to Render** (Step 2) → open your web service → go to **"Environment"**
   → update `CLIENT_URL` to your actual Vercel URL (e.g. `https://talkitout.vercel.app`)
   → click **Save** → Render will redeploy automatically.

---

## STEP 5 — Final Test Checklist

Run through these before your Monday demo:

### Basic Flow
- [ ] Open your Vercel URL — home page loads and looks good
- [ ] Click **Sign Up** — create a new student account — redirected to Dashboard ✅
- [ ] Click **Login** → log in with `student@talkitout.com` / `Student@123` ✅
- [ ] Log out → log back in as `admin@talkitout.com` / `Admin@123` ✅

### Content
- [ ] **Audiobooks** page loads — 6 cards visible — category filter works (Stress / Motivation / Self-help)
- [ ] **Music** page loads — 8 tracks visible — mood tabs work (Sleep / Focus / Anxiety / Calm)
- [ ] Click play on any track — audio player bar appears at the bottom ✅
- [ ] **Breathe** page loads — click Box Breathing — animated circle runs for the full session ✅
- [ ] Yoga flow: click 5-min Desk Yoga — step through poses with Next/Previous ✅

### Counselling & Payment
- [ ] **Counselling** page loads — 4 counsellor cards visible
- [ ] Click **Book a Session** on any counsellor — see available slots
- [ ] Select a slot → click **Pay & Book** — Razorpay popup opens (or demo mode confirms)
- [ ] After payment, booking appears in **Dashboard → My Bookings** with status **Paid** ✅
- [ ] Try booking the **same slot again** — should show "slot already booked" error ✅

### Admin
- [ ] Login as admin → go to `/admin` — bookings table loads ✅
- [ ] Add a new slot for a counsellor — appears in the booking flow ✅

### Mobile
- [ ] Open the Vercel URL on your phone — site is responsive ✅
- [ ] Hamburger menu works on mobile ✅

---

## Razorpay Test Card Details

Use these when the Razorpay payment popup opens during demo:

| Field | Value |
|---|---|
| Card Number | `4111 1111 1111 1111` |
| Expiry | Any future date (e.g. `12/26`) |
| CVV | Any 3 digits (e.g. `123`) |
| Name | Any name |
| OTP | `1234` |

> These are Razorpay's official test card details for test mode. No real money is charged.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Render URL shows "Application failed to respond" | Wait 30 seconds — the free plan is waking up from sleep |
| Login says "Network Error" | Check that `VITE_API_URL` in Vercel matches your exact Render URL |
| "Invalid CORS" error in browser console | Make sure `CLIENT_URL` in Render matches your Vercel URL exactly |
| Seed script fails | Make sure your Atlas IP whitelist includes `0.0.0.0/0` |
| Page shows blank on Vercel after refresh | Check that `client/vercel.json` is in your GitHub repo |
| Bookings not showing | Make sure you seeded the Atlas database (Step 3) |
