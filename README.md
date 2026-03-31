# ✦ CelestiaSOUL

> *Where astrology meets breathwork, healing frequencies & meditation — a complete sacred wellness platform.*

![CelestiaSOUL](https://img.shields.io/badge/CelestiaSOUL-Sacred%20Wellness-8A5AFF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![PWA](https://img.shields.io/badge/PWA-Mobile%20Ready-5A0FC8?style=for-the-badge)

---

## 🌙 About CelestiaSOUL

CelestiaSOUL is a full-stack spiritual wellness platform that delivers a deeply personalized experience by combining:

- **Complete Natal Chart Astrology Readings** — powered by a live astrology API using real birth data
- **Sacred Breathwork Sessions** — 6 zodiac-tuned breathing techniques with 10–30 minute intervals
- **Healing Solfeggio Frequencies** — 396 Hz through 963 Hz, paired to each user's natal chart
- **Meditation Music Library** — cosmic soundscapes and chakra healing tracks
- **Daily Cosmic Guidance** — live planetary transits, moon phase rituals, love, career & health readings
- **Soul Dashboard** — streak tracking, daily ritual schedule, and personal cosmic journal

> Subscription: **$10/month** · 7-day free trial · Freemium tier available forever

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 · React 18 · Tailwind CSS |
| Backend | Next.js API Routes · Supabase Edge Functions |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (Email · Google · Apple) |
| Payments | PayPal · Stripe (Credit Card) |
| Astrology | AstroAPI.com (live natal charts + transits) |
| Email | Resend (transactional + automated) |
| Deployment | Vercel |
| Mobile | Progressive Web App (PWA) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
Node.js 18+
npm or yarn
Git
```

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/celestiasoul.git
cd celestiasoul
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Astrology API
ASTRO_API_KEY=your_astroapi_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Supabase Database

Run the following SQL in your Supabase SQL Editor to create all required tables:

```sql
-- Profiles
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  email text,
  subscription_status text default 'trial',
  trial_ends_at timestamptz,
  created_at timestamptz default now()
);

-- Birth Charts
create table birth_charts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  birth_date date,
  birth_time time,
  birth_city text,
  birth_country text,
  sun_sign text,
  moon_sign text,
  rising_sign text,
  chart_data jsonb,
  created_at timestamptz default now()
);

-- Sessions
create table sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  session_type text,
  technique text,
  duration_minutes int,
  frequency_hz int,
  completed_at timestamptz default now()
);

-- Journal Entries
create table journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  moon_phase text,
  entry_text text,
  intentions text[],
  created_at timestamptz default now()
);

-- Streaks
create table streaks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  current_streak int default 0,
  longest_streak int default 0,
  last_session_date date,
  updated_at timestamptz default now()
);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 PWA Installation

CelestiaSOUL is a Progressive Web App — users can install it directly to their phone home screen without an app store.

On mobile, visit the site and tap **"Add to Home Screen"** in the browser menu. The app will install and behave like a native application.

---

## ✦ Platform Features

### Free Tier (Forever)
- Daily cosmic affirmation
- Solar Fire breathwork technique
- Moon phase banner
- 396 Hz Liberation frequency

### Soul Member · $10/month
- Complete natal chart (10 planets)
- All 6 breathwork techniques
- All 7 Solfeggio frequencies
- Full meditation music library
- Daily love, career, health & transit readings
- Moon phase rituals
- Soul Dashboard & streak tracking
- Cosmic journal
- Daily planetary guidance

---

## 🗂 Project Structure

```
celestiasoul/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── dashboard/          # Soul Dashboard
│   ├── breathing/          # Breathwork screen
│   ├── reading/            # Astrology reading screen
│   ├── music/              # Meditation music player
│   ├── journal/            # Soul journal
│   └── api/                # API routes
├── components/             # Reusable UI components
│   ├── ui/                 # Base components
│   ├── astrology/          # Chart & reading components
│   ├── breathing/          # Breathwork components
│   └── music/              # Music player components
├── lib/                    # Utilities & config
│   ├── supabase/           # Supabase client
│   ├── paypal/             # PayPal integration
│   ├── stripe/             # Stripe integration
│   └── astrology/          # Astrology API helpers
├── public/                 # Static assets + PWA manifest
└── styles/                 # Global styles
```

---

## 🔐 Security

- All user data protected with Supabase Row Level Security (RLS)
- Birth chart data encrypted and user-scoped
- Payment processing handled entirely by PayPal & Stripe — no card data stored
- HTTPS enforced via Vercel deployment
- Environment variables never committed to repository

---

## 📧 Email Automation

CelestiaSOUL sends the following automated emails via Resend:

| Trigger | Email |
|---|---|
| Sign up | Welcome + trial confirmation |
| Trial Day 5 | "Your full sanctuary closes in 2 days" |
| Trial Day 7 | Freemium downgrade notification |
| Day 30 inactive | Re-engagement — personalized by sign |
| Day 60 inactive | Data expiry warning |
| Day 90 | Final data deletion notice |

---

## 🌐 Deployment

CelestiaSOUL deploys to **Vercel** with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

---

## 👤 Founder

**Emelda** — Founder & CEO of CelestiaSOUL
Spiritual tech entrepreneur building the intersection of astrology, breathwork & healing frequencies.

---

## 📄 License

Private & Proprietary · © 2026 CelestiaSOUL · All rights reserved.

---

<div align="center">

**✦ CelestiaSOUL ✦**

*Sacred Breath · Cosmic Alignment · Soul Awakening*

</div>
