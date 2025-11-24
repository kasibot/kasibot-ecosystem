# Kasibot Client Portal

A multi-tenant dashboard for Kasibot clients to view real-time data about their AI receptionists and automation systems.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** Supabase
- **Charts:** Recharts
- **State Management:** Zustand (optional)
- **Routing:** React Router v6
- **Icons:** Lucide React

## Features

- 🔐 Secure authentication with Clerk
- 📊 Real-time dashboard with KPIs and charts
- 📞 Call statistics and analytics
- 💰 Business impact metrics (cost savings, time saved)
- 👥 Lead management
- 💡 AI-generated insights and recommendations
- 🔧 Admin dashboard for managing all clients
- 📱 Mobile responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Clerk account and publishable key
- Supabase project with database tables set up

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd KASIBOT-CLIENT-ECOSYSTEM
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Database Schema

The app expects the following Supabase tables:

### `clients`
- `id` (uuid, primary key)
- `business_name` (text)
- `email` (text)
- `created_at` (timestamp)
- `is_active` (boolean)

### `calls`
- `id` (uuid, primary key)
- `client_id` (uuid, foreign key → clients.id)
- `timestamp` (timestamptz)
- `direction` (text)
- `status` (text) - 'answered', 'missed', 'failed'
- `duration_seconds` (integer)
- `outcome` (text)
- `estimated_value` (numeric)
- `phone` (text)
- `created_at` (timestamp)

### `daily_stats`
- `id` (uuid, primary key)
- `client_id` (uuid, foreign key → clients.id)
- `date` (date)
- `total_calls` (integer)
- `answered_calls` (integer)
- `missed_calls` (integer)
- `avg_duration` (numeric)
- `estimated_loss_daily` (numeric)
- `estimated_savings_daily` (numeric)
- `hours_saved` (numeric)
- `fte_saved` (numeric)
- `productivity_boost` (numeric)
- `created_at` (timestamp)

## Clerk Setup

1. Create a Clerk application at https://clerk.com
2. Configure user metadata:
   - Add `clientId` (string) to public metadata
   - Add `role` (string: 'client' or 'admin') to public metadata
3. Copy your publishable key to `.env`

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Railway will automatically detect Vite and deploy

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.tsx
│   ├── KpiCard.tsx
│   ├── CallChart.tsx
│   ├── OutcomeChart.tsx
│   ├── RecentCallsTable.tsx
│   ├── SavingsPanel.tsx
│   ├── TimeSavedPanel.tsx
│   ├── CostOfMissedCallsPanel.tsx
│   └── InsightsCard.tsx
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Leads.tsx
│   ├── Insights.tsx
│   ├── Settings.tsx
│   └── AdminDashboard.tsx
├── hooks/           # Custom React hooks
│   ├── useCalls.ts
│   ├── useDailyStats.ts
│   ├── useChartData.ts
│   ├── useOutcomeData.ts
│   └── useLeads.ts
├── lib/             # Utility libraries
│   ├── supabase.ts
│   ├── clerk.ts
│   └── utils.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Features by Page

### Dashboard (`/dashboard`)
- KPI cards showing today's metrics
- Call volume chart with time filters
- Outcome breakdown pie chart
- Recent calls table

### Leads (`/leads`)
- List of qualified leads
- Filter by outcome and status
- Lead value tracking

### Insights (`/insights`)
- Cost of missed calls (before Kasibot)
- Revenue saved (with Kasibot)
- Time saved metrics
- AI capture rate
- AI-generated insights and recommendations

### Settings (`/settings`)
- Business information
- Operating preferences
- Account details

### Admin Dashboard (`/admin`)
- View all clients
- Client selector
- Per-client metrics
- Manual stats refresh
- Export capabilities

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

Proprietary - Kasibot

