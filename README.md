# 🏝️ Internal Admin Dashboard for Cabin Hotel Bookings

A full-featured internal management application designed for hotel staff to manage bookings, cabins, guest check-ins, and resort operations.

Live Demo: https://dave-07.github.io/wo-internal-staff-portal/

## ✨ Features

- **Dashboard & Analytics:** Real-time statistics on recent bookings, revenue, occupancy rates, and stay durations visualized with interactive charts.
- **Booking Management:** Complete workflow handling for guest check-ins (including adding breakfast options) and check-outs, with search, filter, and pagination.
- **Cabin Management:** Full CRUD operations for resort cabins, complete with photo uploads and cabin duplication.
- **User Authentication & Management:** Secure employee sign-in, user profile updates, and administrator permissions to onboard new staff.
- **App Settings & Customization:** Global administrative controls (booking lengths, breakfast pricing) and dark mode support.

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **State Management & Data Fetching:** TanStack React Query
- **Styling:** Styled Components
- **Backend as a Service (BaaS):** Supabase (PostgreSQL, Auth, Storage)
- **Form Handling:** React Hook Form
- **Data Visualization:** Recharts
- **Icons & Helpers:** React Icons, date-fns

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- (optional, if you want to set up your own db) A **Supabase** account and project set up with the required database schema.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/Dave-07/wo-internal-staff-portal.git
```

```bash
   cd wo-internal-staff-portal
```

2. Install dependencies:

```bash
   npm install
```

3. (optional, if you want to set up your own db)
   Configure Supabase: open `src/services/supabase.js` and set `supabaseUrl` and `supabaseKey` to your own Supabase project's URL and publishable key.

4. Start the dev server:

```bash
   npm run dev
```
